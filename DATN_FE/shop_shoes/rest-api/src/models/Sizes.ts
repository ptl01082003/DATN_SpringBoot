// models/Sizes.ts
import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";

@Table({
  tableName: "sizes",
  modelName: "Sizes",
  timestamps: true,
})
export class Sizes extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  sizeId!: number;

  @Column
  name!: number;
}
