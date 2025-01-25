const { ApplicationCommandOptionType } = require("discord.js");
const balance = require("./sub/balance");
const deposit = require("./sub/deposit");
const transfer = require("./sub/transfer");
const withdraw = require("./sub/withdraw");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "bank",
  description: "милые операции с банком",
  category: "ECONOMY",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: true,
    minArgsCount: 1,
    subcommands: [
      {
        trigger: "balance",
        description: "узнать, сколько монеточек у тебя есть",
      },
      {
        trigger: "deposit <coins>",
        description: "положить монетки на свой уютный счетик",
      },
      {
        trigger: "withdraw <coins>",
        description: "забрать монетки с любимого счетика",
      },
      {
        trigger: "transfer <user> <coins>",
        description: "подарить монеточки другому пользователю 💖",
      },
    ],
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "alance",
        description: "узнать, сколько у тебя монеточек",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "кому проверим баланс?",
            type: ApplicationCommandOptionType.User,
            required: false,
          },
        ],
      },
      {
        name: "deposit",
        description: "положить монеточки в банк",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "coins",
            description: "сколько монеточек положим?",
            type: ApplicationCommandOptionType.Integer,
            required: true,
          },
        ],
      },
      {
        name: "withdraw",
        description: "забрать монеточки из банка",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "coins",
            description: "сколько монеточек забираем?",
            type: ApplicationCommandOptionType.Integer,
            required: true,
          },
        ],
      },
      {
        name: "transfer",
        description: "перевести монетки другому пользователю",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "кому отправляем монеточки?",
            type: ApplicationCommandOptionType.User,
            required: true,
          },
          {
            name: "coins",
            description: "сколько монеточек отправим?",
            type: ApplicationCommandOptionType.Integer,
            required: true,
          },
        ],
      },
    ],
  },

  async messageRun(message, args) {
    const sub = args[0];
    let response;

    if (sub === "balance") {
      const resolved = (await message.guild.resolveMember(args[1])) || message.member;
      response = await balance(resolved.user);
    }

    //
    else if (sub === "deposit") {
      const coins = args.length && parseInt(args[1]);
      if (isNaN(coins)) return message.safeReply("Пожалуйста, укажи число монеточек, которые ты хочешь положить.");
      response = await deposit(message.author, coins);
    }

    //
    else if (sub === "withdraw") {
      const coins = args.length && parseInt(args[1]);
      if (isNaN(coins)) return message.safeReply("Пожалуйста, укажи число монеточек, которые ты хочешь забрать.");
      response = await withdraw(message.author, coins);
    }

    //
    else if (sub === "transfer") {
      if (args.length < 3) return message.safeReply("Нужно указать пользователя и монеточки для перевода.");
      const target = await message.guild.resolveMember(args[1], true);
      if (!target) return message.safeReply("Укажи, пожалуйста, того, кому переведем монетки.");
      const coins = parseInt(args[2]);
      if (isNaN(coins)) return message.safeReply("Сколько монеточек ты хочешь перевести?");
      response = await transfer(message.author, target.user, coins);
    }

    //
    else {
      return message.safeReply("Ой, я не понял, что ты хотел. Попробуй еще раз.");
    }

    await message.safeReply(response);
  },

  async interactionRun(interaction) {
    const sub = interaction.options.getSubcommand();
    let response;

    // balance
    if (sub === "balance") {
      const user = interaction.options.getUser("user") || interaction.user;
      response = await balance(user);
    }

    // deposit
    else if (sub === "deposit") {
      const coins = interaction.options.getInteger("coins");
      response = await deposit(interaction.user, coins);
    }

    // withdraw
    else if (sub === "withdraw") {
      const coins = interaction.options.getInteger("coins");
      response = await withdraw(interaction.user, coins);
    }

    // transfer
    else if (sub === "transfer") {
      const user = interaction.options.getUser("user");
      const coins = interaction.options.getInteger("coins");
      response = await transfer(interaction.user, user, coins);
    }

    await interaction.followUp(response);
  },
};
  