import FormElement from './FormElement';

const Step4 = ({ formData, updateFormData }) => {
  const handleSkillsChange = (value) => {
    // Split by commas and clean up whitespace
    const skillsArray = value.split(',').map(skill => skill.trim()).filter(Boolean);
    updateFormData('skills', skillsArray);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-200 mb-6">Skills</h2>
      
      <FormElement
        label="Technical & Professional Skills"
        as="textarea"
        value={formData.skills.join(', ')}
        onChange={handleSkillsChange}
        placeholder="JavaScript, React, Node.js, Project Management, Team Leadership"
        required
      />
      
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-300 mb-2">Current Skills:</h3>
        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-slate-800/50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-200 mb-2">Tips for Skills Section:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
          <li>Include a mix of technical and soft skills</li>
          <li>List the most relevant skills first</li>
          <li>Use industry-standard terminology</li>
          <li>Separate skills with commas</li>
          <li>Include proficiency levels if relevant</li>
        </ul>
      </div>
    </div>
  );
};

export default Step4;