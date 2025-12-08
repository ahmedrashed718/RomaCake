import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {FONTS, COLORS, Images} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../../../components/AppHeader';
import {
  SLIDER_DATA,
  CATEGORIES_DATA,
  OCCASIONS_DATA,
  PRODUCTS_DATA,
  PROMISES_DATA,
} from './testData';
import {useNavigation} from '@react-navigation/native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const SLIDER_WIDTH = SCREEN_WIDTH;
const SLIDER_HEIGHT = RFValue(180);
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
    console.log('Cart pressed');
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
        cartBadgeCount={3}
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
          <TouchableOpacity
            onPress={handleViewAllProducts}
            activeOpacity={0.8}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.pinkybg,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.pinkybg,
  },
  // Slider Styles
  sliderSection: {
    marginTop: 15,
    marginBottom: 20,
    height: SLIDER_HEIGHT,
  },
  sliderContentContainer: {
    paddingHorizontal: 0,
  },
  slideContainer: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    paddingHorizontal: 15,
  },
  slideBackground: {
    borderRadius: RFValue(20),
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  slideBackgroundImage: {
    resizeMode: 'cover',
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  slideContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  slideTitle: {
    fontSize: RFValue(18),
    fontFamily: FONTS.fontFamilyBold,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 5,
  },
  slideDescription: {
    fontSize: RFValue(11),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 12,
    lineHeight: RFValue(16),
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  orderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  orderButtonText: {
    fontSize: RFValue(12),
    fontFamily: FONTS.fontFamilyBold,
    color: '#fff',
  },
  // Navigation Arrows
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -16}],
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 105, 180, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  navButtonLeft: {
    left: 15,
  },
  navButtonRight: {
    right: 15,
  },
  // Pagination Dots
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  paginationDotActive: {
    width: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
  },
  // Categories Section
  categoriesSection: {
    paddingTop: 5,
    paddingBottom: 15,
  },
  categoryHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  categoryTitleWrapper: {
    flex: 1,
  },
  categoryMainTitle: {
    fontSize: RFValue(20),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
  },
  categorySubTitle: {
    fontSize: RFValue(10),
    fontFamily: FONTS.fontFamilyLight,
    color: COLORS.lightGray7,
    marginTop: 2,
  },
  categorySliderContainer: {
    position: 'relative',
  },
  viewAllCategoryButtonGradient: {
    borderRadius: 20,
    padding: 1.5,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  viewAllCategoryButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 19,
    gap: 4,
  },
  viewAllCategoryText: {
    fontSize: RFValue(11),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.primary,
  },
  categoriesGrid: {
    paddingLeft: 12,
    paddingRight: 8,
    paddingVertical: 5,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 6,
    width: CATEGORY_CARD_WIDTH,
  },
  categoryCircleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  categoryFrameImage: {
    width: CATEGORY_CARD_WIDTH - 10,
    height: CATEGORY_CARD_WIDTH - 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  categoryFrameImageStyle: {
    resizeMode: 'contain',
  },
  categoryCircleInner: {
    width: CATEGORY_CARD_WIDTH - 28,
    height: CATEGORY_CARD_WIDTH - 28,
    borderRadius: (CATEGORY_CARD_WIDTH - 28) / 2,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryImageStyle: {
    resizeMode: 'cover',
  },
  categoryTitle: {
    fontSize: RFValue(11),
    fontFamily: FONTS.fontFamilyBold,
    color: '#922758',
    textAlign: 'center',
    lineHeight: RFValue(14),
    maxWidth: CATEGORY_CARD_WIDTH,
  },
  // Category Navigation Arrows
  categoryNavButton: {
    position: 'absolute',
    top: '35%',
    transform: [{translateY: -16}],
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 105, 180, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  categoryNavButtonLeft: {
    left: 5,
  },
  categoryNavButtonRight: {
    right: 5,
  },
  // Occasions Section
  occasionsSection: {
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: COLORS.pinkybg,
  },
  occasionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  occasionTitleWrapper: {
    flex: 1,
  },
  occasionMainTitle: {
    fontSize: RFValue(20),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
  },
  occasionSubTitle: {
    fontSize: RFValue(10),
    fontFamily: FONTS.fontFamilyLight,
    color: COLORS.lightGray7,
    marginTop: 2,
  },
  viewAllOccasionButtonGradient: {
    borderRadius: 20,
    padding: 1.5,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  viewAllOccasionButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 19,
    gap: 4,
  },
  viewAllOccasionText: {
    fontSize: RFValue(11),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.primary,
  },
  occasionSliderContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  occasionsGrid: {
    paddingLeft: 15,
    paddingRight: 10,
    paddingVertical: 5,
  },
  occasionCard: {
    width: OCCASION_CARD_WIDTH,
    marginRight: 15,
    alignItems: 'center',
  },
  occasionImageContainer: {
    width: OCCASION_CARD_WIDTH,
    height: OCCASION_CARD_WIDTH,
    borderRadius: RFValue(15),
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 10,
  },
  occasionImage: {
    width: '100%',
    height: '100%',
  },
  occasionImageStyle: {
    resizeMode: 'cover',
  },
  occasionGradient: {
    flex: 1,
  },
  occasionTitle: {
    fontSize: RFValue(13),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
    textAlign: 'center',
    maxWidth: OCCASION_CARD_WIDTH,
  },
  // Occasion Navigation Arrows
  occasionNavButton: {
    position: 'absolute',
    top: '35%',
    transform: [{translateY: -16}],
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 105, 180, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  occasionNavButtonLeft: {
    left: 5,
  },
  occasionNavButtonRight: {
    right: 5,
  },
  // Occasion Pagination
  occasionPaginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  occasionPaginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(146, 39, 88, 0.3)',
    marginHorizontal: 4,
  },
  occasionPaginationDotActive: {
    width: 20,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
  },
  // Products Section
  productsSection: {
    paddingTop: 20,
    paddingBottom: 25,
    backgroundColor: COLORS.pinkybg,
  },
  productHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  productMainTitle: {
    fontSize: RFValue(20),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
  },
  productNavButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  productHeaderNavButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  productsGrid: {
    paddingLeft: 15,
    paddingRight: 10,
  },
  productCard: {
    width: PRODUCT_CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: RFValue(12),
    marginRight: 10,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  productImageContainer: {
    width: '100%',
    height: PRODUCT_CARD_WIDTH * 0.95,
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
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 3,
  },
  newBadgeText: {
    fontSize: RFValue(9),
    fontFamily: FONTS.fontFamilyBold,
    color: '#fff',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  favoriteButtonActive: {
    backgroundColor: COLORS.primary,
  },
  productInfo: {
    padding: 10,
    paddingBottom: 8,
  },
  productTitle: {
    fontSize: RFValue(11),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.primary,
    marginBottom: 2,
  },
  productSubtitle: {
    fontSize: RFValue(10),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#666',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 2,
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
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: 'flex-start',
    gap: 3,
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
    marginHorizontal: 10,
    marginBottom: 10,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 5,
  },
  addToCartText: {
    fontSize: RFValue(11),
    fontFamily: FONTS.fontFamilyBold,
    color: '#fff',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    gap: 8,
    alignSelf: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  viewAllButtonText: {
    fontSize: RFValue(13),
    fontFamily: FONTS.fontFamilyBold,
    color: '#fff',
  },
  // Promises Section
  promisesSection: {
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: '#FFF8F8',
    marginTop: 10,
  },
  promiseHeaderContainer: {
    alignItems: 'center',
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  promiseMainTitle: {
    fontSize: RFValue(22),
    fontFamily: FONTS.funPlayBold,
    color: '#D63854',
    textAlign: 'center',
    marginBottom: 8,
  },
  promiseSubTitle: {
    fontSize: RFValue(12),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#666',
    textAlign: 'center',
    lineHeight: RFValue(18),
  },
  promisesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    gap: 12,
  },
  promiseCard: {
    width: (SCREEN_WIDTH - 42) / 2,
    minHeight: RFValue(185),
    backgroundColor: '#fff',
    borderRadius: RFValue(15),
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  promiseIconContainer: {
    width: RFValue(65),
    height: RFValue(65),
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promiseIcon: {
    width: '100%',
    height: '100%',
  },
  promiseIconImageStyle: {
    resizeMode: 'contain',
  },
  promiseTitle: {
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 8,
    minHeight: RFValue(32),
    lineHeight: RFValue(16),
  },
  promiseDescription: {
    fontSize: RFValue(10),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#666',
    textAlign: 'center',
    lineHeight: RFValue(14),
    minHeight: RFValue(42),
  },
  // Content Section
  contentSection: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 80,
  },
});
