import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Products } from "./Products";

@Table({
  tableName: "favorites_list",
  modelName: "FavoritesList",
  timestamps: true,
})
export class FavoritesList extends Model {
  @ForeignKey(() => Products)
  @Column
  public productId!: number;

  @BelongsTo(() => Products)
  public products!: Products;
}
