import { ReqRefDefaults } from "@hapi/hapi";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { addContactUsData } from "../services/contact_us.service";
import { ContactUsDocument } from "../models/contact_us.model";

async function contactUsController(
  request: Request<ReqRefDefaults>,
  response: ResponseToolkit<ReqRefDefaults>
) {
  const { email, username, subject, message } =
    request.payload as ContactUsDocument;

  await addContactUsData({ email, username, subject, message });

  return response
    .response({
      statusCode: 200,
      responseMsg: "Data Submitted successFully",
    })
    .code(200);
}

export { contactUsController };
