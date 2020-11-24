<?php
include_once('functions.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

if($pdo=connect())
{
	
	$movies=[];
	$list=$pdo->query('select * from movies  ORDER BY(dislikefilm-likefilm)');
	$i=0;
		while($row=$list->fetch())
	{
			$movies[$i]['id']=$row['id'];
			$movies[$i]['dislikefilm']=$row['dislikefilm'];
			$movies[$i]['likefilm']=$row['likefilm'];
			$movies[$i]['title']=$row['title'];
			$movies[$i]['year']=$row['year'];
			$movies[$i]['director']=$row['director'];
			$i++;
	}


		echo json_encode($movies);
}

?>