import { Tag } from '@markdoc/markdoc'
import { Callout } from '@/components/Callout'
import { Tabs, Tab } from '@/components/markdoc/Tabs'
import { Img } from '@/components/markdoc/Img'

const tags = {
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: 'note',
        matches: ['note', 'warning'],
        errorLevel: 'critical',
      },
    },
    render: Callout,
  },
  tabs: {
    render: Tabs,
    attributes: {},
    transform(node, config) {
      const labels = node
        .transformChildren(config)
        .filter((child) => child && child.name === 'Tab')
        .map((tab) => (typeof tab === 'object' ? tab.attributes.label : null))

      return new Tag(this.render, { labels }, node.transformChildren(config))
    },
  },
  tab: {
    render: Tab,
    attributes: {
      label: {
        type: String,
      },
    },
  },
  img: {
    render: Img,
    attributes: {
      name: {
        type: String,
      },
      alt: {
        type: String,
      },
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
    },
  },
}

export default tags
