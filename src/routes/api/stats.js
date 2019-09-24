const KoaRouter = require('koa-router');

const router = new KoaRouter();



router.get('api.get_paciente', '/get_paciente', async (ctx) => {
  // let query = JSON.parse(ctx.request.query);
  let responseData =  {nombre: 'Arturo Vidal',fecha_nacimiento: '12 septiembre 2019',nombre_padre: 'Pablo Vidal',nombre_madre: 'Ana Vidal' };
  ctx.body = JSON.stringify(responseData);
});

router.get('api.get_consulta', '/get_consulta', async (ctx) => {
  // let query = JSON.parse(ctx.request.query);
  let responseData =  {peso: 3.45, diametro_cranel: 33, altura: 34, comentario:'bebe muy bonito, sera un gran jugador'};
  ctx.body = JSON.stringify(responseData);
});





module.exports = router;
