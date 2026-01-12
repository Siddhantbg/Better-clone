import React, { useState } from 'react';
import { AnimatedInput, FormValidationProvider } from './AnimatedFormInputs';
import { 
  AnimatedProgressIndicator, 
  FeedbackAnimation, 
  FloatingActionButton, 
  LoadingSpinner 
} from './LoadingAndFeedback';
import '../styles/form-animations.css';

/**
 * FormDemo component showcasing animated form inputs with loading and feedback states
 */
const FormDemo = () => {
  const [formData, setFormData] = useState({
    email: '',
    amount: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [feedback, setFeedback] = useState({ visible: false, type: 'success', message: '' });

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const simulateFormSubmission = async () => {
    setIsSubmitting(true);
    setProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setProgress(100);
      
      // Show success feedback
      setFeedback({
        visible: true,
        type: 'success',
        message: 'Form submitted successfully! Your crypto payment request has been processed.'
      });
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ email: '', amount: '', message: '' });
        setProgress(0);
      }, 2000);
    }, 2000);
  };

  const handleFeedbackClose = () => {
    setFeedback(prev => ({ ...prev, visible: false }));
  };

  const validationRules = {
    email: [
      { required: true, message: 'Email is required' },
      { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' }
    ],
    amount: [
      { required: true, message: 'Amount is required' },
      { custom: (value) => parseFloat(value) > 0, message: 'Amount must be greater than 0' },
      { custom: (value) => parseFloat(value) <= 1000000, message: 'Amount cannot exceed ₹10,00,000' }
    ],
    message: [
      { maxLength: 500, message: 'Message cannot exceed 500 characters' }
    ]
  };

  return (
    <div className="bg-gradient-to-br from-[#0F0F23] via-[#1A1B3A] to-[#0F0F23] px-6 md:px-20 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-white mb-4">
            Enhanced Form Experience
          </h3>
          <p className="text-gray-300">
            Experience our modern form inputs with real-time validation, 
            animated feedback, and smooth loading states.
          </p>
        </div>

        <div className="bg-black/20 backdrop-blur-lg rounded-xl p-8 border border-white/10">
          <FormValidationProvider validationRules={validationRules}>
            <div className="space-y-6">
              <AnimatedInput
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                color="primary"
                required
                placeholder="Enter your email"
              />

              <AnimatedInput
                name="amount"
                label="Payment Amount (₹)"
                type="number"
                value={formData.amount}
                onChange={handleInputChange('amount')}
                color="accent"
                required
                placeholder="Enter amount"
              />

              <AnimatedInput
                name="message"
                label="Additional Message"
                value={formData.message}
                onChange={handleInputChange('message')}
                color="secondary"
                placeholder="Optional message"
              />

              {/* Progress Indicator */}
              {isSubmitting && (
                <AnimatedProgressIndicator
                  progress={progress}
                  color="primary"
                  size="medium"
                  label="Processing your request..."
                  showPercentage={true}
                />
              )}

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={simulateFormSubmission}
                  disabled={isSubmitting || !formData.email || !formData.amount}
                  className={`
                    px-8 py-3 rounded-lg font-medium transition-all duration-300
                    ${isSubmitting || !formData.email || !formData.amount
                      ? 'bg-gray-600 cursor-not-allowed opacity-50'
                      : 'bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7C3AED] button-hover-effect'
                    }
                    text-white flex items-center gap-3
                  `}
                >
                  {isSubmitting && <LoadingSpinner size="small" color="primary" />}
                  {isSubmitting ? 'Processing...' : 'Submit Payment Request'}
                </button>
              </div>
            </div>
          </FormValidationProvider>
        </div>

        {/* Demo Controls */}
        <div className="mt-8 bg-black/10 backdrop-blur-lg rounded-xl p-6 border border-white/5">
          <h4 className="text-lg font-semibold text-white mb-4">Demo Controls</h4>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFeedback({ visible: true, type: 'success', message: 'Payment processed successfully!' })}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Show Success
            </button>
            <button
              onClick={() => setFeedback({ visible: true, type: 'error', message: 'Payment failed. Please try again.' })}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Show Error
            </button>
            <button
              onClick={() => setFeedback({ visible: true, type: 'warning', message: 'Please verify your payment details.' })}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Show Warning
            </button>
            <button
              onClick={() => setFeedback({ visible: true, type: 'info', message: 'Your payment is being processed.' })}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Show Info
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        color="primary"
        size="medium"
        position="bottom-right"
        magneticEffect={true}
      >
        ↑
      </FloatingActionButton>

      {/* Feedback Animation */}
      <FeedbackAnimation
        type={feedback.type}
        message={feedback.message}
        visible={feedback.visible}
        onClose={handleFeedbackClose}
        position="top"
        autoHideDuration={4000}
      />
    </div>
  );
};

export default FormDemo;