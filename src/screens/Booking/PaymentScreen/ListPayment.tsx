import PayPalSvg from '@/assets/svg/paypal.svg'
import StripeSvg from '@/assets/svg/stripe.svg'
import { useAppTheme } from '@/libs/config/theme'
import { FlashList } from '@shopify/flash-list'
import { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

const ListPayment = () => {
  const { colors } = useAppTheme()
  const [payment, setPayment] = useState(1)

  const data = [
    { name: 'MOMO', id: 1, icon: <StripeSvg width={60} height={30} /> },
    {
      name: 'PAYPAL',
      id: 2,
      icon: <PayPalSvg width={60} height={30} />,
    },
  ]

  const handleChoosePayment = (value: number) => {
    setPayment(value)
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Phương thức thanh toán</Text>

      <FlashList
        data={data}
        horizontal
        estimatedItemSize={100}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={[
                styles.icon,
                {
                  borderColor: payment === item.id ? colors.primary : colors.divider,
                  backgroundColor:
                    payment === item.id ? 'rgba(81, 114, 176, 0.1)' : colors.background,
                },
              ]}
              onPress={() => handleChoosePayment(item.id)}
            >
              {item.icon}
            </Pressable>
          )
        }}
      />
    </View>
  )
}

export { ListPayment }

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    borderRadius: 6,
    borderWidth: 1.5,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
    marginLeft: 10,
  },
})
