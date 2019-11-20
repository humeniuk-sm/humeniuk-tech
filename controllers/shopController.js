const path = require('path')
const Course = require('../models/course')

function mapCartItems(cart){
    return cart.items.map(c=>({
        ...c.courseId._doc,
        count:c.count})
    )
}
function calculatePrice(courses){
    return courses.reduce((total,course)=>{
        return total+=course.price*course.count
    },0)
}

exports.index = async (request,response)=>{
    const courses = await Course.find()
    response.render(path.join('shop','index'),{title:'Магазин курсів',courses})
}
exports.course = async (request,response)=>{
    const id = request.params.id
    const course = await Course.findById(id)
    response.render(path.join('shop','course'),{title:'Магазин курсів',course})
}
exports.addCourse = (request,response)=>{
    response.render(path.join('shop','addCourse'))
}
exports.saveCourse = async (request,response)=>{
    const course = new Course({
        title:request.body.title,
        price:request.body.price,
        img:request.body.img,
        userId:request.user._id
    })
    try {
        await course.save()
        response.render(path.join('shop','saveCourse'))
    } catch (error) {
        console.log(error)
    }
}
exports.editCourse = async(request,response)=>{
    const id = request.params.id
    const course = await Course.findById(id)
    response.render(path.join('shop','editCourse'),{course})
}
exports.updateCourse = async (request,response)=>{
    const course = request.body
    const id = course.id
    delete course.id
    await Course.findByIdAndUpdate(id,course)
    return response.redirect(path.join('/shop','/'))
}

exports.removeCourse = async(request,response)=>{
    try {
        await Course.deleteOne({
            _id:request.body.id
        })
        return response.redirect(path.join('/shop','/'))
    } catch (error) {
        console.log(error)
    }

}
exports.addToCard = async(request,response)=>{
    const id = request.params.id
    const course = await Course.findById(id)
    const user = await request.user
    await user.addToCart(course)
    return response.redirect(path.join('/shop','/'))
}
exports.card = async(request,response)=>{
    const user = await request.user
    await (user.populate('cart.items.courseId').execPopulate())
    const courses = mapCartItems(user.cart)
    const price = await calculatePrice(courses)
    response.render(path.join('shop','card'),{items:courses,price})
}
exports.removeFromCard = async(request,response)=>{
    const id = request.params.id
    await request.user.removeFromCart(id)
    const user = await request.user.populate('cart.items.courseId').execPopulate()
    const courses = mapCartItems(user.cart)
    const cart = {
        courses,price:calculatePrice(courses)
    }
    response.status(200).json(cart)
}