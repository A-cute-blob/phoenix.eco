let db = require('mongoose')
let eco = require('./schemas/eco')

db.set('useFindAndModify', false)
/**
*
*
* @class Client
* @param key
* @example const eco = require('phoenix.eco')
* const  db = new eco.Client('mongodb url')
*
*
*/
class Client {
constructor(url) {
      if (!url) throw new TypeError("You didn't provide a MongoDB connection string");
  return await db.connect(url, {
useNewUrlParser: true,
useUnifiesTopology: true
})
}

/**
*
*@param {string} userId -  A valid user id
*
*/

static async find(id) {
if(!id) throw new TypeError("Please provide a user id")
let user = await eco.findOne({ userId: id});
        if (!user) return false;
if(user) return user;

}
 
/**
*
*
* @param {string} userId - A valid discord user id
* @param {number} amount - amount of the coins
*/

static async give(id, amount) {
if(!id) throw new TypeError("Please provide a user id")

        if (!amount) throw new TypeError("You didn't provide an amount of coins.");
if(isNaN(amount)) throw new Error("The amount must be a number.")
if(amount < 0) throw new TypeError("The amount cannot be under 0")

        let user = await eco.findOne({ userId: id});

        if (!user) {
            const newData = new currencyModel({
                userId: id,
                bankSpace: 1000,
                coinsInBank: 0,
                coinsInWallet: parseInt(amount)
            });

            await newData.save()
            .catch(err => console.log(err));
            
            return amount;
        }

        user.coinsInWallet += parseInt(amount);

        await user.save()
        .catch(err => console.log(err));

        return amount;
}
    /**
     * 
     * @param {string} userId - A discord user ID.
     * @param {string} amount - Amount of coins to deduct.
     */
    static async deductCoins(userId, amount) {
        if (!userId) throw new TypeError("You didn't provide a user ID.");
       
        if (!amount) throw new TypeError("You didn't provide an amount of coins.");
        if (isNaN(amount)) throw new TypeError("The amount must be a number.");
        if (amount < 0) throw new TypeError("New amount must not be under 0.");

        let user = await eco.findOne({ userId: userId });

        if (!user) {
            const newData = new currencyModel({
                userId: userId,
 
                bankSpace: 1000,
                coinsInBank: 0,
                coinsInWallet: 0
            });

            await newData.save()
            .catch(err => console.log(err));
            
            return amount;
        }

        if (amount > user.coinsInWallet) {
            user.coinsInWallet -= user.coinsInWallet;

            await user.save()
            .catch(err => console.log(err));

            return amount;
        }

        user.coinsInWallet -= parseInt(amount);

        await user.save()
        .catch(err => console.log(err));

        return amount;
    }
}
module.exports = {
    version: require('./package.json').version,
    Client: Client
}