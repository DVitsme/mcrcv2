import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FaqItem {
  id: string
  question: string
  answer: string
}

interface FAQProps {
  heading: string
  subheading?: string
  items?: FaqItem[]
}

const FAQ = ({ heading = 'Frequently asked questions', subheading, items }: FAQProps) => {
  return (
    <section className="my-32">
      <div className="container space-y-8">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">{heading}</h2>
          {subheading && <p className="text-muted-foreground">{subheading}</p>}
        </div>
        <Accordion type="single" collapsible className="mx-auto w-full lg:max-w-3xl">
          {items?.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">{item.question}</div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-lg">{item.answer}</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export { FAQ }
