import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  TextInput,
  Alert,
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
      <AppHeader title="تواصل معنا" />
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
              style={styles.input}
              placeholder="اكتب اسمك هنا"
              placeholderTextColor={COLORS.gray}
              value={formData.name}
              onChangeText={text => setFormData({...formData, name: text})}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>البريد الإلكتروني (اختياري)</Text>
            <TextInput
              style={styles.input}
              placeholder="example@email.com"
              placeholderTextColor={COLORS.gray}
              value={formData.email}
              keyboardType="email-address"
              onChangeText={text => setFormData({...formData, email: text})}
            />
          </View>

          {/* Phone Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              رقم الجوال <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="05xxxxxxxx"
              placeholderTextColor={COLORS.gray}
              value={formData.phone}
              keyboardType="phone-pad"
              maxLength={10}
              onChangeText={text => setFormData({...formData, phone: text})}
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
              style={[styles.input, styles.textArea]}
              placeholder="اكتب تفاصيل استفساراتك أو طلبك هنا..."
              placeholderTextColor={COLORS.gray}
              value={formData.message}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              onChangeText={text => setFormData({...formData, message: text})}
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
    backgroundColor: '#FFF0F5',
  },
  content: {
    padding: SIZES.padding - 8,
    paddingBottom: RFValue(100),
  },
  aboutCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
    marginTop: RFValue(15),
    borderColor: COLORS.primary300,
    ...COLORS.shadow,
  },
  aboutIconContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: -35,
  },
  logo: {
    width: RFValue(100),
    height: RFValue(100),
    backgroundColor: COLORS.white,
    borderRadius: RFValue(50),
    borderWidth: 1,
    // borderStyle: 'dotted',
    borderColor: COLORS.primary,
    ...COLORS.shadow,
  },
  aboutTitle: {
    fontSize: RFValue(22),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  divider: {
    width: '25%',
    height: 2,
    backgroundColor: COLORS.primary300,
    alignSelf: 'center',
    borderRadius: 2,
    marginBottom: 12,
  },
  aboutMainText: {
    fontSize: RFValue(12),
    fontFamily: FONTS.fontFamilyRegular,
    color: COLORS.black,
    textAlign: 'center',
    lineHeight: RFValue(22),
    marginBottom: 8,
  },
  formSection: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: COLORS.primary300,
    borderStyle: 'dashed',
  },
  sectionTitle: {
    fontSize: RFValue(22),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamilySemiBold,
    color: COLORS.primary,
    marginBottom: 8,
    // textAlign: 'right',
  },
  required: {
    color: COLORS.error,
  },
  input: {
    backgroundColor: COLORS.lightGray4,
    borderRadius: 12,
    padding: 14,
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamilyRegular,
    color: COLORS.darkGray,
    // textAlign: 'right',
    borderWidth: 1,
    borderColor: COLORS.gray3,
  },
  textArea: {
    height: 120,
    paddingTop: 14,
  },
  dropdown: {
    backgroundColor: COLORS.lightGray4,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray3,
  },
  dropdownText: {
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamilyRegular,
    color: COLORS.darkGray,
  },
  dropdownList: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.gray3,
    ...COLORS.shadow,
  },
  dropdownItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray3,
  },
  dropdownItemText: {
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamilyRegular,
    color: COLORS.darkGray,
    // textAlign: 'right',
  },
  note: {
    fontSize: RFValue(13),
    fontFamily: FONTS.fontFamilyRegular,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: RFValue(22),
  },
  workingHours: {
    fontSize: RFValue(12),
    fontFamily: FONTS.fontFamilyRegular,
    color: COLORS.darkGray2,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 20,
    lineHeight: RFValue(20),
  },
  highlight: {
    color: COLORS.primary,
    fontFamily: FONTS.fontFamilyBold,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    ...COLORS.shadow,
  },
  submitButtonText: {
    fontSize: RFValue(14),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.white,
  },
  contactCards: {
    marginTop: 10,
  },
  contactCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  cardPink: {
    backgroundColor: '#FFF5F8',
    borderColor: COLORS.primary300,
  },
  cardCyan: {
    backgroundColor: '#F0FCFF',
    borderColor: COLORS.secondary300,
  },
  cardTitle: {
    fontSize: RFValue(20),
    fontFamily: FONTS.funPlayBold,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  phoneNumber: {
    fontSize: RFValue(18),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.darkGray,
    marginLeft: 8,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emailText: {
    fontSize: RFValue(16),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.darkGray,
    marginLeft: 8,
  },
  cardDescription: {
    fontSize: RFValue(12),
    fontFamily: FONTS.fontFamilyRegular,
    color: COLORS.darkGray2,
    textAlign: 'center',
    lineHeight: RFValue(20),
  },
});
