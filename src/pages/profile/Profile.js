import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
import { getUser } from "../../services/authService";
import "./Profile.scss";
import SpinnerImage from "../../components/loader/Loader";

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      const data = await getUser();
      console.log(data);

      setProfile(data);
      setIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }

    getUserData();
  }, [dispatch]);

  return (
    <div className="profile --my2">
      {isLoading && <SpinnerImage />}
      <>
        {!isLoading && profile === null ? (
          <p>Something went wrong, please reload the page!</p>
        ) : (
          <Card cardClass={"card --flex-direction-column"}>

          <Card
          </Card>
        )}
      </>
    </div>
  );
};

export default Profile;
