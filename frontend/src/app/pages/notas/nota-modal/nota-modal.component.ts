import { Component, Input, OnInit } from '@angular/core';
import { NotasService } from '../../../servicios/notas.service';
import { NgForm } from "@angular/forms";
import { ModalController } from '@ionic/angular';
import { Nota } from 'src/app/modelos/Nota';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-nota-modal',
  templateUrl: './nota-modal.component.html',
  styleUrls: ['./nota-modal.component.scss'],
})
export class NotaModalComponent implements OnInit {

  // si edito, recibo la data 
  @Input() nota: Nota
  isUpdate = false; // Check if the modal is used for update or not
  // Data to be updated
  data: Nota = {
    idNota: '',
    titulo: '',
    descripcion: '',
    created_at: '',
    idUsuario: ''
  };

  constructor(private notaService: NotasService,
    public toastController: ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController) { }

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

  ngOnInit() {
    if(this.nota) {
      this.isUpdate = true;
      this.data = this.nota;
      console.log('Nota', this.data)
    }
  }

   // añadir o editar
   onSubmit(form: NgForm) {
    let nota = {
      titulo: form.value.titulo,
      descripcion: form.value.descripcion,
      idUsuario: localStorage.getItem('idUsuario')
    }
    if(this.isUpdate) {
      this.notaService.updateNota(this.data)
        .subscribe(res => {
          this.modalCtrl.dismiss(res, 'updated');
          this.presentToast(res['message']);
      });
    }
    else{
        this.notaService.createNota(nota)
          .subscribe(res => {
            this.modalCtrl.dismiss(res, 'created');
            this.presentToast(res['message']);
        });
    }
   
  }

}
