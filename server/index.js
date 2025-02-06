import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { SurveyModel, SurveyResultModel } from './model/survey.js';

dotenv.config()
app.use(cors())
app.use(bodyParser.json())

// app.use(express.static(path.join(__dirname, '../client/build')));

//check if server is running
app.listen(8080, () => {
    console.log('server listening on port 8080')
})

//connect to mongodb
mongoose.connect(process.env.MONGODB).then(() => {
    console.log('connected to mongodb')
});

//TODO: change this: DB contains a bunch of jokes with jokeId and n different jokes are selected for the survey.
async function get_survey() {
    const count = await SurveyModel.countDocuments().exec();
    const random = Math.floor(Math.random() * count);
    const survey = await SurveyModel.findOne({}).skip(random).exec();
    return JSON.parse(survey.json)
}

//get survey
app.get('/survey', (req, res) => {
    get_survey().then(json =>
        res.json(json)
    )
})

//post results of survey
app.post('/survey', (req, res) => {
    SurveyResultModel.create({
        email: req.body.email,
        resultJson: JSON.stringify(req.body.result)
    });
})