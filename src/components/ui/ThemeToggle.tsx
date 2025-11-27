import { useEffect, useState } from 'react'

import { cn } from '../../lib/utils'

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  const storedTheme = window.localStorage.getItem('theme')
  if (storedTheme === 'dark') {
    return true
  }
  if (storedTheme === 'light') {
    return false
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      window.localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      window.localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [])

  return (
    <button
      type="button"
      onClick={() => setIsDark((prev) => !prev)}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors',
        'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground',
      )}
    >
      {isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
      <span className="sr-only">테마 전환</span>
    </button>
  )
}

export default ThemeToggle

