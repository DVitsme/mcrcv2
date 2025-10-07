import { Bolt, Cloud, MessagesSquare, Star } from 'lucide-react'

export const features = [
  {
    id: 'feature-1',
    title: 'Mediation',
    description:
      'We offer a neutral space where families, neighbors, coworkers, and businesses can resolve conflict without going to court.',
    icon: Cloud,
    image: '/images/mediation/mediation-group.jpg',
  },
  {
    id: 'feature-2',
    title: 'Restorative Practices',
    description:
      'Restorative practices support youth, whether harmed or causing harm, to heal in community and take part in meaningful repair.',
    icon: Star,
    image: '/images/restorative-justice/restorative-justice-happy-kid.jpg',
  },
  {
    id: 'feature-3',
    title: 'Group Facilitation',
    description:
      'Our facilitators guide conversations with care and neutrality, supporting dialogue, navigating conflict, decision making, and community conversations.',
    icon: Bolt,
    image: '/images/facilitation/facilitation-v2.jpg',
  },
  {
    id: 'feature-4',
    title: 'Community Education',
    description:
      'Everyone should have access to tools for healthy communication and resolving conflict. We work to make these skills available to all.',
    icon: MessagesSquare,
    image: '/images/training/one-on-one-office-training.jpg',
  },
]
