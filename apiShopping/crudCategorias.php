<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

// Conectarse a la base de datos 
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "shoppingSystem";

// Función para manejar la respuesta JSON
function jsonResponse($success, $message = '', $data = null)
{
    $response = ['success' => $success, 'message' => $message];
    if ($data !== null) {
        $response['data'] = $data;
    }
    echo json_encode($response);
    exit;
}

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Operaciones CRUD
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Obtener todas las categorías
        $stmt = $conn->query("SELECT * FROM Categories");
        $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
        jsonResponse(true, 'Categories retrieved successfully', $categories);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Añadir una nueva categoría
        $data = json_decode(file_get_contents("php://input"));
        $name = $data->name;
        $type = $data->type;

        $stmt = $conn->prepare("INSERT INTO Categories (name, type) VALUES (?, ?)");
        $stmt->execute([$name, $type]);
        jsonResponse(true, 'Category added successfully');
    } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        // Actualizar una categoría
        $data = json_decode(file_get_contents("php://input"));
        $category_ID = $data->category_ID;
        $name = $data->name;
        $type = $data->type;

        $stmt = $conn->prepare("UPDATE Categories SET name = ?, type = ? WHERE category_ID = ?");
        $stmt->execute([$name, $type, $category_ID]);
        jsonResponse(true, 'Category updated successfully');
    } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        // Borrar una categoría
        $data = json_decode(file_get_contents("php://input"));
        $category_ID = $data->category_ID;

        $stmt = $conn->prepare("DELETE FROM Categories WHERE category_ID = ?");
        $stmt->execute([$category_ID]);
        jsonResponse(true, 'Category deleted successfully');
    } else {
        jsonResponse(false, 'Invalid request method');
    }
} catch (PDOException $e) {
    jsonResponse(false, 'Error de la base de datos: ' . $e->getMessage());
}

$conn = null;
?>