const { execSync, spawn } = require('child_process');

function removeEnv(key) {
    try {
        execSync(`npx vercel env rm ${key} production -y`, { stdio: 'inherit' });
    } catch (e) { console.log(e.message) }
}

function addEnv(key, value) {
    return new Promise((resolve) => {
        const proc = spawn('npx', ['vercel', 'env', 'add', key, 'production'], { shell: true, stdio: ['pipe', 'inherit', 'inherit'] });
        proc.stdin.write(value);
        proc.stdin.end();
        proc.on('close', resolve);
    });
}

async function run() {
    removeEnv('OAUTH_CLIENT_ID');
    removeEnv('OAUTH_CLIENT_SECRET');
    await addEnv('OAUTH_CLIENT_ID', 'Ov23lisOkeSj5iTRZOyl');
    await addEnv('OAUTH_CLIENT_SECRET', '16e027fc16733504cf2a0676c34ea9dd383ac04b');
    console.log("Done!");
}
run();
