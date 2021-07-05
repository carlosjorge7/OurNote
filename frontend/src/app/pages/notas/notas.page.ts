import { Component, OnInit} from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { NotasService } from '../../servicios/notas.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Usuario } from '../../modelos/Usuario';
import { Nota } from '../../modelos/Nota';
import { NotaModalComponent } from '../../pages/notas/nota-modal/nota-modal.component'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {

  notas: Nota[] = []

  nick: string;

  usuario: Usuario = {
    idUsuario: '',
    email: '',
    contrasena: ''
  }

  textoBuscar = '';


  constructor(private usuarioService: UsuariosService,
              private toastController: ToastController,
              private notasService: NotasService,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private router: Router) {}

  buscarNota(event) {
    const valor = event.target.value;
    this.textoBuscar = valor;
    console.log(this.textoBuscar)
  }

  async presentToast(res: string) {
    const toast = await this.toastController.create({
      message: res,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.getAllNotas();
    let idUsuario = localStorage.getItem('idUsuario');
    this.usuarioService.getUsuario(idUsuario)
      .subscribe(res => {
        this.usuario = res;
        this.nick = res['email'];
        //console.log(this.user)
      }, err => {
        console.log(err)
      })
  }

  // USUARIO
  logout() {
    this.alertCtrl.create({
      header: 'Salir',
      message: '¿Quieres cerrar sesión?',
      buttons: [{
          text: 'Si',
          handler: () => {
            this.usuarioService.logout();
            this.router.navigate(['usuarios']);
            this.presentToast(`Hasta luego ${this.nick}`)
          }
        }, { text: 'No'}
      ]
    }).then(alertEl => alertEl.present());
  }

  deleteUser() {
    this.alertCtrl.create({
      header: 'Borrar cuenta',
      message: '¿Quieres darte de baja?',
      buttons: [{
          text: 'Si',
          handler: () => {
            let idUsuario = localStorage.getItem('idUsuario');
            //Borramos las notas del usuario --> Foreignkeys --> Dependencias --> Hay q borrar primero los datos del usuario y luego el usuario
            this.notasService.deleteNotasByUser(idUsuario)
              .subscribe(res => {
                console.log(res)
            })
            // Borramos el usuario
            this.usuarioService.deleteUsuario(idUsuario).subscribe( res => {
              this.presentToast(res['message']);
            })
            this.usuarioService.logout()
            this.router.navigate(['usuarios']);
          }
        }, { text: 'No'}
      ]
    }).then(alertEl => alertEl.present());
  }


  // NOTAS

  getAllNotas() {
    let idUsuario = localStorage.getItem('idUsuario');
    this.notasService.getAllNotas(idUsuario).subscribe(res => {
      this.notas = res;
      console.log(this.notas)
    });
  }

  createNota() {
    // open modal
    this.modalCtrl.create({
      component: NotaModalComponent
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
    .then((res) => {
      this.getAllNotas()
    })
  }

  updateNota(nota: Nota) {
    this.modalCtrl.create({
      component: NotaModalComponent,
      componentProps: { nota } // aqui pasamos el objeto al componente modal
    })
    .then(modal => {
      modal.present();
    })
  }

  deleteNota(idNota: string) {
    this.alertCtrl.create({
      header: 'Borrar',
      message: 'Estas seguro?',
      buttons: [{
          text: 'Si',
          handler: () => {
            this.notasService.deleteNota(idNota).subscribe(res => {
              this.getAllNotas();
              this.presentToast(res['message']);
            });
          }
        }, { text: 'No'}
      ]
    }).then(alertEl => alertEl.present());
  }


}
