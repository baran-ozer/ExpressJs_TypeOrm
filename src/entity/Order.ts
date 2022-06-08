import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable() // required to specify that this is the owner side of the relationship.
  products: Product[];

  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" }) // note: we need create orders property in the User class
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
