export const version: String;
export class Client{
  constructor(url: String);
  
  public find(id: String);
    public give(id: String, amount: Number)
    public deductCoins(userId: String, amount: Number)
    public addbankspace(userId: String, amount: Number)
    public newUser(userId: String)
    public deleteUser(userId: String)
    public generateLeaderboard(amount: Number)
    
    }
