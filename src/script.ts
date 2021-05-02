import { Item, Credit } from './models'
var ObjectID = require('mongodb').ObjectID;
const products = [
  {
    name: "Coke",
    price: 20,
    stock: 10
  },
  {
    name: "Pepsi",
    price: 25,
    stock: 10
  },
  {
    name: "Dew",
    price: 10,
    stock: 10
  }
]


export const bulkCreateProducts = async () => {
  await Item.create(products);
}

export const bulkUpdate = async () => {
  return new Promise((resolve, reject) => {
    let bulkUpdate = products.map(async (product) => {
      let result = Item.updateOne({
        name: product.name
      }, {
        price: product.price,
        stock: product.stock
      })
      return result;
    });
    Promise.all(bulkUpdate).then(res => {
      resolve(true)
    })
  })
}

export const loadCoin = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const credit: any = await Credit.find({});
      await Credit.updateOne(
        {"_id":credit[0]._id},
        {$set:{"credit":100}}
        )
      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}


