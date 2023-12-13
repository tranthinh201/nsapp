import StarSvg from '@/assets/svg/star.svg'
import WarnSvg from '@/assets/svg/warn.svg'
import { Slider } from '@/libs/components'
import { textStyles } from '@/libs/styles'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

const InfoDisplay = ({ title, value }: { title: string; value: string }) => (
  <View style={{ flex: 1 }}>
    <Text style={{ textAlign: 'center', fontSize: 12, color: '#8F8F8F' }}>{title}</Text>

    <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 12, marginTop: 3 }}>
      {value}
    </Text>
  </View>
)

const InfoMovie = () => {
  const { height } = Dimensions.get('window')

  return (
    <>
      <Slider />

      <View style={styles.movie}>
        <Image
          source={{
            uri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
          }}
          style={styles.image}
        />

        <View style={styles.detail}>
          <Text style={styles.name}>WONKA</Text>

          <Text style={styles.genre}>Hài, Gia Đình, Giả Tưởng</Text>

          <View style={styles.rate}>
            <StarSvg width={14} height={14} style={{ marginTop: 2 }} />

            <Text style={styles.numberRate}>9.3/10</Text>

            <Text style={styles.totalRate}>(224 đánh giá)</Text>
          </View>

          <View style={styles.warn}>
            <WarnSvg width={13} height={13} style={{ marginTop: 2.5 }} />

            <Text style={styles.textWarn}>
              Không được phổ biến với người xem dưới 13 tuổi và phải có người bảo hộ đi kèm
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.info}>
        <InfoDisplay title="Ngày khởi chiếu" value="22/12/2001" />

        <View style={styles.infoCenter}>
          <InfoDisplay title="Thời lượng" value="100 phút" />
        </View>

        <InfoDisplay title="Ngôn ngữ" value="Việt Nam" />
      </View>

      <View style={{ padding: 10, marginTop: 10, backgroundColor: '#fff' }}>
        <Text style={{ fontWeight: '700', marginBottom: 5 }}>Nội dung phim</Text>

        <Text style={{ fontSize: 14 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quibusdam, rem
          aspernatur ab tenetur maxime cum asperiores ex, vel saepe animi non velit consequuntur
          neque fuga optio corrupti corporis adipisci.
        </Text>
      </View>
    </>
  )
}

export { InfoMovie }

const styles = StyleSheet.create({
  movie: {
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  image: {
    height: 140,
    width: 100,
    borderRadius: 8,
    marginTop: -14,
  },
  detail: {
    marginLeft: 20,
    marginTop: 10,
    height: 'auto',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
  },
  genre: {
    ...textStyles.text12,
    color: '#9B9B9B',
  },
  rate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  warn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 3,
    width: 150,
  },
  numberRate: { ...textStyles.text12, fontWeight: '700', marginHorizontal: 4 },
  totalRate: { fontSize: 11, color: '#9B9B9B' },
  textWarn: {
    fontSize: 12,
    color: '#9B9B9B',
    marginLeft: 5,
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  infoCenter: {
    padding: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#8F8F8F',
    flex: 1,
  },
})
