export const SITE_CONFIG = {
  name: "procodes",
  description: "Initialization template for Procodes projects",
  url: "https://procodes.com",
  ogImage: "https://procodes.com/og-image.jpg",
  links: {
    twitter: "https://twitter.com/procodes",
    instagram: "https://instagram.com/procodes",
    facebook: "https://facebook.com/procodes",
    youtube: "https://youtube.com/procodes",
  },
  contact: {
    email: "info@procodes.com",
    phone: "+234 XXX XXX XXXX",
    address: "Calabar, CRS, Nigeria",
  },
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

export const ANIMATION_DELAYS = {
  fast: 0.1,
  normal: 0.2,
  slow: 0.3,
  slower: 0.5,
} as const 

export const learnTopics = [
    {
      title: 'What is Irys?',
      description: 'Understand the core concepts of Irys and how it enhances data permanence.',
      icon: '🧠',
      notes: `Irys is a decentralized, permanent data layer built on top of Arweave. It allows developers to upload files, metadata, and structured data in a way that ensures they’ll never disappear. Think of Irys as the glue between your Web3 app and long-term, immutable storage.

  It’s especially useful for NFTs, public records, DeFi analytics, and any use case that needs tamper-proof data. With a simple SDK and support for multiple blockchains, Irys makes decentralization easy and accessible.`,
    },
    {
      title: 'Uploading Files',
      description: 'Learn how to upload files like images, videos, or metadata to Irys.',
      icon: '📤',
      notes: `Uploading to Irys is simple and developer-friendly. Whether you’re working with a local file, a buffer, or JSON metadata, the SDK handles it seamlessly.

      You just initialize your Irys client, set your wallet provider (or use a connected signer like MetaMask), and call the \`upload()\` method. Files are uploaded permanently, and you'll receive a transaction ID you can reference forever.

      Common use cases include uploading NFT images, profile metadata, or DAO proposals.`,
    },
    {
      title: 'Fetching and Reading Data',
      description: 'Learn how to retrieve and interact with uploaded content.',
      icon: '🔍',
      notes: `Each upload to Irys is stored on Arweave and accessible via a unique, permanent URL. You can fetch data using this URL in your app, a browser, or any HTTP client.

  The format is typically: \`https://arweave.net/{transactionId}\`. You can use this to show images, parse metadata, or verify uploaded information.

  The Irys SDK also provides helper functions for querying, so you can integrate with frontends or indexers easily.`,
    },
    {
      title: 'Irys SDK & APIs',
      description: 'Explore how to use the Irys SDK and interact with APIs.',
      icon: '🛠️',
      notes: `The Irys JavaScript/TypeScript SDK gives you full control over uploads, balance checking, and transaction management.

  Some of the core methods include:
  - \`upload()\` for uploading data
  - \`getUploadReceipt()\` for getting transaction details
  - \`fund()\` to top up your Irys balance

  You can also use REST endpoints to read data without installing the SDK. This is useful for mobile apps or lightweight scripts.`,
    },
    {
      title: 'Use Cases & Projects',
      description: 'See how Irys is used in real-world blockchain applications.',
      icon: '🚀',
      notes: `Irys powers a variety of projects across the Web3 ecosystem. For example:
      \n - NFT marketplaces use Irys to store metadata and artwork permanently.
      \n - DeFi protocols use it to archive transaction data.
      \n - DAOs store governance decisions and proposals immutably.
      \n - Games store level data, user achievements, and assets.

  The goal is simple: decentralize your app’s data without sacrificing user experience.`,
    },
    {
      title: 'Irys Testnet & Faucet',
      description: 'Practice with Irys on testnet using free faucet credits.',
      icon: '🧪',
      notes: `Before going live, you can experiment on the Irys testnet. It works just like the mainnet, but uses test credits.

  You can get testnet tokens from the Irys faucet, then try out uploads, integration, and data retrieval without risk. It’s perfect for prototyping or onboarding new team members.

  Just switch the SDK’s network to testnet and start building!`,
    },
]
