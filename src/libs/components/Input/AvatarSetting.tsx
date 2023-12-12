import AvatarPlaceholder from '@/assets/img/user.png'
import CameraSvg from '@/assets/svg/camera.svg'
import { useAppTheme } from '@/libs/config/theme'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import {
  ImageProps,
  ImageStyle,
  ImageURISource,
  Image as RNImage,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

interface AvatarSettingProps extends ImageProps {
  onChange?: (image: ImagePicker.ImagePickerAsset) => void
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
      props.onChange?.(result.assets[0])
    }
  }

  return (
    <TouchableOpacity
      onPress={pickImage}
      style={{
        height: 80,
        width: 80,
        borderRadius: 100,
        borderColor: colors.borderInput,
        borderWidth: 1,
        padding: 1,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
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
  },
  camera: {
    position: 'absolute',
    top: 5,
    right: 0,
    zIndex: 1,
  },
})
