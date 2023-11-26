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

    // Operación de actualización
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $data = json_decode(file_get_contents("php://input"));

        $user_ID = $data->user_ID;
        $first_name = $data->first_name;
        $last_name = $data->last_name;
        $email = $data->email;
        $address = $data->address;
        $rol_user = $data->rol_user;

        $stmt = $conn->prepare("UPDATE users SET first_name = ?, last_name = ?, email = ?, address = ?, rol_user = ? WHERE user_ID = ?");
        $stmt->execute([$first_name, $last_name, $email, $address, $rol_user, $user_ID]);

        jsonResponse(true, 'Usuario actualizado correctamente');
    } else {
        jsonResponse(false, 'Método de solicitud no válido');
    }
} catch (PDOException $e) {
    jsonResponse(false, 'Error de la base de datos: ' . $e->getMessage());
}

$conn = null;
?>