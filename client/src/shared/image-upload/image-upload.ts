import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  imports: [],
  templateUrl: './image-upload.html',
  styleUrl: './image-upload.css'
})
export class ImageUpload {
  protected imageSrc = signal<string | ArrayBuffer | null>(null);
  protected isDragging : boolean = false;
  private fileToUpload : File | null = null;
  uploadFile = output<File>();
  loading = input<boolean>(false);

  onDragOver(event: DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if(event.dataTransfer?.files.length){
      const file = event.dataTransfer.files[0];
      this.previewImage(file);
      this.fileToUpload = file;
    }
  }

  onFileUploaded(event: Event){
    event.preventDefault();
    event.stopPropagation();
    
    const inputElement = event.target as HTMLInputElement;
    if(inputElement.files?.length){
      const file = inputElement.files[0];
      this.previewImage(file);
      this.fileToUpload = file;
    }
  }

  onCancel(){
    this.fileToUpload = null;
    this.imageSrc.set(null);
  }

  onUploadFile(){
    if(this.fileToUpload){
      this.uploadFile.emit(this.fileToUpload);
    }
  }

  private previewImage(file: File){
    const reader = new FileReader();
    reader.onload = () => this.imageSrc.set(reader.result);
    reader.readAsDataURL(file);
  }

}
