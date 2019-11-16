const uuid = require('uuid/v4')
const fs = require('fs')
const path = require('path')

class Course{
    constructor(title,price,img){
        this.title = title
        this.price = price
        this.img = img
        this.id = uuid()
    }

    toJSON(){
        return {
            id:this.id,
            title:this.title,
            price:this.price,
            img:this.img
        }
    }
    async save(){
        const courses = await Course.getAll()
        // console.log(courses)
        courses.push(this.toJSON())
        return new Promise((resolve,reject)=>{
            fs.writeFile(path.join(__dirname,'..','data','courses.json'),JSON.stringify(courses),(err)=>{
                if(err) {
                    reject(err)
                }
                else
                {
                    resolve()
                }
            })
        })
    }
    static getAll(){
        return new Promise((resolve,reject)=>{
            fs.readFile(path.join(__dirname,'..','data','courses.json'),'utf-8',(err,content)=>{
                if(err) {
                    reject(err)
                }
                else
                {
                    resolve(JSON.parse(content))
                }
            })
        })
    }
    static async getId(id){
        const courses = await Course.getAll()
        return courses.find(c=>c.id === id)
    }
    static async updateById(updatedCourse){
        const courses = await Course.getAll()
        const index = courses.findIndex(c=> c.id === updatedCourse.id)
        courses[index] = updatedCourse
        
        return new Promise((resolve,reject)=>{
            fs.writeFile(path.join(__dirname,'..','data','courses.json'),JSON.stringify(courses),(err)=>{
                if(err) {
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

module.exports = Course