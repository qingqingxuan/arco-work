export interface HttpOption {
  url: string
  data?: any
  method?: string
  headers?: any
  beforeRequest?: () => void
  afterRequest?: () => void
}

type PageInfo = {
  page: number
  totalSize: number
}

export interface Response<T = any> {
  code: number
  msg: string
  data: T
  pageInfo?: PageInfo
}
