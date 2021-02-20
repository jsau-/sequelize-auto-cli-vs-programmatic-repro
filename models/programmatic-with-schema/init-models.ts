import type { Sequelize, Model } from "sequelize";
import { GroupUser } from "./GroupUser";
import type { GroupUserAttributes, GroupUserCreationAttributes } from "./GroupUser";
import { Group } from "./Group";
import type { GroupAttributes, GroupCreationAttributes } from "./Group";
import { Message } from "./Message";
import type { MessageAttributes, MessageCreationAttributes } from "./Message";
import { User } from "./User";
import type { UserAttributes, UserCreationAttributes } from "./User";

export {
  GroupUser,
  Group,
  Message,
  User,
};

export type {
  GroupUserAttributes,
  GroupUserCreationAttributes,
  GroupAttributes,
  GroupCreationAttributes,
  MessageAttributes,
  MessageCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  GroupUser.initModel(sequelize);
  Group.initModel(sequelize);
  Message.initModel(sequelize);
  User.initModel(sequelize);

  Group.belongsToMany(User, { through: GroupUser as typeof Model, foreignKey: "group_id", otherKey: "user_id" });
  User.belongsToMany(Group, { through: GroupUser as typeof Model, foreignKey: "user_id", otherKey: "group_id" });
  GroupUser.belongsTo(Group, { as: "group", foreignKey: "group_id"});
  Group.hasMany(GroupUser, { as: "group_users", foreignKey: "group_id"});
  GroupUser.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(GroupUser, { as: "group_users", foreignKey: "user_id"});
  Message.belongsTo(User, { as: "created_by_user", foreignKey: "created_by"});
  User.hasMany(Message, { as: "messages", foreignKey: "created_by"});

  return {
    GroupUser: GroupUser,
    Group: Group,
    Message: Message,
    User: User,
  };
}
