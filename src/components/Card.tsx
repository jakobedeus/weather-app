import React, { useRef } from 'react'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import ItemTypes from './ItemTypes'
import { XYCoord } from 'dnd-core'

const style = {
    border: '1px solid gray',
    borderRadius: '4px',
    padding: '20px ',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move'
}

export interface CardProps {
    id: any
    text: string
    index: number
    moveCard: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
    index: number
    id: string
    type: string
}
const Card: React.FC<CardProps> = ({ id, text, index, moveCard }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item: DragItem, monitor: DropTargetMonitor) {
        if (!ref.current) {
        return
        }
        const dragIndex = item.index
        const hoverIndex = index

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
        return
        }

        // Determine rectangle on screen
        const hoverBoundingRect = ref.current!.getBoundingClientRect()

        // Get vertical middle
        const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        // Determine mouse position
        const clientOffset = monitor.getClientOffset()

        // Get pixels to the top
        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
        }

        // Time to actually perform the action
        moveCard(dragIndex, hoverIndex)

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex
    },
    })

    const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor: any) => ({
        isDragging: monitor.isDragging(),
    }),
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))
    return (
    <div className="list-item" ref={ref} style={{ ...style, opacity }}>
        {text}
        <button className="remove">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
        </svg>
        </button>
    </div>
    )
}

export default Card
