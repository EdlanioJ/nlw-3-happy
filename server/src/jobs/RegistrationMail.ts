import Mailer from '../lib/Mailer';
import { Job } from 'bull';
import template from '../resouces/mail/registrationMailTemplate';

interface RegistationMailData {
  user: { email: string; name: string; token: string };
}
export default {
  key: 'RegistationMail',
  async hendle({ data }: Job<RegistationMailData>): Promise<void> {
    const mailer = new Mailer();

    const { user } = data;

    try {
      const finalTemplate = template
        .replace('{{ message_name }}', user.name)
        .replace('{{ mensage_token }}', user.token);

      await mailer.sendEmail({
        from: {
          name: process.env.NAME_SENDER as string,
          email: process.env.EMAIL_SENDER as string,
        },
        to: user.email,
        body: finalTemplate,
        subject: 'Email de Cadastro',
      });
    } catch (error) {
      console.log(error);
    }
  },
};
