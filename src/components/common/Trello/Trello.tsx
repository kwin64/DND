import React, {DragEvent, useState} from 'react';
import s from './Trello.module.css'

type BoardType = { id: number, title: string, items: Array<ItemType> }
type ItemType = { id: number, title: string }

export const Trello: React.FC = props => {

    const [boards, setBoards] = useState<Array<BoardType>>([
        {
            id: 1, title: 'Сделать', items: [
                {id: 1, title: 'Пойти в магазин'},
                {id: 2, title: 'Выкинуть мусор'},
                {id: 3, title: 'Покушать'}
            ]
        },
        {
            id: 2, title: 'Проверить', items: [
                {id: 4, title: 'Код ревью'},
                {id: 5, title: 'Задача на факториал'},
                {id: 6, title: 'Задача на фибоначи'}
            ]
        },
        {
            id: 3, title: 'Сделано', items: [
                {id: 7, title: 'Снять видео'},
                {id: 8, title: 'Смонтировать'},
                {id: 9, title: 'Отрендерить'}
            ]
        },
    ])
    const [currentBoard, setCurrentBoard] = useState<null | BoardType>(null)
    const [currentItem, setCurrentItem] = useState<null | ItemType>(null)


    const dragStartHandler = (e: DragEvent<HTMLDivElement>, board: BoardType, item: ItemType) => {
        if (board && item) {
            setCurrentBoard(board)
            setCurrentItem(item)
        }
    }

    const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    }

    const dragOverHandler = (e: DragEvent<HTMLDivElement>, board: BoardType, item: ItemType) => {
        e.preventDefault()
    }

    const dropHandler = (e: DragEvent<HTMLDivElement>, board: BoardType, item: ItemType) => {
        e.preventDefault()
        if (currentBoard && currentItem) {
            const currentIndex = currentBoard.items.indexOf(currentItem)
            currentBoard.items.splice(currentIndex, 1)
            const dropIndex = board.items.indexOf(item)
            board.items.splice(dropIndex + 1, 0, currentItem)
            setBoards(boards.map(b => {
                if (b.id === board.id) {
                    return board
                }
                if (b.id === currentBoard.id) {
                    return currentBoard
                }
                return b
            }))
        }

    }

    return (
        <div className={s.container}>
            {boards.map(board =>
                <div className={s.board}>
                    <div className={s.boardTitle}>{board.title}</div>
                    {board.items.map(item =>
                        <div draggable={"true"}
                             className={s.item}
                             onDragOver={(e) => dragOverHandler(e, board, item)}
                             onDragLeave={(e) => dragEndHandler(e)}
                             onDragStart={(e) => dragStartHandler(e, board, item)}
                             onDragEnd={(e) => dragEndHandler(e)}
                             onDrop={(e) => dropHandler(e, board, item)}
                        >
                            {item.title}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}