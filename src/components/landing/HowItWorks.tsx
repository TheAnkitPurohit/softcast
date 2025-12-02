import { Edit, Share2, Video } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Record your screen',
    description:
      "Click record and capture your screen, camera, or both. It's as easy as taking a screenshot.",
    icon: Video,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: 'Edit with ease',
    description:
      'Trim your video, add a call-to-action, or stitch clips together. No professional skills needed.',
    icon: Edit,
    color: 'bg-purple-500',
  },
  {
    id: 3,
    title: 'Share instantly',
    description:
      'Copy the link and paste it anywhere. Viewers can watch without creating an account.',
    icon: Share2,
    color: 'bg-pink-500',
  },
]

const HowItWorks = () => {
  return (
    <section className='py-24 bg-white dark:bg-zinc-900/30'>
      <div className='container mx-auto px-4'>
        <div className='text-center max-w-2xl mx-auto mb-16'>
          <h2 className='text-3xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-white'>
            How it works
          </h2>
          <p className='text-zinc-600 dark:text-zinc-400 text-lg'>
            Three simple steps to better communication.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 relative'>
          {/* Connecting Line (Desktop only) */}
          <div className='hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20' />

          {steps.map((step) => (
            <div
              key={step.id}
              className='relative flex flex-col items-center text-center'
            >
              <div
                className={`w-24 h-24 rounded-2xl ${step.color} bg-opacity-10 flex items-center justify-center mb-8 relative z-10 bg-white dark:bg-zinc-900 shadow-xl`}
              >
                <div
                  className={`w-16 h-16 rounded-xl ${step.color} flex items-center justify-center`}
                >
                  <step.icon className='w-8 h-8 text-white' />
                </div>
              </div>
              <h3 className='text-xl font-bold mb-4 text-zinc-900 dark:text-white'>
                {step.title}
              </h3>
              <p className='text-zinc-600 dark:text-zinc-400 leading-relaxed'>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
