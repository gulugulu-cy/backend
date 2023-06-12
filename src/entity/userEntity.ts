import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserModel {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  @Column({ name: 'username', type: 'varchar' })
  username: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'nickname', type: 'varchar' })
  nickname: string;
}
