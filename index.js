const express = require("express");
const path = require("path");

// создаем объект приложения
const app = express();
app.use("/static",express.static(path.join(__dirname,"public")))

app.use("/you-music",(req,res,next)=>{
    console.log("make something for music")
    next()
})
// определяем обработчик для маршрута "/"
app.get("/", function(request, response){
     
    // отправляем ответ
    response.sendFile(path.join(__dirname,"views","index.html"));
});
app.get("/you-music",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","you-music.html"))
})
// начинаем прослушивать подключения на 3000 порту
app.listen(3003);