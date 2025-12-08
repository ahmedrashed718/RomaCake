import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {FONTS, COLORS, SIZES, Images} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppHeader} from '../../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ConnectWith() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    messageType: 'استفسار عن الطلبات',
    message: '',
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const messageTypes = [
    'استفسار عن الطلبات',
    'شكوى',
    'اقتراح',
    'طلب خاص',
    'أخرى',
  ];

  // const handleSubmit = () => {
  //   if (!formData.name || !formData.phone || !formData.message) {
  //     Alert.alert('تنبيه', 'الرجاء ملء جميع الحقول المطلوبة');
  //     return;
  //   }
  //   Alert.alert('نجاح', 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً');
  //   // Reset form
  //   setFormData({
  //     name: '',
  //     email: '',
  //     phone: '',
  //     messageType: 'استفسار عن الطلبات',
  //     message: '',
  //   });
  // };

  return (
    <View style={styles.container}>
      <AppHeader title="تواصل معنا" showIcons={true} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {/* About Us Card */}
        <View style={styles.aboutCard}>
          <View style={styles.aboutIconContainer}>
            <Image
              source={Images.romaLogo}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.aboutTitle}> روما كيك</Text>

          <View style={styles.divider} />

          <Text style={styles.aboutMainText}>
            في روما كيك، نؤمن بأن كل مناسبة تستحق أن تكون خاصة ومميزة. منذ عام
            2017 ونحن نصنع أشهى أنواع الكيك والحلويات بأيد ماهرة وقلوب مليئة
            بالشغف.
          </Text>

          <Text style={styles.aboutMainText}>
            رحلتنا بدأت بحلم بسيط: أن نجعل كل لقمة تجربة لا تُنسى... اليوم، نفخر
            بخدمة آلاف العملاء السعداء وصناعة ذكريات حلوة لمناسباتهم الخاصة.
          </Text>

          <Text style={styles.aboutMainText}>
            نستخدم أجود المكونات الطبيعية ونبتكر تصاميم فريدة تعكس شخصيتك وتضيف
            لمسة سحرية لاحتفالاتك. فريقنا من الطهاة المحترفين يعمل بحب واهتمام
            لضمان أن كل قطعة كيك تخرج من مطبخنا هي تحفة فنية.
          </Text>
        </View>

        {/* Contact Form */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>إرسال رسالة</Text>

          {/* Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              الاسم الكامل <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'name' && styles.inputFocused,
              ]}
              placeholder="اكتب اسمك هنا"
              placeholderTextColor="#AAA"
              value={formData.name}
              onChangeText={text => setFormData({...formData, name: text})}
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>البريد الإلكتروني (اختياري)</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'email' && styles.inputFocused,
              ]}
              placeholder="example@email.com"
              placeholderTextColor="#AAA"
              value={formData.email}
              keyboardType="email-address"
              onChangeText={text => setFormData({...formData, email: text})}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          {/* Phone Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              رقم الجوال <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'phone' && styles.inputFocused,
              ]}
              placeholder="05xxxxxxxx"
              placeholderTextColor="#AAA"
              value={formData.phone}
              keyboardType="phone-pad"
              maxLength={10}
              onChangeText={text => setFormData({...formData, phone: text})}
              onFocus={() => setFocusedInput('phone')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          {/* Message Type Dropdown */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>نوع الرسالة</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowDropdown(!showDropdown)}>
              <Text style={styles.dropdownText}>{formData.messageType}</Text>
              <Icon
                name={showDropdown ? 'chevron-up' : 'chevron-down'}
                size={RFValue(20)}
                color={COLORS.gray6}
              />
            </TouchableOpacity>
            {showDropdown && (
              <View style={styles.dropdownList}>
                {messageTypes.map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setFormData({...formData, messageType: type});
                      setShowDropdown(false);
                    }}>
                    <Text style={styles.dropdownItemText}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Message TextArea */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              الرسالة <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                focusedInput === 'message' && styles.inputFocused,
              ]}
              placeholder="اكتب تفاصيل استفساراتك أو طلبك هنا..."
              placeholderTextColor="#AAA"
              value={formData.message}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              onChangeText={text => setFormData({...formData, message: text})}
              onFocus={() => setFocusedInput('message')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <Text style={styles.note}>
            💝 كل ما كانت التفاصيل أوضح، قدرنا نقدم لك تجربة أحلى
          </Text>

          <Text style={styles.workingHours}>
            عادة نرد خلال <Text style={styles.highlight}>1 - 3 ساعات</Text> في
            أوقات العمل. في أوقاتنا المزدحمة قد يأخذ الرد{' '}
            <Text style={styles.highlight}>قليلاً ❤️</Text>
          </Text>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            // onPress={handleSubmit}
            activeOpacity={0.8}>
            <Text style={styles.submitButtonText}>إرسال الرسالة</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Cards */}
        <View style={styles.contactCards}>
          {/* Customer Service Card */}
          <View style={[styles.contactCard, styles.cardPink]}>
            <Text style={styles.cardTitle}>خدمة العملاء</Text>
            <TouchableOpacity
              style={styles.phoneRow}
              // onPress={() => Linking.openURL('tel:05xxxxxxxx')}
            >
              <Icon name="phone" size={RFValue(20)} color={COLORS.primary} />
              <Text style={styles.phoneNumber}>05xxxxxxxx</Text>
            </TouchableOpacity>
            <Text style={styles.cardDescription}>
              متواجدين يومياً من 10 صباحاً حتى 10 مساءً
            </Text>
          </View>

          {/* WhatsApp Card */}
          <View style={[styles.contactCard, styles.cardCyan]}>
            <Text style={styles.cardTitle}>واتساب</Text>
            <TouchableOpacity
              style={styles.phoneRow}
              // onPress={() =>Linking.openURL('whatsapp://send?phone=05xxxxxxxx')}
            >
              <Icon name="whatsapp" size={RFValue(20)} color="#25D366" />
              <Text style={styles.phoneNumber}>05xxxxxxxx</Text>
            </TouchableOpacity>
            <Text style={styles.cardDescription}>
              أسرع طريقة للتواصل معنا للطلبات السريعة، الاستفسارات، أو الصور
              الإضافية للتصميم
            </Text>
          </View>

          {/* Email Card */}
          <View style={[styles.contactCard, styles.cardPink]}>
            <Text style={styles.cardTitle}>البريد الإلكتروني</Text>
            <TouchableOpacity
              style={styles.emailRow}
              // onPress={() => Linking.openURL('mailto:support@rooma.com')}
            >
              <Icon name="email" size={RFValue(20)} color={COLORS.primary} />
              <Text style={styles.emailText}>support@rooma.com</Text>
            </TouchableOpacity>
            <Text style={styles.cardDescription}>
              للاستفسارات الرسمية، الشكاوي، أو الملاحظات والشراكات مع روما
            </Text>
          </View>
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
  content: {
    padding: SIZES.padding - 8,
    paddingBottom: RFValue(80),
  },
  aboutCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    marginTop: RFValue(18),
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 105, 180, 0.08)',
  },
  aboutIconContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: -38,
  },
  logo: {
    width: RFValue(120),
    height: RFValue(120),
    backgroundColor: COLORS.white,
    borderRadius: RFValue(60),
    borderWidth: 2.5,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  aboutTitle: {
    fontSize: RFValue(20),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  divider: {
    width: '22%',
    height: 2.5,
    backgroundColor: COLORS.primary,
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: 12,
    opacity: 0.7,
  },
  aboutMainText: {
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamilyRegular,
    color: COLORS.gray6,
    textAlign: 'center',
    lineHeight: RFValue(20),
    marginBottom: 8,
  },
  formSection: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#FF69B4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 105, 180, 0.12)',
  },
  sectionTitle: {
    fontSize: RFValue(18),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 18,
    letterSpacing: 0.2,
  },
  inputContainer: {
    marginBottom: 14,
  },
  label: {
    fontSize: RFValue(13),
    fontFamily: FONTS.fontFamilySemiBold,
    color: COLORS.primary,
    marginBottom: 7,
  },
  required: {
    color: '#FF6B6B',
    fontSize: RFValue(14),
  },
  input: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 12,
    fontSize: RFValue(13),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#333',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFFFFF',
    shadowColor: COLORS.primary,
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },
  textArea: {
    height: 110,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  dropdown: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  dropdownText: {
    fontSize: RFValue(13),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#333',
  },
  dropdownList: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginTop: 5,
    borderWidth: 1.5,
    borderColor: COLORS.primary300,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    backgroundColor: COLORS.white,
  },
  dropdownItemText: {
    fontSize: RFValue(13),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#333',
  },
  note: {
    fontSize: RFValue(12),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: RFValue(18),
    backgroundColor: '#FFF9FC',
    padding: 9,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: 'rgba(255, 105, 180, 0.08)',
  },
  workingHours: {
    fontSize: RFValue(11),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#777',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 18,
    lineHeight: RFValue(17),
    backgroundColor: '#F8F8F8',
    padding: 9,
    borderRadius: 9,
  },
  highlight: {
    color: COLORS.primary,
    fontFamily: FONTS.fontFamilyBold,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    fontSize: RFValue(14),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.white,
    letterSpacing: 0.2,
  },
  contactCards: {
    marginTop: 6,
  },
  contactCard: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
  },
  cardPink: {
    backgroundColor: '#FFF8FB',
    borderColor: 'rgba(255, 105, 180, 0.15)',
  },
  cardCyan: {
    backgroundColor: '#F5FDFF',
    borderColor: 'rgba(37, 211, 102, 0.15)',
  },
  cardTitle: {
    fontSize: RFValue(17.5),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 9,
    borderRadius: 12,
  },
  phoneNumber: {
    fontSize: RFValue(15.5),
    fontFamily: FONTS.fontFamilyBold,
    color: '#333',
    marginLeft: 7,
    letterSpacing: 0.6,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 9,
    borderRadius: 12,
  },
  emailText: {
    fontSize: RFValue(13.5),
    fontFamily: FONTS.fontFamilyBold,
    color: '#333',
    marginLeft: 7,
  },
  cardDescription: {
    fontSize: RFValue(11),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#666',
    textAlign: 'center',
    lineHeight: RFValue(18),
    paddingHorizontal: 2,
  },
});
