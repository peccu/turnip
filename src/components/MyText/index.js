export default {
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
}
