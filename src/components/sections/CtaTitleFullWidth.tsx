import { AnimateInView } from '../animations/AnimateInView'
import ButtonAnimated from '../ui/button-animated'

interface CtaTitleFullWidthProps {
  heading: string
  color?: string
  button?: {
    text: string
    url: string
  }
}

const CtaTitleFullWidth = ({ heading, color = 'blue', button }: CtaTitleFullWidthProps) => {
  return (
    <section className="py-32">
      <div className="container">
        <AnimateInView>
          <div
            className={`flex flex-col items-center rounded-lg bg-${color} text-${color}-foreground p-6 text-center md:rounded-xl lg:py-8`}
          >
            <h3 className="my-6 pb-4 max-w-4xl text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              {heading}
            </h3>
            {button && (
              <div className="mb-8 flex w-full flex-col justify-center gap-2 sm:flex-row">
                <ButtonAnimated text={button.text} link={button.url} />
              </div>
            )}
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}

export { CtaTitleFullWidth }
