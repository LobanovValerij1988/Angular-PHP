import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {ApiService} from '../api.service';
import {Movie} from '../movie';
import {​​ map }​​ from 'rxjs/operators';
import { NgForm} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
movies:Movie[];
CreatedMovie:Movie={id:null,title:null,director:null,year:null,likefilm:null,dislikefilm:null};
constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    
   this.apiService.readMovies().subscribe((movies:Movie[])=>
  {this.movies=movies;
    console.log(this.movies);
  }
  ,error=>
   {console.log("Error", error);});
  
    
  }
  createMovie(form){
     if(form.value )
     {
      document.getElementById("addFilm").setAttribute("disabled", "true");
       this.apiService.createMovie(this.CreatedMovie).subscribe((movie:Movie)=>
      
        {
          
         if(movie)
       {    let tr=document.createElement("tr");
            tr.id= "row"+movie.id.toString();
            let id = document.createElement("td");
            id.textContent=movie.id.toString();
            let ditector  = document.createElement("td");
            ditector.textContent=movie.director.toString();
            let title  = document.createElement("td");
            title.textContent=movie.title.toString();
            let year  = document.createElement("td");
            year.textContent=movie.year.toString();
            let like  = document.createElement("td");
            like.textContent=movie.likefilm.toString();
            like.id="like"+movie.id.toString();
            let dislike  = document.createElement("td");
            dislike.textContent=movie.dislikefilm.toString();
            dislike.id='dislike'+movie.id.toString();
            let ButtonLike  = document.createElement("input");
            ButtonLike.type="button";
            ButtonLike.name=movie.id.toString();
            ButtonLike.addEventListener("click",this.AddLike.bind(this));
            ButtonLike.value="Like";
            ButtonLike.className="btn btn-primary";
            let ButtonDelete= document.createElement("input");
            ButtonDelete.type="button";
            ButtonDelete.name=movie.id.toString();
            ButtonDelete.addEventListener("click",this.DeleteMovie.bind(this));
            ButtonDelete.value="Delete";
            ButtonDelete.className="btn btn-danger";
            let ButtonDislike= document.createElement("input");
            ButtonDislike.type="button";
            ButtonDislike.name=movie.id.toString();
            ButtonDislike.addEventListener("click",this.AddDislike.bind(this));
            ButtonDislike.value="Dislike";
            ButtonDislike.className="btn btn-warning";
            tr.appendChild(id);
            tr.appendChild(ditector);
            tr.appendChild(title);
            tr.appendChild(year);
            tr.appendChild(like);
            tr.appendChild(dislike);
            let tdButtonLike = document.createElement("td");
            tdButtonLike.appendChild(ButtonLike);
            tr.appendChild(tdButtonLike);
            let tdButtonDislike = document.createElement("td");
            tdButtonDislike.appendChild(ButtonDislike);
            tr.appendChild(tdButtonDislike);
            let tdButtonDelete = document.createElement("td");
            tdButtonDelete.appendChild(ButtonDelete);
            tr.appendChild( tdButtonDelete);
            document.getElementById("listofBooks").appendChild(tr);
            console.log("Movie created, ",movie);
            document.getElementById("addFilm").removeAttribute("disabled");
          
        }
      },error=>
        {
          document.getElementById("addFilm").removeAttribute("disabled");
          console.log("Error",error);})
     }
  }


  allMovies$:Observable<Movie[]>;
  DeleteMovie(ev)
  {
     
     var movie :Movie=new Movie();
     movie.id=ev.target.name;
     ev.target.disabled = true;
    

    this.apiService.deleteMovie(movie).subscribe((answer:number)=>
    {
            console.log("answer"+answer);
            document.getElementById("row"+answer).remove();
    
    },error=>
      
      {
        ev.target.disabled = false;
        console.log("Error",error);
     
    })
  }
  AddLike(ev)
  {
    var movie :Movie=new Movie();
    ev.target.disabled = true;
     movie.id=ev.target.name;
    console.log(movie);
    this.apiService.addlike(movie).subscribe((film:Movie)=>
    {   
      console.log(film);
      document.getElementById("like"+film.id).textContent=film.likefilm.toString();
      ev.target.disabled = false;
    },error=>
      
      {
        ev.target.disabled = false;
        console.log("Error",error);
    
    })
    
  }
  AddDislike(ev)
  {
    var movie :Movie=new Movie();
    ev.target.disabled = true;
    movie.id=ev.target.name;
    console.log(movie);
    this.apiService.addDislike(movie).subscribe((film:Movie)=>
    {   
      console.log(film);
      document.getElementById("dislike"+film.id).textContent=film.dislikefilm.toString();
      ev.target.disabled = false;
    },error=>
      
      {
        ev.target.disabled = false;
        console.log("Error",error);
    
    })
    
  }
  SortBook()
  {
    document.location.reload();
  }
}
