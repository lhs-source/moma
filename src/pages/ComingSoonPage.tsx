interface ComingSoonPageProps {
  title: string
  description?: string
}

export function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      <p className="max-w-xl text-muted-foreground">
        {description ?? '이 화면은 React 전환 작업 중입니다. 곧 준비될 예정이에요.'}
      </p>
    </div>
  )
}

export default ComingSoonPage

