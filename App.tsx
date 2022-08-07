/*  Copyright 2022 Dev Mindset Community Interest Company
    This file is part of LibreSchemas Client.
    LibreSchemas Client is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
    LibreSchemas Client is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License along with LibreSchemas Server API for React. If not, see <https://www.gnu.org/licenses/>.
*/
import React  from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, from, HttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { StyleSheet } from 'react-native';
import { InitialState, NavigationContainer } from "@react-navigation/native";
import {CustomDarkTheme, CustomDefaultTheme } from './src/components/Theme'
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HelpScreen from "./src/screens/HelpScreen";
import DrawerItems from "./src/components/DrawerItems";
import { PreferencesContext } from "./src/context";
import { Provider as PaperProvider, DarkTheme } from 'react-native-paper';
import DictionariesScreen from "./src/screens/DictionariesScreen";
import BrowseSchemasStackScreen from "./src/screens/BrowseSchemasStackScreen";
import { API_URL } from '@env';

import { createDrawerNavigator } from "@react-navigation/drawer";

const PERSISTENCE_KEY = 'NAVIGATION_STATE';
const PREFERENCES_KEY = 'APP_PREFERENCES';

const DrawerContent = () => {
  return (
    <PreferencesContext.Consumer>
      {(preferences) => (
        <DrawerItems
          toggleTheme={preferences.toggleTheme}
          isDarkTheme={preferences.theme.dark}
        />
      )}
    </PreferencesContext.Consumer>
  );
};

const Drawer = createDrawerNavigator();
const DrawerScreen = ({ }) => {
  
  const [theme, setTheme] = React.useState<ReactNativePaper.Theme>(
    CustomDefaultTheme
  );

   const preferences = React.useMemo(
    () => ({
      toggleTheme: () =>
        setTheme((theme) =>
          theme === CustomDefaultTheme ? CustomDarkTheme : CustomDefaultTheme
        ),
      theme,
    }),
    [theme]
  );
   
  const { colors } = useTheme();

  return (
    <Drawer.Navigator initialRouteName="Browse Schemas" screenOptions={{ headerStyle: { backgroundColor: colors.headerBackground }, headerTitleStyle: { color: colors.headerText }}} drawerContent={() => <DrawerContent />}>
      <Drawer.Screen name="Browse Schemas" component={BrowseSchemasStackScreen} title="Browse Schemas"/>
      <Drawer.Screen name="Dictionaries" component={DictionariesScreen} />
      <Drawer.Screen name="Help" component={HelpScreen} />
    </Drawer.Navigator>
  );
};

export default function App() {

  const [initialState, setInitialState] = React.useState<
    InitialState | undefined
  >();

  const [theme, setTheme] = React.useState<ReactNativePaper.Theme>(
    CustomDefaultTheme
  );

  const navigationRef = React.useRef();

  React.useEffect(() => {
    const restorePrefs = async () => {
      try {
        const prefString = await AsyncStorage.getItem(PREFERENCES_KEY);
        const preferences = JSON.parse(prefString || '');

        if (preferences) {
          // eslint-disable-next-line react/no-did-mount-set-state
          setTheme(
            preferences.theme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
          );
        }
      } catch (e) {
        // ignore error
      }
    };

    restorePrefs();
  }, []);

  React.useEffect(() => {
    const savePrefs = async () => {
      try {
        await AsyncStorage.setItem(
          PREFERENCES_KEY,
          JSON.stringify({
            theme: theme === DarkTheme ? 'dark' : 'light'
          })
        );
      } catch (e) {
        // ignore error
      }
    };

    savePrefs();
  }, [theme]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme: () =>
        setTheme((theme) =>
          theme === CustomDefaultTheme ? CustomDarkTheme : CustomDefaultTheme
        ),
      theme,
    }),
    [theme]
  );

  const authLink = setContext(async (_, { headers }) => {
    return {
        headers: {
            ...headers
        },
    };
  });

  const httpLink = new HttpLink({
    uri: `${API_URL}/api/graphql`,
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([authLink, httpLink]),
  });

  return (
    <PaperProvider theme={theme}>
      <PreferencesContext.Provider value={preferences}>
        <ApolloProvider client={client}>
          <NavigationContainer ref={navigationRef}
          initialState={initialState}
          onStateChange={(state) =>
            AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
          }
          >
            <DrawerScreen/>
          </NavigationContainer>
        </ApolloProvider>
      </PreferencesContext.Provider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
