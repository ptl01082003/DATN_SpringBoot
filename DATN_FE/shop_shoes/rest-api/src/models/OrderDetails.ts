import {
  AutoIncrement,
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { OrderItems } from "./OrderItems";
import { Users } from "./Users";
import { Vouchers } from "./Vouchers";

export enum REFUND_STATUS {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

@Table({
  tableName: "order_details",
  modelName: "OrderDetails",
  timestamps: true,
})
export class OrderDetails extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public orderDetailId!: number;

  @Column
  public totals!: number;

  @Column
  public orderCode!: string;

  @Column(DataType.DECIMAL(16,2))
  public amount!: number;
  
  @Default(0)
  @Column(DataType.DECIMAL(16,2))
  public revenue!: number;

  @Column
  public name!: string;

  @Column(DataType.STRING(500))
  public address!: string;

  @ForeignKey(() => Vouchers)
  @Column
  public voucherId?: number;

  @BelongsTo(() => Vouchers)
  public voucher?: Vouchers;

  @Column
  public transId!: string;

  @Column
  public phone!: string;

  @ForeignKey(() => Users)
  @Column
  public userId!: number;

  @BelongsTo(() => Users)
  public user!: Users;

  @HasMany(() => OrderItems)
  public orderItems!: OrderItems[];

  @Column
  public refundStatus?: REFUND_STATUS;
 
  @Column(DataType.DECIMAL(16,2))
  public refundAmount?: number;

  @BeforeCreate
  static genaratorOrderCode(instance: OrderDetails) {
    instance.orderCode = uuidv4().slice(0, 8).toUpperCase();
  }
}
