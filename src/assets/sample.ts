export interface MailHeader {
  name: string,
  value: stgring
}

export interface Interface {
  id: string,
  threadId: string,
  labelIds: string[],
  snippet: string,
  historyId: string,
  internalDate: string,
  payload: object,
  sizeEstimate: number
};
