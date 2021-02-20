See https://github.com/sequelize/sequelize-auto/issues/501

A small-scale reproduction of an issue with `sequelize-auto` generating
invalid models when including the `schema` flag.

The main issue seems to be the generation of `references`.

When run without a schema flag references look like:

```
references: {
  model: 'groups',
  key: 'id'
}
```

When run with a schema flag references look like:

```
references: {
  model: {
    tableName: 'groups',
    schema: 'public'
  },
  key: 'id'
}
```

The best example can be seen in model `GroupUsers.ts` for each respective
generation method.

An example compilation error as a result of the reference difference when
specifying the schema flag is:

```
src/models/public/GroupUser.ts:41:15 - error TS2322: Type 'string' is not assignable to type '<M extends Model<any, any>>(this: ModelStatic<M>, schema: string, options?: SchemaOptions | undefined) => (new () => M) & typeof Model'.

41               schema: 'public',
```

A `create.sql` file has been included in `infrastructure/sql` to
demonstrate the schema used to create this example.

To run:

- Assumes Postgres 12 running on localhost
- User postgres
- Password postgres
- Database name postgres
- Port 5440

Any changes to this will need to be reflected in the `package.json` file, as
well as `./generateModels.ts`.

NPM script `npm run models` will generate models programmatically and via CLI,
both with and without the schema flag.
