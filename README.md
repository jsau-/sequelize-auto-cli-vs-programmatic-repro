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

When run programmatically references look like:

```
references: {
  model: {
    tableName: 'groups',
    schema: 'public'
  },
  key: 'id'
}
```

A `create.sql` file has been included in `infrastructure/sql` to
demonstrate the schema used to create this example.
