import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FONTS, COLORS} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppHeader} from '../../../components';

export default function CakeScreen() {
  return (
    <View style={styles.container}>
      <AppHeader title="الكيك" showIcons={true} />

      {/* <Text style={styles.text}>الكيك</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: RFValue(20),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.primary,
  },
});
