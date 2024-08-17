import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Users } from "./Users";
import { Messages } from "./Messages";

@Table({
  tableName: "conversations",
  modelName: "Conversations",
  timestamps: true,
})
export class Conversations extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public conversationId!: number;

  @ForeignKey(() => Users)
  @Column
  public senderId!: number;

  @BelongsTo(() => Users, { as: 'sender', foreignKey: 'senderId' })
  public sender!: Users;

  @ForeignKey(() => Users)
  @Column
  public receiverId!: number;

  @BelongsTo(() => Users, { as: 'receiver', foreignKey: 'receiverId' })
  public receiver!: Users;

  @ForeignKey(() => Messages)
  @Column
  public lastMessageId!: number;

  @BelongsTo(() => Messages, { as: 'lastMessage' })
  public lastMessage!: Messages;

  @HasMany(() => Messages, { as: 'messages' })
  public messages!: Messages[];
}
