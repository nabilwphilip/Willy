
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useData, TestimonialType } from '@/contexts/DataContext';
import { Plus, Pencil, Trash2, X, MessageSquare, Star } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ImageUpload from '@/components/common/ImageUpload';
import { toast } from 'sonner';

export function Testimonials() {
  const { testimonials, setTestimonials, addItem, updateItem, deleteItem } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<TestimonialType | null>(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [content, setContent] = useState('');
  const [avatar, setAvatar] = useState('');
  const [rating, setRating] = useState(5);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenDialog = (testimonial: TestimonialType | null = null) => {
    if (testimonial) {
      setCurrentTestimonial(testimonial);
      setName(testimonial.name);
      setRole(testimonial.role);
      setCompany(testimonial.company);
      setContent(testimonial.content);
      setAvatar(testimonial.avatar);
      setRating(testimonial.rating);
      setIsEditing(true);
    } else {
      setCurrentTestimonial(null);
      setName('');
      setRole('');
      setCompany('');
      setContent('');
      setAvatar('/placeholder.svg');
      setRating(5);
      setIsEditing(false);
    }
    
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentTestimonial(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const testimonialData: TestimonialType = {
      id: currentTestimonial?.id || uuidv4(),
      name,
      role,
      company,
      content,
      avatar: avatar || '/placeholder.svg',
      rating
    };
    
    if (isEditing) {
      updateItem('testimonials', testimonialData, setTestimonials);
    } else {
      addItem('testimonials', testimonialData, setTestimonials);
    }
    
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      deleteItem('testimonials', id, setTestimonials);
    }
  };

  const StarRating = ({ count }: { count: number }) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`h-4 w-4 ${i < count ? 'text-brand-yellow fill-brand-yellow' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold">Testimonials Management</h1>
        <Button onClick={() => handleOpenDialog()} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" /> Add Testimonial
        </Button>
      </div>
      
      {/* Testimonials Table */}
      {testimonials.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Client</TableHead>
                <TableHead>Position</TableHead>
                <TableHead className="hidden md:table-cell">Company</TableHead>
                <TableHead className="hidden md:table-cell">Rating</TableHead>
                <TableHead className="hidden md:table-cell">Testimonial</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{testimonial.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{testimonial.role}</TableCell>
                  <TableCell className="hidden md:table-cell">{testimonial.company}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <StarRating count={testimonial.rating} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <p className="line-clamp-1">{testimonial.content}</p>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleOpenDialog(testimonial)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(testimonial.id)}
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
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">No testimonials found</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            You haven't added any client testimonials yet. Add testimonials to showcase your clients' feedback.
          </p>
          <Button onClick={() => handleOpenDialog()} className="mt-6">
            Add Your First Testimonial
          </Button>
        </div>
      )}
      
      {/* Add/Edit Testimonial Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Client Name *
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="avatar" className="text-sm font-medium">
                    Client Photo
                  </label>
                  <ImageUpload value={avatar} onChange={setAvatar} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Role/Position *
                  </label>
                  <Input
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Marketing Director"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="company" className="text-sm font-medium">
                    Company *
                  </label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="ABC Company"
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="content" className="text-sm font-medium">
                  Testimonial Content *
                </label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Their feedback about your work..."
                  rows={4}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium">Rating *</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Button
                      key={value}
                      type="button"
                      variant={rating >= value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRating(value)}
                      className={rating >= value ? "bg-brand-yellow hover:bg-brand-yellow/90" : ""}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Update Testimonial' : 'Add Testimonial'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Testimonials;
