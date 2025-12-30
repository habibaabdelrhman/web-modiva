<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "modiva_db";

// إنشاء الاتصال
$conn = new mysqli($servername, $username, $password, $dbname);

// التأكد من عدم وجود أخطاء
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>