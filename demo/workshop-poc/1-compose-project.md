# Using Compose to start the dev environment

In this segment, you will experience first-hand how Compose makes it much easier to start a development environment, allowing you to get right into your code.

## Step one: Starting the project

This project uses Compose to start all the application dependencies. The app itself runs using Node directly on the machine.

1. Start the application dependencies by running the following command:

   ```console
   docker compose up -d
   ```

   The `-d` flag runs Compose in the background. It may take a few moments to pull all the container images, but soon you'll have the app up and running!

2. Now that the dependencies are up and running, it's time to start the app itself. First install the app's dependencies by running the following command:

   ```console
   npm install
   ```

3. Now, start the app:

   ```console
   npm run dev
   ```

   This is using a tool called [nodemon](https://www.npmjs.com/package/nodemon), which will watch for changes in the files and automatically restart the Node process.

4. Open the app by going to [http://localhost:5173](http://localhost:5173).

### Additional services

The application stack also includes a visualizers for the database and Kafka clusters:

- [pgAdmin](http://localhost:5050) - an open-source postgreSQL visualizer
- [kafbat](http://localhost:8080) - an open-source Kafka visualizer
