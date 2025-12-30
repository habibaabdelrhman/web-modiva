<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

include 'db_connect.php'; // بننادي على ملف الاتصال

$sql = "SELECT * FROM products"; // هات كل المنتجات
$result = $conn->query($sql);

$products = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

echo json_encode($products); // حولهم لـ JSON وابعته للموقع
$conn->close();
?>