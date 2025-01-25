// Підключення основних модулів та залежностей
require("dotenv").config(); // Завантаження змінних оточення
require("module-alias/register"); // Підтримка alias-шляхів

// Реєстрація розширень функціоналу
require("@helpers/extenders/Message"); // Розширення для роботи з повідомленнями
require("@helpers/extenders/Guild"); // Розширення для роботи з гільдіями
require("@helpers/extenders/GuildChannel"); // Розширення для роботи з каналами

const { checkForUpdates } = require("@helpers/BotUtils"); // Функція перевірки оновлень
const { BotClient } = require("@src/structures"); // Основний клас клієнта Discord
const { validateConfiguration } = require("@helpers/Validator"); // Функція перевірки конфігурації

validateConfiguration(); // Перевірка конфігурації перед запуском

// Ініціалізація клієнта
const client = new BotClient();
client.loadCommands("src/commands"); // Завантаження команд
client.loadContexts("src/contexts"); // Завантаження контекстних команд
client.loadEvents("src/events"); // Завантаження подій

// Обробка необроблених обіцянок (promise rejections)
process.on("unhandledRejection", (err) => client.logger.error(`Unhandled exception`, err));

(async () => {
  // Перевірка наявності оновлень
  await checkForUpdates();

  // Запуск панелі управління (якщо ввімкнено)
  if (client.config.DASHBOARD.enabled) {
    client.logger.log("Launching dashboard");
    try {
      const { launch } = require("@root/dashboard/app");

      // Ініціалізація панелі (без бази даних)
      await launch(client);
    } catch (ex) {
      client.logger.error("Failed to launch dashboard", ex);
    }
  }

  // Запуск клієнта Discord
  await client.login(process.env.BOT_TOKEN); // Логін через токен бота
})();
