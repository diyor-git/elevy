import {Card} from "@/components/ui/card.tsx";

function About({description_long}: { description_long: string }) {
    return (
        <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="text-muted-foreground">{description_long}</p>
        </Card>
    )
}

export default About;