import sgMail from "@sendgrid/mail";
import currencyFormatter from "currency-formatter";

import {SENDGRID_API_KEY, SENDGRID_FROM_EMAIL} from "./../config/config.js";

sgMail.setApiKey(SENDGRID_API_KEY)
const sendEmail = async (to, subject, text) => {
    try {
        const msg = {to, from: SENDGRID_FROM_EMAIL, subject, text};
        await sgMail.send(msg);
        return {success: true, message: 'Email sent successfully'};
    }catch (e) {
        console.log(e.message);
        return {success: false, message: e.message};
    }
};

const generateEmail = (name, date, offense, fine, vehicle, offense_link) => {
    return `
    Dear ${name},
    I hope this email finds you well. I am writing to inform you that our records indicate you have been involved in a traffic offense on ${new Date(date).toLocaleString()}. It is important that you read this email thoroughly and take the necessary actions outlined below
    Offense Details:

        Date: ${new Date(date).toLocaleString()}
        Offense: ${offense}
        Offense image link: ${offense_link}
        
        Vehicle Details:
            Make:  ${vehicle.make}
            Year:  ${vehicle.year}
            Model:  ${vehicle.model}
            Color:  ${vehicle.color}
            Number Plate: ${vehicle.number_plate}
    This offense is a violation of traffic laws and regulations, and as a result, it carries certain consequences. We understand that mistakes can happen, but it is crucial to address this matter promptly to ensure a fair resolution.

        To resolve this offense, you have the following options:

        Pay the Fine: If you choose to accept responsibility for the offense, you can pay the prescribed fine amount of ${currencyFormatter.format(fine.amount, {code: fine.currency})}. Payment instructions and accepted methods will be provided in a separate attachment along with this email.

        Contest the Offense: If you believe this offense has been issued erroneously, you have the right to contest it. Please submit a written statement explaining your reasons for contesting, accompanied by any supporting evidence. Your case will be reviewed, and a decision will be communicated to you in due course.

        Please be aware that failure to respond or take appropriate action within the specified time frame may result in further penalties, including but not limited to additional fines, suspension of driving privileges, or legal action.

        Attached to this email, you will find the following documents:
        If you have any questions or require clarification regarding this offense or the available options, please do not hesitate to contact the Traffic Offense Department at +2333 0559 113 3014 or info.traffic.offense@gmail.com. Our representatives will be glad to assist you.

        We strongly advise you to review the attached documents thoroughly and take the necessary action within the specified timeframe to resolve this matter promptly.

        Please note that this email is an automated notification. Please do not reply directly to this email address. Instead, use the provided contact information for further assistance.

        Thank you for your attention to this matter.

        Sincerely,

        Florence Yeedoun
        CEO
        +2333 0559 113 3014
        `;
}

export const EMAIL = {sendEmail, generateEmail};