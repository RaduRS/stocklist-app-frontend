import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import "./ProductForm.scss";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
  setProduct,
}) => {
  const handleWheel = (event) => {
    event.target.blur();
  };

  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Product Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            {imagePreview !== null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <p>No image set for this product</p>
            )}
          </Card>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />

          <label>Category</label>
          <input
            type="text"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          />

          <div className="price-and-quantity">
            <span>
              <label>Price</label>
              <input
                type="text"
                name="price"
                value={product?.price}
                onChange={handleInputChange}
                onWheel={handleWheel}
                className="number-input"
              />
            </span>
            <span>
              <label>Quantity</label>
              <input
                type="text"
                name="quantity"
                value={product?.quantity}
                onChange={handleInputChange}
                onWheel={handleWheel}
                className="number-input"
              />
            </span>
          </div>

          <label>Description</label>
          <ReactQuill
            theme="snow"
            value={description || ""}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />
          <div className="save-button">
            <button type="submit" className="button --btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }],
    [{ background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "align",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default ProductForm;
