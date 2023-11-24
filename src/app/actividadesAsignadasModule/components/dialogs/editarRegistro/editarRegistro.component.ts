import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogData } from '../../../Interfaces/confirmDialog.interface';

@Component({
  selector: 'app-editarReg',
  templateUrl: './editarRegistro.component.html',
  styleUrls: ['./editarRegistro.component.css'],
})
export class EditarRegistroComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}

  ngOnInit(): void {}
}
 