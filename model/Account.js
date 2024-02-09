import { Model } from "@nozbe/watermelondb";
import { field, text } from "@nozbe/watermelondb/decorators";

export default class Account extends Model {
  static table = "accounts"; //binds the model to the table
  //   static associations = {
  //     deliveries: { type: 'has_many', foreignKey: 'account_id' },
  //   }

  @field("account_id") accountId;
  @text("password") password;
  @text("first_name") firstName;
  @text("last_name") lastName;
  @text("school_address") schoolAddress;
  @text("email") email;
  @text("phone_number") phoneNumber;
  @field("is_admin") isAdmin;
}

//NOTES
/*
 *field guaranteed to be the same type as column type defined in the schema
 *@text is an extension of @field that trims whitespace (for fields that contain text typed by user)
 */
