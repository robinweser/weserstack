import { RefObject, useEffect } from 'react'

type Options = {
  modifiers?: {
    ctrl?: boolean
    meta?: boolean
    alt?: boolean
    shift?: boolean
  }
  target?: RefObject<HTMLElement>
  active?: boolean
}
export default function useKeyDown(
  keyCode: string | Array<string>,
  callback: (e: KeyboardEvent) => void,
  options: Options = {}
) {
  const { active = true, target, modifiers = {} } = options
  const { ctrl = false, meta = false, alt = false, shift = false } = modifiers

  const keyCodes = ([] as Array<string>).concat(keyCode)

  useEffect(() => {
    if (!active || target === null || target?.current === null) {
      return
    }

    const hasRef = target && target.current
    const element: Document | HTMLElement = target?.current ?? document

    if (element) {
      const handleKeyDown: EventListener = (event) => {
        const e = event as KeyboardEvent

        if (!keyCodes.includes(e.code)) return
        if (hasRef && document.activeElement !== element) return

        if (ctrl && !e.ctrlKey) return
        if (meta && !e.metaKey) return
        if (alt && !e.altKey) return
        if (shift && !e.shiftKey) return

        callback(e)
      }

      element.addEventListener('keydown', handleKeyDown)
      return () => element.removeEventListener('keydown', handleKeyDown)
    }
  }, [options, callback, active])
}
