"use client"

import React, { useEffect, useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Admin } from './schema';
import { useApi } from '@/hooks/use-api';
import { useSession } from 'next-auth/react';

type DialogType = 'create' | 'update' | 'delete' | 'import'

interface ContextType {
  open: DialogType | null
  setOpen: (str: DialogType | null) => void
  currentRow: Admin | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Admin | null>>
  reload: () => void
  data: Admin[]
}

const Context = React.createContext<ContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function Provider({ children }: Props) {
  const [open, setOpen] = useDialogState<DialogType>(null)
  const [currentRow, setCurrentRow] = useState<Admin | null>(null)
  const [data, setData] = useState<Admin[]>([])

  const { request } = useApi()
  const { data: session } = useSession()

  const reload = async () => {
    if (!session) return
    
    try {
      const response = await request("/admin")
      if (response.data) setData(response.data)
    } catch (err) {
      console.log("🚀 ~ reload ~ err:", err)
    } finally {
    }
  }

  useEffect(() => {
    reload()
  }, [session])

  return (
    <Context.Provider value={{ open, setOpen, currentRow, setCurrentRow, reload, data }}>
      {children}
    </Context.Provider>
  )
}

export const useContext = () => {
  const context = React.useContext(Context)

  if (!context) {
    throw new Error('useContext has to be used within <Context>')
  }

  return context
}
