import { MotiView, View } from 'moti'
import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { StyleSheet } from 'react-native'

const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />

type SkeletonCinemaProps = {
  length: number
}

const SkeletonCinema = ({ length }: SkeletonCinemaProps) => {
  return (
    <View style={styles.root}>
      <MotiView
        transition={{
          type: 'timing',
        }}
        style={{ paddingHorizontal: 10 }}
      >
        <Skeleton width={160} height={14} colorMode="light" radius="square" />

        <Spacer height={8} />
      </MotiView>

      {Array.from({ length }).map((_, index) => (
        <MotiView
          transition={{
            type: 'timing',
          }}
          style={[styles.container, { padding: 20 }]}
          key={index}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Skeleton radius="square" height={35} width={35} colorMode="light" />

            <View style={{ marginLeft: 10 }}>
              <Skeleton width={140} height={8} colorMode="light" radius="square" />
              <Spacer height={8} />
              <Skeleton width={150} height={6} colorMode="light" radius="square" />
            </View>
          </View>
          <Spacer height={8} />
        </MotiView>
      ))}
    </View>
  )
}
export { SkeletonCinema }

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
