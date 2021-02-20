import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { GroupUser, GroupUserId } from './GroupUser';
import type { User, UserId } from './User';

export interface GroupAttributes {
  id: number;
  username: string;
  password: string;
}

export type GroupPk = "id";
export type GroupId = Group[GroupPk];
export type GroupCreationAttributes = Optional<GroupAttributes, GroupPk>;

export class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
  id!: number;
  username!: string;
  password!: string;

  // Group hasMany GroupUser via group_id
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
  // Group belongsToMany User via group_id and user_id
  users!: User[];
  getUsers!: Sequelize.BelongsToManyGetAssociationsMixin<User>;
  setUsers!: Sequelize.BelongsToManySetAssociationsMixin<User, UserId>;
  addUser!: Sequelize.BelongsToManyAddAssociationMixin<User, UserId>;
  addUsers!: Sequelize.BelongsToManyAddAssociationsMixin<User, UserId>;
  createUser!: Sequelize.BelongsToManyCreateAssociationMixin<User>;
  removeUser!: Sequelize.BelongsToManyRemoveAssociationMixin<User, UserId>;
  removeUsers!: Sequelize.BelongsToManyRemoveAssociationsMixin<User, UserId>;
  hasUser!: Sequelize.BelongsToManyHasAssociationMixin<User, UserId>;
  hasUsers!: Sequelize.BelongsToManyHasAssociationsMixin<User, UserId>;
  countUsers!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Group {
    Group.init({
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
    tableName: 'groups',
    schema: 'my_schema',
    timestamps: false,
    indexes: [
      {
        name: "groups_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Group;
  }
}
