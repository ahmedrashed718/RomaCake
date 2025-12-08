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

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const SLIDER_WIDTH = SCREEN_WIDTH;
const SLIDER_HEIGHT = RFValue(180);
const CATEGORY_CARD_WIDTH = (SCREEN_WIDTH - 35) / 3;
const OCCASION_CARD_WIDTH = (SCREEN_WIDTH - 60) / 3;

const SLIDER_DATA = [
  {
    id: '1',
    title: 'صمم كيكك على ذوقك',
    description:
      'من الذكرى للتصميم... كل تفصيلة على كيفك، نزين الفرح ما يكمل إلا بلمستك الخاصة',
    buttonText: 'اطلب الآن',
    gradient: ['rgba(255, 105, 180, 0.2)', 'rgba(255, 182, 193, 0.2)'],
    image: Images.banner1,
  },
  {
    id: '2',
    title: 'كيك لجميع المناسبات 🎉',
    description:
      'أعياد ميلاد، أفراح، تخرج... نصنع لك كيك خاص يناسب كل مناسبة سعيدة',
    buttonText: 'اكتشف المزيد',
    gradient: ['rgba(138, 43, 226, 0.2)', 'rgba(186, 85, 211, 0.2)'],
    image: Images.banner2,
  },
  {
    id: '3',
    title: 'جودة عالية وطعم لذيذ 🍰',
    description: 'نستخدم أفضل المكونات لنقدم لك كيك طازج وشهي يسعد قلبك',
    buttonText: 'تصفح القائمة',
    gradient: ['rgba(255, 140, 0, 0.2)', 'rgba(255, 165, 0, 0.2)'],
    image: Images.banner3,
  },
];

const CATEGORIES_DATA = [
  {
    id: '2',
    title: 'كيك كريمة أبيض',
    image: Images.cat2,
  },
  {
    id: '3',
    title: 'برج من الكيك (الصغير)',
    image: Images.cat3,
  },
  {
    id: '4',
    title: 'كيك حفلتي',
    image: Images.cat4,
  },
  {
    id: '5',
    title: 'كيك مزيون بالورد',
    image: Images.cat5,
  },
  {
    id: '6',
    title: 'حلاوي مغلفة بشكل مخروط',
    image: Images.cat6,
  },
  {
    id: '7',
    title: 'كيك راقي',
    image: Images.cat7,
  },
  {
    id: '8',
    title: 'Happy Birthday',
    image: Images.cat8,
  },
  {
    id: '9',
    title: 'كاسات حلاويات بطبقات',
    image: Images.cat9,
  },
  {
    id: '10',
    title: 'كيك شموع',
    image: Images.cat10,
  },
  {
    id: '11',
    title: 'كب كيك',
    image: Images.cat11,
  },
  {
    id: '12',
    title: 'ألواح شوكولاتة',
    image: Images.cat12,
  },
  {
    id: '13',
    title: 'حلى أكواب',
    image: Images.cat13,
  },
  {
    id: '14',
    title: 'كيك مميز',
    image: Images.cat14,
  },
  {
    id: '15',
    title: 'دونتس',
    image: Images.cat15,
  },
  {
    id: '16',
    title: 'سينابون',
    image: Images.cat16,
  },
];

const OCCASIONS_DATA = [
  {
    id: '1',
    title: 'مواليد',
    image: Images.cake1,
  },
  {
    id: '2',
    title: 'حفلات تخريج',
    image: Images.cake2,
  },
  {
    id: '3',
    title: 'زفاف',
    image: Images.cake3,
  },
  {
    id: '4',
    title: 'أعياد',
    image: Images.cake4,
  },
  {
    id: '5',
    title: 'العيد الوطني',
    image: Images.cake6,
  },
];

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [occasionIndex, setOccasionIndex] = useState(0);
  const flatListRef = useRef(null);
  const categoryListRef = useRef(null);
  const occasionListRef = useRef(null);
  const autoScrollTimer = useRef(null);

  const handleOrderPress = () => {
    console.log('Order button pressed');
  };

  const handleCategoryPress = category => {
    console.log('Category pressed:', category.title);
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
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>فئات الكيك</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllText}>عرض الكل</Text>
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
            <Text style={styles.occasionMainTitle}>وش المناسبة؟</Text>
            <Text style={styles.occasionSubTitle}>كل كيكة تحكي لحظاتها!</Text>
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
    backgroundColor: '#FFF5F9',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFF5F9',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  categorySliderContainer: {
    position: 'relative',
  },
  sectionTitle: {
    fontSize: RFValue(18),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
  },
  seeAllText: {
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamilyMedium,
    color: COLORS.primary,
    textDecorationLine: 'underline',
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
    backgroundColor: '#FFF5F9',
  },
  occasionHeaderContainer: {
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  occasionMainTitle: {
    fontSize: RFValue(20),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 5,
  },
  occasionSubTitle: {
    fontSize: RFValue(13),
    fontFamily: FONTS.fontFamilyMedium,
    color: COLORS.primary,
    textAlign: 'right',
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
  // Content Section
  contentSection: {
    padding: 20,
    paddingTop: 10,
  },
});
