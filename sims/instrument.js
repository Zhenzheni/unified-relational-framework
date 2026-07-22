
const HBAR_C = 197.327; // MeV·fm
const $ = id => document.getElementById(id);
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function fmt(x,n=4){ if(!isFinite(x)) return '—'; return Number(x).toPrecision(n).replace(/\.?0+$/,'').replace(/\.?0+e/,'e'); }
const sSlider=$('s'), dSlider=$('d'), kSlider=$('k'), cSlider=$('c'), ncSlider=$('nc'), stackSlider=$('stack'), phaseSlider=$('phase');
let animating=false, animId=null;
function updateDRange(){
  const s=parseFloat(sSlider.value);
  const maxD=s*Math.sqrt(3);
  dSlider.max=maxD.toFixed(4);
  if(parseFloat(dSlider.value)>maxD) dSlider.value=maxD.toFixed(4);
}
const hexOrder=['pp','pl','PL','pL','PP','Pl'];
const hexMeaning={pp:'highest compression',pl:'strong compression',PL:'balanced equality',pL:'moderate compression',PP:'highest stretch',Pl:'moderate stretch'};
function currentRegime(phaseDeg){
  const idx=Math.floor(((phaseDeg%360)+360)%360/60);
  return hexOrder[idx];
}
function opticalMode(ratio){
  if(ratio<0.2) return {name:'Cryptic', full:'flat, outline-erasing diffusion', color:'#5c6675'};
  if(ratio<0.6) return {name:'Scotopic', full:'dim, long membrane paths', color:'var(--teal)'};
  if(ratio<1.0) return {name:'Prismatic', full:'dispersion at incomplete loci', color:'#7aa8c9'};
  if(ratio<1.4) return {name:'Caustic', full:'hyper-concentrated focus', color:'var(--crit)'};
  return {name:'Kinetic', full:'living intermediate residual — seat of P/p', color:'var(--amber)'};
}
function drawSpark(s){
  const c=$('spark'), ctx=c.getContext('2d');
  const W=c.width,H=c.height; ctx.clearRect(0,0,W,H);
  const padL=4,padR=4,padT=6,padB=6;
  const plotW=W-padL-padR, plotH=H-padT-padB;
  const maxD=s*Math.sqrt(3), yMax=Math.PI;
  function X(d){return padL+(d/maxD)*plotW;}
  function Y(v){return padT+plotH-(v/yMax)*plotH;}
  ctx.strokeStyle='#1a2029'; ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(padL,padT);ctx.lineTo(padL,padT+plotH);ctx.lineTo(padL+plotW,padT+plotH);ctx.stroke();
  ctx.strokeStyle='#3f93ab';ctx.lineWidth=1.6;ctx.beginPath();
  for(let i=0;i<=100;i++){const d=i/100*maxD;const th=2*Math.PI/3-2*Math.asin(clamp(d/(2*s),-1,1));const x=X(d),y=Y(th);i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);}
  ctx.stroke();
  ctx.strokeStyle='#eab054';ctx.lineWidth=1.6;ctx.beginPath();
  for(let i=0;i<=100;i++){const d=i/100*maxD;const dth=2*Math.asin(clamp(d/(2*s),-1,1));const x=X(d),y=Y(dth);i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);}
  ctx.stroke();
  const yc=Math.PI/3;
  ctx.strokeStyle='#e15c53';ctx.setLineDash([3,3]);ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(padL,Y(yc));ctx.lineTo(padL+plotW,Y(yc));ctx.stroke();
  ctx.setLineDash([]);
  return {X,Y,maxD};
}
function markSpark(geom,s,d){
  const c=$('spark'), ctx=c.getContext('2d');
  const th=2*Math.PI/3-2*Math.asin(clamp(d/(2*s),-1,1));
  const dth=2*Math.asin(clamp(d/(2*s),-1,1));
  ctx.fillStyle='#ffffff';
  ctx.beginPath();ctx.arc(geom.X(d),geom.Y(th),2.6,0,7);ctx.fill();
  ctx.beginPath();ctx.arc(geom.X(d),geom.Y(dth),2.6,0,7);ctx.fill();
}
function buildInstrument(s,d,phase,ratioMode,tension,Nc,stack){
  const cx=350, cy=350;
  const r_inner=(1-Math.sqrt(6)/4)*110, r_outer=(1+Math.sqrt(6)/4)*110;
  const heart=0.45*r_inner, skinOuter=r_inner, membOuter=r_outer;
  const genR=70;
  const dNorm=clamp(d/s,0,Math.sqrt(3));
  const side=dNorm*genR;
  const vertR=side/Math.sqrt(3);
  const mode=opticalMode(ratioMode);
  const tensionColor = tension? 'var(--amber)':'var(--teal)';
  let radar='';
  [heart,skinOuter,membOuter,210,250,290].forEach((r,i)=>{
    radar+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#12161d" stroke-width="1" opacity="0.9"/>`;
  });
  const zones=`
    <circle cx="${cx}" cy="${cy}" r="${membOuter}" fill="${tensionColor}" opacity="0.05"/>
    <circle cx="${cx}" cy="${cy}" r="${skinOuter}" fill="${tensionColor}" opacity="0.07"/>
    <circle cx="${cx}" cy="${cy}" r="${heart}" fill="${tensionColor}" opacity="0.28" class="heartpulse"/>
    <circle cx="${cx}" cy="${cy}" r="${heart}" fill="none" stroke="${tensionColor}" stroke-width="1.6"/>
    <circle cx="${cx}" cy="${cy}" r="${skinOuter}" fill="none" stroke="#3a424f" stroke-width="1" stroke-dasharray="2,3"/>
    <circle cx="${cx}" cy="${cy}" r="${membOuter}" fill="none" stroke="#3a424f" stroke-width="1" stroke-dasharray="2,3"/>
    <text x="${cx}" y="${cy-membOuter-8}" text-anchor="middle" fill="#5c6675" font-family="JetBrains Mono" font-size="9">exterior</text>
    <text x="${cx+membOuter*0.72}" y="${cy-membOuter*0.55}" fill="#5c6675" font-family="JetBrains Mono" font-size="9">membrane 1–2/4</text>
    <text x="${cx+skinOuter*0.55}" y="${cy-skinOuter*0.75-4}" fill="#5c6675" font-family="JetBrains Mono" font-size="9">skin 3/4</text>
  `;
  let genCircles='';
  const pts=[];
  for(let i=0;i<3;i++){
    const ang=-Math.PI/2 + i*2*Math.PI/3;
    const x=cx+vertR*Math.cos(ang), y=cy+vertR*Math.sin(ang);
    pts.push([x,y]);
    genCircles+=`<circle cx="${x}" cy="${y}" r="${genR}" fill="none" stroke="#8a93a3" stroke-width="1.1" opacity="0.55"/>`;
  }
  genCircles+=`<polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="none" stroke="#8a93a3" stroke-width="1" stroke-dasharray="2,2" opacity="0.4"/>`;
  const theta=2*Math.PI/3-2*Math.asin(clamp(d/(2*s),-1,1));
  const half=theta/2, refHalf=Math.PI/3;
  const px=pts[0][0], py=pts[0][1];
  const rl=34;
  const a1=[px-rl*Math.sin(refHalf), py-rl*Math.cos(refHalf)];
  const a2=[px+rl*Math.sin(refHalf), py-rl*Math.cos(refHalf)];
  const b1=[px-rl*Math.sin(half), py-rl*Math.cos(half)];
  const b2=[px+rl*Math.sin(half), py-rl*Math.cos(half)];
  const protractor=`
    <g opacity="0.35"><line x1="${px}" y1="${py}" x2="${a1[0]}" y2="${a1[1]}" stroke="#8a93a3" stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="${px}" y1="${py}" x2="${a2[0]}" y2="${a2[1]}" stroke="#8a93a3" stroke-width="1" stroke-dasharray="3,2"/></g>
    <line x1="${px}" y1="${py}" x2="${b1[0]}" y2="${b1[1]}" stroke="var(--teal)" stroke-width="2"/>
    <line x1="${px}" y1="${py}" x2="${b2[0]}" y2="${b2[1]}" stroke="var(--amber)" stroke-width="2"/>
  `;
  const modes=['Caustic','Prismatic','Kinetic','Scotopic','Cryptic'];
  let dial='';
  const dialR1=195, dialR2=232;
  modes.forEach((m,i)=>{
    const a0=-Math.PI/2 + i*2*Math.PI/5 - Math.PI/5, a1_=a0+2*Math.PI/5;
    const active = m===mode.name;
    const midA=(a0+a1_)/2;
    const lx=cx+ (dialR2+16)*Math.cos(midA), ly=cy+(dialR2+16)*Math.sin(midA);
    dial+=`<path d="M ${cx+dialR1*Math.cos(a0)} ${cy+dialR1*Math.sin(a0)}
      L ${cx+dialR2*Math.cos(a0)} ${cy+dialR2*Math.sin(a0)}
      A ${dialR2} ${dialR2} 0 0 1 ${cx+dialR2*Math.cos(a1_)} ${cy+dialR2*Math.sin(a1_)}
      L ${cx+dialR1*Math.cos(a1_)} ${cy+dialR1*Math.sin(a1_)}
      A ${dialR1} ${dialR1} 0 0 0 ${cx+dialR1*Math.cos(a0)} ${cy+dialR1*Math.sin(a0)} Z"
      fill="${active?mode.color:'#12161d'}" opacity="${active?0.55:0.7}" stroke="#1a2029" stroke-width="1"/>
      <text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" fill="${active?mode.color:'#5c6675'}" font-family="JetBrains Mono" font-size="9.5">${m}</text>`;
  });
  let nodes='';
  const nodeR=260;
  const pathColor = Nc>=3? 'var(--amber)':'var(--crit)';
  for(let i=0;i<6;i++){
    const ang=-Math.PI/2 + i*Math.PI/3;
    const x=cx+nodeR*Math.cos(ang), y=cy+nodeR*Math.sin(ang);
    const engaged=i<Nc;
    nodes+=`<circle cx="${x}" cy="${y}" r="5.5" fill="${engaged?pathColor:'#12161d'}" stroke="${engaged?pathColor:'#3a424f'}" stroke-width="1.2" opacity="${engaged?0.9:0.6}"/>`;
    if(engaged) nodes+=`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${pathColor}" stroke-width="1" opacity="0.18"/>`;
  }
  let cycle='';
  const cycR=300;
  for(let i=0;i<6;i++){
    const ang=-Math.PI/2 + i*Math.PI/3;
    const x=cx+cycR*Math.cos(ang), y=cy+cycR*Math.sin(ang);
    const label=hexOrder[i];
    const isTension=/[A-Z]/.test(label[0]);
    cycle+=`<circle cx="${x}" cy="${y}" r="4.5" fill="${isTension?'var(--amber)':'var(--teal)'}" opacity="0.8"/>
      <text x="${cx+(x-cx)*1.10}" y="${cy+(y-cy)*1.10}" text-anchor="middle" dominant-baseline="middle" fill="#8a93a3" font-family="JetBrains Mono" font-size="10" font-weight="700">${label}</text>`;
  }
  cycle=`<circle cx="${cx}" cy="${cy}" r="${cycR}" fill="none" stroke="#1a2029" stroke-width="1"/>` + cycle;
  const phaseRad=phase*Math.PI/180;
  const mx=cx+cycR*Math.cos(phaseRad-Math.PI/2), my=cy+cycR*Math.sin(phaseRad-Math.PI/2);
  cycle+=`<line x1="${cx}" y1="${cy}" x2="${mx}" y2="${my}" stroke="${tensionColor}" stroke-width="1" opacity="0.4"/>
    <circle cx="${mx}" cy="${my}" r="7" fill="none" stroke="#ffffff" stroke-width="2"/>
    <circle cx="${mx}" cy="${my}" r="2.6" fill="#ffffff"/>`;
  const causticAng=-Math.PI/2 + Math.PI/5;
  const cxA=cx+ (membOuter-6)*Math.cos(causticAng), cyA=cy+(membOuter-6)*Math.sin(causticAng);
  const solvAng=Math.PI*0.78;
  const sxB=cx+ membOuter*Math.cos(solvAng), syB=cy+membOuter*Math.sin(solvAng);
  const dissip=`
    <circle cx="${cxA}" cy="${cyA}" r="3" fill="var(--crit)"/>
    <path d="M ${sxB-14} ${syB} Q ${sxB} ${syB-14} ${sxB+14} ${syB}" fill="none" stroke="var(--violet)" stroke-width="1.4" opacity="0.7"/>
  `;
  return radar+zones+genCircles+protractor+dial+nodes+cycle+dissip;
}
function render(){
  const s=parseFloat(sSlider.value);
  updateDRange();
  const d=parseFloat(dSlider.value);
  const k=parseFloat(kSlider.value);
  const C=parseFloat(cSlider.value);
  const Nc=parseInt(ncSlider.value);
  const stack=parseInt(stackSlider.value);
  const phase=parseFloat(phaseSlider.value);
  $('v-s').textContent=s.toFixed(3);
  $('v-d').textContent=d.toFixed(3);
  $('v-k').textContent=k.toFixed(2);
  $('v-c').textContent=C.toFixed(2);
  $('v-nc').textContent=Nc;
  $('v-stack').textContent=stack;
  $('v-p').textContent=phase.toFixed(0)+'°';
  const ratio=clamp(d/(2*s),-1,1);
  const theta=2*Math.PI/3-2*Math.asin(ratio);
  const dtheta=2*Math.asin(ratio);
  const dtheta_c=Math.PI/3;
  const ratioMode=dtheta/dtheta_c;
  $('out-theta').textContent=(theta*180/Math.PI).toFixed(2)+'°';
  $('out-dtheta').textContent='Δθ = '+(dtheta*180/Math.PI).toFixed(2)+'° · '+fmt(dtheta)+' rad';
  $('out-ratio').textContent=fmt(ratioMode,3);
  const sigma=k*dtheta;
  const tension=sigma>0;
  const Y=Math.sqrt(10)*Math.abs(sigma), K=Math.sqrt(10)/3*Math.abs(sigma), G=3/Math.PI*Math.abs(sigma);
  $('out-sigma').textContent='σ = '+fmt(sigma);
  $('out-sigma').className='big '+(tension?'amber':'teal');
  $('out-dipole').textContent=tension? 'P > 0 — tension dipole active':'p < 0 — pressure dipole active';
  $('out-Y').textContent=fmt(Y);
  $('out-K').textContent=fmt(K);
  $('out-G').textContent=fmt(G);
  $('out-refr').textContent=tension? 'N > 1 (c_med < c)':'n < 1 (phase c_med > c)';
  const rin=(1-Math.sqrt(6)/4)*s, rout=(1+Math.sqrt(6)/4)*s, drm=Math.sqrt(6)/2*s, lsig=s/Math.sqrt(10);
  $('out-lsig').textContent='ℓ_σ = '+fmt(lsig)+' fm';
  $('out-rin').textContent=fmt(rin)+' fm';
  $('out-rout').textContent=fmt(rout)+' fm';
  $('out-drm').textContent=fmt(drm)+' fm';
  const mc2=HBAR_C/s, absSigma=C*HBAR_C/(s*s);
  $('out-mc2').textContent=fmt(mc2)+' MeV';
  $('out-abssigma').textContent='|σ_res| = '+fmt(absSigma)+' MeV·fm⁻¹';
  const thetaBC=Math.acos(-2/3), H=s/Math.sqrt(10), R=3*s*Math.sqrt(3)/10;
  $('out-thetaBC').textContent=(thetaBC*180/Math.PI).toFixed(2)+'°';
  $('out-H').textContent=fmt(H)+' fm';
  $('out-R').textContent=fmt(R)+' fm';
  $('out-stack').textContent = stack===30 ? '30/30 — TREFOIL CLOSURE (2,3)' : stack+'/30 tetrahedra';
  $('out-stack').style.color = stack===30 ? 'var(--crit)' : 'var(--ink)';
  const mode=opticalMode(ratioMode);
  $('s-mode').textContent=mode.name+' — '+mode.full;
  $('dot-mode').style.background=mode.color;
  const regime=currentRegime(phase);
  $('s-regime').textContent=regime+' ('+hexMeaning[regime]+')';
  const pathLabel = Nc>=3? 'aggregation pathway (N_c≥3)':'dissolution pathway (N_c<3)';
  $('s-path').textContent=pathLabel;
  $('dot-path').style.background = Nc>=3? 'var(--amber)':'var(--crit)';
  $('instrument').innerHTML = buildInstrument(s,d,phase,ratioMode,tension,Nc,stack);
  const geom=drawSpark(s);
  markSpark(geom,s,d);
}
[sSlider,dSlider,kSlider,cSlider,ncSlider,stackSlider,phaseSlider].forEach(el=>el.addEventListener('input',render));
$('playbtn').addEventListener('click',()=>{
  animating=!animating;
  $('playbtn').textContent = animating? '❚❚ pause cycle' : '▶ animate cycle';
  if(animating){
    (function step(){
      if(!animating) return;
      phaseSlider.value=(parseFloat(phaseSlider.value)+1.1)%360;
      render();
      animId=requestAnimationFrame(step);
    })();
  } else cancelAnimationFrame(animId);
});
render();
