@echo off
echo ================================================
echo PostgreSQL Database Setup for Identeefi
echo ================================================
echo.

REM Set PostgreSQL path
set PGPATH=C:\Program Files\PostgreSQL\18\bin

echo Step 1: Testing PostgreSQL connection...
echo.
echo Please enter your PostgreSQL password when prompted.
echo (This is the password you set during PostgreSQL installation)
echo.

REM Prompt for password
set /p PGPASSWORD="Enter PostgreSQL password: "

echo.
echo Step 2: Creating database and tables...
echo.

REM Create database
"%PGPATH%\psql.exe" -U postgres -c "DROP DATABASE IF EXISTS myprojectdb;"
"%PGPATH%\psql.exe" -U postgres -c "CREATE DATABASE myprojectdb;"

echo.
echo Step 3: Setting up tables and default users...
echo.

REM Run setup script
"%PGPATH%\psql.exe" -U postgres -d myprojectdb -f "%~dp0majorproject\database\setup_database.sql"

echo.
echo ================================================
echo Setup Complete!
echo ================================================
echo.
echo Database Name: myprojectdb
echo Default Users:
echo   Admin:        admin / admin
echo   Manufacturer: manu / manu
echo   Supplier:     supp / supp
echo   Retailer:     retailer / retailer
echo   Consumer:     consumer / consumer
echo.
echo Next: Update your password in majorproject\backend_node\.env
echo Then run: node postgres.js
echo.
pause
