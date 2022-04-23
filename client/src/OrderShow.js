import React, { useState, useEffect } from "react";
import {
    useNavigate
} from "react-router-dom";

export default function OrderShow() {

    const navigate = useNavigate();

    //observable variable and function that updates variable
    const [orders, setOrders] = useState([]); //empty array
    const [customers, setCustomers] = useState([]); //empty array

    const urlOrders = "http://localhost:8080/api/orders";
    const urlCustomers = "http://localhost:8080/api/customers";

    useEffect(() => {
        loadOrders();
        loadCustomers()
    }, []); //function called only once

    function loadOrders() {
        // Step 1: Call the urlProducts URL
        fetch(urlOrders)
            .then(response => response.json())
            .then(data => {
                // Step 2: Given the json response, load it to products variable
                setOrders(data.orders);
            })
            .catch((error) => {
            });
    }

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

    function handleDeleteOrder(id) {

        var deleteUrl = `http://localhost:8080/api/orders/${id}/delete`;

        if (confirm("Danger Zone! Do you wish to delete this entry?\r\n\r\nNote: Deletion may fail if order has existing products. Please first remove the products under this order.") == true) {
            fetch(deleteUrl)
                .then(response => response.json())
                .then(data => {
                    loadProducts();
                })
                .catch((error) => {
                });
        }
    }

    function getOrderStatus(o) {
        var status_int = o.isOrderFulfilled;
        if (status_int == 1) {
            return "✅";
        } else {
            return "❌";
        }
    }

    function renderOrders() {
        if (orders.length > 0) {
            return (
                <div className="d-flex flex-wrap gap-3 cc-container">
                    {
                        orders.map((o) => {
                            return (
                                <div className="bg-light p-5 c-card d-flex flex-column">
                                    <div className="mb-4">
                                        <h2>Order #{o.id}</h2>
                                        <h5><b>Customer:</b> {o.customer}</h5>
                                        <h5><b>Order Status</b>: {getOrderStatus(o)}</h5>
                                        <h5>
                                            <b>Products: </b>
                                            <ul>
                                                {
                                                    o.products.map((op) => {
                                                        return (
                                                            <li>{" (" + op.quantity + "x) " + op.product}</li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </h5>
                                    </div>

                                    <div className="mt-auto d-flex gap-2">
                                        <button
                                            type="button"
                                            className="w-100 btn btn-warning"
                                            onClick={() => { navigate(`/orders/form/${o.id}`); }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="form-control btn-danger"
                                            onClick={() => { handleDeleteOrder(o.id) }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className="bg-light c-card" >
                        <div onClick={() => (navigate('/orders/form'))} className="btn h-100 w-100 d-flex align-items-center justify-content-center">
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="82 "
                                    height="82"
                                    fill="currentColor"
                                    className="bi bi-plus-circle-fill text-warning" viewBox="0 0 16 16"
                                >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
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
                        No Orders Found.
                    </h3>

                    <div className="d-flex flex-wrap gap-3 cc-container">
                        <div className="bg-light c-card" >
                            <div onClick={() => (navigate('/orders/form'))} className="btn h-100 w-100 d-flex align-items-center justify-content-center">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="82 "
                                        height="82"
                                        fill="currentColor"
                                        className="bi bi-plus-circle-fill text-warning" viewBox="0 0 16 16"
                                    >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
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
                Order Record
            </h1>

            <hr />

            {renderOrders()}
        </div>
    )

}