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
    $stmt = $conn->query("SELECT user_ID, first_name, email, rol_user FROM users");
    $stmt->execute();

    // Obtener todos los usuarios
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'users' => $usuarios]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error de la base de datos: ' . $e->getMessage()]);
}

// Cerrar la conexión
$conn = null;
?>