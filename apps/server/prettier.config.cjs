// @ts-ignore
module.exports = {
  ...require('@chatpal/prettier-config'),
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['<THIRD_PARTY_MODULES>', '^[../]', '^[./]'],
};
