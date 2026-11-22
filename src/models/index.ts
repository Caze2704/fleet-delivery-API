import Delivery from "./Delivery";
import Vehicle from "./Vehicle";

Vehicle.hasMany(Delivery, { foreignKey: 'vehicleId'})
Delivery.belongsTo(Vehicle, { foreignKey: 'vehicleId'})

export { Vehicle, Delivery};