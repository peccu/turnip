import patterns from './patterns'

Vue.component('my-svg', {
  props: [
    'canvas'
  ],
  data(){
    return {
      width: this.canvas.width,
      height: this.canvas.height,
      padding: this.canvas.padding
    }
  },
  template: `<div :style="'height: ' + (height + padding * 2) + 'px; width: ' + (width + padding * 2) + 'px; margin: auto;'">
  <svg
    width="100%"
    height="100%"
    :viewbox="'0 0 ' + (height + padding * 2) + ' ' + (width + padding * 2)"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
  >
    <slot></slot>
  </svg>
</div>
`
})

Vue.component('my-text', {
  props: [
    'x', 'y',
    'fontSize', 'fill', 'fontWeight',
    'dominantBaseline', 'textAnchor'
  ],
  template: `<text
  :x="x"
  :y="y"
  font-family="-apple-system, system-ui, BlinkMacSystemFont, Roboto"
  :dominant-baseline="dominantBaseline || 'middle'"
  :text-anchor="textAnchor || 'middle'"
  :font-size="fontSize"
  :fill="fill"
  :font-weight="fontWeight"
>
  <slot></slot>
</text>
`
})

Vue.component('my-axis', {
  props: [
    'points',
    'canvas'
  ],
  data(){
    return {
      width: this.canvas.width,
      height: this.canvas.height,
      padding: this.canvas.padding,
      lines: 5,
    }
  },
  methods: {
    offset_x(i){
      return this.padding + (i/this.lines) * this.width
    },
    offset_y(i){
      return this.padding + (i/this.lines) * this.height
    },
  },
  computed: {
    max_x(){
      return Math.max(...this.points.map(e=>e.x))
    },
    max_y(){
      return Math.max(...this.points.map(e=>e.y))
    }
  },
  filters: {
    round(val){return Math.round(val)}
  },
  template: `<g>
<!-- y axis -->
<template v-for="i in [0, 1, 2, 3, 4, 5]">
  <path v-if="i==lines" stroke="#74838f" stroke-width="2" fill="none"
        :d="'M ' + padding + ' ' + offset_y(i) + ' L ' + (width + padding) + ' ' + offset_y(i)" />
  <path v-else stroke="#74838f" stroke-dasharray="10 6" stroke-width="0.5"
        :d="'M ' + padding + ' ' + offset_y(i) + ' L ' + (width + padding) + ' ' + offset_y(i)" />
<my-text
  :x="padding"
  :y="offset_y(i)"
  text-anchor="end"
  font-size="10"
  fill="#74838f"
 >
 {{((lines - i)/lines * max_y) | round}}
</my-text>
</template>
<!-- x axis -->
<template v-for="i in [0, 1, 2, 3, 4, 5]">
  <path stroke="#74838f" stroke-width="2.0"
        :d="'M ' + offset_x(i) + ' ' + (height + padding) + ' L ' + offset_x(i) + ' ' + (height + padding + 10)" />
<my-text
  :x="offset_x(i)"
  :y="height + padding + 10"
  dominant-baseline="hanging"
  font-size="10"
  fill="#74838f"
 >
 {{i/lines * max_x | round}}
</my-text>
</template>
</g>
`
})

Vue.component('draw-line', {
  props: [
    'points',
    'color',
    'canvas',
    'max'
  ],
  data(){
    return {
      width: this.canvas.width,
      height: this.canvas.height,
      padding: this.canvas.padding,
    }
  },
  computed: {
    path(){
      if(this.points.length == 0){
        return 'M 0 0'
      }
      const max_x = Math.max(...this.points.map(e=>e.x))
      const max_y = this.max || Math.max(...this.points.map(e=>e.y))
      const _path = 'M ' + this.points.map(p => {
        return {
          x: (p.x / max_x * this.width) + this.padding,
          y: (p.y / max_y * -1 * this.height) + this.padding + this.height
        }
      }).map(p => `${p.x} ${p.y}`).join(' L ')
      return _path
    }
  },
  template: `<path :stroke="color" stroke-linejoin="round" :d="path" stroke-width="2.0" fill="none" />`
})

const app = new Vue({
  el: '#app',
  data: {
    // graph
    canvas: {
      height: 200,
      width: 330,
      padding: 20,
    },
    points: [],
    firstPrices: [],
    color: '#8ff0a4',
    lines: 5,
    // turnip
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
    price11: 0,
    max_y: 0
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
    },
    calcMax(price){
      if(!price.decbase){
        return price.max
      }
      return price.max - price.lengthmax * price.decbase
    },
    setPoints(){
      const prices = [
        this.price0 || 0,
        this.price1 || 0,
        this.price2 || 0,
        this.price3 || 0,
        this.price4 || 0,
        this.price5 || 0,
        this.price6 || 0,
        this.price7 || 0,
        this.price8 || 0,
        this.price9 || 0,
        this.price10 || 0,
        this.price11 || 0
      ]
      this.points = prices.map((p, i) => {return {id: i, x: i, y: parseInt(p)}})
      this.firstPrices = prices.map((e,i)=>{return {id: i, x: i, y: parseInt(this.firstPrice)}})
      this.max_y = Math.max(...this.points.map(e=>e.y))
    }
  },
  watch: {
    firstPrice: function (val) {
      window.localStorage.setItem('firstPrice', val)
      this.setPoints()
    },
    price0: function (val) {window.localStorage.setItem('price0', val); this.setPoints()},
    price1: function (val) {window.localStorage.setItem('price1', val); this.setPoints()},
    price2: function (val) {window.localStorage.setItem('price2', val); this.setPoints()},
    price3: function (val) {window.localStorage.setItem('price3', val); this.setPoints()},
    price4: function (val) {window.localStorage.setItem('price4', val); this.setPoints()},
    price5: function (val) {window.localStorage.setItem('price5', val); this.setPoints()},
    price6: function (val) {window.localStorage.setItem('price6', val); this.setPoints()},
    price7: function (val) {window.localStorage.setItem('price7', val); this.setPoints()},
    price8: function (val) {window.localStorage.setItem('price8', val); this.setPoints()},
    price9: function (val) {window.localStorage.setItem('price9', val); this.setPoints()},
    price10: function (val) {window.localStorage.setItem('price10', val); this.setPoints()},
    price11: function (val) {window.localStorage.setItem('price11', val); this.setPoints()},
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
    this.setPoints()
    // this.$nextTick(function () {
    //   // Code that will run only after the
    //   // entire view has been rendered
    // })
  }
})
