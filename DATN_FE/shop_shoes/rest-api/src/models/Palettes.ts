import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "palettes",
  modelName: "Palettes",
  timestamps: true,
})
export class Palettes extends Model {
  @PrimaryKey
  @Column
  public colorCode!: string;

  @Column
  public name!: string;
}
