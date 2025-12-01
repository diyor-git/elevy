import {Link, useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useToast} from "@/hooks/use-toast"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Label} from "@/components/ui/label"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Checkbox} from "@/components/ui/checkbox"
import {ArrowLeft, FileText, Loader2} from "lucide-react"
import {ProjectForm, projectSchema} from "@/pages/platform/pages/Startups/schema/project-schema";
import SkillSelector from "@/pages/platform/pages/Startups/components/create-startup/SkillSelector";
import {useState} from "react";
import {DevvAI} from "@devvai/devv-code-backend";
import {AIAdvisor} from "@/pages/platform/pages/Startups/components";

const CATEGORIES = ["Web Development", "Mobile Development", "AI/ML", "Design", "Marketing", "Data Science", "Blockchain", "Other"]
const STAGES = ["Idea", "Mvp", "Launched", "Growth"]

const ai = new DevvAI();

export default function CreateProjectPage() {
    const navigate = useNavigate()
    const {toast} = useToast()

    // AI Assistant state
    const [aiHelp, setAiHelp] = useState('');
    const [isAiThinking, setIsAiThinking] = useState(false);
    const [aiSuggestion, setAiSuggestion] = useState('');

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
                        content: `Help me with my startup idea:\n\nName: 'Not set'}\nIdea: ${aiHelp}\n\nProvide brief advice on: 1) Is this idea viable? 2) Who is the target audience? 3) What should be the MVP? 4) Key pitch points.`
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

    const form = useForm<ProjectForm>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: "",
            description: "",
            short_description: "",
            category: "",
            stage: "",
            requiredSkills: [],
            maxParticipants: 5,
            hasNda: false
        }
    })

    const skills = form.watch("requiredSkills")

    const addSkill = (skill: string) => {
        const s = skill.trim()
        if (!s || skills.includes(s) || skills.length >= 10) return
        form.setValue("requiredSkills", [...skills, s])
    }

    const removeSkill = (skill: string) => {
        form.setValue("requiredSkills", skills.filter(s => s !== skill))
    }

    const onSubmit = async (data: ProjectForm) => {
        try {
            toast({title: "Project created!", description: "Your project has been published."})
            navigate("/")
        } catch (e) {
            toast({title: "Error", description: "Failed to create project", variant: "destructive"})
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 max-w-6xl space-y-6">
                <Link to="/dashboard/startups">
                    <Button className="flex items-center gap-2 mb-6">
                        <ArrowLeft className="w-4 h-4"/> Back to Startups
                    </Button>
                </Link>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Create New Project</h1>
                    <p className="text-muted-foreground">Share your idea and find team members</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Details</CardTitle>
                                <CardDescription>Provide clear information to attract the right
                                    participants</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Title *</Label>
                                        <Input {...form.register("title")} maxLength={100}
                                               placeholder="Enter your startup name"/>
                                        {form.formState.errors.title && (
                                            <p className="text-xs text-red-500">{form.formState.errors.title.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Short Description *</Label>
                                        <Textarea rows={3} {...form.register("short_description")}
                                                  placeholder="Describe your startup idea, problem, solution, and vision shortly..."/>
                                        {form.formState.errors.short_description && (
                                            <p className="text-xs text-red-500">{form.formState.errors.short_description.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Description *</Label>
                                        <Textarea rows={5} {...form.register("description")}
                                                  placeholder="Describe your startup idea, problem, solution, and vision..."/>
                                        <p className="text-xs text-muted-foreground"> {form.watch("description").length} characters
                                            (min 50) </p>
                                        {form.formState.errors.description && (
                                            <p className="text-xs text-red-500">{form.formState.errors.description.message}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Category *</Label>
                                            <Select onValueChange={val => form.setValue("category", val)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {CATEGORIES.map(c => <SelectItem key={c}
                                                                                     value={c}>{c}</SelectItem>)}
                                                </SelectContent>
                                            </Select>

                                            {form.formState.errors.category && (
                                                <p className="text-xs text-red-500">{form.formState.errors.category.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Stage *</Label>
                                            <Select onValueChange={val => form.setValue("stage", val)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select stage"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {STAGES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                                </SelectContent>
                                            </Select>

                                            {form.formState.errors.stage && (
                                                <p className="text-xs text-red-500">{form.formState.errors.stage.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Required Skills *</Label>
                                        <SkillSelector
                                            skills={skills}
                                            addSkill={addSkill}
                                            removeSkill={removeSkill}
                                            maxReached={skills.length >= 10}
                                        />

                                        {form.formState.errors.requiredSkills && (
                                            <p className="text-xs text-red-500">{form.formState.errors.requiredSkills.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Max Participants *</Label>
                                        <Input
                                            type="number"
                                            min={1}
                                            max={50}
                                            {...form.register("maxParticipants", {valueAsNumber: true})}
                                        />

                                        {form.formState.errors.maxParticipants && (
                                            <p className="text-xs text-red-500">{form.formState.errors.maxParticipants.message}</p>
                                        )}
                                    </div>


                                    <div className="flex items-center gap-2">
                                        <Checkbox checked={form.watch("hasNda")}
                                                  onCheckedChange={v => form.setValue("hasNda", !!v)}/>
                                        <span className="flex items-center gap-2 text-sm"><FileText
                                            className="h-4 w-4"/> Require NDA</span>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <Button type="button" variant="outline" className="flex-1"
                                                onClick={() => navigate("/")}>Cancel</Button>
                                        <Button type="submit" className="flex-1">
                                            {form.formState.isSubmitting ?
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : "Create Project"}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <AIAdvisor/>
                    </div>
                </div>
            </div>
        </div>
    )
}
