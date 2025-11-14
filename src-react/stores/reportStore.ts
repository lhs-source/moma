import { create } from 'zustand'

import { supabase } from '../lib/supabase'
import type { Report, ReportFormData } from '../types/report'

interface ReportStoreState {
  reports: Report[]
  submitReport: (data: ReportFormData) => Promise<Report>
  fetchReports: (status?: string) => Promise<Report[]>
  fetchReportById: (id: string) => Promise<Report>
}

export const useReportStore = create<ReportStoreState>((set) => ({
  reports: [],

  submitReport: async (data: ReportFormData) => {
    try {
      const { data: inserted, error } = await (supabase as any)
        .from('reports')
        .insert([
          {
            type: data.type,
            category: data.category,
            title: data.title,
            description: data.description,
            status: 'pending',
          },
        ])
        .select()

      if (error) throw error
      const newReport = inserted?.[0] as Report
      set((state) => ({ reports: [newReport, ...state.reports] }))
      return newReport
    } catch (error) {
      console.error('Error submitting report:', error)
      throw error
    }
  },

  fetchReports: async (status?: string) => {
    try {
      let query = (supabase as any).from('reports').select('*').order('created_at', { ascending: false })

      if (status) {
        query = query.eq('status', status)
      }

      const { data, error } = await query

      if (error) throw error
      const reports = (data || []) as Report[]
      set({ reports })
      return reports
    } catch (error) {
      console.error('Error fetching reports:', error)
      throw error
    }
  },

  fetchReportById: async (id: string) => {
    try {
      const { data, error } = await (supabase as any).from('reports').select('*').eq('id', id).single()

      if (error) throw error
      return data as Report
    } catch (error) {
      console.error('Error fetching report by id:', error)
      throw error
    }
  },
}))

