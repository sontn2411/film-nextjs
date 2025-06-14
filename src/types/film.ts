export interface filmItemType {
  poster_url: string
  _id: string
  name: string
  lang: string
  quality: string
  time: string
  episode_current: string
  slug: string
  origin_name: string
  year: string
}

export interface PaginationType {
  currentPage: number
  totalItems: number
  totalItemsPerPage: number
  totalPages: number
  updateToday: number
}

export interface categoryItem {
  id: string
  name: string
  slug: string
}
