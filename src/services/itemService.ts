import { Item, Transaction, Credit } from '../models';
import { bulkUpdate,loadCoin } from '../script';

class ItemService {

  getAllItems() {
    return new Promise(async (resolve, reject) => {
      try {
        const products = await Item.find();
        resolve(products)
      } catch (error) {
        reject(error);
      }
    })
  }

  loadInitialDataToDB() {
    return new Promise(async (resolve, reject) => {
      await bulkUpdate();
      await loadCoin()
      resolve({message:'Item loaded successfully',success:true});
    })
  }

  buyItem(item: any) {
    return new Promise((resolve, reject) => {
      try {
        Item.findById(item.itemId).then(async (product: any) => {
          if (product.stock == 0) {
            reject({ message: `Sorry! Requested item is out of stock.` })
            return;
          } else if (product.stock && (product.stock < (item.quantity))) {
            const message = `Sorry! Maximum quantity reached.`
            reject({ message })
            return;
          }
          else {
            const transaction = new Transaction({
              name: item.name,
              price: parseFloat(item.totalPrice),
              quantity: parseFloat(item.quantity)
            });
            await transaction.save();
            const remainingCoins: any = await Credit.find({});
            const { credit, _id } = remainingCoins[0];
            if (credit < parseFloat(item.price)) {
              reject({ message: `Sorry! you are out of coints.` });
              return;
            }
            const availableCoins = await Credit.findOneAndUpdate(
              { _id },
              { credit: credit - parseInt(item.totalPrice) }
            );
            product.stock = product.stock - item.quantity;
            await product.save();
            resolve(true);
          }
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  refundItem(item: any) {
    return new Promise((resolve, reject) => {
      Item.findById(item.itemId, async function (err: any, doc: any) {
        if (err) reject(err);
        doc.stock = doc.stock + parseInt(item.quantity)
        doc.save().then(async (result: any) => {
          try {
            const remainingCoins: any = await Credit.find({});
            const { credit, _id } = remainingCoins[0];
            const availableCoins = await Credit.findOneAndUpdate(
              { _id },
              { credit: credit + parseInt(item.totalPrice) }
            );
            resolve(true)
          } catch (error) {
            reject(error)
          }
        })
      })
    })
  }

}

const itemService = new ItemService();

export { itemService };