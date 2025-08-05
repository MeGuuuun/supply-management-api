import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoryService} from "./category.service";
import { Category } from "./category.entity";
import {CategoryRequestDto } from "./category.dto";

@Controller('categories')  // URL 경로 접두사
export class CategoryController {
    constructor(private readonly supplyService: CategoryService) {}


}