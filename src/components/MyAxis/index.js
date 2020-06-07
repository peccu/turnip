export default {
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
}
