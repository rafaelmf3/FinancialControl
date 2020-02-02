import Sequelize, { Model } from 'sequelize';

class Expense extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        value: Sequelize.INTEGER,
        integralized: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasOne(models.CostCenter, {
      foreignKey: 'cost_center_id',
      as: 'costCenter',
    });
  }
}

export default Expense;
