import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PageTitle from '../components/ui/PageTitle'
import { Select } from '../components/ui/select/Select'
import { SelectContent } from '../components/ui/select/SelectContent'
import { SelectItem } from '../components/ui/select/SelectItem'
import { SelectTrigger } from '../components/ui/select/SelectTrigger'
import { SelectValue } from '../components/ui/select/SelectValue'
import { useReportStore } from '../stores/reportStore'

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  } catch {
    return iso
  }
}

function toKoreanType(v: string): string {
  if (v === 'error') return '오류 수정'
  if (v === 'addition') return '새 데이터 추가'
  if (v === 'other') return '기타'
  return v
}

function toKoreanCategory(v: string): string {
  const map: Record<string, string> = {
    item: '아이템',
    recipe: '레시피',
    npc: 'NPC',
    location: '위치',
    event: '이벤트',
    other: '기타',
  }
  return map[v] ?? v
}

function toKoreanStatus(v: string): string {
  const map: Record<string, string> = {
    pending: '대기중',
    reviewing: '검토중',
    approved: '완료',
    rejected: '반려',
  }
  return map[v] ?? v
}

export function ReportListPage() {
  const navigate = useNavigate()
  const fetchReports = useReportStore((state) => state.fetchReports)
  const reports = useReportStore((state) => state.reports)

  const [loading, setLoading] = useState(false)
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  useEffect(() => {
    async function loadReports() {
      setLoading(true)
      try {
        await fetchReports()
      } finally {
        setLoading(false)
      }
    }
    loadReports()
  }, [fetchReports])

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const t = !typeFilter || r.type === typeFilter
      const s = !statusFilter || r.status === statusFilter
      const c = !categoryFilter || r.category === categoryFilter
      return t && s && c
    })
  }, [reports, typeFilter, statusFilter, categoryFilter])

  function goDetail(id: string) {
    navigate(`/report/${id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle>제보 내역</PageTitle>
        <div className="text-sm text-muted-foreground">Supabase에서 최신 제보 목록을 불러옵니다</div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">유형</label>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue>전체</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">전체</SelectItem>
              <SelectItem value="error">오류 수정</SelectItem>
              <SelectItem value="addition">새 데이터 추가</SelectItem>
              <SelectItem value="other">기타</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">상태</label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue>전체</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">전체</SelectItem>
              <SelectItem value="pending">대기중</SelectItem>
              <SelectItem value="reviewing">검토중</SelectItem>
              <SelectItem value="approved">완료</SelectItem>
              <SelectItem value="rejected">반려</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">카테고리</label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue>전체</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">전체</SelectItem>
              <SelectItem value="item">아이템</SelectItem>
              <SelectItem value="recipe">레시피</SelectItem>
              <SelectItem value="npc">NPC</SelectItem>
              <SelectItem value="location">위치</SelectItem>
              <SelectItem value="event">이벤트</SelectItem>
              <SelectItem value="other">기타</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="border-b">
                <th className="w-40 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  생성일
                </th>
                <th className="w-28 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  유형
                </th>
                <th className="w-28 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  카테고리
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  제목
                </th>
                <th className="w-28 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  상태
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredReports.map((r) => (
                <tr
                  key={r.id}
                  className="cursor-pointer transition-colors hover:bg-muted/30"
                  onClick={() => goDetail(r.id)}
                >
                  <td className="px-4 py-3 text-sm text-muted-foreground">{formatDate(r.created_at)}</td>
                  <td className="px-4 py-3 text-sm">{toKoreanType(r.type)}</td>
                  <td className="px-4 py-3 text-sm">{toKoreanCategory(r.category)}</td>
                  <td className="px-4 py-3 text-sm">{r.title}</td>
                  <td className="px-4 py-3 text-sm">{toKoreanStatus(r.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {!loading && filteredReports.length === 0 ? (
        <div className="rounded-lg border py-12 text-center">
          <p className="text-muted-foreground">표시할 제보가 없습니다.</p>
        </div>
      ) : null}
    </div>
  )
}

export default ReportListPage

