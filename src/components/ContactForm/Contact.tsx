import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import FormField from "./FormField";
import Button from "./Button";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    feedback: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    feedback: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0); // State to track character count

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    if (name === "feedback") {
      setCharCount(value.length);
    }
  };
  
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;
    let newErrors = { name: "", email: "", phone: "", feedback: "" };

    // Validate Name
    const nameRegex = /^[a-zA-Z\s]+$/; // regular expression for alphabetic characters only
    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
      valid = false;
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = "Name can only contain alphabetic characters";
      valid = false;
    }

    // Validate Email
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      // regular expression for email
      newErrors.email = "Email address is invalid";
      valid = false;
    }

    // Validate Phone Number
    const phoneRegex = /^(?:\+?(\d{1,3}))?[-.\s]?(\d{2,4})[-.\s]?(\d{3,4})[-.\s]?(\d{4,9})$/;


 // regular expression for phone number
    if (formData.phone.trim() === "") {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
      valid = false;
    }

    // Validate Feedback
    if (formData.feedback.trim() === "") {
      newErrors.feedback = "Feedback is required";
      valid = false;
    } else if (formData.feedback.length > 300) {
      newErrors.feedback = "Feedback must be 300 characters or less";
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

  // function to reset the form fields. It clears all the fields and errors.
  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      feedback: "",
    });
    setErrors({
      name: "",
      email: "",
      phone: "",
      feedback: "",
    });
    setCharCount(0);
    setSubmitted(false);
  };
  return (
    <div className="max-w-xl mx-auto p-4 sm:p-8 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        Contact Us
      </h1>
      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6 bg-white p-4 sm:p-8 rounded-lg shadow-lg" noValidate
        >
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
          <p
            className={`text-sm ${
              charCount > 300 ? "text-red-500" : "text-gray-500"
            }`}
          >
            Character count: {charCount}/300
          </p>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Button type="submit" className="w-full sm:w-1/2">
              Submit
            </Button>
            <Button type="button" onClick={handleReset} className="w-1/6">
              Reset
            </Button>
            <Button
              type="button"
              onClick={handleBack}
              className="w-full sm:w-1/6"
            >
              Back
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4 bg-white p-4 sm:p-8 rounded-lg shadow-lg ">
          <h2 className="text-2xl font-bold mb-4">Submitted Information</h2>
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Phone:</strong> {formData.phone}
          </p>
          <p className="break-words whitespace-pre-wrap">
            <strong>Feedback:</strong> {formData.feedback}
          </p>
          <Button onClick={() => setSubmitted(false)} className="w-full mt-4">
            Edit
          </Button>
        </div>
      )}
    </div>
  );
}
