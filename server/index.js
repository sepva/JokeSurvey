import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path'
import { SurveyModel, SurveyResultModel, SecondSurveyModel, SecondSurveyResultModel } from './model/survey.js';
import { sendEmail } from './send_mail.js';
import { createLogger, transports } from "winston"
const port = process.env.PORT || "8080"

const logger = createLogger({
    transports: [new transports.Console()]
});

dotenv.config()
app.use(cors())
app.use(bodyParser.json())

app.use(express.static(path.join(import.meta.dirname, 'build')));

app.get('/jokesurvey', function (req, res) {
    res.sendFile(path.resolve(import.meta.dirname, './build/index.html'));
});

app.get('/second_survey/:userId', function (req, res) {
    res.sendFile(path.resolve(import.meta.dirname, './build/index.html'));
}
);

//check if server is running
app.listen(port, () => {
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

async function get_second_survey(userId) {
    const second_survey = await SecondSurveyModel.findOne({ userId: userId })
    return JSON.parse(second_survey.survey)
}

async function get_email_from_userId(userId) {
    const second_survey = await SecondSurveyModel.findOne({ userId: userId })
    return second_survey["e-mail"]
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
    const result = req.body.result

    SurveyResultModel.create({
        resultJson: JSON.stringify(result)
    }).then(() => logger.info("Survey saved in db!"))
        .catch((err) => handle_error(err, next));

    sendEmail(result['e-mail']).then(msg => logger.info(msg))
        .catch(err => console.log(err))
})

//get second survey
app.get('/second_survey', (req, res, next) => {
    const userId = req.query.userId
    get_second_survey(userId).then(json => {
        res.json(json)
        logger.info("Send survey!")
    })
        .catch((err) => handle_error(err, next))
})

//post results of second survey
app.post('/second_survey', (req, res, next) => {
    const result = req.body.result
    const userId = req.body.userId

    SecondSurveyResultModel.create({
        userId: userId,
        resultJson: JSON.stringify(result)
    }).then(() => logger.info("Second survey saved in db!"))
        .catch((err) => handle_error(err, next));

    get_email_from_userId(userId).then((email) => sendEmail(email).then(msg => logger.info(msg)))
        .catch(err => handle_error(err, next))
})