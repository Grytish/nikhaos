const { EmbedBuilder } = require("discord.js");
const axios = require("axios");

/**
 * @type {import("@structures/Command")}
 */

module.exports = {
  name: "chat", // Назва команди
  description: "Talk to ChatGPT", // Опис команди
  cooldown: 5, // Час перезарядки команди в секундах
  category: "ADMIN", // Категорія команди
  command: {
    enabled: true, // Увімкнення текстової команди
    usage: "<message>", // Формат використання команди
    minArgsCount: 1, // Мінімальна кількість аргументів
  },

  messageRun: async (message, args) => {
    const query = args.join(" "); // Отримуємо текст запиту користувача
    if (!query) {
      return message.reply("Please provide a message to send to ChatGPT.");
    }

    const openaiApiKey = "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"; // Вставте ваш API ключ
    const url = "https://api.openai.com/v1/completions";

    try {
      const response = await axios.post(
        url,
        {
          model: "gpt-4o-mini", // Ви можете використовувати інші моделі
          prompt: query,
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            "Authorization": `Bearer ${openaiApiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const gptResponse = response.data.choices[0].text.trim();

      const embed = new EmbedBuilder()
        .setDescription(`**ChatGPT says:**\n${gptResponse}`)
        .setColor("Random");

      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error("Error with OpenAI API:", error);
      message.reply("An error occurred while trying to fetch a response from ChatGPT.");
    }
  },
};
