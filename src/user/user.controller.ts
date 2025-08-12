import {Controller, Get, Post, Body, Param, Query, Patch} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

import { UserService } from "./user.service";
import { UserRequestDto } from "./user.dto";
import { User} from "./user.entity";

@ApiTags("사용자 API")
@Controller('users')
export class UserController {
    constructor(
        private readonly userService:UserService
    ) {}

    // 새 사용자 등록
    @ApiOperation({ summary: '새 사용자 등록' })
    @Post()
    async addUser(@Body() userRequestDto:UserRequestDto): Promise<User>{
        return this.userService.addUser(userRequestDto);
    }

}