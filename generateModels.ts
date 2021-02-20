import SequelizeAuto from 'sequelize-auto';

let directory = './models/programmatic-without-schema';
let schema = undefined;

if (process.env.SCHEMA) {
  directory = './models/programmatic-with-schema';
  schema = process.env.SCHEMA;
}

const sequelizeAuto = new SequelizeAuto('postgres', 'postgres', 'postgres', {
  caseFile: 'p',
  caseModel: 'p',
  dialect: 'postgres',
  directory,
  host: 'localhost',
  indentation: 2,
  lang: 'ts',
  port: 5440,
  schema,
  singularize: true,
  spaces: true,
});

sequelizeAuto.run();
