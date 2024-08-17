import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

export enum ROLE_TYPES {
  USER = "USER",
  ADMIN = "ADMIN",
  MEMBERSHIP = "MEMBERSHIP",
}

@Table({
  tableName: "roles",
  modelName: "Roles",
  timestamps: true,
})
export class Roles extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public roleId!: number;

  @Column
  public type!: string;
}
