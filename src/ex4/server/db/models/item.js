'use strict';
import { Model, DataTypes } from 'sequelize';
  class Item extends Model {
    static init(sequelize){
      super.init({
        ItemName: DataTypes.STRING,
        status: DataTypes.BOOLEAN
      }, {
        sequelize,
        modelName: 'Item',
      });
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(Model) {
      // define association here
    }
  };

export default Item;