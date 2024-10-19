
'use server';

import ClaimAirdrop from "../ClaimAirdrop";

export async function ServerSideReward({ sessionId, flowId }: { sessionId: string, flowId: string }) {
    return (
        <div>
            <ClaimAirdrop sessionId={sessionId} flowId={flowId} />
        </div>
    );
}