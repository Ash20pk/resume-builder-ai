'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Step1 from '@/components/Step1';
import Step2 from '@/components/Step2';
import Step3 from '@/components/Step3';
import Step4 from '@/components/Step4';
import StepIndicator from '@/components/StepIndicator';
import PreviewSelection from '@/components/PreviewSelection';
import ResumePreview from '@/components/ResumePreview';
import { ChevronLeft, ChevronRight, Download, Save, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'resume_builder_data';
const initialFormData = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  objective: '',
  experience: [{
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: ''
  }],
  education: [{
    institution: '',
    degree: '',
    startDate: '',
    endDate: '',
    description: ''
  }],
  skills: []
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  const [lastSaved, setLastSaved] = useState(null);
  
  // Load saved data on mount
  useEffect(() => {
    setMounted(true);
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
        setLastSaved(new Date());
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Autosave whenever form data changes
  useEffect(() => {
    if (mounted) {
      const timeoutId = setTimeout(() => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
          setLastSaved(new Date());
        } catch (error) {
          console.error('Error saving data:', error);
        }
      }, 1000); // Debounce autosave for 1 second

      return () => clearTimeout(timeoutId);
    }
  }, [formData, mounted]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all form data? This cannot be undone.')) {
      setFormData(initialFormData);
      localStorage.removeItem(STORAGE_KEY);
      setLastSaved(null);
      setGeneratedContent('');
      setError('');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate resume');
      }

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let content = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        content += chunk;
        setGeneratedContent(content);
      }

      if (content.includes('## Not Found ##')) {
        setError('Please fill in all required fields with detailed information.');
        setGeneratedContent('');
      }
    } catch (error) {
      console.error('Error generating resume:', error);
      setError('Failed to generate resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <Step2 formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <Step3 formData={formData} updateFormData={updateFormData} />;
      case 4:
        return (
          <>
            <Step4 formData={formData} updateFormData={updateFormData} />
            <div className="mt-8 pt-8 border-t border-slate-700">
              <PreviewSelection selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="min-h-screen relative">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Resume Builder AI</h1>
            <p className="text-gray-400">Create a professional resume in minutes</p>
            {lastSaved && (
              <p className="text-sm text-gray-500 mt-2">
                Last saved: {new Date(lastSaved).toLocaleTimeString()}
              </p>
            )}
          </div>

          {error && (
            <div className="max-w-6xl mx-auto mb-6">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400">
                {error}
              </div>
            </div>
          )}

          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Form Section */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <StepIndicator currentStep={currentStep} totalSteps={4} />
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg text-gray-400 hover:text-white hover:bg-slate-700/50 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Form
                  </button>
                </div>
                
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {getCurrentStep()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handleBack}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      currentStep === 1
                        ? 'text-gray-500 cursor-not-allowed'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    disabled={currentStep === 1}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentStep === 4 ? (
                      loading ? (
                        'Generating...'
                      ) : (
                        <>
                          Generate Resume
                          <Download className="w-5 h-5" />
                        </>
                      )
                    ) : (
                      <>
                        Next
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Preview Section */}
              <div className="lg:w-[600px] sticky top-8">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-200 mb-6">Preview</h2>
                  <div className="transform scale-[0.6] origin-top">
                    <ResumePreview markdown={generatedContent} template={selectedTemplate} />
                  </div>
                  {generatedContent && (
                    <div className="flex justify-end mt-6">
                      <button
                        onClick={() => {
                          // TODO: Implement PDF download
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        Download PDF
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}