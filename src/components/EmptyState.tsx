import Image from 'next/image'

const EmptyState = ({ icon, title, description }: EmptyStateProps) => {
  return (
    <div className='flex flex-col items-center justify-center py-16 px-4'>
      <div className='flex flex-col items-center text-center max-w-md space-y-4'>
        {/* Icon */}
        <div className='relative w-20 h-20 mb-2 opacity-40 dark:opacity-30'>
          <Image
            src={icon}
            alt='Empty state icon'
            width={80}
            height={80}
            className='object-contain grayscale'
          />
        </div>

        {/* Title */}
        <h2 className='text-xl font-bold text-zinc-900 dark:text-white'>
          {title}
        </h2>

        {/* Description */}
        <p className='text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed'>
          {description}
        </p>
      </div>
    </div>
  )
}

export default EmptyState
