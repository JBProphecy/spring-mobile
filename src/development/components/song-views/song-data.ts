import { ArtistData, SongData } from "./song-types";

function buildArtistUri<T extends string>(slug: T) {
  return `lynx:types:artist:${slug}` as const
}

function buildSongUri<T extends string>(slug: T) {
  return `lynx:types:song:${slug}` as const
}

export namespace Artists {
  export const One = {
    id: "artist-one",
    uri: buildArtistUri("artist-one"),
    name: "Artist One",
  } as const satisfies ArtistData
  export const Two = {
    id: "artist-two",
    uri: buildArtistUri("artist-two"),
    name: "Artist Two"
  } as const satisfies ArtistData
  export const Three = {
    id: "artist-three",
    uri: buildArtistUri("artist-three"),
    name: "Artist Three"
  } as const satisfies ArtistData
  export const Four = {
    id: "artist-four",
    uri: buildArtistUri("artist-four"),
    name: "Artist Four"
  } as const satisfies ArtistData
  export const Five = {
    id: "artist-five",
    uri: buildArtistUri("artist-five"),
    name: "Artist Five"
  } as const satisfies ArtistData
}

export namespace Songs {
  export const One = {
    id: "song-one",
    name: "Song One",
    cover: {
      uri: "https://cdn.shopify.com/s/files/1/1014/6323/files/nikiskinoir_-_Pandoras_Roses_Goth_Bra_Panty_5.jpg?v=1709732317",
    },
    artists: {
      primary: [Artists.One],
      featured: []
    }
  } as const satisfies SongData
  export const Two = {
    id: "song-two",
    name: "Song Two",
    cover: {
      uri: "https://i1.sndcdn.com/artworks-9vVGAGLowDspq7BK-vVp2gw-t500x500.jpg",
    },
    artists: {
      primary: [Artists.One, Artists.Two],
      featured: []
    }
  } as const satisfies SongData
  export const Three = {
    id: "song-three",
    name: "Song Three",
    cover: {
      uri: "https://cdn-prod.scalefast.com/public/assets/img/resized/wizardsofthecoast-secret-lair/4a450f8931ba06472aec01b2e53521f4_636_KR.png",
    },
    artists: {
      primary: [Artists.One, Artists.Two],
      featured: [Artists.Three]
    }
  } as const satisfies SongData
  export const Four = {
    id: "song-four",
    name: "Song Four",
    cover: {
      uri: "https://static.vecteezy.com/system/resources/thumbnails/048/786/492/small/dog-with-sunglasses-under-neon-lights-against-a-dark-space-like-background-cute-cool-dog-photo.jpg",
    },
    artists: {
      primary: [Artists.Five, Artists.Two],
      featured: [Artists.Three, Artists.Four]
    }
  } as const satisfies SongData
}

export const ExampleSongData = [
  Songs.One, Songs.Two, Songs.Three, Songs.Four
] as const satisfies SongData[]
