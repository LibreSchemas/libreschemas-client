/*  Copyright 2022 Dev Mindset Community Interest Company
    This file is part of LibreSchemas Client.
    LibreSchemas Client is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
    LibreSchemas Client is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License along with LibreSchemas Server API for React. If not, see <https://www.gnu.org/licenses/>.
*/
import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import ExpectedBehaviourScreen from "./SchemaEventTabScreenTabs/ExpectedBehaviourScreen";
import UnpopularBehaviourScreen from "./SchemaEventTabScreenTabs/UnpopularBehaviourScreen";
import UnlawfulBehaviourScreen from "./SchemaEventTabScreenTabs/UnlawfulBehaviourScreen";

const SchemaEventTab = createMaterialBottomTabNavigator();

const SchemaEventTabScreen = ( { route, navigation } ) => {

  let { classType, docID, event_name } = route.params;

  const { colors } = useTheme();

  return (
    <SchemaEventTab.Navigator initialRouteName="Expected Behaviour" activeColor="#ffff00" inactiveColor="#ffffff" barStyle={{ backgroundColor: colors.listbackground, borderTopWidth: 1, borderTopColor: '#000000'}}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Expected Behaviour') {
                  iconName = focused
                    ? 'thumb-up'
                    : 'thumb-up';
                } else if (route.name === 'Unpopular Behaviour') {
                  iconName = focused ? 'thumb-down' : 'thumb-down';
                } else if (route.name === 'Unlawful Behaviour') {
                  iconName = focused ? 'alert-octagon' : 'alert-octagon';
                }
                
                size = 25

                // You can return any component that you like here!
                return <Icon name={iconName} size={size} color={color} />;
              },
            })}
            Options={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'grey',
            }}
        >
        <SchemaEventTab.Screen name="Expected Behaviour" component={ExpectedBehaviourScreen} initialParams={{classType: classType, docID: docID, event_name: event_name }}  options={{ tabBarLabel: "Expected" }}/>
        <SchemaEventTab.Screen name="Unpopular Behaviour" component={UnpopularBehaviourScreen} initialParams={{classType: classType, docID: docID, event_name: event_name }} options={{ tabBarLabel: "Unpopular" }} />
        <SchemaEventTab.Screen name="Unlawful Behaviour" component={UnlawfulBehaviourScreen} initialParams={{classType: classType, docID: docID, event_name: event_name }} options={{ tabBarLabel: "Unlawful" }}/>
      </SchemaEventTab.Navigator>
  );
};

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
  
export default SchemaEventTabScreen;
