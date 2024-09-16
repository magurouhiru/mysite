export function addElement(
  rawHtml: string,
  targetClassName: string,
  addClassName: string,
) {
  const doc = new window.DOMParser().parseFromString(rawHtml, 'text/html');
  const target = doc.getElementsByClassName(targetClassName).item(0);
  const element = doc.getElementsByClassName(addClassName).item(0);
  if (target && element) {
    target.insertAdjacentElement(
      'beforeend',
      element.cloneNode(true) as Element,
    );
  }
  return doc.body.innerHTML;
}
