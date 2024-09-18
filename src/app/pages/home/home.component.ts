import { Component } from '@angular/core';
import { Cliente } from 'src/app/models/newsmodel';
import FribaseService from 'src/app/service/fribase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private fire: FribaseService){}
 public cliente: Cliente[] =[];
  ngOnInit(){
    this.fire.getplace().subscribe(place => {
      this.cliente.push(...place)
      console.log(this.cliente)
    });
  }

  onSubmit(any: any){
    console.log(any)
    
  }
}
