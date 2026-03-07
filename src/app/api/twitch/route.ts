import { NextResponse } from "next/server";

const CLIENT_ID = process.env.TWITCH_CLIENT_ID ?? "";
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET ?? "";
const BROADCASTER_LOGIN = process.env.TWITCH_LOGIN ?? "itscubatv";

let tokenCache: { access_token: string; expires_at: number } | null = null;

async function getToken(): Promise<string> {
    if (tokenCache && Date.now() < tokenCache.expires_at) {
        return tokenCache.access_token;
    }
    const res = await fetch(
        `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`,
        { method: "POST" }
    );
    if (!res.ok) throw new Error("Token fetch failed");
    const data = await res.json();
    tokenCache = {
        access_token: data.access_token,
        expires_at: Date.now() + (data.expires_in - 60) * 1000,
    };
    return tokenCache.access_token;
}

export async function GET() {
    // Return mock data if no credentials configured
    if (!CLIENT_ID || !CLIENT_SECRET) {
        return NextResponse.json({
            configured: false,
            isLive: false,
            followers: 12400,
            viewers: 0,
            streamTitle: null,
            game: null,
            thumbnail: null,
            startedAt: null,
            login: BROADCASTER_LOGIN,
        });
    }

    try {
        const token = await getToken();
        const headers = {
            "Client-Id": CLIENT_ID,
            Authorization: `Bearer ${token}`,
        };

        // 1. Get user ID
        const userRes = await fetch(
            `https://api.twitch.tv/helix/users?login=${BROADCASTER_LOGIN}`,
            { headers }
        );
        const userData = await userRes.json();
        const user = userData.data?.[0];
        if (!user) throw new Error("User not found");

        // 2. Check live stream
        const streamRes = await fetch(
            `https://api.twitch.tv/helix/streams?user_login=${BROADCASTER_LOGIN}`,
            { headers }
        );
        const streamData = await streamRes.json();
        const stream = streamData.data?.[0];
        const isLive = !!stream;

        // 3. Followers (Channel Followers endpoint)
        const followerRes = await fetch(
            `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${user.id}`,
            { headers }
        );
        const followerData = await followerRes.json();
        const followers = followerData.total ?? 0;

        return NextResponse.json({
            configured: true,
            isLive,
            followers,
            viewers: stream?.viewer_count ?? 0,
            streamTitle: stream?.title ?? null,
            game: stream?.game_name ?? null,
            thumbnail: stream
                ? stream.thumbnail_url.replace("{width}", "640").replace("{height}", "360")
                : null,
            startedAt: stream?.started_at ?? null,
            login: BROADCASTER_LOGIN,
        });
    } catch (err: any) {
        console.error("Twitch API error:", err.message);
        return NextResponse.json(
            { error: err.message, configured: true, isLive: false, followers: 0, viewers: 0, login: BROADCASTER_LOGIN },
            { status: 500 }
        );
    }
}
