import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  TextInput,
  Animated,
} from 'react-native';
import {FONTS, COLORS, Images} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';
import AppHeader from '../../../components/AppHeader';
import Svg, {Path} from 'react-native-svg';
import styles from './style';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const HERO_HEIGHT = SCREEN_HEIGHT * 0.28;

export default function CartPage() {
  const navigation = useNavigation();
  const route = useRoute();

  // Get cart items from route params or use default
  const initialCartItems = route.params?.cartItems || [
    {
      id: '1',
      title: 'ترایبل رویال',
      image: Images.cake1,
      originalPrice: 670,
      currentPrice: 670,
      quantity: 2,
      size: null,
    },
    {
      id: '2',
      title: 'ميني رولز',
      image: Images.cake2,
      originalPrice: 290,
      currentPrice: 290,
      quantity: 1,
      size: null,
    },
    {
      id: '3',
      title: 'جاتوه سواریه',
      image: Images.cake3,
      originalPrice: 250,
      currentPrice: 250,
      quantity: 1,
      size: 'وسط',
    },
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [discountCode, setDiscountCode] = useState('');
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [orderNote, setOrderNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [favorites, setFavorites] = useState({});

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleRemoveCartItem = itemId => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleUpdateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? {...item, quantity: newQuantity} : item,
      ),
    );
  };

  const handleToggleFavorite = itemId => {
    setFavorites(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.currentPrice * item.quantity,
      0,
    );
  };

  const calculateVAT = () => {
    const subtotal = calculateSubtotal();
    return Math.round(subtotal * 0.15);
  };

  const calculateShipping = () => {
    return 25; // رسوم الشحن الثابتة
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const vat = calculateVAT();
    const shipping = calculateShipping();
    return subtotal + vat + shipping;
  };

  const handleCompleteOrder = () => {
    const subtotal = calculateSubtotal();
    const vat = calculateVAT();
    const shipping = calculateShipping();
    const total = calculateTotal();

    const orderData = {
      cartItems: cartItems,
      subtotal: subtotal,
      vat: vat,
      shipping: shipping,
      total: total,
      discountCode: discountCode,
      orderNote: orderNote,
    };

    navigation.navigate('CheckoutPage', {orderData});
  };

  const subtotal = calculateSubtotal();
  const vat = calculateVAT();
  const shipping = calculateShipping();
  const total = calculateTotal();

  const renderCartItem = (item, index) => (
    <View key={item.id || index} style={styles.cartItemCard}>
      {/* Decorative Top Border */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.cardTopBorder}
      />

      {/* Main Content */}
      <View style={styles.cardContent}>
        {/* Image Section */}
        <View style={styles.imageWrapper}>
          <ImageBackground
            source={item.image}
            style={styles.cartItemImage}
            imageStyle={{borderRadius: RFValue(10), resizeMode: 'cover'}}
          />
          {item.size && (
            <View style={styles.sizeBadge}>
              <Icon name="ruler" size={RFValue(7)} color="#fff" />
              <Text style={styles.sizeBadgeText}>{item.size}</Text>
            </View>
          )}
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
            <Text style={styles.cartItemTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <TouchableOpacity
              style={[
                styles.favoriteBtn,
                favorites[item.id] && styles.favoriteBtnActive,
              ]}
              onPress={() => handleToggleFavorite(item.id)}
              activeOpacity={0.7}>
              <Icon
                name={favorites[item.id] ? 'heart' : 'heart-outline'}
                size={RFValue(14)}
                color={favorites[item.id] ? '#fff' : '#FF6B9D'}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.priceInfoRow}>
            <View style={styles.unitPriceContainer}>
              <Text style={styles.unitPriceLabel}>سعر الوحدة</Text>
              <Text style={styles.unitPriceValue}>
                {item.currentPrice.toLocaleString()} ر.س
              </Text>
            </View>
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalPriceLabel}>المجموع</Text>
              <Text style={styles.totalPriceValue}>
                {(item.currentPrice * item.quantity).toLocaleString()} ر.س
              </Text>
            </View>
          </View>

          {/* Controls Row */}
          <View style={styles.controlsRow}>
            <View style={styles.quantityBox}>
              <TouchableOpacity
                onPress={() =>
                  handleUpdateCartQuantity(item.id, item.quantity - 1)
                }
                style={[
                  styles.qtyBtn,
                  styles.qtyBtnMinus,
                  item.quantity === 1 && styles.qtyBtnDisabled,
                ]}
                activeOpacity={0.6}
                disabled={item.quantity === 1}>
                <View style={styles.qtyBtnInner}>
                  <Icon
                    name="minus"
                    size={RFValue(10)}
                    color={item.quantity === 1 ? '#CCC' : COLORS.primary}
                  />
                </View>
              </TouchableOpacity>

              <View style={styles.qtyNumberContainer}>
                <Text style={styles.qtyText}>{item.quantity}</Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  handleUpdateCartQuantity(item.id, item.quantity + 1)
                }
                style={[styles.qtyBtn, styles.qtyBtnPlus]}
                activeOpacity={0.6}>
                <View style={styles.qtyBtnInner}>
                  <Icon name="plus" size={RFValue(10)} color={COLORS.primary} />
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => handleRemoveCartItem(item.id)}
              style={styles.deleteBtn}
              activeOpacity={0.8}>
              <Icon name="trash-can-outline" size={RFValue(14)} color="#FF4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader
        title="عربيه التسوق"
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
            <ImageBackground
              source={Images.cartHero}
              style={styles.heroBackground}
              imageStyle={styles.heroBackgroundImage}>
              <LinearGradient
                colors={[
                  'rgba(0, 0, 0, 0.05)',
                  'rgba(0, 0, 0, 0.05)',
                  'rgba(146, 39, 88, 0.15)',
                ]}
                style={styles.heroGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}>
                <View style={styles.heroContent}>
                  <Text style={styles.heroTitle}>سلة مشترياتي</Text>
                  <Text style={styles.heroDescription}>
                    راجع طلبك قبل الإتمام
                  </Text>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>

          {/* Decorative Wave SVG */}
          <View style={styles.waveContainer}>
            <Svg
              width={SCREEN_WIDTH}
              height={RFValue(70)}
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
          {/* Two Column Layout */}
          <View style={styles.twoColumnLayout}>
            {/* Right Column: Cart Items */}
            <View style={styles.rightColumn}>
              {/* Section Header with Icon */}
              <View style={styles.cartSectionHeader}>
                <View style={styles.cartSectionHeaderContent}>
                  <View style={styles.cartIconWrapper}>
                    <Icon name="cart" size={RFValue(20)} color="#fff" />
                  </View>
                  <Text style={styles.cartSectionTitle}>سلة المشتريات</Text>
                </View>
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
                </View>
              </View>

              {cartItems.length > 0 ? (
                <View style={styles.cartItemsList}>
                  {cartItems.map((item, index) => renderCartItem(item, index))}
                </View>
              ) : (
                <View style={styles.emptyCart}>
                  <Icon
                    name="cart-off"
                    size={RFValue(80)}
                    color={COLORS.primary300}
                  />
                  <Text style={styles.emptyCartText}>السلة فارغة</Text>
                  <Text style={styles.emptyCartSubtext}>
                    ابدأ بإضافة المنتجات إلى السلة
                  </Text>
                  <TouchableOpacity
                    style={styles.continueShoppingButton}
                    onPress={handleBackPress}
                    activeOpacity={0.8}>
                    <Text style={styles.continueShoppingText}>
                      متابعة التسوق
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Left Column: Order Summary */}
            <View style={styles.leftColumn}>
              <View style={styles.summaryCard}>
                <View style={styles.sectionHeader}>
                  <Icon
                    name="receipt"
                    size={RFValue(18)}
                    color={COLORS.primary}
                  />
                  <Text style={styles.sectionTitle}>ملخص الطلب</Text>
                </View>

                <View style={styles.summaryContent}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>المجموع الفرعي:</Text>
                    <Text style={styles.summaryValue}>
                      {subtotal.toLocaleString()} ر.س
                    </Text>
                  </View>

                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>
                      ضريبة القيمة المضافة (15%):
                    </Text>
                    <Text style={styles.summaryValue}>
                      {vat.toLocaleString()} ر.س
                    </Text>
                  </View>

                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>
                      رسوم الشحن (داخل السعودية):
                    </Text>
                    <Text style={styles.summaryValue}>
                      {shipping.toLocaleString()} ر.س
                    </Text>
                  </View>

                  <View style={[styles.summaryRow, styles.totalRow]}>
                    <Text style={styles.totalLabel}>الإجمالي:</Text>
                    <Text style={styles.totalValue}>
                      {total.toLocaleString()} ر.س
                    </Text>
                  </View>
                </View>

                {/* Discount Code Button */}
                <TouchableOpacity
                  style={styles.discountButton}
                  onPress={() => setShowDiscountInput(!showDiscountInput)}
                  activeOpacity={0.8}>
                  <View style={styles.actionButtonContent}>
                    <Icon
                      name="gift"
                      size={RFValue(16)}
                      color="#4A90A4"
                    />
                    <Text style={styles.discountButtonText}>إضافة كود الخصم</Text>
                    <Icon
                      name="plus"
                      size={RFValue(14)}
                      color="#4A90A4"
                    />
                  </View>
                </TouchableOpacity>

                {showDiscountInput && (
                  <View style={styles.inputContainer}>
                    <View style={styles.discountRow}>
                      <TextInput
                        style={styles.discountInput}
                        placeholder="أدخل كود الخصم"
                        placeholderTextColor={COLORS.grey60}
                        value={discountCode}
                        onChangeText={setDiscountCode}
                        textAlign="right"
                      />
                      <TouchableOpacity
                        style={styles.applyDiscountButton}
                        onPress={() => {
                          // Handle discount code application
                          if (discountCode.trim()) {
                            // Apply discount logic here
                            console.log('Applying discount:', discountCode);
                          }
                        }}
                        activeOpacity={0.7}>
                        <Icon
                          name="check-circle"
                          size={RFValue(16)}
                          color="#fff"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {/* Order Note Button */}
                <TouchableOpacity
                  style={styles.noteButton}
                  onPress={() => setShowNoteInput(!showNoteInput)}
                  activeOpacity={0.8}>
                  <View style={styles.actionButtonContent}>
                    <Icon
                      name="note-text"
                      size={RFValue(16)}
                      color="#FF6B9D"
                    />
                    <Text style={styles.noteButtonText}>
                      إضافة ملاحظة للطلب
                    </Text>
                    <Icon
                      name="plus"
                      size={RFValue(14)}
                      color="#FF6B9D"
                    />
                  </View>
                </TouchableOpacity>

                {showNoteInput && (
                  <View style={styles.noteInputContainer}>
                    <TextInput
                      style={styles.noteInput}
                      placeholder="أكتب ملاحظاتك هنا... (مثلاً: بدون مكسرات، وقت تسليم محدد)"
                      placeholderTextColor={COLORS.grey60}
                      value={orderNote}
                      onChangeText={setOrderNote}
                      textAlign="right"
                      multiline
                      numberOfLines={4}
                      textAlignVertical="top"
                    />
                  </View>
                )}

                {/* Order Now Button */}
                <TouchableOpacity
                  style={styles.orderNowButton}
                  onPress={handleCompleteOrder}
                  activeOpacity={0.85}
                  disabled={cartItems.length === 0}>
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.secondary]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.orderNowGradient}>
                    <Icon name="shopping" size={RFValue(16)} color="#fff" />
                    <Text style={styles.orderNowText}>اطلب الآن</Text>
                    <Icon name="arrow-left" size={RFValue(14)} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>

                {/* Delivery Info */}
                <View style={styles.deliveryInfo}>
                  <Icon
                    name="truck-delivery"
                    size={RFValue(16)}
                    color={COLORS.primary}
                  />
                  <Text style={styles.deliveryText}>
                    توصيل خلال 24-48 ساعة داخل السعودية – متوقع الخميس، ٢٠ جمادى
                    الآخرة
                  </Text>
                </View>

                {/* Disclaimer */}
                <Text style={styles.disclaimer}>
                  الأسعار بالريال السعودي وتشمل ضريبة القيمة المضافة. قد تختلف
                  رسوم الشحن حسب المدينة.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
