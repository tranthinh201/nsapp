import { MotiView, View } from 'moti'
import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'

type PaymentSkeletonProps = {
  length: number
}

const PaymentSkeleton = ({ length }: PaymentSkeletonProps) => {
  const width = Dimensions.get('screen').width

  return (
    <View style={styles.root}>
      <MotiView
        transition={{
          type: 'timing',
        }}
        style={{ paddingHorizontal: 10 }}
      >
        <View style={{ flexDirection: 'row' }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <View style={{ marginRight: 10 }} key={index}>
              <Skeleton width={60} height={30} colorMode="light" radius="square" />
            </View>
          ))}
        </View>
      </MotiView>

      {Array.from({ length: 15 }).map((_, index) => (
        <MotiView
          transition={{
            type: 'timing',
          }}
          style={[styles.container, { paddingVertical: 20, paddingLeft: 10 }]}
          key={index}
        >
          <Skeleton width="100%" height={22} colorMode="light" radius="square" />
        </MotiView>
      ))}
    </View>
  )
}
export { PaymentSkeleton }

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginTop: 12,
    padding: 12,
    marginHorizontal: 10,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  padded: {
    padding: 10,
  },
})
