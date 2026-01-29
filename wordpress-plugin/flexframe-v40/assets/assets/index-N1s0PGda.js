(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const oa="174",Cn={ROTATE:0,DOLLY:1,PAN:2},wi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ch=0,Na=1,hh=2,hc=1,dc=2,Sn=3,Tt=0,Ct=1,ot=2,zn=0,St=1,ur=2,pr=3,fr=4,ir=5,ti=100,dh=101,uh=102,ph=103,fh=104,mh=200,gh=201,Ah=202,yh=203,fo=204,mo=205,xh=206,bh=207,vh=208,Sh=209,_h=210,Mh=211,Eh=212,wh=213,Th=214,go=0,Ao=1,yo=2,Bi=3,xo=4,bo=5,vo=6,So=7,uc=0,Ch=1,Rh=2,Gn=0,Ih=1,Dh=2,Ph=3,pc=4,Lh=5,Bh=6,Uh=7,Oa="attached",Fh="detached",fc=300,Ui=301,Fi=302,mr=303,_o=304,Sr=306,Ni=1e3,Jt=1001,gr=1002,Ft=1003,mc=1004,cs=1005,ct=1006,sr=1007,dn=1008,In=1009,gc=1010,Ac=1011,fs=1012,aa=1013,ri=1014,zt=1015,En=1016,la=1017,ca=1018,Oi=1020,yc=35902,xc=1021,bc=1022,$t=1023,vc=1024,Sc=1025,Ii=1026,ki=1027,ha=1028,da=1029,_c=1030,ua=1031,pa=1033,rr=33776,or=33777,ar=33778,lr=33779,Mo=35840,Eo=35841,wo=35842,To=35843,Co=36196,Ro=37492,Io=37496,Do=37808,Po=37809,Lo=37810,Bo=37811,Uo=37812,Fo=37813,No=37814,Oo=37815,ko=37816,Ho=37817,zo=37818,Go=37819,Vo=37820,Wo=37821,cr=36492,Qo=36494,qo=36495,Mc=36283,Yo=36284,jo=36285,Xo=36286,Nh=2200,Oh=2201,kh=2202,ms=2300,gs=2301,Cr=2302,Ti=2400,Ci=2401,Ar=2402,fa=2500,Hh=2501,zh=0,Ec=1,Ko=2,Gh=3200,Vh=3201,wc=0,Wh=1,Hn="",gt="srgb",Mt="srgb-linear",yr="linear",nt="srgb",hi=7680,ka=519,Qh=512,qh=513,Yh=514,Tc=515,jh=516,Xh=517,Kh=518,Zh=519,Zo=35044,Ha="300 es",wn=2e3,xr=2001;class Wn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const Et=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let za=1234567;const ds=Math.PI/180,Hi=180/Math.PI;function an(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Et[r&255]+Et[r>>8&255]+Et[r>>16&255]+Et[r>>24&255]+"-"+Et[e&255]+Et[e>>8&255]+"-"+Et[e>>16&15|64]+Et[e>>24&255]+"-"+Et[t&63|128]+Et[t>>8&255]+"-"+Et[t>>16&255]+Et[t>>24&255]+Et[n&255]+Et[n>>8&255]+Et[n>>16&255]+Et[n>>24&255]).toLowerCase()}function Ne(r,e,t){return Math.max(e,Math.min(t,r))}function ma(r,e){return(r%e+e)%e}function Jh(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function $h(r,e,t){return r!==e?(t-r)/(e-r):0}function us(r,e,t){return(1-t)*r+t*e}function ed(r,e,t,n){return us(r,e,1-Math.exp(-t*n))}function td(r,e=1){return e-Math.abs(ma(r,e*2)-e)}function nd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function id(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function sd(r,e){return r+Math.floor(Math.random()*(e-r+1))}function rd(r,e){return r+Math.random()*(e-r)}function od(r){return r*(.5-Math.random())}function ad(r){r!==void 0&&(za=r);let e=za+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ld(r){return r*ds}function cd(r){return r*Hi}function hd(r){return(r&r-1)===0&&r!==0}function dd(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function ud(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function pd(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),h=o((e+n)/2),d=s((e-n)/2),u=o((e-n)/2),f=s((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":r.set(a*h,l*d,l*u,a*c);break;case"YZY":r.set(l*u,a*h,l*d,a*c);break;case"ZXZ":r.set(l*d,l*u,a*h,a*c);break;case"XZX":r.set(a*h,l*g,l*f,a*c);break;case"YXY":r.set(l*f,a*h,l*g,a*c);break;case"ZYZ":r.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function rn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function et(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Cc={DEG2RAD:ds,RAD2DEG:Hi,generateUUID:an,clamp:Ne,euclideanModulo:ma,mapLinear:Jh,inverseLerp:$h,lerp:us,damp:ed,pingpong:td,smoothstep:nd,smootherstep:id,randInt:sd,randFloat:rd,randFloatSpread:od,seededRandom:ad,degToRad:ld,radToDeg:cd,isPowerOfTwo:hd,ceilPowerOfTwo:dd,floorPowerOfTwo:ud,setQuaternionFromProperEuler:pd,normalize:et,denormalize:rn};class Te{constructor(e=0,t=0){Te.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ne(this.x,e.x,t.x),this.y=Ne(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ne(this.x,e,t),this.y=Ne(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ne(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ne(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Be{constructor(e,t,n,i,s,o,a,l,c){Be.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],A=i[0],m=i[3],p=i[6],v=i[1],M=i[4],y=i[7],C=i[2],I=i[5],T=i[8];return s[0]=o*A+a*v+l*C,s[3]=o*m+a*M+l*I,s[6]=o*p+a*y+l*T,s[1]=c*A+h*v+d*C,s[4]=c*m+h*M+d*I,s[7]=c*p+h*y+d*T,s[2]=u*A+f*v+g*C,s[5]=u*m+f*M+g*I,s[8]=u*p+f*y+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=h*o-a*c,u=a*l-h*s,f=c*s-o*l,g=t*d+n*u+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/g;return e[0]=d*A,e[1]=(i*c-h*n)*A,e[2]=(a*n-i*o)*A,e[3]=u*A,e[4]=(h*t-i*l)*A,e[5]=(i*s-a*t)*A,e[6]=f*A,e[7]=(n*l-c*t)*A,e[8]=(o*t-n*s)*A,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Rr.makeScale(e,t)),this}rotate(e){return this.premultiply(Rr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Rr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Rr=new Be;function Rc(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function As(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function fd(){const r=As("canvas");return r.style.display="block",r}const Ga={};function $n(r){r in Ga||(Ga[r]=!0,console.warn(r))}function md(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function gd(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Ad(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Va=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wa=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function yd(){const r={enabled:!0,workingColorSpace:Mt,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===nt&&(i.r=Rn(i.r),i.g=Rn(i.g),i.b=Rn(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===nt&&(i.r=Di(i.r),i.g=Di(i.g),i.b=Di(i.b))),i},fromWorkingColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},toWorkingColorSpace:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Hn?yr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Mt]:{primaries:e,whitePoint:n,transfer:yr,toXYZ:Va,fromXYZ:Wa,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:gt},outputColorSpaceConfig:{drawingBufferColorSpace:gt}},[gt]:{primaries:e,whitePoint:n,transfer:nt,toXYZ:Va,fromXYZ:Wa,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:gt}}}),r}const Qe=yd();function Rn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Di(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let di;class xd{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{di===void 0&&(di=As("canvas")),di.width=e.width,di.height=e.height;const n=di.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=di}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=As("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Rn(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Rn(t[n]/255)*255):t[n]=Rn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let bd=0;class ga{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:bd++}),this.uuid=an(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Ir(i[o].image)):s.push(Ir(i[o]))}else s=Ir(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Ir(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?xd.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let vd=0;class At extends Wn{constructor(e=At.DEFAULT_IMAGE,t=At.DEFAULT_MAPPING,n=Jt,i=Jt,s=ct,o=dn,a=$t,l=In,c=At.DEFAULT_ANISOTROPY,h=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=an(),this.name="",this.source=new ga(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Te(0,0),this.repeat=new Te(1,1),this.center=new Te(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==fc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ni:e.x=e.x-Math.floor(e.x);break;case Jt:e.x=e.x<0?0:1;break;case gr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ni:e.y=e.y-Math.floor(e.y);break;case Jt:e.y=e.y<0?0:1;break;case gr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}At.DEFAULT_IMAGE=null;At.DEFAULT_MAPPING=fc;At.DEFAULT_ANISOTROPY=1;class Xe{constructor(e=0,t=0,n=0,i=1){Xe.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],A=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-A)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+A)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,y=(f+1)/2,C=(p+1)/2,I=(h+u)/4,T=(d+A)/4,w=(g+m)/4;return M>y&&M>C?M<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(M),i=I/n,s=T/n):y>C?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=I/i,s=w/i):C<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(C),n=T/s,i=w/s),this.set(n,i,s,t),this}let v=Math.sqrt((m-g)*(m-g)+(d-A)*(d-A)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(d-A)/v,this.z=(u-h)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ne(this.x,e.x,t.x),this.y=Ne(this.y,e.y,t.y),this.z=Ne(this.z,e.z,t.z),this.w=Ne(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ne(this.x,e,t),this.y=Ne(this.y,e,t),this.z=Ne(this.z,e,t),this.w=Ne(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ne(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Sd extends Wn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Xe(0,0,e,t),this.scissorTest=!1,this.viewport=new Xe(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ct,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new At(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new ga(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class oi extends Sd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ic extends At{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class _d extends At{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qt{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3];const u=s[o+0],f=s[o+1],g=s[o+2],A=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(a===1){e[t+0]=u,e[t+1]=f,e[t+2]=g,e[t+3]=A;return}if(d!==A||l!==u||c!==f||h!==g){let m=1-a;const p=l*u+c*f+h*g+d*A,v=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const C=Math.sqrt(M),I=Math.atan2(C,p*v);m=Math.sin(m*I)/C,a=Math.sin(a*I)/C}const y=a*v;if(l=l*m+u*y,c=c*m+f*y,h=h*m+g*y,d=d*m+A*y,m===1-a){const C=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=C,c*=C,h*=C,d*=C}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=s[o],u=s[o+1],f=s[o+2],g=s[o+3];return e[t]=a*g+h*d+l*f-c*u,e[t+1]=l*g+h*u+c*d-a*f,e[t+2]=c*g+h*f+a*u-l*d,e[t+3]=h*g-a*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),d=a(s/2),u=l(n/2),f=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+a+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(o-i)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+c)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(s-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ne(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=s*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,n=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Qa.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Qa.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-s*i),d=2*(s*n-o*t);return this.x=t+l*c+o*d-a*h,this.y=n+l*h+a*c-s*d,this.z=i+l*d+s*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ne(this.x,e.x,t.x),this.y=Ne(this.y,e.y,t.y),this.z=Ne(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ne(this.x,e,t),this.y=Ne(this.y,e,t),this.z=Ne(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ne(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Dr.copy(this).projectOnVector(e),this.sub(Dr)}reflect(e){return this.sub(Dr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ne(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Dr=new P,Qa=new qt;class Dn{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,tn):tn.fromBufferAttribute(s,o),tn.applyMatrix4(e.matrixWorld),this.expandByPoint(tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Es.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Es.copy(n.boundingBox)),Es.applyMatrix4(e.matrixWorld),this.union(Es)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,tn),tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter($i),ws.subVectors(this.max,$i),ui.subVectors(e.a,$i),pi.subVectors(e.b,$i),fi.subVectors(e.c,$i),Pn.subVectors(pi,ui),Ln.subVectors(fi,pi),qn.subVectors(ui,fi);let t=[0,-Pn.z,Pn.y,0,-Ln.z,Ln.y,0,-qn.z,qn.y,Pn.z,0,-Pn.x,Ln.z,0,-Ln.x,qn.z,0,-qn.x,-Pn.y,Pn.x,0,-Ln.y,Ln.x,0,-qn.y,qn.x,0];return!Pr(t,ui,pi,fi,ws)||(t=[1,0,0,0,1,0,0,0,1],!Pr(t,ui,pi,fi,ws))?!1:(Ts.crossVectors(Pn,Ln),t=[Ts.x,Ts.y,Ts.z],Pr(t,ui,pi,fi,ws))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const gn=[new P,new P,new P,new P,new P,new P,new P,new P],tn=new P,Es=new Dn,ui=new P,pi=new P,fi=new P,Pn=new P,Ln=new P,qn=new P,$i=new P,ws=new P,Ts=new P,Yn=new P;function Pr(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Yn.fromArray(r,s);const a=i.x*Math.abs(Yn.x)+i.y*Math.abs(Yn.y)+i.z*Math.abs(Yn.z),l=e.dot(Yn),c=t.dot(Yn),h=n.dot(Yn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Md=new Dn,es=new P,Lr=new P;class fn{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Md.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;es.subVectors(e,this.center);const t=es.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(es,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Lr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(es.copy(e.center).add(Lr)),this.expandByPoint(es.copy(e.center).sub(Lr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const An=new P,Br=new P,Cs=new P,Bn=new P,Ur=new P,Rs=new P,Fr=new P;class Qi{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,An)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=An.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(An.copy(this.origin).addScaledVector(this.direction,t),An.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Br.copy(e).add(t).multiplyScalar(.5),Cs.copy(t).sub(e).normalize(),Bn.copy(this.origin).sub(Br);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Cs),a=Bn.dot(this.direction),l=-Bn.dot(Cs),c=Bn.lengthSq(),h=Math.abs(1-o*o);let d,u,f,g;if(h>0)if(d=o*l-a,u=o*a-l,g=s*h,d>=0)if(u>=-g)if(u<=g){const A=1/h;d*=A,u*=A,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*s+a)),u=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-s,-l),s),f=u*(u+2*l)+c):(d=Math.max(0,-(o*s+a)),u=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c);else u=o>0?-s:s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Br).addScaledVector(Cs,u),f}intersectSphere(e,t){An.subVectors(e.center,this.origin);const n=An.dot(this.direction),i=An.dot(An)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,An)!==null}intersectTriangle(e,t,n,i,s){Ur.subVectors(t,e),Rs.subVectors(n,e),Fr.crossVectors(Ur,Rs);let o=this.direction.dot(Fr),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Bn.subVectors(this.origin,e);const l=a*this.direction.dot(Rs.crossVectors(Bn,Rs));if(l<0)return null;const c=a*this.direction.dot(Ur.cross(Bn));if(c<0||l+c>o)return null;const h=-a*Bn.dot(Fr);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Le{constructor(e,t,n,i,s,o,a,l,c,h,d,u,f,g,A,m){Le.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,h,d,u,f,g,A,m)}set(e,t,n,i,s,o,a,l,c,h,d,u,f,g,A,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=A,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Le().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/mi.setFromMatrixColumn(e,0).length(),s=1/mi.setFromMatrixColumn(e,1).length(),o=1/mi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const u=o*h,f=o*d,g=a*h,A=a*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=u-A*c,t[9]=-a*l,t[2]=A-u*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const u=l*h,f=l*d,g=c*h,A=c*d;t[0]=u+A*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=A+u*a,t[10]=o*l}else if(e.order==="ZXY"){const u=l*h,f=l*d,g=c*h,A=c*d;t[0]=u-A*a,t[4]=-o*d,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=A-u*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const u=o*h,f=o*d,g=a*h,A=a*d;t[0]=l*h,t[4]=g*c-f,t[8]=u*c+A,t[1]=l*d,t[5]=A*c+u,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const u=o*l,f=o*c,g=a*l,A=a*c;t[0]=l*h,t[4]=A-u*d,t[8]=g*d+f,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*d+g,t[10]=u-A*d}else if(e.order==="XZY"){const u=o*l,f=o*c,g=a*l,A=a*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+A,t[5]=o*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=a*h,t[10]=A*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ed,e,wd)}lookAt(e,t,n){const i=this.elements;return Wt.subVectors(e,t),Wt.lengthSq()===0&&(Wt.z=1),Wt.normalize(),Un.crossVectors(n,Wt),Un.lengthSq()===0&&(Math.abs(n.z)===1?Wt.x+=1e-4:Wt.z+=1e-4,Wt.normalize(),Un.crossVectors(n,Wt)),Un.normalize(),Is.crossVectors(Wt,Un),i[0]=Un.x,i[4]=Is.x,i[8]=Wt.x,i[1]=Un.y,i[5]=Is.y,i[9]=Wt.y,i[2]=Un.z,i[6]=Is.z,i[10]=Wt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],A=n[6],m=n[10],p=n[14],v=n[3],M=n[7],y=n[11],C=n[15],I=i[0],T=i[4],w=i[8],_=i[12],x=i[1],R=i[5],k=i[9],F=i[13],z=i[2],Q=i[6],G=i[10],K=i[14],V=i[3],te=i[7],ne=i[11],ye=i[15];return s[0]=o*I+a*x+l*z+c*V,s[4]=o*T+a*R+l*Q+c*te,s[8]=o*w+a*k+l*G+c*ne,s[12]=o*_+a*F+l*K+c*ye,s[1]=h*I+d*x+u*z+f*V,s[5]=h*T+d*R+u*Q+f*te,s[9]=h*w+d*k+u*G+f*ne,s[13]=h*_+d*F+u*K+f*ye,s[2]=g*I+A*x+m*z+p*V,s[6]=g*T+A*R+m*Q+p*te,s[10]=g*w+A*k+m*G+p*ne,s[14]=g*_+A*F+m*K+p*ye,s[3]=v*I+M*x+y*z+C*V,s[7]=v*T+M*R+y*Q+C*te,s[11]=v*w+M*k+y*G+C*ne,s[15]=v*_+M*F+y*K+C*ye,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],A=e[7],m=e[11],p=e[15];return g*(+s*l*d-i*c*d-s*a*u+n*c*u+i*a*f-n*l*f)+A*(+t*l*f-t*c*u+s*o*u-i*o*f+i*c*h-s*l*h)+m*(+t*c*d-t*a*f-s*o*d+n*o*f+s*a*h-n*c*h)+p*(-i*a*h-t*l*d+t*a*u+i*o*d-n*o*u+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],A=e[13],m=e[14],p=e[15],v=d*m*c-A*u*c+A*l*f-a*m*f-d*l*p+a*u*p,M=g*u*c-h*m*c-g*l*f+o*m*f+h*l*p-o*u*p,y=h*A*c-g*d*c+g*a*f-o*A*f-h*a*p+o*d*p,C=g*d*l-h*A*l-g*a*u+o*A*u+h*a*m-o*d*m,I=t*v+n*M+i*y+s*C;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/I;return e[0]=v*T,e[1]=(A*u*s-d*m*s-A*i*f+n*m*f+d*i*p-n*u*p)*T,e[2]=(a*m*s-A*l*s+A*i*c-n*m*c-a*i*p+n*l*p)*T,e[3]=(d*l*s-a*u*s-d*i*c+n*u*c+a*i*f-n*l*f)*T,e[4]=M*T,e[5]=(h*m*s-g*u*s+g*i*f-t*m*f-h*i*p+t*u*p)*T,e[6]=(g*l*s-o*m*s-g*i*c+t*m*c+o*i*p-t*l*p)*T,e[7]=(o*u*s-h*l*s+h*i*c-t*u*c-o*i*f+t*l*f)*T,e[8]=y*T,e[9]=(g*d*s-h*A*s-g*n*f+t*A*f+h*n*p-t*d*p)*T,e[10]=(o*A*s-g*a*s+g*n*c-t*A*c-o*n*p+t*a*p)*T,e[11]=(h*a*s-o*d*s-h*n*c+t*d*c+o*n*f-t*a*f)*T,e[12]=C*T,e[13]=(h*A*i-g*d*i+g*n*u-t*A*u-h*n*m+t*d*m)*T,e[14]=(g*a*i-o*A*i-g*n*l+t*A*l+o*n*m-t*a*m)*T,e[15]=(o*d*i-h*a*i+h*n*l-t*d*l-o*n*u+t*a*u)*T,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,h=o+o,d=a+a,u=s*c,f=s*h,g=s*d,A=o*h,m=o*d,p=a*d,v=l*c,M=l*h,y=l*d,C=n.x,I=n.y,T=n.z;return i[0]=(1-(A+p))*C,i[1]=(f+y)*C,i[2]=(g-M)*C,i[3]=0,i[4]=(f-y)*I,i[5]=(1-(u+p))*I,i[6]=(m+v)*I,i[7]=0,i[8]=(g+M)*T,i[9]=(m-v)*T,i[10]=(1-(u+A))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=mi.set(i[0],i[1],i[2]).length();const o=mi.set(i[4],i[5],i[6]).length(),a=mi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],nn.copy(this);const c=1/s,h=1/o,d=1/a;return nn.elements[0]*=c,nn.elements[1]*=c,nn.elements[2]*=c,nn.elements[4]*=h,nn.elements[5]*=h,nn.elements[6]*=h,nn.elements[8]*=d,nn.elements[9]*=d,nn.elements[10]*=d,t.setFromRotationMatrix(nn),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=wn){const l=this.elements,c=2*s/(t-e),h=2*s/(n-i),d=(t+e)/(t-e),u=(n+i)/(n-i);let f,g;if(a===wn)f=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===xr)f=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=wn){const l=this.elements,c=1/(t-e),h=1/(n-i),d=1/(o-s),u=(t+e)*c,f=(n+i)*h;let g,A;if(a===wn)g=(o+s)*d,A=-2*d;else if(a===xr)g=s*d,A=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=A,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const mi=new P,nn=new Le,Ed=new P(0,0,0),wd=new P(1,1,1),Un=new P,Is=new P,Wt=new P,qa=new Le,Ya=new qt;class pn{constructor(e=0,t=0,n=0,i=pn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ne(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ne(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ne(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return qa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(qa,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ya.setFromEuler(this),this.setFromQuaternion(Ya,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}pn.DEFAULT_ORDER="XYZ";class Aa{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Td=0;const ja=new P,gi=new qt,yn=new Le,Ds=new P,ts=new P,Cd=new P,Rd=new qt,Xa=new P(1,0,0),Ka=new P(0,1,0),Za=new P(0,0,1),Ja={type:"added"},Id={type:"removed"},Ai={type:"childadded",child:null},Nr={type:"childremoved",child:null};class ht extends Wn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Td++}),this.uuid=an(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ht.DEFAULT_UP.clone();const e=new P,t=new pn,n=new qt,i=new P(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Le},normalMatrix:{value:new Be}}),this.matrix=new Le,this.matrixWorld=new Le,this.matrixAutoUpdate=ht.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Aa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return gi.setFromAxisAngle(e,t),this.quaternion.multiply(gi),this}rotateOnWorldAxis(e,t){return gi.setFromAxisAngle(e,t),this.quaternion.premultiply(gi),this}rotateX(e){return this.rotateOnAxis(Xa,e)}rotateY(e){return this.rotateOnAxis(Ka,e)}rotateZ(e){return this.rotateOnAxis(Za,e)}translateOnAxis(e,t){return ja.copy(e).applyQuaternion(this.quaternion),this.position.add(ja.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xa,e)}translateY(e){return this.translateOnAxis(Ka,e)}translateZ(e){return this.translateOnAxis(Za,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ds.copy(e):Ds.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ts.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(ts,Ds,this.up):yn.lookAt(Ds,ts,this.up),this.quaternion.setFromRotationMatrix(yn),i&&(yn.extractRotation(i.matrixWorld),gi.setFromRotationMatrix(yn),this.quaternion.premultiply(gi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ja),Ai.child=e,this.dispatchEvent(Ai),Ai.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Id),Nr.child=e,this.dispatchEvent(Nr),Nr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ja),Ai.child=e,this.dispatchEvent(Ai),Ai.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ts,e,Cd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ts,Rd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}ht.DEFAULT_UP=new P(0,1,0);ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const sn=new P,xn=new P,Or=new P,bn=new P,yi=new P,xi=new P,$a=new P,kr=new P,Hr=new P,zr=new P,Gr=new Xe,Vr=new Xe,Wr=new Xe;class on{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),sn.subVectors(e,t),i.cross(sn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){sn.subVectors(i,t),xn.subVectors(n,t),Or.subVectors(e,t);const o=sn.dot(sn),a=sn.dot(xn),l=sn.dot(Or),c=xn.dot(xn),h=xn.dot(Or),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const u=1/d,f=(c*l-a*h)*u,g=(o*h-a*l)*u;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,bn)===null?!1:bn.x>=0&&bn.y>=0&&bn.x+bn.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,bn.x),l.addScaledVector(o,bn.y),l.addScaledVector(a,bn.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return Gr.setScalar(0),Vr.setScalar(0),Wr.setScalar(0),Gr.fromBufferAttribute(e,t),Vr.fromBufferAttribute(e,n),Wr.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Gr,s.x),o.addScaledVector(Vr,s.y),o.addScaledVector(Wr,s.z),o}static isFrontFacing(e,t,n,i){return sn.subVectors(n,t),xn.subVectors(e,t),sn.cross(xn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return sn.subVectors(this.c,this.b),xn.subVectors(this.a,this.b),sn.cross(xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return on.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return on.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return on.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return on.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return on.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;yi.subVectors(i,n),xi.subVectors(s,n),kr.subVectors(e,n);const l=yi.dot(kr),c=xi.dot(kr);if(l<=0&&c<=0)return t.copy(n);Hr.subVectors(e,i);const h=yi.dot(Hr),d=xi.dot(Hr);if(h>=0&&d<=h)return t.copy(i);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(yi,o);zr.subVectors(e,s);const f=yi.dot(zr),g=xi.dot(zr);if(g>=0&&f<=g)return t.copy(s);const A=f*c-l*g;if(A<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(xi,a);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return $a.subVectors(s,i),a=(d-h)/(d-h+(f-g)),t.copy(i).addScaledVector($a,a);const p=1/(m+A+u);return o=A*p,a=u*p,t.copy(n).addScaledVector(yi,o).addScaledVector(xi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Dc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fn={h:0,s:0,l:0},Ps={h:0,s:0,l:0};function Qr(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class ge{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Qe.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Qe.workingColorSpace){if(e=ma(e,1),t=Ne(t,0,1),n=Ne(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Qr(o,s,e+1/3),this.g=Qr(o,s,e),this.b=Qr(o,s,e-1/3)}return Qe.toWorkingColorSpace(this,i),this}setStyle(e,t=gt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=gt){const n=Dc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Rn(e.r),this.g=Rn(e.g),this.b=Rn(e.b),this}copyLinearToSRGB(e){return this.r=Di(e.r),this.g=Di(e.g),this.b=Di(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=gt){return Qe.fromWorkingColorSpace(wt.copy(this),e),Math.round(Ne(wt.r*255,0,255))*65536+Math.round(Ne(wt.g*255,0,255))*256+Math.round(Ne(wt.b*255,0,255))}getHexString(e=gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.fromWorkingColorSpace(wt.copy(this),t);const n=wt.r,i=wt.g,s=wt.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Qe.workingColorSpace){return Qe.fromWorkingColorSpace(wt.copy(this),t),e.r=wt.r,e.g=wt.g,e.b=wt.b,e}getStyle(e=gt){Qe.fromWorkingColorSpace(wt.copy(this),e);const t=wt.r,n=wt.g,i=wt.b;return e!==gt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Fn),this.setHSL(Fn.h+e,Fn.s+t,Fn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Fn),e.getHSL(Ps);const n=us(Fn.h,Ps.h,t),i=us(Fn.s,Ps.s,t),s=us(Fn.l,Ps.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const wt=new ge;ge.NAMES=Dc;let Dd=0;class ln extends Wn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Dd++}),this.uuid=an(),this.name="",this.type="Material",this.blending=St,this.side=Tt,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fo,this.blendDst=mo,this.blendEquation=ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ge(0,0,0),this.blendAlpha=0,this.depthFunc=Bi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ka,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hi,this.stencilZFail=hi,this.stencilZPass=hi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==St&&(n.blending=this.blending),this.side!==Tt&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==fo&&(n.blendSrc=this.blendSrc),this.blendDst!==mo&&(n.blendDst=this.blendDst),this.blendEquation!==ti&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Bi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ka&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==hi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==hi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==hi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ii extends ln{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.combine=uc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Mn=Pd();function Pd(){const r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const s=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:o,offsetTable:a}}function Ld(r){Math.abs(r)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),r=Ne(r,-65504,65504),Mn.floatView[0]=r;const e=Mn.uint32View[0],t=e>>23&511;return Mn.baseTable[t]+((e&8388607)>>Mn.shiftTable[t])}function Bd(r){const e=r>>10;return Mn.uint32View[0]=Mn.mantissaTable[Mn.offsetTable[e]+(r&1023)]+Mn.exponentTable[e],Mn.floatView[0]}class Ls{static toHalfFloat(e){return Ld(e)}static fromHalfFloat(e){return Bd(e)}}const pt=new P,Bs=new Te;let Ud=0;class _t{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ud++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Zo,this.updateRanges=[],this.gpuType=zt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Bs.fromBufferAttribute(this,t),Bs.applyMatrix3(e),this.setXY(t,Bs.x,Bs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix3(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix4(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyNormalMatrix(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.transformDirection(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=rn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=et(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=rn(t,this.array)),t}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=rn(t,this.array)),t}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=rn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=rn(t,this.array)),t}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array),s=et(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Zo&&(e.usage=this.usage),e}}class Pc extends _t{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Lc extends _t{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Rt extends _t{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Fd=0;const Kt=new Le,qr=new ht,bi=new P,Qt=new Dn,ns=new Dn,bt=new P;class Nt extends Wn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=an(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Rc(e)?Lc:Pc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Be().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Kt.makeRotationFromQuaternion(e),this.applyMatrix4(Kt),this}rotateX(e){return Kt.makeRotationX(e),this.applyMatrix4(Kt),this}rotateY(e){return Kt.makeRotationY(e),this.applyMatrix4(Kt),this}rotateZ(e){return Kt.makeRotationZ(e),this.applyMatrix4(Kt),this}translate(e,t,n){return Kt.makeTranslation(e,t,n),this.applyMatrix4(Kt),this}scale(e,t,n){return Kt.makeScale(e,t,n),this.applyMatrix4(Kt),this}lookAt(e){return qr.lookAt(e),qr.updateMatrix(),this.applyMatrix4(qr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bi).negate(),this.translate(bi.x,bi.y,bi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Rt(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Dn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Qt.setFromBufferAttribute(s),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,Qt.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,Qt.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(Qt.min),this.boundingBox.expandByPoint(Qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const n=this.boundingSphere.center;if(Qt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];ns.setFromBufferAttribute(a),this.morphTargetsRelative?(bt.addVectors(Qt.min,ns.min),Qt.expandByPoint(bt),bt.addVectors(Qt.max,ns.max),Qt.expandByPoint(bt)):(Qt.expandByPoint(ns.min),Qt.expandByPoint(ns.max))}Qt.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)bt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(bt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)bt.fromBufferAttribute(a,c),l&&(bi.fromBufferAttribute(e,c),bt.add(bi)),i=Math.max(i,n.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new _t(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let w=0;w<n.count;w++)a[w]=new P,l[w]=new P;const c=new P,h=new P,d=new P,u=new Te,f=new Te,g=new Te,A=new P,m=new P;function p(w,_,x){c.fromBufferAttribute(n,w),h.fromBufferAttribute(n,_),d.fromBufferAttribute(n,x),u.fromBufferAttribute(s,w),f.fromBufferAttribute(s,_),g.fromBufferAttribute(s,x),h.sub(c),d.sub(c),f.sub(u),g.sub(u);const R=1/(f.x*g.y-g.x*f.y);isFinite(R)&&(A.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(R),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(R),a[w].add(A),a[_].add(A),a[x].add(A),l[w].add(m),l[_].add(m),l[x].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let w=0,_=v.length;w<_;++w){const x=v[w],R=x.start,k=x.count;for(let F=R,z=R+k;F<z;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const M=new P,y=new P,C=new P,I=new P;function T(w){C.fromBufferAttribute(i,w),I.copy(C);const _=a[w];M.copy(_),M.sub(C.multiplyScalar(C.dot(_))).normalize(),y.crossVectors(I,_);const R=y.dot(l[w])<0?-1:1;o.setXYZW(w,M.x,M.y,M.z,R)}for(let w=0,_=v.length;w<_;++w){const x=v[w],R=x.start,k=x.count;for(let F=R,z=R+k;F<z;F+=3)T(e.getX(F+0)),T(e.getX(F+1)),T(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new _t(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new P,s=new P,o=new P,a=new P,l=new P,c=new P,h=new P,d=new P;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),A=e.getX(u+1),m=e.getX(u+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,A),o.fromBufferAttribute(t,m),h.subVectors(o,s),d.subVectors(i,s),h.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,A),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(A,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)i.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,s),d.subVectors(i,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)bt.fromBufferAttribute(e,t),bt.normalize(),e.setXYZ(t,bt.x,bt.y,bt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h);let f=0,g=0;for(let A=0,m=l.length;A<m;A++){a.isInterleavedBufferAttribute?f=l[A]*a.data.stride+a.offset:f=l[A]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new _t(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Nt,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],d=s[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const el=new Le,jn=new Qi,Us=new fn,tl=new P,Fs=new P,Ns=new P,Os=new P,Yr=new P,ks=new P,nl=new P,Hs=new P;class Gt extends ht{constructor(e=new Nt,t=new ii){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){ks.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],d=s[l];h!==0&&(Yr.fromBufferAttribute(d,e),o?ks.addScaledVector(Yr,h):ks.addScaledVector(Yr.sub(t),h))}t.add(ks)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Us.copy(n.boundingSphere),Us.applyMatrix4(s),jn.copy(e.ray).recast(e.near),!(Us.containsPoint(jn.origin)===!1&&(jn.intersectSphere(Us,tl)===null||jn.origin.distanceToSquared(tl)>(e.far-e.near)**2))&&(el.copy(s).invert(),jn.copy(e.ray).applyMatrix4(el),!(n.boundingBox!==null&&jn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,jn)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,A=u.length;g<A;g++){const m=u[g],p=o[m.materialIndex],v=Math.max(m.start,f.start),M=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let y=v,C=M;y<C;y+=3){const I=a.getX(y),T=a.getX(y+1),w=a.getX(y+2);i=zs(this,p,e,n,c,h,d,I,T,w),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),A=Math.min(a.count,f.start+f.count);for(let m=g,p=A;m<p;m+=3){const v=a.getX(m),M=a.getX(m+1),y=a.getX(m+2);i=zs(this,o,e,n,c,h,d,v,M,y),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,A=u.length;g<A;g++){const m=u[g],p=o[m.materialIndex],v=Math.max(m.start,f.start),M=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let y=v,C=M;y<C;y+=3){const I=y,T=y+1,w=y+2;i=zs(this,p,e,n,c,h,d,I,T,w),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),A=Math.min(l.count,f.start+f.count);for(let m=g,p=A;m<p;m+=3){const v=m,M=m+1,y=m+2;i=zs(this,o,e,n,c,h,d,v,M,y),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Nd(r,e,t,n,i,s,o,a){let l;if(e.side===Ct?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===Tt,a),l===null)return null;Hs.copy(a),Hs.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Hs);return c<t.near||c>t.far?null:{distance:c,point:Hs.clone(),object:r}}function zs(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,Fs),r.getVertexPosition(l,Ns),r.getVertexPosition(c,Os);const h=Nd(r,e,t,n,Fs,Ns,Os,nl);if(h){const d=new P;on.getBarycoord(nl,Fs,Ns,Os,d),i&&(h.uv=on.getInterpolatedAttribute(i,a,l,c,d,new Te)),s&&(h.uv1=on.getInterpolatedAttribute(s,a,l,c,d,new Te)),o&&(h.normal=on.getInterpolatedAttribute(o,a,l,c,d,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new P,materialIndex:0};on.getNormal(Fs,Ns,Os,u.normal),h.face=u,h.barycoord=d}return h}class bs extends Nt{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Rt(c,3)),this.setAttribute("normal",new Rt(h,3)),this.setAttribute("uv",new Rt(d,2));function g(A,m,p,v,M,y,C,I,T,w,_){const x=y/T,R=C/w,k=y/2,F=C/2,z=I/2,Q=T+1,G=w+1;let K=0,V=0;const te=new P;for(let ne=0;ne<G;ne++){const ye=ne*R-F;for(let Me=0;Me<Q;Me++){const Ue=Me*x-k;te[A]=Ue*v,te[m]=ye*M,te[p]=z,c.push(te.x,te.y,te.z),te[A]=0,te[m]=0,te[p]=I>0?1:-1,h.push(te.x,te.y,te.z),d.push(Me/T),d.push(1-ne/w),K+=1}}for(let ne=0;ne<w;ne++)for(let ye=0;ye<T;ye++){const Me=u+ye+Q*ne,Ue=u+ye+Q*(ne+1),q=u+(ye+1)+Q*(ne+1),ee=u+(ye+1)+Q*ne;l.push(Me,Ue,ee),l.push(Ue,q,ee),V+=6}a.addGroup(f,V,_),f+=V,u+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function zi(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Lt(r){const e={};for(let t=0;t<r.length;t++){const n=zi(r[t]);for(const i in n)e[i]=n[i]}return e}function Od(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Bc(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const kd={clone:zi,merge:Lt};var Hd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vn extends ln{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Hd,this.fragmentShader=zd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zi(e.uniforms),this.uniformsGroups=Od(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Uc extends ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Le,this.projectionMatrix=new Le,this.projectionMatrixInverse=new Le,this.coordinateSystem=wn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Nn=new P,il=new Te,sl=new Te;class Bt extends Uc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Hi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ds*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Hi*2*Math.atan(Math.tan(ds*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Nn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Nn.x,Nn.y).multiplyScalar(-e/Nn.z),Nn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Nn.x,Nn.y).multiplyScalar(-e/Nn.z)}getViewSize(e,t){return this.getViewBounds(e,il,sl),t.subVectors(sl,il)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ds*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const vi=-90,Si=1;class Gd extends ht{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Bt(vi,Si,e,t);i.layers=this.layers,this.add(i);const s=new Bt(vi,Si,e,t);s.layers=this.layers,this.add(s);const o=new Bt(vi,Si,e,t);o.layers=this.layers,this.add(o);const a=new Bt(vi,Si,e,t);a.layers=this.layers,this.add(a);const l=new Bt(vi,Si,e,t);l.layers=this.layers,this.add(l);const c=new Bt(vi,Si,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===wn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===xr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const A=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=A,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Fc extends At{constructor(e,t,n,i,s,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Ui,super(e,t,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Vd extends oi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Fc(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ct}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new bs(5,5,5),s=new Vn({name:"CubemapFromEquirect",uniforms:zi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ct,blending:zn});s.uniforms.tEquirect.value=t;const o=new Gt(i,s),a=t.minFilter;return t.minFilter===dn&&(t.minFilter=ct),new Gd(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}class si extends ht{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Wd={type:"move"};class jr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new si,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new si,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new si,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const A of e.hand.values()){const m=t.getJointPose(A,n),p=this._getHandJoint(c,A);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Wd)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new si;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Qd extends ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pn,this.environmentIntensity=1,this.environmentRotation=new pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class qd{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Zo,this.updateRanges=[],this.version=0,this.uuid=an()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=an()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=an()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Pt=new P;class ya{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=rn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=et(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=rn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=rn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=rn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=rn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array),s=et(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new _t(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ya(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const rl=new P,ol=new Xe,al=new Xe,Yd=new P,ll=new Le,Gs=new P,Xr=new fn,cl=new Le,Kr=new Qi;class jd extends Gt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Oa,this.bindMatrix=new Le,this.bindMatrixInverse=new Le,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Dn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Gs),this.boundingBox.expandByPoint(Gs)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new fn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Gs),this.boundingSphere.expandByPoint(Gs)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xr.copy(this.boundingSphere),Xr.applyMatrix4(i),e.ray.intersectsSphere(Xr)!==!1&&(cl.copy(i).invert(),Kr.copy(e.ray).applyMatrix4(cl),!(this.boundingBox!==null&&Kr.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Kr)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Xe,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Oa?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Fh?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;ol.fromBufferAttribute(i.attributes.skinIndex,e),al.fromBufferAttribute(i.attributes.skinWeight,e),rl.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=al.getComponent(s);if(o!==0){const a=ol.getComponent(s);ll.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Yd.copy(rl).applyMatrix4(ll),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Nc extends ht{constructor(){super(),this.isBone=!0,this.type="Bone"}}class xa extends At{constructor(e=null,t=1,n=1,i,s,o,a,l,c=Ft,h=Ft,d,u){super(null,o,a,l,c,h,i,s,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const hl=new Le,Xd=new Le;class ba{constructor(e=[],t=[]){this.uuid=an(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Le)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Le;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:Xd;hl.multiplyMatrices(a,t[s]),hl.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new ba(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new xa(t,e,e,$t,zt);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new Nc),this.bones.push(o),this.boneInverses.push(new Le().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Jo extends _t{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const _i=new Le,dl=new Le,Vs=[],ul=new Dn,Kd=new Le,is=new Gt,ss=new fn;class Zd extends Gt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Jo(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Kd)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Dn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,_i),ul.copy(e.boundingBox).applyMatrix4(_i),this.boundingBox.union(ul)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new fn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,_i),ss.copy(e.boundingSphere).applyMatrix4(_i),this.boundingSphere.union(ss)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(is.geometry=this.geometry,is.material=this.material,is.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ss.copy(this.boundingSphere),ss.applyMatrix4(n),e.ray.intersectsSphere(ss)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,_i),dl.multiplyMatrices(n,_i),is.matrixWorld=dl,is.raycast(e,Vs);for(let o=0,a=Vs.length;o<a;o++){const l=Vs[o];l.instanceId=s,l.object=this,t.push(l)}Vs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Jo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new xa(new Float32Array(i*this.count),i,this.count,ha,zt));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Zr=new P,Jd=new P,$d=new Be;class kn{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Zr.subVectors(n,t).cross(Jd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Zr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||$d.getNormalMatrix(e),i=this.coplanarPoint(Zr).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xn=new fn,Ws=new P;class va{constructor(e=new kn,t=new kn,n=new kn,i=new kn,s=new kn,o=new kn){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=wn){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],d=i[6],u=i[7],f=i[8],g=i[9],A=i[10],m=i[11],p=i[12],v=i[13],M=i[14],y=i[15];if(n[0].setComponents(l-s,u-c,m-f,y-p).normalize(),n[1].setComponents(l+s,u+c,m+f,y+p).normalize(),n[2].setComponents(l+o,u+h,m+g,y+v).normalize(),n[3].setComponents(l-o,u-h,m-g,y-v).normalize(),n[4].setComponents(l-a,u-d,m-A,y-M).normalize(),t===wn)n[5].setComponents(l+a,u+d,m+A,y+M).normalize();else if(t===xr)n[5].setComponents(a,d,A,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xn)}intersectsSprite(e){return Xn.center.set(0,0,0),Xn.radius=.7071067811865476,Xn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xn)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Ws.x=i.normal.x>0?e.max.x:e.min.x,Ws.y=i.normal.y>0?e.max.y:e.min.y,Ws.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ws)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class _r extends ln{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ge(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const br=new P,vr=new P,pl=new Le,rs=new Qi,Qs=new fn,Jr=new P,fl=new P;class ys extends ht{constructor(e=new Nt,t=new _r){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)br.fromBufferAttribute(t,i-1),vr.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=br.distanceTo(vr);e.setAttribute("lineDistance",new Rt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Qs.copy(n.boundingSphere),Qs.applyMatrix4(i),Qs.radius+=s,e.ray.intersectsSphere(Qs)===!1)return;pl.copy(i).invert(),rs.copy(e.ray).applyMatrix4(pl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let A=f,m=g-1;A<m;A+=c){const p=h.getX(A),v=h.getX(A+1),M=qs(this,e,rs,l,p,v,A);M&&t.push(M)}if(this.isLineLoop){const A=h.getX(g-1),m=h.getX(f),p=qs(this,e,rs,l,A,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let A=f,m=g-1;A<m;A+=c){const p=qs(this,e,rs,l,A,A+1,A);p&&t.push(p)}if(this.isLineLoop){const A=qs(this,e,rs,l,g-1,f,g-1);A&&t.push(A)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function qs(r,e,t,n,i,s,o){const a=r.geometry.attributes.position;if(br.fromBufferAttribute(a,i),vr.fromBufferAttribute(a,s),t.distanceSqToSegment(br,vr,Jr,fl)>n)return;Jr.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Jr);if(!(c<e.near||c>e.far))return{distance:c,point:fl.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const ml=new P,gl=new P;class Oc extends ys{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)ml.fromBufferAttribute(t,i),gl.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+ml.distanceTo(gl);e.setAttribute("lineDistance",new Rt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class eu extends ys{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Sa extends ln{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ge(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Al=new Le,$o=new Qi,Ys=new fn,js=new P;class kc extends ht{constructor(e=new Nt,t=new Sa){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ys.copy(n.boundingSphere),Ys.applyMatrix4(i),Ys.radius+=s,e.ray.intersectsSphere(Ys)===!1)return;Al.copy(i).invert(),$o.copy(e.ray).applyMatrix4(Al);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=u,A=f;g<A;g++){const m=c.getX(g);js.fromBufferAttribute(d,m),yl(js,m,l,i,e,t,this)}}else{const u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let g=u,A=f;g<A;g++)js.fromBufferAttribute(d,g),yl(js,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function yl(r,e,t,n,i,s,o){const a=$o.distanceSqToPoint(r);if(a<t){const l=new P;$o.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class _a extends At{constructor(e,t,n,i,s,o,a,l,c){super(e,t,n,i,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Hc extends At{constructor(e,t,n,i,s,o,a,l,c,h=Ii){if(h!==Ii&&h!==ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ii&&(n=ri),n===void 0&&h===ki&&(n=Oi),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Ft,this.minFilter=l!==void 0?l:Ft,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ga(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Ma extends Nt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new P,h=new Te;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){const f=n+d/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[u]/e+1)/2,h.y=(o[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new Rt(o,3)),this.setAttribute("normal",new Rt(a,3)),this.setAttribute("uv",new Rt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ma(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class vs extends Nt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,d=e/a,u=t/l,f=[],g=[],A=[],m=[];for(let p=0;p<h;p++){const v=p*u-o;for(let M=0;M<c;M++){const y=M*d-s;g.push(y,-v,0),A.push(0,0,1),m.push(M/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<a;v++){const M=v+c*p,y=v+c*(p+1),C=v+1+c*(p+1),I=v+1+c*p;f.push(M,y,I),f.push(y,C,I)}this.setIndex(f),this.setAttribute("position",new Rt(g,3)),this.setAttribute("normal",new Rt(A,3)),this.setAttribute("uv",new Rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vs(e.width,e.height,e.widthSegments,e.heightSegments)}}class tu extends ln{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new ge(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class Mr extends ln{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wc,this.normalScale=new Te(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ut extends Mr{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Te(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ne(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ge(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ge(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ge(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class nu extends ln{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class iu extends ln{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Xs(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function su(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function ru(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function xl(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function zc(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class Ss{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class ou extends Ss{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ti,endingEnd:Ti}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ci:s=e,a=2*t-n;break;case Ar:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ci:o=e,l=2*n-t;break;case Ar:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),A=g*g,m=A*g,p=-u*m+2*u*A-u*g,v=(1+u)*m+(-1.5-2*u)*A+(-.5+u)*g+1,M=(-1-f)*m+(1.5+f)*A+.5*g,y=f*m-f*A;for(let C=0;C!==a;++C)s[C]=p*o[h+C]+v*o[c+C]+M*o[l+C]+y*o[d+C];return s}}class Gc extends Ss{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),d=1-h;for(let u=0;u!==a;++u)s[u]=o[c+u]*d+o[l+u]*h;return s}}class au extends Ss{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class mn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Xs(t,this.TimeBufferType),this.values=Xs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Xs(e.times,Array),values:Xs(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new au(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Gc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ou(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ms:t=this.InterpolantFactoryMethodDiscrete;break;case gs:t=this.InterpolantFactoryMethodLinear;break;case Cr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ms;case this.InterpolantFactoryMethodLinear:return gs;case this.InterpolantFactoryMethodSmooth:return Cr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&su(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Cr,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const d=a*n,u=d-n,f=d+n;for(let g=0;g!==n;++g){const A=t[d+g];if(A!==t[u+g]||A!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const d=a*n,u=o*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}mn.prototype.TimeBufferType=Float32Array;mn.prototype.ValueBufferType=Float32Array;mn.prototype.DefaultInterpolation=gs;class qi extends mn{constructor(e,t,n){super(e,t,n)}}qi.prototype.ValueTypeName="bool";qi.prototype.ValueBufferType=Array;qi.prototype.DefaultInterpolation=ms;qi.prototype.InterpolantFactoryMethodLinear=void 0;qi.prototype.InterpolantFactoryMethodSmooth=void 0;class Vc extends mn{}Vc.prototype.ValueTypeName="color";class Gi extends mn{}Gi.prototype.ValueTypeName="number";class lu extends Ss{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)qt.slerpFlat(s,0,o,c-a,o,c,l);return s}}class Vi extends mn{InterpolantFactoryMethodLinear(e){return new lu(this.times,this.values,this.getValueSize(),e)}}Vi.prototype.ValueTypeName="quaternion";Vi.prototype.InterpolantFactoryMethodSmooth=void 0;class Yi extends mn{constructor(e,t,n){super(e,t,n)}}Yi.prototype.ValueTypeName="string";Yi.prototype.ValueBufferType=Array;Yi.prototype.DefaultInterpolation=ms;Yi.prototype.InterpolantFactoryMethodLinear=void 0;Yi.prototype.InterpolantFactoryMethodSmooth=void 0;class Wi extends mn{}Wi.prototype.ValueTypeName="vector";class ea{constructor(e="",t=-1,n=[],i=fa){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=an(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(hu(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(mn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const h=ru(l);l=xl(l,1,h),c=xl(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new Gi(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(s);if(h&&h.length>1){const d=h[1];let u=i[d];u||(i[d]=u=[]),u.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,u,f,g,A){if(f.length!==0){const m=[],p=[];zc(f,m,p,g),m.length!==0&&A.push(new d(u,m,p))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const u=c[d].keys;if(!(!u||u.length===0))if(u[0].morphTargets){const f={};let g;for(g=0;g<u.length;g++)if(u[g].morphTargets)for(let A=0;A<u[g].morphTargets.length;A++)f[u[g].morphTargets[A]]=-1;for(const A in f){const m=[],p=[];for(let v=0;v!==u[g].morphTargets.length;++v){const M=u[g];m.push(M.time),p.push(M.morphTarget===A?1:0)}i.push(new Gi(".morphTargetInfluence["+A+"]",m,p))}l=f.length*o}else{const f=".bones["+t[d].name+"]";n(Wi,f+".position",u,"pos",i),n(Vi,f+".quaternion",u,"rot",i),n(Wi,f+".scale",u,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function cu(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Gi;case"vector":case"vector2":case"vector3":case"vector4":return Wi;case"color":return Vc;case"quaternion":return Vi;case"bool":case"boolean":return qi;case"string":return Yi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function hu(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=cu(r.type);if(r.times===void 0){const t=[],n=[];zc(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Tn={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class du{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){const f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const uu=new du;class ai{constructor(e){this.manager=e!==void 0?e:uu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}ai.DEFAULT_MATERIAL_NAME="__DEFAULT";const vn={};class pu extends Error{constructor(e,t){super(e),this.response=t}}class Ea extends ai{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Tn.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(vn[e]!==void 0){vn[e].push({onLoad:t,onProgress:n,onError:i});return}vn[e]=[],vn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=vn[e],d=c.body.getReader(),u=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=u?parseInt(u):0,g=f!==0;let A=0;const m=new ReadableStream({start(p){v();function v(){d.read().then(({done:M,value:y})=>{if(M)p.close();else{A+=y.byteLength;const C=new ProgressEvent("progress",{lengthComputable:g,loaded:A,total:f});for(let I=0,T=h.length;I<T;I++){const w=h[I];w.onProgress&&w.onProgress(C)}p.enqueue(y),v()}},M=>{p.error(M)})}}});return new Response(m)}else throw new pu(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{Tn.add(e,c);const h=vn[e];delete vn[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=vn[e];if(h===void 0)throw this.manager.itemError(e),c;delete vn[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class fu extends ai{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Tn.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=As("img");function l(){h(),Tn.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(d){h(),i&&i(d),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class mu extends ai{constructor(e){super(e)}load(e,t,n,i){const s=this,o=new xa,a=new Ea(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(s.withCredentials),a.load(e,function(l){let c;try{c=s.parse(l)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}c.image!==void 0?o.image=c.image:c.data!==void 0&&(o.image.width=c.width,o.image.height=c.height,o.image.data=c.data),o.wrapS=c.wrapS!==void 0?c.wrapS:Jt,o.wrapT=c.wrapT!==void 0?c.wrapT:Jt,o.magFilter=c.magFilter!==void 0?c.magFilter:ct,o.minFilter=c.minFilter!==void 0?c.minFilter:ct,o.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(o.colorSpace=c.colorSpace),c.flipY!==void 0&&(o.flipY=c.flipY),c.format!==void 0&&(o.format=c.format),c.type!==void 0&&(o.type=c.type),c.mipmaps!==void 0&&(o.mipmaps=c.mipmaps,o.minFilter=dn),c.mipmapCount===1&&(o.minFilter=ct),c.generateMipmaps!==void 0&&(o.generateMipmaps=c.generateMipmaps),o.needsUpdate=!0,t&&t(o,c)},n,i),o}}class Wc extends ai{constructor(e){super(e)}load(e,t,n,i){const s=new At,o=new fu(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Er extends ht{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ge(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const $r=new Le,bl=new P,vl=new P;class wa{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Te(512,512),this.map=null,this.mapPass=null,this.matrix=new Le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new va,this._frameExtents=new Te(1,1),this._viewportCount=1,this._viewports=[new Xe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;bl.setFromMatrixPosition(e.matrixWorld),t.position.copy(bl),vl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(vl),t.updateMatrixWorld(),$r.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix($r),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply($r)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class gu extends wa{constructor(){super(new Bt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Hi*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Au extends Er{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new gu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Sl=new Le,os=new P,eo=new P;class yu extends wa{constructor(){super(new Bt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Te(4,2),this._viewportCount=6,this._viewports=[new Xe(2,1,1,1),new Xe(0,1,1,1),new Xe(3,1,1,1),new Xe(1,1,1,1),new Xe(3,0,1,1),new Xe(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),os.setFromMatrixPosition(e.matrixWorld),n.position.copy(os),eo.copy(n.position),eo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(eo),n.updateMatrixWorld(),i.makeTranslation(-os.x,-os.y,-os.z),Sl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sl)}}class xu extends Er{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new yu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Ta extends Uc{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class bu extends wa{constructor(){super(new Ta(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Qc extends Er{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.shadow=new bu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class vu extends Er{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class ps{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Su extends ai{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Tn.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Tn.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Tn.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});Tn.add(e,l),s.manager.itemStart(e)}}class _u extends Bt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class Mu{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=_l(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=_l();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function _l(){return performance.now()}class Eu{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,o;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[s+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,o=i;s!==o;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){qt.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const o=this._workIndex*s;qt.multiplyQuaternionsFlat(e,o,e,t,e,n),qt.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,s){const o=1-i;for(let a=0;a!==s;++a){const l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,s){for(let o=0;o!==s;++o){const a=t+o;e[a]=e[a]+e[n+o]*i}}}const Ca="\\[\\]\\.:\\/",wu=new RegExp("["+Ca+"]","g"),Ra="[^"+Ca+"]",Tu="[^"+Ca.replace("\\.","")+"]",Cu=/((?:WC+[\/:])*)/.source.replace("WC",Ra),Ru=/(WCOD+)?/.source.replace("WCOD",Tu),Iu=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ra),Du=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ra),Pu=new RegExp("^"+Cu+Ru+Iu+Du+"$"),Lu=["material","materials","bones","map"];class Bu{constructor(e,t,n){const i=n||Je.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Je{constructor(e,t,n){this.path=t,this.parsedPath=n||Je.parseTrackName(t),this.node=Je.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Je.Composite(e,t,n):new Je(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(wu,"")}static parseTrackName(e){const t=Pu.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Lu.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Je.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Je.Composite=Bu;Je.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Je.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Je.prototype.GetterByBindingType=[Je.prototype._getValue_direct,Je.prototype._getValue_array,Je.prototype._getValue_arrayElement,Je.prototype._getValue_toArray];Je.prototype.SetterByBindingTypeAndVersioning=[[Je.prototype._setValue_direct,Je.prototype._setValue_direct_setNeedsUpdate,Je.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_array,Je.prototype._setValue_array_setNeedsUpdate,Je.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_arrayElement,Je.prototype._setValue_arrayElement_setNeedsUpdate,Je.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_fromArray,Je.prototype._setValue_fromArray_setNeedsUpdate,Je.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Uu{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,o=s.length,a=new Array(o),l={endingStart:Ti,endingEnd:Ti};for(let c=0;c!==o;++c){const h=s[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Oh,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,s=e._clip.duration,o=s/i,a=i/s;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Hh:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case fa:default:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const o=n===kh;if(e===0)return s===-1?i:o&&(s&1)===1?t-i:i;if(n===Nh){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,s+=Math.abs(a);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Ci,i.endingEnd=Ci):(e?i.endingStart=this.zeroSlopeAtStart?Ci:Ti:i.endingStart=Ar,t?i.endingEnd=this.zeroSlopeAtEnd?Ci:Ti:i.endingEnd=Ar)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=s,l[0]=t,a[1]=s+e,l[1]=n,this}}const Fu=new Float32Array(1);class Nu extends Wn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let d=0;d!==s;++d){const u=i[d],f=u.name;let g=h[f];if(g!==void 0)++g.referenceCount,o[d]=g;else{if(g=o[d],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}const A=t&&t._propertyBindings[d].binding.parsedPath;g=new Eu(Je.create(n,f,A),u.ValueTypeName,u.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),o[d]=g}a[d].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,o=this._actionsByClip,a=o[s],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const d=a.actionByRoot,u=(e._localRoot||this._root).uuid;delete d[u],l.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[s],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Gc(new Float32Array(2),new Float32Array(2),1,Fu),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let o=typeof e=="string"?ea.findByName(i,e):e;const a=o!==null?o.uuid:e,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=fa),l!==void 0){const d=l.actionByRoot[s];if(d!==void 0&&d.blendMode===n)return d;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const h=new Uu(this,o,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,s),h}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?ea.findByName(n,e):e,o=s?s.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const o=s.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const h=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=h,t[h]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const o in s){const a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const Ml=new Le;class qc{constructor(e,t,n=0,i=1/0){this.ray=new Qi(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Aa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ml.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ml),this}intersectObject(e,t=!0,n=[]){return ta(e,this,n,t),n.sort(El),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)ta(e[i],this,n,t);return n.sort(El),n}}function El(r,e){return r.distance-e.distance}function ta(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let o=0,a=s.length;o<a;o++)ta(s[o],e,t,!0)}}class wl{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ne(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ne(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Tl=new P,Ks=new P,Cl=new P;class Ou extends ht{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new Nt;i.setAttribute("position",new Rt([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));const s=new _r({fog:!1,toneMapped:!1});this.lightPlane=new ys(i,s),this.add(this.lightPlane),i=new Nt,i.setAttribute("position",new Rt([0,0,0,0,0,1],3)),this.targetLine=new ys(i,s),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Tl.setFromMatrixPosition(this.light.matrixWorld),Ks.setFromMatrixPosition(this.light.target.matrixWorld),Cl.subVectors(Ks,Tl),this.lightPlane.lookAt(Ks),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(Ks),this.targetLine.scale.z=Cl.length()}}class ku extends Oc{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new Nt;i.setAttribute("position",new Rt(t,3)),i.setAttribute("color",new Rt(n,3));const s=new _r({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(e,t,n){const i=new ge,s=this.geometry.attributes.color.array;return i.set(e),i.toArray(s,0),i.toArray(s,3),i.set(t),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class Hu extends Wn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function Rl(r,e,t,n){const i=zu(n);switch(t){case xc:return r*e;case vc:return r*e;case Sc:return r*e*2;case ha:return r*e/i.components*i.byteLength;case da:return r*e/i.components*i.byteLength;case _c:return r*e*2/i.components*i.byteLength;case ua:return r*e*2/i.components*i.byteLength;case bc:return r*e*3/i.components*i.byteLength;case $t:return r*e*4/i.components*i.byteLength;case pa:return r*e*4/i.components*i.byteLength;case rr:case or:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case ar:case lr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Eo:case To:return Math.max(r,16)*Math.max(e,8)/4;case Mo:case wo:return Math.max(r,8)*Math.max(e,8)/2;case Co:case Ro:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Io:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Do:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Po:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Lo:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Bo:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Uo:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Fo:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case No:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Oo:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case ko:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Ho:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case zo:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Go:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Vo:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Wo:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case cr:case Qo:case qo:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Mc:case Yo:return Math.ceil(r/4)*Math.ceil(e/4)*8;case jo:case Xo:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function zu(r){switch(r){case In:case gc:return{byteLength:1,components:1};case fs:case Ac:case En:return{byteLength:2,components:1};case la:case ca:return{byteLength:2,components:4};case ri:case aa:case zt:return{byteLength:4,components:1};case yc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:oa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=oa);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Yc(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Gu(r){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,d=c.byteLength,u=r.createBuffer();r.bindBuffer(l,u),r.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const h=l.array,d=l.updateRanges;if(r.bindBuffer(c,a),d.length===0)r.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],A=d[f];A.start<=g.start+g.count+1?g.count=Math.max(g.count,A.start+A.count-g.start):(++u,d[u]=A)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const A=d[f];r.bufferSubData(c,A.start*h.BYTES_PER_ELEMENT,h,A.start,A.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var Vu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Wu=`#ifdef USE_ALPHAHASH
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
#endif`,Qu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ju=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Xu=`#ifdef USE_AOMAP
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
#endif`,Ku=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Zu=`#ifdef USE_BATCHING
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
#endif`,Ju=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$u=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ep=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,tp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,np=`#ifdef USE_IRIDESCENCE
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
#endif`,ip=`#ifdef USE_BUMPMAP
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
#endif`,sp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,rp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,op=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ap=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,lp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,cp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,hp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,dp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,up=`#define PI 3.141592653589793
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
} // validated`,pp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,fp=`vec3 transformedNormal = objectNormal;
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
#endif`,mp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,gp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ap=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,yp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xp="gl_FragColor = linearToOutputTexel( gl_FragColor );",bp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vp=`#ifdef USE_ENVMAP
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
#endif`,Sp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,_p=`#ifdef USE_ENVMAP
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
#endif`,Mp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ep=`#ifdef USE_ENVMAP
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
#endif`,wp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Tp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Cp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Rp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ip=`#ifdef USE_GRADIENTMAP
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
}`,Dp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Bp=`uniform bool receiveShadow;
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
#endif`,Up=`#ifdef USE_ENVMAP
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
#endif`,Fp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Np=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Op=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Hp=`PhysicalMaterial material;
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
#endif`,zp=`struct PhysicalMaterial {
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
}`,Gp=`
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
#endif`,Vp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Wp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Qp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,qp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Kp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Jp=`#if defined( USE_POINTS_UV )
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
#endif`,$p=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ef=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,nf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rf=`#ifdef USE_MORPHTARGETS
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
#endif`,of=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,af=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,lf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,cf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,df=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,uf=`#ifdef USE_NORMALMAP
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
#endif`,pf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ff=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,mf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Af=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,xf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Sf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_f=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Mf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ef=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,wf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Tf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Cf=`float getShadowMask() {
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
}`,Rf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,If=`#ifdef USE_SKINNING
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
#endif`,Df=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Pf=`#ifdef USE_SKINNING
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
#endif`,Lf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Uf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ff=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Nf=`#ifdef USE_TRANSMISSION
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
#endif`,Of=`#ifdef USE_TRANSMISSION
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
#endif`,kf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Vf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Wf=`uniform sampler2D t2D;
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
}`,Qf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Yf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xf=`#include <common>
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
}`,Kf=`#if DEPTH_PACKING == 3200
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
}`,Zf=`#define DISTANCE
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
}`,Jf=`#define DISTANCE
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
}`,$f=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,em=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tm=`uniform float scale;
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
}`,nm=`uniform vec3 diffuse;
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
}`,im=`#include <common>
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
}`,sm=`uniform vec3 diffuse;
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
}`,rm=`#define LAMBERT
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
}`,om=`#define LAMBERT
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
}`,am=`#define MATCAP
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
}`,lm=`#define MATCAP
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
}`,cm=`#define NORMAL
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
}`,hm=`#define NORMAL
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
}`,dm=`#define PHONG
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
}`,um=`#define PHONG
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
}`,pm=`#define STANDARD
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
}`,fm=`#define STANDARD
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
}`,mm=`#define TOON
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
}`,gm=`#define TOON
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
}`,Am=`uniform float size;
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
}`,ym=`uniform vec3 diffuse;
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
}`,xm=`#include <common>
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
}`,bm=`uniform vec3 color;
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
}`,vm=`uniform float rotation;
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
}`,Sm=`uniform vec3 diffuse;
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
}`,Fe={alphahash_fragment:Vu,alphahash_pars_fragment:Wu,alphamap_fragment:Qu,alphamap_pars_fragment:qu,alphatest_fragment:Yu,alphatest_pars_fragment:ju,aomap_fragment:Xu,aomap_pars_fragment:Ku,batching_pars_vertex:Zu,batching_vertex:Ju,begin_vertex:$u,beginnormal_vertex:ep,bsdfs:tp,iridescence_fragment:np,bumpmap_pars_fragment:ip,clipping_planes_fragment:sp,clipping_planes_pars_fragment:rp,clipping_planes_pars_vertex:op,clipping_planes_vertex:ap,color_fragment:lp,color_pars_fragment:cp,color_pars_vertex:hp,color_vertex:dp,common:up,cube_uv_reflection_fragment:pp,defaultnormal_vertex:fp,displacementmap_pars_vertex:mp,displacementmap_vertex:gp,emissivemap_fragment:Ap,emissivemap_pars_fragment:yp,colorspace_fragment:xp,colorspace_pars_fragment:bp,envmap_fragment:vp,envmap_common_pars_fragment:Sp,envmap_pars_fragment:_p,envmap_pars_vertex:Mp,envmap_physical_pars_fragment:Up,envmap_vertex:Ep,fog_vertex:wp,fog_pars_vertex:Tp,fog_fragment:Cp,fog_pars_fragment:Rp,gradientmap_pars_fragment:Ip,lightmap_pars_fragment:Dp,lights_lambert_fragment:Pp,lights_lambert_pars_fragment:Lp,lights_pars_begin:Bp,lights_toon_fragment:Fp,lights_toon_pars_fragment:Np,lights_phong_fragment:Op,lights_phong_pars_fragment:kp,lights_physical_fragment:Hp,lights_physical_pars_fragment:zp,lights_fragment_begin:Gp,lights_fragment_maps:Vp,lights_fragment_end:Wp,logdepthbuf_fragment:Qp,logdepthbuf_pars_fragment:qp,logdepthbuf_pars_vertex:Yp,logdepthbuf_vertex:jp,map_fragment:Xp,map_pars_fragment:Kp,map_particle_fragment:Zp,map_particle_pars_fragment:Jp,metalnessmap_fragment:$p,metalnessmap_pars_fragment:ef,morphinstance_vertex:tf,morphcolor_vertex:nf,morphnormal_vertex:sf,morphtarget_pars_vertex:rf,morphtarget_vertex:of,normal_fragment_begin:af,normal_fragment_maps:lf,normal_pars_fragment:cf,normal_pars_vertex:hf,normal_vertex:df,normalmap_pars_fragment:uf,clearcoat_normal_fragment_begin:pf,clearcoat_normal_fragment_maps:ff,clearcoat_pars_fragment:mf,iridescence_pars_fragment:gf,opaque_fragment:Af,packing:yf,premultiplied_alpha_fragment:xf,project_vertex:bf,dithering_fragment:vf,dithering_pars_fragment:Sf,roughnessmap_fragment:_f,roughnessmap_pars_fragment:Mf,shadowmap_pars_fragment:Ef,shadowmap_pars_vertex:wf,shadowmap_vertex:Tf,shadowmask_pars_fragment:Cf,skinbase_vertex:Rf,skinning_pars_vertex:If,skinning_vertex:Df,skinnormal_vertex:Pf,specularmap_fragment:Lf,specularmap_pars_fragment:Bf,tonemapping_fragment:Uf,tonemapping_pars_fragment:Ff,transmission_fragment:Nf,transmission_pars_fragment:Of,uv_pars_fragment:kf,uv_pars_vertex:Hf,uv_vertex:zf,worldpos_vertex:Gf,background_vert:Vf,background_frag:Wf,backgroundCube_vert:Qf,backgroundCube_frag:qf,cube_vert:Yf,cube_frag:jf,depth_vert:Xf,depth_frag:Kf,distanceRGBA_vert:Zf,distanceRGBA_frag:Jf,equirect_vert:$f,equirect_frag:em,linedashed_vert:tm,linedashed_frag:nm,meshbasic_vert:im,meshbasic_frag:sm,meshlambert_vert:rm,meshlambert_frag:om,meshmatcap_vert:am,meshmatcap_frag:lm,meshnormal_vert:cm,meshnormal_frag:hm,meshphong_vert:dm,meshphong_frag:um,meshphysical_vert:pm,meshphysical_frag:fm,meshtoon_vert:mm,meshtoon_frag:gm,points_vert:Am,points_frag:ym,shadow_vert:xm,shadow_frag:bm,sprite_vert:vm,sprite_frag:Sm},se={common:{diffuse:{value:new ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new Te(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new ge(16777215)},opacity:{value:1},center:{value:new Te(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},hn={basic:{uniforms:Lt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:Lt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new ge(0)}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:Lt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new ge(0)},specular:{value:new ge(1118481)},shininess:{value:30}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:Lt([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:Lt([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new ge(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:Lt([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:Lt([se.points,se.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:Lt([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:Lt([se.common,se.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:Lt([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:Lt([se.sprite,se.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distanceRGBA:{uniforms:Lt([se.common,se.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distanceRGBA_vert,fragmentShader:Fe.distanceRGBA_frag},shadow:{uniforms:Lt([se.lights,se.fog,{color:{value:new ge(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};hn.physical={uniforms:Lt([hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new Te(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new Te},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new ge(0)},specularColor:{value:new ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new Te},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const Zs={r:0,b:0,g:0},Kn=new pn,_m=new Le;function Mm(r,e,t,n,i,s,o){const a=new ge(0);let l=s===!0?0:1,c,h,d=null,u=0,f=null;function g(M){let y=M.isScene===!0?M.background:null;return y&&y.isTexture&&(y=(M.backgroundBlurriness>0?t:e).get(y)),y}function A(M){let y=!1;const C=g(M);C===null?p(a,l):C&&C.isColor&&(p(C,1),y=!0);const I=r.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,o):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(M,y){const C=g(y);C&&(C.isCubeTexture||C.mapping===Sr)?(h===void 0&&(h=new Gt(new bs(1,1,1),new Vn({name:"BackgroundCubeMaterial",uniforms:zi(hn.backgroundCube.uniforms),vertexShader:hn.backgroundCube.vertexShader,fragmentShader:hn.backgroundCube.fragmentShader,side:Ct,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,T,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Kn.copy(y.backgroundRotation),Kn.x*=-1,Kn.y*=-1,Kn.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Kn.y*=-1,Kn.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(_m.makeRotationFromEuler(Kn)),h.material.toneMapped=Qe.getTransfer(C.colorSpace)!==nt,(d!==C||u!==C.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,d=C,u=C.version,f=r.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new Gt(new vs(2,2),new Vn({name:"BackgroundMaterial",uniforms:zi(hn.background.uniforms),vertexShader:hn.background.vertexShader,fragmentShader:hn.background.fragmentShader,side:Tt,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(C.colorSpace)!==nt,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||u!==C.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,d=C,u=C.version,f=r.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,y){M.getRGB(Zs,Bc(r)),n.buffers.color.setClear(Zs.r,Zs.g,Zs.b,y,o)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,y=1){a.set(M),l=y,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(a,l)},render:A,addToRenderList:m,dispose:v}}function Em(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=u(null);let s=i,o=!1;function a(x,R,k,F,z){let Q=!1;const G=d(F,k,R);s!==G&&(s=G,c(s.object)),Q=f(x,F,k,z),Q&&g(x,F,k,z),z!==null&&e.update(z,r.ELEMENT_ARRAY_BUFFER),(Q||o)&&(o=!1,y(x,R,k,F),z!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return r.createVertexArray()}function c(x){return r.bindVertexArray(x)}function h(x){return r.deleteVertexArray(x)}function d(x,R,k){const F=k.wireframe===!0;let z=n[x.id];z===void 0&&(z={},n[x.id]=z);let Q=z[R.id];Q===void 0&&(Q={},z[R.id]=Q);let G=Q[F];return G===void 0&&(G=u(l()),Q[F]=G),G}function u(x){const R=[],k=[],F=[];for(let z=0;z<t;z++)R[z]=0,k[z]=0,F[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:k,attributeDivisors:F,object:x,attributes:{},index:null}}function f(x,R,k,F){const z=s.attributes,Q=R.attributes;let G=0;const K=k.getAttributes();for(const V in K)if(K[V].location>=0){const ne=z[V];let ye=Q[V];if(ye===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(ye=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(ye=x.instanceColor)),ne===void 0||ne.attribute!==ye||ye&&ne.data!==ye.data)return!0;G++}return s.attributesNum!==G||s.index!==F}function g(x,R,k,F){const z={},Q=R.attributes;let G=0;const K=k.getAttributes();for(const V in K)if(K[V].location>=0){let ne=Q[V];ne===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(ne=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(ne=x.instanceColor));const ye={};ye.attribute=ne,ne&&ne.data&&(ye.data=ne.data),z[V]=ye,G++}s.attributes=z,s.attributesNum=G,s.index=F}function A(){const x=s.newAttributes;for(let R=0,k=x.length;R<k;R++)x[R]=0}function m(x){p(x,0)}function p(x,R){const k=s.newAttributes,F=s.enabledAttributes,z=s.attributeDivisors;k[x]=1,F[x]===0&&(r.enableVertexAttribArray(x),F[x]=1),z[x]!==R&&(r.vertexAttribDivisor(x,R),z[x]=R)}function v(){const x=s.newAttributes,R=s.enabledAttributes;for(let k=0,F=R.length;k<F;k++)R[k]!==x[k]&&(r.disableVertexAttribArray(k),R[k]=0)}function M(x,R,k,F,z,Q,G){G===!0?r.vertexAttribIPointer(x,R,k,z,Q):r.vertexAttribPointer(x,R,k,F,z,Q)}function y(x,R,k,F){A();const z=F.attributes,Q=k.getAttributes(),G=R.defaultAttributeValues;for(const K in Q){const V=Q[K];if(V.location>=0){let te=z[K];if(te===void 0&&(K==="instanceMatrix"&&x.instanceMatrix&&(te=x.instanceMatrix),K==="instanceColor"&&x.instanceColor&&(te=x.instanceColor)),te!==void 0){const ne=te.normalized,ye=te.itemSize,Me=e.get(te);if(Me===void 0)continue;const Ue=Me.buffer,q=Me.type,ee=Me.bytesPerElement,me=q===r.INT||q===r.UNSIGNED_INT||te.gpuType===aa;if(te.isInterleavedBufferAttribute){const re=te.data,Se=re.stride,We=te.offset;if(re.isInstancedInterleavedBuffer){for(let we=0;we<V.locationSize;we++)p(V.location+we,re.meshPerAttribute);x.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let we=0;we<V.locationSize;we++)m(V.location+we);r.bindBuffer(r.ARRAY_BUFFER,Ue);for(let we=0;we<V.locationSize;we++)M(V.location+we,ye/V.locationSize,q,ne,Se*ee,(We+ye/V.locationSize*we)*ee,me)}else{if(te.isInstancedBufferAttribute){for(let re=0;re<V.locationSize;re++)p(V.location+re,te.meshPerAttribute);x.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let re=0;re<V.locationSize;re++)m(V.location+re);r.bindBuffer(r.ARRAY_BUFFER,Ue);for(let re=0;re<V.locationSize;re++)M(V.location+re,ye/V.locationSize,q,ne,ye*ee,ye/V.locationSize*re*ee,me)}}else if(G!==void 0){const ne=G[K];if(ne!==void 0)switch(ne.length){case 2:r.vertexAttrib2fv(V.location,ne);break;case 3:r.vertexAttrib3fv(V.location,ne);break;case 4:r.vertexAttrib4fv(V.location,ne);break;default:r.vertexAttrib1fv(V.location,ne)}}}}v()}function C(){w();for(const x in n){const R=n[x];for(const k in R){const F=R[k];for(const z in F)h(F[z].object),delete F[z];delete R[k]}delete n[x]}}function I(x){if(n[x.id]===void 0)return;const R=n[x.id];for(const k in R){const F=R[k];for(const z in F)h(F[z].object),delete F[z];delete R[k]}delete n[x.id]}function T(x){for(const R in n){const k=n[R];if(k[x.id]===void 0)continue;const F=k[x.id];for(const z in F)h(F[z].object),delete F[z];delete k[x.id]}}function w(){_(),o=!0,s!==i&&(s=i,c(s.object))}function _(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:w,resetDefaultState:_,dispose:C,releaseStatesOfGeometry:I,releaseStatesOfProgram:T,initAttributes:A,enableAttribute:m,disableUnusedAttributes:v}}function wm(r,e,t){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,d){d!==0&&(r.drawArraysInstanced(n,c,h,d),t.update(h,n,d))}function a(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];t.update(f,n,1)}function l(c,h,d,u){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let g=0;for(let A=0;A<d;A++)g+=h[A]*u[A];t.update(g,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Tm(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(T){return!(T!==$t&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const w=T===En&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==In&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==zt&&!w)}function l(T){if(T==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,u=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),v=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),M=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,I=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:A,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:y,vertexTextures:C,maxSamples:I}}function Cm(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new kn,a=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,A=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||g===null||g.length===0||s&&!m)s?h(null):c();else{const v=s?0:n,M=v*4;let y=p.clippingState||null;l.value=y,y=h(g,u,M,f);for(let C=0;C!==M;++C)y[C]=t[C];p.clippingState=y,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,g){const A=d!==null?d.length:0;let m=null;if(A!==0){if(m=l.value,g!==!0||m===null){const p=f+A*4,v=u.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,y=f;M!==A;++M,y+=4)o.copy(d[M]).applyMatrix4(v,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,m}}function Rm(r){let e=new WeakMap;function t(o,a){return a===mr?o.mapping=Ui:a===_o&&(o.mapping=Fi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===mr||a===_o)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Vd(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const Ri=4,Il=[.125,.215,.35,.446,.526,.582],ni=20,to=new Ta,Dl=new ge;let no=null,io=0,so=0,ro=!1;const ei=(1+Math.sqrt(5))/2,Mi=1/ei,Pl=[new P(-ei,Mi,0),new P(ei,Mi,0),new P(-Mi,0,ei),new P(Mi,0,ei),new P(0,ei,-Mi),new P(0,ei,Mi),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],Im=new P;class Ll{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:a=Im}=s;no=this._renderer.getRenderTarget(),io=this._renderer.getActiveCubeFace(),so=this._renderer.getActiveMipmapLevel(),ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ul(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(no,io,so),this._renderer.xr.enabled=ro,e.scissorTest=!1,Js(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ui||e.mapping===Fi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),no=this._renderer.getRenderTarget(),io=this._renderer.getActiveCubeFace(),so=this._renderer.getActiveMipmapLevel(),ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ct,minFilter:ct,generateMipmaps:!1,type:En,format:$t,colorSpace:Mt,depthBuffer:!1},i=Bl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bl(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Dm(s)),this._blurMaterial=Pm(s,e,t)}return i}_compileMaterial(e){const t=new Gt(this._lodPlanes[0],e);this._renderer.compile(t,to)}_sceneToCubeUV(e,t,n,i,s){const l=new Bt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Dl),d.toneMapping=Gn,d.autoClear=!1;const g=new ii({name:"PMREM.Background",side:Ct,depthWrite:!1,depthTest:!1}),A=new Gt(new bs,g);let m=!1;const p=e.background;p?p.isColor&&(g.color.copy(p),e.background=null,m=!0):(g.color.copy(Dl),m=!0);for(let v=0;v<6;v++){const M=v%3;M===0?(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[v],s.y,s.z)):M===1?(l.up.set(0,0,c[v]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[v],s.z)):(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[v]));const y=this._cubeSize;Js(i,M*y,v>2?y:0,y,y),d.setRenderTarget(i),m&&d.render(A,l),d.render(e,l)}A.geometry.dispose(),A.material.dispose(),d.toneMapping=f,d.autoClear=u,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Ui||e.mapping===Fi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ul());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new Gt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Js(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,to)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Pl[(i-s-1)%Pl.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Gt(this._lodPlanes[i],c),u=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*ni-1),A=s/g,m=isFinite(s)?1+Math.floor(h*A):ni;m>ni&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ni}`);const p=[];let v=0;for(let T=0;T<ni;++T){const w=T/A,_=Math.exp(-w*w/2);p.push(_),T===0?v+=_:T<m&&(v+=2*_)}for(let T=0;T<p.length;T++)p[T]=p[T]/v;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:M}=this;u.dTheta.value=g,u.mipInt.value=M-n;const y=this._sizeLods[i],C=3*y*(i>M-Ri?i-M+Ri:0),I=4*(this._cubeSize-y);Js(t,C,I,3*y,2*y),l.setRenderTarget(t),l.render(d,to)}}function Dm(r){const e=[],t=[],n=[];let i=r;const s=r-Ri+1+Il.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-Ri?l=Il[o-r+Ri-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,A=3,m=2,p=1,v=new Float32Array(A*g*f),M=new Float32Array(m*g*f),y=new Float32Array(p*g*f);for(let I=0;I<f;I++){const T=I%3*2/3-1,w=I>2?0:-1,_=[T,w,0,T+2/3,w,0,T+2/3,w+1,0,T,w,0,T+2/3,w+1,0,T,w+1,0];v.set(_,A*g*I),M.set(u,m*g*I);const x=[I,I,I,I,I,I];y.set(x,p*g*I)}const C=new Nt;C.setAttribute("position",new _t(v,A)),C.setAttribute("uv",new _t(M,m)),C.setAttribute("faceIndex",new _t(y,p)),e.push(C),i>Ri&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Bl(r,e,t){const n=new oi(r,e,t);return n.texture.mapping=Sr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Js(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Pm(r,e,t){const n=new Float32Array(ni),i=new P(0,1,0);return new Vn({name:"SphericalGaussianBlur",defines:{n:ni,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ia(),fragmentShader:`

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
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Ul(){return new Vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ia(),fragmentShader:`

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
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Fl(){return new Vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ia(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Ia(){return`

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
	`}function Lm(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===mr||l===_o,h=l===Ui||l===Fi;if(c||h){let d=e.get(a);const u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return t===null&&(t=new Ll(r)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Ll(r)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Bm(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&$n("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Um(r,e,t,n){const i={},s=new WeakMap;function o(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete i[u.id];const f=s.get(u);f&&(e.remove(f),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const f in u)e.update(u[f],r.ARRAY_BUFFER)}function c(d){const u=[],f=d.index,g=d.attributes.position;let A=0;if(f!==null){const v=f.array;A=f.version;for(let M=0,y=v.length;M<y;M+=3){const C=v[M+0],I=v[M+1],T=v[M+2];u.push(C,I,I,T,T,C)}}else if(g!==void 0){const v=g.array;A=g.version;for(let M=0,y=v.length/3-1;M<y;M+=3){const C=M+0,I=M+1,T=M+2;u.push(C,I,I,T,T,C)}}else return;const m=new(Rc(u)?Lc:Pc)(u,1);m.version=A;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function h(d){const u=s.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function Fm(r,e,t){let n;function i(u){n=u}let s,o;function a(u){s=u.type,o=u.bytesPerElement}function l(u,f){r.drawElements(n,f,s,u*o),t.update(f,n,1)}function c(u,f,g){g!==0&&(r.drawElementsInstanced(n,f,s,u*o,g),t.update(f,n,g))}function h(u,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function d(u,f,g,A){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)c(u[p]/o,f[p],A[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,s,u,0,A,0,g);let p=0;for(let v=0;v<g;v++)p+=f[v]*A[v];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Nm(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Om(r,e,t){const n=new WeakMap,i=new Xe;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==d){let x=function(){w.dispose(),n.delete(a),a.removeEventListener("dispose",x)};var f=x;u!==void 0&&u.texture.dispose();const g=a.morphAttributes.position!==void 0,A=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let y=0;g===!0&&(y=1),A===!0&&(y=2),m===!0&&(y=3);let C=a.attributes.position.count*y,I=1;C>e.maxTextureSize&&(I=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const T=new Float32Array(C*I*4*d),w=new Ic(T,C,I,d);w.type=zt,w.needsUpdate=!0;const _=y*4;for(let R=0;R<d;R++){const k=p[R],F=v[R],z=M[R],Q=C*I*4*R;for(let G=0;G<k.count;G++){const K=G*_;g===!0&&(i.fromBufferAttribute(k,G),T[Q+K+0]=i.x,T[Q+K+1]=i.y,T[Q+K+2]=i.z,T[Q+K+3]=0),A===!0&&(i.fromBufferAttribute(F,G),T[Q+K+4]=i.x,T[Q+K+5]=i.y,T[Q+K+6]=i.z,T[Q+K+7]=0),m===!0&&(i.fromBufferAttribute(z,G),T[Q+K+8]=i.x,T[Q+K+9]=i.y,T[Q+K+10]=i.z,T[Q+K+11]=z.itemSize===4?i.w:1)}}u={count:d,texture:w,size:new Te(C,I)},n.set(a,u),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const A=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(r,"morphTargetBaseInfluence",A),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}return{update:s}}function km(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,d=e.get(l,h);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const jc=new At,Nl=new Hc(1,1),Xc=new Ic,Kc=new _d,Zc=new Fc,Ol=[],kl=[],Hl=new Float32Array(16),zl=new Float32Array(9),Gl=new Float32Array(4);function ji(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Ol[i];if(s===void 0&&(s=new Float32Array(i),Ol[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function yt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function xt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function wr(r,e){let t=kl[e];t===void 0&&(t=new Int32Array(e),kl[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Hm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function zm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;r.uniform2fv(this.addr,e),xt(t,e)}}function Gm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(yt(t,e))return;r.uniform3fv(this.addr,e),xt(t,e)}}function Vm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;r.uniform4fv(this.addr,e),xt(t,e)}}function Wm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(yt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),xt(t,e)}else{if(yt(t,n))return;Gl.set(n),r.uniformMatrix2fv(this.addr,!1,Gl),xt(t,n)}}function Qm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(yt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),xt(t,e)}else{if(yt(t,n))return;zl.set(n),r.uniformMatrix3fv(this.addr,!1,zl),xt(t,n)}}function qm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(yt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),xt(t,e)}else{if(yt(t,n))return;Hl.set(n),r.uniformMatrix4fv(this.addr,!1,Hl),xt(t,n)}}function Ym(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function jm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;r.uniform2iv(this.addr,e),xt(t,e)}}function Xm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;r.uniform3iv(this.addr,e),xt(t,e)}}function Km(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;r.uniform4iv(this.addr,e),xt(t,e)}}function Zm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Jm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;r.uniform2uiv(this.addr,e),xt(t,e)}}function $m(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;r.uniform3uiv(this.addr,e),xt(t,e)}}function eg(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;r.uniform4uiv(this.addr,e),xt(t,e)}}function tg(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Nl.compareFunction=Tc,s=Nl):s=jc,t.setTexture2D(e||s,i)}function ng(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Kc,i)}function ig(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Zc,i)}function sg(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Xc,i)}function rg(r){switch(r){case 5126:return Hm;case 35664:return zm;case 35665:return Gm;case 35666:return Vm;case 35674:return Wm;case 35675:return Qm;case 35676:return qm;case 5124:case 35670:return Ym;case 35667:case 35671:return jm;case 35668:case 35672:return Xm;case 35669:case 35673:return Km;case 5125:return Zm;case 36294:return Jm;case 36295:return $m;case 36296:return eg;case 35678:case 36198:case 36298:case 36306:case 35682:return tg;case 35679:case 36299:case 36307:return ng;case 35680:case 36300:case 36308:case 36293:return ig;case 36289:case 36303:case 36311:case 36292:return sg}}function og(r,e){r.uniform1fv(this.addr,e)}function ag(r,e){const t=ji(e,this.size,2);r.uniform2fv(this.addr,t)}function lg(r,e){const t=ji(e,this.size,3);r.uniform3fv(this.addr,t)}function cg(r,e){const t=ji(e,this.size,4);r.uniform4fv(this.addr,t)}function hg(r,e){const t=ji(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function dg(r,e){const t=ji(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function ug(r,e){const t=ji(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function pg(r,e){r.uniform1iv(this.addr,e)}function fg(r,e){r.uniform2iv(this.addr,e)}function mg(r,e){r.uniform3iv(this.addr,e)}function gg(r,e){r.uniform4iv(this.addr,e)}function Ag(r,e){r.uniform1uiv(this.addr,e)}function yg(r,e){r.uniform2uiv(this.addr,e)}function xg(r,e){r.uniform3uiv(this.addr,e)}function bg(r,e){r.uniform4uiv(this.addr,e)}function vg(r,e,t){const n=this.cache,i=e.length,s=wr(t,i);yt(n,s)||(r.uniform1iv(this.addr,s),xt(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||jc,s[o])}function Sg(r,e,t){const n=this.cache,i=e.length,s=wr(t,i);yt(n,s)||(r.uniform1iv(this.addr,s),xt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Kc,s[o])}function _g(r,e,t){const n=this.cache,i=e.length,s=wr(t,i);yt(n,s)||(r.uniform1iv(this.addr,s),xt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Zc,s[o])}function Mg(r,e,t){const n=this.cache,i=e.length,s=wr(t,i);yt(n,s)||(r.uniform1iv(this.addr,s),xt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Xc,s[o])}function Eg(r){switch(r){case 5126:return og;case 35664:return ag;case 35665:return lg;case 35666:return cg;case 35674:return hg;case 35675:return dg;case 35676:return ug;case 5124:case 35670:return pg;case 35667:case 35671:return fg;case 35668:case 35672:return mg;case 35669:case 35673:return gg;case 5125:return Ag;case 36294:return yg;case 36295:return xg;case 36296:return bg;case 35678:case 36198:case 36298:case 36306:case 35682:return vg;case 35679:case 36299:case 36307:return Sg;case 35680:case 36300:case 36308:case 36293:return _g;case 36289:case 36303:case 36311:case 36292:return Mg}}class wg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=rg(t.type)}}class Tg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Eg(t.type)}}class Cg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const oo=/(\w+)(\])?(\[|\.)?/g;function Vl(r,e){r.seq.push(e),r.map[e.id]=e}function Rg(r,e,t){const n=r.name,i=n.length;for(oo.lastIndex=0;;){const s=oo.exec(n),o=oo.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Vl(t,c===void 0?new wg(a,r,e):new Tg(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new Cg(a),Vl(t,d)),t=d}}}class hr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);Rg(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Wl(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const Ig=37297;let Dg=0;function Pg(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Ql=new Be;function Lg(r){Qe._getMatrix(Ql,Qe.workingColorSpace,r);const e=`mat3( ${Ql.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(r)){case yr:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function ql(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+Pg(r.getShaderSource(e),o)}else return i}function Bg(r,e){const t=Lg(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Ug(r,e){let t;switch(e){case Ih:t="Linear";break;case Dh:t="Reinhard";break;case Ph:t="Cineon";break;case pc:t="ACESFilmic";break;case Bh:t="AgX";break;case Uh:t="Neutral";break;case Lh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const $s=new P;function Fg(){Qe.getLuminanceCoefficients($s);const r=$s.x.toFixed(4),e=$s.y.toFixed(4),t=$s.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ng(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(hs).join(`
`)}function Og(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function kg(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function hs(r){return r!==""}function Yl(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function jl(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Hg=/^[ \t]*#include +<([\w\d./]+)>/gm;function na(r){return r.replace(Hg,Gg)}const zg=new Map;function Gg(r,e){let t=Fe[e];if(t===void 0){const n=zg.get(e);if(n!==void 0)t=Fe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return na(t)}const Vg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xl(r){return r.replace(Vg,Wg)}function Wg(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Kl(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Qg(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===hc?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===dc?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Sn&&(e="SHADOWMAP_TYPE_VSM"),e}function qg(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Ui:case Fi:e="ENVMAP_TYPE_CUBE";break;case Sr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Yg(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Fi:e="ENVMAP_MODE_REFRACTION";break}return e}function jg(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case uc:e="ENVMAP_BLENDING_MULTIPLY";break;case Ch:e="ENVMAP_BLENDING_MIX";break;case Rh:e="ENVMAP_BLENDING_ADD";break}return e}function Xg(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Kg(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Qg(t),c=qg(t),h=Yg(t),d=jg(t),u=Xg(t),f=Ng(t),g=Og(s),A=i.createProgram();let m,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(hs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(hs).join(`
`),p.length>0&&(p+=`
`)):(m=[Kl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hs).join(`
`),p=[Kl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gn?"#define TONE_MAPPING":"",t.toneMapping!==Gn?Fe.tonemapping_pars_fragment:"",t.toneMapping!==Gn?Ug("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,Bg("linearToOutputTexel",t.outputColorSpace),Fg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(hs).join(`
`)),o=na(o),o=Yl(o,t),o=jl(o,t),a=na(a),a=Yl(a,t),a=jl(a,t),o=Xl(o),a=Xl(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Ha?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ha?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=v+m+o,y=v+p+a,C=Wl(i,i.VERTEX_SHADER,M),I=Wl(i,i.FRAGMENT_SHADER,y);i.attachShader(A,C),i.attachShader(A,I),t.index0AttributeName!==void 0?i.bindAttribLocation(A,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(A,0,"position"),i.linkProgram(A);function T(R){if(r.debug.checkShaderErrors){const k=i.getProgramInfoLog(A).trim(),F=i.getShaderInfoLog(C).trim(),z=i.getShaderInfoLog(I).trim();let Q=!0,G=!0;if(i.getProgramParameter(A,i.LINK_STATUS)===!1)if(Q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,A,C,I);else{const K=ql(i,C,"vertex"),V=ql(i,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(A,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+k+`
`+K+`
`+V)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(F===""||z==="")&&(G=!1);G&&(R.diagnostics={runnable:Q,programLog:k,vertexShader:{log:F,prefix:m},fragmentShader:{log:z,prefix:p}})}i.deleteShader(C),i.deleteShader(I),w=new hr(i,A),_=kg(i,A)}let w;this.getUniforms=function(){return w===void 0&&T(this),w};let _;this.getAttributes=function(){return _===void 0&&T(this),_};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=i.getProgramParameter(A,Ig)),x},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(A),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Dg++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=C,this.fragmentShader=I,this}let Zg=0;class Jg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new $g(e),t.set(e,n)),n}}class $g{constructor(e){this.id=Zg++,this.code=e,this.usedTimes=0}}function eA(r,e,t,n,i,s,o){const a=new Aa,l=new Jg,c=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(_){return c.add(_),_===0?"uv":`uv${_}`}function m(_,x,R,k,F){const z=k.fog,Q=F.geometry,G=_.isMeshStandardMaterial?k.environment:null,K=(_.isMeshStandardMaterial?t:e).get(_.envMap||G),V=K&&K.mapping===Sr?K.image.height:null,te=g[_.type];_.precision!==null&&(f=i.getMaxPrecision(_.precision),f!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",f,"instead."));const ne=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,ye=ne!==void 0?ne.length:0;let Me=0;Q.morphAttributes.position!==void 0&&(Me=1),Q.morphAttributes.normal!==void 0&&(Me=2),Q.morphAttributes.color!==void 0&&(Me=3);let Ue,q,ee,me;if(te){const Ye=hn[te];Ue=Ye.vertexShader,q=Ye.fragmentShader}else Ue=_.vertexShader,q=_.fragmentShader,l.update(_),ee=l.getVertexShaderID(_),me=l.getFragmentShaderID(_);const re=r.getRenderTarget(),Se=r.state.buffers.depth.getReversed(),We=F.isInstancedMesh===!0,we=F.isBatchedMesh===!0,at=!!_.map,st=!!_.matcap,Oe=!!K,D=!!_.aoMap,It=!!_.lightMap,ke=!!_.bumpMap,He=!!_.normalMap,be=!!_.displacementMap,tt=!!_.emissiveMap,xe=!!_.metalnessMap,E=!!_.roughnessMap,b=_.anisotropy>0,N=_.clearcoat>0,j=_.dispersion>0,Z=_.iridescence>0,Y=_.sheen>0,Ae=_.transmission>0,oe=b&&!!_.anisotropyMap,he=N&&!!_.clearcoatMap,Ve=N&&!!_.clearcoatNormalMap,$=N&&!!_.clearcoatRoughnessMap,de=Z&&!!_.iridescenceMap,Ee=Z&&!!_.iridescenceThicknessMap,Ce=Y&&!!_.sheenColorMap,ue=Y&&!!_.sheenRoughnessMap,ze=!!_.specularMap,Pe=!!_.specularColorMap,$e=!!_.specularIntensityMap,L=Ae&&!!_.transmissionMap,ie=Ae&&!!_.thicknessMap,W=!!_.gradientMap,X=!!_.alphaMap,le=_.alphaTest>0,ae=!!_.alphaHash,Ie=!!_.extensions;let rt=Gn;_.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(rt=r.toneMapping);const ft={shaderID:te,shaderType:_.type,shaderName:_.name,vertexShader:Ue,fragmentShader:q,defines:_.defines,customVertexShaderID:ee,customFragmentShaderID:me,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:f,batching:we,batchingColor:we&&F._colorsTexture!==null,instancing:We,instancingColor:We&&F.instanceColor!==null,instancingMorph:We&&F.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:re===null?r.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:Mt,alphaToCoverage:!!_.alphaToCoverage,map:at,matcap:st,envMap:Oe,envMapMode:Oe&&K.mapping,envMapCubeUVHeight:V,aoMap:D,lightMap:It,bumpMap:ke,normalMap:He,displacementMap:u&&be,emissiveMap:tt,normalMapObjectSpace:He&&_.normalMapType===Wh,normalMapTangentSpace:He&&_.normalMapType===wc,metalnessMap:xe,roughnessMap:E,anisotropy:b,anisotropyMap:oe,clearcoat:N,clearcoatMap:he,clearcoatNormalMap:Ve,clearcoatRoughnessMap:$,dispersion:j,iridescence:Z,iridescenceMap:de,iridescenceThicknessMap:Ee,sheen:Y,sheenColorMap:Ce,sheenRoughnessMap:ue,specularMap:ze,specularColorMap:Pe,specularIntensityMap:$e,transmission:Ae,transmissionMap:L,thicknessMap:ie,gradientMap:W,opaque:_.transparent===!1&&_.blending===St&&_.alphaToCoverage===!1,alphaMap:X,alphaTest:le,alphaHash:ae,combine:_.combine,mapUv:at&&A(_.map.channel),aoMapUv:D&&A(_.aoMap.channel),lightMapUv:It&&A(_.lightMap.channel),bumpMapUv:ke&&A(_.bumpMap.channel),normalMapUv:He&&A(_.normalMap.channel),displacementMapUv:be&&A(_.displacementMap.channel),emissiveMapUv:tt&&A(_.emissiveMap.channel),metalnessMapUv:xe&&A(_.metalnessMap.channel),roughnessMapUv:E&&A(_.roughnessMap.channel),anisotropyMapUv:oe&&A(_.anisotropyMap.channel),clearcoatMapUv:he&&A(_.clearcoatMap.channel),clearcoatNormalMapUv:Ve&&A(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&A(_.clearcoatRoughnessMap.channel),iridescenceMapUv:de&&A(_.iridescenceMap.channel),iridescenceThicknessMapUv:Ee&&A(_.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&A(_.sheenColorMap.channel),sheenRoughnessMapUv:ue&&A(_.sheenRoughnessMap.channel),specularMapUv:ze&&A(_.specularMap.channel),specularColorMapUv:Pe&&A(_.specularColorMap.channel),specularIntensityMapUv:$e&&A(_.specularIntensityMap.channel),transmissionMapUv:L&&A(_.transmissionMap.channel),thicknessMapUv:ie&&A(_.thicknessMap.channel),alphaMapUv:X&&A(_.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(He||b),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!Q.attributes.uv&&(at||X),fog:!!z,useFog:_.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Se,skinning:F.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Me,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:r.shadowMap.enabled&&R.length>0,shadowMapType:r.shadowMap.type,toneMapping:rt,decodeVideoTexture:at&&_.map.isVideoTexture===!0&&Qe.getTransfer(_.map.colorSpace)===nt,decodeVideoTextureEmissive:tt&&_.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(_.emissiveMap.colorSpace)===nt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===ot,flipSided:_.side===Ct,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Ie&&_.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ie&&_.extensions.multiDraw===!0||we)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return ft.vertexUv1s=c.has(1),ft.vertexUv2s=c.has(2),ft.vertexUv3s=c.has(3),c.clear(),ft}function p(_){const x=[];if(_.shaderID?x.push(_.shaderID):(x.push(_.customVertexShaderID),x.push(_.customFragmentShaderID)),_.defines!==void 0)for(const R in _.defines)x.push(R),x.push(_.defines[R]);return _.isRawShaderMaterial===!1&&(v(x,_),M(x,_),x.push(r.outputColorSpace)),x.push(_.customProgramCacheKey),x.join()}function v(_,x){_.push(x.precision),_.push(x.outputColorSpace),_.push(x.envMapMode),_.push(x.envMapCubeUVHeight),_.push(x.mapUv),_.push(x.alphaMapUv),_.push(x.lightMapUv),_.push(x.aoMapUv),_.push(x.bumpMapUv),_.push(x.normalMapUv),_.push(x.displacementMapUv),_.push(x.emissiveMapUv),_.push(x.metalnessMapUv),_.push(x.roughnessMapUv),_.push(x.anisotropyMapUv),_.push(x.clearcoatMapUv),_.push(x.clearcoatNormalMapUv),_.push(x.clearcoatRoughnessMapUv),_.push(x.iridescenceMapUv),_.push(x.iridescenceThicknessMapUv),_.push(x.sheenColorMapUv),_.push(x.sheenRoughnessMapUv),_.push(x.specularMapUv),_.push(x.specularColorMapUv),_.push(x.specularIntensityMapUv),_.push(x.transmissionMapUv),_.push(x.thicknessMapUv),_.push(x.combine),_.push(x.fogExp2),_.push(x.sizeAttenuation),_.push(x.morphTargetsCount),_.push(x.morphAttributeCount),_.push(x.numDirLights),_.push(x.numPointLights),_.push(x.numSpotLights),_.push(x.numSpotLightMaps),_.push(x.numHemiLights),_.push(x.numRectAreaLights),_.push(x.numDirLightShadows),_.push(x.numPointLightShadows),_.push(x.numSpotLightShadows),_.push(x.numSpotLightShadowsWithMaps),_.push(x.numLightProbes),_.push(x.shadowMapType),_.push(x.toneMapping),_.push(x.numClippingPlanes),_.push(x.numClipIntersection),_.push(x.depthPacking)}function M(_,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),_.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),_.push(a.mask)}function y(_){const x=g[_.type];let R;if(x){const k=hn[x];R=kd.clone(k.uniforms)}else R=_.uniforms;return R}function C(_,x){let R;for(let k=0,F=h.length;k<F;k++){const z=h[k];if(z.cacheKey===x){R=z,++R.usedTimes;break}}return R===void 0&&(R=new Kg(r,x,_,s),h.push(R)),R}function I(_){if(--_.usedTimes===0){const x=h.indexOf(_);h[x]=h[h.length-1],h.pop(),_.destroy()}}function T(_){l.remove(_)}function w(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:C,releaseProgram:I,releaseShaderCache:T,programs:h,dispose:w}}function tA(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function nA(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Zl(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Jl(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(d,u,f,g,A,m){let p=r[e];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:A,group:m},r[e]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=A,p.group=m),e++,p}function a(d,u,f,g,A,m){const p=o(d,u,f,g,A,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(d,u,f,g,A,m){const p=o(d,u,f,g,A,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,u){t.length>1&&t.sort(d||nA),n.length>1&&n.sort(u||Zl),i.length>1&&i.sort(u||Zl)}function h(){for(let d=e,u=r.length;d<u;d++){const f=r[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function iA(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Jl,r.set(n,[o])):i>=s.length?(o=new Jl,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function sA(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new ge};break;case"SpotLight":t={position:new P,direction:new P,color:new ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new ge,groundColor:new ge};break;case"RectAreaLight":t={color:new ge,position:new P,halfWidth:new P,halfHeight:new P};break}return r[e.id]=t,t}}}function rA(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let oA=0;function aA(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function lA(r){const e=new sA,t=rA(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);const i=new P,s=new Le,o=new Le;function a(c){let h=0,d=0,u=0;for(let _=0;_<9;_++)n.probe[_].set(0,0,0);let f=0,g=0,A=0,m=0,p=0,v=0,M=0,y=0,C=0,I=0,T=0;c.sort(aA);for(let _=0,x=c.length;_<x;_++){const R=c[_],k=R.color,F=R.intensity,z=R.distance,Q=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=k.r*F,d+=k.g*F,u+=k.b*F;else if(R.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(R.sh.coefficients[G],F);T++}else if(R.isDirectionalLight){const G=e.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const K=R.shadow,V=t.get(R);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=Q,n.directionalShadowMatrix[f]=R.shadow.matrix,v++}n.directional[f]=G,f++}else if(R.isSpotLight){const G=e.get(R);G.position.setFromMatrixPosition(R.matrixWorld),G.color.copy(k).multiplyScalar(F),G.distance=z,G.coneCos=Math.cos(R.angle),G.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),G.decay=R.decay,n.spot[A]=G;const K=R.shadow;if(R.map&&(n.spotLightMap[C]=R.map,C++,K.updateMatrices(R),R.castShadow&&I++),n.spotLightMatrix[A]=K.matrix,R.castShadow){const V=t.get(R);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,n.spotShadow[A]=V,n.spotShadowMap[A]=Q,y++}A++}else if(R.isRectAreaLight){const G=e.get(R);G.color.copy(k).multiplyScalar(F),G.halfWidth.set(R.width*.5,0,0),G.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=G,m++}else if(R.isPointLight){const G=e.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),G.distance=R.distance,G.decay=R.decay,R.castShadow){const K=R.shadow,V=t.get(R);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,V.shadowCameraNear=K.camera.near,V.shadowCameraFar=K.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=Q,n.pointShadowMatrix[g]=R.shadow.matrix,M++}n.point[g]=G,g++}else if(R.isHemisphereLight){const G=e.get(R);G.skyColor.copy(R.color).multiplyScalar(F),G.groundColor.copy(R.groundColor).multiplyScalar(F),n.hemi[p]=G,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=se.LTC_FLOAT_1,n.rectAreaLTC2=se.LTC_FLOAT_2):(n.rectAreaLTC1=se.LTC_HALF_1,n.rectAreaLTC2=se.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const w=n.hash;(w.directionalLength!==f||w.pointLength!==g||w.spotLength!==A||w.rectAreaLength!==m||w.hemiLength!==p||w.numDirectionalShadows!==v||w.numPointShadows!==M||w.numSpotShadows!==y||w.numSpotMaps!==C||w.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=A,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=y+C-I,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=T,w.directionalLength=f,w.pointLength=g,w.spotLength=A,w.rectAreaLength=m,w.hemiLength=p,w.numDirectionalShadows=v,w.numPointShadows=M,w.numSpotShadows=y,w.numSpotMaps=C,w.numLightProbes=T,n.version=oA++)}function l(c,h){let d=0,u=0,f=0,g=0,A=0;const m=h.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){const M=c[p];if(M.isDirectionalLight){const y=n.directional[d];y.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),d++}else if(M.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),f++}else if(M.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),o.identity(),s.copy(M.matrixWorld),s.premultiply(m),o.extractRotation(s),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const y=n.point[u];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),u++}else if(M.isHemisphereLight){const y=n.hemi[A];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(m),A++}}}return{setup:a,setupView:l,state:n}}function $l(r){const e=new lA(r),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function cA(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new $l(r),e.set(i,[a])):s>=o.length?(a=new $l(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const hA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dA=`uniform sampler2D shadow_pass;
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
}`;function uA(r,e,t){let n=new va;const i=new Te,s=new Te,o=new Xe,a=new nu({depthPacking:Vh}),l=new iu,c={},h=t.maxTextureSize,d={[Tt]:Ct,[Ct]:Tt,[ot]:ot},u=new Vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Te},radius:{value:4}},vertexShader:hA,fragmentShader:dA}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new Nt;g.setAttribute("position",new _t(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new Gt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hc;let p=this.type;this.render=function(I,T,w){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||I.length===0)return;const _=r.getRenderTarget(),x=r.getActiveCubeFace(),R=r.getActiveMipmapLevel(),k=r.state;k.setBlending(zn),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const F=p!==Sn&&this.type===Sn,z=p===Sn&&this.type!==Sn;for(let Q=0,G=I.length;Q<G;Q++){const K=I[Q],V=K.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);const te=V.getFrameExtents();if(i.multiply(te),s.copy(V.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/te.x),i.x=s.x*te.x,V.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/te.y),i.y=s.y*te.y,V.mapSize.y=s.y)),V.map===null||F===!0||z===!0){const ye=this.type!==Sn?{minFilter:Ft,magFilter:Ft}:{};V.map!==null&&V.map.dispose(),V.map=new oi(i.x,i.y,ye),V.map.texture.name=K.name+".shadowMap",V.camera.updateProjectionMatrix()}r.setRenderTarget(V.map),r.clear();const ne=V.getViewportCount();for(let ye=0;ye<ne;ye++){const Me=V.getViewport(ye);o.set(s.x*Me.x,s.y*Me.y,s.x*Me.z,s.y*Me.w),k.viewport(o),V.updateMatrices(K,ye),n=V.getFrustum(),y(T,w,V.camera,K,this.type)}V.isPointLightShadow!==!0&&this.type===Sn&&v(V,w),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(_,x,R)};function v(I,T){const w=e.update(A);u.defines.VSM_SAMPLES!==I.blurSamples&&(u.defines.VSM_SAMPLES=I.blurSamples,f.defines.VSM_SAMPLES=I.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new oi(i.x,i.y)),u.uniforms.shadow_pass.value=I.map.texture,u.uniforms.resolution.value=I.mapSize,u.uniforms.radius.value=I.radius,r.setRenderTarget(I.mapPass),r.clear(),r.renderBufferDirect(T,null,w,u,A,null),f.uniforms.shadow_pass.value=I.mapPass.texture,f.uniforms.resolution.value=I.mapSize,f.uniforms.radius.value=I.radius,r.setRenderTarget(I.map),r.clear(),r.renderBufferDirect(T,null,w,f,A,null)}function M(I,T,w,_){let x=null;const R=w.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(R!==void 0)x=R;else if(x=w.isPointLight===!0?l:a,r.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const k=x.uuid,F=T.uuid;let z=c[k];z===void 0&&(z={},c[k]=z);let Q=z[F];Q===void 0&&(Q=x.clone(),z[F]=Q,T.addEventListener("dispose",C)),x=Q}if(x.visible=T.visible,x.wireframe=T.wireframe,_===Sn?x.side=T.shadowSide!==null?T.shadowSide:T.side:x.side=T.shadowSide!==null?T.shadowSide:d[T.side],x.alphaMap=T.alphaMap,x.alphaTest=T.alphaTest,x.map=T.map,x.clipShadows=T.clipShadows,x.clippingPlanes=T.clippingPlanes,x.clipIntersection=T.clipIntersection,x.displacementMap=T.displacementMap,x.displacementScale=T.displacementScale,x.displacementBias=T.displacementBias,x.wireframeLinewidth=T.wireframeLinewidth,x.linewidth=T.linewidth,w.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const k=r.properties.get(x);k.light=w}return x}function y(I,T,w,_,x){if(I.visible===!1)return;if(I.layers.test(T.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&x===Sn)&&(!I.frustumCulled||n.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,I.matrixWorld);const F=e.update(I),z=I.material;if(Array.isArray(z)){const Q=F.groups;for(let G=0,K=Q.length;G<K;G++){const V=Q[G],te=z[V.materialIndex];if(te&&te.visible){const ne=M(I,te,_,x);I.onBeforeShadow(r,I,T,w,F,ne,V),r.renderBufferDirect(w,null,F,ne,I,V),I.onAfterShadow(r,I,T,w,F,ne,V)}}}else if(z.visible){const Q=M(I,z,_,x);I.onBeforeShadow(r,I,T,w,F,Q,null),r.renderBufferDirect(w,null,F,Q,I,null),I.onAfterShadow(r,I,T,w,F,Q,null)}}const k=I.children;for(let F=0,z=k.length;F<z;F++)y(k[F],T,w,_,x)}function C(I){I.target.removeEventListener("dispose",C);for(const w in c){const _=c[w],x=I.target.uuid;x in _&&(_[x].dispose(),delete _[x])}}}const pA={[go]:Ao,[yo]:vo,[xo]:So,[Bi]:bo,[Ao]:go,[vo]:yo,[So]:xo,[bo]:Bi};function fA(r,e){function t(){let L=!1;const ie=new Xe;let W=null;const X=new Xe(0,0,0,0);return{setMask:function(le){W!==le&&!L&&(r.colorMask(le,le,le,le),W=le)},setLocked:function(le){L=le},setClear:function(le,ae,Ie,rt,ft){ft===!0&&(le*=rt,ae*=rt,Ie*=rt),ie.set(le,ae,Ie,rt),X.equals(ie)===!1&&(r.clearColor(le,ae,Ie,rt),X.copy(ie))},reset:function(){L=!1,W=null,X.set(-1,0,0,0)}}}function n(){let L=!1,ie=!1,W=null,X=null,le=null;return{setReversed:function(ae){if(ie!==ae){const Ie=e.get("EXT_clip_control");ie?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT);const rt=le;le=null,this.setClear(rt)}ie=ae},getReversed:function(){return ie},setTest:function(ae){ae?re(r.DEPTH_TEST):Se(r.DEPTH_TEST)},setMask:function(ae){W!==ae&&!L&&(r.depthMask(ae),W=ae)},setFunc:function(ae){if(ie&&(ae=pA[ae]),X!==ae){switch(ae){case go:r.depthFunc(r.NEVER);break;case Ao:r.depthFunc(r.ALWAYS);break;case yo:r.depthFunc(r.LESS);break;case Bi:r.depthFunc(r.LEQUAL);break;case xo:r.depthFunc(r.EQUAL);break;case bo:r.depthFunc(r.GEQUAL);break;case vo:r.depthFunc(r.GREATER);break;case So:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}X=ae}},setLocked:function(ae){L=ae},setClear:function(ae){le!==ae&&(ie&&(ae=1-ae),r.clearDepth(ae),le=ae)},reset:function(){L=!1,W=null,X=null,le=null,ie=!1}}}function i(){let L=!1,ie=null,W=null,X=null,le=null,ae=null,Ie=null,rt=null,ft=null;return{setTest:function(Ye){L||(Ye?re(r.STENCIL_TEST):Se(r.STENCIL_TEST))},setMask:function(Ye){ie!==Ye&&!L&&(r.stencilMask(Ye),ie=Ye)},setFunc:function(Ye,Ot,Yt){(W!==Ye||X!==Ot||le!==Yt)&&(r.stencilFunc(Ye,Ot,Yt),W=Ye,X=Ot,le=Yt)},setOp:function(Ye,Ot,Yt){(ae!==Ye||Ie!==Ot||rt!==Yt)&&(r.stencilOp(Ye,Ot,Yt),ae=Ye,Ie=Ot,rt=Yt)},setLocked:function(Ye){L=Ye},setClear:function(Ye){ft!==Ye&&(r.clearStencil(Ye),ft=Ye)},reset:function(){L=!1,ie=null,W=null,X=null,le=null,ae=null,Ie=null,rt=null,ft=null}}}const s=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,f=[],g=null,A=!1,m=null,p=null,v=null,M=null,y=null,C=null,I=null,T=new ge(0,0,0),w=0,_=!1,x=null,R=null,k=null,F=null,z=null;const Q=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,K=0;const V=r.getParameter(r.VERSION);V.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(V)[1]),G=K>=1):V.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),G=K>=2);let te=null,ne={};const ye=r.getParameter(r.SCISSOR_BOX),Me=r.getParameter(r.VIEWPORT),Ue=new Xe().fromArray(ye),q=new Xe().fromArray(Me);function ee(L,ie,W,X){const le=new Uint8Array(4),ae=r.createTexture();r.bindTexture(L,ae),r.texParameteri(L,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(L,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ie=0;Ie<W;Ie++)L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY?r.texImage3D(ie,0,r.RGBA,1,1,X,0,r.RGBA,r.UNSIGNED_BYTE,le):r.texImage2D(ie+Ie,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,le);return ae}const me={};me[r.TEXTURE_2D]=ee(r.TEXTURE_2D,r.TEXTURE_2D,1),me[r.TEXTURE_CUBE_MAP]=ee(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),me[r.TEXTURE_2D_ARRAY]=ee(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),me[r.TEXTURE_3D]=ee(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),re(r.DEPTH_TEST),o.setFunc(Bi),ke(!1),He(Na),re(r.CULL_FACE),D(zn);function re(L){h[L]!==!0&&(r.enable(L),h[L]=!0)}function Se(L){h[L]!==!1&&(r.disable(L),h[L]=!1)}function We(L,ie){return d[L]!==ie?(r.bindFramebuffer(L,ie),d[L]=ie,L===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=ie),L===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=ie),!0):!1}function we(L,ie){let W=f,X=!1;if(L){W=u.get(ie),W===void 0&&(W=[],u.set(ie,W));const le=L.textures;if(W.length!==le.length||W[0]!==r.COLOR_ATTACHMENT0){for(let ae=0,Ie=le.length;ae<Ie;ae++)W[ae]=r.COLOR_ATTACHMENT0+ae;W.length=le.length,X=!0}}else W[0]!==r.BACK&&(W[0]=r.BACK,X=!0);X&&r.drawBuffers(W)}function at(L){return g!==L?(r.useProgram(L),g=L,!0):!1}const st={[ti]:r.FUNC_ADD,[dh]:r.FUNC_SUBTRACT,[uh]:r.FUNC_REVERSE_SUBTRACT};st[ph]=r.MIN,st[fh]=r.MAX;const Oe={[mh]:r.ZERO,[gh]:r.ONE,[Ah]:r.SRC_COLOR,[fo]:r.SRC_ALPHA,[_h]:r.SRC_ALPHA_SATURATE,[vh]:r.DST_COLOR,[xh]:r.DST_ALPHA,[yh]:r.ONE_MINUS_SRC_COLOR,[mo]:r.ONE_MINUS_SRC_ALPHA,[Sh]:r.ONE_MINUS_DST_COLOR,[bh]:r.ONE_MINUS_DST_ALPHA,[Mh]:r.CONSTANT_COLOR,[Eh]:r.ONE_MINUS_CONSTANT_COLOR,[wh]:r.CONSTANT_ALPHA,[Th]:r.ONE_MINUS_CONSTANT_ALPHA};function D(L,ie,W,X,le,ae,Ie,rt,ft,Ye){if(L===zn){A===!0&&(Se(r.BLEND),A=!1);return}if(A===!1&&(re(r.BLEND),A=!0),L!==ir){if(L!==m||Ye!==_){if((p!==ti||y!==ti)&&(r.blendEquation(r.FUNC_ADD),p=ti,y=ti),Ye)switch(L){case St:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ur:r.blendFunc(r.ONE,r.ONE);break;case pr:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case fr:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case St:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ur:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case pr:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case fr:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}v=null,M=null,C=null,I=null,T.set(0,0,0),w=0,m=L,_=Ye}return}le=le||ie,ae=ae||W,Ie=Ie||X,(ie!==p||le!==y)&&(r.blendEquationSeparate(st[ie],st[le]),p=ie,y=le),(W!==v||X!==M||ae!==C||Ie!==I)&&(r.blendFuncSeparate(Oe[W],Oe[X],Oe[ae],Oe[Ie]),v=W,M=X,C=ae,I=Ie),(rt.equals(T)===!1||ft!==w)&&(r.blendColor(rt.r,rt.g,rt.b,ft),T.copy(rt),w=ft),m=L,_=!1}function It(L,ie){L.side===ot?Se(r.CULL_FACE):re(r.CULL_FACE);let W=L.side===Ct;ie&&(W=!W),ke(W),L.blending===St&&L.transparent===!1?D(zn):D(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),s.setMask(L.colorWrite);const X=L.stencilWrite;a.setTest(X),X&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),tt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?re(r.SAMPLE_ALPHA_TO_COVERAGE):Se(r.SAMPLE_ALPHA_TO_COVERAGE)}function ke(L){x!==L&&(L?r.frontFace(r.CW):r.frontFace(r.CCW),x=L)}function He(L){L!==ch?(re(r.CULL_FACE),L!==R&&(L===Na?r.cullFace(r.BACK):L===hh?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Se(r.CULL_FACE),R=L}function be(L){L!==k&&(G&&r.lineWidth(L),k=L)}function tt(L,ie,W){L?(re(r.POLYGON_OFFSET_FILL),(F!==ie||z!==W)&&(r.polygonOffset(ie,W),F=ie,z=W)):Se(r.POLYGON_OFFSET_FILL)}function xe(L){L?re(r.SCISSOR_TEST):Se(r.SCISSOR_TEST)}function E(L){L===void 0&&(L=r.TEXTURE0+Q-1),te!==L&&(r.activeTexture(L),te=L)}function b(L,ie,W){W===void 0&&(te===null?W=r.TEXTURE0+Q-1:W=te);let X=ne[W];X===void 0&&(X={type:void 0,texture:void 0},ne[W]=X),(X.type!==L||X.texture!==ie)&&(te!==W&&(r.activeTexture(W),te=W),r.bindTexture(L,ie||me[L]),X.type=L,X.texture=ie)}function N(){const L=ne[te];L!==void 0&&L.type!==void 0&&(r.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function j(){try{r.compressedTexImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{r.compressedTexImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Y(){try{r.texSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ae(){try{r.texSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function oe(){try{r.compressedTexSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function he(){try{r.compressedTexSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ve(){try{r.texStorage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function $(){try{r.texStorage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function de(){try{r.texImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ee(){try{r.texImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ce(L){Ue.equals(L)===!1&&(r.scissor(L.x,L.y,L.z,L.w),Ue.copy(L))}function ue(L){q.equals(L)===!1&&(r.viewport(L.x,L.y,L.z,L.w),q.copy(L))}function ze(L,ie){let W=c.get(ie);W===void 0&&(W=new WeakMap,c.set(ie,W));let X=W.get(L);X===void 0&&(X=r.getUniformBlockIndex(ie,L.name),W.set(L,X))}function Pe(L,ie){const X=c.get(ie).get(L);l.get(ie)!==X&&(r.uniformBlockBinding(ie,X,L.__bindingPointIndex),l.set(ie,X))}function $e(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},te=null,ne={},d={},u=new WeakMap,f=[],g=null,A=!1,m=null,p=null,v=null,M=null,y=null,C=null,I=null,T=new ge(0,0,0),w=0,_=!1,x=null,R=null,k=null,F=null,z=null,Ue.set(0,0,r.canvas.width,r.canvas.height),q.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:re,disable:Se,bindFramebuffer:We,drawBuffers:we,useProgram:at,setBlending:D,setMaterial:It,setFlipSided:ke,setCullFace:He,setLineWidth:be,setPolygonOffset:tt,setScissorTest:xe,activeTexture:E,bindTexture:b,unbindTexture:N,compressedTexImage2D:j,compressedTexImage3D:Z,texImage2D:de,texImage3D:Ee,updateUBOMapping:ze,uniformBlockBinding:Pe,texStorage2D:Ve,texStorage3D:$,texSubImage2D:Y,texSubImage3D:Ae,compressedTexSubImage2D:oe,compressedTexSubImage3D:he,scissor:Ce,viewport:ue,reset:$e}}function mA(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Te,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,b){return f?new OffscreenCanvas(E,b):As("canvas")}function A(E,b,N){let j=1;const Z=xe(E);if((Z.width>N||Z.height>N)&&(j=N/Math.max(Z.width,Z.height)),j<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const Y=Math.floor(j*Z.width),Ae=Math.floor(j*Z.height);d===void 0&&(d=g(Y,Ae));const oe=b?g(Y,Ae):d;return oe.width=Y,oe.height=Ae,oe.getContext("2d").drawImage(E,0,0,Y,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+Y+"x"+Ae+")."),oe}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),E;return E}function m(E){return E.generateMipmaps}function p(E){r.generateMipmap(E)}function v(E){return E.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?r.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function M(E,b,N,j,Z=!1){if(E!==null){if(r[E]!==void 0)return r[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Y=b;if(b===r.RED&&(N===r.FLOAT&&(Y=r.R32F),N===r.HALF_FLOAT&&(Y=r.R16F),N===r.UNSIGNED_BYTE&&(Y=r.R8)),b===r.RED_INTEGER&&(N===r.UNSIGNED_BYTE&&(Y=r.R8UI),N===r.UNSIGNED_SHORT&&(Y=r.R16UI),N===r.UNSIGNED_INT&&(Y=r.R32UI),N===r.BYTE&&(Y=r.R8I),N===r.SHORT&&(Y=r.R16I),N===r.INT&&(Y=r.R32I)),b===r.RG&&(N===r.FLOAT&&(Y=r.RG32F),N===r.HALF_FLOAT&&(Y=r.RG16F),N===r.UNSIGNED_BYTE&&(Y=r.RG8)),b===r.RG_INTEGER&&(N===r.UNSIGNED_BYTE&&(Y=r.RG8UI),N===r.UNSIGNED_SHORT&&(Y=r.RG16UI),N===r.UNSIGNED_INT&&(Y=r.RG32UI),N===r.BYTE&&(Y=r.RG8I),N===r.SHORT&&(Y=r.RG16I),N===r.INT&&(Y=r.RG32I)),b===r.RGB_INTEGER&&(N===r.UNSIGNED_BYTE&&(Y=r.RGB8UI),N===r.UNSIGNED_SHORT&&(Y=r.RGB16UI),N===r.UNSIGNED_INT&&(Y=r.RGB32UI),N===r.BYTE&&(Y=r.RGB8I),N===r.SHORT&&(Y=r.RGB16I),N===r.INT&&(Y=r.RGB32I)),b===r.RGBA_INTEGER&&(N===r.UNSIGNED_BYTE&&(Y=r.RGBA8UI),N===r.UNSIGNED_SHORT&&(Y=r.RGBA16UI),N===r.UNSIGNED_INT&&(Y=r.RGBA32UI),N===r.BYTE&&(Y=r.RGBA8I),N===r.SHORT&&(Y=r.RGBA16I),N===r.INT&&(Y=r.RGBA32I)),b===r.RGB&&N===r.UNSIGNED_INT_5_9_9_9_REV&&(Y=r.RGB9_E5),b===r.RGBA){const Ae=Z?yr:Qe.getTransfer(j);N===r.FLOAT&&(Y=r.RGBA32F),N===r.HALF_FLOAT&&(Y=r.RGBA16F),N===r.UNSIGNED_BYTE&&(Y=Ae===nt?r.SRGB8_ALPHA8:r.RGBA8),N===r.UNSIGNED_SHORT_4_4_4_4&&(Y=r.RGBA4),N===r.UNSIGNED_SHORT_5_5_5_1&&(Y=r.RGB5_A1)}return(Y===r.R16F||Y===r.R32F||Y===r.RG16F||Y===r.RG32F||Y===r.RGBA16F||Y===r.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function y(E,b){let N;return E?b===null||b===ri||b===Oi?N=r.DEPTH24_STENCIL8:b===zt?N=r.DEPTH32F_STENCIL8:b===fs&&(N=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===ri||b===Oi?N=r.DEPTH_COMPONENT24:b===zt?N=r.DEPTH_COMPONENT32F:b===fs&&(N=r.DEPTH_COMPONENT16),N}function C(E,b){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==Ft&&E.minFilter!==ct?Math.log2(Math.max(b.width,b.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?b.mipmaps.length:1}function I(E){const b=E.target;b.removeEventListener("dispose",I),w(b),b.isVideoTexture&&h.delete(b)}function T(E){const b=E.target;b.removeEventListener("dispose",T),x(b)}function w(E){const b=n.get(E);if(b.__webglInit===void 0)return;const N=E.source,j=u.get(N);if(j){const Z=j[b.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&_(E),Object.keys(j).length===0&&u.delete(N)}n.remove(E)}function _(E){const b=n.get(E);r.deleteTexture(b.__webglTexture);const N=E.source,j=u.get(N);delete j[b.__cacheKey],o.memory.textures--}function x(E){const b=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(b.__webglFramebuffer[j]))for(let Z=0;Z<b.__webglFramebuffer[j].length;Z++)r.deleteFramebuffer(b.__webglFramebuffer[j][Z]);else r.deleteFramebuffer(b.__webglFramebuffer[j]);b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer[j])}else{if(Array.isArray(b.__webglFramebuffer))for(let j=0;j<b.__webglFramebuffer.length;j++)r.deleteFramebuffer(b.__webglFramebuffer[j]);else r.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&r.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let j=0;j<b.__webglColorRenderbuffer.length;j++)b.__webglColorRenderbuffer[j]&&r.deleteRenderbuffer(b.__webglColorRenderbuffer[j]);b.__webglDepthRenderbuffer&&r.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const N=E.textures;for(let j=0,Z=N.length;j<Z;j++){const Y=n.get(N[j]);Y.__webglTexture&&(r.deleteTexture(Y.__webglTexture),o.memory.textures--),n.remove(N[j])}n.remove(E)}let R=0;function k(){R=0}function F(){const E=R;return E>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+i.maxTextures),R+=1,E}function z(E){const b=[];return b.push(E.wrapS),b.push(E.wrapT),b.push(E.wrapR||0),b.push(E.magFilter),b.push(E.minFilter),b.push(E.anisotropy),b.push(E.internalFormat),b.push(E.format),b.push(E.type),b.push(E.generateMipmaps),b.push(E.premultiplyAlpha),b.push(E.flipY),b.push(E.unpackAlignment),b.push(E.colorSpace),b.join()}function Q(E,b){const N=n.get(E);if(E.isVideoTexture&&be(E),E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){const j=E.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(N,E,b);return}}t.bindTexture(r.TEXTURE_2D,N.__webglTexture,r.TEXTURE0+b)}function G(E,b){const N=n.get(E);if(E.version>0&&N.__version!==E.version){q(N,E,b);return}t.bindTexture(r.TEXTURE_2D_ARRAY,N.__webglTexture,r.TEXTURE0+b)}function K(E,b){const N=n.get(E);if(E.version>0&&N.__version!==E.version){q(N,E,b);return}t.bindTexture(r.TEXTURE_3D,N.__webglTexture,r.TEXTURE0+b)}function V(E,b){const N=n.get(E);if(E.version>0&&N.__version!==E.version){ee(N,E,b);return}t.bindTexture(r.TEXTURE_CUBE_MAP,N.__webglTexture,r.TEXTURE0+b)}const te={[Ni]:r.REPEAT,[Jt]:r.CLAMP_TO_EDGE,[gr]:r.MIRRORED_REPEAT},ne={[Ft]:r.NEAREST,[mc]:r.NEAREST_MIPMAP_NEAREST,[cs]:r.NEAREST_MIPMAP_LINEAR,[ct]:r.LINEAR,[sr]:r.LINEAR_MIPMAP_NEAREST,[dn]:r.LINEAR_MIPMAP_LINEAR},ye={[Qh]:r.NEVER,[Zh]:r.ALWAYS,[qh]:r.LESS,[Tc]:r.LEQUAL,[Yh]:r.EQUAL,[Kh]:r.GEQUAL,[jh]:r.GREATER,[Xh]:r.NOTEQUAL};function Me(E,b){if(b.type===zt&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===ct||b.magFilter===sr||b.magFilter===cs||b.magFilter===dn||b.minFilter===ct||b.minFilter===sr||b.minFilter===cs||b.minFilter===dn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(E,r.TEXTURE_WRAP_S,te[b.wrapS]),r.texParameteri(E,r.TEXTURE_WRAP_T,te[b.wrapT]),(E===r.TEXTURE_3D||E===r.TEXTURE_2D_ARRAY)&&r.texParameteri(E,r.TEXTURE_WRAP_R,te[b.wrapR]),r.texParameteri(E,r.TEXTURE_MAG_FILTER,ne[b.magFilter]),r.texParameteri(E,r.TEXTURE_MIN_FILTER,ne[b.minFilter]),b.compareFunction&&(r.texParameteri(E,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(E,r.TEXTURE_COMPARE_FUNC,ye[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ft||b.minFilter!==cs&&b.minFilter!==dn||b.type===zt&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");r.texParameterf(E,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Ue(E,b){let N=!1;E.__webglInit===void 0&&(E.__webglInit=!0,b.addEventListener("dispose",I));const j=b.source;let Z=u.get(j);Z===void 0&&(Z={},u.set(j,Z));const Y=z(b);if(Y!==E.__cacheKey){Z[Y]===void 0&&(Z[Y]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,N=!0),Z[Y].usedTimes++;const Ae=Z[E.__cacheKey];Ae!==void 0&&(Z[E.__cacheKey].usedTimes--,Ae.usedTimes===0&&_(b)),E.__cacheKey=Y,E.__webglTexture=Z[Y].texture}return N}function q(E,b,N){let j=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(j=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(j=r.TEXTURE_3D);const Z=Ue(E,b),Y=b.source;t.bindTexture(j,E.__webglTexture,r.TEXTURE0+N);const Ae=n.get(Y);if(Y.version!==Ae.__version||Z===!0){t.activeTexture(r.TEXTURE0+N);const oe=Qe.getPrimaries(Qe.workingColorSpace),he=b.colorSpace===Hn?null:Qe.getPrimaries(b.colorSpace),Ve=b.colorSpace===Hn||oe===he?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ve);let $=A(b.image,!1,i.maxTextureSize);$=tt(b,$);const de=s.convert(b.format,b.colorSpace),Ee=s.convert(b.type);let Ce=M(b.internalFormat,de,Ee,b.colorSpace,b.isVideoTexture);Me(j,b);let ue;const ze=b.mipmaps,Pe=b.isVideoTexture!==!0,$e=Ae.__version===void 0||Z===!0,L=Y.dataReady,ie=C(b,$);if(b.isDepthTexture)Ce=y(b.format===ki,b.type),$e&&(Pe?t.texStorage2D(r.TEXTURE_2D,1,Ce,$.width,$.height):t.texImage2D(r.TEXTURE_2D,0,Ce,$.width,$.height,0,de,Ee,null));else if(b.isDataTexture)if(ze.length>0){Pe&&$e&&t.texStorage2D(r.TEXTURE_2D,ie,Ce,ze[0].width,ze[0].height);for(let W=0,X=ze.length;W<X;W++)ue=ze[W],Pe?L&&t.texSubImage2D(r.TEXTURE_2D,W,0,0,ue.width,ue.height,de,Ee,ue.data):t.texImage2D(r.TEXTURE_2D,W,Ce,ue.width,ue.height,0,de,Ee,ue.data);b.generateMipmaps=!1}else Pe?($e&&t.texStorage2D(r.TEXTURE_2D,ie,Ce,$.width,$.height),L&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,$.width,$.height,de,Ee,$.data)):t.texImage2D(r.TEXTURE_2D,0,Ce,$.width,$.height,0,de,Ee,$.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Pe&&$e&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ie,Ce,ze[0].width,ze[0].height,$.depth);for(let W=0,X=ze.length;W<X;W++)if(ue=ze[W],b.format!==$t)if(de!==null)if(Pe){if(L)if(b.layerUpdates.size>0){const le=Rl(ue.width,ue.height,b.format,b.type);for(const ae of b.layerUpdates){const Ie=ue.data.subarray(ae*le/ue.data.BYTES_PER_ELEMENT,(ae+1)*le/ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,ae,ue.width,ue.height,1,de,Ie)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,0,ue.width,ue.height,$.depth,de,ue.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,W,Ce,ue.width,ue.height,$.depth,0,ue.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Pe?L&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,0,ue.width,ue.height,$.depth,de,Ee,ue.data):t.texImage3D(r.TEXTURE_2D_ARRAY,W,Ce,ue.width,ue.height,$.depth,0,de,Ee,ue.data)}else{Pe&&$e&&t.texStorage2D(r.TEXTURE_2D,ie,Ce,ze[0].width,ze[0].height);for(let W=0,X=ze.length;W<X;W++)ue=ze[W],b.format!==$t?de!==null?Pe?L&&t.compressedTexSubImage2D(r.TEXTURE_2D,W,0,0,ue.width,ue.height,de,ue.data):t.compressedTexImage2D(r.TEXTURE_2D,W,Ce,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pe?L&&t.texSubImage2D(r.TEXTURE_2D,W,0,0,ue.width,ue.height,de,Ee,ue.data):t.texImage2D(r.TEXTURE_2D,W,Ce,ue.width,ue.height,0,de,Ee,ue.data)}else if(b.isDataArrayTexture)if(Pe){if($e&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ie,Ce,$.width,$.height,$.depth),L)if(b.layerUpdates.size>0){const W=Rl($.width,$.height,b.format,b.type);for(const X of b.layerUpdates){const le=$.data.subarray(X*W/$.data.BYTES_PER_ELEMENT,(X+1)*W/$.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,X,$.width,$.height,1,de,Ee,le)}b.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,de,Ee,$.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ce,$.width,$.height,$.depth,0,de,Ee,$.data);else if(b.isData3DTexture)Pe?($e&&t.texStorage3D(r.TEXTURE_3D,ie,Ce,$.width,$.height,$.depth),L&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,de,Ee,$.data)):t.texImage3D(r.TEXTURE_3D,0,Ce,$.width,$.height,$.depth,0,de,Ee,$.data);else if(b.isFramebufferTexture){if($e)if(Pe)t.texStorage2D(r.TEXTURE_2D,ie,Ce,$.width,$.height);else{let W=$.width,X=$.height;for(let le=0;le<ie;le++)t.texImage2D(r.TEXTURE_2D,le,Ce,W,X,0,de,Ee,null),W>>=1,X>>=1}}else if(ze.length>0){if(Pe&&$e){const W=xe(ze[0]);t.texStorage2D(r.TEXTURE_2D,ie,Ce,W.width,W.height)}for(let W=0,X=ze.length;W<X;W++)ue=ze[W],Pe?L&&t.texSubImage2D(r.TEXTURE_2D,W,0,0,de,Ee,ue):t.texImage2D(r.TEXTURE_2D,W,Ce,de,Ee,ue);b.generateMipmaps=!1}else if(Pe){if($e){const W=xe($);t.texStorage2D(r.TEXTURE_2D,ie,Ce,W.width,W.height)}L&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,de,Ee,$)}else t.texImage2D(r.TEXTURE_2D,0,Ce,de,Ee,$);m(b)&&p(j),Ae.__version=Y.version,b.onUpdate&&b.onUpdate(b)}E.__version=b.version}function ee(E,b,N){if(b.image.length!==6)return;const j=Ue(E,b),Z=b.source;t.bindTexture(r.TEXTURE_CUBE_MAP,E.__webglTexture,r.TEXTURE0+N);const Y=n.get(Z);if(Z.version!==Y.__version||j===!0){t.activeTexture(r.TEXTURE0+N);const Ae=Qe.getPrimaries(Qe.workingColorSpace),oe=b.colorSpace===Hn?null:Qe.getPrimaries(b.colorSpace),he=b.colorSpace===Hn||Ae===oe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const Ve=b.isCompressedTexture||b.image[0].isCompressedTexture,$=b.image[0]&&b.image[0].isDataTexture,de=[];for(let X=0;X<6;X++)!Ve&&!$?de[X]=A(b.image[X],!0,i.maxCubemapSize):de[X]=$?b.image[X].image:b.image[X],de[X]=tt(b,de[X]);const Ee=de[0],Ce=s.convert(b.format,b.colorSpace),ue=s.convert(b.type),ze=M(b.internalFormat,Ce,ue,b.colorSpace),Pe=b.isVideoTexture!==!0,$e=Y.__version===void 0||j===!0,L=Z.dataReady;let ie=C(b,Ee);Me(r.TEXTURE_CUBE_MAP,b);let W;if(Ve){Pe&&$e&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ie,ze,Ee.width,Ee.height);for(let X=0;X<6;X++){W=de[X].mipmaps;for(let le=0;le<W.length;le++){const ae=W[le];b.format!==$t?Ce!==null?Pe?L&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,le,0,0,ae.width,ae.height,Ce,ae.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,le,ze,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pe?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,le,0,0,ae.width,ae.height,Ce,ue,ae.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,le,ze,ae.width,ae.height,0,Ce,ue,ae.data)}}}else{if(W=b.mipmaps,Pe&&$e){W.length>0&&ie++;const X=xe(de[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,ie,ze,X.width,X.height)}for(let X=0;X<6;X++)if($){Pe?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,de[X].width,de[X].height,Ce,ue,de[X].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,ze,de[X].width,de[X].height,0,Ce,ue,de[X].data);for(let le=0;le<W.length;le++){const Ie=W[le].image[X].image;Pe?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,le+1,0,0,Ie.width,Ie.height,Ce,ue,Ie.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,le+1,ze,Ie.width,Ie.height,0,Ce,ue,Ie.data)}}else{Pe?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,Ce,ue,de[X]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,ze,Ce,ue,de[X]);for(let le=0;le<W.length;le++){const ae=W[le];Pe?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,le+1,0,0,Ce,ue,ae.image[X]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,le+1,ze,Ce,ue,ae.image[X])}}}m(b)&&p(r.TEXTURE_CUBE_MAP),Y.__version=Z.version,b.onUpdate&&b.onUpdate(b)}E.__version=b.version}function me(E,b,N,j,Z,Y){const Ae=s.convert(N.format,N.colorSpace),oe=s.convert(N.type),he=M(N.internalFormat,Ae,oe,N.colorSpace),Ve=n.get(b),$=n.get(N);if($.__renderTarget=b,!Ve.__hasExternalTextures){const de=Math.max(1,b.width>>Y),Ee=Math.max(1,b.height>>Y);Z===r.TEXTURE_3D||Z===r.TEXTURE_2D_ARRAY?t.texImage3D(Z,Y,he,de,Ee,b.depth,0,Ae,oe,null):t.texImage2D(Z,Y,he,de,Ee,0,Ae,oe,null)}t.bindFramebuffer(r.FRAMEBUFFER,E),He(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,j,Z,$.__webglTexture,0,ke(b)):(Z===r.TEXTURE_2D||Z>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,j,Z,$.__webglTexture,Y),t.bindFramebuffer(r.FRAMEBUFFER,null)}function re(E,b,N){if(r.bindRenderbuffer(r.RENDERBUFFER,E),b.depthBuffer){const j=b.depthTexture,Z=j&&j.isDepthTexture?j.type:null,Y=y(b.stencilBuffer,Z),Ae=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,oe=ke(b);He(b)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,oe,Y,b.width,b.height):N?r.renderbufferStorageMultisample(r.RENDERBUFFER,oe,Y,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,Y,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ae,r.RENDERBUFFER,E)}else{const j=b.textures;for(let Z=0;Z<j.length;Z++){const Y=j[Z],Ae=s.convert(Y.format,Y.colorSpace),oe=s.convert(Y.type),he=M(Y.internalFormat,Ae,oe,Y.colorSpace),Ve=ke(b);N&&He(b)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ve,he,b.width,b.height):He(b)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ve,he,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,he,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Se(E,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,E),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(b.depthTexture);j.__renderTarget=b,(!j.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),Q(b.depthTexture,0);const Z=j.__webglTexture,Y=ke(b);if(b.depthTexture.format===Ii)He(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Z,0,Y):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Z,0);else if(b.depthTexture.format===ki)He(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Z,0,Y):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function We(E){const b=n.get(E),N=E.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==E.depthTexture){const j=E.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),j){const Z=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,j.removeEventListener("dispose",Z)};j.addEventListener("dispose",Z),b.__depthDisposeCallback=Z}b.__boundDepthTexture=j}if(E.depthTexture&&!b.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Se(b.__webglFramebuffer,E)}else if(N){b.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[j]),b.__webglDepthbuffer[j]===void 0)b.__webglDepthbuffer[j]=r.createRenderbuffer(),re(b.__webglDepthbuffer[j],E,!1);else{const Z=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Y=b.__webglDepthbuffer[j];r.bindRenderbuffer(r.RENDERBUFFER,Y),r.framebufferRenderbuffer(r.FRAMEBUFFER,Z,r.RENDERBUFFER,Y)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=r.createRenderbuffer(),re(b.__webglDepthbuffer,E,!1);else{const j=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Z=b.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Z),r.framebufferRenderbuffer(r.FRAMEBUFFER,j,r.RENDERBUFFER,Z)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function we(E,b,N){const j=n.get(E);b!==void 0&&me(j.__webglFramebuffer,E,E.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),N!==void 0&&We(E)}function at(E){const b=E.texture,N=n.get(E),j=n.get(b);E.addEventListener("dispose",T);const Z=E.textures,Y=E.isWebGLCubeRenderTarget===!0,Ae=Z.length>1;if(Ae||(j.__webglTexture===void 0&&(j.__webglTexture=r.createTexture()),j.__version=b.version,o.memory.textures++),Y){N.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(b.mipmaps&&b.mipmaps.length>0){N.__webglFramebuffer[oe]=[];for(let he=0;he<b.mipmaps.length;he++)N.__webglFramebuffer[oe][he]=r.createFramebuffer()}else N.__webglFramebuffer[oe]=r.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){N.__webglFramebuffer=[];for(let oe=0;oe<b.mipmaps.length;oe++)N.__webglFramebuffer[oe]=r.createFramebuffer()}else N.__webglFramebuffer=r.createFramebuffer();if(Ae)for(let oe=0,he=Z.length;oe<he;oe++){const Ve=n.get(Z[oe]);Ve.__webglTexture===void 0&&(Ve.__webglTexture=r.createTexture(),o.memory.textures++)}if(E.samples>0&&He(E)===!1){N.__webglMultisampledFramebuffer=r.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let oe=0;oe<Z.length;oe++){const he=Z[oe];N.__webglColorRenderbuffer[oe]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,N.__webglColorRenderbuffer[oe]);const Ve=s.convert(he.format,he.colorSpace),$=s.convert(he.type),de=M(he.internalFormat,Ve,$,he.colorSpace,E.isXRRenderTarget===!0),Ee=ke(E);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ee,de,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+oe,r.RENDERBUFFER,N.__webglColorRenderbuffer[oe])}r.bindRenderbuffer(r.RENDERBUFFER,null),E.depthBuffer&&(N.__webglDepthRenderbuffer=r.createRenderbuffer(),re(N.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Y){t.bindTexture(r.TEXTURE_CUBE_MAP,j.__webglTexture),Me(r.TEXTURE_CUBE_MAP,b);for(let oe=0;oe<6;oe++)if(b.mipmaps&&b.mipmaps.length>0)for(let he=0;he<b.mipmaps.length;he++)me(N.__webglFramebuffer[oe][he],E,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,he);else me(N.__webglFramebuffer[oe],E,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);m(b)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let oe=0,he=Z.length;oe<he;oe++){const Ve=Z[oe],$=n.get(Ve);t.bindTexture(r.TEXTURE_2D,$.__webglTexture),Me(r.TEXTURE_2D,Ve),me(N.__webglFramebuffer,E,Ve,r.COLOR_ATTACHMENT0+oe,r.TEXTURE_2D,0),m(Ve)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let oe=r.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(oe=E.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(oe,j.__webglTexture),Me(oe,b),b.mipmaps&&b.mipmaps.length>0)for(let he=0;he<b.mipmaps.length;he++)me(N.__webglFramebuffer[he],E,b,r.COLOR_ATTACHMENT0,oe,he);else me(N.__webglFramebuffer,E,b,r.COLOR_ATTACHMENT0,oe,0);m(b)&&p(oe),t.unbindTexture()}E.depthBuffer&&We(E)}function st(E){const b=E.textures;for(let N=0,j=b.length;N<j;N++){const Z=b[N];if(m(Z)){const Y=v(E),Ae=n.get(Z).__webglTexture;t.bindTexture(Y,Ae),p(Y),t.unbindTexture()}}}const Oe=[],D=[];function It(E){if(E.samples>0){if(He(E)===!1){const b=E.textures,N=E.width,j=E.height;let Z=r.COLOR_BUFFER_BIT;const Y=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ae=n.get(E),oe=b.length>1;if(oe)for(let he=0;he<b.length;he++)t.bindFramebuffer(r.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+he,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Ae.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+he,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let he=0;he<b.length;he++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Z|=r.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Z|=r.STENCIL_BUFFER_BIT)),oe){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ae.__webglColorRenderbuffer[he]);const Ve=n.get(b[he]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ve,0)}r.blitFramebuffer(0,0,N,j,0,0,N,j,Z,r.NEAREST),l===!0&&(Oe.length=0,D.length=0,Oe.push(r.COLOR_ATTACHMENT0+he),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Oe.push(Y),D.push(Y),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,D)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Oe))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),oe)for(let he=0;he<b.length;he++){t.bindFramebuffer(r.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+he,r.RENDERBUFFER,Ae.__webglColorRenderbuffer[he]);const Ve=n.get(b[he]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Ae.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+he,r.TEXTURE_2D,Ve,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const b=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[b])}}}function ke(E){return Math.min(i.maxSamples,E.samples)}function He(E){const b=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function be(E){const b=o.render.frame;h.get(E)!==b&&(h.set(E,b),E.update())}function tt(E,b){const N=E.colorSpace,j=E.format,Z=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||N!==Mt&&N!==Hn&&(Qe.getTransfer(N)===nt?(j!==$t||Z!==In)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),b}function xe(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=k,this.setTexture2D=Q,this.setTexture2DArray=G,this.setTexture3D=K,this.setTextureCube=V,this.rebindTextures=we,this.setupRenderTarget=at,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=me,this.useMultisampledRTT=He}function gA(r,e){function t(n,i=Hn){let s;const o=Qe.getTransfer(i);if(n===In)return r.UNSIGNED_BYTE;if(n===la)return r.UNSIGNED_SHORT_4_4_4_4;if(n===ca)return r.UNSIGNED_SHORT_5_5_5_1;if(n===yc)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===gc)return r.BYTE;if(n===Ac)return r.SHORT;if(n===fs)return r.UNSIGNED_SHORT;if(n===aa)return r.INT;if(n===ri)return r.UNSIGNED_INT;if(n===zt)return r.FLOAT;if(n===En)return r.HALF_FLOAT;if(n===xc)return r.ALPHA;if(n===bc)return r.RGB;if(n===$t)return r.RGBA;if(n===vc)return r.LUMINANCE;if(n===Sc)return r.LUMINANCE_ALPHA;if(n===Ii)return r.DEPTH_COMPONENT;if(n===ki)return r.DEPTH_STENCIL;if(n===ha)return r.RED;if(n===da)return r.RED_INTEGER;if(n===_c)return r.RG;if(n===ua)return r.RG_INTEGER;if(n===pa)return r.RGBA_INTEGER;if(n===rr||n===or||n===ar||n===lr)if(o===nt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===rr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===or)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ar)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===lr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===rr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===or)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ar)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===lr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Mo||n===Eo||n===wo||n===To)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Mo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Eo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===wo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===To)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Co||n===Ro||n===Io)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Co||n===Ro)return o===nt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Io)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Do||n===Po||n===Lo||n===Bo||n===Uo||n===Fo||n===No||n===Oo||n===ko||n===Ho||n===zo||n===Go||n===Vo||n===Wo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Do)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Po)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Lo)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Bo)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Uo)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Fo)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===No)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Oo)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ko)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ho)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===zo)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Go)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Vo)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wo)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===cr||n===Qo||n===qo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===cr)return o===nt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Qo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===qo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Mc||n===Yo||n===jo||n===Xo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===cr)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Yo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===jo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Xo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Oi?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const AA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,yA=`
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

}`;class xA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new At,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Vn({vertexShader:AA,fragmentShader:yA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Gt(new vs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class bA extends Wn{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null;const A=new xA,m=t.getContextAttributes();let p=null,v=null;const M=[],y=[],C=new Te;let I=null;const T=new Bt;T.viewport=new Xe;const w=new Bt;w.viewport=new Xe;const _=[T,w],x=new _u;let R=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ee=M[q];return ee===void 0&&(ee=new jr,M[q]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(q){let ee=M[q];return ee===void 0&&(ee=new jr,M[q]=ee),ee.getGripSpace()},this.getHand=function(q){let ee=M[q];return ee===void 0&&(ee=new jr,M[q]=ee),ee.getHandSpace()};function F(q){const ee=y.indexOf(q.inputSource);if(ee===-1)return;const me=M[ee];me!==void 0&&(me.update(q.inputSource,q.frame,c||o),me.dispatchEvent({type:q.type,data:q.inputSource}))}function z(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",z),i.removeEventListener("inputsourceschange",Q);for(let q=0;q<M.length;q++){const ee=y[q];ee!==null&&(y[q]=null,M[q].disconnect(ee))}R=null,k=null,A.reset(),e.setRenderTarget(p),f=null,u=null,d=null,i=null,v=null,Ue.stop(),n.isPresenting=!1,e.setPixelRatio(I),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",z),i.addEventListener("inputsourceschange",Q),m.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(C),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,re=null,Se=null;m.depth&&(Se=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=m.stencil?ki:Ii,re=m.stencil?Oi:ri);const We={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:s};d=new XRWebGLBinding(i,t),u=d.createProjectionLayer(We),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),v=new oi(u.textureWidth,u.textureHeight,{format:$t,type:In,depthTexture:new Hc(u.textureWidth,u.textureHeight,re,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const me={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,me),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new oi(f.framebufferWidth,f.framebufferHeight,{format:$t,type:In,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Ue.setContext(i),Ue.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return A.getDepthTexture()};function Q(q){for(let ee=0;ee<q.removed.length;ee++){const me=q.removed[ee],re=y.indexOf(me);re>=0&&(y[re]=null,M[re].disconnect(me))}for(let ee=0;ee<q.added.length;ee++){const me=q.added[ee];let re=y.indexOf(me);if(re===-1){for(let We=0;We<M.length;We++)if(We>=y.length){y.push(me),re=We;break}else if(y[We]===null){y[We]=me,re=We;break}if(re===-1)break}const Se=M[re];Se&&Se.connect(me)}}const G=new P,K=new P;function V(q,ee,me){G.setFromMatrixPosition(ee.matrixWorld),K.setFromMatrixPosition(me.matrixWorld);const re=G.distanceTo(K),Se=ee.projectionMatrix.elements,We=me.projectionMatrix.elements,we=Se[14]/(Se[10]-1),at=Se[14]/(Se[10]+1),st=(Se[9]+1)/Se[5],Oe=(Se[9]-1)/Se[5],D=(Se[8]-1)/Se[0],It=(We[8]+1)/We[0],ke=we*D,He=we*It,be=re/(-D+It),tt=be*-D;if(ee.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(tt),q.translateZ(be),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Se[10]===-1)q.projectionMatrix.copy(ee.projectionMatrix),q.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const xe=we+be,E=at+be,b=ke-tt,N=He+(re-tt),j=st*at/E*xe,Z=Oe*at/E*xe;q.projectionMatrix.makePerspective(b,N,j,Z,xe,E),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function te(q,ee){ee===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ee.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;let ee=q.near,me=q.far;A.texture!==null&&(A.depthNear>0&&(ee=A.depthNear),A.depthFar>0&&(me=A.depthFar)),x.near=w.near=T.near=ee,x.far=w.far=T.far=me,(R!==x.near||k!==x.far)&&(i.updateRenderState({depthNear:x.near,depthFar:x.far}),R=x.near,k=x.far),T.layers.mask=q.layers.mask|2,w.layers.mask=q.layers.mask|4,x.layers.mask=T.layers.mask|w.layers.mask;const re=q.parent,Se=x.cameras;te(x,re);for(let We=0;We<Se.length;We++)te(Se[We],re);Se.length===2?V(x,T,w):x.projectionMatrix.copy(T.projectionMatrix),ne(q,x,re)};function ne(q,ee,me){me===null?q.matrix.copy(ee.matrixWorld):(q.matrix.copy(me.matrixWorld),q.matrix.invert(),q.matrix.multiply(ee.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ee.projectionMatrix),q.projectionMatrixInverse.copy(ee.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Hi*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(q){l=q,u!==null&&(u.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return A.texture!==null},this.getDepthSensingMesh=function(){return A.getMesh(x)};let ye=null;function Me(q,ee){if(h=ee.getViewerPose(c||o),g=ee,h!==null){const me=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let re=!1;me.length!==x.cameras.length&&(x.cameras.length=0,re=!0);for(let we=0;we<me.length;we++){const at=me[we];let st=null;if(f!==null)st=f.getViewport(at);else{const D=d.getViewSubImage(u,at);st=D.viewport,we===0&&(e.setRenderTargetTextures(v,D.colorTexture,u.ignoreDepthValues?void 0:D.depthStencilTexture),e.setRenderTarget(v))}let Oe=_[we];Oe===void 0&&(Oe=new Bt,Oe.layers.enable(we),Oe.viewport=new Xe,_[we]=Oe),Oe.matrix.fromArray(at.transform.matrix),Oe.matrix.decompose(Oe.position,Oe.quaternion,Oe.scale),Oe.projectionMatrix.fromArray(at.projectionMatrix),Oe.projectionMatrixInverse.copy(Oe.projectionMatrix).invert(),Oe.viewport.set(st.x,st.y,st.width,st.height),we===0&&(x.matrix.copy(Oe.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),re===!0&&x.cameras.push(Oe)}const Se=i.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&d){const we=d.getDepthInformation(me[0]);we&&we.isValid&&we.texture&&A.init(e,we,i.renderState)}}for(let me=0;me<M.length;me++){const re=y[me],Se=M[me];re!==null&&Se!==void 0&&Se.update(re,ee,c||o)}ye&&ye(q,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),g=null}const Ue=new Yc;Ue.setAnimationLoop(Me),this.setAnimationLoop=function(q){ye=q},this.dispose=function(){}}}const Zn=new pn,vA=new Le;function SA(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Bc(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,v,M,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),A(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,v,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ct&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ct&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=e.get(p),M=v.envMap,y=v.envMapRotation;M&&(m.envMap.value=M,Zn.copy(y),Zn.x*=-1,Zn.y*=-1,Zn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Zn.y*=-1,Zn.z*=-1),m.envMapRotation.value.setFromMatrix4(vA.makeRotationFromEuler(Zn)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,v,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=M*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ct&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function A(m,p){const v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function _A(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,M){const y=M.program;n.uniformBlockBinding(v,y)}function c(v,M){let y=i[v.id];y===void 0&&(g(v),y=h(v),i[v.id]=y,v.addEventListener("dispose",m));const C=M.program;n.updateUBOMapping(v,C);const I=e.render.frame;s[v.id]!==I&&(u(v),s[v.id]=I)}function h(v){const M=d();v.__bindingPointIndex=M;const y=r.createBuffer(),C=v.__size,I=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,C,I),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,M,y),y}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){const M=i[v.id],y=v.uniforms,C=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,M);for(let I=0,T=y.length;I<T;I++){const w=Array.isArray(y[I])?y[I]:[y[I]];for(let _=0,x=w.length;_<x;_++){const R=w[_];if(f(R,I,_,C)===!0){const k=R.__offset,F=Array.isArray(R.value)?R.value:[R.value];let z=0;for(let Q=0;Q<F.length;Q++){const G=F[Q],K=A(G);typeof G=="number"||typeof G=="boolean"?(R.__data[0]=G,r.bufferSubData(r.UNIFORM_BUFFER,k+z,R.__data)):G.isMatrix3?(R.__data[0]=G.elements[0],R.__data[1]=G.elements[1],R.__data[2]=G.elements[2],R.__data[3]=0,R.__data[4]=G.elements[3],R.__data[5]=G.elements[4],R.__data[6]=G.elements[5],R.__data[7]=0,R.__data[8]=G.elements[6],R.__data[9]=G.elements[7],R.__data[10]=G.elements[8],R.__data[11]=0):(G.toArray(R.__data,z),z+=K.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,k,R.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(v,M,y,C){const I=v.value,T=M+"_"+y;if(C[T]===void 0)return typeof I=="number"||typeof I=="boolean"?C[T]=I:C[T]=I.clone(),!0;{const w=C[T];if(typeof I=="number"||typeof I=="boolean"){if(w!==I)return C[T]=I,!0}else if(w.equals(I)===!1)return w.copy(I),!0}return!1}function g(v){const M=v.uniforms;let y=0;const C=16;for(let T=0,w=M.length;T<w;T++){const _=Array.isArray(M[T])?M[T]:[M[T]];for(let x=0,R=_.length;x<R;x++){const k=_[x],F=Array.isArray(k.value)?k.value:[k.value];for(let z=0,Q=F.length;z<Q;z++){const G=F[z],K=A(G),V=y%C,te=V%K.boundary,ne=V+te;y+=te,ne!==0&&C-ne<K.storage&&(y+=C-ne),k.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=K.storage}}}const I=y%C;return I>0&&(y+=C-I),v.__size=y,v.__cache={},this}function A(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),M}function m(v){const M=v.target;M.removeEventListener("dispose",m);const y=o.indexOf(M.__bindingPointIndex);o.splice(y,1),r.deleteBuffer(i[M.id]),delete i[M.id],delete s[M.id]}function p(){for(const v in i)r.deleteBuffer(i[v]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class Jc{constructor(e={}){const{canvas:t=fd(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),A=new Int32Array(4);let m=null,p=null;const v=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=gt,this.toneMapping=Gn,this.toneMappingExposure=1;const y=this;let C=!1,I=0,T=0,w=null,_=-1,x=null;const R=new Xe,k=new Xe;let F=null;const z=new ge(0);let Q=0,G=t.width,K=t.height,V=1,te=null,ne=null;const ye=new Xe(0,0,G,K),Me=new Xe(0,0,G,K);let Ue=!1;const q=new va;let ee=!1,me=!1;this.transmissionResolutionScale=1;const re=new Le,Se=new Le,We=new P,we=new Xe,at={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let st=!1;function Oe(){return w===null?V:1}let D=n;function It(S,B){return t.getContext(S,B)}try{const S={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${oa}`),t.addEventListener("webglcontextlost",X,!1),t.addEventListener("webglcontextrestored",le,!1),t.addEventListener("webglcontextcreationerror",ae,!1),D===null){const B="webgl2";if(D=It(B,S),D===null)throw It(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let ke,He,be,tt,xe,E,b,N,j,Z,Y,Ae,oe,he,Ve,$,de,Ee,Ce,ue,ze,Pe,$e,L;function ie(){ke=new Bm(D),ke.init(),Pe=new gA(D,ke),He=new Tm(D,ke,e,Pe),be=new fA(D,ke),He.reverseDepthBuffer&&u&&be.buffers.depth.setReversed(!0),tt=new Nm(D),xe=new tA,E=new mA(D,ke,be,xe,He,Pe,tt),b=new Rm(y),N=new Lm(y),j=new Gu(D),$e=new Em(D,j),Z=new Um(D,j,tt,$e),Y=new km(D,Z,j,tt),Ce=new Om(D,He,E),$=new Cm(xe),Ae=new eA(y,b,N,ke,He,$e,$),oe=new SA(y,xe),he=new iA,Ve=new cA(ke),Ee=new Mm(y,b,N,be,Y,f,l),de=new uA(y,Y,He),L=new _A(D,tt,He,be),ue=new wm(D,ke,tt),ze=new Fm(D,ke,tt),tt.programs=Ae.programs,y.capabilities=He,y.extensions=ke,y.properties=xe,y.renderLists=he,y.shadowMap=de,y.state=be,y.info=tt}ie();const W=new bA(y,D);this.xr=W,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const S=ke.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=ke.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(S){S!==void 0&&(V=S,this.setSize(G,K,!1))},this.getSize=function(S){return S.set(G,K)},this.setSize=function(S,B,O=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=S,K=B,t.width=Math.floor(S*V),t.height=Math.floor(B*V),O===!0&&(t.style.width=S+"px",t.style.height=B+"px"),this.setViewport(0,0,S,B)},this.getDrawingBufferSize=function(S){return S.set(G*V,K*V).floor()},this.setDrawingBufferSize=function(S,B,O){G=S,K=B,V=O,t.width=Math.floor(S*O),t.height=Math.floor(B*O),this.setViewport(0,0,S,B)},this.getCurrentViewport=function(S){return S.copy(R)},this.getViewport=function(S){return S.copy(ye)},this.setViewport=function(S,B,O,H){S.isVector4?ye.set(S.x,S.y,S.z,S.w):ye.set(S,B,O,H),be.viewport(R.copy(ye).multiplyScalar(V).round())},this.getScissor=function(S){return S.copy(Me)},this.setScissor=function(S,B,O,H){S.isVector4?Me.set(S.x,S.y,S.z,S.w):Me.set(S,B,O,H),be.scissor(k.copy(Me).multiplyScalar(V).round())},this.getScissorTest=function(){return Ue},this.setScissorTest=function(S){be.setScissorTest(Ue=S)},this.setOpaqueSort=function(S){te=S},this.setTransparentSort=function(S){ne=S},this.getClearColor=function(S){return S.copy(Ee.getClearColor())},this.setClearColor=function(){Ee.setClearColor(...arguments)},this.getClearAlpha=function(){return Ee.getClearAlpha()},this.setClearAlpha=function(){Ee.setClearAlpha(...arguments)},this.clear=function(S=!0,B=!0,O=!0){let H=0;if(S){let U=!1;if(w!==null){const J=w.texture.format;U=J===pa||J===ua||J===da}if(U){const J=w.texture.type,ce=J===In||J===ri||J===fs||J===Oi||J===la||J===ca,pe=Ee.getClearColor(),fe=Ee.getClearAlpha(),Re=pe.r,De=pe.g,ve=pe.b;ce?(g[0]=Re,g[1]=De,g[2]=ve,g[3]=fe,D.clearBufferuiv(D.COLOR,0,g)):(A[0]=Re,A[1]=De,A[2]=ve,A[3]=fe,D.clearBufferiv(D.COLOR,0,A))}else H|=D.COLOR_BUFFER_BIT}B&&(H|=D.DEPTH_BUFFER_BIT),O&&(H|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",X,!1),t.removeEventListener("webglcontextrestored",le,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),Ee.dispose(),he.dispose(),Ve.dispose(),xe.dispose(),b.dispose(),N.dispose(),Y.dispose(),$e.dispose(),L.dispose(),Ae.dispose(),W.dispose(),W.removeEventListener("sessionstart",Xi),W.removeEventListener("sessionend",Ki),cn.stop()};function X(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function le(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const S=tt.autoReset,B=de.enabled,O=de.autoUpdate,H=de.needsUpdate,U=de.type;ie(),tt.autoReset=S,de.enabled=B,de.autoUpdate=O,de.needsUpdate=H,de.type=U}function ae(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Ie(S){const B=S.target;B.removeEventListener("dispose",Ie),rt(B)}function rt(S){ft(S),xe.remove(S)}function ft(S){const B=xe.get(S).programs;B!==void 0&&(B.forEach(function(O){Ae.releaseProgram(O)}),S.isShaderMaterial&&Ae.releaseShaderCache(S))}this.renderBufferDirect=function(S,B,O,H,U,J){B===null&&(B=at);const ce=U.isMesh&&U.matrixWorld.determinant()<0,pe=ih(S,B,O,H,U);be.setMaterial(H,ce);let fe=O.index,Re=1;if(H.wireframe===!0){if(fe=Z.getWireframeAttribute(O),fe===void 0)return;Re=2}const De=O.drawRange,ve=O.attributes.position;let qe=De.start*Re,Ke=(De.start+De.count)*Re;J!==null&&(qe=Math.max(qe,J.start*Re),Ke=Math.min(Ke,(J.start+J.count)*Re)),fe!==null?(qe=Math.max(qe,0),Ke=Math.min(Ke,fe.count)):ve!=null&&(qe=Math.max(qe,0),Ke=Math.min(Ke,ve.count));const ut=Ke-qe;if(ut<0||ut===1/0)return;$e.setup(U,H,pe,O,fe);let dt,je=ue;if(fe!==null&&(dt=j.get(fe),je=ze,je.setIndex(dt)),U.isMesh)H.wireframe===!0?(be.setLineWidth(H.wireframeLinewidth*Oe()),je.setMode(D.LINES)):je.setMode(D.TRIANGLES);else if(U.isLine){let _e=H.linewidth;_e===void 0&&(_e=1),be.setLineWidth(_e*Oe()),U.isLineSegments?je.setMode(D.LINES):U.isLineLoop?je.setMode(D.LINE_LOOP):je.setMode(D.LINE_STRIP)}else U.isPoints?je.setMode(D.POINTS):U.isSprite&&je.setMode(D.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)$n("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),je.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(ke.get("WEBGL_multi_draw"))je.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const _e=U._multiDrawStarts,vt=U._multiDrawCounts,Ze=U._multiDrawCount,en=fe?j.get(fe).bytesPerElement:1,ci=xe.get(H).currentProgram.getUniforms();for(let Vt=0;Vt<Ze;Vt++)ci.setValue(D,"_gl_DrawID",Vt),je.render(_e[Vt]/en,vt[Vt])}else if(U.isInstancedMesh)je.renderInstances(qe,ut,U.count);else if(O.isInstancedBufferGeometry){const _e=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,vt=Math.min(O.instanceCount,_e);je.renderInstances(qe,ut,vt)}else je.render(qe,ut)};function Ye(S,B,O){S.transparent===!0&&S.side===ot&&S.forceSinglePass===!1?(S.side=Ct,S.needsUpdate=!0,Ms(S,B,O),S.side=Tt,S.needsUpdate=!0,Ms(S,B,O),S.side=ot):Ms(S,B,O)}this.compile=function(S,B,O=null){O===null&&(O=S),p=Ve.get(O),p.init(B),M.push(p),O.traverseVisible(function(U){U.isLight&&U.layers.test(B.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),S!==O&&S.traverseVisible(function(U){U.isLight&&U.layers.test(B.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),p.setupLights();const H=new Set;return S.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const J=U.material;if(J)if(Array.isArray(J))for(let ce=0;ce<J.length;ce++){const pe=J[ce];Ye(pe,O,U),H.add(pe)}else Ye(J,O,U),H.add(J)}),p=M.pop(),H},this.compileAsync=function(S,B,O=null){const H=this.compile(S,B,O);return new Promise(U=>{function J(){if(H.forEach(function(ce){xe.get(ce).currentProgram.isReady()&&H.delete(ce)}),H.size===0){U(S);return}setTimeout(J,10)}ke.get("KHR_parallel_shader_compile")!==null?J():setTimeout(J,10)})};let Ot=null;function Yt(S){Ot&&Ot(S)}function Xi(){cn.stop()}function Ki(){cn.start()}const cn=new Yc;cn.setAnimationLoop(Yt),typeof self<"u"&&cn.setContext(self),this.setAnimationLoop=function(S){Ot=S,W.setAnimationLoop(S),S===null?cn.stop():cn.start()},W.addEventListener("sessionstart",Xi),W.addEventListener("sessionend",Ki),this.render=function(S,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(B),B=W.getCamera()),S.isScene===!0&&S.onBeforeRender(y,S,B,w),p=Ve.get(S,M.length),p.init(B),M.push(p),Se.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),q.setFromProjectionMatrix(Se),me=this.localClippingEnabled,ee=$.init(this.clippingPlanes,me),m=he.get(S,v.length),m.init(),v.push(m),W.enabled===!0&&W.isPresenting===!0){const J=y.xr.getDepthSensingMesh();J!==null&&li(J,B,-1/0,y.sortObjects)}li(S,B,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(te,ne),st=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,st&&Ee.addToRenderList(m,S),this.info.render.frame++,ee===!0&&$.beginShadows();const O=p.state.shadowsArray;de.render(O,S,B),ee===!0&&$.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,U=m.transmissive;if(p.setupLights(),B.isArrayCamera){const J=B.cameras;if(U.length>0)for(let ce=0,pe=J.length;ce<pe;ce++){const fe=J[ce];La(H,U,S,fe)}st&&Ee.render(S);for(let ce=0,pe=J.length;ce<pe;ce++){const fe=J[ce];Zi(m,S,fe,fe.viewport)}}else U.length>0&&La(H,U,S,B),st&&Ee.render(S),Zi(m,S,B);w!==null&&T===0&&(E.updateMultisampleRenderTarget(w),E.updateRenderTargetMipmap(w)),S.isScene===!0&&S.onAfterRender(y,S,B),$e.resetDefaultState(),_=-1,x=null,M.pop(),M.length>0?(p=M[M.length-1],ee===!0&&$.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function li(S,B,O,H){if(S.visible===!1)return;if(S.layers.test(B.layers)){if(S.isGroup)O=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(B);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||q.intersectsSprite(S)){H&&we.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Se);const ce=Y.update(S),pe=S.material;pe.visible&&m.push(S,ce,pe,O,we.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||q.intersectsObject(S))){const ce=Y.update(S),pe=S.material;if(H&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),we.copy(S.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),we.copy(ce.boundingSphere.center)),we.applyMatrix4(S.matrixWorld).applyMatrix4(Se)),Array.isArray(pe)){const fe=ce.groups;for(let Re=0,De=fe.length;Re<De;Re++){const ve=fe[Re],qe=pe[ve.materialIndex];qe&&qe.visible&&m.push(S,ce,qe,O,we.z,ve)}}else pe.visible&&m.push(S,ce,pe,O,we.z,null)}}const J=S.children;for(let ce=0,pe=J.length;ce<pe;ce++)li(J[ce],B,O,H)}function Zi(S,B,O,H){const U=S.opaque,J=S.transmissive,ce=S.transparent;p.setupLightsView(O),ee===!0&&$.setGlobalState(y.clippingPlanes,O),H&&be.viewport(R.copy(H)),U.length>0&&_s(U,B,O),J.length>0&&_s(J,B,O),ce.length>0&&_s(ce,B,O),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function La(S,B,O,H){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new oi(1,1,{generateMipmaps:!0,type:ke.has("EXT_color_buffer_half_float")||ke.has("EXT_color_buffer_float")?En:In,minFilter:dn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace}));const J=p.state.transmissionRenderTarget[H.id],ce=H.viewport||R;J.setSize(ce.z*y.transmissionResolutionScale,ce.w*y.transmissionResolutionScale);const pe=y.getRenderTarget();y.setRenderTarget(J),y.getClearColor(z),Q=y.getClearAlpha(),Q<1&&y.setClearColor(16777215,.5),y.clear(),st&&Ee.render(O);const fe=y.toneMapping;y.toneMapping=Gn;const Re=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),ee===!0&&$.setGlobalState(y.clippingPlanes,H),_s(S,O,H),E.updateMultisampleRenderTarget(J),E.updateRenderTargetMipmap(J),ke.has("WEBGL_multisampled_render_to_texture")===!1){let De=!1;for(let ve=0,qe=B.length;ve<qe;ve++){const Ke=B[ve],ut=Ke.object,dt=Ke.geometry,je=Ke.material,_e=Ke.group;if(je.side===ot&&ut.layers.test(H.layers)){const vt=je.side;je.side=Ct,je.needsUpdate=!0,Ba(ut,O,H,dt,je,_e),je.side=vt,je.needsUpdate=!0,De=!0}}De===!0&&(E.updateMultisampleRenderTarget(J),E.updateRenderTargetMipmap(J))}y.setRenderTarget(pe),y.setClearColor(z,Q),Re!==void 0&&(H.viewport=Re),y.toneMapping=fe}function _s(S,B,O){const H=B.isScene===!0?B.overrideMaterial:null;for(let U=0,J=S.length;U<J;U++){const ce=S[U],pe=ce.object,fe=ce.geometry,Re=H===null?ce.material:H,De=ce.group;pe.layers.test(O.layers)&&Ba(pe,B,O,fe,Re,De)}}function Ba(S,B,O,H,U,J){S.onBeforeRender(y,B,O,H,U,J),S.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),U.onBeforeRender(y,B,O,H,S,J),U.transparent===!0&&U.side===ot&&U.forceSinglePass===!1?(U.side=Ct,U.needsUpdate=!0,y.renderBufferDirect(O,B,H,U,S,J),U.side=Tt,U.needsUpdate=!0,y.renderBufferDirect(O,B,H,U,S,J),U.side=ot):y.renderBufferDirect(O,B,H,U,S,J),S.onAfterRender(y,B,O,H,U,J)}function Ms(S,B,O){B.isScene!==!0&&(B=at);const H=xe.get(S),U=p.state.lights,J=p.state.shadowsArray,ce=U.state.version,pe=Ae.getParameters(S,U.state,J,B,O),fe=Ae.getProgramCacheKey(pe);let Re=H.programs;H.environment=S.isMeshStandardMaterial?B.environment:null,H.fog=B.fog,H.envMap=(S.isMeshStandardMaterial?N:b).get(S.envMap||H.environment),H.envMapRotation=H.environment!==null&&S.envMap===null?B.environmentRotation:S.envMapRotation,Re===void 0&&(S.addEventListener("dispose",Ie),Re=new Map,H.programs=Re);let De=Re.get(fe);if(De!==void 0){if(H.currentProgram===De&&H.lightsStateVersion===ce)return Fa(S,pe),De}else pe.uniforms=Ae.getUniforms(S),S.onBeforeCompile(pe,y),De=Ae.acquireProgram(pe,fe),Re.set(fe,De),H.uniforms=pe.uniforms;const ve=H.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(ve.clippingPlanes=$.uniform),Fa(S,pe),H.needsLights=rh(S),H.lightsStateVersion=ce,H.needsLights&&(ve.ambientLightColor.value=U.state.ambient,ve.lightProbe.value=U.state.probe,ve.directionalLights.value=U.state.directional,ve.directionalLightShadows.value=U.state.directionalShadow,ve.spotLights.value=U.state.spot,ve.spotLightShadows.value=U.state.spotShadow,ve.rectAreaLights.value=U.state.rectArea,ve.ltc_1.value=U.state.rectAreaLTC1,ve.ltc_2.value=U.state.rectAreaLTC2,ve.pointLights.value=U.state.point,ve.pointLightShadows.value=U.state.pointShadow,ve.hemisphereLights.value=U.state.hemi,ve.directionalShadowMap.value=U.state.directionalShadowMap,ve.directionalShadowMatrix.value=U.state.directionalShadowMatrix,ve.spotShadowMap.value=U.state.spotShadowMap,ve.spotLightMatrix.value=U.state.spotLightMatrix,ve.spotLightMap.value=U.state.spotLightMap,ve.pointShadowMap.value=U.state.pointShadowMap,ve.pointShadowMatrix.value=U.state.pointShadowMatrix),H.currentProgram=De,H.uniformsList=null,De}function Ua(S){if(S.uniformsList===null){const B=S.currentProgram.getUniforms();S.uniformsList=hr.seqWithValue(B.seq,S.uniforms)}return S.uniformsList}function Fa(S,B){const O=xe.get(S);O.outputColorSpace=B.outputColorSpace,O.batching=B.batching,O.batchingColor=B.batchingColor,O.instancing=B.instancing,O.instancingColor=B.instancingColor,O.instancingMorph=B.instancingMorph,O.skinning=B.skinning,O.morphTargets=B.morphTargets,O.morphNormals=B.morphNormals,O.morphColors=B.morphColors,O.morphTargetsCount=B.morphTargetsCount,O.numClippingPlanes=B.numClippingPlanes,O.numIntersection=B.numClipIntersection,O.vertexAlphas=B.vertexAlphas,O.vertexTangents=B.vertexTangents,O.toneMapping=B.toneMapping}function ih(S,B,O,H,U){B.isScene!==!0&&(B=at),E.resetTextureUnits();const J=B.fog,ce=H.isMeshStandardMaterial?B.environment:null,pe=w===null?y.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Mt,fe=(H.isMeshStandardMaterial?N:b).get(H.envMap||ce),Re=H.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,De=!!O.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),ve=!!O.morphAttributes.position,qe=!!O.morphAttributes.normal,Ke=!!O.morphAttributes.color;let ut=Gn;H.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(ut=y.toneMapping);const dt=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,je=dt!==void 0?dt.length:0,_e=xe.get(H),vt=p.state.lights;if(ee===!0&&(me===!0||S!==x)){const Dt=S===x&&H.id===_;$.setState(H,S,Dt)}let Ze=!1;H.version===_e.__version?(_e.needsLights&&_e.lightsStateVersion!==vt.state.version||_e.outputColorSpace!==pe||U.isBatchedMesh&&_e.batching===!1||!U.isBatchedMesh&&_e.batching===!0||U.isBatchedMesh&&_e.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&_e.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&_e.instancing===!1||!U.isInstancedMesh&&_e.instancing===!0||U.isSkinnedMesh&&_e.skinning===!1||!U.isSkinnedMesh&&_e.skinning===!0||U.isInstancedMesh&&_e.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&_e.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&_e.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&_e.instancingMorph===!1&&U.morphTexture!==null||_e.envMap!==fe||H.fog===!0&&_e.fog!==J||_e.numClippingPlanes!==void 0&&(_e.numClippingPlanes!==$.numPlanes||_e.numIntersection!==$.numIntersection)||_e.vertexAlphas!==Re||_e.vertexTangents!==De||_e.morphTargets!==ve||_e.morphNormals!==qe||_e.morphColors!==Ke||_e.toneMapping!==ut||_e.morphTargetsCount!==je)&&(Ze=!0):(Ze=!0,_e.__version=H.version);let en=_e.currentProgram;Ze===!0&&(en=Ms(H,B,U));let ci=!1,Vt=!1,Ji=!1;const lt=en.getUniforms(),jt=_e.uniforms;if(be.useProgram(en.program)&&(ci=!0,Vt=!0,Ji=!0),H.id!==_&&(_=H.id,Vt=!0),ci||x!==S){be.buffers.depth.getReversed()?(re.copy(S.projectionMatrix),gd(re),Ad(re),lt.setValue(D,"projectionMatrix",re)):lt.setValue(D,"projectionMatrix",S.projectionMatrix),lt.setValue(D,"viewMatrix",S.matrixWorldInverse);const kt=lt.map.cameraPosition;kt!==void 0&&kt.setValue(D,We.setFromMatrixPosition(S.matrixWorld)),He.logarithmicDepthBuffer&&lt.setValue(D,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&lt.setValue(D,"isOrthographic",S.isOrthographicCamera===!0),x!==S&&(x=S,Vt=!0,Ji=!0)}if(U.isSkinnedMesh){lt.setOptional(D,U,"bindMatrix"),lt.setOptional(D,U,"bindMatrixInverse");const Dt=U.skeleton;Dt&&(Dt.boneTexture===null&&Dt.computeBoneTexture(),lt.setValue(D,"boneTexture",Dt.boneTexture,E))}U.isBatchedMesh&&(lt.setOptional(D,U,"batchingTexture"),lt.setValue(D,"batchingTexture",U._matricesTexture,E),lt.setOptional(D,U,"batchingIdTexture"),lt.setValue(D,"batchingIdTexture",U._indirectTexture,E),lt.setOptional(D,U,"batchingColorTexture"),U._colorsTexture!==null&&lt.setValue(D,"batchingColorTexture",U._colorsTexture,E));const Xt=O.morphAttributes;if((Xt.position!==void 0||Xt.normal!==void 0||Xt.color!==void 0)&&Ce.update(U,O,en),(Vt||_e.receiveShadow!==U.receiveShadow)&&(_e.receiveShadow=U.receiveShadow,lt.setValue(D,"receiveShadow",U.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(jt.envMap.value=fe,jt.flipEnvMap.value=fe.isCubeTexture&&fe.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&B.environment!==null&&(jt.envMapIntensity.value=B.environmentIntensity),Vt&&(lt.setValue(D,"toneMappingExposure",y.toneMappingExposure),_e.needsLights&&sh(jt,Ji),J&&H.fog===!0&&oe.refreshFogUniforms(jt,J),oe.refreshMaterialUniforms(jt,H,V,K,p.state.transmissionRenderTarget[S.id]),hr.upload(D,Ua(_e),jt,E)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(hr.upload(D,Ua(_e),jt,E),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&lt.setValue(D,"center",U.center),lt.setValue(D,"modelViewMatrix",U.modelViewMatrix),lt.setValue(D,"normalMatrix",U.normalMatrix),lt.setValue(D,"modelMatrix",U.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Dt=H.uniformsGroups;for(let kt=0,Tr=Dt.length;kt<Tr;kt++){const Qn=Dt[kt];L.update(Qn,en),L.bind(Qn,en)}}return en}function sh(S,B){S.ambientLightColor.needsUpdate=B,S.lightProbe.needsUpdate=B,S.directionalLights.needsUpdate=B,S.directionalLightShadows.needsUpdate=B,S.pointLights.needsUpdate=B,S.pointLightShadows.needsUpdate=B,S.spotLights.needsUpdate=B,S.spotLightShadows.needsUpdate=B,S.rectAreaLights.needsUpdate=B,S.hemisphereLights.needsUpdate=B}function rh(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(S,B,O){xe.get(S.texture).__webglTexture=B,xe.get(S.depthTexture).__webglTexture=O;const H=xe.get(S);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=O===void 0,H.__autoAllocateDepthBuffer||ke.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,B){const O=xe.get(S);O.__webglFramebuffer=B,O.__useDefaultFramebuffer=B===void 0};const oh=D.createFramebuffer();this.setRenderTarget=function(S,B=0,O=0){w=S,I=B,T=O;let H=!0,U=null,J=!1,ce=!1;if(S){const fe=xe.get(S);if(fe.__useDefaultFramebuffer!==void 0)be.bindFramebuffer(D.FRAMEBUFFER,null),H=!1;else if(fe.__webglFramebuffer===void 0)E.setupRenderTarget(S);else if(fe.__hasExternalTextures)E.rebindTextures(S,xe.get(S.texture).__webglTexture,xe.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const ve=S.depthTexture;if(fe.__boundDepthTexture!==ve){if(ve!==null&&xe.has(ve)&&(S.width!==ve.image.width||S.height!==ve.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(S)}}const Re=S.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(ce=!0);const De=xe.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(De[B])?U=De[B][O]:U=De[B],J=!0):S.samples>0&&E.useMultisampledRTT(S)===!1?U=xe.get(S).__webglMultisampledFramebuffer:Array.isArray(De)?U=De[O]:U=De,R.copy(S.viewport),k.copy(S.scissor),F=S.scissorTest}else R.copy(ye).multiplyScalar(V).floor(),k.copy(Me).multiplyScalar(V).floor(),F=Ue;if(O!==0&&(U=oh),be.bindFramebuffer(D.FRAMEBUFFER,U)&&H&&be.drawBuffers(S,U),be.viewport(R),be.scissor(k),be.setScissorTest(F),J){const fe=xe.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+B,fe.__webglTexture,O)}else if(ce){const fe=xe.get(S.texture),Re=B;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,fe.__webglTexture,O,Re)}else if(S!==null&&O!==0){const fe=xe.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,fe.__webglTexture,O)}_=-1},this.readRenderTargetPixels=function(S,B,O,H,U,J,ce){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pe=xe.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ce!==void 0&&(pe=pe[ce]),pe){be.bindFramebuffer(D.FRAMEBUFFER,pe);try{const fe=S.texture,Re=fe.format,De=fe.type;if(!He.textureFormatReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!He.textureTypeReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=S.width-H&&O>=0&&O<=S.height-U&&D.readPixels(B,O,H,U,Pe.convert(Re),Pe.convert(De),J)}finally{const fe=w!==null?xe.get(w).__webglFramebuffer:null;be.bindFramebuffer(D.FRAMEBUFFER,fe)}}},this.readRenderTargetPixelsAsync=async function(S,B,O,H,U,J,ce){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pe=xe.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ce!==void 0&&(pe=pe[ce]),pe){const fe=S.texture,Re=fe.format,De=fe.type;if(!He.textureFormatReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!He.textureTypeReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=S.width-H&&O>=0&&O<=S.height-U){be.bindFramebuffer(D.FRAMEBUFFER,pe);const ve=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,ve),D.bufferData(D.PIXEL_PACK_BUFFER,J.byteLength,D.STREAM_READ),D.readPixels(B,O,H,U,Pe.convert(Re),Pe.convert(De),0);const qe=w!==null?xe.get(w).__webglFramebuffer:null;be.bindFramebuffer(D.FRAMEBUFFER,qe);const Ke=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await md(D,Ke,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,ve),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,J),D.deleteBuffer(ve),D.deleteSync(Ke),J}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,B=null,O=0){S.isTexture!==!0&&($n("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,S=arguments[1]);const H=Math.pow(2,-O),U=Math.floor(S.image.width*H),J=Math.floor(S.image.height*H),ce=B!==null?B.x:0,pe=B!==null?B.y:0;E.setTexture2D(S,0),D.copyTexSubImage2D(D.TEXTURE_2D,O,0,0,ce,pe,U,J),be.unbindTexture()};const ah=D.createFramebuffer(),lh=D.createFramebuffer();this.copyTextureToTexture=function(S,B,O=null,H=null,U=0,J=null){S.isTexture!==!0&&($n("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,S=arguments[1],B=arguments[2],J=arguments[3]||0,O=null),J===null&&(U!==0?($n("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),J=U,U=0):J=0);let ce,pe,fe,Re,De,ve,qe,Ke,ut;const dt=S.isCompressedTexture?S.mipmaps[J]:S.image;if(O!==null)ce=O.max.x-O.min.x,pe=O.max.y-O.min.y,fe=O.isBox3?O.max.z-O.min.z:1,Re=O.min.x,De=O.min.y,ve=O.isBox3?O.min.z:0;else{const Xt=Math.pow(2,-U);ce=Math.floor(dt.width*Xt),pe=Math.floor(dt.height*Xt),S.isDataArrayTexture?fe=dt.depth:S.isData3DTexture?fe=Math.floor(dt.depth*Xt):fe=1,Re=0,De=0,ve=0}H!==null?(qe=H.x,Ke=H.y,ut=H.z):(qe=0,Ke=0,ut=0);const je=Pe.convert(B.format),_e=Pe.convert(B.type);let vt;B.isData3DTexture?(E.setTexture3D(B,0),vt=D.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(E.setTexture2DArray(B,0),vt=D.TEXTURE_2D_ARRAY):(E.setTexture2D(B,0),vt=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,B.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,B.unpackAlignment);const Ze=D.getParameter(D.UNPACK_ROW_LENGTH),en=D.getParameter(D.UNPACK_IMAGE_HEIGHT),ci=D.getParameter(D.UNPACK_SKIP_PIXELS),Vt=D.getParameter(D.UNPACK_SKIP_ROWS),Ji=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,dt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,dt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Re),D.pixelStorei(D.UNPACK_SKIP_ROWS,De),D.pixelStorei(D.UNPACK_SKIP_IMAGES,ve);const lt=S.isDataArrayTexture||S.isData3DTexture,jt=B.isDataArrayTexture||B.isData3DTexture;if(S.isDepthTexture){const Xt=xe.get(S),Dt=xe.get(B),kt=xe.get(Xt.__renderTarget),Tr=xe.get(Dt.__renderTarget);be.bindFramebuffer(D.READ_FRAMEBUFFER,kt.__webglFramebuffer),be.bindFramebuffer(D.DRAW_FRAMEBUFFER,Tr.__webglFramebuffer);for(let Qn=0;Qn<fe;Qn++)lt&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,xe.get(S).__webglTexture,U,ve+Qn),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,xe.get(B).__webglTexture,J,ut+Qn)),D.blitFramebuffer(Re,De,ce,pe,qe,Ke,ce,pe,D.DEPTH_BUFFER_BIT,D.NEAREST);be.bindFramebuffer(D.READ_FRAMEBUFFER,null),be.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(U!==0||S.isRenderTargetTexture||xe.has(S)){const Xt=xe.get(S),Dt=xe.get(B);be.bindFramebuffer(D.READ_FRAMEBUFFER,ah),be.bindFramebuffer(D.DRAW_FRAMEBUFFER,lh);for(let kt=0;kt<fe;kt++)lt?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Xt.__webglTexture,U,ve+kt):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Xt.__webglTexture,U),jt?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Dt.__webglTexture,J,ut+kt):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Dt.__webglTexture,J),U!==0?D.blitFramebuffer(Re,De,ce,pe,qe,Ke,ce,pe,D.COLOR_BUFFER_BIT,D.NEAREST):jt?D.copyTexSubImage3D(vt,J,qe,Ke,ut+kt,Re,De,ce,pe):D.copyTexSubImage2D(vt,J,qe,Ke,Re,De,ce,pe);be.bindFramebuffer(D.READ_FRAMEBUFFER,null),be.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else jt?S.isDataTexture||S.isData3DTexture?D.texSubImage3D(vt,J,qe,Ke,ut,ce,pe,fe,je,_e,dt.data):B.isCompressedArrayTexture?D.compressedTexSubImage3D(vt,J,qe,Ke,ut,ce,pe,fe,je,dt.data):D.texSubImage3D(vt,J,qe,Ke,ut,ce,pe,fe,je,_e,dt):S.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,J,qe,Ke,ce,pe,je,_e,dt.data):S.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,J,qe,Ke,dt.width,dt.height,je,dt.data):D.texSubImage2D(D.TEXTURE_2D,J,qe,Ke,ce,pe,je,_e,dt);D.pixelStorei(D.UNPACK_ROW_LENGTH,Ze),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,en),D.pixelStorei(D.UNPACK_SKIP_PIXELS,ci),D.pixelStorei(D.UNPACK_SKIP_ROWS,Vt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ji),J===0&&B.generateMipmaps&&D.generateMipmap(vt),be.unbindTexture()},this.copyTextureToTexture3D=function(S,B,O=null,H=null,U=0){return S.isTexture!==!0&&($n("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,H=arguments[1]||null,S=arguments[2],B=arguments[3],U=arguments[4]||0),$n('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,B,O,H,U)},this.initRenderTarget=function(S){xe.get(S).__webglFramebuffer===void 0&&E.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?E.setTextureCube(S,0):S.isData3DTexture?E.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?E.setTexture2DArray(S,0):E.setTexture2D(S,0),be.unbindTexture()},this.resetState=function(){I=0,T=0,w=null,be.reset(),$e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class un{constructor(e,t,n,i,s="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(s),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),un.nextNameID=un.nextNameID||0,this.$name.id=`lil-gui-name-${++un.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class MA extends un{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function ia(r){let e,t;return(e=r.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=r.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=r.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const EA={isPrimitive:!0,match:r=>typeof r=="string",fromHexString:ia,toHexString:ia},xs={isPrimitive:!0,match:r=>typeof r=="number",fromHexString:r=>parseInt(r.substring(1),16),toHexString:r=>"#"+r.toString(16).padStart(6,0)},wA={isPrimitive:!1,match:r=>Array.isArray(r),fromHexString(r,e,t=1){const n=xs.fromHexString(r);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([r,e,t],n=1){n=255/n;const i=r*n<<16^e*n<<8^t*n<<0;return xs.toHexString(i)}},TA={isPrimitive:!1,match:r=>Object(r)===r,fromHexString(r,e,t=1){const n=xs.fromHexString(r);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r,g:e,b:t},n=1){n=255/n;const i=r*n<<16^e*n<<8^t*n<<0;return xs.toHexString(i)}},CA=[EA,xs,wA,TA];function RA(r){return CA.find(e=>e.match(r))}class IA extends un{constructor(e,t,n,i){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=RA(this.initialValue),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=ia(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class ao extends un{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class DA extends un{constructor(e,t,n,i,s,o){super(e,t,n,"number"),this._initInput(),this.min(i),this.max(s);const a=o!==void 0;this.step(a?o:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let v=parseFloat(this.$input.value);isNaN(v)||(this._stepExplicit&&(v=this._snap(v)),this.setValue(this._clamp(v)))},n=v=>{const M=parseFloat(this.$input.value);isNaN(M)||(this._snapClampSetValue(M+v),this.$input.value=this.getValue())},i=v=>{v.key==="Enter"&&this.$input.blur(),v.code==="ArrowUp"&&(v.preventDefault(),n(this._step*this._arrowKeyMultiplier(v))),v.code==="ArrowDown"&&(v.preventDefault(),n(this._step*this._arrowKeyMultiplier(v)*-1))},s=v=>{this._inputFocused&&(v.preventDefault(),n(this._step*this._normalizeMouseWheel(v)))};let o=!1,a,l,c,h,d;const u=5,f=v=>{a=v.clientX,l=c=v.clientY,o=!0,h=this.getValue(),d=0,window.addEventListener("mousemove",g),window.addEventListener("mouseup",A)},g=v=>{if(o){const M=v.clientX-a,y=v.clientY-l;Math.abs(y)>u?(v.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(M)>u&&A()}if(!o){const M=v.clientY-c;d-=M*this._step*this._arrowKeyMultiplier(v),h+d>this._max?d=this._max-h:h+d<this._min&&(d=this._min-h),this._snapClampSetValue(h+d)}c=v.clientY},A=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",g),window.removeEventListener("mouseup",A)},m=()=>{this._inputFocused=!0},p=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",i),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",f),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",p)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(p,v,M,y,C)=>(p-v)/(M-v)*(C-y)+y,t=p=>{const v=this.$slider.getBoundingClientRect();let M=e(p,v.left,v.right,this._min,this._max);this._snapClampSetValue(M)},n=p=>{this._setDraggingStyle(!0),t(p.clientX),window.addEventListener("mousemove",i),window.addEventListener("mouseup",s)},i=p=>{t(p.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",s)};let o=!1,a,l;const c=p=>{p.preventDefault(),this._setDraggingStyle(!0),t(p.touches[0].clientX),o=!1},h=p=>{p.touches.length>1||(this._hasScrollBar?(a=p.touches[0].clientX,l=p.touches[0].clientY,o=!0):c(p),window.addEventListener("touchmove",d,{passive:!1}),window.addEventListener("touchend",u))},d=p=>{if(o){const v=p.touches[0].clientX-a,M=p.touches[0].clientY-l;Math.abs(v)>Math.abs(M)?c(p):(window.removeEventListener("touchmove",d),window.removeEventListener("touchend",u))}else p.preventDefault(),t(p.touches[0].clientX)},u=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",d),window.removeEventListener("touchend",u)},f=this._callOnFinishChange.bind(this),g=400;let A;const m=p=>{if(Math.abs(p.deltaX)<Math.abs(p.deltaY)&&this._hasScrollBar)return;p.preventDefault();const M=this._normalizeMouseWheel(p)*this._step;this._snapClampSetValue(this.getValue()+M),this.$input.value=this.getValue(),clearTimeout(A),A=setTimeout(f,g)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",h,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class PA extends un{constructor(e,t,n,i){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(i)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const n=document.createElement("option");n.textContent=t,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}}class LA extends un{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var BA=`.lil-gui {
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
}`;function UA(r){const e=document.createElement("style");e.innerHTML=r;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let ec=!1;class Da{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:i,title:s="Controls",closeFolders:o=!1,injectStyles:a=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),l&&this.domElement.classList.add("allow-touch-styles"),!ec&&a&&(UA(BA),ec=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this._closeFolders=o}add(e,t,n,i,s){if(Object(n)===n)return new PA(this,e,t,n);const o=e[t];switch(typeof o){case"number":return new DA(this,e,t,n,i,s);case"boolean":return new MA(this,e,t);case"string":return new LA(this,e,t);case"function":return new ao(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,o)}addColor(e,t,n=1){return new IA(this,e,t,n)}addFolder(e){const t=new Da({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof ao||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof ao)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}class FA{constructor(){this.scene=new Qd,this.canvas=null,this.bgTexture=null,this.init()}init(){if(this.canvas=document.querySelector("canvas.webgl"),!this.canvas){console.error('Canvas element with class "webgl" not found');return}}updateGradientBackground(e){const i=document.createElement("canvas");i.width=2,i.height=2048;const s=i.getContext("2d"),o=s.createLinearGradient(0,0,0,2048);o.addColorStop(0,e.gradientTop),o.addColorStop(1,e.gradientBottom),s.fillStyle=o,s.globalAlpha=e.gradientAlpha,s.fillRect(0,0,2,2048),this.bgTexture=new _a(i),this.bgTexture.minFilter=ct,this.bgTexture.magFilter=ct,this.bgTexture.colorSpace=Mt,this.scene.background=this.bgTexture,this.scene._originalBackgroundTexture=this.bgTexture}getScene(){return this.scene}getCanvas(){return this.canvas}dispose(){this.bgTexture&&this.bgTexture.dispose()}}const tc={type:"change"},Pa={type:"start"},$c={type:"end"},er=new Qi,nc=new kn,NA=Math.cos(70*Cc.DEG2RAD),mt=new P,Ht=2*Math.PI,it={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},lo=1e-6;class OA extends Hu{constructor(e,t=null){super(e,t),this.state=it.NONE,this.enabled=!0,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Cn.ROTATE,MIDDLE:Cn.DOLLY,RIGHT:Cn.PAN},this.touches={ONE:wi.ROTATE,TWO:wi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new qt,this._lastTargetPosition=new P,this._quat=new qt().setFromUnitVectors(e.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new wl,this._sphericalDelta=new wl,this._scale=1,this._panOffset=new P,this._rotateStart=new Te,this._rotateEnd=new Te,this._rotateDelta=new Te,this._panStart=new Te,this._panEnd=new Te,this._panDelta=new Te,this._dollyStart=new Te,this._dollyEnd=new Te,this._dollyDelta=new Te,this._dollyDirection=new P,this._mouse=new Te,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=HA.bind(this),this._onPointerDown=kA.bind(this),this._onPointerUp=zA.bind(this),this._onContextMenu=jA.bind(this),this._onMouseWheel=WA.bind(this),this._onKeyDown=QA.bind(this),this._onTouchStart=qA.bind(this),this._onTouchMove=YA.bind(this),this._onMouseDown=GA.bind(this),this._onMouseMove=VA.bind(this),this._interceptControlDown=XA.bind(this),this._interceptControlUp=KA.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(tc),this.update(),this.state=it.NONE}update(e=null){const t=this.object.position;mt.copy(t).sub(this.target),mt.applyQuaternion(this._quat),this._spherical.setFromVector3(mt),this.autoRotate&&this.state===it.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=Ht:n>Math.PI&&(n-=Ht),i<-Math.PI?i+=Ht:i>Math.PI&&(i-=Ht),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(mt.setFromSpherical(this._spherical),mt.applyQuaternion(this._quatInverse),t.copy(this.target).add(mt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=mt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new P(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new P(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=mt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(er.origin.copy(this.object.position),er.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(er.direction))<NA?this.object.lookAt(this.target):(nc.setFromNormalAndCoplanarPoint(this.object.up,this.target),er.intersectPlane(nc,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>lo||8*(1-this._lastQuaternion.dot(this.object.quaternion))>lo||this._lastTargetPosition.distanceToSquared(this.target)>lo?(this.dispatchEvent(tc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Ht/60*this.autoRotateSpeed*e:Ht/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){mt.setFromMatrixColumn(t,0),mt.multiplyScalar(-e),this._panOffset.add(mt)}_panUp(e,t){this.screenSpacePanning===!0?mt.setFromMatrixColumn(t,1):(mt.setFromMatrixColumn(t,0),mt.crossVectors(this.object.up,mt)),mt.multiplyScalar(e),this._panOffset.add(mt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;mt.copy(i).sub(this.target);let s=mt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/n.clientHeight,this.object.matrix),this._panUp(2*t*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),i=e-n.left,s=t-n.top,o=n.width,a=n.height;this._mouse.x=i/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Ht*this._rotateDelta.x/t.clientHeight),this._rotateUp(Ht*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Ht*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,s=Math.sqrt(n*n+i*i);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),s=.5*(e.pageY+n.y);this._rotateEnd.set(i,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Ht*this._rotateDelta.x/t.clientHeight),this._rotateUp(Ht*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,s=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Te,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function kA(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r)))}function HA(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function zA(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent($c),this.state=it.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function GA(r){let e;switch(r.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Cn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=it.DOLLY;break;case Cn.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=it.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=it.ROTATE}break;case Cn.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=it.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=it.PAN}break;default:this.state=it.NONE}this.state!==it.NONE&&this.dispatchEvent(Pa)}function VA(r){switch(this.state){case it.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case it.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case it.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function WA(r){this.enabled===!1||this.enableZoom===!1||this.state!==it.NONE||(r.preventDefault(),this.dispatchEvent(Pa),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent($c))}function QA(r){this.enabled!==!1&&this._handleKeyDown(r)}function qA(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case wi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=it.TOUCH_ROTATE;break;case wi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=it.TOUCH_PAN;break;default:this.state=it.NONE}break;case 2:switch(this.touches.TWO){case wi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=it.TOUCH_DOLLY_PAN;break;case wi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=it.TOUCH_DOLLY_ROTATE;break;default:this.state=it.NONE}break;default:this.state=it.NONE}this.state!==it.NONE&&this.dispatchEvent(Pa)}function YA(r){switch(this._trackPointer(r),this.state){case it.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case it.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case it.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case it.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=it.NONE}}function jA(r){this.enabled!==!1&&r.preventDefault()}function XA(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function KA(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class ZA{constructor(e,t){this.canvas=e,this.sizes=t,this.camera=null,this.controls=null,this.raycaster=new qc,this.mouse=new Te,this.scene=null,this.clickableMeshes=[],this.targetLerpActive=!1,this.targetLerpStart=null,this.targetLerpFrom=new P,this.targetLerpTo=new P,this.targetLerpDuration=.3,this.cameraResetActive=!1,this.cameraResetStart=null,this.cameraResetDuration=.8,this.positionLerpFrom=new P,this.positionLerpTo=new P,this.rotationLerpFrom={x:0,y:0,z:0},this.rotationLerpTo={x:0,y:0,z:0},this.originalTarget=new P(-.018058106108908126,.34892644576978554,.08865572603297185),this.zoomVelocity=0,this.zoomMomentum=0,this.lastScrollTime=0,this.zoomDecay=.96,this.zoomMomentumThreshold=.015,this.momentumActive=!1,this.originalPosition=new P(-.9767395667747095,.6513489013452174,-.5290562260411343),this.originalRotation={x:-2.6863117716033176,y:-.9484795935271679,z:-2.7629820926703275},this.axisHelper=null,this.axisHelperVisible=!1,this.axisHelperSize=.5,this.init(),this.setupEventListeners()}init(){this.camera=new Bt(50,this.sizes.width/this.sizes.height,.1,100);const e=window.innerWidth<=768,t=1.8;e?(this.camera.fov=60,this.camera.updateProjectionMatrix(),this.camera.position.set(-.9767395667747095*t,.6513489013452174*t,-.5290562260411343*t),this.originalPosition=new P(-.9767395667747095*t,.6513489013452174*t,-.5290562260411343*t),console.log("[FlexFrame Camera] Mobile mode: zoomed out with FOV 60, factor:",t)):this.camera.position.set(-.9767395667747095,.6513489013452174,-.5290562260411343),this.camera.rotation.set(-2.6863117716033176,-.9484795935271679,-2.7629820926703275,"XYZ"),this.controls=new OA(this.camera,this.canvas),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.zoomSpeed=.9,this.controls.minDistance=.146,this.controls.maxDistance=19,this.controls.mouseButtons={LEFT:Cn.ROTATE,MIDDLE:Cn.PAN,RIGHT:Cn.PAN},this.controls.target.set(-.018058106108908126,.34892644576978554,.08865572603297185),this.controls.update()}setupEventListeners(){let e=null;this.controls.addEventListener("change",()=>{e&&clearTimeout(e),e=setTimeout(()=>{},2e3)}),this.canvas.addEventListener("dblclick",t=>{this.handleDoubleClick(t)}),window.addEventListener("keydown",t=>{t.code==="Space"&&!t.repeat&&(t.preventDefault(),this.resetCamera())}),this.canvas.addEventListener("wheel",t=>{this.trackZoomMomentum(t)},{passive:!0}),window.addEventListener("resize",()=>{this.handleResize()})}handleDoubleClick(e){if(!this.scene||this.clickableMeshes.length===0){console.warn("Scene or clickable meshes not available for rotation center");return}const t=this.canvas.getBoundingClientRect();this.mouse.x=(e.clientX-t.left)/t.width*2-1,this.mouse.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const n=this.raycaster.intersectObjects(this.clickableMeshes,!0);if(n.length>0){const i=n[0].point;console.log("New rotation center set at:",i);const s=this.controls.dampingFactor;this.controls.dampingFactor=.15,this.targetLerpFrom.copy(this.controls.target),this.targetLerpTo.copy(i),this.targetLerpStart=performance.now(),this.targetLerpActive=!0,setTimeout(()=>{this.controls.dampingFactor=s},this.targetLerpDuration*1e3+100),this.axisHelperVisible&&setTimeout(()=>{this.updateAxisHelper()},this.targetLerpDuration*1e3+150)}}resetCamera(){console.log("Resetting camera with smooth animation to default state"),this.zoomMomentum=0,this.momentumActive=!1,this.targetLerpActive=!1;const e=this.controls.dampingFactor;this.controls.dampingFactor=.2,this.positionLerpFrom.copy(this.camera.position),this.positionLerpTo.copy(this.originalPosition),this.rotationLerpFrom.x=this.camera.rotation.x,this.rotationLerpFrom.y=this.camera.rotation.y,this.rotationLerpFrom.z=this.camera.rotation.z,this.rotationLerpTo.x=this.originalRotation.x,this.rotationLerpTo.y=this.originalRotation.y,this.rotationLerpTo.z=this.originalRotation.z,this.targetLerpFrom.copy(this.controls.target),this.targetLerpTo.copy(this.originalTarget),this.cameraResetActive=!0,this.targetLerpActive=!0,this.cameraResetStart=performance.now(),this.targetLerpStart=performance.now(),setTimeout(()=>{this.controls.dampingFactor=e},this.cameraResetDuration*1e3+100),console.log("Camera smooth reset animation started")}createAxisHelper(){this.axisHelper&&this.scene.remove(this.axisHelper),this.axisHelper=new ku(this.axisHelperSize),this.axisHelper.position.copy(this.controls.target),this.scene.add(this.axisHelper),console.log("Axis helper created at:",this.controls.target)}updateAxisHelper(){this.axisHelper&&this.axisHelperVisible&&this.axisHelper.position.copy(this.controls.target)}toggleAxisHelper(e){this.axisHelperVisible=e,e&&!this.axisHelper&&this.createAxisHelper(),this.axisHelper&&(this.axisHelper.visible=e,this.updateAxisHelper())}setAxisHelperSize(e){this.axisHelperSize=e,this.axisHelper&&this.createAxisHelper()}getRotationCenter(){return{x:this.controls.target.x,y:this.controls.target.y,z:this.controls.target.z}}setRotationCenter(e,t,n){this.controls.target.set(e,t,n),this.controls.update(),this.updateAxisHelper(),console.log("Rotation center set to:",e,t,n)}setRotationCenterX(e){this.controls.target.x=e,this.controls.update(),this.updateAxisHelper()}setRotationCenterY(e){this.controls.target.y=e,this.controls.update(),this.updateAxisHelper()}setRotationCenterZ(e){this.controls.target.z=e,this.controls.update(),this.updateAxisHelper()}copyCoordinatesToClipboard(){const e=this.getRotationCenter(),t=`x: ${e.x.toFixed(6)}, y: ${e.y.toFixed(6)}, z: ${e.z.toFixed(6)}`;navigator.clipboard.writeText(t).then(()=>{console.log("Coordinates copied to clipboard:",t)}).catch(n=>{console.error("Failed to copy coordinates:",n),console.log("Coordinates (manual copy):",t)})}setFOV(e){this.camera.fov=e,this.camera.updateProjectionMatrix(),console.log("FOV set to:",e)}getFOV(){return this.camera.fov}copyCameraSettingsToClipboard(){const e={position:this.camera.position.toArray(),rotation:[this.camera.rotation.x,this.camera.rotation.y,this.camera.rotation.z],target:this.controls.target.toArray(),fov:this.camera.fov,zoom:{minDistance:this.controls.minDistance,maxDistance:this.controls.maxDistance,zoomSpeed:this.controls.zoomSpeed}},t=JSON.stringify(e,null,2);navigator.clipboard.writeText(t).then(()=>{console.log("Camera settings copied to clipboard:",e)}).catch(n=>{console.error("Failed to copy camera settings:",n),console.log("Camera settings (manual copy):",t)})}copyAllSettingsToClipboard(e){const t=e.gatherAllSettings(),n=JSON.stringify(t,null,2);navigator.clipboard.writeText(n).then(()=>{console.log("All GUI settings copied to clipboard:",t)}).catch(i=>{console.error("Failed to copy all settings:",i),console.log("All settings (manual copy):",n)})}handleResize(){this.camera.aspect=this.sizes.width/this.sizes.height,this.camera.updateProjectionMatrix()}updateTargetLerp(){if(this.targetLerpActive){const t=(performance.now()-this.targetLerpStart)/1e3;let n=Math.min(t/this.targetLerpDuration,1);n<.5?n=4*n*n*n:n=1-Math.pow(-2*n+2,3)/2,this.controls.target.lerpVectors(this.targetLerpFrom,this.targetLerpTo,n),this.controls.update(),t/this.targetLerpDuration>=1&&(this.controls.target.copy(this.targetLerpTo),this.controls.update(),this.targetLerpActive=!1)}}updateCameraReset(){if(this.cameraResetActive){const t=(performance.now()-this.cameraResetStart)/1e3;let n=Math.min(t/this.cameraResetDuration,1);n<.5?n=4*n*n*n:n=1-Math.pow(-2*n+2,3)/2,this.camera.position.lerpVectors(this.positionLerpFrom,this.positionLerpTo,n),this.camera.rotation.x=this.rotationLerpFrom.x+(this.rotationLerpTo.x-this.rotationLerpFrom.x)*n,this.camera.rotation.y=this.rotationLerpFrom.y+(this.rotationLerpTo.y-this.rotationLerpFrom.y)*n,this.camera.rotation.z=this.rotationLerpFrom.z+(this.rotationLerpTo.z-this.rotationLerpFrom.z)*n,t/this.cameraResetDuration>=1&&(this.camera.position.copy(this.positionLerpTo),this.camera.rotation.set(this.rotationLerpTo.x,this.rotationLerpTo.y,this.rotationLerpTo.z,"XYZ"),this.cameraResetActive=!1,console.log("Camera reset animation complete"))}}update(){this.updateTargetLerp(),this.updateCameraReset(),this.updateZoomMomentum(),this.updateAxisHelper(),this.controls.update()}trackZoomMomentum(e){const t=performance.now(),n=Math.max(t-this.lastScrollTime,1),i=e.deltaY>0?1:-1,s=this.velocityMultiplier||1,o=i*.1*s,a=Math.min(n/16,3);this.zoomVelocity=o*a,this.zoomMomentum=this.zoomVelocity,this.lastScrollTime=t}updateZoomMomentum(){if(Math.abs(this.zoomMomentum)>this.zoomMomentumThreshold){const e=this.camera.position.distanceTo(this.controls.target),t=this.zoomMomentum*Math.max(e*.05,.01),n=new P;n.subVectors(this.camera.position,this.controls.target).normalize();const i=e,s=i+t,o=Math.max(this.controls.minDistance,Math.min(this.controls.maxDistance,s));Math.abs(o-i)>.001&&this.camera.position.copy(this.controls.target).add(n.multiplyScalar(o)),this.zoomMomentum*=this.zoomDecay,this.controls.update()}else this.zoomMomentum!==0&&(this.zoomMomentum=0)}getCamera(){return this.camera}getControls(){return this.controls}setScene(e){this.scene=e}setClickableMeshes(e){this.clickableMeshes=e}applySettings(e){e.camera&&(e.camera.position&&this.camera.position.set(e.camera.position[0],e.camera.position[1],e.camera.position[2]),e.camera.rotation&&this.camera.rotation.set(e.camera.rotation[0],e.camera.rotation[1],e.camera.rotation[2]),e.camera.target&&this.controls.target.set(e.camera.target[0],e.camera.target[1],e.camera.target[2]),this.controls.update())}getSettings(){return{position:this.camera.position.toArray(),rotation:[this.camera.rotation.x,this.camera.rotation.y,this.camera.rotation.z],target:this.controls.target.toArray()}}updateOriginalState(e,t,n){e&&this.originalPosition.set(...e),t&&(this.originalRotation.x=t[0],this.originalRotation.y=t[1],this.originalRotation.z=t[2]),n&&this.originalTarget.set(...n),console.log("Updated original camera state for spacebar reset")}dispose(){this.axisHelper&&(this.scene.remove(this.axisHelper),this.axisHelper=null)}}class JA extends mu{constructor(e){super(e),this.type=En}parse(e){const o=function(w,_){switch(w){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(_||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(_||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(_||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(_||""))}},d=function(w,_,x){_=_||1024;let k=w.pos,F=-1,z=0,Q="",G=String.fromCharCode.apply(null,new Uint16Array(w.subarray(k,k+128)));for(;0>(F=G.indexOf(`
`))&&z<_&&k<w.byteLength;)Q+=G,z+=G.length,k+=128,G+=String.fromCharCode.apply(null,new Uint16Array(w.subarray(k,k+128)));return-1<F?(w.pos+=z+F+1,Q+G.slice(0,F)):!1},u=function(w){const _=/^#\?(\S+)/,x=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,R=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,k=/^\s*FORMAT=(\S+)\s*$/,F=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,z={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let Q,G;for((w.pos>=w.byteLength||!(Q=d(w)))&&o(1,"no header found"),(G=Q.match(_))||o(3,"bad initial token"),z.valid|=1,z.programtype=G[1],z.string+=Q+`
`;Q=d(w),Q!==!1;){if(z.string+=Q+`
`,Q.charAt(0)==="#"){z.comments+=Q+`
`;continue}if((G=Q.match(x))&&(z.gamma=parseFloat(G[1])),(G=Q.match(R))&&(z.exposure=parseFloat(G[1])),(G=Q.match(k))&&(z.valid|=2,z.format=G[1]),(G=Q.match(F))&&(z.valid|=4,z.height=parseInt(G[1],10),z.width=parseInt(G[2],10)),z.valid&2&&z.valid&4)break}return z.valid&2||o(3,"missing format specifier"),z.valid&4||o(3,"missing image size specifier"),z},f=function(w,_,x){const R=_;if(R<8||R>32767||w[0]!==2||w[1]!==2||w[2]&128)return new Uint8Array(w);R!==(w[2]<<8|w[3])&&o(3,"wrong scanline width");const k=new Uint8Array(4*_*x);k.length||o(4,"unable to allocate buffer space");let F=0,z=0;const Q=4*R,G=new Uint8Array(4),K=new Uint8Array(Q);let V=x;for(;V>0&&z<w.byteLength;){z+4>w.byteLength&&o(1),G[0]=w[z++],G[1]=w[z++],G[2]=w[z++],G[3]=w[z++],(G[0]!=2||G[1]!=2||(G[2]<<8|G[3])!=R)&&o(3,"bad rgbe scanline format");let te=0,ne;for(;te<Q&&z<w.byteLength;){ne=w[z++];const Me=ne>128;if(Me&&(ne-=128),(ne===0||te+ne>Q)&&o(3,"bad scanline data"),Me){const Ue=w[z++];for(let q=0;q<ne;q++)K[te++]=Ue}else K.set(w.subarray(z,z+ne),te),te+=ne,z+=ne}const ye=R;for(let Me=0;Me<ye;Me++){let Ue=0;k[F]=K[Me+Ue],Ue+=R,k[F+1]=K[Me+Ue],Ue+=R,k[F+2]=K[Me+Ue],Ue+=R,k[F+3]=K[Me+Ue],F+=4}V--}return k},g=function(w,_,x,R){const k=w[_+3],F=Math.pow(2,k-128)/255;x[R+0]=w[_+0]*F,x[R+1]=w[_+1]*F,x[R+2]=w[_+2]*F,x[R+3]=1},A=function(w,_,x,R){const k=w[_+3],F=Math.pow(2,k-128)/255;x[R+0]=Ls.toHalfFloat(Math.min(w[_+0]*F,65504)),x[R+1]=Ls.toHalfFloat(Math.min(w[_+1]*F,65504)),x[R+2]=Ls.toHalfFloat(Math.min(w[_+2]*F,65504)),x[R+3]=Ls.toHalfFloat(1)},m=new Uint8Array(e);m.pos=0;const p=u(m),v=p.width,M=p.height,y=f(m.subarray(m.pos),v,M);let C,I,T;switch(this.type){case zt:T=y.length/4;const w=new Float32Array(T*4);for(let x=0;x<T;x++)g(y,x*4,w,x*4);C=w,I=zt;break;case En:T=y.length/4;const _=new Uint16Array(T*4);for(let x=0;x<T;x++)A(y,x*4,_,x*4);C=_,I=En;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:v,height:M,data:C,header:p.string,gamma:p.gamma,exposure:p.exposure,type:I}}setDataType(e){return this.type=e,this}load(e,t,n,i){function s(o,a){switch(o.type){case zt:case En:o.colorSpace=Mt,o.minFilter=ct,o.magFilter=ct,o.generateMipmaps=!1,o.flipY=!0;break}t&&t(o,a)}return super.load(e,s,n,i)}}class $A{constructor(e){this.scene=e,this.ambientLight=null,this.directionalLight=null,this.dirLightHelper=null,this.rgbeLoader=new JA,this.init()}init(){this.setupAmbientLight(),this.setupDirectionalLight(),this.setupEnvironmentMap()}setupAmbientLight(){this.ambientLight=new vu(16777215,.4),this.scene.add(this.ambientLight)}setupDirectionalLight(){this.directionalLight=new Qc(16777215,1.43),this.directionalLight.position.set(1.35,1.57,.9),this.directionalLight.castShadow=!0,this.directionalLight.shadow.bias=0,this.directionalLight.shadow.radius=1,this.directionalLight.shadow.mapSize.width=1024,this.directionalLight.shadow.mapSize.height=1024,this.scene.add(this.directionalLight),this.dirLightHelper=new Ou(this.directionalLight,1.5,16711680),this.dirLightHelper.visible=!1,this.scene.add(this.dirLightHelper)}setupEnvironmentMap(){this.rgbeLoader.load(Li("textures/environmentMap/2k.hdr"),e=>{e.mapping=mr,this.scene.environment=e})}applySettings(e){if(e.directionalLight){const t=e.directionalLight;this.directionalLight.intensity=t.intensity,this.directionalLight.color.set(t.color),t.position&&this.directionalLight.position.set(t.position.x,t.position.y,t.position.z),this.directionalLight.castShadow=t.castShadow,this.directionalLight.shadow.bias=t.shadowBias,this.directionalLight.shadow.radius=t.shadowBlur,this.directionalLight.shadow.mapSize.width=t.shadowMapWidth,this.directionalLight.shadow.mapSize.height=t.shadowMapHeight}e.ambientLight&&(this.ambientLight.intensity=e.ambientLight.intensity,this.ambientLight.color.set(e.ambientLight.color))}getSettings(){return{directionalLight:{intensity:this.directionalLight.intensity,color:"#"+this.directionalLight.color.getHexString(),castShadow:this.directionalLight.castShadow,shadowBias:this.directionalLight.shadow.bias,shadowBlur:this.directionalLight.shadow.radius,shadowMapWidth:this.directionalLight.shadow.mapSize.width,shadowMapHeight:this.directionalLight.shadow.mapSize.height,posX:this.directionalLight.position.x,posY:this.directionalLight.position.y,posZ:this.directionalLight.position.z,showHelper:this.dirLightHelper.visible,position:{x:this.directionalLight.position.x,y:this.directionalLight.position.y,z:this.directionalLight.position.z}},ambientLight:{intensity:this.ambientLight.intensity,color:"#"+this.ambientLight.color.getHexString()}}}getLights(){return{ambient:this.ambientLight,directional:this.directionalLight,directionalHelper:this.dirLightHelper}}}class ey{constructor(e){this.scene=e,this.dustParticles=null,this.dustGeometry=null,this.dustMaterial=null,this.dustPositions=null,this.dustVelocities=null,this.dustSizes=null,this.params={count:1150,size:.0095,sizeRandomness:1.4,color:"#0d529c",opacity:1,speed:.5,horizontalRange:3,verticalRange:2,verticalOffset:1,visible:!0,blur:.31,depthBlur:!1,depthBlurStrength:.16,depthFocusDistance:2,depthFocusRange:1},this.init()}init(){this.createDustParticles()}createDustParticles(){var t,n;this.dustParticles&&(this.scene.remove(this.dustParticles),(t=this.dustGeometry)==null||t.dispose(),(n=this.dustMaterial)==null||n.dispose()),this.dustGeometry=new Nt,this.dustPositions=new Float32Array(this.params.count*3),this.dustVelocities=new Float32Array(this.params.count*3),this.dustSizes=new Float32Array(this.params.count);for(let i=0;i<this.params.count;i++){const s=i*3;this.dustPositions[s]=(Math.random()-.5)*this.params.horizontalRange*2,this.dustPositions[s+1]=Math.random()*this.params.verticalRange+this.params.verticalOffset,this.dustPositions[s+2]=(Math.random()-.5)*this.params.horizontalRange*2,this.dustVelocities[s]=(Math.random()-.5)*.001,this.dustVelocities[s+1]=(Math.random()-.5)*5e-4,this.dustVelocities[s+2]=(Math.random()-.5)*.001,this.dustSizes[i]=this.params.size*(1+(Math.random()-.5)*this.params.sizeRandomness)}this.dustGeometry.setAttribute("position",new _t(this.dustPositions,3)),this.dustGeometry.setAttribute("size",new _t(this.dustSizes,1));let e={color:this.params.color,size:this.params.size,transparent:!0,opacity:this.params.opacity,sizeAttenuation:!0,alphaTest:.01};this.params.blur>0&&(e.map=this.createBlurTexture(this.params.blur)),this.dustMaterial=new Sa(e),this.dustParticles=new kc(this.dustGeometry,this.dustMaterial),this.dustParticles.visible=this.params.visible,this.scene.add(this.dustParticles)}createBlurTexture(e){const n=document.createElement("canvas");n.width=32,n.height=32;const i=n.getContext("2d"),s=32/2,o=32/2,a=32/2,l=i.createRadialGradient(s,o,0,s,o,a);l.addColorStop(0,`rgba(255, 255, 255, ${1-e})`),l.addColorStop(.5,`rgba(255, 255, 255, ${(1-e)*.5})`),l.addColorStop(1,"rgba(255, 255, 255, 0)"),i.fillStyle=l,i.fillRect(0,0,32,32);const c=new _a(n);return c.needsUpdate=!0,c}update(e){if(!this.dustParticles||!this.params.visible)return;const t=this.dustGeometry.attributes.position.array,n=this.dustGeometry.attributes.size.array;for(let i=0;i<this.params.count;i++){const s=i*3;if(t[s]+=this.dustVelocities[s]*this.params.speed*e*1e3,t[s+1]+=this.dustVelocities[s+1]*this.params.speed*e*1e3,t[s+2]+=this.dustVelocities[s+2]*this.params.speed*e*1e3,this.params.depthBlur&&window.camera){const o=new P(t[s],t[s+1],t[s+2]),a=window.camera.position,l=o.distanceTo(a),c=this.params.depthFocusDistance,h=this.params.depthFocusRange,d=Math.abs(l-c);let u=1;d>h&&(u=1-Math.min(d-h,2)/2*this.params.depthBlurStrength),n[i]=this.dustSizes[i]*u}t[s]>this.params.horizontalRange&&(t[s]=-this.params.horizontalRange),t[s]<-this.params.horizontalRange&&(t[s]=this.params.horizontalRange),t[s+2]>this.params.horizontalRange&&(t[s+2]=-this.params.horizontalRange),t[s+2]<-this.params.horizontalRange&&(t[s+2]=this.params.horizontalRange),(t[s+1]<this.params.verticalOffset-.5||t[s+1]>this.params.verticalOffset+this.params.verticalRange+.5)&&(t[s+1]=Math.random()*this.params.verticalRange+this.params.verticalOffset)}this.dustGeometry.attributes.position.needsUpdate=!0,this.params.depthBlur&&(this.dustGeometry.attributes.size.needsUpdate=!0)}updateCount(e){this.params.count=e,this.createDustParticles()}updateSize(e){if(this.params.size=e,this.dustMaterial.size=e,this.dustSizes){for(let t=0;t<this.params.count;t++)this.dustSizes[t]=e*(1+(Math.random()-.5)*this.params.sizeRandomness);this.dustGeometry.attributes.size.needsUpdate=!0}}updateSizeRandomness(e){this.params.sizeRandomness=e,this.createDustParticles()}updateColor(e){this.params.color=e,this.dustMaterial.color.set(e)}updateOpacity(e){this.params.opacity=e,this.dustMaterial.opacity=e}updateSpeed(e){this.params.speed=e}updateBlur(e){this.params.blur=e,e>0?this.dustMaterial.map=this.createBlurTexture(e):this.dustMaterial.map=null,this.dustMaterial.needsUpdate=!0}updateDepthBlur(e){this.params.depthBlur=e}updateDepthBlurStrength(e){this.params.depthBlurStrength=e}updateDepthFocus(e,t){this.params.depthFocusDistance=e,this.params.depthFocusRange=t}updateRange(e,t){this.params.horizontalRange=e,this.params.verticalRange=t,this.createDustParticles()}updateOffset(e){this.params.verticalOffset=e,this.createDustParticles()}setVisible(e){this.params.visible=e,this.dustParticles.visible=e}applyPreset(e){switch(e){case"Light Dust":Object.assign(this.params,{count:300,size:.003,opacity:.2,speed:.3,color:"#ffffff"});break;case"Heavy Dust":Object.assign(this.params,{count:800,size:.008,opacity:.4,speed:.8,color:"#d4c4a8"});break;case"Magical Sparkles":Object.assign(this.params,{count:150,size:.01,opacity:.6,speed:.2,color:"#ffd700"});break;case"Reset Dust":default:Object.assign(this.params,{count:500,size:.005,opacity:.3,speed:.5,color:"#ffffff"});break}this.createDustParticles()}applySettings(e){e&&(Object.assign(this.params,e),this.createDustParticles(),e.blur!==void 0&&this.updateBlur(e.blur),e.depthBlur!==void 0&&this.updateDepthBlur(e.depthBlur),e.depthBlurStrength!==void 0&&this.updateDepthBlurStrength(e.depthBlurStrength),e.depthFocusDistance!==void 0&&e.depthFocusRange!==void 0&&this.updateDepthFocus(e.depthFocusDistance,e.depthFocusRange))}getSettings(){return{...this.params}}getParams(){return this.params}dispose(){var e,t;this.dustParticles&&(this.scene.remove(this.dustParticles),(e=this.dustGeometry)==null||e.dispose(),(t=this.dustMaterial)==null||t.dispose())}}class ty{constructor(){this.managers={},this.defaultSettings=null,this.loadDefaultSettings()}async loadDefaultSettings(){try{const e=await fetch(Li("data/default-settings.json"));this.defaultSettings=await e.json()}catch(e){console.warn("Could not load default settings:",e),this.defaultSettings=this.getFallbackSettings()}}registerManager(e,t){this.managers[e]=t}async saveSettingsToClipboard(){const e=this.gatherAllSettings(),t=JSON.stringify(e,null,2);try{await navigator.clipboard.writeText(t),alert("Settings copied to clipboard!")}catch(n){console.error("Failed to copy to clipboard:",n),alert("Failed to copy settings to clipboard.")}}async importSettingsFromClipboard(){try{const e=await navigator.clipboard.readText(),t=JSON.parse(e);this.applyAllSettings(t),window.app&&typeof window.app.updateAllGUIControls=="function"&&window.app.updateAllGUIControls(),alert("Settings imported from clipboard!")}catch(e){console.error("Failed to import settings:",e),alert("Failed to import settings: "+e.message)}}gatherAllSettings(){const e={};for(const[t,n]of Object.entries(this.managers))n&&typeof n.getSettings=="function"&&(e[t]=n.getSettings());return window.model&&(e.model={position:window.model.position.toArray(),rotation:[window.model.rotation.x,window.model.rotation.y,window.model.rotation.z],scale:window.model.scale.toArray()}),e}applyAllSettings(e){for(const[t,n]of Object.entries(this.managers))n&&typeof n.applySettings=="function"&&e[t]&&n.applySettings(e[t]);e.model&&window.model&&(e.model.position&&window.model.position.fromArray(e.model.position),e.model.rotation&&window.model.rotation.set(e.model.rotation[0],e.model.rotation[1],e.model.rotation[2]),e.model.scale&&window.model.scale.fromArray(e.model.scale))}applyDefaultSettings(){this.defaultSettings&&this.applyAllSettings(this.defaultSettings)}getDefaultSettings(){return this.defaultSettings}getFallbackSettings(){return{background:{gradientTop:"#3865ad",gradientBottom:"#0101bc",gradientAlpha:1},ground:{mode:"Infinite Canvas",color:"#222222",roughness:1,metalness:0,shadowOpacity:.4,receiveShadow:!0,castShadow:!1,visible:!0},dustParticles:{count:1150,size:.0095,sizeRandomness:1.4,color:"#0d529c",opacity:1,speed:.5,horizontalRange:3,verticalRange:2,verticalOffset:1,visible:!0,blur:.31,depthBlur:!1,depthBlurStrength:.16,depthFocusDistance:2,depthFocusRange:1},directionalLight:{intensity:1.43,color:"#ffffff",castShadow:!0,shadowBias:0,shadowBlur:1,shadowMapWidth:1024,shadowMapHeight:1024,posX:1.35,posY:1.57,posZ:.9,showHelper:!1,position:{x:1.35,y:1.57,z:.9}},ambientLight:{intensity:.4,color:"#ffffff"},camera:{position:[.571641187606234,.6054805751022576,-.4710421975258844],rotation:[-2.6821474237876726,.8865063263260724,2.775502273890531],target:[-.04078270409635462,.38393067967272315,-.023247738115800942]},model:{position:[0,-.02,0],rotation:[0,0,0],scale:[1,1,1]}}}saveToLocalStorage(e="threeJsSettings"){const t=this.gatherAllSettings();try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch(n){return console.error("Failed to save to local storage:",n),!1}}loadFromLocalStorage(e="threeJsSettings"){try{const t=localStorage.getItem(e);if(t){const n=JSON.parse(t);return this.applyAllSettings(n),!0}}catch(t){console.error("Failed to load from local storage:",t)}return!1}exportAsFile(e="three-scene-settings.json"){const t=this.gatherAllSettings(),n=JSON.stringify(t,null,2),i=new Blob([n],{type:"application/json"}),s=URL.createObjectURL(i),o=document.createElement("a");o.href=s,o.download=e,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(s)}importFromFile(){return new Promise((e,t)=>{const n=document.createElement("input");n.type="file",n.accept=".json",n.onchange=i=>{const s=i.target.files[0];if(s){const o=new FileReader;o.onload=a=>{try{const l=JSON.parse(a.target.result);this.applyAllSettings(l),e(l)}catch(l){t(l)}},o.readAsText(s)}else t(new Error("No file selected"))},n.click()})}}class ny{constructor(){console.log("[FlexFrame Build] animation-player.js v28.3 - INLINE BUTTON STYLES - Build: 2026-01-20-0930"),this.mixer=null,this.actions=[],this.currentAction=null,this.isPlaying=!1,this.currentTime=0,this.duration=0,this.playbackSpeed=1,this.isVisible=!1,this.alwaysVisible=!1,this.hideTimeout=null,this.hasPlayedOnce=!1,this.createPlayerElements(),this.setupEventListeners()}createPlayerElements(){this.triggerArea=document.createElement("div"),this.triggerArea.className="animation-player-trigger",document.body.appendChild(this.triggerArea),this.container=document.createElement("div"),this.container.className="animation-player",this.container.innerHTML=`
            <div class="player-controls">
                <div class="player-left">
                    <button class="play-pause-btn" id="play-pause-btn" style="height: ${window.innerWidth<=768?"32px":"auto"} !important; min-height: ${window.innerWidth<=768?"32px":"auto"} !important; max-height: ${window.innerWidth<=768?"32px":"none"} !important; padding: ${window.innerWidth<=768?"0 12px":"8px 16px"} !important; font-size: 11px !important; font-weight: 700 !important; line-height: 1 !important; box-sizing: border-box !important; display: flex !important; align-items: center !important; justify-content: center !important;">
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
                    <button class="screenshot-btn" id="screenshot-btn" title="Take Screenshot" style="height: 32px !important; min-height: 32px !important; max-height: 32px !important; padding: ${window.innerWidth<=768?"0":"0 12px"} !important; font-size: 11px !important; font-weight: 700 !important; line-height: 1 !important; box-sizing: border-box !important; display: ${window.innerWidth<=768?"none":"flex"} !important; align-items: center !important; justify-content: center !important;">
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
                    <button class="speed-btn" id="speed-btn" style="height: 32px !important; min-height: 32px !important; max-height: 32px !important; padding: ${window.innerWidth<=768?"0":"0 12px"} !important; font-size: 11px !important; font-weight: 700 !important; line-height: 1 !important; box-sizing: border-box !important; display: ${window.innerWidth<=768?"none":"flex"} !important; align-items: center !important; justify-content: center !important;">
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
        `,document.body.appendChild(this.container),this.initializeElements()}initializeElements(){this.playPauseBtn=this.container.querySelector("#play-pause-btn"),this.playIcon=this.container.querySelector(".play-icon"),this.pauseIcon=this.container.querySelector(".pause-icon"),this.currentTimeDisplay=this.container.querySelector("#current-time"),this.totalTimeDisplay=this.container.querySelector("#total-time"),this.timelineSlider=this.container.querySelector("#timeline-slider"),this.speedBtn=this.container.querySelector("#speed-btn"),this.speedText=this.container.querySelector("#speed-text"),this.speedMenu=this.container.querySelector("#speed-menu"),this.screenshotBtn=this.container.querySelector("#screenshot-btn"),this.onScreenshotRequest=null,setTimeout(()=>{this.playIcon&&this.pauseIcon&&this.updatePlayPauseIcon()},10),this.setVisibility(!0)}setupEventListeners(){this.playPauseBtn.addEventListener("click",()=>{this.togglePlayPause()}),this.screenshotBtn&&this.screenshotBtn.addEventListener("click",()=>{this.onScreenshotRequest&&this.onScreenshotRequest()}),this.timelineSlider.addEventListener("input",e=>{const t=parseFloat(e.target.value)/100;this.seekTo(t)}),this.speedBtn.addEventListener("click",e=>{e.stopPropagation(),this.speedMenu.classList.toggle("show")}),this.speedMenu.addEventListener("click",e=>{if(e.target.classList.contains("speed-option")){const t=parseFloat(e.target.dataset.speed);this.setPlaybackSpeed(t),this.speedMenu.querySelectorAll(".speed-option").forEach(n=>n.classList.remove("active")),e.target.classList.add("active"),this.speedMenu.classList.remove("show")}}),document.addEventListener("click",()=>{this.speedMenu.classList.remove("show")}),document.addEventListener("keydown",e=>{if(!(!this.mixer||!this.currentAction))switch(e.code){case"Space":e.target.tagName!=="INPUT"&&(e.preventDefault(),this.togglePlayPause());break;case"ArrowLeft":this.seekRelative(-.1);break;case"ArrowRight":this.seekRelative(.1);break}}),this.triggerArea.addEventListener("mouseenter",()=>{this.isVisible&&!this.alwaysVisible&&this.showPlayer()}),this.container.addEventListener("mouseenter",()=>{this.isVisible&&!this.alwaysVisible&&(this.clearHideTimeout(),this.container.classList.add("visible"))}),this.container.addEventListener("mouseleave",()=>{this.isVisible&&!this.alwaysVisible&&this.scheduleHide()}),this.triggerArea.addEventListener("touchstart",e=>{this.isVisible&&!this.alwaysVisible&&this.showPlayer()}),this.container.addEventListener("touchstart",e=>{this.isVisible&&!this.alwaysVisible&&(this.clearHideTimeout(),this.container.classList.add("visible"),setTimeout(()=>{this.alwaysVisible||this.scheduleHide()},100))})}showPlayer(){this.clearHideTimeout(),this.container.classList.add("visible"),this.alwaysVisible||this.scheduleHide()}hidePlayer(){this.alwaysVisible||this.container.classList.remove("visible")}scheduleHide(){this.alwaysVisible||(this.clearHideTimeout(),this.hideTimeout=setTimeout(()=>{!this.container.matches(":hover")&&!this.alwaysVisible&&this.hidePlayer()},2e3))}onCanvasInteraction(){this.isVisible&&!this.alwaysVisible&&this.showPlayer()}clearHideTimeout(){this.hideTimeout&&(clearTimeout(this.hideTimeout),this.hideTimeout=null)}setVisibility(e){this.isVisible=e,this.triggerArea.classList.toggle("active",e),e?(this.container.style.display="block",this.alwaysVisible?(this.container.classList.add("always-visible","visible"),this.clearHideTimeout()):(this.container.classList.remove("always-visible"),this.showPlayer())):(this.container.style.display="none",this.container.classList.remove("visible","always-visible"),this.clearHideTimeout())}setAlwaysVisible(e){const t=this.alwaysVisible;this.alwaysVisible=e,e?(this.container.classList.add("always-visible","visible"),this.clearHideTimeout()):(this.container.classList.remove("always-visible"),t&&this.isVisible&&this.scheduleHide())}setMixer(e,t){this.mixer=e,this.actions=[],t&&t.length>0&&(t.forEach(n=>{const i=e.clipAction(n);this.actions.push(i)}),this.actions.length>0&&(this.currentAction=this.actions[0],this.duration=this.currentAction.getClip().duration,this.updateTimeDisplay(),this.updatePlayPauseIcon()))}updatePlayPauseIcon(){if(!this.playIcon||!this.pauseIcon){console.warn("Animation player icons not found");return}this.isPlaying?(this.playIcon.style.display="none",this.pauseIcon.style.display="block"):(this.playIcon.style.display="block",this.pauseIcon.style.display="none")}togglePlayPause(){this.currentAction&&(this.isPlaying=!this.isPlaying,this.isPlaying?(this.currentAction.play(),this.currentAction.paused=!1,this.hasPlayedOnce||(this.hasPlayedOnce=!0,this.clearHideTimeout(),this.startFirstPlayFade())):this.currentAction.paused=!0,this.updatePlayPauseIcon())}seekTo(e){if(!this.currentAction)return;const t=e*this.duration;this.currentAction.time=t,this.currentTime=t,this.updateTimeDisplay(),this.isPlaying||this.mixer.update(0)}seekRelative(e){if(!this.currentAction)return;const n=Math.max(0,Math.min(this.duration,this.currentTime+e))/this.duration;this.seekTo(n),this.updateSliderPosition()}setPlaybackSpeed(e){this.playbackSpeed=e,this.speedText.textContent=`${e}x`,this.currentAction&&this.currentAction.setEffectiveTimeScale(e)}update(e){!this.mixer||!this.currentAction||!this.isPlaying||(this.currentTime=this.currentAction.time,this.currentTime>=this.duration&&(this.currentTime=0,this.currentAction.time=0),this.updateTimeDisplay(),this.updateSliderPosition())}updateTimeDisplay(){this.currentTimeDisplay.textContent=this.formatTime(this.currentTime),this.totalTimeDisplay.textContent=this.formatTime(this.duration)}updateSliderPosition(){const e=this.duration>0?this.currentTime/this.duration*100:0;this.timelineSlider.value=e}formatTime(e){const t=Math.floor(e/60),n=Math.floor(e%60);return`${t}:${n.toString().padStart(2,"0")}`}getSettings(){return{isPlaying:this.isPlaying,currentTime:this.currentTime,playbackSpeed:this.playbackSpeed,isVisible:this.isVisible,alwaysVisible:this.alwaysVisible}}applySettings(e){if(e.playbackSpeed!==void 0&&this.setPlaybackSpeed(e.playbackSpeed),e.currentTime!==void 0){const t=this.duration>0?e.currentTime/this.duration:0;this.seekTo(t)}e.isVisible!==void 0&&this.setVisibility(e.isVisible),e.alwaysVisible!==void 0&&this.setAlwaysVisible(e.alwaysVisible),e.isPlaying!==void 0&&this.currentAction&&(e.isPlaying!==this.isPlaying?this.togglePlayPause():this.updatePlayPauseIcon())}setScreenshotCallback(e){this.onScreenshotRequest=e}setScreenshotButtonVisible(e){this.screenshotBtn&&this.screenshotBtn.style.setProperty("display",e?"flex":"none","important")}}const iy=(r,e,t)=>new Promise(n=>{const i=e==="jpg"?"image/jpeg":e==="webp"?"image/webp":"image/png",s=e==="png"?void 0:t;r.toBlob(n,i,s)}),sy=(r,e)=>{const t=URL.createObjectURL(r),n=document.createElement("a");n.href=t,n.download=e,n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n),setTimeout(()=>URL.revokeObjectURL(t),1e3)},ry=r=>{if(r===0)return"0 Bytes";const e=1024,t=["Bytes","KB","MB","GB"],n=Math.floor(Math.log(r)/Math.log(e));return parseFloat((r/Math.pow(e,n)).toFixed(2))+" "+t[n]},oy=()=>{const r=document.createElement("div");r.className="camera-flash",document.body.appendChild(r),setTimeout(()=>{r.parentNode&&r.parentNode.removeChild(r)},300)},Ei=async(r,e,t,n={})=>{const i={transparent:!1,format:"png",quality:1,filename:"screenshot",width:1920,height:1080,addTimestamp:!0,frameWidth:null,frameHeight:null,containerWidth:null,containerHeight:null,...n};try{console.log("Taking screenshot with settings:",i),oy();const s=r.getSize(new Te),o=t.aspect,a=document.createElement("canvas");a.width=i.width,a.height=i.height;const l=new Jc({canvas:a,antialias:!0,preserveDrawingBuffer:!0,alpha:i.transparent});if(l.setSize(i.width,i.height),l.setPixelRatio(1),l.shadowMap.enabled=r.shadowMap.enabled,l.shadowMap.type=r.shadowMap.type,l.toneMapping=r.toneMapping,l.toneMappingExposure=r.toneMappingExposure,i.transparent)l.setClearColor(0,0);else{const g=r.getClearColor(new ge),A=r.getClearAlpha();l.setClearColor(g,A)}const c=t.clone();if(c.aspect=i.width/i.height,i.frameWidth&&i.frameHeight&&i.containerWidth&&i.containerHeight){const g=i.containerWidth/i.containerHeight,A=i.width/i.height;let m,p;A>g,m=i.frameWidth/i.containerWidth,p=i.frameHeight/i.containerHeight;const v=p,M=t.fov;c.fov=M*v,console.log(`📸 Frame crop: frame ${i.frameWidth}x${i.frameHeight}, container ${i.containerWidth}x${i.containerHeight}, fovScale: ${v.toFixed(3)}, FOV: ${M} -> ${c.fov.toFixed(1)}`)}c.updateProjectionMatrix();let h=null;i.transparent&&e.background&&(h=e.background,e.background=null),l.render(e,c),h!==null&&(e.background=h);let d=i.filename;if(i.addTimestamp){const A=new Date().toISOString().replace(/[:.]/g,"-").slice(0,-5);d+="_"+A}d+="."+i.format;const u=await iy(a,i.format,i.quality);sy(u,d),l.dispose();const f=ry(u.size);return console.log(`📸 Screenshot saved: ${d} (${i.width}×${i.height}, ${f})`),{success:!0,filename:d,size:f}}catch(s){return console.error("Screenshot failed:",s),{success:!1,error:s.message}}},co={takeScreenshot:Ei,quickScreenshot:(r,e,t)=>Ei(r,e,t),transparentScreenshot:(r,e,t)=>Ei(r,e,t,{transparent:!0}),hdScreenshot:(r,e,t)=>Ei(r,e,t,{width:1280,height:720}),uhd4kScreenshot:(r,e,t)=>Ei(r,e,t,{width:3840,height:2160}),thumbnailScreenshot:(r,e,t)=>Ei(r,e,t,{width:400,height:300,filename:"thumbnail"})},tr={abs:"data:image/jpeg;base64,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",back:"data:image/jpeg;base64,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",barbell:"data:image/jpeg;base64,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",biceps:"data:image/jpeg;base64,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",bodyweight:"data:image/jpeg;base64,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",cables:"data:image/jpeg;base64,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",calves:"data:image/jpeg;base64,/9j/2wCEAAgGBgYGBggGBggMCAcIDA4KCAgKDhANDQ4NDRARDA4NDQ4MEQ8SExQTEg8YGBoaGBgjIiIiIycnJycnJycnJycBCQgICQoJCwkJCw4LDQsOEQ4ODg4REw0NDg0NExgRDw8PDxEYFhcUFBQXFhoaGBgaGiEhICEhJycnJycnJycnJ//dAAQABv/uAA5BZG9iZQBkwAAAAAH/wAARCABaAFoDACIAAREBAhEB/8QAlQAAAgMBAQEBAAAAAAAAAAAAAAcEBQYDAgEIAQEAAwEBAQAAAAAAAAAAAAAAAQMEBQYCEAACAQMCAgcFBQcFAAAAAAABAgMABAUREgYhBxMiMTJBUWFicYGRFEJScpIWI4KhorHBFRdDU8IRAAICAQIEBAYDAAAAAAAAAAABAgMRBBIFMUFREyFxoRQiYXKRsUJSgf/aAAwDAAABEQIRAD8Af1FFFALXpNYjJYtSdqyRSoD7xZNBWatshLHdXNmnOYysFTXyVRqT7ABzrZdKGKbI2uHdH6t47zqw/pvjaQf1RCs1iXx0UM9+0SveXC3fWyeeu3eE18gNNBQlGVzeXluWhxWPJluLiRLeH1ea4YIv6j9FBp+YPFQ4PD2WIt+cdnEsW78TAdp/4m1NKDg7hZf20wxlYzfYLeXJTs3LWV0EaNt8hrL2dfIU76Bi26W7BoLSx4pg7LY+QW92/kIJ2Cqz+6sugPsY1l7TMNNAZoyd0a6TR/e0TzI/EncfUU3uIsXHm8DksRKu5b22lhA95lIU/JtKT/DthDjms8nKxZJ7SaGdG5rvjj1DA/iGhUg+w0CKu6u/tK3c+7VFkQg68jqnLSnZwfu/ZbE7/F9mj1+lJPiCyhdby2xwEEYjt7iRByHYUjkPeY86f9jarZWVtZp4beJIh8EUL/igZIooooQf/9B/UUUUBhekadz/AKXZRAsyvNfSKviK20eihfeaSRQPnVVNZ2uC4Ptb2ZlCIqT3MbBdrF+bylvFubrNPTyqBxfkZM5xJcWFqdI4ojamRe8xAkycx+N+XwHtrrx5dmfgu0so1AlktFlnIHhEa7V+rj+VUS1EU5r+i9+x06uF3ThppLnqJPC6xhjKk/VJ4LDovglu7vL524k66V+qtDKBohZR1rpH7EDKCPWmTVJwhirLDcM4ywsNTCtukhkbm0jyASPK582dmJNXdXnMCkwzDFZ+44ckdeokvGVIJRoweVhKjp7rwsdB5mnPSw6T8Vbrm+Hs5b6pkRK8LAeGRI1MsZcesb9x9GNfM5bYuT6LJdpqnddCmPk7JKKfbPUg8d4VkvEmsgZZry2lRpSFXc8elxF1gXQabux86aGHvUyOJsb+M6rc28Uw17+2gbQ+2sDxdO2StMRe4/8AdypHJcjQeFxpGyMPTxKRVv0bZaO9wrY8AI1gxWNNefVOSVHPn2G3L9K+I3RlZKC6JNPumX36G2vTV6l8pSlCS6wlFtJP1wbSiiirTEf/0X9XG7m+z2s9wP8AijeT9Klq7VEygLYy9UDUm3lAHxQ0DEbwpk4Rkrq/ue52Y8/p/erLIXUL8LNK7bri43Eg/cj1bYnyFYjB2GUyebHD9ku2aVw0sh8Ecbjrd5/hPKo+Ty0ttBLjJiRNC7QPF94FG2HUevKuQ1Z8ycc7pNf6+Z72D0knXONiXhV1za6bIZUUj9FcDXD3XB+Fnk5sbSNSfyDZ/itBVNwnYPi+GcTYScpILWIOPRiu5h9TVzXXXI8HJpybXLLwFLLpHver4lwFu/ONIp5dPeZkT+y0zaUvTPC9rJhs0NdkbSW7EeROkg1+QNU6hN0zxzx+mbuEyhHX0Ox4i5NN/dFxX7Pd3f2lpkZog2tvPakxrryWQnt6fm5Gq3owyHVcY3dgvhuIXbXy7Ojaf01lrOHKcSR39zjf3jYu3Fww15NqdvVg/i2qSPhU/oiaa740W8KkIsU6Nry0dUG4fLeKx0b3dCTWF5/jkeg4n8NXw/U0Ke+adaf3LEk/c/QdFFFdI8gf/9J/V8ZQ6sh7mBB+dfaKAVHCNmBnrWfaN0VvcW0jDvJt2Mce7+B+VUFvw5b8T9KBcxA2sM7Xt6wHjWDRUQ/mfbqfPnWs4ckEfFefx45fZZbiaP2Bzr/6FS+je3imnzGWC6s0q2qP7FHWsv1cVU61uXbdufrjBsWrkq5L+TqVKfaG5yft5G/oooq0xhVBxpgF4l4bvsXp++ZDJatprtmj7Uf1PL4Gr+in0ZKbTTTw08p/VCi6M4IIcBlrRIxE8qNJIvmS0ZTn8P5VI6NLNYcyE2hWtseZJNP+26lDtr7dqCrDDW8dnxLnsTGNgAlZU9ElAlB+e+vPRfILy+4gv9O6WG3T8qh20/mKrhXtx12ppejeTXqdU7fEwlFWyhOSXLdCLi8fljHoooqwxn//039QSACTyA5k0VXZq+SyspdRud0YKvx7P+aAwkEf2fP53Lw+K5xlzdyDv0YnSJf0gVc9GdutngHtOsEkvW9fK3tnjSTn7R3VDwOKuIsVex3jb5JLZ7aM/eCtz5nzPd9K7dHEc0IzMV2267NyjvpyUIYwqbR5eE0JNzRRRQgKKKKAwEkS/wC44vIX5XcUtlOnoYoA6t9eVeOjGBLGCWMHVr9TO4PessTtE6/pKmvmLhlPHGUuUbWzW5LgMNWEgiEb7T5LqSdPWo1lDd4LieK5Y77JFkgiTw6dY27tH18gfrQkZlFeIZUniSaM6pIoZT7DXuhB/9R/VV5WyluSsiAOFGhQ9+muvZq0ooDPhZYojGIpAfTbrrUbCWuRx9xeXHUqEu3Vir+MBF2juNamjQUBxSZmHaTQ11B1r7oKKA8ltPKo09zOoPUxBm8t3dUujQUBkbSyvbW+u7maIk3UhlLRjVQWA1Gnf5V1ubC5vHXZCdwIIZxoo0PnWp0FFAR7GBrW1jgY6lBpr3Dv10HwqRRRQH//2Q==",chest:"data:image/jpeg;base64,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",dumbbell:"data:image/jpeg;base64,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",glutes:"data:image/jpeg;base64,/9j/2wCEAAgGBgYGBggGBggMCAcIDA4KCAgKDhANDQ4NDRARDA4NDQ4MEQ8SExQTEg8YGBoaGBgjIiIiIycnJycnJycnJycBCQgICQoJCwkJCw4LDQsOEQ4ODg4REw0NDg0NExgRDw8PDxEYFhcUFBQXFhoaGBgaGiEhICEhJycnJycnJycnJ//dAAQABv/uAA5BZG9iZQBkwAAAAAH/wAARCABaAFoDACIAAREBAhEB/8QAkwAAAgIDAQEAAAAAAAAAAAAABgcBBQADBAgCAQEBAAMBAQAAAAAAAAAAAAAAAQMEBQYCEAACAQMCAwUGBAQFBQAAAAABAgMEBREAEgYhMRMiQVFhBxQycYGRI0JSYhUzcqEWgrHB4WOSosLREQACAQMCBQMFAAAAAAAAAAAAAQIDBBESIQUTMUFxBkJhIkOBkcH/2gAMAwAAARECEQA/AH9rOnM6zQZ7SLu9vtVPRI5j/iEvZzOpwexQbpEGOffyFPodAWzcTQzu6WimkuIjba0yFI4SRyPZyykB8ftyPXVXMt+ujs13gdKNvhttFLy2+dRINjyn0XC/PVfaeIrba6NGrJY6dEA+MhVHlGvmR6aIaS91F0RaiCmkhoiciolVk3KfzKpG4D1YaFOm2pbZYDDQxhFhypjRey2N4rjAwdcRq5qKWqhfLyQfjUwLBi3bER4JXGcPrtUQwV8rwP8Az1Ehwc974T1655aH7i5e8ByRgpGOoGcTK3Q+OgCTsYqWiElYS3Zrl5C27GB1G0aHfdpGmNXw1HNTGTv+8xbUppPWSKQhJBz6gBv3au65veqEU7OB2xEYxyHe7vL5DUVU9Tb40W105qoIEVexQ94Ko290nu9B0OgOeO/3ajiX+N2ooyg9pNRSpMhx0ZI2Kyc/LBx66uqC4Udzplq6GZZoWJG5eoYdVYHmrDxB0Iy8Z2q4dpTb+yrIuUtJIpjmXHX8N8MfpkaouG737lxitHGw93uQ7OZQe6zhS8Mqjz7u0/8AGgwNTU6jU6EP/9B/aXXtDty3+9WS0wz9m8PaTVZAyVjfaI8eG4sh+g0xdK2lqa2u414jqaenaoeglEWBgALGiqMsf6TgddCo1e0Lhbh2x8IT3S30Si728JPSV8hMkwkjZWJd3PMEA7h01p4S424lrqFALdJUZVWEtO8brgj97Kfvqr9pN+nutDHw7QDtqy4MlLBCp+J5WCfbJ+2hLhKart0z26QtDV0bmnqadsjDxMY2H3GhRqSpxDDKLusSRQU+5noN++Z43/mBVQsF2Y3DJ9NcNVcYau4wVY7wKptIPjvXr9NWVuqJpYg1VJ2UY6c8uT6DoPmdDVdQxz3C4y0DrHT0scczB25qZJQjYx189AETVN6vtSjWcxrSW9i0rzMUSWYqVWKNsH4AdxJ5eGvq78UcQ2aiMUdplYIMGUNEI8+Ybfk66QKeit8cdskwI1xscjLHqzB18WPPnpa8YXaoIk7V2jA6j/by0BZ+z+Ok454rvFXxXRQ1TUEUUNFE/wCIsbSEySNn9WAMeWr+98L0PDvElmvtDI0VtpalWqoGJcRoc96NjlsAkEg55Z0vfZxX1nDl1W4V0Zipb6va0bt0dIXMJb/uH256aXE089fZqyoWEvRRLlpgcgctxVh1xjx0IMYEEZHMHodTqh4MrHuHCloq5DlnpkBJ690bP/XV9oQ//9F3Xy6Cz2yeu29pIoCQRfrlkISNfDkWIz6aA+Da2Sh4eutxrnBqaurkG8DLzszbEKIuWbcW6Dw1de0uZ4LFTyKu5RVxlx6BJCP740A2SGktzR1TSMncdmct8G47T2Q8GdeQP5ckjQqLjgDhWnreIq7iKrEkgts5p6Q1AUM02wM0gRchFQPhR1z1PLXH7V+GobTXR8Z0IMa1TrT3JVwAJCPwph4ZfG1s9eWjL2eVYuNLdLhEoSllrOzp1XkAsUUcZAHpjGo9pbQ1Fkhs0ihmudQkYVvh2x/isT9gNB3F3bauuqQtNEpmLYBQZVhn9SNzHz6eui6mtcFJPHStFkVS7Kgtnnghxu+uttisUVuFEtO5lopPwVZ+9JTTAck3HmY28B9PLVncN8N1pIT3T+fHMDLKMj0PhoUCr/LPaXeOBCkJ+CRzsXHqzaDbVaJeN+J6awyyMsDEzVsoBG2nj7z7N3Pc5woJHjnTcvlnqKyeOKMIlRKGYSyjelPCvxzFT1fy+g0PcGUlv4d43KU5aSO7QvCtRKd0jOuJAzH9/ZnQgXcZcIUNz4ejp6OBY5LRGWoI1OwbEXBhDc9uQowfAgap+FbhTzcLT0BldmnpmqIoqpAkjxyjs9nIlXIbu8vqBo9ucckttrIohmR4JVQfuKED++k+1wt94tNAnON41iB2cmSQKsTSJ6lRhgeuAeugQT+y27ytQNYKvAkpVaSnHiqhyksJ8jG5H0bTE0l/Z6vuvGMNHCCY0iqQz8zkHByx8SSo06NCM//Sc3E9vFztMlMwz3lYfTl/vpX3DhyrneOhplJklIhjXwBPifTxOnO6hlKnodcMNvijrBU7e8ikL825E/bQGvh+y03D1npLPS96OmTDSHq7sd0kjerMSdLj2k32hm4hobb2fvElsV3aN3ZYe1mCHM3Z95lRQO6CMltNh3WNGkc4VAWY+gGTry9WyVFdxdcKqqbCyTGRz+ov+Jt/yhgNYbicoU247Ppk6fBrWnc3sKdZOUFmTivdjovHdjRprzdaelFXBFTyRNgy0xiEKsF+EqYiWQjwJzomobhQXyOG5RByJsxSlyoNPJCwldZOnTGcjqOehi3Xal/hMlKoUd3uu3gR8tA/+JprXJebbHKQt0iSMEDG2TeI3dfUwsw1rU68otZk5JxbeezisnXuuF068KmijGhOnWhCLitKlCrNQ3itts5GHWcQT3l6g26KMW7aIzUzKXeoRTy2qe6kZPMDx6nQRVXymor9brpV06xy2+dZRLSDsu0C5VoZowWQ5U91l555aKrLdaWis5UBZTIoC45FR8v/AJpa8Y7Z5HnpeTnnsH5vl66+efUUoS15cnuu3g2I8MtZU7mlK2UI04tQqfczH3OXX+HpuCeKphiqYG3xTIskbjoVYblP1B0pL7wa9pv1Q9ID7jXO1TTgfkdjmSP6Mcj0Ppou9l9ZJVcG0KTHv04MQ89nKSP/AMHGimspY6uNVcZKMHU+vT/TXRW+545pxk4vqm0/wB/BthFFcJK5175iIB/qI0c60wQrCuFGNbtCH//Tf2s1ms0BT8T1ho7NOFIEtTimiz+qXun7Lk6QnHNPLab1Azp2cMkZxt6dpvLSc/PBXTi4ylzX2yFjiKHfUP8APG1c/TdoerOHoOLFDXCR4/e8NDCqqRFBH3O3beCe0k6KB01jrU+ZBwzjJu8NvXZ3MLhR1acpr4e23yKluJGSIpE21cYyfDQ5UVVXVVsdVTxu0cB3uwUnIJ25yPU6ZvF/stsVvpWqLRPVb0A7k0u9WPiR3Rrt9mHDzng/jSGcFjXI9PETzIVKZiuP80mda9OzUXmTzs1+zr3vqOdWCjQp8v6oybeN9EtS6eABpOImjjChyQOqeI89aXr3uVdTQU+TLJLGExzOdw5/TV1wh7PKe+Cnku080cTLnMTYdihwyliD6HR8PZrw/ZagT26oqIo5x2YlkKSPFIfhJYqCUb4WHLUVliSerZMyz9TuVGUOTico4ztgIeCJUt1fNaSAiVcQqaZc/o5FVHlsZfto80sGrZDerPXMvZTUk6086r+nHZMB6FWOmfrdPLMzU6jU6A//1H9rNZrNACnElvatq847u0Ifl4/66008TU7lsY7oQeirokqgN/TVfMB5aFBO+iSqjZCDsJwPU/8AA0VcIWlbXYYoGXDVBaeVT/1OgPyQAarKpVMkYIBHlj10ZYAGAMAcgBoGLKltklpraihUH8GZmh8AR4Y/qQ6upg9TAV8T0+Y5jVjeVX+JxnAyUXJx15tqEA8hoChe1SSVInI7xKsT+4cs/wB9H8ZJRSepAJ+2qiMDly8dXCfAvyGgZOp1Gp0If//Z",hamstring:"data:image/jpeg;base64,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",kettlebell:"data:image/jpeg;base64,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",machine:"data:image/jpeg;base64,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",quads:"data:image/jpeg;base64,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",shoulders:"data:image/jpeg;base64,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",triceps:"data:image/jpeg;base64,/9j/2wCEAAgGBgYGBggGBggMCAcIDA4KCAgKDhANDQ4NDRARDA4NDQ4MEQ8SExQTEg8YGBoaGBgjIiIiIycnJycnJycnJycBCQgICQoJCwkJCw4LDQsOEQ4ODg4REw0NDg0NExgRDw8PDxEYFhcUFBQXFhoaGBgaGiEhICEhJycnJycnJycnJ//dAAQABv/uAA5BZG9iZQBkwAAAAAH/wAARCABaAFoDACIAAREBAhEB/8QAkwAAAgMBAQEAAAAAAAAAAAAABgcABAUDCAIBAQACAwEAAAAAAAAAAAAAAAABAgMEBQYQAAIBAwIDBQYFAQYHAAAAAAECAwQFEQASBiExEyJBUWEUFTJCcYEHI1JikaEWJCZD0fAzNFNykrHhEQACAgEDAwMEAwAAAAAAAAABAgADEQQSITFBUQVhgQYiMnETcuH/2gAMAwAAARECEQA/AH8dTUOppEmprnPUU9NGZamVIYx1eRgi/wAsRoHq+IBxJUPTUkxitCtszGxV6nwLMy81jPgo5kczy5aRL19eLiO40VnpcS0tHUCor5xzQSxgiOFW+ZgW3N5YHjrnaqv2I1UZ5+0VM0lOF55jD7AxHly1crkjs9v9op1VnSP2eigjAVVeXkvIYAyfHw1yt9KlBQLWVibyiqshQb2AHkB8ozpJgzcOGbk3E1Fd0Q1FmjqEqJYVBaaHYd+yNPnRnAxjmo0yKO4UdwVmpJll2HDqMhlPk6Nhl+41k1FwghpzVKpgTcIxjnJuPQFc7f8AfPVUWr3rOtdO2+ZPhKs0bhcdN0RT7jppEKdTQ9JaamkiMtvq54GXvbC7Spn90cxfI+hGrNlvfvBnpKlVjrogWZUzskQHaXTPMYPJlPT1BBKRNjU1NTSJ/9B/HVC83SKz2+WtlG5hhIY843yNyRc+Az1PgNXzpd/i5VyU1rt0ak7Zp3BABOWEbFeQ++kkAkgAZJOAB5nelSmuMc1xvdUGJUsahwNsajniJX3BF8gBk+JJ1k2m30tHfKenp4JKanqYDVJFv7vfk27gpzsJ6lMkDQnwvJVcTzzUddUNSCnIa3wEjY8q97fUDxU/Djw66MYbmJbzbu3XspRTSQMp6rLDJl4/qA2fUagEMAynIPQy9lb1O1dilGU4ZTwQfcTd4kZWuVqtijMUQaoY56svcTP8k6tXCXctNalOIpV7WqxyLR5wEJ8Ax6+g1hXWq/xWTIRj2ZCpz0BZs6zKziCairqiavikhNR2Zo5GU7DARtUo3TIIOR4amUhjdLXFcqRYKF5I6yMboZYsbY3Hw7weWCeo8tCNRxhdOE54aPiKARvISIaiDM1PIV+La0ffQjyYa1qK+XKeLs7VRSyjHemkxBEPVpZcf0BOlZxxdrlDxVDDcZYJUjhG1KYM8MW5u+rdoAWJPVhjWO52rrLqNxHabvpulr1Wrr09thrV8/cBk5xwP9jbpuM6auiNRTtuRR+fGOZVf+oP2+eh2W6mm4ptktO4CvUxdOeUnzTyKPqGB+w1XpLdRVtqir6SYw1US74ZYn76HHQH50Pk2dDtvrRV8R21qtcLb6iOetmQYQU0Thu1KDptcqGx4c9Y69QGKqw2lhkdwZsaz0h6UtupY2JS22wEbXTPAJHce89BamoCCMg5B5gjU1sTkz//0X8dJjjriVK/iapo2f8AudmAhjjA+OpkGZGA8TghB9/PTn15z4lsppaeXi+aRnmuV5rBBg9wQI79m2P1MVPPy1r6vd/Cdvz+p2Pp9aT6hWLuc8J/c9/gZg9cKmqtV8onmnakR1MX5WCyEnduY9C27l5eGjhnhlkiqUqXnkkCvFWlRvSpj+EukfLbIncOlXf6iS4FizFmUDBHUAHu49dx0XcNVtfT0lFWTRPCrHG48gxUmPtEz1RipHo2RqNGSagD26fqZPqJFXXuykEsBuI6bscwyudzWSqoLkUx2tLJFyOR2kR37R6c9aBu0ksVNFUgqsffiB5jJGCRnx1T4jSir7G9wgj7OsiqIZZYUG1CW7rSqPl3dGA5HrrvRVlLcKZYplDJ69Vb06YOtmcWaU9fNLEQjtgDlz5/6DSd4tkb37Bhgz7WUlTyUnvKg8zkcz56ZdzhjhixFUOseCcHB6D5Ry/k6T9/Es0ryo3KFg5I+Ic+43qcjOquoZSp6EYmSi5qLq7k/Ktgw+IZWOu95Jb7ZQSijnqZkikmUbkAc4LtHkZx15Y1br7fc+BeL7bPegklNNJsknjyYpqeYGGYENz5K/NToMsy3RKmlulHSSsgl3ssak4kiw8nZ/qGCGIHTPPTt43gi4q4Jp61E7WWApUwsgzkYw4HoVOtGvTMu4nO6shk9x4nqdX61VYKUrKijVo1WoB/KtyR9+evGc48Qo4GrGqrAsDuZXt889AZD1ZaeQpGf/Dbok0BfhvJ7upTaKo4kr0S7UUh6SxzRxiVR+6J17w8iDo910AcjPmeRZSrFT1UkHHtP//SdfEdz9z2OuuIz2kMTdiBzJlfuRKPq7DS14osdVceG7Xw9TsiTQiOaomkyFjCKUZtqgszu7HCqMnRd+JhkHCzvGSClTSsdpwcCZScHz0GW+suEbTn2tqmomg7lU/IIkhzkZ5hiORx9tVZQylT0My0XPTYttfDIcjPmBPDnAdTxHe5rRQFo6KgZfeVylADBm/SgJHabc7E+X4m8i6uIeDKGo4cit1qgWKS2Q7KBAPijUDdC3id+3Oeu7B0NfhQRRXjiG0oxdW7CrLnxkIaGQ/faNNIkKCzHAAyT6DUgADAGJWyx7GLWMWJOST5MRXD0k1xpqu2VSlhNC0Mbk5Pd+En6HXOghqmp/a4ecqZFRF47kO1mA8enTV/hyNXvm9MiCeR2Tb0USN2mP662LHQyGor2jQ/81L2a/RsamVmDXJWVcCU9JG1TVVI2wwgd5z1y/6Y16kfzoL4gsjWqgjhqQDVszdrKOW5iDy/+ac9sgS2VU1XHCXh2mOWoUbl3scyDI6KOQ8tDfHNJTV1IZV29QcjBGD/AL5aRNscLwwfhdTQRrispadLusyEo4qVHtLsrJgglcp9NUrbfZaCGNKSL3jZ7iGlEmQHic/8WGVV5d1jnco6Hw0b2rZeeD6aOM8qugEOfUxdk39dKWzSxQ0XZKTT3KkcbsHAaaE7TvXz5Muf50gS5UXe40DxOwWP3K8dVShcjaNoFXAP297p66dEMiTxRzxnKSKHQ+jDI0jr4faYd0XLtXLH6SKQ405bCGFjtgb4hSQBvr2a6SDP/9N2cQ25brZqyhb/ADI8r/3IQ6/1XSlnoKykiAiz3F28/Iadh1jVdkp5t3dHPOkQS/Cm0Swx3S91A79ZItPCT1KQ5Ln7u5H20YcRXNLbbn5B6ipzBTx5xlmByx/ai5Y6t22jjt9DBSRDCxr0HmSWP9ToXvm+vu+3/Lh/Kj9ACGkIHmzYGfIaRMvh20tSuJgCKWNQ0cjgKVMa4O9R5quRq5w/2iUskkhYTymRhswWy7Md3PkOur1zeO32YJGMzVLqqjyVe8zfxqWeIKiNjO7vMPMH/TSTLNPQ00VAqMsjxqncAkZQQOpwuBk+Ol1xpb1ipZKm0Mzwudk9KxyVY/MmeYPmv8aZ9xkWGAqvwN4j5W89Le5BpaiUYJhZXapQdCowFP1ByRpEOPw47T+x1vEnh2oUHqFEr4B0M8ccJNS3Q8RW5fyKth7dEOiTHkJh6SdG/dz8dbX4cs9PR11tc5EMwnhyc5WYd7HpvU/zoynhjqIXgmXdHIpVgfI6SIq6K0vUQqrrnBGD6aaVHH2VHTxfojRf4UDVGktUVONuM45Z89ag5ADy5aRP/9R/HU1DqaRJrHe3gytIRzJ/962NcyBnSIO3K3vUSRHwjBwPrrpRwPCAMYxrZcDPTXMAeWkTPqommVgRyIwdZtLZE9nqEdfzXdWVj12gHu/TnokwPLX0ANx5aRMWx2/3fU5UYVlMZ9B8Sj7aI9VwBuHLx1Y0iTU1NTSJ/9k="};function ic(r){const e={hamstrings:"hamstring","body weight":"bodyweight",machines:"machine"},t=r.toLowerCase();return e[t]||t}class nr{setupSearchListener(){if(this.menuType!=="search")return;const e=document.getElementById("searchInput"),t=document.getElementById("searchActionBtn"),n=t==null?void 0:t.querySelector(".search-icon"),i=t==null?void 0:t.querySelector(".clear-icon");if(document.getElementById("searchSuggestions"),!e||!t)return;const s=()=>{this.searchQuery&&this.searchQuery.length>0?(n.style.display="none",i.style.display="block"):(n.style.display="block",i.style.display="none")};e.addEventListener("input",o=>{this.searchQuery=o.target.value.toLowerCase().trim(),s(),this.filterDataForMenu(),this.renderVirtualizedGrid()}),e.addEventListener("keydown",o=>{o.key==="Enter"&&(this.searchQuery=e.value.toLowerCase().trim(),s(),this.filterDataForMenu(),this.renderVirtualizedGrid())}),t.addEventListener("click",()=>{this.searchQuery&&this.searchQuery.length>0?(e.value="",this.searchQuery="",s(),this.filterDataForMenu(),this.renderVirtualizedGrid(),e.focus()):(this.searchQuery=e.value.toLowerCase().trim(),s(),this.filterDataForMenu(),this.renderVirtualizedGrid())}),this.toggleBtn&&this.toggleBtn.addEventListener("click",()=>{this.menuType==="search"&&this.isOpen&&setTimeout(()=>{window.innerWidth>768&&e.focus(),s()},150)})}setupSearchFilters(){if(this.menuType!=="search")return;console.log("🔍 setupSearchFilters called for search menu");const e=document.getElementById("typeFilters"),t=document.getElementById("muscleFilters"),n=document.getElementById("equipmentFilters");if(console.log("🔍 Filter containers found:",{typeFilters:e,muscleFilters:t,equipmentFilters:n}),!t||!n){console.error("❌ Filter containers not found in DOM");return}e&&(e.style.display="grid",e.style.gridTemplateColumns="repeat(2, 1fr)",e.style.gap="8px",["Strength","Cardio"].forEach(c=>{const h=document.createElement("div");h.className="filter-thumbnail type-filter-thumbnail",h.dataset.value=c,h.style.height="30px",h.style.minHeight="30px",h.style.display="flex",h.style.alignItems="center",h.style.justifyContent="center",h.style.aspectRatio="unset";const d=document.createElement("div");d.className="filter-thumbnail-label",d.textContent=c,d.style.position="relative",d.style.transform="none",d.style.left="auto",d.style.bottom="auto",h.appendChild(d),h.addEventListener("click",()=>{const u=this.settings.glowColor||"#8d0000";this.selectedTypeFilter===c?(this.selectedTypeFilter=null,h.classList.remove("selected"),h.style.removeProperty("border"),h.style.removeProperty("background-color"),h.style.removeProperty("box-shadow"),this.setMuscleEquipmentFiltersEnabled(!0,t,n)):(e.querySelectorAll(".filter-thumbnail").forEach(g=>{g.classList.remove("selected"),g.style.removeProperty("border"),g.style.removeProperty("background-color"),g.style.removeProperty("box-shadow")}),this.selectedTypeFilter=c,h.classList.add("selected"),h.style.setProperty("border",`2px solid ${u}`,"important"),h.style.setProperty("background-color",`${u}33`,"important"),h.style.setProperty("box-shadow",`0 0 12px ${u}88`,"important"),c==="Cardio"?(this.selectedMuscleFilters.clear(),this.selectedEquipmentFilters.clear(),t.querySelectorAll(".filter-thumbnail").forEach(g=>{g.classList.remove("selected"),g.style.removeProperty("border"),g.style.removeProperty("background-color"),g.style.removeProperty("box-shadow")}),n.querySelectorAll(".filter-thumbnail").forEach(g=>{g.classList.remove("selected"),g.style.removeProperty("border"),g.style.removeProperty("background-color"),g.style.removeProperty("box-shadow")}),this.setMuscleEquipmentFiltersEnabled(!1,t,n)):this.setMuscleEquipmentFiltersEnabled(!0,t,n)),this.filterDataForMenu(),this.renderVirtualizedGrid()}),e.appendChild(h)})),console.log("🔍 Sample exercise data:",this.allExercises[0]);const i=["Chest","Back","Shoulders","Biceps","Triceps","Abs","Quads","Glutes","Hamstrings","Calves"],s=["Barbell","Dumbbell","Cables","Machines","Kettlebell","Body Weight"];console.log("🔍 Using predefined filters:",{muscleCount:i.length,equipmentCount:s.length,muscles:i,equipment:s}),t.style.display="grid",t.style.gridTemplateColumns="repeat(2, 1fr)",t.style.gap="8px",i.forEach(l=>{const c=document.createElement("div");c.className="filter-thumbnail",c.dataset.value=l;const h=ic(l);if(tr[h]){const u=document.createElement("img");u.src=tr[h],u.alt=l,u.className="filter-thumbnail-img",c.appendChild(u)}const d=document.createElement("div");d.className="filter-thumbnail-label",d.textContent=l,c.appendChild(d),c.addEventListener("click",()=>{const u=this.settings.glowColor||"#8d0000";this.selectedMuscleFilters.has(l)?(this.selectedMuscleFilters.delete(l),c.classList.remove("selected"),c.style.removeProperty("border"),c.style.removeProperty("background-color"),c.style.removeProperty("box-shadow")):(this.selectedMuscleFilters.clear(),t.querySelectorAll(".filter-thumbnail").forEach(g=>{g.classList.remove("selected"),g.style.removeProperty("border"),g.style.removeProperty("background-color"),g.style.removeProperty("box-shadow")}),this.selectedMuscleFilters.add(l),c.classList.add("selected"),c.style.setProperty("border",`2px solid ${u}`,"important"),c.style.setProperty("background-color",`${u}33`,"important"),c.style.setProperty("box-shadow",`0 0 12px ${u}88`,"important")),this.filterDataForMenu(),this.renderVirtualizedGrid()}),t.appendChild(c)});const o=document.getElementById("clearMuscleFilters");o&&o.addEventListener("click",()=>{this.selectedMuscleFilters.clear(),t.querySelectorAll(".filter-thumbnail").forEach(l=>{l.classList.remove("selected"),l.style.removeProperty("border"),l.style.removeProperty("background-color"),l.style.removeProperty("box-shadow")}),this.filterDataForMenu(),this.renderVirtualizedGrid()}),n.style.display="grid",n.style.gridTemplateColumns="repeat(2, 1fr)",n.style.gap="8px",s.forEach(l=>{const c=document.createElement("div");c.className="filter-thumbnail",c.dataset.value=l;const h=ic(l);if(tr[h]){const u=document.createElement("img");u.src=tr[h],u.alt=l,u.className="filter-thumbnail-img",c.appendChild(u)}const d=document.createElement("div");d.className="filter-thumbnail-label",d.textContent=l,c.appendChild(d),c.addEventListener("click",()=>{const u=this.settings.glowColor||"#8d0000";this.selectedEquipmentFilters.has(l)?(this.selectedEquipmentFilters.delete(l),c.classList.remove("selected"),c.style.removeProperty("border"),c.style.removeProperty("background-color"),c.style.removeProperty("box-shadow")):(this.selectedEquipmentFilters.clear(),n.querySelectorAll(".filter-thumbnail").forEach(g=>{g.classList.remove("selected"),g.style.removeProperty("border"),g.style.removeProperty("background-color"),g.style.removeProperty("box-shadow")}),this.selectedEquipmentFilters.add(l),c.classList.add("selected"),c.style.setProperty("border",`2px solid ${u}`,"important"),c.style.setProperty("background-color",`${u}33`,"important"),c.style.setProperty("box-shadow",`0 0 12px ${u}88`,"important")),this.filterDataForMenu(),this.renderVirtualizedGrid()}),n.appendChild(c)});const a=document.getElementById("clearEquipmentFilters");a&&a.addEventListener("click",()=>{this.selectedEquipmentFilters.clear(),n.querySelectorAll(".filter-checkbox").forEach(l=>l.checked=!1),n.querySelectorAll(".filter-checkbox-label").forEach(l=>{l.classList.remove("selected"),l.style.removeProperty("border"),l.style.removeProperty("background-color"),l.style.removeProperty("box-shadow")}),this.filterDataForMenu(),this.renderVirtualizedGrid()})}constructor(e){var n;this.menuType=e,this.isOpen=!1,this.hasBeenOpened=!1,this.allExercises=[],this.filteredData=[],this.searchQuery="",this.scrollAmount=200,this.selectedId=null,this.itemHeight=230,this.containerHeight=400,this.visibleItems=Math.ceil(this.containerHeight/this.itemHeight)+4,this.startIndex=0,this.endIndex=this.visibleItems,this.loopMultiplier=3,this.isLooping=!1,this.renderBuffer=2,this.lastRenderedStart=-1,this.lastRenderedEnd=-1,this.scrollVelocity=0,this.scrollDecay=.9,this.maxVelocity=35,this.isScrolling=!1,this.isDragging=!1,this.startY=0,this.startScrollTop=0,this.lastY=0,this.lastTime=0,this.velocityTracker=[],this.recentlyDragged=!1,this.hasDragged=!1,this.scrollInteractionDelay=1500,this.lastScrollInteraction=0,this.activeThumbnail=null,this.touchStartY=0,this.touchMoved=!1,this.selectedTypeFilter=null,this.selectedMuscleFilters=new Set,this.selectedEquipmentFilters=new Set;const t=((n=window.flexframeSettings)==null?void 0:n.primaryColor)||"#4a9eff";console.log("[FlexFrame Glow] flexframeSettings:",window.flexframeSettings),console.log("[FlexFrame Glow] primaryColor value:",t),console.log("[FlexFrame Glow] Using primary color for thumbnail glow:",t),this.settings={widthPercentage:90,backgroundColor:"#000000",backgroundOpacity:.9,borderRadius:12,keepOpen:!1,glowColor:t,glowIntensity:.6,glowSize:20},console.log("[FlexFrame Glow] Menu settings initialized with glowColor:",this.settings.glowColor),this.initializeElements(),this.loadExerciseData()}updateTitle(e){const t=document.getElementById(`${this.menuType}TitleHeader`);t&&(t.textContent=e)}initializeElements(){console.log(`🔍 initializeElements for ${this.menuType}`),this.toggleBtn=document.getElementById(`${this.menuType}Toggle`),this.dropdown=document.getElementById(`${this.menuType}Dropdown`),this.scrollContainer=document.getElementById(`${this.menuType}Container`),this.thumbnailGrid=document.getElementById(`${this.menuType}Grid`),this.scrollUpBtn=document.getElementById(`${this.menuType}ScrollUp`),this.scrollDownBtn=document.getElementById(`${this.menuType}ScrollDown`),console.log("🔍 Elements found - toggleBtn:",this.toggleBtn,"dropdown:",this.dropdown),this.toggleBtn||console.error(`❌ BUTTON NOT FOUND: ${this.menuType}Toggle`)}async loadExerciseData(){try{const e="https://FlexFrame.b-cdn.net/Exercise%20Catalogue%20For%20Menus%20%26%20Thumbnails/exercises.json",t=`?t=${Date.now()}`;let i=await(await fetch(e+t)).json();if(typeof window.flexframeSettings<"u"&&window.flexframeSettings.hiddenExercises&&Array.isArray(window.flexframeSettings.hiddenExercises)&&window.flexframeSettings.hiddenExercises.length>0){const s=window.flexframeSettings.hiddenExercises,o=i.length;i=i.filter(a=>!s.includes(a.id)),console.log(`🔒 Filtered ${o-i.length} hidden exercises (${i.length} remaining)`)}if(typeof window.flexframeSettings<"u"&&window.flexframeSettings.customThumbnails&&typeof window.flexframeSettings.customThumbnails=="object"){const s=window.flexframeSettings.customThumbnails;let o=0;i=i.map(a=>s[a.id]?(o++,{...a,thumbnailUrl:s[a.id]}):a),o>0&&console.log(`🖼️ Applied ${o} custom thumbnails`)}this.allExercises=i,console.log("✅ Loaded exercises from CDN:",e),this.filterDataForMenu(),this.setupEventListeners(),setTimeout(()=>{this.updateStyles(),this.updateGlowStyles(),this.setupSearchListener(),this.setupSearchFilters(),this.updateThumbnailGlowStyles()},100)}catch(e){console.error("Failed to load exercise data:",e),this.generateFallbackData()}}getExerciseType(e){var o;const t=["Treadmill","Bike","Elliptical","Rower","Jump Rope","Stair Climber","Rowing Machine"],n=["cardio","run","jog","sprint","cycle","rowing","jump"],i=(o=e.equipment)==null?void 0:o.some(a=>t.some(l=>a.toLowerCase().includes(l.toLowerCase()))),s=n.some(a=>e.name.toLowerCase().includes(a));return i||s?"Cardio":"Strength"}setMuscleEquipmentFiltersEnabled(e,t,n){[t,n].forEach(s=>{s&&s.querySelectorAll(".filter-thumbnail").forEach(o=>{e?(o.classList.remove("disabled"),o.style.removeProperty("opacity"),o.style.removeProperty("pointer-events"),o.style.removeProperty("cursor")):(o.classList.add("disabled"),o.style.setProperty("opacity","0.4","important"),o.style.setProperty("pointer-events","none","important"),o.style.setProperty("cursor","not-allowed","important"))})})}filterDataForMenu(){var e,t;switch(this.menuType){case"exercises":const n=(e=window.menuManager)==null?void 0:e.selectedMuscle,i=(t=window.menuManager)==null?void 0:t.selectedEquipment;n&&i?(this.filteredData=this.allExercises.filter(l=>{var f,g,A;const c=((f=l.information)==null?void 0:f.primaryMuscle)===n,h=(A=(g=l.information)==null?void 0:g.secondaryMuscles)==null?void 0:A.includes(n),d=c||h,u=l.equipment.includes(i);return d&&u}),this.filteredData.sort((l,c)=>{var u,f;const h=((u=l.information)==null?void 0:u.primaryMuscle)===n,d=((f=c.information)==null?void 0:f.primaryMuscle)===n;return h&&!d?-1:!h&&d?1:0}),console.log(`Filtering exercises by muscle: ${n} AND equipment: ${i}, found ${this.filteredData.length} exercises`)):n?(this.filteredData=this.allExercises.filter(l=>{var d,u,f;const c=((d=l.information)==null?void 0:d.primaryMuscle)===n,h=(f=(u=l.information)==null?void 0:u.secondaryMuscles)==null?void 0:f.includes(n);return c||h}),this.filteredData.sort((l,c)=>{var u,f;const h=((u=l.information)==null?void 0:u.primaryMuscle)===n,d=((f=c.information)==null?void 0:f.primaryMuscle)===n;return h&&!d?-1:!h&&d?1:0}),console.log(`Filtering exercises by muscle: ${n}, found ${this.filteredData.length} exercises`)):i?(this.filteredData=this.allExercises.filter(l=>l.equipment.includes(i)),console.log(`Filtering exercises by equipment: ${i}, found ${this.filteredData.length} exercises`)):this.filteredData=this.allExercises;break;case"muscles":const s=new Set;this.allExercises.forEach(l=>{l.muscleGroup.forEach(c=>s.add(c))}),this.filteredData=Array.from(s).map((l,c)=>({id:`muscle_${c}`,name:l,thumbnailUrl:`https://picsum.photos/200/200?random=${100+c}`,type:"muscle",relatedExercises:this.allExercises.filter(h=>h.muscleGroup.includes(l))}));break;case"equipment":const o=new Set;this.allExercises.forEach(l=>{l.equipment.forEach(c=>o.add(c))}),this.filteredData=Array.from(o).map((l,c)=>({id:`equipment_${c}`,name:l,thumbnailUrl:`https://picsum.photos/200/200?random=${200+c}`,type:"equipment",relatedExercises:this.allExercises.filter(h=>h.equipment.includes(l))}));break;case"search":let a=this.allExercises;this.selectedTypeFilter&&(a=a.filter(l=>(l.type||this.getExerciseType(l))===this.selectedTypeFilter)),this.selectedMuscleFilters.size>0&&(a=a.filter(l=>{var h,d;const c=new Set;return(h=l.information)!=null&&h.primaryMuscle&&c.add(l.information.primaryMuscle),(d=l.information)!=null&&d.secondaryMuscles&&l.information.secondaryMuscles.forEach(u=>c.add(u)),l.muscleGroup&&l.muscleGroup.forEach(u=>c.add(u)),Array.from(this.selectedMuscleFilters).every(u=>c.has(u))})),this.selectedEquipmentFilters.size>0&&(a=a.filter(l=>Array.from(this.selectedEquipmentFilters).every(c=>l.equipment.includes(c)))),this.searchQuery?a=a.map(l=>{var m,p,v,M;const c=l.name.toLowerCase().includes(this.searchQuery),h=l.muscleGroup.some(y=>y.toLowerCase().includes(this.searchQuery)),d=l.equipment.some(y=>y.toLowerCase().includes(this.searchQuery)),u=(p=(m=l.information)==null?void 0:m.primaryMuscle)==null?void 0:p.toLowerCase().includes(this.searchQuery),f=(M=(v=l.information)==null?void 0:v.secondaryMuscles)==null?void 0:M.some(y=>y.toLowerCase().includes(this.searchQuery));let g="",A="";return c?(g="Exercise Name",A=l.name):u?(g="Primary Muscle",A=l.information.primaryMuscle):f?(g="Secondary Muscles",A=l.information.secondaryMuscles.find(C=>C.toLowerCase().includes(this.searchQuery))||l.information.secondaryMuscles.join(", ")):h?(g="Muscle Group",A=l.muscleGroup.find(C=>C.toLowerCase().includes(this.searchQuery))||l.muscleGroup.join(", ")):d&&(g="Equipment",A=l.equipment.find(C=>C.toLowerCase().includes(this.searchQuery))||l.equipment.join(", ")),{...l,searchMatch:{type:g,text:A}}}).filter(l=>l.searchMatch.type!==""):a=a.map(l=>({...l,searchMatch:{type:"",text:""}})),this.filteredData=a,console.log(`Search filtered to ${this.filteredData.length} exercises`);break}this.renderVirtualizedGrid()}generateFallbackData(){this.filteredData=Array.from({length:20},(e,t)=>({id:t+1,name:`${this.menuType} ${t+1}`,thumbnailUrl:`https://picsum.photos/200/200?random=${t+1}`})),this.renderVirtualizedGrid()}renderVirtualizedGrid(){var i,s;if(!this.thumbnailGrid)return;if(this.thumbnailGrid.innerHTML="",this.menuType==="exercises"){const o=(i=window.menuManager)==null?void 0:i.selectedMuscle,a=(s=window.menuManager)==null?void 0:s.selectedEquipment,l=this.dropdown.querySelector(".filter-status-box");if(l&&l.remove(),o||a){const c=document.createElement("div");c.className="filter-status-box";let h='<div class="filter-status-title">Active Filters:</div>';o&&(h+=`
                        <div class="filter-tag">
                            <span class="filter-label">Muscle:</span>
                            <span class="filter-value">${o}</span>
                            <button class="filter-clear" data-filter="muscle" title="Clear muscle filter">✕</button>
                        </div>
                    `),a&&(h+=`
                        <div class="filter-tag">
                            <span class="filter-label">Equipment:</span>
                            <span class="filter-value">${a}</span>
                            <button class="filter-clear" data-filter="equipment" title="Clear equipment filter">✕</button>
                        </div>
                    `),c.innerHTML=h,c.querySelectorAll(".filter-clear").forEach(u=>{u.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation();const g=f.target.dataset.filter;g==="muscle"?(window.menuManager.selectedMuscle=null,window.menuManager.menus.muscles&&(window.menuManager.menus.muscles.selectedId=null,window.menuManager.menus.muscles.updateVirtualizedContent())):g==="equipment"&&(window.menuManager.selectedEquipment=null,window.menuManager.menus.equipment&&(window.menuManager.menus.equipment.selectedId=null,window.menuManager.menus.equipment.updateVirtualizedContent())),this.filterDataForMenu()})});const d=this.dropdown.querySelector(".thumbnail-scroll-controls");d&&d.after(c)}}this.topSpacer=document.createElement("div"),this.bottomSpacer=document.createElement("div"),this.visibleContainer=document.createElement("div"),this.thumbnailGrid.appendChild(this.topSpacer),this.thumbnailGrid.appendChild(this.visibleContainer),this.thumbnailGrid.appendChild(this.bottomSpacer);const e=this.menuType!=="search",t=e?this.loopMultiplier:1,n=this.filteredData.length*this.itemHeight*t;this.bottomSpacer.style.height=`${n}px`,setTimeout(()=>{this.scrollContainer.scrollTop=e?this.filteredData.length*this.itemHeight:0,this.updateVirtualizedContent()},50)}updateVirtualizedContent(){if(!this.visibleContainer||!this.filteredData.length||this.isDragging)return;const e=this.scrollContainer.scrollTop,t=this.filteredData.length,n=this.menuType!=="search",i=n?this.loopMultiplier:1;t*this.itemHeight*i;let s=e;const o=t*this.itemHeight;n&&e<o*.1?(this.scrollContainer.scrollTop=e+o,s=this.scrollContainer.scrollTop):n&&e>o*2.9&&(this.scrollContainer.scrollTop=e-o,s=this.scrollContainer.scrollTop);const a=Math.floor(s/this.itemHeight),l=this.visibleItems+this.renderBuffer*2;this.startIndex=a,this.endIndex=a+l;const c=this.scrollContainer.scrollTop,h=this.filteredData.length*this.itemHeight,d=Math.floor(c/this.itemHeight)*this.itemHeight;this.topSpacer.style.height=`${d}px`,this.bottomSpacer.style.height=`${h*i-d-(this.endIndex-this.startIndex)*this.itemHeight}px`;const u=new Set;let f=null;for(let A=this.startIndex;A<this.endIndex;A++){const m=this.filteredData.length;let p;if(n)p=(A%m+m)%m;else if(p=A,p>=m)continue;const v=this.filteredData[p];if(!v)continue;const M=`${v.id}_pos_${A}`;u.add(M);let y=this.visibleContainer.querySelector(`[data-position-id="${M}"]`),C="";if(this.menuType,this.menuType==="search"&&v.searchMatch&&this.searchQuery){const w=_=>{const x=new RegExp(`(${this.searchQuery})`,"gi");return _.replace(x,"<mark>$1</mark>")};C=`
                    <div class="thumbnail-search-match">
                        <div class="search-match-type">${v.searchMatch.type}</div>
                        <div class="search-match-text">${w(v.searchMatch.text)}</div>
                    </div>
                `,console.log(`Generated searchMatchHTML for ${v.name}:`,C)}let I="";if(this.menuType==="exercises"&&v.information){const w=v.information.primaryMuscle||"",_=v.information.secondaryMuscles||[];I=`
                    <div class="thumbnail-muscle-info">
                        ${w?`<div class="primary-muscle"><strong>Primary:</strong> ${w}</div>`:""}
                        ${_.length>0?`<div class="secondary-muscles"><strong>Secondary:</strong> ${_.join(", ")}</div>`:""}
                    </div>
                `}const T=`
                <img src="${v.thumbnailUrl}" alt="${v.name}" loading="lazy">
                <div class="thumbnail-label">${v.name}</div>
                ${C}
                ${I}
            `;if(!y)y=document.createElement("div"),y.className="thumbnail-item",y.dataset.id=v.id,y.dataset.positionId=M,y.innerHTML=T,y.addEventListener("click",w=>{if(this.recentlyDragged&&this.hasDragged){w.preventDefault(),w.stopPropagation();return}this.selectThumbnail(v)}),y.addEventListener("touchstart",w=>{this.touchStartY=w.touches[0].clientY,this.touchMoved=!1}),y.addEventListener("touchmove",w=>{const _=w.touches[0].clientY;Math.abs(_-this.touchStartY)>10&&(this.touchMoved=!0)}),y.addEventListener("touchend",w=>{this.touchMoved||(this.activeThumbnail===y?(this.selectThumbnail(v),this.activeThumbnail&&this.activeThumbnail.classList.remove("touch-active"),this.activeThumbnail=null):(this.activeThumbnail&&this.activeThumbnail.classList.remove("touch-active"),this.activeThumbnail=y,y.classList.add("touch-active")))}),f&&f.nextSibling?this.visibleContainer.insertBefore(y,f.nextSibling):!f&&this.visibleContainer.firstChild?this.visibleContainer.insertBefore(y,this.visibleContainer.firstChild):this.visibleContainer.appendChild(y);else{const w=y.classList.contains("selected");y.innerHTML=T,w&&y.classList.add("selected")}f=y}const g=Array.from(this.visibleContainer.querySelectorAll(".thumbnail-item"));for(const A of g){const m=A.dataset.positionId;u.has(m)||this.visibleContainer.removeChild(A)}setTimeout(()=>{if(this.updateStyles(),this.updateThumbnailGlowStyles(),this.selectedId){const A=this.visibleContainer.querySelector(`[data-id="${this.selectedId}"]`);A&&A.classList.add("selected")}},50)}selectThumbnail(e){this.selectedId=e.id,this.visibleContainer.querySelectorAll(".thumbnail-item").forEach(o=>o.classList.remove("selected"));const n=this.visibleContainer.querySelector(`[data-id="${e.id}"]`);n&&n.classList.add("selected"),this.menuType==="search"&&window.innerWidth<=768&&this.closeMenu();const i=this.menuType==="search"?"exercisesSelected":`${this.menuType}Selected`,s=new CustomEvent(i,{detail:{item:e,menuType:this.menuType}});document.dispatchEvent(s)}setupEventListeners(){var e,t;console.log(`🎯 Setting up click listener for ${this.menuType}, button:`,this.toggleBtn),console.log("🎯 Button parent:",(e=this.toggleBtn)==null?void 0:e.parentElement),console.log("🎯 Button is in flexframe container:",((t=this.toggleBtn)==null?void 0:t.closest("#flexframe-viewer-container"))!==null),this.toggleBtn.onclick=n=>{console.log(`💥 CLICK HANDLER FIRED for ${this.menuType}!`),n.stopPropagation(),this.toggleMenu()},document.addEventListener("click",n=>{(n.target===this.toggleBtn||this.toggleBtn.contains(n.target))&&console.log(`🌍 DOCUMENT CLICK detected on ${this.menuType} button, target:`,n.target)},!0),this.scrollUpBtn.addEventListener("click",()=>{this.scrollContainer.scrollBy({top:-this.scrollAmount,behavior:"smooth"})}),this.scrollDownBtn.addEventListener("click",()=>{this.scrollContainer.scrollBy({top:this.scrollAmount,behavior:"smooth"})}),this.scrollContainer.addEventListener("wheel",n=>{n.preventDefault();const i=n.deltaY*3.5;this.scrollVelocity+=i*.2,this.scrollVelocity=Math.max(-this.maxVelocity,Math.min(this.maxVelocity,this.scrollVelocity)),this.lastScrollInteraction=Date.now(),this.isScrolling||this.startMomentumScroll()}),this.scrollContainer.addEventListener("scroll",()=>{this.updateVirtualizedContent(),this.updateScrollButtons()}),this.scrollContainer.addEventListener("mousedown",n=>{this.startDrag(n.clientY),n.preventDefault()}),this.scrollContainer.addEventListener("touchstart",n=>{this.startDrag(n.touches[0].clientY),n.preventDefault()},{passive:!1}),document.addEventListener("mousemove",n=>{this.isDragging&&(this.handleDrag(n.clientY),n.preventDefault())}),document.addEventListener("touchmove",n=>{this.isDragging&&(this.handleDrag(n.touches[0].clientY),n.preventDefault())},{passive:!1}),document.addEventListener("mouseup",()=>{this.isDragging&&this.endDrag()}),document.addEventListener("touchend",()=>{this.isDragging&&this.endDrag()}),this.scrollContainer.addEventListener("selectstart",n=>{this.isDragging&&n.preventDefault()}),document.addEventListener("keydown",n=>{this.isOpen&&(n.key==="Escape"?this.settings.keepOpen||this.closeMenu():n.key==="ArrowUp"?(n.preventDefault(),this.scrollContainer.scrollBy({top:-this.scrollAmount,behavior:"smooth"})):n.key==="ArrowDown"&&(n.preventDefault(),this.scrollContainer.scrollBy({top:this.scrollAmount,behavior:"smooth"})))}),this.scrollContainer.addEventListener("scroll",()=>{this.updateScrollButtons()})}updateThumbnailGlowStyles(){const e=this.settings.glowColor.replace("#",""),t=parseInt(e.substr(0,2),16),n=parseInt(e.substr(2,2),16),i=parseInt(e.substr(4,2),16),s=`rgba(${t}, ${n}, ${i}, ${this.settings.glowIntensity*.8})`,o=`thumbnail-glow-${this.menuType}`;let a=document.getElementById(o);a||(a=document.createElement("style"),a.id=o,document.head.appendChild(a)),a.textContent=`
            #${this.menuType}Grid .thumbnail-item.selected {
                border-color: ${this.settings.glowColor};
                box-shadow: 0 0 ${this.settings.glowSize}px ${s};
            }
            #${this.menuType}Grid .thumbnail-item.selected::before {
                background: ${this.settings.glowColor};
                box-shadow: 0 0 ${Math.floor(this.settings.glowSize*.5)}px ${s};
            }
        `}startMomentumScroll(){this.isScrolling=!0,this.momentumScrollFrame()}momentumScrollFrame(){if(Math.abs(this.scrollVelocity)<.1){this.isScrolling=!1,this.scrollVelocity=0;return}this.scrollContainer.scrollBy({top:this.scrollVelocity,behavior:"auto"}),this.updateVirtualizedContent(),this.scrollVelocity*=this.scrollDecay,requestAnimationFrame(()=>this.momentumScrollFrame())}startDrag(e){this.isDragging=!0,this.startY=e,this.startScrollTop=this.scrollContainer.scrollTop,this.lastY=e,this.lastTime=Date.now(),this.velocityTracker=[],this.hasDragged=!1,this.isScrolling=!1,this.scrollVelocity=0,this.scrollContainer.style.cursor="grabbing"}handleDrag(e){if(!this.isDragging)return;const t=this.startY-e;Math.abs(t)>5&&(this.hasDragged=!0);const n=this.startScrollTop+t;this.scrollContainer.scrollTop=n;const i=Date.now(),s=i-this.lastTime,o=e-this.lastY;if(s>0){const a=o/s;this.velocityTracker.push({velocity:a,time:i}),this.velocityTracker=this.velocityTracker.filter(l=>i-l.time<100)}this.lastY=e,this.lastTime=i}endDrag(){if(this.isDragging){if(this.isDragging=!1,this.scrollContainer.style.cursor="grab",this.hasDragged&&(this.recentlyDragged=!0,this.lastScrollInteraction=Date.now(),setTimeout(()=>{this.recentlyDragged=!1,this.hasDragged=!1},100)),this.velocityTracker.length>0){const e=this.velocityTracker.reduce((t,n)=>t+n.velocity,0)/this.velocityTracker.length;this.scrollVelocity=-e*15,this.scrollVelocity=Math.max(-this.maxVelocity,Math.min(this.maxVelocity,this.scrollVelocity)),Math.abs(this.scrollVelocity)>1&&this.startMomentumScroll()}this.velocityTracker=[],setTimeout(()=>{this.updateVirtualizedContent()},50)}}hasRecentScrollInteraction(){return Date.now()-this.lastScrollInteraction<this.scrollInteractionDelay}momentumScrollFrame(){if(Math.abs(this.scrollVelocity)<.1){this.isScrolling=!1,this.scrollVelocity=0;return}this.scrollContainer.scrollBy({top:this.scrollVelocity,behavior:"auto"}),this.scrollVelocity*=this.scrollDecay,requestAnimationFrame(()=>this.momentumScrollFrame())}updateScrollButtons(){this.scrollUpBtn.style.opacity="1",this.scrollDownBtn.style.opacity="1",this.scrollUpBtn.disabled=!1,this.scrollDownBtn.disabled=!1}toggleMenu(){console.log(`🔄 toggleMenu called for ${this.menuType}, isOpen:`,this.isOpen),this.isOpen?this.closeMenu():this.openMenu()}openMenu(){console.log(`🟢 openMenu called for ${this.menuType}`),this.isOpen=!0,document.dispatchEvent(new CustomEvent("closeAllThumbnailMenus",{detail:{except:this.menuType}})),document.dispatchEvent(new CustomEvent("closeAllRightMenus",{detail:{except:null}}));const e=document.querySelector(".thumbnail-grid-container-right");if(e&&e.classList.remove("menu-visible","menu-active"),this.menuType==="search"){this.filterDataForMenu(),this.renderVirtualizedGrid();const n=document.getElementById("searchInput");n&&window.innerWidth>768&&setTimeout(()=>n.focus(),150)}this.dropdown.classList.add("show"),console.log(`✅ Added .show class to ${this.menuType} dropdown, classes:`,this.dropdown.className),this.toggleBtn.classList.add("active"),this.scrollContainer&&(this.scrollContainer.style.cursor="grab",this.hasBeenOpened||(setTimeout(()=>{const n=this.scrollContainer.scrollTop;this.scrollContainer.scrollTo({top:n+30,behavior:"smooth"}),setTimeout(()=>{this.scrollContainer.scrollTo({top:n,behavior:"smooth"})},400)},300),this.hasBeenOpened=!0));const t=document.querySelector(".thumbnail-grid-container");t&&t.classList.add("menu-active"),setTimeout(()=>{this.visibleContainer&&this.updateVirtualizedContent(),this.updateScrollButtons()},100)}closeMenu(){if(this.dropdown.classList.remove("show"),this.toggleBtn.classList.remove("active"),this.isOpen=!1,this.activeThumbnail&&(this.activeThumbnail.classList.remove("touch-active"),this.activeThumbnail=null),!(window.menuManager&&Object.values(window.menuManager.menus).some(t=>t.isOpen))){const t=document.querySelector(".thumbnail-grid-container");t&&t.classList.remove("menu-active")}}updateStyles(){if(!this.dropdown)return;const e=window.innerWidth<=768;this.dropdown.style.width=e?"40%":"250px",this.dropdown.style.borderRadius=`${this.settings.borderRadius}px`}updateGlowStyles(){if(!this.toggleBtn)return;const e=this.settings.glowColor.replace("#",""),t=parseInt(e.substr(0,2),16),n=parseInt(e.substr(2,2),16),i=parseInt(e.substr(4,2),16),s=`rgba(${t}, ${n}, ${i}, ${this.settings.glowIntensity})`,o=`rgba(${t}, ${n}, ${i}, ${this.settings.glowIntensity*.5})`,a=`glow-${this.menuType}`;let l=document.getElementById(a);l||(l=document.createElement("style"),l.id=a,document.head.appendChild(l)),l.textContent=`
            #${this.menuType}Toggle.active {
                border-color: ${this.settings.glowColor};
                box-shadow: 0 0 ${this.settings.glowSize}px ${s}, 0 0 ${this.settings.glowSize*2}px ${o};
            }
            #${this.menuType}Toggle.active:hover {
                box-shadow: 0 0 ${this.settings.glowSize*1.25}px ${s.replace(this.settings.glowIntensity,this.settings.glowIntensity+.2)}, 0 0 ${this.settings.glowSize*2.5}px ${o.replace(this.settings.glowIntensity*.5,this.settings.glowIntensity*.7)};
            }
        `}updateThumbnailGlowStyles(){const e=this.settings.glowColor.replace("#",""),t=parseInt(e.substr(0,2),16),n=parseInt(e.substr(2,2),16),i=parseInt(e.substr(4,2),16),s=`rgba(${t}, ${n}, ${i}, ${this.settings.glowIntensity})`,o=`rgba(${t}, ${n}, ${i}, ${this.settings.glowIntensity*.5})`,a=`thumbnail-glow-${this.menuType}`;let l=document.getElementById(a);l||(l=document.createElement("style"),l.id=a,document.head.appendChild(l)),l.textContent=`
            #${this.menuType}Grid .thumbnail-item.selected {
                border-color: ${this.settings.glowColor};
                box-shadow: 0 0 ${this.settings.glowSize}px ${s};
            }
            #${this.menuType}Grid .thumbnail-item.selected img {
                border: 3px solid ${this.settings.glowColor};
                box-shadow: 0 0 ${this.settings.glowSize}px ${o};
            }
        `}getSettings(){return{...this.settings}}applySettings(e){this.settings={...this.settings,...e},this.updateStyles(),this.updateGlowStyles(),this.updateThumbnailGlowStyles()}}class ay{constructor(){var o;console.log("🎬 MultiThumbnailMenuSystem constructor started"),this.menus={},this.selectedMuscle=null,this.selectedEquipment=null,this.selectedExerciseId=null;const e=((o=window.flexframeSettings)==null?void 0:o.primaryColor)||"#4a9eff";console.log("[FlexFrame Glow] MultiThumbnailMenuSystem using primaryColor:",e),document.documentElement.style.setProperty("--flexframe-primary-color",e);const t=e.replace("#",""),n=parseInt(t.substring(0,2),16),i=parseInt(t.substring(2,4),16),s=parseInt(t.substring(4,6),16);document.documentElement.style.setProperty("--flexframe-primary-color-rgb",`${n}, ${i}, ${s}`),console.log("[FlexFrame Glow] Set CSS variables --flexframe-primary-color:",e,"RGB:",n,i,s),this.settings={widthPercentage:90,backgroundColor:"#000000",backgroundOpacity:.9,borderRadius:12,keepOpen:!1,glowColor:e,glowIntensity:.6,glowSize:20},console.log("📋 Calling initializeMenus..."),this.initializeMenus(),console.log("🎧 Calling setupGlobalListeners..."),this.setupGlobalListeners(),console.log("✅ MultiThumbnailMenuSystem constructor complete")}initializeMenus(){console.log("🏗️ initializeMenus started"),console.log("Creating exercises menu..."),this.menus.exercises=new nr("exercises"),console.log("Creating muscles menu..."),this.menus.muscles=new nr("muscles"),console.log("Creating equipment menu..."),this.menus.equipment=new nr("equipment"),console.log("Creating search menu..."),this.menus.search=new nr("search"),console.log("✅ All 4 menus created:",this.menus)}setupGlobalListeners(){document.addEventListener("exercisesSelected",t=>{this.selectedExerciseId=t.detail.item.id}),document.addEventListener("searchSelected",t=>{var i;console.log("Search selection made, selecting corresponding items in other tabs");const n=t.detail.item;if(console.log("Selected exercise data:",n),this.menus.muscles&&((i=n.information)!=null&&i.primaryMuscle)){const s=n.information.primaryMuscle;this.selectedMuscle=s,console.log("Setting muscle:",s);const o=this.menus.muscles.filteredData.find(a=>a.name===s);console.log("Found muscle item:",o),o&&(this.menus.muscles.selectedId=o.id)}if(this.menus.equipment&&n.equipment&&n.equipment.length>0){const s=n.equipment[0];this.selectedEquipment=s,console.log("Setting equipment:",s);const o=this.menus.equipment.filteredData.find(a=>a.name===s);console.log("Found equipment item:",o),o&&(this.menus.equipment.selectedId=o.id)}this.menus.exercises&&this.menus.exercises.filterDataForMenu(),this.menus.exercises&&n.id&&(this.menus.exercises.selectedId=n.id,this.selectedExerciseId=n.id,console.log("Set exercise selection:",n.id)),setTimeout(()=>{var s,o,a;if((s=this.menus.exercises)!=null&&s.visibleContainer&&n.id){this.menus.exercises.visibleContainer.querySelectorAll(".thumbnail-item").forEach(h=>h.classList.remove("selected"));const c=this.menus.exercises.visibleContainer.querySelector(`[data-id="${n.id}"]`);c?(c.classList.add("selected"),console.log("Applied visual selection to exercise")):console.log("Exercise element not found in DOM")}if((o=this.menus.muscles)!=null&&o.visibleContainer&&this.menus.muscles.selectedId){this.menus.muscles.visibleContainer.querySelectorAll(".thumbnail-item").forEach(h=>h.classList.remove("selected"));const c=this.menus.muscles.visibleContainer.querySelector(`[data-id="${this.menus.muscles.selectedId}"]`);c?(c.classList.add("selected"),console.log("Applied visual selection to muscle")):console.log("Muscle element not found in DOM")}if((a=this.menus.equipment)!=null&&a.visibleContainer&&this.menus.equipment.selectedId){this.menus.equipment.visibleContainer.querySelectorAll(".thumbnail-item").forEach(h=>h.classList.remove("selected"));const c=this.menus.equipment.visibleContainer.querySelector(`[data-id="${this.menus.equipment.selectedId}"]`);c?(c.classList.add("selected"),console.log("Applied visual selection to equipment")):console.log("Equipment element not found in DOM")}},300)}),document.addEventListener("musclesSelected",t=>{this.selectedMuscle=t.detail.item.name,console.log("Muscle selected:",this.selectedMuscle),this.menus.exercises&&(this.menus.exercises.filterDataForMenu(),setTimeout(()=>this.restoreExerciseSelection(),200),setTimeout(()=>this.restoreExerciseSelection(),400))}),document.addEventListener("equipmentSelected",t=>{this.selectedEquipment=t.detail.item.name,console.log("Equipment selected:",this.selectedEquipment),this.menus.exercises&&(this.menus.exercises.filterDataForMenu(),setTimeout(()=>this.restoreExerciseSelection(),200),setTimeout(()=>this.restoreExerciseSelection(),400))}),document.addEventListener("closeAllThumbnailMenus",t=>{var i;const n=(i=t.detail)==null?void 0:i.except;Object.entries(this.menus).forEach(([s,o])=>{s!==n&&o.closeMenu()})});const e=document.querySelector(".thumbnail-grid-container");if(e){e.addEventListener("mouseenter",()=>{e.classList.add("menu-visible");const n=document.querySelector(".thumbnail-grid-container-right");n&&(n.classList.remove("menu-visible","menu-active"),document.dispatchEvent(new CustomEvent("closeAllRightMenus",{detail:{except:null}})))});const t=e.querySelector(".menu-hint-tab");t&&t.addEventListener("click",n=>{n.stopPropagation(),this.toggleLeftMenu()}),this.createMobileToggleButton(e)}document.addEventListener("click",t=>{if(!t.target.closest(".mobile-menu-toggle")&&e&&!e.contains(t.target)){if(Object.values(this.menus).some(s=>s.hasRecentScrollInteraction&&s.hasRecentScrollInteraction()))return;e.classList.remove("menu-visible"),this.updateMobileToggleIcon(!1),Object.values(this.menus).some(s=>s.isOpen)&&Object.values(this.menus).forEach(s=>{s.isOpen&&s.closeMenu()})}})}restoreExerciseSelection(){if(this.selectedExerciseId&&this.menus.exercises&&this.menus.exercises.visibleContainer){const e=this.menus.exercises.visibleContainer.querySelector(`[data-id="${this.selectedExerciseId}"]`);e?(e.classList.add("selected"),console.log("Restored exercise selection:",this.selectedExerciseId)):console.log("Could not restore - element not found:",this.selectedExerciseId)}}updateAllSettings(e){this.settings={...this.settings,...e},Object.values(this.menus).forEach(t=>{t.applySettings(this.settings),t.updateGlowStyles(),t.updateThumbnailGlowStyles()})}getSettings(){return{...this.settings}}applySettings(e){this.updateAllSettings(e)}async copySettingsToClipboard(){const e=JSON.stringify(this.settings,null,2);try{await navigator.clipboard.writeText(e),alert("Multi-thumbnail menu settings copied to clipboard!")}catch(t){console.error("Failed to copy to clipboard:",t),alert("Failed to copy settings to clipboard.")}}createMobileToggleButton(e){}updateMobileToggleVisibility(){}toggleLeftMenu(){const e=document.querySelector(".thumbnail-grid-container");if(!e)return;if(e.classList.contains("mobile-open"))e.classList.remove("mobile-open"),e.style.left="-130px",this.updateMobileToggleIcon(!1);else{const n=document.querySelector(".thumbnail-grid-container-right");if(n&&n.classList.contains("mobile-open")){n.classList.remove("mobile-open"),n.style.right="-130px";const i=document.querySelector(".mobile-menu-toggle.right-toggle");i&&(i.innerHTML="▶")}e.classList.add("mobile-open"),e.style.left="0px",this.updateMobileToggleIcon(!0)}}updateMobileToggleIcon(e){}}class as{constructor(e){this.menuType=e,this.isOpen=!1,this.scrollAmount=200,this.infoData=[],this.stickyHeader=null,this.currentSectionTitle="",this.sectionBoundaries=[],this.settings={widthPercentage:90,backgroundColor:"#000000",backgroundOpacity:.9,borderRadius:12,keepOpen:!1,glowColor:"#4a9eff",glowIntensity:.6,glowSize:20},this.initializeElements(),this.setupEventListeners(),this.loadInfoData()}initializeElements(){this.toggleBtn=document.getElementById(`${this.menuType}Toggle`),this.dropdown=document.querySelector(`.thumbnail-dropdown-right#${this.menuType}Dropdown`),this.scrollContainer=document.getElementById(`${this.menuType}Container`),this.grid=document.getElementById(`${this.menuType}Grid`),this.scrollUpBtn=document.getElementById(`${this.menuType}ScrollUp`),this.scrollDownBtn=document.getElementById(`${this.menuType}ScrollDown`),console.log(`[RightMenu DEBUG] initializeElements for ${this.menuType}:`),console.log("[RightMenu DEBUG] toggleBtn:",this.toggleBtn),console.log("[RightMenu DEBUG] toggleBtn innerHTML:",this.toggleBtn?this.toggleBtn.innerHTML:"N/A"),(!this.toggleBtn||!this.dropdown)&&console.error(`Failed to initialize ${this.menuType} menu elements`),this.menuType==="info"&&this.dropdown&&this.createStickyHeader()}async loadInfoData(){try{const t=await(await fetch(Li("data/right-menu-info.json"))).json();t[this.menuType]?(this.infoData=t[this.menuType].items||[],this.renderInfoItems()):(console.warn(`No data found for ${this.menuType}`),this.infoData=[])}catch(e){console.error("Error loading right menu info data:",e),this.infoData=[]}}renderInfoItems(){if(this.grid){if(this.grid.innerHTML="",this.infoData.length===0){this.grid.innerHTML='<div class="info-step-empty">No information available.</div>';return}this.infoData.forEach(e=>{const t=document.createElement("div");t.className="info-step-item",t.innerHTML=`
                <div class="info-step-title">${e.name}</div>
                <div class="info-step-text">${e.text||""}</div>
            `,this.grid.appendChild(t)})}}createStickyHeader(){this.stickyHeader=document.createElement("div"),this.stickyHeader.className="info-sticky-header",this.stickyHeader.textContent="Exercise Information",this.currentSectionTitle="Exercise Information",this.dropdown&&this.scrollContainer&&this.dropdown.insertBefore(this.stickyHeader,this.scrollContainer)}setupEventListeners(){this.toggleBtn&&(this.toggleBtn.addEventListener("click",e=>{e.stopPropagation(),this.toggleMenu()}),this.scrollUpBtn&&this.scrollDownBtn&&(this.scrollUpBtn.addEventListener("click",()=>{this.scrollContainer.scrollBy({top:-this.scrollAmount,behavior:"smooth"})}),this.scrollDownBtn.addEventListener("click",()=>{this.scrollContainer.scrollBy({top:this.scrollAmount,behavior:"smooth"})})),this.menuType==="info"&&this.scrollContainer&&this.scrollContainer.addEventListener("scroll",()=>{this.updateStickyHeader()}))}toggleMenu(){this.isOpen?this.closeMenu():this.openMenu()}openMenu(){document.dispatchEvent(new CustomEvent("closeAllRightMenus",{detail:{except:this.menuType}})),document.dispatchEvent(new CustomEvent("closeAllThumbnailMenus",{detail:{except:null}}));const e=document.querySelector(".thumbnail-grid-container");e&&e.classList.remove("menu-visible","menu-active"),this.dropdown.classList.add("show"),this.toggleBtn.classList.add("active"),this.isOpen=!0;const t=document.querySelector(".thumbnail-grid-container-right");t&&t.classList.add("menu-active")}closeMenu(){if(!this.dropdown||!this.toggleBtn)return;this.dropdown.classList.remove("show"),this.toggleBtn.classList.remove("active"),this.isOpen=!1;const e=document.querySelector(".thumbnail-grid-container-right");e&&(document.querySelectorAll(".thumbnail-dropdown-right.show").length>0||e.classList.remove("menu-active"))}updateStyles(){if(!this.dropdown)return;const e=`${this.settings.widthPercentage}%`,t=this.settings.backgroundColor,n=this.settings.backgroundOpacity,i=`${this.settings.borderRadius}px`;this.dropdown.style.width=e,this.dropdown.style.maxWidth=e,this.dropdown.style.backgroundColor=`${t}${Math.round(n*255).toString(16).padStart(2,"0")}`,this.dropdown.style.borderRadius=i}getSettings(){return{...this.settings}}applySettings(e){this.settings={...this.settings,...e},this.updateStyles()}updateTitle(e){if(this.toggleBtn){console.log("=== updateTitle DEBUG ==="),console.log("Button ID:",this.toggleBtn.id),console.log("New title:",e),console.log("Button innerHTML BEFORE:",this.toggleBtn.innerHTML);const t=this.toggleBtn.querySelector("span");if(t)console.log("Found span, updating text only"),t.textContent=e;else{console.log("No span found, checking for SVG");const n=this.toggleBtn.querySelector("svg");if(n){console.log("Found SVG, rebuilding structure");const i=n.cloneNode(!0);this.toggleBtn.innerHTML="",this.toggleBtn.appendChild(i);const s=document.createElement("span");s.textContent=e,this.toggleBtn.appendChild(s)}else console.log("No SVG found, just updating text"),this.toggleBtn.textContent=e}console.log("Button innerHTML AFTER:",this.toggleBtn.innerHTML),console.log("=========================")}}updateStickyHeader(){if(!this.stickyHeader||!this.scrollContainer||!this.grid)return;const e=this.grid.querySelectorAll("[data-section]");if(e.length===0)return;const t=this.scrollContainer.getBoundingClientRect().top;let n=e[0].getAttribute("data-section")||"Exercise Information";e.forEach(i=>{if(i.getBoundingClientRect().top-t<=80){const a=i.getAttribute("data-section");a&&(n=a)}}),n!==this.currentSectionTitle&&(this.currentSectionTitle=n,this.stickyHeader.textContent=n)}updateContent(e){if(!this.grid)return;if(this.grid.innerHTML="",!e||e.length===0){this.grid.innerHTML='<div class="info-step-empty">No information available.</div>';return}let t="";e.forEach(n=>{const i=document.createElement("div");if(n.type==="header"){if(t=n.title,this.menuType==="info")return;i.className="info-section-header",i.setAttribute("data-section-title",n.title),i.innerHTML=`<div class="info-section-title">${n.title}</div>`}else i.className="info-step-item",i.innerHTML=`
                    <div class="info-step-title">${n.heading||""}</div>
                    <div class="info-step-text">${n.content||""}</div>
                `,this.menuType==="info"&&t&&i.setAttribute("data-section",t);this.grid.appendChild(i)}),this.menuType==="info"&&this.scrollContainer&&this.setupScrollDetection()}setupScrollDetection(){if(!this.scrollContainer)return;let e;this.scrollContainer.addEventListener("scroll",()=>{clearTimeout(e),e=setTimeout(()=>{this.updateButtonTextBasedOnScroll()},100)})}updateButtonTextBasedOnScroll(){if(!this.scrollContainer||!this.toggleBtn)return;const e=this.grid.querySelectorAll(".info-section-header");if(e.length===0)return;const t=this.scrollContainer.getBoundingClientRect().top;let n="Exercise Info";e.forEach(s=>{if(s.getBoundingClientRect().top<=t+100){const a=s.getAttribute("data-section-title");a&&(n=a)}});const i=this.toggleBtn.querySelector("span");i&&i.textContent!==n&&(i.textContent=n)}}class ly{constructor(){this.menus={},this.settings={widthPercentage:90,backgroundColor:"#000000",backgroundOpacity:.9,borderRadius:12,keepOpen:!1,glowColor:"#4a9eff",glowIntensity:.6,glowSize:20},this.initializeMenus(),this.setupGlobalListeners()}initializeMenus(){this.menus.info1=new as("info1"),this.menus.info2=new as("info2"),this.menus.info3=new as("info3"),this.menus.info4=new as("info4"),this.menus.info=new as("info")}setupGlobalListeners(){document.addEventListener("closeAllRightMenus",t=>{var i;const n=(i=t.detail)==null?void 0:i.except;Object.entries(this.menus).forEach(([s,o])=>{s!==n&&o.closeMenu()})});const e=document.querySelector(".thumbnail-grid-container-right");if(e){e.addEventListener("mouseenter",()=>{e.classList.add("menu-visible");const n=document.querySelector(".thumbnail-grid-container");n&&(n.classList.remove("menu-visible","menu-active"),document.dispatchEvent(new CustomEvent("closeAllThumbnailMenus",{detail:{except:null}})))});const t=e.querySelector(".menu-hint-tab-right");t&&t.addEventListener("click",n=>{n.stopPropagation(),this.toggleRightMenu()}),this.createMobileToggleButton(e)}document.addEventListener("click",t=>{t.target.closest(".mobile-menu-toggle")||e&&!e.contains(t.target)&&(e.classList.remove("menu-visible"),window.innerWidth<=768&&(e.classList.remove("mobile-open"),e.style.right="-130px",this.updateMobileToggleIcon(!1)),Object.values(this.menus).some(i=>i.isOpen)&&Object.values(this.menus).forEach(i=>{i.isOpen&&i.closeMenu()}))})}updateAllSettings(e){this.settings={...this.settings,...e},Object.values(this.menus).forEach(t=>{t.applySettings(this.settings)})}getSettings(){return{...this.settings}}updateFromConfig(e){console.log("Updating right menu from config:",e);const t={exerciseInformation:"info2",howToGuide:"info1",setupGuide:"info3",alternativeExercises:"info4"};Object.entries(e).forEach(([s,o])=>{const a=t[s];a&&this.menus[a]&&(o.title&&this.menus[a].updateTitle(o.title),o.sections&&Array.isArray(o.sections)&&this.menus[a].updateContent(o.sections))});const n=[];[{key:"exerciseInformation",title:"Exercise Information"},{key:"setupGuide",title:"Exercise Tips"},{key:"howToGuide",title:"How To Guide"},{key:"alternativeExercises",title:"Alternative Exercises"}].forEach(({key:s,title:o})=>{const a=e[s];a&&a.sections&&Array.isArray(a.sections)&&(n.push({title:a.title||o,type:"header",content:""}),n.push(...a.sections))}),this.menus.info&&(this.menus.info.updateTitle("Exercise Info"),this.menus.info.updateContent(n))}copySettingsToClipboard(){const e=JSON.stringify(this.settings,null,2);navigator.clipboard.writeText(e).then(()=>{console.log("Right menu settings copied to clipboard")}).catch(t=>{console.error("Failed to copy settings:",t)})}createMobileToggleButton(e){}updateMobileToggleVisibility(){}toggleRightMenu(){const e=document.querySelector(".thumbnail-grid-container-right");if(!e)return;if(e.classList.contains("mobile-open"))e.classList.remove("mobile-open"),e.classList.remove("menu-visible"),e.style.right="-130px",this.updateMobileToggleIcon(!1),Object.values(this.menus).forEach(n=>{n.isOpen&&n.closeMenu()});else{const n=document.querySelector(".thumbnail-grid-container");if(n&&n.classList.contains("mobile-open")){n.classList.remove("mobile-open"),n.style.left="-130px";const i=document.querySelector(".mobile-menu-toggle.left-toggle");i&&(i.innerHTML="◀")}e.classList.add("mobile-open"),e.classList.add("menu-visible"),e.style.right="0px",this.updateMobileToggleIcon(!0)}}updateMobileToggleIcon(e){this.mobileToggleButton&&(this.mobileToggleButton.innerHTML=e?"✕":"▶")}}class cy{constructor(){console.log("[FlexFrame AR] ARHandler initialized"),this.currentConfig=null,this.qrModal=null,this.branding={logoUrl:null,websiteUrl:"https://thegymmanagerblog.com",companyName:"FlexFrame",callToAction:"Visit FlexFrame"},this.setupARButton()}setBranding(e){e.logoUrl&&(this.branding.logoUrl=e.logoUrl),e.websiteUrl&&(this.branding.websiteUrl=e.websiteUrl),e.companyName&&(this.branding.companyName=e.companyName),e.callToAction&&(this.branding.callToAction=e.callToAction),console.log("[FlexFrame AR] Branding updated:",this.branding)}getDeviceType(){const e=navigator.userAgent.toLowerCase();return/iphone|ipad|ipod/.test(e)?"ios":/android/.test(e)?"android":"desktop"}supportsAR(){const e=this.getDeviceType();if(e==="ios"){const t=document.createElement("a");return t.relList&&t.relList.supports&&t.relList.supports("ar")}else if(e==="android")return!0;return!1}updateConfig(e){this.currentConfig=e,console.log("[FlexFrame AR] Config updated:",e==null?void 0:e.ar)}setupARButton(){const e=()=>{const t=document.getElementById("ar-btn");t?(t.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),this.launchAR()}),console.log("[FlexFrame AR] AR button handler attached")):setTimeout(e,500)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):setTimeout(e,100)}launchAR(){var t;if(console.log("[FlexFrame AR] Launch AR triggered"),!((t=this.currentConfig)!=null&&t.ar)){console.warn("[FlexFrame AR] No AR config available"),this.showNoARMessage();return}const e=this.getDeviceType();switch(console.log("[FlexFrame AR] Device type:",e),e){case"ios":this.launchIOSAR();break;case"android":this.launchAndroidAR();break;case"desktop":this.showQRCodeModal();break}}launchIOSAR(){const e=this.currentConfig.ar.usdz;if(!e){console.warn("[FlexFrame AR] No USDZ file available"),this.launchAndroidAR();return}console.log("[FlexFrame AR] Launching iOS AR with USDZ:",e);let t=e;const n=[];this.branding.websiteUrl&&(n.push(`callToAction=${encodeURIComponent(this.branding.callToAction)}`),n.push(`checkoutTitle=${encodeURIComponent(this.branding.companyName)}`),n.push(`checkoutSubtitle=${encodeURIComponent("Tap to visit website")}`),n.push(`canonicalWebPageURL=${encodeURIComponent(this.branding.websiteUrl)}`)),this.branding.logoUrl&&n.push(`custom=${encodeURIComponent(this.branding.logoUrl)}`),n.length>0&&(t+="#"+n.join("&")),console.log("[FlexFrame AR] iOS AR URL with branding:",t);const i=document.createElement("a");i.setAttribute("rel","ar"),i.setAttribute("href",t);const s=document.createElement("img");s.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",s.style.width="1px",s.style.height="1px",i.appendChild(s),document.body.appendChild(i),i.click(),document.body.removeChild(i)}launchAndroidAR(){const e=this.currentConfig.ar.glb;if(!e){console.warn("[FlexFrame AR] No GLB file available for AR"),this.showNoARMessage();return}console.log("[FlexFrame AR] Launching Android AR with GLB:",e);let t=[`file=${encodeURIComponent(e)}`,"mode=ar_preferred",`title=${encodeURIComponent(this.currentConfig.exerciseId||"Exercise")}`];this.branding.websiteUrl&&(t.push(`link=${encodeURIComponent(this.branding.websiteUrl)}`),t.push(`linkText=${encodeURIComponent(this.branding.callToAction)}`));const n="intent://arvr.google.com/scene-viewer/1.0?"+t.join("&")+`#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(e)};end;`;console.log("[FlexFrame AR] Android AR URL with branding:",n),window.location.href=n}showQRCodeModal(){console.log("[FlexFrame AR] Showing QR code modal for desktop"),this.qrModal||this.createQRModal();const e=this.generateARPageUrl();this.updateQRCode(e),this.qrModal.style.display="flex"}createQRModal(){var l;const e=((l=window.flexframeSettings)==null?void 0:l.primaryColor)||"#4a9eff",n=(c=>{const h=parseInt(c.slice(1,3),16),d=parseInt(c.slice(3,5),16),u=parseInt(c.slice(5,7),16);return{r:h,g:d,b:u}})(e),i=`rgb(${Math.floor(n.r*.15)}, ${Math.floor(n.g*.15)}, ${Math.floor(n.b*.2+20)})`,s=`rgb(${Math.floor(n.r*.1)}, ${Math.floor(n.g*.12)}, ${Math.floor(n.b*.18+30)})`;this.qrModal=document.createElement("div"),this.qrModal.id="ar-qr-modal",this.qrModal.innerHTML=`
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
                    background: linear-gradient(135deg, ${i} 0%, ${s} 100%);
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
        `,document.body.appendChild(this.qrModal),this.qrModal.querySelector("#ar-qr-close").addEventListener("click",()=>{this.qrModal.style.display="none"});const a=this.qrModal.querySelector(".ar-qr-modal-overlay");a.addEventListener("click",c=>{c.target===a&&(this.qrModal.style.display="none")}),document.addEventListener("keydown",c=>{c.key==="Escape"&&this.qrModal.style.display==="flex"&&(this.qrModal.style.display="none")})}generateARPageUrl(){var a,l,c,h,d,u;const e=((l=(a=this.currentConfig)==null?void 0:a.ar)==null?void 0:l.glb)||((c=this.currentConfig)==null?void 0:c.modelUrlSQ),t=(d=(h=this.currentConfig)==null?void 0:h.ar)==null?void 0:d.usdz,n=((u=this.currentConfig)==null?void 0:u.exerciseId)||"exercise",i=new URLSearchParams({glb:e||"",usdz:t||"",title:n});return this.branding.logoUrl&&i.set("logo",this.branding.logoUrl),this.branding.websiteUrl&&i.set("website",this.branding.websiteUrl),this.branding.companyName&&i.set("company",this.branding.companyName),this.branding.callToAction&&i.set("cta",this.branding.callToAction),`${window.location.origin}/wp-content/plugins/flexframe-v28/viewer/ar-viewer.html?${i.toString()}`}updateQRCode(e){const t=document.getElementById("ar-qr-code");if(!t)return;const n=`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(e)}`;t.innerHTML=`
            <img src="${n}" alt="Scan to view in AR" style="width: 200px; height: 200px; display: block;">
        `,console.log("[FlexFrame AR] QR code generated for URL:",e)}showNoARMessage(){alert("AR is not available for this exercise. Please ensure the exercise has AR models configured.")}hideQRModal(){this.qrModal&&(this.qrModal.style.display="none")}}const sc=new cy;function rc(r,e){if(e===zh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Ko||e===Ec){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===Ko)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class hy extends ai{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new my(t)}),this.register(function(t){return new gy(t)}),this.register(function(t){return new Ey(t)}),this.register(function(t){return new wy(t)}),this.register(function(t){return new Ty(t)}),this.register(function(t){return new yy(t)}),this.register(function(t){return new xy(t)}),this.register(function(t){return new by(t)}),this.register(function(t){return new vy(t)}),this.register(function(t){return new fy(t)}),this.register(function(t){return new Sy(t)}),this.register(function(t){return new Ay(t)}),this.register(function(t){return new My(t)}),this.register(function(t){return new _y(t)}),this.register(function(t){return new uy(t)}),this.register(function(t){return new Cy(t)}),this.register(function(t){return new Ry(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=ps.extractUrlBase(e);o=ps.resolveURL(c,this.path)}else o=ps.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Ea(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(h){t(h),s.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===eh){try{o[Ge.KHR_BINARY_GLTF]=new Iy(e)}catch(d){i&&i(d);return}s=JSON.parse(o[Ge.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Vy(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const d=this.pluginCallbacks[h](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const d=s.extensionsUsed[h],u=s.extensionsRequired||[];switch(d){case Ge.KHR_MATERIALS_UNLIT:o[d]=new py;break;case Ge.KHR_DRACO_MESH_COMPRESSION:o[d]=new Dy(s,this.dracoLoader);break;case Ge.KHR_TEXTURE_TRANSFORM:o[d]=new Py;break;case Ge.KHR_MESH_QUANTIZATION:o[d]=new Ly;break;default:u.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function dy(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const Ge={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class uy{constructor(e){this.parser=e,this.name=Ge.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const h=new ge(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Mt);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Qc(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new xu(h),c.distance=d;break;case"spot":c=new Au(h),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),_n(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class py{constructor(){this.name=Ge.KHR_MATERIALS_UNLIT}getMaterialType(){return ii}extendParams(e,t,n){const i=[];e.color=new ge(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Mt),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,gt))}return Promise.all(i)}}class fy{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class my{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Te(a,a)}return Promise.all(s)}}class gy{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ut}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class Ay{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class yy{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new ge(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Mt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,gt)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class xy{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class by{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new ge().setRGB(a[0],a[1],a[2],Mt),Promise.all(s)}}class vy{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ut}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class Sy{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new ge().setRGB(a[0],a[1],a[2],Mt),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,gt)),Promise.all(s)}}class _y{constructor(e){this.parser=e,this.name=Ge.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class My{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class Ey{constructor(e){this.parser=e,this.name=Ge.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class wy{constructor(e){this.parser=e,this.name=Ge.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Ty{constructor(e){this.parser=e,this.name=Ge.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Cy{constructor(e){this.name=Ge.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,d=i.byteStride,u=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,d,u,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*d);return o.decodeGltfBuffer(new Uint8Array(f),h,d,u,i.mode,i.filter),f})})}else return null}}class Ry{constructor(e){this.name=Ge.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==Zt.TRIANGLES&&c.mode!==Zt.TRIANGLE_STRIP&&c.mode!==Zt.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),d=h.isGroup?h.children:[h],u=c[0].count,f=[];for(const g of d){const A=new Le,m=new P,p=new qt,v=new P(1,1,1),M=new Zd(g.geometry,g.material,u);for(let y=0;y<u;y++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,y),l.SCALE&&v.fromBufferAttribute(l.SCALE,y),M.setMatrixAt(y,A.compose(m,p,v));for(const y in l)if(y==="_COLOR_0"){const C=l[y];M.instanceColor=new Jo(C.array,C.itemSize,C.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&g.geometry.setAttribute(y,l[y]);ht.prototype.copy.call(M,g),this.parser.assignFinalMaterial(M),f.push(M)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const eh="glTF",ls=12,oc={JSON:1313821514,BIN:5130562};class Iy{constructor(e){this.name=Ge.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ls),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==eh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ls,s=new DataView(e,ls);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===oc.JSON){const c=new Uint8Array(e,ls+o,a);this.content=n.decode(c)}else if(l===oc.BIN){const c=ls+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Dy{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ge.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const d=sa[h]||h.toLowerCase();a[d]=o[h]}for(const h in e.attributes){const d=sa[h]||h.toLowerCase();if(o[h]!==void 0){const u=n.accessors[e.attributes[h]],f=Pi[u.componentType];c[d]=f.name,l[d]=u.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(d,u){i.decodeDracoFile(h,function(f){for(const g in f.attributes){const A=f.attributes[g],m=l[g];m!==void 0&&(A.normalized=m)}d(f)},a,c,Mt,u)})})}}class Py{constructor(){this.name=Ge.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Ly{constructor(){this.name=Ge.KHR_MESH_QUANTIZATION}}class th extends Ss{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,d=(n-t)/h,u=d*d,f=u*d,g=e*c,A=g-c,m=-2*f+3*u,p=f-u,v=1-m,M=p-u+d;for(let y=0;y!==a;y++){const C=o[A+y+a],I=o[A+y+l]*h,T=o[g+y+a],w=o[g+y]*h;s[y]=v*C+M*I+m*T+p*w}return s}}const By=new qt;class Uy extends th{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return By.fromArray(s).normalize().toArray(s),s}}const Zt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Pi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ac={9728:Ft,9729:ct,9984:mc,9985:sr,9986:cs,9987:dn},lc={33071:Jt,33648:gr,10497:Ni},ho={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},sa={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},On={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Fy={CUBICSPLINE:void 0,LINEAR:gs,STEP:ms},uo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Ny(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Mr({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Tt})),r.DefaultMaterial}function Jn(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function _n(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Oy(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){const d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const d=e[c];if(n){const u=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):r.attributes.position;o.push(u)}if(i){const u=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):r.attributes.normal;a.push(u)}if(s){const u=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):r.attributes.color;l.push(u)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],d=c[1],u=c[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=d),s&&(r.morphAttributes.color=u),r.morphTargetsRelative=!0,r})}function ky(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Hy(r){let e;const t=r.extensions&&r.extensions[Ge.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+po(t.attributes):e=r.indices+":"+po(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+po(r.targets[n]);return e}function po(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function ra(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function zy(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Gy=new Le;class Vy{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new dy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new Wc(this.options.manager):this.textureLoader=new Su(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ea(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Jn(s,a,i),_n(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())s(h,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ge.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(ps.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=ho[i.type],a=Pi[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new _t(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=ho[i.type],c=Pi[i.componentType],h=c.BYTES_PER_ELEMENT,d=h*l,u=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let A,m;if(f&&f!==d){const p=Math.floor(u/f),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let M=t.cache.get(v);M||(A=new c(a,p*f,i.count*f/h),M=new qd(A,f/h),t.cache.add(v,M)),m=new ya(M,l,u%f/h,g)}else a===null?A=new c(i.count*l):A=new c(a,u,i.count*l),m=new _t(A,l,g);if(i.sparse!==void 0){const p=ho.SCALAR,v=Pi[i.sparse.indices.componentType],M=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,C=new v(o[1],M,i.sparse.count*p),I=new c(o[2],y,i.sparse.count*l);a!==null&&(m=new _t(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let T=0,w=C.length;T<w;T++){const _=C[T];if(m.setX(_,I[T*l]),l>=2&&m.setY(_,I[T*l+1]),l>=3&&m.setZ(_,I[T*l+2]),l>=4&&m.setW(_,I[T*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const u=(s.samplers||{})[o.sampler]||{};return h.magFilter=ac[u.magFilter]||ct,h.minFilter=ac[u.minFilter]||dn,h.wrapS=lc[u.wrapS]||Ni,h.wrapT=lc[u.wrapT]||Ni,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Ft&&h.minFilter!==ct,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(d){c=!0;const u=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(u),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(d){return new Promise(function(u,f){let g=u;t.isImageBitmapLoader===!0&&(g=function(A){const m=new At(A);m.needsUpdate=!0,u(m)}),t.load(ps.resolveURL(d,s.path),g,void 0,f)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),_n(d,o),d.userData.mimeType=o.mimeType||zy(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[Ge.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Ge.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[Ge.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Sa,ln.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new _r,ln.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Mr}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[Ge.KHR_MATERIALS_UNLIT]){const d=i[Ge.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),c.push(d.extendParams(a,s,t))}else{const d=s.pbrMetallicRoughness||{};if(a.color=new ge(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const u=d.baseColorFactor;a.color.setRGB(u[0],u[1],u[2],Mt),a.opacity=u[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,gt)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=ot);const h=s.alphaMode||uo.OPAQUE;if(h===uo.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===uo.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==ii&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Te(1,1),s.normalTexture.scale!==void 0)){const d=s.normalTexture.scale;a.normalScale.set(d,d)}if(s.occlusionTexture!==void 0&&o!==ii&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==ii){const d=s.emissiveFactor;a.emissive=new ge().setRGB(d[0],d[1],d[2],Mt)}return s.emissiveTexture!==void 0&&o!==ii&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,gt)),Promise.all(c).then(function(){const d=new o(a);return s.name&&(d.name=s.name),_n(d,s),t.associations.set(d,{materials:e}),s.extensions&&Jn(i,d,s),d})}createUniqueName(e){const t=Je.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[Ge.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return cc(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=Hy(c),d=i[h];if(d)o.push(d.promise);else{let u;c.extensions&&c.extensions[Ge.KHR_DRACO_MESH_COMPRESSION]?u=s(c):u=cc(new Nt,c,t),i[h]={primitive:c,promise:u},o.push(u)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?Ny(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],d=[];for(let f=0,g=h.length;f<g;f++){const A=h[f],m=o[f];let p;const v=c[f];if(m.mode===Zt.TRIANGLES||m.mode===Zt.TRIANGLE_STRIP||m.mode===Zt.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new jd(A,v):new Gt(A,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Zt.TRIANGLE_STRIP?p.geometry=rc(p.geometry,Ec):m.mode===Zt.TRIANGLE_FAN&&(p.geometry=rc(p.geometry,Ko));else if(m.mode===Zt.LINES)p=new Oc(A,v);else if(m.mode===Zt.LINE_STRIP)p=new ys(A,v);else if(m.mode===Zt.LINE_LOOP)p=new eu(A,v);else if(m.mode===Zt.POINTS)p=new kc(A,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&ky(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),_n(p,s),m.extensions&&Jn(i,p,m),t.assignFinalMaterial(p),d.push(p)}for(let f=0,g=d.length;f<g;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return s.extensions&&Jn(i,d[0],s),d[0];const u=new si;s.extensions&&Jn(i,u,s),t.associations.set(u,{meshes:e});for(let f=0,g=d.length;f<g;f++)u.add(d[f]);return u})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Bt(Cc.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ta(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),_n(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const d=o[c];if(d){a.push(d);const u=new Le;s!==null&&u.fromArray(s.array,c*16),l.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new ba(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let d=0,u=i.channels.length;d<u;d++){const f=i.channels[d],g=i.samplers[f.sampler],A=f.target,m=A.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,v=i.parameters!==void 0?i.parameters[g.output]:g.output;A.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",v)),c.push(g),h.push(A))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(d){const u=d[0],f=d[1],g=d[2],A=d[3],m=d[4],p=[];for(let v=0,M=u.length;v<M;v++){const y=u[v],C=f[v],I=g[v],T=A[v],w=m[v];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();const _=n._createAnimationTracks(y,C,I,T,w);if(_)for(let x=0;x<_.length;x++)p.push(_[x])}return new ea(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const h=c[0],d=c[1],u=c[2];u!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(u,Gy)});for(let f=0,g=d.length;f<g;f++)h.add(d[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(s.isBone===!0?h=new Nc:c.length>1?h=new si:c.length===1?h=c[0]:h=new ht,h!==c[0])for(let d=0,u=c.length;d<u;d++)h.add(c[d]);if(s.name&&(h.userData.name=s.name,h.name=o),_n(h,s),s.extensions&&Jn(n,h,s),s.matrix!==void 0){const d=new Le;d.fromArray(s.matrix),h.applyMatrix4(d)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new si;n.name&&(s.name=i.createUniqueName(n.name)),_n(s,n),n.extensions&&Jn(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,d=l.length;h<d;h++)s.add(l[h]);const c=h=>{const d=new Map;for(const[u,f]of i.associations)(u instanceof ln||u instanceof At)&&d.set(u,f);return h.traverse(u=>{const f=i.associations.get(u);f!=null&&d.set(u,f)}),d};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];On[s.path]===On.weights?e.traverse(function(u){u.morphTargetInfluences&&l.push(u.name?u.name:u.uuid)}):l.push(a);let c;switch(On[s.path]){case On.weights:c=Gi;break;case On.rotation:c=Vi;break;case On.position:case On.scale:c=Wi;break;default:switch(n.itemSize){case 1:c=Gi;break;case 2:case 3:default:c=Wi;break}break}const h=i.interpolation!==void 0?Fy[i.interpolation]:gs,d=this._getArrayFromAccessor(n);for(let u=0,f=l.length;u<f;u++){const g=new c(l[u]+"."+On[s.path],t.array,d,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=ra(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Vi?Uy:th;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Wy(r,e,t){const n=e.attributes,i=new Dn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new P(l[0],l[1],l[2]),new P(c[0],c[1],c[2])),a.normalized){const h=ra(Pi[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new P,l=new P;for(let c=0,h=s.length;c<h;c++){const d=s[c];if(d.POSITION!==void 0){const u=t.json.accessors[d.POSITION],f=u.min,g=u.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),u.normalized){const A=ra(Pi[u.componentType]);l.multiplyScalar(A)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new fn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function cc(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=sa[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Qe.workingColorSpace!==Mt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Qe.workingColorSpace}" not supported.`),_n(r,e),Wy(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Oy(r,e.targets,t):r})}class Qy{constructor(e){console.log("[ThemeEditor v2.0] Constructor called - Save section in header"),this.app=e,this.isOpen=!1,this.panel=null,this.currentSettings={primaryColor:"#4a9eff",spinnerColor:"#00f510",playerBgColor:"#1f1f1f",playerBgOpacity:0,playerButtonColor:"#c20e1d",playerButtonOpacity:1,playerIconColor:"#ffffff",playerAccentColor:"#c20e1d",menuBgColor:"#000000",menuBgOpacity:.9,menuTextColor:"#ffffff",menuTextOpacity:1,menuAccentColor:"#ff00f7",thumbnailLabelColor:"#000000",thumbnailLabelOpacity:.1,hideInfoPanel:!1,showScreenshotButton:!0,bgGradientTop:"#3865ad",bgGradientBottom:"#0101bc",bgGradientOpacity:1,ambientIntensity:.4,ambientColor:"#ffffff",directionalIntensity:1.43,directionalColor:"#ffffff",particlesEnabled:!0,particlesCount:1150,particlesSize:.0095,particlesColor:"#0d529c",particlesOpacity:1,particlesSpeed:.5};const t=window.flexframeSettings||{};this.ajaxUrl=t.ajaxUrl||window.ajaxurl||"/wp-admin/admin-ajax.php",this.nonce=t.nonce||"",this.init()}init(){console.log("[ThemeEditor v2.0] Initializing - Save section in header..."),document.addEventListener("keydown",n=>{if(n.key==="t"||n.key==="T"){if(n.target.tagName==="INPUT"||n.target.tagName==="TEXTAREA")return;this.toggle()}}),this.createPanel(),this.loadCurrentSettings();const t=new URLSearchParams(window.location.search).get("openThemeEditor");console.log("[ThemeEditor] URL params:",window.location.search),console.log("[ThemeEditor] openThemeEditor param:",t),t==="1"?(console.log("[ThemeEditor] Auto-opening in 1 second..."),setTimeout(()=>{console.log("[ThemeEditor] Opening now!"),this.open()},1e3)):console.log('[ThemeEditor] Not auto-opening (param not found or not "1")')}toggle(){this.isOpen?this.close():this.open()}open(){this.isOpen=!0,this.panel.classList.remove("hidden"),this.loadCurrentSettings(),setTimeout(()=>{this.panel.style.opacity="1",this.panel.style.transform="translateX(0)"},10)}close(){this.isOpen=!1,this.panel.style.opacity="0",this.panel.style.transform="translateX(100%)",setTimeout(()=>{this.panel.classList.add("hidden")},300)}loadCurrentSettings(){var t,n,i,s,o,a,l,c,h,d,u,f,g,A,m,p,v,M,y,C,I,T,w,_,x,R,k,F,z,Q,G,K,V,te,ne,ye,Me,Ue,q,ee,me,re,Se,We,we,at,st,Oe,D,It,ke,He,be,tt,xe,E,b,N,j,Z,Y,Ae,oe,he,Ve,$,de,Ee,Ce,ue,ze,Pe,$e,L,ie,W,X,le,ae,Ie,rt,ft,Ye,Ot,Yt,Xi,Ki,cn,li,Zi;const e=window.flexframeSettings||{};this.currentSettings={primaryColor:e.primaryColor||"#4a9eff",spinnerColor:((t=e.uiSettings)==null?void 0:t.spinnerColor)||"#00f510",playerBgColor:((i=(n=e.uiSettings)==null?void 0:n.player)==null?void 0:i.bgColor)||"#1f1f1f",playerBgOpacity:((o=(s=e.uiSettings)==null?void 0:s.player)==null?void 0:o.bgOpacity)??0,playerButtonColor:((l=(a=e.uiSettings)==null?void 0:a.player)==null?void 0:l.buttonBgColor)||"#c20e1d",playerButtonOpacity:((h=(c=e.uiSettings)==null?void 0:c.player)==null?void 0:h.buttonOpacity)??1,playerIconColor:((u=(d=e.uiSettings)==null?void 0:d.player)==null?void 0:u.buttonColor)||"#ffffff",playerAccentColor:((g=(f=e.uiSettings)==null?void 0:f.player)==null?void 0:g.accentColor)||"#c20e1d",menuBgColor:((m=(A=e.uiSettings)==null?void 0:A.menu)==null?void 0:m.bgColor)||"#000000",menuBgOpacity:((v=(p=e.uiSettings)==null?void 0:p.menu)==null?void 0:v.bgOpacity)??.9,menuTextColor:((y=(M=e.uiSettings)==null?void 0:M.menu)==null?void 0:y.textColor)||"#ffffff",menuTextOpacity:((I=(C=e.uiSettings)==null?void 0:C.menu)==null?void 0:I.textOpacity)??1,menuAccentColor:((w=(T=e.uiSettings)==null?void 0:T.menu)==null?void 0:w.accentColor)||"#ff00f7",thumbnailLabelColor:((x=(_=e.uiSettings)==null?void 0:_.menu)==null?void 0:x.thumbnailLabelColor)||"#000000",thumbnailLabelOpacity:((k=(R=e.uiSettings)==null?void 0:R.menu)==null?void 0:k.thumbnailLabelOpacity)??.1,hideInfoPanel:((F=e.uiSettings)==null?void 0:F.hideRightMenu)??!1,showScreenshotButton:((z=e.uiSettings)==null?void 0:z.showScreenshotButton)??!0,bgGradientTop:((Q=e.backgroundSettings)==null?void 0:Q.gradientTop)||"#3865ad",bgGradientBottom:((G=e.backgroundSettings)==null?void 0:G.gradientBottom)||"#0101bc",bgGradientOpacity:((K=e.backgroundSettings)==null?void 0:K.gradientAlpha)??1,ambientIntensity:((te=(V=e.lightingSettings)==null?void 0:V.ambientLight)==null?void 0:te.intensity)??.4,ambientColor:((ye=(ne=e.lightingSettings)==null?void 0:ne.ambientLight)==null?void 0:ye.color)||"#ffffff",directionalIntensity:((Ue=(Me=e.lightingSettings)==null?void 0:Me.directionalLight)==null?void 0:Ue.intensity)??1.43,directionalColor:((ee=(q=e.lightingSettings)==null?void 0:q.directionalLight)==null?void 0:ee.color)||"#ffffff",particlesEnabled:((me=e.particleSettings)==null?void 0:me.visible)??!0,particlesCount:((re=e.particleSettings)==null?void 0:re.count)??1150,particlesSize:((Se=e.particleSettings)==null?void 0:Se.size)??.0095,particlesColor:((We=e.particleSettings)==null?void 0:We.color)||"#0d529c",particlesOpacity:((we=e.particleSettings)==null?void 0:we.opacity)??1,particlesSpeed:((at=e.particleSettings)==null?void 0:at.speed)??.5,skinColor:((st=e.materialSettings)==null?void 0:st.skinColor)||"#ffdbac",skinOpacity:((Oe=e.materialSettings)==null?void 0:Oe.skinOpacity)??.4,skinRoughness:((D=e.materialSettings)==null?void 0:D.skinRoughness)??.7,skinMetalness:((It=e.materialSettings)==null?void 0:It.skinMetalness)??0,skinTransmission:((ke=e.materialSettings)==null?void 0:ke.skinTransmission)??0,skinThickness:((He=e.materialSettings)==null?void 0:He.skinThickness)??0,skinIor:((be=e.materialSettings)==null?void 0:be.skinIor)??1.5,skinEnvIntensity:((tt=e.materialSettings)==null?void 0:tt.skinEnvIntensity)??1,barbellColor:((xe=e.materialSettings)==null?void 0:xe.barbellColor)||"#808080",barbellOpacity:((E=e.materialSettings)==null?void 0:E.barbellOpacity)??1,barbellMetalness:((b=e.materialSettings)==null?void 0:b.barbellMetalness)??.8,barbellRoughness:((N=e.materialSettings)==null?void 0:N.barbellRoughness)??.3,bumperColor:((j=e.materialSettings)==null?void 0:j.bumperColor)||"#808080",bumperOpacity:((Z=e.materialSettings)==null?void 0:Z.bumperOpacity)??1,bumperMetalness:((Y=e.materialSettings)==null?void 0:Y.bumperMetalness)??0,bumperRoughness:((Ae=e.materialSettings)==null?void 0:Ae.bumperRoughness)??.8,cableColor:((oe=e.materialSettings)==null?void 0:oe.cableColor)||"#808080",cableOpacity:((he=e.materialSettings)==null?void 0:he.cableOpacity)??1,cableMetalness:((Ve=e.materialSettings)==null?void 0:Ve.cableMetalness)??.5,cableRoughness:(($=e.materialSettings)==null?void 0:$.cableRoughness)??.4,chromeColor:((de=e.materialSettings)==null?void 0:de.chromeColor)||"#cccccc",chromeOpacity:((Ee=e.materialSettings)==null?void 0:Ee.chromeOpacity)??1,chromeMetalness:((Ce=e.materialSettings)==null?void 0:Ce.chromeMetalness)??1,chromeRoughness:((ue=e.materialSettings)==null?void 0:ue.chromeRoughness)??.1,color1Color:((ze=e.materialSettings)==null?void 0:ze.color1Color)||e.primaryColor||"#4a9eff",color1Opacity:((Pe=e.materialSettings)==null?void 0:Pe.color1Opacity)??1,color1Metalness:(($e=e.materialSettings)==null?void 0:$e.color1Metalness)??.5,color1Roughness:((L=e.materialSettings)==null?void 0:L.color1Roughness)??.5,metalColor:((ie=e.materialSettings)==null?void 0:ie.metalColor)||"#b0b0b0",metalOpacity:((W=e.materialSettings)==null?void 0:W.metalOpacity)??1,metalMetalness:((X=e.materialSettings)==null?void 0:X.metalMetalness)??.9,metalRoughness:((le=e.materialSettings)==null?void 0:le.metalRoughness)??.3,padColor:((ae=e.materialSettings)==null?void 0:ae.padColor)||"#1a1a1a",padOpacity:((Ie=e.materialSettings)==null?void 0:Ie.padOpacity)??1,padMetalness:((rt=e.materialSettings)==null?void 0:rt.padMetalness)??0,padRoughness:((ft=e.materialSettings)==null?void 0:ft.padRoughness)??.9,plasticColor:((Ye=e.materialSettings)==null?void 0:Ye.plasticColor)||"#808080",plasticOpacity:((Ot=e.materialSettings)==null?void 0:Ot.plasticOpacity)??1,plasticMetalness:((Yt=e.materialSettings)==null?void 0:Yt.plasticMetalness)??0,plasticRoughness:((Xi=e.materialSettings)==null?void 0:Xi.plasticRoughness)??.6,rubberColor:((Ki=e.materialSettings)==null?void 0:Ki.rubberColor)||"#1a1a1a",rubberOpacity:((cn=e.materialSettings)==null?void 0:cn.rubberOpacity)??1,rubberMetalness:((li=e.materialSettings)==null?void 0:li.rubberMetalness)??0,rubberRoughness:((Zi=e.materialSettings)==null?void 0:Zi.rubberRoughness)??.95},this.updateInputs()}updateInputs(){Object.keys(this.currentSettings).forEach(e=>{const t=this.panel.querySelector(`[data-setting="${e}"]`);if(t)if(t.type==="checkbox")t.checked=this.currentSettings[e];else if(t.type==="range"){t.value=this.currentSettings[e];const n=t.nextElementSibling;n&&n.classList.contains("te-range-value")&&(n.textContent=this.formatValue(e,this.currentSettings[e]))}else t.value=this.currentSettings[e]})}formatValue(e,t){return e.includes("Opacity")||e.includes("Roughness")||e.includes("Metalness")||e.includes("Transmission")||e.includes("Intensity")||e.includes("Speed")?parseFloat(t).toFixed(2):e.includes("Count")?parseInt(t):e.includes("Size")&&e!=="particlesSize"?parseFloat(t).toFixed(3):e==="particlesSize"?parseFloat(t).toFixed(4):t}createPanel(){this.panel=document.createElement("div"),this.panel.id="theme-editor-panel",this.panel.innerHTML=`
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
            </div>
        `,this.addStyles(),document.body.appendChild(this.panel),this.setupEventListeners()}createColorInput(e,t){return`
            <div class="te-row">
                <label>${t}</label>
                <div class="te-color-wrapper">
                    <input type="color" data-setting="${e}" class="te-color-input" />
                    <span class="te-color-hex" data-hex-for="${e}"></span>
                </div>
            </div>
        `}createRangeInput(e,t,n,i,s){return`
            <div class="te-row">
                <label>${t}</label>
                <div class="te-range-wrapper">
                    <input type="range" data-setting="${e}" min="${n}" max="${i}" step="${s}" class="te-range-input" />
                    <span class="te-range-value">0</span>
                </div>
            </div>
        `}createCheckboxInput(e,t){return`
            <div class="te-row te-checkbox-row">
                <label>${t}</label>
                <label class="te-toggle">
                    <input type="checkbox" data-setting="${e}" />
                    <span class="te-toggle-slider"></span>
                </label>
            </div>
        `}setupEventListeners(){this.panel.querySelector(".te-close-btn").addEventListener("click",()=>this.close()),this.panel.querySelectorAll(".te-section-header").forEach(t=>{t.addEventListener("click",n=>{n.stopPropagation();const i=t.dataset.section,s=this.panel.querySelector(`#section-${i}`),o=t.querySelector(".te-toggle-icon"),a=t.closest(".te-nested");if(window.getComputedStyle(s).display==="none"){if(a){const c=t.closest(".te-section-content");c.querySelectorAll(".te-nested > .te-section-content").forEach(h=>{h!==s&&(h.style.display="none")}),c.querySelectorAll(".te-nested .te-section-header .te-toggle-icon").forEach(h=>{h!==o&&(h.textContent="▶")})}else this.panel.querySelectorAll(".te-content > .te-section > .te-section-content").forEach(d=>{d.style.display="none"}),this.panel.querySelectorAll(".te-content > .te-section > .te-section-header .te-toggle-icon").forEach(d=>{d.textContent="▶"});s.style.display="block",o.textContent="▼"}else s.style.display="none",o.textContent="▶"})}),this.panel.querySelectorAll(".te-preview-toggle").forEach(t=>{t.addEventListener("click",n=>{n.stopPropagation();const i=t.dataset.preview,s=t.classList.contains("active");if(i==="player"){let o=document.querySelector("#animation-player");o||(o=document.querySelector(".animation-player")),o||(o=document.querySelector('[class*="player"]')),o||(o=document.querySelector(".player-controls")),console.log("[Theme Editor] Looking for player, found:",o),o?s?(o.style.cssText="",o.classList.remove("te-force-visible"),t.textContent="Show Bottom Menu Preview",t.style.background="#4CAF50",t.classList.remove("active")):(o.classList.remove("hidden","hide","invisible","player-hidden"),o.style.cssText=`
                                display: flex !important;
                                opacity: 1 !important;
                                visibility: visible !important;
                                pointer-events: auto !important;
                                transform: translateY(0) !important;
                                transition: none !important;
                            `,o.classList.add("te-force-visible"),t.textContent="Hide Bottom Menu Preview",t.style.background="#f44336",t.classList.add("active"),console.log("[Theme Editor] Player shown. Classes:",o.className,"Style:",o.style.cssText)):(console.warn("[Theme Editor] Player element not found! Available elements:",{allIds:Array.from(document.querySelectorAll("[id]")).map(a=>a.id),allWithPlayer:Array.from(document.querySelectorAll('[class*="player"], [id*="player"]')).map(a=>`${a.tagName}#${a.id}.${a.className}`)}),t.textContent="Player Not Found",t.style.background="#ff9800")}else if(i==="menus"){const o=document.getElementById("exercisesToggle"),a=document.getElementById("exercisesDropdown"),l=o?o.closest(".thumbnail-menu-wrapper"):null;console.log("[Theme Editor] Exercises menu elements found:",{exercisesToggle:!!o,exercisesDropdown:!!a,exercisesWrapper:!!l}),s?(o&&(o.classList.remove("te-force-visible"),o.style.cssText=""),a&&(a.classList.remove("te-force-visible","show"),a.style.cssText=""),l&&(l.classList.remove("te-force-visible"),l.style.cssText=""),t.textContent="Show Side Menus Preview",t.style.background="#4CAF50",t.classList.remove("active")):(l&&(l.classList.add("te-force-visible"),l.style.cssText=`
                                display: block !important;
                                visibility: visible !important;
                                opacity: 1 !important;
                            `),o&&(o.classList.add("te-force-visible"),o.style.cssText=`
                                display: flex !important;
                                visibility: visible !important;
                                opacity: 1 !important;
                            `),a&&(a.classList.add("te-force-visible","show"),a.style.cssText=`
                                display: block !important;
                                visibility: visible !important;
                                opacity: 1 !important;
                                pointer-events: auto !important;
                            `),t.textContent="Hide Side Menus Preview",t.style.background="#f44336",t.classList.add("active"))}})}),this.panel.querySelectorAll("input[data-setting]").forEach(t=>{t.addEventListener("input",n=>{const i=n.target.dataset.setting;let s;if(n.target.type==="checkbox")s=n.target.checked;else if(n.target.type==="range"){s=parseFloat(n.target.value);const o=n.target.nextElementSibling;o&&(o.textContent=this.formatValue(i,s))}else s=n.target.value;if(n.target.type==="color"){const o=this.panel.querySelector(`[data-hex-for="${i}"]`);o&&(o.textContent=s)}this.currentSettings[i]=s,i!=="primaryColor"&&this.applySettingLive(i,s)})}),this.panel.querySelector("#te-save-btn").addEventListener("click",()=>this.saveTheme());const e=this.panel.querySelector(".te-save-primary-btn");e&&e.addEventListener("click",()=>{this.savePrimaryColor()})}applySettingLive(e,t){if(e.startsWith("bgGradient")&&this.app.sceneManager&&(this.app.backgroundParams.gradientTop=this.currentSettings.bgGradientTop,this.app.backgroundParams.gradientBottom=this.currentSettings.bgGradientBottom,this.app.backgroundParams.gradientAlpha=this.currentSettings.bgGradientOpacity,this.app.sceneManager.updateGradientBackground(this.app.backgroundParams)),e==="ambientIntensity"&&this.app.lightingSystem&&(this.app.lightingSystem.ambientLight.intensity=t),e==="ambientColor"&&this.app.lightingSystem&&this.app.lightingSystem.ambientLight.color.set(t),e==="directionalIntensity"&&this.app.lightingSystem&&(this.app.lightingSystem.directionalLight.intensity=t),e==="directionalColor"&&this.app.lightingSystem&&this.app.lightingSystem.directionalLight.color.set(t),e.startsWith("particles")&&this.app.particleSystem)if(this.app.particleSystem.params.visible=this.currentSettings.particlesEnabled,this.app.particleSystem.params.count=this.currentSettings.particlesCount,this.app.particleSystem.params.size=this.currentSettings.particlesSize,this.app.particleSystem.params.color=this.currentSettings.particlesColor,this.app.particleSystem.params.opacity=this.currentSettings.particlesOpacity,this.app.particleSystem.params.speed=this.currentSettings.particlesSpeed,e==="particlesCount"||e==="particlesEnabled")this.app.particleSystem.createDustParticles();else{const n=this.app.particleSystem.dustMaterial;n&&(n.color.set(this.currentSettings.particlesColor),n.opacity=this.currentSettings.particlesOpacity,n.size=this.currentSettings.particlesSize,n.needsUpdate=!0),this.app.particleSystem.dustParticles&&(this.app.particleSystem.dustParticles.visible=this.currentSettings.particlesEnabled)}if(e.startsWith("skin")&&window.model&&this.updateSkinMaterial(),e.startsWith("player")&&(console.log("Theme Editor: Updating player styling for",e,t),this.updatePlayerStyling()),(e.startsWith("menu")||e.startsWith("thumbnail"))&&(console.log("Theme Editor: Updating menu styling for",e,t),this.updateMenuStyling()),e==="hideInfoPanel"){const n=document.querySelector(".thumbnail-grid-container-right");n&&(n.style.display=t?"none":"")}if(e==="showScreenshotButton"){const n=document.querySelector(".screenshot-btn, #screenshot-btn");n&&(n.style.display=t?"flex":"none")}e==="spinnerColor"&&(console.log("Theme Editor: Updating spinner color to",t),this.app.updateSpinnerColor(t))}applyPrimaryColorToElements(e){console.log("[ThemeEditor] Applying primary color to elements:",e);const t=(c,h)=>{const d=parseInt(c.slice(1,3),16),u=parseInt(c.slice(3,5),16),f=parseInt(c.slice(5,7),16);return`rgba(${d}, ${u}, ${f}, ${h})`};this.currentSettings.playerAccentColor=e,this.currentSettings.playerButtonColor=e,this.app.playerStyleParams&&(this.app.playerStyleParams.scrubberColor=e,this.app.playerStyleParams.buttonColor=e);let n=document.getElementById("te-player-primary-color");n||(n=document.createElement("style"),n.id="te-player-primary-color",document.head.appendChild(n)),n.textContent=`
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
        `,console.log("[ThemeEditor] Updated animation player colors via CSS"),this.currentSettings.spinnerColor=e;let i=document.getElementById("te-spinner-primary-color");i||(i=document.createElement("style"),i.id="te-spinner-primary-color",document.head.appendChild(i)),i.textContent=`
            /* Spinner Color - from Primary Color */
            /* COOL SPINNER (original) */
            #model-loader .loader-spinner {
                background: conic-gradient(
                    from 0deg,
                    transparent 0%,
                    ${t(e,.3)} 30%,
                    ${t(e,.8)} 60%,
                    ${e} 80%,
                    ${e} 100%
                ) !important;
            }
            #model-loader .loader-spinner::before {
                box-shadow: inset 0 0 10px ${t(e,.3)} !important;
            }
            
            /* GRADIENT SPINNER (circle-border) */
            #model-loader .circle-border {
                background: linear-gradient(0deg, ${t(e,.1)} 33%, ${e} 100%) !important;
            }
            
            /* DOTS SPINNER */
            #model-loader .dots-loader span {
                background-color: ${e} !important;
            }
            
            /* PULSE SPINNER */
            #model-loader .pulse-loader {
                background-color: ${e} !important;
                box-shadow: 0 0 20px ${t(e,.5)} !important;
            }
            
            /* RING SPINNER */
            #model-loader .ring-loader {
                border-color: ${t(e,.2)} !important;
                border-top-color: ${e} !important;
            }
        `,console.log("[ThemeEditor] Updated spinner color via CSS"),this.app.lightingSystem&&this.app.lightingSystem.directionalLight&&(this.currentSettings.directionalColor=e,this.app.lightingSystem.directionalLight.color.set(e),console.log("[ThemeEditor] Updated directional light color"));const s=this.panel.querySelector('[data-setting="spinnerColor"]');s&&(s.value=e);const o=this.panel.querySelector('[data-setting="playerAccentColor"]');o&&(o.value=e);const a=this.panel.querySelector('[data-setting="playerButtonColor"]');a&&(a.value=e);const l=this.panel.querySelector('[data-setting="directionalColor"]');l&&(l.value=e),console.log("[ThemeEditor] Primary color applied to all elements")}savePrimaryColor(){const e=this.currentSettings.primaryColor,t=this.panel.querySelector(".te-save-primary-btn");if(!t)return;this.applyPrimaryColorToElements(e);const n=t.textContent;t.textContent="Saving...",t.disabled=!0;const i=new FormData;i.append("action","flexframe_save_primary_color"),i.append("nonce",this.nonce),i.append("primary_color",e),fetch(this.ajaxUrl,{method:"POST",body:i}).then(s=>s.json()).then(s=>{s.success?(t.textContent="Applying...",setTimeout(()=>{window.location.href=window.location.href.split("?")[0]+"?t="+Date.now()},500)):(t.textContent="Error!",t.style.background="#f44336",setTimeout(()=>{t.textContent=n,t.style.background="#4CAF50",t.disabled=!1},2e3),console.error("Failed to save primary color:",s))}).catch(s=>{t.textContent="Error!",t.style.background="#f44336",setTimeout(()=>{t.textContent=n,t.style.background="#4CAF50",t.disabled=!1},2e3),console.error("Error saving primary color:",s)})}updatePrimaryColor(e){}updatePrimaryColorLegacy(e){window.flexframeSettings&&(window.flexframeSettings.primaryColor=e),document.documentElement.style.setProperty("--flexframe-primary-color",e);const t=e.replace("#",""),n=parseInt(t.substring(0,2),16),i=parseInt(t.substring(2,4),16),s=parseInt(t.substring(4,6),16);document.documentElement.style.setProperty("--flexframe-primary-color-rgb",`${n}, ${i}, ${s}`),this.app.updateProgressBarColor&&this.app.updateProgressBarColor(e),this.app.updateSpinnerColor&&this.app.updateSpinnerColor(e),window.menuManager&&(window.menuManager.menus&&Object.values(window.menuManager.menus).forEach(a=>{a.settings&&(a.settings.glowColor=e)}),window.menuManager.glowSettings&&(window.menuManager.glowSettings.glowColor=e)),this.app.particleSystem&&(this.app.particleSystem.params.color=e,this.app.particleSystem.dustMaterial&&(this.app.particleSystem.dustMaterial.color.set(e),this.app.particleSystem.dustMaterial.needsUpdate=!0));let o=document.getElementById("te-primary-color-style");o||(o=document.createElement("style"),o.id="te-primary-color-style",document.head.appendChild(o)),o.textContent=`
            /* Primary Color Overrides */
            :root {
                --flexframe-primary-color: ${e} !important;
                --flexframe-primary-color-rgb: ${n}, ${i}, ${s} !important;
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
        `,console.log("Theme Editor: Primary color applied",{color:e,r:n,g:i,b:s})}updateSkinMaterial(){if(!window.model)return;const e=this.currentSettings.skinColor,t=this.currentSettings.skinOpacity,n=this.currentSettings.skinRoughness,i=this.currentSettings.skinMetalness,s=this.currentSettings.skinTransmission,o=this.currentSettings.skinThickness,a=this.currentSettings.skinIor,l=this.currentSettings.skinEnvIntensity;window.model.traverse(c=>{c.isMesh&&c.material&&(Array.isArray(c.material)?c.material:[c.material]).forEach(d=>{d.name&&d.name.toUpperCase()==="SKIN"&&(d.color.set(e),d.opacity=t,d.transparent=t<1,d.roughness=n,d.metalness=i,d.transmission!==void 0&&(d.transmission=s),d.thickness!==void 0&&(d.thickness=o),d.ior!==void 0&&(d.ior=a),d.envMapIntensity!==void 0&&(d.envMapIntensity=l),d.needsUpdate=!0)})})}updatePlayerStyling(){if(!document.querySelector(".animation-player")){console.log("Theme Editor: Player element not found");return}const t=this.currentSettings.playerBgColor,n=this.currentSettings.playerBgOpacity,i=this.currentSettings.playerButtonColor,s=this.currentSettings.playerButtonOpacity,o=this.currentSettings.playerIconColor,a=this.currentSettings.playerAccentColor,l=this.hexToRgba(t,n),c=this.hexToRgba(i,s);let h=document.getElementById("te-player-style");h||(h=document.createElement("style"),h.id="te-player-style",document.head.appendChild(h)),h.textContent=`
            .animation-player {
                background-color: ${l} !important;
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
                fill: ${o} !important;
            }
            .animation-player .speed-btn span,
            .animation-player .ar-btn span,
            .animation-player .quality-btn span,
            .animation-player #quality-text,
            .animation-player #speed-text {
                color: ${o} !important;
            }
            .animation-player .time-display,
            .animation-player .time-display span,
            .animation-player #current-time,
            .animation-player #total-time {
                color: ${o} !important;
            }
            .animation-player .timeline-slider::-webkit-slider-thumb {
                background: ${a} !important;
            }
            .animation-player .timeline-slider::-moz-range-thumb {
                background: ${a} !important;
            }
        `,console.log("Theme Editor: Player styles injected",{bgRgba:l,btnRgba:c,iconColor:o,accentColor:a})}updateMenuStyling(){const e=this.currentSettings.menuBgColor,t=this.currentSettings.menuBgOpacity,n=this.currentSettings.menuTextColor,i=this.currentSettings.menuTextOpacity??1,s=this.currentSettings.menuAccentColor,o=this.currentSettings.thumbnailLabelColor||"#000000",a=this.currentSettings.thumbnailLabelOpacity??.1,l=this.currentSettings.primaryColor||"#f50000",c=this.hexToRgba(e,t),h=this.hexToRgba(n,i),d=this.hexToRgba(e,Math.min(t+.2,1)),u=this.hexToRgba(o,a),f=this.hexToRgba(l,.35),g=this.hexToRgba(l,.5);let A=document.getElementById("te-menu-style");A||(A=document.createElement("style"),A.id="te-menu-style",document.head.appendChild(A)),A.textContent=`
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
                background-color: ${c} !important;
            }
            
            /* Menu toggle buttons */
            #flexframe-viewer-container .thumbnail-menu-toggle,
            .thumbnail-grid-container .thumbnail-menu-toggle,
            button.thumbnail-menu-toggle,
            .thumbnail-menu-toggle {
                background-color: ${c} !important;
                color: ${h} !important;
            }
            
            /* Toggle button text and icons */
            #flexframe-viewer-container .thumbnail-menu-toggle span,
            .thumbnail-menu-toggle span {
                color: ${h} !important;
            }
            #flexframe-viewer-container .thumbnail-menu-toggle svg,
            .thumbnail-menu-toggle svg {
                fill: ${n} !important;
                opacity: ${i} !important;
            }
            
            /* All menu content text */
            .thumbnail-grid-container *,
            .thumbnail-dropdown *,
            .exercise-menu *,
            .menu-panel * {
                color: ${h} !important;
            }
            
            /* Thumbnail items */
            .thumbnail-item {
                color: ${h} !important;
            }
            .thumbnail-label {
                color: ${h} !important;
                background: linear-gradient(to top, ${u}, transparent) !important;
            }
            
            /* Dropdown borders - accent color */
            #flexframe-viewer-container .thumbnail-dropdown,
            .thumbnail-dropdown {
                border: 2px solid ${s} !important;
            }
            
            /* Right Menu */
            #flexframe-viewer-container .thumbnail-grid-container-right,
            .thumbnail-grid-container-right {
                background-color: transparent !important;
            }
            #flexframe-viewer-container .thumbnail-dropdown-right,
            .thumbnail-dropdown-right {
                background-color: ${c} !important;
                border: 2px solid ${s} !important;
            }
            .thumbnail-grid-container-right *,
            .thumbnail-dropdown-right * {
                color: ${h} !important;
            }
            /* Info Step Items - use PRIMARY COLOR with 35% opacity and 50px blur */
            #flexframe-viewer-container .info-step-item,
            .thumbnail-dropdown-right .info-step-item,
            .info-step-item {
                background: ${f} !important;
                backdrop-filter: blur(50px) !important;
                -webkit-backdrop-filter: blur(50px) !important;
                color: ${h} !important;
            }
            .info-step-title {
                color: ${h} !important;
            }
            .info-step-text {
                color: ${h} !important;
            }
            
            /* Scroll buttons */
            .scroll-btn {
                background-color: ${d} !important;
                color: ${h} !important;
            }
            .scroll-btn svg {
                fill: ${n} !important;
                opacity: ${i} !important;
            }
            
            /* Hover states */
            #flexframe-viewer-container .thumbnail-menu-toggle:hover,
            #flexframe-viewer-container .thumbnail-menu-toggle.active,
            .thumbnail-menu-toggle:hover,
            .thumbnail-menu-toggle.active,
            .thumbnail-item:hover { 
                background-color: ${s} !important; 
            }
            #flexframe-viewer-container .info-step-item:hover,
            .thumbnail-dropdown-right .info-step-item:hover,
            .info-step-item:hover {
                background: ${g} !important;
                border-color: ${s} !important;
            }
            
            /* Menu hint tabs */
            #flexframe-viewer-container .menu-hint-tab,
            .menu-hint-tab,
            .menu-hint-tab-right {
                background-color: ${c} !important;
                border-color: ${s} !important;
            }
            
            /* Search Input - use menu background color */
            #flexframe-viewer-container .search-input,
            #flexframe-viewer-container input.search-input,
            #flexframe-viewer-container #searchInput,
            .thumbnail-dropdown .search-input,
            .search-header .search-input {
                background-color: ${c} !important;
                color: ${h} !important;
                border-color: ${s}66 !important;
            }
            #flexframe-viewer-container .search-input:focus,
            #flexframe-viewer-container #searchInput:focus,
            .thumbnail-dropdown .search-input:focus {
                background-color: ${c} !important;
                border-color: ${s} !important;
            }
            #flexframe-viewer-container .search-input::placeholder,
            #flexframe-viewer-container #searchInput::placeholder {
                color: ${h} !important;
                opacity: 0.6 !important;
            }
            
            /* Search Header - use menu background color */
            #flexframe-viewer-container .search-header,
            .thumbnail-dropdown .search-header {
                background: linear-gradient(180deg, ${this.hexToRgba(e,Math.min(t+.1,1))}, ${c}) !important;
                border-bottom-color: ${s}66 !important;
            }
            
            /* Search action button */
            #flexframe-viewer-container .search-action-btn,
            .thumbnail-dropdown .search-action-btn {
                background-color: ${s}33 !important;
                color: ${s} !important;
            }
            #flexframe-viewer-container .search-action-btn:hover,
            .thumbnail-dropdown .search-action-btn:hover {
                background-color: ${s}66 !important;
            }
            
            /* Search suggestions dropdown */
            #flexframe-viewer-container .search-suggestions,
            .thumbnail-dropdown .search-suggestions {
                background-color: ${c} !important;
                border-color: ${s}66 !important;
            }
            .search-suggestion-item:hover {
                background-color: ${s}33 !important;
            }
        `,console.log("Theme Editor: Menu styles injected",{bgRgba:c,textRgba:h,accentColor:s,labelGradient:u})}hexToRgba(e,t){const n=parseInt(e.slice(1,3),16),i=parseInt(e.slice(3,5),16),s=parseInt(e.slice(5,7),16);return`rgba(${n}, ${i}, ${s}, ${t})`}async saveTheme(){var i;const e=this.panel.querySelector("#te-theme-name").value.trim();if(!e){this.showMessage("Please enter a theme name","error");return}const t=this.panel.querySelector("#te-save-btn");t.disabled=!0,t.innerHTML="Saving...",console.log("[Theme Editor] Current settings at save:",this.currentSettings);const n={primary_color:this.currentSettings.primaryColor,primary_color_mode:"custom",spinner_color:this.currentSettings.spinnerColor,use_logo_loader:!1,logo_loader_animation:"pulse",logo_loader_size:100,player_bg_color:this.currentSettings.playerBgColor,player_bg_opacity:this.currentSettings.playerBgOpacity,player_button_bg_color:this.currentSettings.playerButtonColor,player_button_bg_opacity:this.currentSettings.playerButtonOpacity,player_icon_color:this.currentSettings.playerIconColor,player_accent_color:this.currentSettings.playerAccentColor,player_always_visible:"no",menu_bg_color:this.currentSettings.menuBgColor,menu_bg_opacity:this.currentSettings.menuBgOpacity,menu_text_color:this.currentSettings.menuTextColor,menu_text_opacity:this.currentSettings.menuTextOpacity,menu_accent_color:this.currentSettings.menuAccentColor,thumbnail_label_color:this.currentSettings.thumbnailLabelColor,thumbnail_label_opacity:this.currentSettings.thumbnailLabelOpacity,hide_right_menu:this.currentSettings.hideInfoPanel,show_screenshot_button:this.currentSettings.showScreenshotButton,skin_color:this.currentSettings.skinColor,skin_opacity:this.currentSettings.skinOpacity,skin_roughness:this.currentSettings.skinRoughness,skin_metalness:this.currentSettings.skinMetalness,skin_transmission:this.currentSettings.skinTransmission,skin_thickness:this.currentSettings.skinThickness,skin_ior:this.currentSettings.skinIor,skin_env_intensity:this.currentSettings.skinEnvIntensity,bg_gradient_top:this.currentSettings.bgGradientTop,bg_gradient_bottom:this.currentSettings.bgGradientBottom,bg_gradient_opacity:this.currentSettings.bgGradientOpacity,ambient_intensity:this.currentSettings.ambientIntensity,ambient_color:this.currentSettings.ambientColor,directional_intensity:this.currentSettings.directionalIntensity,directional_color:this.currentSettings.directionalColor,particles_enabled:this.currentSettings.particlesEnabled,particle_count:this.currentSettings.particlesCount,particle_size:this.currentSettings.particlesSize,particle_color:this.currentSettings.particlesColor,particle_opacity:this.currentSettings.particlesOpacity,particle_speed:this.currentSettings.particlesSpeed};console.log("[Theme Editor] Saving theme with primary_color:",n.primary_color,"mode:",n.primary_color_mode);try{if(window.flexframeSettings&&window.flexframeSettings.ajaxUrl){const o=await(await fetch(window.flexframeSettings.ajaxUrl,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({action:"flexframe_save_custom_preset",preset_name:e,preset_data:JSON.stringify(n),nonce:window.flexframeSettings.nonce||""})})).json();o.success?(this.showMessage(`Theme "${e}" saved! It will appear in Step 4 dropdown.`,"success"),this.panel.querySelector("#te-theme-name").value=""):this.showMessage(((i=o.data)==null?void 0:i.message)||"Error saving theme","error")}else{const s=JSON.parse(localStorage.getItem("flexframe_themes")||"{}");s[e]=n,localStorage.setItem("flexframe_themes",JSON.stringify(s)),this.showMessage(`Theme "${e}" saved locally!`,"success"),this.panel.querySelector("#te-theme-name").value=""}}catch(s){console.error("Error saving theme:",s),this.showMessage("Error saving theme: "+s.message,"error")}t.disabled=!1,t.innerHTML="Save Theme"}showMessage(e,t){const n=this.panel.querySelector("#te-save-message");n.textContent=e,n.className=`te-message te-message-${t}`,n.style.display="block",setTimeout(()=>{n.style.display="none"},4e3)}addStyles(){const e=document.createElement("style");e.textContent=`
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
        `,document.head.appendChild(e)}}const dr="2026-01-29T06:15:07.306Z",nh=170;console.log("[FlexFrame Build] main.js v28.4 loaded - AR Support - Build #"+nh+" - "+dr);document.addEventListener("keydown",r=>{if(r.key==="l"||r.key==="L"){if(r.target.tagName==="INPUT"||r.target.tagName==="TEXTAREA")return;console.log("%c═══════════════════════════════════════════════════════","color: #4CAF50; font-weight: bold;"),console.log("%c🔍 FLEXFRAME BUILD INFO","color: #4CAF50; font-size: 16px; font-weight: bold;"),console.log("%c═══════════════════════════════════════════════════════","color: #4CAF50; font-weight: bold;"),console.log("%c📦 Version:","color: #2196F3; font-weight: bold;","v28.4 - AR Support"),console.log("%c🔢 Build Number:","color: #2196F3; font-weight: bold;","#"+nh),console.log("%c🕒 Build Timestamp:","color: #2196F3; font-weight: bold;",dr),console.log("%c📅 Build Date:","color: #2196F3; font-weight: bold;",new Date(dr).toLocaleString()),console.log("%c⏱️  Time Ago:","color: #2196F3; font-weight: bold;",qy(dr)),window.flexframeSettings&&window.flexframeSettings.pluginUrl&&(console.log("%c🔗 Plugin URL:","color: #2196F3; font-weight: bold;",window.flexframeSettings.pluginUrl),console.log("%c📂 Plugin Version:","color: #2196F3; font-weight: bold;",window.flexframeSettings.pluginVersion||"N/A")),console.log("%c═══════════════════════════════════════════════════════","color: #4CAF50; font-weight: bold;")}});function qy(r){const e=new Date,t=new Date(r),n=e-t,i=Math.floor(n/1e3),s=Math.floor(i/60),o=Math.floor(s/60),a=Math.floor(o/24);return i<60?`${i} seconds ago`:s<60?`${s} minutes ago`:o<24?`${o} hours ago`:`${a} days ago`}function Li(r){return window.flexframeSettings&&window.flexframeSettings.pluginUrl?r.startsWith("http://")||r.startsWith("https://")?r:window.flexframeSettings.pluginUrl+"assets/"+r:r}class Yy{constructor(){this.sceneManager=null,this.cameraManager=null,this.lightingSystem=null,this.particleSystem=null,this.settingsManager=null,this.renderer=null,this.gui=null,this.sizes={width:window.innerWidth,height:window.innerHeight},this.clock=new Mu,this.textureLoader=new Wc,this.gltfLoader=new hy,this.raycaster=new qc,this.mouse=new Te,this.mixer=null,this.allClickableMeshes=[],this.ground=null,this.circleGeometry=null,this.planeGeometry=null,this.shadowGroundMaterial=null,this.solidGroundMaterial=null,this.useShadowMaterial=!1,this.backgroundParams={gradientTop:"#3865ad",gradientBottom:"#0101bc",gradientAlpha:1},this.groundParams={mode:"Infinite Canvas",color:"#222222",roughness:1,metalness:0,shadowOpacity:.4,receiveShadow:!0,castShadow:!1,visible:!0},this.playerStyleParams={backgroundColor:"#1f1f1f",backgroundOpacity:0,playerWidth:95,showTimeDisplay:!0,buttonColor:"#c20e1d",buttonOpacity:1,scrubberColor:"#c20e1d",scrubberOpacity:.7,textColor:"#dedede",textOpacity:1},this.loaderParams={spinnerStyle:"cool"},this.init()}async init(){this.sceneManager=new FA,this.cameraManager=new ZA(this.sceneManager.getCanvas(),this.sizes),this.lightingSystem=new $A(this.sceneManager.getScene()),this.particleSystem=new ey(this.sceneManager.getScene()),this.settingsManager=new ty,this.animationPlayer=new ny,this.themeEditor=new Qy(this),this.setupScreenshotButton(),this.setupARBranding(),setTimeout(()=>{this.setupQualityToggle()},100),console.log("🚀 CREATING MultiThumbnailMenuSystem..."),this.multiThumbnailMenuSystem=new ay,console.log("✅ MultiThumbnailMenuSystem created:",this.multiThumbnailMenuSystem),this.rightMenuSystem=new ly,window.menuManager=this.multiThumbnailMenuSystem,console.log("✅ window.menuManager set:",window.menuManager),window.rightMenuManager=this.rightMenuSystem,this.setupMobileSearchCloseButton(),document.addEventListener("thumbnailSelected",e=>{console.log("Thumbnail selected:",e.detail.thumbnail)}),document.addEventListener("exercisesSelected",async e=>{const t=e.detail.item;if(this.currentExerciseName=t.name,this.screenshotPanel){const n=this.screenshotPanel.querySelector("#ss-filename");n&&(n.value=t.name)}if(t.configUrl)try{const n=`?t=${Date.now()}`,s=Li(t.configUrl.replace("./",""))+n,a=await(await fetch(s)).json();if(this.currentConfig=a,sc.updateConfig(a),this.pendingModelConfig=a.model,this.modelUrlSQ=a.modelUrl||a.modelUrlSQ,this.modelUrlHQ=a.modelUrlHQ,this.currentModelQuality="SQ",this.isQualitySwitching=!1,this.updateQualityButtonVisibility(),this.modelUrlSQ&&await this.loadModel(this.modelUrlSQ),a.camera){const l=this.cameraManager.getCamera();a.camera.position&&l.position.set(...a.camera.position),a.camera.rotation&&l.rotation.set(...a.camera.rotation),a.camera.target&&this.cameraManager.getControls().target.set(...a.camera.target),this.cameraManager.getControls().update(),this.cameraManager.updateOriginalState(a.camera.position,a.camera.rotation,a.camera.target)}a.rightMenuTabs&&window.rightMenuManager&&window.rightMenuManager.updateFromConfig(a.rightMenuTabs)}catch(n){console.error("Failed to load exercise config:",n)}}),this.animationPlayer.setVisibility(!0),this.applyWordPressUISettings(),this.applyWordPressSceneSettings(),setTimeout(()=>{this.initializePlayerStyling()},100),this.setupCanvasInteraction(),this.screenshotManager=null,this.cameraManager.setScene(this.sceneManager.getScene()),window.camera=this.cameraManager.getCamera(),window.app=this,this.settingsManager.registerManager("background",{getSettings:()=>this.backgroundParams,applySettings:e=>{Object.assign(this.backgroundParams,e),this.sceneManager.updateGradientBackground(this.backgroundParams)}}),this.settingsManager.registerManager("ground",{getSettings:()=>this.groundParams,applySettings:e=>this.applyGroundSettings(e)}),this.settingsManager.registerManager("camera",this.cameraManager),this.settingsManager.registerManager("lighting",this.lightingSystem),this.settingsManager.registerManager("dustParticles",this.particleSystem),this.settingsManager.registerManager("animationPlayer",this.animationPlayer),this.settingsManager.registerManager("multiThumbnailMenuSystem",this.multiThumbnailMenuSystem),this.settingsManager.registerManager("rightMenuSystem",this.rightMenuSystem),this.settingsManager.registerManager("playerStyling",{getSettings:()=>this.playerStyleParams,applySettings:e=>{Object.assign(this.playerStyleParams,e),setTimeout(()=>{this.initializePlayerStyling(),this.gui&&typeof this.gui.updateDisplay=="function"&&this.gui.updateDisplay()},200)}}),this.settingsManager.registerManager("loader",{getSettings:()=>this.loaderParams,applySettings:e=>{Object.assign(this.loaderParams,e),this.updateLoaderSpinner()}}),this.setupRenderer(),this.setupGround(),this.setupGUI(),this.setupEventListeners(),this.sceneManager.updateGradientBackground(this.backgroundParams),await this.waitForDefaultSettings(),this.settingsManager.applyDefaultSettings(),this.applyWordPressSceneSettings(),setTimeout(()=>this.updateAllGUIControls(),500),this.animationPlayer.setVisibility(!0),this.checkUrlForExercise(),this.animate()}checkUrlForExercise(){let t=new URLSearchParams(window.location.search).get("exercise");if(!t&&window.location.hash&&(t=window.location.hash.substring(1)),!t)return;console.log("🔗 URL exercise parameter found:",t);const n=t.toLowerCase().replace(/-/g,"_").replace(/%20/g,"_").replace(/ /g,"_");this.waitForExercisesAndSelect(n,t)}async waitForExercisesAndSelect(e,t){var s,o,a;let n=0;const i=50;for(;n<i;){const l=window.menuManager;if(((a=(o=(s=l==null?void 0:l.menus)==null?void 0:s.search)==null?void 0:o.allExercises)==null?void 0:a.length)>0){const c=l.menus.search.allExercises,h=c.find(d=>{var g,A,m,p;const u=(g=d.id)==null?void 0:g.toLowerCase().replace(/-/g,"_"),f=(A=d.name)==null?void 0:A.toLowerCase().replace(/ /g,"_").replace(/-/g,"_");return u===e||f===e||((m=d.id)==null?void 0:m.toLowerCase())===t.toLowerCase()||((p=d.name)==null?void 0:p.toLowerCase())===t.toLowerCase().replace(/_/g," ").replace(/-/g," ")});if(h){console.log("✅ Found exercise from URL:",h.name);const d=new CustomEvent("exercisesSelected",{detail:{item:h,menuType:"url-preload"}});document.dispatchEvent(d),l.menus.search&&(l.menus.search.selectedId=h.id);return}else{console.warn("⚠️ Exercise not found for URL slug:",t),console.log("Available exercise IDs:",c.map(d=>d.id).slice(0,10));return}}await new Promise(c=>setTimeout(c,100)),n++}console.warn("⚠️ Timed out waiting for exercises to load for URL preload")}async waitForDefaultSettings(){for(;!this.settingsManager.getDefaultSettings();)await new Promise(e=>setTimeout(e,100))}setupRenderer(){this.renderer=new Jc({canvas:this.sceneManager.getCanvas(),antialias:!0}),this.renderer.setSize(this.sizes.width,this.sizes.height),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=dc,this.renderer.toneMapping=pc,this.renderer.toneMappingExposure=1}updateLoaderSpinner(){const e=document.getElementById("model-loader");if(!e)return;e.querySelectorAll(".spinner-box").forEach(i=>i.style.display="none");const n=e.querySelector(`[data-spinner="${this.loaderParams.spinnerStyle}"]`);n&&(n.style.display="flex")}updateLoadProgress(e){const t=document.getElementById("logo-progress-bar"),n=document.getElementById("logo-progress-text");e===-1?(t&&(t.style.width="100%",t.style.animation="indeterminateProgress 1.5s ease-in-out infinite"),n&&(n.textContent="Loading...")):(t&&(t.style.animation="none",t.style.width=`${e}%`),n&&(n.textContent=`${e}%`))}applyWordPressUISettings(){var i;if(!window.flexframeSettings||!window.flexframeSettings.uiSettings){console.log("[FlexFrame UI] No WordPress UI settings found, using defaults");return}const e=window.flexframeSettings.uiSettings;if(console.log("[FlexFrame UI] Applying WordPress UI settings:",e),e.player){const s=window.innerWidth<=768,o=s?!1:e.player.alwaysVisible===!0;console.log("[FlexFrame UI] Player always visible setting:",o,"isMobile:",s),this.animationPlayer&&(this.animationPlayer.setAlwaysVisible(o),console.log("[FlexFrame UI] Applied alwaysVisible to animation player")),e.player.bgColor&&(this.playerStyleParams.backgroundColor=e.player.bgColor),e.player.bgOpacity!==void 0&&(this.playerStyleParams.backgroundOpacity=e.player.bgOpacity),e.player.buttonColor&&(this.playerStyleParams.buttonColor=e.player.buttonColor),e.player.accentColor&&(this.playerStyleParams.scrubberColor=e.player.accentColor)}const t=((i=window.flexframeSettings)==null?void 0:i.primaryColor)||"#4a9eff",n=e.spinnerColor||t;this.updateSpinnerColor(n),this.updateProgressBarColor(t),console.log("[FlexFrame UI] Spinner color:",n,", Progress bar color (primary):",t)}applyWordPressSceneSettings(){var e,t,n,i;if((e=window.flexframeSettings)!=null&&e.backgroundSettings){const s=window.flexframeSettings.backgroundSettings;console.log("[FlexFrame Scene] Applying WordPress background settings:",s),this.backgroundParams.gradientTop=s.gradientTop||"#3865ad",this.backgroundParams.gradientBottom=s.gradientBottom||"#0101bc",this.backgroundParams.gradientAlpha=s.gradientAlpha??1,this.sceneManager&&this.sceneManager.updateGradientBackground(this.backgroundParams)}if((t=window.flexframeSettings)!=null&&t.lightingSettings&&this.lightingSystem){const s=window.flexframeSettings.lightingSettings;if(console.log("[FlexFrame Scene] Applying WordPress lighting settings:",s),s.ambientLight&&(s.ambientLight.intensity!==void 0&&(this.lightingSystem.ambientLight.intensity=s.ambientLight.intensity),s.ambientLight.color&&this.lightingSystem.ambientLight.color.set(s.ambientLight.color)),s.directionalLight&&(s.directionalLight.intensity!==void 0&&(this.lightingSystem.directionalLight.intensity=s.directionalLight.intensity),s.directionalLight.color&&this.lightingSystem.directionalLight.color.set(s.directionalLight.color),s.directionalLight.position)){const o=s.directionalLight.position;o.x!==void 0&&(this.lightingSystem.directionalLight.position.x=o.x),o.y!==void 0&&(this.lightingSystem.directionalLight.position.y=o.y),o.z!==void 0&&(this.lightingSystem.directionalLight.position.z=o.z)}}if((n=window.flexframeSettings)!=null&&n.particleSettings&&this.particleSystem){const s=window.flexframeSettings.particleSettings;console.log("[FlexFrame Scene] Applying WordPress particle settings:",s),s.visible!==void 0&&(this.particleSystem.params.visible=s.visible),s.count!==void 0&&(this.particleSystem.params.count=s.count),s.size!==void 0&&(this.particleSystem.params.size=s.size);const o=(i=window.flexframeSettings)==null?void 0:i.primaryColor;o?(this.particleSystem.params.color=o,console.log("[FlexFrame Scene] Using primary color for particles:",o)):s.color&&(this.particleSystem.params.color=s.color),s.opacity!==void 0&&(this.particleSystem.params.opacity=s.opacity),s.speed!==void 0&&(this.particleSystem.params.speed=s.speed),this.particleSystem.createDustParticles()}}updateSpinnerColor(e){const t=document.createElement("style");t.id="flexframe-spinner-color";const n=(s,o)=>{const a=parseInt(s.slice(1,3),16),l=parseInt(s.slice(3,5),16),c=parseInt(s.slice(5,7),16);return`rgba(${a}, ${l}, ${c}, ${o})`};t.textContent=`
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
            
            /* GRADIENT CIRCLE PLANES (leo-border) */
            #model-loader .leo-border-1 {
                background: linear-gradient(0deg, ${n(e,.1)} 33%, ${e} 100%) !important;
            }
            #model-loader .leo-border-2 {
                background: linear-gradient(0deg, ${n(e,.1)} 33%, ${e} 100%) !important;
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
                border-color: ${n(e,.65)} !important;
            }
            #model-loader .green-orbit {
                border-color: ${n(e,.65)} !important;
            }
            #model-loader .red-orbit {
                border-color: ${n(e,.65)} !important;
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
        `;const i=document.getElementById("flexframe-spinner-color");i&&i.remove(),document.head.appendChild(t),console.log("[FlexFrame] Spinner color updated to:",e)}updateProgressBarColor(e){const t=document.createElement("style");t.id="flexframe-progress-color";const n=(s,o)=>{const a=parseInt(s.slice(1,3),16),l=parseInt(s.slice(3,5),16),c=parseInt(s.slice(5,7),16);return`rgba(${a}, ${l}, ${c}, ${o})`};t.textContent=`
            /* LOGO LOADER - Progress bar and text */
            .logo-progress-bar {
                background: linear-gradient(90deg, ${n(e,.5)}, ${e}) !important;
            }
            .logo-progress-text {
                color: ${e} !important;
            }
            
            /* Indeterminate progress animation */
            @keyframes indeterminateProgress {
                0% { 
                    width: 30%;
                    margin-left: 0%;
                    background: linear-gradient(90deg, ${n(e,.3)}, ${e});
                }
                50% { 
                    width: 50%;
                    margin-left: 25%;
                    background: linear-gradient(90deg, ${e}, ${n(e,.3)});
                }
                100% { 
                    width: 30%;
                    margin-left: 70%;
                    background: linear-gradient(90deg, ${n(e,.3)}, ${e});
                }
            }
        `;const i=document.getElementById("flexframe-progress-color");i&&i.remove(),document.head.appendChild(t),console.log("[FlexFrame] Progress bar color updated to:",e)}setupCanvasInteraction(){const e=this.sceneManager.getCanvas();if(!e){console.warn("[FlexFrame] Canvas not found for interaction setup");return}e.addEventListener("click",()=>{this.animationPlayer&&this.animationPlayer.onCanvasInteraction()});let t=null;e.addEventListener("mousemove",()=>{t||(t=setTimeout(()=>{t=null},100),this.animationPlayer&&this.animationPlayer.onCanvasInteraction())})}initializePlayerStyling(){console.log("[FlexFrame UI] initializePlayerStyling called with params:",this.playerStyleParams),this.updatePlayerBackgroundColor(this.playerStyleParams.backgroundColor),this.updatePlayerBackgroundOpacity(this.playerStyleParams.backgroundOpacity),this.updatePlayerTimeDisplay(this.playerStyleParams.showTimeDisplay),this.updatePlayerButtonColor(this.playerStyleParams.buttonColor),this.updatePlayerButtonOpacity(this.playerStyleParams.buttonOpacity),this.updatePlayerScrubberColor(this.playerStyleParams.scrubberColor),this.updatePlayerScrubberOpacity(this.playerStyleParams.scrubberOpacity),this.updatePlayerTextColor(this.playerStyleParams.textColor),this.updatePlayerTextOpacity(this.playerStyleParams.textOpacity),this.initializeScrubberWidth()}initializeScrubberWidth(){const e=document.createElement("style");e.id="scrubber-width-style",e.textContent=`
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
        `;const t=document.getElementById("scrubber-width-style");t&&t.remove(),document.head.appendChild(e)}setupGround(){const e=this.textureLoader.load(Li("textures/gradients/3.jpg"));e.wrapS=Jt,e.wrapT=Jt,e.needsUpdate=!0,this.circleGeometry=new Ma(5,64),this.planeGeometry=new vs(30,30),this.shadowGroundMaterial=new tu({opacity:.4}),this.solidGroundMaterial=new Mr({color:2236962,roughness:1,metalness:0}),this.ground=new Gt(this.circleGeometry,this.shadowGroundMaterial),this.ground.rotation.x=-Math.PI/2,this.ground.position.y=-.01,this.ground.receiveShadow=!0,this.ground.castShadow=!1,this.ground.visible=!0,this.sceneManager.getScene().add(this.ground)}updateAllGUIControls(){this.gui&&this.gui.controllersRecursive().forEach(e=>{e.updateDisplay()})}gatherModelSpecificSettings(){const e={};return this.currentConfig&&this.currentConfig.exerciseId&&(e.exerciseId=this.currentConfig.exerciseId),this.currentConfig&&(this.currentConfig.modelUrlSQ&&(e.modelUrlSQ=this.currentConfig.modelUrlSQ),this.currentConfig.modelUrlHQ&&(e.modelUrlHQ=this.currentConfig.modelUrlHQ),this.currentConfig.modelUrl&&!e.modelUrlSQ&&(e.modelUrl=this.currentConfig.modelUrl)),e.model=window.model?{position:window.model.position.toArray(),rotation:[window.model.rotation.x,window.model.rotation.y,window.model.rotation.z],scale:window.model.scale.toArray()}:{position:[0,-.02,0],rotation:[0,0,0],scale:[1,1,1]},e.camera=this.cameraManager.getSettings(),e}setupGUIStyles(){const e=document.createElement("style");e.textContent=`
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
        `,document.head.querySelector("style[data-gui-styles]")||(e.setAttribute("data-gui-styles","true"),document.head.appendChild(e))}setupGUIControls(){const e=this.gui.addFolder("GUI Controls"),t={expandAll:()=>{this.allFolders.forEach(n=>n.open()),console.log("📂 All GUI folders expanded")},collapseAll:()=>{this.allFolders.forEach(n=>n.close()),console.log("📁 All GUI folders collapsed")}};e.add(t,"expandAll").name("Expand All"),e.add(t,"collapseAll").name("Collapse All"),e.open()}trackFolder(e){return this.allFolders.push(e),e}setupGUI(){this.gui=new Da,this.allFolders=[],this.setupGUIStyles(),this.setupGUIControls(),this.setupSimpleScreenshotGUI(),this.gui.add({saveSettings:async()=>{await this.settingsManager.saveSettingsToClipboard(),console.log("All settings saved:",this.settingsManager.gatherAllSettings())}},"saveSettings").name("Save All Settings"),this.gui.add({saveModelSettings:async()=>{const n=this.gatherModelSpecificSettings(),i=JSON.stringify(n,null,2);try{await navigator.clipboard.writeText(i),alert("Model-specific settings copied to clipboard!"),console.log("Model settings saved:",n)}catch(s){console.error("Failed to copy to clipboard:",s),alert("Failed to copy settings to clipboard.")}}},"saveModelSettings").name("Save Model Settings"),this.gui.add({importSettings:async()=>{await this.settingsManager.importSettingsFromClipboard(),setTimeout(()=>this.updateAllGUIControls(),100)}},"importSettings").name("Import Settings"),this.gui.add({exportFile:()=>this.settingsManager.exportAsFile("scene-settings.json")},"exportFile").name("Export to File"),this.gui.add({importFile:async()=>{try{await this.settingsManager.importFromFile(),setTimeout(()=>this.updateAllGUIControls(),100),alert("Settings imported from file!")}catch(n){alert("Failed to import file: "+n.message)}}},"importFile").name("Import from File");const e={"Cinematic Blue":()=>{const n={background:{gradientTop:"#3865ad",gradientBottom:"#030391",gradientAlpha:1},ground:{mode:"Infinite Canvas",color:"#222222",roughness:1,metalness:0,shadowOpacity:.4,receiveShadow:!0,castShadow:!1,visible:!0},camera:{position:[.6497189477206844,.620065800043649,-.3267521547833202],rotation:[-2.480393214032852,1.0626661205247725,2.5446012015171644],target:[-.04078270409635462,.38393067967272315,-.023247738115800942]},lighting:{directionalLight:{intensity:1.43,color:"#ffffff",castShadow:!0,shadowBias:0,shadowBlur:1,shadowMapWidth:1024,shadowMapHeight:1024,posX:1.35,posY:1.57,posZ:.9,showHelper:!1,position:{x:1.35,y:1.57,z:.9}},ambientLight:{intensity:.4,color:"#ffffff"}},dustParticles:{count:1210,size:.02,sizeRandomness:1.2,color:"#0d14d3",opacity:.11,speed:.5,horizontalRange:3,verticalRange:2,verticalOffset:1,visible:!0,blur:.3,depthBlur:!0,depthBlurStrength:.5,depthFocusDistance:3,depthFocusRange:1.5},model:{position:[0,-.02,0],rotation:[0,0,0],scale:[1,1,1]}};this.settingsManager.applyAllSettings(n),setTimeout(()=>this.updateAllGUIControls(),100)},"Reset to Default":()=>{this.settingsManager.applyDefaultSettings(),setTimeout(()=>this.updateAllGUIControls(),100)}},t=this.trackFolder(this.gui.addFolder("Scene Presets"));t.add(e,"Cinematic Blue").name("Cinematic Blue"),t.add(e,"Reset to Default").name("Reset to Default"),this.setupBackgroundGUI(),this.setupGroundGUI(),this.setupParticlesGUI(),this.setupLoaderGUI(),this.setupLightingGUI(),this.setupCameraGUI(),this.setupMultiThumbnailMenuGUI(),this.setupGUIVisibilityToggle()}setupBackgroundGUI(){this.gui.addColor(this.backgroundParams,"gradientTop").name("Gradient Top").onChange(()=>this.sceneManager.updateGradientBackground(this.backgroundParams)),this.gui.addColor(this.backgroundParams,"gradientBottom").name("Gradient Bottom").onChange(()=>this.sceneManager.updateGradientBackground(this.backgroundParams)),this.gui.add(this.backgroundParams,"gradientAlpha",0,1,.01).name("Gradient Alpha").onChange(()=>this.sceneManager.updateGradientBackground(this.backgroundParams))}setupGroundGUI(){const e=this.trackFolder(this.gui.addFolder("Ground Plane"));e.add(this.groundParams,"mode",["Solid","Infinite Canvas"]).name("Type").onChange(t=>this.updateGroundMode(t)),e.addColor(this.groundParams,"color").name("Color").onChange(t=>this.solidGroundMaterial.color.set(t)),e.add(this.groundParams,"roughness",0,1,.01).name("Roughness").onChange(t=>this.solidGroundMaterial.roughness=t),e.add(this.groundParams,"metalness",0,1,.01).name("Metalness").onChange(t=>this.solidGroundMaterial.metalness=t),e.add(this.groundParams,"shadowOpacity",0,1,.01).name("Shadow Opacity").onChange(t=>this.shadowGroundMaterial.opacity=t),e.add(this.groundParams,"receiveShadow").name("Receive Shadow").onChange(t=>this.ground.receiveShadow=t),e.add(this.groundParams,"castShadow").name("Cast Shadow").onChange(t=>this.ground.castShadow=t),e.add(this.groundParams,"visible").name("Visible").onChange(t=>this.ground.visible=t)}setupLoaderGUI(){const e=this.trackFolder(this.gui.addFolder("Loading Spinner")),t={"Cool Gradient":"cool","Simple Gradient":"gradient","3D Orbits":"orbits","Gradient Planes":"planes","Spinning Squares":"squares","Pulse Dots":"dots","Solar System":"solar","Three Quarter":"quarter"};e.add(this.loaderParams,"spinnerStyle",t).name("Spinner Style").onChange(()=>this.updateLoaderSpinner())}setupParticlesGUI(){const e=this.trackFolder(this.gui.addFolder("Dust Particles")),t=this.particleSystem.getParams();e.add(t,"count",50,2e3,10).name("Count").onChange(c=>this.particleSystem.updateCount(c)),e.add(t,"size",.001,.02,1e-4).name("Size").onChange(c=>this.particleSystem.updateSize(c)),e.add(t,"sizeRandomness",0,2,.1).name("Size Variation").onChange(c=>this.particleSystem.updateSizeRandomness(c)),e.addColor(t,"color").name("Color").onChange(c=>this.particleSystem.updateColor(c)),e.add(t,"opacity",0,1,.01).name("Opacity").onChange(c=>this.particleSystem.updateOpacity(c)),e.add(t,"speed",0,3,.1).name("Float Speed"),e.add(t,"visible").name("Visible").onChange(c=>this.particleSystem.setVisible(c));const n=this.trackFolder(e.addFolder("Blur Effects"));n.add(t,"blur",0,1,.01).name("Particle Blur").onChange(c=>this.particleSystem.updateBlur(c));const i=this.trackFolder(e.addFolder("Depth of Field"));i.add(t,"depthBlur").name("Enable Depth Blur").onChange(c=>this.particleSystem.updateDepthBlur(c)),i.add(t,"depthBlurStrength",0,1,.01).name("Blur Strength").onChange(c=>this.particleSystem.updateDepthBlurStrength(c)),i.add(t,"depthFocusDistance",.5,10,.1).name("Focus Distance").onChange(c=>this.particleSystem.updateDepthFocus(c,t.depthFocusRange)),i.add(t,"depthFocusRange",.1,5,.1).name("Focus Range").onChange(c=>this.particleSystem.updateDepthFocus(t.depthFocusDistance,c));const s=this.trackFolder(e.addFolder("Position & Range"));s.add(t,"horizontalRange",.5,10,.1).name("Horizontal Range").onChange(()=>this.particleSystem.updateRange(t.horizontalRange,t.verticalRange)),s.add(t,"verticalRange",.5,5,.1).name("Vertical Range").onChange(()=>this.particleSystem.updateRange(t.horizontalRange,t.verticalRange)),s.add(t,"verticalOffset",-2,3,.1).name("Height Offset").onChange(c=>this.particleSystem.updateOffset(c));const o={"Portrait DOF":()=>{t.depthBlur=!0,t.depthBlurStrength=.7,t.depthFocusDistance=2,t.depthFocusRange=.5,t.blur=.2,this.particleSystem.updateDepthBlur(!0),this.particleSystem.updateDepthBlurStrength(.7),this.particleSystem.updateDepthFocus(2,.5),this.particleSystem.updateBlur(.2),i.controllersRecursive().forEach(c=>c.updateDisplay()),n.controllersRecursive().forEach(c=>c.updateDisplay())},"Macro DOF":()=>{t.depthBlur=!0,t.depthBlurStrength=.9,t.depthFocusDistance=1,t.depthFocusRange=.2,t.blur=.4,this.particleSystem.updateDepthBlur(!0),this.particleSystem.updateDepthBlurStrength(.9),this.particleSystem.updateDepthFocus(1,.2),this.particleSystem.updateBlur(.4),i.controllersRecursive().forEach(c=>c.updateDisplay()),n.controllersRecursive().forEach(c=>c.updateDisplay())},"Cinematic DOF":()=>{t.depthBlur=!0,t.depthBlurStrength=.5,t.depthFocusDistance=3,t.depthFocusRange=1.5,t.blur=.3,this.particleSystem.updateDepthBlur(!0),this.particleSystem.updateDepthBlurStrength(.5),this.particleSystem.updateDepthFocus(3,1.5),this.particleSystem.updateBlur(.3),i.controllersRecursive().forEach(c=>c.updateDisplay()),n.controllersRecursive().forEach(c=>c.updateDisplay())},"No DOF":()=>{t.depthBlur=!1,t.blur=0,this.particleSystem.updateDepthBlur(!1),this.particleSystem.updateBlur(0),i.controllersRecursive().forEach(c=>c.updateDisplay()),n.controllersRecursive().forEach(c=>c.updateDisplay())}};i.add(o,"Portrait DOF").name("Portrait DOF"),i.add(o,"Macro DOF").name("Macro DOF"),i.add(o,"Cinematic DOF").name("Cinematic DOF"),i.add(o,"No DOF").name("Disable DOF");const a={"Light Dust":()=>{this.particleSystem.applyPreset("Light Dust"),e.controllersRecursive().forEach(c=>c.updateDisplay())},"Heavy Dust":()=>{this.particleSystem.applyPreset("Heavy Dust"),e.controllersRecursive().forEach(c=>c.updateDisplay())},"Magical Sparkles":()=>{this.particleSystem.applyPreset("Magical Sparkles"),e.controllersRecursive().forEach(c=>c.updateDisplay())},"Reset Dust":()=>{this.particleSystem.applyPreset("Reset Dust"),e.controllersRecursive().forEach(c=>c.updateDisplay())}},l=this.trackFolder(e.addFolder("Particle Presets"));l.add(a,"Light Dust").name("Light Dust"),l.add(a,"Heavy Dust").name("Heavy Dust"),l.add(a,"Magical Sparkles").name("Magical Sparkles"),l.add(a,"Reset Dust").name("Reset Dust")}setupLightingGUI(){const e=this.trackFolder(this.gui.addFolder("Lights")),t=this.lightingSystem.getLights(),n=this.lightingSystem.getSettings(),i=this.trackFolder(e.addFolder("Directional Light")),s=n.directionalLight;i.add(s,"intensity",0,5,.01).name("Intensity").onChange(l=>t.directional.intensity=l),i.addColor(s,"color").name("Color").onChange(l=>t.directional.color.set(l)),i.add(s,"castShadow").name("Cast Shadow").onChange(l=>t.directional.castShadow=l),i.add(s,"shadowBias",-.05,.05,1e-4).name("Shadow Bias").onChange(l=>t.directional.shadow.bias=l),i.add(s,"shadowBlur",0,10,.1).name("Shadow Blur").onChange(l=>t.directional.shadow.radius=l),i.add(s,"shadowMapWidth",256,4096,1).name("Shadow Map Width").onChange(l=>{t.directional.shadow.mapSize.width=l,t.directional.shadow.map&&t.directional.shadow.map.dispose()}),i.add(s,"shadowMapHeight",256,4096,1).name("Shadow Map Height").onChange(l=>{t.directional.shadow.mapSize.height=l,t.directional.shadow.map&&t.directional.shadow.map.dispose()}),i.add(s,"posX",-10,10,.01).name("Position X").onChange(l=>t.directional.position.x=l),i.add(s,"posY",-10,10,.01).name("Position Y").onChange(l=>t.directional.position.y=l),i.add(s,"posZ",-10,10,.01).name("Position Z").onChange(l=>t.directional.position.z=l),i.add(s,"showHelper").name("Show Helper").onChange(l=>t.directionalHelper.visible=l);const o=this.trackFolder(e.addFolder("Ambient Light")),a=n.ambientLight;o.add(a,"intensity",0,2,.01).name("Intensity").onChange(l=>t.ambient.intensity=l),o.addColor(a,"color").name("Color").onChange(l=>t.ambient.color.set(l))}setupCameraGUI(){const e=this.trackFolder(this.gui.addFolder("Camera Controls")),t=this.cameraManager.getCamera(),n=this.cameraManager.getControls(),i=this.trackFolder(e.addFolder("Zoom Range"));i.add(n,"minDistance",.001,1,.001).name("Min Zoom Distance"),i.add(n,"maxDistance",10,500,1).name("Max Zoom Distance"),i.add(n,"zoomSpeed",.1,2,.1).name("Zoom Speed");const s=this.trackFolder(e.addFolder("Field of View"));s.add({fov:t.fov},"fov",10,150,1).name("FOV (degrees)").onChange(x=>{this.cameraManager.setFOV(x)}),s.add({copyCameraSettings:()=>{this.cameraManager.copyCameraSettingsToClipboard()}},"copyCameraSettings").name("Copy Camera Settings"),s.add({copyAllSettings:()=>{this.cameraManager.copyAllSettingsToClipboard(this.settingsManager)}},"copyAllSettings").name("Copy ALL GUI Settings");const o=this.trackFolder(e.addFolder("Zoom Momentum")),a=this.cameraManager;o.add(a,"zoomDecay",.8,.99,.01).name("Momentum Decay"),o.add(a,"zoomMomentumThreshold",.001,.1,.001).name("Momentum Threshold");const l={value:1};o.add(l,"value",.1,5,.1).name("Velocity Multiplier").onChange(x=>{a.velocityMultiplier=x}),e.add({resetCamera:()=>{this.cameraManager.resetCamera(),console.log("Camera fully reset to defaults")}},"resetCamera").name("Reset Camera"),e.add({testMomentum:()=>{console.log("Testing momentum..."),a.zoomMomentum=.2,a.momentumActive=!0,console.log("Momentum set to:",a.zoomMomentum)}},"testMomentum").name("Test Momentum"),e.add({clearMomentum:()=>{a.zoomMomentum=0,a.momentumActive=!1,console.log("Momentum cleared")}},"clearMomentum").name("Clear Momentum");const c=this.trackFolder(e.addFolder("Debug Info")),h={currentDistance:0,momentum:0,targetX:0,targetY:0,targetZ:0};c.add(h,"currentDistance").name("Distance").listen(),c.add(h,"momentum").name("Momentum").listen(),c.add(h,"targetX").name("Target X").listen(),c.add(h,"targetY").name("Target Y").listen(),c.add(h,"targetZ").name("Target Z").listen();const d=()=>{h.currentDistance=t.position.distanceTo(n.target),h.momentum=a.zoomMomentum||0,h.targetX=n.target.x,h.targetY=n.target.y,h.targetZ=n.target.z};this.updateCameraDebug=d,a.velocityMultiplier=.4;const u=this.trackFolder(e.addFolder("Coordinates")),f={x:0,y:0,z:0};u.add(f,"x").name("Center X").listen(),u.add(f,"y").name("Center Y").listen(),u.add(f,"z").name("Center Z").listen();const g=this.trackFolder(u.addFolder("Manual Control")),A={x:this.cameraManager.getRotationCenter().x,y:this.cameraManager.getRotationCenter().y,z:this.cameraManager.getRotationCenter().z};g.add(A,"x",-5,5,.001).name("Set X Position").onChange(x=>{this.cameraManager.setRotationCenterX(x)}).listen(),g.add(A,"y",-5,5,.001).name("Set Y Position").onChange(x=>{this.cameraManager.setRotationCenterY(x)}).listen(),g.add(A,"z",-5,5,.001).name("Set Z Position").onChange(x=>{this.cameraManager.setRotationCenterZ(x)}).listen(),u.add({copyCoords:()=>{this.cameraManager.copyCoordinatesToClipboard()}},"copyCoords").name("Copy Coordinates");const m=this.updateCameraDebug;this.updateCameraDebug=()=>{m&&m();const x=this.cameraManager.getRotationCenter();f.x=parseFloat(x.x.toFixed(6)),f.y=parseFloat(x.y.toFixed(6)),f.z=parseFloat(x.z.toFixed(6)),A.x=x.x,A.y=x.y,A.z=x.z};const p=this.trackFolder(e.addFolder("Animation Player")),v={showPlayer:this.animationPlayer?this.animationPlayer.isVisible:!0,alwaysVisible:this.animationPlayer?this.animationPlayer.alwaysVisible:!1};p.add(v,"showPlayer").name("Show Animation Player").onChange(x=>{this.animationPlayer&&(this.animationPlayer.setVisibility(x),v.showPlayer=x)}),p.add(v,"alwaysVisible").name("Always Visible (No Auto-Hide)").onChange(x=>{this.animationPlayer&&(this.animationPlayer.setAlwaysVisible(x),v.alwaysVisible=x)});const M=this.trackFolder(p.addFolder("Player Styling")),y=this.trackFolder(M.addFolder("Background"));y.addColor(this.playerStyleParams,"backgroundColor").name("Background Color").onChange(x=>{this.updatePlayerBackgroundColor(x)}),y.add(this.playerStyleParams,"backgroundOpacity",0,1,.1).name("Background Opacity").onChange(x=>{this.updatePlayerBackgroundOpacity(x)}),this.trackFolder(M.addFolder("Dimensions")).add(this.playerStyleParams,"playerWidth",20,100,1).name("Player Width (%)").onChange(x=>{}),this.trackFolder(M.addFolder("Display")).add(this.playerStyleParams,"showTimeDisplay").name("Show Time Display").onChange(x=>{this.updatePlayerTimeDisplay(x)});const T=this.trackFolder(M.addFolder("Buttons"));T.addColor(this.playerStyleParams,"buttonColor").name("Button Color").onChange(x=>{this.updatePlayerButtonColor(x)}),T.add(this.playerStyleParams,"buttonOpacity",0,1,.1).name("Button Opacity").onChange(x=>{this.updatePlayerButtonOpacity(x)});const w=this.trackFolder(M.addFolder("Timeline"));w.addColor(this.playerStyleParams,"scrubberColor").name("Scrubber Color").onChange(x=>{this.updatePlayerScrubberColor(x)}),w.add(this.playerStyleParams,"scrubberOpacity",0,1,.1).name("Scrubber Opacity").onChange(x=>{this.updatePlayerScrubberOpacity(x)});const _=this.trackFolder(M.addFolder("Text"));_.addColor(this.playerStyleParams,"textColor").name("Text Color").onChange(x=>{this.updatePlayerTextColor(x)}),_.add(this.playerStyleParams,"textOpacity",0,1,.1).name("Text Opacity").onChange(x=>{this.updatePlayerTextOpacity(x)}),p.open()}updatePlayerBackgroundColor(e){window.flexframeSettings&&window.flexframeSettings.uiSettings||this.animationPlayer&&this.animationPlayer.container&&(this.animationPlayer.container.style.backgroundColor=e)}updatePlayerBackgroundOpacity(e){if(!(window.flexframeSettings&&window.flexframeSettings.uiSettings)&&this.animationPlayer&&this.animationPlayer.container){const t=this.playerStyleParams.backgroundColor,n=parseInt(t.slice(1,3),16),i=parseInt(t.slice(3,5),16),s=parseInt(t.slice(5,7),16);this.animationPlayer.container.style.backgroundColor=`rgba(${n}, ${i}, ${s}, ${e})`}}updatePlayerTimeDisplay(e){if(this.animationPlayer&&this.animationPlayer.container){const t=this.animationPlayer.container.querySelector(".time-display");t&&(t.style.display=e?"inline-block":"none")}}updatePlayerButtonColor(e){if(console.log("[FlexFrame UI] updatePlayerButtonColor called with:",e),window.flexframeSettings&&window.flexframeSettings.uiSettings){console.log("[FlexFrame UI] Skipping JS button color - WordPress CSS will handle it");return}if(this.animationPlayer&&this.animationPlayer.container){const t=this.animationPlayer.container.querySelectorAll("button");t.forEach(n=>{n.style.color=e,n.querySelectorAll("svg").forEach(s=>{s.style.fill=e})}),console.log("[FlexFrame UI] Applied button color to",t.length,"buttons")}}updatePlayerButtonOpacity(e){this.animationPlayer&&this.animationPlayer.container&&this.animationPlayer.container.querySelectorAll("button").forEach(n=>{n.style.opacity=e})}updatePlayerScrubberColor(e){if(!(window.flexframeSettings&&window.flexframeSettings.uiSettings)&&this.animationPlayer&&this.animationPlayer.container){const t=this.animationPlayer.container.querySelector(".timeline-slider");if(t){t.style.accentColor=e;const n=document.createElement("style");n.textContent=`
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
                `;const i=document.getElementById("scrubber-color-style");i&&i.remove(),n.id="scrubber-color-style",document.head.appendChild(n)}}}updatePlayerScrubberOpacity(e){if(this.animationPlayer&&this.animationPlayer.container){const t=this.animationPlayer.container.querySelector(".timeline-slider");t&&(t.style.opacity=e)}}updatePlayerTextColor(e){this.animationPlayer&&this.animationPlayer.container&&this.animationPlayer.container.querySelectorAll(".time-display, .speed-menu").forEach(n=>{n.style.color=e})}updatePlayerTextOpacity(e){this.animationPlayer&&this.animationPlayer.container&&this.animationPlayer.container.querySelectorAll(".time-display, .speed-menu").forEach(n=>{n.style.opacity=e})}setupGUIVisibilityToggle(){let e=!1;this.gui.domElement.style.display="none",window.addEventListener("keydown",n=>{(n.key==="h"||n.key==="H")&&(e=!e,this.gui.domElement.style.display=e?"block":"none")});const t=document.createElement("style");t.innerHTML=`
            .dg.ac {
                z-index: 9999 !important;
                top: 10px !important;
                right: 10px !important;
                left: auto !important;
                display: block !important;
            }
        `,document.head.appendChild(t)}updateGroundMode(e){this.groundParams.mode=e,this.useShadowMaterial=e==="Infinite Canvas",this.useShadowMaterial?(this.ground.geometry=this.planeGeometry,this.ground.material=this.shadowGroundMaterial,this.ground.receiveShadow=!0,this.ground.castShadow=!1):(this.ground.geometry=this.circleGeometry,this.ground.material=this.solidGroundMaterial,this.ground.receiveShadow=this.groundParams.receiveShadow,this.ground.castShadow=this.groundParams.castShadow),this.ground.material.needsUpdate=!0,this.ground.geometry.computeBoundingSphere()}applyGroundSettings(e){Object.assign(this.groundParams,e),this.updateGroundMode(this.groundParams.mode),this.solidGroundMaterial.color.set(this.groundParams.color),this.solidGroundMaterial.roughness=this.groundParams.roughness,this.solidGroundMaterial.metalness=this.groundParams.metalness,this.shadowGroundMaterial.opacity=this.groundParams.shadowOpacity,this.ground.receiveShadow=this.groundParams.receiveShadow,this.ground.castShadow=this.groundParams.castShadow,this.ground.visible=this.groundParams.visible}setupScreenshotButton(){var e;if(this.createScreenshotPanel(),this.animationPlayer){this.animationPlayer.setScreenshotCallback(()=>{this.toggleScreenshotPanel()});const t=((e=window.flexframeSettings)==null?void 0:e.showScreenshotButton)!==!1;this.animationPlayer.setScreenshotButtonVisible(t)}}createScreenshotPanel(){var o;const e=document.querySelector(".screenshot-panel");e&&e.remove();const t=document.createElement("div");t.className="screenshot-panel",t.innerHTML=`
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
        `;const n=document.createElement("style");n.textContent=`
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
        `;const i=((o=window.flexframeSettings)==null?void 0:o.primaryColor)||"#4a9eff",s=document.getElementById("flexframe-viewer-container")||document.body;s.style.setProperty("--ss-primary-color",i),s.appendChild(n),s.appendChild(t),this.screenshotPanel=t,this.createScreenshotFrameForPanel(),t.querySelector(".screenshot-panel-close").addEventListener("click",()=>{this.toggleScreenshotPanel(!1)}),t.querySelector("#ss-width").addEventListener("input",a=>{this.updateScreenshotFramePanel(parseInt(a.target.value),parseInt(t.querySelector("#ss-height").value))}),t.querySelector("#ss-height").addEventListener("input",a=>{this.updateScreenshotFramePanel(parseInt(t.querySelector("#ss-width").value),parseInt(a.target.value))}),t.querySelector("#ss-preset-thumbnail").addEventListener("click",()=>{t.querySelector("#ss-width").value=250,t.querySelector("#ss-height").value=250,t.querySelector("#ss-format").value="webp",this.updateScreenshotFramePanel(250,250),t.querySelectorAll(".ss-preset-btn").forEach(a=>a.classList.remove("active")),t.querySelector("#ss-preset-thumbnail").classList.add("active")}),t.querySelector("#ss-preset-hd").addEventListener("click",()=>{t.querySelector("#ss-width").value=1920,t.querySelector("#ss-height").value=1080,t.querySelector("#ss-format").value="png",this.updateScreenshotFramePanel(1920,1080),t.querySelectorAll(".ss-preset-btn").forEach(a=>a.classList.remove("active")),t.querySelector("#ss-preset-hd").classList.add("active")}),t.querySelector(".ss-custom").addEventListener("click",()=>{this.takeCustomScreenshot()}),document.addEventListener("exercisesSelected",()=>{this.currentExerciseName&&(t.querySelector("#ss-filename").value=this.currentExerciseName)}),this.currentExerciseName&&(t.querySelector("#ss-filename").value=this.currentExerciseName)}createScreenshotFrameForPanel(){const e=document.querySelector(".screenshot-frame-panel");e&&e.remove();const t=document.createElement("div");t.className="screenshot-frame-panel",t.innerHTML=`
            <div class="frame-corner top-left"></div>
            <div class="frame-corner top-right"></div>
            <div class="frame-corner bottom-left"></div>
            <div class="frame-corner bottom-right"></div>
            <div class="frame-info-panel"></div>
        `;const n=document.createElement("style");n.textContent=`
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
        `;const i=document.getElementById("flexframe-viewer-container")||document.body;i.appendChild(n),i.appendChild(t),this.screenshotFramePanel=t}toggleScreenshotFramePanel(e){this.screenshotFramePanel&&this.screenshotFramePanel.classList.toggle("visible",e)}updateScreenshotFramePanel(e,t){if(!this.screenshotFramePanel)return;const n=document.getElementById("flexframe-viewer-container");if(!n)return;const i=n.getBoundingClientRect(),s=i.width,o=i.height,a=e/t,l=s/o;let c,h;a>l?(c=Math.min(e,s*.8),h=c/a):(h=Math.min(t,o*.8),c=h*a);const d=(s-c)/2,u=(o-h)/2;this.screenshotFramePanel.style.width=`${c}px`,this.screenshotFramePanel.style.height=`${h}px`,this.screenshotFramePanel.style.left=`${d}px`,this.screenshotFramePanel.style.top=`${u}px`;const f=this.screenshotFramePanel.querySelector(".frame-info-panel");f&&(f.textContent=`${e} x ${t}`)}toggleScreenshotPanel(e){if(!this.screenshotPanel)return;const t=this.screenshotPanel.classList.contains("visible"),n=e!==void 0?e:!t;if(this.screenshotPanel.classList.toggle("visible",n),n){this.toggleScreenshotFramePanel(!0);const i=parseInt(this.screenshotPanel.querySelector("#ss-width").value),s=parseInt(this.screenshotPanel.querySelector("#ss-height").value);this.updateScreenshotFramePanel(i,s),this.currentExerciseName&&(this.screenshotPanel.querySelector("#ss-filename").value=this.currentExerciseName)}else this.toggleScreenshotFramePanel(!1)}async takeQuickScreenshot(){var l,c,h,d,u,f;const e=this.renderer,t=this.sceneManager.getScene(),n=this.cameraManager.getCamera(),i=e.domElement,s=((c=(l=this.screenshotPanel)==null?void 0:l.querySelector("#ss-filename"))==null?void 0:c.value)||(this.currentExerciseName?this.currentExerciseName.replace(/\s+/g,"_"):"flexframe_screenshot"),o=((d=(h=this.screenshotPanel)==null?void 0:h.querySelector("#ss-format"))==null?void 0:d.value)||"png",a=((f=(u=this.screenshotPanel)==null?void 0:u.querySelector("#ss-transparent"))==null?void 0:f.checked)||!1;try{const g=await co.takeScreenshot(e,t,n,{width:i.clientWidth*2,height:i.clientHeight*2,filename:s,format:o,transparent:a});g.success?console.log(`📸 Quick screenshot saved: ${g.filename}`):console.error("Screenshot failed:",g.error)}catch(g){console.error("Screenshot error:",g)}}async takeCustomScreenshot(){var m,p,v,M,y,C,I,T,w,_,x,R;const e=this.renderer,t=this.sceneManager.getScene(),n=this.cameraManager.getCamera(),i=parseInt((p=(m=this.screenshotPanel)==null?void 0:m.querySelector("#ss-width"))==null?void 0:p.value)||800,s=parseInt((M=(v=this.screenshotPanel)==null?void 0:v.querySelector("#ss-height"))==null?void 0:M.value)||800,o=((C=(y=this.screenshotPanel)==null?void 0:y.querySelector("#ss-filename"))==null?void 0:C.value)||"screenshot",a=((T=(I=this.screenshotPanel)==null?void 0:I.querySelector("#ss-format"))==null?void 0:T.value)||"png",l=((_=(w=this.screenshotPanel)==null?void 0:w.querySelector("#ss-transparent"))==null?void 0:_.checked)||!1,c=((R=(x=this.screenshotPanel)==null?void 0:x.querySelector("#ss-floor-shadow"))==null?void 0:R.checked)||!1,h=`${o}_${i}x${s}`,d=this.ground?this.ground.visible:!1;this.ground&&(this.ground.visible=c);let u=null,f=null,g=null,A=null;if(this.screenshotFramePanel){const k=document.getElementById("flexframe-viewer-container");if(k){const F=k.getBoundingClientRect();g=F.width,A=F.height,u=parseFloat(this.screenshotFramePanel.style.width)||0,f=parseFloat(this.screenshotFramePanel.style.height)||0}}try{const k=await co.takeScreenshot(e,t,n,{width:i,height:s,filename:h,format:a,transparent:l,frameWidth:u,frameHeight:f,containerWidth:g,containerHeight:A});k.success?console.log(`📸 Custom screenshot saved: ${k.filename} (${i}x${s})`):console.error("Screenshot failed:",k.error)}catch(k){console.error("Screenshot error:",k)}finally{this.ground&&(this.ground.visible=d)}}async takeUserScreenshot(){await this.takeQuickScreenshot()}setupARBranding(){const e={companyName:"FlexFrame",callToAction:"Visit FlexFrame",websiteUrl:window.location.origin};if(window.flexframeSettings){if(window.flexframeSettings.logoUrl){let t=window.flexframeSettings.logoUrl;t.startsWith("http://")&&(t=t.replace("http://","https://")),e.logoUrl=t,console.log("[FlexFrame AR] Using WordPress logo for AR branding:",t)}window.flexframeSettings.siteUrl&&(e.websiteUrl=window.flexframeSettings.siteUrl)}sc.setBranding(e)}setupQualityToggle(){const e=document.getElementById("quality-toggle-btn");console.log("[Quality Debug] setupQualityToggle called, button found:",!!e),e&&e.addEventListener("click",()=>{console.log("[Quality Debug] Quality button clicked!"),this.switchModelQuality()})}updateQualityButtonVisibility(){const e=document.getElementById("quality-toggle-btn"),t=document.getElementById("quality-text");if(console.log("[Quality Debug] updateQualityButtonVisibility called"),console.log("[Quality Debug] Button found:",!!e),console.log("[Quality Debug] modelUrlSQ:",this.modelUrlSQ),console.log("[Quality Debug] modelUrlHQ:",this.modelUrlHQ),e)if(this.modelUrlSQ&&this.modelUrlHQ){if(console.log("[Quality Debug] ✅ Both models exist, showing button"),e.style.display="flex",t){const n=this.currentModelQuality==="SQ"?"HD":"SD";t.textContent=n,console.log("[Quality Debug] Set button text to:",n)}this.startQualityButtonPulsate()}else console.log("[Quality Debug] ❌ Missing model URLs, hiding button"),e.style.display="none",this.stopQualityButtonPulsate();else console.log("[Quality Debug] ❌ Button element not found in DOM!")}startQualityButtonPulsate(){this.stopQualityButtonPulsate();const e=document.getElementById("quality-toggle-btn"),t=document.getElementById("quality-text"),n=()=>{e&&t&&t.textContent==="HD"&&(e.classList.add("pulsate"),setTimeout(()=>{e.classList.remove("pulsate")},5e3))};n(),this.qualityPulsateInterval=setInterval(n,1e4)}stopQualityButtonPulsate(){this.qualityPulsateInterval&&(clearInterval(this.qualityPulsateInterval),this.qualityPulsateInterval=null);const e=document.getElementById("quality-toggle-btn");e&&e.classList.remove("pulsate")}async switchModelQuality(){var t,n,i,s,o,a;if(!this.modelUrlSQ||!this.modelUrlHQ)return;if(this.isQualitySwitching){console.log("[Quality] Already switching quality, ignoring click");return}this.isQualitySwitching=!0;const e=document.getElementById("quality-toggle-btn");e&&(e.disabled=!0,e.style.opacity="0.5",e.style.cursor="wait");try{this.currentModelQuality=this.currentModelQuality==="SQ"?"HQ":"SQ";const l=this.currentModelQuality==="SQ"?this.modelUrlSQ:this.modelUrlHQ;console.log("Switching to",this.currentModelQuality,"model:",l);const c=document.getElementById("quality-text");if(c){const h=this.currentModelQuality==="SQ"?"HD":"SD";c.textContent=h}if(this.startQualityButtonPulsate(),console.log("[HQ Debug] currentConfig:",this.currentConfig),console.log("[HQ Debug] Has cameraHQ?",!!((t=this.currentConfig)!=null&&t.cameraHQ)),console.log("[HQ Debug] cameraHQ value:",(n=this.currentConfig)==null?void 0:n.cameraHQ),this.currentModelQuality==="HQ"&&((i=this.currentConfig)!=null&&i.modelHQ||(s=this.currentConfig)!=null&&s.cameraHQ)){console.log("[HQ Debug] ✅ Entering HQ branch");const h=this.currentConfig.modelHQ,d=this.currentConfig.cameraHQ||(h==null?void 0:h.camera);if(console.log("[HQ Debug] hqCameraSettings:",d),h!=null&&h.model&&(this.pendingModelConfig=h.model),await this.loadModel(l),console.log("[HQ Debug] Model loaded, now applying camera settings"),d){console.log("[HQ Debug] Applying HQ camera position:",d.position);const u=this.cameraManager.getCamera();d.position&&u.position.set(...d.position),d.rotation&&u.rotation.set(...d.rotation),d.target&&this.cameraManager.getControls().target.set(...d.target),this.cameraManager.getControls().update(),this.cameraManager.updateOriginalState(d.position,d.rotation,d.target)}}else if((o=this.currentConfig)!=null&&o.model&&(this.pendingModelConfig=this.currentConfig.model),await this.loadModel(l),(a=this.currentConfig)!=null&&a.camera){const h=this.cameraManager.getCamera();this.currentConfig.camera.position&&h.position.set(...this.currentConfig.camera.position),this.currentConfig.camera.rotation&&h.rotation.set(...this.currentConfig.camera.rotation),this.currentConfig.camera.target&&this.cameraManager.getControls().target.set(...this.currentConfig.camera.target),this.cameraManager.getControls().update(),this.cameraManager.updateOriginalState(this.currentConfig.camera.position,this.currentConfig.camera.rotation,this.currentConfig.camera.target)}}finally{setTimeout(()=>{this.isQualitySwitching=!1;const l=document.getElementById("quality-toggle-btn");l&&(l.disabled=!1,l.style.opacity="1",l.style.cursor="pointer")},500)}}loadModel(e=Li("models/exercise.glb")){return new Promise((t,n)=>{const i=document.getElementById("model-loader");i&&(this.updateLoaderSpinner(),i.style.display="flex"),this.modelFolder&&(this.modelFolder.destroy(),this.modelFolder=null),this.materialsFolder&&(this.materialsFolder.destroy(),this.materialsFolder=null),window.model&&(this.sceneManager.getScene().remove(window.model),window.model=null),this.mixer&&(this.mixer.stopAllAction(),this.mixer=null),this.allClickableMeshes=[],Tn.clear(),this.updateLoadProgress(0),this.gltfLoader.load(e,s=>{window.model=s.scene;const o=window.model,a=new Map;if(o.traverse(c=>{if(c.isMesh&&(this.allClickableMeshes.push(c),c.castShadow=!0,c.receiveShadow=!0,c.material)){const h=Array.isArray(c.material)?c.material:[c.material],d=[];h.forEach(u=>{var f,g;if(u.name)if(u.name.includes("MUSCLE")&&u.type!=="MeshPhysicalMaterial")if(a.has(u.name))d.push(a.get(u.name));else{console.log(`Converting ${u.name} to MeshPhysicalMaterial for sheen support`);const A=new Ut({color:new ge(16777215),map:u.map,normalMap:u.normalMap,roughness:0,metalness:0,emissive:new ge(0),emissiveIntensity:1.14,emissiveMap:u.emissiveMap,opacity:1,transparent:!0,side:ot,depthWrite:!0,sheen:.3,sheenRoughness:.45,sheenColor:new ge(15403530)});A.name=u.name,u.map&&(A.bumpMap=u.map,A.bumpScale=10.2),a.set(u.name,A),d.push(A)}else if(u.name.includes("SKIN"))if(a.has(u.name))d.push(a.get(u.name));else{console.log(`Converting/Updating ${u.name} to MeshPhysicalMaterial for advanced transparency`);const A=new Ut({color:new ge(13426421),map:null,normalMap:null,roughness:0,metalness:0,emissive:new ge(0),emissiveIntensity:1,emissiveMap:null,opacity:1,transparent:!1,side:Tt,depthWrite:!1,depthTest:!0,blending:ir,alphaTest:0,transmission:1,thickness:0,ior:1,envMapIntensity:2.29,sheen:0,sheenRoughness:1,sheenColor:new ge(0)});A.name=u.name,A.bumpScale=1,console.log(`✅ ${u.name} Material Settings Applied:`,{color:"#"+A.color.getHexString(),opacity:A.opacity,transmission:A.transmission,ior:A.ior,roughness:A.roughness,metalness:A.metalness,envMapIntensity:A.envMapIntensity,side:A.side===ot?"DoubleSide":A.side===Tt?"FrontSide":"BackSide",blending:A.blending,depthWrite:A.depthWrite,depthTest:A.depthTest,thickness:A.thickness,bumpScale:A.bumpScale}),a.set(u.name,A),d.push(A)}else if(u.name.includes("SKELETON")&&u.type!=="MeshPhysicalMaterial")if(a.has(u.name))d.push(a.get(u.name));else{console.log(`Converting ${u.name} to MeshPhysicalMaterial`);const A=new Ut({color:new ge(16777215),map:u.map,normalMap:u.normalMap,roughness:.9875603442970008,metalness:0,emissive:new ge(0),emissiveIntensity:1,emissiveMap:u.emissiveMap,opacity:1,transparent:!0,side:ot,depthWrite:!0,depthTest:!0,blending:St,alphaTest:0,envMapIntensity:1});A.name=u.name,u.map&&(A.bumpMap=u.map,A.bumpScale=1),a.set(u.name,A),d.push(A)}else if(u.name.includes("CHROME"))if(a.has(u.name))d.push(a.get(u.name));else{console.log(`Converting ${u.name} to MeshPhysicalMaterial with chrome settings`);const A=new Ut({color:new ge(16777215),roughness:.07,metalness:.82,emissive:new ge(0),emissiveIntensity:1,opacity:1,transparent:!1,side:ot,depthWrite:!0,depthTest:!0,blending:St,alphaTest:0,envMapIntensity:1,sheen:0,sheenRoughness:1,sheenColor:new ge(0),transmission:0,thickness:0,ior:1.5});A.name=u.name,console.log(`✅ ${u.name} Material Settings Applied (pure chrome - no textures):`,{color:"#"+A.color.getHexString(),opacity:A.opacity,transparent:A.transparent,roughness:A.roughness,metalness:A.metalness,envMapIntensity:A.envMapIntensity,side:A.side===ot?"DoubleSide":A.side===Tt?"FrontSide":"BackSide"}),a.set(u.name,A),d.push(A)}else if(u.name.includes("COLOR_1"))if(a.has(u.name))d.push(a.get(u.name));else{console.log(`Converting ${u.name} to MeshPhysicalMaterial with custom settings`);const m=((f=window.flexframeSettings)==null?void 0:f.primaryColorMode)==="custom"&&((g=window.flexframeSettings)!=null&&g.primaryColor)?window.flexframeSettings.primaryColor:"#ff0000",p=new Ut({color:new ge(m),roughness:.2152357035754776,metalness:0,emissive:new ge(0),emissiveIntensity:1,opacity:1,transparent:!1,side:ot,depthWrite:!0,depthTest:!0,blending:St,alphaTest:0,envMapIntensity:1,sheen:0,sheenRoughness:1,sheenColor:new ge(0),transmission:0,thickness:0,ior:1.5});p.name=u.name,console.log(`✅ ${u.name} Material Settings Applied:`,{color:"#"+p.color.getHexString(),opacity:p.opacity,transparent:p.transparent,roughness:p.roughness,metalness:p.metalness,side:p.side===ot?"DoubleSide":p.side===Tt?"FrontSide":"BackSide"}),a.set(u.name,p),d.push(p)}else d.push(u)}),d.length>0&&(Array.isArray(c.material)?c.material=d:c.material=d[0])}}),this.currentConfig&&this.currentConfig.customTextures&&this.applyCustomTextures(o,this.currentConfig.customTextures),window.flexframeSettings&&window.flexframeSettings.logoUrl){let c=window.flexframeSettings.logoUrl;c.startsWith("http://")&&(c=c.replace("http://","https://")),console.log("🎨 Applying LOGO texture from WordPress settings:",c);const h=window.flexframeSettings.logoThreshold||.95,d=window.flexframeSettings.logoBorderEnabled||!1,u=window.flexframeSettings.logoBorderSize||2,f=window.flexframeSettings.logoDisplaySize||100;this.applyLogoTexture(o,c,h,d,u,f)}if(o.position.set(0,-.02,0),this.pendingModelConfig&&(this.pendingModelConfig.position&&o.position.set(...this.pendingModelConfig.position),this.pendingModelConfig.rotation&&o.rotation.set(...this.pendingModelConfig.rotation),this.pendingModelConfig.scale&&o.scale.set(...this.pendingModelConfig.scale),this.pendingModelConfig=null),window.flexframeSettings){const c=window.flexframeSettings.materialMode||"preset";if(c==="custom"&&window.flexframeSettings.skinSettings)console.log("Pre-applying Custom SKIN settings..."),this.applyCustomSkinSettings(window.flexframeSettings.skinSettings);else if(c==="preset"&&window.flexframeSettings.materialPreset){const h=window.flexframeSettings.materialPreset;console.log("Material Preset setting:",h),h==="default"||h==="dark"||h==="light"||h==="preset1"?(console.log("Pre-applying Default Material Preset..."),this.applyMaterialPreset1()):h==="wp_preset"&&(console.log("Pre-applying WP Preset..."),this.applyWPPreset())}window.flexframeSettings.equipmentMaterials&&(console.log("Applying Equipment Material Settings..."),this.applyEquipmentMaterials(o,window.flexframeSettings.equipmentMaterials))}this.sceneManager.getScene().add(o);const l=document.getElementById("model-loader");l&&(l.style.display="none"),this.cameraManager.setClickableMeshes(this.allClickableMeshes),s.animations&&s.animations.length>0&&(this.mixer=new Nu(o),this.animationPlayer.setMixer(this.mixer,s.animations),this.animationPlayer.actions&&this.animationPlayer.actions.length>0&&(this.animationPlayer.actions[0].play(),this.animationPlayer.isPlaying=!0,this.animationPlayer.updatePlayPauseIcon())),this.setupModelGUI(o),this.setupMaterialsGUI(o),this.updateLoadProgress(100),t(o)},s=>{if(s.lengthComputable){const o=Math.round(s.loaded/s.total*100);this.updateLoadProgress(o)}else this.updateLoadProgress(-1)},s=>{console.error("An error happened while loading the GLB model:",s);const o=document.getElementById("model-loader");o&&(o.style.display="none"),n(s)})})}setupModelGUI(e){this.modelFolder=this.trackFolder(this.gui.addFolder("Model Transform"));const t=e.position,n=e.rotation,i=e.scale;this.modelFolder.add(t,"x",-1,1,.002).name("Position X"),this.modelFolder.add(t,"y",-1,1,.002).name("Position Y"),this.modelFolder.add(t,"z",-1,1,.002).name("Position Z"),this.modelFolder.add(n,"x",-1,1,.002).name("Rotation X"),this.modelFolder.add(n,"y",-1,1,.002).name("Rotation Y"),this.modelFolder.add(n,"z",-1,1,.002).name("Rotation Z"),this.modelFolder.add(i,"x",.01,1,.001).name("Scale X"),this.modelFolder.add(i,"y",.01,1,.001).name("Scale Y"),this.modelFolder.add(i,"z",.01,1,.001).name("Scale Z"),this.modelFolder.add({showAxis:this.cameraManager.axisHelperVisible},"showAxis").name("Show Axis Helper").onChange(s=>{this.cameraManager.toggleAxisHelper(s)}),this.modelFolder.add({axisSize:this.cameraManager.axisHelperSize},"axisSize",.1,2,.1).name("Axis Size").onChange(s=>{this.cameraManager.setAxisHelperSize(s)}),this.modelFolder.add({saveModelSettings:async()=>{const s=this.gatherModelSpecificSettings(),o=JSON.stringify(s,null,2);try{await navigator.clipboard.writeText(o),alert("Model config copied to clipboard!"),console.log("Model config saved:",s)}catch(a){console.error("Failed to copy to clipboard:",a),alert("Failed to copy config to clipboard.")}}},"saveModelSettings").name("Save Model Config")}setupMaterialsGUI(e){const t=new Map;e.traverse(n=>{n.isMesh&&n.material&&(Array.isArray(n.material)?n.material:[n.material]).forEach(s=>{if(s&&s.name&&!t.has(s.name))t.set(s.name,s);else if(s&&!s.name){const o=`Material_${t.size}`;s.name=o,t.set(o,s)}})}),t.size>0&&(document.createElement("div"),this.materialsFolder=this.trackFolder(this.gui.addFolder("Material Colors")),setTimeout(()=>{const n=this.gui.domElement.querySelector(".children"),i=this.materialsFolder.domElement;n&&i&&(n.insertBefore(i,n.firstChild),i.classList.add("materials-folder-main"))},10),t.forEach((n,i)=>{var l,c,h,d,u,f;const s=this.trackFolder(this.materialsFolder.addFolder(i));if(s.close(),(l=this.currentConfig)!=null&&l.customTextures&&this.currentConfig.customTextures[i]){const g=this.currentConfig.customTextures[i],A={textureUrl:g},m=s.add(A,"textureUrl").name("Texture URL (click to copy)");setTimeout(()=>{const p=m.domElement.querySelector("input");p&&(p.style.cursor="pointer",p.readOnly=!0,p.addEventListener("click",()=>{navigator.clipboard.writeText(g).then(()=>{console.log("Texture URL copied to clipboard:",g),p.style.background="rgba(74, 158, 255, 0.3)",setTimeout(()=>{p.style.background=""},300)})}))},0),setTimeout(()=>{const p=s.domElement;if(p){const v=document.createElement("div");v.className="material-texture-thumbnail";const M=document.createElement("img");M.src=g+(g.includes("?")?"&":"?")+`t=${Date.now()}`,M.alt=`${i} texture`,v.appendChild(M),p.appendChild(v)}},0)}if((c=this.currentConfig)!=null&&c.customTextures&&this.currentConfig.customTextures[i]&&s.add(n,"alphaTest",0,1,.01).name("Edge Threshold (Fix Fringe)").onChange(()=>n.needsUpdate=!0),n.color){const g={color:"#"+n.color.getHexString()};s.addColor(g,"color").name("Color").onChange(A=>{n.color.set(A),n.needsUpdate=!0})}s.add(n,"opacity",0,1,.01).name("Opacity").onChange(()=>n.needsUpdate=!0),s.add(n,"transparent").name("Transparent").onChange(()=>n.needsUpdate=!0),(!((h=this.currentConfig)!=null&&h.customTextures)||!this.currentConfig.customTextures[i])&&s.add(n,"alphaTest",0,1,.01).name("Alpha Test").onChange(()=>n.needsUpdate=!0);const o={Front:Tt,Back:Ct,Double:ot};if(s.add(n,"side",o).name("Side").onChange(()=>n.needsUpdate=!0),s.add(n,"depthWrite").name("Depth Write").onChange(()=>n.needsUpdate=!0),n.metalness!==void 0&&s.add(n,"metalness",0,1,.01).name("Metalness").onChange(()=>n.needsUpdate=!0),n.roughness!==void 0&&s.add(n,"roughness",0,1,.01).name("Roughness").onChange(()=>n.needsUpdate=!0),n.emissive){const g={emissive:n.emissive.getHex()};s.addColor(g,"emissive").name("Emissive").onChange(A=>{n.emissive.setHex(A)})}if(n.emissiveIntensity!==void 0&&s.add(n,"emissiveIntensity",0,2,.01).name("Emissive Intensity").onChange(()=>n.needsUpdate=!0),i.includes("MUSCLE")){if(n.sheen!==void 0){s.add(n,"sheen",0,1,.01).name("Sheen Intensity").onChange(()=>n.needsUpdate=!0),s.add(n,"sheenRoughness",0,1,.01).name("Sheen Roughness").onChange(()=>n.needsUpdate=!0);const g={sheenColor:n.sheenColor?n.sheenColor.getHex():16777215};s.addColor(g,"sheenColor").name("Sheen Color").onChange(A=>{n.sheenColor||(n.sheenColor=new ge),n.sheenColor.setHex(A),n.needsUpdate=!0})}n.bumpScale!==void 0&&n.bumpMap&&(setTimeout(()=>{const g=s.domElement;if(g){const A=document.createElement("div");A.className="material-texture-thumbnail";const m=document.createElement("div");m.textContent="Bump Map Texture:",m.style.fontSize="11px",m.style.marginBottom="4px",m.style.color="#aaa";const p=document.createElement("img");if(n.bumpMap.image&&n.bumpMap.image.src)p.src=n.bumpMap.image.src;else if(n.bumpMap.source&&n.bumpMap.source.data){const v=document.createElement("canvas");v.width=64,v.height=64;const M=v.getContext("2d");n.bumpMap.image&&M.drawImage(n.bumpMap.image,0,0,64,64),p.src=v.toDataURL()}p.alt="Bump map texture",A.appendChild(m),A.appendChild(p),g.appendChild(A)}},100),s.add(n,"bumpScale",-20,20,.1).name("Bump Scale").onChange(()=>n.needsUpdate=!0))}if(i.includes("SKIN")){n._originalColorMap||(n._originalColorMap=n.map);const g=window.flexframeSettings&&window.flexframeSettings.materialMode==="custom",A={useColorMap:g?!1:!!n.map};g&&n.map&&(n.map=null,n.needsUpdate=!0),s.add(A,"useColorMap").name("🎨 Use Color Map").onChange(y=>{y&&n._originalColorMap?n.map=n._originalColorMap:n.map=null,n.needsUpdate=!0});const m={"Front (Single)":Tt,Back:Ct,Double:ot};s.add(n,"side",m).name("Face Culling").onChange(()=>n.needsUpdate=!0);const p={Normal:St,Additive:ur,Subtractive:pr,Multiply:fr,Custom:ir};s.add(n,"blending",p).name("Blending Mode").onChange(()=>n.needsUpdate=!0),s.add(n,"depthWrite").name("Depth Write").onChange(()=>n.needsUpdate=!0),s.add(n,"depthTest").name("Depth Test").onChange(()=>n.needsUpdate=!0),s.add(n,"opacity",0,1,.01).name("Opacity").onChange(()=>n.needsUpdate=!0),s.add(n,"transparent").name("Transparent").onChange(()=>n.needsUpdate=!0),s.add(n,"alphaTest",0,1,.01).name("Alpha Test").onChange(()=>n.needsUpdate=!0),n.transmission!==void 0&&(s.add(n,"transmission",0,1,.01).name("🪟 Transmission (Glass)").onChange(()=>n.needsUpdate=!0),s.add(n,"thickness",0,5,.01).name("Thickness").onChange(()=>n.needsUpdate=!0),s.add(n,"ior",1,2.333,.01).name("IOR (Refraction)").onChange(()=>n.needsUpdate=!0),s.add(n,"envMapIntensity",0,3,.01).name("Env Map Intensity").onChange(()=>n.needsUpdate=!0));const v={castShadow:!0,setCastShadow:y=>{window.model&&window.model.traverse(C=>{C.isMesh&&C.material&&(Array.isArray(C.material)?C.material:[C.material]).some(T=>T.name===i)&&(C.castShadow=y)})}};s.add(v,"castShadow").name("Cast Shadows").onChange(y=>v.setCastShadow(y));const M={shadowBlur:((f=(u=(d=this.lighting)==null?void 0:d.directionalLight)==null?void 0:u.shadow)==null?void 0:f.radius)||1,setShadowBlur:y=>{var C,I;(I=(C=this.lighting)==null?void 0:C.directionalLight)!=null&&I.shadow&&(this.lighting.directionalLight.shadow.radius=y,console.log(`Shadow blur set to: ${y}`))}};s.add(M,"shadowBlur",0,10,.1).name("Shadow Blur").onChange(y=>M.setShadowBlur(y))}const a={copySettings:()=>{const g=n.map||n.normalMap||n.emissiveMap||n.bumpMap;let A="Can you please use these material settings as the default material settings whenever a model loads in with this specific material name.";g?A+=` Do NOT preserve any texture maps - use pure material properties only:

`:A+=`

`,A+=`Material Name: "${i}"

`,A+=`Settings:
`,n.color&&(A+=`- Color: #${n.color.getHexString()}
`),n.opacity!==void 0&&(A+=`- Opacity: ${n.opacity}
`),n.transparent!==void 0&&(A+=`- Transparent: ${n.transparent}
`),n.alphaTest!==void 0&&(A+=`- Alpha Test: ${n.alphaTest}
`),n.side!==void 0&&(A+=`- Side: ${{0:"FrontSide",1:"BackSide",2:"DoubleSide"}[n.side]||n.side}
`),n.depthWrite!==void 0&&(A+=`- Depth Write: ${n.depthWrite}
`),n.metalness!==void 0&&(A+=`- Metalness: ${n.metalness}
`),n.roughness!==void 0&&(A+=`- Roughness: ${n.roughness}
`),n.emissive&&(A+=`- Emissive: #${n.emissive.getHexString()}
`),n.emissiveIntensity!==void 0&&(A+=`- Emissive Intensity: ${n.emissiveIntensity}
`),n.sheen!==void 0&&(A+=`- Sheen: ${n.sheen}
`),n.sheenRoughness!==void 0&&(A+=`- Sheen Roughness: ${n.sheenRoughness}
`),n.sheenColor&&(A+=`- Sheen Color: #${n.sheenColor.getHexString()}
`),n.bumpScale!==void 0&&(A+=`- Bump Scale: ${n.bumpScale}
`),n.transmission!==void 0&&(A+=`- Transmission: ${n.transmission}
`),n.thickness!==void 0&&(A+=`- Thickness: ${n.thickness}
`),n.ior!==void 0&&(A+=`- IOR: ${n.ior}
`),n.envMapIntensity!==void 0&&(A+=`- Env Map Intensity: ${n.envMapIntensity}
`),n.blending!==void 0&&(A+=`- Blending: ${{0:"NoBlending",1:"NormalBlending",2:"AdditiveBlending",3:"SubtractiveBlending",4:"MultiplyBlending",5:"CustomBlending"}[n.blending]||n.blending}
`),n.depthTest!==void 0&&(A+=`- Depth Test: ${n.depthTest}
`),g&&(A+=`
Note: Remove all texture maps (map, normalMap, emissiveMap, bumpMap) for a pure material appearance.`),navigator.clipboard.writeText(A).then(()=>{console.log("Material settings copied to clipboard for:",i)})}};s.add(a,"copySettings").name("Copy Settings")}))}applyCustomTextures(e,t){Object.keys(t).forEach(n=>{const i=t[n],s=i+(i.includes("?")?"&":"?")+`t=${Date.now()}`;console.log(`🎨 Custom texture for ${n}: ${i}`),console.log(`🔄 Cache-busted URL: ${s}`),e.traverse(o=>{o.isMesh&&o.material&&(Array.isArray(o.material)?o.material:[o.material]).forEach(l=>{l.name===n&&(console.log(`✅ Found material "${n}" - applying texture...`),l.map&&l.map.dispose(),this.textureLoader.load(s,c=>{c.colorSpace=gt,c.premultiplyAlpha=!1,c.minFilter=ct,c.magFilter=ct,c.generateMipmaps=!1,l.map=c,l.transparent=!0,l.alphaTest=.95,l.depthWrite=!1,l.needsUpdate=!0,console.log(`✅ PNG texture with transparency applied to ${n}`),console.log(`📷 Texture loaded from: ${s}`)},void 0,c=>{console.error(`❌ Error loading texture for ${n}:`,c)}))})})})}applyLogoTexture(e,t,n=.95,i=!1,s=2,o=100){const a=t+(t.includes("?")?"&":"?")+`t=${Date.now()}`;e.traverse(l=>{l.isMesh&&l.material&&(Array.isArray(l.material)?l.material:[l.material]).forEach(h=>{if(h.name==="LOGO"){console.log("✅ Found LOGO material - applying texture..."),h.map&&h.map.dispose();const d=new Image;d.crossOrigin="anonymous",d.onload=()=>{const u=document.createElement("canvas"),f=u.getContext("2d"),g=o/100,A=d.width*g,m=d.height*g;u.width=d.width,u.height=d.height,f.clearRect(0,0,u.width,u.height);const p=(u.width-A)/2,v=(u.height-m)/2;if(i&&s>0){f.globalCompositeOperation="source-over";const y=document.createElement("canvas"),C=y.getContext("2d");y.width=u.width,y.height=u.height,C.drawImage(d,p,v,A,m);const I=parseInt(s);for(let T=0;T<360;T+=15){const w=T*Math.PI/180,_=Math.cos(w)*I,x=Math.sin(w)*I;f.drawImage(y,_,x)}f.globalCompositeOperation="source-in",f.fillStyle="white",f.fillRect(0,0,u.width,u.height),f.globalCompositeOperation="source-over",f.drawImage(d,p,v,A,m)}else f.drawImage(d,p,v,A,m);const M=new _a(u);M.colorSpace=gt,M.premultiplyAlpha=!1,M.minFilter=ct,M.magFilter=ct,M.generateMipmaps=!1,h.map=M,h.transparent=!0,h.alphaTest=parseFloat(n)||.95,h.depthWrite=!1,h.needsUpdate=!0,console.log("✅ LOGO texture applied successfully with border:",i,"size:",s,"displaySize:",o)},d.onerror=u=>{console.error("❌ Error loading LOGO texture:",u)},d.src=a}})})}applyMaterialPreset1(){var n,i;if(!window.model){console.log("No model loaded");return}const e={SKELETON:{color:"#ffffff",opacity:1,transparent:!0,metalness:0,roughness:.99,transmission:0,thickness:0,ior:1.5,side:ot,blending:St,depthWrite:!0,depthTest:!0,envMapIntensity:1},SKIN:{color:"#ccdef5",opacity:1,transparent:!1,metalness:0,roughness:0,transmission:1,thickness:0,ior:1,side:Tt,blending:ir,depthWrite:!1,depthTest:!0,envMapIntensity:2.29},MUSCLE:{color:"#ffffff",opacity:1,transparent:!0,metalness:0,roughness:0,transmission:0,thickness:0,ior:1.5,side:ot,blending:St,depthWrite:!0,depthTest:!0,envMapIntensity:1},CHROME:{color:"#ffffff",opacity:1,transparent:!1,metalness:.82,roughness:.07,transmission:0,thickness:0,ior:1.5,side:ot,blending:St,depthWrite:!0,depthTest:!0,envMapIntensity:1},METAL:{color:"#151515",opacity:1,transparent:!1,metalness:.85,roughness:.36,transmission:0,thickness:0,ior:1.5,side:ot,blending:St,depthWrite:!0,depthTest:!0,envMapIntensity:1},PLASTIC:{color:"#ffffff",opacity:.8,transparent:!0,metalness:0,roughness:.82,transmission:.2,thickness:0,ior:1.5,side:ot,blending:St,depthWrite:!1,depthTest:!0,envMapIntensity:1},COLOR_1:{color:((n=window.flexframeSettings)==null?void 0:n.primaryColorMode)==="custom"&&((i=window.flexframeSettings)!=null&&i.primaryColor)?window.flexframeSettings.primaryColor:"#ff0000",opacity:1,transparent:!1,metalness:0,roughness:.215,transmission:0,thickness:0,ior:1.5,side:ot,blending:St,depthWrite:!0,depthTest:!0,envMapIntensity:1}};let t=0;window.model.traverse(s=>{s.isMesh&&s.material&&(Array.isArray(s.material)?s.material:[s.material]).forEach(a=>{if(a.name&&e[a.name.toUpperCase()]){const l=e[a.name.toUpperCase()];l.color&&a.color.set(l.color),a.opacity=l.opacity,a.transparent=l.transparent,a.metalness=l.metalness,a.roughness=l.roughness,a.transmission=l.transmission,a.thickness=l.thickness,a.ior=l.ior,a.side=l.side,a.blending=l.blending,a.depthWrite=l.depthWrite,a.depthTest=l.depthTest,a.envMapIntensity=l.envMapIntensity,a.name.toUpperCase()==="SKIN"&&(a.map=null,a.normalMap=null,a.emissiveMap=null,a.bumpMap=null),l.attenuationDistance&&(a.attenuationDistance=l.attenuationDistance),a.needsUpdate=!0,t++}})}),console.log(`✅ Applied Material Preset 1 to ${t} materials`),this.gui&&setTimeout(()=>{this.gui.controllersRecursive().forEach(s=>{s.updateDisplay()})},100)}applyCustomSkinSettings(e){if(!window.model){console.log("No model loaded for custom skin settings");return}console.log("Applying custom SKIN settings:",e),window.model.traverse(t=>{t.isMesh&&t.material&&(Array.isArray(t.material)?t.material:[t.material]).forEach(i=>{i.name&&i.name.toUpperCase()==="SKIN"&&(e.color&&i.color.set(e.color),e.opacity!==void 0&&(i.opacity=e.opacity,i.transparent=e.opacity<1),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.transmission!==void 0&&(i.transmission=e.transmission),e.thickness!==void 0&&(i.thickness=e.thickness),e.ior!==void 0&&(i.ior=e.ior),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),i.needsUpdate=!0,console.log("✅ Custom SKIN settings applied to material:",i.name))})}),this.gui&&setTimeout(()=>{this.gui.controllersRecursive().forEach(t=>{t.updateDisplay()})},100)}applyEquipmentMaterials(e,t){if(!e||!t){console.log("No model or equipment materials to apply");return}console.log("Equipment Materials from WordPress:",t);const n={BARBELL:"BARBELL",BUMPER:"BUMPER",CABLE:"CABLE",CHROME:"CHROME",COLOR_1:"COLOR1",COLOR1:"COLOR1",METAL:"METAL",PAD:"PAD",PLASTIC:"PLASTIC",RUBBER:"RUBBER"};e.traverse(i=>{i.isMesh&&i.material&&(Array.isArray(i.material)?i.material:[i.material]).forEach(o=>{if(!o.name)return;const a=o.name.toUpperCase(),l=n[a];if(l&&t[l]){const c=t[l];if(!c.enabled){console.log(`Equipment material ${a} is disabled, skipping`);return}if(console.log(`Applying equipment settings to ${a}:`,c),c.color&&o.color.set(c.color),c.opacity!==void 0&&c.opacity!==null&&(o.opacity=parseFloat(c.opacity),o.transparent=o.opacity<1),c.metalness!==void 0&&c.metalness!==null&&(o.metalness=parseFloat(c.metalness)),c.roughness!==void 0&&c.roughness!==null&&(o.roughness=parseFloat(c.roughness)),c.clearcoat!==void 0&&c.clearcoat!==null&&(o.clearcoat=parseFloat(c.clearcoat)),c.clearcoatRoughness!==void 0&&c.clearcoatRoughness!==null&&(o.clearcoatRoughness=parseFloat(c.clearcoatRoughness)),c.emissiveColor&&o.emissive.set(c.emissiveColor),c.emissiveIntensity!==void 0&&c.emissiveIntensity!==null&&(o.emissiveIntensity=parseFloat(c.emissiveIntensity)),c.transmission!==void 0&&c.transmission!==null&&(o.transmission=parseFloat(c.transmission)),c.thickness!==void 0&&c.thickness!==null&&(o.thickness=parseFloat(c.thickness)),c.ior!==void 0&&c.ior!==null&&(o.ior=parseFloat(c.ior)),c.sheen!==void 0&&c.sheen!==null&&(o.sheen=parseFloat(c.sheen)),c.sheenRoughness!==void 0&&c.sheenRoughness!==null&&(o.sheenRoughness=parseFloat(c.sheenRoughness)),c.sheenColor&&o.sheenColor.set(c.sheenColor),c.envMapIntensity!==void 0&&c.envMapIntensity!==null&&(o.envMapIntensity=parseFloat(c.envMapIntensity)),c.blending)switch(c.blending){case"normal":o.blending=St;break;case"additive":o.blending=ur;break;case"subtractive":o.blending=pr;break;case"multiply":o.blending=fr;break}c.bumpMapEnabled!==void 0&&c.bumpMapEnabled!==null&&!c.bumpMapEnabled&&o.bumpMap&&(o.bumpScale=0),c.normalMapEnabled!==void 0&&c.normalMapEnabled!==null&&!c.normalMapEnabled&&o.normalMap&&o.normalScale.set(0,0),c.colorMapEnabled!==void 0&&c.colorMapEnabled!==null&&!c.colorMapEnabled&&o.map&&(o.map=null),o.needsUpdate=!0,console.log(`✅ Equipment material settings applied to: ${a}`)}})})}setupEventListeners(){window.addEventListener("resize",()=>{var e;if(this.sizes.width=window.innerWidth,this.sizes.height=window.innerHeight,this.cameraManager.handleResize(),this.renderer.setSize(this.sizes.width,this.sizes.height),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.animationPlayer&&((e=this.uiSettings)!=null&&e.player)){const n=window.innerWidth<=768?!1:this.uiSettings.player.alwaysVisible===!0;this.animationPlayer.setAlwaysVisible(n)}}),this.sceneManager.getCanvas().addEventListener("pointerdown",e=>{if(this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.cameraManager.getCamera()),window.model){const t=this.raycaster.intersectObject(window.model,!0);if(t.length>0){const n=t[0].object;n.isMesh&&n.material&&(Array.isArray(n.material)?n.material:[n.material]).forEach(s=>{console.log("🎨 Material:",s.name||"Unnamed Material")})}}})}animate(){const e=this.clock.getDelta();this.cameraManager.update(),this.updateCameraDebug&&this.updateCameraDebug(),this.particleSystem.update(e),this.mixer&&this.animationPlayer.isPlaying&&this.mixer.update(e),this.animationPlayer.update(e),this.renderer.render(this.sceneManager.getScene(),this.cameraManager.getCamera()),requestAnimationFrame(()=>this.animate())}setupScreenshotGUI(){const e=this.trackFolder(this.gui.addFolder("Screenshot")),t=this.screenshotManager.settings,n=this.screenshotManager.getResolutionPresets(),i={quickShot:()=>{this.screenshotManager.quickScreenshot().then(y=>{y.success?console.log(`✅ Screenshot saved: ${y.filename} (${y.size})`):console.error("❌ Screenshot failed:",y.error)})},transparentShot:()=>{this.screenshotManager.transparentScreenshot().then(y=>{y.success?console.log(`✅ Transparent screenshot saved: ${y.filename} (${y.size})`):console.error("❌ Screenshot failed:",y.error)})}};e.add(i,"quickShot").name("Take Screenshot"),e.add(i,"transparentShot").name("🫥 Transparent Background");const s=this.trackFolder(e.addFolder("Settings"));s.add(t,"transparent").name("Transparent Background").onChange(y=>{console.log("Transparent background:",y?"ON":"OFF")});const o={png:"PNG",jpg:"JPEG",webp:"WebP"};s.add(t,"format",o).name("Format").onChange(y=>{console.log("Format changed to:",y.toUpperCase()),a.domElement.style.display=y==="png"?"none":"block"});const a=s.add(t,"quality",.1,1,.1).name("Quality (0.1-1.0)").onChange(y=>{console.log("Quality:",Math.round(y*100)+"%")});t.format==="png"&&(a.domElement.style.display="none"),s.add(t,"filename").name("Filename").onChange(y=>{t.filename=y.replace(/[^a-zA-Z0-9_-]/g,"")}),s.add(t,"addTimestamp").name("Add Timestamp");const l=this.trackFolder(e.addFolder("Resolution")),c={};Object.keys(n).forEach(y=>{c[y]=n[y].name}),l.add(t,"resolution",c).name("Preset").onChange(y=>{this.screenshotManager.setResolution(y),g();const C=y==="custom";h.domElement.style.display=C?"block":"none",d.domElement.style.display=C?"block":"none",console.log("Resolution preset:",n[y].name)});const h=l.add(t,"customWidth",1,8192,1).name("Custom Width").onChange(y=>{this.screenshotManager.setCustomDimensions(y,t.customHeight),g()}),d=l.add(t,"customHeight",1,8192,1).name("Custom Height").onChange(y=>{this.screenshotManager.setCustomDimensions(t.customWidth,y),g()}),u={info:"Loading..."},f=l.add(u,"info").name("Current Resolution");f.domElement.querySelector("input").readOnly=!0,f.domElement.querySelector("input").style.color="#888";const g=()=>{const y=this.screenshotManager.getCurrentResolution(),C=(y.width*y.height/1e6).toFixed(1),I=this.calculateAspectRatio(y.width,y.height);u.info=`${y.width}×${y.height} (${C}MP, ${I})`},A=t.resolution==="custom";h.domElement.style.display=A?"block":"none",d.domElement.style.display=A?"block":"none";const m=this.trackFolder(l.addFolder("Quick Presets")),p={hd:()=>this.setQuickResolution("1280x720"),fhd:()=>this.setQuickResolution("1920x1080"),qhd:()=>this.setQuickResolution("2560x1440"),uhd:()=>this.setQuickResolution("3840x2160"),square:()=>this.setQuickResolution("1080x1080"),story:()=>this.setQuickResolution("1080x1920")};m.add(p,"hd").name("HD (720p)"),m.add(p,"fhd").name("Full HD (1080p)"),m.add(p,"qhd").name("2K (1440p)"),m.add(p,"uhd").name("4K (2160p)"),m.add(p,"square").name("Square (1:1)"),m.add(p,"story").name("Story (9:16)");const v=this.trackFolder(e.addFolder("Advanced")),M={currentViewport:()=>{const y=this.sceneManager.getCanvas();this.screenshotManager.setCustomDimensions(y.width,y.height),t.resolution="custom",g(),console.log(`Set to current viewport: ${y.width}×${y.height}`)},copySettings:()=>{const y=this.screenshotManager.getSettings();navigator.clipboard.writeText(JSON.stringify(y,null,2)),console.log("📋 Screenshot settings copied to clipboard")}};v.add(M,"currentViewport").name("Use Current Viewport"),v.add(M,"copySettings").name("Copy Screenshot Settings"),g()}setupMultiThumbnailMenuGUI(){const e=this.trackFolder(this.gui.addFolder("Multi-Thumbnail Menu")),t=this.multiThumbnailMenuSystem.settings;e.add(t,"widthPercentage",20,100,5).name("Width %").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({widthPercentage:s}),console.log("Multi-thumbnail menu width:",s+"%")}),e.addColor(t,"backgroundColor").name("Background Color").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({backgroundColor:s}),console.log("Multi-thumbnail menu background color:",s)}),e.add(t,"backgroundOpacity",0,1,.1).name("Background Opacity").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({backgroundOpacity:s}),console.log("Multi-thumbnail menu opacity:",s)}),e.add(t,"borderRadius",0,30,1).name("Corner Radius").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({borderRadius:s}),console.log("Multi-thumbnail menu radius:",s+"px")}),e.add(t,"keepOpen").name("Keep Menu Open").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({keepOpen:s}),console.log("Multi-thumbnail menu keep open:",s?"ON":"OFF")});const n=e.addFolder("Active Button Glow");n.addColor(t,"glowColor").name("Glow Color").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({glowColor:s}),console.log("Multi-thumbnail menu glow color:",s)}),n.add(t,"glowIntensity",0,1,.1).name("Glow Intensity").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({glowIntensity:s}),console.log("Multi-thumbnail menu glow intensity:",s)}),n.add(t,"glowSize",5,50,5).name("Glow Size").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({glowSize:s}),console.log("Multi-thumbnail menu glow size:",s+"px")}),e.add({copySettings:()=>this.multiThumbnailMenuSystem.copySettingsToClipboard()},"copySettings").name("Copy Settings");const i={hideRightMenu:!1};e.add(i,"hideRightMenu").name("Hide Right Info Menu").onChange(s=>{const o=document.querySelector(".thumbnail-grid-container-right");o&&(o.style.display=s?"none":"grid",console.log("Right info menu:",s?"HIDDEN":"VISIBLE"))}),e.add({copyRightMenuSettings:()=>this.rightMenuSystem.copySettingsToClipboard()},"copyRightMenuSettings").name("Copy Right Menu Settings"),setTimeout(()=>this.multiThumbnailMenuSystem.updateAllSettings(t),100)}setQuickResolution(e){this.screenshotManager.setResolution(e),this.screenshotManager.settings.resolution=e,console.log("Quick preset:",this.screenshotManager.getResolutionPresets()[e].name)}calculateAspectRatio(e,t){const n=(l,c)=>c===0?l:n(c,l%c),i=n(e,t),s=e/i,o=t/i,a={"16:9":[16,9],"21:9":[21,9],"4:3":[4,3],"3:2":[3,2],"1:1":[1,1],"9:16":[9,16],"2:1":[2,1],"5:4":[5,4]};for(const[l,[c,h]]of Object.entries(a))if(s===c&&o===h)return l;return`${s}:${o}`}createScreenshotFrame(){this.screenshotFrame&&document.body.removeChild(this.screenshotFrame),this.screenshotFrame=document.createElement("div"),this.screenshotFrame.className="screenshot-frame",this.screenshotFrame.innerHTML=`
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
        `,document.head.querySelector("style[data-screenshot-frame]")||(e.setAttribute("data-screenshot-frame","true"),document.head.appendChild(e)),document.body.appendChild(this.screenshotFrame)}updateScreenshotFrame(e,t){if(!this.screenshotFrame)return;const i=this.renderer.domElement.getBoundingClientRect(),s=i.width/i.height,o=e/t;let a,l;o>s?(a=i.width*.8,l=a/o):(l=i.height*.8,a=l*o);const c=i.left+(i.width-a)/2,h=i.top+(i.height-l)/2;this.screenshotFrame.style.left=c+"px",this.screenshotFrame.style.top=h+"px",this.screenshotFrame.style.width=a+"px",this.screenshotFrame.style.height=l+"px";const d=this.screenshotFrame.querySelector(".frame-info");d.textContent=`${e} × ${t} pixels`}toggleScreenshotFrame(e){this.frameVisible=e,this.screenshotFrame&&this.screenshotFrame.classList.toggle("visible",e)}setupSimpleScreenshotGUI(){const e=this.trackFolder(this.gui.addFolder("Screenshot")),t=this.trackFolder(e.addFolder("Custom Settings")),n=()=>({renderer:this.renderer,scene:this.sceneManager.getScene(),camera:this.cameraManager.getCamera()}),i={width:400,height:400,transparent:!1,format:"png",filename:"screenshot",showFrame:!1},s=()=>{this.currentExerciseName&&(i.filename=`${this.currentExerciseName} Thumbnail`)};s(),this.createScreenshotFrame(),t.add(i,"width",100,4096,1).name("Width").onChange(a=>{i.showFrame&&this.updateScreenshotFrame(a,i.height)}),t.add(i,"height",100,4096,1).name("Height").onChange(a=>{i.showFrame&&this.updateScreenshotFrame(i.width,a)}),t.add(i,"showFrame").name("Show Frame Preview").onChange(a=>{this.toggleScreenshotFrame(a),a&&this.updateScreenshotFrame(i.width,i.height)}),t.add(i,"transparent").name("Transparent"),t.add(i,"format",["png","jpg","webp"]).name("Format");const o=t.add(i,"filename").name("Filename");document.addEventListener("exercisesSelected",()=>{s(),o.updateDisplay()}),t.add({customShot:async()=>{const a=n(),l=await co.takeScreenshot(a.renderer,a.scene,a.camera,i);l.success?console.log(`✅ Custom ${l.filename} saved (${l.size})`):console.error(`❌ Custom screenshot failed: ${l.error}`)}},"customShot").name("Take Custom Screenshot")}setupMobileSearchCloseButton(){const e=document.getElementById("searchCloseBtnMobile"),t=document.getElementById("searchDropdown"),n=document.getElementById("searchToggle");if(!e||!t||!n)return;const i=window.flexframeSettings||{},s=i.menuBackgroundColor||"#000000",o=i.menuBackgroundOpacity||.9,l=(f=>{const g=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(f);return g?{r:parseInt(g[1],16),g:parseInt(g[2],16),b:parseInt(g[3],16)}:{r:0,g:0,b:0}})(s),c=`rgba(${l.r}, ${l.g}, ${l.b}, ${o})`,h=`rgba(${l.r}, ${l.g}, ${l.b}, ${Math.min(o+.1,1)})`;e.style.setProperty("background",c,"important"),e.style.setProperty("background-color",c,"important"),e.addEventListener("mouseenter",()=>{e.style.setProperty("background",h,"important"),e.style.setProperty("background-color",h,"important")}),e.addEventListener("mouseleave",()=>{e.style.setProperty("background",c,"important"),e.style.setProperty("background-color",c,"important")});const d=()=>{if(t.classList.contains("show")){const g=t.getBoundingClientRect().bottom;e.style.top=`${g+10}px`,e.style.display="flex"}else e.style.display="none"};new MutationObserver(f=>{f.forEach(g=>{g.type==="attributes"&&g.attributeName==="class"&&d()})}).observe(t,{attributes:!0,attributeFilter:["class"]}),e.addEventListener("click",()=>{this.multiThumbnailMenuSystem&&this.multiThumbnailMenuSystem.menus.search&&this.multiThumbnailMenuSystem.menus.search.closeMenu()}),d()}}new Yy;
//# sourceMappingURL=index-N1s0PGda.js.map
