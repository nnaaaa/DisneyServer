export class Algorithm {
    static generateDigit(length: number) {
        const max = Math.pow(10, length)
        const min = Math.pow(10, length - 1)
        return Math.floor(Math.random() * (max - min) + min)
    }
}

// channels = [
//   { channelId: 1, category: { categoryId: 'A',channels:[{channelId:1}] } },
//   { channelId: 2, category: { categoryId: 'A' } },
//   { channelId: 3, category: { categoryId: 'B' } },
// ]

// categories = [
//   { categoryId: 'A', channels: [{ channelId: 1 }, { channelId: 2 }] },
//   { categoryId: 'B', channels: [{ channelId: 3 }] },
// ]

// filterChannel(channels: []){
//   const categories = []
//   for (const channel of channels) {
//     let isExist = false
//     for (const ctg of categories) {
//       if (channel.categoryId === ctg.categoryId) {
//         isExist = true
//         break;
//       }
//     }
//     if isExist{
//       categories.channels.push(channel)
//     }
//     else {
//       channel.category.push(channel)
//       categories.push(channel.category)
//     }
//   }

//   return categories
// }
