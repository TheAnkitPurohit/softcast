import { SignInButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

const Page = async () => {
  return (
    <div className='min-h-screen bg-white flex flex-col'>
      <Navbar />

      {/* Hero Section */}
      <section className='wrapper flex flex-col items-center text-center gap-8 pt-16 pb-20'>
        <h2 className='text-4xl md:text-5xl font-black text-blue-100 max-w-3xl leading-tight'>
          Move fast and stay connected
        </h2>
        <p className='text-lg md:text-xl text-gray-100 max-w-2xl'>
          Use the power of video and async to accelerate team communication and
          respond quickly.
        </p>
        <SignInButton
          fallbackRedirectUrl={'/videos'}
          forceRedirectUrl={'/videos'}
        >
          <button className='px-8 py-4 rounded-4xl bg-primary text-white font-semibold text-lg shadow-10 hover:opacity-90 transition-colors mt-2'>
            Record Now
          </button>
        </SignInButton>
        <div className='w-full flex justify-center'>
          <div className='rounded-2xl shadow-20 bg-gradient-to-br from-[#e3f5fd] to-white p-2 max-w-3xl w-full'>
            <Image
              src='/assets/images/video1.png'
              alt='Demo'
              width={900}
              height={500}
              className='rounded-2xl w-full object-cover'
            />
          </div>
        </div>
      </section>

      {/* Why Teams Connect Section */}
      <section className='wrapper flex flex-col items-center text-center gap-6 pb-16'>
        <h3 className='text-2xl md:text-3xl font-bold text-dark-100'>
          Why teams connect with SoftCast
        </h3>
        <div className='flex flex-wrap justify-center gap-8 mt-4'>
          <div className='flex flex-col items-center gap-2 max-w-xs'>
            <Image
              src='/assets/icons/video.svg'
              alt='Async'
              width={40}
              height={40}
            />
            <span className='font-semibold text-base text-dark-100'>
              Async video updates
            </span>
            <p className='text-gray-100 text-sm'>
              Share updates without scheduling meetings.
            </p>
          </div>
          <div className='flex flex-col items-center gap-2 max-w-xs'>
            <Image
              src='/assets/icons/checkmark.svg'
              alt='Easy'
              width={40}
              height={40}
            />
            <span className='font-semibold text-base text-dark-100'>
              Easy to use
            </span>
            <p className='text-gray-100 text-sm'>
              Record, share, and watch in seconds.
            </p>
          </div>
          <div className='flex flex-col items-center gap-2 max-w-xs'>
            <Image
              src='/assets/icons/star.svg'
              alt='Engage'
              width={40}
              height={40}
            />
            <span className='font-semibold text-base text-dark-100'>
              Engage your team
            </span>
            <p className='text-gray-100 text-sm'>
              Keep everyone in the loop, anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='wrapper flex flex-col gap-12 pb-20'>
        <div className='grid md:grid-cols-2 gap-10 items-center'>
          <div className='flex flex-col gap-4'>
            <h4 className='text-xl font-bold text-dark-100'>
              Get your message across
            </h4>
            <p className='text-gray-100 text-base'>
              Bring everyone up to speed, anytime. Record and share instantly,
              so your team never misses a beat.
            </p>
            <ul className='list-disc list-inside text-gray-100 text-sm mt-2'>
              <li>Record your screen, camera, or both</li>
              <li>Share with a simple link</li>
              <li>Watch at your own pace</li>
            </ul>
          </div>
          <div className='flex justify-center'>
            <Image
              src='/assets/images/video1.png'
              alt='Feature'
              width={400}
              height={300}
              className='rounded-2xl shadow-10 object-cover'
            />
          </div>
        </div>
        <div className='grid md:grid-cols-2 gap-10 items-center md:flex-row-reverse'>
          <div className='flex flex-col gap-4'>
            <h4 className='text-xl font-bold text-dark-100'>
              Accelerate the flow of information
            </h4>
            <p className='text-gray-100 text-base'>
              Solve issues, share feedback, and keep projects moving—no matter
              where you are.
            </p>
            <ul className='list-disc list-inside text-gray-100 text-sm mt-2'>
              <li>Collaborate asynchronously</li>
              <li>Reduce meeting overload</li>
              <li>Boost productivity</li>
            </ul>
          </div>
          <div className='flex justify-center'>
            <Image
              src='/assets/images/video1.png'
              alt='Feature'
              width={400}
              height={300}
              className='rounded-2xl shadow-10 object-cover'
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Page
