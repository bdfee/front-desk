const Expand = ({ collapse }: { collapse: boolean }) => (
  <strong>{collapse ? ' --' : ' +'}</strong>
)

export default Expand
