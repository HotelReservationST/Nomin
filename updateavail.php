<?php

// CONNECTION LINK OF connection.php 
include "connection.php";

$cAvail = $_POST['Avalability'];


// THE SQL STATEMENT TO INSERT DATA TO MY SQL DATABASE
$stmt = $conn->prepare("UPDATE cottage_room_tb SET Avalability=? WHERE id=?");

$stmt->bindParam(1,$cAvail);


// THE CONTENT OF NOTIFICATION THAT APPEAR IF THE STATEMENT IS PROPERLY EXEUTED WHEN A NEW DATA IS ADDED
if ($stmt->execute()) {
    echo "New Data Added";
} else {
    echo "Error";
}
?>