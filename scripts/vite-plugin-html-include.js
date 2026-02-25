/**
 * Plugin Vite : injection du header et du footer depuis parts/
 * Remplace <!-- INCLUDE parts/header.html --> et <!-- INCLUDE parts/footer.html -->
 * par le contenu des fichiers parts/header.html et parts/footer.html.
 */
import { readFileSync } from 'fs'
import { resolve } from 'path'

const INCLUDE_HEADER = '<!-- INCLUDE parts/header.html -->'
const INCLUDE_FOOTER = '<!-- INCLUDE parts/footer.html -->'

export function htmlIncludePlugin(rootDir) {
  const headerPath = resolve(rootDir, 'parts/header.html')
  const footerPath = resolve(rootDir, 'parts/footer.html')

  let headerContent = ''
  let footerContent = ''

  try {
    headerContent = readFileSync(headerPath, 'utf-8')
  } catch (e) {
    console.warn('[html-include] parts/header.html non trouvé:', headerPath)
  }
  try {
    footerContent = readFileSync(footerPath, 'utf-8')
  } catch (e) {
    console.warn('[html-include] parts/footer.html non trouvé:', footerPath)
  }

  return {
    name: 'html-include',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        let out = html
        if (headerContent && out.includes(INCLUDE_HEADER)) {
          out = out.replace(INCLUDE_HEADER, headerContent.trim())
        }
        if (footerContent && out.includes(INCLUDE_FOOTER)) {
          out = out.replace(INCLUDE_FOOTER, footerContent.trim())
        }
        return out
      }
    }
  }
}
