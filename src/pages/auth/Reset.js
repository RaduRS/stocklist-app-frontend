import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import resetPasswordImg from "../../assets/password.png";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/authService";

const initialState = {
  password: "",
  password2: "",
};

const Reset = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;
  const { resetToken } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return toast.error("Passwords must be at least 6 characters");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      password,
      password2,
    };

    try {
      const data = await resetPassword(userData, resetToken);
      toast.success(data.message);
    } catch (error) {}
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card cardClass={styles.authCards}>
        <div className={styles.form}>
          <div className="--flex-center">
            <img
              className={styles.img}
              src={resetPasswordImg}
              alt="login"
            ></img>
          </div>
          <h2>Reset Password</h2>

          <form onSubmit={reset}>
            <input
              type="password"
              placeholder="New Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />

            <button
              type="submit"
              className={`--btn --btn-primary --btn-block ${styles.loginButton}`}
            >
              Reset Password
            </button>
            <div className={styles.links}>
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
