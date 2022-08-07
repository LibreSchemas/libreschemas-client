/*  Copyright 2022 Dev Mindset Community Interest Company
    This file is part of LibreSchemas Client.
    LibreSchemas Client is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
    LibreSchemas Client is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License along with LibreSchemas Server API for React. If not, see <https://www.gnu.org/licenses/>.
*/
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import {
  Badge,
  Drawer,
  Switch,
  TouchableRipple,
  Text,
  Colors,
  useTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  toggleTheme: () => void;
  isDarkTheme: boolean;
};

const DrawerItems = ({ toggleTheme, isDarkTheme }: Props) => {

  const navigation = useNavigation();
  const { colors } = useTheme();

  const BrowseSchemaIcon = ( ) => { return <Icon color={colors.iconColor} name='home' size={25} /> }
  const QRCodeScannerIcon = ( ) => { return <Icon color={colors.iconColor} name='qrcode' size={25} /> }
  const DictionariesIcon = ( ) => { return <Icon color={colors.iconColor} name='book-alphabet' size={25} /> }
  const HelpIcon = ( ) => { return <Icon color={colors.iconColor} name='help-circle' size={25} /> }

  return (
    <DrawerContentScrollView
      alwaysBounceVertical={false}
      style={[styles.drawerContent, { backgroundColor: colors.surface }]}
    >
      <Drawer.Section title="Menu">
      <DrawerItem labelStyle={{color: colors.text }} icon={BrowseSchemaIcon} label="Browse Schemas" onPress={() =>  navigation.navigate('Browse Schemas')}/>
      <DrawerItem labelStyle={{color: colors.text }} icon={DictionariesIcon} label="Dictionaries" onPress={() =>  navigation.navigate('Dictionaries')}/>
      <DrawerItem labelStyle={{color: colors.text }} icon={HelpIcon} label="Help" onPress={() =>  navigation.navigate('Help')}/>
      </Drawer.Section>
      <Drawer.Section title="Preferences">
        <TouchableRipple onPress={toggleTheme}>
          <View style={styles.preference}>
            <Text>Dark Theme</Text>
            <View pointerEvents="none">
              <Switch value={isDarkTheme} />
            </View>
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  badge: {
    alignSelf: 'center',
  },
});

export default DrawerItems;
