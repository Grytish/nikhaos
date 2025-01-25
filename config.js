// Основний конфігураційний файл для бота
module.exports = {
    OWNER_IDS: [""], // ID власників бота
    SUPPORT_SERVER: "", // Посилання на сервер підтримки
  
    // Налаштування префіксних команд
    PREFIX_COMMANDS: {
      ENABLED: true, // Увімкнення/вимкнення префіксних команд
      DEFAULT_PREFIX: "!", // Префікс за замовчуванням для бота
    },
  
    // Налаштування взаємодій (slash-команди)
    INTERACTIONS: {
      SLASH: true, // Увімкнення slash-команд
      CONTEXT: true, // Увімкнення контекстних команд
      GLOBAL: true, // Глобальна реєстрація команд
      TEST_GUILD_ID: "xxxxxxxxxxx", // ID тестової гільдії для команд
    },
  
    // Кольори для вбудованих повідомлень
    EMBED_COLORS: {
      BOT_EMBED: "#068ADD",
      TRANSPARENT: "#36393F",
      SUCCESS: "#00A56A",
      ERROR: "#D61A3C",
      WARNING: "#F7E919",
    },
  
    // Розміри кешу
    CACHE_SIZE: {
      GUILDS: 100,
      USERS: 10000,
      MEMBERS: 10000,
    },
  
    // Повідомлення за замовчуванням
    MESSAGES: {
      API_ERROR: "Unexpected Backend Error! Try again later or contact support server",
    },
  
    // Налаштування плагінів
  
    // Авто-модерація
    AUTOMOD: {
      ENABLED: true, // Увімкнення авто-модерації
      LOG_EMBED: "#36393F",
      DM_EMBED: "#36393F",
    },
  
    // Панель управління
    DASHBOARD: {
      enabled: false, // Панель за замовчуванням вимкнена
      baseURL: "http://localhost:8080", // Базова URL панелі
      failureURL: "http://localhost:8080", // URL перенаправлення у разі помилки
      port: "8080", // Порт для запуску панелі
    },
  
    // Економіка
    ECONOMY: {
      ENABLED: false, // Увімкнення системи економіки
      CURRENCY: "🪙",
      DAILY_COINS: 100, // Кількість монет за щоденну команду
      MIN_BEG_AMOUNT: 100, // Мінімальна сума для команди "beg"
      MAX_BEG_AMOUNT: 2500, // Максимальна сума для команди "beg"
    },
  
    // Музика
    MUSIC: {
      ENABLED: false, // Увімкнення музичної системи
      IDLE_TIME: 60, // Час бездіяльності перед відключенням від голосового каналу
      MAX_SEARCH_RESULTS: 5, // Максимальна кількість результатів пошуку
      DEFAULT_SOURCE: "YT", // Джерело музики за замовчуванням
      LAVALINK_NODES: [
        {
          host: "localhost",
          port: 2333,
          password: "youshallnotpass",
          id: "Local Node",
          secure: false,
        },
      ],
    },
  
    // Розіграші
    GIVEAWAYS: {
      ENABLED: false, // Увімкнення розіграшів
      REACTION: "🎁",
      START_EMBED: "#FF468A",
      END_EMBED: "#FF468A",
    },
  
    // Зображення
    IMAGE: {
      ENABLED: false, // Увімкнення команд для роботи з зображеннями
      BASE_API: "https://strangeapi.hostz.me/api",
    },
  
    // Запрошення
    INVITE: {
      ENABLED: false, // Увімкнення системи запрошень
    },
  
    // Модерація
    MODERATION: {
      ENABLED: false, // Увімкнення модерації
      EMBED_COLORS: {
        TIMEOUT: "#102027",
        UNTIMEOUT: "#4B636E",
        KICK: "#FF7961",
        SOFTBAN: "#AF4448",
        BAN: "#D32F2F",
        UNBAN: "#00C853",
        VMUTE: "#102027",
        VUNMUTE: "#4B636E",
        DEAFEN: "#102027",
        UNDEAFEN: "#4B636E",
        DISCONNECT: "RANDOM",
        MOVE: "RANDOM",
      },
    },
  
    // Присутність бота
    PRESENCE: {
      ENABLED: true, // Увімкнення присутності
      STATUS: "idle", // Статус бота [online, idle, dnd, invisible]
      TYPE: "WATCHING", // Тип присутності [PLAYING, LISTENING, WATCHING, COMPETING]
      MESSAGE: "{members} members in {servers} servers", // Повідомлення статусу
    },
  
    // Система статистики
    STATS: {
      ENABLED: false, // Увімкнення системи рівнів
      XP_COOLDOWN: 5, // Час між повідомленнями для отримання XP
      DEFAULT_LVL_UP_MSG: "{member:tag}, You just advanced to **Level {level}**",
    },
  
    // Пропозиції
    SUGGESTIONS: {
      ENABLED: false, // Увімкнення системи пропозицій
      EMOJI: {
        UP_VOTE: "⬆️",
        DOWN_VOTE: "⬇️",
      },
      DEFAULT_EMBED: "#4F545C",
      APPROVED_EMBED: "#43B581",
      DENIED_EMBED: "#F04747",
    },
  
    // Система тикетів
    TICKET: {
      ENABLED: false, // Увімкнення системи тикетів
      CREATE_EMBED: "#068ADD",
      CLOSE_EMBED: "#068ADD",
    },
  };
  