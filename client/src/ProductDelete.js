import React, { useState, useEffect } from "react";

export default function ProductDelete() {
    const [id, setId] = useState(0);

    const urlCategories = "http://localhost:8080/api/categories";
    const urlProducts = "http://localhost:8080/api/products";

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

        var payload = {
            id: id,
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
            })
            .catch((error) => {
            });
    }

    return (
        <div>
            <div class="form-group w-50">
                <h1>Delete Products</h1>
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
                

                <div class="pt-4">
                    <button
                        class="form-control btn-warning"
                        onClick={()=>{handleUpdate()}}
                    >
                        Delete Product
                    </button>
                </div>
            </div>
        </div>
    )
}