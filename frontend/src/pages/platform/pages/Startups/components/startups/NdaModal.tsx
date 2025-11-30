import {useCallback, useState} from 'react';
import {Button} from '@/components/ui/button.tsx';
import {Lock, X} from 'lucide-react';

interface NDAModalProps {
    startupName: string;
    onAccept: () => void;
    onClose: () => void;
    issuedDate?: string;
    blockchainHash?: string;
}

function NdaModal({
                      startupName,
                      onAccept,
                      onClose,
                      issuedDate = 'November 18, 2025',
                      blockchainHash = '0x3f2A9c8B...'
                  }: NDAModalProps) {
    const [accepted, setAccepted] = useState(false);

    const handleAcceptChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setAccepted(e.target.checked);
    }, []);

    const info = [
        {
            title: '1. Confidential Information',
            content: `The undersigned acknowledges that ${startupName} has disclosed certain confidential and
              proprietary information, including but not limited to business plans, financial projections,
              product specifications, and strategic initiatives. This information is disclosed in
              confidence and shall remain confidential.`
        },
        {
            title: '2. Term of Confidentiality',
            content: `This agreement shall remain in effect for a period of 24 months from the date of signing.
              After this period, any information previously held confidential may be disclosed only if
              required by law.`
        },
        {
            title: '3. Permitted Use',
            content: `The recipient agrees to use the confidential information solely for the purpose of
              evaluating a potential opportunity with ${startupName}. Redistribution or disclosure to third
              parties without written consent is prohibited.`
        },
        {
            title: '4. Return or Destruction',
            content: `Upon termination of discussions or at the request of ${startupName}, the recipient agrees to
              return or destroy all confidential information within 10 business days.`
        }
    ]

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Lock className="w-6 h-6 text-primary"/>
                        Non-Disclosure Agreement
                    </h2>
                    <button onClick={onClose} className="p-1 hover:bg-muted rounded">
                        <X className="w-6 h-6"/>
                    </button>
                </div>

                <div className="p-8 space-y-6">
                    {info.map((section, idx) => (
                        <section key={idx}>
                            <h3 className="font-bold text-lg mb-2">{section.title}</h3>
                            <p className="text-muted-foreground">{section.content}</p>
                        </section>
                    ))}

                    <label
                        className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition">
                        <input
                            type="checkbox"
                            checked={accepted}
                            onChange={handleAcceptChange}
                            className="w-5 h-5 cursor-pointer"
                        />
                        <span>I have read and agree to this NDA</span>
                    </label>

                    <div className="flex gap-4">
                        <Button variant="outline" onClick={onClose} className="flex-1">
                            Decline
                        </Button>
                        <Button onClick={onAccept} disabled={!accepted} className="flex-1">
                            Sign & Accept
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NdaModal;
