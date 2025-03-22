import { auth, createUserWithEmailAndPassword } from "./firebase.js";

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirm = document.getElementById("signup-confirm").value;

  if (password !== confirm) {
    return alert("Passwords do not match!");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user to MongoDB
    await fetch("https://your-backend-api.com/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: user.uid, email: user.email })
    });

    alert("Signup successful!");
    window.location.href = "login.html";
  } catch (error) {
    alert(error.message);
  }
});
