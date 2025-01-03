"use client"

import { useState, useEffect } from "react"

export function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") return initialValue

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  // Update localStorage when value changes
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
} 