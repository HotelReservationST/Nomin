<?php

include "connection.php"; //<--- LINK CONNECTION TO connection.php

// CONTAINS SQL STATEMENT SELECT ALL FROM tb_booking TO GET THE DATA IN THE DATA BASE 
$stmt = $conn->query("SELECT * FROM cottage_room_tb");
$cottages = $stmt->fetchAll((PDO::FETCH_ASSOC));
echo json_encode($cottages);

?>