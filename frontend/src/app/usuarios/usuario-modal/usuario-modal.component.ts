import { Component, Input, OnInit} from '@angular/core';
import { NgForm } from "@angular/forms";
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../modelos/Usuario';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.scss'],
})
export class UsuarioModalComponent implements OnInit {

  // si edito, recibo la data 
  @Input() registro: string;
  isRegister = false; // Check if the modal is used for update or not
  // Data to be updated
  reg: string ;

  data: Usuario = {
    idUsuario: '',
    email: '',
    contrasena: ''
  };

  constructor(private usuarioService: UsuariosService,
              private alertCtrl: AlertController,
              private router: Router,
              private toastController: ToastController,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    if(this.registro) {
      this.isRegister = true;
      this.reg = this.registro;
      console.log(this.reg)
    }
  }

  closeModal() {
    this.modalCtrl.dismiss(null, 'closed')
  }

  async presentToast(res: string) {
    const toast = await this.toastController.create({
      message: res,
      duration: 2000
    });
    toast.present();
  }

  onSubmit(form: NgForm) {
    let usuario: Usuario = form.value;
    let tipoFuncion
    if(this.isRegister) {
      tipoFuncion = this.usuarioService.registro(usuario);
    }
    else{
      tipoFuncion = this.usuarioService.login(usuario);
    }
    tipoFuncion.subscribe(res => {
      localStorage.setItem('token', res['token'])
      localStorage.setItem('idUsuario', res['idUsuario']);
      this.router.navigate(['/notas']);
      this.presentToast(res['message'])
      this.modalCtrl.dismiss(res, 'created')
      this.closeModal();
    },err => {
      console.log(err)
      this.alertCtrl.create({
        header: 'Error',
        message:err['error'],
      }).then(alertEl => alertEl.present());
    });
  }

}
