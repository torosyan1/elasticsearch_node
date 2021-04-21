import '../env';
import cors from 'cors';
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import { Client } from '@elastic/elasticsearch';

import { createUser, getUsers } from './routers';
import { database } from './database';
import { searchUsers } from './socket/searchUsers';

export const elasticSearchClient = new Client({ node: process.env.elasticSeacrchURL });
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

database();

app.post('/users', createUser);
app.get('/users', getUsers);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('data', async (data) => {
        const list = await searchUsers(data);
        socket.emit('list', list);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(process.env.PORT, async () => {
    console.log(`Example app listening on port ! ${process.env.PORT}`);
});
