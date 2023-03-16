import { BigText, Caption, IconContainer, Link, Paragraph, Widont } from './Common'
import { GridLockup } from './GridLockup'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

function AnimatedImage({ animate = false, delay = 0, ...props }) {
  return (
    <motion.img
      initial={false}
      animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay }}
      alt=""
      loading="lazy"
      decoding="async"
      {...props}
    />
  )
}

const w = 1213
const h = 675

const images = [
  {
    src: require('@/images/digitalocean/addon_box.png').default.src,
    x: 40,
    y: 24,
    width: 400,
  },
  {
    src: require('@/images/digitalocean/addons.png').default.src,
    x: 470,
    y: 25,
    width: 670,
  },
]

const getStyle = (x: number, y: number, width: number) => ({
  top: `${(y / h) * 100}%`,
  left: `${(x / w) * 100}%`,
  width: `${(width / w) * 100}%`,
})

export function DigitalOcean() {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  return (
    <section id="ready-made-components" className="z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <IconContainer
          className="bg-blue-500"
          light={require('@/images/icons/home/digitalocean.svg').default.src}
          dark={require('@/images/icons/home/digitalocean-dark.svg').default.src}
        />
        <Caption className="text-blue-500">DigitalOcean Partner</Caption>
        <BigText>
          <Widont>Move even faster with Digital Ocean.</Widont>
        </BigText>
        <Paragraph>
          Launch Crossid as a{' '}
          <a href="https://docs.digitalocean.com/products/marketplace/catalog/crossid/">
            DigitalOcean addon
          </a>{' '}
          directly from Digital Ocean&apos;s control panel. We have built code samples ready to be
          deployed in 1-click.
        </Paragraph>
        <Link href="/digitalocean" color="indigo" darkColor="gray">
          Learn more
        </Link>
      </div>
      <GridLockup
        className="mt-10"
        beams={0}
        overhang="lg"
        leftProps={{
          style: {
            maskImage: 'linear-gradient(to bottom, white, white, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, white, white, transparent)',
          },
        }}
        left={
          <div ref={inViewRef} className="flex justify-center">
            <div className="ml-[28%] w-[216%] flex-none sm:ml-0 sm:w-[76rem]">
              <div className="relative" style={{ paddingTop: `${(h / w) * 100}%` }}>
                {images.map(({ src, x, y, width }, index) => (
                  <AnimatedImage
                    key={src}
                    animate={inView}
                    delay={index * 0.2}
                    src={src}
                    className="absolute rounded-lg shadow-xl"
                    style={getStyle(x, y, width)}
                  />
                ))}
              </div>
            </div>
          </div>
        }
      />
    </section>
  )
}
