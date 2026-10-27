(()=>{
'use strict';
const $=id=>document.getElementById(id);
const Q=new URLSearchParams(location.search);
const AUTO=Q.has('auto'),TEST=Q.has('test');
const clamp=(v,a,b)=>v<a?a:v>b?b:v;
const rnd=(a,b)=>a+Math.random()*(b-a);
const pick=a=>a[(Math.random()*a.length)|0];
const sstep=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);};

/* =================== LEVELS =================== */
const LEVELS=[
 {name:'Golden Meadow',len:900,v0:30,v1:34,gap:7,bug:.2,special:.10,specials:['hopper'],hearts:false,
  sky:[0x2b1b4a,0xb4507e,0xffa86a,0x6a4a5a],sunDir:[.1,.07,-1],sunCol:0xfff0c0,fog:0xf6a888,fogFar:330,hill:3,
  ground:[0x6eb84f,0x58a040,0x8fcf62],road:['#cfa56c','#b98f56','#fff3da','#a07a46'],mount:[0x8b6aa6,0x7a5f9c,0x9a77ad],snow:0xffe6ee,cloud:[0xfff4ee,0xf2a39c],
  hemi:[0xfff0dd,0x55704a,.72],sun:[0xffd2a0,.95],rim:0xffd9a8,props:'meadow',amb:'pollen',vig:'rgba(60,20,60,.5)',out:0x1a1023,
  chords:[[48,0],[45,1],[41,0],[43,0]],bpm:118,
  boss:{name:'RATE LIMIT GOLEM',code:'429',sub:'TOO MANY REQUESTS',hp:3,c1:0x8b7d70,c2:0x6e6259,eye:0xff2a44,acc:0x5fae4a,deco:'moss',scale:1.5,attacks:['rock'],rate:2.1,fake:0}},
 {name:'Sakura Hills',len:1000,v0:31,v1:35,gap:6.6,bug:.24,special:.16,specials:['hopper','wall','wall','fake'],hearts:false,
  sky:[0x3a2a6e,0xc98ac8,0xffc3c0,0x7a5a7a],sunDir:[-.25,.1,-1],sunCol:0xfff6e8,fog:0xf7c2c6,fogFar:320,hill:3.6,
  ground:[0x7cc46a,0x62ab55,0xa6d878],road:['#e2c9a6','#c9ab86','#ffffff','#a88c6a'],mount:[0x9d86c4,0x8a74b5,0xb59ad2],snow:0xffffff,cloud:[0xffffff,0xf4b3cf],
  hemi:[0xfff0f6,0x6a7a5a,.75],sun:[0xffe6f0,.9],rim:0xffd6ea,props:'sakura',amb:'petals',vig:'rgba(80,30,80,.45)',out:0x2a1430,
  chords:[[50,0],[47,1],[43,0],[45,0]],bpm:124,
  boss:{name:'HALLUCINATION GOLEM',code:'???',sub:'CONFIDENTLY WRONG',hp:3,c1:0xb8a6d6,c2:0x8f7cb3,eye:0xd04dff,acc:0xc77dff,deco:'crystal',scale:1.5,attacks:['rock','fakering'],rate:1.9,fake:.32}},
 {name:'Copper Canyon',len:1100,v0:33,v1:37,gap:6.3,bug:.26,special:.2,specials:['hopper','wall','gate','meteor','fake'],hearts:true,
  sky:[0x2a3a7a,0x6aa0d8,0xffd08a,0x8a5a3a],sunDir:[.2,.16,-1],sunCol:0xfff2c8,fog:0xf2c08c,fogFar:340,hill:1.6,
  ground:[0xe0a868,0xc98a4e,0xf0c486],road:['#9a7a5a','#7a5a3e','#ffe2a0','#5a3e28'],mount:[0xc8683a,0xb0552e,0xd8844a],snow:0xf0b070,cloud:[0xfffaf0,0xf2c49a],
  hemi:[0xfff2dc,0x8a6040,.78],sun:[0xffe0b0,1],rim:0xfff0c8,props:'desert',amb:'dust',vig:'rgba(70,30,10,.45)',out:0x2a140a,mesa:true,
  chords:[[45,1],[43,0],[41,0],[40,0]],bpm:128,
  boss:{name:'TIMEOUT TITAN',code:'504',sub:'GATEWAY TIMEOUT',hp:4,c1:0xd09060,c2:0xa86a40,eye:0xff6a1a,acc:0x7a4a2a,deco:'stripe',scale:1.55,attacks:['rock','shock'],rate:1.9,fake:0}},
 {name:'Neon Night',len:1150,v0:34,v1:38,gap:6.3,bug:.22,special:.2,specials:['hopper','wall','gate','meteor','fake','sweeper','sweeper'],hearts:true,
  sky:[0x05031a,0x1a1250,0x5a2a8a,0x0a0618],sunDir:[0,.25,-1],sunCol:0xd8e8ff,fog:0x2a1a5a,fogFar:300,hill:1.4,night:true,
  ground:[0x1e3a4a,0x162a3a,0x2a5060],road:['#1a1830','#2a2850','#ff4fd8','#3af0ff'],mount:[0x2a1a5a,0x22164a,0x34206a],snow:0x3af0ff,cloud:[0x6a5aa8,0x2a1a5a],
  hemi:[0x8aa0ff,0x201040,.6],sun:[0xb0c0ff,.55],rim:0x3af0ff,props:'night',amb:'fireflies',vig:'rgba(5,0,25,.65)',out:0x05020f,
  chords:[[45,1],[41,0],[48,0],[43,0]],bpm:132,
  boss:{name:'NULL POINTER KNIGHT',code:'NULL',sub:'CANNOT READ PROPERTIES OF UNDEFINED',hp:4,c1:0x3a4060,c2:0x262a44,eye:0x3af0ff,acc:0xff4fd8,deco:'visor',scale:1.55,attacks:['rock','shock','movering'],rate:1.7,fake:0}},
 {name:'Storm Summit',len:1250,v0:36,v1:40,gap:6.1,bug:.24,special:.22,specials:['hopper','wall','gate','meteor','meteor','fake','sweeper'],hearts:true,
  sky:[0x12060e,0x4a1424,0xc8462a,0x200a10],sunDir:[.05,.05,-1],sunCol:0xffb070,fog:0x6a2a2a,fogFar:300,hill:4.2,storm:true,
  ground:[0x3a2e34,0x2a2026,0x54444a],road:['#2a2228','#1a1418','#ff7a2f','#ff3a1a'],mount:[0x2a1418,0x341a1e,0x22100f],snow:0xff5a2a,cloud:[0x5a3a44,0x2a1418],
  hemi:[0xffb0a0,0x200a0a,.62],sun:[0xff9a6a,.8],rim:0xff7a3a,props:'storm',amb:'embers',vig:'rgba(30,0,0,.6)',out:0x0a0204,
  chords:[[40,1],[36,0],[38,0],[35,0]],bpm:140,
  boss:{name:'CONTEXT LIMIT TITAN',code:'200K',sub:'CONTEXT WINDOW FULL',hp:5,c1:0x2a2428,c2:0x1a1618,eye:0xff7a2f,acc:0xff4a1a,deco:'lava',scale:1.75,attacks:['rock','shock','movering','fakering','meteor'],rate:1.6,fake:.25}},
];
const REWARDS=[
 {type:'skill',rar:'RARE',name:'caveman',repo:'JuliusBrussee/caveman',stars:'115k',desc:'The viral skill that makes coding agents talk like a caveman to cut tokens. The author says it cuts about 65% of tokens. Why use many token when few token do trick.',
  list:['Works with Claude Code, Codex and other coding agents','Fewer tokens per answer = lower bills and longer sessions'],install:'npx skills add JuliusBrussee/caveman -g'},
 {type:'skill',rar:'RARE',name:'graphify',repo:'Graphify-Labs/graphify',stars:'136k',desc:'Type /graphify and it maps your whole project (code, docs, PDFs, images) into a knowledge graph your agent can query instead of re-reading files.',
  list:['Code is parsed locally with tree-sitter, no LLM, nothing leaves your machine','Outputs a clickable graph.html, a highlights report and graph.json','Works in Claude Code, Cursor, Codex, Gemini CLI and more'],install:'uv tool install graphifyy\ngraphify install\n\n# then in your assistant:\n/graphify'},
 {type:'skill',rar:'EPIC',name:'anthropics/skills',repo:'anthropics/skills',stars:'184k',desc:'Anthropic’s official skills repository: the document skills behind Claude’s Word, PDF, PowerPoint and Excel abilities, plus creative, design and developer examples.',
  list:['document-skills: docx, pdf, pptx, xlsx','example-skills: creative, design, development and enterprise','The Agent Skills spec and a template to write your own'],install:'/plugin marketplace add anthropics/skills\n/plugin install document-skills@anthropic-agent-skills\n/plugin install example-skills@anthropic-agent-skills'},
 {type:'skill',rar:'EPIC',name:'superpowers',repo:'obra/superpowers',stars:'306k',desc:'The most-starred skills pack here: a full development method for coding agents built from composable skills that trigger on their own.',
  list:['Teases out a spec first and shows it in short readable chunks','Writes an implementation plan before any code','Runs subagent-driven development that works through and reviews each task'],install:'/plugin install superpowers@claude-plugins-official'},
 {type:'prompt',rar:'LEGENDARY',name:'Token Rider: the full prompt',file:'rewards/token-rider-prompt.txt',desc:'The prompt for this entire game. Paste it into Claude and ride your own version.'},
];
const RARC={RARE:['#4da3ff','#a8dcff'],EPIC:['#a855f7','#e6c2ff'],LEGENDARY:['#ff7a2f','#ffd36b']};

/* =================== SAVE =================== */
let save={unlocked:1,cleared:[]};
try{const s=JSON.parse(localStorage.getItem('tr_save_v2')||'null');if(s&&s.unlocked)save=s;}catch(e){}
if(Q.has('unlockall'))save={unlocked:5,cleared:[1,2,3,4,5]};
function persist(){if(Q.has('unlockall'))return;try{localStorage.setItem('tr_save_v2',JSON.stringify(save));}catch(e){}}

/* =================== RENDERER =================== */
const canvas=$('c');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75));
const scene=new THREE.Scene();
scene.fog=new THREE.Fog(0xf6a888,70,330);
const camera=new THREE.PerspectiveCamera(64,1,.1,1200);
const hemi=new THREE.HemisphereLight(0xfff0dd,0x55704a,.72);scene.add(hemi);
const sunL=new THREE.DirectionalLight(0xffd2a0,.95);sunL.position.set(-30,45,-25);scene.add(sunL);

const GM=(()=>{const d=new Uint8Array([84,84,84,255,158,158,158,255,232,232,232,255]);const t=new THREE.DataTexture(d,3,1,THREE.RGBAFormat);t.minFilter=t.magFilter=THREE.NearestFilter;t.needsUpdate=true;return t;})();
const RIM={value:new THREE.Color(0xffd9a8)};
const MC={};
function toon(c,noRim){const k=(noRim?'n':'r')+c;if(MC[k])return MC[k];const m=new THREE.MeshToonMaterial({color:c,gradientMap:GM});
  if(!noRim){m.onBeforeCompile=sh=>{sh.uniforms.uRim=RIM;sh.fragmentShader='uniform vec3 uRim;\n'+sh.fragmentShader.replace('#include <output_fragment>','float rimF=1.0-max(dot(normal,normalize(vViewPosition)),0.0);outgoingLight+=uRim*smoothstep(.62,.7,rimF)*.45;\n#include <output_fragment>');};m.customProgramCacheKey=()=>'rim1';}
  return MC[k]=m;}
const BC={};const basic=(c,o)=>{if(!o){return BC[c]||(BC[c]=new THREE.MeshBasicMaterial({color:c}));}return new THREE.MeshBasicMaterial(Object.assign({color:c},o));};
const OUT=new THREE.MeshBasicMaterial({color:0x1a1023,side:THREE.BackSide});
function M(geo,mat,outline){const m=new THREE.Mesh(geo,mat);if(outline){const o=new THREE.Mesh(geo,OUT);o.scale.setScalar(outline===true?1.07:outline);m.add(o);}return m;}
function cvTex(w,h,draw){const cv=document.createElement('canvas');cv.width=w;cv.height=h;draw(cv.getContext('2d'),w,h);return new THREE.CanvasTexture(cv);}
function glowTex(inner,outer){return cvTex(128,128,(g)=>{const gr=g.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,inner);gr.addColorStop(.35,outer);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,128,128);});}
const GLOW=glowTex('rgba(255,255,255,1)','rgba(255,255,255,.45)');
const SPM={};
function at(o,x,y,z){o.position.set(x,y,z);return o;}
function sprite(col,s,op){const k=col+'_'+(op||1);const mat=SPM[k]||(SPM[k]=new THREE.SpriteMaterial({map:GLOW,color:col,transparent:true,opacity:op||1,blending:THREE.AdditiveBlending,depthWrite:false,fog:false}));const sp=new THREE.Sprite(mat);sp.scale.setScalar(s);return sp;}

/* =================== SKY =================== */
const skyU={cTop:{value:new THREE.Color()},cMid:{value:new THREE.Color()},cHor:{value:new THREE.Color()},cLow:{value:new THREE.Color()},sunDir:{value:new THREE.Vector3(0,.1,-1)},sunCol:{value:new THREE.Color()},boost:{value:0}};
const sky=new THREE.Mesh(new THREE.SphereGeometry(600,32,18),new THREE.ShaderMaterial({uniforms:skyU,side:THREE.BackSide,depthWrite:false,fog:false,
 vertexShader:'varying vec3 vDir;void main(){vDir=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
 fragmentShader:'uniform vec3 cTop,cMid,cHor,cLow,sunDir,sunCol;uniform float boost;varying vec3 vDir;void main(){float h=vDir.y;vec3 c;if(h>0.0){c=h<0.13?mix(cHor,cMid,smoothstep(0.0,0.13,h)):mix(cMid,cTop,smoothstep(0.13,0.6,h));}else{c=mix(cHor,cLow,clamp(-h*5.0,0.0,1.0));}float d=max(dot(vDir,normalize(sunDir)),0.0);c+=sunCol*(pow(d,6.0)*0.22+pow(d,60.0)*0.35);c=mix(c,sunCol,smoothstep(0.9978,0.9984,d));c+=boost;gl_FragColor=vec4(c,1.0);}'}));
sky.renderOrder=-10;scene.add(sky);
const stars=(()=>{const n=500,p=new Float32Array(n*3);for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,y=rnd(.05,1);const r=Math.sqrt(1-y*y);p[i*3]=Math.cos(a)*r*560;p[i*3+1]=y*560;p[i*3+2]=Math.sin(a)*r*560;}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(p,3));const s=new THREE.Points(g,new THREE.PointsMaterial({color:0xffffff,size:2,sizeAttenuation:false,fog:false,transparent:true,opacity:.85,depthWrite:false}));s.renderOrder=-9;sky.add(s);return s;})();

const far=new THREE.Group();scene.add(far);
const cloudTex=cvTex(256,128,(g,w,h)=>{const puffs=[[60,80,40],[110,62,52],[165,70,44],[205,86,30],[90,92,34],[140,92,38]];g.fillStyle='#fff';puffs.forEach(([x,y,r])=>{g.beginPath();g.arc(x,y,r,0,7);g.fill();});
  g.globalCompositeOperation='source-atop';const gr=g.createLinearGradient(0,30,0,128);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(.55,'rgba(255,255,255,0)');gr.addColorStop(.56,'rgba(0,0,0,.22)');gr.addColorStop(1,'rgba(0,0,0,.3)');g.fillStyle=gr;g.fillRect(0,0,w,h);});
const cloudMats=[new THREE.SpriteMaterial({map:cloudTex,fog:false,transparent:true,depthWrite:false}),new THREE.SpriteMaterial({map:cloudTex,fog:false,transparent:true,depthWrite:false})];
const clouds=[];for(let i=0;i<18;i++){const s=new THREE.Sprite(cloudMats[i%2]);const sc=rnd(50,110);s.scale.set(sc,sc/2,1);s.position.set(rnd(-420,420),rnd(40,120),-rnd(260,480));s.renderOrder=-8;far.add(s);clouds.push(s);}
let farMounts=new THREE.Group();far.add(farMounts);
const sunGlow=sprite(0xffffff,160,.55);far.add(sunGlow);

/* =================== GROUND =================== */
const LEN=760,RT=12;
let roadTex=null;
const road=new THREE.Mesh(new THREE.PlaneGeometry(15,LEN),new THREE.MeshToonMaterial({gradientMap:GM,polygonOffset:true,polygonOffsetFactor:-2}));
road.rotation.x=-Math.PI/2;road.position.y=.03;scene.add(road);
function makeRoadTex(c){roadTex&&roadTex.dispose();roadTex=cvTex(128,128,(g,w,h)=>{g.fillStyle=c[0];g.fillRect(0,0,w,h);g.fillStyle=c[1];for(let i=0;i<10;i++)g.fillRect(rnd(14,w-20),rnd(0,h),rnd(4,10),2);
  g.fillStyle=c[3];g.fillRect(0,0,10,h);g.fillRect(w-10,0,10,h);g.fillStyle=c[2];g.fillRect(10,0,3,h);g.fillRect(w-13,0,3,h);g.fillRect(w/2-3,0,6,h*.45);});
  roadTex.wrapS=roadTex.wrapT=THREE.RepeatWrapping;roadTex.repeat.set(1,LEN/RT);roadTex.anisotropy=renderer.capabilities.getMaxAnisotropy();road.material.map=roadTex;road.material.needsUpdate=true;}

const CH=80,NCH=7;
let LV=LEVELS[0],LI=0;
function hAt(x,z){const ax=Math.abs(x);if(ax<9)return -.06;const e=sstep(9,34,ax);
  const n=Math.sin(x*.043+z*.011)+Math.sin(z*.029-x*.017)*1.3+Math.sin(x*.12+z*.09)*.35;return (n*LV.hill+LV.hill*1.7)*e;}
const terrMat=new THREE.MeshToonMaterial({gradientMap:GM,vertexColors:true});
const tuftGeo=new THREE.ConeGeometry(.13,.7,4);tuftGeo.translate(0,.3,0);
const flowerGeo=new THREE.IcosahedronGeometry(.16,0);flowerGeo.translate(0,.35,0);
const tuftMat=new THREE.MeshToonMaterial({gradientMap:GM});
const flowerMat=new THREE.MeshBasicMaterial();
const chunks=[];
const tmpM=new THREE.Matrix4(),tmpQ=new THREE.Quaternion(),tmpS=new THREE.Vector3(),tmpP=new THREE.Vector3(),tmpC=new THREE.Color(),tmpE=new THREE.Euler();

/* --- props --- */
const G={pineT:new THREE.CylinderGeometry(.25,.38,1.8,6),cone1:new THREE.ConeGeometry(1.7,2.7,7),cone2:new THREE.ConeGeometry(1.2,2.3,7),blob:new THREE.IcosahedronGeometry(1,1),rock:new THREE.DodecahedronGeometry(1),
 box:new THREE.BoxGeometry(1,1,1),cyl:new THREE.CylinderGeometry(.5,.5,1,8),caps:new THREE.CapsuleGeometry(.45,1.6,4,8),oct:new THREE.OctahedronGeometry(1),sph:new THREE.SphereGeometry(1,12,8)};
function mkProp(kind){const g=new THREE.Group();g.userData.kind=kind;const L=LV;
 if(kind==='pine'){const tr=M(G.pineT,toon(0x7a4b2a),true);tr.position.y=.9;g.add(tr);const c=pick([0x4f9e44,0x3f8d3f,0x5fae4a]);const a=M(G.cone1,toon(c),true);a.position.y=2.6;g.add(a);const b=M(G.cone2,toon(c),true);b.position.y=3.9;g.add(b);}
 else if(kind==='bush'){const c=pick(L.props==='sakura'?[0x6aae5a,0xf2a6c8]:[0x5fae4a,0x4f9e44,0x6dbb52]);for(let i=0;i<3;i++){const b=M(G.blob,toon(c),true);const s=rnd(.6,1.1);b.scale.setScalar(s);b.position.set(rnd(-.8,.8),s*.6,rnd(-.6,.6));g.add(b);}}
 else if(kind==='rock'){const c=L.props==='desert'?pick([0xc8784a,0xb0663c]):L.props==='storm'?pick([0x241c20,0x302428]):L.props==='night'?0x2a3050:0x9a8d86;const r=M(G.rock,toon(c),true);r.scale.set(rnd(.7,1.6),rnd(.5,1.1),rnd(.7,1.5));r.position.y=.3;g.add(r);}
 else if(kind==='sakura'){const tr=M(new THREE.CylinderGeometry(.22,.4,2.6,6),toon(0x5a3a3a),true);tr.position.y=1.3;tr.rotation.z=rnd(-.15,.15);g.add(tr);
   for(let i=0;i<4;i++){const b=M(G.blob,toon(pick([0xffb7d5,0xff9cc6,0xffd0e4])),true);const s=rnd(1.1,1.7);b.scale.setScalar(s);b.position.set(rnd(-1.3,1.3),rnd(2.8,3.8),rnd(-1.1,1.1));g.add(b);}}
 else if(kind==='lantern'){const a=M(G.box,toon(0xb8b0a8),true);a.scale.set(.6,1.2,.6);a.position.y=.6;g.add(a);const b=M(G.box,toon(0x9a928a),true);b.scale.set(1.1,.25,1.1);b.position.y=1.35;g.add(b);const l=M(G.box,basic(0xffd27a));l.scale.set(.45,.4,.45);l.position.y=1.65;g.add(l);const r=M(G.box,toon(0x8a827a),true);r.scale.set(1,.2,1);r.position.y=1.95;g.add(r);g.add(at(sprite(0xffb060,2.2,.6),0,1.65,0));}
 else if(kind==='cactus'){const c=toon(0x4f9a5a);const b=M(G.caps,c,true);b.scale.set(1,1.4,1);b.position.y=1.6;g.add(b);[-1,1].forEach(s=>{if(Math.random()<.75){const a=M(G.caps,c,true);a.scale.set(.6,.55,.6);a.position.set(s*.75,1.9+rnd(-.3,.4),0);g.add(a);const j=M(G.cyl,c);j.scale.set(.5,.6,.5);j.rotation.z=Math.PI/2;j.position.set(s*.45,1.5,0);g.add(j);}});}
 else if(kind==='crystal'){const col=pick([0x3af0ff,0xff4fd8,0x8a6bff]);for(let i=0;i<3;i++){const c=M(G.oct,basic(col),true);const s=rnd(.5,1);c.scale.set(s*.6,s*1.8,s*.6);c.position.set(rnd(-.6,.6),s*1.5,rnd(-.6,.6));c.rotation.z=rnd(-.3,.3);g.add(c);}g.add(at(sprite(col,6,.35),0,1.5,0));}
 else if(kind==='lamp'){const p=M(G.cyl,toon(0x2a2a40),true);p.scale.set(.25,5,.25);p.position.y=2.5;g.add(p);const arm=M(G.box,toon(0x2a2a40));arm.scale.set(1.4,.18,.18);arm.position.set(0,5,0);g.add(arm);const col=pick([0x3af0ff,0xff4fd8]);const l=M(G.box,basic(col));l.scale.set(.6,.18,.4);l.position.set(0,4.85,0);g.add(l);const sp=sprite(col,5,.7);sp.position.set(0,4.8,0);g.add(sp);g.userData.lamp=1;}
 else if(kind==='dead'){const c=toon(0x1a1214);const tr=M(new THREE.CylinderGeometry(.18,.35,3.4,5),c,true);tr.position.y=1.7;g.add(tr);for(let i=0;i<3;i++){const br=M(new THREE.CylinderGeometry(.06,.14,1.6,4),c,true);br.position.set(0,2.2+i*.5,0);br.rotation.z=(i%2?1:-1)*rnd(.6,1.1);br.translateY(.6);g.add(br);}}
 else if(kind==='lava'){const l=M(G.box,basic(pick([0xff5a1a,0xff8a2a])));l.scale.set(rnd(2,5),.08,rnd(.3,.7));l.position.y=.08;l.rotation.y=rnd(0,3);g.add(l);g.add(at(sprite(0xff5a1a,4,.5),0,.4,0));}
 else if(kind==='post'){const c=L.props==='sakura'?toon(0xc84a3a):toon(0xe8dcc8);const p=M(G.box,c,true);p.scale.set(.22,1.2,.22);p.position.y=.6;g.add(p);}
 return g;}
const PROPS={meadow:[['pine',8,10,38],['pine',4,30,70],['bush',5,9,30],['rock',3,10,40]],
 sakura:[['sakura',6,10,36],['sakura',3,30,70],['bush',3,10,30],['lantern',2,8.6,9.4],['rock',2,10,40]],
 desert:[['cactus',6,10,40],['rock',7,10,60]],
 night:[['lamp',3,8.8,9.2],['crystal',7,11,45],['rock',3,10,40]],
 storm:[['dead',7,10,42],['lava',6,11,45],['rock',7,10,55]]};
const TUFTS={meadow:[170,[0x5aa040,0x6eb84f,0x4a8f38],70,[0xffffff,0xffe066,0xff8fb8,0xb0a0ff]],sakura:[150,[0x6aae5a,0x7cc46a,0x58994a],80,[0xffffff,0xffb7d5,0xff8fb8]],
 desert:[45,[0xb89a5a,0xa8884a,0xc8aa6a],0,[]],night:[120,[0x1e5a6a,0x2a6a7a,0x16404e],60,[0x3af0ff,0xff4fd8,0xb08aff]],storm:[40,[0x4a2a2a,0x3a2024,0x5a3434],30,[0xff5a1a,0xff8a2a]]};
function buildChunk(ch){if(ch.group){scene.remove(ch.group);}
 const g=new THREE.Group();ch.group=g;scene.add(g);
 const geo=new THREE.PlaneGeometry(700,CH,64,10);geo.rotateX(-Math.PI/2);geo.setAttribute('color',new THREE.BufferAttribute(new Float32Array(geo.attributes.position.count*3),3));
 const terr=new THREE.Mesh(geo,terrMat);g.add(terr);ch.terr=terr;
 ch.props=[];(PROPS[LV.props]||[]).forEach(([k,n,a,b])=>{for(let i=0;i<n;i++){const p=mkProp(k);p.userData.xr=[a,b];g.add(p);ch.props.push(p);}});
 if(LV.props==='meadow'||LV.props==='sakura'){for(let s=-1;s<=1;s+=2)for(let i=0;i<14;i++){const p=mkProp('post');p.userData.fixed=[s*8.8,-CH/2+i*(CH/14)];g.add(p);ch.props.push(p);}
   for(let s=-1;s<=1;s+=2){const r=M(G.box,LV.props==='sakura'?toon(0xc84a3a):toon(0xe8dcc8),true);r.scale.set(.12,.14,CH);r.position.set(s*8.8,.95,0);g.add(r);}}
 const [tn,tc,fn,fc]=TUFTS[LV.props];
 ch.tufts=new THREE.InstancedMesh(tuftGeo,tuftMat,tn);g.add(ch.tufts);ch.tc=tc;
 ch.flowers=fn?new THREE.InstancedMesh(flowerGeo,flowerMat,fn):null;if(ch.flowers)g.add(ch.flowers);ch.fc=fc;
 placeChunk(ch);}
function placeChunk(ch){const g=ch.group;g.position.z=ch.cz;
 const pos=ch.terr.geometry.attributes.position,col=ch.terr.geometry.attributes.color;const c0=new THREE.Color(LV.ground[0]),c1=new THREE.Color(LV.ground[1]),c2=new THREE.Color(LV.ground[2]);
 for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i)+ch.cz;const y=hAt(x,z);pos.setY(i,y);const n=(Math.sin(x*.21+z*.13)+Math.sin(z*.37))*.25+.5;
   tmpC.copy(c0).lerp(y>LV.hill*1.6?c2:c1,clamp(Math.abs(y-LV.hill*1.6)/(LV.hill*1.6+.01),0,1)*.7).lerp(c1,n*.35);col.setXYZ(i,tmpC.r,tmpC.g,tmpC.b);}
 pos.needsUpdate=true;col.needsUpdate=true;ch.terr.geometry.computeVertexNormals();
 ch.props.forEach(p=>{let x,z;if(p.userData.fixed){[x,z]=p.userData.fixed;}else{const [a,b]=p.userData.xr;x=(Math.random()<.5?-1:1)*rnd(a,b);z=rnd(-CH/2,CH/2);p.rotation.y=Math.random()*6;const s=rnd(.85,1.35);p.scale.setScalar(s);}
   p.position.set(x,hAt(x,z+ch.cz),z);});
 const place=(im,cols,xa,xb,sc)=>{for(let i=0;i<im.count;i++){const x=(Math.random()<.5?-1:1)*rnd(xa,xb),z=rnd(-CH/2,CH/2);tmpP.set(x,hAt(x,z+ch.cz),z);tmpE.set(rnd(-.2,.2),Math.random()*6,rnd(-.2,.2));tmpQ.setFromEuler(tmpE);const s=rnd(.7,1.4)*sc;tmpS.set(s,s*rnd(.8,1.4),s);tmpM.compose(tmpP,tmpQ,tmpS);im.setMatrixAt(i,tmpM);im.setColorAt(i,tmpC.setHex(pick(cols)));}
   im.instanceMatrix.needsUpdate=true;if(im.instanceColor)im.instanceColor.needsUpdate=true;};
 place(ch.tufts,ch.tc,8.2,46,1);if(ch.flowers)place(ch.flowers,ch.fc,8.4,32,1);}
function buildWorld(pz){chunks.forEach(c=>{scene.remove(c.group);c.terr.geometry.dispose();});chunks.length=0;
 for(let i=0;i<NCH;i++){const ch={cz:pz+20-CH/2-i*CH};buildChunk(ch);chunks.push(ch);}}

function buildMounts(){far.remove(farMounts);farMounts=new THREE.Group();far.add(farMounts);
 for(let i=0;i<10;i++){const x=-450+i*100+rnd(-30,30),h=rnd(55,110),c=pick(LV.mount);
   let m;if(LV.mesa){m=new THREE.Mesh(new THREE.CylinderGeometry(h*.55,h*.75,h*.7,7),new THREE.MeshToonMaterial({color:c,gradientMap:GM,fog:false}));m.position.set(x,h*.35-4,-380-rnd(0,60));
     const top=new THREE.Mesh(new THREE.CylinderGeometry(h*.56,h*.56,h*.06,7),new THREE.MeshToonMaterial({color:LV.snow,gradientMap:GM,fog:false}));top.position.y=h*.35;m.add(top);}
   else{m=new THREE.Mesh(new THREE.ConeGeometry(h*1.2,h,7),new THREE.MeshToonMaterial({color:c,gradientMap:GM,fog:false}));m.position.set(x,h/2-4,-380-rnd(0,60));
     const cap=new THREE.Mesh(new THREE.ConeGeometry(h*.34,h*.27,7),new THREE.MeshToonMaterial({color:LV.snow,gradientMap:GM,fog:false}));cap.position.y=h*.368;m.add(cap);
     if(LV.storm&&Math.random()<.5){cap.material=new THREE.MeshBasicMaterial({color:0xff5a1a,fog:false});farMounts.add(at(sprite(0xff4a1a,60,.5),x,h-4,m.position.z+10));}}
   m.rotation.y=Math.random()*3;m.renderOrder=-7;farMounts.add(m);}}

/* =================== AMBIENT =================== */
const AN=240,ambP=new Float32Array(AN*3);const ambG=new THREE.BufferGeometry();ambG.setAttribute('position',new THREE.BufferAttribute(ambP,3));
const ambM=new THREE.PointsMaterial({size:.35,map:GLOW,transparent:true,depthWrite:false,fog:false});const amb=new THREE.Points(ambG,ambM);amb.frustumCulled=false;scene.add(amb);
const AMB={pollen:[0xfff4c0,.28,false],petals:[0xffa8cf,.42,false],dust:[0xffe0b0,.22,false],fireflies:[0xc8ff6a,.5,true],embers:[0xff7a2a,.4,true]};
function seedAmb(pz){for(let i=0;i<AN;i++){ambP[i*3]=rnd(-40,40);ambP[i*3+1]=rnd(.5,18);ambP[i*3+2]=pz-rnd(-10,150);}ambG.attributes.position.needsUpdate=true;}
const lines=[];for(let i=0;i<26;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.035,.035,4.5),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0,depthWrite:false,fog:false}));m.userData.a=Math.random()*6.28;m.userData.r=rnd(2.6,6);m.userData.z=-rnd(5,45);scene.add(m);lines.push(m);}

function applyTheme(i){LI=i;LV=LEVELS[i];
 skyU.cTop.value.setHex(LV.sky[0]);skyU.cMid.value.setHex(LV.sky[1]);skyU.cHor.value.setHex(LV.sky[2]);skyU.cLow.value.setHex(LV.sky[3]);skyU.sunDir.value.set(...LV.sunDir).normalize();skyU.sunCol.value.setHex(LV.sunCol);
 scene.fog.color.setHex(LV.fog);scene.fog.near=60;scene.fog.far=LV.fogFar;
 hemi.color.setHex(LV.hemi[0]);hemi.groundColor.setHex(LV.hemi[1]);hemi.intensity=LV.hemi[2];sunL.color.setHex(LV.sun[0]);sunL.intensity=LV.sun[1];
 RIM.value.setHex(LV.rim);OUT.color.setHex(LV.out);
 cloudMats[0].color.setHex(LV.cloud[0]);cloudMats[1].color.setHex(LV.cloud[1]);
 const sd=skyU.sunDir.value;sunGlow.position.set(sd.x*400,sd.y*400,sd.z*400);sunGlow.material.color.setHex(LV.sunCol);
 stars.visible=!!LV.night;
 makeRoadTex(LV.road);buildMounts();
 const a=AMB[LV.amb];ambM.color.setHex(a[0]);ambM.size=a[1];ambM.blending=a[2]?THREE.AdditiveBlending:THREE.NormalBlending;ambM.needsUpdate=true;
 document.documentElement.style.setProperty('--vig',LV.vig);
 buildBoss(LV.boss);}

/* =================== PLAYER =================== */
const player=new THREE.Group();scene.add(player);
const bike=new THREE.Group();player.add(bike);
const shadow=new THREE.Mesh(new THREE.CircleGeometry(1.15,24),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.28,depthWrite:false}));shadow.rotation.x=-Math.PI/2;scene.add(shadow);
let scarfP,scarf2,flames=[];
(()=>{
  const body=M(new THREE.CapsuleGeometry(.55,1.9,6,14),toon(0xf6f2ea),1.08);body.rotation.x=Math.PI/2;body.scale.set(1,1,.8);bike.add(body);
  const st=M(new THREE.BoxGeometry(.32,.1,2.1),toon(0xff7a2f));st.position.set(0,.47,-.05);bike.add(st);
  const nose=M(new THREE.SphereGeometry(.42,14,10),toon(0xff7a2f),true);nose.position.set(0,-.02,-1.45);nose.scale.set(1,.75,1.1);bike.add(nose);
  const ws=new THREE.Mesh(new THREE.BoxGeometry(.8,.45,.06),basic(0x9fe8ff,{transparent:true,opacity:.55}));ws.position.set(0,.72,-.85);ws.rotation.x=-.55;bike.add(ws);
  const seat=M(new THREE.BoxGeometry(.52,.16,.8),toon(0x3a2a4a));seat.position.set(0,.5,.45);bike.add(seat);
  [-1,1].forEach(s=>{const f=M(new THREE.BoxGeometry(.08,.5,.7),toon(0xff7a2f),true);f.position.set(s*.5,.2,1.1);f.rotation.z=s*.5;bike.add(f);
    const n=M(new THREE.CylinderGeometry(.16,.2,.45,10),toon(0x40364a),true);n.rotation.x=Math.PI/2;n.position.set(s*.28,-.05,1.45);bike.add(n);
    const fl=sprite(0xff9a40,.9);fl.position.set(s*.28,-.05,1.85);bike.add(fl);flames.push(fl);});
  const ug=new THREE.Mesh(new THREE.TorusGeometry(.75,.07,8,28),basic(0x6fe6ff));ug.rotation.x=Math.PI/2;ug.scale.set(1,1.7,1);ug.position.y=-.55;bike.add(ug);
  const ugs=sprite(0x40d0ff,3.2,.5);ugs.position.y=-.7;bike.add(ugs);
  const r=new THREE.Group();r.position.set(0,.62,.3);bike.add(r);
  const jacket=toon(0x2f6fd0),dark=toon(0x2a2440);
  r.add(M(new THREE.BoxGeometry(.5,.26,.42),dark,true));
  const torso=M(new THREE.BoxGeometry(.56,.66,.34),jacket,true);torso.position.set(0,.4,-.12);torso.rotation.x=-.55;r.add(torso);
  const head=new THREE.Group();head.position.set(0,.88,-.42);r.add(head);
  head.add(M(new THREE.SphereGeometry(.34,16,12),toon(0xffffff),1.06));
  const hs=M(new THREE.TorusGeometry(.34,.05,6,24),toon(0xff7a2f));hs.rotation.y=Math.PI/2;head.add(hs);
  const vis=new THREE.Mesh(new THREE.SphereGeometry(.345,16,10,-.95,1.9,1.15,.75),basic(0x1c1a33));vis.rotation.y=Math.PI;head.add(vis);
  const pony=M(new THREE.CapsuleGeometry(.09,.45,4,8),toon(0x3b2416),true);pony.position.set(0,.05,.38);pony.rotation.x=1.1;head.add(pony);
  scarfP=new THREE.Group();scarfP.position.set(0,.62,-.22);r.add(scarfP);
  const sc1=M(new THREE.BoxGeometry(.2,.05,.6),toon(0xff5a3a),true);sc1.position.z=.3;scarfP.add(sc1);
  scarf2=new THREE.Group();scarf2.position.z=.6;scarfP.add(scarf2);const sc2=M(new THREE.BoxGeometry(.18,.05,.6),toon(0xff5a3a),true);sc2.position.z=.3;scarf2.add(sc2);
  [-1,1].forEach(s=>{const a=M(new THREE.BoxGeometry(.14,.14,.68),jacket,true);a.position.set(s*.3,.5,-.5);a.rotation.x=.35;r.add(a);
    const l=M(new THREE.BoxGeometry(.16,.16,.7),dark,true);l.position.set(s*.32,-.05,-.15);l.rotation.x=.6;r.add(l);});
  const bar=M(new THREE.BoxGeometry(.9,.07,.07),toon(0x40364a));bar.position.set(0,.78,-.95);bike.add(bar);
})();

/* =================== ENTITIES =================== */
const E={tok:new THREE.OctahedronGeometry(.52),core:new THREE.OctahedronGeometry(.24),bug:new THREE.IcosahedronGeometry(.78,0),eye:new THREE.SphereGeometry(.2,10,8),pup:new THREE.SphereGeometry(.1,8,6),
 spike:new THREE.ConeGeometry(.14,.45,5),ring:new THREE.TorusGeometry(1.9,.24,10,36),disk:new THREE.CircleGeometry(1.7,32),boul:new THREE.DodecahedronGeometry(1.15),warn:new THREE.RingGeometry(1.3,1.85,28),
 shad:new THREE.CircleGeometry(.9,16),beamGeo:new THREE.CylinderGeometry(.35,.35,1,10,1,true)};
const tokMat=basic(0xff8a3d),fakeMat=basic(0xb04aff),coreMat=basic(0xfff0d0);
const shadMat=new THREE.MeshBasicMaterial({color:0,transparent:true,opacity:.25,depthWrite:false});
const wallTex=cvTex(256,32,(g,w,h)=>{g.fillStyle='#1a1023';g.fillRect(0,0,w,h);g.fillStyle='#ffb020';for(let x=-32;x<w;x+=32){g.beginPath();g.moveTo(x,h);g.lineTo(x+16,0);g.lineTo(x+32,0);g.lineTo(x+16,h);g.fill();}});
wallTex.wrapS=THREE.RepeatWrapping;wallTex.repeat.set(3,1);
const wallMat=new THREE.MeshToonMaterial({map:wallTex,gradientMap:GM});
let ents=[];
function add(o){scene.add(o.m);ents.push(o);return o;}
function bshadow(parent){const s=new THREE.Mesh(E.shad,shadMat);s.rotation.x=-Math.PI/2;s.position.y=.04;scene.add(s);return s;}
function spawnToken(x,z,y,fake){const m=new THREE.Mesh(E.tok,fake?fakeMat:tokMat);m.add(new THREE.Mesh(E.core,fake?fakeMat:coreMat));m.add(sprite(fake?0xb050ff:0xff9a40,fake?2.8:2.4,fake?.9:.7));m.position.set(x,y||1.35,z);return add({t:'tok',m,x,z,y:y||1.35,fake:!!fake});}
function mkBug(col){const g=new THREE.Group();g.add(M(E.bug,toon(col),1.1));
  const eyes=[];[-1,1].forEach(s=>{const e=new THREE.Mesh(E.eye,basic(0xffffff,{}));e.position.set(s*.27,.25,.6);g.add(e);eyes.push(e);const p=new THREE.Mesh(E.pup,basic(0x111111));p.position.set(s*.27,.25,.77);g.add(p);
    const an=M(new THREE.ConeGeometry(.08,.5,5),toon(0x4a2470));an.position.set(s*.3,.85,0);an.rotation.z=-s*.4;g.add(an);});
  for(let i=0;i<5;i++){const sp=M(E.spike,toon(0xb04a6a));const a=i/5*Math.PI*2;sp.position.set(Math.cos(a)*.62,-.1,Math.sin(a)*.62);sp.rotation.set(Math.sin(a)*1.4,0,-Math.cos(a)*1.4);g.add(sp);}
  g.userData.eyes=eyes;return g;}
function spawnBug(x,z){const m=mkBug(0x7b3fb5);m.position.set(x,.95,z);return add({t:'bug',m,x,z,ph:Math.random()*6,sh:bshadow()});}
function spawnHopper(x,z){const m=mkBug(0x2fae6a);m.scale.setScalar(1.05);m.position.set(x,.95,z);return add({t:'hop',m,x,z,x0:x,x1:x,jt:-1,sh:bshadow()});}
function spawnSweeper(z){const g=new THREE.Group();const b=M(E.bug,toon(0x40465a),1.08);b.scale.set(1,.6,1);g.add(b);const e=new THREE.Mesh(E.eye,basic(0xff2a44));e.position.set(0,0,.7);g.add(e);g.add(at(sprite(0xff2a44,1.6,.8),0,0,.8));
  const pr=new THREE.Mesh(new THREE.CylinderGeometry(1.1,1.1,.04,16),basic(0xcfd8ff,{transparent:true,opacity:.35}));pr.position.y=.55;g.add(pr);g.position.set(0,1.3,z);
  return add({t:'swp',m:g,x:0,z,ph:Math.random()*6,w:rnd(1.4,2),sh:bshadow()});}
function spawnWall(z){const g=new THREE.Group();const w=M(G.box,wallMat,1.03);w.scale.set(15,1.1,.7);w.position.y=.55;g.add(w);const top=new THREE.Mesh(G.box,basic(0xffe066));top.scale.set(15,.08,.75);top.position.y=1.12;g.add(top);
  for(let x=-6;x<=6;x+=3)g.add(at(sprite(0xffb020,2.2,.6),x,1.15,0));g.position.set(0,0,z);
  for(let i=0;i<5;i++){const u=i/4;spawnToken(0,z+6-u*12,1.6+Math.sin(u*Math.PI)*1.9);}
  return add({t:'wall',m:g,x:0,z});}
function spawnGate(z){const g=new THREE.Group();const mat=toon(LV.night?0x2a2a50:0x5a2a3a);const L=M(G.box,mat,1.03),R=M(G.box,mat,1.03);g.add(L,R);
  const gl=new THREE.Mesh(G.box,basic(0xff3a5a)),gr=new THREE.Mesh(G.box,basic(0xff3a5a));g.add(gl,gr);g.position.set(0,0,z);
  return add({t:'gate',m:g,x:0,z,g0:rnd(-2.5,2.5),ph:Math.random()*6,parts:[L,R,gl,gr]});}
function spawnTrigger(z){return add({t:'trig',m:new THREE.Object3D(),x:0,z});}
function spawnMeteor(tx,tz,T0){const m=M(E.boul,toon(LV.storm?0x2a1418:0x5a4040),1.06);m.add(sprite(0xff6a20,4,.9));m.position.set(tx+rnd(-8,8),38,tz-14);
  const w=new THREE.Mesh(E.warn,basic(0xff2a44,{transparent:true,opacity:.7,depthWrite:false}));w.rotation.x=-Math.PI/2;w.position.set(tx,hAt(tx,tz)+.07,tz);scene.add(w);
  return add({t:'met',m,x:tx,z:tz,w,sx:m.position.x,sy:38,sz:m.position.z,t0:0,T:T0||1.15});}
function spawnHeart(x,z){const cv=cvTex(64,64,(g)=>{g.font='52px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillStyle='#ff4d6d';g.fillText('♥',32,36);});const s=new THREE.Sprite(new THREE.SpriteMaterial({map:cv,depthWrite:false}));s.scale.setScalar(2.1);
  const g=new THREE.Group();g.add(s);g.add(sprite(0xff4d6d,3,.6));g.position.set(x,1.5,z);return add({t:'heart',m:g,x,z});}
function spawnRing(x,z,fake,moving){const g=new THREE.Group();g.add(new THREE.Mesh(E.ring,basic(fake?0xff2a44:0xffa040)));
  g.add(new THREE.Mesh(E.disk,basic(fake?0xff4060:0xffc070,{transparent:true,opacity:.18,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide})));
  if(fake)for(let i=0;i<8;i++){const sp=M(E.spike,toon(0x3a0a14));const a=i/8*Math.PI*2;sp.position.set(Math.cos(a)*2.25,Math.sin(a)*2.25,0);sp.rotation.z=a-Math.PI/2;g.add(sp);}
  g.add(sprite(fake?0xff3050:0xff9a40,6,.5));g.position.set(x,1.6,z);return add({t:'ring',m:g,x,z,x0:x,fake,moving,ph:Math.random()*6,done:false});}
function spawnShock(z){const g=new THREE.Group();const col=LV.boss.eye;const w=new THREE.Mesh(G.box,basic(col,{transparent:true,opacity:.85,blending:THREE.AdditiveBlending,depthWrite:false}));w.scale.set(15,.9,.45);w.position.y=.45;g.add(w);
  for(let x=-6;x<=6;x+=2)g.add(at(sprite(col,2.6,.8),x,.6,0));g.position.set(0,0,z);return add({t:'shock',m:g,x:0,z});}
function throwRock(){const hand=new THREE.Vector3();(Math.random()<.5?bArmL:bArmR).getWorldPosition(hand);hand.y-=3;const T0=1.55;const tx=clamp(px+(Math.random()<.55?0:rnd(-2.4,2.4)),-6,6);const tz=pz-speed*T0;
  const m=M(E.boul,toon(LV.boss.c2),1.06);m.position.copy(hand);const w=new THREE.Mesh(E.warn,basic(0xff2a44,{transparent:true,opacity:.75,depthWrite:false}));w.rotation.x=-Math.PI/2;w.position.set(tx,.07,tz);scene.add(w);
  add({t:'boul',m,x:tx,z:tz,w,sx:hand.x,sy:hand.y,sz:hand.z,t0:0,T:T0});sfx('throw');}
function removeEnt(o){scene.remove(o.m);if(o.w)scene.remove(o.w);if(o.sh)scene.remove(o.sh);}

/* particles */
const parts=[];const PM={};
for(let i=0;i<200;i++){const m=new THREE.Mesh(G.box,basic(0xffffff));m.scale.setScalar(.2);m.visible=false;scene.add(m);parts.push({m,v:new THREE.Vector3(),life:0});}
let pi=0;
function burst(p,color,n,sp,up){for(let i=0;i<n;i++){const P=parts[pi++%parts.length];P.m.material=basic(color);P.m.visible=true;P.m.position.copy(p);P.v.set(rnd(-1,1)*sp,rnd(.2,1)*(up||sp),rnd(-1,1)*sp);P.life=rnd(.5,1);P.m.scale.setScalar(rnd(.12,.32));}}

/* =================== BOSS =================== */
let boss=null,bParts=[],bArmL,bArmR,bEyeMat,bChest;
function buildBoss(d){if(boss)scene.remove(boss);boss=new THREE.Group();boss.visible=false;boss.scale.setScalar(d.scale);scene.add(boss);bParts=[];
 const st=toon(d.c1),st2=toon(d.c2);const add2=(m,x,y,z,par)=>{m.position.set(x,y,z);(par||boss).add(m);if(!par)bParts.push(m);return m;};
 bEyeMat=new THREE.MeshBasicMaterial({color:d.eye});
 [-1,1].forEach(s=>add2(M(G.box.clone().scale(1.8,3.4,1.8),st2,1.05),s*1.5,1.7,0));
 add2(M(G.box.clone().scale(5.4,4.6,3.2),st,1.04),0,5.6,0);
 add2(M(G.box.clone().scale(2.8,2.3,2.4),st,1.06),0,9.1,0);
 if(d.deco==='visor'){add2(new THREE.Mesh(G.box.clone().scale(2.4,.36,.1),bEyeMat),0,9.3,1.25);}
 else [-1,1].forEach(s=>add2(new THREE.Mesh(G.box.clone().scale(.6,.32,.1),bEyeMat),s*.65,9.3,1.25));
 add2(sprite(d.eye,4,.8),0,9.3,1.4);
 const fs=d.code.length>3?62:88;
 bChest=new THREE.Mesh(new THREE.PlaneGeometry(2.8,1.4),new THREE.MeshBasicMaterial({map:cvTex(256,128,(g)=>{g.fillStyle='#14080f';g.fillRect(0,0,256,128);g.font=`900 ${fs}px Bungee, Impact, sans-serif`;g.textAlign='center';g.textBaseline='middle';const c='#'+new THREE.Color(d.eye).getHexString();g.fillStyle=c;g.shadowColor=c;g.shadowBlur=18;g.fillText(d.code,128,70);})}));add2(bChest,0,6,1.62);
 [-1,1].forEach(s=>{const p=new THREE.Group();add2(p,s*3.4,7.4,0);const a=M(G.box.clone().scale(1.5,4.4,1.5),st2,1.05);a.position.y=-2;p.add(a);const h=M(G.box.clone().scale(1.9,1.4,1.9),st,1.05);h.position.y=-4.5;p.add(h);
   if(d.deco==='moss'){const mo=M(G.box.clone().scale(1.7,.4,1.7),toon(d.acc));mo.position.y=.5;p.add(mo);}
   if(d.deco==='crystal'){for(let i=0;i<3;i++){const c=M(G.oct,basic(d.acc),true);c.scale.set(.35,1.1,.35);c.position.set(rnd(-.4,.4),1+i*.2,rnd(-.4,.4));c.rotation.z=rnd(-.5,.5);p.add(c);}p.add(at(sprite(d.acc,4,.5),0,1.3,0));}
   if(d.deco==='visor'){const pl=M(G.box.clone().scale(2.1,.6,2.1),toon(0x1a1c2e),true);pl.position.y=.4;p.add(pl);const e=new THREE.Mesh(G.box.clone().scale(2.15,.12,2.15),basic(d.acc));e.position.y=.2;p.add(e);}
   if(d.deco==='lava'){const e=new THREE.Mesh(G.box.clone().scale(1.55,.2,1.55),basic(d.acc));e.position.y=-1.2;p.add(e);}
   if(s<0)bArmL=p;else bArmR=p;});
 if(d.deco==='moss')add2(M(G.box.clone().scale(3,.4,2.6),toon(d.acc)),0,10.4,0);
 if(d.deco==='crystal'){for(let i=0;i<4;i++){const c=M(G.oct,basic(d.acc),true);c.scale.set(.4,1.4,.4);add2(c,-1+i*.66,10.7+(i%2)*.4,0).rotation.z=(i-1.5)*.25;}}
 if(d.deco==='stripe'){[3.9,5.3,6.9].forEach(y=>add2(new THREE.Mesh(G.box.clone().scale(5.45,.35,3.25),toon(d.acc,true)),0,y,0));[-1,1].forEach(s=>{const h=M(new THREE.ConeGeometry(.35,1.8,6),toon(0xf0e0c0),true);add2(h,s*1.1,10.6,0).rotation.z=-s*.5;});}
 if(d.deco==='visor'){const an=M(G.cyl.clone().scale(.15,2.2,.15),toon(0x1a1c2e));add2(an,.9,11.2,0);add2(sprite(d.acc,2,.9),.9,12.3,0);[-1,1].forEach(s=>add2(new THREE.Mesh(G.box.clone().scale(.12,4,3.25),basic(d.acc)),s*2.72,5.6,0));}
 if(d.deco==='lava'){for(let i=0;i<6;i++)add2(new THREE.Mesh(G.box.clone().scale(rnd(.8,2.4),.16,.1),basic(d.acc)),rnd(-1.8,1.8),rnd(4,7.5),1.63).rotation.z=rnd(-.8,.8);
   for(let i=0;i<5;i++){const c=M(new THREE.ConeGeometry(.3,1.6,5),toon(0x1a1214),true);add2(c,-1.2+i*.6,10.9+(i===2?.4:0),0);}add2(sprite(d.acc,10,.4),0,6,2);}
 bParts.forEach(p=>{p.userData.p0=p.position.clone();p.userData.r0=p.rotation.clone();});}

/* =================== AUDIO =================== */
let AC=null,master,musicG,sfxG,muted=false,nb=null;
try{muted=localStorage.getItem('tr_muted')==='1';}catch(e){}
function initAudio(){if(AC)return;try{AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){return;}
  master=AC.createGain();master.gain.value=muted?0:.75;master.connect(AC.destination);
  musicG=AC.createGain();musicG.gain.value=.15;musicG.connect(master);sfxG=AC.createGain();sfxG.gain.value=.6;sfxG.connect(master);
  nb=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);const d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;setInterval(sched,25);}
function tone(f,t,d,type,g,f2,dest){const o=AC.createOscillator(),a=AC.createGain();o.type=type||'square';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);a.gain.setValueAtTime(.0001,t);a.gain.exponentialRampToValueAtTime(g||.2,t+.008);a.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(a);a.connect(dest||sfxG);o.start(t);o.stop(t+d+.05);}
function noise(t,d,g,fq,type,dest){const s=AC.createBufferSource();s.buffer=nb;const f=AC.createBiquadFilter();f.type=type||'lowpass';f.frequency.value=fq||1000;const a=AC.createGain();a.gain.setValueAtTime(g||.3,t);a.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(f);f.connect(a);a.connect(dest||sfxG);s.start(t);s.stop(t+d+.05);}
const mf=m=>440*Math.pow(2,(m-69)/12);
function sfx(k,tAt){if(TEST&&window.__sfxLog&&tAt==null)window.__sfxLog.push([k,window.__vt||0]);if(!AC)return;const t=tAt!=null?tAt:AC.currentTime;
  if(k==='tok'){tone(988,t,.07,'square',.11);tone(1480,t+.045,.1,'square',.09);}
  else if(k==='hit'){noise(t,.35,.55,600);tone(160,t,.3,'sawtooth',.25,45);}
  else if(k==='fake'){tone(700,t,.25,'sawtooth',.2,90);noise(t,.2,.3,2500,'bandpass');}
  else if(k==='jump'){tone(380,t,.16,'square',.12,820);}
  else if(k==='land'){noise(t,.4,.45,400);tone(70,t,.35,'sine',.4,35);}
  else if(k==='charge'){tone(320,t,.3,'sawtooth',.18,1500);tone(640,t+.05,.3,'triangle',.18,2200);}
  else if(k==='bhit'){noise(t,.7,.8,350);tone(110,t,.7,'sine',.6,35);tone(880,t,.25,'square',.08,220);}
  else if(k==='throw'){noise(t,.3,.25,1800,'bandpass');}
  else if(k==='rise'){noise(t,2.2,.6,220);tone(55,t,2.2,'sawtooth',.25,30);}
  else if(k==='heart'){[76,81,88].forEach((m,i)=>tone(mf(m),t+i*.07,.25,'triangle',.18));}
  else if(k==='thunder'){noise(t,1.8,.7,180);}
  else if(k==='win'){[72,76,79,84,88].forEach((m,i)=>tone(mf(m),t+i*.11,.5,'triangle',.22));noise(t,1.2,.25,4000,'highpass');}
  else if(k==='drop'){[84,91,96].forEach((m,i)=>tone(mf(m),t+i*.08,.6,'sine',.18));}
  else if(k==='over'){[64,60,55,48].forEach((m,i)=>tone(mf(m),t+i*.16,.4,'square',.12));}}
let mode='none',nextT=0,step=0;
function setMusic(m){mode=m;if(AC){nextT=AC.currentTime+.06;step=0;}}
function sched(){if(!AC||mode==='none')return;const bossM=mode==='boss';const bpm=bossM?LV.bpm+16:LV.bpm,sd=60/bpm/4;const CH4=bossM?[[45,1],[41,0],[38,1],[40,0]]:LV.chords;
  while(nextT<AC.currentTime+.12){const bar=Math.floor(step/16)%4,s=step%16;const [root,minor]=CH4[bar];const iv=minor?[0,3,7,12]:[0,4,7,12];
    if(s%2===0)tone(mf(root-12+(s%8===6?12:0)),nextT,sd*1.8,'triangle',.45,null,musicG);
    tone(mf(root+12+iv[(s+(s>>2))%4]),nextT,sd*.9,LV.night?'sawtooth':'square',bossM?.1:.07,null,musicG);
    if(s%4===0)tone(bossM?140:120,nextT,.16,'sine',.9,38,musicG);
    if(s%2===1)noise(nextT,.04,.18,7000,'highpass',musicG);
    if((bossM||LI>=2)&&(s===4||s===12))noise(nextT,.14,.4,1800,'bandpass',musicG);
    nextT+=sd;step++;}}
function setMute(v){muted=v;$('mute').textContent=v?'🔇':'🔊';if(master)master.gain.value=v?0:.75;try{localStorage.setItem('tr_muted',v?'1':'0');}catch(e){}}
setMute(muted);
$('mute').addEventListener('pointerdown',e=>{e.stopPropagation();initAudio();setMute(!muted);});
document.addEventListener('visibilitychange',()=>{if(!AC)return;document.hidden?AC.suspend():AC.resume();});

/* =================== STATE =================== */
let state='menu',px=0,vx=0,pz=0,speed=14,dist=0,jumpY=0,jumpV=0,hearts=3,tok=0,hits=0,elapsed=0,inv=0,shake=0,T=0;
let nextRowZ=-60,laneX=0,laneV=0,specialCd=0,heartsLeft=[],heartT=8;const MAXH=5;
let bossT=0,throwT=0,ringT=0,shockT=0,metT=0,bHP=3,flinch=0,winT=0,overT=0,winDelay=-1,dropShown=false,lootZ=0,ringSide=1,boltT=4;
let gVel=[];const keys={};let touchDir=0;const seen={};
const COARSE=matchMedia('(pointer:coarse)').matches;

function clearEnts(){ents.forEach(removeEnt);ents=[];}
function startLevel(i,nearBoss){initAudio();applyTheme(i);clearEnts();
  px=0;vx=0;pz=0;dist=0;jumpY=0;jumpV=0;speed=LV.v0;hearts=3;tok=0;hits=0;elapsed=0;inv=0;shake=0;
  nextRowZ=-60;laneX=0;laneV=0;specialCd=40;heartT=8;{const n=[2,3,4,4,5][i];heartsLeft=[];for(let k=1;k<=n;k++)heartsLeft.push(LV.len*k/(n+1));}bHP=LV.boss.hp;flinch=0;winT=0;overT=0;winDelay=-1;dropShown=false;loot.visible=false;
  if(nearBoss){pz=-(LV.len-30);dist=-pz;nextRowZ=pz-60;}
  buildWorld(pz);seedAmb(pz);
  player.rotation.set(0,0,0);bike.rotation.set(0,0,0);player.visible=true;
  $('bar').classList.remove('boss');$('barlab').textContent=`LV ${i+1} · ${LV.name}`;
  ['over','drop','modal','menu'].forEach(id=>$(id).classList.remove('on'));$('hud').classList.add('on');$('jumpBtn').classList.toggle('on',COARSE);
  state='play';setMusic('ride');updHUD(true);
  banner(`LEVEL ${i+1}`,LV.name.toUpperCase(),2);
  if(i===0)hint(COARSE?'Hold left or right side to steer':'← → or A / D to steer',3.5);}
function toMenu(){state='menu';clearEnts();setMusic('none');renderMap();['over','drop','modal'].forEach(id=>$(id).classList.remove('on'));$('hud').classList.remove('on');$('jumpBtn').classList.remove('on');$('menu').classList.add('on');}

/* =================== UI =================== */
let lastH='';
function updHUD(force){const h='♥'.repeat(Math.max(0,hearts))+'<span style="opacity:.25">'+'♥'.repeat(Math.max(0,3-hearts))+'</span>';
  if(force||h!==lastH){$('hearts').innerHTML=h;lastH=h;}$('tok').textContent=tok;
  const f=state==='play'?clamp(dist/LV.len,0,1):clamp(bHP/LV.boss.hp,0,1);$('fill').style.width=(f*100).toFixed(1)+'%';}
let bannerTO=0;function banner(big,small,dur){$('bBig').textContent=big;$('bSmall').textContent=small||'';$('banner').classList.add('on');clearTimeout(bannerTO);bannerTO=setTimeout(()=>$('banner').classList.remove('on'),(dur||1.6)*1000);}
let hintTO=0;function hint(t,d){const h=$('hint');h.textContent=t;h.style.opacity=1;clearTimeout(hintTO);hintTO=setTimeout(()=>h.style.opacity=0,(d||2.5)*1000);}
function firstSeen(k,txt){if(seen[k])return;seen[k]=1;hint(txt,3);}
function flash(){const f=$('flash');f.style.transition='none';f.style.opacity=1;requestAnimationFrame(()=>{f.style.transition='opacity .45s';f.style.opacity=0;});}
function renderMap(){const m=$('map');m.innerHTML='';
  LEVELS.forEach((L,i)=>{const n=document.createElement('div');const done=save.cleared.includes(i+1),open=i+1<=save.unlocked;n.className='node '+(done?'done':open?'open':'locked');
    const R=REWARDS[i];n.innerHTML=`<div class="dot">${done?'✓':open?i+1:'🔒'}</div><div class="nm">${L.name.replace(' ','<br>')}</div><span class="chip">${R.type==='skill'?'SKILL':'PROMPT'}</span>`;
    n.addEventListener('click',e=>{if(e.target.classList.contains('chip')&&done){openReward(i,true);return;}if(open)startLevel(i);});m.appendChild(n);});
  const nxt=Math.min(save.unlocked,5);$('go').textContent=save.cleared.length>=5?'RIDE AGAIN ▶':`RIDE ▶ LEVEL ${nxt}`;}
function setRarity(i){const c=RARC[REWARDS[i].rar];document.documentElement.style.setProperty('--r1',c[0]);document.documentElement.style.setProperty('--r2',c[1]);}
function showDrop(){dropShown=true;$('banner').classList.remove('on');const R=REWARDS[LI];setRarity(LI);sfx('drop');
  $('dClr').textContent=LI===4?'ALL 5 LEVELS CLEAR':`LEVEL ${LI+1} CLEAR`;$('dRar').textContent=R.rar+' DROP';$('dGlyph').textContent=R.type==='skill'?'</>':'>_';
  $('dName').textContent=R.name;$('dType').textContent=R.type==='skill'?`Top skill on GitHub · ★ ${R.stars}`:'Prompt for Claude';
  $('hud').classList.remove('on');$('jumpBtn').classList.remove('on');$('drop').classList.add('on');}
const ptCache={};
async function getText(f){if(ptCache[f])return ptCache[f];try{const r=await fetch(f);ptCache[f]=await r.text();}catch(e){ptCache[f]='Could not load the prompt. Download it with the button below.';}return ptCache[f];}
function openReward(i,vault){const R=REWARDS[i];setRarity(i);const sk=R.type==='skill';
  $('mGlyph').textContent=sk?'</>':'>_';$('mName').textContent=R.name;$('mTag').textContent=R.rar+' · '+(sk?'TOP SKILL ON GITHUB':'PROMPT');$('mDesc').textContent=R.desc;
  const ul=$('mList');ul.innerHTML='';const items=(sk?['★ '+R.stars+' stars on GitHub · '+R.repo]:[]).concat(R.list||[]);items.forEach(t=>{const li=document.createElement('li');li.textContent=t;ul.appendChild(li);});ul.style.display=items.length?'block':'none';
  const pre=$('ptext'),main=$('mMain'),alt=$('mAlt');pre.style.display='block';alt.style.display='';
  if(!sk){pre.textContent='Loading…';getText(R.file).then(t=>pre.textContent=t);main.textContent='⧉ Copy prompt';main.removeAttribute('download');main.removeAttribute('target');main.href='#';main.onclick=e=>{e.preventDefault();getText(R.file).then(t=>copyText(t,main,'⧉ Copy prompt'));};
    alt.textContent='⬇ .txt';alt.href=R.file;alt.setAttribute('download',R.file.split('/').pop());alt.onclick=null;$('mInst').textContent='Paste it into Claude. Change anything in [brackets] to make it yours.';}
  else{pre.textContent=R.install;main.textContent='★ Open on GitHub';main.href='https://github.com/'+R.repo;main.target='_blank';main.rel='noopener';main.removeAttribute('download');main.onclick=null;
    alt.textContent='⧉ Copy install';alt.href='#';alt.removeAttribute('download');alt.onclick=e=>{e.preventDefault();copyText(R.install,alt,'⧉ Copy install');};
    $('mInst').textContent='Install commands from the repo’s README. Read the repo before installing anything into your agent.';}
  $('mStats').style.display=vault?'none':'flex';
  if(!vault){$('sTok').textContent=tok;const s=Math.round(elapsed);$('sTime').textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0');$('sHit').textContent=hits;}
  $('mNext').style.display=vault?'none':'';$('mNext').textContent=i<4?`NEXT: LEVEL ${i+2} ▶`:'BACK TO LEVELS';
  $('mClose').style.display=vault?'':'none';
  const url=location.origin+location.pathname;const txt=i===4?'I beat all 5 bosses in Token Rider and got the prompt of the whole game. Your turn:':`I beat the ${LEVELS[i].boss.name.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase())} in Token Rider (level ${i+1}/5) and unlocked ${R.name}. Your turn:`;
  $('share').href='https://twitter.com/intent/tweet?text='+encodeURIComponent(txt)+'&url='+encodeURIComponent(url);
  $('drop').classList.remove('on');$('modal').classList.add('on');$('menu').classList.remove('on');}
async function copyText(t,btn,label){let ok=false;try{await navigator.clipboard.writeText(t);ok=true;}catch(e){}
  if(!ok){const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();try{ok=document.execCommand('copy');}catch(e){}ta.remove();}
  btn.textContent=ok?'✓ Copied':'Select the text above';setTimeout(()=>btn.textContent=label,1800);}

/* =================== EVENTS =================== */
function doJump(){if(state!=='play'&&state!=='boss'&&state!=='bossIntro')return;if(jumpY<=.02){jumpV=10.6;sfx('jump');}}
function hurt(c){if(inv>0||state==='over'||state==='win')return;if(Q.has('god')){inv=.5;return;}if(TEST)(window.__hits=window.__hits||[]).push((c||'?')+'@'+Math.round(dist)+' x'+px.toFixed(1));hearts--;hits++;inv=1.4;shake=.45;flash();sfx('hit');burst(new THREE.Vector3(px,1.2+jumpY,pz),0xff4d6d,18,5);
  if(navigator.vibrate)try{navigator.vibrate(60);}catch(e){}if(hearts<=0)gameOver();updHUD();}
function gameOver(){state='over';overT=0;setMusic('none');sfx('over');burst(new THREE.Vector3(px,1,pz),0xff7a2f,40,7);const B=LV.boss;
  $('overCode').textContent=B.code;$('overSub').textContent=B.sub.charAt(0)+B.sub.slice(1).toLowerCase()+'.';
  $('overTxt').textContent=dist<LV.len?`You crashed at ${Math.round(clamp(dist/LV.len,0,1)*100)}% of ${LV.name} with ${tok} tokens.`:`The ${B.name.toLowerCase()} had ${bHP} HP left. So close.`;}
function startBoss(){state='bossIntro';bossT=0;boss.visible=true;boss.position.set(0,-24,pz-60);bParts.forEach(p=>{p.position.copy(p.userData.p0);p.rotation.copy(p.userData.r0);p.visible=true;});boss.rotation.set(0,0,0);
  shake=1.6;sfx('rise');setMusic('boss');banner(LV.boss.name,LV.boss.code+' · '+LV.boss.sub,2.4);$('bar').classList.add('boss');$('barlab').textContent=`LV ${LI+1} · ${LV.boss.name}`;
  if(LI===0)hint('Ride through the orange rings to hit it',4);else if(LV.boss.attacks.includes('fakering')&&!seen.fr){seen.fr=1;hint('Red spiked rings are traps',4);}else if(LV.boss.attacks.includes('shock')&&!seen.sh){seen.sh=1;hint('Jump over the shockwaves',4);}
  updHUD();}
function fireBeam(){if(bHP<=0)return;const a=new THREE.Vector3(px,1.6+jumpY,pz-1.5),b=new THREE.Vector3(0,6*LV.boss.scale,boss.position.z+1.6*LV.boss.scale);
  const m=new THREE.Mesh(E.beamGeo,basic(0xffb050,{transparent:true,opacity:.95,blending:THREE.AdditiveBlending,depthWrite:false}));m.scale.y=a.distanceTo(b);
  m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),b.clone().sub(a).normalize());add({t:'beam',m,x:0,z:m.position.z,life:.45});
  bHP--;flinch=.5;shake=.7;sfx('bhit');burst(b,0xffb050,30,8);burst(b,LV.boss.c1,20,6);updHUD();
  if(bHP<=0)winDelay=.4;else banner('PROMPT HIT!',`${LV.boss.hp-bHP} / ${LV.boss.hp}`,1.1);}
function winBoss(){if(state!=='boss')return;state='win';winT=0;setMusic('none');sfx('win');shake=1.2;banner(LV.boss.name.split(' ').slice(-1)[0]+' DEFEATED',LI===4?'YOU BEAT TOKEN RIDER':'LIMIT REMOVED',2);
  ents.filter(o=>o.t!=='beam'&&o.t!=='tok').forEach(removeEnt);ents=ents.filter(o=>o.t==='beam'||o.t==='tok');
  gVel=bParts.map(()=>({v:new THREE.Vector3(rnd(-9,9),rnd(6,16),rnd(2,10)),r:new THREE.Vector3(rnd(-4,4),rnd(-4,4),rnd(-4,4))}));
  burst(new THREE.Vector3(0,6,boss.position.z),0xff7a2f,60,12);lootZ=pz-34;loot.position.set(0,0,lootZ);
  if(!save.cleared.includes(LI+1))save.cleared.push(LI+1);save.unlocked=Math.max(save.unlocked,Math.min(5,LI+2));persist();}

$('go').addEventListener('click',()=>{const nxt=save.cleared.length>=5?0:Math.min(save.unlocked,5)-1;startLevel(nxt);});
$('retry').addEventListener('click',()=>startLevel(LI));
$('toMenu').addEventListener('click',toMenu);
$('mNext').addEventListener('click',()=>{if(LI<4)startLevel(LI+1);else toMenu();});
$('mClose').addEventListener('click',toMenu);
$('lootCard').addEventListener('click',()=>{openReward(LI,false);sfx('tok');});
$('jumpBtn').addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();doJump();});
addEventListener('keydown',e=>{keys[e.code]=1;if(['ArrowUp','KeyW','Space'].includes(e.code)){doJump();}
  if(e.code==='Space'||e.code==='Enter'){if($('menu').classList.contains('on'))$('go').click();else if($('over').classList.contains('on'))$('retry').click();else if($('drop').classList.contains('on'))$('lootCard').click();}
  if(e.code==='Space'||e.code.startsWith('Arrow'))e.preventDefault();});
addEventListener('keyup',e=>{keys[e.code]=0;});
const ptrs=new Map();
function updTouch(){let d=0;ptrs.forEach(p=>{d+=p.x<innerWidth/2?-1:1;});touchDir=clamp(d,-1,1);}
canvas.addEventListener('pointerdown',e=>{ptrs.set(e.pointerId,{x:e.clientX,y0:e.clientY,t0:performance.now(),sw:false});updTouch();});
addEventListener('pointermove',e=>{const p=ptrs.get(e.pointerId);if(!p)return;p.x=e.clientX;if(!p.sw&&p.y0-e.clientY>45&&performance.now()-p.t0<450){p.sw=true;doJump();}updTouch();});
['pointerup','pointercancel'].forEach(n=>addEventListener(n,e=>{ptrs.delete(e.pointerId);updTouch();}));
function resize(){const w=innerWidth,h=innerHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=w<h?78:64;camera.updateProjectionMatrix();}
addEventListener('resize',resize);resize();

/* =================== AUTOPILOT (demo/test) =================== */
function autoPilot(){let goal=null,bd=1e9,jump=false;const hz=[];
  for(const o of ents){const a=pz-o.z,ta=Math.max(0,a)/Math.max(10,speed);
    if(state==='boss'&&o.t==='ring'&&!o.fake&&!o.done&&a>0&&a<45&&a<bd){bd=a;goal=o.moving?clamp(o.x0+2.6*Math.sin((T+ta)*2.2+o.ph),-5.4,5.4):o.x;}
    if(state==='play'&&o.t==='tok'&&!o.fake&&a>2&&a<36&&a<bd&&o.y<2){bd=a;goal=o.x;}
    if(o.t==='heart'&&hearts<MAXH&&a>1&&a<40){bd=-1;goal=o.x;}
    if(a<-1.5||a>28)continue;const w=6/(Math.max(a,0)+6);
    if(o.t==='bug'||(o.t==='tok'&&o.fake)||(o.t==='ring'&&o.fake))hz.push([o.x,w]);
    else if(o.t==='swp')hz.push([5.4*Math.sin((T+ta)*o.w+o.ph),w]);
    else if(o.t==='hop'){hz.push([o.jt>=0?o.x1:o.x,w]);}
    else if((o.t==='boul'||o.t==='met')&&o.T-o.t0<1)hz.push([o.x,1.2]);
    else if(o.t==='gate'&&a>0)hz.push(['gate',clamp(o.g0+2.6*Math.sin((T+ta)*1.3+o.ph),-4.6,4.6),w]);
    const closing=o.t==='shock'?speed+22:speed;if((o.t==='wall'||o.t==='shock')&&a>0&&a/closing<.27&&a/closing>.12)jump=true;}
  let best=px,bc=1e9;
  for(let x=-6;x<=6.01;x+=.4){let c=0;for(const h of hz){if(h[0]==='gate'){if(Math.abs(x-h[1])>1.1)c+=30*h[2];}else{const d=Math.abs(x-h[0]);if(d<2.7)c+=(2.7-d)*10*h[1];}}
    c+=goal!==null?Math.abs(x-goal)*.35:Math.abs(x)*.03;c+=Math.abs(x-px)*.06;if(c<bc){bc=c;best=x;}}
  const d=best-px;return [Math.abs(d)<.2?0:clamp(d/1.2,-1,1),jump];}

/* =================== SPAWNING =================== */
function spawnRows(){while(nextRowZ>pz-170){const z=nextRowZ,d=-z;nextRowZ-=LV.gap;
  if(d<70||d>LV.len-90)continue;
  if(heartsLeft.length&&d>heartsLeft[0]){heartsLeft.shift();spawnHeart(laneX,z);continue;}
  specialCd-=LV.gap;
  if(specialCd<=0&&Math.random()<LV.special*2.2){const k=pick(LV.specials);
    if(k==='wall'){spawnWall(z);specialCd=46;firstSeen('wall',COARSE?'JUMP! Tap JUMP or swipe up':'JUMP! Space or ↑');continue;}
    if(k==='gate'){spawnGate(z);specialCd=42;firstSeen('gate','Find the moving gap');continue;}
    if(k==='meteor'){spawnTrigger(z);specialCd=26;}
    if(k==='sweeper'){spawnSweeper(z);specialCd=24;firstSeen('swp','Drones sweep the road');continue;}
    if(k==='hopper'){spawnHopper((Math.random()<.5?-1:1)*rnd(3.8,5.6),z);specialCd=16;}
    if(k==='fake'){specialCd=10;spawnToken(laneX,z,1.35,true);firstSeen('fake','Purple tokens are fake. Don’t touch');continue;}}
  laneV+=rnd(-.9,.9);laneV*=.86;laneX=clamp(laneX+laneV,-5,5);if(Math.abs(laneX)>=5)laneV*=-.5;
  if(Math.random()<.72)spawnToken(laneX,z,1.35,LV.specials.includes('fake')&&Math.random()<.04);
  const bc=Math.min(.45,LV.bug+d/3600);if(Math.random()<bc){let bx,tr=0;do{bx=rnd(-5.8,5.8);}while(Math.abs(bx-laneX)<2.6&&++tr<12);if(tr<12)spawnBug(bx,z);}}}

/* =================== LOOT =================== */
const loot=new THREE.Group();scene.add(loot);loot.visible=false;
(()=>{const c=new THREE.Mesh(new THREE.OctahedronGeometry(1.1),basic(0xffa040,{}));c.scale.y=1.6;loot.add(c);loot.userData.c=c;
  const inner=new THREE.Mesh(new THREE.OctahedronGeometry(.55),basic(0xfff3d6));inner.scale.y=1.6;c.add(inner);
  const pil=new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.6,40,20,1,true),basic(0xffb060,{transparent:true,opacity:.25,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));pil.position.y=18;loot.add(pil);loot.userData.pil=pil;
  const rg=new THREE.Mesh(new THREE.TorusGeometry(1.9,.08,8,40),basic(0xffd27a,{}));rg.rotation.x=Math.PI/2;loot.add(rg);loot.userData.rg=rg;loot.add(sprite(0xff9a40,9,.8));})();

/* =================== LOOP =================== */
const tmpV=new THREE.Vector3();
let last=performance.now();
if(TEST)window.__step=(n,h)=>{for(let i=0;i<n;i++)update(h||1/60);renderer.render(scene,camera);return [state,LI+1,tok,hearts,bHP,Math.round(dist),ents.length];};
if(TEST)window.__start=(i,nb)=>startLevel(i,nb);
if(TEST){window.__info=()=>({bz:boss?boss.position.z:0,state,li:LI,dist:Math.round(dist),px,pz,jumpY,bHP,winT,dropShown,speed});
  window.__spawn=(t,a,x)=>{const z=pz-a;if(t==='ring')spawnRing(x||0,z,false,false);else if(t==='fring')spawnRing(x||0,z,true,false);else if(t==='wall')spawnWall(z);else if(t==='met')spawnMeteor(x||0,pz-speed*1.15,1.15);
    else if(t==='hop')spawnHopper(x||4.5,z);else if(t==='swp')spawnSweeper(z);else if(t==='gate')spawnGate(z);else if(t==='shock')spawnShock(z);else if(t==='bug')spawnBug(x||0,z);else if(t==='tok')spawnToken(x||0,z,1.35,false);};
  window.__set=o=>{if('bHP' in o)bHP=o.bHP;if('px' in o)px=o.px;if('hold' in o)window.__hold=o.hold;if('timers' in o){throwT=o.timers;ringT=o.timers;shockT=o.timers;metT=o.timers;}};
  window.__clear=()=>{clearEnts();};
  window.__renderSfx=async(log,dur)=>{const sr=44100,oc=new OfflineAudioContext(2,Math.ceil(sr*dur),sr);const sv=[AC,sfxG,nb];AC=oc;sfxG=oc.createGain();sfxG.gain.value=.6;sfxG.connect(oc.destination);
    nb=oc.createBuffer(1,sr,sr);const d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
    for(const [k,t] of log)if(t<dur-.05)sfx(k,Math.max(0,t));const buf=await oc.startRendering();[AC,sfxG,nb]=sv;
    const n=buf.length,L=buf.getChannelData(0),R=buf.getChannelData(1),ab=new ArrayBuffer(44+n*4),v=new DataView(ab);const ws=(o,s2)=>{for(let i=0;i<s2.length;i++)v.setUint8(o+i,s2.charCodeAt(i));};
    ws(0,'RIFF');v.setUint32(4,36+n*4,true);ws(8,'WAVEfmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,2,true);v.setUint32(24,sr,true);v.setUint32(28,sr*4,true);v.setUint16(32,4,true);v.setUint16(34,16,true);ws(36,'data');v.setUint32(40,n*4,true);
    for(let i=0;i<n;i++){v.setInt16(44+i*4,Math.max(-1,Math.min(1,L[i]))*32767,true);v.setInt16(46+i*4,Math.max(-1,Math.min(1,R[i]))*32767,true);}
    let bin='';const u=new Uint8Array(ab);for(let i=0;i<u.length;i+=32768)bin+=String.fromCharCode.apply(null,u.subarray(i,i+32768));return btoa(bin);};}
function frame(now){requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000);last=now;if(TEST)return;update(dt);renderer.render(scene,camera);}
function update(dt){T+=dt;
  const active=state==='play'||state==='bossIntro'||state==='boss';
  if(active)elapsed+=dt;
  let steer=0,aj=false;
  if(AUTO&&active){[steer,aj]=autoPilot();if(aj)doJump();}
  else steer=clamp((keys.ArrowRight||keys.KeyD?1:0)-(keys.ArrowLeft||keys.KeyA?1:0)+touchDir,-1,1);
  if(active){vx+=(steer*16-vx)*Math.min(1,dt*9);px+=vx*dt;if(px>6.2||px<-6.2){px=clamp(px,-6.2,6.2);vx=0;}}else vx*=.9;
  if(state==='play')speed=LV.v0+(LV.v1-LV.v0)*clamp(dist/LV.len,0,1);
  else if(state==='bossIntro'||state==='boss')speed+=(26-speed)*Math.min(1,dt*2);
  else if(state==='win')speed=Math.max(0,speed-17*dt);
  else if(state==='over')speed=Math.max(0,speed-30*dt);
  else speed=14;
  pz-=speed*dt;dist=-pz;
  if(jumpY>0||jumpV>0){jumpY+=jumpV*dt;jumpV-=28*dt;if(jumpY<=0){jumpY=0;jumpV=0;burst(new THREE.Vector3(px,.3,pz+.5),0xffffff,6,2,1);}}
  if(inv>0)inv-=dt;
  // player
  player.position.set(px,1.1+jumpY+Math.sin(T*3.2)*.08,pz);
  bike.rotation.z=-vx*.032;bike.rotation.y=-vx*.012;bike.rotation.x=jumpY>0?clamp(jumpV*.03,-.25,.3):0;
  shadow.position.set(px,.05,pz);const ss=1/(1+jumpY*.35);shadow.scale.setScalar(ss);shadow.material.opacity=.3*ss;
  player.visible=inv>0?Math.floor(T*18)%2===0:true;
  if(state==='over'){overT+=dt;bike.rotation.z+=Math.min(1.3,overT*3)*(px>=0?1:-1)*.03;player.position.y=Math.max(.4,1.1-overT*1.2);
    if(overT>1.1&&!$('over').classList.contains('on')){$('over').classList.add('on');$('hud').classList.remove('on');$('jumpBtn').classList.remove('on');}}
  flames.forEach(f=>f.scale.setScalar((.8+Math.random()*.5)*(speed/30+.4)));
  scarfP.rotation.x=.25+Math.sin(T*14)*.12+jumpV*.01;scarfP.rotation.y=Math.sin(T*9)*.15+vx*.02;scarf2.rotation.x=Math.sin(T*14-1)*.3;scarf2.rotation.y=Math.sin(T*9-1)*.25;
  if(state==='play'){spawnRows();if(dist>=LV.len)startBoss();}
  const py=1.1+jumpY;
  // entities
  for(let i=ents.length-1;i>=0;i--){const o=ents[i];const dz=o.z-pz;const a=-dz;let kill=false;
    switch(o.t){
    case 'tok':o.m.rotation.y+=dt*3;o.m.position.y=o.y+Math.sin(T*4+o.z)*.15;if(o.fake){o.m.material=Math.floor(T*5+o.z)%3===0?fakeMat:tokMat;o.m.position.x=o.x+(Math.random()<.1?rnd(-.15,.15):0);}
      if(active&&Math.abs(dz)<1.25&&Math.abs(o.x-px)<1.45&&Math.abs(o.m.position.y-.25-py)<1.5){if(o.fake){hurt('fake');sfx('fake');burst(o.m.position,0xb04aff,14,4);}else{tok++;sfx('tok');burst(o.m.position,0xffa040,8,3);updHUD();}kill=true;}break;
    case 'bug':o.m.position.y=.95+Math.abs(Math.sin(T*5+o.ph))*.5;o.m.rotation.y=Math.sin(T*3+o.ph)*.6;o.sh.position.set(o.x,hAt(o.x,o.z)+.05,o.z);
      if(active&&Math.abs(dz)<1.2&&Math.abs(o.x-px)<1.35&&Math.abs(o.m.position.y-py)<1.35){hurt('bug');burst(o.m.position,0x7b3fb5,16,5);kill=true;}break;
    case 'hop':{if(o.jt<0&&a<34&&a>0)o.m.userData.eyes.forEach(e=>e.material.color.setHex(Math.sin(T*30)>0?0xff2a44:0xffffff));
      if(o.jt<0&&a<24&&a>0&&active){o.jt=0;o.x1=clamp(px+rnd(-.9,.9),-5.6,5.6);if(Math.abs(o.x1-o.x0)<1.5)o.x1=clamp(o.x0+(o.x0>0?-3.5:3.5),-5.6,5.6);}
      let y=.95;if(o.jt>=0){o.jt+=dt;const u=Math.min(1,o.jt/.5);o.x=o.x0+(o.x1-o.x0)*u;y=.95+Math.sin(u*Math.PI)*2.6;}else y=.95+Math.abs(Math.sin(T*7))*.25;
      o.m.position.set(o.x,y,o.z);o.sh.position.set(o.x,.05,o.z);
      if(active&&Math.abs(dz)<1.2&&Math.abs(o.x-px)<1.35&&Math.abs(y-py)<1.35){hurt('hop');burst(o.m.position,0x2fae6a,16,5);kill=true;}break;}
    case 'swp':o.x=5.4*Math.sin(T*o.w+o.ph);o.m.position.set(o.x,1.3+Math.sin(T*6)*.1,o.z);o.m.rotation.y=Math.sin(T*o.w+o.ph)*.5;o.m.children[3].rotation.y+=dt*20;o.sh.position.set(o.x,.05,o.z);
      if(active&&Math.abs(dz)<1.2&&Math.abs(o.x-px)<1.45&&Math.abs(1.3-py)<1.3){hurt('swp');burst(o.m.position,0xff2a44,16,5);kill=true;}break;
    case 'wall':if(active&&Math.abs(dz)<.9&&jumpY<1.2){hurt('wall');burst(new THREE.Vector3(px,1,o.z),0xffb020,22,6);kill=true;sfx('land');}break;
    case 'gate':{o.gx=clamp(o.g0+2.6*Math.sin(T*1.3+o.ph),-4.6,4.6);const gx=o.gx,hw=2;const [L,R,gl,gr]=o.parts;
      const lw=gx-hw+7.5,rw=7.5-(gx+hw);L.scale.set(lw,3.2,.6);L.position.set(-7.5+lw/2,1.6,0);R.scale.set(rw,3.2,.6);R.position.set(7.5-rw/2,1.6,0);
      gl.scale.set(.12,3.3,.65);gl.position.set(gx-hw,1.6,0);gr.scale.set(.12,3.3,.65);gr.position.set(gx+hw,1.6,0);
      if(active&&Math.abs(dz)<.8&&Math.abs(px-gx)>1.35){hurt('gate');burst(new THREE.Vector3(px,1.4,o.z),0xff3a5a,20,6);kill=true;}break;}
    case 'trig':if(a<2&&active){spawnMeteor(clamp(px+rnd(-1,1),-6,6),pz-speed*1.15,1.15);if(LI>=4&&Math.random()<.6)spawnMeteor(clamp(px+rnd(-5,5),-6,6),pz-speed*1.4,1.4);firstSeen('met','Watch the red circles');kill=true;}break;
    case 'met':case 'boul':{o.t0+=dt;const u=Math.min(1,o.t0/o.T);
      if(o.t==='met')o.m.position.set(o.sx+(o.x-o.sx)*u,o.sy+(1-o.sy)*u*u,o.sz+(o.z-o.sz)*u);else o.m.position.set(o.sx+(o.x-o.sx)*u,o.sy+(1.1-o.sy)*u+11*u*(1-u),o.sz+(o.z-o.sz)*u);
      o.m.rotation.x+=dt*5;o.m.rotation.z+=dt*3;o.w.material.opacity=.45+.4*Math.sin(T*18);o.w.scale.setScalar((.6+.4*u)*(1+.12*Math.sin(T*18)));
      if(u>=1){sfx('land');burst(o.m.position,0x8b7d70,14,5);burst(o.m.position,0xff7a2a,8,4);shake=Math.max(shake,.3);if(active&&Math.abs(px-o.x)<1.9&&Math.abs(pz-o.z)<4&&jumpY<1.5)hurt(o.t);kill=true;}break;}
    case 'heart':o.m.position.y=1.5+Math.sin(T*3)*.2;if(active&&Math.abs(dz)<1.3&&Math.abs(o.x-px)<1.5){if(hearts<MAXH)hearts++;sfx('heart');burst(o.m.position,0xff4d6d,12,3);updHUD(true);kill=true;}break;
    case 'ring':o.m.rotation.z+=dt*2;if(o.moving)o.x=clamp(o.x0+2.6*Math.sin(T*2.2+o.ph),-5.4,5.4);o.m.position.x=o.x;
      if(!o.done&&dz>-.2&&active){o.done=true;if(Math.abs(o.x-px)<2.2){if(o.fake){hurt('fring');sfx('fake');burst(o.m.position,0xff2a44,20,5);}else{sfx('charge');burst(o.m.position,0xffc070,20,4);if(state==='boss')fireBeam();}kill=true;}}break;
    case 'shock':o.z+=22*dt;o.m.position.z=o.z;if(active&&Math.abs(o.z-pz)<1&&jumpY<1.15){hurt('shock');kill=true;}break;
    case 'beam':o.life-=dt;o.m.material.opacity=Math.max(0,o.life/.45);o.m.scale.x=o.m.scale.z=1+(.45-o.life)*2;if(o.life<=0)kill=true;break;}
    if(!kill&&o.z-pz>10&&o.t!=='beam')kill=true;
    if(kill){removeEnt(o);ents.splice(i,1);}}
  // boss
  const B=LV.boss;
  if(state==='bossIntro'){bossT+=dt;boss.position.z=pz-60;boss.position.y=Math.min(0,-24+bossT*12);if(bossT<2)shake=Math.max(shake,.5);
    if(bossT>2.3){state='boss';throwT=1.2;ringT=1.6;shockT=3;metT=2.5;if(Q.has('win')){bHP=1;fireBeam();}}}
  if(state==='boss'){boss.position.z=pz-60;boss.position.y=0;boss.rotation.y=Math.sin(T*1.3)*.18;boss.rotation.x=flinch>0?-flinch*.5:0;if(flinch>0)flinch-=dt;
    if(winDelay>0){winDelay-=dt;if(winDelay<=0){winDelay=-1;winBoss();}}
    const k=bHP/B.hp,rate=B.rate*(.75+.25*k);
    if(bHP>0){throwT-=dt;if(throwT<=0){throwT=rate;throwRock();}
      ringT-=dt;if(ringT<=0){ringT=2.15;ringSide*=-1;const fake=B.attacks.includes('fakering')&&Math.random()<B.fake;const mv=B.attacks.includes('movering')&&Math.random()<.5;
        spawnRing(clamp(ringSide*rnd(1.2,5),-5.2,5.2),pz-46,fake,mv);if(fake&&Math.random()<.7)spawnRing(clamp(-ringSide*rnd(1.2,5),-5.2,5.2),pz-46,false,false);}
      if(B.attacks.includes('shock')){shockT-=dt;if(shockT<=0){shockT=rnd(3.2,4.6)*(.7+.3*k);spawnShock(boss.position.z+4);}}
      if(LI>=1){heartT-=dt;if(heartT<=0){heartT=LI>=3?9:12;spawnHeart(clamp(-ringSide*rnd(1,4.5),-5,5),pz-46);}}
      if(B.attacks.includes('meteor')){metT-=dt;if(metT<=0){metT=rnd(2.6,3.6);spawnMeteor(clamp(px+rnd(-2,2),-6,6),pz-speed*1.2,1.2);}}}
    bEyeMat.color.setHex(Math.sin(T*10)>0?B.eye:0xffffff);}
  if(state==='boss'||state==='bossIntro'){const kk=throwT<.45?(.45-throwT)/.45:0;bArmL.rotation.x=-kk*2.2+Math.sin(T*2)*.1;bArmR.rotation.x=-kk*2.2+Math.cos(T*2)*.1;}
  if(state==='win'){winT+=dt;bParts.forEach((p,i)=>{const g=gVel[i];if(!g)return;p.position.addScaledVector(g.v,dt);g.v.y-=22*dt;p.rotation.x+=g.r.x*dt;p.rotation.y+=g.r.y*dt;p.rotation.z+=g.r.z*dt;if(p.position.y<-6)p.visible=false;});
    if(winT>.9){loot.visible=true;const k2=Math.min(1,(winT-.9)/.8);loot.userData.c.position.y=1.8+Math.sin(T*2.5)*.3+(1-k2)*12;loot.userData.c.rotation.y+=dt*2;loot.userData.pil.material.opacity=.18+.1*Math.sin(T*4);loot.userData.rg.scale.setScalar(1+.2*Math.sin(T*3));
      const col=new THREE.Color(RARC[REWARDS[LI].rar][0]);loot.userData.c.material.color.copy(col);loot.userData.pil.material.color.copy(col);}
    if(winT>2.6&&!dropShown)showDrop();}
  // storm lightning
  if(LV.storm&&state!=='menu'){boltT-=dt;if(boltT<=0){boltT=rnd(3,7);const b=$('bolt');b.style.transition='none';b.style.opacity=.55;skyU.boost.value=.35;setTimeout(()=>{b.style.transition='opacity .5s';b.style.opacity=0;},80);sfx('thunder');}
    skyU.boost.value=Math.max(0,skyU.boost.value-dt*1.5);}
  // particles
  for(const P of parts){if(P.life>0){P.life-=dt;P.m.position.addScaledVector(P.v,dt);P.v.y-=14*dt;P.m.rotation.x+=dt*6;if(P.life<=0||P.m.position.y<0)P.m.visible=false;}}
  // world
  road.position.z=pz-LEN/2+70;roadTex.offset.y=(dist/RT)%1;
  for(const ch of chunks)if(ch.cz-CH/2>pz+25){ch.cz-=NCH*CH;placeChunk(ch);}
  far.position.set(px*.3,0,pz);
  for(const c of clouds){c.position.x+=dt*2;if(c.position.x>460)c.position.x=-460;}
  sky.position.copy(camera.position);
  const at=AMB[LV.amb];for(let i=0;i<AN;i++){let x=ambP[i*3],y=ambP[i*3+1],z=ambP[i*3+2];
    if(LV.amb==='petals'){x+=Math.sin(T+i)*dt*1.5+dt*1.2;y-=dt*1.1;}else if(LV.amb==='embers'){y+=dt*2.2;x+=Math.sin(T*2+i)*dt;}else if(LV.amb==='fireflies'){x+=Math.sin(T*1.3+i)*dt*.8;y+=Math.cos(T*1.1+i*1.7)*dt*.6;}else{x+=Math.sin(T*.5+i)*dt*.4;y+=Math.sin(T+i)*dt*.2;}
    if(z>pz+10)z-=160;if(y<.3)y=18;if(y>19)y=.5;ambP[i*3]=x;ambP[i*3+1]=y;ambP[i*3+2]=z;}ambG.attributes.position.needsUpdate=true;
  const so=state==='play'?clamp((speed-32)/7,0,1)*.4+.05:0;
  for(const l of lines){l.userData.z+=speed*2.2*dt;if(l.userData.z>-6){l.userData.z=-rnd(25,45);l.userData.a=Math.random()*6.28;}
    l.position.set(camera.position.x+Math.cos(l.userData.a)*l.userData.r,camera.position.y-1+Math.sin(l.userData.a)*l.userData.r*.55,camera.position.z+l.userData.z);l.material.opacity=so*clamp((-l.userData.z-6)/10,0,1);}
  // camera
  if(shake>0)shake=Math.max(0,shake-dt*1.8);const s=shake*shake*1.2;
  const portrait=innerWidth<innerHeight;
  if(state==='win'){tmpV.set(px*.5,5.2,pz+10.5);camera.position.lerp(tmpV,Math.min(1,dt*2));camera.lookAt(0,2.6,lootZ);}
  else if(state==='menu'){camera.position.set(Math.sin(T*.35)*5,3.4,pz+9);camera.lookAt(0,1.6,pz-6);player.position.x=0;}
  else{const bs=state==='boss'||state==='bossIntro';const by=(bs?5.4:4.6)+(portrait?1.2:0);tmpV.set(px*.6,by+jumpY*.35,pz+10+(portrait?1.5:0));camera.position.lerp(tmpV,Math.min(1,dt*6));camera.position.z=tmpV.z;
    camera.lookAt(px*.75,(bs?3.2:1.7)+jumpY*.3,pz-9);}
  if(s>0){camera.position.x+=rnd(-s,s);camera.position.y+=rnd(-s,s);}
  if(TEST&&window.__cam2){const c=window.__cam2;camera.position.set(c[0],c[1],c[2]);camera.lookAt(c[3],c[4],c[5]);}
  else if(TEST&&window.__cam){const c=window.__cam;camera.position.set(px+c[0],1.1+jumpY+c[1],pz+c[2]);camera.lookAt(px+(c[3]||0),1.3+jumpY*.8,pz+(c[4]||-2));}
}

/* boot */
applyTheme(0);buildWorld(0);seedAmb(0);renderMap();
const lp=parseInt(Q.get('level'));
if(Q.has('autostart')||lp)setTimeout(()=>startLevel(lp?clamp(lp,1,5)-1:0,Q.has('boss')||Q.has('win')),60);
requestAnimationFrame(frame);
})();
