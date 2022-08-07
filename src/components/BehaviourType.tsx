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

const BehaviourTypeImage = ( norm_type) => {

    const covid19_norm = require('../assets/images/covid19_norm.png')
    const prescriptive_norm = require('../assets/images/prescriptive_norm.png')
    const descriptive_norm = require('../assets/images/descriptive_norm.png')
    const injunctive_norm = require('../assets/images/injunctive_norm.png')
    const desired_norm = require('../assets/images/desired_norm.png')
    const unpopular_norm = require('../assets/images/unpopular_norm.png')
    const infraction = require('../assets/images/infraction.png')
    const misdemeanor = require('../assets/images/misdemeanor.png')
    const felony = require('../assets/images/felony.png')
  
    switch(norm_type.norm_type){
      case 'covid19_norm':
         return <Image source={covid19_norm} style={{ width: norm_type.size, height: norm_type.size }}/>
          break;
      case 'prescriptive_norm':
         return <Image source={prescriptive_norm} style={{ width: norm_type.size, height: norm_type.size }}/>
          break;
      case 'descriptive_norm':
         return <Image source={descriptive_norm} style={{ width: norm_type.size, height: norm_type.size }}/>
          break;
      case 'injunctive_norm':
          return <Image source={injunctive_norm} style={{ width: norm_type.size, height: norm_type.size }}/>
          break;
      case 'desired_norm':
          return <Image source={desired_norm} style={{ width: norm_type.size, height: norm_type.size }}/>
          break;
      case 'unpopular_norm':
          return <Image source={unpopular_norm} style={{ width: norm_type.size, height: norm_type.size }}/>
      break;
      case 'infraction':
          return <Image source={infraction} style={{ width: norm_type.size, height: norm_type.size }}/>
      break;
      case 'misdemeanor':
          return <Image source={misdemeanor} style={{ width: norm_type.size, height: norm_type.size }}/>
          break;
      case 'felony':
          return <Image source={felony} style={{ width: norm_type.size, height: norm_type.size }}/>
      break;
      default:
          return <Text>Error AA</Text>
    }
  }
  
  const BehaviourType = ( norm_type) => {

    const [modalVisible, setModalVisible] = useState(false);
    const { colors, dark } = useTheme();

    const styles = StyleSheet.create({
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 5
    }
  });

  const BehaviourTypeDescription = ( norm_type) => {

    const { colors, dark } = useTheme();
  
    const covid19_norm_name = "COVID-19 Norm"
    const prescriptive_norm_name = "Prescriptive Norm"
    const descriptive_norm_name = "Descriptive Norm"
    const injunctive_norm_name = "Injunctive Norm"
    const desired_norm_name = "Desired Norm"
    const unpopular_norm_name = "Unpopular Norm"
    const infraction_name = "Infraction"
    const misdemeanor_name = "Misdemeanor"
    const felony_name = "Felony"

    const covid19_norm_description = "Additional rules that we may be expected to follow due to the COVID-19 pandemic."
    const prescriptive_norm_description = "Unwritten rules that are understood and followed by society to indicate what we should do."
    const descriptive_norm_description = "Commonly done in specific situations by most people."
    const injunctive_norm_description = "What should happen (group approval)."
    const desired_norm_description = "How we desire things done in a situation (group approval)."
    const unpopular_norm_description = "How we do not desire things to be done in a situation (group disproval)."
    const infraction_description = "Minor law breaking. Eg. Speeding."
    const misdemeanor_description = "Serious breaking of the law. Eg. Stealing from a shop."
    const felony_description = "Severe breaking of the law. Eg. Violence."
  
    switch(norm_type.norm_type){
      case 'covid19_norm':
         return (
            <View style={styles.modalView}>
                <View style={{ flexDirection: "row", alignItems: 'center'}}>
                    <BehaviourTypeImage norm_type={norm_type.norm_type} size={40} />
                    <Text style={styles.modalText}>{covid19_norm_name}</Text>
                </View>
                    <Text style={{ color: colors.text }}>{covid19_norm_description}</Text>
                        <Pressable onPress={() => {
                            if(Speech.isSpeakingAsync()) {
                                Speech.speak(`${covid19_norm_name}. ${covid19_norm_description}`);
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
          )
          break;
      case 'prescriptive_norm':
        return (
            <View style={styles.modalView}>
                <View style={{ flexDirection: "row", alignItems: 'center'}}>
                    <BehaviourTypeImage norm_type={norm_type.norm_type} size={40} />
                    <Text style={styles.modalText}>{prescriptive_norm_name}</Text>
                </View>
                    <Text style={{ color: colors.text }}>{prescriptive_norm_description}</Text>
                        <Pressable onPress={() => {
                            if(Speech.isSpeakingAsync()) {
                                Speech.speak(`${prescriptive_norm_name}. ${prescriptive_norm_description}`);
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
          )
          break;
      case 'descriptive_norm':
        return (
            <View style={styles.modalView}>
                <View style={{ flexDirection: "row", alignItems: 'center'}}>
                    <BehaviourTypeImage norm_type={norm_type.norm_type} size={40} />
                    <Text style={styles.modalText}>{descriptive_norm_name}</Text>
                </View>
                    <Text style={{ color: colors.text }}>{descriptive_norm_description}</Text>
                        <Pressable onPress={() => {
                            if(Speech.isSpeakingAsync()) {
                                Speech.speak(`${descriptive_norm_name}. ${descriptive_norm_description}`);
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
          )
          break;
      case 'injunctive_norm':
        return (
            <View style={styles.modalView}>
                <View style={{ flexDirection: "row", alignItems: 'center'}}>
                    <BehaviourTypeImage norm_type={norm_type.norm_type} size={40} />
                    <Text style={styles.modalText}>{injunctive_norm_name}</Text>
                </View>
                    <Text style={{ color: colors.text }}>{injunctive_norm_description}</Text>
                        <Pressable onPress={() => {
                            if(Speech.isSpeakingAsync()) {
                                Speech.speak(`${injunctive_norm_name}. ${injunctive_norm_description}`);
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
          )
          break;
      case 'desired_norm':
        return (
            <View style={styles.modalView}>
                <View style={{ flexDirection: "row", alignItems: 'center'}}>
                    <BehaviourTypeImage norm_type={norm_type.norm_type} size={40} />
                    <Text style={styles.modalText}>{desired_norm_name}</Text>
                </View>
                    <Text style={{ color: colors.text }}>{desired_norm_description}</Text>
                        <Pressable onPress={() => {
                            if(Speech.isSpeakingAsync()) {
                                Speech.speak(`${desired_norm_name}. ${desired_norm_description}`);
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
          )
          break;
      case 'unpopular_norm':
        return (
            <View style={styles.modalView}>
                <View style={{ flexDirection: "row", alignItems: 'center'}}>
                    <BehaviourTypeImage norm_type={norm_type.norm_type} size={40} />
                    <Text style={styles.modalText}>{unpopular_norm_name}</Text>
                </View>
                    <Text style={{ color: colors.text }}>{unpopular_norm_description}</Text>
                        <Pressable onPress={() => {
                            if(Speech.isSpeakingAsync()) {
                                Speech.speak(`${unpopular_norm_name}. ${unpopular_norm_description}`);
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
          )
          break;
      case 'infraction':
        return (
            <View style={styles.modalView}>
                <View style={{ flexDirection: "row", alignItems: 'center'}}>
                    <BehaviourTypeImage norm_type={norm_type.norm_type} size={40} />
                    <Text style={styles.modalText}>{infraction_name}</Text>
                </View>
                    <Text style={{ color: colors.text }}>{infraction_description}</Text>
                        <Pressable onPress={() => {
                            if(Speech.isSpeakingAsync()) {
                                Speech.speak(`${infraction_name}. ${infraction_description}`);
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
          )
          break;
      case 'misdemeanor':
        return (
            <View style={styles.modalView}>
                <View style={{ flexDirection: "row", alignItems: 'center'}}>
                    <BehaviourTypeImage norm_type={norm_type.norm_type} size={40} />
                    <Text style={styles.modalText}>{misdemeanor_name}</Text>
                </View>
                    <Text style={{ color: colors.text }}>{misdemeanor_description}</Text>
                        <Pressable onPress={() => {
                            if(Speech.isSpeakingAsync()) {
                                Speech.speak(`${misdemeanor_name}. ${misdemeanor_description}`);
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
          )
          break;
      case 'felony':
        return (
            <View style={styles.modalView}>
                <View style={{ flexDirection: "row", alignItems: 'center'}}>
                    <BehaviourTypeImage norm_type={norm_type.norm_type} size={40} />
                    <Text style={styles.modalText}>{felony_name}</Text>
                </View>
                    <Text style={{ color: colors.text }}>{felony_description}</Text>
                        <Pressable onPress={() => {
                            if(Speech.isSpeakingAsync()) {
                                Speech.speak(`${felony_name}. ${felony_description}`);
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
          )
          break;
      default:
        return (
            <View style={styles.modalView}>
                <View style={{ flexDirection: "row", alignItems: 'center'}}>
                    <Text style={styles.modalText}>Error</Text>
                    <Text style={{ color: colors.text }}>An Error has occured</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                </View>
            </View>
          )
    }
  }

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
            <BehaviourTypeDescription norm_type={ norm_type.norm_type.type} />
          </View>
        </Modal>
        </View>
        <Pressable
          onPress={() => setModalVisible(true)}
        >
            <BehaviourTypeImage norm_type={ norm_type.norm_type.type} size={40}/>
        </Pressable>
    </View>
    )
  }



export default BehaviourType;