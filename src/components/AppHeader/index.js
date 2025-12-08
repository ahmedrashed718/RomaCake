import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FONTS, COLORS} from '../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

export default function AppHeader({
  title = 'Roma Cake',
  showBackButton = false,
  onBackPress,
  showCart = false,
  onCartPress,
  showFavorite = false,
  onFavoritePress,
  showSearch = false,
  onSearchPress,
  cartBadgeCount = 0,
}) {
  return (
    <>
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle="light-content"
        translucent={false}
      />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.headerContainer}>
          <View style={styles.homeHeader}>
            {/* Right Side - Title */}
            <Text style={styles.homeTitle}>{title}</Text>

            {/* Left Side - Icons */}
            <View style={styles.headerIconsContainer}>
              {/* Back Button */}
              {showBackButton && (
                <TouchableOpacity
                  style={[styles.headerIconButton, styles.backButton]}
                  onPress={onBackPress}
                  activeOpacity={0.8}>
                  <Icon name="arrow-left" size={RFValue(18)} color="#E23D88" />
                </TouchableOpacity>
              )}

              {/* Favorite Button */}
              {showFavorite && (
                <TouchableOpacity
                  style={[styles.headerIconButton, styles.favoriteButton]}
                  onPress={onFavoritePress}
                  activeOpacity={0.8}>
                  <Icon
                    name="heart-outline"
                    size={RFValue(18)}
                    color="#E23D88"
                  />
                </TouchableOpacity>
              )}

              {/* Search Button */}
              {showSearch && (
                <TouchableOpacity
                  style={[styles.headerIconButton, styles.searchButton]}
                  onPress={onSearchPress}
                  activeOpacity={0.8}>
                  <Icon name="magnify" size={RFValue(18)} color="#6DC8D8" />
                </TouchableOpacity>
              )}

              {/* Cart Button */}
              {showCart && (
                <TouchableOpacity
                  style={[styles.headerIconButton, styles.cartButton]}
                  onPress={onCartPress}
                  activeOpacity={0.8}>
                  <Icon name="cart" size={RFValue(18)} color="#fff" />
                  {cartBadgeCount > 0 && (
                    <View style={styles.cartBadge}>
                      <Text style={styles.cartBadgeText}>{cartBadgeCount}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
          {/* Gradient Border */}
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradientBorder}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  // Safe Area
  safeArea: {
    backgroundColor: COLORS.primary,
  },
  // Header Styles
  headerContainer: {
    backgroundColor: '#fff',
  },
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  gradientBorder: {
    height: 3,
    width: '100%',
  },
  homeTitle: {
    fontSize: RFValue(20),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
  },
  headerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIconButton: {
    width: RFValue(36),
    height: RFValue(36),
    borderRadius: RFValue(18),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  backButton: {
    backgroundColor: '#FFF0F5',
    borderColor: 'rgba(226, 61, 136, 0.15)',
  },
  favoriteButton: {
    backgroundColor: '#FFF0F5',
    borderColor: 'rgba(226, 61, 136, 0.15)',
  },
  searchButton: {
    backgroundColor: '#F0F8FA',
    borderColor: 'rgba(109, 200, 216, 0.15)',
  },
  cartButton: {
    backgroundColor: '#E23D88',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#6DC8D8',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  cartBadgeText: {
    fontSize: RFValue(10),
    fontFamily: FONTS.fontFamilyBold,
    color: '#fff',
  },
});
