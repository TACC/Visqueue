import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';


@NgModule({
  declarations: [],
  exports : [
      CdkTableModule,
      MatTableModule
  ]
})
export class AngularMaterialModule { }
