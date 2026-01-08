"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  /* Usamos 'resolvedTheme' para saber se é dark/light DE VERDADE, mesmo no modo automático */
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-sky-100/50 opacity-50"></div>
    )
  }

  return (
    <button
      /* SE O TEMA ATUAL (RESOLVED) FOR DARK, VIRA LIGHT. SE NÃO, VIRA DARK */
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative p-2 rounded-full bg-sky-100/50 dark:bg-slate-800 text-sky-700 dark:text-sky-300 hover:bg-sky-200 dark:hover:bg-slate-700 transition-all border border-sky-200 dark:border-slate-600 cursor-pointer"
      aria-label="Alternar tema"
    >
      {resolvedTheme === "dark" ? (
        <Moon size={20} className="animate-in spin-in-180 fade-in duration-300" />
      ) : (
        <Sun size={20} className="animate-in spin-in-90 fade-in duration-300" />
      )}
    </button>
  )
}