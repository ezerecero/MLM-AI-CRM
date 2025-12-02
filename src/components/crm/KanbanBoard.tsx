'use client';

import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

// Mock types
type Contact = {
    id: string;
    name: string;
    stage: string;
};

type Column = {
    id: string;
    title: string;
};

const defaultColumns: Column[] = [
    { id: 'NEW_LEAD', title: 'New Lead' },
    { id: 'CONTACTED', title: 'Contacted' },
    { id: 'IN_CONVERSATION', title: 'In Conversation' },
    { id: 'PRESENTATION_SENT', title: 'Presentation Sent' },
    { id: 'CLOSING', title: 'Closing' },
];

export default function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>(defaultColumns);
    const [contacts, setContacts] = useState<Contact[]>([
        { id: '1', name: 'Alice', stage: 'NEW_LEAD' },
        { id: '2', name: 'Bob', stage: 'CONTACTED' },
    ]);
    const [activeId, setActiveId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === 'Column') {
            setActiveId(event.active.id as string);
            return;
        }
    }

    function onDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        // Handle Column Dragging (if implemented)

        // Handle Card Dragging
        // Implementation simplified for MVP
    }

    return (
        <div className="flex h-full w-full overflow-x-auto p-4 gap-4">
            <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <div className="flex gap-4">
                    {columns.map((col) => (
                        <div key={col.id} className="w-80 bg-gray-100 rounded-lg p-4 flex flex-col">
                            <h3 className="font-bold mb-4">{col.title}</h3>
                            <div className="flex-1 flex flex-col gap-2">
                                {contacts.filter(c => c.stage === col.id).map(contact => (
                                    <div key={contact.id} className="bg-white p-3 rounded shadow cursor-pointer hover:shadow-md">
                                        {contact.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </DndContext>
        </div>
    );
}
