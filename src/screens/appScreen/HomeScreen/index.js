import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {FONTS, COLORS} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>مرحباً بك في روما كيك 🎂</Text>
        <Text style={styles.subtitle}>اختر ما تريد من القائمة</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.primary,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: RFValue(24),
    fontFamily: FONTS.fontFamilyBold,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#fff',
    textAlign: 'center',
  },
});
