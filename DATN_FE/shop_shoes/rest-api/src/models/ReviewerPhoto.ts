import {
    AutoIncrement,
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { Reviewers } from "./Reviewers";

@Table({
    tableName: "reviewer_photo",
    modelName: "ReviewerPhoto",
    timestamps: true,
})
export class ReviewerPhoto extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    photoId!: number;

    @Column
    public path!: string;

    @ForeignKey(() => Reviewers)
    @Column
    public reviewerId!: number;

    @BelongsTo(() => Reviewers)
    public reviewer!: Reviewers;
}
