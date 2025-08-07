import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  notes?: string;
  columnId: string;
  createdAt: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'A Fazer',
    tasks: [
      {
        id: '1',
        title: 'Escolher vestido',
        description: 'Agendar prova até 15/01',
        dueDate: '2024-01-15',
        columnId: 'todo',
        createdAt: '2024-01-01',
      },
      {
        id: '2',
        title: 'Confirmar buffet',
        description: 'Degustação marcada',
        columnId: 'todo',
        createdAt: '2024-01-02',
      },
    ],
  },
  {
    id: 'doing',
    title: 'Fazendo',
    tasks: [
      {
        id: '3',
        title: 'Lista de convidados',
        description: '85% concluído',
        columnId: 'doing',
        createdAt: '2024-01-03',
      },
    ],
  },
  {
    id: 'done',
    title: 'Concluído',
    tasks: [
      {
        id: '4',
        title: 'Local da cerimônia',
        description: 'Fazenda Vista Alegre',
        columnId: 'done',
        createdAt: '2024-01-04',
      },
    ],
  },
];

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTaskColumnId, setNewTaskColumnId] = useState<string>('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'task') {
      setActiveTask(event.active.data.current.task);
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === 'task';
    const isOverTask = over.data.current?.type === 'task';
    const isOverColumn = over.data.current?.type === 'column';

    if (!isActiveTask) return;

    // Dropping a task over another task
    if (isActiveTask && isOverTask) {
      setColumns((columns) => {
        const activeColumnIndex = columns.findIndex((col) =>
          col.tasks.some((task) => task.id === activeId)
        );
        const overColumnIndex = columns.findIndex((col) =>
          col.tasks.some((task) => task.id === overId)
        );

        if (activeColumnIndex === -1 || overColumnIndex === -1) return columns;

        const activeColumn = columns[activeColumnIndex];
        const overColumn = columns[overColumnIndex];

        const activeTaskIndex = activeColumn.tasks.findIndex(
          (task) => task.id === activeId
        );
        const overTaskIndex = overColumn.tasks.findIndex(
          (task) => task.id === overId
        );

        if (activeColumnIndex === overColumnIndex) {
          // Same column
          const newTasks = arrayMove(
            activeColumn.tasks,
            activeTaskIndex,
            overTaskIndex
          );
          
          return columns.map((col, index) =>
            index === activeColumnIndex ? { ...col, tasks: newTasks } : col
          );
        } else {
          // Different columns
          const activeTask = activeColumn.tasks[activeTaskIndex];
          const newActiveColumn = {
            ...activeColumn,
            tasks: activeColumn.tasks.filter((task) => task.id !== activeId),
          };
          const newOverColumn = {
            ...overColumn,
            tasks: [
              ...overColumn.tasks.slice(0, overTaskIndex),
              { ...activeTask, columnId: overColumn.id },
              ...overColumn.tasks.slice(overTaskIndex),
            ],
          };

          return columns.map((col, index) => {
            if (index === activeColumnIndex) return newActiveColumn;
            if (index === overColumnIndex) return newOverColumn;
            return col;
          });
        }
      });
    }

    // Dropping a task over a column
    if (isActiveTask && isOverColumn) {
      setColumns((columns) => {
        const activeColumnIndex = columns.findIndex((col) =>
          col.tasks.some((task) => task.id === activeId)
        );
        const overColumnIndex = columns.findIndex((col) => col.id === overId);

        if (activeColumnIndex === -1 || overColumnIndex === -1) return columns;

        const activeColumn = columns[activeColumnIndex];
        const overColumn = columns[overColumnIndex];

        const activeTaskIndex = activeColumn.tasks.findIndex(
          (task) => task.id === activeId
        );

        if (activeColumnIndex === overColumnIndex) return columns;

        const activeTask = activeColumn.tasks[activeTaskIndex];
        const newActiveColumn = {
          ...activeColumn,
          tasks: activeColumn.tasks.filter((task) => task.id !== activeId),
        };
        const newOverColumn = {
          ...overColumn,
          tasks: [...overColumn.tasks, { ...activeTask, columnId: overColumn.id }],
        };

        return columns.map((col, index) => {
          if (index === activeColumnIndex) return newActiveColumn;
          if (index === overColumnIndex) return newOverColumn;
          return col;
        });
      });
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
  };

  const handleCreateTask = (columnId: string) => {
    setNewTaskColumnId(columnId);
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTaskColumnId('');
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setColumns((columns) =>
      columns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((task) => task.id !== taskId),
      }))
    );
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      // Edit existing task
      setColumns((columns) =>
        columns.map((col) => ({
          ...col,
          tasks: col.tasks.map((task) =>
            task.id === editingTask.id
              ? { ...task, ...taskData }
              : task
          ),
        }))
      );
    } else {
      // Create new task
      const newTask: Task = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        ...taskData,
      };

      setColumns((columns) =>
        columns.map((col) =>
          col.id === newTaskColumnId
            ? { ...col, tasks: [...col.tasks, newTask] }
            : col
        )
      );
    }
    setIsModalOpen(false);
  };

  const allTasks = columns.flatMap((col) => col.tasks);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">📝 Tarefas do Casamento</h2>
        <Button 
          onClick={() => handleCreateTask('todo')}
          className="bg-wedding-primary hover:bg-wedding-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Tarefa
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              onCreateTask={() => handleCreateTask(column.id)}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>

        {createPortal(
          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
        columnId={newTaskColumnId}
        columns={columns}
      />
    </div>
  );
};

export default KanbanBoard;