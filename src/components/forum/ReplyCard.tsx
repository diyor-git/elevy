import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleLikeReplyAsync } from '@/store/forumSlice';
import { Heart } from 'lucide-react';
import type { ForumReply } from '@/types/forum';
import { formatDistanceToNow } from 'date-fns';

interface ReplyCardProps {
  reply: ForumReply;
}

export const ReplyCard = ({ reply }: ReplyCardProps) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const hasLiked = user && reply.likedBy?.includes(user.uid);

  const handleLike = async () => {
    if (!isAuthenticated || !user) return;
    
    await dispatch(toggleLikeReplyAsync({ replyId: reply._id, userId: user.uid }));
  };

  const initials = reply.author.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-gray-900">{reply.author.name}</span>
              <span className="text-sm text-gray-600">
                {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
              </span>
            </div>

            <p className="text-gray-700 mb-3 whitespace-pre-wrap">{reply.content}</p>

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
              <span className="text-sm">{reply.likes || 0}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
