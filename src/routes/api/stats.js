const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.post('api.calculate', '/', async (ctx) => {
  const data = ctx.request.body;
  const responseData = {};

  // Datos de entrada

  /* eslint-disable camelcase */
  const {
    V, CVT, CF, CD, CD_m, DP, GF, TI, CPC, CPP, IV, V_ef, V_sc, V_in, VAR, GRO, GF_GRO, CV_ef, CD_ef
  } = data;


  // Calculos intermedios
  const MC = V - CVT;
  const CFS = CF + CD * CD_m;
  const V_p = 1 - V_ef;
  const IN = V * V_p * V_in;
  const FOP = MC - CF - CD - IN;
  const FTO = FOP - GF;
  const RAI = FTO - DP;
  const FC = 1 / (1 + GRO)


  // KPIs
  responseData.M1_1_P = (CVT + CFS + GF) / (V - IN) - 1;
  responseData.M1_2_P = (CVT + +CF + CD + GF) / (V - IN) - 1;
  responseData.M1_3_P = (CVT + CF + CD + GF + DP) / (V - IN) - 1;
  responseData.M1_4_P = (CVT + CFS) / (V - IN) - 1;
  responseData.M1_5_P = (CVT + CF + CD) / (V - IN) - 1;

  responseData.M2_1_P = VAR * (MC - CFS - IN - GF) / (V - IN);
  responseData.M2_2_P = VAR * (MC - CF - CD - IN - GF) / (V - IN);
  responseData.M2_3_P = VAR * (MC - CF - CD - IN - GF - DP) / (V - IN);
  responseData.M2_4_P = VAR * (MC - CFS - IN) / (V - IN);
  responseData.M2_5_P = VAR * (MC - CF - CD - IN) / (V - IN);


  responseData.M1_1_CV = (V - CFS - GF - IN) / (CVT) - 1;
  responseData.M1_2_CV = (V - CF - CD - GF - IN) / (CVT) - 1;
  responseData.M1_3_CV = (V - CF - CD - GF - IN - DP) / (CVT) - 1;
  responseData.M1_4_CV = (V - CFS - IN) / (CVT) - 1;
  responseData.M1_5_CV = (V - CF - CD - IN) / (CVT) - 1;


  responseData.M2_1_CV = -VAR * (MC - CFS - IN - GF) / CVT;
  responseData.M2_2_CV = -VAR * (MC - CF - CD - IN - GF) / CVT;
  responseData.M2_3_CV = -VAR * (MC - CF - CD - IN - GF - DP) / CVT;
  responseData.M2_4_CV = -VAR * (MC - CFS - IN) / CVT;
  responseData.M2_5_CV = -VAR * (MC - CF - CD - IN) / CVT;

  responseData.M1_1_Q = (CFS + GF) / (MC - IN) - 1;
  responseData.M1_2_Q = (CF + CD + GF) / (MC - IN) - 1;
  responseData.M1_3_Q = (CF + CD + GF + DP) / (MC - IN) - 1;
  responseData.M1_4_Q = (CFS) / (MC - IN) - 1;
  responseData.M1_5_Q = (CF + CD) / (MC - IN) - 1;

  responseData.M2_1_Q = VAR * (MC - CFS - IN - GF) / (MC - IN);
  responseData.M2_2_Q = VAR * (MC - CF - CD - IN - GF) / (MC - IN);
  responseData.M2_3_Q = VAR * (MC - CF - CD - IN - GF - DP) / (MC - IN);
  responseData.M2_4_Q = VAR * (MC - CFS - IN) / (MC - IN);
  responseData.M2_5_Q = VAR * (MC - CF - CD - IN) / (MC - IN);


  responseData.M1_1_CF = (MC - IN - (CFS - CF) - GF) / CF - 1;
  responseData.M1_2_CF = (MC - IN - CD - GF) / CF - 1;
  responseData.M1_3_CF = (MC - IN - CD - GF - DP) / CF - 1;
  responseData.M1_4_CF = (MC - IN - (CFS - CF)) / CF - 1;
  responseData.M1_5_CF = (MC - IN - CD) / CF - 1;

  responseData.M2_1_CF = -VAR * (MC - CFS - IN - GF) / CF;
  responseData.M2_2_CF = -VAR * (MC - CF - CD - IN - GF) / CF;
  responseData.M2_3_CF = -VAR * (MC - CF - CD - IN - GF - DP) / CF;
  responseData.M2_4_CF = -VAR * (MC - CFS - IN) / CF;
  responseData.M2_5_CF = -VAR * (MC - CF - CD - IN) / CF;

  responseData.CPP_m = CPP / V * 365 / 30;
  responseData.CPP_an = responseData.CPP_m / 12;
  responseData.A_CPP1 = CPP * TI / FOP * 365 / 30;
  responseData.A_CPP1_an = responseData.A_CPP1 / 12;
  responseData.A_CPP2 = CPP * TI / FTO * 365 / 30;
  responseData.A_CPP2_an = responseData.A_CPP2 / 12;
  responseData.CPP_cpc = CPP / (CPC * CVT / V);
  responseData.GF_cpp_p = CPP * TI / GF;
  responseData.GF_cpp_a = GF + CPP * TI;

  responseData.CPC1_m = CPC / CVT * 365 / 30;
  responseData.CPC1_an = (CPC / CVT * 365 / 30) / 12;
  responseData.CPC2_m = CPC / MC * 365 / 30;
  responseData.CPC2_an = responseData.CPC2_m / 12;
  responseData.CPC3_m = CPC / FOP * 365 / 30;
  responseData.CPC4_p = FOP / CPC;
  responseData.CPC5_m = CPC / FTO * 365 / 30;
  responseData.CPC6_p = FTO / CPC;

  responseData.NW_V = GRO * V;
  responseData.NW_MC = GRO * MC;
  responseData.NW_GF = GF_GRO * GF;
  responseData.NW_FOP_p = (responseData.NW_MC - responseData.NW_GF) / FOP;
  responseData.NW_FOP_hash = responseData.NW_MC - responseData.NW_GF;
  responseData.NW_FTO_p = (responseData.NW_MC - responseData.NW_GF) / FTO;
  responseData.AH_CV = CV_ef * CVT;
  responseData.AH_CD = CD_ef * CD;
  responseData.AH_FOP = (responseData.AH_CV + responseData.AH_CD) / FOP;
  responseData.AH_FTO = (responseData.AH_CV + responseData.AH_CD) / FTO;
  responseData.GRO_AH = responseData.NW_FOP_hash + responseData.AH_CV + responseData.AH_CD;
  responseData.GRO_AH_p1 = responseData.GRO_AH / FOP;
  responseData.GRO_AH_p2 = responseData.GRO_AH / FTO;

  responseData.MC_V_p = MC * V_p;
  responseData.GF_V_p = CPP * TI;
  responseData.AP_V_p = responseData.MC_V_p - responseData.GF_V_p - IN;
  responseData.AP_V_p_no = responseData.AP_V_p / (V * V_p);
  responseData.MC_V_p_r = MC * V_p * (1 - V_sc);
  responseData.APN_V_p = responseData.AP_V_p - responseData.MC_V_p_r;
  responseData.APN_V_p_no = responseData.APN_V_p / (V * V_p);
  responseData.FOP_no_IN = FOP / (V * V_p);
  responseData.FTO_no_IN = FTO / (V * V_p);

  responseData.FB1 = MC - CFS - IN - GF;
  responseData.FB2 = MC - CF - CD - IN - GF;
  responseData.FB3 = MC - CF - CD - IN - GF - DP;
  responseData.FB4 = MC - CFS - IN;
  responseData.FB5 = MC - CF - CD - IN;
  responseData.FB6 = MC - CF - CD - IN - GF + (0.5 * responseData.GRO_AH);

  responseData.M1_6_P = (CVT * (1 + (0.5 * GRO)) * (1 - (0.5 * CV_ef)) + CF + CD + GF + (0.5 * (responseData.NW_GF - responseData.AH_CD))) / (V * (1 - V_p * V_in) * (1 + 0.5*GRO)) - 1;
  responseData.M1_6_CV = (V * (1 + 0.5*GRO) * (1 - 0.5*CV_ef) - CF - CD - GF - 0.5*(responseData.NW_GF - responseData.AH_CD)) / (CVT * (1 + 0.5*GRO) * (1 - 0.5*CV_ef)) - 1;
  responseData.M1_6_Q = (CF + CD + GF + 0.5*(responseData.NW_GF - responseData.AH_CD)) / ((1 + 0.5*GRO) * ((V * (1 - V_p * V_in) - CVT * (1 - 0.5*CV_ef)))) - 1;
  responseData.M1_6_CF = ((1+0.5*GRO)*((V*(1-V_p*V_in)-CVT*(1-0.5*CV_ef))-CD-GF-0.5*responseData.NW_GF)/(CF-0.5*responseData.AH_CD)) - 1;

  responseData.M2_6_P = VAR * ((1 + 0.5*GRO) * (V * (1 - V_p * V_in) - CVT * (1 - 0.5*CV_ef)) - CF - CD - GF - 0.5*(responseData.NW_GF - responseData.AH_CD)) / (V * (1 - V_p*V_in) * (1 +0.5*GRO));
  responseData.M2_6_CV = -VAR * ((1 + 0.5*GRO) * (V *(1 - V_p*V_in)-CVT*(1-0.5*CV_ef))-CF-CD-GF-0.5*(responseData.NW_GF-responseData.AH_CD)) / (CVT*(1+0.5*GRO)*(1-0.5*CV_ef));
  responseData.M2_6_Q = VAR*((1+0.5*GRO)*(V*(1-V_p*V_in)-CVT*(1-0.5*CV_ef))-CF-CD-GF-0.5*(responseData.NW_GF-responseData.AH_CD)) / ((1+0.5*GRO)*(V*(1-V_p*V_in)-CVT*(1-0.5*CV_ef)));
  responseData.M2_6_CF = -VAR*((1+0.5*GRO)*(V*(1-V_p*V_in)-CVT*(1-0.5*CV_ef))-CF-CD-GF-0.5*(responseData.NW_GF-responseData.AH_CD)) / (CF-0.5*responseData.AH_CD);


  ctx.body = JSON.stringify(responseData);

  /* eslint-enable */
});

//  router.get('api.course.show', '/:id', async (ctx) => {
//   const course = await await ctx.orm.course.findById(ctx.params.id);
//   ctx.body = ctx.jsonSerializer('course', {
//     attributes: ['code', 'name', 'description'],
//     topLevelLinks: {
//       self: `${ctx.origin}${ctx.router.url('api.courses.list')}:id`,
//     },
//   }).serialize(course);
// });

module.exports = router;
