import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Orphanage from './Orphanage';

@Entity({ name: 'users' })
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Orphanage, (orphanage) => orphanage.user, {
    cascade: ['update'],
  })
  @JoinColumn({ name: 'user_id' })
  orphanages: Orphanage[];

  checkPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  generateToken() {
    const jwtSecret = process.env.APP_SECRET as string;

    return jwt.sign({ id: this.id }, jwtSecret, {
      expiresIn: '10h',
    });
  }
}
