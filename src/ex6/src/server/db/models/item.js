'use strict';
import { Model, DataTypes } from 'sequelize';
class Item extends Model {
  static init(sequelize) {
    super.init({
      ItemName: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    }, {
      sequelize,
      modelName: 'Item',
    });
  }
  
  static associate(Model) {

  }
};

export default Item;