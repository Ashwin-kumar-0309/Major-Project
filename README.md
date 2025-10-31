# Identeefi - Blockchain Product Authentication System

## 🚀 Project Overview

Identeefi is a blockchain-powered product authentication and supply chain management system. It leverages Ethereum blockchain technology to provide transparent, secure, and immutable product verification.

## ✨ Key Features

### Core Functionality
- 🔐 **Blockchain Integration** - Ethereum Sepolia testnet for immutable records
- 📱 **QR Code Scanning** - Quick product verification
- 🔍 **Real-time Tracking** - Complete supply chain visibility
- 👥 **Multi-Role System** - Admin, Manufacturer, Supplier, Retailer, Consumer
- 📊 **Analytics Dashboard** - Real-time insights and statistics
- 🔔 **Notifications** - Real-time updates on product status
- 📝 **Complaint Management** - Customer feedback system

### Enhanced UI/UX
- 🎨 Modern gradient designs
- ⚡ Smooth animations and transitions
- 📱 Fully responsive layout
- 🌈 Role-specific color themes
- 💫 Interactive dashboard cards
- 🔄 Loading states and progress indicators

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - UI library
- **Material-UI (MUI) 5.11** - Component library
- **React Router 6.8** - Navigation
- **Ethers.js 5.7.2** - Blockchain interaction
- **Axios** - HTTP client
- **html5-qrcode** - QR scanning
- **QRCode.react** - QR generation

### Backend
- **Node.js** - Runtime
- **Express 4.18** - Web framework
- **PostgreSQL** - Database
- **Ethers.js 6.15** - Blockchain interaction
- **Multer** - File uploads
- **CORS** - Cross-origin resource sharing

### Blockchain
- **Solidity** - Smart contract language
- **Hardhat** - Development environment
- **Ethereum Sepolia** - Test network

## 📋 Prerequisites

Before running this project, ensure you have:

1. **Node.js** (v14 or higher)
2. **PostgreSQL** (v12 or higher)
3. **MetaMask** browser extension
4. **Git** (optional, for version control)

## 🔧 Installation & Setup

### 1. Database Setup

#### Install PostgreSQL (if not installed)
```bash
# Windows: Download from https://www.postgresql.org/download/windows/
# Or use chocolatey
choco install postgresql

# Verify installation
psql --version
```

#### Create Database
```sql
-- Open psql command line
psql -U postgres

-- Create database
CREATE DATABASE myprojectdb;

-- Connect to database
\c myprojectdb

-- Run the SQL from database/create_table.txt
-- Or import the schema
```

### 2. Backend Setup

```powershell
# Navigate to backend directory
cd majorproject\backend_node

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your settings:
DB_HOST=localhost
DB_USER=postgres
DB_PORT=5432
DB_PASSWORD=your_postgres_password
DB_NAME=myprojectdb

# Blockchain settings (optional for local testing)
CONTRACT_ADDRESS=0xc7bd9f495f66D664555aCa1a68FdF9c525AaCcD4
SEPOLIA_QUICKNODE_KEY=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
PRIVATE_KEY=your_wallet_private_key

# Start the server
node postgres.js
```

Server will run on: **http://localhost:5000**

### 3. Frontend Setup

```powershell
# Navigate to frontend directory
cd majorproject\frontend_react

# Install dependencies
npm install --legacy-peer-deps

# Configure environment variables
# Edit .env file:
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_CONTRACT_ADDRESS=0xc7bd9f495f66D664555aCa1a68FdF9c525AaCcD4
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key (optional)

# Start the development server
npm start
```

Frontend will open at: **http://localhost:3000**

## 👤 Login Credentials

Refer to `LOGIN_CREDENTIALS.txt` in the root directory for all user accounts.

### Quick Access:
- **Admin**: admin / admin
- **Manufacturer**: manu / manu
- **Supplier**: supp / supp
- **Retailer**: retailer / retailer
- **Consumer**: consumer / consumer

## 📁 Project Structure

```
majorproject/
├── backend_node/          # Express.js backend
│   ├── postgres.js        # Main server file
│   ├── contract.json      # Smart contract ABI
│   ├── .env              # Environment variables
│   └── public/uploads/   # File uploads
├── frontend_react/        # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── css/          # Stylesheets
│   │   └── api/          # API configuration
│   └── .env              # Frontend environment
├── smartcontract_solidty/ # Hardhat project
│   ├── contracts/        # Solidity contracts
│   └── scripts/          # Deployment scripts
└── database/             # Database schemas
```

## 🚀 Usage Guide

### For Manufacturers
1. Login with manufacturer credentials
2. Connect MetaMask wallet
3. Add new products with details
4. View and manage product inventory
5. Handle customer complaints

### For Suppliers
1. Login with supplier credentials
2. Scan QR codes to update product location
3. Track supply chain progress

### For Retailers
1. Login with retailer credentials
2. Scan products to add to inventory
3. Update product status
4. View sales analytics

### For Consumers
1. Login with consumer credentials
2. Scan product QR codes
3. Verify product authenticity
4. File complaints if needed
5. Track purchased products

### For Admins
1. Login with admin credentials
2. View system-wide analytics
3. Approve/reject user accounts
4. Manage manufacturers and retailers
5. Review and resolve complaints

## 🔐 MetaMask Setup

1. Install MetaMask extension
2. Create or import wallet
3. Switch to Sepolia testnet
4. Get test ETH from faucet: https://sepoliafaucet.com/
5. Connect wallet when prompted in the app

## 🐛 Troubleshooting

### Database Connection Error
```bash
Error: password authentication failed for user "postgres"
```
**Solution**: 
- Verify PostgreSQL is running
- Check DB_PASSWORD in backend/.env
- Ensure database "myprojectdb" exists

### Frontend Dependency Issues
```bash
npm ERR! ERESOLVE could not resolve
```
**Solution**: 
- Use `npm install --legacy-peer-deps`
- Clear npm cache: `npm cache clean --force`

### Port Already in Use
```bash
Error: Port 5000 is already in use
```
**Solution**:
- Kill the process: `netstat -ano | findstr :5000`
- Or change port in backend code

### MetaMask Not Detected
**Solution**:
- Install MetaMask extension
- Refresh the page
- Check browser compatibility

## 📊 API Endpoints

### Authentication
- `POST /login` - User login
- `GET /profile/:username` - Get user profile

### Products
- `POST /addProduct` - Add new product
- `GET /products` - Get all products
- `GET /product/:serialNumber` - Get product details
- `PUT /updateProduct` - Update product

### Admin
- `GET /profileAll` - Get all user profiles
- `PUT /approve/:username` - Approve user account
- `GET /complaints` - Get all complaints

### Consumer
- `GET /consumer/products/:username` - Get user's products
- `POST /consumer/complaint` - File complaint

## 🌟 New Features Added

1. **Enhanced UI/UX**
   - Modern gradient backgrounds
   - Animated components
   - Improved card layouts
   - Better color schemes

2. **Dashboard Stats Component**
   - Real-time analytics
   - Visual progress indicators
   - Trend analysis

3. **Notification System**
   - Real-time notifications
   - Badge counters
   - Mark as read functionality

4. **Improved Login Flow**
   - Role-based cards
   - Iconography
   - Better visual hierarchy

5. **Wallet Integration**
   - Clear connection status
   - Wallet address display
   - Connection prompts

## 📝 License

This project is developed for educational purposes.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📧 Support

For issues and questions:
- Check troubleshooting section
- Review database setup
- Verify environment variables
- Check console logs for errors

## 🎉 Acknowledgments

- Ethereum Foundation for blockchain technology
- Material-UI for component library
- OpenZeppelin for smart contract standards
- React team for the amazing framework

---

**Made with ❤️ for secure product authentication**

Last Updated: October 30, 2025
