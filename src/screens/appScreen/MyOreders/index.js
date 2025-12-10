import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {COLORS, Images} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppHeader, ConfirmModal} from '../../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import images from '../../../constants/images';


// Status colors constants
const STATUS_COLORS = {
  cancelled: {
    bg: '#FFEBEE',
    border: '#FFCDD2',
    text: '#F44336',
    icon: 'close-circle',
  },
  completed: {
    bg: '#E8F5E9',
    border: '#C8E6C9',
    text: '#4CAF50',
    icon: 'check-circle',
  },
  preparing: {
    bg: '#FFF9C4',
    border: '#FFE082',
    text: '#F9A825',
    icon: 'clock-outline',
  },
};

// Enhanced orders data with more details
const ORDERS_DATA = [
  {
    id: '12345',
    date: '15 نوفمبر 2025',
    time: '10:30 صباحاً',
    total: 240,
    itemsCount: 3,
    status: 'preparing',
    image: Images.cake1,
    address: 'الرياض - حي النخيل - شارع الملك خالد - فيلا ٢٢',
    paymentMethod: 'مدفوع أونلاين',
    items: [
      {name: 'كيكة الشوكولاتة الفاخرة', quantity: 1, price: 150},
      {name: 'كب كيك الفراولة', quantity: 2, price: 90},
    ],
  },
  {
    id: '12312',
    date: '10 نوفمبر 2025',
    time: '02:15 مساءً',
    total: 180,
    itemsCount: 2,
    status: 'preparing',
    image: Images.cake2,
    address: 'الرياض - حي الازدهار - شارع الأمير سعود',
    paymentMethod: 'الدفع عند الاستلام',
    items: [
      {name: 'كيكة الفانيليا الكلاسيكية', quantity: 1, price: 120},
      {name: 'كب كيك الشوكولاتة', quantity: 1, price: 60},
    ],
  },
  {
    id: '12280',
    date: '02 نوفمبر 2025',
    time: '08:45 صباحاً',
    total: 90,
    itemsCount: 1,
    status: 'preparing',
    image: images.cake5,
    address: 'الرياض - حي الملقا',
    paymentMethod: 'مدفوع أونلاين',
    items: [{name: 'كب كيك الورد', quantity: 1, price: 90}],
  },
  {
    id: '12250',
    date: '28 أكتوبر 2025',
    time: '06:20 مساءً',
    total: 320,
    itemsCount: 4,
    status: 'completed',
    image: Images.cake3,
    address: 'الرياض - حي النخيل - شارع الملك خالد - فيلا ٢٢',
    paymentMethod: 'مدفوع أونلاين',
    items: [
      {name: 'كيكة التوت الأحمر', quantity: 1, price: 200},
      {name: 'كب كيك الفانيليا', quantity: 3, price: 120},
    ],
  },
  {
    id: '12200',
    date: '20 أكتوبر 2025',
    time: '11:00 صباحاً',
    total: 150,
    itemsCount: 2,
    status: 'cancelled',
    image: Images.cake6,
    address: 'الرياض - حي الملقا',
    paymentMethod: 'مدفوع أونلاين (تم الاسترجاع)',
    items: [
      {name: 'كيكة الشوكولاتة', quantity: 1, price: 100},
      {name: 'كب كيك الفراولة', quantity: 1, price: 50},
    ],
  },
];

export default function MyOrders() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderQuantities, setOrderQuantities] = useState({});
  const [showReorderConfirm, setShowReorderConfirm] = useState(false);
  const [orderToReorder, setOrderToReorder] = useState(null);

  // Calculate status counts
  const statusCounts = {
    all: ORDERS_DATA.length,
    preparing: 2,
    completed: 3,
    cancelled: 1,
  };
  //ddummy data make it calculate later

  // Filter orders based on active filter
  const filteredOrders =
    activeFilter === 'all'
      ? ORDERS_DATA
      : ORDERS_DATA.filter(order => order.status === activeFilter);

  const getStatusColor = status => {
    return STATUS_COLORS[status] || STATUS_COLORS.preparing;
  };

  const getStatusLabel = status => {
    switch (status) {
      case 'completed':
        return 'مكتمل';
      case 'preparing':
        return 'قيد التحضير';
      case 'cancelled':
        return 'ملغي';
      default:
        return 'الكل';
    }
  };

  const handleViewDetails = order => {
    console.log('Opening modal for order:', order);
    setSelectedOrder(order);
    // Initialize quantities with order items
    const quantities = {};
    if (order.items && order.items.length > 0) {
      order.items.forEach((item, index) => {
        quantities[index] = item.quantity || 1;
      });
    }
    setOrderQuantities(quantities);
    setShowOrderModal(true);
  };

  const handleQuantityChange = (index, change) => {
    setOrderQuantities(prev => {
      const newQuantities = {...prev};
      const newValue = (newQuantities[index] || 1) + change;
      newQuantities[index] = Math.max(1, newValue);
      return newQuantities;
    });
  };

  const calculateModalTotal = () => {
    if (!selectedOrder) {
      return 0;
    }
    return selectedOrder.items.reduce((total, item, index) => {
      const quantity = orderQuantities[index] || item.quantity;
      return total + item.price * quantity;
    }, 0);
  };

  const handleReorder = () => {
    // Handle reorder logic here
    console.log('Reorder with quantities:', orderQuantities);
    setShowOrderModal(false);
  };

  const handleReorderFromCard = order => {
    setOrderToReorder(order);
    setShowReorderConfirm(true);
  };

  const handleConfirmReorder = () => {
    // Handle reorder logic here
    console.log('Confirm reorder for order:', orderToReorder);
    setShowReorderConfirm(false);
    setOrderToReorder(null);
  };

  const handleCancelReorder = () => {
    setShowReorderConfirm(false);
    setOrderToReorder(null);
  };

  const renderOrderCard = order => {
    const statusColor = getStatusColor(order.status);
    const statusLabel = getStatusLabel(order.status);

    return (
      <TouchableOpacity
        key={order.id}
        style={styles.orderCard}
        activeOpacity={0.9}>
        {/* Status Badge */}
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: statusColor.bg,
                borderColor: statusColor.border,
              },
            ]}>
            <Icon
              name={statusColor.icon}
              size={RFValue(14)}
              color={statusColor.text}
              style={styles.statusIcon}
            />
            <Text style={[styles.statusText, {color: statusColor.text}]}>
              {statusLabel}
            </Text>
          </View>
          <Text style={styles.orderId}>#{order.id}</Text>
        </View>

        {/* Order Content */}
        <View style={styles.orderContent}>
          {/* Image Section */}
          <View style={styles.imageSection}>
            {order.image ? (
              <Image source={order.image} style={styles.orderImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Icon
                  name="cake-variant-outline"
                  size={RFValue(40)}
                  color={COLORS.grey60}
                />
              </View>
            )}
          </View>

          {/* Info Section */}
          <View style={styles.infoSection}>
            {/* Date and Time */}
            <View style={styles.dateTimeRow}>
            <Icon
              name="calendar-clock"
              size={RFValue(12)}
              color={COLORS.grey60}
            />
              <Text style={styles.dateText}>
                {order.date} • {order.time}
              </Text>
            </View>

            {/* Items Count */}
            <View style={styles.metaRow}>
              <Icon
                name="package-variant"
                size={RFValue(12)}
                color={COLORS.primary}
              />
              <Text style={styles.itemsText}>
                {order.itemsCount} {order.itemsCount === 1 ? 'منتج' : 'منتجات'}
              </Text>
            </View>

            {/* Total Price */}
            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>الإجمالي:</Text>
              <Text style={styles.totalPrice}>{order.total} ر.س</Text>
            </View>
          </View>
        </View>

        {/* Address and Payment */}
        <View style={styles.detailsSection}>
          <View style={styles.detailItem}>
            <Icon
              name="map-marker-outline"
              size={RFValue(12)}
              color={COLORS.primary}
            />
            <Text style={styles.detailText} numberOfLines={1}>
              {order.address}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Icon
              name="credit-card-outline"
              size={RFValue(12)}
              color={COLORS.primary}
            />
            <Text style={styles.detailText}>{order.paymentMethod}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.viewDetailsBtn}
            activeOpacity={0.7}
            onPress={() => handleViewDetails(order)}>
            <Icon
              name="eye-outline"
              size={RFValue(12)}
              color={COLORS.primary}
            />
            <Text style={styles.viewDetailsBtnText}>عرض التفاصيل</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.reorderBtn}
            activeOpacity={0.8}
            onPress={() => handleReorderFromCard(order)}>
            <Icon name="refresh" size={RFValue(12)} color={COLORS.white} />
            <Text style={styles.reorderBtnText}>إعادة الطلب</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader title="طلباتك" showIcons={true} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          {/* Status Summary Cards with Total */}
          <View style={styles.statusSummary}>
            {/* الكل */}
            <TouchableOpacity
              style={[
                styles.totalOrdersCard,
                activeFilter === 'all' && styles.statusCardActive,
              ]}
              activeOpacity={0.8}
              onPress={() => setActiveFilter('all')}>
              <Text style={styles.totalOrdersCount}>{statusCounts.all}</Text>
              <Text style={styles.totalOrdersLabel}>الكل</Text>
            </TouchableOpacity>

            {/* قيد التحضير */}
            <TouchableOpacity
              style={[
                styles.statusCard,
                {
                  backgroundColor: STATUS_COLORS.preparing.bg,
                  borderColor: STATUS_COLORS.preparing.border,
                },
                activeFilter === 'preparing' && styles.statusCardActive,
              ]}
              activeOpacity={0.8}
              onPress={() => setActiveFilter('preparing')}>
              <Text
                style={[
                  styles.statusCardCount,
                  {color: STATUS_COLORS.preparing.text},
                ]}>
                {statusCounts.preparing}
              </Text>
              <Text
                style={[
                  styles.statusCardLabel,
                  {color: STATUS_COLORS.preparing.text},
                ]}>
                قيد التحضير
              </Text>
            </TouchableOpacity>

            {/* مكتمل */}
            <TouchableOpacity
              style={[
                styles.statusCard,
                {
                  backgroundColor: STATUS_COLORS.completed.bg,
                  borderColor: STATUS_COLORS.completed.border,
                },
                activeFilter === 'completed' && styles.statusCardActive,
              ]}
              activeOpacity={0.8}
              onPress={() => setActiveFilter('completed')}>
              <Text
                style={[
                  styles.statusCardCount,
                  {color: STATUS_COLORS.completed.text},
                ]}>
                {statusCounts.completed}
              </Text>
              <Text
                style={[
                  styles.statusCardLabel,
                  {color: STATUS_COLORS.completed.text},
                ]}>
                مكتمل
              </Text>
            </TouchableOpacity>

            {/* ملغي */}
            <TouchableOpacity
              style={[
                styles.statusCard,
                {
                  backgroundColor: STATUS_COLORS.cancelled.bg,
                  borderColor: STATUS_COLORS.cancelled.border,
                },
                activeFilter === 'cancelled' && styles.statusCardActive,
              ]}
              activeOpacity={0.8}
              onPress={() => setActiveFilter('cancelled')}>
              <Text
                style={[
                  styles.statusCardCount,
                  {color: STATUS_COLORS.cancelled.text},
                ]}>
                3
              </Text>
              <Text
                style={[
                  styles.statusCardLabel,
                  {color: STATUS_COLORS.cancelled.text},
                ]}>
                ملغي
              </Text>
            </TouchableOpacity>
          </View>

          {/* Filter Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterTabsContainer}>
            <View style={styles.filterTabs}>
              {[
                {key: 'all', label: 'الكل'},
                {key: 'preparing', label: 'قيد التحضير'},
                {key: 'completed', label: 'مكتمل'},
                {key: 'cancelled', label: 'ملغي'},
              ].map(filter => (
                <TouchableOpacity
                  key={filter.key}
                  style={[
                    styles.filterTab,
                    activeFilter === filter.key && styles.filterTabActive,
                  ]}
                  onPress={() => setActiveFilter(filter.key)}
                  activeOpacity={0.7}>
                  <Text
                    style={[
                      styles.filterTabText,
                      activeFilter === filter.key && styles.filterTabTextActive,
                    ]}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Orders List */}
        <View style={styles.ordersContainer}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => renderOrderCard(order))
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconContainer}>
                <Icon
                  name="package-variant-closed"
                  size={RFValue(70)}
                  color={COLORS.grey60}
                />
              </View>
              <Text style={styles.emptyStateTitle}>لا توجد طلبات</Text>
              <Text style={styles.emptyStateText}>
                لم يتم العثور على طلبات تطابق الفلتر المحدد
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Order Details Modal */}
      <Modal
        visible={showOrderModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowOrderModal(false)}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowOrderModal(false)}
          />
          {selectedOrder && (
            <View style={styles.modalContainer}>
              <ScrollView
                style={styles.modalScrollView}
                contentContainerStyle={styles.modalContent}
                showsVerticalScrollIndicator={false}>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <View style={styles.modalHeaderTop}>
                    <View
                      style={[
                        styles.modalStatusBadge,
                        {
                          backgroundColor: getStatusColor(selectedOrder.status).bg,
                          borderColor: getStatusColor(selectedOrder.status).border,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.modalStatusText,
                          {color: getStatusColor(selectedOrder.status).text},
                        ]}>
                        {getStatusLabel(selectedOrder.status)}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.modalCloseButton}
                      onPress={() => setShowOrderModal(false)}
                      activeOpacity={0.7}>
                      <Icon
                        name="close"
                        size={RFValue(20)}
                        color={COLORS.darkGray}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.modalTitle}>
                    تفاصيل الطلب #{selectedOrder.id}
                  </Text>
                  <Text style={styles.modalDate}>
                    تم الطلب بتاريخ {selectedOrder.date}
                  </Text>
                </View>

                {/* Order Summary Card */}
                <View style={styles.modalSummaryCard}>
                  <View style={styles.modalSummaryRow}>
                    <View style={styles.modalSummaryLeft}>
                      <Text style={styles.modalSummaryLabel}>الإجمالي</Text>
                      <Text style={styles.modalSummaryPrice}>
                        {calculateModalTotal()} ر.س
                      </Text>
                    </View>
                    <View style={styles.modalImageContainer}>
                      {selectedOrder.image ? (
                        <Image
                          source={selectedOrder.image}
                          style={styles.modalImage}
                        />
                      ) : (
                        <View style={styles.modalPlaceholderImage}>
                          <Icon
                            name="cake-variant-outline"
                            size={RFValue(35)}
                            color={COLORS.grey60}
                          />
                        </View>
                      )}
                      <View style={styles.modalImageBadge}>
                        <Text style={styles.modalImageBadgeText}>
                          {selectedOrder.itemsCount}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Payment Method */}
                <View style={styles.modalInfoCard}>
                  <Icon
                    name="credit-card-outline"
                    size={RFValue(14)}
                    color={COLORS.primary}
                  />
                  <Text style={styles.modalInfoText}>
                    {selectedOrder.paymentMethod}
                  </Text>
                </View>

                {/* Delivery Address */}
                <View style={styles.modalInfoCard}>
                  <Icon
                    name="map-marker-outline"
                    size={RFValue(14)}
                    color={COLORS.primary}
                  />
                  <Text style={styles.modalInfoText}>
                    {selectedOrder.address}
                  </Text>
                </View>

                {/* Products Section */}
                <View style={styles.modalProductsSection}>
                  <Text style={styles.modalSectionTitle}>
                    تفاصيل المنتجات (يمكنك تعديل الكمية قبل إعادة الطلب):
                  </Text>
                  {selectedOrder.items.map((item, index) => (
                    <View key={index} style={styles.modalProductItem}>
                      <View style={styles.modalProductImage}>
                        {selectedOrder.image ? (
                          <Image
                            source={selectedOrder.image}
                            style={styles.modalProductImageStyle}
                          />
                        ) : (
                          <View style={styles.modalProductPlaceholder}>
                            <Icon
                              name="cake-variant-outline"
                              size={RFValue(24)}
                              color={COLORS.grey60}
                            />
                          </View>
                        )}
                      </View>
                      <View style={styles.modalProductInfo}>
                        <Text style={styles.modalProductName} numberOfLines={2}>
                          {item.name}
                        </Text>
                        <View style={styles.modalProductActions}>
                          <Text style={styles.modalProductPrice}>
                            {item.price} ر.س
                          </Text>
                          <View style={styles.modalQuantityControls}>
                            <TouchableOpacity
                              style={styles.modalQuantityButton}
                              onPress={() => handleQuantityChange(index, -1)}
                              activeOpacity={0.7}>
                              <Icon
                                name="minus"
                                size={RFValue(12)}
                                color={COLORS.grey60}
                              />
                            </TouchableOpacity>
                            <Text style={styles.modalQuantityText}>
                              {orderQuantities[index] || item.quantity}
                            </Text>
                            <TouchableOpacity
                              style={[
                                styles.modalQuantityButton,
                                styles.modalQuantityButtonActive,
                              ]}
                              onPress={() => handleQuantityChange(index, 1)}
                              activeOpacity={0.7}>
                              <Icon
                                name="plus"
                                size={RFValue(12)}
                                color={COLORS.primary}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Reorder Button */}
                <TouchableOpacity
                  style={styles.modalReorderButton}
                  onPress={handleReorder}
                  activeOpacity={0.8}>
                  <Text style={styles.modalReorderButtonText}>إعادة الطلب</Text>
                </TouchableOpacity>

                {/* Disclaimer */}
                <Text style={styles.modalDisclaimer}>
                  * عند الضغط على إعادة الطلب سيتم إضافة هذه المنتجات إلى السلة
                  بالاعداد الحالية.
                </Text>
              </ScrollView>
            </View>
          )}
        </View>
      </Modal>

      {/* Reorder Confirmation Modal */}
      <ConfirmModal
        visible={showReorderConfirm}
        title="تأكيد إعادة الطلب"
        message={`سيتم إعادة إضافة منتجات الطلب #${orderToReorder?.id} إلى السلة بالاعداد الحالية`}
        onConfirm={handleConfirmReorder}
        onCancel={handleCancelReorder}
        confirmText="موافق"
        cancelText="إلغاء"
      />
    </View>
  );
}
