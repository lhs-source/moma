/**
 * # Report Store
 * 
 * ## 기능 설명
 * 제보 데이터를 Supabase에 저장하고 관리하는 Store
 * 
 * ## 주요 기능
 * - 제보 데이터 Supabase에 저장
 * - 제보 목록 조회
 * - 제보 상태 관리
 */
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'
import type { ReportFormData } from '@/views/report/types'

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

export const useReportStore = defineStore('report', {
  state: () => ({
    reports: [] as Report[]
  }),

  actions: {
    /**
     * # 제보 제출
     * 
     * 제보 데이터를 Supabase에 저장
     * 
     * @param data - 제보 폼 데이터
     * @returns 저장된 제보 데이터
     */
    async submitReport(data: ReportFormData) {
      try {
        const { data: inserted, error } = await supabase
          .from('reports')
          .insert([{
            type: data.type,
            category: data.category,
            title: data.title,
            description: data.description,
            status: 'pending'
          }])
          .select()

        if (error) throw error
        return inserted?.[0]
      } catch (error) {
        console.error('Error submitting report:', error)
        throw error
      }
    },

    /**
     * # 제보 목록 조회
     * 
     * Supabase에서 제보 목록을 조회
     * 
     * @param status - 필터링할 상태 (선택적)
     * @returns 제보 목록
     */
    async fetchReports(status?: string) {
      try {
        let query = supabase.from('reports').select('*').order('created_at', { ascending: false })

        if (status) {
          query = query.eq('status', status)
        }

        const { data, error } = await query

        if (error) throw error
        this.reports = data || []
        return data
      } catch (error) {
        console.error('Error fetching reports:', error)
        throw error
      }
    }
  }
})
