const settings = require('../settings')
const mysql = require('mysql2')

class DbMysql{
    constructor(db){
        this.connection = mysql.createConnection({
            host:settings.MYSQL.host,
            user:settings.MYSQL.user,
            database:db,
            password:settings.MYSQL.password
        })
        this.connection.connect((err)=>{
        })
    }
    close(){
        this.connection.end((err)=>{
        })
    }
    getAll(table){
        return new Promise((resolve,reject)=>{
            this.connection.query(`SELECT * FROM ${table}`,function(err,result){
                if(err){
                    reject(err)
                }
                else{
                    resolve(result)
                }
            })
        })
    }
    update(table,field,value){
        return new Promise((resolve,reject)=>{
            this.connection.query(`UPDATE ${table} SET is_published=1 WHERE ${field}=${value}`,function(err,result){
                if(err){
                    reject(err)
                }
                else{
                    resolve(result)
                }
            })
        })
    }
    insertTo(table,data){
        const keys=Object.keys(data)
        const values = Object.values(data)

        this.connection.query(`INSERT INTO ${table}(${keys.join()}) VALUES(${values.join()}) `,
            (err, results)=>{
            });
    }
}
module.exports = DbMysql