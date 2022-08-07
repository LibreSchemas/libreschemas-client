/*  Copyright 2022 Dev Mindset Community Interest Company
    This file is part of LibreSchemas Client.
    LibreSchemas Client is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
    LibreSchemas Client is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License along with LibreSchemas Server API for React. If not, see <https://www.gnu.org/licenses/>.
*/
import React, { useState, useRef } from "react";
import { View, Text, Image, StyleSheet, FlatList, Pressable, ActivityIndicator, Modal} from "react-native";
import { Appbar } from 'react-native-paper';
import { useQuery, gql } from "@apollo/client";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Speech from 'expo-speech';
import { useTheme } from 'react-native-paper';

const BrowseSchemasScreen = ({navigation, route }) => {

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
      padding: 3,
      marginVertical: 3,
      marginHorizontal: 5,
    },
      contentContainer: {
        paddingBottom: 100
    },
    itembar_left: {
      width: "50%",
      alignItems: 'flex-start',
    },
    flag: {
      width: 57,
      height: 30,
      marginRight: 1,
      marginTop: 1
    },
    itembar_right: {
      marginTop: 5,
      width: "30%",
      alignItems: 'flex-end',
      flexDirection: "column",
      flexWrap: "wrap",
    },
    itembar_right_top_row: {
      flexDirection: "row",
      width: "100%",
    },
    itembar_right_btm_row: {
      flexDirection: "row",
      width: "100%",
    },
    itembar: {
      width: "100%",
      flexDirection: "row"
    },
    bottombar: {
      flexDirection: "row",
    },
    title: {
      fontSize: 20,
      color: colors.text,
      fontWeight: 'bold',
    }  
  });  

  const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
  );

  const isMountedVal = useRef(1);

  const { category } = route.params;

  const classType = 'generic'

  const Flags = (countryCodes) => {
    const flag_UnitedKingdom = (countryCodes.countryCodes.find((country) => country === 'GBR')) != undefined ? <Image resizeMode="contain" style={styles.flag} source={ require('../assets/images/GBR.png') } /> : <Image resizeMode="contain" style={styles.flag} source={ require('../assets/images/GBR-gs.png') } />
    const flag_Australia = (countryCodes.countryCodes.find((country) => country === 'AUS')) != undefined ? <Image resizeMode="contain" style={styles.flag} source={ require('../assets/images/AUS.png') } /> : <Image resizeMode="contain" style={styles.flag} source={ require('../assets/images/AUS-gs.png') } />
    const flag_NewZealand = (countryCodes.countryCodes.find((country) => country === 'NZL')) != undefined ? <Image resizeMode="contain" style={styles.flag} source={ require('../assets/images/NZL.png') } /> : <Image resizeMode="contain" style={styles.flag} source={ require('../assets/images/NZL-gs.png') } />
    const flag_Ireland = (countryCodes.countryCodes.find((country) => country === 'IRL')) != undefined ? <Image resizeMode="contain" style={styles.flag} source={ require('../assets/images/IRL.png') } /> : <Image resizeMode="contain" style={styles.flag} source={ require('../assets/images/IRL-gs.png') } />
    const flag_Canada = (countryCodes.countryCodes.find((country) => country === 'CAN')) != undefined ? <Image resizeMode="contain" style={styles.flag} source={ require('../assets/images/CAN.png') } /> : <Image resizeMode="contain" style={styles.flag} source={ require('../assets/images/CAN-gs.png') } />
    const flag_UnitedStates = (countryCodes.countryCodes.find((country) => country === 'USA')) != undefined  ? <Image resizeMode="contain" style={styles.flag} source={ require('../assets/images/USA.png') } /> : <Image resizeMode="contain" style={styles.flag} source={ require('../assets/images/USA-gs.png') } />

    return (
      <View style={styles.itembar_right}>
        <View style={styles.itembar_right_top_row}>
          {flag_UnitedKingdom}
          {flag_Australia}
          {flag_NewZealand}
        </View>
        <View style={styles.itembar_right_btm_row}>
          {flag_Ireland}
          {flag_Canada}
          {flag_UnitedStates}
        </View>
      </View>
    );
  };

  const Item = ({ name, id, imageUrl, countryCodes, shortUUID, schema_plan }) => (
    <View style={styles.item}>
      <View>
        <Pressable onPress={() => {
            {
                navigation.navigate('Schema Events', {     
                  docID: id,
                  classType: classType
                });
            }
          }}>
          <Image resizeMode='contain' aspectRatio={1.33} source={{ uri: `${imageUrl}` }}/>
        </Pressable>
      </View>        
      <View style={styles.itembar}>
        <View style={styles.itembar_left}>
          <Pressable onPress={() => {
            navigation.navigate('Schema Events', {     
                docID: id,
                classType: classType
              });
          }}>
            <Text style={styles.title}>{name}</Text>
          </Pressable>
          <View style={styles.bottombar}>
            <Pressable onPress={() => {
                  if(Speech.isSpeakingAsync()) {
                    Speech.speak(`${name}`);
                  };
                 }}>
                  <MaterialCommunityIcons name="text-to-speech" color="#1ddbc9" size={35}/>
            </Pressable>
          </View>
        </View>
        <Flags countryCodes={countryCodes} />
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item id={ item.id } name={ item.name } imageUrl={ item.image_url} countryCodes={ item.country_code } shortUUID={ item.shortuuid} schema_plan={ item.plan }/>
  );

  function getData(category) {
    const SCHEMAS_BY_CATEGORY = gql`
      query GetSchemaByCategory($categoryName: String!) {
        getSchemasByCategory(categoryName: $categoryName) {
          name
          id
          category
          country_code
          image_url
          shortuuid
          country_code
          type
        }
      }
    `;
    const { data, loading, error } = useQuery(SCHEMAS_BY_CATEGORY, {
      variables: { categoryName: category },
    })
    if (loading) {
      return <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
      <Text style={{ color: colors.loadingerrortext, fontSize: 20 }}>Loading from our online database</Text>
      <ActivityIndicator size="large"/>
    </View>
    }
    if (error) {
      // return <Text>{ JSON.stringify(error) }</Text> // Useful for debugging errors
      return <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
      <Text style={{ color: colors.loadingerrortext, fontSize: 20 }}>Error: { error.message }</Text>
      <ActivityIndicator size="large" />
    </View>
    }

    return (
      <FlatList
      persistentScrollbar={true}
      data={data.getSchemasByCategory}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      />
    )        

  };

    let query = getData(category);
 
    const classTypeCapitalized = classType.charAt(0).toUpperCase() + classType.slice(1)

    const appBarContentTitle = category+' Schemas ('+classTypeCapitalized+')'
    const appBarContentSubTitle = 'Choose a '+category+' schema.'

    const _goBack = () => { navigation.navigate('Schema Categories', { classType: 'generic' })};

    const [modalVisible, setModalVisible] = useState(false);

     return (
       <ScreenContainer>
        <Appbar.Header style={{ backgroundColor: colors.listbackground, marginTop: 0 }}>
          <Appbar.BackAction onPress={_goBack} />
          <Appbar.Content title={appBarContentTitle} subtitle={appBarContentSubTitle} />
        </Appbar.Header>
         <View style={{ width: '100%' }}>
         <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
        </Modal>
          {query}
         </View>
       </ScreenContainer>
     );
};


  
export default BrowseSchemasScreen;
