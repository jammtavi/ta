<?php
$secretKey = "6Lc4a_wqAAAAAIl3xhoBN220V8pgS6FNaoPxaDBk";
$response = $_POST['g-recaptcha-response'];

$verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secretKey}&response={$response}");
$result = json_decode($verify);

if ($result->success) {
    $username = htmlspecialchars($_POST['username']);
    $email = htmlspecialchars($_POST['email']);
    $password = $_POST['password'];
    echo "Signup successful for user: $username (dummy)";
} else {
    echo "CAPTCHA verification failed.";
}
?>
