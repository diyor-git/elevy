import {useState} from "react";
import {DevvAI} from "@devvai/devv-code-backend";
import {useToast} from "@/hooks/use-toast";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Sparkles} from "lucide-react";

const ai = new DevvAI();

function AIAdvisor() {
    const {toast} = useToast();

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
                        content:
                            'You are a startup mentor helping entrepreneurs refine their ideas. Provide concise, actionable advice on business model, target audience, MVP features, and pitch. Keep responses under 200 words.'
                    },
                    {
                        role: 'user',
                        content: `Help me with my startup idea:\nIdea: ${aiHelp}\nProvide brief advice on: 1) Is this idea viable? 2) Target audience? 3) MVP? 4) Key pitch points.`
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
        } catch (error: any) {
            toast({
                title: 'AI Assistant Error',
                description: error.message,
                variant: 'destructive'
            });
        }

        setIsAiThinking(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600"/>
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
                        placeholder="Tell me about your startup idea..."
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
                            <Sparkles className="w-4 h-4 mr-2"/>
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
    );
}

export default AIAdvisor;