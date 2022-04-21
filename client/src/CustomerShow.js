import React, { useState, useEffect } from "react";
import {
    HashRouter as Router,
    Routes,
    Route,
    useNavigate
} from "react-router-dom";

import CustomerAdd from "./CustomerAdd";
import CustomerUpdate from "./CustomerUpdate";

export default function CustomerShow() {

    const navigate = useNavigate();

    //observable variable and function that updates variable
    const [customers, setCustomers] = useState([]); //empty array
    const urlCustomers = "http://localhost:8080/api/customers";

    useEffect(() => {
        loadCustomers()
    }, []); //function called only once

    function loadCustomers() {
        // Step 1: Call the urlProducts URL
        fetch(urlCustomers)
            .then(response => response.json())
            .then(data => {
                // Step 2: Given the json response, load it to products variable
                setCustomers(data.customers);
            })
            .catch((error) => {
            });
    }

    function renderCustomers() {
        if(customers.length > 0) {
            return(
                <div className="d-flex flex-wrap gap-3 cc-container">
                    {
                        customers.map((c) => {
                            return(
                                <div className="bg-light p-5 c-card d-flex flex-column">
                                    <div className="mb-4">
                                        <h2>{c.lastname + ", " + c.firstname}</h2>
                                        <h5>ID: {c.id}</h5>
                                        <h5>ADDRESS: {c.street + ", " + c.city + " " + c.zip}</h5>
                                        <h5>Phone Number: {c.phone}</h5>
                                    </div>
                                    <div className="mt-auto">
                                        <button 
                                            type="button" 
                                            className="w-100 btn btn-warning"
                                            onClick={() => {navigate('/categories/update');}}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className="bg-light c-card" >
                        <div onClick={()=>(navigate('/customers/add'))}className="btn h-100 w-100 d-flex align-items-center justify-content-center">
                            <div>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="82 " 
                                    height="82" 
                                    fill="currentColor" 
                                    className="bi bi-plus-circle-fill text-warning" viewBox="0 0 16 16"
                                >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                </svg>
                            </div>                            
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h3 className="mb-4 text-danger">
                        No Customers Found.
                    </h3>

                    <div className="d-flex flex-wrap gap-3 cc-container">
                        <div className="bg-light c-card" >
                            <div onClick={()=>(navigate('/customers/add'))} className="btn h-100 w-100 d-flex align-items-center justify-content-center">
                                <div>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="82 " 
                                        height="82" 
                                        fill="currentColor" 
                                        className="bi bi-plus-circle-fill text-warning" viewBox="0 0 16 16"
                                    >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                    </svg>
                                </div>                            
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return ( //returns a single element only; so you can nest all other elements inside one div
        <div className="p-3">
            <h1>
                Customer Records
            </h1>

            <hr/>

            {renderCustomers()}

        </div>
    )

}