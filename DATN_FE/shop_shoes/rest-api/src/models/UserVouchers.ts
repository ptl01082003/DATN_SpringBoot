import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Users } from "./Users";
import { Vouchers } from "./Vouchers";

@Table({
  tableName: "user_vouchers",
  modelName: "UserVouchers",
  timestamps: true,
})
export class UserVouchers extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @ForeignKey(() => Users)
  @Column
  public userId!: number;

  @ForeignKey(() => Vouchers)
  @Column
  public voucherId!: number;

  @Column(DataType.DATE)
  public receivedAt?: string;
  @Column(DataType.DATE)
  public usedAt?: string;

  @Column
  public status?: string;

  @BelongsTo(() => Users)
  public users!: Users;

  @BelongsTo(() => Vouchers)
  public vouchers!: Vouchers;
}
