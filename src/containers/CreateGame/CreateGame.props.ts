export type InitGame = (name: string, money: number, opponents: number) => void; 

export default interface CreateGameProps {
    initGame: InitGame
}