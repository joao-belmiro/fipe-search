export const state = () => ({
  fipeData: {
    model: '',
    price: '',
    brand: '',
    modelYear: 0,
    fuel: '',
    referenceMonth: '',
    codeFipe: ''
  },
  fipeHistory: {
    months: [],
    values: []
  },
  allFetched: false
})

export const getters = {
  getFipeData (state) {
    return state.fipeData
  },
  getFipeHistory (state) {
    return state.fipeHistory
  },
  getAllFetched (state) {
    return state.allFetched
  }
}

export const mutations = {
  setFipeData (state, fipeData) {
    Object.keys(state.fipeData).forEach((property) => {
      state.fipeData[property] = fipeData[property]
    })
  },
  setFipeHistory (state, fipeHistory) {
    fipeHistory.reverse()
    state.fipeHistory.months = fipeHistory.map(history => history.month)
    state.fipeHistory.values = fipeHistory.map(history => parseFloat(history.price.replace('R$ ', '').replace('.', '').replace(',', '.')))
  },
  setAllFetched (state, allFetched) {
    state.allFetched = allFetched
  }
}
