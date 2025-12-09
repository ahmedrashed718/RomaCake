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
const DRAWER_WIDTH = SCREEN_WIDTH * 0.75;

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

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const total = calculateTotal();

  const renderCartItem = (item, index) => (
    <View key={item.id || index} style={styles.cartItemCard}>
      <View style={styles.cartItemContent}>
        <View style={styles.cartItemInfo}>
          <Text style={styles.cartItemTitle}>{item.title}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.originalPrice}>{item.originalPrice} ر.س</Text>
            <Text style={styles.currentPrice}>{item.currentPrice} ر.س</Text>
          </View>
          <View style={styles.quantityRow}>
            <View style={styles.quantityActions}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onRemoveItem && onRemoveItem(item.id)}
                activeOpacity={0.7}>
                <Icon
                  name="delete-outline"
                  size={RFValue(14)}
                  color="#E23D88"
                />
              </TouchableOpacity>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() =>
                    onUpdateQuantity &&
                    item.quantity > 1 &&
                    onUpdateQuantity(item.id, item.quantity - 1)
                  }
                  activeOpacity={0.7}>
                  <Icon name="minus" size={RFValue(12)} color="#E23D88" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() =>
                    onUpdateQuantity &&
                    onUpdateQuantity(item.id, item.quantity + 1)
                  }
                  activeOpacity={0.7}>
                  <Icon name="plus" size={RFValue(12)} color="#E23D88" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={styles.itemSubtotal}>
            المجموع: {item.currentPrice * item.quantity} ر.س
          </Text>
        </View>
        <View style={styles.cartItemImageContainer}>
          <ImageBackground
            source={item.image}
            style={styles.cartItemImage}
            imageStyle={styles.cartItemImageStyle}
          />
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: backdropOpacity,
            },
          ]}>
          <TouchableOpacity
            style={styles.backdropTouchable}
            activeOpacity={1}
            onPress={onClose}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.drawerContainer,
            {
              transform: [{translateX: slideAnim}],
            },
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
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
                activeOpacity={0.7}>
                <Icon name="close" size={RFValue(18)} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Cart Items */}
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => renderCartItem(item, index))
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

            {/* Action Buttons */}
            {cartItems.length > 0 && (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.completeOrderButton}
                  onPress={onCompleteOrder}
                  activeOpacity={0.8}>
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.secondary]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.completeOrderGradient}>
                    <Icon name="credit-card" size={RFValue(12)} color="#fff" />
                    <Text style={styles.completeOrderText}>إتمام الطلب</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.continueShoppingButton}
                  onPress={onContinueShopping || onClose}
                  activeOpacity={0.8}>
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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropTouchable: {
    flex: 1,
  },
  drawerContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#fff',
    borderTopLeftRadius: RFValue(12),
    borderBottomLeftRadius: RFValue(12),
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 0},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(8),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(5),
  },
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
    paddingHorizontal: RFValue(4),
  },
  badgeText: {
    fontSize: RFValue(9),
    fontFamily: FONTS.fontFamilyBold,
    color: '#fff',
  },
  closeButton: {
    padding: RFValue(3),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: RFValue(10),
    paddingBottom: RFValue(12),
  },
  cartItemCard: {
    backgroundColor: '#fff',
    borderRadius: RFValue(10),
    borderWidth: 1,
    borderColor: '#FFE5F0',
    marginBottom: RFValue(10),
    padding: RFValue(12),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  cartItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: RFValue(10),
  },
  cartItemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cartItemTitle: {
    fontSize: RFValue(13),
    fontFamily: FONTS.fontFamilyBold,
    color: '#333',
    marginBottom: RFValue(6),
    lineHeight: RFValue(18),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(6),
    marginBottom: RFValue(8),
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
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: RFValue(6),
  },
  quantityActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(8),
  },
  deleteButton: {
    padding: RFValue(3),
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F9',
    borderRadius: RFValue(5),
    paddingHorizontal: RFValue(5),
    paddingVertical: RFValue(2),
    gap: RFValue(6),
  },
  quantityButton: {
    padding: RFValue(2),
  },
  quantityText: {
    fontSize: RFValue(13),
    fontFamily: FONTS.fontFamilyBold,
    color: '#333',
    minWidth: RFValue(22),
    textAlign: 'center',
  },
  itemSubtotal: {
    fontSize: RFValue(11),
    fontFamily: FONTS.fontFamilyMedium,
    color: '#666',
    marginTop: RFValue(4),
  },
  cartItemImageContainer: {
    width: RFValue(80),
    height: RFValue(80),
    borderRadius: RFValue(8),
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  cartItemImage: {
    width: '100%',
    height: '100%',
  },
  cartItemImageStyle: {
    resizeMode: 'cover',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: RFValue(200),
  },
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
    alignItems: 'center',
    marginBottom: RFValue(6),
  },
  summaryLabel: {
    fontSize: RFValue(11),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#666',
  },
  summaryValue: {
    fontSize: RFValue(11),
    fontFamily: FONTS.fontFamilyBold,
    color: '#333',
  },
  discountValue: {
    color: COLORS.secondary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: RFValue(6),
    marginTop: RFValue(3),
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: RFValue(13),
    fontFamily: FONTS.fontFamilyBold,
    color: '#333',
  },
  totalValue: {
    fontSize: RFValue(15),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.primary,
  },
  actionButtons: {
    padding: RFValue(10),
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: RFValue(8),
  },
  completeOrderButton: {
    borderRadius: RFValue(8),
    overflow: 'hidden',
  },
  completeOrderGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: RFValue(10),
    gap: RFValue(5),
  },
  completeOrderText: {
    fontSize: RFValue(13),
    fontFamily: FONTS.fontFamilyBold,
    color: '#fff',
  },
  continueShoppingButton: {
    backgroundColor: '#fff',
    borderRadius: RFValue(8),
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: RFValue(10),
    alignItems: 'center',
  },
  continueShoppingText: {
    fontSize: RFValue(13),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.primary,
  },
});
