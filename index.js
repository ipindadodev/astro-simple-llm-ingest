import fs from 'fs';
import path from 'path';

export default function generateTextFeeds() {
    return {
        name: 'generate-text-feeds',
        hooks: {
            'astro:build:done': async ({ config }) => {
                const projectRoot = config?.root || process.cwd();
                const docsDir = path.join(projectRoot, 'src/content/docs');
                const ingestDir = path.join(projectRoot, 'dist/llm-ingest');
                const globalFile = path.join(ingestDir, 'full_site_llm_feed.txt');
                const sectionFiles = {};

                if (!fs.existsSync(docsDir)) {
                    console.error(`❌ No se encontró el directorio de docs: ${docsDir}`);
                    return;
                }

                if (!fs.existsSync(ingestDir)) {
                    fs.mkdirSync(ingestDir, { recursive: true });
                }

                const processDirectory = (dir, relativePath = '') => {
                    const files = fs.readdirSync(dir, { withFileTypes: true });

                    for (const file of files) {
                        const filePath = path.join(dir, file.name);
                        const relativeFilePath = path.join(relativePath, file.name);

                        if (file.isDirectory()) {
                            processDirectory(filePath, relativeFilePath);
                        } else if (file.isFile() && /\.(md|mdx)$/.test(file.name)) {
                            const content = fs.readFileSync(filePath, 'utf-8');
                            const sectionName = relativePath.split(path.sep)[0];
                            if (!sectionName) continue;
                            const sectionFilePath = path.join(ingestDir, `${sectionName}_llm_feed.txt`);

                            fs.appendFileSync(globalFile, `---\nFile: ${relativeFilePath}\n\n${content}\n\n`, 'utf-8');

                            if (!sectionFiles[sectionFilePath]) {
                                sectionFiles[sectionFilePath] = '';
                            }
                            sectionFiles[sectionFilePath] += `---\nFile: ${relativeFilePath}\n\n${content}\n\n`;
                        }
                    }
                };

                processDirectory(docsDir);

                for (const [sectionPath, sectionContent] of Object.entries(sectionFiles)) {
                    fs.writeFileSync(sectionPath, sectionContent, 'utf-8');
                    console.log(`✅ Archivo por sección generado: ${sectionPath}`);
                }

                console.log(`✅ Archivo global generado: ${globalFile}`);
            },
        },
    };
}
