let db = require('mongoose')
let eco = require('./schemas/eco')
let currencyModel = eco;
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
            const newData = new eco({
                userId: id,
                bankSpace: 1000,
                coinsInBank: 0,
                wallet: parseInt(amount)
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
            const newData = new eco({
                userId: userId,
 
                bankSpace: 1000,
                coinsInBank: 0,
                wallet: 0
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
      
        /**
     * 
     * @param {string} userId - A discord user ID.
     * @param {string} amount - Amount of bank space to give.
     */
    
      static async addbankspace(userId, amount){
            if(!userId) throw new TypeError('Please provide a user id')
            if(!amount) throw new Error('Please give me a amount for adding bankspace')
            if(isNaN(amount)) throw new Error('The amount must be a number')
            if(amount > 0) throw new Error('The ammount cannot be under 0')
                    let user = await eco.findOne({ userId: userId });

        if (!user) {
            let newData = new eco({
                userId: userId,
                bankSpace: 1000 + parseInt(amount),
                coinsInBank: 0,
                 wallet: 0
            });

            await newData.save()
            .catch(err => console.log(err));

            return amount;
        }

        user.bankSpace += parseInt(amount);

        await user.save()
        .catch(err => console.log(err));

        return amount;
    
      }
          /**
     * 
     * @param {string} userId - A discord user ID.
     */

    static async newUser(userId) {
        if (!userId) throw new TypeError("Please provide a user ID.");

        let user = await eco.findOne({ userId: userId, guildId: guildId });
        if (user) return false;

        let newData = new eco({
            userId: userId,
            bankSpace: 1000,
            coinsInBank: 0,
             wallet: 0
        });

        await newData.save()
        .catch(err => console.log(err));
    }
        /**
     * 
     * @param {string} userId - A discord user ID.
     * @param {string} guildId - A discord guild ID.
     */

    static async deleteUser(userId) {
        if (!userId) throw new TypeError("Please provide a user ID.");
       
        let user = await currencyModel.findOne({ userId: userId });
        if (!user) return false;

        await currencyModel.findOneAndRemove({ userId: userId });

        await user.save()
        .catch(err => console.log(err));
    }
      
    /**
     *
     * @param {number} amount - The amount of users to show.
     */

    static async generateLeaderboard( amount) {
        if (!amount) throw new TypeError("Please provide the amount of users to show.");
        if (isNaN(amount)) throw new TypeError("Amount must be a number");

        let users = await currencyModel.find({}).sort([['wallet', 'descending']]).exec();

        return users.slice(0, amount);
    }
}
module.exports = {
    version: require('./package.json').version,
    Client: Client
}
