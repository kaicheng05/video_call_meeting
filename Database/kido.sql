-- Active: 1734687486646@@127.0.0.1@3306@kidocodeloginsystem
CREATE DATABASE KidocodeLoginSystem;

-- Use the newly created database
USE KidocodeLoginSystem;

-- Create the users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE, -- Usernames like kidoXXXX or internXXXX
    password VARCHAR(255) NOT NULL,      -- Password for login
    user_type ENUM('Student', 'Intern') NOT NULL, -- Type of user (Student or Intern)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data into the users table
INSERT INTO users (username, password, user_type)
VALUES 
    ('kido0001', 'password123', 'Student'),
    ('kido0002', 'securepass', 'Student'),
    ('intern0001', 'internpass', 'Intern'),
    ('intern0002', 'mypassword', 'Intern');

ALTER TABLE users
ADD COLUMN reset_token VARCHAR(255) DEFAULT NULL,
ADD COLUMN token_expiry DATETIME DEFAULT NULL;