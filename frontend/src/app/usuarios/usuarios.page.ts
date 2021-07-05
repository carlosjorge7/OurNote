import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioModalComponent } from './usuario-modal/usuario-modal.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage {

  constructor(private modalCtrl: ModalController) { }

  login() {
    // open modal
    this.modalCtrl.create({
      component: UsuarioModalComponent
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
  }

  register(registro: string) {
    // open modal
    this.modalCtrl.create({
      component: UsuarioModalComponent,
      componentProps: {registro}
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
  }

}
