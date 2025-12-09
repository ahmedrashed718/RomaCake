import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  Animated,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FONTS, COLORS} from '../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.8;

export default function CartDrawer({
  visible,
  onClose,
  cartItems = [],
  onRemoveItem,
  onUpdateQuantity,
  onCompleteOrder,
  onContinueShopping,
}) {
  const slideAnim = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const backdropOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -DRAWER_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.currentPrice * item.quantity,
      0,
    );
  };

  const calculateDiscount = () => {
    return cartItems.reduce(
      (sum, item) =>
        sum + (item.originalPrice - item.currentPrice) * item.quantity,
      0,
    );
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const total = subtotal;

  // -------------------------------
  // 🔥 Improved Cart Item Component
  // -------------------------------
  const renderCartItem = (item, index) => (
    <View key={item.id || index} style={stylesImproved.card}>
      {/* Image */}
      <View style={stylesImproved.imageWrapper}>
        <ImageBackground
          source={item.image}
          style={stylesImproved.image}
          imageStyle={{borderRadius: RFValue(10)}}
        />

        {/* Discount Badge */}
        {item.originalPrice > item.currentPrice && (
          <View style={stylesImproved.discountBadge}>
            <Text style={stylesImproved.discountText}>
              %
              {Math.round(
                ((item.originalPrice - item.currentPrice) /
                  item.originalPrice) *
                  100,
              )}
            </Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={stylesImproved.info}>
        <Text style={stylesImproved.title} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={stylesImproved.priceRow}>
          <Text style={stylesImproved.originalPrice}>
            {item.originalPrice} ر.س
          </Text>
          <Text style={stylesImproved.currentPrice}>
            {item.currentPrice} ر.س
          </Text>
        </View>

        {/* Controls */}
        <View style={stylesImproved.controlsRow}>
          <View style={stylesImproved.quantityBox}>
            <TouchableOpacity
              onPress={() =>
                item.quantity > 1 &&
                onUpdateQuantity(item.id, item.quantity - 1)
              }
              style={stylesImproved.qtyBtn}>
              <Icon name="minus" size={RFValue(13)} color={COLORS.primary} />
            </TouchableOpacity>

            <Text style={stylesImproved.qtyText}>{item.quantity}</Text>

            <TouchableOpacity
              onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
              style={stylesImproved.qtyBtn}>
              <Icon name="plus" size={RFValue(13)} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => onRemoveItem(item.id)}
            style={stylesImproved.deleteBtn}>
            <Icon name="trash-can-outline" size={RFValue(16)} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={stylesImproved.subtotal}>
          المجموع: {item.currentPrice * item.quantity} ر.س
        </Text>
      </View>
    </View>
  );

  // -------------------------------
  // ----------- RETURN -------------
  // -------------------------------
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        {/* Backdrop */}
        <Animated.View style={[styles.backdrop, {opacity: backdropOpacity}]}>
          <TouchableOpacity
            style={styles.backdropTouchable}
            onPress={onClose}
          />
        </Animated.View>

        {/* Drawer */}
        <Animated.View
          style={[
            styles.drawerContainer,
            {transform: [{translateX: slideAnim}]},
          ]}>
          <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Icon name="cart" size={RFValue(14)} color="#E23D88" />
                <Text style={styles.headerTitle}>سلة التسوق</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartItems.length}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Icon name="close" size={RFValue(18)} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Cart List */}
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}>
              {cartItems.length > 0 ? (
                cartItems.map(renderCartItem)
              ) : (
                <View style={styles.emptyCart}>
                  <Icon
                    name="cart-off"
                    size={RFValue(60)}
                    color={COLORS.primary300}
                  />
                  <Text style={styles.emptyCartText}>السلة فارغة</Text>
                </View>
              )}

              {/* Order Summary */}
              {cartItems.length > 0 && (
                <View style={styles.orderSummary}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>المجموع الفرعي:</Text>
                    <Text style={styles.summaryValue}>{subtotal} ر.س</Text>
                  </View>

                  {discount > 0 && (
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>الخصم:</Text>
                      <Text style={[styles.summaryValue, styles.discountValue]}>
                        -{discount} ر.س
                      </Text>
                    </View>
                  )}

                  <View style={[styles.summaryRow, styles.totalRow]}>
                    <Text style={styles.totalLabel}>الإجمالي:</Text>
                    <Text style={styles.totalValue}>{total} ر.س</Text>
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Bottom Actions */}
            {cartItems.length > 0 && (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.completeOrderButton}
                  onPress={onCompleteOrder}
                  activeOpacity={0.85}>
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.secondary]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.completeOrderGradient}>
                    <View style={styles.completeOrderIconWrapper}>
                      <Icon name="check-circle" size={RFValue(16)} color="#fff" />
                    </View>
                    <Text style={styles.completeOrderText}>إتمام الطلب</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.continueShoppingButton}
                  onPress={onContinueShopping || onClose}>
                  <Text style={styles.continueShoppingText}>متابعة التسوق</Text>
                </TouchableOpacity>
              </View>
            )}
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}

// -------------------------------
// 🔥 Improved Card Styles
// -------------------------------
const stylesImproved = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: RFValue(10),
    borderRadius: RFValue(12),
    marginBottom: RFValue(12),
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
  },

  imageWrapper: {
    width: RFValue(85),
    height: RFValue(85),
    borderRadius: RFValue(10),
    overflow: 'hidden',
    backgroundColor: '#F7F7F7',
    marginRight: RFValue(10),
  },

  image: {width: '100%', height: '100%'},

  discountBadge: {
    position: 'absolute',
    top: RFValue(6),
    left: RFValue(6),
    backgroundColor: COLORS.secondary,
    paddingHorizontal: RFValue(6),
    paddingVertical: RFValue(2),
    borderRadius: RFValue(6),
  },

  discountText: {
    color: '#fff',
    fontSize: RFValue(10),
    fontFamily: FONTS.fontFamilyBold,
  },

  info: {
    flex: 1,
    justifyContent: 'space-between',
  },

  title: {
    fontSize: RFValue(13),
    fontFamily: FONTS.fontFamilyBold,
    color: '#333',
    lineHeight: RFValue(18),
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFValue(4),
    gap: RFValue(6),
  },

  originalPrice: {
    fontSize: RFValue(11),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#999',
    textDecorationLine: 'line-through',
  },

  currentPrice: {
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.primary,
  },

  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: RFValue(8),
  },

  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF2F6',
    paddingHorizontal: RFValue(8),
    paddingVertical: RFValue(4),
    borderRadius: RFValue(8),
  },

  qtyBtn: {
    padding: RFValue(4),
  },

  qtyText: {
    fontSize: RFValue(13),
    fontFamily: FONTS.fontFamilyBold,
    color: '#333',
    marginHorizontal: RFValue(6),
  },

  deleteBtn: {
    backgroundColor: COLORS.secondary,
    padding: RFValue(6),
    borderRadius: RFValue(10),
  },

  subtotal: {
    marginTop: RFValue(6),
    fontSize: RFValue(12),
    fontFamily: FONTS.fontFamilyMedium,
    color: '#555',
  },
});

// -------------------------------
// Existing Styles (No Change)
// -------------------------------
const styles = StyleSheet.create({
  modalContainer: {flex: 1},
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backdropTouchable: {flex: 1},
  drawerContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#fff',
    borderTopLeftRadius: RFValue(12),
    borderBottomLeftRadius: RFValue(12),
    elevation: 8,
  },
  safeArea: {flex: 1},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(8),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  headerContent: {flexDirection: 'row', alignItems: 'center', gap: RFValue(5)},
  headerTitle: {
    fontSize: RFValue(15),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.primary,
  },
  badge: {
    backgroundColor: COLORS.secondary,
    borderRadius: RFValue(8),
    minWidth: RFValue(18),
    height: RFValue(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: RFValue(9),
    color: '#fff',
    fontFamily: FONTS.fontFamilyBold,
  },
  closeButton: {padding: RFValue(3)},
  scrollView: {flex: 1},
  scrollContent: {padding: RFValue(10)},
  emptyCart: {alignItems: 'center', paddingVertical: RFValue(200)},
  emptyCartText: {
    fontSize: RFValue(15),
    fontFamily: FONTS.fontFamilyMedium,
    color: COLORS.primary300,
    marginTop: RFValue(10),
  },
  orderSummary: {
    backgroundColor: '#F9F9F9',
    borderRadius: RFValue(8),
    padding: RFValue(10),
    marginTop: RFValue(6),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: RFValue(6),
  },
  summaryLabel: {
    fontSize: RFValue(11),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#666',
  },
  summaryValue: {fontSize: RFValue(11), fontFamily: FONTS.fontFamilyBold},
  discountValue: {color: COLORS.secondary},
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: RFValue(6),
  },
  totalLabel: {fontSize: RFValue(13), fontFamily: FONTS.fontFamilyBold},
  totalValue: {
    fontSize: RFValue(15),
    color: COLORS.primary,
    fontFamily: FONTS.fontFamilyBold,
  },

  actionButtons: {padding: RFValue(10), gap: RFValue(8)},
  completeOrderButton: {
    borderRadius: RFValue(10),
    overflow: 'hidden',
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  completeOrderGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(15),
    gap: RFValue(8),
  },
  completeOrderIconWrapper: {
    width: RFValue(24),
    height: RFValue(24),
    borderRadius: RFValue(12),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeOrderText: {
    fontSize: RFValue(14),
    color: '#fff',
    fontFamily: FONTS.fontFamilyBold,
    letterSpacing: 0.3,
  },
  continueShoppingButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: RFValue(10),
    borderRadius: RFValue(8),
    alignItems: 'center',
  },
  continueShoppingText: {
    fontSize: RFValue(13),
    color: COLORS.primary,
    fontFamily: FONTS.fontFamilyBold,
  },
});
