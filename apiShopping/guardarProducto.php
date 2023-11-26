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

    $nombre = $_POST['name'];
    $imagen = $_FILES['image'];
    $precio = $_POST['price'];
    $category_ID = $_POST['category_ID'];  // Asegúrate de recibir el category_ID correctamente


    // Obtener el nombre único para la imagen
    $imagenNombre = uniqid() . '_' . $imagen['name'];

    // Mover la imagen al directorio deseado
    $rutaDestino = 'C:/xampp/htdocs/apiShopping/images/' . $imagenNombre;
    move_uploaded_file($imagen['tmp_name'], $rutaDestino);

    // Realizar la inserción en la base de datos
    $imagenRutaCompleta = 'http://localhost/apiShopping/images/' . $imagenNombre;
    $stmt = $conn->prepare("INSERT INTO products (category_ID, name, image, price) VALUES (?,?, ?, ?)");
$stmt->execute([$category_ID, $nombre, $imagenRutaCompleta, $precio]);


    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error de la base de datos: ' . $e->getMessage()]);
}

$conn = null;
?>