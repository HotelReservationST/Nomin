<?php
include "connection.php"; //<--- LINK CONNECTION TO connection.php

$booking_id = $_POST['booking_id'];
$bfname = $_POST['f_name']; // <--- POST THE DATA TO EACH SPESIFIC COLUMNS;
$blname = $_POST['l_name'];
$btime = $_POST['ttime'];
$bdate = $_POST['ddate'];
$bmaxnoguest = $_POST['maxnoguest'];
$bcontactno = $_POST['contactno'];
$baccommodation = $_POST['accommodation'];

// UPDATES THE RECORD IN THE DATA BASE IT USES THE UPDATE SQL STATEMENT
$stmt = $conn->prepare("UPDATE tb_booking SET f_name=?, l_name=?, ttime=?, ddate=?, maxnoguest=?, contactno=?, accommodation=?  WHERE id=?");
$stmt->bindParam(1, $bfname);
$stmt->bindParam(2, $blname);
$stmt->bindParam(3, $btime);
$stmt->bindParam(4, $bdate);
$stmt->bindParam(5, $bmaxnoguest);
$stmt->bindParam(6, $bcontactno);
$stmt->bindParam(7, $baccommodation);
$stmt->bindParam(8, $booking_id);

// THE CONTENT OF NOTIFICATION THAT APPEAR IF THE STATEMENT IS PROPERLY EXEUTED WHEN A NEW DATA IS UPDATED
if ($stmt->execute()) {
    echo "Record Updated";
} else {
    echo "Error!";
}

?>


