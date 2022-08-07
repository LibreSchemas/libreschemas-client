/*  Copyright 2022 Dev Mindset Community Interest Company
    This file is part of LibreSchemas Client.
    LibreSchemas Client is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
    LibreSchemas Client is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License along with LibreSchemas Server API for React. If not, see <https://www.gnu.org/licenses/>.
*/
import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SchemaClassScreen from "./SchemaClassScreen";
import SchemaCategoriesScreen from "./SchemaCategoriesScreen";
import BrowseSchemasScreen from "./BrowseSchemasScreen";
import SchemeEventsScreen from "./SchemeEventsScreen";
import ChallengesScreen from "./ChallengesScreen";
import ResolutionsScreen from "./ResolutionsScreen";
import SchemaEventTabScreen from "./SchemaEventTabScreen";

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
  );

const BrowseSchemasStack = createStackNavigator();
const BrowseSchemasStackScreen = ({navigation, route}) => (
  <BrowseSchemasStack.Navigator>
    <BrowseSchemasStack.Screen name="Schema Class" component={SchemaClassScreen} options={{ headerShown: false }}/>  
    <BrowseSchemasStack.Screen name="Schema Categories" component={SchemaCategoriesScreen} options={{ headerShown: false }} />
    <BrowseSchemasStack.Screen name="Schemas" component={BrowseSchemasScreen} options={{ headerShown: false }}/>
    <BrowseSchemasStack.Screen name="Schema Events" component={SchemeEventsScreen} options={{ headerShown: false }}/>
    <BrowseSchemasStack.Screen name="Challenges" component={ChallengesScreen} options={{ headerShown: false }}/>
    <BrowseSchemasStack.Screen name="Schema Event" component={SchemaEventTabScreen} options={{ headerShown: false }}/>
    <BrowseSchemasStack.Screen name="Resolutions" component={ResolutionsScreen} options={{ headerShown: false }}/>
  </BrowseSchemasStack.Navigator>
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 10,
      borderRadius: 5
    }
  });
  
export default BrowseSchemasStackScreen;
