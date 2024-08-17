// models/Sizes.ts
import {
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import { ProductDetails } from "./ProductDetails";
import { ReviewerPhoto } from "./ReviewerPhoto";
import { Users } from "./Users";

@Table({
    tableName: "reviewers",
    modelName: "Reviewers",
    timestamps: true,
})
export class Reviewers extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    reviewerId!: number;

    @Column(DataType.FLOAT)
    stars!: number;

    @Column
    contents!: string;

    @Column
    public productId!: number;

    @ForeignKey(() => ProductDetails)
    @Column
    public productDetailId!: number;

    @ForeignKey(() => Users)
    @Column
    public userId!: number;

    @BelongsTo(() => Users)
    public user!: Users;

    @HasMany(() => ReviewerPhoto)
    public reviewerPhoto?: ReviewerPhoto[];
}
