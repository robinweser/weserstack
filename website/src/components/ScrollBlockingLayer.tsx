'use client'
import { PropsWithChildren } from 'react'
import { useScrollBlocking } from '@weser/hook'
import { useLayerContext } from '@weser/layer'

export default function ScrollBlockingLayer({ children }: PropsWithChildren) {
  const { layers } = useLayerContext()
  useScrollBlocking(layers.length > 0)

  return children
}
