import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  updateProfile,
  changePassword,
} from "../api/authApi";

import "../styles/ProfilePage.css";

function Profile() {

  const navigate = useNavigate();

  const storedUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [name, setName] = useState(
    storedUser?.name || ""
  );

  const [mobile, setMobile] = useState(
    storedUser?.mobile || ""
  );

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [savingProfile, setSavingProfile] =
    useState(false);

  const [changingPassword, setChangingPassword] =
    useState(false);

  // =============================
  // SAVE PROFILE
  // =============================

  const handleSaveProfile = async () => {

    try {

      setSavingProfile(true);

      const updatedUser =
        await updateProfile({

          name,

          mobile,

        });

      localStorage.setItem(

        "user",

        JSON.stringify(updatedUser)

      );

      alert("Profile updated successfully.");

    }

    catch (err) {

      alert(

        err.response?.data?.message ||

        "Unable to update profile."

      );

    }

    finally {

      setSavingProfile(false);

    }

  };

  // =============================
  // CHANGE PASSWORD
  // =============================

  const handleChangePassword =
    async () => {

      if (
        !currentPassword ||
        !newPassword ||
        !confirmPassword
      ) {

        return alert(
          "Please fill all password fields."
        );

      }

      if (
        newPassword !== confirmPassword
      ) {

        return alert(
          "Passwords do not match."
        );

      }

      if (
        newPassword.length < 6
      ) {

        return alert(
          "Password must be at least 6 characters."
        );

      }

      try {

        setChangingPassword(true);

        await changePassword({

          currentPassword,

          newPassword,

        });

        alert(
          "Password changed successfully."
        );

        setCurrentPassword("");

        setNewPassword("");

        setConfirmPassword("");

      }

      catch (err) {

        alert(

          err.response?.data?.message ||

          "Unable to change password."

        );

      }

      finally {

        setChangingPassword(false);

      }

    };

  // =============================
  // LOGOUT
  // =============================

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <div className="account-page">

      <div className="account-card">

        <div className="account-avatar">

          {(name || "U")
            .charAt(0)
            .toUpperCase()}

        </div>

        <h2>{name}</h2>

        <p>{storedUser?.email}</p>

        {/* Personal Information */}

        <div className="account-section">

          <h3>

            Personal Information

          </h3>

          <label>

            Full Name

          </label>

          <input

            value={name}

            onChange={(e) =>
              setName(e.target.value)
            }

          />

          <label>

            Email Address

          </label>

          <input

            value={storedUser?.email}

            disabled

          />

          <label>

            Mobile Number

          </label>

          <input

            value={mobile}

            placeholder="9876543210"

            onChange={(e) =>
              setMobile(e.target.value)
            }

          />

          <button

            className="save-btn"

            onClick={handleSaveProfile}

            disabled={savingProfile}

          >

            {savingProfile
              ? "Saving..."
              : "Save Changes"}

          </button>

        </div>
                {/* Change Password */}

        <div className="account-section">

          <h3>

            Change Password

          </h3>

          <label>

            Current Password

          </label>

          <input

            type="password"

            placeholder="Enter current password"

            value={currentPassword}

            onChange={(e) =>
              setCurrentPassword(
                e.target.value
              )
            }

          />

          <label>

            New Password

          </label>

          <input

            type="password"

            placeholder="Enter new password"

            value={newPassword}

            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }

          />

          <label>

            Confirm Password

          </label>

          <input

            type="password"

            placeholder="Confirm new password"

            value={confirmPassword}

            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }

          />

          <button

            className="password-btn"

            onClick={handleChangePassword}

            disabled={changingPassword}

          >

            {changingPassword

              ? "Updating..."

              : "Change Password"}

          </button>

        </div>

        {/* Logout */}

        <button

          className="logout-btn"

          onClick={logout}

        >

          Logout

        </button>

      </div>

    </div>

  );

}

export default Profile;