DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

USE test;

CREATE TABLE user_info (
    id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(45) NOT NULL,
    user_pwd VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM user_info;

