<?php
include "connection.php"; //<--- LINK CONNECTION TO connection.php

$account_id = $_POST['account_id'];
$afname = $_POST['fname']; // <--- POST THE DATA TO EACH SPESIFIC COLUMNS;
$alname = $_POST['lname'];
$ausername = $_POST['username'];
$apass = $_POST['pass'];


// UPDATES THE RECORD IN THE DATA BASE IT USES THE UPDATE SQL STATEMENT
$stmt = $conn->prepare("UPDATE adminaccounts SET fname=?, lname=?, username=?, pass=? WHERE id=?");
$stmt->bindParam(1, $afname);
$stmt->bindParam(2, $alname);
$stmt->bindParam(3, $ausername);
$stmt->bindParam(4, $apass);
$stmt->bindParam(5, $account_id);


// THE CONTENT OF NOTIFICATION THAT APPEAR IF THE STATEMENT IS PROPERLY EXEUTED WHEN A NEW DATA IS UPDATED
if ($stmt->execute()) {
    echo "Record Updated";
} else {
    echo "Error!";
}

?>


