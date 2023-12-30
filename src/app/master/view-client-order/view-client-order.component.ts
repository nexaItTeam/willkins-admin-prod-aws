import { Component ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-client-order',
  templateUrl: './view-client-order.component.html',
  styleUrls: ['./view-client-order.component.scss']
})
export class ViewClientOrderComponent {
  currentMsgToChild1:any
  constructor(private spinner: NgxSpinnerService,
    private router: Router,
    private _dialog: MatDialog,
   // private _dialogRef: MatDialogRef<OrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      this.currentMsgToChild1 = this.data
  }
}
