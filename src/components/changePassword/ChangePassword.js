import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { changePassword } from "../../services/authService";
import Card from "../card/Card";
import "./ChangePassword.scss";

const ChangePassword = () => {
  const navigate = useNavigate();
  const initialState = {
    oldPassword: "",
    password: "",
    password2: "",
  };

  const [formData, setFormData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const changePass = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      return toast.error("Password do not match");
    }

    const formData = { oldPassword, password };

    const data = await changePassword(formData);
    if (data) {
      navigate("/profile");
      toast.success(data);
    }
  };

  return (
    <div className="change-password">
      <Card cardClass="password-card">
 
        <form onSubmit={changePass} className="--form-control">
        <div className="passwords-inputs">
          <input
            type="password"
            placeholder="current password"
            required
            name="oldPassword"
            value={oldPassword}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="new password"
            required
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="confirm new password"
            required
            name="password2"
            value={password2}
            onChange={handleInputChange}
          />
          </div>
          <button type="submit" className="--btn --btn-primary change-pass-button">
            Change Password
          </button>
        </form>
      </Card>
    </div>
  );
};

export default ChangePassword;
