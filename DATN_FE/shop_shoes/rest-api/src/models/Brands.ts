import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "brands",
  modelName: "Brands",
  timestamps: true,
})
export class Brands extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public brandId!: number;

  @Column
  public name!: string;
}
