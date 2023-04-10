import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import todoRoutes from './routes/todos.routes';
import userRoutes from './routes/users.routes';
import * as dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// reading connection details from dotenv file
const dbConnection: string | undefined = process.env.DB_CONN_STRING;
const dbName: string | undefined = process.env.DB_NAME;
const collectionTodosName: string | undefined = process.env.DB_TODOS_COLLECTION_NAME;
const collectionUsersName: string | undefined = process.env.DB_USERS_COLLECTION_NAME;

const servicePort: string = process.env.SERVICE_PORT || '8080';
const serviceIpAddress: string = process.env.SERVICE_IP_ADDRESS || "localhost";

// connect to the mongoDB Database with the given database name and connection String
mongoose.connect(`${dbConnection}/${dbName}`, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology:true
})
    // if the connection was successful listen on the port
    .then(() => {
        app.listen(parseInt(servicePort), serviceIpAddress, () => {
            console.log('app is running on: http://' + serviceIpAddress + ':' + servicePort);
            console.log("Listening on port " + servicePort);
        });
    });

// Once the connection is established, callback
mongoose.connection.once('open', () => {
    console.log("mongoDB database connected successfully!");
});

app.use(`/${collectionTodosName}`, todoRoutes);
app.use(`/${collectionUsersName}`, userRoutes);

export default app;
