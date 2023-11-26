<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "shoppingSystem";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Recibir datos del formulario
    $data = json_decode(file_get_contents("php://input"), true);

    // Insertar datos en la tabla User
    $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, address, rol_user) VALUES (:first_name, :last_name, :email, :address, :rol_user)");
    $stmt->bindParam(':first_name', $data['first_name']);
    $stmt->bindParam(':last_name', $data['last_name']);
    $stmt->bindParam(':email', $data['email']);
    $stmt->bindParam(':address', $data['address']);
    $stmt->bindParam(':rol_user', $data['rol_user']);
    $stmt->execute();

    echo json_encode(array('message' => 'Usuario agregado correctamente'));
} catch (PDOException $e) {
    echo json_encode(array('error' => 'Error: ' . $e->getMessage()));
}

$conn = null;
?>