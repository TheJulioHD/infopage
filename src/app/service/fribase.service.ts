import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export default class FribaseService {

  constructor(private firestore: Firestore, private storage: AngularFireStorage ) { }

  addplace(any: any) {
    const placeRef = collection(this.firestore, "Noticias");
    return addDoc(placeRef, any);
  }
  getplace():Observable<any[]> {
    const placeRef = collection(this.firestore, "Noticias");
    return collectionData(placeRef, {idField:"id"}) as Observable<any[]>;
  }
  async getplaceById(id: string) {
    const placeRef = doc(this.firestore, "Noticias", id); // Se referencia el documento con el ID
    const placeDoc = await getDoc(placeRef); // Se obtiene el documento
    if (placeDoc.exists()) {
      return placeDoc.data(); // Devuelve los datos del documento si existe
    } else {
      throw new Error('Documento no encontrado');
    }
  }

  uploadImages(files: File[], profileImageIndex: number): Promise<string[]> {
    const uploadPromises = files.map(file => {
      const filePath = `noticias/${Date.now()}_${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      // Devuelve la URL de descarga de la imagen después de que la tarea se complete
      return task.snapshotChanges().pipe(
        finalize(() => fileRef.getDownloadURL().pipe(
          map(url => url as string)  // Mapea la URL a string
        ).toPromise())
      ).toPromise() as Promise<string>;  // Asegúrate de que la promesa se resuelve con una URL de tipo string
    });

    return Promise.all(uploadPromises)
      .then(urls => urls.filter((url): url is string => typeof url === 'string'));  // Filtra URLs y asegura que sean de tipo string
  }

  saveNewsWithImages(noticiaData: any, imageUrls: string[], profileImageIndex: number) {
    const noticia = {
      ...noticiaData,
      images: imageUrls.length > 0 ? imageUrls : [],  // Asegúrate de que `images` no sea undefined
      profileImage: imageUrls[profileImageIndex] || '', // Asegúrate de que `profileImage` no sea undefined
      createdAt: new Date()
    };

    // Verifica los campos antes de intentar agregar el documento
    for (const key in noticia) {
      if (noticia[key] === undefined) {
        console.error(`Campo "${key}" tiene valor undefined`);
      }
    }

    const placeRef = collection(this.firestore, "Noticias");
    return addDoc(placeRef, noticia);
  }

}
