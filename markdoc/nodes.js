import { Fence } from '@/components/Fence'

// import { Fence } from '../src/components/Fence'

// function Fence({ children, language }) {
//   return <div>YEY</div>
// }

const nodes = {
  fence: {
    render: Fence,
    attributes: {
      language: {
        type: String,
      },
    },
  },
}

export default nodes
