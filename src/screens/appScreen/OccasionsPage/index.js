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
import {OCCASIONS_DATA} from '../HomeScreen/testData';
import {useNavigation} from '@react-navigation/native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 45) / 2;
const HERO_HEIGHT = SCREEN_HEIGHT * 0.32;
const OCCASION_CARD_WIDTH = CARD_WIDTH;

export default function OccasionsPage() {
  const navigation = useNavigation();
  const [selectedOccasion, setSelectedOccasion] = useState(null);

  const animatedValues = useRef(
    OCCASIONS_DATA.map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(50),
      scale: new Animated.Value(0.8),
    })),
  ).current;

  useEffect(() => {
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

  const handleOccasionPress = occasion => {
    setSelectedOccasion(occasion.id);
    // console.log('Occasion pressed:', occasion.title);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderOccasionCard = ({item, index}) => {
    const animatedStyle = {
      opacity: animatedValues[index].opacity,
      transform: [
        {translateY: animatedValues[index].translateY},
        {scale: animatedValues[index].scale},
      ],
    };

    return (
      <Animated.View style={[styles.occasionCardWrapper, animatedStyle]}>
        <TouchableOpacity
          style={[
            styles.occasionCard,
            selectedOccasion === item.id && styles.occasionCardSelected,
          ]}
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
          <Text style={styles.occasionTitle} numberOfLines={2}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="المناسبات"
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
                source={Images.heroOss}
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
                    <Text style={styles.heroSlideTitle}>كل مناسبة لها طعم</Text>
                    <Text style={styles.heroSlideDescription}>
                      من الفرح للذكرى، نصنع كل لحظة خاصة
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

        {/* Occasions Grid */}
        <View style={styles.occasionsContainer}>
          <View style={styles.sectionHeader}>
            <Icon
              name="calendar-star"
              size={RFValue(20)}
              color={COLORS.primary}
            />
            <Text style={styles.sectionTitle}>جميع المناسبات</Text>
          </View>

          <View style={styles.gridContainer}>
            {OCCASIONS_DATA.map((item, index) => (
              <React.Fragment key={item.id}>
                {renderOccasionCard({item, index})}
              </React.Fragment>
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
    alignItems: 'flex-start',
    paddingTop: RFValue(20),
    paddingHorizontal: RFValue(10),
    paddingBottom: RFValue(20),
  },
  heroSlideContent: {
    justifyContent: 'center',
    width: '100%',
  },
  heroMainTitle: {
    fontSize: RFValue(22),
    fontFamily: FONTS.funPlayBold,
    color: '#fff',
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
    marginBottom: RFValue(8),
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {width: 0, height: RFValue(2)},
    textShadowRadius: RFValue(5),
  },
  heroSlideDescription: {
    fontSize: RFValue(15),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#fff',
    marginBottom: RFValue(12),
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
  // Occasions Section
  occasionsContainer: {
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
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  occasionCardWrapper: {
    width: OCCASION_CARD_WIDTH,
    marginBottom: RFValue(20),
  },
  occasionCard: {
    width: OCCASION_CARD_WIDTH,
    alignItems: 'center',
  },
  occasionCardSelected: {
    transform: [{scale: 0.98}],
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
      height: RFValue(3),
    },
    shadowOpacity: 0.2,
    shadowRadius: RFValue(6),
    elevation: RFValue(5),
    marginBottom: RFValue(10),
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
});
