USE d106;

CREATE USER 'hojo'@'localhost' IDENTIFIED BY '1234';
CREATE USER 'hojo'@'%' IDENTIFIED BY '1234';

GRANT ALL PRIVILEGES ON d106.* TO 'hojo'@'localhost';
GRANT ALL PRIVILEGES ON d106.* TO 'hojo'@'%';