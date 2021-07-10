import React, {DragEvent, useState} from 'react';
import s from './DND.module.css'

type CardType = { id: number, order: number, text: string }

export const DND: React.FC = props => {

    const {} = props

    const [cardList, setCardList] = useState<Array<CardType>>([
        {id: 1, order: 3, text: 'CARD 1'},
        {id: 2, order: 1, text: 'CARD 2'},
        {id: 3, order: 2, text: 'CARD 3'},
        {id: 4, order: 4, text: 'CARD 4'},
    ])
    const [currentCard, setCurrentCard] = useState<CardType | null>(null)

    const dragStartHandler = (e: DragEvent<HTMLDivElement>, card: CardType) => {
        setCurrentCard(card)
    }

    const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    }

    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const dropHandler = (e: DragEvent<HTMLDivElement>, card: CardType) => {
        e.preventDefault()
        if (currentCard) {
            setCardList(cardList.map(c => {
                if (c.id === card.id) {
                    return {...c, order: currentCard.order}
                }
                if (c.id === currentCard.id) {
                    return {...c, order: card.order}
                }
                return c
            }))
        }
    }

    const sortCards = (a: CardType, b: CardType) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    return (
        <div className={s.cardList}>
            {cardList.sort(sortCards).map(card =>
                <div className={s.card}
                     onDragStart={(e) => dragStartHandler(e, card)}
                     onDragLeave={(e) => dragEndHandler(e)}
                     onDragEnd={(e) => dragEndHandler(e)}
                     onDragOver={(e) => dragOverHandler(e)}
                     onDrop={(e) => dropHandler(e, card)}
                     draggable={"true"}
                >
                    {card.text}
                </div>
            )}
        </div>
    );
}