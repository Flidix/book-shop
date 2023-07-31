import { BaseEntity } from '@shared/database/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { databaseTables } from '@shared/database/constants';
import { UserEntity } from '../../user/entities/user.entity';


@Entity({ name: databaseTables.orders })
export class OrderEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, user => user.orders)
  user: UserEntity;

  @Column({ default: false })
  isPaid: boolean;

  @Column({ default: 0 })
  price: number;
}
