import React, { useState, forwardRef } from 'react';
import './dropDown.styles.css';
import { MdArrowDropDown } from "react-icons/md";
import { IoMdArrowDropup } from "react-icons/io";


const DropDown = forwardRef(({ menuList, DropDownTitle, onSelect }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const dropDownhandler = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const handleOptionClicked = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    return (
        <div className="DropDown-container">
            <button className='dropDownButton' onClick={dropDownhandler} ref={ref}>
                {selectedOption || DropDownTitle}{isOpen ? <IoMdArrowDropup /> : <MdArrowDropDown />}
            </button>
            {
                isOpen && (
                    <div className="dropDown-content">
                        {menuList.map((option, index) => (
                            <div
                                key={index}
                                className='dropDown-item'
                                onClick={() => handleOptionClicked(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
});

export default DropDown;
