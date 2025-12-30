<?php
header('Content-Type: application/json');
include 'db_connect.php';

$email = $_POST['email'];
$password = $_POST['password'];

// البحث عن المستخدم بالإيميل والباسورد
$sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode(["status" => "success", "message" => "Login successful!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
}
$conn->close();
?>