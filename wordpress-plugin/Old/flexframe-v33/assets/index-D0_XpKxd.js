(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ta="174",An={ROTATE:0,DOLLY:1,PAN:2},wi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},rh=0,Ua=1,oh=2,ac=1,lc=2,bn=3,At=0,Ct=1,rt=2,zn=0,bt=1,or=2,ar=3,lr=4,Qs=5,ti=100,ah=101,lh=102,ch=103,hh=104,dh=200,uh=201,ph=202,fh=203,lo=204,co=205,mh=206,gh=207,_h=208,yh=209,xh=210,vh=211,bh=212,Sh=213,Mh=214,ho=0,uo=1,po=2,Di=3,fo=4,mo=5,go=6,_o=7,cc=0,Eh=1,wh=2,Hn=0,Th=1,Ah=2,Ch=3,hc=4,Rh=5,Ph=6,Lh=7,Na="attached",Ih="detached",dc=300,Fi=301,Ui=302,cr=303,yo=304,gr=306,Ni=1e3,Kt=1001,hr=1002,Nt=1003,uc=1004,ss=1005,lt=1006,Js=1007,cn=1008,Rn=1009,pc=1010,fc=1011,cs=1012,na=1013,ri=1014,zt=1015,En=1016,ia=1017,sa=1018,Oi=1020,mc=35902,gc=1021,_c=1022,Zt=1023,yc=1024,xc=1025,Ri=1026,Bi=1027,ra=1028,oa=1029,vc=1030,aa=1031,la=1033,er=33776,tr=33777,nr=33778,ir=33779,xo=35840,vo=35841,bo=35842,So=35843,Mo=36196,Eo=37492,wo=37496,To=37808,Ao=37809,Co=37810,Ro=37811,Po=37812,Lo=37813,Io=37814,Do=37815,Fo=37816,Uo=37817,No=37818,Oo=37819,Bo=37820,ko=37821,sr=36492,zo=36494,Ho=36495,bc=36283,Vo=36284,Go=36285,Wo=36286,Dh=2200,Fh=2201,Uh=2202,hs=2300,ds=2301,Mr=2302,Ti=2400,Ai=2401,dr=2402,ca=2500,Nh=2501,Oh=0,Sc=1,$o=2,Bh=3200,kh=3201,Mc=0,zh=1,kn="",mt="srgb",Mt="srgb-linear",ur="linear",tt="srgb",ci=7680,Oa=519,Hh=512,Vh=513,Gh=514,Ec=515,Wh=516,$h=517,Xh=518,qh=519,Xo=35044,Ba="300 es",wn=2e3,pr=2001;class Gn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ka=1234567;const os=Math.PI/180,ki=180/Math.PI;function on(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(wt[r&255]+wt[r>>8&255]+wt[r>>16&255]+wt[r>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[n&255]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]).toLowerCase()}function Oe(r,e,t){return Math.max(e,Math.min(t,r))}function ha(r,e){return(r%e+e)%e}function jh(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Yh(r,e,t){return r!==e?(t-r)/(e-r):0}function as(r,e,t){return(1-t)*r+t*e}function Kh(r,e,t,n){return as(r,e,1-Math.exp(-t*n))}function Zh(r,e=1){return e-Math.abs(ha(r,e*2)-e)}function Qh(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Jh(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function ed(r,e){return r+Math.floor(Math.random()*(e-r+1))}function td(r,e){return r+Math.random()*(e-r)}function nd(r){return r*(.5-Math.random())}function id(r){r!==void 0&&(ka=r);let e=ka+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function sd(r){return r*os}function rd(r){return r*ki}function od(r){return(r&r-1)===0&&r!==0}function ad(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function ld(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function cd(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),h=o((e+n)/2),d=s((e-n)/2),u=o((e-n)/2),f=s((n-e)/2),_=o((n-e)/2);switch(i){case"XYX":r.set(a*h,l*d,l*u,a*c);break;case"YZY":r.set(l*u,a*h,l*d,a*c);break;case"ZXZ":r.set(l*d,l*u,a*h,a*c);break;case"XZX":r.set(a*h,l*_,l*f,a*c);break;case"YXY":r.set(l*f,a*h,l*_,a*c);break;case"ZYZ":r.set(l*_,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function sn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Je(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const wc={DEG2RAD:os,RAD2DEG:ki,generateUUID:on,clamp:Oe,euclideanModulo:ha,mapLinear:jh,inverseLerp:Yh,lerp:as,damp:Kh,pingpong:Zh,smoothstep:Qh,smootherstep:Jh,randInt:ed,randFloat:td,randFloatSpread:nd,seededRandom:id,degToRad:sd,radToDeg:rd,isPowerOfTwo:od,ceilPowerOfTwo:ad,floorPowerOfTwo:ld,setQuaternionFromProperEuler:cd,normalize:Je,denormalize:sn};class Te{constructor(e=0,t=0){Te.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Oe(this.x,e.x,t.x),this.y=Oe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Oe(this.x,e,t),this.y=Oe(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Oe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Oe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class De{constructor(e,t,n,i,s,o,a,l,c){De.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],_=n[8],g=i[0],m=i[3],p=i[6],b=i[1],E=i[4],y=i[7],R=i[2],P=i[5],T=i[8];return s[0]=o*g+a*b+l*R,s[3]=o*m+a*E+l*P,s[6]=o*p+a*y+l*T,s[1]=c*g+h*b+d*R,s[4]=c*m+h*E+d*P,s[7]=c*p+h*y+d*T,s[2]=u*g+f*b+_*R,s[5]=u*m+f*E+_*P,s[8]=u*p+f*y+_*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=h*o-a*c,u=a*l-h*s,f=c*s-o*l,_=t*d+n*u+i*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(i*c-h*n)*g,e[2]=(a*n-i*o)*g,e[3]=u*g,e[4]=(h*t-i*l)*g,e[5]=(i*s-a*t)*g,e[6]=f*g,e[7]=(n*l-c*t)*g,e[8]=(o*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Er.makeScale(e,t)),this}rotate(e){return this.premultiply(Er.makeRotation(-e)),this}translate(e,t){return this.premultiply(Er.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Er=new De;function Tc(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function us(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function hd(){const r=us("canvas");return r.style.display="block",r}const za={};function Jn(r){r in za||(za[r]=!0,console.warn(r))}function dd(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function ud(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function pd(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ha=new De().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Va=new De().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function fd(){const r={enabled:!0,workingColorSpace:Mt,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===tt&&(i.r=Cn(i.r),i.g=Cn(i.g),i.b=Cn(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===tt&&(i.r=Pi(i.r),i.g=Pi(i.g),i.b=Pi(i.b))),i},fromWorkingColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},toWorkingColorSpace:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===kn?ur:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Mt]:{primaries:e,whitePoint:n,transfer:ur,toXYZ:Ha,fromXYZ:Va,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:mt},outputColorSpaceConfig:{drawingBufferColorSpace:mt}},[mt]:{primaries:e,whitePoint:n,transfer:tt,toXYZ:Ha,fromXYZ:Va,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:mt}}}),r}const We=fd();function Cn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Pi(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let hi;class md{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{hi===void 0&&(hi=us("canvas")),hi.width=e.width,hi.height=e.height;const n=hi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=hi}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=us("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Cn(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Cn(t[n]/255)*255):t[n]=Cn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let gd=0;class da{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gd++}),this.uuid=on(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(wr(i[o].image)):s.push(wr(i[o]))}else s=wr(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function wr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?md.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let _d=0;class gt extends Gn{constructor(e=gt.DEFAULT_IMAGE,t=gt.DEFAULT_MAPPING,n=Kt,i=Kt,s=lt,o=cn,a=Zt,l=Rn,c=gt.DEFAULT_ANISOTROPY,h=kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_d++}),this.uuid=on(),this.name="",this.source=new da(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Te(0,0),this.repeat=new Te(1,1),this.center=new Te(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new De,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==dc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ni:e.x=e.x-Math.floor(e.x);break;case Kt:e.x=e.x<0?0:1;break;case hr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ni:e.y=e.y-Math.floor(e.y);break;case Kt:e.y=e.y<0?0:1;break;case hr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}gt.DEFAULT_IMAGE=null;gt.DEFAULT_MAPPING=dc;gt.DEFAULT_ANISOTROPY=1;class je{constructor(e=0,t=0,n=0,i=1){je.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,y=(f+1)/2,R=(p+1)/2,P=(h+u)/4,T=(d+g)/4,A=(_+m)/4;return E>y&&E>R?E<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(E),i=P/n,s=T/n):y>R?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=P/i,s=A/i):R<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(R),n=T/s,i=A/s),this.set(n,i,s,t),this}let b=Math.sqrt((m-_)*(m-_)+(d-g)*(d-g)+(u-h)*(u-h));return Math.abs(b)<.001&&(b=1),this.x=(m-_)/b,this.y=(d-g)/b,this.z=(u-h)/b,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Oe(this.x,e.x,t.x),this.y=Oe(this.y,e.y,t.y),this.z=Oe(this.z,e.z,t.z),this.w=Oe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Oe(this.x,e,t),this.y=Oe(this.y,e,t),this.z=Oe(this.z,e,t),this.w=Oe(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Oe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class yd extends Gn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new je(0,0,e,t),this.scissorTest=!1,this.viewport=new je(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:lt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new gt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new da(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class oi extends yd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ac extends gt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=Kt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class xd extends gt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=Kt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $t{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3];const u=s[o+0],f=s[o+1],_=s[o+2],g=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(a===1){e[t+0]=u,e[t+1]=f,e[t+2]=_,e[t+3]=g;return}if(d!==g||l!==u||c!==f||h!==_){let m=1-a;const p=l*u+c*f+h*_+d*g,b=p>=0?1:-1,E=1-p*p;if(E>Number.EPSILON){const R=Math.sqrt(E),P=Math.atan2(R,p*b);m=Math.sin(m*P)/R,a=Math.sin(a*P)/R}const y=a*b;if(l=l*m+u*y,c=c*m+f*y,h=h*m+_*y,d=d*m+g*y,m===1-a){const R=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=R,c*=R,h*=R,d*=R}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=s[o],u=s[o+1],f=s[o+2],_=s[o+3];return e[t]=a*_+h*d+l*f-c*u,e[t+1]=l*_+h*u+c*d-a*f,e[t+2]=c*_+h*f+a*u-l*d,e[t+3]=h*_-a*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),d=a(s/2),u=l(n/2),f=l(i/2),_=l(s/2);switch(o){case"XYZ":this._x=u*h*d+c*f*_,this._y=c*f*d-u*h*_,this._z=c*h*_+u*f*d,this._w=c*h*d-u*f*_;break;case"YXZ":this._x=u*h*d+c*f*_,this._y=c*f*d-u*h*_,this._z=c*h*_-u*f*d,this._w=c*h*d+u*f*_;break;case"ZXY":this._x=u*h*d-c*f*_,this._y=c*f*d+u*h*_,this._z=c*h*_+u*f*d,this._w=c*h*d-u*f*_;break;case"ZYX":this._x=u*h*d-c*f*_,this._y=c*f*d+u*h*_,this._z=c*h*_-u*f*d,this._w=c*h*d+u*f*_;break;case"YZX":this._x=u*h*d+c*f*_,this._y=c*f*d+u*h*_,this._z=c*h*_-u*f*d,this._w=c*h*d-u*f*_;break;case"XZY":this._x=u*h*d-c*f*_,this._y=c*f*d-u*h*_,this._z=c*h*_+u*f*d,this._w=c*h*d+u*f*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+a+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(o-i)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+c)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(s-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Oe(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=s*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,t=0,n=0){I.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ga.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ga.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-s*i),d=2*(s*n-o*t);return this.x=t+l*c+o*d-a*h,this.y=n+l*h+a*c-s*d,this.z=i+l*d+s*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Oe(this.x,e.x,t.x),this.y=Oe(this.y,e.y,t.y),this.z=Oe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Oe(this.x,e,t),this.y=Oe(this.y,e,t),this.z=Oe(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Oe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Tr.copy(this).projectOnVector(e),this.sub(Tr)}reflect(e){return this.sub(Tr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Oe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Tr=new I,Ga=new $t;class Pn{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(en.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(en.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=en.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,en):en.fromBufferAttribute(s,o),en.applyMatrix4(e.matrixWorld),this.expandByPoint(en);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),vs.copy(n.boundingBox)),vs.applyMatrix4(e.matrixWorld),this.union(vs)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,en),en.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Yi),bs.subVectors(this.max,Yi),di.subVectors(e.a,Yi),ui.subVectors(e.b,Yi),pi.subVectors(e.c,Yi),Ln.subVectors(ui,di),In.subVectors(pi,ui),Xn.subVectors(di,pi);let t=[0,-Ln.z,Ln.y,0,-In.z,In.y,0,-Xn.z,Xn.y,Ln.z,0,-Ln.x,In.z,0,-In.x,Xn.z,0,-Xn.x,-Ln.y,Ln.x,0,-In.y,In.x,0,-Xn.y,Xn.x,0];return!Ar(t,di,ui,pi,bs)||(t=[1,0,0,0,1,0,0,0,1],!Ar(t,di,ui,pi,bs))?!1:(Ss.crossVectors(Ln,In),t=[Ss.x,Ss.y,Ss.z],Ar(t,di,ui,pi,bs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,en).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(en).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const mn=[new I,new I,new I,new I,new I,new I,new I,new I],en=new I,vs=new Pn,di=new I,ui=new I,pi=new I,Ln=new I,In=new I,Xn=new I,Yi=new I,bs=new I,Ss=new I,qn=new I;function Ar(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){qn.fromArray(r,s);const a=i.x*Math.abs(qn.x)+i.y*Math.abs(qn.y)+i.z*Math.abs(qn.z),l=e.dot(qn),c=t.dot(qn),h=n.dot(qn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const vd=new Pn,Ki=new I,Cr=new I;class un{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):vd.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ki.subVectors(e,this.center);const t=Ki.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ki,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Cr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ki.copy(e.center).add(Cr)),this.expandByPoint(Ki.copy(e.center).sub(Cr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const gn=new I,Rr=new I,Ms=new I,Dn=new I,Pr=new I,Es=new I,Lr=new I;class Wi{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,gn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=gn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(gn.copy(this.origin).addScaledVector(this.direction,t),gn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Rr.copy(e).add(t).multiplyScalar(.5),Ms.copy(t).sub(e).normalize(),Dn.copy(this.origin).sub(Rr);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Ms),a=Dn.dot(this.direction),l=-Dn.dot(Ms),c=Dn.lengthSq(),h=Math.abs(1-o*o);let d,u,f,_;if(h>0)if(d=o*l-a,u=o*a-l,_=s*h,d>=0)if(u>=-_)if(u<=_){const g=1/h;d*=g,u*=g,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-_?(d=Math.max(0,-(-o*s+a)),u=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c):u<=_?(d=0,u=Math.min(Math.max(-s,-l),s),f=u*(u+2*l)+c):(d=Math.max(0,-(o*s+a)),u=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c);else u=o>0?-s:s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Rr).addScaledVector(Ms,u),f}intersectSphere(e,t){gn.subVectors(e.center,this.origin);const n=gn.dot(this.direction),i=gn.dot(gn)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,gn)!==null}intersectTriangle(e,t,n,i,s){Pr.subVectors(t,e),Es.subVectors(n,e),Lr.crossVectors(Pr,Es);let o=this.direction.dot(Lr),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Dn.subVectors(this.origin,e);const l=a*this.direction.dot(Es.crossVectors(Dn,Es));if(l<0)return null;const c=a*this.direction.dot(Pr.cross(Dn));if(c<0||l+c>o)return null;const h=-a*Dn.dot(Lr);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Le{constructor(e,t,n,i,s,o,a,l,c,h,d,u,f,_,g,m){Le.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,h,d,u,f,_,g,m)}set(e,t,n,i,s,o,a,l,c,h,d,u,f,_,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Le().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/fi.setFromMatrixColumn(e,0).length(),s=1/fi.setFromMatrixColumn(e,1).length(),o=1/fi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const u=o*h,f=o*d,_=a*h,g=a*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+_*c,t[5]=u-g*c,t[9]=-a*l,t[2]=g-u*c,t[6]=_+f*c,t[10]=o*l}else if(e.order==="YXZ"){const u=l*h,f=l*d,_=c*h,g=c*d;t[0]=u+g*a,t[4]=_*a-f,t[8]=o*c,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=f*a-_,t[6]=g+u*a,t[10]=o*l}else if(e.order==="ZXY"){const u=l*h,f=l*d,_=c*h,g=c*d;t[0]=u-g*a,t[4]=-o*d,t[8]=_+f*a,t[1]=f+_*a,t[5]=o*h,t[9]=g-u*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const u=o*h,f=o*d,_=a*h,g=a*d;t[0]=l*h,t[4]=_*c-f,t[8]=u*c+g,t[1]=l*d,t[5]=g*c+u,t[9]=f*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const u=o*l,f=o*c,_=a*l,g=a*c;t[0]=l*h,t[4]=g-u*d,t[8]=_*d+f,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*d+_,t[10]=u-g*d}else if(e.order==="XZY"){const u=o*l,f=o*c,_=a*l,g=a*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+g,t[5]=o*h,t[9]=f*d-_,t[2]=_*d-f,t[6]=a*h,t[10]=g*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(bd,e,Sd)}lookAt(e,t,n){const i=this.elements;return Gt.subVectors(e,t),Gt.lengthSq()===0&&(Gt.z=1),Gt.normalize(),Fn.crossVectors(n,Gt),Fn.lengthSq()===0&&(Math.abs(n.z)===1?Gt.x+=1e-4:Gt.z+=1e-4,Gt.normalize(),Fn.crossVectors(n,Gt)),Fn.normalize(),ws.crossVectors(Gt,Fn),i[0]=Fn.x,i[4]=ws.x,i[8]=Gt.x,i[1]=Fn.y,i[5]=ws.y,i[9]=Gt.y,i[2]=Fn.z,i[6]=ws.z,i[10]=Gt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],_=n[2],g=n[6],m=n[10],p=n[14],b=n[3],E=n[7],y=n[11],R=n[15],P=i[0],T=i[4],A=i[8],M=i[12],x=i[1],C=i[5],k=i[9],N=i[13],H=i[2],$=i[6],V=i[10],j=i[14],G=i[3],te=i[7],ne=i[11],_e=i[15];return s[0]=o*P+a*x+l*H+c*G,s[4]=o*T+a*C+l*$+c*te,s[8]=o*A+a*k+l*V+c*ne,s[12]=o*M+a*N+l*j+c*_e,s[1]=h*P+d*x+u*H+f*G,s[5]=h*T+d*C+u*$+f*te,s[9]=h*A+d*k+u*V+f*ne,s[13]=h*M+d*N+u*j+f*_e,s[2]=_*P+g*x+m*H+p*G,s[6]=_*T+g*C+m*$+p*te,s[10]=_*A+g*k+m*V+p*ne,s[14]=_*M+g*N+m*j+p*_e,s[3]=b*P+E*x+y*H+R*G,s[7]=b*T+E*C+y*$+R*te,s[11]=b*A+E*k+y*V+R*ne,s[15]=b*M+E*N+y*j+R*_e,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],_=e[3],g=e[7],m=e[11],p=e[15];return _*(+s*l*d-i*c*d-s*a*u+n*c*u+i*a*f-n*l*f)+g*(+t*l*f-t*c*u+s*o*u-i*o*f+i*c*h-s*l*h)+m*(+t*c*d-t*a*f-s*o*d+n*o*f+s*a*h-n*c*h)+p*(-i*a*h-t*l*d+t*a*u+i*o*d-n*o*u+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],_=e[12],g=e[13],m=e[14],p=e[15],b=d*m*c-g*u*c+g*l*f-a*m*f-d*l*p+a*u*p,E=_*u*c-h*m*c-_*l*f+o*m*f+h*l*p-o*u*p,y=h*g*c-_*d*c+_*a*f-o*g*f-h*a*p+o*d*p,R=_*d*l-h*g*l-_*a*u+o*g*u+h*a*m-o*d*m,P=t*b+n*E+i*y+s*R;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/P;return e[0]=b*T,e[1]=(g*u*s-d*m*s-g*i*f+n*m*f+d*i*p-n*u*p)*T,e[2]=(a*m*s-g*l*s+g*i*c-n*m*c-a*i*p+n*l*p)*T,e[3]=(d*l*s-a*u*s-d*i*c+n*u*c+a*i*f-n*l*f)*T,e[4]=E*T,e[5]=(h*m*s-_*u*s+_*i*f-t*m*f-h*i*p+t*u*p)*T,e[6]=(_*l*s-o*m*s-_*i*c+t*m*c+o*i*p-t*l*p)*T,e[7]=(o*u*s-h*l*s+h*i*c-t*u*c-o*i*f+t*l*f)*T,e[8]=y*T,e[9]=(_*d*s-h*g*s-_*n*f+t*g*f+h*n*p-t*d*p)*T,e[10]=(o*g*s-_*a*s+_*n*c-t*g*c-o*n*p+t*a*p)*T,e[11]=(h*a*s-o*d*s-h*n*c+t*d*c+o*n*f-t*a*f)*T,e[12]=R*T,e[13]=(h*g*i-_*d*i+_*n*u-t*g*u-h*n*m+t*d*m)*T,e[14]=(_*a*i-o*g*i-_*n*l+t*g*l+o*n*m-t*a*m)*T,e[15]=(o*d*i-h*a*i+h*n*l-t*d*l-o*n*u+t*a*u)*T,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,h=o+o,d=a+a,u=s*c,f=s*h,_=s*d,g=o*h,m=o*d,p=a*d,b=l*c,E=l*h,y=l*d,R=n.x,P=n.y,T=n.z;return i[0]=(1-(g+p))*R,i[1]=(f+y)*R,i[2]=(_-E)*R,i[3]=0,i[4]=(f-y)*P,i[5]=(1-(u+p))*P,i[6]=(m+b)*P,i[7]=0,i[8]=(_+E)*T,i[9]=(m-b)*T,i[10]=(1-(u+g))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=fi.set(i[0],i[1],i[2]).length();const o=fi.set(i[4],i[5],i[6]).length(),a=fi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],tn.copy(this);const c=1/s,h=1/o,d=1/a;return tn.elements[0]*=c,tn.elements[1]*=c,tn.elements[2]*=c,tn.elements[4]*=h,tn.elements[5]*=h,tn.elements[6]*=h,tn.elements[8]*=d,tn.elements[9]*=d,tn.elements[10]*=d,t.setFromRotationMatrix(tn),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=wn){const l=this.elements,c=2*s/(t-e),h=2*s/(n-i),d=(t+e)/(t-e),u=(n+i)/(n-i);let f,_;if(a===wn)f=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===pr)f=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=wn){const l=this.elements,c=1/(t-e),h=1/(n-i),d=1/(o-s),u=(t+e)*c,f=(n+i)*h;let _,g;if(a===wn)_=(o+s)*d,g=-2*d;else if(a===pr)_=s*d,g=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const fi=new I,tn=new Le,bd=new I(0,0,0),Sd=new I(1,1,1),Fn=new I,ws=new I,Gt=new I,Wa=new Le,$a=new $t;class dn{constructor(e=0,t=0,n=0,i=dn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Oe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Oe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Oe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Oe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Oe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Oe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Wa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Wa,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return $a.setFromEuler(this),this.setFromQuaternion($a,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}dn.DEFAULT_ORDER="XYZ";class ua{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Md=0;const Xa=new I,mi=new $t,_n=new Le,Ts=new I,Zi=new I,Ed=new I,wd=new $t,qa=new I(1,0,0),ja=new I(0,1,0),Ya=new I(0,0,1),Ka={type:"added"},Td={type:"removed"},gi={type:"childadded",child:null},Ir={type:"childremoved",child:null};class ct extends Gn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Md++}),this.uuid=on(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ct.DEFAULT_UP.clone();const e=new I,t=new dn,n=new $t,i=new I(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Le},normalMatrix:{value:new De}}),this.matrix=new Le,this.matrixWorld=new Le,this.matrixAutoUpdate=ct.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ua,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return mi.setFromAxisAngle(e,t),this.quaternion.multiply(mi),this}rotateOnWorldAxis(e,t){return mi.setFromAxisAngle(e,t),this.quaternion.premultiply(mi),this}rotateX(e){return this.rotateOnAxis(qa,e)}rotateY(e){return this.rotateOnAxis(ja,e)}rotateZ(e){return this.rotateOnAxis(Ya,e)}translateOnAxis(e,t){return Xa.copy(e).applyQuaternion(this.quaternion),this.position.add(Xa.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(qa,e)}translateY(e){return this.translateOnAxis(ja,e)}translateZ(e){return this.translateOnAxis(Ya,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_n.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ts.copy(e):Ts.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Zi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_n.lookAt(Zi,Ts,this.up):_n.lookAt(Ts,Zi,this.up),this.quaternion.setFromRotationMatrix(_n),i&&(_n.extractRotation(i.matrixWorld),mi.setFromRotationMatrix(_n),this.quaternion.premultiply(mi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ka),gi.child=e,this.dispatchEvent(gi),gi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Td),Ir.child=e,this.dispatchEvent(Ir),Ir.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_n.multiply(e.parent.matrixWorld)),e.applyMatrix4(_n),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ka),gi.child=e,this.dispatchEvent(gi),gi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zi,e,Ed),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zi,wd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),f=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}ct.DEFAULT_UP=new I(0,1,0);ct.DEFAULT_MATRIX_AUTO_UPDATE=!0;ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const nn=new I,yn=new I,Dr=new I,xn=new I,_i=new I,yi=new I,Za=new I,Fr=new I,Ur=new I,Nr=new I,Or=new je,Br=new je,kr=new je;class rn{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),nn.subVectors(e,t),i.cross(nn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){nn.subVectors(i,t),yn.subVectors(n,t),Dr.subVectors(e,t);const o=nn.dot(nn),a=nn.dot(yn),l=nn.dot(Dr),c=yn.dot(yn),h=yn.dot(Dr),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const u=1/d,f=(c*l-a*h)*u,_=(o*h-a*l)*u;return s.set(1-f-_,_,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,xn)===null?!1:xn.x>=0&&xn.y>=0&&xn.x+xn.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,xn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,xn.x),l.addScaledVector(o,xn.y),l.addScaledVector(a,xn.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return Or.setScalar(0),Br.setScalar(0),kr.setScalar(0),Or.fromBufferAttribute(e,t),Br.fromBufferAttribute(e,n),kr.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Or,s.x),o.addScaledVector(Br,s.y),o.addScaledVector(kr,s.z),o}static isFrontFacing(e,t,n,i){return nn.subVectors(n,t),yn.subVectors(e,t),nn.cross(yn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return nn.subVectors(this.c,this.b),yn.subVectors(this.a,this.b),nn.cross(yn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return rn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return rn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return rn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return rn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return rn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;_i.subVectors(i,n),yi.subVectors(s,n),Fr.subVectors(e,n);const l=_i.dot(Fr),c=yi.dot(Fr);if(l<=0&&c<=0)return t.copy(n);Ur.subVectors(e,i);const h=_i.dot(Ur),d=yi.dot(Ur);if(h>=0&&d<=h)return t.copy(i);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(_i,o);Nr.subVectors(e,s);const f=_i.dot(Nr),_=yi.dot(Nr);if(_>=0&&f<=_)return t.copy(s);const g=f*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(n).addScaledVector(yi,a);const m=h*_-f*d;if(m<=0&&d-h>=0&&f-_>=0)return Za.subVectors(s,i),a=(d-h)/(d-h+(f-_)),t.copy(i).addScaledVector(Za,a);const p=1/(m+g+u);return o=g*p,a=u*p,t.copy(n).addScaledVector(_i,o).addScaledVector(yi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Cc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Un={h:0,s:0,l:0},As={h:0,s:0,l:0};function zr(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class ge{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,We.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=We.workingColorSpace){return this.r=e,this.g=t,this.b=n,We.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=We.workingColorSpace){if(e=ha(e,1),t=Oe(t,0,1),n=Oe(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=zr(o,s,e+1/3),this.g=zr(o,s,e),this.b=zr(o,s,e-1/3)}return We.toWorkingColorSpace(this,i),this}setStyle(e,t=mt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=mt){const n=Cc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Cn(e.r),this.g=Cn(e.g),this.b=Cn(e.b),this}copyLinearToSRGB(e){return this.r=Pi(e.r),this.g=Pi(e.g),this.b=Pi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=mt){return We.fromWorkingColorSpace(Tt.copy(this),e),Math.round(Oe(Tt.r*255,0,255))*65536+Math.round(Oe(Tt.g*255,0,255))*256+Math.round(Oe(Tt.b*255,0,255))}getHexString(e=mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=We.workingColorSpace){We.fromWorkingColorSpace(Tt.copy(this),t);const n=Tt.r,i=Tt.g,s=Tt.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=We.workingColorSpace){return We.fromWorkingColorSpace(Tt.copy(this),t),e.r=Tt.r,e.g=Tt.g,e.b=Tt.b,e}getStyle(e=mt){We.fromWorkingColorSpace(Tt.copy(this),e);const t=Tt.r,n=Tt.g,i=Tt.b;return e!==mt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Un),this.setHSL(Un.h+e,Un.s+t,Un.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Un),e.getHSL(As);const n=as(Un.h,As.h,t),i=as(Un.s,As.s,t),s=as(Un.l,As.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Tt=new ge;ge.NAMES=Cc;let Ad=0;class an extends Gn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ad++}),this.uuid=on(),this.name="",this.type="Material",this.blending=bt,this.side=At,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=lo,this.blendDst=co,this.blendEquation=ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ge(0,0,0),this.blendAlpha=0,this.depthFunc=Di,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Oa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ci,this.stencilZFail=ci,this.stencilZPass=ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==bt&&(n.blending=this.blending),this.side!==At&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==lo&&(n.blendSrc=this.blendSrc),this.blendDst!==co&&(n.blendDst=this.blendDst),this.blendEquation!==ti&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Di&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Oa&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ci&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ci&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ci&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ii extends an{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.combine=cc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Mn=Cd();function Cd(){const r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const s=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:o,offsetTable:a}}function Rd(r){Math.abs(r)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),r=Oe(r,-65504,65504),Mn.floatView[0]=r;const e=Mn.uint32View[0],t=e>>23&511;return Mn.baseTable[t]+((e&8388607)>>Mn.shiftTable[t])}function Pd(r){const e=r>>10;return Mn.uint32View[0]=Mn.mantissaTable[Mn.offsetTable[e]+(r&1023)]+Mn.exponentTable[e],Mn.floatView[0]}class Cs{static toHalfFloat(e){return Rd(e)}static fromHalfFloat(e){return Pd(e)}}const pt=new I,Rs=new Te;let Ld=0;class St{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ld++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Xo,this.updateRanges=[],this.gpuType=zt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Rs.fromBufferAttribute(this,t),Rs.applyMatrix3(e),this.setXY(t,Rs.x,Rs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix3(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix4(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyNormalMatrix(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.transformDirection(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=sn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Je(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=sn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=sn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=sn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=sn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array),s=Je(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Xo&&(e.usage=this.usage),e}}class Rc extends St{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Pc extends St{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Rt extends St{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Id=0;const jt=new Le,Hr=new ct,xi=new I,Wt=new Pn,Qi=new Pn,xt=new I;class Ot extends Gn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Id++}),this.uuid=on(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Tc(e)?Pc:Rc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new De().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return jt.makeRotationFromQuaternion(e),this.applyMatrix4(jt),this}rotateX(e){return jt.makeRotationX(e),this.applyMatrix4(jt),this}rotateY(e){return jt.makeRotationY(e),this.applyMatrix4(jt),this}rotateZ(e){return jt.makeRotationZ(e),this.applyMatrix4(jt),this}translate(e,t,n){return jt.makeTranslation(e,t,n),this.applyMatrix4(jt),this}scale(e,t,n){return jt.makeScale(e,t,n),this.applyMatrix4(jt),this}lookAt(e){return Hr.lookAt(e),Hr.updateMatrix(),this.applyMatrix4(Hr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xi).negate(),this.translate(xi.x,xi.y,xi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Rt(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Wt.setFromBufferAttribute(s),this.morphTargetsRelative?(xt.addVectors(this.boundingBox.min,Wt.min),this.boundingBox.expandByPoint(xt),xt.addVectors(this.boundingBox.max,Wt.max),this.boundingBox.expandByPoint(xt)):(this.boundingBox.expandByPoint(Wt.min),this.boundingBox.expandByPoint(Wt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new un);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(Wt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Qi.setFromBufferAttribute(a),this.morphTargetsRelative?(xt.addVectors(Wt.min,Qi.min),Wt.expandByPoint(xt),xt.addVectors(Wt.max,Qi.max),Wt.expandByPoint(xt)):(Wt.expandByPoint(Qi.min),Wt.expandByPoint(Qi.max))}Wt.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)xt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(xt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)xt.fromBufferAttribute(a,c),l&&(xi.fromBufferAttribute(e,c),xt.add(xi)),i=Math.max(i,n.distanceToSquared(xt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new St(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let A=0;A<n.count;A++)a[A]=new I,l[A]=new I;const c=new I,h=new I,d=new I,u=new Te,f=new Te,_=new Te,g=new I,m=new I;function p(A,M,x){c.fromBufferAttribute(n,A),h.fromBufferAttribute(n,M),d.fromBufferAttribute(n,x),u.fromBufferAttribute(s,A),f.fromBufferAttribute(s,M),_.fromBufferAttribute(s,x),h.sub(c),d.sub(c),f.sub(u),_.sub(u);const C=1/(f.x*_.y-_.x*f.y);isFinite(C)&&(g.copy(h).multiplyScalar(_.y).addScaledVector(d,-f.y).multiplyScalar(C),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-_.x).multiplyScalar(C),a[A].add(g),a[M].add(g),a[x].add(g),l[A].add(m),l[M].add(m),l[x].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let A=0,M=b.length;A<M;++A){const x=b[A],C=x.start,k=x.count;for(let N=C,H=C+k;N<H;N+=3)p(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const E=new I,y=new I,R=new I,P=new I;function T(A){R.fromBufferAttribute(i,A),P.copy(R);const M=a[A];E.copy(M),E.sub(R.multiplyScalar(R.dot(M))).normalize(),y.crossVectors(P,M);const C=y.dot(l[A])<0?-1:1;o.setXYZW(A,E.x,E.y,E.z,C)}for(let A=0,M=b.length;A<M;++A){const x=b[A],C=x.start,k=x.count;for(let N=C,H=C+k;N<H;N+=3)T(e.getX(N+0)),T(e.getX(N+1)),T(e.getX(N+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new St(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new I,s=new I,o=new I,a=new I,l=new I,c=new I,h=new I,d=new I;if(e)for(let u=0,f=e.count;u<f;u+=3){const _=e.getX(u+0),g=e.getX(u+1),m=e.getX(u+2);i.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),h.subVectors(o,s),d.subVectors(i,s),h.cross(d),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)i.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,s),d.subVectors(i,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)xt.fromBufferAttribute(e,t),xt.normalize(),e.setXYZ(t,xt.x,xt.y,xt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h);let f=0,_=0;for(let g=0,m=l.length;g<m;g++){a.isInterleavedBufferAttribute?f=l[g]*a.data.stride+a.offset:f=l[g]*h;for(let p=0;p<h;p++)u[_++]=c[f++]}return new St(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ot,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],d=s[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Qa=new Le,jn=new Wi,Ps=new un,Ja=new I,Ls=new I,Is=new I,Ds=new I,Vr=new I,Fs=new I,el=new I,Us=new I;class Ht extends ct{constructor(e=new Ot,t=new ii){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Fs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],d=s[l];h!==0&&(Vr.fromBufferAttribute(d,e),o?Fs.addScaledVector(Vr,h):Fs.addScaledVector(Vr.sub(t),h))}t.add(Fs)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ps.copy(n.boundingSphere),Ps.applyMatrix4(s),jn.copy(e.ray).recast(e.near),!(Ps.containsPoint(jn.origin)===!1&&(jn.intersectSphere(Ps,Ja)===null||jn.origin.distanceToSquared(Ja)>(e.far-e.near)**2))&&(Qa.copy(s).invert(),jn.copy(e.ray).applyMatrix4(Qa),!(n.boundingBox!==null&&jn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,jn)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=u.length;_<g;_++){const m=u[_],p=o[m.materialIndex],b=Math.max(m.start,f.start),E=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let y=b,R=E;y<R;y+=3){const P=a.getX(y),T=a.getX(y+1),A=a.getX(y+2);i=Ns(this,p,e,n,c,h,d,P,T,A),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,f.start),g=Math.min(a.count,f.start+f.count);for(let m=_,p=g;m<p;m+=3){const b=a.getX(m),E=a.getX(m+1),y=a.getX(m+2);i=Ns(this,o,e,n,c,h,d,b,E,y),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=u.length;_<g;_++){const m=u[_],p=o[m.materialIndex],b=Math.max(m.start,f.start),E=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let y=b,R=E;y<R;y+=3){const P=y,T=y+1,A=y+2;i=Ns(this,p,e,n,c,h,d,P,T,A),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let m=_,p=g;m<p;m+=3){const b=m,E=m+1,y=m+2;i=Ns(this,o,e,n,c,h,d,b,E,y),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Dd(r,e,t,n,i,s,o,a){let l;if(e.side===Ct?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===At,a),l===null)return null;Us.copy(a),Us.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Us);return c<t.near||c>t.far?null:{distance:c,point:Us.clone(),object:r}}function Ns(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,Ls),r.getVertexPosition(l,Is),r.getVertexPosition(c,Ds);const h=Dd(r,e,t,n,Ls,Is,Ds,el);if(h){const d=new I;rn.getBarycoord(el,Ls,Is,Ds,d),i&&(h.uv=rn.getInterpolatedAttribute(i,a,l,c,d,new Te)),s&&(h.uv1=rn.getInterpolatedAttribute(s,a,l,c,d,new Te)),o&&(h.normal=rn.getInterpolatedAttribute(o,a,l,c,d,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new I,materialIndex:0};rn.getNormal(Ls,Is,Ds,u.normal),h.face=u,h.barycoord=d}return h}class ms extends Ot{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],d=[];let u=0,f=0;_("z","y","x",-1,-1,n,t,e,o,s,0),_("z","y","x",1,-1,n,t,-e,o,s,1),_("x","z","y",1,1,e,n,t,i,o,2),_("x","z","y",1,-1,e,n,-t,i,o,3),_("x","y","z",1,-1,e,t,n,i,s,4),_("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Rt(c,3)),this.setAttribute("normal",new Rt(h,3)),this.setAttribute("uv",new Rt(d,2));function _(g,m,p,b,E,y,R,P,T,A,M){const x=y/T,C=R/A,k=y/2,N=R/2,H=P/2,$=T+1,V=A+1;let j=0,G=0;const te=new I;for(let ne=0;ne<V;ne++){const _e=ne*C-N;for(let Ee=0;Ee<$;Ee++){const Fe=Ee*x-k;te[g]=Fe*b,te[m]=_e*E,te[p]=H,c.push(te.x,te.y,te.z),te[g]=0,te[m]=0,te[p]=P>0?1:-1,h.push(te.x,te.y,te.z),d.push(Ee/T),d.push(1-ne/A),j+=1}}for(let ne=0;ne<A;ne++)for(let _e=0;_e<T;_e++){const Ee=u+_e+$*ne,Fe=u+_e+$*(ne+1),X=u+(_e+1)+$*(ne+1),ee=u+(_e+1)+$*ne;l.push(Ee,Fe,ee),l.push(Fe,X,ee),G+=6}a.addGroup(f,G,M),f+=G,u+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ms(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function zi(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Dt(r){const e={};for(let t=0;t<r.length;t++){const n=zi(r[t]);for(const i in n)e[i]=n[i]}return e}function Fd(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Lc(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:We.workingColorSpace}const Ud={clone:zi,merge:Dt};var Nd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Od=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vn extends an{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nd,this.fragmentShader=Od,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zi(e.uniforms),this.uniformsGroups=Fd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Ic extends ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Le,this.projectionMatrix=new Le,this.projectionMatrixInverse=new Le,this.coordinateSystem=wn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Nn=new I,tl=new Te,nl=new Te;class Ft extends Ic{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ki*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(os*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ki*2*Math.atan(Math.tan(os*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Nn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Nn.x,Nn.y).multiplyScalar(-e/Nn.z),Nn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Nn.x,Nn.y).multiplyScalar(-e/Nn.z)}getViewSize(e,t){return this.getViewBounds(e,tl,nl),t.subVectors(nl,tl)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(os*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const vi=-90,bi=1;class Bd extends ct{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ft(vi,bi,e,t);i.layers=this.layers,this.add(i);const s=new Ft(vi,bi,e,t);s.layers=this.layers,this.add(s);const o=new Ft(vi,bi,e,t);o.layers=this.layers,this.add(o);const a=new Ft(vi,bi,e,t);a.layers=this.layers,this.add(a);const l=new Ft(vi,bi,e,t);l.layers=this.layers,this.add(l);const c=new Ft(vi,bi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===wn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===pr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Dc extends gt{constructor(e,t,n,i,s,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Fi,super(e,t,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class kd extends oi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Dc(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:lt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ms(5,5,5),s=new Vn({name:"CubemapFromEquirect",uniforms:zi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ct,blending:zn});s.uniforms.tEquirect.value=t;const o=new Ht(i,s),a=t.minFilter;return t.minFilter===cn&&(t.minFilter=lt),new Bd(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}class si extends ct{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zd={type:"move"};class Gr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new si,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new si,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new si,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,_=.005;c.inputState.pinching&&u>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(zd)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new si;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Hd extends ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new dn,this.environmentIntensity=1,this.environmentRotation=new dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Vd{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Xo,this.updateRanges=[],this.version=0,this.uuid=on()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=on()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=on()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const It=new I;class pa{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=sn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Je(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=sn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=sn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=sn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=sn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array),s=Je(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new St(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new pa(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const il=new I,sl=new je,rl=new je,Gd=new I,ol=new Le,Os=new I,Wr=new un,al=new Le,$r=new Wi;class Wd extends Ht{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Na,this.bindMatrix=new Le,this.bindMatrixInverse=new Le,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Pn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Os),this.boundingBox.expandByPoint(Os)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new un),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Os),this.boundingSphere.expandByPoint(Os)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Wr.copy(this.boundingSphere),Wr.applyMatrix4(i),e.ray.intersectsSphere(Wr)!==!1&&(al.copy(i).invert(),$r.copy(e.ray).applyMatrix4(al),!(this.boundingBox!==null&&$r.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,$r)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new je,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Na?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Ih?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;sl.fromBufferAttribute(i.attributes.skinIndex,e),rl.fromBufferAttribute(i.attributes.skinWeight,e),il.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=rl.getComponent(s);if(o!==0){const a=sl.getComponent(s);ol.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Gd.copy(il).applyMatrix4(ol),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Fc extends ct{constructor(){super(),this.isBone=!0,this.type="Bone"}}class fa extends gt{constructor(e=null,t=1,n=1,i,s,o,a,l,c=Nt,h=Nt,d,u){super(null,o,a,l,c,h,i,s,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ll=new Le,$d=new Le;class ma{constructor(e=[],t=[]){this.uuid=on(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Le)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Le;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:$d;ll.multiplyMatrices(a,t[s]),ll.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new ma(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new fa(t,e,e,Zt,zt);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new Fc),this.bones.push(o),this.boneInverses.push(new Le().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class qo extends St{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Si=new Le,cl=new Le,Bs=[],hl=new Pn,Xd=new Le,Ji=new Ht,es=new un;class qd extends Ht{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new qo(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Xd)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Pn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Si),hl.copy(e.boundingBox).applyMatrix4(Si),this.boundingBox.union(hl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new un),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Si),es.copy(e.boundingSphere).applyMatrix4(Si),this.boundingSphere.union(es)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Ji.geometry=this.geometry,Ji.material=this.material,Ji.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),es.copy(this.boundingSphere),es.applyMatrix4(n),e.ray.intersectsSphere(es)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Si),cl.multiplyMatrices(n,Si),Ji.matrixWorld=cl,Ji.raycast(e,Bs);for(let o=0,a=Bs.length;o<a;o++){const l=Bs[o];l.instanceId=s,l.object=this,t.push(l)}Bs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new qo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new fa(new Float32Array(i*this.count),i,this.count,ra,zt));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Xr=new I,jd=new I,Yd=new De;class Bn{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Xr.subVectors(n,t).cross(jd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Xr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Yd.getNormalMatrix(e),i=this.coplanarPoint(Xr).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Yn=new un,ks=new I;class ga{constructor(e=new Bn,t=new Bn,n=new Bn,i=new Bn,s=new Bn,o=new Bn){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=wn){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],d=i[6],u=i[7],f=i[8],_=i[9],g=i[10],m=i[11],p=i[12],b=i[13],E=i[14],y=i[15];if(n[0].setComponents(l-s,u-c,m-f,y-p).normalize(),n[1].setComponents(l+s,u+c,m+f,y+p).normalize(),n[2].setComponents(l+o,u+h,m+_,y+b).normalize(),n[3].setComponents(l-o,u-h,m-_,y-b).normalize(),n[4].setComponents(l-a,u-d,m-g,y-E).normalize(),t===wn)n[5].setComponents(l+a,u+d,m+g,y+E).normalize();else if(t===pr)n[5].setComponents(a,d,g,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Yn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Yn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Yn)}intersectsSprite(e){return Yn.center.set(0,0,0),Yn.radius=.7071067811865476,Yn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Yn)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(ks.x=i.normal.x>0?e.max.x:e.min.x,ks.y=i.normal.y>0?e.max.y:e.min.y,ks.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(ks)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class _r extends an{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ge(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const fr=new I,mr=new I,dl=new Le,ts=new Wi,zs=new un,qr=new I,ul=new I;class ps extends ct{constructor(e=new Ot,t=new _r){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)fr.fromBufferAttribute(t,i-1),mr.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=fr.distanceTo(mr);e.setAttribute("lineDistance",new Rt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zs.copy(n.boundingSphere),zs.applyMatrix4(i),zs.radius+=s,e.ray.intersectsSphere(zs)===!1)return;dl.copy(i).invert(),ts.copy(e.ray).applyMatrix4(dl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),_=Math.min(h.count,o.start+o.count);for(let g=f,m=_-1;g<m;g+=c){const p=h.getX(g),b=h.getX(g+1),E=Hs(this,e,ts,l,p,b,g);E&&t.push(E)}if(this.isLineLoop){const g=h.getX(_-1),m=h.getX(f),p=Hs(this,e,ts,l,g,m,_-1);p&&t.push(p)}}else{const f=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let g=f,m=_-1;g<m;g+=c){const p=Hs(this,e,ts,l,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){const g=Hs(this,e,ts,l,_-1,f,_-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Hs(r,e,t,n,i,s,o){const a=r.geometry.attributes.position;if(fr.fromBufferAttribute(a,i),mr.fromBufferAttribute(a,s),t.distanceSqToSegment(fr,mr,qr,ul)>n)return;qr.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(qr);if(!(c<e.near||c>e.far))return{distance:c,point:ul.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const pl=new I,fl=new I;class Uc extends ps{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)pl.fromBufferAttribute(t,i),fl.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+pl.distanceTo(fl);e.setAttribute("lineDistance",new Rt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Kd extends ps{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class _a extends an{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ge(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ml=new Le,jo=new Wi,Vs=new un,Gs=new I;class Nc extends ct{constructor(e=new Ot,t=new _a){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere),Vs.applyMatrix4(i),Vs.radius+=s,e.ray.intersectsSphere(Vs)===!1)return;ml.copy(i).invert(),jo.copy(e.ray).applyMatrix4(ml);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let _=u,g=f;_<g;_++){const m=c.getX(_);Gs.fromBufferAttribute(d,m),gl(Gs,m,l,i,e,t,this)}}else{const u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let _=u,g=f;_<g;_++)Gs.fromBufferAttribute(d,_),gl(Gs,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function gl(r,e,t,n,i,s,o){const a=jo.distanceSqToPoint(r);if(a<t){const l=new I;jo.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class ya extends gt{constructor(e,t,n,i,s,o,a,l,c){super(e,t,n,i,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Oc extends gt{constructor(e,t,n,i,s,o,a,l,c,h=Ri){if(h!==Ri&&h!==Bi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ri&&(n=ri),n===void 0&&h===Bi&&(n=Oi),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Nt,this.minFilter=l!==void 0?l:Nt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new da(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class xa extends Ot{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new I,h=new Te;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){const f=n+d/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[u]/e+1)/2,h.y=(o[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new Rt(o,3)),this.setAttribute("normal",new Rt(a,3)),this.setAttribute("uv",new Rt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xa(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class gs extends Ot{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,d=e/a,u=t/l,f=[],_=[],g=[],m=[];for(let p=0;p<h;p++){const b=p*u-o;for(let E=0;E<c;E++){const y=E*d-s;_.push(y,-b,0),g.push(0,0,1),m.push(E/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){const E=b+c*p,y=b+c*(p+1),R=b+1+c*(p+1),P=b+1+c*p;f.push(E,y,P),f.push(y,R,P)}this.setIndex(f),this.setAttribute("position",new Rt(_,3)),this.setAttribute("normal",new Rt(g,3)),this.setAttribute("uv",new Rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gs(e.width,e.height,e.widthSegments,e.heightSegments)}}class Zd extends an{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new ge(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class yr extends an{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mc,this.normalScale=new Te(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ut extends yr{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Te(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Oe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ge(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ge(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ge(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Qd extends an{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Jd extends an{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Ws(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function eu(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function tu(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function _l(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function Bc(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class _s{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class nu extends _s{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ti,endingEnd:Ti}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ai:s=e,a=2*t-n;break;case dr:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ai:o=e,l=2*n-t;break;case dr:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,_=(n-t)/(i-t),g=_*_,m=g*_,p=-u*m+2*u*g-u*_,b=(1+u)*m+(-1.5-2*u)*g+(-.5+u)*_+1,E=(-1-f)*m+(1.5+f)*g+.5*_,y=f*m-f*g;for(let R=0;R!==a;++R)s[R]=p*o[h+R]+b*o[c+R]+E*o[l+R]+y*o[d+R];return s}}class kc extends _s{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),d=1-h;for(let u=0;u!==a;++u)s[u]=o[c+u]*d+o[l+u]*h;return s}}class iu extends _s{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class pn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ws(t,this.TimeBufferType),this.values=Ws(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ws(e.times,Array),values:Ws(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new iu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new kc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new nu(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case hs:t=this.InterpolantFactoryMethodDiscrete;break;case ds:t=this.InterpolantFactoryMethodLinear;break;case Mr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return hs;case this.InterpolantFactoryMethodLinear:return ds;case this.InterpolantFactoryMethodSmooth:return Mr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&eu(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Mr,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const d=a*n,u=d-n,f=d+n;for(let _=0;_!==n;++_){const g=t[d+_];if(g!==t[u+_]||g!==t[f+_]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const d=a*n,u=o*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}pn.prototype.TimeBufferType=Float32Array;pn.prototype.ValueBufferType=Float32Array;pn.prototype.DefaultInterpolation=ds;class $i extends pn{constructor(e,t,n){super(e,t,n)}}$i.prototype.ValueTypeName="bool";$i.prototype.ValueBufferType=Array;$i.prototype.DefaultInterpolation=hs;$i.prototype.InterpolantFactoryMethodLinear=void 0;$i.prototype.InterpolantFactoryMethodSmooth=void 0;class zc extends pn{}zc.prototype.ValueTypeName="color";class Hi extends pn{}Hi.prototype.ValueTypeName="number";class su extends _s{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)$t.slerpFlat(s,0,o,c-a,o,c,l);return s}}class Vi extends pn{InterpolantFactoryMethodLinear(e){return new su(this.times,this.values,this.getValueSize(),e)}}Vi.prototype.ValueTypeName="quaternion";Vi.prototype.InterpolantFactoryMethodSmooth=void 0;class Xi extends pn{constructor(e,t,n){super(e,t,n)}}Xi.prototype.ValueTypeName="string";Xi.prototype.ValueBufferType=Array;Xi.prototype.DefaultInterpolation=hs;Xi.prototype.InterpolantFactoryMethodLinear=void 0;Xi.prototype.InterpolantFactoryMethodSmooth=void 0;class Gi extends pn{}Gi.prototype.ValueTypeName="vector";class Yo{constructor(e="",t=-1,n=[],i=ca){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=on(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(ou(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(pn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const h=tu(l);l=_l(l,1,h),c=_l(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new Hi(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(s);if(h&&h.length>1){const d=h[1];let u=i[d];u||(i[d]=u=[]),u.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,u,f,_,g){if(f.length!==0){const m=[],p=[];Bc(f,m,p,_),m.length!==0&&g.push(new d(u,m,p))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const u=c[d].keys;if(!(!u||u.length===0))if(u[0].morphTargets){const f={};let _;for(_=0;_<u.length;_++)if(u[_].morphTargets)for(let g=0;g<u[_].morphTargets.length;g++)f[u[_].morphTargets[g]]=-1;for(const g in f){const m=[],p=[];for(let b=0;b!==u[_].morphTargets.length;++b){const E=u[_];m.push(E.time),p.push(E.morphTarget===g?1:0)}i.push(new Hi(".morphTargetInfluence["+g+"]",m,p))}l=f.length*o}else{const f=".bones["+t[d].name+"]";n(Gi,f+".position",u,"pos",i),n(Vi,f+".quaternion",u,"rot",i),n(Gi,f+".scale",u,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function ru(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Hi;case"vector":case"vector2":case"vector3":case"vector4":return Gi;case"color":return zc;case"quaternion":return Vi;case"bool":case"boolean":return $i;case"string":return Xi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function ou(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=ru(r.type);if(r.times===void 0){const t=[],n=[];Bc(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Tn={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class au{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){const f=c[d],_=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return _}return null}}}const lu=new au;class ai{constructor(e){this.manager=e!==void 0?e:lu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}ai.DEFAULT_MATERIAL_NAME="__DEFAULT";const vn={};class cu extends Error{constructor(e,t){super(e),this.response=t}}class va extends ai{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Tn.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(vn[e]!==void 0){vn[e].push({onLoad:t,onProgress:n,onError:i});return}vn[e]=[],vn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=vn[e],d=c.body.getReader(),u=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=u?parseInt(u):0,_=f!==0;let g=0;const m=new ReadableStream({start(p){b();function b(){d.read().then(({done:E,value:y})=>{if(E)p.close();else{g+=y.byteLength;const R=new ProgressEvent("progress",{lengthComputable:_,loaded:g,total:f});for(let P=0,T=h.length;P<T;P++){const A=h[P];A.onProgress&&A.onProgress(R)}p.enqueue(y),b()}},E=>{p.error(E)})}}});return new Response(m)}else throw new cu(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(_=>f.decode(_))}}}).then(c=>{Tn.add(e,c);const h=vn[e];delete vn[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=vn[e];if(h===void 0)throw this.manager.itemError(e),c;delete vn[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class hu extends ai{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Tn.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=us("img");function l(){h(),Tn.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(d){h(),i&&i(d),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class du extends ai{constructor(e){super(e)}load(e,t,n,i){const s=this,o=new fa,a=new va(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(s.withCredentials),a.load(e,function(l){let c;try{c=s.parse(l)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}c.image!==void 0?o.image=c.image:c.data!==void 0&&(o.image.width=c.width,o.image.height=c.height,o.image.data=c.data),o.wrapS=c.wrapS!==void 0?c.wrapS:Kt,o.wrapT=c.wrapT!==void 0?c.wrapT:Kt,o.magFilter=c.magFilter!==void 0?c.magFilter:lt,o.minFilter=c.minFilter!==void 0?c.minFilter:lt,o.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(o.colorSpace=c.colorSpace),c.flipY!==void 0&&(o.flipY=c.flipY),c.format!==void 0&&(o.format=c.format),c.type!==void 0&&(o.type=c.type),c.mipmaps!==void 0&&(o.mipmaps=c.mipmaps,o.minFilter=cn),c.mipmapCount===1&&(o.minFilter=lt),c.generateMipmaps!==void 0&&(o.generateMipmaps=c.generateMipmaps),o.needsUpdate=!0,t&&t(o,c)},n,i),o}}class Hc extends ai{constructor(e){super(e)}load(e,t,n,i){const s=new gt,o=new hu(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class xr extends ct{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ge(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const jr=new Le,yl=new I,xl=new I;class ba{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Te(512,512),this.map=null,this.mapPass=null,this.matrix=new Le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ga,this._frameExtents=new Te(1,1),this._viewportCount=1,this._viewports=[new je(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;yl.setFromMatrixPosition(e.matrixWorld),t.position.copy(yl),xl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xl),t.updateMatrixWorld(),jr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(jr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class uu extends ba{constructor(){super(new Ft(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=ki*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class pu extends xr{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ct.DEFAULT_UP),this.updateMatrix(),this.target=new ct,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new uu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const vl=new Le,ns=new I,Yr=new I;class fu extends ba{constructor(){super(new Ft(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Te(4,2),this._viewportCount=6,this._viewports=[new je(2,1,1,1),new je(0,1,1,1),new je(3,1,1,1),new je(1,1,1,1),new je(3,0,1,1),new je(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ns.setFromMatrixPosition(e.matrixWorld),n.position.copy(ns),Yr.copy(n.position),Yr.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Yr),n.updateMatrixWorld(),i.makeTranslation(-ns.x,-ns.y,-ns.z),vl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vl)}}class mu extends xr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new fu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Sa extends Ic{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class gu extends ba{constructor(){super(new Sa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Vc extends xr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ct.DEFAULT_UP),this.updateMatrix(),this.target=new ct,this.shadow=new gu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class _u extends xr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class ls{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class yu extends ai{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Tn.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Tn.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Tn.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});Tn.add(e,l),s.manager.itemStart(e)}}class xu extends Ft{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class vu{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=bl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=bl();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function bl(){return performance.now()}class bu{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,o;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[s+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,o=i;s!==o;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){$t.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const o=this._workIndex*s;$t.multiplyQuaternionsFlat(e,o,e,t,e,n),$t.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,s){const o=1-i;for(let a=0;a!==s;++a){const l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,s){for(let o=0;o!==s;++o){const a=t+o;e[a]=e[a]+e[n+o]*i}}}const Ma="\\[\\]\\.:\\/",Su=new RegExp("["+Ma+"]","g"),Ea="[^"+Ma+"]",Mu="[^"+Ma.replace("\\.","")+"]",Eu=/((?:WC+[\/:])*)/.source.replace("WC",Ea),wu=/(WCOD+)?/.source.replace("WCOD",Mu),Tu=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ea),Au=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ea),Cu=new RegExp("^"+Eu+wu+Tu+Au+"$"),Ru=["material","materials","bones","map"];class Pu{constructor(e,t,n){const i=n||Ze.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Ze{constructor(e,t,n){this.path=t,this.parsedPath=n||Ze.parseTrackName(t),this.node=Ze.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Ze.Composite(e,t,n):new Ze(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Su,"")}static parseTrackName(e){const t=Cu.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Ru.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Ze.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Ze.Composite=Pu;Ze.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ze.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ze.prototype.GetterByBindingType=[Ze.prototype._getValue_direct,Ze.prototype._getValue_array,Ze.prototype._getValue_arrayElement,Ze.prototype._getValue_toArray];Ze.prototype.SetterByBindingTypeAndVersioning=[[Ze.prototype._setValue_direct,Ze.prototype._setValue_direct_setNeedsUpdate,Ze.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ze.prototype._setValue_array,Ze.prototype._setValue_array_setNeedsUpdate,Ze.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ze.prototype._setValue_arrayElement,Ze.prototype._setValue_arrayElement_setNeedsUpdate,Ze.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ze.prototype._setValue_fromArray,Ze.prototype._setValue_fromArray_setNeedsUpdate,Ze.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Lu{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,o=s.length,a=new Array(o),l={endingStart:Ti,endingEnd:Ti};for(let c=0;c!==o;++c){const h=s[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Fh,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,s=e._clip.duration,o=s/i,a=i/s;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Nh:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case ca:default:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const o=n===Uh;if(e===0)return s===-1?i:o&&(s&1)===1?t-i:i;if(n===Dh){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,s+=Math.abs(a);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Ai,i.endingEnd=Ai):(e?i.endingStart=this.zeroSlopeAtStart?Ai:Ti:i.endingStart=dr,t?i.endingEnd=this.zeroSlopeAtEnd?Ai:Ti:i.endingEnd=dr)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=s,l[0]=t,a[1]=s+e,l[1]=n,this}}const Iu=new Float32Array(1);class Du extends Gn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let d=0;d!==s;++d){const u=i[d],f=u.name;let _=h[f];if(_!==void 0)++_.referenceCount,o[d]=_;else{if(_=o[d],_!==void 0){_._cacheIndex===null&&(++_.referenceCount,this._addInactiveBinding(_,l,f));continue}const g=t&&t._propertyBindings[d].binding.parsedPath;_=new bu(Ze.create(n,f,g),u.ValueTypeName,u.getValueSize()),++_.referenceCount,this._addInactiveBinding(_,l,f),o[d]=_}a[d].resultBuffer=_.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,o=this._actionsByClip,a=o[s],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const d=a.actionByRoot,u=(e._localRoot||this._root).uuid;delete d[u],l.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[s],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new kc(new Float32Array(2),new Float32Array(2),1,Iu),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let o=typeof e=="string"?Yo.findByName(i,e):e;const a=o!==null?o.uuid:e,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=ca),l!==void 0){const d=l.actionByRoot[s];if(d!==void 0&&d.blendMode===n)return d;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const h=new Lu(this,o,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,s),h}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?Yo.findByName(n,e):e,o=s?s.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const o=s.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const h=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=h,t[h]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const o in s){const a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const Sl=new Le;class Gc{constructor(e,t,n=0,i=1/0){this.ray=new Wi(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new ua,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Sl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Sl),this}intersectObject(e,t=!0,n=[]){return Ko(e,this,n,t),n.sort(Ml),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)Ko(e[i],this,n,t);return n.sort(Ml),n}}function Ml(r,e){return r.distance-e.distance}function Ko(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let o=0,a=s.length;o<a;o++)Ko(s[o],e,t,!0)}}class El{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Oe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Oe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const wl=new I,$s=new I,Tl=new I;class Fu extends ct{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new Ot;i.setAttribute("position",new Rt([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));const s=new _r({fog:!1,toneMapped:!1});this.lightPlane=new ps(i,s),this.add(this.lightPlane),i=new Ot,i.setAttribute("position",new Rt([0,0,0,0,0,1],3)),this.targetLine=new ps(i,s),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),wl.setFromMatrixPosition(this.light.matrixWorld),$s.setFromMatrixPosition(this.light.target.matrixWorld),Tl.subVectors($s,wl),this.lightPlane.lookAt($s),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt($s),this.targetLine.scale.z=Tl.length()}}class Uu extends Uc{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new Ot;i.setAttribute("position",new Rt(t,3)),i.setAttribute("color",new Rt(n,3));const s=new _r({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(e,t,n){const i=new ge,s=this.geometry.attributes.color.array;return i.set(e),i.toArray(s,0),i.toArray(s,3),i.set(t),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class Nu extends Gn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function Al(r,e,t,n){const i=Ou(n);switch(t){case gc:return r*e;case yc:return r*e;case xc:return r*e*2;case ra:return r*e/i.components*i.byteLength;case oa:return r*e/i.components*i.byteLength;case vc:return r*e*2/i.components*i.byteLength;case aa:return r*e*2/i.components*i.byteLength;case _c:return r*e*3/i.components*i.byteLength;case Zt:return r*e*4/i.components*i.byteLength;case la:return r*e*4/i.components*i.byteLength;case er:case tr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case nr:case ir:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case vo:case So:return Math.max(r,16)*Math.max(e,8)/4;case xo:case bo:return Math.max(r,8)*Math.max(e,8)/2;case Mo:case Eo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case wo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case To:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ao:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Co:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Ro:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Po:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Lo:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Io:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Do:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Fo:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Uo:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case No:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Oo:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Bo:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case ko:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case sr:case zo:case Ho:return Math.ceil(r/4)*Math.ceil(e/4)*16;case bc:case Vo:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Go:case Wo:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ou(r){switch(r){case Rn:case pc:return{byteLength:1,components:1};case cs:case fc:case En:return{byteLength:2,components:1};case ia:case sa:return{byteLength:2,components:4};case ri:case na:case zt:return{byteLength:4,components:1};case mc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ta}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ta);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Wc(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Bu(r){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,d=c.byteLength,u=r.createBuffer();r.bindBuffer(l,u),r.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const h=l.array,d=l.updateRanges;if(r.bindBuffer(c,a),d.length===0)r.bufferSubData(c,0,h);else{d.sort((f,_)=>f.start-_.start);let u=0;for(let f=1;f<d.length;f++){const _=d[u],g=d[f];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++u,d[u]=g)}d.length=u+1;for(let f=0,_=d.length;f<_;f++){const g=d[f];r.bufferSubData(c,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var ku=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zu=`#ifdef USE_ALPHAHASH
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
#endif`,Hu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Vu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Wu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$u=`#ifdef USE_AOMAP
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
#endif`,qu=`#ifdef USE_BATCHING
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
#endif`,ju=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Yu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ku=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Qu=`#ifdef USE_IRIDESCENCE
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
#endif`,Ju=`#ifdef USE_BUMPMAP
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
#endif`,ep=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,tp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,np=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ip=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,sp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,rp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,op=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ap=`#if defined( USE_COLOR_ALPHA )
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
#endif`,lp=`#define PI 3.141592653589793
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
} // validated`,cp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,hp=`vec3 transformedNormal = objectNormal;
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
#endif`,dp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,up=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,mp="gl_FragColor = linearToOutputTexel( gl_FragColor );",gp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_p=`#ifdef USE_ENVMAP
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
#endif`,yp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,xp=`#ifdef USE_ENVMAP
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
#endif`,vp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bp=`#ifdef USE_ENVMAP
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
#endif`,Sp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Mp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ep=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Tp=`#ifdef USE_GRADIENTMAP
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
}`,Ap=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Rp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Pp=`uniform bool receiveShadow;
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
#endif`,Ip=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Dp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Up=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Np=`PhysicalMaterial material;
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
#endif`,Op=`struct PhysicalMaterial {
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
}`,Bp=`
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
#endif`,kp=`#if defined( RE_IndirectDiffuse )
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
#endif`,zp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$p=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,jp=`#if defined( USE_POINTS_UV )
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
#endif`,Yp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Kp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Qp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ef=`#ifdef USE_MORPHTARGETS
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
#endif`,tf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,sf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,rf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,of=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,af=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lf=`#ifdef USE_NORMALMAP
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
#endif`,cf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,hf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,df=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,uf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ff=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,mf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_f=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,bf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Sf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Mf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ef=`float getShadowMask() {
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
}`,wf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Tf=`#ifdef USE_SKINNING
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
#endif`,Af=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Cf=`#ifdef USE_SKINNING
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
#endif`,Rf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Pf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,If=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Df=`#ifdef USE_TRANSMISSION
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
#endif`,Ff=`#ifdef USE_TRANSMISSION
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
#endif`,Uf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Of=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const kf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zf=`uniform sampler2D t2D;
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
}`,Hf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Gf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$f=`#include <common>
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
}`,qf=`#define DISTANCE
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
}`,jf=`#define DISTANCE
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
}`,Yf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Kf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zf=`uniform float scale;
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
}`,Qf=`uniform vec3 diffuse;
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
}`,Jf=`#include <common>
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
}`,em=`uniform vec3 diffuse;
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
}`,tm=`#define LAMBERT
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
}`,nm=`#define LAMBERT
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
}`,im=`#define MATCAP
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
}`,sm=`#define MATCAP
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
}`,rm=`#define NORMAL
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
}`,om=`#define NORMAL
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
}`,am=`#define PHONG
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
}`,lm=`#define PHONG
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
}`,cm=`#define STANDARD
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
}`,hm=`#define STANDARD
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
}`,dm=`#define TOON
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
}`,um=`#define TOON
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
}`,pm=`uniform float size;
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
}`,fm=`uniform vec3 diffuse;
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
}`,mm=`#include <common>
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
}`,gm=`uniform vec3 color;
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
}`,_m=`uniform float rotation;
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
}`,ym=`uniform vec3 diffuse;
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
}`,Ne={alphahash_fragment:ku,alphahash_pars_fragment:zu,alphamap_fragment:Hu,alphamap_pars_fragment:Vu,alphatest_fragment:Gu,alphatest_pars_fragment:Wu,aomap_fragment:$u,aomap_pars_fragment:Xu,batching_pars_vertex:qu,batching_vertex:ju,begin_vertex:Yu,beginnormal_vertex:Ku,bsdfs:Zu,iridescence_fragment:Qu,bumpmap_pars_fragment:Ju,clipping_planes_fragment:ep,clipping_planes_pars_fragment:tp,clipping_planes_pars_vertex:np,clipping_planes_vertex:ip,color_fragment:sp,color_pars_fragment:rp,color_pars_vertex:op,color_vertex:ap,common:lp,cube_uv_reflection_fragment:cp,defaultnormal_vertex:hp,displacementmap_pars_vertex:dp,displacementmap_vertex:up,emissivemap_fragment:pp,emissivemap_pars_fragment:fp,colorspace_fragment:mp,colorspace_pars_fragment:gp,envmap_fragment:_p,envmap_common_pars_fragment:yp,envmap_pars_fragment:xp,envmap_pars_vertex:vp,envmap_physical_pars_fragment:Lp,envmap_vertex:bp,fog_vertex:Sp,fog_pars_vertex:Mp,fog_fragment:Ep,fog_pars_fragment:wp,gradientmap_pars_fragment:Tp,lightmap_pars_fragment:Ap,lights_lambert_fragment:Cp,lights_lambert_pars_fragment:Rp,lights_pars_begin:Pp,lights_toon_fragment:Ip,lights_toon_pars_fragment:Dp,lights_phong_fragment:Fp,lights_phong_pars_fragment:Up,lights_physical_fragment:Np,lights_physical_pars_fragment:Op,lights_fragment_begin:Bp,lights_fragment_maps:kp,lights_fragment_end:zp,logdepthbuf_fragment:Hp,logdepthbuf_pars_fragment:Vp,logdepthbuf_pars_vertex:Gp,logdepthbuf_vertex:Wp,map_fragment:$p,map_pars_fragment:Xp,map_particle_fragment:qp,map_particle_pars_fragment:jp,metalnessmap_fragment:Yp,metalnessmap_pars_fragment:Kp,morphinstance_vertex:Zp,morphcolor_vertex:Qp,morphnormal_vertex:Jp,morphtarget_pars_vertex:ef,morphtarget_vertex:tf,normal_fragment_begin:nf,normal_fragment_maps:sf,normal_pars_fragment:rf,normal_pars_vertex:of,normal_vertex:af,normalmap_pars_fragment:lf,clearcoat_normal_fragment_begin:cf,clearcoat_normal_fragment_maps:hf,clearcoat_pars_fragment:df,iridescence_pars_fragment:uf,opaque_fragment:pf,packing:ff,premultiplied_alpha_fragment:mf,project_vertex:gf,dithering_fragment:_f,dithering_pars_fragment:yf,roughnessmap_fragment:xf,roughnessmap_pars_fragment:vf,shadowmap_pars_fragment:bf,shadowmap_pars_vertex:Sf,shadowmap_vertex:Mf,shadowmask_pars_fragment:Ef,skinbase_vertex:wf,skinning_pars_vertex:Tf,skinning_vertex:Af,skinnormal_vertex:Cf,specularmap_fragment:Rf,specularmap_pars_fragment:Pf,tonemapping_fragment:Lf,tonemapping_pars_fragment:If,transmission_fragment:Df,transmission_pars_fragment:Ff,uv_pars_fragment:Uf,uv_pars_vertex:Nf,uv_vertex:Of,worldpos_vertex:Bf,background_vert:kf,background_frag:zf,backgroundCube_vert:Hf,backgroundCube_frag:Vf,cube_vert:Gf,cube_frag:Wf,depth_vert:$f,depth_frag:Xf,distanceRGBA_vert:qf,distanceRGBA_frag:jf,equirect_vert:Yf,equirect_frag:Kf,linedashed_vert:Zf,linedashed_frag:Qf,meshbasic_vert:Jf,meshbasic_frag:em,meshlambert_vert:tm,meshlambert_frag:nm,meshmatcap_vert:im,meshmatcap_frag:sm,meshnormal_vert:rm,meshnormal_frag:om,meshphong_vert:am,meshphong_frag:lm,meshphysical_vert:cm,meshphysical_frag:hm,meshtoon_vert:dm,meshtoon_frag:um,points_vert:pm,points_frag:fm,shadow_vert:mm,shadow_frag:gm,sprite_vert:_m,sprite_frag:ym},ie={common:{diffuse:{value:new ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new De},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new De}},envmap:{envMap:{value:null},envMapRotation:{value:new De},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new De}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new De}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new De},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new De},normalScale:{value:new Te(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new De},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new De}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new De}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new De}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0},uvTransform:{value:new De}},sprite:{diffuse:{value:new ge(16777215)},opacity:{value:1},center:{value:new Te(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new De},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0}}},ln={basic:{uniforms:Dt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:Dt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new ge(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:Dt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new ge(0)},specular:{value:new ge(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:Dt([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:Dt([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new ge(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:Dt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:Dt([ie.points,ie.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:Dt([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:Dt([ie.common,ie.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:Dt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:Dt([ie.sprite,ie.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new De},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new De}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:Dt([ie.common,ie.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:Dt([ie.lights,ie.fog,{color:{value:new ge(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};ln.physical={uniforms:Dt([ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new De},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new De},clearcoatNormalScale:{value:new Te(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new De},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new De},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new De},sheen:{value:0},sheenColor:{value:new ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new De},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new De},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new De},transmissionSamplerSize:{value:new Te},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new De},attenuationDistance:{value:0},attenuationColor:{value:new ge(0)},specularColor:{value:new ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new De},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new De},anisotropyVector:{value:new Te},anisotropyMap:{value:null},anisotropyMapTransform:{value:new De}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const Xs={r:0,b:0,g:0},Kn=new dn,xm=new Le;function vm(r,e,t,n,i,s,o){const a=new ge(0);let l=s===!0?0:1,c,h,d=null,u=0,f=null;function _(E){let y=E.isScene===!0?E.background:null;return y&&y.isTexture&&(y=(E.backgroundBlurriness>0?t:e).get(y)),y}function g(E){let y=!1;const R=_(E);R===null?p(a,l):R&&R.isColor&&(p(R,1),y=!0);const P=r.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(E,y){const R=_(y);R&&(R.isCubeTexture||R.mapping===gr)?(h===void 0&&(h=new Ht(new ms(1,1,1),new Vn({name:"BackgroundCubeMaterial",uniforms:zi(ln.backgroundCube.uniforms),vertexShader:ln.backgroundCube.vertexShader,fragmentShader:ln.backgroundCube.fragmentShader,side:Ct,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Kn.copy(y.backgroundRotation),Kn.x*=-1,Kn.y*=-1,Kn.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Kn.y*=-1,Kn.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(xm.makeRotationFromEuler(Kn)),h.material.toneMapped=We.getTransfer(R.colorSpace)!==tt,(d!==R||u!==R.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,d=R,u=R.version,f=r.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new Ht(new gs(2,2),new Vn({name:"BackgroundMaterial",uniforms:zi(ln.background.uniforms),vertexShader:ln.background.vertexShader,fragmentShader:ln.background.fragmentShader,side:At,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=We.getTransfer(R.colorSpace)!==tt,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(d!==R||u!==R.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,d=R,u=R.version,f=r.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function p(E,y){E.getRGB(Xs,Lc(r)),n.buffers.color.setClear(Xs.r,Xs.g,Xs.b,y,o)}function b(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,y=1){a.set(E),l=y,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,p(a,l)},render:g,addToRenderList:m,dispose:b}}function bm(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=u(null);let s=i,o=!1;function a(x,C,k,N,H){let $=!1;const V=d(N,k,C);s!==V&&(s=V,c(s.object)),$=f(x,N,k,H),$&&_(x,N,k,H),H!==null&&e.update(H,r.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,y(x,C,k,N),H!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return r.createVertexArray()}function c(x){return r.bindVertexArray(x)}function h(x){return r.deleteVertexArray(x)}function d(x,C,k){const N=k.wireframe===!0;let H=n[x.id];H===void 0&&(H={},n[x.id]=H);let $=H[C.id];$===void 0&&($={},H[C.id]=$);let V=$[N];return V===void 0&&(V=u(l()),$[N]=V),V}function u(x){const C=[],k=[],N=[];for(let H=0;H<t;H++)C[H]=0,k[H]=0,N[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:k,attributeDivisors:N,object:x,attributes:{},index:null}}function f(x,C,k,N){const H=s.attributes,$=C.attributes;let V=0;const j=k.getAttributes();for(const G in j)if(j[G].location>=0){const ne=H[G];let _e=$[G];if(_e===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(_e=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(_e=x.instanceColor)),ne===void 0||ne.attribute!==_e||_e&&ne.data!==_e.data)return!0;V++}return s.attributesNum!==V||s.index!==N}function _(x,C,k,N){const H={},$=C.attributes;let V=0;const j=k.getAttributes();for(const G in j)if(j[G].location>=0){let ne=$[G];ne===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(ne=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(ne=x.instanceColor));const _e={};_e.attribute=ne,ne&&ne.data&&(_e.data=ne.data),H[G]=_e,V++}s.attributes=H,s.attributesNum=V,s.index=N}function g(){const x=s.newAttributes;for(let C=0,k=x.length;C<k;C++)x[C]=0}function m(x){p(x,0)}function p(x,C){const k=s.newAttributes,N=s.enabledAttributes,H=s.attributeDivisors;k[x]=1,N[x]===0&&(r.enableVertexAttribArray(x),N[x]=1),H[x]!==C&&(r.vertexAttribDivisor(x,C),H[x]=C)}function b(){const x=s.newAttributes,C=s.enabledAttributes;for(let k=0,N=C.length;k<N;k++)C[k]!==x[k]&&(r.disableVertexAttribArray(k),C[k]=0)}function E(x,C,k,N,H,$,V){V===!0?r.vertexAttribIPointer(x,C,k,H,$):r.vertexAttribPointer(x,C,k,N,H,$)}function y(x,C,k,N){g();const H=N.attributes,$=k.getAttributes(),V=C.defaultAttributeValues;for(const j in $){const G=$[j];if(G.location>=0){let te=H[j];if(te===void 0&&(j==="instanceMatrix"&&x.instanceMatrix&&(te=x.instanceMatrix),j==="instanceColor"&&x.instanceColor&&(te=x.instanceColor)),te!==void 0){const ne=te.normalized,_e=te.itemSize,Ee=e.get(te);if(Ee===void 0)continue;const Fe=Ee.buffer,X=Ee.type,ee=Ee.bytesPerElement,me=X===r.INT||X===r.UNSIGNED_INT||te.gpuType===na;if(te.isInterleavedBufferAttribute){const se=te.data,Se=se.stride,Ve=te.offset;if(se.isInstancedInterleavedBuffer){for(let we=0;we<G.locationSize;we++)p(G.location+we,se.meshPerAttribute);x.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let we=0;we<G.locationSize;we++)m(G.location+we);r.bindBuffer(r.ARRAY_BUFFER,Fe);for(let we=0;we<G.locationSize;we++)E(G.location+we,_e/G.locationSize,X,ne,Se*ee,(Ve+_e/G.locationSize*we)*ee,me)}else{if(te.isInstancedBufferAttribute){for(let se=0;se<G.locationSize;se++)p(G.location+se,te.meshPerAttribute);x.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let se=0;se<G.locationSize;se++)m(G.location+se);r.bindBuffer(r.ARRAY_BUFFER,Fe);for(let se=0;se<G.locationSize;se++)E(G.location+se,_e/G.locationSize,X,ne,_e*ee,_e/G.locationSize*se*ee,me)}}else if(V!==void 0){const ne=V[j];if(ne!==void 0)switch(ne.length){case 2:r.vertexAttrib2fv(G.location,ne);break;case 3:r.vertexAttrib3fv(G.location,ne);break;case 4:r.vertexAttrib4fv(G.location,ne);break;default:r.vertexAttrib1fv(G.location,ne)}}}}b()}function R(){A();for(const x in n){const C=n[x];for(const k in C){const N=C[k];for(const H in N)h(N[H].object),delete N[H];delete C[k]}delete n[x]}}function P(x){if(n[x.id]===void 0)return;const C=n[x.id];for(const k in C){const N=C[k];for(const H in N)h(N[H].object),delete N[H];delete C[k]}delete n[x.id]}function T(x){for(const C in n){const k=n[C];if(k[x.id]===void 0)continue;const N=k[x.id];for(const H in N)h(N[H].object),delete N[H];delete k[x.id]}}function A(){M(),o=!0,s!==i&&(s=i,c(s.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:A,resetDefaultState:M,dispose:R,releaseStatesOfGeometry:P,releaseStatesOfProgram:T,initAttributes:g,enableAttribute:m,disableUnusedAttributes:b}}function Sm(r,e,t){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,d){d!==0&&(r.drawArraysInstanced(n,c,h,d),t.update(h,n,d))}function a(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let _=0;_<d;_++)f+=h[_];t.update(f,n,1)}function l(c,h,d,u){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<c.length;_++)o(c[_],h[_],u[_]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let _=0;for(let g=0;g<d;g++)_+=h[g]*u[g];t.update(_,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Mm(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(T){return!(T!==Zt&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const A=T===En&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Rn&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==zt&&!A)}function l(T){if(T==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,u=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),b=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),E=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),R=_>0,P=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:E,maxFragmentUniforms:y,vertexTextures:R,maxSamples:P}}function Em(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Bn,a=new De,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const _=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||_===null||_.length===0||s&&!m)s?h(null):c();else{const b=s?0:n,E=b*4;let y=p.clippingState||null;l.value=y,y=h(_,u,E,f);for(let R=0;R!==E;++R)y[R]=t[R];p.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,_){const g=d!==null?d.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=f+g*4,b=u.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,y=f;E!==g;++E,y+=4)o.copy(d[E]).applyMatrix4(b,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function wm(r){let e=new WeakMap;function t(o,a){return a===cr?o.mapping=Fi:a===yo&&(o.mapping=Ui),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===cr||a===yo)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new kd(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const Ci=4,Cl=[.125,.215,.35,.446,.526,.582],ni=20,Kr=new Sa,Rl=new ge;let Zr=null,Qr=0,Jr=0,eo=!1;const ei=(1+Math.sqrt(5))/2,Mi=1/ei,Pl=[new I(-ei,Mi,0),new I(ei,Mi,0),new I(-Mi,0,ei),new I(Mi,0,ei),new I(0,ei,-Mi),new I(0,ei,Mi),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],Tm=new I;class Ll{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:a=Tm}=s;Zr=this._renderer.getRenderTarget(),Qr=this._renderer.getActiveCubeFace(),Jr=this._renderer.getActiveMipmapLevel(),eo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Zr,Qr,Jr),this._renderer.xr.enabled=eo,e.scissorTest=!1,qs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Fi||e.mapping===Ui?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Zr=this._renderer.getRenderTarget(),Qr=this._renderer.getActiveCubeFace(),Jr=this._renderer.getActiveMipmapLevel(),eo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:lt,minFilter:lt,generateMipmaps:!1,type:En,format:Zt,colorSpace:Mt,depthBuffer:!1},i=Il(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Il(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Am(s)),this._blurMaterial=Cm(s,e,t)}return i}_compileMaterial(e){const t=new Ht(this._lodPlanes[0],e);this._renderer.compile(t,Kr)}_sceneToCubeUV(e,t,n,i,s){const l=new Ft(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Rl),d.toneMapping=Hn,d.autoClear=!1;const _=new ii({name:"PMREM.Background",side:Ct,depthWrite:!1,depthTest:!1}),g=new Ht(new ms,_);let m=!1;const p=e.background;p?p.isColor&&(_.color.copy(p),e.background=null,m=!0):(_.color.copy(Rl),m=!0);for(let b=0;b<6;b++){const E=b%3;E===0?(l.up.set(0,c[b],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[b],s.y,s.z)):E===1?(l.up.set(0,0,c[b]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[b],s.z)):(l.up.set(0,c[b],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[b]));const y=this._cubeSize;qs(i,E*y,b>2?y:0,y,y),d.setRenderTarget(i),m&&d.render(g,l),d.render(e,l)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=f,d.autoClear=u,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Fi||e.mapping===Ui;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dl());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new Ht(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;qs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Kr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Pl[(i-s-1)%Pl.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Ht(this._lodPlanes[i],c),u=c.uniforms,f=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*ni-1),g=s/_,m=isFinite(s)?1+Math.floor(h*g):ni;m>ni&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ni}`);const p=[];let b=0;for(let T=0;T<ni;++T){const A=T/g,M=Math.exp(-A*A/2);p.push(M),T===0?b+=M:T<m&&(b+=2*M)}for(let T=0;T<p.length;T++)p[T]=p[T]/b;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:E}=this;u.dTheta.value=_,u.mipInt.value=E-n;const y=this._sizeLods[i],R=3*y*(i>E-Ci?i-E+Ci:0),P=4*(this._cubeSize-y);qs(t,R,P,3*y,2*y),l.setRenderTarget(t),l.render(d,Kr)}}function Am(r){const e=[],t=[],n=[];let i=r;const s=r-Ci+1+Cl.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-Ci?l=Cl[o-r+Ci-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,_=6,g=3,m=2,p=1,b=new Float32Array(g*_*f),E=new Float32Array(m*_*f),y=new Float32Array(p*_*f);for(let P=0;P<f;P++){const T=P%3*2/3-1,A=P>2?0:-1,M=[T,A,0,T+2/3,A,0,T+2/3,A+1,0,T,A,0,T+2/3,A+1,0,T,A+1,0];b.set(M,g*_*P),E.set(u,m*_*P);const x=[P,P,P,P,P,P];y.set(x,p*_*P)}const R=new Ot;R.setAttribute("position",new St(b,g)),R.setAttribute("uv",new St(E,m)),R.setAttribute("faceIndex",new St(y,p)),e.push(R),i>Ci&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Il(r,e,t){const n=new oi(r,e,t);return n.texture.mapping=gr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function qs(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Cm(r,e,t){const n=new Float32Array(ni),i=new I(0,1,0);return new Vn({name:"SphericalGaussianBlur",defines:{n:ni,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:wa(),fragmentShader:`

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
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Dl(){return new Vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wa(),fragmentShader:`

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
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Fl(){return new Vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function wa(){return`

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
	`}function Rm(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===cr||l===yo,h=l===Fi||l===Ui;if(c||h){let d=e.get(a);const u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return t===null&&(t=new Ll(r)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Ll(r)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Pm(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Jn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Lm(r,e,t,n){const i={},s=new WeakMap;function o(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const _ in u.attributes)e.remove(u.attributes[_]);u.removeEventListener("dispose",o),delete i[u.id];const f=s.get(u);f&&(e.remove(f),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const f in u)e.update(u[f],r.ARRAY_BUFFER)}function c(d){const u=[],f=d.index,_=d.attributes.position;let g=0;if(f!==null){const b=f.array;g=f.version;for(let E=0,y=b.length;E<y;E+=3){const R=b[E+0],P=b[E+1],T=b[E+2];u.push(R,P,P,T,T,R)}}else if(_!==void 0){const b=_.array;g=_.version;for(let E=0,y=b.length/3-1;E<y;E+=3){const R=E+0,P=E+1,T=E+2;u.push(R,P,P,T,T,R)}}else return;const m=new(Tc(u)?Pc:Rc)(u,1);m.version=g;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function h(d){const u=s.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function Im(r,e,t){let n;function i(u){n=u}let s,o;function a(u){s=u.type,o=u.bytesPerElement}function l(u,f){r.drawElements(n,f,s,u*o),t.update(f,n,1)}function c(u,f,_){_!==0&&(r.drawElementsInstanced(n,f,s,u*o,_),t.update(f,n,_))}function h(u,f,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,u,0,_);let m=0;for(let p=0;p<_;p++)m+=f[p];t.update(m,n,1)}function d(u,f,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)c(u[p]/o,f[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,s,u,0,g,0,_);let p=0;for(let b=0;b<_;b++)p+=f[b]*g[b];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Dm(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Fm(r,e,t){const n=new WeakMap,i=new je;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==d){let x=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",x)};var f=x;u!==void 0&&u.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let y=0;_===!0&&(y=1),g===!0&&(y=2),m===!0&&(y=3);let R=a.attributes.position.count*y,P=1;R>e.maxTextureSize&&(P=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const T=new Float32Array(R*P*4*d),A=new Ac(T,R,P,d);A.type=zt,A.needsUpdate=!0;const M=y*4;for(let C=0;C<d;C++){const k=p[C],N=b[C],H=E[C],$=R*P*4*C;for(let V=0;V<k.count;V++){const j=V*M;_===!0&&(i.fromBufferAttribute(k,V),T[$+j+0]=i.x,T[$+j+1]=i.y,T[$+j+2]=i.z,T[$+j+3]=0),g===!0&&(i.fromBufferAttribute(N,V),T[$+j+4]=i.x,T[$+j+5]=i.y,T[$+j+6]=i.z,T[$+j+7]=0),m===!0&&(i.fromBufferAttribute(H,V),T[$+j+8]=i.x,T[$+j+9]=i.y,T[$+j+10]=i.z,T[$+j+11]=H.itemSize===4?i.w:1)}}u={count:d,texture:A,size:new Te(R,P)},n.set(a,u),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}return{update:s}}function Um(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,d=e.get(l,h);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const $c=new gt,Ul=new Oc(1,1),Xc=new Ac,qc=new xd,jc=new Dc,Nl=[],Ol=[],Bl=new Float32Array(16),kl=new Float32Array(9),zl=new Float32Array(4);function qi(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Nl[i];if(s===void 0&&(s=new Float32Array(i),Nl[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function _t(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function yt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function vr(r,e){let t=Ol[e];t===void 0&&(t=new Int32Array(e),Ol[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Nm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Om(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;r.uniform2fv(this.addr,e),yt(t,e)}}function Bm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(_t(t,e))return;r.uniform3fv(this.addr,e),yt(t,e)}}function km(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;r.uniform4fv(this.addr,e),yt(t,e)}}function zm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),yt(t,e)}else{if(_t(t,n))return;zl.set(n),r.uniformMatrix2fv(this.addr,!1,zl),yt(t,n)}}function Hm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),yt(t,e)}else{if(_t(t,n))return;kl.set(n),r.uniformMatrix3fv(this.addr,!1,kl),yt(t,n)}}function Vm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),yt(t,e)}else{if(_t(t,n))return;Bl.set(n),r.uniformMatrix4fv(this.addr,!1,Bl),yt(t,n)}}function Gm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Wm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;r.uniform2iv(this.addr,e),yt(t,e)}}function $m(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;r.uniform3iv(this.addr,e),yt(t,e)}}function Xm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;r.uniform4iv(this.addr,e),yt(t,e)}}function qm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function jm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;r.uniform2uiv(this.addr,e),yt(t,e)}}function Ym(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;r.uniform3uiv(this.addr,e),yt(t,e)}}function Km(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;r.uniform4uiv(this.addr,e),yt(t,e)}}function Zm(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Ul.compareFunction=Ec,s=Ul):s=$c,t.setTexture2D(e||s,i)}function Qm(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||qc,i)}function Jm(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||jc,i)}function eg(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Xc,i)}function tg(r){switch(r){case 5126:return Nm;case 35664:return Om;case 35665:return Bm;case 35666:return km;case 35674:return zm;case 35675:return Hm;case 35676:return Vm;case 5124:case 35670:return Gm;case 35667:case 35671:return Wm;case 35668:case 35672:return $m;case 35669:case 35673:return Xm;case 5125:return qm;case 36294:return jm;case 36295:return Ym;case 36296:return Km;case 35678:case 36198:case 36298:case 36306:case 35682:return Zm;case 35679:case 36299:case 36307:return Qm;case 35680:case 36300:case 36308:case 36293:return Jm;case 36289:case 36303:case 36311:case 36292:return eg}}function ng(r,e){r.uniform1fv(this.addr,e)}function ig(r,e){const t=qi(e,this.size,2);r.uniform2fv(this.addr,t)}function sg(r,e){const t=qi(e,this.size,3);r.uniform3fv(this.addr,t)}function rg(r,e){const t=qi(e,this.size,4);r.uniform4fv(this.addr,t)}function og(r,e){const t=qi(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function ag(r,e){const t=qi(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function lg(r,e){const t=qi(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function cg(r,e){r.uniform1iv(this.addr,e)}function hg(r,e){r.uniform2iv(this.addr,e)}function dg(r,e){r.uniform3iv(this.addr,e)}function ug(r,e){r.uniform4iv(this.addr,e)}function pg(r,e){r.uniform1uiv(this.addr,e)}function fg(r,e){r.uniform2uiv(this.addr,e)}function mg(r,e){r.uniform3uiv(this.addr,e)}function gg(r,e){r.uniform4uiv(this.addr,e)}function _g(r,e,t){const n=this.cache,i=e.length,s=vr(t,i);_t(n,s)||(r.uniform1iv(this.addr,s),yt(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||$c,s[o])}function yg(r,e,t){const n=this.cache,i=e.length,s=vr(t,i);_t(n,s)||(r.uniform1iv(this.addr,s),yt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||qc,s[o])}function xg(r,e,t){const n=this.cache,i=e.length,s=vr(t,i);_t(n,s)||(r.uniform1iv(this.addr,s),yt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||jc,s[o])}function vg(r,e,t){const n=this.cache,i=e.length,s=vr(t,i);_t(n,s)||(r.uniform1iv(this.addr,s),yt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Xc,s[o])}function bg(r){switch(r){case 5126:return ng;case 35664:return ig;case 35665:return sg;case 35666:return rg;case 35674:return og;case 35675:return ag;case 35676:return lg;case 5124:case 35670:return cg;case 35667:case 35671:return hg;case 35668:case 35672:return dg;case 35669:case 35673:return ug;case 5125:return pg;case 36294:return fg;case 36295:return mg;case 36296:return gg;case 35678:case 36198:case 36298:case 36306:case 35682:return _g;case 35679:case 36299:case 36307:return yg;case 35680:case 36300:case 36308:case 36293:return xg;case 36289:case 36303:case 36311:case 36292:return vg}}class Sg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=tg(t.type)}}class Mg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=bg(t.type)}}class Eg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const to=/(\w+)(\])?(\[|\.)?/g;function Hl(r,e){r.seq.push(e),r.map[e.id]=e}function wg(r,e,t){const n=r.name,i=n.length;for(to.lastIndex=0;;){const s=to.exec(n),o=to.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Hl(t,c===void 0?new Sg(a,r,e):new Mg(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new Eg(a),Hl(t,d)),t=d}}}class rr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);wg(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Vl(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const Tg=37297;let Ag=0;function Cg(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Gl=new De;function Rg(r){We._getMatrix(Gl,We.workingColorSpace,r);const e=`mat3( ${Gl.elements.map(t=>t.toFixed(4))} )`;switch(We.getTransfer(r)){case ur:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Wl(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+Cg(r.getShaderSource(e),o)}else return i}function Pg(r,e){const t=Rg(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Lg(r,e){let t;switch(e){case Th:t="Linear";break;case Ah:t="Reinhard";break;case Ch:t="Cineon";break;case hc:t="ACESFilmic";break;case Ph:t="AgX";break;case Lh:t="Neutral";break;case Rh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const js=new I;function Ig(){We.getLuminanceCoefficients(js);const r=js.x.toFixed(4),e=js.y.toFixed(4),t=js.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Dg(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(rs).join(`
`)}function Fg(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ug(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function rs(r){return r!==""}function $l(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xl(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ng=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zo(r){return r.replace(Ng,Bg)}const Og=new Map;function Bg(r,e){let t=Ne[e];if(t===void 0){const n=Og.get(e);if(n!==void 0)t=Ne[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Zo(t)}const kg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ql(r){return r.replace(kg,zg)}function zg(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function jl(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function Hg(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===ac?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===lc?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===bn&&(e="SHADOWMAP_TYPE_VSM"),e}function Vg(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Fi:case Ui:e="ENVMAP_TYPE_CUBE";break;case gr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Gg(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Ui:e="ENVMAP_MODE_REFRACTION";break}return e}function Wg(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case cc:e="ENVMAP_BLENDING_MULTIPLY";break;case Eh:e="ENVMAP_BLENDING_MIX";break;case wh:e="ENVMAP_BLENDING_ADD";break}return e}function $g(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Xg(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Hg(t),c=Vg(t),h=Gg(t),d=Wg(t),u=$g(t),f=Dg(t),_=Fg(s),g=i.createProgram();let m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(rs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(rs).join(`
`),p.length>0&&(p+=`
`)):(m=[jl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(rs).join(`
`),p=[jl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Hn?"#define TONE_MAPPING":"",t.toneMapping!==Hn?Ne.tonemapping_pars_fragment:"",t.toneMapping!==Hn?Lg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,Pg("linearToOutputTexel",t.outputColorSpace),Ig(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(rs).join(`
`)),o=Zo(o),o=$l(o,t),o=Xl(o,t),a=Zo(a),a=$l(a,t),a=Xl(a,t),o=ql(o),a=ql(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Ba?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ba?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=b+m+o,y=b+p+a,R=Vl(i,i.VERTEX_SHADER,E),P=Vl(i,i.FRAGMENT_SHADER,y);i.attachShader(g,R),i.attachShader(g,P),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function T(C){if(r.debug.checkShaderErrors){const k=i.getProgramInfoLog(g).trim(),N=i.getShaderInfoLog(R).trim(),H=i.getShaderInfoLog(P).trim();let $=!0,V=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if($=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,R,P);else{const j=Wl(i,R,"vertex"),G=Wl(i,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+k+`
`+j+`
`+G)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(N===""||H==="")&&(V=!1);V&&(C.diagnostics={runnable:$,programLog:k,vertexShader:{log:N,prefix:m},fragmentShader:{log:H,prefix:p}})}i.deleteShader(R),i.deleteShader(P),A=new rr(i,g),M=Ug(i,g)}let A;this.getUniforms=function(){return A===void 0&&T(this),A};let M;this.getAttributes=function(){return M===void 0&&T(this),M};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=i.getProgramParameter(g,Tg)),x},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ag++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=R,this.fragmentShader=P,this}let qg=0;class jg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Yg(e),t.set(e,n)),n}}class Yg{constructor(e){this.id=qg++,this.code=e,this.usedTimes=0}}function Kg(r,e,t,n,i,s,o){const a=new ua,l=new jg,c=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures;let f=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,x,C,k,N){const H=k.fog,$=N.geometry,V=M.isMeshStandardMaterial?k.environment:null,j=(M.isMeshStandardMaterial?t:e).get(M.envMap||V),G=j&&j.mapping===gr?j.image.height:null,te=_[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const ne=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,_e=ne!==void 0?ne.length:0;let Ee=0;$.morphAttributes.position!==void 0&&(Ee=1),$.morphAttributes.normal!==void 0&&(Ee=2),$.morphAttributes.color!==void 0&&(Ee=3);let Fe,X,ee,me;if(te){const Qe=ln[te];Fe=Qe.vertexShader,X=Qe.fragmentShader}else Fe=M.vertexShader,X=M.fragmentShader,l.update(M),ee=l.getVertexShaderID(M),me=l.getFragmentShaderID(M);const se=r.getRenderTarget(),Se=r.state.buffers.depth.getReversed(),Ve=N.isInstancedMesh===!0,we=N.isBatchedMesh===!0,ot=!!M.map,it=!!M.matcap,Be=!!j,L=!!M.aoMap,Pt=!!M.lightMap,ke=!!M.bumpMap,ze=!!M.normalMap,ye=!!M.displacementMap,et=!!M.emissiveMap,ve=!!M.metalnessMap,w=!!M.roughnessMap,v=M.anisotropy>0,O=M.clearcoat>0,Y=M.dispersion>0,Z=M.iridescence>0,q=M.sheen>0,xe=M.transmission>0,ae=v&&!!M.anisotropyMap,de=O&&!!M.clearcoatMap,$e=O&&!!M.clearcoatNormalMap,J=O&&!!M.clearcoatRoughnessMap,ue=Z&&!!M.iridescenceMap,Ae=Z&&!!M.iridescenceThicknessMap,Ce=q&&!!M.sheenColorMap,pe=q&&!!M.sheenRoughnessMap,Ge=!!M.specularMap,Ue=!!M.specularColorMap,st=!!M.specularIntensityMap,D=xe&&!!M.transmissionMap,re=xe&&!!M.thicknessMap,W=!!M.gradientMap,K=!!M.alphaMap,ce=M.alphaTest>0,le=!!M.alphaHash,Ie=!!M.extensions;let ht=Hn;M.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(ht=r.toneMapping);const Et={shaderID:te,shaderType:M.type,shaderName:M.name,vertexShader:Fe,fragmentShader:X,defines:M.defines,customVertexShaderID:ee,customFragmentShaderID:me,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:we,batchingColor:we&&N._colorsTexture!==null,instancing:Ve,instancingColor:Ve&&N.instanceColor!==null,instancingMorph:Ve&&N.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:se===null?r.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:Mt,alphaToCoverage:!!M.alphaToCoverage,map:ot,matcap:it,envMap:Be,envMapMode:Be&&j.mapping,envMapCubeUVHeight:G,aoMap:L,lightMap:Pt,bumpMap:ke,normalMap:ze,displacementMap:u&&ye,emissiveMap:et,normalMapObjectSpace:ze&&M.normalMapType===zh,normalMapTangentSpace:ze&&M.normalMapType===Mc,metalnessMap:ve,roughnessMap:w,anisotropy:v,anisotropyMap:ae,clearcoat:O,clearcoatMap:de,clearcoatNormalMap:$e,clearcoatRoughnessMap:J,dispersion:Y,iridescence:Z,iridescenceMap:ue,iridescenceThicknessMap:Ae,sheen:q,sheenColorMap:Ce,sheenRoughnessMap:pe,specularMap:Ge,specularColorMap:Ue,specularIntensityMap:st,transmission:xe,transmissionMap:D,thicknessMap:re,gradientMap:W,opaque:M.transparent===!1&&M.blending===bt&&M.alphaToCoverage===!1,alphaMap:K,alphaTest:ce,alphaHash:le,combine:M.combine,mapUv:ot&&g(M.map.channel),aoMapUv:L&&g(M.aoMap.channel),lightMapUv:Pt&&g(M.lightMap.channel),bumpMapUv:ke&&g(M.bumpMap.channel),normalMapUv:ze&&g(M.normalMap.channel),displacementMapUv:ye&&g(M.displacementMap.channel),emissiveMapUv:et&&g(M.emissiveMap.channel),metalnessMapUv:ve&&g(M.metalnessMap.channel),roughnessMapUv:w&&g(M.roughnessMap.channel),anisotropyMapUv:ae&&g(M.anisotropyMap.channel),clearcoatMapUv:de&&g(M.clearcoatMap.channel),clearcoatNormalMapUv:$e&&g(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&g(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&g(M.iridescenceMap.channel),iridescenceThicknessMapUv:Ae&&g(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&g(M.sheenColorMap.channel),sheenRoughnessMapUv:pe&&g(M.sheenRoughnessMap.channel),specularMapUv:Ge&&g(M.specularMap.channel),specularColorMapUv:Ue&&g(M.specularColorMap.channel),specularIntensityMapUv:st&&g(M.specularIntensityMap.channel),transmissionMapUv:D&&g(M.transmissionMap.channel),thicknessMapUv:re&&g(M.thicknessMap.channel),alphaMapUv:K&&g(M.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(ze||v),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!$.attributes.uv&&(ot||K),fog:!!H,useFog:M.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Se,skinning:N.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:Ee,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:r.shadowMap.enabled&&C.length>0,shadowMapType:r.shadowMap.type,toneMapping:ht,decodeVideoTexture:ot&&M.map.isVideoTexture===!0&&We.getTransfer(M.map.colorSpace)===tt,decodeVideoTextureEmissive:et&&M.emissiveMap.isVideoTexture===!0&&We.getTransfer(M.emissiveMap.colorSpace)===tt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===rt,flipSided:M.side===Ct,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Ie&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ie&&M.extensions.multiDraw===!0||we)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Et.vertexUv1s=c.has(1),Et.vertexUv2s=c.has(2),Et.vertexUv3s=c.has(3),c.clear(),Et}function p(M){const x=[];if(M.shaderID?x.push(M.shaderID):(x.push(M.customVertexShaderID),x.push(M.customFragmentShaderID)),M.defines!==void 0)for(const C in M.defines)x.push(C),x.push(M.defines[C]);return M.isRawShaderMaterial===!1&&(b(x,M),E(x,M),x.push(r.outputColorSpace)),x.push(M.customProgramCacheKey),x.join()}function b(M,x){M.push(x.precision),M.push(x.outputColorSpace),M.push(x.envMapMode),M.push(x.envMapCubeUVHeight),M.push(x.mapUv),M.push(x.alphaMapUv),M.push(x.lightMapUv),M.push(x.aoMapUv),M.push(x.bumpMapUv),M.push(x.normalMapUv),M.push(x.displacementMapUv),M.push(x.emissiveMapUv),M.push(x.metalnessMapUv),M.push(x.roughnessMapUv),M.push(x.anisotropyMapUv),M.push(x.clearcoatMapUv),M.push(x.clearcoatNormalMapUv),M.push(x.clearcoatRoughnessMapUv),M.push(x.iridescenceMapUv),M.push(x.iridescenceThicknessMapUv),M.push(x.sheenColorMapUv),M.push(x.sheenRoughnessMapUv),M.push(x.specularMapUv),M.push(x.specularColorMapUv),M.push(x.specularIntensityMapUv),M.push(x.transmissionMapUv),M.push(x.thicknessMapUv),M.push(x.combine),M.push(x.fogExp2),M.push(x.sizeAttenuation),M.push(x.morphTargetsCount),M.push(x.morphAttributeCount),M.push(x.numDirLights),M.push(x.numPointLights),M.push(x.numSpotLights),M.push(x.numSpotLightMaps),M.push(x.numHemiLights),M.push(x.numRectAreaLights),M.push(x.numDirLightShadows),M.push(x.numPointLightShadows),M.push(x.numSpotLightShadows),M.push(x.numSpotLightShadowsWithMaps),M.push(x.numLightProbes),M.push(x.shadowMapType),M.push(x.toneMapping),M.push(x.numClippingPlanes),M.push(x.numClipIntersection),M.push(x.depthPacking)}function E(M,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),M.push(a.mask)}function y(M){const x=_[M.type];let C;if(x){const k=ln[x];C=Ud.clone(k.uniforms)}else C=M.uniforms;return C}function R(M,x){let C;for(let k=0,N=h.length;k<N;k++){const H=h[k];if(H.cacheKey===x){C=H,++C.usedTimes;break}}return C===void 0&&(C=new Xg(r,x,M,s),h.push(C)),C}function P(M){if(--M.usedTimes===0){const x=h.indexOf(M);h[x]=h[h.length-1],h.pop(),M.destroy()}}function T(M){l.remove(M)}function A(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:R,releaseProgram:P,releaseShaderCache:T,programs:h,dispose:A}}function Zg(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function Qg(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Yl(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Kl(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(d,u,f,_,g,m){let p=r[e];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},r[e]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=g,p.group=m),e++,p}function a(d,u,f,_,g,m){const p=o(d,u,f,_,g,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(d,u,f,_,g,m){const p=o(d,u,f,_,g,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,u){t.length>1&&t.sort(d||Qg),n.length>1&&n.sort(u||Yl),i.length>1&&i.sort(u||Yl)}function h(){for(let d=e,u=r.length;d<u;d++){const f=r[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function Jg(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Kl,r.set(n,[o])):i>=s.length?(o=new Kl,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function e_(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new ge};break;case"SpotLight":t={position:new I,direction:new I,color:new ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new ge,groundColor:new ge};break;case"RectAreaLight":t={color:new ge,position:new I,halfWidth:new I,halfHeight:new I};break}return r[e.id]=t,t}}}function t_(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let n_=0;function i_(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function s_(r){const e=new e_,t=t_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const i=new I,s=new Le,o=new Le;function a(c){let h=0,d=0,u=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,_=0,g=0,m=0,p=0,b=0,E=0,y=0,R=0,P=0,T=0;c.sort(i_);for(let M=0,x=c.length;M<x;M++){const C=c[M],k=C.color,N=C.intensity,H=C.distance,$=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=k.r*N,d+=k.g*N,u+=k.b*N;else if(C.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(C.sh.coefficients[V],N);T++}else if(C.isDirectionalLight){const V=e.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const j=C.shadow,G=t.get(C);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=$,n.directionalShadowMatrix[f]=C.shadow.matrix,b++}n.directional[f]=V,f++}else if(C.isSpotLight){const V=e.get(C);V.position.setFromMatrixPosition(C.matrixWorld),V.color.copy(k).multiplyScalar(N),V.distance=H,V.coneCos=Math.cos(C.angle),V.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),V.decay=C.decay,n.spot[g]=V;const j=C.shadow;if(C.map&&(n.spotLightMap[R]=C.map,R++,j.updateMatrices(C),C.castShadow&&P++),n.spotLightMatrix[g]=j.matrix,C.castShadow){const G=t.get(C);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,n.spotShadow[g]=G,n.spotShadowMap[g]=$,y++}g++}else if(C.isRectAreaLight){const V=e.get(C);V.color.copy(k).multiplyScalar(N),V.halfWidth.set(C.width*.5,0,0),V.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=V,m++}else if(C.isPointLight){const V=e.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),V.distance=C.distance,V.decay=C.decay,C.castShadow){const j=C.shadow,G=t.get(C);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,G.shadowCameraNear=j.camera.near,G.shadowCameraFar=j.camera.far,n.pointShadow[_]=G,n.pointShadowMap[_]=$,n.pointShadowMatrix[_]=C.shadow.matrix,E++}n.point[_]=V,_++}else if(C.isHemisphereLight){const V=e.get(C);V.skyColor.copy(C.color).multiplyScalar(N),V.groundColor.copy(C.groundColor).multiplyScalar(N),n.hemi[p]=V,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ie.LTC_FLOAT_1,n.rectAreaLTC2=ie.LTC_FLOAT_2):(n.rectAreaLTC1=ie.LTC_HALF_1,n.rectAreaLTC2=ie.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const A=n.hash;(A.directionalLength!==f||A.pointLength!==_||A.spotLength!==g||A.rectAreaLength!==m||A.hemiLength!==p||A.numDirectionalShadows!==b||A.numPointShadows!==E||A.numSpotShadows!==y||A.numSpotMaps!==R||A.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=g,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=y+R-P,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=T,A.directionalLength=f,A.pointLength=_,A.spotLength=g,A.rectAreaLength=m,A.hemiLength=p,A.numDirectionalShadows=b,A.numPointShadows=E,A.numSpotShadows=y,A.numSpotMaps=R,A.numLightProbes=T,n.version=n_++)}function l(c,h){let d=0,u=0,f=0,_=0,g=0;const m=h.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const E=c[p];if(E.isDirectionalLight){const y=n.directional[d];y.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),d++}else if(E.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),f++}else if(E.isRectAreaLight){const y=n.rectArea[_];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),o.identity(),s.copy(E.matrixWorld),s.premultiply(m),o.extractRotation(s),y.halfWidth.set(E.width*.5,0,0),y.halfHeight.set(0,E.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),_++}else if(E.isPointLight){const y=n.point[u];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),u++}else if(E.isHemisphereLight){const y=n.hemi[g];y.direction.setFromMatrixPosition(E.matrixWorld),y.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function Zl(r){const e=new s_(r),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function r_(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new Zl(r),e.set(i,[a])):s>=o.length?(a=new Zl(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const o_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,a_=`uniform sampler2D shadow_pass;
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
}`;function l_(r,e,t){let n=new ga;const i=new Te,s=new Te,o=new je,a=new Qd({depthPacking:kh}),l=new Jd,c={},h=t.maxTextureSize,d={[At]:Ct,[Ct]:At,[rt]:rt},u=new Vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Te},radius:{value:4}},vertexShader:o_,fragmentShader:a_}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const _=new Ot;_.setAttribute("position",new St(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Ht(_,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ac;let p=this.type;this.render=function(P,T,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||P.length===0)return;const M=r.getRenderTarget(),x=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),k=r.state;k.setBlending(zn),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const N=p!==bn&&this.type===bn,H=p===bn&&this.type!==bn;for(let $=0,V=P.length;$<V;$++){const j=P[$],G=j.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const te=G.getFrameExtents();if(i.multiply(te),s.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/te.x),i.x=s.x*te.x,G.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/te.y),i.y=s.y*te.y,G.mapSize.y=s.y)),G.map===null||N===!0||H===!0){const _e=this.type!==bn?{minFilter:Nt,magFilter:Nt}:{};G.map!==null&&G.map.dispose(),G.map=new oi(i.x,i.y,_e),G.map.texture.name=j.name+".shadowMap",G.camera.updateProjectionMatrix()}r.setRenderTarget(G.map),r.clear();const ne=G.getViewportCount();for(let _e=0;_e<ne;_e++){const Ee=G.getViewport(_e);o.set(s.x*Ee.x,s.y*Ee.y,s.x*Ee.z,s.y*Ee.w),k.viewport(o),G.updateMatrices(j,_e),n=G.getFrustum(),y(T,A,G.camera,j,this.type)}G.isPointLightShadow!==!0&&this.type===bn&&b(G,A),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(M,x,C)};function b(P,T){const A=e.update(g);u.defines.VSM_SAMPLES!==P.blurSamples&&(u.defines.VSM_SAMPLES=P.blurSamples,f.defines.VSM_SAMPLES=P.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new oi(i.x,i.y)),u.uniforms.shadow_pass.value=P.map.texture,u.uniforms.resolution.value=P.mapSize,u.uniforms.radius.value=P.radius,r.setRenderTarget(P.mapPass),r.clear(),r.renderBufferDirect(T,null,A,u,g,null),f.uniforms.shadow_pass.value=P.mapPass.texture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,r.setRenderTarget(P.map),r.clear(),r.renderBufferDirect(T,null,A,f,g,null)}function E(P,T,A,M){let x=null;const C=A.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(C!==void 0)x=C;else if(x=A.isPointLight===!0?l:a,r.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const k=x.uuid,N=T.uuid;let H=c[k];H===void 0&&(H={},c[k]=H);let $=H[N];$===void 0&&($=x.clone(),H[N]=$,T.addEventListener("dispose",R)),x=$}if(x.visible=T.visible,x.wireframe=T.wireframe,M===bn?x.side=T.shadowSide!==null?T.shadowSide:T.side:x.side=T.shadowSide!==null?T.shadowSide:d[T.side],x.alphaMap=T.alphaMap,x.alphaTest=T.alphaTest,x.map=T.map,x.clipShadows=T.clipShadows,x.clippingPlanes=T.clippingPlanes,x.clipIntersection=T.clipIntersection,x.displacementMap=T.displacementMap,x.displacementScale=T.displacementScale,x.displacementBias=T.displacementBias,x.wireframeLinewidth=T.wireframeLinewidth,x.linewidth=T.linewidth,A.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const k=r.properties.get(x);k.light=A}return x}function y(P,T,A,M,x){if(P.visible===!1)return;if(P.layers.test(T.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&x===bn)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,P.matrixWorld);const N=e.update(P),H=P.material;if(Array.isArray(H)){const $=N.groups;for(let V=0,j=$.length;V<j;V++){const G=$[V],te=H[G.materialIndex];if(te&&te.visible){const ne=E(P,te,M,x);P.onBeforeShadow(r,P,T,A,N,ne,G),r.renderBufferDirect(A,null,N,ne,P,G),P.onAfterShadow(r,P,T,A,N,ne,G)}}}else if(H.visible){const $=E(P,H,M,x);P.onBeforeShadow(r,P,T,A,N,$,null),r.renderBufferDirect(A,null,N,$,P,null),P.onAfterShadow(r,P,T,A,N,$,null)}}const k=P.children;for(let N=0,H=k.length;N<H;N++)y(k[N],T,A,M,x)}function R(P){P.target.removeEventListener("dispose",R);for(const A in c){const M=c[A],x=P.target.uuid;x in M&&(M[x].dispose(),delete M[x])}}}const c_={[ho]:uo,[po]:go,[fo]:_o,[Di]:mo,[uo]:ho,[go]:po,[_o]:fo,[mo]:Di};function h_(r,e){function t(){let D=!1;const re=new je;let W=null;const K=new je(0,0,0,0);return{setMask:function(ce){W!==ce&&!D&&(r.colorMask(ce,ce,ce,ce),W=ce)},setLocked:function(ce){D=ce},setClear:function(ce,le,Ie,ht,Et){Et===!0&&(ce*=ht,le*=ht,Ie*=ht),re.set(ce,le,Ie,ht),K.equals(re)===!1&&(r.clearColor(ce,le,Ie,ht),K.copy(re))},reset:function(){D=!1,W=null,K.set(-1,0,0,0)}}}function n(){let D=!1,re=!1,W=null,K=null,ce=null;return{setReversed:function(le){if(re!==le){const Ie=e.get("EXT_clip_control");re?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT);const ht=ce;ce=null,this.setClear(ht)}re=le},getReversed:function(){return re},setTest:function(le){le?se(r.DEPTH_TEST):Se(r.DEPTH_TEST)},setMask:function(le){W!==le&&!D&&(r.depthMask(le),W=le)},setFunc:function(le){if(re&&(le=c_[le]),K!==le){switch(le){case ho:r.depthFunc(r.NEVER);break;case uo:r.depthFunc(r.ALWAYS);break;case po:r.depthFunc(r.LESS);break;case Di:r.depthFunc(r.LEQUAL);break;case fo:r.depthFunc(r.EQUAL);break;case mo:r.depthFunc(r.GEQUAL);break;case go:r.depthFunc(r.GREATER);break;case _o:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}K=le}},setLocked:function(le){D=le},setClear:function(le){ce!==le&&(re&&(le=1-le),r.clearDepth(le),ce=le)},reset:function(){D=!1,W=null,K=null,ce=null,re=!1}}}function i(){let D=!1,re=null,W=null,K=null,ce=null,le=null,Ie=null,ht=null,Et=null;return{setTest:function(Qe){D||(Qe?se(r.STENCIL_TEST):Se(r.STENCIL_TEST))},setMask:function(Qe){re!==Qe&&!D&&(r.stencilMask(Qe),re=Qe)},setFunc:function(Qe,Qt,fn){(W!==Qe||K!==Qt||ce!==fn)&&(r.stencilFunc(Qe,Qt,fn),W=Qe,K=Qt,ce=fn)},setOp:function(Qe,Qt,fn){(le!==Qe||Ie!==Qt||ht!==fn)&&(r.stencilOp(Qe,Qt,fn),le=Qe,Ie=Qt,ht=fn)},setLocked:function(Qe){D=Qe},setClear:function(Qe){Et!==Qe&&(r.clearStencil(Qe),Et=Qe)},reset:function(){D=!1,re=null,W=null,K=null,ce=null,le=null,Ie=null,ht=null,Et=null}}}const s=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,f=[],_=null,g=!1,m=null,p=null,b=null,E=null,y=null,R=null,P=null,T=new ge(0,0,0),A=0,M=!1,x=null,C=null,k=null,N=null,H=null;const $=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,j=0;const G=r.getParameter(r.VERSION);G.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(G)[1]),V=j>=1):G.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),V=j>=2);let te=null,ne={};const _e=r.getParameter(r.SCISSOR_BOX),Ee=r.getParameter(r.VIEWPORT),Fe=new je().fromArray(_e),X=new je().fromArray(Ee);function ee(D,re,W,K){const ce=new Uint8Array(4),le=r.createTexture();r.bindTexture(D,le),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ie=0;Ie<W;Ie++)D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY?r.texImage3D(re,0,r.RGBA,1,1,K,0,r.RGBA,r.UNSIGNED_BYTE,ce):r.texImage2D(re+Ie,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ce);return le}const me={};me[r.TEXTURE_2D]=ee(r.TEXTURE_2D,r.TEXTURE_2D,1),me[r.TEXTURE_CUBE_MAP]=ee(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),me[r.TEXTURE_2D_ARRAY]=ee(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),me[r.TEXTURE_3D]=ee(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),se(r.DEPTH_TEST),o.setFunc(Di),ke(!1),ze(Ua),se(r.CULL_FACE),L(zn);function se(D){h[D]!==!0&&(r.enable(D),h[D]=!0)}function Se(D){h[D]!==!1&&(r.disable(D),h[D]=!1)}function Ve(D,re){return d[D]!==re?(r.bindFramebuffer(D,re),d[D]=re,D===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=re),D===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=re),!0):!1}function we(D,re){let W=f,K=!1;if(D){W=u.get(re),W===void 0&&(W=[],u.set(re,W));const ce=D.textures;if(W.length!==ce.length||W[0]!==r.COLOR_ATTACHMENT0){for(let le=0,Ie=ce.length;le<Ie;le++)W[le]=r.COLOR_ATTACHMENT0+le;W.length=ce.length,K=!0}}else W[0]!==r.BACK&&(W[0]=r.BACK,K=!0);K&&r.drawBuffers(W)}function ot(D){return _!==D?(r.useProgram(D),_=D,!0):!1}const it={[ti]:r.FUNC_ADD,[ah]:r.FUNC_SUBTRACT,[lh]:r.FUNC_REVERSE_SUBTRACT};it[ch]=r.MIN,it[hh]=r.MAX;const Be={[dh]:r.ZERO,[uh]:r.ONE,[ph]:r.SRC_COLOR,[lo]:r.SRC_ALPHA,[xh]:r.SRC_ALPHA_SATURATE,[_h]:r.DST_COLOR,[mh]:r.DST_ALPHA,[fh]:r.ONE_MINUS_SRC_COLOR,[co]:r.ONE_MINUS_SRC_ALPHA,[yh]:r.ONE_MINUS_DST_COLOR,[gh]:r.ONE_MINUS_DST_ALPHA,[vh]:r.CONSTANT_COLOR,[bh]:r.ONE_MINUS_CONSTANT_COLOR,[Sh]:r.CONSTANT_ALPHA,[Mh]:r.ONE_MINUS_CONSTANT_ALPHA};function L(D,re,W,K,ce,le,Ie,ht,Et,Qe){if(D===zn){g===!0&&(Se(r.BLEND),g=!1);return}if(g===!1&&(se(r.BLEND),g=!0),D!==Qs){if(D!==m||Qe!==M){if((p!==ti||y!==ti)&&(r.blendEquation(r.FUNC_ADD),p=ti,y=ti),Qe)switch(D){case bt:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case or:r.blendFunc(r.ONE,r.ONE);break;case ar:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case lr:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case bt:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case or:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case ar:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case lr:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}b=null,E=null,R=null,P=null,T.set(0,0,0),A=0,m=D,M=Qe}return}ce=ce||re,le=le||W,Ie=Ie||K,(re!==p||ce!==y)&&(r.blendEquationSeparate(it[re],it[ce]),p=re,y=ce),(W!==b||K!==E||le!==R||Ie!==P)&&(r.blendFuncSeparate(Be[W],Be[K],Be[le],Be[Ie]),b=W,E=K,R=le,P=Ie),(ht.equals(T)===!1||Et!==A)&&(r.blendColor(ht.r,ht.g,ht.b,Et),T.copy(ht),A=Et),m=D,M=!1}function Pt(D,re){D.side===rt?Se(r.CULL_FACE):se(r.CULL_FACE);let W=D.side===Ct;re&&(W=!W),ke(W),D.blending===bt&&D.transparent===!1?L(zn):L(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);const K=D.stencilWrite;a.setTest(K),K&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),et(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?se(r.SAMPLE_ALPHA_TO_COVERAGE):Se(r.SAMPLE_ALPHA_TO_COVERAGE)}function ke(D){x!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),x=D)}function ze(D){D!==rh?(se(r.CULL_FACE),D!==C&&(D===Ua?r.cullFace(r.BACK):D===oh?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Se(r.CULL_FACE),C=D}function ye(D){D!==k&&(V&&r.lineWidth(D),k=D)}function et(D,re,W){D?(se(r.POLYGON_OFFSET_FILL),(N!==re||H!==W)&&(r.polygonOffset(re,W),N=re,H=W)):Se(r.POLYGON_OFFSET_FILL)}function ve(D){D?se(r.SCISSOR_TEST):Se(r.SCISSOR_TEST)}function w(D){D===void 0&&(D=r.TEXTURE0+$-1),te!==D&&(r.activeTexture(D),te=D)}function v(D,re,W){W===void 0&&(te===null?W=r.TEXTURE0+$-1:W=te);let K=ne[W];K===void 0&&(K={type:void 0,texture:void 0},ne[W]=K),(K.type!==D||K.texture!==re)&&(te!==W&&(r.activeTexture(W),te=W),r.bindTexture(D,re||me[D]),K.type=D,K.texture=re)}function O(){const D=ne[te];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Y(){try{r.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Z(){try{r.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{r.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function xe(){try{r.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ae(){try{r.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function de(){try{r.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function $e(){try{r.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function J(){try{r.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ue(){try{r.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ae(){try{r.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ce(D){Fe.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),Fe.copy(D))}function pe(D){X.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),X.copy(D))}function Ge(D,re){let W=c.get(re);W===void 0&&(W=new WeakMap,c.set(re,W));let K=W.get(D);K===void 0&&(K=r.getUniformBlockIndex(re,D.name),W.set(D,K))}function Ue(D,re){const K=c.get(re).get(D);l.get(re)!==K&&(r.uniformBlockBinding(re,K,D.__bindingPointIndex),l.set(re,K))}function st(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},te=null,ne={},d={},u=new WeakMap,f=[],_=null,g=!1,m=null,p=null,b=null,E=null,y=null,R=null,P=null,T=new ge(0,0,0),A=0,M=!1,x=null,C=null,k=null,N=null,H=null,Fe.set(0,0,r.canvas.width,r.canvas.height),X.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:se,disable:Se,bindFramebuffer:Ve,drawBuffers:we,useProgram:ot,setBlending:L,setMaterial:Pt,setFlipSided:ke,setCullFace:ze,setLineWidth:ye,setPolygonOffset:et,setScissorTest:ve,activeTexture:w,bindTexture:v,unbindTexture:O,compressedTexImage2D:Y,compressedTexImage3D:Z,texImage2D:ue,texImage3D:Ae,updateUBOMapping:Ge,uniformBlockBinding:Ue,texStorage2D:$e,texStorage3D:J,texSubImage2D:q,texSubImage3D:xe,compressedTexSubImage2D:ae,compressedTexSubImage3D:de,scissor:Ce,viewport:pe,reset:st}}function d_(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Te,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(w,v){return f?new OffscreenCanvas(w,v):us("canvas")}function g(w,v,O){let Y=1;const Z=ve(w);if((Z.width>O||Z.height>O)&&(Y=O/Math.max(Z.width,Z.height)),Y<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const q=Math.floor(Y*Z.width),xe=Math.floor(Y*Z.height);d===void 0&&(d=_(q,xe));const ae=v?_(q,xe):d;return ae.width=q,ae.height=xe,ae.getContext("2d").drawImage(w,0,0,q,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+q+"x"+xe+")."),ae}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),w;return w}function m(w){return w.generateMipmaps}function p(w){r.generateMipmap(w)}function b(w){return w.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?r.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function E(w,v,O,Y,Z=!1){if(w!==null){if(r[w]!==void 0)return r[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let q=v;if(v===r.RED&&(O===r.FLOAT&&(q=r.R32F),O===r.HALF_FLOAT&&(q=r.R16F),O===r.UNSIGNED_BYTE&&(q=r.R8)),v===r.RED_INTEGER&&(O===r.UNSIGNED_BYTE&&(q=r.R8UI),O===r.UNSIGNED_SHORT&&(q=r.R16UI),O===r.UNSIGNED_INT&&(q=r.R32UI),O===r.BYTE&&(q=r.R8I),O===r.SHORT&&(q=r.R16I),O===r.INT&&(q=r.R32I)),v===r.RG&&(O===r.FLOAT&&(q=r.RG32F),O===r.HALF_FLOAT&&(q=r.RG16F),O===r.UNSIGNED_BYTE&&(q=r.RG8)),v===r.RG_INTEGER&&(O===r.UNSIGNED_BYTE&&(q=r.RG8UI),O===r.UNSIGNED_SHORT&&(q=r.RG16UI),O===r.UNSIGNED_INT&&(q=r.RG32UI),O===r.BYTE&&(q=r.RG8I),O===r.SHORT&&(q=r.RG16I),O===r.INT&&(q=r.RG32I)),v===r.RGB_INTEGER&&(O===r.UNSIGNED_BYTE&&(q=r.RGB8UI),O===r.UNSIGNED_SHORT&&(q=r.RGB16UI),O===r.UNSIGNED_INT&&(q=r.RGB32UI),O===r.BYTE&&(q=r.RGB8I),O===r.SHORT&&(q=r.RGB16I),O===r.INT&&(q=r.RGB32I)),v===r.RGBA_INTEGER&&(O===r.UNSIGNED_BYTE&&(q=r.RGBA8UI),O===r.UNSIGNED_SHORT&&(q=r.RGBA16UI),O===r.UNSIGNED_INT&&(q=r.RGBA32UI),O===r.BYTE&&(q=r.RGBA8I),O===r.SHORT&&(q=r.RGBA16I),O===r.INT&&(q=r.RGBA32I)),v===r.RGB&&O===r.UNSIGNED_INT_5_9_9_9_REV&&(q=r.RGB9_E5),v===r.RGBA){const xe=Z?ur:We.getTransfer(Y);O===r.FLOAT&&(q=r.RGBA32F),O===r.HALF_FLOAT&&(q=r.RGBA16F),O===r.UNSIGNED_BYTE&&(q=xe===tt?r.SRGB8_ALPHA8:r.RGBA8),O===r.UNSIGNED_SHORT_4_4_4_4&&(q=r.RGBA4),O===r.UNSIGNED_SHORT_5_5_5_1&&(q=r.RGB5_A1)}return(q===r.R16F||q===r.R32F||q===r.RG16F||q===r.RG32F||q===r.RGBA16F||q===r.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function y(w,v){let O;return w?v===null||v===ri||v===Oi?O=r.DEPTH24_STENCIL8:v===zt?O=r.DEPTH32F_STENCIL8:v===cs&&(O=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ri||v===Oi?O=r.DEPTH_COMPONENT24:v===zt?O=r.DEPTH_COMPONENT32F:v===cs&&(O=r.DEPTH_COMPONENT16),O}function R(w,v){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Nt&&w.minFilter!==lt?Math.log2(Math.max(v.width,v.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?v.mipmaps.length:1}function P(w){const v=w.target;v.removeEventListener("dispose",P),A(v),v.isVideoTexture&&h.delete(v)}function T(w){const v=w.target;v.removeEventListener("dispose",T),x(v)}function A(w){const v=n.get(w);if(v.__webglInit===void 0)return;const O=w.source,Y=u.get(O);if(Y){const Z=Y[v.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&M(w),Object.keys(Y).length===0&&u.delete(O)}n.remove(w)}function M(w){const v=n.get(w);r.deleteTexture(v.__webglTexture);const O=w.source,Y=u.get(O);delete Y[v.__cacheKey],o.memory.textures--}function x(w){const v=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(v.__webglFramebuffer[Y]))for(let Z=0;Z<v.__webglFramebuffer[Y].length;Z++)r.deleteFramebuffer(v.__webglFramebuffer[Y][Z]);else r.deleteFramebuffer(v.__webglFramebuffer[Y]);v.__webglDepthbuffer&&r.deleteRenderbuffer(v.__webglDepthbuffer[Y])}else{if(Array.isArray(v.__webglFramebuffer))for(let Y=0;Y<v.__webglFramebuffer.length;Y++)r.deleteFramebuffer(v.__webglFramebuffer[Y]);else r.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&r.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&r.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Y=0;Y<v.__webglColorRenderbuffer.length;Y++)v.__webglColorRenderbuffer[Y]&&r.deleteRenderbuffer(v.__webglColorRenderbuffer[Y]);v.__webglDepthRenderbuffer&&r.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=w.textures;for(let Y=0,Z=O.length;Y<Z;Y++){const q=n.get(O[Y]);q.__webglTexture&&(r.deleteTexture(q.__webglTexture),o.memory.textures--),n.remove(O[Y])}n.remove(w)}let C=0;function k(){C=0}function N(){const w=C;return w>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+i.maxTextures),C+=1,w}function H(w){const v=[];return v.push(w.wrapS),v.push(w.wrapT),v.push(w.wrapR||0),v.push(w.magFilter),v.push(w.minFilter),v.push(w.anisotropy),v.push(w.internalFormat),v.push(w.format),v.push(w.type),v.push(w.generateMipmaps),v.push(w.premultiplyAlpha),v.push(w.flipY),v.push(w.unpackAlignment),v.push(w.colorSpace),v.join()}function $(w,v){const O=n.get(w);if(w.isVideoTexture&&ye(w),w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){const Y=w.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(O,w,v);return}}t.bindTexture(r.TEXTURE_2D,O.__webglTexture,r.TEXTURE0+v)}function V(w,v){const O=n.get(w);if(w.version>0&&O.__version!==w.version){X(O,w,v);return}t.bindTexture(r.TEXTURE_2D_ARRAY,O.__webglTexture,r.TEXTURE0+v)}function j(w,v){const O=n.get(w);if(w.version>0&&O.__version!==w.version){X(O,w,v);return}t.bindTexture(r.TEXTURE_3D,O.__webglTexture,r.TEXTURE0+v)}function G(w,v){const O=n.get(w);if(w.version>0&&O.__version!==w.version){ee(O,w,v);return}t.bindTexture(r.TEXTURE_CUBE_MAP,O.__webglTexture,r.TEXTURE0+v)}const te={[Ni]:r.REPEAT,[Kt]:r.CLAMP_TO_EDGE,[hr]:r.MIRRORED_REPEAT},ne={[Nt]:r.NEAREST,[uc]:r.NEAREST_MIPMAP_NEAREST,[ss]:r.NEAREST_MIPMAP_LINEAR,[lt]:r.LINEAR,[Js]:r.LINEAR_MIPMAP_NEAREST,[cn]:r.LINEAR_MIPMAP_LINEAR},_e={[Hh]:r.NEVER,[qh]:r.ALWAYS,[Vh]:r.LESS,[Ec]:r.LEQUAL,[Gh]:r.EQUAL,[Xh]:r.GEQUAL,[Wh]:r.GREATER,[$h]:r.NOTEQUAL};function Ee(w,v){if(v.type===zt&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===lt||v.magFilter===Js||v.magFilter===ss||v.magFilter===cn||v.minFilter===lt||v.minFilter===Js||v.minFilter===ss||v.minFilter===cn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(w,r.TEXTURE_WRAP_S,te[v.wrapS]),r.texParameteri(w,r.TEXTURE_WRAP_T,te[v.wrapT]),(w===r.TEXTURE_3D||w===r.TEXTURE_2D_ARRAY)&&r.texParameteri(w,r.TEXTURE_WRAP_R,te[v.wrapR]),r.texParameteri(w,r.TEXTURE_MAG_FILTER,ne[v.magFilter]),r.texParameteri(w,r.TEXTURE_MIN_FILTER,ne[v.minFilter]),v.compareFunction&&(r.texParameteri(w,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(w,r.TEXTURE_COMPARE_FUNC,_e[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Nt||v.minFilter!==ss&&v.minFilter!==cn||v.type===zt&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");r.texParameterf(w,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Fe(w,v){let O=!1;w.__webglInit===void 0&&(w.__webglInit=!0,v.addEventListener("dispose",P));const Y=v.source;let Z=u.get(Y);Z===void 0&&(Z={},u.set(Y,Z));const q=H(v);if(q!==w.__cacheKey){Z[q]===void 0&&(Z[q]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,O=!0),Z[q].usedTimes++;const xe=Z[w.__cacheKey];xe!==void 0&&(Z[w.__cacheKey].usedTimes--,xe.usedTimes===0&&M(v)),w.__cacheKey=q,w.__webglTexture=Z[q].texture}return O}function X(w,v,O){let Y=r.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Y=r.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Y=r.TEXTURE_3D);const Z=Fe(w,v),q=v.source;t.bindTexture(Y,w.__webglTexture,r.TEXTURE0+O);const xe=n.get(q);if(q.version!==xe.__version||Z===!0){t.activeTexture(r.TEXTURE0+O);const ae=We.getPrimaries(We.workingColorSpace),de=v.colorSpace===kn?null:We.getPrimaries(v.colorSpace),$e=v.colorSpace===kn||ae===de?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,v.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,v.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e);let J=g(v.image,!1,i.maxTextureSize);J=et(v,J);const ue=s.convert(v.format,v.colorSpace),Ae=s.convert(v.type);let Ce=E(v.internalFormat,ue,Ae,v.colorSpace,v.isVideoTexture);Ee(Y,v);let pe;const Ge=v.mipmaps,Ue=v.isVideoTexture!==!0,st=xe.__version===void 0||Z===!0,D=q.dataReady,re=R(v,J);if(v.isDepthTexture)Ce=y(v.format===Bi,v.type),st&&(Ue?t.texStorage2D(r.TEXTURE_2D,1,Ce,J.width,J.height):t.texImage2D(r.TEXTURE_2D,0,Ce,J.width,J.height,0,ue,Ae,null));else if(v.isDataTexture)if(Ge.length>0){Ue&&st&&t.texStorage2D(r.TEXTURE_2D,re,Ce,Ge[0].width,Ge[0].height);for(let W=0,K=Ge.length;W<K;W++)pe=Ge[W],Ue?D&&t.texSubImage2D(r.TEXTURE_2D,W,0,0,pe.width,pe.height,ue,Ae,pe.data):t.texImage2D(r.TEXTURE_2D,W,Ce,pe.width,pe.height,0,ue,Ae,pe.data);v.generateMipmaps=!1}else Ue?(st&&t.texStorage2D(r.TEXTURE_2D,re,Ce,J.width,J.height),D&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,J.width,J.height,ue,Ae,J.data)):t.texImage2D(r.TEXTURE_2D,0,Ce,J.width,J.height,0,ue,Ae,J.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ue&&st&&t.texStorage3D(r.TEXTURE_2D_ARRAY,re,Ce,Ge[0].width,Ge[0].height,J.depth);for(let W=0,K=Ge.length;W<K;W++)if(pe=Ge[W],v.format!==Zt)if(ue!==null)if(Ue){if(D)if(v.layerUpdates.size>0){const ce=Al(pe.width,pe.height,v.format,v.type);for(const le of v.layerUpdates){const Ie=pe.data.subarray(le*ce/pe.data.BYTES_PER_ELEMENT,(le+1)*ce/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,le,pe.width,pe.height,1,ue,Ie)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,0,pe.width,pe.height,J.depth,ue,pe.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,W,Ce,pe.width,pe.height,J.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ue?D&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,0,pe.width,pe.height,J.depth,ue,Ae,pe.data):t.texImage3D(r.TEXTURE_2D_ARRAY,W,Ce,pe.width,pe.height,J.depth,0,ue,Ae,pe.data)}else{Ue&&st&&t.texStorage2D(r.TEXTURE_2D,re,Ce,Ge[0].width,Ge[0].height);for(let W=0,K=Ge.length;W<K;W++)pe=Ge[W],v.format!==Zt?ue!==null?Ue?D&&t.compressedTexSubImage2D(r.TEXTURE_2D,W,0,0,pe.width,pe.height,ue,pe.data):t.compressedTexImage2D(r.TEXTURE_2D,W,Ce,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ue?D&&t.texSubImage2D(r.TEXTURE_2D,W,0,0,pe.width,pe.height,ue,Ae,pe.data):t.texImage2D(r.TEXTURE_2D,W,Ce,pe.width,pe.height,0,ue,Ae,pe.data)}else if(v.isDataArrayTexture)if(Ue){if(st&&t.texStorage3D(r.TEXTURE_2D_ARRAY,re,Ce,J.width,J.height,J.depth),D)if(v.layerUpdates.size>0){const W=Al(J.width,J.height,v.format,v.type);for(const K of v.layerUpdates){const ce=J.data.subarray(K*W/J.data.BYTES_PER_ELEMENT,(K+1)*W/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,K,J.width,J.height,1,ue,Ae,ce)}v.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ue,Ae,J.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ce,J.width,J.height,J.depth,0,ue,Ae,J.data);else if(v.isData3DTexture)Ue?(st&&t.texStorage3D(r.TEXTURE_3D,re,Ce,J.width,J.height,J.depth),D&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ue,Ae,J.data)):t.texImage3D(r.TEXTURE_3D,0,Ce,J.width,J.height,J.depth,0,ue,Ae,J.data);else if(v.isFramebufferTexture){if(st)if(Ue)t.texStorage2D(r.TEXTURE_2D,re,Ce,J.width,J.height);else{let W=J.width,K=J.height;for(let ce=0;ce<re;ce++)t.texImage2D(r.TEXTURE_2D,ce,Ce,W,K,0,ue,Ae,null),W>>=1,K>>=1}}else if(Ge.length>0){if(Ue&&st){const W=ve(Ge[0]);t.texStorage2D(r.TEXTURE_2D,re,Ce,W.width,W.height)}for(let W=0,K=Ge.length;W<K;W++)pe=Ge[W],Ue?D&&t.texSubImage2D(r.TEXTURE_2D,W,0,0,ue,Ae,pe):t.texImage2D(r.TEXTURE_2D,W,Ce,ue,Ae,pe);v.generateMipmaps=!1}else if(Ue){if(st){const W=ve(J);t.texStorage2D(r.TEXTURE_2D,re,Ce,W.width,W.height)}D&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ue,Ae,J)}else t.texImage2D(r.TEXTURE_2D,0,Ce,ue,Ae,J);m(v)&&p(Y),xe.__version=q.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function ee(w,v,O){if(v.image.length!==6)return;const Y=Fe(w,v),Z=v.source;t.bindTexture(r.TEXTURE_CUBE_MAP,w.__webglTexture,r.TEXTURE0+O);const q=n.get(Z);if(Z.version!==q.__version||Y===!0){t.activeTexture(r.TEXTURE0+O);const xe=We.getPrimaries(We.workingColorSpace),ae=v.colorSpace===kn?null:We.getPrimaries(v.colorSpace),de=v.colorSpace===kn||xe===ae?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,v.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,v.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const $e=v.isCompressedTexture||v.image[0].isCompressedTexture,J=v.image[0]&&v.image[0].isDataTexture,ue=[];for(let K=0;K<6;K++)!$e&&!J?ue[K]=g(v.image[K],!0,i.maxCubemapSize):ue[K]=J?v.image[K].image:v.image[K],ue[K]=et(v,ue[K]);const Ae=ue[0],Ce=s.convert(v.format,v.colorSpace),pe=s.convert(v.type),Ge=E(v.internalFormat,Ce,pe,v.colorSpace),Ue=v.isVideoTexture!==!0,st=q.__version===void 0||Y===!0,D=Z.dataReady;let re=R(v,Ae);Ee(r.TEXTURE_CUBE_MAP,v);let W;if($e){Ue&&st&&t.texStorage2D(r.TEXTURE_CUBE_MAP,re,Ge,Ae.width,Ae.height);for(let K=0;K<6;K++){W=ue[K].mipmaps;for(let ce=0;ce<W.length;ce++){const le=W[ce];v.format!==Zt?Ce!==null?Ue?D&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce,0,0,le.width,le.height,Ce,le.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce,Ge,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ue?D&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce,0,0,le.width,le.height,Ce,pe,le.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce,Ge,le.width,le.height,0,Ce,pe,le.data)}}}else{if(W=v.mipmaps,Ue&&st){W.length>0&&re++;const K=ve(ue[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,re,Ge,K.width,K.height)}for(let K=0;K<6;K++)if(J){Ue?D&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ue[K].width,ue[K].height,Ce,pe,ue[K].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ge,ue[K].width,ue[K].height,0,Ce,pe,ue[K].data);for(let ce=0;ce<W.length;ce++){const Ie=W[ce].image[K].image;Ue?D&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce+1,0,0,Ie.width,Ie.height,Ce,pe,Ie.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce+1,Ge,Ie.width,Ie.height,0,Ce,pe,Ie.data)}}else{Ue?D&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Ce,pe,ue[K]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ge,Ce,pe,ue[K]);for(let ce=0;ce<W.length;ce++){const le=W[ce];Ue?D&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce+1,0,0,Ce,pe,le.image[K]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce+1,Ge,Ce,pe,le.image[K])}}}m(v)&&p(r.TEXTURE_CUBE_MAP),q.__version=Z.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function me(w,v,O,Y,Z,q){const xe=s.convert(O.format,O.colorSpace),ae=s.convert(O.type),de=E(O.internalFormat,xe,ae,O.colorSpace),$e=n.get(v),J=n.get(O);if(J.__renderTarget=v,!$e.__hasExternalTextures){const ue=Math.max(1,v.width>>q),Ae=Math.max(1,v.height>>q);Z===r.TEXTURE_3D||Z===r.TEXTURE_2D_ARRAY?t.texImage3D(Z,q,de,ue,Ae,v.depth,0,xe,ae,null):t.texImage2D(Z,q,de,ue,Ae,0,xe,ae,null)}t.bindFramebuffer(r.FRAMEBUFFER,w),ze(v)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Y,Z,J.__webglTexture,0,ke(v)):(Z===r.TEXTURE_2D||Z>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Y,Z,J.__webglTexture,q),t.bindFramebuffer(r.FRAMEBUFFER,null)}function se(w,v,O){if(r.bindRenderbuffer(r.RENDERBUFFER,w),v.depthBuffer){const Y=v.depthTexture,Z=Y&&Y.isDepthTexture?Y.type:null,q=y(v.stencilBuffer,Z),xe=v.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ae=ke(v);ze(v)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ae,q,v.width,v.height):O?r.renderbufferStorageMultisample(r.RENDERBUFFER,ae,q,v.width,v.height):r.renderbufferStorage(r.RENDERBUFFER,q,v.width,v.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,xe,r.RENDERBUFFER,w)}else{const Y=v.textures;for(let Z=0;Z<Y.length;Z++){const q=Y[Z],xe=s.convert(q.format,q.colorSpace),ae=s.convert(q.type),de=E(q.internalFormat,xe,ae,q.colorSpace),$e=ke(v);O&&ze(v)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,$e,de,v.width,v.height):ze(v)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,$e,de,v.width,v.height):r.renderbufferStorage(r.RENDERBUFFER,de,v.width,v.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Se(w,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,w),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(v.depthTexture);Y.__renderTarget=v,(!Y.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),$(v.depthTexture,0);const Z=Y.__webglTexture,q=ke(v);if(v.depthTexture.format===Ri)ze(v)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Z,0,q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Z,0);else if(v.depthTexture.format===Bi)ze(v)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Z,0,q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Ve(w){const v=n.get(w),O=w.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==w.depthTexture){const Y=w.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Y){const Z=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Y.removeEventListener("dispose",Z)};Y.addEventListener("dispose",Z),v.__depthDisposeCallback=Z}v.__boundDepthTexture=Y}if(w.depthTexture&&!v.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Se(v.__webglFramebuffer,w)}else if(O){v.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(r.FRAMEBUFFER,v.__webglFramebuffer[Y]),v.__webglDepthbuffer[Y]===void 0)v.__webglDepthbuffer[Y]=r.createRenderbuffer(),se(v.__webglDepthbuffer[Y],w,!1);else{const Z=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,q=v.__webglDepthbuffer[Y];r.bindRenderbuffer(r.RENDERBUFFER,q),r.framebufferRenderbuffer(r.FRAMEBUFFER,Z,r.RENDERBUFFER,q)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=r.createRenderbuffer(),se(v.__webglDepthbuffer,w,!1);else{const Y=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Z=v.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Z),r.framebufferRenderbuffer(r.FRAMEBUFFER,Y,r.RENDERBUFFER,Z)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function we(w,v,O){const Y=n.get(w);v!==void 0&&me(Y.__webglFramebuffer,w,w.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),O!==void 0&&Ve(w)}function ot(w){const v=w.texture,O=n.get(w),Y=n.get(v);w.addEventListener("dispose",T);const Z=w.textures,q=w.isWebGLCubeRenderTarget===!0,xe=Z.length>1;if(xe||(Y.__webglTexture===void 0&&(Y.__webglTexture=r.createTexture()),Y.__version=v.version,o.memory.textures++),q){O.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[ae]=[];for(let de=0;de<v.mipmaps.length;de++)O.__webglFramebuffer[ae][de]=r.createFramebuffer()}else O.__webglFramebuffer[ae]=r.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let ae=0;ae<v.mipmaps.length;ae++)O.__webglFramebuffer[ae]=r.createFramebuffer()}else O.__webglFramebuffer=r.createFramebuffer();if(xe)for(let ae=0,de=Z.length;ae<de;ae++){const $e=n.get(Z[ae]);$e.__webglTexture===void 0&&($e.__webglTexture=r.createTexture(),o.memory.textures++)}if(w.samples>0&&ze(w)===!1){O.__webglMultisampledFramebuffer=r.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ae=0;ae<Z.length;ae++){const de=Z[ae];O.__webglColorRenderbuffer[ae]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,O.__webglColorRenderbuffer[ae]);const $e=s.convert(de.format,de.colorSpace),J=s.convert(de.type),ue=E(de.internalFormat,$e,J,de.colorSpace,w.isXRRenderTarget===!0),Ae=ke(w);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ae,ue,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ae,r.RENDERBUFFER,O.__webglColorRenderbuffer[ae])}r.bindRenderbuffer(r.RENDERBUFFER,null),w.depthBuffer&&(O.__webglDepthRenderbuffer=r.createRenderbuffer(),se(O.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(q){t.bindTexture(r.TEXTURE_CUBE_MAP,Y.__webglTexture),Ee(r.TEXTURE_CUBE_MAP,v);for(let ae=0;ae<6;ae++)if(v.mipmaps&&v.mipmaps.length>0)for(let de=0;de<v.mipmaps.length;de++)me(O.__webglFramebuffer[ae][de],w,v,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,de);else me(O.__webglFramebuffer[ae],w,v,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);m(v)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){for(let ae=0,de=Z.length;ae<de;ae++){const $e=Z[ae],J=n.get($e);t.bindTexture(r.TEXTURE_2D,J.__webglTexture),Ee(r.TEXTURE_2D,$e),me(O.__webglFramebuffer,w,$e,r.COLOR_ATTACHMENT0+ae,r.TEXTURE_2D,0),m($e)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let ae=r.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ae=w.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ae,Y.__webglTexture),Ee(ae,v),v.mipmaps&&v.mipmaps.length>0)for(let de=0;de<v.mipmaps.length;de++)me(O.__webglFramebuffer[de],w,v,r.COLOR_ATTACHMENT0,ae,de);else me(O.__webglFramebuffer,w,v,r.COLOR_ATTACHMENT0,ae,0);m(v)&&p(ae),t.unbindTexture()}w.depthBuffer&&Ve(w)}function it(w){const v=w.textures;for(let O=0,Y=v.length;O<Y;O++){const Z=v[O];if(m(Z)){const q=b(w),xe=n.get(Z).__webglTexture;t.bindTexture(q,xe),p(q),t.unbindTexture()}}}const Be=[],L=[];function Pt(w){if(w.samples>0){if(ze(w)===!1){const v=w.textures,O=w.width,Y=w.height;let Z=r.COLOR_BUFFER_BIT;const q=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,xe=n.get(w),ae=v.length>1;if(ae)for(let de=0;de<v.length;de++)t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let de=0;de<v.length;de++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Z|=r.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Z|=r.STENCIL_BUFFER_BIT)),ae){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,xe.__webglColorRenderbuffer[de]);const $e=n.get(v[de]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,$e,0)}r.blitFramebuffer(0,0,O,Y,0,0,O,Y,Z,r.NEAREST),l===!0&&(Be.length=0,L.length=0,Be.push(r.COLOR_ATTACHMENT0+de),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Be.push(q),L.push(q),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,L)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Be))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ae)for(let de=0;de<v.length;de++){t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.RENDERBUFFER,xe.__webglColorRenderbuffer[de]);const $e=n.get(v[de]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.TEXTURE_2D,$e,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const v=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[v])}}}function ke(w){return Math.min(i.maxSamples,w.samples)}function ze(w){const v=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ye(w){const v=o.render.frame;h.get(w)!==v&&(h.set(w,v),w.update())}function et(w,v){const O=w.colorSpace,Y=w.format,Z=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||O!==Mt&&O!==kn&&(We.getTransfer(O)===tt?(Y!==Zt||Z!==Rn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),v}function ve(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=k,this.setTexture2D=$,this.setTexture2DArray=V,this.setTexture3D=j,this.setTextureCube=G,this.rebindTextures=we,this.setupRenderTarget=ot,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=Pt,this.setupDepthRenderbuffer=Ve,this.setupFrameBufferTexture=me,this.useMultisampledRTT=ze}function u_(r,e){function t(n,i=kn){let s;const o=We.getTransfer(i);if(n===Rn)return r.UNSIGNED_BYTE;if(n===ia)return r.UNSIGNED_SHORT_4_4_4_4;if(n===sa)return r.UNSIGNED_SHORT_5_5_5_1;if(n===mc)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===pc)return r.BYTE;if(n===fc)return r.SHORT;if(n===cs)return r.UNSIGNED_SHORT;if(n===na)return r.INT;if(n===ri)return r.UNSIGNED_INT;if(n===zt)return r.FLOAT;if(n===En)return r.HALF_FLOAT;if(n===gc)return r.ALPHA;if(n===_c)return r.RGB;if(n===Zt)return r.RGBA;if(n===yc)return r.LUMINANCE;if(n===xc)return r.LUMINANCE_ALPHA;if(n===Ri)return r.DEPTH_COMPONENT;if(n===Bi)return r.DEPTH_STENCIL;if(n===ra)return r.RED;if(n===oa)return r.RED_INTEGER;if(n===vc)return r.RG;if(n===aa)return r.RG_INTEGER;if(n===la)return r.RGBA_INTEGER;if(n===er||n===tr||n===nr||n===ir)if(o===tt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===er)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===tr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===nr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ir)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===er)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===tr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===nr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ir)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===xo||n===vo||n===bo||n===So)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===xo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===vo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===bo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===So)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Mo||n===Eo||n===wo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Mo||n===Eo)return o===tt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===wo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===To||n===Ao||n===Co||n===Ro||n===Po||n===Lo||n===Io||n===Do||n===Fo||n===Uo||n===No||n===Oo||n===Bo||n===ko)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===To)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ao)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Co)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ro)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Po)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Lo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Io)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Do)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Fo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Uo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===No)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Oo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Bo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ko)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===sr||n===zo||n===Ho)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===sr)return o===tt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===zo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ho)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===bc||n===Vo||n===Go||n===Wo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===sr)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Vo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Go)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Wo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Oi?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const p_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,f_=`
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

}`;class m_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new gt,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Vn({vertexShader:p_,fragmentShader:f_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ht(new gs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class g_ extends Gn{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,_=null;const g=new m_,m=t.getContextAttributes();let p=null,b=null;const E=[],y=[],R=new Te;let P=null;const T=new Ft;T.viewport=new je;const A=new Ft;A.viewport=new je;const M=[T,A],x=new xu;let C=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let ee=E[X];return ee===void 0&&(ee=new Gr,E[X]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(X){let ee=E[X];return ee===void 0&&(ee=new Gr,E[X]=ee),ee.getGripSpace()},this.getHand=function(X){let ee=E[X];return ee===void 0&&(ee=new Gr,E[X]=ee),ee.getHandSpace()};function N(X){const ee=y.indexOf(X.inputSource);if(ee===-1)return;const me=E[ee];me!==void 0&&(me.update(X.inputSource,X.frame,c||o),me.dispatchEvent({type:X.type,data:X.inputSource}))}function H(){i.removeEventListener("select",N),i.removeEventListener("selectstart",N),i.removeEventListener("selectend",N),i.removeEventListener("squeeze",N),i.removeEventListener("squeezestart",N),i.removeEventListener("squeezeend",N),i.removeEventListener("end",H),i.removeEventListener("inputsourceschange",$);for(let X=0;X<E.length;X++){const ee=y[X];ee!==null&&(y[X]=null,E[X].disconnect(ee))}C=null,k=null,g.reset(),e.setRenderTarget(p),f=null,u=null,d=null,i=null,b=null,Fe.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(X){if(i=X,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",N),i.addEventListener("selectstart",N),i.addEventListener("selectend",N),i.addEventListener("squeeze",N),i.addEventListener("squeezestart",N),i.addEventListener("squeezeend",N),i.addEventListener("end",H),i.addEventListener("inputsourceschange",$),m.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(R),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,se=null,Se=null;m.depth&&(Se=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=m.stencil?Bi:Ri,se=m.stencil?Oi:ri);const Ve={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:s};d=new XRWebGLBinding(i,t),u=d.createProjectionLayer(Ve),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),b=new oi(u.textureWidth,u.textureHeight,{format:Zt,type:Rn,depthTexture:new Oc(u.textureWidth,u.textureHeight,se,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const me={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,me),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new oi(f.framebufferWidth,f.framebufferHeight,{format:Zt,type:Rn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Fe.setContext(i),Fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function $(X){for(let ee=0;ee<X.removed.length;ee++){const me=X.removed[ee],se=y.indexOf(me);se>=0&&(y[se]=null,E[se].disconnect(me))}for(let ee=0;ee<X.added.length;ee++){const me=X.added[ee];let se=y.indexOf(me);if(se===-1){for(let Ve=0;Ve<E.length;Ve++)if(Ve>=y.length){y.push(me),se=Ve;break}else if(y[Ve]===null){y[Ve]=me,se=Ve;break}if(se===-1)break}const Se=E[se];Se&&Se.connect(me)}}const V=new I,j=new I;function G(X,ee,me){V.setFromMatrixPosition(ee.matrixWorld),j.setFromMatrixPosition(me.matrixWorld);const se=V.distanceTo(j),Se=ee.projectionMatrix.elements,Ve=me.projectionMatrix.elements,we=Se[14]/(Se[10]-1),ot=Se[14]/(Se[10]+1),it=(Se[9]+1)/Se[5],Be=(Se[9]-1)/Se[5],L=(Se[8]-1)/Se[0],Pt=(Ve[8]+1)/Ve[0],ke=we*L,ze=we*Pt,ye=se/(-L+Pt),et=ye*-L;if(ee.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(et),X.translateZ(ye),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Se[10]===-1)X.projectionMatrix.copy(ee.projectionMatrix),X.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const ve=we+ye,w=ot+ye,v=ke-et,O=ze+(se-et),Y=it*ot/w*ve,Z=Be*ot/w*ve;X.projectionMatrix.makePerspective(v,O,Y,Z,ve,w),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function te(X,ee){ee===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(ee.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(i===null)return;let ee=X.near,me=X.far;g.texture!==null&&(g.depthNear>0&&(ee=g.depthNear),g.depthFar>0&&(me=g.depthFar)),x.near=A.near=T.near=ee,x.far=A.far=T.far=me,(C!==x.near||k!==x.far)&&(i.updateRenderState({depthNear:x.near,depthFar:x.far}),C=x.near,k=x.far),T.layers.mask=X.layers.mask|2,A.layers.mask=X.layers.mask|4,x.layers.mask=T.layers.mask|A.layers.mask;const se=X.parent,Se=x.cameras;te(x,se);for(let Ve=0;Ve<Se.length;Ve++)te(Se[Ve],se);Se.length===2?G(x,T,A):x.projectionMatrix.copy(T.projectionMatrix),ne(X,x,se)};function ne(X,ee,me){me===null?X.matrix.copy(ee.matrixWorld):(X.matrix.copy(me.matrixWorld),X.matrix.invert(),X.matrix.multiply(ee.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(ee.projectionMatrix),X.projectionMatrixInverse.copy(ee.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=ki*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(X){l=X,u!==null&&(u.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(x)};let _e=null;function Ee(X,ee){if(h=ee.getViewerPose(c||o),_=ee,h!==null){const me=h.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let se=!1;me.length!==x.cameras.length&&(x.cameras.length=0,se=!0);for(let we=0;we<me.length;we++){const ot=me[we];let it=null;if(f!==null)it=f.getViewport(ot);else{const L=d.getViewSubImage(u,ot);it=L.viewport,we===0&&(e.setRenderTargetTextures(b,L.colorTexture,u.ignoreDepthValues?void 0:L.depthStencilTexture),e.setRenderTarget(b))}let Be=M[we];Be===void 0&&(Be=new Ft,Be.layers.enable(we),Be.viewport=new je,M[we]=Be),Be.matrix.fromArray(ot.transform.matrix),Be.matrix.decompose(Be.position,Be.quaternion,Be.scale),Be.projectionMatrix.fromArray(ot.projectionMatrix),Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(),Be.viewport.set(it.x,it.y,it.width,it.height),we===0&&(x.matrix.copy(Be.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),se===!0&&x.cameras.push(Be)}const Se=i.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&d){const we=d.getDepthInformation(me[0]);we&&we.isValid&&we.texture&&g.init(e,we,i.renderState)}}for(let me=0;me<E.length;me++){const se=y[me],Se=E[me];se!==null&&Se!==void 0&&Se.update(se,ee,c||o)}_e&&_e(X,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),_=null}const Fe=new Wc;Fe.setAnimationLoop(Ee),this.setAnimationLoop=function(X){_e=X},this.dispose=function(){}}}const Zn=new dn,__=new Le;function y_(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Lc(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,b,E,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,b,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ct&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ct&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=e.get(p),E=b.envMap,y=b.envMapRotation;E&&(m.envMap.value=E,Zn.copy(y),Zn.x*=-1,Zn.y*=-1,Zn.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Zn.y*=-1,Zn.z*=-1),m.envMapRotation.value.setFromMatrix4(__.makeRotationFromEuler(Zn)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=E*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ct&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function x_(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,E){const y=E.program;n.uniformBlockBinding(b,y)}function c(b,E){let y=i[b.id];y===void 0&&(_(b),y=h(b),i[b.id]=y,b.addEventListener("dispose",m));const R=E.program;n.updateUBOMapping(b,R);const P=e.render.frame;s[b.id]!==P&&(u(b),s[b.id]=P)}function h(b){const E=d();b.__bindingPointIndex=E;const y=r.createBuffer(),R=b.__size,P=b.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,R,P),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,E,y),y}function d(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(b){const E=i[b.id],y=b.uniforms,R=b.__cache;r.bindBuffer(r.UNIFORM_BUFFER,E);for(let P=0,T=y.length;P<T;P++){const A=Array.isArray(y[P])?y[P]:[y[P]];for(let M=0,x=A.length;M<x;M++){const C=A[M];if(f(C,P,M,R)===!0){const k=C.__offset,N=Array.isArray(C.value)?C.value:[C.value];let H=0;for(let $=0;$<N.length;$++){const V=N[$],j=g(V);typeof V=="number"||typeof V=="boolean"?(C.__data[0]=V,r.bufferSubData(r.UNIFORM_BUFFER,k+H,C.__data)):V.isMatrix3?(C.__data[0]=V.elements[0],C.__data[1]=V.elements[1],C.__data[2]=V.elements[2],C.__data[3]=0,C.__data[4]=V.elements[3],C.__data[5]=V.elements[4],C.__data[6]=V.elements[5],C.__data[7]=0,C.__data[8]=V.elements[6],C.__data[9]=V.elements[7],C.__data[10]=V.elements[8],C.__data[11]=0):(V.toArray(C.__data,H),H+=j.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,k,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(b,E,y,R){const P=b.value,T=E+"_"+y;if(R[T]===void 0)return typeof P=="number"||typeof P=="boolean"?R[T]=P:R[T]=P.clone(),!0;{const A=R[T];if(typeof P=="number"||typeof P=="boolean"){if(A!==P)return R[T]=P,!0}else if(A.equals(P)===!1)return A.copy(P),!0}return!1}function _(b){const E=b.uniforms;let y=0;const R=16;for(let T=0,A=E.length;T<A;T++){const M=Array.isArray(E[T])?E[T]:[E[T]];for(let x=0,C=M.length;x<C;x++){const k=M[x],N=Array.isArray(k.value)?k.value:[k.value];for(let H=0,$=N.length;H<$;H++){const V=N[H],j=g(V),G=y%R,te=G%j.boundary,ne=G+te;y+=te,ne!==0&&R-ne<j.storage&&(y+=R-ne),k.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=j.storage}}}const P=y%R;return P>0&&(y+=R-P),b.__size=y,b.__cache={},this}function g(b){const E={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(E.boundary=4,E.storage=4):b.isVector2?(E.boundary=8,E.storage=8):b.isVector3||b.isColor?(E.boundary=16,E.storage=12):b.isVector4?(E.boundary=16,E.storage=16):b.isMatrix3?(E.boundary=48,E.storage=48):b.isMatrix4?(E.boundary=64,E.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),E}function m(b){const E=b.target;E.removeEventListener("dispose",m);const y=o.indexOf(E.__bindingPointIndex);o.splice(y,1),r.deleteBuffer(i[E.id]),delete i[E.id],delete s[E.id]}function p(){for(const b in i)r.deleteBuffer(i[b]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class Yc{constructor(e={}){const{canvas:t=hd(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const b=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=mt,this.toneMapping=Hn,this.toneMappingExposure=1;const y=this;let R=!1,P=0,T=0,A=null,M=-1,x=null;const C=new je,k=new je;let N=null;const H=new ge(0);let $=0,V=t.width,j=t.height,G=1,te=null,ne=null;const _e=new je(0,0,V,j),Ee=new je(0,0,V,j);let Fe=!1;const X=new ga;let ee=!1,me=!1;this.transmissionResolutionScale=1;const se=new Le,Se=new Le,Ve=new I,we=new je,ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let it=!1;function Be(){return A===null?G:1}let L=n;function Pt(S,F){return t.getContext(S,F)}try{const S={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ta}`),t.addEventListener("webglcontextlost",K,!1),t.addEventListener("webglcontextrestored",ce,!1),t.addEventListener("webglcontextcreationerror",le,!1),L===null){const F="webgl2";if(L=Pt(F,S),L===null)throw Pt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let ke,ze,ye,et,ve,w,v,O,Y,Z,q,xe,ae,de,$e,J,ue,Ae,Ce,pe,Ge,Ue,st,D;function re(){ke=new Pm(L),ke.init(),Ue=new u_(L,ke),ze=new Mm(L,ke,e,Ue),ye=new h_(L,ke),ze.reverseDepthBuffer&&u&&ye.buffers.depth.setReversed(!0),et=new Dm(L),ve=new Zg,w=new d_(L,ke,ye,ve,ze,Ue,et),v=new wm(y),O=new Rm(y),Y=new Bu(L),st=new bm(L,Y),Z=new Lm(L,Y,et,st),q=new Um(L,Z,Y,et),Ce=new Fm(L,ze,w),J=new Em(ve),xe=new Kg(y,v,O,ke,ze,st,J),ae=new y_(y,ve),de=new Jg,$e=new r_(ke),Ae=new vm(y,v,O,ye,q,f,l),ue=new l_(y,q,ze),D=new x_(L,et,ze,ye),pe=new Sm(L,ke,et),Ge=new Im(L,ke,et),et.programs=xe.programs,y.capabilities=ze,y.extensions=ke,y.properties=ve,y.renderLists=de,y.shadowMap=ue,y.state=ye,y.info=et}re();const W=new g_(y,L);this.xr=W,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const S=ke.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=ke.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(S){S!==void 0&&(G=S,this.setSize(V,j,!1))},this.getSize=function(S){return S.set(V,j)},this.setSize=function(S,F,B=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=S,j=F,t.width=Math.floor(S*G),t.height=Math.floor(F*G),B===!0&&(t.style.width=S+"px",t.style.height=F+"px"),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(V*G,j*G).floor()},this.setDrawingBufferSize=function(S,F,B){V=S,j=F,G=B,t.width=Math.floor(S*B),t.height=Math.floor(F*B),this.setViewport(0,0,S,F)},this.getCurrentViewport=function(S){return S.copy(C)},this.getViewport=function(S){return S.copy(_e)},this.setViewport=function(S,F,B,z){S.isVector4?_e.set(S.x,S.y,S.z,S.w):_e.set(S,F,B,z),ye.viewport(C.copy(_e).multiplyScalar(G).round())},this.getScissor=function(S){return S.copy(Ee)},this.setScissor=function(S,F,B,z){S.isVector4?Ee.set(S.x,S.y,S.z,S.w):Ee.set(S,F,B,z),ye.scissor(k.copy(Ee).multiplyScalar(G).round())},this.getScissorTest=function(){return Fe},this.setScissorTest=function(S){ye.setScissorTest(Fe=S)},this.setOpaqueSort=function(S){te=S},this.setTransparentSort=function(S){ne=S},this.getClearColor=function(S){return S.copy(Ae.getClearColor())},this.setClearColor=function(){Ae.setClearColor(...arguments)},this.getClearAlpha=function(){return Ae.getClearAlpha()},this.setClearAlpha=function(){Ae.setClearAlpha(...arguments)},this.clear=function(S=!0,F=!0,B=!0){let z=0;if(S){let U=!1;if(A!==null){const Q=A.texture.format;U=Q===la||Q===aa||Q===oa}if(U){const Q=A.texture.type,oe=Q===Rn||Q===ri||Q===cs||Q===Oi||Q===ia||Q===sa,he=Ae.getClearColor(),fe=Ae.getClearAlpha(),Re=he.r,Pe=he.g,be=he.b;oe?(_[0]=Re,_[1]=Pe,_[2]=be,_[3]=fe,L.clearBufferuiv(L.COLOR,0,_)):(g[0]=Re,g[1]=Pe,g[2]=be,g[3]=fe,L.clearBufferiv(L.COLOR,0,g))}else z|=L.COLOR_BUFFER_BIT}F&&(z|=L.DEPTH_BUFFER_BIT),B&&(z|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",K,!1),t.removeEventListener("webglcontextrestored",ce,!1),t.removeEventListener("webglcontextcreationerror",le,!1),Ae.dispose(),de.dispose(),$e.dispose(),ve.dispose(),v.dispose(),O.dispose(),q.dispose(),st.dispose(),D.dispose(),xe.dispose(),W.dispose(),W.removeEventListener("sessionstart",Ca),W.removeEventListener("sessionend",Ra),Wn.stop()};function K(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function ce(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const S=et.autoReset,F=ue.enabled,B=ue.autoUpdate,z=ue.needsUpdate,U=ue.type;re(),et.autoReset=S,ue.enabled=F,ue.autoUpdate=B,ue.needsUpdate=z,ue.type=U}function le(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Ie(S){const F=S.target;F.removeEventListener("dispose",Ie),ht(F)}function ht(S){Et(S),ve.remove(S)}function Et(S){const F=ve.get(S).programs;F!==void 0&&(F.forEach(function(B){xe.releaseProgram(B)}),S.isShaderMaterial&&xe.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,B,z,U,Q){F===null&&(F=ot);const oe=U.isMesh&&U.matrixWorld.determinant()<0,he=Jc(S,F,B,z,U);ye.setMaterial(z,oe);let fe=B.index,Re=1;if(z.wireframe===!0){if(fe=Z.getWireframeAttribute(B),fe===void 0)return;Re=2}const Pe=B.drawRange,be=B.attributes.position;let Xe=Pe.start*Re,Ye=(Pe.start+Pe.count)*Re;Q!==null&&(Xe=Math.max(Xe,Q.start*Re),Ye=Math.min(Ye,(Q.start+Q.count)*Re)),fe!==null?(Xe=Math.max(Xe,0),Ye=Math.min(Ye,fe.count)):be!=null&&(Xe=Math.max(Xe,0),Ye=Math.min(Ye,be.count));const ut=Ye-Xe;if(ut<0||ut===1/0)return;st.setup(U,z,he,B,fe);let dt,qe=pe;if(fe!==null&&(dt=Y.get(fe),qe=Ge,qe.setIndex(dt)),U.isMesh)z.wireframe===!0?(ye.setLineWidth(z.wireframeLinewidth*Be()),qe.setMode(L.LINES)):qe.setMode(L.TRIANGLES);else if(U.isLine){let Me=z.linewidth;Me===void 0&&(Me=1),ye.setLineWidth(Me*Be()),U.isLineSegments?qe.setMode(L.LINES):U.isLineLoop?qe.setMode(L.LINE_LOOP):qe.setMode(L.LINE_STRIP)}else U.isPoints?qe.setMode(L.POINTS):U.isSprite&&qe.setMode(L.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)Jn("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),qe.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(ke.get("WEBGL_multi_draw"))qe.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Me=U._multiDrawStarts,vt=U._multiDrawCounts,Ke=U._multiDrawCount,Jt=fe?Y.get(fe).bytesPerElement:1,li=ve.get(z).currentProgram.getUniforms();for(let Vt=0;Vt<Ke;Vt++)li.setValue(L,"_gl_DrawID",Vt),qe.render(Me[Vt]/Jt,vt[Vt])}else if(U.isInstancedMesh)qe.renderInstances(Xe,ut,U.count);else if(B.isInstancedBufferGeometry){const Me=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,vt=Math.min(B.instanceCount,Me);qe.renderInstances(Xe,ut,vt)}else qe.render(Xe,ut)};function Qe(S,F,B){S.transparent===!0&&S.side===rt&&S.forceSinglePass===!1?(S.side=Ct,S.needsUpdate=!0,xs(S,F,B),S.side=At,S.needsUpdate=!0,xs(S,F,B),S.side=rt):xs(S,F,B)}this.compile=function(S,F,B=null){B===null&&(B=S),p=$e.get(B),p.init(F),E.push(p),B.traverseVisible(function(U){U.isLight&&U.layers.test(F.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),S!==B&&S.traverseVisible(function(U){U.isLight&&U.layers.test(F.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),p.setupLights();const z=new Set;return S.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const Q=U.material;if(Q)if(Array.isArray(Q))for(let oe=0;oe<Q.length;oe++){const he=Q[oe];Qe(he,B,U),z.add(he)}else Qe(Q,B,U),z.add(Q)}),p=E.pop(),z},this.compileAsync=function(S,F,B=null){const z=this.compile(S,F,B);return new Promise(U=>{function Q(){if(z.forEach(function(oe){ve.get(oe).currentProgram.isReady()&&z.delete(oe)}),z.size===0){U(S);return}setTimeout(Q,10)}ke.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let Qt=null;function fn(S){Qt&&Qt(S)}function Ca(){Wn.stop()}function Ra(){Wn.start()}const Wn=new Wc;Wn.setAnimationLoop(fn),typeof self<"u"&&Wn.setContext(self),this.setAnimationLoop=function(S){Qt=S,W.setAnimationLoop(S),S===null?Wn.stop():Wn.start()},W.addEventListener("sessionstart",Ca),W.addEventListener("sessionend",Ra),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(F),F=W.getCamera()),S.isScene===!0&&S.onBeforeRender(y,S,F,A),p=$e.get(S,E.length),p.init(F),E.push(p),Se.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),X.setFromProjectionMatrix(Se),me=this.localClippingEnabled,ee=J.init(this.clippingPlanes,me),m=de.get(S,b.length),m.init(),b.push(m),W.enabled===!0&&W.isPresenting===!0){const Q=y.xr.getDepthSensingMesh();Q!==null&&br(Q,F,-1/0,y.sortObjects)}br(S,F,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(te,ne),it=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,it&&Ae.addToRenderList(m,S),this.info.render.frame++,ee===!0&&J.beginShadows();const B=p.state.shadowsArray;ue.render(B,S,F),ee===!0&&J.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=m.opaque,U=m.transmissive;if(p.setupLights(),F.isArrayCamera){const Q=F.cameras;if(U.length>0)for(let oe=0,he=Q.length;oe<he;oe++){const fe=Q[oe];La(z,U,S,fe)}it&&Ae.render(S);for(let oe=0,he=Q.length;oe<he;oe++){const fe=Q[oe];Pa(m,S,fe,fe.viewport)}}else U.length>0&&La(z,U,S,F),it&&Ae.render(S),Pa(m,S,F);A!==null&&T===0&&(w.updateMultisampleRenderTarget(A),w.updateRenderTargetMipmap(A)),S.isScene===!0&&S.onAfterRender(y,S,F),st.resetDefaultState(),M=-1,x=null,E.pop(),E.length>0?(p=E[E.length-1],ee===!0&&J.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function br(S,F,B,z){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)B=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||X.intersectsSprite(S)){z&&we.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Se);const oe=q.update(S),he=S.material;he.visible&&m.push(S,oe,he,B,we.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||X.intersectsObject(S))){const oe=q.update(S),he=S.material;if(z&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),we.copy(S.boundingSphere.center)):(oe.boundingSphere===null&&oe.computeBoundingSphere(),we.copy(oe.boundingSphere.center)),we.applyMatrix4(S.matrixWorld).applyMatrix4(Se)),Array.isArray(he)){const fe=oe.groups;for(let Re=0,Pe=fe.length;Re<Pe;Re++){const be=fe[Re],Xe=he[be.materialIndex];Xe&&Xe.visible&&m.push(S,oe,Xe,B,we.z,be)}}else he.visible&&m.push(S,oe,he,B,we.z,null)}}const Q=S.children;for(let oe=0,he=Q.length;oe<he;oe++)br(Q[oe],F,B,z)}function Pa(S,F,B,z){const U=S.opaque,Q=S.transmissive,oe=S.transparent;p.setupLightsView(B),ee===!0&&J.setGlobalState(y.clippingPlanes,B),z&&ye.viewport(C.copy(z)),U.length>0&&ys(U,F,B),Q.length>0&&ys(Q,F,B),oe.length>0&&ys(oe,F,B),ye.buffers.depth.setTest(!0),ye.buffers.depth.setMask(!0),ye.buffers.color.setMask(!0),ye.setPolygonOffset(!1)}function La(S,F,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new oi(1,1,{generateMipmaps:!0,type:ke.has("EXT_color_buffer_half_float")||ke.has("EXT_color_buffer_float")?En:Rn,minFilter:cn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:We.workingColorSpace}));const Q=p.state.transmissionRenderTarget[z.id],oe=z.viewport||C;Q.setSize(oe.z*y.transmissionResolutionScale,oe.w*y.transmissionResolutionScale);const he=y.getRenderTarget();y.setRenderTarget(Q),y.getClearColor(H),$=y.getClearAlpha(),$<1&&y.setClearColor(16777215,.5),y.clear(),it&&Ae.render(B);const fe=y.toneMapping;y.toneMapping=Hn;const Re=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),ee===!0&&J.setGlobalState(y.clippingPlanes,z),ys(S,B,z),w.updateMultisampleRenderTarget(Q),w.updateRenderTargetMipmap(Q),ke.has("WEBGL_multisampled_render_to_texture")===!1){let Pe=!1;for(let be=0,Xe=F.length;be<Xe;be++){const Ye=F[be],ut=Ye.object,dt=Ye.geometry,qe=Ye.material,Me=Ye.group;if(qe.side===rt&&ut.layers.test(z.layers)){const vt=qe.side;qe.side=Ct,qe.needsUpdate=!0,Ia(ut,B,z,dt,qe,Me),qe.side=vt,qe.needsUpdate=!0,Pe=!0}}Pe===!0&&(w.updateMultisampleRenderTarget(Q),w.updateRenderTargetMipmap(Q))}y.setRenderTarget(he),y.setClearColor(H,$),Re!==void 0&&(z.viewport=Re),y.toneMapping=fe}function ys(S,F,B){const z=F.isScene===!0?F.overrideMaterial:null;for(let U=0,Q=S.length;U<Q;U++){const oe=S[U],he=oe.object,fe=oe.geometry,Re=z===null?oe.material:z,Pe=oe.group;he.layers.test(B.layers)&&Ia(he,F,B,fe,Re,Pe)}}function Ia(S,F,B,z,U,Q){S.onBeforeRender(y,F,B,z,U,Q),S.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),U.onBeforeRender(y,F,B,z,S,Q),U.transparent===!0&&U.side===rt&&U.forceSinglePass===!1?(U.side=Ct,U.needsUpdate=!0,y.renderBufferDirect(B,F,z,U,S,Q),U.side=At,U.needsUpdate=!0,y.renderBufferDirect(B,F,z,U,S,Q),U.side=rt):y.renderBufferDirect(B,F,z,U,S,Q),S.onAfterRender(y,F,B,z,U,Q)}function xs(S,F,B){F.isScene!==!0&&(F=ot);const z=ve.get(S),U=p.state.lights,Q=p.state.shadowsArray,oe=U.state.version,he=xe.getParameters(S,U.state,Q,F,B),fe=xe.getProgramCacheKey(he);let Re=z.programs;z.environment=S.isMeshStandardMaterial?F.environment:null,z.fog=F.fog,z.envMap=(S.isMeshStandardMaterial?O:v).get(S.envMap||z.environment),z.envMapRotation=z.environment!==null&&S.envMap===null?F.environmentRotation:S.envMapRotation,Re===void 0&&(S.addEventListener("dispose",Ie),Re=new Map,z.programs=Re);let Pe=Re.get(fe);if(Pe!==void 0){if(z.currentProgram===Pe&&z.lightsStateVersion===oe)return Fa(S,he),Pe}else he.uniforms=xe.getUniforms(S),S.onBeforeCompile(he,y),Pe=xe.acquireProgram(he,fe),Re.set(fe,Pe),z.uniforms=he.uniforms;const be=z.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(be.clippingPlanes=J.uniform),Fa(S,he),z.needsLights=th(S),z.lightsStateVersion=oe,z.needsLights&&(be.ambientLightColor.value=U.state.ambient,be.lightProbe.value=U.state.probe,be.directionalLights.value=U.state.directional,be.directionalLightShadows.value=U.state.directionalShadow,be.spotLights.value=U.state.spot,be.spotLightShadows.value=U.state.spotShadow,be.rectAreaLights.value=U.state.rectArea,be.ltc_1.value=U.state.rectAreaLTC1,be.ltc_2.value=U.state.rectAreaLTC2,be.pointLights.value=U.state.point,be.pointLightShadows.value=U.state.pointShadow,be.hemisphereLights.value=U.state.hemi,be.directionalShadowMap.value=U.state.directionalShadowMap,be.directionalShadowMatrix.value=U.state.directionalShadowMatrix,be.spotShadowMap.value=U.state.spotShadowMap,be.spotLightMatrix.value=U.state.spotLightMatrix,be.spotLightMap.value=U.state.spotLightMap,be.pointShadowMap.value=U.state.pointShadowMap,be.pointShadowMatrix.value=U.state.pointShadowMatrix),z.currentProgram=Pe,z.uniformsList=null,Pe}function Da(S){if(S.uniformsList===null){const F=S.currentProgram.getUniforms();S.uniformsList=rr.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function Fa(S,F){const B=ve.get(S);B.outputColorSpace=F.outputColorSpace,B.batching=F.batching,B.batchingColor=F.batchingColor,B.instancing=F.instancing,B.instancingColor=F.instancingColor,B.instancingMorph=F.instancingMorph,B.skinning=F.skinning,B.morphTargets=F.morphTargets,B.morphNormals=F.morphNormals,B.morphColors=F.morphColors,B.morphTargetsCount=F.morphTargetsCount,B.numClippingPlanes=F.numClippingPlanes,B.numIntersection=F.numClipIntersection,B.vertexAlphas=F.vertexAlphas,B.vertexTangents=F.vertexTangents,B.toneMapping=F.toneMapping}function Jc(S,F,B,z,U){F.isScene!==!0&&(F=ot),w.resetTextureUnits();const Q=F.fog,oe=z.isMeshStandardMaterial?F.environment:null,he=A===null?y.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Mt,fe=(z.isMeshStandardMaterial?O:v).get(z.envMap||oe),Re=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Pe=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),be=!!B.morphAttributes.position,Xe=!!B.morphAttributes.normal,Ye=!!B.morphAttributes.color;let ut=Hn;z.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(ut=y.toneMapping);const dt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,qe=dt!==void 0?dt.length:0,Me=ve.get(z),vt=p.state.lights;if(ee===!0&&(me===!0||S!==x)){const Lt=S===x&&z.id===M;J.setState(z,S,Lt)}let Ke=!1;z.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==vt.state.version||Me.outputColorSpace!==he||U.isBatchedMesh&&Me.batching===!1||!U.isBatchedMesh&&Me.batching===!0||U.isBatchedMesh&&Me.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Me.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Me.instancing===!1||!U.isInstancedMesh&&Me.instancing===!0||U.isSkinnedMesh&&Me.skinning===!1||!U.isSkinnedMesh&&Me.skinning===!0||U.isInstancedMesh&&Me.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Me.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Me.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Me.instancingMorph===!1&&U.morphTexture!==null||Me.envMap!==fe||z.fog===!0&&Me.fog!==Q||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==J.numPlanes||Me.numIntersection!==J.numIntersection)||Me.vertexAlphas!==Re||Me.vertexTangents!==Pe||Me.morphTargets!==be||Me.morphNormals!==Xe||Me.morphColors!==Ye||Me.toneMapping!==ut||Me.morphTargetsCount!==qe)&&(Ke=!0):(Ke=!0,Me.__version=z.version);let Jt=Me.currentProgram;Ke===!0&&(Jt=xs(z,F,U));let li=!1,Vt=!1,ji=!1;const at=Jt.getUniforms(),Xt=Me.uniforms;if(ye.useProgram(Jt.program)&&(li=!0,Vt=!0,ji=!0),z.id!==M&&(M=z.id,Vt=!0),li||x!==S){ye.buffers.depth.getReversed()?(se.copy(S.projectionMatrix),ud(se),pd(se),at.setValue(L,"projectionMatrix",se)):at.setValue(L,"projectionMatrix",S.projectionMatrix),at.setValue(L,"viewMatrix",S.matrixWorldInverse);const Bt=at.map.cameraPosition;Bt!==void 0&&Bt.setValue(L,Ve.setFromMatrixPosition(S.matrixWorld)),ze.logarithmicDepthBuffer&&at.setValue(L,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&at.setValue(L,"isOrthographic",S.isOrthographicCamera===!0),x!==S&&(x=S,Vt=!0,ji=!0)}if(U.isSkinnedMesh){at.setOptional(L,U,"bindMatrix"),at.setOptional(L,U,"bindMatrixInverse");const Lt=U.skeleton;Lt&&(Lt.boneTexture===null&&Lt.computeBoneTexture(),at.setValue(L,"boneTexture",Lt.boneTexture,w))}U.isBatchedMesh&&(at.setOptional(L,U,"batchingTexture"),at.setValue(L,"batchingTexture",U._matricesTexture,w),at.setOptional(L,U,"batchingIdTexture"),at.setValue(L,"batchingIdTexture",U._indirectTexture,w),at.setOptional(L,U,"batchingColorTexture"),U._colorsTexture!==null&&at.setValue(L,"batchingColorTexture",U._colorsTexture,w));const qt=B.morphAttributes;if((qt.position!==void 0||qt.normal!==void 0||qt.color!==void 0)&&Ce.update(U,B,Jt),(Vt||Me.receiveShadow!==U.receiveShadow)&&(Me.receiveShadow=U.receiveShadow,at.setValue(L,"receiveShadow",U.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Xt.envMap.value=fe,Xt.flipEnvMap.value=fe.isCubeTexture&&fe.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&F.environment!==null&&(Xt.envMapIntensity.value=F.environmentIntensity),Vt&&(at.setValue(L,"toneMappingExposure",y.toneMappingExposure),Me.needsLights&&eh(Xt,ji),Q&&z.fog===!0&&ae.refreshFogUniforms(Xt,Q),ae.refreshMaterialUniforms(Xt,z,G,j,p.state.transmissionRenderTarget[S.id]),rr.upload(L,Da(Me),Xt,w)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(rr.upload(L,Da(Me),Xt,w),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&at.setValue(L,"center",U.center),at.setValue(L,"modelViewMatrix",U.modelViewMatrix),at.setValue(L,"normalMatrix",U.normalMatrix),at.setValue(L,"modelMatrix",U.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Lt=z.uniformsGroups;for(let Bt=0,Sr=Lt.length;Bt<Sr;Bt++){const $n=Lt[Bt];D.update($n,Jt),D.bind($n,Jt)}}return Jt}function eh(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function th(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(S,F,B){ve.get(S.texture).__webglTexture=F,ve.get(S.depthTexture).__webglTexture=B;const z=ve.get(S);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=B===void 0,z.__autoAllocateDepthBuffer||ke.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,F){const B=ve.get(S);B.__webglFramebuffer=F,B.__useDefaultFramebuffer=F===void 0};const nh=L.createFramebuffer();this.setRenderTarget=function(S,F=0,B=0){A=S,P=F,T=B;let z=!0,U=null,Q=!1,oe=!1;if(S){const fe=ve.get(S);if(fe.__useDefaultFramebuffer!==void 0)ye.bindFramebuffer(L.FRAMEBUFFER,null),z=!1;else if(fe.__webglFramebuffer===void 0)w.setupRenderTarget(S);else if(fe.__hasExternalTextures)w.rebindTextures(S,ve.get(S.texture).__webglTexture,ve.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const be=S.depthTexture;if(fe.__boundDepthTexture!==be){if(be!==null&&ve.has(be)&&(S.width!==be.image.width||S.height!==be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(S)}}const Re=S.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(oe=!0);const Pe=ve.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Pe[F])?U=Pe[F][B]:U=Pe[F],Q=!0):S.samples>0&&w.useMultisampledRTT(S)===!1?U=ve.get(S).__webglMultisampledFramebuffer:Array.isArray(Pe)?U=Pe[B]:U=Pe,C.copy(S.viewport),k.copy(S.scissor),N=S.scissorTest}else C.copy(_e).multiplyScalar(G).floor(),k.copy(Ee).multiplyScalar(G).floor(),N=Fe;if(B!==0&&(U=nh),ye.bindFramebuffer(L.FRAMEBUFFER,U)&&z&&ye.drawBuffers(S,U),ye.viewport(C),ye.scissor(k),ye.setScissorTest(N),Q){const fe=ve.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+F,fe.__webglTexture,B)}else if(oe){const fe=ve.get(S.texture),Re=F;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,fe.__webglTexture,B,Re)}else if(S!==null&&B!==0){const fe=ve.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,fe.__webglTexture,B)}M=-1},this.readRenderTargetPixels=function(S,F,B,z,U,Q,oe){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let he=ve.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&oe!==void 0&&(he=he[oe]),he){ye.bindFramebuffer(L.FRAMEBUFFER,he);try{const fe=S.texture,Re=fe.format,Pe=fe.type;if(!ze.textureFormatReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ze.textureTypeReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-z&&B>=0&&B<=S.height-U&&L.readPixels(F,B,z,U,Ue.convert(Re),Ue.convert(Pe),Q)}finally{const fe=A!==null?ve.get(A).__webglFramebuffer:null;ye.bindFramebuffer(L.FRAMEBUFFER,fe)}}},this.readRenderTargetPixelsAsync=async function(S,F,B,z,U,Q,oe){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let he=ve.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&oe!==void 0&&(he=he[oe]),he){const fe=S.texture,Re=fe.format,Pe=fe.type;if(!ze.textureFormatReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ze.textureTypeReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=S.width-z&&B>=0&&B<=S.height-U){ye.bindFramebuffer(L.FRAMEBUFFER,he);const be=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,be),L.bufferData(L.PIXEL_PACK_BUFFER,Q.byteLength,L.STREAM_READ),L.readPixels(F,B,z,U,Ue.convert(Re),Ue.convert(Pe),0);const Xe=A!==null?ve.get(A).__webglFramebuffer:null;ye.bindFramebuffer(L.FRAMEBUFFER,Xe);const Ye=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await dd(L,Ye,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,be),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,Q),L.deleteBuffer(be),L.deleteSync(Ye),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,F=null,B=0){S.isTexture!==!0&&(Jn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,S=arguments[1]);const z=Math.pow(2,-B),U=Math.floor(S.image.width*z),Q=Math.floor(S.image.height*z),oe=F!==null?F.x:0,he=F!==null?F.y:0;w.setTexture2D(S,0),L.copyTexSubImage2D(L.TEXTURE_2D,B,0,0,oe,he,U,Q),ye.unbindTexture()};const ih=L.createFramebuffer(),sh=L.createFramebuffer();this.copyTextureToTexture=function(S,F,B=null,z=null,U=0,Q=null){S.isTexture!==!0&&(Jn("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,S=arguments[1],F=arguments[2],Q=arguments[3]||0,B=null),Q===null&&(U!==0?(Jn("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=U,U=0):Q=0);let oe,he,fe,Re,Pe,be,Xe,Ye,ut;const dt=S.isCompressedTexture?S.mipmaps[Q]:S.image;if(B!==null)oe=B.max.x-B.min.x,he=B.max.y-B.min.y,fe=B.isBox3?B.max.z-B.min.z:1,Re=B.min.x,Pe=B.min.y,be=B.isBox3?B.min.z:0;else{const qt=Math.pow(2,-U);oe=Math.floor(dt.width*qt),he=Math.floor(dt.height*qt),S.isDataArrayTexture?fe=dt.depth:S.isData3DTexture?fe=Math.floor(dt.depth*qt):fe=1,Re=0,Pe=0,be=0}z!==null?(Xe=z.x,Ye=z.y,ut=z.z):(Xe=0,Ye=0,ut=0);const qe=Ue.convert(F.format),Me=Ue.convert(F.type);let vt;F.isData3DTexture?(w.setTexture3D(F,0),vt=L.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(w.setTexture2DArray(F,0),vt=L.TEXTURE_2D_ARRAY):(w.setTexture2D(F,0),vt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,F.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,F.unpackAlignment);const Ke=L.getParameter(L.UNPACK_ROW_LENGTH),Jt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),li=L.getParameter(L.UNPACK_SKIP_PIXELS),Vt=L.getParameter(L.UNPACK_SKIP_ROWS),ji=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,dt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,dt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Re),L.pixelStorei(L.UNPACK_SKIP_ROWS,Pe),L.pixelStorei(L.UNPACK_SKIP_IMAGES,be);const at=S.isDataArrayTexture||S.isData3DTexture,Xt=F.isDataArrayTexture||F.isData3DTexture;if(S.isDepthTexture){const qt=ve.get(S),Lt=ve.get(F),Bt=ve.get(qt.__renderTarget),Sr=ve.get(Lt.__renderTarget);ye.bindFramebuffer(L.READ_FRAMEBUFFER,Bt.__webglFramebuffer),ye.bindFramebuffer(L.DRAW_FRAMEBUFFER,Sr.__webglFramebuffer);for(let $n=0;$n<fe;$n++)at&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ve.get(S).__webglTexture,U,be+$n),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ve.get(F).__webglTexture,Q,ut+$n)),L.blitFramebuffer(Re,Pe,oe,he,Xe,Ye,oe,he,L.DEPTH_BUFFER_BIT,L.NEAREST);ye.bindFramebuffer(L.READ_FRAMEBUFFER,null),ye.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(U!==0||S.isRenderTargetTexture||ve.has(S)){const qt=ve.get(S),Lt=ve.get(F);ye.bindFramebuffer(L.READ_FRAMEBUFFER,ih),ye.bindFramebuffer(L.DRAW_FRAMEBUFFER,sh);for(let Bt=0;Bt<fe;Bt++)at?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,qt.__webglTexture,U,be+Bt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,qt.__webglTexture,U),Xt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Lt.__webglTexture,Q,ut+Bt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Lt.__webglTexture,Q),U!==0?L.blitFramebuffer(Re,Pe,oe,he,Xe,Ye,oe,he,L.COLOR_BUFFER_BIT,L.NEAREST):Xt?L.copyTexSubImage3D(vt,Q,Xe,Ye,ut+Bt,Re,Pe,oe,he):L.copyTexSubImage2D(vt,Q,Xe,Ye,Re,Pe,oe,he);ye.bindFramebuffer(L.READ_FRAMEBUFFER,null),ye.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Xt?S.isDataTexture||S.isData3DTexture?L.texSubImage3D(vt,Q,Xe,Ye,ut,oe,he,fe,qe,Me,dt.data):F.isCompressedArrayTexture?L.compressedTexSubImage3D(vt,Q,Xe,Ye,ut,oe,he,fe,qe,dt.data):L.texSubImage3D(vt,Q,Xe,Ye,ut,oe,he,fe,qe,Me,dt):S.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,Q,Xe,Ye,oe,he,qe,Me,dt.data):S.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,Q,Xe,Ye,dt.width,dt.height,qe,dt.data):L.texSubImage2D(L.TEXTURE_2D,Q,Xe,Ye,oe,he,qe,Me,dt);L.pixelStorei(L.UNPACK_ROW_LENGTH,Ke),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Jt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,li),L.pixelStorei(L.UNPACK_SKIP_ROWS,Vt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,ji),Q===0&&F.generateMipmaps&&L.generateMipmap(vt),ye.unbindTexture()},this.copyTextureToTexture3D=function(S,F,B=null,z=null,U=0){return S.isTexture!==!0&&(Jn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,z=arguments[1]||null,S=arguments[2],F=arguments[3],U=arguments[4]||0),Jn('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,F,B,z,U)},this.initRenderTarget=function(S){ve.get(S).__webglFramebuffer===void 0&&w.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?w.setTextureCube(S,0):S.isData3DTexture?w.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?w.setTexture2DArray(S,0):w.setTexture2D(S,0),ye.unbindTexture()},this.resetState=function(){P=0,T=0,A=null,ye.reset(),st.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=We._getDrawingBufferColorSpace(e),t.unpackColorSpace=We._getUnpackColorSpace()}}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class hn{constructor(e,t,n,i,s="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(s),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),hn.nextNameID=hn.nextNameID||0,this.$name.id=`lil-gui-name-${++hn.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class v_ extends hn{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Qo(r){let e,t;return(e=r.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=r.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=r.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const b_={isPrimitive:!0,match:r=>typeof r=="string",fromHexString:Qo,toHexString:Qo},fs={isPrimitive:!0,match:r=>typeof r=="number",fromHexString:r=>parseInt(r.substring(1),16),toHexString:r=>"#"+r.toString(16).padStart(6,0)},S_={isPrimitive:!1,match:r=>Array.isArray(r),fromHexString(r,e,t=1){const n=fs.fromHexString(r);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([r,e,t],n=1){n=255/n;const i=r*n<<16^e*n<<8^t*n<<0;return fs.toHexString(i)}},M_={isPrimitive:!1,match:r=>Object(r)===r,fromHexString(r,e,t=1){const n=fs.fromHexString(r);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r,g:e,b:t},n=1){n=255/n;const i=r*n<<16^e*n<<8^t*n<<0;return fs.toHexString(i)}},E_=[b_,fs,S_,M_];function w_(r){return E_.find(e=>e.match(r))}class T_ extends hn{constructor(e,t,n,i){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=w_(this.initialValue),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=Qo(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class no extends hn{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class A_ extends hn{constructor(e,t,n,i,s,o){super(e,t,n,"number"),this._initInput(),this.min(i),this.max(s);const a=o!==void 0;this.step(a?o:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let b=parseFloat(this.$input.value);isNaN(b)||(this._stepExplicit&&(b=this._snap(b)),this.setValue(this._clamp(b)))},n=b=>{const E=parseFloat(this.$input.value);isNaN(E)||(this._snapClampSetValue(E+b),this.$input.value=this.getValue())},i=b=>{b.key==="Enter"&&this.$input.blur(),b.code==="ArrowUp"&&(b.preventDefault(),n(this._step*this._arrowKeyMultiplier(b))),b.code==="ArrowDown"&&(b.preventDefault(),n(this._step*this._arrowKeyMultiplier(b)*-1))},s=b=>{this._inputFocused&&(b.preventDefault(),n(this._step*this._normalizeMouseWheel(b)))};let o=!1,a,l,c,h,d;const u=5,f=b=>{a=b.clientX,l=c=b.clientY,o=!0,h=this.getValue(),d=0,window.addEventListener("mousemove",_),window.addEventListener("mouseup",g)},_=b=>{if(o){const E=b.clientX-a,y=b.clientY-l;Math.abs(y)>u?(b.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(E)>u&&g()}if(!o){const E=b.clientY-c;d-=E*this._step*this._arrowKeyMultiplier(b),h+d>this._max?d=this._max-h:h+d<this._min&&(d=this._min-h),this._snapClampSetValue(h+d)}c=b.clientY},g=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",_),window.removeEventListener("mouseup",g)},m=()=>{this._inputFocused=!0},p=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",i),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",f),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",p)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(p,b,E,y,R)=>(p-b)/(E-b)*(R-y)+y,t=p=>{const b=this.$slider.getBoundingClientRect();let E=e(p,b.left,b.right,this._min,this._max);this._snapClampSetValue(E)},n=p=>{this._setDraggingStyle(!0),t(p.clientX),window.addEventListener("mousemove",i),window.addEventListener("mouseup",s)},i=p=>{t(p.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",s)};let o=!1,a,l;const c=p=>{p.preventDefault(),this._setDraggingStyle(!0),t(p.touches[0].clientX),o=!1},h=p=>{p.touches.length>1||(this._hasScrollBar?(a=p.touches[0].clientX,l=p.touches[0].clientY,o=!0):c(p),window.addEventListener("touchmove",d,{passive:!1}),window.addEventListener("touchend",u))},d=p=>{if(o){const b=p.touches[0].clientX-a,E=p.touches[0].clientY-l;Math.abs(b)>Math.abs(E)?c(p):(window.removeEventListener("touchmove",d),window.removeEventListener("touchend",u))}else p.preventDefault(),t(p.touches[0].clientX)},u=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",d),window.removeEventListener("touchend",u)},f=this._callOnFinishChange.bind(this),_=400;let g;const m=p=>{if(Math.abs(p.deltaX)<Math.abs(p.deltaY)&&this._hasScrollBar)return;p.preventDefault();const E=this._normalizeMouseWheel(p)*this._step;this._snapClampSetValue(this.getValue()+E),this.$input.value=this.getValue(),clearTimeout(g),g=setTimeout(f,_)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",h,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class C_ extends hn{constructor(e,t,n,i){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(i)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const n=document.createElement("option");n.textContent=t,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}}class R_ extends hn{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var P_=`.lil-gui {
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
}`;function L_(r){const e=document.createElement("style");e.innerHTML=r;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let Ql=!1;class Ta{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:i,title:s="Controls",closeFolders:o=!1,injectStyles:a=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),l&&this.domElement.classList.add("allow-touch-styles"),!Ql&&a&&(L_(P_),Ql=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this._closeFolders=o}add(e,t,n,i,s){if(Object(n)===n)return new C_(this,e,t,n);const o=e[t];switch(typeof o){case"number":return new A_(this,e,t,n,i,s);case"boolean":return new v_(this,e,t);case"string":return new R_(this,e,t);case"function":return new no(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,o)}addColor(e,t,n=1){return new T_(this,e,t,n)}addFolder(e){const t=new Ta({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof no||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof no)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}class I_{constructor(){this.scene=new Hd,this.canvas=null,this.bgTexture=null,this.init()}init(){if(this.canvas=document.querySelector("canvas.webgl"),!this.canvas){console.error('Canvas element with class "webgl" not found');return}}updateGradientBackground(e){const i=document.createElement("canvas");i.width=2,i.height=2048;const s=i.getContext("2d"),o=s.createLinearGradient(0,0,0,2048);o.addColorStop(0,e.gradientTop),o.addColorStop(1,e.gradientBottom),s.fillStyle=o,s.globalAlpha=e.gradientAlpha,s.fillRect(0,0,2,2048),this.bgTexture=new ya(i),this.bgTexture.minFilter=lt,this.bgTexture.magFilter=lt,this.bgTexture.colorSpace=Mt,this.scene.background=this.bgTexture,this.scene._originalBackgroundTexture=this.bgTexture}getScene(){return this.scene}getCanvas(){return this.canvas}dispose(){this.bgTexture&&this.bgTexture.dispose()}}const Jl={type:"change"},Aa={type:"start"},Kc={type:"end"},Ys=new Wi,ec=new Bn,D_=Math.cos(70*wc.DEG2RAD),ft=new I,kt=2*Math.PI,nt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},io=1e-6;class F_ extends Nu{constructor(e,t=null){super(e,t),this.state=nt.NONE,this.enabled=!0,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:An.ROTATE,MIDDLE:An.DOLLY,RIGHT:An.PAN},this.touches={ONE:wi.ROTATE,TWO:wi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new $t,this._lastTargetPosition=new I,this._quat=new $t().setFromUnitVectors(e.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new El,this._sphericalDelta=new El,this._scale=1,this._panOffset=new I,this._rotateStart=new Te,this._rotateEnd=new Te,this._rotateDelta=new Te,this._panStart=new Te,this._panEnd=new Te,this._panDelta=new Te,this._dollyStart=new Te,this._dollyEnd=new Te,this._dollyDelta=new Te,this._dollyDirection=new I,this._mouse=new Te,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=N_.bind(this),this._onPointerDown=U_.bind(this),this._onPointerUp=O_.bind(this),this._onContextMenu=W_.bind(this),this._onMouseWheel=z_.bind(this),this._onKeyDown=H_.bind(this),this._onTouchStart=V_.bind(this),this._onTouchMove=G_.bind(this),this._onMouseDown=B_.bind(this),this._onMouseMove=k_.bind(this),this._interceptControlDown=$_.bind(this),this._interceptControlUp=X_.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Jl),this.update(),this.state=nt.NONE}update(e=null){const t=this.object.position;ft.copy(t).sub(this.target),ft.applyQuaternion(this._quat),this._spherical.setFromVector3(ft),this.autoRotate&&this.state===nt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=kt:n>Math.PI&&(n-=kt),i<-Math.PI?i+=kt:i>Math.PI&&(i-=kt),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(ft.setFromSpherical(this._spherical),ft.applyQuaternion(this._quatInverse),t.copy(this.target).add(ft),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=ft.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new I(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new I(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=ft.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ys.origin.copy(this.object.position),Ys.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ys.direction))<D_?this.object.lookAt(this.target):(ec.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ys.intersectPlane(ec,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>io||8*(1-this._lastQuaternion.dot(this.object.quaternion))>io||this._lastTargetPosition.distanceToSquared(this.target)>io?(this.dispatchEvent(Jl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?kt/60*this.autoRotateSpeed*e:kt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){ft.setFromMatrixColumn(t,0),ft.multiplyScalar(-e),this._panOffset.add(ft)}_panUp(e,t){this.screenSpacePanning===!0?ft.setFromMatrixColumn(t,1):(ft.setFromMatrixColumn(t,0),ft.crossVectors(this.object.up,ft)),ft.multiplyScalar(e),this._panOffset.add(ft)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;ft.copy(i).sub(this.target);let s=ft.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/n.clientHeight,this.object.matrix),this._panUp(2*t*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),i=e-n.left,s=t-n.top,o=n.width,a=n.height;this._mouse.x=i/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(kt*this._rotateDelta.x/t.clientHeight),this._rotateUp(kt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(kt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-kt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(kt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-kt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,s=Math.sqrt(n*n+i*i);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),s=.5*(e.pageY+n.y);this._rotateEnd.set(i,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(kt*this._rotateDelta.x/t.clientHeight),this._rotateUp(kt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,s=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Te,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function U_(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r)))}function N_(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function O_(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Kc),this.state=nt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function B_(r){let e;switch(r.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case An.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=nt.DOLLY;break;case An.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=nt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=nt.ROTATE}break;case An.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=nt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=nt.PAN}break;default:this.state=nt.NONE}this.state!==nt.NONE&&this.dispatchEvent(Aa)}function k_(r){switch(this.state){case nt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case nt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case nt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function z_(r){this.enabled===!1||this.enableZoom===!1||this.state!==nt.NONE||(r.preventDefault(),this.dispatchEvent(Aa),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(Kc))}function H_(r){this.enabled!==!1&&this._handleKeyDown(r)}function V_(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case wi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=nt.TOUCH_ROTATE;break;case wi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=nt.TOUCH_PAN;break;default:this.state=nt.NONE}break;case 2:switch(this.touches.TWO){case wi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=nt.TOUCH_DOLLY_PAN;break;case wi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=nt.TOUCH_DOLLY_ROTATE;break;default:this.state=nt.NONE}break;default:this.state=nt.NONE}this.state!==nt.NONE&&this.dispatchEvent(Aa)}function G_(r){switch(this._trackPointer(r),this.state){case nt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case nt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case nt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case nt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=nt.NONE}}function W_(r){this.enabled!==!1&&r.preventDefault()}function $_(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function X_(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class q_{constructor(e,t){this.canvas=e,this.sizes=t,this.camera=null,this.controls=null,this.raycaster=new Gc,this.mouse=new Te,this.scene=null,this.clickableMeshes=[],this.targetLerpActive=!1,this.targetLerpStart=null,this.targetLerpFrom=new I,this.targetLerpTo=new I,this.targetLerpDuration=.3,this.cameraResetActive=!1,this.cameraResetStart=null,this.cameraResetDuration=.8,this.positionLerpFrom=new I,this.positionLerpTo=new I,this.rotationLerpFrom={x:0,y:0,z:0},this.rotationLerpTo={x:0,y:0,z:0},this.originalTarget=new I(-.018058106108908126,.34892644576978554,.08865572603297185),this.zoomVelocity=0,this.zoomMomentum=0,this.lastScrollTime=0,this.zoomDecay=.96,this.zoomMomentumThreshold=.015,this.momentumActive=!1,this.originalPosition=new I(-.9767395667747095,.6513489013452174,-.5290562260411343),this.originalRotation={x:-2.6863117716033176,y:-.9484795935271679,z:-2.7629820926703275},this.axisHelper=null,this.axisHelperVisible=!1,this.axisHelperSize=.5,this.init(),this.setupEventListeners()}init(){this.camera=new Ft(50,this.sizes.width/this.sizes.height,.1,100),this.camera.position.set(-.9767395667747095,.6513489013452174,-.5290562260411343),this.camera.rotation.set(-2.6863117716033176,-.9484795935271679,-2.7629820926703275,"XYZ"),this.controls=new F_(this.camera,this.canvas),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.zoomSpeed=.9,this.controls.minDistance=.146,this.controls.maxDistance=19,this.controls.mouseButtons={LEFT:An.ROTATE,MIDDLE:An.PAN,RIGHT:An.PAN},this.controls.target.set(-.018058106108908126,.34892644576978554,.08865572603297185),this.controls.update()}setupEventListeners(){let e=null;this.controls.addEventListener("change",()=>{e&&clearTimeout(e),e=setTimeout(()=>{},2e3)}),this.canvas.addEventListener("dblclick",t=>{this.handleDoubleClick(t)}),window.addEventListener("keydown",t=>{t.code==="Space"&&!t.repeat&&(t.preventDefault(),this.resetCamera())}),this.canvas.addEventListener("wheel",t=>{this.trackZoomMomentum(t)},{passive:!0}),window.addEventListener("resize",()=>{this.handleResize()})}handleDoubleClick(e){if(!this.scene||this.clickableMeshes.length===0){console.warn("Scene or clickable meshes not available for rotation center");return}const t=this.canvas.getBoundingClientRect();this.mouse.x=(e.clientX-t.left)/t.width*2-1,this.mouse.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const n=this.raycaster.intersectObjects(this.clickableMeshes,!0);if(n.length>0){const i=n[0].point;console.log("New rotation center set at:",i);const s=this.controls.dampingFactor;this.controls.dampingFactor=.15,this.targetLerpFrom.copy(this.controls.target),this.targetLerpTo.copy(i),this.targetLerpStart=performance.now(),this.targetLerpActive=!0,setTimeout(()=>{this.controls.dampingFactor=s},this.targetLerpDuration*1e3+100),this.axisHelperVisible&&setTimeout(()=>{this.updateAxisHelper()},this.targetLerpDuration*1e3+150)}}resetCamera(){console.log("Resetting camera with smooth animation to default state"),this.zoomMomentum=0,this.momentumActive=!1,this.targetLerpActive=!1;const e=this.controls.dampingFactor;this.controls.dampingFactor=.2,this.positionLerpFrom.copy(this.camera.position),this.positionLerpTo.copy(this.originalPosition),this.rotationLerpFrom.x=this.camera.rotation.x,this.rotationLerpFrom.y=this.camera.rotation.y,this.rotationLerpFrom.z=this.camera.rotation.z,this.rotationLerpTo.x=this.originalRotation.x,this.rotationLerpTo.y=this.originalRotation.y,this.rotationLerpTo.z=this.originalRotation.z,this.targetLerpFrom.copy(this.controls.target),this.targetLerpTo.copy(this.originalTarget),this.cameraResetActive=!0,this.targetLerpActive=!0,this.cameraResetStart=performance.now(),this.targetLerpStart=performance.now(),setTimeout(()=>{this.controls.dampingFactor=e},this.cameraResetDuration*1e3+100),console.log("Camera smooth reset animation started")}createAxisHelper(){this.axisHelper&&this.scene.remove(this.axisHelper),this.axisHelper=new Uu(this.axisHelperSize),this.axisHelper.position.copy(this.controls.target),this.scene.add(this.axisHelper),console.log("Axis helper created at:",this.controls.target)}updateAxisHelper(){this.axisHelper&&this.axisHelperVisible&&this.axisHelper.position.copy(this.controls.target)}toggleAxisHelper(e){this.axisHelperVisible=e,e&&!this.axisHelper&&this.createAxisHelper(),this.axisHelper&&(this.axisHelper.visible=e,this.updateAxisHelper())}setAxisHelperSize(e){this.axisHelperSize=e,this.axisHelper&&this.createAxisHelper()}getRotationCenter(){return{x:this.controls.target.x,y:this.controls.target.y,z:this.controls.target.z}}setRotationCenter(e,t,n){this.controls.target.set(e,t,n),this.controls.update(),this.updateAxisHelper(),console.log("Rotation center set to:",e,t,n)}setRotationCenterX(e){this.controls.target.x=e,this.controls.update(),this.updateAxisHelper()}setRotationCenterY(e){this.controls.target.y=e,this.controls.update(),this.updateAxisHelper()}setRotationCenterZ(e){this.controls.target.z=e,this.controls.update(),this.updateAxisHelper()}copyCoordinatesToClipboard(){const e=this.getRotationCenter(),t=`x: ${e.x.toFixed(6)}, y: ${e.y.toFixed(6)}, z: ${e.z.toFixed(6)}`;navigator.clipboard.writeText(t).then(()=>{console.log("Coordinates copied to clipboard:",t)}).catch(n=>{console.error("Failed to copy coordinates:",n),console.log("Coordinates (manual copy):",t)})}setFOV(e){this.camera.fov=e,this.camera.updateProjectionMatrix(),console.log("FOV set to:",e)}getFOV(){return this.camera.fov}copyCameraSettingsToClipboard(){const e={position:this.camera.position.toArray(),rotation:[this.camera.rotation.x,this.camera.rotation.y,this.camera.rotation.z],target:this.controls.target.toArray(),fov:this.camera.fov,zoom:{minDistance:this.controls.minDistance,maxDistance:this.controls.maxDistance,zoomSpeed:this.controls.zoomSpeed}},t=JSON.stringify(e,null,2);navigator.clipboard.writeText(t).then(()=>{console.log("Camera settings copied to clipboard:",e)}).catch(n=>{console.error("Failed to copy camera settings:",n),console.log("Camera settings (manual copy):",t)})}copyAllSettingsToClipboard(e){const t=e.gatherAllSettings(),n=JSON.stringify(t,null,2);navigator.clipboard.writeText(n).then(()=>{console.log("All GUI settings copied to clipboard:",t)}).catch(i=>{console.error("Failed to copy all settings:",i),console.log("All settings (manual copy):",n)})}handleResize(){this.camera.aspect=this.sizes.width/this.sizes.height,this.camera.updateProjectionMatrix()}updateTargetLerp(){if(this.targetLerpActive){const t=(performance.now()-this.targetLerpStart)/1e3;let n=Math.min(t/this.targetLerpDuration,1);n<.5?n=4*n*n*n:n=1-Math.pow(-2*n+2,3)/2,this.controls.target.lerpVectors(this.targetLerpFrom,this.targetLerpTo,n),this.controls.update(),t/this.targetLerpDuration>=1&&(this.controls.target.copy(this.targetLerpTo),this.controls.update(),this.targetLerpActive=!1)}}updateCameraReset(){if(this.cameraResetActive){const t=(performance.now()-this.cameraResetStart)/1e3;let n=Math.min(t/this.cameraResetDuration,1);n<.5?n=4*n*n*n:n=1-Math.pow(-2*n+2,3)/2,this.camera.position.lerpVectors(this.positionLerpFrom,this.positionLerpTo,n),this.camera.rotation.x=this.rotationLerpFrom.x+(this.rotationLerpTo.x-this.rotationLerpFrom.x)*n,this.camera.rotation.y=this.rotationLerpFrom.y+(this.rotationLerpTo.y-this.rotationLerpFrom.y)*n,this.camera.rotation.z=this.rotationLerpFrom.z+(this.rotationLerpTo.z-this.rotationLerpFrom.z)*n,t/this.cameraResetDuration>=1&&(this.camera.position.copy(this.positionLerpTo),this.camera.rotation.set(this.rotationLerpTo.x,this.rotationLerpTo.y,this.rotationLerpTo.z,"XYZ"),this.cameraResetActive=!1,console.log("Camera reset animation complete"))}}update(){this.updateTargetLerp(),this.updateCameraReset(),this.updateZoomMomentum(),this.updateAxisHelper(),this.controls.update()}trackZoomMomentum(e){const t=performance.now(),n=Math.max(t-this.lastScrollTime,1),i=e.deltaY>0?1:-1,s=this.velocityMultiplier||1,o=i*.1*s,a=Math.min(n/16,3);this.zoomVelocity=o*a,this.zoomMomentum=this.zoomVelocity,this.lastScrollTime=t}updateZoomMomentum(){if(Math.abs(this.zoomMomentum)>this.zoomMomentumThreshold){const e=this.camera.position.distanceTo(this.controls.target),t=this.zoomMomentum*Math.max(e*.05,.01),n=new I;n.subVectors(this.camera.position,this.controls.target).normalize();const i=e,s=i+t,o=Math.max(this.controls.minDistance,Math.min(this.controls.maxDistance,s));Math.abs(o-i)>.001&&this.camera.position.copy(this.controls.target).add(n.multiplyScalar(o)),this.zoomMomentum*=this.zoomDecay,this.controls.update()}else this.zoomMomentum!==0&&(this.zoomMomentum=0)}getCamera(){return this.camera}getControls(){return this.controls}setScene(e){this.scene=e}setClickableMeshes(e){this.clickableMeshes=e}applySettings(e){e.camera&&(e.camera.position&&this.camera.position.set(e.camera.position[0],e.camera.position[1],e.camera.position[2]),e.camera.rotation&&this.camera.rotation.set(e.camera.rotation[0],e.camera.rotation[1],e.camera.rotation[2]),e.camera.target&&this.controls.target.set(e.camera.target[0],e.camera.target[1],e.camera.target[2]),this.controls.update())}getSettings(){return{position:this.camera.position.toArray(),rotation:[this.camera.rotation.x,this.camera.rotation.y,this.camera.rotation.z],target:this.controls.target.toArray()}}updateOriginalState(e,t,n){e&&this.originalPosition.set(...e),t&&(this.originalRotation.x=t[0],this.originalRotation.y=t[1],this.originalRotation.z=t[2]),n&&this.originalTarget.set(...n),console.log("Updated original camera state for spacebar reset")}dispose(){this.axisHelper&&(this.scene.remove(this.axisHelper),this.axisHelper=null)}}class j_ extends du{constructor(e){super(e),this.type=En}parse(e){const o=function(A,M){switch(A){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(M||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(M||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(M||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(M||""))}},d=function(A,M,x){M=M||1024;let k=A.pos,N=-1,H=0,$="",V=String.fromCharCode.apply(null,new Uint16Array(A.subarray(k,k+128)));for(;0>(N=V.indexOf(`
`))&&H<M&&k<A.byteLength;)$+=V,H+=V.length,k+=128,V+=String.fromCharCode.apply(null,new Uint16Array(A.subarray(k,k+128)));return-1<N?(A.pos+=H+N+1,$+V.slice(0,N)):!1},u=function(A){const M=/^#\?(\S+)/,x=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,C=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,k=/^\s*FORMAT=(\S+)\s*$/,N=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,H={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let $,V;for((A.pos>=A.byteLength||!($=d(A)))&&o(1,"no header found"),(V=$.match(M))||o(3,"bad initial token"),H.valid|=1,H.programtype=V[1],H.string+=$+`
`;$=d(A),$!==!1;){if(H.string+=$+`
`,$.charAt(0)==="#"){H.comments+=$+`
`;continue}if((V=$.match(x))&&(H.gamma=parseFloat(V[1])),(V=$.match(C))&&(H.exposure=parseFloat(V[1])),(V=$.match(k))&&(H.valid|=2,H.format=V[1]),(V=$.match(N))&&(H.valid|=4,H.height=parseInt(V[1],10),H.width=parseInt(V[2],10)),H.valid&2&&H.valid&4)break}return H.valid&2||o(3,"missing format specifier"),H.valid&4||o(3,"missing image size specifier"),H},f=function(A,M,x){const C=M;if(C<8||C>32767||A[0]!==2||A[1]!==2||A[2]&128)return new Uint8Array(A);C!==(A[2]<<8|A[3])&&o(3,"wrong scanline width");const k=new Uint8Array(4*M*x);k.length||o(4,"unable to allocate buffer space");let N=0,H=0;const $=4*C,V=new Uint8Array(4),j=new Uint8Array($);let G=x;for(;G>0&&H<A.byteLength;){H+4>A.byteLength&&o(1),V[0]=A[H++],V[1]=A[H++],V[2]=A[H++],V[3]=A[H++],(V[0]!=2||V[1]!=2||(V[2]<<8|V[3])!=C)&&o(3,"bad rgbe scanline format");let te=0,ne;for(;te<$&&H<A.byteLength;){ne=A[H++];const Ee=ne>128;if(Ee&&(ne-=128),(ne===0||te+ne>$)&&o(3,"bad scanline data"),Ee){const Fe=A[H++];for(let X=0;X<ne;X++)j[te++]=Fe}else j.set(A.subarray(H,H+ne),te),te+=ne,H+=ne}const _e=C;for(let Ee=0;Ee<_e;Ee++){let Fe=0;k[N]=j[Ee+Fe],Fe+=C,k[N+1]=j[Ee+Fe],Fe+=C,k[N+2]=j[Ee+Fe],Fe+=C,k[N+3]=j[Ee+Fe],N+=4}G--}return k},_=function(A,M,x,C){const k=A[M+3],N=Math.pow(2,k-128)/255;x[C+0]=A[M+0]*N,x[C+1]=A[M+1]*N,x[C+2]=A[M+2]*N,x[C+3]=1},g=function(A,M,x,C){const k=A[M+3],N=Math.pow(2,k-128)/255;x[C+0]=Cs.toHalfFloat(Math.min(A[M+0]*N,65504)),x[C+1]=Cs.toHalfFloat(Math.min(A[M+1]*N,65504)),x[C+2]=Cs.toHalfFloat(Math.min(A[M+2]*N,65504)),x[C+3]=Cs.toHalfFloat(1)},m=new Uint8Array(e);m.pos=0;const p=u(m),b=p.width,E=p.height,y=f(m.subarray(m.pos),b,E);let R,P,T;switch(this.type){case zt:T=y.length/4;const A=new Float32Array(T*4);for(let x=0;x<T;x++)_(y,x*4,A,x*4);R=A,P=zt;break;case En:T=y.length/4;const M=new Uint16Array(T*4);for(let x=0;x<T;x++)g(y,x*4,M,x*4);R=M,P=En;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:b,height:E,data:R,header:p.string,gamma:p.gamma,exposure:p.exposure,type:P}}setDataType(e){return this.type=e,this}load(e,t,n,i){function s(o,a){switch(o.type){case zt:case En:o.colorSpace=Mt,o.minFilter=lt,o.magFilter=lt,o.generateMipmaps=!1,o.flipY=!0;break}t&&t(o,a)}return super.load(e,s,n,i)}}class Y_{constructor(e){this.scene=e,this.ambientLight=null,this.directionalLight=null,this.dirLightHelper=null,this.rgbeLoader=new j_,this.init()}init(){this.setupAmbientLight(),this.setupDirectionalLight(),this.setupEnvironmentMap()}setupAmbientLight(){this.ambientLight=new _u(16777215,.4),this.scene.add(this.ambientLight)}setupDirectionalLight(){this.directionalLight=new Vc(16777215,1.43),this.directionalLight.position.set(1.35,1.57,.9),this.directionalLight.castShadow=!0,this.directionalLight.shadow.bias=0,this.directionalLight.shadow.radius=1,this.directionalLight.shadow.mapSize.width=1024,this.directionalLight.shadow.mapSize.height=1024,this.scene.add(this.directionalLight),this.dirLightHelper=new Fu(this.directionalLight,1.5,16711680),this.dirLightHelper.visible=!1,this.scene.add(this.dirLightHelper)}setupEnvironmentMap(){this.rgbeLoader.load(Ii("textures/environmentMap/2k.hdr"),e=>{e.mapping=cr,this.scene.environment=e})}applySettings(e){if(e.directionalLight){const t=e.directionalLight;this.directionalLight.intensity=t.intensity,this.directionalLight.color.set(t.color),t.position&&this.directionalLight.position.set(t.position.x,t.position.y,t.position.z),this.directionalLight.castShadow=t.castShadow,this.directionalLight.shadow.bias=t.shadowBias,this.directionalLight.shadow.radius=t.shadowBlur,this.directionalLight.shadow.mapSize.width=t.shadowMapWidth,this.directionalLight.shadow.mapSize.height=t.shadowMapHeight}e.ambientLight&&(this.ambientLight.intensity=e.ambientLight.intensity,this.ambientLight.color.set(e.ambientLight.color))}getSettings(){return{directionalLight:{intensity:this.directionalLight.intensity,color:"#"+this.directionalLight.color.getHexString(),castShadow:this.directionalLight.castShadow,shadowBias:this.directionalLight.shadow.bias,shadowBlur:this.directionalLight.shadow.radius,shadowMapWidth:this.directionalLight.shadow.mapSize.width,shadowMapHeight:this.directionalLight.shadow.mapSize.height,posX:this.directionalLight.position.x,posY:this.directionalLight.position.y,posZ:this.directionalLight.position.z,showHelper:this.dirLightHelper.visible,position:{x:this.directionalLight.position.x,y:this.directionalLight.position.y,z:this.directionalLight.position.z}},ambientLight:{intensity:this.ambientLight.intensity,color:"#"+this.ambientLight.color.getHexString()}}}getLights(){return{ambient:this.ambientLight,directional:this.directionalLight,directionalHelper:this.dirLightHelper}}}class K_{constructor(e){this.scene=e,this.dustParticles=null,this.dustGeometry=null,this.dustMaterial=null,this.dustPositions=null,this.dustVelocities=null,this.dustSizes=null,this.params={count:1150,size:.0095,sizeRandomness:1.4,color:"#0d529c",opacity:1,speed:.5,horizontalRange:3,verticalRange:2,verticalOffset:1,visible:!0,blur:.31,depthBlur:!1,depthBlurStrength:.16,depthFocusDistance:2,depthFocusRange:1},this.init()}init(){this.createDustParticles()}createDustParticles(){var t,n;this.dustParticles&&(this.scene.remove(this.dustParticles),(t=this.dustGeometry)==null||t.dispose(),(n=this.dustMaterial)==null||n.dispose()),this.dustGeometry=new Ot,this.dustPositions=new Float32Array(this.params.count*3),this.dustVelocities=new Float32Array(this.params.count*3),this.dustSizes=new Float32Array(this.params.count);for(let i=0;i<this.params.count;i++){const s=i*3;this.dustPositions[s]=(Math.random()-.5)*this.params.horizontalRange*2,this.dustPositions[s+1]=Math.random()*this.params.verticalRange+this.params.verticalOffset,this.dustPositions[s+2]=(Math.random()-.5)*this.params.horizontalRange*2,this.dustVelocities[s]=(Math.random()-.5)*.001,this.dustVelocities[s+1]=(Math.random()-.5)*5e-4,this.dustVelocities[s+2]=(Math.random()-.5)*.001,this.dustSizes[i]=this.params.size*(1+(Math.random()-.5)*this.params.sizeRandomness)}this.dustGeometry.setAttribute("position",new St(this.dustPositions,3)),this.dustGeometry.setAttribute("size",new St(this.dustSizes,1));let e={color:this.params.color,size:this.params.size,transparent:!0,opacity:this.params.opacity,sizeAttenuation:!0,alphaTest:.01};this.params.blur>0&&(e.map=this.createBlurTexture(this.params.blur)),this.dustMaterial=new _a(e),this.dustParticles=new Nc(this.dustGeometry,this.dustMaterial),this.dustParticles.visible=this.params.visible,this.scene.add(this.dustParticles)}createBlurTexture(e){const n=document.createElement("canvas");n.width=32,n.height=32;const i=n.getContext("2d"),s=32/2,o=32/2,a=32/2,l=i.createRadialGradient(s,o,0,s,o,a);l.addColorStop(0,`rgba(255, 255, 255, ${1-e})`),l.addColorStop(.5,`rgba(255, 255, 255, ${(1-e)*.5})`),l.addColorStop(1,"rgba(255, 255, 255, 0)"),i.fillStyle=l,i.fillRect(0,0,32,32);const c=new ya(n);return c.needsUpdate=!0,c}update(e){if(!this.dustParticles||!this.params.visible)return;const t=this.dustGeometry.attributes.position.array,n=this.dustGeometry.attributes.size.array;for(let i=0;i<this.params.count;i++){const s=i*3;if(t[s]+=this.dustVelocities[s]*this.params.speed*e*1e3,t[s+1]+=this.dustVelocities[s+1]*this.params.speed*e*1e3,t[s+2]+=this.dustVelocities[s+2]*this.params.speed*e*1e3,this.params.depthBlur&&window.camera){const o=new I(t[s],t[s+1],t[s+2]),a=window.camera.position,l=o.distanceTo(a),c=this.params.depthFocusDistance,h=this.params.depthFocusRange,d=Math.abs(l-c);let u=1;d>h&&(u=1-Math.min(d-h,2)/2*this.params.depthBlurStrength),n[i]=this.dustSizes[i]*u}t[s]>this.params.horizontalRange&&(t[s]=-this.params.horizontalRange),t[s]<-this.params.horizontalRange&&(t[s]=this.params.horizontalRange),t[s+2]>this.params.horizontalRange&&(t[s+2]=-this.params.horizontalRange),t[s+2]<-this.params.horizontalRange&&(t[s+2]=this.params.horizontalRange),(t[s+1]<this.params.verticalOffset-.5||t[s+1]>this.params.verticalOffset+this.params.verticalRange+.5)&&(t[s+1]=Math.random()*this.params.verticalRange+this.params.verticalOffset)}this.dustGeometry.attributes.position.needsUpdate=!0,this.params.depthBlur&&(this.dustGeometry.attributes.size.needsUpdate=!0)}updateCount(e){this.params.count=e,this.createDustParticles()}updateSize(e){if(this.params.size=e,this.dustMaterial.size=e,this.dustSizes){for(let t=0;t<this.params.count;t++)this.dustSizes[t]=e*(1+(Math.random()-.5)*this.params.sizeRandomness);this.dustGeometry.attributes.size.needsUpdate=!0}}updateSizeRandomness(e){this.params.sizeRandomness=e,this.createDustParticles()}updateColor(e){this.params.color=e,this.dustMaterial.color.set(e)}updateOpacity(e){this.params.opacity=e,this.dustMaterial.opacity=e}updateSpeed(e){this.params.speed=e}updateBlur(e){this.params.blur=e,e>0?this.dustMaterial.map=this.createBlurTexture(e):this.dustMaterial.map=null,this.dustMaterial.needsUpdate=!0}updateDepthBlur(e){this.params.depthBlur=e}updateDepthBlurStrength(e){this.params.depthBlurStrength=e}updateDepthFocus(e,t){this.params.depthFocusDistance=e,this.params.depthFocusRange=t}updateRange(e,t){this.params.horizontalRange=e,this.params.verticalRange=t,this.createDustParticles()}updateOffset(e){this.params.verticalOffset=e,this.createDustParticles()}setVisible(e){this.params.visible=e,this.dustParticles.visible=e}applyPreset(e){switch(e){case"Light Dust":Object.assign(this.params,{count:300,size:.003,opacity:.2,speed:.3,color:"#ffffff"});break;case"Heavy Dust":Object.assign(this.params,{count:800,size:.008,opacity:.4,speed:.8,color:"#d4c4a8"});break;case"Magical Sparkles":Object.assign(this.params,{count:150,size:.01,opacity:.6,speed:.2,color:"#ffd700"});break;case"Reset Dust":default:Object.assign(this.params,{count:500,size:.005,opacity:.3,speed:.5,color:"#ffffff"});break}this.createDustParticles()}applySettings(e){e&&(Object.assign(this.params,e),this.createDustParticles(),e.blur!==void 0&&this.updateBlur(e.blur),e.depthBlur!==void 0&&this.updateDepthBlur(e.depthBlur),e.depthBlurStrength!==void 0&&this.updateDepthBlurStrength(e.depthBlurStrength),e.depthFocusDistance!==void 0&&e.depthFocusRange!==void 0&&this.updateDepthFocus(e.depthFocusDistance,e.depthFocusRange))}getSettings(){return{...this.params}}getParams(){return this.params}dispose(){var e,t;this.dustParticles&&(this.scene.remove(this.dustParticles),(e=this.dustGeometry)==null||e.dispose(),(t=this.dustMaterial)==null||t.dispose())}}class Z_{constructor(){this.managers={},this.defaultSettings=null,this.loadDefaultSettings()}async loadDefaultSettings(){try{const e=await fetch(Ii("data/default-settings.json"));this.defaultSettings=await e.json()}catch(e){console.warn("Could not load default settings:",e),this.defaultSettings=this.getFallbackSettings()}}registerManager(e,t){this.managers[e]=t}async saveSettingsToClipboard(){const e=this.gatherAllSettings(),t=JSON.stringify(e,null,2);try{await navigator.clipboard.writeText(t),alert("Settings copied to clipboard!")}catch(n){console.error("Failed to copy to clipboard:",n),alert("Failed to copy settings to clipboard.")}}async importSettingsFromClipboard(){try{const e=await navigator.clipboard.readText(),t=JSON.parse(e);this.applyAllSettings(t),window.app&&typeof window.app.updateAllGUIControls=="function"&&window.app.updateAllGUIControls(),alert("Settings imported from clipboard!")}catch(e){console.error("Failed to import settings:",e),alert("Failed to import settings: "+e.message)}}gatherAllSettings(){const e={};for(const[t,n]of Object.entries(this.managers))n&&typeof n.getSettings=="function"&&(e[t]=n.getSettings());return window.model&&(e.model={position:window.model.position.toArray(),rotation:[window.model.rotation.x,window.model.rotation.y,window.model.rotation.z],scale:window.model.scale.toArray()}),e}applyAllSettings(e){for(const[t,n]of Object.entries(this.managers))n&&typeof n.applySettings=="function"&&e[t]&&n.applySettings(e[t]);e.model&&window.model&&(e.model.position&&window.model.position.fromArray(e.model.position),e.model.rotation&&window.model.rotation.set(e.model.rotation[0],e.model.rotation[1],e.model.rotation[2]),e.model.scale&&window.model.scale.fromArray(e.model.scale))}applyDefaultSettings(){this.defaultSettings&&this.applyAllSettings(this.defaultSettings)}getDefaultSettings(){return this.defaultSettings}getFallbackSettings(){return{background:{gradientTop:"#3865ad",gradientBottom:"#0101bc",gradientAlpha:1},ground:{mode:"Infinite Canvas",color:"#222222",roughness:1,metalness:0,shadowOpacity:.4,receiveShadow:!0,castShadow:!1,visible:!0},dustParticles:{count:1150,size:.0095,sizeRandomness:1.4,color:"#0d529c",opacity:1,speed:.5,horizontalRange:3,verticalRange:2,verticalOffset:1,visible:!0,blur:.31,depthBlur:!1,depthBlurStrength:.16,depthFocusDistance:2,depthFocusRange:1},directionalLight:{intensity:1.43,color:"#ffffff",castShadow:!0,shadowBias:0,shadowBlur:1,shadowMapWidth:1024,shadowMapHeight:1024,posX:1.35,posY:1.57,posZ:.9,showHelper:!1,position:{x:1.35,y:1.57,z:.9}},ambientLight:{intensity:.4,color:"#ffffff"},camera:{position:[.571641187606234,.6054805751022576,-.4710421975258844],rotation:[-2.6821474237876726,.8865063263260724,2.775502273890531],target:[-.04078270409635462,.38393067967272315,-.023247738115800942]},model:{position:[0,-.02,0],rotation:[0,0,0],scale:[1,1,1]}}}saveToLocalStorage(e="threeJsSettings"){const t=this.gatherAllSettings();try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch(n){return console.error("Failed to save to local storage:",n),!1}}loadFromLocalStorage(e="threeJsSettings"){try{const t=localStorage.getItem(e);if(t){const n=JSON.parse(t);return this.applyAllSettings(n),!0}}catch(t){console.error("Failed to load from local storage:",t)}return!1}exportAsFile(e="three-scene-settings.json"){const t=this.gatherAllSettings(),n=JSON.stringify(t,null,2),i=new Blob([n],{type:"application/json"}),s=URL.createObjectURL(i),o=document.createElement("a");o.href=s,o.download=e,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(s)}importFromFile(){return new Promise((e,t)=>{const n=document.createElement("input");n.type="file",n.accept=".json",n.onchange=i=>{const s=i.target.files[0];if(s){const o=new FileReader;o.onload=a=>{try{const l=JSON.parse(a.target.result);this.applyAllSettings(l),e(l)}catch(l){t(l)}},o.readAsText(s)}else t(new Error("No file selected"))},n.click()})}}class Q_{constructor(){console.log("[FlexFrame Build] animation-player.js v28.3 - INLINE BUTTON STYLES - Build: 2026-01-20-0930"),this.mixer=null,this.actions=[],this.currentAction=null,this.isPlaying=!1,this.currentTime=0,this.duration=0,this.playbackSpeed=1,this.isVisible=!1,this.alwaysVisible=!1,this.hideTimeout=null,this.hasPlayedOnce=!1,this.createPlayerElements(),this.setupEventListeners()}createPlayerElements(){this.triggerArea=document.createElement("div"),this.triggerArea.className="animation-player-trigger",document.body.appendChild(this.triggerArea),this.container=document.createElement("div"),this.container.className="animation-player",this.container.innerHTML=`
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
        `,document.body.appendChild(this.container),this.initializeElements()}initializeElements(){this.playPauseBtn=this.container.querySelector("#play-pause-btn"),this.playIcon=this.container.querySelector(".play-icon"),this.pauseIcon=this.container.querySelector(".pause-icon"),this.currentTimeDisplay=this.container.querySelector("#current-time"),this.totalTimeDisplay=this.container.querySelector("#total-time"),this.timelineSlider=this.container.querySelector("#timeline-slider"),this.speedBtn=this.container.querySelector("#speed-btn"),this.speedText=this.container.querySelector("#speed-text"),this.speedMenu=this.container.querySelector("#speed-menu"),this.screenshotBtn=this.container.querySelector("#screenshot-btn"),this.onScreenshotRequest=null,setTimeout(()=>{this.playIcon&&this.pauseIcon&&this.updatePlayPauseIcon()},10),this.setVisibility(!0)}setupEventListeners(){this.playPauseBtn.addEventListener("click",()=>{this.togglePlayPause()}),this.screenshotBtn&&this.screenshotBtn.addEventListener("click",()=>{this.onScreenshotRequest&&this.onScreenshotRequest()}),this.timelineSlider.addEventListener("input",e=>{const t=parseFloat(e.target.value)/100;this.seekTo(t)}),this.speedBtn.addEventListener("click",e=>{e.stopPropagation(),this.speedMenu.classList.toggle("show")}),this.speedMenu.addEventListener("click",e=>{if(e.target.classList.contains("speed-option")){const t=parseFloat(e.target.dataset.speed);this.setPlaybackSpeed(t),this.speedMenu.querySelectorAll(".speed-option").forEach(n=>n.classList.remove("active")),e.target.classList.add("active"),this.speedMenu.classList.remove("show")}}),document.addEventListener("click",()=>{this.speedMenu.classList.remove("show")}),document.addEventListener("keydown",e=>{if(!(!this.mixer||!this.currentAction))switch(e.code){case"Space":e.target.tagName!=="INPUT"&&(e.preventDefault(),this.togglePlayPause());break;case"ArrowLeft":this.seekRelative(-.1);break;case"ArrowRight":this.seekRelative(.1);break}}),this.triggerArea.addEventListener("mouseenter",()=>{this.isVisible&&!this.alwaysVisible&&this.showPlayer()}),this.container.addEventListener("mouseenter",()=>{this.isVisible&&!this.alwaysVisible&&(this.clearHideTimeout(),this.container.classList.add("visible"))}),this.container.addEventListener("mouseleave",()=>{this.isVisible&&!this.alwaysVisible&&this.scheduleHide()})}showPlayer(){this.clearHideTimeout(),this.container.classList.add("visible"),this.alwaysVisible||this.scheduleHide()}hidePlayer(){this.alwaysVisible||this.container.classList.remove("visible")}scheduleHide(){this.alwaysVisible||(this.clearHideTimeout(),this.hideTimeout=setTimeout(()=>{!this.container.matches(":hover")&&!this.alwaysVisible&&this.hidePlayer()},2e3))}onCanvasInteraction(){this.isVisible&&!this.alwaysVisible&&this.showPlayer()}clearHideTimeout(){this.hideTimeout&&(clearTimeout(this.hideTimeout),this.hideTimeout=null)}setVisibility(e){this.isVisible=e,this.triggerArea.classList.toggle("active",e),e?(this.container.style.display="block",this.alwaysVisible?(this.container.classList.add("always-visible","visible"),this.clearHideTimeout()):(this.container.classList.remove("always-visible"),this.showPlayer())):(this.container.style.display="none",this.container.classList.remove("visible","always-visible"),this.clearHideTimeout())}setAlwaysVisible(e){const t=this.alwaysVisible;this.alwaysVisible=e,e?(this.container.classList.add("always-visible","visible"),this.clearHideTimeout()):(this.container.classList.remove("always-visible"),t&&this.isVisible&&this.scheduleHide())}setMixer(e,t){this.mixer=e,this.actions=[],t&&t.length>0&&(t.forEach(n=>{const i=e.clipAction(n);this.actions.push(i)}),this.actions.length>0&&(this.currentAction=this.actions[0],this.duration=this.currentAction.getClip().duration,this.updateTimeDisplay(),this.updatePlayPauseIcon()))}updatePlayPauseIcon(){if(!this.playIcon||!this.pauseIcon){console.warn("Animation player icons not found");return}this.isPlaying?(this.playIcon.style.display="none",this.pauseIcon.style.display="block"):(this.playIcon.style.display="block",this.pauseIcon.style.display="none")}togglePlayPause(){this.currentAction&&(this.isPlaying=!this.isPlaying,this.isPlaying?(this.currentAction.play(),this.currentAction.paused=!1,this.hasPlayedOnce||(this.hasPlayedOnce=!0,this.clearHideTimeout(),this.startFirstPlayFade())):this.currentAction.paused=!0,this.updatePlayPauseIcon())}seekTo(e){if(!this.currentAction)return;const t=e*this.duration;this.currentAction.time=t,this.currentTime=t,this.updateTimeDisplay(),this.isPlaying||this.mixer.update(0)}seekRelative(e){if(!this.currentAction)return;const n=Math.max(0,Math.min(this.duration,this.currentTime+e))/this.duration;this.seekTo(n),this.updateSliderPosition()}setPlaybackSpeed(e){this.playbackSpeed=e,this.speedText.textContent=`${e}x`,this.currentAction&&this.currentAction.setEffectiveTimeScale(e)}update(e){!this.mixer||!this.currentAction||!this.isPlaying||(this.currentTime=this.currentAction.time,this.currentTime>=this.duration&&(this.currentTime=0,this.currentAction.time=0),this.updateTimeDisplay(),this.updateSliderPosition())}updateTimeDisplay(){this.currentTimeDisplay.textContent=this.formatTime(this.currentTime),this.totalTimeDisplay.textContent=this.formatTime(this.duration)}updateSliderPosition(){const e=this.duration>0?this.currentTime/this.duration*100:0;this.timelineSlider.value=e}formatTime(e){const t=Math.floor(e/60),n=Math.floor(e%60);return`${t}:${n.toString().padStart(2,"0")}`}getSettings(){return{isPlaying:this.isPlaying,currentTime:this.currentTime,playbackSpeed:this.playbackSpeed,isVisible:this.isVisible,alwaysVisible:this.alwaysVisible}}applySettings(e){if(e.playbackSpeed!==void 0&&this.setPlaybackSpeed(e.playbackSpeed),e.currentTime!==void 0){const t=this.duration>0?e.currentTime/this.duration:0;this.seekTo(t)}e.isVisible!==void 0&&this.setVisibility(e.isVisible),e.alwaysVisible!==void 0&&this.setAlwaysVisible(e.alwaysVisible),e.isPlaying!==void 0&&this.currentAction&&(e.isPlaying!==this.isPlaying?this.togglePlayPause():this.updatePlayPauseIcon())}setScreenshotCallback(e){this.onScreenshotRequest=e}setScreenshotButtonVisible(e){this.screenshotBtn&&this.screenshotBtn.style.setProperty("display",e?"flex":"none","important")}}const J_=(r,e,t)=>new Promise(n=>{const i=e==="jpg"?"image/jpeg":e==="webp"?"image/webp":"image/png",s=e==="png"?void 0:t;r.toBlob(n,i,s)}),e0=(r,e)=>{const t=URL.createObjectURL(r),n=document.createElement("a");n.href=t,n.download=e,n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n),setTimeout(()=>URL.revokeObjectURL(t),1e3)},t0=r=>{if(r===0)return"0 Bytes";const e=1024,t=["Bytes","KB","MB","GB"],n=Math.floor(Math.log(r)/Math.log(e));return parseFloat((r/Math.pow(e,n)).toFixed(2))+" "+t[n]},n0=()=>{const r=document.createElement("div");r.className="camera-flash",document.body.appendChild(r),setTimeout(()=>{r.parentNode&&r.parentNode.removeChild(r)},300)},Ei=async(r,e,t,n={})=>{const i={transparent:!1,format:"png",quality:1,filename:"screenshot",width:1920,height:1080,addTimestamp:!0,frameWidth:null,frameHeight:null,containerWidth:null,containerHeight:null,...n};try{console.log("Taking screenshot with settings:",i),n0();const s=r.getSize(new Te),o=t.aspect,a=document.createElement("canvas");a.width=i.width,a.height=i.height;const l=new Yc({canvas:a,antialias:!0,preserveDrawingBuffer:!0,alpha:i.transparent});if(l.setSize(i.width,i.height),l.setPixelRatio(1),l.shadowMap.enabled=r.shadowMap.enabled,l.shadowMap.type=r.shadowMap.type,l.toneMapping=r.toneMapping,l.toneMappingExposure=r.toneMappingExposure,i.transparent)l.setClearColor(0,0);else{const _=r.getClearColor(new ge),g=r.getClearAlpha();l.setClearColor(_,g)}const c=t.clone();if(c.aspect=i.width/i.height,i.frameWidth&&i.frameHeight&&i.containerWidth&&i.containerHeight){const _=i.containerWidth/i.containerHeight,g=i.width/i.height;let m,p;g>_,m=i.frameWidth/i.containerWidth,p=i.frameHeight/i.containerHeight;const b=p,E=t.fov;c.fov=E*b,console.log(`📸 Frame crop: frame ${i.frameWidth}x${i.frameHeight}, container ${i.containerWidth}x${i.containerHeight}, fovScale: ${b.toFixed(3)}, FOV: ${E} -> ${c.fov.toFixed(1)}`)}c.updateProjectionMatrix();let h=null;i.transparent&&e.background&&(h=e.background,e.background=null),l.render(e,c),h!==null&&(e.background=h);let d=i.filename;if(i.addTimestamp){const g=new Date().toISOString().replace(/[:.]/g,"-").slice(0,-5);d+="_"+g}d+="."+i.format;const u=await J_(a,i.format,i.quality);e0(u,d),l.dispose();const f=t0(u.size);return console.log(`📸 Screenshot saved: ${d} (${i.width}×${i.height}, ${f})`),{success:!0,filename:d,size:f}}catch(s){return console.error("Screenshot failed:",s),{success:!1,error:s.message}}},so={takeScreenshot:Ei,quickScreenshot:(r,e,t)=>Ei(r,e,t),transparentScreenshot:(r,e,t)=>Ei(r,e,t,{transparent:!0}),hdScreenshot:(r,e,t)=>Ei(r,e,t,{width:1280,height:720}),uhd4kScreenshot:(r,e,t)=>Ei(r,e,t,{width:3840,height:2160}),thumbnailScreenshot:(r,e,t)=>Ei(r,e,t,{width:400,height:300,filename:"thumbnail"})};class Ks{setupSearchListener(){if(this.menuType!=="search")return;const e=document.getElementById("searchInput"),t=document.getElementById("searchActionBtn"),n=t==null?void 0:t.querySelector(".search-icon"),i=t==null?void 0:t.querySelector(".clear-icon"),s=document.getElementById("searchSuggestions");if(!e||!t)return;const o=()=>{if(!this.allExercises||this.allExercises.length===0)return;const h=new Set;this.allExercises.forEach(g=>{g.muscleGroup.forEach(m=>h.add(m))});const d=Array.from(h).slice(0,5),u=new Set;this.allExercises.forEach(g=>{g.equipment.forEach(m=>u.add(m))});const f=Array.from(u).slice(0,4),_=this.allExercises.slice(0,6);return{muscles:d,equipment:f,popularExercises:_}},a=()=>{if(!s||this.searchQuery.length>0)return;const h=o();if(!h)return;let d="";h.popularExercises.length>0&&(d+='<div class="search-suggestion-category">Popular Exercises</div>',h.popularExercises.forEach(u=>{d+=`
                            <div class="search-suggestion-item" data-value="${u.name}">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
                                </svg>
                                <span class="search-suggestion-text">${u.name}</span>
                            </div>
                        `})),h.muscles.length>0&&(d+='<div class="search-suggestion-category">Muscle Groups</div>',h.muscles.forEach(u=>{d+=`
                            <div class="search-suggestion-item" data-value="${u}">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                                </svg>
                                <span class="search-suggestion-text">${u}</span>
                            </div>
                        `})),h.equipment.length>0&&(d+='<div class="search-suggestion-category">Equipment</div>',h.equipment.forEach(u=>{d+=`
                            <div class="search-suggestion-item" data-value="${u}">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
                                </svg>
                                <span class="search-suggestion-text">${u}</span>
                            </div>
                        `})),s.innerHTML=d,s.style.display="block",s.querySelectorAll(".search-suggestion-item").forEach(u=>{u.addEventListener("click",()=>{const f=u.getAttribute("data-value"),_=this.allExercises.find(g=>g.name===f);_?(this.selectThumbnail(_),l(),e.value="",this.searchQuery="",c()):(e.value=f,this.searchQuery=f.toLowerCase().trim(),c(),l(),this.filterDataForMenu(),this.renderVirtualizedGrid())})})},l=()=>{s&&(s.style.display="none")},c=()=>{this.searchQuery&&this.searchQuery.length>0?(n.style.display="none",i.style.display="block"):(n.style.display="block",i.style.display="none")};e.addEventListener("focus",()=>{(!this.searchQuery||this.searchQuery.length===0)&&a()}),e.addEventListener("blur",()=>{setTimeout(()=>l(),200)}),e.addEventListener("input",h=>{this.searchQuery=h.target.value.toLowerCase().trim(),c(),this.searchQuery.length===0?a():l(),this.filterDataForMenu(),this.renderVirtualizedGrid()}),e.addEventListener("keydown",h=>{h.key==="Enter"?(this.searchQuery=e.value.toLowerCase().trim(),c(),l(),this.filterDataForMenu(),this.renderVirtualizedGrid()):h.key==="Escape"&&l()}),t.addEventListener("click",()=>{this.searchQuery&&this.searchQuery.length>0?(e.value="",this.searchQuery="",c(),l(),this.filterDataForMenu(),this.renderVirtualizedGrid(),e.focus()):(this.searchQuery=e.value.toLowerCase().trim(),c(),l(),this.filterDataForMenu(),this.renderVirtualizedGrid())}),this.toggleBtn&&this.toggleBtn.addEventListener("click",()=>{this.menuType==="search"&&this.isOpen&&setTimeout(()=>{e.focus(),c()},150)})}constructor(e){var n;this.menuType=e,this.isOpen=!1,this.hasBeenOpened=!1,this.allExercises=[],this.filteredData=[],this.searchQuery="",this.scrollAmount=200,this.selectedId=null,this.itemHeight=230,this.containerHeight=400,this.visibleItems=Math.ceil(this.containerHeight/this.itemHeight)+4,this.startIndex=0,this.endIndex=this.visibleItems,this.loopMultiplier=3,this.isLooping=!1,this.renderBuffer=2,this.lastRenderedStart=-1,this.lastRenderedEnd=-1,this.scrollVelocity=0,this.scrollDecay=.9,this.maxVelocity=35,this.isScrolling=!1,this.isDragging=!1,this.startY=0,this.startScrollTop=0,this.lastY=0,this.lastTime=0,this.velocityTracker=[],this.recentlyDragged=!1,this.hasDragged=!1,this.scrollInteractionDelay=1500,this.lastScrollInteraction=0;const t=((n=window.flexframeSettings)==null?void 0:n.primaryColor)||"#4a9eff";console.log("[FlexFrame Glow] flexframeSettings:",window.flexframeSettings),console.log("[FlexFrame Glow] primaryColor value:",t),console.log("[FlexFrame Glow] Using primary color for thumbnail glow:",t),this.settings={widthPercentage:90,backgroundColor:"#000000",backgroundOpacity:.9,borderRadius:12,keepOpen:!1,glowColor:t,glowIntensity:.6,glowSize:20},console.log("[FlexFrame Glow] Menu settings initialized with glowColor:",this.settings.glowColor),this.initializeElements(),this.loadExerciseData()}updateTitle(e){const t=document.getElementById(`${this.menuType}TitleHeader`);t&&(t.textContent=e)}initializeElements(){console.log(`🔍 initializeElements for ${this.menuType}`),this.toggleBtn=document.getElementById(`${this.menuType}Toggle`),this.dropdown=document.getElementById(`${this.menuType}Dropdown`),this.scrollContainer=document.getElementById(`${this.menuType}Container`),this.thumbnailGrid=document.getElementById(`${this.menuType}Grid`),this.scrollUpBtn=document.getElementById(`${this.menuType}ScrollUp`),this.scrollDownBtn=document.getElementById(`${this.menuType}ScrollDown`),console.log("🔍 Elements found - toggleBtn:",this.toggleBtn,"dropdown:",this.dropdown),this.toggleBtn||console.error(`❌ BUTTON NOT FOUND: ${this.menuType}Toggle`)}async loadExerciseData(){try{const e="https://FlexFrame.b-cdn.net/Exercise%20Catalogue%20For%20Menus%20%26%20Thumbnails/exercises.json",t=`?t=${Date.now()}`;let i=await(await fetch(e+t)).json();if(typeof window.flexframeSettings<"u"&&window.flexframeSettings.hiddenExercises&&Array.isArray(window.flexframeSettings.hiddenExercises)&&window.flexframeSettings.hiddenExercises.length>0){const s=window.flexframeSettings.hiddenExercises,o=i.length;i=i.filter(a=>!s.includes(a.id)),console.log(`🔒 Filtered ${o-i.length} hidden exercises (${i.length} remaining)`)}if(typeof window.flexframeSettings<"u"&&window.flexframeSettings.customThumbnails&&typeof window.flexframeSettings.customThumbnails=="object"){const s=window.flexframeSettings.customThumbnails;let o=0;i=i.map(a=>s[a.id]?(o++,{...a,thumbnailUrl:s[a.id]}):a),o>0&&console.log(`🖼️ Applied ${o} custom thumbnails`)}this.allExercises=i,console.log("✅ Loaded exercises from CDN:",e),this.filterDataForMenu(),this.setupEventListeners(),setTimeout(()=>{this.updateStyles(),this.updateGlowStyles(),this.setupSearchListener(),this.updateThumbnailGlowStyles()},100)}catch(e){console.error("Failed to load exercise data:",e),this.generateFallbackData()}}filterDataForMenu(){var e,t;switch(this.menuType){case"exercises":const n=(e=window.menuManager)==null?void 0:e.selectedMuscle,i=(t=window.menuManager)==null?void 0:t.selectedEquipment;n&&i?(this.filteredData=this.allExercises.filter(a=>{var u,f,_;const l=((u=a.information)==null?void 0:u.primaryMuscle)===n,c=(_=(f=a.information)==null?void 0:f.secondaryMuscles)==null?void 0:_.includes(n),h=l||c,d=a.equipment.includes(i);return h&&d}),this.filteredData.sort((a,l)=>{var d,u;const c=((d=a.information)==null?void 0:d.primaryMuscle)===n,h=((u=l.information)==null?void 0:u.primaryMuscle)===n;return c&&!h?-1:!c&&h?1:0}),console.log(`Filtering exercises by muscle: ${n} AND equipment: ${i}, found ${this.filteredData.length} exercises`)):n?(this.filteredData=this.allExercises.filter(a=>{var h,d,u;const l=((h=a.information)==null?void 0:h.primaryMuscle)===n,c=(u=(d=a.information)==null?void 0:d.secondaryMuscles)==null?void 0:u.includes(n);return l||c}),this.filteredData.sort((a,l)=>{var d,u;const c=((d=a.information)==null?void 0:d.primaryMuscle)===n,h=((u=l.information)==null?void 0:u.primaryMuscle)===n;return c&&!h?-1:!c&&h?1:0}),console.log(`Filtering exercises by muscle: ${n}, found ${this.filteredData.length} exercises`)):i?(this.filteredData=this.allExercises.filter(a=>a.equipment.includes(i)),console.log(`Filtering exercises by equipment: ${i}, found ${this.filteredData.length} exercises`)):this.filteredData=this.allExercises;break;case"muscles":const s=new Set;this.allExercises.forEach(a=>{a.muscleGroup.forEach(l=>s.add(l))}),this.filteredData=Array.from(s).map((a,l)=>({id:`muscle_${l}`,name:a,thumbnailUrl:`https://picsum.photos/200/200?random=${100+l}`,type:"muscle",relatedExercises:this.allExercises.filter(c=>c.muscleGroup.includes(a))}));break;case"equipment":const o=new Set;this.allExercises.forEach(a=>{a.equipment.forEach(l=>o.add(l))}),this.filteredData=Array.from(o).map((a,l)=>({id:`equipment_${l}`,name:a,thumbnailUrl:`https://picsum.photos/200/200?random=${200+l}`,type:"equipment",relatedExercises:this.allExercises.filter(c=>c.equipment.includes(a))}));break;case"search":this.searchQuery?(this.filteredData=this.allExercises.map(a=>{var g,m,p,b;const l=a.name.toLowerCase().includes(this.searchQuery),c=a.muscleGroup.some(E=>E.toLowerCase().includes(this.searchQuery)),h=a.equipment.some(E=>E.toLowerCase().includes(this.searchQuery)),d=(m=(g=a.information)==null?void 0:g.primaryMuscle)==null?void 0:m.toLowerCase().includes(this.searchQuery),u=(b=(p=a.information)==null?void 0:p.secondaryMuscles)==null?void 0:b.some(E=>E.toLowerCase().includes(this.searchQuery));let f="",_="";return l?(f="Exercise Name",_=a.name):d?(f="Primary Muscle",_=a.information.primaryMuscle):u?(f="Secondary Muscles",_=a.information.secondaryMuscles.find(y=>y.toLowerCase().includes(this.searchQuery))||a.information.secondaryMuscles.join(", ")):c?(f="Muscle Group",_=a.muscleGroup.find(y=>y.toLowerCase().includes(this.searchQuery))||a.muscleGroup.join(", ")):h&&(f="Equipment",_=a.equipment.find(y=>y.toLowerCase().includes(this.searchQuery))||a.equipment.join(", ")),{...a,searchMatch:{type:f,text:_}}}).filter(a=>a.searchMatch.type!==""),console.log(`Search found ${this.filteredData.length} exercises for: "${this.searchQuery}"`)):this.filteredData=this.allExercises;break}this.renderVirtualizedGrid()}generateFallbackData(){this.filteredData=Array.from({length:20},(e,t)=>({id:t+1,name:`${this.menuType} ${t+1}`,thumbnailUrl:`https://picsum.photos/200/200?random=${t+1}`})),this.renderVirtualizedGrid()}renderVirtualizedGrid(){var i,s;if(!this.thumbnailGrid)return;if(this.thumbnailGrid.innerHTML="",this.menuType==="exercises"){const o=(i=window.menuManager)==null?void 0:i.selectedMuscle,a=(s=window.menuManager)==null?void 0:s.selectedEquipment,l=this.dropdown.querySelector(".filter-status-box");if(l&&l.remove(),o||a){const c=document.createElement("div");c.className="filter-status-box";let h='<div class="filter-status-title">Active Filters:</div>';o&&(h+=`
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
                    `),c.innerHTML=h,c.querySelectorAll(".filter-clear").forEach(u=>{u.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation();const _=f.target.dataset.filter;_==="muscle"?(window.menuManager.selectedMuscle=null,window.menuManager.menus.muscles&&(window.menuManager.menus.muscles.selectedId=null,window.menuManager.menus.muscles.updateVirtualizedContent())):_==="equipment"&&(window.menuManager.selectedEquipment=null,window.menuManager.menus.equipment&&(window.menuManager.menus.equipment.selectedId=null,window.menuManager.menus.equipment.updateVirtualizedContent())),this.filterDataForMenu()})});const d=this.dropdown.querySelector(".thumbnail-scroll-controls");d&&d.after(c)}}this.topSpacer=document.createElement("div"),this.bottomSpacer=document.createElement("div"),this.visibleContainer=document.createElement("div"),this.thumbnailGrid.appendChild(this.topSpacer),this.thumbnailGrid.appendChild(this.visibleContainer),this.thumbnailGrid.appendChild(this.bottomSpacer);const e=this.menuType!=="search",t=e?this.loopMultiplier:1,n=this.filteredData.length*this.itemHeight*t;this.bottomSpacer.style.height=`${n}px`,setTimeout(()=>{this.scrollContainer.scrollTop=e?this.filteredData.length*this.itemHeight:0,this.updateVirtualizedContent()},50)}updateVirtualizedContent(){if(!this.visibleContainer||!this.filteredData.length||this.isDragging)return;const e=this.scrollContainer.scrollTop,t=this.filteredData.length,n=this.menuType!=="search",i=n?this.loopMultiplier:1;t*this.itemHeight*i;let s=e;const o=t*this.itemHeight;n&&e<o*.1?(this.scrollContainer.scrollTop=e+o,s=this.scrollContainer.scrollTop):n&&e>o*2.9&&(this.scrollContainer.scrollTop=e-o,s=this.scrollContainer.scrollTop);const a=Math.floor(s/this.itemHeight),l=this.visibleItems+this.renderBuffer*2;this.startIndex=a,this.endIndex=a+l;const c=this.scrollContainer.scrollTop,h=this.filteredData.length*this.itemHeight,d=Math.floor(c/this.itemHeight)*this.itemHeight;this.topSpacer.style.height=`${d}px`,this.bottomSpacer.style.height=`${h*i-d-(this.endIndex-this.startIndex)*this.itemHeight}px`;const u=new Set;let f=null;for(let g=this.startIndex;g<this.endIndex;g++){const m=this.filteredData.length;let p;if(n)p=(g%m+m)%m;else if(p=g,p>=m)continue;const b=this.filteredData[p];if(!b)continue;const E=`${b.id}_pos_${g}`;u.add(E);let y=this.visibleContainer.querySelector(`[data-position-id="${E}"]`),R="";if(this.menuType,this.menuType==="search"&&b.searchMatch&&this.searchQuery){const A=M=>{const x=new RegExp(`(${this.searchQuery})`,"gi");return M.replace(x,"<mark>$1</mark>")};R=`
                    <div class="thumbnail-search-match">
                        <div class="search-match-type">${b.searchMatch.type}</div>
                        <div class="search-match-text">${A(b.searchMatch.text)}</div>
                    </div>
                `,console.log(`Generated searchMatchHTML for ${b.name}:`,R)}let P="";if(this.menuType==="exercises"&&b.information){const A=b.information.primaryMuscle||"",M=b.information.secondaryMuscles||[];P=`
                    <div class="thumbnail-muscle-info">
                        ${A?`<div class="primary-muscle"><strong>Primary:</strong> ${A}</div>`:""}
                        ${M.length>0?`<div class="secondary-muscles"><strong>Secondary:</strong> ${M.join(", ")}</div>`:""}
                    </div>
                `}const T=`
                <img src="${b.thumbnailUrl}" alt="${b.name}" loading="lazy">
                <div class="thumbnail-label">${b.name}</div>
                ${R}
                ${P}
            `;if(!y)y=document.createElement("div"),y.className="thumbnail-item",y.dataset.id=b.id,y.dataset.positionId=E,y.innerHTML=T,y.addEventListener("click",A=>{if(this.recentlyDragged&&this.hasDragged){A.preventDefault(),A.stopPropagation();return}this.selectThumbnail(b)}),f&&f.nextSibling?this.visibleContainer.insertBefore(y,f.nextSibling):!f&&this.visibleContainer.firstChild?this.visibleContainer.insertBefore(y,this.visibleContainer.firstChild):this.visibleContainer.appendChild(y);else{const A=y.classList.contains("selected");y.innerHTML=T,A&&y.classList.add("selected")}f=y}const _=Array.from(this.visibleContainer.querySelectorAll(".thumbnail-item"));for(const g of _){const m=g.dataset.positionId;u.has(m)||this.visibleContainer.removeChild(g)}setTimeout(()=>{if(this.updateStyles(),this.updateThumbnailGlowStyles(),this.selectedId){const g=this.visibleContainer.querySelector(`[data-id="${this.selectedId}"]`);g&&g.classList.add("selected")}},50)}selectThumbnail(e){this.selectedId=e.id,this.visibleContainer.querySelectorAll(".thumbnail-item").forEach(o=>o.classList.remove("selected"));const n=this.visibleContainer.querySelector(`[data-id="${e.id}"]`);n&&n.classList.add("selected");const i=this.menuType==="search"?"exercisesSelected":`${this.menuType}Selected`,s=new CustomEvent(i,{detail:{item:e,menuType:this.menuType}});document.dispatchEvent(s)}setupEventListeners(){var e,t;console.log(`🎯 Setting up click listener for ${this.menuType}, button:`,this.toggleBtn),console.log("🎯 Button parent:",(e=this.toggleBtn)==null?void 0:e.parentElement),console.log("🎯 Button is in flexframe container:",((t=this.toggleBtn)==null?void 0:t.closest("#flexframe-viewer-container"))!==null),this.toggleBtn.onclick=n=>{console.log(`💥 CLICK HANDLER FIRED for ${this.menuType}!`),n.stopPropagation(),this.toggleMenu()},document.addEventListener("click",n=>{(n.target===this.toggleBtn||this.toggleBtn.contains(n.target))&&console.log(`🌍 DOCUMENT CLICK detected on ${this.menuType} button, target:`,n.target)},!0),this.scrollUpBtn.addEventListener("click",()=>{this.scrollContainer.scrollBy({top:-this.scrollAmount,behavior:"smooth"})}),this.scrollDownBtn.addEventListener("click",()=>{this.scrollContainer.scrollBy({top:this.scrollAmount,behavior:"smooth"})}),this.scrollContainer.addEventListener("wheel",n=>{n.preventDefault();const i=n.deltaY*3.5;this.scrollVelocity+=i*.2,this.scrollVelocity=Math.max(-this.maxVelocity,Math.min(this.maxVelocity,this.scrollVelocity)),this.lastScrollInteraction=Date.now(),this.isScrolling||this.startMomentumScroll()}),this.scrollContainer.addEventListener("scroll",()=>{this.updateVirtualizedContent(),this.updateScrollButtons()}),this.scrollContainer.addEventListener("mousedown",n=>{this.startDrag(n.clientY),n.preventDefault()}),this.scrollContainer.addEventListener("touchstart",n=>{this.startDrag(n.touches[0].clientY),n.preventDefault()},{passive:!1}),document.addEventListener("mousemove",n=>{this.isDragging&&(this.handleDrag(n.clientY),n.preventDefault())}),document.addEventListener("touchmove",n=>{this.isDragging&&(this.handleDrag(n.touches[0].clientY),n.preventDefault())},{passive:!1}),document.addEventListener("mouseup",()=>{this.isDragging&&this.endDrag()}),document.addEventListener("touchend",()=>{this.isDragging&&this.endDrag()}),this.scrollContainer.addEventListener("selectstart",n=>{this.isDragging&&n.preventDefault()}),document.addEventListener("keydown",n=>{this.isOpen&&(n.key==="Escape"?this.settings.keepOpen||this.closeMenu():n.key==="ArrowUp"?(n.preventDefault(),this.scrollContainer.scrollBy({top:-this.scrollAmount,behavior:"smooth"})):n.key==="ArrowDown"&&(n.preventDefault(),this.scrollContainer.scrollBy({top:this.scrollAmount,behavior:"smooth"})))}),this.scrollContainer.addEventListener("scroll",()=>{this.updateScrollButtons()})}updateThumbnailGlowStyles(){const e=this.settings.glowColor.replace("#",""),t=parseInt(e.substr(0,2),16),n=parseInt(e.substr(2,2),16),i=parseInt(e.substr(4,2),16),s=`rgba(${t}, ${n}, ${i}, ${this.settings.glowIntensity*.8})`,o=`thumbnail-glow-${this.menuType}`;let a=document.getElementById(o);a||(a=document.createElement("style"),a.id=o,document.head.appendChild(a)),a.textContent=`
            #${this.menuType}Grid .thumbnail-item.selected {
                border-color: ${this.settings.glowColor};
                box-shadow: 0 0 ${this.settings.glowSize}px ${s};
            }
            #${this.menuType}Grid .thumbnail-item.selected::before {
                background: ${this.settings.glowColor};
                box-shadow: 0 0 ${Math.floor(this.settings.glowSize*.5)}px ${s};
            }
        `}startMomentumScroll(){this.isScrolling=!0,this.momentumScrollFrame()}momentumScrollFrame(){if(Math.abs(this.scrollVelocity)<.1){this.isScrolling=!1,this.scrollVelocity=0;return}this.scrollContainer.scrollBy({top:this.scrollVelocity,behavior:"auto"}),this.updateVirtualizedContent(),this.scrollVelocity*=this.scrollDecay,requestAnimationFrame(()=>this.momentumScrollFrame())}startDrag(e){this.isDragging=!0,this.startY=e,this.startScrollTop=this.scrollContainer.scrollTop,this.lastY=e,this.lastTime=Date.now(),this.velocityTracker=[],this.hasDragged=!1,this.isScrolling=!1,this.scrollVelocity=0,this.scrollContainer.style.cursor="grabbing"}handleDrag(e){if(!this.isDragging)return;const t=this.startY-e;Math.abs(t)>5&&(this.hasDragged=!0);const n=this.startScrollTop+t;this.scrollContainer.scrollTop=n;const i=Date.now(),s=i-this.lastTime,o=e-this.lastY;if(s>0){const a=o/s;this.velocityTracker.push({velocity:a,time:i}),this.velocityTracker=this.velocityTracker.filter(l=>i-l.time<100)}this.lastY=e,this.lastTime=i}endDrag(){if(this.isDragging){if(this.isDragging=!1,this.scrollContainer.style.cursor="grab",this.hasDragged&&(this.recentlyDragged=!0,this.lastScrollInteraction=Date.now(),setTimeout(()=>{this.recentlyDragged=!1,this.hasDragged=!1},100)),this.velocityTracker.length>0){const e=this.velocityTracker.reduce((t,n)=>t+n.velocity,0)/this.velocityTracker.length;this.scrollVelocity=-e*15,this.scrollVelocity=Math.max(-this.maxVelocity,Math.min(this.maxVelocity,this.scrollVelocity)),Math.abs(this.scrollVelocity)>1&&this.startMomentumScroll()}this.velocityTracker=[],setTimeout(()=>{this.updateVirtualizedContent()},50)}}hasRecentScrollInteraction(){return Date.now()-this.lastScrollInteraction<this.scrollInteractionDelay}momentumScrollFrame(){if(Math.abs(this.scrollVelocity)<.1){this.isScrolling=!1,this.scrollVelocity=0;return}this.scrollContainer.scrollBy({top:this.scrollVelocity,behavior:"auto"}),this.scrollVelocity*=this.scrollDecay,requestAnimationFrame(()=>this.momentumScrollFrame())}updateScrollButtons(){this.scrollUpBtn.style.opacity="1",this.scrollDownBtn.style.opacity="1",this.scrollUpBtn.disabled=!1,this.scrollDownBtn.disabled=!1}toggleMenu(){console.log(`🔄 toggleMenu called for ${this.menuType}, isOpen:`,this.isOpen),this.isOpen?this.closeMenu():this.openMenu()}openMenu(){if(console.log(`🟢 openMenu called for ${this.menuType}`),this.isOpen=!0,document.dispatchEvent(new CustomEvent("closeAllThumbnailMenus",{detail:{except:this.menuType}})),this.menuType==="search"){this.filterDataForMenu(),this.renderVirtualizedGrid();const t=document.getElementById("searchInput");t&&setTimeout(()=>t.focus(),150)}this.dropdown.classList.add("show"),console.log(`✅ Added .show class to ${this.menuType} dropdown, classes:`,this.dropdown.className),this.toggleBtn.classList.add("active"),this.scrollContainer&&(this.scrollContainer.style.cursor="grab",this.hasBeenOpened||(setTimeout(()=>{const t=this.scrollContainer.scrollTop;this.scrollContainer.scrollTo({top:t+30,behavior:"smooth"}),setTimeout(()=>{this.scrollContainer.scrollTo({top:t,behavior:"smooth"})},400)},300),this.hasBeenOpened=!0));const e=document.querySelector(".thumbnail-grid-container");e&&e.classList.add("menu-active"),setTimeout(()=>{this.visibleContainer&&this.updateVirtualizedContent(),this.updateScrollButtons()},100)}closeMenu(){if(this.dropdown.classList.remove("show"),this.toggleBtn.classList.remove("active"),this.isOpen=!1,!(window.menuManager&&Object.values(window.menuManager.menus).some(t=>t.isOpen))){const t=document.querySelector(".thumbnail-grid-container");t&&t.classList.remove("menu-active")}}updateStyles(){if(!this.dropdown)return;const e=this.settings.backgroundColor.replace("#",""),t=parseInt(e.substr(0,2),16),n=parseInt(e.substr(2,2),16),i=parseInt(e.substr(4,2),16);this.dropdown.style.width="250px",this.dropdown.style.background=`rgba(${t}, ${n}, ${i}, ${this.settings.backgroundOpacity})`,this.dropdown.style.borderRadius=`${this.settings.borderRadius}px`}updateGlowStyles(){if(!this.toggleBtn)return;const e=this.settings.glowColor.replace("#",""),t=parseInt(e.substr(0,2),16),n=parseInt(e.substr(2,2),16),i=parseInt(e.substr(4,2),16),s=`rgba(${t}, ${n}, ${i}, ${this.settings.glowIntensity})`,o=`rgba(${t}, ${n}, ${i}, ${this.settings.glowIntensity*.5})`,a=`glow-${this.menuType}`;let l=document.getElementById(a);l||(l=document.createElement("style"),l.id=a,document.head.appendChild(l)),l.textContent=`
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
        `}getSettings(){return{...this.settings}}applySettings(e){this.settings={...this.settings,...e},this.updateStyles(),this.updateGlowStyles(),this.updateThumbnailGlowStyles()}}class i0{constructor(){var o;console.log("🎬 MultiThumbnailMenuSystem constructor started"),this.menus={},this.selectedMuscle=null,this.selectedEquipment=null,this.selectedExerciseId=null;const e=((o=window.flexframeSettings)==null?void 0:o.primaryColor)||"#4a9eff";console.log("[FlexFrame Glow] MultiThumbnailMenuSystem using primaryColor:",e),document.documentElement.style.setProperty("--flexframe-primary-color",e);const t=e.replace("#",""),n=parseInt(t.substring(0,2),16),i=parseInt(t.substring(2,4),16),s=parseInt(t.substring(4,6),16);document.documentElement.style.setProperty("--flexframe-primary-color-rgb",`${n}, ${i}, ${s}`),console.log("[FlexFrame Glow] Set CSS variables --flexframe-primary-color:",e,"RGB:",n,i,s),this.settings={widthPercentage:90,backgroundColor:"#000000",backgroundOpacity:.9,borderRadius:12,keepOpen:!1,glowColor:e,glowIntensity:.6,glowSize:20},console.log("📋 Calling initializeMenus..."),this.initializeMenus(),console.log("🎧 Calling setupGlobalListeners..."),this.setupGlobalListeners(),console.log("✅ MultiThumbnailMenuSystem constructor complete")}initializeMenus(){console.log("🏗️ initializeMenus started"),console.log("Creating exercises menu..."),this.menus.exercises=new Ks("exercises"),console.log("Creating muscles menu..."),this.menus.muscles=new Ks("muscles"),console.log("Creating equipment menu..."),this.menus.equipment=new Ks("equipment"),console.log("Creating search menu..."),this.menus.search=new Ks("search"),console.log("✅ All 4 menus created:",this.menus)}setupGlobalListeners(){document.addEventListener("exercisesSelected",t=>{this.selectedExerciseId=t.detail.item.id}),document.addEventListener("searchSelected",t=>{var i;console.log("Search selection made, selecting corresponding items in other tabs");const n=t.detail.item;if(console.log("Selected exercise data:",n),this.menus.muscles&&((i=n.information)!=null&&i.primaryMuscle)){const s=n.information.primaryMuscle;this.selectedMuscle=s,console.log("Setting muscle:",s);const o=this.menus.muscles.filteredData.find(a=>a.name===s);console.log("Found muscle item:",o),o&&(this.menus.muscles.selectedId=o.id)}if(this.menus.equipment&&n.equipment&&n.equipment.length>0){const s=n.equipment[0];this.selectedEquipment=s,console.log("Setting equipment:",s);const o=this.menus.equipment.filteredData.find(a=>a.name===s);console.log("Found equipment item:",o),o&&(this.menus.equipment.selectedId=o.id)}this.menus.exercises&&this.menus.exercises.filterDataForMenu(),this.menus.exercises&&n.id&&(this.menus.exercises.selectedId=n.id,this.selectedExerciseId=n.id,console.log("Set exercise selection:",n.id)),setTimeout(()=>{var s,o,a;if((s=this.menus.exercises)!=null&&s.visibleContainer&&n.id){this.menus.exercises.visibleContainer.querySelectorAll(".thumbnail-item").forEach(h=>h.classList.remove("selected"));const c=this.menus.exercises.visibleContainer.querySelector(`[data-id="${n.id}"]`);c?(c.classList.add("selected"),console.log("Applied visual selection to exercise")):console.log("Exercise element not found in DOM")}if((o=this.menus.muscles)!=null&&o.visibleContainer&&this.menus.muscles.selectedId){this.menus.muscles.visibleContainer.querySelectorAll(".thumbnail-item").forEach(h=>h.classList.remove("selected"));const c=this.menus.muscles.visibleContainer.querySelector(`[data-id="${this.menus.muscles.selectedId}"]`);c?(c.classList.add("selected"),console.log("Applied visual selection to muscle")):console.log("Muscle element not found in DOM")}if((a=this.menus.equipment)!=null&&a.visibleContainer&&this.menus.equipment.selectedId){this.menus.equipment.visibleContainer.querySelectorAll(".thumbnail-item").forEach(h=>h.classList.remove("selected"));const c=this.menus.equipment.visibleContainer.querySelector(`[data-id="${this.menus.equipment.selectedId}"]`);c?(c.classList.add("selected"),console.log("Applied visual selection to equipment")):console.log("Equipment element not found in DOM")}},300)}),document.addEventListener("musclesSelected",t=>{this.selectedMuscle=t.detail.item.name,console.log("Muscle selected:",this.selectedMuscle),this.menus.exercises&&(this.menus.exercises.filterDataForMenu(),setTimeout(()=>this.restoreExerciseSelection(),200),setTimeout(()=>this.restoreExerciseSelection(),400))}),document.addEventListener("equipmentSelected",t=>{this.selectedEquipment=t.detail.item.name,console.log("Equipment selected:",this.selectedEquipment),this.menus.exercises&&(this.menus.exercises.filterDataForMenu(),setTimeout(()=>this.restoreExerciseSelection(),200),setTimeout(()=>this.restoreExerciseSelection(),400))}),document.addEventListener("closeAllThumbnailMenus",t=>{var i;const n=(i=t.detail)==null?void 0:i.except;Object.entries(this.menus).forEach(([s,o])=>{s!==n&&o.closeMenu()})});const e=document.querySelector(".thumbnail-grid-container");if(e){e.addEventListener("mouseenter",()=>{e.classList.add("menu-visible")});const t=e.querySelector(".menu-hint-tab");t&&t.addEventListener("click",n=>{n.stopPropagation(),e.classList.contains("menu-visible")||e.classList.contains("menu-active")?(Object.values(this.menus).forEach(i=>{i.isOpen&&i.closeMenu()}),e.classList.remove("menu-visible")):e.classList.add("menu-visible")})}document.addEventListener("click",t=>{if(e&&!e.contains(t.target)){if(Object.values(this.menus).some(s=>s.hasRecentScrollInteraction&&s.hasRecentScrollInteraction()))return;e.classList.remove("menu-visible"),Object.values(this.menus).some(s=>s.isOpen)&&Object.values(this.menus).forEach(s=>{s.isOpen&&s.closeMenu()})}})}restoreExerciseSelection(){if(this.selectedExerciseId&&this.menus.exercises&&this.menus.exercises.visibleContainer){const e=this.menus.exercises.visibleContainer.querySelector(`[data-id="${this.selectedExerciseId}"]`);e?(e.classList.add("selected"),console.log("Restored exercise selection:",this.selectedExerciseId)):console.log("Could not restore - element not found:",this.selectedExerciseId)}}updateAllSettings(e){this.settings={...this.settings,...e},Object.values(this.menus).forEach(t=>{t.applySettings(this.settings),t.updateGlowStyles(),t.updateThumbnailGlowStyles()})}getSettings(){return{...this.settings}}applySettings(e){this.updateAllSettings(e)}async copySettingsToClipboard(){const e=JSON.stringify(this.settings,null,2);try{await navigator.clipboard.writeText(e),alert("Multi-thumbnail menu settings copied to clipboard!")}catch(t){console.error("Failed to copy to clipboard:",t),alert("Failed to copy settings to clipboard.")}}}class Zs{constructor(e){this.menuType=e,this.isOpen=!1,this.scrollAmount=200,this.infoData=[],this.settings={widthPercentage:90,backgroundColor:"#000000",backgroundOpacity:.9,borderRadius:12,keepOpen:!1,glowColor:"#4a9eff",glowIntensity:.6,glowSize:20},this.initializeElements(),this.setupEventListeners(),this.loadInfoData()}initializeElements(){this.toggleBtn=document.getElementById(`${this.menuType}Toggle`),this.dropdown=document.querySelector(`.thumbnail-dropdown-right#${this.menuType}Dropdown`),this.scrollContainer=document.getElementById(`${this.menuType}Container`),this.grid=document.getElementById(`${this.menuType}Grid`),this.scrollUpBtn=document.getElementById(`${this.menuType}ScrollUp`),this.scrollDownBtn=document.getElementById(`${this.menuType}ScrollDown`),(!this.toggleBtn||!this.dropdown)&&console.error(`Failed to initialize ${this.menuType} menu elements`)}async loadInfoData(){try{const t=await(await fetch(Ii("data/right-menu-info.json"))).json();t[this.menuType]?(this.infoData=t[this.menuType].items||[],this.renderInfoItems()):(console.warn(`No data found for ${this.menuType}`),this.infoData=[])}catch(e){console.error("Error loading right menu info data:",e),this.infoData=[]}}renderInfoItems(){if(this.grid){if(this.grid.innerHTML="",this.infoData.length===0){this.grid.innerHTML='<div class="info-step-empty">No information available.</div>';return}this.infoData.forEach(e=>{const t=document.createElement("div");t.className="info-step-item",t.innerHTML=`
                <div class="info-step-title">${e.name}</div>
                <div class="info-step-text">${e.text||""}</div>
            `,this.grid.appendChild(t)})}}setupEventListeners(){this.toggleBtn&&(this.toggleBtn.addEventListener("click",e=>{e.stopPropagation(),this.toggleMenu()}),this.scrollUpBtn&&this.scrollDownBtn&&(this.scrollUpBtn.addEventListener("click",()=>{this.scrollContainer.scrollBy({top:-this.scrollAmount,behavior:"smooth"})}),this.scrollDownBtn.addEventListener("click",()=>{this.scrollContainer.scrollBy({top:this.scrollAmount,behavior:"smooth"})})))}toggleMenu(){this.isOpen?this.closeMenu():this.openMenu()}openMenu(){document.dispatchEvent(new CustomEvent("closeAllRightMenus",{detail:{except:this.menuType}})),this.dropdown.classList.add("show"),this.toggleBtn.classList.add("active"),this.isOpen=!0;const e=document.querySelector(".thumbnail-grid-container-right");e&&e.classList.add("menu-active")}closeMenu(){this.dropdown.classList.remove("show"),this.toggleBtn.classList.remove("active"),this.isOpen=!1;const e=document.querySelector(".thumbnail-grid-container-right");e&&(document.querySelectorAll(".thumbnail-dropdown-right.show").length>0||e.classList.remove("menu-active"))}updateStyles(){if(!this.dropdown)return;const e=`${this.settings.widthPercentage}%`,t=this.settings.backgroundColor,n=this.settings.backgroundOpacity,i=`${this.settings.borderRadius}px`;this.dropdown.style.width=e,this.dropdown.style.maxWidth=e,this.dropdown.style.backgroundColor=`${t}${Math.round(n*255).toString(16).padStart(2,"0")}`,this.dropdown.style.borderRadius=i}getSettings(){return{...this.settings}}applySettings(e){this.settings={...this.settings,...e},this.updateStyles()}updateTitle(e){this.toggleBtn&&(this.toggleBtn.textContent=e)}updateContent(e){if(this.grid){if(this.grid.innerHTML="",!e||e.length===0){this.grid.innerHTML='<div class="info-step-empty">No information available.</div>';return}e.forEach(t=>{const n=document.createElement("div");n.className="info-step-item",n.innerHTML=`
                <div class="info-step-title">${t.heading||""}</div>
                <div class="info-step-text">${t.content||""}</div>
            `,this.grid.appendChild(n)})}}}class s0{constructor(){this.menus={},this.settings={widthPercentage:90,backgroundColor:"#000000",backgroundOpacity:.9,borderRadius:12,keepOpen:!1,glowColor:"#4a9eff",glowIntensity:.6,glowSize:20},this.initializeMenus(),this.setupGlobalListeners()}initializeMenus(){this.menus.info1=new Zs("info1"),this.menus.info2=new Zs("info2"),this.menus.info3=new Zs("info3"),this.menus.info4=new Zs("info4")}setupGlobalListeners(){document.addEventListener("closeAllRightMenus",t=>{var i;const n=(i=t.detail)==null?void 0:i.except;Object.entries(this.menus).forEach(([s,o])=>{s!==n&&o.closeMenu()})});const e=document.querySelector(".thumbnail-grid-container-right");if(e){e.addEventListener("mouseenter",()=>{e.classList.add("menu-visible")});const t=e.querySelector(".menu-hint-tab-right");t&&t.addEventListener("click",n=>{n.stopPropagation(),e.classList.contains("menu-visible")||e.classList.contains("menu-active")?(Object.values(this.menus).forEach(i=>{i.isOpen&&i.closeMenu()}),e.classList.remove("menu-visible")):e.classList.add("menu-visible")})}document.addEventListener("click",t=>{e&&!e.contains(t.target)&&(e.classList.remove("menu-visible"),Object.values(this.menus).some(i=>i.isOpen)&&Object.values(this.menus).forEach(i=>{i.isOpen&&i.closeMenu()}))})}updateAllSettings(e){this.settings={...this.settings,...e},Object.values(this.menus).forEach(t=>{t.applySettings(this.settings)})}getSettings(){return{...this.settings}}updateFromConfig(e){console.log("Updating right menu from config:",e);const t={exerciseInformation:"info1",howToGuide:"info2",setupGuide:"info3",alternativeExercises:"info4"};Object.entries(e).forEach(([n,i])=>{const s=t[n];s&&this.menus[s]&&(i.title&&this.menus[s].updateTitle(i.title),i.sections&&Array.isArray(i.sections)&&this.menus[s].updateContent(i.sections))})}copySettingsToClipboard(){const e=JSON.stringify(this.settings,null,2);navigator.clipboard.writeText(e).then(()=>{console.log("Right menu settings copied to clipboard")}).catch(t=>{console.error("Failed to copy settings:",t)})}}class r0{constructor(){console.log("[FlexFrame AR] ARHandler initialized"),this.currentConfig=null,this.qrModal=null,this.branding={logoUrl:null,websiteUrl:"https://thegymmanagerblog.com",companyName:"FlexFrame",callToAction:"Visit FlexFrame"},this.setupARButton()}setBranding(e){e.logoUrl&&(this.branding.logoUrl=e.logoUrl),e.websiteUrl&&(this.branding.websiteUrl=e.websiteUrl),e.companyName&&(this.branding.companyName=e.companyName),e.callToAction&&(this.branding.callToAction=e.callToAction),console.log("[FlexFrame AR] Branding updated:",this.branding)}getDeviceType(){const e=navigator.userAgent.toLowerCase();return/iphone|ipad|ipod/.test(e)?"ios":/android/.test(e)?"android":"desktop"}supportsAR(){const e=this.getDeviceType();if(e==="ios"){const t=document.createElement("a");return t.relList&&t.relList.supports&&t.relList.supports("ar")}else if(e==="android")return!0;return!1}updateConfig(e){this.currentConfig=e,console.log("[FlexFrame AR] Config updated:",e==null?void 0:e.ar)}setupARButton(){const e=()=>{const t=document.getElementById("ar-btn");t?(t.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),this.launchAR()}),console.log("[FlexFrame AR] AR button handler attached")):setTimeout(e,500)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):setTimeout(e,100)}launchAR(){var t;if(console.log("[FlexFrame AR] Launch AR triggered"),!((t=this.currentConfig)!=null&&t.ar)){console.warn("[FlexFrame AR] No AR config available"),this.showNoARMessage();return}const e=this.getDeviceType();switch(console.log("[FlexFrame AR] Device type:",e),e){case"ios":this.launchIOSAR();break;case"android":this.launchAndroidAR();break;case"desktop":this.showQRCodeModal();break}}launchIOSAR(){const e=this.currentConfig.ar.usdz;if(!e){console.warn("[FlexFrame AR] No USDZ file available"),this.launchAndroidAR();return}console.log("[FlexFrame AR] Launching iOS AR with USDZ:",e);let t=e;const n=[];this.branding.websiteUrl&&(n.push(`callToAction=${encodeURIComponent(this.branding.callToAction)}`),n.push(`checkoutTitle=${encodeURIComponent(this.branding.companyName)}`),n.push(`checkoutSubtitle=${encodeURIComponent("Tap to visit website")}`),n.push(`canonicalWebPageURL=${encodeURIComponent(this.branding.websiteUrl)}`)),this.branding.logoUrl&&n.push(`custom=${encodeURIComponent(this.branding.logoUrl)}`),n.length>0&&(t+="#"+n.join("&")),console.log("[FlexFrame AR] iOS AR URL with branding:",t);const i=document.createElement("a");i.setAttribute("rel","ar"),i.setAttribute("href",t);const s=document.createElement("img");s.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",s.style.width="1px",s.style.height="1px",i.appendChild(s),document.body.appendChild(i),i.click(),document.body.removeChild(i)}launchAndroidAR(){const e=this.currentConfig.ar.glb;if(!e){console.warn("[FlexFrame AR] No GLB file available for AR"),this.showNoARMessage();return}console.log("[FlexFrame AR] Launching Android AR with GLB:",e);let t=[`file=${encodeURIComponent(e)}`,"mode=ar_preferred",`title=${encodeURIComponent(this.currentConfig.exerciseId||"Exercise")}`];this.branding.websiteUrl&&(t.push(`link=${encodeURIComponent(this.branding.websiteUrl)}`),t.push(`linkText=${encodeURIComponent(this.branding.callToAction)}`));const n="intent://arvr.google.com/scene-viewer/1.0?"+t.join("&")+`#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(e)};end;`;console.log("[FlexFrame AR] Android AR URL with branding:",n),window.location.href=n}showQRCodeModal(){console.log("[FlexFrame AR] Showing QR code modal for desktop"),this.qrModal||this.createQRModal();const e=this.generateARPageUrl();this.updateQRCode(e),this.qrModal.style.display="flex"}createQRModal(){var l;const e=((l=window.flexframeSettings)==null?void 0:l.primaryColor)||"#4a9eff",n=(c=>{const h=parseInt(c.slice(1,3),16),d=parseInt(c.slice(3,5),16),u=parseInt(c.slice(5,7),16);return{r:h,g:d,b:u}})(e),i=`rgb(${Math.floor(n.r*.15)}, ${Math.floor(n.g*.15)}, ${Math.floor(n.b*.2+20)})`,s=`rgb(${Math.floor(n.r*.1)}, ${Math.floor(n.g*.12)}, ${Math.floor(n.b*.18+30)})`;this.qrModal=document.createElement("div"),this.qrModal.id="ar-qr-modal",this.qrModal.innerHTML=`
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
        `,console.log("[FlexFrame AR] QR code generated for URL:",e)}showNoARMessage(){alert("AR is not available for this exercise. Please ensure the exercise has AR models configured.")}hideQRModal(){this.qrModal&&(this.qrModal.style.display="none")}}const tc=new r0;class o0{constructor(e){this.app=e,this.isOpen=!1,this.panel=null,this.currentSettings={},this.init()}init(){document.addEventListener("keydown",e=>{if(e.key==="t"||e.key==="T"){if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;this.toggle()}}),this.createPanel()}toggle(){this.isOpen?this.close():this.open()}open(){this.isOpen=!0,this.panel.style.display="block",this.loadCurrentSettings(),setTimeout(()=>{this.panel.style.opacity="1",this.panel.style.transform="translateX(0)"},10)}close(){this.isOpen=!1,this.panel.style.opacity="0",this.panel.style.transform="translateX(100%)",setTimeout(()=>{this.panel.style.display="none"},300)}loadCurrentSettings(){var t,n,i,s,o,a,l,c,h,d,u,f,_,g,m,p,b,E,y,R,P,T,A,M,x,C,k,N,H,$,V,j,G,te,ne,_e,Ee,Fe,X,ee,me,se,Se,Ve,we,ot,it,Be,L,Pt,ke,ze,ye,et;const e=window.flexframeSettings||{};this.currentSettings={primaryColor:e.primaryColor||"#4a9eff",spinnerColor:((t=e.uiSettings)==null?void 0:t.spinnerColor)||"#00f510",playerBgColor:((i=(n=e.uiSettings)==null?void 0:n.player)==null?void 0:i.bgColor)||"#1f1f1f",playerBgOpacity:((o=(s=e.uiSettings)==null?void 0:s.player)==null?void 0:o.bgOpacity)??0,playerButtonColor:((l=(a=e.uiSettings)==null?void 0:a.player)==null?void 0:l.buttonColor)||"#c20e1d",playerButtonOpacity:((h=(c=e.uiSettings)==null?void 0:c.player)==null?void 0:h.buttonOpacity)??1,playerIconColor:((u=(d=e.uiSettings)==null?void 0:d.player)==null?void 0:u.iconColor)||"#ffffff",playerAccentColor:((_=(f=e.uiSettings)==null?void 0:f.player)==null?void 0:_.accentColor)||"#c20e1d",menuBgColor:((m=(g=e.uiSettings)==null?void 0:g.menu)==null?void 0:m.bgColor)||"#000000",menuBgOpacity:((b=(p=e.uiSettings)==null?void 0:p.menu)==null?void 0:b.bgOpacity)??.9,menuTextColor:((y=(E=e.uiSettings)==null?void 0:E.menu)==null?void 0:y.textColor)||"#ffffff",menuTextOpacity:((P=(R=e.uiSettings)==null?void 0:R.menu)==null?void 0:P.textOpacity)??1,menuAccentColor:((A=(T=e.uiSettings)==null?void 0:T.menu)==null?void 0:A.accentColor)||"#ff00f7",thumbnailLabelColor:((x=(M=e.uiSettings)==null?void 0:M.menu)==null?void 0:x.thumbnailLabelColor)||"#000000",thumbnailLabelOpacity:((k=(C=e.uiSettings)==null?void 0:C.menu)==null?void 0:k.thumbnailLabelOpacity)??.1,hideInfoPanel:((N=e.uiSettings)==null?void 0:N.hideRightMenu)??!1,showScreenshotButton:((H=e.uiSettings)==null?void 0:H.showScreenshotButton)??!0,bgGradientTop:(($=e.backgroundSettings)==null?void 0:$.gradientTop)||"#3865ad",bgGradientBottom:((V=e.backgroundSettings)==null?void 0:V.gradientBottom)||"#0101bc",bgGradientOpacity:((j=e.backgroundSettings)==null?void 0:j.gradientAlpha)??1,ambientIntensity:((te=(G=e.lightingSettings)==null?void 0:G.ambientLight)==null?void 0:te.intensity)??.4,ambientColor:((_e=(ne=e.lightingSettings)==null?void 0:ne.ambientLight)==null?void 0:_e.color)||"#ffffff",directionalIntensity:((Fe=(Ee=e.lightingSettings)==null?void 0:Ee.directionalLight)==null?void 0:Fe.intensity)??1.43,directionalColor:((ee=(X=e.lightingSettings)==null?void 0:X.directionalLight)==null?void 0:ee.color)||"#ffffff",particlesEnabled:((me=e.particleSettings)==null?void 0:me.visible)??!0,particlesCount:((se=e.particleSettings)==null?void 0:se.count)??1150,particlesSize:((Se=e.particleSettings)==null?void 0:Se.size)??.0095,particlesColor:((Ve=e.particleSettings)==null?void 0:Ve.color)||"#0d529c",particlesOpacity:((we=e.particleSettings)==null?void 0:we.opacity)??1,particlesSpeed:((ot=e.particleSettings)==null?void 0:ot.speed)??.5,skinColor:((it=e.materialSettings)==null?void 0:it.skinColor)||"#ffdbac",skinOpacity:((Be=e.materialSettings)==null?void 0:Be.skinOpacity)??.4,skinRoughness:((L=e.materialSettings)==null?void 0:L.skinRoughness)??.7,skinMetalness:((Pt=e.materialSettings)==null?void 0:Pt.skinMetalness)??0,skinTransmission:((ke=e.materialSettings)==null?void 0:ke.skinTransmission)??0,skinThickness:((ze=e.materialSettings)==null?void 0:ze.skinThickness)??0,skinIor:((ye=e.materialSettings)==null?void 0:ye.skinIor)??1.5,skinEnvIntensity:((et=e.materialSettings)==null?void 0:et.skinEnvIntensity)??1},this.updateInputs()}updateInputs(){Object.keys(this.currentSettings).forEach(e=>{const t=this.panel.querySelector(`[data-setting="${e}"]`);if(t)if(t.type==="checkbox")t.checked=this.currentSettings[e];else if(t.type==="range"){t.value=this.currentSettings[e];const n=t.nextElementSibling;n&&n.classList.contains("te-range-value")&&(n.textContent=this.formatValue(e,this.currentSettings[e]))}else t.value=this.currentSettings[e]})}formatValue(e,t){return e.includes("Opacity")||e.includes("Roughness")||e.includes("Metalness")||e.includes("Transmission")||e.includes("Intensity")||e.includes("Speed")?parseFloat(t).toFixed(2):e.includes("Count")?parseInt(t):e.includes("Size")&&e!=="particlesSize"?parseFloat(t).toFixed(3):e==="particlesSize"?parseFloat(t).toFixed(4):t}createPanel(){this.panel=document.createElement("div"),this.panel.id="theme-editor-panel",this.panel.innerHTML=`
            <div class="te-header">
                <h2>Theme Editor</h2>
                <span class="te-hint">Press T to close</span>
                <button class="te-close-btn">&times;</button>
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
                        <div class="te-subsection">
                            <h4>Loading Spinner</h4>
                            ${this.createColorInput("spinnerColor","Spinner Color")}
                        </div>
                        <div class="te-subsection">
                            <h4>Animation Player</h4>
                            ${this.createColorInput("playerBgColor","Background")}
                            ${this.createRangeInput("playerBgOpacity","BG Opacity",0,1,.01)}
                            ${this.createColorInput("playerButtonColor","Button Color")}
                            ${this.createRangeInput("playerButtonOpacity","Button Opacity",0,1,.01)}
                            ${this.createColorInput("playerIconColor","Icon Color")}
                            ${this.createColorInput("playerAccentColor","Accent Color")}
                        </div>
                        <div class="te-subsection">
                            <h4>Menu Styling</h4>
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

                <!-- Material Settings Section -->
                <div class="te-section">
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

            <!-- Save Section -->
            <div class="te-footer">
                <div class="te-save-section">
                    <input type="text" id="te-theme-name" placeholder="Enter theme name..." />
                    <button id="te-save-btn" class="te-btn-primary">
                        Save Theme
                    </button>
                </div>
                <div id="te-save-message" class="te-message"></div>
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
        `}setupEventListeners(){this.panel.querySelector(".te-close-btn").addEventListener("click",()=>this.close()),this.panel.querySelectorAll(".te-section-header").forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.section,i=this.panel.querySelector(`#section-${n}`),s=t.querySelector(".te-toggle-icon");window.getComputedStyle(i).display==="none"?(i.style.display="block",s.textContent="▼"):(i.style.display="none",s.textContent="▶")})}),this.panel.querySelectorAll("input[data-setting]").forEach(t=>{t.addEventListener("input",n=>{const i=n.target.dataset.setting;let s;if(n.target.type==="checkbox")s=n.target.checked;else if(n.target.type==="range"){s=parseFloat(n.target.value);const o=n.target.nextElementSibling;o&&(o.textContent=this.formatValue(i,s))}else s=n.target.value;if(n.target.type==="color"){const o=this.panel.querySelector(`[data-hex-for="${i}"]`);o&&(o.textContent=s)}this.currentSettings[i]=s,i!=="primaryColor"&&this.applySettingLive(i,s)})}),this.panel.querySelector("#te-save-btn").addEventListener("click",()=>this.saveTheme());const e=this.panel.querySelector(".te-save-primary-btn");e&&e.addEventListener("click",()=>{this.savePrimaryColor()})}applySettingLive(e,t){if(e.startsWith("bgGradient")&&this.app.sceneManager&&(this.app.backgroundParams.gradientTop=this.currentSettings.bgGradientTop,this.app.backgroundParams.gradientBottom=this.currentSettings.bgGradientBottom,this.app.backgroundParams.gradientAlpha=this.currentSettings.bgGradientOpacity,this.app.sceneManager.updateGradientBackground(this.app.backgroundParams)),e==="ambientIntensity"&&this.app.lightingSystem&&(this.app.lightingSystem.ambientLight.intensity=t),e==="ambientColor"&&this.app.lightingSystem&&this.app.lightingSystem.ambientLight.color.set(t),e==="directionalIntensity"&&this.app.lightingSystem&&(this.app.lightingSystem.directionalLight.intensity=t),e==="directionalColor"&&this.app.lightingSystem&&this.app.lightingSystem.directionalLight.color.set(t),e.startsWith("particles")&&this.app.particleSystem)if(this.app.particleSystem.params.visible=this.currentSettings.particlesEnabled,this.app.particleSystem.params.count=this.currentSettings.particlesCount,this.app.particleSystem.params.size=this.currentSettings.particlesSize,this.app.particleSystem.params.color=this.currentSettings.particlesColor,this.app.particleSystem.params.opacity=this.currentSettings.particlesOpacity,this.app.particleSystem.params.speed=this.currentSettings.particlesSpeed,e==="particlesCount"||e==="particlesEnabled")this.app.particleSystem.createDustParticles();else{const n=this.app.particleSystem.dustMaterial;n&&(n.color.set(this.currentSettings.particlesColor),n.opacity=this.currentSettings.particlesOpacity,n.size=this.currentSettings.particlesSize,n.needsUpdate=!0),this.app.particleSystem.dustParticles&&(this.app.particleSystem.dustParticles.visible=this.currentSettings.particlesEnabled)}if(e.startsWith("skin")&&window.model&&this.updateSkinMaterial(),e.startsWith("player")&&(console.log("Theme Editor: Updating player styling for",e,t),this.updatePlayerStyling()),(e.startsWith("menu")||e.startsWith("thumbnail"))&&(console.log("Theme Editor: Updating menu styling for",e,t),this.updateMenuStyling()),e==="hideInfoPanel"){const n=document.querySelector(".thumbnail-grid-container-right");n&&(n.style.display=t?"none":"")}if(e==="showScreenshotButton"){const n=document.querySelector(".screenshot-btn, #screenshot-btn");n&&(n.style.display=t?"flex":"none")}e==="spinnerColor"&&(console.log("Theme Editor: Updating spinner color to",t),this.app.updateSpinnerColor(t))}savePrimaryColor(){const e=this.currentSettings.primaryColor,t=this.panel.querySelector(".te-save-primary-btn");if(!t)return;const n=t.textContent;t.textContent="Saving...",t.disabled=!0;const i=new FormData;i.append("action","flexframe_save_settings"),i.append("nonce",this.nonce),i.append("primary_color",e),fetch(this.ajaxUrl,{method:"POST",body:i}).then(s=>s.json()).then(s=>{s.success?(t.textContent="Applying...",setTimeout(()=>{window.location.reload()},500)):(t.textContent="Error!",t.style.background="#f44336",setTimeout(()=>{t.textContent=n,t.style.background="#4CAF50",t.disabled=!1},2e3),console.error("Failed to save primary color:",s))}).catch(s=>{t.textContent="Error!",t.style.background="#f44336",setTimeout(()=>{t.textContent=n,t.style.background="#4CAF50",t.disabled=!1},2e3),console.error("Error saving primary color:",s)})}savePrimaryColor(){const e=this.currentSettings.primaryColor,t=this.panel.querySelector(".te-save-primary-btn");if(!t)return;const n=t.textContent;t.textContent="Saving...",t.disabled=!0;const i=new FormData;i.append("action","flexframe_save_settings"),i.append("nonce",this.nonce),i.append("primary_color",e),fetch(this.ajaxUrl,{method:"POST",body:i}).then(s=>s.json()).then(s=>{s.success?(t.textContent="Applying...",setTimeout(()=>{window.location.reload()},500)):(t.textContent="Error!",t.style.background="#f44336",setTimeout(()=>{t.textContent=n,t.style.background="#4CAF50",t.disabled=!1},2e3),console.error("Failed to save primary color:",s))}).catch(s=>{t.textContent="Error!",t.style.background="#f44336",setTimeout(()=>{t.textContent=n,t.style.background="#4CAF50",t.disabled=!1},2e3),console.error("Error saving primary color:",s)})}updatePrimaryColor(e){}updatePrimaryColorLegacy(e){window.flexframeSettings&&(window.flexframeSettings.primaryColor=e),document.documentElement.style.setProperty("--flexframe-primary-color",e);const t=e.replace("#",""),n=parseInt(t.substring(0,2),16),i=parseInt(t.substring(2,4),16),s=parseInt(t.substring(4,6),16);document.documentElement.style.setProperty("--flexframe-primary-color-rgb",`${n}, ${i}, ${s}`),this.app.updateProgressBarColor&&this.app.updateProgressBarColor(e),this.app.updateSpinnerColor&&this.app.updateSpinnerColor(e),window.menuManager&&(window.menuManager.menus&&Object.values(window.menuManager.menus).forEach(a=>{a.settings&&(a.settings.glowColor=e)}),window.menuManager.glowSettings&&(window.menuManager.glowSettings.glowColor=e)),this.app.particleSystem&&(this.app.particleSystem.params.color=e,this.app.particleSystem.dustMaterial&&(this.app.particleSystem.dustMaterial.color.set(e),this.app.particleSystem.dustMaterial.needsUpdate=!0));let o=document.getElementById("te-primary-color-style");o||(o=document.createElement("style"),o.id="te-primary-color-style",document.head.appendChild(o)),o.textContent=`
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
        `,console.log("Theme Editor: Player styles injected",{bgRgba:l,btnRgba:c,iconColor:o,accentColor:a})}updateMenuStyling(){const e=this.currentSettings.menuBgColor,t=this.currentSettings.menuBgOpacity,n=this.currentSettings.menuTextColor,i=this.currentSettings.menuTextOpacity??1,s=this.currentSettings.menuAccentColor,o=this.currentSettings.thumbnailLabelColor||"#000000",a=this.currentSettings.thumbnailLabelOpacity??.1,l=this.hexToRgba(e,t),c=this.hexToRgba(n,i),h=this.hexToRgba(e,Math.min(t+.2,1)),d=this.hexToRgba(o,a);let u=document.getElementById("te-menu-style");u||(u=document.createElement("style"),u.id="te-menu-style",document.head.appendChild(u)),u.textContent=`
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
                background-color: ${l} !important;
            }
            
            /* Menu toggle buttons */
            #flexframe-viewer-container .thumbnail-menu-toggle,
            .thumbnail-grid-container .thumbnail-menu-toggle,
            button.thumbnail-menu-toggle,
            .thumbnail-menu-toggle {
                background-color: ${l} !important;
                color: ${c} !important;
            }
            
            /* Toggle button text and icons */
            #flexframe-viewer-container .thumbnail-menu-toggle span,
            .thumbnail-menu-toggle span {
                color: ${c} !important;
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
                color: ${c} !important;
            }
            
            /* Thumbnail items */
            .thumbnail-item {
                color: ${c} !important;
            }
            .thumbnail-label {
                color: ${c} !important;
                background: linear-gradient(to top, ${d}, transparent) !important;
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
                background-color: ${l} !important;
                border: 2px solid ${s} !important;
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
                background-color: ${h} !important;
                color: ${c} !important;
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
            .info-step-item:hover {
                border-color: ${s} !important;
            }
            
            /* Menu hint tabs */
            #flexframe-viewer-container .menu-hint-tab,
            .menu-hint-tab,
            .menu-hint-tab-right {
                background-color: ${l} !important;
                border-color: ${s} !important;
            }
        `,console.log("Theme Editor: Menu styles injected",{bgRgba:l,textRgba:c,accentColor:s,labelGradient:d})}hexToRgba(e,t){const n=parseInt(e.slice(1,3),16),i=parseInt(e.slice(3,5),16),s=parseInt(e.slice(5,7),16);return`rgba(${n}, ${i}, ${s}, ${t})`}async saveTheme(){var i;const e=this.panel.querySelector("#te-theme-name").value.trim();if(!e){this.showMessage("Please enter a theme name","error");return}const t=this.panel.querySelector("#te-save-btn");t.disabled=!0,t.innerHTML="Saving...";const n={primary_color:this.currentSettings.primaryColor,spinner_color:this.currentSettings.spinnerColor,use_logo_loader:!1,logo_loader_animation:"pulse",logo_loader_size:100,player_bg_color:this.currentSettings.playerBgColor,player_bg_opacity:this.currentSettings.playerBgOpacity,player_button_bg_color:this.currentSettings.playerButtonColor,player_button_bg_opacity:this.currentSettings.playerButtonOpacity,player_icon_color:this.currentSettings.playerIconColor,player_accent_color:this.currentSettings.playerAccentColor,player_always_visible:"no",menu_bg_color:this.currentSettings.menuBgColor,menu_bg_opacity:this.currentSettings.menuBgOpacity,menu_text_color:this.currentSettings.menuTextColor,menu_text_opacity:this.currentSettings.menuTextOpacity,menu_accent_color:this.currentSettings.menuAccentColor,thumbnail_label_color:this.currentSettings.thumbnailLabelColor,thumbnail_label_opacity:this.currentSettings.thumbnailLabelOpacity,hide_right_menu:this.currentSettings.hideInfoPanel,show_screenshot_button:this.currentSettings.showScreenshotButton,skin_color:this.currentSettings.skinColor,skin_opacity:this.currentSettings.skinOpacity,skin_roughness:this.currentSettings.skinRoughness,skin_metalness:this.currentSettings.skinMetalness,skin_transmission:this.currentSettings.skinTransmission,skin_thickness:this.currentSettings.skinThickness,skin_ior:this.currentSettings.skinIor,skin_env_intensity:this.currentSettings.skinEnvIntensity,bg_gradient_top:this.currentSettings.bgGradientTop,bg_gradient_bottom:this.currentSettings.bgGradientBottom,bg_gradient_opacity:this.currentSettings.bgGradientOpacity,ambient_intensity:this.currentSettings.ambientIntensity,ambient_color:this.currentSettings.ambientColor,directional_intensity:this.currentSettings.directionalIntensity,directional_color:this.currentSettings.directionalColor,particles_enabled:this.currentSettings.particlesEnabled,particle_count:this.currentSettings.particlesCount,particle_size:this.currentSettings.particlesSize,particle_color:this.currentSettings.particlesColor,particle_opacity:this.currentSettings.particlesOpacity,particle_speed:this.currentSettings.particlesSpeed};try{if(window.flexframeSettings&&window.flexframeSettings.ajaxUrl){const o=await(await fetch(window.flexframeSettings.ajaxUrl,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({action:"flexframe_save_custom_preset",preset_name:e,preset_data:JSON.stringify(n),nonce:window.flexframeSettings.nonce||""})})).json();o.success?(this.showMessage(`Theme "${e}" saved! It will appear in Step 4 dropdown.`,"success"),this.panel.querySelector("#te-theme-name").value=""):this.showMessage(((i=o.data)==null?void 0:i.message)||"Error saving theme","error")}else{const s=JSON.parse(localStorage.getItem("flexframe_themes")||"{}");s[e]=n,localStorage.setItem("flexframe_themes",JSON.stringify(s)),this.showMessage(`Theme "${e}" saved locally!`,"success"),this.panel.querySelector("#te-theme-name").value=""}}catch(s){console.error("Error saving theme:",s),this.showMessage("Error saving theme: "+s.message,"error")}t.disabled=!1,t.innerHTML="Save Theme"}showMessage(e,t){const n=this.panel.querySelector("#te-save-message");n.textContent=e,n.className=`te-message te-message-${t}`,n.style.display="block",setTimeout(()=>{n.style.display="none"},4e3)}addStyles(){const e=document.createElement("style");e.textContent=`
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
                display: none;
                opacity: 0;
                transform: translateX(100%);
                transition: opacity 0.3s ease, transform 0.3s ease;
                box-shadow: -5px 0 30px rgba(0,0,0,0.5);
                display: flex;
                flex-direction: column;
            }
            
            .te-header {
                padding: 16px 20px;
                background: linear-gradient(135deg, #0f3460 0%, #16213e 100%);
                border-bottom: 1px solid rgba(255,255,255,0.1);
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .te-header h2 {
                margin: 0;
                font-size: 18px;
                font-weight: 600;
                flex: 1;
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
                padding: 10px;
            }
            
            .te-section {
                margin-bottom: 8px;
                background: rgba(255,255,255,0.05);
                border-radius: 8px;
                overflow: hidden;
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
            
            .te-section-header:hover {
                background: rgba(255,255,255,0.12);
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
            }
            
            .te-color-input::-webkit-color-swatch {
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 3px;
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
            
            .te-footer {
                padding: 16px 20px;
                background: rgba(0,0,0,0.3);
                border-top: 1px solid rgba(255,255,255,0.1);
            }
            
            .te-save-section {
                display: flex;
                gap: 10px;
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
                margin-top: 12px;
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
        `,document.head.appendChild(e)}}function nc(r,e){if(e===Oh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===$o||e===Sc){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===$o)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class a0 extends ai{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new u0(t)}),this.register(function(t){return new p0(t)}),this.register(function(t){return new S0(t)}),this.register(function(t){return new M0(t)}),this.register(function(t){return new E0(t)}),this.register(function(t){return new m0(t)}),this.register(function(t){return new g0(t)}),this.register(function(t){return new _0(t)}),this.register(function(t){return new y0(t)}),this.register(function(t){return new d0(t)}),this.register(function(t){return new x0(t)}),this.register(function(t){return new f0(t)}),this.register(function(t){return new b0(t)}),this.register(function(t){return new v0(t)}),this.register(function(t){return new c0(t)}),this.register(function(t){return new w0(t)}),this.register(function(t){return new T0(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=ls.extractUrlBase(e);o=ls.resolveURL(c,this.path)}else o=ls.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new va(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(h){t(h),s.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Zc){try{o[He.KHR_BINARY_GLTF]=new A0(e)}catch(d){i&&i(d);return}s=JSON.parse(o[He.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new z0(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const d=this.pluginCallbacks[h](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const d=s.extensionsUsed[h],u=s.extensionsRequired||[];switch(d){case He.KHR_MATERIALS_UNLIT:o[d]=new h0;break;case He.KHR_DRACO_MESH_COMPRESSION:o[d]=new C0(s,this.dracoLoader);break;case He.KHR_TEXTURE_TRANSFORM:o[d]=new R0;break;case He.KHR_MESH_QUANTIZATION:o[d]=new P0;break;default:u.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function l0(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const He={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class c0{constructor(e){this.parser=e,this.name=He.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const h=new ge(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Mt);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Vc(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new mu(h),c.distance=d;break;case"spot":c=new pu(h),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Sn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class h0{constructor(){this.name=He.KHR_MATERIALS_UNLIT}getMaterialType(){return ii}extendParams(e,t,n){const i=[];e.color=new ge(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Mt),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,mt))}return Promise.all(i)}}class d0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class u0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Te(a,a)}return Promise.all(s)}}class p0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ut}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class f0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class m0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new ge(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Mt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,mt)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class g0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class _0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new ge().setRGB(a[0],a[1],a[2],Mt),Promise.all(s)}}class y0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ut}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class x0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new ge().setRGB(a[0],a[1],a[2],Mt),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,mt)),Promise.all(s)}}class v0{constructor(e){this.parser=e,this.name=He.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class b0{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class S0{constructor(e){this.parser=e,this.name=He.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class M0{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class E0{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class w0{constructor(e){this.name=He.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,d=i.byteStride,u=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,d,u,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*d);return o.decodeGltfBuffer(new Uint8Array(f),h,d,u,i.mode,i.filter),f})})}else return null}}class T0{constructor(e){this.name=He.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==Yt.TRIANGLES&&c.mode!==Yt.TRIANGLE_STRIP&&c.mode!==Yt.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),d=h.isGroup?h.children:[h],u=c[0].count,f=[];for(const _ of d){const g=new Le,m=new I,p=new $t,b=new I(1,1,1),E=new qd(_.geometry,_.material,u);for(let y=0;y<u;y++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,y),l.SCALE&&b.fromBufferAttribute(l.SCALE,y),E.setMatrixAt(y,g.compose(m,p,b));for(const y in l)if(y==="_COLOR_0"){const R=l[y];E.instanceColor=new qo(R.array,R.itemSize,R.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&_.geometry.setAttribute(y,l[y]);ct.prototype.copy.call(E,_),this.parser.assignFinalMaterial(E),f.push(E)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Zc="glTF",is=12,ic={JSON:1313821514,BIN:5130562};class A0{constructor(e){this.name=He.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,is),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Zc)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-is,s=new DataView(e,is);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===ic.JSON){const c=new Uint8Array(e,is+o,a);this.content=n.decode(c)}else if(l===ic.BIN){const c=is+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class C0{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=He.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const d=Jo[h]||h.toLowerCase();a[d]=o[h]}for(const h in e.attributes){const d=Jo[h]||h.toLowerCase();if(o[h]!==void 0){const u=n.accessors[e.attributes[h]],f=Li[u.componentType];c[d]=f.name,l[d]=u.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(d,u){i.decodeDracoFile(h,function(f){for(const _ in f.attributes){const g=f.attributes[_],m=l[_];m!==void 0&&(g.normalized=m)}d(f)},a,c,Mt,u)})})}}class R0{constructor(){this.name=He.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class P0{constructor(){this.name=He.KHR_MESH_QUANTIZATION}}class Qc extends _s{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,d=(n-t)/h,u=d*d,f=u*d,_=e*c,g=_-c,m=-2*f+3*u,p=f-u,b=1-m,E=p-u+d;for(let y=0;y!==a;y++){const R=o[g+y+a],P=o[g+y+l]*h,T=o[_+y+a],A=o[_+y]*h;s[y]=b*R+E*P+m*T+p*A}return s}}const L0=new $t;class I0 extends Qc{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return L0.fromArray(s).normalize().toArray(s),s}}const Yt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Li={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},sc={9728:Nt,9729:lt,9984:uc,9985:Js,9986:ss,9987:cn},rc={33071:Kt,33648:hr,10497:Ni},ro={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Jo={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},On={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},D0={CUBICSPLINE:void 0,LINEAR:ds,STEP:hs},oo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function F0(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new yr({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:At})),r.DefaultMaterial}function Qn(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Sn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function U0(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){const d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const d=e[c];if(n){const u=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):r.attributes.position;o.push(u)}if(i){const u=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):r.attributes.normal;a.push(u)}if(s){const u=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):r.attributes.color;l.push(u)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],d=c[1],u=c[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=d),s&&(r.morphAttributes.color=u),r.morphTargetsRelative=!0,r})}function N0(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function O0(r){let e;const t=r.extensions&&r.extensions[He.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ao(t.attributes):e=r.indices+":"+ao(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+ao(r.targets[n]);return e}function ao(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function ea(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function B0(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const k0=new Le;class z0{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new l0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new Hc(this.options.manager):this.textureLoader=new yu(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new va(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Qn(s,a,i),Sn(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())s(h,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[He.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(ls.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=ro[i.type],a=Li[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new St(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=ro[i.type],c=Li[i.componentType],h=c.BYTES_PER_ELEMENT,d=h*l,u=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,_=i.normalized===!0;let g,m;if(f&&f!==d){const p=Math.floor(u/f),b="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let E=t.cache.get(b);E||(g=new c(a,p*f,i.count*f/h),E=new Vd(g,f/h),t.cache.add(b,E)),m=new pa(E,l,u%f/h,_)}else a===null?g=new c(i.count*l):g=new c(a,u,i.count*l),m=new St(g,l,_);if(i.sparse!==void 0){const p=ro.SCALAR,b=Li[i.sparse.indices.componentType],E=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,R=new b(o[1],E,i.sparse.count*p),P=new c(o[2],y,i.sparse.count*l);a!==null&&(m=new St(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let T=0,A=R.length;T<A;T++){const M=R[T];if(m.setX(M,P[T*l]),l>=2&&m.setY(M,P[T*l+1]),l>=3&&m.setZ(M,P[T*l+2]),l>=4&&m.setW(M,P[T*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=_}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const u=(s.samplers||{})[o.sampler]||{};return h.magFilter=sc[u.magFilter]||lt,h.minFilter=sc[u.minFilter]||cn,h.wrapS=rc[u.wrapS]||Ni,h.wrapT=rc[u.wrapT]||Ni,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Nt&&h.minFilter!==lt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(d){c=!0;const u=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(u),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(d){return new Promise(function(u,f){let _=u;t.isImageBitmapLoader===!0&&(_=function(g){const m=new gt(g);m.needsUpdate=!0,u(m)}),t.load(ls.resolveURL(d,s.path),_,void 0,f)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),Sn(d,o),d.userData.mimeType=o.mimeType||B0(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[He.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[He.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[He.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new _a,an.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new _r,an.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return yr}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[He.KHR_MATERIALS_UNLIT]){const d=i[He.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),c.push(d.extendParams(a,s,t))}else{const d=s.pbrMetallicRoughness||{};if(a.color=new ge(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const u=d.baseColorFactor;a.color.setRGB(u[0],u[1],u[2],Mt),a.opacity=u[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,mt)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=rt);const h=s.alphaMode||oo.OPAQUE;if(h===oo.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===oo.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==ii&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Te(1,1),s.normalTexture.scale!==void 0)){const d=s.normalTexture.scale;a.normalScale.set(d,d)}if(s.occlusionTexture!==void 0&&o!==ii&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==ii){const d=s.emissiveFactor;a.emissive=new ge().setRGB(d[0],d[1],d[2],Mt)}return s.emissiveTexture!==void 0&&o!==ii&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,mt)),Promise.all(c).then(function(){const d=new o(a);return s.name&&(d.name=s.name),Sn(d,s),t.associations.set(d,{materials:e}),s.extensions&&Qn(i,d,s),d})}createUniqueName(e){const t=Ze.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[He.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return oc(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=O0(c),d=i[h];if(d)o.push(d.promise);else{let u;c.extensions&&c.extensions[He.KHR_DRACO_MESH_COMPRESSION]?u=s(c):u=oc(new Ot,c,t),i[h]={primitive:c,promise:u},o.push(u)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?F0(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],d=[];for(let f=0,_=h.length;f<_;f++){const g=h[f],m=o[f];let p;const b=c[f];if(m.mode===Yt.TRIANGLES||m.mode===Yt.TRIANGLE_STRIP||m.mode===Yt.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new Wd(g,b):new Ht(g,b),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Yt.TRIANGLE_STRIP?p.geometry=nc(p.geometry,Sc):m.mode===Yt.TRIANGLE_FAN&&(p.geometry=nc(p.geometry,$o));else if(m.mode===Yt.LINES)p=new Uc(g,b);else if(m.mode===Yt.LINE_STRIP)p=new ps(g,b);else if(m.mode===Yt.LINE_LOOP)p=new Kd(g,b);else if(m.mode===Yt.POINTS)p=new Nc(g,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&N0(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),Sn(p,s),m.extensions&&Qn(i,p,m),t.assignFinalMaterial(p),d.push(p)}for(let f=0,_=d.length;f<_;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return s.extensions&&Qn(i,d[0],s),d[0];const u=new si;s.extensions&&Qn(i,u,s),t.associations.set(u,{meshes:e});for(let f=0,_=d.length;f<_;f++)u.add(d[f]);return u})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Ft(wc.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Sa(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Sn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const d=o[c];if(d){a.push(d);const u=new Le;s!==null&&u.fromArray(s.array,c*16),l.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new ma(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let d=0,u=i.channels.length;d<u;d++){const f=i.channels[d],_=i.samplers[f.sampler],g=f.target,m=g.node,p=i.parameters!==void 0?i.parameters[_.input]:_.input,b=i.parameters!==void 0?i.parameters[_.output]:_.output;g.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",b)),c.push(_),h.push(g))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(d){const u=d[0],f=d[1],_=d[2],g=d[3],m=d[4],p=[];for(let b=0,E=u.length;b<E;b++){const y=u[b],R=f[b],P=_[b],T=g[b],A=m[b];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();const M=n._createAnimationTracks(y,R,P,T,A);if(M)for(let x=0;x<M.length;x++)p.push(M[x])}return new Yo(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const h=c[0],d=c[1],u=c[2];u!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(u,k0)});for(let f=0,_=d.length;f<_;f++)h.add(d[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(s.isBone===!0?h=new Fc:c.length>1?h=new si:c.length===1?h=c[0]:h=new ct,h!==c[0])for(let d=0,u=c.length;d<u;d++)h.add(c[d]);if(s.name&&(h.userData.name=s.name,h.name=o),Sn(h,s),s.extensions&&Qn(n,h,s),s.matrix!==void 0){const d=new Le;d.fromArray(s.matrix),h.applyMatrix4(d)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new si;n.name&&(s.name=i.createUniqueName(n.name)),Sn(s,n),n.extensions&&Qn(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,d=l.length;h<d;h++)s.add(l[h]);const c=h=>{const d=new Map;for(const[u,f]of i.associations)(u instanceof an||u instanceof gt)&&d.set(u,f);return h.traverse(u=>{const f=i.associations.get(u);f!=null&&d.set(u,f)}),d};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];On[s.path]===On.weights?e.traverse(function(u){u.morphTargetInfluences&&l.push(u.name?u.name:u.uuid)}):l.push(a);let c;switch(On[s.path]){case On.weights:c=Hi;break;case On.rotation:c=Vi;break;case On.position:case On.scale:c=Gi;break;default:switch(n.itemSize){case 1:c=Hi;break;case 2:case 3:default:c=Gi;break}break}const h=i.interpolation!==void 0?D0[i.interpolation]:ds,d=this._getArrayFromAccessor(n);for(let u=0,f=l.length;u<f;u++){const _=new c(l[u]+"."+On[s.path],t.array,d,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=ea(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Vi?I0:Qc;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function H0(r,e,t){const n=e.attributes,i=new Pn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new I(l[0],l[1],l[2]),new I(c[0],c[1],c[2])),a.normalized){const h=ea(Li[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new I,l=new I;for(let c=0,h=s.length;c<h;c++){const d=s[c];if(d.POSITION!==void 0){const u=t.json.accessors[d.POSITION],f=u.min,_=u.max;if(f!==void 0&&_!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(_[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(_[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(_[2]))),u.normalized){const g=ea(Li[u.componentType]);l.multiplyScalar(g)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new un;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function oc(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=Jo[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return We.workingColorSpace!==Mt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${We.workingColorSpace}" not supported.`),Sn(r,e),H0(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?U0(r,e.targets,t):r})}console.log("[FlexFrame Build] main.js v28.4 loaded - AR Support - Build timestamp:",new Date().toISOString());function Ii(r){return window.flexframeSettings&&window.flexframeSettings.pluginUrl?r.startsWith("http://")||r.startsWith("https://")?r:window.flexframeSettings.pluginUrl+"assets/"+r:r}class V0{constructor(){this.sceneManager=null,this.cameraManager=null,this.lightingSystem=null,this.particleSystem=null,this.settingsManager=null,this.renderer=null,this.gui=null,this.sizes={width:window.innerWidth,height:window.innerHeight},this.clock=new vu,this.textureLoader=new Hc,this.gltfLoader=new a0,this.raycaster=new Gc,this.mouse=new Te,this.mixer=null,this.allClickableMeshes=[],this.ground=null,this.circleGeometry=null,this.planeGeometry=null,this.shadowGroundMaterial=null,this.solidGroundMaterial=null,this.useShadowMaterial=!1,this.backgroundParams={gradientTop:"#3865ad",gradientBottom:"#0101bc",gradientAlpha:1},this.groundParams={mode:"Infinite Canvas",color:"#222222",roughness:1,metalness:0,shadowOpacity:.4,receiveShadow:!0,castShadow:!1,visible:!0},this.playerStyleParams={backgroundColor:"#1f1f1f",backgroundOpacity:0,playerWidth:95,showTimeDisplay:!0,buttonColor:"#c20e1d",buttonOpacity:1,scrubberColor:"#c20e1d",scrubberOpacity:.7,textColor:"#dedede",textOpacity:1},this.loaderParams={spinnerStyle:"cool"},this.init()}async init(){this.sceneManager=new I_,this.cameraManager=new q_(this.sceneManager.getCanvas(),this.sizes),this.lightingSystem=new Y_(this.sceneManager.getScene()),this.particleSystem=new K_(this.sceneManager.getScene()),this.settingsManager=new Z_,this.animationPlayer=new Q_,this.setupScreenshotButton(),this.setupARBranding(),setTimeout(()=>{this.setupQualityToggle()},100),console.log("🚀 CREATING MultiThumbnailMenuSystem..."),this.multiThumbnailMenuSystem=new i0,console.log("✅ MultiThumbnailMenuSystem created:",this.multiThumbnailMenuSystem),this.rightMenuSystem=new s0,this.themeEditor=new o0(this),window.menuManager=this.multiThumbnailMenuSystem,console.log("✅ window.menuManager set:",window.menuManager),window.rightMenuManager=this.rightMenuSystem,document.addEventListener("thumbnailSelected",e=>{console.log("Thumbnail selected:",e.detail.thumbnail)}),document.addEventListener("exercisesSelected",async e=>{const t=e.detail.item;if(this.currentExerciseName=t.name,this.screenshotPanel){const n=this.screenshotPanel.querySelector("#ss-filename");n&&(n.value=t.name)}if(t.configUrl)try{const n=`?t=${Date.now()}`,s=Ii(t.configUrl.replace("./",""))+n,a=await(await fetch(s)).json();if(this.currentConfig=a,tc.updateConfig(a),this.pendingModelConfig=a.model,this.modelUrlSQ=a.modelUrl||a.modelUrlSQ,this.modelUrlHQ=a.modelUrlHQ,this.currentModelQuality="SQ",this.updateQualityButtonVisibility(),this.modelUrlSQ&&await this.loadModel(this.modelUrlSQ),a.camera){const l=this.cameraManager.getCamera();a.camera.position&&l.position.set(...a.camera.position),a.camera.rotation&&l.rotation.set(...a.camera.rotation),a.camera.target&&this.cameraManager.getControls().target.set(...a.camera.target),this.cameraManager.getControls().update(),this.cameraManager.updateOriginalState(a.camera.position,a.camera.rotation,a.camera.target)}a.rightMenuTabs&&window.rightMenuManager&&window.rightMenuManager.updateFromConfig(a.rightMenuTabs)}catch(n){console.error("Failed to load exercise config:",n)}}),this.animationPlayer.setVisibility(!0),this.applyWordPressUISettings(),this.applyWordPressSceneSettings(),setTimeout(()=>{this.initializePlayerStyling()},100),this.setupCanvasInteraction(),this.screenshotManager=null,this.cameraManager.setScene(this.sceneManager.getScene()),window.camera=this.cameraManager.getCamera(),window.app=this,this.settingsManager.registerManager("background",{getSettings:()=>this.backgroundParams,applySettings:e=>{Object.assign(this.backgroundParams,e),this.sceneManager.updateGradientBackground(this.backgroundParams)}}),this.settingsManager.registerManager("ground",{getSettings:()=>this.groundParams,applySettings:e=>this.applyGroundSettings(e)}),this.settingsManager.registerManager("camera",this.cameraManager),this.settingsManager.registerManager("lighting",this.lightingSystem),this.settingsManager.registerManager("dustParticles",this.particleSystem),this.settingsManager.registerManager("animationPlayer",this.animationPlayer),this.settingsManager.registerManager("multiThumbnailMenuSystem",this.multiThumbnailMenuSystem),this.settingsManager.registerManager("rightMenuSystem",this.rightMenuSystem),this.settingsManager.registerManager("playerStyling",{getSettings:()=>this.playerStyleParams,applySettings:e=>{Object.assign(this.playerStyleParams,e),setTimeout(()=>{this.initializePlayerStyling(),this.gui&&typeof this.gui.updateDisplay=="function"&&this.gui.updateDisplay()},200)}}),this.settingsManager.registerManager("loader",{getSettings:()=>this.loaderParams,applySettings:e=>{Object.assign(this.loaderParams,e),this.updateLoaderSpinner()}}),this.setupRenderer(),this.setupGround(),this.setupGUI(),this.setupEventListeners(),this.sceneManager.updateGradientBackground(this.backgroundParams),await this.waitForDefaultSettings(),this.settingsManager.applyDefaultSettings(),this.applyWordPressSceneSettings(),setTimeout(()=>this.updateAllGUIControls(),500),this.animationPlayer.setVisibility(!0),this.checkUrlForExercise(),this.animate()}checkUrlForExercise(){let t=new URLSearchParams(window.location.search).get("exercise");if(!t&&window.location.hash&&(t=window.location.hash.substring(1)),!t)return;console.log("🔗 URL exercise parameter found:",t);const n=t.toLowerCase().replace(/-/g,"_").replace(/%20/g,"_").replace(/ /g,"_");this.waitForExercisesAndSelect(n,t)}async waitForExercisesAndSelect(e,t){var s,o,a;let n=0;const i=50;for(;n<i;){const l=window.menuManager;if(((a=(o=(s=l==null?void 0:l.menus)==null?void 0:s.search)==null?void 0:o.allExercises)==null?void 0:a.length)>0){const c=l.menus.search.allExercises,h=c.find(d=>{var _,g,m,p;const u=(_=d.id)==null?void 0:_.toLowerCase().replace(/-/g,"_"),f=(g=d.name)==null?void 0:g.toLowerCase().replace(/ /g,"_").replace(/-/g,"_");return u===e||f===e||((m=d.id)==null?void 0:m.toLowerCase())===t.toLowerCase()||((p=d.name)==null?void 0:p.toLowerCase())===t.toLowerCase().replace(/_/g," ").replace(/-/g," ")});if(h){console.log("✅ Found exercise from URL:",h.name);const d=new CustomEvent("exercisesSelected",{detail:{item:h,menuType:"url-preload"}});document.dispatchEvent(d),l.menus.search&&(l.menus.search.selectedId=h.id);return}else{console.warn("⚠️ Exercise not found for URL slug:",t),console.log("Available exercise IDs:",c.map(d=>d.id).slice(0,10));return}}await new Promise(c=>setTimeout(c,100)),n++}console.warn("⚠️ Timed out waiting for exercises to load for URL preload")}async waitForDefaultSettings(){for(;!this.settingsManager.getDefaultSettings();)await new Promise(e=>setTimeout(e,100))}setupRenderer(){this.renderer=new Yc({canvas:this.sceneManager.getCanvas(),antialias:!0}),this.renderer.setSize(this.sizes.width,this.sizes.height),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=lc,this.renderer.toneMapping=hc,this.renderer.toneMappingExposure=1}updateLoaderSpinner(){const e=document.getElementById("model-loader");if(!e)return;e.querySelectorAll(".spinner-box").forEach(i=>i.style.display="none");const n=e.querySelector(`[data-spinner="${this.loaderParams.spinnerStyle}"]`);n&&(n.style.display="flex")}updateLoadProgress(e){const t=document.getElementById("logo-progress-bar"),n=document.getElementById("logo-progress-text");e===-1?(t&&(t.style.width="100%",t.style.animation="indeterminateProgress 1.5s ease-in-out infinite"),n&&(n.textContent="Loading...")):(t&&(t.style.animation="none",t.style.width=`${e}%`),n&&(n.textContent=`${e}%`))}applyWordPressUISettings(){var i;if(!window.flexframeSettings||!window.flexframeSettings.uiSettings){console.log("[FlexFrame UI] No WordPress UI settings found, using defaults");return}const e=window.flexframeSettings.uiSettings;if(console.log("[FlexFrame UI] Applying WordPress UI settings:",e),e.player){const s=e.player.alwaysVisible===!0;console.log("[FlexFrame UI] Player always visible setting:",s),this.animationPlayer&&(this.animationPlayer.setAlwaysVisible(s),console.log("[FlexFrame UI] Applied alwaysVisible to animation player")),e.player.bgColor&&(this.playerStyleParams.backgroundColor=e.player.bgColor),e.player.bgOpacity!==void 0&&(this.playerStyleParams.backgroundOpacity=e.player.bgOpacity),e.player.buttonColor&&(this.playerStyleParams.buttonColor=e.player.buttonColor),e.player.accentColor&&(this.playerStyleParams.scrubberColor=e.player.accentColor)}const t=((i=window.flexframeSettings)==null?void 0:i.primaryColor)||"#4a9eff",n=e.spinnerColor||t;this.updateSpinnerColor(n),this.updateProgressBarColor(t),console.log("[FlexFrame UI] Spinner color:",n,", Progress bar color (primary):",t)}applyWordPressSceneSettings(){var e,t,n,i;if((e=window.flexframeSettings)!=null&&e.backgroundSettings){const s=window.flexframeSettings.backgroundSettings;console.log("[FlexFrame Scene] Applying WordPress background settings:",s),this.backgroundParams.gradientTop=s.gradientTop||"#3865ad",this.backgroundParams.gradientBottom=s.gradientBottom||"#0101bc",this.backgroundParams.gradientAlpha=s.gradientAlpha??1,this.sceneManager&&this.sceneManager.updateGradientBackground(this.backgroundParams)}if((t=window.flexframeSettings)!=null&&t.lightingSettings&&this.lightingSystem){const s=window.flexframeSettings.lightingSettings;if(console.log("[FlexFrame Scene] Applying WordPress lighting settings:",s),s.ambientLight&&(s.ambientLight.intensity!==void 0&&(this.lightingSystem.ambientLight.intensity=s.ambientLight.intensity),s.ambientLight.color&&this.lightingSystem.ambientLight.color.set(s.ambientLight.color)),s.directionalLight&&(s.directionalLight.intensity!==void 0&&(this.lightingSystem.directionalLight.intensity=s.directionalLight.intensity),s.directionalLight.color&&this.lightingSystem.directionalLight.color.set(s.directionalLight.color),s.directionalLight.position)){const o=s.directionalLight.position;o.x!==void 0&&(this.lightingSystem.directionalLight.position.x=o.x),o.y!==void 0&&(this.lightingSystem.directionalLight.position.y=o.y),o.z!==void 0&&(this.lightingSystem.directionalLight.position.z=o.z)}}if((n=window.flexframeSettings)!=null&&n.particleSettings&&this.particleSystem){const s=window.flexframeSettings.particleSettings;console.log("[FlexFrame Scene] Applying WordPress particle settings:",s),s.visible!==void 0&&(this.particleSystem.params.visible=s.visible),s.count!==void 0&&(this.particleSystem.params.count=s.count),s.size!==void 0&&(this.particleSystem.params.size=s.size);const o=(i=window.flexframeSettings)==null?void 0:i.primaryColor;o?(this.particleSystem.params.color=o,console.log("[FlexFrame Scene] Using primary color for particles:",o)):s.color&&(this.particleSystem.params.color=s.color),s.opacity!==void 0&&(this.particleSystem.params.opacity=s.opacity),s.speed!==void 0&&(this.particleSystem.params.speed=s.speed),this.particleSystem.createDustParticles()}}updateSpinnerColor(e){const t=document.createElement("style");t.id="flexframe-spinner-color";const n=(s,o)=>{const a=parseInt(s.slice(1,3),16),l=parseInt(s.slice(3,5),16),c=parseInt(s.slice(5,7),16);return`rgba(${a}, ${l}, ${c}, ${o})`};t.textContent=`
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
        `;const t=document.getElementById("scrubber-width-style");t&&t.remove(),document.head.appendChild(e)}setupGround(){const e=this.textureLoader.load(Ii("textures/gradients/3.jpg"));e.wrapS=Kt,e.wrapT=Kt,e.needsUpdate=!0,this.circleGeometry=new xa(5,64),this.planeGeometry=new gs(30,30),this.shadowGroundMaterial=new Zd({opacity:.4}),this.solidGroundMaterial=new yr({color:2236962,roughness:1,metalness:0}),this.ground=new Ht(this.circleGeometry,this.shadowGroundMaterial),this.ground.rotation.x=-Math.PI/2,this.ground.position.y=-.01,this.ground.receiveShadow=!0,this.ground.castShadow=!1,this.ground.visible=!0,this.sceneManager.getScene().add(this.ground)}updateAllGUIControls(){this.gui&&this.gui.controllersRecursive().forEach(e=>{e.updateDisplay()})}gatherModelSpecificSettings(){const e={};return this.currentConfig&&this.currentConfig.exerciseId&&(e.exerciseId=this.currentConfig.exerciseId),this.currentConfig&&(this.currentConfig.modelUrlSQ&&(e.modelUrlSQ=this.currentConfig.modelUrlSQ),this.currentConfig.modelUrlHQ&&(e.modelUrlHQ=this.currentConfig.modelUrlHQ),this.currentConfig.modelUrl&&!e.modelUrlSQ&&(e.modelUrl=this.currentConfig.modelUrl)),e.model=window.model?{position:window.model.position.toArray(),rotation:[window.model.rotation.x,window.model.rotation.y,window.model.rotation.z],scale:window.model.scale.toArray()}:{position:[0,-.02,0],rotation:[0,0,0],scale:[1,1,1]},e.camera=this.cameraManager.getSettings(),e}setupGUIStyles(){const e=document.createElement("style");e.textContent=`
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
        `,document.head.querySelector("style[data-gui-styles]")||(e.setAttribute("data-gui-styles","true"),document.head.appendChild(e))}setupGUIControls(){const e=this.gui.addFolder("GUI Controls"),t={expandAll:()=>{this.allFolders.forEach(n=>n.open()),console.log("📂 All GUI folders expanded")},collapseAll:()=>{this.allFolders.forEach(n=>n.close()),console.log("📁 All GUI folders collapsed")}};e.add(t,"expandAll").name("Expand All"),e.add(t,"collapseAll").name("Collapse All"),e.open()}trackFolder(e){return this.allFolders.push(e),e}setupGUI(){this.gui=new Ta,this.allFolders=[],this.setupGUIStyles(),this.setupGUIControls(),this.setupSimpleScreenshotGUI(),this.gui.add({saveSettings:async()=>{await this.settingsManager.saveSettingsToClipboard(),console.log("All settings saved:",this.settingsManager.gatherAllSettings())}},"saveSettings").name("Save All Settings"),this.gui.add({saveModelSettings:async()=>{const n=this.gatherModelSpecificSettings(),i=JSON.stringify(n,null,2);try{await navigator.clipboard.writeText(i),alert("Model-specific settings copied to clipboard!"),console.log("Model settings saved:",n)}catch(s){console.error("Failed to copy to clipboard:",s),alert("Failed to copy settings to clipboard.")}}},"saveModelSettings").name("Save Model Settings"),this.gui.add({importSettings:async()=>{await this.settingsManager.importSettingsFromClipboard(),setTimeout(()=>this.updateAllGUIControls(),100)}},"importSettings").name("Import Settings"),this.gui.add({exportFile:()=>this.settingsManager.exportAsFile("scene-settings.json")},"exportFile").name("Export to File"),this.gui.add({importFile:async()=>{try{await this.settingsManager.importFromFile(),setTimeout(()=>this.updateAllGUIControls(),100),alert("Settings imported from file!")}catch(n){alert("Failed to import file: "+n.message)}}},"importFile").name("Import from File");const e={"Cinematic Blue":()=>{const n={background:{gradientTop:"#3865ad",gradientBottom:"#030391",gradientAlpha:1},ground:{mode:"Infinite Canvas",color:"#222222",roughness:1,metalness:0,shadowOpacity:.4,receiveShadow:!0,castShadow:!1,visible:!0},camera:{position:[.6497189477206844,.620065800043649,-.3267521547833202],rotation:[-2.480393214032852,1.0626661205247725,2.5446012015171644],target:[-.04078270409635462,.38393067967272315,-.023247738115800942]},lighting:{directionalLight:{intensity:1.43,color:"#ffffff",castShadow:!0,shadowBias:0,shadowBlur:1,shadowMapWidth:1024,shadowMapHeight:1024,posX:1.35,posY:1.57,posZ:.9,showHelper:!1,position:{x:1.35,y:1.57,z:.9}},ambientLight:{intensity:.4,color:"#ffffff"}},dustParticles:{count:1210,size:.02,sizeRandomness:1.2,color:"#0d14d3",opacity:.11,speed:.5,horizontalRange:3,verticalRange:2,verticalOffset:1,visible:!0,blur:.3,depthBlur:!0,depthBlurStrength:.5,depthFocusDistance:3,depthFocusRange:1.5},model:{position:[0,-.02,0],rotation:[0,0,0],scale:[1,1,1]}};this.settingsManager.applyAllSettings(n),setTimeout(()=>this.updateAllGUIControls(),100)},"Reset to Default":()=>{this.settingsManager.applyDefaultSettings(),setTimeout(()=>this.updateAllGUIControls(),100)}},t=this.trackFolder(this.gui.addFolder("Scene Presets"));t.add(e,"Cinematic Blue").name("Cinematic Blue"),t.add(e,"Reset to Default").name("Reset to Default"),this.setupBackgroundGUI(),this.setupGroundGUI(),this.setupParticlesGUI(),this.setupLoaderGUI(),this.setupLightingGUI(),this.setupCameraGUI(),this.setupMultiThumbnailMenuGUI(),this.setupGUIVisibilityToggle()}setupBackgroundGUI(){this.gui.addColor(this.backgroundParams,"gradientTop").name("Gradient Top").onChange(()=>this.sceneManager.updateGradientBackground(this.backgroundParams)),this.gui.addColor(this.backgroundParams,"gradientBottom").name("Gradient Bottom").onChange(()=>this.sceneManager.updateGradientBackground(this.backgroundParams)),this.gui.add(this.backgroundParams,"gradientAlpha",0,1,.01).name("Gradient Alpha").onChange(()=>this.sceneManager.updateGradientBackground(this.backgroundParams))}setupGroundGUI(){const e=this.trackFolder(this.gui.addFolder("Ground Plane"));e.add(this.groundParams,"mode",["Solid","Infinite Canvas"]).name("Type").onChange(t=>this.updateGroundMode(t)),e.addColor(this.groundParams,"color").name("Color").onChange(t=>this.solidGroundMaterial.color.set(t)),e.add(this.groundParams,"roughness",0,1,.01).name("Roughness").onChange(t=>this.solidGroundMaterial.roughness=t),e.add(this.groundParams,"metalness",0,1,.01).name("Metalness").onChange(t=>this.solidGroundMaterial.metalness=t),e.add(this.groundParams,"shadowOpacity",0,1,.01).name("Shadow Opacity").onChange(t=>this.shadowGroundMaterial.opacity=t),e.add(this.groundParams,"receiveShadow").name("Receive Shadow").onChange(t=>this.ground.receiveShadow=t),e.add(this.groundParams,"castShadow").name("Cast Shadow").onChange(t=>this.ground.castShadow=t),e.add(this.groundParams,"visible").name("Visible").onChange(t=>this.ground.visible=t)}setupLoaderGUI(){const e=this.trackFolder(this.gui.addFolder("Loading Spinner")),t={"Cool Gradient":"cool","Simple Gradient":"gradient","3D Orbits":"orbits","Gradient Planes":"planes","Spinning Squares":"squares","Pulse Dots":"dots","Solar System":"solar","Three Quarter":"quarter"};e.add(this.loaderParams,"spinnerStyle",t).name("Spinner Style").onChange(()=>this.updateLoaderSpinner())}setupParticlesGUI(){const e=this.trackFolder(this.gui.addFolder("Dust Particles")),t=this.particleSystem.getParams();e.add(t,"count",50,2e3,10).name("Count").onChange(c=>this.particleSystem.updateCount(c)),e.add(t,"size",.001,.02,1e-4).name("Size").onChange(c=>this.particleSystem.updateSize(c)),e.add(t,"sizeRandomness",0,2,.1).name("Size Variation").onChange(c=>this.particleSystem.updateSizeRandomness(c)),e.addColor(t,"color").name("Color").onChange(c=>this.particleSystem.updateColor(c)),e.add(t,"opacity",0,1,.01).name("Opacity").onChange(c=>this.particleSystem.updateOpacity(c)),e.add(t,"speed",0,3,.1).name("Float Speed"),e.add(t,"visible").name("Visible").onChange(c=>this.particleSystem.setVisible(c));const n=this.trackFolder(e.addFolder("Blur Effects"));n.add(t,"blur",0,1,.01).name("Particle Blur").onChange(c=>this.particleSystem.updateBlur(c));const i=this.trackFolder(e.addFolder("Depth of Field"));i.add(t,"depthBlur").name("Enable Depth Blur").onChange(c=>this.particleSystem.updateDepthBlur(c)),i.add(t,"depthBlurStrength",0,1,.01).name("Blur Strength").onChange(c=>this.particleSystem.updateDepthBlurStrength(c)),i.add(t,"depthFocusDistance",.5,10,.1).name("Focus Distance").onChange(c=>this.particleSystem.updateDepthFocus(c,t.depthFocusRange)),i.add(t,"depthFocusRange",.1,5,.1).name("Focus Range").onChange(c=>this.particleSystem.updateDepthFocus(t.depthFocusDistance,c));const s=this.trackFolder(e.addFolder("Position & Range"));s.add(t,"horizontalRange",.5,10,.1).name("Horizontal Range").onChange(()=>this.particleSystem.updateRange(t.horizontalRange,t.verticalRange)),s.add(t,"verticalRange",.5,5,.1).name("Vertical Range").onChange(()=>this.particleSystem.updateRange(t.horizontalRange,t.verticalRange)),s.add(t,"verticalOffset",-2,3,.1).name("Height Offset").onChange(c=>this.particleSystem.updateOffset(c));const o={"Portrait DOF":()=>{t.depthBlur=!0,t.depthBlurStrength=.7,t.depthFocusDistance=2,t.depthFocusRange=.5,t.blur=.2,this.particleSystem.updateDepthBlur(!0),this.particleSystem.updateDepthBlurStrength(.7),this.particleSystem.updateDepthFocus(2,.5),this.particleSystem.updateBlur(.2),i.controllersRecursive().forEach(c=>c.updateDisplay()),n.controllersRecursive().forEach(c=>c.updateDisplay())},"Macro DOF":()=>{t.depthBlur=!0,t.depthBlurStrength=.9,t.depthFocusDistance=1,t.depthFocusRange=.2,t.blur=.4,this.particleSystem.updateDepthBlur(!0),this.particleSystem.updateDepthBlurStrength(.9),this.particleSystem.updateDepthFocus(1,.2),this.particleSystem.updateBlur(.4),i.controllersRecursive().forEach(c=>c.updateDisplay()),n.controllersRecursive().forEach(c=>c.updateDisplay())},"Cinematic DOF":()=>{t.depthBlur=!0,t.depthBlurStrength=.5,t.depthFocusDistance=3,t.depthFocusRange=1.5,t.blur=.3,this.particleSystem.updateDepthBlur(!0),this.particleSystem.updateDepthBlurStrength(.5),this.particleSystem.updateDepthFocus(3,1.5),this.particleSystem.updateBlur(.3),i.controllersRecursive().forEach(c=>c.updateDisplay()),n.controllersRecursive().forEach(c=>c.updateDisplay())},"No DOF":()=>{t.depthBlur=!1,t.blur=0,this.particleSystem.updateDepthBlur(!1),this.particleSystem.updateBlur(0),i.controllersRecursive().forEach(c=>c.updateDisplay()),n.controllersRecursive().forEach(c=>c.updateDisplay())}};i.add(o,"Portrait DOF").name("Portrait DOF"),i.add(o,"Macro DOF").name("Macro DOF"),i.add(o,"Cinematic DOF").name("Cinematic DOF"),i.add(o,"No DOF").name("Disable DOF");const a={"Light Dust":()=>{this.particleSystem.applyPreset("Light Dust"),e.controllersRecursive().forEach(c=>c.updateDisplay())},"Heavy Dust":()=>{this.particleSystem.applyPreset("Heavy Dust"),e.controllersRecursive().forEach(c=>c.updateDisplay())},"Magical Sparkles":()=>{this.particleSystem.applyPreset("Magical Sparkles"),e.controllersRecursive().forEach(c=>c.updateDisplay())},"Reset Dust":()=>{this.particleSystem.applyPreset("Reset Dust"),e.controllersRecursive().forEach(c=>c.updateDisplay())}},l=this.trackFolder(e.addFolder("Particle Presets"));l.add(a,"Light Dust").name("Light Dust"),l.add(a,"Heavy Dust").name("Heavy Dust"),l.add(a,"Magical Sparkles").name("Magical Sparkles"),l.add(a,"Reset Dust").name("Reset Dust")}setupLightingGUI(){const e=this.trackFolder(this.gui.addFolder("Lights")),t=this.lightingSystem.getLights(),n=this.lightingSystem.getSettings(),i=this.trackFolder(e.addFolder("Directional Light")),s=n.directionalLight;i.add(s,"intensity",0,5,.01).name("Intensity").onChange(l=>t.directional.intensity=l),i.addColor(s,"color").name("Color").onChange(l=>t.directional.color.set(l)),i.add(s,"castShadow").name("Cast Shadow").onChange(l=>t.directional.castShadow=l),i.add(s,"shadowBias",-.05,.05,1e-4).name("Shadow Bias").onChange(l=>t.directional.shadow.bias=l),i.add(s,"shadowBlur",0,10,.1).name("Shadow Blur").onChange(l=>t.directional.shadow.radius=l),i.add(s,"shadowMapWidth",256,4096,1).name("Shadow Map Width").onChange(l=>{t.directional.shadow.mapSize.width=l,t.directional.shadow.map&&t.directional.shadow.map.dispose()}),i.add(s,"shadowMapHeight",256,4096,1).name("Shadow Map Height").onChange(l=>{t.directional.shadow.mapSize.height=l,t.directional.shadow.map&&t.directional.shadow.map.dispose()}),i.add(s,"posX",-10,10,.01).name("Position X").onChange(l=>t.directional.position.x=l),i.add(s,"posY",-10,10,.01).name("Position Y").onChange(l=>t.directional.position.y=l),i.add(s,"posZ",-10,10,.01).name("Position Z").onChange(l=>t.directional.position.z=l),i.add(s,"showHelper").name("Show Helper").onChange(l=>t.directionalHelper.visible=l);const o=this.trackFolder(e.addFolder("Ambient Light")),a=n.ambientLight;o.add(a,"intensity",0,2,.01).name("Intensity").onChange(l=>t.ambient.intensity=l),o.addColor(a,"color").name("Color").onChange(l=>t.ambient.color.set(l))}setupCameraGUI(){const e=this.trackFolder(this.gui.addFolder("Camera Controls")),t=this.cameraManager.getCamera(),n=this.cameraManager.getControls(),i=this.trackFolder(e.addFolder("Zoom Range"));i.add(n,"minDistance",.001,1,.001).name("Min Zoom Distance"),i.add(n,"maxDistance",10,500,1).name("Max Zoom Distance"),i.add(n,"zoomSpeed",.1,2,.1).name("Zoom Speed");const s=this.trackFolder(e.addFolder("Field of View"));s.add({fov:t.fov},"fov",10,150,1).name("FOV (degrees)").onChange(x=>{this.cameraManager.setFOV(x)}),s.add({copyCameraSettings:()=>{this.cameraManager.copyCameraSettingsToClipboard()}},"copyCameraSettings").name("Copy Camera Settings"),s.add({copyAllSettings:()=>{this.cameraManager.copyAllSettingsToClipboard(this.settingsManager)}},"copyAllSettings").name("Copy ALL GUI Settings");const o=this.trackFolder(e.addFolder("Zoom Momentum")),a=this.cameraManager;o.add(a,"zoomDecay",.8,.99,.01).name("Momentum Decay"),o.add(a,"zoomMomentumThreshold",.001,.1,.001).name("Momentum Threshold");const l={value:1};o.add(l,"value",.1,5,.1).name("Velocity Multiplier").onChange(x=>{a.velocityMultiplier=x}),e.add({resetCamera:()=>{this.cameraManager.resetCamera(),console.log("Camera fully reset to defaults")}},"resetCamera").name("Reset Camera"),e.add({testMomentum:()=>{console.log("Testing momentum..."),a.zoomMomentum=.2,a.momentumActive=!0,console.log("Momentum set to:",a.zoomMomentum)}},"testMomentum").name("Test Momentum"),e.add({clearMomentum:()=>{a.zoomMomentum=0,a.momentumActive=!1,console.log("Momentum cleared")}},"clearMomentum").name("Clear Momentum");const c=this.trackFolder(e.addFolder("Debug Info")),h={currentDistance:0,momentum:0,targetX:0,targetY:0,targetZ:0};c.add(h,"currentDistance").name("Distance").listen(),c.add(h,"momentum").name("Momentum").listen(),c.add(h,"targetX").name("Target X").listen(),c.add(h,"targetY").name("Target Y").listen(),c.add(h,"targetZ").name("Target Z").listen();const d=()=>{h.currentDistance=t.position.distanceTo(n.target),h.momentum=a.zoomMomentum||0,h.targetX=n.target.x,h.targetY=n.target.y,h.targetZ=n.target.z};this.updateCameraDebug=d,a.velocityMultiplier=.4;const u=this.trackFolder(e.addFolder("Coordinates")),f={x:0,y:0,z:0};u.add(f,"x").name("Center X").listen(),u.add(f,"y").name("Center Y").listen(),u.add(f,"z").name("Center Z").listen();const _=this.trackFolder(u.addFolder("Manual Control")),g={x:this.cameraManager.getRotationCenter().x,y:this.cameraManager.getRotationCenter().y,z:this.cameraManager.getRotationCenter().z};_.add(g,"x",-5,5,.001).name("Set X Position").onChange(x=>{this.cameraManager.setRotationCenterX(x)}).listen(),_.add(g,"y",-5,5,.001).name("Set Y Position").onChange(x=>{this.cameraManager.setRotationCenterY(x)}).listen(),_.add(g,"z",-5,5,.001).name("Set Z Position").onChange(x=>{this.cameraManager.setRotationCenterZ(x)}).listen(),u.add({copyCoords:()=>{this.cameraManager.copyCoordinatesToClipboard()}},"copyCoords").name("Copy Coordinates");const m=this.updateCameraDebug;this.updateCameraDebug=()=>{m&&m();const x=this.cameraManager.getRotationCenter();f.x=parseFloat(x.x.toFixed(6)),f.y=parseFloat(x.y.toFixed(6)),f.z=parseFloat(x.z.toFixed(6)),g.x=x.x,g.y=x.y,g.z=x.z};const p=this.trackFolder(e.addFolder("Animation Player")),b={showPlayer:this.animationPlayer?this.animationPlayer.isVisible:!0,alwaysVisible:this.animationPlayer?this.animationPlayer.alwaysVisible:!1};p.add(b,"showPlayer").name("Show Animation Player").onChange(x=>{this.animationPlayer&&(this.animationPlayer.setVisibility(x),b.showPlayer=x)}),p.add(b,"alwaysVisible").name("Always Visible (No Auto-Hide)").onChange(x=>{this.animationPlayer&&(this.animationPlayer.setAlwaysVisible(x),b.alwaysVisible=x)});const E=this.trackFolder(p.addFolder("Player Styling")),y=this.trackFolder(E.addFolder("Background"));y.addColor(this.playerStyleParams,"backgroundColor").name("Background Color").onChange(x=>{this.updatePlayerBackgroundColor(x)}),y.add(this.playerStyleParams,"backgroundOpacity",0,1,.1).name("Background Opacity").onChange(x=>{this.updatePlayerBackgroundOpacity(x)}),this.trackFolder(E.addFolder("Dimensions")).add(this.playerStyleParams,"playerWidth",20,100,1).name("Player Width (%)").onChange(x=>{}),this.trackFolder(E.addFolder("Display")).add(this.playerStyleParams,"showTimeDisplay").name("Show Time Display").onChange(x=>{this.updatePlayerTimeDisplay(x)});const T=this.trackFolder(E.addFolder("Buttons"));T.addColor(this.playerStyleParams,"buttonColor").name("Button Color").onChange(x=>{this.updatePlayerButtonColor(x)}),T.add(this.playerStyleParams,"buttonOpacity",0,1,.1).name("Button Opacity").onChange(x=>{this.updatePlayerButtonOpacity(x)});const A=this.trackFolder(E.addFolder("Timeline"));A.addColor(this.playerStyleParams,"scrubberColor").name("Scrubber Color").onChange(x=>{this.updatePlayerScrubberColor(x)}),A.add(this.playerStyleParams,"scrubberOpacity",0,1,.1).name("Scrubber Opacity").onChange(x=>{this.updatePlayerScrubberOpacity(x)});const M=this.trackFolder(E.addFolder("Text"));M.addColor(this.playerStyleParams,"textColor").name("Text Color").onChange(x=>{this.updatePlayerTextColor(x)}),M.add(this.playerStyleParams,"textOpacity",0,1,.1).name("Text Opacity").onChange(x=>{this.updatePlayerTextOpacity(x)}),p.open()}updatePlayerBackgroundColor(e){window.flexframeSettings&&window.flexframeSettings.uiSettings||this.animationPlayer&&this.animationPlayer.container&&(this.animationPlayer.container.style.backgroundColor=e)}updatePlayerBackgroundOpacity(e){if(!(window.flexframeSettings&&window.flexframeSettings.uiSettings)&&this.animationPlayer&&this.animationPlayer.container){const t=this.playerStyleParams.backgroundColor,n=parseInt(t.slice(1,3),16),i=parseInt(t.slice(3,5),16),s=parseInt(t.slice(5,7),16);this.animationPlayer.container.style.backgroundColor=`rgba(${n}, ${i}, ${s}, ${e})`}}updatePlayerTimeDisplay(e){if(this.animationPlayer&&this.animationPlayer.container){const t=this.animationPlayer.container.querySelector(".time-display");t&&(t.style.display=e?"inline-block":"none")}}updatePlayerButtonColor(e){if(console.log("[FlexFrame UI] updatePlayerButtonColor called with:",e),window.flexframeSettings&&window.flexframeSettings.uiSettings){console.log("[FlexFrame UI] Skipping JS button color - WordPress CSS will handle it");return}if(this.animationPlayer&&this.animationPlayer.container){const t=this.animationPlayer.container.querySelectorAll("button");t.forEach(n=>{n.style.color=e,n.querySelectorAll("svg").forEach(s=>{s.style.fill=e})}),console.log("[FlexFrame UI] Applied button color to",t.length,"buttons")}}updatePlayerButtonOpacity(e){this.animationPlayer&&this.animationPlayer.container&&this.animationPlayer.container.querySelectorAll("button").forEach(n=>{n.style.opacity=e})}updatePlayerScrubberColor(e){if(!(window.flexframeSettings&&window.flexframeSettings.uiSettings)&&this.animationPlayer&&this.animationPlayer.container){const t=this.animationPlayer.container.querySelector(".timeline-slider");if(t){t.style.accentColor=e;const n=document.createElement("style");n.textContent=`
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
        `;const i=document.getElementById("flexframe-viewer-container")||document.body;i.appendChild(n),i.appendChild(t),this.screenshotFramePanel=t}toggleScreenshotFramePanel(e){this.screenshotFramePanel&&this.screenshotFramePanel.classList.toggle("visible",e)}updateScreenshotFramePanel(e,t){if(!this.screenshotFramePanel)return;const n=document.getElementById("flexframe-viewer-container");if(!n)return;const i=n.getBoundingClientRect(),s=i.width,o=i.height,a=e/t,l=s/o;let c,h;a>l?(c=Math.min(e,s*.8),h=c/a):(h=Math.min(t,o*.8),c=h*a);const d=(s-c)/2,u=(o-h)/2;this.screenshotFramePanel.style.width=`${c}px`,this.screenshotFramePanel.style.height=`${h}px`,this.screenshotFramePanel.style.left=`${d}px`,this.screenshotFramePanel.style.top=`${u}px`;const f=this.screenshotFramePanel.querySelector(".frame-info-panel");f&&(f.textContent=`${e} x ${t}`)}toggleScreenshotPanel(e){if(!this.screenshotPanel)return;const t=this.screenshotPanel.classList.contains("visible"),n=e!==void 0?e:!t;if(this.screenshotPanel.classList.toggle("visible",n),n){this.toggleScreenshotFramePanel(!0);const i=parseInt(this.screenshotPanel.querySelector("#ss-width").value),s=parseInt(this.screenshotPanel.querySelector("#ss-height").value);this.updateScreenshotFramePanel(i,s),this.currentExerciseName&&(this.screenshotPanel.querySelector("#ss-filename").value=this.currentExerciseName)}else this.toggleScreenshotFramePanel(!1)}async takeQuickScreenshot(){var l,c,h,d,u,f;const e=this.renderer,t=this.sceneManager.getScene(),n=this.cameraManager.getCamera(),i=e.domElement,s=((c=(l=this.screenshotPanel)==null?void 0:l.querySelector("#ss-filename"))==null?void 0:c.value)||(this.currentExerciseName?this.currentExerciseName.replace(/\s+/g,"_"):"flexframe_screenshot"),o=((d=(h=this.screenshotPanel)==null?void 0:h.querySelector("#ss-format"))==null?void 0:d.value)||"png",a=((f=(u=this.screenshotPanel)==null?void 0:u.querySelector("#ss-transparent"))==null?void 0:f.checked)||!1;try{const _=await so.takeScreenshot(e,t,n,{width:i.clientWidth*2,height:i.clientHeight*2,filename:s,format:o,transparent:a});_.success?console.log(`📸 Quick screenshot saved: ${_.filename}`):console.error("Screenshot failed:",_.error)}catch(_){console.error("Screenshot error:",_)}}async takeCustomScreenshot(){var m,p,b,E,y,R,P,T,A,M,x,C;const e=this.renderer,t=this.sceneManager.getScene(),n=this.cameraManager.getCamera(),i=parseInt((p=(m=this.screenshotPanel)==null?void 0:m.querySelector("#ss-width"))==null?void 0:p.value)||800,s=parseInt((E=(b=this.screenshotPanel)==null?void 0:b.querySelector("#ss-height"))==null?void 0:E.value)||800,o=((R=(y=this.screenshotPanel)==null?void 0:y.querySelector("#ss-filename"))==null?void 0:R.value)||"screenshot",a=((T=(P=this.screenshotPanel)==null?void 0:P.querySelector("#ss-format"))==null?void 0:T.value)||"png",l=((M=(A=this.screenshotPanel)==null?void 0:A.querySelector("#ss-transparent"))==null?void 0:M.checked)||!1,c=((C=(x=this.screenshotPanel)==null?void 0:x.querySelector("#ss-floor-shadow"))==null?void 0:C.checked)||!1,h=`${o}_${i}x${s}`,d=this.ground?this.ground.visible:!1;this.ground&&(this.ground.visible=c);let u=null,f=null,_=null,g=null;if(this.screenshotFramePanel){const k=document.getElementById("flexframe-viewer-container");if(k){const N=k.getBoundingClientRect();_=N.width,g=N.height,u=parseFloat(this.screenshotFramePanel.style.width)||0,f=parseFloat(this.screenshotFramePanel.style.height)||0}}try{const k=await so.takeScreenshot(e,t,n,{width:i,height:s,filename:h,format:a,transparent:l,frameWidth:u,frameHeight:f,containerWidth:_,containerHeight:g});k.success?console.log(`📸 Custom screenshot saved: ${k.filename} (${i}x${s})`):console.error("Screenshot failed:",k.error)}catch(k){console.error("Screenshot error:",k)}finally{this.ground&&(this.ground.visible=d)}}async takeUserScreenshot(){await this.takeQuickScreenshot()}setupARBranding(){const e={companyName:"FlexFrame",callToAction:"Visit FlexFrame",websiteUrl:window.location.origin};if(window.flexframeSettings){if(window.flexframeSettings.logoUrl){let t=window.flexframeSettings.logoUrl;t.startsWith("http://")&&(t=t.replace("http://","https://")),e.logoUrl=t,console.log("[FlexFrame AR] Using WordPress logo for AR branding:",t)}window.flexframeSettings.siteUrl&&(e.websiteUrl=window.flexframeSettings.siteUrl)}tc.setBranding(e)}setupQualityToggle(){const e=document.getElementById("quality-toggle-btn");console.log("[Quality Debug] setupQualityToggle called, button found:",!!e),e&&e.addEventListener("click",()=>{console.log("[Quality Debug] Quality button clicked!"),this.switchModelQuality()})}updateQualityButtonVisibility(){const e=document.getElementById("quality-toggle-btn"),t=document.getElementById("quality-text");if(console.log("[Quality Debug] updateQualityButtonVisibility called"),console.log("[Quality Debug] Button found:",!!e),console.log("[Quality Debug] modelUrlSQ:",this.modelUrlSQ),console.log("[Quality Debug] modelUrlHQ:",this.modelUrlHQ),e)if(this.modelUrlSQ&&this.modelUrlHQ){if(console.log("[Quality Debug] ✅ Both models exist, showing button"),e.style.display="flex",t){const n=this.currentModelQuality==="SQ"?"HD":"SD";t.textContent=n,console.log("[Quality Debug] Set button text to:",n)}this.startQualityButtonPulsate()}else console.log("[Quality Debug] ❌ Missing model URLs, hiding button"),e.style.display="none",this.stopQualityButtonPulsate();else console.log("[Quality Debug] ❌ Button element not found in DOM!")}startQualityButtonPulsate(){this.stopQualityButtonPulsate();const e=document.getElementById("quality-toggle-btn"),t=document.getElementById("quality-text"),n=()=>{e&&t&&t.textContent==="HD"&&(e.classList.add("pulsate"),setTimeout(()=>{e.classList.remove("pulsate")},5e3))};n(),this.qualityPulsateInterval=setInterval(n,1e4)}stopQualityButtonPulsate(){this.qualityPulsateInterval&&(clearInterval(this.qualityPulsateInterval),this.qualityPulsateInterval=null);const e=document.getElementById("quality-toggle-btn");e&&e.classList.remove("pulsate")}async switchModelQuality(){var n,i,s,o,a,l;if(!this.modelUrlSQ||!this.modelUrlHQ)return;this.currentModelQuality=this.currentModelQuality==="SQ"?"HQ":"SQ";const e=this.currentModelQuality==="SQ"?this.modelUrlSQ:this.modelUrlHQ;console.log("Switching to",this.currentModelQuality,"model:",e);const t=document.getElementById("quality-text");if(t){const c=this.currentModelQuality==="SQ"?"HD":"SD";t.textContent=c}if(this.startQualityButtonPulsate(),console.log("[HQ Debug] currentConfig:",this.currentConfig),console.log("[HQ Debug] Has cameraHQ?",!!((n=this.currentConfig)!=null&&n.cameraHQ)),console.log("[HQ Debug] cameraHQ value:",(i=this.currentConfig)==null?void 0:i.cameraHQ),this.currentModelQuality==="HQ"&&((s=this.currentConfig)!=null&&s.modelHQ||(o=this.currentConfig)!=null&&o.cameraHQ)){console.log("[HQ Debug] ✅ Entering HQ branch");const c=this.currentConfig.modelHQ,h=this.currentConfig.cameraHQ||(c==null?void 0:c.camera);if(console.log("[HQ Debug] hqCameraSettings:",h),c!=null&&c.model&&(this.pendingModelConfig=c.model),await this.loadModel(e),console.log("[HQ Debug] Model loaded, now applying camera settings"),h){console.log("[HQ Debug] Applying HQ camera position:",h.position);const d=this.cameraManager.getCamera();h.position&&d.position.set(...h.position),h.rotation&&d.rotation.set(...h.rotation),h.target&&this.cameraManager.getControls().target.set(...h.target),this.cameraManager.getControls().update(),this.cameraManager.updateOriginalState(h.position,h.rotation,h.target)}}else if((a=this.currentConfig)!=null&&a.model&&(this.pendingModelConfig=this.currentConfig.model),await this.loadModel(e),(l=this.currentConfig)!=null&&l.camera){const c=this.cameraManager.getCamera();this.currentConfig.camera.position&&c.position.set(...this.currentConfig.camera.position),this.currentConfig.camera.rotation&&c.rotation.set(...this.currentConfig.camera.rotation),this.currentConfig.camera.target&&this.cameraManager.getControls().target.set(...this.currentConfig.camera.target),this.cameraManager.getControls().update(),this.cameraManager.updateOriginalState(this.currentConfig.camera.position,this.currentConfig.camera.rotation,this.currentConfig.camera.target)}}loadModel(e=Ii("models/exercise.glb")){return new Promise((t,n)=>{const i=document.getElementById("model-loader");i&&(this.updateLoaderSpinner(),i.style.display="flex"),this.modelFolder&&(this.modelFolder.destroy(),this.modelFolder=null),this.materialsFolder&&(this.materialsFolder.destroy(),this.materialsFolder=null),window.model&&(this.sceneManager.getScene().remove(window.model),window.model=null),this.mixer&&(this.mixer.stopAllAction(),this.mixer=null),this.allClickableMeshes=[],Tn.clear(),this.updateLoadProgress(0),this.gltfLoader.load(e,s=>{window.model=s.scene;const o=window.model,a=new Map;if(o.traverse(c=>{if(c.isMesh&&(this.allClickableMeshes.push(c),c.castShadow=!0,c.receiveShadow=!0,c.material)){const h=Array.isArray(c.material)?c.material:[c.material],d=[];h.forEach(u=>{var f,_;if(u.name)if(u.name.includes("MUSCLE")&&u.type!=="MeshPhysicalMaterial")if(a.has(u.name))d.push(a.get(u.name));else{console.log(`Converting ${u.name} to MeshPhysicalMaterial for sheen support`);const g=new Ut({color:new ge(16777215),map:u.map,normalMap:u.normalMap,roughness:0,metalness:0,emissive:new ge(0),emissiveIntensity:1.14,emissiveMap:u.emissiveMap,opacity:1,transparent:!0,side:rt,depthWrite:!0,sheen:.3,sheenRoughness:.45,sheenColor:new ge(15403530)});g.name=u.name,u.map&&(g.bumpMap=u.map,g.bumpScale=10.2),a.set(u.name,g),d.push(g)}else if(u.name.includes("SKIN"))if(a.has(u.name))d.push(a.get(u.name));else{console.log(`Converting/Updating ${u.name} to MeshPhysicalMaterial for advanced transparency`);const g=new Ut({color:new ge(13426421),map:null,normalMap:null,roughness:0,metalness:0,emissive:new ge(0),emissiveIntensity:1,emissiveMap:null,opacity:1,transparent:!1,side:At,depthWrite:!1,depthTest:!0,blending:Qs,alphaTest:0,transmission:1,thickness:0,ior:1,envMapIntensity:2.29,sheen:0,sheenRoughness:1,sheenColor:new ge(0)});g.name=u.name,g.bumpScale=1,console.log(`✅ ${u.name} Material Settings Applied:`,{color:"#"+g.color.getHexString(),opacity:g.opacity,transmission:g.transmission,ior:g.ior,roughness:g.roughness,metalness:g.metalness,envMapIntensity:g.envMapIntensity,side:g.side===rt?"DoubleSide":g.side===At?"FrontSide":"BackSide",blending:g.blending,depthWrite:g.depthWrite,depthTest:g.depthTest,thickness:g.thickness,bumpScale:g.bumpScale}),a.set(u.name,g),d.push(g)}else if(u.name.includes("SKELETON")&&u.type!=="MeshPhysicalMaterial")if(a.has(u.name))d.push(a.get(u.name));else{console.log(`Converting ${u.name} to MeshPhysicalMaterial`);const g=new Ut({color:new ge(16777215),map:u.map,normalMap:u.normalMap,roughness:.9875603442970008,metalness:0,emissive:new ge(0),emissiveIntensity:1,emissiveMap:u.emissiveMap,opacity:1,transparent:!0,side:rt,depthWrite:!0,depthTest:!0,blending:bt,alphaTest:0,envMapIntensity:1});g.name=u.name,u.map&&(g.bumpMap=u.map,g.bumpScale=1),a.set(u.name,g),d.push(g)}else if(u.name.includes("CHROME"))if(a.has(u.name))d.push(a.get(u.name));else{console.log(`Converting ${u.name} to MeshPhysicalMaterial with chrome settings`);const g=new Ut({color:new ge(16777215),roughness:.07,metalness:.82,emissive:new ge(0),emissiveIntensity:1,opacity:1,transparent:!1,side:rt,depthWrite:!0,depthTest:!0,blending:bt,alphaTest:0,envMapIntensity:1,sheen:0,sheenRoughness:1,sheenColor:new ge(0),transmission:0,thickness:0,ior:1.5});g.name=u.name,console.log(`✅ ${u.name} Material Settings Applied (pure chrome - no textures):`,{color:"#"+g.color.getHexString(),opacity:g.opacity,transparent:g.transparent,roughness:g.roughness,metalness:g.metalness,envMapIntensity:g.envMapIntensity,side:g.side===rt?"DoubleSide":g.side===At?"FrontSide":"BackSide"}),a.set(u.name,g),d.push(g)}else if(u.name.includes("COLOR_1"))if(a.has(u.name))d.push(a.get(u.name));else{console.log(`Converting ${u.name} to MeshPhysicalMaterial with custom settings`);const m=((f=window.flexframeSettings)==null?void 0:f.primaryColorMode)==="custom"&&((_=window.flexframeSettings)!=null&&_.primaryColor)?window.flexframeSettings.primaryColor:"#ff0000",p=new Ut({color:new ge(m),roughness:.2152357035754776,metalness:0,emissive:new ge(0),emissiveIntensity:1,opacity:1,transparent:!1,side:rt,depthWrite:!0,depthTest:!0,blending:bt,alphaTest:0,envMapIntensity:1,sheen:0,sheenRoughness:1,sheenColor:new ge(0),transmission:0,thickness:0,ior:1.5});p.name=u.name,console.log(`✅ ${u.name} Material Settings Applied:`,{color:"#"+p.color.getHexString(),opacity:p.opacity,transparent:p.transparent,roughness:p.roughness,metalness:p.metalness,side:p.side===rt?"DoubleSide":p.side===At?"FrontSide":"BackSide"}),a.set(u.name,p),d.push(p)}else d.push(u)}),d.length>0&&(Array.isArray(c.material)?c.material=d:c.material=d[0])}}),this.currentConfig&&this.currentConfig.customTextures&&this.applyCustomTextures(o,this.currentConfig.customTextures),window.flexframeSettings&&window.flexframeSettings.logoUrl){let c=window.flexframeSettings.logoUrl;c.startsWith("http://")&&(c=c.replace("http://","https://")),console.log("🎨 Applying LOGO texture from WordPress settings:",c);const h=window.flexframeSettings.logoThreshold||.95,d=window.flexframeSettings.logoBorderEnabled||!1,u=window.flexframeSettings.logoBorderSize||2,f=window.flexframeSettings.logoDisplaySize||100;this.applyLogoTexture(o,c,h,d,u,f)}if(o.position.set(0,-.02,0),this.pendingModelConfig&&(this.pendingModelConfig.position&&o.position.set(...this.pendingModelConfig.position),this.pendingModelConfig.rotation&&o.rotation.set(...this.pendingModelConfig.rotation),this.pendingModelConfig.scale&&o.scale.set(...this.pendingModelConfig.scale),this.pendingModelConfig=null),window.flexframeSettings){const c=window.flexframeSettings.materialMode||"preset";if(c==="custom"&&window.flexframeSettings.skinSettings)console.log("Pre-applying Custom SKIN settings..."),this.applyCustomSkinSettings(window.flexframeSettings.skinSettings);else if(c==="preset"&&window.flexframeSettings.materialPreset){const h=window.flexframeSettings.materialPreset;console.log("Material Preset setting:",h),h==="default"||h==="dark"||h==="light"||h==="preset1"?(console.log("Pre-applying Default Material Preset..."),this.applyMaterialPreset1()):h==="wp_preset"&&(console.log("Pre-applying WP Preset..."),this.applyWPPreset())}window.flexframeSettings.equipmentMaterials&&(console.log("Applying Equipment Material Settings..."),this.applyEquipmentMaterials(o,window.flexframeSettings.equipmentMaterials))}this.sceneManager.getScene().add(o);const l=document.getElementById("model-loader");l&&(l.style.display="none"),this.cameraManager.setClickableMeshes(this.allClickableMeshes),s.animations&&s.animations.length>0&&(this.mixer=new Du(o),this.animationPlayer.setMixer(this.mixer,s.animations),this.animationPlayer.actions&&this.animationPlayer.actions.length>0&&(this.animationPlayer.actions[0].play(),this.animationPlayer.isPlaying=!0,this.animationPlayer.updatePlayPauseIcon())),this.setupModelGUI(o),this.setupMaterialsGUI(o),this.updateLoadProgress(100),t(o)},s=>{if(s.lengthComputable){const o=Math.round(s.loaded/s.total*100);this.updateLoadProgress(o)}else this.updateLoadProgress(-1)},s=>{console.error("An error happened while loading the GLB model:",s);const o=document.getElementById("model-loader");o&&(o.style.display="none"),n(s)})})}setupModelGUI(e){this.modelFolder=this.trackFolder(this.gui.addFolder("Model Transform"));const t=e.position,n=e.rotation,i=e.scale;this.modelFolder.add(t,"x",-1,1,.002).name("Position X"),this.modelFolder.add(t,"y",-1,1,.002).name("Position Y"),this.modelFolder.add(t,"z",-1,1,.002).name("Position Z"),this.modelFolder.add(n,"x",-1,1,.002).name("Rotation X"),this.modelFolder.add(n,"y",-1,1,.002).name("Rotation Y"),this.modelFolder.add(n,"z",-1,1,.002).name("Rotation Z"),this.modelFolder.add(i,"x",.01,1,.001).name("Scale X"),this.modelFolder.add(i,"y",.01,1,.001).name("Scale Y"),this.modelFolder.add(i,"z",.01,1,.001).name("Scale Z"),this.modelFolder.add({showAxis:this.cameraManager.axisHelperVisible},"showAxis").name("Show Axis Helper").onChange(s=>{this.cameraManager.toggleAxisHelper(s)}),this.modelFolder.add({axisSize:this.cameraManager.axisHelperSize},"axisSize",.1,2,.1).name("Axis Size").onChange(s=>{this.cameraManager.setAxisHelperSize(s)}),this.modelFolder.add({saveModelSettings:async()=>{const s=this.gatherModelSpecificSettings(),o=JSON.stringify(s,null,2);try{await navigator.clipboard.writeText(o),alert("Model config copied to clipboard!"),console.log("Model config saved:",s)}catch(a){console.error("Failed to copy to clipboard:",a),alert("Failed to copy config to clipboard.")}}},"saveModelSettings").name("Save Model Config")}setupMaterialsGUI(e){const t=new Map;e.traverse(n=>{n.isMesh&&n.material&&(Array.isArray(n.material)?n.material:[n.material]).forEach(s=>{if(s&&s.name&&!t.has(s.name))t.set(s.name,s);else if(s&&!s.name){const o=`Material_${t.size}`;s.name=o,t.set(o,s)}})}),t.size>0&&(document.createElement("div"),this.materialsFolder=this.trackFolder(this.gui.addFolder("Material Colors")),setTimeout(()=>{const n=this.gui.domElement.querySelector(".children"),i=this.materialsFolder.domElement;n&&i&&(n.insertBefore(i,n.firstChild),i.classList.add("materials-folder-main"))},10),t.forEach((n,i)=>{var l,c,h,d,u,f;const s=this.trackFolder(this.materialsFolder.addFolder(i));if(s.close(),(l=this.currentConfig)!=null&&l.customTextures&&this.currentConfig.customTextures[i]){const _=this.currentConfig.customTextures[i],g={textureUrl:_},m=s.add(g,"textureUrl").name("Texture URL (click to copy)");setTimeout(()=>{const p=m.domElement.querySelector("input");p&&(p.style.cursor="pointer",p.readOnly=!0,p.addEventListener("click",()=>{navigator.clipboard.writeText(_).then(()=>{console.log("Texture URL copied to clipboard:",_),p.style.background="rgba(74, 158, 255, 0.3)",setTimeout(()=>{p.style.background=""},300)})}))},0),setTimeout(()=>{const p=s.domElement;if(p){const b=document.createElement("div");b.className="material-texture-thumbnail";const E=document.createElement("img");E.src=_+(_.includes("?")?"&":"?")+`t=${Date.now()}`,E.alt=`${i} texture`,b.appendChild(E),p.appendChild(b)}},0)}if((c=this.currentConfig)!=null&&c.customTextures&&this.currentConfig.customTextures[i]&&s.add(n,"alphaTest",0,1,.01).name("Edge Threshold (Fix Fringe)").onChange(()=>n.needsUpdate=!0),n.color){const _={color:"#"+n.color.getHexString()};s.addColor(_,"color").name("Color").onChange(g=>{n.color.set(g),n.needsUpdate=!0})}s.add(n,"opacity",0,1,.01).name("Opacity").onChange(()=>n.needsUpdate=!0),s.add(n,"transparent").name("Transparent").onChange(()=>n.needsUpdate=!0),(!((h=this.currentConfig)!=null&&h.customTextures)||!this.currentConfig.customTextures[i])&&s.add(n,"alphaTest",0,1,.01).name("Alpha Test").onChange(()=>n.needsUpdate=!0);const o={Front:At,Back:Ct,Double:rt};if(s.add(n,"side",o).name("Side").onChange(()=>n.needsUpdate=!0),s.add(n,"depthWrite").name("Depth Write").onChange(()=>n.needsUpdate=!0),n.metalness!==void 0&&s.add(n,"metalness",0,1,.01).name("Metalness").onChange(()=>n.needsUpdate=!0),n.roughness!==void 0&&s.add(n,"roughness",0,1,.01).name("Roughness").onChange(()=>n.needsUpdate=!0),n.emissive){const _={emissive:n.emissive.getHex()};s.addColor(_,"emissive").name("Emissive").onChange(g=>{n.emissive.setHex(g)})}if(n.emissiveIntensity!==void 0&&s.add(n,"emissiveIntensity",0,2,.01).name("Emissive Intensity").onChange(()=>n.needsUpdate=!0),i.includes("MUSCLE")){if(n.sheen!==void 0){s.add(n,"sheen",0,1,.01).name("Sheen Intensity").onChange(()=>n.needsUpdate=!0),s.add(n,"sheenRoughness",0,1,.01).name("Sheen Roughness").onChange(()=>n.needsUpdate=!0);const _={sheenColor:n.sheenColor?n.sheenColor.getHex():16777215};s.addColor(_,"sheenColor").name("Sheen Color").onChange(g=>{n.sheenColor||(n.sheenColor=new ge),n.sheenColor.setHex(g),n.needsUpdate=!0})}n.bumpScale!==void 0&&n.bumpMap&&(setTimeout(()=>{const _=s.domElement;if(_){const g=document.createElement("div");g.className="material-texture-thumbnail";const m=document.createElement("div");m.textContent="Bump Map Texture:",m.style.fontSize="11px",m.style.marginBottom="4px",m.style.color="#aaa";const p=document.createElement("img");if(n.bumpMap.image&&n.bumpMap.image.src)p.src=n.bumpMap.image.src;else if(n.bumpMap.source&&n.bumpMap.source.data){const b=document.createElement("canvas");b.width=64,b.height=64;const E=b.getContext("2d");n.bumpMap.image&&E.drawImage(n.bumpMap.image,0,0,64,64),p.src=b.toDataURL()}p.alt="Bump map texture",g.appendChild(m),g.appendChild(p),_.appendChild(g)}},100),s.add(n,"bumpScale",-20,20,.1).name("Bump Scale").onChange(()=>n.needsUpdate=!0))}if(i.includes("SKIN")){n._originalColorMap||(n._originalColorMap=n.map);const _=window.flexframeSettings&&window.flexframeSettings.materialMode==="custom",g={useColorMap:_?!1:!!n.map};_&&n.map&&(n.map=null,n.needsUpdate=!0),s.add(g,"useColorMap").name("🎨 Use Color Map").onChange(y=>{y&&n._originalColorMap?n.map=n._originalColorMap:n.map=null,n.needsUpdate=!0});const m={"Front (Single)":At,Back:Ct,Double:rt};s.add(n,"side",m).name("Face Culling").onChange(()=>n.needsUpdate=!0);const p={Normal:bt,Additive:or,Subtractive:ar,Multiply:lr,Custom:Qs};s.add(n,"blending",p).name("Blending Mode").onChange(()=>n.needsUpdate=!0),s.add(n,"depthWrite").name("Depth Write").onChange(()=>n.needsUpdate=!0),s.add(n,"depthTest").name("Depth Test").onChange(()=>n.needsUpdate=!0),s.add(n,"opacity",0,1,.01).name("Opacity").onChange(()=>n.needsUpdate=!0),s.add(n,"transparent").name("Transparent").onChange(()=>n.needsUpdate=!0),s.add(n,"alphaTest",0,1,.01).name("Alpha Test").onChange(()=>n.needsUpdate=!0),n.transmission!==void 0&&(s.add(n,"transmission",0,1,.01).name("🪟 Transmission (Glass)").onChange(()=>n.needsUpdate=!0),s.add(n,"thickness",0,5,.01).name("Thickness").onChange(()=>n.needsUpdate=!0),s.add(n,"ior",1,2.333,.01).name("IOR (Refraction)").onChange(()=>n.needsUpdate=!0),s.add(n,"envMapIntensity",0,3,.01).name("Env Map Intensity").onChange(()=>n.needsUpdate=!0));const b={castShadow:!0,setCastShadow:y=>{window.model&&window.model.traverse(R=>{R.isMesh&&R.material&&(Array.isArray(R.material)?R.material:[R.material]).some(T=>T.name===i)&&(R.castShadow=y)})}};s.add(b,"castShadow").name("Cast Shadows").onChange(y=>b.setCastShadow(y));const E={shadowBlur:((f=(u=(d=this.lighting)==null?void 0:d.directionalLight)==null?void 0:u.shadow)==null?void 0:f.radius)||1,setShadowBlur:y=>{var R,P;(P=(R=this.lighting)==null?void 0:R.directionalLight)!=null&&P.shadow&&(this.lighting.directionalLight.shadow.radius=y,console.log(`Shadow blur set to: ${y}`))}};s.add(E,"shadowBlur",0,10,.1).name("Shadow Blur").onChange(y=>E.setShadowBlur(y))}const a={copySettings:()=>{const _=n.map||n.normalMap||n.emissiveMap||n.bumpMap;let g="Can you please use these material settings as the default material settings whenever a model loads in with this specific material name.";_?g+=` Do NOT preserve any texture maps - use pure material properties only:

`:g+=`

`,g+=`Material Name: "${i}"

`,g+=`Settings:
`,n.color&&(g+=`- Color: #${n.color.getHexString()}
`),n.opacity!==void 0&&(g+=`- Opacity: ${n.opacity}
`),n.transparent!==void 0&&(g+=`- Transparent: ${n.transparent}
`),n.alphaTest!==void 0&&(g+=`- Alpha Test: ${n.alphaTest}
`),n.side!==void 0&&(g+=`- Side: ${{0:"FrontSide",1:"BackSide",2:"DoubleSide"}[n.side]||n.side}
`),n.depthWrite!==void 0&&(g+=`- Depth Write: ${n.depthWrite}
`),n.metalness!==void 0&&(g+=`- Metalness: ${n.metalness}
`),n.roughness!==void 0&&(g+=`- Roughness: ${n.roughness}
`),n.emissive&&(g+=`- Emissive: #${n.emissive.getHexString()}
`),n.emissiveIntensity!==void 0&&(g+=`- Emissive Intensity: ${n.emissiveIntensity}
`),n.sheen!==void 0&&(g+=`- Sheen: ${n.sheen}
`),n.sheenRoughness!==void 0&&(g+=`- Sheen Roughness: ${n.sheenRoughness}
`),n.sheenColor&&(g+=`- Sheen Color: #${n.sheenColor.getHexString()}
`),n.bumpScale!==void 0&&(g+=`- Bump Scale: ${n.bumpScale}
`),n.transmission!==void 0&&(g+=`- Transmission: ${n.transmission}
`),n.thickness!==void 0&&(g+=`- Thickness: ${n.thickness}
`),n.ior!==void 0&&(g+=`- IOR: ${n.ior}
`),n.envMapIntensity!==void 0&&(g+=`- Env Map Intensity: ${n.envMapIntensity}
`),n.blending!==void 0&&(g+=`- Blending: ${{0:"NoBlending",1:"NormalBlending",2:"AdditiveBlending",3:"SubtractiveBlending",4:"MultiplyBlending",5:"CustomBlending"}[n.blending]||n.blending}
`),n.depthTest!==void 0&&(g+=`- Depth Test: ${n.depthTest}
`),_&&(g+=`
Note: Remove all texture maps (map, normalMap, emissiveMap, bumpMap) for a pure material appearance.`),navigator.clipboard.writeText(g).then(()=>{console.log("Material settings copied to clipboard for:",i)})}};s.add(a,"copySettings").name("Copy Settings")}))}applyCustomTextures(e,t){Object.keys(t).forEach(n=>{const i=t[n],s=i+(i.includes("?")?"&":"?")+`t=${Date.now()}`;console.log(`🎨 Custom texture for ${n}: ${i}`),console.log(`🔄 Cache-busted URL: ${s}`),e.traverse(o=>{o.isMesh&&o.material&&(Array.isArray(o.material)?o.material:[o.material]).forEach(l=>{l.name===n&&(console.log(`✅ Found material "${n}" - applying texture...`),l.map&&l.map.dispose(),this.textureLoader.load(s,c=>{c.colorSpace=mt,c.premultiplyAlpha=!1,c.minFilter=lt,c.magFilter=lt,c.generateMipmaps=!1,l.map=c,l.transparent=!0,l.alphaTest=.95,l.depthWrite=!1,l.needsUpdate=!0,console.log(`✅ PNG texture with transparency applied to ${n}`),console.log(`📷 Texture loaded from: ${s}`)},void 0,c=>{console.error(`❌ Error loading texture for ${n}:`,c)}))})})})}applyLogoTexture(e,t,n=.95,i=!1,s=2,o=100){const a=t+(t.includes("?")?"&":"?")+`t=${Date.now()}`;e.traverse(l=>{l.isMesh&&l.material&&(Array.isArray(l.material)?l.material:[l.material]).forEach(h=>{if(h.name==="LOGO"){console.log("✅ Found LOGO material - applying texture..."),h.map&&h.map.dispose();const d=new Image;d.crossOrigin="anonymous",d.onload=()=>{const u=document.createElement("canvas"),f=u.getContext("2d"),_=o/100,g=d.width*_,m=d.height*_;u.width=d.width,u.height=d.height,f.clearRect(0,0,u.width,u.height);const p=(u.width-g)/2,b=(u.height-m)/2;if(i&&s>0){f.globalCompositeOperation="source-over";const y=document.createElement("canvas"),R=y.getContext("2d");y.width=u.width,y.height=u.height,R.drawImage(d,p,b,g,m);const P=parseInt(s);for(let T=0;T<360;T+=15){const A=T*Math.PI/180,M=Math.cos(A)*P,x=Math.sin(A)*P;f.drawImage(y,M,x)}f.globalCompositeOperation="source-in",f.fillStyle="white",f.fillRect(0,0,u.width,u.height),f.globalCompositeOperation="source-over",f.drawImage(d,p,b,g,m)}else f.drawImage(d,p,b,g,m);const E=new ya(u);E.colorSpace=mt,E.premultiplyAlpha=!1,E.minFilter=lt,E.magFilter=lt,E.generateMipmaps=!1,h.map=E,h.transparent=!0,h.alphaTest=parseFloat(n)||.95,h.depthWrite=!1,h.needsUpdate=!0,console.log("✅ LOGO texture applied successfully with border:",i,"size:",s,"displaySize:",o)},d.onerror=u=>{console.error("❌ Error loading LOGO texture:",u)},d.src=a}})})}applyMaterialPreset1(){var n,i;if(!window.model){console.log("No model loaded");return}const e={SKELETON:{color:"#ffffff",opacity:1,transparent:!0,metalness:0,roughness:.99,transmission:0,thickness:0,ior:1.5,side:rt,blending:bt,depthWrite:!0,depthTest:!0,envMapIntensity:1},SKIN:{color:"#ccdef5",opacity:1,transparent:!1,metalness:0,roughness:0,transmission:1,thickness:0,ior:1,side:At,blending:Qs,depthWrite:!1,depthTest:!0,envMapIntensity:2.29},MUSCLE:{color:"#ffffff",opacity:1,transparent:!0,metalness:0,roughness:0,transmission:0,thickness:0,ior:1.5,side:rt,blending:bt,depthWrite:!0,depthTest:!0,envMapIntensity:1},CHROME:{color:"#ffffff",opacity:1,transparent:!1,metalness:.82,roughness:.07,transmission:0,thickness:0,ior:1.5,side:rt,blending:bt,depthWrite:!0,depthTest:!0,envMapIntensity:1},METAL:{color:"#151515",opacity:1,transparent:!1,metalness:.85,roughness:.36,transmission:0,thickness:0,ior:1.5,side:rt,blending:bt,depthWrite:!0,depthTest:!0,envMapIntensity:1},PLASTIC:{color:"#ffffff",opacity:.8,transparent:!0,metalness:0,roughness:.82,transmission:.2,thickness:0,ior:1.5,side:rt,blending:bt,depthWrite:!1,depthTest:!0,envMapIntensity:1},COLOR_1:{color:((n=window.flexframeSettings)==null?void 0:n.primaryColorMode)==="custom"&&((i=window.flexframeSettings)!=null&&i.primaryColor)?window.flexframeSettings.primaryColor:"#ff0000",opacity:1,transparent:!1,metalness:0,roughness:.215,transmission:0,thickness:0,ior:1.5,side:rt,blending:bt,depthWrite:!0,depthTest:!0,envMapIntensity:1}};let t=0;window.model.traverse(s=>{s.isMesh&&s.material&&(Array.isArray(s.material)?s.material:[s.material]).forEach(a=>{if(a.name&&e[a.name.toUpperCase()]){const l=e[a.name.toUpperCase()];l.color&&a.color.set(l.color),a.opacity=l.opacity,a.transparent=l.transparent,a.metalness=l.metalness,a.roughness=l.roughness,a.transmission=l.transmission,a.thickness=l.thickness,a.ior=l.ior,a.side=l.side,a.blending=l.blending,a.depthWrite=l.depthWrite,a.depthTest=l.depthTest,a.envMapIntensity=l.envMapIntensity,a.name.toUpperCase()==="SKIN"&&(a.map=null,a.normalMap=null,a.emissiveMap=null,a.bumpMap=null),l.attenuationDistance&&(a.attenuationDistance=l.attenuationDistance),a.needsUpdate=!0,t++}})}),console.log(`✅ Applied Material Preset 1 to ${t} materials`),this.gui&&setTimeout(()=>{this.gui.controllersRecursive().forEach(s=>{s.updateDisplay()})},100)}applyCustomSkinSettings(e){if(!window.model){console.log("No model loaded for custom skin settings");return}console.log("Applying custom SKIN settings:",e),window.model.traverse(t=>{t.isMesh&&t.material&&(Array.isArray(t.material)?t.material:[t.material]).forEach(i=>{i.name&&i.name.toUpperCase()==="SKIN"&&(e.color&&i.color.set(e.color),e.opacity!==void 0&&(i.opacity=e.opacity,i.transparent=e.opacity<1),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.transmission!==void 0&&(i.transmission=e.transmission),e.thickness!==void 0&&(i.thickness=e.thickness),e.ior!==void 0&&(i.ior=e.ior),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),i.needsUpdate=!0,console.log("✅ Custom SKIN settings applied to material:",i.name))})}),this.gui&&setTimeout(()=>{this.gui.controllersRecursive().forEach(t=>{t.updateDisplay()})},100)}applyEquipmentMaterials(e,t){if(!e||!t){console.log("No model or equipment materials to apply");return}console.log("Equipment Materials from WordPress:",t);const n={BARBELL:"BARBELL",BUMPER:"BUMPER",CABLE:"CABLE",CHROME:"CHROME",COLOR_1:"COLOR1",COLOR1:"COLOR1",METAL:"METAL",PAD:"PAD",PLASTIC:"PLASTIC",RUBBER:"RUBBER"};e.traverse(i=>{i.isMesh&&i.material&&(Array.isArray(i.material)?i.material:[i.material]).forEach(o=>{if(!o.name)return;const a=o.name.toUpperCase(),l=n[a];if(l&&t[l]){const c=t[l];if(!c.enabled){console.log(`Equipment material ${a} is disabled, skipping`);return}if(console.log(`Applying equipment settings to ${a}:`,c),c.color&&o.color.set(c.color),c.opacity!==void 0&&c.opacity!==null&&(o.opacity=parseFloat(c.opacity),o.transparent=o.opacity<1),c.metalness!==void 0&&c.metalness!==null&&(o.metalness=parseFloat(c.metalness)),c.roughness!==void 0&&c.roughness!==null&&(o.roughness=parseFloat(c.roughness)),c.clearcoat!==void 0&&c.clearcoat!==null&&(o.clearcoat=parseFloat(c.clearcoat)),c.clearcoatRoughness!==void 0&&c.clearcoatRoughness!==null&&(o.clearcoatRoughness=parseFloat(c.clearcoatRoughness)),c.emissiveColor&&o.emissive.set(c.emissiveColor),c.emissiveIntensity!==void 0&&c.emissiveIntensity!==null&&(o.emissiveIntensity=parseFloat(c.emissiveIntensity)),c.transmission!==void 0&&c.transmission!==null&&(o.transmission=parseFloat(c.transmission)),c.thickness!==void 0&&c.thickness!==null&&(o.thickness=parseFloat(c.thickness)),c.ior!==void 0&&c.ior!==null&&(o.ior=parseFloat(c.ior)),c.sheen!==void 0&&c.sheen!==null&&(o.sheen=parseFloat(c.sheen)),c.sheenRoughness!==void 0&&c.sheenRoughness!==null&&(o.sheenRoughness=parseFloat(c.sheenRoughness)),c.sheenColor&&o.sheenColor.set(c.sheenColor),c.envMapIntensity!==void 0&&c.envMapIntensity!==null&&(o.envMapIntensity=parseFloat(c.envMapIntensity)),c.blending)switch(c.blending){case"normal":o.blending=bt;break;case"additive":o.blending=or;break;case"subtractive":o.blending=ar;break;case"multiply":o.blending=lr;break}c.bumpMapEnabled!==void 0&&c.bumpMapEnabled!==null&&!c.bumpMapEnabled&&o.bumpMap&&(o.bumpScale=0),c.normalMapEnabled!==void 0&&c.normalMapEnabled!==null&&!c.normalMapEnabled&&o.normalMap&&o.normalScale.set(0,0),c.colorMapEnabled!==void 0&&c.colorMapEnabled!==null&&!c.colorMapEnabled&&o.map&&(o.map=null),o.needsUpdate=!0,console.log(`✅ Equipment material settings applied to: ${a}`)}})})}setupEventListeners(){window.addEventListener("resize",()=>{this.sizes.width=window.innerWidth,this.sizes.height=window.innerHeight,this.cameraManager.handleResize(),this.renderer.setSize(this.sizes.width,this.sizes.height),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))}),this.sceneManager.getCanvas().addEventListener("pointerdown",e=>{if(this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.cameraManager.getCamera()),window.model){const t=this.raycaster.intersectObject(window.model,!0);if(t.length>0){const n=t[0].object;n.isMesh&&n.material&&(Array.isArray(n.material)?n.material:[n.material]).forEach(s=>{console.log("🎨 Material:",s.name||"Unnamed Material")})}}})}animate(){const e=this.clock.getDelta();this.cameraManager.update(),this.updateCameraDebug&&this.updateCameraDebug(),this.particleSystem.update(e),this.mixer&&this.animationPlayer.isPlaying&&this.mixer.update(e),this.animationPlayer.update(e),this.renderer.render(this.sceneManager.getScene(),this.cameraManager.getCamera()),requestAnimationFrame(()=>this.animate())}setupScreenshotGUI(){const e=this.trackFolder(this.gui.addFolder("Screenshot")),t=this.screenshotManager.settings,n=this.screenshotManager.getResolutionPresets(),i={quickShot:()=>{this.screenshotManager.quickScreenshot().then(y=>{y.success?console.log(`✅ Screenshot saved: ${y.filename} (${y.size})`):console.error("❌ Screenshot failed:",y.error)})},transparentShot:()=>{this.screenshotManager.transparentScreenshot().then(y=>{y.success?console.log(`✅ Transparent screenshot saved: ${y.filename} (${y.size})`):console.error("❌ Screenshot failed:",y.error)})}};e.add(i,"quickShot").name("Take Screenshot"),e.add(i,"transparentShot").name("🫥 Transparent Background");const s=this.trackFolder(e.addFolder("Settings"));s.add(t,"transparent").name("Transparent Background").onChange(y=>{console.log("Transparent background:",y?"ON":"OFF")});const o={png:"PNG",jpg:"JPEG",webp:"WebP"};s.add(t,"format",o).name("Format").onChange(y=>{console.log("Format changed to:",y.toUpperCase()),a.domElement.style.display=y==="png"?"none":"block"});const a=s.add(t,"quality",.1,1,.1).name("Quality (0.1-1.0)").onChange(y=>{console.log("Quality:",Math.round(y*100)+"%")});t.format==="png"&&(a.domElement.style.display="none"),s.add(t,"filename").name("Filename").onChange(y=>{t.filename=y.replace(/[^a-zA-Z0-9_-]/g,"")}),s.add(t,"addTimestamp").name("Add Timestamp");const l=this.trackFolder(e.addFolder("Resolution")),c={};Object.keys(n).forEach(y=>{c[y]=n[y].name}),l.add(t,"resolution",c).name("Preset").onChange(y=>{this.screenshotManager.setResolution(y),_();const R=y==="custom";h.domElement.style.display=R?"block":"none",d.domElement.style.display=R?"block":"none",console.log("Resolution preset:",n[y].name)});const h=l.add(t,"customWidth",1,8192,1).name("Custom Width").onChange(y=>{this.screenshotManager.setCustomDimensions(y,t.customHeight),_()}),d=l.add(t,"customHeight",1,8192,1).name("Custom Height").onChange(y=>{this.screenshotManager.setCustomDimensions(t.customWidth,y),_()}),u={info:"Loading..."},f=l.add(u,"info").name("Current Resolution");f.domElement.querySelector("input").readOnly=!0,f.domElement.querySelector("input").style.color="#888";const _=()=>{const y=this.screenshotManager.getCurrentResolution(),R=(y.width*y.height/1e6).toFixed(1),P=this.calculateAspectRatio(y.width,y.height);u.info=`${y.width}×${y.height} (${R}MP, ${P})`},g=t.resolution==="custom";h.domElement.style.display=g?"block":"none",d.domElement.style.display=g?"block":"none";const m=this.trackFolder(l.addFolder("Quick Presets")),p={hd:()=>this.setQuickResolution("1280x720"),fhd:()=>this.setQuickResolution("1920x1080"),qhd:()=>this.setQuickResolution("2560x1440"),uhd:()=>this.setQuickResolution("3840x2160"),square:()=>this.setQuickResolution("1080x1080"),story:()=>this.setQuickResolution("1080x1920")};m.add(p,"hd").name("HD (720p)"),m.add(p,"fhd").name("Full HD (1080p)"),m.add(p,"qhd").name("2K (1440p)"),m.add(p,"uhd").name("4K (2160p)"),m.add(p,"square").name("Square (1:1)"),m.add(p,"story").name("Story (9:16)");const b=this.trackFolder(e.addFolder("Advanced")),E={currentViewport:()=>{const y=this.sceneManager.getCanvas();this.screenshotManager.setCustomDimensions(y.width,y.height),t.resolution="custom",_(),console.log(`Set to current viewport: ${y.width}×${y.height}`)},copySettings:()=>{const y=this.screenshotManager.getSettings();navigator.clipboard.writeText(JSON.stringify(y,null,2)),console.log("📋 Screenshot settings copied to clipboard")}};b.add(E,"currentViewport").name("Use Current Viewport"),b.add(E,"copySettings").name("Copy Screenshot Settings"),_()}setupMultiThumbnailMenuGUI(){const e=this.trackFolder(this.gui.addFolder("Multi-Thumbnail Menu")),t=this.multiThumbnailMenuSystem.settings;e.add(t,"widthPercentage",20,100,5).name("Width %").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({widthPercentage:s}),console.log("Multi-thumbnail menu width:",s+"%")}),e.addColor(t,"backgroundColor").name("Background Color").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({backgroundColor:s}),console.log("Multi-thumbnail menu background color:",s)}),e.add(t,"backgroundOpacity",0,1,.1).name("Background Opacity").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({backgroundOpacity:s}),console.log("Multi-thumbnail menu opacity:",s)}),e.add(t,"borderRadius",0,30,1).name("Corner Radius").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({borderRadius:s}),console.log("Multi-thumbnail menu radius:",s+"px")}),e.add(t,"keepOpen").name("Keep Menu Open").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({keepOpen:s}),console.log("Multi-thumbnail menu keep open:",s?"ON":"OFF")});const n=e.addFolder("Active Button Glow");n.addColor(t,"glowColor").name("Glow Color").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({glowColor:s}),console.log("Multi-thumbnail menu glow color:",s)}),n.add(t,"glowIntensity",0,1,.1).name("Glow Intensity").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({glowIntensity:s}),console.log("Multi-thumbnail menu glow intensity:",s)}),n.add(t,"glowSize",5,50,5).name("Glow Size").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({glowSize:s}),console.log("Multi-thumbnail menu glow size:",s+"px")}),e.add({copySettings:()=>this.multiThumbnailMenuSystem.copySettingsToClipboard()},"copySettings").name("Copy Settings");const i={hideRightMenu:!1};e.add(i,"hideRightMenu").name("Hide Right Info Menu").onChange(s=>{const o=document.querySelector(".thumbnail-grid-container-right");o&&(o.style.display=s?"none":"grid",console.log("Right info menu:",s?"HIDDEN":"VISIBLE"))}),e.add({copyRightMenuSettings:()=>this.rightMenuSystem.copySettingsToClipboard()},"copyRightMenuSettings").name("Copy Right Menu Settings"),setTimeout(()=>this.multiThumbnailMenuSystem.updateAllSettings(t),100)}setQuickResolution(e){this.screenshotManager.setResolution(e),this.screenshotManager.settings.resolution=e,console.log("Quick preset:",this.screenshotManager.getResolutionPresets()[e].name)}calculateAspectRatio(e,t){const n=(l,c)=>c===0?l:n(c,l%c),i=n(e,t),s=e/i,o=t/i,a={"16:9":[16,9],"21:9":[21,9],"4:3":[4,3],"3:2":[3,2],"1:1":[1,1],"9:16":[9,16],"2:1":[2,1],"5:4":[5,4]};for(const[l,[c,h]]of Object.entries(a))if(s===c&&o===h)return l;return`${s}:${o}`}createScreenshotFrame(){this.screenshotFrame&&document.body.removeChild(this.screenshotFrame),this.screenshotFrame=document.createElement("div"),this.screenshotFrame.className="screenshot-frame",this.screenshotFrame.innerHTML=`
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
        `,document.head.querySelector("style[data-screenshot-frame]")||(e.setAttribute("data-screenshot-frame","true"),document.head.appendChild(e)),document.body.appendChild(this.screenshotFrame)}updateScreenshotFrame(e,t){if(!this.screenshotFrame)return;const i=this.renderer.domElement.getBoundingClientRect(),s=i.width/i.height,o=e/t;let a,l;o>s?(a=i.width*.8,l=a/o):(l=i.height*.8,a=l*o);const c=i.left+(i.width-a)/2,h=i.top+(i.height-l)/2;this.screenshotFrame.style.left=c+"px",this.screenshotFrame.style.top=h+"px",this.screenshotFrame.style.width=a+"px",this.screenshotFrame.style.height=l+"px";const d=this.screenshotFrame.querySelector(".frame-info");d.textContent=`${e} × ${t} pixels`}toggleScreenshotFrame(e){this.frameVisible=e,this.screenshotFrame&&this.screenshotFrame.classList.toggle("visible",e)}setupSimpleScreenshotGUI(){const e=this.trackFolder(this.gui.addFolder("Screenshot")),t=this.trackFolder(e.addFolder("Custom Settings")),n=()=>({renderer:this.renderer,scene:this.sceneManager.getScene(),camera:this.cameraManager.getCamera()}),i={width:400,height:400,transparent:!1,format:"png",filename:"screenshot",showFrame:!1},s=()=>{this.currentExerciseName&&(i.filename=`${this.currentExerciseName} Thumbnail`)};s(),this.createScreenshotFrame(),t.add(i,"width",100,4096,1).name("Width").onChange(a=>{i.showFrame&&this.updateScreenshotFrame(a,i.height)}),t.add(i,"height",100,4096,1).name("Height").onChange(a=>{i.showFrame&&this.updateScreenshotFrame(i.width,a)}),t.add(i,"showFrame").name("Show Frame Preview").onChange(a=>{this.toggleScreenshotFrame(a),a&&this.updateScreenshotFrame(i.width,i.height)}),t.add(i,"transparent").name("Transparent"),t.add(i,"format",["png","jpg","webp"]).name("Format");const o=t.add(i,"filename").name("Filename");document.addEventListener("exercisesSelected",()=>{s(),o.updateDisplay()}),t.add({customShot:async()=>{const a=n(),l=await so.takeScreenshot(a.renderer,a.scene,a.camera,i);l.success?console.log(`✅ Custom ${l.filename} saved (${l.size})`):console.error(`❌ Custom screenshot failed: ${l.error}`)}},"customShot").name("Take Custom Screenshot")}}new V0;
//# sourceMappingURL=index-D0_XpKxd.js.map
