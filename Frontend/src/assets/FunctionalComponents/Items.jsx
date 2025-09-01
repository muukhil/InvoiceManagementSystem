import React from "react";

const Item = ({ name, image, description, price }) => {
  const item = { name, image, description, price };

  return (
    <div className="item">
      <img src={image} alt={name} className="item_img" />
      <h3>{name}</h3>
      <p className="description">{description}</p>
      <p><strong>Price: </strong>Rs.{price}</p>
    </div>
  );
};

export default Item;
