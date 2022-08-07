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
import CommunicationStyleType from '../components/CommunicationStyleType'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import * as Speech from 'expo-speech';

const ResolutionScreen = ({navigation, route }) => {

    const { colors, dark } = useTheme();
    
    const ScreenContainer = ({ children }) => (
        <View style={styles.container}>{children}</View>
    );

    const { docID, event_name, challenge_rank, classType } = route.params;
    const _goBack = () => { 
      navigation.navigate('Browse Schemas', {
        screen: 'Challenges',
        params: { docID: docID, event_name: event_name, challenge_rank: challenge_rank, classType: classType },
      });
    };

    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.background
      },  
      event_title: {
        fontSize: 26,
        color: colors.text,
        fontWeight: 'bold',
      },
    });

    const CompeteTactics = ({ tactics }) => {
        const image_resolution_compete = require('../assets/images/resolution_compete.png')

        return (
          <List.Accordion
            title="Compete"
            left={props => <Image source={image_resolution_compete} style={{ width: 100, height: 100 }}  />}
            titleStyle={{ color: colors.text }}>
            {
              (tactics.length > 0) ?
              tactics.map(tactic => {

                let communication_style_types = [];
                if(tactic.communication_styles){
                  communication_style_types = tactic.communication_styles.map(communication_style => {
                    return (
                      <CommunicationStyleType key={`COMP${tactic.rank}-${communication_style.communication_style_type}`} communication_style_type={communication_style.communication_style_type} communication_style_presentation={communication_style.communication_style_presentation} />
                     )
                  })
                }

                return (
                  <View style={{ flexDirection: "column", width: "100%", backgroundColor: colors.itembackground }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold", color: colors.text }}>{tactic.rank}. </Text>
                      <Text style={{ color: colors.text }}>{tactic.description}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      {communication_style_types}
                    </View>
                    <View style={{ alignSelf: "flex-end" }}>
                          <Pressable onPress={() => {
                                  if(Speech.isSpeakingAsync()) {
                                    Speech.speak(`${tactic.description}.`);
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
                    <Text>There are no tactics under this group available.</Text>
                  </View>
                )
            }
          </List.Accordion>  
        )
    };

    const CooperateTactics = ({ tactics }) => {
      const image_resolution_cooperate = require('../assets/images/resolution_cooperate.png')

      return (
        <List.Accordion
          title="Cooperate"
          left={props => <Image source={image_resolution_cooperate} style={{ width: 100, height: 100 }} />}
          titleStyle={{ color: colors.text }}>
            {
              (tactics.length > 0) ?
              tactics.map(tactic => {

                let communication_style_types = [];
                if(tactic.communication_styles){
                  communication_style_types = tactic.communication_styles.map(communication_style => {
                    return (
                      <CommunicationStyleType key={`COOP${tactic.rank}-${communication_style.communication_style_type}`} communication_style_type={communication_style.communication_style_type} communication_style_presentation={communication_style.communication_style_presentation} />
                     )
                  })
                }

                return (
                  <View style={{ flexDirection: "column", width: "100%", backgroundColor: colors.itembackground }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold", color: colors.text }}>{tactic.rank}. </Text>
                      <Text style={{ color: colors.text }}>{tactic.description}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      {communication_style_types}
                    </View>
                    <View style={{ alignSelf: "flex-end" }}>
                          <Pressable onPress={() => {
                                  if(Speech.isSpeakingAsync()) {
                                    Speech.speak(`${tactic.description}.`);
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
                    <Text>There are no tactics under this group available.</Text>
                  </View>
                )
            }
          </List.Accordion>  
      )
  };

  const NegotiateTactics = ({ tactics }) => {

    const image_resolution_negotiate = require('../assets/images/resolution_negotiate.png')

    return (
      <List.Accordion
        title="Negotiate"
        left={props => <Image source={image_resolution_negotiate} style={{ width: 100, height: 100 }} />}
        titleStyle={{ color: colors.text }}>
            {
              (tactics.length > 0) ?
              tactics.map(tactic => {

                let communication_style_types = [];
                if(tactic.communication_styles){
                  communication_style_types = tactic.communication_styles.map(communication_style => {
                    return (
                      <CommunicationStyleType key={`NEG${tactic.rank}-${communication_style.communication_style_type}`} communication_style_type={communication_style.communication_style_type} communication_style_presentation={communication_style.communication_style_presentation} />
                     )
                  })
                }

                return (
                  <View style={{ flexDirection: "column", width: "100%", backgroundColor: colors.itembackground }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold", color: colors.text }}>{tactic.rank}. </Text>
                      <Text style={{ color: colors.text }}>{tactic.description}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      {communication_style_types}
                    </View>
                    <View style={{ alignSelf: "flex-end" }}>
                          <Pressable onPress={() => {
                                  if(Speech.isSpeakingAsync()) {
                                    Speech.speak(`${tactic.description}.`);
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
                    <Text>There are no tactics under this group available.</Text>
                  </View>
                )
            }
          </List.Accordion>  
    )
  };

  const WithdrawTactics = ({ tactics }) => {

    const image_resolution_withdraw = require('../assets/images/resolution_withdraw.png')

    return (
      <List.Accordion
        title="Withdraw"
        left={props => <Image source={image_resolution_withdraw} style={{ width: 100, height: 100 }} />}
        titleStyle={{ color: colors.text }}>
            {
              (tactics.length > 0) ?
              tactics.map(tactic => {

                let communication_style_types = [];
                if(tactic.communication_styles){
                  communication_style_types = tactic.communication_styles.map(communication_style => {
                    return (
                      <CommunicationStyleType key={`WITH${tactic.rank}-${communication_style.communication_style_type}`} communication_style_type={communication_style.communication_style_type} communication_style_presentation={communication_style.communication_style_presentation} />
                     )
                  })
                }

                return (
                  <View style={{ flexDirection: "column", width: "100%" }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold", color: colors.text }}>{tactic.rank}. </Text>
                      <Text style={{ color: colors.text }}>{tactic.description}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      {communication_style_types}
                    </View>
                    <View style={{ alignSelf: "flex-end" }}>
                          <Pressable onPress={() => {
                                  if(Speech.isSpeakingAsync()) {
                                    Speech.speak(`${tactic.description}.`);
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
                    <Text>There are no tactics under this group available.</Text>
                  </View>
                )
            }
          </List.Accordion>  
    )
  };

  const ReconcileTactics = ({ tactics }) => {

    const image_resolution_reconcile = require('../assets/images/resolution_reconcile.png')

    return (
      <List.Accordion
        title="Reconcile"
        left={props => <Image source={image_resolution_reconcile} style={{ width: 100, height: 100 }} />}
        titleStyle={{ color: colors.text }}>
            {
              (tactics.length > 0) ?
              tactics.map(tactic => {

                let communication_style_types = [];
                if(tactic.communication_styles){
                  communication_style_types = tactic.communication_styles.map(communication_style => {
                    return (
                      <CommunicationStyleType key={`Rec${tactic.rank}-${communication_style.communication_style_type}`} communication_style_type={communication_style.communication_style_type} communication_style_presentation={communication_style.communication_style_presentation} />
                     )
                  })
                }

                return (
                  <View style={{ flexDirection: "column", width: "100%", backgroundColor: colors.itembackground }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold", color: colors.text }}>{tactic.rank}. </Text>
                      <Text style={{ color: colors.text }}>{tactic.description}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      {communication_style_types}
                    </View>
                    <View style={{ alignSelf: "flex-end" }}>
                          <Pressable onPress={() => {
                                  if(Speech.isSpeakingAsync()) {
                                    Speech.speak(`${tactic.description}.`);
                                  }
                                }}>
                                {/* <MaterialCommunityIcons key={uuid()} name="text-to-speech" color="#1ddbc9" size={22}/> */}
                                <MaterialCommunityIcons name="text-to-speech" color="#1ddbc9" size={22}/>
                          </Pressable>
                    </View>
                  </View>
                )
              }) : (
                  <View style={{ flexDirection: "row" }}>
                    <Text>There are no tactics under this group available.</Text>
                  </View>
                )
            }
          </List.Accordion>    
    )
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
                challenges {
                  description
                  conflict_types {
                      conflict_type_label
                      conflict_type_explainer
                  }
                  rank
                  tactics {
                    tactic_type
                    description
                    rank
                    communication_styles {
                      communication_style_type
                      communication_style_presentation
                    }
                  }
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
    
        const unsortedChallenges = targetEvent.challenges

        const targetChallenge = unsortedChallenges.filter(function (challenge) {
          return challenge.rank == challenge_rank
        });

        const challenge = targetChallenge[0];
    
        const appBarContentTitle = data.getSchema.name + ': ' + targetEvent.event_name
        const appBarContentSubTitle = 'Potential Resolution Tactics'

      // Sort the tactics into groups and in order
      const tactics = challenge.tactics
      const unsortedCompeteTactics = tactics.filter(function (tactic) {
            switch(tactic.tactic_type){
              case 'compete':
              return true
            }
      });
      const sortedCompeteTactics = unsortedCompeteTactics.sort((a, b) => (a.rank < b.rank ? -1 : 1))
      const unsortedCooperateTactics = tactics.filter(function (tactic) {
        switch(tactic.tactic_type){
          case 'cooperate':
          return true
        }
      });
      const sortedCooperateTactics = unsortedCooperateTactics.sort((a, b) => (a.rank < b.rank ? -1 : 1))
      const unsortedNegotiateTactics = tactics.filter(function (tactic) {
        switch(tactic.tactic_type){
          case 'negotiate':
          return true
        }
      });
      const sortedNegotiateTactics = unsortedNegotiateTactics.sort((a, b) => (a.rank < b.rank ? -1 : 1))
      const unsortedWithdrawTactics = tactics.filter(function (tactic) {
        switch(tactic.tactic_type){
          case 'withdraw':
          return true
        }
      });
      const sortedWithdrawTactics = unsortedWithdrawTactics.sort((a, b) => (a.rank < b.rank ? -1 : 1))
      const unsortedReconcileTactics = tactics.filter(function (tactic) {
        switch(tactic.tactic_type){
          case 'reconcile':
          return true
        }
      });
      const sortedReconcileTactics = unsortedReconcileTactics.sort((a, b) => (a.rank < b.rank ? -1 : 1))

    
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
              <Text style={{ fontSize: 16, fontWeight: "bold", backgroundColor: colors.itembackground, color: colors.text }}>Challenge:</Text>
                <Text style={{backgroundColor: colors.itembackground, color: colors.text }}>{ challenge.description }</Text>
                <View style={{ alignItems: 'flex-end', backgroundColor: colors.itembackground }}>
                <Pressable onPress={() => {
                                  if(Speech.isSpeakingAsync()) {
                                    Speech.speak(`${challenge.description}.`);
                                  }
                            }}>
                            <MaterialCommunityIcons name="text-to-speech" color="#1ddbc9" size={25}/>
                </Pressable>
              </View>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.text}}>Potential Resolution Tactics</Text>
                    <CompeteTactics tactics={sortedCompeteTactics}/>
                    <CooperateTactics tactics={sortedCooperateTactics}/>
                    <NegotiateTactics tactics={sortedNegotiateTactics}/>
                    <WithdrawTactics tactics={sortedWithdrawTactics}/>
                    <ReconcileTactics tactics={sortedReconcileTactics}/>
            </View>
            </View >
            </ScrollView>
          </ScreenContainer>
        )       
    
      };    

      let query = getData(docID);
      return (query);
};

export default ResolutionScreen;