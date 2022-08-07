/*  Copyright 2022 Dev Mindset Community Interest Company
    This file is part of LibreSchemas Client.
    LibreSchemas Client is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
    LibreSchemas Client is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License along with LibreSchemas Server API for React. If not, see <https://www.gnu.org/licenses/>.
*/
import { DarkTheme, DefaultTheme } from 'react-native-paper';

export const CustomDarkTheme: ReactNativePaper.Theme = {
    ...DarkTheme,
    mode: "adaptive",
    colors: {
      ...DarkTheme.colors,
      customColor: '#BADA55',
      border: "#424242",
      itembackground: "#424242",
      listbackground: "#424242",
      listtext: "#FFFFFF",
      listheadertext: "#FFFFFF",
      loadingerrortext: "#ffffff",
      headerBackground: "#424242",
      headerText: "#FFFFFF",
      text: "#FFFFFF",
      iconColor:"#FFFFFF",
      expectedbehaviour: '#1DE9B6',
      unpopularbehaviour: '#AA00FF',
      popupbuttonbackground: "#1DE9B6",
      hyperlinkColor: '#18FFFF',
      eventbutton: "#757575",
      packageSilver: '#AFAFAF',
      packageBronze: '#cd7f32',
      packageBronzeText: "#FFFFFF",
      packageSilverText: '#FFFFFF'
    },
    fonts: {
      ...DarkTheme.fonts,
      superLight: { ...DarkTheme.fonts['light'] },
    },
    userDefinedThemeProperty: '',
    animation: {
      ...DarkTheme.animation,
      customProperty: 1,
    },
  };
  
export const CustomDefaultTheme = {
    ...DefaultTheme,
    mode: "adaptive",
    roundness: 5,
    colors: {
      ...DefaultTheme.colors,
      background: "#FFFFFF",
      itembackground: "#FFFFFF",
      border: "#000000",
      customColor: '#BADA55',
      surface: "#FFFFFF",
      backdrop: "#FFFFFF",
      listbackground: "#1A5653",
      popupbuttonbackground: "#1A5653",
      listtext: "#FFFFFF",
      listheadertext: "#ffff00",
      loadingerrortext: "#000000",
      text: "#000000",
      headerBackground: "#FFFFFF",
      headerText: "#000000",
      iconColor:"#000000",
      eventbutton: "#FFFFFF",
      expectedbehaviour: '#385623',
      unpopularbehaviour: '#7030A0',
      hyperlinkColor: 'blue',
      packageSilver: '#AFAFAF',
      packageBronze: '#cd7f32',
      packageBronzeText: "#FFFFFF",
      packageSilverText: '#FFFFFF'
    },
    fonts: {
      ...DefaultTheme.fonts,
      superLight: { ...DefaultTheme.fonts['light'] },
    },
    userDefinedThemeProperty: '',
    animation: {
      ...DefaultTheme.animation,
      customProperty: 1,
    },
  };