import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogHeader
} from "@/components/ui/alert-dialog";
import { authClient } from "@/lib/auth-client";

interface UpgradeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const UpgradeModal = ({
    open, 
    onOpenChange
}: UpgradeModalProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Upgrade to Pro!</AlertDialogTitle>
                    <AlertDialogDescription>
                        You need an active subscription to perform this action. Upgrade to pro to unlock all features.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/20">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={() => {
                            authClient.checkout({ slug: "Flowseidon-Pro" });
                        }}
                        className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/30"

                    >
                        Upgrade to Pro
                    </AlertDialogAction>  
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};