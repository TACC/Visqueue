import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-sunburst-dialog',
  templateUrl: './sunburst-dialog.component.html',
  styleUrls: ['./sunburst-dialog.component.scss']
})
export class SunburstDialogComponent implements OnInit {

  constructor(
    public dialogRef : MatDialogRef<SunburstDialogComponent>,
    @Inject( MAT_DIALOG_DATA ) public data : any ) { }

  onNoClick() : void
  {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}