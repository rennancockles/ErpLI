interface IStoreAuthRequest {
  name: string
  api_key: string
}

export interface IRegisterRequest {
  name: string
  lastname: string
  email: string
  password: string
  store: IStoreAuthRequest 
}