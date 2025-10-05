# PinPeer 📌

**Support creators. Pin your peers. Build together.**

PinPeer is a decentralized creator support platform built on the Stacks blockchain, inspired by "Buy Me a Coffee" but designed for the Web3 era. Support amazing creators building in the Stacks ecosystem with STX donations.

## 🌟 What is PinPeer?

PinPeer connects supporters with innovative creators building tools, platforms, and applications in the blockchain space. Instead of traditional payment methods, PinPeer uses STX (Stacks tokens) to enable direct peer-to-peer donations on the Stacks testnet.

## ✨ Features

- **🎯 Direct Creator Support**: Browse creator profiles showcasing their projects and contributions
- **💰 Flexible Donations**: Choose from preset donation amounts (5, 10, 25, or 50 STX)
- **🔐 Secure Wallet Integration**: Connect your Stacks wallet with one click
- **📱 Responsive Design**: Beautiful dark-themed interface that works on all devices
- **🎉 Celebration Experience**: Success animations and transaction receipts after each donation
- **⚡ Real-time Transactions**: Instant STX transfers via the Stacks blockchain

## 🚀 How It Works

1. **Connect Wallet**: Click "Connect Wallet" in the header to link your Stacks wallet
2. **Browse Creators**: Explore creator cards showcasing projects like DeFi dashboards, NFT marketplaces, smart contract auditors, and more
3. **Select Amount**: Choose your desired donation amount from the available options
4. **Pin This Peer**: Click the button to initiate a secure STX transfer
5. **Celebrate**: Watch confetti fall as your transaction receipt appears!

## 🛠️ Technology Stack

- **Frontend**: React 19 + Vite
- **Blockchain**: Stacks Blockchain (Testnet)
- **Wallet Integration**: @stacks/connect
- **Network**: @stacks/network & @stacks/transactions
- **Styling**: Raw CSS (no frameworks)

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd pinpeer

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌐 Network Configuration

Currently configured for **Stacks Testnet**. All transactions use testnet STX tokens.

Test address: `STSSJJAT3JRQ97A1DSHX3P2BGPFJHWZWNCVY6CY1`

## 🎨 Design Philosophy

PinPeer features a modern, minimalist dark theme with yellow accent colors (#FACC15) that creates a warm, inviting atmosphere. The interface is designed to be:

- **Clean**: Minimal distractions, focus on creators
- **Intuitive**: Simple three-step donation process
- **Delightful**: Celebration animations for successful transactions
- **Accessible**: Clear typography and high contrast

## 📄 Project Structure

```
src/
├── App.jsx                 # Main application component
├── Header.jsx              # Navigation header with wallet connection
├── CreatorsGrid.jsx        # Grid layout for creator cards
├── CreatorCard.jsx         # Individual creator card component
├── SuccessModal.jsx        # Transaction success celebration modal
├── mockData.js             # Creator data (replace with API in production)
└── *.css                   # Component-specific styles
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Add new features
- Improve UI/UX
- Fix bugs
- Enhance documentation

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

Built with ❤️ for the Stacks community.

Special thanks to all the creators building amazing tools and platforms in the Web3 ecosystem.

---

**Ready to support creators? Start pinning your peers today! 🚀**
