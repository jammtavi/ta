// auth.js

// LOGIN
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    await auth.signInWithEmailAndPassword(email, password);
    alert("Logged in successfully!");
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
});

// SIGNUP
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    await auth.createUserWithEmailAndPassword(email, password);
    alert("Account created successfully!");
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
});
