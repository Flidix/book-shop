import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateBookDto {
    avatar: string
    @IsString()
    title: string

    @IsString()
    author: string

    @IsNotEmpty()

    price: number
}