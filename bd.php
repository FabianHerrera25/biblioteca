<?php
$servername = "localhost";
$username = "";
$password = "";
$database = "Bliblioteca";

// Crear una conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta de ejemplo
$sql = "SELECT * FROM tabla_ejemplo";
$result = $conn->query($sql);

// Verificar si la consulta retorna resultados
if ($result->num_rows > 0) {
    // Procesar los datos de los resultados
    while ($row = $result->fetch_assoc()) {
        echo "Campo1: " . $row["campo1"] . " - Campo2: " . $row["campo2"] . "<br>";
    }
} else {
    echo "No se encontraron resultados.";
}

// Cerrar la conexión
$conn->close();
?>