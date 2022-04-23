import React, { useState, useEffect } from "react";
import {
    HashRouter as Router,
    Routes,
    Route,
    useNavigate
} from "react-router-dom";

import Home from "./Home";

import CategoryShow from "./CategoryShow";
import CategorySave from "./CategorySave";

import ProductShow from "./ProductShow";
import ProductSave from "./ProductSave";

import CustomerShow from "./CustomerShow";
import CustomerSave from "./CustomerSave";

import OrderShow from "./OrderShow";
import OrderSave from "./OrderSave";

export default function MainApp() {
    
    const navigate = useNavigate();

    return (
        <div className="d-flex">
            <div className="cc-side-nav w-25 bg-light vh-100 p-3 position-block">
                {/* dont remove, this is here to push the rest of the body to the side */}
            </div>

            <div className="cc-side-nav w-25 bg-light vh-100 p-3 position-fixed">
                <h2 id="logo-title" onClick={()=>(navigate('/'))}>Simple Commerce Management System</h2>
                <hr></hr>
                <ul className="navbar-nav pl-5">
                    <li className="nav-item">
                        <a className="nav-link link-warning" onClick={()=>(navigate('/'))}>
                            Home
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link link-warning" onClick={()=>(navigate('/categories'))}>
                        Categories
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link link-warning" onClick={()=>(navigate('/products'))}>
                            Products
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link link-warning" onClick={()=>(navigate('/customers'))}>
                            Customer Records
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link link-warning" onClick={()=>(navigate('/orders'))}>
                            Order Records
                        </a>
                    </li>
                </ul>
            </div>
            
            <div className="flex-grow-1 w-75">
                <div>
                    {/* dont remove the adds from here even if theres adds in the shows,
                    for some reason it breaks if the adds dont exist here */}
                    <Routes>
                        <Route exact path ="/*" element={<Home/>}/>

                        <Route exact path ="/categories/*" element={<CategoryShow/>}/>
                        <Route exact path ="/categories/form" element={<CategorySave/>}/>
                        <Route exact path ="/categories/form/:id" element={<CategorySave/>}/>

                        <Route exact path ="/products/*" element={<ProductShow/>}/>
                        <Route exact path ="/products/form" element={<ProductSave/>}/>
                        {/* TODO */}
                        <Route exact path ="/products/form/:id" element={<ProductSave/>}/>

                        <Route exact path ="/customers/*" element={<CustomerShow/>}/>
                        <Route exact path ="/customers/add" element={<CustomerSave/>}/>
                        <Route exact path ="/customers/form/:id" element={<CustomerSave/>}/>

                        <Route exact path ="/orders/*" element={<OrderShow/>}/>
                        <Route exact path ="/orders/form" element={<OrderSave/>}/>
                        <Route exact path ="/orders/form/:id" element={<OrderSave/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )

}