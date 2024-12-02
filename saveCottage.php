<?php

// CONNECTION LINK OF connection.php 
include "connection.php";

$cimage = $_POST['IImage'];
$cCotn = $_POST['CotName']; // <--- POST THE DATA TO EACH SPESIFIC COLUMNS;
$cPax = $_POST['Pax'];
$cCotT = $_POST['CotType'];
$cPrice = $_POST['Price'];


// THE SQL STATEMENT TO INSERT DATA TO MY SQL DATABASE
$stmt = $conn->prepare("INSERT INTO cottage_room_tb (IImage, CotName, Pax, CotType, Price) VALUES (?, ?, ?, ?, ?)");

$stmt->bindParam(1, $cimage, PDO::PARAM_LOB);
$stmt->bindParam(2, $cCotn);
$stmt->bindParam(3, $cPax);
$stmt->bindParam(4, $cCotT);
$stmt->bindParam(5, $cPrice);


// THE CONTENT OF NOTIFICATION THAT APPEAR IF THE STATEMENT IS PROPERLY EXEUTED WHEN A NEW DATA IS ADDED
if ($stmt->execute()) {
    echo "New Data Added";
} else {
    echo "Error";
}
?>