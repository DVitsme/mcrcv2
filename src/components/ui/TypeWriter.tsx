'use client'
import { TypeWriterEffect } from '@/components/sections/TypeWriterEffect'

function TypeWriter() {
  return (
    <section className="mx-4 center h-full md:text-4xl lg:text-5xl sm:text-3xl text-2xl flex flex-row items-start justify-start bg-background font-normal overflow-hidden p-16 pt-48">
      <div className="whitespace-pre-wrap">
        <span>{'At MCRC, we believe - '}</span>
        <TypeWriterEffect
          text={[
            'Conflict is a part of life—but it doesn’t have to divide us',
            'In the power of community and the transformative potential of generosity',
            'Every conversation holds the power to build understanding',
            'Every conversation holds the power to repair relationships',
            'Every conversation holds the power to Create Lasting Change!',
          ]}
          speed={70}
          className="text-yellow-500"
          waitTime={1500}
          deleteSpeed={40}
          cursorChar={'_'}
        />
      </div>
    </section>
  )
}

export { TypeWriter }
