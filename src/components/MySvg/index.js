 //* Vue.component('my-svg', */
 export default {
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
</div>`
 }
