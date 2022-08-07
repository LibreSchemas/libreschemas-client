/*  Copyright 2022 Dev Mindset Community Interest Company
    This file is part of LibreSchemas Client.
    LibreSchemas Client is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
    LibreSchemas Client is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License along with LibreSchemas Server API for React. If not, see <https://www.gnu.org/licenses/>.
*/
import React from "react";
import { Platform, Share, View, StyleSheet, ScrollView, Linking, Image } from "react-native";
import { List } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import {Button, Card, Paragraph } from 'react-native-paper';
import { WEB_URL } from '@env';

const SchemaClassScreen = ({navigation, route, }) => {


  const { colors } = useTheme();

  const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      paddingBottom: 75,
      backgroundColor: colors.background
    },
    item: {
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: colors.border,
      backgroundColor: colors.listbackground,
    },
  });


  async function onShare() {
    try {
      const result = await Share.share({
        message:
          `NeuroSchemas.app | The app that empowers confidence in social situations | ${WEB_URL}`
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  const _goBack = () => { navigation.navigate('Schema Class') };
    return (
      <ScrollView>
      <ScreenContainer>
        <List.Item
          title="Generic Schemas" titleStyle={{ fontWeight: "bold", color: colors.listheadertext}}
          description="General schemas for common social situations." descriptionStyle={{ color: colors.listtext }}
          left={props => <List.Icon color={colors.listtext} icon="currency-sign" />}
          style={styles.item}
          onPress={() =>
            navigation.navigate('Schema Categories', {
                classType: 'generic'
            })}
        />   
            <View style={{ marginTop: 20, marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../assets/images/agplv3_logo.png')} />                   
            </View>
            <Card mode="elevated" style={{marginHorizontal: 16, marginVertical: 8, borderWidth: 1, alignItems: "center"}}>
              <Card.Content>
                <Paragraph style={{ textAlign:'justify' }}>LibreSchemas is Free and Open Source Software developed by Autistics to support the Neurodiversity movement. We believe Autistics should be able to be themselves and live as independently as possible.</Paragraph>
                <Paragraph style={{ textAlign:'justify' }}>We recommend LibreSchemas only be used as a guide and not as a definitive resource for living. Not everything in LibreSchemas will be suitable for everyone in a given situation.</Paragraph>
                <Paragraph style={{ textAlign:'justify' }}>You can support our work by contributing and sharing on Social Media.</Paragraph>
              </Card.Content>
              <Card.Actions> 
                    { (Platform.OS != 'web') ? <Button onPress={() =>{ onShare() }} mode="contained" icon="share-variant" color={colors.listbackground} style={{marginRight: 10}} >Share</Button>: null} 
                    { (Platform.OS != 'web') ? <Button onPress={() =>{ { Linking.openURL('https://www.libreschemas.org') }}} mode="contained" color={colors.listbackground}>Visit Website</Button>: null }
              </Card.Actions>         
            </Card>
      </ScreenContainer>
      </ScrollView>
    );
  };
  
export default SchemaClassScreen;
