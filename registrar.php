<?php
if (isset($_POST)) {
    $codigo = $_POST['codigo'];
    $producto = $_POST['Nombre'];
    $precio = $_POST['Apellido'];
    $cantidad = $_POST['Estado'];
    require("conexion.php");
    if (empty($_POST['idp'])){
        $query = $pdo->prepare("INSERT INTO productos (codigo, Nombre, Apellido, Estado) VALUES (:cod, :Nom, :Ape, :est)");
        $query->bindParam(":cod", $codigo);
        $query->bindParam(":Nom", $Nombre);
        $query->bindParam(":Apere", $Apellido);
        $query->bindParam(":Est", $Estado);
        $query->execute();
        $pdo = null;
        echo "ok";
    }else{
        $id = $_POST['idp'];
        $query = $pdo->prepare("UPDATE Nombre SET codigo = :cod, Nombre = :Nom, Apellido =:Ape, Estado = :est WHERE id = :id");
        $query->bindParam(":cod", $codigo);
        $query->bindParam(":Nom", $Nombre);
        $query->bindParam(":Apere", $Apellido);
        $query->bindParam(":Est", $Estado);
        $query->bindParam("id", $id);
        $query->execute();
        $pdo = null;
        echo "modificado";
    }
    
}
