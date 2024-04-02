import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { CheckBox, SearchBar } from "react-native-elements";
import { imageLookup } from "../imageLookup";
import { useState } from "react";

const ResolveIssues = () => {
  let redIcon = "alertRed";
  let orangeIcon = "alertOrange";
  let greenIcon = "alertGreen";
  const [checked, setChecked] = useState(true);
  const toggleCheckbox = () => setChecked(!checked);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <SearchBar
            placeholder="Search"
            lightTheme
            round
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchBar}
            inputStyle={styles.searchBarTxt}
          />
        </View>
        <View style={styles.labels}>
          <Text style={[styles.txt, { flex: 2, textAlign: "center" }]}>
            User{" "}
          </Text>
          <Text style={[styles.txt, { flex: 1 }]}>Date</Text>
          <Text style={[styles.txt, { flex: 1 }]}>Priority</Text>
        </View>
        <View style={styles.rows}>
          <View style={styles.requestBox}>
            <CheckBox
              checked={false}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon={"checkbox-blank-outline"}
            />
            <View style={styles.content}>
              <View style={styles.contentItem}>
                <Text style={styles.txt}>Reagan Bill</Text>
              </View>
              <View style={styles.contentItem}>
                <Text style={styles.txt}> 02/24/24</Text>
              </View>
              <View style={styles.contentItem}>
                <Image source={imageLookup[redIcon]} style={styles.alertIcon} />
              </View>
            </View>
          </View>
          <View style={styles.requestBox}>
            <CheckBox
              checked={false}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon={"checkbox-blank-outline"}
            />
            <View style={styles.content}>
              <View style={styles.contentItem}>
                <Text style={styles.txt}>Brock Olsen</Text>
              </View>
              <View style={styles.contentItem}>
                <Text style={styles.txt}> 03/12/24</Text>
              </View>
              <View style={styles.contentItem}>
                <Image
                  source={imageLookup[orangeIcon]}
                  style={styles.alertIcon}
                />
              </View>
            </View>
          </View>
          <View style={styles.requestBox}>
            <CheckBox
              checked={false}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon={"checkbox-blank-outline"}
            />
            <View style={styles.content}>
              <View style={styles.contentItem}>
                <Text style={styles.txt}>Josh Boston</Text>
              </View>
              <View style={styles.contentItem}>
                <Text style={styles.txt}> 03/20/24</Text>
              </View>
              <View style={styles.contentItem}>
                <Image
                  source={imageLookup[orangeIcon]}
                  style={styles.alertIcon}
                />
              </View>
            </View>
          </View>
          <View style={styles.requestBox}>
            <CheckBox
              checked={false}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon={"checkbox-blank-outline"}
            />
            <View style={styles.content}>
              <View style={styles.contentItem}>
                <Text style={styles.txt}>Riley Stewart</Text>
              </View>
              <View style={styles.contentItem}>
                <Text style={styles.txt}> 03/26/24</Text>
              </View>
              <View style={styles.contentItem}>
                <Image
                  source={imageLookup[orangeIcon]}
                  style={styles.alertIcon}
                />
              </View>
            </View>
          </View>

          <View style={styles.requestBox}>
            <CheckBox
              checked={false}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon={"checkbox-blank-outline"}
            />
            <View style={styles.content}>
              <View style={styles.contentItem}>
                <Text style={styles.txt}>Adam Norse</Text>
              </View>
              <View style={styles.contentItem}>
                <Text style={styles.txt}> 03/30/24</Text>
              </View>
              <View style={styles.contentItem}>
                <Image
                  source={imageLookup[greenIcon]}
                  style={styles.alertIcon}
                />
              </View>
            </View>
          </View>

          <View style={styles.requestBox}>
            <CheckBox
              checked={false}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon={"checkbox-blank-outline"}
            />
            <View style={styles.content}>
              <View style={styles.contentItem}>
                <Text style={styles.txt}>Terry Crews</Text>
              </View>
              <View style={styles.contentItem}>
                <Text style={styles.txt}> 03/30/24</Text>
              </View>
              <View style={styles.contentItem}>
                <Image
                  source={imageLookup[greenIcon]}
                  style={styles.alertIcon}
                />
              </View>
            </View>
          </View>

          <View style={styles.requestBox}>
            <CheckBox
              checked={false}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon={"checkbox-blank-outline"}
            />
            <View style={styles.content}>
              <View style={styles.contentItem}>
                <Text style={styles.txt}>Brett Foster</Text>
              </View>
              <View style={styles.contentItem}>
                <Text style={styles.txt}> 03/31/24</Text>
              </View>
              <View style={styles.contentItem}>
                <Image
                  source={imageLookup[greenIcon]}
                  style={styles.alertIcon}
                />
              </View>
            </View>
          </View>

          <View style={styles.requestBox}>
            <CheckBox
              checked={false}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon={"checkbox-blank-outline"}
            />
            <View style={styles.content}>
              <View style={styles.contentItem}>
                <Text style={styles.txt}>Tina Morris</Text>
              </View>
              <View style={styles.contentItem}>
                <Text style={styles.txt}> 04/01/24</Text>
              </View>
              <View style={styles.contentItem}>
                <Image
                  source={imageLookup[greenIcon]}
                  style={styles.alertIcon}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResolveIssues;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    backgroundColor: "#fff",
    borderBlockColor: "#fff",
    marginBottom: 30,
  },
  searchBar: {
    marginHorizontal: 10,
    height: 10,
    backgroundColor: "lightgray",
    alignContent: "center",
  },
  searchBarTxt: {
    fontSize: 10,
    // fontFamily: "FragmentMono-Regular",
    // textAlign: "center",
  },
  rows: {
    marginHorizontal: 15,
  },
  labels: {
    alignSelf: "flex-end",
    flexDirection: "row",
    // borderBlockColor: "yellow",
    // borderWidth: 1,
    // width: "82%",
    justifyContent: "space-between",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  txt: {
    fontSize: 10,
    fontFamily: "FragmentMono-Regular",
  },
  requestBox: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    // borderBlockColor: "yellow",
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentItem: {
    flex: 1,
    // borderColor: "yellow",
    // borderWidth: 1,
  },
  alertIcon: {
    height: 30,
    width: 30,
    alignSelf: "center",
    // borderColor: "yellow",
    // borderWidth: 1,
  },
});
