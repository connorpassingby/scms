import React, { useState, useEffect } from "react";

export default function CategoryDelete() {
    const [id, setID] = useState(0);

    const urlCategories = "http://localhost:8080/api/categories/delete";

    function handleUpdate() {

        var payload = {
            id: id,
           
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
                setID("");
            })
            .catch((error) => {
            });
    }

    return (
        <div class="form-group w-50">
            <h1>Delete Categories</h1>
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
                    Delete Category
                </button>
            </div>
        </div>
    )
}