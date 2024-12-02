<?php

// CONNECTION LINK OF connection.php 
include "connection.php";

$afname = $_POST['fname']; // <--- POST THE DATA TO EACH SPESIFIC COLUMNS;
$alname = $_POST['lname'];
$ausername = $_POST['username'];
$apass = $_POST['pass'];


// THE SQL STATEMENT TO INSERT DATA TO MY SQL DATABASE
$stmt = $conn->prepare("INSERT INTO adminaccounts(fname, lname, username, pass) VALUES (?, ?, ?, ?)");

$stmt->bindParam(1, $afname);
$stmt->bindParam(2, $alname);
$stmt->bindParam(3, $ausername);
$stmt->bindParam(4, $apass);


// THE CONTENT OF NOTIFICATION THAT APPEAR IF THE STATEMENT IS PROPERLY EXEUTED WHEN A NEW DATA IS ADDED
if ($stmt->execute()) {
    echo "New Record Added";
} else {
    echo "Error";
}
?>