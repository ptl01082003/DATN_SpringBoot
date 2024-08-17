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
  tableName: "images",
  modelName: "Images",
  timestamps: true,
})
export class Images extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public imageId!: number;

  @Column
  public path!: string;

  @ForeignKey(() => Products)
  @Column
  public productId?: number;

  @BelongsTo(() => Products)
  public products?: Products;
}
