export default function handler(req, res) {
    // get the host from the request headers
    const host = req.headers.host;

    // Create the GitHub OAuth authorization URL
    const url = new URL('https://github.com/login/oauth/authorize');
    url.searchParams.set('client_id', process.env.OAUTH_CLIENT_ID);
    url.searchParams.set('scope', 'repo,user');

    // Ensure the redirect URI points to the callback endpoint using https
    // In local dev, Vercel passes localhost
    const protocol = host.includes('localhost') ? 'http' : 'https';
    url.searchParams.set('redirect_uri', `${protocol}://${host}/api/callback`);

    res.redirect(302, url.toString());
}
