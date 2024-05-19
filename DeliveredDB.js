import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import * as SQLite from "expo-sqlite";
// import * as Sharing from "expo-sharing";
// import * as FileSystem from "expo-file-system";
// import * as DocumentPicker from "expo-document-picker";
// import SQLite from "react-native-sqlite-storage";
// import { FileSystem } from "expo-file-system";

// const DeliveredDB = () => {
//database connection
//making db a state variable bc it may be changed when importing/exporting
const db = SQLite.openDatabase("database.db");
// const [isLoading, setIsLoading] = useState(true); //checks if data is loading, if not show data
// const [names, setNames] = useState([]); //for loaded names from database
// const [currentName, setCurrentName] = useState(undefined); //for user input of names

// const [accounts, setAccounts] = useState([]); //for loaded accounts from database ***array of objects**
//   //export database
//   const exportDb = async () => {
//     await Sharing.shareAsync(
//       FileSystem.documentDirectory + "SQLite/example.db"
//     );
//   };

//   //import database
//   const importDb = async () => {
//     let result = await DocumentPicker.getDocumentAsync({
//       copyToCacheDirectory: true,
//     });

//     //if document is successfully chosen, start import
//     if (result.type === "success") {
//       setIsLoading(true);

//       //check if sqlite directory exists, if not make the directory
//       if (
//         !(
//           await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite")
//         ).exists
//       ) {
//         await FileSystem.makeDirectoryAsync(
//           FileSystem.documentDirectory + "SQLite"
//         );
//       }

//       //load base64 data from file
//       const base64 = await FileSystem.readAsStringAsync(
//         //specify uri based on what user selected
//         result.uri,
//         //set encoding as base64
//         {
//           encoding: FileSystem.EncodingType.Base64,
//         }
//       );

//       //write as string so db file exists in known location
//       await FileSystem.writeAsStringAsync(
//         FileSystem.documentDirectory + "SQLite/example.db",
//         base64,
//         { encoding: FileSystem.EncodingType.Base64 }
//       );
//       //close existing db
//       await db.closeAsync();
//       setDb(SQLite.openDatabase("example.db"));
//     }
//   };

//use effect is run every time app reloads
// useEffect(() => {
//create transaction and run sql on it
db.transaction((tx) => {
  tx.executeSql(
    //create simple table with name and text as attributes, isAdmin is a boolean value that can either be 0 or 1
    "CREATE TABLE IF NOT EXISTS Accounts" +
      "(AccID INTEGER PRIMARY KEY AUTOINCREMENT, Fname TEXT, Lname TEXT, Password TEXT, Address TEXT, Email TEXT, Phone TEXT, isAdmin INTEGER)"
  );
});

// const getAnything = () => {
// //select data from table
// db.transaction((tx) => {
//   //null is the parameters, this is parameterized query to prevent injection attack
//   tx.executeSql(
//     "SELECT * FROM Accounts",
//     null,
//     //success callback function
//     (txObj, resultSet) => setAccounts(resultSet.rows._array), //setting the results as our accounts array
//     //error callback function
//     (txObj, error) => console.log(error) //logs if there are errors executing SQL
//   );
// });
// }

// const getAccounts = (successCallback) => {
//   db.transaction((tx) => {
//     //null is the parameters, this is parameterized query to prevent injection attack
//     tx.executeSql("SELECT * FROM Accounts", [], (_, { rows: { _array } }) => {
//       successCallback(_array);
//     });
//   });
// };

const getAccounts = (successCallback) => {
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

// setIsLoading(false); //at this stage names should be loaded
// }, [db]);

// if (isLoading) {
//   return (
//     <View style={styles.container}>
//       <Text>Loading names...</Text>
//     </View>
//   );
// }
//   {
//     name: "Delivered-db",
//     location: "default",
//   },
//   () => {
//     console.log("Database connected");
//   }, //on success
//   (error) => console.log("Database error", error) //on error
// );

// useEffect(() => {
//   createTable(); //call create table function here
// });

// //create table function
// const createTable = () => {
//   db.executeSql(
//     "CREATE TABLE IF NOT EXISTS" +
//       "Account" +
//       "(ID INTEGER PRIMARY KEY AUTOINCREMENT, FName VARCHAR, LName, VARCHAR, Address VARCHAR, Email VARCHAR, Phone VARCHAR)",
//     [],
//     (result) => {
//       console.log("Table created successfully");
//     },
//     (error) => {
//       console.log("Create table error", error);
//     }
//   );
// };
const addAccount = () => {
  db.transaction((tx) => {
    //insert user inputted name into database
    //? means parameterized query
    tx.executeSql(
      "INSERT INTO Accounts (Fname, Lname, Password, Address, Email, Phone, isAdmin) values (?, ?, ?, ?, ?, ?, ?)",
      ["Juni", "Ejere", "password", "133 drive", "email", "123456789", 0],

      //success callback function
      (txObj, resultSet) => {
        let existingAccounts = [...accounts]; //creating clone of names array
        existingAccounts.push({
          AccID: resultSet.insertId,
          Fname: "Juni",
          Lname: "Ejere",
          Password: "password",
          Address: "133",
          Email: "email",
          Phone: "123456789",
          isAdmin: 0,
        }); //add new name to array
        setAccounts(existingAccounts); //set names as the same array plus newly added name
        //setCurrentName(undefined); //resets current name to default value
      },
      //success error function
      (txObj, error) => console.log(error)
    );
  });
};

const insertAccount = (name, lname) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("INSERT INTO Accounts (Fname, Lname) values (?, ?)", [
          name,
          lname,
        ]);
      },
      reject,
      resolve
    );
  });
};

const deleteName = (id) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM names WHERE id = ?",
      [id],
      (txObj, resultSet) => {
        //check if there are any rows affected before updating names array
        if (resultSet.rowsAffected > 0) {
          let existingNames = [...names].filter((name) => name.id !== id); //filter out name to delete
          setNames(existingNames);
          // setCurrentName(undefined);
        }
      },
      (txObj, error) => console.log(error)
    );
  });
};

const updateName = (id) => {
  db.transaction((tx) => {
    //updates database
    tx.executeSql(
      "UPDATE names SET name = ? WHERE id = ?",
      [currentName, id],
      //success callback function
      (txObj, resultSet) => {
        //if any rows are affected, change names array with the updated value
        if (resultSet.rowsAffected > 0) {
          let existingNames = [...names]; //create copy of names array
          //find the index of the tuple with the passed in ID
          const indexToUpdate = existingNames.findIndex(
            (name) => name.id === id
          );
          //change the name of the tuple with that ID to the name inputted by the user
          existingNames[indexToUpdate].name = currentName;
          //set names to the updated array
          setNames(existingNames);
          //set the user input back to default value
          setCurrentName(undefined);
        }
      },
      //error callback function
      (txObj, error) => console.log(error)
    );
  });
};

// const showNames = () => {
//   //map the names to a row
//   return names.map((name, index) => {
//     //builds list of components based off of array
//     return (
//       //for each name, create this component
//       <View key={index} style={styles.row}>
//         <Text>{name.name}</Text>
//         <Button title="Delete" onPress={() => deleteName(name.id)} />
//         <Button
//           title="Update"
//           onPress={() => updateName(name.id) /*console.log(name.id)*/}
//         />
//       </View>
//     );
//   });
// };

// const showAccounts = () => {
//   //map the names to a row
//   return accounts.map((accounts, index) => {
//     //builds list of components based off of array
//     return (
//       //for each name, create this component
//       <View key={index} style={styles.row}>
//         <Text>{accounts.Fname}</Text>
//         <Text>{accounts.Lname}</Text>
//         <Text>{accounts.Address}</Text>
//         <Text>{accounts.Email}</Text>
//         <Text>{accounts.Phone}</Text>
//         <Text>{accounts.isAdmin}</Text>

//         {/* <Button
//             title="Update"
//             onPress={() => updateName(name.id) /*console.log(name.id)/}
//           /> */}
//       </View>
//     );
//   });
// };

// const getAccounts = () => {
//   return accounts;
// };

// return (
//   <View style={styles.container}>
//     {/* <TextInput
//       value={currentName}
//       placeholder="name"
//       onChangeText={setCurrentName}
//     /> */}
//     <Button title="Add Account" onPress={addAccount} />
//     {showAccounts()}
//     <Button title="test" onPress={() => console.log(accounts)} />
//     {/* <Button title="Export Db" onPress={exportDb} />
//     <Button title="Import Db" onPress={importDb} /> */}
//     <StatusBar style="auto" />
//   </View>
// );
// };

export { getAccounts, insertAccount };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   row: {
//     flexDirection: "column",
//     alignItems: "center",
//     // alignSelf: "stretch",
//     // justifyContent: "space-between",
//     // margin: 8,
//   },
// });

// export default DeliveredDB;
