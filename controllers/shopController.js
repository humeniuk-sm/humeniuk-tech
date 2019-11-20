const path = require('path')
const Course = require('../models/course')
const Card = require('../models/card')

exports.index = async (request,response)=>{
    const courses = await Course.getAll()
    response.render(path.join('shop','index'),{title:'Магазин курсів',courses})
}
exports.course = async (request,response)=>{
    const id = request.params.id
    const course = await Course.getId(id)
    response.render(path.join('shop','course'),{title:'Магазин курсів',course})
}
exports.addCourse = (request,response)=>{
    response.render(path.join('shop','addCourse'))
}
exports.saveCourse = async (request,response)=>{
    const course = new Course(request.body.title,request.body.price,request.body.img)
    await course.save()
    response.render(path.join('shop','saveCourse'))
}
exports.editCourse = async(request,response)=>{
    const id = request.params.id
    const course = await Course.getId(id)
    response.render(path.join('shop','editCourse'),{course})
}
exports.updateCourse = async (request,response)=>{
    const course = request.body
    await Course.updateById(course)
    return response.redirect(path.join('/shop','/'))
}
exports.addToCard = async(request,response)=>{
    const id = request.params.id
    const course = await Course.getId(id)
    await Card.add(course)
    return response.redirect(path.join('/shop','/'))
}
exports.card = async(request,response)=>{
    const card = await Card.getItems()
    response.render(path.join('shop','card'),{items:card.courses,price:card.price})
}
exports.removeFromCard = async(request,response)=>{
    const id = request.params.id
    const card = await Card.remove(id)
    response.status(200).json(card)
}