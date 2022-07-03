import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Subscriptions } from "./Subscriptions";

@Entity()
export class Message_Flow {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Subscriptions, (subscriptions) => subscriptions.name)
  template_name: Subscriptions[]

  @Column({ type: "timestamptz" })
  position: Date
}