import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';
dotenv.config()

const API_KEY = process.env.MAIL;
const DOMAIN = 'jokesurvey.me';

export const sendEmail = async (email) => {
    const formData = new FormData();
    formData.append('from', 'JokeTailor survey <postmaster@jokesurvey.me>');
    formData.append('to', `<${email}>`);
    formData.append('subject', 'Thank you!');
    formData.append('text', `Thank you for filling in my survey! 
        
If all the results are in and processed, the second phase of the experiment will start.
As soon as this happens (in 2-3 weeks), you will receive an e-mail with a link to the second survey.

If you have any questions, please contact me at sepvanswe@gmail.com
Kind regards,
Seppe
`);

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

export const sendSecondEmail = async (email) => {
    const formData = new FormData();
    formData.append('from', 'JokeTailor survey <postmaster@jokesurvey.me>');
    formData.append('to', `<${email}>`);
    formData.append('subject', 'Thank you!');
    formData.append('text', `You have successfully completed both surveys. Which means I'm now eternally in debt to you.
Hope this text-art of a cat makes us even: 
∧,,,∧
(  ̳• · • ̳)
/    づ♡`);

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

