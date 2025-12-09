import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {COLORS, Images, lotties} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import AppHeader from '../../../components/AppHeader';
import CartDrawer from '../../../components/CartDrawer';
import {
  SLIDER_DATA,
  CATEGORIES_DATA,
  OCCASIONS_DATA,
  PRODUCTS_DATA,
  PROMISES_DATA,
} from './testData';
import {useNavigation} from '@react-navigation/native';
import styles from './style';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const SLIDER_WIDTH = SCREEN_WIDTH;
const CATEGORY_CARD_WIDTH = (SCREEN_WIDTH - 35) / 3;
const OCCASION_CARD_WIDTH = (SCREEN_WIDTH - 60) / 3;
const PRODUCT_CARD_WIDTH = (SCREEN_WIDTH - 55) / 2;

export default function HomeScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [occasionIndex, setOccasionIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const [cartDrawerVisible, setCartDrawerVisible] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      title: 'كيك الفراولة الملكي',
      image: Images.cake1,
      originalPrice: 420,
      currentPrice: 365,
      quantity: 3,
    },
    {
      id: '2',
      title: 'كيك الشوكولاتة الفاخر',
      image: Images.cake2,
      originalPrice: 500,
      currentPrice: 450,
      quantity: 2,
    },
    {
      id: '3',
      title: 'كيك الفانيليا الكلاسيكي',
      image: Images.cake3,
      originalPrice: 380,
      currentPrice: 320,
      quantity: 1,
    },
  ]);
  const flatListRef = useRef(null);
  const categoryListRef = useRef(null);
  const occasionListRef = useRef(null);
  const productListRef = useRef(null);
  const autoScrollTimer = useRef(null);

  const handleOrderPress = () => {
    console.log('Order button pressed');
  };

  const handleCategoryPress = category => {
    console.log('Category pressed:', category.title);
    navigation.navigate('ProductsPage', {category});
  };

  const handleViewAllCategories = () => {
    console.log('View all categories pressed');
    navigation.navigate('CategoriesPage');
  };

  const handleOccasionPress = occasion => {
    console.log('Occasion pressed:', occasion.title);
  };

  const handleCartPress = () => {
    setCartDrawerVisible(true);
  };

  const handleCloseCartDrawer = () => {
    setCartDrawerVisible(false);
  };

  const handleRemoveCartItem = itemId => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleUpdateCartQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? {...item, quantity: newQuantity} : item,
      ),
    );
  };

  const handleCompleteOrder = () => {
    // Calculate order totals
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.currentPrice * item.quantity,
      0,
    );
    const discount = cartItems.reduce(
      (sum, item) =>
        sum + (item.originalPrice - item.currentPrice) * item.quantity,
      0,
    );
    const total = subtotal;

    // Prepare order data
    const orderData = {
      cartItems: cartItems,
      subtotal: subtotal,
      discount: discount,
      total: total,
    };

    // Close cart drawer
    setCartDrawerVisible(false);

    // Navigate to checkout page
    navigation.navigate('CheckoutPage', {orderData});
  };

  const handleContinueShopping = () => {
    setCartDrawerVisible(false);
  };

  const handleFavoritePress = () => {
    console.log('Favorite pressed');
  };

  const handleSearchPress = () => {
    console.log('Search pressed');
  };

  const handleProductPress = product => {
    console.log('Product pressed:', product.title);
  };

  const handleToggleFavorite = productId => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? {...product, isFavorite: !product.isFavorite}
          : product,
      ),
    );
  };

  const handleAddToCart = product => {
    console.log('Add to cart:', product.title);
  };

  const handleViewAllProducts = () => {
    console.log('View all products pressed');
    navigation.navigate('CategoriesPage');
  };

  const handleViewAllOccasions = () => {
    console.log('View all occasions pressed');
    navigation.navigate('OccasionsPage');
  };

  // Auto scroll
  useEffect(() => {
    autoScrollTimer.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % SLIDER_DATA.length;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 4000);

    return () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
      }
    };
  }, [currentIndex]);

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const scrollToNext = () => {
    const nextIndex = (currentIndex + 1) % SLIDER_DATA.length;
    flatListRef.current?.scrollToIndex({
      index: nextIndex,
      animated: true,
    });
    setCurrentIndex(nextIndex);
  };

  const scrollToPrev = () => {
    const prevIndex =
      currentIndex === 0 ? SLIDER_DATA.length - 1 : currentIndex - 1;
    flatListRef.current?.scrollToIndex({
      index: prevIndex,
      animated: true,
    });
    setCurrentIndex(prevIndex);
  };

  const scrollCategoryToNext = () => {
    if (categoryIndex < CATEGORIES_DATA.length - 1) {
      const nextIndex = categoryIndex + 1;
      categoryListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCategoryIndex(nextIndex);
    }
  };

  const scrollCategoryToPrev = () => {
    if (categoryIndex > 0) {
      const prevIndex = categoryIndex - 1;
      categoryListRef.current?.scrollToIndex({
        index: prevIndex,
        animated: true,
      });
      setCategoryIndex(prevIndex);
    }
  };

  const onCategoryViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCategoryIndex(viewableItems[0].index || 0);
    }
  }).current;

  const categoryViewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const scrollOccasionToNext = () => {
    if (occasionIndex < OCCASIONS_DATA.length - 1) {
      const nextIndex = occasionIndex + 1;
      occasionListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setOccasionIndex(nextIndex);
    }
  };

  const scrollOccasionToPrev = () => {
    if (occasionIndex > 0) {
      const prevIndex = occasionIndex - 1;
      occasionListRef.current?.scrollToIndex({
        index: prevIndex,
        animated: true,
      });
      setOccasionIndex(prevIndex);
    }
  };

  const onOccasionViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setOccasionIndex(viewableItems[0].index || 0);
    }
  }).current;

  const occasionViewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const scrollProductToNext = () => {
    if (productIndex < products.length - 2) {
      const nextIndex = productIndex + 1;
      productListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setProductIndex(nextIndex);
    }
  };

  const scrollProductToPrev = () => {
    if (productIndex > 0) {
      const prevIndex = productIndex - 1;
      productListRef.current?.scrollToIndex({
        index: prevIndex,
        animated: true,
      });
      setProductIndex(prevIndex);
    }
  };

  const onProductViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setProductIndex(viewableItems[0].index || 0);
    }
  }).current;

  const productViewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderSliderItem = ({item}) => (
    <View style={styles.slideContainer}>
      <ImageBackground
        source={item.image}
        style={styles.slideBackground}
        imageStyle={styles.slideBackgroundImage}>
        <LinearGradient
          colors={item.gradient}
          style={styles.gradientOverlay}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <View style={styles.slideContent}>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideDescription}>{item.description}</Text>
            <TouchableOpacity
              style={styles.orderButton}
              onPress={handleOrderPress}
              activeOpacity={0.8}>
              <Text style={styles.orderButtonText}>{item.buttonText}</Text>
              <Icon name="arrow-left" size={RFValue(12)} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => handleCategoryPress(item)}
      activeOpacity={0.8}>
      <View style={styles.categoryCircleContainer}>
        <ImageBackground
          source={Images.frame}
          style={styles.categoryFrameImage}
          imageStyle={styles.categoryFrameImageStyle}>
          <View style={styles.categoryCircleInner}>
            <ImageBackground
              source={item.image}
              style={styles.categoryImage}
              imageStyle={styles.categoryImageStyle}
            />
          </View>
        </ImageBackground>
      </View>
      <Text style={styles.categoryTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderOccasionItem = ({item}) => (
    <TouchableOpacity
      style={styles.occasionCard}
      onPress={() => handleOccasionPress(item)}
      activeOpacity={0.8}>
      <View style={styles.occasionImageContainer}>
        <ImageBackground
          source={item.image}
          style={styles.occasionImage}
          imageStyle={styles.occasionImageStyle}>
          <LinearGradient
            colors={[
              `${COLORS.secondary}40`,
              `${COLORS.secondary}30`,
              `${COLORS.primary}35`,
              `${COLORS.primary}50`,
            ]}
            style={styles.occasionGradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
          />
        </ImageBackground>
      </View>
      <Text style={styles.occasionTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({item}) => (
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
          {item.isNew && (
            <View style={styles.newBadge}>
              <Icon name="star-four-points" size={RFValue(7)} color="#fff" />
              <Text style={styles.newBadgeText}>جديد</Text>
            </View>
          )}
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              item.isFavorite && styles.favoriteButtonActive,
            ]}
            onPress={() => handleToggleFavorite(item.id)}
            activeOpacity={0.8}>
            <Icon
              name={item.isFavorite ? 'heart' : 'heart-outline'}
              size={RFValue(16)}
              color={item.isFavorite ? '#fff' : COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productTitle} numberOfLines={2}>
            {item.title}
          </Text>
          {/* <Text style={styles.productSubtitle} numberOfLines={1}>
            {item.subtitle}
          </Text> */}
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Icon name="star" size={RFValue(10)} color="#FFD700" />
            <Text style={styles.reviewsText}>({item.reviews} تقييم)</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceValue}>{item.price}</Text>
            <Text style={styles.priceLabel}>ر.س</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => handleAddToCart(item)}
        activeOpacity={0.8}>
        <Icon name="cart-outline" size={RFValue(13)} color="#fff" />
        <Text style={styles.addToCartText}>أضف إلى السلة</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader
        title="الرئيسية"
        showCart={true}
        showFavorite={true}
        showSearch={true}
        onCartPress={handleCartPress}
        onFavoritePress={handleFavoritePress}
        onSearchPress={handleSearchPress}
        cartBadgeCount={cartItems.length}
      />

      <CartDrawer
        visible={cartDrawerVisible}
        onClose={handleCloseCartDrawer}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQuantity={handleUpdateCartQuantity}
        onCompleteOrder={handleCompleteOrder}
        onContinueShopping={handleContinueShopping}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Slider Section */}
        <View style={styles.sliderSection}>
          <FlatList
            ref={flatListRef}
            data={SLIDER_DATA}
            renderItem={renderSliderItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            decelerationRate="fast"
            snapToInterval={SLIDER_WIDTH}
            snapToAlignment="start"
            contentContainerStyle={styles.sliderContentContainer}
            bounces={false}
          />

          {/* Navigation Arrows */}
          <TouchableOpacity
            style={[styles.navButton, styles.navButtonLeft]}
            onPress={scrollToPrev}
            activeOpacity={0.7}>
            <Icon name="chevron-right" size={RFValue(15)} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, styles.navButtonRight]}
            onPress={scrollToNext}
            activeOpacity={0.7}>
            <Icon name="chevron-left" size={RFValue(15)} color="#fff" />
          </TouchableOpacity>

          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            {SLIDER_DATA.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>
        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <View style={styles.categoryHeaderContainer}>
            <View style={styles.categoryTitleWrapper}>
              <Text style={styles.categoryMainTitle}>فئات الكيك</Text>
              <Text style={styles.categorySubTitle}>
                اختار النكهة اللي تناسب ذوقك!
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleViewAllCategories}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.viewAllCategoryButtonGradient}>
                <View style={styles.viewAllCategoryButtonInner}>
                  <Text style={styles.viewAllCategoryText}>عرض الكل</Text>
                  <Icon
                    name="arrow-left"
                    size={RFValue(12)}
                    color={COLORS.primary}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.categorySliderContainer}>
            <FlatList
              ref={categoryListRef}
              data={CATEGORIES_DATA}
              renderItem={renderCategoryItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesGrid}
              snapToInterval={CATEGORY_CARD_WIDTH + 6}
              decelerationRate="fast"
              onViewableItemsChanged={onCategoryViewableItemsChanged}
              viewabilityConfig={categoryViewabilityConfig}
            />

            {/* Category Navigation Arrows */}
            {categoryIndex > 0 && (
              <TouchableOpacity
                style={[styles.categoryNavButton, styles.categoryNavButtonLeft]}
                onPress={scrollCategoryToPrev}
                activeOpacity={0.7}>
                <Icon name="chevron-right" size={RFValue(15)} color="#fff" />
              </TouchableOpacity>
            )}

            {categoryIndex < CATEGORIES_DATA.length - 3 && (
              <TouchableOpacity
                style={[
                  styles.categoryNavButton,
                  styles.categoryNavButtonRight,
                ]}
                onPress={scrollCategoryToNext}
                activeOpacity={0.7}>
                <Icon name="chevron-left" size={RFValue(15)} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Lottie Animation Section */}
        <View style={styles.lottieSectionWrapper}>
          {/* Top Shadow */}
          <LinearGradient
            colors={[
              `${COLORS.primary}20`,
              `${COLORS.primary}10`,
              'transparent',
            ]}
            style={styles.lottieTopShadow}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
          />
          <View style={styles.lottieBackground}>
            <View style={styles.lottieContentContainer}>
              {/* Lottie Animation */}
              <View style={styles.lottieWrapper}>
                <LottieView
                  source={lotties.lot}
                  autoPlay
                  loop
                  style={styles.lottieAnimation}
                />
              </View>

              {/* Title Text */}
              <View style={styles.lottieTextContainer}>
                <Text style={styles.lottieTitle}>صمم كيكتك على كيفك</Text>
                <Text style={styles.lottieSubtitle}>
                  من المقاس للنكهة... كل شي بيدك وتشوفه لحظياً
                </Text>
              </View>
            </View>
          </View>
          {/* Bottom Shadow */}
          <LinearGradient
            colors={[
              'transparent',
              `${COLORS.primary}10`,
              `${COLORS.primary}20`,
            ]}
            style={styles.lottieBottomShadow}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
          />
        </View>

        {/* Occasions Section */}
        <View style={styles.occasionsSection}>
          <View style={styles.occasionHeaderContainer}>
            <View style={styles.occasionTitleWrapper}>
              <Text style={styles.occasionMainTitle}>وش المناسبة؟</Text>
              <Text style={styles.occasionSubTitle}>كل كيكة تحكي لحظاتها!</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleViewAllOccasions}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.viewAllOccasionButtonGradient}>
                <View style={styles.viewAllOccasionButtonInner}>
                  <Text style={styles.viewAllOccasionText}>عرض الكل</Text>
                  <Icon
                    name="arrow-left"
                    size={RFValue(12)}
                    color={COLORS.primary}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.occasionSliderContainer}>
            <FlatList
              ref={occasionListRef}
              data={OCCASIONS_DATA}
              renderItem={renderOccasionItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.occasionsGrid}
              snapToInterval={OCCASION_CARD_WIDTH + 15}
              decelerationRate="fast"
              onViewableItemsChanged={onOccasionViewableItemsChanged}
              viewabilityConfig={occasionViewabilityConfig}
            />

            {/* Occasion Navigation Arrows */}
            {occasionIndex > 0 && (
              <TouchableOpacity
                style={[styles.occasionNavButton, styles.occasionNavButtonLeft]}
                onPress={scrollOccasionToPrev}
                activeOpacity={0.7}>
                <Icon name="chevron-right" size={RFValue(15)} color="#fff" />
              </TouchableOpacity>
            )}

            {occasionIndex < OCCASIONS_DATA.length - 3 && (
              <TouchableOpacity
                style={[
                  styles.occasionNavButton,
                  styles.occasionNavButtonRight,
                ]}
                onPress={scrollOccasionToNext}
                activeOpacity={0.7}>
                <Icon name="chevron-left" size={RFValue(15)} color="#fff" />
              </TouchableOpacity>
            )}
          </View>

          {/* Occasion Pagination Dots */}
          <View style={styles.occasionPaginationContainer}>
            {OCCASIONS_DATA.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.occasionPaginationDot,
                  index === occasionIndex && styles.occasionPaginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Products Section */}
        <View style={styles.productsSection}>
          <View style={styles.productHeaderContainer}>
            <Text style={styles.productMainTitle}>أحدث المنتجات</Text>
            <View style={styles.productNavButtons}>
              {productIndex > 0 && (
                <TouchableOpacity
                  style={styles.productHeaderNavButton}
                  onPress={scrollProductToPrev}
                  activeOpacity={0.7}>
                  <Icon
                    name="chevron-right"
                    size={RFValue(18)}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              )}
              {productIndex < products.length - 2 && (
                <TouchableOpacity
                  style={styles.productHeaderNavButton}
                  onPress={scrollProductToNext}
                  activeOpacity={0.7}>
                  <Icon
                    name="chevron-left"
                    size={RFValue(18)}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <FlatList
            ref={productListRef}
            data={products}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsGrid}
            snapToInterval={PRODUCT_CARD_WIDTH + 10}
            decelerationRate="fast"
            onViewableItemsChanged={onProductViewableItemsChanged}
            viewabilityConfig={productViewabilityConfig}
          />

          {/* View All Button */}
          <TouchableOpacity onPress={handleViewAllProducts} activeOpacity={0.8}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.viewAllButton}>
              <Text style={styles.viewAllButtonText}>عرض المزيد</Text>
              <Icon name="arrow-left" size={RFValue(14)} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Promises Section */}
        <View style={styles.promisesSection}>
          <View style={styles.promiseHeaderContainer}>
            <Text style={styles.promiseMainTitle}>وعدنا لكم</Text>
            <Text style={styles.promiseSubTitle}>
              ما فيه سحر ولا تعويذة...بس شغل صادق وتعب من القلب!
            </Text>
          </View>

          <View style={styles.promisesGrid}>
            {PROMISES_DATA.map(item => (
              <View key={item.id} style={styles.promiseCard}>
                <View style={styles.promiseIconContainer}>
                  <ImageBackground
                    source={item.image}
                    style={styles.promiseIcon}
                    imageStyle={styles.promiseIconImageStyle}
                  />
                </View>
                <Text style={styles.promiseTitle}>{item.title}</Text>
                <Text style={styles.promiseDescription}>
                  {item.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Other content sections */}
        <View style={styles.contentSection}>
          {/* Additional sections can go here */}
        </View>
      </ScrollView>
    </View>
  );
}
