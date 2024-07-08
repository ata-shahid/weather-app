

import { FC } from 'react';

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error: string;
  required?: boolean;
}

const FormField: FC<FormFieldProps> = ({ label, type, name, value, onChange, error, required }) => {
  return (
    <div>
      <label className="block mb-2 text-lg font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      )}
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FormField;
