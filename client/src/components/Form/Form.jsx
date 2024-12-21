// components/Form.js
import React, { useState } from "react";
import './style.css'
const Form = ({ fields, onSubmit }) => {
  const [formValues, setFormValues] = useState(() =>
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !formValues[field.name]) {
        newErrors[field.name] = `${field.label || field.name} is required`;
      } else if (field.validate && !field.validate(formValues[field.name])) {
        newErrors[field.name] = field.errorMessage || "Invalid value";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formValues);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="form-group">
          <label htmlFor={field.name}>{field.label || field.name}</label>
          <input
            type={field.type || "text"}
            id={field.name}
            name={field.name}
            value={formValues[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
          />
          {errors[field.name] && (
            <span className="error">{errors[field.name]}</span>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
