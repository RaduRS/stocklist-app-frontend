import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import forgotPasswordImg from "../../assets/forgot-password.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { forgotPassword, validateEmail } from "../../services/authService";
import { toast } from "react-toastify";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter an email");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
    };

    await forgotPassword(userData);
    setEmail("");
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <img
              className={styles.img}
              src={forgotPasswordImg}
              alt="login"
            ></img>
          </div>
          <h2>Forgot Password</h2>

          <form onSubmit={forgot}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              className={`--btn --btn-primary --btn-block ${styles.loginButton}`}
            >
              Get Reset Link
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

export default Forgot;
