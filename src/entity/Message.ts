import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Subscriptions } from "./Subscriptions";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  message: string

  @ManyToOne(() => Subscriptions, (subscriptions) => subscriptions.name)
  template_name: Subscriptions
}