import { useTheme } from '@/hooks/useTheme'
import { motion } from 'framer-motion'

export function NavSvg({ fillPercent }: { fillPercent: number }) {
  const [theme] = useTheme()
  return (
    <>
      {theme === 'light' && (
        <motion.svg
          viewBox="0 0 42 644"
          xmlns="http://www.w3.org/2000/svg"
          className="w-100 h-100 grid-in-[navbar] dark:hidden"
        >
          <defs>
            <motion.linearGradient
              spreadMethod="repeat"
              animate={{
                gradientTransform: ['rotate(90) translate(0,0)', 'rotate(90) translate(0.99,0)'],
                transition: {
                  duration: 5,
                  repeat: Infinity,
                  repeatType: 'loop',
                },
              }}
              id="narbar-gradient"
            >
              <stop offset="0" stopColor="#d397fa"></stop>
              <stop offset="0.05" stopColor="#c98ff7"></stop>{' '}
              <stop offset="0.1" stopColor="#bf87f4"></stop>{' '}
              <stop offset="0.2" stopColor="#b480f2"></stop>{' '}
              <stop offset="0.25" stopColor="#a979ef"></stop>{' '}
              <stop offset="0.35" stopColor="#9d71ed"></stop>{' '}
              <stop offset="0.4" stopColor="#916bea"></stop>{' '}
              <stop offset="0.5" stopColor="#8364e8"></stop>{' '}
              <stop offset="0.6" stopColor="#916bea"></stop>{' '}
              <stop offset="0.65" stopColor="#9d71ed"></stop>{' '}
              <stop offset="0.75" stopColor="#a979ef"></stop>{' '}
              <stop offset="0.8" stopColor="#b480f2"></stop>{' '}
              <stop offset="0.9" stopColor="#bf87f4"></stop>{' '}
              <stop offset="0.95" stopColor="#c98ff7"></stop>{' '}
              <stop offset="1" stopColor="#d397fa"></stop>
            </motion.linearGradient>
          </defs>{' '}
          <rect height="644" width="6" x="18" fill="lightgray"></rect>{' '}
          <motion.rect
            height="644"
            width="6"
            x="18"
            fill="url(#narbar-gradient)"
            animate={{
              clipPath: `polygon(0 0,100% 0,100% ${fillPercent}%,0 ${fillPercent}%)`,
            }}
          ></motion.rect>
        </motion.svg>
      )}
      {theme === 'dark' && (
        <motion.svg
          viewBox="0 0 42 644"
          xmlns="http://www.w3.org/2000/svg"
          className="w-100 h-100 grid-in-[navbar] dark:block"
        >
          <defs>
            <motion.linearGradient
              spreadMethod="repeat"
              animate={{
                gradientTransform: ['rotate(90) translate(0,0)', 'rotate(90) translate(0.99,0)'],
                transition: {
                  duration: 5,
                  repeat: Infinity,
                  repeatType: 'loop',
                },
              }}
              id="narbar-gradient"
            >
              <stop offset="0" stopColor="#bae6fd"></stop>
              <stop offset="0.05" stopColor="#a5d8f5"></stop>
              <stop offset="0.1" stopColor="#8fcaed"></stop>{' '}
              <stop offset="0.2" stopColor="#7abce5"></stop>
              <stop offset="0.25" stopColor="#64aede"></stop>{' '}
              <stop offset="0.35" stopColor="#4da0d6"></stop>
              <stop offset="0.4" stopColor="#3392cf"></stop>{' '}
              <stop offset="0.5" stopColor="#0284c7"></stop>
              <stop offset="0.6" stopColor="#3392cf"></stop>{' '}
              <stop offset="0.65" stopColor="#4da0d6"></stop>
              <stop offset="0.75" stopColor="#64aede"></stop>{' '}
              <stop offset="0.8" stopColor="#7abce5"></stop>
              <stop offset="0.9" stopColor="#8fcaed"></stop>{' '}
              <stop offset="0.95" stopColor="#a5d8f5"></stop>
              <stop offset="1" stopColor="#bae6fd"></stop>
            </motion.linearGradient>
          </defs>{' '}
          <rect height="644" width="6" x="18" fill="lightgray"></rect>{' '}
          <motion.rect
            height="644"
            width="6"
            x="18"
            fill="url(#narbar-gradient)"
            animate={{
              clipPath: `polygon(0 0,100% 0,100% ${fillPercent}%,0 ${fillPercent}%)`,
            }}
          ></motion.rect>
        </motion.svg>
      )}
    </>
  )
}
