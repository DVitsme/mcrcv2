import { DefaultHeader } from '@/Header/DefaultHeader'
import { Footer } from '@/Footer/Component'

export default function DefaultPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DefaultHeader />
      <main className="">{children}</main>
      <Footer />
    </>
  )
}
