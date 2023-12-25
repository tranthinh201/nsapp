import { NavigationProp } from '@/navigation'
import { Dispatch } from '@/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { View } from 'moti'
import { StyleSheet } from 'react-native'
import { Button, Modal as ModalPaper, Portal, Text } from 'react-native-paper'
import { useDispatch } from 'react-redux'

type ModalProps = {
  openModal: boolean
  hideModal: () => void
}

const ModalSignOut = ({ openModal, hideModal }: ModalProps) => {
  const dispatch = useDispatch<Dispatch>()
  const navigation = useNavigation<NavigationProp>()

  const handleLogout = async () => {
    await AsyncStorage.removeItem('persist:root:auth')
    await AsyncStorage.removeItem('user')
    dispatch.auth.setUser(null as never)
    navigation.navigate('BottomTabs', { screen: 'TAB_HOME' })
  }

  return (
    <Portal>
      <ModalPaper visible={openModal} onDismiss={hideModal} contentContainerStyle={styles.modal}>
        <View style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <Text style={{ fontWeight: '700', fontSize: 16 }}>Đăng xuất</Text>

          <Text>Bạn có muốn kết thúc phiên đăng nhập nay không?</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
          <Button onPress={hideModal} style={styles.button}>
            ĐÓNG
          </Button>

          <Button onPress={handleLogout} mode="contained" style={styles.button}>
            ĐỒNG Ý
          </Button>
        </View>
      </ModalPaper>
    </Portal>
  )
}

export { ModalSignOut }

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
