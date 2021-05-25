CREATE SCHEMA project_airline DEFAULT CHARACTER SET utf8mb4;

USE project_airline;

/* Create a table called AIRCRAFTS */
CREATE TABLE AIRCRAFTS (
  aircraft_number int NOT NULL PRIMARY KEY,
  aircraft_name varchar(20) DEFAULT NULL,
  airline varchar(20) DEFAULT NULL
);

/* Create a table called FLIGHTS */
CREATE TABLE FLIGHTS (
  flight_number varchar(10) NOT NULL PRIMARY KEY,
  aircraft_number int DEFAULT NULL,
  source varchar(20) DEFAULT NULL,
  destination varchar(20) DEFAULT NULL,
  airline varchar(20) DEFAULT NULL,
  departure_time datetime DEFAULT NULL,
  departure_time_to datetime DEFAULT NULL,
  arrival_time datetime DEFAULT NULL,
  arrival_time_to datetime DEFAULT NULL,
  flight_duration float(3,1) DEFAULT NULL,
  seat int DEFAULT '200'
);

/* Create a table called PASSENGERS */
CREATE TABLE PASSENGERS (
  id_passanger INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  passenger_passport varchar(15) NOT NULL,
  first_name varchar(50) DEFAULT NULL,
  last_name varchar(50) DEFAULT NULL
);

/* Create a table called RESERVATIONS */
CREATE TABLE RESERVATIONS (
  ticket_number int NOT NULL PRIMARY KEY  AUTO_INCREMENT ,
  passenger_passport varchar(15) DEFAULT NULL,
  flight_number varchar(10) DEFAULT NULL,
  status varchar(45) DEFAULT 'on hold'
);

/* Create few records in this table */
INSERT INTO AIRCRAFTS VALUES(123, 'Boeing-767', 'Iberia');
INSERT INTO AIRCRAFTS VALUES(345, 'Boing-737-800', 'United Airlines');
INSERT INTO AIRCRAFTS VALUES(678,'Airbus A320','Lufthansa');
INSERT INTO AIRCRAFTS VALUES(876,'Airbus A321','AirCanada');
INSERT INTO AIRCRAFTS VALUES(980,'Boing-737-300','Turkish Airlines');

INSERT INTO FLIGHTS VALUES('1236IB',123,'Barcelona', 'Toronto', 'Iberia', '2021-08-23 23:35:00', '2021-08-24 19:00:00', '2021-09-23 10:30:00', '2021-09-24 18:35:00', 1, 200);
INSERT INTO FLIGHTS VALUES('1236XD',345,'Barcelona', 'Toronto', 'United Airlines', '2021-08-23 10:00:00', '2021-08-24 11:35:00', '2021-09-24 00:50:00', '2021-09-23 15:29:00', 1, 200);
INSERT INTO FLIGHTS VALUES('6786IB',678,'Barcelona', 'Toronto', 'Turkish Airlines', '2021-08-23 00:35:00', '2021-08-24 19:00:00', '2021-09-23 11:30:00', '2021-09-24 18:35:00', 1, 200);
INSERT INTO FLIGHTS VALUES('8766XD',876,'Barcelona', 'Toronto', 'United Airlines', '2021-08-23 10:00:00', '2021-08-24 12:35:00', '2021-09-24 01:50:00', '2021-09-23 15:29:00', 1, 200);
INSERT INTO FLIGHTS VALUES('9806IB',980,'Barcelona', 'Toronto', 'Lufthansa', '2021-08-23 23:35:00', '2021-08-24 20:00:00', '2021-09-23 11:30:00', '2021-09-24 18:35:00', 1, 200);

INSERT INTO PASSENGERS VALUES (1,'12158632','Margaret','Watson');
INSERT INTO PASSENGERS VALUES (2,'17719224','Jhon','Smith');
INSERT INTO PASSENGERS VALUES (3,'24621906','Charles','Spencer');
INSERT INTO PASSENGERS VALUES (8,'56987432','Tony','Stark');
INSERT INTO PASSENGERS VALUES (9,'45698755','Alex','Black');
INSERT INTO PASSENGERS VALUES (10,'5621458125','Jhon','Smith');
INSERT INTO PASSENGERS VALUES (11,'6564457898','Elizabeth','Olsen');
INSERT INTO PASSENGERS VALUES (12,'2654511565','Alice','Smith');
INSERT INTO PASSENGERS VALUES (13,'6512144522','Peter','Parker');
INSERT INTO PASSENGERS VALUES (14,'12154512','Steve','Rogers');

INSERT INTO RESERVATIONS VALUES (1,'12158632','1236IB','on hold');
INSERT INTO RESERVATIONS VALUES (2,'17719224','1236IB','on hold');
INSERT INTO RESERVATIONS VALUES (3,'24621906','1236IB','confirm');
INSERT INTO RESERVATIONS VALUES (7,'24621906','1236XD','on hold');
INSERT INTO RESERVATIONS VALUES (8,'56987432','6786IB','on hold');
INSERT INTO RESERVATIONS VALUES (9,'45698755','1236IB','on hold');
INSERT INTO RESERVATIONS VALUES (10,'5621458125','6786IB','on hold');
INSERT INTO RESERVATIONS VALUES (11,'6564457898','1236IB','on hold');
INSERT INTO RESERVATIONS VALUES (12,'2654511565','8766XD','on hold');
INSERT INTO RESERVATIONS VALUES (13,'6512144522','1236IB','on hold');
INSERT INTO RESERVATIONS VALUES (14,'12154512','8766XD','on hold');

/*List of all available flights*/
SELECT *, SEC_TO_TIME(TIMESTAMPDIFF(HOUR, departure_time, arrival_time)) as total_time FROM FLIGHTS LEFT JOIN AIRCRAFTS ON AIRCRAFTS.AIRCRAFT_NUMBER = FLIGHTS.AIRCRAFT_NUMBER;

/*Last reservation made*/
select * from RESERVATIONS WHERE passenger_passport = '24621906' AND flight_number = '1236IB' ORDER BY ticket_number DESC LIMIT 1;

/*Passenger Reservation List*/
SELECT * FROM PASSENGERS
INNER JOIN RESERVATIONS ON PASSENGERS.passenger_passport = RESERVATIONS.passenger_passport
INNER JOIN FLIGHTS ON RESERVATIONS.flight_number = FLIGHTS.flight_number
WHERE PASSENGERS.passenger_passport = '24621906';

/*Get the details of a specific flight*/
SELECT *,  SEC_TO_TIME(TIMESTAMPDIFF(HOUR, departure_time, departure_time_to)) as total_time FROM FLIGHTS WHERE flight_number = '1236IB';

/*List of flights by city and date*/
SELECT *, SEC_TO_TIME(TIMESTAMPDIFF(HOUR, departure_time, departure_time_to)) as total_time 
            from FLIGHTS LEFT JOIN AIRCRAFTS ON AIRCRAFTS.AIRCRAFT_NUMBER = FLIGHTS.AIRCRAFT_NUMBER 
            where source = 'Barcelona' AND destination = 'Toronto' AND departure_time = '2021-08-23' AND arrival_time = '2021-09-23';

/*Update seats according to flight*/
UPDATE FLIGHTS SET seat = (seat)-1 WHERE flight_number = '1236IB';
