<?php
include_once('functions.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$movies=null;
if($pdo=connect())
{
	$postdata=file_get_contents("php://input");
    $request=json_decode($postdata);
	$ps2 = $pdo->prepare("UPDATE movies SET dislikefilm=dislikefilm+1  WHERE id =:id "); 
	$ps2->execute(array("id"=>$request->id));
	
	$ps2 = $pdo->prepare("select * from movies WHERE id =:id ");  
	$ps2->execute(array("id"=>$request->id));
		while($row=$ps2->fetch())
	{
			$movies['id']=$row['id'];
			$movies['dislikefilm']=$row['dislikefilm'];
			$movies['likefilm']=$row['likefilm'];
			$movies['title']=$row['title'];
			$movies['year']=$row['year'];
			$movies['director']=$row['director'];
			
	}
	
}
echo json_encode($movies);
?>