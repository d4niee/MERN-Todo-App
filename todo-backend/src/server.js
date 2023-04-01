const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos.routes')
const userRoutes = require('./routes/users.routes')
const healthRoute = require('./routes/healthCheck')
const dotenv = require("dotenv")


const app = express();
app.use(cors());
app.use(bodyParser.json());

dotenv.config();

// reading connection details from dotenv file
const dbConnection = process.env.DB_CONN_STRING;
const dbName = process.env.DB_NAME;
const collectionTodosName = process.env.DB_TODOS_COLLECTION_NAME;
const collectionUsersName = process.env.DB_USERS_COLLECTION_NAME;

const servicePort = process.env.SERVICE_PORT || 3030;
const serviceIpAddress = process.env.SERVICE_IP_ADDRESS || "localhost";

// connect to the mongoDB Database with the given database name and connection String
mongoose.connect(`${dbConnection}/${dbName}`, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology:true
})
    // if the connection was successful listen on the port
    .then(() => {
        app.listen(servicePort, serviceIpAddress, () => {
            console.log('app is running on: http://' + serviceIpAddress + ':' + servicePort)
            console.log("Listening on port " + servicePort);
        });
    });

// Once the connection is established, callback
mongoose.connection.once('open', () => {
    console.log("mongoDB database connected successfully!");
});

app.use(`/${collectionTodosName}`, todoRoutes);
app.use(`/${collectionUsersName}`, userRoutes);
app.use('/health', healthRoute);