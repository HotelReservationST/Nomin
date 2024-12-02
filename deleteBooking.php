<?php 
include "connection.php"; //<--- LINK CONNECTION TO connection.php

$studID = $_POST['booking_id']; //<--- CLASSIFY ROW IS TO BE DELETED

// USES THE DELETE SQL STATEMENT TO DELETE THE DATA IN THE DATABASE 
$stmt = $conn->prepare("DELETE FROM tb_booking WHERE id = ?");
$stmt->bindParam(1, $studID);

// THE CONTENT OF NOTIFICATION THAT APPEAR IF THE STATEMENT IS PROPERLY EXEUTED WHEN A NEW DATA IS DELETED
if ($stmt->execute()) {
    echo "Booking Canceled!";
} else {
    echo "Error!";
}




?>