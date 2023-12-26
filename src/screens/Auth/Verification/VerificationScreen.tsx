import { verifyForgotPassword } from '@/libs/api/auth'
import { Header } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { RouteAuthStackType } from '@/libs/route'
import { textStyles } from '@/libs/styles'
import { NavigationProp } from '@/navigation'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { Alert, StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Text } from 'react-native-paper'

const VerificationScreen = () => {
  const { colors } = useAppTheme()
  const route = useRoute<RouteAuthStackType<'VERIFICATION'>>()
  const navigation = useNavigation<NavigationProp>()

  const mutation = useMutation(verifyForgotPassword)

  return (
    <View style={styles.root}>
      <Header />

      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={{ ...textStyles.title, marginTop: 20 }}>Enter Verification Code</Text>

          <Text style={{ ...textStyles.text12_regular, marginTop: 10 }}>
            Enter code that we have sent to your email {route.params?.email}
          </Text>

          <OTPInputView
            pinCount={6}
            autoFocusOnLoad
            codeInputFieldStyle={{
              ...textStyles.title,
              ...styles.otpInput,
              color: colors.textGray,
              margin: 0,
              borderColor: mutation.error ? colors.error : colors.borderInput,
            }}
            keyboardType="number-pad"
            style={{ height: 100 }}
            onCodeFilled={(code) => {
              mutation.mutate(
                { token: code },
                {
                  onSuccess: (response) => {
                    if (response.status === 201) {
                      navigation.navigate('AuthStack', {
                        screen: 'RESET_PASSWORD',
                        params: { token: code },
                      })
                    } else {
                      Alert.alert('Error', 'Your token is invalid')
                    }
                  },
                },
              )
            }}
          />

          <Text style={{ ...textStyles.text12_regular, marginTop: 0 }}>
            Didn’t receive the code?{' '}
            <Text style={{ ...textStyles.text14, color: colors.primary }}>Resend Code</Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: '100%',
  },
  container: {
    paddingHorizontal: 29,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  otpInput: {
    width: 45,
    height: 50,
    backgroundColor: '#F3F8FF',
  },
})

export { VerificationScreen }
