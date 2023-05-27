import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    type Sequelize,
} from "sequelize"

module.exports = (sequelize: Sequelize, DataTypes: any) => {
    class User extends Model<
        InferAttributes<User>,
        InferCreationAttributes<User>
    > {
        declare id: CreationOptional<string>
        declare username: string
        declare email: string
        declare password: string

        static associate(models: any) {
            User.belongsTo(models.Project)
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            password: { type: DataTypes.STRING },
        },
        {
            sequelize,
            timestamps: true,
            paranoid: true,
        }
    )
}
