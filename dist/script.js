const patterns = [
  {
    id: 0,
    name: 'high low high low high',
    comment: 'いきなり1倍を超えたらこれ。最大1.4倍なので、1.4倍に近ければ売るのが吉',
    min: 0.3,
    max: 1.4,
    prices: [
      {type: '↗︎1',     lengthmin: 0, lengthmax: 6, min: 0.9, max: 1.4},
      {type: '↘︎1', lengthmin: 2, lengthmax: 3, min: 0.6, max: 0.8, decbase: 0.04, decmin: 0, decmax: 0.06},
      {type: '↗︎2',     lengthmin: 1, lengthmax: 7, min: 0.9, max: 1.4},
      {type: '↘︎2', lengthmin: 2, lengthmax: 3, min: 0.6, max: 0.8, decbase: 0.04, decmin: 0, decmax: 0.06},
      {type: '↗︎3',     lengthmin: 0, lengthmax: 6, min: 0.9, max: 1.4}
    ]
  },
  {
    id: 1,
    name: 'high spike',
    comment: '0.9倍前後をうろうろして、1倍超えたらこれ。2倍を超えた時が最大なので売る',
    min: 0.4,
    max: 6.0,
    prices: [
      {type: '↘︎1', lengthmin: 1, lengthmax: 7, min: 0.85, max: 0.9, decbase: 0.03, decmin: 0, decmax: 0.02},
      {type: '→1', lengthmin: 1, lengthmax: 1, min: 0.9, max: 1.4},
      {type: '→2', lengthmin: 1, lengthmax: 1, min: 1.4, max: 2.0},
      {type: '→3', lengthmin: 1, lengthmax: 1, min: 2.0, max: 6.0},
      {type: '→4', lengthmin: 1, lengthmax: 1, min: 1.4, max: 2.0},
      {type: '→5', lengthmin: 1, lengthmax: 1, min: 0.9, max: 1.4},
      {type: '↗︎1', lengthmin: 0, lengthmax: 6, min: 0.4, max: 0.9}
    ]
  },
  {
    id: 2,
    name: 'constantly decreasing',
    comment: '木曜日午後になっても1倍を超えなかかったらこれ。諦める',
    min: 0.25,
    max: 0.9,
    prices: [
      {type: '↘︎1', lengthmin: 12, lengthmax: 12, min: 0.85, max: 0.9, decbase: 0.03, decmin: 0, decmax: 0.02}
    ]
  },
  {
    id: 3,
    name: 'small spike',
    comment: 'いきなり0.8倍よりも下回ることがあればこれ。1.4倍を超えた時が最大なので売る',
    min: 0.05,
    max: 2.0,
    prices: [
      {type: '↘︎1', lengthmin: 0, lengthmax: 7, min: 0.4, max: 0.9, decbase: 0.03, decmin: 0, decmax: 0.02},
      {type: '→1', lengthmin: 1, lengthmax: 1, min: 0.9, max: 1.4},
      {type: '→2', lengthmin: 1, lengthmax: 1, min: 0.9, max: 1.4},
      {type: '→3', lengthmin: 1, lengthmax: 1, min: 1.4, max: 2.0},
      {type: '→4', lengthmin: 1, lengthmax: 1, min: 0.05, max: 1.4},
      {type: '→5', lengthmin: 1, lengthmax: 1, min: 0.05, max: 0.9},
      {type: '→6', lengthmin: 0, lengthmax: 1, min: 0.05, max: 1.4},
      {type: '↘︎2', lengthmin: 0, lengthmax: 6, min: 0.4, max: 0.9, decbase: 0.03, decmin: 0, decmax: 0.02}
    ]
  },
]
var app = new Vue({
  el: '#app',
  data: {
    patterns,
    firstPrice: 90,
    price0: 0,
    price1: 0,
    price2: 0,
    price3: 0,
    price4: 0,
    price5: 0,
    price6: 0,
    price7: 0,
    price8: 0,
    price9: 0,
    price10: 0,
    price11: 0
  },
  methods: {
    round(float){
      return Math.ceil(float*100)/100
    },
    calcMin(price){
      if(!price.decbase || !price.decmax){
        return price.min
      }
      return price.min - price.lengthmax * (price.decbase + price.decmax)
    }
  },
  watch: {
    firstPrice: function (val) {
      window.localStorage.setItem('firstPrice', val)
    },
    price0: function (val) {window.localStorage.setItem('price0', val)},
    price1: function (val) {window.localStorage.setItem('price1', val)},
    price2: function (val) {window.localStorage.setItem('price2', val)},
    price3: function (val) {window.localStorage.setItem('price3', val)},
    price4: function (val) {window.localStorage.setItem('price4', val)},
    price5: function (val) {window.localStorage.setItem('price5', val)},
    price6: function (val) {window.localStorage.setItem('price6', val)},
    price7: function (val) {window.localStorage.setItem('price7', val)},
    price8: function (val) {window.localStorage.setItem('price8', val)},
    price9: function (val) {window.localStorage.setItem('price9', val)},
    price10: function (val) {window.localStorage.setItem('price10', val)},
    price11: function (val) {window.localStorage.setItem('price11', val)},
  },
  mounted: function () {
    const firstPrice = window.localStorage.getItem('firstPrice')
    if(firstPrice != "" && firstPrice != "null"){
      this.firstPrice = firstPrice
    }
    const price0 = window.localStorage.getItem('price0')
    const price1 = window.localStorage.getItem('price1')
    const price2 = window.localStorage.getItem('price2')
    const price3 = window.localStorage.getItem('price3')
    const price4 = window.localStorage.getItem('price4')
    const price5 = window.localStorage.getItem('price5')
    const price6 = window.localStorage.getItem('price6')
    const price7 = window.localStorage.getItem('price7')
    const price8 = window.localStorage.getItem('price8')
    const price9 = window.localStorage.getItem('price9')
    const price10 = window.localStorage.getItem('price10')
    const price11 = window.localStorage.getItem('price11')
    this.price0 = (price0 != "" && price0 != "null") ? price0 : ""
    this.price1 = (price1 != "" && price1 != "null") ? price1 : ""
    this.price2 = (price2 != "" && price2 != "null") ? price2 : ""
    this.price3 = (price3 != "" && price3 != "null") ? price3 : ""
    this.price4 = (price4 != "" && price4 != "null") ? price4 : ""
    this.price5 = (price5 != "" && price5 != "null") ? price5 : ""
    this.price6 = (price6 != "" && price6 != "null") ? price6 : ""
    this.price7 = (price7 != "" && price7 != "null") ? price7 : ""
    this.price8 = (price8 != "" && price8 != "null") ? price8 : ""
    this.price9 = (price9 != "" && price9 != "null") ? price9 : ""
    this.price10 = (price10 != "" && price10 != "null") ? price10 : ""
    this.price11 = (price11 != "" && price11 != "null") ? price11 : ""
    // this.$nextTick(function () {
    //   // Code that will run only after the
    //   // entire view has been rendered
    // })
  }
})
