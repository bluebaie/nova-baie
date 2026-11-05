import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

// Never inherit real contact credentials in an integration test server.
const env = { ...process.env, NEXT_TELEMETRY_DISABLED: '1', MAKE_WEBHOOK_URL: '', NEXT_PUBLIC_MAKE_WEBHOOK_URL: '', CONTACT_REDIS_REST_URL: '', CONTACT_REDIS_REST_TOKEN: '', CONTACT_RATE_LIMIT_SECRET: '', CONTACT_ALLOWED_ORIGINS: 'http://localhost:3146' };
// Only this local test runner opts into Next's WASM fallback on Windows.
if (process.platform === 'win32') env.NEXT_TEST_WASM_DIR = resolve('node_modules/@next/swc-wasm-nodejs');
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', 'localhost', '--port', '3146'], { env, stdio: 'inherit', windowsHide: true });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('exit', code => process.exit(code ?? 1));
