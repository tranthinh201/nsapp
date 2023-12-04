import AvatarPlaceholder from '@/assets/favicon.png'
import CameraSvg from '@/assets/svg/camera.svg'
import { useAppTheme } from '@/libs/config/theme'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import {
  Image,
  ImageProps,
  ImageStyle,
  ImageURISource,
  Image as RNImage,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

interface AvatarSettingProps extends ImageProps {
  onChange?: (image: Image) => void
  source: ImageURISource
  styleCustom?: StyleProp<ImageStyle>
  hasCamera?: boolean
}

export const AvatarSetting: React.FC<AvatarSettingProps> = ({
  styleCustom,
  hasCamera = true,
  ...props
}) => {
  const { colors } = useAppTheme()
  const [image, setImage] = useState<string | undefined>(props?.source?.uri || undefined)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  return (
    <TouchableOpacity
      onPress={pickImage}
      style={[styles.avatar, { borderColor: colors.borderInput }]}
    >
      {hasCamera ? <CameraSvg style={styles.camera} /> : null}
      <RNImage
        style={[styles.avatar, styleCustom]}
        {...props}
        source={image ? { uri: image } : AvatarPlaceholder}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  avatar: {
    height: 76,
    width: 76,
    borderRadius: 100,
    borderWidth: 1,
  },
  camera: {
    position: 'absolute',
    top: 5,
    right: 0,
    zIndex: 1,
  },
})
