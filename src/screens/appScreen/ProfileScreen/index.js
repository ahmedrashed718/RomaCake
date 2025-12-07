import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Platform,
  Modal,
} from 'react-native';
import {FONTS, COLORS} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState({
    name: 'احمد راشد',
    email: 'example@email.com',
    phone: '05xxxxxxxx',
    notes: '',
  });

  const menuItems = [
    {
      id: 'profile',
      title: 'ملفي الشخصي',
      icon: 'account',
      screen: 'profile',
    },
    {
      id: 'orders',
      title: 'طلباتي',
      icon: 'shopping',
      screen: 'orders',
    },
    {
      id: 'favorites',
      title: 'المفضلة',
      icon: 'heart',
      screen: 'favorites',
    },
    {
      id: 'addresses',
      title: 'العناوين',
      icon: 'map-marker',
      screen: 'addresses',
    },
    {
      id: 'settings',
      title: 'الإعدادات',
      icon: 'cog',
      screen: 'settings',
    },
  ];

  const handleSave = () => {
    // Save logic here
    console.log('Saved');
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    // Logout logic here
    console.log('Logout');
  };

  const renderProfileContent = () => (
    <View style={styles.profileContent}>
      <Text style={styles.sectionTitle}>بياناتي الشخصية</Text>
      <Text style={styles.subtitle}>
        تم تحديث اسمك، بريدك الإلكتروني ورقم الجوال لتسهيل التواصل معك وتسليم
        الطلبات بشكل آمن.
      </Text>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>الاسم الكامل</Text>
          <TextInput
            style={styles.input}
            value={userData.name}
            onChangeText={text => setUserData({...userData, name: text})}
            placeholder="اكتب اسمك"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>البريد الإلكتروني</Text>
          <TextInput
            style={styles.input}
            value={userData.email}
            onChangeText={text => setUserData({...userData, email: text})}
            placeholder="example@email.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>رقم الجوال</Text>
          <TextInput
            style={styles.input}
            value={userData.phone}
            onChangeText={text => setUserData({...userData, phone: text})}
            placeholder="05xxxxxxxx"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>ملاحظات خاصة بالحساب (اختياري)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={userData.notes}
            onChangeText={text => setUserData({...userData, notes: text})}
            placeholder="مثال: يرجى الاتصال قبل التسليم"
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>حفظ التعديلات</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOtherContent = () => (
    <View style={styles.comingSoonContainer}>
      <Icon name="cake-variant" size={RFValue(60)} color={COLORS.primary} />
      <Text style={styles.comingSoonText}>قريباً</Text>
      <Text style={styles.comingSoonSubtext}>هذه الصفحة قيد التطوير</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary}
        translucent={false}
      />

      {/* Header */}
      <View style={styles.header}>
        {/* Decorative Elements */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        <View style={styles.decorativeCircle3} />

        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Icon name="account" size={RFValue(40)} color="#fff" />
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Icon name="camera" size={RFValue(12)} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userRole}>تابع طلباتك وجدد بطاقتك بسهولة</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                activeTab === item.id && styles.menuItemActive,
              ]}
              onPress={() => setActiveTab(item.id)}>
              <View style={styles.menuItemContent}>
                <View
                  style={[
                    styles.iconCircle,
                    activeTab === item.id && styles.iconCircleActive,
                  ]}>
                  <Icon
                    name={item.icon}
                    size={RFValue(20)}
                    color={activeTab === item.id ? COLORS.primary : '#666'}
                  />
                </View>
                <Text
                  style={[
                    styles.menuItemText,
                    activeTab === item.id && styles.menuItemTextActive,
                  ]}>
                  {item.title}
                </Text>
              </View>
              <Icon
                name="chevron-left"
                size={RFValue(18)}
                color={activeTab === item.id ? COLORS.primary : '#ccc'}
              />
            </TouchableOpacity>
          ))}

          {/* Logout Item */}
          <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
            <View style={styles.menuItemContent}>
              <View style={styles.iconCircleLogout}>
                <Icon name="logout" size={RFValue(20)} color="#ff4757" />
              </View>
              <Text style={styles.logoutItemText}>تسجيل الخروج</Text>
            </View>
            <Icon name="chevron-left" size={RFValue(18)} color="#ff4757" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        {activeTab === 'profile'
          ? renderProfileContent()
          : renderOtherContent()}

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Logout Modal */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalIconContainer}>
              <View style={styles.modalIconCircle}>
                <Icon name="logout" size={RFValue(35)} color="#ff4757" />
              </View>
            </View>

            <Text style={styles.modalTitle}>تسجيل الخروج</Text>
            <Text style={styles.modalMessage}>
              هل أنت متأكد من تسجيل الخروج من حسابك؟
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setShowLogoutModal(false)}>
                <Text style={styles.modalButtonCancelText}>إلغاء</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButtonConfirm}
                onPress={confirmLogout}>
                <Icon
                  name="logout"
                  size={RFValue(18)}
                  color="#fff"
                  style={{marginLeft: RFValue(6)}}
                />
                <Text style={styles.modalButtonConfirmText}>تسجيل الخروج</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: Platform.OS === 'ios' ? RFValue(50) : RFValue(30),
    paddingBottom: RFValue(25),
    borderBottomLeftRadius: RFValue(30),
    borderBottomRightRadius: RFValue(30),
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  decorativeCircle1: {
    position: 'absolute',
    width: RFValue(180),
    height: RFValue(180),
    borderRadius: RFValue(90),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: RFValue(-50),
    right: RFValue(-40),
  },
  decorativeCircle2: {
    position: 'absolute',
    width: RFValue(120),
    height: RFValue(120),
    borderRadius: RFValue(60),
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    bottom: RFValue(-30),
    left: RFValue(-30),
  },
  decorativeCircle3: {
    position: 'absolute',
    width: RFValue(80),
    height: RFValue(80),
    borderRadius: RFValue(40),
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    top: RFValue(30),
    left: RFValue(20),
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: RFValue(20),
  },
  avatarContainer: {
    marginBottom: RFValue(12),
    position: 'relative',
  },
  avatar: {
    width: RFValue(85),
    height: RFValue(85),
    borderRadius: RFValue(42.5),
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: RFValue(0),
    right: RFValue(0),
    width: RFValue(28),
    height: RFValue(28),
    borderRadius: RFValue(14),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  userName: {
    fontSize: RFValue(20),
    fontFamily: FONTS.fontFamilyBold,
    color: '#fff',
    marginBottom: RFValue(4),
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 3,
  },
  userRole: {
    fontSize: RFValue(12),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#fff',
    opacity: 0.95,
    textAlign: 'center',
    paddingHorizontal: RFValue(30),
    lineHeight: RFValue(18),
  },
  scrollView: {
    flex: 1,
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginHorizontal: RFValue(15),
    marginTop: RFValue(15),
    borderRadius: RFValue(15),
    padding: RFValue(8),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(12),
    borderRadius: RFValue(10),
    marginVertical: RFValue(1),
  },
  menuItemActive: {
    backgroundColor: '#FFF0F3',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: RFValue(38),
    height: RFValue(38),
    borderRadius: RFValue(19),
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleActive: {
    backgroundColor: '#FFE5F0',
  },
  iconCircleLogout: {
    width: RFValue(38),
    height: RFValue(38),
    borderRadius: RFValue(19),
    backgroundColor: '#FFE5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#666',
    marginLeft: RFValue(10),
  },
  menuItemTextActive: {
    color: COLORS.primary,
    fontFamily: FONTS.fontFamilyBold,
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(12),
    borderRadius: RFValue(10),
    marginVertical: RFValue(1),
    marginTop: RFValue(6),
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  logoutItemText: {
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamilyBold,
    color: '#ff4757',
    marginLeft: RFValue(10),
  },
  profileContent: {
    backgroundColor: '#fff',
    marginHorizontal: RFValue(15),
    marginTop: RFValue(12),
    borderRadius: RFValue(15),
    padding: RFValue(16),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: RFValue(80),
  },
  sectionTitle: {
    fontSize: RFValue(17),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.primary,
    marginBottom: RFValue(8),
  },
  subtitle: {
    fontSize: RFValue(12),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#666',
    lineHeight: RFValue(18),
    marginBottom: RFValue(16),
  },
  formContainer: {
    marginTop: RFValue(6),
  },
  inputGroup: {
    marginBottom: RFValue(16),
  },
  label: {
    fontSize: RFValue(13),
    fontFamily: FONTS.fontFamilyBold,
    color: '#333',
    marginBottom: RFValue(6),
    // textAlign: 'right',
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: RFValue(10),
    paddingHorizontal: RFValue(14),
    paddingVertical: RFValue(11),
    fontSize: RFValue(13),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#333',
    textAlign: 'right',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  textArea: {
    height: RFValue(75),
    textAlignVertical: 'top',
    paddingTop: RFValue(11),
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RFValue(25),
    paddingVertical: RFValue(13),
    alignItems: 'center',
    marginTop: RFValue(8),
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  saveButtonText: {
    fontSize: RFValue(15),
    fontFamily: FONTS.fontFamilyBold,
    color: '#fff',
  },
  comingSoonContainer: {
    backgroundColor: '#fff',
    marginHorizontal: RFValue(15),
    marginTop: RFValue(12),
    borderRadius: RFValue(15),
    padding: RFValue(30),
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: RFValue(80),
  },
  comingSoonText: {
    fontSize: RFValue(17),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.primary,
    marginTop: RFValue(12),
  },
  comingSoonSubtext: {
    fontSize: RFValue(13),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#666',
    marginTop: RFValue(4),
  },
  bottomSpace: {
    height: RFValue(20),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(20),
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: RFValue(20),
    padding: RFValue(25),
    width: '90%',
    maxWidth: RFValue(350),
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  modalIconContainer: {
    alignItems: 'center',
    marginBottom: RFValue(20),
  },
  modalIconCircle: {
    width: RFValue(80),
    height: RFValue(80),
    borderRadius: RFValue(40),
    backgroundColor: '#FFE5E9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ff4757',
  },
  modalTitle: {
    fontSize: RFValue(20),
    fontFamily: FONTS.fontFamilyBold,
    color: '#333',
    textAlign: 'center',
    marginBottom: RFValue(10),
  },
  modalMessage: {
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamilyRegular,
    color: '#666',
    textAlign: 'center',
    lineHeight: RFValue(22),
    marginBottom: RFValue(25),
  },
  modalButtons: {
    flexDirection: 'row',
    gap: RFValue(12),
  },
  modalButtonCancel: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: RFValue(12),
    paddingVertical: RFValue(14),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  modalButtonCancelText: {
    fontSize: RFValue(15),
    fontFamily: FONTS.fontFamilyBold,
    color: '#666',
  },
  modalButtonConfirm: {
    flex: 1,
    backgroundColor: '#ff4757',
    borderRadius: RFValue(12),
    paddingVertical: RFValue(14),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#ff4757',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalButtonConfirmText: {
    fontFamily: FONTS.fontFamilyBold,
    color: '#fff',
    ...FONTS.body2,
    fontSize: RFValue(12),
  },
});
