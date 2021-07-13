import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent{

  constructor(private snackbar: MatSnackBar) { }

  openSnackBar(text: string) {
    this.snackbar.open(text, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
