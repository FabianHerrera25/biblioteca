<?php
// URL de la API
$url = 'http:///api/endpoint';

// Inicializar la sesión cURL
$ch = curl_init($url);

// Establecer opciones
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Devuelve la respuesta en lugar de imprimirla
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Authorization: Bearer tu_token', // Si es necesario autenticarse con un token
    'Content-Type: application/json' // Si la API requiere un tipo de contenido específico
));

// Ejecutar la solicitud y obtener la respuesta
$response = curl_exec($ch);

// Verificar si hubo errores en la solicitud
if(curl_errno($ch)){
    echo 'Error: ' . curl_error($ch);
}

// Cerrar la sesión cURL
curl_close($ch);

// Procesar la respuesta
if ($response) {
    $data = json_decode($response, true); // Decodificar la respuesta JSON en un array asociativo

    // Hacer algo con los datos obtenidos
    var_dump($data);
}
?>