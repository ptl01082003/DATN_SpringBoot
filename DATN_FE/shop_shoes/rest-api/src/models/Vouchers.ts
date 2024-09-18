import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { UserVouchers } from "./UserVouchers";
import { OrderDetails } from "./OrderDetails";

export enum Vouchers_TYPE {
  PERCENT = "PERCENT",
}

export enum Vouchers_STATUS {
  ISACTIVE = "ISACTIVE",
  EXPIRED = "EXPIRED",
  UNUSED = "UNUSED",
}

export enum Voucher_RULE {
  MIN_ORDER_VALUE = "MIN_ORDER_VALUE",
  NEW_ACCOUNT = "NEW_ACCOUNT",
  ORDER_COUNT = "ORDER_COUNT",
}
@Table({
  tableName: "vouchers",
  modelName: "Vouchers",
  timestamps: true,
})
export class Vouchers extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public voucherId!: number;

  @Column
  public code!: string;

  @Column(DataType.TEXT("long"))
  public description?: string;

  @Column(DataType.DECIMAL(16, 2))
  public valueOrder!: number;

  @Column(DataType.DECIMAL(16, 2))
  public discountMax!: number;

  @Column(DataType.DATE)
  public startDay!: string;

  @Column(DataType.DATE)
  public endDay!: string;

  @Column(DataType.DECIMAL(16, 2))
  public discountValue!: number;

  @Column
  public quantity!: number;

  @Default(Vouchers_STATUS.ISACTIVE)
  @Column
  public status?: string;

  @Default(Vouchers_TYPE.PERCENT)
  @Column
  public typeValue?: string;

  @Column
  public ruleType?: string;

  @Column(DataType.DECIMAL(16, 2))
  public minOrderValue?: number;

  @Column
  public minOrderCount?: number;

  @Column
  public maxOrderCount?: number;

  @HasMany(() => UserVouchers)
  public userVouchers!: UserVouchers[];

  @HasMany(() => OrderDetails)
  public orderDetails!: OrderDetails[];
}
