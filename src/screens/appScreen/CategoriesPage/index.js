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
import {CATEGORIES_DATA} from '../HomeScreen/testData';
import {useNavigation} from '@react-navigation/native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 45) / 2;
const HERO_HEIGHT = SCREEN_HEIGHT * 0.32;

export default function CategoriesPage() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Create animated values for each category card
  const animatedValues = useRef(
    CATEGORIES_DATA.map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(50),
      scale: new Animated.Value(0.8),
    }))
  ).current;

  useEffect(() => {
    // Animate cards with staggered delay
    const animations = animatedValues.map((anim, index) => {
      return Animated.parallel([
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 600,
          delay: index * 100, // Stagger delay
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

  const handleCategoryPress = category => {
    setSelectedCategory(category.id);
    console.log('Category pressed:', category.title);
    // يمكنك هنا الانتقال إلى صفحة تفاصيل الفئة
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderCategoryCard = ({item, index}) => {
    const animatedStyle = {
      opacity: animatedValues[index].opacity,
      transform: [
        {translateY: animatedValues[index].translateY},
        {scale: animatedValues[index].scale},
      ],
    };

    return (
      <Animated.View style={animatedStyle}>
        <TouchableOpacity
          style={[
            styles.categoryCard,
            selectedCategory === item.id && styles.categoryCardSelected,
          ]}
          onPress={() => handleCategoryPress(item)}
          activeOpacity={0.8}>
          <View style={styles.categoryImageContainer}>
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
          <View style={styles.categoryTextContainer}>
            <Text style={styles.categoryTitle} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="فئات الكيك"
        showBackButton={true}
        onBackPress={handleBackPress}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {/* Hero Section */}
        <View style={styles.heroSectionWrapper}>
          <View style={styles.heroSection}>
            <View style={styles.heroSlideContainer}>
              <ImageBackground
                source={Images.CategpriesHero}
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
                      حياتك بعالم روما كيك
                    </Text>
                    <Text style={styles.heroSlideTitle}>كل صنف له طابع</Text>
                    <Text style={styles.heroSlideDescription}>
                      طازج يوميًا ولمسات فنية على كيفك،
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

        {/* Categories Grid */}
        <View style={styles.categoriesContainer}>
          <View style={styles.sectionHeader}>
            <Icon
              name="format-list-bulleted-square"
              size={RFValue(20)}
              color={COLORS.primary}
            />
            <Text style={styles.sectionTitle}>جميع الفئات</Text>
          </View>

          <View style={styles.gridContainer}>
            {CATEGORIES_DATA.map((item, index) => (
              <View key={item.id} style={styles.categoryCardWrapper}>
                {renderCategoryCard({item, index})}
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
    paddingBottom: RFValue(100),
  },
  heroSectionWrapper: {
    marginBottom: RFValue(20),
    position: 'relative',
  },
  heroSection: {
    height: HERO_HEIGHT,
  },
  heroSlideContainer: {
    width: '100%',
    height: '100%',
  },
  heroSlideBackground: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: RFValue(3),
    },
    shadowOpacity: 0.15,
    shadowRadius: RFValue(8),
    elevation: RFValue(5),
  },
  heroSlideBackgroundImage: {
    resizeMode: 'cover',
  },
  heroGradientOverlay: {
    flex: 1,
    // justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingTop: RFValue(20),
    paddingHorizontal: RFValue(10),
    paddingBottom: RFValue(20),
  },
  heroSlideContent: {
    // alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  heroMainTitle: {
    fontSize: RFValue(22),
    fontFamily: FONTS.funPlayBold,
    color: '#fff',
    // textAlign: 'center',
    marginBottom: RFValue(5),
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: {width: 0, height: RFValue(3)},
    textShadowRadius: RFValue(6),
    letterSpacing: RFValue(0.5),
  },
  heroSlideTitle: {
    fontSize: RFValue(16),
    fontFamily: FONTS.funPlayBold,
    color: '#fff',
    // textAlign: 'center',
    marginBottom: RFValue(8),
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {width: 0, height: RFValue(2)},
    textShadowRadius: RFValue(5),
  },
  heroSlideDescription: {
    fontSize: RFValue(15),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#fff',
    // textAlign: 'center',
    marginBottom: RFValue(12),
    // paddingHorizontal: RFValue(15),
    lineHeight: RFValue(20),
    width: '50%',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {width: 0, height: RFValue(2)},
    textShadowRadius: RFValue(4),
    marginTop: RFValue(10),
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: SCREEN_WIDTH,
    height: RFValue(60),
    zIndex: 100,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  waveSvg: {
    width: SCREEN_WIDTH,
    height: RFValue(60),
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  // Categories Section
  categoriesContainer: {
    paddingHorizontal: RFValue(15),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(18),
    paddingHorizontal: RFValue(5),
    gap: RFValue(8),
    marginTop: -RFValue(30),
    zIndex: 100000000,
  },
  sectionTitle: {
    fontSize: RFValue(18),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
    // marginTop: -10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCardWrapper: {
    width: CARD_WIDTH,
    marginBottom: RFValue(15),
  },
  categoryCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: RFValue(15),
    padding: RFValue(12),
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: RFValue(1),
    },
    shadowOpacity: 0.08,
    shadowRadius: RFValue(3),
    elevation: RFValue(2),
    borderWidth: RFValue(2),
    borderColor: 'transparent',
  },
  categoryCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFF8F8',
    transform: [{scale: 0.98}],
  },
  categoryImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RFValue(10),
  },
  categoryFrameImage: {
    width: CARD_WIDTH - 40,
    height: CARD_WIDTH - 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryFrameImageStyle: {
    resizeMode: 'contain',
  },
  categoryCircleInner: {
    width: CARD_WIDTH - 58,
    height: CARD_WIDTH - 58,
    borderRadius: (CARD_WIDTH - 58) / 2,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 0,
      height: RFValue(1),
    },
    shadowOpacity: 0.06,
    shadowRadius: RFValue(2),
    elevation: RFValue(1),
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryImageStyle: {
    resizeMode: 'cover',
  },
  categoryTextContainer: {
    width: '100%',
    alignItems: 'center',
    minHeight: RFValue(32),
    justifyContent: 'center',
  },
  categoryTitle: {
    fontSize: RFValue(12),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.primary,
    textAlign: 'center',
    lineHeight: RFValue(16),
  },
});
