import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch, useAppSelector } from '@/store';
import { createPostAsync } from '@/store/forumSlice';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, X } from 'lucide-react';
import { FORUM_CATEGORIES, POPULAR_TAGS } from '@/types/forum';

export const CreatePostDialog = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddTag = (tag: string) => {
    if (selectedTags.length >= 5) {
      toast({
        title: 'Maximum tags reached',
        description: 'You can add up to 5 tags per post',
        variant: 'destructive',
      });
      return;
    }
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAddCustomTag = () => {
    if (!customTag.trim()) return;
    const tag = customTag.trim().toLowerCase().replace(/\s+/g, '-');
    handleAddTag(tag);
    setCustomTag('');
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const result = await dispatch(
        createPostAsync({
          title: title.trim(),
          content: content.trim(),
          category,
          tags: selectedTags,
          author: {
            name: user.name,
            email: user.email,
          },
        })
      ).unwrap();

      toast({
        title: 'Post created!',
        description: 'Your post has been published successfully',
      });

      setOpen(false);
      setTitle('');
      setContent('');
      setCategory('general');
      setSelectedTags([]);
      
      // Navigate to the new post
      navigate(`/community/post/${result._id}`);
    } catch (error) {
      toast({
        title: 'Failed to create post',
        description: 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <PlusCircle className="w-5 h-5" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
          <DialogDescription>
            Share your thoughts, questions, or ideas with the community
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="What's on your mind?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={200}
            />
            <p className="text-xs text-gray-500">{title.length}/200 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FORUM_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Share more details..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={8}
              maxLength={5000}
            />
            <p className="text-xs text-gray-500">{content.length}/5000 characters</p>
          </div>

          <div className="space-y-2">
            <Label>Tags (up to 5)</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Add custom tag..."
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomTag();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={handleAddCustomTag}>
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {POPULAR_TAGS.filter((tag) => !selectedTags.includes(tag)).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50"
                  onClick={() => handleAddTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !title.trim() || !content.trim()}>
              {loading ? 'Publishing...' : 'Publish Post'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
