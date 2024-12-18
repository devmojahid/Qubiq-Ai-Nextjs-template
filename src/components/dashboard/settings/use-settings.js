"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSettings = create(
  persist(
    (set, get) => ({
      settings: {
        theme: 'system',
        animations: true,
        reducedMotion: false,
        emailNotifications: true,
        pushNotifications: true,
        notificationSound: true,
        fontSize: 16,
        highContrast: false,
        screenReader: false,
      },
      unsavedChanges: false,
      updateSetting: (key, value) => {
        set((state) => ({
          settings: { ...state.settings, [key]: value },
          unsavedChanges: true
        }))
      },
      saveChanges: async () => {
        // Here you would typically save to your backend
        await new Promise(resolve => setTimeout(resolve, 1000))
        set({ unsavedChanges: false })
      },
      resetChanges: () => {
        set((state) => ({
          settings: state.settings,
          unsavedChanges: false
        }))
      }
    }),
    {
      name: 'user-settings'
    }
  )
) 