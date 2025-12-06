type Song = {}
type Artist = {}
type Artwork = {}

type Queue = {
  songs: Song[]
}

function queueNext(queue: Queue, song: Song) {
  console.log("Adding song to start of queue.")
  const songs = queue.songs
  songs.unshift(song)
  console.log("Song added to start of queue.")
}

function queueLast(queue: Queue, song: Song) {
  console.log("Adding song to end of queue.")
  const songs = queue.songs
  songs.push(song)
  console.log("Song added to end of queue.")
}

function removeFromQueue(queue: Queue, index: number) {
  console.log("Removing song from queue.")
  const songs = queue.songs
  const length = songs.length
  if (length === 0) {
    console.error("Error removing song from queue. Queue is empty.")
  }
  const maximumAllowedIndex = length - 1
  if (index < 0 || index > maximumAllowedIndex) {
    console.error("Invalid Index")
    console.log(`index=[${index}], length=[${length}]`)
    console.log(`The argument for index must be a number between 0 and ${maximumAllowedIndex} inclusively.`)
  }
  songs.splice(index, 1)
}
