

const runApi = fetch("https://sevn-pleno-esportes.deno.dev")
.then((res)=> res.json())
.then((data)=> console.log("yo", data))
