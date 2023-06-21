import { Table, Column, Model, PrimaryKey, DataType, Default, BelongsTo, ForeignKey, AllowNull } from "sequelize-typescript"
import { User } from "./User"
import { BasicSocialSchema, SocialAttributes, SocialCreationAttributes } from "../../types/models"

const defaultSchema: BasicSocialSchema = { id: null, linked: false }

@Table({
    timestamps: true
})
export class Social extends Model<SocialAttributes, SocialCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id?: string

    @Default(defaultSchema)
    @Column(DataType.JSON)
    activision?: BasicSocialSchema

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    userId!: string
    
    @BelongsTo(() => User, "userId")
    user!: User
}