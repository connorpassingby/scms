import React, { useState, useEffect } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

export default function ProductAdd() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0.00);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(false);

    const urlCategories = "http://localhost:8080/api/categories";
    const urlProducts = "http://localhost:8080/api/products";

    useEffect(() => {
        loadCategories();
        loadProduct();
    }, []); //function called only once

    var { id } = useParams();

    function loadProduct() {
        if(id) {
            fetch(`${urlProducts}/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setName(data.name);
                setPrice(data.price);
                setCategoryId(data.categoryId);
            })
            .catch((error) => {
            });
        }
    }

    function loadCategories() {
        fetch(urlCategories)
            .then(response => response.json())
            .then(data => {
                if (data.categories.length > 0 && !categoryId) {
                    setCategoryId(data.categories[0].id)
                }
                setCategories(data.categories);
            })
            .catch((error) => {
            });
    }

    function renderHeader() {
        if(id) {
            return(
                <h1>
                    Editing Product {id}
                </h1>
            )
        } else {
            return(
                <h1>
                    Add Products
                </h1>
            )
        }
    }

    function handleSave() {
        console.log("Id: " + id)
        console.log("Name: " + name);
        console.log("Price: " + price);
        console.log("CategoryId: " + categoryId);

        var payload = {
            id: id,
            name: name,
            price: price,
            categoryId: categoryId
        }

        fetch(urlProducts,
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
                setName("");
                setPrice(0.00);
            })
            .catch((error) => {
            });
    }

    function alertSuccess() {
        alert("Operation Successful!");

        navigate('/products');
    }

    return (
        <div>
            <div class="form-group w-50 p-3">
                {renderHeader()}

                <div class="form-group row py-2">
                    <label class="col-2 col-form-label">
                        Name:
                    </label>
                    <div class="col-10">
                        <input
                            class="form-control"
                            value={name}
                            onChange={(event) => { setName(event.target.value) }}
                        />
                    </div>

                </div>

                <div class="form-group row py-2">
                    <label class="col-sm-2 col-form-label">
                        Price:
                    </label>
                    <div class="col-sm-10">
                        <input
                            class="form-control"
                            value={price}
                            onChange={(event) => { setPrice(event.target.value) }}
                        />
                    </div>

                </div>

                <div class="form-group row py-2">
                    <label class="col-sm-2 col-form-label">
                        Category:
                    </label>
                    <div class="col-sm-10">
                        <select
                            class="form-control"
                            value={categoryId}
                            onChange={(event) => { setCategoryId(event.target.value) }}
                        >
                            {
                                categories.map((c) => {
                                    return (
                                        <option value={c.id}>
                                            {c.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                </div>

                <div class="pt-4 d-flex gap-3">
                    <button
                        class="form-control btn-warning"
                        onClick={() => { handleSave(); alertSuccess() }}
                    >
                        Save Product
                    </button>

                    <button
                        class="form-control btn-danger"
                        onClick={() => { navigate('/products') }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}