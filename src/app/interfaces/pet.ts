export interface Pet {
  petImageId: number;
  name: string;
  level: number;
  exp: number;
  trainerId: string;
  gender: 'male' | 'female';
  // ownerは自分のGitHubIdを持っている状態が正になる
  ownerGitHubId: number;
}
