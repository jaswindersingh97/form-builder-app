import React from 'react'
import { ModalProvider } from './ModalContext'
import { ThemeProvider } from './ThemeContext'
import { TokenProvider } from './TokenContext'
import { FolderProvider } from './FolderContext'
function AppProvider({children}) {
  return (
      <ModalProvider>
        <ThemeProvider>
          <TokenProvider>
            <FolderProvider>
              {children}
            </FolderProvider>
          </TokenProvider>
        </ThemeProvider>
      </ModalProvider>
  )
}

export default AppProvider
