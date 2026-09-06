import { createServer } from 'node:http'
import { readFile, mkdir, writeFile, readdir, rm } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { resolve } from 'node:path'

// This app has its own dependencies, alias, CSS and lockfile. It never imports the workspace package.
const root = resolve(import.meta.dirname, '..')
const cwd = resolve(root, '.consumer')
const manifest = JSON.parse(await readFile(resolve(root, 'apps/docs/package.json'), 'utf8'))
const run = (args, directory = cwd) => new Promise((resolveRun, reject) => {
  const child = spawn('pnpm', args, { cwd: directory, stdio: 'inherit', env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' } })
  child.on('error', reject)
  child.on('exit', code => code === 0 ? resolveRun() : reject(new Error(`pnpm ${args.join(' ')} exited ${code}`)))
})
// This ignored directory is owned exclusively by this verification script.
await rm(cwd, { recursive: true, force: true })
await mkdir(resolve(cwd, 'src/app'), { recursive: true })
const files = {
  'package.json': JSON.stringify({ name: 'eva-cn-consumer', private: true, scripts: { build: 'next build', start: 'next start -p 3014' }, dependencies: { next: manifest.dependencies.next, react: manifest.dependencies.react, 'react-dom': manifest.dependencies['react-dom'] }, devDependencies: { typescript: '^5.9.3', '@types/react': '^19', '@types/react-dom': '^19', '@types/node': '^22', tailwindcss: '^4', '@tailwindcss/postcss': '^4' } }, null, 2),
  'components.json': JSON.stringify({ $schema: 'https://ui.shadcn.com/schema.json', style: 'new-york', rsc: true, tsx: true, tailwind: { config: '', css: 'src/app/globals.css', baseColor: 'neutral', cssVariables: true }, aliases: { components: '@/components', ui: '@/components/ui', utils: '@/lib/utils', lib: '@/lib', hooks: '@/hooks' } }, null, 2),
  'tsconfig.json': JSON.stringify({ compilerOptions: { target: 'ES2017', lib: ['dom', 'dom.iterable', 'esnext'], strict: true, noEmit: true, skipLibCheck: true, esModuleInterop: true, module: 'esnext', moduleResolution: 'bundler', jsx: 'react-jsx', resolveJsonModule: true, isolatedModules: true, incremental: true, plugins: [{ name: 'next' }], paths: { '@/*': ['./src/*'] } }, include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'], exclude: ['node_modules'] }, null, 2),
  'postcss.config.mjs': 'export default { plugins: { "@tailwindcss/postcss": {} } }\n',
  'src/app/globals.css': '@import "tailwindcss";\n@custom-variant dark (&:is(.dark *));\nbody { margin: 24px; }\n',
  'src/app/layout.tsx': 'import "./globals.css"\nexport default function Layout({children}: {children: React.ReactNode}) { return <html lang="en" className="dark"><body>{children}</body></html> }\n',
  'src/app/page.tsx': await readFile(resolve(root, 'tests/consumer-page.tsx.fixture'), 'utf8'),
}
for (const [path, content] of Object.entries(files)) await writeFile(resolve(cwd, path), content)
await run(['install', '--ignore-workspace'])
await run(['registry:build'], root)
const items = new Map()
for (const file of await readdir(resolve(root, 'apps/docs/public/r'))) {
  if (file.endsWith('.json')) items.set(`/${file}`, JSON.parse(await readFile(resolve(root, 'apps/docs/public/r', file), 'utf8')))
}
const server = createServer((req, res) => {
  const item = items.get(req.url)
  if (!item) { res.writeHead(404).end(); return }
  const dependencies = item.registryDependencies?.map(dependency => dependency.startsWith('bendsp/eva-cn/') ? `${origin}/${dependency.split('/').at(-1)}.json` : dependency)
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ ...item, ...(dependencies ? { registryDependencies: dependencies } : {}) }))
})
await new Promise(resolveListen => server.listen(0, '127.0.0.1', resolveListen))
const origin = `http://127.0.0.1:${server.address().port}`
try {
  const names = ['eva-theme', 'eva-text', 'eva-badge', 'eva-segment-display', 'eva-stripe']
  // Optional public source: owner/repo#ref. Public ref installs exercise GitHub transitive resolution.
  const source = process.env.EVA_REGISTRY_SOURCE
  const addresses = names.map(name => source ? `${source.split('#')[0]}/${name}${source.includes('#') ? `#${source.split('#')[1]}` : ''}` : `${origin}/${name}.json`)
  await run(['exec', 'shadcn', 'add', ...addresses, '--cwd', cwd, '--yes', '--overwrite'], root)
  const license = await readFile(resolve(cwd, 'src/components/ui/eva-cn.LICENSE'), 'utf8')
  if (!license.includes('MIT License')) throw new Error('Installed license is missing')
  await run(['run', 'build'])
  console.log(`Consumer build passed using ${source ?? 'candidate registry artifacts'}. Run pnpm test next.`)
} finally { server.close() }
