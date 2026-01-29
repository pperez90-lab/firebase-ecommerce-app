import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ name: "", address: "", email: "" });
  const [loading, setLoading] = useState(true);

  // Load profile data from Firestore when the user is logged in
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProfile(snap.data());
      } else {
        // Fallback: at least show email from auth if no doc yet
        setProfile((p) => ({ ...p, email: user.email }));
      }

      setLoading(false);
    };

    loadProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    const ref = doc(db, "users", user.uid);
    await updateDoc(ref, {
      name: profile.name,
      address: profile.address,
    });

    alert("Profile updated");
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete your account and all your data?",
    );
    if (!confirmed) return;

    const ref = doc(db, "users", user.uid);
    await deleteDoc(ref); // delete Firestore user document
    await deleteUser(user); // delete Firebase Auth user
  };

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      <form onSubmit={handleUpdate} className="profile-form">
        <label>
          Name
          <input
            name="name"
            value={profile.name || ""}
            onChange={handleChange}
            placeholder="Your name"
          />
        </label>

        <label>
          Address
          <input
            name="address"
            value={profile.address || ""}
            onChange={handleChange}
            placeholder="Your address"
          />
        </label>

        <p>Email: {profile.email || user.email}</p>

        <button type="submit">Save</button>
      </form>

      <button
        type="button"
        onClick={handleDeleteAccount}
        style={{ marginTop: "1rem", color: "red" }}
      >
        Delete Account
      </button>
    </div>
  );
};

export default Profile;
