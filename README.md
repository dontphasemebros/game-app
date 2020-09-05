

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
  DISCORD_CLIENT_SECRET:      // client secret from discor
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
 
