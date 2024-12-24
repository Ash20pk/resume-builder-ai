import FormElement from './FormElement';

const Step3 = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-200 mb-6">Education</h2>
      
      <div className="space-y-8">
        {formData.education.map((edu, index) => (
          <div key={index} className="space-y-4 p-4 bg-slate-800/50 rounded-lg">
            <FormElement
              label="Institution"
              value={edu.institution}
              onChange={(value) => {
                const newEdu = [...formData.education];
                newEdu[index] = { ...edu, institution: value };
                updateFormData('education', newEdu);
              }}
              placeholder="University Name"
              required
            />
            
            <FormElement
              label="Degree"
              value={edu.degree}
              onChange={(value) => {
                const newEdu = [...formData.education];
                newEdu[index] = { ...edu, degree: value };
                updateFormData('education', newEdu);
              }}
              placeholder="Bachelor of Science in Computer Science"
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormElement
                label="Start Date"
                type="month"
                value={edu.startDate}
                onChange={(value) => {
                  const newEdu = [...formData.education];
                  newEdu[index] = { ...edu, startDate: value };
                  updateFormData('education', newEdu);
                }}
                required
              />
              
              <FormElement
                label="End Date"
                type="month"
                value={edu.endDate}
                onChange={(value) => {
                  const newEdu = [...formData.education];
                  newEdu[index] = { ...edu, endDate: value };
                  updateFormData('education', newEdu);
                }}
                placeholder="Present"
              />
            </div>
            
            <FormElement
              label="Description"
              as="textarea"
              value={edu.description}
              onChange={(value) => {
                const newEdu = [...formData.education];
                newEdu[index] = { ...edu, description: value };
                updateFormData('education', newEdu);
              }}
              placeholder="• Relevant coursework&#10;• Academic achievements&#10;• GPA (if above 3.5)&#10;• Honors and awards"
            />
            
            {index > 0 && (
              <button
                type="button"
                onClick={() => {
                  const newEdu = formData.education.filter((_, i) => i !== index);
                  updateFormData('education', newEdu);
                }}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Remove Education
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => {
            const newEdu = [...formData.education, {
              institution: '',
              degree: '',
              startDate: '',
              endDate: '',
              description: ''
            }];
            updateFormData('education', newEdu);
          }}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Education
        </button>
      </div>
    </div>
  );
};

export default Step3;