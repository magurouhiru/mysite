const str2 = `

:host ::ng-deep .grid-template-columns {
  &--100px-100px-100px {
    grid-template-columns: 100px 100px 100px;
  }
  &--200px-200px-200px {
    grid-template-columns: 200px 200px 200px;
  }
  &--1fr-1fr-1fr {
    grid-template-columns: 1fr 1fr 1fr;
  }
  &--2fr-1fr-1fr {
    grid-template-columns: 2fr 1fr 1fr;
  }
  &--1fr-2fr-1fr {
    grid-template-columns: 1fr 2fr 1fr;
  }
  &--1fr-1fr-2fr {
    grid-template-columns: 1fr 1fr 2fr;
  }
  &--repeat_auto-fit_minmax_50px_1fr {
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  }
  &--repeat_auto-fit_minmax_100px_1fr {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
  &--repeat_auto-fit_minmax_200px_1fr {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
`
const targets = ["playBox--1","playBox--2","playBox--3","hoge","fuga","piyo"]
targets.forEach(t=>execute(str2,t))
function execute(str:string, target:string){
  const l = str.split(/\r\n|\n|\r/);

  let block = "";
  const modifierClass: string[] = [];
  const modifier: string[] = [];
  let f = false;
  l.forEach((s) => {
    if (s.includes(".")) {
      block = s.trim().replaceAll(":host ::ng-deep", "").replaceAll(".", "").replaceAll("{", "").trim();
      f = true;
      return;
    }
    if (s.includes("&")) {
      modifierClass.push(s.trim().trim().replaceAll("&", "").replaceAll("{", "").trim());
      return;
    }
    if (s.includes(";")) {
      modifier.push(s.trim());
      return;
    }
  });

  const obj = modifier.map((m,i) => {
    return {m: m, p: block+modifierClass[i]}
  });

  obj.forEach((o) => {
    console.log('<p-toggleButton (onChange)="changeCssClass($event, \'' + target +'\', \''+o.p+'\')" onLabel="' + o.m + '" offLabel="' + o.m + '" />');
  });
}
