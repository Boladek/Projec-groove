import { DataTypes, Model } from "sequelize";
import { projectSchema } from "../../validators/project.validators";
import { sequelize } from "../connnection";
import z from "zod";

// const { sequelize } = require("../src/database/index");
export type ProjectAttributes = z.infer<typeof projectSchema>;

class ProjectModel
  extends Model<ProjectAttributes>
  implements ProjectAttributes
{
  declare id: string;
  declare project_name: string;
  declare organiser_name: string;
  declare artist_name: string;
  declare tokens: number;
  declare worth: number;
  declare user_id: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProjectModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    project_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organiser_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tokens: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    worth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ProjectModel",
    tableName: "projects",
  }
);

export default ProjectModel;
