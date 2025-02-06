import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const surveySchema = new Schema({
    json: String
});

const surverResult = new Schema({
    email: String,
    resultJson: String
});

const SurveyModel = model('Survey', surveySchema);
const SurveyResultModel = model('SurveyResult', surverResult);
export { SurveyModel, SurveyResultModel };