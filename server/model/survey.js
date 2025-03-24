import { Int32 } from 'bson';
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const surveySchema = new Schema({
    json: String
});

const surverResult = new Schema({
    resultJson: String
});

const secondSurveySchema = new Schema({
    userId: Int32,
    "e-mail": String,
    survey: String,
    passcode: String
});

const secondSurveyResult = new Schema({
    userId: Int32,
    resultJson: String
});

const SurveyModel = model('Survey', surveySchema);
const SurveyResultModel = model('SurveyResult', surverResult);
const SecondSurveyModel = model('SecondSurveys', secondSurveySchema);
const SecondSurveyResultModel = model('SecondSurveyResult', secondSurveyResult);
export { SurveyModel, SurveyResultModel, SecondSurveyModel, SecondSurveyResultModel };