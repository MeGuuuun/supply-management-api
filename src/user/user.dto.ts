import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class UserRequestDto {
    @ApiProperty({example:'이름', description:'사용자 이름'})
    @IsNotEmpty()
    @IsString()
    name: string;
}