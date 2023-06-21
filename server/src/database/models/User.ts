import { Table, Column, Model, PrimaryKey, Unique, DataType, Default, HasOne, AllowNull } from "sequelize-typescript"
import { Social } from "./Social"
import { UserAttributes, UserCreationAttributes } from "../../types/models"

@Table({
    timestamps: true
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id?: string

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    username!: string
    
    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    email!: string

    @AllowNull(false)
    @Column(DataType.STRING)
    password!: string
    
    @HasOne(() => Social)
    social!: Social
}