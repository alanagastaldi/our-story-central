import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Trash2, Edit } from 'lucide-react';

interface StoryContent {
  id: string;
  icon: string;
  label: string;
  title: string;
  description: string;
  details: {
    [key: string]: string;
  };
  buttons: Array<{
    label: string;
    url: string;
    style: 'primary' | 'outline';
  }>;
}

interface ContentEditorProps {
  stories: StoryContent[];
  onChange: (stories: StoryContent[]) => void;
  welcomeMessage: {
    title: string;
    subtitle: string;
    description: string;
  };
  onWelcomeChange: (welcome: any) => void;
  footerText: string;
  onFooterChange: (text: string) => void;
  tabLabels: {
    info: string;
    gallery: string;
    messages: string;
  };
  onTabLabelsChange: (labels: any) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  stories,
  onChange,
  welcomeMessage,
  onWelcomeChange,
  footerText,
  onFooterChange,
  tabLabels,
  onTabLabelsChange
}) => {
  const updateStory = (index: number, updates: Partial<StoryContent>) => {
    const newStories = [...stories];
    newStories[index] = { ...newStories[index], ...updates };
    onChange(newStories);
  };

  const addDetail = (storyIndex: number) => {
    const key = `detail_${Date.now()}`;
    updateStory(storyIndex, {
      details: {
        ...stories[storyIndex].details,
        [key]: 'Novo detalhe'
      }
    });
  };

  const updateDetail = (storyIndex: number, key: string, value: string) => {
    const newDetails = { ...stories[storyIndex].details };
    newDetails[key] = value;
    updateStory(storyIndex, { details: newDetails });
  };

  const removeDetail = (storyIndex: number, key: string) => {
    const newDetails = { ...stories[storyIndex].details };
    delete newDetails[key];
    updateStory(storyIndex, { details: newDetails });
  };

  const addButton = (storyIndex: number) => {
    const newButtons = [...stories[storyIndex].buttons];
    newButtons.push({
      label: 'Novo botão',
      url: '#',
      style: 'outline'
    });
    updateStory(storyIndex, { buttons: newButtons });
  };

  const updateButton = (storyIndex: number, buttonIndex: number, updates: any) => {
    const newButtons = [...stories[storyIndex].buttons];
    newButtons[buttonIndex] = { ...newButtons[buttonIndex], ...updates };
    updateStory(storyIndex, { buttons: newButtons });
  };

  const removeButton = (storyIndex: number, buttonIndex: number) => {
    const newButtons = [...stories[storyIndex].buttons];
    newButtons.splice(buttonIndex, 1);
    updateStory(storyIndex, { buttons: newButtons });
  };

  return (
    <div className="space-y-6">
      {/* Configurações Gerais */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">📝 Configurações Gerais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs">Abas de Navegação</Label>
            <div className="grid grid-cols-1 gap-2 mt-2">
              <Input
                placeholder="Informações"
                value={tabLabels.info}
                onChange={(e) => onTabLabelsChange({ ...tabLabels, info: e.target.value })}
              />
              <Input
                placeholder="Galeria"
                value={tabLabels.gallery}
                onChange={(e) => onTabLabelsChange({ ...tabLabels, gallery: e.target.value })}
              />
              <Input
                placeholder="Mensagens"
                value={tabLabels.messages}
                onChange={(e) => onTabLabelsChange({ ...tabLabels, messages: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label className="text-xs">Mensagem de Boas-vindas</Label>
            <div className="space-y-2 mt-2">
              <Input
                placeholder="Título principal"
                value={welcomeMessage.title}
                onChange={(e) => onWelcomeChange({ ...welcomeMessage, title: e.target.value })}
              />
              <Input
                placeholder="Subtítulo"
                value={welcomeMessage.subtitle}
                onChange={(e) => onWelcomeChange({ ...welcomeMessage, subtitle: e.target.value })}
              />
              <Textarea
                placeholder="Descrição"
                value={welcomeMessage.description}
                onChange={(e) => onWelcomeChange({ ...welcomeMessage, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <div>
            <Label className="text-xs">Texto do Rodapé</Label>
            <Textarea
              placeholder="Texto do rodapé..."
              value={footerText}
              onChange={(e) => onFooterChange(e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Histórias/Seções */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">📱 Seções de Informações</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {stories.map((story, index) => (
              <AccordionItem key={story.id} value={story.id}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <span>{story.icon}</span>
                    <span className="text-sm">{story.label}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Ícone (emoji)</Label>
                        <Input
                          value={story.icon}
                          onChange={(e) => updateStory(index, { icon: e.target.value })}
                          placeholder="🎉"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Label</Label>
                        <Input
                          value={story.label}
                          onChange={(e) => updateStory(index, { label: e.target.value })}
                          placeholder="Horário"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs">Título da Seção</Label>
                      <Input
                        value={story.title}
                        onChange={(e) => updateStory(index, { title: e.target.value })}
                        placeholder="Horário da Cerimônia"
                      />
                    </div>

                    <div>
                      <Label className="text-xs">Descrição</Label>
                      <Textarea
                        value={story.description}
                        onChange={(e) => updateStory(index, { description: e.target.value })}
                        placeholder="Descrição da seção..."
                        rows={3}
                      />
                    </div>

                    {/* Detalhes */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-xs">Detalhes</Label>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addDetail(index)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {Object.entries(story.details).map(([key, value]) => (
                          <div key={key} className="flex gap-2">
                            <Input
                              value={value}
                              onChange={(e) => updateDetail(index, key, e.target.value)}
                              className="flex-1"
                              placeholder="Detalhe..."
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeDetail(index, key)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Botões */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-xs">Botões de Ação</Label>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addButton(index)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {story.buttons.map((button, buttonIndex) => (
                          <div key={buttonIndex} className="grid grid-cols-2 gap-2 p-2 border rounded">
                            <Input
                              placeholder="Texto do botão"
                              value={button.label}
                              onChange={(e) => updateButton(index, buttonIndex, { label: e.target.value })}
                            />
                            <Input
                              placeholder="URL ou link"
                              value={button.url}
                              onChange={(e) => updateButton(index, buttonIndex, { url: e.target.value })}
                            />
                            <div className="col-span-1">
                              <select
                                value={button.style}
                                onChange={(e) => updateButton(index, buttonIndex, { style: e.target.value })}
                                className="w-full px-3 py-1 border rounded text-sm"
                              >
                                <option value="primary">Primário</option>
                                <option value="outline">Outline</option>
                              </select>
                            </div>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeButton(index, buttonIndex)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentEditor;