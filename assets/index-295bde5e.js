var e=(e,t,a)=>new Promise((n,s)=>{var r=e=>{try{i(a.next(e))}catch(t){s(t)}},o=e=>{try{i(a.throw(e))}catch(t){s(t)}},i=e=>e.done?n(e.value):Promise.resolve(e.value).then(r,o);i((a=a.apply(e,t)).next())});import{o as t,b as a,c as n,e as s,E as r,A as o,f as i,g as p,h as u,s as l,i as m,j as c,k as d,B as h,l as f,D as y,n as g,L as b,p as N,q as w,S as x,M as S,T,u as v,v as O,w as _,x as E,R as A,y as k,z as M,C,F as I,G as D,H as z,I as $,J as V,K as L,N as P,O as F,r as R,P as j,Q as B,U as q,V as W,W as H,X as U,Y as G,Z as K,_ as J,$ as Q,a0 as X,a1 as Z,a2 as Y,d as ee,a3 as te,a4 as ae,a5 as ne,a6 as se,a7 as re,t as oe,a8 as ie,a9 as pe,aa as ue,ab as le,ac as me,ad as ce,ae as de,af as he,ag as fe,ah as ye,ai as ge,aj as be,ak as Ne,al as we,am as xe,an as Se,ao as Te,ap as ve,aq as Oe,ar as _e,as as Ee,at as Ae,au as ke,av as Me,aw as Ce,ax as Ie,ay as De,az as ze,aA as $e,aB as Ve,aC as Le,aD as Pe,aE as Fe,aF as Re,aG as je,aH as Be,aI as qe,aJ as We,aK as He,aL as Ue,aM as Ge,aN as Ke,aO as Je,aP as Qe,aQ as Xe,aR as Ze,aS as Ye,aT as et,aU as tt,aV as at,aW as nt,aX as st,aY as rt,aZ as ot,a_ as it,a$ as pt,b0 as ut,b1 as lt,b2 as mt,b3 as ct,b4 as dt,b5 as ht,b6 as ft,b7 as yt,b8 as gt,b9 as bt,ba as Nt,bb as wt,bc as xt,bd as St,be as Tt,bf as vt,bg as Ot,bh as _t,bi as Et,bj as At,bk as kt,bl as Mt,bm as Ct,bn as It,bo as Dt,bp as zt,bq as $t,br as Vt,bs as Lt,bt as Pt,bu as Ft,bv as Rt,bw as jt,bx as Bt,by as qt,bz as Wt,bA as Ht,bB as Ut,bC as Gt,bD as Kt,bE as Jt,bF as Qt,bG as Xt,bH as Zt,bI as Yt,bJ as ea,bK as ta,bL as aa,bM as na,bN as sa,bO as ra,bP as oa,bQ as ia,bR as pa,bS as ua,bT as la,bU as ma,bV as ca,bW as da,bX as ha,bY as fa,bZ as ya,b_ as ga,b$ as ba,c0 as Na,c1 as wa,c2 as xa,c3 as Sa,c4 as Ta,c5 as va,c6 as Oa,c7 as _a,c8 as Ea,c9 as Aa,ca as ka,cb as Ma,cc as Ca,cd as Ia,ce as Da,cf as za,cg as $a,ch as Va,ci as La,cj as Pa,ck as Fa,cl as Ra,cm as ja,cn as Ba,co as qa,cp as Wa,cq as Ha,cr as Ua,cs as Ga,ct as Ka,cu as Ja,cv as Qa,cw as Xa,cx as Za,cy as Ya,cz as en,cA as tn,cB as an,cC as nn,cD as sn,cE as rn,cF as on,cG as pn,cH as un,cI as ln,cJ as mn,a as cn,cK as dn,cL as hn,cM as fn,cN as yn,cO as gn,cP as bn,cQ as Nn,cR as wn,cS as xn,cT as Sn,cU as Tn,cV as vn,cW as On,cX as _n,cY as En,cZ as An,c_ as kn,c$ as Mn,d0 as Cn,d1 as In,d2 as Dn,d3 as zn,d4 as $n,d5 as Vn,d6 as Ln,d7 as Pn,d8 as Fn,d9 as Rn,da as jn,db as Bn,dc as qn,dd as Wn,de as Hn,df as Un,dg as Gn,dh as Kn,di as Jn,dj as Qn,dk as Xn,dl as Zn,dm as Yn,dn as es,dp as ts,dq as as,dr as ns,ds as ss,dt as rs,du as os,dv as is,dw as ps,dx as us,dy as ls,dz as ms,dA as cs,dB as ds,dC as hs,dD as fs,dE as ys,dF as gs,dG as bs,dH as Ns,dI as ws,dJ as xs,dK as Ss,dL as Ts,dM as vs,dN as Os,dO as _s,dP as Es,dQ as As,dR as ks,dS as Ms,dT as Cs,dU as Is,dV as Ds,dW as zs,dX as $s,dY as Vs,dZ as Ls,d_ as Ps,d$ as Fs,m as Rs,e0 as js,e1 as Bs,e2 as qs,e3 as Ws,e4 as Hs,e5 as Us,e6 as Gs,e7 as Ks,e8 as Js,e9 as Qs,ea as Xs,eb as Zs,ec as Ys,ed as er,ee as tr,ef as ar,eg as nr,eh as sr,ei as rr,ej as or,ek as ir,el as pr,em as ur,en as lr,eo as mr,ep as cr,eq as dr,er as hr,es as fr,et as yr,eu as gr,ev as br,ew as Nr,ex as wr,ey as xr,ez as Sr,eA as Tr,eB as vr,eC as Or,eD as _r,eE as Er,eF as Ar,eG as kr,eH as Mr,eI as Cr,eJ as Ir,eK as Dr,eL as zr,eM as $r,eN as Vr,eO as Lr,eP as Pr,eQ as Fr,eR as Rr,eS as jr,eT as Br,eU as qr,eV as Wr,eW as Hr,eX as Ur,eY as Gr,eZ as Kr,e_ as Jr,e$ as Qr,f0 as Xr,f1 as Zr,f2 as Yr,f3 as eo,f4 as to,f5 as ao,f6 as no,f7 as so,f8 as ro,f9 as oo,fa as io}from"./register_all_kernels-6e0b897e.js";import{g6 as po,g7 as uo,g8 as lo,fk as mo,fl as co,fm as ho,fn as fo,g9 as yo,ga as go,gb as bo,gc as No,gd as wo,ge as xo,gf as So,gg as To,gi as vo,gh as Oo,gj as _o,gl as Eo,gm as Ao,gk as ko,gn as Mo,go as Co,gp as Io,gq as Do,iG as zo,gr as $o,gs as Vo,gt as Lo,gu as Po,gv as Fo,gw as Ro,gx as jo,gy as Bo,gz as qo,gA as Wo,gB as Ho,gC as Uo,gD as Go,gE as Ko,gH as Jo,gF as Qo,gG as Xo,iH as Zo,fH as Yo,gI as ei,gJ as ti,gK as ai,gL as ni,gM as si,gN as ri,gP as oi,gO as ii,fE as pi,gR as ui,gS as li,gT as mi,fD as ci,gV as di,gU as hi,gW as fi,gX as yi,gY as gi,gZ as bi,g_ as Ni,g$ as wi,h0 as xi,h1 as Si,h2 as Ti,iF as vi,iV as Oi,h3 as _i,h4 as Ei,h5 as Ai,iI as ki,h7 as Mi,h6 as Ci,h8 as Ii,iJ as Di,h9 as zi,ha as $i,hb as Vi,fG as Li,hn as Pi,ho as Fi,iM as Ri,hc as ji,hd as Bi,he as qi,hf as Wi,hg as Hi,hl as Ui,hh as Gi,hi as Ki,hj as Ji,hk as Qi,hm as Xi,iO as Zi,iT as Yi,hp as ep,hq as tp,hs as ap,hu as np,hv as sp,ht as rp,hr as op,hw as ip,hx as pp,hy as up,hz as lp,hA as mp,fo as cp,hB as dp,hC as hp,hE as fp,hF as yp,hG as gp,hD as bp,hI as Np,hH as wp,fp as xp,fq as Sp,hJ as Tp,hK as vp,hL as Op,hM as _p,hN as Ep,hO as Ap,fr as kp,hP as Mp,fu as Cp,hQ as Ip,gQ as Dp,hR as zp,fx as $p,hS as Vp,hY as Lp,hT as Pp,hW as Fp,hX as Rp,hU as jp,hV as Bp,hZ as qp,iD as Wp,h_ as Hp,h$ as Up,fs as Gp,i0 as Kp,i1 as Jp,i6 as Qp,i5 as Xp,i3 as Zp,i4 as Yp,i2 as eu,ic as tu,i7 as au,ia as nu,id as su,ie as ru,ig as ou,ih as iu,ib as pu,i8 as uu,ij as lu,ii as mu,ik as cu,iC as du,il as hu,im as fu,io as yu,ip as gu,iq as bu,i9 as Nu,iK as wu,ir as xu,is as Su,it as Tu,iu as vu,iv as Ou,iw as _u,ix as Eu,iy as Au,iz as ku,iA as Mu,ft as Cu,iB as Iu,iE as Du,fZ as zu,fd as $u,fe as Vu,g5 as Lu,fM as Pu,fj as Fu,fL as Ru,fN as ju,fK as Bu,fJ as qu,fO as Wu,fW as Hu,fX as Uu,iS as Gu,fh as Ku,fU as Ju,f$ as Qu,g0 as Xu,iQ as Zu,fy as Yu,fz as el,iL as tl,fP as al,fF as nl,fQ as sl,fT as rl,fY as ol,g2 as il,g1 as pl,fV as ul,fi as ll,fb as ml,fS as cl,f_ as dl,iU as hl,iN as fl,fg as yl,fv as gl,ff as bl,fR as Nl,fI as wl,g4 as xl,g3 as Sl,fw as Tl,fc as vl,fA as Ol,fB as _l,fC as El,iP as Al,iR as kl}from"./register_all_kernels-6e0b897e.js";import"./vendor-ed70b211.js";
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ml=t({addN_:function(e){a(Array.isArray(e),()=>"The argument passed to tf.addN() must be a list of tensors"),a(e.length>=1,()=>`Must pass at least one tensor to tf.addN(), but got ${e.length}`);const t=e.map((e,t)=>n(e,`tensors${t}`,"addN")),i=t[0];t.forEach(e=>{if(e.dtype!==i.dtype)throw new Error("All tensors passed to tf.addN() must have the same dtype")}),t.forEach(e=>{if(!s(e.shape,i.shape))throw new Error("All tensors passed to tf.addN() must have the same shape")});const p=t;return r.runKernel(o,p)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Cl=t({basicLSTMCell_:function(e,t,a,s,r,o){const h=n(e,"forgetBias","basicLSTMCell"),f=n(t,"lstmKernel","basicLSTMCell"),y=n(a,"lstmBias","basicLSTMCell"),g=n(s,"data","basicLSTMCell"),b=n(r,"c","basicLSTMCell"),N=n(o,"h","basicLSTMCell"),w=i([g,N],1),x=p(w,f),S=u(x,y),T=S.shape[0],v=S.shape[1]/4,O=[T,v],_=l(S,[0,0],O),E=l(S,[0,v],O),A=l(S,[0,2*v],O),k=l(S,[0,3*v],O),M=u(m(c(_),d(E)),m(b,c(u(h,A))));return[M,m(d(M),c(k))]}});
/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Il=t({bitwiseAnd_:function(e,t){const a=n(e,"x","bitwiseAnd"),o=n(t,"y","bitwiseAnd");if(!s(a.shape,o.shape))throw new Error(`BitwiseAnd: Tensors must have the same shape. x: ${a.shape}, y: ${o.shape}`);if("int32"!==a.dtype||"int32"!==o.dtype)throw new Error(`BitwiseAnd: Only supports 'int32' values in tensor, found type of x: ${a.dtype} and type of y: ${o.dtype}`);const i={a:a,b:o};return r.runKernel(h,i)}});
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Dl=t({broadcastArgs_:function(e,t){const a=n(e,"s0","broadcastArgs","int32"),s=n(t,"s1","broadcastArgs","int32");if(1!==a.rank)throw new Error(`broadcastArgs(): first input must be a vector (rank=1). Has rank ${a.rank}`);if(1!==s.rank)throw new Error(`broadcastArgs(): second input must be a vector (rank=1). Has rank ${s.rank}`);const o={s0:a,s1:s};return r.runKernel(f,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zl=t({diag_:function(e){const t={x:n(e,"x","diag")};return r.runKernel(y,t)}});
/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const $l=t({ensureShape_:function(e,t){const a=n(e,"x","ensureShape","string_or_numeric");if(!g(a.shape,t))throw new Error(`EnsureShape: Shape of tensor ${a.shape} is not compatible with expected shape ${t}`);return e}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Vl(e,t,a){if(a<=0)throw new Error("The number of values should be positive.");const n={start:e,stop:t,num:a};return r.runKernel(b,{},n)}
/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ll=2147483648;const Pl=t({searchSorted_:function(e,t,a="left"){const s=n(e,"sortedSequence","searchSorted"),o=n(t,"values","searchSorted"),i=s.shape[s.shape.length-1],p=o.shape[o.shape.length-1],u=N(s,[-1,i]),l=N(o,[-1,p]);if(u.rank<2)throw new Error("Sorted input argument must be at least 2-dimensional");if(u.shape[0]!==l.shape[0])throw new Error("Leading dimension of 'sortedSequence' and 'values' must match.");if(w(l.shape)>=Ll)throw new Error("values tensor size must less than 2147483648");if(u.shape[1]>=Ll)throw new Error(`trailing dim_size must less than 2147483648 for int32 output type, was ${u.shape[1]}`);const m={sortedSequence:u,values:l},c={side:a};return r.runKernel(x,m,c)}});
/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Fl(e,t){return Pl(e,t,"left")}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Rl=t({maxPoolWithArgmax_:function(e,t,a,s,o=!1){const i={x:n(e,"x","maxPoolWithArgmax")},p={filterSize:t,strides:a,pad:s,includeBatchInIndex:o},u=r.runKernel(S,i,p);return{result:u[0],indexes:u[1]}}});
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jl(e,t,{indexing:a="xy"}={}){if("xy"!==a&&"ij"!==a)throw new TypeError(`${a} is not a valid third argument to meshgrid`);if(void 0===e)return[];let s=n(e,"x","meshgrid",e instanceof T?e.dtype:"float32");if(void 0===t)return[s];let r=n(t,"y","meshgrid",t instanceof T?t.dtype:"float32");const o=w(s.shape),i=w(r.shape);return"xy"===a?(s=N(s,[1,-1]),r=N(r,[-1,1]),[p(v([i,1],s.dtype),s),p(r,v([1,o],r.dtype))]):(s=N(s,[-1,1]),r=N(r,[1,-1]),[p(s,v([1,i],s.dtype)),p(v([o,1],r.dtype),r)])}const Bl=t({multiRNNCell_:function(e,t,a,s){const r=n(t,"data","multiRNNCell"),o=O(a,"c","multiRNNCell"),i=O(s,"h","multiRNNCell");let p=r;const u=[];for(let n=0;n<e.length;n++){const t=e[n](p,o[n],i[n]);u.push(t[0]),u.push(t[1]),p=t[1]}const l=[],m=[];for(let n=0;n<u.length;n+=2)l.push(u[n]),m.push(u[n+1]);return[l,m]}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ql=t({multinomial_:function(e,t,a,s=!1){const o=n(e,"logits","multinomial"),i=o.size,p=o.rank;if(i<2)throw new Error(`Error in multinomial: you need at least 2 outcomes, but got ${i}.`);if(p>2)throw new Error(`Rank of probabilities must be 1 or 2, but is ${p}`);a=a||Math.random();const u={logits:1===p?N(o,[1,-1]):o},l={numSamples:t,seed:a,normalized:s},m=r.runKernel(_,u,l);return 1===p?N(m,[m.size]):m}});const Wl=t({outerProduct_:function(e,t){const s=n(e,"v1","outerProduct"),r=n(t,"v2","outerProduct");a(1===s.rank&&1===r.rank,()=>`Error in outerProduct: inputs must be rank 1, but got ranks ${s.rank} and ${r.rank}.`);const o=N(s,[-1,1]),i=N(r,[1,-1]);return p(o,i)}});const Hl=t({pad1d_:function(e,t,n=0){return a(2===t.length,()=>"Invalid number of paddings. Must be length of 2."),E(e,[t],n)}});const Ul=t({pad2d_:function(e,t,n=0){return a(2===t.length&&2===t[0].length&&2===t[1].length,()=>"Invalid number of paddings. Must be length of 2 each."),E(e,t,n)}});const Gl=t({pad3d_:function(e,t,n=0){return a(3===t.length&&2===t[0].length&&2===t[1].length&&2===t[2].length,()=>"Invalid number of paddings. Must be length of 2 each."),E(e,t,n)}});const Kl=t({pad4d_:function(e,t,n=0){return a(4===t.length&&2===t[0].length&&2===t[1].length&&2===t[2].length&&2===t[3].length,()=>"Invalid number of paddings. Must be length of 2 each."),E(e,t,n)}});
/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Jl=t({raggedGather_:function(e,t,a,s){const o={paramsNestedSplits:e.map((e,t)=>n(e,`tensors${t}`,"raggedGather","int32")),paramsDenseValues:n(t,"paramsDenseValues","raggedGather"),indices:n(a,"indices","raggedGather","int32")},i={outputRaggedRank:s},p=r.runKernel(A,o,i);return{outputNestedSplits:p.slice(0,p.length-1),outputDenseValues:p[p.length-1]}}});
/**
 * @license
 * Copyright 2022 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ql=t({raggedRange_:function(e,t,a){const s=n(e,"starts","raggedRange"),o={starts:s,limits:n(t,"limits","raggedRange",s.dtype),deltas:n(a,"deltas","raggedRange",s.dtype)},i=r.runKernel(k,o);return{rtNestedSplits:i[0],rtDenseValues:i[1]}}});
/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Xl=t({raggedTensorToTensor_:function(e,t,a,s,o){const i=n(e,"shape","raggedTensorToTensor","int32"),p=n(t,"values","raggedTensorToTensor"),u={shape:i,values:p,defaultValue:n(a,"defaultValue","raggedTensorToTensor",p.dtype),rowPartitionTensors:s.map((e,t)=>n(e,`tensors${t}`,"raggedTensorToTensor","int32"))},l={rowPartitionTypes:o};return r.runKernel(M,u,l)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Zl=t({rand_:function(e,t,a){C(e);const n=w(e);let s=null;if(null==a||"float32"===a)s=new Float32Array(n);else if("int32"===a)s=new Int32Array(n);else{if("bool"!==a)throw new Error(`Unknown data type ${a}`);s=new Uint8Array(n)}for(let r=0;r<n;r++)s[r]=t();return r.makeTensor(s,e,a)}});
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Yl(){return 32===r.backend.floatPrecision()?.001:.1}function em(e,t,a){let n=!0;if((I(e)||I(t))&&(n=!1),I(e)&&I(t)&&(n=!0),n){const a=e.constructor.name,n=t.constructor.name;if(a!==n)throw new Error(`Arrays are of different type. Actual: ${a}. Expected: ${n}`)}if(Array.isArray(e)&&Array.isArray(t)){const a=D(e),n=D(t);if(!s(a,n))throw new Error(`Arrays have different shapes. Actual: [${a}]. Expected: [${n}]`)}const r=I(e)?e:z(e),o=I(t)?t:z(t);if(r.length!==o.length)throw new Error(`Arrays have different lengths actual: ${r.length} vs expected: ${o.length}.\nActual:   ${r}.\nExpected: ${o}.`);for(let s=0;s<o.length;++s){const e=r[s],t=o[s];if(!a(e,t))throw new Error(`Arrays differ: actual[${s}] = ${e}, expected[${s}] = ${t}.\nActual:   ${r}.\nExpected: ${o}.`)}"undefined"!=typeof expect&&expect().nothing()}function tm(e,t,a){return!isFinite(e)&&!isFinite(t)||!(isNaN(e)||isNaN(t)||Math.abs(e-t)>a)}const am=Object.freeze(Object.defineProperty({__proto__:null,TEST_EPSILON_FLOAT16:.1,createVideoElement:function(e){const t=document.createElement("video");return"playsInline"in t&&(t.playsInline=!0),t.muted=!0,t.loop=!0,t.style.position="fixed",t.style.left="0px",t.style.top="0px",t.preload="auto",t.appendChild(e),new Promise(e=>{t.addEventListener("loadeddata",a=>e(t)),t.load()})},encodeStrings:function e(t){for(let a=0;a<t.length;a++){const n=t[a];Array.isArray(n)?e(n):t[a]=V(n)}return t},expectArrayBuffersEqual:function(e,t){const a=new Float32Array(e),n=new Float32Array(t);if(a.length!==n.length)throw new Error(`Expected ArrayBuffer to be of length ${n.length}, but it was ${a.length}`);for(let s=0;s<n.length;s++)if(a[s]!==n[s])throw new Error(`Expected ArrayBuffer value at ${s} to be ${n[s]} but got ${a[s]} instead`)},expectArraysClose:function(e,t,a){return null==a&&(a=Yl()),em(e,t,(e,t)=>tm(e,t,a))},expectArraysEqual:function(e,t){const a="string"==typeof t||"number"==typeof t||"boolean"==typeof t?[t]:t;return $(e)||$(e[0])||$(t)||$(t[0])?em(e,a,(e,t)=>e==t):em(e,t,(e,t)=>tm(e,t,0))},expectNumbersClose:function(e,t,a){if(null==a&&(a=Yl()),!tm(e,t,a))throw new Error(`Numbers differ: actual === ${e}, expected === ${t}`);"undefined"!=typeof expect&&expect().nothing()},expectPromiseToFail:function(e,t){e().then(()=>t.fail(),()=>t()),"undefined"!=typeof expect&&expect().nothing()},expectValuesInRange:function(e,t,a){for(let n=0;n<e.length;n++)if(e[n]<t||e[n]>a)throw new Error(`Value out of range:${e[n]} low: ${t}, high: ${a}`)},play:function(t){return e(this,null,function*(){yield t.play(),"requestVideoFrameCallback"in t&&(yield new Promise(e=>{t.requestVideoFrameCallback(e)}))})},testEpsilon:Yl},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const nm=t({randomGamma_:function(e,t,a=1,n="float32",s){if(C(e),null==a&&(a=1),null==n&&(n="float32"),"float32"!==n&&"int32"!==n)throw new Error(`Unsupported data type ${n}`);const r=new L(t,a,n,s),o=P(e,n);for(let i=0;i<o.values.length;i++)o.values[i]=r.nextValue();return o.toTensor()}});
/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const sm=t({randomStandardNormal_:function(e,t,a){if(null!=t&&"bool"===t)throw new Error(`Unsupported data type ${t}`);return F(e,0,1,t,a)}});
/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const rm=t({randomUniformInt_:function(e,t,a,n){return R(e,t,a,"int32",n)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const om=t({reverse1d_:function(e){const t=n(e,"x","reverse");return a(1===t.rank,()=>`Error in reverse1D: x must be rank 1 but got rank ${t.rank}.`),j(t,0)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const im=t({reverse2d_:function(e,t){const s=n(e,"x","reverse");return a(2===s.rank,()=>`Error in reverse2D: x must be rank 2 but got rank ${s.rank}.`),j(s,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const pm=t({reverse3d_:function(e,t){const s=n(e,"x","reverse");return a(3===s.rank,()=>`Error in reverse3D: x must be rank 3 but got rank ${s.rank}.`),j(s,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const um=t({reverse4d_:function(e,t){const s=n(e,"x","reverse");return a(4===s.rank,()=>`Error in reverse4D: x must be rank 4 but got rank ${s.rank}.`),j(s,t)}});
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const lm=function(t,s){return e(this,null,function*(){const e=n(t,"x","setdiff1d"),r=n(s,"y","setdiff1d");a(e.dtype===r.dtype,()=>`x and y should have the same dtype, but got x (${e.dtype}) and y (${r.dtype}).`),a(1===e.rank,()=>`x should be 1D tensor, but got x (${e.shape}).`),a(1===r.rank,()=>`y should be 1D tensor, but got y (${r.shape}).`);const o=yield e.data(),i=yield r.data(),p=new Set(i);let u=0;for(let t=0;t<o.length;t++)p.has(o[t])||u++;const l=new B([u],e.dtype),m=new B([u],"int32");for(let t=0,a=0;t<o.length;t++)p.has(o[t])||(l.values[a]=o[t],m.values[a]=t,a++);return[l.toTensor(),m.toTensor()]})};
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function mm(e,t,a){if(q(e),null!=t&&3!==t.length)throw new Error("tensor3d() requires shape to have three numbers");const n=D(e,a);if(3!==n.length&&1!==n.length)throw new Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if(1===n.length&&null==t)throw new Error("tensor3d() requires shape to be provided when `values` are a flat array");return W(e,t,n,a)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function cm(e,t,a){if(q(e),null!=t&&4!==t.length)throw new Error("tensor4d() requires shape to have four numbers");const n=D(e,a);if(4!==n.length&&1!==n.length)throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if(1===n.length&&null==t)throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");return W(e,t,n,a)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function dm(e,t,a){if(q(e),null!=t&&5!==t.length)throw new Error("tensor5d() requires shape to have five numbers");const n=D(e,a);if(5!==n.length&&1!==n.length)throw new Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if(1===n.length&&null==t)throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");return W(e,t,n,a)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function hm(e,t,a){if(q(e),null!=t&&6!==t.length)throw new Error("tensor6d() requires shape to have six numbers");const n=D(e,a);if(6!==n.length&&1!==n.length)throw new Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(1===n.length&&null==t)throw new Error("tensor6d() requires shape to be provided when `values` are a flat array");return W(e,t=t||n,n,a)}
/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fm=t({tensorScatterUpdate_:function(e,t,a){const s=n(e,"tensor","tensorScatterupdate"),o=n(t,"indices","tensorScatterupdate","int32"),i=n(a,"updates","tensorScatterupdate");if(H(i,o,s.shape),s.dtype!==i.dtype)throw new Error(`tensor and updates must have the same dtype, instead they are ${s.dtype} and ${i.dtype}.`);const p={tensor:s,indices:o,updates:i};return r.runKernel(U,p,{})}});
/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ym(e,t){return Pl(e,t,"right")}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const gm=function(t){return e(this,null,function*(){const e=n(t,"condition","whereAsync","bool"),a=yield e.data(),s=G(e.shape,a);return t!==e&&e.dispose(),s})};
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const bm=function(t,s,r){return e(this,null,function*(){const e=n(t,"tensor","boolMask"),o=n(s,"mask","boolMask","bool"),i=null==r?0:r,p=o.rank,u=e.shape;a(p>0,()=>"mask cannot be scalar"),K(u.slice(i,i+p),o.shape,"mask's shape must match the first K dimensions of tensor's shape,");let l=1;for(let t=i;t<i+p;t++)l*=u[t];const m=u.slice(0,i).concat([l],u.slice(i+p)),c=N(e,m),d=N(o,[-1]),h=yield gm(d),f=J(h,[1]),y=Q(c,f,i);return t!==e&&e.dispose(),s!==o&&o.dispose(),f.dispose(),c.dispose(),d.dispose(),h.dispose(),y})};
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Nm=t({movingAverage_:function(e,t,r,o,i=!0){const p=n(e,"v","movingAverage"),l=n(t,"x","movingAverage"),c=n(r,"decay","movingAverage");X(p,l),a(s(p.shape,l.shape),()=>"Shape mismatch in v and x");const d=Z(1),h=Y(d,c);let f=m(Y(l,p),h);if(i){a(null!=o,()=>"When using zeroDebias: true, step is required.");const e=n(o,"step","movingAverage");f=ee(f,Y(d,te(c,e)))}return u(p,f)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const wm=t({scatterND_:function(e,t,a){C(a);const s=n(e,"indices","scatterND","int32"),o=n(t,"updates","scatterND");H(o,s,a);const i={indices:s,updates:o},p={shape:a};return r.runKernel(ae,i,p)}});const xm=t({sparseToDense_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,a,s=0){C(a);const o=n(e,"sparseIndices","sparseToDense","int32"),i=n(t,"sparseValues","sparseToDense","string_or_numeric"),p=n(s,"defaultValue","sparseToDense",i.dtype);!function(e,t,a,n){if("int32"!==e.dtype)throw new Error(`tf.sparseToDense() expects the indices to be int32 type, but the dtype was ${e.dtype}.`);if(e.rank>2)throw new Error(`sparseIndices should be a scalar, vector, or matrix, but got shape ${e.shape}.`);const s=e.rank>0?e.shape[0]:1,r=e.rank>1?e.shape[1]:1;if(a.length!==r)throw new Error(`outputShape has incorrect number of elements:, ${a.length}, should be: ${r}.`);const o=t.size;if(0!==t.rank&&(1!==t.rank||o!==s))throw new Error(`sparseValues has incorrect shape ${t.shape}, should be [] or [${s}]`);if(t.dtype!==n.dtype)throw new Error("sparseValues.dtype must match defaultValues.dtype")}(o,i,a,p);const u={sparseIndices:o,sparseValues:i,defaultValue:p},l={outputShape:a};return r.runKernel(ne,u,l)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Sm=t({gatherND_:function(e,t){const a=n(t,"indices","gatherND","int32"),s={params:n(e,"x","gatherND","string_or_numeric"),indices:a};return r.runKernel(se,s)}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Tm=function(t,s,r=1){return e(this,null,function*(){const e=n(t,"predictions","inTopK"),o=n(s,"targets","inTopK");a(e.rank>1,()=>`inTopK() expects the predictions to be of rank 2 or higher, but got ${e.rank}`),a(e.rank-1===o.rank,()=>`predictions rank should be 1 larger than targets rank, but got predictions rank ${e.rank} and targets rank ${o.rank}`),K(e.shape.slice(0,e.shape.length-1),o.shape,"predictions's shape should be align with the targets' shape, except the last dimension.");const i=e.shape[e.shape.length-1];a(r>0&&r<=i,()=>`'k' passed to inTopK() must be > 0 && <= the predictions last dimension (${i}), but got ${r}`);const p=yield e.data(),u=yield o.data(),[l,m]=[p.length/i,i],c=re("bool",l);for(let t=0;t<l;t++){const e=t*m,a=p.subarray(e,e+m),n=[];for(let t=0;t<a.length;t++)n.push({value:a[t],index:t});n.sort((e,t)=>t.value-e.value),c[t]=0;for(let s=0;s<r;s++)if(n[s].index===u[t]){c[t]=1;break}}return t!==e&&e.dispose(),s!==o&&o.dispose(),oe(c,o.shape,"bool")})};
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const vm=t({fusedDepthwiseConv2d_:function({x:e,filter:t,strides:s,pad:o,dataFormat:i="NHWC",dilations:p=[1,1],dimRoundingMode:l,bias:m,activation:c="linear",preluActivationWeights:d,leakyreluAlpha:h}){if(!1===ie(r.state.gradientDepth,c)){let a=pe(e,t,s,o,i,p,l);return null!=m&&(a=u(a,m)),ue(a,c,d,h)}const f=n(e,"x","depthwiseConv2d","float32"),y=n(t,"filter","depthwiseConv2d","float32");let g=f,b=!1;3===f.rank&&(b=!0,g=N(f,[1,f.shape[0],f.shape[1],f.shape[2]])),a(4===g.rank,()=>`Error in fused depthwiseConv2d: input must be rank 4, but got rank ${g.rank}.`),a(4===y.rank,()=>`Error in fused depthwiseConv2d: filter must be rank 4, but got rank ${y.rank}.`),a(g.shape[3]===y.shape[2],()=>`Error in fused depthwiseConv2d: number of input channels (${g.shape[3]}) must match the inChannels dimension in filter ${y.shape[2]}.`),null==p&&(p=[1,1]),a(le(s,p),()=>`Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides ${s} and dilations '${p}'`),me("fused depthwiseConv2d",o,l);const w=ce(g.shape,y.shape,s,p,o,l,!0);let x,S;null!=m&&(x=n(m,"bias","fused conv2d"),[x]=de(x,f),he(w.outShape,x.shape)),null!=d&&(S=n(d,"prelu weights","fused depthwiseConv2d"));const T=(e,t)=>{a(ge(p),()=>`Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '${p}'`);const[n,r,i,u]=t,m=be(e,i,c),d=Ne(r.shape,m,n,s,o,p,l),h=we(r,m,n.shape,s,o,p,l);if(null!=u){return[d,h,xe(x,m)]}return[d,h]},v={x:g,filter:y,bias:x,preluActivationWeights:S},O={strides:s,pad:o,dataFormat:i,dilations:p,dimRoundingMode:l,activation:c,leakyreluAlpha:h};if(null==m){return fe((e,t,a)=>{let n=r.runKernel(ye,v,O);return a([t,e,n]),b&&(n=N(n,[n.shape[1],n.shape[2],n.shape[3]])),{value:n,gradFunc:T}})(g,y)}return fe((e,t,a,n)=>{let s=r.runKernel(ye,v,O);return n([t,e,s,a]),b&&(s=N(s,[s.shape[1],s.shape[2],s.shape[3]])),{value:s,gradFunc:T}})(g,y,x)}}),Om=Object.freeze(Object.defineProperty({__proto__:null,conv2d:Se,depthwiseConv2d:vm,matMul:Te},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _m(e){return new Promise(e=>setTimeout(e)).then(e)}class Em{constructor(e){if(!Ee().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");e.startsWith(Em.URL_SCHEME)&&(e=e.slice(Em.URL_SCHEME.length)),null!=e&&0!==e.length||(e="model"),this.modelJsonFileName=e+".json",this.weightDataFileName=e+".weights.bin"}save(t){return e(this,null,function*(){if("undefined"==typeof document)throw new Error("Browser downloads are not supported in this environment since `document` is not present");const e=Ae.join(t.weightData),a=window.URL.createObjectURL(new Blob([e],{type:"application/octet-stream"}));if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");{const e=[{paths:["./"+this.weightDataFileName],weights:t.weightSpecs}],n=ke(t,e),s=window.URL.createObjectURL(new Blob([JSON.stringify(n)],{type:"application/json"})),r=null==this.modelJsonAnchor?document.createElement("a"):this.modelJsonAnchor;if(r.download=this.modelJsonFileName,r.href=s,yield _m(()=>r.dispatchEvent(new MouseEvent("click"))),null!=t.weightData){const e=null==this.weightDataAnchor?document.createElement("a"):this.weightDataAnchor;e.download=this.weightDataFileName,e.href=a,yield _m(()=>e.dispatchEvent(new MouseEvent("click")))}return{modelArtifactsInfo:Me(t)}}})}}Em.URL_SCHEME="downloads://";class Am{constructor(e){if(null==e||e.length<1)throw new Error(`When calling browserFiles, at least 1 file is required, but received ${e}`);this.jsonFile=e[0],this.weightsFiles=e.slice(1)}load(){return e(this,null,function*(){return new Promise((e,t)=>{const a=new FileReader;a.onload=a=>{const n=JSON.parse(a.target.result),s=n.modelTopology;if(null==s)return void t(new Error(`modelTopology field is missing from file ${this.jsonFile.name}`));if(null==n.weightsManifest)return void t(new Error(`weightManifest field is missing from file ${this.jsonFile.name}`));if(0===this.weightsFiles.length)return void e({modelTopology:s});const r=Oe(n,e=>this.loadWeights(e));e(r)},a.onerror=e=>t(`Failed to read model topology and weights manifest JSON from file '${this.jsonFile.name}'. BrowserFiles supports loading Keras-style tf.Model artifacts only.`),a.readAsText(this.jsonFile)})})}loadWeights(e){const t=[],a=[];for(const r of e)t.push(...r.weights),a.push(...r.paths);const n=this.checkManifestAndWeightFiles(e),s=a.map(e=>this.loadWeightsFile(e,n[e]));return Promise.all(s).then(e=>[t,e])}loadWeightsFile(e,t){return new Promise((a,n)=>{const s=new FileReader;s.onload=e=>{const t=e.target.result;a(t)},s.onerror=t=>n(`Failed to weights data from file of path '${e}'.`),s.readAsArrayBuffer(t)})}checkManifestAndWeightFiles(e){const t=[],a=this.weightsFiles.map(e=>_e(e.name)),n={};for(const s of e)s.paths.forEach(e=>{const s=_e(e);if(-1!==t.indexOf(s))throw new Error(`Duplicate file basename found in weights manifest: '${s}'`);if(t.push(s),-1===a.indexOf(s))throw new Error(`Weight file with basename '${s}' is not provided.`);n[e]=this.weightsFiles[a.indexOf(s)]});if(t.length!==this.weightsFiles.length)throw new Error(`Mismatch in the number of files in weights manifest (${t.length}) and the number of weight files provided (${this.weightsFiles.length}).`);return n}}ve.registerSaveRouter(e=>Ee().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(Em.URL_SCHEME)?function(e="model"){return new Em(e)}(e.slice(Em.URL_SCHEME.length)):null);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class km{constructor(e){this.modelArtifacts=e}load(){return this.modelArtifacts}}class Mm{constructor(e){this.saveHandler=e}save(e){return this.saveHandler(e)}}class Cm{constructor(e){e.load&&(this.load=()=>Promise.resolve(e.load())),e.save&&(this.save=t=>Promise.resolve(e.save(t)))}}function Im(e,t,a,n){if(1===arguments.length){return null!=e.modelTopology||null!=e.weightSpecs?new km(e):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new km({modelTopology:e}))}return console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new km({modelTopology:e,weightSpecs:t,weightData:a,trainingConfig:n})}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const Dm=Object.freeze(Object.defineProperty({__proto__:null,CompositeArrayBuffer:Ae,browserFiles:function(e){return new Am(e)},browserHTTPRequest:Ce,concatenateArrayBuffers:Ie,copyModel:De,decodeWeights:ze,decodeWeightsStream:$e,encodeWeights:Ve,fromMemory:function(e,t,a,n){return new Cm(Im(...arguments))},fromMemorySync:Im,getLoadHandlers:Le,getModelArtifactsForJSON:Oe,getModelArtifactsForJSONSync:Pe,getModelArtifactsInfoForJSON:Me,getSaveHandlers:Fe,getWeightSpecs:Re,http:je,isHTTPScheme:Be,listModels:qe,loadWeights:We,moveModel:He,registerLoadRouter:Ue,registerSaveRouter:Ge,removeModel:Ke,weightsLoaderFactory:Je,withSaveHandler:function(e){return new Mm(e)},withSaveHandlerSync:function(e){return new Mm(e)}},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zm=t({confusionMatrix_:function(e,t,s){const r=n(e,"labels","confusionMatrix"),o=n(t,"predictions","confusionMatrix");a(null==s||s>0&&Number.isInteger(s),()=>`If provided, numClasses must be a positive integer, but got ${s}`),a(1===r.rank,()=>`Expected the rank of labels to be 1, but got ${r.rank}`),a(1===o.rank,()=>`Expected the rank of predictions to be 1, but got ${o.rank}`),a(r.shape[0]===o.shape[0],()=>`Mismatch in the number of examples: ${r.shape[0]} vs. ${o.shape[0]}. Labels and predictions should have the same number of elements.`),a(s>0&&Number.isInteger(s),()=>`numClasses is required to be a positive integer, but got ${s}`);const i=Qe(Xe(r,"int32"),s),u=Qe(Xe(o,"int32"),s),l=Ze(i),m=p(l,u);return Xe(m,"int32")}}),$m=Object.freeze(Object.defineProperty({__proto__:null,confusionMatrix:zm},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
let Vm,Lm=!1;function Pm(e,t=3){if(t>4)throw new Error("Cannot construct Tensor with more than 4 channels from pixels.");if(null==e)throw new Error("pixels passed to tf.browser.fromPixels() can not be null");let a=!1,n=!1,s=!1,o=!1,i=!1,p=!1;if(e.data instanceof Uint8Array)a=!0;else if("undefined"!=typeof ImageData&&e instanceof ImageData)n=!0;else if("undefined"!=typeof HTMLVideoElement&&e instanceof HTMLVideoElement)s=!0;else if("undefined"!=typeof HTMLImageElement&&e instanceof HTMLImageElement)o=!0;else if(null!=e.getContext)i=!0;else{if(!("undefined"!=typeof ImageBitmap&&e instanceof ImageBitmap))throw new Error(`pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, but was ${e.constructor.name}`);p=!0}if(null!=Ye(tt,r.backendName)){const a={pixels:e},n={numChannels:t};return r.runKernel(tt,a,n)}const[u,l]=s?[e.videoWidth,e.videoHeight]:[e.width,e.height];let m,c;if(i)m=e.getContext("2d").getImageData(0,0,u,l).data;else if(n||a)m=e.data;else if(o||s||p){if(null==Vm)if("undefined"==typeof document){if("undefined"==typeof OffscreenCanvas||"undefined"==typeof OffscreenCanvasRenderingContext2D)throw new Error("Cannot parse input in current context. Reason: OffscreenCanvas Context2D rendering is not supported.");Vm=new OffscreenCanvas(1,1).getContext("2d")}else Vm=document.createElement("canvas").getContext("2d",{willReadFrequently:!0});Vm.canvas.width=u,Vm.canvas.height=l,Vm.drawImage(e,0,0,u,l),m=Vm.getImageData(0,0,u,l).data}if(4===t)c=new Int32Array(m);else{const e=u*l;c=new Int32Array(e*t);for(let a=0;a<e;a++)for(let e=0;e<t;++e)c[a*t+e]=m[4*a+e]}return mm(c,[l,u,t],"int32")}function Fm(e){return"undefined"!=typeof window&&"undefined"!=typeof ImageBitmap&&window.hasOwnProperty("createImageBitmap")&&!(e instanceof ImageBitmap)&&function(e){return null!=e&&0!==e.width&&0!==e.height}(e)&&!function(e){return null!=e&&e.data instanceof Uint8Array}(e)}function Rm(e){if(2!==e.rank&&3!==e.rank)throw new Error(`toPixels only supports rank 2 or 3 tensors, got rank ${e.rank}.`);const t=2===e.rank?1:e.shape[2];if(t>4||2===t)throw new Error(`toPixels only supports depth of size 1, 3 or 4 but got ${t}`);if("float32"!==e.dtype&&"int32"!==e.dtype)throw new Error(`Unsupported type for toPixels: ${e.dtype}. Please use float32 or int32 tensors.`)}const jm=t({fromPixels_:Pm}),Bm=Object.freeze(Object.defineProperty({__proto__:null,draw:function(e,t,a){let s=n(e,"img","draw");if(!(e instanceof T)){const e=s;s=Xe(e,"int32"),e.dispose()}Rm(s),function(e){const t=(null==e?void 0:e.alpha)||1;if(t>1||t<0)throw new Error(`Alpha value ${t} is suppoed to be in range [0 - 1].`)}(null==a?void 0:a.imageOptions);const o={image:s},i={canvas:t,options:a};r.runKernel(et,o,i)},fromPixels:jm,fromPixelsAsync:function(t,a=3){return e(this,null,function*(){let e=null;if(Ee().getBool("WRAP_TO_IMAGEBITMAP")&&Fm(t)){let a;try{a=yield createImageBitmap(t,{premultiplyAlpha:"none"})}catch(n){a=null}e=null!=a&&a.width===t.width&&a.height===t.height?a:t}else e=t;return Pm(e,a)})},toPixels:function(t,a){return e(this,null,function*(){let e=n(t,"img","toPixels");if(!(t instanceof T)){const t=e;e=Xe(t,"int32"),t.dispose()}Rm(e);const[s,o]=e.shape.slice(0,2),i=2===e.rank?1:e.shape[2],p=yield e.data(),u="float32"===e.dtype?255:1,l=new Uint8ClampedArray(o*s*4);for(let t=0;t<s*o;++t){const a=[0,0,0,255];for(let s=0;s<i;s++){const n=p[t*i+s];if("float32"===e.dtype){if(n<0||n>1)throw new Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${n}.`)}else if("int32"===e.dtype&&(n<0||n>255))throw new Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${n}.`);1===i?(a[0]=n*u,a[1]=n*u,a[2]=n*u):a[s]=n*u}const n=4*t;l[n+0]=Math.round(a[0]),l[n+1]=Math.round(a[1]),l[n+2]=Math.round(a[2]),l[n+3]=Math.round(a[3])}if(null!=a){if(!Lm){null!=Ye(et,r.backendName)&&(console.warn("tf.browser.toPixels is not efficient to draw tensor on canvas. Please try tf.browser.draw instead."),Lm=!0)}a.width=o,a.height=s;const e=a.getContext("2d"),t=new ImageData(l,o,s);e.putImageData(t,0,0)}return e!==t&&e.dispose(),l})}},Symbol.toStringTag,{value:"Module"})),qm="4.22.0",Wm=Object.freeze(Object.defineProperty({__proto__:null,nonMaxSuppressionV3Impl:at,nonMaxSuppressionV4Impl:nt,nonMaxSuppressionV5Impl:st,whereImpl:G},Symbol.toStringTag,{value:"Module"}));const Hm=Object.freeze(Object.defineProperty({__proto__:null,maxNorm:
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */
function(e){return new rt(e)},minMaxNorm:function(e){return new pt(e)},nonNeg:function(){return new it},unitNorm:function(e){return new ot(e)}},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */const Um=Object.freeze(Object.defineProperty({__proto__:null,constant:function(e){return new mt(e)},glorotNormal:function(e){return new bt(e)},glorotUniform:function(e){return new gt(e)},heNormal:function(e){return new Nt(e)},heUniform:function(e){return new wt(e)},identity:function(e){return new ft(e)},leCunNormal:function(e){return new xt(e)},leCunUniform:function(e){return new St(e)},ones:function(){return new lt},orthogonal:function(e){return new Tt(e)},randomNormal:function(e){return new dt(e)},randomUniform:function(e){return new ct(e)},truncatedNormal:function(e){return new ht(e)},varianceScaling:function(e){return new yt(e)},zeros:function(){return new ut}},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */function Gm(e){return new vt(e)}function Km(e){return new Ot(e)}function Jm(e){return _t(e)}function Qm(e,t){Et.registerCallbackConstructor(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */function Xm(e){return new ua(e)}function Zm(e){return new la(e)}function Ym(e){return new ma(e)}function ec(e){return new ha(e)}function tc(e){return new fa(e)}function ac(e){return new ya(e)}function nc(e){return new ga(e)}const sc=ec,rc=tc,oc=ac,ic=nc;const pc=Object.freeze(Object.defineProperty({__proto__:null,Layer:Ra,RNN:Ea,RNNCell:ja,activation:function(e){return new Wt(e)},add:function(e){return new Yt(e)},alphaDropout:function(e){return new Da(e)},average:function(e){return new ea(e)},averagePooling1d:Xm,averagePooling2d:Zm,averagePooling3d:Ym,avgPool1d:function(e){return Xm(e)},avgPool2d:function(e){return Zm(e)},avgPool3d:function(e){return Ym(e)},avgPooling1d:function(e){return Xm(e)},avgPooling2d:function(e){return Zm(e)},avgPooling3d:function(e){return Ym(e)},batchNormalization:function(e){return new oa(e)},bidirectional:function(e){return new ka(e)},categoryEncoding:function(e){return new Pa(e)},centerCrop:function(e){return new Va(e)},concatenate:function(e){return new ta(e)},conv1d:function(e){return new $t(e)},conv2d:function(e){return new Vt(e)},conv2dTranspose:function(e){return new Lt(e)},conv3d:function(e){return new Pt(e)},conv3dTranspose:function(e){return new Ft(e)},convLstm2d:function(e){return new Oa(e)},convLstm2dCell:function(e){return new _a(e)},cropping2D:function(e){return new jt(e)},dense:function(e){return new Ht(e)},depthwiseConv2d:function(e){return new qt(e)},dot:function(e){return new ra(e)},dropout:function(e){return new Ut(e)},elu:function(e){return new kt(e)},embedding:function(e){return new Zt(e)},flatten:function(e){return new Kt(e)},gaussianDropout:function(e){return new Ia(e)},gaussianNoise:function(e){return new Ca(e)},globalAveragePooling1d:function(e){return new ca(e)},globalAveragePooling2d:function(e){return new da(e)},globalMaxPool1d:sc,globalMaxPool2d:rc,globalMaxPooling1d:ec,globalMaxPooling2d:tc,gru:function(e){return new Na(e)},gruCell:function(e){return new wa(e)},input:Jm,inputLayer:function(e){return new At(e)},layerNormalization:function(e){return new ia(e)},leakyReLU:function(e){return new Ct(e)},lstm:function(e){return new xa(e)},lstmCell:function(e){return new Sa(e)},masking:function(e){return new za(e)},maxPool1d:oc,maxPool2d:ic,maxPooling1d:ac,maxPooling2d:nc,maxPooling3d:function(e){return new ba(e)},maximum:function(e){return new aa(e)},minimum:function(e){return new na(e)},multiply:function(e){return new sa(e)},permute:function(e){return new Xt(e)},prelu:function(e){return new It(e)},randomWidth:function(e){return new Fa(e)},reLU:function(e){return new Mt(e)},repeatVector:function(e){return new Jt(e)},rescaling:function(e){return new $a(e)},reshape:function(e){return new Qt(e)},resizing:function(e){return new La(e)},rnn:function(e){return new Ea(e)},separableConv2d:function(e){return new Rt(e)},simpleRNN:function(e){return new Ta(e)},simpleRNNCell:function(e){return new va(e)},softmax:function(e){return new Dt(e)},spatialDropout1d:function(e){return new Gt(e)},stackedRNNCells:function(e){return new Aa(e)},thresholdedReLU:function(e){return new zt(e)},timeDistributed:function(e){return new Ma(e)},upSampling2d:function(e){return new Bt(e)},zeroPadding2d:function(e){return new pa(e)}},Symbol.toStringTag,{value:"Module"}));const uc=Object.freeze(Object.defineProperty({__proto__:null,MAPE:function(e,t){return Xa(e,t)},MSE:function(e,t){return Za(e,t)},binaryAccuracy:function(e,t){return Ba(e,t)},binaryCrossentropy:function(e,t){return qa(e,t)},categoricalAccuracy:function(e,t){return Ha(e,t)},categoricalCrossentropy:function(e,t){return Ua(e,t)},cosineProximity:function(e,t){return Ja(e,t)},mape:function(e,t){return Xa(e,t)},meanAbsoluteError:function(e,t){return Qa(e,t)},meanAbsolutePercentageError:function(e,t){return Xa(e,t)},meanSquaredError:function(e,t){return Za(e,t)},mse:function(e,t){return Za(e,t)},precision:function(e,t){return Ga(e,t)},r2Score:function(e,t){return Ya(e,t)},recall:function(e,t){return Ka(e,t)},sparseCategoricalAccuracy:function(e,t){return Wa(e,t)}},Symbol.toStringTag,{value:"Module"})),lc=Object.freeze(Object.defineProperty({__proto__:null,modelFromJSON:en},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */const mc=Object.freeze(Object.defineProperty({__proto__:null,l1:function(e){return an(e)},l1l2:
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */
function(e){return new tn(e)},l2:function(e){return nn(e)}},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */class cc extends sn{constructor(){super(...arguments),this.model=null}setModel(e){if(!(e instanceof vt))throw new Error("model must be a LayersModel, not some other Container");this.model=e}}function dc(e,t){return e<t}function hc(e,t){return e>t}class fc extends cc{constructor(e){if(super(),null==e&&(e={}),e.restoreBestWeights)throw new rn("restoreBestWeights = True is not implemented in EarlyStopping yet.");this.monitor=e.monitor||"val_loss",this.minDelta=Math.abs(e.minDelta||0),this.patience=e.patience||0,this.verbose=e.verbose||0,this.mode=e.mode||"auto",this.baseline=e.baseline,-1===["auto","min","max"].indexOf(this.mode)&&(console.warn(`EarlyStopping mode '${this.mode}' is invalid. Falling back to mode 'auto'.`),this.mode="auto"),"min"===this.mode?this.monitorFunc=dc:"max"===this.mode||-1!==this.monitor.indexOf("acc")?this.monitorFunc=hc:this.monitorFunc=dc,this.monitorFunc===dc&&(this.minDelta*=-1)}onTrainBegin(t){return e(this,null,function*(){this.wait=0,this.stoppedEpoch=0,null!=this.baseline?this.best=this.baseline:this.best=this.monitorFunc===dc?1/0:-1/0})}onEpochEnd(t,a){return e(this,null,function*(){yield on(a);const e=this.getMonitorValue(a);null!=e&&(this.monitorFunc(e-this.minDelta,this.best)?(this.best=e,this.wait=0):(this.wait++,this.wait>=this.patience&&(this.stoppedEpoch=t,this.model.stopTraining=!0)))})}onTrainEnd(t){return e(this,null,function*(){this.stoppedEpoch>0&&this.verbose&&console.log(`Epoch ${this.stoppedEpoch}: early stopping.`)})}getMonitorValue(e){null==e&&(e={});const t=e[this.monitor];return null==t&&console.warn(`Metric for EarlyStopping ${this.monitor} is not available. Available metrics are: ${Object.keys(e)}`),t}}const yc={earlyStopping:function(e){return new fc(e)}},gc={};
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bc(e,t){const a={tfOpName:e,category:"custom",inputs:[],attrs:[],customExecutor:t};gc[e]=a}function Nc(e){return gc[e]}function wc(e){delete gc[e]}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function xc(e,t,a,n,s){const r=t.inputParams[e];if(r&&void 0!==r.inputIndexStart){const e=r.inputIndexStart,o=0===r.inputIndexEnd?void 0:void 0===r.inputIndexEnd?e+1:r.inputIndexEnd,i=e<0?t.inputNames.length+e:e;if("tensor"===r.type)return Sc(t.inputNames[i],a,n,s);if("tensors"===r.type){const r=t.inputs.slice(e,o);return t.inputNames.slice(e,o).filter((e,t)=>{var a;return"NoOp"!==(null===(a=r[t])||void 0===a?void 0:a.op)}).map(e=>Sc(e,a,n,s))}const p=Sc(t.inputNames[i],a,n,s),u=p.dataSync();return"number"===r.type?u[0]:pn(p.shape,u)}const o=t.attrParams[e];return o&&o.value}function Sc(e,t,a,n){const[s,r]=_c(e,a);if(null!=n){const e=n.getHashTableHandleByName(s);if(null!=e)return e}const o=a.currentContextIds.find(e=>!!t[Oc(s,e)]);return void 0!==o?t[Oc(s,o)][r]:void 0}function Tc(e,t,a){return t[Oc(e,a.currentContextId)]}function vc(e,t){const[a,n,s]=_c(e,t);return[Oc(a,t&&t.currentContextId),n,s]}function Oc(e,t){return t?`${e}-${t}`:e}function _c(e,t){if(""===e)return["",0,void 0];const a=null!=t&&null!=t.parseNodeNameCache;if(a){const a=t.parseNodeNameCache.get(e);if(null!=a)return a}const n=e.split(":");let s;if(1===n.length)s=[e,0,void 0];else{const e=n[0],t=3===n.length?n[1]:void 0;s=[e,Number(n[n.length-1]),t]}return a&&t.parseNodeNameCache.set(e,s),s}function Ec(e,t,a){let n=xc("pad",e,t,a);if("explicit"===n){n=xc("explicitPaddings",e,t,a);const s=[[0,0],[0,0],[0,0],[0,0]];for(let e=0;e<4;e++)s[e][0]=n[2*e],s[e][1]=n[2*e+1];return s}return n}function Ac(e){return e.kept?e:un(e)}
/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const kc=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"Add",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddV2",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddN",category:"arithmetic",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"BiasAdd",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"Sub",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"RealDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Div",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"DivNoNan",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mul",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Maximum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Minimum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Pow",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SquaredDifference",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorMod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}]},Symbol.toStringTag,{value:"Module"})),Mc=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"Abs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan2",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Ceil",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ClipByValue",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"clipValueMin",type:"number"},{start:2,name:"clipValueMax",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Complex",category:"basic_math",inputs:[{start:0,name:"real",type:"tensor"},{start:1,name:"imag",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ComplexAbs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Elu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Exp",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Floor",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Imag",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Neg",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Real",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Prelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"alpha",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu6",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Selu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sigmoid",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Rsqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Square",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sign",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Round",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Expm1",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log1p",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Reciprocal",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Softplus",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Erf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LeakyRelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"alpha",name:"alpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsNan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsFinite",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsInf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}]},Symbol.toStringTag,{value:"Module"})),Cc=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"EmptyTensorList",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"maxNumElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"LoopCond",category:"control",inputs:[{start:0,name:"pred",type:"tensor"}]},{tfOpName:"Switch",category:"control",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"pred",type:"tensor"}]},{tfOpName:"Merge",category:"control",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"Enter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"frame_name",name:"frameName",type:"string"},{tfName:"is_constant",name:"isConstant",type:"bool"}]},{tfOpName:"Exit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NextIteration",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayV3",category:"control",inputs:[{start:0,name:"size",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"dynamic_size",name:"dynamicSize",type:"bool"},{tfName:"clear_after_read",name:"clearAfterRead",type:"bool"},{tfName:"identical_element_shapes",name:"identicalElementShapes",type:"bool"},{tfName:"tensor_array_name",name:"name",type:"string"}]},{tfOpName:"TensorArrayWriteV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayReadV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayGatherV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"}]},{tfOpName:"TensorArrayScatterV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArrayConcatV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape_except0",name:"elementShapeExcept0",type:"shape",notSupported:!0}]},{tfOpName:"TensorArraySplitV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"tensor",type:"tensor"},{start:2,name:"lengths",type:"number[]"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArraySizeV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}]},{tfOpName:"TensorArrayCloseV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"}]},{tfOpName:"StatelessIf",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"If",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"StatelessWhile",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"While",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"TensorListScatter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListScatterV2",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"},{start:3,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGather",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListSetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListReserve",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListFromTensor",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListStack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"},{tfName:"num_elements",name:"numElements",type:"dtype"}]},{tfOpName:"TensorListSplit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"},{start:2,name:"lengths",type:"number[]"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcat",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcatV2",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPopBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPushBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListLength",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}]},{tfOpName:"TensorListResize",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"size",type:"number"}]}]},Symbol.toStringTag,{value:"Module"})),Ic=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"AvgPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[],notSupported:!0},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPoolWithArgmax",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"include_batch_in_index",name:"includeBatchInIndex",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AvgPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Conv1D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"stride",name:"stride",type:"number"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NWC"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"dilation",name:"dilation",type:"number",defaultValue:1}]},{tfOpName:"Conv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"useCudnnOnGpu",name:"useCudnnOnGpu",type:"bool"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"_FusedConv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"use_cudnn_on_gpu",name:"useCudnnOnGpu",type:"bool",defaultValue:!0},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2}]},{tfOpName:"Conv2DBackpropInput",category:"convolution",inputs:[{start:2,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:0,name:"outputShape",type:"number[]"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]",notSupported:!0}]},{tfOpName:"DepthwiseConv2d",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"DepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"FusedDepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]}]},{tfOpName:"Conv3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"Dilation2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"rates",name:"dilations",type:"number[]"},{tfName:"padding",name:"pad",type:"string"}]}]},Symbol.toStringTag,{value:"Module"})),Dc=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"Fill",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"},{start:1,name:"value",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"LinSpace",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"num",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"OneHot",category:"creation",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"depth",type:"number"},{start:2,name:"onValue",type:"number",defaultValue:1},{start:3,name:"offValue",type:"number",defaultValue:0}],attrs:[{tfName:"axis",name:"axis",type:"number",notSupported:!0},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Ones",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"OnesLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"RandomStandardNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniform",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number",defaultValue:0},{tfName:"maxval",name:"maxval",type:"number",defaultValue:1},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniformInt",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number"},{tfName:"maxval",name:"maxval",type:"number"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Range",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"step",type:"number",defaultValue:0}],attrs:[{tfName:"Tidx",name:"dtype",type:"dtype"}]},{tfOpName:"TruncatedNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"means",name:"mean",type:"number",defaultValue:0},{tfName:"stddev",name:"stdDev",type:"number",defaultValue:1},{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"Zeros",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"ZerosLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Multinomial",category:"creation",inputs:[{start:0,name:"logits",type:"tensor"},{start:1,name:"numSamples",type:"number"}],attrs:[{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number"},{tfName:"T",name:"dtype",type:"dtype"},{tfName:"output_dtype",name:"output_dtype",type:"dtype"}]}]},Symbol.toStringTag,{value:"Module"})),zc=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"NonMaxSuppressionV2",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV3",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV4",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"T_threshold",name:"threshold",type:"dtype",notSupported:!0},{tfName:"pad_to_max_output_size",name:"padToMaxOutputSize",type:"bool"}]},{tfOpName:"NonMaxSuppressionV5",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"},{start:5,name:"softNmsSigma",type:"number"}]},{tfOpName:"Where",category:"dynamic",inputs:[{start:0,name:"condition",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ListDiff",category:"dynamic",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}]},Symbol.toStringTag,{value:"Module"})),$c=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"LowerBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"TopKV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"k",type:"number"}],attrs:[{tfName:"sorted",name:"sorted",type:"bool"}]},{tfOpName:"UpperBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"Unique",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"UniqueV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]}]},Symbol.toStringTag,{value:"Module"})),Vc=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"PlaceholderWithDefault",category:"graph",inputs:[{start:0,name:"default",type:"tensor"}],attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Placeholder",category:"graph",attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Const",category:"graph"},{tfOpName:"Identity",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IdentityN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Snapshot",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Rank",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Size",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Shape",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"ShapeN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Print",category:"graph",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"data",type:"tensors"}],attrs:[{tfName:"message",name:"message",type:"string"},{tfName:"first_n",name:"firstN",type:"number",notSupported:!0},{tfName:"summarize",name:"summarize",type:"number",defaultValue:3}]},{tfOpName:"NoOp",category:"graph",inputs:[]},{tfOpName:"StopGradient",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"FakeQuantWithMinMaxVars",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"min",name:"min",type:"number"},{tfName:"max",name:"max",type:"number"}]}]},Symbol.toStringTag,{value:"Module"})),Lc=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"HashTable",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"HashTableV2",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"LookupTableImport",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableImportV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFind",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFindV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableSize",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"LookupTableSizeV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"InitializeTable",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}]},{tfOpName:"InitializeTableV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}]}]},Symbol.toStringTag,{value:"Module"})),Pc=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"ResizeBilinear",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ResizeNearestNeighbor",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"CropAndResize",category:"image",inputs:[{start:0,name:"image",type:"tensor"},{start:1,name:"boxes",type:"tensor"},{start:2,name:"boxInd",type:"tensor"},{start:3,name:"cropSize",type:"number[]"}],attrs:[{tfName:"method",name:"method",type:"string"},{tfName:"extrapolation_value",name:"extrapolationValue",type:"number"}]},{tfOpName:"ImageProjectiveTransformV3",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"transforms",type:"tensor"},{start:2,name:"outputShape",type:"number[]"},{start:3,name:"fillValue",type:"number"}],attrs:[{tfName:"interpolation",name:"interpolation",type:"string"},{tfName:"fill_mode",name:"fillMode",type:"string"}]}]},Symbol.toStringTag,{value:"Module"})),Fc=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"Equal",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NotEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Greater",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"GreaterEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Less",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LessEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalAnd",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalNot",category:"logical",inputs:[{start:0,name:"a",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalOr",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Select",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SelectV2",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BitwiseAnd",category:"logical",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}]}]},Symbol.toStringTag,{value:"Module"})),Rc=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"_FusedMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMulV2",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Transpose",category:"matrices",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"perm",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Einsum",category:"matrices",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"equation",name:"equation",type:"string"},{tfName:"N",name:"n",type:"number",defaultValue:2},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"MatrixBandPart",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"numLower",type:"tensor"},{start:1,name:"numUpper",type:"tensor"}]}]},Symbol.toStringTag,{value:"Module"})),jc=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"EuclideanNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool",defaultValue:!1}]},{tfOpName:"FusedBatchNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV2",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV3",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"LRN",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"depth_radius",name:"radius",type:"number",defaultValue:5},{tfName:"bias",name:"bias",type:"number",defaultValue:1},{tfName:"alpha",name:"alpha",type:"number",defaultValue:1},{tfName:"beta",name:"beta",type:"number",defaultValue:.5}]},{tfOpName:"Softmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"LogSoftmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]}]},Symbol.toStringTag,{value:"Module"})),Bc=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"Bincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}]},{tfOpName:"DenseBincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}],attrs:[{tfName:"binary_output",name:"binaryOutput",type:"bool"}]},{tfOpName:"Max",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Mean",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Min",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Sum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"All",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Any",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"ArgMax",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"ArgMin",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"Prod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cumprod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]},{tfOpName:"Cumsum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]}]},Symbol.toStringTag,{value:"Module"})),qc=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"ConcatV2",category:"slice_join",inputs:[{start:0,end:-1,name:"tensors",type:"tensors"},{start:-1,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"Concat",category:"slice_join",inputs:[{start:1,end:0,name:"tensors",type:"tensors"},{start:0,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"GatherV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"axis",type:"number",defaultValue:0}],attrs:[{tfName:"batch_dims",name:"batchDims",type:"number",defaultValue:0}]},{tfOpName:"Gather",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",notSupported:!0}]},{tfOpName:"Reverse",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"dims",type:"bool[]"}]},{tfOpName:"ReverseV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}]},{tfOpName:"Slice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"size",type:"number[]"}]},{tfOpName:"StridedSlice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"end",type:"number[]"},{start:3,name:"strides",type:"number[]"}],attrs:[{tfName:"begin_mask",name:"beginMask",type:"number",defaultValue:0},{tfName:"end_mask",name:"endMask",type:"number",defaultValue:0},{tfName:"new_axis_mask",name:"newAxisMask",type:"number",defaultValue:0},{tfName:"ellipsis_mask",name:"ellipsisMask",type:"number",defaultValue:0},{tfName:"shrink_axis_mask",name:"shrinkAxisMask",type:"number",defaultValue:0}]},{tfOpName:"Pack",category:"slice_join",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0}]},{tfOpName:"Unpack",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0},{tfName:"num",name:"num",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Tile",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"reps",type:"number[]"}]},{tfOpName:"Split",category:"slice_join",inputs:[{start:0,name:"axis",type:"number",defaultValue:0},{start:1,name:"x",type:"tensor"}],attrs:[{tfName:"num_split",name:"numOrSizeSplits",type:"number",defaultValue:1}]},{tfOpName:"SplitV",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"numOrSizeSplits",type:"number[]"},{start:2,name:"axis",type:"number",defaultValue:0}]},{tfOpName:"ScatterNd",category:"slice_join",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"shape",type:"number[]"}]},{tfOpName:"GatherNd",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}]},{tfOpName:"SparseToDense",category:"slice_join",inputs:[{start:0,name:"sparseIndices",type:"tensor"},{start:1,name:"outputShape",type:"number[]"},{start:2,name:"sparseValues",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",defaultValue:!1,notSupported:!0}]},{tfOpName:"TensorScatterUpdate",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"values",type:"tensor"}]}]},Symbol.toStringTag,{value:"Module"})),Wc=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"SparseFillEmptyRows",category:"sparse",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"denseShape",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}]},{tfOpName:"SparseReshape",category:"sparse",inputs:[{start:0,name:"inputIndices",type:"tensor"},{start:1,name:"inputShape",type:"tensor"},{start:2,name:"newShape",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SparseSegmentMean",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]},{tfOpName:"SparseSegmentSum",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]}]},Symbol.toStringTag,{value:"Module"})),Hc=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"FFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"RFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]},{tfOpName:"IRFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]}]},Symbol.toStringTag,{value:"Module"})),Uc=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"StaticRegexReplace",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"pattern",name:"pattern",type:"string"},{tfName:"rewrite",name:"rewrite",type:"string"},{tfName:"replace_global",name:"replaceGlobal",type:"bool"}]},{tfOpName:"StringNGrams",category:"string",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"dataSplits",type:"tensor"}],attrs:[{tfName:"separator",name:"separator",type:"string"},{tfName:"ngram_widths",name:"nGramWidths",type:"number[]"},{tfName:"left_pad",name:"leftPad",type:"string"},{tfName:"right_pad",name:"rightPad",type:"string"},{tfName:"pad_width",name:"padWidth",type:"number"},{tfName:"preserve_short_sequences",name:"preserveShortSequences",type:"bool"}],outputs:["ngrams","ngrams_splits"]},{tfOpName:"StringSplit",category:"string",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"delimiter",type:"tensor"}],attrs:[{tfName:"skip_empty",name:"skipEmpty",type:"bool"}],outputs:["indices","values","shape"]},{tfOpName:"StringToHashBucketFast",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"num_buckets",name:"numBuckets",type:"number"}]}]},Symbol.toStringTag,{value:"Module"})),Gc=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"Cast",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"SrcT",name:"sdtype",type:"dtype",notSupported:!0},{tfName:"DstT",name:"dtype",type:"dtype"}]},{tfOpName:"ExpandDims",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"MirrorPad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"mode",name:"mode",type:"string"}]},{tfOpName:"Pad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"constant_value",name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"PadV2",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"},{start:2,name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"Reshape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"EnsureShape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"Squeeze",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"axis",tfDeprecatedName:"squeeze_dims",name:"axis",type:"number[]"}]},{tfOpName:"SpaceToBatchND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"paddings",type:"number[]"}]},{tfOpName:"BatchToSpaceND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"crops",type:"number[]"}]},{tfOpName:"DepthToSpace",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"block_size",name:"blockSize",type:"number"},{tfName:"data_format",name:"dataFormat",type:"string"}]},{tfOpName:"BroadcastTo",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}],attrs:[]},{tfOpName:"BroadcastArgs",category:"transformation",inputs:[{start:0,name:"s0",type:"tensor"},{start:1,name:"s1",type:"tensor"}],attrs:[]}]},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class Kc{static get Instance(){return this._instance||(this._instance=new this)}constructor(){const e=[].concat(...[kc,Mc,Cc,Ic,Dc,zc,$c,Vc,Lc,Pc,Fc,Rc,jc,Bc,qc,Wc,Hc,Uc,Gc].map(e=>e.json));this.opMappers=e.reduce((e,t)=>(e[t.tfOpName]=t,e),{})}transformGraph(e,t={}){const a=e.node,n=[],s=[],r=[],o=a.reduce((e,t)=>(e[t.name]=this.mapNode(t),t.op.startsWith("Placeholder")?n.push(e[t.name]):"Const"===t.op?s.push(e[t.name]):null!=t.input&&0!==t.input.length||r.push(e[t.name]),e),{});let i=[];const p=[];let u={},l={};null!=t&&(u=this.mapSignatureEntries(t.inputs),l=this.mapSignatureEntries(t.outputs));const m=Object.keys(o);m.forEach(e=>{const t=o[e];t.inputNames.forEach((e,a)=>{const[n,,s]=vc(e),r=o[n];if(null!=r.outputs){const e=r.outputs.indexOf(s);if(-1!==e){const s=`${n}:${e}`;t.inputNames[a]=s}}t.inputs.push(r),r.children.push(t)})}),0===Object.keys(l).length?m.forEach(e=>{const t=o[e];0===t.children.length&&p.push(t)}):Object.keys(l).forEach(e=>{const[t]=vc(e),a=o[t];null!=a&&(a.signatureKey=l[e],p.push(a))}),Object.keys(u).length>0?Object.keys(u).forEach(e=>{const[t]=vc(e),a=o[t];a&&(a.signatureKey=u[e],i.push(a))}):i=n;let c={};null!=e.library&&null!=e.library.function&&(c=e.library.function.reduce((e,t)=>(e[t.signature.name]=this.mapFunction(t),e),{}));const d={nodes:o,inputs:i,outputs:p,weights:s,placeholders:n,signature:t,functions:c};return r.length>0&&(d.initNodes=r),d}mapSignatureEntries(e){return Object.keys(e||{}).reduce((t,a)=>(t[e[a].name]=a,t),{})}mapNode(e){const t=Nc(e.op)||this.opMappers[e.op]||{};null==e.attr&&(e.attr={});const a={name:e.name,op:e.op,category:t.category,inputNames:(e.input||[]).map(e=>e.startsWith("^")?e.slice(1):e),inputs:[],children:[],inputParams:{},attrParams:{},rawAttrs:e.attr,outputs:t.outputs};return null!=t.inputs&&(a.inputParams=t.inputs.reduce((e,t)=>(e[t.name]={type:t.type,inputIndexStart:t.start,inputIndexEnd:t.end},e),{})),null!=t.attrs&&(a.attrParams=t.attrs.reduce((t,a)=>{const n=a.type;let s;switch(a.type){case"string":s=Qc(e.attr,a.tfName,a.defaultValue),void 0===s&&a.tfDeprecatedName&&(s=Qc(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"string[]":s=od(e.attr,a.tfName,a.defaultValue),void 0===s&&a.tfDeprecatedName&&(s=od(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"number":s=Zc(e.attr,a.tfName,a.defaultValue||0),void 0===s&&a.tfDeprecatedName&&(s=Zc(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"number[]":s=rd(e.attr,a.tfName,a.defaultValue),void 0===s&&a.tfDeprecatedName&&(s=rd(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"bool":s=Xc(e.attr,a.tfName,a.defaultValue),void 0===s&&a.tfDeprecatedName&&(s=Xc(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"bool[]":s=pd(e.attr,a.tfName,a.defaultValue),void 0===s&&a.tfDeprecatedName&&(s=pd(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"shape":s=sd(e.attr,a.tfName,a.defaultValue),void 0===s&&a.tfDeprecatedName&&(s=sd(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"shape[]":s=id(e.attr,a.tfName,a.defaultValue),void 0===s&&a.tfDeprecatedName&&(s=id(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"dtype":s=td(e.attr,a.tfName,a.defaultValue),void 0===s&&a.tfDeprecatedName&&(s=td(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"dtype[]":s=ad(e.attr,a.tfName,a.defaultValue),void 0===s&&a.tfDeprecatedName&&(s=ad(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"func":s=ed(e.attr,a.tfName,a.defaultValue),void 0===s&&a.tfDeprecatedName&&(s=ed(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"tensor":case"tensors":break;default:throw new Error(`Unsupported param type: ${a.type} for op: ${e.op}`)}return t[a.name]={value:s,type:n},t},{})),a}mapFunction(e){const t=e.nodeDef,a=[];let n={};null!=t&&(n=t.reduce((e,t)=>(e[t.name]=this.mapNode(t),"Const"===t.op&&a.push(e[t.name]),e),{}));const s=[],r=[];e.signature.inputArg.forEach(e=>{const[t]=vc(e.name),a={name:t,op:"Placeholder",inputs:[],inputNames:[],category:"graph",inputParams:{},attrParams:{dtype:{value:Yc(e.type),type:"dtype"}},children:[]};a.signatureKey=e.name,s.push(a),n[t]=a});Object.keys(n).forEach(e=>{const t=n[e];t.inputNames.forEach((e,a)=>{const[s,,r]=vc(e),o=n[s];if(null!=o.outputs){const e=o.outputs.indexOf(r);if(-1!==e){const n=`${s}:${e}`;t.inputNames[a]=n}}t.inputs.push(o),o.children.push(t)})});const o=e.ret;e.signature.outputArg.forEach(e=>{const[t,a]=vc(o[e.name]),s=n[t];null!=s&&(s.defaultOutput=a,r.push(s))});const i=this.mapArgsToSignature(e);return{nodes:n,inputs:s,outputs:r,weights:a,placeholders:[],signature:i}}mapArgsToSignature(e){return{methodName:e.signature.name,inputs:e.signature.inputArg.reduce((e,t)=>(e[t.name]=this.mapArgToTensorInfo(t),e),{}),outputs:e.signature.outputArg.reduce((t,a)=>(t[a.name]=this.mapArgToTensorInfo(a,e.ret),t),{})}}mapArgToTensorInfo(e,t){let a=e.name;return null!=t&&(a=t[a]),{name:a,dtype:e.type}}}function Jc(e,t){const a=Array.isArray(e)?String.fromCharCode.apply(null,e):function(e){const t=Ee().global;if(void 0!==t.atob)return t.atob(e);if("undefined"!=typeof Buffer)return new Buffer(e,"base64").toString();throw new Error("Unable to decode base64 in this environment. Missing built-in atob() or Buffer()")}(e);return t?a:a.toLowerCase()}function Qc(e,t,a,n=!1){const s=e[t];return null!=s?Jc(s.s,n):a}function Xc(e,t,a){const n=e[t];return n?n.b:a}function Zc(e,t,a){const n=e[t]||{},s=null!=n.i?n.i:null!=n.f?n.f:a;return"number"==typeof s?s:parseInt(s,10)}function Yc(e){switch("string"==typeof e&&(e=ln[e]),e){case ln.DT_FLOAT:case ln.DT_HALF:return"float32";case ln.DT_INT32:case ln.DT_INT64:case ln.DT_INT8:case ln.DT_UINT8:return"int32";case ln.DT_BOOL:return"bool";case ln.DT_DOUBLE:return"float32";case ln.DT_STRING:return"string";case ln.DT_COMPLEX64:case ln.DT_COMPLEX128:return"complex64";default:return null}}function ed(e,t,a){const n=e[t];return n&&n.func?n.func.name:a}function td(e,t,a){const n=e[t];return n&&n.type?Yc(n.type):a}function ad(e,t,a){const n=e[t];return n&&n.list&&n.list.type?n.list.type.map(e=>Yc(e)):a}function nd(e){if(!e.unknownRank)return null!=e.dim?e.dim.map(e=>"number"==typeof e.size?e.size:parseInt(e.size,10)):[]}function sd(e,t,a){const n=e[t];return n&&n.shape?nd(n.shape):a}function rd(e,t,a){const n=e[t];return n?((n.list.f&&n.list.f.length?n.list.f:n.list.i)||[]).map(e=>"number"==typeof e?e:parseInt(e,10)):a}function od(e,t,a,n=!1){const s=e[t];return s&&s.list&&s.list.s?s.list.s.map(e=>Jc(e,n)):a}function id(e,t,a){const n=e[t];return n&&n.list&&n.list.shape?n.list.shape.map(e=>nd(e)):a}function pd(e,t,a){const n=e[t];return n&&n.list&&n.list.b?n.list.b:a}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ud{constructor(e,t,a){this.node=e,this.tensorMap=t,this.context=a,this.inputs=[],this.attrs={},this.inputs=e.inputNames.map(e=>this.getInput(e)),null!=e.rawAttrs&&(this.attrs=Object.keys(e.rawAttrs).reduce((e,t)=>(e[t]=this.getAttr(t),e),{}))}getInput(e){return Sc(e,this.tensorMap,this.context)}getAttr(e,t){const a=this.node.rawAttrs[e];if(null!=a.tensor)return Sc(e,this.tensorMap,this.context);if(null!=a.i||null!=a.f)return Zc(this.node.rawAttrs,e,t);if(null!=a.s)return Qc(this.node.rawAttrs,e,t);if(null!=a.b)return Xc(this.node.rawAttrs,e,t);if(null!=a.shape)return sd(this.node.rawAttrs,e,t);if(null!=a.type)return td(this.node.rawAttrs,e,t);if(null!=a.list){if(null!=a.list.i||null!=a.list.f)return rd(this.node.rawAttrs,e,t);if(null!=a.list.s)return od(this.node.rawAttrs,e,t);if(null!=a.list.shape)return id(this.node.rawAttrs,e,t);if(null!=a.list.b)return pd(this.node.rawAttrs,e,t);if(null!=a.list.type)return ad(this.node.rawAttrs,e,t)}return t}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ld=Object.freeze(Object.defineProperty({__proto__:null,OP_SCOPE_SUFFIX:mn,abs:cn,acos:dn,acosh:hn,add:u,addN:Ml,all:fn,any:yn,argMax:gn,argMin:bn,asin:Nn,asinh:wn,atan:xn,atan2:Sn,atanh:Tn,avgPool:vn,avgPool3d:On,basicLSTMCell:Cl,batchNorm:_n,batchNorm2d:En,batchNorm3d:An,batchNorm4d:kn,batchToSpaceND:Mn,bincount:Cn,bitwiseAnd:Il,booleanMaskAsync:bm,broadcastArgs:Dl,broadcastTo:In,buffer:P,cast:Xe,ceil:Dn,clipByValue:zn,clone:un,complex:$n,concat:i,concat1d:Vn,concat2d:Ln,concat3d:Pn,concat4d:Fn,conv1d:Rn,conv2d:jn,conv2dTranspose:Bn,conv3d:qn,conv3dTranspose:Wn,cos:Hn,cosh:Un,cosineWindow:Gn,cumprod:Kn,cumsum:Jn,denseBincount:Qn,depthToSpace:Xn,depthwiseConv2d:pe,diag:zl,dilation2d:Zn,div:ee,divNoNan:Yn,dot:es,dropout:ts,einsum:as,elu:ns,enclosingPowerOfTwo:ss,ensureShape:$l,equal:rs,erf:os,euclideanNorm:is,exp:ps,expandDims:us,expm1:ls,eye:ms,fft:cs,fill:ds,floor:hs,floorDiv:fs,fused:Om,gather:Q,gatherND:Sm,greater:ys,greaterEqual:gs,ifft:bs,imag:Ns,image:ws,inTopKAsync:Tm,irfft:xs,isFinite:Ss,isInf:Ts,isNaN:vs,leakyRelu:Os,less:_s,lessEqual:Es,linalg:As,linspace:Vl,localResponseNormalization:ks,log:Ms,log1p:Cs,logSigmoid:Is,logSoftmax:Ds,logSumExp:zs,logicalAnd:$s,logicalNot:Vs,logicalOr:Ls,logicalXor:Ps,losses:Fs,lowerBound:Fl,matMul:p,max:Rs,maxPool:js,maxPool3d:Bs,maxPoolWithArgmax:Rl,maximum:qs,mean:Ws,meshgrid:jl,min:Hs,minimum:Us,mirrorPad:Gs,mod:Ks,moments:Js,movingAverage:Nm,mul:m,multiRNNCell:Bl,multinomial:ql,neg:Qs,norm:Xs,notEqual:Zs,oneHot:Qe,ones:v,onesLike:Ys,op:t,outerProduct:Wl,pad:E,pad1d:Hl,pad2d:Ul,pad3d:Gl,pad4d:Kl,pool:er,pow:te,prelu:tr,print:ar,prod:nr,raggedGather:Jl,raggedRange:Ql,raggedTensorToTensor:Xl,rand:Zl,randomGamma:nm,randomNormal:F,randomStandardNormal:sm,randomUniform:R,randomUniformInt:rm,range:sr,real:rr,reciprocal:or,relu:ir,relu6:pr,reshape:N,reverse:j,reverse1d:om,reverse2d:im,reverse3d:pm,reverse4d:um,rfft:ur,round:lr,rsqrt:mr,scalar:Z,scatterND:wm,searchSorted:Pl,selu:cr,separableConv2d:dr,setdiff1dAsync:lm,sigmoid:c,sign:hr,signal:fr,sin:yr,sinh:gr,slice:l,slice1d:br,slice2d:Nr,slice3d:wr,slice4d:xr,softmax:Sr,softplus:Tr,spaceToBatchND:vr,sparse:Or,sparseToDense:xm,spectral:_r,split:Er,sqrt:Ar,square:kr,squaredDifference:Mr,squeeze:J,stack:Cr,step:Ir,stridedSlice:Dr,string:zr,sub:Y,sum:$r,tan:Vr,tanh:d,tensor:oe,tensor1d:Lr,tensor2d:Pr,tensor3d:mm,tensor4d:cm,tensor5d:dm,tensor6d:hm,tensorScatterUpdate:fm,tile:Fr,topk:Rr,transpose:Ze,truncatedNormal:jr,unique:Br,unsortedSegmentSum:qr,unstack:Wr,upperBound:ym,variable:Hr,where:Ur,whereAsync:gm,zeros:Gr,zerosLike:Kr},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function md(e,t,n=""){if("number"!=typeof e&&"number"!=typeof t){a(e.length===t.length,()=>n+` Shapes ${e} and ${t} must match`);for(let s=0;s<e.length;s++){const r=e[s],o=t[s];a(r<0||o<0||r===o,()=>n+` Shapes ${e} and ${t} must match`)}}}function cd(e){return"number"!=typeof e&&!e.some(e=>e<0)}function dd(e,t,a){let n=hd(e,a);const s=!cd(n);if(s&&0===t.length)throw new Error(`Tried to calculate elements of an empty list with non-fully-defined elementShape: ${n}`);if(s&&t.forEach(e=>{n=hd(e.shape,n)}),!cd(n))throw new Error(`Non-fully-defined elementShape: ${n}`);return n}function hd(e,t){if("number"==typeof e)return t;if("number"==typeof t)return e;if(e.length!==t.length)throw new Error(`Incompatible ranks during merge: ${e} vs. ${t}`);const a=[];for(let n=0;n<e.length;++n){const s=e[n],r=t[n];if(s>=0&&r>=0&&s!==r)throw new Error(`Incompatible shape during merge: ${e} vs. ${t}`);a[n]=s>=0?s:r}return a}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class fd{constructor(e,t,a,n,s,r,o){this.name=e,this.dtype=t,this.maxSize=a,this.elementShape=n,this.identicalElementShapes=s,this.dynamicSize=r,this.clearAfterRead=o,this.tensors=[],this.closed_=!1,this.idTensor=Z(0),Jr(this.idTensor)}get id(){return this.idTensor.id}get closed(){return this.closed_}clearAndClose(e){this.tensors.forEach(t=>{null!=e&&e.has(t.tensor.id)||t.tensor.dispose()}),this.tensors=[],this.closed_=!0,this.idTensor.dispose()}size(){return this.tensors.length}read(e){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(e<0||e>=this.size())throw new Error(`Tried to read from index ${e}, but array size is: ${this.size()}`);const t=this.tensors[e];if(t.cleared)throw new Error(`TensorArray ${this.name}: Could not read index ${e} twice because it was cleared after a previous read (perhaps try setting clear_after_read = false?).`);return this.clearAfterRead&&(t.cleared=!0),t.read=!0,t.tensor}readMany(e){return e.map(e=>this.read(e))}write(e,t){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(e<0||!this.dynamicSize&&e>=this.maxSize)throw new Error(`Tried to write to index ${e}, but array is not resizeable and size is: ${this.maxSize}`);const a=this.tensors[e]||{};if(t.dtype!==this.dtype)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e},\n          because the value dtype is ${t.dtype}, but TensorArray dtype is ${this.dtype}.`);if(0!==this.size()||null!=this.elementShape&&0!==this.elementShape.length||(this.elementShape=t.shape),md(this.elementShape,t.shape,`TensorArray ${this.name}: Could not write to TensorArray index ${e}.`),a.read)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e}, because it has already been read.`);if(a.written)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e}, because it has already been written.`);a.tensor=t,Jr(t),a.written=!0,this.tensors[e]=a}writeMany(e,t){if(e.length!==t.length)throw new Error(`TensorArray ${this.name}: could not write multiple tensors,because the index size: ${e.length} is not the same as tensors size: ${t.length}.`);e.forEach((e,a)=>this.write(e,t[a]))}gather(e,t){if(t&&t!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but gather requested dtype ${t}`);if(e)e=e.slice(0,this.size());else{e=[];for(let t=0;t<this.size();t++)e.push(t)}if(0===e.length)return oe([],[0].concat(this.elementShape));const a=this.readMany(e);return md(this.elementShape,a[0].shape,"TensorArray shape mismatch: "),Cr(a,0)}concat(e){if(e&&e!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but concat requested dtype ${e}`);if(0===this.size())return oe([],[0].concat(this.elementShape));const t=[];for(let n=0;n<this.size();n++)t.push(n);const a=this.readMany(t);return md(this.elementShape,a[0].shape,`TensorArray shape mismatch: tensor array shape (${this.elementShape}) vs first tensor shape (${a[0].shape})`),i(a,0)}scatter(e,t){if(t.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${t.dtype}`);if(e.length!==t.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${e.length} vs. ${t.shape[0]}`);const a=Math.max(...e);if(!this.dynamicSize&&a>=this.maxSize)throw new Error(`Max index must be < array size (${a}  vs. ${this.maxSize})`);this.writeMany(e,Wr(t,0))}split(e,t){if(t.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${t.dtype}`);let a=0;const n=e.map(e=>(a+=e,a));if(a!==t.shape[0])throw new Error(`Expected sum of lengths to be equal to\n          tensor.shape[0], but sum of lengths is\n        ${a}, and tensor's shape is: ${t.shape}`);if(!this.dynamicSize&&e.length!==this.maxSize)throw new Error(`TensorArray's size is not equal to the size of lengths (${this.maxSize} vs. ${e.length}), and the TensorArray is not marked as dynamically resizeable`);const s=0===a?0:t.size/a,r=[];Qr(()=>{t=N(t,[1,a,s]);for(let a=0;a<e.length;++a){const o=[0,0===a?0:n[a-1],0],i=[1,e[a],s];r[a]=N(l(t,o,i),this.elementShape)}return r});const o=[];for(let i=0;i<e.length;i++)o[i]=i;this.writeMany(o,r)}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class yd{get id(){return this.idTensor.id}constructor(e,t,a,n=-1){this.tensors=e,this.elementShape=t,this.elementDtype=a,null!=e&&e.forEach(e=>{if(a!==e.dtype)throw new Error(`Invalid data types; op elements ${a}, but list elements ${e.dtype}`);md(t,e.shape,"TensorList shape mismatch: "),Jr(e)}),this.idTensor=Z(0),this.maxNumElements=n,Jr(this.idTensor)}copy(){return new yd([...this.tensors],this.elementShape,this.elementDtype)}clearAndClose(e){this.tensors.forEach(t=>{null!=e&&e.has(t.id)||t.dispose()}),this.tensors.length=0,this.idTensor.dispose()}size(){return this.tensors.length}stack(e,t,a=-1){if(t!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);if(-1!==a&&this.tensors.length!==a)throw new Error(`Operation expected a list with ${a} elements but got a list with ${this.tensors.length} elements.`);md(e,this.elementShape,"TensorList shape mismatch: ");const n=dd(this.elementShape,this.tensors,e);return Qr(()=>{const e=this.tensors.map(e=>N(e,n));return Cr(e,0)})}popBack(e,t){if(t!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);if(0===this.size())throw new Error("Trying to pop from an empty list.");const a=dd(this.elementShape,this.tensors,e),n=this.tensors.pop();return n.kept=!1,md(n.shape,e,"TensorList shape mismatch: "),N(n,a)}pushBack(e){if(e.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${e.dtype}, but list elements ${this.elementDtype}`);if(md(e.shape,this.elementShape,"TensorList shape mismatch: "),this.maxNumElements===this.size())throw new Error("Trying to push element into a full list.");Jr(e),this.tensors.push(e)}resize(e){if(e<0)throw new Error(`TensorListResize expects size to be non-negative. Got: ${e}`);if(-1!==this.maxNumElements&&e>this.maxNumElements)throw new Error(`TensorListResize input size ${e} is greater maxNumElement ${this.maxNumElements}.`);const t=new yd([],this.elementShape,this.elementDtype,this.maxNumElements);t.tensors.length=e;for(let a=0;a<Math.min(this.tensors.length,e);++a)t.tensors[a]=this.tensors[a];return t}getItem(e,t,a){if(a!==this.elementDtype)throw new Error(`Invalid data types; op elements ${a}, but list elements ${this.elementDtype}`);if(e<0||e>this.tensors.length)throw new Error(`Trying to access element ${e} in a list with ${this.tensors.length} elements.`);if(null==this.tensors[e])throw new Error(`element at index ${e} is null.`);md(this.tensors[e].shape,t,"TensorList shape mismatch: ");const n=dd(this.elementShape,this.tensors,t);return N(this.tensors[e],n)}setItem(e,t){if(t.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t.dtype}, but list elements ${this.elementDtype}`);if(e<0||-1!==this.maxNumElements&&e>=this.maxNumElements)throw new Error(`Trying to set element ${e} in a list with max ${this.maxNumElements} elements.`);md(this.elementShape,t.shape,"TensorList shape mismatch: "),Jr(t),null!=this.tensors[e]&&(this.tensors[e].kept=!1),this.tensors[e]=t}gather(e,t,a){if(t!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);md(this.elementShape,a,"TensorList shape mismatch: "),e=e.slice(0,this.size());const n=dd(this.elementShape,this.tensors,a);return 0===e.length?oe([],[0].concat(n)):Qr(()=>{const t=e.map(e=>N(this.tensors[e],n));return Cr(t,0)})}concat(e,t){if(e&&e!==this.elementDtype)throw new Error(`TensorList dtype is ${this.elementDtype} but concat requested dtype ${e}`);md(this.elementShape,t,"TensorList shape mismatch: ");const a=dd(this.elementShape,this.tensors,t);return 0===this.size()?oe([],[0].concat(a)):Qr(()=>{const e=this.tensors.map(e=>N(e,a));return i(e,0)})}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const gd=(t,a,n)=>e(void 0,null,function*(){switch(t.op){case"If":case"StatelessIf":{const e=xc("thenBranch",t,a,n),s=xc("elseBranch",t,a,n),r=xc("cond",t,a,n),o=xc("args",t,a,n);return(yield r.data())[0]?n.functionMap[e].executeFunctionAsync(o,n.tensorArrayMap,n.tensorListMap):n.functionMap[s].executeFunctionAsync(o,n.tensorArrayMap,n.tensorListMap)}case"While":case"StatelessWhile":{const e=xc("body",t,a,n),s=xc("cond",t,a,n),r=xc("args",t,a,n),o=yield n.functionMap[s].executeFunctionAsync(r,n.tensorArrayMap,n.tensorListMap),i=r.map(e=>e.id);let p=yield o[0].data();o.forEach(e=>{e.kept||-1!==i.indexOf(e.id)||e.dispose()});let u=r;for(;p[0];){const t=u;u=yield n.functionMap[e].executeFunctionAsync(u,n.tensorArrayMap,n.tensorListMap);const a=u.map(e=>e.id);t.forEach(e=>{e.kept||-1!==i.indexOf(e.id)||-1!==a.indexOf(e.id)||e.dispose()});const r=yield n.functionMap[s].executeFunctionAsync(u,n.tensorArrayMap,n.tensorListMap);p=yield r[0].data(),r.forEach(e=>{e.kept||-1!==i.indexOf(e.id)||-1!==a.indexOf(e.id)||e.dispose()})}return u}case"LoopCond":return[Ac(xc("pred",t,a,n))];case"Switch":{const e=xc("pred",t,a,n);let s=xc("data",t,a,n);return s.kept||(s=Ac(s)),(yield e.data())[0]?[void 0,s]:[s,void 0]}case"Merge":{const e=t.inputNames.find(e=>void 0!==Sc(e,a,n));if(e){return[Ac(Sc(e,a,n))]}return}case"Enter":{const e=xc("frameName",t,a,n),s=xc("tensor",t,a,n);return n.enterFrame(e),[Ac(s)]}case"Exit":{const e=xc("tensor",t,a,n);return n.exitFrame(),[Ac(e)]}case"NextIteration":{const e=xc("tensor",t,a,n);return n.nextIteration(),[Ac(e)]}case"TensorArrayV3":{const e=xc("size",t,a,n),s=xc("dtype",t,a,n),r=xc("elementShape",t,a,n),o=xc("dynamicSize",t,a,n),i=xc("clearAfterRead",t,a,n),p=xc("identicalElementShapes",t,a,n),u=xc("name",t,a,n),l=new fd(u,s,e,r,p,o,i);return n.addTensorArray(l),[l.idTensor,Z(1)]}case"TensorArrayWriteV3":{const e=xc("tensorArrayId",t,a,n),s=xc("index",t,a,n),r=xc("tensor",t,a,n),o=n.getTensorArray(e.id);return o.write(s,r),[o.idTensor]}case"TensorArrayReadV3":{const e=xc("tensorArrayId",t,a,n),s=xc("index",t,a,n);return[n.getTensorArray(e.id).read(s)]}case"TensorArrayGatherV3":{const e=xc("tensorArrayId",t,a,n),s=xc("indices",t,a,n),r=xc("dtype",t,a,n);return[n.getTensorArray(e.id).gather(s,r)]}case"TensorArrayScatterV3":{const e=xc("tensorArrayId",t,a,n),s=xc("indices",t,a,n),r=xc("tensor",t,a,n),o=n.getTensorArray(e.id);return o.scatter(s,r),[o.idTensor]}case"TensorArrayConcatV3":{const e=xc("tensorArrayId",t,a,n),s=n.getTensorArray(e.id),r=xc("dtype",t,a,n);return[s.concat(r)]}case"TensorArraySplitV3":{const e=xc("tensorArrayId",t,a,n),s=xc("tensor",t,a,n),r=xc("lengths",t,a,n),o=n.getTensorArray(e.id);return o.split(r,s),[o.idTensor]}case"TensorArraySizeV3":{const e=xc("tensorArrayId",t,a,n),s=n.getTensorArray(e.id);return[Z(s.size(),"int32")]}case"TensorArrayCloseV3":{const e=xc("tensorArrayId",t,a,n),s=n.getTensorArray(e.id);return s.clearAndClose(),[s.idTensor]}case"TensorListSetItem":{const e=xc("tensorListId",t,a,n),s=xc("index",t,a,n),r=xc("tensor",t,a,n),o=n.getTensorList(e.id);return o.setItem(s,r),[o.idTensor]}case"TensorListGetItem":{const e=xc("tensorListId",t,a,n),s=xc("index",t,a,n),r=xc("elementShape",t,a,n),o=xc("elementDType",t,a,n);return[n.getTensorList(e.id).getItem(s,r,o)]}case"TensorListScatterV2":case"TensorListScatter":{const e=xc("indices",t,a,n),s=function(e,t,a,n){if(t.length!==e.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${t.length} vs. ${e.shape[0]}`);const s=Math.max(...t);if(null!=n&&-1!==n&&s>=n)throw new Error(`Max index must be < array size (${s}  vs. ${n})`);const r=new yd([],a,e.dtype,n),o=Wr(e,0);return t.forEach((e,t)=>{r.setItem(e,o[t])}),r}(xc("tensor",t,a,n),e,xc("elementShape",t,a,n),xc("numElements",t,a,n));return n.addTensorList(s),[s.idTensor]}case"TensorListReserve":case"EmptyTensorList":{const e=xc("elementShape",t,a,n),s=xc("elementDType",t,a,n);let r;r="TensorListReserve"===t.op?"numElements":"maxNumElements";const o=xc(r,t,a,n),i=function(e,t,a,n){return new yd([],e,t,n)}(e,s,0,"TensorListReserve"===t.op?-1:o);return n.addTensorList(i),[i.idTensor]}case"TensorListGather":{const e=xc("tensorListId",t,a,n),s=xc("indices",t,a,n),r=xc("elementShape",t,a,n),o=xc("elementDType",t,a,n);return[n.getTensorList(e.id).gather(s,o,r)]}case"TensorListStack":{const e=xc("tensorListId",t,a,n),s=xc("elementShape",t,a,n),r=xc("elementDType",t,a,n),o=xc("numElements",t,a,n);return[n.getTensorList(e.id).stack(s,r,o)]}case"TensorListFromTensor":{const e=function(e,t,a){const n=e.dtype;if(e.shape.length<1)throw new Error(`Tensor must be at least a vector, but saw shape: ${e.shape}`);if(e.dtype!==a)throw new Error(`Invalid data types; op elements ${e.dtype}, but list elements ${a}`);md(e.shape.slice(1),t,"TensorList shape mismatch: ");const s=Wr(e);return new yd(s,t,n)}(xc("tensor",t,a,n),xc("elementShape",t,a,n),xc("elementDType",t,a,n));return n.addTensorList(e),[e.idTensor]}case"TensorListConcat":case"TensorListConcatV2":{const e=xc("tensorListId",t,a,n),s=n.getTensorList(e.id),r=xc("dtype",t,a,n),o=xc("elementShape",t,a,n);return[s.concat(r,o)]}case"TensorListPushBack":{const e=xc("tensorListId",t,a,n),s=xc("tensor",t,a,n),r=n.getTensorList(e.id);return r.pushBack(s),[r.idTensor]}case"TensorListPopBack":{const e=xc("tensorListId",t,a,n),s=xc("elementShape",t,a,n),r=xc("elementDType",t,a,n);return[n.getTensorList(e.id).popBack(s,r)]}case"TensorListSplit":{const e=xc("tensor",t,a,n),s=xc("elementShape",t,a,n),r=function(e,t,a){let n=0;const s=t.map(e=>(n+=e,n));if(n!==e.shape[0])throw new Error(`Expected sum of lengths to be equal to\n          tensor.shape[0], but sum of lengths is\n        ${n}, and tensor's shape is: ${e.shape}`);const r=hd(e.shape.slice(1),a),o=0===n?0:e.size/n,i=Qr(()=>{const a=[];e=N(e,[1,n,o]);for(let n=0;n<t.length;++n){const i=[0,0===n?0:s[n-1],0],p=[1,t[n],o];a[n]=N(l(e,i,p),r)}return e.dispose(),a}),p=new yd([],a,e.dtype,t.length);for(let u=0;u<i.length;u++)p.setItem(u,i[u]);return p}(e,xc("lengths",t,a,n),s);return n.addTensorList(r),[r.idTensor]}case"TensorListLength":{const e=xc("tensorListId",t,a,n),s=n.getTensorList(e.id);return[Z(s.size(),"int32")]}case"TensorListResize":{const e=xc("tensorListId",t,a,n),s=xc("size",t,a,n),r=n.getTensorList(e.id).resize(s);return n.addTensorList(r),[r.idTensor]}default:throw TypeError(`Node type ${t.op} is not implemented`)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bd(e,t,a){const[n,s]=xc("fusedOps",e,t,a),r="biasadd"===n,o=!r,i="prelu"===s,p="fusedbatchnorm"===n,u=xc("numArgs",e,t,a);if(r){if(i&&2!==u)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!i&&r&&1!==u)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd must have one extra argument: bias.")}if(p)throw new Error("FusedConv2d and DepthwiseConv2d with FusedBatchNorm is not supported");const l=xc("strides",e,t,a),m=Ec(e,t,a),c=xc("dataFormat",e,t,a).toUpperCase(),d=xc("dilations",e,t,a);let[h,f]=xc("args",e,t,a);o&&(f=h,h=void 0);return{stride:l,pad:m,dataFormat:c,dilations:d,biasArg:h,preluArg:f,activationFunc:s,leakyreluAlpha:xc("leakyreluAlpha",e,t,a)}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function Nd(e,t,a){return{boxes:xc("boxes",e,t,a),scores:xc("scores",e,t,a),maxOutputSize:xc("maxOutputSize",e,t,a),iouThreshold:xc("iouThreshold",e,t,a),scoreThreshold:xc("scoreThreshold",e,t,a),softNmsSigma:xc("softNmsSigma",e,t,a)}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class wd{get id(){return this.handle.id}constructor(e,t){this.keyDType=e,this.valueDType=t,this.handle=Z(0),this.tensorMap=new Map,Jr(this.handle)}clearAndClose(){this.tensorMap.forEach(e=>e.dispose()),this.tensorMap.clear(),this.handle.dispose()}size(){return this.tensorMap.size}tensorSize(){return Z(this.size(),"int32")}import(t,n){return e(this,null,function*(){this.checkKeyAndValueTensor(t,n);const e=yield t.data();return this.tensorMap.forEach(e=>e.dispose()),this.tensorMap.clear(),Qr(()=>{const t=Wr(n),s=e.length,r=t.length;a(s===r,()=>`The number of elements doesn't match, keys has ${s} elements, the values has ${r} elements.`);for(let a=0;a<s;a++){const n=e[a],s=t[a];Jr(s),this.tensorMap.set(n,s)}return this.handle})})}find(t,a){return e(this,null,function*(){this.checkKeyAndValueTensor(t,a);const e=yield t.data();return Qr(()=>{const t=[];for(let n=0;n<e.length;n++){const s=e[n],r=this.findWithDefault(s,a);t.push(r)}return Cr(t)})})}findWithDefault(e,t){const a=this.tensorMap.get(e);return null!=a?a:t}checkKeyAndValueTensor(e,t){if(e.dtype!==this.keyDType)throw new Error(`Expect key dtype ${this.keyDType}, but got ${e.dtype}`);if(t.dtype!==this.valueDType)throw new Error(`Expect value dtype ${this.valueDType}, but got ${t.dtype}`)}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function xd(t,a,n,r,o=Qr){const i=((t,a,n)=>{switch(t.category){case"arithmetic":return o(()=>((e,t,a,n=ld)=>{switch(e.op){case"BiasAdd":case"AddV2":case"Add":return[n.add(xc("a",e,t,a),xc("b",e,t,a))];case"AddN":return[n.addN(xc("tensors",e,t,a))];case"FloorMod":case"Mod":return[n.mod(xc("a",e,t,a),xc("b",e,t,a))];case"Mul":return[n.mul(xc("a",e,t,a),xc("b",e,t,a))];case"RealDiv":case"Div":return[n.div(xc("a",e,t,a),xc("b",e,t,a))];case"DivNoNan":return[n.divNoNan(xc("a",e,t,a),xc("b",e,t,a))];case"FloorDiv":return[n.floorDiv(xc("a",e,t,a),xc("b",e,t,a))];case"Sub":return[n.sub(xc("a",e,t,a),xc("b",e,t,a))];case"Minimum":return[n.minimum(xc("a",e,t,a),xc("b",e,t,a))];case"Maximum":return[n.maximum(xc("a",e,t,a),xc("b",e,t,a))];case"Pow":return[n.pow(xc("a",e,t,a),xc("b",e,t,a))];case"SquaredDifference":return[n.squaredDifference(xc("a",e,t,a),xc("b",e,t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(t,a,n));case"basic_math":return o(()=>((e,t,a,n=ld)=>{switch(e.op){case"Abs":case"ComplexAbs":return[n.abs(xc("x",e,t,a))];case"Acos":return[n.acos(xc("x",e,t,a))];case"Acosh":return[n.acosh(xc("x",e,t,a))];case"Asin":return[n.asin(xc("x",e,t,a))];case"Asinh":return[n.asinh(xc("x",e,t,a))];case"Atan":return[n.atan(xc("x",e,t,a))];case"Atan2":return[n.atan2(xc("x",e,t,a),xc("y",e,t,a))];case"Atanh":return[n.atanh(xc("x",e,t,a))];case"Ceil":return[n.ceil(xc("x",e,t,a))];case"Complex":return[n.complex(xc("real",e,t,a),xc("imag",e,t,a))];case"Cos":return[n.cos(xc("x",e,t,a))];case"Cosh":return[n.cosh(xc("x",e,t,a))];case"Elu":return[n.elu(xc("x",e,t,a))];case"Erf":return[n.erf(xc("x",e,t,a))];case"Exp":return[n.exp(xc("x",e,t,a))];case"Expm1":return[n.expm1(xc("x",e,t,a))];case"Floor":return[n.floor(xc("x",e,t,a))];case"Log":return[n.log(xc("x",e,t,a))];case"Log1p":return[n.log1p(xc("x",e,t,a))];case"Imag":return[n.imag(xc("x",e,t,a))];case"Neg":return[n.neg(xc("x",e,t,a))];case"Reciprocal":return[n.reciprocal(xc("x",e,t,a))];case"Real":return[n.real(xc("x",e,t,a))];case"Relu":return[n.relu(xc("x",e,t,a))];case"Round":return[n.round(xc("x",e,t,a))];case"Selu":return[n.selu(xc("x",e,t,a))];case"Sigmoid":return[n.sigmoid(xc("x",e,t,a))];case"Sin":return[n.sin(xc("x",e,t,a))];case"Sign":return[n.sign(xc("x",e,t,a))];case"Sinh":return[n.sinh(xc("x",e,t,a))];case"Softplus":return[n.softplus(xc("x",e,t,a))];case"Sqrt":return[n.sqrt(xc("x",e,t,a))];case"Square":return[n.square(xc("x",e,t,a))];case"Tanh":return[n.tanh(xc("x",e,t,a))];case"Tan":return[n.tan(xc("x",e,t,a))];case"ClipByValue":return[n.clipByValue(xc("x",e,t,a),xc("clipValueMin",e,t,a),xc("clipValueMax",e,t,a))];case"Relu6":return[n.relu6(xc("x",e,t,a))];case"Rsqrt":return[n.rsqrt(Sc(e.inputNames[0],t,a))];case"LeakyRelu":return[n.leakyRelu(xc("x",e,t,a),xc("alpha",e,t,a))];case"Prelu":return[n.prelu(xc("x",e,t,a),xc("alpha",e,t,a))];case"IsNan":return[n.isNaN(Sc(e.inputNames[0],t,a))];case"IsInf":return[n.isInf(Sc(e.inputNames[0],t,a))];case"IsFinite":return[n.isFinite(Sc(e.inputNames[0],t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(t,a,n));case"control":return gd(t,a,n);case"convolution":return o(()=>((e,t,a,n=ld)=>{switch(e.op){case"Conv1D":{const s=xc("stride",e,t,a),r=xc("pad",e,t,a),o=xc("dataFormat",e,t,a).toUpperCase(),i=xc("dilation",e,t,a);return[n.conv1d(xc("x",e,t,a),xc("filter",e,t,a),s,r,o,i)]}case"Conv2D":{const s=xc("strides",e,t,a),r=Ec(e,t,a),o=xc("dataFormat",e,t,a).toUpperCase(),i=xc("dilations",e,t,a);return[n.conv2d(xc("x",e,t,a),xc("filter",e,t,a),[s[1],s[2]],r,o,[i[1],i[2]])]}case"_FusedConv2D":{const{stride:s,pad:r,dataFormat:o,dilations:i,biasArg:p,preluArg:u,activationFunc:l,leakyreluAlpha:m}=bd(e,t,a);return[n.fused.conv2d({x:xc("x",e,t,a),filter:xc("filter",e,t,a),strides:[s[1],s[2]],pad:r,dataFormat:o,dilations:[i[1],i[2]],bias:p,activation:l,preluActivationWeights:u,leakyreluAlpha:m})]}case"FusedDepthwiseConv2dNative":{const{stride:s,pad:r,dataFormat:o,dilations:i,biasArg:p,preluArg:u,activationFunc:l,leakyreluAlpha:m}=bd(e,t,a);return[n.fused.depthwiseConv2d({x:xc("x",e,t,a),filter:xc("filter",e,t,a),strides:[s[1],s[2]],pad:r,dataFormat:o,dilations:[i[1],i[2]],bias:p,activation:l,preluActivationWeights:u,leakyreluAlpha:m})]}case"Conv2DBackpropInput":case"Conv2dTranspose":{const s=xc("outputShape",e,t,a),r=xc("strides",e,t,a),o=Ec(e,t,a);return[n.conv2dTranspose(xc("x",e,t,a),xc("filter",e,t,a),s,[r[1],r[2]],o)]}case"DepthwiseConv2dNative":case"DepthwiseConv2d":{const s=xc("strides",e,t,a),r=Ec(e,t,a),o=xc("dilations",e,t,a),i=xc("dataFormat",e,t,a).toUpperCase();return[n.depthwiseConv2d(xc("input",e,t,a),xc("filter",e,t,a),[s[1],s[2]],r,i,[o[1],o[2]])]}case"Conv3D":{const s=xc("strides",e,t,a),r=xc("pad",e,t,a),o=xc("dataFormat",e,t,a).toUpperCase(),i=xc("dilations",e,t,a);return[n.conv3d(xc("x",e,t,a),xc("filter",e,t,a),[s[1],s[2],s[3]],r,o,[i[1],i[2],i[3]])]}case"AvgPool":{const s=xc("strides",e,t,a),r=xc("pad",e,t,a),o=xc("kernelSize",e,t,a);return[n.avgPool(xc("x",e,t,a),[o[1],o[2]],[s[1],s[2]],r)]}case"MaxPool":{const s=xc("strides",e,t,a),r=xc("pad",e,t,a),o=xc("kernelSize",e,t,a);return[n.maxPool(xc("x",e,t,a),[o[1],o[2]],[s[1],s[2]],r)]}case"MaxPoolWithArgmax":{const s=xc("strides",e,t,a),r=xc("pad",e,t,a),o=xc("kernelSize",e,t,a),i=xc("includeBatchInIndex",e,t,a),{result:p,indexes:u}=n.maxPoolWithArgmax(xc("x",e,t,a),[o[1],o[2]],[s[1],s[2]],r,i);return[p,u]}case"AvgPool3D":{const s=xc("strides",e,t,a),r=xc("pad",e,t,a),o=xc("kernelSize",e,t,a);return[n.avgPool3d(xc("x",e,t,a),[o[1],o[2],o[3]],[s[1],s[2],s[3]],r)]}case"MaxPool3D":{const s=xc("strides",e,t,a),r=xc("pad",e,t,a),o=xc("kernelSize",e,t,a);return[n.maxPool3d(xc("x",e,t,a),[o[1],o[2],o[3]],[s[1],s[2],s[3]],r)]}case"Dilation2D":{const s=xc("strides",e,t,a),r=xc("pad",e,t,a),o=xc("dilations",e,t,a),i=s[1],p=s[2],u=o[1],l=o[2];return[n.dilation2d(xc("x",e,t,a),xc("filter",e,t,a),[i,p],r,[u,l],"NHWC")]}default:throw TypeError(`Node type ${e.op} is not implemented`)}})(t,a,n));case"creation":return o(()=>((e,t,a,n=ld)=>{switch(e.op){case"Fill":{const s=xc("shape",e,t,a),r=xc("dtype",e,t,a),o=xc("value",e,t,a);return[n.fill(s,o,r)]}case"LinSpace":{const s=xc("start",e,t,a),r=xc("stop",e,t,a),o=xc("num",e,t,a);return[n.linspace(s,r,o)]}case"Multinomial":{const s=xc("logits",e,t,a),r=xc("numSamples",e,t,a),o=xc("seed",e,t,a);return[n.multinomial(s,r,o)]}case"OneHot":{const s=xc("indices",e,t,a),r=xc("depth",e,t,a),o=xc("onValue",e,t,a),i=xc("offValue",e,t,a),p=xc("dtype",e,t,a);return[n.oneHot(s,r,o,i,p)]}case"Ones":return[n.ones(xc("shape",e,t,a),xc("dtype",e,t,a))];case"OnesLike":return[n.onesLike(xc("x",e,t,a))];case"RandomStandardNormal":return[n.randomStandardNormal(xc("shape",e,t,a),xc("dtype",e,t,a),xc("seed",e,t,a))];case"RandomUniform":return[n.randomUniform(xc("shape",e,t,a),xc("minval",e,t,a),xc("maxval",e,t,a),xc("dtype",e,t,a))];case"RandomUniformInt":return[n.randomUniformInt(xc("shape",e,t,a),xc("minval",e,t,a),xc("maxval",e,t,a),xc("seed",e,t,a))];case"Range":{const s=xc("start",e,t,a),r=xc("stop",e,t,a),o=xc("step",e,t,a);return[n.range(s,r,o,xc("dtype",e,t,a))]}case"TruncatedNormal":{const s=xc("shape",e,t,a),r=xc("mean",e,t,a),o=xc("stdDev",e,t,a),i=xc("seed",e,t,a);return[n.truncatedNormal(s,r,o,xc("dtype",e,t,a),i)]}case"Zeros":return[n.zeros(xc("shape",e,t,a),xc("dtype",e,t,a))];case"ZerosLike":return[n.zerosLike(xc("x",e,t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(t,a,n));case"dynamic":return((t,a,n,s,...r)=>e(void 0,[t,a,n,s,...r],function*(e,t,a,n,s=ld){switch(e.op){case"NonMaxSuppressionV5":{const{boxes:n,scores:r,maxOutputSize:o,iouThreshold:i,scoreThreshold:p,softNmsSigma:u}=Nd(e,t,a),l=yield s.image.nonMaxSuppressionWithScoreAsync(n,r,o,i,p,u);return[l.selectedIndices,l.selectedScores]}case"NonMaxSuppressionV4":{const{boxes:n,scores:r,maxOutputSize:o,iouThreshold:i,scoreThreshold:p}=Nd(e,t,a),u=xc("padToMaxOutputSize",e,t,a),l=yield s.image.nonMaxSuppressionPaddedAsync(n,r,o,i,p,u);return[l.selectedIndices,l.validOutputs]}case"NonMaxSuppressionV3":case"NonMaxSuppressionV2":{const{boxes:n,scores:r,maxOutputSize:o,iouThreshold:i,scoreThreshold:p}=Nd(e,t,a);return[yield s.image.nonMaxSuppressionAsync(n,r,o,i,p)]}case"Where":{const n=s.cast(xc("condition",e,t,a),"bool"),r=[yield s.whereAsync(n)];return n.dispose(),r}case"ListDiff":return s.setdiff1dAsync(xc("x",e,t,a),xc("y",e,t,a));default:throw TypeError(`Node type ${e.op} is not implemented`)}}))(t,a,n);case"evaluation":return o(()=>((e,t,a,n=ld)=>{switch(e.op){case"LowerBound":{const s=xc("sortedSequence",e,t,a),r=xc("values",e,t,a);return[n.lowerBound(s,r)]}case"TopKV2":{const s=xc("x",e,t,a),r=xc("k",e,t,a),o=xc("sorted",e,t,a),i=n.topk(s,r,o);return[i.values,i.indices]}case"UpperBound":{const s=xc("sortedSequence",e,t,a),r=xc("values",e,t,a);return[n.upperBound(s,r)]}case"Unique":{const s=xc("x",e,t,a),r=n.unique(s);return[r.values,r.indices]}case"UniqueV2":{const s=xc("x",e,t,a),r=xc("axis",e,t,a),o=n.unique(s,r);return[o.values,o.indices]}default:throw TypeError(`Node type ${e.op} is not implemented`)}})(t,a,n));case"image":return o(()=>((e,t,a,n=ld)=>{switch(e.op){case"ResizeBilinear":{const s=xc("images",e,t,a),r=xc("size",e,t,a),o=xc("alignCorners",e,t,a),i=xc("halfPixelCenters",e,t,a);return[n.image.resizeBilinear(s,[r[0],r[1]],o,i)]}case"ResizeNearestNeighbor":{const s=xc("images",e,t,a),r=xc("size",e,t,a),o=xc("alignCorners",e,t,a),i=xc("halfPixelCenters",e,t,a);return[n.image.resizeNearestNeighbor(s,[r[0],r[1]],o,i)]}case"CropAndResize":{const s=xc("image",e,t,a),r=xc("boxes",e,t,a),o=xc("boxInd",e,t,a),i=xc("cropSize",e,t,a),p=xc("method",e,t,a),u=xc("extrapolationValue",e,t,a);return[n.image.cropAndResize(s,r,o,i,p,u)]}case"ImageProjectiveTransformV3":{const s=xc("images",e,t,a),r=xc("transforms",e,t,a),o=xc("outputShape",e,t,a),i=xc("fillValue",e,t,a),p=xc("interpolation",e,t,a),u=xc("fillMode",e,t,a);return[n.image.transform(s,r,p.toLowerCase(),u.toLowerCase(),i,o)]}default:throw TypeError(`Node type ${e.op} is not implemented`)}})(t,a,n));case"graph":return o(()=>((e,t,a,n=ld)=>{switch(e.op){case"Const":return t[e.name];case"PlaceholderWithDefault":const s=xc("default",e,t,a);return[Sc(e.name,t,a)||s];case"Placeholder":return[Sc(e.name,t,a)];case"Identity":case"StopGradient":case"FakeQuantWithMinMaxVars":case"Snapshot":return[Ac(xc("x",e,t,a))];case"IdentityN":return xc("x",e,t,a).map(e=>Ac(e));case"Shape":return[n.tensor1d(xc("x",e,t,a).shape,"int32")];case"ShapeN":return xc("x",e,t,a).map(e=>n.tensor1d(e.shape));case"Size":return[n.scalar(xc("x",e,t,a).size,"int32")];case"Rank":return[n.scalar(xc("x",e,t,a).rank,"int32")];case"NoOp":return[n.scalar(1)];case"Print":const r=xc("x",e,t,a),o=xc("data",e,t,a),i=xc("message",e,t,a),p=xc("summarize",e,t,a);console.warn("The graph has a tf.print() operation,usually used for debugging, which slows down performance."),console.log(i);for(let e=0;e<o.length;e++)console.log(Array.prototype.slice.call(o[e].dataSync()).slice(0,p));return[r];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(t,a,n));case"logical":return o(()=>((e,t,a,n=ld)=>{switch(e.op){case"Equal":return[n.equal(xc("a",e,t,a),xc("b",e,t,a))];case"NotEqual":return[n.notEqual(xc("a",e,t,a),xc("b",e,t,a))];case"Greater":return[n.greater(xc("a",e,t,a),xc("b",e,t,a))];case"GreaterEqual":return[n.greaterEqual(xc("a",e,t,a),xc("b",e,t,a))];case"Less":return[n.less(xc("a",e,t,a),xc("b",e,t,a))];case"LessEqual":return[n.lessEqual(xc("a",e,t,a),xc("b",e,t,a))];case"LogicalAnd":return[n.logicalAnd(xc("a",e,t,a),xc("b",e,t,a))];case"LogicalNot":return[n.logicalNot(xc("a",e,t,a))];case"LogicalOr":return[n.logicalOr(xc("a",e,t,a),xc("b",e,t,a))];case"Select":case"SelectV2":return[n.where(xc("condition",e,t,a),xc("a",e,t,a),xc("b",e,t,a))];case"BitwiseAnd":return[n.bitwiseAnd(xc("a",e,t,a),xc("b",e,t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(t,a,n));case"matrices":return o(()=>((e,t,a,n=ld)=>{switch(e.op){case"BatchMatMul":case"BatchMatMulV2":case"MatMul":return[n.matMul(xc("a",e,t,a),xc("b",e,t,a),xc("transposeA",e,t,a),xc("transposeB",e,t,a))];case"Einsum":return[n.einsum(xc("equation",e,t,a),...xc("tensors",e,t,a))];case"Transpose":return[n.transpose(xc("x",e,t,a),xc("perm",e,t,a))];case"_FusedMatMul":const[s,r]=xc("fusedOps",e,t,a),o="biasadd"===s,i="prelu"===r,p=xc("numArgs",e,t,a),u=xc("leakyreluAlpha",e,t,a);if(o){if(i&&2!==p)throw new Error("Fused MatMul with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!i&&1!==p)throw new Error("Fused MatMul with BiasAdd must have one extra argument: bias.")}const[l,m]=xc("args",e,t,a);return[n.fused.matMul({a:xc("a",e,t,a),b:xc("b",e,t,a),transposeA:xc("transposeA",e,t,a),transposeB:xc("transposeB",e,t,a),bias:l,activation:r,preluActivationWeights:m,leakyreluAlpha:u})];case"MatrixBandPart":return[n.linalg.bandPart(xc("a",e,t,a),xc("numLower",e,t,a),xc("numUpper",e,t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(t,a,n));case"normalization":return o(()=>((e,t,a,n=ld)=>{switch(e.op){case"EuclideanNorm":return[n.euclideanNorm(xc("x",e,t,a),xc("axis",e,t,a),xc("keepDims",e,t,a))];case"FusedBatchNorm":case"FusedBatchNormV2":case"FusedBatchNormV3":return[n.batchNorm(xc("x",e,t,a),xc("mean",e,t,a),xc("variance",e,t,a),xc("offset",e,t,a),xc("scale",e,t,a),xc("epsilon",e,t,a))];case"LRN":return[n.localResponseNormalization(xc("x",e,t,a),xc("radius",e,t,a),xc("bias",e,t,a),xc("alpha",e,t,a),xc("beta",e,t,a))];case"Softmax":return[n.softmax(xc("x",e,t,a))];case"LogSoftmax":return[n.logSoftmax(xc("x",e,t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(t,a,n));case"ragged":return o(()=>((e,t,a,n=ld)=>{switch(e.op){case"RaggedGather":{const{outputNestedSplits:s,outputDenseValues:r}=n.raggedGather(xc("paramsNestedSplits",e,t,a),xc("paramsDenseValues",e,t,a),xc("indices",e,t,a),xc("outputRaggedRank",e,t,a));return s.concat(r)}case"RaggedRange":{const{rtNestedSplits:s,rtDenseValues:r}=n.raggedRange(xc("starts",e,t,a),xc("limits",e,t,a),xc("splits",e,t,a));return[s,r]}case"RaggedTensorToTensor":return[n.raggedTensorToTensor(xc("shape",e,t,a),xc("values",e,t,a),xc("defaultValue",e,t,a),xc("rowPartitionTensors",e,t,a),xc("rowPartitionTypes",e,t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(t,a,n));case"reduction":return o(()=>((e,t,a,n=ld)=>{switch(e.op){case"Max":{const s=xc("axis",e,t,a),r=xc("keepDims",e,t,a);return[n.max(xc("x",e,t,a),s,r)]}case"Mean":{const s=xc("axis",e,t,a),r=xc("keepDims",e,t,a);return[n.mean(xc("x",e,t,a),s,r)]}case"Min":{const s=xc("axis",e,t,a),r=xc("keepDims",e,t,a);return[n.min(xc("x",e,t,a),s,r)]}case"Sum":{const s=xc("axis",e,t,a),r=xc("keepDims",e,t,a);return[n.sum(xc("x",e,t,a),s,r)]}case"All":{const s=xc("axis",e,t,a),r=xc("keepDims",e,t,a);return[n.all(xc("x",e,t,a),s,r)]}case"Any":{const s=xc("axis",e,t,a),r=xc("keepDims",e,t,a);return[n.any(xc("x",e,t,a),s,r)]}case"ArgMax":{const s=xc("axis",e,t,a);return[n.argMax(xc("x",e,t,a),s)]}case"ArgMin":{const s=xc("axis",e,t,a);return[n.argMin(xc("x",e,t,a),s)]}case"Prod":{const s=xc("axis",e,t,a),r=xc("keepDims",e,t,a);return[n.prod(xc("x",e,t,a),s,r)]}case"Cumprod":{const s=xc("axis",e,t,a),r=xc("exclusive",e,t,a),o=xc("reverse",e,t,a);return[n.cumprod(xc("x",e,t,a),s,r,o)]}case"Cumsum":{const s=xc("axis",e,t,a),r=xc("exclusive",e,t,a),o=xc("reverse",e,t,a);return[n.cumsum(xc("x",e,t,a),s,r,o)]}case"Bincount":const s=xc("x",e,t,a),r=xc("weights",e,t,a),o=xc("size",e,t,a);return[n.bincount(s,r,o)];case"DenseBincount":{const s=xc("x",e,t,a),r=xc("weights",e,t,a),o=xc("size",e,t,a),i=xc("binaryOutput",e,t,a);return[n.denseBincount(s,r,o,i)]}default:throw TypeError(`Node type ${e.op} is not implemented`)}})(t,a,n));case"slice_join":return o(()=>((e,t,a,n=ld)=>{switch(e.op){case"ConcatV2":case"Concat":{const s=xc("n",e,t,a),r=xc("axis",e,t,a);let o=xc("tensors",e,t,a);return o=o.slice(0,s),[n.concat(o,r)]}case"Gather":{const s=xc("x",e,t,a),r=xc("indices",e,t,a);return[n.gather(s,n.cast(r,"int32"),0)]}case"GatherV2":{const s=xc("axis",e,t,a),r=xc("batchDims",e,t,a),o=xc("x",e,t,a),i=xc("indices",e,t,a);return[n.gather(o,n.cast(i,"int32"),s,r)]}case"Reverse":{const s=xc("dims",e,t,a),r=[];for(let e=0;e<s.length;e++)s[e]&&r.push(e);const o=xc("x",e,t,a);return[n.reverse(o,r)]}case"ReverseV2":{const s=xc("axis",e,t,a),r=xc("x",e,t,a);return[n.reverse(r,s)]}case"Slice":{const s=xc("begin",e,t,a),r=xc("size",e,t,a);return[n.slice(xc("x",e,t,a),s,r)]}case"StridedSlice":{const s=xc("begin",e,t,a),r=xc("end",e,t,a),o=xc("strides",e,t,a),i=xc("beginMask",e,t,a),p=xc("endMask",e,t,a),u=xc("ellipsisMask",e,t,a),l=xc("newAxisMask",e,t,a),m=xc("shrinkAxisMask",e,t,a),c=xc("x",e,t,a);return[n.stridedSlice(c,s,r,o,i,p,u,l,m)]}case"Pack":return Qr(()=>{const r=xc("axis",e,t,a),o=xc("tensors",e,t,a),i=o[0].shape,p=n.squeeze(o[0]).shape,u=o.map(e=>{const t=s(e.shape,i);if(!t&&!s(n.squeeze(e).shape,p))throw new Error("the input tensors shape does not match");return t?e:n.reshape(e,i)});return[n.stack(u,r)]});case"Unpack":{const s=xc("axis",e,t,a),r=xc("tensor",e,t,a);return n.unstack(r,s)}case"Tile":{const s=xc("reps",e,t,a);return[n.tile(xc("x",e,t,a),s)]}case"Split":case"SplitV":{const s=xc("axis",e,t,a),r=xc("numOrSizeSplits",e,t,a),o=xc("x",e,t,a);return n.split(o,r,s)}case"ScatterNd":{const s=xc("indices",e,t,a),r=xc("values",e,t,a),o=xc("shape",e,t,a);return[n.scatterND(s,r,o)]}case"GatherNd":{const s=xc("x",e,t,a),r=xc("indices",e,t,a);return[n.gatherND(s,r)]}case"SparseToDense":{const s=xc("sparseIndices",e,t,a),r=xc("outputShape",e,t,a),o=xc("sparseValues",e,t,a),i=xc("defaultValue",e,t,a);return[n.sparseToDense(s,o,r,o.dtype===i.dtype?i:n.cast(i,o.dtype))]}case"TensorScatterUpdate":{const s=xc("indices",e,t,a),r=xc("values",e,t,a),o=xc("tensor",e,t,a);return[n.tensorScatterUpdate(o,s,r)]}default:throw TypeError(`Node type ${e.op} is not implemented`)}})(t,a,n));case"sparse":return o(()=>((e,t,a,n=ld)=>{switch(e.op){case"SparseFillEmptyRows":{const{outputIndices:s,outputValues:r,emptyRowIndicator:o,reverseIndexMap:i}=n.sparse.sparseFillEmptyRows(xc("indices",e,t,a),xc("values",e,t,a),xc("denseShape",e,t,a),xc("defaultValue",e,t,a));return[s,r,o,i]}case"SparseReshape":{const{outputIndices:s,outputShape:r}=n.sparse.sparseReshape(xc("inputIndices",e,t,a),xc("inputShape",e,t,a),xc("newShape",e,t,a));return[s,r]}case"SparseSegmentMean":return[n.sparse.sparseSegmentMean(xc("data",e,t,a),xc("indices",e,t,a),xc("segmentIds",e,t,a))];case"SparseSegmentSum":return[n.sparse.sparseSegmentSum(xc("data",e,t,a),xc("indices",e,t,a),xc("segmentIds",e,t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(t,a,n));case"spectral":return o(()=>((e,t,a,n=ld)=>{switch(e.op){case"FFT":return[n.fft(xc("x",e,t,a))];case"IFFT":return[n.ifft(xc("x",e,t,a))];case"RFFT":return[n.rfft(xc("x",e,t,a))];case"IRFFT":return[n.irfft(xc("x",e,t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(t,a,n));case"string":return o(()=>((e,t,a,n=ld)=>{switch(e.op){case"StaticRegexReplace":return[n.string.staticRegexReplace(xc("input",e,t,a),xc("pattern",e,t,a),xc("rewrite",e,t,a),xc("replaceGlobal",e,t,a))];case"StringNGrams":{const{nGrams:s,nGramsSplits:r}=n.string.stringNGrams(xc("data",e,t,a),xc("dataSplits",e,t,a),xc("separator",e,t,a),xc("nGramWidths",e,t,a),xc("leftPad",e,t,a),xc("rightPad",e,t,a),xc("padWidth",e,t,a),xc("preserveShortSequences",e,t,a));return[s,r]}case"StringSplit":{const{indices:s,values:r,shape:o}=n.string.stringSplit(xc("input",e,t,a),xc("delimiter",e,t,a),xc("skipEmpty",e,t,a));return[s,r,o]}case"StringToHashBucketFast":return[n.string.stringToHashBucketFast(xc("input",e,t,a),xc("numBuckets",e,t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(t,a,n));case"transformation":return o(()=>((e,t,a,n=ld)=>{switch(e.op){case"Cast":return[n.cast(xc("x",e,t,a),xc("dtype",e,t,a))];case"ExpandDims":{const s=xc("axis",e,t,a);return[n.expandDims(xc("x",e,t,a),s)]}case"Squeeze":{const s=xc("axis",e,t,a);return[n.squeeze(xc("x",e,t,a),s)]}case"Reshape":return[n.reshape(xc("x",e,t,a),xc("shape",e,t,a))];case"EnsureShape":return[n.ensureShape(xc("x",e,t,a),xc("shape",e,t,a))];case"MirrorPad":return[n.mirrorPad(xc("x",e,t,a),xc("padding",e,t,a),xc("mode",e,t,a))];case"PadV2":case"Pad":return[n.pad(xc("x",e,t,a),xc("padding",e,t,a),xc("constantValue",e,t,a))];case"SpaceToBatchND":{const s=xc("blockShape",e,t,a),r=xc("paddings",e,t,a);return[n.spaceToBatchND(xc("x",e,t,a),s,r)]}case"BatchToSpaceND":{const s=xc("blockShape",e,t,a),r=xc("crops",e,t,a);return[n.batchToSpaceND(xc("x",e,t,a),s,r)]}case"DepthToSpace":{const s=xc("blockSize",e,t,a),r=xc("dataFormat",e,t,a).toUpperCase();return[n.depthToSpace(xc("x",e,t,a),s,r)]}case"BroadcastTo":return[n.broadcastTo(xc("x",e,t,a),xc("shape",e,t,a))];case"BroadcastArgs":return[n.broadcastArgs(xc("s0",e,t,a),xc("s1",e,t,a))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(t,a,n));case"hash_table":return((t,a,n,s)=>e(void 0,null,function*(){switch(t.op){case"HashTable":case"HashTableV2":{const e=s.getHashTableHandleByName(t.name);if(null!=e)return[e];{const e=xc("keyDType",t,a,n),r=xc("valueDType",t,a,n),o=new wd(e,r);return s.addHashTable(t.name,o),[o.handle]}}case"InitializeTable":case"InitializeTableV2":case"LookupTableImport":case"LookupTableImportV2":{const e=xc("tableHandle",t,a,n,s),r=xc("keys",t,a,n),o=xc("values",t,a,n),i=s.getHashTableById(e.id);return[yield i.import(r,o)]}case"LookupTableFind":case"LookupTableFindV2":{const e=xc("tableHandle",t,a,n,s),r=xc("keys",t,a,n),o=xc("defaultValue",t,a,n),i=s.getHashTableById(e.id);return[yield i.find(r,o)]}case"LookupTableSize":case"LookupTableSizeV2":{const e=xc("tableHandle",t,a,n,s);return[s.getHashTableById(e.id).tensorSize()]}default:throw TypeError(`Node type ${t.op} is not implemented`)}}))(t,a,n,r);case"custom":const i=Nc(t.op);if(i&&i.customExecutor)return i.customExecutor(new ud(t,a,n));throw TypeError(`Custom op ${t.op} is not registered.`);default:throw TypeError(`Unknown op '${t.op}'. File an issue at https://github.com/tensorflow/tfjs/issues so we can add it, or register a custom execution with tf.registerOp()`)}})(t,a,n);return Xr(i)?i.then(e=>[].concat(e)):[].concat(i)}class Sd{constructor(e={},t={},a={},n={},s){this.weightMap=e,this.tensorArrayMap=t,this.tensorListMap=a,this.functionMap=n,this.parseNodeNameCache=s,this.rootContext={id:0,frameName:"",iterationId:0},this.contexts=[this.rootContext],this.lastId=0,this.generateCurrentContextIds()}newFrame(e,t){return{id:e,frameName:t,iterationId:0}}set currentContext(e){this.contexts!==e&&(this.contexts=e,this.generateCurrentContextIds())}get currentContext(){return this.contexts}get currentContextId(){return this._currentContextIds[0]}get currentContextIds(){return this._currentContextIds}generateCurrentContextIds(){const e=[];for(let t=0;t<this.contexts.length-1;t++){const a=this.contexts.slice(0,this.contexts.length-t);e.push(this.contextIdforContexts(a))}e.push(""),this._currentContextIds=e}contextIdforContexts(e){return e?e.map(e=>0===e.id&&0===e.iterationId?"":`${e.frameName}-${e.iterationId}`).join("/"):""}enterFrame(e){this.contexts&&(this.lastId++,this.contexts=this.contexts.slice(),this.contexts.push(this.newFrame(this.lastId,e)),this._currentContextIds.unshift(this.contextIdforContexts(this.contexts)))}exitFrame(){if(!(this.contexts&&this.contexts.length>1))throw new Error("Cannot exit frame, the context is empty");this.contexts=this.contexts.slice(),this.contexts.splice(-1),this.currentContextIds.shift()}nextIteration(){if(!(this.contexts&&this.contexts.length>0))throw new Error("Cannot increase frame iteration, the context is empty");{this.contexts=this.contexts.slice(),this.lastId++;const e=Object.assign({},this.contexts[this.contexts.length-1]);e.iterationId+=1,e.id=this.lastId,this.contexts.splice(-1,1,e),this._currentContextIds.splice(0,1,this.contextIdforContexts(this.contexts))}}getWeight(e){return this.weightMap[e]}addTensorArray(e){this.tensorArrayMap[e.id]=e}getTensorArray(e){return this.tensorArrayMap[e]}addTensorList(e){this.tensorListMap[e.id]=e}getTensorList(e){return this.tensorListMap[e]}dispose(e){for(const t in this.tensorArrayMap)this.tensorArrayMap[t].clearAndClose(e);for(const t in this.tensorListMap)this.tensorListMap[t].clearAndClose(e)}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Td(e,t,a,n){const s=new Set,r=[];let o=null,i=null;const p=new Set,u=new Set(Object.keys(e).map(e=>_c(e)[0]));n=n||[];const l=new Set(n.map(e=>_c(e.name)[0])),m=[...t];for(;m.length>0;){const e=m.pop();(kd(e)||Md(e)||Cd(e))&&null==o&&(o=e,i=o.children.map(e=>e.name).filter(e=>s.has(e))),s.add(e.name),null==a[e.name]&&(u.has(e.name)||l.has(e.name)||(0!==e.inputs.length?e.inputs.forEach(e=>{p.has(e.name)||(p.add(e.name),m.push(e))}):r.push(e.name)))}return{inputs:e,outputs:t,usedNodes:s,missingInputs:r,dynamicNode:o,syncInputs:i}}function vd(e,t){const{usedNodes:a,inputs:n}=t,s=Object.keys(n).map(e=>_c(e)[0]).map(t=>e.nodes[t]),r=e.initNodes||[],o=e=>a.has("string"==typeof e?e:e.name);function i(e){return[...new Map(e.map(e=>[e.name,e])).values()]}const p=i([...s,...e.weights,...r]).filter(o),u=i([...p,...Object.values(e.nodes)]).filter(o),l=new Map(u.map(e=>[e.name,e])),m={};for(const f of u){m[f.name]=m[f.name]||0;for(const e of f.children)o(e)||(m[e.name]=Number.POSITIVE_INFINITY),m[e.name]=(m[e.name]||0)+1}const c=Object.entries(m).filter(([,e])=>0===e).map(([e])=>e),d=[...c];for(;c.length>0;){const e=c.pop(),t=l.get(e);for(const a of t.children.filter(o))0===--m[a.name]&&(d.push(a.name),c.push(a.name))}const h=function(e,t){const a=new Map(e.map(e=>[e.name,e])),n=t.map(e=>e.name),s=new Set(n);for(;n.length>0;){const e=n.pop(),t=a.get(e);for(const r of t.children)a.has(r.name)&&!s.has(r.name)&&(s.add(r.name),n.push(r.name))}const r=e.filter(e=>s.has(e.name));return r}(d.map(e=>l.get(e)),p);return function(e,t){const a=new Map(e.map((e,t)=>[e.name,t])),n=new Set(t.map(e=>e.name)),s=e=>n.has("string"==typeof e?e:e.name),r=new Set(e.map(e=>e.name)),o=e=>r.has("string"==typeof e?e:e.name);for(const i of e){for(const e of i.children.filter(o)){if(!a.has(e.name))throw new Od(`Child ${e.name} of node ${i.name} is unreachable.`);if(a.get(i.name)>a.get(e.name))throw new Od(`Node ${i.name} is scheduled to run after its child ${e.name}.`)}if(!s(i))for(const e of i.inputs){if(!a.has(e.name))throw new Od(`Input ${e.name} of node ${i.name} is unreachable.`);if(a.get(e.name)>a.get(i.name))throw new Od(`Node ${i.name} is scheduled to run before its input ${e.name}.`)}}}(h,p),h}class Od extends Error{constructor(e){super(`NodesExecutionOrderError: ${e}`)}}const _d=new Set(["Switch","Merge","Enter","Exit","NextIteration","StatelessIf","StatelessWhile","if","While"]),Ed=new Set(["NonMaxSuppressionV2","NonMaxSuppressionV3","NonMaxSuppressionV5","Where"]),Ad=new Set(["HashTable","HashTableV2","LookupTableImport","LookupTableImportV2","LookupTableFind","LookupTableFindV2","LookupTableSize","LookupTableSizeV2"]);function kd(e){return _d.has(e.op)}function Md(e){return Ed.has(e.op)}function Cd(e){return Ad.has(e.op)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Id{get weightIds(){return this.parent?this.parent.weightIds:this._weightIds}get functionExecutorMap(){return this.parent?this.parent.functionExecutorMap:this._functionExecutorMap}get weightMap(){return this.parent?this.parent.weightMap:this._weightMap}set weightMap(e){const t=Object.keys(e).map(t=>e[t].map(e=>e.id));this._weightIds=[].concat(...t),this._weightMap=e}set resourceManager(e){this._resourceManager=e}get inputs(){return this._inputs.map(e=>({name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}))}get outputs(){return this._outputs.map(e=>({name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}))}get inputNodes(){return this._inputs.map(e=>e.signatureKey||e.name)}get outputNodes(){return this._outputs.map(e=>{const t=e.signatureKey||e.name;return e.defaultOutput?`${t}:${e.defaultOutput}`:t})}get functions(){return Object.keys(this._functions).reduce((e,t)=>(e[t]=this._functions[t].signature,e),{})}constructor(e,t){this.graph=e,this.parent=t,this.compiledMap=new Map,this.parseNodeNameCache=new Map,this._weightMap={},this.SEPARATOR=",",this._functions={},this._functionExecutorMap={},this.keepIntermediateTensors=!1,this._outputs=e.outputs,this._inputs=e.inputs,this._initNodes=e.initNodes,this._signature=e.signature,this._functions=e.functions,null!=e.functions&&Object.keys(e.functions).forEach(t=>{this._functionExecutorMap[t]=new Id(e.functions[t],this)})}getCompilationKey(e,t){const a=e.map(e=>e.name).sort(),n=t.map(e=>e.name).sort();return a.join(this.SEPARATOR)+"--"+n.join(this.SEPARATOR)}compile(e,t){const a=Td(e,t,this.weightMap,this._initNodes),{missingInputs:n,dynamicNode:s,syncInputs:r}=a;if(null!=s)throw new Error(`This execution contains the node '${s.name}', which has the dynamic op '${s.op}'. Please use model.executeAsync() instead. Alternatively, to avoid the dynamic ops, specify the inputs [${r}]`);if(n.length>0){const a=t.map(e=>e.name),s=Object.keys(e);throw new Error(`Cannot compute the outputs [${a}] from the provided inputs [${s}]. Missing the following inputs: [${n}]`)}const o=vd(this.graph,a),i=function(e){const t=new Map(e.map((e,t)=>[e.name,t])),a=Number.MAX_SAFE_INTEGER,n=e.map((e,t)=>kd(e)?a:t),s=e=>{const a=n[t.get(e.name)];return null==a?-1:a},r=e.map((e,t)=>e.children.map(s).reduce((e,t)=>Math.max(e,t),n[t])),o=new Map;for(let i=0;i<e.length;++i){const t=r[i];if(t===a)continue;const n=e[i],s=e[t];o.has(s.name)||o.set(s.name,[]),o.get(s.name).push(n)}return o}(o);return{orderedNodes:o,nodeLiveUntilMap:i}}cloneAndKeepTensor(e){if(null==e)return null;const t=e.clone();return Jr(t),t}cloneTensorList(e){if(!e)return null;return e.map(e=>this.cloneAndKeepTensor(e))}cloneTensorMap(e){return Object.fromEntries(Object.entries(e).map(([e,t])=>[e,this.cloneTensorList(t)]))}execute(e,t){this.disposeIntermediateTensors(),e=this.mapInputs(e);const a=Object.keys(e).sort();this.checkInputs(e),this.checkInputShapeAndType(e),t=this.mapOutputs(t),this.checkOutputs(t);const n=a.map(e=>this.graph.nodes[_c(e)[0]]),s=t.map(e=>_c(e)[0]),r=new Set(s);let o=s.map(e=>this.graph.nodes[e]);0===o.length&&(o=this._outputs);const i=this.getCompilationKey(n,o);let p=this.compiledMap.get(i);null==p&&(p=this.compile(e,o),this.compiledMap.set(i,p));try{this.keepIntermediateTensors=Ee().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(m){this.keepIntermediateTensors=!1,console.warn(m.message)}const u={},l={};return Qr(()=>{const a=new Sd(this.weightMap,u,l,this.functionExecutorMap,this.parseNodeNameCache),n=Object.assign({},this.weightMap);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap)),Object.keys(e).forEach(t=>{const[s,r]=_c(t,a),o=[];o[r]=e[t],n[s]=o,this.keepIntermediateTensors&&(this.clonedTensorsMap[s]=this.cloneTensorList(o))});const s=this.getFrozenTensorIds(n),{orderedNodes:o,nodeLiveUntilMap:i}=p;for(const e of o){if(n[e.name])continue;const t=xd(e,n,a,this._resourceManager);if(Xr(t))throw new Error(`The execution of the op '${e.op}' returned a promise. Please use model.executeAsync() instead.`);n[e.name]=t,this.keepIntermediateTensors&&(this.clonedTensorsMap[e.name]=this.cloneTensorList(t)),this.checkTensorForDisposalWithNodeLiveUntilInfo(e,n,a,s,r,i.get(e.name))}return null==this.parent&&a.dispose(s),t.map(e=>Sc(e,n,a))})}getFrozenTensorIds(e){const t=[].concat.apply([],Object.keys(e).map(t=>e[t]).map(e=>e.map(e=>e.id)));return new Set(t)}checkTensorForDisposal(e,t,a,n,s,r,o){if(!kd(t)&&!r.has(e)){for(const n of a[e])null!=n&&(o[n.id]=(o[n.id]||0)+t.children.length);for(const e of t.inputs){if(kd(e))continue;const t=Tc(e.name,a,n);if(null!=t)for(const e of t){if(!e||e.kept||s.has(e.id))continue;const t=o[e.id];1===t?(e.dispose(),delete o[e.id]):null!=t&&o[e.id]--}}}}checkTensorForDisposalWithNodeLiveUntilInfo(e,t,a,n,s,r){function o(e){return kd(e)||s.has(e.name)}if(!kd(e)&&null!=r)for(const i of r){if(o(i))continue;const e=Tc(i.name,t,a);for(const t of e)!t||t.kept||n.has(t.id)||t.dispose()}}executeAsync(t,a){return e(this,null,function*(){return this._executeAsync(t,a)})}disposeIntermediateTensors(){this.clonedTensorsMap&&(Object.values(this.clonedTensorsMap).forEach(e=>{for(const t of e)t&&!t.isDisposed&&t.dispose()}),this.clonedTensorsMap=null)}getIntermediateTensors(){return this.clonedTensorsMap}_executeAsync(t,a){return e(this,arguments,function*(e,t,a=!1,n={},s={}){this.disposeIntermediateTensors(),a||(e=this.mapInputs(e),this.checkInputs(e),this.checkInputShapeAndType(e),t=this.mapOutputs(t),this.checkOutputs(t));try{this.keepIntermediateTensors=Ee().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(m){this.keepIntermediateTensors=!1,console.warn(m.message)}const r=new Sd(this.weightMap,n,s,this.functionExecutorMap,this.parseNodeNameCache);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap));const o=yield this.executeWithControlFlow(e,r,t,a),i=t.map(e=>Sc(e,o,r)),p=i.map(e=>e.id),u=Object.keys(e).map(t=>e[t].id),l=new Set([...p,...u,...this.weightIds]);return Object.values(o).forEach(e=>{e.forEach(e=>{!e||e.isDisposed||l.has(e.id)||e.dispose()})}),null==this.parent&&r.dispose(l),i})}executeFunctionAsync(t,a,n){return e(this,null,function*(){const e=t.reduce((e,t,a)=>(e[this.inputs[a].name]=t,e),{});return this._executeAsync(e,this.outputNodes,!0,a,n)})}executeWithControlFlow(t,a,n,s){return e(this,null,function*(){const e=Object.keys(t),r=e.map(e=>this.graph.nodes[_c(e)[0]]),o=n.map(e=>_c(e)[0]),i=new Set(o);let p=o.map(e=>this.graph.nodes[e]);0===p.length&&(p=this._outputs);const{usedNodes:u,missingInputs:l,dynamicNode:m,syncInputs:c}=Td(t,p,this.weightMap,this._initNodes),d=[...r,...this.graph.weights,...this._initNodes||[]].map(e=>({node:e,contexts:a.currentContext})),h=Object.assign({},this.weightMap);Object.keys(t).forEach(e=>{const[a,n]=_c(e),s=[];s[n]=t[e],h[a]=s});const f={},y=this.getFrozenTensorIds(h),g={};for(;d.length>0;){const e=this.processStack(r,d,a,h,g,y,i,f,u);yield Promise.all(e)}null!=m||s||console.warn("This model execution did not contain any nodes with control flow or dynamic output shapes. You can use model.execute() instead.");const b=p.filter(e=>!kd(e)&&!Sc(e.name,h,a)).map(e=>e.name);if(b.length>0){let t="";throw null!=m&&(t=`Alternatively, to avoid the dynamic ops, use model.execute() and specify the inputs [${c}]`),new Error(`Cannot compute the outputs [${b}] from the provided inputs [${e}]. Consider providing the following inputs: [${l}]. ${t}`)}return h})}processStack(e,t,a,n,s,r,o,i,p){const u=[];for(;t.length>0;){const e=t.pop();a.currentContext=e.contexts;let l="";if("Enter"===e.node.op&&xc("isConstant",e.node,n,a)&&([l]=vc(e.node.name,a)),null==n[e.node.name]){const m=xd(e.node,n,a,this._resourceManager);l||([l]=vc(e.node.name,a));const c=a.currentContext;Xr(m)?u.push(m.then(u=>(n[l]=u,this.keepIntermediateTensors&&(this.clonedTensorsMap[l]=this.cloneTensorList(u)),a.currentContext=c,this.checkTensorForDisposal(l,e.node,n,a,r,o,i),this.processChildNodes(e.node,t,a,n,s,p),u))):(n[l]=m,this.keepIntermediateTensors&&(this.clonedTensorsMap[l]=this.cloneTensorList(m)),this.checkTensorForDisposal(l,e.node,n,a,r,o,i),this.processChildNodes(e.node,t,a,n,s,p))}else this.processChildNodes(e.node,t,a,n,s,p)}return u}processChildNodes(e,t,a,n,s,r){e.children.forEach(e=>{const[o]=vc(e.name,a);!s[o]&&r.has(e.name)&&("Merge"===e.op?e.inputNames.some(e=>!!Sc(e,n,a))&&(s[o]=!0,t.push({contexts:a.currentContext,node:e})):e.inputNames.every(e=>!!Sc(e,n,a))&&(s[o]=!0,t.push({contexts:a.currentContext,node:e})))})}dispose(){Object.keys(this.weightMap).forEach(e=>this.weightMap[e].forEach(e=>e.dispose()))}checkInputShapeAndType(e){Object.keys(e).forEach(t=>{const n=e[t],[s]=_c(t),r=this.graph.nodes[s];if(r.attrParams.shape&&r.attrParams.shape.value){const e=r.attrParams.shape.value,t=e.length===n.shape.length&&n.shape.every((t,a)=>-1===e[a]||e[a]===t);a(t,()=>`The shape of dict['${r.name}'] provided in model.execute(dict) must be [${e}], but was [${n.shape}]`)}r.attrParams.dtype&&r.attrParams.dtype.value&&a(n.dtype===r.attrParams.dtype.value,()=>`The dtype of dict['${r.name}'] provided in model.execute(dict) must be ${r.attrParams.dtype.value}, but was ${n.dtype}`)})}mapInputs(e){var t,a;const n={};for(const s in e){const r=null===(a=null===(t=this._signature)||void 0===t?void 0:t.inputs)||void 0===a?void 0:a[s];null!=r?n[r.name]=e[s]:n[s]=e[s]}return n}checkInputs(e){const t=Object.keys(e).filter(e=>{const[t]=_c(e);return null==this.graph.nodes[t]});if(t.length>0)throw new Error(`The dict provided in model.execute(dict) has keys: [${t}] that are not part of graph`)}mapOutputs(e){return e.map(e=>{var t,a;const n=null===(a=null===(t=this._signature)||void 0===t?void 0:t.outputs)||void 0===a?void 0:a[e];return null!=n?n.name:e},{})}checkOutputs(e){e.forEach(e=>{const[t]=_c(e);if(!this.graph.nodes[t])throw new Error(`The output '${e}' is not found in the graph`)})}}class Dd{constructor(e={},t={}){this.hashTableNameToHandle=e,this.hashTableMap=t}addHashTable(e,t){this.hashTableNameToHandle[e]=t.handle,this.hashTableMap[t.id]=t}getHashTableHandleByName(e){return this.hashTableNameToHandle[e]}getHashTableById(e){return this.hashTableMap[e]}dispose(){for(const e in this.hashTableMap)this.hashTableMap[e].clearAndClose(),delete this.hashTableMap[e];for(const e in this.hashTableNameToHandle)this.hashTableNameToHandle[e].dispose(),delete this.hashTableNameToHandle[e]}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zd="?tfjs-format=file",$d="model.json";class Vd{get modelVersion(){return this.version}get inputNodes(){return this.executor.inputNodes}get outputNodes(){return this.executor.outputNodes}get inputs(){return this.executor.inputs}get outputs(){return this.executor.outputs}get weights(){return this.executor.weightMap}get metadata(){return this.artifacts.userDefinedMetadata}get modelSignature(){return this.signature}get modelStructuredOutputKeys(){return this.structuredOutputKeys}constructor(e,t={},a=Dm){this.modelUrl=e,this.loadOptions=t,this.version="n/a",this.io=a,null==t&&(this.loadOptions={}),this.resourceManager=new Dd}findIOHandler(){const e=this.modelUrl;if(null!=e.load)this.handler=e;else if(null!=this.loadOptions.requestInit)this.handler=this.io.browserHTTPRequest(e,this.loadOptions);else{const t=this.io.getLoadHandlers(e,this.loadOptions);if(0===t.length)t.push(this.io.browserHTTPRequest(e,this.loadOptions));else if(t.length>1)throw new Error(`Found more than one (${t.length}) load handlers for URL '${[e]}'`);this.handler=t[0]}}load(){if(this.findIOHandler(),null==this.handler.load)throw new Error("Cannot proceed with model loading because the IOHandler provided does not have the `load` method implemented.");const e=this.handler.load();return Xr(e)?e.then(e=>null==e.getWeightStream?this.loadSync(e):this.loadStreaming(e)):this.loadSync(e)}loadSync(e){const t=this.io.decodeWeights(e.weightData,e.weightSpecs);return this.loadWithWeightMap(e,t)}loadStreaming(t){return e(this,null,function*(){if(null==t.getWeightStream)throw new Error("Model artifacts missing streamWeights function");const e=yield $e(t.getWeightStream(),t.weightSpecs);return this.loadWithWeightMap(t,e)})}loadWithWeightMap(e,t){this.artifacts=e;const a=this.artifacts.modelTopology;let n=this.artifacts.signature;if(null!=this.artifacts.userDefinedMetadata){const e=this.artifacts.userDefinedMetadata;null!=e.signature&&(n=e.signature),null!=e.structuredOutputKeys&&(this.structuredOutputKeys=e.structuredOutputKeys)}if(this.signature=n,this.version=`${a.versions.producer}.${a.versions.minConsumer}`,this.executor=new Id(Kc.Instance.transformGraph(a,this.signature)),this.executor.weightMap=this.convertTensorMapToTensorsMap(t),this.executor.resourceManager=this.resourceManager,null!=e.modelInitializer&&null!=e.modelInitializer.node){const t=Kc.Instance.transformGraph(e.modelInitializer);this.initializer=new Id(t),this.initializer.weightMap=this.executor.weightMap,this.initializer.resourceManager=this.resourceManager,this.initializerSignature=e.initializerSignature}return!0}save(t,a){return e(this,null,function*(){if("string"==typeof t){const e=this.io.getSaveHandlers(t);if(0===e.length)throw new Error(`Cannot find any save handlers for URL '${t}'`);if(e.length>1)throw new Error(`Found more than one (${e.length}) save handlers for URL '${t}'`);t=e[0]}if(null==t.save)throw new Error("GraphModel.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");return t.save(this.artifacts)})}addStructuredOutputNames(e){if(this.structuredOutputKeys){const t={};return(e instanceof T?[e]:e).forEach((e,a)=>t[this.structuredOutputKeys[a]]=e),t}return e}predict(e,t){const a=this.execute(e,this.outputNodes);return this.addStructuredOutputNames(a)}predictAsync(t,a){return e(this,null,function*(){const e=yield this.executeAsync(t,this.outputNodes);return this.addStructuredOutputNames(e)})}normalizeInputs(e){var t;if(!(e instanceof T||Array.isArray(e))){const a=null===(t=this.signature)||void 0===t?void 0:t.inputs;if(null!=a)for(const t in a){const n=a[t];null!=n.resourceId&&(e[t]=this.resourceIdToCapturedInput[n.resourceId])}return e}e=Array.isArray(e)?e:[e];const a=Object.keys(this.resourceIdToCapturedInput).length;if(e.length+a!==this.inputNodes.length)throw new Error(`Input tensor count mismatch, the graph model has ${this.inputNodes.length-a} non-resource placeholders, while there are ${e.length} input tensors provided.`);let n=0;return this.inputNodes.reduce((t,a)=>{var s,r,o;const i=null===(o=null===(r=null===(s=this.signature)||void 0===s?void 0:s.inputs)||void 0===r?void 0:r[a])||void 0===o?void 0:o.resourceId;return t[a]=null!=i?this.resourceIdToCapturedInput[i]:e[n++],t},{})}normalizeOutputs(e){return e=e||this.outputNodes,Array.isArray(e)?e:[e]}executeInitializerGraph(){return null==this.initializer?[]:null==this.initializerSignature?this.initializer.execute({},[]):this.initializer.execute({},Object.keys(this.initializerSignature.outputs))}executeInitializerGraphAsync(){return e(this,null,function*(){return null==this.initializer?[]:null==this.initializerSignature?this.initializer.executeAsync({},[]):this.initializer.executeAsync({},Object.keys(this.initializerSignature.outputs))})}setResourceIdToCapturedInput(e){if(this.resourceIdToCapturedInput={},this.initializerSignature){const t=this.initializerSignature.outputs,a=Object.keys(t);for(let n=0;n<a.length;n++){const s=t[a[n]];this.resourceIdToCapturedInput[s.resourceId]=e[n]}}}execute(e,t){null==this.resourceIdToCapturedInput&&this.setResourceIdToCapturedInput(this.executeInitializerGraph()),e=this.normalizeInputs(e),t=this.normalizeOutputs(t);const a=this.executor.execute(e,t);return a.length>1?a:a[0]}executeAsync(t,a){return e(this,null,function*(){null==this.resourceIdToCapturedInput&&this.setResourceIdToCapturedInput(yield this.executeInitializerGraphAsync()),t=this.normalizeInputs(t),a=this.normalizeOutputs(a);const e=yield this.executor.executeAsync(t,a);return e.length>1?e:e[0]})}getIntermediateTensors(){return this.executor.getIntermediateTensors()}disposeIntermediateTensors(){this.executor.disposeIntermediateTensors()}convertTensorMapToTensorsMap(e){return Object.keys(e).reduce((t,a)=>(t[a]=[e[a]],t),{})}dispose(){this.executor.dispose(),this.initializer&&(this.initializer.dispose(),this.resourceIdToCapturedInput&&Zr(this.resourceIdToCapturedInput)),this.resourceManager.dispose()}}function Ld(t){return e(this,arguments,function*(e,t={},a=Dm){if(null==e)throw new Error("modelUrl in loadGraphModel() cannot be null. Please provide a url or an IOHandler that loads the model");null==t&&(t={}),t.fromTFHub&&"string"==typeof e&&(e=function(e){e.endsWith("/")||(e+="/");return`${e}${$d}${zd}`}
/** @license See the LICENSE file. */(e));const n=new Vd(e,t,a);return yield n.load(),n})}function Pd(e){if(null==e)throw new Error("modelUrl in loadGraphModelSync() cannot be null. Please provide model artifacts or an IOHandler that loads the model");let t;if(e instanceof Array){const[a,n]=e;if(!a)throw new Error("modelJSON must be the first element of the array");if(!(n&&n instanceof ArrayBuffer))throw new Error("An ArrayBuffer of weights must be the second element of the array");if(!("modelTopology"in a))throw new Error("Model JSON is missing 'modelTopology'");if(!("weightsManifest"in a))throw new Error("Model JSON is missing 'weightsManifest'");const s=Re(a.weightsManifest);t=Im(Pe(a,s,n))}else if("load"in e)t=e;else{if(!("modelTopology"in e&&"weightSpecs"in e&&"weightData"in e))throw new Error("Unknown model format");t=Im(e)}const a=new Vd(t);return a.load(),a}const Fd="4.22.0";
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class Rd extends Yr{constructor(e){super(),this.input=e}iterator(){return e(this,null,function*(){return(yield this.input.iterator()).decodeUTF8().split("\n").map(e=>(e.endsWith("\r")&&(e=e.slice(0,-1)),e))})}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */const jd='"',Bd=Symbol("out"),qd=Symbol("field"),Wd=Symbol("quote"),Hd=Symbol("quoteafterquote"),Ud=Symbol("quoteinquote");class Gd extends Yr{columnNames(){return e(this,null,function*(){return this.columnNamesValidated||(yield this.setColumnNames()),this.configuredColumnsOnly?Object.keys(this.columnConfigs):this.fullColumnNames})}setColumnNames(){return e(this,null,function*(){const e=yield this.maybeReadHeaderLine();if(!this.fullColumnNames&&!e)throw new Error("Column names must be provided if there is no header line.");this.fullColumnNames&&e&&a(e.length===this.fullColumnNames.length,()=>"The length of provided columnNames ("+this.fullColumnNames.length.toString()+") does not match the length of the header line read from file ("+e.length.toString()+")."),this.fullColumnNames||(this.fullColumnNames=e);const t=this.fullColumnNames.reduce((e,t)=>(e[t]=e[t]+1||1,e),{}),n=Object.keys(t).filter(e=>t[e]>1);if(a(0===n.length,()=>"Duplicate column names found: "+n.toString()),this.columnConfigs)for(const a of Object.keys(this.columnConfigs)){if(-1===this.fullColumnNames.indexOf(a))throw new Error('The key "'+a+'" provided in columnConfigs does not match any of the column names ('+this.fullColumnNames.toString()+").")}this.columnNamesValidated=!0})}maybeReadHeaderLine(){return e(this,null,function*(){if(this.hasHeader){const e=yield this.base.iterator(),t=yield e.next();if(t.done)throw new Error("No data was found for CSV parsing.");const a=t.value;return this.parseRow(a,!1)}return null})}constructor(e,t){super(),this.input=e,this.hasHeader=!0,this.fullColumnNames=null,this.columnNamesValidated=!1,this.columnConfigs=null,this.configuredColumnsOnly=!1,this.delimiter=",",this.delimWhitespace=!1,this.base=new Rd(e),t||(t={}),this.hasHeader=!1!==t.hasHeader,this.fullColumnNames=t.columnNames,this.columnConfigs=t.columnConfigs,this.configuredColumnsOnly=t.configuredColumnsOnly,t.delimWhitespace?(a(null==t.delimiter,()=>"Delimiter should not be provided when delimWhitespace is true."),this.delimWhitespace=!0,this.delimiter=" "):this.delimiter=t.delimiter?t.delimiter:","}iterator(){return e(this,null,function*(){this.columnNamesValidated||(yield this.setColumnNames());let e=yield this.base.iterator();return this.hasHeader&&(e=e.skip(1)),e.map(e=>this.makeDataElement(e))})}makeDataElement(e){const t=this.parseRow(e),a={},n={};for(let s=0;s<this.fullColumnNames.length;s++){const r=this.fullColumnNames[s],o=this.columnConfigs?this.columnConfigs[r]:null;if(!this.configuredColumnsOnly||o){const i=t[s];let p=null;if(""===i)if(o&&void 0!==o.default)p=o.default;else{if(o&&(o.required||o.isLabel))throw new Error(`Required column ${r} is empty in this line: ${e}`);p=void 0}else{const e=Number(i);if(isNaN(e))p=o&&"bool"===o.dtype?this.getBoolean(i):i;else if(o&&o.dtype)switch(o.dtype){case"float32":default:p=e;break;case"int32":p=Math.floor(e);break;case"bool":p=this.getBoolean(i)}else p=e}o&&o.isLabel?n[r]=p:a[r]=p}}return 0===Object.keys(n).length?a:{xs:a,ys:n}}getBoolean(e){return"1"===e||"true"===e.toLowerCase()?1:0}parseRow(e,t=!0){const a=[];let n=0;const s=e.length;let r=Bd;for(let o=0;o<s;o++)switch(r){case Bd:switch(e.charAt(o)){case jd:n=o+1,r=Wd;break;case this.delimiter:if(n=o+1," "===this.delimiter&&this.delimWhitespace)break;a.push(""),r=Bd;break;default:r=qd,n=o}break;case qd:if(e.charAt(o)===this.delimiter)a.push(e.substring(n,o)),r=Bd,n=o+1;break;case Wd:if(e.charAt(o)===jd)r=Hd;break;case Hd:switch(e.charAt(o)){case this.delimiter:a.push(e.substring(n,o-1)),r=Bd,n=o+1;break;case jd:r=Wd;break;default:r=Ud}break;case Ud:if(e.charAt(o)===jd)r=Wd}if(r===Hd?a.push(e.substring(n,s-1)):a.push(e.substring(n)),t&&a.length!==this.fullColumnNames.length)throw new Error(`Invalid row in csv file. Should have ${this.fullColumnNames.length} elements in a row, but got ${a}`);return a}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class Kd extends eo{constructor(e){super(),this.microphoneConfig=e,this.isClosed=!1,this.fftSize=e.fftSize||1024;const t=Math.log2(this.fftSize);if(this.fftSize<0||t<4||t>14||!Number.isInteger(t))throw new Error(`Invalid fftSize: it must be a power of 2 between 2 to 4 and 2 to 14, but got ${this.fftSize}`);if(this.numFrames=e.numFramesPerSpectrogram||43,this.sampleRateHz=e.sampleRateHz,this.columnTruncateLength=e.columnTruncateLength||this.fftSize,this.audioTrackConstraints=e.audioTrackConstraints,this.smoothingTimeConstant=e.smoothingTimeConstant||0,this.includeSpectrogram=!1!==e.includeSpectrogram,this.includeWaveform=!0===e.includeWaveform,!this.includeSpectrogram&&!this.includeWaveform)throw new Error("Both includeSpectrogram and includeWaveform are false. At least one type of data should be returned.")}summary(){return"microphone"}static create(){return e(this,arguments,function*(e={}){if(!Ee().get("IS_BROWSER"))throw new Error("microphone API is only supported in browser environment.");const t=new Kd(e);return yield t.start(),t})}start(){return e(this,null,function*(){try{this.stream=yield navigator.mediaDevices.getUserMedia({audio:null==this.audioTrackConstraints||this.audioTrackConstraints,video:!1})}catch(a){throw new Error(`Error thrown while initializing video stream: ${a.message}`)}if(!this.stream)throw new Error("Could not obtain audio from microphone.");const e=window.AudioContext||window.webkitAudioContext;if(this.audioContext=new e,this.sampleRateHz){if(this.audioContext.sampleRate!==this.sampleRateHz)throw new Error(`Mismatch in sampling rate: Expected: ${this.sampleRateHz}; Actual: ${this.audioContext.sampleRate}`)}else this.sampleRateHz=this.audioContext.sampleRate;const t=this.audioContext.createMediaStreamSource(this.stream);this.analyser=this.audioContext.createAnalyser(),this.analyser.fftSize=2*this.fftSize,this.analyser.smoothingTimeConstant=this.smoothingTimeConstant,t.connect(this.analyser),this.freqData=new Float32Array(this.fftSize),this.timeData=new Float32Array(this.fftSize)})}next(){return e(this,null,function*(){if(this.isClosed)return{value:null,done:!0};let e,t;const a=yield this.getAudioData();if(this.includeSpectrogram){const t=this.flattenQueue(a.freqDataQueue);e=this.getTensorFromAudioDataArray(t,[this.numFrames,this.columnTruncateLength,1])}if(this.includeWaveform){const e=this.flattenQueue(a.timeDataQueue);t=this.getTensorFromAudioDataArray(e,[this.numFrames*this.fftSize,1])}return{value:{spectrogram:e,waveform:t},done:!1}})}capture(){return e(this,null,function*(){return(yield this.next()).value})}getAudioData(){return e(this,null,function*(){const e=[],t=[];let a=0;return new Promise(n=>{const s=setInterval(()=>{this.includeSpectrogram&&(this.analyser.getFloatFrequencyData(this.freqData),this.freqData[0]===-1/0&&n({freqDataQueue:e,timeDataQueue:t}),e.push(this.freqData.slice(0,this.columnTruncateLength))),this.includeWaveform&&(this.analyser.getFloatTimeDomainData(this.timeData),t.push(this.timeData.slice())),++a===this.numFrames&&(clearInterval(s),n({freqDataQueue:e,timeDataQueue:t}))},this.fftSize/this.sampleRateHz*1e3)})})}stop(){this.isClosed||(this.isClosed=!0,this.analyser.disconnect(),this.audioContext.close(),null!=this.stream&&this.stream.getTracks().length>0&&this.stream.getTracks()[0].stop())}toArray(){throw new Error("Can not convert infinite audio stream to array.")}getSampleRate(){return this.sampleRateHz}flattenQueue(e){const t=e[0].length,a=new Float32Array(e.length*t);return e.forEach((e,n)=>a.set(e,n*t)),a}getTensorFromAudioDataArray(e,t){const a=new Float32Array(w(t));return a.set(e,a.length-e.length),oe(a,t)}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class Jd extends eo{constructor(e,t){if(super(),this.webcamVideoElement=e,this.webcamConfig=t,this.isClosed=!0,this.resize=!1,this.needToResize())if(this.resize=!0,this.cropSize=[this.webcamConfig.resizeHeight,this.webcamConfig.resizeWidth],this.cropBoxInd=Lr([0],"int32"),this.webcamConfig.centerCrop){const e=1*this.webcamConfig.resizeWidth/this.webcamVideoElement.width,t=1*this.webcamConfig.resizeHeight/this.webcamVideoElement.height,a=(1-e)/2,n=(1-t)/2,s=a+e,r=t+n;this.cropBox=Pr([n,a,r,s],[1,4])}else this.cropBox=Pr([0,0,1,1],[1,4])}summary(){return"webcam"}static create(t){return e(this,arguments,function*(e,t={}){if(!Ee().get("IS_BROWSER"))throw new Error("tf.data.webcam is only supported in browser environment.");if(!e){if(e=document.createElement("video"),!t.resizeWidth||!t.resizeHeight)throw new Error("Please provide webcam video element, or resizeWidth and resizeHeight to create a hidden video element.");e.width=t.resizeWidth,e.height=t.resizeHeight}const a=new Jd(e,t);return yield a.start(),a})}start(){return e(this,null,function*(){this.webcamConfig.facingMode&&a("user"===this.webcamConfig.facingMode||"environment"===this.webcamConfig.facingMode,()=>`Invalid webcam facing mode: ${this.webcamConfig.facingMode}. Please provide 'user' or 'environment'`);try{this.stream=yield navigator.mediaDevices.getUserMedia({video:{deviceId:this.webcamConfig.deviceId,facingMode:this.webcamConfig.facingMode?this.webcamConfig.facingMode:"user",width:this.webcamVideoElement.width,height:this.webcamVideoElement.height}})}catch(e){throw e.message=`Error thrown while initializing video stream: ${e.message}`,e}if(!this.stream)throw new Error("Could not obtain video from webcam.");try{this.webcamVideoElement.srcObject=this.stream}catch(t){console.log(t),this.webcamVideoElement.src=window.URL.createObjectURL(this.stream)}return this.webcamVideoElement.play(),this.isClosed=!1,new Promise(e=>{this.webcamVideoElement.onloadedmetadata=()=>{e()}})})}next(){return e(this,null,function*(){if(this.isClosed)return{value:null,done:!0};let e;try{e=jm(this.webcamVideoElement)}catch(t){throw new Error(`Error thrown converting video to pixels: ${JSON.stringify(t)}`)}if(!this.resize)return{value:e,done:!1};try{return{value:this.cropAndResizeFrame(e),done:!1}}catch(t){throw new Error(`Error thrown cropping the video: ${t.message}`)}finally{e.dispose()}})}needToResize(){return!(!this.webcamConfig.resizeWidth||!this.webcamConfig.resizeHeight||this.webcamVideoElement.width===this.webcamConfig.resizeWidth&&this.webcamVideoElement.height===this.webcamConfig.resizeHeight)}cropAndResizeFrame(e){return Qr(()=>{const t=us(Xe(e,"float32"),0);let a;a=ws.cropAndResize(t,this.cropBox,this.cropBoxInd,this.cropSize,"bilinear");const n=a.shape;return N(a,n.slice(1))})}capture(){return e(this,null,function*(){return(yield this.next()).value})}stop(){this.stream.getTracks().forEach(e=>e.stop());try{this.webcamVideoElement.srcObject=null}catch(e){console.log(e),this.webcamVideoElement.src=null}this.isClosed=!0}toArray(){throw new Error("Can not convert infinite video stream to array.")}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class Qd{}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class Xd extends eo{split(e){return new Zd(this,e)}}class Zd extends Xd{constructor(e,t){super(),this.upstream=e,this.impl=new Yd(e,t)}summary(){return this.impl.summary()}next(){return e(this,null,function*(){return this.impl.next()})}}class Yd extends to{constructor(e,t){super(),this.upstream=e,this.separator=t,this.carryover=""}summary(){return`${this.upstream.summary()} -> Split('${this.separator}')`}pump(){return e(this,null,function*(){const e=yield this.upstream.next();if(e.done)return""!==this.carryover&&(this.outputQueue.push(this.carryover),this.carryover="",!0);const t=e.value.split(this.separator);t[0]=this.carryover+t[0];for(const a of t.slice(0,-1))this.outputQueue.push(a);return this.carryover=t[t.length-1],!0})}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class eh extends eo{decodeUTF8(){return new th(this)}}class th extends Xd{constructor(e){super(),this.upstream=e,this.impl=new ah(e)}summary(){return this.impl.summary()}next(){return e(this,null,function*(){return this.impl.next()})}}class ah extends to{constructor(e){if(super(),this.upstream=e,Ee().get("IS_BROWSER"))this.decoder=new TextDecoder("utf-8");else{const{StringDecoder:e}=require("string_decoder");this.decoder=new e("utf8")}}summary(){return`${this.upstream.summary()} -> Utf8`}pump(){return e(this,null,function*(){const e=yield this.upstream.next();let t,a;return!e.done&&(t=e.value,a=Ee().get("IS_BROWSER")?this.decoder.decode(t,{stream:!0}):this.decoder.write(Buffer.from(t.buffer)),this.outputQueue.push(a),!0)})}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class nh extends eh{constructor(e,t={}){super(),this.file=e,this.options=t,a(e instanceof Uint8Array||!!Ee().get("IS_BROWSER")&&(e instanceof File||e instanceof Blob),()=>"FileChunkIterator only supports File, Blob and Uint8Array right now."),this.offset=t.offset||0,this.chunkSize=t.chunkSize||1048576}summary(){return`FileChunks ${this.file}`}next(){return e(this,null,function*(){if(this.offset>=(this.file instanceof Uint8Array?this.file.byteLength:this.file.size))return{value:null,done:!0};const e=new Promise((e,t)=>{const a=this.offset+this.chunkSize;if(this.file instanceof Uint8Array)e(new Uint8Array(this.file.slice(this.offset,a)));else{const n=new FileReader;n.onload=a=>{let s=n.result;if(s instanceof ArrayBuffer&&(s=new Uint8Array(s)),!(s instanceof Uint8Array))return t(new TypeError("FileReader returned unknown type."));e(s)},n.onabort=e=>t(new Error("Aborted")),n.onerror=e=>t(new Error(e.type));const s=this.file.slice(this.offset,a);n.readAsArrayBuffer(s)}this.offset=a});return{value:yield e,done:!1}})}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */const sh=e=>({method:e.method,headers:e.headers,body:e.body,mode:e.mode,credentials:e.credentials,cache:e.cache,redirect:e.redirect,referrer:e.referrer,integrity:e.integrity});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */function rh(e){return"string"==typeof e&&"file://"===e.slice(0,7)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class oh extends Qd{constructor(e,t={}){super(),this.input=e,this.options=t}iterator(){return e(this,null,function*(){if(rh(this.input)&&Ee().get("IS_NODE")){const e=require("fs");this.input=e.readFileSync(this.input.slice(7))}return new nh(this.input,this.options)})}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class ih extends Qd{constructor(e,t={}){super(),this.url=e,this.fileOptions=t}iterator(){return e(this,null,function*(){return rh(this.url)?new oh(this.url,this.fileOptions).iterator():function(t){return e(this,arguments,function*(e,t={},a){let n,s;"string"==typeof e?n=e:(n=e.url,s=sh(e));const r=yield(a||ao)(n,s);if(r.ok){const e=new Uint8Array(yield r.arrayBuffer());return new nh(e,t)}throw new Error(r.statusText)})}(this.url,this.fileOptions)})}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */
/** @license See the LICENSE file. */
const ph="4.22.0",uh=Object.freeze(Object.defineProperty({__proto__:null,CSVDataset:Gd,Dataset:Yr,FileDataSource:oh,TextLineDataset:Rd,URLDataSource:ih,array:ro,csv:function(e,t={}){return new Gd(new ih(e),t)},func:function(t){const a=no(t);return so(()=>e(this,null,function*(){return a}))},generator:function(t){return so(()=>e(this,null,function*(){const e=yield t();return no(()=>e.next())}))},microphone:function(t){return e(this,null,function*(){return Kd.create(t)})},version_data:ph,webcam:function(t,a){return e(this,null,function*(){return Jd.create(t,a)})},zip:oo},Symbol.toStringTag,{value:"Module"})),lh="4.22.0",mh="4.22.0",ch={"tfjs-core":qm,"tfjs-backend-cpu":lh,"tfjs-backend-webgl":mh,"tfjs-data":ph,"tfjs-layers":io,"tfjs-converter":Fd,tfjs:"4.22.0"};
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */export{po as Abs,uo as Acos,lo as Acosh,mo as AdadeltaOptimizer,co as AdagradOptimizer,ho as AdamOptimizer,fo as AdamaxOptimizer,yo as Add,o as AddN,go as All,bo as Any,No as ArgMax,wo as ArgMin,xo as Asin,So as Asinh,To as Atan,vo as Atan2,Oo as Atanh,_o as AvgPool,Eo as AvgPool3D,Ao as AvgPool3DGrad,ko as AvgPoolGrad,Mo as BatchMatMul,Co as BatchToSpaceND,Io as Bincount,h as BitwiseAnd,f as BroadcastArgs,Do as BroadcastTo,cc as Callback,zo as CallbackList,$o as Cast,Vo as Ceil,Lo as ClipByValue,Po as Complex,Fo as ComplexAbs,Ro as Concat,jo as Conv2D,Bo as Conv2DBackpropFilter,qo as Conv2DBackpropInput,Wo as Conv3D,Ho as Conv3DBackpropFilterV2,Uo as Conv3DBackpropInputV2,Go as Cos,Ko as Cosh,Jo as CropAndResize,Qo as Cumprod,Xo as Cumsum,Zo as CustomCallback,Yo as DataStorage,ei as DenseBincount,ti as DepthToSpace,ai as DepthwiseConv2dNative,ni as DepthwiseConv2dNativeBackpropFilter,si as DepthwiseConv2dNativeBackpropInput,y as Diag,ri as Dilation2D,oi as Dilation2DBackpropFilter,ii as Dilation2DBackpropInput,et as Draw,pi as ENV,fc as EarlyStopping,ui as Einsum,li as Elu,mi as EluGrad,ci as Environment,di as Equal,hi as Erf,fi as Exp,yi as ExpandDims,gi as Expm1,bi as FFT,Ni as Fill,wi as FlipLeftRight,xi as Floor,Si as FloorDiv,tt as FromPixels,Ti as FusedBatchNorm,vi as FusedConv2D,ye as FusedDepthwiseConv2D,Oi as GPGPUContext,se as GatherNd,_i as GatherV2,Vd as GraphModel,Ei as Greater,Ai as GreaterEqual,ki as History,Mi as IFFT,Ci as Identity,Ii as Imag,Di as InputSpec,zi as IsFinite,$i as IsInf,Vi as IsNan,Li as KernelBackend,Pi as LRN,Fi as LRNGrad,Ri as LayerVariable,vt as LayersModel,ji as LeakyRelu,Bi as Less,qi as LessEqual,b as LinSpace,Wi as Log,Hi as Log1p,Ui as LogSoftmax,Gi as LogicalAnd,Ki as LogicalNot,Ji as LogicalOr,Qi as LogicalXor,Xi as LowerBound,Zi as MathBackendCPU,Yi as MathBackendWebGL,ep as MatrixBandPart,tp as Max,ap as MaxPool,np as MaxPool3D,sp as MaxPool3DGrad,rp as MaxPoolGrad,S as MaxPoolWithArgmax,op as Maximum,ip as Mean,pp as Min,up as Minimum,lp as MirrorPad,mp as Mod,cp as MomentumOptimizer,_ as Multinomial,dp as Multiply,hp as Neg,fp as NonMaxSuppressionV3,yp as NonMaxSuppressionV4,gp as NonMaxSuppressionV5,bp as NotEqual,mn as OP_SCOPE_SUFFIX,Np as OneHot,wp as OnesLike,xp as Optimizer,Sp as OptimizerConstructors,Tp as Pack,vp as PadV2,Op as Pool,_p as Pow,Ep as Prelu,Ap as Prod,kp as RMSPropOptimizer,Ea as RNN,A as RaggedGather,k as RaggedRange,M as RaggedTensorToTensor,Mp as Range,Cp as Rank,Ip as Real,Dp as RealDiv,zp as Reciprocal,$p as Reduction,Vp as Relu,Lp as Relu6,Pp as Reshape,Fp as ResizeBilinear,Rp as ResizeBilinearGrad,jp as ResizeNearestNeighbor,Bp as ResizeNearestNeighborGrad,qp as Reverse,Wp as RotateWithOffset,Hp as Round,Up as Rsqrt,Gp as SGDOptimizer,ae as ScatterNd,x as SearchSorted,Kp as Select,Jp as Selu,Ot as Sequential,Qp as Sigmoid,Xp as Sign,Zp as Sin,Yp as Sinh,eu as Slice,tu as Softmax,au as Softplus,nu as SpaceToBatchND,su as SparseFillEmptyRows,ru as SparseReshape,ou as SparseSegmentMean,iu as SparseSegmentSum,ne as SparseToDense,pu as SplitV,uu as Sqrt,lu as Square,mu as SquaredDifference,cu as StaticRegexReplace,du as Step,hu as StridedSlice,fu as StringNGrams,yu as StringSplit,gu as StringToHashBucketFast,bu as Sub,Nu as Sum,wu as SymbolicTensor,xu as Tan,Su as Tanh,T as Tensor,B as TensorBuffer,U as TensorScatterUpdate,Tu as Tile,vu as TopK,Ou as Transform,_u as Transpose,Eu as Unique,Au as Unpack,ku as UnsortedSegmentSum,Mu as UpperBound,Cu as Variable,Iu as ZerosLike,Du as _FusedMatMul,cn as abs,dn as acos,hn as acosh,u as add,Ml as addN,fn as all,yn as any,gn as argMax,bn as argMin,Nn as asin,wn as asinh,xn as atan,Sn as atan2,Tn as atanh,vn as avgPool,On as avgPool3d,zu as backend,$u as backend_util,Cl as basicLSTMCell,_n as batchNorm,En as batchNorm2d,An as batchNorm3d,kn as batchNorm4d,Mn as batchToSpaceND,Cn as bincount,Il as bitwiseAnd,bm as booleanMaskAsync,Dl as broadcastArgs,In as broadcastTo,Vu as broadcast_util,Bm as browser,P as buffer,yc as callbacks,Xe as cast,Dn as ceil,zn as clipByValue,un as clone,$n as complex,i as concat,Vn as concat1d,Ln as concat2d,Pn as concat3d,Fn as concat4d,Hm as constraints,Rn as conv1d,jn as conv2d,Bn as conv2dTranspose,qn as conv3d,Wn as conv3dTranspose,Lu as copyRegisteredKernels,Hn as cos,Un as cosh,Gn as cosineWindow,Kn as cumprod,Jn as cumsum,fe as customGrad,uh as data,Qn as denseBincount,Pu as deprecationWarn,Xn as depthToSpace,pe as depthwiseConv2d,wc as deregisterOp,Fu as device_util,zl as diag,Zn as dilation2d,Ru as disableDeprecationWarnings,Zr as dispose,ju as disposeVariables,ee as div,Yn as divNoNan,es as dot,ts as dropout,as as einsum,ns as elu,Bu as enableDebugMode,qu as enableProdMode,ss as enclosingPowerOfTwo,Wu as engine,$l as ensureShape,Ee as env,rs as equal,os as erf,is as euclideanNorm,ps as exp,us as expandDims,ls as expm1,ms as eye,cs as fft,ds as fill,Hu as findBackend,Uu as findBackendFactory,hs as floor,fs as floorDiv,Gu as forceHalfFloat,Om as fused,Q as gather,Sm as gatherND,Ku as gather_util,Ju as getBackend,Qu as getGradient,Ye as getKernel,Xu as getKernelsForBackend,Zu as gpgpu_util,Yu as grad,el as grads,ys as greater,gs as greaterEqual,bs as ifft,Ns as imag,ws as image,Tm as inTopKAsync,Um as initializers,Jm as input,Dm as io,xs as irfft,Ss as isFinite,Ts as isInf,vs as isNaN,Jr as keep,Wm as kernel_impls,pc as layers,Os as leakyRelu,_s as less,Es as lessEqual,As as linalg,Vl as linspace,Ld as loadGraphModel,Pd as loadGraphModelSync,tl as loadLayersModel,ks as localResponseNormalization,Ms as log,Cs as log1p,Is as logSigmoid,Ds as logSoftmax,zs as logSumExp,$s as logicalAnd,Vs as logicalNot,Ls as logicalOr,Ps as logicalXor,Fs as losses,Fl as lowerBound,p as matMul,$m as math,Rs as max,js as maxPool,Bs as maxPool3d,Rl as maxPoolWithArgmax,qs as maximum,Ws as mean,al as memory,jl as meshgrid,uc as metrics,Hs as min,Us as minimum,Gs as mirrorPad,Ks as mod,Gm as model,lc as models,Js as moments,Nm as movingAverage,m as mul,Bl as multiRNNCell,ql as multinomial,Qs as neg,nl as nextFrame,Xs as norm,Zs as notEqual,Qe as oneHot,v as ones,Ys as onesLike,t as op,Wl as outerProduct,E as pad,Hl as pad1d,Ul as pad2d,Gl as pad3d,Kl as pad4d,er as pool,te as pow,tr as prelu,ar as print,nr as prod,sl as profile,Jl as raggedGather,Ql as raggedRange,Xl as raggedTensorToTensor,Zl as rand,nm as randomGamma,F as randomNormal,sm as randomStandardNormal,R as randomUniform,rm as randomUniformInt,sr as range,rl as ready,rr as real,or as reciprocal,ol as registerBackend,Qm as registerCallbackConstructor,il as registerGradient,pl as registerKernel,bc as registerOp,mc as regularizers,ir as relu,pr as relu6,ul as removeBackend,N as reshape,j as reverse,om as reverse1d,im as reverse2d,pm as reverse3d,um as reverse4d,ur as rfft,lr as round,mr as rsqrt,Z as scalar,wm as scatterND,ll as scatter_util,Pl as searchSorted,cr as selu,dr as separableConv2d,Km as sequential,ml as serialization,cl as setBackend,dl as setPlatform,hl as setWebGLContext,lm as setdiff1dAsync,fl as shared,c as sigmoid,hr as sign,fr as signal,yr as sin,gr as sinh,l as slice,br as slice1d,Nr as slice2d,wr as slice3d,xr as slice4d,yl as slice_util,Sr as softmax,Tr as softplus,vr as spaceToBatchND,Or as sparse,xm as sparseToDense,_r as spectral,Er as split,Ar as sqrt,kr as square,Mr as squaredDifference,J as squeeze,Cr as stack,Ir as step,Dr as stridedSlice,zr as string,Y as sub,$r as sum,gl as sumOutType,Vr as tan,d as tanh,oe as tensor,Lr as tensor1d,Pr as tensor2d,mm as tensor3d,cm as tensor4d,dm as tensor5d,hm as tensor6d,fm as tensorScatterUpdate,bl as tensor_util,am as test_util,Qr as tidy,Fr as tile,Nl as time,Rr as topk,wl as train,Ze as transpose,jr as truncatedNormal,Br as unique,xl as unregisterGradient,Sl as unregisterKernel,qr as unsortedSegmentSum,Wr as unstack,Tl as upcastType,ym as upperBound,vl as util,Ol as valueAndGrad,_l as valueAndGrads,Hr as variable,El as variableGrads,ch as version,Fd as version_converter,qm as version_core,lh as version_cpu,io as version_layers,mh as version_webgl,Al as webgl,kl as webgl_util,Ur as where,gm as whereAsync,Gr as zeros,Kr as zerosLike};
//# sourceMappingURL=index-295bde5e.js.map
