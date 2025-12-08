import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
  Animated,
  Modal,
  TextInput,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {FONTS, COLORS, Images} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppHeader from '../../../components/AppHeader';
import {useNavigation, useRoute} from '@react-navigation/native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 45) / 2;
const HERO_HEIGHT = SCREEN_HEIGHT * 0.22;

// بيانات المنتجات المؤقتة
const TEMP_PRODUCTS_DATA = [
  {
    id: '1',
    title: 'كيكة رد فلفت بطبقات الكريمة والتوت الأحمر',
    subtitle: 'صنع بحب كبير',
    image: Images.cake1,
    price: 45,
    rating: 4.9,
    reviews: 567,
  },
  {
    id: '2',
    title: 'كب كيك مزين بكريمة الورد الأحمر والفانيليا',
    subtitle: 'تركيب جميل قبل اليوم',
    image: Images.cake2,
    price: 32,
    rating: 4.8,
    reviews: 650,
  },
  {
    id: '3',
    title: 'كيكة شوكولاتة سمراااج بالشوكولاتة والفراولة',
    subtitle: 'لقاء لك تماما',
    image: Images.cake3,
    price: 180,
    rating: 4.9,
    reviews: 823,
  },
  {
    id: '4',
    title: 'كب كيك رد فلفت بدك الفراولة',
    subtitle: 'صنع بحب جدا',
    image: Images.cake4,
    price: 299,
    rating: 4.8,
    reviews: 424,
  },
  {
    id: '5',
    title: 'كيكة الفراولة المزينة بالتوت الطازج',
    subtitle: 'تركيب بحب شغف',
    image: Images.cake1,
    price: 540,
    rating: 4.9,
    reviews: 542,
  },
  {
    id: '6',
    title: 'كيكة رد فلفت بخليط العسل والكريمة المخفوقة',
    subtitle: 'صنع بحب جدا',
    image: Images.cake2,
    price: 350,
    rating: 4.6,
    reviews: 142,
  },
  {
    id: '7',
    title: 'كيكة رد فلفت بالتوت والكريمة الحمراء',
    subtitle: 'عرض تركيب بشغف',
    image: Images.cake3,
    price: 399,
    rating: 4.7,
    reviews: 189,
  },
];

// خيارات الفلتر
const FILTER_OPTIONS = [
  {
    id: 'most-ordered',
    label: 'الأكثر طلباً',
    subtitle: 'الأعلى مبيعاً',
    icon: 'fire',
    color: '#FF6B6B',
  },
  {
    id: 'highest-rating',
    label: 'أعلى تقييم',
    subtitle: 'حسب تقييم العملاء',
    icon: 'star',
    color: '#FFD700',
  },
  {
    id: 'price-low-high',
    label: 'البحث من الأرخص للأغلى',
    subtitle: 'يوفر لك الأفضل',
    icon: 'arrow-up',
    color: '#4CAF50',
  },
  {
    id: 'price-high-low',
    label: 'البحث من الأغلى للأرخص',
    subtitle: 'للمناسبات الخاصة',
    icon: 'arrow-down',
    color: '#9C27B0',
  },
];

export default function ProductsPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const {category} = route.params || {};

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [selectedFilter, setSelectedFilter] = useState('most-ordered');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Create animated values for each product card
  const animatedValues = useRef(
    TEMP_PRODUCTS_DATA.map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(50),
      scale: new Animated.Value(0.8),
    })),
  ).current;

  useEffect(() => {
    // Animate cards with staggered delay
    const animations = animatedValues.map((anim, index) => {
      return Animated.parallel([
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 600,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.timing(anim.translateY, {
          toValue: 0,
          duration: 600,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.spring(anim.scale, {
          toValue: 1,
          delay: index * 100,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]);
    });

    Animated.stagger(50, animations).start();
  }, [animatedValues]);

  const handleProductPress = product => {
    setSelectedProduct(product.id);
    console.log('Product pressed:', product.title);
    // يمكنك هنا الانتقال إلى صفحة تفاصيل المنتج
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const toggleFavorite = productId => {
    setFavorites(prev => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const getFilteredProducts = () => {
    let products = [...TEMP_PRODUCTS_DATA];

    switch (selectedFilter) {
      case 'most-ordered':
        // ترتيب حسب عدد التقييمات (الأكثر طلباً)
        return products.sort((a, b) => b.reviews - a.reviews);
      case 'highest-rating':
        // ترتيب حسب التقييم الأعلى
        return products.sort((a, b) => b.rating - a.rating);
      case 'price-low-high':
        // ترتيب من الأرخص للأغلى
        return products.sort((a, b) => a.price - b.price);
      case 'price-high-low':
        // ترتيب من الأغلى للأرخص
        return products.sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  const filteredProducts = getFilteredProducts();

  const handleFilterSelect = filterId => {
    setSelectedFilter(filterId);
    setShowFilterModal(false);
  };

  const renderProductCard = ({item, index}) => {
    const animatedStyle = {
      opacity: animatedValues[index].opacity,
      transform: [
        {translateY: animatedValues[index].translateY},
        {scale: animatedValues[index].scale},
      ],
    };

    const isFavorite = favorites[item.id];

    return (
      <Animated.View style={animatedStyle}>
        <View style={styles.productCard}>
          <TouchableOpacity
            onPress={() => handleProductPress(item)}
            activeOpacity={0.9}>
            <View style={styles.productImageContainer}>
              <ImageBackground
                source={item.image}
                style={styles.productImage}
                imageStyle={styles.productImageStyle}
              />
              <View style={styles.newBadge}>
                <Icon name="star-four-points" size={RFValue(7)} color="#fff" />
                <Text style={styles.newBadgeText}>جديد</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.favoriteButton,
                  isFavorite && styles.favoriteButtonActive,
                ]}
                onPress={() => toggleFavorite(item.id)}
                activeOpacity={0.8}>
                <Icon
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={RFValue(16)}
                  color={isFavorite ? '#fff' : COLORS.primary}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{item.rating}</Text>
                <Icon name="star" size={RFValue(10)} color="#FFD700" />
                <Text style={styles.reviewsText}>({item.reviews} تقييم)</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceValue}>
                  {item.price ? String(item.price) : '0'}
                </Text>
                <Text style={styles.priceLabel}>ر.س</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => handleProductPress(item)}
            activeOpacity={0.8}>
            <Icon name="cart-plus" size={RFValue(14)} color="#fff" />
            <Text style={styles.addToCartText}>إضافة للسلة</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title={'المنتجات'}
        showBackButton={true}
        onBackPress={handleBackPress}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {/* Hero Section */}
        <View style={styles.heroSectionWrapper}>
          <View style={styles.heroSection}>
            <ImageBackground
              source={Images.Chocolate}
              style={styles.heroBackground}
              imageStyle={styles.heroBackgroundImage}>
              <LinearGradient
                colors={[
                  'rgba(0, 0, 0, 0.1)',
                  'rgba(0, 0, 0, 0.3)',
                  'rgba(146, 39, 88, 0.4)',
                ]}
                style={styles.heroGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}>
                <View style={styles.heroContent}>
                  <Text style={styles.heroTitle}>{'منتجاتنا المميزة'}</Text>
                  <Text style={styles.heroDescription}>
                    اكتشف أجمل التصاميم والنكهات
                  </Text>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>

          {/* Decorative Wave SVG */}
          <View style={styles.waveContainer}>
            <Svg
              width={SCREEN_WIDTH}
              height={RFValue(50)}
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

        {/* Products Section */}
        <View style={styles.productsContainer}>
          <View style={styles.sectionHeader}>
            <Icon
              name="cake-variant"
              size={RFValue(20)}
              color={COLORS.primary}
            />
            <Text style={styles.sectionTitle}>المنتجات المتاحة</Text>
          </View>

          {/* Search Bar - Elegant Design */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputWrapper}>
              <Icon name="magnify" size={RFValue(18)} color={COLORS.primary} />
              <TextInput
                style={styles.searchInput}
                placeholder="ابحث عن منتجك المفضل..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#999"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchQuery('')}
                  style={styles.clearButton}
                  activeOpacity={0.7}>
                  <Icon name="close-circle" size={RFValue(16)} color="#999" />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={styles.searchActionButton}
              activeOpacity={0.8}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.searchActionGradient}>
                <Icon name="tune-vertical" size={RFValue(18)} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Filter Button - Compact & Elegant */}
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setShowFilterModal(true)}
              activeOpacity={0.7}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.filterButtonGradient}>
                <Icon name="tune-variant" size={RFValue(14)} color="#fff" />
                <Text style={styles.filterButtonText}>ترتيب</Text>
                <Icon name="chevron-down" size={RFValue(14)} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.filterIndicator}>
              <Icon
                name={FILTER_OPTIONS.find(f => f.id === selectedFilter)?.icon || 'fire'}
                size={RFValue(12)}
                color={FILTER_OPTIONS.find(f => f.id === selectedFilter)?.color || '#FF6B6B'}
              />
              <Text style={styles.filterIndicatorText} numberOfLines={1}>
                {FILTER_OPTIONS.find(f => f.id === selectedFilter)?.label || 'الأكثر طلباً'}
              </Text>
            </View>
          </View>

          {/* Products Grid */}
          <View style={styles.gridContainer}>
            {filteredProducts.map((item, index) => (
              <View key={item.id} style={styles.productCardWrapper}>
                {renderProductCard({item, index})}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Filter Modal - Elegant & Compact */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFilterModal(false)}>
          <TouchableOpacity activeOpacity={1} style={styles.modalContentWrapper}>
            <View style={styles.modalContent}>
              {/* Modal Handle */}
              <View style={styles.modalHandle} />

              <View style={styles.modalHeader}>
                <Icon name="tune" size={RFValue(18)} color={COLORS.primary} />
                <Text style={styles.modalTitle}>ترتيب المنتجات</Text>
              </View>

              {FILTER_OPTIONS.map((filter, index) => (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.filterOption,
                    selectedFilter === filter.id && styles.filterOptionActive,
                    index === FILTER_OPTIONS.length - 1 && styles.filterOptionLast,
                  ]}
                  onPress={() => handleFilterSelect(filter.id)}
                  activeOpacity={0.6}>
                  <View
                    style={[
                      styles.filterIconContainer,
                      {backgroundColor: filter.color + '15'},
                    ]}>
                    <Icon
                      name={filter.icon}
                      size={RFValue(16)}
                      color={filter.color}
                    />
                  </View>
                  <View style={styles.filterTextContainer}>
                    <Text style={styles.filterLabel}>{filter.label}</Text>
                    <Text style={styles.filterSubtitle}>{filter.subtitle}</Text>
                  </View>
                  {selectedFilter === filter.id && (
                    <View style={styles.checkmarkContainer}>
                      <Icon
                        name="check"
                        size={RFValue(16)}
                        color="#fff"
                      />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.pinkybg,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: RFValue(120),
  },

  // Hero Section Styles
  heroSectionWrapper: {
    marginBottom: RFValue(20),
    position: 'relative',
    // height: HERO_HEIGHT + RFValue(50),
  },
  heroSection: {
    height: HERO_HEIGHT,
  },
  heroBackground: {
    width: '100%',
    height: '100%',
  },
  heroBackgroundImage: {
    resizeMode: 'cover',
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: RFValue(20),
  },
  heroContent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: RFValue(24),
    fontFamily: FONTS.funPlayBold,
    color: '#fff',
    marginBottom: RFValue(8),
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 0, height: RFValue(2)},
    textShadowRadius: RFValue(6),
  },
  heroDescription: {
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamilyBold,
    color: '#fff',
    marginBottom: RFValue(40),
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {width: 0, height: RFValue(2)},
    textShadowRadius: RFValue(4),
  },
  heroSubDescription: {
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {width: 0, height: RFValue(2)},
    textShadowRadius: RFValue(4),
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: SCREEN_WIDTH,
    height: RFValue(50),
    zIndex: 100,
    overflow: 'hidden',
  },

  // Products Section Styles
  productsContainer: {
    paddingHorizontal: RFValue(15),
    marginTop: RFValue(10),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(15),
    paddingHorizontal: RFValue(5),
    gap: RFValue(8),
    marginTop: -RFValue(25),
  },
  sectionTitle: {
    fontSize: RFValue(18),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
    marginBottom: -RFValue(12),
  },

  // Search Bar Styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(8),
    marginBottom: RFValue(12),
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: RFValue(25),
    paddingHorizontal: RFValue(15),
    paddingVertical: RFValue(10),
    gap: RFValue(8),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.08,
    shadowRadius: RFValue(4),
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  searchInput: {
    flex: 1,
    fontSize: RFValue(12),
    fontFamily: FONTS.fontFamilyMedium,
    color: COLORS.primary,
    textAlign: 'right',
    paddingVertical: 0,
  },
  clearButton: {
    padding: RFValue(2),
  },
  searchActionButton: {
    width: RFValue(45),
    height: RFValue(45),
    borderRadius: RFValue(22.5),
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.25,
    shadowRadius: RFValue(3),
    elevation: 3,
  },
  searchActionGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: RFValue(5),
  },
  productCardWrapper: {
    width: CARD_WIDTH,
    marginBottom: RFValue(15),
  },

  // Product Card Styles
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: RFValue(12),
    marginBottom: RFValue(10),
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: RFValue(2),
    },
    shadowOpacity: 0.12,
    shadowRadius: RFValue(5),
    elevation: 4,
    overflow: 'hidden',
  },
  productImageContainer: {
    width: '100%',
    height: CARD_WIDTH * 0.95,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productImageStyle: {
    resizeMode: 'cover',
  },
  newBadge: {
    position: 'absolute',
    top: RFValue(8),
    right: RFValue(8),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: RFValue(8),
    paddingVertical: RFValue(4),
    borderRadius: RFValue(12),
    gap: RFValue(3),
  },
  newBadgeText: {
    fontSize: RFValue(9),
    fontFamily: FONTS.fontFamilyBold,
    color: '#fff',
  },
  favoriteButton: {
    position: 'absolute',
    top: RFValue(8),
    left: RFValue(8),
    width: RFValue(30),
    height: RFValue(30),
    borderRadius: RFValue(15),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.2,
    shadowRadius: RFValue(3),
    elevation: 4,
  },
  favoriteButtonActive: {
    backgroundColor: COLORS.primary,
  },

  // Product Info Styles
  productInfo: {
    padding: RFValue(10),
    paddingBottom: RFValue(8),
  },
  productTitle: {
    fontSize: RFValue(11),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.primary,
    marginBottom: RFValue(2),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(6),
    gap: RFValue(2),
  },
  ratingText: {
    fontSize: RFValue(10),
    fontFamily: FONTS.fontFamilyBold,
    color: '#333',
  },
  reviewsText: {
    fontSize: RFValue(8),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#999',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8DC',
    paddingHorizontal: RFValue(8),
    paddingVertical: RFValue(5),
    borderRadius: RFValue(6),
    alignSelf: 'flex-start',
    gap: RFValue(3),
  },
  priceLabel: {
    fontSize: RFValue(9),
    fontFamily: FONTS.fontFamilyMedium,
    color: COLORS.primary,
  },
  priceValue: {
    fontSize: RFValue(13),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.primary,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
    marginHorizontal: RFValue(10),
    marginBottom: RFValue(10),
    paddingVertical: RFValue(8),
    borderRadius: RFValue(8),
    gap: RFValue(5),
  },
  addToCartText: {
    fontSize: RFValue(11),
    fontFamily: FONTS.fontFamilyBold,
    color: '#fff',
  },

  // Filter Button Styles - Compact & Elegant
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: RFValue(12),
    gap: RFValue(8),
  },
  filterButton: {
    borderRadius: RFValue(20),
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.25,
    shadowRadius: RFValue(3),
    elevation: 3,
  },
  filterButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFValue(8),
    paddingHorizontal: RFValue(12),
    gap: RFValue(5),
  },
  filterButtonText: {
    fontSize: RFValue(11),
    fontFamily: FONTS.fontFamilyBold,
    color: '#fff',
  },
  filterIndicator: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: RFValue(8),
    paddingHorizontal: RFValue(12),
    borderRadius: RFValue(20),
    gap: RFValue(6),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: RFValue(1)},
    shadowOpacity: 0.08,
    shadowRadius: RFValue(3),
    elevation: 2,
  },
  filterIndicatorText: {
    flex: 1,
    fontSize: RFValue(10),
    fontFamily: FONTS.fontFamilyMedium,
    color: COLORS.primary,
  },

  // Filter Modal Styles - Elegant Bottom Sheet
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContentWrapper: {
    width: '100%',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: RFValue(25),
    borderTopRightRadius: RFValue(25),
    paddingHorizontal: RFValue(20),
    paddingBottom: RFValue(25),
    paddingTop: RFValue(8),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: RFValue(-3)},
    shadowOpacity: 0.15,
    shadowRadius: RFValue(8),
    elevation: 8,
  },
  modalHandle: {
    width: RFValue(40),
    height: RFValue(4),
    backgroundColor: '#E0E0E0',
    borderRadius: RFValue(2),
    alignSelf: 'center',
    marginBottom: RFValue(15),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(15),
    gap: RFValue(8),
    paddingBottom: RFValue(12),
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  modalTitle: {
    fontSize: RFValue(14),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: RFValue(12),
    borderRadius: RFValue(12),
    marginBottom: RFValue(8),
    backgroundColor: '#FAFAFA',
    gap: RFValue(10),
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  filterOptionActive: {
    backgroundColor: COLORS.pinkybg,
    borderColor: COLORS.primary,
  },
  filterOptionLast: {
    marginBottom: 0,
  },
  filterIconContainer: {
    width: RFValue(36),
    height: RFValue(36),
    borderRadius: RFValue(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTextContainer: {
    flex: 1,
  },
  filterLabel: {
    fontSize: RFValue(11),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.primary,
    marginBottom: RFValue(1),
  },
  filterSubtitle: {
    fontSize: RFValue(9),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#999',
  },
  checkmarkContainer: {
    width: RFValue(24),
    height: RFValue(24),
    borderRadius: RFValue(12),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
