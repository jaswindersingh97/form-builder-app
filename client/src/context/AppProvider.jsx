import React from 'react'
import { ModalProvider } from './ModalContext'
import { ThemeProvider } from './ThemeContext'
function AppProvider({children}) {
  return (
      <ModalProvider>
        <ThemeProvider>
            {children}
        </ThemeProvider>
        </ModalProvider>
  )
}

export default AppProvider
