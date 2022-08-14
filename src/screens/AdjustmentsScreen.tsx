/*  Copyright 2022 Dev Mindset Community Interest Company
    This file is part of LibreSchemas Client.
    LibreSchemas Client is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
    LibreSchemas Client is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License along with LibreSchemas Server API for React. If not, see <https://www.gnu.org/licenses/>.
*/

import React from "react";
import { ActivityIndicator } from 'react-native';
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from "react-native";
import { useQuery, gql } from "@apollo/client";
import { Appbar, List } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import * as Speech from 'expo-speech';


const AdjustmentsScreen = ({navigation, route }) => {

    const { colors, dark } = useTheme();

    const ScreenContainer = ({ children }) => (
        <View style={styles.container}>{children}</View>
    );

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background
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
        event_title: {
            fontSize: 20,
            color: colors.text,
            fontWeight: 'bold',
        },
      });

      const Sensory = ({ adjustments }) => {
        const image_adjustments_sensory = require('../assets/images/adjustments_sensory.png')

        return (
          <List.Accordion
            title="Sensory"
            left={props => <Image source={image_adjustments_sensory} style={{ width: 100, height: 100 }}  />}
            titleStyle={{ color: colors.text }}>
            {
              (adjustments.length > 0) ?
              adjustments.map(adjustment => {

                return (
                  <View style={{ flexDirection: "column", width: "100%", backgroundColor: colors.itembackground }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold", color: colors.text }}>{adjustment.rank}. </Text>
                      <Text style={{ color: colors.text }}>{adjustment.description}</Text>
                    </View>
                    <View style={{ alignSelf: "flex-end" }}>
                          <Pressable onPress={() => {
                                  if(Speech.isSpeakingAsync()) {
                                    Speech.speak(`${adjustment.description}.`);
                                  }
                                }}>
                                <MaterialCommunityIcons name="text-to-speech" color="#1ddbc9" size={22}/>
                                {/* <MaterialCommunityIcons key={uuid()} name="text-to-speech" color="#1ddbc9" size={22}/> */}
                          </Pressable>
                    </View>
                  </View>
                )
              }) : (
                  <View style={{ flexDirection: "row" }}>
                    <Text>There are no adjustments under this group available.</Text>
                  </View>
                )
            }
          </List.Accordion>  
        )
    };
    
    const Communication = ({ adjustments }) => {
        const image_adjustments_communication = require('../assets/images/adjustments_communication.png')

        return (
          <List.Accordion
            title="Communication"
            left={props => <Image source={image_adjustments_communication} style={{ width: 100, height: 100 }}  />}
            titleStyle={{ color: colors.text }}>
            {
              (adjustments.length > 0) ?
              adjustments.map(adjustment => {

                return (
                  <View style={{ flexDirection: "column", width: "100%", backgroundColor: colors.itembackground }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold", color: colors.text }}>{adjustment.rank}. </Text>
                      <Text style={{ color: colors.text }}>{adjustment.description}</Text>
                    </View>
                    <View style={{ alignSelf: "flex-end" }}>
                          <Pressable onPress={() => {
                                  if(Speech.isSpeakingAsync()) {
                                    Speech.speak(`${adjustment.description}.`);
                                  }
                                }}>
                                <MaterialCommunityIcons name="text-to-speech" color="#1ddbc9" size={22}/>
                                {/* <MaterialCommunityIcons key={uuid()} name="text-to-speech" color="#1ddbc9" size={22}/> */}
                          </Pressable>
                    </View>
                  </View>
                )
              }) : (
                  <View style={{ flexDirection: "row" }}>
                    <Text>There are no adjustments under this group available.</Text>
                  </View>
                )
            }
          </List.Accordion>  
        )
    };

    const SocialInteraction = ({ adjustments }) => {
        const image_adjustments_social_interaction = require('../assets/images/adjustments_social_interaction.png')

        return (
          <List.Accordion
            title="Social Interaction"
            left={props => <Image source={image_adjustments_social_interaction} style={{ width: 100, height: 100 }}  />}
            titleStyle={{ color: colors.text }}>
            {
              (adjustments.length > 0) ?
              adjustments.map(adjustment => {

                return (
                  <View style={{ flexDirection: "column", width: "100%", backgroundColor: colors.itembackground }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold", color: colors.text }}>{adjustment.rank}. </Text>
                      <Text style={{ color: colors.text }}>{adjustment.description}</Text>
                    </View>
                    <View style={{ alignSelf: "flex-end" }}>
                          <Pressable onPress={() => {
                                  if(Speech.isSpeakingAsync()) {
                                    Speech.speak(`${adjustment.description}.`);
                                  }
                                }}>
                                <MaterialCommunityIcons name="text-to-speech" color="#1ddbc9" size={22}/>
                                {/* <MaterialCommunityIcons key={uuid()} name="text-to-speech" color="#1ddbc9" size={22}/> */}
                          </Pressable>
                    </View>
                  </View>
                )
              }) : (
                  <View style={{ flexDirection: "row" }}>
                    <Text>There are no adjustments under this group available.</Text>
                  </View>
                )
            }
          </List.Accordion>  
        )
    };

    const UnderstandingCompassion = ({ adjustments }) => {
        const image_understanding_compassion = require('../assets/images/adjustments_understanding_compassion.png')

        return (
          <List.Accordion
            title="Understanding and Compassion"
            titleNumberOfLines={2}
            left={props => <Image source={image_understanding_compassion} style={{ width: 100, height: 100 }}  />}
            titleStyle={{ color: colors.text }}>
            {
              (adjustments.length > 0) ?
              adjustments.map(adjustment => {

                return (
                  <View style={{ flexDirection: "column", width: "100%", backgroundColor: colors.itembackground }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold", color: colors.text }}>{adjustment.rank}. </Text>
                      <Text style={{ color: colors.text }}>{adjustment.description}</Text>
                    </View>
                    <View style={{ alignSelf: "flex-end" }}>
                          <Pressable onPress={() => {
                                  if(Speech.isSpeakingAsync()) {
                                    Speech.speak(`${adjustment.description}.`);
                                  }
                                }}>
                                <MaterialCommunityIcons name="text-to-speech" color="#1ddbc9" size={22}/>
                                {/* <MaterialCommunityIcons key={uuid()} name="text-to-speech" color="#1ddbc9" size={22}/> */}
                          </Pressable>
                    </View>
                  </View>
                )
              }) : (
                  <View style={{ flexDirection: "row" }}>
                    <Text>There are no adjustments under this group available.</Text>
                  </View>
                )
            }
          </List.Accordion>  
        )
    };

    const MeltdownsShutdowns = ({ adjustments }) => {
        const image_adjustments_meltdowns_shutdowns = require('../assets/images/adjustments_meltdowns_shutdowns.png')

        return (
          <List.Accordion
            title="Meltdowns and Shutdowns"
            titleNumberOfLines={2}
            left={props => <Image source={image_adjustments_meltdowns_shutdowns} style={{ width: 100, height: 100 }}  />}
            titleStyle={{ color: colors.text }}>
            {
              (adjustments.length > 0) ?
              adjustments.map(adjustment => {

                return (
                  <View style={{ flexDirection: "column", width: "100%", backgroundColor: colors.itembackground }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold", color: colors.text }}>{adjustment.rank}. </Text>
                      <Text style={{ color: colors.text }}>{adjustment.description}</Text>
                    </View>
                    <View style={{ alignSelf: "flex-end" }}>
                          <Pressable onPress={() => {
                                  if(Speech.isSpeakingAsync()) {
                                    Speech.speak(`${adjustment.description}.`);
                                  }
                                }}>
                                <MaterialCommunityIcons name="text-to-speech" color="#1ddbc9" size={22}/>
                                {/* <MaterialCommunityIcons key={uuid()} name="text-to-speech" color="#1ddbc9" size={22}/> */}
                          </Pressable>
                    </View>
                  </View>
                )
              }) : (
                  <View style={{ flexDirection: "row" }}>
                    <Text>There are no adjustments under this group available.</Text>
                  </View>
                )
            }
          </List.Accordion>  
        )
    };

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
                adjustments {
                  adjustment_type
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

        // Sort the adjustments into groups and in order
        const adjustments = targetEvent.adjustments
        const unsortedSensory = adjustments.filter(function (adjustment) {
                switch(adjustment.adjustment_type){
                case 'sensory':
                return true
                }
        });
        const sortedSensory = unsortedSensory.sort((a, b) => (a.rank < b.rank ? -1 : 1))

        const unsortedCommunication = adjustments.filter(function (adjustment) {
            switch(adjustment.adjustment_type){
            case 'communication':
            return true
            }
        });
        const sortedCommunication = unsortedCommunication.sort((a, b) => (a.rank < b.rank ? -1 : 1))

        const unsortedSocial_interaction = adjustments.filter(function (adjustment) {
            switch(adjustment.adjustment_type){
            case 'social_interaction':
            return true
            }
        });
        const sortedSocial_interaction = unsortedSocial_interaction.sort((a, b) => (a.rank < b.rank ? -1 : 1))

        const unsortedUnderstanding_compassion = adjustments.filter(function (adjustment) {
            switch(adjustment.adjustment_type){
            case 'understanding_compassion':
            return true
            }
        });
        const sortedUnderstanding_compassion = unsortedUnderstanding_compassion.sort((a, b) => (a.rank < b.rank ? -1 : 1))

        const unsortedMeltdowns_shutdowns = adjustments.filter(function (adjustment) {
            switch(adjustment.adjustment_type){
            case 'meltdowns_shutdowns':
            return true
            }
        });
        const sortedMeltdowns_shutdowns = unsortedMeltdowns_shutdowns.sort((a, b) => (a.rank < b.rank ? -1 : 1))

        const appBarContentTitle = data.getSchema.name + ': ' + targetEvent.event_name
        //const appBarContentTitle = "TEST"
        const appBarContentSubTitle = 'Adjustments'

    return (
        <ScreenContainer>
            <Appbar.Header style={{ backgroundColor: colors.listbackground, marginTop: 0 }}>
              <Appbar.BackAction onPress={_goBack} />
              <Appbar.Content titleStyle={{ fontSize: 16 }} title={appBarContentTitle} subtitle={appBarContentSubTitle} />
            </Appbar.Header>
          <ScrollView>
            <View style={{ flex: 1, width: '100%' }}>
            <View style={{ flexDirection: "column", marginLeft: 10, marginRight: 20, marginBottom: 20, }}>
              <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10, backgroundColor: colors.background }}>
                <Image style={{ height: 90, width: 120 }} resizeMode='contain' aspectRatio={1.33} source={{ uri: `${targetEvent.event_image_url}` }}/>
              </View>
              <View style={{ flexDirection: "row", justifyContent: 'center', backgroundColor: colors.itembackground }}>
                  <Text style={styles.event_title}>{event_name}</Text>
              </View>
              <Text style={{ fontSize: 16, fontWeight: "bold", backgroundColor: colors.itembackground, color: colors.text }}>Adjustments</Text>
              <Text style={{ backgroundColor: colors.itembackground, color: colors.text }}>Things we can do to accomodate Autistic people and make the environment more friendly.</Text>
                <View style={{ alignItems: 'flex-end', backgroundColor: colors.itembackground }}>
                <Pressable onPress={() => {
                                  if(Speech.isSpeakingAsync()) {
                                    Speech.speak(`${event_name}. Adjustments. Things we can do to accomodate Autistic people and make the enviroment more friendly.`);
                                  }
                            }}>
                            <MaterialCommunityIcons name="text-to-speech" color="#1ddbc9" size={25}/>
                </Pressable>
              </View>
                <Sensory adjustments={sortedSensory}/>
                <Communication adjustments={sortedCommunication}/>
                <SocialInteraction adjustments={sortedSocial_interaction}/>
                <UnderstandingCompassion adjustments={sortedUnderstanding_compassion}/>
                <MeltdownsShutdowns adjustments={sortedMeltdowns_shutdowns}/>
            </View>
            </View >
            </ScrollView>
        </ScreenContainer>
      )
    };       

    let query = getData(docID);
    return (query);
};

export default AdjustmentsScreen;