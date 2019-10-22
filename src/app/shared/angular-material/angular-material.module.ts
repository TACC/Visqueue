import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [],
  exports : [
      CdkTableModule,
      MatTableModule,
      MatSortModule
  ]
})
export class AngularMaterialModule { }
