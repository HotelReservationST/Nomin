<?php

// CONNECTION LINK OF connection.php 
include "connection.php";

$cFname = $_POST['Fname']; // <--- POST THE DATA TO EACH SPESIFIC COLUMNS;
$cLname = $_POST['Lname'];
$cUsername = $_POST['Username'];
$cPass = $_POST['Pass'];


// THE SQL STATEMENT TO INSERT DATA TO MY SQL DATABASE
$stmt = $conn->prepare("INSERT INTO clientaccounts(Fname, Lname, Username, Pass) VALUES (?, ?, ?, ?)");

$stmt->bindParam(1, $cFname);
$stmt->bindParam(2, $cLname);
$stmt->bindParam(3, $cUsername);
$stmt->bindParam(4, $cPass);


// THE CONTENT OF NOTIFICATION THAT APPEAR IF THE STATEMENT IS PROPERLY EXEUTED WHEN A NEW DATA IS ADDED
if ($stmt->execute()) {
    echo "You Are Now Registered";
} else {
    echo "Error";
}
?>