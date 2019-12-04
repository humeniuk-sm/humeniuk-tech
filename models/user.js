const {Schema,model} = require('mongoose')

const user = new Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    cart:{
        items:[
            {
                count:{
                    type:Number,
                    required:true,
                    default:1
                },
                courseId:{
                    type:Schema.Types.ObjectId,
                    ref: 'Course',
                    required:true,
                }
            }
        ]
    }
})

user.methods.removeFromCart = function(id){
    let clonedItems = [...this.cart.items]
    const idx  = clonedItems.findIndex(c=>{
        console.log(c.courseId._id,id)
        return c.courseId._id.toString() === id.toString()
    })
    if(idx!=-1){
        if(clonedItems[idx].count === 1)
        {
            clonedItems = clonedItems.filter(c=>c.courseId.toString()!==id.toString())
        }
        else{
            clonedItems[idx].count--
        }
        const newCart = {items:clonedItems}
        this.cart = newCart
        return this.save()
    }
    else{
        return this.save()
    }
}

user.methods.addToCart = function(course){
    const clonedItems = [...this.cart.items]
    const idx  = clonedItems.findIndex(c=>{
        return c.courseId.toString() === course._id.toString()
    })
    if(idx >= 0){
        clonedItems[idx].count = clonedItems[idx].count +1
    }
    else{
        clonedItems.push({
            count:1,
            courseId:course.id
        })
    }
    const newCart = {items:clonedItems}
    this.cart = newCart
    return this.save()
}
module.exports = model('User',user)