import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { GroupUser, GroupUserId } from './GroupUser';
import type { Group, GroupId } from './Group';
import type { Message, MessageId } from './Message';

export interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

export type UserPk = "id";
export type UserId = User[UserPk];
export type UserCreationAttributes = Optional<UserAttributes, UserPk>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: number;
  username!: string;
  password!: string;

  // User hasMany GroupUser via user_id
  group_users!: GroupUser[];
  getGroup_users!: Sequelize.HasManyGetAssociationsMixin<GroupUser>;
  setGroup_users!: Sequelize.HasManySetAssociationsMixin<GroupUser, GroupUserId>;
  addGroup_user!: Sequelize.HasManyAddAssociationMixin<GroupUser, GroupUserId>;
  addGroup_users!: Sequelize.HasManyAddAssociationsMixin<GroupUser, GroupUserId>;
  createGroup_user!: Sequelize.HasManyCreateAssociationMixin<GroupUser>;
  removeGroup_user!: Sequelize.HasManyRemoveAssociationMixin<GroupUser, GroupUserId>;
  removeGroup_users!: Sequelize.HasManyRemoveAssociationsMixin<GroupUser, GroupUserId>;
  hasGroup_user!: Sequelize.HasManyHasAssociationMixin<GroupUser, GroupUserId>;
  hasGroup_users!: Sequelize.HasManyHasAssociationsMixin<GroupUser, GroupUserId>;
  countGroup_users!: Sequelize.HasManyCountAssociationsMixin;
  // User belongsToMany Group via user_id and group_id
  groups!: Group[];
  getGroups!: Sequelize.BelongsToManyGetAssociationsMixin<Group>;
  setGroups!: Sequelize.BelongsToManySetAssociationsMixin<Group, GroupId>;
  addGroup!: Sequelize.BelongsToManyAddAssociationMixin<Group, GroupId>;
  addGroups!: Sequelize.BelongsToManyAddAssociationsMixin<Group, GroupId>;
  createGroup!: Sequelize.BelongsToManyCreateAssociationMixin<Group>;
  removeGroup!: Sequelize.BelongsToManyRemoveAssociationMixin<Group, GroupId>;
  removeGroups!: Sequelize.BelongsToManyRemoveAssociationsMixin<Group, GroupId>;
  hasGroup!: Sequelize.BelongsToManyHasAssociationMixin<Group, GroupId>;
  hasGroups!: Sequelize.BelongsToManyHasAssociationsMixin<Group, GroupId>;
  countGroups!: Sequelize.BelongsToManyCountAssociationsMixin;
  // User hasMany Message via created_by
  messages!: Message[];
  getMessages!: Sequelize.HasManyGetAssociationsMixin<Message>;
  setMessages!: Sequelize.HasManySetAssociationsMixin<Message, MessageId>;
  addMessage!: Sequelize.HasManyAddAssociationMixin<Message, MessageId>;
  addMessages!: Sequelize.HasManyAddAssociationsMixin<Message, MessageId>;
  createMessage!: Sequelize.HasManyCreateAssociationMixin<Message>;
  removeMessage!: Sequelize.HasManyRemoveAssociationMixin<Message, MessageId>;
  removeMessages!: Sequelize.HasManyRemoveAssociationsMixin<Message, MessageId>;
  hasMessage!: Sequelize.HasManyHasAssociationMixin<Message, MessageId>;
  hasMessages!: Sequelize.HasManyHasAssociationsMixin<Message, MessageId>;
  countMessages!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    User.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'my_schema',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return User;
  }
}
