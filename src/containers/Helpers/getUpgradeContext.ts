import { Upgrade, UpgradeType } from "nardis-game";


export interface TrainUpgradeContext {
    speed: number,
    upkeep: number
};


const getContext = (initialValue: number, type: UpgradeType, upgrades: Upgrade[]): number => {
    const relevantUpgrades: Upgrade[] = upgrades.filter(e => e.type === type);
    if (relevantUpgrades.length > 0 && initialValue > 0) {
        relevantUpgrades.forEach(e => {
            if (type === UpgradeType.TrainSpeedQuicker) {
                initialValue += Math.floor(initialValue * e.value);
            } else {
                initialValue -= Math.floor(initialValue * e.value);
            }
        });
    }
    return initialValue;
}

const getTrainUpgradeContext = (
    speed: number, 
    upkeep: number,
    upgrades: Upgrade[]
): TrainUpgradeContext => ({
    speed: getContext(speed, UpgradeType.TrainSpeedQuicker, upgrades),
    upkeep: getContext(upkeep, UpgradeType.TrainUpkeepCheaper, upgrades)
});


export default getTrainUpgradeContext;