import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { User } from '../auth/user.entity';

@Entity('messages')
export class Message extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  sender!: User;

  @Column({ name: 'sender_id' })
  senderId!: string;

  @ManyToOne(() => User, { nullable: true })
  recipient?: User;

  @Column({ name: 'recipient_id', nullable: true })
  recipientId?: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ default: 'chat' })
  type!: 'chat' | 'announcement' | 'circular';
}
