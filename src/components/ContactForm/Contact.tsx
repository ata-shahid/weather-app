// src/components/ContactForm/Contact.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import { FormField } from './FormField';
import { Button } from './Button';

interface FormData {
  name: string;
  email: string;
  phone: string;
  feedback: string;
}

interface FormErrors {
  name: string;
  email: string;
  phone: string;
  feedback: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    feedback: ''
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    phone: '',
    feedback: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;
    const newErrors: FormErrors = { name: '', email: '', phone: '', feedback: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
      valid = false;
    }

    const phoneRegex = /^(\+?(\d{1,3})[-.\s]?)?(\d{3,4}[-.\s]?\d{2,3}[-.\s]?\d{3,4}|\d{4,5}[-.\s]?\d{4,5})$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
      valid = false;
    }

    if (!formData.feedback.trim()) {
      newErrors.feedback = 'Feedback is required';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="max-w-xl mx-auto">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
          <FormField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            error={errors.name}
            onChange={handleChange}
          />
          <FormField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            error={errors.email}
            onChange={handleChange}
          />
          <FormField
            label="Phone"
            type="text"
            name="phone"
            value={formData.phone}
            error={errors.phone}
            onChange={handleChange}
          />
          <FormField
            label="Feedback"
            type="textarea"
            name="feedback"
            value={formData.feedback}
            error={errors.feedback}
            onChange={handleChange}
          />
          <div className="flex justify-between">
            <Button type="submit" className="w-1/2">
              Submit
            </Button>
            <Button type="button" onClick={handleBack} className="w-1/6 ml-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 hover:bg-gradient-to-l border border-gray-700 shadow-md transform hover:-translate-y-1 hover:shadow-lg">
              Back
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Submitted Information</h2>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Feedback:</strong> {formData.feedback}</p>
          <Button onClick={() => setSubmitted(false)} type="button" className="mt-4">
            Edit
          </Button>
        </div>
      )}
    </div>
  );
}