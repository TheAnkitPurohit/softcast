import {
  Lock,
  MessageSquare,
  Monitor,
  Share2,
  Smartphone,
  Zap,
} from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const features = [
  {
    id: 1,
    title: 'Knowledge Base',
    description:
      'Build a searchable library of tutorials, onboarding videos, and process docs.',
    icon: Monitor,
  },
  {
    id: 2,
    title: 'Secure by Default',
    description:
      'All videos are private to our organization. SSO login required.',
    icon: Lock,
  },
  {
    id: 3,
    title: 'Team Libraries',
    description:
      'Organize videos by department (Engineering, Sales, etc.) for easy access.',
    icon: Share2,
  },
  {
    id: 4,
    title: 'Bug Reporting',
    description:
      'Capture bugs with console logs and network requests automatically attached.',
    icon: Zap,
  },
  {
    id: 5,
    title: 'Async Standups',
    description:
      'Post your daily update in #standups without a synchronous meeting.',
    icon: MessageSquare,
  },
  {
    id: 6,
    title: 'Mobile Access',
    description:
      'Watch updates on the go with our internal iOS and Android apps.',
    icon: Smartphone,
  },
]

const Features = () => {
  return (
    <section className='py-24 bg-zinc-50 dark:bg-zinc-900/30'>
      <div className='container mx-auto px-4'>
        <div className='text-center max-w-2xl mx-auto mb-16'>
          <h2 className='text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 to-zinc-600 dark:from-white dark:to-white/60'>
            Everything you need to collaborate
          </h2>
          <p className='text-zinc-600 dark:text-zinc-400 text-lg'>
            Replace meetings with video messages. It's the most efficient way to
            work together.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature) => (
            <Card
              key={feature.id}
              className=' bg-white dark:bg-zinc-900 border-white/10 hover:bg-white/10 transition-colors duration-300'
            >
              <CardHeader>
                <div className='w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center mb-4'>
                  <feature.icon className='w-6 h-6 text-purple-400' />
                </div>
                <CardTitle className='text-xl text-zinc-900 dark:text-white'>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='text-zinc-600 dark:text-zinc-400 text-base'>
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
