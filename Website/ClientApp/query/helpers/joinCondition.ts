import { Column } from "./column";
import { autoserializeAs } from "../../serialize";

export class JoinCondition {
    @autoserializeAs(Column) left: Column;
    @autoserializeAs(Column) right: Column;
}