/*  Copyright 2022 Dev Mindset Community Interest Company
    This file is part of LibreSchemas Client.
    LibreSchemas Client is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
    LibreSchemas Client is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License along with LibreSchemas Server API for React. If not, see <https://www.gnu.org/licenses/>.
*/
import React from "react";
import { ActivityIndicator } from 'react-native';
import { View, Text, Image, StyleSheet, FlatList, Pressable } from "react-native";
import { useQuery, gql } from "@apollo/client";
import Hyperlink from 'react-native-hyperlink';
import { Appbar } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BehaviourType from '../../components/BehaviourType'
import * as Speech from 'expo-speech';

const ExpectedBehaviourScreen = ({navigation, route }) => {

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    item: {
      flexDirection: "column",
      backgroundColor: colors.itembackground,
      color: colors.text,
      borderColor: '#000000',
      borderWidth: 1,
      padding: 5,
      marginVertical: 5,
      marginHorizontal: 5,
    },
    event: {
      backgroundColor: colors.itembackground,
      borderColor: '#000000',
      borderWidth: 1,
      padding: 5,
      marginVertical: 5,
      marginHorizontal: 5,
      flexDirection: "column"
    },
      contentContainer: {
        paddingBottom: 100
    },     
    event_title: {
      fontSize: 26,
      alignSelf: 'center',
      color: colors.text,
      fontWeight: 'bold',
    },
    behaviourtype_heading: {
      fontSize: 16,
      alignSelf: 'center',
      color: colors.expectedbehaviour,
      fontWeight: 'bold',
    }
  });
  
  const ScreenContainer = ({ children }) => (
      <View style={styles.container}>{children}</View>
    );

  const Item = ({ rank, description, type }) => (
    <View style={styles.item}>      
      <View><Hyperlink linkDefault={ true } linkStyle={ { color: colors.hyperlinkColor } }><Text style={{color: colors.text}}>{rank}. {description}</Text></Hyperlink></View>
      <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
          <BehaviourType norm_type={{type}} />
        <View style={{ alignSelf: "flex-end" }}>
          <Pressable onPress={() => {
               if(Speech.isSpeakingAsync()) {
                Speech.speak(`${description}`);
               }
            }}>
            <MaterialCommunityIcons name="text-to-speech" color="#1ddbc9" size={22}/>
          </Pressable>
        </View>
      </View>
    </View>
);

const renderItem = ({ item }) => (
  <Item rank={ item.rank } description={ item.description } type={ item.type } />
);

const showEmptyListView = () => (
  <View style={styles.item}>
    <Text style={{color: colors.text}}>There are no Expected Behaviours to list here.</Text>
  </View>
);

  const { docID, event_name, classType } = route.params;
  const _goBack = () => { 
    navigation.navigate('Browse Schemas', {
      screen: 'Schema Events',
      params: { docID: docID, classType: classType },
    });
  };

  function getData(docID) {
    const SCHEMAS_BY_ID = gql`
      query GetSchema($id: ID!) {
        getSchema(id: $id) {
          name
          id
          category
          events {
            event_name
            event_image_url
            rank
            behaviours {
              type
              description
              rank
            }
          }
        }
      }
    `;
    const { data, loading, error } = useQuery(SCHEMAS_BY_ID, {
      variables: { id: docID },
    })
    if (loading) {
      return (
      <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
        <Text style={{ fontSize: 20 }}>Loading from our online database</Text>
        <ActivityIndicator size="large"/>
      </View>
      )
    }
    if (error) {
       //return <Text>{ JSON.stringify(error) }</Text> // Useful for debugging errors
      return (
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
          <Text style={{ fontSize: 20 }}>Error: { error.message }</Text>
          <ActivityIndicator size="large" />
        </View>
            )
    }

    const schemaEventsList = data.getSchema.events
    const targetEventResult = schemaEventsList.filter(function (event) {
      return event.event_name === event_name;
    });
    const targetEvent = targetEventResult[0]

    const behaviours = targetEvent.behaviours
    const unsortedExpectedBehaviours = behaviours.filter(function (behaviour) {
      switch(behaviour.type){
        case 'covid19_norm':
        case 'prescriptive_norm':
        case 'descriptive_norm':
        case 'injunctive_norm':
        case 'desired_norm':
        return true
      }
    });

    const sortedBehavioursByRank = unsortedExpectedBehaviours.sort((a, b) => (a.rank < b.rank ? -1 : 1))

    const appBarContentTitle = data.getSchema.name
    const appBarContentSubTitle = 'Expected Behaviours'

    const header = () => (
      <View style={styles.event}>
        <Image resizeMode='contain' aspectRatio={1.33} source={{ uri: `${targetEvent.event_image_url}` }}/>          
        <Text style={styles.event_title}>{event_name}</Text>
        <Text style={styles.behaviourtype_heading}>[ Expected Behaviour ]</Text>
        <View style={{ flexDirection: "row-reverse"}}>
          <Pressable onPress={() => {
                  if(Speech.isSpeakingAsync()) {
                      Speech.speak(`${event_name}. Expected Behaviour.`);
                  }
                }}>
                <MaterialCommunityIcons name="text-to-speech" color="#1ddbc9" size={22}/>
          </Pressable>
        </View>
    </View>
    );

    return (
      <ScreenContainer>
          <Appbar.Header style={{ backgroundColor: colors.listbackground, marginTop: 0 }}>
            <Appbar.BackAction onPress={_goBack} />
            <Appbar.Content title={appBarContentTitle} subtitle={appBarContentSubTitle} />
          </Appbar.Header>
        <View style={{ flex: 1, width: '100%' }}>

             <FlatList
                ListHeaderComponent={header}
                persistentScrollbar={true}
                data={sortedBehavioursByRank}
                renderItem={renderItem}
                keyExtractor={item => item.rank.toString()} // Key not important here.
                ListEmptyComponent={showEmptyListView}
             />
        </View>  
      </ScreenContainer>
    )        

  };

  let query = getData(docID);
  return (query);
};


  
export default ExpectedBehaviourScreen;
