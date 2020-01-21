import { Pipe, PipeTransform } from '@angular/core';
import { Pet } from './interfaces/pet';
import { PercentPipe } from '@angular/common';

const expTable = [
  // Lv2に行くまでに必要な経験値
  20, // 1
  // Lv3に行くまでに必要な経験値
  40, // 1
  100, // 1
  250, // 1
  500, // 1
  1000, // 1
  1500, // 1
  4000, // 1
  10000 // 1

];

@Pipe({
  name: 'exp'
})
export class ExpPipe implements PipeTransform {

  transform(pet: Pet, type?: 'percent' | 'label'): any {
    // pet.expには生まれたときからの経験値の総量が入ってる
    const totalExp = pet.exp;
    const level = pet.level;
    // 今持ってる経験値
    const baseExp = expTable[level - 2] || 0;
    // 次の経験値になるのに必要な値を計算する
    const nextExp = expTable[level - 1] - baseExp;
    const exp = totalExp - baseExp;

    if (type === 'percent') {
      console.log(exp / nextExp * 100);
      return exp / nextExp * 100;
    } else {
      return exp + ' / ' + nextExp;
    }
  }

}
