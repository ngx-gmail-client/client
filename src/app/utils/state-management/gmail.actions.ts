export class SetLabels {

  static readonly type = '[GMAIL] Labels';

  constructor(public payload: any[]) {
  }
}

export class SetMessages {

  static readonly type = '[GMAIL] Messages';

  constructor(public payload: any[]) {
  }
}
