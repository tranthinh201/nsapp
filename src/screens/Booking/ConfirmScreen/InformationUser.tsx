import { useAppTheme } from '@/libs/config/theme'
import { textStyles } from '@/libs/styles'
import { RootStore } from '@/store'
import { isEqual } from 'lodash'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useSelector } from 'react-redux'

const InformationUser = () => {
  const { colors } = useAppTheme()
  const { user } = useSelector(
    ({ auth }: RootStore) => ({
      user: auth.user,
    }),
    isEqual,
  )
  const fullName = `${user?.last_name} ${user?.name}`

  return (
    <View style={styles.root}>
      <Text
        style={[
          textStyles.text18,
          {
            fontWeight: '700',
          },
        ]}
      >
        Thông tin người nhận
      </Text>

      <View style={styles.container}>
        <View>
          <Text style={{ fontWeight: '700' }}>{fullName}</Text>

          <Text style={[{ color: colors.textGrey }, textStyles.text12]}>
            {user?.phone_number ? user?.phone_number : '0987654321'} - {user?.email}
          </Text>
        </View>
      </View>
    </View>
  )
}

export { InformationUser }

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    gap: 10,
    padding: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
})
