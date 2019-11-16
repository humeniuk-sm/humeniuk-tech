const fs = require('fs')
const path = require('path')

class Card{
    static async add(course){
        const allItems = await Card.getItems()
        if(allItems.items)
        {
            const index = allItems.items.findIndex(c=>c.id === course.id)
            if(allItems.items[index])
            {
                allItems.items[index].count++
                allItems.totalPrice+=parseInt(course.price)
            }
            else
            {
                course.count = 1
                allItems.items.push(course)
                allItems.totalPrice+=parseInt(course.price)
            }
            return new Promise((resolve,reject)=>{
                fs.writeFile(path.join('data','itemsInCard.json'),JSON.stringify(allItems),(err)=>{
                    if(err){
                        reject(err)
                    }
                    else
                    {
                        resolve()
                    }
                })
            })
        }
    }
    static async remove(courseId){
        const allItems = await Card.getItems()
        if(allItems.items)
        {
            const index = allItems.items.findIndex(c=>c.id === courseId)
            console.log(index)
            if(allItems.items[index]!==null)
            {
                allItems.totalPrice -= allItems.items[index].price * allItems.items[index].count
                allItems.items.splice(index,1)
                console.log('here')
            }
            console.log(allItems)
            return new Promise((resolve,reject)=>{
                fs.writeFile(path.join('data','itemsInCard.json'),JSON.stringify(allItems),(err)=>{
                    if(err){
                        reject(err)
                    }
                    else
                    {
                        resolve()
                    }
                })
            })
        }
    }
    static async getItems(){
        return new Promise((resolve,reject)=>{
            fs.readFile(path.join('data','itemsInCard.json'),(err,content)=>{
                if(err){
                    reject(err)
                }
                else
                {
                    resolve(JSON.parse(content))
                }
            })
        })
    }
}
module.exports = Card