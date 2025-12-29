import { Dispatch, SetStateAction, useOptimistic, startTransition } from 'react'

type FunctionalSetState<T> = (previousState: T) => T

export default function useOptimisticState<T>(
  initialState: T,
  updater: (newState: T) => Promise<void>
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useOptimistic(
    initialState,
    (_: T, update: T) => update
  )

  function setFunctionalState(newState: T | FunctionalSetState<T>) {
    const resolvedState = getResolvedState(newState, state)
    startTransition(() => updater(resolvedState))
    setState(resolvedState)
  }

  return [state, setFunctionalState]
}

function getResolvedState<T>(newState: T | FunctionalSetState<T>, state: T) {
  if (newState instanceof Function) {
    return newState(state)
  }

  return newState
}
