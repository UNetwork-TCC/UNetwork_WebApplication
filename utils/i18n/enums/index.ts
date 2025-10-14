import i18n from '@/public/assets/i18n/en.json'

function i18nf() {
  return (function processObject(obj: any, path: string = ''): any {
    if (typeof obj !== 'object' || obj === null) return obj;
    
    const result: any = {};
    
    for (const key in obj) {
      const newPath = path ? `${path}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        const hasNestedObjects = Object.values(obj[key]).some(v => typeof v === 'object' && v !== null);
        
        if (hasNestedObjects) {
          result[key] = processObject(obj[key], newPath);
        } else {
          result[key] = Object.fromEntries(
            Object.keys(obj[key]).map(subKey => [subKey, `${newPath}.${subKey}`])
          );
        }
      } else {
        result[key] = newPath;
      }
    }
    
    return result;
  })(i18n.translation);
}

export const I18N: typeof i18n.translation = i18nf()