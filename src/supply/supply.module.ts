import {Global, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supply } from './supply.entity';
import { SupplyService } from './supply.service';
import { SupplyController } from './supply.controller';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Supply])],
    providers: [SupplyService],
    controllers: [SupplyController],
})
export class SupplyModule {}