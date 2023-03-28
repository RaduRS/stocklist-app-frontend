import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import {
  deleteProduct,
  getProduct,
} from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import Loader from "../../loader/Loader";
import "./ProductDetails.scss";
import DOMPurify from "dompurify";
import { confirmAlert } from "react-confirm-alert";

const ProductDetails = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    } else {
      return <span className="--color-danger">Out of Stock</span>;
    }
  };

  const delProduct = async (id) => {
    await dispatch(deleteProduct(id));
    navigate("/dashboard");
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product?",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProduct(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch, id]);

  return (
    <div className="product-detail">
      <h3 className="--mt">Product Details</h3>
      <Card cardClass="card">
        {isLoading && <Loader />}
        {product && (
          <div className="detail">
            <Card cardClass="group image-preview ">
              {product?.image ? (
                <img
                  src={product.image.filePath}
                  alt={product.image.fileName}
                />
              ) : (
                <p>No image set for this product</p>
              )}
            </Card>

            <h4 className="parent-badge">
              <span className="badge">Name:</span>&nbsp;{product.name}
            </h4>

            <table className="product-table">
              <thead>
                <tr>
                  <th className="product-table-header">Attribute</th>
                  <th className="product-table-header">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="product-table-data attr">
                    Product Availability:
                  </td>
                  <td className="product-table-data">
                    {stockStatus(product.quantity)}
                  </td>
                </tr>
                <tr>
                  <td className="product-table-data attr">SKU</td>
                  <td className="product-table-data">{product.sku}</td>
                </tr>
                <tr>
                  <td className="product-table-data attr">Category</td>
                  <td className="product-table-data">{product.category}</td>
                </tr>
                <tr>
                  <td className="product-table-data attr">Quantity</td>
                  <td className="product-table-data">{product.quantity}</td>
                </tr>
                <tr>
                  <td className="product-table-data attr">Price</td>
                  <td className="product-table-data">￡{product.price}</td>
                </tr>
                <tr>
                  <td className="product-table-data attr">Total Value</td>
                  <td className="product-table-data">
                    ￡{product.quantity * product.price}
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="product-table">
              <thead>
                <tr>
                  <th
                    colSpan={2}
                    className="product-table-header description-header"
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="2" className="product-table-data attr">
                    <div className="description-container">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(product.description),
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <code className="--color-dark">
                {(() => {
                  const date = new Date(product.createdAt);
                  const formattedDate = `${date.getFullYear()}-${String(
                    date.getMonth() + 1
                  ).padStart(2, "0")}-${String(date.getDate()).padStart(
                    2,
                    "0"
                  )} | Time: ${String(date.getHours()).padStart(
                    2,
                    "0"
                  )}:${String(date.getMinutes()).padStart(2, "0")}:${String(
                    date.getSeconds()
                  ).padStart(2, "0")}`;
                  return `Created on: ${formattedDate}`;
                })()}
              </code>
              <br />
              <code className="--color-dark">
                {(() => {
                  const date = new Date(product.updatedAt);
                  const formattedDate = `${date.getFullYear()}-${String(
                    date.getMonth() + 1
                  ).padStart(2, "0")}-${String(date.getDate()).padStart(
                    2,
                    "0"
                  )} | Time: ${String(date.getHours()).padStart(
                    2,
                    "0"
                  )}:${String(date.getMinutes()).padStart(2, "0")}:${String(
                    date.getSeconds()
                  ).padStart(2, "0")}`;
                  return `Last Update: ${formattedDate}`;
                })()}
              </code>
            </div>

            <button
              onClick={(e) => {
                confirmDelete(id);
              }}
              className="noselect"
            >
              <span className="text">Delete Product</span>
              <span className="icon-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                </svg>
              </span>
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetails;
