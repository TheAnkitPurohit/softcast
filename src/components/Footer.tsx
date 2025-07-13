'use client'

import Image from 'next/image'

const Footer = () => {
  return (
    <footer className='w-full bg-primary/10 border-t border-gray-20 mt-auto'>
      <div className='wrapper flex flex-col md:flex-row items-center justify-between gap-6 py-8'>
        <div className='flex items-center gap-4'>
          <Image
            src='/assets/images/jason.png'
            alt='Creator'
            width={56}
            height={56}
            className='rounded-full'
          />
          <div className='flex flex-col'>
            <span className='font-bold text-dark-100 text-base'>
              Ankit Purohit
            </span>
            <span className='text-gray-100 text-sm font-medium'>
              Lead Software Engineer, softcolon
            </span>
          </div>
        </div>
        <div className='flex-1 md:ml-8 text-center md:text-left'>
          <p className='text-gray-100 text-sm max-w-xl mx-auto md:mx-0'>
            Ankit is passionate about building seamless, user-friendly tools
            that empower teams to communicate and collaborate more effectively.
            This screencast platform was crafted for internal use at{' '}
            <span className='text-blue-100 font-semibold'>softcolon</span> to
            help our teams move faster and stay connected.
          </p>
          <p className='text-xs text-gray-100 italic mt-2'>
            For internal use only. © {new Date().getFullYear()} softcolon
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
