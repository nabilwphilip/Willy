import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useData, ProjectType } from '@/contexts/DataContext';
import { Plus, Pencil, Trash2, X, Image } from 'lucide-react';
import ImageUpload from '@/components/common/ImageUpload';
import { v4 as uuidv4 } from 'uuid';

export function Portfolio() {
  const { projects, setProjects, addItem, updateItem, deleteItem } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentProject, setCurrentProject] = useState<ProjectType | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [codeUrl, setCodeUrl] = useState('');
  const [campaignDuration, setCampaignDuration] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [engagementRate, setEngagementRate] = useState('');
  const [reach, setReach] = useState('');
  const [conversion, setConversion] = useState('');
  const [campaignStrategy, setCampaignStrategy] = useState('');
  const [campaignHighlights, setCampaignHighlights] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenDialog = (project: ProjectType | null = null) => {
    if (project) {
      setCurrentProject(project);
      setTitle(project.title);
      setDescription(project.description);
      setImage(project.image);
      setAdditionalImages(project.images || []);
      setTags(project.tags.join(', '));
      setCategory(project.category);
      setDemoUrl(project.demoUrl || '');
      setCodeUrl(project.codeUrl || '');
      setCampaignDuration(project.campaignDuration || '');
      setCompletionDate(project.completionDate || '');
      setEngagementRate(project.engagementRate || '');
      setReach(project.reach || '');
      setConversion(project.conversion || '');
      setCampaignStrategy(project.campaignStrategy || '');
      setCampaignHighlights(project.campaignHighlights ? project.campaignHighlights.join('\n') : '');
      setIsEditing(true);
    } else {
      setCurrentProject(null);
      setTitle('');
      setDescription('');
      setImage('/placeholder.svg');
      setAdditionalImages([]);
      setTags('');
      setCategory('');
      setDemoUrl('');
      setCodeUrl('');
      setCampaignDuration('');
      setCompletionDate('');
      setEngagementRate('');
      setReach('');
      setConversion('');
      setCampaignStrategy('');
      setCampaignHighlights('');
      setIsEditing(false);
    }
    
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentProject(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData: ProjectType = {
      id: currentProject?.id || uuidv4(),
      title,
      description,
      image: image || '/placeholder.svg',
      images: [image, ...additionalImages].filter(img => img && img !== '/placeholder.svg'),
      tags: tags.split(',').map((tag) => tag.trim()),
      category,
      demoUrl: demoUrl || undefined,
      codeUrl: codeUrl || undefined,
      campaignDuration: campaignDuration || undefined,
      completionDate: completionDate || undefined,
      engagementRate: engagementRate || undefined,
      reach: reach || undefined,
      conversion: conversion || undefined,
      campaignStrategy: campaignStrategy || undefined,
      campaignHighlights: campaignHighlights ? campaignHighlights.split('\n').filter(item => item.trim() !== '') : undefined
    };
    
    if (isEditing) {
      updateItem('projects', projectData, setProjects);
    } else {
      addItem('projects', projectData, setProjects);
    }
    
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteItem('projects', id, setProjects);
    }
  };

  const handleAddImage = () => {
    setAdditionalImages([...additionalImages, '']);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...additionalImages];
    newImages.splice(index, 1);
    setAdditionalImages(newImages);
  };

  const updateAdditionalImage = (index: number, value: string) => {
    const newImages = [...additionalImages];
    newImages[index] = value;
    setAdditionalImages(newImages);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold">Portfolio Management</h1>
        <Button onClick={() => handleOpenDialog()} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </div>
      
      {/* Search */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                {project.images && project.images.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs flex items-center">
                    <Image className="h-3 w-3 mr-1" />
                    {project.images.length}
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-1 text-xs bg-brand-yellow/10 text-brand-yellow rounded-full">
                    {project.category}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleOpenDialog(project)}
                >
                  <Pencil className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleDelete(project.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900 dark:hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-medium mb-2">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchQuery
                ? `No projects match "${searchQuery}"`
                : "You haven't added any projects yet."}
            </p>
            {searchQuery ? (
              <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
            ) : (
              <Button onClick={() => handleOpenDialog()}>Add Your First Project</Button>
            )}
          </div>
        )}
      </div>
      
      {/* Add/Edit Project Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Project Title *
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Fashion Influencer Campaign"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description *
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A brief description of the campaign"
                  rows={4}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="image" className="text-sm font-medium">
                  Main Campaign Image *
                </label>
                <ImageUpload value={image} onChange={setImage} />
              </div>

              {/* Additional Images Section */}
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">
                    Additional Images (up to 3)
                  </label>
                  {additionalImages.length < 3 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={handleAddImage}
                      className="flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Image
                    </Button>
                  )}
                </div>

                {additionalImages.map((img, index) => (
                  <div key={index} className="relative mb-4">
                    <ImageUpload 
                      value={img} 
                      onChange={(value) => updateAdditionalImage(index, value)}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category *
                  </label>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Fashion, Beauty, Lifestyle"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="tags" className="text-sm font-medium">
                    Tags * <span className="text-gray-500 text-xs">(comma separated)</span>
                  </label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Instagram, TikTok, Influencer"
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="demoUrl" className="text-sm font-medium">
                  Campaign URL
                </label>
                <Input
                  id="demoUrl"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://example.com/campaign"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="codeUrl" className="text-sm font-medium">
                  Resources URL
                </label>
                <Input
                  id="codeUrl"
                  value={codeUrl}
                  onChange={(e) => setCodeUrl(e.target.value)}
                  placeholder="https://drive.google.com/campaign-resources"
                />
              </div>
            </div>
            
            <h3 className="text-lg font-semibold pt-4 border-t">Campaign Metrics & Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="campaignDuration" className="text-sm font-medium">
                  Campaign Duration
                </label>
                <Input
                  id="campaignDuration"
                  value={campaignDuration}
                  onChange={(e) => setCampaignDuration(e.target.value)}
                  placeholder="e.g., 4 weeks"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="completionDate" className="text-sm font-medium">
                  Completion Date
                </label>
                <Input
                  id="completionDate"
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                  placeholder="e.g., June 2023"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <label htmlFor="engagementRate" className="text-sm font-medium">
                  Engagement Rate
                </label>
                <Input
                  id="engagementRate"
                  value={engagementRate}
                  onChange={(e) => setEngagementRate(e.target.value)}
                  placeholder="e.g., 8.7%"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="reach" className="text-sm font-medium">
                  Reach
                </label>
                <Input
                  id="reach"
                  value={reach}
                  onChange={(e) => setReach(e.target.value)}
                  placeholder="e.g., 2.4M"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="conversion" className="text-sm font-medium">
                  Conversion
                </label>
                <Input
                  id="conversion"
                  value={conversion}
                  onChange={(e) => setConversion(e.target.value)}
                  placeholder="e.g., 3.2%"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="campaignStrategy" className="text-sm font-medium">
                Campaign Strategy
              </label>
              <Textarea
                id="campaignStrategy"
                value={campaignStrategy}
                onChange={(e) => setCampaignStrategy(e.target.value)}
                placeholder="Describe the strategy used for this campaign"
                rows={3}
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="campaignHighlights" className="text-sm font-medium">
                Campaign Highlights <span className="text-gray-500 text-xs">(one per line)</span>
              </label>
              <Textarea
                id="campaignHighlights"
                value={campaignHighlights}
                onChange={(e) => setCampaignHighlights(e.target.value)}
                placeholder="Each line will be displayed as a bullet point"
                rows={5}
              />
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Update Project' : 'Add Project'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Portfolio;
