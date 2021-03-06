# shoppinglist

This is a node backend project for a shopping list web application

## Requirements

This project uses mongodb with mongoose js framework, which both are required to be installed.

Install mongodb by getting the community edition here:

https://www.mongodb.com/download-center/community

Install mongoose with npm:

```
npm install mongoose

```

Other project dependencies can be installed:

```
npm install
```

Additionally there is a template file for environment variables (.env.template). Rename this file into .env and add your own config there.

## Execution

Before launching the project make sure you are in the project root and create folder ./src/data, then start mongodb instance:

```
mongod --dbpath=./src/data
```

After this project can be launched by npm:

```
npm start
```

## Testing
Test that everything is up and running by doing a GET (use address defined in env):
```
wget -qO- http://localhost:3001/version && echo ""
{"api_version":"1.0.0"}
```

This should print out the version defined in the .env file

