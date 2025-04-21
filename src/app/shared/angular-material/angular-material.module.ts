import { NgModule              } from '@angular/core';
import { MatLegacyTableModule as MatTableModule        } from '@angular/material/legacy-table';
import { CdkTableModule        } from '@angular/cdk/table';
import { MatSortModule         } from '@angular/material/sort';
import { MatLegacyDialogModule as MatDialogModule       } from '@angular/material/legacy-dialog';
import { MatLegacyInputModule as MatInputModule        } from '@angular/material/legacy-input';
import { MatDividerModule      } from '@angular/material/divider';
import { MatLegacyPaginatorModule as MatPaginatorModule    } from '@angular/material/legacy-paginator';
import { MatDatepickerModule   } from '@angular/material/datepicker';
import { MatLegacyButtonModule as MatButtonModule       } from '@angular/material/legacy-button';
import { MatLegacyProgressBarModule as MatProgressBarModule  } from '@angular/material/legacy-progress-bar';
import { MatLegacyCardModule as MatCardModule         } from '@angular/material/legacy-card';
import { MatToolbarModule      } from '@angular/material/toolbar';
import { MatLegacyMenuModule as MatMenuModule         } from '@angular/material/legacy-menu';
import { MatIconModule         } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule         } from "@angular/material/legacy-list";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacySelectModule as MatSelectModule       } from '@angular/material/legacy-select';
import { MatLegacyTooltipModule as MatTooltipModule      } from '@angular/material/legacy-tooltip';

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
      MatListModule,
      MatButtonToggleModule,
      MatSelectModule,
      MatTooltipModule
  ]
})
export class AngularMaterialModule { }
