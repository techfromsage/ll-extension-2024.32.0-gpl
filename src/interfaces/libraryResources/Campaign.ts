export interface Campaign {
  uuid: string,
  name: string,
  questions: Question[],
}

export interface Question {
  uuid: string,
  question: string,
  comment: string,
}
