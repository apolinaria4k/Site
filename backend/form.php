<?php
$conn = new mysqli("localhost", "root", null, "site"); 
if ($conn->connect_error) die($conn->connect_error);
if (isset($_POST["name"]) && isset($_POST['surname']) && isset($_POST["phone"]) && isset($_POST['email'])) { 
  
  $result = $conn->query("INSERT INTO `sitedata` (`Name`, `Surname`, `Phone`, `Email`)
  VALUES ('{$_POST['name']}', '{$_POST['surname']}', '{$_POST['phone']}', '{$_POST['email']}')");

  if($result){
    // Формируем массив для JSON ответа
    $result = array(
      'name' => $_POST["name"],
      'phone' => $_POST["phone"],
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
}
?>