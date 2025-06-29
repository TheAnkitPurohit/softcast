'use client'

import {
  Briefcase,
  Calendar,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
  X,
} from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface ProfileEditModalProps {
  isOpen: boolean
  onClose: () => void
  user: {
    name: string
    email: string
  }
}

const ProfileEditModal = ({ isOpen, onClose, user }: ProfileEditModalProps) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    title: 'Frontend Developer',
    experience: '3 years',
    bio: 'Passionate frontend developer with expertise in React, TypeScript, and modern web technologies.',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  })
  const [newSkill, setNewSkill] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    onClose()
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between p-6 border-b'>
          <h2 className='text-xl font-semibold text-gray-900'>Edit Profile</h2>
          <Button
            variant='ghost'
            size='sm'
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600'
          >
            <X className='h-5 w-5' />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          {/* Basic Information */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900'>
              Basic Information
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label
                  htmlFor='name'
                  className='text-sm font-medium text-gray-700'
                >
                  Full Name
                </Label>
                <div className='relative mt-1'>
                  <User className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                  <Input
                    id='name'
                    type='text'
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className='pl-10'
                    required
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor='email'
                  className='text-sm font-medium text-gray-700'
                >
                  Email
                </Label>
                <div className='relative mt-1'>
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                  <Input
                    id='email'
                    type='email'
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className='pl-10'
                    required
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor='phone'
                  className='text-sm font-medium text-gray-700'
                >
                  Phone
                </Label>
                <div className='relative mt-1'>
                  <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                  <Input
                    id='phone'
                    type='tel'
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className='pl-10'
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor='location'
                  className='text-sm font-medium text-gray-700'
                >
                  Location
                </Label>
                <div className='relative mt-1'>
                  <MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                  <Input
                    id='location'
                    type='text'
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange('location', e.target.value)
                    }
                    className='pl-10'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900'>
              Professional Information
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label
                  htmlFor='title'
                  className='text-sm font-medium text-gray-700'
                >
                  Current Title
                </Label>
                <div className='relative mt-1'>
                  <Briefcase className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                  <Input
                    id='title'
                    type='text'
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className='pl-10'
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor='experience'
                  className='text-sm font-medium text-gray-700'
                >
                  Experience
                </Label>
                <div className='relative mt-1'>
                  <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                  <Input
                    id='experience'
                    type='text'
                    value={formData.experience}
                    onChange={(e) =>
                      handleInputChange('experience', e.target.value)
                    }
                    className='pl-10'
                    placeholder='e.g., 3 years'
                  />
                </div>
              </div>
            </div>

            <div>
              <Label
                htmlFor='bio'
                className='text-sm font-medium text-gray-700'
              >
                Bio
              </Label>
              <Textarea
                id='bio'
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={3}
                className='mt-1'
                placeholder='Tell us about yourself...'
              />
            </div>

            <div>
              <Label className='text-sm font-medium text-gray-700'>
                Skills
              </Label>
              <div className='mt-1 space-y-3'>
                <div className='flex flex-wrap gap-2'>
                  {formData.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant='secondary'
                      className='flex items-center gap-1'
                    >
                      {skill}
                      <button
                        type='button'
                        onClick={() => removeSkill(skill)}
                        className='ml-1 hover:text-red-600'
                      >
                        <X className='h-3 w-3' />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className='flex gap-2'>
                  <Input
                    type='text'
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder='Add a skill'
                    className='flex-1'
                    onKeyPress={(e) =>
                      e.key === 'Enter' && (e.preventDefault(), addSkill())
                    }
                  />
                  <Button
                    type='button'
                    variant='outline'
                    onClick={addSkill}
                    disabled={!newSkill.trim()}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className='flex items-center justify-end gap-3 pt-4 border-t'>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isLoading}
              className='flex items-center gap-2'
            >
              <Save className='h-4 w-4' />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileEditModal
