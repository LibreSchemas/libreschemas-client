/*  Copyright 2022 Dev Mindset Community Interest Company
    This file is part of LibreSchemas Client.
    LibreSchemas Client is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
    LibreSchemas Client is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License along with LibreSchemas Server API for React. If not, see <https://www.gnu.org/licenses/>.
*/
import React from "react";
import { View, Text, StyleSheet, Linking, ScrollView } from "react-native";
import { useTheme } from 'react-native-paper';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const DictionariesScreen = ({ navigation }) => {

    const { colors } = useTheme();

    const styles = StyleSheet.create({
      container: {
          flex: 1,
          width: '100%',
          backgroundColor: colors.background
      },
      heading: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10
      },
    });

    const ScreenContainer = ({ children }) => (
      <View style={styles.container}>{children}</View>
    );
    return (
      <ScreenContainer>
        <ScrollView>
          <View style={{ width: "90%", flexDirection: 'column', justifyContent: "center", paddingLeft: 25}}>
                <Text style={{ fontSize: 14 }}>Dictionaries are helpful in understanding language. Do checkout these dictionaries.</Text>

            <View style={{ width: "100%", justifyContent: "center", paddingTop: 20 }}>
              <Card mode="outlined">
                <Card.Content>
                  <Title>Urban Dictionary</Title>
                  <Paragraph>A user generated dictionary that can be helpful in understanding slang or cultural words.</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() =>{Linking.openURL('https://www.urbandictionary.com')}} mode="contained" color={colors.listbackground}>Visit Website</Button>
                  </Card.Actions>
              </Card>
            </View>

            <View style={{ width: "100%", paddingTop: 20}}>
              <Card mode="outlined">
                <Card.Content>
                  <Title>Oxford English Dictionary</Title>
                  <Paragraph>The historical dictionary of the English language first published in 1884.</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() =>{Linking.openURL('https://www.oed.com')}} mode="contained" color={colors.listbackground}>Visit Website</Button>
                  </Card.Actions>
              </Card>
            </View>

            <View style={{ width: "100%", paddingTop: 20}}>
              <Card mode="outlined">
                <Card.Content>
                  <Title>Merriam-Webster American English Dictionary</Title>
                  <Paragraph>A 150-year-old American English Dictionary used widely in the USA.</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() =>{Linking.openURL('https://www.merriam-webster.com')}} mode="contained" color={colors.listbackground}>Visit Website</Button>
                  </Card.Actions>
              </Card>
            </View>

            <View style={{ width: "100%", paddingTop: 20, paddingBottom: 20}}>
              <Card mode="outlined">
                <Card.Content>
                  <Title>Macquarie Australian English Dictionary</Title>
                  <Paragraph>Recognised since its first publication in 1981 as the standard authority on the English language in Australia.</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() =>{Linking.openURL('https://www.macquariedictionary.com.au')}} mode="contained" color={colors.listbackground}>Visit Website</Button>
                  </Card.Actions>
              </Card>
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  };

export default DictionariesScreen;
