export type TInitGame = (name: string, money: number, opponents: number) => void; 

export default interface ICreateGameProps {
    initGame: TInitGame
}