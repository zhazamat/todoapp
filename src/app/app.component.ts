import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todoapp';

  positionTitle: string = '';
  positionDescription: string = '';

  constructor(private http: HttpClient) { }

  savePosition(event: Event) {
    event.preventDefault(); // Prevent the default form submission

    const bodyData = {
      "PositionTitle": this.positionTitle,
      "PositionDescription": this.positionDescription
    };

    this.http.post("http://localhost:5286/api/Position/AddPosition", bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
      });
  }


  readonly APIUrl="http://localhost:5286/api/Position/"


  
  positions:any=[];
  refreshPositions(){
    this.http.get(this.APIUrl+"GetPositions").subscribe(data=>{
      this.positions=data;

    })
  }
  ngOnInit(){
    this.refreshPositions()
  }

  addPosition(){
    var newPosition=(<HTMLInputElement>document.getElementById("PositionTitle")).value;
   
    var newPosition=(<HTMLInputElement>document.getElementById("PositionDescription")).value;
    var formData=new FormData();
    formData.append("PositionTitle",newPosition);
    formData.append("PositionDescription",newPosition);
    this.http.post(this.APIUrl+'AddPosition',formData).subscribe(data=>{
      alert(data);
      this.refreshPositions();

    })
  }
    deletePosition(id:any){
      
      this.http.delete(this.APIUrl+"DeletePosition/?id="+id).subscribe(data=>{
        alert(data);
        this.refreshPositions();
        
      })
  }
    

}
