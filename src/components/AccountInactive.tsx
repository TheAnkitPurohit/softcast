import React from 'react'

const AccountInactive: React.FC = ({}) => {
  const title = 'Account not active'
  const description =
    "Your account isn't active yet. Ask your admin to activate it to access videos."
  return (
    <main className='wrapper page w-full'>
      <div className='flex flex-col justify-center items-center h-full text-center gap-4 py-8'>
        {/* <img src={icon} alt='inactive' className='w-12 h-12 opacity-80' /> */}
        <div className='max-w-xl'>
          <h2 className='text-lg font-semibold text-gray-800'>{title}</h2>
          <p className='text-sm text-gray-500 mt-2'>{description}</p>
        </div>

        <div className='mt-4 text-xs text-gray-400'>
          Contact your administrator for help
        </div>
      </div>
    </main>
  )
}

export default AccountInactive
