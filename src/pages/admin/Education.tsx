
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useData, EducationType } from '@/contexts/DataContext';
import { Plus, Pencil, Trash2, X, Calendar } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function Education() {
  const { education, setEducation, addItem, updateItem, deleteItem } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<EducationType | null>(null);
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const sortedEducation = [...education].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  const handleOpenDialog = (edu: EducationType | null = null) => {
    if (edu) {
      setCurrentEducation(edu);
      setDegree(edu.degree);
      setInstitution(edu.institution);
      setLocation(edu.location);
      setStartDate(edu.startDate);
      setEndDate(edu.endDate);
      setDescription(edu.description);
      setIsEditing(true);
    } else {
      setCurrentEducation(null);
      setDegree('');
      setInstitution('');
      setLocation('');
      setStartDate('');
      setEndDate('');
      setDescription('');
      setIsEditing(false);
    }
    
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentEducation(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const educationData: EducationType = {
      id: currentEducation?.id || uuidv4(),
      degree,
      institution,
      location,
      startDate,
      endDate,
      description
    };
    
    if (isEditing) {
      updateItem('education', educationData, setEducation);
    } else {
      addItem('education', educationData, setEducation);
    }
    
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      deleteItem('education', id, setEducation);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold">Education Management</h1>
        <Button onClick={() => handleOpenDialog()} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" /> Add Education
        </Button>
      </div>
      
      {/* Education Table */}
      {sortedEducation.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Degree</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead className="hidden md:table-cell">Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {sortedEducation.map((edu) => (
                <TableRow key={edu.id}>
                  <TableCell className="font-medium">{edu.degree}</TableCell>
                  <TableCell>{edu.institution}</TableCell>
                  <TableCell className="hidden md:table-cell">{edu.location}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleOpenDialog(edu)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(edu.id)}
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
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">No education entries found</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            You haven't added any education history yet. Add your academic background.
          </p>
          <Button onClick={() => handleOpenDialog()} className="mt-6">
            Add Your First Education Entry
          </Button>
        </div>
      )}
      
      {/* Add/Edit Education Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Education' : 'Add New Education'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="degree" className="text-sm font-medium">
                  Degree/Certificate *
                </label>
                <Input
                  id="degree"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  placeholder="Bachelor of Science in Marketing"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="institution" className="text-sm font-medium">
                    Institution *
                  </label>
                  <Input
                    id="institution"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="University Name"
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
                    End Date *
                  </label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description *
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of your studies, achievements, etc."
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
                {isEditing ? 'Update Education' : 'Add Education'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Education;
