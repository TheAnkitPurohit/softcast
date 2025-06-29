import type { PaginatedList } from '@/interface/axios.interface'

export const CompanySize = {
  SMALL_1_10: '1-10',
  SMALL_10_50: '10-50',
  MEDIUM_50_100: '50-100',
  MEDIUM_100_500: '100-500',
  LARGE_500_1000: '500-1000',
  LARGE_1000_PLUS: '1000+',
} as const

export const CompanyStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const

export interface CompanyCreate {
  name: string
  industry: string
  location: string
  size: (typeof CompanySize)[keyof typeof CompanySize]
  status: (typeof CompanyStatus)[keyof typeof CompanyStatus]
}

export interface Company extends CompanyCreate {
  _id: string
  createdAt: string
  updatedAt: string
}

export interface CompaniesResponse {
  companies: PaginatedList<Company>
}

export interface CompanyResponse {
  company: Company
}

export interface CompanyNames {
  _id: string
  name: string
}

export interface CompanyNamesResponse {
  companies: CompanyNames[]
}
