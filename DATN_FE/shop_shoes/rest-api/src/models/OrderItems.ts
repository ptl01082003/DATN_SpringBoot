import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { OrderDetails, REFUND_STATUS } from "./OrderDetails";
import { ProductDetails } from "./ProductDetails";

export enum ODER_STATUS {
  DA_GIAO = "DA_GIAO",
  DA_HUY = "DA_HUY",
  TRA_HANG = "TRA_HANG",
  CHO_LAY_HANG = "CHO_LAY_HANG",
  CHO_XAC_NHAN = "CHO_XAC_NHAN",
  CHO_GIAO_HANG = "CHO_GIAO_HANG",
  CHO_THANH_TOAN = "CHO_THANH_TOAN",
  KHONG_DU_SO_LUONG = "KHONG_DU_SO_LUONG",
  KHONG_THANH_CONG = "KHONG_THANH_CONG",
  NHAP_KHO = "NHAP_KHO",
}

export enum RETURN_STATUS {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

@Table({
  tableName: "order_items",
  modelName: "OrderItems",
  timestamps: true,
})
export class OrderItems extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public orderItemId!: number;

  @Column(DataType.DECIMAL(16,2))
  public amount!: number;

  @Default(ODER_STATUS.CHO_THANH_TOAN)
  @Column
  public status!: string;

  @Column
  public returnStatus?: REFUND_STATUS;

  @Column(DataType.DECIMAL(16,2))
  public price!: number;
  
  @Column(DataType.DECIMAL(16,2))
  public priceDiscount!: number;

  @Column
  public userId!: number;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  public isReview!: boolean;

  @Column
  public quanity!: number;

  @ForeignKey(() => ProductDetails)
  @Column
  public productDetailId!: number;

  @ForeignKey(() => OrderDetails)
  @Column
  public orderDetailId!: number;

  @BelongsTo(() => ProductDetails)
  public productDetails!: ProductDetails;

  @BelongsTo(() => OrderDetails)
  public orderDetails!: OrderDetails;
}
