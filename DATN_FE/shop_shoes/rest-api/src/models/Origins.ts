import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "origins",
  modelName: "Origins",
  timestamps: true,
})
export class Origins extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public originId!: number;

  @Column
  public name!: string;
}
