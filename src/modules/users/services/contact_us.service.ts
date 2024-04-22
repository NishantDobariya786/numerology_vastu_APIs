import { ContactUsDocument, ContactUsModel } from "../models/contact_us.model";

function addContactUsData(params: Partial<ContactUsDocument>) {
  return ContactUsModel.create(params);
}

export { addContactUsData };
