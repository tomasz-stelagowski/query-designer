import { OrderType } from "../../expression-tree/OrderType";
import { Column } from "./column";
import { ComparableInterface } from "./comparableInterface"
import { autoserializeAs, autoserialize } from "../../serialize";


export class Order implements ComparableInterface {
    @autoserializeAs(Column) readonly column: Column;
    @autoserialize readonly orderType: OrderType;
    @autoserialize readonly orderTypeName: string;

    constructor(column: Column, orderType: OrderType, orderTypeName: string) {
        this.column = column;
        this.orderType = orderType;
        this.orderTypeName = orderTypeName;
    }

    get copy(): Order {
        return new Order(this.column.copy, this.orderType, this.orderTypeName);
    }

    isEqual(order: Order): boolean {
        if (this.column.isEqual(order.column) && this.orderType == order.orderType)
            return true;
        else
            return false;
    }

    get message() {
        return this.column.simpleName + " " + this.orderTypeName;
    }
}