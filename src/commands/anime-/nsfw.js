const { EmbedBuilder } = require("discord.js");
const axios = require("axios");

/**
 * Placeholder for command data
 * @type {CommandData}
 */
module.exports = {
  name: "hent", // Назва команди
  description: "Sends NSFW hentai content based on user input", // Опис команди
  cooldown: 5, // Час перезарядки команди в секундах
  category: "ANIME", // Категорія команди
  botPermissions: [], // Права, потрібні боту
  userPermissions: [], // Права, потрібні користувачу
  command: {
    enabled: true, // Увімкнення текстової команди
    aliases: ["hentai"], // Синоніми для команди
    usage: "<tag>", // Формат використання команди
    minArgsCount: 1, // Мінімальна кількість аргументів
    subcommands: [], // Підкоманди (якщо є)
  },
  slashCommand: {
    enabled: false, // Вимкнення слеш-команди
    ephemeral: false,
    options: [],
  },
  /**
   * Виконання текстової команди
   */
  messageRun: async (message, args, data) => {
    if (!message.channel.nsfw) {
      return message.reply("This command can only be used in NSFW channels!");
    }

    const query = args.join(" "); // Теги, введені користувачем
    if (!query) {
      return message.reply("Please provide a tag to search for.");
    }

    const apis = [
      {
        name: "Rule34",
        url: "https://api.rule34.xxx/index.php",
        params: {
          page: "dapi",
          s: "post",
          q: "index",
          tags: query,
          limit: 100,
          json: 1,
        },
        extractUrls: (data) => data.map((post) => post.file_url),
      },
      {
        name: "Gelbooru",
        url: "https://gelbooru.com/index.php",
        params: {
          page: "dapi",
          s: "post",
          q: "index",
          tags: query,
          json: 1,
        },
        extractUrls: (data) => data.map((post) => post.file_url),
      },
    ];

    for (const api of apis) {
      try {
        const response = await axios.get(api.url, { params: api.params });

        if (!response.data || response.data.length === 0) {
          continue; // Спробувати наступний API
        }

        const results = api.extractUrls(response.data);
        const imageUrl = results[Math.floor(Math.random() * results.length)];

        const embed = new EmbedBuilder()
          .setDescription(`Here is your NSFW content for **${query}** from **${api.name}**! 🔞`)
          .setImage(imageUrl)
          .setColor("Random");

        await message.channel.send({ embeds: [embed] });
        return; // Завершити, якщо успішно
      } catch (error) {
        console.error(`Error with ${api.name}:`, error);
      }
    }

    message.reply("Failed to fetch NSFW content from all sources. Try again later!");
  },
  interactionRun: (interaction, data) => {
    interaction.reply("This command does not support slash interactions.");
  },
};
