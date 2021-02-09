# ✨ Phoenix.eco

 [![downloadsBadge](https://img.shields.io/npm/dt/phoenix.eco?style=for-the-badge)](https://npmjs.com/phoenix.eco)
[![versionBadge](https://img.shields.io/npm/v/phoenix.eco?style=for-the-badge)](https://npmjs.com/phoenix.eco)

 # Features
- 🔋 Global Economy
- 🔌 Simple And Easy To Get Started
- 🚀 Super-powerful
- 🕸️ User Friendly
 # 📌 Installation
```bash
npm i phoenix.eco
```
# 🔋 Examples
- Bal command
```js
const { Client } = require('phoenix.eco')
const eco = new Client('mongodb://localhost/phoenixeco')
 
    const member = message.mentions.members.first() || message.member;
 
    const user = await eco.find(member.id); // Get the user from the database.
 
    const embed = new MessageEmbed()
    .setTitle(`${member.user.username}'s Balance`)
    .setDescription(`Wallet: ${user.wallet}
    Bank: ${user.coinsInBank}/${user.bankSpace}
    Networth: ${user.coinsInBank + user.wallet}`);
    
    message.channel.send(embed);
    ```
    
 - Give money
 
 ```js
const { Client } = require('phoenix.eco')
const eco = new Client('mongodb://localhost/phoenixeco')
async function givecoins() {
eco.give(message.author.id, 12)

}
giveCoins()
```
- Deduct Money
 ```js
const { Client } = require('phoenix.eco')
const eco = new Client('mongodb://localhost/phoenixeco')
async function deductcoins() {
eco.deductCoins(message.author.id, 12)

}
deductCoins()
```
- Add bank space
```js
const { Client } = require('phoenix.eco')
const eco = new Client('mongodb://localhost/phoenixeco')
async function hmm() {
await eco.addbankspace(message.author.id, 12)

}
hmm()
```

- New User
```js
const { Client } = require('phoenix.eco')
const eco = new Client('mongodb://localhost/phoenixeco')
async function user() {
await eco.newUser(message.author.id)

}
user()
```
- Delete User
```js
const { Client } = require('phoenix.eco')
const eco = new Client('mongodb://localhost/phoenixeco')
async function user() {
await eco.deleteUser(message.author.id)

}
user()
```
- Leaderboard
```js
const { Client } = require('phoenix.eco')
const eco = new Client('mongodb://localhost/phoenixeco')
async function user() {
await eco.generateLeaderboard(10)

}
user()
```


 
    
    
