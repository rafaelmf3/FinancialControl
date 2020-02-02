import Sequelize, { Model } from 'sequelize';

class CostCenter extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        category: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default CostCenter;
