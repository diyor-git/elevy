import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '@/store';
import { createStartup } from '@/store/startupSlice';
import {useToast} from '@/hooks/use-toast';
import { DevvAI } from '@devvai/devv-code-backend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';


const STAGES = ['idea', 'mvp', 'launched', 'growth'];
const INDUSTRIES = ['Tech', 'Education', 'Healthcare', 'Fintech', 'E-commerce', 'Social', 'AI/ML', 'Gaming', 'Other'];
const ROLES = ['Developer', 'Designer', 'Marketer', 'Business Developer', 'Product Manager', 'Data Scientist'];
const ai = new DevvAI();
const CreateStartupPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isLoading } = useSelector((state: RootState) => state.startup);

    const [name, setName] = useState('');
    const [tagline, setTagline] = useState('');
    const [description, setDescription] = useState('');
    const [stage, setStage] = useState('');
    const [industry, setIndustry] = useState('');
    const [lookingFor, setLookingFor] = useState<string[]>([]);
    const [ndaAccepted, setNdaAccepted] = useState(false);

    // AI Assistant state
    const [aiHelp, setAiHelp] = useState('');
    const [isAiThinking, setIsAiThinking] = useState(false);
    const [aiSuggestion, setAiSuggestion] = useState('');

    const {toast} = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!ndaAccepted) {
            toast({
                title: 'NDA Required',
                description: 'You must accept the NDA to create a startup.',
                variant: 'destructive',
            });
            return;
        }

        const resultAction = await dispatch(
            createStartup({
                name,
                tagline,
                description,
                stage: stage as any,
                industry,
                looking_for: lookingFor.join(', '),
                status: 'active',
            })
        );

        if (createStartup.fulfilled.match(resultAction)) {
            toast({
                title: 'Startup Created!',
                description: 'Your startup has been created successfully with NDA protection.',
            });
            navigate(`/startups/${resultAction.payload._id}`);
        } else {
            toast({
                title: 'Error',
                description: 'Failed to create startup. Please try again.',
                variant: 'destructive',
            });
        }
    };

    const handleAiHelp = async () => {
        if (!aiHelp.trim()) return;

        setIsAiThinking(true);
        setAiSuggestion('');

        try {
            const stream = await ai.chat.completions.create({
                model: 'default',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a startup mentor helping entrepreneurs refine their ideas. Provide concise, actionable advice on business model, target audience, MVP features, and pitch. Keep responses under 200 words.'
                    },
                    {
                        role: 'user',
                        content: `Help me with my startup idea:\n\nName: ${name || 'Not set'}\nIdea: ${aiHelp}\n\nProvide brief advice on: 1) Is this idea viable? 2) Who is the target audience? 3) What should be the MVP? 4) Key pitch points.`
                    }
                ],
                stream: true,
                max_tokens: 500,
                temperature: 0.7
            });

            let fullResponse = '';
            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || '';
                if (content) {
                    fullResponse += content;
                    setAiSuggestion(fullResponse);
                }
            }

            setIsAiThinking(false);
        } catch (error: any) {
            toast({
                title: 'AI Assistant Error',
                description: error.message,
                variant: 'destructive'
            });
            setIsAiThinking(false);
        }
    };

    const handleRoleToggle = (role: string) => {
        setLookingFor(prev =>
            prev.includes(role)
                ? prev.filter(r => r !== role)
                : [...prev, role]
        );
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 py-8 px-6">
            <div className="max-w-6xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={() => navigate('/startups')}
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Startups
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Create Your Startup</CardTitle>
                                <CardDescription>
                                    Share your idea with NDA protection. Find co-founders and build together.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Basic Info */}
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="name">Startup Name *</Label>
                                            <Input
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter your startup name"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="tagline">Tagline *</Label>
                                            <Input
                                                id="tagline"
                                                value={tagline}
                                                onChange={(e) => setTagline(e.target.value)}
                                                placeholder="One-line description of your startup"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="description">Description *</Label>
                                            <Textarea
                                                id="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="Describe your startup idea, problem, solution, and vision..."
                                                rows={6}
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="stage">Current Stage *</Label>
                                                <Select value={stage} onValueChange={setStage}>
                                                    <SelectTrigger id="stage">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {STAGES.map(s => (
                                                            <SelectItem key={s} value={s}>
                                                                {s.charAt(0).toUpperCase() + s.slice(1)}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div>
                                                <Label htmlFor="industry">Industry *</Label>
                                                <Select value={industry} onValueChange={setIndustry}>
                                                    <SelectTrigger id="industry">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {INDUSTRIES.map(ind => (
                                                            <SelectItem key={ind} value={ind}>
                                                                {ind}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div>
                                            <Label>Looking For (Select roles you need)</Label>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                                                {ROLES.map(role => (
                                                    <div key={role} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={role}
                                                            checked={lookingFor.includes(role)}
                                                            onCheckedChange={() => handleRoleToggle(role)}
                                                        />
                                                        <Label htmlFor={role} className="font-normal cursor-pointer">
                                                            {role}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* NDA Agreement */}
                                    <Card className="border-blue-200 bg-blue-50/50">
                                        <CardContent className="pt-6">
                                            <div className="flex items-start space-x-3">
                                                <Checkbox
                                                    id="nda"
                                                    checked={ndaAccepted}
                                                    onCheckedChange={(checked) => setNdaAccepted(checked as boolean)}
                                                    required
                                                />
                                                <div className="flex-1">
                                                    <Label htmlFor="nda" className="font-semibold cursor-pointer">
                                                        I accept the Non-Disclosure Agreement (NDA)
                                                    </Label>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        By checking this box, you agree that all information shared in this startup
                                                        is confidential and protected. All team members must sign NDA before accessing
                                                        full details.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <div className="flex gap-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => navigate('/startups')}
                                            disabled={isLoading}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={isLoading} className="flex-1">
                                            {isLoading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Creating...
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                                    Create Startup
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* AI Assistant Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-6">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-purple-600" />
                                    AI Startup Advisor
                                </CardTitle>
                                <CardDescription>
                                    Get instant feedback on your idea
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="ai-help">Describe your idea</Label>
                                    <Textarea
                                        id="ai-help"
                                        value={aiHelp}
                                        onChange={(e) => setAiHelp(e.target.value)}
                                        placeholder="Tell me about your startup idea, and I'll help you refine it..."
                                        rows={4}
                                    />
                                </div>

                                <Button
                                    type="button"
                                    onClick={handleAiHelp}
                                    disabled={isAiThinking || !aiHelp.trim()}
                                    className="w-full"
                                    variant="secondary"
                                >
                                    {isAiThinking ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                                            AI is thinking...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Get AI Feedback
                                        </>
                                    )}
                                </Button>

                                {aiSuggestion && (
                                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                        <p className="text-sm text-slate-700 whitespace-pre-wrap">
                                            {aiSuggestion}
                                            {isAiThinking && <span className="animate-pulse">▋</span>}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateStartupPage;
