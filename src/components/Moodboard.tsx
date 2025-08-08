import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Upload, 
  FolderPlus, 
  Edit2, 
  Trash2, 
  Share, 
  Image, 
  Video, 
  MoreVertical,
  X,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MoodboardItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
}

interface MoodboardFolder {
  id: string;
  name: string;
  items: MoodboardItem[];
  createdAt: Date;
}

const Moodboard = () => {
  const [folders, setFolders] = useState<MoodboardFolder[]>([
    {
      id: '1',
      name: 'Decoração',
      items: [
        { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=300&fit=crop', name: 'Flores' },
        { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=300&h=300&fit=crop', name: 'Centro de mesa' }
      ],
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'Vestidos',
      items: [
        { id: '3', type: 'image', url: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=300&fit=crop', name: 'Vestido 1' }
      ],
      createdAt: new Date()
    }
  ]);
  
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolder, setEditingFolder] = useState<string | null>(null);
  const [editFolderName, setEditFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedFolderData = folders.find(f => f.id === selectedFolder);

  const createFolder = () => {
    if (!newFolderName.trim()) return;
    
    const newFolder: MoodboardFolder = {
      id: Date.now().toString(),
      name: newFolderName,
      items: [],
      createdAt: new Date()
    };
    
    setFolders([...folders, newFolder]);
    setNewFolderName('');
    setIsCreatingFolder(false);
    toast.success("Pasta criada com sucesso!");
  };

  const deleteFolder = (folderId: string) => {
    setFolders(folders.filter(f => f.id !== folderId));
    if (selectedFolder === folderId) {
      setSelectedFolder(null);
    }
    toast.success("Pasta excluída com sucesso!");
  };

  const renameFolder = (folderId: string) => {
    if (!editFolderName.trim()) return;
    
    setFolders(folders.map(f => 
      f.id === folderId ? { ...f, name: editFolderName } : f
    ));
    setEditingFolder(null);
    setEditFolderName('');
    toast.success("Pasta renomeada com sucesso!");
  };

  const handleFileUpload = (folderId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newItem: MoodboardItem = {
          id: Date.now().toString() + Math.random(),
          type: file.type.startsWith('image/') ? 'image' : 'video',
          url: e.target?.result as string,
          name: file.name
        };

        setFolders(folders.map(f =>
          f.id === folderId 
            ? { ...f, items: [...f.items, newItem] }
            : f
        ));
      };
      reader.readAsDataURL(file);
    });

    toast.success("Arquivos adicionados com sucesso!");
  };

  const deleteItem = (folderId: string, itemId: string) => {
    setFolders(folders.map(f =>
      f.id === folderId
        ? { ...f, items: f.items.filter(item => item.id !== itemId) }
        : f
    ));
    toast.success("Item removido com sucesso!");
  };

  const shareFolder = (folderId: string) => {
    const folder = folders.find(f => f.id === folderId);
    if (folder) {
      // Simular compartilhamento
      toast.success(`Link da pasta "${folder.name}" copiado para área de transferência!`);
    }
  };

  if (selectedFolder) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setSelectedFolder(null)}
              className="flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Voltar</span>
            </Button>
            <h2 className="text-2xl font-bold">{selectedFolderData?.name}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline"
              onClick={() => shareFolder(selectedFolder)}
              className="flex items-center space-x-2"
            >
              <Share className="h-4 w-4" />
              <span>Compartilhar</span>
            </Button>
            <Button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-foreground hover:bg-foreground/90 text-background flex items-center space-x-2"
            >
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => handleFileUpload(selectedFolder, e)}
            />
          </div>
        </div>

        {selectedFolderData?.items.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Image className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Pasta vazia</h3>
                <p className="text-gray-600">Adicione suas primeiras inspirações</p>
              </div>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-foreground hover:bg-foreground/90 text-background"
              >
                Fazer upload
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {selectedFolderData?.items.map((item) => (
              <div key={item.id} className="group relative">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {item.type === 'image' ? (
                    <img 
                      src={item.url} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <Video className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => deleteItem(selectedFolder, item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600 truncate">{item.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Moodboard</h2>
        <Button 
          onClick={() => setIsCreatingFolder(true)}
          className="bg-foreground hover:bg-foreground/90 text-background flex items-center space-x-2"
        >
          <FolderPlus className="h-4 w-4" />
          <span>Nova Pasta</span>
        </Button>
      </div>

      {/* Create Folder Dialog */}
      <Dialog open={isCreatingFolder} onOpenChange={setIsCreatingFolder}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Nova Pasta</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="folder-name">Nome da pasta</Label>
              <Input
                id="folder-name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Ex: Decoração, Vestidos, Flores..."
                onKeyPress={(e) => e.key === 'Enter' && createFolder()}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreatingFolder(false)}>
                Cancelar
              </Button>
              <Button onClick={createFolder} className="bg-foreground hover:bg-foreground/90 text-background">
                Criar Pasta
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Folders Grid */}
      {folders.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <FolderPlus className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Nenhuma pasta criada</h3>
              <p className="text-gray-600">Crie sua primeira pasta de inspirações</p>
            </div>
            <Button 
              onClick={() => setIsCreatingFolder(true)}
              className="bg-foreground hover:bg-foreground/90 text-background"
            >
              Criar primeira pasta
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {folders.map((folder) => (
            <Card 
              key={folder.id} 
              className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group"
              onClick={() => setSelectedFolder(folder.id)}
            >
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg truncate">{folder.name}</CardTitle>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Gerenciar Pasta</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-name">Renomear pasta</Label>
                            <div className="flex space-x-2">
                              <Input
                                id="edit-name"
                                value={editingFolder === folder.id ? editFolderName : folder.name}
                                onChange={(e) => {
                                  setEditingFolder(folder.id);
                                  setEditFolderName(e.target.value);
                                }}
                              />
                              <Button 
                                onClick={() => renameFolder(folder.id)}
                                className="bg-foreground hover:bg-foreground/90 text-background"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <Button 
                              variant="outline"
                              onClick={() => shareFolder(folder.id)}
                              className="flex items-center space-x-2"
                            >
                              <Share className="h-4 w-4" />
                              <span>Compartilhar</span>
                            </Button>
                            <Button 
                              variant="destructive"
                              onClick={() => deleteFolder(folder.id)}
                              className="flex items-center space-x-2"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Excluir</span>
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {folder.items.length} {folder.items.length === 1 ? 'item' : 'itens'}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 h-24">
                  {folder.items.slice(0, 4).map((item, index) => (
                    <div 
                      key={item.id} 
                      className={cn(
                        "bg-gray-100 rounded overflow-hidden",
                        index >= 2 && folder.items.length <= 2 ? "col-span-2" : ""
                      )}
                    >
                      {item.type === 'image' ? (
                        <img 
                          src={item.url} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Video className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                  ))}
                  {folder.items.length === 0 && (
                    <div className="col-span-2 flex items-center justify-center bg-gray-50 rounded">
                      <FolderPlus className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Moodboard;