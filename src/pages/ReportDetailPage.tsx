import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import CardContent from '../components/ui/CardContent'
import CardHeader from '../components/ui/CardHeader'
import CardTitle from '../components/ui/CardTitle'
import PageTitle from '../components/ui/PageTitle'
import { useReportStore } from '../stores/reportStore'
import type { Report } from '../types/report'

function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
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

export function ReportDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const fetchReportById = useReportStore((state) => state.fetchReportById)

  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadReport() {
      if (!id) {
        setErrorMessage('잘못된 접근입니다.')
        setLoading(false)
        return
      }

      try {
        const data = await fetchReportById(id)
        setReport(data)
      } catch (e) {
        setErrorMessage('제보를 불러오는 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }
    loadReport()
  }, [id, fetchReportById])

  function goBack() {
    navigate('/report/list')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle>제보 상세</PageTitle>
        <Button variant="outline" onClick={goBack}>
          목록으로
        </Button>
      </div>

      {loading ? (
        <div className="text-muted-foreground">불러오는 중...</div>
      ) : errorMessage ? (
        <div className="text-red-600">{errorMessage}</div>
      ) : report ? (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{formatDate(report.created_at)}</span>
              <span>•</span>
              <span>{toKoreanType(report.type)}</span>
              <span>•</span>
              <span>{toKoreanCategory(report.category)}</span>
              <span>•</span>
              <span className="font-medium">{toKoreanStatus(report.status)}</span>
            </div>
            <CardTitle className="mt-2">{report.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none whitespace-pre-wrap dark:prose-invert">
              {report.description}
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}

export default ReportDetailPage

