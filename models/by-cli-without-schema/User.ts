import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { GroupUser, GroupUserId } from './GroupUser';
import type { Group, GroupId } from './Group';
import type { Message, MessageCreationAttributes, MessageId } from './Message';

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
  user_group_users!: GroupUser[];
  getUser_group_users!: Sequelize.HasManyGetAssociationsMixin<GroupUser>;
  setUser_group_users!: Sequelize.HasManySetAssociationsMixin<GroupUser, GroupUserId>;
  addUser_group_user!: Sequelize.HasManyAddAssociationMixin<GroupUser, GroupUserId>;
  addUser_group_users!: Sequelize.HasManyAddAssociationsMixin<GroupUser, GroupUserId>;
  createUser_group_user!: Sequelize.HasManyCreateAssociationMixin<GroupUser>;
  removeUser_group_user!: Sequelize.HasManyRemoveAssociationMixin<GroupUser, GroupUserId>;
  removeUser_group_users!: Sequelize.HasManyRemoveAssociationsMixin<GroupUser, GroupUserId>;
  hasUser_group_user!: Sequelize.HasManyHasAssociationMixin<GroupUser, GroupUserId>;
  hasUser_group_users!: Sequelize.HasManyHasAssociationsMixin<GroupUser, GroupUserId>;
  countUser_group_users!: Sequelize.HasManyCountAssociationsMixin;
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
  // User hasOne Message via id
  id_message!: Message;
  getId_message!: Sequelize.HasOneGetAssociationMixin<Message>;
  setId_message!: Sequelize.HasOneSetAssociationMixin<Message, MessageId>;
  createId_message!: Sequelize.HasOneCreateAssociationMixin<MessageCreationAttributes>;

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
    schema: 'public',
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
y: true
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
