import { SwatchProps } from '../../types'

const Swatch = (props: SwatchProps) => {
  return (
    <div
      style={{
        backgroundColor: props.color,
        padding: 10,
        marginLeft: 10,
      }}
    ></div>
  )
}

export default Swatch
