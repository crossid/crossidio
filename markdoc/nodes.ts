import { FenceClient } from '@/components/Fence'
import { LinkNode } from '@/components/markdoc/Link'
import { ImageNode } from '@/components/markdoc/Image'
import { nodes as mdnodes } from '@markdoc/markdoc'

const nodes = {
  fence: {
    render: FenceClient,
    attributes: {
      language: {
        type: String,
      },
    },
  },
  link: {
    render: LinkNode,
    attributes: {
      ...mdnodes.link.attributes,
      rel: {
        type: String,
      },
      target: {
        type: String,
      },
    },
  },
  image: {
    render: ImageNode,
    attributes: {
      ...mdnodes.image.attributes,
    },
  },
}

export default nodes
