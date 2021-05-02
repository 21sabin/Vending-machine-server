import { Credit } from '../models';

class CreditService {

  getInitialCredit() {
    return new Promise(async (resolve, reject) => {
      try {
        const credit = await Credit.find();
        resolve(credit);
      } catch (error) {
        reject(error);
      }
    })
  }

  createCredit() {
    return new Promise(async (resolve, reject) => {
      try {
        await Credit.create({ credit: 100 })
        resolve({ success: true })
      } catch (error) {
        reject(error)
      }
    })
  }
}

const creditService = new CreditService();

export { creditService };