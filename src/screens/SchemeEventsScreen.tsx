/*  Copyright 2022 Dev Mindset Community Interest Company
    This file is part of LibreSchemas Client.
    LibreSchemas Client is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
    LibreSchemas Client is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License along with LibreSchemas Server API for React. If not, see <https://www.gnu.org/licenses/>.
*/
import React from "react";
import { ActivityIndicator } from 'react-native';
import { View, Text, Image, StyleSheet, FlatList, Pressable } from "react-native";
import { Appbar, Button } from 'react-native-paper';
import { useQuery, gql } from "@apollo/client";
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Speech from 'expo-speech';

const SchemeEventsScreen = ({navigation, route }) => {
    let { docID, classType='generic', shortUUID } = route.params

    const { colors } = useTheme();

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        width: '100%',
        paddingBottom: 75,
        backgroundColor: colors.background
      },
      item: {
        backgroundColor: colors.itembackground,
        borderColor: '#000000',
        borderWidth: 1,
        padding: 5,
        marginVertical: 2,
        marginHorizontal: 2,
      },
        contentContainer: {
          paddingBottom: 100
      },     
      title: {
        fontSize: 20,
        color: colors.text,
        fontWeight: 'bold',
      }  
    });

    const size = 40;

    const ScreenContainer = ({ children }) => (
      <View style={styles.container}>{children}</View>
    );

    function getData(docID = false, shortUUID = false) {

      let SCHEMAS_BY_ID;
      if(docID){
          SCHEMAS_BY_ID = gql`
            query GetSchema($id: ID!) {
              getSchema(id: $id) {
                name
                id
                category
                events {
                  event_name
                  event_image_url
                  rank
                  behaviours_available
                  challenges_available
                }
              }
            }
          `;
      }

      if(shortUUID){
        SCHEMAS_BY_ID = gql`
        query GetSchemasByShortUUID($shortUUID: String!) {
          getSchemasByShortUUID(shortuuid: $shortUUID) {
            name
            id
            category
            events {
              event_name
              event_image_url
              rank
              behaviours_available
              challenges_available
            }
          }
        }
      `;
      }
      const { data, loading, error } = useQuery(SCHEMAS_BY_ID, {
        variables: { id: docID, shortUUID: shortUUID},
      })

      if (loading) {
        return (
          <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
            <Text style={{ color: colors.loadingerrortext, fontSize: 20 }}>Loading from our online database</Text>
            <ActivityIndicator size="large"/>
          </View>
        )
      }

      if (error) {
         //return <Text>{ JSON.stringify(error) }</Text> // Useful for debugging errors
        return (
          <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
            <Text style={{ color: colors.loadingerrortext, fontSize: 20 }}>Error: { error.message }</Text>
            <ActivityIndicator size="large" />
          </View>
              )
      }
      
  
      const Item = ({ rank, event_name, event_image_url, challenges_available, behaviours_available }) => (
          <View style={styles.item}>
            <View style={{ flexDirection: "row"}}>
              <Image style={{ height: 180, width: 240 }} resizeMode='contain' aspectRatio={1.33} source={{ uri: `${event_image_url}` }}/>
              <View style={{ flexDirection: "column", marginLeft: 3}}>
              { (behaviours_available) ? <Button
                    mode="contained"
                    uppercase={false}
                    color={colors.eventbutton}
                    icon={({ size, color }) => (
                      <Image
                        source={require('../assets/images/nature-people.png')}
                        style={{ width: 32, height: 32, tintColor: "#0033cc" }}
                      />
                    )}
                    onPress={() => {
                      navigation.navigate('Schema Event', {
                            docID: (docID) ? docID : data.getSchemasByShortUUID[0].id,
                            event_name: event_name,
                            classType: classType
                        })}}>
                    <Text style={{fontSize: 10}}>Behaviours</Text>
                </Button> : null }
                { (challenges_available) ? <Button style={{marginTop: 10}}
                    mode="contained"
                    uppercase={false}
                    color={colors.eventbutton}
                    icon={({ size, color }) => (
                      <Image
                        source={require('../assets/images/challenges.png')}
                        style={{ width: 32, height: 32 }}
                      />
                    )}
                    onPress={() => {
                      navigation.navigate('Challenges', {
                            docID: (docID) ? docID : data.getSchemasByShortUUID[0].id,
                            event_name: event_name,
                            classType: classType
                        })}}>
                    <Text style={{fontSize: 10}}>Challenges</Text>
                </Button> : null }
              </View>
            </View>
            <View style={{ flexDirection: "row"}}>
              <View style={{ width: "10%"}}>
                <Pressable onPress={() => {
                  if(Speech.isSpeakingAsync()) {
                    Speech.speak(`${event_name}`);
                  }
                  }}>
                  <MaterialCommunityIcons name="text-to-speech" color="#1ddbc9" size={30}/>
                </Pressable>
              </View>
              <View style={{ width: "90%"}}>
                <Text style={styles.title}>{event_name}</Text>
              </View>
            </View>
          </View>
      );
    
      const renderItem = ({ item }) => (
        <Item rank={ item.rank } event_name={ item.event_name } event_image_url={ item.event_image_url } behaviours_available={ item.behaviours_available } challenges_available={ item.challenges_available } />
      );

      const _goBack = () => navigation.navigate({ name: 'Schemas', params: { classType: 'generic', category: (docID) ? data.getSchema.category : data.getSchemasByShortUUID[0].category} });
      const appBarContentTitle =(docID) ? data.getSchema.name : data.getSchemasByShortUUID[0].name
      const appBarContentSubTitle = 'Choose a situation to analyse.'



      return (
          <ScreenContainer>
            <Appbar.Header style={{ backgroundColor: colors.listbackground, marginTop: 0 }}>
              <Appbar.BackAction onPress={_goBack} />
              <Appbar.Content title={appBarContentTitle} subtitle={appBarContentSubTitle} />
            </Appbar.Header>
            <View style={{ width: '100%' }}>
              <FlatList
              persistentScrollbar={true}
              data={(docID) ? data.getSchema.events : data.getSchemasByShortUUID[0].events}
              renderItem={renderItem}
              keyExtractor={item => item.event_name}
              />
            </View>   
          </ScreenContainer>
      )        
  
    };

    let query = getData(docID, shortUUID);

    return (query);
};
  
export default SchemeEventsScreen;
