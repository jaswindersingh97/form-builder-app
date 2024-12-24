import React from 'react'
import { ModalProvider } from './ModalContext'
import { ThemeProvider } from './ThemeContext'
import { TokenProvider } from './TokenContext'
import { FolderProvider } from './FolderContext'
import { FormProvider } from './FormContext'
function AppProvider({children}) {
  return (
      <ModalProvider>
        <ThemeProvider>
          <TokenProvider>
            <FolderProvider>
              <FormProvider>
                {children}
              </FormProvider>
            </FolderProvider>
          </TokenProvider>
        </ThemeProvider>
      </ModalProvider>
  )
}

export default AppProvider
