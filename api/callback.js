export default async function handler(req, res) {
    // Extract the code from the query string
    // Vercel automatically populates req.query
    const code = req.query?.code;

    if (!code) {
        return res.status(400).send('No code provided');
    }

    try {
        const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                client_id: process.env.OAUTH_CLIENT_ID,
                client_secret: process.env.OAUTH_CLIENT_SECRET,
                code,
            }),
        });

        const data = await response.json();
        const token = data.access_token;

        if (!token) {
            throw new Error(data.error_description || 'No access token received');
        }

        // The script that Decap CMS expects to receive the token
        const script = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <script>
          (function() {
            function receiveMessage(e) {
              window.opener.postMessage(
                'authorization:github:success:{"token":"${token}","provider":"github"}',
                e.origin
              );
              window.removeEventListener("message", receiveMessage, false);
            }
            if (window.opener) {
              window.addEventListener("message", receiveMessage, false);
              window.opener.postMessage("authorizing:github", "*");
            } else {
              document.body.innerHTML = "Authentication successful. Please close this window.";
            }
          })();
        </script>
      </body>
      </html>
    `;

        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(script);
    } catch (error) {
        console.error("OAuth Callback Error:", error);
        res.status(500).send("Authentication failed.");
    }
}
