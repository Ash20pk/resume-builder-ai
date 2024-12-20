"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import Select from 'react-select';
import { HexColorPicker } from 'react-colorful';
import { templates } from '@/components/resume-templates';
import { clsx } from 'clsx';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    education: '',
    skills: '',
    objective: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateResume = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedContent('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const chunk = decoder.decode(value);
        console.log(chunk);
        setGeneratedContent((prev) => prev + chunk);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const templateOptions = templates.map(template => ({
    value: template.id,
    label: template.name
  }));

  const SelectedTemplateComponent = selectedTemplate.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            AI Resume Builder
          </h1>
          <p className="text-gray-400 text-xl">
            Create a professional resume in minutes with AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 p-6 rounded-xl shadow-xl"
          >
            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Template Style
                </label>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={clsx(
                        "cursor-pointer rounded-lg overflow-hidden border-2 transition-all",
                        selectedTemplate.id === template.id
                          ? "border-blue-500 shadow-lg scale-[1.02]"
                          : "border-gray-700 hover:border-gray-500"
                      )}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="relative bg-white aspect-[1/1.4] w-full">
                        <div className="absolute inset-0 transform scale-[0.6]">
                          {template.preview({ primaryColor })}
                        </div>
                      </div>
                      <div className="p-3 bg-gray-800">
                        <h3 className="font-medium text-gray-200">{template.name}</h3>
                        <p className="text-sm text-gray-400">{template.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Primary Color
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="w-full h-10 rounded-md border border-gray-600"
                    style={{ backgroundColor: primaryColor }}
                  />
                  {showColorPicker && (
                    <div className="absolute z-10 mt-2">
                      <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <form onSubmit={generateResume} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Professional Experience
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Education
                </label>
                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Skills
                </label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Career Objective
                </label>
                <textarea
                  name="objective"
                  value={formData.objective}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded-lg text-white font-semibold ${
                  loading
                    ? 'bg-gray-600'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                } transition-all duration-200 transform hover:scale-105`}
              >
                {loading ? 'Generating...' : 'Generate Resume'}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800 p-6 rounded-xl shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-4">Generated Resume</h2>
            <div className="bg-white text-gray-800 rounded-lg min-h-[600px] overflow-auto shadow-inner">
              {loading && !generatedContent && (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
              {generatedContent && (
                <SelectedTemplateComponent
                  content={generatedContent}
                  primaryColor={primaryColor}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}