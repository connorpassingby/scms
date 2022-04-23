import React, { useState, useEffect } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

export default function OrderSave() {

    const navigate = useNavigate();

    // const [orders, setOrder] = useState({
    //     // fields
    //     // referenceNumber:"",
    //     // isFulfilled: false,
    //     // orderItems: [{
    //     // }]
    // });

    const [orderItems, setOrderItems] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState(false);
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState(false);
    const [isOrderFulfilled, setIsOrderFulfilled] = useState(false);

    const urlCustomers = "http://localhost:8080/api/customers";
    const urlProducts = "http://localhost:8080/api/products";
    const urlOrders = "http://localhost:8080/api/orders";

    useEffect(() => {
        loadCustomers();
        loadProducts();
        loadOrders();
    }, []); //function called only once

    var { id } = useParams();

    function loadOrders() {
        if(id) {
            fetch(`${urlOrders}/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCustomerId(data.customerId);
                setIsOrderFulfilled(data.isOrderFulfilled);
                setOrderItems(data.products);
            })
            .catch((error) => {
            });
        }
    }

    function loadCustomers() {
        fetch(urlCustomers)
            .then(response => response.json())
            .then(data => {
                if (data.customers.length > 0 && !customerId) {
                    setCustomerId(data.customers[0].id)
                }
                setCustomers(data.customers);
            })
            .catch((error) => {
            });
    }

    function loadProducts() {
        fetch(urlProducts)
            .then(response => response.json())
            .then(data => {
                if (data.products.length > 0 && !productId) {
                    setProductId(data.products[0].id)
                }
                setProducts(data.products);
            })
            .catch((error) => {
            });
    }

    function renderHeader() {
        if(id) {
            return(
                <h1>
                    Editing Order {id}
                </h1>
            )
        } else {
            return(
                <h1>
                    Adding Order
                </h1>
            )
        }
    }

    function handleSave() {
        console.log("ID: " + id);
        console.log("customerId: " + customerId);
        console.log("orderItems: " + orderItems);
        console.log("isOrderFulfilled" + isOrderFulfilled);

        var payload = {
            id:id,
            customerId: customerId,
            orderItems: orderItems,
            isOrderFulfilled: isOrderFulfilled
        }

        console.log(payload);

        fetch(urlOrders,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        )
            .then(response => response.json())
            .then(data => {
                console.log(response);
            })
            .catch((error) => {
            });
    }

    function handlePriceChanged(index, value) {
        orderItems[index].price = value;
        setOrderItems([...orderItems]);
    }

    function handleProductChanged(index, value) {
        orderItems[index].productId = value;
        setOrderItems([...orderItems]);
    }

    function handleQuantityChange(index, value) {
        orderItems[index].quantity = value;
        setOrderItems([...orderItems]);
    }

    function removeItem(index) {
        orderItems.splice(index, 1);

        for (var i = 0; i < orderItems.length; i++) {
            orderItems[i].index = i;
        }

        setOrderItems([...orderItems]);
    }

    function renderOrderItems() {
        if (orderItems.length == 0) {
            return (
                <div>
                    No items have been added to this order yet.
                </div>
            )
        } else {
            return (
                orderItems.map((o) => {
                    return (
                        <div className="form-group">
                            <div className="d-flex">
                                <h5>Item {o.index}</h5>

                                <div className="ms-auto">
                                    <button
                                        className="form-control btn-danger px-5"
                                        onClick={() => { removeItem(o.index) }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="form-group row py-1">
                                <label className="col-sm-2 col-form-label">
                                    Product:
                                </label>
                                <div className="col-sm-10">
                                    <select
                                        id="product_select"
                                        className="form-control"
                                        value={o.productId}
                                        onChange={(event) => {
                                            handleProductChanged(o.index, event.target.value)
                                        }}
                                    >
                                        {
                                            products.map((p) => {
                                                return (
                                                    <option value={p.id}>
                                                        {p.name + " (PHP" + p.price +")"}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row py-1 pb-3">
                                <label className="col-sm-2 col-form-label">
                                    Price:
                                </label>
                                <div className="col-sm-4">
                                    <input
                                        className="form-control"
                                        value={o.price}
                                        onChange={
                                            (event) => { handlePriceChanged(o.index, event.target.value) }
                                        }
                                    >
                                    </input>
                                </div>

                                <label className="col-sm-2 col-form-label">
                                    Quantity:
                                </label>
                                <div className="col-sm-4">
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={o.quantity}
                                        onChange={
                                            (event) => { handleQuantityChange(o.index, event.target.value) }
                                        }
                                    >
                                    </input>
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        }
    }

    function addOrderItem() {

        var index = orderItems.length - 1;

        if (orderItems.length == 0) {
            index = 0;
        } else {
            index = orderItems.length;
        }

        var orderItem = {
            productId: products[0].id,
            price: 0.00,
            quantity: 0,
            index: index
        };

        orderItems.push(orderItem);
        setOrderItems([...orderItems]);
    }

    function alertSuccess() {
        alert("Operation Successful!");

        navigate('/orders');
    }

    return (
        <div>
            <div className="form-group w-50 p-3">
                {renderHeader()}

                <div className="form-group row py-2">
                    <label className="col-sm-2 col-form-label">
                        Customer:
                    </label>
                    <div className="col-sm-10">
                        <select
                            className="form-control"
                            value={customerId}
                            onChange={(event) => { setCustomerId(event.target.value) }}
                        >
                            {
                                customers.map((c) => {
                                    return (
                                        <option value={c.id}>
                                            {c.lastname + ", " + c.firstname}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>

                <div className="form-group row py-2">
                    <label className="col-sm-4 col-form-label">
                        Is The Order Fulfilled?:
                    </label>
                    <div className="col-sm-8">
                        <div className="form-check">
                            <input
                                required
                                name="isOrderFulfilled"
                                className="form-check-input"
                                type="radio"
                                id="checkTrue"
                                value={true}
                                onChange={(event) => { setIsOrderFulfilled(event.target.value) }}
                            />
                            <label className="form-check-label" for="checkTrue">
                                True
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                name="isOrderFulfilled"
                                className="form-check-input"
                                type="radio"
                                id="checkFalse"
                                value={false}
                                onChange={(event) => { setIsOrderFulfilled(event.target.value) }}
                            />
                            <label className="form-check-label" for="checkFalse">
                                False
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    {renderOrderItems()}

                    <button
                        className="form-control btn-warning"
                        onClick={() => { addOrderItem() }}
                    >
                        Add Order Item
                    </button>
                </div>

                <div className="pt-4 d-flex gap-3">
                    <button
                        className="form-control btn-warning"
                        onClick={() => { handleSave(); alertSuccess() }}
                    >
                        Save Order
                    </button>

                    <button
                        className="form-control btn-danger"
                        onClick={() => { navigate('/orders'); }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}