import React from "react";
import "./DisplayQuotes.scss";
import { v4 as uuidv4 } from "uuid";

function DisplayQuotes(props) {
    return (
        <div className='quotes' key={uuidv4()}>
            <h3 className='quotes__header'>
                Inpirational Quote to Keep Your Ass Motivated
            </h3>
           
        </div>
    );
}

export default DisplayQuotes;
