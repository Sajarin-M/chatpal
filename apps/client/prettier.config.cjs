module.exports = {
  ...require('@chatpal/prettier-config'),
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^react',
    '<THIRD_PARTY_MODULES>',
    '^[$]utils',
    '^[$]hooks',
    '^[$]context',
    '^[$]components',
    '^[$]',
    '^[../]',
    '^[./]',
    '^[$]types',
  ],
};
