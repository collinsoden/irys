# IrysExplorer 3D

**IrysExplorer 3D** is a web-based interactive data exploration tool built using **Next.js**, designed to visualize, track, and interact with data stored on [Irys](https://irys.xyz). The goal is to make the decentralized data layer fun and accessible, while educating users about programmable data, smart contract integrations, and real-world use cases of Irys.

---

## 🌐 Live Demo
> _Coming Soon_

---

## What Makes This Explorer Different?
While Irys already offers an official explorer at testnet-explorer.irys.xyz, this project — IrysExplorer 3D — takes a bold new approach focused on exploration, visualization, and developer tooling.


| Feature                         | Official Explorer  | IrysExplorer 3D (This Project)     |
| ------------------------------- | -----------------  | ---------------------------------- |
| Real-time transaction viewer    | ✅                 | ✅                                |
| **3D visualization of network** | ❌                 | ✅ (powered by Three.js)          |
| **Data categorization & tags**  | ❌                 | ✅ (auto + user-generated)        |
| **Uploader profiles**           | ❌                 | ✅ (upload history, badges, more) |
| **Gamified discovery**          | ❌                 | ✅ (exploration rewards, badges)  |
| **Custom dashboards & filters** | ❌                 | ✅                                |
| **Upload simulation interface** | ❌                 | ✅ (drag & drop, metadata UI)     |
| **Data utility insights**       | ❌                 | ✅ (NFTs, smart contracts, etc.)  |
| **Developer-focused tools**     | ❌                 | ✅ (SDK hooks, payload viewers)   |


## 🚀 Features

### 📦 Upload & Download Tracking
- Real-time tracking of uploads to Irys
- Live feed with metadata and uploader identity
- Preview and download content directly from the app

### 🔍 Explorer Mode
- Interactive 3D visualization of data nodes and their relationships (using Three.js or React Three Fiber)
- Filter and search uploads by uploader, tag, or associated smart contract
- View programmable logic connected to each data object

### 🧠 IrysVM Integration
- Smart contracts linked to stored data
- Visual interface for understanding and interacting with contract logic (read-only)
- See how data flows between uploads and contracts

### 🛠 Playground
- Developers can simulate Irys SDK usage
- Upload custom content, add tags, and test retrieval
- Code snippets with live API response

### 📘 Docs & Tutorials
- Learn how Irys works from both a user and developer perspective
- Full walkthroughs and SDK guides

---

## 📁 Project Structure (Pages)

- `/` — Home: Landing page with intro, hero, and live 3D feed
- `/uploads` — Upload Tracker with filters and activity feed
- `/downloads` — Browse and preview downloadable content
- `/explorer` — 3D visualization of uploaded data & relations
- `/upload/[id]` — Dynamic page for each upload’s metadata and interaction options
- `/contracts` — Smart contracts viewer connected to IrysVM
- `/contributors` — Top projects and uploaders using Irys
- `/playground` — Try out Irys SDK features live
- `/docs` — Educational content and technical docs
- `/about` — Project mission and credits

---

## 🧑‍💻 Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS, Framer Motion (for smooth animations)
- **Web3:** Irys SDK, Arweave Gateway, MetaMask, ArConnect, Bundlr Wallet
- **3D Engine:** React Three Fiber / Three.js
- **State Management:** Zustand or React Context

---

## 🖌 Branding & UI

- Uses the official Irys [Brand Kit](https://irys-xyz.notion.site/Brand-Kit-185e9455e49880a79e18c48d33fa4140)
- Super interactive UI with clean typography, theme toggle, and seamless animations
- Fully responsive for mobile, tablet, and desktop

---

## 🔐 Authentication

- Wallet-based login (MetaMask / ArConnect)
- Personal dashboard and identity-based tracking of uploads

---

## 💡 Future Ideas

- Upload heatmaps, trends, and analytics
- AI dataset-specific preview tools (e.g., CSV/JSON viewers, model visualizers)
- Collab boards for co-owned datasets
- On-chain incentives for data sharing

---

## 🛠 Setup Instructions

```bash
# 1. Clone the repo
https://github.com/your-username/irys-explorer-3d

# 2. Install dependencies
yarn install

# 3. Run the dev server
yarn dev

# 4. Open http://localhost:3000
```

---

## 🤝 Contributing

We welcome contributions! Open issues, suggest features, or fork and PR:
1. Clone repo
2. Create a new branch: `feat/your-feature`
3. Commit your changes
4. Push and open a pull request

---

## 📜 License

MIT License. See `LICENSE` for more info.

---

## 🔗 Links

- Irys Website: https://irys.xyz
- Irys SDK: https://docs.irys.xyz
- Brand Kit: https://irys-xyz.notion.site/Brand-Kit-185e9455e49880a79e18c48d33fa4140

---

### Built with ❤️ for the @irys_xyz ecosystem
