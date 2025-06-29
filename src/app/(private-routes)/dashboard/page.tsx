'use client'

import { Edit } from 'lucide-react'
import { useState } from 'react'

import Container from '@/components/container/Container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const ProfilePage = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  return (
    <Container>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Personal Profile
          </h1>
          <p className='text-gray-600'>
            Manage your personal and professional information
          </p>
        </div>

        <Card className='p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-semibold text-gray-900'>
              Profile Information
            </h2>
            <Button
              variant='outline'
              size='sm'
              className='flex items-center gap-2'
              onClick={() => setIsProfileModalOpen(true)}
            >
              <Edit className='h-4 w-4' />
              Edit Profile
            </Button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Basic Information */}
            <div className='space-y-4'>
              <h3 className='text-lg font-medium text-gray-900'>
                Basic Information
              </h3>
              <div className='space-y-3'>
                <div>
                  <label className='text-sm font-medium text-gray-500'>
                    Full Name
                  </label>
                  {/* <p className='text-gray-900'>{user.name}</p> */}
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>
                    Email
                  </label>
                  {/* <p className='text-gray-900'>{user.email}</p> */}
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>
                    Phone
                  </label>
                  <p className='text-gray-900'>+1 (555) 123-4567</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>
                    Location
                  </label>
                  <p className='text-gray-900'>San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className='space-y-4'>
              <h3 className='text-lg font-medium text-gray-900'>
                Professional Information
              </h3>
              <div className='space-y-3'>
                <div>
                  <label className='text-sm font-medium text-gray-500'>
                    Current Title
                  </label>
                  <p className='text-gray-900'>Frontend Developer</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>
                    Experience
                  </label>
                  <p className='text-gray-900'>3 years</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>
                    Skills
                  </label>
                  <div className='flex flex-wrap gap-2 mt-1'>
                    <Badge variant='secondary'>React</Badge>
                    <Badge variant='secondary'>TypeScript</Badge>
                    <Badge variant='secondary'>Next.js</Badge>
                    <Badge variant='secondary'>Tailwind CSS</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className='my-6' />

          {/* Resume Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900'>Resume</h3>
            <div className='flex items-center justify-between p-4 border border-gray-200 rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <span className='text-blue-600 font-semibold'>PDF</span>
                </div>
                <div>
                  <p className='font-medium text-gray-900'>resume.pdf</p>
                  <p className='text-sm text-gray-500'>Updated 2 days ago</p>
                </div>
              </div>
              <Button variant='outline' size='sm'>
                Update Resume
              </Button>
            </div>
          </div>
        </Card>

        {/* Profile Edit Modal */}
        {/* <ProfileEditModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          user={user}
        /> */}
      </div>
    </Container>
  )
}

export default ProfilePage
