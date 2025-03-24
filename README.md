# capibarasvslabubus2-frontend

Frontend for the Capibaras vs Labubus 2 Urban Incidents project.
Technologies used: 
- React.js
- TypeScript
- Vite.js

## Building the project with Docker

To build the project with Docker, you need to have Docker installed and Docker Compose.

## Building the project

To build the project, you can run the following command:
```bash
docker compose up --build 
```

To stop the project, you can use **Ctrl + C** in the terminal.

You can access the project in the browser with the following URL:
```
http://localhost:5173
```



## Detached mode

If you  want detached mode, you can run:

```bash
docker compose up --build -d
```

You can stop the project with the following command:
```bash
docker compose down
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

