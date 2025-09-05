// collect-src-md.js
import fs from 'fs'
import path from 'path'

const SRC_DIR = path.join(process.cwd(), 'src')
const OUTPUT_FILE = path.join(process.cwd(), 'src-summary.md')

// Recorre recursivamente la carpeta src
const walk = (dir, fileList = []) => {
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      walk(filePath, fileList)
    } else {
      fileList.push(filePath)
    }
  })
  return fileList
}

// Genera el archivo markdown con todos los contenidos
const generateMarkdown = () => {
  const files = walk(SRC_DIR)
  let md = `# 📦 Contenido de /src\n\nEste archivo contiene el contenido de cada archivo dentro de la carpeta \`src/\`.\n\n`

  files.forEach((filePath) => {
    const relativePath = path.relative(SRC_DIR, filePath)
    const ext = path.extname(filePath)
    const lang = ext === '.tsx' ? 'tsx' : ext === '.ts' ? 'ts' : ext === '.js' ? 'js' : ''
    const content = fs.readFileSync(filePath, 'utf8')
    md += `## \`${relativePath}\`\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n`
  })

  fs.writeFileSync(OUTPUT_FILE, md, 'utf8')
  console.log(`✅ Archivo generado en: ${OUTPUT_FILE}`)
}

generateMarkdown()
