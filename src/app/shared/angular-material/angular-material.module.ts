import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  exports : [
      CdkTableModule,
      MatTableModule,
      MatSortModule,
      MatDialogModule,
      MatInputModule,
      MatDividerModule,
      MatPaginatorModule,
      MatDatepickerModule,
      MatButtonModule
  ]
})
export class AngularMaterialModule { }
