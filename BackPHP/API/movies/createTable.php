<?php
include_once('functions.php');

if($conn=connect())
{
	
$table='create table movies(
id int not null auto_increment primary key,
dislikefilm int,
director varchar(50) not null,
year varchar(50) not null,
title varchar(50) not null,
likefilm int
) default charset="utf8"';

try
{
$conn->exec($table);
  echo "Table Galeries  created successfully";
 
}catch(PDOException $e) {
  echo $sql . "<br>" . $e->getMessage();
}
}
?>