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
        console.log("Accounts Table created successfully");
      },
      (error) => {
        console.log("Create Accounts table error", error);
      }
    );

    tx.executeSql(
      // isPickedUp is a boolean value that can either be 0 or 1
      "CREATE TABLE IF NOT EXISTS Deliveries" +
        "(DeliveryID INTEGER PRIMARY KEY AUTOINCREMENT, AccID Integer, MailType TEXT, DateReceived DateTime, DatePickedUp DateTime, TrackingNum String, isPickedUp INTEGER)",
      [],
      (result) => {
        console.log("Deliveries Table created successfully");
      },
      (error) => {
        console.log("Create Deliveries table error", error);
      }
    );
  });
};

/***USED ONCE TO EDIT DELIVERIES TABLE */

// export const createTables = () => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       //create simple table with name and text as attributes, isAdmin is a boolean value that can either be 0 or 1
//       "CREATE TABLE IF NOT EXISTS Accounts" +
//         "(AccID INTEGER PRIMARY KEY AUTOINCREMENT, Fname TEXT, Lname TEXT, Password TEXT, Address TEXT, Email TEXT, Phone TEXT, isAdmin INTEGER)",
//       [],
//       (result) => {
//         console.log("Accounts Table created successfully");
//       },
//       (error) => {
//         console.log("Create Accounts table error", error);
//       }
//     );

//     tx.executeSql(
//       // isPickedUp is a boolean value that can either be 0 or 1
//       "CREATE TABLE IF NOT EXISTS Deliveries" +
//         "(DeliveryID INTEGER PRIMARY KEY AUTOINCREMENT, AccID Integer, MailType TEXT, DateReceived DateTime, TrackingNum String, isPickedUp INTEGER)",
//       [],
//       (result) => {
//         console.log("Deliveries Table created successfully");
//         // Add new column to Deliveries table after table creation
//         tx.executeSql(
//           "ALTER TABLE Deliveries ADD COLUMN DatePickedUp DateTime",
//           [],
//           (result) => {
//             console.log(
//               "New column 'DatePickedUp' added to Deliveries table successfully"
//             );
//           },
//           (error) => {
//             console.log("Error adding new column to Deliveries table", error);
//           }
//         );
//       },
//       (error) => {
//         console.log("Create Deliveries table error", error);
//       }
//     );
//   });
// };

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

//search for a user account by last name
export const getAccountByLName = (Lname) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //null is the parameters, this is parameterized query to prevent injection attack
      searchString = "%" + Lname + "%";
      tx.executeSql(
        "SELECT * FROM Accounts WHERE Lname LIKE ?",
        [searchString],
        (_, resultSet) => {
          resolve(resultSet);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const insertDelivery = (AccID, MailType, DateReceived, TrackingNum) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO Deliveries (AccID, MailType, DateReceived, TrackingNum, isPickedUp) values (?, ?, ?, ?, 0)",
          [AccID, MailType, DateReceived, TrackingNum],
          (_, resultSet) => {
            console.log("Delivery successfully inserted");
            console.log(resultSet);
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

export const getUserDeliveriesByID = (AccID, successCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM Deliveries WHERE AccID = ?",
      [AccID],
      (txObj, resultSet) => successCallback(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });
};

export const getUserDeliveries = (AccID) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Deliveries WHERE AccID = ?",
        [AccID],
        (_, { rows }) => {
          if (rows.length > 0) {
            const deliveries = rows._array; // Assuming username is unique
            resolve(deliveries);
            console.log(deliveries);
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

export const getPackagesStillStored = (successCallback) => {
  db.transaction((tx) => {
    //null is the parameters, this is parameterized query to prevent injection attack
    tx.executeSql(
      "SELECT Deliveries.DeliveryID, Deliveries.AccID, Deliveries.DateReceived, Accounts.Fname, Accounts.Lname FROM Deliveries JOIN Accounts ON Deliveries.AccID = Accounts.AccID WHERE Deliveries.MailType = 'Package' AND Deliveries.isPickedUp = 0 ",
      null,
      //success callback function
      (txObj, resultSet) => {
        successCallback(resultSet.rows._array);
        // console.log("result is" + resultSet.rows._array);
      }, //setting the results as our accounts array
      //error callback function
      (txObj, error) => console.log(error) //logs if there are errors executing SQL
    );
  });
};

//fix previous deliveries
export const updateAllDeliveriesIsPickedUpToZero = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE Deliveries SET isPickedUp = 0 WHERE MailType = 'Package'",
      [],
      (txObj, resultSet) => {
        console.log("isPickedUp updated successfully");
      },
      (txObj, error) => {
        console.log("Error updating isPickedUp:", error);
      }
    );
  });
};

// export const getPackagesByTrackingNum = (trackingNum, successCallback) => {
//   db.transaction((tx) => {
//     //null is the parameters, this is parameterized query to prevent injection attack
//     tx.executeSql(
//       "SELECT * FROM Deliveries WHERE MailType = 'Package' AND TrackingNum = ? ",
//       [trackingNum],
//       //success callback function
//       (txObj, resultSet) => {
//         successCallback(resultSet.rows._array);
//         // console.log("result is" + resultSet.rows._array);
//       }, //setting the results as our accounts array
//       //error callback function
//       (txObj, error) => console.log(error) //logs if there are errors executing SQL
//     );
//   });
// };

//search for a user account by last name
export const getPackageByTrackingNum = (trackingNum) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //null is the parameters, this is parameterized query to prevent injection attack
      // searchString = "%" + Lname + "%";
      tx.executeSql(
        "SELECT Deliveries.DatePickedUp, Deliveries.DeliveryID, Deliveries.TrackingNum, Deliveries.DateReceived, Accounts.Fname, Accounts.Lname, Accounts.Address FROM Deliveries JOIN Accounts ON Deliveries.AccID = Accounts.AccID WHERE Deliveries.MailType = 'Package' AND isPickedUp = 0 AND Deliveries.TrackingNum = ? ",
        [trackingNum],
        (_, resultSet) => {
          resolve(resultSet);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const updatePackageIsPickedUp = async (deliveryID, datePickedUp) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `UPDATE Deliveries SET isPickedUp = 1, DatePickedUp = ? WHERE DeliveryID=?`,
          [datePickedUp, deliveryID],
          (_, result) => {
            console.log("Package updated successfully");
            resolve(result);
          },
          (_, error) => {
            console.error("Error updating package:", error);
            reject(error);
          }
        );
      }
      // reject,
      // resolve
    );
  });
};

export const deletePackage = async (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Deliveries WHERE DeliveryID = ?",
        [id],
        (_, resultSet) => {
          console.log("Delivery successfully deleted");
          resolve(resultSet);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
