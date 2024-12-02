<?php

// CONNECTION LINK OF connection.php 
include "connection.php";

$cottage_id = $_POST['cottage_id'];
$cCotn = $_POST['CotName']; // <--- POST THE DATA TO EACH SPESIFIC COLUMNS;
$cPax = $_POST['Pax'];
$cCotT = $_POST['CotType'];
$cPrice = $_POST['Price'];
$cAvail = $_POST['Avalability'];


// THE SQL STATEMENT TO INSERT DATA TO MY SQL DATABASE
$stmt = $conn->prepare("UPDATE cottage_room_tb SET CotName=?, Pax=?, CotType=?, Price=?, Avalability=? WHERE id=?");

$stmt->bindParam(1, $cCotn);
$stmt->bindParam(2, $cPax);
$stmt->bindParam(3, $cCotT);
$stmt->bindParam(4, $cPrice);
$stmt->bindParam(5,$cAvail);
$stmt->bindParam(6, $cottage_id);


// THE CONTENT OF NOTIFICATION THAT APPEAR IF THE STATEMENT IS PROPERLY EXEUTED WHEN A NEW DATA IS ADDED
if ($stmt->execute()) {
    echo "New Data Added";
} else {
    echo "Error";
}
?>