import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function copySvgFiles(sourceDir, targetDir) {
	if (!existsSync(sourceDir)) return;
	for (const entry of readdirSync(sourceDir, { withFileTypes: true })) {
		const sourcePath = join(sourceDir, entry.name);
		const targetPath = join(targetDir, entry.name);
		if (entry.isDirectory()) {
			copySvgFiles(sourcePath, targetPath);
			continue;
		}
		if (entry.name.endsWith('.svg')) {
			mkdirSync(dirname(targetPath), { recursive: true });
			copyFileSync(sourcePath, targetPath);
		}
	}
}

copySvgFiles(join(root, 'nodes'), join(root, 'dist', 'nodes'));
