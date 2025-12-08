import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  CategoriesPage,
  ConnectWith,
  MyOrders,
  Profile,
  Home,
} from '../screens/appScreen';
import {COLORS, icons, FONTS, SIZES, Images} from '../constants';

const BottomTab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFValue(5),
  },
  subscribeContainer: {
    position: 'absolute',
    top: -RFValue(38),
    width: RFValue(65),
    height: RFValue(65),
    borderRadius: RFValue(65 / 2),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: RFValue(5),
    borderColor: COLORS.pinkybg,
  },
  iconStyle: {
    width: RFValue(25),
    height: RFValue(25),
    alignSelf: 'center',
  },
  labelStyle: {
    ...FONTS.body5,
    fontFamily: FONTS.fontFamilyMedium,
    fontSize: RFValue(9),
    color: COLORS.white,
    textAlign: 'center',
    marginTop: RFValue(2),
  },
  tabBarStyle: {
    height: RFValue(75),
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    paddingBottom: RFValue(5),
    paddingTop: SIZES.base,
    borderTopLeftRadius: RFValue(10),
    borderTopRightRadius: RFValue(10),
    position: 'absolute',
  },
});

// Solid Background Component for Tab Bar
const TabBarBackground = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.primary,
        borderTopLeftRadius: RFValue(10),
        borderTopRightRadius: RFValue(10),
        boredertopWidth: 1,
      }}
    />
  );
};

const TabIcon = ({focused, icon, icon2, iconSize, inactiveIconSize, noTint}) => {
  if (focused) {
    return (
      <View style={styles.subscribeContainer}>
        <Image
          source={icon2}
          style={{
            width: iconSize ? RFValue(iconSize) : RFValue(30),
            height: iconSize ? RFValue(iconSize) : RFValue(30),
          }}
          resizeMode="contain"
          tintColor="white"
        />
      </View>
    );
  }

  return (
    <View style={styles.tabContainer}>
      <Image
        source={icon}
        style={
          inactiveIconSize
            ? {width: RFValue(inactiveIconSize), height: RFValue(inactiveIconSize)}
            : styles.iconStyle
        }
        tintColor={COLORS.white}
        resizeMode="contain"
      />
    </View>
  );
};

export default function BottomTabs() {
  return (
    <BottomTab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.white,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => <TabBarBackground />,
        tabBarLabelStyle: styles.labelStyle,
      }}>
      {/* Home Tab 1 */}
      <BottomTab.Screen
        name={'CategoriesPage'}
        component={CategoriesPage}
        options={{
          tabBarLabel: 'الكيك',
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.Cake} icon2={icons.Cake2} />
          ),
        }}
      />

      {/* Home Tab 2 */}
      <BottomTab.Screen
        name={'MyOrders'}
        component={MyOrders}
        options={{
          tabBarLabel: 'طلباتك',
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              icon={icons.shoppingBag}
              icon2={icons.shoppingBag2}
            />
          ),
        }}
      />

      {/* Middle Tab */}
      <BottomTab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarLabel: 'الرئيسية',
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              icon={Images.romaLogo}
              icon2={Images.romaLogo}
              iconSize={55}
              inactiveIconSize={38}
              noTint={true}
            />
          ),
        }}
      />

      {/* Home Tab 3 */}

      <BottomTab.Screen
        name={'ConnectWith'}
        component={ConnectWith}
        options={{
          tabBarLabel: 'تواصل معنا',
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              icon={icons.Group2}
              icon2={icons.Group}
            />
          ),
        }}
      />

      {/* Home Tab 4 */}
      <BottomTab.Screen
        name={'الملف الشخصي'}
        component={Profile}
        options={{
          tabBarLabel: 'الملف الشخصي',
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.user} icon2={icons.user2} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
