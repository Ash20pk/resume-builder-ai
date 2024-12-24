'use client';

import { useState } from 'react';
import { ModernTemplate } from './resume-templates/modern';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResumeBuilder({ jobAnalysis }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
    },
    experience: [
      {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ],
    education: [
      {
        school: '',
        degree: '',
        fieldOfStudy: '',
        graduationYear: '',
      },
    ],
    skills: '',
    projects: [
      {
        name: '',
        description: '',
        technologies: '',
      },
    ],
  });

  const handleInputChange = (section, index, field, value) => {
    setFormData(prev => {
      if (Array.isArray(prev[section])) {
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [section]: newArray };
      } else if (section === 'personalInfo') {
        return {
          ...prev,
          personalInfo: { ...prev.personalInfo, [field]: value },
        };
      } else {
        return { ...prev, [section]: value };
      }
    });
  };

  const addItem = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], getEmptyItem(section)],
    }));
  };

  const removeItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const getEmptyItem = (section) => {
    switch (section) {
      case 'experience':
        return {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
        };
      case 'education':
        return {
          school: '',
          degree: '',
          fieldOfStudy: '',
          graduationYear: '',
        };
      case 'projects':
        return {
          name: '',
          description: '',
          technologies: '',
        };
      default:
        return {};
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setShowResume(true);
  };

  return (
    <div className="min-h-screen flex">
      <AnimatePresence mode="wait">
        {!showResume ? (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
              {/* Personal Information */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={formData.personalInfo.name}
                      onChange={(e) => handleInputChange('personalInfo', null, 'name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={formData.personalInfo.email}
                      onChange={(e) => handleInputChange('personalInfo', null, 'email', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      value={formData.personalInfo.phone}
                      onChange={(e) => handleInputChange('personalInfo', null, 'phone', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      value={formData.personalInfo.location}
                      onChange={(e) => handleInputChange('personalInfo', null, 'location', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Experience</h3>
                  <button
                    type="button"
                    onClick={() => addItem('experience')}
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Add Experience
                  </button>
                </div>
                {formData.experience.map((exp, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    {index > 0 && <div className="border-t my-6"></div>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleInputChange('experience', index, 'company', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Position</label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => handleInputChange('experience', index, 'position', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => handleInputChange('experience', index, 'startDate', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                        <input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => handleInputChange('experience', index, 'endDate', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                          value={exp.description}
                          onChange={(e) => handleInputChange('experience', index, 'description', e.target.value)}
                          rows="3"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        ></textarea>
                      </div>
                      {index > 0 && (
                        <div className="md:col-span-2">
                          <button
                            type="button"
                            onClick={() => removeItem('experience', index)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove Experience
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Education</h3>
                  <button
                    type="button"
                    onClick={() => addItem('education')}
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Add Education
                  </button>
                </div>
                {formData.education.map((edu, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    {index > 0 && <div className="border-t my-6"></div>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">School</label>
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) => handleInputChange('education', index, 'school', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleInputChange('education', index, 'degree', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                        <input
                          type="text"
                          value={edu.fieldOfStudy}
                          onChange={(e) => handleInputChange('education', index, 'fieldOfStudy', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
                        <input
                          type="number"
                          value={edu.graduationYear}
                          onChange={(e) => handleInputChange('education', index, 'graduationYear', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      {index > 0 && (
                        <div className="md:col-span-2">
                          <button
                            type="button"
                            onClick={() => removeItem('education', index)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove Education
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Skills</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    List your skills (separated by commas)
                  </label>
                  <textarea
                    value={formData.skills}
                    onChange={(e) => handleInputChange('skills', null, null, e.target.value)}
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., JavaScript, React, Node.js, Project Management"
                  ></textarea>
                </div>
              </div>

              {/* Projects */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Projects</h3>
                  <button
                    type="button"
                    onClick={() => addItem('projects')}
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Add Project
                  </button>
                </div>
                {formData.projects.map((project, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    {index > 0 && <div className="border-t my-6"></div>}
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Project Name</label>
                        <input
                          type="text"
                          value={project.name}
                          onChange={(e) => handleInputChange('projects', index, 'name', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                          value={project.description}
                          onChange={(e) => handleInputChange('projects', index, 'description', e.target.value)}
                          rows="3"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Technologies Used (separated by commas)
                        </label>
                        <input
                          type="text"
                          value={project.technologies}
                          onChange={(e) => handleInputChange('projects', index, 'technologies', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      {index > 0 && (
                        <div>
                          <button
                            type="button"
                            onClick={() => removeItem('projects', index)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove Project
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isGenerating ? 'Generating...' : 'Generate Resume'}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="resume"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-[60%] fixed right-0 top-0 h-screen overflow-y-auto bg-gray-50"
          >
            <div className="sticky top-0 z-10 bg-white p-4 shadow-md">
              <button
                onClick={() => setShowResume(false)}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Form
              </button>
            </div>
            <div className="p-6">
              <ModernTemplate content={formData} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
