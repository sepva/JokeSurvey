import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';
dotenv.config()

const API_KEY = process.env.MAIL;
const DOMAIN = 'jokesurvey.me';

export const sendEmail = async (email) => {
    const formData = new FormData();
    formData.append('from', 'JokeTailor survey <postmaster@jokesurvey.me>');
    formData.append('to', `Seppe Vanswegenoven <${email}>`);
    formData.append('subject', 'Thank you!');
    formData.append('text', 'Thank you for completing my survey! You will be notified when the second part of the survey is ready!');

    try {
        const response = await axios.post(
            `https://api.eu.mailgun.net/v3/${DOMAIN}/messages`,
            formData,
            {
                auth: {
                    username: 'api',
                    password: API_KEY
                },
                headers: formData.getHeaders()
            }
        );
        return response.data;
    } catch (error) {
        return Promise.reject(`Error sending email: ${error}`)
    }
};
