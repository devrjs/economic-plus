import sendgrid from "@sendgrid/mail"
import fs from "fs"
import handlebars from "handlebars"

interface GenerateEmailProps {
  to: string
  subject: string
  variables: any
  path: string
}

class GenerateEmail {
  async sendEmail({ to, subject, variables, path }: GenerateEmailProps): Promise<void> {
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string)

    const templateFileContent = fs.readFileSync(path).toString("utf-8")
    const templateParse = handlebars.compile(templateFileContent)
    const templateHTML = templateParse(variables)

    const msg = {
      from: "economicplus.oficial@hotmail.com",
      to: to,
      subject: subject,
      text: "and easy to do anywhere, even with Node.js",
      html: templateHTML,
    }

    sendgrid
      .send(msg)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error)
      })
  }
}

export { GenerateEmail }
