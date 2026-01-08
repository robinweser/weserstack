'use client'
import { useContext } from 'react'

import DndContext from './DndContext'

export default function useDndContext() {
  const context = useContext(DndContext)

  if (!context) {
    throw new Error("You're using dnd context outside of its provider.")
  }

  return context
}
