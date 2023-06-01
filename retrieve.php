<?php
// Prepared statement for seat status retrieval
$sql = "SELECT * FROM `seats` WHERE `Row` = ? AND `Seat_No` = ?;";
$stmt = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt, $sql)) {
    echo "SQL statement failed";
} else {

}

if ($row = mysqli_fetch_assoc($result)) {
    echo $row['taken'];
}
?>