import { View } from 'moti'
import { StyleSheet } from 'react-native'
import { Button, Modal as ModalPaper, Portal, Text } from 'react-native-paper'

type ModalProps = {
  openModal: boolean
  hideModal: () => void
  handleConfirm: () => void
}

const Modal = ({ openModal, hideModal, handleConfirm }: ModalProps) => {
  return (
    <Portal>
      <ModalPaper visible={openModal} onDismiss={hideModal} contentContainerStyle={styles.modal}>
        <View style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <Text style={{ fontWeight: '700' }}>Xác nhận</Text>

          <Text>
            Tôi xác nhận mua vé cho người xem từ 13 tuối trở lên. Rạp phim không được phép phục vụ
            khách hàng dưới 13 tuổi cho các suất chiếu kết thúc sau 22:00 và 16 tuổi cho các suất
            chiếu kết thúc sau 23:00. Rạp sẽ không hoàn tiền nếu người xem không đáp ứng đủ điều
            kiện. Tham khảo quy định của Bộ Văn Hóa, Thế Thao và Du Lịch.
          </Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
          <Button onPress={hideModal} style={styles.button}>
            Hủy
          </Button>

          <Button onPress={handleConfirm} mode="contained" style={styles.button}>
            Đồng ý
          </Button>
        </View>
      </ModalPaper>
    </Portal>
  )
}

export { Modal }

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  button: { borderRadius: 6, width: '50%' },
})
