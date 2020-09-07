DROP DATABASE IF EXISTS gametime;

CREATE DATABASE gametime;

\c gametime;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  id_discord VARCHAR(255),
  username VARCHAR(255),
  profile_photo_url VARCHAR(510),
  location VARCHAR(255)
);

CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE scores (
  id SERIAL PRIMARY KEY,
  value INT,
  id_user INT,
  id_game INT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (id_user) REFERENCES users(id),
  FOREIGN KEY (id_game) REFERENCES games(id)
);

CREATE TABLE channels (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE threads (
  id SERIAL PRIMARY KEY,
  text VARCHAR(255),
  id_user INT,
  id_channel INT,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (id_user) REFERENCES users(id),
  FOREIGN KEY (id_channel) REFERENCES channels(id)
);

CREATE TABLE replies (
  id SERIAL PRIMARY KEY,
  text VARCHAR(255),
  id_user INT,
  id_thread INT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (id_user) REFERENCES users(id),
  FOREIGN KEY (id_thread) REFERENCES threads(id)
);

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  date TIMESTAMP,
  api_id INT,
  authors VARCHAR(255),
  title VARCHAR(255),
  thumbail VARCHAR(255),
  photo VARCHAR(255),
  body VARCHAR(2550),
  lede VARCHAR(255),
  url VARCHAR(510)
);


CREATE OR REPLACE FUNCTION trigger_set_TIMESTAMP()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_TIMESTAMP
BEFORE UPDATE ON threads
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_TIMESTAMP();

INSERT INTO users (id_discord, username, profile_photo_url, location) VALUES ('12345', 'Ben', 'https://avatars1.githubusercontent.com/u/43221771?s=400&u=df8c77de50068df1e09041de441840cff350e47f&v=4', 'Mandeville');
INSERT INTO users (id_discord, username, profile_photo_url, location) VALUES ('23456', 'Grant', 'https://avatars0.githubusercontent.com/u/61560345?s=400&u=57f06ab214f93e0bb302a91e4258bbfe54746077&v=4', 'New Orleans');
INSERT INTO users (id_discord, username, profile_photo_url, location) VALUES ('34567', 'James', 'https://avatars1.githubusercontent.com/u/57680469?s=400&u=58ab864ffb55ce45866c75fb05e1f6a8e8c6dfb1&v=4', 'MS');
INSERT INTO users (id_discord, username, profile_photo_url, location) VALUES ('45678', 'Connor', 'https://avatars1.githubusercontent.com/u/60720268?s=400&u=2236cf34f7c8010753eea568f245a80d9bd77b03&v=4', 'NOLA');
INSERT INTO users (id_discord, username, profile_photo_url, location) VALUES ('750878048223494184', 'robreau', '', 'en-US');

INSERT INTO games (name) VALUES ('spaceship laser blaster "pew pew pew" game');

INSERT INTO scores (value, id_user, id_game) VALUES (370, 3, 1);
INSERT INTO scores (value, id_user, id_game) VALUES (500, 1, 1);
INSERT INTO scores (value, id_user, id_game) VALUES (510, 4, 1);
INSERT INTO scores (value, id_user, id_game) VALUES (260, 3, 1);
INSERT INTO scores (value, id_user, id_game) VALUES (480, 4, 1);
INSERT INTO scores (value, id_user, id_game) VALUES (310, 1, 1);
INSERT INTO scores (value, id_user, id_game) VALUES (430, 4, 1);
INSERT INTO scores (value, id_user, id_game) VALUES (240, 3, 1);
INSERT INTO scores (value, id_user, id_game) VALUES (350, 1, 1);

INSERT INTO channels (name) VALUES ('General Discussion');
INSERT INTO channels (name) VALUES ('Challenges');
INSERT INTO channels (name) VALUES ('Suggestions');
INSERT INTO channels (name) VALUES ('Gamer News');

INSERT INTO threads (text, id_user, id_channel) VALUES ('I think the game designer should be fired', 4, 3);
INSERT INTO threads (text, id_user, id_channel) VALUES ('How do you play this game?', 2, 2);
INSERT INTO threads (text, id_user, id_channel) VALUES ('WHO WANTS A PIECE OF ME', 1, 2);
INSERT INTO threads (text, id_user, id_channel) VALUES ('Ur goin down', 3, 2);

INSERT INTO replies (text, id_user, id_thread) VALUES ('wrong channel, noob', 4, 2);
INSERT INTO replies (text, id_user, id_thread) VALUES ('ME', 1, 3);
INSERT INTO replies (text, id_user, id_thread) VALUES ('AND ME', 3, 3);
INSERT INTO replies (text, id_user, id_thread) VALUES ('How do I get to the yahtzee page?', 2, 3);
INSERT INTO replies (text, id_user, id_thread) VALUES ('Who''s Ur?', 2, 4);
INSERT INTO replies (text, id_user, id_thread) VALUES ('All your base are belong to us', 4, 4);

