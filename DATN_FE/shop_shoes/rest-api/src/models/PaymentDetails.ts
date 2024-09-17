import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import { OrderDetails } from "./OrderDetails";

export enum PAYMENT_PROVIDER {
  CASH = "CASH",
  MOMO = "MOMO",
  VN_PAY = "VN_PAY",
}

export enum PAYMENT_STATUS {
  IDLE = "IDLE",
  ERRORS = "ERRORS",
  SUCCESS = "SUCCESS",
  CASH = "CASH",
}

@Table({
  tableName: "payment_details",
  modelName: "PaymentDetails",
  timestamps: true,
})
export class PaymentDetails extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public paymentDetailId!: number;

  @ForeignKey(() => OrderDetails)
  @Column
  public orderDetailId!: number;

  @Default(PAYMENT_STATUS.IDLE)
  @Column
  public status!: string;

  @Column(DataType.DECIMAL(16,2))
  public amount!: number;

  @Column
  public provider!: string;

  @BelongsTo(() => OrderDetails)
  public orderDetail!: OrderDetails;
}
