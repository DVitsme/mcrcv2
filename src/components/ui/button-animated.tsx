'use client'

import { Button } from './button'
import { MoveRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface ButtonAnimatedProps {
  text: string
  link?: string
  color?: string
}

const ButtonAnimated = ({ text, link, color = 'secondary' }: ButtonAnimatedProps) => {
  const buttonContent = (
    <Button
      size="lg"
      className={`group w-fit gap-2 bg-${color}-foreground text-${color} transition-all duration-300`}
    >
      {text}
      <motion.div
        initial={{ x: 0 }}
        whileHover={{ x: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <MoveRight className="h-auto w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </motion.div>
    </Button>
  )

  return (
    <motion.div transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
      {link ? (
        <Link href={link} className="block w-fit">
          {buttonContent}
        </Link>
      ) : (
        buttonContent
      )}
    </motion.div>
  )
}

export default ButtonAnimated
