<?php
header('Content-Type: application/json');
include 'db_connect.php'; // الاتصال بالداتابيز

// استقبال البيانات من الموقع
$email = $_POST['email'];
$password = $_POST['password'];

// 1. التحقق إن البيانات مش فاضية
if(empty($email) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit();
}

// 2. التحقق إن الإيميل مش مستخدم قبل كدة
$check = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($check);

if ($result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email already exists!"]);
} else {
    // 3. إضافة المستخدم الجديد
    $sql = "INSERT INTO users (email, password) VALUES ('$email', '$password')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Account created successfully!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error creating account"]);
    }
}
$conn->close();
?>