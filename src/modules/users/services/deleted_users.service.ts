import { DeletedUserModel } from "../models/deleted_user.model";
import { UserDocument } from "../models/user.model";

function addDeletedUserProfile(
  email: string,
  reason: String,
  data: Partial<UserDocument>
) {
  return DeletedUserModel.create({
    email,
    reason,
    data,
  });
}

export { addDeletedUserProfile };
