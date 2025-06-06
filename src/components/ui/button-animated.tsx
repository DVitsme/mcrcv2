'use client'

import { Button } from './button'
import { MoveRight } from 'lucide-react'
import { motion } from 'framer-motion'

const ButtonAnimated = ({ text }: { text: string }) => {
  return (
    <motion.div transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
      <Button
        size="lg"
        className="group w-fit gap-2 bg-secondary text-secondary-foreground transition-all duration-300"
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
    </motion.div>
  )
}

export default ButtonAnimated
