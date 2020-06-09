 export default {
   props: [
     'cx',
     'cy',
     'r',
     'stroke',
     'strokeWidth',
     'fill'
   ],
   template: `<svg width="10px" height="10px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle
    :cx="cx || 50"
    :cy="cy || 50"
    :r="r || 50"
    :stroke="stroke"
    :stroke-width="strokeWidth"
    :fill="fill"/>
</svg>`
 }
