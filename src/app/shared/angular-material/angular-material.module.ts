import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  exports : [
      CdkTableModule,
      MatTableModule,
      MatSortModule,
      MatDialogModule
  ]
})
export class AngularMaterialModule { }
