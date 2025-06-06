
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useData, ExperienceType } from '@/contexts/DataContext';
import { Plus, Pencil, Trash2, X, Briefcase } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Label } from '@/components/ui/label';

export function Experience() {
  const { experiences, setExperiences, addItem, updateItem, deleteItem } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<ExperienceType | null>(null);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [isCurrently, setIsCurrently] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const sortedExperiences = [...experiences].sort((a, b) => {
    if (a.isCurrently) return -1;
    if (b.isCurrently) return 1;
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  const handleOpenDialog = (exp: ExperienceType | null = null) => {
    if (exp) {
      setCurrentExperience(exp);
      setTitle(exp.title);
      setCompany(exp.company);
      setLocation(exp.location);
      setStartDate(exp.startDate);
      setEndDate(exp.endDate || '');
      setDescription(exp.description);
      setIsCurrently(exp.isCurrently);
      setIsEditing(true);
    } else {
      setCurrentExperience(null);
      setTitle('');
      setCompany('');
      setLocation('');
      setStartDate('');
      setEndDate('');
      setDescription('');
      setIsCurrently(false);
      setIsEditing(false);
    }
    
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentExperience(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const experienceData: ExperienceType = {
      id: currentExperience?.id || uuidv4(),
      title,
      company,
      location,
      startDate,
      endDate: isCurrently ? null : endDate,
      description,
      isCurrently
    };
    
    if (isEditing) {
      updateItem('experiences', experienceData, setExperiences);
    } else {
      addItem('experiences', experienceData, setExperiences);
    }
    
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience entry?')) {
      deleteItem('experiences', id, setExperiences);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold">Experience Management</h1>
        <Button onClick={() => handleOpenDialog()} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" /> Add Experience
        </Button>
      </div>
      
      {/* Experience Table */}
      {sortedExperiences.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Position</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead className="hidden md:table-cell">Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {sortedExperiences.map((exp) => (
                <TableRow key={exp.id}>
                  <TableCell className="font-medium">
                    {exp.title}
                    {exp.isCurrently && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                        Current
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{exp.company}</TableCell>
                  <TableCell className="hidden md:table-cell">{exp.location}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleOpenDialog(exp)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(exp.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900 dark:hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 border rounded-md">
          <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">No experience entries found</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            You haven't added any work experience yet. Add your professional background.
          </p>
          <Button onClick={() => handleOpenDialog()} className="mt-6">
            Add Your First Experience Entry
          </Button>
        </div>
      )}
      
      {/* Add/Edit Experience Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Experience' : 'Add New Experience'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Job Title *
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Senior Operations Manager"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="company" className="text-sm font-medium">
                    Company *
                  </label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company Name"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Location *
                  </label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, Country"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="startDate" className="text-sm font-medium">
                    Start Date *
                  </label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="endDate" className="text-sm font-medium">
                    End Date {isCurrently ? '' : '*'}
                  </label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    disabled={isCurrently}
                    required={!isCurrently}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="current-job"
                  checked={isCurrently}
                  onCheckedChange={setIsCurrently}
                />
                <Label htmlFor="current-job">I currently work here</Label>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description *
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={4}
                  required
                />
              </div>
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Update Experience' : 'Add Experience'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Experience;
