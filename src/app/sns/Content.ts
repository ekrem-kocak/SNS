import { UserDto } from "../auth/models/UserDto"

export interface Content {
    department: string
    lesson: string
    class: number
    description: string
    userDto: UserDto
}