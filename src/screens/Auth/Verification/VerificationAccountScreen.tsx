import { resendVerifyAccount, verifyAccount } from '@/libs/api/auth'
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

const VerificationAccountScreen = () => {
  const { colors } = useAppTheme()
  const route = useRoute<RouteAuthStackType<'VERIFICATION'>>()
  const navigation = useNavigation<NavigationProp>()
  const verify = useMutation(verifyAccount)
  const resendVerify = useMutation(resendVerifyAccount)

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
              borderColor: verify.error ? colors.error : colors.borderInput,
            }}
            keyboardType="number-pad"
            style={{ height: 100 }}
            onCodeFilled={(code) => {
              verify.mutate(
                { token: code },
                {
                  onSuccess: (response) => {
                    console.log(JSON.stringify(response))
                    if (response.status === 201) {
                      navigation.navigate('AuthStack', {
                        screen: 'SIGN_IN',
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
            <Text
              style={{ ...textStyles.text14, color: colors.primary }}
              onPress={() =>
                resendVerify.mutate({
                  email: route.params?.email,
                })
              }
            >
              Resend Code
            </Text>
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

export { VerificationAccountScreen }
