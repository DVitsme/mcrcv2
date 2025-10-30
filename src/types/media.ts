export interface Media {
  id: string
  alt: string
  url: string
  filename: string
  mimeType: string
  filesize: number
  width?: number
  height?: number
  createdAt: string
  updatedAt: string
}

export interface MediaInput {
  alt: string
  file: File
}
