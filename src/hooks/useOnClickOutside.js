import { useEffect } from 'react'

const MOUSEDOWN = 'mousedown'
const TOUCHSTART = 'touchstart'

const useOnClickOutside = (handler, ...refs) => {
  useEffect(() => {
    const listener = event => {
      if (refs.length > 0) {
        const needToHandle = refs.filter(ref => !ref.current || ref.current.contains(event.target))
        if (needToHandle.length !== 0) {
          return
        }

        return handler(event)
      }
    }

    document.addEventListener(MOUSEDOWN, listener)
    document.addEventListener(TOUCHSTART, listener)

    return () => {
      document.removeEventListener(MOUSEDOWN, listener)
      document.removeEventListener(TOUCHSTART, listener)
    }
  }, [refs, handler])
}

export default useOnClickOutside
