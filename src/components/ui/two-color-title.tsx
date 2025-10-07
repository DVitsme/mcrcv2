import React from 'react'

const TwoColorTitle = ({ title, titleGray }: { title: string; titleGray: string }) => {
  return (
    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
      {title}
      {titleGray && (
        <span className="relative inline-block">
          <span className="text-muted-foreground">{titleGray}</span>
        </span>
      )}
    </h2>
  )
}

export default TwoColorTitle
