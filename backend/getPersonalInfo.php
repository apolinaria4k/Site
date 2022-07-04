<?php
$conn = new mysqli("localhost", "root", null, "site");
if ($conn->connect_error) die($conn->connect_error);

$result = $conn->query("SELECT * FROM `personal`");
$array=[];


if($result){

    while ($row = $result->fetch_row()) {
        $array[] = $row;
    }

    $result = array(
      'info' => $array,
      'code' => 'ok'
    ); 

    echo json_encode($result); 
  }else{

    $result = array(
      'code' => 'error',
      'info' => mysqli_error($conn)
    ); 
    echo json_encode($result); 
    
  }

  