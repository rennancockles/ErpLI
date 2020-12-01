import Vue from 'vue'

Vue.filter('toBRDate', function (value) {
  if (value) {
    const data = new Date(value)
    return `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`
  } else {
    return ''
  }
})

Vue.filter('money', function (value) {
  if (value) {
    value = value.toString()
    value = parseFloat(value).toFixed(2).replace('.', ',')
    return `R$ ${value}`
  } else {
    return ''
  }
})
