import { MotiView, View } from 'moti'
import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { StyleSheet } from 'react-native'

const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />

type SkeletonProps = {
  length: number
}

const SkeletonListFood = ({ length }: SkeletonProps) => {
  return (
    <View style={styles.root}>
      {Array.from({ length }).map((_, index) => (
        <MotiView
          transition={{
            type: 'timing',
          }}
          style={[styles.container, { padding: 10 }]}
          key={index}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Skeleton radius="square" height={50} width={50} colorMode="light" />

            <View style={{ marginLeft: 10 }}>
              <Skeleton width={100} height={8} colorMode="light" radius="square" />

              <Spacer height={8} />
              <Skeleton width={100} height={9} colorMode="light" radius="square" />
            </View>
          </View>
          <Spacer height={8} />
        </MotiView>
      ))}
    </View>
  )
}
export { SkeletonListFood }

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    width: 250,
    backgroundColor: '#FFF',
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 6,
    gap: 10,
    marginRight: 10,
  },
})
