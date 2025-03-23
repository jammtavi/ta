// auth.js

// LOGIN with Remember Me
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  const rememberMe = e.target.remember.checked;

  try {
    const persistence = rememberMe
      ? firebase.auth.Auth.Persistence.LOCAL
      : firebase.auth.Auth.Persistence.SESSION;

    await auth.setPersistence(persistence);
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

// LOGOUT
function logoutUser() {
  auth.signOut().then(() => {
    alert("Logged out!");
    window.location.href = "index.html";
  }).catch((error) => {
    alert("Logout error: " + error.message);
  });
}

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then((result) => {
      alert("Logged in as " + result.user.displayName);
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Google Login Failed: " + error.message);
    });
}
