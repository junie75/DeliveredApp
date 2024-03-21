import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("database.db");

export const openDatabase = () => {
  //Open the database if not already opened
  return db;
};

//create the tables in the array if not created already
export const createTables = () => {
  db.transaction((tx) => {
    tx.executeSql(
      //create simple table with name and text as attributes, isAdmin is a boolean value that can either be 0 or 1
      "CREATE TABLE IF NOT EXISTS Accounts" +
        "(AccID INTEGER PRIMARY KEY AUTOINCREMENT, Fname TEXT, Lname TEXT, Password TEXT, Address TEXT, Email TEXT, Phone TEXT, isAdmin INTEGER)",
      [],
      (result) => {
        console.log("Table created successfully");
      },
      (error) => {
        console.log("Create table error", error);
      }
    );
  });
};

//get all of the accounts in the array
export const getAccounts = (successCallback) => {
  db.transaction((tx) => {
    //null is the parameters, this is parameterized query to prevent injection attack
    tx.executeSql(
      "SELECT * FROM Accounts",
      null,
      //success callback function
      (txObj, resultSet) => successCallback(resultSet.rows._array), //setting the results as our accounts array
      //error callback function
      (txObj, error) => console.log(error) //logs if there are errors executing SQL
    );
  });
};

//insert a singular account into the database
// export const insertAccount = (name, lname, email, password) => {
//   return new Promise((resolve, reject) => {
//     db.transaction(
//       (tx) => {
//         tx.executeSql(
//           "INSERT INTO Accounts (Fname, Lname, Email, Password) values (?, ?, ?, ?)",
//           [name, lname, email, password],
//           (_, result) => {
//             console.log("Account successfully inserted");
//             resolve(result);
//             // Fetch the inserted user
//             // tx.executeSql(
//             //   "SELECT * FROM Accounts WHERE AccID = ?",
//             //   [result.insertId],
//             //   (_, resultSet) => {
//             //     const insertedUser = resultSet.rows.item(0);
//             //     // Resolve with the inserted user and other relevant information
//             //     resolve(insertedUser);
//             //   }
//             // );
//           },
//           (_, error) => {
//             reject(error);
//           }
//         );
//       }
//       // resolve,
//       // reject
//     );
//   });
// };
export const insertAccount = (name, lname, email, password) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO Accounts (Fname, Lname, Email, Password) values (?, ?, ?, ?)",
          [name, lname, email, password],
          (_, resultSet) => {
            console.log("Account successfully inserted");
            resolve(resultSet);
          },
          (_, error) => {
            reject(error);
          }
        );
      }
      // resolve,
      // reject
    );
  });
};

//delete an account CORRECT

// export const deleteAccount = async (id) => {
//   return new Promise((resolve, reject) => {
//     db.transaction(
//       (tx) => {
//         tx.executeSql("DELETE FROM Accounts WHERE AccID = ?", [id]);
//       },
//       reject,
//       resolve
//     );
//   });
// };

export const deleteAccount = async (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Accounts WHERE AccID = ?",
        [id],
        (_, resultSet) => {
          console.log("Account successfully deleted");
          resolve(resultSet);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const authenticateUser = (email, password) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Accounts WHERE Email = ? AND Password = ?",
        [email, password],
        (_, { rows }) => {
          if (rows.length > 0) {
            const user = rows.item(0); // Assuming username is unique
            resolve(user);
          } else {
            resolve(null); // No user found with the provided credentials
          }
        },
        (_, error) => {
          reject(error); // Error occurred during SQL execution
        }
      );
    });
  });
};

export const updateAccount = async (
  newFname,
  newLname,
  newAddress,
  newPhone,
  newEmail,
  newPassword,
  AccID
) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `UPDATE Accounts SET Fname=?, Lname=?, Address=?, Phone=?, Email=?, Password=? WHERE AccID=?;`,
          [
            newFname,
            newLname,
            newAddress,
            newPhone,
            newEmail,
            newPassword,
            AccID,
          ],
          (_, result) => {
            console.log("Account updated successfully");
            resolve(result);
          },
          (_, error) => {
            console.error("Error updating account:", error);
            reject(error);
          }
        );
      }
      // reject,
      // resolve
    );
  });
};

// export const deleteAccount = (id) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         "DELETE FROM Accounts WHERE AccID = ?",
//         [id],
//         (txObj, resultSet) => {
//           //check if there are any rows affected before updating names array
//           if (resultSet.rowsAffected > 0) {
//             let existingNames = [...names].filter((name) => name.id !== id); //filter out name to delete
//             setNames(existingNames);
//             // setCurrentName(undefined);
//           }
//         },
//         (txObj, error) => console.log(error)
//       );
//     });
//   };
