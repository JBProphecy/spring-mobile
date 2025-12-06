export type ArtistData = {
  id: string
  uri: string
  name: string
}

export type SongCoverData = {
  uri?: string
  alt?: string
}

export type SongData = {
  id: string
  name: string
  cover: SongCoverData
  artists: {
    primary: ArtistData[]
    featured: ArtistData[]
  }
}
