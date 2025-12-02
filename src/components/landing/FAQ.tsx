import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    id: 1,
    question: 'How do I request access?',
    answer:
      'Access is managed via Softcolon Technologies. If you unable to login with Google, please submit a ticket to IT Support.',
  },
  {
    id: 2,
    question: 'How long are videos retained?',
    answer:
      'By default, videos are retained for 1 year. You can mark important videos as "Permanent" to prevent auto-deletion.',
  },
  {
    id: 3,
    question: 'Can I share with external partners?',
    answer:
      'You can share videos with external partners by sharing the video link with them. They will not need to login with their Google account to view the video.',
  },
  {
    id: 4,
    question: "Where do I find my team's library?",
    answer:
      'Click on "Libraries" in the sidebar and select your department (e.g., Engineering, Marketing).',
  },
  {
    id: 5,
    question: 'Is there a desktop app?',
    answer:
      'Yes, you can download the macOS and Windows apps from the "Resources" tab in the dashboard.',
  },
]

const FAQ = () => {
  return (
    <section className='py-24 bg-zinc-50 dark:bg-zinc-900/30'>
      <div className='container mx-auto px-4 max-w-3xl'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-white'>
            Frequently asked questions
          </h2>
          <p className='text-zinc-600 dark:text-zinc-400 text-lg'>
            Everything you need to know about SkyCast.
          </p>
        </div>

        <Accordion type='single' collapsible className='w-full'>
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={`item-${faq.id}`}
              className='border-zinc-200 dark:border-white/10'
            >
              <AccordionTrigger className='text-left text-lg font-medium text-zinc-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400'>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className='text-zinc-600 dark:text-zinc-400 text-base leading-relaxed'>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default FAQ
