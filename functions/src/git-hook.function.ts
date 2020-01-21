// index.tsからコピペ
import * as functions from 'firebase-functions';

// firestoreの中にあるdbを使うための処理
import * as admin from 'firebase-admin';
//アプリを使えるように初期化
admin.initializeApp();

const db = admin.firestore();

const expTable = [
  // Lv2に行くまでに必要な経験値
  20,
  // Lv3に行くまでに必要な経験値
  40,
  100,
  250,
  500,
  1000,
  1500,
  4000,
  10000

];
// ド定数なので全部大文字でもいい
const EARN_EXPERIENCE = 10;

export const gitHook = functions.https.onRequest(async (request, response) => {
  // // GitHubIdの実態が以下
  // console.log(request.body.sender.id);
  // get()までの処理を待ってからget()以下の処理させるようにするのがawait
  // asyncを関数の前につけるのも必要
  const pets = await db.collection('pets')
  // 受け取るpetの条件がownerGitHubIdを持っている人でpushされたGitHubIdと同じ人の値を取る
  .where('ownerGitHubId', '==', request.body.sender.id)
  .get()

  // 現状のpetのデータを取得する
  const pet = pets.docs[0].data();

  let level = 1;
  expTable.some(nextExp => {
    // 経験値がプラス10される前に判断してるので + 10を付け加えると正常な判断になる
    if (pet.exp + EARN_EXPERIENCE > nextExp){
      level++;
      return false;
    }else {
      // ifでなければLv判断の処理を終わらせる
      return true;
    }
  });

  //受け取った（既存の）値に10ずつ増やしていく
  const increment = admin.firestore.FieldValue.increment(EARN_EXPERIENCE);
  pets.docs.forEach(doc => doc.ref.update({
    exp: increment,
    // keyの名前と変数の名前が同じ場合は以下のように省略して書ける
    level
  }));
  response.send('success');
});
