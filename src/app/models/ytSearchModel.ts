import {ytListItems} from "./ytListItems";

export interface ytSearchModel {
  kind: string
  items: ytListItems[]
  etag: string
  id: {
    kind: string
    videoId: string
    channelId: string
    playlistId: string
  }
  snippet : {
    publishedAt: any
    channelId: string
    title: string
    description: string
    thumbnails: any
  }
  title: string
}

//
// {
//   "kind": "youtube#searchResult",
//   "etag": etag,
//   "id": {
//   "kind": string,
//     "videoId": string,
//     "channelId": string,
//     "playlistId": string
// },
//   "snippet": {
//   "publishedAt": datetime,
//     "channelId": string,
//     "title": string,
//     "description": string,
//     "thumbnails": {
//     (key): {
//       "url": string,
//         "width": unsigned integer,
//         "height": unsigned integer
//     }
//   },
//   "channelTitle": string,
//     "liveBroadcastContent": string
// }
// }
