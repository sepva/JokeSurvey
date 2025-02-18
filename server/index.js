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

async function get_survey() {
    const survey = await SurveyModel.aggregate().sample(1)
    return JSON.parse(survey[0].json)
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