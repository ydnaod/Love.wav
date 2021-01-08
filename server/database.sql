create table user_account (
    id serial primary key,
    first_name varchar(64) NOT NULL,
    last_name varchar(64) NOT NULL,
    email varchar(128) NOT NULL,
    password varchar(64) NOT NULL,
    access_token varchar(255),
    refresh_token varchar(255)
);