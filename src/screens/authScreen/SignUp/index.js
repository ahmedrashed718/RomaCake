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

export default function SignUpScreen({navigation}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Focus states
  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const handleSignUp = () => {
    // Handle sign up logic here
    console.log('SignUp pressed');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
          {/* SignUp Card */}
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
            <Text style={styles.title}>إنشاء حساب جديد</Text>
            <Text style={styles.subtitle}>
              انضم لعائم روما كيك واستمتع بطلباتك أسهل ومزايا خاصة 🧁
            </Text>

            {/* Full Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>الاسم الكامل</Text>
              <View
                style={[
                  styles.inputWrapper,
                  fullNameFocused && styles.inputWrapperFocused,
                ]}>
                <Icon
                  name="account-outline"
                  size={RFValue(16)}
                  color={fullNameFocused ? COLORS.primary : COLORS.grey60}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="اكتب اسمك كما سيظهر في الطلبات"
                  placeholderTextColor={COLORS.grey60}
                  value={fullName}
                  onChangeText={setFullName}
                  onFocus={() => setFullNameFocused(true)}
                  onBlur={() => setFullNameFocused(false)}
                  textAlign="right"
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>البريد الإلكتروني</Text>
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

            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>رقم الجوال</Text>
              <View
                style={[
                  styles.inputWrapper,
                  phoneFocused && styles.inputWrapperFocused,
                ]}>
                <Icon
                  name="phone-outline"
                  size={RFValue(16)}
                  color={phoneFocused ? COLORS.primary : COLORS.grey60}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="05xxxxxxxx"
                  placeholderTextColor={COLORS.grey60}
                  value={phone}
                  onChangeText={setPhone}
                  onFocus={() => setPhoneFocused(true)}
                  onBlur={() => setPhoneFocused(false)}
                  keyboardType="phone-pad"
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

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>تأكيد كلمة المرور</Text>
              <View
                style={[
                  styles.inputWrapper,
                  confirmPasswordFocused && styles.inputWrapperFocused,
                ]}>
                <TextInput
                  style={[styles.input, {paddingRight: RFValue(40)}]}
                  placeholder="أعد كتابة كلمة المرور"
                  placeholderTextColor={COLORS.grey60}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onFocus={() => setConfirmPasswordFocused(true)}
                  onBlur={() => setConfirmPasswordFocused(false)}
                  secureTextEntry={!showConfirmPassword}
                  textAlign="right"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}>
                  <Icon
                    name={
                      showConfirmPassword ? 'eye-off-outline' : 'eye-outline'
                    }
                    size={RFValue(16)}
                    color={
                      confirmPasswordFocused ? COLORS.primary : COLORS.grey60
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms and Conditions */}
            <View style={styles.termsRow}>
              <TouchableOpacity
                onPress={() => setAgreeTerms(!agreeTerms)}
                style={styles.checkboxContainer}>
                <View style={styles.checkbox}>
                  {agreeTerms && (
                    <Icon
                      name="check"
                      size={RFValue(12)}
                      color={COLORS.primary}
                    />
                  )}
                </View>
                <Text style={styles.termsText}>
                  أوافق على{' '}
                  <Text style={styles.termsLink}>الشروط والأحكام</Text> و{' '}
                  <Text style={styles.termsLink}>سياسة الخصوصية</Text>.
                </Text>
              </TouchableOpacity>
            </View>

            {/* SignUp Button */}
            <TouchableOpacity
              onPress={handleSignUp}
              activeOpacity={0.8}
              style={styles.signupButton}>
              <LinearGradient
                colors={[COLORS.primary300, COLORS.primary400]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.buttonGradient}>
                <Text style={styles.signupButtonText}>إنشاء حساب</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>لديك حساب بالفعل؟ </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.loginLinkButton}>
                <Text style={styles.loginLinkText}>تسجيل الدخول</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
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
    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight + RFValue(20)
        : RFValue(30),
    paddingBottom: RFValue(20),
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
    color: COLORS.dark,
    borderWidth: 0,
    ...FONTS.body5,
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
  termsRow: {
    marginBottom: RFValue(14),
    paddingHorizontal: RFValue(2),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  termsText: {
    // fontFamily: FONTS.funPlayRegular,
    color: COLORS.darkGray,
    flex: 1,
    // textAlign: 'right',
    marginRight: RFValue(8),
    ...FONTS.body5,
    fontSize: RFValue(10),
  },
  termsLink: {
    color: COLORS.primary,
    fontFamily: FONTS.funPlayBold,
  },
  signupButton: {
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
  signupButtonText: {
    fontSize: RFValue(15),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.white,
    // letterSpacing: 0.5,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(4),
  },
  loginText: {
    // fontFamily: FONTS.funPlayRegular,
    color: COLORS.darkGray,
    ...FONTS.body5,
    fontSize: RFValue(9.5),
  },
  loginLinkButton: {
    padding: RFValue(3),
  },
  loginLinkText: {
    fontSize: RFValue(10),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
  },
});
