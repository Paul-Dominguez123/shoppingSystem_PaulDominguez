<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

// Conectarse a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "shoppingSystem";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Realizar la consulta para obtener todos los productos
    $stmt = $conn->query("SELECT product_ID, name, image, price FROM products");
    $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'products' => $productos]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error de la base de datos: ' . $e->getMessage()]);
}

$conn = null;
?>