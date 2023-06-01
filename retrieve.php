<?php

require_once 'database.php';

if (isset($_POST["submit"])) {
    // Prepared statement for seat status retrieval
    $sql = "SELECT * FROM `seats` WHERE `Row` = ? AND `Seat_No` = ?;";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: matches.html?error=stmtfailed");
        exit();
    }

    $row = $_POST["rows"];
    $seatNo = $_POST["seat"];

    mysqli_stmt_bind_param($stmt, "ii", $row, $seatNo);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($resultData)) {
        if ($row["taken"] === 0) {
            header("location: matches.html?result=bought");
        } else {
            header("location: matches.html?result=error:seatTaken");
        }
    }

    mysqli_stmt_close($stmt);
    exit();
} else {
    header("location: matches.html");
}