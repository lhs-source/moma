import { useState } from 'react'

import Button from '../ui/Button'
import Input from '../ui/Input'
import { Select } from '../ui/select/Select'
import { SelectContent } from '../ui/select/SelectContent'
import { SelectItem } from '../ui/select/SelectItem'
import { SelectTrigger } from '../ui/select/SelectTrigger'
import { SelectValue } from '../ui/select/SelectValue'
import type { ReportCategory, ReportFormData, ReportType } from '../../types/report'

interface ReportFormProps {
  disabled?: boolean
  onSubmit: (data: ReportFormData) => void
}

export function ReportForm({ disabled = false, onSubmit }: ReportFormProps) {
  const [formData, setFormData] = useState<ReportFormData>({
    type: 'error',
    category: 'item',
    title: '',
    description: '',
  })

  const isFormValid = formData.title.trim() !== '' && formData.description.trim() !== ''

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isFormValid) {
      alert('필수 항목을 모두 입력해주세요.')
      return
    }
    onSubmit(formData)
  }

  function resetForm() {
    setFormData({
      type: 'error',
      category: 'item',
      title: '',
      description: '',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="report-type" className="text-sm font-medium">
          제보 유형 *
        </label>
        <Select
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value as ReportType })}
        >
          <SelectTrigger>
            <SelectValue>제보 유형을 선택하세요</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="error">오류 수정</SelectItem>
            <SelectItem value="addition">새 데이터 추가</SelectItem>
            <SelectItem value="other">기타</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="report-category" className="text-sm font-medium">
          관련 카테고리 *
        </label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value as ReportCategory })}
        >
          <SelectTrigger>
            <SelectValue>관련 카테고리를 선택하세요</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="item">아이템</SelectItem>
            <SelectItem value="recipe">레시피</SelectItem>
            <SelectItem value="npc">NPC</SelectItem>
            <SelectItem value="location">위치</SelectItem>
            <SelectItem value="event">이벤트</SelectItem>
            <SelectItem value="other">기타</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="report-title" className="text-sm font-medium">
          제보 제목 *
        </label>
        <Input
          id="report-title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="제보 내용을 간단히 요약해주세요"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="report-description" className="text-sm font-medium">
          상세 설명 *
        </label>
        <textarea
          id="report-description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="오류 내용이나 추가할 정보를 자세히 설명해주세요"
          rows={4}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={resetForm} disabled={disabled}>
          초기화
        </Button>
        <Button type="submit" disabled={!isFormValid || disabled}>
          {disabled ? '제출 중...' : '제보하기'}
        </Button>
      </div>
    </form>
  )
}

export default ReportForm

