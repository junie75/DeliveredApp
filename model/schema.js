import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      //table to hold the user information
      name: "accounts",
      columns: [
        { name: "account_id", type: "string" },
        { name: "password", type: "string" },
        { name: "first_name", type: "string" },
        { name: "last_name", type: "string" },
        { name: "school_address", type: "string", isOptional: true },
        { name: "email", type: "string" },
        { name: "phone_number", type: "string" },
        { name: "is_admin", type: "boolean" },
      ],
    }),
  ],
});

//NOTES
/*
 * all tables automatically have an id of type string to uniquely identify records, but a string column ending with _id can be declared to add a relation to a table
 * isIndexed: true can be added to a column if it is queried often, so that querying becomes faster (do not use w/ date or strings)
 */
