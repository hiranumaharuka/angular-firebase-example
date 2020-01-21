// index.tsからコピペ
import * as functions from 'firebase-functions';

// firestoreの中にあるdbを使うための処理
import * as admin from 'firebase-admin';
//アプリを使えるように初期化
admin.initializeApp();

const db = admin.firestore();

export const gitHook = functions.https.onRequest(async (request, response) => {
  // // GitHubIdの実態が以下
  // console.log(request.body.sender.id);
  // get()までの処理を待ってからget()以下の処理させるようにするのがawait
  // asyncを関数の前につけるのも必要
  const pets = await db.collection('pets')
  // 受け取るpetの条件がownerGitHubIdを持っている人でpushされたGitHubIdと同じ人の値を取る
  .where('ownerGitHubId', '==', request.body.sender.id)
  .get()

  //受け取った（既存の）値に10ずつ増やしていく
  const increment = admin.firestore.FieldValue.increment(10);
  pets.docs.forEach(doc => doc.ref.update({
    exp: increment
  }));
  response.send('success');
});
