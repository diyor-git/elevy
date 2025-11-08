import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {MessageSquare, Heart, Bookmark, TrendingUp, Plus, GraduationCap, Search} from 'lucide-react'
import {Input} from "@/components/ui/input.tsx";
import {internships} from "@/data/internships.ts";
import {useState} from "react";

const topics = [
    { name: 'Образование', count: 234, color: 'bg-blue-500' },
    { name: 'Карьера', count: 189, color: 'bg-purple-500' },
    { name: 'Стартапы', count: 156, color: 'bg-teal-500' },
    { name: 'Мотивация', count: 298, color: 'bg-pink-500' },
    { name: 'Технологии', count: 412, color: 'bg-orange-500' },
    { name: 'Дизайн', count: 134, color: 'bg-green-500' },
]

const posts = [
    {
        id: 1,
        author: 'Анна Смирнова',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        role: 'Full-Stack разработчик',
        time: '2 часа назад',
        title: 'Как я получила оффер в Google после 6 месяцев обучения',
        content:
            'Хочу поделиться своим опытом подготовки к собеседованию в FAANG компании. Основные шаги, которые помогли...',
        tags: ['Карьера', 'Опыт', 'Google'],
        likes: 234,
        comments: 45,
        saved: false,
    },
    {
        id: 2,
        author: 'Максим Козлов',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        role: 'Основатель стартапа',
        time: '5 часов назад',
        title: 'От идеи до первых инвестиций: наш путь за 8 месяцев',
        content:
            'Делюсь опытом создания стартапа с нуля. Что работало, что нет, и какие уроки мы извлекли...',
        tags: ['Стартапы', 'Инвестиции', 'Опыт'],
        likes: 189,
        comments: 32,
        saved: true,
    },
    {
        id: 3,
        author: 'Елена Волкова',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        role: 'UX дизайнер',
        time: '1 день назад',
        title: 'Топ-10 ресурсов для изучения UI/UX дизайна',
        content:
            'Собрала список лучших бесплатных и платных ресурсов, которые помогли мне стать дизайнером...',
        tags: ['Дизайн', 'Обучение', 'Ресурсы'],
        likes: 312,
        comments: 56,
        saved: false,
    },
]

const activeUsers = [
    {
        name: 'Дмитрий Сидоров',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        role: 'AI исследователь',
        posts: 45,
    },
    {
        name: 'Ольга Петрова',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
        role: 'Product Manager',
        posts: 38,
    },
    {
        name: 'Иван Новиков',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        role: 'Маркетолог',
        posts: 29,
    },
]

export default function CommunityPage() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen pb-20">
            <div className="container-custom">
                {/* Header */}
                <section className="border-b border-border/50 pt-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                        <div className="mb-12 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                                <GraduationCap className="w-8 h-8 text-primary" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Найдите идеальную  <span className="text-primary">сообщество</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Общайся, делись опытом и находи единомышленников
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search by role, company, or keywords..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 pr-4 h-14 text-base shadow-sm"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Topics */}
                        <Card className="border-none shadow-md">
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-4">Популярные темы</h3>
                                <div className="flex flex-wrap gap-2">
                                    {topics.map((topic) => (
                                        <button
                                            key={topic.name}
                                            className="px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors text-sm font-medium flex items-center gap-2"
                                        >
                                            <div className={`w-2 h-2 rounded-full ${topic.color}`} />
                                            {topic.name}
                                            <span className="text-muted-foreground">
                        ({topic.count})
                      </span>
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Posts */}
                        {posts.map((post, idx) => (
                            <Card
                                key={post.id}
                                className="card-hover border-none shadow-md"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <CardContent className="p-6 space-y-4">
                                    {/* Author Info */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={post.avatar}
                                                alt={post.author}
                                                className="w-12 h-12 rounded-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = ''
                                                }}
                                            />
                                            <div>
                                                <p className="font-semibold">{post.author}</p>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <span>{post.role}</span>
                                                    <span>•</span>
                                                    <span>{post.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon">
                                            <Bookmark
                                                className={`w-5 h-5 ${
                                                    post.saved
                                                        ? 'fill-primary text-primary'
                                                        : 'text-muted-foreground'
                                                }`}
                                            />
                                        </Button>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-lg hover:text-primary transition-colors cursor-pointer">
                                            {post.title}
                                        </h3>
                                        <p className="text-muted-foreground">{post.content}</p>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-4 pt-4 border-t">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="gap-2 text-muted-foreground hover:text-red-500"
                                        >
                                            <Heart className="w-4 h-4" />
                                            <span>{post.likes}</span>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="gap-2 text-muted-foreground"
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                            <span>{post.comments}</span>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Trending */}
                        <Card className="border-none shadow-md sticky top-24">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-primary" />
                                    <h3 className="font-semibold">В тренде</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                                        <p className="text-sm font-medium mb-1">
                                            #AIтехнологии2025
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            1.2k обсуждений
                                        </p>
                                    </div>
                                    <div className="p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                                        <p className="text-sm font-medium mb-1">
                                            #СтажировкиМечты
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            856 обсуждений
                                        </p>
                                    </div>
                                    <div className="p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                                        <p className="text-sm font-medium mb-1">
                                            #СтартапИдеи
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            642 обсуждения
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Active Users */}
                        <Card className="border-none shadow-md">
                            <CardContent className="p-6 space-y-4">
                                <h3 className="font-semibold">Активные участники</h3>
                                <div className="space-y-3">
                                    {activeUsers.map((user) => (
                                        <div
                                            key={user.name}
                                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                                        >
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = ''
                                                }}
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{user.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {user.role}
                                                </p>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {user.posts} постов
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
