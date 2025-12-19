import React, { useEffect, useState } from 'react'

const THEME_KEY = 'fv_theme'

export default function ThemeToggle(){
  const [theme, setTheme] = useState(() => {
    try{
      return localStorage.getItem(THEME_KEY) || 'system'
    }catch(e){
      return 'system'
    }
  })

  useEffect(()=>{
    const html = document.documentElement
    if(theme === 'system'){
      html.removeAttribute('data-theme')
    }else{
      html.setAttribute('data-theme', theme)
    }
    try{ localStorage.setItem(THEME_KEY, theme) }catch(e){}
  },[theme])

  function next(){
    setTheme(prev => prev === 'system' ? 'dark' : prev === 'dark' ? 'light' : 'system')
  }

  return (
    <div className="theme-toggle" title="Toggle theme (system → dark → light)">
      <button onClick={next}>{theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light'}</button>
    </div>
  )
}
