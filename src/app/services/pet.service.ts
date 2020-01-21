import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Pet } from '../interfaces/pet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(
    // Firebaseのデータベースにアクセスする
    private db: AngularFirestore,
    // snackBarを表示する
    private snackBar: MatSnackBar,
    // 違うページに飛ばす
    private router: Router
  ) { }

  createPet(pet: Pet) {
    console.log(pet);
    const id = this.db.createId();
    return this.db.doc(`pets/${id}`).set(pet)
    .then(() => {
      this.snackBar.open('ペットを作成しました', null, {
        duration: 2000
      });
      // ペット作成したらtopページに飛ばす
      this.router.navigateByUrl('/');
    });
  }
  // 作成したペットのデータを取得する
  getPet(trainerId: string): Observable<Pet> {
    // dbにアクセス
    return this.db
    // dbの中のpet collectionにアクセス
    // trainerIdが渡されたtrainerIdであるペットにアクセスする
    .collection<Pet>('pets', ref => ref.where('trainerId', '==' , trainerId))
    // そのペットの数が増えるかもしれないしへるかもしれないので最新の値を撮ってくる
    .valueChanges()
    // 1匹以上いるかをチェックする
    // 一体だけ取得する。いない場合はnullを返す
    .pipe(
      map(pets => {
        if (pets.length) {
          return pets[0];
        } else {
          return null;
        }
      })
    );
  }
}
