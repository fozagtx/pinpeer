# PinPeer: A Decentralized Creator Support Platform

PinPeer is a decentralized application (dApp) built on the Stacks blockchain that empowers users to directly support their favorite creators with Stacks (STX) tokens. It provides a seamless and transparent way for fans to contribute to creators, fostering a closer connection and enabling creators to thrive with the support of their community.

## ✨ Features

- **Direct Creator Support**: Seamlessly send STX donations to any registered creator.
- **Decentralized and Transparent**: All transactions are recorded on the Stacks blockchain, ensuring full transparency.
- **Real-Time Experience**: Transactions are processed on the Stacks testnet, providing a near-instant experience.
- **User-Friendly Interface**: A clean, responsive, and dark-themed UI makes it easy to navigate and use.
- **Secure Wallet Integration**: Connects securely with your existing Stacks wallet.

## 🚀 Product Walkthrough

PinPeer offers a straightforward and intuitive experience. Here’s how it works:

1.  **Connect Your Wallet**:
    - When you first visit PinPeer, you'll be prompted to connect your Stacks wallet.
    - Click the "Connect Wallet" button in the header.
    - Authorize the connection in your wallet to get started.

2.  **Explore Creators**:
    - Once connected, you'll see a curated list of creators you can support.
    - Each creator card displays their name, a brief bio, and their Stacks address.

3.  **Support a Creator**:
    - Choose a creator and click the "Support" button on their card.
    - A modal will appear where you can enter the amount of STX you wish to donate.
    - Confirm the transaction, and your support is on its way!

4.  **Transaction Confirmation**:
    - After you send a donation, a success notification will confirm that your transaction has been processed.
    - You can view the transaction details on the Stacks explorer for full transparency.

## 🏛️ Architecture Overview

PinPeer is built with a modern, component-based architecture:

-   **`App.jsx`**: The main application component that orchestrates the overall layout and state.
-   **`Header.jsx`**: Manages the application's header, including the wallet connection logic.
-   **`CreatorsGrid.jsx`**: Displays the grid of creators available for support.
-   **`CreatorCard.jsx`**: A reusable component that represents a single creator.
-   **`SuccessModal.jsx`**: A modal window that appears after a successful transaction.
-   **`TransactionHistory.jsx`**: (Future feature) Will display a history of your past donations.

## 🛠️ Technology Stack

-   **Frontend**: React 19, Vite
-   **Blockchain**: Stacks (Testnet)
-   **Libraries**:
    -   `@stacks/connect`: For wallet integration.
    -   `@stacks/network`: To connect to the Stacks network.
    -   `@stacks/transactions`: For creating and managing transactions.
-   **Styling**: CSS with a modern, dark-themed design.

## 🏁 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [npm](https://www.npmjs.com/)
-   A Stacks-compatible wallet (e.g., Hiro Wallet)

### Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/pinpeer.git
    cd pinpeer
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## scripts
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Lints the codebase.

## 🌐 Network

This project is configured to use the **Stacks Testnet**.

-   **Test Address for Donations**: `STSSJJAT3JRQ97A1DSHX3P2BGPFJHWZWNCVY6CY1`

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements or find a bug, please open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.