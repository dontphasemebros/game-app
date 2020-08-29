DROP DATABASE IF EXISTS gametime;

CREATE DATABASE gametime;

\c gametime;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id int PRIMARY KEY,
  id_discord integer,
  username varchar(255),
  profile_photo_url varchar(255),
  location varchar(255),
  age int
);

DROP TABLE IF EXISTS games;

CREATE TABLE games (
  id int PRIMARY KEY,
  name varchar(255)
);

DROP TABLE IF EXISTS scores;

CREATE TABLE scores (
  id int PRIMARY KEY,
  score int,
  id_user int,
  id_game int,
  created_at timestamp,
  FOREIGN KEY (id_user) REFERENCES users(id),
  FOREIGN KEY (id_game) REFERENCES games(id)
);

DROP TABLE IF EXISTS channels;

CREATE TABLE channels (
  id int PRIMARY KEY,
  name varchar(255),
  updated_at timestamp
);

DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
  id int PRIMARY KEY,
  text varchar(255),
  id_user int,
  id_channel int,
  updated_at timestamp,
  created_at timestamp,
  FOREIGN KEY (id_user) REFERENCES users(id),
  FOREIGN KEY (id_channel) REFERENCES channels(id)
);

DROP TABLE IF EXISTS replies;

CREATE TABLE replies (
  id int PRIMARY KEY,
  text varchar(255),
  id_user int,
  id_post int,
  created_at timestamp,
  FOREIGN KEY (id_user) REFERENCES users(id),
  FOREIGN KEY (id_post) REFERENCES posts(id)
);

DROP TABLE IF EXISTS articles;

CREATE TABLE articles (
  id int PRIMARY KEY,
  date timestamp,
  api_id int,
  authors varchar(255),
  title varchar(255),
  thumbail varchar(255),
  photo varchar(255),
  body varchar(2550),
  lede varchar(255),
  url varchar(510)
);

