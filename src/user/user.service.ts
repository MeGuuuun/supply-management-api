import {Injectable} from "@nestjs/common";
import { Repository } from 'typeorm';
import {User} from "./user.entity";
import { UserRequestDto } from "./user.dto";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    //새 유저 등록
    async addUser(userRequestDto: UserRequestDto): Promise<User> {
        const newUser = this.userRepository.create(userRequestDto);

        return await this.userRepository.save(newUser);
    }

}