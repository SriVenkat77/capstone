import React, { useState } from "react";
import { TextField, Button } from "@mui/material";


import { useDispatch, useSelector } from "react-redux";

import { createIngredientCategory } from "../../State/Admin/Ingredients/Action";

const CreateIngredientCategoryForm = ({ handleClose }) => {
  
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [formData, setFormData] = useState({
    name: "",
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
    });
    const data = {
      name: formData.name,
      restaurantId: restaurant.usersRestaurant._id,
    };
    dispatch(createIngredientCategory({ data, jwt: auth.jwt || jwt }));
    handleClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className=" ">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Ingredient Category
        </h1>
        <form className="space-y-5" onSubmit={handleFormSubmit}>
          <TextField
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientCategoryForm;