# ⚡ QUICK START GUIDE

## 🚀 Get Started in 5 Minutes!

### Step 1: Setup PostgreSQL Database (2 minutes)

1. **Ensure PostgreSQL is installed and running**
   ```powershell
   # Check if PostgreSQL is running
   pg_isready
   ```

2. **Create and setup database**
   ```powershell
   # Open psql
   psql -U postgres
   
   # Run the setup script
   \i 'C:/Users/karna/Desktop/CopyOfMyprjectwihoutDependencies/majorproject/database/setup_database.sql'
   
   # Or manually:
   CREATE DATABASE myprojectdb;
   \c myprojectdb
   # Then paste the SQL from setup_database.sql
   ```

3. **Verify setup**
   ```sql
   -- Check tables
   \dt
   
   -- View users
   SELECT * FROM auth;
   ```

### Step 2: Update Backend Configuration (1 minute)

1. **Edit backend `.env` file**
   Location: `majorproject/backend_node/.env`
   
   ```env
   # UPDATE THIS PASSWORD to match your PostgreSQL password
   DB_PASSWORD=your_actual_postgres_password
   
   # Other settings (usually correct by default)
   DB_HOST=localhost
   DB_USER=postgres
   DB_PORT=5432
   DB_NAME=myprojectdb
   ```

2. **Save the file**

### Step 3: Start Backend Server (30 seconds)

```powershell
# Navigate to backend
cd C:\Users\karna\Desktop\CopyOfMyprjectwihoutDependencies\majorproject\backend_node

# Start server
node postgres.js
```

✅ **Expected output:**
```
Server is running on port 5000
Database connected successfully
```

❌ **If you see error:**
```
Database connection failed: password authentication failed
```
➡️ Go back to Step 2 and fix the password in `.env`

### Step 4: Start Frontend (30 seconds)

**Open a NEW PowerShell window:**

```powershell
# Navigate to frontend
cd C:\Users\karna\Desktop\CopyOfMyprjectwihoutDependencies\majorproject\frontend_react

# Start React app
npm start
```

✅ **Expected:** Browser opens automatically at http://localhost:3000

### Step 5: Login and Explore! (1 minute)

1. **Click "Get Started" or "Login"**
2. **Choose a role:**
   - Admin: `admin` / `admin`
   - Manufacturer: `manu` / `manu`
   - Retailer: `retailer` / `retailer`
   - Consumer: `consumer` / `consumer`

3. **Explore the features!**

---

## 🎯 What You Can Do

### As Manufacturer
- ➕ Add new products
- 📦 View product inventory
- 🔍 Track supply chain
- 💬 Handle complaints

### As Retailer
- 📱 Scan QR codes
- 📊 Manage inventory
- ✅ Update product status

### As Consumer
- 🔍 Verify product authenticity
- 📱 Scan QR codes
- 💬 File complaints
- 📦 Track purchases

### As Admin
- 👥 Manage users
- ✅ Approve accounts
- 📊 View analytics
- 🔧 System control

---

## 🔧 Troubleshooting

### Problem: Backend won't start
**Solution:**
```powershell
# Check if port 5000 is in use
netstat -ano | findstr :5000

# If something is using it, kill the process or change port
# To change port, edit postgres.js line ~18:
const port = 5001; # Change to different port
```

### Problem: Frontend shows connection error
**Solution:**
1. Ensure backend is running on port 5000
2. Check browser console for errors
3. Verify .env has correct API_BASE_URL

### Problem: Database connection fails
**Solution:**
1. Check PostgreSQL service is running
2. Verify password in backend/.env
3. Ensure database "myprojectdb" exists
4. Check if user "postgres" has access

### Problem: MetaMask not working
**Solution:**
1. Install MetaMask extension
2. Create/import wallet
3. Switch to Sepolia testnet
4. Get test ETH from faucet
5. Refresh page

---

## 📱 Features at a Glance

### ✨ Enhanced UI
- 🎨 Beautiful gradient designs
- ⚡ Smooth animations
- 📱 Mobile responsive
- 🌈 Color-coded roles

### 🔐 Security
- 🔗 Blockchain verification
- 🔒 Secure authentication
- 📝 Immutable records

### 📊 Analytics
- 📈 Real-time stats
- 📊 Dashboard insights
- 🔔 Notifications

---

## 🎮 Try These First!

1. **Login as Manufacturer** → Add a product
2. **Login as Retailer** → Scan product QR
3. **Login as Consumer** → Verify product authenticity
4. **Login as Admin** → View system analytics

---

## 📞 Need Help?

1. Check README.md for detailed documentation
2. Review LOGIN_CREDENTIALS.txt for all accounts
3. Check console logs for error messages
4. Verify all environment variables are set correctly

---

## 🌟 Pro Tips

- 💡 Keep both terminals open (backend + frontend)
- 💡 Check browser console for detailed errors
- 💡 Use Chrome DevTools for debugging
- 💡 Clear browser cache if styles don't update
- 💡 Restart backend after changing .env

---

**You're all set! Enjoy exploring Identeefi! 🎉**

Made with ❤️ for secure product authentication
