import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { OrderDetails } from "./OrderDetails";
import { ProductDetails } from "./ProductDetails";
import { Users } from "./Users";

export enum RETURN_STATUS {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

@Table({
  tableName: "return_requests",
  modelName: "ReturnRequests",
  timestamps: true,
})
export class ReturnRequests extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public returnRequestId!: number;

  @ForeignKey(() => OrderDetails)
  @Column
  public orderId!: number;

  @ForeignKey(() => ProductDetails)
  @Column
  public productId!: number;

  @Column
  public quantity!: number;

  @Column(DataType.TEXT)
  public reason!: string;

  @Default(RETURN_STATUS.PENDING)
  @Column
  public status!: string;

  @Column
  public requestDate!: Date;

  @Column
  public processDate!: Date;

  @ForeignKey(() => Users)
  @Column
  public userId!: number;
}
