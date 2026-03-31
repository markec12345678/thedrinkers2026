/_
Skill: Music & Band Management MCP Tools
Description: MCP orodja za upravljanje glasbene skupine The Drinkers
Keywords: spotify, music, social, instagram, discord, band
_/

// Primer konfiguracije za MCP strežnike v .mcp.json
{
"mcpServers": {
"spotify": {
"type": "stdio",
"command": "npx",
"args": ["-y", "@modelcontextprotocol/server-spotify"],
"env": {
"SPOTIFY*CLIENT_ID": "your-client-id",
"SPOTIFY_CLIENT_SECRET": "your-client-secret"
}
},
"instagram": {
"type": "stdio",
"command": "npx",
"args": ["-y", "@modelcontextprotocol/server-instagram"],
"env": {
"INSTAGRAM_ACCESS_TOKEN": "your-token"
}
},
"stripe": {
"type": "stdio",
"command": "npx",
"args": ["-y", "@modelcontextprotocol/server-stripe"],
"env": {
"STRIPE_SECRET_KEY": "sk_test*..."
}
}
}
}

// Koristna MCP orodja za The Drinkers projekt:
// 1. Spotify - upravljanje glasbe, albumov, playlist
// 2. Instagram - objave, stories, analitika
// 3. TikTok - video objave, trendi
// 4. Discord - fan community, obvestila
// 5. Stripe - plačila, merch, VIP članstva
// 6. Resend - email marketing, newsletter
// 7. GitHub - code management (že imaš)
// 8. YouTube - video vsebine (že imaš)
