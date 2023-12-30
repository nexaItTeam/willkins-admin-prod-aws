import { Component ,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { MasterService } from 'src/app/shared/master.service';
import { ClientComponent } from '../client/client.component';
import { NgxSpinnerService } from 'ngx-spinner';

import * as XLSX from 'xlsx';
@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.scss']
})
export class EmailTemplateComponent {
  public emailForm!:FormGroup
  public clientemailData:any
  ckEditorConfig: any = { toolbar: [
    ['Source', 'Templates', 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'],
    [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ],
    [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ],
    [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl' ],
    [ 'Link', 'Unlink', 'Anchor' ],
    [ 'Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ],
    [ 'Styles', 'Format', 'Font', 'FontSize' ],
    [ 'TextColor', 'BGColor' ],
    [ 'Maximize', 'ShowBlocks' ]
    ] };
    constructor(private _fb:FormBuilder, private _masterService: MasterService,
      public sanitizer: DomSanitizer, private _dialog: MatDialog,private spinner:NgxSpinnerService,
      private _dialogRef: MatDialogRef<ClientComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,){
        console.log(this.data)
      }
      ngOnInit(): void {
        this.emailForm = this._fb.group({
          "email": ["",],
            "subject":["",] ,
            "emailbody":["",],
            
           
          
        });
        
      }
      sendEmail(){
        var body ={
          "email":this.data,
          "subject": this.emailForm.get('subject').value,
          "body": this.emailForm.get('emailbody').value
      }
      this._masterService.sendEmail(body).subscribe({
        next: (res) => {
          alert('Email Sent');
          this.spinner.hide();
          this._dialogRef.close()
        },
        error: (err: any) => {
          alert('error from server side');
          this.spinner.hide();
        }
      });
      }
      wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  onFileChange(evt: any) {
    debugger
    let jsonData = null;
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
       this.clientemailData = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.data = wb.SheetNames.reduce((initial, name) => {
        const sheet = wb.Sheets[name];
        initial = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
     
    //  console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
