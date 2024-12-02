<?php
include "connection.php"; //database connection code.

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // SQL query to check if the provided username and password match a record in your database
    $stmt = $conn->prepare("SELECT * FROM clientaccounts WHERE Username = ? AND Pass = ?");
    $stmt->bindParam(1, $username);
    $stmt->bindParam(2, $password);
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
