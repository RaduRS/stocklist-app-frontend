import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductSummary.scss";
import { AiFillPoundCircle } from "react-icons/ai";
import InfoBox from "../../infoBox/InfoBox";
import {
  MdRemoveShoppingCart,
  MdShoppingCart,
} from "react-icons/md";
import { IoRefresh } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  CALC_CATEGORY,
  selectOutOfStock,
  selectTotalStoreValue,
  // selectCategory,
} from "../../../redux/features/product/productSlice";
import { WiDaySunny, WiCloud, WiCloudy, WiRain, WiSnow } from "react-icons/wi";

const earningsIcon = <AiFillPoundCircle size={20} />;
const productIcon = <MdShoppingCart size={20} />;
// const categoryIcon = <MdSpaceDashboard size={20} />;
const outOfStockIcon = <MdRemoveShoppingCart size={20} />;

export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({ products, onOutOfStockClick }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  // const category = useSelector(selectCategory);

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeatherIcon = (weather) => {
    if (!weather) return null;

    const condition = weather.toLowerCase();
    const iconSize = 40;

    if (condition.includes("clear")) {
      return <WiDaySunny size={iconSize} />;
    } else if (condition.includes("clouds")) {
      return <WiCloud size={iconSize} />;
    } else if (condition.includes("overcast")) {
      return <WiCloudy size={iconSize} />;
    } else if (condition.includes("rain")) {
      return <WiRain size={iconSize} />;
    } else if (condition.includes("snow")) {
      return <WiSnow size={iconSize} />;
    } else {
      return null;
    }
  };

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK(products));
    dispatch(CALC_CATEGORY(products));

    const loadWeatherData = async () => {
      try {
        const { latitude, longitude } = await getLocation();
        fetchWeather(latitude, longitude);
      } catch (error) {
        console.error("Error getting location:", error);

        // Fallback to a default location if user denies access
        if (error.code === error.PERMISSION_DENIED) {
          const defaultLatitude = 40.7128; // Default latitude (e.g., New York City)
          const defaultLongitude = -74.006; // Default longitude (e.g., New York City)
          fetchWeather(defaultLatitude, defaultLongitude);
        }
      }
    };

    loadWeatherData();
  }, [dispatch, products]);

  const getLocation = async () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  const fetchWeather = async (latitude, longitude) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/weather/current`,
        {
          params: {
            lat: latitude,
            lon: longitude,
          },
          withCredentials: true,
        }
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      const { latitude, longitude } = await getLocation();
      await fetchWeather(latitude, longitude);
    } catch (error) {
      console.error("Error getting location:", error);

      // Fallback to a default location if user denies access
      if (error.code === error.PERMISSION_DENIED) {
        const defaultLatitude = 40.7128; // Default latitude (e.g., New York City)
        const defaultLongitude = -74.006; // Default longitude (e.g., New York City)
        await fetchWeather(defaultLatitude, defaultLongitude);
      }
    }
  };

  const [checked, setChecked] = useState(false);

  const handleDivClick = (event) => {
    event.stopPropagation();
    handleCheckboxChange();
  };

  const handleCheckboxChange = (event) => {
    const newChecked = event ? event.target.checked : !checked;
    setChecked(newChecked);
    onOutOfStockClick(newChecked);
  };

  return (
    <div>
      <h3 className="inventory-stats">Inventory Stats</h3>
      <div className="product-summary-container">
        <div className="product-summary">
          <div className="info-summary">
            <InfoBox
              icon={productIcon}
              title={"Total Products"}
              count={products.length}
              cardClass="card1"
            />
            <InfoBox
              icon={earningsIcon}
              title={"Total Store Value"}
              count={`£ ${formatNumbers(totalStoreValue.toFixed(2))}`}
              cardClass="card2"
            />
            {/* <InfoBox
              icon={categoryIcon}
              title={"All Categories"}
              count={category.length}
              cardClass="card3"
            /> */}
            <InfoBox
              icon={outOfStockIcon}
              title={"Out of stock"}
              count={outOfStock}
              cardClass="card4"
              onClick={handleDivClick}
              checkboxProps={{
                checked: checked,
                onChange: handleCheckboxChange,
              }}
            />
            <div className="wheather">
              {weatherData && (
                <>
                  <p className="temp-location">
                    {weatherData.name}, {weatherData.sys.country}
                  </p>
                  <span className="icon-and-degrees">
                    {getWeatherIcon(weatherData.weather[0].main)}

                    <p className="main-temp">
                      {Math.floor(weatherData.main.temp)}
                      °C
                    </p>
                  </span>
                  <p className="temp-description">
                    {weatherData.weather[0].description}{" "}
                  </p>
                  <IoRefresh
                    size={20}
                    className={`refresh-icon ${loading ? "rotating" : ""}`}
                    onClick={handleRefresh}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSummary;
