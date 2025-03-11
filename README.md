# capibarasvslabubus2-frontend

Frontend for the Capibaras vs Labubus 2 Urban Incidents project.

## Building the project with Docker

To build the project with Docker, you need to have Docker installed and Docker Compose. You can install Docker with the following command:
```bash
sudo apt install docker.io
```

## Building the project

To build the project, you can run the following command:
```bash
docker-compose up --build 
```

You can access the project in the browser with the following URL:
```
http://localhost:8080
```



If you  want detached mode, you can run:

```bash
docker-compose up --build -d
```

## Stop the project
You can stop the project with Ctrl+C or with the following command:
```bash
docker-compose down
```



## Running with NPM
In this project we use React.js, so you need to have Node.js installed in your machine. You can download with the command:
```bash
sudo apt install nodejs npm
```

For installing the project dependencies, you can run:
```bash
npm install
```

## Running the project
Use the following command to visualize the project in dev mode:
```bash
npm run dev
```

