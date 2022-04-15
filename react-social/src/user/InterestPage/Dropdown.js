import React from "react";
import './Dropdown.css'
import { useState } from "react";
import Select from 'react-select';
function Dropdown(props) {    

    const data =[
        {
            value: 1,
            label: "INTJ"
        },
        {
            value: 2,
            label: "INTP"
        },
        {
            value: 3,
            label: "ENTJ"
        },
        {
            value: 4,
            label: "ENTP"
        },
        {
            value: 5,
            label: "INFJ"
        },
        {
            value: 6,
            label: "INFP"
        },
        {
            value: 7,
            label: "ENFJ"
        },
        {
            value: 8,
            label: "ENFP"
        },
        {
            value: 9,
            label: "ISTJ"
        },
        {
            value: 10,
            label: "ISFJ"
        },
        {
            value: 11,
            label: "ESTJ"
        },
        {
            value: 12,
            label: "ESFJ"
        },
        {
            value: 13,
            label: "ISTP"
        },
        {
            value: 14,
            label: "ISFP"
        },
        {
            value: 15,
            label: "ESTP"
        },
        {
            value: 16,
            label: "ESFP"
        }
    
    ];

    const [ selectedValue, setSelectedValue] = useState(null);
    const handleChange = obj => {
        setSelectedValue(obj);
        props.setState({personalityType: JSON.stringify(obj)});
        
    }



    return(
        <div className="down">
         What personality traights best desccribes you? <br/>
        <Select 
        value={selectedValue}
        onChange={handleChange}
        options={data}
        />

        <br/>
        </div>
    )
    
}
export default Dropdown;