import React, { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import "./productList.scss";
import { MdEdit } from "react-icons/md";
import { IoIosEye } from "react-icons/io";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from "../../../redux/features/product/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteProduct,
  getProducts,
} from "../../../redux/features/product/productSlice";
import { Link, useNavigate } from "react-router-dom";

const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/product-details/${id}`);
  };

  //.Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };

  //.End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenText = text.substring(0, n).concat("...");
      return shortenText;
    }
    return text;
  };

  const delProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
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
  return (
    <div className="product-list">
      <div className="table inventory-table">
        <div className="--flex-between --flex-direction-column inventory-items-container">
          <span>
            <h3 className="inventory-items-text">Invertory Items</h3>
          </span>
          <span className="search-container">
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>
        {isLoading && <Loader />}
        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>-- No Products found, please add a product --</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id} onClick={() => handleRowClick(_id)}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 7)}</td>
                      <td>{shortenText(category, 8)}</td>

                      <td
                        className={
                          quantity === "0" || quantity === 0
                            ? "--color-danger"
                            : null
                        }
                      >
                        {quantity}
                      </td>
                      <td>
                        {"￡"}
                        {price}
                      </td>
                      <td>
                        {"￡"}
                        {quantity * price}
                      </td>
                      <td className="icons last-cell">
                        <span className="actions">
                          <Link
                            to={`/edit-product/${_id}`}
                            className="edit-button"
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="noselect edit-item"
                            >
                              <span className="text">Edit</span>
                              <span className="icon-button">
                                <MdEdit></MdEdit>
                              </span>
                            </button>
                          </Link>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              confirmDelete(_id);
                            }}
                            className="noselect delete-item"
                          >
                            <span className="text">Delete</span>
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
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default ProductList;
