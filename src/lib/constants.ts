export const SITE_CONFIG = {
  name: "Iryz 3D Explorer",
  description: "3D Explorer for Iryz",
  url: "https://iryz-3d.vercel.app",
  ogImage: "https://iryz.xyz/logo.png",
  links: {
    twitter: "https://twitter.com/__serverless",
    instagram: "https://instagram.com/iryz_xyz",
    facebook: "https://facebook.com/iryz_xyz",
    youtube: "https://youtube.com/iryz_xyz",
  },
  contact: {
    email: "info@iryz.xyz",
    phone: "+1 XXX XXX XXXX",
    address: "Remote",
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
    notes: `Irys is a decentralized, permanent data layer built on top of Arweave. It allows developers to upload files, metadata, and structured data in a way that ensures they’ll never disappear. Think of Irys as the glue between your Web3 app and long-term, immutable storage.

It’s especially useful for NFTs, public records, DeFi analytics, and any use case that needs tamper-proof data. With a simple SDK and support for multiple blockchains, Irys makes decentralization easy and accessible.`,
  },
  {
    title: 'Uploading Files',
    description: 'Learn how to upload files like images, videos, or metadata to Irys.',
    notes: `Uploading to Irys is simple and developer-friendly. Whether you’re working with a local file, a buffer, or JSON metadata, the SDK handles it seamlessly.

You just initialize your Irys client, set your wallet provider (or use a connected signer like MetaMask), and call the \`upload()\` method. Files are uploaded permanently, and you'll receive a transaction ID you can reference forever.

Example:
\`\`\`
===== js =====
import Irys from '@irys/sdk';
const irys = new Irys({ network: 'mainnet', token: 'matic' });
await irys.uploadFile('path/to/image.png');
\`\`\`

Common use cases include uploading NFT images, profile metadata, or DAO proposals.`,
  },
  {
    title: 'Tags and Metadata',
    description: 'Attach structured tags to your uploads for advanced querying.',
    notes: `Tags in Irys are key–value pairs that can describe your data. They make it possible to query uploads by specific attributes later.

Example:
\`\`\`
===== js =====
await irys.uploadFile('data.json', {
  tags: [
    { name: 'App-Name', value: 'MyWeb3App' },
    { name: 'Content-Type', value: 'application/json' }
  ]
});
\`\`\`

Tags are especially useful for indexing NFT metadata, marking versions of files, or categorizing DAO proposals.`,
  },
  {
    title: 'Addresses and Formats',
    description: 'Understand how addresses work in Irys and compatible wallets.',
    notes: `Irys supports multiple chains, so your uploads can be funded with various crypto wallets (e.g., Ethereum, Polygon, Solana).

An address is the wallet identifier for your transactions. For example:
- Ethereum format: \`0x123...\`
- Solana format: \`5h3V...abc\`
- Arweave format: a long Base64-like string

Always ensure your address matches the network you’re uploading to.`,
  },
  {
    title: 'Fetching and Reading Data',
    description: 'Learn how to retrieve and interact with uploaded content.',
    notes: `Each upload to Irys is stored on Arweave and accessible via a unique, permanent URL or with GraphQL SDK.
Example:
\`\`\`
===== js =====
const url = \`https://arweave.net/\${transactionId}\`;
const res = await fetch(url);
const data = await res.json();
\`\`\`

Using GraphQL: You first have to create a transaction query, then define variables for your query and finally fetch the data from \`https://uploader.irys.xyz/graphql\`

While querying with GraphQL, you can use the following structure (NB: The body \`transactions.edges.node\` defines the structure of the data you want to fetch):
\`\`\`
===== js =====
const query = \`
  query Transactions($tags: [TagFilter!], $limit: Int!) {
    transactions(tags: $tags, first: $limit) {
      edges {
        node {
          id
          address
          timestamp
          tags {
            name
            value
          }
        }
      }
    }
  }
\`;

const variables = {
  tags: [{ name: "Content-Type", values: ["application/json"] }],
  limit: 5
};

const res = await fetch("https://uploader.irys.xyz/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query, variables })
});

const { data } = await res.json();
console.log(data.transactions.edges);
\`\`\`

The Irys SDK and GraphQL endpoint make it easy to search and fetch your uploads programmatically, it makes it easy to filter by metadata, wallet address, or other attributes.`,
  },
  {
    title: 'Programmable Data',
    description: 'Use Irys as a programmable data layer.',
    notes: `With Irys, your stored data can be interacted with like a database. Because the data is permanent, your logic can rely on it being immutable.

This is powerful for:
- Building on-chain indexes
- Creating verifiable datasets
- Running analytics without worrying about data loss`,
  },
  {
    title: 'IrysJS',
    description: 'Interact with Irys programmatically using the official JavaScript SDK.',
    notes: `IrysJS is the official library for uploading and managing data.

Example:
\`\`\`
===== js =====
import Irys from '@irys/sdk';
const irys = new Irys({ network: 'mainnet', token: 'matic' });
const receipt = await irys.upload('Hello World');
console.log('Tx ID:', receipt.id);
\`\`\`

Supports Node.js, browsers, and DApps.`,
  },
  {
    title: 'REST API Routes',
    description: 'Access Irys features without the SDK.',
    notes: `The Irys REST API allows you to upload and read data over HTTPS.

Example:
\`\`\`
===== bash =====
curl -X POST https://node1.irys.xyz/tx \
  -H "Content-Type: application/json" \
  -d '{"data":"SGVsbG8gd29ybGQ="}'
\`\`\`

This is useful for environments where you can’t run the SDK, like IoT devices or serverless functions.`,
  },
  {
    title: 'Uploading Assets',
    description: 'Best practices for uploading large files.',
    notes: `Irys supports large uploads by splitting data into chunks and uploading in sequence.

For large assets like videos or datasets:
- Compress files before upload
- Use chunked uploads
- Monitor the transaction receipt for confirmation`,
  },
  {
    title: 'Command Line Interface',
    description: 'Manage Irys from your terminal.',
    notes: `Irys provides a CLI tool for quick uploads and management.

Example:
\`\`\`
===== bash =====
npx @irys/cli upload ./file.txt --network mainnet --token matic
\`\`\`

Perfect for scripts, automation, and power users.`,
  },
  {
    title: 'IrysVM',
    description: 'Execute verifiable computations on stored data.',
    notes: `IrysVM allows you to run lightweight computations on-chain with guaranteed reproducibility.

Use cases include:
- Verifiable AI model outputs
- Deterministic analytics
- Permanent smart contract state extensions`,
  },
  {
    title: 'Irys Testnet & Faucet',
    description: 'Practice with Irys on testnet using free faucet credits.',
    notes: `Before going live, you can experiment on the Irys testnet. It works just like the mainnet, but uses test credits.

You can get testnet tokens from the Irys faucet, then try out uploads, integration, and data retrieval without risk.

Just switch the SDK’s network to testnet and start building!`,
  },
  {
    title: 'Full Documentation',
    description: 'Explore the complete Irys documentation for advanced guides.',
    notes: `For a deep dive into all features, APIs, and SDK capabilities, visit the <a href="https://docs.irys.xyz">OFFICIAL IRYS DOCUMENTATION`,
  },
];
