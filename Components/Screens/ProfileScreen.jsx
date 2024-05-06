//this is the profile screen where the user can view and edit their profile information
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
import UserContext from "../../context/UserContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { updateAccount } from "../../databaseHelper";

const ProfileScreen = ({ navigation }) => {
  // Get user information from the context and the function to update the user
  const { user, updateUser } = useContext(UserContext);
  //set the hero image to the profileHero image
  const imageName = "profileHero";

  // State to manage edit mode and edited user information
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  // Function to handle edit mode
  const handleEdit = () => {
    setEditMode(!editMode);
    if (!editMode) {
      // Copy the user object to editedUser when entering edit mode
      setEditedUser({ ...user });
    }
  };

  // Function to handle when the save button is pressed
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
      //send the user info to the database and receive result
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
      updateUser(editedUser); //change the user information in the context
      setEditMode(false); // Exit edit mode
    } catch (error) {
      // Handle errors if any
      console.error("Error updating user:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Hero imageName={imageName} />
        {
          //display the edit and save buttons if in edit mode and only the edit button if not
          editMode ? (
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
          )
        }
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
