import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from 'src/app/shared/master.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogComponent implements OnInit{
  blogForm!:FormGroup
  public result:any
  ckeConfig: any;
  headerckeConfig: any;
  public atttachments: any = []
  @ViewChild('myckeditor') ckeditor: any;
  // ckEditorConfig: any = { toolbar: [
  //   ['Source', 'Templates', 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'],
  //   [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ],
  //   [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ],
  //   [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl' ],
  //   [ 'Link', 'Unlink', 'Anchor' ],
  //   [ 'Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ],
  //   [ 'Styles', 'Format', 'Font', 'FontSize' ],
  //   [ 'TextColor', 'BGColor' ],
  //   [ 'Maximize', 'ShowBlocks' ]
  //   ] };
constructor(private _fb:FormBuilder, private _masterService: MasterService,
  public sanitizer: DomSanitizer){}
  ngOnInit(): void {
    this.blogForm = this._fb.group({
      "blog_title": ["",],
        "blog_desc":["",] ,
        "blog_body":["",],
        "URL": ["",],
        "pagemeta_name":[''],
        "pagemeta_desc":[''],
        "page_title":['']
    });
    this.ckeConfig = {
      extraPlugins: 'uploadimage',
      uploadUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',

      // Configure your file manager integration. This example uses CKFinder 3 for PHP.
      filebrowserBrowseUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html',
      filebrowserImageBrowseUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
      filebrowserUploadUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files',
      filebrowserImageUploadUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Images',
        
    };
  
    if(this._masterService.blogData.length !=0){
      this.blogForm.patchValue(this._masterService.blogData)
    }
  }
  onFormSubmit() {
   // this.spinner.show()
 
    if (this.blogForm.valid) {
      
         var body={
          
            "blog": {
                "blog_title": this.blogForm.controls['blog_title'].value,
                "blog_desc":  this.blogForm.controls['blog_desc'].value,
                "blog_body": this.blogForm.controls['blog_body'].value,
                "URL":this.blogForm.controls['URL'].value,
                "pagemeta_name":this.blogForm.controls['pagemeta_name'].value,
                "pagemeta_desc":this.blogForm.controls['pagemeta_desc'].value,
                "page_title":this.blogForm.controls['page_title'].value,
            }
        
       }
         this._masterService
           .postBlogData(body)
          .subscribe({
             next: (val: any) => {
               alert('Blog details saved!');
               
             },
             error: (err: any) => {
              console.error(err);
             },
           });
      
    }else{
      alert("Please fill the form correctly")
     
    }
  
  }
  onblogUpdate(){
    debugger
    if (this.blogForm.valid) {
      
      var body={
       
         "blogs": {
             "id": this._masterService.blogData.id,
             "blog_title": this.blogForm.controls['blog_title'].value,
             "blog_desc":  this.blogForm.controls['blog_desc'].value,
             "blog_body": this.blogForm.controls['blog_body'].value,
             "URL":this.blogForm.controls['URL'].value,
             "pagemeta_name":this.blogForm.controls['pagemeta_name'].value,
             "pagemeta_desc":this.blogForm.controls['pagemeta_desc'].value,
             "page_title":this.blogForm.controls['page_title'].value,
         }
     
    }
      this._masterService
        .updateBlogData(body)
       .subscribe({
          next: (val: any) => {
            alert('Blog details update!');
            
          },
          error: (err: any) => {
           console.error(err);
          },
        });
   
 }else{
   alert("Please fill the form correctly")
  
 }
  }

  
}
