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
import { Products } from "./Products";
import { ShoppingCarts } from "./ShoppingCarts";
import { ProductDetails } from "./ProductDetails";

@Table({
  tableName: "cart_items",
  modelName: "CartItems",
  timestamps: true,
})
export class CartItems extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public cartItemId!: number;

  @ForeignKey(() => ProductDetails)
  @Column
  public productDetailId!: number;

  @ForeignKey(() => ShoppingCarts)
  @Column
  public cartId!: number;

  @BelongsTo(() => ProductDetails)
  public productDetails!: ProductDetails;

  @BelongsTo(() => ShoppingCarts)
  public carts!: ShoppingCarts;

  @Column
  public quanity!: number;

  @Column
  public amount!: number;
}
