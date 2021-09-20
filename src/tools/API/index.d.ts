export interface IProps {
  path: string,
  body?: BodyInit | null | undefined,
  contentType?: string,
  method?: string,
  authToken?: string,
}
