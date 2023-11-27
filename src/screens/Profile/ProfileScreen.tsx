import { ProfileStackProps } from '@/navigation/BottomTabs'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileStackProps['navigation']>()

  const handlePress = () => {
    navigation.navigate('PROFILE_CHANGE_PASSWORD')
  }

  return (
    <View style={styles.container}>
      <Text>Profile</Text>

      <Button onPress={handlePress}>Change Password</Button>
    </View>
  )
}

export { ProfileScreen }

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 29,
  },
})
