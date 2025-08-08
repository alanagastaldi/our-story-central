import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Task } from './KanbanBoard';

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TaskCard = ({ task, isOverlay = false, onEdit, onDelete }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
  const isDueSoon = task.dueDate && 
    new Date(task.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) &&
    new Date(task.dueDate) >= new Date();

  if (isOverlay) {
    return (
      <Card className="bg-white shadow-lg border-2 border-wedding-primary/50 rotate-3">
        <CardContent className="p-4">
          <h3 className="font-medium text-sm mb-2">{task.title}</h3>
          {task.description && (
            <p className="text-xs text-muted-foreground mb-2">{task.description}</p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'bg-white border shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing',
        isDragging && 'opacity-50',
        isOverdue && 'border-blue-300',
        isDueSoon && !isOverdue && 'border-yellow-300'
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-sm leading-tight flex-1">{task.title}</h3>
          <div className="flex gap-1 ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
              className="h-6 w-6 p-0 hover:bg-blue-100"
            >
              <Edit2 className="h-3 w-3 text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="h-6 w-6 p-0 hover:bg-blue-100"
            >
              <Trash2 className="h-3 w-3 text-blue-600" />
            </Button>
          </div>
        </div>

        {task.description && (
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            {task.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2 items-center">
          {task.dueDate && (
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs px-2 py-0.5",
                isOverdue && "border-blue-300 text-blue-700 bg-blue-50",
                isDueSoon && !isOverdue && "border-yellow-300 text-yellow-700 bg-yellow-50"
              )}
            >
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(task.dueDate)}
            </Badge>
          )}
          
          <Badge variant="secondary" className="text-xs px-2 py-0.5">
            <Clock className="h-3 w-3 mr-1" />
            {formatDate(task.createdAt)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;