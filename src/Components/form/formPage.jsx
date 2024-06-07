import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import DropDown from "../dropDown/dropDown.component";
import './formPage.styles.css';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const FormAndFormValidation = () => {

    const [formValues, setFormValues] = useState(
        {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            phNumber: '',
            country: '',
            city: '',
            panNumber: '',
            aadharNumber: '',
        }
    );
    //handling autofill issues as useState does not catch changes made by autofill.

    const refss = {
        firstName: useRef(null),
        lastName: useRef(null),
        username: useRef(null),
        email: useRef(null),
        password: useRef(null),
        phNumber: useRef(null),
        country: useRef(null),
        city: useRef(null),
        panNumber: useRef(null),
        aadharNumber: useRef(null),
    };

    useEffect(() => {
        validateForm(formValues);
    }, [formValues]);

    useEffect(() => {
        const handleAutofill = () => {
            setFormValues({
                firstName: refss.firstName.current?.value || '',
                lastName: refss.lastName.current?.value || '',
                username: refss.username.current?.value || '',
                email: refss.email.current?.value || '',
                password: refss.password.current?.value || '',
                phNumber: refss.phNumber.current?.value || '',
                country: refss.country.current?.innerText || '',  // Update: Use innerText for dropdown
                city: refss.city.current?.innerText || '',  // Update: Use innerText for dropdown
                panNumber: refss.panNumber.current?.value || '',
                aadharNumber: refss.aadharNumber.current?.value || '',
            });
        };
        Object.values(refss).forEach(ref => {
            ref.current?.addEventListener('change', handleAutofill);
        });

        console.log(refss);

        return () => {
            Object.values(refss).forEach(ref => {
                ref.current?.removeEventListener('change', handleAutofill);
            });
        };
    }, []);


    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const [passwordHidden, setPasswordHidden] = useState(true);

    const handlePasswordType = (e) => {
        e.preventDefault();
        const inType = document.getElementById('password');
        if (inType.type === "password") {
            inType.type = "text";
            setPasswordHidden(false);
        } else {
            inType.type = "password";
            setPasswordHidden(true);
        }

    }

    const checkLengthOfInput = (defaultLength, userInput) => {
        if (userInput && userInput.length === defaultLength) return true;
        else return false;
    }

    const navigate = useNavigate();
    const onNavigateHandler = () => navigate('/landingPage', { state: { formData: { ...formValues } } });

    const requireAst = '*';
    const [isFormValid, setIsFormValid] = useState();

    const validateForm = (values) => {
        let isValid = true;

        if (!values.firstName.trim()) {
            isValid = false;
        }
        if (!values.lastName.trim()) {
            isValid = false;
        }
        if (!values.username.trim()) {
            isValid = false;
        }
        if (!values.email.trim()) {
            isValid = false;
        }
        if (!isValidEmail(values.email)) {
            isValid = false;
        }
        if (!values.password.trim()) {
            isValid = false;
        }
        if (!values.phNumber.trim()) {
            isValid = false;
        }
        if (!checkLengthOfInput(10, formValues.phNumber)) {
            isValid = false;
        }
        if (!values.country.trim()) {
            isValid = false;
        }
        if (!values.city.trim()) {
            isValid = false;
        }
        if (!values.panNumber.trim()) {
            isValid = false;
        }
        if (!checkLengthOfInput(10, formValues.panNumber)) {
            isValid = false;
        }
        if (!values.aadharNumber.trim()) {
            isValid = false;
        }
        if (!checkLengthOfInput(12, formValues.aadharNumber)) {
            isValid = false;
        }

        setIsFormValid(isValid);
    };

    const handleSubmit = () => {
        if (isFormValid)
            onNavigateHandler();
    }

    const countryList = ['India', 'Malaysia', 'China', 'Sri-Lanka'];
    const cityList = ['Delhi', 'Jamshedpur', 'Bangalore', 'Odisha'];
    const phoneList = ['+91', '+92', '+93', '+94'];

    const handleCity = (city) => {
        formValues.city = city;
    }
    const handlePhone = (phone) => {
        formValues.phNumber = phone;
    }
    const handleCountry = (country) => {
        formValues.country = country;
    }

    return (
        <div className="formSection">
            <div className="welcome-container">
                <span className="welcome-msg1">WELCOME!</span>
                <span className="welcome-msg2">Let's Get You In</span>
            </div>
            <fieldset>
                <legend>Sign Up Form {`(`} {<span style={{ color: 'red' }}>*</span>}{` marked is required to fill)`}</legend>
                <form>
                    <div className="first_last_name_input form-indi-containers">
                        <div className="firstnameInput-container">
                            <label>First Name :</label>
                            <input
                                className="form-inputs"
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formValues.firstName}
                                onChange={handleInputChange}
                                ref={refss.firstName}
                                required
                            />
                            <span className="requireAst">{requireAst}</span>
                        </div>
                        <div className="lastnameInput-container form-indi-containers">
                            Last Name :
                            <input
                                className="form-inputs"
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formValues.lastName}
                                onChange={handleInputChange}
                                ref={refss.lastName}
                            />
                            <span className="requireAst">{requireAst}</span>
                        </div>

                    </div>

                    <div className="username-input-container form-indi-containers">
                        Username :
                        <input
                            className="form-inputs"
                            type="text"
                            name="username"
                            placeholder="set Username"
                            value={formValues.username}
                            onChange={handleInputChange}
                            ref={refss.username}
                            required
                        /><span className="requireAst">*</span>
                    </div>

                    <div className="email-input-container form-indi-containers">
                        E-Mail :
                        <input
                            className="form-inputs"
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            value={formValues.email}
                            onChange={handleInputChange}
                            ref={refss.email}
                            required
                        /><span className="requireAst">*</span>
                        {
                            formValues.email && (
                                <span className="NA-state">
                                    {isValidEmail(formValues.email) ? '' : 'Email not valid!'}
                                </span>
                            )
                        }
                    </div>

                    <div className="password-input-container form-indi-containers">
                        Password :
                        <input
                            className="form-inputs"
                            id='password'
                            type="password"
                            name="password"
                            placeholder="password"
                            value={formValues.password}
                            onChange={handleInputChange}
                            ref={refss.password}
                            required
                        /><span className="requireAst">*</span>
                        <button className="password-button" onClick={handlePasswordType}>
                            {passwordHidden ? `Show Password` : `Hide Password`}
                        </button>
                    </div>

                    <div className="phnum-input-container form-indi-containers">
                        Phone Number :
                        <DropDown menuList={phoneList} DropDownTitle={'+91'} onSelect={handlePhone} />
                        <input
                            className="form-inputs"
                            type="number"
                            name="phNumber"
                            placeholder="Phone Number"
                            value={formValues.phNumber}
                            onChange={handleInputChange}
                            ref={refss.phNumber}
                        /><span className="requireAst">*</span>
                        {
                            formValues.phNumber && (
                                <span className="NA-state">
                                    {checkLengthOfInput(10, formValues.phNumber) ? '' : 'enter valid number'}
                                </span>
                            )
                        }
                    </div>

                    <div className="country-city-container form-indi-containers">
                        <div className="country-container">
                            Country: <DropDown ref={refss.country} className="form-inputs" menuList={countryList} DropDownTitle={'Country'} onSelect={handleCountry} />
                            <span className="requireAst">{requireAst}</span>
                        </div>
                        <div className="city-container">
                            City: <DropDown ref={refss.city} className="form-inputs" menuList={cityList} DropDownTitle={'City'} onSelect={handleCity} />
                            <span className="requireAst">{requireAst}</span>
                        </div>
                    </div>

                    <div className="pan-number-container form-indi-containers">
                        Pan Card Number :
                        <input
                            className="form-inputs "
                            type="text"
                            name="panNumber"
                            value={formValues.panNumber}
                            placeholder="Pan Number"
                            onChange={handleInputChange}
                            ref={refss.panNumber}
                        />
                        <span className="requireAst">{requireAst}</span>
                        {
                            formValues.panNumber && (
                                <span className="NA-state">
                                    {checkLengthOfInput(10, formValues.panNumber) ? '' : 'enter valid pan number'}
                                </span>
                            )
                        }
                    </div>

                    <div className="aadhar-number-container form-indi-containers">
                        Aadhar Card Number :
                        <input
                            className="form-inputs"
                            type="text"
                            name="aadharNumber"
                            placeholder="Aadhar number"
                            value={formValues.aadharNumber}
                            ref={refss.aadharNumber}
                            onChange={handleInputChange}
                        />
                        <span className="requireAst">{requireAst}</span>
                        {
                            formValues.aadharNumber && (
                                <span className="NA-state">
                                    {checkLengthOfInput(12, formValues.aadharNumber) ? '' : 'enter valid number'}
                                </span>
                            )
                        }
                    </div>

                    <button type="submit" onClick={handleSubmit} disabled={!isFormValid}>Submit</button>
                </form>
            </fieldset>
        </div>
    )
}

export default FormAndFormValidation;




