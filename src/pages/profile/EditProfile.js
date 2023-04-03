import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../../components/card/Card";
import ChangePassword from "../../components/changePassword/ChangePassword";
import Loader from "../../components/loader/Loader";
import { selectUser } from "../../redux/features/auth/authSlice";
import { updateUser } from "../../services/authService";
import "./Profile.scss";

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^[\d+-]*$/.test(value)) {
      // Ignore non-digit characters except + and -
      return;
    }
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleWheel = (event) => {
    event.target.blur();
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //.Handle image upload
      let imageURL;
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "radu-project");
        image.append("upload_preset", "ttezfuej");

        //.Save Image
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/radu-project/image/upload",
          { method: "post", body: image }
        );
        const imgData = await response.json();
        imageURL = imgData.url.toString();
      }
      //.Save Profile
      const formData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImage ? imageURL : profile.photo,
      };
      const data = await updateUser(formData);
      console.log(data);
      toast.success("User info updated successfully");
      navigate("/profile");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="profile --my2">
      {isLoading && <Loader />}

      <Card cardClass={"card --flex-direction-column"}>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data editing-data">
            <div>
              <span className="profile-photo-edit">
                <img src={user?.photo} alt="profile pic" />
              </span>
              <div className="change-photo">
                <input type="file" name="image" onChange={handleImageChange} />
              </div>
            </div>

            <div>
              <div className="two-inputs">
                <div>
                  <label>
                    <b>Name:</b> &nbsp;
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile?.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label>
                    <b>Phone:</b> &nbsp;
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={profile?.phone}
                    onChange={handleInputChange}
                    onWheel={handleWheel}
                    className="number-input"
                  />
                </div>
              </div>
              <div className="two-inputs">
                <div className="bio-email">
                  <label>
                    <b>Bio:</b> &nbsp;
                  </label>
                  <textarea
                    name="bio"
                    value={profile?.bio}
                    onChange={handleInputChange}
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
                <div>
                  <label>
                    <b>Email:</b> &nbsp;
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={profile?.email}
                    disabled
                  />
                  <br />
                  <code>Email cannot be changed</code>
                </div>
              </div>
            </div>
          </span>
          <div>
            <button className="--btn --btn-primary">Edit Profile</button>
          </div>
        </form>
      </Card>
      <br />
      <Card>
        <ChangePassword />
      </Card>
    </div>
  );
};

export default EditProfile;
