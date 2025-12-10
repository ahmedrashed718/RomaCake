import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {FONTS, COLORS} from '../../constants';
import {RFValue} from 'react-native-responsive-fontsize';

export default function ConfirmModal({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'موافق',
  cancelText = 'إلغاء',
  confirmButtonColor = COLORS.primary,
  cancelButtonColor = COLORS.lightGrey,
}) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onCancel}
        />
        <View style={styles.container}>
          {title && <Text style={styles.title}>{title}</Text>}
          {message && <Text style={styles.message}>{message}</Text>}
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton, {backgroundColor: cancelButtonColor}]}
              onPress={onCancel}
              activeOpacity={0.7}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton, {backgroundColor: confirmButtonColor}]}
              onPress={onConfirm}
              activeOpacity={0.8}>
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: RFValue(16),
    padding: RFValue(20),
    width: '85%',
    maxWidth: RFValue(400),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: RFValue(4),
    },
    shadowOpacity: 0.3,
    shadowRadius: RFValue(15),
    elevation: 10,
  },
  title: {
    fontSize: RFValue(16),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.primary,
    marginBottom: RFValue(12),
    textAlign: 'center',
  },
  message: {
    fontSize: RFValue(12),
    fontFamily: FONTS.fontFamilyRegular,
    color: COLORS.darkGray,
    lineHeight: RFValue(20),
    marginBottom: RFValue(20),
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: RFValue(12),
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: RFValue(10),
    borderRadius: RFValue(12),
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.lightGrey,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
  },
  cancelText: {
    fontSize: RFValue(12),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.darkGray,
  },
  confirmText: {
    fontSize: RFValue(12),
    fontFamily: FONTS.fontFamilyBold,
    color: COLORS.white,
  },
});

