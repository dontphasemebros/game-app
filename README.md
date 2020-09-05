Gametime
============

GameTime is a one stop online gaming platform focused on fun interactive games.

Description
============

Gametime supplies a game platform for players to enjoy our games and provide feedback in order to better gameplay and design. The key focus of GameTime is to allow players to engage with one another and the development team within our built-in forums. Players don't have to leave our platform in order to suggest changes, address bugs, and get input from the developers. The ability for players and developers to have instant communication streamlines the process of implementing new features and giving the players what they want, which is one of our main concern. Players can also interact with one another in realtime using the built-in chat feature. If you want to see who's out there playing, just open up the chat and start chatting. We plan on implementing more games in the future, so be sure to keep up with all of our changes here on Github and at PhaserBros.com.


Dependencies

============

Stack: React, PostgreSQL, Node, Express

```javascript
"dependencies": {
   "axios": "^0.20.0",
    "body-parser": "^1.19.0",
    "bootstrap": "^4.5.2",
    "chai": "^4.2.0",
    "cookie-parser": "^1.4.5",
    "cookie-session": "^1.4.0",
    "css-loader": "^4.2.2",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "file-loader": "^6.1.0",
    "font-awesome": "^4.7.0",
    "mdbootstrap": "^4.19.1",
    "mdbreact": "^4.27.0",
    "mocha": "^8.1.3",
    "oauth": "^0.9.15",
    "passport": "^0.4.1",
    "passport-discord": "^0.1.4",
    "passport-google-oauth20": "^2.0.0",
    "passport-oauth2": "^1.5.0",
    "pg": "^8.3.3",
    "phaser": "^3.24.1",
    "popper.js": "^1.16.1",
    "prop-types": "^15.7.2",
    "react": "^16.13.1",
    "react-bootstrap": "^1.3.0",
    "react-dom": "^16.13.1",
    "react-fontawesome": "^1.7.1",
    "react-hook-form": "^6.7.1",
    "react-router-dom": "^5.2.0",
    "socket.io": "^2.3.0",
    "socket.io-client": "^2.3.0",
    "style-loader": "^1.2.1"
  },
  "devDependencies": {
    "@babel/core": "^7.11.4",
    "@babel/preset-env": "^7.11.0",
    "@babel/preset-react": "^7.10.4",
    "@typescript-eslint/eslint-plugin": "^4.0.0",
    "@typescript-eslint/parser": "^4.0.0",
    "babel-loader": "^8.1.0",
    "babel-plugin-transform-class-properties": "^6.24.1",
    "dotenv-webpack": "^2.0.0",
    "eslint": "^7.7.0",
    "eslint-config-airbnb": "^18.2.0",
    "eslint-plugin-import": "^2.22.0",
    "eslint-plugin-jsx-a11y": "^6.3.1",
    "eslint-plugin-react": "^7.20.6",
    "eslint-plugin-react-hooks": "^4.1.0",
    "html-webpack-plugin": "^4.4.1",
    "husky": "^4.2.5",
    "lint-staged": "^10.2.13",
    "webpack": "^4.44.1",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0"
  }
```


Installation
============

It is required to fork and clone this repository locally onto a machine before proceeding into the installation.

There are two ways to follow the installation guide, through ``pip`` or homebrew:

npm (node/Linux)
----------------------

|npm|

```bash

   npm install
```
This corresponds to the latest tagged release.
Add ``--beta`` for the latest tagged release candidate,
or ``--edge`` for the latest ``master`` version.

Once the command above runs, there will be a node-modules folder containing all of the required dependencies for the project to operate.

Next it's time to set up the environmental variables. Luckily, this application has been given a dependency that will make the process alot
easier to implement. ``dotenv``. 

To start, let's create a ``.env`` file in the app's main directory.

Inside, the variable names should look like this:


Variable | Description
------------ | -------------
  SERVER_PORT| server port
  DB_USER| username for the DB
  DB_PASS| password for the DB
  DB_NAME| name of the DB (in this case should be gametime)
  GAMESPOT_API_KEY| key from the Gamespot API
  DISCORD_CLIENT_ID| key for discord Auth API
  DISCORD_CLIENT_SECRET| client secret from discor
  DISCORD_CLIENT_REDIRECT| redirect url for the discord API
  NODE_ENV| environment for node to recognize (should be development by default)
  
What will be needed next is to fill in each one of these variables with the required information respectively.



the Database
----------------------

What will be needed next is to configure the required database, ``postgresql``.

Follow the tutorial here https://www.postgresql.org/download/linux/ubuntu/ if postgresql is not
already globally installed onto the machine.

After the installation has been followed, the next step is to set up a user account for the database to follow

issue the command ``sudo service postgres start`` to start up the psql server.

next, run the command psql postgres < gametime.sql to shell into the app's database.




Starting/Scripts
----------------------

Next, let's take a look in the package.json to see what scripts this app can run.

```json

    "start": "node server/server.js",
    "dev": "NODE_ENV='development' webpack --mode development && nodemon server/server.js",
    "build": "webpack --mode production --watch",
    "test": "node test/apptests.spec.js",
    "pretest": "./node_modules/.bin/eslint --ignore-path .gitignore . --fix"
```    
Before starting the application, issue the command ``npm run build`` to start the web compiler for react.

What will be used to start the app is to issue the command ``npm run dev`` which will activate both the web client and the server at the same time.

After this command has been initialized, there should be a line of text indicating on what port the app is running under

```bash

   listening on 8080
```
Go to the web browser and type in the url http://localhost:[PORT]/ to be directed to the application.

Now witness the glory and start gaming!

Deploying using Google Cloud
------------------------------------

Place in a ``app.yaml`` file in outermost directory when deploying to the GCloud app engine:

```yaml
runtime: nodejs12
env_variables:
  SERVER_PORT:                // server port
  DB_USER:                    // username for the DB
  DB_PASS:                    // password for the DB
  DB_NAME:                    // name of the DB (in this case should be gametime)
  GAMESPOT_API_KEY:           // key from the Gamespot API
  DISCORD_CLIENT_ID:          // key for discord Auth API
  DISCORD_CLIENT_SECRET:      // client secret from discord
  DEPLOY_REDIRECT:            // redirect url for deploying using gcloud
  DISCORD_CLIENT_REDIRECT:    // redirect url for the discord API
  NODE_ENV:                   // environment for node to recognize (should be development by default)
  DB_INSTANCE_CONNECTION_NAME:// database connection name if deploying using gcloud
```

Don't Phase Me Bros, *: Data Version Control - Git for Data & Models* (2020)
`DOI:10.5281/zenodo.012345 <https://doi.org/10.5281/zenodo.3677553>`_.

.. |npm| image:: https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/800px-Npm-logo.svg.png
   :target: https://formulae.brew.sh/formula/dvc
   :alt: npm
 
