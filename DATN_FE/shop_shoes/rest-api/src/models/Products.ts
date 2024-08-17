import {
  AutoIncrement,
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { genaratorProductsId } from "../utils/utils";
import { Brands } from "./Brands";

import { Materials } from "./Materials";
import { Origins } from "./Origins";
import { Styles } from "./Styles";
import { DataTypes } from "sequelize";
import { ProductDetails } from "./ProductDetails";
import { Images } from "./Images";

@Table({
  tableName: "products",
  modelName: "Products",
  timestamps: true,
})
export class Products extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public productId!: number;

  @Column
  public name!: string;

  @Column(DataType.STRING(6))
  public code!: string;

  @Column(DataType.DECIMAL(16, 2))
  public importPrice!: number;

  @Column(DataType.DECIMAL(16, 2))
  public price?: number;

  @Column(DataType.DECIMAL(16, 2))
  public priceDiscount?: number;

  @Column({
    type: DataTypes.BOOLEAN,
  })
  public status?: boolean;

  @Column
  public display?: boolean;

  @Column(DataType.TEXT("long"))
  public description?: string;

  @ForeignKey(() => Origins)
  @Column
  public originId?: number;

  @BelongsTo(() => Origins)
  public origin?: Origins;

  @ForeignKey(() => Styles)
  @Column
  public styleId?: number;

  @BelongsTo(() => Styles)
  public style?: Styles;

  @ForeignKey(() => Materials)
  @Column
  public materialId?: number;

  @BelongsTo(() => Materials)
  public material?: Materials;

  @ForeignKey(() => Brands)
  @Column
  public brandId?: number;

  @BelongsTo(() => Brands)
  public brand?: Brands;

  @HasMany(() => ProductDetails)
  public productDetails?: ProductDetails[];

  @HasMany(() => Images)
  public gallery!: Images[];

  @BeforeCreate
  static genaratorProductCode(instance: Products) {
    const uuid = uuidv4();
    instance.priceDiscount = instance.price;
    instance.productId = genaratorProductsId();
    instance.code = uuid.slice(0, 6).toUpperCase();
  }
  @BeforeUpdate
  static updateProducts(instance: Products) {
    instance.priceDiscount = instance.price;
  }
}
