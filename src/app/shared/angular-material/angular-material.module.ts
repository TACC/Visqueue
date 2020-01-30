import { NgModule             } from '@angular/core';
import { MatTableModule       } from '@angular/material/table';
import { CdkTableModule       } from '@angular/cdk/table';
import { MatSortModule        } from '@angular/material/sort';
import { MatDialogModule      } from '@angular/material/dialog';
import { MatInputModule       } from '@angular/material/input';
import { MatDividerModule     } from '@angular/material/divider';
import { MatPaginatorModule   } from '@angular/material/paginator';
import { MatDatepickerModule  } from '@angular/material/datepicker';
import { MatButtonModule      } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule        } from '@angular/material/card';
import { MatToolbarModule     } from '@angular/material/toolbar';
import { MatMenuModule        } from '@angular/material/menu';
import { MatIconModule        } from '@angular/material/icon';
import { MatListModule        } from "@angular/material/list";

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
      MatButtonModule,
      MatProgressBarModule,
      MatCardModule,
      MatToolbarModule,
      MatMenuModule,
      MatIconModule,
      MatListModule
  ]
})
export class AngularMaterialModule { }
