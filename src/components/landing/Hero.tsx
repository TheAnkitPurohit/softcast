import { Play } from 'lucide-react'

import { Button } from '@/components/ui/button'

const Hero = () => {
  return (
    <section className='relative pt-32 pb-20 overflow-hidden bg-white dark:bg-black'>
      {/* Background Gradients */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-[120px] -z-10' />
      <div className='absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[120px] -z-10' />

      <div className='container mx-auto px-4 text-center'>
        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-white/5 border border-purple-200 dark:border-white/10 text-sm text-purple-700 dark:text-purple-300 mb-8'>
          <span className='relative flex h-2 w-2'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-2 w-2 bg-purple-500'></span>
          </span>
          Internal Beta: v2.0 Now Available
        </div>

        <h1 className='text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 to-zinc-600 dark:from-white dark:to-white/60'>
          The internal video hub for modern teams.
        </h1>

        <p className='text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed'>
          Share knowledge, report bugs, and update your team without scheduling
          a meeting. Secure, searchable, and built for us.
        </p>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-16'>
          <Button
            size='lg'
            className='bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 h-12 text-base'
          >
            Login with Google
          </Button>
          <Button
            size='lg'
            variant='outline'
            className='rounded-full px-8 h-12 text-base border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-900 dark:text-white'
          >
            Download App
          </Button>
        </div>

        {/* Trusted By */}
        <div className='mb-20'>
          <p className='text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-6'>
            USED BY TEAMS ACROSS THE ORGANIZATION
          </p>
          <div className='flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500'>
            {/* Simple text logos for demo purposes */}
            {['Engineering', 'Product', 'Design', 'Marketing', 'Sales'].map(
              (team) => (
                <span
                  key={team}
                  className='text-xl font-bold text-zinc-800 dark:text-white'
                >
                  {team}
                </span>
              )
            )}
          </div>
        </div>

        {/* Hero Visual */}
        <div className='relative max-w-5xl mx-auto'>
          {/* Browser Window Mockup */}
          <div className='rounded-xl border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur-sm shadow-2xl overflow-hidden'>
            <div className='h-10 bg-zinc-100 dark:bg-white/5 border-b border-zinc-200 dark:border-white/10 flex items-center px-4 gap-2'>
              <div className='flex gap-1.5'>
                <div className='w-3 h-3 rounded-full bg-red-500/20' />
                <div className='w-3 h-3 rounded-full bg-yellow-500/20' />
                <div className='w-3 h-3 rounded-full bg-green-500/20' />
              </div>
              <div className='flex-1 mx-4'>
                <div className='h-6 w-full max-w-md mx-auto bg-white dark:bg-white/5 rounded-md shadow-sm dark:shadow-none' />
              </div>
            </div>

            <div className='relative aspect-video bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-center group cursor-pointer overflow-hidden'>
              {/* Abstract UI Content */}
              <div className='absolute inset-0 p-8 grid grid-cols-3 gap-4 opacity-20'>
                <div className='col-span-1 bg-zinc-300 dark:bg-white/10 rounded-lg h-full' />
                <div className='col-span-2 space-y-4'>
                  <div className='h-32 bg-zinc-300 dark:bg-white/10 rounded-lg' />
                  <div className='h-32 bg-zinc-300 dark:bg-white/10 rounded-lg' />
                  <div className='h-32 bg-zinc-300 dark:bg-white/10 rounded-lg' />
                </div>
              </div>

              {/* Play Button Overlay */}
              <div className='w-20 h-20 rounded-full bg-purple-600/90 flex items-center justify-center shadow-lg shadow-purple-600/20 group-hover:scale-110 transition-transform duration-300 z-10'>
                <Play className='w-8 h-8 text-white fill-current ml-1' />
              </div>

              {/* Floating Video Bubble */}
              <div className='absolute bottom-8 left-8 w-32 h-32 rounded-full border-4 border-purple-500 overflow-hidden shadow-2xl z-20 animate-bounce-slow'>
                <img
                  src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
                  alt='User'
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
