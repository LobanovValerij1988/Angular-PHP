<?php
include_once('functions.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$answer=null;
if($pdo=connect())
{
	$postdata=file_get_contents("php://input");//read book from request
    $request=json_decode($postdata);
	
	
	
	$ps2 = $pdo->prepare("DELETE FROM movies WHERE id =:id ");  
	$ps2->execute(array("id"=>$request->id));
	$answer=$request->id;


}
echo json_encode($answer);
?>