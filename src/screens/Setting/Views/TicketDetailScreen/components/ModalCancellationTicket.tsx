import { cancelTransaction } from '@/libs/api/booking'
import { NavigationProp } from '@/navigation'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { View } from 'moti'
import { Alert, StyleSheet } from 'react-native'
import { Button, Modal as ModalPaper, Portal, Text } from 'react-native-paper'

type ModalProps = {
  openModal: boolean
  hideModal: () => void
  ticket_id: string
}

const ModalCancellationTicket = ({ openModal, hideModal, ticket_id }: ModalProps) => {
  const navigation = useNavigation<NavigationProp>()

  const mutate = useMutation(cancelTransaction, {
    onSuccess: async () => {
      hideModal()
      Alert.alert('Thông báo', 'Huỷ vé thành công!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('BottomTabs', { screen: 'TAB_HOME' })
          },
        },
      ])
    },
    onError: () => {
      hideModal()
      Alert.alert('Thông báo', 'Huỷ vé thất bại!')
    },
  })

  const handleCancelTicket = async () => {
    await mutate.mutateAsync({ id: ticket_id })
  }

  return (
    <Portal>
      <ModalPaper visible={openModal} onDismiss={hideModal} contentContainerStyle={styles.modal}>
        <View style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <Text style={{ fontWeight: '700', fontSize: 16 }}>Huỷ vé</Text>

          <Text>Bạn có chắc chắn muốn huỷ vé xem phim này không?</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
          <Button onPress={hideModal} style={styles.button}>
            ĐÓNG
          </Button>

          <Button onPress={handleCancelTicket} mode="contained" style={styles.button}>
            ĐỒNG Ý
          </Button>
        </View>
      </ModalPaper>
    </Portal>
  )
}

export { ModalCancellationTicket }

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
