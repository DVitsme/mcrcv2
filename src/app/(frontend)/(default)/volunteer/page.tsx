import type { Metadata } from 'next'
import VolunteerClient from '@/components/clients/VolunteerClient'

export const metadata: Metadata = {
  title: 'Volunteer With Us',
  description: 'Join our community of volunteers and help us build peace in our communities.',
}

export default function VolunteerPage() {
  return <VolunteerClient />
}
