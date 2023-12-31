import AvatarDefault from '@/assets/img/user.png'
import ArrowRightSvg from '@/assets/svg/arrow-right.svg'
import LockSvg from '@/assets/svg/lock.svg'
import { Header } from '@/libs/components'
import { useAppTheme } from '@/libs/config/theme'
import { textStyles } from '@/libs/styles'
import { NavigationProp } from '@/navigation'
import { RootStore } from '@/store'
import { useNavigation } from '@react-navigation/native'
import { isEqual } from 'lodash'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, Text } from 'react-native-paper'
import { useSelector } from 'react-redux'

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>()
  const { colors } = useAppTheme()
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )

  return (
    <View style={styles.root}>
      <Header title="Profile" hideHeaderLeft />

      <KeyboardAwareScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate('InformationStack', { screen: 'INFORMATION' })}
            style={styles.touch}
          >
            <View style={styles.avatar}>
              <Image
                source={user?.avatar ? { uri: user?.avatar } : AvatarDefault}
                style={{ width: '100%', height: '100%', borderRadius: 100 }}
              />
            </View>

            <View style={{ marginLeft: 20 }}>
              <Text
                style={{
                  ...textStyles.content16,
                  fontWeight: '500',
                  marginBottom: 4,
                }}
              >
                {user?.name}
              </Text>

              <Text style={{ ...textStyles.text12_regular, color: colors.grey }}>
                {user?.email}
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              ...styles.touch,
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginTop: 20,
            }}
          >
            <View style={{ marginBottom: 20 }}>
              <Text style={textStyles.title}>Account</Text>
            </View>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
              onPress={() => navigation.navigate('InformationStack', { screen: 'CHANGE_PASSWORD' })}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    marginRight: 12,
                    borderRadius: 12,
                    padding: 6,
                    borderWidth: 1,
                    borderColor: colors.grey,
                  }}
                >
                  <LockSvg width={20} height={20} />
                </View>

                <Text style={textStyles.content16}>Change password</Text>
              </View>

              <Button>
                <ArrowRightSvg />
              </Button>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export { ProfileScreen }

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 29,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  touch: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    marginTop: 18,
    borderColor: '#545454',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
})
