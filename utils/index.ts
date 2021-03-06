/*!
 * Copyright (C) 2016-present, Yuansuan.cn
 */

export * from './hooks'

export function hex2Rgba(hex, alpha) {
  const r = parseInt(hex.substring(1, 3), 16)
  const g = parseInt(hex.substring(3, 5), 16)
  const b = parseInt(hex.substring(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function debounce<T extends Function>(func: T, wait, immediate?): T {
  let timeout, args, context, timestamp, result
  if (null == wait) wait = 100

  function later() {
    let last = Date.now() - timestamp

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        context = args = null
      }
    }
  }

  let debounced = function (this: any) {
    context = this
    args = arguments
    timestamp = Date.now()
    let callNow = immediate && !timeout
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }

  return debounced as any
}
