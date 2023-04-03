import dashboard from "../assets/dashboard.png";
import product from "../assets/add-package.png";
import account from "../assets/user.png";
import contact from "../assets/message.png";
import { AiOutlineDashboard } from "react-icons/ai";

const menu = [
  {
    title: "Dashboard",
    icon: dashboard,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: product,
    path: "/add-product",
  },
  {
    title: "Account",
    icon: account,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Contact us",
    icon: contact,
    path: "/contact-us",
  },
];

export default menu;
