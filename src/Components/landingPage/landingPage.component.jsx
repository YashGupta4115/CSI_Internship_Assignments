import { useLocation } from "react-router-dom";
import './landingPage.styles.css';
import { useState } from "react";

const LandingPage = () => {

    const location = useLocation();
    const { formData } = location.state || { formData: {} };

    const [newValues] = useState(formData);

    const excludeFields = ['password'];

    // Filter out the fields to exclude
    const filteredValues = Object.entries(newValues).filter(
        ([key, value]) => !excludeFields.includes(key)
    );

    return (
        <div className="descripition-container">
            <div className="greeting-container">
                <span className="heythere">Hey there!</span>
                <span className="username">{formData.username}</span>
            </div>
            <div className="greeting-2-container">
                <span>ThankYou for Signing Up</span>
                <span>Here's what we recieved !</span>
            </div>
            <div className="user-info-container">
                {filteredValues.map(([key, value]) => (
                    <span key={key} className="user-info">
                        <span className="user-info-title">
                            {key}
                        </span>
                        <span className="user-data">
                            {value}
                        </span>

                    </span>


                ))}
            </div>

        </div>

    )
}

export default LandingPage;