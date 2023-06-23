import { type Optional} from "sequelize"

export interface UserAttributes {
    id?: string
    username: string
    email: string
    password: string
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export interface BasicSocialSchema {
    id: string | null
    linked: boolean
}

export interface SocialAttributes {
    id?: string
    activision?: SocialSchema
    userId: string
}

export interface SocialCreationAttributes extends Optional<SocialAttributes, "id"> {}