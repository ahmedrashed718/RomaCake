import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import {FONTS, COLORS, SIZES, IS_IOS} from '../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  getStatusBarHeight,
  isIphoneX,
} from 'react-native-iphone-x-helper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AppHeader({
  title = 'Roma Cake',
  showBackButton = false,
  onBackPress,
  backgroundColor = COLORS.primary,
  textColor = COLORS.white,
  rightIcon,
  onRightPress,
}) {
  return (
    <>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle="light-content"
        translucent={false}
      />
      <View style={[styles.container, {backgroundColor}]}>
        {/* Left Side - Back Button or Empty Space */}
        {showBackButton ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onBackPress}
            activeOpacity={0.7}>
            <Icon name="arrow-right" size={RFValue(22)} color={textColor} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconButton} />
        )}

        {/* Center - Title */}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, {color: textColor}]} numberOfLines={1}>
            {title}
          </Text>
        </View>

        {/* Right Side - Custom Icon or Empty Space */}
        {rightIcon ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onRightPress}
            activeOpacity={0.7}>
            <Icon name={rightIcon} size={RFValue(22)} color={textColor} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconButton} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding - 8,
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 15,
    paddingBottom: 15,
    elevation: 8,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  iconButton: {
    width: RFValue(40),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(20),
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: RFValue(20),
    fontFamily: FONTS.fontFamilyBold,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

