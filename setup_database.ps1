# ================================================
# PostgreSQL Database Fix Script for Windows
# ================================================

Write-Host "`n🔧 PostgreSQL Database Setup Script" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════`n" -ForegroundColor Cyan

# Check if PostgreSQL is installed
Write-Host "📋 Step 1: Checking PostgreSQL installation..." -ForegroundColor Yellow

$pgPath = "C:\Program Files\PostgreSQL"
if (Test-Path $pgPath) {
    Write-Host "✅ PostgreSQL is installed at: $pgPath`n" -ForegroundColor Green
} else {
    Write-Host "❌ PostgreSQL not found at default location" -ForegroundColor Red
    Write-Host "Please install PostgreSQL from: https://www.postgresql.org/download/windows/`n" -ForegroundColor Yellow
    exit
}

# Get PostgreSQL password
Write-Host "📋 Step 2: PostgreSQL Password" -ForegroundColor Yellow
Write-Host "Current password in .env file: jay@662`n" -ForegroundColor White

$choice = Read-Host "Do you want to (1) Use this password or (2) Enter a different password? [1/2]"

if ($choice -eq "2") {
    $newPassword = Read-Host "Enter your PostgreSQL password" -AsSecureString
    $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($newPassword)
    $password = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
} else {
    $password = "jay@662"
}

Write-Host "`n📋 Step 3: Creating database..." -ForegroundColor Yellow

# Create SQL commands
$setupCommands = @"
-- Create database
DROP DATABASE IF EXISTS myprojectdb;
CREATE DATABASE myprojectdb;

-- Connect and create tables
\c myprojectdb

-- Create auth table
CREATE TABLE IF NOT EXISTS auth (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Create profile table
CREATE TABLE IF NOT EXISTS profile (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    name VARCHAR(50),
    description VARCHAR(500),
    website VARCHAR(255),
    location VARCHAR(50),
    image VARCHAR(255),
    role VARCHAR(50),
    approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create product table
CREATE TABLE IF NOT EXISTS product (
    serialnumber SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    description VARCHAR(500),
    manufacturer_username VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create consumer_products table
CREATE TABLE IF NOT EXISTS consumer_products (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    serial_number INTEGER NOT NULL,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (username, serial_number)
);

-- Create retailer_products table
CREATE TABLE IF NOT EXISTS retailer_products (
    id SERIAL PRIMARY KEY,
    retailer_username VARCHAR(50),
    serial_number INTEGER,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (retailer_username, serial_number)
);

-- Insert default users
INSERT INTO auth (username, password, role) VALUES
    ('admin', 'admin', 'admin'),
    ('manu', 'manu', 'manufacturer'),
    ('supp', 'supp', 'supplier'),
    ('retailer', 'retailer', 'retailer'),
    ('consumer', 'consumer', 'consumer')
ON CONFLICT (username) DO NOTHING;

-- Insert default profiles
INSERT INTO profile (username, name, description, role, approved) VALUES
    ('admin', 'System Administrator', 'Main system admin', 'admin', TRUE),
    ('manu', 'ABC Manufacturing', 'Product manufacturer', 'manufacturer', TRUE),
    ('supp', 'Global Supply Co', 'Supply chain', 'supplier', TRUE),
    ('retailer', 'Best Retail Store', 'Retail partner', 'retailer', TRUE),
    ('consumer', 'John Doe', 'Consumer', 'consumer', TRUE)
ON CONFLICT DO NOTHING;

SELECT 'Database setup completed!' as status;
"@

# Save SQL to temp file
$sqlFile = "$env:TEMP\identeefi_setup.sql"
$setupCommands | Out-File -FilePath $sqlFile -Encoding utf8

Write-Host "Attempting to connect to PostgreSQL and create database...`n" -ForegroundColor White

# Try to run psql
$env:PGPASSWORD = $password
$psqlResult = & "C:\Program Files\PostgreSQL\*\bin\psql.exe" -U postgres -f $sqlFile 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Database setup completed successfully!" -ForegroundColor Green
    Write-Host "`n📊 Database Information:" -ForegroundColor Cyan
    Write-Host "   Database Name: myprojectdb" -ForegroundColor White
    Write-Host "   Host: localhost" -ForegroundColor White
    Write-Host "   Port: 5432" -ForegroundColor White
    Write-Host "   User: postgres" -ForegroundColor White
    
    Write-Host "`n👥 Default User Accounts Created:" -ForegroundColor Cyan
    Write-Host "   Admin:        admin / admin" -ForegroundColor White
    Write-Host "   Manufacturer: manu / manu" -ForegroundColor White
    Write-Host "   Supplier:     supp / supp" -ForegroundColor White
    Write-Host "   Retailer:     retailer / retailer" -ForegroundColor White
    Write-Host "   Consumer:     consumer / consumer" -ForegroundColor White
    
    Write-Host "`n✅ Next Step: Start the backend server:" -ForegroundColor Green
    Write-Host "   cd majorproject\backend_node" -ForegroundColor Yellow
    Write-Host "   node postgres.js`n" -ForegroundColor Yellow
} else {
    Write-Host "`n❌ Database setup failed!" -ForegroundColor Red
    Write-Host "Error: $psqlResult`n" -ForegroundColor Red
    
    Write-Host "Manual Setup Instructions:" -ForegroundColor Yellow
    Write-Host "1. Open pgAdmin or psql command line" -ForegroundColor White
    Write-Host "2. Run the SQL commands from: database/setup_database.sql" -ForegroundColor White
    Write-Host "3. Or copy and run the SQL from: $sqlFile`n" -ForegroundColor White
}

# Clean up
Remove-Item $sqlFile -ErrorAction SilentlyContinue
$env:PGPASSWORD = $null

Write-Host "Press any key to exit..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
