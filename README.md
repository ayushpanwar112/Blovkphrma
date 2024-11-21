
# BlockPharma

This project aims to create an advanced system for demand forecasting and inventory optimization in drug stores by integrating machine learning models and blockchain technology. The system will enhance supply chain transparency, security, and efficiency, with the goal of preventing stockouts, reducing overstock situations, and addressing issues such as counterfeiting and data integrity.

## Project Features

- **Demand Forecasting:** Advanced machine learning models for precise forecasting of drug demand.
- **Blockchain Supply Chain:** Transparent and secure recording of transactions and product movements in the supply chain.
- **Smart Contracts:** Automated reordering processes and real-time price adjustments via Ethereum-based smart contracts.
- **Secure Data Management:** Secure sharing of sensitive data between stakeholders using blockchain.

## Technologies Used

- **Frontend:**
  - HTML, CSS, JavaScript
  - React.js
- **Backend:**
  - PostgreSQL for database management
  - Prisma ORM for database interaction
- **Machine Learning:**
  - Python (for demand forecasting)
  - SARIMA, LSTM models for time series analysis
- **Blockchain:**
  - Ethereum or Polygon (for blockchain transactions)
  - Solidity for writing smart contracts
  - Hardhat for blockchain development and testing

## Prerequisites

To run this project locally, ensure you have the following installed:

- **npm** (or **yarn**) for package management
- **Git** for version control

## Getting Started

Follow these steps to set up the project locally on your machine.

### 1. Clone the Repository

Use Git to clone the project repository to your local machine:

```bash
git clone https://github.com/Ashishbhatt97/BlockPharma.git
```

### 2. Navigate to the Project Directory

```bash
cd your-repo-name
```

### 3. Install Dependencies

Install all the necessary dependencies by running the following command:

```bash
npm install
```

Or if you are using **yarn**, use:

```bash
yarn install
```

### 4. Set Up Environment Variables

Create a `.env.local` file in the root directory and add your environment variables. You can copy the example file and update it with your specific configuration:

```bash
cp .env.example .env.local
```

Fill in the required environment variables inside `.env.local` as per your project’s needs.

### 5. Run the Development Server

Once everything is set up, run the development server with the following command:

```bash
npm run dev
```

Or using **yarn**:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

```bash
├── components      # Reusable components
├── pages           # Page components
├── public          # Static files (images, icons, etc.)
├── styles          # CSS files or styled components
├── utils           # Utility functions
├── .env.example    # Example environment file
└── ...
```

## Contributing

Feel free to submit issues and enhancement requests. If you'd like to contribute, please fork the repository and create a pull request with your changes.

### Steps to contribute

1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m "Add a new feature"`
4. Push to the branch: `git push origin feature-branch-name`
5. Open a pull request.
