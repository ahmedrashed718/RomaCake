import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import {FONTS, COLORS, Images} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';
import AppHeader from '../../../components/AppHeader';
import Svg, {Path, Rect, G} from 'react-native-svg';
import utils from '../../../utils';
import MadaIcon from '../../../assets/svgs/mada.svg';
import styles from './style';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const HERO_HEIGHT = SCREEN_HEIGHT * 0.28;

export default function CheckoutPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const orderData = route.params?.orderData || {};
  const cartItems = orderData.cartItems || [];
  const subtotal = orderData.subtotal || 0;
  const discount = orderData.discount || 0;
  const total = orderData.total || 0;

  // Form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod', 'card', or 'installment'
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showNeighborhoodDropdown, setShowNeighborhoodDropdown] =
    useState(false);

  // Cities data
  const citiesData = [
    {
      city: 'جدة',
      neighborhoods: [
        'الشاطئ',
        'أبحر الشمالية',
        'أبحر الجنوبية',
        'المحمدية',
        'المرجان',
        'البساتين',
        'النزهة',
        'النعيم',
        'الروضة',
        'الحمراء',
        'الزهراء',
        'السلامة',
        'الفيصلية',
        'الأندلس',
        'الكيلو 14',
        'البلد (التاريخي)',
      ],
    },
    {
      city: 'مكة',
      neighborhoods: [
        'العزيزية',
        'المسفلة',
        'الشرائع',
        'النسيم',
        'الرصيفة',
        'العتيبية',
        'الزايدي',
        'الأوالي',
        'الكعكية',
        'العوالي',
        'جرول',
        'الجموم',
        'الهنداوية',
        'الإسكان',
        'الطندباوي',
      ],
    },
    {
      city: 'الطائف',
      neighborhoods: [
        'الريان',
        'العزيزية',
        'شهاد',
        'الحوية',
        'الوسام',
        'شبرا',
        'القمرية',
        'العقيق',
        'الجفجفة',
        'النسيم',
        'نخب',
        'المطار',
        'الفيصلية',
        'الجال',
        'الربيع',
      ],
    },
  ];

  const cities = citiesData.map(item => item.city);

  // Get neighborhoods for selected city
  const getNeighborhoods = () => {
    const selectedCityData = citiesData.find(item => item.city === city);
    return selectedCityData ? selectedCityData.neighborhoods : [];
  };

  // Focus states
  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [addressFocused, setAddressFocused] = useState(false);
  const [cityFocused, setCityFocused] = useState(false);
  const [neighborhoodFocused, setNeighborhoodFocused] = useState(false);
  const [notesFocused, setNotesFocused] = useState(false);

  // Refs for scrolling to empty fields
  const scrollViewRef = useRef(null);
  const fullNameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const neighborhoodInputRef = useRef(null);

  const handleCompleteOrder = () => {
    // Validate required fields (all except email)
    let firstEmptyField = null;
    let errorMessage = 'يرجى ملء الحقول التالية:';

    if (!fullName.trim()) {
      firstEmptyField = fullNameInputRef;
      errorMessage += '\n• الاسم الكامل';
    }
    if (!phone.trim()) {
      if (!firstEmptyField) firstEmptyField = phoneInputRef;
      errorMessage += '\n• رقم الجوال';
    }
    if (!address.trim()) {
      if (!firstEmptyField) firstEmptyField = addressInputRef;
      errorMessage += '\n• العنوان';
    }
    if (!city.trim()) {
      errorMessage += '\n• المدينة';
      // Also show dropdown if city is empty
      if (!firstEmptyField) {
        setShowCityDropdown(true);
        setCityFocused(true);
      }
    }
    if (!neighborhood.trim()) {
      errorMessage += '\n• الحي';
      // Also show dropdown if neighborhood is empty
      if (!firstEmptyField) {
        setShowNeighborhoodDropdown(true);
        setNeighborhoodFocused(true);
      }
    }

    if (firstEmptyField) {
      // Show error message
      utils.toastAlert('error', 'حقول مطلوبة فارغة', errorMessage);

      // Focus first empty field
      setTimeout(() => {
        firstEmptyField.current?.focus();
      }, 300);
      return;
    }

    // Prepare complete order data
    const completeOrderData = {
      ...orderData,
      deliveryInfo: {
        fullName,
        phone,
        email,
        address,
        city,
        neighborhood,
        notes,
      },
      paymentMethod,
    };

    // Navigate to confirmation page
    navigation.navigate('ConfirmationPage', {orderData: completeOrderData});
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderOrderItem = (item, index) => (
    <View key={item.id || index} style={styles.orderItem}>
      <ImageBackground
        source={item.image}
        style={styles.orderItemImage}
        imageStyle={{borderRadius: RFValue(10)}}>
        {item.originalPrice > item.currentPrice && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              %
              {Math.round(
                ((item.originalPrice - item.currentPrice) /
                  item.originalPrice) *
                  100,
              )}
            </Text>
          </View>
        )}
      </ImageBackground>
      <View style={styles.orderItemInfo}>
        <Text style={styles.orderItemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.orderItemQuantity}>الكمية: {item.quantity}</Text>
        <Text style={styles.orderItemPrice}>
          {item.currentPrice * item.quantity} ر.س
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader
        title="إتمام الطلب"
        showBackButton={true}
        onBackPress={handleBackPress}
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
                source={Images.customCakeBg}
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
                      أكمل معلوماتك لإتمام الطلب
                    </Text>
                    <Text style={styles.heroSlideTitle}>
                      نحن هنا لخدمتك بأفضل طريقة
                    </Text>
                    <Text style={styles.heroSlideDescription}>
                      ملء المعلومات أدناه لإكمال طلبك
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

        <View style={styles.contentWrapper}>
          {/* Order Summary Section */}
          <View style={styles.summaryCard}>
            <View style={styles.sectionHeader}>
              <Icon name="receipt" size={RFValue(20)} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>ملخص الطلب</Text>
            </View>

            {/* Order Items */}
            <View style={styles.orderItemsList}>
              {cartItems.map((item, index) => renderOrderItem(item, index))}
            </View>

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

              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>الشحن:</Text>
                <Text style={styles.priceValue}>مجاني</Text>
              </View>

              <View style={[styles.priceRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>الإجمالي:</Text>
                <Text style={styles.totalValue}>{total} ر.س</Text>
              </View>
            </View>

            {/* Security Message */}
            <View style={styles.securityMessage}>
              <Icon name="lock" size={RFValue(14)} color={COLORS.primary} />
              <Text style={styles.securityText}>
                معلوماتك محمية ومشفرة. لن نشارك بياناتك مع أي طرف ثالث.
              </Text>
            </View>
          </View>

          {/* Delivery Info & Payment Section */}
          <View style={styles.formSection}>
            {/* Delivery Information Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Icon
                  name="map-marker"
                  size={RFValue(20)}
                  color={COLORS.primary}
                />
                <Text style={styles.sectionTitle}>معلومات التوصيل</Text>
              </View>

              {/* Full Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  <Text>الاسم الكامل</Text>
                  <Text style={styles.requiredStar}> *</Text>
                </Text>
                <View
                  style={[
                    styles.inputWrapper,
                    fullNameFocused && styles.inputWrapperFocused,
                  ]}>
                  <TextInput
                    ref={fullNameInputRef}
                    style={styles.input}
                    placeholder="أدخل اسمك الكامل"
                    placeholderTextColor={COLORS.grey60}
                    value={fullName}
                    onChangeText={setFullName}
                    onFocus={() => setFullNameFocused(true)}
                    onBlur={() => setFullNameFocused(false)}
                    textAlign="right"
                  />
                </View>
              </View>

              {/* Phone */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  <Text>رقم الجوال</Text>
                  <Text style={styles.requiredStar}> *</Text>
                </Text>
                <View
                  style={[
                    styles.inputWrapper,
                    phoneFocused && styles.inputWrapperFocused,
                  ]}>
                  <TextInput
                    ref={phoneInputRef}
                    style={styles.input}
                    placeholder="05xxxxxxxx"
                    placeholderTextColor={COLORS.grey60}
                    value={phone}
                    onChangeText={setPhone}
                    onFocus={() => setPhoneFocused(true)}
                    onBlur={() => setPhoneFocused(false)}
                    keyboardType="phone-pad"
                    textAlign="right"
                  />
                </View>
              </View>

              {/* Email */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>البريد الإلكتروني</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    emailFocused && styles.inputWrapperFocused,
                  ]}>
                  <TextInput
                    style={styles.input}
                    placeholder="example@email.com"
                    placeholderTextColor={COLORS.grey60}
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    keyboardType="email-address"
                    textAlign="right"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Address */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  <Text>العنوان</Text>
                  <Text style={styles.requiredStar}> *</Text>
                </Text>
                <View
                  style={[
                    styles.inputWrapper,
                    addressFocused && styles.inputWrapperFocused,
                  ]}>
                  <TextInput
                    ref={addressInputRef}
                    style={styles.input}
                    placeholder="أدخل عنوان التوصيل الكامل"
                    placeholderTextColor={COLORS.grey60}
                    value={address}
                    onChangeText={setAddress}
                    onFocus={() => setAddressFocused(true)}
                    onBlur={() => setAddressFocused(false)}
                    textAlign="right"
                    multiline
                  />
                </View>
              </View>

              {/* City & Neighborhood Row */}
              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.label}>
                    <Text>المدينة</Text>
                    <Text style={styles.requiredStar}> *</Text>
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.dropdown,
                      cityFocused && styles.dropdownFocused,
                    ]}
                    onPress={() => {
                      setShowCityDropdown(!showCityDropdown);
                      setShowNeighborhoodDropdown(false);
                      setCityFocused(true);
                    }}
                    activeOpacity={0.8}>
                    <Text
                      style={[
                        styles.dropdownText,
                        !city && styles.dropdownPlaceholder,
                      ]}>
                      {city || 'اختر المدينة'}
                    </Text>
                    <Icon
                      name={showCityDropdown ? 'chevron-up' : 'chevron-down'}
                      size={RFValue(20)}
                      color={cityFocused ? COLORS.primary : COLORS.grey60}
                    />
                  </TouchableOpacity>
                  {showCityDropdown && (
                    <View style={styles.dropdownList}>
                      <ScrollView
                        style={styles.dropdownScrollView}
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={true}
                        bounces={false}>
                        {cities.map((cityName, index) => (
                          <TouchableOpacity
                            key={index}
                            style={styles.dropdownItem}
                            onPress={() => {
                              setCity(cityName);
                              setNeighborhood(''); // Reset neighborhood when city changes
                              setShowCityDropdown(false);
                              setCityFocused(false);
                            }}
                            activeOpacity={0.7}>
                            <Text style={styles.dropdownItemText}>
                              {cityName}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>

                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.label}>
                    <Text>الحي</Text>
                    <Text style={styles.requiredStar}> *</Text>
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.dropdown,
                      neighborhoodFocused && styles.dropdownFocused,
                      !city && styles.dropdownDisabled,
                    ]}
                    onPress={() => {
                      if (city) {
                        setShowNeighborhoodDropdown(!showNeighborhoodDropdown);
                        setShowCityDropdown(false);
                        setNeighborhoodFocused(true);
                      }
                    }}
                    activeOpacity={0.8}
                    disabled={!city}>
                    <Text
                      style={[
                        styles.dropdownText,
                        !neighborhood && styles.dropdownPlaceholder,
                      ]}>
                      {neighborhood ||
                        (city ? 'اختر الحي' : 'اختر المدينة أولاً')}
                    </Text>
                    <Icon
                      name={
                        showNeighborhoodDropdown ? 'chevron-up' : 'chevron-down'
                      }
                      size={RFValue(20)}
                      color={
                        neighborhoodFocused && city
                          ? COLORS.primary
                          : COLORS.grey60
                      }
                    />
                  </TouchableOpacity>
                  {showNeighborhoodDropdown && city && (
                    <View style={styles.dropdownList}>
                      <ScrollView
                        style={styles.dropdownScrollView}
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={true}
                        bounces={false}>
                        {getNeighborhoods().map((neighborhoodName, index) => (
                          <TouchableOpacity
                            key={index}
                            style={styles.dropdownItem}
                            onPress={() => {
                              setNeighborhood(neighborhoodName);
                              setShowNeighborhoodDropdown(false);
                              setNeighborhoodFocused(false);
                            }}
                            activeOpacity={0.7}>
                            <Text style={styles.dropdownItemText}>
                              {neighborhoodName}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
              </View>

              {/* Additional Notes */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>ملاحظات إضافية (اختياري)</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    styles.textAreaWrapper,
                    notesFocused && styles.inputWrapperFocused,
                  ]}>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="أي ملاحظات أو تعليمات خاصة...."
                    placeholderTextColor={COLORS.grey60}
                    value={notes}
                    onChangeText={setNotes}
                    onFocus={() => setNotesFocused(true)}
                    onBlur={() => setNotesFocused(false)}
                    textAlign="right"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>
              </View>
            </View>

            {/* Payment Method Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Icon
                  name="credit-card"
                  size={RFValue(20)}
                  color={COLORS.primary}
                />
                <Text style={styles.sectionTitle}>طريقة الدفع</Text>
              </View>

              {/* Cash on Delivery */}
              <TouchableOpacity
                style={[
                  styles.paymentOption,
                  paymentMethod === 'cod' && styles.paymentOptionSelected,
                ]}
                onPress={() => setPaymentMethod('cod')}
                activeOpacity={0.85}>
                <View style={styles.paymentOptionContent}>
                  <View
                    style={[
                      styles.radioButton,
                      paymentMethod === 'cod' && styles.radioButtonSelected,
                    ]}>
                    {paymentMethod === 'cod' && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <View
                    style={[
                      styles.paymentIconWrapper,
                      paymentMethod === 'cod' && styles.paymentIconWrapperActive,
                    ]}>
                    <Icon
                      name="cash"
                      size={RFValue(22)}
                      color={
                        paymentMethod === 'cod' ? COLORS.primary : COLORS.grey60
                      }
                    />
                  </View>
                  <View style={styles.paymentOptionText}>
                    <Text style={styles.paymentOptionTitle}>
                      الدفع عند الاستلام
                    </Text>
                    <Text style={styles.paymentOptionDescription}>
                      ادفع نقداً عند استلام الطلب
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Card Payment */}
              <TouchableOpacity
                style={[
                  styles.paymentOption,
                  paymentMethod === 'card' && styles.paymentOptionSelected,
                ]}
                onPress={() => setPaymentMethod('card')}
                activeOpacity={0.85}>
                <View style={styles.paymentOptionContent}>
                  <View
                    style={[
                      styles.radioButton,
                      paymentMethod === 'card' && styles.radioButtonSelected,
                    ]}>
                    {paymentMethod === 'card' && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <View
                    style={[
                      styles.paymentIconWrapper,
                      paymentMethod === 'card' && styles.paymentIconWrapperActive,
                    ]}>
                    <Icon
                      name="credit-card"
                      size={RFValue(22)}
                      color={
                        paymentMethod === 'card'
                          ? COLORS.primary
                          : COLORS.grey60
                      }
                    />
                  </View>
                  <View style={styles.paymentOptionText}>
                    <Text style={styles.paymentOptionTitle}>
                      الدفع بالبطاقة
                    </Text>
                    <Text style={styles.paymentOptionDescription}>
                      الدفع الإلكتروني الآمن
                    </Text>
                  </View>
                </View>
                <View style={styles.paymentCardsContainer}>
                  <Image
                    source={Images.visa1}
                    style={styles.paymentCardLogo}
                    resizeMode="contain"
                  />
                  <Image
                    source={Images.mastercard1}
                    style={styles.paymentCardLogo}
                    resizeMode="contain"
                  />
                  <View style={[styles.paymentCardLogo, styles.madaContainer]}>
                    <MadaIcon
                      width={RFValue(65)}
                      height={RFValue(40)}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              {/* Installment Payment */}
              <TouchableOpacity
                style={[
                  styles.paymentOption,
                  paymentMethod === 'installment' &&
                    styles.paymentOptionSelected,
                ]}
                onPress={() => setPaymentMethod('installment')}
                activeOpacity={0.85}>
                <View style={styles.paymentOptionContent}>
                  <View
                    style={[
                      styles.radioButton,
                      paymentMethod === 'installment' &&
                        styles.radioButtonSelected,
                    ]}>
                    {paymentMethod === 'installment' && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <View
                    style={[
                      styles.paymentIconWrapper,
                      paymentMethod === 'installment' &&
                        styles.paymentIconWrapperActive,
                    ]}>
                    <Icon
                      name="calendar-clock"
                      size={RFValue(22)}
                      color={
                        paymentMethod === 'installment'
                          ? COLORS.primary
                          : COLORS.grey60
                      }
                    />
                  </View>
                  <View style={styles.paymentOptionText}>
                    <Text style={styles.paymentOptionTitle}>
                      الدفع بالتقسيط
                    </Text>
                    <Text style={styles.paymentOptionDescription}>
                      استخدام وسائل تقسيط المدفوعات المختلفة
                    </Text>
                  </View>
                </View>
                <View style={styles.paymentCardsContainer}>
                  <Image
                    source={Images.tabi1}
                    style={styles.paymentCardLogoLarge}
                    resizeMode="contain"
                  />
                  <Image
                    source={Images.tamara1}
                    style={styles.paymentCardLogoLarge}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Complete Order Button */}
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.completeOrderButton}
              onPress={handleCompleteOrder}
              activeOpacity={0.85}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.completeOrderGradient}>
                <View style={styles.buttonIconWrapper}>
                  <Icon name="check-circle" size={RFValue(16)} color="#fff" />
                </View>
                <Text style={styles.completeOrderText}>إتمام الطلب</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
