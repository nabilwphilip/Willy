
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useData } from '@/contexts/DataContext';
import { BrandType } from '@/contexts/DataContext';
import { v4 as uuidv4 } from 'uuid';
import ImageUpload from '@/components/common/ImageUpload';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Edit, Trash, Plus, ImageIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';

export function Brands() {
  const { brands, addItem, updateItem, deleteItem } = useData();
  
  const [newBrand, setNewBrand] = useState<Partial<BrandType>>({
    name: '',
    logo: '/placeholder.svg'
  });
  
  const [editBrand, setEditBrand] = useState<BrandType | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("grid");
  
  const handleAddBrand = () => {
    if (!newBrand.name || !newBrand.logo) {
      toast.error('Please fill in all fields');
      return;
    }
    
    const brandToAdd = {
      id: uuidv4(),
      name: newBrand.name,
      logo: newBrand.logo
    };
    
    addItem('brands', brandToAdd, (prevBrands: BrandType[]) => [...prevBrands, brandToAdd]);
    setNewBrand({ name: '', logo: '/placeholder.svg' });
    setIsAddDialogOpen(false);
    toast.success('Brand added successfully');
  };
  
  const handleUpdateBrand = () => {
    if (!editBrand || !editBrand.name || !editBrand.logo) {
      toast.error('Please fill in all fields');
      return;
    }
    
    updateItem('brands', editBrand, (prevBrands: BrandType[]) => 
      prevBrands.map(brand => brand.id === editBrand.id ? editBrand : brand)
    );
    setIsEditDialogOpen(false);
    setEditBrand(null);
    toast.success('Brand updated successfully');
  };
  
  const handleDeleteBrand = (id: string) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      deleteItem('brands', id, (prevBrands: BrandType[]) => 
        prevBrands.filter(brand => brand.id !== id)
      );
      toast.success('Brand deleted successfully');
    }
  };

  const openEditDialog = (brand: BrandType) => {
    setEditBrand({...brand});
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Partner Brands</h1>
        
        <div className="flex items-center gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="hidden sm:block">
            <TabsList>
              <TabsTrigger value="grid">
                <ImageIcon className="h-4 w-4 mr-2" />
                Grid View
              </TabsTrigger>
              <TabsTrigger value="list">
                <ImageIcon className="h-4 w-4 mr-2" />
                List View
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Brand
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Brand</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="brand-name" className="text-sm font-medium">
                    Brand Name
                  </label>
                  <Input
                    id="brand-name"
                    value={newBrand.name}
                    onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                    placeholder="Enter brand name"
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="brand-logo" className="text-sm font-medium">
                    Brand Logo
                  </label>
                  <ImageUpload 
                    value={newBrand.logo || ''} 
                    onChange={(url) => setNewBrand({ ...newBrand, logo: url })} 
                  />
                </div>
                
                <Button onClick={handleAddBrand} className="w-full">
                  Add Brand
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {brands.map((brand) => (
              <Card key={brand.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4">
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{brand.name}</CardTitle>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => openEditDialog(brand)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteBrand(brand.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="list">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Brand Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>
                    <div className="h-12 w-12 relative rounded overflow-hidden">
                      <img 
                        src={brand.logo} 
                        alt={brand.name} 
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => openEditDialog(brand)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteBrand(brand.id)}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      {/* Edit Brand Dialog - Separate from the mapping to prevent issues */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Brand</DialogTitle>
          </DialogHeader>
          {editBrand && (
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="edit-brand-name" className="text-sm font-medium">
                  Brand Name
                </label>
                <Input
                  id="edit-brand-name"
                  value={editBrand.name}
                  onChange={(e) => setEditBrand({ ...editBrand, name: e.target.value })}
                  placeholder="Enter brand name"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="edit-brand-logo" className="text-sm font-medium">
                  Brand Logo
                </label>
                <ImageUpload 
                  value={editBrand.logo} 
                  onChange={(url) => setEditBrand({ ...editBrand, logo: url })} 
                />
              </div>
              
              <Button onClick={handleUpdateBrand} className="w-full">
                Update Brand
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {brands.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No brands added yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Add your first brand by clicking the "Add Brand" button.
          </p>
        </div>
      )}
    </div>
  );
}

export default Brands;
