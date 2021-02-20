import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Group, GroupId } from './Group';
import type { User, UserId } from './User';

export interface GroupUserAttributes {
  group_id: number;
  user_id: number;
}

export type GroupUserPk = "group_id" | "user_id";
export type GroupUserId = GroupUser[GroupUserPk];
export type GroupUserCreationAttributes = Optional<GroupUserAttributes, GroupUserPk>;

export class GroupUser extends Model<GroupUserAttributes, GroupUserCreationAttributes> implements GroupUserAttributes {
  group_id!: number;
  user_id!: number;

  // GroupUser belongsTo Group via group_id
  group!: Group;
  getGroup!: Sequelize.BelongsToGetAssociationMixin<Group>;
  setGroup!: Sequelize.BelongsToSetAssociationMixin<Group, GroupId>;
  createGroup!: Sequelize.BelongsToCreateAssociationMixin<Group>;
  // GroupUser belongsTo User via user_id
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof GroupUser {
    GroupUser.init({
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'groups',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'group_users',
    schema: 'my_schema',
    timestamps: false,
    indexes: [
      {
        name: "group_users_pkey",
        unique: true,
        fields: [
          { name: "group_id" },
          { name: "user_id" },
        ]
      },
    ]
  });
  return GroupUser;
  }
}
   unique: true,
        fields: [
          { name: "group_id" },
          { name: "user_id" },
        ]
      },
    ]
  });
  return GroupUser;
  }
}
