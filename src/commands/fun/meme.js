require("dotenv").config(); // Підключення .env
const fs = require("fs");
const path = require("path");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const axios = require("axios"); // Для роботи з HTTP-запитами

// Функція для логування в файл
function logToFile(message) {
  const logsDir = path.join(__dirname, "logs");
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
  }

  const logFile = path.join(logsDir, "meme_command_logs.txt");
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFile, logMessage, "utf8");
}

module.exports = {
  name: "meme",
  description: "Отримати випадковий мем",
  category: "FUN",
  botPermissions: ["EmbedLinks"],
  cooldown: 20,
  command: {
    enabled: true,
    usage: "",
  },
  slashCommand: {
    enabled: true,
    options: [],
  },

  async messageRun(message) {
    console.log("Отримано текстову команду: meme");
    logToFile("Отримано текстову команду: meme");
    await handleMemeRequest(message);
  },

  async interactionRun(interaction) {
    console.log("Отримано слеш-команду: meme");
    logToFile("Отримано слеш-команду: meme");
    await handleMemeRequest(interaction);
  },
};

async function handleMemeRequest(context) {
  console.log("Початок обробки запиту на меми");
  logToFile("Початок обробки запиту на меми");
  const buttonRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("regenMemeBtn").setStyle(ButtonStyle.Secondary).setEmoji("🔁")
  );

  const embed = await fetchMemeEmbed();

  try {
    const sentMsg = await context.reply({
      embeds: [embed],
      components: [buttonRow],
      fetchReply: true,
    });
    console.log("Повідомлення з мемом успішно надіслано");
    logToFile("Повідомлення з мемом успішно надіслано");

    const collector = sentMsg.createMessageComponentCollector({
      filter: (i) => i.user.id === context.user?.id || context.author?.id,
      time: 20000, // 20 секунд
    });

    collector.on("collect", async (interaction) => {
      console.log("Користувач натиснув кнопку для оновлення мему");
      logToFile("Користувач натиснув кнопку для оновлення мему");
      if (interaction.customId !== "regenMemeBtn") return;

      await interaction.deferUpdate();
      const newEmbed = await fetchMemeEmbed();
      await sentMsg.edit({ embeds: [newEmbed], components: [buttonRow] });
      console.log("Мем успішно оновлено");
      logToFile("Мем успішно оновлено");
    });

    collector.on("end", () => {
      console.log("Завершено збір взаємодій з кнопкою");
      logToFile("Завершено збір взаємодій з кнопкою");
      buttonRow.components.forEach((button) => button.setDisabled(true));
      sentMsg.edit({ components: [buttonRow] });
    });
  } catch (error) {
    console.error("Помилка під час відправлення або обробки мему:", error);
    logToFile(`Помилка під час відправлення або обробки мему: ${error.message}`);
  }
}

async function fetchMemeEmbed() {
  console.log("Отримання мему з Meme API");
  logToFile("Отримання мему з Meme API");
  try {
    const response = await axios.get("https://meme-api.com/gimme");
    const meme = response.data;

    console.log("Мем успішно отримано:", meme);
    logToFile(`Мем успішно отримано: ${JSON.stringify(meme)}`);

    return new EmbedBuilder()
      .setTitle(meme.title)
      .setURL(meme.postLink)
      .setImage(meme.url)
      .setColor("Random")
      .setFooter({ text: `👍 ${meme.ups} | 💬 ${meme.comments}` });
  } catch (error) {
    console.error("Помилка під час отримання мему:", error);
    logToFile(`Помилка під час отримання мему: ${error.message}`);
    return new EmbedBuilder()
      .setColor("Red")
      .setDescription("Сталася помилка під час отримання мему. Спробуйте ще раз!");
  }
}
