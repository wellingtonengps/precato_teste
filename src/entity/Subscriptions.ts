import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Message_Flow } from "./Message_flow";

@Entity()
export class Subscriptions {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ type: "varchar", length: 100, unique: true })
  email: string

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  subscription_date: Date

  @ManyToOne(() => Message_Flow, (message_flow) => message_flow.template_email)
  last_message: Message_Flow

  @Column()
  active: boolean
}