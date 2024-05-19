// Description: This file contains the functions that interact with the SQLite database.
import * as SQLite from "expo-sqlite";

// Open the database
const db = SQLite.openDatabase("database.db");

// Open the database and return it
export const openDatabase = () => {
  //Open the database if not already opened
  return db;
};

//create the tables in the array if not created already
export const createTables = () => {
  db.transaction((tx) => {
    //create accounts table
    tx.executeSql(
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

    //create deliveries table
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

    //create check mail requests table
    tx.executeSql(
      //create simple table with name and text as attributes, isAdmin is a boolean value that can either be 0 or 1
      "CREATE TABLE IF NOT EXISTS CheckMailRequests" +
        "(RequestID INTEGER PRIMARY KEY AUTOINCREMENT, AccID Integer, DateOfRequest DateTime, ExpectedDate DateTime, MailType TEXT, Status TEXT, Decision TEXT, ExtraInfo TEXT, Priority TEXT)",
      [],
      (result) => {
        console.log("CheckMailRequests Table created successfully");
      },
      (error) => {
        console.log("Create CheckMailRequests table error", error);
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

//insert an account into the database
export const insertAccount = (name, lname, email, password) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
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
    });
  });
};

//delete an account from the database
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

//authenticate a user by email and password for login
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

//update an account in the database for profile
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
    db.transaction((tx) => {
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
    });
  });
};

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

//insert a delivery into the database
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

//get all of the deliveries that belong to specific user
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

//get deliveries that belong to a user(***NOT USED***)
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

//get all of the packages that are still stored in the array
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

//fix previous deliveries that were not marked as not picked up
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

//search for a package by its tracking number
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

//update a package to be marked as picked up for package pickup
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

//delete package from the database when it is disposed of
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

//insert a check mail request into the database
export const insertCheckMailRequest = (
  AccID,
  MailType,
  DateOfRequest,
  ExpectedDate,
  Status,
  Decision,
  ExtraInfo
) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO CheckMailRequests (AccID, MailType, DateOfRequest, ExpectedDate, Status, Decision, ExtraInfo) values ( ?, ?, ?, ?, ?, ?, ?)",
          [
            AccID,
            MailType,
            DateOfRequest,
            ExpectedDate,
            Status,
            Decision,
            ExtraInfo,
          ],
          (_, resultSet) => {
            console.log("CheckMailRequest successfully inserted");
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

//get all of the check mail requests that belong to specific user
export const getUserCheckRequestsByID = (AccID, successCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM CheckMailRequests WHERE AccID = ?",
      [AccID],
      (txObj, resultSet) => successCallback(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });
};

//get all of the check mail requests that are not complete (***NOT USED***)
export const getCheckMailRequests = (successCallback) => {
  db.transaction((tx) => {
    //null is the parameters, this is parameterized query to prevent injection attack
    tx.executeSql(
      "SELECT CheckMailRequests.RequestID, CheckMailRequests.MailType, CheckMailRequests.DateOfRequest, CheckMailRequests.ExpectedDate, CheckMailRequests.Status, CheckMailRequests.Decision, CheckMailRequests.ExtraInfo, CheckMailRequests.AccID, Accounts.Fname, Accounts.Lname FROM CheckMailRequests JOIN Accounts ON CheckMailRequests.AccID = Accounts.AccID WHERE CheckMailRequests.Status != 'Complete'",
      null,
      //success callback function
      (txObj, resultSet) => {
        // console.log(resultSet.rows._array);
        successCallback(resultSet.rows._array);
      }, //setting the results as our accounts array
      //error callback function
      (txObj, error) => console.log(error) //logs if there are errors executing SQL
    );
  });
};

//update a check mail request in the database
export const updateCheckMailRequest = async (Status, Decision, RequestID) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE CheckMailRequests SET Status = ?, Decision = ? WHERE RequestID=?`,
        [Status, Decision, RequestID],
        (_, result) => {
          console.log("Check Mail Request updated successfully");
          resolve(result);
        },
        (_, error) => {
          console.error("Error updating Check Mail Requests:", error);
          reject(error);
        }
      );
    });
  });
};
