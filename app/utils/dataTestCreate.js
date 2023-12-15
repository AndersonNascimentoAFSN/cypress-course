/**
 * @param {string} text 
 * @return {string}
 * @example 'Why Cypress?' => 'nav-item-why-cypress?'
 * */

export function dataTestCreate(text) {
  return `nav-item-${text.toLowerCase().replace(' ', '-')}`
}