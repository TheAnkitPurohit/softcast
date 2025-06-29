import { ArrowRight, Briefcase, MapPin, Search, Users } from 'lucide-react'
import Link from 'next/link'

import Container from '@/components/container/Container'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const Page = () => {
  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='py-20 bg-gradient-to-br from-blue-50 to-indigo-100'>
        <Container>
          <div className='text-center max-w-4xl mx-auto'>
            <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6'>
              Find Your Dream <span className='text-blue-600'>Job</span>
            </h1>
            <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
              Discover thousands of job opportunities with all the information
              you need. Its your future. Come find it.
            </p>

            {/* Search Bar */}
            <div className='max-w-2xl mx-auto mb-8'>
              <div className='flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-xl shadow-lg'>
                <div className='flex-1 relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                  <Input
                    placeholder='Job title, keywords, or company'
                    className='pl-10 border-0 focus-visible:ring-0 text-lg'
                  />
                </div>
                <div className='flex-1 relative'>
                  <MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                  <Input
                    placeholder='Location'
                    className='pl-10 border-0 focus-visible:ring-0 text-lg'
                  />
                </div>
                <Button className='px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg'>
                  Search Jobs
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className='flex justify-center items-center gap-8 text-sm text-gray-600'>
              <div className='flex items-center gap-2'>
                <Users className='h-5 w-5 text-blue-600' />
                <span>2,000+ Companies</span>
              </div>
              <div className='flex items-center gap-2'>
                <Briefcase className='h-5 w-5 text-blue-600' />
                <span>50,000+ Jobs</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className='py-20 bg-white'>
        <Container>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Why Choose JobInsider?
            </h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              We provide the tools and resources you need to find your perfect
              job match.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <Card className='p-8 text-center hover:shadow-lg transition-shadow'>
              <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Search className='h-8 w-8 text-blue-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                Smart Search
              </h3>
              <p className='text-gray-600'>
                Advanced filtering and search capabilities to find exactly what
                you're looking for.
              </p>
            </Card>

            <Card className='p-8 text-center hover:shadow-lg transition-shadow'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Briefcase className='h-8 w-8 text-green-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                Verified Jobs
              </h3>
              <p className='text-gray-600'>
                All job postings are verified and updated regularly to ensure
                accuracy.
              </p>
            </Card>

            <Card className='p-8 text-center hover:shadow-lg transition-shadow'>
              <div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Users className='h-8 w-8 text-purple-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                Company Insights
              </h3>
              <p className='text-gray-600'>
                Get detailed information about companies, culture, and benefits.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-blue-600'>
        <Container>
          <div className='text-center max-w-3xl mx-auto'>
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
              Ready to Find Your Next Opportunity?
            </h2>
            <p className='text-xl text-blue-100 mb-8'>
              Join thousands of job seekers who have found their dream jobs
              through JobInsider.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/list'>
                <Button className='px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 font-semibold rounded-lg'>
                  Browse Jobs
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Button>
              </Link>
              <Button
                variant='outline'
                className='px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600 font-semibold rounded-lg'
              >
                Post a Job
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default Page
