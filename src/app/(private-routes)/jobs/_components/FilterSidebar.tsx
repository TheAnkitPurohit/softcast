'use client'

import React from 'react'

import FilterForm, {
  FilterState,
} from '@/app/(private-routes)/jobs/_components/FilterForm'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

interface FilterSidebarProps {
  filters: FilterState
  isOpen: boolean
  onClose: () => void
  onFilterChange: (filters: FilterState) => void
  onClearFilters: () => void
}

const FilterSidebar = ({
  filters,
  isOpen,
  onClose,
  onFilterChange,
  onClearFilters,
}: FilterSidebarProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className='mt-6'>
          <FilterForm
            filters={filters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
            showClearButton={true}
            showApplyButton={true}
            onApply={onClose}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default FilterSidebar
