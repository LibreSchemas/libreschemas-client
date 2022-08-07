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
import ConflictType from '../components/ConflictType'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Speech from 'expo-speech';
import { useTheme } from 'react-native-paper';

const ChallengesScreen = ({navigation, route }) => {

  const { colors, dark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    item: {
      flexDirection: "row",
      backgroundColor: colors.itembackground,
      borderColor: '#000000',
      color: colors.text,
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
      fontSize: 20,
  
      color: colors.text,
      fontWeight: 'bold',
    },
    behaviourtype_heading: {
      fontSize: 22,
      alignSelf: 'center',
      color: colors.text,
      fontWeight: 'bold',
    }
  });

  let image_pseudo_conflict = require('../assets/images/pseudo_conflict.png')
  let image_ego_conflict = require('../assets/images/ego_conflict.png')
  let image_value_conflict = require('../assets/images/value_conflict.png')
  let image_policy_conflict = require('../assets/images/policy_conflict.png')
  let image_meta_conflict = require('../assets/images/meta_conflict.png')
  let image_fact_conflict = require('../assets/images/fact_conflict.png')
  let tactics = require('../assets/images/tactics.png')

  if(dark) {
    image_pseudo_conflict = require('../assets/images/pseudo_conflict_dark.png')
    image_fact_conflict = require('../assets/images/fact_conflict_dark.png')
    tactics = require('../assets/images/tactics_dark.png')
  }

  const { docID, event_name, classType } = route.params;
  const _goBack = () => { 
    navigation.navigate('Browse Schemas', {
      screen: 'Schema Events',
      params: { docID: docID, classType: classType },
    });
  };
    
  const ScreenContainer = ({ children }) => (
      <View style={styles.container}>{children}</View>
    );

  //


const renderItem = ({ item }) => {
  let conflict_types = [];
  if( item.conflict_types) {
    conflict_types = item.conflict_types.map(conflict_type => {
             return (
              <ConflictType key={`${item.challenge_rank}-${conflict_type.conflict_type_label}`} conflict_type_label={conflict_type.conflict_type_label} conflict_type_explainer={conflict_type.conflict_type_explainer} />
             )
    })
  } 

  return (
    <View style={styles.item}>
      <View style={{ width: "80%" }}> 
        <View><Hyperlink linkDefault={ true } linkStyle={ { color: '#2980b9' } }><Text style={{color: colors.text}}>{item.rank}. {item.description}</Text></Hyperlink></View>
        <View style={{ flexDirection: "row" }}>
          {conflict_types}
        </View>
      </View>
      <View style={{ alignItems: "center", width: "20%", flexDirection: "column", justifyContent: "space-between" }}>
        <View style={{ alignItems: "center" }}>
              <Pressable onPress={() => {
                      navigation.navigate('Browse Schemas', {
                        screen: 'Resolutions',
                        params: { docID: docID, event_name: event_name, challenge_rank: item.rank, classType: classType },
                      });
                    }}>
                    <Image source={tactics} style={{ width: 50, height: 50 }} />
              </Pressable>

          <Text style={{ color: colors.text, fontSize: 12 }}>Resolutions</Text>
        </View>
        <View style={{ alignSelf: "flex-end" }}>
          <Pressable onPress={() => {
                if(Speech.isSpeakingAsync()) {
                  Speech.speak(`${item.description}. Press a Conflict Type icon to help understand why this may have happened.`);
                }
                }}>
                <MaterialCommunityIcons name="text-to-speech" color="#1ddbc9" size={22}/>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const showEmptyListView = () => (
  <View style={styles.item}>
    <Text>There are no Challenges to list here.</Text>
  </View>
);

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
            challenges {
              description
              conflict_types {
                  conflict_type_label
                  conflict_type_explainer
              }
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

    const schemaEventsList = data.getSchema.events
    const targetEventResult = schemaEventsList.filter(function (event) {
      return event.event_name === event_name;
    });
    const targetEvent = targetEventResult[0]

    const challenges = targetEvent.challenges
    const unsortedChallenges = challenges.filter(function (challenge) {
        return true
    });

    const sortedChallenges = unsortedChallenges.sort(function (a, b) {
      return a.rank - b.rank;
    });

    const appBarContentTitle = data.getSchema.name + ': ' + targetEvent.event_name
    const appBarContentSubTitle = 'Potential Challenges'



    const header = () => (
      <View style={styles.event}>
        <View style={{ flexDirection: "column"}}>
        <View style={{ flexDirection: "row", justifyContent: 'center' }}>
            <Text style={styles.event_title}>{event_name}</Text>
              <Pressable onPress={() => {
                    if(Speech.isSpeakingAsync()) {
                      Speech.speak(`Challenges. ${event_name}.`);
                    }
                    }}>
                    <MaterialCommunityIcons name="text-to-speech" color="#1ddbc9" size={25}/>
              </Pressable>
          </View>
        <View style={{ flexDirection: "row", justifyContent: "center"}}>
          <Image style={{ height: 180, width: 240 }} resizeMode='contain' aspectRatio={1.33} source={{ uri: `${targetEvent.event_image_url}` }}/>
        </View>
        <View
                style={{
                  marginBottom: 2
                }}
              />
          <View style={{ flexDirection: "column", alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ fontWeight: "bold", textDecorationLine: "underline", color: colors.text }}>Potential Conflict Types</Text>
            <Text style={{ color: colors.text }}>Press for each challenge below to learn more.</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-evenly'}}>
            <View style={{ flexDirection: "column"}}>
              <Image source={image_pseudo_conflict}
                            style={{ width: 50, height: 50 }}
                        />
              <Text style={{ color: colors.text, fontSize: 12 }}>Pseudo</Text>
            </View>
            <View style={{ flexDirection: "column", alignItems: 'center', justifyContent: 'center'}}>
                      <Image source={image_fact_conflict}
                          style={{ width: 50, height: 50 }}
                      />
                      <Text style={{ color: colors.text, fontSize: 12 }}>Factual</Text>
            </View>
            <View style={{ flexDirection: "column", alignItems: 'center', justifyContent: 'center'}}>
                      <Image source={image_value_conflict}
                          style={{ width: 50, height: 50 }}
                      />
                      <Text style={{ color: colors.text, fontSize: 12 }}>Value</Text>
            </View>
            <View style={{ flexDirection: "column", alignItems: 'center', justifyContent: 'center'}}>
                      <Image source={image_policy_conflict}
                          style={{ width: 70, height: 50 }}
                      />
                      <Text style={{ color: colors.text, fontSize: 12 }}>Policy</Text>
            </View>
            <View style={{ flexDirection: "column", alignItems: 'center', justifyContent: 'center'}}>
                      <Image source={image_ego_conflict}
                          style={{ width: 50, height: 50 }}
                      />
                      <Text style={{ color: colors.text, fontSize: 12 }}>Ego</Text>
            </View>
            <View style={{ flexDirection: "column", alignItems: 'center', justifyContent: 'center'}}>
                      <Image source={image_meta_conflict}
                          style={{ width: 50, height: 50 }}
                      />
                      <Text style={{ color: colors.text, fontSize: 12 }}>Meta</Text>
            </View>
          </View>
        </View>
    </View>
    );

    return (
      <ScreenContainer>
          <Appbar.Header style={{ backgroundColor: colors.listbackground, marginTop: 0 }}>
            <Appbar.BackAction onPress={_goBack} />
            <Appbar.Content titleStyle={{ fontSize: 16 }} title={appBarContentTitle} subtitle={appBarContentSubTitle} />
          </Appbar.Header>
        <View style={{ flex: 1, width: '100%' }}>

             <FlatList
                ListHeaderComponent={header}
                persistentScrollbar={true}
                data={sortedChallenges}
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
  
export default ChallengesScreen;
