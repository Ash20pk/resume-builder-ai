import { useState } from 'react';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and professional design with a modern touch',
    preview: '/templates/modern.png'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional resume format, perfect for any industry',
    preview: '/templates/classic.png'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant design focusing on content',
    preview: '/templates/minimal.png'
  }
];

const PreviewSelection = ({ selectedTemplate, setSelectedTemplate }) => {
  const [selectedColor, setSelectedColor] = useState('#2563eb'); // Default blue color

  const colors = [
    '#2563eb', // Blue
    '#059669', // Green
    '#dc2626', // Red
    '#7c3aed', // Purple
    '#0891b2', // Cyan
    '#ea580c', // Orange
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-200 mb-6">Choose Template</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`relative p-4 rounded-lg border-2 transition-all cursor-pointer ${
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className="aspect-[3/4] mb-4 overflow-hidden rounded-md bg-slate-700">
              {/* Template preview image would go here */}
              <div className="w-full h-full flex items-center justify-center text-slate-500">
                Preview
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-gray-200">{template.name}</h3>
            <p className="text-sm text-gray-400 mt-1">{template.description}</p>
            
            {selectedTemplate === template.id && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-200 mb-4">Accent Color</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full transition-all ${
                selectedColor === color ? 'ring-2 ring-offset-2 ring-offset-slate-900 ring-white' : ''
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewSelection;