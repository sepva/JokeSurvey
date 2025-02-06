import express from 'express';
const app = express();
import cors from 'cors';
import path from 'path';
import { readFile } from 'fs/promises';

const json = JSON.parse(
    await readFile(
        new URL('./data/survey_json.json', import.meta.url)
    )
);

app.use(cors())

// app.use(express.static(path.join(__dirname, '../client/build')));

app.listen(8080, () => {
    console.log('server listening on port 8080')
})

app.get('/', (req, res) => {
    res.send('Hello from our server!')
})

app.get('/survey', (req, res) => {
    res.json(json)
})
