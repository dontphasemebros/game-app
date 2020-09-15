DROP DATABASE IF EXISTS gametime;

CREATE DATABASE gametime;

\c gametime;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  id_discord VARCHAR(255),
  username VARCHAR(255),
  profile_photo_url VARCHAR(1020),
  location VARCHAR(255)
);

CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255)
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
  photo_url VARCHAR(510),
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
  photo_url VARCHAR(510),
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

INSERT INTO games (name, description) VALUES ('Space Blaster', 'Destroy asteroids and aliens to increase your score!');
INSERT INTO games (name, description) VALUES ('Star Hunter', 'Collect stars with your friends. Be the first team to hit 200 to win!');
INSERT INTO games (name, description) VALUES ('Pickup Stars', 'Collect stars from all platforms while avoiding bombs!');
INSERT INTO games (name, description) VALUES ('Break Out', 'Destroy all the blocks!');
INSERT INTO games (name, description) VALUES ('Germs!', 'Avoid the germs!');
INSERT INTO games (name, description) VALUES ('Flood!', 'Flood the box all one color in 25 moves or less!');

INSERT INTO channels (name) VALUES ('General Discussion');
INSERT INTO channels (name) VALUES ('Challenges');
INSERT INTO channels (name) VALUES ('Suggestions');
INSERT INTO channels (name) VALUES ('Gamer News');
