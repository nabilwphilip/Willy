
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useData, BlogPostType } from '@/contexts/DataContext';
import { Plus, Pencil, Trash2, X, Calendar, Clock, Eye, EyeOff, Book, User } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import ImageUpload from '@/components/common/ImageUpload';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

export function Blog() {
  const { blogPosts, setBlogPosts, addItem, updateItem, deleteItem } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPost, setCurrentPost] = useState<BlogPostType | null>(null);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [readTime, setReadTime] = useState(5);
  const [published, setPublished] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  // Author fields
  const [authorName, setAuthorName] = useState('');
  const [authorTitle, setAuthorTitle] = useState('');
  const [authorAvatar, setAuthorAvatar] = useState('');
  const [authorBio, setAuthorBio] = useState('');
  const [includeAuthor, setIncludeAuthor] = useState(false);

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
  });

  const handleOpenDialog = (post: BlogPostType | null = null) => {
    if (post) {
      setCurrentPost(post);
      setTitle(post.title);
      setSummary(post.summary);
      setContent(post.content);
      setCoverImage(post.coverImage);
      setTags(post.tags.join(', '));
      setPublishedDate(post.publishedDate);
      setReadTime(post.readTime);
      setPublished(post.published);
      
      // Set author fields if they exist
      if (post.author) {
        setIncludeAuthor(true);
        setAuthorName(post.author.name);
        setAuthorTitle(post.author.title);
        setAuthorAvatar(post.author.avatar);
        setAuthorBio(post.author.bio || '');
      } else {
        setIncludeAuthor(false);
        setAuthorName('');
        setAuthorTitle('');
        setAuthorAvatar('/placeholder.svg');
        setAuthorBio('');
      }
      
      setIsEditing(true);
    } else {
      setCurrentPost(null);
      setTitle('');
      setSummary('');
      setContent('');
      setCoverImage('/placeholder.svg');
      setTags('');
      setPublishedDate(format(new Date(), 'yyyy-MM-dd'));
      setReadTime(5);
      setPublished(true);
      setIncludeAuthor(false);
      setAuthorName('');
      setAuthorTitle('');
      setAuthorAvatar('/placeholder.svg');
      setAuthorBio('');
      setIsEditing(false);
    }
    
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentPost(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const postData: BlogPostType = {
      id: currentPost?.id || uuidv4(),
      title,
      summary,
      content,
      coverImage: coverImage || '/placeholder.svg',
      tags: tags.split(',').map((tag) => tag.trim()),
      publishedDate,
      readTime,
      published
    };
    
    // Add author if included
    if (includeAuthor) {
      postData.author = {
        name: authorName,
        title: authorTitle,
        avatar: authorAvatar || '/placeholder.svg',
        bio: authorBio
      };
    }
    
    if (isEditing) {
      updateItem('blogPosts', postData, setBlogPosts);
    } else {
      addItem('blogPosts', postData, setBlogPosts);
    }
    
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteItem('blogPosts', id, setBlogPosts);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <Button onClick={() => handleOpenDialog()} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" /> Add Blog Post
        </Button>
      </div>
      
      {/* Search */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Search blog posts..."
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
      
      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate">{post.title}</span>
                  {post.published ? (
                    <span className="flex items-center text-green-500 text-sm font-normal">
                      <Eye className="h-4 w-4 mr-1" /> Published
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-500 text-sm font-normal">
                      <EyeOff className="h-4 w-4 mr-1" /> Draft
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pb-2">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                  {post.summary}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(post.publishedDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{post.readTime} min read</span>
                  </div>
                  {post.author && (
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      <span>{post.author.name}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between pt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleOpenDialog(post)}
                >
                  <Pencil className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleDelete(post.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900 dark:hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 border rounded-md">
            <Book className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="text-xl font-medium mt-4 mb-2">No blog posts found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchQuery
                ? `No blog posts match "${searchQuery}"`
                : "You haven't added any blog posts yet."}
            </p>
            {searchQuery ? (
              <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
            ) : (
              <Button onClick={() => handleOpenDialog()}>Add Your First Blog Post</Button>
            )}
          </div>
        )}
      </div>
      
      {/* Add/Edit Blog Post Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Blog Post' : 'Add New Blog Post'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <Tabs defaultValue="content">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="author">Author</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Post Title *
                    </label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="The Evolution of Influencer Marketing"
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="summary" className="text-sm font-medium">
                      Summary *
                    </label>
                    <Textarea
                      id="summary"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="A brief summary of the post"
                      rows={2}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="content" className="text-sm font-medium">
                      Content * <span className="text-gray-500 text-xs">(HTML allowed)</span>
                    </label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="<h2>Introduction</h2><p>Start writing your content here...</p>"
                      rows={8}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="coverImage" className="text-sm font-medium">
                      Cover Image
                    </label>
                    <ImageUpload value={coverImage} onChange={setCoverImage} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="tags" className="text-sm font-medium">
                        Tags * <span className="text-gray-500 text-xs">(comma separated)</span>
                      </label>
                      <Input
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Influencer Marketing, ROI, Strategy"
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="publishedDate" className="text-sm font-medium">
                        Published Date *
                      </label>
                      <Input
                        id="publishedDate"
                        type="date"
                        value={publishedDate}
                        onChange={(e) => setPublishedDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="readTime" className="text-sm font-medium">
                        Read Time (minutes) *
                      </label>
                      <Input
                        id="readTime"
                        type="number"
                        min="1"
                        max="60"
                        value={readTime}
                        onChange={(e) => setReadTime(parseInt(e.target.value))}
                        required
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2 self-end py-2">
                      <Switch
                        id="published"
                        checked={published}
                        onCheckedChange={setPublished}
                      />
                      <Label htmlFor="published">Publish immediately</Label>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="author" className="space-y-4 pt-4">
                <div className="flex items-center space-x-2 mb-6">
                  <Switch
                    id="includeAuthor"
                    checked={includeAuthor}
                    onCheckedChange={setIncludeAuthor}
                  />
                  <Label htmlFor="includeAuthor">Include author information</Label>
                </div>
                
                {includeAuthor && (
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <label htmlFor="authorName" className="text-sm font-medium">
                        Author Name
                      </label>
                      <Input
                        id="authorName"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="John Doe"
                        required={includeAuthor}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="authorTitle" className="text-sm font-medium">
                        Author Title
                      </label>
                      <Input
                        id="authorTitle"
                        value={authorTitle}
                        onChange={(e) => setAuthorTitle(e.target.value)}
                        placeholder="Influencer Marketing Manager"
                        required={includeAuthor}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="authorAvatar" className="text-sm font-medium">
                        Author Avatar
                      </label>
                      <ImageUpload value={authorAvatar} onChange={setAuthorAvatar} />
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="authorBio" className="text-sm font-medium">
                        Author Bio
                      </label>
                      <Textarea
                        id="authorBio"
                        value={authorBio}
                        onChange={(e) => setAuthorBio(e.target.value)}
                        placeholder="A short bio about the author..."
                        rows={3}
                      />
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Update Post' : 'Add Post'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Blog;
