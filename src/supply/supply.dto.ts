export class SupplyRequestDto {
    name: string;
    quantity: number;
    categoryId: string;
}

export class SupplyResponseDto {
    supply_id: string;
    name: string;
    quantity: number;
    status: string;
    categoryId: string;

    constructor(supply: Partial<SupplyResponseDto>) {
        this.supply_id = supply.supply_id;
        this.name = supply.name;
        this.quantity = supply.quantity;
        this.status = supply.status;
        this.categoryId = supply.categoryId;
    }
}