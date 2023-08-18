import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey, IsAfter, DataType, CreatedAt } from 'sequelize-typescript';
import User from './User.model';
import { Optional } from 'sequelize';
import Event from './Event.model';
import { InvitationStatus } from '../../generated/graphql';


interface InvitationAttributes {
  readonly id: string;
  readonly eventId: string;
  readonly invitedBy: string;
  readonly invitedTo: string;
  status: InvitationStatus;
  readonly createdAt: Date;

  getInvitedUser(): Promise<User>;
  getInvitedByUser(): Promise<User>;
};

export interface InvitationInput extends Optional<Omit<InvitationAttributes, 'id' | 'createdAt' | 'getInvitedUser' | 'getInvitedByUser'>, 'status'> { }

export interface InvitationOutput extends InvitationAttributes {
  invitedToUser?: User;
 }

@Table({
  timestamps: true,
  paranoid: true,
  modelName: 'Invitation',
  tableName: 'invitations',
  underscored: true,
})
export default class Invitation extends  Model<InvitationAttributes, InvitationInput> implements InvitationAttributes {

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: InvitationStatus;

  @ForeignKey(() => Event)
  @Column({
    type: DataType.UUID,
  })
  eventId!: string;
  
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  invitedBy!: string;
  
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  invitedTo!: string;

  @CreatedAt
  createdAt!: Date;


  @BelongsTo(() => Event, 'eventId')
  event!: Event;
  
  @BelongsTo(() => User, 'invitedBy')
  invitedByUser!: User;
  
  @BelongsTo(() => User, 'invitedTo')
  invitedToUser!: User;

  public async getInvitedUser(): Promise<User> {
    return this.invitedToUser;
  }
  
  public async getInvitedByUser(): Promise<User> {
    return this.invitedByUser;
  }
};