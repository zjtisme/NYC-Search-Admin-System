create table USERS (
    ID serial,
    USER_NAME varchar(100) NOT NULL,
    PASSWORD varchar(100) NOT NULL,
    FIRST_NAME varchar(100) NOT NULL,
    LAST_NAME varchar(100) NOT NULL,
    GENDER varchar(20) NOT NULL,
    EMAIL varchar(150) NOT NULL,
    PHONE_NUMBER varchar(150) NOT NULL,
    BIRTHDAY varchar(100) NOT NULL
);