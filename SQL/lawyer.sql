DROP TABLE IF EXISTS lawyer;

CREATE TABLE lawyer (
    lawyer_id INT NOT NULL AUTO_INCREMENT,
    user_id INT,
    category_id INT,
    lawyer_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    birth_date VARCHAR(255),
    lawyer_photo VARCHAR(255),
    PRIMARY KEY (lawyer_id),
    FOREIGN KEY (user_id) REFERENCES login(user_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);


