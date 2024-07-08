
import { useState } from 'react';
import { useRouter } from 'next/router';
import FormField from './FormField';
import  Button  from './Button';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    feedback: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    feedback: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;
    let newErrors = { name: '', email: '', phone: '', feedback: '' };

    // Validate Name
    if (formData.name.trim() === '') {
      newErrors.name = 'Name is required';
      valid = false;
    }

    // Validate Email
    if (formData.email.trim() === '') {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
      valid = false;
    }

    // Validate Phone Number
    const phoneRegex = /^(?:\+?(\d{1,3})[-.\s]?)?((\d{3,4})[-.\s]?(\d{2,3})[-.\s]?(\d{3,4})|\d{4,5}[-.\s]?\d{4,5})$/;
    if (formData.phone.trim() === '') {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
      valid = false;
    }

    // Validate Feedback
    if (formData.feedback.trim() === '') {
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
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-500 text-sm">* All fields are required</p>
          <FormField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          <FormField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <FormField
            label="Phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />
          <FormField
            label="Feedback"
            type="textarea"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            error={errors.feedback}
            required
          />
          <div className="flex justify-between">
            <Button type="submit" className="w-1/2">
              Submit
            </Button>
            <Button type="button" onClick={handleBack} className="w-1/6 ml-4">
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
          <Button onClick={() => setSubmitted(false)} className="mt-4">
            Edit
          </Button>
        </div>
      )}
    </div>
  );
}
