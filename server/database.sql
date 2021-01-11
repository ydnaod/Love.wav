create table user_account
(
    id serial primary key,
    first_name varchar(64) NOT NULL,
    last_name varchar(64) NOT NULL,
    email varchar(128) NOT NULL,
    password varchar(64) NOT NULL,
    refresh_token varchar(255)
);

create table user_profile
(
    id serial primary key,
    user_account_id int references user_account(id) NOT NULL,
    playlist_id varchar(128) NOT NULL,
    photo text NOT NULL,
    theme_song_id varchar(128) not null
);

create table lyrics_slide
(
    id serial primary key,
    user_profile_id int references user_profile(id) NOT NULL,
    song_id varchar(128) NOT NULL,
    favorite_lyric varchar(64) NOT NULL,
    line_one varchar(64) NOT NULL,
    line_two varchar(64) NOT NULL,
    line_three varchar(64),
    line_four varchar(64),
    line_five varchar(64),
    line_six varchar(64)
);

insert into user_profile
    (user_account_id, playlist_id, photo, theme_song_id)
values
    (1, '0BtWOyxZyTu7EmGIoLQeyH', 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/134969333_10225175813162837_4579429098583903124_o.jpg?_nc_cat=103&ccb=2&_nc_sid=730e14&_nc_ohc=7mpxbX422BUAX-r2y0B&_nc_ht=scontent-lga3-1.xx&oh=c1ac92375280c033abdc95fda17b1f1a&oe=601BC1B8'
        , '3jjujdWJ72nww5eGnfs2E7')