# Run this script as Administrator to reset PostgreSQL password

Write-Host "`n🔧 PostgreSQL Password Reset Tool" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════`n" -ForegroundColor Cyan

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "❌ This script must be run as Administrator!" -ForegroundColor Red
    Write-Host "`nTo run as Administrator:" -ForegroundColor Yellow
    Write-Host "1. Right-click on PowerShell" -ForegroundColor White
    Write-Host "2. Select 'Run as Administrator'" -ForegroundColor White
    Write-Host "3. Navigate to this folder and run the script again`n" -ForegroundColor White
    pause
    exit
}

$pgVersion = "18"
$pgPath = "C:\Program Files\PostgreSQL\$pgVersion"
$pgDataPath = "$pgPath\data"
$pgHbaFile = "$pgDataPath\pg_hba.conf"
$pgBinPath = "$pgPath\bin"

# Check if PostgreSQL is installed
if (-not (Test-Path $pgPath)) {
    Write-Host "❌ PostgreSQL $pgVersion not found at: $pgPath" -ForegroundColor Red
    Write-Host "Please install PostgreSQL or update the version number in this script.`n" -ForegroundColor Yellow
    pause
    exit
}

Write-Host "✅ Found PostgreSQL $pgVersion`n" -ForegroundColor Green

# Backup pg_hba.conf
Write-Host "📋 Step 1: Backing up configuration..." -ForegroundColor Yellow
$backupFile = "$pgHbaFile.backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
Copy-Item $pgHbaFile $backupFile
Write-Host "✅ Backup created: $backupFile`n" -ForegroundColor Green

# Modify pg_hba.conf to allow trust authentication
Write-Host "📋 Step 2: Modifying authentication settings..." -ForegroundColor Yellow
$content = Get-Content $pgHbaFile
$newContent = $content -replace 'scram-sha-256', 'trust'
$newContent | Set-Content $pgHbaFile
Write-Host "✅ Authentication temporarily set to 'trust'`n" -ForegroundColor Green

# Restart PostgreSQL service
Write-Host "📋 Step 3: Restarting PostgreSQL service..." -ForegroundColor Yellow
try {
    Restart-Service -Name "postgresql-x64-$pgVersion" -Force
    Start-Sleep -Seconds 3
    Write-Host "✅ PostgreSQL service restarted`n" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to restart service: $_" -ForegroundColor Red
    Write-Host "Please restart manually from services.msc`n" -ForegroundColor Yellow
    pause
    exit
}

# Get new password
Write-Host "📋 Step 4: Setting new password..." -ForegroundColor Yellow
Write-Host "Enter new password for PostgreSQL (or press Enter for 'jay@662'): " -ForegroundColor White -NoNewline
$newPasswordSecure = Read-Host -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($newPasswordSecure)
$newPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

if ([string]::IsNullOrWhiteSpace($newPassword)) {
    $newPassword = "jay@662"
}

# Reset password using psql
Write-Host "Setting password to: $newPassword" -ForegroundColor White
$sqlCommand = "ALTER USER postgres PASSWORD '$newPassword';"
& "$pgBinPath\psql.exe" -U postgres -c $sqlCommand 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Password updated successfully!`n" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to update password`n" -ForegroundColor Red
}

# Restore pg_hba.conf
Write-Host "📋 Step 5: Restoring security settings..." -ForegroundColor Yellow
Copy-Item $backupFile $pgHbaFile -Force
Write-Host "✅ Security settings restored`n" -ForegroundColor Green

# Restart PostgreSQL service again
Write-Host "📋 Step 6: Restarting PostgreSQL with new settings..." -ForegroundColor Yellow
try {
    Restart-Service -Name "postgresql-x64-$pgVersion" -Force
    Start-Sleep -Seconds 3
    Write-Host "✅ PostgreSQL service restarted`n" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to restart service`n" -ForegroundColor Red
}

# Test connection
Write-Host "📋 Step 7: Testing new password..." -ForegroundColor Yellow
$env:PGPASSWORD = $newPassword
$testResult = & "$pgBinPath\psql.exe" -U postgres -c "SELECT 'Connection successful!' as status;" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Password works! Connection successful!`n" -ForegroundColor Green
    
    # Create database
    Write-Host "📋 Step 8: Creating database..." -ForegroundColor Yellow
    & "$pgBinPath\psql.exe" -U postgres -c "DROP DATABASE IF EXISTS myprojectdb;" 2>&1 | Out-Null
    & "$pgBinPath\psql.exe" -U postgres -c "CREATE DATABASE myprojectdb;" 2>&1 | Out-Null
    
    $setupScript = "C:\Users\karna\Desktop\CopyOfMyprjectwihoutDependencies\majorproject\database\setup_database.sql"
    if (Test-Path $setupScript) {
        & "$pgBinPath\psql.exe" -U postgres -d myprojectdb -f $setupScript 2>&1 | Out-Null
        Write-Host "✅ Database and tables created successfully!`n" -ForegroundColor Green
    }
    
    # Update .env file
    Write-Host "📋 Step 9: Updating .env file..." -ForegroundColor Yellow
    $envFile = "C:\Users\karna\Desktop\CopyOfMyprjectwihoutDependencies\majorproject\backend_node\.env"
    if (Test-Path $envFile) {
        $envContent = Get-Content $envFile
        $envContent = $envContent -replace 'DB_PASSWORD=.*', "DB_PASSWORD=$newPassword"
        $envContent | Set-Content $envFile
        Write-Host "✅ .env file updated with new password`n" -ForegroundColor Green
    }
    
    Write-Host "════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "🎉 SUCCESS! Everything is setup!" -ForegroundColor Green
    Write-Host "════════════════════════════════════════════`n" -ForegroundColor Cyan
    
    Write-Host "📊 Database Information:" -ForegroundColor Cyan
    Write-Host "   Database: myprojectdb" -ForegroundColor White
    Write-Host "   User: postgres" -ForegroundColor White
    Write-Host "   Password: $newPassword" -ForegroundColor White
    Write-Host "   Host: localhost" -ForegroundColor White
    Write-Host "   Port: 5432`n" -ForegroundColor White
    
    Write-Host "👥 Default User Accounts:" -ForegroundColor Cyan
    Write-Host "   Admin:        admin / admin" -ForegroundColor White
    Write-Host "   Manufacturer: manu / manu" -ForegroundColor White
    Write-Host "   Supplier:     supp / supp" -ForegroundColor White
    Write-Host "   Retailer:     retailer / retailer" -ForegroundColor White
    Write-Host "   Consumer:     consumer / consumer`n" -ForegroundColor White
    
    Write-Host "🚀 Next Steps:" -ForegroundColor Cyan
    Write-Host "   1. cd majorproject\backend_node" -ForegroundColor White
    Write-Host "   2. node postgres.js`n" -ForegroundColor White
    
} else {
    Write-Host "❌ Password test failed" -ForegroundColor Red
    Write-Host "Please check the error messages above`n" -ForegroundColor Yellow
}

$env:PGPASSWORD = $null

Write-Host "Press any key to exit..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
