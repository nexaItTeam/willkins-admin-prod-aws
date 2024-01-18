
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MasterService } from 'src/app/shared/master.service';
import { SelectEvent, FileSelectComponent, FileState, FileInfo } from "@progress/kendo-angular-upload";
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { RemoveEvent } from '@progress/kendo-angular-grid';
import{stateList,propertTypeList} from 'src/app/master/option-list'
@Component({
  selector: 'app-add-edit-property',
  templateUrl: './add-edit-property.component.html',
  styleUrls: ['./add-edit-property.component.scss']
})
export class AddEditPropertyComponent implements OnInit {
  public propertyTypeList=propertTypeList
  public stateList=stateList
  propertyForm!: FormGroup;
  public imageData: any
  public prop_id!: number
  public atttachments: any = []
  public propertyMapatttachments: any = []
  public subDivisionPlanatttachments: any = []
  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<AddEditPropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _masterService: MasterService,
    public spinner: NgxSpinnerService,
  ) {

  }

  ngOnInit(): void {
    this.propertyForm = this._fb.group({
      property_name: ['', [Validators.required]],
      facility: ['', [Validators.required]],
      property_address: ['', [Validators.required]],
      returns: ['', [Validators.required]],
      LVR: ['', [Validators.required]],
      term: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      status: ['', [Validators.required]],
      files: ['',],
      price_per_share:['',[Validators.required]],
      prop_type:['',[Validators.required]],
      state:['',[Validators.required]],
      first_installment_price:[]
    });
    this.propertyForm.patchValue(this.data);
    if (this.data) {
      this.getPropertyImage(this.data.id)
    }
  }

  public userRoleList = [
    {
      name: "Trending",
      value: "Trending"
    },
    {
      name: "Upcoming",
      value: "Upcoming"
    },
    {
      name: "Closed",
      value: "Closed"
    }
  ]
  
  onFormSubmit() {

    if (this.propertyForm.valid) {
      this.spinner.show()
      if (this.data) {
        var body = {
          "property": {
            "id": this.data.id,
            "property_name": this.propertyForm.controls['property_name'].value,
            "property_address": this.propertyForm.controls['property_address'].value,
            "returns": this.propertyForm.controls['returns'].value,
            "LVR": this.propertyForm.controls['LVR'].value,
            "term": this.propertyForm.controls['term'].value,
            "facility": this.propertyForm.controls['facility'].value,
            "desc": this.propertyForm.controls['desc'].value,
            "status": this.propertyForm.controls['status'].value,
            "price_per_share":this.propertyForm.controls['price_per_share'].value,
            "prop_type":this.propertyForm.controls['prop_type'].value,
            "first_installment_price":this.propertyForm.controls['first_installment_price'].value,
          }

        }
        this._masterService
          .updatePropertyList(body)
          .subscribe({
            next: (val: any) => {
              alert('Property detail updated!');
              debugger
              if (val) {
                this.uploadFileAttachments(this.data.id);
                this.uploadDivsionPlanAttachments(this.data.id);
                this.uploadpropertymapAttachments(this.data.id);
                this._dialogRef.close(true);
                this.spinner.hide()
              }
            },
            error: (err: any) => {
              console.error(err);
              this.spinner.hide()
            },
          });
      } else {
        var Addbody = {
          "property": {
            "property_name": this.propertyForm.controls['property_name'].value,
            "property_address": this.propertyForm.controls['property_address'].value,
            "returns": this.propertyForm.controls['returns'].value,
            "LVR": this.propertyForm.controls['LVR'].value,
            "term": this.propertyForm.controls['term'].value,
            "facility": this.propertyForm.controls['facility'].value,
            "desc": this.propertyForm.controls['desc'].value,
            "status": this.propertyForm.controls['status'].value,
            "price_per_share":this.propertyForm.controls['price_per_share'].value,
            "prop_type":this.propertyForm.controls['prop_type'].value,
            "first_installment_price":this.propertyForm.controls['first_installment_price'].value,
          }
        }

        this._masterService.addPropertyList(Addbody).subscribe({
          next: (val: any) => {
            alert('Property added successfully');
            if (val) {
              this.uploadFileAttachments(val.create_property.id);
              this.uploadDivsionPlanAttachments(val.create_property.id);
              this.uploadpropertymapAttachments(val.create_property.id);
              this._dialogRef.close(true);
              this.spinner.hide()
            }

          },
          error: (err: any) => {
            console.error(err);
            this.spinner.hide()
            this._dialogRef.close(true);
            this.spinner.hide()
          },
        });
      }
    } else {
      alert("Please fill the form Correctly")
    }
  }


  onFileSelect(event: SelectEvent) {
    console.log("event", event)
    this.atttachments = [...this.atttachments, ...event.files]

  }
  onMapFileSelect(event: SelectEvent) {
    console.log("event", event)
    this.propertyMapatttachments = [...this.propertyMapatttachments, ...event.files]

  }
  onSubDivisionFileSelect(event: SelectEvent) {
    console.log("event", event)
    this.subDivisionPlanatttachments = [...this.subDivisionPlanatttachments, ...event.files]

  }
  uploadFileAttachments(propertyid: number) {

    for (let i = 0; i < this.atttachments.length; i++) {
      const atttachments = this.atttachments[i]
      const uploadItems: any = new FormData();

      uploadItems.append('property', atttachments.rawFile);
      uploadItems.append("img_type", "gallery");

      console.log(uploadItems)
      const result = this._masterService
        .uploadAttachments(uploadItems, propertyid)
        .subscribe({
          next: (val: any) => {


          },
          error: (err: any) => {
            alert("something went wrong during upload Image")
            this.spinner.hide()
          },
        });
    }
  }
  uploadpropertymapAttachments(propertyid: number) {

    for (let i = 0; i < this.propertyMapatttachments.length; i++) {
      const atttachments = this.propertyMapatttachments[i]
      const uploadItems: any = new FormData();

      uploadItems.append('property', atttachments.rawFile);
      uploadItems.append("img_type", "map");

      console.log(uploadItems)
      const result = this._masterService
        .uploadAttachments(uploadItems, propertyid)
        .subscribe({
          next: (val: any) => {


          },
          error: (err: any) => {
            alert("something went wrong during upload Image")
            this.spinner.hide()
          },
        });
    }
  }

  uploadDivsionPlanAttachments(propertyid: number) {

    for (let i = 0; i < this.subDivisionPlanatttachments.length; i++) {
      const atttachments = this.subDivisionPlanatttachments[i]
      const uploadItems: any = new FormData();

      uploadItems.append('property', atttachments.rawFile);
      uploadItems.append("img_type", "subdivision");

      console.log(uploadItems)
      const result = this._masterService
        .uploadAttachments(uploadItems, propertyid)
        .subscribe({
          next: (val: any) => {


          },
          error: (err: any) => {
            alert("something went wrong during upload Image")
            this.spinner.hide()
          },
        });
    }
  }
  public getPropertyImage(prop_id: number) {
    this.prop_id = prop_id
    this.imageData = []
    this.spinner.show()
    let body = {
      "prop_id": this.prop_id
    }


    var result = this._masterService
      .getPropertyImage(body)
      .subscribe({
        next: (val: any) => {

          this.imageData = val.data
          this.spinner.hide()

        },
        error: (err: any) => {
          alert("error from server side while fetching uploaded images")
          this.spinner.hide()
        },
      });

  }
  onDeleteImage(id: number) {
    debugger
    const data = {
      title: "Delete Image",
      subtitle: 'Are you sure you want to delete selected Image?',
    }
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      data: data ? data : null
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.spinner.show();
          var body = {
            "id": id
          }
          this._masterService.deletePropertyImage(body).subscribe({
            next: (res) => {
              alert('Image deleted!');
              this.getPropertyImage(this.prop_id);
              this.spinner.hide();
            },
            error: (err: any) => {
              alert('error from server side');
              this.spinner.hide();
            }
          });
        }
      },
    });

  }

  removeEventHandler(e: RemoveEvent) {

  }
}








