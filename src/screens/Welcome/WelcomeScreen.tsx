import { useAppTheme } from '@/libs/config/theme'
import { Text, View } from 'react-native'

const WelcomeScreen = () => {
  const theme = useAppTheme()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
      }}
    >
      <Text style={{ color: theme.colors.background, fontWeight: 'bold', fontSize: 27 }}>
        Hello world!
      </Text>
    </View>
  )
}

export { WelcomeScreen }
