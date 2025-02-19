import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { SurveyModel, SurveyResultModel } from './model/survey.js';
import { createLogger, transports } from "winston"

const logger = createLogger({
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'info.log', level: 'info' }),
    ],
    rejectionHandlers: [
        new transports.File({ filename: 'rejections.log' })
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'exceptions.log' })
    ]
});

dotenv.config()
app.use(cors())
app.use(bodyParser.json())

// app.use(express.static(path.join(__dirname, '../client/build')));

//check if server is running
app.listen(8080, () => {
    logger.info("Server started and listening")
})

//connect to mongodb
mongoose.connect(process.env.MONGODB).then(() => {
    logger.info("Server connected to mongodb")
}).catch(e => logger.error(e));

mongoose.connection.on('disconnected', () => logger.info('MongoDB disconnected'));
mongoose.connection.on('reconnected', () => logger.info('MongoDB reconnected'));

function handle_error(err, next) {
    logger.error(err)
    next(err)
}

async function get_survey() {
    const survey = await SurveyModel.aggregate().sample(1)
    return JSON.parse(survey[0].json)
}

//get survey
app.get('/survey', (req, res, next) => {
    get_survey().then(json => {
        res.json(json)
        logger.info("Send survey!")
    })
        .catch((err) => handle_error(err, next))
})

//post results of survey
app.post('/survey', (req, res, next) => {
    SurveyResultModel.create({
        email: req.body.email,
        resultJson: JSON.stringify(req.body.result)
    }).then(() => logger.info("Survey saved in db!"))
        .catch((err) => handle_error(err, next));
})