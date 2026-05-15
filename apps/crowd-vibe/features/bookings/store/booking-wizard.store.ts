import { create } from 'zustand';
import type { BookingFormData } from '../types';

interface BookingWizardState {
  step: number;
  formData: Partial<BookingFormData>;
  submitting: boolean;
  submitted: boolean;
  error: string | null;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateForm: (data: Partial<BookingFormData>) => void;
  setSubmitting: (v: boolean) => void;
  setSubmitted: (v: boolean) => void;
  setError: (msg: string | null) => void;
  reset: () => void;
}

const INITIAL: Pick<BookingWizardState, 'step' | 'formData' | 'submitting' | 'submitted' | 'error'> = {
  step: 0,
  formData: {},
  submitting: false,
  submitted: false,
  error: null,
};

export const useBookingWizardStore = create<BookingWizardState>((set) => ({
  ...INITIAL,
  setStep: (step) => set({ step }),
  nextStep: () => set((s) => ({ step: s.step + 1 })),
  prevStep: () => set((s) => ({ step: Math.max(0, s.step - 1) })),
  updateForm: (data) => set((s) => ({ formData: { ...s.formData, ...data } })),
  setSubmitting: (submitting) => set({ submitting }),
  setSubmitted: (submitted) => set({ submitted }),
  setError: (error) => set({ error }),
  reset: () => set(INITIAL),
}));
