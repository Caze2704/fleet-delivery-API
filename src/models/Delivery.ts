import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const Delivery = sequelize.define('Delivery', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    trackingCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    weightKG: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    destination: {
        type: DataTypes.JSONB,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('aguardando_coleta', 'em_transito', 'entregue', 'cancelada'),
        allowNull: false,
        defaultValue: 'aguardando_coleta'
    },
    vehicleId: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null
    }
})

export default Delivery