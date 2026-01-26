(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ha="174",Rn={ROTATE:0,DOLLY:1,PAN:2},Ri={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},oh=0,Oa=1,ah=2,cc=1,hc=2,Mn=3,Ct=0,Rt=1,at=2,Vn=0,Mt=1,gr=2,_r=3,yr=4,lr=5,si=100,lh=101,ch=102,hh=103,dh=104,uh=200,ph=201,fh=202,mh=203,yo=204,xo=205,gh=206,_h=207,yh=208,xh=209,vh=210,bh=211,Sh=212,Mh=213,Eh=214,vo=0,bo=1,So=2,Oi=3,Mo=4,Eo=5,wo=6,To=7,dc=0,wh=1,Th=2,Gn=0,Ah=1,Ch=2,Rh=3,uc=4,Ph=5,Ih=6,Lh=7,Ba="attached",Dh="detached",pc=300,Bi=301,ki=302,xr=303,Ao=304,Tr=306,zi=1e3,Jt=1001,vr=1002,Ot=1003,fc=1004,ms=1005,ht=1006,cr=1007,un=1008,In=1009,mc=1010,gc=1011,vs=1012,da=1013,li=1014,Vt=1015,Tn=1016,ua=1017,pa=1018,Hi=1020,_c=35902,yc=1021,xc=1022,en=1023,vc=1024,bc=1025,Di=1026,Vi=1027,fa=1028,ma=1029,Sc=1030,ga=1031,_a=1033,hr=33776,dr=33777,ur=33778,pr=33779,Co=35840,Ro=35841,Po=35842,Io=35843,Lo=36196,Do=37492,Fo=37496,Uo=37808,No=37809,Oo=37810,Bo=37811,ko=37812,zo=37813,Ho=37814,Vo=37815,Go=37816,Wo=37817,$o=37818,qo=37819,Xo=37820,jo=37821,fr=36492,Yo=36494,Ko=36495,Mc=36283,Zo=36284,Qo=36285,Jo=36286,Fh=2200,Uh=2201,Nh=2202,bs=2300,Ss=2301,Lr=2302,Pi=2400,Ii=2401,br=2402,ya=2500,Oh=2501,Bh=0,Ec=1,ea=2,kh=3200,zh=3201,wc=0,Hh=1,Hn="",_t="srgb",wt="srgb-linear",Sr="linear",it="srgb",pi=7680,ka=519,Vh=512,Gh=513,Wh=514,Tc=515,$h=516,qh=517,Xh=518,jh=519,ta=35044,za="300 es",An=2e3,Mr=2001;class $n{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(n);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Tt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ha=1234567;const _s=Math.PI/180,Gi=180/Math.PI;function ln(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Tt[o&255]+Tt[o>>8&255]+Tt[o>>16&255]+Tt[o>>24&255]+"-"+Tt[e&255]+Tt[e>>8&255]+"-"+Tt[e>>16&15|64]+Tt[e>>24&255]+"-"+Tt[n&63|128]+Tt[n>>8&255]+"-"+Tt[n>>16&255]+Tt[n>>24&255]+Tt[i&255]+Tt[i>>8&255]+Tt[i>>16&255]+Tt[i>>24&255]).toLowerCase()}function Be(o,e,n){return Math.max(e,Math.min(n,o))}function xa(o,e){return(o%e+e)%e}function Yh(o,e,n,i,s){return i+(o-e)*(s-i)/(n-e)}function Kh(o,e,n){return o!==e?(n-o)/(e-o):0}function ys(o,e,n){return(1-n)*o+n*e}function Zh(o,e,n,i){return ys(o,e,1-Math.exp(-n*i))}function Qh(o,e=1){return e-Math.abs(xa(o,e*2)-e)}function Jh(o,e,n){return o<=e?0:o>=n?1:(o=(o-e)/(n-e),o*o*(3-2*o))}function ed(o,e,n){return o<=e?0:o>=n?1:(o=(o-e)/(n-e),o*o*o*(o*(o*6-15)+10))}function td(o,e){return o+Math.floor(Math.random()*(e-o+1))}function nd(o,e){return o+Math.random()*(e-o)}function id(o){return o*(.5-Math.random())}function sd(o){o!==void 0&&(Ha=o);let e=Ha+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function rd(o){return o*_s}function od(o){return o*Gi}function ad(o){return(o&o-1)===0&&o!==0}function ld(o){return Math.pow(2,Math.ceil(Math.log(o)/Math.LN2))}function cd(o){return Math.pow(2,Math.floor(Math.log(o)/Math.LN2))}function hd(o,e,n,i,s){const r=Math.cos,a=Math.sin,l=r(n/2),h=a(n/2),c=r((e+i)/2),d=a((e+i)/2),u=r((e-i)/2),p=a((e-i)/2),m=r((i-e)/2),y=a((i-e)/2);switch(s){case"XYX":o.set(l*d,h*u,h*p,l*c);break;case"YZY":o.set(h*p,l*d,h*u,l*c);break;case"ZXZ":o.set(h*u,h*p,l*d,l*c);break;case"XZX":o.set(l*d,h*y,h*m,l*c);break;case"YXY":o.set(h*m,l*d,h*y,l*c);break;case"ZYZ":o.set(h*y,h*m,l*d,l*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function on(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function tt(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}const Ac={DEG2RAD:_s,RAD2DEG:Gi,generateUUID:ln,clamp:Be,euclideanModulo:xa,mapLinear:Yh,inverseLerp:Kh,lerp:ys,damp:Zh,pingpong:Qh,smoothstep:Jh,smootherstep:ed,randInt:td,randFloat:nd,randFloatSpread:id,seededRandom:sd,degToRad:rd,radToDeg:od,isPowerOfTwo:ad,ceilPowerOfTwo:ld,floorPowerOfTwo:cd,setQuaternionFromProperEuler:hd,normalize:tt,denormalize:on};class Ce{constructor(e=0,n=0){Ce.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Be(this.x,e.x,n.x),this.y=Be(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Be(this.x,e,n),this.y=Be(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Be(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Be(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),s=Math.sin(n),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ue{constructor(e,n,i,s,r,a,l,h,c){Ue.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,s,r,a,l,h,c)}set(e,n,i,s,r,a,l,h,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=l,d[3]=n,d[4]=r,d[5]=h,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,s=n.elements,r=this.elements,a=i[0],l=i[3],h=i[6],c=i[1],d=i[4],u=i[7],p=i[2],m=i[5],y=i[8],_=s[0],g=s[3],f=s[6],S=s[1],w=s[4],x=s[7],P=s[2],I=s[5],A=s[8];return r[0]=a*_+l*S+h*P,r[3]=a*g+l*w+h*I,r[6]=a*f+l*x+h*A,r[1]=c*_+d*S+u*P,r[4]=c*g+d*w+u*I,r[7]=c*f+d*x+u*A,r[2]=p*_+m*S+y*P,r[5]=p*g+m*w+y*I,r[8]=p*f+m*x+y*A,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],s=e[2],r=e[3],a=e[4],l=e[5],h=e[6],c=e[7],d=e[8];return n*a*d-n*l*c-i*r*d+i*l*h+s*r*c-s*a*h}invert(){const e=this.elements,n=e[0],i=e[1],s=e[2],r=e[3],a=e[4],l=e[5],h=e[6],c=e[7],d=e[8],u=d*a-l*c,p=l*h-d*r,m=c*r-a*h,y=n*u+i*p+s*m;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/y;return e[0]=u*_,e[1]=(s*c-d*i)*_,e[2]=(l*i-s*a)*_,e[3]=p*_,e[4]=(d*n-s*h)*_,e[5]=(s*r-l*n)*_,e[6]=m*_,e[7]=(i*h-c*n)*_,e[8]=(a*n-i*r)*_,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,s,r,a,l){const h=Math.cos(r),c=Math.sin(r);return this.set(i*h,i*c,-i*(h*a+c*l)+a+e,-s*c,s*h,-s*(-c*a+h*l)+l+n,0,0,1),this}scale(e,n){return this.premultiply(Dr.makeScale(e,n)),this}rotate(e){return this.premultiply(Dr.makeRotation(-e)),this}translate(e,n){return this.premultiply(Dr.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Dr=new Ue;function Cc(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function Ms(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function dd(){const o=Ms("canvas");return o.style.display="block",o}const Va={};function ni(o){o in Va||(Va[o]=!0,console.warn(o))}function ud(o,e,n){return new Promise(function(i,s){function r(){switch(o.clientWaitSync(e,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:s();break;case o.TIMEOUT_EXPIRED:setTimeout(r,n);break;default:i()}}setTimeout(r,n)})}function pd(o){const e=o.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function fd(o){const e=o.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ga=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wa=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function md(){const o={enabled:!0,workingColorSpace:wt,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===it&&(s.r=Pn(s.r),s.g=Pn(s.g),s.b=Pn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===it&&(s.r=Fi(s.r),s.g=Fi(s.g),s.b=Fi(s.b))),s},fromWorkingColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},toWorkingColorSpace:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Hn?Sr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return o.define({[wt]:{primaries:e,whitePoint:i,transfer:Sr,toXYZ:Ga,fromXYZ:Wa,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:_t},outputColorSpaceConfig:{drawingBufferColorSpace:_t}},[_t]:{primaries:e,whitePoint:i,transfer:it,toXYZ:Ga,fromXYZ:Wa,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:_t}}}),o}const qe=md();function Pn(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function Fi(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let fi;class gd{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{fi===void 0&&(fi=Ms("canvas")),fi.width=e.width,fi.height=e.height;const i=fi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=fi}return n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Ms("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Pn(r[a]/255)*255;return i.putImageData(s,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Pn(n[i]/255)*255):n[i]=Pn(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let _d=0;class va{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_d++}),this.uuid=ln(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,l=s.length;a<l;a++)s[a].isDataTexture?r.push(Fr(s[a].image)):r.push(Fr(s[a]))}else r=Fr(s);i.url=r}return n||(e.images[this.uuid]=i),i}}function Fr(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?gd.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let yd=0;class yt extends $n{constructor(e=yt.DEFAULT_IMAGE,n=yt.DEFAULT_MAPPING,i=Jt,s=Jt,r=ht,a=un,l=en,h=In,c=yt.DEFAULT_ANISOTROPY,d=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:yd++}),this.uuid=ln(),this.name="",this.source=new va(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=l,this.internalFormat=null,this.type=h,this.offset=new Ce(0,0),this.repeat=new Ce(1,1),this.center=new Ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==pc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case zi:e.x=e.x-Math.floor(e.x);break;case Jt:e.x=e.x<0?0:1;break;case vr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case zi:e.y=e.y-Math.floor(e.y);break;case Jt:e.y=e.y<0?0:1;break;case vr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}yt.DEFAULT_IMAGE=null;yt.DEFAULT_MAPPING=pc;yt.DEFAULT_ANISOTROPY=1;class Ke{constructor(e=0,n=0,i=0,s=1){Ke.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,s){return this.x=e,this.y=n,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*n+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*n+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*n+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,s,r;const h=e.elements,c=h[0],d=h[4],u=h[8],p=h[1],m=h[5],y=h[9],_=h[2],g=h[6],f=h[10];if(Math.abs(d-p)<.01&&Math.abs(u-_)<.01&&Math.abs(y-g)<.01){if(Math.abs(d+p)<.1&&Math.abs(u+_)<.1&&Math.abs(y+g)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const w=(c+1)/2,x=(m+1)/2,P=(f+1)/2,I=(d+p)/4,A=(u+_)/4,C=(y+g)/4;return w>x&&w>P?w<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(w),s=I/i,r=A/i):x>P?x<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),i=I/s,r=C/s):P<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),i=A/r,s=C/r),this.set(i,s,r,n),this}let S=Math.sqrt((g-y)*(g-y)+(u-_)*(u-_)+(p-d)*(p-d));return Math.abs(S)<.001&&(S=1),this.x=(g-y)/S,this.y=(u-_)/S,this.z=(p-d)/S,this.w=Math.acos((c+m+f-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Be(this.x,e.x,n.x),this.y=Be(this.y,e.y,n.y),this.z=Be(this.z,e.z,n.z),this.w=Be(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Be(this.x,e,n),this.y=Be(this.y,e,n),this.z=Be(this.z,e,n),this.w=Be(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Be(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xd extends $n{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Ke(0,0,e,n),this.scissorTest=!1,this.viewport=new Ke(0,0,e,n);const s={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ht,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new yt(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let l=0;l<a;l++)this.textures[l]=r.clone(),this.textures[l].isRenderTargetTexture=!0,this.textures[l].renderTarget=this;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=n,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const s=Object.assign({},e.textures[n].image);this.textures[n].source=new va(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ci extends xd{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class Rc extends yt{constructor(e=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=Jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class vd extends yt{constructor(e=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=Jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xt{constructor(e=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=s}static slerpFlat(e,n,i,s,r,a,l){let h=i[s+0],c=i[s+1],d=i[s+2],u=i[s+3];const p=r[a+0],m=r[a+1],y=r[a+2],_=r[a+3];if(l===0){e[n+0]=h,e[n+1]=c,e[n+2]=d,e[n+3]=u;return}if(l===1){e[n+0]=p,e[n+1]=m,e[n+2]=y,e[n+3]=_;return}if(u!==_||h!==p||c!==m||d!==y){let g=1-l;const f=h*p+c*m+d*y+u*_,S=f>=0?1:-1,w=1-f*f;if(w>Number.EPSILON){const P=Math.sqrt(w),I=Math.atan2(P,f*S);g=Math.sin(g*I)/P,l=Math.sin(l*I)/P}const x=l*S;if(h=h*g+p*x,c=c*g+m*x,d=d*g+y*x,u=u*g+_*x,g===1-l){const P=1/Math.sqrt(h*h+c*c+d*d+u*u);h*=P,c*=P,d*=P,u*=P}}e[n]=h,e[n+1]=c,e[n+2]=d,e[n+3]=u}static multiplyQuaternionsFlat(e,n,i,s,r,a){const l=i[s],h=i[s+1],c=i[s+2],d=i[s+3],u=r[a],p=r[a+1],m=r[a+2],y=r[a+3];return e[n]=l*y+d*u+h*m-c*p,e[n+1]=h*y+d*p+c*u-l*m,e[n+2]=c*y+d*m+l*p-h*u,e[n+3]=d*y-l*u-h*p-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,s){return this._x=e,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,s=e._y,r=e._z,a=e._order,l=Math.cos,h=Math.sin,c=l(i/2),d=l(s/2),u=l(r/2),p=h(i/2),m=h(s/2),y=h(r/2);switch(a){case"XYZ":this._x=p*d*u+c*m*y,this._y=c*m*u-p*d*y,this._z=c*d*y+p*m*u,this._w=c*d*u-p*m*y;break;case"YXZ":this._x=p*d*u+c*m*y,this._y=c*m*u-p*d*y,this._z=c*d*y-p*m*u,this._w=c*d*u+p*m*y;break;case"ZXY":this._x=p*d*u-c*m*y,this._y=c*m*u+p*d*y,this._z=c*d*y+p*m*u,this._w=c*d*u-p*m*y;break;case"ZYX":this._x=p*d*u-c*m*y,this._y=c*m*u+p*d*y,this._z=c*d*y-p*m*u,this._w=c*d*u+p*m*y;break;case"YZX":this._x=p*d*u+c*m*y,this._y=c*m*u+p*d*y,this._z=c*d*y-p*m*u,this._w=c*d*u-p*m*y;break;case"XZY":this._x=p*d*u-c*m*y,this._y=c*m*u-p*d*y,this._z=c*d*y+p*m*u,this._w=c*d*u+p*m*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],s=n[4],r=n[8],a=n[1],l=n[5],h=n[9],c=n[2],d=n[6],u=n[10],p=i+l+u;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(d-h)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(i>l&&i>u){const m=2*Math.sqrt(1+i-l-u);this._w=(d-h)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(l>u){const m=2*Math.sqrt(1+l-i-u);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(h+d)/m}else{const m=2*Math.sqrt(1+u-i-l);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(h+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Be(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,n/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,s=e._y,r=e._z,a=e._w,l=n._x,h=n._y,c=n._z,d=n._w;return this._x=i*d+a*l+s*c-r*h,this._y=s*d+a*h+r*l-i*c,this._z=r*d+a*c+i*h-s*l,this._w=a*d-i*l-s*h-r*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,a=this._w;let l=a*e._w+i*e._x+s*e._y+r*e._z;if(l<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,l=-l):this.copy(e),l>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const h=1-l*l;if(h<=Number.EPSILON){const m=1-n;return this._w=m*a+n*this._w,this._x=m*i+n*this._x,this._y=m*s+n*this._y,this._z=m*r+n*this._z,this.normalize(),this}const c=Math.sqrt(h),d=Math.atan2(c,l),u=Math.sin((1-n)*d)/c,p=Math.sin(n*d)/c;return this._w=a*u+this._w*p,this._x=i*u+this._x*p,this._y=s*u+this._y*p,this._z=r*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(n),r*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,n=0,i=0){D.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion($a.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion($a.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6]*s,this.y=r[1]*n+r[4]*i+r[7]*s,this.z=r[2]*n+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*n+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*n+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*n+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*n+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,s=this.z,r=e.x,a=e.y,l=e.z,h=e.w,c=2*(a*s-l*i),d=2*(l*n-r*s),u=2*(r*i-a*n);return this.x=n+h*c+a*u-l*d,this.y=i+h*d+l*c-r*u,this.z=s+h*u+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*n+r[4]*i+r[8]*s,this.y=r[1]*n+r[5]*i+r[9]*s,this.z=r[2]*n+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Be(this.x,e.x,n.x),this.y=Be(this.y,e.y,n.y),this.z=Be(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Be(this.x,e,n),this.y=Be(this.y,e,n),this.z=Be(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Be(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,s=e.y,r=e.z,a=n.x,l=n.y,h=n.z;return this.x=s*h-r*l,this.y=r*a-i*h,this.z=i*l-s*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ur.copy(this).projectOnVector(e),this.sub(Ur)}reflect(e){return this.sub(Ur.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Be(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return n*n+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const s=Math.sin(n)*e;return this.x=s*Math.sin(i),this.y=Math.cos(n)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ur=new D,$a=new Xt;class Ln{constructor(e=new D(1/0,1/0,1/0),n=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(nn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(nn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=nn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(n===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,l=r.count;a<l;a++)e.isMesh===!0?e.getVertexPosition(a,nn):nn.fromBufferAttribute(r,a),nn.applyMatrix4(e.matrixWorld),this.expandByPoint(nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ps.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ps.copy(i.boundingBox)),Ps.applyMatrix4(e.matrixWorld),this.union(Ps)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,nn),nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(os),Is.subVectors(this.max,os),mi.subVectors(e.a,os),gi.subVectors(e.b,os),_i.subVectors(e.c,os),Dn.subVectors(gi,mi),Fn.subVectors(_i,gi),Yn.subVectors(mi,_i);let n=[0,-Dn.z,Dn.y,0,-Fn.z,Fn.y,0,-Yn.z,Yn.y,Dn.z,0,-Dn.x,Fn.z,0,-Fn.x,Yn.z,0,-Yn.x,-Dn.y,Dn.x,0,-Fn.y,Fn.x,0,-Yn.y,Yn.x,0];return!Nr(n,mi,gi,_i,Is)||(n=[1,0,0,0,1,0,0,0,1],!Nr(n,mi,gi,_i,Is))?!1:(Ls.crossVectors(Dn,Fn),n=[Ls.x,Ls.y,Ls.z],Nr(n,mi,gi,_i,Is))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const _n=[new D,new D,new D,new D,new D,new D,new D,new D],nn=new D,Ps=new Ln,mi=new D,gi=new D,_i=new D,Dn=new D,Fn=new D,Yn=new D,os=new D,Is=new D,Ls=new D,Kn=new D;function Nr(o,e,n,i,s){for(let r=0,a=o.length-3;r<=a;r+=3){Kn.fromArray(o,r);const l=s.x*Math.abs(Kn.x)+s.y*Math.abs(Kn.y)+s.z*Math.abs(Kn.z),h=e.dot(Kn),c=n.dot(Kn),d=i.dot(Kn);if(Math.max(-Math.max(h,c,d),Math.min(h,c,d))>l)return!1}return!0}const bd=new Ln,as=new D,Or=new D;class mn{constructor(e=new D,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):bd.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;as.subVectors(e,this.center);const n=as.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(as,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Or.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(as.copy(e.center).add(Or)),this.expandByPoint(as.copy(e.center).sub(Or))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const yn=new D,Br=new D,Ds=new D,Un=new D,kr=new D,Fs=new D,zr=new D;class ji{constructor(e=new D,n=new D(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,yn)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=yn.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(yn.copy(this.origin).addScaledVector(this.direction,n),yn.distanceToSquared(e))}distanceSqToSegment(e,n,i,s){Br.copy(e).add(n).multiplyScalar(.5),Ds.copy(n).sub(e).normalize(),Un.copy(this.origin).sub(Br);const r=e.distanceTo(n)*.5,a=-this.direction.dot(Ds),l=Un.dot(this.direction),h=-Un.dot(Ds),c=Un.lengthSq(),d=Math.abs(1-a*a);let u,p,m,y;if(d>0)if(u=a*h-l,p=a*l-h,y=r*d,u>=0)if(p>=-y)if(p<=y){const _=1/d;u*=_,p*=_,m=u*(u+a*p+2*l)+p*(a*u+p+2*h)+c}else p=r,u=Math.max(0,-(a*p+l)),m=-u*u+p*(p+2*h)+c;else p=-r,u=Math.max(0,-(a*p+l)),m=-u*u+p*(p+2*h)+c;else p<=-y?(u=Math.max(0,-(-a*r+l)),p=u>0?-r:Math.min(Math.max(-r,-h),r),m=-u*u+p*(p+2*h)+c):p<=y?(u=0,p=Math.min(Math.max(-r,-h),r),m=p*(p+2*h)+c):(u=Math.max(0,-(a*r+l)),p=u>0?r:Math.min(Math.max(-r,-h),r),m=-u*u+p*(p+2*h)+c);else p=a>0?-r:r,u=Math.max(0,-(a*p+l)),m=-u*u+p*(p+2*h)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Br).addScaledVector(Ds,p),m}intersectSphere(e,n){yn.subVectors(e.center,this.origin);const i=yn.dot(this.direction),s=yn.dot(yn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),l=i-a,h=i+a;return h<0?null:l<0?this.at(h,n):this.at(l,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,s,r,a,l,h;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,p=this.origin;return c>=0?(i=(e.min.x-p.x)*c,s=(e.max.x-p.x)*c):(i=(e.max.x-p.x)*c,s=(e.min.x-p.x)*c),d>=0?(r=(e.min.y-p.y)*d,a=(e.max.y-p.y)*d):(r=(e.max.y-p.y)*d,a=(e.min.y-p.y)*d),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(l=(e.min.z-p.z)*u,h=(e.max.z-p.z)*u):(l=(e.max.z-p.z)*u,h=(e.min.z-p.z)*u),i>h||l>s)||((l>i||i!==i)&&(i=l),(h<s||s!==s)&&(s=h),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(e){return this.intersectBox(e,yn)!==null}intersectTriangle(e,n,i,s,r){kr.subVectors(n,e),Fs.subVectors(i,e),zr.crossVectors(kr,Fs);let a=this.direction.dot(zr),l;if(a>0){if(s)return null;l=1}else if(a<0)l=-1,a=-a;else return null;Un.subVectors(this.origin,e);const h=l*this.direction.dot(Fs.crossVectors(Un,Fs));if(h<0)return null;const c=l*this.direction.dot(kr.cross(Un));if(c<0||h+c>a)return null;const d=-l*Un.dot(zr);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Fe{constructor(e,n,i,s,r,a,l,h,c,d,u,p,m,y,_,g){Fe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,s,r,a,l,h,c,d,u,p,m,y,_,g)}set(e,n,i,s,r,a,l,h,c,d,u,p,m,y,_,g){const f=this.elements;return f[0]=e,f[4]=n,f[8]=i,f[12]=s,f[1]=r,f[5]=a,f[9]=l,f[13]=h,f[2]=c,f[6]=d,f[10]=u,f[14]=p,f[3]=m,f[7]=y,f[11]=_,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Fe().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,s=1/yi.setFromMatrixColumn(e,0).length(),r=1/yi.setFromMatrixColumn(e,1).length(),a=1/yi.setFromMatrixColumn(e,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*r,n[5]=i[5]*r,n[6]=i[6]*r,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),l=Math.sin(i),h=Math.cos(s),c=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const p=a*d,m=a*u,y=l*d,_=l*u;n[0]=h*d,n[4]=-h*u,n[8]=c,n[1]=m+y*c,n[5]=p-_*c,n[9]=-l*h,n[2]=_-p*c,n[6]=y+m*c,n[10]=a*h}else if(e.order==="YXZ"){const p=h*d,m=h*u,y=c*d,_=c*u;n[0]=p+_*l,n[4]=y*l-m,n[8]=a*c,n[1]=a*u,n[5]=a*d,n[9]=-l,n[2]=m*l-y,n[6]=_+p*l,n[10]=a*h}else if(e.order==="ZXY"){const p=h*d,m=h*u,y=c*d,_=c*u;n[0]=p-_*l,n[4]=-a*u,n[8]=y+m*l,n[1]=m+y*l,n[5]=a*d,n[9]=_-p*l,n[2]=-a*c,n[6]=l,n[10]=a*h}else if(e.order==="ZYX"){const p=a*d,m=a*u,y=l*d,_=l*u;n[0]=h*d,n[4]=y*c-m,n[8]=p*c+_,n[1]=h*u,n[5]=_*c+p,n[9]=m*c-y,n[2]=-c,n[6]=l*h,n[10]=a*h}else if(e.order==="YZX"){const p=a*h,m=a*c,y=l*h,_=l*c;n[0]=h*d,n[4]=_-p*u,n[8]=y*u+m,n[1]=u,n[5]=a*d,n[9]=-l*d,n[2]=-c*d,n[6]=m*u+y,n[10]=p-_*u}else if(e.order==="XZY"){const p=a*h,m=a*c,y=l*h,_=l*c;n[0]=h*d,n[4]=-u,n[8]=c*d,n[1]=p*u+_,n[5]=a*d,n[9]=m*u-y,n[2]=y*u-m,n[6]=l*d,n[10]=_*u+p}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Sd,e,Md)}lookAt(e,n,i){const s=this.elements;return $t.subVectors(e,n),$t.lengthSq()===0&&($t.z=1),$t.normalize(),Nn.crossVectors(i,$t),Nn.lengthSq()===0&&(Math.abs(i.z)===1?$t.x+=1e-4:$t.z+=1e-4,$t.normalize(),Nn.crossVectors(i,$t)),Nn.normalize(),Us.crossVectors($t,Nn),s[0]=Nn.x,s[4]=Us.x,s[8]=$t.x,s[1]=Nn.y,s[5]=Us.y,s[9]=$t.y,s[2]=Nn.z,s[6]=Us.z,s[10]=$t.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,s=n.elements,r=this.elements,a=i[0],l=i[4],h=i[8],c=i[12],d=i[1],u=i[5],p=i[9],m=i[13],y=i[2],_=i[6],g=i[10],f=i[14],S=i[3],w=i[7],x=i[11],P=i[15],I=s[0],A=s[4],C=s[8],E=s[12],v=s[1],R=s[5],z=s[9],O=s[13],V=s[2],q=s[6],G=s[10],Z=s[14],W=s[3],ne=s[7],ie=s[11],xe=s[15];return r[0]=a*I+l*v+h*V+c*W,r[4]=a*A+l*R+h*q+c*ne,r[8]=a*C+l*z+h*G+c*ie,r[12]=a*E+l*O+h*Z+c*xe,r[1]=d*I+u*v+p*V+m*W,r[5]=d*A+u*R+p*q+m*ne,r[9]=d*C+u*z+p*G+m*ie,r[13]=d*E+u*O+p*Z+m*xe,r[2]=y*I+_*v+g*V+f*W,r[6]=y*A+_*R+g*q+f*ne,r[10]=y*C+_*z+g*G+f*ie,r[14]=y*E+_*O+g*Z+f*xe,r[3]=S*I+w*v+x*V+P*W,r[7]=S*A+w*R+x*q+P*ne,r[11]=S*C+w*z+x*G+P*ie,r[15]=S*E+w*O+x*Z+P*xe,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],s=e[8],r=e[12],a=e[1],l=e[5],h=e[9],c=e[13],d=e[2],u=e[6],p=e[10],m=e[14],y=e[3],_=e[7],g=e[11],f=e[15];return y*(+r*h*u-s*c*u-r*l*p+i*c*p+s*l*m-i*h*m)+_*(+n*h*m-n*c*p+r*a*p-s*a*m+s*c*d-r*h*d)+g*(+n*c*u-n*l*m-r*a*u+i*a*m+r*l*d-i*c*d)+f*(-s*l*d-n*h*u+n*l*p+s*a*u-i*a*p+i*h*d)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=n,s[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],s=e[2],r=e[3],a=e[4],l=e[5],h=e[6],c=e[7],d=e[8],u=e[9],p=e[10],m=e[11],y=e[12],_=e[13],g=e[14],f=e[15],S=u*g*c-_*p*c+_*h*m-l*g*m-u*h*f+l*p*f,w=y*p*c-d*g*c-y*h*m+a*g*m+d*h*f-a*p*f,x=d*_*c-y*u*c+y*l*m-a*_*m-d*l*f+a*u*f,P=y*u*h-d*_*h-y*l*p+a*_*p+d*l*g-a*u*g,I=n*S+i*w+s*x+r*P;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/I;return e[0]=S*A,e[1]=(_*p*r-u*g*r-_*s*m+i*g*m+u*s*f-i*p*f)*A,e[2]=(l*g*r-_*h*r+_*s*c-i*g*c-l*s*f+i*h*f)*A,e[3]=(u*h*r-l*p*r-u*s*c+i*p*c+l*s*m-i*h*m)*A,e[4]=w*A,e[5]=(d*g*r-y*p*r+y*s*m-n*g*m-d*s*f+n*p*f)*A,e[6]=(y*h*r-a*g*r-y*s*c+n*g*c+a*s*f-n*h*f)*A,e[7]=(a*p*r-d*h*r+d*s*c-n*p*c-a*s*m+n*h*m)*A,e[8]=x*A,e[9]=(y*u*r-d*_*r-y*i*m+n*_*m+d*i*f-n*u*f)*A,e[10]=(a*_*r-y*l*r+y*i*c-n*_*c-a*i*f+n*l*f)*A,e[11]=(d*l*r-a*u*r-d*i*c+n*u*c+a*i*m-n*l*m)*A,e[12]=P*A,e[13]=(d*_*s-y*u*s+y*i*p-n*_*p-d*i*g+n*u*g)*A,e[14]=(y*l*s-a*_*s-y*i*h+n*_*h+a*i*g-n*l*g)*A,e[15]=(a*u*s-d*l*s+d*i*h-n*u*h-a*i*p+n*l*p)*A,this}scale(e){const n=this.elements,i=e.x,s=e.y,r=e.z;return n[0]*=i,n[4]*=s,n[8]*=r,n[1]*=i,n[5]*=s,n[9]*=r,n[2]*=i,n[6]*=s,n[10]*=r,n[3]*=i,n[7]*=s,n[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),s=Math.sin(n),r=1-i,a=e.x,l=e.y,h=e.z,c=r*a,d=r*l;return this.set(c*a+i,c*l-s*h,c*h+s*l,0,c*l+s*h,d*l+i,d*h-s*a,0,c*h-s*l,d*h+s*a,r*h*h+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,n,s,1,0,0,0,0,1),this}compose(e,n,i){const s=this.elements,r=n._x,a=n._y,l=n._z,h=n._w,c=r+r,d=a+a,u=l+l,p=r*c,m=r*d,y=r*u,_=a*d,g=a*u,f=l*u,S=h*c,w=h*d,x=h*u,P=i.x,I=i.y,A=i.z;return s[0]=(1-(_+f))*P,s[1]=(m+x)*P,s[2]=(y-w)*P,s[3]=0,s[4]=(m-x)*I,s[5]=(1-(p+f))*I,s[6]=(g+S)*I,s[7]=0,s[8]=(y+w)*A,s[9]=(g-S)*A,s[10]=(1-(p+_))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,n,i){const s=this.elements;let r=yi.set(s[0],s[1],s[2]).length();const a=yi.set(s[4],s[5],s[6]).length(),l=yi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],sn.copy(this);const c=1/r,d=1/a,u=1/l;return sn.elements[0]*=c,sn.elements[1]*=c,sn.elements[2]*=c,sn.elements[4]*=d,sn.elements[5]*=d,sn.elements[6]*=d,sn.elements[8]*=u,sn.elements[9]*=u,sn.elements[10]*=u,n.setFromRotationMatrix(sn),i.x=r,i.y=a,i.z=l,this}makePerspective(e,n,i,s,r,a,l=An){const h=this.elements,c=2*r/(n-e),d=2*r/(i-s),u=(n+e)/(n-e),p=(i+s)/(i-s);let m,y;if(l===An)m=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(l===Mr)m=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return h[0]=c,h[4]=0,h[8]=u,h[12]=0,h[1]=0,h[5]=d,h[9]=p,h[13]=0,h[2]=0,h[6]=0,h[10]=m,h[14]=y,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,n,i,s,r,a,l=An){const h=this.elements,c=1/(n-e),d=1/(i-s),u=1/(a-r),p=(n+e)*c,m=(i+s)*d;let y,_;if(l===An)y=(a+r)*u,_=-2*u;else if(l===Mr)y=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return h[0]=2*c,h[4]=0,h[8]=0,h[12]=-p,h[1]=0,h[5]=2*d,h[9]=0,h[13]=-m,h[2]=0,h[6]=0,h[10]=_,h[14]=-y,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const yi=new D,sn=new Fe,Sd=new D(0,0,0),Md=new D(1,1,1),Nn=new D,Us=new D,$t=new D,qa=new Fe,Xa=new Xt;class fn{constructor(e=0,n=0,i=0,s=fn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,s=this._order){return this._x=e,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],l=s[8],h=s[1],c=s[5],d=s[9],u=s[2],p=s[6],m=s[10];switch(n){case"XYZ":this._y=Math.asin(Be(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Be(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(l,m),this._z=Math.atan2(h,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Be(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(h,r));break;case"ZYX":this._y=Math.asin(-Be(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(h,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Be(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(l,m));break;case"XZY":this._z=Math.asin(-Be(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(l,r)):(this._x=Math.atan2(-d,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return qa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(qa,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Xa.setFromEuler(this),this.setFromQuaternion(Xa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fn.DEFAULT_ORDER="XYZ";class ba{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ed=0;const ja=new D,xi=new Xt,xn=new Fe,Ns=new D,ls=new D,wd=new D,Td=new Xt,Ya=new D(1,0,0),Ka=new D(0,1,0),Za=new D(0,0,1),Qa={type:"added"},Ad={type:"removed"},vi={type:"childadded",child:null},Hr={type:"childremoved",child:null};class dt extends $n{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ed++}),this.uuid=ln(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dt.DEFAULT_UP.clone();const e=new D,n=new fn,i=new Xt,s=new D(1,1,1);function r(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Fe},normalMatrix:{value:new Ue}}),this.matrix=new Fe,this.matrixWorld=new Fe,this.matrixAutoUpdate=dt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ba,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return xi.setFromAxisAngle(e,n),this.quaternion.multiply(xi),this}rotateOnWorldAxis(e,n){return xi.setFromAxisAngle(e,n),this.quaternion.premultiply(xi),this}rotateX(e){return this.rotateOnAxis(Ya,e)}rotateY(e){return this.rotateOnAxis(Ka,e)}rotateZ(e){return this.rotateOnAxis(Za,e)}translateOnAxis(e,n){return ja.copy(e).applyQuaternion(this.quaternion),this.position.add(ja.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Ya,e)}translateY(e){return this.translateOnAxis(Ka,e)}translateZ(e){return this.translateOnAxis(Za,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Ns.copy(e):Ns.set(e,n,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(ls,Ns,this.up):xn.lookAt(Ns,ls,this.up),this.quaternion.setFromRotationMatrix(xn),s&&(xn.extractRotation(s.matrixWorld),xi.setFromRotationMatrix(xn),this.quaternion.premultiply(xi.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Qa),vi.child=e,this.dispatchEvent(vi),vi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(Ad),Hr.child=e,this.dispatchEvent(Hr),Hr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(xn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Qa),vi.child=e,this.dispatchEvent(vi),vi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,e,wd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,Td,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(l,h){return l[h.uuid]===void 0&&(l[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const h=l.shapes;if(Array.isArray(h))for(let c=0,d=h.length;c<d;c++){const u=h[c];r(e.shapes,u)}else r(e.shapes,h)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let h=0,c=this.material.length;h<c;h++)l.push(r(e.materials,this.material[h]));s.material=l}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let l=0;l<this.children.length;l++)s.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let l=0;l<this.animations.length;l++){const h=this.animations[l];s.animations.push(r(e.animations,h))}}if(n){const l=a(e.geometries),h=a(e.materials),c=a(e.textures),d=a(e.images),u=a(e.shapes),p=a(e.skeletons),m=a(e.animations),y=a(e.nodes);l.length>0&&(i.geometries=l),h.length>0&&(i.materials=h),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),u.length>0&&(i.shapes=u),p.length>0&&(i.skeletons=p),m.length>0&&(i.animations=m),y.length>0&&(i.nodes=y)}return i.object=s,i;function a(l){const h=[];for(const c in l){const d=l[c];delete d.metadata,h.push(d)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}dt.DEFAULT_UP=new D(0,1,0);dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const rn=new D,vn=new D,Vr=new D,bn=new D,bi=new D,Si=new D,Ja=new D,Gr=new D,Wr=new D,$r=new D,qr=new Ke,Xr=new Ke,jr=new Ke;class an{constructor(e=new D,n=new D,i=new D){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,s){s.subVectors(i,n),rn.subVectors(e,n),s.cross(rn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,n,i,s,r){rn.subVectors(s,n),vn.subVectors(i,n),Vr.subVectors(e,n);const a=rn.dot(rn),l=rn.dot(vn),h=rn.dot(Vr),c=vn.dot(vn),d=vn.dot(Vr),u=a*c-l*l;if(u===0)return r.set(0,0,0),null;const p=1/u,m=(c*h-l*d)*p,y=(a*d-l*h)*p;return r.set(1-m-y,y,m)}static containsPoint(e,n,i,s){return this.getBarycoord(e,n,i,s,bn)===null?!1:bn.x>=0&&bn.y>=0&&bn.x+bn.y<=1}static getInterpolation(e,n,i,s,r,a,l,h){return this.getBarycoord(e,n,i,s,bn)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(r,bn.x),h.addScaledVector(a,bn.y),h.addScaledVector(l,bn.z),h)}static getInterpolatedAttribute(e,n,i,s,r,a){return qr.setScalar(0),Xr.setScalar(0),jr.setScalar(0),qr.fromBufferAttribute(e,n),Xr.fromBufferAttribute(e,i),jr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(qr,r.x),a.addScaledVector(Xr,r.y),a.addScaledVector(jr,r.z),a}static isFrontFacing(e,n,i,s){return rn.subVectors(i,n),vn.subVectors(e,n),rn.cross(vn).dot(s)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,s){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,n,i,s){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return rn.subVectors(this.c,this.b),vn.subVectors(this.a,this.b),rn.cross(vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return an.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return an.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,s,r){return an.getInterpolation(e,this.a,this.b,this.c,n,i,s,r)}containsPoint(e){return an.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return an.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,s=this.b,r=this.c;let a,l;bi.subVectors(s,i),Si.subVectors(r,i),Gr.subVectors(e,i);const h=bi.dot(Gr),c=Si.dot(Gr);if(h<=0&&c<=0)return n.copy(i);Wr.subVectors(e,s);const d=bi.dot(Wr),u=Si.dot(Wr);if(d>=0&&u<=d)return n.copy(s);const p=h*u-d*c;if(p<=0&&h>=0&&d<=0)return a=h/(h-d),n.copy(i).addScaledVector(bi,a);$r.subVectors(e,r);const m=bi.dot($r),y=Si.dot($r);if(y>=0&&m<=y)return n.copy(r);const _=m*c-h*y;if(_<=0&&c>=0&&y<=0)return l=c/(c-y),n.copy(i).addScaledVector(Si,l);const g=d*y-m*u;if(g<=0&&u-d>=0&&m-y>=0)return Ja.subVectors(r,s),l=(u-d)/(u-d+(m-y)),n.copy(s).addScaledVector(Ja,l);const f=1/(g+_+p);return a=_*f,l=p*f,n.copy(i).addScaledVector(bi,a).addScaledVector(Si,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Pc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},Os={h:0,s:0,l:0};function Yr(o,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?o+(e-o)*6*n:n<1/2?e:n<2/3?o+(e-o)*6*(2/3-n):o}class _e{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=_t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.toWorkingColorSpace(this,n),this}setRGB(e,n,i,s=qe.workingColorSpace){return this.r=e,this.g=n,this.b=i,qe.toWorkingColorSpace(this,s),this}setHSL(e,n,i,s=qe.workingColorSpace){if(e=xa(e,1),n=Be(n,0,1),i=Be(i,0,1),n===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+n):i+n-i*n,a=2*i-r;this.r=Yr(a,r,e+1/3),this.g=Yr(a,r,e),this.b=Yr(a,r,e-1/3)}return qe.toWorkingColorSpace(this,s),this}setStyle(e,n=_t){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],l=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,n);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,n);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(r,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=_t){const i=Pc[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pn(e.r),this.g=Pn(e.g),this.b=Pn(e.b),this}copyLinearToSRGB(e){return this.r=Fi(e.r),this.g=Fi(e.g),this.b=Fi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=_t){return qe.fromWorkingColorSpace(At.copy(this),e),Math.round(Be(At.r*255,0,255))*65536+Math.round(Be(At.g*255,0,255))*256+Math.round(Be(At.b*255,0,255))}getHexString(e=_t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=qe.workingColorSpace){qe.fromWorkingColorSpace(At.copy(this),n);const i=At.r,s=At.g,r=At.b,a=Math.max(i,s,r),l=Math.min(i,s,r);let h,c;const d=(l+a)/2;if(l===a)h=0,c=0;else{const u=a-l;switch(c=d<=.5?u/(a+l):u/(2-a-l),a){case i:h=(s-r)/u+(s<r?6:0);break;case s:h=(r-i)/u+2;break;case r:h=(i-s)/u+4;break}h/=6}return e.h=h,e.s=c,e.l=d,e}getRGB(e,n=qe.workingColorSpace){return qe.fromWorkingColorSpace(At.copy(this),n),e.r=At.r,e.g=At.g,e.b=At.b,e}getStyle(e=_t){qe.fromWorkingColorSpace(At.copy(this),e);const n=At.r,i=At.g,s=At.b;return e!==_t?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,n,i){return this.getHSL(On),this.setHSL(On.h+e,On.s+n,On.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(On),e.getHSL(Os);const i=ys(On.h,Os.h,n),s=ys(On.s,Os.s,n),r=ys(On.l,Os.l,n);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*n+r[3]*i+r[6]*s,this.g=r[1]*n+r[4]*i+r[7]*s,this.b=r[2]*n+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const At=new _e;_e.NAMES=Pc;let Cd=0;class cn extends $n{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cd++}),this.uuid=ln(),this.name="",this.type="Material",this.blending=Mt,this.side=Ct,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yo,this.blendDst=xo,this.blendEquation=si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new _e(0,0,0),this.blendAlpha=0,this.depthFunc=Oi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ka,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pi,this.stencilZFail=pi,this.stencilZPass=pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const s=this[n];if(s===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Mt&&(i.blending=this.blending),this.side!==Ct&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==yo&&(i.blendSrc=this.blendSrc),this.blendDst!==xo&&(i.blendDst=this.blendDst),this.blendEquation!==si&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Oi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ka&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==pi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==pi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==pi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const l in r){const h=r[l];delete h.metadata,a.push(h)}return a}if(n){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const s=n.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=n[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class oi extends cn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new _e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=dc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const wn=Rd();function Rd(){const o=new ArrayBuffer(4),e=new Float32Array(o),n=new Uint32Array(o),i=new Uint32Array(512),s=new Uint32Array(512);for(let h=0;h<256;++h){const c=h-127;c<-27?(i[h]=0,i[h|256]=32768,s[h]=24,s[h|256]=24):c<-14?(i[h]=1024>>-c-14,i[h|256]=1024>>-c-14|32768,s[h]=-c-1,s[h|256]=-c-1):c<=15?(i[h]=c+15<<10,i[h|256]=c+15<<10|32768,s[h]=13,s[h|256]=13):c<128?(i[h]=31744,i[h|256]=64512,s[h]=24,s[h|256]=24):(i[h]=31744,i[h|256]=64512,s[h]=13,s[h|256]=13)}const r=new Uint32Array(2048),a=new Uint32Array(64),l=new Uint32Array(64);for(let h=1;h<1024;++h){let c=h<<13,d=0;for(;(c&8388608)===0;)c<<=1,d-=8388608;c&=-8388609,d+=947912704,r[h]=c|d}for(let h=1024;h<2048;++h)r[h]=939524096+(h-1024<<13);for(let h=1;h<31;++h)a[h]=h<<23;a[31]=1199570944,a[32]=2147483648;for(let h=33;h<63;++h)a[h]=2147483648+(h-32<<23);a[63]=3347054592;for(let h=1;h<64;++h)h!==32&&(l[h]=1024);return{floatView:e,uint32View:n,baseTable:i,shiftTable:s,mantissaTable:r,exponentTable:a,offsetTable:l}}function Pd(o){Math.abs(o)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),o=Be(o,-65504,65504),wn.floatView[0]=o;const e=wn.uint32View[0],n=e>>23&511;return wn.baseTable[n]+((e&8388607)>>wn.shiftTable[n])}function Id(o){const e=o>>10;return wn.uint32View[0]=wn.mantissaTable[wn.offsetTable[e]+(o&1023)]+wn.exponentTable[e],wn.floatView[0]}class Bs{static toHalfFloat(e){return Pd(e)}static fromHalfFloat(e){return Id(e)}}const ft=new D,ks=new Ce;let Ld=0;class Et{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ld++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=ta,this.updateRanges=[],this.gpuType=Vt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=n.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)ks.fromBufferAttribute(this,n),ks.applyMatrix3(e),this.setXY(n,ks.x,ks.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)ft.fromBufferAttribute(this,n),ft.applyMatrix3(e),this.setXYZ(n,ft.x,ft.y,ft.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)ft.fromBufferAttribute(this,n),ft.applyMatrix4(e),this.setXYZ(n,ft.x,ft.y,ft.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)ft.fromBufferAttribute(this,n),ft.applyNormalMatrix(e),this.setXYZ(n,ft.x,ft.y,ft.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)ft.fromBufferAttribute(this,n),ft.transformDirection(e),this.setXYZ(n,ft.x,ft.y,ft.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=on(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=tt(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=on(n,this.array)),n}setX(e,n){return this.normalized&&(n=tt(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=on(n,this.array)),n}setY(e,n){return this.normalized&&(n=tt(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=on(n,this.array)),n}setZ(e,n){return this.normalized&&(n=tt(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=on(n,this.array)),n}setW(e,n){return this.normalized&&(n=tt(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=tt(n,this.array),i=tt(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,s){return e*=this.itemSize,this.normalized&&(n=tt(n,this.array),i=tt(i,this.array),s=tt(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,n,i,s,r){return e*=this.itemSize,this.normalized&&(n=tt(n,this.array),i=tt(i,this.array),s=tt(s,this.array),r=tt(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ta&&(e.usage=this.usage),e}}class Ic extends Et{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Lc extends Et{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Pt extends Et{constructor(e,n,i){super(new Float32Array(e),n,i)}}let Dd=0;const Zt=new Fe,Kr=new dt,Mi=new D,qt=new Ln,cs=new Ln,bt=new D;class Bt extends $n{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dd++}),this.uuid=ln(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Cc(e)?Lc:Ic)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ue().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Zt.makeRotationFromQuaternion(e),this.applyMatrix4(Zt),this}rotateX(e){return Zt.makeRotationX(e),this.applyMatrix4(Zt),this}rotateY(e){return Zt.makeRotationY(e),this.applyMatrix4(Zt),this}rotateZ(e){return Zt.makeRotationZ(e),this.applyMatrix4(Zt),this}translate(e,n,i){return Zt.makeTranslation(e,n,i),this.applyMatrix4(Zt),this}scale(e,n,i){return Zt.makeScale(e,n,i),this.applyMatrix4(Zt),this}lookAt(e){return Kr.lookAt(e),Kr.updateMatrix(),this.applyMatrix4(Kr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mi).negate(),this.translate(Mi.x,Mi.y,Mi.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Pt(i,3))}else{const i=Math.min(e.length,n.count);for(let s=0;s<i;s++){const r=e[s];n.setXYZ(s,r.x,r.y,r.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ln);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,s=n.length;i<s;i++){const r=n[i];qt.setFromBufferAttribute(r),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mn);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const i=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),n)for(let r=0,a=n.length;r<a;r++){const l=n[r];cs.setFromBufferAttribute(l),this.morphTargetsRelative?(bt.addVectors(qt.min,cs.min),qt.expandByPoint(bt),bt.addVectors(qt.max,cs.max),qt.expandByPoint(bt)):(qt.expandByPoint(cs.min),qt.expandByPoint(cs.max))}qt.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)bt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(bt));if(n)for(let r=0,a=n.length;r<a;r++){const l=n[r],h=this.morphTargetsRelative;for(let c=0,d=l.count;c<d;c++)bt.fromBufferAttribute(l,c),h&&(Mi.fromBufferAttribute(e,c),bt.add(Mi)),s=Math.max(s,i.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,s=n.normal,r=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Et(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),l=[],h=[];for(let C=0;C<i.count;C++)l[C]=new D,h[C]=new D;const c=new D,d=new D,u=new D,p=new Ce,m=new Ce,y=new Ce,_=new D,g=new D;function f(C,E,v){c.fromBufferAttribute(i,C),d.fromBufferAttribute(i,E),u.fromBufferAttribute(i,v),p.fromBufferAttribute(r,C),m.fromBufferAttribute(r,E),y.fromBufferAttribute(r,v),d.sub(c),u.sub(c),m.sub(p),y.sub(p);const R=1/(m.x*y.y-y.x*m.y);isFinite(R)&&(_.copy(d).multiplyScalar(y.y).addScaledVector(u,-m.y).multiplyScalar(R),g.copy(u).multiplyScalar(m.x).addScaledVector(d,-y.x).multiplyScalar(R),l[C].add(_),l[E].add(_),l[v].add(_),h[C].add(g),h[E].add(g),h[v].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let C=0,E=S.length;C<E;++C){const v=S[C],R=v.start,z=v.count;for(let O=R,V=R+z;O<V;O+=3)f(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const w=new D,x=new D,P=new D,I=new D;function A(C){P.fromBufferAttribute(s,C),I.copy(P);const E=l[C];w.copy(E),w.sub(P.multiplyScalar(P.dot(E))).normalize(),x.crossVectors(I,E);const R=x.dot(h[C])<0?-1:1;a.setXYZW(C,w.x,w.y,w.z,R)}for(let C=0,E=S.length;C<E;++C){const v=S[C],R=v.start,z=v.count;for(let O=R,V=R+z;O<V;O+=3)A(e.getX(O+0)),A(e.getX(O+1)),A(e.getX(O+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Et(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let p=0,m=i.count;p<m;p++)i.setXYZ(p,0,0,0);const s=new D,r=new D,a=new D,l=new D,h=new D,c=new D,d=new D,u=new D;if(e)for(let p=0,m=e.count;p<m;p+=3){const y=e.getX(p+0),_=e.getX(p+1),g=e.getX(p+2);s.fromBufferAttribute(n,y),r.fromBufferAttribute(n,_),a.fromBufferAttribute(n,g),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),l.fromBufferAttribute(i,y),h.fromBufferAttribute(i,_),c.fromBufferAttribute(i,g),l.add(d),h.add(d),c.add(d),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(_,h.x,h.y,h.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let p=0,m=n.count;p<m;p+=3)s.fromBufferAttribute(n,p+0),r.fromBufferAttribute(n,p+1),a.fromBufferAttribute(n,p+2),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),i.setXYZ(p+0,d.x,d.y,d.z),i.setXYZ(p+1,d.x,d.y,d.z),i.setXYZ(p+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)bt.fromBufferAttribute(e,n),bt.normalize(),e.setXYZ(n,bt.x,bt.y,bt.z)}toNonIndexed(){function e(l,h){const c=l.array,d=l.itemSize,u=l.normalized,p=new c.constructor(h.length*d);let m=0,y=0;for(let _=0,g=h.length;_<g;_++){l.isInterleavedBufferAttribute?m=h[_]*l.data.stride+l.offset:m=h[_]*d;for(let f=0;f<d;f++)p[y++]=c[m++]}return new Et(p,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Bt,i=this.index.array,s=this.attributes;for(const l in s){const h=s[l],c=e(h,i);n.setAttribute(l,c)}const r=this.morphAttributes;for(const l in r){const h=[],c=r[l];for(let d=0,u=c.length;d<u;d++){const p=c[d],m=e(p,i);h.push(m)}n.morphAttributes[l]=h}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let l=0,h=a.length;l<h;l++){const c=a[l];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const c in h)h[c]!==void 0&&(e[c]=h[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const h in i){const c=i[h];e.data.attributes[h]=c.toJSON(e.data)}const s={};let r=!1;for(const h in this.morphAttributes){const c=this.morphAttributes[h],d=[];for(let u=0,p=c.length;u<p;u++){const m=c[u];d.push(m.toJSON(e.data))}d.length>0&&(s[h]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(n))}const r=e.morphAttributes;for(const c in r){const d=[],u=r[c];for(let p=0,m=u.length;p<m;p++)d.push(u[p].clone(n));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const el=new Fe,Zn=new ji,zs=new mn,tl=new D,Hs=new D,Vs=new D,Gs=new D,Zr=new D,Ws=new D,nl=new D,$s=new D;class Gt extends dt{constructor(e=new Bt,n=new oi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}getVertexPosition(e,n){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(s,e);const l=this.morphTargetInfluences;if(r&&l){Ws.set(0,0,0);for(let h=0,c=r.length;h<c;h++){const d=l[h],u=r[h];d!==0&&(Zr.fromBufferAttribute(u,e),a?Ws.addScaledVector(Zr,d):Ws.addScaledVector(Zr.sub(n),d))}n.add(Ws)}return n}raycast(e,n){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),zs.copy(i.boundingSphere),zs.applyMatrix4(r),Zn.copy(e.ray).recast(e.near),!(zs.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(zs,tl)===null||Zn.origin.distanceToSquared(tl)>(e.far-e.near)**2))&&(el.copy(r).invert(),Zn.copy(e.ray).applyMatrix4(el),!(i.boundingBox!==null&&Zn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Zn)))}_computeIntersections(e,n,i){let s;const r=this.geometry,a=this.material,l=r.index,h=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,p=r.groups,m=r.drawRange;if(l!==null)if(Array.isArray(a))for(let y=0,_=p.length;y<_;y++){const g=p[y],f=a[g.materialIndex],S=Math.max(g.start,m.start),w=Math.min(l.count,Math.min(g.start+g.count,m.start+m.count));for(let x=S,P=w;x<P;x+=3){const I=l.getX(x),A=l.getX(x+1),C=l.getX(x+2);s=qs(this,f,e,i,c,d,u,I,A,C),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,n.push(s))}}else{const y=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let g=y,f=_;g<f;g+=3){const S=l.getX(g),w=l.getX(g+1),x=l.getX(g+2);s=qs(this,a,e,i,c,d,u,S,w,x),s&&(s.faceIndex=Math.floor(g/3),n.push(s))}}else if(h!==void 0)if(Array.isArray(a))for(let y=0,_=p.length;y<_;y++){const g=p[y],f=a[g.materialIndex],S=Math.max(g.start,m.start),w=Math.min(h.count,Math.min(g.start+g.count,m.start+m.count));for(let x=S,P=w;x<P;x+=3){const I=x,A=x+1,C=x+2;s=qs(this,f,e,i,c,d,u,I,A,C),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,n.push(s))}}else{const y=Math.max(0,m.start),_=Math.min(h.count,m.start+m.count);for(let g=y,f=_;g<f;g+=3){const S=g,w=g+1,x=g+2;s=qs(this,a,e,i,c,d,u,S,w,x),s&&(s.faceIndex=Math.floor(g/3),n.push(s))}}}}function Fd(o,e,n,i,s,r,a,l){let h;if(e.side===Rt?h=i.intersectTriangle(a,r,s,!0,l):h=i.intersectTriangle(s,r,a,e.side===Ct,l),h===null)return null;$s.copy(l),$s.applyMatrix4(o.matrixWorld);const c=n.ray.origin.distanceTo($s);return c<n.near||c>n.far?null:{distance:c,point:$s.clone(),object:o}}function qs(o,e,n,i,s,r,a,l,h,c){o.getVertexPosition(l,Hs),o.getVertexPosition(h,Vs),o.getVertexPosition(c,Gs);const d=Fd(o,e,n,i,Hs,Vs,Gs,nl);if(d){const u=new D;an.getBarycoord(nl,Hs,Vs,Gs,u),s&&(d.uv=an.getInterpolatedAttribute(s,l,h,c,u,new Ce)),r&&(d.uv1=an.getInterpolatedAttribute(r,l,h,c,u,new Ce)),a&&(d.normal=an.getInterpolatedAttribute(a,l,h,c,u,new D),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const p={a:l,b:h,c,normal:new D,materialIndex:0};an.getNormal(Hs,Vs,Gs,p.normal),d.face=p,d.barycoord=u}return d}class Ts extends Bt{constructor(e=1,n=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const l=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const h=[],c=[],d=[],u=[];let p=0,m=0;y("z","y","x",-1,-1,i,n,e,a,r,0),y("z","y","x",1,-1,i,n,-e,a,r,1),y("x","z","y",1,1,e,i,n,s,a,2),y("x","z","y",1,-1,e,i,-n,s,a,3),y("x","y","z",1,-1,e,n,i,s,r,4),y("x","y","z",-1,-1,e,n,-i,s,r,5),this.setIndex(h),this.setAttribute("position",new Pt(c,3)),this.setAttribute("normal",new Pt(d,3)),this.setAttribute("uv",new Pt(u,2));function y(_,g,f,S,w,x,P,I,A,C,E){const v=x/A,R=P/C,z=x/2,O=P/2,V=I/2,q=A+1,G=C+1;let Z=0,W=0;const ne=new D;for(let ie=0;ie<G;ie++){const xe=ie*R-O;for(let we=0;we<q;we++){const Ne=we*v-z;ne[_]=Ne*S,ne[g]=xe*w,ne[f]=V,c.push(ne.x,ne.y,ne.z),ne[_]=0,ne[g]=0,ne[f]=I>0?1:-1,d.push(ne.x,ne.y,ne.z),u.push(we/A),u.push(1-ie/C),Z+=1}}for(let ie=0;ie<C;ie++)for(let xe=0;xe<A;xe++){const we=p+xe+q*ie,Ne=p+xe+q*(ie+1),X=p+(xe+1)+q*(ie+1),te=p+(xe+1)+q*ie;h.push(we,Ne,te),h.push(Ne,X,te),W+=6}l.addGroup(m,W,E),m+=W,p+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ts(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Wi(o){const e={};for(const n in o){e[n]={};for(const i in o[n]){const s=o[n][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=s.clone():Array.isArray(s)?e[n][i]=s.slice():e[n][i]=s}}return e}function Ft(o){const e={};for(let n=0;n<o.length;n++){const i=Wi(o[n]);for(const s in i)e[s]=i[s]}return e}function Ud(o){const e=[];for(let n=0;n<o.length;n++)e.push(o[n].clone());return e}function Dc(o){const e=o.getRenderTarget();return e===null?o.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const Nd={clone:Wi,merge:Ft};var Od=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wn extends cn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Od,this.fragmentShader=Bd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Wi(e.uniforms),this.uniformsGroups=Ud(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?n.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[s]={type:"m4",value:a.toArray()}:n.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Fc extends dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Fe,this.projectionMatrix=new Fe,this.projectionMatrixInverse=new Fe,this.coordinateSystem=An}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Bn=new D,il=new Ce,sl=new Ce;class Ut extends Fc{constructor(e=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Gi*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(_s*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Gi*2*Math.atan(Math.tan(_s*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Bn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z),Bn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z)}getViewSize(e,n){return this.getViewBounds(e,il,sl),n.subVectors(sl,il)}setViewOffset(e,n,i,s,r,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(_s*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const h=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/h,n-=a.offsetY*i/c,s*=a.width/h,i*=a.height/c}const l=this.filmOffset;l!==0&&(r+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Ei=-90,wi=1;class kd extends dt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ut(Ei,wi,e,n);s.layers=this.layers,this.add(s);const r=new Ut(Ei,wi,e,n);r.layers=this.layers,this.add(r);const a=new Ut(Ei,wi,e,n);a.layers=this.layers,this.add(a);const l=new Ut(Ei,wi,e,n);l.layers=this.layers,this.add(l);const h=new Ut(Ei,wi,e,n);h.layers=this.layers,this.add(h);const c=new Ut(Ei,wi,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,s,r,a,l,h]=n;for(const c of n)this.remove(c);if(e===An)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===Mr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,l,h,c,d]=this.children,u=e.getRenderTarget(),p=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),y=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(n,r),e.setRenderTarget(i,1,s),e.render(n,a),e.setRenderTarget(i,2,s),e.render(n,l),e.setRenderTarget(i,3,s),e.render(n,h),e.setRenderTarget(i,4,s),e.render(n,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),e.render(n,d),e.setRenderTarget(u,p,m),e.xr.enabled=y,i.texture.needsPMREMUpdate=!0}}class Uc extends yt{constructor(e,n,i,s,r,a,l,h,c,d){e=e!==void 0?e:[],n=n!==void 0?n:Bi,super(e,n,i,s,r,a,l,h,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class zd extends ci{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Uc(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:ht}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ts(5,5,5),r=new Wn({name:"CubemapFromEquirect",uniforms:Wi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Rt,blending:Vn});r.uniforms.tEquirect.value=n;const a=new Gt(s,r),l=n.minFilter;return n.minFilter===un&&(n.minFilter=ht),new kd(1,10,this).update(e,a),n.minFilter=l,a.geometry.dispose(),a.material.dispose(),this}clear(e,n,i,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,s);e.setRenderTarget(r)}}class ai extends dt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Hd={type:"move"};class Qr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ai,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ai,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ai,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let s=null,r=null,a=null;const l=this._targetRay,h=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const g=n.getJointPose(_,i),f=this._getHandJoint(c,_);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],p=d.position.distanceTo(u.position),m=.02,y=.005;c.inputState.pinching&&p>m+y?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&p<=m-y&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(r=n.getPose(e.gripSpace,i),r!==null&&(h.matrix.fromArray(r.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,r.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(r.linearVelocity)):h.hasLinearVelocity=!1,r.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(r.angularVelocity)):h.hasAngularVelocity=!1));l!==null&&(s=n.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(Hd)))}return l!==null&&(l.visible=s!==null),h!==null&&(h.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new ai;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}class Vd extends dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fn,this.environmentIntensity=1,this.environmentRotation=new fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class Gd{constructor(e,n){this.isInterleavedBuffer=!0,this.array=e,this.stride=n,this.count=e!==void 0?e.length/n:0,this.usage=ta,this.updateRanges=[],this.version=0,this.uuid=ln()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,n,i){e*=this.stride,i*=n.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=n.array[i+s];return this}set(e,n=0){return this.array.set(e,n),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ln()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const n=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ln()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Dt=new D;class Sa{constructor(e,n,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=n,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let n=0,i=this.data.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyMatrix4(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyNormalMatrix(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.transformDirection(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}getComponent(e,n){let i=this.array[e*this.data.stride+this.offset+n];return this.normalized&&(i=on(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=tt(i,this.array)),this.data.array[e*this.data.stride+this.offset+n]=i,this}setX(e,n){return this.normalized&&(n=tt(n,this.array)),this.data.array[e*this.data.stride+this.offset]=n,this}setY(e,n){return this.normalized&&(n=tt(n,this.array)),this.data.array[e*this.data.stride+this.offset+1]=n,this}setZ(e,n){return this.normalized&&(n=tt(n,this.array)),this.data.array[e*this.data.stride+this.offset+2]=n,this}setW(e,n){return this.normalized&&(n=tt(n,this.array)),this.data.array[e*this.data.stride+this.offset+3]=n,this}getX(e){let n=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(n=on(n,this.array)),n}getY(e){let n=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(n=on(n,this.array)),n}getZ(e){let n=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(n=on(n,this.array)),n}getW(e){let n=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(n=on(n,this.array)),n}setXY(e,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(n=tt(n,this.array),i=tt(i,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this}setXYZ(e,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(n=tt(n,this.array),i=tt(i,this.array),s=tt(s,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,n,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(n=tt(n,this.array),i=tt(i,this.array),s=tt(s,this.array),r=tt(r,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)n.push(this.data.array[s+r])}return new Et(new this.array.constructor(n),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Sa(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)n.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const rl=new D,ol=new Ke,al=new Ke,Wd=new D,ll=new Fe,Xs=new D,Jr=new mn,cl=new Fe,eo=new ji;class $d extends Gt{constructor(e,n){super(e,n),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ba,this.bindMatrix=new Fe,this.bindMatrixInverse=new Fe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ln),this.boundingBox.makeEmpty();const n=e.getAttribute("position");for(let i=0;i<n.count;i++)this.getVertexPosition(i,Xs),this.boundingBox.expandByPoint(Xs)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new mn),this.boundingSphere.makeEmpty();const n=e.getAttribute("position");for(let i=0;i<n.count;i++)this.getVertexPosition(i,Xs),this.boundingSphere.expandByPoint(Xs)}copy(e,n){return super.copy(e,n),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,n){const i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Jr.copy(this.boundingSphere),Jr.applyMatrix4(s),e.ray.intersectsSphere(Jr)!==!1&&(cl.copy(s).invert(),eo.copy(e.ray).applyMatrix4(cl),!(this.boundingBox!==null&&eo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,n,eo)))}getVertexPosition(e,n){return super.getVertexPosition(e,n),this.applyBoneTransform(e,n),n}bind(e,n){this.skeleton=e,n===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),n=this.matrixWorld),this.bindMatrix.copy(n),this.bindMatrixInverse.copy(n).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Ke,n=this.geometry.attributes.skinWeight;for(let i=0,s=n.count;i<s;i++){e.fromBufferAttribute(n,i);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),n.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ba?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Dh?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,n){const i=this.skeleton,s=this.geometry;ol.fromBufferAttribute(s.attributes.skinIndex,e),al.fromBufferAttribute(s.attributes.skinWeight,e),rl.copy(n).applyMatrix4(this.bindMatrix),n.set(0,0,0);for(let r=0;r<4;r++){const a=al.getComponent(r);if(a!==0){const l=ol.getComponent(r);ll.multiplyMatrices(i.bones[l].matrixWorld,i.boneInverses[l]),n.addScaledVector(Wd.copy(rl).applyMatrix4(ll),a)}}return n.applyMatrix4(this.bindMatrixInverse)}}class Nc extends dt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Ma extends yt{constructor(e=null,n=1,i=1,s,r,a,l,h,c=Ot,d=Ot,u,p){super(null,a,l,h,c,d,s,r,u,p),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const hl=new Fe,qd=new Fe;class Ea{constructor(e=[],n=[]){this.uuid=ln(),this.bones=e.slice(0),this.boneInverses=n,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,n=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),n.length===0)this.calculateInverses();else if(e.length!==n.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new Fe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,n=this.bones.length;e<n;e++){const i=new Fe;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,n=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const l=e[r]?e[r].matrixWorld:qd;hl.multiplyMatrices(l,n[r]),hl.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Ea(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const n=new Float32Array(e*e*4);n.set(this.boneMatrices);const i=new Ma(n,e,e,en,Vt);return i.needsUpdate=!0,this.boneMatrices=n,this.boneTexture=i,this}getBoneByName(e){for(let n=0,i=this.bones.length;n<i;n++){const s=this.bones[n];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,n){this.uuid=e.uuid;for(let i=0,s=e.bones.length;i<s;i++){const r=e.bones[i];let a=n[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Nc),this.bones.push(a),this.boneInverses.push(new Fe().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const n=this.bones,i=this.boneInverses;for(let s=0,r=n.length;s<r;s++){const a=n[s];e.bones.push(a.uuid);const l=i[s];e.boneInverses.push(l.toArray())}return e}}class na extends Et{constructor(e,n,i,s=1){super(e,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ti=new Fe,dl=new Fe,js=[],ul=new Ln,Xd=new Fe,hs=new Gt,ds=new mn;class jd extends Gt{constructor(e,n,i){super(e,n),this.isInstancedMesh=!0,this.instanceMatrix=new na(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Xd)}computeBoundingBox(){const e=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new Ln),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Ti),ul.copy(e.boundingBox).applyMatrix4(Ti),this.boundingBox.union(ul)}computeBoundingSphere(){const e=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new mn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Ti),ds.copy(e.boundingSphere).applyMatrix4(Ti),this.boundingSphere.union(ds)}copy(e,n){return super.copy(e,n),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,n){n.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,n){n.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,n){const i=n.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let l=0;l<i.length;l++)i[l]=s[a+l]}raycast(e,n){const i=this.matrixWorld,s=this.count;if(hs.geometry=this.geometry,hs.material=this.material,hs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ds.copy(this.boundingSphere),ds.applyMatrix4(i),e.ray.intersectsSphere(ds)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ti),dl.multiplyMatrices(i,Ti),hs.matrixWorld=dl,hs.raycast(e,js);for(let a=0,l=js.length;a<l;a++){const h=js[a];h.instanceId=r,h.object=this,n.push(h)}js.length=0}}setColorAt(e,n){this.instanceColor===null&&(this.instanceColor=new na(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,n){n.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,n){const i=n.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Ma(new Float32Array(s*this.count),s,this.count,fa,Vt));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const l=this.geometry.morphTargetsRelative?1:1-a,h=s*e;r[h]=l,r.set(i,h+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const to=new D,Yd=new D,Kd=new Ue;class zn{constructor(e=new D(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,s){return this.normal.set(e,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const s=to.subVectors(i,n).cross(Yd.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(to),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:n.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||Kd.getNormalMatrix(e),s=this.coplanarPoint(to).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Qn=new mn,Ys=new D;class wa{constructor(e=new zn,n=new zn,i=new zn,s=new zn,r=new zn,a=new zn){this.planes=[e,n,i,s,r,a]}set(e,n,i,s,r,a){const l=this.planes;return l[0].copy(e),l[1].copy(n),l[2].copy(i),l[3].copy(s),l[4].copy(r),l[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=An){const i=this.planes,s=e.elements,r=s[0],a=s[1],l=s[2],h=s[3],c=s[4],d=s[5],u=s[6],p=s[7],m=s[8],y=s[9],_=s[10],g=s[11],f=s[12],S=s[13],w=s[14],x=s[15];if(i[0].setComponents(h-r,p-c,g-m,x-f).normalize(),i[1].setComponents(h+r,p+c,g+m,x+f).normalize(),i[2].setComponents(h+a,p+d,g+y,x+S).normalize(),i[3].setComponents(h-a,p-d,g-y,x-S).normalize(),i[4].setComponents(h-l,p-u,g-_,x-w).normalize(),n===An)i[5].setComponents(h+l,p+u,g+_,x+w).normalize();else if(n===Mr)i[5].setComponents(l,u,_,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Qn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Qn.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Qn)}intersectsSprite(e){return Qn.center.set(0,0,0),Qn.radius=.7071067811865476,Qn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Qn)}intersectsSphere(e){const n=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(n[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const s=n[i];if(Ys.x=s.normal.x>0?e.max.x:e.min.x,Ys.y=s.normal.y>0?e.max.y:e.min.y,Ys.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ys)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ar extends cn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new _e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Er=new D,wr=new D,pl=new Fe,us=new ji,Ks=new mn,no=new D,fl=new D;class Es extends dt{constructor(e=new Bt,n=new Ar){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let s=1,r=n.count;s<r;s++)Er.fromBufferAttribute(n,s-1),wr.fromBufferAttribute(n,s),i[s]=i[s-1],i[s]+=Er.distanceTo(wr);e.setAttribute("lineDistance",new Pt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ks.copy(i.boundingSphere),Ks.applyMatrix4(s),Ks.radius+=r,e.ray.intersectsSphere(Ks)===!1)return;pl.copy(s).invert(),us.copy(e.ray).applyMatrix4(pl);const l=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=l*l,c=this.isLineSegments?2:1,d=i.index,p=i.attributes.position;if(d!==null){const m=Math.max(0,a.start),y=Math.min(d.count,a.start+a.count);for(let _=m,g=y-1;_<g;_+=c){const f=d.getX(_),S=d.getX(_+1),w=Zs(this,e,us,h,f,S,_);w&&n.push(w)}if(this.isLineLoop){const _=d.getX(y-1),g=d.getX(m),f=Zs(this,e,us,h,_,g,y-1);f&&n.push(f)}}else{const m=Math.max(0,a.start),y=Math.min(p.count,a.start+a.count);for(let _=m,g=y-1;_<g;_+=c){const f=Zs(this,e,us,h,_,_+1,_);f&&n.push(f)}if(this.isLineLoop){const _=Zs(this,e,us,h,y-1,m,y-1);_&&n.push(_)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}}function Zs(o,e,n,i,s,r,a){const l=o.geometry.attributes.position;if(Er.fromBufferAttribute(l,s),wr.fromBufferAttribute(l,r),n.distanceSqToSegment(Er,wr,no,fl)>i)return;no.applyMatrix4(o.matrixWorld);const c=e.ray.origin.distanceTo(no);if(!(c<e.near||c>e.far))return{distance:c,point:fl.clone().applyMatrix4(o.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:o}}const ml=new D,gl=new D;class Oc extends Es{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let s=0,r=n.count;s<r;s+=2)ml.fromBufferAttribute(n,s),gl.fromBufferAttribute(n,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+ml.distanceTo(gl);e.setAttribute("lineDistance",new Pt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Zd extends Es{constructor(e,n){super(e,n),this.isLineLoop=!0,this.type="LineLoop"}}class Ta extends cn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new _e(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const _l=new Fe,ia=new ji,Qs=new mn,Js=new D;class Bc extends dt{constructor(e=new Bt,n=new Ta){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Qs.copy(i.boundingSphere),Qs.applyMatrix4(s),Qs.radius+=r,e.ray.intersectsSphere(Qs)===!1)return;_l.copy(s).invert(),ia.copy(e.ray).applyMatrix4(_l);const l=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=l*l,c=i.index,u=i.attributes.position;if(c!==null){const p=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let y=p,_=m;y<_;y++){const g=c.getX(y);Js.fromBufferAttribute(u,g),yl(Js,g,h,s,e,n,this)}}else{const p=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let y=p,_=m;y<_;y++)Js.fromBufferAttribute(u,y),yl(Js,y,h,s,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}}function yl(o,e,n,i,s,r,a){const l=ia.distanceSqToPoint(o);if(l<n){const h=new D;ia.closestPointToPoint(o,h),h.applyMatrix4(i);const c=s.ray.origin.distanceTo(h);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(l),point:h,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Aa extends yt{constructor(e,n,i,s,r,a,l,h,c){super(e,n,i,s,r,a,l,h,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class kc extends yt{constructor(e,n,i,s,r,a,l,h,c,d=Di){if(d!==Di&&d!==Vi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===Di&&(i=li),i===void 0&&d===Vi&&(i=Hi),super(null,s,r,a,l,h,d,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=l!==void 0?l:Ot,this.minFilter=h!==void 0?h:Ot,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new va(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class Ca extends Bt{constructor(e=1,n=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:n,thetaStart:i,thetaLength:s},n=Math.max(3,n);const r=[],a=[],l=[],h=[],c=new D,d=new Ce;a.push(0,0,0),l.push(0,0,1),h.push(.5,.5);for(let u=0,p=3;u<=n;u++,p+=3){const m=i+u/n*s;c.x=e*Math.cos(m),c.y=e*Math.sin(m),a.push(c.x,c.y,c.z),l.push(0,0,1),d.x=(a[p]/e+1)/2,d.y=(a[p+1]/e+1)/2,h.push(d.x,d.y)}for(let u=1;u<=n;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Pt(a,3)),this.setAttribute("normal",new Pt(l,3)),this.setAttribute("uv",new Pt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ca(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class As extends Bt{constructor(e=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:s};const r=e/2,a=n/2,l=Math.floor(i),h=Math.floor(s),c=l+1,d=h+1,u=e/l,p=n/h,m=[],y=[],_=[],g=[];for(let f=0;f<d;f++){const S=f*p-a;for(let w=0;w<c;w++){const x=w*u-r;y.push(x,-S,0),_.push(0,0,1),g.push(w/l),g.push(1-f/h)}}for(let f=0;f<h;f++)for(let S=0;S<l;S++){const w=S+c*f,x=S+c*(f+1),P=S+1+c*(f+1),I=S+1+c*f;m.push(w,x,I),m.push(x,P,I)}this.setIndex(m),this.setAttribute("position",new Pt(y,3)),this.setAttribute("normal",new Pt(_,3)),this.setAttribute("uv",new Pt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new As(e.width,e.height,e.widthSegments,e.heightSegments)}}class Qd extends cn{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new _e(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class Cr extends cn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new _e(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new _e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wc,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Nt extends Cr{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ce(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Be(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new _e(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new _e(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new _e(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Jd extends cn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=kh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class eu extends cn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function er(o,e,n){return!o||!n&&o.constructor===e?o:typeof e.BYTES_PER_ELEMENT=="number"?new e(o):Array.prototype.slice.call(o)}function tu(o){return ArrayBuffer.isView(o)&&!(o instanceof DataView)}function nu(o){function e(s,r){return o[s]-o[r]}const n=o.length,i=new Array(n);for(let s=0;s!==n;++s)i[s]=s;return i.sort(e),i}function xl(o,e,n){const i=o.length,s=new o.constructor(i);for(let r=0,a=0;a!==i;++r){const l=n[r]*e;for(let h=0;h!==e;++h)s[a++]=o[l+h]}return s}function zc(o,e,n,i){let s=1,r=o[0];for(;r!==void 0&&r[i]===void 0;)r=o[s++];if(r===void 0)return;let a=r[i];if(a!==void 0)if(Array.isArray(a))do a=r[i],a!==void 0&&(e.push(r.time),n.push(...a)),r=o[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[i],a!==void 0&&(e.push(r.time),a.toArray(n,n.length)),r=o[s++];while(r!==void 0);else do a=r[i],a!==void 0&&(e.push(r.time),n.push(a)),r=o[s++];while(r!==void 0)}class Cs{constructor(e,n,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){const n=this.parameterPositions;let i=this._cachedIndex,s=n[i],r=n[i-1];e:{t:{let a;n:{i:if(!(e<s)){for(let l=i+2;;){if(s===void 0){if(e<r)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===l)break;if(r=s,s=n[++i],e<s)break t}a=n.length;break n}if(!(e>=r)){const l=n[1];e<l&&(i=2,r=l);for(let h=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===h)break;if(s=r,r=n[--i-1],e>=r)break t}a=i,i=0;break n}break e}for(;i<a;){const l=i+a>>>1;e<n[l]?a=l:i=l+1}if(s=n[i],r=n[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const n=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)n[a]=i[r+a];return n}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class iu extends Cs{constructor(e,n,i,s){super(e,n,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pi,endingEnd:Pi}}intervalChanged_(e,n,i){const s=this.parameterPositions;let r=e-2,a=e+1,l=s[r],h=s[a];if(l===void 0)switch(this.getSettings_().endingStart){case Ii:r=e,l=2*n-i;break;case br:r=s.length-2,l=n+s[r]-s[r+1];break;default:r=e,l=i}if(h===void 0)switch(this.getSettings_().endingEnd){case Ii:a=e,h=2*i-n;break;case br:a=1,h=i+s[1]-s[0];break;default:a=e-1,h=n}const c=(i-n)*.5,d=this.valueSize;this._weightPrev=c/(n-l),this._weightNext=c/(h-i),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(e,n,i,s){const r=this.resultBuffer,a=this.sampleValues,l=this.valueSize,h=e*l,c=h-l,d=this._offsetPrev,u=this._offsetNext,p=this._weightPrev,m=this._weightNext,y=(i-n)/(s-n),_=y*y,g=_*y,f=-p*g+2*p*_-p*y,S=(1+p)*g+(-1.5-2*p)*_+(-.5+p)*y+1,w=(-1-m)*g+(1.5+m)*_+.5*y,x=m*g-m*_;for(let P=0;P!==l;++P)r[P]=f*a[d+P]+S*a[c+P]+w*a[h+P]+x*a[u+P];return r}}class Hc extends Cs{constructor(e,n,i,s){super(e,n,i,s)}interpolate_(e,n,i,s){const r=this.resultBuffer,a=this.sampleValues,l=this.valueSize,h=e*l,c=h-l,d=(i-n)/(s-n),u=1-d;for(let p=0;p!==l;++p)r[p]=a[c+p]*u+a[h+p]*d;return r}}class su extends Cs{constructor(e,n,i,s){super(e,n,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class gn{constructor(e,n,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=er(n,this.TimeBufferType),this.values=er(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const n=e.constructor;let i;if(n.toJSON!==this.toJSON)i=n.toJSON(e);else{i={name:e.name,times:er(e.times,Array),values:er(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new su(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Hc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new iu(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let n;switch(e){case bs:n=this.InterpolantFactoryMethodDiscrete;break;case Ss:n=this.InterpolantFactoryMethodLinear;break;case Lr:n=this.InterpolantFactoryMethodSmooth;break}if(n===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return bs;case this.InterpolantFactoryMethodLinear:return Ss;case this.InterpolantFactoryMethodSmooth:return Lr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]+=e}return this}scale(e){if(e!==1){const n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]*=e}return this}trim(e,n){const i=this.times,s=i.length;let r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>n;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const l=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*l,a*l)}return this}validate(){let e=!0;const n=this.getValueSize();n-Math.floor(n)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let l=0;l!==r;l++){const h=i[l];if(typeof h=="number"&&isNaN(h)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,l,h),e=!1;break}if(a!==null&&a>h){console.error("THREE.KeyframeTrack: Out of order keys.",this,l,h,a),e=!1;break}a=h}if(s!==void 0&&tu(s))for(let l=0,h=s.length;l!==h;++l){const c=s[l];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,l,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Lr,r=e.length-1;let a=1;for(let l=1;l<r;++l){let h=!1;const c=e[l],d=e[l+1];if(c!==d&&(l!==1||c!==e[0]))if(s)h=!0;else{const u=l*i,p=u-i,m=u+i;for(let y=0;y!==i;++y){const _=n[u+y];if(_!==n[p+y]||_!==n[m+y]){h=!0;break}}}if(h){if(l!==a){e[a]=e[l];const u=l*i,p=a*i;for(let m=0;m!==i;++m)n[p+m]=n[u+m]}++a}}if(r>0){e[a]=e[r];for(let l=r*i,h=a*i,c=0;c!==i;++c)n[h+c]=n[l+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=n.slice(0,a*i)):(this.times=e,this.values=n),this}clone(){const e=this.times.slice(),n=this.values.slice(),i=this.constructor,s=new i(this.name,e,n);return s.createInterpolant=this.createInterpolant,s}}gn.prototype.TimeBufferType=Float32Array;gn.prototype.ValueBufferType=Float32Array;gn.prototype.DefaultInterpolation=Ss;class Yi extends gn{constructor(e,n,i){super(e,n,i)}}Yi.prototype.ValueTypeName="bool";Yi.prototype.ValueBufferType=Array;Yi.prototype.DefaultInterpolation=bs;Yi.prototype.InterpolantFactoryMethodLinear=void 0;Yi.prototype.InterpolantFactoryMethodSmooth=void 0;class Vc extends gn{}Vc.prototype.ValueTypeName="color";class $i extends gn{}$i.prototype.ValueTypeName="number";class ru extends Cs{constructor(e,n,i,s){super(e,n,i,s)}interpolate_(e,n,i,s){const r=this.resultBuffer,a=this.sampleValues,l=this.valueSize,h=(i-n)/(s-n);let c=e*l;for(let d=c+l;c!==d;c+=4)Xt.slerpFlat(r,0,a,c-l,a,c,h);return r}}class qi extends gn{InterpolantFactoryMethodLinear(e){return new ru(this.times,this.values,this.getValueSize(),e)}}qi.prototype.ValueTypeName="quaternion";qi.prototype.InterpolantFactoryMethodSmooth=void 0;class Ki extends gn{constructor(e,n,i){super(e,n,i)}}Ki.prototype.ValueTypeName="string";Ki.prototype.ValueBufferType=Array;Ki.prototype.DefaultInterpolation=bs;Ki.prototype.InterpolantFactoryMethodLinear=void 0;Ki.prototype.InterpolantFactoryMethodSmooth=void 0;class Xi extends gn{}Xi.prototype.ValueTypeName="vector";class sa{constructor(e="",n=-1,i=[],s=ya){this.name=e,this.tracks=i,this.duration=n,this.blendMode=s,this.uuid=ln(),this.duration<0&&this.resetDuration()}static parse(e){const n=[],i=e.tracks,s=1/(e.fps||1);for(let a=0,l=i.length;a!==l;++a)n.push(au(i[a]).scale(s));const r=new this(e.name,e.duration,n,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const n=[],i=e.tracks,s={name:e.name,duration:e.duration,tracks:n,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=i.length;r!==a;++r)n.push(gn.toJSON(i[r]));return s}static CreateFromMorphTargetSequence(e,n,i,s){const r=n.length,a=[];for(let l=0;l<r;l++){let h=[],c=[];h.push((l+r-1)%r,l,(l+1)%r),c.push(0,1,0);const d=nu(h);h=xl(h,1,d),c=xl(c,1,d),!s&&h[0]===0&&(h.push(r),c.push(c[0])),a.push(new $i(".morphTargetInfluences["+n[l].name+"]",h,c).scale(1/i))}return new this(e,-1,a)}static findByName(e,n){let i=e;if(!Array.isArray(e)){const s=e;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===n)return i[s];return null}static CreateClipsFromMorphTargetSequences(e,n,i){const s={},r=/^([\w-]*?)([\d]+)$/;for(let l=0,h=e.length;l<h;l++){const c=e[l],d=c.name.match(r);if(d&&d.length>1){const u=d[1];let p=s[u];p||(s[u]=p=[]),p.push(c)}}const a=[];for(const l in s)a.push(this.CreateFromMorphTargetSequence(l,s[l],n,i));return a}static parseAnimation(e,n){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const i=function(u,p,m,y,_){if(m.length!==0){const g=[],f=[];zc(m,g,f,y),g.length!==0&&_.push(new u(p,g,f))}},s=[],r=e.name||"default",a=e.fps||30,l=e.blendMode;let h=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const p=c[u].keys;if(!(!p||p.length===0))if(p[0].morphTargets){const m={};let y;for(y=0;y<p.length;y++)if(p[y].morphTargets)for(let _=0;_<p[y].morphTargets.length;_++)m[p[y].morphTargets[_]]=-1;for(const _ in m){const g=[],f=[];for(let S=0;S!==p[y].morphTargets.length;++S){const w=p[y];g.push(w.time),f.push(w.morphTarget===_?1:0)}s.push(new $i(".morphTargetInfluence["+_+"]",g,f))}h=m.length*a}else{const m=".bones["+n[u].name+"]";i(Xi,m+".position",p,"pos",s),i(qi,m+".quaternion",p,"rot",s),i(Xi,m+".scale",p,"scl",s)}}return s.length===0?null:new this(r,h,s,l)}resetDuration(){const e=this.tracks;let n=0;for(let i=0,s=e.length;i!==s;++i){const r=this.tracks[i];n=Math.max(n,r.times[r.times.length-1])}return this.duration=n,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let n=0;n<this.tracks.length;n++)e=e&&this.tracks[n].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function ou(o){switch(o.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return $i;case"vector":case"vector2":case"vector3":case"vector4":return Xi;case"color":return Vc;case"quaternion":return qi;case"bool":case"boolean":return Yi;case"string":return Ki}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+o)}function au(o){if(o.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=ou(o.type);if(o.times===void 0){const n=[],i=[];zc(o.keys,n,i,"value"),o.times=n,o.values=i}return e.parse!==void 0?e.parse(o):new e(o.name,o.times,o.values,o.interpolation)}const Cn={enabled:!1,files:{},add:function(o,e){this.enabled!==!1&&(this.files[o]=e)},get:function(o){if(this.enabled!==!1)return this.files[o]},remove:function(o){delete this.files[o]},clear:function(){this.files={}}};class lu{constructor(e,n,i){const s=this;let r=!1,a=0,l=0,h;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=n,this.onError=i,this.itemStart=function(d){l++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,l),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,l),a===l&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return h?h(d):d},this.setURLModifier=function(d){return h=d,this},this.addHandler=function(d,u){return c.push(d,u),this},this.removeHandler=function(d){const u=c.indexOf(d);return u!==-1&&c.splice(u,2),this},this.getHandler=function(d){for(let u=0,p=c.length;u<p;u+=2){const m=c[u],y=c[u+1];if(m.global&&(m.lastIndex=0),m.test(d))return y}return null}}}const cu=new lu;class hi{constructor(e){this.manager=e!==void 0?e:cu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,n){const i=this;return new Promise(function(s,r){i.load(e,s,n,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}hi.DEFAULT_MATERIAL_NAME="__DEFAULT";const Sn={};class hu extends Error{constructor(e,n){super(e),this.response=n}}class Ra extends hi{constructor(e){super(e)}load(e,n,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Cn.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{n&&n(r),this.manager.itemEnd(e)},0),r;if(Sn[e]!==void 0){Sn[e].push({onLoad:n,onProgress:i,onError:s});return}Sn[e]=[],Sn[e].push({onLoad:n,onProgress:i,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),l=this.mimeType,h=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const d=Sn[e],u=c.body.getReader(),p=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),m=p?parseInt(p):0,y=m!==0;let _=0;const g=new ReadableStream({start(f){S();function S(){u.read().then(({done:w,value:x})=>{if(w)f.close();else{_+=x.byteLength;const P=new ProgressEvent("progress",{lengthComputable:y,loaded:_,total:m});for(let I=0,A=d.length;I<A;I++){const C=d[I];C.onProgress&&C.onProgress(P)}f.enqueue(x),S()}},w=>{f.error(w)})}}});return new Response(g)}else throw new hu(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(h){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(d=>new DOMParser().parseFromString(d,l));case"json":return c.json();default:if(l===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(l),p=u&&u[1]?u[1].toLowerCase():void 0,m=new TextDecoder(p);return c.arrayBuffer().then(y=>m.decode(y))}}}).then(c=>{Cn.add(e,c);const d=Sn[e];delete Sn[e];for(let u=0,p=d.length;u<p;u++){const m=d[u];m.onLoad&&m.onLoad(c)}}).catch(c=>{const d=Sn[e];if(d===void 0)throw this.manager.itemError(e),c;delete Sn[e];for(let u=0,p=d.length;u<p;u++){const m=d[u];m.onError&&m.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class du extends hi{constructor(e){super(e)}load(e,n,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Cn.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){n&&n(a),r.manager.itemEnd(e)},0),a;const l=Ms("img");function h(){d(),Cn.add(e,this),n&&n(this),r.manager.itemEnd(e)}function c(u){d(),s&&s(u),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){l.removeEventListener("load",h,!1),l.removeEventListener("error",c,!1)}return l.addEventListener("load",h,!1),l.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(l.crossOrigin=this.crossOrigin),r.manager.itemStart(e),l.src=e,l}}class uu extends hi{constructor(e){super(e)}load(e,n,i,s){const r=this,a=new Ma,l=new Ra(this.manager);return l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setPath(this.path),l.setWithCredentials(r.withCredentials),l.load(e,function(h){let c;try{c=r.parse(h)}catch(d){if(s!==void 0)s(d);else{console.error(d);return}}c.image!==void 0?a.image=c.image:c.data!==void 0&&(a.image.width=c.width,a.image.height=c.height,a.image.data=c.data),a.wrapS=c.wrapS!==void 0?c.wrapS:Jt,a.wrapT=c.wrapT!==void 0?c.wrapT:Jt,a.magFilter=c.magFilter!==void 0?c.magFilter:ht,a.minFilter=c.minFilter!==void 0?c.minFilter:ht,a.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(a.colorSpace=c.colorSpace),c.flipY!==void 0&&(a.flipY=c.flipY),c.format!==void 0&&(a.format=c.format),c.type!==void 0&&(a.type=c.type),c.mipmaps!==void 0&&(a.mipmaps=c.mipmaps,a.minFilter=un),c.mipmapCount===1&&(a.minFilter=ht),c.generateMipmaps!==void 0&&(a.generateMipmaps=c.generateMipmaps),a.needsUpdate=!0,n&&n(a,c)},i,s),a}}class Gc extends hi{constructor(e){super(e)}load(e,n,i,s){const r=new yt,a=new du(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(l){r.image=l,r.needsUpdate=!0,n!==void 0&&n(r)},i,s),r}}class Rr extends dt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new _e(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}const io=new Fe,vl=new D,bl=new D;class Pa{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ce(512,512),this.map=null,this.mapPass=null,this.matrix=new Fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wa,this._frameExtents=new Ce(1,1),this._viewportCount=1,this._viewports=[new Ke(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;vl.setFromMatrixPosition(e.matrixWorld),n.position.copy(vl),bl.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(bl),n.updateMatrixWorld(),io.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(io),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(io)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class pu extends Pa{constructor(){super(new Ut(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const n=this.camera,i=Gi*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||n.far;(i!==n.fov||s!==n.aspect||r!==n.far)&&(n.fov=i,n.aspect=s,n.far=r,n.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class fu extends Rr{constructor(e,n,i=0,s=Math.PI/3,r=0,a=2){super(e,n),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new pu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Sl=new Fe,ps=new D,so=new D;class mu extends Pa{constructor(){super(new Ut(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ce(4,2),this._viewportCount=6,this._viewports=[new Ke(2,1,1,1),new Ke(0,1,1,1),new Ke(3,1,1,1),new Ke(1,1,1,1),new Ke(3,0,1,1),new Ke(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(e,n=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),ps.setFromMatrixPosition(e.matrixWorld),i.position.copy(ps),so.copy(i.position),so.add(this._cubeDirections[n]),i.up.copy(this._cubeUps[n]),i.lookAt(so),i.updateMatrixWorld(),s.makeTranslation(-ps.x,-ps.y,-ps.z),Sl.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sl)}}class gu extends Rr{constructor(e,n,i=0,s=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new mu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Ia extends Fc{constructor(e=-1,n=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,l=s+n,h=s-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,l-=d*this.view.offsetY,h=l-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,l,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class _u extends Pa{constructor(){super(new Ia(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wc extends Rr{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.shadow=new _u}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class yu extends Rr{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class xs{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let n="";for(let i=0,s=e.length;i<s;i++)n+=String.fromCharCode(e[i]);try{return decodeURIComponent(escape(n))}catch{return n}}static extractUrlBase(e){const n=e.lastIndexOf("/");return n===-1?"./":e.slice(0,n+1)}static resolveURL(e,n){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(n)&&/^\//.test(e)&&(n=n.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:n+e)}}class xu extends hi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,n,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Cn.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{n&&n(c),r.manager.itemEnd(e)}).catch(c=>{s&&s(c)});return}return setTimeout(function(){n&&n(a),r.manager.itemEnd(e)},0),a}const l={};l.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",l.headers=this.requestHeader;const h=fetch(e,l).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Cn.add(e,c),n&&n(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),Cn.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Cn.add(e,h),r.manager.itemStart(e)}}class vu extends Ut{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class bu{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ml(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=Ml();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}function Ml(){return performance.now()}class Su{constructor(e,n,i){this.binding=e,this.valueSize=i;let s,r,a;switch(n){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(i*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(i*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(i*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,n){const i=this.buffer,s=this.valueSize,r=e*s+s;let a=this.cumulativeWeight;if(a===0){for(let l=0;l!==s;++l)i[r+l]=i[l];a=n}else{a+=n;const l=n/a;this._mixBufferRegion(i,r,0,l,s)}this.cumulativeWeight=a}accumulateAdditive(e){const n=this.buffer,i=this.valueSize,s=i*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(n,s,0,e,i),this.cumulativeWeightAdditive+=e}apply(e){const n=this.valueSize,i=this.buffer,s=e*n+n,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,l=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const h=n*this._origIndex;this._mixBufferRegion(i,s,h,1-r,n)}a>0&&this._mixBufferRegionAdditive(i,s,this._addIndex*n,1,n);for(let h=n,c=n+n;h!==c;++h)if(i[h]!==i[h+n]){l.setValue(i,s);break}}saveOriginalState(){const e=this.binding,n=this.buffer,i=this.valueSize,s=i*this._origIndex;e.getValue(n,s);for(let r=i,a=s;r!==a;++r)n[r]=n[s+r%i];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,n=e+this.valueSize;for(let i=e;i<n;i++)this.buffer[i]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,n=this._addIndex*this.valueSize;for(let i=0;i<this.valueSize;i++)this.buffer[n+i]=this.buffer[e+i]}_select(e,n,i,s,r){if(s>=.5)for(let a=0;a!==r;++a)e[n+a]=e[i+a]}_slerp(e,n,i,s){Xt.slerpFlat(e,n,e,n,e,i,s)}_slerpAdditive(e,n,i,s,r){const a=this._workIndex*r;Xt.multiplyQuaternionsFlat(e,a,e,n,e,i),Xt.slerpFlat(e,n,e,n,e,a,s)}_lerp(e,n,i,s,r){const a=1-s;for(let l=0;l!==r;++l){const h=n+l;e[h]=e[h]*a+e[i+l]*s}}_lerpAdditive(e,n,i,s,r){for(let a=0;a!==r;++a){const l=n+a;e[l]=e[l]+e[i+a]*s}}}const La="\\[\\]\\.:\\/",Mu=new RegExp("["+La+"]","g"),Da="[^"+La+"]",Eu="[^"+La.replace("\\.","")+"]",wu=/((?:WC+[\/:])*)/.source.replace("WC",Da),Tu=/(WCOD+)?/.source.replace("WCOD",Eu),Au=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Da),Cu=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Da),Ru=new RegExp("^"+wu+Tu+Au+Cu+"$"),Pu=["material","materials","bones","map"];class Iu{constructor(e,n,i){const s=i||Je.parseTrackName(n);this._targetGroup=e,this._bindings=e.subscribe_(n,s)}getValue(e,n){this.bind();const i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,n)}setValue(e,n){const i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,n)}bind(){const e=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=e.length;n!==i;++n)e[n].bind()}unbind(){const e=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=e.length;n!==i;++n)e[n].unbind()}}class Je{constructor(e,n,i){this.path=n,this.parsedPath=i||Je.parseTrackName(n),this.node=Je.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,n,i){return e&&e.isAnimationObjectGroup?new Je.Composite(e,n,i):new Je(e,n,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Mu,"")}static parseTrackName(e){const n=Ru.exec(e);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=i.nodeName.substring(s+1);Pu.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,n){if(n===void 0||n===""||n==="."||n===-1||n===e.name||n===e.uuid)return e;if(e.skeleton){const i=e.skeleton.getBoneByName(n);if(i!==void 0)return i}if(e.children){const i=function(r){for(let a=0;a<r.length;a++){const l=r[a];if(l.name===n||l.uuid===n)return l;const h=i(l.children);if(h)return h}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,n){e[n]=this.targetObject[this.propertyName]}_getValue_array(e,n){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[n++]=i[s]}_getValue_arrayElement(e,n){e[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,n){this.resolvedProperty.toArray(e,n)}_setValue_direct(e,n){this.targetObject[this.propertyName]=e[n]}_setValue_direct_setNeedsUpdate(e,n){this.targetObject[this.propertyName]=e[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,n){this.targetObject[this.propertyName]=e[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,n){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[n++]}_setValue_array_setNeedsUpdate(e,n){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,n){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,n){this.resolvedProperty[this.propertyIndex]=e[n]}_setValue_arrayElement_setNeedsUpdate(e,n){this.resolvedProperty[this.propertyIndex]=e[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,n){this.resolvedProperty[this.propertyIndex]=e[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,n){this.resolvedProperty.fromArray(e,n)}_setValue_fromArray_setNeedsUpdate(e,n){this.resolvedProperty.fromArray(e,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,n){this.resolvedProperty.fromArray(e,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,n){this.bind(),this.getValue(e,n)}_setValue_unbound(e,n){this.bind(),this.setValue(e,n)}bind(){let e=this.node;const n=this.parsedPath,i=n.objectName,s=n.propertyName;let r=n.propertyIndex;if(e||(e=Je.findNode(this.rootNode,n.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=n.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===c){c=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[s];if(a===void 0){const c=n.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let l=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?l=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let h=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}h=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(h=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(h=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[h],this.setValue=this.SetterByBindingTypeAndVersioning[h][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Je.Composite=Iu;Je.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Je.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Je.prototype.GetterByBindingType=[Je.prototype._getValue_direct,Je.prototype._getValue_array,Je.prototype._getValue_arrayElement,Je.prototype._getValue_toArray];Je.prototype.SetterByBindingTypeAndVersioning=[[Je.prototype._setValue_direct,Je.prototype._setValue_direct_setNeedsUpdate,Je.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_array,Je.prototype._setValue_array_setNeedsUpdate,Je.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_arrayElement,Je.prototype._setValue_arrayElement_setNeedsUpdate,Je.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_fromArray,Je.prototype._setValue_fromArray_setNeedsUpdate,Je.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Lu{constructor(e,n,i=null,s=n.blendMode){this._mixer=e,this._clip=n,this._localRoot=i,this.blendMode=s;const r=n.tracks,a=r.length,l=new Array(a),h={endingStart:Pi,endingEnd:Pi};for(let c=0;c!==a;++c){const d=r[c].createInterpolant(null);l[c]=d,d.settings=h}this._interpolantSettings=h,this._interpolants=l,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Uh,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,n){return this.loop=e,this.repetitions=n,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,n,i){if(e.fadeOut(n),this.fadeIn(n),i){const s=this._clip.duration,r=e._clip.duration,a=r/s,l=s/r;e.warp(1,a,n),this.warp(l,1,n)}return this}crossFadeTo(e,n,i){return e.crossFadeFrom(this,n,i)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,n,i){const s=this._mixer,r=s.time,a=this.timeScale;let l=this._timeScaleInterpolant;l===null&&(l=s._lendControlInterpolant(),this._timeScaleInterpolant=l);const h=l.parameterPositions,c=l.sampleValues;return h[0]=r,h[1]=r+i,c[0]=e/a,c[1]=n/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,n,i,s){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const h=(e-r)*i;h<0||i===0?n=0:(this._startTime=null,n=i*h)}n*=this._updateTimeScale(e);const a=this._updateTime(n),l=this._updateWeight(e);if(l>0){const h=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Oh:for(let d=0,u=h.length;d!==u;++d)h[d].evaluate(a),c[d].accumulateAdditive(l);break;case ya:default:for(let d=0,u=h.length;d!==u;++d)h[d].evaluate(a),c[d].accumulate(s,l)}}}_updateWeight(e){let n=0;if(this.enabled){n=this.weight;const i=this._weightInterpolant;if(i!==null){const s=i.evaluate(e)[0];n*=s,e>i.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=n,n}_updateTimeScale(e){let n=0;if(!this.paused){n=this.timeScale;const i=this._timeScaleInterpolant;if(i!==null){const s=i.evaluate(e)[0];n*=s,e>i.parameterPositions[1]&&(this.stopWarping(),n===0?this.paused=!0:this.timeScale=n)}}return this._effectiveTimeScale=n,n}_updateTime(e){const n=this._clip.duration,i=this.loop;let s=this.time+e,r=this._loopCount;const a=i===Nh;if(e===0)return r===-1?s:a&&(r&1)===1?n-s:s;if(i===Fh){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=n)s=n;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=n||s<0){const l=Math.floor(s/n);s-=n*l,r+=Math.abs(l);const h=this.repetitions-r;if(h<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?n:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(h===1){const c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:l})}}else this.time=s;if(a&&(r&1)===1)return n-s}return s}_setEndings(e,n,i){const s=this._interpolantSettings;i?(s.endingStart=Ii,s.endingEnd=Ii):(e?s.endingStart=this.zeroSlopeAtStart?Ii:Pi:s.endingStart=br,n?s.endingEnd=this.zeroSlopeAtEnd?Ii:Pi:s.endingEnd=br)}_scheduleFading(e,n,i){const s=this._mixer,r=s.time;let a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);const l=a.parameterPositions,h=a.sampleValues;return l[0]=r,h[0]=n,l[1]=r+e,h[1]=i,this}}const Du=new Float32Array(1);class Fu extends $n{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,n){const i=e._localRoot||this._root,s=e._clip.tracks,r=s.length,a=e._propertyBindings,l=e._interpolants,h=i.uuid,c=this._bindingsByRootAndName;let d=c[h];d===void 0&&(d={},c[h]=d);for(let u=0;u!==r;++u){const p=s[u],m=p.name;let y=d[m];if(y!==void 0)++y.referenceCount,a[u]=y;else{if(y=a[u],y!==void 0){y._cacheIndex===null&&(++y.referenceCount,this._addInactiveBinding(y,h,m));continue}const _=n&&n._propertyBindings[u].binding.parsedPath;y=new Su(Je.create(i,m,_),p.ValueTypeName,p.getValueSize()),++y.referenceCount,this._addInactiveBinding(y,h,m),a[u]=y}l[u].resultBuffer=y.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const i=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,i)}const n=e._propertyBindings;for(let i=0,s=n.length;i!==s;++i){const r=n[i];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const n=e._propertyBindings;for(let i=0,s=n.length;i!==s;++i){const r=n[i];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const n=e._cacheIndex;return n!==null&&n<this._nActiveActions}_addInactiveAction(e,n,i){const s=this._actions,r=this._actionsByClip;let a=r[n];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[n]=a;else{const l=a.knownActions;e._byClipCacheIndex=l.length,l.push(e)}e._cacheIndex=s.length,s.push(e),a.actionByRoot[i]=e}_removeInactiveAction(e){const n=this._actions,i=n[n.length-1],s=e._cacheIndex;i._cacheIndex=s,n[s]=i,n.pop(),e._cacheIndex=null;const r=e._clip.uuid,a=this._actionsByClip,l=a[r],h=l.knownActions,c=h[h.length-1],d=e._byClipCacheIndex;c._byClipCacheIndex=d,h[d]=c,h.pop(),e._byClipCacheIndex=null;const u=l.actionByRoot,p=(e._localRoot||this._root).uuid;delete u[p],h.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const n=e._propertyBindings;for(let i=0,s=n.length;i!==s;++i){const r=n[i];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const n=this._actions,i=e._cacheIndex,s=this._nActiveActions++,r=n[s];e._cacheIndex=s,n[s]=e,r._cacheIndex=i,n[i]=r}_takeBackAction(e){const n=this._actions,i=e._cacheIndex,s=--this._nActiveActions,r=n[s];e._cacheIndex=s,n[s]=e,r._cacheIndex=i,n[i]=r}_addInactiveBinding(e,n,i){const s=this._bindingsByRootAndName,r=this._bindings;let a=s[n];a===void 0&&(a={},s[n]=a),a[i]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const n=this._bindings,i=e.binding,s=i.rootNode.uuid,r=i.path,a=this._bindingsByRootAndName,l=a[s],h=n[n.length-1],c=e._cacheIndex;h._cacheIndex=c,n[c]=h,n.pop(),delete l[r],Object.keys(l).length===0&&delete a[s]}_lendBinding(e){const n=this._bindings,i=e._cacheIndex,s=this._nActiveBindings++,r=n[s];e._cacheIndex=s,n[s]=e,r._cacheIndex=i,n[i]=r}_takeBackBinding(e){const n=this._bindings,i=e._cacheIndex,s=--this._nActiveBindings,r=n[s];e._cacheIndex=s,n[s]=e,r._cacheIndex=i,n[i]=r}_lendControlInterpolant(){const e=this._controlInterpolants,n=this._nActiveControlInterpolants++;let i=e[n];return i===void 0&&(i=new Hc(new Float32Array(2),new Float32Array(2),1,Du),i.__cacheIndex=n,e[n]=i),i}_takeBackControlInterpolant(e){const n=this._controlInterpolants,i=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=n[s];e.__cacheIndex=s,n[s]=e,r.__cacheIndex=i,n[i]=r}clipAction(e,n,i){const s=n||this._root,r=s.uuid;let a=typeof e=="string"?sa.findByName(s,e):e;const l=a!==null?a.uuid:e,h=this._actionsByClip[l];let c=null;if(i===void 0&&(a!==null?i=a.blendMode:i=ya),h!==void 0){const u=h.actionByRoot[r];if(u!==void 0&&u.blendMode===i)return u;c=h.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const d=new Lu(this,a,n,i);return this._bindAction(d,c),this._addInactiveAction(d,l,r),d}existingAction(e,n){const i=n||this._root,s=i.uuid,r=typeof e=="string"?sa.findByName(i,e):e,a=r?r.uuid:e,l=this._actionsByClip[a];return l!==void 0&&l.actionByRoot[s]||null}stopAllAction(){const e=this._actions,n=this._nActiveActions;for(let i=n-1;i>=0;--i)e[i].stop();return this}update(e){e*=this.timeScale;const n=this._actions,i=this._nActiveActions,s=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==i;++c)n[c]._update(s,e,r,a);const l=this._bindings,h=this._nActiveBindings;for(let c=0;c!==h;++c)l[c].apply(a);return this}setTime(e){this.time=0;for(let n=0;n<this._actions.length;n++)this._actions[n].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const n=this._actions,i=e.uuid,s=this._actionsByClip,r=s[i];if(r!==void 0){const a=r.knownActions;for(let l=0,h=a.length;l!==h;++l){const c=a[l];this._deactivateAction(c);const d=c._cacheIndex,u=n[n.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=d,n[d]=u,n.pop(),this._removeInactiveBindingsForAction(c)}delete s[i]}}uncacheRoot(e){const n=e.uuid,i=this._actionsByClip;for(const a in i){const l=i[a].actionByRoot,h=l[n];h!==void 0&&(this._deactivateAction(h),this._removeInactiveAction(h))}const s=this._bindingsByRootAndName,r=s[n];if(r!==void 0)for(const a in r){const l=r[a];l.restoreOriginalState(),this._removeInactiveBinding(l)}}uncacheAction(e,n){const i=this.existingAction(e,n);i!==null&&(this._deactivateAction(i),this._removeInactiveAction(i))}}const El=new Fe;class $c{constructor(e,n,i=0,s=1/0){this.ray=new ji(e,n),this.near=i,this.far=s,this.camera=null,this.layers=new ba,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return El.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(El),this}intersectObject(e,n=!0,i=[]){return ra(e,this,i,n),i.sort(wl),i}intersectObjects(e,n=!0,i=[]){for(let s=0,r=e.length;s<r;s++)ra(e[s],this,i,n);return i.sort(wl),i}}function wl(o,e){return o.distance-e.distance}function ra(o,e,n,i){let s=!0;if(o.layers.test(e.layers)&&o.raycast(e,n)===!1&&(s=!1),s===!0&&i===!0){const r=o.children;for(let a=0,l=r.length;a<l;a++)ra(r[a],e,n,!0)}}class Tl{constructor(e=1,n=0,i=0){this.radius=e,this.phi=n,this.theta=i}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Be(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Be(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Al=new D,tr=new D,Cl=new D;class Uu extends dt{constructor(e,n,i){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=i,this.type="DirectionalLightHelper",n===void 0&&(n=1);let s=new Bt;s.setAttribute("position",new Pt([-n,n,0,n,n,0,n,-n,0,-n,-n,0,-n,n,0],3));const r=new Ar({fog:!1,toneMapped:!1});this.lightPlane=new Es(s,r),this.add(this.lightPlane),s=new Bt,s.setAttribute("position",new Pt([0,0,0,0,0,1],3)),this.targetLine=new Es(s,r),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Al.setFromMatrixPosition(this.light.matrixWorld),tr.setFromMatrixPosition(this.light.target.matrixWorld),Cl.subVectors(tr,Al),this.lightPlane.lookAt(tr),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(tr),this.targetLine.scale.z=Cl.length()}}class Nu extends Oc{constructor(e=1){const n=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],i=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],s=new Bt;s.setAttribute("position",new Pt(n,3)),s.setAttribute("color",new Pt(i,3));const r=new Ar({vertexColors:!0,toneMapped:!1});super(s,r),this.type="AxesHelper"}setColors(e,n,i){const s=new _e,r=this.geometry.attributes.color.array;return s.set(e),s.toArray(r,0),s.toArray(r,3),s.set(n),s.toArray(r,6),s.toArray(r,9),s.set(i),s.toArray(r,12),s.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class Ou extends $n{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function Rl(o,e,n,i){const s=Bu(i);switch(n){case yc:return o*e;case vc:return o*e;case bc:return o*e*2;case fa:return o*e/s.components*s.byteLength;case ma:return o*e/s.components*s.byteLength;case Sc:return o*e*2/s.components*s.byteLength;case ga:return o*e*2/s.components*s.byteLength;case xc:return o*e*3/s.components*s.byteLength;case en:return o*e*4/s.components*s.byteLength;case _a:return o*e*4/s.components*s.byteLength;case hr:case dr:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case ur:case pr:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case Ro:case Io:return Math.max(o,16)*Math.max(e,8)/4;case Co:case Po:return Math.max(o,8)*Math.max(e,8)/2;case Lo:case Do:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case Fo:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case Uo:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case No:return Math.floor((o+4)/5)*Math.floor((e+3)/4)*16;case Oo:return Math.floor((o+4)/5)*Math.floor((e+4)/5)*16;case Bo:return Math.floor((o+5)/6)*Math.floor((e+4)/5)*16;case ko:return Math.floor((o+5)/6)*Math.floor((e+5)/6)*16;case zo:return Math.floor((o+7)/8)*Math.floor((e+4)/5)*16;case Ho:return Math.floor((o+7)/8)*Math.floor((e+5)/6)*16;case Vo:return Math.floor((o+7)/8)*Math.floor((e+7)/8)*16;case Go:return Math.floor((o+9)/10)*Math.floor((e+4)/5)*16;case Wo:return Math.floor((o+9)/10)*Math.floor((e+5)/6)*16;case $o:return Math.floor((o+9)/10)*Math.floor((e+7)/8)*16;case qo:return Math.floor((o+9)/10)*Math.floor((e+9)/10)*16;case Xo:return Math.floor((o+11)/12)*Math.floor((e+9)/10)*16;case jo:return Math.floor((o+11)/12)*Math.floor((e+11)/12)*16;case fr:case Yo:case Ko:return Math.ceil(o/4)*Math.ceil(e/4)*16;case Mc:case Zo:return Math.ceil(o/4)*Math.ceil(e/4)*8;case Qo:case Jo:return Math.ceil(o/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function Bu(o){switch(o){case In:case mc:return{byteLength:1,components:1};case vs:case gc:case Tn:return{byteLength:2,components:1};case ua:case pa:return{byteLength:2,components:4};case li:case da:case Vt:return{byteLength:4,components:1};case _c:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ha}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ha);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function qc(){let o=null,e=!1,n=null,i=null;function s(r,a){n(r,a),i=o.requestAnimationFrame(s)}return{start:function(){e!==!0&&n!==null&&(i=o.requestAnimationFrame(s),e=!0)},stop:function(){o.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){n=r},setContext:function(r){o=r}}}function ku(o){const e=new WeakMap;function n(l,h){const c=l.array,d=l.usage,u=c.byteLength,p=o.createBuffer();o.bindBuffer(h,p),o.bufferData(h,c,d),l.onUploadCallback();let m;if(c instanceof Float32Array)m=o.FLOAT;else if(c instanceof Uint16Array)l.isFloat16BufferAttribute?m=o.HALF_FLOAT:m=o.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=o.SHORT;else if(c instanceof Uint32Array)m=o.UNSIGNED_INT;else if(c instanceof Int32Array)m=o.INT;else if(c instanceof Int8Array)m=o.BYTE;else if(c instanceof Uint8Array)m=o.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:l.version,size:u}}function i(l,h,c){const d=h.array,u=h.updateRanges;if(o.bindBuffer(c,l),u.length===0)o.bufferSubData(c,0,d);else{u.sort((m,y)=>m.start-y.start);let p=0;for(let m=1;m<u.length;m++){const y=u[p],_=u[m];_.start<=y.start+y.count+1?y.count=Math.max(y.count,_.start+_.count-y.start):(++p,u[p]=_)}u.length=p+1;for(let m=0,y=u.length;m<y;m++){const _=u[m];o.bufferSubData(c,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}h.clearUpdateRanges()}h.onUploadCallback()}function s(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function r(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=e.get(l);h&&(o.deleteBuffer(h.buffer),e.delete(l))}function a(l,h){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const d=e.get(l);(!d||d.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const c=e.get(l);if(c===void 0)e.set(l,n(l,h));else if(c.version<l.version){if(c.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,l,h),c.version=l.version}}return{get:s,remove:r,update:a}}var zu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Vu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$u=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Xu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ju=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Yu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ku=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ju=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ep=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,tp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,np=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ip=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,rp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,op=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ap=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,lp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,cp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,hp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,dp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,up=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,mp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gp="gl_FragColor = linearToOutputTexel( gl_FragColor );",_p=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,yp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,xp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,vp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,bp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Mp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ep=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Tp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ap=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Cp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Rp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Pp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ip=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Lp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Dp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Up=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Np=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Op=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Bp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,kp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,zp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Hp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Vp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$p=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,qp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Yp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Qp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Jp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ef=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,nf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,rf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,of=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,af=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,cf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,hf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,df=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,uf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ff=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,gf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_f=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,yf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,xf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Mf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ef=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,wf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Tf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Af=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Cf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Pf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,If=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Df=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ff=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Uf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Nf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Of=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,kf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const zf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Hf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$f=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Xf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,jf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Yf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Kf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,em=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,tm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,im=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,rm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,om=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,am=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,lm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,dm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,um=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,mm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_m=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ym=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Oe={alphahash_fragment:zu,alphahash_pars_fragment:Hu,alphamap_fragment:Vu,alphamap_pars_fragment:Gu,alphatest_fragment:Wu,alphatest_pars_fragment:$u,aomap_fragment:qu,aomap_pars_fragment:Xu,batching_pars_vertex:ju,batching_vertex:Yu,begin_vertex:Ku,beginnormal_vertex:Zu,bsdfs:Qu,iridescence_fragment:Ju,bumpmap_pars_fragment:ep,clipping_planes_fragment:tp,clipping_planes_pars_fragment:np,clipping_planes_pars_vertex:ip,clipping_planes_vertex:sp,color_fragment:rp,color_pars_fragment:op,color_pars_vertex:ap,color_vertex:lp,common:cp,cube_uv_reflection_fragment:hp,defaultnormal_vertex:dp,displacementmap_pars_vertex:up,displacementmap_vertex:pp,emissivemap_fragment:fp,emissivemap_pars_fragment:mp,colorspace_fragment:gp,colorspace_pars_fragment:_p,envmap_fragment:yp,envmap_common_pars_fragment:xp,envmap_pars_fragment:vp,envmap_pars_vertex:bp,envmap_physical_pars_fragment:Lp,envmap_vertex:Sp,fog_vertex:Mp,fog_pars_vertex:Ep,fog_fragment:wp,fog_pars_fragment:Tp,gradientmap_pars_fragment:Ap,lightmap_pars_fragment:Cp,lights_lambert_fragment:Rp,lights_lambert_pars_fragment:Pp,lights_pars_begin:Ip,lights_toon_fragment:Dp,lights_toon_pars_fragment:Fp,lights_phong_fragment:Up,lights_phong_pars_fragment:Np,lights_physical_fragment:Op,lights_physical_pars_fragment:Bp,lights_fragment_begin:kp,lights_fragment_maps:zp,lights_fragment_end:Hp,logdepthbuf_fragment:Vp,logdepthbuf_pars_fragment:Gp,logdepthbuf_pars_vertex:Wp,logdepthbuf_vertex:$p,map_fragment:qp,map_pars_fragment:Xp,map_particle_fragment:jp,map_particle_pars_fragment:Yp,metalnessmap_fragment:Kp,metalnessmap_pars_fragment:Zp,morphinstance_vertex:Qp,morphcolor_vertex:Jp,morphnormal_vertex:ef,morphtarget_pars_vertex:tf,morphtarget_vertex:nf,normal_fragment_begin:sf,normal_fragment_maps:rf,normal_pars_fragment:of,normal_pars_vertex:af,normal_vertex:lf,normalmap_pars_fragment:cf,clearcoat_normal_fragment_begin:hf,clearcoat_normal_fragment_maps:df,clearcoat_pars_fragment:uf,iridescence_pars_fragment:pf,opaque_fragment:ff,packing:mf,premultiplied_alpha_fragment:gf,project_vertex:_f,dithering_fragment:yf,dithering_pars_fragment:xf,roughnessmap_fragment:vf,roughnessmap_pars_fragment:bf,shadowmap_pars_fragment:Sf,shadowmap_pars_vertex:Mf,shadowmap_vertex:Ef,shadowmask_pars_fragment:wf,skinbase_vertex:Tf,skinning_pars_vertex:Af,skinning_vertex:Cf,skinnormal_vertex:Rf,specularmap_fragment:Pf,specularmap_pars_fragment:If,tonemapping_fragment:Lf,tonemapping_pars_fragment:Df,transmission_fragment:Ff,transmission_pars_fragment:Uf,uv_pars_fragment:Nf,uv_pars_vertex:Of,uv_vertex:Bf,worldpos_vertex:kf,background_vert:zf,background_frag:Hf,backgroundCube_vert:Vf,backgroundCube_frag:Gf,cube_vert:Wf,cube_frag:$f,depth_vert:qf,depth_frag:Xf,distanceRGBA_vert:jf,distanceRGBA_frag:Yf,equirect_vert:Kf,equirect_frag:Zf,linedashed_vert:Qf,linedashed_frag:Jf,meshbasic_vert:em,meshbasic_frag:tm,meshlambert_vert:nm,meshlambert_frag:im,meshmatcap_vert:sm,meshmatcap_frag:rm,meshnormal_vert:om,meshnormal_frag:am,meshphong_vert:lm,meshphong_frag:cm,meshphysical_vert:hm,meshphysical_frag:dm,meshtoon_vert:um,meshtoon_frag:pm,points_vert:fm,points_frag:mm,shadow_vert:gm,shadow_frag:_m,sprite_vert:ym,sprite_frag:xm},re={common:{diffuse:{value:new _e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new Ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new _e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new _e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new _e(16777215)},opacity:{value:1},center:{value:new Ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},dn={basic:{uniforms:Ft([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:Ft([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new _e(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:Ft([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new _e(0)},specular:{value:new _e(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:Ft([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new _e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:Ft([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new _e(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:Ft([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:Ft([re.points,re.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:Ft([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:Ft([re.common,re.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:Ft([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:Ft([re.sprite,re.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:Ft([re.common,re.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:Ft([re.lights,re.fog,{color:{value:new _e(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};dn.physical={uniforms:Ft([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new Ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new _e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new Ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new _e(0)},specularColor:{value:new _e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new Ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const nr={r:0,b:0,g:0},Jn=new fn,vm=new Fe;function bm(o,e,n,i,s,r,a){const l=new _e(0);let h=r===!0?0:1,c,d,u=null,p=0,m=null;function y(w){let x=w.isScene===!0?w.background:null;return x&&x.isTexture&&(x=(w.backgroundBlurriness>0?n:e).get(x)),x}function _(w){let x=!1;const P=y(w);P===null?f(l,h):P&&P.isColor&&(f(P,1),x=!0);const I=o.xr.getEnvironmentBlendMode();I==="additive"?i.buffers.color.setClear(0,0,0,1,a):I==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(o.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function g(w,x){const P=y(x);P&&(P.isCubeTexture||P.mapping===Tr)?(d===void 0&&(d=new Gt(new Ts(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:Wi(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:Rt,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(I,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),Jn.copy(x.backgroundRotation),Jn.x*=-1,Jn.y*=-1,Jn.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(Jn.y*=-1,Jn.z*=-1),d.material.uniforms.envMap.value=P,d.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(vm.makeRotationFromEuler(Jn)),d.material.toneMapped=qe.getTransfer(P.colorSpace)!==it,(u!==P||p!==P.version||m!==o.toneMapping)&&(d.material.needsUpdate=!0,u=P,p=P.version,m=o.toneMapping),d.layers.enableAll(),w.unshift(d,d.geometry,d.material,0,0,null)):P&&P.isTexture&&(c===void 0&&(c=new Gt(new As(2,2),new Wn({name:"BackgroundMaterial",uniforms:Wi(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:Ct,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=P,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=qe.getTransfer(P.colorSpace)!==it,P.matrixAutoUpdate===!0&&P.updateMatrix(),c.material.uniforms.uvTransform.value.copy(P.matrix),(u!==P||p!==P.version||m!==o.toneMapping)&&(c.material.needsUpdate=!0,u=P,p=P.version,m=o.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function f(w,x){w.getRGB(nr,Dc(o)),i.buffers.color.setClear(nr.r,nr.g,nr.b,x,a)}function S(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return l},setClearColor:function(w,x=1){l.set(w),h=x,f(l,h)},getClearAlpha:function(){return h},setClearAlpha:function(w){h=w,f(l,h)},render:_,addToRenderList:g,dispose:S}}function Sm(o,e){const n=o.getParameter(o.MAX_VERTEX_ATTRIBS),i={},s=p(null);let r=s,a=!1;function l(v,R,z,O,V){let q=!1;const G=u(O,z,R);r!==G&&(r=G,c(r.object)),q=m(v,O,z,V),q&&y(v,O,z,V),V!==null&&e.update(V,o.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,x(v,R,z,O),V!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function h(){return o.createVertexArray()}function c(v){return o.bindVertexArray(v)}function d(v){return o.deleteVertexArray(v)}function u(v,R,z){const O=z.wireframe===!0;let V=i[v.id];V===void 0&&(V={},i[v.id]=V);let q=V[R.id];q===void 0&&(q={},V[R.id]=q);let G=q[O];return G===void 0&&(G=p(h()),q[O]=G),G}function p(v){const R=[],z=[],O=[];for(let V=0;V<n;V++)R[V]=0,z[V]=0,O[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:z,attributeDivisors:O,object:v,attributes:{},index:null}}function m(v,R,z,O){const V=r.attributes,q=R.attributes;let G=0;const Z=z.getAttributes();for(const W in Z)if(Z[W].location>=0){const ie=V[W];let xe=q[W];if(xe===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(xe=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(xe=v.instanceColor)),ie===void 0||ie.attribute!==xe||xe&&ie.data!==xe.data)return!0;G++}return r.attributesNum!==G||r.index!==O}function y(v,R,z,O){const V={},q=R.attributes;let G=0;const Z=z.getAttributes();for(const W in Z)if(Z[W].location>=0){let ie=q[W];ie===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(ie=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(ie=v.instanceColor));const xe={};xe.attribute=ie,ie&&ie.data&&(xe.data=ie.data),V[W]=xe,G++}r.attributes=V,r.attributesNum=G,r.index=O}function _(){const v=r.newAttributes;for(let R=0,z=v.length;R<z;R++)v[R]=0}function g(v){f(v,0)}function f(v,R){const z=r.newAttributes,O=r.enabledAttributes,V=r.attributeDivisors;z[v]=1,O[v]===0&&(o.enableVertexAttribArray(v),O[v]=1),V[v]!==R&&(o.vertexAttribDivisor(v,R),V[v]=R)}function S(){const v=r.newAttributes,R=r.enabledAttributes;for(let z=0,O=R.length;z<O;z++)R[z]!==v[z]&&(o.disableVertexAttribArray(z),R[z]=0)}function w(v,R,z,O,V,q,G){G===!0?o.vertexAttribIPointer(v,R,z,V,q):o.vertexAttribPointer(v,R,z,O,V,q)}function x(v,R,z,O){_();const V=O.attributes,q=z.getAttributes(),G=R.defaultAttributeValues;for(const Z in q){const W=q[Z];if(W.location>=0){let ne=V[Z];if(ne===void 0&&(Z==="instanceMatrix"&&v.instanceMatrix&&(ne=v.instanceMatrix),Z==="instanceColor"&&v.instanceColor&&(ne=v.instanceColor)),ne!==void 0){const ie=ne.normalized,xe=ne.itemSize,we=e.get(ne);if(we===void 0)continue;const Ne=we.buffer,X=we.type,te=we.bytesPerElement,ge=X===o.INT||X===o.UNSIGNED_INT||ne.gpuType===da;if(ne.isInterleavedBufferAttribute){const oe=ne.data,Me=oe.stride,$e=ne.offset;if(oe.isInstancedInterleavedBuffer){for(let Ae=0;Ae<W.locationSize;Ae++)f(W.location+Ae,oe.meshPerAttribute);v.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Ae=0;Ae<W.locationSize;Ae++)g(W.location+Ae);o.bindBuffer(o.ARRAY_BUFFER,Ne);for(let Ae=0;Ae<W.locationSize;Ae++)w(W.location+Ae,xe/W.locationSize,X,ie,Me*te,($e+xe/W.locationSize*Ae)*te,ge)}else{if(ne.isInstancedBufferAttribute){for(let oe=0;oe<W.locationSize;oe++)f(W.location+oe,ne.meshPerAttribute);v.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let oe=0;oe<W.locationSize;oe++)g(W.location+oe);o.bindBuffer(o.ARRAY_BUFFER,Ne);for(let oe=0;oe<W.locationSize;oe++)w(W.location+oe,xe/W.locationSize,X,ie,xe*te,xe/W.locationSize*oe*te,ge)}}else if(G!==void 0){const ie=G[Z];if(ie!==void 0)switch(ie.length){case 2:o.vertexAttrib2fv(W.location,ie);break;case 3:o.vertexAttrib3fv(W.location,ie);break;case 4:o.vertexAttrib4fv(W.location,ie);break;default:o.vertexAttrib1fv(W.location,ie)}}}}S()}function P(){C();for(const v in i){const R=i[v];for(const z in R){const O=R[z];for(const V in O)d(O[V].object),delete O[V];delete R[z]}delete i[v]}}function I(v){if(i[v.id]===void 0)return;const R=i[v.id];for(const z in R){const O=R[z];for(const V in O)d(O[V].object),delete O[V];delete R[z]}delete i[v.id]}function A(v){for(const R in i){const z=i[R];if(z[v.id]===void 0)continue;const O=z[v.id];for(const V in O)d(O[V].object),delete O[V];delete z[v.id]}}function C(){E(),a=!0,r!==s&&(r=s,c(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:l,reset:C,resetDefaultState:E,dispose:P,releaseStatesOfGeometry:I,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:g,disableUnusedAttributes:S}}function Mm(o,e,n){let i;function s(c){i=c}function r(c,d){o.drawArrays(i,c,d),n.update(d,i,1)}function a(c,d,u){u!==0&&(o.drawArraysInstanced(i,c,d,u),n.update(d,i,u))}function l(c,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,u);let m=0;for(let y=0;y<u;y++)m+=d[y];n.update(m,i,1)}function h(c,d,u,p){if(u===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let y=0;y<c.length;y++)a(c[y],d[y],p[y]);else{m.multiDrawArraysInstancedWEBGL(i,c,0,d,0,p,0,u);let y=0;for(let _=0;_<u;_++)y+=d[_]*p[_];n.update(y,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=l,this.renderMultiDrawInstances=h}function Em(o,e,n,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=o.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==en&&i.convert(A)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(A){const C=A===Tn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==In&&i.convert(A)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Vt&&!C)}function h(A){if(A==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const d=h(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=n.logarithmicDepthBuffer===!0,p=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),m=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),y=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=o.getParameter(o.MAX_TEXTURE_SIZE),g=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),f=o.getParameter(o.MAX_VERTEX_ATTRIBS),S=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),w=o.getParameter(o.MAX_VARYING_VECTORS),x=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),P=y>0,I=o.getParameter(o.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:h,textureFormatReadable:a,textureTypeReadable:l,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:p,maxTextures:m,maxVertexTextures:y,maxTextureSize:_,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:S,maxVaryings:w,maxFragmentUniforms:x,vertexTextures:P,maxSamples:I}}function wm(o){const e=this;let n=null,i=0,s=!1,r=!1;const a=new zn,l=new Ue,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){const m=u.length!==0||p||i!==0||s;return s=p,i=u.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,p){n=d(u,p,0)},this.setState=function(u,p,m){const y=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,f=o.get(u);if(!s||y===null||y.length===0||r&&!g)r?d(null):c();else{const S=r?0:i,w=S*4;let x=f.clippingState||null;h.value=x,x=d(y,p,w,m);for(let P=0;P!==w;++P)x[P]=n[P];f.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){h.value!==n&&(h.value=n,h.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(u,p,m,y){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=h.value,y!==!0||g===null){const f=m+_*4,S=p.matrixWorldInverse;l.getNormalMatrix(S),(g===null||g.length<f)&&(g=new Float32Array(f));for(let w=0,x=m;w!==_;++w,x+=4)a.copy(u[w]).applyMatrix4(S,l),a.normal.toArray(g,x),g[x+3]=a.constant}h.value=g,h.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function Tm(o){let e=new WeakMap;function n(a,l){return l===xr?a.mapping=Bi:l===Ao&&(a.mapping=ki),a}function i(a){if(a&&a.isTexture){const l=a.mapping;if(l===xr||l===Ao)if(e.has(a)){const h=e.get(a).texture;return n(h,a.mapping)}else{const h=a.image;if(h&&h.height>0){const c=new zd(h.height);return c.fromEquirectangularTexture(o,a),e.set(a,c),a.addEventListener("dispose",s),n(c.texture,a.mapping)}else return null}}return a}function s(a){const l=a.target;l.removeEventListener("dispose",s);const h=e.get(l);h!==void 0&&(e.delete(l),h.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}const Li=4,Pl=[.125,.215,.35,.446,.526,.582],ri=20,ro=new Ia,Il=new _e;let oo=null,ao=0,lo=0,co=!1;const ii=(1+Math.sqrt(5))/2,Ai=1/ii,Ll=[new D(-ii,Ai,0),new D(ii,Ai,0),new D(-Ai,0,ii),new D(Ai,0,ii),new D(0,ii,-Ai),new D(0,ii,Ai),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],Am=new D;class Dl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,s=100,r={}){const{size:a=256,position:l=Am}=r;oo=this._renderer.getRenderTarget(),ao=this._renderer.getActiveCubeFace(),lo=this._renderer.getActiveMipmapLevel(),co=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,i,s,h,l),n>0&&this._blur(h,0,0,n),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Nl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ul(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(oo,ao,lo),this._renderer.xr.enabled=co,e.scissorTest=!1,ir(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Bi||e.mapping===ki?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),oo=this._renderer.getRenderTarget(),ao=this._renderer.getActiveCubeFace(),lo=this._renderer.getActiveMipmapLevel(),co=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:ht,minFilter:ht,generateMipmaps:!1,type:Tn,format:en,colorSpace:wt,depthBuffer:!1},s=Fl(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fl(e,n,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Cm(r)),this._blurMaterial=Rm(r,e,n)}return s}_compileMaterial(e){const n=new Gt(this._lodPlanes[0],e);this._renderer.compile(n,ro)}_sceneToCubeUV(e,n,i,s,r){const h=new Ut(90,1,n,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,p=u.autoClear,m=u.toneMapping;u.getClearColor(Il),u.toneMapping=Gn,u.autoClear=!1;const y=new oi({name:"PMREM.Background",side:Rt,depthWrite:!1,depthTest:!1}),_=new Gt(new Ts,y);let g=!1;const f=e.background;f?f.isColor&&(y.color.copy(f),e.background=null,g=!0):(y.color.copy(Il),g=!0);for(let S=0;S<6;S++){const w=S%3;w===0?(h.up.set(0,c[S],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x+d[S],r.y,r.z)):w===1?(h.up.set(0,0,c[S]),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y+d[S],r.z)):(h.up.set(0,c[S],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y,r.z+d[S]));const x=this._cubeSize;ir(s,w*x,S>2?x:0,x,x),u.setRenderTarget(s),g&&u.render(_,h),u.render(e,h)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=m,u.autoClear=p,e.background=f}_textureToCubeUV(e,n){const i=this._renderer,s=e.mapping===Bi||e.mapping===ki;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Nl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ul());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Gt(this._lodPlanes[0],r),l=r.uniforms;l.envMap.value=e;const h=this._cubeSize;ir(n,0,0,3*h,2*h),i.setRenderTarget(n),i.render(a,ro)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),l=Ll[(s-r-1)%Ll.length];this._blur(e,r-1,r,a,l)}n.autoClear=i}_blur(e,n,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,n,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,n,i,s,r,a,l){const h=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new Gt(this._lodPlanes[s],c),p=c.uniforms,m=this._sizeLods[i]-1,y=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*ri-1),_=r/y,g=isFinite(r)?1+Math.floor(d*_):ri;g>ri&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ri}`);const f=[];let S=0;for(let A=0;A<ri;++A){const C=A/_,E=Math.exp(-C*C/2);f.push(E),A===0?S+=E:A<g&&(S+=2*E)}for(let A=0;A<f.length;A++)f[A]=f[A]/S;p.envMap.value=e.texture,p.samples.value=g,p.weights.value=f,p.latitudinal.value=a==="latitudinal",l&&(p.poleAxis.value=l);const{_lodMax:w}=this;p.dTheta.value=y,p.mipInt.value=w-i;const x=this._sizeLods[s],P=3*x*(s>w-Li?s-w+Li:0),I=4*(this._cubeSize-x);ir(n,P,I,3*x,2*x),h.setRenderTarget(n),h.render(u,ro)}}function Cm(o){const e=[],n=[],i=[];let s=o;const r=o-Li+1+Pl.length;for(let a=0;a<r;a++){const l=Math.pow(2,s);n.push(l);let h=1/l;a>o-Li?h=Pl[a-o+Li-1]:a===0&&(h=0),i.push(h);const c=1/(l-2),d=-c,u=1+c,p=[d,d,u,d,u,u,d,d,u,u,d,u],m=6,y=6,_=3,g=2,f=1,S=new Float32Array(_*y*m),w=new Float32Array(g*y*m),x=new Float32Array(f*y*m);for(let I=0;I<m;I++){const A=I%3*2/3-1,C=I>2?0:-1,E=[A,C,0,A+2/3,C,0,A+2/3,C+1,0,A,C,0,A+2/3,C+1,0,A,C+1,0];S.set(E,_*y*I),w.set(p,g*y*I);const v=[I,I,I,I,I,I];x.set(v,f*y*I)}const P=new Bt;P.setAttribute("position",new Et(S,_)),P.setAttribute("uv",new Et(w,g)),P.setAttribute("faceIndex",new Et(x,f)),e.push(P),s>Li&&s--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Fl(o,e,n){const i=new ci(o,e,n);return i.texture.mapping=Tr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ir(o,e,n,i,s){o.viewport.set(e,n,i,s),o.scissor.set(e,n,i,s)}function Rm(o,e,n){const i=new Float32Array(ri),s=new D(0,1,0);return new Wn({name:"SphericalGaussianBlur",defines:{n:ri,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Fa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Ul(){return new Wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Nl(){return new Wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Fa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Pm(o){let e=new WeakMap,n=null;function i(l){if(l&&l.isTexture){const h=l.mapping,c=h===xr||h===Ao,d=h===Bi||h===ki;if(c||d){let u=e.get(l);const p=u!==void 0?u.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==p)return n===null&&(n=new Dl(o)),u=c?n.fromEquirectangular(l,u):n.fromCubemap(l,u),u.texture.pmremVersion=l.pmremVersion,e.set(l,u),u.texture;if(u!==void 0)return u.texture;{const m=l.image;return c&&m&&m.height>0||d&&m&&s(m)?(n===null&&(n=new Dl(o)),u=c?n.fromEquirectangular(l):n.fromCubemap(l),u.texture.pmremVersion=l.pmremVersion,e.set(l,u),l.addEventListener("dispose",r),u.texture):null}}}return l}function s(l){let h=0;const c=6;for(let d=0;d<c;d++)l[d]!==void 0&&h++;return h===c}function r(l){const h=l.target;h.removeEventListener("dispose",r);const c=e.get(h);c!==void 0&&(e.delete(h),c.dispose())}function a(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:a}}function Im(o){const e={};function n(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=o.getExtension(i)}return e[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const s=n(i);return s===null&&ni("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Lm(o,e,n,i){const s={},r=new WeakMap;function a(u){const p=u.target;p.index!==null&&e.remove(p.index);for(const y in p.attributes)e.remove(p.attributes[y]);p.removeEventListener("dispose",a),delete s[p.id];const m=r.get(p);m&&(e.remove(m),r.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,n.memory.geometries--}function l(u,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,n.memory.geometries++),p}function h(u){const p=u.attributes;for(const m in p)e.update(p[m],o.ARRAY_BUFFER)}function c(u){const p=[],m=u.index,y=u.attributes.position;let _=0;if(m!==null){const S=m.array;_=m.version;for(let w=0,x=S.length;w<x;w+=3){const P=S[w+0],I=S[w+1],A=S[w+2];p.push(P,I,I,A,A,P)}}else if(y!==void 0){const S=y.array;_=y.version;for(let w=0,x=S.length/3-1;w<x;w+=3){const P=w+0,I=w+1,A=w+2;p.push(P,I,I,A,A,P)}}else return;const g=new(Cc(p)?Lc:Ic)(p,1);g.version=_;const f=r.get(u);f&&e.remove(f),r.set(u,g)}function d(u){const p=r.get(u);if(p){const m=u.index;m!==null&&p.version<m.version&&c(u)}else c(u);return r.get(u)}return{get:l,update:h,getWireframeAttribute:d}}function Dm(o,e,n){let i;function s(p){i=p}let r,a;function l(p){r=p.type,a=p.bytesPerElement}function h(p,m){o.drawElements(i,m,r,p*a),n.update(m,i,1)}function c(p,m,y){y!==0&&(o.drawElementsInstanced(i,m,r,p*a,y),n.update(m,i,y))}function d(p,m,y){if(y===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,r,p,0,y);let g=0;for(let f=0;f<y;f++)g+=m[f];n.update(g,i,1)}function u(p,m,y,_){if(y===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let f=0;f<p.length;f++)c(p[f]/a,m[f],_[f]);else{g.multiDrawElementsInstancedWEBGL(i,m,0,r,p,0,_,0,y);let f=0;for(let S=0;S<y;S++)f+=m[S]*_[S];n.update(f,i,1)}}this.setMode=s,this.setIndex=l,this.render=h,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function Fm(o){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,l){switch(n.calls++,a){case o.TRIANGLES:n.triangles+=l*(r/3);break;case o.LINES:n.lines+=l*(r/2);break;case o.LINE_STRIP:n.lines+=l*(r-1);break;case o.LINE_LOOP:n.lines+=l*r;break;case o.POINTS:n.points+=l*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:s,update:i}}function Um(o,e,n){const i=new WeakMap,s=new Ke;function r(a,l,h){const c=a.morphTargetInfluences,d=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,u=d!==void 0?d.length:0;let p=i.get(l);if(p===void 0||p.count!==u){let v=function(){C.dispose(),i.delete(l),l.removeEventListener("dispose",v)};var m=v;p!==void 0&&p.texture.dispose();const y=l.morphAttributes.position!==void 0,_=l.morphAttributes.normal!==void 0,g=l.morphAttributes.color!==void 0,f=l.morphAttributes.position||[],S=l.morphAttributes.normal||[],w=l.morphAttributes.color||[];let x=0;y===!0&&(x=1),_===!0&&(x=2),g===!0&&(x=3);let P=l.attributes.position.count*x,I=1;P>e.maxTextureSize&&(I=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const A=new Float32Array(P*I*4*u),C=new Rc(A,P,I,u);C.type=Vt,C.needsUpdate=!0;const E=x*4;for(let R=0;R<u;R++){const z=f[R],O=S[R],V=w[R],q=P*I*4*R;for(let G=0;G<z.count;G++){const Z=G*E;y===!0&&(s.fromBufferAttribute(z,G),A[q+Z+0]=s.x,A[q+Z+1]=s.y,A[q+Z+2]=s.z,A[q+Z+3]=0),_===!0&&(s.fromBufferAttribute(O,G),A[q+Z+4]=s.x,A[q+Z+5]=s.y,A[q+Z+6]=s.z,A[q+Z+7]=0),g===!0&&(s.fromBufferAttribute(V,G),A[q+Z+8]=s.x,A[q+Z+9]=s.y,A[q+Z+10]=s.z,A[q+Z+11]=V.itemSize===4?s.w:1)}}p={count:u,texture:C,size:new Ce(P,I)},i.set(l,p),l.addEventListener("dispose",v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)h.getUniforms().setValue(o,"morphTexture",a.morphTexture,n);else{let y=0;for(let g=0;g<c.length;g++)y+=c[g];const _=l.morphTargetsRelative?1:1-y;h.getUniforms().setValue(o,"morphTargetBaseInfluence",_),h.getUniforms().setValue(o,"morphTargetInfluences",c)}h.getUniforms().setValue(o,"morphTargetsTexture",p.texture,n),h.getUniforms().setValue(o,"morphTargetsTextureSize",p.size)}return{update:r}}function Nm(o,e,n,i){let s=new WeakMap;function r(h){const c=i.render.frame,d=h.geometry,u=e.get(h,d);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),h.isInstancedMesh&&(h.hasEventListener("dispose",l)===!1&&h.addEventListener("dispose",l),s.get(h)!==c&&(n.update(h.instanceMatrix,o.ARRAY_BUFFER),h.instanceColor!==null&&n.update(h.instanceColor,o.ARRAY_BUFFER),s.set(h,c))),h.isSkinnedMesh){const p=h.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return u}function a(){s=new WeakMap}function l(h){const c=h.target;c.removeEventListener("dispose",l),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:r,dispose:a}}const Xc=new yt,Ol=new kc(1,1),jc=new Rc,Yc=new vd,Kc=new Uc,Bl=[],kl=[],zl=new Float32Array(16),Hl=new Float32Array(9),Vl=new Float32Array(4);function Zi(o,e,n){const i=o[0];if(i<=0||i>0)return o;const s=e*n;let r=Bl[s];if(r===void 0&&(r=new Float32Array(s),Bl[s]=r),e!==0){i.toArray(r,0);for(let a=1,l=0;a!==e;++a)l+=n,o[a].toArray(r,l)}return r}function xt(o,e){if(o.length!==e.length)return!1;for(let n=0,i=o.length;n<i;n++)if(o[n]!==e[n])return!1;return!0}function vt(o,e){for(let n=0,i=e.length;n<i;n++)o[n]=e[n]}function Pr(o,e){let n=kl[e];n===void 0&&(n=new Int32Array(e),kl[e]=n);for(let i=0;i!==e;++i)n[i]=o.allocateTextureUnit();return n}function Om(o,e){const n=this.cache;n[0]!==e&&(o.uniform1f(this.addr,e),n[0]=e)}function Bm(o,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(xt(n,e))return;o.uniform2fv(this.addr,e),vt(n,e)}}function km(o,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(xt(n,e))return;o.uniform3fv(this.addr,e),vt(n,e)}}function zm(o,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(xt(n,e))return;o.uniform4fv(this.addr,e),vt(n,e)}}function Hm(o,e){const n=this.cache,i=e.elements;if(i===void 0){if(xt(n,e))return;o.uniformMatrix2fv(this.addr,!1,e),vt(n,e)}else{if(xt(n,i))return;Vl.set(i),o.uniformMatrix2fv(this.addr,!1,Vl),vt(n,i)}}function Vm(o,e){const n=this.cache,i=e.elements;if(i===void 0){if(xt(n,e))return;o.uniformMatrix3fv(this.addr,!1,e),vt(n,e)}else{if(xt(n,i))return;Hl.set(i),o.uniformMatrix3fv(this.addr,!1,Hl),vt(n,i)}}function Gm(o,e){const n=this.cache,i=e.elements;if(i===void 0){if(xt(n,e))return;o.uniformMatrix4fv(this.addr,!1,e),vt(n,e)}else{if(xt(n,i))return;zl.set(i),o.uniformMatrix4fv(this.addr,!1,zl),vt(n,i)}}function Wm(o,e){const n=this.cache;n[0]!==e&&(o.uniform1i(this.addr,e),n[0]=e)}function $m(o,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(o.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(xt(n,e))return;o.uniform2iv(this.addr,e),vt(n,e)}}function qm(o,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(o.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(xt(n,e))return;o.uniform3iv(this.addr,e),vt(n,e)}}function Xm(o,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(o.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(xt(n,e))return;o.uniform4iv(this.addr,e),vt(n,e)}}function jm(o,e){const n=this.cache;n[0]!==e&&(o.uniform1ui(this.addr,e),n[0]=e)}function Ym(o,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(o.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(xt(n,e))return;o.uniform2uiv(this.addr,e),vt(n,e)}}function Km(o,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(o.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(xt(n,e))return;o.uniform3uiv(this.addr,e),vt(n,e)}}function Zm(o,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(o.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(xt(n,e))return;o.uniform4uiv(this.addr,e),vt(n,e)}}function Qm(o,e,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(o.uniform1i(this.addr,s),i[0]=s);let r;this.type===o.SAMPLER_2D_SHADOW?(Ol.compareFunction=Tc,r=Ol):r=Xc,n.setTexture2D(e||r,s)}function Jm(o,e,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(o.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(e||Yc,s)}function eg(o,e,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(o.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(e||Kc,s)}function tg(o,e,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(o.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(e||jc,s)}function ng(o){switch(o){case 5126:return Om;case 35664:return Bm;case 35665:return km;case 35666:return zm;case 35674:return Hm;case 35675:return Vm;case 35676:return Gm;case 5124:case 35670:return Wm;case 35667:case 35671:return $m;case 35668:case 35672:return qm;case 35669:case 35673:return Xm;case 5125:return jm;case 36294:return Ym;case 36295:return Km;case 36296:return Zm;case 35678:case 36198:case 36298:case 36306:case 35682:return Qm;case 35679:case 36299:case 36307:return Jm;case 35680:case 36300:case 36308:case 36293:return eg;case 36289:case 36303:case 36311:case 36292:return tg}}function ig(o,e){o.uniform1fv(this.addr,e)}function sg(o,e){const n=Zi(e,this.size,2);o.uniform2fv(this.addr,n)}function rg(o,e){const n=Zi(e,this.size,3);o.uniform3fv(this.addr,n)}function og(o,e){const n=Zi(e,this.size,4);o.uniform4fv(this.addr,n)}function ag(o,e){const n=Zi(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,n)}function lg(o,e){const n=Zi(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,n)}function cg(o,e){const n=Zi(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,n)}function hg(o,e){o.uniform1iv(this.addr,e)}function dg(o,e){o.uniform2iv(this.addr,e)}function ug(o,e){o.uniform3iv(this.addr,e)}function pg(o,e){o.uniform4iv(this.addr,e)}function fg(o,e){o.uniform1uiv(this.addr,e)}function mg(o,e){o.uniform2uiv(this.addr,e)}function gg(o,e){o.uniform3uiv(this.addr,e)}function _g(o,e){o.uniform4uiv(this.addr,e)}function yg(o,e,n){const i=this.cache,s=e.length,r=Pr(n,s);xt(i,r)||(o.uniform1iv(this.addr,r),vt(i,r));for(let a=0;a!==s;++a)n.setTexture2D(e[a]||Xc,r[a])}function xg(o,e,n){const i=this.cache,s=e.length,r=Pr(n,s);xt(i,r)||(o.uniform1iv(this.addr,r),vt(i,r));for(let a=0;a!==s;++a)n.setTexture3D(e[a]||Yc,r[a])}function vg(o,e,n){const i=this.cache,s=e.length,r=Pr(n,s);xt(i,r)||(o.uniform1iv(this.addr,r),vt(i,r));for(let a=0;a!==s;++a)n.setTextureCube(e[a]||Kc,r[a])}function bg(o,e,n){const i=this.cache,s=e.length,r=Pr(n,s);xt(i,r)||(o.uniform1iv(this.addr,r),vt(i,r));for(let a=0;a!==s;++a)n.setTexture2DArray(e[a]||jc,r[a])}function Sg(o){switch(o){case 5126:return ig;case 35664:return sg;case 35665:return rg;case 35666:return og;case 35674:return ag;case 35675:return lg;case 35676:return cg;case 5124:case 35670:return hg;case 35667:case 35671:return dg;case 35668:case 35672:return ug;case 35669:case 35673:return pg;case 5125:return fg;case 36294:return mg;case 36295:return gg;case 36296:return _g;case 35678:case 36198:case 36298:case 36306:case 35682:return yg;case 35679:case 36299:case 36307:return xg;case 35680:case 36300:case 36308:case 36293:return vg;case 36289:case 36303:case 36311:case 36292:return bg}}class Mg{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=ng(n.type)}}class Eg{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=Sg(n.type)}}class wg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const l=s[r];l.setValue(e,n[l.id],i)}}}const ho=/(\w+)(\])?(\[|\.)?/g;function Gl(o,e){o.seq.push(e),o.map[e.id]=e}function Tg(o,e,n){const i=o.name,s=i.length;for(ho.lastIndex=0;;){const r=ho.exec(i),a=ho.lastIndex;let l=r[1];const h=r[2]==="]",c=r[3];if(h&&(l=l|0),c===void 0||c==="["&&a+2===s){Gl(n,c===void 0?new Mg(l,o,e):new Eg(l,o,e));break}else{let u=n.map[l];u===void 0&&(u=new wg(l),Gl(n,u)),n=u}}}class mr{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(n,s),a=e.getUniformLocation(n,r.name);Tg(r,a,this)}}setValue(e,n,i,s){const r=this.map[n];r!==void 0&&r.setValue(e,i,s)}setOptional(e,n,i){const s=n[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,n,i,s){for(let r=0,a=n.length;r!==a;++r){const l=n[r],h=i[l.id];h.needsUpdate!==!1&&l.setValue(e,h.value,s)}}static seqWithValue(e,n){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in n&&i.push(a)}return i}}function Wl(o,e,n){const i=o.createShader(e);return o.shaderSource(i,n),o.compileShader(i),i}const Ag=37297;let Cg=0;function Rg(o,e){const n=o.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,n.length);for(let a=s;a<r;a++){const l=a+1;i.push(`${l===e?">":" "} ${l}: ${n[a]}`)}return i.join(`
`)}const $l=new Ue;function Pg(o){qe._getMatrix($l,qe.workingColorSpace,o);const e=`mat3( ${$l.elements.map(n=>n.toFixed(4))} )`;switch(qe.getTransfer(o)){case Sr:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",o),[e,"LinearTransferOETF"]}}function ql(o,e,n){const i=o.getShaderParameter(e,o.COMPILE_STATUS),s=o.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return n.toUpperCase()+`

`+s+`

`+Rg(o.getShaderSource(e),a)}else return s}function Ig(o,e){const n=Pg(e);return[`vec4 ${o}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function Lg(o,e){let n;switch(e){case Ah:n="Linear";break;case Ch:n="Reinhard";break;case Rh:n="Cineon";break;case uc:n="ACESFilmic";break;case Ih:n="AgX";break;case Lh:n="Neutral";break;case Ph:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+o+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const sr=new D;function Dg(){qe.getLuminanceCoefficients(sr);const o=sr.x.toFixed(4),e=sr.y.toFixed(4),n=sr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Fg(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gs).join(`
`)}function Ug(o){const e=[];for(const n in o){const i=o[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function Ng(o,e){const n={},i=o.getProgramParameter(e,o.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=o.getActiveAttrib(e,s),a=r.name;let l=1;r.type===o.FLOAT_MAT2&&(l=2),r.type===o.FLOAT_MAT3&&(l=3),r.type===o.FLOAT_MAT4&&(l=4),n[a]={type:r.type,location:o.getAttribLocation(e,a),locationSize:l}}return n}function gs(o){return o!==""}function Xl(o,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function jl(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Og=/^[ \t]*#include +<([\w\d./]+)>/gm;function oa(o){return o.replace(Og,kg)}const Bg=new Map;function kg(o,e){let n=Oe[e];if(n===void 0){const i=Bg.get(e);if(i!==void 0)n=Oe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return oa(n)}const zg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yl(o){return o.replace(zg,Hg)}function Hg(o,e,n,i){let s="";for(let r=parseInt(e);r<parseInt(n);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Kl(o){let e=`precision ${o.precision} float;
	precision ${o.precision} int;
	precision ${o.precision} sampler2D;
	precision ${o.precision} samplerCube;
	precision ${o.precision} sampler3D;
	precision ${o.precision} sampler2DArray;
	precision ${o.precision} sampler2DShadow;
	precision ${o.precision} samplerCubeShadow;
	precision ${o.precision} sampler2DArrayShadow;
	precision ${o.precision} isampler2D;
	precision ${o.precision} isampler3D;
	precision ${o.precision} isamplerCube;
	precision ${o.precision} isampler2DArray;
	precision ${o.precision} usampler2D;
	precision ${o.precision} usampler3D;
	precision ${o.precision} usamplerCube;
	precision ${o.precision} usampler2DArray;
	`;return o.precision==="highp"?e+=`
#define HIGH_PRECISION`:o.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Vg(o){let e="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===cc?e="SHADOWMAP_TYPE_PCF":o.shadowMapType===hc?e="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===Mn&&(e="SHADOWMAP_TYPE_VSM"),e}function Gg(o){let e="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case Bi:case ki:e="ENVMAP_TYPE_CUBE";break;case Tr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Wg(o){let e="ENVMAP_MODE_REFLECTION";if(o.envMap)switch(o.envMapMode){case ki:e="ENVMAP_MODE_REFRACTION";break}return e}function $g(o){let e="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case dc:e="ENVMAP_BLENDING_MULTIPLY";break;case wh:e="ENVMAP_BLENDING_MIX";break;case Th:e="ENVMAP_BLENDING_ADD";break}return e}function qg(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function Xg(o,e,n,i){const s=o.getContext(),r=n.defines;let a=n.vertexShader,l=n.fragmentShader;const h=Vg(n),c=Gg(n),d=Wg(n),u=$g(n),p=qg(n),m=Fg(n),y=Ug(r),_=s.createProgram();let g,f,S=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(gs).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(gs).join(`
`),f.length>0&&(f+=`
`)):(g=[Kl(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+h:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gs).join(`
`),f=[Kl(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+h:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Gn?"#define TONE_MAPPING":"",n.toneMapping!==Gn?Oe.tonemapping_pars_fragment:"",n.toneMapping!==Gn?Lg("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,Ig("linearToOutputTexel",n.outputColorSpace),Dg(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(gs).join(`
`)),a=oa(a),a=Xl(a,n),a=jl(a,n),l=oa(l),l=Xl(l,n),l=jl(l,n),a=Yl(a),l=Yl(l),n.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",n.glslVersion===za?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===za?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const w=S+g+a,x=S+f+l,P=Wl(s,s.VERTEX_SHADER,w),I=Wl(s,s.FRAGMENT_SHADER,x);s.attachShader(_,P),s.attachShader(_,I),n.index0AttributeName!==void 0?s.bindAttribLocation(_,0,n.index0AttributeName):n.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(R){if(o.debug.checkShaderErrors){const z=s.getProgramInfoLog(_).trim(),O=s.getShaderInfoLog(P).trim(),V=s.getShaderInfoLog(I).trim();let q=!0,G=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(q=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(s,_,P,I);else{const Z=ql(s,P,"vertex"),W=ql(s,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+z+`
`+Z+`
`+W)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(O===""||V==="")&&(G=!1);G&&(R.diagnostics={runnable:q,programLog:z,vertexShader:{log:O,prefix:g},fragmentShader:{log:V,prefix:f}})}s.deleteShader(P),s.deleteShader(I),C=new mr(s,_),E=Ng(s,_)}let C;this.getUniforms=function(){return C===void 0&&A(this),C};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let v=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(_,Ag)),v},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Cg++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=I,this}let jg=0;class Yg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(n),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new Kg(e),n.set(e,i)),i}}class Kg{constructor(e){this.id=jg++,this.code=e,this.usedTimes=0}}function Zg(o,e,n,i,s,r,a){const l=new ba,h=new Yg,c=new Set,d=[],u=s.logarithmicDepthBuffer,p=s.vertexTextures;let m=s.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return c.add(E),E===0?"uv":`uv${E}`}function g(E,v,R,z,O){const V=z.fog,q=O.geometry,G=E.isMeshStandardMaterial?z.environment:null,Z=(E.isMeshStandardMaterial?n:e).get(E.envMap||G),W=Z&&Z.mapping===Tr?Z.image.height:null,ne=y[E.type];E.precision!==null&&(m=s.getMaxPrecision(E.precision),m!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",m,"instead."));const ie=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,xe=ie!==void 0?ie.length:0;let we=0;q.morphAttributes.position!==void 0&&(we=1),q.morphAttributes.normal!==void 0&&(we=2),q.morphAttributes.color!==void 0&&(we=3);let Ne,X,te,ge;if(ne){const je=dn[ne];Ne=je.vertexShader,X=je.fragmentShader}else Ne=E.vertexShader,X=E.fragmentShader,h.update(E),te=h.getVertexShaderID(E),ge=h.getFragmentShaderID(E);const oe=o.getRenderTarget(),Me=o.state.buffers.depth.getReversed(),$e=O.isInstancedMesh===!0,Ae=O.isBatchedMesh===!0,lt=!!E.map,rt=!!E.matcap,ke=!!Z,L=!!E.aoMap,It=!!E.lightMap,ze=!!E.bumpMap,He=!!E.normalMap,be=!!E.displacementMap,nt=!!E.emissiveMap,ve=!!E.metalnessMap,T=!!E.roughnessMap,b=E.anisotropy>0,B=E.clearcoat>0,Y=E.dispersion>0,Q=E.iridescence>0,j=E.sheen>0,ye=E.transmission>0,ae=b&&!!E.anisotropyMap,de=B&&!!E.clearcoatMap,We=B&&!!E.clearcoatNormalMap,ee=B&&!!E.clearcoatRoughnessMap,ue=Q&&!!E.iridescenceMap,Te=Q&&!!E.iridescenceThicknessMap,Re=j&&!!E.sheenColorMap,pe=j&&!!E.sheenRoughnessMap,Ve=!!E.specularMap,De=!!E.specularColorMap,et=!!E.specularIntensityMap,F=ye&&!!E.transmissionMap,se=ye&&!!E.thicknessMap,$=!!E.gradientMap,K=!!E.alphaMap,ce=E.alphaTest>0,le=!!E.alphaHash,Ie=!!E.extensions;let ot=Gn;E.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(ot=o.toneMapping);const mt={shaderID:ne,shaderType:E.type,shaderName:E.name,vertexShader:Ne,fragmentShader:X,defines:E.defines,customVertexShaderID:te,customFragmentShaderID:ge,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:m,batching:Ae,batchingColor:Ae&&O._colorsTexture!==null,instancing:$e,instancingColor:$e&&O.instanceColor!==null,instancingMorph:$e&&O.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:oe===null?o.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:wt,alphaToCoverage:!!E.alphaToCoverage,map:lt,matcap:rt,envMap:ke,envMapMode:ke&&Z.mapping,envMapCubeUVHeight:W,aoMap:L,lightMap:It,bumpMap:ze,normalMap:He,displacementMap:p&&be,emissiveMap:nt,normalMapObjectSpace:He&&E.normalMapType===Hh,normalMapTangentSpace:He&&E.normalMapType===wc,metalnessMap:ve,roughnessMap:T,anisotropy:b,anisotropyMap:ae,clearcoat:B,clearcoatMap:de,clearcoatNormalMap:We,clearcoatRoughnessMap:ee,dispersion:Y,iridescence:Q,iridescenceMap:ue,iridescenceThicknessMap:Te,sheen:j,sheenColorMap:Re,sheenRoughnessMap:pe,specularMap:Ve,specularColorMap:De,specularIntensityMap:et,transmission:ye,transmissionMap:F,thicknessMap:se,gradientMap:$,opaque:E.transparent===!1&&E.blending===Mt&&E.alphaToCoverage===!1,alphaMap:K,alphaTest:ce,alphaHash:le,combine:E.combine,mapUv:lt&&_(E.map.channel),aoMapUv:L&&_(E.aoMap.channel),lightMapUv:It&&_(E.lightMap.channel),bumpMapUv:ze&&_(E.bumpMap.channel),normalMapUv:He&&_(E.normalMap.channel),displacementMapUv:be&&_(E.displacementMap.channel),emissiveMapUv:nt&&_(E.emissiveMap.channel),metalnessMapUv:ve&&_(E.metalnessMap.channel),roughnessMapUv:T&&_(E.roughnessMap.channel),anisotropyMapUv:ae&&_(E.anisotropyMap.channel),clearcoatMapUv:de&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:We&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:Te&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:pe&&_(E.sheenRoughnessMap.channel),specularMapUv:Ve&&_(E.specularMap.channel),specularColorMapUv:De&&_(E.specularColorMap.channel),specularIntensityMapUv:et&&_(E.specularIntensityMap.channel),transmissionMapUv:F&&_(E.transmissionMap.channel),thicknessMapUv:se&&_(E.thicknessMap.channel),alphaMapUv:K&&_(E.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(He||b),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!q.attributes.uv&&(lt||K),fog:!!V,useFog:E.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Me,skinning:O.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:we,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:o.shadowMap.enabled&&R.length>0,shadowMapType:o.shadowMap.type,toneMapping:ot,decodeVideoTexture:lt&&E.map.isVideoTexture===!0&&qe.getTransfer(E.map.colorSpace)===it,decodeVideoTextureEmissive:nt&&E.emissiveMap.isVideoTexture===!0&&qe.getTransfer(E.emissiveMap.colorSpace)===it,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===at,flipSided:E.side===Rt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Ie&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ie&&E.extensions.multiDraw===!0||Ae)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return mt.vertexUv1s=c.has(1),mt.vertexUv2s=c.has(2),mt.vertexUv3s=c.has(3),c.clear(),mt}function f(E){const v=[];if(E.shaderID?v.push(E.shaderID):(v.push(E.customVertexShaderID),v.push(E.customFragmentShaderID)),E.defines!==void 0)for(const R in E.defines)v.push(R),v.push(E.defines[R]);return E.isRawShaderMaterial===!1&&(S(v,E),w(v,E),v.push(o.outputColorSpace)),v.push(E.customProgramCacheKey),v.join()}function S(E,v){E.push(v.precision),E.push(v.outputColorSpace),E.push(v.envMapMode),E.push(v.envMapCubeUVHeight),E.push(v.mapUv),E.push(v.alphaMapUv),E.push(v.lightMapUv),E.push(v.aoMapUv),E.push(v.bumpMapUv),E.push(v.normalMapUv),E.push(v.displacementMapUv),E.push(v.emissiveMapUv),E.push(v.metalnessMapUv),E.push(v.roughnessMapUv),E.push(v.anisotropyMapUv),E.push(v.clearcoatMapUv),E.push(v.clearcoatNormalMapUv),E.push(v.clearcoatRoughnessMapUv),E.push(v.iridescenceMapUv),E.push(v.iridescenceThicknessMapUv),E.push(v.sheenColorMapUv),E.push(v.sheenRoughnessMapUv),E.push(v.specularMapUv),E.push(v.specularColorMapUv),E.push(v.specularIntensityMapUv),E.push(v.transmissionMapUv),E.push(v.thicknessMapUv),E.push(v.combine),E.push(v.fogExp2),E.push(v.sizeAttenuation),E.push(v.morphTargetsCount),E.push(v.morphAttributeCount),E.push(v.numDirLights),E.push(v.numPointLights),E.push(v.numSpotLights),E.push(v.numSpotLightMaps),E.push(v.numHemiLights),E.push(v.numRectAreaLights),E.push(v.numDirLightShadows),E.push(v.numPointLightShadows),E.push(v.numSpotLightShadows),E.push(v.numSpotLightShadowsWithMaps),E.push(v.numLightProbes),E.push(v.shadowMapType),E.push(v.toneMapping),E.push(v.numClippingPlanes),E.push(v.numClipIntersection),E.push(v.depthPacking)}function w(E,v){l.disableAll(),v.supportsVertexTextures&&l.enable(0),v.instancing&&l.enable(1),v.instancingColor&&l.enable(2),v.instancingMorph&&l.enable(3),v.matcap&&l.enable(4),v.envMap&&l.enable(5),v.normalMapObjectSpace&&l.enable(6),v.normalMapTangentSpace&&l.enable(7),v.clearcoat&&l.enable(8),v.iridescence&&l.enable(9),v.alphaTest&&l.enable(10),v.vertexColors&&l.enable(11),v.vertexAlphas&&l.enable(12),v.vertexUv1s&&l.enable(13),v.vertexUv2s&&l.enable(14),v.vertexUv3s&&l.enable(15),v.vertexTangents&&l.enable(16),v.anisotropy&&l.enable(17),v.alphaHash&&l.enable(18),v.batching&&l.enable(19),v.dispersion&&l.enable(20),v.batchingColor&&l.enable(21),E.push(l.mask),l.disableAll(),v.fog&&l.enable(0),v.useFog&&l.enable(1),v.flatShading&&l.enable(2),v.logarithmicDepthBuffer&&l.enable(3),v.reverseDepthBuffer&&l.enable(4),v.skinning&&l.enable(5),v.morphTargets&&l.enable(6),v.morphNormals&&l.enable(7),v.morphColors&&l.enable(8),v.premultipliedAlpha&&l.enable(9),v.shadowMapEnabled&&l.enable(10),v.doubleSided&&l.enable(11),v.flipSided&&l.enable(12),v.useDepthPacking&&l.enable(13),v.dithering&&l.enable(14),v.transmission&&l.enable(15),v.sheen&&l.enable(16),v.opaque&&l.enable(17),v.pointsUvs&&l.enable(18),v.decodeVideoTexture&&l.enable(19),v.decodeVideoTextureEmissive&&l.enable(20),v.alphaToCoverage&&l.enable(21),E.push(l.mask)}function x(E){const v=y[E.type];let R;if(v){const z=dn[v];R=Nd.clone(z.uniforms)}else R=E.uniforms;return R}function P(E,v){let R;for(let z=0,O=d.length;z<O;z++){const V=d[z];if(V.cacheKey===v){R=V,++R.usedTimes;break}}return R===void 0&&(R=new Xg(o,v,E,r),d.push(R)),R}function I(E){if(--E.usedTimes===0){const v=d.indexOf(E);d[v]=d[d.length-1],d.pop(),E.destroy()}}function A(E){h.remove(E)}function C(){h.dispose()}return{getParameters:g,getProgramCacheKey:f,getUniforms:x,acquireProgram:P,releaseProgram:I,releaseShaderCache:A,programs:d,dispose:C}}function Qg(){let o=new WeakMap;function e(a){return o.has(a)}function n(a){let l=o.get(a);return l===void 0&&(l={},o.set(a,l)),l}function i(a){o.delete(a)}function s(a,l,h){o.get(a)[l]=h}function r(){o=new WeakMap}return{has:e,get:n,remove:i,update:s,dispose:r}}function Jg(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.z!==e.z?o.z-e.z:o.id-e.id}function Zl(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function Ql(){const o=[];let e=0;const n=[],i=[],s=[];function r(){e=0,n.length=0,i.length=0,s.length=0}function a(u,p,m,y,_,g){let f=o[e];return f===void 0?(f={id:u.id,object:u,geometry:p,material:m,groupOrder:y,renderOrder:u.renderOrder,z:_,group:g},o[e]=f):(f.id=u.id,f.object=u,f.geometry=p,f.material=m,f.groupOrder=y,f.renderOrder=u.renderOrder,f.z=_,f.group=g),e++,f}function l(u,p,m,y,_,g){const f=a(u,p,m,y,_,g);m.transmission>0?i.push(f):m.transparent===!0?s.push(f):n.push(f)}function h(u,p,m,y,_,g){const f=a(u,p,m,y,_,g);m.transmission>0?i.unshift(f):m.transparent===!0?s.unshift(f):n.unshift(f)}function c(u,p){n.length>1&&n.sort(u||Jg),i.length>1&&i.sort(p||Zl),s.length>1&&s.sort(p||Zl)}function d(){for(let u=e,p=o.length;u<p;u++){const m=o[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:n,transmissive:i,transparent:s,init:r,push:l,unshift:h,finish:d,sort:c}}function e0(){let o=new WeakMap;function e(i,s){const r=o.get(i);let a;return r===void 0?(a=new Ql,o.set(i,[a])):s>=r.length?(a=new Ql,r.push(a)):a=r[s],a}function n(){o=new WeakMap}return{get:e,dispose:n}}function t0(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new D,color:new _e};break;case"SpotLight":n={position:new D,direction:new D,color:new _e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new D,color:new _e,distance:0,decay:0};break;case"HemisphereLight":n={direction:new D,skyColor:new _e,groundColor:new _e};break;case"RectAreaLight":n={color:new _e,position:new D,halfWidth:new D,halfHeight:new D};break}return o[e.id]=n,n}}}function n0(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=n,n}}}let i0=0;function s0(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function r0(o){const e=new t0,n=n0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new D);const s=new D,r=new Fe,a=new Fe;function l(c){let d=0,u=0,p=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let m=0,y=0,_=0,g=0,f=0,S=0,w=0,x=0,P=0,I=0,A=0;c.sort(s0);for(let E=0,v=c.length;E<v;E++){const R=c[E],z=R.color,O=R.intensity,V=R.distance,q=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)d+=z.r*O,u+=z.g*O,p+=z.b*O;else if(R.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(R.sh.coefficients[G],O);A++}else if(R.isDirectionalLight){const G=e.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const Z=R.shadow,W=n.get(R);W.shadowIntensity=Z.intensity,W.shadowBias=Z.bias,W.shadowNormalBias=Z.normalBias,W.shadowRadius=Z.radius,W.shadowMapSize=Z.mapSize,i.directionalShadow[m]=W,i.directionalShadowMap[m]=q,i.directionalShadowMatrix[m]=R.shadow.matrix,S++}i.directional[m]=G,m++}else if(R.isSpotLight){const G=e.get(R);G.position.setFromMatrixPosition(R.matrixWorld),G.color.copy(z).multiplyScalar(O),G.distance=V,G.coneCos=Math.cos(R.angle),G.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),G.decay=R.decay,i.spot[_]=G;const Z=R.shadow;if(R.map&&(i.spotLightMap[P]=R.map,P++,Z.updateMatrices(R),R.castShadow&&I++),i.spotLightMatrix[_]=Z.matrix,R.castShadow){const W=n.get(R);W.shadowIntensity=Z.intensity,W.shadowBias=Z.bias,W.shadowNormalBias=Z.normalBias,W.shadowRadius=Z.radius,W.shadowMapSize=Z.mapSize,i.spotShadow[_]=W,i.spotShadowMap[_]=q,x++}_++}else if(R.isRectAreaLight){const G=e.get(R);G.color.copy(z).multiplyScalar(O),G.halfWidth.set(R.width*.5,0,0),G.halfHeight.set(0,R.height*.5,0),i.rectArea[g]=G,g++}else if(R.isPointLight){const G=e.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),G.distance=R.distance,G.decay=R.decay,R.castShadow){const Z=R.shadow,W=n.get(R);W.shadowIntensity=Z.intensity,W.shadowBias=Z.bias,W.shadowNormalBias=Z.normalBias,W.shadowRadius=Z.radius,W.shadowMapSize=Z.mapSize,W.shadowCameraNear=Z.camera.near,W.shadowCameraFar=Z.camera.far,i.pointShadow[y]=W,i.pointShadowMap[y]=q,i.pointShadowMatrix[y]=R.shadow.matrix,w++}i.point[y]=G,y++}else if(R.isHemisphereLight){const G=e.get(R);G.skyColor.copy(R.color).multiplyScalar(O),G.groundColor.copy(R.groundColor).multiplyScalar(O),i.hemi[f]=G,f++}}g>0&&(o.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=re.LTC_FLOAT_1,i.rectAreaLTC2=re.LTC_FLOAT_2):(i.rectAreaLTC1=re.LTC_HALF_1,i.rectAreaLTC2=re.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=u,i.ambient[2]=p;const C=i.hash;(C.directionalLength!==m||C.pointLength!==y||C.spotLength!==_||C.rectAreaLength!==g||C.hemiLength!==f||C.numDirectionalShadows!==S||C.numPointShadows!==w||C.numSpotShadows!==x||C.numSpotMaps!==P||C.numLightProbes!==A)&&(i.directional.length=m,i.spot.length=_,i.rectArea.length=g,i.point.length=y,i.hemi.length=f,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=x+P-I,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=I,i.numLightProbes=A,C.directionalLength=m,C.pointLength=y,C.spotLength=_,C.rectAreaLength=g,C.hemiLength=f,C.numDirectionalShadows=S,C.numPointShadows=w,C.numSpotShadows=x,C.numSpotMaps=P,C.numLightProbes=A,i.version=i0++)}function h(c,d){let u=0,p=0,m=0,y=0,_=0;const g=d.matrixWorldInverse;for(let f=0,S=c.length;f<S;f++){const w=c[f];if(w.isDirectionalLight){const x=i.directional[u];x.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),u++}else if(w.isSpotLight){const x=i.spot[m];x.position.setFromMatrixPosition(w.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),m++}else if(w.isRectAreaLight){const x=i.rectArea[y];x.position.setFromMatrixPosition(w.matrixWorld),x.position.applyMatrix4(g),a.identity(),r.copy(w.matrixWorld),r.premultiply(g),a.extractRotation(r),x.halfWidth.set(w.width*.5,0,0),x.halfHeight.set(0,w.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),y++}else if(w.isPointLight){const x=i.point[p];x.position.setFromMatrixPosition(w.matrixWorld),x.position.applyMatrix4(g),p++}else if(w.isHemisphereLight){const x=i.hemi[_];x.direction.setFromMatrixPosition(w.matrixWorld),x.direction.transformDirection(g),_++}}}return{setup:l,setupView:h,state:i}}function Jl(o){const e=new r0(o),n=[],i=[];function s(d){c.camera=d,n.length=0,i.length=0}function r(d){n.push(d)}function a(d){i.push(d)}function l(){e.setup(n)}function h(d){e.setupView(n,d)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:l,setupLightsView:h,pushLight:r,pushShadow:a}}function o0(o){let e=new WeakMap;function n(s,r=0){const a=e.get(s);let l;return a===void 0?(l=new Jl(o),e.set(s,[l])):r>=a.length?(l=new Jl(o),a.push(l)):l=a[r],l}function i(){e=new WeakMap}return{get:n,dispose:i}}const a0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,l0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function c0(o,e,n){let i=new wa;const s=new Ce,r=new Ce,a=new Ke,l=new Jd({depthPacking:zh}),h=new eu,c={},d=n.maxTextureSize,u={[Ct]:Rt,[Rt]:Ct,[at]:at},p=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ce},radius:{value:4}},vertexShader:a0,fragmentShader:l0}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const y=new Bt;y.setAttribute("position",new Et(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Gt(y,p),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cc;let f=this.type;this.render=function(I,A,C){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||I.length===0)return;const E=o.getRenderTarget(),v=o.getActiveCubeFace(),R=o.getActiveMipmapLevel(),z=o.state;z.setBlending(Vn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const O=f!==Mn&&this.type===Mn,V=f===Mn&&this.type!==Mn;for(let q=0,G=I.length;q<G;q++){const Z=I[q],W=Z.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const ne=W.getFrameExtents();if(s.multiply(ne),r.copy(W.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/ne.x),s.x=r.x*ne.x,W.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/ne.y),s.y=r.y*ne.y,W.mapSize.y=r.y)),W.map===null||O===!0||V===!0){const xe=this.type!==Mn?{minFilter:Ot,magFilter:Ot}:{};W.map!==null&&W.map.dispose(),W.map=new ci(s.x,s.y,xe),W.map.texture.name=Z.name+".shadowMap",W.camera.updateProjectionMatrix()}o.setRenderTarget(W.map),o.clear();const ie=W.getViewportCount();for(let xe=0;xe<ie;xe++){const we=W.getViewport(xe);a.set(r.x*we.x,r.y*we.y,r.x*we.z,r.y*we.w),z.viewport(a),W.updateMatrices(Z,xe),i=W.getFrustum(),x(A,C,W.camera,Z,this.type)}W.isPointLightShadow!==!0&&this.type===Mn&&S(W,C),W.needsUpdate=!1}f=this.type,g.needsUpdate=!1,o.setRenderTarget(E,v,R)};function S(I,A){const C=e.update(_);p.defines.VSM_SAMPLES!==I.blurSamples&&(p.defines.VSM_SAMPLES=I.blurSamples,m.defines.VSM_SAMPLES=I.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new ci(s.x,s.y)),p.uniforms.shadow_pass.value=I.map.texture,p.uniforms.resolution.value=I.mapSize,p.uniforms.radius.value=I.radius,o.setRenderTarget(I.mapPass),o.clear(),o.renderBufferDirect(A,null,C,p,_,null),m.uniforms.shadow_pass.value=I.mapPass.texture,m.uniforms.resolution.value=I.mapSize,m.uniforms.radius.value=I.radius,o.setRenderTarget(I.map),o.clear(),o.renderBufferDirect(A,null,C,m,_,null)}function w(I,A,C,E){let v=null;const R=C.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(R!==void 0)v=R;else if(v=C.isPointLight===!0?h:l,o.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const z=v.uuid,O=A.uuid;let V=c[z];V===void 0&&(V={},c[z]=V);let q=V[O];q===void 0&&(q=v.clone(),V[O]=q,A.addEventListener("dispose",P)),v=q}if(v.visible=A.visible,v.wireframe=A.wireframe,E===Mn?v.side=A.shadowSide!==null?A.shadowSide:A.side:v.side=A.shadowSide!==null?A.shadowSide:u[A.side],v.alphaMap=A.alphaMap,v.alphaTest=A.alphaTest,v.map=A.map,v.clipShadows=A.clipShadows,v.clippingPlanes=A.clippingPlanes,v.clipIntersection=A.clipIntersection,v.displacementMap=A.displacementMap,v.displacementScale=A.displacementScale,v.displacementBias=A.displacementBias,v.wireframeLinewidth=A.wireframeLinewidth,v.linewidth=A.linewidth,C.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const z=o.properties.get(v);z.light=C}return v}function x(I,A,C,E,v){if(I.visible===!1)return;if(I.layers.test(A.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&v===Mn)&&(!I.frustumCulled||i.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,I.matrixWorld);const O=e.update(I),V=I.material;if(Array.isArray(V)){const q=O.groups;for(let G=0,Z=q.length;G<Z;G++){const W=q[G],ne=V[W.materialIndex];if(ne&&ne.visible){const ie=w(I,ne,E,v);I.onBeforeShadow(o,I,A,C,O,ie,W),o.renderBufferDirect(C,null,O,ie,I,W),I.onAfterShadow(o,I,A,C,O,ie,W)}}}else if(V.visible){const q=w(I,V,E,v);I.onBeforeShadow(o,I,A,C,O,q,null),o.renderBufferDirect(C,null,O,q,I,null),I.onAfterShadow(o,I,A,C,O,q,null)}}const z=I.children;for(let O=0,V=z.length;O<V;O++)x(z[O],A,C,E,v)}function P(I){I.target.removeEventListener("dispose",P);for(const C in c){const E=c[C],v=I.target.uuid;v in E&&(E[v].dispose(),delete E[v])}}}const h0={[vo]:bo,[So]:wo,[Mo]:To,[Oi]:Eo,[bo]:vo,[wo]:So,[To]:Mo,[Eo]:Oi};function d0(o,e){function n(){let F=!1;const se=new Ke;let $=null;const K=new Ke(0,0,0,0);return{setMask:function(ce){$!==ce&&!F&&(o.colorMask(ce,ce,ce,ce),$=ce)},setLocked:function(ce){F=ce},setClear:function(ce,le,Ie,ot,mt){mt===!0&&(ce*=ot,le*=ot,Ie*=ot),se.set(ce,le,Ie,ot),K.equals(se)===!1&&(o.clearColor(ce,le,Ie,ot),K.copy(se))},reset:function(){F=!1,$=null,K.set(-1,0,0,0)}}}function i(){let F=!1,se=!1,$=null,K=null,ce=null;return{setReversed:function(le){if(se!==le){const Ie=e.get("EXT_clip_control");se?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT);const ot=ce;ce=null,this.setClear(ot)}se=le},getReversed:function(){return se},setTest:function(le){le?oe(o.DEPTH_TEST):Me(o.DEPTH_TEST)},setMask:function(le){$!==le&&!F&&(o.depthMask(le),$=le)},setFunc:function(le){if(se&&(le=h0[le]),K!==le){switch(le){case vo:o.depthFunc(o.NEVER);break;case bo:o.depthFunc(o.ALWAYS);break;case So:o.depthFunc(o.LESS);break;case Oi:o.depthFunc(o.LEQUAL);break;case Mo:o.depthFunc(o.EQUAL);break;case Eo:o.depthFunc(o.GEQUAL);break;case wo:o.depthFunc(o.GREATER);break;case To:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}K=le}},setLocked:function(le){F=le},setClear:function(le){ce!==le&&(se&&(le=1-le),o.clearDepth(le),ce=le)},reset:function(){F=!1,$=null,K=null,ce=null,se=!1}}}function s(){let F=!1,se=null,$=null,K=null,ce=null,le=null,Ie=null,ot=null,mt=null;return{setTest:function(je){F||(je?oe(o.STENCIL_TEST):Me(o.STENCIL_TEST))},setMask:function(je){se!==je&&!F&&(o.stencilMask(je),se=je)},setFunc:function(je,kt,jt){($!==je||K!==kt||ce!==jt)&&(o.stencilFunc(je,kt,jt),$=je,K=kt,ce=jt)},setOp:function(je,kt,jt){(le!==je||Ie!==kt||ot!==jt)&&(o.stencilOp(je,kt,jt),le=je,Ie=kt,ot=jt)},setLocked:function(je){F=je},setClear:function(je){mt!==je&&(o.clearStencil(je),mt=je)},reset:function(){F=!1,se=null,$=null,K=null,ce=null,le=null,Ie=null,ot=null,mt=null}}}const r=new n,a=new i,l=new s,h=new WeakMap,c=new WeakMap;let d={},u={},p=new WeakMap,m=[],y=null,_=!1,g=null,f=null,S=null,w=null,x=null,P=null,I=null,A=new _e(0,0,0),C=0,E=!1,v=null,R=null,z=null,O=null,V=null;const q=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,Z=0;const W=o.getParameter(o.VERSION);W.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(W)[1]),G=Z>=1):W.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),G=Z>=2);let ne=null,ie={};const xe=o.getParameter(o.SCISSOR_BOX),we=o.getParameter(o.VIEWPORT),Ne=new Ke().fromArray(xe),X=new Ke().fromArray(we);function te(F,se,$,K){const ce=new Uint8Array(4),le=o.createTexture();o.bindTexture(F,le),o.texParameteri(F,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(F,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let Ie=0;Ie<$;Ie++)F===o.TEXTURE_3D||F===o.TEXTURE_2D_ARRAY?o.texImage3D(se,0,o.RGBA,1,1,K,0,o.RGBA,o.UNSIGNED_BYTE,ce):o.texImage2D(se+Ie,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,ce);return le}const ge={};ge[o.TEXTURE_2D]=te(o.TEXTURE_2D,o.TEXTURE_2D,1),ge[o.TEXTURE_CUBE_MAP]=te(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),ge[o.TEXTURE_2D_ARRAY]=te(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),ge[o.TEXTURE_3D]=te(o.TEXTURE_3D,o.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),l.setClear(0),oe(o.DEPTH_TEST),a.setFunc(Oi),ze(!1),He(Oa),oe(o.CULL_FACE),L(Vn);function oe(F){d[F]!==!0&&(o.enable(F),d[F]=!0)}function Me(F){d[F]!==!1&&(o.disable(F),d[F]=!1)}function $e(F,se){return u[F]!==se?(o.bindFramebuffer(F,se),u[F]=se,F===o.DRAW_FRAMEBUFFER&&(u[o.FRAMEBUFFER]=se),F===o.FRAMEBUFFER&&(u[o.DRAW_FRAMEBUFFER]=se),!0):!1}function Ae(F,se){let $=m,K=!1;if(F){$=p.get(se),$===void 0&&($=[],p.set(se,$));const ce=F.textures;if($.length!==ce.length||$[0]!==o.COLOR_ATTACHMENT0){for(let le=0,Ie=ce.length;le<Ie;le++)$[le]=o.COLOR_ATTACHMENT0+le;$.length=ce.length,K=!0}}else $[0]!==o.BACK&&($[0]=o.BACK,K=!0);K&&o.drawBuffers($)}function lt(F){return y!==F?(o.useProgram(F),y=F,!0):!1}const rt={[si]:o.FUNC_ADD,[lh]:o.FUNC_SUBTRACT,[ch]:o.FUNC_REVERSE_SUBTRACT};rt[hh]=o.MIN,rt[dh]=o.MAX;const ke={[uh]:o.ZERO,[ph]:o.ONE,[fh]:o.SRC_COLOR,[yo]:o.SRC_ALPHA,[vh]:o.SRC_ALPHA_SATURATE,[yh]:o.DST_COLOR,[gh]:o.DST_ALPHA,[mh]:o.ONE_MINUS_SRC_COLOR,[xo]:o.ONE_MINUS_SRC_ALPHA,[xh]:o.ONE_MINUS_DST_COLOR,[_h]:o.ONE_MINUS_DST_ALPHA,[bh]:o.CONSTANT_COLOR,[Sh]:o.ONE_MINUS_CONSTANT_COLOR,[Mh]:o.CONSTANT_ALPHA,[Eh]:o.ONE_MINUS_CONSTANT_ALPHA};function L(F,se,$,K,ce,le,Ie,ot,mt,je){if(F===Vn){_===!0&&(Me(o.BLEND),_=!1);return}if(_===!1&&(oe(o.BLEND),_=!0),F!==lr){if(F!==g||je!==E){if((f!==si||x!==si)&&(o.blendEquation(o.FUNC_ADD),f=si,x=si),je)switch(F){case Mt:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case gr:o.blendFunc(o.ONE,o.ONE);break;case _r:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case yr:o.blendFuncSeparate(o.ZERO,o.SRC_COLOR,o.ZERO,o.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Mt:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case gr:o.blendFunc(o.SRC_ALPHA,o.ONE);break;case _r:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case yr:o.blendFunc(o.ZERO,o.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}S=null,w=null,P=null,I=null,A.set(0,0,0),C=0,g=F,E=je}return}ce=ce||se,le=le||$,Ie=Ie||K,(se!==f||ce!==x)&&(o.blendEquationSeparate(rt[se],rt[ce]),f=se,x=ce),($!==S||K!==w||le!==P||Ie!==I)&&(o.blendFuncSeparate(ke[$],ke[K],ke[le],ke[Ie]),S=$,w=K,P=le,I=Ie),(ot.equals(A)===!1||mt!==C)&&(o.blendColor(ot.r,ot.g,ot.b,mt),A.copy(ot),C=mt),g=F,E=!1}function It(F,se){F.side===at?Me(o.CULL_FACE):oe(o.CULL_FACE);let $=F.side===Rt;se&&($=!$),ze($),F.blending===Mt&&F.transparent===!1?L(Vn):L(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);const K=F.stencilWrite;l.setTest(K),K&&(l.setMask(F.stencilWriteMask),l.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),l.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),nt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?oe(o.SAMPLE_ALPHA_TO_COVERAGE):Me(o.SAMPLE_ALPHA_TO_COVERAGE)}function ze(F){v!==F&&(F?o.frontFace(o.CW):o.frontFace(o.CCW),v=F)}function He(F){F!==oh?(oe(o.CULL_FACE),F!==R&&(F===Oa?o.cullFace(o.BACK):F===ah?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):Me(o.CULL_FACE),R=F}function be(F){F!==z&&(G&&o.lineWidth(F),z=F)}function nt(F,se,$){F?(oe(o.POLYGON_OFFSET_FILL),(O!==se||V!==$)&&(o.polygonOffset(se,$),O=se,V=$)):Me(o.POLYGON_OFFSET_FILL)}function ve(F){F?oe(o.SCISSOR_TEST):Me(o.SCISSOR_TEST)}function T(F){F===void 0&&(F=o.TEXTURE0+q-1),ne!==F&&(o.activeTexture(F),ne=F)}function b(F,se,$){$===void 0&&(ne===null?$=o.TEXTURE0+q-1:$=ne);let K=ie[$];K===void 0&&(K={type:void 0,texture:void 0},ie[$]=K),(K.type!==F||K.texture!==se)&&(ne!==$&&(o.activeTexture($),ne=$),o.bindTexture(F,se||ge[F]),K.type=F,K.texture=se)}function B(){const F=ie[ne];F!==void 0&&F.type!==void 0&&(o.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function Y(){try{o.compressedTexImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Q(){try{o.compressedTexImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function j(){try{o.texSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ye(){try{o.texSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ae(){try{o.compressedTexSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function de(){try{o.compressedTexSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function We(){try{o.texStorage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ee(){try{o.texStorage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ue(){try{o.texImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Te(){try{o.texImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Re(F){Ne.equals(F)===!1&&(o.scissor(F.x,F.y,F.z,F.w),Ne.copy(F))}function pe(F){X.equals(F)===!1&&(o.viewport(F.x,F.y,F.z,F.w),X.copy(F))}function Ve(F,se){let $=c.get(se);$===void 0&&($=new WeakMap,c.set(se,$));let K=$.get(F);K===void 0&&(K=o.getUniformBlockIndex(se,F.name),$.set(F,K))}function De(F,se){const K=c.get(se).get(F);h.get(se)!==K&&(o.uniformBlockBinding(se,K,F.__bindingPointIndex),h.set(se,K))}function et(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),a.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),d={},ne=null,ie={},u={},p=new WeakMap,m=[],y=null,_=!1,g=null,f=null,S=null,w=null,x=null,P=null,I=null,A=new _e(0,0,0),C=0,E=!1,v=null,R=null,z=null,O=null,V=null,Ne.set(0,0,o.canvas.width,o.canvas.height),X.set(0,0,o.canvas.width,o.canvas.height),r.reset(),a.reset(),l.reset()}return{buffers:{color:r,depth:a,stencil:l},enable:oe,disable:Me,bindFramebuffer:$e,drawBuffers:Ae,useProgram:lt,setBlending:L,setMaterial:It,setFlipSided:ze,setCullFace:He,setLineWidth:be,setPolygonOffset:nt,setScissorTest:ve,activeTexture:T,bindTexture:b,unbindTexture:B,compressedTexImage2D:Y,compressedTexImage3D:Q,texImage2D:ue,texImage3D:Te,updateUBOMapping:Ve,uniformBlockBinding:De,texStorage2D:We,texStorage3D:ee,texSubImage2D:j,texSubImage3D:ye,compressedTexSubImage2D:ae,compressedTexSubImage3D:de,scissor:Re,viewport:pe,reset:et}}function u0(o,e,n,i,s,r,a){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ce,d=new WeakMap;let u;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(T,b){return m?new OffscreenCanvas(T,b):Ms("canvas")}function _(T,b,B){let Y=1;const Q=ve(T);if((Q.width>B||Q.height>B)&&(Y=B/Math.max(Q.width,Q.height)),Y<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const j=Math.floor(Y*Q.width),ye=Math.floor(Y*Q.height);u===void 0&&(u=y(j,ye));const ae=b?y(j,ye):u;return ae.width=j,ae.height=ye,ae.getContext("2d").drawImage(T,0,0,j,ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+j+"x"+ye+")."),ae}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function g(T){return T.generateMipmaps}function f(T){o.generateMipmap(T)}function S(T){return T.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?o.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function w(T,b,B,Y,Q=!1){if(T!==null){if(o[T]!==void 0)return o[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let j=b;if(b===o.RED&&(B===o.FLOAT&&(j=o.R32F),B===o.HALF_FLOAT&&(j=o.R16F),B===o.UNSIGNED_BYTE&&(j=o.R8)),b===o.RED_INTEGER&&(B===o.UNSIGNED_BYTE&&(j=o.R8UI),B===o.UNSIGNED_SHORT&&(j=o.R16UI),B===o.UNSIGNED_INT&&(j=o.R32UI),B===o.BYTE&&(j=o.R8I),B===o.SHORT&&(j=o.R16I),B===o.INT&&(j=o.R32I)),b===o.RG&&(B===o.FLOAT&&(j=o.RG32F),B===o.HALF_FLOAT&&(j=o.RG16F),B===o.UNSIGNED_BYTE&&(j=o.RG8)),b===o.RG_INTEGER&&(B===o.UNSIGNED_BYTE&&(j=o.RG8UI),B===o.UNSIGNED_SHORT&&(j=o.RG16UI),B===o.UNSIGNED_INT&&(j=o.RG32UI),B===o.BYTE&&(j=o.RG8I),B===o.SHORT&&(j=o.RG16I),B===o.INT&&(j=o.RG32I)),b===o.RGB_INTEGER&&(B===o.UNSIGNED_BYTE&&(j=o.RGB8UI),B===o.UNSIGNED_SHORT&&(j=o.RGB16UI),B===o.UNSIGNED_INT&&(j=o.RGB32UI),B===o.BYTE&&(j=o.RGB8I),B===o.SHORT&&(j=o.RGB16I),B===o.INT&&(j=o.RGB32I)),b===o.RGBA_INTEGER&&(B===o.UNSIGNED_BYTE&&(j=o.RGBA8UI),B===o.UNSIGNED_SHORT&&(j=o.RGBA16UI),B===o.UNSIGNED_INT&&(j=o.RGBA32UI),B===o.BYTE&&(j=o.RGBA8I),B===o.SHORT&&(j=o.RGBA16I),B===o.INT&&(j=o.RGBA32I)),b===o.RGB&&B===o.UNSIGNED_INT_5_9_9_9_REV&&(j=o.RGB9_E5),b===o.RGBA){const ye=Q?Sr:qe.getTransfer(Y);B===o.FLOAT&&(j=o.RGBA32F),B===o.HALF_FLOAT&&(j=o.RGBA16F),B===o.UNSIGNED_BYTE&&(j=ye===it?o.SRGB8_ALPHA8:o.RGBA8),B===o.UNSIGNED_SHORT_4_4_4_4&&(j=o.RGBA4),B===o.UNSIGNED_SHORT_5_5_5_1&&(j=o.RGB5_A1)}return(j===o.R16F||j===o.R32F||j===o.RG16F||j===o.RG32F||j===o.RGBA16F||j===o.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function x(T,b){let B;return T?b===null||b===li||b===Hi?B=o.DEPTH24_STENCIL8:b===Vt?B=o.DEPTH32F_STENCIL8:b===vs&&(B=o.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===li||b===Hi?B=o.DEPTH_COMPONENT24:b===Vt?B=o.DEPTH_COMPONENT32F:b===vs&&(B=o.DEPTH_COMPONENT16),B}function P(T,b){return g(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ot&&T.minFilter!==ht?Math.log2(Math.max(b.width,b.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?b.mipmaps.length:1}function I(T){const b=T.target;b.removeEventListener("dispose",I),C(b),b.isVideoTexture&&d.delete(b)}function A(T){const b=T.target;b.removeEventListener("dispose",A),v(b)}function C(T){const b=i.get(T);if(b.__webglInit===void 0)return;const B=T.source,Y=p.get(B);if(Y){const Q=Y[b.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&E(T),Object.keys(Y).length===0&&p.delete(B)}i.remove(T)}function E(T){const b=i.get(T);o.deleteTexture(b.__webglTexture);const B=T.source,Y=p.get(B);delete Y[b.__cacheKey],a.memory.textures--}function v(T){const b=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(b.__webglFramebuffer[Y]))for(let Q=0;Q<b.__webglFramebuffer[Y].length;Q++)o.deleteFramebuffer(b.__webglFramebuffer[Y][Q]);else o.deleteFramebuffer(b.__webglFramebuffer[Y]);b.__webglDepthbuffer&&o.deleteRenderbuffer(b.__webglDepthbuffer[Y])}else{if(Array.isArray(b.__webglFramebuffer))for(let Y=0;Y<b.__webglFramebuffer.length;Y++)o.deleteFramebuffer(b.__webglFramebuffer[Y]);else o.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&o.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&o.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let Y=0;Y<b.__webglColorRenderbuffer.length;Y++)b.__webglColorRenderbuffer[Y]&&o.deleteRenderbuffer(b.__webglColorRenderbuffer[Y]);b.__webglDepthRenderbuffer&&o.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const B=T.textures;for(let Y=0,Q=B.length;Y<Q;Y++){const j=i.get(B[Y]);j.__webglTexture&&(o.deleteTexture(j.__webglTexture),a.memory.textures--),i.remove(B[Y])}i.remove(T)}let R=0;function z(){R=0}function O(){const T=R;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),R+=1,T}function V(T){const b=[];return b.push(T.wrapS),b.push(T.wrapT),b.push(T.wrapR||0),b.push(T.magFilter),b.push(T.minFilter),b.push(T.anisotropy),b.push(T.internalFormat),b.push(T.format),b.push(T.type),b.push(T.generateMipmaps),b.push(T.premultiplyAlpha),b.push(T.flipY),b.push(T.unpackAlignment),b.push(T.colorSpace),b.join()}function q(T,b){const B=i.get(T);if(T.isVideoTexture&&be(T),T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){const Y=T.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(B,T,b);return}}n.bindTexture(o.TEXTURE_2D,B.__webglTexture,o.TEXTURE0+b)}function G(T,b){const B=i.get(T);if(T.version>0&&B.__version!==T.version){X(B,T,b);return}n.bindTexture(o.TEXTURE_2D_ARRAY,B.__webglTexture,o.TEXTURE0+b)}function Z(T,b){const B=i.get(T);if(T.version>0&&B.__version!==T.version){X(B,T,b);return}n.bindTexture(o.TEXTURE_3D,B.__webglTexture,o.TEXTURE0+b)}function W(T,b){const B=i.get(T);if(T.version>0&&B.__version!==T.version){te(B,T,b);return}n.bindTexture(o.TEXTURE_CUBE_MAP,B.__webglTexture,o.TEXTURE0+b)}const ne={[zi]:o.REPEAT,[Jt]:o.CLAMP_TO_EDGE,[vr]:o.MIRRORED_REPEAT},ie={[Ot]:o.NEAREST,[fc]:o.NEAREST_MIPMAP_NEAREST,[ms]:o.NEAREST_MIPMAP_LINEAR,[ht]:o.LINEAR,[cr]:o.LINEAR_MIPMAP_NEAREST,[un]:o.LINEAR_MIPMAP_LINEAR},xe={[Vh]:o.NEVER,[jh]:o.ALWAYS,[Gh]:o.LESS,[Tc]:o.LEQUAL,[Wh]:o.EQUAL,[Xh]:o.GEQUAL,[$h]:o.GREATER,[qh]:o.NOTEQUAL};function we(T,b){if(b.type===Vt&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===ht||b.magFilter===cr||b.magFilter===ms||b.magFilter===un||b.minFilter===ht||b.minFilter===cr||b.minFilter===ms||b.minFilter===un)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(T,o.TEXTURE_WRAP_S,ne[b.wrapS]),o.texParameteri(T,o.TEXTURE_WRAP_T,ne[b.wrapT]),(T===o.TEXTURE_3D||T===o.TEXTURE_2D_ARRAY)&&o.texParameteri(T,o.TEXTURE_WRAP_R,ne[b.wrapR]),o.texParameteri(T,o.TEXTURE_MAG_FILTER,ie[b.magFilter]),o.texParameteri(T,o.TEXTURE_MIN_FILTER,ie[b.minFilter]),b.compareFunction&&(o.texParameteri(T,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(T,o.TEXTURE_COMPARE_FUNC,xe[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ot||b.minFilter!==ms&&b.minFilter!==un||b.type===Vt&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");o.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function Ne(T,b){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,b.addEventListener("dispose",I));const Y=b.source;let Q=p.get(Y);Q===void 0&&(Q={},p.set(Y,Q));const j=V(b);if(j!==T.__cacheKey){Q[j]===void 0&&(Q[j]={texture:o.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Q[j].usedTimes++;const ye=Q[T.__cacheKey];ye!==void 0&&(Q[T.__cacheKey].usedTimes--,ye.usedTimes===0&&E(b)),T.__cacheKey=j,T.__webglTexture=Q[j].texture}return B}function X(T,b,B){let Y=o.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(Y=o.TEXTURE_2D_ARRAY),b.isData3DTexture&&(Y=o.TEXTURE_3D);const Q=Ne(T,b),j=b.source;n.bindTexture(Y,T.__webglTexture,o.TEXTURE0+B);const ye=i.get(j);if(j.version!==ye.__version||Q===!0){n.activeTexture(o.TEXTURE0+B);const ae=qe.getPrimaries(qe.workingColorSpace),de=b.colorSpace===Hn?null:qe.getPrimaries(b.colorSpace),We=b.colorSpace===Hn||ae===de?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,b.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,b.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,We);let ee=_(b.image,!1,s.maxTextureSize);ee=nt(b,ee);const ue=r.convert(b.format,b.colorSpace),Te=r.convert(b.type);let Re=w(b.internalFormat,ue,Te,b.colorSpace,b.isVideoTexture);we(Y,b);let pe;const Ve=b.mipmaps,De=b.isVideoTexture!==!0,et=ye.__version===void 0||Q===!0,F=j.dataReady,se=P(b,ee);if(b.isDepthTexture)Re=x(b.format===Vi,b.type),et&&(De?n.texStorage2D(o.TEXTURE_2D,1,Re,ee.width,ee.height):n.texImage2D(o.TEXTURE_2D,0,Re,ee.width,ee.height,0,ue,Te,null));else if(b.isDataTexture)if(Ve.length>0){De&&et&&n.texStorage2D(o.TEXTURE_2D,se,Re,Ve[0].width,Ve[0].height);for(let $=0,K=Ve.length;$<K;$++)pe=Ve[$],De?F&&n.texSubImage2D(o.TEXTURE_2D,$,0,0,pe.width,pe.height,ue,Te,pe.data):n.texImage2D(o.TEXTURE_2D,$,Re,pe.width,pe.height,0,ue,Te,pe.data);b.generateMipmaps=!1}else De?(et&&n.texStorage2D(o.TEXTURE_2D,se,Re,ee.width,ee.height),F&&n.texSubImage2D(o.TEXTURE_2D,0,0,0,ee.width,ee.height,ue,Te,ee.data)):n.texImage2D(o.TEXTURE_2D,0,Re,ee.width,ee.height,0,ue,Te,ee.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){De&&et&&n.texStorage3D(o.TEXTURE_2D_ARRAY,se,Re,Ve[0].width,Ve[0].height,ee.depth);for(let $=0,K=Ve.length;$<K;$++)if(pe=Ve[$],b.format!==en)if(ue!==null)if(De){if(F)if(b.layerUpdates.size>0){const ce=Rl(pe.width,pe.height,b.format,b.type);for(const le of b.layerUpdates){const Ie=pe.data.subarray(le*ce/pe.data.BYTES_PER_ELEMENT,(le+1)*ce/pe.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,$,0,0,le,pe.width,pe.height,1,ue,Ie)}b.clearLayerUpdates()}else n.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,$,0,0,0,pe.width,pe.height,ee.depth,ue,pe.data)}else n.compressedTexImage3D(o.TEXTURE_2D_ARRAY,$,Re,pe.width,pe.height,ee.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?F&&n.texSubImage3D(o.TEXTURE_2D_ARRAY,$,0,0,0,pe.width,pe.height,ee.depth,ue,Te,pe.data):n.texImage3D(o.TEXTURE_2D_ARRAY,$,Re,pe.width,pe.height,ee.depth,0,ue,Te,pe.data)}else{De&&et&&n.texStorage2D(o.TEXTURE_2D,se,Re,Ve[0].width,Ve[0].height);for(let $=0,K=Ve.length;$<K;$++)pe=Ve[$],b.format!==en?ue!==null?De?F&&n.compressedTexSubImage2D(o.TEXTURE_2D,$,0,0,pe.width,pe.height,ue,pe.data):n.compressedTexImage2D(o.TEXTURE_2D,$,Re,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?F&&n.texSubImage2D(o.TEXTURE_2D,$,0,0,pe.width,pe.height,ue,Te,pe.data):n.texImage2D(o.TEXTURE_2D,$,Re,pe.width,pe.height,0,ue,Te,pe.data)}else if(b.isDataArrayTexture)if(De){if(et&&n.texStorage3D(o.TEXTURE_2D_ARRAY,se,Re,ee.width,ee.height,ee.depth),F)if(b.layerUpdates.size>0){const $=Rl(ee.width,ee.height,b.format,b.type);for(const K of b.layerUpdates){const ce=ee.data.subarray(K*$/ee.data.BYTES_PER_ELEMENT,(K+1)*$/ee.data.BYTES_PER_ELEMENT);n.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,K,ee.width,ee.height,1,ue,Te,ce)}b.clearLayerUpdates()}else n.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,ue,Te,ee.data)}else n.texImage3D(o.TEXTURE_2D_ARRAY,0,Re,ee.width,ee.height,ee.depth,0,ue,Te,ee.data);else if(b.isData3DTexture)De?(et&&n.texStorage3D(o.TEXTURE_3D,se,Re,ee.width,ee.height,ee.depth),F&&n.texSubImage3D(o.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,ue,Te,ee.data)):n.texImage3D(o.TEXTURE_3D,0,Re,ee.width,ee.height,ee.depth,0,ue,Te,ee.data);else if(b.isFramebufferTexture){if(et)if(De)n.texStorage2D(o.TEXTURE_2D,se,Re,ee.width,ee.height);else{let $=ee.width,K=ee.height;for(let ce=0;ce<se;ce++)n.texImage2D(o.TEXTURE_2D,ce,Re,$,K,0,ue,Te,null),$>>=1,K>>=1}}else if(Ve.length>0){if(De&&et){const $=ve(Ve[0]);n.texStorage2D(o.TEXTURE_2D,se,Re,$.width,$.height)}for(let $=0,K=Ve.length;$<K;$++)pe=Ve[$],De?F&&n.texSubImage2D(o.TEXTURE_2D,$,0,0,ue,Te,pe):n.texImage2D(o.TEXTURE_2D,$,Re,ue,Te,pe);b.generateMipmaps=!1}else if(De){if(et){const $=ve(ee);n.texStorage2D(o.TEXTURE_2D,se,Re,$.width,$.height)}F&&n.texSubImage2D(o.TEXTURE_2D,0,0,0,ue,Te,ee)}else n.texImage2D(o.TEXTURE_2D,0,Re,ue,Te,ee);g(b)&&f(Y),ye.__version=j.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function te(T,b,B){if(b.image.length!==6)return;const Y=Ne(T,b),Q=b.source;n.bindTexture(o.TEXTURE_CUBE_MAP,T.__webglTexture,o.TEXTURE0+B);const j=i.get(Q);if(Q.version!==j.__version||Y===!0){n.activeTexture(o.TEXTURE0+B);const ye=qe.getPrimaries(qe.workingColorSpace),ae=b.colorSpace===Hn?null:qe.getPrimaries(b.colorSpace),de=b.colorSpace===Hn||ye===ae?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,b.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,b.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const We=b.isCompressedTexture||b.image[0].isCompressedTexture,ee=b.image[0]&&b.image[0].isDataTexture,ue=[];for(let K=0;K<6;K++)!We&&!ee?ue[K]=_(b.image[K],!0,s.maxCubemapSize):ue[K]=ee?b.image[K].image:b.image[K],ue[K]=nt(b,ue[K]);const Te=ue[0],Re=r.convert(b.format,b.colorSpace),pe=r.convert(b.type),Ve=w(b.internalFormat,Re,pe,b.colorSpace),De=b.isVideoTexture!==!0,et=j.__version===void 0||Y===!0,F=Q.dataReady;let se=P(b,Te);we(o.TEXTURE_CUBE_MAP,b);let $;if(We){De&&et&&n.texStorage2D(o.TEXTURE_CUBE_MAP,se,Ve,Te.width,Te.height);for(let K=0;K<6;K++){$=ue[K].mipmaps;for(let ce=0;ce<$.length;ce++){const le=$[ce];b.format!==en?Re!==null?De?F&&n.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce,0,0,le.width,le.height,Re,le.data):n.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce,Ve,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):De?F&&n.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce,0,0,le.width,le.height,Re,pe,le.data):n.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce,Ve,le.width,le.height,0,Re,pe,le.data)}}}else{if($=b.mipmaps,De&&et){$.length>0&&se++;const K=ve(ue[0]);n.texStorage2D(o.TEXTURE_CUBE_MAP,se,Ve,K.width,K.height)}for(let K=0;K<6;K++)if(ee){De?F&&n.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ue[K].width,ue[K].height,Re,pe,ue[K].data):n.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ve,ue[K].width,ue[K].height,0,Re,pe,ue[K].data);for(let ce=0;ce<$.length;ce++){const Ie=$[ce].image[K].image;De?F&&n.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce+1,0,0,Ie.width,Ie.height,Re,pe,Ie.data):n.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce+1,Ve,Ie.width,Ie.height,0,Re,pe,Ie.data)}}else{De?F&&n.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Re,pe,ue[K]):n.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ve,Re,pe,ue[K]);for(let ce=0;ce<$.length;ce++){const le=$[ce];De?F&&n.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce+1,0,0,Re,pe,le.image[K]):n.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce+1,Ve,Re,pe,le.image[K])}}}g(b)&&f(o.TEXTURE_CUBE_MAP),j.__version=Q.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function ge(T,b,B,Y,Q,j){const ye=r.convert(B.format,B.colorSpace),ae=r.convert(B.type),de=w(B.internalFormat,ye,ae,B.colorSpace),We=i.get(b),ee=i.get(B);if(ee.__renderTarget=b,!We.__hasExternalTextures){const ue=Math.max(1,b.width>>j),Te=Math.max(1,b.height>>j);Q===o.TEXTURE_3D||Q===o.TEXTURE_2D_ARRAY?n.texImage3D(Q,j,de,ue,Te,b.depth,0,ye,ae,null):n.texImage2D(Q,j,de,ue,Te,0,ye,ae,null)}n.bindFramebuffer(o.FRAMEBUFFER,T),He(b)?l.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,Y,Q,ee.__webglTexture,0,ze(b)):(Q===o.TEXTURE_2D||Q>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,Y,Q,ee.__webglTexture,j),n.bindFramebuffer(o.FRAMEBUFFER,null)}function oe(T,b,B){if(o.bindRenderbuffer(o.RENDERBUFFER,T),b.depthBuffer){const Y=b.depthTexture,Q=Y&&Y.isDepthTexture?Y.type:null,j=x(b.stencilBuffer,Q),ye=b.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,ae=ze(b);He(b)?l.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,ae,j,b.width,b.height):B?o.renderbufferStorageMultisample(o.RENDERBUFFER,ae,j,b.width,b.height):o.renderbufferStorage(o.RENDERBUFFER,j,b.width,b.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,ye,o.RENDERBUFFER,T)}else{const Y=b.textures;for(let Q=0;Q<Y.length;Q++){const j=Y[Q],ye=r.convert(j.format,j.colorSpace),ae=r.convert(j.type),de=w(j.internalFormat,ye,ae,j.colorSpace),We=ze(b);B&&He(b)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,We,de,b.width,b.height):He(b)?l.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,We,de,b.width,b.height):o.renderbufferStorage(o.RENDERBUFFER,de,b.width,b.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function Me(T,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(o.FRAMEBUFFER,T),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=i.get(b.depthTexture);Y.__renderTarget=b,(!Y.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),q(b.depthTexture,0);const Q=Y.__webglTexture,j=ze(b);if(b.depthTexture.format===Di)He(b)?l.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,Q,0,j):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,Q,0);else if(b.depthTexture.format===Vi)He(b)?l.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,Q,0,j):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function $e(T){const b=i.get(T),B=T.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==T.depthTexture){const Y=T.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),Y){const Q=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,Y.removeEventListener("dispose",Q)};Y.addEventListener("dispose",Q),b.__depthDisposeCallback=Q}b.__boundDepthTexture=Y}if(T.depthTexture&&!b.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Me(b.__webglFramebuffer,T)}else if(B){b.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(n.bindFramebuffer(o.FRAMEBUFFER,b.__webglFramebuffer[Y]),b.__webglDepthbuffer[Y]===void 0)b.__webglDepthbuffer[Y]=o.createRenderbuffer(),oe(b.__webglDepthbuffer[Y],T,!1);else{const Q=T.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,j=b.__webglDepthbuffer[Y];o.bindRenderbuffer(o.RENDERBUFFER,j),o.framebufferRenderbuffer(o.FRAMEBUFFER,Q,o.RENDERBUFFER,j)}}else if(n.bindFramebuffer(o.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=o.createRenderbuffer(),oe(b.__webglDepthbuffer,T,!1);else{const Y=T.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Q=b.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,Q),o.framebufferRenderbuffer(o.FRAMEBUFFER,Y,o.RENDERBUFFER,Q)}n.bindFramebuffer(o.FRAMEBUFFER,null)}function Ae(T,b,B){const Y=i.get(T);b!==void 0&&ge(Y.__webglFramebuffer,T,T.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),B!==void 0&&$e(T)}function lt(T){const b=T.texture,B=i.get(T),Y=i.get(b);T.addEventListener("dispose",A);const Q=T.textures,j=T.isWebGLCubeRenderTarget===!0,ye=Q.length>1;if(ye||(Y.__webglTexture===void 0&&(Y.__webglTexture=o.createTexture()),Y.__version=b.version,a.memory.textures++),j){B.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(b.mipmaps&&b.mipmaps.length>0){B.__webglFramebuffer[ae]=[];for(let de=0;de<b.mipmaps.length;de++)B.__webglFramebuffer[ae][de]=o.createFramebuffer()}else B.__webglFramebuffer[ae]=o.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){B.__webglFramebuffer=[];for(let ae=0;ae<b.mipmaps.length;ae++)B.__webglFramebuffer[ae]=o.createFramebuffer()}else B.__webglFramebuffer=o.createFramebuffer();if(ye)for(let ae=0,de=Q.length;ae<de;ae++){const We=i.get(Q[ae]);We.__webglTexture===void 0&&(We.__webglTexture=o.createTexture(),a.memory.textures++)}if(T.samples>0&&He(T)===!1){B.__webglMultisampledFramebuffer=o.createFramebuffer(),B.__webglColorRenderbuffer=[],n.bindFramebuffer(o.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ae=0;ae<Q.length;ae++){const de=Q[ae];B.__webglColorRenderbuffer[ae]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,B.__webglColorRenderbuffer[ae]);const We=r.convert(de.format,de.colorSpace),ee=r.convert(de.type),ue=w(de.internalFormat,We,ee,de.colorSpace,T.isXRRenderTarget===!0),Te=ze(T);o.renderbufferStorageMultisample(o.RENDERBUFFER,Te,ue,T.width,T.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+ae,o.RENDERBUFFER,B.__webglColorRenderbuffer[ae])}o.bindRenderbuffer(o.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=o.createRenderbuffer(),oe(B.__webglDepthRenderbuffer,T,!0)),n.bindFramebuffer(o.FRAMEBUFFER,null)}}if(j){n.bindTexture(o.TEXTURE_CUBE_MAP,Y.__webglTexture),we(o.TEXTURE_CUBE_MAP,b);for(let ae=0;ae<6;ae++)if(b.mipmaps&&b.mipmaps.length>0)for(let de=0;de<b.mipmaps.length;de++)ge(B.__webglFramebuffer[ae][de],T,b,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+ae,de);else ge(B.__webglFramebuffer[ae],T,b,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);g(b)&&f(o.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ye){for(let ae=0,de=Q.length;ae<de;ae++){const We=Q[ae],ee=i.get(We);n.bindTexture(o.TEXTURE_2D,ee.__webglTexture),we(o.TEXTURE_2D,We),ge(B.__webglFramebuffer,T,We,o.COLOR_ATTACHMENT0+ae,o.TEXTURE_2D,0),g(We)&&f(o.TEXTURE_2D)}n.unbindTexture()}else{let ae=o.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ae=T.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),n.bindTexture(ae,Y.__webglTexture),we(ae,b),b.mipmaps&&b.mipmaps.length>0)for(let de=0;de<b.mipmaps.length;de++)ge(B.__webglFramebuffer[de],T,b,o.COLOR_ATTACHMENT0,ae,de);else ge(B.__webglFramebuffer,T,b,o.COLOR_ATTACHMENT0,ae,0);g(b)&&f(ae),n.unbindTexture()}T.depthBuffer&&$e(T)}function rt(T){const b=T.textures;for(let B=0,Y=b.length;B<Y;B++){const Q=b[B];if(g(Q)){const j=S(T),ye=i.get(Q).__webglTexture;n.bindTexture(j,ye),f(j),n.unbindTexture()}}}const ke=[],L=[];function It(T){if(T.samples>0){if(He(T)===!1){const b=T.textures,B=T.width,Y=T.height;let Q=o.COLOR_BUFFER_BIT;const j=T.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,ye=i.get(T),ae=b.length>1;if(ae)for(let de=0;de<b.length;de++)n.bindFramebuffer(o.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+de,o.RENDERBUFFER,null),n.bindFramebuffer(o.FRAMEBUFFER,ye.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+de,o.TEXTURE_2D,null,0);n.bindFramebuffer(o.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.bindFramebuffer(o.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let de=0;de<b.length;de++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=o.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=o.STENCIL_BUFFER_BIT)),ae){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,ye.__webglColorRenderbuffer[de]);const We=i.get(b[de]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,We,0)}o.blitFramebuffer(0,0,B,Y,0,0,B,Y,Q,o.NEAREST),h===!0&&(ke.length=0,L.length=0,ke.push(o.COLOR_ATTACHMENT0+de),T.depthBuffer&&T.resolveDepthBuffer===!1&&(ke.push(j),L.push(j),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,L)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,ke))}if(n.bindFramebuffer(o.READ_FRAMEBUFFER,null),n.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),ae)for(let de=0;de<b.length;de++){n.bindFramebuffer(o.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+de,o.RENDERBUFFER,ye.__webglColorRenderbuffer[de]);const We=i.get(b[de]).__webglTexture;n.bindFramebuffer(o.FRAMEBUFFER,ye.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+de,o.TEXTURE_2D,We,0)}n.bindFramebuffer(o.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&h){const b=T.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[b])}}}function ze(T){return Math.min(s.maxSamples,T.samples)}function He(T){const b=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function be(T){const b=a.render.frame;d.get(T)!==b&&(d.set(T,b),T.update())}function nt(T,b){const B=T.colorSpace,Y=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==wt&&B!==Hn&&(qe.getTransfer(B)===it?(Y!==en||Q!==In)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),b}function ve(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=z,this.setTexture2D=q,this.setTexture2DArray=G,this.setTexture3D=Z,this.setTextureCube=W,this.rebindTextures=Ae,this.setupRenderTarget=lt,this.updateRenderTargetMipmap=rt,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=$e,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=He}function p0(o,e){function n(i,s=Hn){let r;const a=qe.getTransfer(s);if(i===In)return o.UNSIGNED_BYTE;if(i===ua)return o.UNSIGNED_SHORT_4_4_4_4;if(i===pa)return o.UNSIGNED_SHORT_5_5_5_1;if(i===_c)return o.UNSIGNED_INT_5_9_9_9_REV;if(i===mc)return o.BYTE;if(i===gc)return o.SHORT;if(i===vs)return o.UNSIGNED_SHORT;if(i===da)return o.INT;if(i===li)return o.UNSIGNED_INT;if(i===Vt)return o.FLOAT;if(i===Tn)return o.HALF_FLOAT;if(i===yc)return o.ALPHA;if(i===xc)return o.RGB;if(i===en)return o.RGBA;if(i===vc)return o.LUMINANCE;if(i===bc)return o.LUMINANCE_ALPHA;if(i===Di)return o.DEPTH_COMPONENT;if(i===Vi)return o.DEPTH_STENCIL;if(i===fa)return o.RED;if(i===ma)return o.RED_INTEGER;if(i===Sc)return o.RG;if(i===ga)return o.RG_INTEGER;if(i===_a)return o.RGBA_INTEGER;if(i===hr||i===dr||i===ur||i===pr)if(a===it)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===hr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===hr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ur)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===pr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Co||i===Ro||i===Po||i===Io)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Co)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ro)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Po)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Io)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Lo||i===Do||i===Fo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Lo||i===Do)return a===it?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Fo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Uo||i===No||i===Oo||i===Bo||i===ko||i===zo||i===Ho||i===Vo||i===Go||i===Wo||i===$o||i===qo||i===Xo||i===jo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Uo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===No)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Oo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Bo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ko)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===zo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ho)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Vo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Go)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Wo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===$o)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===qo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Xo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===jo)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===fr||i===Yo||i===Ko)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===fr)return a===it?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Yo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ko)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Mc||i===Zo||i===Qo||i===Jo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===fr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Zo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Qo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Jo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Hi?o.UNSIGNED_INT_24_8:o[i]!==void 0?o[i]:null}return{convert:n}}const f0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,m0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class g0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const s=new yt,r=e.properties.get(s);r.__webglTexture=n.texture,(n.depthNear!==i.depthNear||n.depthFar!==i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Wn({vertexShader:f0,fragmentShader:m0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Gt(new As(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class _0 extends $n{constructor(e,n){super();const i=this;let s=null,r=1,a=null,l="local-floor",h=1,c=null,d=null,u=null,p=null,m=null,y=null;const _=new g0,g=n.getContextAttributes();let f=null,S=null;const w=[],x=[],P=new Ce;let I=null;const A=new Ut;A.viewport=new Ke;const C=new Ut;C.viewport=new Ke;const E=[A,C],v=new vu;let R=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let te=w[X];return te===void 0&&(te=new Qr,w[X]=te),te.getTargetRaySpace()},this.getControllerGrip=function(X){let te=w[X];return te===void 0&&(te=new Qr,w[X]=te),te.getGripSpace()},this.getHand=function(X){let te=w[X];return te===void 0&&(te=new Qr,w[X]=te),te.getHandSpace()};function O(X){const te=x.indexOf(X.inputSource);if(te===-1)return;const ge=w[te];ge!==void 0&&(ge.update(X.inputSource,X.frame,c||a),ge.dispatchEvent({type:X.type,data:X.inputSource}))}function V(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",q);for(let X=0;X<w.length;X++){const te=x[X];te!==null&&(x[X]=null,w[X].disconnect(te))}R=null,z=null,_.reset(),e.setRenderTarget(f),m=null,p=null,u=null,s=null,S=null,Ne.stop(),i.isPresenting=!1,e.setPixelRatio(I),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){l=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return u},this.getFrame=function(){return y},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(f=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",V),s.addEventListener("inputsourceschange",q),g.xrCompatible!==!0&&await n.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(P),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let ge=null,oe=null,Me=null;g.depth&&(Me=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ge=g.stencil?Vi:Di,oe=g.stencil?Hi:li);const $e={colorFormat:n.RGBA8,depthFormat:Me,scaleFactor:r};u=new XRWebGLBinding(s,n),p=u.createProjectionLayer($e),s.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),S=new ci(p.textureWidth,p.textureHeight,{format:en,type:In,depthTexture:new kc(p.textureWidth,p.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const ge={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,n,ge),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new ci(m.framebufferWidth,m.framebufferHeight,{format:en,type:In,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(h),c=null,a=await s.requestReferenceSpace(l),Ne.setContext(s),Ne.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function q(X){for(let te=0;te<X.removed.length;te++){const ge=X.removed[te],oe=x.indexOf(ge);oe>=0&&(x[oe]=null,w[oe].disconnect(ge))}for(let te=0;te<X.added.length;te++){const ge=X.added[te];let oe=x.indexOf(ge);if(oe===-1){for(let $e=0;$e<w.length;$e++)if($e>=x.length){x.push(ge),oe=$e;break}else if(x[$e]===null){x[$e]=ge,oe=$e;break}if(oe===-1)break}const Me=w[oe];Me&&Me.connect(ge)}}const G=new D,Z=new D;function W(X,te,ge){G.setFromMatrixPosition(te.matrixWorld),Z.setFromMatrixPosition(ge.matrixWorld);const oe=G.distanceTo(Z),Me=te.projectionMatrix.elements,$e=ge.projectionMatrix.elements,Ae=Me[14]/(Me[10]-1),lt=Me[14]/(Me[10]+1),rt=(Me[9]+1)/Me[5],ke=(Me[9]-1)/Me[5],L=(Me[8]-1)/Me[0],It=($e[8]+1)/$e[0],ze=Ae*L,He=Ae*It,be=oe/(-L+It),nt=be*-L;if(te.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(nt),X.translateZ(be),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Me[10]===-1)X.projectionMatrix.copy(te.projectionMatrix),X.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const ve=Ae+be,T=lt+be,b=ze-nt,B=He+(oe-nt),Y=rt*lt/T*ve,Q=ke*lt/T*ve;X.projectionMatrix.makePerspective(b,B,Y,Q,ve,T),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function ne(X,te){te===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(te.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let te=X.near,ge=X.far;_.texture!==null&&(_.depthNear>0&&(te=_.depthNear),_.depthFar>0&&(ge=_.depthFar)),v.near=C.near=A.near=te,v.far=C.far=A.far=ge,(R!==v.near||z!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),R=v.near,z=v.far),A.layers.mask=X.layers.mask|2,C.layers.mask=X.layers.mask|4,v.layers.mask=A.layers.mask|C.layers.mask;const oe=X.parent,Me=v.cameras;ne(v,oe);for(let $e=0;$e<Me.length;$e++)ne(Me[$e],oe);Me.length===2?W(v,A,C):v.projectionMatrix.copy(A.projectionMatrix),ie(X,v,oe)};function ie(X,te,ge){ge===null?X.matrix.copy(te.matrixWorld):(X.matrix.copy(ge.matrixWorld),X.matrix.invert(),X.matrix.multiply(te.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(te.projectionMatrix),X.projectionMatrixInverse.copy(te.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Gi*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(p===null&&m===null))return h},this.setFoveation=function(X){h=X,p!==null&&(p.fixedFoveation=X),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=X)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let xe=null;function we(X,te){if(d=te.getViewerPose(c||a),y=te,d!==null){const ge=d.views;m!==null&&(e.setRenderTargetFramebuffer(S,m.framebuffer),e.setRenderTarget(S));let oe=!1;ge.length!==v.cameras.length&&(v.cameras.length=0,oe=!0);for(let Ae=0;Ae<ge.length;Ae++){const lt=ge[Ae];let rt=null;if(m!==null)rt=m.getViewport(lt);else{const L=u.getViewSubImage(p,lt);rt=L.viewport,Ae===0&&(e.setRenderTargetTextures(S,L.colorTexture,p.ignoreDepthValues?void 0:L.depthStencilTexture),e.setRenderTarget(S))}let ke=E[Ae];ke===void 0&&(ke=new Ut,ke.layers.enable(Ae),ke.viewport=new Ke,E[Ae]=ke),ke.matrix.fromArray(lt.transform.matrix),ke.matrix.decompose(ke.position,ke.quaternion,ke.scale),ke.projectionMatrix.fromArray(lt.projectionMatrix),ke.projectionMatrixInverse.copy(ke.projectionMatrix).invert(),ke.viewport.set(rt.x,rt.y,rt.width,rt.height),Ae===0&&(v.matrix.copy(ke.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),oe===!0&&v.cameras.push(ke)}const Me=s.enabledFeatures;if(Me&&Me.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&u){const Ae=u.getDepthInformation(ge[0]);Ae&&Ae.isValid&&Ae.texture&&_.init(e,Ae,s.renderState)}}for(let ge=0;ge<w.length;ge++){const oe=x[ge],Me=w[ge];oe!==null&&Me!==void 0&&Me.update(oe,te,c||a)}xe&&xe(X,te),te.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:te}),y=null}const Ne=new qc;Ne.setAnimationLoop(we),this.setAnimationLoop=function(X){xe=X},this.dispose=function(){}}}const ei=new fn,y0=new Fe;function x0(o,e){function n(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function i(g,f){f.color.getRGB(g.fogColor.value,Dc(o)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function s(g,f,S,w,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(g,f):f.isMeshToonMaterial?(r(g,f),u(g,f)):f.isMeshPhongMaterial?(r(g,f),d(g,f)):f.isMeshStandardMaterial?(r(g,f),p(g,f),f.isMeshPhysicalMaterial&&m(g,f,x)):f.isMeshMatcapMaterial?(r(g,f),y(g,f)):f.isMeshDepthMaterial?r(g,f):f.isMeshDistanceMaterial?(r(g,f),_(g,f)):f.isMeshNormalMaterial?r(g,f):f.isLineBasicMaterial?(a(g,f),f.isLineDashedMaterial&&l(g,f)):f.isPointsMaterial?h(g,f,S,w):f.isSpriteMaterial?c(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,n(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,n(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,n(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===Rt&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,n(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===Rt&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,n(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,n(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);const S=e.get(f),w=S.envMap,x=S.envMapRotation;w&&(g.envMap.value=w,ei.copy(x),ei.x*=-1,ei.y*=-1,ei.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(ei.y*=-1,ei.z*=-1),g.envMapRotation.value.setFromMatrix4(y0.makeRotationFromEuler(ei)),g.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity,n(f.lightMap,g.lightMapTransform)),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,g.aoMapTransform))}function a(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,n(f.map,g.mapTransform))}function l(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function h(g,f,S,w){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*S,g.scale.value=w*.5,f.map&&(g.map.value=f.map,n(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,n(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function c(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,n(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,n(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function d(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function u(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function p(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,g.roughnessMapTransform)),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function m(g,f,S){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Rt&&g.clearcoatNormalScale.value.negate())),f.dispersion>0&&(g.dispersion.value=f.dispersion),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(g.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(g.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,g.specularIntensityMapTransform))}function y(g,f){f.matcap&&(g.matcap.value=f.matcap)}function _(g,f){const S=e.get(f).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function v0(o,e,n,i){let s={},r={},a=[];const l=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function h(S,w){const x=w.program;i.uniformBlockBinding(S,x)}function c(S,w){let x=s[S.id];x===void 0&&(y(S),x=d(S),s[S.id]=x,S.addEventListener("dispose",g));const P=w.program;i.updateUBOMapping(S,P);const I=e.render.frame;r[S.id]!==I&&(p(S),r[S.id]=I)}function d(S){const w=u();S.__bindingPointIndex=w;const x=o.createBuffer(),P=S.__size,I=S.usage;return o.bindBuffer(o.UNIFORM_BUFFER,x),o.bufferData(o.UNIFORM_BUFFER,P,I),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,w,x),x}function u(){for(let S=0;S<l;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(S){const w=s[S.id],x=S.uniforms,P=S.__cache;o.bindBuffer(o.UNIFORM_BUFFER,w);for(let I=0,A=x.length;I<A;I++){const C=Array.isArray(x[I])?x[I]:[x[I]];for(let E=0,v=C.length;E<v;E++){const R=C[E];if(m(R,I,E,P)===!0){const z=R.__offset,O=Array.isArray(R.value)?R.value:[R.value];let V=0;for(let q=0;q<O.length;q++){const G=O[q],Z=_(G);typeof G=="number"||typeof G=="boolean"?(R.__data[0]=G,o.bufferSubData(o.UNIFORM_BUFFER,z+V,R.__data)):G.isMatrix3?(R.__data[0]=G.elements[0],R.__data[1]=G.elements[1],R.__data[2]=G.elements[2],R.__data[3]=0,R.__data[4]=G.elements[3],R.__data[5]=G.elements[4],R.__data[6]=G.elements[5],R.__data[7]=0,R.__data[8]=G.elements[6],R.__data[9]=G.elements[7],R.__data[10]=G.elements[8],R.__data[11]=0):(G.toArray(R.__data,V),V+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,z,R.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function m(S,w,x,P){const I=S.value,A=w+"_"+x;if(P[A]===void 0)return typeof I=="number"||typeof I=="boolean"?P[A]=I:P[A]=I.clone(),!0;{const C=P[A];if(typeof I=="number"||typeof I=="boolean"){if(C!==I)return P[A]=I,!0}else if(C.equals(I)===!1)return C.copy(I),!0}return!1}function y(S){const w=S.uniforms;let x=0;const P=16;for(let A=0,C=w.length;A<C;A++){const E=Array.isArray(w[A])?w[A]:[w[A]];for(let v=0,R=E.length;v<R;v++){const z=E[v],O=Array.isArray(z.value)?z.value:[z.value];for(let V=0,q=O.length;V<q;V++){const G=O[V],Z=_(G),W=x%P,ne=W%Z.boundary,ie=W+ne;x+=ne,ie!==0&&P-ie<Z.storage&&(x+=P-ie),z.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=x,x+=Z.storage}}}const I=x%P;return I>0&&(x+=P-I),S.__size=x,S.__cache={},this}function _(S){const w={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(w.boundary=4,w.storage=4):S.isVector2?(w.boundary=8,w.storage=8):S.isVector3||S.isColor?(w.boundary=16,w.storage=12):S.isVector4?(w.boundary=16,w.storage=16):S.isMatrix3?(w.boundary=48,w.storage=48):S.isMatrix4?(w.boundary=64,w.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),w}function g(S){const w=S.target;w.removeEventListener("dispose",g);const x=a.indexOf(w.__bindingPointIndex);a.splice(x,1),o.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function f(){for(const S in s)o.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:h,update:c,dispose:f}}class Zc{constructor(e={}){const{canvas:n=dd(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:l=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const y=new Uint32Array(4),_=new Int32Array(4);let g=null,f=null;const S=[],w=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=_t,this.toneMapping=Gn,this.toneMappingExposure=1;const x=this;let P=!1,I=0,A=0,C=null,E=-1,v=null;const R=new Ke,z=new Ke;let O=null;const V=new _e(0);let q=0,G=n.width,Z=n.height,W=1,ne=null,ie=null;const xe=new Ke(0,0,G,Z),we=new Ke(0,0,G,Z);let Ne=!1;const X=new wa;let te=!1,ge=!1;this.transmissionResolutionScale=1;const oe=new Fe,Me=new Fe,$e=new D,Ae=new Ke,lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let rt=!1;function ke(){return C===null?W:1}let L=i;function It(M,U){return n.getContext(M,U)}try{const M={alpha:!0,depth:s,stencil:r,antialias:l,premultipliedAlpha:h,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${ha}`),n.addEventListener("webglcontextlost",K,!1),n.addEventListener("webglcontextrestored",ce,!1),n.addEventListener("webglcontextcreationerror",le,!1),L===null){const U="webgl2";if(L=It(U,M),L===null)throw It(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let ze,He,be,nt,ve,T,b,B,Y,Q,j,ye,ae,de,We,ee,ue,Te,Re,pe,Ve,De,et,F;function se(){ze=new Im(L),ze.init(),De=new p0(L,ze),He=new Em(L,ze,e,De),be=new d0(L,ze),He.reverseDepthBuffer&&p&&be.buffers.depth.setReversed(!0),nt=new Fm(L),ve=new Qg,T=new u0(L,ze,be,ve,He,De,nt),b=new Tm(x),B=new Pm(x),Y=new ku(L),et=new Sm(L,Y),Q=new Lm(L,Y,nt,et),j=new Nm(L,Q,Y,nt),Re=new Um(L,He,T),ee=new wm(ve),ye=new Zg(x,b,B,ze,He,et,ee),ae=new x0(x,ve),de=new e0,We=new o0(ze),Te=new bm(x,b,B,be,j,m,h),ue=new c0(x,j,He),F=new v0(L,nt,He,be),pe=new Mm(L,ze,nt),Ve=new Dm(L,ze,nt),nt.programs=ye.programs,x.capabilities=He,x.extensions=ze,x.properties=ve,x.renderLists=de,x.shadowMap=ue,x.state=be,x.info=nt}se();const $=new _0(x,L);this.xr=$,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const M=ze.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=ze.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(M){M!==void 0&&(W=M,this.setSize(G,Z,!1))},this.getSize=function(M){return M.set(G,Z)},this.setSize=function(M,U,k=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=M,Z=U,n.width=Math.floor(M*W),n.height=Math.floor(U*W),k===!0&&(n.style.width=M+"px",n.style.height=U+"px"),this.setViewport(0,0,M,U)},this.getDrawingBufferSize=function(M){return M.set(G*W,Z*W).floor()},this.setDrawingBufferSize=function(M,U,k){G=M,Z=U,W=k,n.width=Math.floor(M*k),n.height=Math.floor(U*k),this.setViewport(0,0,M,U)},this.getCurrentViewport=function(M){return M.copy(R)},this.getViewport=function(M){return M.copy(xe)},this.setViewport=function(M,U,k,H){M.isVector4?xe.set(M.x,M.y,M.z,M.w):xe.set(M,U,k,H),be.viewport(R.copy(xe).multiplyScalar(W).round())},this.getScissor=function(M){return M.copy(we)},this.setScissor=function(M,U,k,H){M.isVector4?we.set(M.x,M.y,M.z,M.w):we.set(M,U,k,H),be.scissor(z.copy(we).multiplyScalar(W).round())},this.getScissorTest=function(){return Ne},this.setScissorTest=function(M){be.setScissorTest(Ne=M)},this.setOpaqueSort=function(M){ne=M},this.setTransparentSort=function(M){ie=M},this.getClearColor=function(M){return M.copy(Te.getClearColor())},this.setClearColor=function(){Te.setClearColor(...arguments)},this.getClearAlpha=function(){return Te.getClearAlpha()},this.setClearAlpha=function(){Te.setClearAlpha(...arguments)},this.clear=function(M=!0,U=!0,k=!0){let H=0;if(M){let N=!1;if(C!==null){const J=C.texture.format;N=J===_a||J===ga||J===ma}if(N){const J=C.texture.type,he=J===In||J===li||J===vs||J===Hi||J===ua||J===pa,fe=Te.getClearColor(),me=Te.getClearAlpha(),Pe=fe.r,Le=fe.g,Se=fe.b;he?(y[0]=Pe,y[1]=Le,y[2]=Se,y[3]=me,L.clearBufferuiv(L.COLOR,0,y)):(_[0]=Pe,_[1]=Le,_[2]=Se,_[3]=me,L.clearBufferiv(L.COLOR,0,_))}else H|=L.COLOR_BUFFER_BIT}U&&(H|=L.DEPTH_BUFFER_BIT),k&&(H|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",K,!1),n.removeEventListener("webglcontextrestored",ce,!1),n.removeEventListener("webglcontextcreationerror",le,!1),Te.dispose(),de.dispose(),We.dispose(),ve.dispose(),b.dispose(),B.dispose(),j.dispose(),et.dispose(),F.dispose(),ye.dispose(),$.dispose(),$.removeEventListener("sessionstart",Qi),$.removeEventListener("sessionend",Ji),hn.stop()};function K(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function ce(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const M=nt.autoReset,U=ue.enabled,k=ue.autoUpdate,H=ue.needsUpdate,N=ue.type;se(),nt.autoReset=M,ue.enabled=U,ue.autoUpdate=k,ue.needsUpdate=H,ue.type=N}function le(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Ie(M){const U=M.target;U.removeEventListener("dispose",Ie),ot(U)}function ot(M){mt(M),ve.remove(M)}function mt(M){const U=ve.get(M).programs;U!==void 0&&(U.forEach(function(k){ye.releaseProgram(k)}),M.isShaderMaterial&&ye.releaseShaderCache(M))}this.renderBufferDirect=function(M,U,k,H,N,J){U===null&&(U=lt);const he=N.isMesh&&N.matrixWorld.determinant()<0,fe=Rs(M,U,k,H,N);be.setMaterial(H,he);let me=k.index,Pe=1;if(H.wireframe===!0){if(me=Q.getWireframeAttribute(k),me===void 0)return;Pe=2}const Le=k.drawRange,Se=k.attributes.position;let Xe=Le.start*Pe,Ze=(Le.start+Le.count)*Pe;J!==null&&(Xe=Math.max(Xe,J.start*Pe),Ze=Math.min(Ze,(J.start+J.count)*Pe)),me!==null?(Xe=Math.max(Xe,0),Ze=Math.min(Ze,me.count)):Se!=null&&(Xe=Math.max(Xe,0),Ze=Math.min(Ze,Se.count));const pt=Ze-Xe;if(pt<0||pt===1/0)return;et.setup(N,H,fe,k,me);let ut,Ye=pe;if(me!==null&&(ut=Y.get(me),Ye=Ve,Ye.setIndex(ut)),N.isMesh)H.wireframe===!0?(be.setLineWidth(H.wireframeLinewidth*ke()),Ye.setMode(L.LINES)):Ye.setMode(L.TRIANGLES);else if(N.isLine){let Ee=H.linewidth;Ee===void 0&&(Ee=1),be.setLineWidth(Ee*ke()),N.isLineSegments?Ye.setMode(L.LINES):N.isLineLoop?Ye.setMode(L.LINE_LOOP):Ye.setMode(L.LINE_STRIP)}else N.isPoints?Ye.setMode(L.POINTS):N.isSprite&&Ye.setMode(L.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)ni("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ye.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(ze.get("WEBGL_multi_draw"))Ye.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Ee=N._multiDrawStarts,St=N._multiDrawCounts,Qe=N._multiDrawCount,tn=me?Y.get(me).bytesPerElement:1,ui=ve.get(H).currentProgram.getUniforms();for(let Wt=0;Wt<Qe;Wt++)ui.setValue(L,"_gl_DrawID",Wt),Ye.render(Ee[Wt]/tn,St[Wt])}else if(N.isInstancedMesh)Ye.renderInstances(Xe,pt,N.count);else if(k.isInstancedBufferGeometry){const Ee=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,St=Math.min(k.instanceCount,Ee);Ye.renderInstances(Xe,pt,St)}else Ye.render(Xe,pt)};function je(M,U,k){M.transparent===!0&&M.side===at&&M.forceSinglePass===!1?(M.side=Rt,M.needsUpdate=!0,Xn(M,U,k),M.side=Ct,M.needsUpdate=!0,Xn(M,U,k),M.side=at):Xn(M,U,k)}this.compile=function(M,U,k=null){k===null&&(k=M),f=We.get(k),f.init(U),w.push(f),k.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(f.pushLight(N),N.castShadow&&f.pushShadow(N))}),M!==k&&M.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(f.pushLight(N),N.castShadow&&f.pushShadow(N))}),f.setupLights();const H=new Set;return M.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const J=N.material;if(J)if(Array.isArray(J))for(let he=0;he<J.length;he++){const fe=J[he];je(fe,k,N),H.add(fe)}else je(J,k,N),H.add(J)}),f=w.pop(),H},this.compileAsync=function(M,U,k=null){const H=this.compile(M,U,k);return new Promise(N=>{function J(){if(H.forEach(function(he){ve.get(he).currentProgram.isReady()&&H.delete(he)}),H.size===0){N(M);return}setTimeout(J,10)}ze.get("KHR_parallel_shader_compile")!==null?J():setTimeout(J,10)})};let kt=null;function jt(M){kt&&kt(M)}function Qi(){hn.stop()}function Ji(){hn.start()}const hn=new qc;hn.setAnimationLoop(jt),typeof self<"u"&&hn.setContext(self),this.setAnimationLoop=function(M){kt=M,$.setAnimationLoop(M),M===null?hn.stop():hn.start()},$.addEventListener("sessionstart",Qi),$.addEventListener("sessionend",Ji),this.render=function(M,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(U),U=$.getCamera()),M.isScene===!0&&M.onBeforeRender(x,M,U,C),f=We.get(M,w.length),f.init(U),w.push(f),Me.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),X.setFromProjectionMatrix(Me),ge=this.localClippingEnabled,te=ee.init(this.clippingPlanes,ge),g=de.get(M,S.length),g.init(),S.push(g),$.enabled===!0&&$.isPresenting===!0){const J=x.xr.getDepthSensingMesh();J!==null&&di(J,U,-1/0,x.sortObjects)}di(M,U,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(ne,ie),rt=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,rt&&Te.addToRenderList(g,M),this.info.render.frame++,te===!0&&ee.beginShadows();const k=f.state.shadowsArray;ue.render(k,M,U),te===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=g.opaque,N=g.transmissive;if(f.setupLights(),U.isArrayCamera){const J=U.cameras;if(N.length>0)for(let he=0,fe=J.length;he<fe;he++){const me=J[he];ts(H,N,M,me)}rt&&Te.render(M);for(let he=0,fe=J.length;he<fe;he++){const me=J[he];es(g,M,me,me.viewport)}}else N.length>0&&ts(H,N,M,U),rt&&Te.render(M),es(g,M,U);C!==null&&A===0&&(T.updateMultisampleRenderTarget(C),T.updateRenderTargetMipmap(C)),M.isScene===!0&&M.onAfterRender(x,M,U),et.resetDefaultState(),E=-1,v=null,w.pop(),w.length>0?(f=w[w.length-1],te===!0&&ee.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,S.pop(),S.length>0?g=S[S.length-1]:g=null};function di(M,U,k,H){if(M.visible===!1)return;if(M.layers.test(U.layers)){if(M.isGroup)k=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(U);else if(M.isLight)f.pushLight(M),M.castShadow&&f.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||X.intersectsSprite(M)){H&&Ae.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Me);const he=j.update(M),fe=M.material;fe.visible&&g.push(M,he,fe,k,Ae.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||X.intersectsObject(M))){const he=j.update(M),fe=M.material;if(H&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ae.copy(M.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),Ae.copy(he.boundingSphere.center)),Ae.applyMatrix4(M.matrixWorld).applyMatrix4(Me)),Array.isArray(fe)){const me=he.groups;for(let Pe=0,Le=me.length;Pe<Le;Pe++){const Se=me[Pe],Xe=fe[Se.materialIndex];Xe&&Xe.visible&&g.push(M,he,Xe,k,Ae.z,Se)}}else fe.visible&&g.push(M,he,fe,k,Ae.z,null)}}const J=M.children;for(let he=0,fe=J.length;he<fe;he++)di(J[he],U,k,H)}function es(M,U,k,H){const N=M.opaque,J=M.transmissive,he=M.transparent;f.setupLightsView(k),te===!0&&ee.setGlobalState(x.clippingPlanes,k),H&&be.viewport(R.copy(H)),N.length>0&&qn(N,U,k),J.length>0&&qn(J,U,k),he.length>0&&qn(he,U,k),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function ts(M,U,k,H){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[H.id]===void 0&&(f.state.transmissionRenderTarget[H.id]=new ci(1,1,{generateMipmaps:!0,type:ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float")?Tn:In,minFilter:un,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));const J=f.state.transmissionRenderTarget[H.id],he=H.viewport||R;J.setSize(he.z*x.transmissionResolutionScale,he.w*x.transmissionResolutionScale);const fe=x.getRenderTarget();x.setRenderTarget(J),x.getClearColor(V),q=x.getClearAlpha(),q<1&&x.setClearColor(16777215,.5),x.clear(),rt&&Te.render(k);const me=x.toneMapping;x.toneMapping=Gn;const Pe=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),f.setupLightsView(H),te===!0&&ee.setGlobalState(x.clippingPlanes,H),qn(M,k,H),T.updateMultisampleRenderTarget(J),T.updateRenderTargetMipmap(J),ze.has("WEBGL_multisampled_render_to_texture")===!1){let Le=!1;for(let Se=0,Xe=U.length;Se<Xe;Se++){const Ze=U[Se],pt=Ze.object,ut=Ze.geometry,Ye=Ze.material,Ee=Ze.group;if(Ye.side===at&&pt.layers.test(H.layers)){const St=Ye.side;Ye.side=Rt,Ye.needsUpdate=!0,ns(pt,k,H,ut,Ye,Ee),Ye.side=St,Ye.needsUpdate=!0,Le=!0}}Le===!0&&(T.updateMultisampleRenderTarget(J),T.updateRenderTargetMipmap(J))}x.setRenderTarget(fe),x.setClearColor(V,q),Pe!==void 0&&(H.viewport=Pe),x.toneMapping=me}function qn(M,U,k){const H=U.isScene===!0?U.overrideMaterial:null;for(let N=0,J=M.length;N<J;N++){const he=M[N],fe=he.object,me=he.geometry,Pe=H===null?he.material:H,Le=he.group;fe.layers.test(k.layers)&&ns(fe,U,k,me,Pe,Le)}}function ns(M,U,k,H,N,J){M.onBeforeRender(x,U,k,H,N,J),M.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),N.onBeforeRender(x,U,k,H,M,J),N.transparent===!0&&N.side===at&&N.forceSinglePass===!1?(N.side=Rt,N.needsUpdate=!0,x.renderBufferDirect(k,U,H,N,M,J),N.side=Ct,N.needsUpdate=!0,x.renderBufferDirect(k,U,H,N,M,J),N.side=at):x.renderBufferDirect(k,U,H,N,M,J),M.onAfterRender(x,U,k,H,N,J)}function Xn(M,U,k){U.isScene!==!0&&(U=lt);const H=ve.get(M),N=f.state.lights,J=f.state.shadowsArray,he=N.state.version,fe=ye.getParameters(M,N.state,J,U,k),me=ye.getProgramCacheKey(fe);let Pe=H.programs;H.environment=M.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(M.isMeshStandardMaterial?B:b).get(M.envMap||H.environment),H.envMapRotation=H.environment!==null&&M.envMap===null?U.environmentRotation:M.envMapRotation,Pe===void 0&&(M.addEventListener("dispose",Ie),Pe=new Map,H.programs=Pe);let Le=Pe.get(me);if(Le!==void 0){if(H.currentProgram===Le&&H.lightsStateVersion===he)return ss(M,fe),Le}else fe.uniforms=ye.getUniforms(M),M.onBeforeCompile(fe,x),Le=ye.acquireProgram(fe,me),Pe.set(me,Le),H.uniforms=fe.uniforms;const Se=H.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Se.clippingPlanes=ee.uniform),ss(M,fe),H.needsLights=nh(M),H.lightsStateVersion=he,H.needsLights&&(Se.ambientLightColor.value=N.state.ambient,Se.lightProbe.value=N.state.probe,Se.directionalLights.value=N.state.directional,Se.directionalLightShadows.value=N.state.directionalShadow,Se.spotLights.value=N.state.spot,Se.spotLightShadows.value=N.state.spotShadow,Se.rectAreaLights.value=N.state.rectArea,Se.ltc_1.value=N.state.rectAreaLTC1,Se.ltc_2.value=N.state.rectAreaLTC2,Se.pointLights.value=N.state.point,Se.pointLightShadows.value=N.state.pointShadow,Se.hemisphereLights.value=N.state.hemi,Se.directionalShadowMap.value=N.state.directionalShadowMap,Se.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Se.spotShadowMap.value=N.state.spotShadowMap,Se.spotLightMatrix.value=N.state.spotLightMatrix,Se.spotLightMap.value=N.state.spotLightMap,Se.pointShadowMap.value=N.state.pointShadowMap,Se.pointShadowMatrix.value=N.state.pointShadowMatrix),H.currentProgram=Le,H.uniformsList=null,Le}function is(M){if(M.uniformsList===null){const U=M.currentProgram.getUniforms();M.uniformsList=mr.seqWithValue(U.seq,M.uniforms)}return M.uniformsList}function ss(M,U){const k=ve.get(M);k.outputColorSpace=U.outputColorSpace,k.batching=U.batching,k.batchingColor=U.batchingColor,k.instancing=U.instancing,k.instancingColor=U.instancingColor,k.instancingMorph=U.instancingMorph,k.skinning=U.skinning,k.morphTargets=U.morphTargets,k.morphNormals=U.morphNormals,k.morphColors=U.morphColors,k.morphTargetsCount=U.morphTargetsCount,k.numClippingPlanes=U.numClippingPlanes,k.numIntersection=U.numClipIntersection,k.vertexAlphas=U.vertexAlphas,k.vertexTangents=U.vertexTangents,k.toneMapping=U.toneMapping}function Rs(M,U,k,H,N){U.isScene!==!0&&(U=lt),T.resetTextureUnits();const J=U.fog,he=H.isMeshStandardMaterial?U.environment:null,fe=C===null?x.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:wt,me=(H.isMeshStandardMaterial?B:b).get(H.envMap||he),Pe=H.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Le=!!k.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Se=!!k.morphAttributes.position,Xe=!!k.morphAttributes.normal,Ze=!!k.morphAttributes.color;let pt=Gn;H.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(pt=x.toneMapping);const ut=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Ye=ut!==void 0?ut.length:0,Ee=ve.get(H),St=f.state.lights;if(te===!0&&(ge===!0||M!==v)){const Lt=M===v&&H.id===E;ee.setState(H,M,Lt)}let Qe=!1;H.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==St.state.version||Ee.outputColorSpace!==fe||N.isBatchedMesh&&Ee.batching===!1||!N.isBatchedMesh&&Ee.batching===!0||N.isBatchedMesh&&Ee.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Ee.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Ee.instancing===!1||!N.isInstancedMesh&&Ee.instancing===!0||N.isSkinnedMesh&&Ee.skinning===!1||!N.isSkinnedMesh&&Ee.skinning===!0||N.isInstancedMesh&&Ee.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Ee.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Ee.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Ee.instancingMorph===!1&&N.morphTexture!==null||Ee.envMap!==me||H.fog===!0&&Ee.fog!==J||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==ee.numPlanes||Ee.numIntersection!==ee.numIntersection)||Ee.vertexAlphas!==Pe||Ee.vertexTangents!==Le||Ee.morphTargets!==Se||Ee.morphNormals!==Xe||Ee.morphColors!==Ze||Ee.toneMapping!==pt||Ee.morphTargetsCount!==Ye)&&(Qe=!0):(Qe=!0,Ee.__version=H.version);let tn=Ee.currentProgram;Qe===!0&&(tn=Xn(H,U,N));let ui=!1,Wt=!1,rs=!1;const ct=tn.getUniforms(),Yt=Ee.uniforms;if(be.useProgram(tn.program)&&(ui=!0,Wt=!0,rs=!0),H.id!==E&&(E=H.id,Wt=!0),ui||v!==M){be.buffers.depth.getReversed()?(oe.copy(M.projectionMatrix),pd(oe),fd(oe),ct.setValue(L,"projectionMatrix",oe)):ct.setValue(L,"projectionMatrix",M.projectionMatrix),ct.setValue(L,"viewMatrix",M.matrixWorldInverse);const zt=ct.map.cameraPosition;zt!==void 0&&zt.setValue(L,$e.setFromMatrixPosition(M.matrixWorld)),He.logarithmicDepthBuffer&&ct.setValue(L,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ct.setValue(L,"isOrthographic",M.isOrthographicCamera===!0),v!==M&&(v=M,Wt=!0,rs=!0)}if(N.isSkinnedMesh){ct.setOptional(L,N,"bindMatrix"),ct.setOptional(L,N,"bindMatrixInverse");const Lt=N.skeleton;Lt&&(Lt.boneTexture===null&&Lt.computeBoneTexture(),ct.setValue(L,"boneTexture",Lt.boneTexture,T))}N.isBatchedMesh&&(ct.setOptional(L,N,"batchingTexture"),ct.setValue(L,"batchingTexture",N._matricesTexture,T),ct.setOptional(L,N,"batchingIdTexture"),ct.setValue(L,"batchingIdTexture",N._indirectTexture,T),ct.setOptional(L,N,"batchingColorTexture"),N._colorsTexture!==null&&ct.setValue(L,"batchingColorTexture",N._colorsTexture,T));const Kt=k.morphAttributes;if((Kt.position!==void 0||Kt.normal!==void 0||Kt.color!==void 0)&&Re.update(N,k,tn),(Wt||Ee.receiveShadow!==N.receiveShadow)&&(Ee.receiveShadow=N.receiveShadow,ct.setValue(L,"receiveShadow",N.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Yt.envMap.value=me,Yt.flipEnvMap.value=me.isCubeTexture&&me.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&U.environment!==null&&(Yt.envMapIntensity.value=U.environmentIntensity),Wt&&(ct.setValue(L,"toneMappingExposure",x.toneMappingExposure),Ee.needsLights&&th(Yt,rs),J&&H.fog===!0&&ae.refreshFogUniforms(Yt,J),ae.refreshMaterialUniforms(Yt,H,W,Z,f.state.transmissionRenderTarget[M.id]),mr.upload(L,is(Ee),Yt,T)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(mr.upload(L,is(Ee),Yt,T),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ct.setValue(L,"center",N.center),ct.setValue(L,"modelViewMatrix",N.modelViewMatrix),ct.setValue(L,"normalMatrix",N.normalMatrix),ct.setValue(L,"modelMatrix",N.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Lt=H.uniformsGroups;for(let zt=0,Ir=Lt.length;zt<Ir;zt++){const jn=Lt[zt];F.update(jn,tn),F.bind(jn,tn)}}return tn}function th(M,U){M.ambientLightColor.needsUpdate=U,M.lightProbe.needsUpdate=U,M.directionalLights.needsUpdate=U,M.directionalLightShadows.needsUpdate=U,M.pointLights.needsUpdate=U,M.pointLightShadows.needsUpdate=U,M.spotLights.needsUpdate=U,M.spotLightShadows.needsUpdate=U,M.rectAreaLights.needsUpdate=U,M.hemisphereLights.needsUpdate=U}function nh(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(M,U,k){ve.get(M.texture).__webglTexture=U,ve.get(M.depthTexture).__webglTexture=k;const H=ve.get(M);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=k===void 0,H.__autoAllocateDepthBuffer||ze.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(M,U){const k=ve.get(M);k.__webglFramebuffer=U,k.__useDefaultFramebuffer=U===void 0};const ih=L.createFramebuffer();this.setRenderTarget=function(M,U=0,k=0){C=M,I=U,A=k;let H=!0,N=null,J=!1,he=!1;if(M){const me=ve.get(M);if(me.__useDefaultFramebuffer!==void 0)be.bindFramebuffer(L.FRAMEBUFFER,null),H=!1;else if(me.__webglFramebuffer===void 0)T.setupRenderTarget(M);else if(me.__hasExternalTextures)T.rebindTextures(M,ve.get(M.texture).__webglTexture,ve.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Se=M.depthTexture;if(me.__boundDepthTexture!==Se){if(Se!==null&&ve.has(Se)&&(M.width!==Se.image.width||M.height!==Se.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(M)}}const Pe=M.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(he=!0);const Le=ve.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Le[U])?N=Le[U][k]:N=Le[U],J=!0):M.samples>0&&T.useMultisampledRTT(M)===!1?N=ve.get(M).__webglMultisampledFramebuffer:Array.isArray(Le)?N=Le[k]:N=Le,R.copy(M.viewport),z.copy(M.scissor),O=M.scissorTest}else R.copy(xe).multiplyScalar(W).floor(),z.copy(we).multiplyScalar(W).floor(),O=Ne;if(k!==0&&(N=ih),be.bindFramebuffer(L.FRAMEBUFFER,N)&&H&&be.drawBuffers(M,N),be.viewport(R),be.scissor(z),be.setScissorTest(O),J){const me=ve.get(M.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,me.__webglTexture,k)}else if(he){const me=ve.get(M.texture),Pe=U;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,me.__webglTexture,k,Pe)}else if(M!==null&&k!==0){const me=ve.get(M.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,me.__webglTexture,k)}E=-1},this.readRenderTargetPixels=function(M,U,k,H,N,J,he){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fe=ve.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&he!==void 0&&(fe=fe[he]),fe){be.bindFramebuffer(L.FRAMEBUFFER,fe);try{const me=M.texture,Pe=me.format,Le=me.type;if(!He.textureFormatReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!He.textureTypeReadable(Le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=M.width-H&&k>=0&&k<=M.height-N&&L.readPixels(U,k,H,N,De.convert(Pe),De.convert(Le),J)}finally{const me=C!==null?ve.get(C).__webglFramebuffer:null;be.bindFramebuffer(L.FRAMEBUFFER,me)}}},this.readRenderTargetPixelsAsync=async function(M,U,k,H,N,J,he){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let fe=ve.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&he!==void 0&&(fe=fe[he]),fe){const me=M.texture,Pe=me.format,Le=me.type;if(!He.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!He.textureTypeReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=M.width-H&&k>=0&&k<=M.height-N){be.bindFramebuffer(L.FRAMEBUFFER,fe);const Se=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Se),L.bufferData(L.PIXEL_PACK_BUFFER,J.byteLength,L.STREAM_READ),L.readPixels(U,k,H,N,De.convert(Pe),De.convert(Le),0);const Xe=C!==null?ve.get(C).__webglFramebuffer:null;be.bindFramebuffer(L.FRAMEBUFFER,Xe);const Ze=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await ud(L,Ze,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Se),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,J),L.deleteBuffer(Se),L.deleteSync(Ze),J}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(M,U=null,k=0){M.isTexture!==!0&&(ni("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,M=arguments[1]);const H=Math.pow(2,-k),N=Math.floor(M.image.width*H),J=Math.floor(M.image.height*H),he=U!==null?U.x:0,fe=U!==null?U.y:0;T.setTexture2D(M,0),L.copyTexSubImage2D(L.TEXTURE_2D,k,0,0,he,fe,N,J),be.unbindTexture()};const sh=L.createFramebuffer(),rh=L.createFramebuffer();this.copyTextureToTexture=function(M,U,k=null,H=null,N=0,J=null){M.isTexture!==!0&&(ni("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,M=arguments[1],U=arguments[2],J=arguments[3]||0,k=null),J===null&&(N!==0?(ni("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),J=N,N=0):J=0);let he,fe,me,Pe,Le,Se,Xe,Ze,pt;const ut=M.isCompressedTexture?M.mipmaps[J]:M.image;if(k!==null)he=k.max.x-k.min.x,fe=k.max.y-k.min.y,me=k.isBox3?k.max.z-k.min.z:1,Pe=k.min.x,Le=k.min.y,Se=k.isBox3?k.min.z:0;else{const Kt=Math.pow(2,-N);he=Math.floor(ut.width*Kt),fe=Math.floor(ut.height*Kt),M.isDataArrayTexture?me=ut.depth:M.isData3DTexture?me=Math.floor(ut.depth*Kt):me=1,Pe=0,Le=0,Se=0}H!==null?(Xe=H.x,Ze=H.y,pt=H.z):(Xe=0,Ze=0,pt=0);const Ye=De.convert(U.format),Ee=De.convert(U.type);let St;U.isData3DTexture?(T.setTexture3D(U,0),St=L.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(T.setTexture2DArray(U,0),St=L.TEXTURE_2D_ARRAY):(T.setTexture2D(U,0),St=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);const Qe=L.getParameter(L.UNPACK_ROW_LENGTH),tn=L.getParameter(L.UNPACK_IMAGE_HEIGHT),ui=L.getParameter(L.UNPACK_SKIP_PIXELS),Wt=L.getParameter(L.UNPACK_SKIP_ROWS),rs=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,ut.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ut.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Pe),L.pixelStorei(L.UNPACK_SKIP_ROWS,Le),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Se);const ct=M.isDataArrayTexture||M.isData3DTexture,Yt=U.isDataArrayTexture||U.isData3DTexture;if(M.isDepthTexture){const Kt=ve.get(M),Lt=ve.get(U),zt=ve.get(Kt.__renderTarget),Ir=ve.get(Lt.__renderTarget);be.bindFramebuffer(L.READ_FRAMEBUFFER,zt.__webglFramebuffer),be.bindFramebuffer(L.DRAW_FRAMEBUFFER,Ir.__webglFramebuffer);for(let jn=0;jn<me;jn++)ct&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ve.get(M).__webglTexture,N,Se+jn),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ve.get(U).__webglTexture,J,pt+jn)),L.blitFramebuffer(Pe,Le,he,fe,Xe,Ze,he,fe,L.DEPTH_BUFFER_BIT,L.NEAREST);be.bindFramebuffer(L.READ_FRAMEBUFFER,null),be.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(N!==0||M.isRenderTargetTexture||ve.has(M)){const Kt=ve.get(M),Lt=ve.get(U);be.bindFramebuffer(L.READ_FRAMEBUFFER,sh),be.bindFramebuffer(L.DRAW_FRAMEBUFFER,rh);for(let zt=0;zt<me;zt++)ct?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Kt.__webglTexture,N,Se+zt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Kt.__webglTexture,N),Yt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Lt.__webglTexture,J,pt+zt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Lt.__webglTexture,J),N!==0?L.blitFramebuffer(Pe,Le,he,fe,Xe,Ze,he,fe,L.COLOR_BUFFER_BIT,L.NEAREST):Yt?L.copyTexSubImage3D(St,J,Xe,Ze,pt+zt,Pe,Le,he,fe):L.copyTexSubImage2D(St,J,Xe,Ze,Pe,Le,he,fe);be.bindFramebuffer(L.READ_FRAMEBUFFER,null),be.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Yt?M.isDataTexture||M.isData3DTexture?L.texSubImage3D(St,J,Xe,Ze,pt,he,fe,me,Ye,Ee,ut.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(St,J,Xe,Ze,pt,he,fe,me,Ye,ut.data):L.texSubImage3D(St,J,Xe,Ze,pt,he,fe,me,Ye,Ee,ut):M.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,J,Xe,Ze,he,fe,Ye,Ee,ut.data):M.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,J,Xe,Ze,ut.width,ut.height,Ye,ut.data):L.texSubImage2D(L.TEXTURE_2D,J,Xe,Ze,he,fe,Ye,Ee,ut);L.pixelStorei(L.UNPACK_ROW_LENGTH,Qe),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,tn),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ui),L.pixelStorei(L.UNPACK_SKIP_ROWS,Wt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,rs),J===0&&U.generateMipmaps&&L.generateMipmap(St),be.unbindTexture()},this.copyTextureToTexture3D=function(M,U,k=null,H=null,N=0){return M.isTexture!==!0&&(ni("WebGLRenderer: copyTextureToTexture3D function signature has changed."),k=arguments[0]||null,H=arguments[1]||null,M=arguments[2],U=arguments[3],N=arguments[4]||0),ni('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(M,U,k,H,N)},this.initRenderTarget=function(M){ve.get(M).__webglFramebuffer===void 0&&T.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?T.setTextureCube(M,0):M.isData3DTexture?T.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?T.setTexture2DArray(M,0):T.setTexture2D(M,0),be.unbindTexture()},this.resetState=function(){I=0,A=0,C=null,be.reset(),et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return An}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorspace=qe._getDrawingBufferColorSpace(e),n.unpackColorSpace=qe._getUnpackColorSpace()}}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class pn{constructor(e,n,i,s,r="div"){this.parent=e,this.object=n,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(r),this.domElement.classList.add("controller"),this.domElement.classList.add(s),this.$name=document.createElement("div"),this.$name.classList.add("name"),pn.nextNameID=pn.nextNameID||0,this.$name.id=`lil-gui-name-${++pn.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",a=>a.stopPropagation()),this.domElement.addEventListener("keyup",a=>a.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const n=this.parent.add(this.object,this.property,e);return n.name(this._name),this.destroy(),n}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class b0 extends pn{constructor(e,n,i){super(e,n,i,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function aa(o){let e,n;return(e=o.match(/(#|0x)?([a-f0-9]{6})/i))?n=e[2]:(e=o.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?n=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=o.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(n=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),n?"#"+n:!1}const S0={isPrimitive:!0,match:o=>typeof o=="string",fromHexString:aa,toHexString:aa},ws={isPrimitive:!0,match:o=>typeof o=="number",fromHexString:o=>parseInt(o.substring(1),16),toHexString:o=>"#"+o.toString(16).padStart(6,0)},M0={isPrimitive:!1,match:o=>Array.isArray(o),fromHexString(o,e,n=1){const i=ws.fromHexString(o);e[0]=(i>>16&255)/255*n,e[1]=(i>>8&255)/255*n,e[2]=(i&255)/255*n},toHexString([o,e,n],i=1){i=255/i;const s=o*i<<16^e*i<<8^n*i<<0;return ws.toHexString(s)}},E0={isPrimitive:!1,match:o=>Object(o)===o,fromHexString(o,e,n=1){const i=ws.fromHexString(o);e.r=(i>>16&255)/255*n,e.g=(i>>8&255)/255*n,e.b=(i&255)/255*n},toHexString({r:o,g:e,b:n},i=1){i=255/i;const s=o*i<<16^e*i<<8^n*i<<0;return ws.toHexString(s)}},w0=[S0,ws,M0,E0];function T0(o){return w0.find(e=>e.match(o))}class A0 extends pn{constructor(e,n,i,s){super(e,n,i,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=T0(this.initialValue),this._rgbScale=s,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const r=aa(this.$text.value);r&&this._setValueFromHexString(r)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const n=this._format.fromHexString(e);this.setValue(n)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class uo extends pn{constructor(e,n,i){super(e,n,i,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",s=>{s.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class C0 extends pn{constructor(e,n,i,s,r,a){super(e,n,i,"number"),this._initInput(),this.min(s),this.max(r);const l=a!==void 0;this.step(l?a:this._getImplicitStep(),l),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,n=!0){return this._step=e,this._stepExplicit=n,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let n=(e-this._min)/(this._max-this._min);n=Math.max(0,Math.min(n,1)),this.$fill.style.width=n*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const n=()=>{let S=parseFloat(this.$input.value);isNaN(S)||(this._stepExplicit&&(S=this._snap(S)),this.setValue(this._clamp(S)))},i=S=>{const w=parseFloat(this.$input.value);isNaN(w)||(this._snapClampSetValue(w+S),this.$input.value=this.getValue())},s=S=>{S.key==="Enter"&&this.$input.blur(),S.code==="ArrowUp"&&(S.preventDefault(),i(this._step*this._arrowKeyMultiplier(S))),S.code==="ArrowDown"&&(S.preventDefault(),i(this._step*this._arrowKeyMultiplier(S)*-1))},r=S=>{this._inputFocused&&(S.preventDefault(),i(this._step*this._normalizeMouseWheel(S)))};let a=!1,l,h,c,d,u;const p=5,m=S=>{l=S.clientX,h=c=S.clientY,a=!0,d=this.getValue(),u=0,window.addEventListener("mousemove",y),window.addEventListener("mouseup",_)},y=S=>{if(a){const w=S.clientX-l,x=S.clientY-h;Math.abs(x)>p?(S.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(w)>p&&_()}if(!a){const w=S.clientY-c;u-=w*this._step*this._arrowKeyMultiplier(S),d+u>this._max?u=this._max-d:d+u<this._min&&(u=this._min-d),this._snapClampSetValue(d+u)}c=S.clientY},_=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",y),window.removeEventListener("mouseup",_)},g=()=>{this._inputFocused=!0},f=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",n),this.$input.addEventListener("keydown",s),this.$input.addEventListener("wheel",r,{passive:!1}),this.$input.addEventListener("mousedown",m),this.$input.addEventListener("focus",g),this.$input.addEventListener("blur",f)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(f,S,w,x,P)=>(f-S)/(w-S)*(P-x)+x,n=f=>{const S=this.$slider.getBoundingClientRect();let w=e(f,S.left,S.right,this._min,this._max);this._snapClampSetValue(w)},i=f=>{this._setDraggingStyle(!0),n(f.clientX),window.addEventListener("mousemove",s),window.addEventListener("mouseup",r)},s=f=>{n(f.clientX)},r=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",r)};let a=!1,l,h;const c=f=>{f.preventDefault(),this._setDraggingStyle(!0),n(f.touches[0].clientX),a=!1},d=f=>{f.touches.length>1||(this._hasScrollBar?(l=f.touches[0].clientX,h=f.touches[0].clientY,a=!0):c(f),window.addEventListener("touchmove",u,{passive:!1}),window.addEventListener("touchend",p))},u=f=>{if(a){const S=f.touches[0].clientX-l,w=f.touches[0].clientY-h;Math.abs(S)>Math.abs(w)?c(f):(window.removeEventListener("touchmove",u),window.removeEventListener("touchend",p))}else f.preventDefault(),n(f.touches[0].clientX)},p=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",u),window.removeEventListener("touchend",p)},m=this._callOnFinishChange.bind(this),y=400;let _;const g=f=>{if(Math.abs(f.deltaX)<Math.abs(f.deltaY)&&this._hasScrollBar)return;f.preventDefault();const w=this._normalizeMouseWheel(f)*this._step;this._snapClampSetValue(this.getValue()+w),this.$input.value=this.getValue(),clearTimeout(_),_=setTimeout(m,y)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",d,{passive:!1}),this.$slider.addEventListener("wheel",g,{passive:!1})}_setDraggingStyle(e,n="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${n}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:n,deltaY:i}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(n=0,i=-e.wheelDelta/120,i*=this._stepExplicit?1:10),n+-i}_arrowKeyMultiplier(e){let n=this._stepExplicit?1:10;return e.shiftKey?n*=10:e.altKey&&(n/=10),n}_snap(e){let n=0;return this._hasMin?n=this._min:this._hasMax&&(n=this._max),e-=n,e=Math.round(e/this._step)*this._step,e+=n,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class R0 extends pn{constructor(e,n,i,s){super(e,n,i,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(s)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(n=>{const i=document.createElement("option");i.textContent=n,this.$select.appendChild(i)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),n=this._values.indexOf(e);return this.$select.selectedIndex=n,this.$display.textContent=n===-1?e:this._names[n],this}}class P0 extends pn{constructor(e,n,i){super(e,n,i,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",s=>{s.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var I0=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function L0(o){const e=document.createElement("style");e.innerHTML=o;const n=document.querySelector("head link[rel=stylesheet], head style");n?document.head.insertBefore(e,n):document.head.appendChild(e)}let ec=!1;class Ua{constructor({parent:e,autoPlace:n=e===void 0,container:i,width:s,title:r="Controls",closeFolders:a=!1,injectStyles:l=!0,touchStyles:h=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),h&&this.domElement.classList.add("allow-touch-styles"),!ec&&l&&(L0(I0),ec=!0),i?i.appendChild(this.domElement):n&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),s&&this.domElement.style.setProperty("--width",s+"px"),this._closeFolders=a}add(e,n,i,s,r){if(Object(i)===i)return new R0(this,e,n,i);const a=e[n];switch(typeof a){case"number":return new C0(this,e,n,i,s,r);case"boolean":return new b0(this,e,n);case"string":return new P0(this,e,n);case"function":return new uo(this,e,n)}console.error(`gui.add failed
	property:`,n,`
	object:`,e,`
	value:`,a)}addColor(e,n,i=1){return new A0(this,e,n,i)}addFolder(e){const n=new Ua({parent:this,title:e});return this.root._closeFolders&&n.close(),n}load(e,n=!0){return e.controllers&&this.controllers.forEach(i=>{i instanceof uo||i._name in e.controllers&&i.load(e.controllers[i._name])}),n&&e.folders&&this.folders.forEach(i=>{i._title in e.folders&&i.load(e.folders[i._title])}),this}save(e=!0){const n={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof uo)){if(i._name in n.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);n.controllers[i._name]=i.save()}}),e&&this.folders.forEach(i=>{if(i._title in n.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);n.folders[i._title]=i.save()}),n}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const n=this.$children.clientHeight;this.$children.style.height=n+"px",this.domElement.classList.add("transition");const i=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const s=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=s+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(n=>{e=e.concat(n.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(n=>{e=e.concat(n.foldersRecursive())}),e}}class D0{constructor(){this.scene=new Vd,this.canvas=null,this.bgTexture=null,this.init()}init(){if(this.canvas=document.querySelector("canvas.webgl"),!this.canvas){console.error('Canvas element with class "webgl" not found');return}}updateGradientBackground(e){const s=document.createElement("canvas");s.width=2,s.height=2048;const r=s.getContext("2d"),a=r.createLinearGradient(0,0,0,2048);a.addColorStop(0,e.gradientTop),a.addColorStop(1,e.gradientBottom),r.fillStyle=a,r.globalAlpha=e.gradientAlpha,r.fillRect(0,0,2,2048),this.bgTexture=new Aa(s),this.bgTexture.minFilter=ht,this.bgTexture.magFilter=ht,this.bgTexture.colorSpace=wt,this.scene.background=this.bgTexture,this.scene._originalBackgroundTexture=this.bgTexture}getScene(){return this.scene}getCanvas(){return this.canvas}dispose(){this.bgTexture&&this.bgTexture.dispose()}}const tc={type:"change"},Na={type:"start"},Qc={type:"end"},rr=new ji,nc=new zn,F0=Math.cos(70*Ac.DEG2RAD),gt=new D,Ht=2*Math.PI,st={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},po=1e-6;class U0 extends Ou{constructor(e,n=null){super(e,n),this.state=st.NONE,this.enabled=!0,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Rn.ROTATE,MIDDLE:Rn.DOLLY,RIGHT:Rn.PAN},this.touches={ONE:Ri.ROTATE,TWO:Ri.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new D,this._lastQuaternion=new Xt,this._lastTargetPosition=new D,this._quat=new Xt().setFromUnitVectors(e.up,new D(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Tl,this._sphericalDelta=new Tl,this._scale=1,this._panOffset=new D,this._rotateStart=new Ce,this._rotateEnd=new Ce,this._rotateDelta=new Ce,this._panStart=new Ce,this._panEnd=new Ce,this._panDelta=new Ce,this._dollyStart=new Ce,this._dollyEnd=new Ce,this._dollyDelta=new Ce,this._dollyDirection=new D,this._mouse=new Ce,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=O0.bind(this),this._onPointerDown=N0.bind(this),this._onPointerUp=B0.bind(this),this._onContextMenu=$0.bind(this),this._onMouseWheel=H0.bind(this),this._onKeyDown=V0.bind(this),this._onTouchStart=G0.bind(this),this._onTouchMove=W0.bind(this),this._onMouseDown=k0.bind(this),this._onMouseMove=z0.bind(this),this._interceptControlDown=q0.bind(this),this._interceptControlUp=X0.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(tc),this.update(),this.state=st.NONE}update(e=null){const n=this.object.position;gt.copy(n).sub(this.target),gt.applyQuaternion(this._quat),this._spherical.setFromVector3(gt),this.autoRotate&&this.state===st.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Ht:i>Math.PI&&(i-=Ht),s<-Math.PI?s+=Ht:s>Math.PI&&(s-=Ht),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(gt.setFromSpherical(this._spherical),gt.applyQuaternion(this._quatInverse),n.copy(this.target).add(gt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const l=gt.length();a=this._clampDistance(l*this._scale);const h=l-a;this.object.position.addScaledVector(this._dollyDirection,h),this.object.updateMatrixWorld(),r=!!h}else if(this.object.isOrthographicCamera){const l=new D(this._mouse.x,this._mouse.y,0);l.unproject(this.object);const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=h!==this.object.zoom;const c=new D(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(l),this.object.updateMatrixWorld(),a=gt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(rr.origin.copy(this.object.position),rr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(rr.direction))<F0?this.object.lookAt(this.target):(nc.setFromNormalAndCoplanarPoint(this.object.up,this.target),rr.intersectPlane(nc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>po||8*(1-this._lastQuaternion.dot(this.object.quaternion))>po||this._lastTargetPosition.distanceToSquared(this.target)>po?(this.dispatchEvent(tc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Ht/60*this.autoRotateSpeed*e:Ht/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){gt.setFromMatrixColumn(n,0),gt.multiplyScalar(-e),this._panOffset.add(gt)}_panUp(e,n){this.screenSpacePanning===!0?gt.setFromMatrixColumn(n,1):(gt.setFromMatrixColumn(n,0),gt.crossVectors(this.object.up,gt)),gt.multiplyScalar(e),this._panOffset.add(gt)}_pan(e,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;gt.copy(s).sub(this.target);let r=gt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*n*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=n-i.top,a=i.width,l=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/l)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Ht*this._rotateDelta.x/n.clientHeight),this._rotateUp(Ht*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),s=.5*(e.pageY+n.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),s=.5*(e.pageY+n.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,s=e.pageY-n.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Ht*this._rotateDelta.x/n.clientHeight),this._rotateUp(Ht*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),s=.5*(e.pageY+n.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,s=e.pageY-n.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+n.x)*.5,l=(e.pageY+n.y)*.5;this._updateZoomParameters(a,l)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new Ce,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function N0(o){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(o.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(o)&&(this._addPointer(o),o.pointerType==="touch"?this._onTouchStart(o):this._onMouseDown(o)))}function O0(o){this.enabled!==!1&&(o.pointerType==="touch"?this._onTouchMove(o):this._onMouseMove(o))}function B0(o){switch(this._removePointer(o),this._pointers.length){case 0:this.domElement.releasePointerCapture(o.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Qc),this.state=st.NONE;break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function k0(o){let e;switch(o.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Rn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(o),this.state=st.DOLLY;break;case Rn.ROTATE:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=st.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=st.ROTATE}break;case Rn.PAN:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=st.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=st.PAN}break;default:this.state=st.NONE}this.state!==st.NONE&&this.dispatchEvent(Na)}function z0(o){switch(this.state){case st.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(o);break;case st.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(o);break;case st.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(o);break}}function H0(o){this.enabled===!1||this.enableZoom===!1||this.state!==st.NONE||(o.preventDefault(),this.dispatchEvent(Na),this._handleMouseWheel(this._customWheelEvent(o)),this.dispatchEvent(Qc))}function V0(o){this.enabled!==!1&&this._handleKeyDown(o)}function G0(o){switch(this._trackPointer(o),this._pointers.length){case 1:switch(this.touches.ONE){case Ri.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(o),this.state=st.TOUCH_ROTATE;break;case Ri.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(o),this.state=st.TOUCH_PAN;break;default:this.state=st.NONE}break;case 2:switch(this.touches.TWO){case Ri.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(o),this.state=st.TOUCH_DOLLY_PAN;break;case Ri.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(o),this.state=st.TOUCH_DOLLY_ROTATE;break;default:this.state=st.NONE}break;default:this.state=st.NONE}this.state!==st.NONE&&this.dispatchEvent(Na)}function W0(o){switch(this._trackPointer(o),this.state){case st.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(o),this.update();break;case st.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(o),this.update();break;case st.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(o),this.update();break;case st.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(o),this.update();break;default:this.state=st.NONE}}function $0(o){this.enabled!==!1&&o.preventDefault()}function q0(o){o.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function X0(o){o.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class j0{constructor(e,n){this.canvas=e,this.sizes=n,this.camera=null,this.controls=null,this.raycaster=new $c,this.mouse=new Ce,this.scene=null,this.clickableMeshes=[],this.targetLerpActive=!1,this.targetLerpStart=null,this.targetLerpFrom=new D,this.targetLerpTo=new D,this.targetLerpDuration=.3,this.cameraResetActive=!1,this.cameraResetStart=null,this.cameraResetDuration=.8,this.positionLerpFrom=new D,this.positionLerpTo=new D,this.rotationLerpFrom={x:0,y:0,z:0},this.rotationLerpTo={x:0,y:0,z:0},this.originalTarget=new D(-.018058106108908126,.34892644576978554,.08865572603297185),this.zoomVelocity=0,this.zoomMomentum=0,this.lastScrollTime=0,this.zoomDecay=.96,this.zoomMomentumThreshold=.015,this.momentumActive=!1,this.originalPosition=new D(-.9767395667747095,.6513489013452174,-.5290562260411343),this.originalRotation={x:-2.6863117716033176,y:-.9484795935271679,z:-2.7629820926703275},this.axisHelper=null,this.axisHelperVisible=!1,this.axisHelperSize=.5,this.init(),this.setupEventListeners()}init(){this.camera=new Ut(50,this.sizes.width/this.sizes.height,.1,100);const e=window.innerWidth<=768,n=1.8;e?(this.camera.fov=60,this.camera.updateProjectionMatrix(),this.camera.position.set(-.9767395667747095*n,.6513489013452174*n,-.5290562260411343*n),this.originalPosition=new D(-.9767395667747095*n,.6513489013452174*n,-.5290562260411343*n),console.log("[FlexFrame Camera] Mobile mode: zoomed out with FOV 60, factor:",n)):this.camera.position.set(-.9767395667747095,.6513489013452174,-.5290562260411343),this.camera.rotation.set(-2.6863117716033176,-.9484795935271679,-2.7629820926703275,"XYZ"),this.controls=new U0(this.camera,this.canvas),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.zoomSpeed=.9,this.controls.minDistance=.146,this.controls.maxDistance=19,this.controls.mouseButtons={LEFT:Rn.ROTATE,MIDDLE:Rn.PAN,RIGHT:Rn.PAN},this.controls.target.set(-.018058106108908126,.34892644576978554,.08865572603297185),this.controls.update()}setupEventListeners(){let e=null;this.controls.addEventListener("change",()=>{e&&clearTimeout(e),e=setTimeout(()=>{},2e3)}),this.canvas.addEventListener("dblclick",n=>{this.handleDoubleClick(n)}),window.addEventListener("keydown",n=>{n.code==="Space"&&!n.repeat&&(n.preventDefault(),this.resetCamera())}),this.canvas.addEventListener("wheel",n=>{this.trackZoomMomentum(n)},{passive:!0}),window.addEventListener("resize",()=>{this.handleResize()})}handleDoubleClick(e){if(!this.scene||this.clickableMeshes.length===0){console.warn("Scene or clickable meshes not available for rotation center");return}const n=this.canvas.getBoundingClientRect();this.mouse.x=(e.clientX-n.left)/n.width*2-1,this.mouse.y=-((e.clientY-n.top)/n.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const i=this.raycaster.intersectObjects(this.clickableMeshes,!0);if(i.length>0){const s=i[0].point;console.log("New rotation center set at:",s);const r=this.controls.dampingFactor;this.controls.dampingFactor=.15,this.targetLerpFrom.copy(this.controls.target),this.targetLerpTo.copy(s),this.targetLerpStart=performance.now(),this.targetLerpActive=!0,setTimeout(()=>{this.controls.dampingFactor=r},this.targetLerpDuration*1e3+100),this.axisHelperVisible&&setTimeout(()=>{this.updateAxisHelper()},this.targetLerpDuration*1e3+150)}}resetCamera(){console.log("Resetting camera with smooth animation to default state"),this.zoomMomentum=0,this.momentumActive=!1,this.targetLerpActive=!1;const e=this.controls.dampingFactor;this.controls.dampingFactor=.2,this.positionLerpFrom.copy(this.camera.position),this.positionLerpTo.copy(this.originalPosition),this.rotationLerpFrom.x=this.camera.rotation.x,this.rotationLerpFrom.y=this.camera.rotation.y,this.rotationLerpFrom.z=this.camera.rotation.z,this.rotationLerpTo.x=this.originalRotation.x,this.rotationLerpTo.y=this.originalRotation.y,this.rotationLerpTo.z=this.originalRotation.z,this.targetLerpFrom.copy(this.controls.target),this.targetLerpTo.copy(this.originalTarget),this.cameraResetActive=!0,this.targetLerpActive=!0,this.cameraResetStart=performance.now(),this.targetLerpStart=performance.now(),setTimeout(()=>{this.controls.dampingFactor=e},this.cameraResetDuration*1e3+100),console.log("Camera smooth reset animation started")}createAxisHelper(){this.axisHelper&&this.scene.remove(this.axisHelper),this.axisHelper=new Nu(this.axisHelperSize),this.axisHelper.position.copy(this.controls.target),this.scene.add(this.axisHelper),console.log("Axis helper created at:",this.controls.target)}updateAxisHelper(){this.axisHelper&&this.axisHelperVisible&&this.axisHelper.position.copy(this.controls.target)}toggleAxisHelper(e){this.axisHelperVisible=e,e&&!this.axisHelper&&this.createAxisHelper(),this.axisHelper&&(this.axisHelper.visible=e,this.updateAxisHelper())}setAxisHelperSize(e){this.axisHelperSize=e,this.axisHelper&&this.createAxisHelper()}getRotationCenter(){return{x:this.controls.target.x,y:this.controls.target.y,z:this.controls.target.z}}setRotationCenter(e,n,i){this.controls.target.set(e,n,i),this.controls.update(),this.updateAxisHelper(),console.log("Rotation center set to:",e,n,i)}setRotationCenterX(e){this.controls.target.x=e,this.controls.update(),this.updateAxisHelper()}setRotationCenterY(e){this.controls.target.y=e,this.controls.update(),this.updateAxisHelper()}setRotationCenterZ(e){this.controls.target.z=e,this.controls.update(),this.updateAxisHelper()}copyCoordinatesToClipboard(){const e=this.getRotationCenter(),n=`x: ${e.x.toFixed(6)}, y: ${e.y.toFixed(6)}, z: ${e.z.toFixed(6)}`;navigator.clipboard.writeText(n).then(()=>{console.log("Coordinates copied to clipboard:",n)}).catch(i=>{console.error("Failed to copy coordinates:",i),console.log("Coordinates (manual copy):",n)})}setFOV(e){this.camera.fov=e,this.camera.updateProjectionMatrix(),console.log("FOV set to:",e)}getFOV(){return this.camera.fov}copyCameraSettingsToClipboard(){const e={position:this.camera.position.toArray(),rotation:[this.camera.rotation.x,this.camera.rotation.y,this.camera.rotation.z],target:this.controls.target.toArray(),fov:this.camera.fov,zoom:{minDistance:this.controls.minDistance,maxDistance:this.controls.maxDistance,zoomSpeed:this.controls.zoomSpeed}},n=JSON.stringify(e,null,2);navigator.clipboard.writeText(n).then(()=>{console.log("Camera settings copied to clipboard:",e)}).catch(i=>{console.error("Failed to copy camera settings:",i),console.log("Camera settings (manual copy):",n)})}copyAllSettingsToClipboard(e){const n=e.gatherAllSettings(),i=JSON.stringify(n,null,2);navigator.clipboard.writeText(i).then(()=>{console.log("All GUI settings copied to clipboard:",n)}).catch(s=>{console.error("Failed to copy all settings:",s),console.log("All settings (manual copy):",i)})}handleResize(){this.camera.aspect=this.sizes.width/this.sizes.height,this.camera.updateProjectionMatrix()}updateTargetLerp(){if(this.targetLerpActive){const n=(performance.now()-this.targetLerpStart)/1e3;let i=Math.min(n/this.targetLerpDuration,1);i<.5?i=4*i*i*i:i=1-Math.pow(-2*i+2,3)/2,this.controls.target.lerpVectors(this.targetLerpFrom,this.targetLerpTo,i),this.controls.update(),n/this.targetLerpDuration>=1&&(this.controls.target.copy(this.targetLerpTo),this.controls.update(),this.targetLerpActive=!1)}}updateCameraReset(){if(this.cameraResetActive){const n=(performance.now()-this.cameraResetStart)/1e3;let i=Math.min(n/this.cameraResetDuration,1);i<.5?i=4*i*i*i:i=1-Math.pow(-2*i+2,3)/2,this.camera.position.lerpVectors(this.positionLerpFrom,this.positionLerpTo,i),this.camera.rotation.x=this.rotationLerpFrom.x+(this.rotationLerpTo.x-this.rotationLerpFrom.x)*i,this.camera.rotation.y=this.rotationLerpFrom.y+(this.rotationLerpTo.y-this.rotationLerpFrom.y)*i,this.camera.rotation.z=this.rotationLerpFrom.z+(this.rotationLerpTo.z-this.rotationLerpFrom.z)*i,n/this.cameraResetDuration>=1&&(this.camera.position.copy(this.positionLerpTo),this.camera.rotation.set(this.rotationLerpTo.x,this.rotationLerpTo.y,this.rotationLerpTo.z,"XYZ"),this.cameraResetActive=!1,console.log("Camera reset animation complete"))}}update(){this.updateTargetLerp(),this.updateCameraReset(),this.updateZoomMomentum(),this.updateAxisHelper(),this.controls.update()}trackZoomMomentum(e){const n=performance.now(),i=Math.max(n-this.lastScrollTime,1),s=e.deltaY>0?1:-1,r=this.velocityMultiplier||1,a=s*.1*r,l=Math.min(i/16,3);this.zoomVelocity=a*l,this.zoomMomentum=this.zoomVelocity,this.lastScrollTime=n}updateZoomMomentum(){if(Math.abs(this.zoomMomentum)>this.zoomMomentumThreshold){const e=this.camera.position.distanceTo(this.controls.target),n=this.zoomMomentum*Math.max(e*.05,.01),i=new D;i.subVectors(this.camera.position,this.controls.target).normalize();const s=e,r=s+n,a=Math.max(this.controls.minDistance,Math.min(this.controls.maxDistance,r));Math.abs(a-s)>.001&&this.camera.position.copy(this.controls.target).add(i.multiplyScalar(a)),this.zoomMomentum*=this.zoomDecay,this.controls.update()}else this.zoomMomentum!==0&&(this.zoomMomentum=0)}getCamera(){return this.camera}getControls(){return this.controls}setScene(e){this.scene=e}setClickableMeshes(e){this.clickableMeshes=e}applySettings(e){e.camera&&(e.camera.position&&this.camera.position.set(e.camera.position[0],e.camera.position[1],e.camera.position[2]),e.camera.rotation&&this.camera.rotation.set(e.camera.rotation[0],e.camera.rotation[1],e.camera.rotation[2]),e.camera.target&&this.controls.target.set(e.camera.target[0],e.camera.target[1],e.camera.target[2]),this.controls.update())}getSettings(){return{position:this.camera.position.toArray(),rotation:[this.camera.rotation.x,this.camera.rotation.y,this.camera.rotation.z],target:this.controls.target.toArray()}}updateOriginalState(e,n,i){e&&this.originalPosition.set(...e),n&&(this.originalRotation.x=n[0],this.originalRotation.y=n[1],this.originalRotation.z=n[2]),i&&this.originalTarget.set(...i),console.log("Updated original camera state for spacebar reset")}dispose(){this.axisHelper&&(this.scene.remove(this.axisHelper),this.axisHelper=null)}}class Y0 extends uu{constructor(e){super(e),this.type=Tn}parse(e){const a=function(C,E){switch(C){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(E||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(E||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(E||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(E||""))}},u=function(C,E,v){E=E||1024;let z=C.pos,O=-1,V=0,q="",G=String.fromCharCode.apply(null,new Uint16Array(C.subarray(z,z+128)));for(;0>(O=G.indexOf(`
`))&&V<E&&z<C.byteLength;)q+=G,V+=G.length,z+=128,G+=String.fromCharCode.apply(null,new Uint16Array(C.subarray(z,z+128)));return-1<O?(C.pos+=V+O+1,q+G.slice(0,O)):!1},p=function(C){const E=/^#\?(\S+)/,v=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,R=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,z=/^\s*FORMAT=(\S+)\s*$/,O=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,V={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let q,G;for((C.pos>=C.byteLength||!(q=u(C)))&&a(1,"no header found"),(G=q.match(E))||a(3,"bad initial token"),V.valid|=1,V.programtype=G[1],V.string+=q+`
`;q=u(C),q!==!1;){if(V.string+=q+`
`,q.charAt(0)==="#"){V.comments+=q+`
`;continue}if((G=q.match(v))&&(V.gamma=parseFloat(G[1])),(G=q.match(R))&&(V.exposure=parseFloat(G[1])),(G=q.match(z))&&(V.valid|=2,V.format=G[1]),(G=q.match(O))&&(V.valid|=4,V.height=parseInt(G[1],10),V.width=parseInt(G[2],10)),V.valid&2&&V.valid&4)break}return V.valid&2||a(3,"missing format specifier"),V.valid&4||a(3,"missing image size specifier"),V},m=function(C,E,v){const R=E;if(R<8||R>32767||C[0]!==2||C[1]!==2||C[2]&128)return new Uint8Array(C);R!==(C[2]<<8|C[3])&&a(3,"wrong scanline width");const z=new Uint8Array(4*E*v);z.length||a(4,"unable to allocate buffer space");let O=0,V=0;const q=4*R,G=new Uint8Array(4),Z=new Uint8Array(q);let W=v;for(;W>0&&V<C.byteLength;){V+4>C.byteLength&&a(1),G[0]=C[V++],G[1]=C[V++],G[2]=C[V++],G[3]=C[V++],(G[0]!=2||G[1]!=2||(G[2]<<8|G[3])!=R)&&a(3,"bad rgbe scanline format");let ne=0,ie;for(;ne<q&&V<C.byteLength;){ie=C[V++];const we=ie>128;if(we&&(ie-=128),(ie===0||ne+ie>q)&&a(3,"bad scanline data"),we){const Ne=C[V++];for(let X=0;X<ie;X++)Z[ne++]=Ne}else Z.set(C.subarray(V,V+ie),ne),ne+=ie,V+=ie}const xe=R;for(let we=0;we<xe;we++){let Ne=0;z[O]=Z[we+Ne],Ne+=R,z[O+1]=Z[we+Ne],Ne+=R,z[O+2]=Z[we+Ne],Ne+=R,z[O+3]=Z[we+Ne],O+=4}W--}return z},y=function(C,E,v,R){const z=C[E+3],O=Math.pow(2,z-128)/255;v[R+0]=C[E+0]*O,v[R+1]=C[E+1]*O,v[R+2]=C[E+2]*O,v[R+3]=1},_=function(C,E,v,R){const z=C[E+3],O=Math.pow(2,z-128)/255;v[R+0]=Bs.toHalfFloat(Math.min(C[E+0]*O,65504)),v[R+1]=Bs.toHalfFloat(Math.min(C[E+1]*O,65504)),v[R+2]=Bs.toHalfFloat(Math.min(C[E+2]*O,65504)),v[R+3]=Bs.toHalfFloat(1)},g=new Uint8Array(e);g.pos=0;const f=p(g),S=f.width,w=f.height,x=m(g.subarray(g.pos),S,w);let P,I,A;switch(this.type){case Vt:A=x.length/4;const C=new Float32Array(A*4);for(let v=0;v<A;v++)y(x,v*4,C,v*4);P=C,I=Vt;break;case Tn:A=x.length/4;const E=new Uint16Array(A*4);for(let v=0;v<A;v++)_(x,v*4,E,v*4);P=E,I=Tn;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:S,height:w,data:P,header:f.string,gamma:f.gamma,exposure:f.exposure,type:I}}setDataType(e){return this.type=e,this}load(e,n,i,s){function r(a,l){switch(a.type){case Vt:case Tn:a.colorSpace=wt,a.minFilter=ht,a.magFilter=ht,a.generateMipmaps=!1,a.flipY=!0;break}n&&n(a,l)}return super.load(e,r,i,s)}}class K0{constructor(e){this.scene=e,this.ambientLight=null,this.directionalLight=null,this.dirLightHelper=null,this.rgbeLoader=new Y0,this.init()}init(){this.setupAmbientLight(),this.setupDirectionalLight(),this.setupEnvironmentMap()}setupAmbientLight(){this.ambientLight=new yu(16777215,.4),this.scene.add(this.ambientLight)}setupDirectionalLight(){this.directionalLight=new Wc(16777215,1.43),this.directionalLight.position.set(1.35,1.57,.9),this.directionalLight.castShadow=!0,this.directionalLight.shadow.bias=0,this.directionalLight.shadow.radius=1,this.directionalLight.shadow.mapSize.width=1024,this.directionalLight.shadow.mapSize.height=1024,this.scene.add(this.directionalLight),this.dirLightHelper=new Uu(this.directionalLight,1.5,16711680),this.dirLightHelper.visible=!1,this.scene.add(this.dirLightHelper)}setupEnvironmentMap(){this.rgbeLoader.load(Ni("textures/environmentMap/2k.hdr"),e=>{e.mapping=xr,this.scene.environment=e})}applySettings(e){if(e.directionalLight){const n=e.directionalLight;this.directionalLight.intensity=n.intensity,this.directionalLight.color.set(n.color),n.position&&this.directionalLight.position.set(n.position.x,n.position.y,n.position.z),this.directionalLight.castShadow=n.castShadow,this.directionalLight.shadow.bias=n.shadowBias,this.directionalLight.shadow.radius=n.shadowBlur,this.directionalLight.shadow.mapSize.width=n.shadowMapWidth,this.directionalLight.shadow.mapSize.height=n.shadowMapHeight}e.ambientLight&&(this.ambientLight.intensity=e.ambientLight.intensity,this.ambientLight.color.set(e.ambientLight.color))}getSettings(){return{directionalLight:{intensity:this.directionalLight.intensity,color:"#"+this.directionalLight.color.getHexString(),castShadow:this.directionalLight.castShadow,shadowBias:this.directionalLight.shadow.bias,shadowBlur:this.directionalLight.shadow.radius,shadowMapWidth:this.directionalLight.shadow.mapSize.width,shadowMapHeight:this.directionalLight.shadow.mapSize.height,posX:this.directionalLight.position.x,posY:this.directionalLight.position.y,posZ:this.directionalLight.position.z,showHelper:this.dirLightHelper.visible,position:{x:this.directionalLight.position.x,y:this.directionalLight.position.y,z:this.directionalLight.position.z}},ambientLight:{intensity:this.ambientLight.intensity,color:"#"+this.ambientLight.color.getHexString()}}}getLights(){return{ambient:this.ambientLight,directional:this.directionalLight,directionalHelper:this.dirLightHelper}}}class Z0{constructor(e){this.scene=e,this.dustParticles=null,this.dustGeometry=null,this.dustMaterial=null,this.dustPositions=null,this.dustVelocities=null,this.dustSizes=null,this.params={count:1150,size:.0095,sizeRandomness:1.4,color:"#0d529c",opacity:1,speed:.5,horizontalRange:3,verticalRange:2,verticalOffset:1,visible:!0,blur:.31,depthBlur:!1,depthBlurStrength:.16,depthFocusDistance:2,depthFocusRange:1},this.init()}init(){this.createDustParticles()}createDustParticles(){var n,i;this.dustParticles&&(this.scene.remove(this.dustParticles),(n=this.dustGeometry)==null||n.dispose(),(i=this.dustMaterial)==null||i.dispose()),this.dustGeometry=new Bt,this.dustPositions=new Float32Array(this.params.count*3),this.dustVelocities=new Float32Array(this.params.count*3),this.dustSizes=new Float32Array(this.params.count);for(let s=0;s<this.params.count;s++){const r=s*3;this.dustPositions[r]=(Math.random()-.5)*this.params.horizontalRange*2,this.dustPositions[r+1]=Math.random()*this.params.verticalRange+this.params.verticalOffset,this.dustPositions[r+2]=(Math.random()-.5)*this.params.horizontalRange*2,this.dustVelocities[r]=(Math.random()-.5)*.001,this.dustVelocities[r+1]=(Math.random()-.5)*5e-4,this.dustVelocities[r+2]=(Math.random()-.5)*.001,this.dustSizes[s]=this.params.size*(1+(Math.random()-.5)*this.params.sizeRandomness)}this.dustGeometry.setAttribute("position",new Et(this.dustPositions,3)),this.dustGeometry.setAttribute("size",new Et(this.dustSizes,1));let e={color:this.params.color,size:this.params.size,transparent:!0,opacity:this.params.opacity,sizeAttenuation:!0,alphaTest:.01};this.params.blur>0&&(e.map=this.createBlurTexture(this.params.blur)),this.dustMaterial=new Ta(e),this.dustParticles=new Bc(this.dustGeometry,this.dustMaterial),this.dustParticles.visible=this.params.visible,this.scene.add(this.dustParticles)}createBlurTexture(e){const i=document.createElement("canvas");i.width=32,i.height=32;const s=i.getContext("2d"),r=32/2,a=32/2,l=32/2,h=s.createRadialGradient(r,a,0,r,a,l);h.addColorStop(0,`rgba(255, 255, 255, ${1-e})`),h.addColorStop(.5,`rgba(255, 255, 255, ${(1-e)*.5})`),h.addColorStop(1,"rgba(255, 255, 255, 0)"),s.fillStyle=h,s.fillRect(0,0,32,32);const c=new Aa(i);return c.needsUpdate=!0,c}update(e){if(!this.dustParticles||!this.params.visible)return;const n=this.dustGeometry.attributes.position.array,i=this.dustGeometry.attributes.size.array;for(let s=0;s<this.params.count;s++){const r=s*3;if(n[r]+=this.dustVelocities[r]*this.params.speed*e*1e3,n[r+1]+=this.dustVelocities[r+1]*this.params.speed*e*1e3,n[r+2]+=this.dustVelocities[r+2]*this.params.speed*e*1e3,this.params.depthBlur&&window.camera){const a=new D(n[r],n[r+1],n[r+2]),l=window.camera.position,h=a.distanceTo(l),c=this.params.depthFocusDistance,d=this.params.depthFocusRange,u=Math.abs(h-c);let p=1;u>d&&(p=1-Math.min(u-d,2)/2*this.params.depthBlurStrength),i[s]=this.dustSizes[s]*p}n[r]>this.params.horizontalRange&&(n[r]=-this.params.horizontalRange),n[r]<-this.params.horizontalRange&&(n[r]=this.params.horizontalRange),n[r+2]>this.params.horizontalRange&&(n[r+2]=-this.params.horizontalRange),n[r+2]<-this.params.horizontalRange&&(n[r+2]=this.params.horizontalRange),(n[r+1]<this.params.verticalOffset-.5||n[r+1]>this.params.verticalOffset+this.params.verticalRange+.5)&&(n[r+1]=Math.random()*this.params.verticalRange+this.params.verticalOffset)}this.dustGeometry.attributes.position.needsUpdate=!0,this.params.depthBlur&&(this.dustGeometry.attributes.size.needsUpdate=!0)}updateCount(e){this.params.count=e,this.createDustParticles()}updateSize(e){if(this.params.size=e,this.dustMaterial.size=e,this.dustSizes){for(let n=0;n<this.params.count;n++)this.dustSizes[n]=e*(1+(Math.random()-.5)*this.params.sizeRandomness);this.dustGeometry.attributes.size.needsUpdate=!0}}updateSizeRandomness(e){this.params.sizeRandomness=e,this.createDustParticles()}updateColor(e){this.params.color=e,this.dustMaterial.color.set(e)}updateOpacity(e){this.params.opacity=e,this.dustMaterial.opacity=e}updateSpeed(e){this.params.speed=e}updateBlur(e){this.params.blur=e,e>0?this.dustMaterial.map=this.createBlurTexture(e):this.dustMaterial.map=null,this.dustMaterial.needsUpdate=!0}updateDepthBlur(e){this.params.depthBlur=e}updateDepthBlurStrength(e){this.params.depthBlurStrength=e}updateDepthFocus(e,n){this.params.depthFocusDistance=e,this.params.depthFocusRange=n}updateRange(e,n){this.params.horizontalRange=e,this.params.verticalRange=n,this.createDustParticles()}updateOffset(e){this.params.verticalOffset=e,this.createDustParticles()}setVisible(e){this.params.visible=e,this.dustParticles.visible=e}applyPreset(e){switch(e){case"Light Dust":Object.assign(this.params,{count:300,size:.003,opacity:.2,speed:.3,color:"#ffffff"});break;case"Heavy Dust":Object.assign(this.params,{count:800,size:.008,opacity:.4,speed:.8,color:"#d4c4a8"});break;case"Magical Sparkles":Object.assign(this.params,{count:150,size:.01,opacity:.6,speed:.2,color:"#ffd700"});break;case"Reset Dust":default:Object.assign(this.params,{count:500,size:.005,opacity:.3,speed:.5,color:"#ffffff"});break}this.createDustParticles()}applySettings(e){e&&(Object.assign(this.params,e),this.createDustParticles(),e.blur!==void 0&&this.updateBlur(e.blur),e.depthBlur!==void 0&&this.updateDepthBlur(e.depthBlur),e.depthBlurStrength!==void 0&&this.updateDepthBlurStrength(e.depthBlurStrength),e.depthFocusDistance!==void 0&&e.depthFocusRange!==void 0&&this.updateDepthFocus(e.depthFocusDistance,e.depthFocusRange))}getSettings(){return{...this.params}}getParams(){return this.params}dispose(){var e,n;this.dustParticles&&(this.scene.remove(this.dustParticles),(e=this.dustGeometry)==null||e.dispose(),(n=this.dustMaterial)==null||n.dispose())}}class Q0{constructor(){this.managers={},this.defaultSettings=null,this.loadDefaultSettings()}async loadDefaultSettings(){try{const e=await fetch(Ni("data/default-settings.json"));this.defaultSettings=await e.json()}catch(e){console.warn("Could not load default settings:",e),this.defaultSettings=this.getFallbackSettings()}}registerManager(e,n){this.managers[e]=n}async saveSettingsToClipboard(){const e=this.gatherAllSettings(),n=JSON.stringify(e,null,2);try{await navigator.clipboard.writeText(n),alert("Settings copied to clipboard!")}catch(i){console.error("Failed to copy to clipboard:",i),alert("Failed to copy settings to clipboard.")}}async importSettingsFromClipboard(){try{const e=await navigator.clipboard.readText(),n=JSON.parse(e);this.applyAllSettings(n),window.app&&typeof window.app.updateAllGUIControls=="function"&&window.app.updateAllGUIControls(),alert("Settings imported from clipboard!")}catch(e){console.error("Failed to import settings:",e),alert("Failed to import settings: "+e.message)}}gatherAllSettings(){const e={};for(const[n,i]of Object.entries(this.managers))i&&typeof i.getSettings=="function"&&(e[n]=i.getSettings());return window.model&&(e.model={position:window.model.position.toArray(),rotation:[window.model.rotation.x,window.model.rotation.y,window.model.rotation.z],scale:window.model.scale.toArray()}),e}applyAllSettings(e){for(const[n,i]of Object.entries(this.managers))i&&typeof i.applySettings=="function"&&e[n]&&i.applySettings(e[n]);e.model&&window.model&&(e.model.position&&window.model.position.fromArray(e.model.position),e.model.rotation&&window.model.rotation.set(e.model.rotation[0],e.model.rotation[1],e.model.rotation[2]),e.model.scale&&window.model.scale.fromArray(e.model.scale))}applyDefaultSettings(){this.defaultSettings&&this.applyAllSettings(this.defaultSettings)}getDefaultSettings(){return this.defaultSettings}getFallbackSettings(){return{background:{gradientTop:"#3865ad",gradientBottom:"#0101bc",gradientAlpha:1},ground:{mode:"Infinite Canvas",color:"#222222",roughness:1,metalness:0,shadowOpacity:.4,receiveShadow:!0,castShadow:!1,visible:!0},dustParticles:{count:1150,size:.0095,sizeRandomness:1.4,color:"#0d529c",opacity:1,speed:.5,horizontalRange:3,verticalRange:2,verticalOffset:1,visible:!0,blur:.31,depthBlur:!1,depthBlurStrength:.16,depthFocusDistance:2,depthFocusRange:1},directionalLight:{intensity:1.43,color:"#ffffff",castShadow:!0,shadowBias:0,shadowBlur:1,shadowMapWidth:1024,shadowMapHeight:1024,posX:1.35,posY:1.57,posZ:.9,showHelper:!1,position:{x:1.35,y:1.57,z:.9}},ambientLight:{intensity:.4,color:"#ffffff"},camera:{position:[.571641187606234,.6054805751022576,-.4710421975258844],rotation:[-2.6821474237876726,.8865063263260724,2.775502273890531],target:[-.04078270409635462,.38393067967272315,-.023247738115800942]},model:{position:[0,-.02,0],rotation:[0,0,0],scale:[1,1,1]}}}saveToLocalStorage(e="threeJsSettings"){const n=this.gatherAllSettings();try{return localStorage.setItem(e,JSON.stringify(n)),!0}catch(i){return console.error("Failed to save to local storage:",i),!1}}loadFromLocalStorage(e="threeJsSettings"){try{const n=localStorage.getItem(e);if(n){const i=JSON.parse(n);return this.applyAllSettings(i),!0}}catch(n){console.error("Failed to load from local storage:",n)}return!1}exportAsFile(e="three-scene-settings.json"){const n=this.gatherAllSettings(),i=JSON.stringify(n,null,2),s=new Blob([i],{type:"application/json"}),r=URL.createObjectURL(s),a=document.createElement("a");a.href=r,a.download=e,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(r)}importFromFile(){return new Promise((e,n)=>{const i=document.createElement("input");i.type="file",i.accept=".json",i.onchange=s=>{const r=s.target.files[0];if(r){const a=new FileReader;a.onload=l=>{try{const h=JSON.parse(l.target.result);this.applyAllSettings(h),e(h)}catch(h){n(h)}},a.readAsText(r)}else n(new Error("No file selected"))},i.click()})}}class J0{constructor(){console.log("[FlexFrame Build] animation-player.js v28.3 - INLINE BUTTON STYLES - Build: 2026-01-20-0930"),this.mixer=null,this.actions=[],this.currentAction=null,this.isPlaying=!1,this.currentTime=0,this.duration=0,this.playbackSpeed=1,this.isVisible=!1,this.alwaysVisible=!1,this.hideTimeout=null,this.hasPlayedOnce=!1,this.createPlayerElements(),this.setupEventListeners()}createPlayerElements(){this.triggerArea=document.createElement("div"),this.triggerArea.className="animation-player-trigger",document.body.appendChild(this.triggerArea),this.container=document.createElement("div"),this.container.className="animation-player",this.container.innerHTML=`
            <div class="player-controls">
                <div class="player-left">
                    <button class="play-pause-btn" id="play-pause-btn">
                        <svg class="play-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                        <svg class="pause-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display: none;">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </svg>
                    </button>
                    <span class="time-display">
                        <span id="current-time">0:00</span> / <span id="total-time">0:00</span>
                    </span>
                </div>
                
                <div class="player-center">
                    <input type="range" id="timeline-slider" min="0" max="100" value="0" class="timeline-slider">
                </div>
                
                <div class="player-right">
                    <button class="screenshot-btn" id="screenshot-btn" title="Take Screenshot" style="height: 32px !important; min-height: 32px !important; max-height: 32px !important; padding: 0 12px !important; font-size: 11px !important; font-weight: 700 !important; line-height: 1 !important; box-sizing: border-box !important; display: flex !important; align-items: center !important; justify-content: center !important;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h4.05l1.83-2h4.24l1.83 2H20v12zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
                        </svg>
                    </button>
                    <button class="ar-btn" id="ar-btn" title="View in AR" style="height: 32px !important; min-height: 32px !important; max-height: 32px !important; padding: 0 12px !important; font-size: 11px !important; font-weight: 700 !important; line-height: 1 !important; box-sizing: border-box !important; display: flex !important; align-items: center !important; justify-content: center !important;">
                        <span>AR</span>
                    </button>
                    <button class="quality-btn" id="quality-toggle-btn" title="Switch Model Quality" style="display: none; height: 32px !important; min-height: 32px !important; max-height: 32px !important; padding: 0 12px !important; font-size: 11px !important; font-weight: 700 !important; line-height: 1 !important; box-sizing: border-box !important; align-items: center !important; justify-content: center !important;">
                        <span id="quality-text">HD</span>
                    </button>
                    <button class="speed-btn" id="speed-btn" style="height: 32px !important; min-height: 32px !important; max-height: 32px !important; padding: 0 12px !important; font-size: 11px !important; font-weight: 700 !important; line-height: 1 !important; box-sizing: border-box !important; display: flex !important; align-items: center !important; justify-content: center !important;">
                        <span id="speed-text">1x</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 10l5 5 5-5z"/>
                        </svg>
                    </button>
                    <div class="speed-menu" id="speed-menu">
                        <div class="speed-option" data-speed="0.25">0.25x</div>
                        <div class="speed-option" data-speed="0.5">0.5x</div>
                        <div class="speed-option active" data-speed="1">1x</div>
                        <div class="speed-option" data-speed="1.25">1.25x</div>
                        <div class="speed-option" data-speed="1.5">1.5x</div>
                        <div class="speed-option" data-speed="2">2x</div>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(this.container),this.initializeElements()}initializeElements(){this.playPauseBtn=this.container.querySelector("#play-pause-btn"),this.playIcon=this.container.querySelector(".play-icon"),this.pauseIcon=this.container.querySelector(".pause-icon"),this.currentTimeDisplay=this.container.querySelector("#current-time"),this.totalTimeDisplay=this.container.querySelector("#total-time"),this.timelineSlider=this.container.querySelector("#timeline-slider"),this.speedBtn=this.container.querySelector("#speed-btn"),this.speedText=this.container.querySelector("#speed-text"),this.speedMenu=this.container.querySelector("#speed-menu"),this.screenshotBtn=this.container.querySelector("#screenshot-btn"),this.onScreenshotRequest=null,setTimeout(()=>{this.playIcon&&this.pauseIcon&&this.updatePlayPauseIcon()},10),this.setVisibility(!0)}setupEventListeners(){this.playPauseBtn.addEventListener("click",()=>{this.togglePlayPause()}),this.screenshotBtn&&this.screenshotBtn.addEventListener("click",()=>{this.onScreenshotRequest&&this.onScreenshotRequest()}),this.timelineSlider.addEventListener("input",e=>{const n=parseFloat(e.target.value)/100;this.seekTo(n)}),this.speedBtn.addEventListener("click",e=>{e.stopPropagation(),this.speedMenu.classList.toggle("show")}),this.speedMenu.addEventListener("click",e=>{if(e.target.classList.contains("speed-option")){const n=parseFloat(e.target.dataset.speed);this.setPlaybackSpeed(n),this.speedMenu.querySelectorAll(".speed-option").forEach(i=>i.classList.remove("active")),e.target.classList.add("active"),this.speedMenu.classList.remove("show")}}),document.addEventListener("click",()=>{this.speedMenu.classList.remove("show")}),document.addEventListener("keydown",e=>{if(!(!this.mixer||!this.currentAction))switch(e.code){case"Space":e.target.tagName!=="INPUT"&&(e.preventDefault(),this.togglePlayPause());break;case"ArrowLeft":this.seekRelative(-.1);break;case"ArrowRight":this.seekRelative(.1);break}}),this.triggerArea.addEventListener("mouseenter",()=>{this.isVisible&&!this.alwaysVisible&&this.showPlayer()}),this.container.addEventListener("mouseenter",()=>{this.isVisible&&!this.alwaysVisible&&(this.clearHideTimeout(),this.container.classList.add("visible"))}),this.container.addEventListener("mouseleave",()=>{this.isVisible&&!this.alwaysVisible&&this.scheduleHide()})}showPlayer(){this.clearHideTimeout(),this.container.classList.add("visible"),this.alwaysVisible||this.scheduleHide()}hidePlayer(){this.alwaysVisible||this.container.classList.remove("visible")}scheduleHide(){this.alwaysVisible||(this.clearHideTimeout(),this.hideTimeout=setTimeout(()=>{!this.container.matches(":hover")&&!this.alwaysVisible&&this.hidePlayer()},2e3))}onCanvasInteraction(){this.isVisible&&!this.alwaysVisible&&this.showPlayer()}clearHideTimeout(){this.hideTimeout&&(clearTimeout(this.hideTimeout),this.hideTimeout=null)}setVisibility(e){this.isVisible=e,this.triggerArea.classList.toggle("active",e),e?(this.container.style.display="block",this.alwaysVisible?(this.container.classList.add("always-visible","visible"),this.clearHideTimeout()):(this.container.classList.remove("always-visible"),this.showPlayer())):(this.container.style.display="none",this.container.classList.remove("visible","always-visible"),this.clearHideTimeout())}setAlwaysVisible(e){const n=this.alwaysVisible;this.alwaysVisible=e,e?(this.container.classList.add("always-visible","visible"),this.clearHideTimeout()):(this.container.classList.remove("always-visible"),n&&this.isVisible&&this.scheduleHide())}setMixer(e,n){this.mixer=e,this.actions=[],n&&n.length>0&&(n.forEach(i=>{const s=e.clipAction(i);this.actions.push(s)}),this.actions.length>0&&(this.currentAction=this.actions[0],this.duration=this.currentAction.getClip().duration,this.updateTimeDisplay(),this.updatePlayPauseIcon()))}updatePlayPauseIcon(){if(!this.playIcon||!this.pauseIcon){console.warn("Animation player icons not found");return}this.isPlaying?(this.playIcon.style.display="none",this.pauseIcon.style.display="block"):(this.playIcon.style.display="block",this.pauseIcon.style.display="none")}togglePlayPause(){this.currentAction&&(this.isPlaying=!this.isPlaying,this.isPlaying?(this.currentAction.play(),this.currentAction.paused=!1,this.hasPlayedOnce||(this.hasPlayedOnce=!0,this.clearHideTimeout(),this.startFirstPlayFade())):this.currentAction.paused=!0,this.updatePlayPauseIcon())}seekTo(e){if(!this.currentAction)return;const n=e*this.duration;this.currentAction.time=n,this.currentTime=n,this.updateTimeDisplay(),this.isPlaying||this.mixer.update(0)}seekRelative(e){if(!this.currentAction)return;const i=Math.max(0,Math.min(this.duration,this.currentTime+e))/this.duration;this.seekTo(i),this.updateSliderPosition()}setPlaybackSpeed(e){this.playbackSpeed=e,this.speedText.textContent=`${e}x`,this.currentAction&&this.currentAction.setEffectiveTimeScale(e)}update(e){!this.mixer||!this.currentAction||!this.isPlaying||(this.currentTime=this.currentAction.time,this.currentTime>=this.duration&&(this.currentTime=0,this.currentAction.time=0),this.updateTimeDisplay(),this.updateSliderPosition())}updateTimeDisplay(){this.currentTimeDisplay.textContent=this.formatTime(this.currentTime),this.totalTimeDisplay.textContent=this.formatTime(this.duration)}updateSliderPosition(){const e=this.duration>0?this.currentTime/this.duration*100:0;this.timelineSlider.value=e}formatTime(e){const n=Math.floor(e/60),i=Math.floor(e%60);return`${n}:${i.toString().padStart(2,"0")}`}getSettings(){return{isPlaying:this.isPlaying,currentTime:this.currentTime,playbackSpeed:this.playbackSpeed,isVisible:this.isVisible,alwaysVisible:this.alwaysVisible}}applySettings(e){if(e.playbackSpeed!==void 0&&this.setPlaybackSpeed(e.playbackSpeed),e.currentTime!==void 0){const n=this.duration>0?e.currentTime/this.duration:0;this.seekTo(n)}e.isVisible!==void 0&&this.setVisibility(e.isVisible),e.alwaysVisible!==void 0&&this.setAlwaysVisible(e.alwaysVisible),e.isPlaying!==void 0&&this.currentAction&&(e.isPlaying!==this.isPlaying?this.togglePlayPause():this.updatePlayPauseIcon())}setScreenshotCallback(e){this.onScreenshotRequest=e}setScreenshotButtonVisible(e){this.screenshotBtn&&this.screenshotBtn.style.setProperty("display",e?"flex":"none","important")}}const e_=(o,e,n)=>new Promise(i=>{const s=e==="jpg"?"image/jpeg":e==="webp"?"image/webp":"image/png",r=e==="png"?void 0:n;o.toBlob(i,s,r)}),t_=(o,e)=>{const n=URL.createObjectURL(o),i=document.createElement("a");i.href=n,i.download=e,i.style.display="none",document.body.appendChild(i),i.click(),document.body.removeChild(i),setTimeout(()=>URL.revokeObjectURL(n),1e3)},n_=o=>{if(o===0)return"0 Bytes";const e=1024,n=["Bytes","KB","MB","GB"],i=Math.floor(Math.log(o)/Math.log(e));return parseFloat((o/Math.pow(e,i)).toFixed(2))+" "+n[i]},i_=()=>{const o=document.createElement("div");o.className="camera-flash",document.body.appendChild(o),setTimeout(()=>{o.parentNode&&o.parentNode.removeChild(o)},300)},Ci=async(o,e,n,i={})=>{const s={transparent:!1,format:"png",quality:1,filename:"screenshot",width:1920,height:1080,addTimestamp:!0,frameWidth:null,frameHeight:null,containerWidth:null,containerHeight:null,...i};try{console.log("Taking screenshot with settings:",s),i_();const r=o.getSize(new Ce),a=n.aspect,l=document.createElement("canvas");l.width=s.width,l.height=s.height;const h=new Zc({canvas:l,antialias:!0,preserveDrawingBuffer:!0,alpha:s.transparent});if(h.setSize(s.width,s.height),h.setPixelRatio(1),h.shadowMap.enabled=o.shadowMap.enabled,h.shadowMap.type=o.shadowMap.type,h.toneMapping=o.toneMapping,h.toneMappingExposure=o.toneMappingExposure,s.transparent)h.setClearColor(0,0);else{const y=o.getClearColor(new _e),_=o.getClearAlpha();h.setClearColor(y,_)}const c=n.clone();if(c.aspect=s.width/s.height,s.frameWidth&&s.frameHeight&&s.containerWidth&&s.containerHeight){const y=s.containerWidth/s.containerHeight,_=s.width/s.height;let g,f;_>y,g=s.frameWidth/s.containerWidth,f=s.frameHeight/s.containerHeight;const S=f,w=n.fov;c.fov=w*S,console.log(`📸 Frame crop: frame ${s.frameWidth}x${s.frameHeight}, container ${s.containerWidth}x${s.containerHeight}, fovScale: ${S.toFixed(3)}, FOV: ${w} -> ${c.fov.toFixed(1)}`)}c.updateProjectionMatrix();let d=null;s.transparent&&e.background&&(d=e.background,e.background=null),h.render(e,c),d!==null&&(e.background=d);let u=s.filename;if(s.addTimestamp){const _=new Date().toISOString().replace(/[:.]/g,"-").slice(0,-5);u+="_"+_}u+="."+s.format;const p=await e_(l,s.format,s.quality);t_(p,u),h.dispose();const m=n_(p.size);return console.log(`📸 Screenshot saved: ${u} (${s.width}×${s.height}, ${m})`),{success:!0,filename:u,size:m}}catch(r){return console.error("Screenshot failed:",r),{success:!1,error:r.message}}},fo={takeScreenshot:Ci,quickScreenshot:(o,e,n)=>Ci(o,e,n),transparentScreenshot:(o,e,n)=>Ci(o,e,n,{transparent:!0}),hdScreenshot:(o,e,n)=>Ci(o,e,n,{width:1280,height:720}),uhd4kScreenshot:(o,e,n)=>Ci(o,e,n,{width:3840,height:2160}),thumbnailScreenshot:(o,e,n)=>Ci(o,e,n,{width:400,height:300,filename:"thumbnail"})};class or{setupSearchListener(){if(this.menuType!=="search")return;const e=document.getElementById("searchInput"),n=document.getElementById("searchActionBtn"),i=n==null?void 0:n.querySelector(".search-icon"),s=n==null?void 0:n.querySelector(".clear-icon"),r=document.getElementById("searchSuggestions");if(!e||!n)return;const a=()=>{if(!this.allExercises||this.allExercises.length===0)return;const d=new Set;this.allExercises.forEach(_=>{_.muscleGroup.forEach(g=>d.add(g))});const u=Array.from(d).slice(0,5),p=new Set;this.allExercises.forEach(_=>{_.equipment.forEach(g=>p.add(g))});const m=Array.from(p).slice(0,4),y=this.allExercises.slice(0,6);return{muscles:u,equipment:m,popularExercises:y}},l=()=>{if(!r||this.searchQuery.length>0)return;const d=a();if(!d)return;let u="";d.popularExercises.length>0&&(u+='<div class="search-suggestion-category">Popular Exercises</div>',d.popularExercises.forEach(p=>{u+=`
                            <div class="search-suggestion-item" data-value="${p.name}">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
                                </svg>
                                <span class="search-suggestion-text">${p.name}</span>
                            </div>
                        `})),d.muscles.length>0&&(u+='<div class="search-suggestion-category">Muscle Groups</div>',d.muscles.forEach(p=>{u+=`
                            <div class="search-suggestion-item" data-value="${p}">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                                </svg>
                                <span class="search-suggestion-text">${p}</span>
                            </div>
                        `})),d.equipment.length>0&&(u+='<div class="search-suggestion-category">Equipment</div>',d.equipment.forEach(p=>{u+=`
                            <div class="search-suggestion-item" data-value="${p}">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
                                </svg>
                                <span class="search-suggestion-text">${p}</span>
                            </div>
                        `})),r.innerHTML=u,r.style.display="block",r.querySelectorAll(".search-suggestion-item").forEach(p=>{p.addEventListener("click",()=>{const m=p.getAttribute("data-value"),y=this.allExercises.find(_=>_.name===m);y?(this.selectThumbnail(y),h(),e.value="",this.searchQuery="",c()):(e.value=m,this.searchQuery=m.toLowerCase().trim(),c(),h(),this.filterDataForMenu(),this.renderVirtualizedGrid())})})},h=()=>{r&&(r.style.display="none")},c=()=>{this.searchQuery&&this.searchQuery.length>0?(i.style.display="none",s.style.display="block"):(i.style.display="block",s.style.display="none")};e.addEventListener("focus",()=>{(!this.searchQuery||this.searchQuery.length===0)&&l()}),e.addEventListener("blur",()=>{setTimeout(()=>h(),200)}),e.addEventListener("input",d=>{this.searchQuery=d.target.value.toLowerCase().trim(),c(),this.searchQuery.length===0?l():h(),this.filterDataForMenu(),this.renderVirtualizedGrid()}),e.addEventListener("keydown",d=>{d.key==="Enter"?(this.searchQuery=e.value.toLowerCase().trim(),c(),h(),this.filterDataForMenu(),this.renderVirtualizedGrid()):d.key==="Escape"&&h()}),n.addEventListener("click",()=>{this.searchQuery&&this.searchQuery.length>0?(e.value="",this.searchQuery="",c(),h(),this.filterDataForMenu(),this.renderVirtualizedGrid(),e.focus()):(this.searchQuery=e.value.toLowerCase().trim(),c(),h(),this.filterDataForMenu(),this.renderVirtualizedGrid())}),this.toggleBtn&&this.toggleBtn.addEventListener("click",()=>{this.menuType==="search"&&this.isOpen&&setTimeout(()=>{e.focus(),c()},150)})}constructor(e){var i;this.menuType=e,this.isOpen=!1,this.hasBeenOpened=!1,this.allExercises=[],this.filteredData=[],this.searchQuery="",this.scrollAmount=200,this.selectedId=null,this.itemHeight=230,this.containerHeight=400,this.visibleItems=Math.ceil(this.containerHeight/this.itemHeight)+4,this.startIndex=0,this.endIndex=this.visibleItems,this.loopMultiplier=3,this.isLooping=!1,this.renderBuffer=2,this.lastRenderedStart=-1,this.lastRenderedEnd=-1,this.scrollVelocity=0,this.scrollDecay=.9,this.maxVelocity=35,this.isScrolling=!1,this.isDragging=!1,this.startY=0,this.startScrollTop=0,this.lastY=0,this.lastTime=0,this.velocityTracker=[],this.recentlyDragged=!1,this.hasDragged=!1,this.scrollInteractionDelay=1500,this.lastScrollInteraction=0;const n=((i=window.flexframeSettings)==null?void 0:i.primaryColor)||"#4a9eff";console.log("[FlexFrame Glow] flexframeSettings:",window.flexframeSettings),console.log("[FlexFrame Glow] primaryColor value:",n),console.log("[FlexFrame Glow] Using primary color for thumbnail glow:",n),this.settings={widthPercentage:90,backgroundColor:"#000000",backgroundOpacity:.9,borderRadius:12,keepOpen:!1,glowColor:n,glowIntensity:.6,glowSize:20},console.log("[FlexFrame Glow] Menu settings initialized with glowColor:",this.settings.glowColor),this.initializeElements(),this.loadExerciseData()}updateTitle(e){const n=document.getElementById(`${this.menuType}TitleHeader`);n&&(n.textContent=e)}initializeElements(){console.log(`🔍 initializeElements for ${this.menuType}`),this.toggleBtn=document.getElementById(`${this.menuType}Toggle`),this.dropdown=document.getElementById(`${this.menuType}Dropdown`),this.scrollContainer=document.getElementById(`${this.menuType}Container`),this.thumbnailGrid=document.getElementById(`${this.menuType}Grid`),this.scrollUpBtn=document.getElementById(`${this.menuType}ScrollUp`),this.scrollDownBtn=document.getElementById(`${this.menuType}ScrollDown`),console.log("🔍 Elements found - toggleBtn:",this.toggleBtn,"dropdown:",this.dropdown),this.toggleBtn||console.error(`❌ BUTTON NOT FOUND: ${this.menuType}Toggle`)}async loadExerciseData(){try{const e="https://FlexFrame.b-cdn.net/Exercise%20Catalogue%20For%20Menus%20%26%20Thumbnails/exercises.json",n=`?t=${Date.now()}`;let s=await(await fetch(e+n)).json();if(typeof window.flexframeSettings<"u"&&window.flexframeSettings.hiddenExercises&&Array.isArray(window.flexframeSettings.hiddenExercises)&&window.flexframeSettings.hiddenExercises.length>0){const r=window.flexframeSettings.hiddenExercises,a=s.length;s=s.filter(l=>!r.includes(l.id)),console.log(`🔒 Filtered ${a-s.length} hidden exercises (${s.length} remaining)`)}if(typeof window.flexframeSettings<"u"&&window.flexframeSettings.customThumbnails&&typeof window.flexframeSettings.customThumbnails=="object"){const r=window.flexframeSettings.customThumbnails;let a=0;s=s.map(l=>r[l.id]?(a++,{...l,thumbnailUrl:r[l.id]}):l),a>0&&console.log(`🖼️ Applied ${a} custom thumbnails`)}this.allExercises=s,console.log("✅ Loaded exercises from CDN:",e),this.filterDataForMenu(),this.setupEventListeners(),setTimeout(()=>{this.updateStyles(),this.updateGlowStyles(),this.setupSearchListener(),this.updateThumbnailGlowStyles()},100)}catch(e){console.error("Failed to load exercise data:",e),this.generateFallbackData()}}filterDataForMenu(){var e,n;switch(this.menuType){case"exercises":const i=(e=window.menuManager)==null?void 0:e.selectedMuscle,s=(n=window.menuManager)==null?void 0:n.selectedEquipment;i&&s?(this.filteredData=this.allExercises.filter(l=>{var p,m,y;const h=((p=l.information)==null?void 0:p.primaryMuscle)===i,c=(y=(m=l.information)==null?void 0:m.secondaryMuscles)==null?void 0:y.includes(i),d=h||c,u=l.equipment.includes(s);return d&&u}),this.filteredData.sort((l,h)=>{var u,p;const c=((u=l.information)==null?void 0:u.primaryMuscle)===i,d=((p=h.information)==null?void 0:p.primaryMuscle)===i;return c&&!d?-1:!c&&d?1:0}),console.log(`Filtering exercises by muscle: ${i} AND equipment: ${s}, found ${this.filteredData.length} exercises`)):i?(this.filteredData=this.allExercises.filter(l=>{var d,u,p;const h=((d=l.information)==null?void 0:d.primaryMuscle)===i,c=(p=(u=l.information)==null?void 0:u.secondaryMuscles)==null?void 0:p.includes(i);return h||c}),this.filteredData.sort((l,h)=>{var u,p;const c=((u=l.information)==null?void 0:u.primaryMuscle)===i,d=((p=h.information)==null?void 0:p.primaryMuscle)===i;return c&&!d?-1:!c&&d?1:0}),console.log(`Filtering exercises by muscle: ${i}, found ${this.filteredData.length} exercises`)):s?(this.filteredData=this.allExercises.filter(l=>l.equipment.includes(s)),console.log(`Filtering exercises by equipment: ${s}, found ${this.filteredData.length} exercises`)):this.filteredData=this.allExercises;break;case"muscles":const r=new Set;this.allExercises.forEach(l=>{l.muscleGroup.forEach(h=>r.add(h))}),this.filteredData=Array.from(r).map((l,h)=>({id:`muscle_${h}`,name:l,thumbnailUrl:`https://picsum.photos/200/200?random=${100+h}`,type:"muscle",relatedExercises:this.allExercises.filter(c=>c.muscleGroup.includes(l))}));break;case"equipment":const a=new Set;this.allExercises.forEach(l=>{l.equipment.forEach(h=>a.add(h))}),this.filteredData=Array.from(a).map((l,h)=>({id:`equipment_${h}`,name:l,thumbnailUrl:`https://picsum.photos/200/200?random=${200+h}`,type:"equipment",relatedExercises:this.allExercises.filter(c=>c.equipment.includes(l))}));break;case"search":this.searchQuery?(this.filteredData=this.allExercises.map(l=>{var _,g,f,S;const h=l.name.toLowerCase().includes(this.searchQuery),c=l.muscleGroup.some(w=>w.toLowerCase().includes(this.searchQuery)),d=l.equipment.some(w=>w.toLowerCase().includes(this.searchQuery)),u=(g=(_=l.information)==null?void 0:_.primaryMuscle)==null?void 0:g.toLowerCase().includes(this.searchQuery),p=(S=(f=l.information)==null?void 0:f.secondaryMuscles)==null?void 0:S.some(w=>w.toLowerCase().includes(this.searchQuery));let m="",y="";return h?(m="Exercise Name",y=l.name):u?(m="Primary Muscle",y=l.information.primaryMuscle):p?(m="Secondary Muscles",y=l.information.secondaryMuscles.find(x=>x.toLowerCase().includes(this.searchQuery))||l.information.secondaryMuscles.join(", ")):c?(m="Muscle Group",y=l.muscleGroup.find(x=>x.toLowerCase().includes(this.searchQuery))||l.muscleGroup.join(", ")):d&&(m="Equipment",y=l.equipment.find(x=>x.toLowerCase().includes(this.searchQuery))||l.equipment.join(", ")),{...l,searchMatch:{type:m,text:y}}}).filter(l=>l.searchMatch.type!==""),console.log(`Search found ${this.filteredData.length} exercises for: "${this.searchQuery}"`)):this.filteredData=this.allExercises;break}this.renderVirtualizedGrid()}generateFallbackData(){this.filteredData=Array.from({length:20},(e,n)=>({id:n+1,name:`${this.menuType} ${n+1}`,thumbnailUrl:`https://picsum.photos/200/200?random=${n+1}`})),this.renderVirtualizedGrid()}renderVirtualizedGrid(){var s,r;if(!this.thumbnailGrid)return;if(this.thumbnailGrid.innerHTML="",this.menuType==="exercises"){const a=(s=window.menuManager)==null?void 0:s.selectedMuscle,l=(r=window.menuManager)==null?void 0:r.selectedEquipment,h=this.dropdown.querySelector(".filter-status-box");if(h&&h.remove(),a||l){const c=document.createElement("div");c.className="filter-status-box";let d='<div class="filter-status-title">Active Filters:</div>';a&&(d+=`
                        <div class="filter-tag">
                            <span class="filter-label">Muscle:</span>
                            <span class="filter-value">${a}</span>
                            <button class="filter-clear" data-filter="muscle" title="Clear muscle filter">✕</button>
                        </div>
                    `),l&&(d+=`
                        <div class="filter-tag">
                            <span class="filter-label">Equipment:</span>
                            <span class="filter-value">${l}</span>
                            <button class="filter-clear" data-filter="equipment" title="Clear equipment filter">✕</button>
                        </div>
                    `),c.innerHTML=d,c.querySelectorAll(".filter-clear").forEach(p=>{p.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation();const y=m.target.dataset.filter;y==="muscle"?(window.menuManager.selectedMuscle=null,window.menuManager.menus.muscles&&(window.menuManager.menus.muscles.selectedId=null,window.menuManager.menus.muscles.updateVirtualizedContent())):y==="equipment"&&(window.menuManager.selectedEquipment=null,window.menuManager.menus.equipment&&(window.menuManager.menus.equipment.selectedId=null,window.menuManager.menus.equipment.updateVirtualizedContent())),this.filterDataForMenu()})});const u=this.dropdown.querySelector(".thumbnail-scroll-controls");u&&u.after(c)}}this.topSpacer=document.createElement("div"),this.bottomSpacer=document.createElement("div"),this.visibleContainer=document.createElement("div"),this.thumbnailGrid.appendChild(this.topSpacer),this.thumbnailGrid.appendChild(this.visibleContainer),this.thumbnailGrid.appendChild(this.bottomSpacer);const e=this.menuType!=="search",n=e?this.loopMultiplier:1,i=this.filteredData.length*this.itemHeight*n;this.bottomSpacer.style.height=`${i}px`,setTimeout(()=>{this.scrollContainer.scrollTop=e?this.filteredData.length*this.itemHeight:0,this.updateVirtualizedContent()},50)}updateVirtualizedContent(){if(!this.visibleContainer||!this.filteredData.length||this.isDragging)return;const e=this.scrollContainer.scrollTop,n=this.filteredData.length,i=this.menuType!=="search",s=i?this.loopMultiplier:1;n*this.itemHeight*s;let r=e;const a=n*this.itemHeight;i&&e<a*.1?(this.scrollContainer.scrollTop=e+a,r=this.scrollContainer.scrollTop):i&&e>a*2.9&&(this.scrollContainer.scrollTop=e-a,r=this.scrollContainer.scrollTop);const l=Math.floor(r/this.itemHeight),h=this.visibleItems+this.renderBuffer*2;this.startIndex=l,this.endIndex=l+h;const c=this.scrollContainer.scrollTop,d=this.filteredData.length*this.itemHeight,u=Math.floor(c/this.itemHeight)*this.itemHeight;this.topSpacer.style.height=`${u}px`,this.bottomSpacer.style.height=`${d*s-u-(this.endIndex-this.startIndex)*this.itemHeight}px`;const p=new Set;let m=null;for(let _=this.startIndex;_<this.endIndex;_++){const g=this.filteredData.length;let f;if(i)f=(_%g+g)%g;else if(f=_,f>=g)continue;const S=this.filteredData[f];if(!S)continue;const w=`${S.id}_pos_${_}`;p.add(w);let x=this.visibleContainer.querySelector(`[data-position-id="${w}"]`),P="";if(this.menuType,this.menuType==="search"&&S.searchMatch&&this.searchQuery){const C=E=>{const v=new RegExp(`(${this.searchQuery})`,"gi");return E.replace(v,"<mark>$1</mark>")};P=`
                    <div class="thumbnail-search-match">
                        <div class="search-match-type">${S.searchMatch.type}</div>
                        <div class="search-match-text">${C(S.searchMatch.text)}</div>
                    </div>
                `,console.log(`Generated searchMatchHTML for ${S.name}:`,P)}let I="";if(this.menuType==="exercises"&&S.information){const C=S.information.primaryMuscle||"",E=S.information.secondaryMuscles||[];I=`
                    <div class="thumbnail-muscle-info">
                        ${C?`<div class="primary-muscle"><strong>Primary:</strong> ${C}</div>`:""}
                        ${E.length>0?`<div class="secondary-muscles"><strong>Secondary:</strong> ${E.join(", ")}</div>`:""}
                    </div>
                `}const A=`
                <img src="${S.thumbnailUrl}" alt="${S.name}" loading="lazy">
                <div class="thumbnail-label">${S.name}</div>
                ${P}
                ${I}
            `;if(!x)x=document.createElement("div"),x.className="thumbnail-item",x.dataset.id=S.id,x.dataset.positionId=w,x.innerHTML=A,x.addEventListener("click",C=>{if(this.recentlyDragged&&this.hasDragged){C.preventDefault(),C.stopPropagation();return}this.selectThumbnail(S)}),m&&m.nextSibling?this.visibleContainer.insertBefore(x,m.nextSibling):!m&&this.visibleContainer.firstChild?this.visibleContainer.insertBefore(x,this.visibleContainer.firstChild):this.visibleContainer.appendChild(x);else{const C=x.classList.contains("selected");x.innerHTML=A,C&&x.classList.add("selected")}m=x}const y=Array.from(this.visibleContainer.querySelectorAll(".thumbnail-item"));for(const _ of y){const g=_.dataset.positionId;p.has(g)||this.visibleContainer.removeChild(_)}setTimeout(()=>{if(this.updateStyles(),this.updateThumbnailGlowStyles(),this.selectedId){const _=this.visibleContainer.querySelector(`[data-id="${this.selectedId}"]`);_&&_.classList.add("selected")}},50)}selectThumbnail(e){this.selectedId=e.id,this.visibleContainer.querySelectorAll(".thumbnail-item").forEach(a=>a.classList.remove("selected"));const i=this.visibleContainer.querySelector(`[data-id="${e.id}"]`);i&&i.classList.add("selected");const s=this.menuType==="search"?"exercisesSelected":`${this.menuType}Selected`,r=new CustomEvent(s,{detail:{item:e,menuType:this.menuType}});document.dispatchEvent(r)}setupEventListeners(){var e,n;console.log(`🎯 Setting up click listener for ${this.menuType}, button:`,this.toggleBtn),console.log("🎯 Button parent:",(e=this.toggleBtn)==null?void 0:e.parentElement),console.log("🎯 Button is in flexframe container:",((n=this.toggleBtn)==null?void 0:n.closest("#flexframe-viewer-container"))!==null),this.toggleBtn.onclick=i=>{console.log(`💥 CLICK HANDLER FIRED for ${this.menuType}!`),i.stopPropagation(),this.toggleMenu()},document.addEventListener("click",i=>{(i.target===this.toggleBtn||this.toggleBtn.contains(i.target))&&console.log(`🌍 DOCUMENT CLICK detected on ${this.menuType} button, target:`,i.target)},!0),this.scrollUpBtn.addEventListener("click",()=>{this.scrollContainer.scrollBy({top:-this.scrollAmount,behavior:"smooth"})}),this.scrollDownBtn.addEventListener("click",()=>{this.scrollContainer.scrollBy({top:this.scrollAmount,behavior:"smooth"})}),this.scrollContainer.addEventListener("wheel",i=>{i.preventDefault();const s=i.deltaY*3.5;this.scrollVelocity+=s*.2,this.scrollVelocity=Math.max(-this.maxVelocity,Math.min(this.maxVelocity,this.scrollVelocity)),this.lastScrollInteraction=Date.now(),this.isScrolling||this.startMomentumScroll()}),this.scrollContainer.addEventListener("scroll",()=>{this.updateVirtualizedContent(),this.updateScrollButtons()}),this.scrollContainer.addEventListener("mousedown",i=>{this.startDrag(i.clientY),i.preventDefault()}),this.scrollContainer.addEventListener("touchstart",i=>{this.startDrag(i.touches[0].clientY),i.preventDefault()},{passive:!1}),document.addEventListener("mousemove",i=>{this.isDragging&&(this.handleDrag(i.clientY),i.preventDefault())}),document.addEventListener("touchmove",i=>{this.isDragging&&(this.handleDrag(i.touches[0].clientY),i.preventDefault())},{passive:!1}),document.addEventListener("mouseup",()=>{this.isDragging&&this.endDrag()}),document.addEventListener("touchend",()=>{this.isDragging&&this.endDrag()}),this.scrollContainer.addEventListener("selectstart",i=>{this.isDragging&&i.preventDefault()}),document.addEventListener("keydown",i=>{this.isOpen&&(i.key==="Escape"?this.settings.keepOpen||this.closeMenu():i.key==="ArrowUp"?(i.preventDefault(),this.scrollContainer.scrollBy({top:-this.scrollAmount,behavior:"smooth"})):i.key==="ArrowDown"&&(i.preventDefault(),this.scrollContainer.scrollBy({top:this.scrollAmount,behavior:"smooth"})))}),this.scrollContainer.addEventListener("scroll",()=>{this.updateScrollButtons()})}updateThumbnailGlowStyles(){const e=this.settings.glowColor.replace("#",""),n=parseInt(e.substr(0,2),16),i=parseInt(e.substr(2,2),16),s=parseInt(e.substr(4,2),16),r=`rgba(${n}, ${i}, ${s}, ${this.settings.glowIntensity*.8})`,a=`thumbnail-glow-${this.menuType}`;let l=document.getElementById(a);l||(l=document.createElement("style"),l.id=a,document.head.appendChild(l)),l.textContent=`
            #${this.menuType}Grid .thumbnail-item.selected {
                border-color: ${this.settings.glowColor};
                box-shadow: 0 0 ${this.settings.glowSize}px ${r};
            }
            #${this.menuType}Grid .thumbnail-item.selected::before {
                background: ${this.settings.glowColor};
                box-shadow: 0 0 ${Math.floor(this.settings.glowSize*.5)}px ${r};
            }
        `}startMomentumScroll(){this.isScrolling=!0,this.momentumScrollFrame()}momentumScrollFrame(){if(Math.abs(this.scrollVelocity)<.1){this.isScrolling=!1,this.scrollVelocity=0;return}this.scrollContainer.scrollBy({top:this.scrollVelocity,behavior:"auto"}),this.updateVirtualizedContent(),this.scrollVelocity*=this.scrollDecay,requestAnimationFrame(()=>this.momentumScrollFrame())}startDrag(e){this.isDragging=!0,this.startY=e,this.startScrollTop=this.scrollContainer.scrollTop,this.lastY=e,this.lastTime=Date.now(),this.velocityTracker=[],this.hasDragged=!1,this.isScrolling=!1,this.scrollVelocity=0,this.scrollContainer.style.cursor="grabbing"}handleDrag(e){if(!this.isDragging)return;const n=this.startY-e;Math.abs(n)>5&&(this.hasDragged=!0);const i=this.startScrollTop+n;this.scrollContainer.scrollTop=i;const s=Date.now(),r=s-this.lastTime,a=e-this.lastY;if(r>0){const l=a/r;this.velocityTracker.push({velocity:l,time:s}),this.velocityTracker=this.velocityTracker.filter(h=>s-h.time<100)}this.lastY=e,this.lastTime=s}endDrag(){if(this.isDragging){if(this.isDragging=!1,this.scrollContainer.style.cursor="grab",this.hasDragged&&(this.recentlyDragged=!0,this.lastScrollInteraction=Date.now(),setTimeout(()=>{this.recentlyDragged=!1,this.hasDragged=!1},100)),this.velocityTracker.length>0){const e=this.velocityTracker.reduce((n,i)=>n+i.velocity,0)/this.velocityTracker.length;this.scrollVelocity=-e*15,this.scrollVelocity=Math.max(-this.maxVelocity,Math.min(this.maxVelocity,this.scrollVelocity)),Math.abs(this.scrollVelocity)>1&&this.startMomentumScroll()}this.velocityTracker=[],setTimeout(()=>{this.updateVirtualizedContent()},50)}}hasRecentScrollInteraction(){return Date.now()-this.lastScrollInteraction<this.scrollInteractionDelay}momentumScrollFrame(){if(Math.abs(this.scrollVelocity)<.1){this.isScrolling=!1,this.scrollVelocity=0;return}this.scrollContainer.scrollBy({top:this.scrollVelocity,behavior:"auto"}),this.scrollVelocity*=this.scrollDecay,requestAnimationFrame(()=>this.momentumScrollFrame())}updateScrollButtons(){this.scrollUpBtn.style.opacity="1",this.scrollDownBtn.style.opacity="1",this.scrollUpBtn.disabled=!1,this.scrollDownBtn.disabled=!1}toggleMenu(){console.log(`🔄 toggleMenu called for ${this.menuType}, isOpen:`,this.isOpen),this.isOpen?this.closeMenu():this.openMenu()}openMenu(){console.log(`🟢 openMenu called for ${this.menuType}`),this.isOpen=!0,document.dispatchEvent(new CustomEvent("closeAllThumbnailMenus",{detail:{except:this.menuType}})),document.dispatchEvent(new CustomEvent("closeAllRightMenus",{detail:{except:null}}));const e=document.querySelector(".thumbnail-grid-container-right");if(e&&e.classList.remove("menu-visible","menu-active"),this.menuType==="search"){this.filterDataForMenu(),this.renderVirtualizedGrid();const i=document.getElementById("searchInput");i&&setTimeout(()=>i.focus(),150)}this.dropdown.classList.add("show"),console.log(`✅ Added .show class to ${this.menuType} dropdown, classes:`,this.dropdown.className),this.toggleBtn.classList.add("active"),this.scrollContainer&&(this.scrollContainer.style.cursor="grab",this.hasBeenOpened||(setTimeout(()=>{const i=this.scrollContainer.scrollTop;this.scrollContainer.scrollTo({top:i+30,behavior:"smooth"}),setTimeout(()=>{this.scrollContainer.scrollTo({top:i,behavior:"smooth"})},400)},300),this.hasBeenOpened=!0));const n=document.querySelector(".thumbnail-grid-container");n&&n.classList.add("menu-active"),setTimeout(()=>{this.visibleContainer&&this.updateVirtualizedContent(),this.updateScrollButtons()},100)}closeMenu(){if(this.dropdown.classList.remove("show"),this.toggleBtn.classList.remove("active"),this.isOpen=!1,!(window.menuManager&&Object.values(window.menuManager.menus).some(n=>n.isOpen))){const n=document.querySelector(".thumbnail-grid-container");n&&n.classList.remove("menu-active")}}updateStyles(){if(!this.dropdown)return;const e=this.settings.backgroundColor.replace("#",""),n=parseInt(e.substr(0,2),16),i=parseInt(e.substr(2,2),16),s=parseInt(e.substr(4,2),16),r=window.innerWidth<=768;this.dropdown.style.width=r?"160px":"250px",this.dropdown.style.background=`rgba(${n}, ${i}, ${s}, ${this.settings.backgroundOpacity})`,this.dropdown.style.borderRadius=`${this.settings.borderRadius}px`}updateGlowStyles(){if(!this.toggleBtn)return;const e=this.settings.glowColor.replace("#",""),n=parseInt(e.substr(0,2),16),i=parseInt(e.substr(2,2),16),s=parseInt(e.substr(4,2),16),r=`rgba(${n}, ${i}, ${s}, ${this.settings.glowIntensity})`,a=`rgba(${n}, ${i}, ${s}, ${this.settings.glowIntensity*.5})`,l=`glow-${this.menuType}`;let h=document.getElementById(l);h||(h=document.createElement("style"),h.id=l,document.head.appendChild(h)),h.textContent=`
            #${this.menuType}Toggle.active {
                border-color: ${this.settings.glowColor};
                box-shadow: 0 0 ${this.settings.glowSize}px ${r}, 0 0 ${this.settings.glowSize*2}px ${a};
            }
            #${this.menuType}Toggle.active:hover {
                box-shadow: 0 0 ${this.settings.glowSize*1.25}px ${r.replace(this.settings.glowIntensity,this.settings.glowIntensity+.2)}, 0 0 ${this.settings.glowSize*2.5}px ${a.replace(this.settings.glowIntensity*.5,this.settings.glowIntensity*.7)};
            }
        `}updateThumbnailGlowStyles(){const e=this.settings.glowColor.replace("#",""),n=parseInt(e.substr(0,2),16),i=parseInt(e.substr(2,2),16),s=parseInt(e.substr(4,2),16),r=`rgba(${n}, ${i}, ${s}, ${this.settings.glowIntensity})`,a=`rgba(${n}, ${i}, ${s}, ${this.settings.glowIntensity*.5})`,l=`thumbnail-glow-${this.menuType}`;let h=document.getElementById(l);h||(h=document.createElement("style"),h.id=l,document.head.appendChild(h)),h.textContent=`
            #${this.menuType}Grid .thumbnail-item.selected {
                border-color: ${this.settings.glowColor};
                box-shadow: 0 0 ${this.settings.glowSize}px ${r};
            }
            #${this.menuType}Grid .thumbnail-item.selected img {
                border: 3px solid ${this.settings.glowColor};
                box-shadow: 0 0 ${this.settings.glowSize}px ${a};
            }
        `}getSettings(){return{...this.settings}}applySettings(e){this.settings={...this.settings,...e},this.updateStyles(),this.updateGlowStyles(),this.updateThumbnailGlowStyles()}}class s_{constructor(){var a;console.log("🎬 MultiThumbnailMenuSystem constructor started"),this.menus={},this.selectedMuscle=null,this.selectedEquipment=null,this.selectedExerciseId=null;const e=((a=window.flexframeSettings)==null?void 0:a.primaryColor)||"#4a9eff";console.log("[FlexFrame Glow] MultiThumbnailMenuSystem using primaryColor:",e),document.documentElement.style.setProperty("--flexframe-primary-color",e);const n=e.replace("#",""),i=parseInt(n.substring(0,2),16),s=parseInt(n.substring(2,4),16),r=parseInt(n.substring(4,6),16);document.documentElement.style.setProperty("--flexframe-primary-color-rgb",`${i}, ${s}, ${r}`),console.log("[FlexFrame Glow] Set CSS variables --flexframe-primary-color:",e,"RGB:",i,s,r),this.settings={widthPercentage:90,backgroundColor:"#000000",backgroundOpacity:.9,borderRadius:12,keepOpen:!1,glowColor:e,glowIntensity:.6,glowSize:20},console.log("📋 Calling initializeMenus..."),this.initializeMenus(),console.log("🎧 Calling setupGlobalListeners..."),this.setupGlobalListeners(),console.log("✅ MultiThumbnailMenuSystem constructor complete")}initializeMenus(){console.log("🏗️ initializeMenus started"),console.log("Creating exercises menu..."),this.menus.exercises=new or("exercises"),console.log("Creating muscles menu..."),this.menus.muscles=new or("muscles"),console.log("Creating equipment menu..."),this.menus.equipment=new or("equipment"),console.log("Creating search menu..."),this.menus.search=new or("search"),console.log("✅ All 4 menus created:",this.menus)}setupGlobalListeners(){document.addEventListener("exercisesSelected",n=>{this.selectedExerciseId=n.detail.item.id}),document.addEventListener("searchSelected",n=>{var s;console.log("Search selection made, selecting corresponding items in other tabs");const i=n.detail.item;if(console.log("Selected exercise data:",i),this.menus.muscles&&((s=i.information)!=null&&s.primaryMuscle)){const r=i.information.primaryMuscle;this.selectedMuscle=r,console.log("Setting muscle:",r);const a=this.menus.muscles.filteredData.find(l=>l.name===r);console.log("Found muscle item:",a),a&&(this.menus.muscles.selectedId=a.id)}if(this.menus.equipment&&i.equipment&&i.equipment.length>0){const r=i.equipment[0];this.selectedEquipment=r,console.log("Setting equipment:",r);const a=this.menus.equipment.filteredData.find(l=>l.name===r);console.log("Found equipment item:",a),a&&(this.menus.equipment.selectedId=a.id)}this.menus.exercises&&this.menus.exercises.filterDataForMenu(),this.menus.exercises&&i.id&&(this.menus.exercises.selectedId=i.id,this.selectedExerciseId=i.id,console.log("Set exercise selection:",i.id)),setTimeout(()=>{var r,a,l;if((r=this.menus.exercises)!=null&&r.visibleContainer&&i.id){this.menus.exercises.visibleContainer.querySelectorAll(".thumbnail-item").forEach(d=>d.classList.remove("selected"));const c=this.menus.exercises.visibleContainer.querySelector(`[data-id="${i.id}"]`);c?(c.classList.add("selected"),console.log("Applied visual selection to exercise")):console.log("Exercise element not found in DOM")}if((a=this.menus.muscles)!=null&&a.visibleContainer&&this.menus.muscles.selectedId){this.menus.muscles.visibleContainer.querySelectorAll(".thumbnail-item").forEach(d=>d.classList.remove("selected"));const c=this.menus.muscles.visibleContainer.querySelector(`[data-id="${this.menus.muscles.selectedId}"]`);c?(c.classList.add("selected"),console.log("Applied visual selection to muscle")):console.log("Muscle element not found in DOM")}if((l=this.menus.equipment)!=null&&l.visibleContainer&&this.menus.equipment.selectedId){this.menus.equipment.visibleContainer.querySelectorAll(".thumbnail-item").forEach(d=>d.classList.remove("selected"));const c=this.menus.equipment.visibleContainer.querySelector(`[data-id="${this.menus.equipment.selectedId}"]`);c?(c.classList.add("selected"),console.log("Applied visual selection to equipment")):console.log("Equipment element not found in DOM")}},300)}),document.addEventListener("musclesSelected",n=>{this.selectedMuscle=n.detail.item.name,console.log("Muscle selected:",this.selectedMuscle),this.menus.exercises&&(this.menus.exercises.filterDataForMenu(),setTimeout(()=>this.restoreExerciseSelection(),200),setTimeout(()=>this.restoreExerciseSelection(),400))}),document.addEventListener("equipmentSelected",n=>{this.selectedEquipment=n.detail.item.name,console.log("Equipment selected:",this.selectedEquipment),this.menus.exercises&&(this.menus.exercises.filterDataForMenu(),setTimeout(()=>this.restoreExerciseSelection(),200),setTimeout(()=>this.restoreExerciseSelection(),400))}),document.addEventListener("closeAllThumbnailMenus",n=>{var s;const i=(s=n.detail)==null?void 0:s.except;Object.entries(this.menus).forEach(([r,a])=>{r!==i&&a.closeMenu()})});const e=document.querySelector(".thumbnail-grid-container");if(e){e.addEventListener("mouseenter",()=>{e.classList.add("menu-visible");const i=document.querySelector(".thumbnail-grid-container-right");i&&(i.classList.remove("menu-visible","menu-active"),document.dispatchEvent(new CustomEvent("closeAllRightMenus",{detail:{except:null}})))});const n=e.querySelector(".menu-hint-tab");n&&n.addEventListener("click",i=>{i.stopPropagation(),this.toggleLeftMenu()}),this.createMobileToggleButton(e)}document.addEventListener("click",n=>{if(!n.target.closest(".mobile-menu-toggle")&&e&&!e.contains(n.target)){if(Object.values(this.menus).some(r=>r.hasRecentScrollInteraction&&r.hasRecentScrollInteraction()))return;e.classList.remove("menu-visible"),this.updateMobileToggleIcon(!1),Object.values(this.menus).some(r=>r.isOpen)&&Object.values(this.menus).forEach(r=>{r.isOpen&&r.closeMenu()})}})}restoreExerciseSelection(){if(this.selectedExerciseId&&this.menus.exercises&&this.menus.exercises.visibleContainer){const e=this.menus.exercises.visibleContainer.querySelector(`[data-id="${this.selectedExerciseId}"]`);e?(e.classList.add("selected"),console.log("Restored exercise selection:",this.selectedExerciseId)):console.log("Could not restore - element not found:",this.selectedExerciseId)}}updateAllSettings(e){this.settings={...this.settings,...e},Object.values(this.menus).forEach(n=>{n.applySettings(this.settings),n.updateGlowStyles(),n.updateThumbnailGlowStyles()})}getSettings(){return{...this.settings}}applySettings(e){this.updateAllSettings(e)}async copySettingsToClipboard(){const e=JSON.stringify(this.settings,null,2);try{await navigator.clipboard.writeText(e),alert("Multi-thumbnail menu settings copied to clipboard!")}catch(n){console.error("Failed to copy to clipboard:",n),alert("Failed to copy settings to clipboard.")}}createMobileToggleButton(e){}updateMobileToggleVisibility(){}toggleLeftMenu(){const e=document.querySelector(".thumbnail-grid-container");if(!e)return;if(e.classList.contains("mobile-open"))e.classList.remove("mobile-open"),e.style.left="-130px",this.updateMobileToggleIcon(!1);else{const i=document.querySelector(".thumbnail-grid-container-right");if(i&&i.classList.contains("mobile-open")){i.classList.remove("mobile-open"),i.style.right="-130px";const s=document.querySelector(".mobile-menu-toggle.right-toggle");s&&(s.innerHTML="▶")}e.classList.add("mobile-open"),e.style.left="0px",this.updateMobileToggleIcon(!0)}}updateMobileToggleIcon(e){}}class ar{constructor(e){this.menuType=e,this.isOpen=!1,this.scrollAmount=200,this.infoData=[],this.settings={widthPercentage:90,backgroundColor:"#000000",backgroundOpacity:.9,borderRadius:12,keepOpen:!1,glowColor:"#4a9eff",glowIntensity:.6,glowSize:20},this.initializeElements(),this.setupEventListeners(),this.loadInfoData()}initializeElements(){this.toggleBtn=document.getElementById(`${this.menuType}Toggle`),this.dropdown=document.querySelector(`.thumbnail-dropdown-right#${this.menuType}Dropdown`),this.scrollContainer=document.getElementById(`${this.menuType}Container`),this.grid=document.getElementById(`${this.menuType}Grid`),this.scrollUpBtn=document.getElementById(`${this.menuType}ScrollUp`),this.scrollDownBtn=document.getElementById(`${this.menuType}ScrollDown`),(!this.toggleBtn||!this.dropdown)&&console.error(`Failed to initialize ${this.menuType} menu elements`)}async loadInfoData(){try{const n=await(await fetch(Ni("data/right-menu-info.json"))).json();n[this.menuType]?(this.infoData=n[this.menuType].items||[],this.renderInfoItems()):(console.warn(`No data found for ${this.menuType}`),this.infoData=[])}catch(e){console.error("Error loading right menu info data:",e),this.infoData=[]}}renderInfoItems(){if(this.grid){if(this.grid.innerHTML="",this.infoData.length===0){this.grid.innerHTML='<div class="info-step-empty">No information available.</div>';return}this.infoData.forEach(e=>{const n=document.createElement("div");n.className="info-step-item",n.innerHTML=`
                <div class="info-step-title">${e.name}</div>
                <div class="info-step-text">${e.text||""}</div>
            `,this.grid.appendChild(n)})}}setupEventListeners(){this.toggleBtn&&(this.toggleBtn.addEventListener("click",e=>{e.stopPropagation(),this.toggleMenu()}),this.scrollUpBtn&&this.scrollDownBtn&&(this.scrollUpBtn.addEventListener("click",()=>{this.scrollContainer.scrollBy({top:-this.scrollAmount,behavior:"smooth"})}),this.scrollDownBtn.addEventListener("click",()=>{this.scrollContainer.scrollBy({top:this.scrollAmount,behavior:"smooth"})})))}toggleMenu(){this.isOpen?this.closeMenu():this.openMenu()}openMenu(){document.dispatchEvent(new CustomEvent("closeAllRightMenus",{detail:{except:this.menuType}})),document.dispatchEvent(new CustomEvent("closeAllThumbnailMenus",{detail:{except:null}}));const e=document.querySelector(".thumbnail-grid-container");e&&e.classList.remove("menu-visible","menu-active"),this.dropdown.classList.add("show"),this.toggleBtn.classList.add("active"),this.isOpen=!0;const n=document.querySelector(".thumbnail-grid-container-right");n&&n.classList.add("menu-active")}closeMenu(){this.dropdown.classList.remove("show"),this.toggleBtn.classList.remove("active"),this.isOpen=!1;const e=document.querySelector(".thumbnail-grid-container-right");e&&(document.querySelectorAll(".thumbnail-dropdown-right.show").length>0||e.classList.remove("menu-active"))}updateStyles(){if(!this.dropdown)return;const e=`${this.settings.widthPercentage}%`,n=this.settings.backgroundColor,i=this.settings.backgroundOpacity,s=`${this.settings.borderRadius}px`;this.dropdown.style.width=e,this.dropdown.style.maxWidth=e,this.dropdown.style.backgroundColor=`${n}${Math.round(i*255).toString(16).padStart(2,"0")}`,this.dropdown.style.borderRadius=s}getSettings(){return{...this.settings}}applySettings(e){this.settings={...this.settings,...e},this.updateStyles()}updateTitle(e){this.toggleBtn&&(this.toggleBtn.textContent=e)}updateContent(e){if(this.grid){if(this.grid.innerHTML="",!e||e.length===0){this.grid.innerHTML='<div class="info-step-empty">No information available.</div>';return}e.forEach(n=>{const i=document.createElement("div");i.className="info-step-item",i.innerHTML=`
                <div class="info-step-title">${n.heading||""}</div>
                <div class="info-step-text">${n.content||""}</div>
            `,this.grid.appendChild(i)})}}}class r_{constructor(){this.menus={},this.settings={widthPercentage:90,backgroundColor:"#000000",backgroundOpacity:.9,borderRadius:12,keepOpen:!1,glowColor:"#4a9eff",glowIntensity:.6,glowSize:20},this.initializeMenus(),this.setupGlobalListeners()}initializeMenus(){this.menus.info1=new ar("info1"),this.menus.info2=new ar("info2"),this.menus.info3=new ar("info3"),this.menus.info4=new ar("info4")}setupGlobalListeners(){document.addEventListener("closeAllRightMenus",n=>{var s;const i=(s=n.detail)==null?void 0:s.except;Object.entries(this.menus).forEach(([r,a])=>{r!==i&&a.closeMenu()})});const e=document.querySelector(".thumbnail-grid-container-right");if(e){e.addEventListener("mouseenter",()=>{e.classList.add("menu-visible");const i=document.querySelector(".thumbnail-grid-container");i&&(i.classList.remove("menu-visible","menu-active"),document.dispatchEvent(new CustomEvent("closeAllThumbnailMenus",{detail:{except:null}})))});const n=e.querySelector(".menu-hint-tab-right");n&&n.addEventListener("click",i=>{i.stopPropagation(),this.toggleRightMenu()}),this.createMobileToggleButton(e)}document.addEventListener("click",n=>{n.target.closest(".mobile-menu-toggle")||e&&!e.contains(n.target)&&(e.classList.remove("menu-visible"),window.innerWidth<=768&&(e.classList.remove("mobile-open"),e.style.right="-130px",this.updateMobileToggleIcon(!1)),Object.values(this.menus).some(s=>s.isOpen)&&Object.values(this.menus).forEach(s=>{s.isOpen&&s.closeMenu()}))})}updateAllSettings(e){this.settings={...this.settings,...e},Object.values(this.menus).forEach(n=>{n.applySettings(this.settings)})}getSettings(){return{...this.settings}}updateFromConfig(e){console.log("Updating right menu from config:",e);const n={exerciseInformation:"info1",howToGuide:"info2",setupGuide:"info3",alternativeExercises:"info4"};Object.entries(e).forEach(([i,s])=>{const r=n[i];r&&this.menus[r]&&(s.title&&this.menus[r].updateTitle(s.title),s.sections&&Array.isArray(s.sections)&&this.menus[r].updateContent(s.sections))})}copySettingsToClipboard(){const e=JSON.stringify(this.settings,null,2);navigator.clipboard.writeText(e).then(()=>{console.log("Right menu settings copied to clipboard")}).catch(n=>{console.error("Failed to copy settings:",n)})}createMobileToggleButton(e){}updateMobileToggleVisibility(){}toggleRightMenu(){const e=document.querySelector(".thumbnail-grid-container-right");if(!e)return;if(e.classList.contains("mobile-open"))e.classList.remove("mobile-open"),e.classList.remove("menu-visible"),e.style.right="-130px",this.updateMobileToggleIcon(!1),Object.values(this.menus).forEach(i=>{i.isOpen&&i.closeMenu()});else{const i=document.querySelector(".thumbnail-grid-container");if(i&&i.classList.contains("mobile-open")){i.classList.remove("mobile-open"),i.style.left="-130px";const s=document.querySelector(".mobile-menu-toggle.left-toggle");s&&(s.innerHTML="◀")}e.classList.add("mobile-open"),e.classList.add("menu-visible"),e.style.right="0px",this.updateMobileToggleIcon(!0)}}updateMobileToggleIcon(e){this.mobileToggleButton&&(this.mobileToggleButton.innerHTML=e?"✕":"▶")}}class o_{constructor(){console.log("[FlexFrame AR] ARHandler initialized"),this.currentConfig=null,this.qrModal=null,this.branding={logoUrl:null,websiteUrl:"https://thegymmanagerblog.com",companyName:"FlexFrame",callToAction:"Visit FlexFrame"},t,this.setupARButton()}setBranding(e){e.logoUrl&&(this.branding.logoUrl=e.logoUrl),e.websiteUrl&&(this.branding.websiteUrl=e.websiteUrl),e.companyName&&(this.branding.companyName=e.companyName),e.callToAction&&(this.branding.callToAction=e.callToAction),console.log("[FlexFrame AR] Branding updated:",this.branding)}getDeviceType(){const e=navigator.userAgent.toLowerCase();return/iphone|ipad|ipod/.test(e)?"ios":/android/.test(e)?"android":"desktop"}supportsAR(){const e=this.getDeviceType();if(e==="ios"){const n=document.createElement("a");return n.relList&&n.relList.supports&&n.relList.supports("ar")}else if(e==="android")return!0;return!1}updateConfig(e){this.currentConfig=e,console.log("[FlexFrame AR] Config updated:",e==null?void 0:e.ar)}setupARButton(){const e=()=>{const n=document.getElementById("ar-btn");n?(n.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),this.launchAR()}),console.log("[FlexFrame AR] AR button handler attached")):setTimeout(e,500)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):setTimeout(e,100)}launchAR(){var n;if(console.log("[FlexFrame AR] Launch AR triggered"),!((n=this.currentConfig)!=null&&n.ar)){console.warn("[FlexFrame AR] No AR config available"),this.showNoARMessage();return}const e=this.getDeviceType();switch(console.log("[FlexFrame AR] Device type:",e),e){case"ios":this.launchIOSAR();break;case"android":this.launchAndroidAR();break;case"desktop":this.showQRCodeModal();break}}launchIOSAR(){const e=this.currentConfig.ar.usdz;if(!e){console.warn("[FlexFrame AR] No USDZ file available"),this.launchAndroidAR();return}console.log("[FlexFrame AR] Launching iOS AR with USDZ:",e);let n=e;const i=[];this.branding.websiteUrl&&(i.push(`callToAction=${encodeURIComponent(this.branding.callToAction)}`),i.push(`checkoutTitle=${encodeURIComponent(this.branding.companyName)}`),i.push(`checkoutSubtitle=${encodeURIComponent("Tap to visit website")}`),i.push(`canonicalWebPageURL=${encodeURIComponent(this.branding.websiteUrl)}`)),this.branding.logoUrl&&i.push(`custom=${encodeURIComponent(this.branding.logoUrl)}`),i.length>0&&(n+="#"+i.join("&")),console.log("[FlexFrame AR] iOS AR URL with branding:",n);const s=document.createElement("a");s.setAttribute("rel","ar"),s.setAttribute("href",n);const r=document.createElement("img");r.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",r.style.width="1px",r.style.height="1px",s.appendChild(r),document.body.appendChild(s),s.click(),document.body.removeChild(s)}launchAndroidAR(){const e=this.currentConfig.ar.glb;if(!e){console.warn("[FlexFrame AR] No GLB file available for AR"),this.showNoARMessage();return}console.log("[FlexFrame AR] Launching Android AR with GLB:",e);let n=[`file=${encodeURIComponent(e)}`,"mode=ar_preferred",`title=${encodeURIComponent(this.currentConfig.exerciseId||"Exercise")}`];this.branding.websiteUrl&&(n.push(`link=${encodeURIComponent(this.branding.websiteUrl)}`),n.push(`linkText=${encodeURIComponent(this.branding.callToAction)}`));const i="intent://arvr.google.com/scene-viewer/1.0?"+n.join("&")+`#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(e)};end;`;console.log("[FlexFrame AR] Android AR URL with branding:",i),window.location.href=i}showQRCodeModal(){console.log("[FlexFrame AR] Showing QR code modal for desktop"),this.qrModal||this.createQRModal();const e=this.generateARPageUrl();this.updateQRCode(e),this.qrModal.style.display="flex"}createQRModal(){var h;const e=((h=window.flexframeSettings)==null?void 0:h.primaryColor)||"#4a9eff",i=(c=>{const d=parseInt(c.slice(1,3),16),u=parseInt(c.slice(3,5),16),p=parseInt(c.slice(5,7),16);return{r:d,g:u,b:p}})(e),s=`rgb(${Math.floor(i.r*.15)}, ${Math.floor(i.g*.15)}, ${Math.floor(i.b*.2+20)})`,r=`rgb(${Math.floor(i.r*.1)}, ${Math.floor(i.g*.12)}, ${Math.floor(i.b*.18+30)})`;this.qrModal=document.createElement("div"),this.qrModal.id="ar-qr-modal",this.qrModal.innerHTML=`
            <div class="ar-qr-modal-overlay" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.85);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                backdrop-filter: blur(10px);
            ">
                <div class="ar-qr-modal-content" style="
                    background: linear-gradient(135deg, ${s} 0%, ${r} 100%);
                    border-radius: 20px;
                    padding: 40px;
                    text-align: center;
                    max-width: 400px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                    border: 1px solid ${e}4D;
                ">
                    <div class="ar-qr-header" style="margin-bottom: 24px;">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style="margin-bottom: 16px;">
                            <path d="M3 4v6h2V6h4V4H3zm18 0h-6v2h4v4h2V4zM3 20v-6h2v4h4v2H3zm18 0h-6v-2h4v-4h2v6z" fill="${e}"/>
                            <path d="M12 8l-4 6h3v4h2v-4h3l-4-6z" fill="${e}"/>
                        </svg>
                        <h2 style="
                            color: white;
                            font-size: 24px;
                            font-weight: 700;
                            margin: 0 0 8px 0;
                        ">View in AR</h2>
                        <p style="
                            color: rgba(255, 255, 255, 0.7);
                            font-size: 14px;
                            margin: 0;
                        ">Scan with your phone to view in augmented reality</p>
                    </div>
                    
                    <div id="ar-qr-code" style="
                        background: white;
                        padding: 20px;
                        border-radius: 12px;
                        display: inline-block;
                        margin-bottom: 24px;
                        border: 3px solid ${e};
                    ">
                        <!-- QR code will be inserted here -->
                        <div style="width: 200px; height: 200px; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
                            <span style="color: #666; font-size: 12px;">Loading QR...</span>
                        </div>
                    </div>
                    
                    <div class="ar-qr-instructions" style="
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 12px;
                        margin-bottom: 24px;
                    ">
                        <p style="margin: 0 0 8px 0;"><strong style="color: white;">iOS:</strong> Open Camera app and point at QR code</p>
                        <p style="margin: 0;"><strong style="color: white;">Android:</strong> Use Google Lens or QR scanner</p>
                    </div>
                    
                    <button id="ar-qr-close" style="
                        background: ${e};
                        border: none;
                        color: white;
                        padding: 12px 32px;
                        border-radius: 8px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    ">Close</button>
                </div>
            </div>
        `,document.body.appendChild(this.qrModal),this.qrModal.querySelector("#ar-qr-close").addEventListener("click",()=>{this.qrModal.style.display="none"});const l=this.qrModal.querySelector(".ar-qr-modal-overlay");l.addEventListener("click",c=>{c.target===l&&(this.qrModal.style.display="none")}),document.addEventListener("keydown",c=>{c.key==="Escape"&&this.qrModal.style.display==="flex"&&(this.qrModal.style.display="none")})}generateARPageUrl(){var l,h,c,d,u,p;const e=((h=(l=this.currentConfig)==null?void 0:l.ar)==null?void 0:h.glb)||((c=this.currentConfig)==null?void 0:c.modelUrlSQ),n=(u=(d=this.currentConfig)==null?void 0:d.ar)==null?void 0:u.usdz,i=((p=this.currentConfig)==null?void 0:p.exerciseId)||"exercise",s=new URLSearchParams({glb:e||"",usdz:n||"",title:i});return this.branding.logoUrl&&s.set("logo",this.branding.logoUrl),this.branding.websiteUrl&&s.set("website",this.branding.websiteUrl),this.branding.companyName&&s.set("company",this.branding.companyName),this.branding.callToAction&&s.set("cta",this.branding.callToAction),`${window.location.origin}/wp-content/plugins/flexframe-v28/viewer/ar-viewer.html?${s.toString()}`}updateQRCode(e){const n=document.getElementById("ar-qr-code");if(!n)return;const i=`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(e)}`;n.innerHTML=`
            <img src="${i}" alt="Scan to view in AR" style="width: 200px; height: 200px; display: block;">
        `,console.log("[FlexFrame AR] QR code generated for URL:",e)}showNoARMessage(){alert("AR is not available for this exercise. Please ensure the exercise has AR models configured.")}hideQRModal(){this.qrModal&&(this.qrModal.style.display="none")}}const ic=new o_;function sc(o,e){if(e===Bh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),o;if(e===ea||e===Ec){let n=o.getIndex();if(n===null){const a=[],l=o.getAttribute("position");if(l!==void 0){for(let h=0;h<l.count;h++)a.push(h);o.setIndex(a),n=o.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),o}const i=n.count-2,s=[];if(e===ea)for(let a=1;a<=i;a++)s.push(n.getX(0)),s.push(n.getX(a)),s.push(n.getX(a+1));else for(let a=0;a<i;a++)a%2===0?(s.push(n.getX(a)),s.push(n.getX(a+1)),s.push(n.getX(a+2))):(s.push(n.getX(a+2)),s.push(n.getX(a+1)),s.push(n.getX(a)));s.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=o.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),o}class a_ extends hi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(n){return new u_(n)}),this.register(function(n){return new p_(n)}),this.register(function(n){return new S_(n)}),this.register(function(n){return new M_(n)}),this.register(function(n){return new E_(n)}),this.register(function(n){return new m_(n)}),this.register(function(n){return new g_(n)}),this.register(function(n){return new __(n)}),this.register(function(n){return new y_(n)}),this.register(function(n){return new d_(n)}),this.register(function(n){return new x_(n)}),this.register(function(n){return new f_(n)}),this.register(function(n){return new b_(n)}),this.register(function(n){return new v_(n)}),this.register(function(n){return new c_(n)}),this.register(function(n){return new w_(n)}),this.register(function(n){return new T_(n)})}load(e,n,i,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=xs.extractUrlBase(e);a=xs.resolveURL(c,this.path)}else a=xs.extractUrlBase(e);this.manager.itemStart(e);const l=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},h=new Ra(this.manager);h.setPath(this.path),h.setResponseType("arraybuffer"),h.setRequestHeader(this.requestHeader),h.setWithCredentials(this.withCredentials),h.load(e,function(c){try{r.parse(c,a,function(d){n(d),r.manager.itemEnd(e)},l)}catch(d){l(d)}},i,l)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,n,i,s){let r;const a={},l={},h=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(h.decode(new Uint8Array(e,0,4))===Jc){try{a[Ge.KHR_BINARY_GLTF]=new A_(e)}catch(u){s&&s(u);return}r=JSON.parse(a[Ge.KHR_BINARY_GLTF].content)}else r=JSON.parse(h.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new z_(r,{path:n||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){const u=this.pluginCallbacks[d](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),l[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let d=0;d<r.extensionsUsed.length;++d){const u=r.extensionsUsed[d],p=r.extensionsRequired||[];switch(u){case Ge.KHR_MATERIALS_UNLIT:a[u]=new h_;break;case Ge.KHR_DRACO_MESH_COMPRESSION:a[u]=new C_(r,this.dracoLoader);break;case Ge.KHR_TEXTURE_TRANSFORM:a[u]=new R_;break;case Ge.KHR_MESH_QUANTIZATION:a[u]=new P_;break;default:p.indexOf(u)>=0&&l[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(l),c.parse(i,s)}parseAsync(e,n){const i=this;return new Promise(function(s,r){i.parse(e,n,s,r)})}}function l_(){let o={};return{get:function(e){return o[e]},add:function(e,n){o[e]=n},remove:function(e){delete o[e]},removeAll:function(){o={}}}}const Ge={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class c_{constructor(e){this.parser=e,this.name=Ge.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,n=this.parser.json.nodes||[];for(let i=0,s=n.length;i<s;i++){const r=n[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const n=this.parser,i="light:"+e;let s=n.cache.get(i);if(s)return s;const r=n.json,h=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const d=new _e(16777215);h.color!==void 0&&d.setRGB(h.color[0],h.color[1],h.color[2],wt);const u=h.range!==void 0?h.range:0;switch(h.type){case"directional":c=new Wc(d),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new gu(d),c.distance=u;break;case"spot":c=new fu(d),c.distance=u,h.spot=h.spot||{},h.spot.innerConeAngle=h.spot.innerConeAngle!==void 0?h.spot.innerConeAngle:0,h.spot.outerConeAngle=h.spot.outerConeAngle!==void 0?h.spot.outerConeAngle:Math.PI/4,c.angle=h.spot.outerConeAngle,c.penumbra=1-h.spot.innerConeAngle/h.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+h.type)}return c.position.set(0,0,0),En(c,h),h.intensity!==void 0&&(c.intensity=h.intensity),c.name=n.createUniqueName(h.name||"light_"+e),s=Promise.resolve(c),n.cache.add(i,s),s}getDependency(e,n){if(e==="light")return this._loadLight(n)}createNodeAttachment(e){const n=this,i=this.parser,r=i.json.nodes[e],l=(r.extensions&&r.extensions[this.name]||{}).light;return l===void 0?null:this._loadLight(l).then(function(h){return i._getNodeRef(n.cache,l,h)})}}class h_{constructor(){this.name=Ge.KHR_MATERIALS_UNLIT}getMaterialType(){return oi}extendParams(e,n,i){const s=[];e.color=new _e(1,1,1),e.opacity=1;const r=n.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],wt),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(i.assignTexture(e,"map",r.baseColorTexture,_t))}return Promise.all(s)}}class d_{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,n){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(n.emissiveIntensity=r),Promise.resolve()}}class u_{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Nt}extendMaterialParams(e,n){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(n.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(i.assignTexture(n,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(n.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(i.assignTexture(n,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(i.assignTexture(n,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const l=a.clearcoatNormalTexture.scale;n.clearcoatNormalScale=new Ce(l,l)}return Promise.all(r)}}class p_{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_DISPERSION}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Nt}extendMaterialParams(e,n){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return n.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class f_{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Nt}extendMaterialParams(e,n){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(n.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(i.assignTexture(n,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(n.iridescenceIOR=a.iridescenceIor),n.iridescenceThicknessRange===void 0&&(n.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(i.assignTexture(n,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class m_{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_SHEEN}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Nt}extendMaterialParams(e,n){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];n.sheenColor=new _e(0,0,0),n.sheenRoughness=0,n.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const l=a.sheenColorFactor;n.sheenColor.setRGB(l[0],l[1],l[2],wt)}return a.sheenRoughnessFactor!==void 0&&(n.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(i.assignTexture(n,"sheenColorMap",a.sheenColorTexture,_t)),a.sheenRoughnessTexture!==void 0&&r.push(i.assignTexture(n,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class g_{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Nt}extendMaterialParams(e,n){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(n.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(i.assignTexture(n,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class __{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_VOLUME}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Nt}extendMaterialParams(e,n){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];n.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(i.assignTexture(n,"thicknessMap",a.thicknessTexture)),n.attenuationDistance=a.attenuationDistance||1/0;const l=a.attenuationColor||[1,1,1];return n.attenuationColor=new _e().setRGB(l[0],l[1],l[2],wt),Promise.all(r)}}class y_{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_IOR}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Nt}extendMaterialParams(e,n){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return n.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class x_{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_SPECULAR}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Nt}extendMaterialParams(e,n){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];n.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(i.assignTexture(n,"specularIntensityMap",a.specularTexture));const l=a.specularColorFactor||[1,1,1];return n.specularColor=new _e().setRGB(l[0],l[1],l[2],wt),a.specularColorTexture!==void 0&&r.push(i.assignTexture(n,"specularColorMap",a.specularColorTexture,_t)),Promise.all(r)}}class v_{constructor(e){this.parser=e,this.name=Ge.EXT_MATERIALS_BUMP}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Nt}extendMaterialParams(e,n){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return n.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(i.assignTexture(n,"bumpMap",a.bumpTexture)),Promise.all(r)}}class b_{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Nt}extendMaterialParams(e,n){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(n.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(n.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(i.assignTexture(n,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class S_{constructor(e){this.parser=e,this.name=Ge.KHR_TEXTURE_BASISU}loadTexture(e){const n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=n.options.ktx2Loader;if(!a){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return n.loadTextureImage(e,r.source,a)}}class M_{constructor(e){this.parser=e,this.name=Ge.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const n=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[n])return null;const a=r.extensions[n],l=s.images[a.source];let h=i.textureLoader;if(l.uri){const c=i.options.manager.getHandler(l.uri);c!==null&&(h=c)}return this.detectSupport().then(function(c){if(c)return i.loadTextureImage(e,a.source,h);if(s.extensionsRequired&&s.extensionsRequired.indexOf(n)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const n=new Image;n.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",n.onload=n.onerror=function(){e(n.height===1)}})),this.isSupported}}class E_{constructor(e){this.parser=e,this.name=Ge.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const n=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[n])return null;const a=r.extensions[n],l=s.images[a.source];let h=i.textureLoader;if(l.uri){const c=i.options.manager.getHandler(l.uri);c!==null&&(h=c)}return this.detectSupport().then(function(c){if(c)return i.loadTextureImage(e,a.source,h);if(s.extensionsRequired&&s.extensionsRequired.indexOf(n)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const n=new Image;n.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",n.onload=n.onerror=function(){e(n.height===1)}})),this.isSupported}}class w_{constructor(e){this.name=Ge.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const n=this.parser.json,i=n.bufferViews[e];if(i.extensions&&i.extensions[this.name]){const s=i.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(l){const h=s.byteOffset||0,c=s.byteLength||0,d=s.count,u=s.byteStride,p=new Uint8Array(l,h,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(d,u,p,s.mode,s.filter).then(function(m){return m.buffer}):a.ready.then(function(){const m=new ArrayBuffer(d*u);return a.decodeGltfBuffer(new Uint8Array(m),d,u,p,s.mode,s.filter),m})})}else return null}}class T_{constructor(e){this.name=Ge.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const n=this.parser.json,i=n.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const s=n.meshes[i.mesh];for(const c of s.primitives)if(c.mode!==Qt.TRIANGLES&&c.mode!==Qt.TRIANGLE_STRIP&&c.mode!==Qt.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=i.extensions[this.name].attributes,l=[],h={};for(const c in a)l.push(this.parser.getDependency("accessor",a[c]).then(d=>(h[c]=d,h[c])));return l.length<1?null:(l.push(this.parser.createNodeMesh(e)),Promise.all(l).then(c=>{const d=c.pop(),u=d.isGroup?d.children:[d],p=c[0].count,m=[];for(const y of u){const _=new Fe,g=new D,f=new Xt,S=new D(1,1,1),w=new jd(y.geometry,y.material,p);for(let x=0;x<p;x++)h.TRANSLATION&&g.fromBufferAttribute(h.TRANSLATION,x),h.ROTATION&&f.fromBufferAttribute(h.ROTATION,x),h.SCALE&&S.fromBufferAttribute(h.SCALE,x),w.setMatrixAt(x,_.compose(g,f,S));for(const x in h)if(x==="_COLOR_0"){const P=h[x];w.instanceColor=new na(P.array,P.itemSize,P.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&y.geometry.setAttribute(x,h[x]);dt.prototype.copy.call(w,y),this.parser.assignFinalMaterial(w),m.push(w)}return d.isGroup?(d.clear(),d.add(...m),d):m[0]}))}}const Jc="glTF",fs=12,rc={JSON:1313821514,BIN:5130562};class A_{constructor(e){this.name=Ge.KHR_BINARY_GLTF,this.content=null,this.body=null;const n=new DataView(e,0,fs),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:n.getUint32(4,!0),length:n.getUint32(8,!0)},this.header.magic!==Jc)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-fs,r=new DataView(e,fs);let a=0;for(;a<s;){const l=r.getUint32(a,!0);a+=4;const h=r.getUint32(a,!0);if(a+=4,h===rc.JSON){const c=new Uint8Array(e,fs+a,l);this.content=i.decode(c)}else if(h===rc.BIN){const c=fs+a;this.body=e.slice(c,c+l)}a+=l}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class C_{constructor(e,n){if(!n)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ge.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=n,this.dracoLoader.preload()}decodePrimitive(e,n){const i=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,l={},h={},c={};for(const d in a){const u=la[d]||d.toLowerCase();l[u]=a[d]}for(const d in e.attributes){const u=la[d]||d.toLowerCase();if(a[d]!==void 0){const p=i.accessors[e.attributes[d]],m=Ui[p.componentType];c[u]=m.name,h[u]=p.normalized===!0}}return n.getDependency("bufferView",r).then(function(d){return new Promise(function(u,p){s.decodeDracoFile(d,function(m){for(const y in m.attributes){const _=m.attributes[y],g=h[y];g!==void 0&&(_.normalized=g)}u(m)},l,c,wt,p)})})}}class R_{constructor(){this.name=Ge.KHR_TEXTURE_TRANSFORM}extendTexture(e,n){return(n.texCoord===void 0||n.texCoord===e.channel)&&n.offset===void 0&&n.rotation===void 0&&n.scale===void 0||(e=e.clone(),n.texCoord!==void 0&&(e.channel=n.texCoord),n.offset!==void 0&&e.offset.fromArray(n.offset),n.rotation!==void 0&&(e.rotation=n.rotation),n.scale!==void 0&&e.repeat.fromArray(n.scale),e.needsUpdate=!0),e}}class P_{constructor(){this.name=Ge.KHR_MESH_QUANTIZATION}}class eh extends Cs{constructor(e,n,i,s){super(e,n,i,s)}copySampleValue_(e){const n=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)n[a]=i[r+a];return n}interpolate_(e,n,i,s){const r=this.resultBuffer,a=this.sampleValues,l=this.valueSize,h=l*2,c=l*3,d=s-n,u=(i-n)/d,p=u*u,m=p*u,y=e*c,_=y-c,g=-2*m+3*p,f=m-p,S=1-g,w=f-p+u;for(let x=0;x!==l;x++){const P=a[_+x+l],I=a[_+x+h]*d,A=a[y+x+l],C=a[y+x]*d;r[x]=S*P+w*I+g*A+f*C}return r}}const I_=new Xt;class L_ extends eh{interpolate_(e,n,i,s){const r=super.interpolate_(e,n,i,s);return I_.fromArray(r).normalize().toArray(r),r}}const Qt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ui={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},oc={9728:Ot,9729:ht,9984:fc,9985:cr,9986:ms,9987:un},ac={33071:Jt,33648:vr,10497:zi},mo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},la={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},kn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},D_={CUBICSPLINE:void 0,LINEAR:Ss,STEP:bs},go={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function F_(o){return o.DefaultMaterial===void 0&&(o.DefaultMaterial=new Cr({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ct})),o.DefaultMaterial}function ti(o,e,n){for(const i in n.extensions)o[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=n.extensions[i])}function En(o,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(o.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function U_(o,e,n){let i=!1,s=!1,r=!1;for(let c=0,d=e.length;c<d;c++){const u=e[c];if(u.POSITION!==void 0&&(i=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),i&&s&&r)break}if(!i&&!s&&!r)return Promise.resolve(o);const a=[],l=[],h=[];for(let c=0,d=e.length;c<d;c++){const u=e[c];if(i){const p=u.POSITION!==void 0?n.getDependency("accessor",u.POSITION):o.attributes.position;a.push(p)}if(s){const p=u.NORMAL!==void 0?n.getDependency("accessor",u.NORMAL):o.attributes.normal;l.push(p)}if(r){const p=u.COLOR_0!==void 0?n.getDependency("accessor",u.COLOR_0):o.attributes.color;h.push(p)}}return Promise.all([Promise.all(a),Promise.all(l),Promise.all(h)]).then(function(c){const d=c[0],u=c[1],p=c[2];return i&&(o.morphAttributes.position=d),s&&(o.morphAttributes.normal=u),r&&(o.morphAttributes.color=p),o.morphTargetsRelative=!0,o})}function N_(o,e){if(o.updateMorphTargets(),e.weights!==void 0)for(let n=0,i=e.weights.length;n<i;n++)o.morphTargetInfluences[n]=e.weights[n];if(e.extras&&Array.isArray(e.extras.targetNames)){const n=e.extras.targetNames;if(o.morphTargetInfluences.length===n.length){o.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++)o.morphTargetDictionary[n[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function O_(o){let e;const n=o.extensions&&o.extensions[Ge.KHR_DRACO_MESH_COMPRESSION];if(n?e="draco:"+n.bufferView+":"+n.indices+":"+_o(n.attributes):e=o.indices+":"+_o(o.attributes)+":"+o.mode,o.targets!==void 0)for(let i=0,s=o.targets.length;i<s;i++)e+=":"+_o(o.targets[i]);return e}function _o(o){let e="";const n=Object.keys(o).sort();for(let i=0,s=n.length;i<s;i++)e+=n[i]+":"+o[n[i]]+";";return e}function ca(o){switch(o){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function B_(o){return o.search(/\.jpe?g($|\?)/i)>0||o.search(/^data\:image\/jpeg/)===0?"image/jpeg":o.search(/\.webp($|\?)/i)>0||o.search(/^data\:image\/webp/)===0?"image/webp":o.search(/\.ktx2($|\?)/i)>0||o.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const k_=new Fe;class z_{constructor(e={},n={}){this.json=e,this.extensions={},this.plugins={},this.options=n,this.cache=new l_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const l=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(l)===!0;const h=l.match(/Version\/(\d+)/);s=i&&h?parseInt(h[1],10):-1,r=l.indexOf("Firefox")>-1,a=r?l.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&s<17||r&&a<98?this.textureLoader=new Gc(this.options.manager):this.textureLoader=new xu(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ra(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,n){const i=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(a){const l={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:i,userData:{}};return ti(r,l,s),En(l,s),Promise.all(i._invokeAll(function(h){return h.afterRoot&&h.afterRoot(l)})).then(function(){for(const h of l.scenes)h.updateMatrixWorld();e(l)})}).catch(n)}_markDefs(){const e=this.json.nodes||[],n=this.json.skins||[],i=this.json.meshes||[];for(let s=0,r=n.length;s<r;s++){const a=n[s].joints;for(let l=0,h=a.length;l<h;l++)e[a[l]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(i[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,n){n!==void 0&&(e.refs[n]===void 0&&(e.refs[n]=e.uses[n]=0),e.refs[n]++)}_getNodeRef(e,n,i){if(e.refs[n]<=1)return i;const s=i.clone(),r=(a,l)=>{const h=this.associations.get(a);h!=null&&this.associations.set(l,h);for(const[c,d]of a.children.entries())r(d,l.children[c])};return r(i,s),s.name+="_instance_"+e.uses[n]++,s}_invokeOne(e){const n=Object.values(this.plugins);n.push(this);for(let i=0;i<n.length;i++){const s=e(n[i]);if(s)return s}return null}_invokeAll(e){const n=Object.values(this.plugins);n.unshift(this);const i=[];for(let s=0;s<n.length;s++){const r=e(n[s]);r&&i.push(r)}return i}getDependency(e,n){const i=e+":"+n;let s=this.cache.get(i);if(!s){switch(e){case"scene":s=this.loadScene(n);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(n)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(n)});break;case"accessor":s=this.loadAccessor(n);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(n)});break;case"buffer":s=this.loadBuffer(n);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(n)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(n)});break;case"skin":s=this.loadSkin(n);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(n)});break;case"camera":s=this.loadCamera(n);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,n)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(i,s)}return s}getDependencies(e){let n=this.cache.get(e);if(!n){const i=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];n=Promise.all(s.map(function(r,a){return i.getDependency(e,a)})),this.cache.add(e,n)}return n}loadBuffer(e){const n=this.json.buffers[e],i=this.fileLoader;if(n.type&&n.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+n.type+" buffer type is not supported.");if(n.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ge.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){i.load(xs.resolveURL(n.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+n.uri+'".'))})})}loadBufferView(e){const n=this.json.bufferViews[e];return this.getDependency("buffer",n.buffer).then(function(i){const s=n.byteLength||0,r=n.byteOffset||0;return i.slice(r,r+s)})}loadAccessor(e){const n=this,i=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=mo[s.type],l=Ui[s.componentType],h=s.normalized===!0,c=new l(s.count*a);return Promise.resolve(new Et(c,a,h))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const l=a[0],h=mo[s.type],c=Ui[s.componentType],d=c.BYTES_PER_ELEMENT,u=d*h,p=s.byteOffset||0,m=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,y=s.normalized===!0;let _,g;if(m&&m!==u){const f=Math.floor(p/m),S="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+f+":"+s.count;let w=n.cache.get(S);w||(_=new c(l,f*m,s.count*m/d),w=new Gd(_,m/d),n.cache.add(S,w)),g=new Sa(w,h,p%m/d,y)}else l===null?_=new c(s.count*h):_=new c(l,p,s.count*h),g=new Et(_,h,y);if(s.sparse!==void 0){const f=mo.SCALAR,S=Ui[s.sparse.indices.componentType],w=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,P=new S(a[1],w,s.sparse.count*f),I=new c(a[2],x,s.sparse.count*h);l!==null&&(g=new Et(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let A=0,C=P.length;A<C;A++){const E=P[A];if(g.setX(E,I[A*h]),h>=2&&g.setY(E,I[A*h+1]),h>=3&&g.setZ(E,I[A*h+2]),h>=4&&g.setW(E,I[A*h+3]),h>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=y}return g})}loadTexture(e){const n=this.json,i=this.options,r=n.textures[e].source,a=n.images[r];let l=this.textureLoader;if(a.uri){const h=i.manager.getHandler(a.uri);h!==null&&(l=h)}return this.loadTextureImage(e,r,l)}loadTextureImage(e,n,i){const s=this,r=this.json,a=r.textures[e],l=r.images[n],h=(l.uri||l.bufferView)+":"+a.sampler;if(this.textureCache[h])return this.textureCache[h];const c=this.loadImageSource(n,i).then(function(d){d.flipY=!1,d.name=a.name||l.name||"",d.name===""&&typeof l.uri=="string"&&l.uri.startsWith("data:image/")===!1&&(d.name=l.uri);const p=(r.samplers||{})[a.sampler]||{};return d.magFilter=oc[p.magFilter]||ht,d.minFilter=oc[p.minFilter]||un,d.wrapS=ac[p.wrapS]||zi,d.wrapT=ac[p.wrapT]||zi,d.generateMipmaps=!d.isCompressedTexture&&d.minFilter!==Ot&&d.minFilter!==ht,s.associations.set(d,{textures:e}),d}).catch(function(){return null});return this.textureCache[h]=c,c}loadImageSource(e,n){const i=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=s.images[e],l=self.URL||self.webkitURL;let h=a.uri||"",c=!1;if(a.bufferView!==void 0)h=i.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const p=new Blob([u],{type:a.mimeType});return h=l.createObjectURL(p),h});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const d=Promise.resolve(h).then(function(u){return new Promise(function(p,m){let y=p;n.isImageBitmapLoader===!0&&(y=function(_){const g=new yt(_);g.needsUpdate=!0,p(g)}),n.load(xs.resolveURL(u,r.path),y,void 0,m)})}).then(function(u){return c===!0&&l.revokeObjectURL(h),En(u,a),u.userData.mimeType=a.mimeType||B_(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",h),u});return this.sourceCache[e]=d,d}assignTexture(e,n,i,s){const r=this;return this.getDependency("texture",i.index).then(function(a){if(!a)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(a=a.clone(),a.channel=i.texCoord),r.extensions[Ge.KHR_TEXTURE_TRANSFORM]){const l=i.extensions!==void 0?i.extensions[Ge.KHR_TEXTURE_TRANSFORM]:void 0;if(l){const h=r.associations.get(a);a=r.extensions[Ge.KHR_TEXTURE_TRANSFORM].extendTexture(a,l),r.associations.set(a,h)}}return s!==void 0&&(a.colorSpace=s),e[n]=a,a})}assignFinalMaterial(e){const n=e.geometry;let i=e.material;const s=n.attributes.tangent===void 0,r=n.attributes.color!==void 0,a=n.attributes.normal===void 0;if(e.isPoints){const l="PointsMaterial:"+i.uuid;let h=this.cache.get(l);h||(h=new Ta,cn.prototype.copy.call(h,i),h.color.copy(i.color),h.map=i.map,h.sizeAttenuation=!1,this.cache.add(l,h)),i=h}else if(e.isLine){const l="LineBasicMaterial:"+i.uuid;let h=this.cache.get(l);h||(h=new Ar,cn.prototype.copy.call(h,i),h.color.copy(i.color),h.map=i.map,this.cache.add(l,h)),i=h}if(s||r||a){let l="ClonedMaterial:"+i.uuid+":";s&&(l+="derivative-tangents:"),r&&(l+="vertex-colors:"),a&&(l+="flat-shading:");let h=this.cache.get(l);h||(h=i.clone(),r&&(h.vertexColors=!0),a&&(h.flatShading=!0),s&&(h.normalScale&&(h.normalScale.y*=-1),h.clearcoatNormalScale&&(h.clearcoatNormalScale.y*=-1)),this.cache.add(l,h),this.associations.set(h,this.associations.get(i))),i=h}e.material=i}getMaterialType(){return Cr}loadMaterial(e){const n=this,i=this.json,s=this.extensions,r=i.materials[e];let a;const l={},h=r.extensions||{},c=[];if(h[Ge.KHR_MATERIALS_UNLIT]){const u=s[Ge.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(l,r,n))}else{const u=r.pbrMetallicRoughness||{};if(l.color=new _e(1,1,1),l.opacity=1,Array.isArray(u.baseColorFactor)){const p=u.baseColorFactor;l.color.setRGB(p[0],p[1],p[2],wt),l.opacity=p[3]}u.baseColorTexture!==void 0&&c.push(n.assignTexture(l,"map",u.baseColorTexture,_t)),l.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,l.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(n.assignTexture(l,"metalnessMap",u.metallicRoughnessTexture)),c.push(n.assignTexture(l,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(p){return p.getMaterialType&&p.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(p){return p.extendMaterialParams&&p.extendMaterialParams(e,l)})))}r.doubleSided===!0&&(l.side=at);const d=r.alphaMode||go.OPAQUE;if(d===go.BLEND?(l.transparent=!0,l.depthWrite=!1):(l.transparent=!1,d===go.MASK&&(l.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==oi&&(c.push(n.assignTexture(l,"normalMap",r.normalTexture)),l.normalScale=new Ce(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;l.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==oi&&(c.push(n.assignTexture(l,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(l.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==oi){const u=r.emissiveFactor;l.emissive=new _e().setRGB(u[0],u[1],u[2],wt)}return r.emissiveTexture!==void 0&&a!==oi&&c.push(n.assignTexture(l,"emissiveMap",r.emissiveTexture,_t)),Promise.all(c).then(function(){const u=new a(l);return r.name&&(u.name=r.name),En(u,r),n.associations.set(u,{materials:e}),r.extensions&&ti(s,u,r),u})}createUniqueName(e){const n=Je.sanitizeNodeName(e||"");return n in this.nodeNamesUsed?n+"_"+ ++this.nodeNamesUsed[n]:(this.nodeNamesUsed[n]=0,n)}loadGeometries(e){const n=this,i=this.extensions,s=this.primitiveCache;function r(l){return i[Ge.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(l,n).then(function(h){return lc(h,l,n)})}const a=[];for(let l=0,h=e.length;l<h;l++){const c=e[l],d=O_(c),u=s[d];if(u)a.push(u.promise);else{let p;c.extensions&&c.extensions[Ge.KHR_DRACO_MESH_COMPRESSION]?p=r(c):p=lc(new Bt,c,n),s[d]={primitive:c,promise:p},a.push(p)}}return Promise.all(a)}loadMesh(e){const n=this,i=this.json,s=this.extensions,r=i.meshes[e],a=r.primitives,l=[];for(let h=0,c=a.length;h<c;h++){const d=a[h].material===void 0?F_(this.cache):this.getDependency("material",a[h].material);l.push(d)}return l.push(n.loadGeometries(a)),Promise.all(l).then(function(h){const c=h.slice(0,h.length-1),d=h[h.length-1],u=[];for(let m=0,y=d.length;m<y;m++){const _=d[m],g=a[m];let f;const S=c[m];if(g.mode===Qt.TRIANGLES||g.mode===Qt.TRIANGLE_STRIP||g.mode===Qt.TRIANGLE_FAN||g.mode===void 0)f=r.isSkinnedMesh===!0?new $d(_,S):new Gt(_,S),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),g.mode===Qt.TRIANGLE_STRIP?f.geometry=sc(f.geometry,Ec):g.mode===Qt.TRIANGLE_FAN&&(f.geometry=sc(f.geometry,ea));else if(g.mode===Qt.LINES)f=new Oc(_,S);else if(g.mode===Qt.LINE_STRIP)f=new Es(_,S);else if(g.mode===Qt.LINE_LOOP)f=new Zd(_,S);else if(g.mode===Qt.POINTS)f=new Bc(_,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(f.geometry.morphAttributes).length>0&&N_(f,r),f.name=n.createUniqueName(r.name||"mesh_"+e),En(f,r),g.extensions&&ti(s,f,g),n.assignFinalMaterial(f),u.push(f)}for(let m=0,y=u.length;m<y;m++)n.associations.set(u[m],{meshes:e,primitives:m});if(u.length===1)return r.extensions&&ti(s,u[0],r),u[0];const p=new ai;r.extensions&&ti(s,p,r),n.associations.set(p,{meshes:e});for(let m=0,y=u.length;m<y;m++)p.add(u[m]);return p})}loadCamera(e){let n;const i=this.json.cameras[e],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?n=new Ut(Ac.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(n=new Ia(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(n.name=this.createUniqueName(i.name)),En(n,i),Promise.resolve(n)}loadSkin(e){const n=this.json.skins[e],i=[];for(let s=0,r=n.joints.length;s<r;s++)i.push(this._loadNodeShallow(n.joints[s]));return n.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",n.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){const r=s.pop(),a=s,l=[],h=[];for(let c=0,d=a.length;c<d;c++){const u=a[c];if(u){l.push(u);const p=new Fe;r!==null&&p.fromArray(r.array,c*16),h.push(p)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',n.joints[c])}return new Ea(l,h)})}loadAnimation(e){const n=this.json,i=this,s=n.animations[e],r=s.name?s.name:"animation_"+e,a=[],l=[],h=[],c=[],d=[];for(let u=0,p=s.channels.length;u<p;u++){const m=s.channels[u],y=s.samplers[m.sampler],_=m.target,g=_.node,f=s.parameters!==void 0?s.parameters[y.input]:y.input,S=s.parameters!==void 0?s.parameters[y.output]:y.output;_.node!==void 0&&(a.push(this.getDependency("node",g)),l.push(this.getDependency("accessor",f)),h.push(this.getDependency("accessor",S)),c.push(y),d.push(_))}return Promise.all([Promise.all(a),Promise.all(l),Promise.all(h),Promise.all(c),Promise.all(d)]).then(function(u){const p=u[0],m=u[1],y=u[2],_=u[3],g=u[4],f=[];for(let S=0,w=p.length;S<w;S++){const x=p[S],P=m[S],I=y[S],A=_[S],C=g[S];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();const E=i._createAnimationTracks(x,P,I,A,C);if(E)for(let v=0;v<E.length;v++)f.push(E[v])}return new sa(r,void 0,f)})}createNodeMesh(e){const n=this.json,i=this,s=n.nodes[e];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(r){const a=i._getNodeRef(i.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(l){if(l.isMesh)for(let h=0,c=s.weights.length;h<c;h++)l.morphTargetInfluences[h]=s.weights[h]}),a})}loadNode(e){const n=this.json,i=this,s=n.nodes[e],r=i._loadNodeShallow(e),a=[],l=s.children||[];for(let c=0,d=l.length;c<d;c++)a.push(i.getDependency("node",l[c]));const h=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),h]).then(function(c){const d=c[0],u=c[1],p=c[2];p!==null&&d.traverse(function(m){m.isSkinnedMesh&&m.bind(p,k_)});for(let m=0,y=u.length;m<y;m++)d.add(u[m]);return d})}_loadNodeShallow(e){const n=this.json,i=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=n.nodes[e],a=r.name?s.createUniqueName(r.name):"",l=[],h=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return h&&l.push(h),r.camera!==void 0&&l.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){l.push(c)}),this.nodeCache[e]=Promise.all(l).then(function(c){let d;if(r.isBone===!0?d=new Nc:c.length>1?d=new ai:c.length===1?d=c[0]:d=new dt,d!==c[0])for(let u=0,p=c.length;u<p;u++)d.add(c[u]);if(r.name&&(d.userData.name=r.name,d.name=a),En(d,r),r.extensions&&ti(i,d,r),r.matrix!==void 0){const u=new Fe;u.fromArray(r.matrix),d.applyMatrix4(u)}else r.translation!==void 0&&d.position.fromArray(r.translation),r.rotation!==void 0&&d.quaternion.fromArray(r.rotation),r.scale!==void 0&&d.scale.fromArray(r.scale);return s.associations.has(d)||s.associations.set(d,{}),s.associations.get(d).nodes=e,d}),this.nodeCache[e]}loadScene(e){const n=this.extensions,i=this.json.scenes[e],s=this,r=new ai;i.name&&(r.name=s.createUniqueName(i.name)),En(r,i),i.extensions&&ti(n,r,i);const a=i.nodes||[],l=[];for(let h=0,c=a.length;h<c;h++)l.push(s.getDependency("node",a[h]));return Promise.all(l).then(function(h){for(let d=0,u=h.length;d<u;d++)r.add(h[d]);const c=d=>{const u=new Map;for(const[p,m]of s.associations)(p instanceof cn||p instanceof yt)&&u.set(p,m);return d.traverse(p=>{const m=s.associations.get(p);m!=null&&u.set(p,m)}),u};return s.associations=c(r),r})}_createAnimationTracks(e,n,i,s,r){const a=[],l=e.name?e.name:e.uuid,h=[];kn[r.path]===kn.weights?e.traverse(function(p){p.morphTargetInfluences&&h.push(p.name?p.name:p.uuid)}):h.push(l);let c;switch(kn[r.path]){case kn.weights:c=$i;break;case kn.rotation:c=qi;break;case kn.position:case kn.scale:c=Xi;break;default:switch(i.itemSize){case 1:c=$i;break;case 2:case 3:default:c=Xi;break}break}const d=s.interpolation!==void 0?D_[s.interpolation]:Ss,u=this._getArrayFromAccessor(i);for(let p=0,m=h.length;p<m;p++){const y=new c(h[p]+"."+kn[r.path],n.array,u,d);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(y),a.push(y)}return a}_getArrayFromAccessor(e){let n=e.array;if(e.normalized){const i=ca(n.constructor),s=new Float32Array(n.length);for(let r=0,a=n.length;r<a;r++)s[r]=n[r]*i;n=s}return n}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){const s=this instanceof qi?L_:eh;return new s(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function H_(o,e,n){const i=e.attributes,s=new Ln;if(i.POSITION!==void 0){const l=n.json.accessors[i.POSITION],h=l.min,c=l.max;if(h!==void 0&&c!==void 0){if(s.set(new D(h[0],h[1],h[2]),new D(c[0],c[1],c[2])),l.normalized){const d=ca(Ui[l.componentType]);s.min.multiplyScalar(d),s.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const l=new D,h=new D;for(let c=0,d=r.length;c<d;c++){const u=r[c];if(u.POSITION!==void 0){const p=n.json.accessors[u.POSITION],m=p.min,y=p.max;if(m!==void 0&&y!==void 0){if(h.setX(Math.max(Math.abs(m[0]),Math.abs(y[0]))),h.setY(Math.max(Math.abs(m[1]),Math.abs(y[1]))),h.setZ(Math.max(Math.abs(m[2]),Math.abs(y[2]))),p.normalized){const _=ca(Ui[p.componentType]);h.multiplyScalar(_)}l.max(h)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(l)}o.boundingBox=s;const a=new mn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,o.boundingSphere=a}function lc(o,e,n){const i=e.attributes,s=[];function r(a,l){return n.getDependency("accessor",a).then(function(h){o.setAttribute(l,h)})}for(const a in i){const l=la[a]||a.toLowerCase();l in o.attributes||s.push(r(i[a],l))}if(e.indices!==void 0&&!o.index){const a=n.getDependency("accessor",e.indices).then(function(l){o.setIndex(l)});s.push(a)}return qe.workingColorSpace!==wt&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${qe.workingColorSpace}" not supported.`),En(o,e),H_(o,e,n),Promise.all(s).then(function(){return e.targets!==void 0?U_(o,e.targets,n):o})}class V_{constructor(e){console.log("[ThemeEditor v2.0] Constructor called - Save section in header"),this.app=e,this.isOpen=!1,this.panel=null,this.currentSettings={primaryColor:"#4a9eff",spinnerColor:"#00f510",playerBgColor:"#1f1f1f",playerBgOpacity:0,playerButtonColor:"#c20e1d",playerButtonOpacity:1,playerIconColor:"#ffffff",playerAccentColor:"#c20e1d",menuBgColor:"#000000",menuBgOpacity:.9,menuTextColor:"#ffffff",menuTextOpacity:1,menuAccentColor:"#ff00f7",thumbnailLabelColor:"#000000",thumbnailLabelOpacity:.1,hideInfoPanel:!1,showScreenshotButton:!0,bgGradientTop:"#3865ad",bgGradientBottom:"#0101bc",bgGradientOpacity:1,ambientIntensity:.4,ambientColor:"#ffffff",directionalIntensity:1.43,directionalColor:"#ffffff",particlesEnabled:!0,particlesCount:1150,particlesSize:.0095,particlesColor:"#0d529c",particlesOpacity:1,particlesSpeed:.5,mobileFontSizeTitle:10,mobileFontSizeText:9,mobileInfoBgColor:"#0516ff",mobileInfoBgOpacity:.13,mobileInfoBlur:10};const n=window.flexframeSettings||{};this.ajaxUrl=n.ajaxUrl||window.ajaxurl||"/wp-admin/admin-ajax.php",this.nonce=n.nonce||"",this.init()}init(){console.log("[ThemeEditor v2.0] Initializing - Save section in header..."),document.addEventListener("keydown",i=>{if(i.key==="t"||i.key==="T"){if(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA")return;this.toggle()}}),this.createPanel(),this.loadCurrentSettings();const n=new URLSearchParams(window.location.search).get("openThemeEditor");console.log("[ThemeEditor] URL params:",window.location.search),console.log("[ThemeEditor] openThemeEditor param:",n),n==="1"?(console.log("[ThemeEditor] Auto-opening in 1 second..."),setTimeout(()=>{console.log("[ThemeEditor] Opening now!"),this.open()},1e3)):console.log('[ThemeEditor] Not auto-opening (param not found or not "1")')}toggle(){this.isOpen?this.close():this.open()}open(){this.isOpen=!0,this.panel.classList.remove("hidden"),this.loadCurrentSettings(),setTimeout(()=>{this.panel.style.opacity="1",this.panel.style.transform="translateX(0)"},10)}close(){this.isOpen=!1,this.panel.style.opacity="0",this.panel.style.transform="translateX(100%)",setTimeout(()=>{this.panel.classList.add("hidden")},300)}loadCurrentSettings(){var n,i,s,r,a,l,h,c,d,u,p,m,y,_,g,f,S,w,x,P,I,A,C,E,v,R,z,O,V,q,G,Z,W,ne,ie,xe,we,Ne,X,te,ge,oe,Me,$e,Ae,lt,rt,ke,L,It,ze,He,be,nt,ve,T,b,B,Y,Q,j,ye,ae,de,We,ee,ue,Te,Re,pe,Ve,De,et,F,se,$,K,ce,le,Ie,ot,mt,je,kt,jt,Qi,Ji,hn,di,es,ts,qn,ns,Xn,is,ss,Rs;const e=window.flexframeSettings||{};this.currentSettings={primaryColor:e.primaryColor||"#4a9eff",spinnerColor:((n=e.uiSettings)==null?void 0:n.spinnerColor)||"#00f510",playerBgColor:((s=(i=e.uiSettings)==null?void 0:i.player)==null?void 0:s.bgColor)||"#1f1f1f",playerBgOpacity:((a=(r=e.uiSettings)==null?void 0:r.player)==null?void 0:a.bgOpacity)??0,playerButtonColor:((h=(l=e.uiSettings)==null?void 0:l.player)==null?void 0:h.buttonBgColor)||"#c20e1d",playerButtonOpacity:((d=(c=e.uiSettings)==null?void 0:c.player)==null?void 0:d.buttonOpacity)??1,playerIconColor:((p=(u=e.uiSettings)==null?void 0:u.player)==null?void 0:p.buttonColor)||"#ffffff",playerAccentColor:((y=(m=e.uiSettings)==null?void 0:m.player)==null?void 0:y.accentColor)||"#c20e1d",menuBgColor:((g=(_=e.uiSettings)==null?void 0:_.menu)==null?void 0:g.bgColor)||"#000000",menuBgOpacity:((S=(f=e.uiSettings)==null?void 0:f.menu)==null?void 0:S.bgOpacity)??.9,menuTextColor:((x=(w=e.uiSettings)==null?void 0:w.menu)==null?void 0:x.textColor)||"#ffffff",menuTextOpacity:((I=(P=e.uiSettings)==null?void 0:P.menu)==null?void 0:I.textOpacity)??1,menuAccentColor:((C=(A=e.uiSettings)==null?void 0:A.menu)==null?void 0:C.accentColor)||"#ff00f7",thumbnailLabelColor:((v=(E=e.uiSettings)==null?void 0:E.menu)==null?void 0:v.thumbnailLabelColor)||"#000000",thumbnailLabelOpacity:((z=(R=e.uiSettings)==null?void 0:R.menu)==null?void 0:z.thumbnailLabelOpacity)??.1,hideInfoPanel:((O=e.uiSettings)==null?void 0:O.hideRightMenu)??!1,showScreenshotButton:((V=e.uiSettings)==null?void 0:V.showScreenshotButton)??!0,bgGradientTop:((q=e.backgroundSettings)==null?void 0:q.gradientTop)||"#3865ad",bgGradientBottom:((G=e.backgroundSettings)==null?void 0:G.gradientBottom)||"#0101bc",bgGradientOpacity:((Z=e.backgroundSettings)==null?void 0:Z.gradientAlpha)??1,ambientIntensity:((ne=(W=e.lightingSettings)==null?void 0:W.ambientLight)==null?void 0:ne.intensity)??.4,ambientColor:((xe=(ie=e.lightingSettings)==null?void 0:ie.ambientLight)==null?void 0:xe.color)||"#ffffff",directionalIntensity:((Ne=(we=e.lightingSettings)==null?void 0:we.directionalLight)==null?void 0:Ne.intensity)??1.43,directionalColor:((te=(X=e.lightingSettings)==null?void 0:X.directionalLight)==null?void 0:te.color)||"#ffffff",particlesEnabled:((ge=e.particleSettings)==null?void 0:ge.visible)??!0,particlesCount:((oe=e.particleSettings)==null?void 0:oe.count)??1150,particlesSize:((Me=e.particleSettings)==null?void 0:Me.size)??.0095,particlesColor:(($e=e.particleSettings)==null?void 0:$e.color)||"#0d529c",particlesOpacity:((Ae=e.particleSettings)==null?void 0:Ae.opacity)??1,particlesSpeed:((lt=e.particleSettings)==null?void 0:lt.speed)??.5,skinColor:((rt=e.materialSettings)==null?void 0:rt.skinColor)||"#ffdbac",skinOpacity:((ke=e.materialSettings)==null?void 0:ke.skinOpacity)??.4,skinRoughness:((L=e.materialSettings)==null?void 0:L.skinRoughness)??.7,skinMetalness:((It=e.materialSettings)==null?void 0:It.skinMetalness)??0,skinTransmission:((ze=e.materialSettings)==null?void 0:ze.skinTransmission)??0,skinThickness:((He=e.materialSettings)==null?void 0:He.skinThickness)??0,skinIor:((be=e.materialSettings)==null?void 0:be.skinIor)??1.5,skinEnvIntensity:((nt=e.materialSettings)==null?void 0:nt.skinEnvIntensity)??1,barbellColor:((ve=e.materialSettings)==null?void 0:ve.barbellColor)||"#808080",barbellOpacity:((T=e.materialSettings)==null?void 0:T.barbellOpacity)??1,barbellMetalness:((b=e.materialSettings)==null?void 0:b.barbellMetalness)??.8,barbellRoughness:((B=e.materialSettings)==null?void 0:B.barbellRoughness)??.3,bumperColor:((Y=e.materialSettings)==null?void 0:Y.bumperColor)||"#808080",bumperOpacity:((Q=e.materialSettings)==null?void 0:Q.bumperOpacity)??1,bumperMetalness:((j=e.materialSettings)==null?void 0:j.bumperMetalness)??0,bumperRoughness:((ye=e.materialSettings)==null?void 0:ye.bumperRoughness)??.8,cableColor:((ae=e.materialSettings)==null?void 0:ae.cableColor)||"#808080",cableOpacity:((de=e.materialSettings)==null?void 0:de.cableOpacity)??1,cableMetalness:((We=e.materialSettings)==null?void 0:We.cableMetalness)??.5,cableRoughness:((ee=e.materialSettings)==null?void 0:ee.cableRoughness)??.4,chromeColor:((ue=e.materialSettings)==null?void 0:ue.chromeColor)||"#cccccc",chromeOpacity:((Te=e.materialSettings)==null?void 0:Te.chromeOpacity)??1,chromeMetalness:((Re=e.materialSettings)==null?void 0:Re.chromeMetalness)??1,chromeRoughness:((pe=e.materialSettings)==null?void 0:pe.chromeRoughness)??.1,color1Color:((Ve=e.materialSettings)==null?void 0:Ve.color1Color)||e.primaryColor||"#4a9eff",color1Opacity:((De=e.materialSettings)==null?void 0:De.color1Opacity)??1,color1Metalness:((et=e.materialSettings)==null?void 0:et.color1Metalness)??.5,color1Roughness:((F=e.materialSettings)==null?void 0:F.color1Roughness)??.5,metalColor:((se=e.materialSettings)==null?void 0:se.metalColor)||"#b0b0b0",metalOpacity:(($=e.materialSettings)==null?void 0:$.metalOpacity)??1,metalMetalness:((K=e.materialSettings)==null?void 0:K.metalMetalness)??.9,metalRoughness:((ce=e.materialSettings)==null?void 0:ce.metalRoughness)??.3,padColor:((le=e.materialSettings)==null?void 0:le.padColor)||"#1a1a1a",padOpacity:((Ie=e.materialSettings)==null?void 0:Ie.padOpacity)??1,padMetalness:((ot=e.materialSettings)==null?void 0:ot.padMetalness)??0,padRoughness:((mt=e.materialSettings)==null?void 0:mt.padRoughness)??.9,plasticColor:((je=e.materialSettings)==null?void 0:je.plasticColor)||"#808080",plasticOpacity:((kt=e.materialSettings)==null?void 0:kt.plasticOpacity)??1,plasticMetalness:((jt=e.materialSettings)==null?void 0:jt.plasticMetalness)??0,plasticRoughness:((Qi=e.materialSettings)==null?void 0:Qi.plasticRoughness)??.6,rubberColor:((Ji=e.materialSettings)==null?void 0:Ji.rubberColor)||"#1a1a1a",rubberOpacity:((hn=e.materialSettings)==null?void 0:hn.rubberOpacity)??1,rubberMetalness:((di=e.materialSettings)==null?void 0:di.rubberMetalness)??0,rubberRoughness:((es=e.materialSettings)==null?void 0:es.rubberRoughness)??.95,mobileFontSizeTitle:((ts=e.mobileSettings)==null?void 0:ts.fontSizeTitle)??10,mobileFontSizeText:((qn=e.mobileSettings)==null?void 0:qn.fontSizeText)??9,mobileInfoBgColor:((ns=e.mobileSettings)==null?void 0:ns.infoBgColor)||((is=(Xn=e.uiSettings)==null?void 0:Xn.menu)==null?void 0:is.accentColor)||"#0516ff",mobileInfoBgOpacity:((ss=e.mobileSettings)==null?void 0:ss.infoBgOpacity)??.13,mobileInfoBlur:((Rs=e.mobileSettings)==null?void 0:Rs.infoBlur)??10},this.updateInputs()}updateInputs(){Object.keys(this.currentSettings).forEach(e=>{const n=this.panel.querySelector(`[data-setting="${e}"]`);if(n)if(n.type==="checkbox")n.checked=this.currentSettings[e];else if(n.type==="range"){n.value=this.currentSettings[e];const i=n.nextElementSibling;i&&i.classList.contains("te-range-value")&&(i.textContent=this.formatValue(e,this.currentSettings[e]))}else n.value=this.currentSettings[e]})}formatValue(e,n){return e.includes("Opacity")||e.includes("Roughness")||e.includes("Metalness")||e.includes("Transmission")||e.includes("Intensity")||e.includes("Speed")?parseFloat(n).toFixed(2):e.includes("Count")?parseInt(n):e.includes("Size")&&e!=="particlesSize"?parseFloat(n).toFixed(3):e==="particlesSize"?parseFloat(n).toFixed(4):n}createPanel(){this.panel=document.createElement("div"),this.panel.id="theme-editor-panel",this.panel.innerHTML=`
            <div class="te-header">
                <div class="te-header-top">
                    <h2>Theme Editor</h2>
                    <span class="te-hint">Press T to close</span>
                    <button class="te-close-btn">&times;</button>
                </div>
                <div class="te-save-section">
                    <input type="text" id="te-theme-name" placeholder="Enter theme name..." />
                    <button id="te-save-btn" class="te-btn-primary">Save Theme</button>
                </div>
                <div id="te-save-message" class="te-message"></div>
            </div>
            
            <div class="te-content">
                <!-- Primary Color Section (Step 1) -->
                <div class="te-section te-primary-section">
                    <div class="te-section-header" data-section="primary">
                        <span>Primary Color</span>
                        <span class="te-toggle-icon">▼</span>
                    </div>
                    <div class="te-section-content te-section-open" id="section-primary">
                        <p class="te-section-desc">This is the main accent color used throughout the viewer for glows, highlights, and branding elements.</p>
                        <div class="te-control">
                            <label for="te-primaryColor">Primary Color</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <input type="color" id="te-primaryColor" data-setting="primaryColor" value="${this.currentSettings.primaryColor}">
                                <button class="te-save-primary-btn" style="padding: 5px 15px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; white-space: nowrap;">Save & Apply</button>
                            </div>
                            <div style="font-size: 11px; color: #888; margin-top: 5px;">Click Save & Apply to update the primary color globally</div>
                        </div>
                    </div>
                </div>

                <!-- UI Settings Section -->
                <div class="te-section">
                    <div class="te-section-header" data-section="ui">
                        <span>UI Settings</span>
                        <span class="te-toggle-icon">▶</span>
                    </div>
                    <div class="te-section-content" id="section-ui">
                        
                        <!-- Loading Spinner -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="ui-spinner">
                                <span>Loading Indicator</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-ui-spinner">
                                ${this.createColorInput("spinnerColor","Spinner Color")}
                                <div style="background: rgba(255, 158, 74, 0.1); border-left: 3px solid #ff9e4a; padding: 10px; margin-top: 12px; font-size: 11px; line-height: 1.5; color: rgba(255,255,255,0.85);">
                                    <strong>Note:</strong> The loader type (Spinner vs Logo) and animation style are configured in the main WordPress settings. These settings control the initial page load indicator.
                                </div>
                            </div>
                        </div>

                        <!-- Bottom Menu -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="ui-player">
                                <span>Bottom Menu</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-ui-player">
                                <button class="te-preview-toggle" data-preview="player" style="width: 100%; padding: 6px 10px; margin-bottom: 12px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600;">
                                    Show Bottom Menu Preview
                                </button>
                                ${this.createColorInput("playerBgColor","Background")}
                                ${this.createRangeInput("playerBgOpacity","BG Opacity",0,1,.01)}
                                ${this.createColorInput("playerButtonColor","Button Color")}
                                ${this.createRangeInput("playerButtonOpacity","Button Opacity",0,1,.01)}
                                ${this.createColorInput("playerIconColor","Icon Color")}
                                ${this.createColorInput("playerAccentColor","Accent Color")}
                            </div>
                        </div>

                        <!-- Side Menus -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="ui-menu">
                                <span>Side Menus</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-ui-menu">
                                <button class="te-preview-toggle" data-preview="menus" style="width: 100%; padding: 6px 10px; margin-bottom: 12px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600;">
                                    Show Side Menus Preview
                                </button>
                                <div style="background: rgba(74, 158, 255, 0.1); border-left: 3px solid #4a9eff; padding: 10px; margin-bottom: 12px; font-size: 11px; line-height: 1.5; color: rgba(255,255,255,0.85);">
                                    <strong>Tip:</strong> The outline color of the side menu, the search button background, and menu accents are all controlled by the <strong>Primary Color</strong> field in the very first tab of the theme editor.
                                </div>
                                ${this.createColorInput("menuBgColor","Background Color")}
                                ${this.createRangeInput("menuBgOpacity","Background Opacity",0,1,.01)}
                                ${this.createColorInput("menuTextColor","Text Color")}
                                ${this.createRangeInput("menuTextOpacity","Text Opacity",0,1,.01)}
                                ${this.createColorInput("menuAccentColor","Accent Color")}
                                ${this.createColorInput("thumbnailLabelColor","Thumbnail Label Color")}
                                ${this.createRangeInput("thumbnailLabelOpacity","Thumbnail Label Opacity",0,1,.01)}
                                ${this.createCheckboxInput("hideInfoPanel","Hide Info Panel")}
                                ${this.createCheckboxInput("showScreenshotButton","Show Screenshot Button")}
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Model Colors & Materials Section (Parent) -->
                <div class="te-section">
                    <div class="te-section-header" data-section="model-materials">
                        <span>Model Colors & Materials</span>
                        <span class="te-toggle-icon">▶</span>
                    </div>
                    <div class="te-section-content" id="section-model-materials">
                        
                        <!-- Skin Material -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="material">
                                <span>Skin Material</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-material">
                                ${this.createColorInput("skinColor","Skin Color")}
                                ${this.createRangeInput("skinOpacity","Opacity",0,1,.01)}
                                ${this.createRangeInput("skinRoughness","Roughness",0,1,.01)}
                                ${this.createRangeInput("skinMetalness","Metalness",0,1,.01)}
                                ${this.createRangeInput("skinTransmission","Transmission",0,1,.01)}
                                ${this.createRangeInput("skinThickness","Thickness",0,5,.1)}
                                ${this.createRangeInput("skinIor","IOR",1,2.5,.01)}
                                ${this.createRangeInput("skinEnvIntensity","Env Intensity",0,5,.1)}
                            </div>
                        </div>

                        <!-- Barbell Material -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="barbell">
                                <span>Barbell Material</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-barbell">
                                ${this.createColorInput("barbellColor","Color")}
                                ${this.createRangeInput("barbellOpacity","Opacity",0,1,.01)}
                                ${this.createRangeInput("barbellMetalness","Metalness",0,1,.01)}
                                ${this.createRangeInput("barbellRoughness","Roughness",0,1,.01)}
                            </div>
                        </div>

                        <!-- Bumper Plates -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="bumper">
                                <span>Bumper Plates</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-bumper">
                                ${this.createColorInput("bumperColor","Color")}
                                ${this.createRangeInput("bumperOpacity","Opacity",0,1,.01)}
                                ${this.createRangeInput("bumperMetalness","Metalness",0,1,.01)}
                                ${this.createRangeInput("bumperRoughness","Roughness",0,1,.01)}
                            </div>
                        </div>

                        <!-- Cable Material -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="cable">
                                <span>Cable Material</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-cable">
                                ${this.createColorInput("cableColor","Color")}
                                ${this.createRangeInput("cableOpacity","Opacity",0,1,.01)}
                                ${this.createRangeInput("cableMetalness","Metalness",0,1,.01)}
                                ${this.createRangeInput("cableRoughness","Roughness",0,1,.01)}
                            </div>
                        </div>

                        <!-- Chrome Material -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="chrome">
                                <span>Chrome Material</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-chrome">
                                ${this.createColorInput("chromeColor","Color")}
                                ${this.createRangeInput("chromeOpacity","Opacity",0,1,.01)}
                                ${this.createRangeInput("chromeMetalness","Metalness",0,1,.01)}
                                ${this.createRangeInput("chromeRoughness","Roughness",0,1,.01)}
                            </div>
                        </div>

                        <!-- Brand Color (COLOR1) -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="color1">
                                <span>Brand Color (COLOR1)</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-color1">
                                ${this.createColorInput("color1Color","Color")}
                                ${this.createRangeInput("color1Opacity","Opacity",0,1,.01)}
                                ${this.createRangeInput("color1Metalness","Metalness",0,1,.01)}
                                ${this.createRangeInput("color1Roughness","Roughness",0,1,.01)}
                            </div>
                        </div>

                        <!-- Metal Material -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="metal">
                                <span>Metal Material</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-metal">
                                ${this.createColorInput("metalColor","Color")}
                                ${this.createRangeInput("metalOpacity","Opacity",0,1,.01)}
                                ${this.createRangeInput("metalMetalness","Metalness",0,1,.01)}
                                ${this.createRangeInput("metalRoughness","Roughness",0,1,.01)}
                            </div>
                        </div>

                        <!-- Pad / Cushion -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="pad">
                                <span>Pad / Cushion</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-pad">
                                ${this.createColorInput("padColor","Color")}
                                ${this.createRangeInput("padOpacity","Opacity",0,1,.01)}
                                ${this.createRangeInput("padMetalness","Metalness",0,1,.01)}
                                ${this.createRangeInput("padRoughness","Roughness",0,1,.01)}
                            </div>
                        </div>

                        <!-- Plastic Material -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="plastic">
                                <span>Plastic Material</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-plastic">
                                ${this.createColorInput("plasticColor","Color")}
                                ${this.createRangeInput("plasticOpacity","Opacity",0,1,.01)}
                                ${this.createRangeInput("plasticMetalness","Metalness",0,1,.01)}
                                ${this.createRangeInput("plasticRoughness","Roughness",0,1,.01)}
                            </div>
                        </div>

                        <!-- Rubber Material -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="rubber">
                                <span>Rubber Material</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-rubber">
                                ${this.createColorInput("rubberColor","Color")}
                                ${this.createRangeInput("rubberOpacity","Opacity",0,1,.01)}
                                ${this.createRangeInput("rubberMetalness","Metalness",0,1,.01)}
                                ${this.createRangeInput("rubberRoughness","Roughness",0,1,.01)}
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Background Section -->
                <div class="te-section">
                    <div class="te-section-header" data-section="background">
                        <span>Background</span>
                        <span class="te-toggle-icon">▶</span>
                    </div>
                    <div class="te-section-content" id="section-background">
                        ${this.createColorInput("bgGradientTop","Gradient Top")}
                        ${this.createColorInput("bgGradientBottom","Gradient Bottom")}
                        ${this.createRangeInput("bgGradientOpacity","Opacity",0,1,.01)}
                    </div>
                </div>

                <!-- Lighting Section -->
                <div class="te-section">
                    <div class="te-section-header" data-section="lighting">
                        <span>Lighting</span>
                        <span class="te-toggle-icon">▶</span>
                    </div>
                    <div class="te-section-content" id="section-lighting">
                        <div class="te-subsection">
                            <h4>Ambient Light</h4>
                            ${this.createRangeInput("ambientIntensity","Intensity",0,2,.01)}
                            ${this.createColorInput("ambientColor","Color")}
                        </div>
                        <div class="te-subsection">
                            <h4>Directional Light</h4>
                            ${this.createRangeInput("directionalIntensity","Intensity",0,5,.01)}
                            ${this.createColorInput("directionalColor","Color")}
                        </div>
                    </div>
                </div>

                <!-- Particles Section -->
                <div class="te-section">
                    <div class="te-section-header" data-section="particles">
                        <span>Particles</span>
                        <span class="te-toggle-icon">▶</span>
                    </div>
                    <div class="te-section-content" id="section-particles">
                        ${this.createCheckboxInput("particlesEnabled","Enable Particles")}
                        ${this.createRangeInput("particlesCount","Count",0,5e3,50)}
                        ${this.createRangeInput("particlesSize","Size",.001,.05,.001)}
                        ${this.createColorInput("particlesColor","Color")}
                        ${this.createRangeInput("particlesOpacity","Opacity",0,1,.01)}
                        ${this.createRangeInput("particlesSpeed","Speed",0,2,.1)}
                    </div>
                </div>

                <!-- Mobile UI Section -->
                <div class="te-section">
                    <div class="te-section-header" data-section="mobile">
                        <span>📱 Mobile UI</span>
                        <span class="te-toggle-icon">▶</span>
                    </div>
                    <div class="te-section-content" id="section-mobile">
                        <div style="background: rgba(74, 158, 255, 0.1); border-left: 3px solid #4a9eff; padding: 10px; margin-bottom: 12px; font-size: 11px; line-height: 1.5; color: rgba(255,255,255,0.85);">
                            <strong>📱 Mobile-Specific Settings</strong><br>
                            These settings only apply on mobile devices (screens under 768px wide).
                        </div>
                        
                        <!-- Font Sizes -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="mobile-fonts">
                                <span>Menu Font Sizes</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-mobile-fonts">
                                ${this.createRangeInput("mobileFontSizeTitle","Title Font Size (px)",6,16,1)}
                                ${this.createRangeInput("mobileFontSizeText","Text Font Size (px)",6,14,1)}
                            </div>
                        </div>

                        <!-- Info Step Items -->
                        <div class="te-section te-nested">
                            <div class="te-section-header" data-section="mobile-info">
                                <span>Info Panel Items</span>
                                <span class="te-toggle-icon">▶</span>
                            </div>
                            <div class="te-section-content" id="section-mobile-info">
                                ${this.createColorInput("mobileInfoBgColor","Background Color")}
                                ${this.createRangeInput("mobileInfoBgOpacity","Background Opacity",0,1,.01)}
                                ${this.createRangeInput("mobileInfoBlur","Blur Amount (px)",0,30,1)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,this.addStyles(),document.body.appendChild(this.panel),this.setupEventListeners()}createColorInput(e,n){return`
            <div class="te-row">
                <label>${n}</label>
                <div class="te-color-wrapper">
                    <input type="color" data-setting="${e}" class="te-color-input" />
                    <span class="te-color-hex" data-hex-for="${e}"></span>
                </div>
            </div>
        `}createRangeInput(e,n,i,s,r){return`
            <div class="te-row">
                <label>${n}</label>
                <div class="te-range-wrapper">
                    <input type="range" data-setting="${e}" min="${i}" max="${s}" step="${r}" class="te-range-input" />
                    <span class="te-range-value">0</span>
                </div>
            </div>
        `}createCheckboxInput(e,n){return`
            <div class="te-row te-checkbox-row">
                <label>${n}</label>
                <label class="te-toggle">
                    <input type="checkbox" data-setting="${e}" />
                    <span class="te-toggle-slider"></span>
                </label>
            </div>
        `}setupEventListeners(){this.panel.querySelector(".te-close-btn").addEventListener("click",()=>this.close()),this.panel.querySelectorAll(".te-section-header").forEach(n=>{n.addEventListener("click",i=>{i.stopPropagation();const s=n.dataset.section,r=this.panel.querySelector(`#section-${s}`),a=n.querySelector(".te-toggle-icon"),l=n.closest(".te-nested");if(window.getComputedStyle(r).display==="none"){if(l){const c=n.closest(".te-section-content");c.querySelectorAll(".te-nested > .te-section-content").forEach(d=>{d!==r&&(d.style.display="none")}),c.querySelectorAll(".te-nested .te-section-header .te-toggle-icon").forEach(d=>{d!==a&&(d.textContent="▶")})}else this.panel.querySelectorAll(".te-content > .te-section > .te-section-content").forEach(u=>{u.style.display="none"}),this.panel.querySelectorAll(".te-content > .te-section > .te-section-header .te-toggle-icon").forEach(u=>{u.textContent="▶"});r.style.display="block",a.textContent="▼"}else r.style.display="none",a.textContent="▶"})}),this.panel.querySelectorAll(".te-preview-toggle").forEach(n=>{n.addEventListener("click",i=>{i.stopPropagation();const s=n.dataset.preview,r=n.classList.contains("active");if(s==="player"){let a=document.querySelector("#animation-player");a||(a=document.querySelector(".animation-player")),a||(a=document.querySelector('[class*="player"]')),a||(a=document.querySelector(".player-controls")),console.log("[Theme Editor] Looking for player, found:",a),a?r?(a.style.cssText="",a.classList.remove("te-force-visible"),n.textContent="Show Bottom Menu Preview",n.style.background="#4CAF50",n.classList.remove("active")):(a.classList.remove("hidden","hide","invisible","player-hidden"),a.style.cssText=`
                                display: flex !important;
                                opacity: 1 !important;
                                visibility: visible !important;
                                pointer-events: auto !important;
                                transform: translateY(0) !important;
                                transition: none !important;
                            `,a.classList.add("te-force-visible"),n.textContent="Hide Bottom Menu Preview",n.style.background="#f44336",n.classList.add("active"),console.log("[Theme Editor] Player shown. Classes:",a.className,"Style:",a.style.cssText)):(console.warn("[Theme Editor] Player element not found! Available elements:",{allIds:Array.from(document.querySelectorAll("[id]")).map(l=>l.id),allWithPlayer:Array.from(document.querySelectorAll('[class*="player"], [id*="player"]')).map(l=>`${l.tagName}#${l.id}.${l.className}`)}),n.textContent="Player Not Found",n.style.background="#ff9800")}else if(s==="menus"){const a=document.querySelectorAll(".thumbnail-menu-toggle"),l=document.querySelectorAll(".thumbnail-dropdown"),h=document.querySelectorAll(".thumbnail-menu-wrapper");console.log("[Theme Editor] Menu elements found:",{toggleButtons:a.length,dropdowns:l.length,wrappers:h.length}),r?(a.forEach(c=>c.classList.remove("te-force-visible")),l.forEach(c=>{c.classList.remove("te-force-visible"),c.style.removeProperty("display")}),h.forEach(c=>c.classList.remove("te-force-visible")),n.textContent="Show Side Menus Preview",n.style.background="#4CAF50",n.classList.remove("active")):(h.forEach(c=>{c.classList.add("te-force-visible"),c.style.cssText=`
                                display: block !important;
                                visibility: visible !important;
                                opacity: 1 !important;
                            `}),a.forEach(c=>{c.classList.add("te-force-visible"),c.style.cssText=`
                                display: block !important;
                                visibility: visible !important;
                                opacity: 1 !important;
                            `}),l.forEach(c=>{c.classList.add("te-force-visible"),c.style.cssText=`
                                display: block !important;
                                visibility: visible !important;
                                opacity: 1 !important;
                                pointer-events: auto !important;
                                position: fixed !important;
                            `}),n.textContent="Hide Side Menus Preview",n.style.background="#f44336",n.classList.add("active"))}})}),this.panel.querySelectorAll("input[data-setting]").forEach(n=>{n.addEventListener("input",i=>{const s=i.target.dataset.setting;let r;if(i.target.type==="checkbox")r=i.target.checked;else if(i.target.type==="range"){r=parseFloat(i.target.value);const a=i.target.nextElementSibling;a&&(a.textContent=this.formatValue(s,r))}else r=i.target.value;if(i.target.type==="color"){const a=this.panel.querySelector(`[data-hex-for="${s}"]`);a&&(a.textContent=r)}this.currentSettings[s]=r,s!=="primaryColor"&&this.applySettingLive(s,r)})}),this.panel.querySelector("#te-save-btn").addEventListener("click",()=>this.saveTheme());const e=this.panel.querySelector(".te-save-primary-btn");e&&e.addEventListener("click",()=>{this.savePrimaryColor()})}applySettingLive(e,n){if(e.startsWith("bgGradient")&&this.app.sceneManager&&(this.app.backgroundParams.gradientTop=this.currentSettings.bgGradientTop,this.app.backgroundParams.gradientBottom=this.currentSettings.bgGradientBottom,this.app.backgroundParams.gradientAlpha=this.currentSettings.bgGradientOpacity,this.app.sceneManager.updateGradientBackground(this.app.backgroundParams)),e==="ambientIntensity"&&this.app.lightingSystem&&(this.app.lightingSystem.ambientLight.intensity=n),e==="ambientColor"&&this.app.lightingSystem&&this.app.lightingSystem.ambientLight.color.set(n),e==="directionalIntensity"&&this.app.lightingSystem&&(this.app.lightingSystem.directionalLight.intensity=n),e==="directionalColor"&&this.app.lightingSystem&&this.app.lightingSystem.directionalLight.color.set(n),e.startsWith("particles")&&this.app.particleSystem)if(this.app.particleSystem.params.visible=this.currentSettings.particlesEnabled,this.app.particleSystem.params.count=this.currentSettings.particlesCount,this.app.particleSystem.params.size=this.currentSettings.particlesSize,this.app.particleSystem.params.color=this.currentSettings.particlesColor,this.app.particleSystem.params.opacity=this.currentSettings.particlesOpacity,this.app.particleSystem.params.speed=this.currentSettings.particlesSpeed,e==="particlesCount"||e==="particlesEnabled")this.app.particleSystem.createDustParticles();else{const i=this.app.particleSystem.dustMaterial;i&&(i.color.set(this.currentSettings.particlesColor),i.opacity=this.currentSettings.particlesOpacity,i.size=this.currentSettings.particlesSize,i.needsUpdate=!0),this.app.particleSystem.dustParticles&&(this.app.particleSystem.dustParticles.visible=this.currentSettings.particlesEnabled)}if(e.startsWith("skin")&&window.model&&this.updateSkinMaterial(),e.startsWith("player")&&(console.log("Theme Editor: Updating player styling for",e,n),this.updatePlayerStyling()),(e.startsWith("menu")||e.startsWith("thumbnail"))&&(console.log("Theme Editor: Updating menu styling for",e,n),this.updateMenuStyling()),e==="hideInfoPanel"){const i=document.querySelector(".thumbnail-grid-container-right");i&&(i.style.display=n?"none":"")}if(e==="showScreenshotButton"){const i=document.querySelector(".screenshot-btn, #screenshot-btn");i&&(i.style.display=n?"flex":"none")}e==="spinnerColor"&&(console.log("Theme Editor: Updating spinner color to",n),this.app.updateSpinnerColor(n))}applyPrimaryColorToElements(e){console.log("[ThemeEditor] Applying primary color to elements:",e);const n=(c,d)=>{const u=parseInt(c.slice(1,3),16),p=parseInt(c.slice(3,5),16),m=parseInt(c.slice(5,7),16);return`rgba(${u}, ${p}, ${m}, ${d})`};this.currentSettings.playerAccentColor=e,this.currentSettings.playerButtonColor=e,this.app.playerStyleParams&&(this.app.playerStyleParams.scrubberColor=e,this.app.playerStyleParams.buttonColor=e);let i=document.getElementById("te-player-primary-color");i||(i=document.createElement("style"),i.id="te-player-primary-color",document.head.appendChild(i)),i.textContent=`
            /* Animation Player Button Background Color - from Primary Color */
            .animation-player .play-pause-btn,
            .animation-player .speed-btn,
            .animation-player .ar-btn,
            .animation-player .screenshot-btn,
            .animation-player .quality-btn {
                background-color: ${e} !important;
            }
            
            /* Animation Player Accent/Scrubber Color - from Primary Color */
            .animation-player .timeline-slider {
                accent-color: ${e} !important;
            }
            .animation-player .timeline-slider::-webkit-slider-thumb {
                background-color: ${e} !important;
            }
            .animation-player .timeline-slider::-moz-range-thumb {
                background-color: ${e} !important;
            }
            .animation-player .timeline-slider::-webkit-slider-runnable-track {
                background: linear-gradient(to right, ${e} var(--slider-progress, 0%), rgba(255,255,255,0.3) var(--slider-progress, 0%)) !important;
            }
        `,console.log("[ThemeEditor] Updated animation player colors via CSS"),this.currentSettings.spinnerColor=e;let s=document.getElementById("te-spinner-primary-color");s||(s=document.createElement("style"),s.id="te-spinner-primary-color",document.head.appendChild(s)),s.textContent=`
            /* Spinner Color - from Primary Color */
            /* COOL SPINNER (original) */
            #model-loader .loader-spinner {
                background: conic-gradient(
                    from 0deg,
                    transparent 0%,
                    ${n(e,.3)} 30%,
                    ${n(e,.8)} 60%,
                    ${e} 80%,
                    ${e} 100%
                ) !important;
            }
            #model-loader .loader-spinner::before {
                box-shadow: inset 0 0 10px ${n(e,.3)} !important;
            }
            
            /* GRADIENT SPINNER (circle-border) */
            #model-loader .circle-border {
                background: linear-gradient(0deg, ${n(e,.1)} 33%, ${e} 100%) !important;
            }
            
            /* DOTS SPINNER */
            #model-loader .dots-loader span {
                background-color: ${e} !important;
            }
            
            /* PULSE SPINNER */
            #model-loader .pulse-loader {
                background-color: ${e} !important;
                box-shadow: 0 0 20px ${n(e,.5)} !important;
            }
            
            /* RING SPINNER */
            #model-loader .ring-loader {
                border-color: ${n(e,.2)} !important;
                border-top-color: ${e} !important;
            }
        `,console.log("[ThemeEditor] Updated spinner color via CSS"),this.app.lightingSystem&&this.app.lightingSystem.directionalLight&&(this.currentSettings.directionalColor=e,this.app.lightingSystem.directionalLight.color.set(e),console.log("[ThemeEditor] Updated directional light color"));const r=this.panel.querySelector('[data-setting="spinnerColor"]');r&&(r.value=e);const a=this.panel.querySelector('[data-setting="playerAccentColor"]');a&&(a.value=e);const l=this.panel.querySelector('[data-setting="playerButtonColor"]');l&&(l.value=e);const h=this.panel.querySelector('[data-setting="directionalColor"]');h&&(h.value=e),console.log("[ThemeEditor] Primary color applied to all elements")}savePrimaryColor(){const e=this.currentSettings.primaryColor,n=this.panel.querySelector(".te-save-primary-btn");if(!n)return;this.applyPrimaryColorToElements(e);const i=n.textContent;n.textContent="Saving...",n.disabled=!0;const s=new FormData;s.append("action","flexframe_save_primary_color"),s.append("nonce",this.nonce),s.append("primary_color",e),fetch(this.ajaxUrl,{method:"POST",body:s}).then(r=>r.json()).then(r=>{r.success?(n.textContent="Applying...",setTimeout(()=>{window.location.href=window.location.href.split("?")[0]+"?t="+Date.now()},500)):(n.textContent="Error!",n.style.background="#f44336",setTimeout(()=>{n.textContent=i,n.style.background="#4CAF50",n.disabled=!1},2e3),console.error("Failed to save primary color:",r))}).catch(r=>{n.textContent="Error!",n.style.background="#f44336",setTimeout(()=>{n.textContent=i,n.style.background="#4CAF50",n.disabled=!1},2e3),console.error("Error saving primary color:",r)})}updatePrimaryColor(e){}updatePrimaryColorLegacy(e){window.flexframeSettings&&(window.flexframeSettings.primaryColor=e),document.documentElement.style.setProperty("--flexframe-primary-color",e);const n=e.replace("#",""),i=parseInt(n.substring(0,2),16),s=parseInt(n.substring(2,4),16),r=parseInt(n.substring(4,6),16);document.documentElement.style.setProperty("--flexframe-primary-color-rgb",`${i}, ${s}, ${r}`),this.app.updateProgressBarColor&&this.app.updateProgressBarColor(e),this.app.updateSpinnerColor&&this.app.updateSpinnerColor(e),window.menuManager&&(window.menuManager.menus&&Object.values(window.menuManager.menus).forEach(l=>{l.settings&&(l.settings.glowColor=e)}),window.menuManager.glowSettings&&(window.menuManager.glowSettings.glowColor=e)),this.app.particleSystem&&(this.app.particleSystem.params.color=e,this.app.particleSystem.dustMaterial&&(this.app.particleSystem.dustMaterial.color.set(e),this.app.particleSystem.dustMaterial.needsUpdate=!0));let a=document.getElementById("te-primary-color-style");a||(a=document.createElement("style"),a.id="te-primary-color-style",document.head.appendChild(a)),a.textContent=`
            /* Primary Color Overrides */
            :root {
                --flexframe-primary-color: ${e} !important;
                --flexframe-primary-color-rgb: ${i}, ${s}, ${r} !important;
                --ss-primary-color: ${e} !important;
            }
            
            /* Thumbnail glow effect */
            .thumbnail-item:hover img,
            .thumbnail-item.selected img {
                box-shadow: 0 0 20px ${e}, 0 0 40px ${e}80 !important;
            }
            
            /* Menu borders and accents */
            .thumbnail-dropdown,
            .thumbnail-dropdown-right {
                box-shadow: 0 0 20px ${e}40 !important;
                border-color: ${e} !important;
            }
            
            /* Menu toggle buttons hover */
            .thumbnail-menu-toggle:hover,
            .thumbnail-menu-toggle.active {
                background-color: ${e} !important;
                box-shadow: 0 0 15px ${e}80 !important;
            }
            
            /* Menu hint tabs */
            .menu-hint-tab,
            .menu-hint-tab-right {
                border-color: ${e} !important;
                background: linear-gradient(90deg, transparent, ${e}20) !important;
            }
            .menu-hint-tab:hover,
            .menu-hint-tab-right:hover {
                background: ${e}40 !important;
                box-shadow: 0 0 10px ${e}60 !important;
            }
            
            /* Loading spinner */
            .loading-spinner {
                border-top-color: ${e} !important;
            }
            
            /* Progress bar */
            .progress-bar-fill,
            #progress-bar-fill {
                background-color: ${e} !important;
            }
            
            /* AR button accents */
            .ar-cta-button {
                border-color: ${e} !important;
            }
            .ar-cta-icon path {
                fill: ${e} !important;
            }
        `,console.log("Theme Editor: Primary color applied",{color:e,r:i,g:s,b:r})}updateSkinMaterial(){if(!window.model)return;const e=this.currentSettings.skinColor,n=this.currentSettings.skinOpacity,i=this.currentSettings.skinRoughness,s=this.currentSettings.skinMetalness,r=this.currentSettings.skinTransmission,a=this.currentSettings.skinThickness,l=this.currentSettings.skinIor,h=this.currentSettings.skinEnvIntensity;window.model.traverse(c=>{c.isMesh&&c.material&&(Array.isArray(c.material)?c.material:[c.material]).forEach(u=>{u.name&&u.name.toUpperCase()==="SKIN"&&(u.color.set(e),u.opacity=n,u.transparent=n<1,u.roughness=i,u.metalness=s,u.transmission!==void 0&&(u.transmission=r),u.thickness!==void 0&&(u.thickness=a),u.ior!==void 0&&(u.ior=l),u.envMapIntensity!==void 0&&(u.envMapIntensity=h),u.needsUpdate=!0)})})}updatePlayerStyling(){if(!document.querySelector(".animation-player")){console.log("Theme Editor: Player element not found");return}const n=this.currentSettings.playerBgColor,i=this.currentSettings.playerBgOpacity,s=this.currentSettings.playerButtonColor,r=this.currentSettings.playerButtonOpacity,a=this.currentSettings.playerIconColor,l=this.currentSettings.playerAccentColor,h=this.hexToRgba(n,i),c=this.hexToRgba(s,r);let d=document.getElementById("te-player-style");d||(d=document.createElement("style"),d.id="te-player-style",document.head.appendChild(d)),d.textContent=`
            .animation-player {
                background-color: ${h} !important;
            }
            .animation-player .play-pause-btn,
            .animation-player .screenshot-btn,
            .animation-player .ar-btn,
            .animation-player .quality-btn,
            .animation-player .speed-btn,
            .animation-player .control-btn {
                background-color: ${c} !important;
            }
            .animation-player .play-pause-btn svg,
            .animation-player .screenshot-btn svg,
            .animation-player .ar-btn svg,
            .animation-player .quality-btn svg,
            .animation-player .speed-btn svg,
            .animation-player .control-btn svg {
                fill: ${a} !important;
            }
            .animation-player .speed-btn span,
            .animation-player .ar-btn span,
            .animation-player .quality-btn span,
            .animation-player #quality-text,
            .animation-player #speed-text {
                color: ${a} !important;
            }
            .animation-player .time-display,
            .animation-player .time-display span,
            .animation-player #current-time,
            .animation-player #total-time {
                color: ${a} !important;
            }
            .animation-player .timeline-slider::-webkit-slider-thumb {
                background: ${l} !important;
            }
            .animation-player .timeline-slider::-moz-range-thumb {
                background: ${l} !important;
            }
        `,console.log("Theme Editor: Player styles injected",{bgRgba:h,btnRgba:c,iconColor:a,accentColor:l})}updateMenuStyling(){const e=this.currentSettings.menuBgColor,n=this.currentSettings.menuBgOpacity,i=this.currentSettings.menuTextColor,s=this.currentSettings.menuTextOpacity??1,r=this.currentSettings.menuAccentColor,a=this.currentSettings.thumbnailLabelColor||"#000000",l=this.currentSettings.thumbnailLabelOpacity??.1,h=this.hexToRgba(e,n),c=this.hexToRgba(i,s),d=this.hexToRgba(e,Math.min(n+.2,1)),u=this.hexToRgba(a,l);let p=document.getElementById("te-menu-style");p||(p=document.createElement("style"),p.id="te-menu-style",document.head.appendChild(p)),p.textContent=`
            /* Left Menu - Match WordPress structure */
            /* Keep main container transparent */
            #flexframe-viewer-container .thumbnail-grid-container,
            .thumbnail-grid-container {
                background-color: transparent !important;
            }
            
            /* Apply background to dropdowns */
            #flexframe-viewer-container .thumbnail-dropdown,
            .thumbnail-dropdown,
            .exercise-menu,
            .menu-panel,
            .side-menu {
                background-color: ${h} !important;
            }
            
            /* Menu toggle buttons */
            #flexframe-viewer-container .thumbnail-menu-toggle,
            .thumbnail-grid-container .thumbnail-menu-toggle,
            button.thumbnail-menu-toggle,
            .thumbnail-menu-toggle {
                background-color: ${h} !important;
                color: ${c} !important;
            }
            
            /* Toggle button text and icons */
            #flexframe-viewer-container .thumbnail-menu-toggle span,
            .thumbnail-menu-toggle span {
                color: ${c} !important;
            }
            #flexframe-viewer-container .thumbnail-menu-toggle svg,
            .thumbnail-menu-toggle svg {
                fill: ${i} !important;
                opacity: ${s} !important;
            }
            
            /* All menu content text */
            .thumbnail-grid-container *,
            .thumbnail-dropdown *,
            .exercise-menu *,
            .menu-panel * {
                color: ${c} !important;
            }
            
            /* Thumbnail items */
            .thumbnail-item {
                color: ${c} !important;
            }
            .thumbnail-label {
                color: ${c} !important;
                background: linear-gradient(to top, ${u}, transparent) !important;
            }
            
            /* Dropdown borders - accent color */
            #flexframe-viewer-container .thumbnail-dropdown,
            .thumbnail-dropdown {
                border: 2px solid ${r} !important;
            }
            
            /* Right Menu */
            #flexframe-viewer-container .thumbnail-grid-container-right,
            .thumbnail-grid-container-right {
                background-color: transparent !important;
            }
            #flexframe-viewer-container .thumbnail-dropdown-right,
            .thumbnail-dropdown-right {
                background-color: ${h} !important;
                border: 2px solid ${r} !important;
            }
            .thumbnail-grid-container-right *,
            .thumbnail-dropdown-right * {
                color: ${c} !important;
            }
            .info-step-item {
                color: ${c} !important;
            }
            .info-step-title {
                color: ${c} !important;
            }
            .info-step-text {
                color: ${c} !important;
            }
            
            /* Scroll buttons */
            .scroll-btn {
                background-color: ${d} !important;
                color: ${c} !important;
            }
            .scroll-btn svg {
                fill: ${i} !important;
                opacity: ${s} !important;
            }
            
            /* Hover states */
            #flexframe-viewer-container .thumbnail-menu-toggle:hover,
            #flexframe-viewer-container .thumbnail-menu-toggle.active,
            .thumbnail-menu-toggle:hover,
            .thumbnail-menu-toggle.active,
            .thumbnail-item:hover { 
                background-color: ${r} !important; 
            }
            .info-step-item:hover {
                border-color: ${r} !important;
            }
            
            /* Menu hint tabs */
            #flexframe-viewer-container .menu-hint-tab,
            .menu-hint-tab,
            .menu-hint-tab-right {
                background-color: ${h} !important;
                border-color: ${r} !important;
            }
        `,console.log("Theme Editor: Menu styles injected",{bgRgba:h,textRgba:c,accentColor:r,labelGradient:u})}hexToRgba(e,n){const i=parseInt(e.slice(1,3),16),s=parseInt(e.slice(3,5),16),r=parseInt(e.slice(5,7),16);return`rgba(${i}, ${s}, ${r}, ${n})`}async saveTheme(){var s;const e=this.panel.querySelector("#te-theme-name").value.trim();if(!e){this.showMessage("Please enter a theme name","error");return}const n=this.panel.querySelector("#te-save-btn");n.disabled=!0,n.innerHTML="Saving...";const i={primary_color:this.currentSettings.primaryColor,primary_color_mode:"custom",spinner_color:this.currentSettings.spinnerColor,use_logo_loader:!1,logo_loader_animation:"pulse",logo_loader_size:100,player_bg_color:this.currentSettings.playerBgColor,player_bg_opacity:this.currentSettings.playerBgOpacity,player_button_bg_color:this.currentSettings.playerButtonColor,player_button_bg_opacity:this.currentSettings.playerButtonOpacity,player_icon_color:this.currentSettings.playerIconColor,player_accent_color:this.currentSettings.playerAccentColor,player_always_visible:"no",menu_bg_color:this.currentSettings.menuBgColor,menu_bg_opacity:this.currentSettings.menuBgOpacity,menu_text_color:this.currentSettings.menuTextColor,menu_text_opacity:this.currentSettings.menuTextOpacity,menu_accent_color:this.currentSettings.menuAccentColor,thumbnail_label_color:this.currentSettings.thumbnailLabelColor,thumbnail_label_opacity:this.currentSettings.thumbnailLabelOpacity,hide_right_menu:this.currentSettings.hideInfoPanel,show_screenshot_button:this.currentSettings.showScreenshotButton,skin_color:this.currentSettings.skinColor,skin_opacity:this.currentSettings.skinOpacity,skin_roughness:this.currentSettings.skinRoughness,skin_metalness:this.currentSettings.skinMetalness,skin_transmission:this.currentSettings.skinTransmission,skin_thickness:this.currentSettings.skinThickness,skin_ior:this.currentSettings.skinIor,skin_env_intensity:this.currentSettings.skinEnvIntensity,bg_gradient_top:this.currentSettings.bgGradientTop,bg_gradient_bottom:this.currentSettings.bgGradientBottom,bg_gradient_opacity:this.currentSettings.bgGradientOpacity,ambient_intensity:this.currentSettings.ambientIntensity,ambient_color:this.currentSettings.ambientColor,directional_intensity:this.currentSettings.directionalIntensity,directional_color:this.currentSettings.directionalColor,particles_enabled:this.currentSettings.particlesEnabled,particle_count:this.currentSettings.particlesCount,particle_size:this.currentSettings.particlesSize,particle_color:this.currentSettings.particlesColor,particle_opacity:this.currentSettings.particlesOpacity,particle_speed:this.currentSettings.particlesSpeed,mobile_font_size_title:this.currentSettings.mobileFontSizeTitle,mobile_font_size_text:this.currentSettings.mobileFontSizeText,mobile_info_bg_color:this.currentSettings.mobileInfoBgColor,mobile_info_bg_opacity:this.currentSettings.mobileInfoBgOpacity,mobile_info_blur:this.currentSettings.mobileInfoBlur};console.log("[Theme Editor] Saving theme with primary_color:",i.primary_color,"mode:",i.primary_color_mode);try{if(window.flexframeSettings&&window.flexframeSettings.ajaxUrl){const a=await(await fetch(window.flexframeSettings.ajaxUrl,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({action:"flexframe_save_custom_preset",preset_name:e,preset_data:JSON.stringify(i),nonce:window.flexframeSettings.nonce||""})})).json();a.success?(this.showMessage(`Theme "${e}" saved! It will appear in Step 4 dropdown.`,"success"),this.panel.querySelector("#te-theme-name").value=""):this.showMessage(((s=a.data)==null?void 0:s.message)||"Error saving theme","error")}else{const r=JSON.parse(localStorage.getItem("flexframe_themes")||"{}");r[e]=i,localStorage.setItem("flexframe_themes",JSON.stringify(r)),this.showMessage(`Theme "${e}" saved locally!`,"success"),this.panel.querySelector("#te-theme-name").value=""}}catch(r){console.error("Error saving theme:",r),this.showMessage("Error saving theme: "+r.message,"error")}n.disabled=!1,n.innerHTML="Save Theme"}showMessage(e,n){const i=this.panel.querySelector("#te-save-message");i.textContent=e,i.className=`te-message te-message-${n}`,i.style.display="block",setTimeout(()=>{i.style.display="none"},4e3)}addStyles(){const e=document.createElement("style");e.textContent=`
            #theme-editor-panel {
                position: fixed;
                top: 0;
                right: 0;
                width: 320px;
                height: 100vh;
                background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
                color: #fff;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 13px;
                z-index: 10000;
                opacity: 0;
                transform: translateX(100%);
                transition: opacity 0.3s ease, transform 0.3s ease;
                box-shadow: -5px 0 30px rgba(0,0,0,0.5);
                display: flex;
                flex-direction: column;
            }
            
            #theme-editor-panel.hidden {
                display: none;
            }
            
            .te-header {
                padding: 16px 20px;
                background: linear-gradient(135deg, #0f3460 0%, #16213e 100%);
                border-bottom: 1px solid rgba(255,255,255,0.1);
                flex-shrink: 0;
            }
            
            .te-header-top {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 12px;
            }
            
            .te-header-top h2 {
                margin: 0;
                font-size: 18px;
                font-weight: 600;
                flex: 1;
            }
            
            .te-save-section {
                display: flex;
                gap: 10px;
                align-items: center;
            }
            
            .te-save-section input {
                flex: 1;
                padding: 10px 14px;
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 6px;
                background: rgba(255,255,255,0.1);
                color: #fff;
                font-size: 13px;
                outline: none;
            }
            
            .te-save-section input:focus {
                border-color: #e94560;
            }
            
            .te-save-section input::placeholder {
                color: rgba(255,255,255,0.4);
            }
            
            .te-hint {
                font-size: 11px;
                color: rgba(255,255,255,0.5);
            }
            
            .te-close-btn {
                background: none;
                border: none;
                color: #fff;
                font-size: 24px;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.2s;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .te-close-btn:hover {
                opacity: 1;
            }
            
            .te-content {
                flex: 1;
                overflow-y: auto;
                overflow-x: hidden;
                padding: 10px;
                padding-bottom: 80px;
                scroll-behavior: smooth;
            }
            
            /* Custom scrollbar for theme editor */
            .te-content::-webkit-scrollbar {
                width: 8px;
            }
            
            .te-content::-webkit-scrollbar-track {
                background: rgba(0,0,0,0.2);
            }
            
            .te-content::-webkit-scrollbar-thumb {
                background: rgba(255,255,255,0.3);
                border-radius: 4px;
            }
            
            .te-content::-webkit-scrollbar-thumb:hover {
                background: rgba(255,255,255,0.5);
            }
            
            .te-section {
                margin-bottom: 8px;
                background: rgba(255,255,255,0.05);
                border-radius: 8px;
                overflow: hidden;
            }
            
            /* Nested sections inside parent */
            .te-section .te-section.te-nested {
                margin: 8px 0 0 0;
                background: rgba(0,0,0,0.2);
                border-radius: 6px;
            }
            
            .te-section .te-section.te-nested:first-child {
                margin-top: 0;
            }
            
            .te-section-header {
                padding: 12px 16px;
                background: rgba(255,255,255,0.08);
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 10px;
                transition: background 0.2s;
            }
            
            .te-nested .te-section-header {
                padding: 10px 14px;
                background: rgba(255,255,255,0.05);
                font-size: 13px;
            }
            
            .te-section-header:hover {
                background: rgba(255,255,255,0.12);
            }
            
            .te-nested .te-section-header:hover {
                background: rgba(255,255,255,0.08);
            }
            
            .te-toggle-icon {
                margin-left: auto;
                font-size: 10px;
                opacity: 0.6;
            }
            
            .te-section-content {
                padding: 12px 16px;
                display: none;
            }
            
            /* Primary color section - always open by default */
            .te-section-content.te-section-open {
                display: block;
            }
            
            .te-primary-section {
                background: linear-gradient(135deg, rgba(74, 158, 255, 0.15) 0%, rgba(74, 158, 255, 0.05) 100%);
                border: 1px solid rgba(74, 158, 255, 0.3);
            }
            
            .te-primary-section .te-section-header {
                background: rgba(74, 158, 255, 0.2);
            }
            
            .te-section-desc {
                font-size: 11px;
                color: rgba(255,255,255,0.6);
                margin: 0 0 12px 0;
                line-height: 1.4;
            }
            
            .te-subsection {
                margin-bottom: 16px;
                padding-bottom: 16px;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }
            
            .te-subsection:last-child {
                margin-bottom: 0;
                padding-bottom: 0;
                border-bottom: none;
            }
            
            .te-subsection h4 {
                margin: 0 0 12px 0;
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: rgba(255,255,255,0.5);
            }
            
            .te-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 10px;
            }
            
            .te-row:last-child {
                margin-bottom: 0;
            }
            
            .te-row label {
                font-size: 12px;
                color: rgba(255,255,255,0.8);
            }
            
            .te-color-wrapper {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .te-color-input {
                width: 36px;
                height: 24px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                padding: 0;
                background: none;
            }
            
            .te-color-input::-webkit-color-swatch-wrapper {
                padding: 2px;
                background: transparent;
            }
            
            .te-color-input::-webkit-color-swatch {
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 3px;
            }
            
            .te-color-input::-moz-color-swatch {
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 3px;
            }
            
            /* Primary color input styling */
            #te-primaryColor {
                width: 60px;
                height: 32px;
                border: 2px solid rgba(74, 158, 255, 0.5);
                border-radius: 6px;
                cursor: pointer;
                padding: 0;
                background: #1a1a1a;
            }
            
            #te-primaryColor::-webkit-color-swatch-wrapper {
                padding: 3px;
                background: transparent;
            }
            
            #te-primaryColor::-webkit-color-swatch {
                border: none;
                border-radius: 4px;
            }
            
            #te-primaryColor::-moz-color-swatch {
                border: none;
                border-radius: 4px;
            }
            
            .te-color-hex {
                font-size: 11px;
                font-family: monospace;
                color: rgba(255,255,255,0.6);
                min-width: 60px;
            }
            
            .te-range-wrapper {
                display: flex;
                align-items: center;
                gap: 10px;
                flex: 1;
                max-width: 160px;
            }
            
            .te-range-input {
                flex: 1;
                height: 4px;
                -webkit-appearance: none;
                background: rgba(255,255,255,0.2);
                border-radius: 2px;
                outline: none;
            }
            
            .te-range-input::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 14px;
                height: 14px;
                background: #e94560;
                border-radius: 50%;
                cursor: pointer;
                transition: transform 0.2s;
            }
            
            .te-range-input::-webkit-slider-thumb:hover {
                transform: scale(1.2);
            }
            
            .te-range-value {
                font-size: 11px;
                font-family: monospace;
                color: rgba(255,255,255,0.6);
                min-width: 45px;
                text-align: right;
            }
            
            .te-checkbox-row {
                padding: 8px 0;
            }
            
            .te-toggle {
                position: relative;
                display: inline-block;
                width: 44px;
                height: 24px;
            }
            
            .te-toggle input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .te-toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(255,255,255,0.2);
                transition: 0.3s;
                border-radius: 24px;
            }
            
            .te-toggle-slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 3px;
                background-color: white;
                transition: 0.3s;
                border-radius: 50%;
            }
            
            .te-toggle input:checked + .te-toggle-slider {
                background-color: #e94560;
            }
            
            .te-toggle input:checked + .te-toggle-slider:before {
                transform: translateX(20px);
            }
            
            #te-theme-name {
                flex: 1;
                padding: 10px 14px;
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 6px;
                background: rgba(255,255,255,0.1);
                color: #fff;
                font-size: 13px;
                outline: none;
                transition: border-color 0.2s;
            }
            
            #te-theme-name:focus {
                border-color: #e94560;
            }
            
            #te-theme-name::placeholder {
                color: rgba(255,255,255,0.4);
            }
            
            .te-btn-primary {
                padding: 10px 16px;
                background: linear-gradient(135deg, #e94560 0%, #c23a51 100%);
                border: none;
                border-radius: 6px;
                color: #fff;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 6px;
                transition: transform 0.2s, box-shadow 0.2s;
                white-space: nowrap;
            }
            
            .te-btn-primary:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 15px rgba(233, 69, 96, 0.4);
            }
            
            .te-btn-primary:disabled {
                opacity: 0.6;
                cursor: not-allowed;
                transform: none;
            }
            
            .te-message {
                padding: 10px 14px;
                border-radius: 6px;
                font-size: 12px;
                display: none;
            }
            
            .te-message-success {
                background: rgba(0, 200, 83, 0.2);
                border: 1px solid rgba(0, 200, 83, 0.4);
                color: #00c853;
            }
            
            .te-message-error {
                background: rgba(255, 82, 82, 0.2);
                border: 1px solid rgba(255, 82, 82, 0.4);
                color: #ff5252;
            }
            
            /* Scrollbar styling */
            .te-content::-webkit-scrollbar {
                width: 6px;
            }
            
            .te-content::-webkit-scrollbar-track {
                background: rgba(255,255,255,0.05);
            }
            
            .te-content::-webkit-scrollbar-thumb {
                background: rgba(255,255,255,0.2);
                border-radius: 3px;
            }
            
            .te-content::-webkit-scrollbar-thumb:hover {
                background: rgba(255,255,255,0.3);
            }
        `,document.head.appendChild(e)}}console.log("[FlexFrame Build] main.js v28.4 loaded - AR Support - Build timestamp:",new Date().toISOString());function Ni(o){return window.flexframeSettings&&window.flexframeSettings.pluginUrl?o.startsWith("http://")||o.startsWith("https://")?o:window.flexframeSettings.pluginUrl+"assets/"+o:o}class G_{constructor(){this.sceneManager=null,this.cameraManager=null,this.lightingSystem=null,this.particleSystem=null,this.settingsManager=null,this.renderer=null,this.gui=null,this.sizes={width:window.innerWidth,height:window.innerHeight},this.clock=new bu,this.textureLoader=new Gc,this.gltfLoader=new a_,this.raycaster=new $c,this.mouse=new Ce,this.mixer=null,this.allClickableMeshes=[],this.ground=null,this.circleGeometry=null,this.planeGeometry=null,this.shadowGroundMaterial=null,this.solidGroundMaterial=null,this.useShadowMaterial=!1,this.backgroundParams={gradientTop:"#3865ad",gradientBottom:"#0101bc",gradientAlpha:1},this.groundParams={mode:"Infinite Canvas",color:"#222222",roughness:1,metalness:0,shadowOpacity:.4,receiveShadow:!0,castShadow:!1,visible:!0},this.playerStyleParams={backgroundColor:"#1f1f1f",backgroundOpacity:0,playerWidth:95,showTimeDisplay:!0,buttonColor:"#c20e1d",buttonOpacity:1,scrubberColor:"#c20e1d",scrubberOpacity:.7,textColor:"#dedede",textOpacity:1},this.loaderParams={spinnerStyle:"cool"},this.init()}async init(){this.sceneManager=new D0,this.cameraManager=new j0(this.sceneManager.getCanvas(),this.sizes),this.lightingSystem=new K0(this.sceneManager.getScene()),this.particleSystem=new Z0(this.sceneManager.getScene()),this.settingsManager=new Q0,this.animationPlayer=new J0,this.themeEditor=new V_(this),this.setupScreenshotButton(),this.setupARBranding(),setTimeout(()=>{this.setupQualityToggle()},100),console.log("🚀 CREATING MultiThumbnailMenuSystem..."),this.multiThumbnailMenuSystem=new s_,console.log("✅ MultiThumbnailMenuSystem created:",this.multiThumbnailMenuSystem),this.rightMenuSystem=new r_,window.menuManager=this.multiThumbnailMenuSystem,console.log("✅ window.menuManager set:",window.menuManager),window.rightMenuManager=this.rightMenuSystem,document.addEventListener("thumbnailSelected",e=>{console.log("Thumbnail selected:",e.detail.thumbnail)}),document.addEventListener("exercisesSelected",async e=>{const n=e.detail.item;if(this.currentExerciseName=n.name,this.screenshotPanel){const i=this.screenshotPanel.querySelector("#ss-filename");i&&(i.value=n.name)}if(n.configUrl)try{const i=`?t=${Date.now()}`,r=Ni(n.configUrl.replace("./",""))+i,l=await(await fetch(r)).json();if(this.currentConfig=l,ic.updateConfig(l),this.pendingModelConfig=l.model,this.modelUrlSQ=l.modelUrl||l.modelUrlSQ,this.modelUrlHQ=l.modelUrlHQ,this.currentModelQuality="SQ",this.updateQualityButtonVisibility(),this.modelUrlSQ&&await this.loadModel(this.modelUrlSQ),l.camera){const h=this.cameraManager.getCamera();l.camera.position&&h.position.set(...l.camera.position),l.camera.rotation&&h.rotation.set(...l.camera.rotation),l.camera.target&&this.cameraManager.getControls().target.set(...l.camera.target),this.cameraManager.getControls().update(),this.cameraManager.updateOriginalState(l.camera.position,l.camera.rotation,l.camera.target)}l.rightMenuTabs&&window.rightMenuManager&&window.rightMenuManager.updateFromConfig(l.rightMenuTabs)}catch(i){console.error("Failed to load exercise config:",i)}}),this.animationPlayer.setVisibility(!0),this.applyWordPressUISettings(),this.applyWordPressSceneSettings(),setTimeout(()=>{this.initializePlayerStyling()},100),this.setupCanvasInteraction(),this.screenshotManager=null,this.cameraManager.setScene(this.sceneManager.getScene()),window.camera=this.cameraManager.getCamera(),window.app=this,this.settingsManager.registerManager("background",{getSettings:()=>this.backgroundParams,applySettings:e=>{Object.assign(this.backgroundParams,e),this.sceneManager.updateGradientBackground(this.backgroundParams)}}),this.settingsManager.registerManager("ground",{getSettings:()=>this.groundParams,applySettings:e=>this.applyGroundSettings(e)}),this.settingsManager.registerManager("camera",this.cameraManager),this.settingsManager.registerManager("lighting",this.lightingSystem),this.settingsManager.registerManager("dustParticles",this.particleSystem),this.settingsManager.registerManager("animationPlayer",this.animationPlayer),this.settingsManager.registerManager("multiThumbnailMenuSystem",this.multiThumbnailMenuSystem),this.settingsManager.registerManager("rightMenuSystem",this.rightMenuSystem),this.settingsManager.registerManager("playerStyling",{getSettings:()=>this.playerStyleParams,applySettings:e=>{Object.assign(this.playerStyleParams,e),setTimeout(()=>{this.initializePlayerStyling(),this.gui&&typeof this.gui.updateDisplay=="function"&&this.gui.updateDisplay()},200)}}),this.settingsManager.registerManager("loader",{getSettings:()=>this.loaderParams,applySettings:e=>{Object.assign(this.loaderParams,e),this.updateLoaderSpinner()}}),this.setupRenderer(),this.setupGround(),this.setupGUI(),this.setupEventListeners(),this.sceneManager.updateGradientBackground(this.backgroundParams),await this.waitForDefaultSettings(),this.settingsManager.applyDefaultSettings(),this.applyWordPressSceneSettings(),setTimeout(()=>this.updateAllGUIControls(),500),this.animationPlayer.setVisibility(!0),this.checkUrlForExercise(),this.animate()}checkUrlForExercise(){let n=new URLSearchParams(window.location.search).get("exercise");if(!n&&window.location.hash&&(n=window.location.hash.substring(1)),!n)return;console.log("🔗 URL exercise parameter found:",n);const i=n.toLowerCase().replace(/-/g,"_").replace(/%20/g,"_").replace(/ /g,"_");this.waitForExercisesAndSelect(i,n)}async waitForExercisesAndSelect(e,n){var r,a,l;let i=0;const s=50;for(;i<s;){const h=window.menuManager;if(((l=(a=(r=h==null?void 0:h.menus)==null?void 0:r.search)==null?void 0:a.allExercises)==null?void 0:l.length)>0){const c=h.menus.search.allExercises,d=c.find(u=>{var y,_,g,f;const p=(y=u.id)==null?void 0:y.toLowerCase().replace(/-/g,"_"),m=(_=u.name)==null?void 0:_.toLowerCase().replace(/ /g,"_").replace(/-/g,"_");return p===e||m===e||((g=u.id)==null?void 0:g.toLowerCase())===n.toLowerCase()||((f=u.name)==null?void 0:f.toLowerCase())===n.toLowerCase().replace(/_/g," ").replace(/-/g," ")});if(d){console.log("✅ Found exercise from URL:",d.name);const u=new CustomEvent("exercisesSelected",{detail:{item:d,menuType:"url-preload"}});document.dispatchEvent(u),h.menus.search&&(h.menus.search.selectedId=d.id);return}else{console.warn("⚠️ Exercise not found for URL slug:",n),console.log("Available exercise IDs:",c.map(u=>u.id).slice(0,10));return}}await new Promise(c=>setTimeout(c,100)),i++}console.warn("⚠️ Timed out waiting for exercises to load for URL preload")}async waitForDefaultSettings(){for(;!this.settingsManager.getDefaultSettings();)await new Promise(e=>setTimeout(e,100))}setupRenderer(){this.renderer=new Zc({canvas:this.sceneManager.getCanvas(),antialias:!0}),this.renderer.setSize(this.sizes.width,this.sizes.height),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=hc,this.renderer.toneMapping=uc,this.renderer.toneMappingExposure=1}updateLoaderSpinner(){const e=document.getElementById("model-loader");if(!e)return;e.querySelectorAll(".spinner-box").forEach(s=>s.style.display="none");const i=e.querySelector(`[data-spinner="${this.loaderParams.spinnerStyle}"]`);i&&(i.style.display="flex")}updateLoadProgress(e){const n=document.getElementById("logo-progress-bar"),i=document.getElementById("logo-progress-text");e===-1?(n&&(n.style.width="100%",n.style.animation="indeterminateProgress 1.5s ease-in-out infinite"),i&&(i.textContent="Loading...")):(n&&(n.style.animation="none",n.style.width=`${e}%`),i&&(i.textContent=`${e}%`))}applyWordPressUISettings(){var s;if(!window.flexframeSettings||!window.flexframeSettings.uiSettings){console.log("[FlexFrame UI] No WordPress UI settings found, using defaults");return}const e=window.flexframeSettings.uiSettings;if(console.log("[FlexFrame UI] Applying WordPress UI settings:",e),e.player){const r=e.player.alwaysVisible===!0;console.log("[FlexFrame UI] Player always visible setting:",r),this.animationPlayer&&(this.animationPlayer.setAlwaysVisible(r),console.log("[FlexFrame UI] Applied alwaysVisible to animation player")),e.player.bgColor&&(this.playerStyleParams.backgroundColor=e.player.bgColor),e.player.bgOpacity!==void 0&&(this.playerStyleParams.backgroundOpacity=e.player.bgOpacity),e.player.buttonColor&&(this.playerStyleParams.buttonColor=e.player.buttonColor),e.player.accentColor&&(this.playerStyleParams.scrubberColor=e.player.accentColor)}const n=((s=window.flexframeSettings)==null?void 0:s.primaryColor)||"#4a9eff",i=e.spinnerColor||n;this.updateSpinnerColor(i),this.updateProgressBarColor(n),console.log("[FlexFrame UI] Spinner color:",i,", Progress bar color (primary):",n)}applyWordPressSceneSettings(){var e,n,i,s;if((e=window.flexframeSettings)!=null&&e.backgroundSettings){const r=window.flexframeSettings.backgroundSettings;console.log("[FlexFrame Scene] Applying WordPress background settings:",r),this.backgroundParams.gradientTop=r.gradientTop||"#3865ad",this.backgroundParams.gradientBottom=r.gradientBottom||"#0101bc",this.backgroundParams.gradientAlpha=r.gradientAlpha??1,this.sceneManager&&this.sceneManager.updateGradientBackground(this.backgroundParams)}if((n=window.flexframeSettings)!=null&&n.lightingSettings&&this.lightingSystem){const r=window.flexframeSettings.lightingSettings;if(console.log("[FlexFrame Scene] Applying WordPress lighting settings:",r),r.ambientLight&&(r.ambientLight.intensity!==void 0&&(this.lightingSystem.ambientLight.intensity=r.ambientLight.intensity),r.ambientLight.color&&this.lightingSystem.ambientLight.color.set(r.ambientLight.color)),r.directionalLight&&(r.directionalLight.intensity!==void 0&&(this.lightingSystem.directionalLight.intensity=r.directionalLight.intensity),r.directionalLight.color&&this.lightingSystem.directionalLight.color.set(r.directionalLight.color),r.directionalLight.position)){const a=r.directionalLight.position;a.x!==void 0&&(this.lightingSystem.directionalLight.position.x=a.x),a.y!==void 0&&(this.lightingSystem.directionalLight.position.y=a.y),a.z!==void 0&&(this.lightingSystem.directionalLight.position.z=a.z)}}if((i=window.flexframeSettings)!=null&&i.particleSettings&&this.particleSystem){const r=window.flexframeSettings.particleSettings;console.log("[FlexFrame Scene] Applying WordPress particle settings:",r),r.visible!==void 0&&(this.particleSystem.params.visible=r.visible),r.count!==void 0&&(this.particleSystem.params.count=r.count),r.size!==void 0&&(this.particleSystem.params.size=r.size);const a=(s=window.flexframeSettings)==null?void 0:s.primaryColor;a?(this.particleSystem.params.color=a,console.log("[FlexFrame Scene] Using primary color for particles:",a)):r.color&&(this.particleSystem.params.color=r.color),r.opacity!==void 0&&(this.particleSystem.params.opacity=r.opacity),r.speed!==void 0&&(this.particleSystem.params.speed=r.speed),this.particleSystem.createDustParticles()}}updateSpinnerColor(e){const n=document.createElement("style");n.id="flexframe-spinner-color";const i=(r,a)=>{const l=parseInt(r.slice(1,3),16),h=parseInt(r.slice(3,5),16),c=parseInt(r.slice(5,7),16);return`rgba(${l}, ${h}, ${c}, ${a})`};n.textContent=`
            /* COOL SPINNER (original) */
            #model-loader .loader-spinner {
                background: conic-gradient(
                    from 0deg,
                    transparent 0%,
                    ${i(e,.3)} 30%,
                    ${i(e,.8)} 60%,
                    ${e} 80%,
                    ${e} 100%
                ) !important;
            }
            #model-loader .loader-spinner::before {
                box-shadow: inset 0 0 10px ${i(e,.3)} !important;
            }
            
            /* GRADIENT SPINNER (circle-border) */
            #model-loader .circle-border {
                background: linear-gradient(0deg, ${i(e,.1)} 33%, ${e} 100%) !important;
            }
            
            /* GRADIENT CIRCLE PLANES (leo-border) */
            #model-loader .leo-border-1 {
                background: linear-gradient(0deg, ${i(e,.1)} 33%, ${e} 100%) !important;
            }
            #model-loader .leo-border-2 {
                background: linear-gradient(0deg, ${i(e,.1)} 33%, ${e} 100%) !important;
            }
            
            /* SPINNING SQUARES (configure-border) */
            #model-loader .configure-border-1 {
                background: ${e} !important;
            }
            #model-loader .configure-border-2 {
                background: ${e} !important;
            }
            
            /* LOADING DOTS (pulse-bubble) */
            #model-loader .pulse-bubble {
                background-color: ${e} !important;
            }
            
            /* SOLAR SYSTEM (planets) */
            #model-loader .planet {
                background-color: ${e} !important;
            }
            #model-loader .sun {
                background-color: ${e} !important;
            }
            
            /* SPINNER ORBITS */
            #model-loader .blue-orbit {
                border-color: ${i(e,.65)} !important;
            }
            #model-loader .green-orbit {
                border-color: ${i(e,.65)} !important;
            }
            #model-loader .red-orbit {
                border-color: ${i(e,.65)} !important;
            }
            
            /* THREE QUARTER SPINNER */
            #model-loader .three-quarter-spinner {
                border-color: ${e} !important;
                border-top-color: transparent !important;
            }
            
            /* Loader text color */
            #model-loader .loader-text {
                color: ${e} !important;
            }
        `;const s=document.getElementById("flexframe-spinner-color");s&&s.remove(),document.head.appendChild(n),console.log("[FlexFrame] Spinner color updated to:",e)}updateProgressBarColor(e){const n=document.createElement("style");n.id="flexframe-progress-color";const i=(r,a)=>{const l=parseInt(r.slice(1,3),16),h=parseInt(r.slice(3,5),16),c=parseInt(r.slice(5,7),16);return`rgba(${l}, ${h}, ${c}, ${a})`};n.textContent=`
            /* LOGO LOADER - Progress bar and text */
            .logo-progress-bar {
                background: linear-gradient(90deg, ${i(e,.5)}, ${e}) !important;
            }
            .logo-progress-text {
                color: ${e} !important;
            }
            
            /* Indeterminate progress animation */
            @keyframes indeterminateProgress {
                0% { 
                    width: 30%;
                    margin-left: 0%;
                    background: linear-gradient(90deg, ${i(e,.3)}, ${e});
                }
                50% { 
                    width: 50%;
                    margin-left: 25%;
                    background: linear-gradient(90deg, ${e}, ${i(e,.3)});
                }
                100% { 
                    width: 30%;
                    margin-left: 70%;
                    background: linear-gradient(90deg, ${i(e,.3)}, ${e});
                }
            }
        `;const s=document.getElementById("flexframe-progress-color");s&&s.remove(),document.head.appendChild(n),console.log("[FlexFrame] Progress bar color updated to:",e)}setupCanvasInteraction(){const e=this.sceneManager.getCanvas();if(!e){console.warn("[FlexFrame] Canvas not found for interaction setup");return}e.addEventListener("click",()=>{this.animationPlayer&&this.animationPlayer.onCanvasInteraction()});let n=null;e.addEventListener("mousemove",()=>{n||(n=setTimeout(()=>{n=null},100),this.animationPlayer&&this.animationPlayer.onCanvasInteraction())})}initializePlayerStyling(){console.log("[FlexFrame UI] initializePlayerStyling called with params:",this.playerStyleParams),this.updatePlayerBackgroundColor(this.playerStyleParams.backgroundColor),this.updatePlayerBackgroundOpacity(this.playerStyleParams.backgroundOpacity),this.updatePlayerTimeDisplay(this.playerStyleParams.showTimeDisplay),this.updatePlayerButtonColor(this.playerStyleParams.buttonColor),this.updatePlayerButtonOpacity(this.playerStyleParams.buttonOpacity),this.updatePlayerScrubberColor(this.playerStyleParams.scrubberColor),this.updatePlayerScrubberOpacity(this.playerStyleParams.scrubberOpacity),this.updatePlayerTextColor(this.playerStyleParams.textColor),this.updatePlayerTextOpacity(this.playerStyleParams.textOpacity),this.initializeScrubberWidth()}initializeScrubberWidth(){const e=document.createElement("style");e.id="scrubber-width-style",e.textContent=`
            .animation-player .player-controls {
                display: flex !important;
                align-items: center !important;
                width: 100% !important;
            }
            .animation-player .player-center {
                flex: 1 !important;
                margin: 0 10px !important;
                display: flex !important;
                align-items: center !important;
            }
            .animation-player .timeline-slider {
                width: 100% !important;
                flex: 1 !important;
            }
            .animation-player .player-left,
            .animation-player .player-right {
                flex-shrink: 0 !important;
            }
        `;const n=document.getElementById("scrubber-width-style");n&&n.remove(),document.head.appendChild(e)}setupGround(){const e=this.textureLoader.load(Ni("textures/gradients/3.jpg"));e.wrapS=Jt,e.wrapT=Jt,e.needsUpdate=!0,this.circleGeometry=new Ca(5,64),this.planeGeometry=new As(30,30),this.shadowGroundMaterial=new Qd({opacity:.4}),this.solidGroundMaterial=new Cr({color:2236962,roughness:1,metalness:0}),this.ground=new Gt(this.circleGeometry,this.shadowGroundMaterial),this.ground.rotation.x=-Math.PI/2,this.ground.position.y=-.01,this.ground.receiveShadow=!0,this.ground.castShadow=!1,this.ground.visible=!0,this.sceneManager.getScene().add(this.ground)}updateAllGUIControls(){this.gui&&this.gui.controllersRecursive().forEach(e=>{e.updateDisplay()})}gatherModelSpecificSettings(){const e={};return this.currentConfig&&this.currentConfig.exerciseId&&(e.exerciseId=this.currentConfig.exerciseId),this.currentConfig&&(this.currentConfig.modelUrlSQ&&(e.modelUrlSQ=this.currentConfig.modelUrlSQ),this.currentConfig.modelUrlHQ&&(e.modelUrlHQ=this.currentConfig.modelUrlHQ),this.currentConfig.modelUrl&&!e.modelUrlSQ&&(e.modelUrl=this.currentConfig.modelUrl)),e.model=window.model?{position:window.model.position.toArray(),rotation:[window.model.rotation.x,window.model.rotation.y,window.model.rotation.z],scale:window.model.scale.toArray()}:{position:[0,-.02,0],rotation:[0,0,0],scale:[1,1,1]},e.camera=this.cameraManager.getSettings(),e}setupGUIStyles(){const e=document.createElement("style");e.textContent=`
            .lil-gui .lil-gui .title {
                background: rgba(220, 53, 69, 0.15) !important;
                border-bottom: 1px solid rgba(220, 53, 69, 0.3) !important;
                color: #dc3545 !important;
                font-weight: 600 !important;
            }
            .lil-gui .title {
                background: rgba(220, 53, 69, 0.2) !important;
                border-bottom: 1px solid rgba(220, 53, 69, 0.4) !important;
                color: #dc3545 !important;
                font-weight: 700 !important;
            }
            
            /* Material Colors main folder - Blue theme */
            .materials-folder-main > .title {
                background: rgba(74, 158, 255, 0.25) !important;
                border-bottom: 1px solid rgba(74, 158, 255, 0.5) !important;
                color: #4a9eff !important;
                font-weight: 700 !important;
            }
            
            /* Material sub-folders - Lighter blue */
            .materials-folder-main .lil-gui .title {
                background: rgba(74, 158, 255, 0.15) !important;
                border-bottom: 1px solid rgba(74, 158, 255, 0.3) !important;
                color: #6bb3ff !important;
                font-weight: 600 !important;
            }
            
            .gui-controls {
                margin-bottom: 10px;
                padding: 5px;
                background: rgba(0,0,0,0.1);
                border-radius: 3px;
            }
            
            /* Hide any emoji/icon pseudo-elements */
            .lil-gui .title::before,
            .lil-gui .title::after {
                display: none !important;
                content: '' !important;
            }
        `,document.head.querySelector("style[data-gui-styles]")||(e.setAttribute("data-gui-styles","true"),document.head.appendChild(e))}setupGUIControls(){const e=this.gui.addFolder("GUI Controls"),n={expandAll:()=>{this.allFolders.forEach(i=>i.open()),console.log("📂 All GUI folders expanded")},collapseAll:()=>{this.allFolders.forEach(i=>i.close()),console.log("📁 All GUI folders collapsed")}};e.add(n,"expandAll").name("Expand All"),e.add(n,"collapseAll").name("Collapse All"),e.open()}trackFolder(e){return this.allFolders.push(e),e}setupGUI(){this.gui=new Ua,this.allFolders=[],this.setupGUIStyles(),this.setupGUIControls(),this.setupSimpleScreenshotGUI(),this.gui.add({saveSettings:async()=>{await this.settingsManager.saveSettingsToClipboard(),console.log("All settings saved:",this.settingsManager.gatherAllSettings())}},"saveSettings").name("Save All Settings"),this.gui.add({saveModelSettings:async()=>{const i=this.gatherModelSpecificSettings(),s=JSON.stringify(i,null,2);try{await navigator.clipboard.writeText(s),alert("Model-specific settings copied to clipboard!"),console.log("Model settings saved:",i)}catch(r){console.error("Failed to copy to clipboard:",r),alert("Failed to copy settings to clipboard.")}}},"saveModelSettings").name("Save Model Settings"),this.gui.add({importSettings:async()=>{await this.settingsManager.importSettingsFromClipboard(),setTimeout(()=>this.updateAllGUIControls(),100)}},"importSettings").name("Import Settings"),this.gui.add({exportFile:()=>this.settingsManager.exportAsFile("scene-settings.json")},"exportFile").name("Export to File"),this.gui.add({importFile:async()=>{try{await this.settingsManager.importFromFile(),setTimeout(()=>this.updateAllGUIControls(),100),alert("Settings imported from file!")}catch(i){alert("Failed to import file: "+i.message)}}},"importFile").name("Import from File");const e={"Cinematic Blue":()=>{const i={background:{gradientTop:"#3865ad",gradientBottom:"#030391",gradientAlpha:1},ground:{mode:"Infinite Canvas",color:"#222222",roughness:1,metalness:0,shadowOpacity:.4,receiveShadow:!0,castShadow:!1,visible:!0},camera:{position:[.6497189477206844,.620065800043649,-.3267521547833202],rotation:[-2.480393214032852,1.0626661205247725,2.5446012015171644],target:[-.04078270409635462,.38393067967272315,-.023247738115800942]},lighting:{directionalLight:{intensity:1.43,color:"#ffffff",castShadow:!0,shadowBias:0,shadowBlur:1,shadowMapWidth:1024,shadowMapHeight:1024,posX:1.35,posY:1.57,posZ:.9,showHelper:!1,position:{x:1.35,y:1.57,z:.9}},ambientLight:{intensity:.4,color:"#ffffff"}},dustParticles:{count:1210,size:.02,sizeRandomness:1.2,color:"#0d14d3",opacity:.11,speed:.5,horizontalRange:3,verticalRange:2,verticalOffset:1,visible:!0,blur:.3,depthBlur:!0,depthBlurStrength:.5,depthFocusDistance:3,depthFocusRange:1.5},model:{position:[0,-.02,0],rotation:[0,0,0],scale:[1,1,1]}};this.settingsManager.applyAllSettings(i),setTimeout(()=>this.updateAllGUIControls(),100)},"Reset to Default":()=>{this.settingsManager.applyDefaultSettings(),setTimeout(()=>this.updateAllGUIControls(),100)}},n=this.trackFolder(this.gui.addFolder("Scene Presets"));n.add(e,"Cinematic Blue").name("Cinematic Blue"),n.add(e,"Reset to Default").name("Reset to Default"),this.setupBackgroundGUI(),this.setupGroundGUI(),this.setupParticlesGUI(),this.setupLoaderGUI(),this.setupLightingGUI(),this.setupCameraGUI(),this.setupMultiThumbnailMenuGUI(),this.setupGUIVisibilityToggle()}setupBackgroundGUI(){this.gui.addColor(this.backgroundParams,"gradientTop").name("Gradient Top").onChange(()=>this.sceneManager.updateGradientBackground(this.backgroundParams)),this.gui.addColor(this.backgroundParams,"gradientBottom").name("Gradient Bottom").onChange(()=>this.sceneManager.updateGradientBackground(this.backgroundParams)),this.gui.add(this.backgroundParams,"gradientAlpha",0,1,.01).name("Gradient Alpha").onChange(()=>this.sceneManager.updateGradientBackground(this.backgroundParams))}setupGroundGUI(){const e=this.trackFolder(this.gui.addFolder("Ground Plane"));e.add(this.groundParams,"mode",["Solid","Infinite Canvas"]).name("Type").onChange(n=>this.updateGroundMode(n)),e.addColor(this.groundParams,"color").name("Color").onChange(n=>this.solidGroundMaterial.color.set(n)),e.add(this.groundParams,"roughness",0,1,.01).name("Roughness").onChange(n=>this.solidGroundMaterial.roughness=n),e.add(this.groundParams,"metalness",0,1,.01).name("Metalness").onChange(n=>this.solidGroundMaterial.metalness=n),e.add(this.groundParams,"shadowOpacity",0,1,.01).name("Shadow Opacity").onChange(n=>this.shadowGroundMaterial.opacity=n),e.add(this.groundParams,"receiveShadow").name("Receive Shadow").onChange(n=>this.ground.receiveShadow=n),e.add(this.groundParams,"castShadow").name("Cast Shadow").onChange(n=>this.ground.castShadow=n),e.add(this.groundParams,"visible").name("Visible").onChange(n=>this.ground.visible=n)}setupLoaderGUI(){const e=this.trackFolder(this.gui.addFolder("Loading Spinner")),n={"Cool Gradient":"cool","Simple Gradient":"gradient","3D Orbits":"orbits","Gradient Planes":"planes","Spinning Squares":"squares","Pulse Dots":"dots","Solar System":"solar","Three Quarter":"quarter"};e.add(this.loaderParams,"spinnerStyle",n).name("Spinner Style").onChange(()=>this.updateLoaderSpinner())}setupParticlesGUI(){const e=this.trackFolder(this.gui.addFolder("Dust Particles")),n=this.particleSystem.getParams();e.add(n,"count",50,2e3,10).name("Count").onChange(c=>this.particleSystem.updateCount(c)),e.add(n,"size",.001,.02,1e-4).name("Size").onChange(c=>this.particleSystem.updateSize(c)),e.add(n,"sizeRandomness",0,2,.1).name("Size Variation").onChange(c=>this.particleSystem.updateSizeRandomness(c)),e.addColor(n,"color").name("Color").onChange(c=>this.particleSystem.updateColor(c)),e.add(n,"opacity",0,1,.01).name("Opacity").onChange(c=>this.particleSystem.updateOpacity(c)),e.add(n,"speed",0,3,.1).name("Float Speed"),e.add(n,"visible").name("Visible").onChange(c=>this.particleSystem.setVisible(c));const i=this.trackFolder(e.addFolder("Blur Effects"));i.add(n,"blur",0,1,.01).name("Particle Blur").onChange(c=>this.particleSystem.updateBlur(c));const s=this.trackFolder(e.addFolder("Depth of Field"));s.add(n,"depthBlur").name("Enable Depth Blur").onChange(c=>this.particleSystem.updateDepthBlur(c)),s.add(n,"depthBlurStrength",0,1,.01).name("Blur Strength").onChange(c=>this.particleSystem.updateDepthBlurStrength(c)),s.add(n,"depthFocusDistance",.5,10,.1).name("Focus Distance").onChange(c=>this.particleSystem.updateDepthFocus(c,n.depthFocusRange)),s.add(n,"depthFocusRange",.1,5,.1).name("Focus Range").onChange(c=>this.particleSystem.updateDepthFocus(n.depthFocusDistance,c));const r=this.trackFolder(e.addFolder("Position & Range"));r.add(n,"horizontalRange",.5,10,.1).name("Horizontal Range").onChange(()=>this.particleSystem.updateRange(n.horizontalRange,n.verticalRange)),r.add(n,"verticalRange",.5,5,.1).name("Vertical Range").onChange(()=>this.particleSystem.updateRange(n.horizontalRange,n.verticalRange)),r.add(n,"verticalOffset",-2,3,.1).name("Height Offset").onChange(c=>this.particleSystem.updateOffset(c));const a={"Portrait DOF":()=>{n.depthBlur=!0,n.depthBlurStrength=.7,n.depthFocusDistance=2,n.depthFocusRange=.5,n.blur=.2,this.particleSystem.updateDepthBlur(!0),this.particleSystem.updateDepthBlurStrength(.7),this.particleSystem.updateDepthFocus(2,.5),this.particleSystem.updateBlur(.2),s.controllersRecursive().forEach(c=>c.updateDisplay()),i.controllersRecursive().forEach(c=>c.updateDisplay())},"Macro DOF":()=>{n.depthBlur=!0,n.depthBlurStrength=.9,n.depthFocusDistance=1,n.depthFocusRange=.2,n.blur=.4,this.particleSystem.updateDepthBlur(!0),this.particleSystem.updateDepthBlurStrength(.9),this.particleSystem.updateDepthFocus(1,.2),this.particleSystem.updateBlur(.4),s.controllersRecursive().forEach(c=>c.updateDisplay()),i.controllersRecursive().forEach(c=>c.updateDisplay())},"Cinematic DOF":()=>{n.depthBlur=!0,n.depthBlurStrength=.5,n.depthFocusDistance=3,n.depthFocusRange=1.5,n.blur=.3,this.particleSystem.updateDepthBlur(!0),this.particleSystem.updateDepthBlurStrength(.5),this.particleSystem.updateDepthFocus(3,1.5),this.particleSystem.updateBlur(.3),s.controllersRecursive().forEach(c=>c.updateDisplay()),i.controllersRecursive().forEach(c=>c.updateDisplay())},"No DOF":()=>{n.depthBlur=!1,n.blur=0,this.particleSystem.updateDepthBlur(!1),this.particleSystem.updateBlur(0),s.controllersRecursive().forEach(c=>c.updateDisplay()),i.controllersRecursive().forEach(c=>c.updateDisplay())}};s.add(a,"Portrait DOF").name("Portrait DOF"),s.add(a,"Macro DOF").name("Macro DOF"),s.add(a,"Cinematic DOF").name("Cinematic DOF"),s.add(a,"No DOF").name("Disable DOF");const l={"Light Dust":()=>{this.particleSystem.applyPreset("Light Dust"),e.controllersRecursive().forEach(c=>c.updateDisplay())},"Heavy Dust":()=>{this.particleSystem.applyPreset("Heavy Dust"),e.controllersRecursive().forEach(c=>c.updateDisplay())},"Magical Sparkles":()=>{this.particleSystem.applyPreset("Magical Sparkles"),e.controllersRecursive().forEach(c=>c.updateDisplay())},"Reset Dust":()=>{this.particleSystem.applyPreset("Reset Dust"),e.controllersRecursive().forEach(c=>c.updateDisplay())}},h=this.trackFolder(e.addFolder("Particle Presets"));h.add(l,"Light Dust").name("Light Dust"),h.add(l,"Heavy Dust").name("Heavy Dust"),h.add(l,"Magical Sparkles").name("Magical Sparkles"),h.add(l,"Reset Dust").name("Reset Dust")}setupLightingGUI(){const e=this.trackFolder(this.gui.addFolder("Lights")),n=this.lightingSystem.getLights(),i=this.lightingSystem.getSettings(),s=this.trackFolder(e.addFolder("Directional Light")),r=i.directionalLight;s.add(r,"intensity",0,5,.01).name("Intensity").onChange(h=>n.directional.intensity=h),s.addColor(r,"color").name("Color").onChange(h=>n.directional.color.set(h)),s.add(r,"castShadow").name("Cast Shadow").onChange(h=>n.directional.castShadow=h),s.add(r,"shadowBias",-.05,.05,1e-4).name("Shadow Bias").onChange(h=>n.directional.shadow.bias=h),s.add(r,"shadowBlur",0,10,.1).name("Shadow Blur").onChange(h=>n.directional.shadow.radius=h),s.add(r,"shadowMapWidth",256,4096,1).name("Shadow Map Width").onChange(h=>{n.directional.shadow.mapSize.width=h,n.directional.shadow.map&&n.directional.shadow.map.dispose()}),s.add(r,"shadowMapHeight",256,4096,1).name("Shadow Map Height").onChange(h=>{n.directional.shadow.mapSize.height=h,n.directional.shadow.map&&n.directional.shadow.map.dispose()}),s.add(r,"posX",-10,10,.01).name("Position X").onChange(h=>n.directional.position.x=h),s.add(r,"posY",-10,10,.01).name("Position Y").onChange(h=>n.directional.position.y=h),s.add(r,"posZ",-10,10,.01).name("Position Z").onChange(h=>n.directional.position.z=h),s.add(r,"showHelper").name("Show Helper").onChange(h=>n.directionalHelper.visible=h);const a=this.trackFolder(e.addFolder("Ambient Light")),l=i.ambientLight;a.add(l,"intensity",0,2,.01).name("Intensity").onChange(h=>n.ambient.intensity=h),a.addColor(l,"color").name("Color").onChange(h=>n.ambient.color.set(h))}setupCameraGUI(){const e=this.trackFolder(this.gui.addFolder("Camera Controls")),n=this.cameraManager.getCamera(),i=this.cameraManager.getControls(),s=this.trackFolder(e.addFolder("Zoom Range"));s.add(i,"minDistance",.001,1,.001).name("Min Zoom Distance"),s.add(i,"maxDistance",10,500,1).name("Max Zoom Distance"),s.add(i,"zoomSpeed",.1,2,.1).name("Zoom Speed");const r=this.trackFolder(e.addFolder("Field of View"));r.add({fov:n.fov},"fov",10,150,1).name("FOV (degrees)").onChange(v=>{this.cameraManager.setFOV(v)}),r.add({copyCameraSettings:()=>{this.cameraManager.copyCameraSettingsToClipboard()}},"copyCameraSettings").name("Copy Camera Settings"),r.add({copyAllSettings:()=>{this.cameraManager.copyAllSettingsToClipboard(this.settingsManager)}},"copyAllSettings").name("Copy ALL GUI Settings");const a=this.trackFolder(e.addFolder("Zoom Momentum")),l=this.cameraManager;a.add(l,"zoomDecay",.8,.99,.01).name("Momentum Decay"),a.add(l,"zoomMomentumThreshold",.001,.1,.001).name("Momentum Threshold");const h={value:1};a.add(h,"value",.1,5,.1).name("Velocity Multiplier").onChange(v=>{l.velocityMultiplier=v}),e.add({resetCamera:()=>{this.cameraManager.resetCamera(),console.log("Camera fully reset to defaults")}},"resetCamera").name("Reset Camera"),e.add({testMomentum:()=>{console.log("Testing momentum..."),l.zoomMomentum=.2,l.momentumActive=!0,console.log("Momentum set to:",l.zoomMomentum)}},"testMomentum").name("Test Momentum"),e.add({clearMomentum:()=>{l.zoomMomentum=0,l.momentumActive=!1,console.log("Momentum cleared")}},"clearMomentum").name("Clear Momentum");const c=this.trackFolder(e.addFolder("Debug Info")),d={currentDistance:0,momentum:0,targetX:0,targetY:0,targetZ:0};c.add(d,"currentDistance").name("Distance").listen(),c.add(d,"momentum").name("Momentum").listen(),c.add(d,"targetX").name("Target X").listen(),c.add(d,"targetY").name("Target Y").listen(),c.add(d,"targetZ").name("Target Z").listen();const u=()=>{d.currentDistance=n.position.distanceTo(i.target),d.momentum=l.zoomMomentum||0,d.targetX=i.target.x,d.targetY=i.target.y,d.targetZ=i.target.z};this.updateCameraDebug=u,l.velocityMultiplier=.4;const p=this.trackFolder(e.addFolder("Coordinates")),m={x:0,y:0,z:0};p.add(m,"x").name("Center X").listen(),p.add(m,"y").name("Center Y").listen(),p.add(m,"z").name("Center Z").listen();const y=this.trackFolder(p.addFolder("Manual Control")),_={x:this.cameraManager.getRotationCenter().x,y:this.cameraManager.getRotationCenter().y,z:this.cameraManager.getRotationCenter().z};y.add(_,"x",-5,5,.001).name("Set X Position").onChange(v=>{this.cameraManager.setRotationCenterX(v)}).listen(),y.add(_,"y",-5,5,.001).name("Set Y Position").onChange(v=>{this.cameraManager.setRotationCenterY(v)}).listen(),y.add(_,"z",-5,5,.001).name("Set Z Position").onChange(v=>{this.cameraManager.setRotationCenterZ(v)}).listen(),p.add({copyCoords:()=>{this.cameraManager.copyCoordinatesToClipboard()}},"copyCoords").name("Copy Coordinates");const g=this.updateCameraDebug;this.updateCameraDebug=()=>{g&&g();const v=this.cameraManager.getRotationCenter();m.x=parseFloat(v.x.toFixed(6)),m.y=parseFloat(v.y.toFixed(6)),m.z=parseFloat(v.z.toFixed(6)),_.x=v.x,_.y=v.y,_.z=v.z};const f=this.trackFolder(e.addFolder("Animation Player")),S={showPlayer:this.animationPlayer?this.animationPlayer.isVisible:!0,alwaysVisible:this.animationPlayer?this.animationPlayer.alwaysVisible:!1};f.add(S,"showPlayer").name("Show Animation Player").onChange(v=>{this.animationPlayer&&(this.animationPlayer.setVisibility(v),S.showPlayer=v)}),f.add(S,"alwaysVisible").name("Always Visible (No Auto-Hide)").onChange(v=>{this.animationPlayer&&(this.animationPlayer.setAlwaysVisible(v),S.alwaysVisible=v)});const w=this.trackFolder(f.addFolder("Player Styling")),x=this.trackFolder(w.addFolder("Background"));x.addColor(this.playerStyleParams,"backgroundColor").name("Background Color").onChange(v=>{this.updatePlayerBackgroundColor(v)}),x.add(this.playerStyleParams,"backgroundOpacity",0,1,.1).name("Background Opacity").onChange(v=>{this.updatePlayerBackgroundOpacity(v)}),this.trackFolder(w.addFolder("Dimensions")).add(this.playerStyleParams,"playerWidth",20,100,1).name("Player Width (%)").onChange(v=>{}),this.trackFolder(w.addFolder("Display")).add(this.playerStyleParams,"showTimeDisplay").name("Show Time Display").onChange(v=>{this.updatePlayerTimeDisplay(v)});const A=this.trackFolder(w.addFolder("Buttons"));A.addColor(this.playerStyleParams,"buttonColor").name("Button Color").onChange(v=>{this.updatePlayerButtonColor(v)}),A.add(this.playerStyleParams,"buttonOpacity",0,1,.1).name("Button Opacity").onChange(v=>{this.updatePlayerButtonOpacity(v)});const C=this.trackFolder(w.addFolder("Timeline"));C.addColor(this.playerStyleParams,"scrubberColor").name("Scrubber Color").onChange(v=>{this.updatePlayerScrubberColor(v)}),C.add(this.playerStyleParams,"scrubberOpacity",0,1,.1).name("Scrubber Opacity").onChange(v=>{this.updatePlayerScrubberOpacity(v)});const E=this.trackFolder(w.addFolder("Text"));E.addColor(this.playerStyleParams,"textColor").name("Text Color").onChange(v=>{this.updatePlayerTextColor(v)}),E.add(this.playerStyleParams,"textOpacity",0,1,.1).name("Text Opacity").onChange(v=>{this.updatePlayerTextOpacity(v)}),f.open()}updatePlayerBackgroundColor(e){window.flexframeSettings&&window.flexframeSettings.uiSettings||this.animationPlayer&&this.animationPlayer.container&&(this.animationPlayer.container.style.backgroundColor=e)}updatePlayerBackgroundOpacity(e){if(!(window.flexframeSettings&&window.flexframeSettings.uiSettings)&&this.animationPlayer&&this.animationPlayer.container){const n=this.playerStyleParams.backgroundColor,i=parseInt(n.slice(1,3),16),s=parseInt(n.slice(3,5),16),r=parseInt(n.slice(5,7),16);this.animationPlayer.container.style.backgroundColor=`rgba(${i}, ${s}, ${r}, ${e})`}}updatePlayerTimeDisplay(e){if(this.animationPlayer&&this.animationPlayer.container){const n=this.animationPlayer.container.querySelector(".time-display");n&&(n.style.display=e?"inline-block":"none")}}updatePlayerButtonColor(e){if(console.log("[FlexFrame UI] updatePlayerButtonColor called with:",e),window.flexframeSettings&&window.flexframeSettings.uiSettings){console.log("[FlexFrame UI] Skipping JS button color - WordPress CSS will handle it");return}if(this.animationPlayer&&this.animationPlayer.container){const n=this.animationPlayer.container.querySelectorAll("button");n.forEach(i=>{i.style.color=e,i.querySelectorAll("svg").forEach(r=>{r.style.fill=e})}),console.log("[FlexFrame UI] Applied button color to",n.length,"buttons")}}updatePlayerButtonOpacity(e){this.animationPlayer&&this.animationPlayer.container&&this.animationPlayer.container.querySelectorAll("button").forEach(i=>{i.style.opacity=e})}updatePlayerScrubberColor(e){if(!(window.flexframeSettings&&window.flexframeSettings.uiSettings)&&this.animationPlayer&&this.animationPlayer.container){const n=this.animationPlayer.container.querySelector(".timeline-slider");if(n){n.style.accentColor=e;const i=document.createElement("style");i.textContent=`
                    .timeline-slider::-webkit-slider-thumb {
                        background-color: ${e} !important;
                    }
                    .timeline-slider::-moz-range-thumb {
                        background-color: ${e} !important;
                    }
                    .timeline-slider {
                        width: 100% !important;
                        flex: 1 !important;
                    }
                    .player-center {
                        flex: 1 !important;
                        margin: 0 10px !important;
                    }
                `;const s=document.getElementById("scrubber-color-style");s&&s.remove(),i.id="scrubber-color-style",document.head.appendChild(i)}}}updatePlayerScrubberOpacity(e){if(this.animationPlayer&&this.animationPlayer.container){const n=this.animationPlayer.container.querySelector(".timeline-slider");n&&(n.style.opacity=e)}}updatePlayerTextColor(e){this.animationPlayer&&this.animationPlayer.container&&this.animationPlayer.container.querySelectorAll(".time-display, .speed-menu").forEach(i=>{i.style.color=e})}updatePlayerTextOpacity(e){this.animationPlayer&&this.animationPlayer.container&&this.animationPlayer.container.querySelectorAll(".time-display, .speed-menu").forEach(i=>{i.style.opacity=e})}setupGUIVisibilityToggle(){let e=!1;this.gui.domElement.style.display="none",window.addEventListener("keydown",i=>{(i.key==="h"||i.key==="H")&&(e=!e,this.gui.domElement.style.display=e?"block":"none")});const n=document.createElement("style");n.innerHTML=`
            .dg.ac {
                z-index: 9999 !important;
                top: 10px !important;
                right: 10px !important;
                left: auto !important;
                display: block !important;
            }
        `,document.head.appendChild(n)}updateGroundMode(e){this.groundParams.mode=e,this.useShadowMaterial=e==="Infinite Canvas",this.useShadowMaterial?(this.ground.geometry=this.planeGeometry,this.ground.material=this.shadowGroundMaterial,this.ground.receiveShadow=!0,this.ground.castShadow=!1):(this.ground.geometry=this.circleGeometry,this.ground.material=this.solidGroundMaterial,this.ground.receiveShadow=this.groundParams.receiveShadow,this.ground.castShadow=this.groundParams.castShadow),this.ground.material.needsUpdate=!0,this.ground.geometry.computeBoundingSphere()}applyGroundSettings(e){Object.assign(this.groundParams,e),this.updateGroundMode(this.groundParams.mode),this.solidGroundMaterial.color.set(this.groundParams.color),this.solidGroundMaterial.roughness=this.groundParams.roughness,this.solidGroundMaterial.metalness=this.groundParams.metalness,this.shadowGroundMaterial.opacity=this.groundParams.shadowOpacity,this.ground.receiveShadow=this.groundParams.receiveShadow,this.ground.castShadow=this.groundParams.castShadow,this.ground.visible=this.groundParams.visible}setupScreenshotButton(){var e;if(this.createScreenshotPanel(),this.animationPlayer){this.animationPlayer.setScreenshotCallback(()=>{this.toggleScreenshotPanel()});const n=((e=window.flexframeSettings)==null?void 0:e.showScreenshotButton)!==!1;this.animationPlayer.setScreenshotButtonVisible(n)}}createScreenshotPanel(){var a;const e=document.querySelector(".screenshot-panel");e&&e.remove();const n=document.createElement("div");n.className="screenshot-panel",n.innerHTML=`
            <div class="screenshot-panel-header">
                <span>Screenshot Settings</span>
                <button class="screenshot-panel-close">✕</button>
            </div>
            <div class="screenshot-panel-content">
                <div class="screenshot-presets">
                    <button class="ss-preset-btn" id="ss-preset-thumbnail">Thumbnail</button>
                    <button class="ss-preset-btn" id="ss-preset-hd">HD</button>
                </div>
                <div class="screenshot-row">
                    <label>Width</label>
                    <input type="number" id="ss-width" value="800" min="100" max="4096">
                </div>
                <div class="screenshot-row">
                    <label>Height</label>
                    <input type="number" id="ss-height" value="800" min="100" max="4096">
                </div>
                <div class="screenshot-row">
                    <label>Format</label>
                    <select id="ss-format">
                        <option value="png">PNG</option>
                        <option value="jpg">JPG</option>
                        <option value="webp">WebP</option>
                    </select>
                </div>
                <div class="screenshot-row checkbox-row">
                    <label>Transparent Background</label>
                    <input type="checkbox" id="ss-transparent">
                </div>
                <div class="screenshot-row checkbox-row">
                    <label>Show Floor Shadow</label>
                    <input type="checkbox" id="ss-floor-shadow">
                </div>
                <div class="screenshot-row">
                    <label>Filename</label>
                    <input type="text" id="ss-filename" value="screenshot">
                </div>
                <div class="screenshot-buttons">
                    <button class="ss-btn ss-custom">Take Screenshot</button>
                </div>
            </div>
        `;const i=document.createElement("style");i.textContent=`
            .screenshot-panel {
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(30, 30, 30, 0.95);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                padding: 0;
                min-width: 280px;
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                color: #fff;
                display: none;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            }
            .screenshot-panel.visible {
                display: block;
            }
            .screenshot-panel-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 16px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 12px 12px 0 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                font-weight: 600;
            }
            .screenshot-panel-close {
                background: none;
                border: none;
                color: #fff;
                font-size: 18px;
                cursor: pointer;
                opacity: 0.7;
                padding: 4px 8px;
                border-radius: 4px;
            }
            .screenshot-panel-close:hover {
                opacity: 1;
                background: rgba(255, 255, 255, 0.1);
            }
            .screenshot-panel-content {
                padding: 16px;
            }
            .screenshot-presets {
                display: flex;
                gap: 8px;
                margin-bottom: 16px;
            }
            .ss-preset-btn {
                flex: 1;
                padding: 8px 12px;
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 6px;
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
                font-size: 12px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
            }
            .ss-preset-btn:hover {
                background: rgba(255, 255, 255, 0.2);
                border-color: var(--ss-primary-color, #4a9eff);
            }
            .ss-preset-btn.active {
                background: var(--ss-primary-color, #4a9eff);
                border-color: var(--ss-primary-color, #4a9eff);
            }
            .screenshot-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;
            }
            .screenshot-row label {
                font-size: 13px;
                opacity: 0.9;
            }
            .screenshot-row input[type="number"],
            .screenshot-row input[type="text"],
            .screenshot-row select {
                width: 120px;
                padding: 6px 10px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 6px;
                background: rgba(0, 0, 0, 0.3);
                color: #fff;
                font-size: 13px;
            }
            .screenshot-row input[type="checkbox"] {
                width: 18px;
                height: 18px;
                cursor: pointer;
                accent-color: var(--ss-primary-color, #4a9eff);
            }
            .checkbox-row {
                flex-direction: row;
            }
            .screenshot-buttons {
                display: flex;
                gap: 10px;
                margin-top: 16px;
            }
            .ss-btn {
                flex: 1;
                padding: 10px 16px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 500;
                transition: all 0.2s;
            }
            .ss-custom {
                background: var(--ss-primary-color, #4a9eff);
                color: #fff;
            }
            .ss-custom:hover {
                filter: brightness(1.1);
            }
        `;const s=((a=window.flexframeSettings)==null?void 0:a.primaryColor)||"#4a9eff",r=document.getElementById("flexframe-viewer-container")||document.body;r.style.setProperty("--ss-primary-color",s),r.appendChild(i),r.appendChild(n),this.screenshotPanel=n,this.createScreenshotFrameForPanel(),n.querySelector(".screenshot-panel-close").addEventListener("click",()=>{this.toggleScreenshotPanel(!1)}),n.querySelector("#ss-width").addEventListener("input",l=>{this.updateScreenshotFramePanel(parseInt(l.target.value),parseInt(n.querySelector("#ss-height").value))}),n.querySelector("#ss-height").addEventListener("input",l=>{this.updateScreenshotFramePanel(parseInt(n.querySelector("#ss-width").value),parseInt(l.target.value))}),n.querySelector("#ss-preset-thumbnail").addEventListener("click",()=>{n.querySelector("#ss-width").value=250,n.querySelector("#ss-height").value=250,n.querySelector("#ss-format").value="webp",this.updateScreenshotFramePanel(250,250),n.querySelectorAll(".ss-preset-btn").forEach(l=>l.classList.remove("active")),n.querySelector("#ss-preset-thumbnail").classList.add("active")}),n.querySelector("#ss-preset-hd").addEventListener("click",()=>{n.querySelector("#ss-width").value=1920,n.querySelector("#ss-height").value=1080,n.querySelector("#ss-format").value="png",this.updateScreenshotFramePanel(1920,1080),n.querySelectorAll(".ss-preset-btn").forEach(l=>l.classList.remove("active")),n.querySelector("#ss-preset-hd").classList.add("active")}),n.querySelector(".ss-custom").addEventListener("click",()=>{this.takeCustomScreenshot()}),document.addEventListener("exercisesSelected",()=>{this.currentExerciseName&&(n.querySelector("#ss-filename").value=this.currentExerciseName)}),this.currentExerciseName&&(n.querySelector("#ss-filename").value=this.currentExerciseName)}createScreenshotFrameForPanel(){const e=document.querySelector(".screenshot-frame-panel");e&&e.remove();const n=document.createElement("div");n.className="screenshot-frame-panel",n.innerHTML=`
            <div class="frame-corner top-left"></div>
            <div class="frame-corner top-right"></div>
            <div class="frame-corner bottom-left"></div>
            <div class="frame-corner bottom-right"></div>
            <div class="frame-info-panel"></div>
        `;const i=document.createElement("style");i.textContent=`
            .screenshot-frame-panel {
                position: absolute;
                pointer-events: none;
                border: 2px solid #4a9eff;
                background: rgba(74, 158, 255, 0.1);
                z-index: 9999;
                display: none;
                box-shadow: 0 0 20px rgba(74, 158, 255, 0.3);
            }
            .screenshot-frame-panel.visible {
                display: block;
            }
            .screenshot-frame-panel .frame-corner {
                position: absolute;
                width: 16px;
                height: 16px;
                border: 2px solid #4a9eff;
                background: rgba(74, 158, 255, 0.8);
            }
            .screenshot-frame-panel .frame-corner.top-left {
                top: -2px;
                left: -2px;
                border-right: none;
                border-bottom: none;
            }
            .screenshot-frame-panel .frame-corner.top-right {
                top: -2px;
                right: -2px;
                border-left: none;
                border-bottom: none;
            }
            .screenshot-frame-panel .frame-corner.bottom-left {
                bottom: -2px;
                left: -2px;
                border-right: none;
                border-top: none;
            }
            .screenshot-frame-panel .frame-corner.bottom-right {
                bottom: -2px;
                right: -2px;
                border-left: none;
                border-top: none;
            }
            .frame-info-panel {
                position: absolute;
                bottom: -28px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(74, 158, 255, 0.9);
                color: #fff;
                padding: 4px 10px;
                border-radius: 4px;
                font-size: 11px;
                font-family: monospace;
                white-space: nowrap;
            }
        `;const s=document.getElementById("flexframe-viewer-container")||document.body;s.appendChild(i),s.appendChild(n),this.screenshotFramePanel=n}toggleScreenshotFramePanel(e){this.screenshotFramePanel&&this.screenshotFramePanel.classList.toggle("visible",e)}updateScreenshotFramePanel(e,n){if(!this.screenshotFramePanel)return;const i=document.getElementById("flexframe-viewer-container");if(!i)return;const s=i.getBoundingClientRect(),r=s.width,a=s.height,l=e/n,h=r/a;let c,d;l>h?(c=Math.min(e,r*.8),d=c/l):(d=Math.min(n,a*.8),c=d*l);const u=(r-c)/2,p=(a-d)/2;this.screenshotFramePanel.style.width=`${c}px`,this.screenshotFramePanel.style.height=`${d}px`,this.screenshotFramePanel.style.left=`${u}px`,this.screenshotFramePanel.style.top=`${p}px`;const m=this.screenshotFramePanel.querySelector(".frame-info-panel");m&&(m.textContent=`${e} x ${n}`)}toggleScreenshotPanel(e){if(!this.screenshotPanel)return;const n=this.screenshotPanel.classList.contains("visible"),i=e!==void 0?e:!n;if(this.screenshotPanel.classList.toggle("visible",i),i){this.toggleScreenshotFramePanel(!0);const s=parseInt(this.screenshotPanel.querySelector("#ss-width").value),r=parseInt(this.screenshotPanel.querySelector("#ss-height").value);this.updateScreenshotFramePanel(s,r),this.currentExerciseName&&(this.screenshotPanel.querySelector("#ss-filename").value=this.currentExerciseName)}else this.toggleScreenshotFramePanel(!1)}async takeQuickScreenshot(){var h,c,d,u,p,m;const e=this.renderer,n=this.sceneManager.getScene(),i=this.cameraManager.getCamera(),s=e.domElement,r=((c=(h=this.screenshotPanel)==null?void 0:h.querySelector("#ss-filename"))==null?void 0:c.value)||(this.currentExerciseName?this.currentExerciseName.replace(/\s+/g,"_"):"flexframe_screenshot"),a=((u=(d=this.screenshotPanel)==null?void 0:d.querySelector("#ss-format"))==null?void 0:u.value)||"png",l=((m=(p=this.screenshotPanel)==null?void 0:p.querySelector("#ss-transparent"))==null?void 0:m.checked)||!1;try{const y=await fo.takeScreenshot(e,n,i,{width:s.clientWidth*2,height:s.clientHeight*2,filename:r,format:a,transparent:l});y.success?console.log(`📸 Quick screenshot saved: ${y.filename}`):console.error("Screenshot failed:",y.error)}catch(y){console.error("Screenshot error:",y)}}async takeCustomScreenshot(){var g,f,S,w,x,P,I,A,C,E,v,R;const e=this.renderer,n=this.sceneManager.getScene(),i=this.cameraManager.getCamera(),s=parseInt((f=(g=this.screenshotPanel)==null?void 0:g.querySelector("#ss-width"))==null?void 0:f.value)||800,r=parseInt((w=(S=this.screenshotPanel)==null?void 0:S.querySelector("#ss-height"))==null?void 0:w.value)||800,a=((P=(x=this.screenshotPanel)==null?void 0:x.querySelector("#ss-filename"))==null?void 0:P.value)||"screenshot",l=((A=(I=this.screenshotPanel)==null?void 0:I.querySelector("#ss-format"))==null?void 0:A.value)||"png",h=((E=(C=this.screenshotPanel)==null?void 0:C.querySelector("#ss-transparent"))==null?void 0:E.checked)||!1,c=((R=(v=this.screenshotPanel)==null?void 0:v.querySelector("#ss-floor-shadow"))==null?void 0:R.checked)||!1,d=`${a}_${s}x${r}`,u=this.ground?this.ground.visible:!1;this.ground&&(this.ground.visible=c);let p=null,m=null,y=null,_=null;if(this.screenshotFramePanel){const z=document.getElementById("flexframe-viewer-container");if(z){const O=z.getBoundingClientRect();y=O.width,_=O.height,p=parseFloat(this.screenshotFramePanel.style.width)||0,m=parseFloat(this.screenshotFramePanel.style.height)||0}}try{const z=await fo.takeScreenshot(e,n,i,{width:s,height:r,filename:d,format:l,transparent:h,frameWidth:p,frameHeight:m,containerWidth:y,containerHeight:_});z.success?console.log(`📸 Custom screenshot saved: ${z.filename} (${s}x${r})`):console.error("Screenshot failed:",z.error)}catch(z){console.error("Screenshot error:",z)}finally{this.ground&&(this.ground.visible=u)}}async takeUserScreenshot(){await this.takeQuickScreenshot()}setupARBranding(){const e={companyName:"FlexFrame",callToAction:"Visit FlexFrame",websiteUrl:window.location.origin};if(window.flexframeSettings){if(window.flexframeSettings.logoUrl){let n=window.flexframeSettings.logoUrl;n.startsWith("http://")&&(n=n.replace("http://","https://")),e.logoUrl=n,console.log("[FlexFrame AR] Using WordPress logo for AR branding:",n)}window.flexframeSettings.siteUrl&&(e.websiteUrl=window.flexframeSettings.siteUrl)}ic.setBranding(e)}setupQualityToggle(){const e=document.getElementById("quality-toggle-btn");console.log("[Quality Debug] setupQualityToggle called, button found:",!!e),e&&e.addEventListener("click",()=>{console.log("[Quality Debug] Quality button clicked!"),this.switchModelQuality()})}updateQualityButtonVisibility(){const e=document.getElementById("quality-toggle-btn"),n=document.getElementById("quality-text");if(console.log("[Quality Debug] updateQualityButtonVisibility called"),console.log("[Quality Debug] Button found:",!!e),console.log("[Quality Debug] modelUrlSQ:",this.modelUrlSQ),console.log("[Quality Debug] modelUrlHQ:",this.modelUrlHQ),e)if(this.modelUrlSQ&&this.modelUrlHQ){if(console.log("[Quality Debug] ✅ Both models exist, showing button"),e.style.display="flex",n){const i=this.currentModelQuality==="SQ"?"HD":"SD";n.textContent=i,console.log("[Quality Debug] Set button text to:",i)}this.startQualityButtonPulsate()}else console.log("[Quality Debug] ❌ Missing model URLs, hiding button"),e.style.display="none",this.stopQualityButtonPulsate();else console.log("[Quality Debug] ❌ Button element not found in DOM!")}startQualityButtonPulsate(){this.stopQualityButtonPulsate();const e=document.getElementById("quality-toggle-btn"),n=document.getElementById("quality-text"),i=()=>{e&&n&&n.textContent==="HD"&&(e.classList.add("pulsate"),setTimeout(()=>{e.classList.remove("pulsate")},5e3))};i(),this.qualityPulsateInterval=setInterval(i,1e4)}stopQualityButtonPulsate(){this.qualityPulsateInterval&&(clearInterval(this.qualityPulsateInterval),this.qualityPulsateInterval=null);const e=document.getElementById("quality-toggle-btn");e&&e.classList.remove("pulsate")}async switchModelQuality(){var i,s,r,a,l,h;if(!this.modelUrlSQ||!this.modelUrlHQ)return;this.currentModelQuality=this.currentModelQuality==="SQ"?"HQ":"SQ";const e=this.currentModelQuality==="SQ"?this.modelUrlSQ:this.modelUrlHQ;console.log("Switching to",this.currentModelQuality,"model:",e);const n=document.getElementById("quality-text");if(n){const c=this.currentModelQuality==="SQ"?"HD":"SD";n.textContent=c}if(this.startQualityButtonPulsate(),console.log("[HQ Debug] currentConfig:",this.currentConfig),console.log("[HQ Debug] Has cameraHQ?",!!((i=this.currentConfig)!=null&&i.cameraHQ)),console.log("[HQ Debug] cameraHQ value:",(s=this.currentConfig)==null?void 0:s.cameraHQ),this.currentModelQuality==="HQ"&&((r=this.currentConfig)!=null&&r.modelHQ||(a=this.currentConfig)!=null&&a.cameraHQ)){console.log("[HQ Debug] ✅ Entering HQ branch");const c=this.currentConfig.modelHQ,d=this.currentConfig.cameraHQ||(c==null?void 0:c.camera);if(console.log("[HQ Debug] hqCameraSettings:",d),c!=null&&c.model&&(this.pendingModelConfig=c.model),await this.loadModel(e),console.log("[HQ Debug] Model loaded, now applying camera settings"),d){console.log("[HQ Debug] Applying HQ camera position:",d.position);const u=this.cameraManager.getCamera();d.position&&u.position.set(...d.position),d.rotation&&u.rotation.set(...d.rotation),d.target&&this.cameraManager.getControls().target.set(...d.target),this.cameraManager.getControls().update(),this.cameraManager.updateOriginalState(d.position,d.rotation,d.target)}}else if((l=this.currentConfig)!=null&&l.model&&(this.pendingModelConfig=this.currentConfig.model),await this.loadModel(e),(h=this.currentConfig)!=null&&h.camera){const c=this.cameraManager.getCamera();this.currentConfig.camera.position&&c.position.set(...this.currentConfig.camera.position),this.currentConfig.camera.rotation&&c.rotation.set(...this.currentConfig.camera.rotation),this.currentConfig.camera.target&&this.cameraManager.getControls().target.set(...this.currentConfig.camera.target),this.cameraManager.getControls().update(),this.cameraManager.updateOriginalState(this.currentConfig.camera.position,this.currentConfig.camera.rotation,this.currentConfig.camera.target)}}loadModel(e=Ni("models/exercise.glb")){return new Promise((n,i)=>{const s=document.getElementById("model-loader");s&&(this.updateLoaderSpinner(),s.style.display="flex"),this.modelFolder&&(this.modelFolder.destroy(),this.modelFolder=null),this.materialsFolder&&(this.materialsFolder.destroy(),this.materialsFolder=null),window.model&&(this.sceneManager.getScene().remove(window.model),window.model=null),this.mixer&&(this.mixer.stopAllAction(),this.mixer=null),this.allClickableMeshes=[],Cn.clear(),this.updateLoadProgress(0),this.gltfLoader.load(e,r=>{window.model=r.scene;const a=window.model,l=new Map;if(a.traverse(c=>{if(c.isMesh&&(this.allClickableMeshes.push(c),c.castShadow=!0,c.receiveShadow=!0,c.material)){const d=Array.isArray(c.material)?c.material:[c.material],u=[];d.forEach(p=>{var m,y;if(p.name)if(p.name.includes("MUSCLE")&&p.type!=="MeshPhysicalMaterial")if(l.has(p.name))u.push(l.get(p.name));else{console.log(`Converting ${p.name} to MeshPhysicalMaterial for sheen support`);const _=new Nt({color:new _e(16777215),map:p.map,normalMap:p.normalMap,roughness:0,metalness:0,emissive:new _e(0),emissiveIntensity:1.14,emissiveMap:p.emissiveMap,opacity:1,transparent:!0,side:at,depthWrite:!0,sheen:.3,sheenRoughness:.45,sheenColor:new _e(15403530)});_.name=p.name,p.map&&(_.bumpMap=p.map,_.bumpScale=10.2),l.set(p.name,_),u.push(_)}else if(p.name.includes("SKIN"))if(l.has(p.name))u.push(l.get(p.name));else{console.log(`Converting/Updating ${p.name} to MeshPhysicalMaterial for advanced transparency`);const _=new Nt({color:new _e(13426421),map:null,normalMap:null,roughness:0,metalness:0,emissive:new _e(0),emissiveIntensity:1,emissiveMap:null,opacity:1,transparent:!1,side:Ct,depthWrite:!1,depthTest:!0,blending:lr,alphaTest:0,transmission:1,thickness:0,ior:1,envMapIntensity:2.29,sheen:0,sheenRoughness:1,sheenColor:new _e(0)});_.name=p.name,_.bumpScale=1,console.log(`✅ ${p.name} Material Settings Applied:`,{color:"#"+_.color.getHexString(),opacity:_.opacity,transmission:_.transmission,ior:_.ior,roughness:_.roughness,metalness:_.metalness,envMapIntensity:_.envMapIntensity,side:_.side===at?"DoubleSide":_.side===Ct?"FrontSide":"BackSide",blending:_.blending,depthWrite:_.depthWrite,depthTest:_.depthTest,thickness:_.thickness,bumpScale:_.bumpScale}),l.set(p.name,_),u.push(_)}else if(p.name.includes("SKELETON")&&p.type!=="MeshPhysicalMaterial")if(l.has(p.name))u.push(l.get(p.name));else{console.log(`Converting ${p.name} to MeshPhysicalMaterial`);const _=new Nt({color:new _e(16777215),map:p.map,normalMap:p.normalMap,roughness:.9875603442970008,metalness:0,emissive:new _e(0),emissiveIntensity:1,emissiveMap:p.emissiveMap,opacity:1,transparent:!0,side:at,depthWrite:!0,depthTest:!0,blending:Mt,alphaTest:0,envMapIntensity:1});_.name=p.name,p.map&&(_.bumpMap=p.map,_.bumpScale=1),l.set(p.name,_),u.push(_)}else if(p.name.includes("CHROME"))if(l.has(p.name))u.push(l.get(p.name));else{console.log(`Converting ${p.name} to MeshPhysicalMaterial with chrome settings`);const _=new Nt({color:new _e(16777215),roughness:.07,metalness:.82,emissive:new _e(0),emissiveIntensity:1,opacity:1,transparent:!1,side:at,depthWrite:!0,depthTest:!0,blending:Mt,alphaTest:0,envMapIntensity:1,sheen:0,sheenRoughness:1,sheenColor:new _e(0),transmission:0,thickness:0,ior:1.5});_.name=p.name,console.log(`✅ ${p.name} Material Settings Applied (pure chrome - no textures):`,{color:"#"+_.color.getHexString(),opacity:_.opacity,transparent:_.transparent,roughness:_.roughness,metalness:_.metalness,envMapIntensity:_.envMapIntensity,side:_.side===at?"DoubleSide":_.side===Ct?"FrontSide":"BackSide"}),l.set(p.name,_),u.push(_)}else if(p.name.includes("COLOR_1"))if(l.has(p.name))u.push(l.get(p.name));else{console.log(`Converting ${p.name} to MeshPhysicalMaterial with custom settings`);const g=((m=window.flexframeSettings)==null?void 0:m.primaryColorMode)==="custom"&&((y=window.flexframeSettings)!=null&&y.primaryColor)?window.flexframeSettings.primaryColor:"#ff0000",f=new Nt({color:new _e(g),roughness:.2152357035754776,metalness:0,emissive:new _e(0),emissiveIntensity:1,opacity:1,transparent:!1,side:at,depthWrite:!0,depthTest:!0,blending:Mt,alphaTest:0,envMapIntensity:1,sheen:0,sheenRoughness:1,sheenColor:new _e(0),transmission:0,thickness:0,ior:1.5});f.name=p.name,console.log(`✅ ${p.name} Material Settings Applied:`,{color:"#"+f.color.getHexString(),opacity:f.opacity,transparent:f.transparent,roughness:f.roughness,metalness:f.metalness,side:f.side===at?"DoubleSide":f.side===Ct?"FrontSide":"BackSide"}),l.set(p.name,f),u.push(f)}else u.push(p)}),u.length>0&&(Array.isArray(c.material)?c.material=u:c.material=u[0])}}),this.currentConfig&&this.currentConfig.customTextures&&this.applyCustomTextures(a,this.currentConfig.customTextures),window.flexframeSettings&&window.flexframeSettings.logoUrl){let c=window.flexframeSettings.logoUrl;c.startsWith("http://")&&(c=c.replace("http://","https://")),console.log("🎨 Applying LOGO texture from WordPress settings:",c);const d=window.flexframeSettings.logoThreshold||.95,u=window.flexframeSettings.logoBorderEnabled||!1,p=window.flexframeSettings.logoBorderSize||2,m=window.flexframeSettings.logoDisplaySize||100;this.applyLogoTexture(a,c,d,u,p,m)}if(a.position.set(0,-.02,0),this.pendingModelConfig&&(this.pendingModelConfig.position&&a.position.set(...this.pendingModelConfig.position),this.pendingModelConfig.rotation&&a.rotation.set(...this.pendingModelConfig.rotation),this.pendingModelConfig.scale&&a.scale.set(...this.pendingModelConfig.scale),this.pendingModelConfig=null),window.flexframeSettings){const c=window.flexframeSettings.materialMode||"preset";if(c==="custom"&&window.flexframeSettings.skinSettings)console.log("Pre-applying Custom SKIN settings..."),this.applyCustomSkinSettings(window.flexframeSettings.skinSettings);else if(c==="preset"&&window.flexframeSettings.materialPreset){const d=window.flexframeSettings.materialPreset;console.log("Material Preset setting:",d),d==="default"||d==="dark"||d==="light"||d==="preset1"?(console.log("Pre-applying Default Material Preset..."),this.applyMaterialPreset1()):d==="wp_preset"&&(console.log("Pre-applying WP Preset..."),this.applyWPPreset())}window.flexframeSettings.equipmentMaterials&&(console.log("Applying Equipment Material Settings..."),this.applyEquipmentMaterials(a,window.flexframeSettings.equipmentMaterials))}this.sceneManager.getScene().add(a);const h=document.getElementById("model-loader");h&&(h.style.display="none"),this.cameraManager.setClickableMeshes(this.allClickableMeshes),r.animations&&r.animations.length>0&&(this.mixer=new Fu(a),this.animationPlayer.setMixer(this.mixer,r.animations),this.animationPlayer.actions&&this.animationPlayer.actions.length>0&&(this.animationPlayer.actions[0].play(),this.animationPlayer.isPlaying=!0,this.animationPlayer.updatePlayPauseIcon())),this.setupModelGUI(a),this.setupMaterialsGUI(a),this.updateLoadProgress(100),n(a)},r=>{if(r.lengthComputable){const a=Math.round(r.loaded/r.total*100);this.updateLoadProgress(a)}else this.updateLoadProgress(-1)},r=>{console.error("An error happened while loading the GLB model:",r);const a=document.getElementById("model-loader");a&&(a.style.display="none"),i(r)})})}setupModelGUI(e){this.modelFolder=this.trackFolder(this.gui.addFolder("Model Transform"));const n=e.position,i=e.rotation,s=e.scale;this.modelFolder.add(n,"x",-1,1,.002).name("Position X"),this.modelFolder.add(n,"y",-1,1,.002).name("Position Y"),this.modelFolder.add(n,"z",-1,1,.002).name("Position Z"),this.modelFolder.add(i,"x",-1,1,.002).name("Rotation X"),this.modelFolder.add(i,"y",-1,1,.002).name("Rotation Y"),this.modelFolder.add(i,"z",-1,1,.002).name("Rotation Z"),this.modelFolder.add(s,"x",.01,1,.001).name("Scale X"),this.modelFolder.add(s,"y",.01,1,.001).name("Scale Y"),this.modelFolder.add(s,"z",.01,1,.001).name("Scale Z"),this.modelFolder.add({showAxis:this.cameraManager.axisHelperVisible},"showAxis").name("Show Axis Helper").onChange(r=>{this.cameraManager.toggleAxisHelper(r)}),this.modelFolder.add({axisSize:this.cameraManager.axisHelperSize},"axisSize",.1,2,.1).name("Axis Size").onChange(r=>{this.cameraManager.setAxisHelperSize(r)}),this.modelFolder.add({saveModelSettings:async()=>{const r=this.gatherModelSpecificSettings(),a=JSON.stringify(r,null,2);try{await navigator.clipboard.writeText(a),alert("Model config copied to clipboard!"),console.log("Model config saved:",r)}catch(l){console.error("Failed to copy to clipboard:",l),alert("Failed to copy config to clipboard.")}}},"saveModelSettings").name("Save Model Config")}setupMaterialsGUI(e){const n=new Map;e.traverse(i=>{i.isMesh&&i.material&&(Array.isArray(i.material)?i.material:[i.material]).forEach(r=>{if(r&&r.name&&!n.has(r.name))n.set(r.name,r);else if(r&&!r.name){const a=`Material_${n.size}`;r.name=a,n.set(a,r)}})}),n.size>0&&(document.createElement("div"),this.materialsFolder=this.trackFolder(this.gui.addFolder("Material Colors")),setTimeout(()=>{const i=this.gui.domElement.querySelector(".children"),s=this.materialsFolder.domElement;i&&s&&(i.insertBefore(s,i.firstChild),s.classList.add("materials-folder-main"))},10),n.forEach((i,s)=>{var h,c,d,u,p,m;const r=this.trackFolder(this.materialsFolder.addFolder(s));if(r.close(),(h=this.currentConfig)!=null&&h.customTextures&&this.currentConfig.customTextures[s]){const y=this.currentConfig.customTextures[s],_={textureUrl:y},g=r.add(_,"textureUrl").name("Texture URL (click to copy)");setTimeout(()=>{const f=g.domElement.querySelector("input");f&&(f.style.cursor="pointer",f.readOnly=!0,f.addEventListener("click",()=>{navigator.clipboard.writeText(y).then(()=>{console.log("Texture URL copied to clipboard:",y),f.style.background="rgba(74, 158, 255, 0.3)",setTimeout(()=>{f.style.background=""},300)})}))},0),setTimeout(()=>{const f=r.domElement;if(f){const S=document.createElement("div");S.className="material-texture-thumbnail";const w=document.createElement("img");w.src=y+(y.includes("?")?"&":"?")+`t=${Date.now()}`,w.alt=`${s} texture`,S.appendChild(w),f.appendChild(S)}},0)}if((c=this.currentConfig)!=null&&c.customTextures&&this.currentConfig.customTextures[s]&&r.add(i,"alphaTest",0,1,.01).name("Edge Threshold (Fix Fringe)").onChange(()=>i.needsUpdate=!0),i.color){const y={color:"#"+i.color.getHexString()};r.addColor(y,"color").name("Color").onChange(_=>{i.color.set(_),i.needsUpdate=!0})}r.add(i,"opacity",0,1,.01).name("Opacity").onChange(()=>i.needsUpdate=!0),r.add(i,"transparent").name("Transparent").onChange(()=>i.needsUpdate=!0),(!((d=this.currentConfig)!=null&&d.customTextures)||!this.currentConfig.customTextures[s])&&r.add(i,"alphaTest",0,1,.01).name("Alpha Test").onChange(()=>i.needsUpdate=!0);const a={Front:Ct,Back:Rt,Double:at};if(r.add(i,"side",a).name("Side").onChange(()=>i.needsUpdate=!0),r.add(i,"depthWrite").name("Depth Write").onChange(()=>i.needsUpdate=!0),i.metalness!==void 0&&r.add(i,"metalness",0,1,.01).name("Metalness").onChange(()=>i.needsUpdate=!0),i.roughness!==void 0&&r.add(i,"roughness",0,1,.01).name("Roughness").onChange(()=>i.needsUpdate=!0),i.emissive){const y={emissive:i.emissive.getHex()};r.addColor(y,"emissive").name("Emissive").onChange(_=>{i.emissive.setHex(_)})}if(i.emissiveIntensity!==void 0&&r.add(i,"emissiveIntensity",0,2,.01).name("Emissive Intensity").onChange(()=>i.needsUpdate=!0),s.includes("MUSCLE")){if(i.sheen!==void 0){r.add(i,"sheen",0,1,.01).name("Sheen Intensity").onChange(()=>i.needsUpdate=!0),r.add(i,"sheenRoughness",0,1,.01).name("Sheen Roughness").onChange(()=>i.needsUpdate=!0);const y={sheenColor:i.sheenColor?i.sheenColor.getHex():16777215};r.addColor(y,"sheenColor").name("Sheen Color").onChange(_=>{i.sheenColor||(i.sheenColor=new _e),i.sheenColor.setHex(_),i.needsUpdate=!0})}i.bumpScale!==void 0&&i.bumpMap&&(setTimeout(()=>{const y=r.domElement;if(y){const _=document.createElement("div");_.className="material-texture-thumbnail";const g=document.createElement("div");g.textContent="Bump Map Texture:",g.style.fontSize="11px",g.style.marginBottom="4px",g.style.color="#aaa";const f=document.createElement("img");if(i.bumpMap.image&&i.bumpMap.image.src)f.src=i.bumpMap.image.src;else if(i.bumpMap.source&&i.bumpMap.source.data){const S=document.createElement("canvas");S.width=64,S.height=64;const w=S.getContext("2d");i.bumpMap.image&&w.drawImage(i.bumpMap.image,0,0,64,64),f.src=S.toDataURL()}f.alt="Bump map texture",_.appendChild(g),_.appendChild(f),y.appendChild(_)}},100),r.add(i,"bumpScale",-20,20,.1).name("Bump Scale").onChange(()=>i.needsUpdate=!0))}if(s.includes("SKIN")){i._originalColorMap||(i._originalColorMap=i.map);const y=window.flexframeSettings&&window.flexframeSettings.materialMode==="custom",_={useColorMap:y?!1:!!i.map};y&&i.map&&(i.map=null,i.needsUpdate=!0),r.add(_,"useColorMap").name("🎨 Use Color Map").onChange(x=>{x&&i._originalColorMap?i.map=i._originalColorMap:i.map=null,i.needsUpdate=!0});const g={"Front (Single)":Ct,Back:Rt,Double:at};r.add(i,"side",g).name("Face Culling").onChange(()=>i.needsUpdate=!0);const f={Normal:Mt,Additive:gr,Subtractive:_r,Multiply:yr,Custom:lr};r.add(i,"blending",f).name("Blending Mode").onChange(()=>i.needsUpdate=!0),r.add(i,"depthWrite").name("Depth Write").onChange(()=>i.needsUpdate=!0),r.add(i,"depthTest").name("Depth Test").onChange(()=>i.needsUpdate=!0),r.add(i,"opacity",0,1,.01).name("Opacity").onChange(()=>i.needsUpdate=!0),r.add(i,"transparent").name("Transparent").onChange(()=>i.needsUpdate=!0),r.add(i,"alphaTest",0,1,.01).name("Alpha Test").onChange(()=>i.needsUpdate=!0),i.transmission!==void 0&&(r.add(i,"transmission",0,1,.01).name("🪟 Transmission (Glass)").onChange(()=>i.needsUpdate=!0),r.add(i,"thickness",0,5,.01).name("Thickness").onChange(()=>i.needsUpdate=!0),r.add(i,"ior",1,2.333,.01).name("IOR (Refraction)").onChange(()=>i.needsUpdate=!0),r.add(i,"envMapIntensity",0,3,.01).name("Env Map Intensity").onChange(()=>i.needsUpdate=!0));const S={castShadow:!0,setCastShadow:x=>{window.model&&window.model.traverse(P=>{P.isMesh&&P.material&&(Array.isArray(P.material)?P.material:[P.material]).some(A=>A.name===s)&&(P.castShadow=x)})}};r.add(S,"castShadow").name("Cast Shadows").onChange(x=>S.setCastShadow(x));const w={shadowBlur:((m=(p=(u=this.lighting)==null?void 0:u.directionalLight)==null?void 0:p.shadow)==null?void 0:m.radius)||1,setShadowBlur:x=>{var P,I;(I=(P=this.lighting)==null?void 0:P.directionalLight)!=null&&I.shadow&&(this.lighting.directionalLight.shadow.radius=x,console.log(`Shadow blur set to: ${x}`))}};r.add(w,"shadowBlur",0,10,.1).name("Shadow Blur").onChange(x=>w.setShadowBlur(x))}const l={copySettings:()=>{const y=i.map||i.normalMap||i.emissiveMap||i.bumpMap;let _="Can you please use these material settings as the default material settings whenever a model loads in with this specific material name.";y?_+=` Do NOT preserve any texture maps - use pure material properties only:

`:_+=`

`,_+=`Material Name: "${s}"

`,_+=`Settings:
`,i.color&&(_+=`- Color: #${i.color.getHexString()}
`),i.opacity!==void 0&&(_+=`- Opacity: ${i.opacity}
`),i.transparent!==void 0&&(_+=`- Transparent: ${i.transparent}
`),i.alphaTest!==void 0&&(_+=`- Alpha Test: ${i.alphaTest}
`),i.side!==void 0&&(_+=`- Side: ${{0:"FrontSide",1:"BackSide",2:"DoubleSide"}[i.side]||i.side}
`),i.depthWrite!==void 0&&(_+=`- Depth Write: ${i.depthWrite}
`),i.metalness!==void 0&&(_+=`- Metalness: ${i.metalness}
`),i.roughness!==void 0&&(_+=`- Roughness: ${i.roughness}
`),i.emissive&&(_+=`- Emissive: #${i.emissive.getHexString()}
`),i.emissiveIntensity!==void 0&&(_+=`- Emissive Intensity: ${i.emissiveIntensity}
`),i.sheen!==void 0&&(_+=`- Sheen: ${i.sheen}
`),i.sheenRoughness!==void 0&&(_+=`- Sheen Roughness: ${i.sheenRoughness}
`),i.sheenColor&&(_+=`- Sheen Color: #${i.sheenColor.getHexString()}
`),i.bumpScale!==void 0&&(_+=`- Bump Scale: ${i.bumpScale}
`),i.transmission!==void 0&&(_+=`- Transmission: ${i.transmission}
`),i.thickness!==void 0&&(_+=`- Thickness: ${i.thickness}
`),i.ior!==void 0&&(_+=`- IOR: ${i.ior}
`),i.envMapIntensity!==void 0&&(_+=`- Env Map Intensity: ${i.envMapIntensity}
`),i.blending!==void 0&&(_+=`- Blending: ${{0:"NoBlending",1:"NormalBlending",2:"AdditiveBlending",3:"SubtractiveBlending",4:"MultiplyBlending",5:"CustomBlending"}[i.blending]||i.blending}
`),i.depthTest!==void 0&&(_+=`- Depth Test: ${i.depthTest}
`),y&&(_+=`
Note: Remove all texture maps (map, normalMap, emissiveMap, bumpMap) for a pure material appearance.`),navigator.clipboard.writeText(_).then(()=>{console.log("Material settings copied to clipboard for:",s)})}};r.add(l,"copySettings").name("Copy Settings")}))}applyCustomTextures(e,n){Object.keys(n).forEach(i=>{const s=n[i],r=s+(s.includes("?")?"&":"?")+`t=${Date.now()}`;console.log(`🎨 Custom texture for ${i}: ${s}`),console.log(`🔄 Cache-busted URL: ${r}`),e.traverse(a=>{a.isMesh&&a.material&&(Array.isArray(a.material)?a.material:[a.material]).forEach(h=>{h.name===i&&(console.log(`✅ Found material "${i}" - applying texture...`),h.map&&h.map.dispose(),this.textureLoader.load(r,c=>{c.colorSpace=_t,c.premultiplyAlpha=!1,c.minFilter=ht,c.magFilter=ht,c.generateMipmaps=!1,h.map=c,h.transparent=!0,h.alphaTest=.95,h.depthWrite=!1,h.needsUpdate=!0,console.log(`✅ PNG texture with transparency applied to ${i}`),console.log(`📷 Texture loaded from: ${r}`)},void 0,c=>{console.error(`❌ Error loading texture for ${i}:`,c)}))})})})}applyLogoTexture(e,n,i=.95,s=!1,r=2,a=100){const l=n+(n.includes("?")?"&":"?")+`t=${Date.now()}`;e.traverse(h=>{h.isMesh&&h.material&&(Array.isArray(h.material)?h.material:[h.material]).forEach(d=>{if(d.name==="LOGO"){console.log("✅ Found LOGO material - applying texture..."),d.map&&d.map.dispose();const u=new Image;u.crossOrigin="anonymous",u.onload=()=>{const p=document.createElement("canvas"),m=p.getContext("2d"),y=a/100,_=u.width*y,g=u.height*y;p.width=u.width,p.height=u.height,m.clearRect(0,0,p.width,p.height);const f=(p.width-_)/2,S=(p.height-g)/2;if(s&&r>0){m.globalCompositeOperation="source-over";const x=document.createElement("canvas"),P=x.getContext("2d");x.width=p.width,x.height=p.height,P.drawImage(u,f,S,_,g);const I=parseInt(r);for(let A=0;A<360;A+=15){const C=A*Math.PI/180,E=Math.cos(C)*I,v=Math.sin(C)*I;m.drawImage(x,E,v)}m.globalCompositeOperation="source-in",m.fillStyle="white",m.fillRect(0,0,p.width,p.height),m.globalCompositeOperation="source-over",m.drawImage(u,f,S,_,g)}else m.drawImage(u,f,S,_,g);const w=new Aa(p);w.colorSpace=_t,w.premultiplyAlpha=!1,w.minFilter=ht,w.magFilter=ht,w.generateMipmaps=!1,d.map=w,d.transparent=!0,d.alphaTest=parseFloat(i)||.95,d.depthWrite=!1,d.needsUpdate=!0,console.log("✅ LOGO texture applied successfully with border:",s,"size:",r,"displaySize:",a)},u.onerror=p=>{console.error("❌ Error loading LOGO texture:",p)},u.src=l}})})}applyMaterialPreset1(){var i,s;if(!window.model){console.log("No model loaded");return}const e={SKELETON:{color:"#ffffff",opacity:1,transparent:!0,metalness:0,roughness:.99,transmission:0,thickness:0,ior:1.5,side:at,blending:Mt,depthWrite:!0,depthTest:!0,envMapIntensity:1},SKIN:{color:"#ccdef5",opacity:1,transparent:!1,metalness:0,roughness:0,transmission:1,thickness:0,ior:1,side:Ct,blending:lr,depthWrite:!1,depthTest:!0,envMapIntensity:2.29},MUSCLE:{color:"#ffffff",opacity:1,transparent:!0,metalness:0,roughness:0,transmission:0,thickness:0,ior:1.5,side:at,blending:Mt,depthWrite:!0,depthTest:!0,envMapIntensity:1},CHROME:{color:"#ffffff",opacity:1,transparent:!1,metalness:.82,roughness:.07,transmission:0,thickness:0,ior:1.5,side:at,blending:Mt,depthWrite:!0,depthTest:!0,envMapIntensity:1},METAL:{color:"#151515",opacity:1,transparent:!1,metalness:.85,roughness:.36,transmission:0,thickness:0,ior:1.5,side:at,blending:Mt,depthWrite:!0,depthTest:!0,envMapIntensity:1},PLASTIC:{color:"#ffffff",opacity:.8,transparent:!0,metalness:0,roughness:.82,transmission:.2,thickness:0,ior:1.5,side:at,blending:Mt,depthWrite:!1,depthTest:!0,envMapIntensity:1},COLOR_1:{color:((i=window.flexframeSettings)==null?void 0:i.primaryColorMode)==="custom"&&((s=window.flexframeSettings)!=null&&s.primaryColor)?window.flexframeSettings.primaryColor:"#ff0000",opacity:1,transparent:!1,metalness:0,roughness:.215,transmission:0,thickness:0,ior:1.5,side:at,blending:Mt,depthWrite:!0,depthTest:!0,envMapIntensity:1}};let n=0;window.model.traverse(r=>{r.isMesh&&r.material&&(Array.isArray(r.material)?r.material:[r.material]).forEach(l=>{if(l.name&&e[l.name.toUpperCase()]){const h=e[l.name.toUpperCase()];h.color&&l.color.set(h.color),l.opacity=h.opacity,l.transparent=h.transparent,l.metalness=h.metalness,l.roughness=h.roughness,l.transmission=h.transmission,l.thickness=h.thickness,l.ior=h.ior,l.side=h.side,l.blending=h.blending,l.depthWrite=h.depthWrite,l.depthTest=h.depthTest,l.envMapIntensity=h.envMapIntensity,l.name.toUpperCase()==="SKIN"&&(l.map=null,l.normalMap=null,l.emissiveMap=null,l.bumpMap=null),h.attenuationDistance&&(l.attenuationDistance=h.attenuationDistance),l.needsUpdate=!0,n++}})}),console.log(`✅ Applied Material Preset 1 to ${n} materials`),this.gui&&setTimeout(()=>{this.gui.controllersRecursive().forEach(r=>{r.updateDisplay()})},100)}applyCustomSkinSettings(e){if(!window.model){console.log("No model loaded for custom skin settings");return}console.log("Applying custom SKIN settings:",e),window.model.traverse(n=>{n.isMesh&&n.material&&(Array.isArray(n.material)?n.material:[n.material]).forEach(s=>{s.name&&s.name.toUpperCase()==="SKIN"&&(e.color&&s.color.set(e.color),e.opacity!==void 0&&(s.opacity=e.opacity,s.transparent=e.opacity<1),e.roughness!==void 0&&(s.roughness=e.roughness),e.metalness!==void 0&&(s.metalness=e.metalness),e.transmission!==void 0&&(s.transmission=e.transmission),e.thickness!==void 0&&(s.thickness=e.thickness),e.ior!==void 0&&(s.ior=e.ior),e.envMapIntensity!==void 0&&(s.envMapIntensity=e.envMapIntensity),s.needsUpdate=!0,console.log("✅ Custom SKIN settings applied to material:",s.name))})}),this.gui&&setTimeout(()=>{this.gui.controllersRecursive().forEach(n=>{n.updateDisplay()})},100)}applyEquipmentMaterials(e,n){if(!e||!n){console.log("No model or equipment materials to apply");return}console.log("Equipment Materials from WordPress:",n);const i={BARBELL:"BARBELL",BUMPER:"BUMPER",CABLE:"CABLE",CHROME:"CHROME",COLOR_1:"COLOR1",COLOR1:"COLOR1",METAL:"METAL",PAD:"PAD",PLASTIC:"PLASTIC",RUBBER:"RUBBER"};e.traverse(s=>{s.isMesh&&s.material&&(Array.isArray(s.material)?s.material:[s.material]).forEach(a=>{if(!a.name)return;const l=a.name.toUpperCase(),h=i[l];if(h&&n[h]){const c=n[h];if(!c.enabled){console.log(`Equipment material ${l} is disabled, skipping`);return}if(console.log(`Applying equipment settings to ${l}:`,c),c.color&&a.color.set(c.color),c.opacity!==void 0&&c.opacity!==null&&(a.opacity=parseFloat(c.opacity),a.transparent=a.opacity<1),c.metalness!==void 0&&c.metalness!==null&&(a.metalness=parseFloat(c.metalness)),c.roughness!==void 0&&c.roughness!==null&&(a.roughness=parseFloat(c.roughness)),c.clearcoat!==void 0&&c.clearcoat!==null&&(a.clearcoat=parseFloat(c.clearcoat)),c.clearcoatRoughness!==void 0&&c.clearcoatRoughness!==null&&(a.clearcoatRoughness=parseFloat(c.clearcoatRoughness)),c.emissiveColor&&a.emissive.set(c.emissiveColor),c.emissiveIntensity!==void 0&&c.emissiveIntensity!==null&&(a.emissiveIntensity=parseFloat(c.emissiveIntensity)),c.transmission!==void 0&&c.transmission!==null&&(a.transmission=parseFloat(c.transmission)),c.thickness!==void 0&&c.thickness!==null&&(a.thickness=parseFloat(c.thickness)),c.ior!==void 0&&c.ior!==null&&(a.ior=parseFloat(c.ior)),c.sheen!==void 0&&c.sheen!==null&&(a.sheen=parseFloat(c.sheen)),c.sheenRoughness!==void 0&&c.sheenRoughness!==null&&(a.sheenRoughness=parseFloat(c.sheenRoughness)),c.sheenColor&&a.sheenColor.set(c.sheenColor),c.envMapIntensity!==void 0&&c.envMapIntensity!==null&&(a.envMapIntensity=parseFloat(c.envMapIntensity)),c.blending)switch(c.blending){case"normal":a.blending=Mt;break;case"additive":a.blending=gr;break;case"subtractive":a.blending=_r;break;case"multiply":a.blending=yr;break}c.bumpMapEnabled!==void 0&&c.bumpMapEnabled!==null&&!c.bumpMapEnabled&&a.bumpMap&&(a.bumpScale=0),c.normalMapEnabled!==void 0&&c.normalMapEnabled!==null&&!c.normalMapEnabled&&a.normalMap&&a.normalScale.set(0,0),c.colorMapEnabled!==void 0&&c.colorMapEnabled!==null&&!c.colorMapEnabled&&a.map&&(a.map=null),a.needsUpdate=!0,console.log(`✅ Equipment material settings applied to: ${l}`)}})})}setupEventListeners(){window.addEventListener("resize",()=>{this.sizes.width=window.innerWidth,this.sizes.height=window.innerHeight,this.cameraManager.handleResize(),this.renderer.setSize(this.sizes.width,this.sizes.height),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))}),this.sceneManager.getCanvas().addEventListener("pointerdown",e=>{if(this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.cameraManager.getCamera()),window.model){const n=this.raycaster.intersectObject(window.model,!0);if(n.length>0){const i=n[0].object;i.isMesh&&i.material&&(Array.isArray(i.material)?i.material:[i.material]).forEach(r=>{console.log("🎨 Material:",r.name||"Unnamed Material")})}}})}animate(){const e=this.clock.getDelta();this.cameraManager.update(),this.updateCameraDebug&&this.updateCameraDebug(),this.particleSystem.update(e),this.mixer&&this.animationPlayer.isPlaying&&this.mixer.update(e),this.animationPlayer.update(e),this.renderer.render(this.sceneManager.getScene(),this.cameraManager.getCamera()),requestAnimationFrame(()=>this.animate())}setupScreenshotGUI(){const e=this.trackFolder(this.gui.addFolder("Screenshot")),n=this.screenshotManager.settings,i=this.screenshotManager.getResolutionPresets(),s={quickShot:()=>{this.screenshotManager.quickScreenshot().then(x=>{x.success?console.log(`✅ Screenshot saved: ${x.filename} (${x.size})`):console.error("❌ Screenshot failed:",x.error)})},transparentShot:()=>{this.screenshotManager.transparentScreenshot().then(x=>{x.success?console.log(`✅ Transparent screenshot saved: ${x.filename} (${x.size})`):console.error("❌ Screenshot failed:",x.error)})}};e.add(s,"quickShot").name("Take Screenshot"),e.add(s,"transparentShot").name("🫥 Transparent Background");const r=this.trackFolder(e.addFolder("Settings"));r.add(n,"transparent").name("Transparent Background").onChange(x=>{console.log("Transparent background:",x?"ON":"OFF")});const a={png:"PNG",jpg:"JPEG",webp:"WebP"};r.add(n,"format",a).name("Format").onChange(x=>{console.log("Format changed to:",x.toUpperCase()),l.domElement.style.display=x==="png"?"none":"block"});const l=r.add(n,"quality",.1,1,.1).name("Quality (0.1-1.0)").onChange(x=>{console.log("Quality:",Math.round(x*100)+"%")});n.format==="png"&&(l.domElement.style.display="none"),r.add(n,"filename").name("Filename").onChange(x=>{n.filename=x.replace(/[^a-zA-Z0-9_-]/g,"")}),r.add(n,"addTimestamp").name("Add Timestamp");const h=this.trackFolder(e.addFolder("Resolution")),c={};Object.keys(i).forEach(x=>{c[x]=i[x].name}),h.add(n,"resolution",c).name("Preset").onChange(x=>{this.screenshotManager.setResolution(x),y();const P=x==="custom";d.domElement.style.display=P?"block":"none",u.domElement.style.display=P?"block":"none",console.log("Resolution preset:",i[x].name)});const d=h.add(n,"customWidth",1,8192,1).name("Custom Width").onChange(x=>{this.screenshotManager.setCustomDimensions(x,n.customHeight),y()}),u=h.add(n,"customHeight",1,8192,1).name("Custom Height").onChange(x=>{this.screenshotManager.setCustomDimensions(n.customWidth,x),y()}),p={info:"Loading..."},m=h.add(p,"info").name("Current Resolution");m.domElement.querySelector("input").readOnly=!0,m.domElement.querySelector("input").style.color="#888";const y=()=>{const x=this.screenshotManager.getCurrentResolution(),P=(x.width*x.height/1e6).toFixed(1),I=this.calculateAspectRatio(x.width,x.height);p.info=`${x.width}×${x.height} (${P}MP, ${I})`},_=n.resolution==="custom";d.domElement.style.display=_?"block":"none",u.domElement.style.display=_?"block":"none";const g=this.trackFolder(h.addFolder("Quick Presets")),f={hd:()=>this.setQuickResolution("1280x720"),fhd:()=>this.setQuickResolution("1920x1080"),qhd:()=>this.setQuickResolution("2560x1440"),uhd:()=>this.setQuickResolution("3840x2160"),square:()=>this.setQuickResolution("1080x1080"),story:()=>this.setQuickResolution("1080x1920")};g.add(f,"hd").name("HD (720p)"),g.add(f,"fhd").name("Full HD (1080p)"),g.add(f,"qhd").name("2K (1440p)"),g.add(f,"uhd").name("4K (2160p)"),g.add(f,"square").name("Square (1:1)"),g.add(f,"story").name("Story (9:16)");const S=this.trackFolder(e.addFolder("Advanced")),w={currentViewport:()=>{const x=this.sceneManager.getCanvas();this.screenshotManager.setCustomDimensions(x.width,x.height),n.resolution="custom",y(),console.log(`Set to current viewport: ${x.width}×${x.height}`)},copySettings:()=>{const x=this.screenshotManager.getSettings();navigator.clipboard.writeText(JSON.stringify(x,null,2)),console.log("📋 Screenshot settings copied to clipboard")}};S.add(w,"currentViewport").name("Use Current Viewport"),S.add(w,"copySettings").name("Copy Screenshot Settings"),y()}setupMultiThumbnailMenuGUI(){const e=this.trackFolder(this.gui.addFolder("Multi-Thumbnail Menu")),n=this.multiThumbnailMenuSystem.settings;e.add(n,"widthPercentage",20,100,5).name("Width %").onChange(r=>{this.multiThumbnailMenuSystem.updateAllSettings({widthPercentage:r}),console.log("Multi-thumbnail menu width:",r+"%")}),e.addColor(n,"backgroundColor").name("Background Color").onChange(r=>{this.multiThumbnailMenuSystem.updateAllSettings({backgroundColor:r}),console.log("Multi-thumbnail menu background color:",r)}),e.add(n,"backgroundOpacity",0,1,.1).name("Background Opacity").onChange(r=>{this.multiThumbnailMenuSystem.updateAllSettings({backgroundOpacity:r}),console.log("Multi-thumbnail menu opacity:",r)}),e.add(n,"borderRadius",0,30,1).name("Corner Radius").onChange(r=>{this.multiThumbnailMenuSystem.updateAllSettings({borderRadius:r}),console.log("Multi-thumbnail menu radius:",r+"px")}),e.add(n,"keepOpen").name("Keep Menu Open").onChange(r=>{this.multiThumbnailMenuSystem.updateAllSettings({keepOpen:r}),console.log("Multi-thumbnail menu keep open:",r?"ON":"OFF")});const i=e.addFolder("Active Button Glow");i.addColor(n,"glowColor").name("Glow Color").onChange(r=>{this.multiThumbnailMenuSystem.updateAllSettings({glowColor:r}),console.log("Multi-thumbnail menu glow color:",r)}),i.add(n,"glowIntensity",0,1,.1).name("Glow Intensity").onChange(r=>{this.multiThumbnailMenuSystem.updateAllSettings({glowIntensity:r}),console.log("Multi-thumbnail menu glow intensity:",r)}),i.add(n,"glowSize",5,50,5).name("Glow Size").onChange(r=>{this.multiThumbnailMenuSystem.updateAllSettings({glowSize:r}),console.log("Multi-thumbnail menu glow size:",r+"px")}),e.add({copySettings:()=>this.multiThumbnailMenuSystem.copySettingsToClipboard()},"copySettings").name("Copy Settings");const s={hideRightMenu:!1};e.add(s,"hideRightMenu").name("Hide Right Info Menu").onChange(r=>{const a=document.querySelector(".thumbnail-grid-container-right");a&&(a.style.display=r?"none":"grid",console.log("Right info menu:",r?"HIDDEN":"VISIBLE"))}),e.add({copyRightMenuSettings:()=>this.rightMenuSystem.copySettingsToClipboard()},"copyRightMenuSettings").name("Copy Right Menu Settings"),setTimeout(()=>this.multiThumbnailMenuSystem.updateAllSettings(n),100)}setQuickResolution(e){this.screenshotManager.setResolution(e),this.screenshotManager.settings.resolution=e,console.log("Quick preset:",this.screenshotManager.getResolutionPresets()[e].name)}calculateAspectRatio(e,n){const i=(h,c)=>c===0?h:i(c,h%c),s=i(e,n),r=e/s,a=n/s,l={"16:9":[16,9],"21:9":[21,9],"4:3":[4,3],"3:2":[3,2],"1:1":[1,1],"9:16":[9,16],"2:1":[2,1],"5:4":[5,4]};for(const[h,[c,d]]of Object.entries(l))if(r===c&&a===d)return h;return`${r}:${a}`}createScreenshotFrame(){this.screenshotFrame&&document.body.removeChild(this.screenshotFrame),this.screenshotFrame=document.createElement("div"),this.screenshotFrame.className="screenshot-frame",this.screenshotFrame.innerHTML=`
            <div class="frame-corner top-left"></div>
            <div class="frame-corner top-right"></div>
            <div class="frame-corner bottom-left"></div>
            <div class="frame-corner bottom-right"></div>
            <div class="frame-info"></div>
        `;const e=document.createElement("style");e.textContent=`
            .screenshot-frame {
                position: fixed;
                pointer-events: none;
                border: 2px solid #ff6b6b;
                background: rgba(255, 107, 107, 0.1);
                z-index: 1000;
                display: none;
                box-shadow: 0 0 20px rgba(255, 107, 107, 0.3);
            }
            .screenshot-frame.visible {
                display: block;
            }
            .frame-corner {
                position: absolute;
                width: 20px;
                height: 20px;
                border: 3px solid #ff6b6b;
                background: rgba(255, 107, 107, 0.8);
            }
            .frame-corner.top-left {
                top: -3px;
                left: -3px;
                border-right: none;
                border-bottom: none;
            }
            .frame-corner.top-right {
                top: -3px;
                right: -3px;
                border-left: none;
                border-bottom: none;
            }
            .frame-corner.bottom-left {
                bottom: -3px;
                left: -3px;
                border-right: none;
                border-top: none;
            }
            .frame-corner.bottom-right {
                bottom: -3px;
                right: -3px;
                border-left: none;
                border-top: none;
            }
            .frame-info {
                position: absolute;
                top: -35px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(255, 107, 107, 0.9);
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: bold;
                white-space: nowrap;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            }
        `,document.head.querySelector("style[data-screenshot-frame]")||(e.setAttribute("data-screenshot-frame","true"),document.head.appendChild(e)),document.body.appendChild(this.screenshotFrame)}updateScreenshotFrame(e,n){if(!this.screenshotFrame)return;const s=this.renderer.domElement.getBoundingClientRect(),r=s.width/s.height,a=e/n;let l,h;a>r?(l=s.width*.8,h=l/a):(h=s.height*.8,l=h*a);const c=s.left+(s.width-l)/2,d=s.top+(s.height-h)/2;this.screenshotFrame.style.left=c+"px",this.screenshotFrame.style.top=d+"px",this.screenshotFrame.style.width=l+"px",this.screenshotFrame.style.height=h+"px";const u=this.screenshotFrame.querySelector(".frame-info");u.textContent=`${e} × ${n} pixels`}toggleScreenshotFrame(e){this.frameVisible=e,this.screenshotFrame&&this.screenshotFrame.classList.toggle("visible",e)}setupSimpleScreenshotGUI(){const e=this.trackFolder(this.gui.addFolder("Screenshot")),n=this.trackFolder(e.addFolder("Custom Settings")),i=()=>({renderer:this.renderer,scene:this.sceneManager.getScene(),camera:this.cameraManager.getCamera()}),s={width:400,height:400,transparent:!1,format:"png",filename:"screenshot",showFrame:!1},r=()=>{this.currentExerciseName&&(s.filename=`${this.currentExerciseName} Thumbnail`)};r(),this.createScreenshotFrame(),n.add(s,"width",100,4096,1).name("Width").onChange(l=>{s.showFrame&&this.updateScreenshotFrame(l,s.height)}),n.add(s,"height",100,4096,1).name("Height").onChange(l=>{s.showFrame&&this.updateScreenshotFrame(s.width,l)}),n.add(s,"showFrame").name("Show Frame Preview").onChange(l=>{this.toggleScreenshotFrame(l),l&&this.updateScreenshotFrame(s.width,s.height)}),n.add(s,"transparent").name("Transparent"),n.add(s,"format",["png","jpg","webp"]).name("Format");const a=n.add(s,"filename").name("Filename");document.addEventListener("exercisesSelected",()=>{r(),a.updateDisplay()}),n.add({customShot:async()=>{const l=i(),h=await fo.takeScreenshot(l.renderer,l.scene,l.camera,s);h.success?console.log(`✅ Custom ${h.filename} saved (${h.size})`):console.error(`❌ Custom screenshot failed: ${h.error}`)}},"customShot").name("Take Custom Screenshot")}}new G_;
//# sourceMappingURL=index-DDR6K0gV.js.map
