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

// SHOW/HIDE RESET FORM
function showResetForm() {
  document.querySelector("form").style.display = "none";
  document.getElementById("reset-password-form").style.display = "block";
}

function hideResetForm() {
  document.querySelector("form").style.display = "block";
  document.getElementById("reset-password-form").style.display = "none";
}

// SEND RESET LINK
function sendResetLink() {
  const email = document.getElementById("reset-email").value;
  if (!email) return alert("Please enter your email.");

  auth.sendPasswordResetEmail(email)
    .then(() => {
      alert("Reset link sent! Check your inbox.");
      hideResetForm();
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}
