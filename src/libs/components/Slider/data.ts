export type MovieDataType = {
  id: number
  img?: string
  video?: string
}

const data: MovieDataType[] = [
  {
    id: 5,
    video: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    id: 1,
    img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
  },
  {
    id: 2,
    img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcScUwXu7wznX70mqPhL4ZJx93F-YkMZyUaEllCS2kICBqUmHpzM',
  },
  {
    id: 3,
    img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
  },
  {
    id: 4,
    img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
  },
]

export { data }
