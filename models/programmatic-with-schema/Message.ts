import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './User';

export interface MessageAttributes {
  id: number;
  body: string;
  created_at: Date;
  created_by: number;
}

export type MessagePk = "id";
export type MessageId = Message[MessagePk];
export type MessageCreationAttributes = Optional<MessageAttributes, MessagePk>;

export class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  id!: number;
  body!: string;
  created_at!: Date;
  created_by!: number;

  // Message belongsTo User via created_by
  created_by_user!: User;
  getCreated_by_user!: Sequelize.BelongsToGetAssociationMixin<User>;
  setCreated_by_user!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createCreated_by_user!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Message {
    Message.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'users',
          schema: 'my_schema'
        },
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'messages',
    schema: 'my_schema',
    timestamps: false
  });
  return Message;
  }
}
