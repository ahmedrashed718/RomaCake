import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  StatusBar,
} from 'react-native';
import {FONTS, COLORS, SIZES} from '../../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login pressed');
    navigation.navigate('BottomTabs');
  };

  return (
    <View
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <LinearGradient
        colors={[COLORS.primary300, COLORS.secondary300]}
        style={styles.gradient}>
        {/* Decorative circles */}
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
        <View style={[styles.circle, styles.circle4]} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {/* Login Card */}
          <View style={styles.card}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../assets/images/logo-removebg-preview.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* Title */}
            <Text style={styles.title}>تسجيل الدخول إلى حسابك</Text>
            <Text style={styles.subtitle}>
              عدنا لتحلي يومك بطلباتك المفضلة.
            </Text>

            {/* Email/Phone Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>البريد الإلكتروني أو رقم الجوال</Text>
              <View
                style={[
                  styles.inputWrapper,
                  emailFocused && styles.inputWrapperFocused,
                ]}>
                <Icon
                  name="email-outline"
                  size={RFValue(16)}
                  color={emailFocused ? COLORS.primary : COLORS.grey60}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="example@email.com"
                  placeholderTextColor={COLORS.grey60}
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  textAlign="right"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>كلمة المرور</Text>
              <View
                style={[
                  styles.inputWrapper,
                  passwordFocused && styles.inputWrapperFocused,
                ]}>
                <TextInput
                  style={[styles.input, {paddingRight: RFValue(40)}]}
                  placeholder="••••••••"
                  placeholderTextColor={COLORS.grey60}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  secureTextEntry={!showPassword}
                  textAlign="right"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}>
                  <Icon
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={RFValue(16)}
                    color={passwordFocused ? COLORS.primary : COLORS.grey60}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember Me & Forgot Password */}
            <View style={styles.rememberRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
                style={styles.forgotButton}>
                <Text style={styles.forgotText}>نسيت كلمة المرور؟</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                style={styles.checkboxContainer}>
                <Text style={styles.rememberText}>تذكرني</Text>
                <View style={styles.checkbox}>
                  {rememberMe && (
                    <Icon
                      name="check"
                      size={RFValue(12)}
                      color={COLORS.primary}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              activeOpacity={0.8}
              style={styles.loginButton}>
              <LinearGradient
                colors={[COLORS.primary300, COLORS.primary400]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.buttonGradient}>
                <Text style={styles.loginButtonText}>تسجيل الدخول</Text>
                {/* <Icon
                  name="arrow-left"
                  size={RFValue(18)}
                  color={COLORS.white}
                  style={styles.buttonIcon}
                /> */}
              </LinearGradient>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>ليس لديك حساب بعد؟ </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                style={styles.signupButton}>
                <Text style={styles.signupLinkText}>إنشاء حساب جديد</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000,
    backgroundColor: COLORS.light80,
  },
  circle1: {
    width: RFValue(130),
    height: RFValue(130),
    top: -RFValue(50),
    left: -RFValue(40),
    opacity: 0.35,
  },
  circle2: {
    width: RFValue(110),
    height: RFValue(110),
    top: SIZES.height * 0.08,
    right: -RFValue(35),
    opacity: 0.3,
  },
  circle3: {
    width: RFValue(120),
    height: RFValue(120),
    bottom: SIZES.height * 0.12,
    left: -RFValue(45),
    opacity: 0.32,
  },
  circle4: {
    width: RFValue(100),
    height: RFValue(100),
    bottom: -RFValue(30),
    right: RFValue(20),
    opacity: 0.35,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: RFValue(16),
    paddingHorizontal: RFValue(14),
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: COLORS.white,
    borderRadius: RFValue(18),
    padding: RFValue(16),
    shadowColor: COLORS.shadowColor,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  logoContainer: {
    width: RFValue(70),
    height: RFValue(70),
    borderRadius: RFValue(35),
    backgroundColor: COLORS.primary100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: RFValue(10),
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: RFValue(17),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: RFValue(3),
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: RFValue(11),
    fontFamily: FONTS.funPlayRegular,
    color: COLORS.grey80,
    textAlign: 'center',
    marginBottom: RFValue(16),
  },
  inputContainer: {
    marginBottom: RFValue(11),
  },
  label: {
    fontSize: RFValue(11),
    // fontFamily: FONTS.funPlayBold,
    color: COLORS.dark,
    marginBottom: RFValue(5),
    ...FONTS.body5,
  },
  inputWrapper: {
    position: 'relative',
    borderRadius: RFValue(12),
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.grey20,
    shadowColor: COLORS.shadowColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  inputWrapperFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary100,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: RFValue(12),
    paddingHorizontal: RFValue(40),
    paddingVertical: RFValue(10),
    fontSize: RFValue(12),
    fontFamily: FONTS.funPlayRegular,
    color: COLORS.dark,
    borderWidth: 0,
  },
  inputIcon: {
    position: 'absolute',
    right: RFValue(12),
    top: RFValue(10),
    zIndex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: RFValue(12),
    top: RFValue(10),
    zIndex: 1,
    padding: RFValue(2),
  },
  rememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: RFValue(14),
    paddingHorizontal: RFValue(2),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: RFValue(16),
    height: RFValue(16),
    borderRadius: RFValue(4),
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RFValue(6),
    backgroundColor: COLORS.white,
  },
  rememberText: {
    fontSize: RFValue(10),
    // fontFamily: FONTS.funPlayRegular,
    color: COLORS.darkGray,
    ...FONTS.body5,
  },
  forgotButton: {
    padding: RFValue(4),
  },
  forgotText: {
    fontSize: RFValue(10),
    // fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
    ...FONTS.h5,
  },
  loginButton: {
    borderRadius: RFValue(22),
    height: RFValue(45),
    marginVertical: RFValue(8),
    width: '90%',
    alignSelf: 'center',
    overflow: 'hidden',
    marginBottom: RFValue(12),
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 10,
  },
  buttonGradient: {
    paddingVertical: RFValue(8),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loginButtonText: {
    fontSize: RFValue(15),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.white,
    // letterSpacing: 0.5,
  },
  buttonIcon: {
    marginLeft: RFValue(8),
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(4),
  },
  signupText: {
    // fontFamily: FONTS.funPlayRegular,
    color: COLORS.darkGray,
    ...FONTS.body5,
    fontSize: RFValue(9.5),
  },
  signupButton: {
    padding: RFValue(3),
  },
  signupLinkText: {
    fontSize: RFValue(10),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
  },
});
