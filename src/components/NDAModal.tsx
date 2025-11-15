import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NDAModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSign: () => void;
    startupName: string;
}

export function NDAModal({ open, onOpenChange, onSign, startupName }: NDAModalProps) {
    const [agreed, setAgreed] = useState(false);
    const [fullName, setFullName] = useState('');

    const handleSign = () => {
        if (agreed && fullName.trim()) {
            onSign();
            setAgreed(false);
            setFullName('');
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Non-Disclosure Agreement</DialogTitle>
                    <DialogDescription>
                        Please read and sign this NDA to access confidential information about {startupName}
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="h-[400px] rounded-lg border p-4">
                    <div className="space-y-4 text-sm">
                        <section>
                            <h3 className="font-semibold mb-2">1. Purpose</h3>
                            <p className="text-muted-foreground">
                                This Non-Disclosure Agreement ("Agreement") is entered into to protect confidential
                                information shared about {startupName} ("Startup"). By signing, you agree to maintain
                                strict confidentiality regarding all business information, strategies, plans, and
                                discussions related to this startup.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-semibold mb-2">2. Confidential Information</h3>
                            <p className="text-muted-foreground">
                                "Confidential Information" includes but is not limited to: business plans, financial
                                information, product designs, technical specifications, customer data, marketing
                                strategies, trade secrets, and any information marked as confidential or that would
                                reasonably be considered confidential.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-semibold mb-2">3. Obligations</h3>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                <li>Maintain strict confidentiality of all shared information</li>
                                <li>Not disclose information to third parties without written consent</li>
                                <li>Use information only for authorized collaboration purposes</li>
                                <li>Protect information with the same care as your own confidential data</li>
                                <li>Return or destroy confidential materials upon request</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-semibold mb-2">4. Exceptions</h3>
                            <p className="text-muted-foreground">
                                This Agreement does not apply to information that: (a) is publicly available,
                                (b) was known to you before disclosure, (c) is independently developed by you,
                                or (d) is required to be disclosed by law.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-semibold mb-2">5. Term</h3>
                            <p className="text-muted-foreground">
                                This Agreement remains in effect for 3 years from the date of signing or until
                                the information becomes publicly available through no fault of yours.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-semibold mb-2">6. Remedies</h3>
                            <p className="text-muted-foreground">
                                You acknowledge that breach of this Agreement may cause irreparable harm and that
                                monetary damages may be inadequate. The Startup may seek injunctive relief in
                                addition to other available remedies.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-semibold mb-2">7. Digital Signature</h3>
                            <p className="text-muted-foreground">
                                By entering your name and clicking "Sign NDA", you agree that your digital signature
                                has the same legal effect as a handwritten signature.
                            </p>
                        </section>
                    </div>
                </ScrollArea>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter your full legal name"
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>

                    <div className="flex items-start space-x-2">
                        <Checkbox
                            id="agree"
                            checked={agreed}
                            onCheckedChange={(checked) => setAgreed(checked as boolean)}
                        />
                        <Label
                            htmlFor="agree"
                            className="text-sm leading-tight cursor-pointer"
                        >
                            I have read and agree to the terms of this Non-Disclosure Agreement.
                            I understand my obligations to maintain confidentiality.
                        </Label>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSign}
                        disabled={!agreed || !fullName.trim()}
                        className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    >
                        Sign NDA
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
