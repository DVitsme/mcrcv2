import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CardData {
  id: string
  name: string
  role: string
  avatar: string
}

const GridImageCards = ({
  Title,
  Description,
  ButtonText,
  ButtonLink,
  CardData,
}: {
  Title: string
  Description: string
  ButtonText: string
  ButtonLink: string
  CardData: CardData[]
}) => {
  return (
    <section className="">
      <div className="container mx-auto max-w-7xl flex flex-col items-center text-center">
        <h2 className="my-6 text-2xl font-bold text-pretty lg:text-4xl">{Title}</h2>
        <p className="mb-8 max-w-3xl text-muted-foreground lg:text-xl">{Description}</p>
        <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
          <Button className="w-full sm:w-auto" asChild>
            <Link href={ButtonLink}>{ButtonText}</Link>
          </Button>
        </div>
      </div>
      <div className="container mt-16 grid gap-8 md:grid-cols-3 lg:grid-cols-4 lg:px-32">
        {CardData.map((card) => (
          <div key={card.id} className="flex flex-col items-center bg-accent p-8">
            <Avatar className="mb-4 size-20 md:mb-5 lg:size-24">
              <AvatarImage src={card.avatar} />
              <AvatarFallback>{card.name}</AvatarFallback>
            </Avatar>
            <p className="text-center font-medium">{card.name}</p>
            <p className="text-center text-muted-foreground">{card.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export { GridImageCards }
