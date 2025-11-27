/**
 * 제보 관련 타입 정의
 */

export type ReportType = 'error' | 'addition' | 'other'

export type ReportCategory = 'item' | 'recipe' | 'npc' | 'location' | 'event' | 'other'

export interface ReportData {
  id: string
  type: ReportType
  category: ReportCategory
  title: string
  description: string
  createdAt: Date
  status: 'pending' | 'reviewing' | 'approved' | 'rejected'
}

export interface ReportFormData {
  type: ReportType
  category: ReportCategory
  title: string
  description: string
}

export interface Report {
  id: string
  type: string
  category: string
  title: string
  description: string
  status: string
  created_at: string
  updated_at: string
}

