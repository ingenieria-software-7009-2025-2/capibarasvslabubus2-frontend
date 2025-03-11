# capibarasvslabubus2-frontend

Frontend for the Capibaras vs Labubus 2 Urban Incidents project.

## Installation
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

## Building the project
Use the following command to build the project in docker:
```bash
docker build -t capibarasvslabubus2-frontend .
```

## Running the project in docker

Use the following command to run the project in docker:
```bash
docker run -d -p 8080:80 --name app-capibaras capibarasvslabubus2-frontend
```


