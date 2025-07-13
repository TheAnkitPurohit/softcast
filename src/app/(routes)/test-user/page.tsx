import React from 'react'

import UserInfo from '@/components/UserInfo'

const TestUserPage = () => {
  return (
    <main className='wrapper page w-full'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-2xl font-bold text-gray-900 mb-6'>
          User Context Test
        </h1>
        <p className='text-gray-600 mb-8'>
          This page demonstrates the user context functionality. The user data
          is fetched in the layout and made available through the useUser hook.
        </p>

        <UserInfo />

        <div className='mt-8 p-4 bg-blue-50 rounded-lg'>
          <h2 className='font-semibold text-blue-900 mb-2'>How it works:</h2>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>• User data is fetched in the layout when userId exists</li>
            <li>• Data is provided through UserContext</li>
            <li>• Any client component can use useUser() hook</li>
            <li>• No need to fetch user data in individual components</li>
          </ul>
        </div>
      </div>
    </main>
  )
}

export default TestUserPage
