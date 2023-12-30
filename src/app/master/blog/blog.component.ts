import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  public sanitizer: DomSanitizer){}
  ngOnInit(): void {
    this.blogForm = this._fb.group({
      "blog_title": ["",],
        "blog_desc":["",] ,
        "blog_body":["",],
        "URL": ["",],
       
      
    });
    this.GetBlog()
  }
  onFormSubmit() {
   // this.spinner.show()
   debugger
    if (this.blogForm.valid) {
      
         var body={
          
            "blog": {
                "blog_title": "Lorem Ipsum",
                "blog_desc":  this.blogForm.controls['blog_desc'].value,
                "blog_body": "thee style is inLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.1)these is a.2)these is another",
                "URL":"www.test.com"
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
  public GetBlog(){
    debugger
    this._masterService
    .getBlogData()
   .subscribe({
      next: (val: any) => {
       //this.result=val.getAllBlog.rows[7]
       this.result=this.sanitizer.bypassSecurityTrustHtml(val.getAllBlog.rows[6].blog_desc);
      },
      error: (err: any) => {
       console.error(err);
      },
    });






  }
}
