import { useState, useEffect } from 'react'

export default function useDocumentHidden() {
  const [isDocumentHidden, setIsDocumentHidden] = useState(document.hidden)

  useEffect(() => {
    function handleVisibilityChange() {
      setIsDocumentHidden(document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return isDocumentHidden
}
