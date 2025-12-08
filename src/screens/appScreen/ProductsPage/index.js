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

export default function ProductsPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const {category} = route.params || {};

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState({});

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

          {/* Products Grid */}
          <View style={styles.gridContainer}>
            {TEMP_PRODUCTS_DATA.map((item, index) => (
              <View key={item.id} style={styles.productCardWrapper}>
                {renderProductCard({item, index})}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
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
});
