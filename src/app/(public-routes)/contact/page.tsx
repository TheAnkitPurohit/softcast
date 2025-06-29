'use client'

import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'

import Container from '@/components/container/Container'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Container>
      <div className='w-full flex flex-col gap-12 my-10'>
        {/* Header */}
        <div className='text-center '>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Get in Touch
          </h1>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Have questions about JobInsider? We'd love to hear from you. Send us
            a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <Card className='p-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <Label
                    htmlFor='name'
                    className='text-sm font-medium text-gray-700'
                  >
                    Name
                  </Label>
                  <Input
                    id='name'
                    name='name'
                    type='text'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='mt-2 h-12'
                    placeholder='Your name'
                  />
                </div>
                <div>
                  <Label
                    htmlFor='email'
                    className='text-sm font-medium text-gray-700'
                  >
                    Email
                  </Label>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='mt-2 h-12'
                    placeholder='your.email@example.com'
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor='subject'
                  className='text-sm font-medium text-gray-700'
                >
                  Subject
                </Label>
                <Input
                  id='subject'
                  name='subject'
                  type='text'
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className='mt-2 h-12'
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <Label
                  htmlFor='message'
                  className='text-sm font-medium text-gray-700'
                >
                  Message
                </Label>
                <Textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className='mt-2 min-h-[120px] resize-none'
                  placeholder='Tell us more about your inquiry...'
                />
              </div>

              <Button
                type='submit'
                className='w-full py-3 text-lg font-semibold'
              >
                <Send className='h-5 w-5 mr-2' />
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className='space-y-6'>
            <Card className='p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                Contact Information
              </h2>
              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0'>
                    <Mail className='h-6 w-6 text-blue-600' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-1'>Email</h3>
                    <p className='text-gray-600'>support@jobinsider.com</p>
                    <p className='text-sm text-gray-500'>
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0'>
                    <Phone className='h-6 w-6 text-green-600' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-1'>Phone</h3>
                    <p className='text-gray-600'>+1 (555) 123-4567</p>
                    <p className='text-sm text-gray-500'>Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0'>
                    <MapPin className='h-6 w-6 text-purple-600' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-1'>Office</h3>
                    <p className='text-gray-600'>123 Job Street</p>
                    <p className='text-gray-600'>San Francisco, CA 94105</p>
                    <p className='text-sm text-gray-500'>United States</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className='p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                Frequently Asked Questions
              </h2>
              <div className='space-y-4'>
                <div>
                  <h3 className='font-semibold text-gray-900 mb-2'>
                    How do I post a job?
                  </h3>
                  <p className='text-gray-600 text-sm'>
                    Click the "Post a Job" button in the navigation bar and
                    follow the simple form to create your job listing.
                  </p>
                </div>
                <div>
                  <h3 className='font-semibold text-gray-900 mb-2'>
                    How much does it cost to post a job?
                  </h3>
                  <p className='text-gray-600 text-sm'>
                    We offer various pricing plans starting from $99 for a
                    30-day job posting. Contact us for enterprise pricing.
                  </p>
                </div>
                <div>
                  <h3 className='font-semibold text-gray-900 mb-2'>
                    How do I apply for a job?
                  </h3>
                  <p className='text-gray-600 text-sm'>
                    Browse our job listings, click on any job that interests
                    you, and use the "Apply" button on the job detail page.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ContactPage
