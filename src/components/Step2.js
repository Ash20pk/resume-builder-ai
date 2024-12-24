import FormElement from './FormElement';

const Step2 = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-200 mb-6">Professional Experience</h2>
      
      <div className="space-y-8">
        {formData.experience.map((exp, index) => (
          <div key={index} className="space-y-4 p-4 bg-slate-800/50 rounded-lg">
            <FormElement
              label="Company Name"
              value={exp.company}
              onChange={(value) => {
                const newExp = [...formData.experience];
                newExp[index] = { ...exp, company: value };
                updateFormData('experience', newExp);
              }}
              placeholder="Company Name"
              required
            />
            
            <FormElement
              label="Position"
              value={exp.position}
              onChange={(value) => {
                const newExp = [...formData.experience];
                newExp[index] = { ...exp, position: value };
                updateFormData('experience', newExp);
              }}
              placeholder="Senior Software Engineer"
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormElement
                label="Start Date"
                type="month"
                value={exp.startDate}
                onChange={(value) => {
                  const newExp = [...formData.experience];
                  newExp[index] = { ...exp, startDate: value };
                  updateFormData('experience', newExp);
                }}
                required
              />
              
              <FormElement
                label="End Date"
                type="month"
                value={exp.endDate}
                onChange={(value) => {
                  const newExp = [...formData.experience];
                  newExp[index] = { ...exp, endDate: value };
                  updateFormData('experience', newExp);
                }}
                placeholder="Present"
              />
            </div>
            
            <FormElement
              label="Description"
              as="textarea"
              value={exp.description}
              onChange={(value) => {
                const newExp = [...formData.experience];
                newExp[index] = { ...exp, description: value };
                updateFormData('experience', newExp);
              }}
              placeholder="• Describe your key responsibilities and achievements&#10;• Use bullet points for better readability&#10;• Include quantifiable results where possible"
              required
            />
            
            {index > 0 && (
              <button
                type="button"
                onClick={() => {
                  const newExp = formData.experience.filter((_, i) => i !== index);
                  updateFormData('experience', newExp);
                }}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Remove Experience
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => {
            const newExp = [...formData.experience, {
              company: '',
              position: '',
              startDate: '',
              endDate: '',
              description: ''
            }];
            updateFormData('experience', newExp);
          }}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Experience
        </button>
      </div>
    </div>
  );
};

export default Step2;