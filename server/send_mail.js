import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';
dotenv.config()

const API_KEY = process.env.MAIL;
const DOMAIN = 'jokesurvey.me';

export const sendEmail = async (email) => {
    console.log(`Seppe Vanswegenoven <${email}>`)
    const formData = new FormData();
    formData.append('from', 'Mailgun Sandbox <postmaster@jokesurvey.me>');
    formData.append('to', `Seppe Vanswegenoven <${email}>`);
    formData.append('subject', 'Hello Seppe Vanswegenoven');
    formData.append('text', 'Congratulations Seppe Vanswegenoven, you just sent an email with Mailgun! You are truly awesome!');

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
