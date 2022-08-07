/*  Copyright 2022 Dev Mindset Community Interest Company
    This file is part of LibreSchemas Client.
    LibreSchemas Client is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
    LibreSchemas Client is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License along with LibreSchemas Server API for React. If not, see <https://www.gnu.org/licenses/>.
*/
import React from "react";
import { ActivityIndicator } from 'react-native';
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useQuery, gql } from "@apollo/client";
import { Appbar, List } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Speech from 'expo-speech';

  const SchemaCategoriesScreen = ({ navigation, route }) => {
    const { colors } = useTheme();
    const classType = 'generic';

    const styles = StyleSheet.create({
      item: {
        padding: 10,
        marginVertical: 15,
        marginHorizontal: 16,
        backgroundColor: colors.listbackground
      },
      title: {
        fontSize: 32,
      },
    });  

      const _goBack = () => { navigation.navigate('Schema Class') };

      const Item = ({ title, description, icon }) => (
        <Pressable onPress={() => {
          navigation.navigate('Schemas', {
              category: `${title}`
            });
        }}>
        <List.Item
          title={title} titleStyle={{color: colors.listheadertext, fontWeight: "bold"}}
          description={description} descriptionStyle={{color:'#ffffff'}}
          left={props => <List.Icon color="#ffffff" icon={icon} />}
          style={styles.item}
          right={ props => 
            <Pressable onPress={() => {
                if(Speech.isSpeakingAsync()) {
                  Speech.speak(`${title}. ${description}`);
                }
              }}>
              <MaterialCommunityIcons name="text-to-speech" color="#1ddbc9" size={22}/>
            </Pressable>
          }
        />
        </Pressable>
      );

      const renderItem = ({ item }) => (
        <Item title={item.category} description={item.description} icon={item.icon} />
      );

      function getData() {
        const SCHEMAS_CATEGORIES = gql`
          query GetMetaData($idno: ID!) {
            getMetaData(id: $idno) {
              generic_categories {
                category
                description
                icon
                rank
              }
            }
          }
        `;
        const { data, loading, error } = useQuery(SCHEMAS_CATEGORIES, {
          variables: { idno: "61b210d9dcb7707ae0d1b021" },
        })
        if (loading) {
          return <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
                  <Text style={{ color: colors.loadingerrortext, fontSize: 20 }}>Loading from our online database</Text>
                  <ActivityIndicator size="large"/>
                </View>
        }
        if (error) {
          return <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
                  <Text style={{ color: colors.loadingerrortext, fontSize: 20 }}>Error: { error.message }</Text>
                  <Text>{ JSON.stringify(error) }</Text>
                  <ActivityIndicator size="large" />
                </View>
        }

        return (
          <FlatList
          persistentScrollbar={true}
          data={data.getMetaData.generic_categories}
          renderItem={renderItem}
          keyExtractor={item => item.category}/>
        )        

      };
        let query = getData();
        return (
          <View style={{  flex: 1, width: '100%', backgroundColor: colors.background }}>
            <Appbar.Header style={{ backgroundColor: colors.listbackground, marginTop: 0 }}>
              <Appbar.BackAction onPress={_goBack} />
              <Appbar.Content title="Generic Schema Categories" subtitle="Choose a schema category." />
            </Appbar.Header>
            {query}
          </View>
        );

};

  
export default SchemaCategoriesScreen
