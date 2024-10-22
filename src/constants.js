//----------------------------Production Constants-------------------------------//
export const IS_PRODUCTION = true;

//t.me/hamster_kombat_dev_bot/hamster_local


//----------------------------Level Constants-------------------------------//
export const LEVELS = [1, 2, 3, 4, 5, 6, 7];
export const TOP_LEVEL = 7;
export const LEVEL_DATA = {
    1: {
        name: 'BabyCat',
        point: 0,
        energy: 1000,
        pointPerClick: 1,
    },
    2: {
        name: 'ChildCat',
        point: 10000,
        energy: 1500,
        pointPerClick: 2
    },
    3: {
        name: 'BoyCat',
        point: 25000,
        energy: 1500,
        pointPerClick: 2
    },
    4: {
        name: 'MoonCat',
        point: 50000,
        energy: 2000,
        pointPerClick: 3
    },
    5: {
        name: 'Explorer',
        point: 250000,
        energy: 2500,
        pointPerClick: 4
    },
    6: {
        name: 'Millionaire',
        point: 1000000,
        energy: 3000,
        pointPerClick: 5
    },
    7: {
        name: 'Billionaire',
        point: 1000000000,
        energy: 3000,
        pointPerClick: 5
    },
}

//----------------------------Exchange Constants-------------------------------//

export const EXCHANGES = {
    BINANCE: {
        name: 'Binance'
    },
    OKX: {
        name: 'OKX'
    },
    CRYPTO_DOT_COM: {
        name: 'Crypto.com'
    },
    BYBIT: {
        name: 'Bybit'
    },
    BINGX: {
        name: 'BingX'
    },
    HTX: {
        name: 'HTX'
    },
    KUCOIN: {
        name: 'Kucoin'
    },
    GATE_DOT_IO: {
        name: 'Gate.io'
    },
    MEXC: {
        name: 'MEXC'
    },
    BITSET: {
        name: 'Bitset'
    },
    HAMSTER: {
        name: 'Doge'
    }
}

//----------------------------Interval Constants-------------------------------//
export const ENERGY_SPEED = 3;
export const ENERGY_INTERVAL = 1000;
export const MINUS_CLICK_INTERVAL = 1000;
export const UPDATE_USER_INTERVAL = 5000;

//----------------------------Number Constants-------------------------------//

export const FULL_ENERGY = 6;

//----------------------------Mine Constants-------------------------------//

export const MINT_CATEGORIES = {
    STUDENT: 'BabyCat',
    TRAINEE: 'ChildCat',
    EMPLOYEE: 'BoyCat',
    MANAGER: 'MoonCat',
    BOSS: 'Explorer',
    MILLIONAIRE: 'Millionaire',
    BILLIONAIRE: 'Billionaire',
};

export const COMBO_SIDE = {
    POSITIVE: "positive",
    NEGATIVE: 'negative'
}

//----------------------------TASK Constants-------------------------------//

export const TASK_CATEGORIES = {
    YOUTUBE: 'Hamster Youtube',
    DAILY: 'Daily tasks',
    LIST: 'Tasks list',
};


//----------------------------API Constants-------------------------------//

export const BACKEND_URL = IS_PRODUCTION ? "https://ecat-backend-6hrf.onrender.com" : "http://localhost:8080";
export const FRONTEND_URL = IS_PRODUCTION ? 'https://ecat.onrender.com' : 'https://localhost:5173';
export const FRONTEND_DOMAIN = IS_PRODUCTION ? 'ecat.onrender.com' : 'localhost:5173';
export const GIVEAWAY_LINK = 'https://gleam.io/XwuZb/win-100000-join-the-doge-kombat-giveaway-25-winners';
// export const BACKEND_URL = "http://localhost:8080";

//----------------------------ENERGY LIMIT Constants-------------------------------//

export const ENERGY_LIMIT_POINT = 2000;
export const ENERGY_LIMIT_INCREASE = 500;

//----------------------------Cipher Constants-------------------------------//

export const CIPHER_TABLE =    {
    'A': '01',
    'B': '1000',
    'C': '1010',
    'D': '100',
    'E': '0',
    'F': '0010',
    'G': '110',
    'H': '0000',
    'I': '00',
    'J': '0111',
    'K': '101',
    'L': '0100',
    'M': '11',
    'N': '10',
    'O': '111',
    'P': '0110',
    'Q': '1101',
    'R': '010',
    'S': '000',
    'T': '1',
    'U': '001',
    'V': '0001',
    'W': '011',
    'X': '1001',
    'Y': '1011',
    'Z': '1100',
    '0': '11111',
    '1': '01111',
    '2': '00111',
    '3': '00011',
    '4': '00001',
    '5': '00000',
    '6': '10000',
    '7': '11000',
    '8': '11100',
    '9': '11110',    
}

//----------------------------Cipher Constants-------------------------------//

export const DAILY_REWARD_LIST = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000];

//----------------------------TG Constants-------------------------------//

export const SITE_URL = "https://eloncat.net/";
export const TG_CHANNEL = "https://t.me/eloncat_finance_chat";
export const BLUM_CHANNEL = "https://t.me/blum/app?startapp=ref_mngPiYOmLD";
export const YOUTUBE_CHANNEL = "https://www.youtube.com/@ElonCatFinance";
export const NEW_YOUTUBE_CHANNEL = "https://youtu.be/fo8372hYff8?si=7VAhSgwDQyw5JqIp";
export const X_CHANNEL_LINK = "https://twitter.com/ElonCatFinance";
export const INSTAGRAM_CHANNEL_LINK = "https://instagram.com/dogekombat";

//----------------------------Task Constants-------------------------------//

export const DAILY_TASK_NAME = 'daily-task';
export const TG_CHANNEL_TASK_NAME = 'tg-channel';
export const BLUM_CHANNEL_TASK_NAME = 'blum-channel';
export const INVITE_TASK_NAME = 'invite-task';
export const EXCHANGE_TASK_NAME = 'exchange-task';
export const X_CHANNEL_TASK_NAME = 'x-channel';
export const YOUTUBE_CHANNEL_TASK_NAME = 'youtube-channel';
export const NEW_YOUTUBE_TASK_NAME = 'new-youtube-channel';
export const AIRDROP_TASK_NAME = 'airdrop-task';

//----------------------------Wallet Constants-------------------------------//

export const MAINNET_RPC_ENDPOINT = 'https://rpc.shyft.to?api_key=PxS3KZVzhndyCMWb';

//----------------------------Skins Constants-------------------------------//

export const SKINS = ['Default', 'ChildCat'];

export const SKIN_DATA = {
    Default: {
        url: "",
        description: "Your league's default skin",
        points: 0,
        level: 0
    },
    ChildCat: {
        url: "/images/skins/skin1.png",
        description: "ChildCat is the kind=hearted Ecat who loves helping oher and always has a warm smile for everyone",
        points: 2500000,
        level: 3
    },
}

//----------------------------multitap Constants-------------------------------//

export const MULTI_TAPS = {
    1: {
        point: 500,
        increase: 1
    },
    2: {
        point: 2000,
        increase: 1
    },
    3: {
        point: 10000,
        increase: 2
    },
    4: {
        point: 50000,
        increase: 3
    },
    5: {
        point: 5000000,
        increase: 4
    },
}

//----------------------------Energy Limit Level Constants-------------------------------//

export const ENERGY_LIMITS = {
    1: {
        point: 2000,
        increase: 500
    },
    2: {
        point: 10000,
        increase: 1000
    },
    3: {
        point: 50000,
        increase: 1500
    },
    4: {
        point: 100000,
        increase: 2000
    },
    5: {
        point: 500000,
        increase: 2500
    },
}

//----------------------------Combo Type Constants-------------------------------//

export const COMBO_TYPES = {
    SKILL: "Skill",
    MINE: 'Mine' 
}

//----------------------------Turbo Constants-------------------------------//

export const TURBO_INTERVAL = 600000