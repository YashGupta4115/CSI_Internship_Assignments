import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Test = () => {
    const [formValues, setFormValues] = useState({ firstName: '', lastName: '', username: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    // Refs for form inputs
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect(() => {
        validateForm(formValues);
    }, [formValues]);

    useEffect(() => {
        const handleAutofill = () => {
            setFormValues({
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                username: usernameRef.current.value,
                password: passwordRef.current.value,
            });
        };

        // Adding event listeners for the autofill event
        firstNameRef.current.addEventListener('change', handleAutofill);
        lastNameRef.current.addEventListener('change', handleAutofill);
        usernameRef.current.addEventListener('change', handleAutofill);
        passwordRef.current.addEventListener('change', handleAutofill);

        // Clean up event listeners on unmount
        return () => {
            firstNameRef.current.removeEventListener('change', handleAutofill);
            lastNameRef.current.removeEventListener('change', handleAutofill);
            usernameRef.current.removeEventListener('change', handleAutofill);
            passwordRef.current.removeEventListener('change', handleAutofill);
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const validateForm = (values) => {
        const errors = {};
        let isValid = true;

        if (!values.firstName.trim()) {
            errors.firstName = 'First Name is required';
            isValid = false;
        }
        if (!values.lastName.trim()) {
            errors.lastName = 'Last Name is required';
            isValid = false;
        }
        if (!values.username.trim()) {
            errors.username = 'Username is required';
            isValid = false;
        }
        if (!values.password.trim()) {
            errors.password = 'Password is required';
            isValid = false;
        }

        setErrors(errors);
        setIsFormValid(isValid);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            navigate('/landingPage', { state: { formData: formValues } });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    ref={firstNameRef}
                />
                {errors.firstName && <span>{errors.firstName}</span>}
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    ref={lastNameRef}
                />
                {errors.lastName && <span>{errors.lastName}</span>}
            </div>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formValues.username}
                    onChange={handleInputChange}
                    ref={usernameRef}
                />
                {errors.username && <span>{errors.username}</span>}
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleInputChange}
                    ref={passwordRef}
                />
                {errors.password && <span>{errors.password}</span>}
            </div>
            <button type="submit" disabled={!isFormValid}>Submit</button>
        </form>
    );
};

export default Test;
