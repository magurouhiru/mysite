const str2 = `

:host ::ng-deep .height {
  &--auto {
    height: auto;
  }
  &--50percent {
    height: 50%;
  }
  &--100percent {
    height: 100%;
  }
  &--50px {
    height: 50px;
  }
  &--100px {
    height: 100px;
  }
}
`
const targets = ["playBox--1","playBox--2","playBox--3"]
targets.forEach(t=>execute(str2,t))
function execute(str:string, target:string){
  const l = str.split(/\r\n|\n|\r/);

  let block = "";
  let element = "";
  const modifier: string[] = [];
  let f = false;
  l.forEach((s) => {
    if (s.includes(".")) {
      block = s.trim().replaceAll(":host ::ng-deep", "").replaceAll(".", "").replaceAll("{", "").trim();
      f = true;
      return;
    }
    if (f) {
      element = s.trim().replaceAll("&", "").replaceAll("{", "").trim();
      f = false;
      return;
    }
    if (s.includes(";")) {
      modifier.push(s.trim());
      return;
    }
  });

  const obj = modifier.map((m) => {
    return {m: m, p: m.replaceAll(";", "").replaceAll(" ", "").replaceAll(":", "--").replaceAll("%", "percent")}
  });

  obj.forEach((o) => {
    console.log('<p-toggleButton (onChange)="changeCssClass($event, \'' + target +'\', \''+o.p+'\')" onLabel="' + o.m + '" offLabel="' + o.m + '" />');
  });
}
