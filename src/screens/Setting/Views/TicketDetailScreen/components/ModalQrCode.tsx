import { View } from 'moti'
import { Dimensions, StyleSheet } from 'react-native'
import { Modal as ModalPaper } from 'react-native-paper'
import QRCode from 'react-native-qrcode-svg'

type ModalProps = {
  openModal: boolean
  hideModal: () => void
  dataQrCode: string
}

const ModalQrCode = ({ openModal, hideModal, dataQrCode }: ModalProps) => {
  const width = Dimensions.get('window').width
  return (
    <ModalPaper visible={openModal} onDismiss={hideModal} contentContainerStyle={styles.modal}>
      <View style={{ display: 'flex', gap: 10 }}>
        <QRCode value={dataQrCode} size={width - 80} />
      </View>
    </ModalPaper>
  )
}

export { ModalQrCode }

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
})
