export function realFormatSecond (second) {
  if (!second) return '0:00:00'
  const hours = Math.floor(second / 3600)
  second = second - hours * 3600
  const mimute = Math.floor(second / 60)
  second = second - mimute * 60
  return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
}

export function numToFixed (num, point) {
  return Number(Number(num).toFixed(point))
}

export function randomNum (len) {
  return Math.floor(Math.random() * len)
}
