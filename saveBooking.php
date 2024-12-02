<?php

// CONNECTION LINK OF connection.php 
include "connection.php";

$bfname = $_POST['f_name']; // <--- POST THE DATA TO EACH SPESIFIC COLUMNS;
$blname = $_POST['l_name'];
$btime = $_POST['ttime'];
$bdate = $_POST['ddate'];
$bmaxnoguest = $_POST['maxnoguest'];
$bcontactno = $_POST['contactno'];
$baccommodation = $_POST['accommodation'];

// THE SQL STATEMENT TO INSERT DATA TO MY SQL DATABASE
$stmt = $conn->prepare("INSERT INTO tb_booking(f_name, l_name, ttime, ddate, maxnoguest, contactno, accommodation) VALUES (?, ?, ?, ?, ?, ?,?)");

$stmt->bindParam(1, $bfname);
$stmt->bindParam(2, $blname);
$stmt->bindParam(3, $btime);
$stmt->bindParam(4, $bdate);
$stmt->bindParam(5, $bmaxnoguest);
$stmt->bindParam(6, $bcontactno);
$stmt->bindParam(7, $baccommodation);


// THE CONTENT OF NOTIFICATION THAT APPEAR IF THE STATEMENT IS PROPERLY EXEUTED WHEN A NEW DATA IS ADDED
if ($stmt->execute()) {
    echo "New Record Added";
} else {
    echo "Error";
}
?>