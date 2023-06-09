<?php

require_once 'database.php';

if (isset($_POST["submit"])) {
    // Prepared statement for seat status retrieval
    $sql = "SELECT * FROM `seats` WHERE `Row` = ? AND `Seat_No` = ?;";
    $stmt = mysqli_stmt_init($conn);

    $sqlUpdate = "UPDATE `seats` SET `taken` = '1' WHERE `seats`.`Row` = ? AND `seats`.`Seat_No` = ?;";
    $stmtUpdate = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: matches.php?error=stmtfailed");
        exit();
    }

    if (!mysqli_stmt_prepare($stmtUpdate, $sqlUpdate)) {
        header("location: matches.php?error=stmtfailed");
        exit();
    }

    $row = $_POST["rows"];
    $seatNo = $_POST["seat"];

    mysqli_stmt_bind_param($stmt, "ii", $row, $seatNo);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($resultData)) {
        if ($row["taken"] === 0) {
            // Update seat after aquisition by user
            mysqli_stmt_bind_param($stmtUpdate, "ii", $row, $seatNo);
            mysqli_stmt_execute($stmtUpdate);

            header("location: matches.php?result=bought");
        } else {
            header("location: matches.php?result=error:seatTaken");
        }
    }

    mysqli_stmt_close($stmtUpdate);
    mysqli_stmt_close($stmt);
    exit();
} else {
    header("location: matches.php");
}