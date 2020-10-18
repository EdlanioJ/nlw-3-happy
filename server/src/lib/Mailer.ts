import htmlToText from 'html-to-text';
import NodeMailer, { Transporter } from 'nodemailer';

import mailConfig from '../config/mail';

interface IMessage {
  from: {
    name: string;
    email: string;
  };
  to: string;
  subject: string;
  body: string;
}

export default class Mailer {
  transport: Transporter;

  constructor() {
    this.transport = NodeMailer.createTransport(mailConfig);
  }

  async sendEmail(message: IMessage) {
    await this.transport.sendMail({
      from: {
        address: message.from.email,
        name: message.from.name,
      },
      to: message.to,
      subject: message.subject,
      html: message.body,
      text: htmlToText.fromString(message.body, {
        ignoreImage: true,
        preserveNewlines: true,
        wordwrap: 120,
      }),
    });
  }
}
