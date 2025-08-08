import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FolderOpen, Download, Share2, Image, Video } from "lucide-react";

interface PhotoFolder {
  id: string;
  name: string;
  photoCount: number;
  videoCount: number;
  lastUpdated: string;
}

const PhotoGallery = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Mock data - em produção seria conectado ao Google Drive
  const folders: PhotoFolder[] = [
    {
      id: "1",
      name: "Fotos da Maria",
      photoCount: 12,
      videoCount: 3,
      lastUpdated: "2 horas atrás"
    },
    {
      id: "2", 
      name: "Família do João",
      photoCount: 8,
      videoCount: 1,
      lastUpdated: "1 dia atrás"
    },
    {
      id: "3",
      name: "Amigos da faculdade",
      photoCount: 25,
      videoCount: 5,
      lastUpdated: "3 horas atrás"
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && newFolderName.trim()) {
      setIsUploading(true);
      // Simular upload
      setTimeout(() => {
        setIsUploading(false);
        setNewFolderName("");
        alert(`${files.length} arquivo(s) enviado(s) para a pasta "${newFolderName}"!`);
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="border-dashed border-2 border-foreground">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Upload className="w-5 h-5" />
            Compartilhe suas Fotos e Vídeos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="folder-name">Nome da sua pasta</Label>
            <Input
              id="folder-name"
              placeholder="Ex: Fotos da Alana"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file-upload">Selecione arquivos</Label>
            <Input
              id="file-upload"
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileUpload}
              disabled={!newFolderName.trim()}
            />
          </div>

          {isUploading && (
            <div className="text-center text-sm text-muted-foreground">
              Enviando arquivos... ⏳
            </div>
          )}
        </CardContent>
      </Card>

      {/* Folders Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Pastas Compartilhadas</h3>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Baixar Todas
            </Button>
            <Button size="sm" variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {folders.map((folder) => (
            <Card 
              key={folder.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
              onClick={() => setSelectedFolder(selectedFolder === folder.id ? null : folder.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-foreground rounded-lg flex items-center justify-center">
                    <FolderOpen className="w-6 h-6 text-wedding-dark" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium text-sm">{folder.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Image className="w-3 h-3" />
                        {folder.photoCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        {folder.videoCount}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{folder.lastUpdated}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Selected Folder Content */}
      {selectedFolder && (
        <Card className="animate-in slide-in-from-bottom-4 duration-300">
          <CardHeader>
            <CardTitle>
              {folders.find(f => f.id === selectedFolder)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Mock photos/videos grid */}
              {Array.from({length: 8}).map((_, i) => (
                <div 
                  key={i}
                  className="aspect-square bg-foreground/10 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                >
                  {i % 3 === 0 ? (
                    <Video className="w-8 h-8 text-muted-foreground" />
                  ) : (
                    <Image className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Baixar Pasta
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PhotoGallery;