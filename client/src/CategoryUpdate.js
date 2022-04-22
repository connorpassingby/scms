import React, { useState, useEffect } from "react";

export default function CategoryUpdate() {
    const [name, setName] = useState("");
    const [id, setID] = useState(0);

    const urlCategories = "http://localhost:8080/api/categories/update";

    function handleUpdate() {
        console.log("Name: " + name);

        var payload = {
            id: id,
            name: name
        }

        fetch(urlCategories, 
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
                setName("");
                setID(0);
            })
            .catch((error) => {
            });
    }

    return (
        <div class="form-group w-50">
            <h1>Update Categories</h1>
            <div class="form-group row py-2">
                <label class="col-2 col-form-label">
                    ID: 
                </label>
                <div class="col-10">
                    <input
                        class="form-control"
                        value={id}
                        onChange= {(event)=>{setID(event.target.value)}}
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

            <div class="pt-4">
                <button
                    class="form-control btn-warning"
                    onClick={()=>{handleUpdate()}}
                >
                    Update Category
                </button>
            </div>
        </div>
    )
}