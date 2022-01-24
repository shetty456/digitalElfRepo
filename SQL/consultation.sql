DROP TABLE IF EXISTS consultation_type;

CREATE TABLE consultation_type (
    consultation_type_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    consultation_name VARCHAR(255)
);