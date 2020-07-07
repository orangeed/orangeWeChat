// const formatTime = date => {
//   var date = new Date();
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }

const timestampToTime = timestamp =>  {
  var date = new Date(timestamp * 1000)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y + M + D + h + m + s
}

module.exports = {
  formatTime: timestampToTime
}