<?php
header("Access-Control-Allow-Origin: *");
// Permite solicitudes con los métodos GET, POST, PUT, etc.
header("Access-Control-Allow-Methods: *");
// Permite incluir encabezados en las solicitudes
header("Access-Control-Allow-Headers: *");
// Obtén los datos del cuerpo de la solicitud
$data = json_decode(file_get_contents("php://input"));

// Conectarse a la base de datos 
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "shoppingSystem";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // Establecer el modo de error de PDO a excepción
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Realizar la consulta para verificar la autenticación
    $stmt = $conn->prepare("SELECT user_ID, first_name, email, rol_user FROM users WHERE email = ? AND last_name = ?");
$stmt->execute([$data->email, $data->password]);

// Obtener el resultado
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    // Autenticación exitosa
    echo json_encode(['success' => true, 'email' => $user['email'], 'rol' => $user['rol_user']]);
} else {
    // Credenciales incorrectas
    echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas']);
}
} catch (PDOException $e) {
    // Manejar errores de la base de datos
    echo json_encode(['success' => false, 'message' => 'Error de la base de datos: ' . $e->getMessage()]);
}

// Cerrar la conexión
$conn = null;

?>