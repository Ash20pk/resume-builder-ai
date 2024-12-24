const FormElement = ({ label, type = 'text', value, onChange, placeholder, required = false, as = 'input' }) => {
  const Component = as;
  
  return (
    <div className="mb-4">
      <label className="block text-gray-200 text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Component
        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={as === 'textarea' ? 4 : undefined}
      />
    </div>
  );
};

export default FormElement;