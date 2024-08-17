import {
  AutoIncrement,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Products } from "./Products";
import { Sizes } from "./Sizes";

@Table({
  tableName: "product_details",
  modelName: "ProductDetails",
  timestamps: true,
})
export class ProductDetails extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public productDetailId!: number;

  @ForeignKey(() => Sizes)
  @Column
  public sizeId!: number;

  @ForeignKey(() => Products)
  @Column
  public productId!: number;

  @Default(0)
  @Column
  public sellQuanity!: number;

  @Column
  public quantity!: number;

  @Default(0)
  @Column
  public numberStatistics!: number;

  @BelongsTo(() => Sizes)
  public sizes!: Sizes;

  @BelongsTo(() => Products)
  public products!: Products;
}
