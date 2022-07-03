import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Message_Flow } from "./Message_flow";

@Entity()
export class Subscriptions {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "timestamptz" })
  subscription_date: Date

  @Column()
  name: string

  @ManyToOne(() => Message_Flow, (message_flow) => message_flow.template_name)
  last_message: Message_Flow

  @Column()
  active: boolean
}