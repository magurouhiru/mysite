const str = `
.inline {
  &__vertical-align{
  &__overflow_wrap {
    &__normal {
      overflow-wrap: normal;
    }
    &__anywhere {
      overflow-wrap: anywhere;
    }
    &__break_word {
      overflow-wrap: break-word;
    }
  }
  }
}

`

execute(str)
function execute(str:string){
  const l = str.split(/\r\n|\n|\r/);

  let block = "";
  let element = "";
  const modifier: string[] = [];
  let f = false;
  l.forEach((s) => {
    if (s.includes(".")) {
      block = s.trim().replaceAll(".", "").replaceAll("{", "").trim();
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
    return {m: m, p: block+"__"+m.replaceAll(";", "").replaceAll(" ", "").replaceAll(":", "__").replaceAll("-", "_")}
  });

  obj.forEach((o) => {
    console.log(o.p + " = false;");
  });
  obj.forEach((o) => {
    console.log("[class." + o.p + ']="' + o.p + '"');
  });
  obj.forEach((o) => {
    console.log('<p-toggleButton [(ngModel)]="' + o.p + '" onLabel="' + o.m + '" offLabel="' + o.m + '" />');
  });
}
