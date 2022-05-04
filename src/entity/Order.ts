import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable() // required to specify that this is the owner side of the relationship.
  products: Product[];

  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.orders) // note: we need create orders property in the User class
  user: User;
}
