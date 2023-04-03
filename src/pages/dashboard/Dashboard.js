import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/product/productList/ProductList";
import ProductSummary from "../../components/product/productSummary/ProductSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getProducts } from "../../redux/features/product/productSlice";

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const [showOutOfStock, setShowOutOfStock] = useState(false);

  const handleOutOfStockClick = () => {
    setShowOutOfStock(!showOutOfStock);
  };

  const outOfStockProducts = products.filter(
    (product) => product.quantity === "0" || product.quantity === 0
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProducts());
    }
  }, [isLoggedIn, isError, dispatch]);
  return (
    <div>
      <ProductSummary
        products={products}
        onOutOfStockClick={handleOutOfStockClick}
      />
      <ProductList
        products={showOutOfStock ? outOfStockProducts : products}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Dashboard;
