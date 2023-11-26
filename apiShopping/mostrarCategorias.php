<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Conectarse a la base de datos 
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "shoppingSystem";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Realizar la consulta para obtener todas las categorías
    $stmt = $conn->query("SELECT * FROM Categories");
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'categories' => $categories]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error de la base de datos: ' . $e->getMessage()]);
}

$conn = null;
?>