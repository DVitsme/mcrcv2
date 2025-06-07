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
  items?: FaqItem[]
}

const faqItems = [
  {
    id: 'faq-1',
    question: 'Community-Based',
    answer:
      'A private non-profit or public agency or program thereof, with mediators, staff and governing/advisory board representative of the diversity of the community served.',
  },
  {
    id: 'faq-2',
    question: 'Open',
    answer:
      'The use of trained community volunteers as providers of mediation services; the practice of mediation is open to all persons.',
  },
  {
    id: 'faq-3',
    question: 'Accessible',
    answer:
      'Providing direct access to the public through self­-referral and striving to reduce barriers to service including physical, linguistic, cultural, programmatic and economic.',
  },
  {
    id: 'faq-4',
    question: 'Low-Cost',
    answer: 'Providing service to clients regardless of their ability to pay.',
  },
  {
    id: 'faq-5',
    question: 'Inclusive',
    answer:
      'Providing service and hiring without discrimination on the basis of race, color, religion, gender, age, disabilities, national origin, marital status, personal appearance, gender identity, sexual orientation, family responsibilities, matriculation, political affiliation, source of income.',
  },
  {
    id: 'faq-6',
    question: 'Timely',
    answer: 'Providing a forum for dispute resolution at the earliest stage of conflict.',
  },
  {
    id: 'faq-7',
    question: 'Innovative ',
    answer: 'Providing an alternative to the judicial system at any stage of a conflict.',
  },
  {
    id: 'faq-8',
    question: 'Outcome-Oriented',
    answer:
      'Initiating, facilitating and educating for collaborative community relationships to effect positive systemic change.',
  },
  {
    id: 'faq-9',
    question: 'Newsworthy',
    answer:
      'Engaging in public awareness and educational activities about the values and practices of mediation.',
  },
]

const FAQ = ({ heading = 'Frequently asked questions', items = faqItems }: FAQProps) => {
  return (
    <section className="">
      <div className="container space-y-8">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">{heading}</h2>
        </div>
        <Accordion type="single" collapsible className="mx-auto w-full lg:max-w-3xl">
          {items.map((item) => (
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
