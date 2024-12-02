<?php
include "connection.php"; //database connection code.

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Username = $_POST['Username'];
    $Password = $_POST['Password'];

    // SQL query to check if the provided username and password match a record in your database
    $stmt = $conn->prepare("SELECT * FROM adminaccounts WHERE username = ? AND pass = ?");
    $stmt->bindParam(1, $Username);
    $stmt->bindParam(2, $Password);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        // Authentication successful
        echo "success";
    } else {
        // Authentication failed
        echo "error";
    }
} else {
    // Handle GET requests or other actions as needed.
}
?>
