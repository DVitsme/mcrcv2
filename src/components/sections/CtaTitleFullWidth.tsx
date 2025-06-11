import { AnimateInView } from '../animations/AnimateInView'

interface CtaTitleFullWidthProps {
  heading: string
  bgColor?: string
  textColor?: string
}

const CtaTitleFullWidth = ({
  heading,
  bgColor = 'bg-blue',
  textColor = 'text-white',
}: CtaTitleFullWidthProps) => {
  return (
    <section className="py-32">
      <div className="container">
        <AnimateInView>
          <div
            className={`flex flex-col items-center rounded-lg ${bgColor} p-6 text-center md:rounded-xl lg:py-8 ${textColor}`}
          >
            <h3 className="mb-3 max-w-4xl text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              {heading}
            </h3>
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}

export { CtaTitleFullWidth }
