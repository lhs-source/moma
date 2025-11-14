import { useState } from 'react'

import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import CardContent from '../components/ui/CardContent'
import CardHeader from '../components/ui/CardHeader'
import CardTitle from '../components/ui/CardTitle'
import PageTitle from '../components/ui/PageTitle'
import ReportForm from '../components/report/ReportForm'
import { useReportStore } from '../stores/reportStore'
import type { ReportFormData } from '../types/report'

export function ReportPage() {
  const submitReport = useReportStore((state) => state.submitReport)
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [showGuide, setShowGuide] = useState(false)

  async function handleSubmit(reportData: ReportFormData) {
    setSubmitting(true)
    setSubmitMessage('')

    try {
      await submitReport(reportData)
      setSubmitMessage('제보가 성공적으로 제출되었습니다!')

      setTimeout(() => {
        setSubmitMessage('')
      }, 3000)
    } catch (error) {
      console.error('Error submitting report:', error)
      setSubmitMessage('제보 제출 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle>데이터 제보</PageTitle>
        <p className="text-sm text-muted-foreground">잘못된 정보나 누락된 데이터를 제보해주세요</p>
      </div>

      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>제보하기</CardTitle>
            <p className="text-sm text-muted-foreground">
              게임 데이터의 오류나 누락 사항을 제보해주시면 검토 후 반영하겠습니다.
            </p>
          </CardHeader>
          <CardContent>
            <ReportForm onSubmit={handleSubmit} disabled={submitting} />
          </CardContent>
        </Card>
      </div>

      {submitMessage ? (
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={
              submitMessage.includes('성공') ? 'text-green-600' : 'text-red-600'
            }
          >
            {submitMessage}
          </p>
        </div>
      ) : null}

      <div className="text-center">
        <Button variant="outline" onClick={() => setShowGuide(true)}>
          제보 가이드 보기
        </Button>
      </div>

      {showGuide ? (
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>제보 가이드</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-medium">좋은 제보의 예시:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 아이템 가격이 실제와 다름 (예: 사과 가격이 100골드 → 120골드)</li>
                    <li>• 새로운 레시피 발견 (예: 빵 + 버터 = 샌드위치)</li>
                    <li>• NPC 위치 정보 오류</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-medium">제보 시 주의사항:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 정확한 정보를 확인한 후 제보해주세요</li>
                    <li>• 스크린샷이 있으면 더욱 도움이 됩니다</li>
                    <li>• 개인정보는 입력하지 마세요</li>
                  </ul>
                </div>
                <div className="text-right">
                  <Button variant="outline" onClick={() => setShowGuide(false)}>
                    닫기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  )
}

export default ReportPage

