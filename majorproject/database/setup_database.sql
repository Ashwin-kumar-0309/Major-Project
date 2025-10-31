-- ============================================
-- Identeefi Database Setup Script
-- PostgreSQL Database Schema
-- ============================================

-- Create database (run this separately if needed)
-- CREATE DATABASE myprojectdb;

-- Connect to the database
\c myprojectdb;

-- ============================================
-- Drop existing tables (if any)
-- ============================================
DROP TABLE IF EXISTS consumer_products CASCADE;
DROP TABLE IF EXISTS complaints CASCADE;
DROP TABLE IF EXISTS retailer_products CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS profile CASCADE;
DROP TABLE IF EXISTS auth CASCADE;

-- ============================================
-- Table: auth
-- Stores user authentication information
-- ============================================
CREATE TABLE auth (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'manufacturer', 'supplier', 'retailer', 'consumer'))
);

CREATE UNIQUE INDEX username_id ON auth (username);

-- ============================================
-- Table: profile
-- Stores user profile information
-- ============================================
CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL REFERENCES auth(username) ON DELETE CASCADE,
    name VARCHAR(50),
    description VARCHAR(500),
    website VARCHAR(255),
    location VARCHAR(50),
    image VARCHAR(255),
    role VARCHAR(50),
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Table: product
-- Stores product information
-- ============================================
CREATE TABLE product (
    serialnumber SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    description VARCHAR(500),
    manufacturer_username VARCHAR(50) REFERENCES auth(username),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Table: retailer_products
-- Tracks products with retailers
-- ============================================
CREATE TABLE retailer_products (
    id SERIAL PRIMARY KEY,
    retailer_username VARCHAR(50) REFERENCES auth(username),
    serial_number INTEGER REFERENCES product(serialnumber),
    added_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (retailer_username, serial_number)
);

-- ============================================
-- Table: consumer_products
-- Tracks products owned by consumers
-- ============================================
CREATE TABLE consumer_products (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL REFERENCES auth(username),
    serial_number INTEGER NOT NULL REFERENCES product(serialnumber),
    added_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (username, serial_number)
);

-- ============================================
-- Table: complaints
-- Stores customer complaints
-- ============================================
CREATE TABLE complaints (
    id SERIAL PRIMARY KEY,
    consumer_username VARCHAR(50) REFERENCES auth(username),
    manufacturer_username VARCHAR(50) REFERENCES auth(username),
    serial_number INTEGER REFERENCES product(serialnumber),
    complaint_text TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Open',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- ============================================
-- Insert Default Users
-- ============================================
INSERT INTO auth (username, password, role) VALUES
    ('admin', 'admin', 'admin'),
    ('manu', 'manu', 'manufacturer'),
    ('supp', 'supp', 'supplier'),
    ('retailer', 'retailer', 'retailer'),
    ('consumer', 'consumer', 'consumer');

-- Insert default profiles
INSERT INTO profile (username, name, description, role, approved) VALUES
    ('admin', 'System Administrator', 'Main system admin with full access', 'admin', TRUE),
    ('manu', 'ABC Manufacturing Ltd', 'Leading manufacturer of quality products', 'manufacturer', TRUE),
    ('supp', 'Global Supply Co', 'International supply chain partner', 'supplier', TRUE),
    ('retailer', 'Best Retail Store', 'Your trusted retail partner', 'retailer', TRUE),
    ('consumer', 'John Doe', 'Product verification enthusiast', 'consumer', TRUE);

-- ============================================
-- Sample Data (Optional)
-- ============================================

-- Insert sample products
INSERT INTO product (name, brand, description, manufacturer_username) VALUES
    ('Smartphone X Pro', 'TechBrand', 'Latest flagship smartphone with advanced features', 'manu'),
    ('Laptop Elite 15', 'CompuTech', 'Professional laptop for business users', 'manu'),
    ('Wireless Earbuds', 'AudioMax', 'Premium wireless earbuds with noise cancellation', 'manu');

-- ============================================
-- Grant Permissions
-- ============================================
ALTER TABLE auth OWNER TO postgres;
ALTER TABLE profile OWNER TO postgres;
ALTER TABLE product OWNER TO postgres;
ALTER TABLE retailer_products OWNER TO postgres;
ALTER TABLE consumer_products OWNER TO postgres;
ALTER TABLE complaints OWNER TO postgres;

-- ============================================
-- Create Indexes for Performance
-- ============================================
CREATE INDEX idx_profile_username ON profile(username);
CREATE INDEX idx_product_manufacturer ON product(manufacturer_username);
CREATE INDEX idx_retailer_products_retailer ON retailer_products(retailer_username);
CREATE INDEX idx_consumer_products_consumer ON consumer_products(username);
CREATE INDEX idx_complaints_consumer ON complaints(consumer_username);
CREATE INDEX idx_complaints_manufacturer ON complaints(manufacturer_username);
CREATE INDEX idx_complaints_status ON complaints(status);

-- ============================================
-- Display Results
-- ============================================
SELECT 'Database setup completed successfully!' as status;
SELECT 'Total users created: ' || COUNT(*) as info FROM auth;
SELECT 'Total profiles created: ' || COUNT(*) as info FROM profile;
SELECT 'Total sample products: ' || COUNT(*) as info FROM product;

-- ============================================
-- Useful Queries
-- ============================================

-- View all users
-- SELECT * FROM auth;

-- View all profiles
-- SELECT * FROM profile;

-- View all products
-- SELECT * FROM product;

-- View pending approvals
-- SELECT * FROM profile WHERE approved = FALSE;
