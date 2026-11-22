import app from './app'
import sequelize from './config/db'

const port = 3000

async function start(){
    try {
        await sequelize.authenticate()
        console.log('banco conectado')

        await sequelize.sync()

        app.listen(port, () => console.log("Servidor on"))
    } catch (error) {
        console.log(error)
    }
}

start()