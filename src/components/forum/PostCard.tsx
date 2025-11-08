import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleLikePostAsync } from '@/store/forumSlice';
import { MessageSquare, Heart, Eye, Pin } from 'lucide-react';
import type { ForumPost } from '@/types/forum';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: ForumPost;
}

export const PostCard = ({ post }: PostCardProps) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const hasLiked = user && post.likedBy?.includes(user.uid);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) return;
    
    await dispatch(toggleLikePostAsync({ postId: post._id, userId: user.uid }));
  };

  const initials = post.author.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link to={`/community/post/${post._id}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {post.isPinned && (
                      <Pin className="w-4 h-4 text-blue-600" />
                    )}
                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 hover:text-blue-600">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">{post.author.name}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 line-clamp-2 mb-3">{post.content}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 hover:text-red-600"
                    onClick={handleLike}
                    disabled={!isAuthenticated}
                  >
                    <Heart
                      className={`w-4 h-4 mr-1 ${hasLiked ? 'fill-red-600 text-red-600' : ''}`}
                    />
                    <span>{post.likes || 0}</span>
                  </Button>

                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.replyCount || 0}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.views || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
