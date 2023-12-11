import CloseCircleSvg from '@/assets/svg/close-circle.svg'
import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ModalProps } from 'react-native-modal'
import { ModalBase } from './ModalBase'

type Props = {
  isVisible: boolean
  onCloseModal: () => void
  content?: string | JSX.Element
  textCancel?: string
  textConfirm?: string
  title?: string
  hideClose?: boolean
  modalProps?: ModalProps
  onBackDropPress?: () => void
}

const Modal: React.FC<Props> = ({
  isVisible,
  hideClose = false,
  onCloseModal,
  onBackDropPress,
  content,
  title,
  ...modalProps
}) => {
  useEffect(() => {
    if (isVisible) {
    }
  }, [isVisible])

  return (
    <ModalBase
      onCloseModal={onCloseModal}
      onBackDropPress={onBackDropPress}
      {...modalProps}
      {...{ isVisible }}
    >
      {title ? (
        <View style={{ marginBottom: 20, marginTop: 10 }}>
          <Text style={styles.title}>{title}</Text>
        </View>
      ) : (
        <></>
      )}

      {!hideClose ? (
        <TouchableOpacity style={styles.close} onPress={onCloseModal}>
          <CloseCircleSvg width={20} height={20} />
        </TouchableOpacity>
      ) : (
        <></>
      )}

      {typeof content === 'string' ? (
        <View style={styles.content}>
          <Text style={styles.description}>{content}</Text>
        </View>
      ) : (
        <View>{content}</View>
      )}
    </ModalBase>
  )
}

export { Modal }

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    width: '42%',
    borderWidth: 2,
    borderRadius: 30,
  },
  textBtnCancel: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  textBtnConfirm: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  wrapLoading: { paddingVertical: 15, paddingBottom: 20 },
  title: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
  close: { position: 'absolute', top: 4, right: 4, zIndex: 1 },
})
