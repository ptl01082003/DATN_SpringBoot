import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { CartItems } from "./CartItems";
import { Users } from "./Users";

@Table({
  tableName: "shopping_carts",
  modelName: "ShoppingCarts",
  timestamps: true,
})
export class ShoppingCarts extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public cartId!: number;

  @Column
  public totals!: number;

  @Column
  public amount!: number;

  @ForeignKey(() => Users)
  @Column
  public userId!: number;

  @BelongsTo(() => Users)
  public users!: Users;

  @HasMany(() => CartItems, "cartId")
  public cartItems!: CartItems[];
}
