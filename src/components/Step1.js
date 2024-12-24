import FormElement from './FormElement';

const Step1 = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-200 mb-6">Personal Information</h2>
      
      <FormElement
        label="Full Name"
        value={formData.fullName}
        onChange={(value) => updateFormData('fullName', value)}
        placeholder="John Doe"
        required
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormElement
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => updateFormData('email', value)}
          placeholder="john@example.com"
          required
        />
        
        <FormElement
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={(value) => updateFormData('phone', value)}
          placeholder="+1 (555) 123-4567"
          required
        />
      </div>
      
      <FormElement
        label="Location"
        value={formData.location}
        onChange={(value) => updateFormData('location', value)}
        placeholder="City, State, Country"
        required
      />
      
      <FormElement
        label="Career Objective"
        as="textarea"
        value={formData.objective}
        onChange={(value) => updateFormData('objective', value)}
        placeholder="Brief summary of your career goals and what you bring to the table..."
        required
      />
      
      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <h3 className="text-sm font-medium text-blue-400 mb-2">Tips for a Great Career Objective:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
          <li>Keep it concise (2-3 sentences)</li>
          <li>Highlight your professional identity</li>
          <li>Mention your years of experience</li>
          <li>Include your key skills and specializations</li>
          <li>Align it with the job you're targeting</li>
        </ul>
      </div>
    </div>
  );
};

export default Step1;