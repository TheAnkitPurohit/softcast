'use client'

const Footer = () => {
  return (
    <footer className='w-full bg-primary/10 border-t border-gray-20 p-5 flex justify-center items-center'>
      <p className='text-xs text-gray-100 italic mt-2'>
        For internal use only. © {new Date().getFullYear()}{' '}
        <a
          href='https://softcolon.com/'
          rel='noopener noreferrer'
          target='_blank'
          className='underline'
        >
          softcolon
        </a>
      </p>
    </footer>
  )
}

export default Footer
