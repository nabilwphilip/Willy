
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useData } from '@/contexts/DataContext';
import { toast } from 'sonner';

export function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const { blogPosts } = useData();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  useEffect(() => {
    if (id && blogPosts.length > 0) {
      const foundPost = blogPosts.find(post => post.id === id);
      
      if (foundPost) {
        setPost(foundPost);
        
        // Find related posts (matching tags)
        const related = blogPosts
          .filter(p => p.id !== id && p.tags.some(tag => foundPost.tags.includes(tag)))
          .slice(0, 3);
        setRelatedPosts(related);
      }
    }
  }, [id, blogPosts]);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Social sharing functions
  const shareUrl = window.location.href;
  const shareTitle = post.title;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: post.summary,
          url: shareUrl,
        });
        toast.success('Shared successfully!');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      toast.info('Web Share API not supported on this browser');
    }
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, 'facebook-share-dialog', 'width=800,height=600');
    toast.success('Opening Facebook share dialog');
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, 'twitter-share-dialog', 'width=800,height=600');
    toast.success('Opening Twitter share dialog');
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, 'linkedin-share-dialog', 'width=800,height=600');
    toast.success('Opening LinkedIn share dialog');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Back Button */}
      <Button variant="outline" className="mb-8" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
      </Button>
      
      {/* Featured Image */}
      <div className="rounded-lg overflow-hidden mb-8 shadow-gold-md">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-auto object-cover" 
        />
      </div>
      
      {/* Post Header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag: string) => (
            <span 
              key={tag} 
              className="px-3 py-1 text-xs bg-brand-gold/10 text-brand-gold rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-4">{post.title}</h1>
        
        {/* Author & Meta Info */}
        {post.author && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name?.[0] || 'A'}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">{post.author.name}</p>
                <p className="text-xs">{post.author.title}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 sm:ml-auto">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedDate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Post Content */}
      <div className="bg-white/5 backdrop-blur-sm border border-brand-gold/20 rounded-lg p-8 mb-12 shadow-gold-sm">
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-playfair prose-headings:text-brand-gold prose-a:text-brand-gold">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
      
      {/* Social Sharing - Updated with functional sharing */}
      <div className="flex items-center justify-center mb-12 space-x-4">
        <span className="text-sm">Share this article:</span>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors" onClick={handleShare}>
          <Share2 size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors" onClick={shareTwitter}>
          <Twitter size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors" onClick={shareFacebook}>
          <Facebook size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors" onClick={shareLinkedIn}>
          <Linkedin size={20} />
        </Button>
      </div>
      
      {/* Author Bio */}
      {post.author && post.author.bio && (
        <div className="bg-white/5 backdrop-blur-sm border border-brand-gold/20 rounded-lg p-6 mb-12 shadow-gold-sm">
          <div className="flex items-center">
            <Avatar className="h-16 w-16 mr-4">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback className="text-lg">{post.author.name?.[0] || 'A'}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold font-playfair mb-1">{post.author.name}</h3>
              <p className="text-sm mb-2 text-gray-500 dark:text-gray-400">{post.author.title}</p>
              <p className="text-sm">{post.author.bio}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold font-playfair mb-6 text-brand-gold">Related Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(relatedPost => (
              <div 
                key={relatedPost.id} 
                className="bg-white/5 backdrop-blur-sm border border-brand-gold/20 rounded-lg overflow-hidden shadow-gold-sm hover:shadow-gold-md transition-all"
              >
                <Link to={`/blog/${relatedPost.id}`}>
                  <img 
                    src={relatedPost.coverImage} 
                    alt={relatedPost.title} 
                    className="w-full h-40 object-cover"
                  />
                </Link>
                <div className="p-5">
                  <h3 className="font-bold mb-2">
                    <Link to={`/blog/${relatedPost.id}`} className="hover:text-brand-gold">
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                    {relatedPost.summary}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(relatedPost.publishedDate)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogPost;
