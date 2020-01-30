import { useState, useRef, useCallback } from 'react'
import { IRes } from '../types'

export interface IOptions<T> {
  onSuccess?: (res: T) => HasMore
  onFail?: (err: Error) => void
}

export interface IReturnValue<T> {
  isLoading: boolean
  run: (data?: any) => Promise<T> | void
  hasMore?: HasMore
}

export type HasMore = boolean | undefined

export function useAsyncFetch<T = IRes>(
  fn: (data?: any) => Promise<T>,
  options?: IOptions<T>
): IReturnValue<T> {
  const _options: IOptions<T> = options || {}

  const count = useRef(0)
  const fnRef = useRef(fn)
  fnRef.current = fn

  const successRef = useRef(_options.onSuccess)
  successRef.current = _options.onSuccess

  const failRef = useRef(_options.onFail)
  failRef.current = _options.onFail

  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState<boolean | null>(null)

  const run = useCallback((reqData: any): Promise<T> | void => {
    if (isLoading === true || hasMore === false) return

    const runCount = count.current

    setIsLoading(true)

    return fnRef
      .current(reqData)
      .then(res => {
        // 如果请求了多次，只拿最后一次的结果
        if (runCount === count.current) {
          setIsLoading(false)

          if (successRef.current) {
            const hasMore2 = successRef.current(res)

            if (hasMore2 !== undefined) setHasMore(hasMore2)
          }
        }

        return res
      })
      .catch(err => {
        if (runCount === count.current) {
          setIsLoading(false)

          if (failRef.current) failRef.current(err)

          return err
        }
      })
  }, [])

  const resValue: IReturnValue<T> = {
    isLoading,
    run
  }

  if (hasMore !== null) {
    resValue['hasMore'] = hasMore
  }

  return resValue
}
