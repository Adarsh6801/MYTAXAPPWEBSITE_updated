export interface IDocument {
  id: number;
  roleId: number;
}

export interface IDocumentState {
  loading: boolean;
  error?: Error;
}
