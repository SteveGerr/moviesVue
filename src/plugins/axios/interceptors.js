function setParams (config) {
  const params = config.params || {}
  config.params = Object.assign(params, {
    apikey: process.env.VUE_APP_API_KEY,
    plot: 'full'
  })

  return config
}

function returnData (res) {
  console.log(res)
  // взвращаем сразу data
  return res.data
}

export default function (axios) {
  // При запросе используем интерсепторы, которые используют
  // setParams
  axios.interceptors.request.use(setParams)
  // response всегда должны идти после request
  // при ответе returnData
  axios.interceptors.response.use(returnData)
}
