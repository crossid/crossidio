import { Tag } from '@markdoc/markdoc'
import { Callout } from '@/components/Callout'
import { Tabs, Tab } from '@/components/markdoc/Tabs'
import { Img } from '@/components/markdoc/Img'
import { QuickLink, QuickLinks } from '@/components/docs/QuickLinks'
import { InlineField, Field } from '@/components/markdoc/InlineInput'

const tags = {
  inlineField: {
    render: InlineField,
    attributes: {
      name: String,
      text: String,
      placeholder: String,
      type: String,
    },
  },
  field: {
    render: Field,
    attributes: {
      path: String,
    },
  },
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
  'quick-links': {
    render: QuickLinks,
  },
  'quick-link': {
    selfClosing: true,
    render: QuickLink,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String },
    },
  },
}

export default tags
