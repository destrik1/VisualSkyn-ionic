import { Component, OnInit } from '@angular/core';
import{
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro:FormGroup;
  constructor(public fb: FormBuilder , public alertcontrller:AlertController ,public router:Router) 
  
  {
    this.formularioRegistro=this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'confirmacionPassword': new FormControl("", Validators.required)
    })
   }

  ngOnInit() {
  
  }

async registro(){
  var f=this.formularioRegistro.value
  if(this.formularioRegistro.invalid){
    const alert=await this.alertcontrller.create({
      header: "validacion formulario",
      message: "debe llenar todos los campos",
      buttons: ["ok"]
    })
    await alert.present();
  }else{
    var usuario={
      usuario:f.nombre,
      password:f.password
    }
    localStorage.setItem('usuario' ,JSON.stringify(usuario));
    const alert=await this.alertcontrller.create({
      header: "Usuario",
      message: "Usuario creado correctamente",
      buttons: ["ok"]
    })
    await alert.present();
    this.router.navigate(["/login"])
  }
}
}
