import {
  BeforeCreate,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { generateUniqueUserId } from "../utils/utils";
import { Roles } from "./Roles";
import { Vouchers } from "./Vouchers";
import { UserVouchers } from "./UserVouchers";

@Table({
  tableName: "users",
  modelName: "Users",
  timestamps: true,
})
export class Users extends Model {
  @PrimaryKey
  @Column
  public userId!: number;

  @Column
  public userName!: string;

  @Column
  public email!: string;

  @Column
  public phone!: string;

  @Column
  public password!: string;

  @Column({
    type: DataType.DATE,
  })
  public birth?: string;

  @Column
  public fullName!: string;

  @ForeignKey(() => Roles)
  @Default(1)
  @Column
  public roleId!: number;

  @HasMany(() => UserVouchers)
  public userVouchers!: UserVouchers[];

  @BelongsTo(() => Roles)
  public roles!: Roles;

  @BeforeCreate
  static genaratorUserId(instance: Users) {
    instance.userId = generateUniqueUserId();
  }
}
