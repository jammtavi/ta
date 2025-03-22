<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $recaptcha_secret = "6Ld2ZvwqAAAAAGEdLwLf3Cnjxc2AkE9jrZ5ljDON";
    $recaptcha_response = $_POST['g-recaptcha-response'];

    $response = file_get_contents(
        "https://www.google.com/recaptcha/api/siteverify?secret={$recaptcha_secret}&response={$recaptcha_response}"
    );
    $result = json_decode($response);

    if ($result->success) {
        // ✅ Passed CAPTCHA - Proceed with signup logic
        $username = htmlspecialchars($_POST['username']);
        $email = htmlspecialchars($_POST['email']);
        $password = $_POST['password'];
        
        echo "Signup successful for user: $username (dummy response)";
    } else {
        echo "CAPTCHA verification failed.";
    }
}
?>
