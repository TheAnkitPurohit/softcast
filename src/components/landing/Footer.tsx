import AppLogo from '@/components/app/AppLogo'

const Footer = () => {
  return (
    <footer className='bg-white dark:bg-black border-t border-white/10 pt-8 pb-8'>
      <div className='container mx-auto px-4'>
        <div className='w-full flex flex-col items-center justify-center mb-5'>
          <div className='flex items-center gap-2 mb-6'>
            <AppLogo />
          </div>
          <p className='text-zinc-500 text-sm '>
            Video messaging for work. Instantly share your screen and cam.
          </p>
        </div>

        <div className='border-t border-white/10 dark:border-white/10 pt-8 flex jitems-center justify-center gap-4'>
          <p className='text-zinc-600 text-sm'>
            © {new Date().getFullYear()}{' '}
            <a
              href='https://softcolon.com/'
              rel='noopener noreferrer'
              target='_blank'
              className=''
            >
              Softcolon Technologies
            </a>{' '}
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
