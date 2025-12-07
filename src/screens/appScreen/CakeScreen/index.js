import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FONTS, COLORS} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';

export default function CakeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>الكيك</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: RFValue(20),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.primary,
  },
});
