/*  Copyright 2022 Dev Mindset Community Interest Company
    This file is part of LibreSchemas Client.
    LibreSchemas Client is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
    LibreSchemas Client is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License along with LibreSchemas Server API for React. If not, see <https://www.gnu.org/licenses/>.
*/
import React, { useState }  from "react";
import { View, Text, Image, StyleSheet, Pressable, Modal } from "react-native";
import * as Speech from 'expo-speech';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';

const CommunicationStyleTypeImage = ( communication_style_type) => {

  const image_aggressive = require('../assets/images/aggressive.png')
  const image_passive_aggressive = require('../assets/images/passive_aggressive.png')
  const image_assertive = require('../assets/images/assertive.png')
  const image_passive = require('../assets/images/passive.png')


  switch(communication_style_type.communication_style_type){
   case 'aggressive':
       return <Image source={image_aggressive} style={{ width: communication_style_type.size, height: communication_style_type.size, marginLeft: 2, marginRight: 5, marginBottom: 2 }}/>
   break;
   case 'passive-aggressive':
       return <Image source={image_passive_aggressive} style={{ width: communication_style_type.size, height: communication_style_type.size, marginLeft: 2, marginRight: 5, marginBottom: 2 }}/>
   break;
   case 'assertive':
       return <Image source={image_assertive} style={{ width: communication_style_type.size, height: communication_style_type.size, marginLeft: 2, marginRight: 5, marginBottom: 2 }}/>
   break;
   case 'passive':
       return <Image source={image_passive} style={{ width: communication_style_type.size, height: communication_style_type.size, marginLeft: 2, marginRight: 5, marginBottom: 2 }}/>
   break;
   default:
        return <Text>{communication_style_type.communication_style_type}</Text>
  }
}
  
  const CommunicationStyleType = ( communication_style_type) => {

    const [modalVisible, setModalVisible] = useState(false);
    const { colors, dark } = useTheme();

    const styles = StyleSheet.create({
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: colors.itembackground,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 15,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        marginTop: 20,
        backgroundColor: colors.popupbuttonbackground,
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
      },
      modalText: {
        color: colors.text,
        marginBottom: 15,
        textAlign: "center",
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: 16
    }
  });

    return (
    <View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <CommunicationStyleTypeImage communication_style_type={communication_style_type.communication_style_type} size={70} />
              <Text style={styles.modalText}>{ communication_style_type.communication_style_type }</Text>
              <Text style={{ color: colors.text }}>{ communication_style_type.communication_style_presentation }</Text>
              <Pressable onPress={() => {
                    if(Speech.isSpeakingAsync()) {
                      Speech.speak(`${communication_style_type.communication_style_type}. ${communication_style_type.communication_style_presentation}`);
                    }
                  }}>
                  <MaterialCommunityIcons name="text-to-speech" color="#1ddbc9" size={30}/>
                </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          onPress={() => setModalVisible(true)}
        >
        <CommunicationStyleTypeImage communication_style_type={communication_style_type.communication_style_type} size={50}/>
        </Pressable>
      </View>
    </View>
    )
  }



export default CommunicationStyleType;