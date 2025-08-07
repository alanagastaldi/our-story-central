import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import type { Column, Task } from './KanbanBoard';

interface KanbanColumnProps {
  column: Column;
  onCreateTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const getColumnColor = (columnId: string) => {
  switch (columnId) {
    case 'todo':
      return 'border-red-200 bg-red-50';
    case 'doing':
      return 'border-blue-200 bg-blue-50';
    case 'done':
      return 'border-green-200 bg-green-50';
    default:
      return 'border-gray-200 bg-gray-50';
  }
};

const KanbanColumn = ({ column, onCreateTask, onEditTask, onDeleteTask }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: 'column',
      column,
    },
  });

  return (
    <Card className={`${getColumnColor(column.id)} min-h-[400px]`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            {column.title}
            <span className="text-sm font-normal text-muted-foreground">
              ({column.tasks.length})
            </span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCreateTask}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent ref={setNodeRef} className="space-y-3">
        <SortableContext
          items={column.tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))}
        </SortableContext>
        {column.tasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">Nenhuma tarefa</p>
            <Button
              variant="ghost"
              onClick={onCreateTask}
              className="mt-2 text-xs"
            >
              + Adicionar primeira tarefa
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KanbanColumn;