class SearchApiClass{
    constructor(query,queryStr){
     this.query = query,
     this.queryStr = queryStr
    }
    search(){
        const keyword = this.queryStr.keyword?{
          name:{
           $regex:this.queryStr.keyword,
           $options:'i'
          }
        }:{}
        this.query = this.query.find({...keyword});
        return this
    };
   filter(){
     const copyStr = ({...this.queryStr})
     const removeItem = ['keyword','page','limit'];
     removeItem.forEach((key)=>delete copyStr[key]);
     let itemStr = JSON.stringify(copyStr);
     itemStr = itemStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
     this.query = this.query.find(JSON.parse(itemStr))
     return this
   };
   pagination(pagiItem){
    const currentItem = Number(this.queryStr.page) || 1;
    const skip = currentItem * (currentItem-1);
    this.query = this.query.limit(pagiItem).skip(skip)
    return this
   }
}

module.exports = SearchApiClass