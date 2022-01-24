DROP TABLE IF EXISTS lawyer_consultation;

CREATE TABLE lawyer_consultation (
    lawyer_consultation_id INT NOT NULL AUTO_INCREMENT,
    lawyer_id INT,
    consultation_type_id INT,
    price INT NOT NULL,
    status INT,
    PRIMARY KEY(lawyer_consultation_id),
    FOREIGN KEY(lawyer_id) REFERENCES lawyer(lawyer_id),
    FOREIGN KEY(consultation_type_id) REFERENCES consultation_type(consultation_type_id)
)