<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include_once('functions.php');
$movie=null;
   if($pdo=connect())
	{
		$postdata=file_get_contents("php://input");//read book from request
        $request=json_decode($postdata);
	    $ps = $pdo->prepare("INSERT INTO movies(title,director,year,likefilm,dislikefilm) values ( :title,:director,:year,:likefilm,:dislikefilm)");  
	     $ps->execute(array("title" => $request->title ,
							   "director"=>$request->director,"year"=>$request->year,likefilm=>'0',dislikefilm=>'0')); 
	
	   $list=$pdo->query('SELECT * FROM movies WHERE id=LAST_INSERT_ID()');
	   while ($row=$list->fetch()) 
	   {    $movie['id']=$row['id'];
			$movie['dislikefilm']=$row['dislikefilm'];
			$movie['likefilm']=$row['likefilm'];
			$movie['title']=$row['title'];
			$movie['year']=$row['year'];
			$movie['director']=$row['director']; 
	   }		   
	}

  
	    echo json_encode($movie);

	






?>	



   

