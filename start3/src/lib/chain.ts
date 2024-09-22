export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

export const ALCHEMY_SETTINGS = {
    apiKey: "gDY8gANK8VJAg508BzJbdCpmZ4N43IZP",
    network: "arbitrum"
};

export const ARB_TOKEN = '0x912CE59144191C1204E64559FE8253a0e49E6548';

export const ARBISCAN_API_KEY = "VUSURC6SXT4SMJ38ZET1JXFB8VEXH63K6F";

export const PZAR_CONTRACT_ADDRESS = "0x118E06BC016bc5b65E29307729B489691363b3fA";

export const DEFAULT_LOCALE = 'en-GB';

export const DEFAULT_MARKET = 'ETH-USD';

export const DEFAULT_CURRENCY = 'PZAR';

export const DEFAULT_LEVERAGE = 2;

export const BPS_DIVIDER = 10000;

export const DEFAULT_MARKETS_SORT_KEY = ['market', false];

export const DEFAULT_ORDERS_SORT_KEY = ['orderId', true];

export const DEFAULT_POSITIONS_SORT_KEY = ['timestamp', true];

export const DEFAULT_HISTORY_SORT_KEY = ['timestamp', true];

export const DEFAULT_HISTORY_COUNT = 50;

export const EXCLUDED_MARKETS = []; // ['HSI', 'KOSPI', 'USD-CNY', 'USD-JPY', 'USD-KRW', 'WTI-USD', 'XBR-USD', 'SPX500', 'DJI', 'NASDAQ', 'FTSE', 'DAX', 'NIKKEI', 'ASX200']; // dead and non chainlink markets, in private beta only

export const CURRENCY_DECIMALS = {
    ETH: 18,
    USDC: 6,
    CAP: 18,
    PZAR: 18,
}

export const MAX_CAP_DISPLAY_DECIMALS = 6;

export const USD_CONVERSION_MARKETS = {
    ETH: 'ETH-USD',
    WBTC: 'BTC-USD'
};

// Used to display discount
export const BASE_FEES_BPS = {
    'ETH-USD': 10,
    'BTC-USD': 10,
    'ARB-USD': 50,
    'EUR-USD': 5,
    'XAU-USD': 10,
    'AAVE-USD': 50,
    'DOGE-USD': 50,
    'FLOKI-USD': 50,
    'ADA-USD': 50,
    'BNB-USD': 30,
    'MATIC-USD': 40,
    'NEAR-USD': 50,
    'SOL-USD': 30,
    'AUD-USD': 5,
    'USD-CNH': 10,
    'USD-CAD': 5,
    'GBP-USD': 5,
    'USD-JPY': 5,
    'USD-CHF': 5,
    'XAG-USD': 10,
    'NZD-USD': 6,
    'USD-MXN': 10,
    'USD-SGD': 10,
    'USD-ZAR': 10,
    'SPY-USD': 10,
    'QQQ-USD': 10
};

export const DEFAULT_CHAIN_ID = 421614;

// Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
export const WALLET_CONNECT_PROJECT_ID = '7a24d481deb5bf69fa79c9bb19268cbd'

// Required by some wallets for WalletConnect
export const DAPP_URL = 'https://www.cap.io'

export const CHAINDATA = {
    42161: {
        label: 'arbitrum',
        explorer: 'https://arbiscan.io',
        rpc: 'https://arb1.arbitrum.io/rpc', // for walletconnect
        dataEndpoint: 'https://data.cap.io/api',
        dataStore: '0xa64694E51B22A081EA1e4051EF4EA1b715b47026',
        cap: '0x031d35296154279dc1984dcd93e392b1f946737b',
        assets: {
            ETH: ADDRESS_ZERO,
            USDC: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'
        }
    },
    421614: {
        label: 'Arbitrum Sepolia',
        explorer: 'https://sepolia.arbiscan.io/',
        rpc: 'https://sepolia-rollup.arbitrum.io/rpc', // for walletconnect
        dataEndpoint: 'https://data.cap.io/api',
        dataStore: '0x8302360410f6D82C6e0Fa70Eebf77d136F72eCD8',
        cap: '0x031d35296154279dc1984dcd93e392b1f946737b',
        assets: {
            ETH: ADDRESS_ZERO,
            PZAR: '0x118E06BC016bc5b65E29307729B489691363b3fA'
        }
    },
}