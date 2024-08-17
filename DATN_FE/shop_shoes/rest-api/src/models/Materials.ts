import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "materials",
  modelName: "Materials",
  timestamps: true,
})
export class Materials extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public materialId!: number;

  @Column
  public name!: string;
}
