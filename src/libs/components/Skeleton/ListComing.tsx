import { MotiView, View } from 'moti'
import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { StyleSheet } from 'react-native'

const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />

type SkeletonProps = {
  length: number
}

const SkeletonListComing = ({ length }: SkeletonProps) => {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <View style={styles.root} key={index}>
          <Skeleton width={100} height={8} colorMode="light" radius="square" />

          <View style={{ flexDirection: 'row' }}>
            {Array.from({ length }).map((_, index) => (
              <MotiView
                transition={{
                  type: 'timing',
                }}
                key={index}
              >
                <View style={styles.container}>
                  <Skeleton radius="square" height={180} width={140} colorMode="light" />

                  <Skeleton width={100} height={6} colorMode="light" radius="square" />

                  <Skeleton width={120} height={9} colorMode="light" radius="square" />

                  <Skeleton width={100} height={6} colorMode="light" radius="square" />
                </View>
              </MotiView>
            ))}
          </View>
        </View>
      ))}
    </>
  )
}
export { SkeletonListComing }

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  container: {
    gap: 4,
    paddingBottom: 20,
    marginTop: 10,
    marginRight: 15,
  },
})
