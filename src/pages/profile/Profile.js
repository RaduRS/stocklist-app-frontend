import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
import { getUser } from "../../services/authService";
import "./Profile.scss";
import SpinnerImage from "../../components/loader/Loader";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { MdDescription, MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      const data = await getUser();
      setProfile(data);
      setIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }

    getUserData();
  }, [dispatch]);

  return (
    <div className="profile">
      {isLoading && <SpinnerImage />}
      <>
        {!isLoading && profile === null ? (
          <p>Something went wrong, please reload the page!</p>
        ) : (
          <div>
            <div className="profile-background"></div>
            <Card cardClass={"card --flex-direction-column profile-card"}>
              <span className="profile-photo">
                <img src={profile?.photo} alt="profile pic" className="profile-image"/>
              </span>
              <span className="profile-data">
                <div className="profile-container">
                  <p style={{ alignSelf: "center" }}>
                    <b>{profile?.name}</b>
                  </p>
                  <p>
                    <MdEmail size={25}></MdEmail>
                    {profile?.email}
                  </p>

                  <p>
                    <BsFillTelephoneFill size={25}></BsFillTelephoneFill>
                    {profile?.phone}
                  </p>

                  <p>
                    <MdDescription size={25}></MdDescription>
                    {profile?.bio}
                  </p>

                  <div>
                    <Link to="/edit-profile">
                      <button className="--btn --btn-primary edit-profile-button">
                        Edit Profile
                      </button>
                    </Link>
                  </div>
                </div>
              </span>
            </Card>
          </div>
        )}
      </>
    </div>
  );
};

export default Profile;
