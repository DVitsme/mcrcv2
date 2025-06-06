const stats = [
  { number: '1000+', label: 'Cases Mediated' },
  { number: '150+', label: 'Workshops Conducted' },
  { number: '26+', label: 'Years of Service' },
  { number: '10000+', label: 'Lives Impacted' },
]

export function Stats() {
  return (
    <section className="bg-purple py-24">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center">
              <div className="text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
                {stat.number}
              </div>
              <div className="mt-2 text-lg text-primary-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
