<?php
$conn = new mysqli("localhost", "root", null, "site");
if ($conn->connect_error) die($conn->connect_error);

$result = $conn->query("SELECT * FROM `scedule` INNER JOIN `teams` ON ID_team = teams.ID ORDER BY DayOfWeek, Time");
$array=[];

if($result){

    while ($row = $result->fetch_row()) {
        $array[] = $row;
    }

    // Формируем массив для JSON ответа
    $result = array(
      'info' => $array,
      'code' => 'ok'
    ); 

    // Переводим массив в JSON
    echo json_encode($result); 
  }else{

    $result = array(
      'code' => 'error',
      'info' => mysqli_error($conn)
    ); 
    echo json_encode($result); 
    
}