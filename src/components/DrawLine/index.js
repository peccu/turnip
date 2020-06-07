export default {
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
}
