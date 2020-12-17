export enum ButtonType {
    SUCCESS,
    DANGER,
    END_TURN,
    CHANGE_ORIGIN,
    CHANGE_DESTINATION,
    SET_TRAIN
}

export const buttonTypeToClassName: {[key: number]: string} = {
    [ButtonType.SUCCESS]: 'Success',
    [ButtonType.DANGER]: 'Danger',
    [ButtonType.END_TURN]: 'EndTurn',
    [ButtonType.CHANGE_ORIGIN]: 'ChangeOrigin',
    [ButtonType.CHANGE_DESTINATION]: 'ChangeDestination',
    [ButtonType.SET_TRAIN]: 'SetTrain'
};