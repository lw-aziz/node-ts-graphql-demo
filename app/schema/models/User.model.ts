import { Optional } from 'sequelize';
import { Table, Column, Model, HasMany, PrimaryKey, DataType, CreatedAt, BeforeSave } from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import Event from './Event.model';
import Invitation from './Invitation.model';

interface UserAttributes {
  readonly id: typeof DataType.UUID;
  name: string;
  email: string;
  password: string;
  readonly createdAt: Date;
  readonly updatedAt?: Date;
  readonly deletedAt?: Date;
  verifyPassword: (inputPassword: string) => Promise<boolean>;
}
export interface UserInput extends Optional<Omit<UserAttributes, 'id' | 'createdAt' | 'verifyPassword'>, 'name'> { }
export interface UserOutput extends UserAttributes { }


@Table({
  timestamps: true,
  paranoid: true,
  modelName: 'User',
  tableName: 'users',
  underscored: true,
})
export default class User extends Model<UserAttributes, UserInput> implements UserAttributes {

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4
  })
  readonly id!: typeof DataType.UUID;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  name !: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email!: string;

  @CreatedAt
  createdAt!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @HasMany(() => Event, 'userId')
  events!: Event[];
  
  @HasMany(() => Invitation, 'invitedTo')
  eventInvitation!: Invitation[];
  
  @HasMany(() => Invitation, 'invitedBy')
  eventInvitationSent!: Invitation[];


  @BeforeSave
  static async hashPassword(instance: User): Promise<void> {
    if (instance.changed('password')) {
      const saltRounds = 10; // You can adjust the number of salt rounds for bcrypt as per your requirements.
      const hashedPassword = await bcrypt.hash(instance.password, saltRounds);
      instance.password = hashedPassword;
    }
  }

  // Function to verify password during login
  public async verifyPassword(inputPassword: string): Promise<boolean> {
    return await bcrypt.compare(inputPassword, this.password);
  }
};