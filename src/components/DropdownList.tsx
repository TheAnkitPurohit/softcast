'use client'

import { Check } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

const DropdownList = ({
  options,
  selectedOption,
  onOptionSelect,
  triggerElement,
}: DropdownListProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleOptionClick = (option: string) => {
    onOptionSelect(option)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className='relative' ref={dropdownRef}>
      <div className='cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
        {triggerElement}
      </div>

      {isOpen && (
        <ul className='absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200'>
          {options.map((option) => (
            <li
              key={option}
              className={cn(
                'flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-colors',
                selectedOption === option
                  ? 'bg-purple-600 text-white'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              )}
              onClick={() => handleOptionClick(option)}
            >
              <span className='font-medium'>{option}</span>
              {selectedOption === option && <Check className='w-4 h-4' />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DropdownList
