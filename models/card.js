const fs = require('fs')
const path = require('path')

class Card{
    static async add(course){
        const allItems = await Card.getItems()
        if(allItems.courses)
        {
            const index = allItems.courses.findIndex(c=>c.id === course.id)
            if(allItems.courses[index])
            {
                allItems.courses[index].count++
                allItems.price+=parseInt(course.price)
            }
            else
            {
                course.count = 1
                allItems.courses.push(course)
                allItems.price+=parseInt(course.price)
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
    static async remove(id){
        const card = await Card.getItems()
        const idx = card.courses.findIndex(c=>c.id === id)
        const course = card.courses[idx]

        if(course.count === 1){
            card.courses = card.courses.filter(c=>c.id !== id)
        }
        else{
            card.courses[idx].count--
        }
        card.price-=course.price

        return new Promise((resolve,reject)=>{
            fs.writeFile(path.join('data','itemsInCard.json'),JSON.stringify(card),(err)=>{
                if(err){
                    reject(err)
                }
                else
                {
                    resolve(card)
                }
            })
        })
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