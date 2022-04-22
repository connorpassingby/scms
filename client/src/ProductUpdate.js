import React, { useState, useEffect } from "react";

export default function ProductUpdate() {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0.00);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");

    const urlCategories = "http://localhost:8080/api/categories";
    const urlProducts = "http://localhost:8080/api/products/update";

    useEffect(() => {
        loadCategories();
    }, []); //function called only once

    function loadCategories() {
        fetch(urlCategories)
            .then(response => response.json())
            .then(data => {
                if(data.categories.length > 0) {
                    setCategoryId(data.categories[0].id)
                }
                setCategories(data.categories);
            })
            .catch((error) => {
            });
    }

    function handleUpdate() {
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
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(payload)
            }
        )
            .then(response => response.json())
            .then(data => {
                console.log(response);
                setId(0);
                setName("");
                setPrice(0.00);
            })
            .catch((error) => {
            });
    }

    return (
        <div>
            <div class="form-group w-50">
                <h1>Update Products</h1>
                <div class="form-group row py-2">
                    <label class="col-2 col-form-label">
                        ID: 
                    </label>
                    <div class="col-10">
                        <input 
                            class="form-control"
                            value={id}
                            onChange= {(event)=>{setId(event.target.value)}}
                        />
                    </div>
                    
                </div>
                
                <div class="form-group row py-2">
                    <label class="col-2 col-form-label">
                        Name: 
                    </label>
                    <div class="col-10">
                        <input 
                            class="form-control"
                            value={name}
                            onChange= {(event)=>{setName(event.target.value)}}
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
                            onChange= {(event)=>{setPrice(event.target.value)}}
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
                            onChange = {(event)=> {setCategoryId(event.target.value)}}
                        >
                            {
                                categories.map((c) => {
                                    return (
                                        <option value = {c.id}>
                                            {c.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    
                </div>

                <div class="pt-4">
                    <button
                        class="form-control btn-warning"
                        onClick={()=>{handleUpdate()}}
                    >
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    )
}