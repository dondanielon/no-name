import { server } from "./app"
import { sequelize } from "./database/config"

const PORT = process.env.PORT || 3000

sequelize.sync({force: true})
    .then(() => {
        server.listen(PORT, () => console.log(`server running on port ${PORT}`))
    })
    .catch((err) => {
        console.log("error in db connection or server listen")
        console.error(err)
    })