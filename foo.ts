(async () => {
  const response: any = await fetch('https://unpkg.com/smartdown/package.json');
  const myJSON: any = await response.json();
  console.log(myJSON);
})()

