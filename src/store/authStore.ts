import { create } from 'zustand'

type Section = 'login' | 'verification' | 'submit'

interface AuthState {
  phone: string
  otpCode: string
  hasError: boolean
  currentSection: Section
  showButton: boolean
  secondsLeft: number

  setPhone: (phone: string) => void
  setOtpCode: (code: string) => void
  setHasError: (value: boolean) => void
  setCurrentSection: (section: Section) => void
  setShowButton: (value: boolean) => void
  setSecondsLeft: (value: number) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  phone: '',
  otpCode: '',
  hasError: false,
  currentSection: 'login',
  showButton: false,
  secondsLeft: 60,

  setPhone: (phone) => set({ phone }),
  setOtpCode: (otpCode) => set({ otpCode }),
  setHasError: (hasError) => set({ hasError }),
  setCurrentSection: (currentSection) => set({ currentSection }),
  setShowButton: (showButton) => set({ showButton }),
  setSecondsLeft: (secondsLeft) => set({ secondsLeft }),
}))
