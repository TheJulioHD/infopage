import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import FribaseService from 'src/app/service/fribase.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  newsForm: FormGroup;
  files: File[] = [];

  constructor(private fb: FormBuilder, private firebaseService: FribaseService) {
    this.newsForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      profileImageIndex: [0]  // Default index for profile image
    });
  }

  onFilesSelected(event: any) {
    this.files = Array.from(event.target.files);
  }

  onSubmit() {
    if (this.newsForm.valid && this.files.length > 0) {
      const noticiaData = this.newsForm.value;
      const profileImageIndex = noticiaData.profileImageIndex;

      this.firebaseService.uploadImages(this.files, profileImageIndex)
        .then(imageUrls => {
          return this.firebaseService.saveNewsWithImages(noticiaData, imageUrls, profileImageIndex);
        })
        .then(() => {
          console.log('Noticia subida con éxito');
        })
        .catch(error => {
          console.error('Error al subir la noticia:', error);
        });
    }
  }
}
