import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {FONTS, COLORS, Images} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';
import AppHeader from '../../../components/AppHeader';
import Svg, {Path} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const HERO_HEIGHT = SCREEN_HEIGHT * 0.25;

export default function ConfirmationPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const orderData = route.params?.orderData || {};
  const cartItems = orderData.cartItems || [];
  const total = orderData.total || 0;
  const subtotal = orderData.subtotal || 0;
  const discount = orderData.discount || 0;
  const deliveryInfo = orderData.deliveryInfo || {};

  // Animation values
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  useEffect(() => {
    // Animate success icon
    scale.value = withSequence(
      withSpring(1.2, {damping: 8}),
      withSpring(1, {damping: 8}),
    );
    opacity.value = withTiming(1, {duration: 600});
    translateY.value = withSpring(0, {damping: 15});
  }, []);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
    opacity: opacity.value,
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
  }));

  const handleBackToHome = () => {
    navigation.navigate('BottomTabs');
  };

  const handleViewOrders = () => {
    navigation.navigate('BottomTabs', {
      screen: 'MyOrders',
    });
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="تأكيد الطلب"
        showBackButton={true}
        onBackPress={handleBackToHome}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSectionWrapper}>
          <View style={styles.heroSection}>
            <View style={styles.heroSlideContainer}>
              <ImageBackground
                source={Images.Chocolate}
                style={styles.heroSlideBackground}
                imageStyle={styles.heroSlideBackgroundImage}>
                <LinearGradient
                  colors={[
                    'rgba(0, 0, 0, 0.05)',
                    'rgba(0, 0, 0, 0.15)',
                    'rgba(146, 39, 88, 0.25)',
                  ]}
                  style={styles.heroGradientOverlay}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}>
                  <View style={styles.heroSlideContent}>
                    <Text style={styles.heroMainTitle}>
                      شكراً لك على ثقتك بنا
                    </Text>
                    <Text style={styles.heroSlideTitle}>طلبك في الطريق</Text>
                    <Text style={styles.heroSlideDescription}>
                      سيتم تجهيز طلبك وتوصيله قريباً
                    </Text>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </View>
          </View>
          {/* Decorative Wave SVG */}
          <View style={styles.waveContainer}>
            <Svg
              width={SCREEN_WIDTH}
              height={RFValue(60)}
              viewBox="0 0 1440 320"
              preserveAspectRatio="none">
              <Path
                fill={COLORS.pinkybg}
                fillOpacity="1"
                d="M0,192L60,197.3C120,203,240,213,360,181.3C480,149,600,75,720,85.3C840,96,960,192,1080,208C1200,224,1320,160,1380,128L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              />
            </Svg>
          </View>
        </View>

        <Animated.View style={contentAnimatedStyle}>
          <View style={styles.contentWrapper}>
            {/* Success Icon Section */}
            <View style={styles.iconContainer}>
              <Animated.View
                style={[styles.successIconWrapper, iconAnimatedStyle]}>
                <LinearGradient
                  colors={[COLORS.primary, COLORS.secondary]}
                  style={styles.successIconGradient}>
                  <Icon name="check-circle" size={RFValue(70)} color="#fff" />
                </LinearGradient>
              </Animated.View>
              <Text style={styles.successTitle}>تم تأكيد الطلب بنجاح!</Text>
              <Text style={styles.successMessage}>
                شكراً لك! تم استلام طلبك وسيتم تجهيزه قريباً
              </Text>
            </View>

            {/* Order Summary Card */}
            <View style={styles.summaryCard}>
              <View style={styles.sectionHeader}>
                <Icon
                  name="receipt"
                  size={RFValue(20)}
                  color={COLORS.primary}
                />
                <Text style={styles.sectionTitle}>ملخص الطلب</Text>
              </View>

              {/* Order Items */}
              {cartItems.length > 0 && (
                <View style={styles.itemsSection}>
                  {cartItems.map((item, index) => (
                    <View key={item.id || index} style={styles.orderItem}>
                      <View style={styles.itemInfo}>
                        <Text style={styles.itemName} numberOfLines={1}>
                          {item.title}
                        </Text>
                        <Text style={styles.itemQuantity}>
                          الكمية: {item.quantity}
                        </Text>
                      </View>
                      <Text style={styles.itemPrice}>
                        {item.currentPrice * item.quantity} ر.س
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Divider */}
              <View style={styles.divider} />

              {/* Price Breakdown */}
              <View style={styles.priceBreakdown}>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>المجموع الفرعي:</Text>
                  <Text style={styles.priceValue}>{subtotal} ر.س</Text>
                </View>

                {discount > 0 && (
                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>الخصم:</Text>
                    <Text style={[styles.priceValue, styles.discountValue]}>
                      -{discount} ر.س
                    </Text>
                  </View>
                )}

                <View style={[styles.priceRow, styles.totalRow]}>
                  <Text style={styles.totalLabel}>الإجمالي:</Text>
                  <Text style={styles.totalValue}>{total} ر.س</Text>
                </View>
              </View>
            </View>

            {/* Delivery Info Card */}
            {deliveryInfo.city && (
              <View style={styles.infoCard}>
                <View style={styles.sectionHeader}>
                  <Icon
                    name="map-marker"
                    size={RFValue(20)}
                    color={COLORS.primary}
                  />
                  <Text style={styles.sectionTitle}>معلومات التوصيل</Text>
                </View>
                <View style={styles.infoDetails}>
                  {deliveryInfo.fullName && (
                    <View style={styles.infoRow}>
                      <Icon
                        name="account"
                        size={RFValue(16)}
                        color={COLORS.primary}
                      />
                      <Text style={styles.infoText}>
                        {deliveryInfo.fullName}
                      </Text>
                    </View>
                  )}
                  {deliveryInfo.phone && (
                    <View style={styles.infoRow}>
                      <Icon
                        name="phone"
                        size={RFValue(16)}
                        color={COLORS.primary}
                      />
                      <Text style={styles.infoText}>{deliveryInfo.phone}</Text>
                    </View>
                  )}
                  {deliveryInfo.address && (
                    <View style={styles.infoRow}>
                      <Icon
                        name="map-marker-outline"
                        size={RFValue(16)}
                        color={COLORS.primary}
                      />
                      <Text style={styles.infoText}>
                        {deliveryInfo.address}
                      </Text>
                    </View>
                  )}
                  {(deliveryInfo.city || deliveryInfo.neighborhood) && (
                    <View style={styles.infoRow}>
                      <Icon
                        name="city-variant"
                        size={RFValue(16)}
                        color={COLORS.primary}
                      />
                      <Text style={styles.infoText}>
                        {deliveryInfo.neighborhood
                          ? `${deliveryInfo.neighborhood}, ${deliveryInfo.city}`
                          : deliveryInfo.city}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )}

            {/* Order Status Card */}
            <View style={styles.statusCard}>
              <View style={styles.statusRow}>
                <View style={styles.statusIconWrapper}>
                  <Icon
                    name="package-variant"
                    size={RFValue(20)}
                    color={COLORS.primary}
                  />
                </View>
                <View style={styles.statusInfo}>
                  <Text style={styles.statusTitle}>عدد القطع</Text>
                  <Text style={styles.statusValue}>
                    {calculateTotalItems()} قطعة
                  </Text>
                </View>
              </View>
              <View style={styles.statusRow}>
                <View style={styles.statusIconWrapper}>
                  <Icon
                    name="clock-outline"
                    size={RFValue(20)}
                    color={COLORS.secondary}
                  />
                </View>
                <View style={styles.statusInfo}>
                  <Text style={styles.statusTitle}>وقت التوصيل المتوقع</Text>
                  <Text style={styles.statusValue}>يومين إلى ثلاثة أيام</Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleBackToHome}
                activeOpacity={0.85}>
                <LinearGradient
                  colors={[COLORS.primary, COLORS.secondary]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.primaryButtonGradient}>
                  <Icon name="home" size={RFValue(18)} color="#fff" />
                  <Text style={styles.primaryButtonText}>العودة للرئيسية</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleViewOrders}
                activeOpacity={0.85}>
                <Icon
                  name="clipboard-text"
                  size={RFValue(18)}
                  color={COLORS.primary}
                />
                <Text style={styles.secondaryButtonText}>عرض طلباتي</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.pinkybg,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: RFValue(30),
  },
  heroSectionWrapper: {
    marginBottom: RFValue(20),
    position: 'relative',
  },
  heroSection: {
    height: HERO_HEIGHT,
  },
  heroSlideContainer: {
    width: '100%',
    height: '100%',
  },
  heroSlideBackground: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: RFValue(3),
    },
    shadowOpacity: 0.15,
    shadowRadius: RFValue(8),
    elevation: RFValue(5),
  },
  heroSlideBackgroundImage: {
    resizeMode: 'cover',
  },
  heroGradientOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: RFValue(20),
    paddingHorizontal: RFValue(10),
    paddingBottom: RFValue(20),
  },
  heroSlideContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  successIconWrapper: {
    width: RFValue(100),
    height: RFValue(100),
    borderRadius: RFValue(50),
    marginBottom: RFValue(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIconGradient: {
    width: '100%',
    height: '100%',
    borderRadius: RFValue(50),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  heroMainTitle: {
    fontSize: RFValue(22),
    fontFamily: FONTS.funPlayBold,
    color: '#fff',
    marginBottom: RFValue(5),
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: {width: 0, height: RFValue(3)},
    textShadowRadius: RFValue(6),
    letterSpacing: RFValue(0.5),
    textAlign: 'center',
  },
  heroSlideTitle: {
    fontSize: RFValue(16),
    fontFamily: FONTS.funPlayBold,
    color: '#fff',
    marginBottom: RFValue(8),
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {width: 0, height: RFValue(2)},
    textShadowRadius: RFValue(5),
    textAlign: 'center',
  },
  heroSlideDescription: {
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#fff',
    marginBottom: RFValue(12),
    lineHeight: RFValue(20),
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {width: 0, height: RFValue(2)},
    textShadowRadius: RFValue(4),
    marginTop: RFValue(5),
    textAlign: 'center',
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: SCREEN_WIDTH,
    height: RFValue(60),
    zIndex: 100,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  contentWrapper: {
    paddingHorizontal: RFValue(15),
    marginTop: -RFValue(30),
    zIndex: 1000,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFValue(20),
    marginBottom: RFValue(15),
  },
  successIconWrapper: {
    width: RFValue(120),
    height: RFValue(120),
    borderRadius: RFValue(60),
    marginBottom: RFValue(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIconGradient: {
    width: '100%',
    height: '100%',
    borderRadius: RFValue(60),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  successTitle: {
    fontSize: RFValue(22),
    fontFamily: FONTS.funPlayBold,
    color: '#333',
    marginBottom: RFValue(8),
    textAlign: 'center',
  },
  successMessage: {
    fontSize: RFValue(13),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#666',
    textAlign: 'center',
    lineHeight: RFValue(20),
    paddingHorizontal: RFValue(20),
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: RFValue(16),
    padding: RFValue(20),
    marginBottom: RFValue(15),
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: RFValue(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: RFValue(6),
    borderWidth: RFValue(2),
    borderColor: 'transparent',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(18),
    gap: RFValue(8),
  },
  sectionTitle: {
    fontSize: RFValue(18),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
  },
  itemsSection: {
    marginBottom: RFValue(15),
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: RFValue(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemInfo: {
    flex: 1,
    marginRight: RFValue(10),
  },
  itemName: {
    fontSize: RFValue(13),
    fontFamily: FONTS.fontFamilyBold,
    color: '#333',
    marginBottom: RFValue(4),
  },
  itemQuantity: {
    fontSize: RFValue(11),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#666',
  },
  itemPrice: {
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.primary,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: RFValue(15),
  },
  priceBreakdown: {
    marginBottom: RFValue(10),
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: RFValue(8),
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: RFValue(12),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#666',
  },
  priceValue: {
    fontSize: RFValue(12),
    fontFamily: FONTS.fontFamilyBold,
    color: '#333',
  },
  discountValue: {
    color: COLORS.secondary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: RFValue(12),
    marginTop: RFValue(8),
  },
  totalLabel: {
    fontSize: RFValue(16),
    fontFamily: FONTS.fontFamilyBold,
    color: '#333',
  },
  totalValue: {
    fontSize: RFValue(18),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.primary,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: RFValue(16),
    padding: RFValue(20),
    marginBottom: RFValue(15),
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: RFValue(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: RFValue(6),
    borderWidth: RFValue(2),
    borderColor: 'transparent',
  },
  infoDetails: {
    gap: RFValue(10),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(10),
    paddingVertical: RFValue(5),
  },
  infoText: {
    fontSize: RFValue(12),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#666',
    flex: 1,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: RFValue(16),
    padding: RFValue(20),
    marginBottom: RFValue(20),
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: RFValue(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: RFValue(6),
    borderWidth: RFValue(2),
    borderColor: 'transparent',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(15),
    gap: RFValue(12),
  },
  statusIconWrapper: {
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RFValue(20),
    backgroundColor: '#FFF2F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: RFValue(11),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#666',
    marginBottom: RFValue(3),
  },
  statusValue: {
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamilyBold,
    color: '#333',
  },
  actionsContainer: {
    gap: RFValue(12),
    marginBottom: RFValue(20),
  },
  primaryButton: {
    borderRadius: RFValue(14),
    overflow: 'hidden',
    elevation: 6,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  primaryButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: RFValue(14),
    gap: RFValue(8),
  },
  primaryButtonText: {
    fontSize: RFValue(15),
    fontFamily: FONTS.fontFamilyBold,
    color: '#fff',
    letterSpacing: 0.3,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: RFValue(14),
    paddingVertical: RFValue(14),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: RFValue(8),
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  secondaryButtonText: {
    fontSize: RFValue(15),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.primary,
  },
});
