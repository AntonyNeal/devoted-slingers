import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import type { BookingModalProps } from '../types/booking.types';

interface BookingModalState {
  currentStep: number;
  selectedDate: Date | null;
  selectedTime: string | null;
  duration: number;
  clientInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  paymentMethod: string | null;
  isProcessing: boolean;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [state, setState] = useState<BookingModalState>({
    currentStep: 1,
    selectedDate: null,
    selectedTime: null,
    duration: 1,
    clientInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    paymentMethod: null,
    isProcessing: false,
  });

  const modalRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="bg-gradient-to-br from-gray-900 to-orange-950 border-2 border-orange-600/50 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-orange-950 border-b border-orange-600/30 p-6 flex justify-between items-center">
          <h2
            id="modal-title"
            className="text-2xl font-bold text-orange-400 uppercase tracking-wide"
          >
            Join the Battle
          </h2>
          <button
            onClick={onClose}
            className="text-orange-400 hover:text-orange-300 transition-colors"
            aria-label="Close registration modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                    state.currentStep === step
                      ? 'bg-gradient-to-br from-orange-600 to-red-700 text-white shadow-lg shadow-orange-500/50'
                      : state.currentStep > step
                        ? 'bg-gradient-to-br from-green-600 to-emerald-700 text-white'
                        : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {state.currentStep > step ? '⚔️' : step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-12 h-1 ${
                      state.currentStep > step
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600'
                        : 'bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {state.currentStep === 1 && (
              <div>
                <h3 className="text-lg font-semibold text-orange-400 mb-4 uppercase">
                  Choose Your Battle Date
                </h3>
                <p className="text-gray-300 mb-4">
                  Select your preferred tournament date from the upcoming battle schedule.
                </p>
                <div className="bg-gradient-to-br from-orange-950/60 to-gray-900/60 border border-orange-600/30 rounded-lg p-6 text-center text-orange-300 backdrop-blur-sm">
                  <div className="text-4xl mb-3">📅</div>
                  <p className="font-semibold">Tournament Calendar</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Coming soon - Check back for scheduled battles
                  </p>
                </div>
              </div>
            )}

            {state.currentStep === 2 && (
              <div>
                <h3 className="text-lg font-semibold text-orange-400 mb-4 uppercase">
                  Select Tournament Format
                </h3>
                <p className="text-gray-300 mb-4">
                  Choose your preferred battle format and entry tier.
                </p>
                <div className="bg-gradient-to-br from-orange-950/60 to-gray-900/60 border border-orange-600/30 rounded-lg p-6 text-center text-orange-300 backdrop-blur-sm">
                  <div className="text-4xl mb-3">⚔️</div>
                  <p className="font-semibold">Format Selection</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Standard, Commander, Draft, or Modern awaits
                  </p>
                </div>
              </div>
            )}

            {state.currentStep === 3 && (
              <div>
                <h3 className="text-lg font-semibold text-orange-400 mb-4 uppercase">
                  Warrior Registration
                </h3>
                <p className="text-gray-300 mb-4">
                  Provide your warrior details to complete registration.
                </p>
                <div className="bg-gradient-to-br from-orange-950/60 to-gray-900/60 border border-orange-600/30 rounded-lg p-6 text-center text-orange-300 backdrop-blur-sm">
                  <div className="text-4xl mb-3">🛡️</div>
                  <p className="font-semibold">Contact Information</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Name, email, and DCI number if applicable
                  </p>
                </div>
              </div>
            )}

            {state.currentStep === 4 && (
              <div>
                <h3 className="text-lg font-semibold text-orange-400 mb-4 uppercase">
                  Secure Your Spot
                </h3>
                <p className="text-gray-300 mb-4">
                  Complete your registration with entry fee payment.
                </p>
                <div className="bg-gradient-to-br from-orange-950/60 to-gray-900/60 border border-orange-600/30 rounded-lg p-6 text-center text-orange-300 backdrop-blur-sm">
                  <div className="text-4xl mb-3">💳</div>
                  <p className="font-semibold">Payment Processing</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Secure payment gateway integration coming soon
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            <button
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  currentStep: Math.max(1, prev.currentStep - 1),
                }))
              }
              disabled={state.currentStep === 1}
              className="px-6 py-2 border-2 border-orange-600/50 rounded-lg font-medium text-orange-400 hover:bg-orange-950/50 hover:border-orange-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Back
            </button>
            <button
              onClick={() => {
                if (state.currentStep === 4) {
                  // Process registration
                  setState((prev) => ({ ...prev, isProcessing: true }));
                  setTimeout(() => {
                    onClose();
                  }, 1000);
                } else {
                  setState((prev) => ({
                    ...prev,
                    currentStep: Math.min(4, prev.currentStep + 1),
                  }));
                }
              }}
              disabled={state.isProcessing}
              className="px-6 py-2 bg-gradient-to-r from-orange-600 to-red-700 text-white rounded-lg font-bold hover:from-orange-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-orange-500/50"
            >
              {state.currentStep === 4 ? 'Join the Warband' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
