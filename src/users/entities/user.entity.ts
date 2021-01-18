import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, name: 'first_name' })
  firstName: string;

  @Column({ length: 255, name: 'last_name' })
  lastName: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ length: 255, name: 'third_party_id' })
  thirdPartyId: string;

  @Column({ length: 255, name: 'provider' })
  provider: string;
}
