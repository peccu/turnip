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
    comment: '0.9倍前後をうろうろして、1倍超えたらこれ。2倍を超えたら時が最大なので売る',
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
    firstPrice: 90
  },
  methods: {
    round(float){
      return Math.ceil(float*100)/100
    }
  },
  watch: {
    firstPrice: function (val) {
      window.localStorage.setItem('firstPrice', val)
    },
  },
  mounted: function () {
    const saved = window.localStorage.getItem('firstPrice')
    if(saved != ""){
      this.firstPrice = saved
    }
    // this.$nextTick(function () {
    //   // Code that will run only after the
    //   // entire view has been rendered
    // })
  }
})
