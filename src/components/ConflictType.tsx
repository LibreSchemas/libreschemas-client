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

  const ConflictTypeImage = ( conflict_type_label ) => {


  const { colors, dark } = useTheme();

  let image_pseudo_conflict = require('../assets/images/pseudo_conflict.png')
  let image_ego_conflict = require('../assets/images/ego_conflict.png')
  let image_value_conflict = require('../assets/images/value_conflict.png')
  let image_policy_conflict = require('../assets/images/policy_conflict.png')
  let image_meta_conflict = require('../assets/images/meta_conflict.png')
  let image_fact_conflict = require('../assets/images/fact_conflict.png')

  if(dark) {
    image_pseudo_conflict = require('../assets/images/pseudo_conflict_dark.png')
    image_fact_conflict = require('../assets/images/fact_conflict_dark.png')

  }

  switch(conflict_type_label.conflict_type_label){
   case 'pseudo':
       return <Image source={image_pseudo_conflict} style={{ width: conflict_type_label.size, height: conflict_type_label.size, marginLeft: 2, marginRight: 5, marginTop: 2, marginBottom: 2 }}/>
   break;
   case 'ego':
       return <Image source={image_ego_conflict} style={{ width: conflict_type_label.size, height: conflict_type_label.size, marginLeft: 2, marginRight: 5, marginTop: 2, marginBottom: 2 }}/>
   break;
   case 'value':
       return <Image source={image_value_conflict} style={{ width: conflict_type_label.size, height: conflict_type_label.size, marginLeft: 2, marginRight: 5, marginTop: 2, marginBottom: 2 }}/>
   break;
   case 'policy':
       return <Image source={image_policy_conflict} style={{ width: conflict_type_label.size+10, height: conflict_type_label.size+20, marginLeft: 2, marginRight: 5, marginTop: 2, marginBottom: 2 }}/>
   break;
   case 'meta':
       return <Image source={image_meta_conflict} style={{ width: conflict_type_label.size, height: conflict_type_label.size, marginLeft: 2, marginRight: 5, marginTop: 2, marginBottom: 2 }}/>
   break;
   case 'fact':
       return <Image source={image_fact_conflict} style={{ width: conflict_type_label.size, height: conflict_type_label.size, marginLeft: 2, marginRight: 5, marginTop: 2, marginBottom: 2 }}/>
   break;
   default:
        return <Text>{conflict_type_label}</Text>
  }
}
  
  const ConflictType = ( conflict_type ) => {

    const { colors, dark } = useTheme();

    const styles = StyleSheet.create({
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        backgroundColor: colors.itembackground,
        margin: 20,
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
        marginBottom: 15,
        textAlign: "center",
        textTransform: 'capitalize',
        fontWeight: 'bold',
        color: colors.text,
        fontSize: 16
    }
  });

    const [modalVisible, setModalVisible] = useState(false);
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
            <ConflictTypeImage conflict_type_label={conflict_type.conflict_type_label} size={50} />
              <Text style={styles.modalText}>{ conflict_type.conflict_type_label } Conflict</Text>
              <Text style={{ color: colors.text }}>{ conflict_type.conflict_type_explainer }</Text>
              <Pressable onPress={() => {
                  if(Speech.isSpeakingAsync()) {
                    Speech.speak(`${conflict_type.conflict_type_label} Conflict.${conflict_type.conflict_type_explainer}`);
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
        <ConflictTypeImage conflict_type_label={conflict_type.conflict_type_label} size={40} />
        </Pressable>
      </View>
    </View>
    )
  }

 

export default ConflictType;