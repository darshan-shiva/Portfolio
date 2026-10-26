import { createContext, useContext } from 'react'

export type ShellApi = {
  go: (path: string) => void
  pathname: string
}

export const ShellContext = createContext<ShellApi>({ go: () => {}, pathname: '/' })
export const useShell = () => useContext(ShellContext)
