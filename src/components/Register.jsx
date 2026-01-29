import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      );
      // Create Firestore user doc
      await setDoc(doc(db, "users", cred.user.uid), {
        email: form.email,
        name: form.name,
        address: form.address,
        createdAt: new Date().toISOString(),
      });
      alert("Registered!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Register;
