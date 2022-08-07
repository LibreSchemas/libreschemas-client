import React from "react";
import { View, Text, StyleSheet, Linking, ScrollView } from "react-native";
import { Button } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

const HelpScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: colors.background
    },
    page: {
      flex: 1,
      flexDirection: 'column',
      padding: 15,
      backgroundColor: colors.background
    },
    heading: {
      color: '#000000',
      fontWeight: 'bold',
      fontSize: 25,
      marginBottom: 10
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 10,
      borderRadius: 5
    }
  });

  const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
  );
    
    return (
      <ScreenContainer>
        <ScrollView>
            <View style={styles.page}>
                <Button color={colors.listbackground} mode="contained" onPress={() =>{ Linking.openURL('https://neuroschemas.app/documentation') }}>View Documentation</Button>
                <Text style={{textAlign:"justify", color: colors.text}}>If you are having issues with the App or just want to understand more of it's features then please consult the documentation on our website in the first instance.</Text>
                <Button color={colors.listbackground} style={{ marginTop: 10 }} mode="contained" onPress={() =>{ Linking.openURL('https://checkpointorg.com/global') }}>View Global Crisis Contact List</Button>
                <Text style={{textAlign:"justify", color: colors.text}}>Depending on your circumstances you may require mental health support. Please refer to the global emergency contact list website above for emergency numbers in your area.</Text>
            </View>
        </ScrollView>
      </ScreenContainer>
    );
  };

export default HelpScreen;
