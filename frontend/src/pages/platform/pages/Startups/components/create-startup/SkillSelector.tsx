import {useState} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import {Plus, X} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

const SUGGESTED_SKILLS = ["React", "TypeScript", "Node.js", "Python", "UI/UX Design", "Product Management", "Marketing", "Sales", "Data Science", "Machine Learning", "Mobile Development", "DevOps"]

function SkillSelector({skills, addSkill, removeSkill, maxReached}) {
    const [customSkill, setCustomSkill] = useState("")

    return (
        <div className="space-y-3">
            {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg">
                    {skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="gap-1">
                            {skill}
                            <button type="button" onClick={() => removeSkill(skill)}>
                                <X className="h-3 w-3"/>
                            </button>
                        </Badge>
                    ))}
                </div>
            )}

            <div className="flex flex-wrap gap-2">
                {SUGGESTED_SKILLS.filter(s => !skills.includes(s)).slice(0, 8).map(skill => (
                    <Badge
                        key={skill}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => addSkill(skill)}
                    >
                        <Plus className="h-3 w-3 mr-1"/>
                        {skill}
                    </Badge>
                ))}
            </div>

            {!maxReached && (
                <div className="flex gap-2">
                    <Input
                        placeholder="Add custom skill..."
                        value={customSkill}
                        onChange={e => setCustomSkill(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                e.preventDefault()
                                addSkill(customSkill)
                                setCustomSkill("")
                            }
                        }}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        disabled={!customSkill.trim()}
                        onClick={() => {
                            addSkill(customSkill)
                            setCustomSkill("")
                        }}
                    >
                        <Plus className="h-4 w-4"/>
                    </Button>
                </div>
            )}
        </div>
    )
}

export default SkillSelector;