import { ToggleButtonChangeEvent } from 'primeng/togglebutton';

export function changeClass(
  e: ToggleButtonChangeEvent,
  rawHtml: string,
  targetClassName: string,
  changeClassName: string,
) {
  const doc = new window.DOMParser().parseFromString(rawHtml, 'text/html');
  const hc = doc.getElementsByClassName(targetClassName);
  for (let i = 0; i < hc.length; i++) {
    const h = hc.item(i);
    if (h) {
      let classNames = h.className.split(' ');
      if (e.checked) {
        classNames.push(changeClassName);
      } else {
        classNames = classNames.filter((name) => name != changeClassName);
      }
      h.setAttribute('class', classNames.join(' '));
    }
  }
  rawHtml = doc.body.innerHTML;
  return doc.body.innerHTML;
}
