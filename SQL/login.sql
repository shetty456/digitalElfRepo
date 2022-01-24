DROP TABLE IF EXISTS login;

CREATE TABLE login (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    user_type VARCHAR(50),
    phone VARCHAR(10) NOT NULL UNIQUE,
    OTP VARCHAR(50),
    status VARCHAR(10)
); 

