import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const Vehicle = sequelize.define('Vehicle', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    plate: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacityKG: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('disponivel', 'em_rota', 'manutencao'),
        allowNull: false,
        defaultValue: 'disponivel'
    },
    currentLocation: {
        type: DataTypes.JSONB,
        allowNull: false
    }
})

export default Vehicle