export function formatNumberVND(input: number) {
  const formatter = input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return `${formatter}đ`
}
