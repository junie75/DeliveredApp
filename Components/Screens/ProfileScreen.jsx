import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from "react-native";
import Hero from "./homeComp/Hero";
import Header from "./homeComp/Header";
import UserContext from "../../UserContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { updateAccount } from "../../databaseHelper";

const ProfileScreen = ({ navigation }) => {
  const { user, updateUser } = useContext(UserContext);
  const imageName = "profileHero";
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleEdit = () => {
    setEditMode(!editMode);
    if (!editMode) {
      // Copy the user object to editedUser when entering edit mode
      setEditedUser({ ...user });
    }
  };

  const handleSave = async (
    newFname = editedUser.Fname,
    newLname = editedUser.Lname,
    newAddress = editedUser.Address,
    newPhone = editedUser.Phone,
    newEmail = editedUser.Email,
    newPassword = editedUser.Password,
    AccID = editedUser.AccID
  ) => {
    try {
      const result = await updateAccount(
        newFname,
        newLname,
        newAddress,
        newPhone,
        newEmail,
        newPassword,
        AccID
      );
      console.log("User updated successfully:", result);
      updateUser(editedUser);
      setEditMode(false); // Exit edit mode
    } catch (error) {
      // Handle errors if any
      console.error("Error updating user:", error);
    }
    // Save edited user information
  };

  //   const keys = Object.keys(user);
  //   const filteredKeys = keys.slice(1, keys.length - 1);
  //   const KeyValuePairs = () => {
  //     return (
  //       <View>
  //         {filteredKeys.map((key, index) => (
  //           <View key={index} style={styles.container}>
  //             <Text style={styles.label}>{key}</Text>
  //             <Text style={styles.result}>{user[key]}</Text>
  //             {/* <TextInput
  //               style={styles.input}
  //               value={obj[key]}
  //               onChangeText={(value) => console.log(value)} // Change this function as needed
  //             /> */}
  //           </View>
  //         ))}
  //       </View>
  //     );
  //   };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* <Header showMenu={true} navigation={navigation} /> */}
        {/* <Text>Profile Screen</Text> */}
        <Hero imageName={imageName} />
        {editMode ? (
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => handleEdit()}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSave()}>
              <Text style={styles.save}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => handleEdit()}>
              {/* <Button
            title="Edit"
            // style={styles.edit}
            onPress={() => handleEdit()}
          /> */}
              <Image
                source={require("../../assets/editing.png")}
                style={{ height: 25, width: 25 }}
              />
            </TouchableOpacity>
          </View>
        )}
        <KeyboardAwareScrollView style={styles.fieldsContainer}>
          <View style={styles.fieldsBox}>
            <Text style={styles.fieldName}>First Name</Text>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={editedUser.Fname}
                onChangeText={(value) =>
                  setEditedUser({ ...editedUser, Fname: value })
                }
              />
            ) : (
              <Text style={styles.value}>{user.Fname}</Text>
            )}
          </View>
          <View style={styles.fieldsBox}>
            <Text style={styles.fieldName}>Last Name</Text>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={editedUser.Lname}
                onChangeText={(value) =>
                  setEditedUser({ ...editedUser, Lname: value })
                }
              />
            ) : (
              <Text style={styles.value}>{user.Lname}</Text>
            )}
          </View>
          <View style={styles.fieldsBox}>
            <Text style={styles.fieldName}>School Address</Text>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={editedUser.Address}
                onChangeText={(value) =>
                  setEditedUser({ ...editedUser, Address: value })
                }
              />
            ) : (
              <Text style={styles.value}>{user.Address}</Text>
            )}
          </View>
          <View style={styles.fieldsBox}>
            <Text style={styles.fieldName}>Phone Number</Text>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={editedUser.Phone}
                onChangeText={(value) =>
                  setEditedUser({ ...editedUser, Phone: value })
                }
              />
            ) : (
              <Text style={styles.value}>{user.Phone}</Text>
            )}
          </View>
          <View style={styles.fieldsBox}>
            <Text style={styles.fieldName}>Email</Text>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={editedUser.Email}
                onChangeText={(value) =>
                  setEditedUser({ ...editedUser, Email: value })
                }
              />
            ) : (
              <Text style={styles.value}>{user.Email}</Text>
            )}
          </View>
          <View style={styles.fieldsBox}>
            <Text style={styles.fieldName}>Password</Text>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={editedUser.Password}
                secureTextEntry={true}
                editable={true}
                onChangeText={(value) =>
                  setEditedUser({ ...editedUser, Password: value })
                }
              />
            ) : (
              <TextInput
                style={styles.value}
                value={user.Password}
                secureTextEntry={true}
                editable={false}
              />
            )}
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  fieldsContainer: {
    marginHorizontal: 20,
  },
  fieldsBox: {
    marginVertical: 10,
  },
  fieldName: {
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "lightgray",
    borderRadius: 10,
    padding: 10,
  },
  edit: {
    textAlign: "right",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 15,
    marginTop: 3,
  },
  cancel: {
    color: "red",
    marginHorizontal: 10,
    fontSize: 15,
  },
  save: {
    marginHorizontal: 10,
    color: "#007AFF",
    fontSize: 15,
  },
});
