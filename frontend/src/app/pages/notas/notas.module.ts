import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotasPageRoutingModule } from './notas-routing.module';
import { NotasPage } from './notas.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotasPageRoutingModule,
    PipesModule
  ],
  declarations: [NotasPage]
})
export class NotasPageModule {}
