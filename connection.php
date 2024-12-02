<?php
//THIS IS THE PHP CODE THAT CONNECTS THE HTML AND JAVA SCRIPT FUNCTIONS INTO THE DATABASE
$servername = "localhost"; 
$username = "root";
$password = "";
// ABOVE IS THE PHP VARIABLES THAT TYPICALLY CONTAIN INFORMATION NECESSARY FOR CONNECTING TO A MYSQL DATABASE.


// TRY CATCH THAT SEE IF THE CONNECTION IS PROPERLY EXECUTED IF THE CONNECTION IS 
// SUCCESSFUL IT WILL CONNECT IT TO THE DATABASE IF NOT THEN IT WIIL SEND Connection failed: 
try{
    $conn = new PDO("mysql:host=$servername;port=3306;dbname=booking_db", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

}catch(PDOException $e){
    echo "Connection failed: ";
}




?>