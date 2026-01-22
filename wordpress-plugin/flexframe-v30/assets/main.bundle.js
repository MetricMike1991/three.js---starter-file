var FlexFrameViewer=(()=>{var za=Object.defineProperty;var Bd=Object.getOwnPropertyDescriptor;var kd=Object.getOwnPropertyNames;var zd=Object.prototype.hasOwnProperty;var Hd=(r,e)=>{for(var t in e)za(r,t,{get:e[t],enumerable:!0})},Vd=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of kd(e))!zd.call(r,i)&&i!==t&&za(r,i,{get:()=>e[i],enumerable:!(n=Bd(e,i))||n.enumerable});return r};var Gd=r=>Vd(za({},"__esModule",{value:!0}),r);var n_={};Hd(n_,{getAssetUrl:()=>In});var nn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},hi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},qh=0,bl=1,$h=2;var Sl=1,Fo=2,Tn=3,vt=0,It=1,nt=2,$n=0,Rt=1,wr=2,Er=3,Ar=4,Ms=5,si=100,Yh=101,Zh=102,Kh=103,jh=104,Jh=200,Qh=201,eu=202,tu=203,po=204,mo=205,nu=206,iu=207,su=208,ru=209,ou=210,au=211,lu=212,cu=213,hu=214,Uo=0,No=1,Oo=2,Ei=3,Bo=4,ko=5,zo=6,Ho=7,Ml=0,uu=1,du=2,Yn=0,fu=1,pu=2,mu=3,Vo=4,gu=5,yu=6,_u=7,dl="attached",xu="detached",wl=300,ki=301,zi=302,ws=303,Go=304,Tr=306,ri=1e3,zt=1001,hs=1002,Lt=1003,Wo=1004;var Hi=1005;var Qe=1006,Es=1007;var sn=1008;var Cn=1009,El=1010,Al=1011,As=1012,Xo=1013,ui=1014,Nt=1015,vn=1016,qo=1017,$o=1018,Vi=1020,Tl=35902,Cl=1021,Rl=1022,Kt=1023,Il=1024,Pl=1025,wi=1026,Ai=1027,Yo=1028,Zo=1029,Ll=1030,Ko=1031;var jo=1033,Cr=33776,Rr=33777,Ir=33778,Pr=33779,Jo=35840,Qo=35841,ea=35842,ta=35843,na=36196,ia=37492,sa=37496,ra=37808,oa=37809,aa=37810,la=37811,ca=37812,ha=37813,ua=37814,da=37815,fa=37816,pa=37817,ma=37818,ga=37819,ya=37820,_a=37821,Lr=36492,xa=36494,va=36495,Dl=36283,ba=36284,Sa=36285,Ma=36286,vu=2200,bu=2201,Su=2202,Ti=2300,Ci=2301,fo=2302,Si=2400,Mi=2401,Zs=2402,wa=2500,Mu=2501,Fl=0,Dr=1,Ts=2,wu=3200,Eu=3201;var Ul=0,Au=1,Zn="",dt="srgb",pt="srgb-linear",Ks="linear",et="srgb";var bi=7680;var fl=519,Tu=512,Cu=513,Ru=514,Nl=515,Iu=516,Pu=517,Lu=518,Du=519,go=35044;var Ol="300 es",bn=2e3,js=2001;var mn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}},Ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],rh=1234567,$s=Math.PI/180,Ri=180/Math.PI;function pn(){let r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ft[r&255]+Ft[r>>8&255]+Ft[r>>16&255]+Ft[r>>24&255]+"-"+Ft[e&255]+Ft[e>>8&255]+"-"+Ft[e>>16&15|64]+Ft[e>>24&255]+"-"+Ft[t&63|128]+Ft[t>>8&255]+"-"+Ft[t>>16&255]+Ft[t>>24&255]+Ft[n&255]+Ft[n>>8&255]+Ft[n>>16&255]+Ft[n>>24&255]).toLowerCase()}function Ue(r,e,t){return Math.max(e,Math.min(t,r))}function Bl(r,e){return(r%e+e)%e}function Wd(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Xd(r,e,t){return r!==e?(t-r)/(e-r):0}function Ys(r,e,t){return(1-t)*r+t*e}function qd(r,e,t,n){return Ys(r,e,1-Math.exp(-t*n))}function $d(r,e=1){return e-Math.abs(Bl(r,e*2)-e)}function Yd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Zd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Kd(r,e){return r+Math.floor(Math.random()*(e-r+1))}function jd(r,e){return r+Math.random()*(e-r)}function Jd(r){return r*(.5-Math.random())}function Qd(r){r!==void 0&&(rh=r);let e=rh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ef(r){return r*$s}function tf(r){return r*Ri}function nf(r){return(r&r-1)===0&&r!==0}function sf(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function rf(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function of(r,e,t,n,i){let s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),h=o((e+n)/2),u=s((e-n)/2),d=o((e-n)/2),f=s((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":r.set(a*h,l*u,l*d,a*c);break;case"YZY":r.set(l*d,a*h,l*u,a*c);break;case"ZXZ":r.set(l*u,l*d,a*h,a*c);break;case"XZX":r.set(a*h,l*g,l*f,a*c);break;case"YXY":r.set(l*f,a*h,l*g,a*c);break;case"ZYZ":r.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function un(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Je(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}var Fr={DEG2RAD:$s,RAD2DEG:Ri,generateUUID:pn,clamp:Ue,euclideanModulo:Bl,mapLinear:Wd,inverseLerp:Xd,lerp:Ys,damp:qd,pingpong:$d,smoothstep:Yd,smootherstep:Zd,randInt:Kd,randFloat:jd,randFloatSpread:Jd,seededRandom:Qd,degToRad:ef,radToDeg:tf,isPowerOfTwo:nf,ceilPowerOfTwo:sf,floorPowerOfTwo:rf,setQuaternionFromProperEuler:of,normalize:Je,denormalize:un},xe=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ue(this.x,e.x,t.x),this.y=Ue(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ue(this.x,e,t),this.y=Ue(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ue(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ue(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Le=class r{constructor(e,t,n,i,s,o,a,l,c){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],y=i[0],m=i[3],p=i[6],M=i[1],w=i[4],_=i[7],I=i[2],C=i[5],A=i[8];return s[0]=o*y+a*M+l*I,s[3]=o*m+a*w+l*C,s[6]=o*p+a*_+l*A,s[1]=c*y+h*M+u*I,s[4]=c*m+h*w+u*C,s[7]=c*p+h*_+u*A,s[2]=d*y+f*M+g*I,s[5]=d*m+f*w+g*C,s[8]=d*p+f*_+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*s,f=c*s-o*l,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return e[0]=u*y,e[1]=(i*c-h*n)*y,e[2]=(a*n-i*o)*y,e[3]=d*y,e[4]=(h*t-i*l)*y,e[5]=(i*s-a*t)*y,e[6]=f*y,e[7]=(n*l-c*t)*y,e[8]=(o*t-n*s)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ha.makeScale(e,t)),this}rotate(e){return this.premultiply(Ha.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ha.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ha=new Le;function kl(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function us(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Fu(){let r=us("canvas");return r.style.display="block",r}var oh={};function di(r){r in oh||(oh[r]=!0,console.warn(r))}function Uu(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function Nu(r){let e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Ou(r){let e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var ah=new Le().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lh=new Le().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function af(){let r={enabled:!0,workingColorSpace:pt,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===et&&(i.r=kn(i.r),i.g=kn(i.g),i.b=kn(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===et&&(i.r=cs(i.r),i.g=cs(i.g),i.b=cs(i.b))),i},fromWorkingColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},toWorkingColorSpace:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Zn?Ks:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[pt]:{primaries:e,whitePoint:n,transfer:Ks,toXYZ:ah,fromXYZ:lh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:dt},outputColorSpaceConfig:{drawingBufferColorSpace:dt}},[dt]:{primaries:e,whitePoint:n,transfer:et,toXYZ:ah,fromXYZ:lh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:dt}}}),r}var ke=af();function kn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function cs(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var Ki,yo=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ki===void 0&&(Ki=us("canvas")),Ki.width=e.width,Ki.height=e.height;let n=Ki.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ki}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=us("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=kn(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(kn(t[n]/255)*255):t[n]=kn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},lf=0,ds=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:lf++}),this.uuid=pn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Va(i[o].image)):s.push(Va(i[o]))}else s=Va(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function Va(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?yo.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var cf=0,bt=class r extends mn{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=zt,i=zt,s=Qe,o=sn,a=Kt,l=Cn,c=r.DEFAULT_ANISOTROPY,h=Zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cf++}),this.uuid=pn(),this.name="",this.source=new ds(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new xe(0,0),this.repeat=new xe(1,1),this.center=new xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Le,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==wl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ri:e.x=e.x-Math.floor(e.x);break;case zt:e.x=e.x<0?0:1;break;case hs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ri:e.y=e.y-Math.floor(e.y);break;case zt:e.y=e.y<0?0:1;break;case hs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};bt.DEFAULT_IMAGE=null;bt.DEFAULT_MAPPING=wl;bt.DEFAULT_ANISOTROPY=1;var $e=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],y=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+y)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(c+1)/2,_=(f+1)/2,I=(p+1)/2,C=(h+d)/4,A=(u+y)/4,R=(g+m)/4;return w>_&&w>I?w<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(w),i=C/n,s=A/n):_>I?_<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(_),n=C/i,s=R/i):I<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(I),n=A/s,i=R/s),this.set(n,i,s,t),this}let M=Math.sqrt((m-g)*(m-g)+(u-y)*(u-y)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-y)/M,this.z=(d-h)/M,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ue(this.x,e.x,t.x),this.y=Ue(this.y,e.y,t.y),this.z=Ue(this.z,e.z,t.z),this.w=Ue(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ue(this.x,e,t),this.y=Ue(this.y,e,t),this.z=Ue(this.z,e,t),this.w=Ue(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ue(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},_o=class extends mn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new $e(0,0,e,t),this.scissorTest=!1,this.viewport=new $e(0,0,e,t);let i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let s=new bt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new ds(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Sn=class extends _o{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Js=class extends bt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=zt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var xo=class extends bt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=zt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ct=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=s[o+0],f=s[o+1],g=s[o+2],y=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=y;return}if(u!==y||l!==d||c!==f||h!==g){let m=1-a,p=l*d+c*f+h*g+u*y,M=p>=0?1:-1,w=1-p*p;if(w>Number.EPSILON){let I=Math.sqrt(w),C=Math.atan2(I,p*M);m=Math.sin(m*C)/I,a=Math.sin(a*C)/I}let _=a*M;if(l=l*m+d*_,c=c*m+f*_,h=h*m+g*_,u=u*m+y*_,m===1-a){let I=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=I,c*=I,h*=I,u*=I}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[o],d=s[o+1],f=s[o+2],g=s[o+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),d=l(n/2),f=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(s-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ue(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,o=this._w,a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ch.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ch.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-s*i),u=2*(s*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-s*u,this.z=i+l*u+s*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ue(this.x,e.x,t.x),this.y=Ue(this.y,e.y,t.y),this.z=Ue(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ue(this.x,e,t),this.y=Ue(this.y,e,t),this.z=Ue(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ue(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ga.copy(this).projectOnVector(e),this.sub(Ga)}reflect(e){return this.sub(Ga.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ue(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ga=new L,ch=new Ct,Yt=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ln.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ln.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ln.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ln):ln.fromBufferAttribute(s,o),ln.applyMatrix4(e.matrixWorld),this.expandByPoint(ln);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Hr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Hr.copy(n.boundingBox)),Hr.applyMatrix4(e.matrixWorld),this.union(Hr)}let i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ln),ln.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ks),Vr.subVectors(this.max,ks),ji.subVectors(e.a,ks),Ji.subVectors(e.b,ks),Qi.subVectors(e.c,ks),jn.subVectors(Ji,ji),Jn.subVectors(Qi,Ji),yi.subVectors(ji,Qi);let t=[0,-jn.z,jn.y,0,-Jn.z,Jn.y,0,-yi.z,yi.y,jn.z,0,-jn.x,Jn.z,0,-Jn.x,yi.z,0,-yi.x,-jn.y,jn.x,0,-Jn.y,Jn.x,0,-yi.y,yi.x,0];return!Wa(t,ji,Ji,Qi,Vr)||(t=[1,0,0,0,1,0,0,0,1],!Wa(t,ji,Ji,Qi,Vr))?!1:(Gr.crossVectors(jn,Jn),t=[Gr.x,Gr.y,Gr.z],Wa(t,ji,Ji,Qi,Vr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ln).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ln).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Ln=[new L,new L,new L,new L,new L,new L,new L,new L],ln=new L,Hr=new Yt,ji=new L,Ji=new L,Qi=new L,jn=new L,Jn=new L,yi=new L,ks=new L,Vr=new L,Gr=new L,_i=new L;function Wa(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){_i.fromArray(r,s);let a=i.x*Math.abs(_i.x)+i.y*Math.abs(_i.y)+i.z*Math.abs(_i.z),l=e.dot(_i),c=t.dot(_i),h=n.dot(_i);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var hf=new Yt,zs=new L,Xa=new L,Gt=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):hf.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;zs.subVectors(e,this.center);let t=zs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(zs,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Xa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(zs.copy(e.center).add(Xa)),this.expandByPoint(zs.copy(e.center).sub(Xa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Dn=new L,qa=new L,Wr=new L,Qn=new L,$a=new L,Xr=new L,Ya=new L,Mn=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Dn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Dn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Dn.copy(this.origin).addScaledVector(this.direction,t),Dn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){qa.copy(e).add(t).multiplyScalar(.5),Wr.copy(t).sub(e).normalize(),Qn.copy(this.origin).sub(qa);let s=e.distanceTo(t)*.5,o=-this.direction.dot(Wr),a=Qn.dot(this.direction),l=-Qn.dot(Wr),c=Qn.lengthSq(),h=Math.abs(1-o*o),u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=s*h,u>=0)if(d>=-g)if(d<=g){let y=1/h;u*=y,d*=y,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(qa).addScaledVector(Wr,d),f}intersectSphere(e,t){Dn.subVectors(e.center,this.origin);let n=Dn.dot(this.direction),i=Dn.dot(Dn)-n*n,s=e.radius*e.radius;if(i>s)return null;let o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Dn)!==null}intersectTriangle(e,t,n,i,s){$a.subVectors(t,e),Xr.subVectors(n,e),Ya.crossVectors($a,Xr);let o=this.direction.dot(Ya),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Qn.subVectors(this.origin,e);let l=a*this.direction.dot(Xr.crossVectors(Qn,Xr));if(l<0)return null;let c=a*this.direction.dot($a.cross(Qn));if(c<0||l+c>o)return null;let h=-a*Qn.dot(Ya);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Pe=class r{constructor(e,t,n,i,s,o,a,l,c,h,u,d,f,g,y,m){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,h,u,d,f,g,y,m)}set(e,t,n,i,s,o,a,l,c,h,u,d,f,g,y,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/es.setFromMatrixColumn(e,0).length(),s=1/es.setFromMatrixColumn(e,1).length(),o=1/es.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=o*h,f=o*u,g=a*h,y=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-y*c,t[9]=-a*l,t[2]=y-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,g=c*h,y=c*u;t[0]=d+y*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=y+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,g=c*h,y=c*u;t[0]=d-y*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=y-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*h,f=o*u,g=a*h,y=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+y,t[1]=l*u,t[5]=y*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,f=o*c,g=a*l,y=a*c;t[0]=l*h,t[4]=y-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-y*u}else if(e.order==="XZY"){let d=o*l,f=o*c,g=a*l,y=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+y,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=y*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(uf,e,df)}lookAt(e,t,n){let i=this.elements;return qt.subVectors(e,t),qt.lengthSq()===0&&(qt.z=1),qt.normalize(),ei.crossVectors(n,qt),ei.lengthSq()===0&&(Math.abs(n.z)===1?qt.x+=1e-4:qt.z+=1e-4,qt.normalize(),ei.crossVectors(n,qt)),ei.normalize(),qr.crossVectors(qt,ei),i[0]=ei.x,i[4]=qr.x,i[8]=qt.x,i[1]=ei.y,i[5]=qr.y,i[9]=qt.y,i[2]=ei.z,i[6]=qr.z,i[10]=qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],y=n[6],m=n[10],p=n[14],M=n[3],w=n[7],_=n[11],I=n[15],C=i[0],A=i[4],R=i[8],S=i[12],v=i[1],T=i[5],G=i[9],O=i[13],k=i[2],X=i[6],H=i[10],j=i[14],N=i[3],te=i[7],ie=i[11],_e=i[15];return s[0]=o*C+a*v+l*k+c*N,s[4]=o*A+a*T+l*X+c*te,s[8]=o*R+a*G+l*H+c*ie,s[12]=o*S+a*O+l*j+c*_e,s[1]=h*C+u*v+d*k+f*N,s[5]=h*A+u*T+d*X+f*te,s[9]=h*R+u*G+d*H+f*ie,s[13]=h*S+u*O+d*j+f*_e,s[2]=g*C+y*v+m*k+p*N,s[6]=g*A+y*T+m*X+p*te,s[10]=g*R+y*G+m*H+p*ie,s[14]=g*S+y*O+m*j+p*_e,s[3]=M*C+w*v+_*k+I*N,s[7]=M*A+w*T+_*X+I*te,s[11]=M*R+w*G+_*H+I*ie,s[15]=M*S+w*O+_*j+I*_e,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],y=e[7],m=e[11],p=e[15];return g*(+s*l*u-i*c*u-s*a*d+n*c*d+i*a*f-n*l*f)+y*(+t*l*f-t*c*d+s*o*d-i*o*f+i*c*h-s*l*h)+m*(+t*c*u-t*a*f-s*o*u+n*o*f+s*a*h-n*c*h)+p*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],y=e[13],m=e[14],p=e[15],M=u*m*c-y*d*c+y*l*f-a*m*f-u*l*p+a*d*p,w=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,_=h*y*c-g*u*c+g*a*f-o*y*f-h*a*p+o*u*p,I=g*u*l-h*y*l-g*a*d+o*y*d+h*a*m-o*u*m,C=t*M+n*w+i*_+s*I;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/C;return e[0]=M*A,e[1]=(y*d*s-u*m*s-y*i*f+n*m*f+u*i*p-n*d*p)*A,e[2]=(a*m*s-y*l*s+y*i*c-n*m*c-a*i*p+n*l*p)*A,e[3]=(u*l*s-a*d*s-u*i*c+n*d*c+a*i*f-n*l*f)*A,e[4]=w*A,e[5]=(h*m*s-g*d*s+g*i*f-t*m*f-h*i*p+t*d*p)*A,e[6]=(g*l*s-o*m*s-g*i*c+t*m*c+o*i*p-t*l*p)*A,e[7]=(o*d*s-h*l*s+h*i*c-t*d*c-o*i*f+t*l*f)*A,e[8]=_*A,e[9]=(g*u*s-h*y*s-g*n*f+t*y*f+h*n*p-t*u*p)*A,e[10]=(o*y*s-g*a*s+g*n*c-t*y*c-o*n*p+t*a*p)*A,e[11]=(h*a*s-o*u*s-h*n*c+t*u*c+o*n*f-t*a*f)*A,e[12]=I*A,e[13]=(h*y*i-g*u*i+g*n*d-t*y*d-h*n*m+t*u*m)*A,e[14]=(g*a*i-o*y*i-g*n*l+t*y*l+o*n*m-t*a*m)*A,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*A,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,h=o+o,u=a+a,d=s*c,f=s*h,g=s*u,y=o*h,m=o*u,p=a*u,M=l*c,w=l*h,_=l*u,I=n.x,C=n.y,A=n.z;return i[0]=(1-(y+p))*I,i[1]=(f+_)*I,i[2]=(g-w)*I,i[3]=0,i[4]=(f-_)*C,i[5]=(1-(d+p))*C,i[6]=(m+M)*C,i[7]=0,i[8]=(g+w)*A,i[9]=(m-M)*A,i[10]=(1-(d+y))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=es.set(i[0],i[1],i[2]).length(),o=es.set(i[4],i[5],i[6]).length(),a=es.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],cn.copy(this);let c=1/s,h=1/o,u=1/a;return cn.elements[0]*=c,cn.elements[1]*=c,cn.elements[2]*=c,cn.elements[4]*=h,cn.elements[5]*=h,cn.elements[6]*=h,cn.elements[8]*=u,cn.elements[9]*=u,cn.elements[10]*=u,t.setFromRotationMatrix(cn),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=bn){let l=this.elements,c=2*s/(t-e),h=2*s/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i),f,g;if(a===bn)f=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===js)f=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=bn){let l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(o-s),d=(t+e)*c,f=(n+i)*h,g,y;if(a===bn)g=(o+s)*u,y=-2*u;else if(a===js)g=s*u,y=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=y,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},es=new L,cn=new Pe,uf=new L(0,0,0),df=new L(1,1,1),ei=new L,qr=new L,qt=new L,hh=new Pe,uh=new Ct,gn=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Ue(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ue(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ue(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ue(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ue(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ue(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return hh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(hh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return uh.setFromEuler(this),this.setFromQuaternion(uh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};gn.DEFAULT_ORDER="XYZ";var fs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},ff=0,dh=new L,ts=new Ct,Fn=new Pe,$r=new L,Hs=new L,pf=new L,mf=new Ct,fh=new L(1,0,0),ph=new L(0,1,0),mh=new L(0,0,1),gh={type:"added"},gf={type:"removed"},ns={type:"childadded",child:null},Za={type:"childremoved",child:null},at=class r extends mn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ff++}),this.uuid=pn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new L,t=new gn,n=new Ct,i=new L(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Pe},normalMatrix:{value:new Le}}),this.matrix=new Pe,this.matrixWorld=new Pe,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ts.setFromAxisAngle(e,t),this.quaternion.multiply(ts),this}rotateOnWorldAxis(e,t){return ts.setFromAxisAngle(e,t),this.quaternion.premultiply(ts),this}rotateX(e){return this.rotateOnAxis(fh,e)}rotateY(e){return this.rotateOnAxis(ph,e)}rotateZ(e){return this.rotateOnAxis(mh,e)}translateOnAxis(e,t){return dh.copy(e).applyQuaternion(this.quaternion),this.position.add(dh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(fh,e)}translateY(e){return this.translateOnAxis(ph,e)}translateZ(e){return this.translateOnAxis(mh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Fn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?$r.copy(e):$r.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Hs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fn.lookAt(Hs,$r,this.up):Fn.lookAt($r,Hs,this.up),this.quaternion.setFromRotationMatrix(Fn),i&&(Fn.extractRotation(i.matrixWorld),ts.setFromRotationMatrix(Fn),this.quaternion.premultiply(ts.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(gh),ns.child=e,this.dispatchEvent(ns),ns.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gf),Za.child=e,this.dispatchEvent(Za),Za.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Fn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Fn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Fn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(gh),ns.child=e,this.dispatchEvent(ns),ns.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hs,e,pf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hs,mf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};at.DEFAULT_UP=new L(0,1,0);at.DEFAULT_MATRIX_AUTO_UPDATE=!0;at.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var hn=new L,Un=new L,Ka=new L,Nn=new L,is=new L,ss=new L,yh=new L,ja=new L,Ja=new L,Qa=new L,el=new $e,tl=new $e,nl=new $e,ii=class r{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),hn.subVectors(e,t),i.cross(hn);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){hn.subVectors(i,t),Un.subVectors(n,t),Ka.subVectors(e,t);let o=hn.dot(hn),a=hn.dot(Un),l=hn.dot(Ka),c=Un.dot(Un),h=Un.dot(Ka),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Nn)===null?!1:Nn.x>=0&&Nn.y>=0&&Nn.x+Nn.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,Nn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Nn.x),l.addScaledVector(o,Nn.y),l.addScaledVector(a,Nn.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return el.setScalar(0),tl.setScalar(0),nl.setScalar(0),el.fromBufferAttribute(e,t),tl.fromBufferAttribute(e,n),nl.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(el,s.x),o.addScaledVector(tl,s.y),o.addScaledVector(nl,s.z),o}static isFrontFacing(e,t,n,i){return hn.subVectors(n,t),Un.subVectors(e,t),hn.cross(Un).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return hn.subVectors(this.c,this.b),Un.subVectors(this.a,this.b),hn.cross(Un).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,o,a;is.subVectors(i,n),ss.subVectors(s,n),ja.subVectors(e,n);let l=is.dot(ja),c=ss.dot(ja);if(l<=0&&c<=0)return t.copy(n);Ja.subVectors(e,i);let h=is.dot(Ja),u=ss.dot(Ja);if(h>=0&&u<=h)return t.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(is,o);Qa.subVectors(e,s);let f=is.dot(Qa),g=ss.dot(Qa);if(g>=0&&f<=g)return t.copy(s);let y=f*c-l*g;if(y<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(ss,a);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return yh.subVectors(s,i),a=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(yh,a);let p=1/(m+y+d);return o=y*p,a=d*p,t.copy(n).addScaledVector(is,o).addScaledVector(ss,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Bu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},Yr={h:0,s:0,l:0};function il(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}var he=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ke.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,ke.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=ke.workingColorSpace){if(e=Bl(e,1),t=Ue(t,0,1),n=Ue(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=il(o,s,e+1/3),this.g=il(o,s,e),this.b=il(o,s,e-1/3)}return ke.toWorkingColorSpace(this,i),this}setStyle(e,t=dt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=dt){let n=Bu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=kn(e.r),this.g=kn(e.g),this.b=kn(e.b),this}copyLinearToSRGB(e){return this.r=cs(e.r),this.g=cs(e.g),this.b=cs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=dt){return ke.fromWorkingColorSpace(Ut.copy(this),e),Math.round(Ue(Ut.r*255,0,255))*65536+Math.round(Ue(Ut.g*255,0,255))*256+Math.round(Ue(Ut.b*255,0,255))}getHexString(e=dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ke.workingColorSpace){ke.fromWorkingColorSpace(Ut.copy(this),t);let n=Ut.r,i=Ut.g,s=Ut.b,o=Math.max(n,i,s),a=Math.min(n,i,s),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=ke.workingColorSpace){return ke.fromWorkingColorSpace(Ut.copy(this),t),e.r=Ut.r,e.g=Ut.g,e.b=Ut.b,e}getStyle(e=dt){ke.fromWorkingColorSpace(Ut.copy(this),e);let t=Ut.r,n=Ut.g,i=Ut.b;return e!==dt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ti),this.setHSL(ti.h+e,ti.s+t,ti.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ti),e.getHSL(Yr);let n=Ys(ti.h,Yr.h,t),i=Ys(ti.s,Yr.s,t),s=Ys(ti.l,Yr.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ut=new he;he.NAMES=Bu;var yf=0,Ht=class extends mn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yf++}),this.uuid=pn(),this.name="",this.type="Material",this.blending=Rt,this.side=vt,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=po,this.blendDst=mo,this.blendEquation=si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new he(0,0,0),this.blendAlpha=0,this.depthFunc=Ei,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bi,this.stencilZFail=bi,this.stencilZPass=bi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Rt&&(n.blending=this.blending),this.side!==vt&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==po&&(n.blendSrc=this.blendSrc),this.blendDst!==mo&&(n.blendDst=this.blendDst),this.blendEquation!==si&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ei&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==bi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==bi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==bi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(t){let s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},yn=class extends Ht{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new he(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.combine=Ml,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Bn=_f();function _f(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}let s=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:o,offsetTable:a}}function xf(r){Math.abs(r)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),r=Ue(r,-65504,65504),Bn.floatView[0]=r;let e=Bn.uint32View[0],t=e>>23&511;return Bn.baseTable[t]+((e&8388607)>>Bn.shiftTable[t])}function vf(r){let e=r>>10;return Bn.uint32View[0]=Bn.mantissaTable[Bn.offsetTable[e]+(r&1023)]+Bn.exponentTable[e],Bn.floatView[0]}var oi=class{static toHalfFloat(e){return xf(e)}static fromHalfFloat(e){return vf(e)}},gt=new L,Zr=new xe,bf=0,ct=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:bf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=go,this.updateRanges=[],this.gpuType=Nt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Zr.fromBufferAttribute(this,t),Zr.applyMatrix3(e),this.setXY(t,Zr.x,Zr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix3(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix4(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyNormalMatrix(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.transformDirection(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=un(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Je(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=un(t,this.array)),t}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=un(t,this.array)),t}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=un(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=un(t,this.array)),t}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array),s=Je(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==go&&(e.usage=this.usage),e}};var Qs=class extends ct{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var er=class extends ct{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var _t=class extends ct{constructor(e,t,n){super(new Float32Array(e),t,n)}},Sf=0,en=new Pe,sl=new at,rs=new L,$t=new Yt,Vs=new Yt,Tt=new L,St=class r extends mn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=pn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(kl(e)?er:Qs)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Le().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return en.makeRotationFromQuaternion(e),this.applyMatrix4(en),this}rotateX(e){return en.makeRotationX(e),this.applyMatrix4(en),this}rotateY(e){return en.makeRotationY(e),this.applyMatrix4(en),this}rotateZ(e){return en.makeRotationZ(e),this.applyMatrix4(en),this}translate(e,t,n){return en.makeTranslation(e,t,n),this.applyMatrix4(en),this}scale(e,t,n){return en.makeScale(e,t,n),this.applyMatrix4(en),this}lookAt(e){return sl.lookAt(e),sl.updateMatrix(),this.applyMatrix4(sl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(rs).negate(),this.translate(rs.x,rs.y,rs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new _t(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];$t.setFromBufferAttribute(s),this.morphTargetsRelative?(Tt.addVectors(this.boundingBox.min,$t.min),this.boundingBox.expandByPoint(Tt),Tt.addVectors(this.boundingBox.max,$t.max),this.boundingBox.expandByPoint(Tt)):(this.boundingBox.expandByPoint($t.min),this.boundingBox.expandByPoint($t.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){let n=this.boundingSphere.center;if($t.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];Vs.setFromBufferAttribute(a),this.morphTargetsRelative?(Tt.addVectors($t.min,Vs.min),$t.expandByPoint(Tt),Tt.addVectors($t.max,Vs.max),$t.expandByPoint(Tt)):($t.expandByPoint(Vs.min),$t.expandByPoint(Vs.max))}$t.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Tt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Tt));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Tt.fromBufferAttribute(a,c),l&&(rs.fromBufferAttribute(e,c),Tt.add(rs)),i=Math.max(i,n.distanceToSquared(Tt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ct(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new L,l[R]=new L;let c=new L,h=new L,u=new L,d=new xe,f=new xe,g=new xe,y=new L,m=new L;function p(R,S,v){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,v),d.fromBufferAttribute(s,R),f.fromBufferAttribute(s,S),g.fromBufferAttribute(s,v),h.sub(c),u.sub(c),f.sub(d),g.sub(d);let T=1/(f.x*g.y-g.x*f.y);isFinite(T)&&(y.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(T),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(T),a[R].add(y),a[S].add(y),a[v].add(y),l[R].add(m),l[S].add(m),l[v].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let R=0,S=M.length;R<S;++R){let v=M[R],T=v.start,G=v.count;for(let O=T,k=T+G;O<k;O+=3)p(e.getX(O+0),e.getX(O+1),e.getX(O+2))}let w=new L,_=new L,I=new L,C=new L;function A(R){I.fromBufferAttribute(i,R),C.copy(I);let S=a[R];w.copy(S),w.sub(I.multiplyScalar(I.dot(S))).normalize(),_.crossVectors(C,S);let T=_.dot(l[R])<0?-1:1;o.setXYZW(R,w.x,w.y,w.z,T)}for(let R=0,S=M.length;R<S;++R){let v=M[R],T=v.start,G=v.count;for(let O=T,k=T+G;O<k;O+=3)A(e.getX(O+0)),A(e.getX(O+1)),A(e.getX(O+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ct(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new L,s=new L,o=new L,a=new L,l=new L,c=new L,h=new L,u=new L;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),y=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,y),o.fromBufferAttribute(t,m),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Tt.fromBufferAttribute(e,t),Tt.normalize(),e.setXYZ(t,Tt.x,Tt.y,Tt.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,g=0;for(let y=0,m=l.length;y<m;y++){a.isInterleavedBufferAttribute?f=l[y]*a.data.stride+a.offset:f=l[y]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new ct(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=e(l,n);t.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},_h=new Pe,xi=new Mn,Kr=new Gt,xh=new L,jr=new L,Jr=new L,Qr=new L,rl=new L,eo=new L,vh=new L,to=new L,Mt=class extends at{constructor(e=new St,t=new yn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(s&&a){eo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=a[l],u=s[l];h!==0&&(rl.fromBufferAttribute(u,e),o?eo.addScaledVector(rl,h):eo.addScaledVector(rl.sub(t),h))}t.add(eo)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Kr.copy(n.boundingSphere),Kr.applyMatrix4(s),xi.copy(e.ray).recast(e.near),!(Kr.containsPoint(xi.origin)===!1&&(xi.intersectSphere(Kr,xh)===null||xi.origin.distanceToSquared(xh)>(e.far-e.near)**2))&&(_h.copy(s).invert(),xi.copy(e.ray).applyMatrix4(_h),!(n.boundingBox!==null&&xi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,xi)))}_computeIntersections(e,t,n){let i,s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=d.length;g<y;g++){let m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),w=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=M,I=w;_<I;_+=3){let C=a.getX(_),A=a.getX(_+1),R=a.getX(_+2);i=no(this,p,e,n,c,h,u,C,A,R),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,f.start),y=Math.min(a.count,f.start+f.count);for(let m=g,p=y;m<p;m+=3){let M=a.getX(m),w=a.getX(m+1),_=a.getX(m+2);i=no(this,o,e,n,c,h,u,M,w,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,y=d.length;g<y;g++){let m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),w=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let _=M,I=w;_<I;_+=3){let C=_,A=_+1,R=_+2;i=no(this,p,e,n,c,h,u,C,A,R),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let m=g,p=y;m<p;m+=3){let M=m,w=m+1,_=m+2;i=no(this,o,e,n,c,h,u,M,w,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};function Mf(r,e,t,n,i,s,o,a){let l;if(e.side===It?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===vt,a),l===null)return null;to.copy(a),to.applyMatrix4(r.matrixWorld);let c=t.ray.origin.distanceTo(to);return c<t.near||c>t.far?null:{distance:c,point:to.clone(),object:r}}function no(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,jr),r.getVertexPosition(l,Jr),r.getVertexPosition(c,Qr);let h=Mf(r,e,t,n,jr,Jr,Qr,vh);if(h){let u=new L;ii.getBarycoord(vh,jr,Jr,Qr,u),i&&(h.uv=ii.getInterpolatedAttribute(i,a,l,c,u,new xe)),s&&(h.uv1=ii.getInterpolatedAttribute(s,a,l,c,u,new xe)),o&&(h.normal=ii.getInterpolatedAttribute(o,a,l,c,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new L,materialIndex:0};ii.getNormal(jr,Jr,Qr,d.normal),h.face=d,h.barycoord=u}return h}var ps=class r extends St{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};let a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new _t(c,3)),this.setAttribute("normal",new _t(h,3)),this.setAttribute("uv",new _t(u,2));function g(y,m,p,M,w,_,I,C,A,R,S){let v=_/A,T=I/R,G=_/2,O=I/2,k=C/2,X=A+1,H=R+1,j=0,N=0,te=new L;for(let ie=0;ie<H;ie++){let _e=ie*T-O;for(let Ee=0;Ee<X;Ee++){let Oe=Ee*v-G;te[y]=Oe*M,te[m]=_e*w,te[p]=k,c.push(te.x,te.y,te.z),te[y]=0,te[m]=0,te[p]=C>0?1:-1,h.push(te.x,te.y,te.z),u.push(Ee/A),u.push(1-ie/R),j+=1}}for(let ie=0;ie<R;ie++)for(let _e=0;_e<A;_e++){let Ee=d+_e+X*ie,Oe=d+_e+X*(ie+1),q=d+(_e+1)+X*(ie+1),ee=d+(_e+1)+X*ie;l.push(Ee,Oe,ee),l.push(Oe,q,ee),N+=6}a.addGroup(f,N,S),f+=N,d+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Gi(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Ot(r){let e={};for(let t=0;t<r.length;t++){let n=Gi(r[t]);for(let i in n)e[i]=n[i]}return e}function wf(r){let e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function zl(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ke.workingColorSpace}var ku={clone:Gi,merge:Ot},Ef=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Af=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,_n=class extends Ht{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ef,this.fragmentShader=Af,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Gi(e.uniforms),this.uniformsGroups=wf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},tr=class extends at{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pe,this.projectionMatrix=new Pe,this.projectionMatrixInverse=new Pe,this.coordinateSystem=bn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ni=new L,bh=new xe,Sh=new xe,yt=class extends tr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ri*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan($s*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ri*2*Math.atan(Math.tan($s*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ni.x,ni.y).multiplyScalar(-e/ni.z),ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ni.x,ni.y).multiplyScalar(-e/ni.z)}getViewSize(e,t){return this.getViewBounds(e,bh,Sh),t.subVectors(Sh,bh)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan($s*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},os=-90,as=1,vo=class extends at{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new yt(os,as,e,t);i.layers=this.layers,this.add(i);let s=new yt(os,as,e,t);s.layers=this.layers,this.add(s);let o=new yt(os,as,e,t);o.layers=this.layers,this.add(o);let a=new yt(os,as,e,t);a.layers=this.layers,this.add(a);let l=new yt(os,as,e,t);l.layers=this.layers,this.add(l);let c=new yt(os,as,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(let c of t)this.remove(c);if(e===bn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===js)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},nr=class extends bt{constructor(e,t,n,i,s,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:ki,super(e,t,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},bo=class extends Sn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new nr(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Qe}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ps(5,5,5),s=new _n({name:"CubemapFromEquirect",uniforms:Gi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:It,blending:$n});s.uniforms.tEquirect.value=t;let o=new Mt(i,s),a=t.minFilter;return t.minFilter===sn&&(t.minFilter=Qe),new vo(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}},dn=class extends at{constructor(){super(),this.isGroup=!0,this.type="Group"}},Tf={type:"move"},ms=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new dn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new dn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new dn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let y of e.hand.values()){let m=t.getJointPose(y,n),p=this._getHandJoint(c,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Tf)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new dn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var ir=class extends at{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gn,this.environmentIntensity=1,this.environmentRotation=new gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},gs=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=go,this.updateRanges=[],this.version=0,this.uuid=pn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=pn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=pn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},kt=new L,ys=class r{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=un(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Je(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=un(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=un(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=un(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=un(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array),s=Je(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new ct(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new r(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var Mh=new L,wh=new $e,Eh=new $e,Cf=new L,Ah=new Pe,io=new L,ol=new Gt,Th=new Pe,al=new Mn,sr=class extends Mt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=dl,this.bindMatrix=new Pe,this.bindMatrixInverse=new Pe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Yt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,io),this.boundingBox.expandByPoint(io)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Gt),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,io),this.boundingSphere.expandByPoint(io)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ol.copy(this.boundingSphere),ol.applyMatrix4(i),e.ray.intersectsSphere(ol)!==!1&&(Th.copy(i).invert(),al.copy(e.ray).applyMatrix4(Th),!(this.boundingBox!==null&&al.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,al)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new $e,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===dl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===xu?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;wh.fromBufferAttribute(i.attributes.skinIndex,e),Eh.fromBufferAttribute(i.attributes.skinWeight,e),Mh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let o=Eh.getComponent(s);if(o!==0){let a=wh.getComponent(s);Ah.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Cf.copy(Mh).applyMatrix4(Ah),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},_s=class extends at{constructor(){super(),this.isBone=!0,this.type="Bone"}},xs=class extends bt{constructor(e=null,t=1,n=1,i,s,o,a,l,c=Lt,h=Lt,u,d){super(null,o,a,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ch=new Pe,Rf=new Pe,rr=class r{constructor(e=[],t=[]){this.uuid=pn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Pe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Pe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){let a=e[s]?e[s].matrixWorld:Rf;Ch.multiplyMatrices(a,t[s]),Ch.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new r(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new xs(t,e,e,Kt,Nt);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new _s),this.bones.push(o),this.boneInverses.push(new Pe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let o=t[i];e.bones.push(o.uuid);let a=n[i];e.boneInverses.push(a.toArray())}return e}},ai=class extends ct{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ls=new Pe,Rh=new Pe,so=[],Ih=new Yt,If=new Pe,Gs=new Mt,Ws=new Gt,or=class extends Mt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ai(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,If)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Yt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ls),Ih.copy(e.boundingBox).applyMatrix4(ls),this.boundingBox.union(Ih)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Gt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ls),Ws.copy(e.boundingSphere).applyMatrix4(ls),this.boundingSphere.union(Ws)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Gs.geometry=this.geometry,Gs.material=this.material,Gs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ws.copy(this.boundingSphere),Ws.applyMatrix4(n),e.ray.intersectsSphere(Ws)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,ls),Rh.multiplyMatrices(n,ls),Gs.matrixWorld=Rh,Gs.raycast(e,so);for(let o=0,a=so.length;o<a;o++){let l=so[o];l.instanceId=s,l.object=this,t.push(l)}so.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ai(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new xs(new Float32Array(i*this.count),i,this.count,Yo,Nt));let s=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ll=new L,Pf=new L,Lf=new Le,tn=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=ll.subVectors(n,t).cross(Pf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(ll),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Lf.getNormalMatrix(e),i=this.coplanarPoint(ll).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},vi=new Gt,ro=new L,vs=class{constructor(e=new tn,t=new tn,n=new tn,i=new tn,s=new tn,o=new tn){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=bn){let n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],y=i[10],m=i[11],p=i[12],M=i[13],w=i[14],_=i[15];if(n[0].setComponents(l-s,d-c,m-f,_-p).normalize(),n[1].setComponents(l+s,d+c,m+f,_+p).normalize(),n[2].setComponents(l+o,d+h,m+g,_+M).normalize(),n[3].setComponents(l-o,d-h,m-g,_-M).normalize(),n[4].setComponents(l-a,d-u,m-y,_-w).normalize(),t===bn)n[5].setComponents(l+a,d+u,m+y,_+w).normalize();else if(t===js)n[5].setComponents(a,u,y,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),vi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),vi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(vi)}intersectsSprite(e){return vi.center.set(0,0,0),vi.radius=.7071067811865476,vi.applyMatrix4(e.matrixWorld),this.intersectsSphere(vi)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(ro.x=i.normal.x>0?e.max.x:e.min.x,ro.y=i.normal.y>0?e.max.y:e.min.y,ro.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(ro)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var li=class extends Ht{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new he(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},So=new L,Mo=new L,Ph=new Pe,Xs=new Mn,oo=new Gt,cl=new L,Lh=new L,zn=class extends at{constructor(e=new St,t=new li){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)So.fromBufferAttribute(t,i-1),Mo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=So.distanceTo(Mo);e.setAttribute("lineDistance",new _t(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),oo.copy(n.boundingSphere),oo.applyMatrix4(i),oo.radius+=s,e.ray.intersectsSphere(oo)===!1)return;Ph.copy(i).invert(),Xs.copy(e.ray).applyMatrix4(Ph);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let y=f,m=g-1;y<m;y+=c){let p=h.getX(y),M=h.getX(y+1),w=ao(this,e,Xs,l,p,M,y);w&&t.push(w)}if(this.isLineLoop){let y=h.getX(g-1),m=h.getX(f),p=ao(this,e,Xs,l,y,m,g-1);p&&t.push(p)}}else{let f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let y=f,m=g-1;y<m;y+=c){let p=ao(this,e,Xs,l,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){let y=ao(this,e,Xs,l,g-1,f,g-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function ao(r,e,t,n,i,s,o){let a=r.geometry.attributes.position;if(So.fromBufferAttribute(a,i),Mo.fromBufferAttribute(a,s),t.distanceSqToSegment(So,Mo,cl,Lh)>n)return;cl.applyMatrix4(r.matrixWorld);let c=e.ray.origin.distanceTo(cl);if(!(c<e.near||c>e.far))return{distance:c,point:Lh.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}var Dh=new L,Fh=new L,bs=class extends zn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Dh.fromBufferAttribute(t,i),Fh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Dh.distanceTo(Fh);e.setAttribute("lineDistance",new _t(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ar=class extends zn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},ci=class extends Ht{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new he(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Uh=new Pe,pl=new Mn,lo=new Gt,co=new L,Ii=class extends at{constructor(e=new St,t=new ci){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),lo.copy(n.boundingSphere),lo.applyMatrix4(i),lo.radius+=s,e.ray.intersectsSphere(lo)===!1)return;Uh.copy(i).invert(),pl.copy(e.ray).applyMatrix4(Uh);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,y=f;g<y;g++){let m=c.getX(g);co.fromBufferAttribute(u,m),Nh(co,m,l,i,e,t,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,y=f;g<y;g++)co.fromBufferAttribute(u,g),Nh(co,g,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function Nh(r,e,t,n,i,s,o){let a=pl.distanceSqToPoint(r);if(a<t){let l=new L;pl.closestPointToPoint(r,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Hn=class extends bt{constructor(e,t,n,i,s,o,a,l,c){super(e,t,n,i,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},lr=class extends bt{constructor(e,t,n,i,s,o,a,l,c,h=wi){if(h!==wi&&h!==Ai)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===wi&&(n=ui),n===void 0&&h===Ai&&(n=Vi),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Lt,this.minFilter=l!==void 0?l:Lt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ds(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}};var cr=class r extends St{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],o=[],a=[],l=[],c=new L,h=new xe;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new _t(o,3)),this.setAttribute("normal",new _t(a,3)),this.setAttribute("uv",new _t(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}};var Pi=class r extends St{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],y=[],m=[];for(let p=0;p<h;p++){let M=p*d-o;for(let w=0;w<c;w++){let _=w*u-s;g.push(_,-M,0),y.push(0,0,1),m.push(w/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<a;M++){let w=M+c*p,_=M+c*(p+1),I=M+1+c*(p+1),C=M+1+c*p;f.push(w,_,C),f.push(_,I,C)}this.setIndex(f),this.setAttribute("position",new _t(g,3)),this.setAttribute("normal",new _t(y,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}};var hr=class extends Ht{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new he(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};var Vn=class extends Ht{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new he(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new he(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ul,this.normalScale=new xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},xt=class extends Vn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new xe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ue(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new he(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new he(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new he(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var wo=class extends Ht{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=wu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Eo=class extends Ht{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ho(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Df(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Ff(r){function e(i,s){return r[i]-r[s]}let t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Oh(r,e,t){let n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){let a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function zu(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}var Gn=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=s)){let a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ao=class extends Gn{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Si,endingEnd:Si}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Mi:s=e,a=2*t-n;break;case Zs:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Mi:o=e,l=2*n-t;break;case Zs:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),y=g*g,m=y*g,p=-d*m+2*d*y-d*g,M=(1+d)*m+(-1.5-2*d)*y+(-.5+d)*g+1,w=(-1-f)*m+(1.5+f)*y+.5*g,_=f*m-f*y;for(let I=0;I!==a;++I)s[I]=p*o[h+I]+M*o[c+I]+w*o[l+I]+_*o[u+I];return s}},ur=class extends Gn{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)s[d]=o[c+d]*u+o[l+d]*h;return s}},To=class extends Gn{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Zt=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ho(t,this.TimeBufferType),this.values=ho(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ho(e.times,Array),values:ho(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new To(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ur(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ao(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ti:t=this.InterpolantFactoryMethodDiscrete;break;case Ci:t=this.InterpolantFactoryMethodLinear;break;case fo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ti;case this.InterpolantFactoryMethodLinear:return Ci;case this.InterpolantFactoryMethodSmooth:return fo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&Df(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===fo,s=e.length-1,o=1;for(let a=1;a<s;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{let u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let y=t[u+g];if(y!==t[d+g]||y!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};Zt.prototype.TimeBufferType=Float32Array;Zt.prototype.ValueBufferType=Float32Array;Zt.prototype.DefaultInterpolation=Ci;var Wn=class extends Zt{constructor(e,t,n){super(e,t,n)}};Wn.prototype.ValueTypeName="bool";Wn.prototype.ValueBufferType=Array;Wn.prototype.DefaultInterpolation=Ti;Wn.prototype.InterpolantFactoryMethodLinear=void 0;Wn.prototype.InterpolantFactoryMethodSmooth=void 0;var dr=class extends Zt{};dr.prototype.ValueTypeName="color";var wn=class extends Zt{};wn.prototype.ValueTypeName="number";var Co=class extends Gn{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t),c=e*a;for(let h=c+a;c!==h;c+=4)Ct.slerpFlat(s,0,o,c-a,o,c,l);return s}},En=class extends Zt{InterpolantFactoryMethodLinear(e){return new Co(this.times,this.values,this.getValueSize(),e)}};En.prototype.ValueTypeName="quaternion";En.prototype.InterpolantFactoryMethodSmooth=void 0;var Xn=class extends Zt{constructor(e,t,n){super(e,t,n)}};Xn.prototype.ValueTypeName="string";Xn.prototype.ValueBufferType=Array;Xn.prototype.DefaultInterpolation=Ti;Xn.prototype.InterpolantFactoryMethodLinear=void 0;Xn.prototype.InterpolantFactoryMethodSmooth=void 0;var An=class extends Zt{};An.prototype.ValueTypeName="vector";var Li=class{constructor(e="",t=-1,n=[],i=wa){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=pn(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Nf(n[o]).scale(i));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(Zt.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);let h=Ff(l);l=Oh(l,1,h),c=Oh(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new wn(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){let c=e[a],h=c.name.match(s);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(c)}}let o=[];for(let a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,d,f,g,y){if(f.length!==0){let m=[],p=[];zu(f,m,p,g),m.length!==0&&y.push(new u(d,m,p))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let u=0;u<c.length;u++){let d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let y=0;y<d[g].morphTargets.length;y++)f[d[g].morphTargets[y]]=-1;for(let y in f){let m=[],p=[];for(let M=0;M!==d[g].morphTargets.length;++M){let w=d[g];m.push(w.time),p.push(w.morphTarget===y?1:0)}i.push(new wn(".morphTargetInfluence["+y+"]",m,p))}l=f.length*o}else{let f=".bones["+t[u].name+"]";n(An,f+".position",d,"pos",i),n(En,f+".quaternion",d,"rot",i),n(An,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function Uf(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return wn;case"vector":case"vector2":case"vector3":case"vector4":return An;case"color":return dr;case"quaternion":return En;case"bool":case"boolean":return Wn;case"string":return Xn}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Nf(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Uf(r.type);if(r.times===void 0){let t=[],n=[];zu(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}var fn={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}},Ro=class{constructor(e,t,n){let i=this,s=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},Hu=new Ro,xn=class{constructor(e){this.manager=e!==void 0?e:Hu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};xn.DEFAULT_MATERIAL_NAME="__DEFAULT";var On={},ml=class extends Error{constructor(e,t){super(e),this.response=t}},Di=class extends xn{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=fn.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(On[e]!==void 0){On[e].push({onLoad:t,onProgress:n,onError:i});return}On[e]=[],On[e].push({onLoad:t,onProgress:n,onError:i});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=On[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0,y=0,m=new ReadableStream({start(p){M();function M(){u.read().then(({done:w,value:_})=>{if(w)p.close();else{y+=_.byteLength;let I=new ProgressEvent("progress",{lengthComputable:g,loaded:y,total:f});for(let C=0,A=h.length;C<A;C++){let R=h[C];R.onProgress&&R.onProgress(I)}p.enqueue(_),M()}},w=>{p.error(w)})}}});return new Response(m)}else throw new ml(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{fn.add(e,c);let h=On[e];delete On[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=On[e];if(h===void 0)throw this.manager.itemError(e),c;delete On[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var Io=class extends xn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,o=fn.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;let a=us("img");function l(){h(),fn.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}};var fr=class extends xn{constructor(e){super(e)}load(e,t,n,i){let s=this,o=new xs,a=new Di(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(s.withCredentials),a.load(e,function(l){let c;try{c=s.parse(l)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}c.image!==void 0?o.image=c.image:c.data!==void 0&&(o.image.width=c.width,o.image.height=c.height,o.image.data=c.data),o.wrapS=c.wrapS!==void 0?c.wrapS:zt,o.wrapT=c.wrapT!==void 0?c.wrapT:zt,o.magFilter=c.magFilter!==void 0?c.magFilter:Qe,o.minFilter=c.minFilter!==void 0?c.minFilter:Qe,o.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(o.colorSpace=c.colorSpace),c.flipY!==void 0&&(o.flipY=c.flipY),c.format!==void 0&&(o.format=c.format),c.type!==void 0&&(o.type=c.type),c.mipmaps!==void 0&&(o.mipmaps=c.mipmaps,o.minFilter=sn),c.mipmapCount===1&&(o.minFilter=Qe),c.generateMipmaps!==void 0&&(o.generateMipmaps=c.generateMipmaps),o.needsUpdate=!0,t&&t(o,c)},n,i),o}},Fi=class extends xn{constructor(e){super(e)}load(e,t,n,i){let s=new bt,o=new Io(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}},Ui=class extends at{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new he(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}};var hl=new Pe,Bh=new L,kh=new L,pr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xe(512,512),this.map=null,this.mapPass=null,this.matrix=new Pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vs,this._frameExtents=new xe(1,1),this._viewportCount=1,this._viewports=[new $e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Bh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bh),kh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(kh),t.updateMatrixWorld(),hl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(hl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(hl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},gl=class extends pr{constructor(){super(new yt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=Ri*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},mr=class extends Ui{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.target=new at,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new gl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},zh=new Pe,qs=new L,ul=new L,yl=class extends pr{constructor(){super(new yt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new xe(4,2),this._viewportCount=6,this._viewports=[new $e(2,1,1,1),new $e(0,1,1,1),new $e(3,1,1,1),new $e(1,1,1,1),new $e(3,0,1,1),new $e(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),qs.setFromMatrixPosition(e.matrixWorld),n.position.copy(qs),ul.copy(n.position),ul.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ul),n.updateMatrixWorld(),i.makeTranslation(-qs.x,-qs.y,-qs.z),zh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zh)}},gr=class extends Ui{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new yl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Ni=class extends tr{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},_l=class extends pr{constructor(){super(new Ni(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Oi=class extends Ui{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.target=new at,this.shadow=new _l}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},yr=class extends Ui{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var qn=class{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var _r=class extends xn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,o=fn.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return fn.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),fn.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});fn.add(e,l),s.manager.itemStart(e)}};var Po=class extends yt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}},xr=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Hh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=Hh();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function Hh(){return performance.now()}var Lo=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,o;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,i=this.valueSize,s=e*i+i,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[s+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){let l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,o=i;s!==o;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){Ct.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){let o=this._workIndex*s;Ct.multiplyQuaternionsFlat(e,o,e,t,e,n),Ct.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,s){let o=1-i;for(let a=0;a!==s;++a){let l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,s){for(let o=0;o!==s;++o){let a=t+o;e[a]=e[a]+e[n+o]*i}}},Hl="\\[\\]\\.:\\/",Of=new RegExp("["+Hl+"]","g"),Vl="[^"+Hl+"]",Bf="[^"+Hl.replace("\\.","")+"]",kf=/((?:WC+[\/:])*)/.source.replace("WC",Vl),zf=/(WCOD+)?/.source.replace("WCOD",Bf),Hf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Vl),Vf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Vl),Gf=new RegExp("^"+kf+zf+Hf+Vf+"$"),Wf=["material","materials","bones","map"],xl=class{constructor(e,t,n){let i=n||tt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},tt=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Of,"")}static parseTrackName(e){let t=Gf.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);Wf.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[i];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};tt.Composite=xl;tt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};tt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};tt.prototype.GetterByBindingType=[tt.prototype._getValue_direct,tt.prototype._getValue_array,tt.prototype._getValue_arrayElement,tt.prototype._getValue_toArray];tt.prototype.SetterByBindingTypeAndVersioning=[[tt.prototype._setValue_direct,tt.prototype._setValue_direct_setNeedsUpdate,tt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_array,tt.prototype._setValue_array_setNeedsUpdate,tt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_arrayElement,tt.prototype._setValue_arrayElement_setNeedsUpdate,tt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_fromArray,tt.prototype._setValue_fromArray_setNeedsUpdate,tt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Do=class{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;let s=t.tracks,o=s.length,a=new Array(o),l={endingStart:Si,endingEnd:Si};for(let c=0;c!==o;++c){let h=s[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=bu,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){let i=this._clip.duration,s=e._clip.duration,o=s/i,a=i/s;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let i=this._mixer,s=i.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);let l=a.parameterPositions,c=a.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}let s=this._startTime;if(s!==null){let l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Mu:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case wa:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,i=this.time+e,s=this._loopCount,o=n===Su;if(e===0)return s===-1?i:o&&(s&1)===1?t-i:i;if(n===vu){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){let a=Math.floor(i/t);i-=t*a,s+=Math.abs(a);let l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){let i=this._interpolantSettings;n?(i.endingStart=Mi,i.endingEnd=Mi):(e?i.endingStart=this.zeroSlopeAtStart?Mi:Si:i.endingStart=Zs,t?i.endingEnd=this.zeroSlopeAtEnd?Mi:Si:i.endingEnd=Zs)}_scheduleFading(e,t,n){let i=this._mixer,s=i.time,o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,l=o.sampleValues;return a[0]=s,l[0]=t,a[1]=s+e,l[1]=n,this}},Xf=new Float32Array(1),vr=class extends mn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){let d=i[u],f=d.name,g=h[f];if(g!==void 0)++g.referenceCount,o[u]=g;else{if(g=o[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}let y=t&&t._propertyBindings[u].binding.parsedPath;g=new Lo(tt.create(n,f,y),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),o[u]=g}a[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let i=this._actions,s=this._actionsByClip,o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;let s=e._clip.uuid,o=this._actionsByClip,a=o[s],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;let u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){let i=this._bindingsByRootAndName,s=this._bindings,o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[s],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new ur(new Float32Array(2),new Float32Array(2),1,Xf),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){let i=t||this._root,s=i.uuid,o=typeof e=="string"?Li.findByName(i,e):e,a=o!==null?o.uuid:e,l=this._actionsByClip[a],c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=wa),l!==void 0){let u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;let h=new Do(this,o,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,s),h}existingAction(e,t){let n=t||this._root,i=n.uuid,s=typeof e=="string"?Li.findByName(n,e):e,o=s?s.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,o);let a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){let o=s.knownActions;for(let a=0,l=o.length;a!==l;++a){let c=o[a];this._deactivateAction(c);let h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(let o in s){let a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var Vh=new Pe,Bi=class{constructor(e,t,n=0,i=1/0){this.ray=new Mn(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new fs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Vh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Vh),this}intersectObject(e,t=!0,n=[]){return vl(e,this,n,t),n.sort(Gh),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)vl(e[i],this,n,t);return n.sort(Gh),n}};function Gh(r,e){return r.distance-e.distance}function vl(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let s=r.children;for(let o=0,a=s.length;o<a;o++)vl(s[o],e,t,!0)}}var Ss=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ue(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ue(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Wh=new L,uo=new L,Xh=new L,br=class extends at{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new St;i.setAttribute("position",new _t([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));let s=new li({fog:!1,toneMapped:!1});this.lightPlane=new zn(i,s),this.add(this.lightPlane),i=new St,i.setAttribute("position",new _t([0,0,0,0,0,1],3)),this.targetLine=new zn(i,s),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Wh.setFromMatrixPosition(this.light.matrixWorld),uo.setFromMatrixPosition(this.light.target.matrixWorld),Xh.subVectors(uo,Wh),this.lightPlane.lookAt(uo),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(uo),this.targetLine.scale.z=Xh.length()}};var Sr=class extends bs{constructor(e=1){let t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new St;i.setAttribute("position",new _t(t,3)),i.setAttribute("color",new _t(n,3));let s=new li({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(e,t,n){let i=new he,s=this.geometry.attributes.color.array;return i.set(e),i.toArray(s,0),i.toArray(s,3),i.set(t),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}};var Mr=class extends mn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}};function Gl(r,e,t,n){let i=qf(n);switch(t){case Cl:return r*e;case Il:return r*e;case Pl:return r*e*2;case Yo:return r*e/i.components*i.byteLength;case Zo:return r*e/i.components*i.byteLength;case Ll:return r*e*2/i.components*i.byteLength;case Ko:return r*e*2/i.components*i.byteLength;case Rl:return r*e*3/i.components*i.byteLength;case Kt:return r*e*4/i.components*i.byteLength;case jo:return r*e*4/i.components*i.byteLength;case Cr:case Rr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Ir:case Pr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Qo:case ta:return Math.max(r,16)*Math.max(e,8)/4;case Jo:case ea:return Math.max(r,8)*Math.max(e,8)/2;case na:case ia:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case sa:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case ra:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case oa:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case aa:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case la:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case ca:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case ha:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case ua:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case da:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case fa:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case pa:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case ma:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case ga:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case ya:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case _a:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Lr:case xa:case va:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Dl:case ba:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Sa:case Ma:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function qf(r){switch(r){case Cn:case El:return{byteLength:1,components:1};case As:case Al:case vn:return{byteLength:2,components:1};case qo:case $o:return{byteLength:2,components:4};case ui:case Xo:case Nt:return{byteLength:4,components:1};case Tl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"174"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="174");function ud(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Yf(r){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(r.bindBuffer(c,a),u.length===0)r.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],y=u[f];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++d,u[d]=y)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let y=u[f];r.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var Zf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Kf=`#ifdef USE_ALPHAHASH
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
#endif`,jf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ep=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tp=`#ifdef USE_AOMAP
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
#endif`,np=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ip=`#ifdef USE_BATCHING
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
#endif`,sp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,op=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ap=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,lp=`#ifdef USE_IRIDESCENCE
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
#endif`,cp=`#ifdef USE_BUMPMAP
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
#endif`,hp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,up=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,mp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,gp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,yp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,_p=`#define PI 3.141592653589793
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
} // validated`,xp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,vp=`vec3 transformedNormal = objectNormal;
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
#endif`,bp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Mp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ep="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ap=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Tp=`#ifdef USE_ENVMAP
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
#endif`,Cp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Rp=`#ifdef USE_ENVMAP
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
#endif`,Ip=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Pp=`#ifdef USE_ENVMAP
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
#endif`,Lp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Dp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Fp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Up=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Np=`#ifdef USE_GRADIENTMAP
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
}`,Op=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zp=`uniform bool receiveShadow;
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
#endif`,Hp=`#ifdef USE_ENVMAP
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
#endif`,Vp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Gp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qp=`PhysicalMaterial material;
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
#endif`,$p=`struct PhysicalMaterial {
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
}`,Yp=`
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
#endif`,Zp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Kp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,jp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,em=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,im=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,sm=`#if defined( USE_POINTS_UV )
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
#endif`,rm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,om=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,am=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hm=`#ifdef USE_MORPHTARGETS
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
#endif`,um=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,fm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,pm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ym=`#ifdef USE_NORMALMAP
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
#endif`,_m=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,bm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Sm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Mm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,wm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Em=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Am=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Cm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Rm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Im=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Pm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Lm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Dm=`float getShadowMask() {
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
}`,Fm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Um=`#ifdef USE_SKINNING
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
#endif`,Nm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Om=`#ifdef USE_SKINNING
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
#endif`,Bm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,km=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vm=`#ifdef USE_TRANSMISSION
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
#endif`,Gm=`#ifdef USE_TRANSMISSION
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
#endif`,Wm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$m=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ym=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zm=`uniform sampler2D t2D;
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
}`,Km=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eg=`#include <common>
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
}`,tg=`#if DEPTH_PACKING == 3200
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
}`,ng=`#define DISTANCE
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
}`,ig=`#define DISTANCE
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
}`,sg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,og=`uniform float scale;
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
}`,ag=`uniform vec3 diffuse;
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
}`,lg=`#include <common>
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
}`,cg=`uniform vec3 diffuse;
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
}`,hg=`#define LAMBERT
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
}`,ug=`#define LAMBERT
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
}`,dg=`#define MATCAP
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
}`,fg=`#define MATCAP
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
}`,pg=`#define NORMAL
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
}`,mg=`#define NORMAL
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
}`,gg=`#define PHONG
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
}`,yg=`#define PHONG
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
}`,_g=`#define STANDARD
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
}`,xg=`#define STANDARD
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
}`,vg=`#define TOON
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
}`,bg=`#define TOON
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
}`,Sg=`uniform float size;
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
}`,Mg=`uniform vec3 diffuse;
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
}`,wg=`#include <common>
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
}`,Eg=`uniform vec3 color;
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
}`,Ag=`uniform float rotation;
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
}`,Tg=`uniform vec3 diffuse;
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
}`,Ne={alphahash_fragment:Zf,alphahash_pars_fragment:Kf,alphamap_fragment:jf,alphamap_pars_fragment:Jf,alphatest_fragment:Qf,alphatest_pars_fragment:ep,aomap_fragment:tp,aomap_pars_fragment:np,batching_pars_vertex:ip,batching_vertex:sp,begin_vertex:rp,beginnormal_vertex:op,bsdfs:ap,iridescence_fragment:lp,bumpmap_pars_fragment:cp,clipping_planes_fragment:hp,clipping_planes_pars_fragment:up,clipping_planes_pars_vertex:dp,clipping_planes_vertex:fp,color_fragment:pp,color_pars_fragment:mp,color_pars_vertex:gp,color_vertex:yp,common:_p,cube_uv_reflection_fragment:xp,defaultnormal_vertex:vp,displacementmap_pars_vertex:bp,displacementmap_vertex:Sp,emissivemap_fragment:Mp,emissivemap_pars_fragment:wp,colorspace_fragment:Ep,colorspace_pars_fragment:Ap,envmap_fragment:Tp,envmap_common_pars_fragment:Cp,envmap_pars_fragment:Rp,envmap_pars_vertex:Ip,envmap_physical_pars_fragment:Hp,envmap_vertex:Pp,fog_vertex:Lp,fog_pars_vertex:Dp,fog_fragment:Fp,fog_pars_fragment:Up,gradientmap_pars_fragment:Np,lightmap_pars_fragment:Op,lights_lambert_fragment:Bp,lights_lambert_pars_fragment:kp,lights_pars_begin:zp,lights_toon_fragment:Vp,lights_toon_pars_fragment:Gp,lights_phong_fragment:Wp,lights_phong_pars_fragment:Xp,lights_physical_fragment:qp,lights_physical_pars_fragment:$p,lights_fragment_begin:Yp,lights_fragment_maps:Zp,lights_fragment_end:Kp,logdepthbuf_fragment:jp,logdepthbuf_pars_fragment:Jp,logdepthbuf_pars_vertex:Qp,logdepthbuf_vertex:em,map_fragment:tm,map_pars_fragment:nm,map_particle_fragment:im,map_particle_pars_fragment:sm,metalnessmap_fragment:rm,metalnessmap_pars_fragment:om,morphinstance_vertex:am,morphcolor_vertex:lm,morphnormal_vertex:cm,morphtarget_pars_vertex:hm,morphtarget_vertex:um,normal_fragment_begin:dm,normal_fragment_maps:fm,normal_pars_fragment:pm,normal_pars_vertex:mm,normal_vertex:gm,normalmap_pars_fragment:ym,clearcoat_normal_fragment_begin:_m,clearcoat_normal_fragment_maps:xm,clearcoat_pars_fragment:vm,iridescence_pars_fragment:bm,opaque_fragment:Sm,packing:Mm,premultiplied_alpha_fragment:wm,project_vertex:Em,dithering_fragment:Am,dithering_pars_fragment:Tm,roughnessmap_fragment:Cm,roughnessmap_pars_fragment:Rm,shadowmap_pars_fragment:Im,shadowmap_pars_vertex:Pm,shadowmap_vertex:Lm,shadowmask_pars_fragment:Dm,skinbase_vertex:Fm,skinning_pars_vertex:Um,skinning_vertex:Nm,skinnormal_vertex:Om,specularmap_fragment:Bm,specularmap_pars_fragment:km,tonemapping_fragment:zm,tonemapping_pars_fragment:Hm,transmission_fragment:Vm,transmission_pars_fragment:Gm,uv_pars_fragment:Wm,uv_pars_vertex:Xm,uv_vertex:qm,worldpos_vertex:$m,background_vert:Ym,background_frag:Zm,backgroundCube_vert:Km,backgroundCube_frag:jm,cube_vert:Jm,cube_frag:Qm,depth_vert:eg,depth_frag:tg,distanceRGBA_vert:ng,distanceRGBA_frag:ig,equirect_vert:sg,equirect_frag:rg,linedashed_vert:og,linedashed_frag:ag,meshbasic_vert:lg,meshbasic_frag:cg,meshlambert_vert:hg,meshlambert_frag:ug,meshmatcap_vert:dg,meshmatcap_frag:fg,meshnormal_vert:pg,meshnormal_frag:mg,meshphong_vert:gg,meshphong_frag:yg,meshphysical_vert:_g,meshphysical_frag:xg,meshtoon_vert:vg,meshtoon_frag:bg,points_vert:Sg,points_frag:Mg,shadow_vert:wg,shadow_frag:Eg,sprite_vert:Ag,sprite_frag:Tg},ne={common:{diffuse:{value:new he(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Le},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Le}},envmap:{envMap:{value:null},envMapRotation:{value:new Le},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Le}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Le}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Le},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Le},normalScale:{value:new xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Le},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Le}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Le}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Le}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new he(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new he(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0},uvTransform:{value:new Le}},sprite:{diffuse:{value:new he(16777215)},opacity:{value:1},center:{value:new xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Le},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0}}},Rn={basic:{uniforms:Ot([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:Ot([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new he(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:Ot([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new he(0)},specular:{value:new he(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:Ot([ne.common,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.roughnessmap,ne.metalnessmap,ne.fog,ne.lights,{emissive:{value:new he(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:Ot([ne.common,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.gradientmap,ne.fog,ne.lights,{emissive:{value:new he(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:Ot([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:Ot([ne.points,ne.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:Ot([ne.common,ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:Ot([ne.common,ne.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:Ot([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:Ot([ne.sprite,ne.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Le},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Le}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:Ot([ne.common,ne.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:Ot([ne.lights,ne.fog,{color:{value:new he(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};Rn.physical={uniforms:Ot([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Le},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Le},clearcoatNormalScale:{value:new xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Le},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Le},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Le},sheen:{value:0},sheenColor:{value:new he(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Le},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Le},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Le},transmissionSamplerSize:{value:new xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Le},attenuationDistance:{value:0},attenuationColor:{value:new he(0)},specularColor:{value:new he(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Le},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Le},anisotropyVector:{value:new xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Le}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};var Ea={r:0,b:0,g:0},Wi=new gn,Cg=new Pe;function Rg(r,e,t,n,i,s,o){let a=new he(0),l=s===!0?0:1,c,h,u=null,d=0,f=null;function g(w){let _=w.isScene===!0?w.background:null;return _&&_.isTexture&&(_=(w.backgroundBlurriness>0?t:e).get(_)),_}function y(w){let _=!1,I=g(w);I===null?p(a,l):I&&I.isColor&&(p(I,1),_=!0);let C=r.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(w,_){let I=g(_);I&&(I.isCubeTexture||I.mapping===Tr)?(h===void 0&&(h=new Mt(new ps(1,1,1),new _n({name:"BackgroundCubeMaterial",uniforms:Gi(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:It,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Wi.copy(_.backgroundRotation),Wi.x*=-1,Wi.y*=-1,Wi.z*=-1,I.isCubeTexture&&I.isRenderTargetTexture===!1&&(Wi.y*=-1,Wi.z*=-1),h.material.uniforms.envMap.value=I,h.material.uniforms.flipEnvMap.value=I.isCubeTexture&&I.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Cg.makeRotationFromEuler(Wi)),h.material.toneMapped=ke.getTransfer(I.colorSpace)!==et,(u!==I||d!==I.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=I,d=I.version,f=r.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):I&&I.isTexture&&(c===void 0&&(c=new Mt(new Pi(2,2),new _n({name:"BackgroundMaterial",uniforms:Gi(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:vt,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=I,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=ke.getTransfer(I.colorSpace)!==et,I.matrixAutoUpdate===!0&&I.updateMatrix(),c.material.uniforms.uvTransform.value.copy(I.matrix),(u!==I||d!==I.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=I,d=I.version,f=r.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function p(w,_){w.getRGB(Ea,zl(r)),n.buffers.color.setClear(Ea.r,Ea.g,Ea.b,_,o)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,_=1){a.set(w),l=_,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,p(a,l)},render:y,addToRenderList:m,dispose:M}}function Ig(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null),s=i,o=!1;function a(v,T,G,O,k){let X=!1,H=u(O,G,T);s!==H&&(s=H,c(s.object)),X=f(v,O,G,k),X&&g(v,O,G,k),k!==null&&e.update(k,r.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,_(v,T,G,O),k!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function l(){return r.createVertexArray()}function c(v){return r.bindVertexArray(v)}function h(v){return r.deleteVertexArray(v)}function u(v,T,G){let O=G.wireframe===!0,k=n[v.id];k===void 0&&(k={},n[v.id]=k);let X=k[T.id];X===void 0&&(X={},k[T.id]=X);let H=X[O];return H===void 0&&(H=d(l()),X[O]=H),H}function d(v){let T=[],G=[],O=[];for(let k=0;k<t;k++)T[k]=0,G[k]=0,O[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:G,attributeDivisors:O,object:v,attributes:{},index:null}}function f(v,T,G,O){let k=s.attributes,X=T.attributes,H=0,j=G.getAttributes();for(let N in j)if(j[N].location>=0){let ie=k[N],_e=X[N];if(_e===void 0&&(N==="instanceMatrix"&&v.instanceMatrix&&(_e=v.instanceMatrix),N==="instanceColor"&&v.instanceColor&&(_e=v.instanceColor)),ie===void 0||ie.attribute!==_e||_e&&ie.data!==_e.data)return!0;H++}return s.attributesNum!==H||s.index!==O}function g(v,T,G,O){let k={},X=T.attributes,H=0,j=G.getAttributes();for(let N in j)if(j[N].location>=0){let ie=X[N];ie===void 0&&(N==="instanceMatrix"&&v.instanceMatrix&&(ie=v.instanceMatrix),N==="instanceColor"&&v.instanceColor&&(ie=v.instanceColor));let _e={};_e.attribute=ie,ie&&ie.data&&(_e.data=ie.data),k[N]=_e,H++}s.attributes=k,s.attributesNum=H,s.index=O}function y(){let v=s.newAttributes;for(let T=0,G=v.length;T<G;T++)v[T]=0}function m(v){p(v,0)}function p(v,T){let G=s.newAttributes,O=s.enabledAttributes,k=s.attributeDivisors;G[v]=1,O[v]===0&&(r.enableVertexAttribArray(v),O[v]=1),k[v]!==T&&(r.vertexAttribDivisor(v,T),k[v]=T)}function M(){let v=s.newAttributes,T=s.enabledAttributes;for(let G=0,O=T.length;G<O;G++)T[G]!==v[G]&&(r.disableVertexAttribArray(G),T[G]=0)}function w(v,T,G,O,k,X,H){H===!0?r.vertexAttribIPointer(v,T,G,k,X):r.vertexAttribPointer(v,T,G,O,k,X)}function _(v,T,G,O){y();let k=O.attributes,X=G.getAttributes(),H=T.defaultAttributeValues;for(let j in X){let N=X[j];if(N.location>=0){let te=k[j];if(te===void 0&&(j==="instanceMatrix"&&v.instanceMatrix&&(te=v.instanceMatrix),j==="instanceColor"&&v.instanceColor&&(te=v.instanceColor)),te!==void 0){let ie=te.normalized,_e=te.itemSize,Ee=e.get(te);if(Ee===void 0)continue;let Oe=Ee.buffer,q=Ee.type,ee=Ee.bytesPerElement,ge=q===r.INT||q===r.UNSIGNED_INT||te.gpuType===Xo;if(te.isInterleavedBufferAttribute){let oe=te.data,we=oe.stride,Ye=te.offset;if(oe.isInstancedInterleavedBuffer){for(let Te=0;Te<N.locationSize;Te++)p(N.location+Te,oe.meshPerAttribute);v.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Te=0;Te<N.locationSize;Te++)m(N.location+Te);r.bindBuffer(r.ARRAY_BUFFER,Oe);for(let Te=0;Te<N.locationSize;Te++)w(N.location+Te,_e/N.locationSize,q,ie,we*ee,(Ye+_e/N.locationSize*Te)*ee,ge)}else{if(te.isInstancedBufferAttribute){for(let oe=0;oe<N.locationSize;oe++)p(N.location+oe,te.meshPerAttribute);v.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let oe=0;oe<N.locationSize;oe++)m(N.location+oe);r.bindBuffer(r.ARRAY_BUFFER,Oe);for(let oe=0;oe<N.locationSize;oe++)w(N.location+oe,_e/N.locationSize,q,ie,_e*ee,_e/N.locationSize*oe*ee,ge)}}else if(H!==void 0){let ie=H[j];if(ie!==void 0)switch(ie.length){case 2:r.vertexAttrib2fv(N.location,ie);break;case 3:r.vertexAttrib3fv(N.location,ie);break;case 4:r.vertexAttrib4fv(N.location,ie);break;default:r.vertexAttrib1fv(N.location,ie)}}}}M()}function I(){R();for(let v in n){let T=n[v];for(let G in T){let O=T[G];for(let k in O)h(O[k].object),delete O[k];delete T[G]}delete n[v]}}function C(v){if(n[v.id]===void 0)return;let T=n[v.id];for(let G in T){let O=T[G];for(let k in O)h(O[k].object),delete O[k];delete T[G]}delete n[v.id]}function A(v){for(let T in n){let G=n[T];if(G[v.id]===void 0)continue;let O=G[v.id];for(let k in O)h(O[k].object),delete O[k];delete G[v.id]}}function R(){S(),o=!0,s!==i&&(s=i,c(s.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:S,dispose:I,releaseStatesOfGeometry:C,releaseStatesOfProgram:A,initAttributes:y,enableAttribute:m,disableUnusedAttributes:M}}function Pg(r,e,t){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(r.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let y=0;y<u;y++)g+=h[y]*d[y];t.update(g,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Lg(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==Kt&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let R=A===vn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Cn&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Nt&&!R)}function l(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),M=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),w=r.getParameter(r.MAX_VARYING_VECTORS),_=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,C=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:w,maxFragmentUniforms:_,vertexTextures:I,maxSamples:C}}function Dg(r){let e=this,t=null,n=0,i=!1,s=!1,o=new tn,a=new Le,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,y=u.clipIntersection,m=u.clipShadows,p=r.get(u);if(!i||g===null||g.length===0||s&&!m)s?h(null):c();else{let M=s?0:n,w=M*4,_=p.clippingState||null;l.value=_,_=h(g,d,w,f);for(let I=0;I!==w;++I)_[I]=t[I];p.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){let y=u!==null?u.length:0,m=null;if(y!==0){if(m=l.value,g!==!0||m===null){let p=f+y*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,_=f;w!==y;++w,_+=4)o.copy(u[w]).applyMatrix4(M,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function Fg(r){let e=new WeakMap;function t(o,a){return a===ws?o.mapping=ki:a===Go&&(o.mapping=zi),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===ws||a===Go)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new bo(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}var Rs=4,Vu=[.125,.215,.35,.446,.526,.582],$i=20,Wl=new Ni,Gu=new he,Xl=null,ql=0,$l=0,Yl=!1,qi=(1+Math.sqrt(5))/2,Cs=1/qi,Wu=[new L(-qi,Cs,0),new L(qi,Cs,0),new L(-Cs,0,qi),new L(Cs,0,qi),new L(0,qi,-Cs),new L(0,qi,Cs),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],Ug=new L,Ca=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){let{size:o=256,position:a=Ug}=s;Xl=this._renderer.getRenderTarget(),ql=this._renderer.getActiveCubeFace(),$l=this._renderer.getActiveMipmapLevel(),Yl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$u(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Xl,ql,$l),this._renderer.xr.enabled=Yl,e.scissorTest=!1,Aa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ki||e.mapping===zi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Xl=this._renderer.getRenderTarget(),ql=this._renderer.getActiveCubeFace(),$l=this._renderer.getActiveMipmapLevel(),Yl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Qe,minFilter:Qe,generateMipmaps:!1,type:vn,format:Kt,colorSpace:pt,depthBuffer:!1},i=Xu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xu(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ng(s)),this._blurMaterial=Og(s,e,t)}return i}_compileMaterial(e){let t=new Mt(this._lodPlanes[0],e);this._renderer.compile(t,Wl)}_sceneToCubeUV(e,t,n,i,s){let l=new yt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Gu),u.toneMapping=Yn,u.autoClear=!1;let g=new yn({name:"PMREM.Background",side:It,depthWrite:!1,depthTest:!1}),y=new Mt(new ps,g),m=!1,p=e.background;p?p.isColor&&(g.color.copy(p),e.background=null,m=!0):(g.color.copy(Gu),m=!0);for(let M=0;M<6;M++){let w=M%3;w===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[M],s.y,s.z)):w===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[M]));let _=this._cubeSize;Aa(i,w*_,M>2?_:0,_,_),u.setRenderTarget(i),m&&u.render(y,l),u.render(e,l)}y.geometry.dispose(),y.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=p}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===ki||e.mapping===zi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=$u()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qu());let s=i?this._cubemapMaterial:this._equirectMaterial,o=new Mt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;let l=this._cubeSize;Aa(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Wl)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Wu[(i-s-1)%Wu.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Mt(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*$i-1),y=s/g,m=isFinite(s)?1+Math.floor(h*y):$i;m>$i&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${$i}`);let p=[],M=0;for(let A=0;A<$i;++A){let R=A/y,S=Math.exp(-R*R/2);p.push(S),A===0?M+=S:A<m&&(M+=2*S)}for(let A=0;A<p.length;A++)p[A]=p[A]/M;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:w}=this;d.dTheta.value=g,d.mipInt.value=w-n;let _=this._sizeLods[i],I=3*_*(i>w-Rs?i-w+Rs:0),C=4*(this._cubeSize-_);Aa(t,I,C,3*_,2*_),l.setRenderTarget(t),l.render(u,Wl)}};function Ng(r){let e=[],t=[],n=[],i=r,s=r-Rs+1+Vu.length;for(let o=0;o<s;o++){let a=Math.pow(2,i);t.push(a);let l=1/a;o>r-Rs?l=Vu[o-r+Rs-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,y=3,m=2,p=1,M=new Float32Array(y*g*f),w=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let C=0;C<f;C++){let A=C%3*2/3-1,R=C>2?0:-1,S=[A,R,0,A+2/3,R,0,A+2/3,R+1,0,A,R,0,A+2/3,R+1,0,A,R+1,0];M.set(S,y*g*C),w.set(d,m*g*C);let v=[C,C,C,C,C,C];_.set(v,p*g*C)}let I=new St;I.setAttribute("position",new ct(M,y)),I.setAttribute("uv",new ct(w,m)),I.setAttribute("faceIndex",new ct(_,p)),e.push(I),i>Rs&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Xu(r,e,t){let n=new Sn(r,e,t);return n.texture.mapping=Tr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Aa(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Og(r,e,t){let n=new Float32Array($i),i=new L(0,1,0);return new _n({name:"SphericalGaussianBlur",defines:{n:$i,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:sc(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function qu(){return new _n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sc(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function $u(){return new _n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function sc(){return`

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
	`}function Bg(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===ws||l===Go,h=l===ki||l===zi;if(c||h){let u=e.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Ca(r)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Ca(r)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){let l=a.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function kg(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&di("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function zg(r,e,t,n){let i={},s=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete i[d.id];let f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)e.update(d[f],r.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,g=u.attributes.position,y=0;if(f!==null){let M=f.array;y=f.version;for(let w=0,_=M.length;w<_;w+=3){let I=M[w+0],C=M[w+1],A=M[w+2];d.push(I,C,C,A,A,I)}}else if(g!==void 0){let M=g.array;y=g.version;for(let w=0,_=M.length/3-1;w<_;w+=3){let I=w+0,C=w+1,A=w+2;d.push(I,C,C,A,A,I)}}else return;let m=new(kl(d)?er:Qs)(d,1);m.version=y;let p=s.get(u);p&&e.remove(p),s.set(u,m)}function h(u){let d=s.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Hg(r,e,t){let n;function i(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,f){r.drawElements(n,f,s,d*o),t.update(f,n,1)}function c(d,f,g){g!==0&&(r.drawElementsInstanced(n,f,s,d*o,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,y){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],y[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,y,0,g);let p=0;for(let M=0;M<g;M++)p+=f[M]*y[M];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Vg(r){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Gg(r,e,t){let n=new WeakMap,i=new $e;function s(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let S=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],w=0;f===!0&&(w=1),g===!0&&(w=2),y===!0&&(w=3);let _=a.attributes.position.count*w,I=1;_>e.maxTextureSize&&(I=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let C=new Float32Array(_*I*4*u),A=new Js(C,_,I,u);A.type=Nt,A.needsUpdate=!0;let R=w*4;for(let v=0;v<u;v++){let T=m[v],G=p[v],O=M[v],k=_*I*4*v;for(let X=0;X<T.count;X++){let H=X*R;f===!0&&(i.fromBufferAttribute(T,X),C[k+H+0]=i.x,C[k+H+1]=i.y,C[k+H+2]=i.z,C[k+H+3]=0),g===!0&&(i.fromBufferAttribute(G,X),C[k+H+4]=i.x,C[k+H+5]=i.y,C[k+H+6]=i.z,C[k+H+7]=0),y===!0&&(i.fromBufferAttribute(O,X),C[k+H+8]=i.x,C[k+H+9]=i.y,C[k+H+10]=i.z,C[k+H+11]=O.itemSize===4?i.w:1)}}d={count:u,texture:A,size:new xe(_,I)},n.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function Wg(r,e,t,n){let i=new WeakMap;function s(l){let c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}var dd=new bt,Yu=new lr(1,1),fd=new Js,pd=new xo,md=new nr,Zu=[],Ku=[],ju=new Float32Array(16),Ju=new Float32Array(9),Qu=new Float32Array(4);function Ls(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=Zu[i];if(s===void 0&&(s=new Float32Array(i),Zu[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function wt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Et(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Ra(r,e){let t=Ku[e];t===void 0&&(t=new Int32Array(e),Ku[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Xg(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function qg(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;r.uniform2fv(this.addr,e),Et(t,e)}}function $g(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(wt(t,e))return;r.uniform3fv(this.addr,e),Et(t,e)}}function Yg(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;r.uniform4fv(this.addr,e),Et(t,e)}}function Zg(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(wt(t,n))return;Qu.set(n),r.uniformMatrix2fv(this.addr,!1,Qu),Et(t,n)}}function Kg(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(wt(t,n))return;Ju.set(n),r.uniformMatrix3fv(this.addr,!1,Ju),Et(t,n)}}function jg(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(wt(t,n))return;ju.set(n),r.uniformMatrix4fv(this.addr,!1,ju),Et(t,n)}}function Jg(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Qg(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;r.uniform2iv(this.addr,e),Et(t,e)}}function ey(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;r.uniform3iv(this.addr,e),Et(t,e)}}function ty(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;r.uniform4iv(this.addr,e),Et(t,e)}}function ny(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function iy(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;r.uniform2uiv(this.addr,e),Et(t,e)}}function sy(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;r.uniform3uiv(this.addr,e),Et(t,e)}}function ry(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;r.uniform4uiv(this.addr,e),Et(t,e)}}function oy(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Yu.compareFunction=Nl,s=Yu):s=dd,t.setTexture2D(e||s,i)}function ay(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||pd,i)}function ly(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||md,i)}function cy(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||fd,i)}function hy(r){switch(r){case 5126:return Xg;case 35664:return qg;case 35665:return $g;case 35666:return Yg;case 35674:return Zg;case 35675:return Kg;case 35676:return jg;case 5124:case 35670:return Jg;case 35667:case 35671:return Qg;case 35668:case 35672:return ey;case 35669:case 35673:return ty;case 5125:return ny;case 36294:return iy;case 36295:return sy;case 36296:return ry;case 35678:case 36198:case 36298:case 36306:case 35682:return oy;case 35679:case 36299:case 36307:return ay;case 35680:case 36300:case 36308:case 36293:return ly;case 36289:case 36303:case 36311:case 36292:return cy}}function uy(r,e){r.uniform1fv(this.addr,e)}function dy(r,e){let t=Ls(e,this.size,2);r.uniform2fv(this.addr,t)}function fy(r,e){let t=Ls(e,this.size,3);r.uniform3fv(this.addr,t)}function py(r,e){let t=Ls(e,this.size,4);r.uniform4fv(this.addr,t)}function my(r,e){let t=Ls(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function gy(r,e){let t=Ls(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function yy(r,e){let t=Ls(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function _y(r,e){r.uniform1iv(this.addr,e)}function xy(r,e){r.uniform2iv(this.addr,e)}function vy(r,e){r.uniform3iv(this.addr,e)}function by(r,e){r.uniform4iv(this.addr,e)}function Sy(r,e){r.uniform1uiv(this.addr,e)}function My(r,e){r.uniform2uiv(this.addr,e)}function wy(r,e){r.uniform3uiv(this.addr,e)}function Ey(r,e){r.uniform4uiv(this.addr,e)}function Ay(r,e,t){let n=this.cache,i=e.length,s=Ra(t,i);wt(n,s)||(r.uniform1iv(this.addr,s),Et(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||dd,s[o])}function Ty(r,e,t){let n=this.cache,i=e.length,s=Ra(t,i);wt(n,s)||(r.uniform1iv(this.addr,s),Et(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||pd,s[o])}function Cy(r,e,t){let n=this.cache,i=e.length,s=Ra(t,i);wt(n,s)||(r.uniform1iv(this.addr,s),Et(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||md,s[o])}function Ry(r,e,t){let n=this.cache,i=e.length,s=Ra(t,i);wt(n,s)||(r.uniform1iv(this.addr,s),Et(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||fd,s[o])}function Iy(r){switch(r){case 5126:return uy;case 35664:return dy;case 35665:return fy;case 35666:return py;case 35674:return my;case 35675:return gy;case 35676:return yy;case 5124:case 35670:return _y;case 35667:case 35671:return xy;case 35668:case 35672:return vy;case 35669:case 35673:return by;case 5125:return Sy;case 36294:return My;case 36295:return wy;case 36296:return Ey;case 35678:case 36198:case 36298:case 36306:case 35682:return Ay;case 35679:case 36299:case 36307:return Ty;case 35680:case 36300:case 36308:case 36293:return Cy;case 36289:case 36303:case 36311:case 36292:return Ry}}var Kl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=hy(t.type)}},jl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Iy(t.type)}},Jl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,o=i.length;s!==o;++s){let a=i[s];a.setValue(e,t[a.id],n)}}},Zl=/(\w+)(\])?(\[|\.)?/g;function ed(r,e){r.seq.push(e),r.map[e.id]=e}function Py(r,e,t){let n=r.name,i=n.length;for(Zl.lastIndex=0;;){let s=Zl.exec(n),o=Zl.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){ed(t,c===void 0?new Kl(a,r,e):new jl(a,r,e));break}else{let u=t.map[a];u===void 0&&(u=new Jl(a),ed(t,u)),t=u}}}var Is=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);Py(s,o,this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){let a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function td(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var Ly=37297,Dy=0;function Fy(r,e){let t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var nd=new Le;function Uy(r){ke._getMatrix(nd,ke.workingColorSpace,r);let e=`mat3( ${nd.elements.map(t=>t.toFixed(4))} )`;switch(ke.getTransfer(r)){case Ks:return[e,"LinearTransferOETF"];case et:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function id(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+Fy(r.getShaderSource(e),o)}else return i}function Ny(r,e){let t=Uy(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Oy(r,e){let t;switch(e){case fu:t="Linear";break;case pu:t="Reinhard";break;case mu:t="Cineon";break;case Vo:t="ACESFilmic";break;case yu:t="AgX";break;case _u:t="Neutral";break;case gu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Ta=new L;function By(){ke.getLuminanceCoefficients(Ta);let r=Ta.x.toFixed(4),e=Ta.y.toFixed(4),t=Ta.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ky(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ur).join(`
`)}function zy(r){let e=[];for(let t in r){let n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Hy(r,e){let t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let s=r.getActiveAttrib(e,i),o=s.name,a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function Ur(r){return r!==""}function sd(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function rd(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Vy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ql(r){return r.replace(Vy,Wy)}var Gy=new Map;function Wy(r,e){let t=Ne[e];if(t===void 0){let n=Gy.get(e);if(n!==void 0)t=Ne[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ql(t)}var Xy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function od(r){return r.replace(Xy,qy)}function qy(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function ad(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function $y(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Sl?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Fo?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Tn&&(e="SHADOWMAP_TYPE_VSM"),e}function Yy(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case ki:case zi:e="ENVMAP_TYPE_CUBE";break;case Tr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Zy(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case zi:e="ENVMAP_MODE_REFRACTION";break}return e}function Ky(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Ml:e="ENVMAP_BLENDING_MULTIPLY";break;case uu:e="ENVMAP_BLENDING_MIX";break;case du:e="ENVMAP_BLENDING_ADD";break}return e}function jy(r){let e=r.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Jy(r,e,t,n){let i=r.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,l=$y(t),c=Yy(t),h=Zy(t),u=Ky(t),d=jy(t),f=ky(t),g=zy(s),y=i.createProgram(),m,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ur).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ur).join(`
`),p.length>0&&(p+=`
`)):(m=[ad(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ur).join(`
`),p=[ad(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Yn?"#define TONE_MAPPING":"",t.toneMapping!==Yn?Ne.tonemapping_pars_fragment:"",t.toneMapping!==Yn?Oy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,Ny("linearToOutputTexel",t.outputColorSpace),By(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ur).join(`
`)),o=Ql(o),o=sd(o,t),o=rd(o,t),a=Ql(a),a=sd(a,t),a=rd(a,t),o=od(o),a=od(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Ol?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ol?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let w=M+m+o,_=M+p+a,I=td(i,i.VERTEX_SHADER,w),C=td(i,i.FRAGMENT_SHADER,_);i.attachShader(y,I),i.attachShader(y,C),t.index0AttributeName!==void 0?i.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y);function A(T){if(r.debug.checkShaderErrors){let G=i.getProgramInfoLog(y).trim(),O=i.getShaderInfoLog(I).trim(),k=i.getShaderInfoLog(C).trim(),X=!0,H=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(X=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,y,I,C);else{let j=id(i,I,"vertex"),N=id(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+G+`
`+j+`
`+N)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(O===""||k==="")&&(H=!1);H&&(T.diagnostics={runnable:X,programLog:G,vertexShader:{log:O,prefix:m},fragmentShader:{log:k,prefix:p}})}i.deleteShader(I),i.deleteShader(C),R=new Is(i,y),S=Hy(i,y)}let R;this.getUniforms=function(){return R===void 0&&A(this),R};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=i.getProgramParameter(y,Ly)),v},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Dy++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=I,this.fragmentShader=C,this}var Qy=0,ec=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new tc(e),t.set(e,n)),n}},tc=class{constructor(e){this.id=Qy++,this.code=e,this.usedTimes=0}};function e0(r,e,t,n,i,s,o){let a=new fs,l=new ec,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,v,T,G,O){let k=G.fog,X=O.geometry,H=S.isMeshStandardMaterial?G.environment:null,j=(S.isMeshStandardMaterial?t:e).get(S.envMap||H),N=j&&j.mapping===Tr?j.image.height:null,te=g[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let ie=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,_e=ie!==void 0?ie.length:0,Ee=0;X.morphAttributes.position!==void 0&&(Ee=1),X.morphAttributes.normal!==void 0&&(Ee=2),X.morphAttributes.color!==void 0&&(Ee=3);let Oe,q,ee,ge;if(te){let je=Rn[te];Oe=je.vertexShader,q=je.fragmentShader}else Oe=S.vertexShader,q=S.fragmentShader,l.update(S),ee=l.getVertexShaderID(S),ge=l.getFragmentShaderID(S);let oe=r.getRenderTarget(),we=r.state.buffers.depth.getReversed(),Ye=O.isInstancedMesh===!0,Te=O.isBatchedMesh===!0,ft=!!S.map,lt=!!S.matcap,ze=!!j,P=!!S.aoMap,jt=!!S.lightMap,He=!!S.bumpMap,Ve=!!S.normalMap,be=!!S.displacementMap,rt=!!S.emissiveMap,ve=!!S.metalnessMap,E=!!S.roughnessMap,x=S.anisotropy>0,B=S.clearcoat>0,Y=S.dispersion>0,K=S.iridescence>0,$=S.sheen>0,ye=S.transmission>0,ae=x&&!!S.anisotropyMap,de=B&&!!S.clearcoatMap,We=B&&!!S.clearcoatNormalMap,Q=B&&!!S.clearcoatRoughnessMap,fe=K&&!!S.iridescenceMap,Ae=K&&!!S.iridescenceThicknessMap,Ce=$&&!!S.sheenColorMap,pe=$&&!!S.sheenRoughnessMap,Ge=!!S.specularMap,Fe=!!S.specularColorMap,st=!!S.specularIntensityMap,D=ye&&!!S.transmissionMap,se=ye&&!!S.thicknessMap,W=!!S.gradientMap,Z=!!S.alphaMap,ce=S.alphaTest>0,le=!!S.alphaHash,De=!!S.extensions,ht=Yn;S.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(ht=r.toneMapping);let Dt={shaderID:te,shaderType:S.type,shaderName:S.name,vertexShader:Oe,fragmentShader:q,defines:S.defines,customVertexShaderID:ee,customFragmentShaderID:ge,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Te,batchingColor:Te&&O._colorsTexture!==null,instancing:Ye,instancingColor:Ye&&O.instanceColor!==null,instancingMorph:Ye&&O.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:oe===null?r.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:pt,alphaToCoverage:!!S.alphaToCoverage,map:ft,matcap:lt,envMap:ze,envMapMode:ze&&j.mapping,envMapCubeUVHeight:N,aoMap:P,lightMap:jt,bumpMap:He,normalMap:Ve,displacementMap:d&&be,emissiveMap:rt,normalMapObjectSpace:Ve&&S.normalMapType===Au,normalMapTangentSpace:Ve&&S.normalMapType===Ul,metalnessMap:ve,roughnessMap:E,anisotropy:x,anisotropyMap:ae,clearcoat:B,clearcoatMap:de,clearcoatNormalMap:We,clearcoatRoughnessMap:Q,dispersion:Y,iridescence:K,iridescenceMap:fe,iridescenceThicknessMap:Ae,sheen:$,sheenColorMap:Ce,sheenRoughnessMap:pe,specularMap:Ge,specularColorMap:Fe,specularIntensityMap:st,transmission:ye,transmissionMap:D,thicknessMap:se,gradientMap:W,opaque:S.transparent===!1&&S.blending===Rt&&S.alphaToCoverage===!1,alphaMap:Z,alphaTest:ce,alphaHash:le,combine:S.combine,mapUv:ft&&y(S.map.channel),aoMapUv:P&&y(S.aoMap.channel),lightMapUv:jt&&y(S.lightMap.channel),bumpMapUv:He&&y(S.bumpMap.channel),normalMapUv:Ve&&y(S.normalMap.channel),displacementMapUv:be&&y(S.displacementMap.channel),emissiveMapUv:rt&&y(S.emissiveMap.channel),metalnessMapUv:ve&&y(S.metalnessMap.channel),roughnessMapUv:E&&y(S.roughnessMap.channel),anisotropyMapUv:ae&&y(S.anisotropyMap.channel),clearcoatMapUv:de&&y(S.clearcoatMap.channel),clearcoatNormalMapUv:We&&y(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&y(S.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&y(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ae&&y(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&y(S.sheenColorMap.channel),sheenRoughnessMapUv:pe&&y(S.sheenRoughnessMap.channel),specularMapUv:Ge&&y(S.specularMap.channel),specularColorMapUv:Fe&&y(S.specularColorMap.channel),specularIntensityMapUv:st&&y(S.specularIntensityMap.channel),transmissionMapUv:D&&y(S.transmissionMap.channel),thicknessMapUv:se&&y(S.thicknessMap.channel),alphaMapUv:Z&&y(S.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Ve||x),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!X.attributes.uv&&(ft||Z),fog:!!k,useFog:S.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:we,skinning:O.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:Ee,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&T.length>0,shadowMapType:r.shadowMap.type,toneMapping:ht,decodeVideoTexture:ft&&S.map.isVideoTexture===!0&&ke.getTransfer(S.map.colorSpace)===et,decodeVideoTextureEmissive:rt&&S.emissiveMap.isVideoTexture===!0&&ke.getTransfer(S.emissiveMap.colorSpace)===et,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===nt,flipSided:S.side===It,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:De&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(De&&S.extensions.multiDraw===!0||Te)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Dt.vertexUv1s=c.has(1),Dt.vertexUv2s=c.has(2),Dt.vertexUv3s=c.has(3),c.clear(),Dt}function p(S){let v=[];if(S.shaderID?v.push(S.shaderID):(v.push(S.customVertexShaderID),v.push(S.customFragmentShaderID)),S.defines!==void 0)for(let T in S.defines)v.push(T),v.push(S.defines[T]);return S.isRawShaderMaterial===!1&&(M(v,S),w(v,S),v.push(r.outputColorSpace)),v.push(S.customProgramCacheKey),v.join()}function M(S,v){S.push(v.precision),S.push(v.outputColorSpace),S.push(v.envMapMode),S.push(v.envMapCubeUVHeight),S.push(v.mapUv),S.push(v.alphaMapUv),S.push(v.lightMapUv),S.push(v.aoMapUv),S.push(v.bumpMapUv),S.push(v.normalMapUv),S.push(v.displacementMapUv),S.push(v.emissiveMapUv),S.push(v.metalnessMapUv),S.push(v.roughnessMapUv),S.push(v.anisotropyMapUv),S.push(v.clearcoatMapUv),S.push(v.clearcoatNormalMapUv),S.push(v.clearcoatRoughnessMapUv),S.push(v.iridescenceMapUv),S.push(v.iridescenceThicknessMapUv),S.push(v.sheenColorMapUv),S.push(v.sheenRoughnessMapUv),S.push(v.specularMapUv),S.push(v.specularColorMapUv),S.push(v.specularIntensityMapUv),S.push(v.transmissionMapUv),S.push(v.thicknessMapUv),S.push(v.combine),S.push(v.fogExp2),S.push(v.sizeAttenuation),S.push(v.morphTargetsCount),S.push(v.morphAttributeCount),S.push(v.numDirLights),S.push(v.numPointLights),S.push(v.numSpotLights),S.push(v.numSpotLightMaps),S.push(v.numHemiLights),S.push(v.numRectAreaLights),S.push(v.numDirLightShadows),S.push(v.numPointLightShadows),S.push(v.numSpotLightShadows),S.push(v.numSpotLightShadowsWithMaps),S.push(v.numLightProbes),S.push(v.shadowMapType),S.push(v.toneMapping),S.push(v.numClippingPlanes),S.push(v.numClipIntersection),S.push(v.depthPacking)}function w(S,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),S.push(a.mask)}function _(S){let v=g[S.type],T;if(v){let G=Rn[v];T=ku.clone(G.uniforms)}else T=S.uniforms;return T}function I(S,v){let T;for(let G=0,O=h.length;G<O;G++){let k=h[G];if(k.cacheKey===v){T=k,++T.usedTimes;break}}return T===void 0&&(T=new Jy(r,v,S,s),h.push(T)),T}function C(S){if(--S.usedTimes===0){let v=h.indexOf(S);h[v]=h[h.length-1],h.pop(),S.destroy()}}function A(S){l.remove(S)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:I,releaseProgram:C,releaseShaderCache:A,programs:h,dispose:R}}function t0(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function n0(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function ld(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function cd(){let r=[],e=0,t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,g,y,m){let p=r[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:y,group:m},r[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=y,p.group=m),e++,p}function a(u,d,f,g,y,m){let p=o(u,d,f,g,y,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(u,d,f,g,y,m){let p=o(u,d,f,g,y,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||n0),n.length>1&&n.sort(d||ld),i.length>1&&i.sort(d||ld)}function h(){for(let u=e,d=r.length;u<d;u++){let f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function i0(){let r=new WeakMap;function e(n,i){let s=r.get(n),o;return s===void 0?(o=new cd,r.set(n,[o])):i>=s.length?(o=new cd,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function s0(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new he};break;case"SpotLight":t={position:new L,direction:new L,color:new he,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new he,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new he,groundColor:new he};break;case"RectAreaLight":t={color:new he,position:new L,halfWidth:new L,halfHeight:new L};break}return r[e.id]=t,t}}}function r0(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}var o0=0;function a0(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function l0(r){let e=new s0,t=r0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);let i=new L,s=new Pe,o=new Pe;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,g=0,y=0,m=0,p=0,M=0,w=0,_=0,I=0,C=0,A=0;c.sort(a0);for(let S=0,v=c.length;S<v;S++){let T=c[S],G=T.color,O=T.intensity,k=T.distance,X=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)h+=G.r*O,u+=G.g*O,d+=G.b*O;else if(T.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(T.sh.coefficients[H],O);A++}else if(T.isDirectionalLight){let H=e.get(T);if(H.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){let j=T.shadow,N=t.get(T);N.shadowIntensity=j.intensity,N.shadowBias=j.bias,N.shadowNormalBias=j.normalBias,N.shadowRadius=j.radius,N.shadowMapSize=j.mapSize,n.directionalShadow[f]=N,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=T.shadow.matrix,M++}n.directional[f]=H,f++}else if(T.isSpotLight){let H=e.get(T);H.position.setFromMatrixPosition(T.matrixWorld),H.color.copy(G).multiplyScalar(O),H.distance=k,H.coneCos=Math.cos(T.angle),H.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),H.decay=T.decay,n.spot[y]=H;let j=T.shadow;if(T.map&&(n.spotLightMap[I]=T.map,I++,j.updateMatrices(T),T.castShadow&&C++),n.spotLightMatrix[y]=j.matrix,T.castShadow){let N=t.get(T);N.shadowIntensity=j.intensity,N.shadowBias=j.bias,N.shadowNormalBias=j.normalBias,N.shadowRadius=j.radius,N.shadowMapSize=j.mapSize,n.spotShadow[y]=N,n.spotShadowMap[y]=X,_++}y++}else if(T.isRectAreaLight){let H=e.get(T);H.color.copy(G).multiplyScalar(O),H.halfWidth.set(T.width*.5,0,0),H.halfHeight.set(0,T.height*.5,0),n.rectArea[m]=H,m++}else if(T.isPointLight){let H=e.get(T);if(H.color.copy(T.color).multiplyScalar(T.intensity),H.distance=T.distance,H.decay=T.decay,T.castShadow){let j=T.shadow,N=t.get(T);N.shadowIntensity=j.intensity,N.shadowBias=j.bias,N.shadowNormalBias=j.normalBias,N.shadowRadius=j.radius,N.shadowMapSize=j.mapSize,N.shadowCameraNear=j.camera.near,N.shadowCameraFar=j.camera.far,n.pointShadow[g]=N,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=T.shadow.matrix,w++}n.point[g]=H,g++}else if(T.isHemisphereLight){let H=e.get(T);H.skyColor.copy(T.color).multiplyScalar(O),H.groundColor.copy(T.groundColor).multiplyScalar(O),n.hemi[p]=H,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ne.LTC_FLOAT_1,n.rectAreaLTC2=ne.LTC_FLOAT_2):(n.rectAreaLTC1=ne.LTC_HALF_1,n.rectAreaLTC2=ne.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let R=n.hash;(R.directionalLength!==f||R.pointLength!==g||R.spotLength!==y||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==M||R.numPointShadows!==w||R.numSpotShadows!==_||R.numSpotMaps!==I||R.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=y,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=_+I-C,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=A,R.directionalLength=f,R.pointLength=g,R.spotLength=y,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=M,R.numPointShadows=w,R.numSpotShadows=_,R.numSpotMaps=I,R.numLightProbes=A,n.version=o0++)}function l(c,h){let u=0,d=0,f=0,g=0,y=0,m=h.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){let w=c[p];if(w.isDirectionalLight){let _=n.directional[u];_.direction.setFromMatrixPosition(w.matrixWorld),i.setFromMatrixPosition(w.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),u++}else if(w.isSpotLight){let _=n.spot[f];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(w.matrixWorld),i.setFromMatrixPosition(w.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),f++}else if(w.isRectAreaLight){let _=n.rectArea[g];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(m),o.identity(),s.copy(w.matrixWorld),s.premultiply(m),o.extractRotation(s),_.halfWidth.set(w.width*.5,0,0),_.halfHeight.set(0,w.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(w.isPointLight){let _=n.point[d];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(m),d++}else if(w.isHemisphereLight){let _=n.hemi[y];_.direction.setFromMatrixPosition(w.matrixWorld),_.direction.transformDirection(m),y++}}}return{setup:a,setupView:l,state:n}}function hd(r){let e=new l0(r),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function c0(r){let e=new WeakMap;function t(i,s=0){let o=e.get(i),a;return o===void 0?(a=new hd(r),e.set(i,[a])):s>=o.length?(a=new hd(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var h0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,u0=`uniform sampler2D shadow_pass;
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
}`;function d0(r,e,t){let n=new vs,i=new xe,s=new xe,o=new $e,a=new wo({depthPacking:Eu}),l=new Eo,c={},h=t.maxTextureSize,u={[vt]:It,[It]:vt,[nt]:nt},d=new _n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xe},radius:{value:4}},vertexShader:h0,fragmentShader:u0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new St;g.setAttribute("position",new ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Mt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sl;let p=this.type;this.render=function(C,A,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;let S=r.getRenderTarget(),v=r.getActiveCubeFace(),T=r.getActiveMipmapLevel(),G=r.state;G.setBlending($n),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);let O=p!==Tn&&this.type===Tn,k=p===Tn&&this.type!==Tn;for(let X=0,H=C.length;X<H;X++){let j=C[X],N=j.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;i.copy(N.mapSize);let te=N.getFrameExtents();if(i.multiply(te),s.copy(N.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/te.x),i.x=s.x*te.x,N.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/te.y),i.y=s.y*te.y,N.mapSize.y=s.y)),N.map===null||O===!0||k===!0){let _e=this.type!==Tn?{minFilter:Lt,magFilter:Lt}:{};N.map!==null&&N.map.dispose(),N.map=new Sn(i.x,i.y,_e),N.map.texture.name=j.name+".shadowMap",N.camera.updateProjectionMatrix()}r.setRenderTarget(N.map),r.clear();let ie=N.getViewportCount();for(let _e=0;_e<ie;_e++){let Ee=N.getViewport(_e);o.set(s.x*Ee.x,s.y*Ee.y,s.x*Ee.z,s.y*Ee.w),G.viewport(o),N.updateMatrices(j,_e),n=N.getFrustum(),_(A,R,N.camera,j,this.type)}N.isPointLightShadow!==!0&&this.type===Tn&&M(N,R),N.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(S,v,T)};function M(C,A){let R=e.update(y);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Sn(i.x,i.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,r.setRenderTarget(C.mapPass),r.clear(),r.renderBufferDirect(A,null,R,d,y,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,r.setRenderTarget(C.map),r.clear(),r.renderBufferDirect(A,null,R,f,y,null)}function w(C,A,R,S){let v=null,T=R.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(T!==void 0)v=T;else if(v=R.isPointLight===!0?l:a,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let G=v.uuid,O=A.uuid,k=c[G];k===void 0&&(k={},c[G]=k);let X=k[O];X===void 0&&(X=v.clone(),k[O]=X,A.addEventListener("dispose",I)),v=X}if(v.visible=A.visible,v.wireframe=A.wireframe,S===Tn?v.side=A.shadowSide!==null?A.shadowSide:A.side:v.side=A.shadowSide!==null?A.shadowSide:u[A.side],v.alphaMap=A.alphaMap,v.alphaTest=A.alphaTest,v.map=A.map,v.clipShadows=A.clipShadows,v.clippingPlanes=A.clippingPlanes,v.clipIntersection=A.clipIntersection,v.displacementMap=A.displacementMap,v.displacementScale=A.displacementScale,v.displacementBias=A.displacementBias,v.wireframeLinewidth=A.wireframeLinewidth,v.linewidth=A.linewidth,R.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let G=r.properties.get(v);G.light=R}return v}function _(C,A,R,S,v){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&v===Tn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,C.matrixWorld);let O=e.update(C),k=C.material;if(Array.isArray(k)){let X=O.groups;for(let H=0,j=X.length;H<j;H++){let N=X[H],te=k[N.materialIndex];if(te&&te.visible){let ie=w(C,te,S,v);C.onBeforeShadow(r,C,A,R,O,ie,N),r.renderBufferDirect(R,null,O,ie,C,N),C.onAfterShadow(r,C,A,R,O,ie,N)}}}else if(k.visible){let X=w(C,k,S,v);C.onBeforeShadow(r,C,A,R,O,X,null),r.renderBufferDirect(R,null,O,X,C,null),C.onAfterShadow(r,C,A,R,O,X,null)}}let G=C.children;for(let O=0,k=G.length;O<k;O++)_(G[O],A,R,S,v)}function I(C){C.target.removeEventListener("dispose",I);for(let R in c){let S=c[R],v=C.target.uuid;v in S&&(S[v].dispose(),delete S[v])}}}var f0={[Uo]:No,[Oo]:zo,[Bo]:Ho,[Ei]:ko,[No]:Uo,[zo]:Oo,[Ho]:Bo,[ko]:Ei};function p0(r,e){function t(){let D=!1,se=new $e,W=null,Z=new $e(0,0,0,0);return{setMask:function(ce){W!==ce&&!D&&(r.colorMask(ce,ce,ce,ce),W=ce)},setLocked:function(ce){D=ce},setClear:function(ce,le,De,ht,Dt){Dt===!0&&(ce*=ht,le*=ht,De*=ht),se.set(ce,le,De,ht),Z.equals(se)===!1&&(r.clearColor(ce,le,De,ht),Z.copy(se))},reset:function(){D=!1,W=null,Z.set(-1,0,0,0)}}}function n(){let D=!1,se=!1,W=null,Z=null,ce=null;return{setReversed:function(le){if(se!==le){let De=e.get("EXT_clip_control");se?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT);let ht=ce;ce=null,this.setClear(ht)}se=le},getReversed:function(){return se},setTest:function(le){le?oe(r.DEPTH_TEST):we(r.DEPTH_TEST)},setMask:function(le){W!==le&&!D&&(r.depthMask(le),W=le)},setFunc:function(le){if(se&&(le=f0[le]),Z!==le){switch(le){case Uo:r.depthFunc(r.NEVER);break;case No:r.depthFunc(r.ALWAYS);break;case Oo:r.depthFunc(r.LESS);break;case Ei:r.depthFunc(r.LEQUAL);break;case Bo:r.depthFunc(r.EQUAL);break;case ko:r.depthFunc(r.GEQUAL);break;case zo:r.depthFunc(r.GREATER);break;case Ho:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Z=le}},setLocked:function(le){D=le},setClear:function(le){ce!==le&&(se&&(le=1-le),r.clearDepth(le),ce=le)},reset:function(){D=!1,W=null,Z=null,ce=null,se=!1}}}function i(){let D=!1,se=null,W=null,Z=null,ce=null,le=null,De=null,ht=null,Dt=null;return{setTest:function(je){D||(je?oe(r.STENCIL_TEST):we(r.STENCIL_TEST))},setMask:function(je){se!==je&&!D&&(r.stencilMask(je),se=je)},setFunc:function(je,on,Pn){(W!==je||Z!==on||ce!==Pn)&&(r.stencilFunc(je,on,Pn),W=je,Z=on,ce=Pn)},setOp:function(je,on,Pn){(le!==je||De!==on||ht!==Pn)&&(r.stencilOp(je,on,Pn),le=je,De=on,ht=Pn)},setLocked:function(je){D=je},setClear:function(je){Dt!==je&&(r.clearStencil(je),Dt=je)},reset:function(){D=!1,se=null,W=null,Z=null,ce=null,le=null,De=null,ht=null,Dt=null}}}let s=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,f=[],g=null,y=!1,m=null,p=null,M=null,w=null,_=null,I=null,C=null,A=new he(0,0,0),R=0,S=!1,v=null,T=null,G=null,O=null,k=null,X=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,j=0,N=r.getParameter(r.VERSION);N.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(N)[1]),H=j>=1):N.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),H=j>=2);let te=null,ie={},_e=r.getParameter(r.SCISSOR_BOX),Ee=r.getParameter(r.VIEWPORT),Oe=new $e().fromArray(_e),q=new $e().fromArray(Ee);function ee(D,se,W,Z){let ce=new Uint8Array(4),le=r.createTexture();r.bindTexture(D,le),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let De=0;De<W;De++)D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY?r.texImage3D(se,0,r.RGBA,1,1,Z,0,r.RGBA,r.UNSIGNED_BYTE,ce):r.texImage2D(se+De,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ce);return le}let ge={};ge[r.TEXTURE_2D]=ee(r.TEXTURE_2D,r.TEXTURE_2D,1),ge[r.TEXTURE_CUBE_MAP]=ee(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ge[r.TEXTURE_2D_ARRAY]=ee(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ge[r.TEXTURE_3D]=ee(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),oe(r.DEPTH_TEST),o.setFunc(Ei),He(!1),Ve(bl),oe(r.CULL_FACE),P($n);function oe(D){h[D]!==!0&&(r.enable(D),h[D]=!0)}function we(D){h[D]!==!1&&(r.disable(D),h[D]=!1)}function Ye(D,se){return u[D]!==se?(r.bindFramebuffer(D,se),u[D]=se,D===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=se),D===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=se),!0):!1}function Te(D,se){let W=f,Z=!1;if(D){W=d.get(se),W===void 0&&(W=[],d.set(se,W));let ce=D.textures;if(W.length!==ce.length||W[0]!==r.COLOR_ATTACHMENT0){for(let le=0,De=ce.length;le<De;le++)W[le]=r.COLOR_ATTACHMENT0+le;W.length=ce.length,Z=!0}}else W[0]!==r.BACK&&(W[0]=r.BACK,Z=!0);Z&&r.drawBuffers(W)}function ft(D){return g!==D?(r.useProgram(D),g=D,!0):!1}let lt={[si]:r.FUNC_ADD,[Yh]:r.FUNC_SUBTRACT,[Zh]:r.FUNC_REVERSE_SUBTRACT};lt[Kh]=r.MIN,lt[jh]=r.MAX;let ze={[Jh]:r.ZERO,[Qh]:r.ONE,[eu]:r.SRC_COLOR,[po]:r.SRC_ALPHA,[ou]:r.SRC_ALPHA_SATURATE,[su]:r.DST_COLOR,[nu]:r.DST_ALPHA,[tu]:r.ONE_MINUS_SRC_COLOR,[mo]:r.ONE_MINUS_SRC_ALPHA,[ru]:r.ONE_MINUS_DST_COLOR,[iu]:r.ONE_MINUS_DST_ALPHA,[au]:r.CONSTANT_COLOR,[lu]:r.ONE_MINUS_CONSTANT_COLOR,[cu]:r.CONSTANT_ALPHA,[hu]:r.ONE_MINUS_CONSTANT_ALPHA};function P(D,se,W,Z,ce,le,De,ht,Dt,je){if(D===$n){y===!0&&(we(r.BLEND),y=!1);return}if(y===!1&&(oe(r.BLEND),y=!0),D!==Ms){if(D!==m||je!==S){if((p!==si||_!==si)&&(r.blendEquation(r.FUNC_ADD),p=si,_=si),je)switch(D){case Rt:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case wr:r.blendFunc(r.ONE,r.ONE);break;case Er:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ar:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Rt:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case wr:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Er:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ar:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}M=null,w=null,I=null,C=null,A.set(0,0,0),R=0,m=D,S=je}return}ce=ce||se,le=le||W,De=De||Z,(se!==p||ce!==_)&&(r.blendEquationSeparate(lt[se],lt[ce]),p=se,_=ce),(W!==M||Z!==w||le!==I||De!==C)&&(r.blendFuncSeparate(ze[W],ze[Z],ze[le],ze[De]),M=W,w=Z,I=le,C=De),(ht.equals(A)===!1||Dt!==R)&&(r.blendColor(ht.r,ht.g,ht.b,Dt),A.copy(ht),R=Dt),m=D,S=!1}function jt(D,se){D.side===nt?we(r.CULL_FACE):oe(r.CULL_FACE);let W=D.side===It;se&&(W=!W),He(W),D.blending===Rt&&D.transparent===!1?P($n):P(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);let Z=D.stencilWrite;a.setTest(Z),Z&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),rt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?oe(r.SAMPLE_ALPHA_TO_COVERAGE):we(r.SAMPLE_ALPHA_TO_COVERAGE)}function He(D){v!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),v=D)}function Ve(D){D!==qh?(oe(r.CULL_FACE),D!==T&&(D===bl?r.cullFace(r.BACK):D===$h?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):we(r.CULL_FACE),T=D}function be(D){D!==G&&(H&&r.lineWidth(D),G=D)}function rt(D,se,W){D?(oe(r.POLYGON_OFFSET_FILL),(O!==se||k!==W)&&(r.polygonOffset(se,W),O=se,k=W)):we(r.POLYGON_OFFSET_FILL)}function ve(D){D?oe(r.SCISSOR_TEST):we(r.SCISSOR_TEST)}function E(D){D===void 0&&(D=r.TEXTURE0+X-1),te!==D&&(r.activeTexture(D),te=D)}function x(D,se,W){W===void 0&&(te===null?W=r.TEXTURE0+X-1:W=te);let Z=ie[W];Z===void 0&&(Z={type:void 0,texture:void 0},ie[W]=Z),(Z.type!==D||Z.texture!==se)&&(te!==W&&(r.activeTexture(W),te=W),r.bindTexture(D,se||ge[D]),Z.type=D,Z.texture=se)}function B(){let D=ie[te];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Y(){try{r.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function K(){try{r.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function $(){try{r.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ye(){try{r.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ae(){try{r.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function de(){try{r.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function We(){try{r.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{r.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function fe(){try{r.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ae(){try{r.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ce(D){Oe.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),Oe.copy(D))}function pe(D){q.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),q.copy(D))}function Ge(D,se){let W=c.get(se);W===void 0&&(W=new WeakMap,c.set(se,W));let Z=W.get(D);Z===void 0&&(Z=r.getUniformBlockIndex(se,D.name),W.set(D,Z))}function Fe(D,se){let Z=c.get(se).get(D);l.get(se)!==Z&&(r.uniformBlockBinding(se,Z,D.__bindingPointIndex),l.set(se,Z))}function st(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},te=null,ie={},u={},d=new WeakMap,f=[],g=null,y=!1,m=null,p=null,M=null,w=null,_=null,I=null,C=null,A=new he(0,0,0),R=0,S=!1,v=null,T=null,G=null,O=null,k=null,Oe.set(0,0,r.canvas.width,r.canvas.height),q.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:oe,disable:we,bindFramebuffer:Ye,drawBuffers:Te,useProgram:ft,setBlending:P,setMaterial:jt,setFlipSided:He,setCullFace:Ve,setLineWidth:be,setPolygonOffset:rt,setScissorTest:ve,activeTexture:E,bindTexture:x,unbindTexture:B,compressedTexImage2D:Y,compressedTexImage3D:K,texImage2D:fe,texImage3D:Ae,updateUBOMapping:Ge,uniformBlockBinding:Fe,texStorage2D:We,texStorage3D:Q,texSubImage2D:$,texSubImage3D:ye,compressedTexSubImage2D:ae,compressedTexSubImage3D:de,scissor:Ce,viewport:pe,reset:st}}function m0(r,e,t,n,i,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new xe,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,x){return f?new OffscreenCanvas(E,x):us("canvas")}function y(E,x,B){let Y=1,K=ve(E);if((K.width>B||K.height>B)&&(Y=B/Math.max(K.width,K.height)),Y<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let $=Math.floor(Y*K.width),ye=Math.floor(Y*K.height);u===void 0&&(u=g($,ye));let ae=x?g($,ye):u;return ae.width=$,ae.height=ye,ae.getContext("2d").drawImage(E,0,0,$,ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+$+"x"+ye+")."),ae}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),E;return E}function m(E){return E.generateMipmaps}function p(E){r.generateMipmap(E)}function M(E){return E.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?r.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function w(E,x,B,Y,K=!1){if(E!==null){if(r[E]!==void 0)return r[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let $=x;if(x===r.RED&&(B===r.FLOAT&&($=r.R32F),B===r.HALF_FLOAT&&($=r.R16F),B===r.UNSIGNED_BYTE&&($=r.R8)),x===r.RED_INTEGER&&(B===r.UNSIGNED_BYTE&&($=r.R8UI),B===r.UNSIGNED_SHORT&&($=r.R16UI),B===r.UNSIGNED_INT&&($=r.R32UI),B===r.BYTE&&($=r.R8I),B===r.SHORT&&($=r.R16I),B===r.INT&&($=r.R32I)),x===r.RG&&(B===r.FLOAT&&($=r.RG32F),B===r.HALF_FLOAT&&($=r.RG16F),B===r.UNSIGNED_BYTE&&($=r.RG8)),x===r.RG_INTEGER&&(B===r.UNSIGNED_BYTE&&($=r.RG8UI),B===r.UNSIGNED_SHORT&&($=r.RG16UI),B===r.UNSIGNED_INT&&($=r.RG32UI),B===r.BYTE&&($=r.RG8I),B===r.SHORT&&($=r.RG16I),B===r.INT&&($=r.RG32I)),x===r.RGB_INTEGER&&(B===r.UNSIGNED_BYTE&&($=r.RGB8UI),B===r.UNSIGNED_SHORT&&($=r.RGB16UI),B===r.UNSIGNED_INT&&($=r.RGB32UI),B===r.BYTE&&($=r.RGB8I),B===r.SHORT&&($=r.RGB16I),B===r.INT&&($=r.RGB32I)),x===r.RGBA_INTEGER&&(B===r.UNSIGNED_BYTE&&($=r.RGBA8UI),B===r.UNSIGNED_SHORT&&($=r.RGBA16UI),B===r.UNSIGNED_INT&&($=r.RGBA32UI),B===r.BYTE&&($=r.RGBA8I),B===r.SHORT&&($=r.RGBA16I),B===r.INT&&($=r.RGBA32I)),x===r.RGB&&B===r.UNSIGNED_INT_5_9_9_9_REV&&($=r.RGB9_E5),x===r.RGBA){let ye=K?Ks:ke.getTransfer(Y);B===r.FLOAT&&($=r.RGBA32F),B===r.HALF_FLOAT&&($=r.RGBA16F),B===r.UNSIGNED_BYTE&&($=ye===et?r.SRGB8_ALPHA8:r.RGBA8),B===r.UNSIGNED_SHORT_4_4_4_4&&($=r.RGBA4),B===r.UNSIGNED_SHORT_5_5_5_1&&($=r.RGB5_A1)}return($===r.R16F||$===r.R32F||$===r.RG16F||$===r.RG32F||$===r.RGBA16F||$===r.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function _(E,x){let B;return E?x===null||x===ui||x===Vi?B=r.DEPTH24_STENCIL8:x===Nt?B=r.DEPTH32F_STENCIL8:x===As&&(B=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ui||x===Vi?B=r.DEPTH_COMPONENT24:x===Nt?B=r.DEPTH_COMPONENT32F:x===As&&(B=r.DEPTH_COMPONENT16),B}function I(E,x){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==Lt&&E.minFilter!==Qe?Math.log2(Math.max(x.width,x.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?x.mipmaps.length:1}function C(E){let x=E.target;x.removeEventListener("dispose",C),R(x),x.isVideoTexture&&h.delete(x)}function A(E){let x=E.target;x.removeEventListener("dispose",A),v(x)}function R(E){let x=n.get(E);if(x.__webglInit===void 0)return;let B=E.source,Y=d.get(B);if(Y){let K=Y[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&S(E),Object.keys(Y).length===0&&d.delete(B)}n.remove(E)}function S(E){let x=n.get(E);r.deleteTexture(x.__webglTexture);let B=E.source,Y=d.get(B);delete Y[x.__cacheKey],o.memory.textures--}function v(E){let x=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(x.__webglFramebuffer[Y]))for(let K=0;K<x.__webglFramebuffer[Y].length;K++)r.deleteFramebuffer(x.__webglFramebuffer[Y][K]);else r.deleteFramebuffer(x.__webglFramebuffer[Y]);x.__webglDepthbuffer&&r.deleteRenderbuffer(x.__webglDepthbuffer[Y])}else{if(Array.isArray(x.__webglFramebuffer))for(let Y=0;Y<x.__webglFramebuffer.length;Y++)r.deleteFramebuffer(x.__webglFramebuffer[Y]);else r.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&r.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&r.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Y=0;Y<x.__webglColorRenderbuffer.length;Y++)x.__webglColorRenderbuffer[Y]&&r.deleteRenderbuffer(x.__webglColorRenderbuffer[Y]);x.__webglDepthRenderbuffer&&r.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let B=E.textures;for(let Y=0,K=B.length;Y<K;Y++){let $=n.get(B[Y]);$.__webglTexture&&(r.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(B[Y])}n.remove(E)}let T=0;function G(){T=0}function O(){let E=T;return E>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+i.maxTextures),T+=1,E}function k(E){let x=[];return x.push(E.wrapS),x.push(E.wrapT),x.push(E.wrapR||0),x.push(E.magFilter),x.push(E.minFilter),x.push(E.anisotropy),x.push(E.internalFormat),x.push(E.format),x.push(E.type),x.push(E.generateMipmaps),x.push(E.premultiplyAlpha),x.push(E.flipY),x.push(E.unpackAlignment),x.push(E.colorSpace),x.join()}function X(E,x){let B=n.get(E);if(E.isVideoTexture&&be(E),E.isRenderTargetTexture===!1&&E.version>0&&B.__version!==E.version){let Y=E.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(B,E,x);return}}t.bindTexture(r.TEXTURE_2D,B.__webglTexture,r.TEXTURE0+x)}function H(E,x){let B=n.get(E);if(E.version>0&&B.__version!==E.version){q(B,E,x);return}t.bindTexture(r.TEXTURE_2D_ARRAY,B.__webglTexture,r.TEXTURE0+x)}function j(E,x){let B=n.get(E);if(E.version>0&&B.__version!==E.version){q(B,E,x);return}t.bindTexture(r.TEXTURE_3D,B.__webglTexture,r.TEXTURE0+x)}function N(E,x){let B=n.get(E);if(E.version>0&&B.__version!==E.version){ee(B,E,x);return}t.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture,r.TEXTURE0+x)}let te={[ri]:r.REPEAT,[zt]:r.CLAMP_TO_EDGE,[hs]:r.MIRRORED_REPEAT},ie={[Lt]:r.NEAREST,[Wo]:r.NEAREST_MIPMAP_NEAREST,[Hi]:r.NEAREST_MIPMAP_LINEAR,[Qe]:r.LINEAR,[Es]:r.LINEAR_MIPMAP_NEAREST,[sn]:r.LINEAR_MIPMAP_LINEAR},_e={[Tu]:r.NEVER,[Du]:r.ALWAYS,[Cu]:r.LESS,[Nl]:r.LEQUAL,[Ru]:r.EQUAL,[Lu]:r.GEQUAL,[Iu]:r.GREATER,[Pu]:r.NOTEQUAL};function Ee(E,x){if(x.type===Nt&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Qe||x.magFilter===Es||x.magFilter===Hi||x.magFilter===sn||x.minFilter===Qe||x.minFilter===Es||x.minFilter===Hi||x.minFilter===sn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(E,r.TEXTURE_WRAP_S,te[x.wrapS]),r.texParameteri(E,r.TEXTURE_WRAP_T,te[x.wrapT]),(E===r.TEXTURE_3D||E===r.TEXTURE_2D_ARRAY)&&r.texParameteri(E,r.TEXTURE_WRAP_R,te[x.wrapR]),r.texParameteri(E,r.TEXTURE_MAG_FILTER,ie[x.magFilter]),r.texParameteri(E,r.TEXTURE_MIN_FILTER,ie[x.minFilter]),x.compareFunction&&(r.texParameteri(E,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(E,r.TEXTURE_COMPARE_FUNC,_e[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Lt||x.minFilter!==Hi&&x.minFilter!==sn||x.type===Nt&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");r.texParameterf(E,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,i.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Oe(E,x){let B=!1;E.__webglInit===void 0&&(E.__webglInit=!0,x.addEventListener("dispose",C));let Y=x.source,K=d.get(Y);K===void 0&&(K={},d.set(Y,K));let $=k(x);if($!==E.__cacheKey){K[$]===void 0&&(K[$]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,B=!0),K[$].usedTimes++;let ye=K[E.__cacheKey];ye!==void 0&&(K[E.__cacheKey].usedTimes--,ye.usedTimes===0&&S(x)),E.__cacheKey=$,E.__webglTexture=K[$].texture}return B}function q(E,x,B){let Y=r.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Y=r.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Y=r.TEXTURE_3D);let K=Oe(E,x),$=x.source;t.bindTexture(Y,E.__webglTexture,r.TEXTURE0+B);let ye=n.get($);if($.version!==ye.__version||K===!0){t.activeTexture(r.TEXTURE0+B);let ae=ke.getPrimaries(ke.workingColorSpace),de=x.colorSpace===Zn?null:ke.getPrimaries(x.colorSpace),We=x.colorSpace===Zn||ae===de?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,x.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,x.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,We);let Q=y(x.image,!1,i.maxTextureSize);Q=rt(x,Q);let fe=s.convert(x.format,x.colorSpace),Ae=s.convert(x.type),Ce=w(x.internalFormat,fe,Ae,x.colorSpace,x.isVideoTexture);Ee(Y,x);let pe,Ge=x.mipmaps,Fe=x.isVideoTexture!==!0,st=ye.__version===void 0||K===!0,D=$.dataReady,se=I(x,Q);if(x.isDepthTexture)Ce=_(x.format===Ai,x.type),st&&(Fe?t.texStorage2D(r.TEXTURE_2D,1,Ce,Q.width,Q.height):t.texImage2D(r.TEXTURE_2D,0,Ce,Q.width,Q.height,0,fe,Ae,null));else if(x.isDataTexture)if(Ge.length>0){Fe&&st&&t.texStorage2D(r.TEXTURE_2D,se,Ce,Ge[0].width,Ge[0].height);for(let W=0,Z=Ge.length;W<Z;W++)pe=Ge[W],Fe?D&&t.texSubImage2D(r.TEXTURE_2D,W,0,0,pe.width,pe.height,fe,Ae,pe.data):t.texImage2D(r.TEXTURE_2D,W,Ce,pe.width,pe.height,0,fe,Ae,pe.data);x.generateMipmaps=!1}else Fe?(st&&t.texStorage2D(r.TEXTURE_2D,se,Ce,Q.width,Q.height),D&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Q.width,Q.height,fe,Ae,Q.data)):t.texImage2D(r.TEXTURE_2D,0,Ce,Q.width,Q.height,0,fe,Ae,Q.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Fe&&st&&t.texStorage3D(r.TEXTURE_2D_ARRAY,se,Ce,Ge[0].width,Ge[0].height,Q.depth);for(let W=0,Z=Ge.length;W<Z;W++)if(pe=Ge[W],x.format!==Kt)if(fe!==null)if(Fe){if(D)if(x.layerUpdates.size>0){let ce=Gl(pe.width,pe.height,x.format,x.type);for(let le of x.layerUpdates){let De=pe.data.subarray(le*ce/pe.data.BYTES_PER_ELEMENT,(le+1)*ce/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,le,pe.width,pe.height,1,fe,De)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,0,pe.width,pe.height,Q.depth,fe,pe.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,W,Ce,pe.width,pe.height,Q.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?D&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,0,pe.width,pe.height,Q.depth,fe,Ae,pe.data):t.texImage3D(r.TEXTURE_2D_ARRAY,W,Ce,pe.width,pe.height,Q.depth,0,fe,Ae,pe.data)}else{Fe&&st&&t.texStorage2D(r.TEXTURE_2D,se,Ce,Ge[0].width,Ge[0].height);for(let W=0,Z=Ge.length;W<Z;W++)pe=Ge[W],x.format!==Kt?fe!==null?Fe?D&&t.compressedTexSubImage2D(r.TEXTURE_2D,W,0,0,pe.width,pe.height,fe,pe.data):t.compressedTexImage2D(r.TEXTURE_2D,W,Ce,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?D&&t.texSubImage2D(r.TEXTURE_2D,W,0,0,pe.width,pe.height,fe,Ae,pe.data):t.texImage2D(r.TEXTURE_2D,W,Ce,pe.width,pe.height,0,fe,Ae,pe.data)}else if(x.isDataArrayTexture)if(Fe){if(st&&t.texStorage3D(r.TEXTURE_2D_ARRAY,se,Ce,Q.width,Q.height,Q.depth),D)if(x.layerUpdates.size>0){let W=Gl(Q.width,Q.height,x.format,x.type);for(let Z of x.layerUpdates){let ce=Q.data.subarray(Z*W/Q.data.BYTES_PER_ELEMENT,(Z+1)*W/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Z,Q.width,Q.height,1,fe,Ae,ce)}x.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,fe,Ae,Q.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ce,Q.width,Q.height,Q.depth,0,fe,Ae,Q.data);else if(x.isData3DTexture)Fe?(st&&t.texStorage3D(r.TEXTURE_3D,se,Ce,Q.width,Q.height,Q.depth),D&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,fe,Ae,Q.data)):t.texImage3D(r.TEXTURE_3D,0,Ce,Q.width,Q.height,Q.depth,0,fe,Ae,Q.data);else if(x.isFramebufferTexture){if(st)if(Fe)t.texStorage2D(r.TEXTURE_2D,se,Ce,Q.width,Q.height);else{let W=Q.width,Z=Q.height;for(let ce=0;ce<se;ce++)t.texImage2D(r.TEXTURE_2D,ce,Ce,W,Z,0,fe,Ae,null),W>>=1,Z>>=1}}else if(Ge.length>0){if(Fe&&st){let W=ve(Ge[0]);t.texStorage2D(r.TEXTURE_2D,se,Ce,W.width,W.height)}for(let W=0,Z=Ge.length;W<Z;W++)pe=Ge[W],Fe?D&&t.texSubImage2D(r.TEXTURE_2D,W,0,0,fe,Ae,pe):t.texImage2D(r.TEXTURE_2D,W,Ce,fe,Ae,pe);x.generateMipmaps=!1}else if(Fe){if(st){let W=ve(Q);t.texStorage2D(r.TEXTURE_2D,se,Ce,W.width,W.height)}D&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,fe,Ae,Q)}else t.texImage2D(r.TEXTURE_2D,0,Ce,fe,Ae,Q);m(x)&&p(Y),ye.__version=$.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function ee(E,x,B){if(x.image.length!==6)return;let Y=Oe(E,x),K=x.source;t.bindTexture(r.TEXTURE_CUBE_MAP,E.__webglTexture,r.TEXTURE0+B);let $=n.get(K);if(K.version!==$.__version||Y===!0){t.activeTexture(r.TEXTURE0+B);let ye=ke.getPrimaries(ke.workingColorSpace),ae=x.colorSpace===Zn?null:ke.getPrimaries(x.colorSpace),de=x.colorSpace===Zn||ye===ae?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,x.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,x.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);let We=x.isCompressedTexture||x.image[0].isCompressedTexture,Q=x.image[0]&&x.image[0].isDataTexture,fe=[];for(let Z=0;Z<6;Z++)!We&&!Q?fe[Z]=y(x.image[Z],!0,i.maxCubemapSize):fe[Z]=Q?x.image[Z].image:x.image[Z],fe[Z]=rt(x,fe[Z]);let Ae=fe[0],Ce=s.convert(x.format,x.colorSpace),pe=s.convert(x.type),Ge=w(x.internalFormat,Ce,pe,x.colorSpace),Fe=x.isVideoTexture!==!0,st=$.__version===void 0||Y===!0,D=K.dataReady,se=I(x,Ae);Ee(r.TEXTURE_CUBE_MAP,x);let W;if(We){Fe&&st&&t.texStorage2D(r.TEXTURE_CUBE_MAP,se,Ge,Ae.width,Ae.height);for(let Z=0;Z<6;Z++){W=fe[Z].mipmaps;for(let ce=0;ce<W.length;ce++){let le=W[ce];x.format!==Kt?Ce!==null?Fe?D&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce,0,0,le.width,le.height,Ce,le.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce,Ge,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?D&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce,0,0,le.width,le.height,Ce,pe,le.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce,Ge,le.width,le.height,0,Ce,pe,le.data)}}}else{if(W=x.mipmaps,Fe&&st){W.length>0&&se++;let Z=ve(fe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,se,Ge,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(Q){Fe?D&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,fe[Z].width,fe[Z].height,Ce,pe,fe[Z].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ge,fe[Z].width,fe[Z].height,0,Ce,pe,fe[Z].data);for(let ce=0;ce<W.length;ce++){let De=W[ce].image[Z].image;Fe?D&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce+1,0,0,De.width,De.height,Ce,pe,De.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce+1,Ge,De.width,De.height,0,Ce,pe,De.data)}}else{Fe?D&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Ce,pe,fe[Z]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ge,Ce,pe,fe[Z]);for(let ce=0;ce<W.length;ce++){let le=W[ce];Fe?D&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce+1,0,0,Ce,pe,le.image[Z]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce+1,Ge,Ce,pe,le.image[Z])}}}m(x)&&p(r.TEXTURE_CUBE_MAP),$.__version=K.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function ge(E,x,B,Y,K,$){let ye=s.convert(B.format,B.colorSpace),ae=s.convert(B.type),de=w(B.internalFormat,ye,ae,B.colorSpace),We=n.get(x),Q=n.get(B);if(Q.__renderTarget=x,!We.__hasExternalTextures){let fe=Math.max(1,x.width>>$),Ae=Math.max(1,x.height>>$);K===r.TEXTURE_3D||K===r.TEXTURE_2D_ARRAY?t.texImage3D(K,$,de,fe,Ae,x.depth,0,ye,ae,null):t.texImage2D(K,$,de,fe,Ae,0,ye,ae,null)}t.bindFramebuffer(r.FRAMEBUFFER,E),Ve(x)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Y,K,Q.__webglTexture,0,He(x)):(K===r.TEXTURE_2D||K>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Y,K,Q.__webglTexture,$),t.bindFramebuffer(r.FRAMEBUFFER,null)}function oe(E,x,B){if(r.bindRenderbuffer(r.RENDERBUFFER,E),x.depthBuffer){let Y=x.depthTexture,K=Y&&Y.isDepthTexture?Y.type:null,$=_(x.stencilBuffer,K),ye=x.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ae=He(x);Ve(x)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ae,$,x.width,x.height):B?r.renderbufferStorageMultisample(r.RENDERBUFFER,ae,$,x.width,x.height):r.renderbufferStorage(r.RENDERBUFFER,$,x.width,x.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,ye,r.RENDERBUFFER,E)}else{let Y=x.textures;for(let K=0;K<Y.length;K++){let $=Y[K],ye=s.convert($.format,$.colorSpace),ae=s.convert($.type),de=w($.internalFormat,ye,ae,$.colorSpace),We=He(x);B&&Ve(x)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,We,de,x.width,x.height):Ve(x)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,We,de,x.width,x.height):r.renderbufferStorage(r.RENDERBUFFER,de,x.width,x.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function we(E,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,E),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Y=n.get(x.depthTexture);Y.__renderTarget=x,(!Y.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),X(x.depthTexture,0);let K=Y.__webglTexture,$=He(x);if(x.depthTexture.format===wi)Ve(x)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,K,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,K,0);else if(x.depthTexture.format===Ai)Ve(x)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,K,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Ye(E){let x=n.get(E),B=E.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==E.depthTexture){let Y=E.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Y){let K=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Y.removeEventListener("dispose",K)};Y.addEventListener("dispose",K),x.__depthDisposeCallback=K}x.__boundDepthTexture=Y}if(E.depthTexture&&!x.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");we(x.__webglFramebuffer,E)}else if(B){x.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(r.FRAMEBUFFER,x.__webglFramebuffer[Y]),x.__webglDepthbuffer[Y]===void 0)x.__webglDepthbuffer[Y]=r.createRenderbuffer(),oe(x.__webglDepthbuffer[Y],E,!1);else{let K=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,$=x.__webglDepthbuffer[Y];r.bindRenderbuffer(r.RENDERBUFFER,$),r.framebufferRenderbuffer(r.FRAMEBUFFER,K,r.RENDERBUFFER,$)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=r.createRenderbuffer(),oe(x.__webglDepthbuffer,E,!1);else{let Y=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,K=x.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,K),r.framebufferRenderbuffer(r.FRAMEBUFFER,Y,r.RENDERBUFFER,K)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Te(E,x,B){let Y=n.get(E);x!==void 0&&ge(Y.__webglFramebuffer,E,E.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),B!==void 0&&Ye(E)}function ft(E){let x=E.texture,B=n.get(E),Y=n.get(x);E.addEventListener("dispose",A);let K=E.textures,$=E.isWebGLCubeRenderTarget===!0,ye=K.length>1;if(ye||(Y.__webglTexture===void 0&&(Y.__webglTexture=r.createTexture()),Y.__version=x.version,o.memory.textures++),$){B.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer[ae]=[];for(let de=0;de<x.mipmaps.length;de++)B.__webglFramebuffer[ae][de]=r.createFramebuffer()}else B.__webglFramebuffer[ae]=r.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer=[];for(let ae=0;ae<x.mipmaps.length;ae++)B.__webglFramebuffer[ae]=r.createFramebuffer()}else B.__webglFramebuffer=r.createFramebuffer();if(ye)for(let ae=0,de=K.length;ae<de;ae++){let We=n.get(K[ae]);We.__webglTexture===void 0&&(We.__webglTexture=r.createTexture(),o.memory.textures++)}if(E.samples>0&&Ve(E)===!1){B.__webglMultisampledFramebuffer=r.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ae=0;ae<K.length;ae++){let de=K[ae];B.__webglColorRenderbuffer[ae]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,B.__webglColorRenderbuffer[ae]);let We=s.convert(de.format,de.colorSpace),Q=s.convert(de.type),fe=w(de.internalFormat,We,Q,de.colorSpace,E.isXRRenderTarget===!0),Ae=He(E);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ae,fe,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ae,r.RENDERBUFFER,B.__webglColorRenderbuffer[ae])}r.bindRenderbuffer(r.RENDERBUFFER,null),E.depthBuffer&&(B.__webglDepthRenderbuffer=r.createRenderbuffer(),oe(B.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if($){t.bindTexture(r.TEXTURE_CUBE_MAP,Y.__webglTexture),Ee(r.TEXTURE_CUBE_MAP,x);for(let ae=0;ae<6;ae++)if(x.mipmaps&&x.mipmaps.length>0)for(let de=0;de<x.mipmaps.length;de++)ge(B.__webglFramebuffer[ae][de],E,x,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,de);else ge(B.__webglFramebuffer[ae],E,x,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);m(x)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let ae=0,de=K.length;ae<de;ae++){let We=K[ae],Q=n.get(We);t.bindTexture(r.TEXTURE_2D,Q.__webglTexture),Ee(r.TEXTURE_2D,We),ge(B.__webglFramebuffer,E,We,r.COLOR_ATTACHMENT0+ae,r.TEXTURE_2D,0),m(We)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let ae=r.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ae=E.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ae,Y.__webglTexture),Ee(ae,x),x.mipmaps&&x.mipmaps.length>0)for(let de=0;de<x.mipmaps.length;de++)ge(B.__webglFramebuffer[de],E,x,r.COLOR_ATTACHMENT0,ae,de);else ge(B.__webglFramebuffer,E,x,r.COLOR_ATTACHMENT0,ae,0);m(x)&&p(ae),t.unbindTexture()}E.depthBuffer&&Ye(E)}function lt(E){let x=E.textures;for(let B=0,Y=x.length;B<Y;B++){let K=x[B];if(m(K)){let $=M(E),ye=n.get(K).__webglTexture;t.bindTexture($,ye),p($),t.unbindTexture()}}}let ze=[],P=[];function jt(E){if(E.samples>0){if(Ve(E)===!1){let x=E.textures,B=E.width,Y=E.height,K=r.COLOR_BUFFER_BIT,$=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ye=n.get(E),ae=x.length>1;if(ae)for(let de=0;de<x.length;de++)t.bindFramebuffer(r.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,ye.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let de=0;de<x.length;de++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(K|=r.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(K|=r.STENCIL_BUFFER_BIT)),ae){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ye.__webglColorRenderbuffer[de]);let We=n.get(x[de]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,We,0)}r.blitFramebuffer(0,0,B,Y,0,0,B,Y,K,r.NEAREST),l===!0&&(ze.length=0,P.length=0,ze.push(r.COLOR_ATTACHMENT0+de),E.depthBuffer&&E.resolveDepthBuffer===!1&&(ze.push($),P.push($),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,P)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ze))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ae)for(let de=0;de<x.length;de++){t.bindFramebuffer(r.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.RENDERBUFFER,ye.__webglColorRenderbuffer[de]);let We=n.get(x[de]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,ye.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.TEXTURE_2D,We,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){let x=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[x])}}}function He(E){return Math.min(i.maxSamples,E.samples)}function Ve(E){let x=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function be(E){let x=o.render.frame;h.get(E)!==x&&(h.set(E,x),E.update())}function rt(E,x){let B=E.colorSpace,Y=E.format,K=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||B!==pt&&B!==Zn&&(ke.getTransfer(B)===et?(Y!==Kt||K!==Cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),x}function ve(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=G,this.setTexture2D=X,this.setTexture2DArray=H,this.setTexture3D=j,this.setTextureCube=N,this.rebindTextures=Te,this.setupRenderTarget=ft,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=jt,this.setupDepthRenderbuffer=Ye,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=Ve}function g0(r,e){function t(n,i=Zn){let s,o=ke.getTransfer(i);if(n===Cn)return r.UNSIGNED_BYTE;if(n===qo)return r.UNSIGNED_SHORT_4_4_4_4;if(n===$o)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Tl)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===El)return r.BYTE;if(n===Al)return r.SHORT;if(n===As)return r.UNSIGNED_SHORT;if(n===Xo)return r.INT;if(n===ui)return r.UNSIGNED_INT;if(n===Nt)return r.FLOAT;if(n===vn)return r.HALF_FLOAT;if(n===Cl)return r.ALPHA;if(n===Rl)return r.RGB;if(n===Kt)return r.RGBA;if(n===Il)return r.LUMINANCE;if(n===Pl)return r.LUMINANCE_ALPHA;if(n===wi)return r.DEPTH_COMPONENT;if(n===Ai)return r.DEPTH_STENCIL;if(n===Yo)return r.RED;if(n===Zo)return r.RED_INTEGER;if(n===Ll)return r.RG;if(n===Ko)return r.RG_INTEGER;if(n===jo)return r.RGBA_INTEGER;if(n===Cr||n===Rr||n===Ir||n===Pr)if(o===et)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Cr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Rr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ir)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Pr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Cr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Rr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ir)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Pr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Jo||n===Qo||n===ea||n===ta)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Jo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Qo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ea)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ta)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===na||n===ia||n===sa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===na||n===ia)return o===et?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===sa)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ra||n===oa||n===aa||n===la||n===ca||n===ha||n===ua||n===da||n===fa||n===pa||n===ma||n===ga||n===ya||n===_a)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ra)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===oa)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===aa)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===la)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ca)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ha)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ua)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===da)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===fa)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===pa)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ma)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ga)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ya)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===_a)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Lr||n===xa||n===va)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Lr)return o===et?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===va)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Dl||n===ba||n===Sa||n===Ma)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Lr)return s.COMPRESSED_RED_RGTC1_EXT;if(n===ba)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Sa)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ma)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Vi?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}var y0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_0=`
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

}`,nc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let i=new bt,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new _n({vertexShader:y0,fragmentShader:_0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Mt(new Pi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ic=class extends mn{constructor(e,t){super();let n=this,i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null,y=new nc,m=t.getContextAttributes(),p=null,M=null,w=[],_=[],I=new xe,C=null,A=new yt;A.viewport=new $e;let R=new yt;R.viewport=new $e;let S=[A,R],v=new Po,T=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ee=w[q];return ee===void 0&&(ee=new ms,w[q]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(q){let ee=w[q];return ee===void 0&&(ee=new ms,w[q]=ee),ee.getGripSpace()},this.getHand=function(q){let ee=w[q];return ee===void 0&&(ee=new ms,w[q]=ee),ee.getHandSpace()};function O(q){let ee=_.indexOf(q.inputSource);if(ee===-1)return;let ge=w[ee];ge!==void 0&&(ge.update(q.inputSource,q.frame,c||o),ge.dispatchEvent({type:q.type,data:q.inputSource}))}function k(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",k),i.removeEventListener("inputsourceschange",X);for(let q=0;q<w.length;q++){let ee=_[q];ee!==null&&(_[q]=null,w[q].disconnect(ee))}T=null,G=null,y.reset(),e.setRenderTarget(p),f=null,d=null,u=null,i=null,M=null,Oe.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",k),i.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(I),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let ge=null,oe=null,we=null;m.depth&&(we=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ge=m.stencil?Ai:wi,oe=m.stencil?Vi:ui);let Ye={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:s};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Ye),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new Sn(d.textureWidth,d.textureHeight,{format:Kt,type:Cn,depthTexture:new lr(d.textureWidth,d.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let ge={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,ge),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Sn(f.framebufferWidth,f.framebufferHeight,{format:Kt,type:Cn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Oe.setContext(i),Oe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function X(q){for(let ee=0;ee<q.removed.length;ee++){let ge=q.removed[ee],oe=_.indexOf(ge);oe>=0&&(_[oe]=null,w[oe].disconnect(ge))}for(let ee=0;ee<q.added.length;ee++){let ge=q.added[ee],oe=_.indexOf(ge);if(oe===-1){for(let Ye=0;Ye<w.length;Ye++)if(Ye>=_.length){_.push(ge),oe=Ye;break}else if(_[Ye]===null){_[Ye]=ge,oe=Ye;break}if(oe===-1)break}let we=w[oe];we&&we.connect(ge)}}let H=new L,j=new L;function N(q,ee,ge){H.setFromMatrixPosition(ee.matrixWorld),j.setFromMatrixPosition(ge.matrixWorld);let oe=H.distanceTo(j),we=ee.projectionMatrix.elements,Ye=ge.projectionMatrix.elements,Te=we[14]/(we[10]-1),ft=we[14]/(we[10]+1),lt=(we[9]+1)/we[5],ze=(we[9]-1)/we[5],P=(we[8]-1)/we[0],jt=(Ye[8]+1)/Ye[0],He=Te*P,Ve=Te*jt,be=oe/(-P+jt),rt=be*-P;if(ee.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(rt),q.translateZ(be),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),we[10]===-1)q.projectionMatrix.copy(ee.projectionMatrix),q.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{let ve=Te+be,E=ft+be,x=He-rt,B=Ve+(oe-rt),Y=lt*ft/E*ve,K=ze*ft/E*ve;q.projectionMatrix.makePerspective(x,B,Y,K,ve,E),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function te(q,ee){ee===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ee.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;let ee=q.near,ge=q.far;y.texture!==null&&(y.depthNear>0&&(ee=y.depthNear),y.depthFar>0&&(ge=y.depthFar)),v.near=R.near=A.near=ee,v.far=R.far=A.far=ge,(T!==v.near||G!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),T=v.near,G=v.far),A.layers.mask=q.layers.mask|2,R.layers.mask=q.layers.mask|4,v.layers.mask=A.layers.mask|R.layers.mask;let oe=q.parent,we=v.cameras;te(v,oe);for(let Ye=0;Ye<we.length;Ye++)te(we[Ye],oe);we.length===2?N(v,A,R):v.projectionMatrix.copy(A.projectionMatrix),ie(q,v,oe)};function ie(q,ee,ge){ge===null?q.matrix.copy(ee.matrixWorld):(q.matrix.copy(ge.matrixWorld),q.matrix.invert(),q.matrix.multiply(ee.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ee.projectionMatrix),q.projectionMatrixInverse.copy(ee.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Ri*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(v)};let _e=null;function Ee(q,ee){if(h=ee.getViewerPose(c||o),g=ee,h!==null){let ge=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let oe=!1;ge.length!==v.cameras.length&&(v.cameras.length=0,oe=!0);for(let Te=0;Te<ge.length;Te++){let ft=ge[Te],lt=null;if(f!==null)lt=f.getViewport(ft);else{let P=u.getViewSubImage(d,ft);lt=P.viewport,Te===0&&(e.setRenderTargetTextures(M,P.colorTexture,d.ignoreDepthValues?void 0:P.depthStencilTexture),e.setRenderTarget(M))}let ze=S[Te];ze===void 0&&(ze=new yt,ze.layers.enable(Te),ze.viewport=new $e,S[Te]=ze),ze.matrix.fromArray(ft.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray(ft.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(lt.x,lt.y,lt.width,lt.height),Te===0&&(v.matrix.copy(ze.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),oe===!0&&v.cameras.push(ze)}let we=i.enabledFeatures;if(we&&we.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&u){let Te=u.getDepthInformation(ge[0]);Te&&Te.isValid&&Te.texture&&y.init(e,Te,i.renderState)}}for(let ge=0;ge<w.length;ge++){let oe=_[ge],we=w[ge];oe!==null&&we!==void 0&&we.update(oe,ee,c||o)}_e&&_e(q,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),g=null}let Oe=new ud;Oe.setAnimationLoop(Ee),this.setAnimationLoop=function(q){_e=q},this.dispose=function(){}}},Xi=new gn,x0=new Pe;function v0(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,zl(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,M,w,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),y(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,M,w):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===It&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===It&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let M=e.get(p),w=M.envMap,_=M.envMapRotation;w&&(m.envMap.value=w,Xi.copy(_),Xi.x*=-1,Xi.y*=-1,Xi.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Xi.y*=-1,Xi.z*=-1),m.envMapRotation.value.setFromMatrix4(x0.makeRotationFromEuler(Xi)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===It&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){let M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function b0(r,e,t,n){let i={},s={},o=[],a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,w){let _=w.program;n.uniformBlockBinding(M,_)}function c(M,w){let _=i[M.id];_===void 0&&(g(M),_=h(M),i[M.id]=_,M.addEventListener("dispose",m));let I=w.program;n.updateUBOMapping(M,I);let C=e.render.frame;s[M.id]!==C&&(d(M),s[M.id]=C)}function h(M){let w=u();M.__bindingPointIndex=w;let _=r.createBuffer(),I=M.__size,C=M.usage;return r.bindBuffer(r.UNIFORM_BUFFER,_),r.bufferData(r.UNIFORM_BUFFER,I,C),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,w,_),_}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){let w=i[M.id],_=M.uniforms,I=M.__cache;r.bindBuffer(r.UNIFORM_BUFFER,w);for(let C=0,A=_.length;C<A;C++){let R=Array.isArray(_[C])?_[C]:[_[C]];for(let S=0,v=R.length;S<v;S++){let T=R[S];if(f(T,C,S,I)===!0){let G=T.__offset,O=Array.isArray(T.value)?T.value:[T.value],k=0;for(let X=0;X<O.length;X++){let H=O[X],j=y(H);typeof H=="number"||typeof H=="boolean"?(T.__data[0]=H,r.bufferSubData(r.UNIFORM_BUFFER,G+k,T.__data)):H.isMatrix3?(T.__data[0]=H.elements[0],T.__data[1]=H.elements[1],T.__data[2]=H.elements[2],T.__data[3]=0,T.__data[4]=H.elements[3],T.__data[5]=H.elements[4],T.__data[6]=H.elements[5],T.__data[7]=0,T.__data[8]=H.elements[6],T.__data[9]=H.elements[7],T.__data[10]=H.elements[8],T.__data[11]=0):(H.toArray(T.__data,k),k+=j.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,G,T.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(M,w,_,I){let C=M.value,A=w+"_"+_;if(I[A]===void 0)return typeof C=="number"||typeof C=="boolean"?I[A]=C:I[A]=C.clone(),!0;{let R=I[A];if(typeof C=="number"||typeof C=="boolean"){if(R!==C)return I[A]=C,!0}else if(R.equals(C)===!1)return R.copy(C),!0}return!1}function g(M){let w=M.uniforms,_=0,I=16;for(let A=0,R=w.length;A<R;A++){let S=Array.isArray(w[A])?w[A]:[w[A]];for(let v=0,T=S.length;v<T;v++){let G=S[v],O=Array.isArray(G.value)?G.value:[G.value];for(let k=0,X=O.length;k<X;k++){let H=O[k],j=y(H),N=_%I,te=N%j.boundary,ie=N+te;_+=te,ie!==0&&I-ie<j.storage&&(_+=I-ie),G.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=_,_+=j.storage}}}let C=_%I;return C>0&&(_+=I-C),M.__size=_,M.__cache={},this}function y(M){let w={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(w.boundary=4,w.storage=4):M.isVector2?(w.boundary=8,w.storage=8):M.isVector3||M.isColor?(w.boundary=16,w.storage=12):M.isVector4?(w.boundary=16,w.storage=16):M.isMatrix3?(w.boundary=48,w.storage=48):M.isMatrix4?(w.boundary=64,w.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),w}function m(M){let w=M.target;w.removeEventListener("dispose",m);let _=o.indexOf(w.__bindingPointIndex);o.splice(_,1),r.deleteBuffer(i[w.id]),delete i[w.id],delete s[w.id]}function p(){for(let M in i)r.deleteBuffer(i[M]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}var Ps=class{constructor(e={}){let{canvas:t=Fu(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),y=new Int32Array(4),m=null,p=null,M=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=dt,this.toneMapping=Yn,this.toneMappingExposure=1;let _=this,I=!1,C=0,A=0,R=null,S=-1,v=null,T=new $e,G=new $e,O=null,k=new he(0),X=0,H=t.width,j=t.height,N=1,te=null,ie=null,_e=new $e(0,0,H,j),Ee=new $e(0,0,H,j),Oe=!1,q=new vs,ee=!1,ge=!1;this.transmissionResolutionScale=1;let oe=new Pe,we=new Pe,Ye=new L,Te=new $e,ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},lt=!1;function ze(){return R===null?N:1}let P=n;function jt(b,F){return t.getContext(b,F)}try{let b={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"174"}`),t.addEventListener("webglcontextlost",Z,!1),t.addEventListener("webglcontextrestored",ce,!1),t.addEventListener("webglcontextcreationerror",le,!1),P===null){let F="webgl2";if(P=jt(F,b),P===null)throw jt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let He,Ve,be,rt,ve,E,x,B,Y,K,$,ye,ae,de,We,Q,fe,Ae,Ce,pe,Ge,Fe,st,D;function se(){He=new kg(P),He.init(),Fe=new g0(P,He),Ve=new Lg(P,He,e,Fe),be=new p0(P,He),Ve.reverseDepthBuffer&&d&&be.buffers.depth.setReversed(!0),rt=new Vg(P),ve=new t0,E=new m0(P,He,be,ve,Ve,Fe,rt),x=new Fg(_),B=new Bg(_),Y=new Yf(P),st=new Ig(P,Y),K=new zg(P,Y,rt,st),$=new Wg(P,K,Y,rt),Ce=new Gg(P,Ve,E),Q=new Dg(ve),ye=new e0(_,x,B,He,Ve,st,Q),ae=new v0(_,ve),de=new i0,We=new c0(He),Ae=new Rg(_,x,B,be,$,f,l),fe=new d0(_,$,Ve),D=new b0(P,rt,Ve,be),pe=new Pg(P,He,rt),Ge=new Hg(P,He,rt),rt.programs=ye.programs,_.capabilities=Ve,_.extensions=He,_.properties=ve,_.renderLists=de,_.shadowMap=fe,_.state=be,_.info=rt}se();let W=new ic(_,P);this.xr=W,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let b=He.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=He.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(b){b!==void 0&&(N=b,this.setSize(H,j,!1))},this.getSize=function(b){return b.set(H,j)},this.setSize=function(b,F,z=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=b,j=F,t.width=Math.floor(b*N),t.height=Math.floor(F*N),z===!0&&(t.style.width=b+"px",t.style.height=F+"px"),this.setViewport(0,0,b,F)},this.getDrawingBufferSize=function(b){return b.set(H*N,j*N).floor()},this.setDrawingBufferSize=function(b,F,z){H=b,j=F,N=z,t.width=Math.floor(b*z),t.height=Math.floor(F*z),this.setViewport(0,0,b,F)},this.getCurrentViewport=function(b){return b.copy(T)},this.getViewport=function(b){return b.copy(_e)},this.setViewport=function(b,F,z,V){b.isVector4?_e.set(b.x,b.y,b.z,b.w):_e.set(b,F,z,V),be.viewport(T.copy(_e).multiplyScalar(N).round())},this.getScissor=function(b){return b.copy(Ee)},this.setScissor=function(b,F,z,V){b.isVector4?Ee.set(b.x,b.y,b.z,b.w):Ee.set(b,F,z,V),be.scissor(G.copy(Ee).multiplyScalar(N).round())},this.getScissorTest=function(){return Oe},this.setScissorTest=function(b){be.setScissorTest(Oe=b)},this.setOpaqueSort=function(b){te=b},this.setTransparentSort=function(b){ie=b},this.getClearColor=function(b){return b.copy(Ae.getClearColor())},this.setClearColor=function(){Ae.setClearColor(...arguments)},this.getClearAlpha=function(){return Ae.getClearAlpha()},this.setClearAlpha=function(){Ae.setClearAlpha(...arguments)},this.clear=function(b=!0,F=!0,z=!0){let V=0;if(b){let U=!1;if(R!==null){let J=R.texture.format;U=J===jo||J===Ko||J===Zo}if(U){let J=R.texture.type,re=J===Cn||J===ui||J===As||J===Vi||J===qo||J===$o,ue=Ae.getClearColor(),me=Ae.getClearAlpha(),Re=ue.r,Ie=ue.g,Se=ue.b;re?(g[0]=Re,g[1]=Ie,g[2]=Se,g[3]=me,P.clearBufferuiv(P.COLOR,0,g)):(y[0]=Re,y[1]=Ie,y[2]=Se,y[3]=me,P.clearBufferiv(P.COLOR,0,y))}else V|=P.COLOR_BUFFER_BIT}F&&(V|=P.DEPTH_BUFFER_BIT),z&&(V|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Z,!1),t.removeEventListener("webglcontextrestored",ce,!1),t.removeEventListener("webglcontextcreationerror",le,!1),Ae.dispose(),de.dispose(),We.dispose(),ve.dispose(),x.dispose(),B.dispose(),$.dispose(),st.dispose(),D.dispose(),ye.dispose(),W.dispose(),W.removeEventListener("sessionstart",Jc),W.removeEventListener("sessionend",Qc),mi.stop()};function Z(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function ce(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;let b=rt.autoReset,F=fe.enabled,z=fe.autoUpdate,V=fe.needsUpdate,U=fe.type;se(),rt.autoReset=b,fe.enabled=F,fe.autoUpdate=z,fe.needsUpdate=V,fe.type=U}function le(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function De(b){let F=b.target;F.removeEventListener("dispose",De),ht(F)}function ht(b){Dt(b),ve.remove(b)}function Dt(b){let F=ve.get(b).programs;F!==void 0&&(F.forEach(function(z){ye.releaseProgram(z)}),b.isShaderMaterial&&ye.releaseShaderCache(b))}this.renderBufferDirect=function(b,F,z,V,U,J){F===null&&(F=ft);let re=U.isMesh&&U.matrixWorld.determinant()<0,ue=Ld(b,F,z,V,U);be.setMaterial(V,re);let me=z.index,Re=1;if(V.wireframe===!0){if(me=K.getWireframeAttribute(z),me===void 0)return;Re=2}let Ie=z.drawRange,Se=z.attributes.position,Xe=Ie.start*Re,Ze=(Ie.start+Ie.count)*Re;J!==null&&(Xe=Math.max(Xe,J.start*Re),Ze=Math.min(Ze,(J.start+J.count)*Re)),me!==null?(Xe=Math.max(Xe,0),Ze=Math.min(Ze,me.count)):Se!=null&&(Xe=Math.max(Xe,0),Ze=Math.min(Ze,Se.count));let mt=Ze-Xe;if(mt<0||mt===1/0)return;st.setup(U,V,ue,z,me);let ut,qe=pe;if(me!==null&&(ut=Y.get(me),qe=Ge,qe.setIndex(ut)),U.isMesh)V.wireframe===!0?(be.setLineWidth(V.wireframeLinewidth*ze()),qe.setMode(P.LINES)):qe.setMode(P.TRIANGLES);else if(U.isLine){let Me=V.linewidth;Me===void 0&&(Me=1),be.setLineWidth(Me*ze()),U.isLineSegments?qe.setMode(P.LINES):U.isLineLoop?qe.setMode(P.LINE_LOOP):qe.setMode(P.LINE_STRIP)}else U.isPoints?qe.setMode(P.POINTS):U.isSprite&&qe.setMode(P.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)di("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),qe.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(He.get("WEBGL_multi_draw"))qe.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{let Me=U._multiDrawStarts,Pt=U._multiDrawCounts,Ke=U._multiDrawCount,an=me?Y.get(me).bytesPerElement:1,Zi=ve.get(V).currentProgram.getUniforms();for(let Xt=0;Xt<Ke;Xt++)Zi.setValue(P,"_gl_DrawID",Xt),qe.render(Me[Xt]/an,Pt[Xt])}else if(U.isInstancedMesh)qe.renderInstances(Xe,mt,U.count);else if(z.isInstancedBufferGeometry){let Me=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Pt=Math.min(z.instanceCount,Me);qe.renderInstances(Xe,mt,Pt)}else qe.render(Xe,mt)};function je(b,F,z){b.transparent===!0&&b.side===nt&&b.forceSinglePass===!1?(b.side=It,b.needsUpdate=!0,zr(b,F,z),b.side=vt,b.needsUpdate=!0,zr(b,F,z),b.side=nt):zr(b,F,z)}this.compile=function(b,F,z=null){z===null&&(z=b),p=We.get(z),p.init(F),w.push(p),z.traverseVisible(function(U){U.isLight&&U.layers.test(F.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),b!==z&&b.traverseVisible(function(U){U.isLight&&U.layers.test(F.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),p.setupLights();let V=new Set;return b.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;let J=U.material;if(J)if(Array.isArray(J))for(let re=0;re<J.length;re++){let ue=J[re];je(ue,z,U),V.add(ue)}else je(J,z,U),V.add(J)}),p=w.pop(),V},this.compileAsync=function(b,F,z=null){let V=this.compile(b,F,z);return new Promise(U=>{function J(){if(V.forEach(function(re){ve.get(re).currentProgram.isReady()&&V.delete(re)}),V.size===0){U(b);return}setTimeout(J,10)}He.get("KHR_parallel_shader_compile")!==null?J():setTimeout(J,10)})};let on=null;function Pn(b){on&&on(b)}function Jc(){mi.stop()}function Qc(){mi.start()}let mi=new ud;mi.setAnimationLoop(Pn),typeof self<"u"&&mi.setContext(self),this.setAnimationLoop=function(b){on=b,W.setAnimationLoop(b),b===null?mi.stop():mi.start()},W.addEventListener("sessionstart",Jc),W.addEventListener("sessionend",Qc),this.render=function(b,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(F),F=W.getCamera()),b.isScene===!0&&b.onBeforeRender(_,b,F,R),p=We.get(b,w.length),p.init(F),w.push(p),we.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),q.setFromProjectionMatrix(we),ge=this.localClippingEnabled,ee=Q.init(this.clippingPlanes,ge),m=de.get(b,M.length),m.init(),M.push(m),W.enabled===!0&&W.isPresenting===!0){let J=_.xr.getDepthSensingMesh();J!==null&&Ba(J,F,-1/0,_.sortObjects)}Ba(b,F,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(te,ie),lt=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,lt&&Ae.addToRenderList(m,b),this.info.render.frame++,ee===!0&&Q.beginShadows();let z=p.state.shadowsArray;fe.render(z,b,F),ee===!0&&Q.endShadows(),this.info.autoReset===!0&&this.info.reset();let V=m.opaque,U=m.transmissive;if(p.setupLights(),F.isArrayCamera){let J=F.cameras;if(U.length>0)for(let re=0,ue=J.length;re<ue;re++){let me=J[re];th(V,U,b,me)}lt&&Ae.render(b);for(let re=0,ue=J.length;re<ue;re++){let me=J[re];eh(m,b,me,me.viewport)}}else U.length>0&&th(V,U,b,F),lt&&Ae.render(b),eh(m,b,F);R!==null&&A===0&&(E.updateMultisampleRenderTarget(R),E.updateRenderTargetMipmap(R)),b.isScene===!0&&b.onAfterRender(_,b,F),st.resetDefaultState(),S=-1,v=null,w.pop(),w.length>0?(p=w[w.length-1],ee===!0&&Q.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function Ba(b,F,z,V){if(b.visible===!1)return;if(b.layers.test(F.layers)){if(b.isGroup)z=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(F);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||q.intersectsSprite(b)){V&&Te.setFromMatrixPosition(b.matrixWorld).applyMatrix4(we);let re=$.update(b),ue=b.material;ue.visible&&m.push(b,re,ue,z,Te.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||q.intersectsObject(b))){let re=$.update(b),ue=b.material;if(V&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Te.copy(b.boundingSphere.center)):(re.boundingSphere===null&&re.computeBoundingSphere(),Te.copy(re.boundingSphere.center)),Te.applyMatrix4(b.matrixWorld).applyMatrix4(we)),Array.isArray(ue)){let me=re.groups;for(let Re=0,Ie=me.length;Re<Ie;Re++){let Se=me[Re],Xe=ue[Se.materialIndex];Xe&&Xe.visible&&m.push(b,re,Xe,z,Te.z,Se)}}else ue.visible&&m.push(b,re,ue,z,Te.z,null)}}let J=b.children;for(let re=0,ue=J.length;re<ue;re++)Ba(J[re],F,z,V)}function eh(b,F,z,V){let U=b.opaque,J=b.transmissive,re=b.transparent;p.setupLightsView(z),ee===!0&&Q.setGlobalState(_.clippingPlanes,z),V&&be.viewport(T.copy(V)),U.length>0&&kr(U,F,z),J.length>0&&kr(J,F,z),re.length>0&&kr(re,F,z),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function th(b,F,z,V){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[V.id]===void 0&&(p.state.transmissionRenderTarget[V.id]=new Sn(1,1,{generateMipmaps:!0,type:He.has("EXT_color_buffer_half_float")||He.has("EXT_color_buffer_float")?vn:Cn,minFilter:sn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ke.workingColorSpace}));let J=p.state.transmissionRenderTarget[V.id],re=V.viewport||T;J.setSize(re.z*_.transmissionResolutionScale,re.w*_.transmissionResolutionScale);let ue=_.getRenderTarget();_.setRenderTarget(J),_.getClearColor(k),X=_.getClearAlpha(),X<1&&_.setClearColor(16777215,.5),_.clear(),lt&&Ae.render(z);let me=_.toneMapping;_.toneMapping=Yn;let Re=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),p.setupLightsView(V),ee===!0&&Q.setGlobalState(_.clippingPlanes,V),kr(b,z,V),E.updateMultisampleRenderTarget(J),E.updateRenderTargetMipmap(J),He.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let Se=0,Xe=F.length;Se<Xe;Se++){let Ze=F[Se],mt=Ze.object,ut=Ze.geometry,qe=Ze.material,Me=Ze.group;if(qe.side===nt&&mt.layers.test(V.layers)){let Pt=qe.side;qe.side=It,qe.needsUpdate=!0,nh(mt,z,V,ut,qe,Me),qe.side=Pt,qe.needsUpdate=!0,Ie=!0}}Ie===!0&&(E.updateMultisampleRenderTarget(J),E.updateRenderTargetMipmap(J))}_.setRenderTarget(ue),_.setClearColor(k,X),Re!==void 0&&(V.viewport=Re),_.toneMapping=me}function kr(b,F,z){let V=F.isScene===!0?F.overrideMaterial:null;for(let U=0,J=b.length;U<J;U++){let re=b[U],ue=re.object,me=re.geometry,Re=V===null?re.material:V,Ie=re.group;ue.layers.test(z.layers)&&nh(ue,F,z,me,Re,Ie)}}function nh(b,F,z,V,U,J){b.onBeforeRender(_,F,z,V,U,J),b.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),U.onBeforeRender(_,F,z,V,b,J),U.transparent===!0&&U.side===nt&&U.forceSinglePass===!1?(U.side=It,U.needsUpdate=!0,_.renderBufferDirect(z,F,V,U,b,J),U.side=vt,U.needsUpdate=!0,_.renderBufferDirect(z,F,V,U,b,J),U.side=nt):_.renderBufferDirect(z,F,V,U,b,J),b.onAfterRender(_,F,z,V,U,J)}function zr(b,F,z){F.isScene!==!0&&(F=ft);let V=ve.get(b),U=p.state.lights,J=p.state.shadowsArray,re=U.state.version,ue=ye.getParameters(b,U.state,J,F,z),me=ye.getProgramCacheKey(ue),Re=V.programs;V.environment=b.isMeshStandardMaterial?F.environment:null,V.fog=F.fog,V.envMap=(b.isMeshStandardMaterial?B:x).get(b.envMap||V.environment),V.envMapRotation=V.environment!==null&&b.envMap===null?F.environmentRotation:b.envMapRotation,Re===void 0&&(b.addEventListener("dispose",De),Re=new Map,V.programs=Re);let Ie=Re.get(me);if(Ie!==void 0){if(V.currentProgram===Ie&&V.lightsStateVersion===re)return sh(b,ue),Ie}else ue.uniforms=ye.getUniforms(b),b.onBeforeCompile(ue,_),Ie=ye.acquireProgram(ue,me),Re.set(me,Ie),V.uniforms=ue.uniforms;let Se=V.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Se.clippingPlanes=Q.uniform),sh(b,ue),V.needsLights=Fd(b),V.lightsStateVersion=re,V.needsLights&&(Se.ambientLightColor.value=U.state.ambient,Se.lightProbe.value=U.state.probe,Se.directionalLights.value=U.state.directional,Se.directionalLightShadows.value=U.state.directionalShadow,Se.spotLights.value=U.state.spot,Se.spotLightShadows.value=U.state.spotShadow,Se.rectAreaLights.value=U.state.rectArea,Se.ltc_1.value=U.state.rectAreaLTC1,Se.ltc_2.value=U.state.rectAreaLTC2,Se.pointLights.value=U.state.point,Se.pointLightShadows.value=U.state.pointShadow,Se.hemisphereLights.value=U.state.hemi,Se.directionalShadowMap.value=U.state.directionalShadowMap,Se.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Se.spotShadowMap.value=U.state.spotShadowMap,Se.spotLightMatrix.value=U.state.spotLightMatrix,Se.spotLightMap.value=U.state.spotLightMap,Se.pointShadowMap.value=U.state.pointShadowMap,Se.pointShadowMatrix.value=U.state.pointShadowMatrix),V.currentProgram=Ie,V.uniformsList=null,Ie}function ih(b){if(b.uniformsList===null){let F=b.currentProgram.getUniforms();b.uniformsList=Is.seqWithValue(F.seq,b.uniforms)}return b.uniformsList}function sh(b,F){let z=ve.get(b);z.outputColorSpace=F.outputColorSpace,z.batching=F.batching,z.batchingColor=F.batchingColor,z.instancing=F.instancing,z.instancingColor=F.instancingColor,z.instancingMorph=F.instancingMorph,z.skinning=F.skinning,z.morphTargets=F.morphTargets,z.morphNormals=F.morphNormals,z.morphColors=F.morphColors,z.morphTargetsCount=F.morphTargetsCount,z.numClippingPlanes=F.numClippingPlanes,z.numIntersection=F.numClipIntersection,z.vertexAlphas=F.vertexAlphas,z.vertexTangents=F.vertexTangents,z.toneMapping=F.toneMapping}function Ld(b,F,z,V,U){F.isScene!==!0&&(F=ft),E.resetTextureUnits();let J=F.fog,re=V.isMeshStandardMaterial?F.environment:null,ue=R===null?_.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:pt,me=(V.isMeshStandardMaterial?B:x).get(V.envMap||re),Re=V.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Ie=!!z.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Se=!!z.morphAttributes.position,Xe=!!z.morphAttributes.normal,Ze=!!z.morphAttributes.color,mt=Yn;V.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(mt=_.toneMapping);let ut=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,qe=ut!==void 0?ut.length:0,Me=ve.get(V),Pt=p.state.lights;if(ee===!0&&(ge===!0||b!==v)){let Bt=b===v&&V.id===S;Q.setState(V,b,Bt)}let Ke=!1;V.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==Pt.state.version||Me.outputColorSpace!==ue||U.isBatchedMesh&&Me.batching===!1||!U.isBatchedMesh&&Me.batching===!0||U.isBatchedMesh&&Me.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Me.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Me.instancing===!1||!U.isInstancedMesh&&Me.instancing===!0||U.isSkinnedMesh&&Me.skinning===!1||!U.isSkinnedMesh&&Me.skinning===!0||U.isInstancedMesh&&Me.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Me.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Me.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Me.instancingMorph===!1&&U.morphTexture!==null||Me.envMap!==me||V.fog===!0&&Me.fog!==J||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==Q.numPlanes||Me.numIntersection!==Q.numIntersection)||Me.vertexAlphas!==Re||Me.vertexTangents!==Ie||Me.morphTargets!==Se||Me.morphNormals!==Xe||Me.morphColors!==Ze||Me.toneMapping!==mt||Me.morphTargetsCount!==qe)&&(Ke=!0):(Ke=!0,Me.__version=V.version);let an=Me.currentProgram;Ke===!0&&(an=zr(V,F,U));let Zi=!1,Xt=!1,Bs=!1,ot=an.getUniforms(),Jt=Me.uniforms;if(be.useProgram(an.program)&&(Zi=!0,Xt=!0,Bs=!0),V.id!==S&&(S=V.id,Xt=!0),Zi||v!==b){be.buffers.depth.getReversed()?(oe.copy(b.projectionMatrix),Nu(oe),Ou(oe),ot.setValue(P,"projectionMatrix",oe)):ot.setValue(P,"projectionMatrix",b.projectionMatrix),ot.setValue(P,"viewMatrix",b.matrixWorldInverse);let Vt=ot.map.cameraPosition;Vt!==void 0&&Vt.setValue(P,Ye.setFromMatrixPosition(b.matrixWorld)),Ve.logarithmicDepthBuffer&&ot.setValue(P,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ot.setValue(P,"isOrthographic",b.isOrthographicCamera===!0),v!==b&&(v=b,Xt=!0,Bs=!0)}if(U.isSkinnedMesh){ot.setOptional(P,U,"bindMatrix"),ot.setOptional(P,U,"bindMatrixInverse");let Bt=U.skeleton;Bt&&(Bt.boneTexture===null&&Bt.computeBoneTexture(),ot.setValue(P,"boneTexture",Bt.boneTexture,E))}U.isBatchedMesh&&(ot.setOptional(P,U,"batchingTexture"),ot.setValue(P,"batchingTexture",U._matricesTexture,E),ot.setOptional(P,U,"batchingIdTexture"),ot.setValue(P,"batchingIdTexture",U._indirectTexture,E),ot.setOptional(P,U,"batchingColorTexture"),U._colorsTexture!==null&&ot.setValue(P,"batchingColorTexture",U._colorsTexture,E));let Qt=z.morphAttributes;if((Qt.position!==void 0||Qt.normal!==void 0||Qt.color!==void 0)&&Ce.update(U,z,an),(Xt||Me.receiveShadow!==U.receiveShadow)&&(Me.receiveShadow=U.receiveShadow,ot.setValue(P,"receiveShadow",U.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Jt.envMap.value=me,Jt.flipEnvMap.value=me.isCubeTexture&&me.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&F.environment!==null&&(Jt.envMapIntensity.value=F.environmentIntensity),Xt&&(ot.setValue(P,"toneMappingExposure",_.toneMappingExposure),Me.needsLights&&Dd(Jt,Bs),J&&V.fog===!0&&ae.refreshFogUniforms(Jt,J),ae.refreshMaterialUniforms(Jt,V,N,j,p.state.transmissionRenderTarget[b.id]),Is.upload(P,ih(Me),Jt,E)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Is.upload(P,ih(Me),Jt,E),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ot.setValue(P,"center",U.center),ot.setValue(P,"modelViewMatrix",U.modelViewMatrix),ot.setValue(P,"normalMatrix",U.normalMatrix),ot.setValue(P,"modelMatrix",U.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){let Bt=V.uniformsGroups;for(let Vt=0,ka=Bt.length;Vt<ka;Vt++){let gi=Bt[Vt];D.update(gi,an),D.bind(gi,an)}}return an}function Dd(b,F){b.ambientLightColor.needsUpdate=F,b.lightProbe.needsUpdate=F,b.directionalLights.needsUpdate=F,b.directionalLightShadows.needsUpdate=F,b.pointLights.needsUpdate=F,b.pointLightShadows.needsUpdate=F,b.spotLights.needsUpdate=F,b.spotLightShadows.needsUpdate=F,b.rectAreaLights.needsUpdate=F,b.hemisphereLights.needsUpdate=F}function Fd(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(b,F,z){ve.get(b.texture).__webglTexture=F,ve.get(b.depthTexture).__webglTexture=z;let V=ve.get(b);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=z===void 0,V.__autoAllocateDepthBuffer||He.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,F){let z=ve.get(b);z.__webglFramebuffer=F,z.__useDefaultFramebuffer=F===void 0};let Ud=P.createFramebuffer();this.setRenderTarget=function(b,F=0,z=0){R=b,C=F,A=z;let V=!0,U=null,J=!1,re=!1;if(b){let me=ve.get(b);if(me.__useDefaultFramebuffer!==void 0)be.bindFramebuffer(P.FRAMEBUFFER,null),V=!1;else if(me.__webglFramebuffer===void 0)E.setupRenderTarget(b);else if(me.__hasExternalTextures)E.rebindTextures(b,ve.get(b.texture).__webglTexture,ve.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Se=b.depthTexture;if(me.__boundDepthTexture!==Se){if(Se!==null&&ve.has(Se)&&(b.width!==Se.image.width||b.height!==Se.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(b)}}let Re=b.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(re=!0);let Ie=ve.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ie[F])?U=Ie[F][z]:U=Ie[F],J=!0):b.samples>0&&E.useMultisampledRTT(b)===!1?U=ve.get(b).__webglMultisampledFramebuffer:Array.isArray(Ie)?U=Ie[z]:U=Ie,T.copy(b.viewport),G.copy(b.scissor),O=b.scissorTest}else T.copy(_e).multiplyScalar(N).floor(),G.copy(Ee).multiplyScalar(N).floor(),O=Oe;if(z!==0&&(U=Ud),be.bindFramebuffer(P.FRAMEBUFFER,U)&&V&&be.drawBuffers(b,U),be.viewport(T),be.scissor(G),be.setScissorTest(O),J){let me=ve.get(b.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+F,me.__webglTexture,z)}else if(re){let me=ve.get(b.texture),Re=F;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,me.__webglTexture,z,Re)}else if(b!==null&&z!==0){let me=ve.get(b.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,me.__webglTexture,z)}S=-1},this.readRenderTargetPixels=function(b,F,z,V,U,J,re){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=ve.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&re!==void 0&&(ue=ue[re]),ue){be.bindFramebuffer(P.FRAMEBUFFER,ue);try{let me=b.texture,Re=me.format,Ie=me.type;if(!Ve.textureFormatReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ve.textureTypeReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=b.width-V&&z>=0&&z<=b.height-U&&P.readPixels(F,z,V,U,Fe.convert(Re),Fe.convert(Ie),J)}finally{let me=R!==null?ve.get(R).__webglFramebuffer:null;be.bindFramebuffer(P.FRAMEBUFFER,me)}}},this.readRenderTargetPixelsAsync=async function(b,F,z,V,U,J,re){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=ve.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&re!==void 0&&(ue=ue[re]),ue){let me=b.texture,Re=me.format,Ie=me.type;if(!Ve.textureFormatReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ve.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=b.width-V&&z>=0&&z<=b.height-U){be.bindFramebuffer(P.FRAMEBUFFER,ue);let Se=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Se),P.bufferData(P.PIXEL_PACK_BUFFER,J.byteLength,P.STREAM_READ),P.readPixels(F,z,V,U,Fe.convert(Re),Fe.convert(Ie),0);let Xe=R!==null?ve.get(R).__webglFramebuffer:null;be.bindFramebuffer(P.FRAMEBUFFER,Xe);let Ze=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Uu(P,Ze,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Se),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,J),P.deleteBuffer(Se),P.deleteSync(Ze),J}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,F=null,z=0){b.isTexture!==!0&&(di("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,b=arguments[1]);let V=Math.pow(2,-z),U=Math.floor(b.image.width*V),J=Math.floor(b.image.height*V),re=F!==null?F.x:0,ue=F!==null?F.y:0;E.setTexture2D(b,0),P.copyTexSubImage2D(P.TEXTURE_2D,z,0,0,re,ue,U,J),be.unbindTexture()};let Nd=P.createFramebuffer(),Od=P.createFramebuffer();this.copyTextureToTexture=function(b,F,z=null,V=null,U=0,J=null){b.isTexture!==!0&&(di("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,b=arguments[1],F=arguments[2],J=arguments[3]||0,z=null),J===null&&(U!==0?(di("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),J=U,U=0):J=0);let re,ue,me,Re,Ie,Se,Xe,Ze,mt,ut=b.isCompressedTexture?b.mipmaps[J]:b.image;if(z!==null)re=z.max.x-z.min.x,ue=z.max.y-z.min.y,me=z.isBox3?z.max.z-z.min.z:1,Re=z.min.x,Ie=z.min.y,Se=z.isBox3?z.min.z:0;else{let Qt=Math.pow(2,-U);re=Math.floor(ut.width*Qt),ue=Math.floor(ut.height*Qt),b.isDataArrayTexture?me=ut.depth:b.isData3DTexture?me=Math.floor(ut.depth*Qt):me=1,Re=0,Ie=0,Se=0}V!==null?(Xe=V.x,Ze=V.y,mt=V.z):(Xe=0,Ze=0,mt=0);let qe=Fe.convert(F.format),Me=Fe.convert(F.type),Pt;F.isData3DTexture?(E.setTexture3D(F,0),Pt=P.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(E.setTexture2DArray(F,0),Pt=P.TEXTURE_2D_ARRAY):(E.setTexture2D(F,0),Pt=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,F.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,F.unpackAlignment);let Ke=P.getParameter(P.UNPACK_ROW_LENGTH),an=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Zi=P.getParameter(P.UNPACK_SKIP_PIXELS),Xt=P.getParameter(P.UNPACK_SKIP_ROWS),Bs=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,ut.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ut.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Re),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ie),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Se);let ot=b.isDataArrayTexture||b.isData3DTexture,Jt=F.isDataArrayTexture||F.isData3DTexture;if(b.isDepthTexture){let Qt=ve.get(b),Bt=ve.get(F),Vt=ve.get(Qt.__renderTarget),ka=ve.get(Bt.__renderTarget);be.bindFramebuffer(P.READ_FRAMEBUFFER,Vt.__webglFramebuffer),be.bindFramebuffer(P.DRAW_FRAMEBUFFER,ka.__webglFramebuffer);for(let gi=0;gi<me;gi++)ot&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ve.get(b).__webglTexture,U,Se+gi),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ve.get(F).__webglTexture,J,mt+gi)),P.blitFramebuffer(Re,Ie,re,ue,Xe,Ze,re,ue,P.DEPTH_BUFFER_BIT,P.NEAREST);be.bindFramebuffer(P.READ_FRAMEBUFFER,null),be.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(U!==0||b.isRenderTargetTexture||ve.has(b)){let Qt=ve.get(b),Bt=ve.get(F);be.bindFramebuffer(P.READ_FRAMEBUFFER,Nd),be.bindFramebuffer(P.DRAW_FRAMEBUFFER,Od);for(let Vt=0;Vt<me;Vt++)ot?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Qt.__webglTexture,U,Se+Vt):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Qt.__webglTexture,U),Jt?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Bt.__webglTexture,J,mt+Vt):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Bt.__webglTexture,J),U!==0?P.blitFramebuffer(Re,Ie,re,ue,Xe,Ze,re,ue,P.COLOR_BUFFER_BIT,P.NEAREST):Jt?P.copyTexSubImage3D(Pt,J,Xe,Ze,mt+Vt,Re,Ie,re,ue):P.copyTexSubImage2D(Pt,J,Xe,Ze,Re,Ie,re,ue);be.bindFramebuffer(P.READ_FRAMEBUFFER,null),be.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else Jt?b.isDataTexture||b.isData3DTexture?P.texSubImage3D(Pt,J,Xe,Ze,mt,re,ue,me,qe,Me,ut.data):F.isCompressedArrayTexture?P.compressedTexSubImage3D(Pt,J,Xe,Ze,mt,re,ue,me,qe,ut.data):P.texSubImage3D(Pt,J,Xe,Ze,mt,re,ue,me,qe,Me,ut):b.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,J,Xe,Ze,re,ue,qe,Me,ut.data):b.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,J,Xe,Ze,ut.width,ut.height,qe,ut.data):P.texSubImage2D(P.TEXTURE_2D,J,Xe,Ze,re,ue,qe,Me,ut);P.pixelStorei(P.UNPACK_ROW_LENGTH,Ke),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,an),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Zi),P.pixelStorei(P.UNPACK_SKIP_ROWS,Xt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Bs),J===0&&F.generateMipmaps&&P.generateMipmap(Pt),be.unbindTexture()},this.copyTextureToTexture3D=function(b,F,z=null,V=null,U=0){return b.isTexture!==!0&&(di("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,V=arguments[1]||null,b=arguments[2],F=arguments[3],U=arguments[4]||0),di('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,F,z,V,U)},this.initRenderTarget=function(b){ve.get(b).__webglFramebuffer===void 0&&E.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?E.setTextureCube(b,0):b.isData3DTexture?E.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?E.setTexture2DArray(b,0):E.setTexture2D(b,0),be.unbindTexture()},this.resetState=function(){C=0,A=0,R=null,be.reset(),st.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=ke._getUnpackColorSpace()}};var fi=class r{constructor(e,t,n,i,s="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(s),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),r.nextNameID=r.nextNameID||0,this.$name.id=`lil-gui-name-${++r.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){let t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);let e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}},rc=class extends fi{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}};function oc(r){let e,t;return(e=r.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=r.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=r.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}var S0={isPrimitive:!0,match:r=>typeof r=="string",fromHexString:oc,toHexString:oc},Or={isPrimitive:!0,match:r=>typeof r=="number",fromHexString:r=>parseInt(r.substring(1),16),toHexString:r=>"#"+r.toString(16).padStart(6,0)},M0={isPrimitive:!1,match:r=>Array.isArray(r),fromHexString(r,e,t=1){let n=Or.fromHexString(r);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([r,e,t],n=1){n=255/n;let i=r*n<<16^e*n<<8^t*n<<0;return Or.toHexString(i)}},w0={isPrimitive:!1,match:r=>Object(r)===r,fromHexString(r,e,t=1){let n=Or.fromHexString(r);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r,g:e,b:t},n=1){n=255/n;let i=r*n<<16^e*n<<8^t*n<<0;return Or.toHexString(i)}},E0=[S0,Or,M0,w0];function A0(r){return E0.find(e=>e.match(r))}var ac=class extends fi{constructor(e,t,n,i){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=A0(this.initialValue),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{let s=oc(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){let t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}},Nr=class extends fi{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}},lc=class extends fi{constructor(e,t,n,i,s,o){super(e,t,n,"number"),this._initInput(),this.min(i),this.max(s);let a=o!==void 0;this.step(a?o:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){let e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;let t=()=>{let M=parseFloat(this.$input.value);isNaN(M)||(this._stepExplicit&&(M=this._snap(M)),this.setValue(this._clamp(M)))},n=M=>{let w=parseFloat(this.$input.value);isNaN(w)||(this._snapClampSetValue(w+M),this.$input.value=this.getValue())},i=M=>{M.key==="Enter"&&this.$input.blur(),M.code==="ArrowUp"&&(M.preventDefault(),n(this._step*this._arrowKeyMultiplier(M))),M.code==="ArrowDown"&&(M.preventDefault(),n(this._step*this._arrowKeyMultiplier(M)*-1))},s=M=>{this._inputFocused&&(M.preventDefault(),n(this._step*this._normalizeMouseWheel(M)))},o=!1,a,l,c,h,u,d=5,f=M=>{a=M.clientX,l=c=M.clientY,o=!0,h=this.getValue(),u=0,window.addEventListener("mousemove",g),window.addEventListener("mouseup",y)},g=M=>{if(o){let w=M.clientX-a,_=M.clientY-l;Math.abs(_)>d?(M.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(w)>d&&y()}if(!o){let w=M.clientY-c;u-=w*this._step*this._arrowKeyMultiplier(M),h+u>this._max?u=this._max-h:h+u<this._min&&(u=this._min-h),this._snapClampSetValue(h+u)}c=M.clientY},y=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",g),window.removeEventListener("mouseup",y)},m=()=>{this._inputFocused=!0},p=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",i),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",f),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",p)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");let e=(p,M,w,_,I)=>(p-M)/(w-M)*(I-_)+_,t=p=>{let M=this.$slider.getBoundingClientRect(),w=e(p,M.left,M.right,this._min,this._max);this._snapClampSetValue(w)},n=p=>{this._setDraggingStyle(!0),t(p.clientX),window.addEventListener("mousemove",i),window.addEventListener("mouseup",s)},i=p=>{t(p.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",s)},o=!1,a,l,c=p=>{p.preventDefault(),this._setDraggingStyle(!0),t(p.touches[0].clientX),o=!1},h=p=>{p.touches.length>1||(this._hasScrollBar?(a=p.touches[0].clientX,l=p.touches[0].clientY,o=!0):c(p),window.addEventListener("touchmove",u,{passive:!1}),window.addEventListener("touchend",d))},u=p=>{if(o){let M=p.touches[0].clientX-a,w=p.touches[0].clientY-l;Math.abs(M)>Math.abs(w)?c(p):(window.removeEventListener("touchmove",u),window.removeEventListener("touchend",d))}else p.preventDefault(),t(p.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",u),window.removeEventListener("touchend",d)},f=this._callOnFinishChange.bind(this),g=400,y,m=p=>{if(Math.abs(p.deltaX)<Math.abs(p.deltaY)&&this._hasScrollBar)return;p.preventDefault();let w=this._normalizeMouseWheel(p)*this._step;this._snapClampSetValue(this.getValue()+w),this.$input.value=this.getValue(),clearTimeout(y),y=setTimeout(f,g)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",h,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){let e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}},cc=class extends fi{constructor(e,t,n,i){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(i)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{let n=document.createElement("option");n.textContent=t,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){let e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}},hc=class extends fi{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}},T0=`.lil-gui {
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
  content: "\u2195";
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
  content: "\u25BE";
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
  content: "\u25B8";
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
  content: "\u2713";
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
}`;function C0(r){let e=document.createElement("style");e.innerHTML=r;let t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}var gd=!1,Ia=class r{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:i,title:s="Controls",closeFolders:o=!1,injectStyles:a=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),l&&this.domElement.classList.add("allow-touch-styles"),!gd&&a&&(C0(T0),gd=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this._closeFolders=o}add(e,t,n,i,s){if(Object(n)===n)return new cc(this,e,t,n);let o=e[t];switch(typeof o){case"number":return new lc(this,e,t,n,i,s);case"boolean":return new rc(this,e,t);case"string":return new hc(this,e,t);case"function":return new Nr(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,o)}addColor(e,t,n=1){return new ac(this,e,t,n)}addFolder(e){let t=new r({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof Nr||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){let t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof Nr)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{let t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");let n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);let i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}};var uc=class{constructor(){this.scene=new ir,this.canvas=null,this.bgTexture=null,this.init()}init(){if(this.canvas=document.querySelector("canvas.webgl"),!this.canvas){console.error('Canvas element with class "webgl" not found');return}}updateGradientBackground(e){let i=document.createElement("canvas");i.width=2,i.height=2048;let s=i.getContext("2d"),o=s.createLinearGradient(0,0,0,2048);o.addColorStop(0,e.gradientTop),o.addColorStop(1,e.gradientBottom),s.fillStyle=o,s.globalAlpha=e.gradientAlpha,s.fillRect(0,0,2,2048),this.bgTexture=new Hn(i),this.bgTexture.minFilter=Qe,this.bgTexture.magFilter=Qe,this.bgTexture.colorSpace=pt,this.scene.background=this.bgTexture,this.scene._originalBackgroundTexture=this.bgTexture}getScene(){return this.scene}getCanvas(){return this.canvas}dispose(){this.bgTexture&&this.bgTexture.dispose()}},yd=uc;var _d={type:"change"},fc={type:"start"},vd={type:"end"},Pa=new Mn,xd=new tn,R0=Math.cos(70*Fr.DEG2RAD),At=new L,Wt=2*Math.PI,it={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},dc=1e-6,La=class extends Mr{constructor(e,t=null){super(e,t),this.state=it.NONE,this.enabled=!0,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:nn.ROTATE,MIDDLE:nn.DOLLY,RIGHT:nn.PAN},this.touches={ONE:hi.ROTATE,TWO:hi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new Ct,this._lastTargetPosition=new L,this._quat=new Ct().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ss,this._sphericalDelta=new Ss,this._scale=1,this._panOffset=new L,this._rotateStart=new xe,this._rotateEnd=new xe,this._rotateDelta=new xe,this._panStart=new xe,this._panEnd=new xe,this._panDelta=new xe,this._dollyStart=new xe,this._dollyEnd=new xe,this._dollyDelta=new xe,this._dollyDirection=new L,this._mouse=new xe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=P0.bind(this),this._onPointerDown=I0.bind(this),this._onPointerUp=L0.bind(this),this._onContextMenu=k0.bind(this),this._onMouseWheel=U0.bind(this),this._onKeyDown=N0.bind(this),this._onTouchStart=O0.bind(this),this._onTouchMove=B0.bind(this),this._onMouseDown=D0.bind(this),this._onMouseMove=F0.bind(this),this._interceptControlDown=z0.bind(this),this._interceptControlUp=H0.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(_d),this.update(),this.state=it.NONE}update(e=null){let t=this.object.position;At.copy(t).sub(this.target),At.applyQuaternion(this._quat),this._spherical.setFromVector3(At),this.autoRotate&&this.state===it.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=Wt:n>Math.PI&&(n-=Wt),i<-Math.PI?i+=Wt:i>Math.PI&&(i-=Wt),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(At.setFromSpherical(this._spherical),At.applyQuaternion(this._quatInverse),t.copy(this.target).add(At),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=At.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){let a=new L(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;let c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=At.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Pa.origin.copy(this.object.position),Pa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Pa.direction))<R0?this.object.lookAt(this.target):(xd.setFromNormalAndCoplanarPoint(this.object.up,this.target),Pa.intersectPlane(xd,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>dc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>dc||this._lastTargetPosition.distanceToSquared(this.target)>dc?(this.dispatchEvent(_d),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Wt/60*this.autoRotateSpeed*e:Wt/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){At.setFromMatrixColumn(t,0),At.multiplyScalar(-e),this._panOffset.add(At)}_panUp(e,t){this.screenSpacePanning===!0?At.setFromMatrixColumn(t,1):(At.setFromMatrixColumn(t,0),At.crossVectors(this.object.up,At)),At.multiplyScalar(e),this._panOffset.add(At)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let i=this.object.position;At.copy(i).sub(this.target);let s=At.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/n.clientHeight,this.object.matrix),this._panUp(2*t*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),i=e-n.left,s=t-n.top,o=n.width,a=n.height;this._mouse.x=i/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Wt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Wt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Wt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Wt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Wt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Wt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,s=Math.sqrt(n*n+i*i);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),s=.5*(e.pageY+n.y);this._rotateEnd.set(i,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Wt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Wt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,s=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new xe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function I0(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r)))}function P0(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function L0(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(vd),this.state=it.NONE;break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function D0(r){let e;switch(r.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case nn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=it.DOLLY;break;case nn.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=it.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=it.ROTATE}break;case nn.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=it.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=it.PAN}break;default:this.state=it.NONE}this.state!==it.NONE&&this.dispatchEvent(fc)}function F0(r){switch(this.state){case it.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case it.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case it.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function U0(r){this.enabled===!1||this.enableZoom===!1||this.state!==it.NONE||(r.preventDefault(),this.dispatchEvent(fc),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(vd))}function N0(r){this.enabled!==!1&&this._handleKeyDown(r)}function O0(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case hi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=it.TOUCH_ROTATE;break;case hi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=it.TOUCH_PAN;break;default:this.state=it.NONE}break;case 2:switch(this.touches.TWO){case hi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=it.TOUCH_DOLLY_PAN;break;case hi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=it.TOUCH_DOLLY_ROTATE;break;default:this.state=it.NONE}break;default:this.state=it.NONE}this.state!==it.NONE&&this.dispatchEvent(fc)}function B0(r){switch(this._trackPointer(r),this.state){case it.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case it.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case it.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case it.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=it.NONE}}function k0(r){this.enabled!==!1&&r.preventDefault()}function z0(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function H0(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var pc=class{constructor(e,t){this.canvas=e,this.sizes=t,this.camera=null,this.controls=null,this.raycaster=new Bi,this.mouse=new xe,this.scene=null,this.clickableMeshes=[],this.targetLerpActive=!1,this.targetLerpStart=null,this.targetLerpFrom=new L,this.targetLerpTo=new L,this.targetLerpDuration=.3,this.cameraResetActive=!1,this.cameraResetStart=null,this.cameraResetDuration=.8,this.positionLerpFrom=new L,this.positionLerpTo=new L,this.rotationLerpFrom={x:0,y:0,z:0},this.rotationLerpTo={x:0,y:0,z:0},this.originalTarget=new L(-.018058106108908126,.34892644576978554,.08865572603297185),this.zoomVelocity=0,this.zoomMomentum=0,this.lastScrollTime=0,this.zoomDecay=.96,this.zoomMomentumThreshold=.015,this.momentumActive=!1,this.originalPosition=new L(-.9767395667747095,.6513489013452174,-.5290562260411343),this.originalRotation={x:-2.6863117716033176,y:-.9484795935271679,z:-2.7629820926703275},this.axisHelper=null,this.axisHelperVisible=!1,this.axisHelperSize=.5,this.init(),this.setupEventListeners()}init(){this.camera=new yt(50,this.sizes.width/this.sizes.height,.1,100),this.camera.position.set(-.9767395667747095,.6513489013452174,-.5290562260411343),this.camera.rotation.set(-2.6863117716033176,-.9484795935271679,-2.7629820926703275,"XYZ"),this.controls=new La(this.camera,this.canvas),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.zoomSpeed=.9,this.controls.minDistance=.146,this.controls.maxDistance=19,this.controls.mouseButtons={LEFT:nn.ROTATE,MIDDLE:nn.PAN,RIGHT:nn.PAN},this.controls.target.set(-.018058106108908126,.34892644576978554,.08865572603297185),this.controls.update()}setupEventListeners(){let e=null;this.controls.addEventListener("change",()=>{e&&clearTimeout(e),e=setTimeout(()=>{},2e3)}),this.canvas.addEventListener("dblclick",t=>{this.handleDoubleClick(t)}),window.addEventListener("keydown",t=>{t.code==="Space"&&!t.repeat&&(t.preventDefault(),this.resetCamera())}),this.canvas.addEventListener("wheel",t=>{this.trackZoomMomentum(t)},{passive:!0}),window.addEventListener("resize",()=>{this.handleResize()})}handleDoubleClick(e){if(!this.scene||this.clickableMeshes.length===0){console.warn("Scene or clickable meshes not available for rotation center");return}let t=this.canvas.getBoundingClientRect();this.mouse.x=(e.clientX-t.left)/t.width*2-1,this.mouse.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);let n=this.raycaster.intersectObjects(this.clickableMeshes,!0);if(n.length>0){let i=n[0].point;console.log("New rotation center set at:",i);let s=this.controls.dampingFactor;this.controls.dampingFactor=.15,this.targetLerpFrom.copy(this.controls.target),this.targetLerpTo.copy(i),this.targetLerpStart=performance.now(),this.targetLerpActive=!0,setTimeout(()=>{this.controls.dampingFactor=s},this.targetLerpDuration*1e3+100),this.axisHelperVisible&&setTimeout(()=>{this.updateAxisHelper()},this.targetLerpDuration*1e3+150)}}resetCamera(){console.log("Resetting camera with smooth animation to default state"),this.zoomMomentum=0,this.momentumActive=!1,this.targetLerpActive=!1;let e=this.controls.dampingFactor;this.controls.dampingFactor=.2,this.positionLerpFrom.copy(this.camera.position),this.positionLerpTo.copy(this.originalPosition),this.rotationLerpFrom.x=this.camera.rotation.x,this.rotationLerpFrom.y=this.camera.rotation.y,this.rotationLerpFrom.z=this.camera.rotation.z,this.rotationLerpTo.x=this.originalRotation.x,this.rotationLerpTo.y=this.originalRotation.y,this.rotationLerpTo.z=this.originalRotation.z,this.targetLerpFrom.copy(this.controls.target),this.targetLerpTo.copy(this.originalTarget),this.cameraResetActive=!0,this.targetLerpActive=!0,this.cameraResetStart=performance.now(),this.targetLerpStart=performance.now(),setTimeout(()=>{this.controls.dampingFactor=e},this.cameraResetDuration*1e3+100),console.log("Camera smooth reset animation started")}createAxisHelper(){this.axisHelper&&this.scene.remove(this.axisHelper),this.axisHelper=new Sr(this.axisHelperSize),this.axisHelper.position.copy(this.controls.target),this.scene.add(this.axisHelper),console.log("Axis helper created at:",this.controls.target)}updateAxisHelper(){this.axisHelper&&this.axisHelperVisible&&this.axisHelper.position.copy(this.controls.target)}toggleAxisHelper(e){this.axisHelperVisible=e,e&&!this.axisHelper&&this.createAxisHelper(),this.axisHelper&&(this.axisHelper.visible=e,this.updateAxisHelper())}setAxisHelperSize(e){this.axisHelperSize=e,this.axisHelper&&this.createAxisHelper()}getRotationCenter(){return{x:this.controls.target.x,y:this.controls.target.y,z:this.controls.target.z}}setRotationCenter(e,t,n){this.controls.target.set(e,t,n),this.controls.update(),this.updateAxisHelper(),console.log("Rotation center set to:",e,t,n)}setRotationCenterX(e){this.controls.target.x=e,this.controls.update(),this.updateAxisHelper()}setRotationCenterY(e){this.controls.target.y=e,this.controls.update(),this.updateAxisHelper()}setRotationCenterZ(e){this.controls.target.z=e,this.controls.update(),this.updateAxisHelper()}copyCoordinatesToClipboard(){let e=this.getRotationCenter(),t=`x: ${e.x.toFixed(6)}, y: ${e.y.toFixed(6)}, z: ${e.z.toFixed(6)}`;navigator.clipboard.writeText(t).then(()=>{console.log("Coordinates copied to clipboard:",t)}).catch(n=>{console.error("Failed to copy coordinates:",n),console.log("Coordinates (manual copy):",t)})}setFOV(e){this.camera.fov=e,this.camera.updateProjectionMatrix(),console.log("FOV set to:",e)}getFOV(){return this.camera.fov}copyCameraSettingsToClipboard(){let e={position:this.camera.position.toArray(),rotation:[this.camera.rotation.x,this.camera.rotation.y,this.camera.rotation.z],target:this.controls.target.toArray(),fov:this.camera.fov,zoom:{minDistance:this.controls.minDistance,maxDistance:this.controls.maxDistance,zoomSpeed:this.controls.zoomSpeed}},t=JSON.stringify(e,null,2);navigator.clipboard.writeText(t).then(()=>{console.log("Camera settings copied to clipboard:",e)}).catch(n=>{console.error("Failed to copy camera settings:",n),console.log("Camera settings (manual copy):",t)})}copyAllSettingsToClipboard(e){let t=e.gatherAllSettings(),n=JSON.stringify(t,null,2);navigator.clipboard.writeText(n).then(()=>{console.log("All GUI settings copied to clipboard:",t)}).catch(i=>{console.error("Failed to copy all settings:",i),console.log("All settings (manual copy):",n)})}handleResize(){this.camera.aspect=this.sizes.width/this.sizes.height,this.camera.updateProjectionMatrix()}updateTargetLerp(){if(this.targetLerpActive){let t=(performance.now()-this.targetLerpStart)/1e3,n=Math.min(t/this.targetLerpDuration,1);n<.5?n=4*n*n*n:n=1-Math.pow(-2*n+2,3)/2,this.controls.target.lerpVectors(this.targetLerpFrom,this.targetLerpTo,n),this.controls.update(),t/this.targetLerpDuration>=1&&(this.controls.target.copy(this.targetLerpTo),this.controls.update(),this.targetLerpActive=!1)}}updateCameraReset(){if(this.cameraResetActive){let t=(performance.now()-this.cameraResetStart)/1e3,n=Math.min(t/this.cameraResetDuration,1);n<.5?n=4*n*n*n:n=1-Math.pow(-2*n+2,3)/2,this.camera.position.lerpVectors(this.positionLerpFrom,this.positionLerpTo,n),this.camera.rotation.x=this.rotationLerpFrom.x+(this.rotationLerpTo.x-this.rotationLerpFrom.x)*n,this.camera.rotation.y=this.rotationLerpFrom.y+(this.rotationLerpTo.y-this.rotationLerpFrom.y)*n,this.camera.rotation.z=this.rotationLerpFrom.z+(this.rotationLerpTo.z-this.rotationLerpFrom.z)*n,t/this.cameraResetDuration>=1&&(this.camera.position.copy(this.positionLerpTo),this.camera.rotation.set(this.rotationLerpTo.x,this.rotationLerpTo.y,this.rotationLerpTo.z,"XYZ"),this.cameraResetActive=!1,console.log("Camera reset animation complete"))}}update(){this.updateTargetLerp(),this.updateCameraReset(),this.updateZoomMomentum(),this.updateAxisHelper(),this.controls.update()}trackZoomMomentum(e){let t=performance.now(),n=Math.max(t-this.lastScrollTime,1),i=e.deltaY>0?1:-1,s=this.velocityMultiplier||1,o=i*.1*s,a=Math.min(n/16,3);this.zoomVelocity=o*a,this.zoomMomentum=this.zoomVelocity,this.lastScrollTime=t}updateZoomMomentum(){if(Math.abs(this.zoomMomentum)>this.zoomMomentumThreshold){let e=this.camera.position.distanceTo(this.controls.target),t=this.zoomMomentum*Math.max(e*.05,.01),n=new L;n.subVectors(this.camera.position,this.controls.target).normalize();let i=e,s=i+t,o=Math.max(this.controls.minDistance,Math.min(this.controls.maxDistance,s));Math.abs(o-i)>.001&&this.camera.position.copy(this.controls.target).add(n.multiplyScalar(o)),this.zoomMomentum*=this.zoomDecay,this.controls.update()}else this.zoomMomentum!==0&&(this.zoomMomentum=0)}getCamera(){return this.camera}getControls(){return this.controls}setScene(e){this.scene=e}setClickableMeshes(e){this.clickableMeshes=e}applySettings(e){e.camera&&(e.camera.position&&this.camera.position.set(e.camera.position[0],e.camera.position[1],e.camera.position[2]),e.camera.rotation&&this.camera.rotation.set(e.camera.rotation[0],e.camera.rotation[1],e.camera.rotation[2]),e.camera.target&&this.controls.target.set(e.camera.target[0],e.camera.target[1],e.camera.target[2]),this.controls.update())}getSettings(){return{position:this.camera.position.toArray(),rotation:[this.camera.rotation.x,this.camera.rotation.y,this.camera.rotation.z],target:this.controls.target.toArray()}}updateOriginalState(e,t,n){e&&this.originalPosition.set(...e),t&&(this.originalRotation.x=t[0],this.originalRotation.y=t[1],this.originalRotation.z=t[2]),n&&this.originalTarget.set(...n),console.log("Updated original camera state for spacebar reset")}dispose(){this.axisHelper&&(this.scene.remove(this.axisHelper),this.axisHelper=null)}},bd=pc;var Da=class extends fr{constructor(e){super(e),this.type=vn}parse(e){let o=function(R,S){switch(R){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(S||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(S||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(S||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(S||""))}},u=function(R,S,v){S=S||1024;let G=R.pos,O=-1,k=0,X="",H=String.fromCharCode.apply(null,new Uint16Array(R.subarray(G,G+128)));for(;0>(O=H.indexOf(`
`))&&k<S&&G<R.byteLength;)X+=H,k+=H.length,G+=128,H+=String.fromCharCode.apply(null,new Uint16Array(R.subarray(G,G+128)));return-1<O?(v!==!1&&(R.pos+=k+O+1),X+H.slice(0,O)):!1},d=function(R){let S=/^#\?(\S+)/,v=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,T=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,G=/^\s*FORMAT=(\S+)\s*$/,O=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,k={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},X,H;for((R.pos>=R.byteLength||!(X=u(R)))&&o(1,"no header found"),(H=X.match(S))||o(3,"bad initial token"),k.valid|=1,k.programtype=H[1],k.string+=X+`
`;X=u(R),X!==!1;){if(k.string+=X+`
`,X.charAt(0)==="#"){k.comments+=X+`
`;continue}if((H=X.match(v))&&(k.gamma=parseFloat(H[1])),(H=X.match(T))&&(k.exposure=parseFloat(H[1])),(H=X.match(G))&&(k.valid|=2,k.format=H[1]),(H=X.match(O))&&(k.valid|=4,k.height=parseInt(H[1],10),k.width=parseInt(H[2],10)),k.valid&2&&k.valid&4)break}return k.valid&2||o(3,"missing format specifier"),k.valid&4||o(3,"missing image size specifier"),k},f=function(R,S,v){let T=S;if(T<8||T>32767||R[0]!==2||R[1]!==2||R[2]&128)return new Uint8Array(R);T!==(R[2]<<8|R[3])&&o(3,"wrong scanline width");let G=new Uint8Array(4*S*v);G.length||o(4,"unable to allocate buffer space");let O=0,k=0,X=4*T,H=new Uint8Array(4),j=new Uint8Array(X),N=v;for(;N>0&&k<R.byteLength;){k+4>R.byteLength&&o(1),H[0]=R[k++],H[1]=R[k++],H[2]=R[k++],H[3]=R[k++],(H[0]!=2||H[1]!=2||(H[2]<<8|H[3])!=T)&&o(3,"bad rgbe scanline format");let te=0,ie;for(;te<X&&k<R.byteLength;){ie=R[k++];let Ee=ie>128;if(Ee&&(ie-=128),(ie===0||te+ie>X)&&o(3,"bad scanline data"),Ee){let Oe=R[k++];for(let q=0;q<ie;q++)j[te++]=Oe}else j.set(R.subarray(k,k+ie),te),te+=ie,k+=ie}let _e=T;for(let Ee=0;Ee<_e;Ee++){let Oe=0;G[O]=j[Ee+Oe],Oe+=T,G[O+1]=j[Ee+Oe],Oe+=T,G[O+2]=j[Ee+Oe],Oe+=T,G[O+3]=j[Ee+Oe],O+=4}N--}return G},g=function(R,S,v,T){let G=R[S+3],O=Math.pow(2,G-128)/255;v[T+0]=R[S+0]*O,v[T+1]=R[S+1]*O,v[T+2]=R[S+2]*O,v[T+3]=1},y=function(R,S,v,T){let G=R[S+3],O=Math.pow(2,G-128)/255;v[T+0]=oi.toHalfFloat(Math.min(R[S+0]*O,65504)),v[T+1]=oi.toHalfFloat(Math.min(R[S+1]*O,65504)),v[T+2]=oi.toHalfFloat(Math.min(R[S+2]*O,65504)),v[T+3]=oi.toHalfFloat(1)},m=new Uint8Array(e);m.pos=0;let p=d(m),M=p.width,w=p.height,_=f(m.subarray(m.pos),M,w),I,C,A;switch(this.type){case Nt:A=_.length/4;let R=new Float32Array(A*4);for(let v=0;v<A;v++)g(_,v*4,R,v*4);I=R,C=Nt;break;case vn:A=_.length/4;let S=new Uint16Array(A*4);for(let v=0;v<A;v++)y(_,v*4,S,v*4);I=S,C=vn;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:M,height:w,data:I,header:p.string,gamma:p.gamma,exposure:p.exposure,type:C}}setDataType(e){return this.type=e,this}load(e,t,n,i){function s(o,a){switch(o.type){case Nt:case vn:o.colorSpace=pt,o.minFilter=Qe,o.magFilter=Qe,o.generateMipmaps=!1,o.flipY=!0;break}t&&t(o,a)}return super.load(e,s,n,i)}};var mc=class{constructor(e){this.scene=e,this.ambientLight=null,this.directionalLight=null,this.dirLightHelper=null,this.rgbeLoader=new Da,this.init()}init(){this.setupAmbientLight(),this.setupDirectionalLight(),this.setupEnvironmentMap()}setupAmbientLight(){this.ambientLight=new yr(16777215,.4),this.scene.add(this.ambientLight)}setupDirectionalLight(){this.directionalLight=new Oi(16777215,1.43),this.directionalLight.position.set(1.35,1.57,.9),this.directionalLight.castShadow=!0,this.directionalLight.shadow.bias=0,this.directionalLight.shadow.radius=1,this.directionalLight.shadow.mapSize.width=1024,this.directionalLight.shadow.mapSize.height=1024,this.scene.add(this.directionalLight),this.dirLightHelper=new br(this.directionalLight,1.5,16711680),this.dirLightHelper.visible=!1,this.scene.add(this.dirLightHelper)}setupEnvironmentMap(){this.rgbeLoader.load(In("textures/environmentMap/2k.hdr"),e=>{e.mapping=ws,this.scene.environment=e})}applySettings(e){if(e.directionalLight){let t=e.directionalLight;this.directionalLight.intensity=t.intensity,this.directionalLight.color.set(t.color),t.position&&this.directionalLight.position.set(t.position.x,t.position.y,t.position.z),this.directionalLight.castShadow=t.castShadow,this.directionalLight.shadow.bias=t.shadowBias,this.directionalLight.shadow.radius=t.shadowBlur,this.directionalLight.shadow.mapSize.width=t.shadowMapWidth,this.directionalLight.shadow.mapSize.height=t.shadowMapHeight}e.ambientLight&&(this.ambientLight.intensity=e.ambientLight.intensity,this.ambientLight.color.set(e.ambientLight.color))}getSettings(){return{directionalLight:{intensity:this.directionalLight.intensity,color:"#"+this.directionalLight.color.getHexString(),castShadow:this.directionalLight.castShadow,shadowBias:this.directionalLight.shadow.bias,shadowBlur:this.directionalLight.shadow.radius,shadowMapWidth:this.directionalLight.shadow.mapSize.width,shadowMapHeight:this.directionalLight.shadow.mapSize.height,posX:this.directionalLight.position.x,posY:this.directionalLight.position.y,posZ:this.directionalLight.position.z,showHelper:this.dirLightHelper.visible,position:{x:this.directionalLight.position.x,y:this.directionalLight.position.y,z:this.directionalLight.position.z}},ambientLight:{intensity:this.ambientLight.intensity,color:"#"+this.ambientLight.color.getHexString()}}}getLights(){return{ambient:this.ambientLight,directional:this.directionalLight,directionalHelper:this.dirLightHelper}}},Sd=mc;var gc=class{constructor(e){this.scene=e,this.dustParticles=null,this.dustGeometry=null,this.dustMaterial=null,this.dustPositions=null,this.dustVelocities=null,this.dustSizes=null,this.params={count:1150,size:.0095,sizeRandomness:1.4,color:"#0d529c",opacity:1,speed:.5,horizontalRange:3,verticalRange:2,verticalOffset:1,visible:!0,blur:.31,depthBlur:!1,depthBlurStrength:.16,depthFocusDistance:2,depthFocusRange:1},this.init()}init(){this.createDustParticles()}createDustParticles(){this.dustParticles&&(this.scene.remove(this.dustParticles),this.dustGeometry?.dispose(),this.dustMaterial?.dispose()),this.dustGeometry=new St,this.dustPositions=new Float32Array(this.params.count*3),this.dustVelocities=new Float32Array(this.params.count*3),this.dustSizes=new Float32Array(this.params.count);for(let t=0;t<this.params.count;t++){let n=t*3;this.dustPositions[n]=(Math.random()-.5)*this.params.horizontalRange*2,this.dustPositions[n+1]=Math.random()*this.params.verticalRange+this.params.verticalOffset,this.dustPositions[n+2]=(Math.random()-.5)*this.params.horizontalRange*2,this.dustVelocities[n]=(Math.random()-.5)*.001,this.dustVelocities[n+1]=(Math.random()-.5)*5e-4,this.dustVelocities[n+2]=(Math.random()-.5)*.001,this.dustSizes[t]=this.params.size*(1+(Math.random()-.5)*this.params.sizeRandomness)}this.dustGeometry.setAttribute("position",new ct(this.dustPositions,3)),this.dustGeometry.setAttribute("size",new ct(this.dustSizes,1));let e={color:this.params.color,size:this.params.size,transparent:!0,opacity:this.params.opacity,sizeAttenuation:!0,alphaTest:.01};this.params.blur>0&&(e.map=this.createBlurTexture(this.params.blur)),this.dustMaterial=new ci(e),this.dustParticles=new Ii(this.dustGeometry,this.dustMaterial),this.dustParticles.visible=this.params.visible,this.scene.add(this.dustParticles)}createBlurTexture(e){let n=document.createElement("canvas");n.width=32,n.height=32;let i=n.getContext("2d"),s=32/2,o=32/2,a=32/2,l=i.createRadialGradient(s,o,0,s,o,a);l.addColorStop(0,`rgba(255, 255, 255, ${1-e})`),l.addColorStop(.5,`rgba(255, 255, 255, ${(1-e)*.5})`),l.addColorStop(1,"rgba(255, 255, 255, 0)"),i.fillStyle=l,i.fillRect(0,0,32,32);let c=new Hn(n);return c.needsUpdate=!0,c}update(e){if(!this.dustParticles||!this.params.visible)return;let t=this.dustGeometry.attributes.position.array,n=this.dustGeometry.attributes.size.array;for(let i=0;i<this.params.count;i++){let s=i*3;if(t[s]+=this.dustVelocities[s]*this.params.speed*e*1e3,t[s+1]+=this.dustVelocities[s+1]*this.params.speed*e*1e3,t[s+2]+=this.dustVelocities[s+2]*this.params.speed*e*1e3,this.params.depthBlur&&window.camera){let o=new L(t[s],t[s+1],t[s+2]),a=window.camera.position,l=o.distanceTo(a),c=this.params.depthFocusDistance,h=this.params.depthFocusRange,u=Math.abs(l-c),d=1;u>h&&(d=1-Math.min(u-h,2)/2*this.params.depthBlurStrength),n[i]=this.dustSizes[i]*d}t[s]>this.params.horizontalRange&&(t[s]=-this.params.horizontalRange),t[s]<-this.params.horizontalRange&&(t[s]=this.params.horizontalRange),t[s+2]>this.params.horizontalRange&&(t[s+2]=-this.params.horizontalRange),t[s+2]<-this.params.horizontalRange&&(t[s+2]=this.params.horizontalRange),(t[s+1]<this.params.verticalOffset-.5||t[s+1]>this.params.verticalOffset+this.params.verticalRange+.5)&&(t[s+1]=Math.random()*this.params.verticalRange+this.params.verticalOffset)}this.dustGeometry.attributes.position.needsUpdate=!0,this.params.depthBlur&&(this.dustGeometry.attributes.size.needsUpdate=!0)}updateCount(e){this.params.count=e,this.createDustParticles()}updateSize(e){if(this.params.size=e,this.dustMaterial.size=e,this.dustSizes){for(let t=0;t<this.params.count;t++)this.dustSizes[t]=e*(1+(Math.random()-.5)*this.params.sizeRandomness);this.dustGeometry.attributes.size.needsUpdate=!0}}updateSizeRandomness(e){this.params.sizeRandomness=e,this.createDustParticles()}updateColor(e){this.params.color=e,this.dustMaterial.color.set(e)}updateOpacity(e){this.params.opacity=e,this.dustMaterial.opacity=e}updateSpeed(e){this.params.speed=e}updateBlur(e){this.params.blur=e,e>0?this.dustMaterial.map=this.createBlurTexture(e):this.dustMaterial.map=null,this.dustMaterial.needsUpdate=!0}updateDepthBlur(e){this.params.depthBlur=e}updateDepthBlurStrength(e){this.params.depthBlurStrength=e}updateDepthFocus(e,t){this.params.depthFocusDistance=e,this.params.depthFocusRange=t}updateRange(e,t){this.params.horizontalRange=e,this.params.verticalRange=t,this.createDustParticles()}updateOffset(e){this.params.verticalOffset=e,this.createDustParticles()}setVisible(e){this.params.visible=e,this.dustParticles.visible=e}applyPreset(e){switch(e){case"Light Dust":Object.assign(this.params,{count:300,size:.003,opacity:.2,speed:.3,color:"#ffffff"});break;case"Heavy Dust":Object.assign(this.params,{count:800,size:.008,opacity:.4,speed:.8,color:"#d4c4a8"});break;case"Magical Sparkles":Object.assign(this.params,{count:150,size:.01,opacity:.6,speed:.2,color:"#ffd700"});break;case"Reset Dust":default:Object.assign(this.params,{count:500,size:.005,opacity:.3,speed:.5,color:"#ffffff"});break}this.createDustParticles()}applySettings(e){e&&(Object.assign(this.params,e),this.createDustParticles(),e.blur!==void 0&&this.updateBlur(e.blur),e.depthBlur!==void 0&&this.updateDepthBlur(e.depthBlur),e.depthBlurStrength!==void 0&&this.updateDepthBlurStrength(e.depthBlurStrength),e.depthFocusDistance!==void 0&&e.depthFocusRange!==void 0&&this.updateDepthFocus(e.depthFocusDistance,e.depthFocusRange))}getSettings(){return{...this.params}}getParams(){return this.params}dispose(){this.dustParticles&&(this.scene.remove(this.dustParticles),this.dustGeometry?.dispose(),this.dustMaterial?.dispose())}},Md=gc;var yc=class{constructor(){this.managers={},this.defaultSettings=null,this.loadDefaultSettings()}async loadDefaultSettings(){try{let e=await fetch(In("data/default-settings.json"));this.defaultSettings=await e.json()}catch(e){console.warn("Could not load default settings:",e),this.defaultSettings=this.getFallbackSettings()}}registerManager(e,t){this.managers[e]=t}async saveSettingsToClipboard(){let e=this.gatherAllSettings(),t=JSON.stringify(e,null,2);try{await navigator.clipboard.writeText(t),alert("Settings copied to clipboard!")}catch(n){console.error("Failed to copy to clipboard:",n),alert("Failed to copy settings to clipboard.")}}async importSettingsFromClipboard(){try{let e=await navigator.clipboard.readText(),t=JSON.parse(e);this.applyAllSettings(t),window.app&&typeof window.app.updateAllGUIControls=="function"&&window.app.updateAllGUIControls(),alert("Settings imported from clipboard!")}catch(e){console.error("Failed to import settings:",e),alert("Failed to import settings: "+e.message)}}gatherAllSettings(){let e={};for(let[t,n]of Object.entries(this.managers))n&&typeof n.getSettings=="function"&&(e[t]=n.getSettings());return window.model&&(e.model={position:window.model.position.toArray(),rotation:[window.model.rotation.x,window.model.rotation.y,window.model.rotation.z],scale:window.model.scale.toArray()}),e}applyAllSettings(e){for(let[t,n]of Object.entries(this.managers))n&&typeof n.applySettings=="function"&&e[t]&&n.applySettings(e[t]);e.model&&window.model&&(e.model.position&&window.model.position.fromArray(e.model.position),e.model.rotation&&window.model.rotation.set(e.model.rotation[0],e.model.rotation[1],e.model.rotation[2]),e.model.scale&&window.model.scale.fromArray(e.model.scale))}applyDefaultSettings(){this.defaultSettings&&this.applyAllSettings(this.defaultSettings)}getDefaultSettings(){return this.defaultSettings}getFallbackSettings(){return{background:{gradientTop:"#3865ad",gradientBottom:"#0101bc",gradientAlpha:1},ground:{mode:"Infinite Canvas",color:"#222222",roughness:1,metalness:0,shadowOpacity:.4,receiveShadow:!0,castShadow:!1,visible:!0},dustParticles:{count:1150,size:.0095,sizeRandomness:1.4,color:"#0d529c",opacity:1,speed:.5,horizontalRange:3,verticalRange:2,verticalOffset:1,visible:!0,blur:.31,depthBlur:!1,depthBlurStrength:.16,depthFocusDistance:2,depthFocusRange:1},directionalLight:{intensity:1.43,color:"#ffffff",castShadow:!0,shadowBias:0,shadowBlur:1,shadowMapWidth:1024,shadowMapHeight:1024,posX:1.35,posY:1.57,posZ:.9,showHelper:!1,position:{x:1.35,y:1.57,z:.9}},ambientLight:{intensity:.4,color:"#ffffff"},camera:{position:[.571641187606234,.6054805751022576,-.4710421975258844],rotation:[-2.6821474237876726,.8865063263260724,2.775502273890531],target:[-.04078270409635462,.38393067967272315,-.023247738115800942]},model:{position:[0,-.02,0],rotation:[0,0,0],scale:[1,1,1]}}}saveToLocalStorage(e="threeJsSettings"){let t=this.gatherAllSettings();try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch(n){return console.error("Failed to save to local storage:",n),!1}}loadFromLocalStorage(e="threeJsSettings"){try{let t=localStorage.getItem(e);if(t){let n=JSON.parse(t);return this.applyAllSettings(n),!0}}catch(t){console.error("Failed to load from local storage:",t)}return!1}exportAsFile(e="three-scene-settings.json"){let t=this.gatherAllSettings(),n=JSON.stringify(t,null,2),i=new Blob([n],{type:"application/json"}),s=URL.createObjectURL(i),o=document.createElement("a");o.href=s,o.download=e,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(s)}importFromFile(){return new Promise((e,t)=>{let n=document.createElement("input");n.type="file",n.accept=".json",n.onchange=i=>{let s=i.target.files[0];if(s){let o=new FileReader;o.onload=a=>{try{let l=JSON.parse(a.target.result);this.applyAllSettings(l),e(l)}catch(l){t(l)}},o.readAsText(s)}else t(new Error("No file selected"))},n.click()})}},wd=yc;var _c=class{constructor(){console.log("[FlexFrame Build] animation-player.js v28.3 - INLINE BUTTON STYLES - Build: 2026-01-20-0930"),this.mixer=null,this.actions=[],this.currentAction=null,this.isPlaying=!1,this.currentTime=0,this.duration=0,this.playbackSpeed=1,this.isVisible=!1,this.alwaysVisible=!1,this.hideTimeout=null,this.hasPlayedOnce=!1,this.createPlayerElements(),this.setupEventListeners()}createPlayerElements(){this.triggerArea=document.createElement("div"),this.triggerArea.className="animation-player-trigger",document.body.appendChild(this.triggerArea),this.container=document.createElement("div"),this.container.className="animation-player",this.container.innerHTML=`
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
        `,document.body.appendChild(this.container),this.initializeElements()}initializeElements(){this.playPauseBtn=this.container.querySelector("#play-pause-btn"),this.playIcon=this.container.querySelector(".play-icon"),this.pauseIcon=this.container.querySelector(".pause-icon"),this.currentTimeDisplay=this.container.querySelector("#current-time"),this.totalTimeDisplay=this.container.querySelector("#total-time"),this.timelineSlider=this.container.querySelector("#timeline-slider"),this.speedBtn=this.container.querySelector("#speed-btn"),this.speedText=this.container.querySelector("#speed-text"),this.speedMenu=this.container.querySelector("#speed-menu"),setTimeout(()=>{this.playIcon&&this.pauseIcon&&this.updatePlayPauseIcon()},10),this.setVisibility(!0)}setupEventListeners(){this.playPauseBtn.addEventListener("click",()=>{this.togglePlayPause()}),this.timelineSlider.addEventListener("input",e=>{let t=parseFloat(e.target.value)/100;this.seekTo(t)}),this.speedBtn.addEventListener("click",e=>{e.stopPropagation(),this.speedMenu.classList.toggle("show")}),this.speedMenu.addEventListener("click",e=>{if(e.target.classList.contains("speed-option")){let t=parseFloat(e.target.dataset.speed);this.setPlaybackSpeed(t),this.speedMenu.querySelectorAll(".speed-option").forEach(n=>n.classList.remove("active")),e.target.classList.add("active"),this.speedMenu.classList.remove("show")}}),document.addEventListener("click",()=>{this.speedMenu.classList.remove("show")}),document.addEventListener("keydown",e=>{if(!(!this.mixer||!this.currentAction))switch(e.code){case"Space":e.target.tagName!=="INPUT"&&(e.preventDefault(),this.togglePlayPause());break;case"ArrowLeft":this.seekRelative(-.1);break;case"ArrowRight":this.seekRelative(.1);break}}),this.triggerArea.addEventListener("mouseenter",()=>{this.isVisible&&!this.alwaysVisible&&this.showPlayer()}),this.container.addEventListener("mouseenter",()=>{this.isVisible&&!this.alwaysVisible&&(this.clearHideTimeout(),this.container.classList.add("visible"))}),this.container.addEventListener("mouseleave",()=>{this.isVisible&&!this.alwaysVisible&&this.scheduleHide()})}showPlayer(){this.clearHideTimeout(),this.container.classList.add("visible"),this.alwaysVisible||this.scheduleHide()}hidePlayer(){this.alwaysVisible||this.container.classList.remove("visible")}scheduleHide(){this.alwaysVisible||(this.clearHideTimeout(),this.hideTimeout=setTimeout(()=>{!this.container.matches(":hover")&&!this.alwaysVisible&&this.hidePlayer()},2e3))}onCanvasInteraction(){this.isVisible&&!this.alwaysVisible&&this.showPlayer()}clearHideTimeout(){this.hideTimeout&&(clearTimeout(this.hideTimeout),this.hideTimeout=null)}setVisibility(e){this.isVisible=e,this.triggerArea.classList.toggle("active",e),e?(this.container.style.display="block",this.alwaysVisible?(this.container.classList.add("always-visible","visible"),this.clearHideTimeout()):(this.container.classList.remove("always-visible"),this.showPlayer())):(this.container.style.display="none",this.container.classList.remove("visible","always-visible"),this.clearHideTimeout())}setAlwaysVisible(e){let t=this.alwaysVisible;this.alwaysVisible=e,e?(this.container.classList.add("always-visible","visible"),this.clearHideTimeout()):(this.container.classList.remove("always-visible"),t&&this.isVisible&&this.scheduleHide())}setMixer(e,t){this.mixer=e,this.actions=[],t&&t.length>0&&(t.forEach(n=>{let i=e.clipAction(n);this.actions.push(i)}),this.actions.length>0&&(this.currentAction=this.actions[0],this.duration=this.currentAction.getClip().duration,this.updateTimeDisplay(),this.updatePlayPauseIcon()))}updatePlayPauseIcon(){if(!this.playIcon||!this.pauseIcon){console.warn("Animation player icons not found");return}this.isPlaying?(this.playIcon.style.display="none",this.pauseIcon.style.display="block"):(this.playIcon.style.display="block",this.pauseIcon.style.display="none")}togglePlayPause(){this.currentAction&&(this.isPlaying=!this.isPlaying,this.isPlaying?(this.currentAction.play(),this.currentAction.paused=!1,this.hasPlayedOnce||(this.hasPlayedOnce=!0,this.clearHideTimeout(),this.startFirstPlayFade())):this.currentAction.paused=!0,this.updatePlayPauseIcon())}seekTo(e){if(!this.currentAction)return;let t=e*this.duration;this.currentAction.time=t,this.currentTime=t,this.updateTimeDisplay(),this.isPlaying||this.mixer.update(0)}seekRelative(e){if(!this.currentAction)return;let n=Math.max(0,Math.min(this.duration,this.currentTime+e))/this.duration;this.seekTo(n),this.updateSliderPosition()}setPlaybackSpeed(e){this.playbackSpeed=e,this.speedText.textContent=`${e}x`,this.currentAction&&this.currentAction.setEffectiveTimeScale(e)}update(e){!this.mixer||!this.currentAction||!this.isPlaying||(this.currentTime=this.currentAction.time,this.currentTime>=this.duration&&(this.currentTime=0,this.currentAction.time=0),this.updateTimeDisplay(),this.updateSliderPosition())}updateTimeDisplay(){this.currentTimeDisplay.textContent=this.formatTime(this.currentTime),this.totalTimeDisplay.textContent=this.formatTime(this.duration)}updateSliderPosition(){let e=this.duration>0?this.currentTime/this.duration*100:0;this.timelineSlider.value=e}formatTime(e){let t=Math.floor(e/60),n=Math.floor(e%60);return`${t}:${n.toString().padStart(2,"0")}`}getSettings(){return{isPlaying:this.isPlaying,currentTime:this.currentTime,playbackSpeed:this.playbackSpeed,isVisible:this.isVisible,alwaysVisible:this.alwaysVisible}}applySettings(e){if(e.playbackSpeed!==void 0&&this.setPlaybackSpeed(e.playbackSpeed),e.currentTime!==void 0){let t=this.duration>0?e.currentTime/this.duration:0;this.seekTo(t)}e.isVisible!==void 0&&this.setVisibility(e.isVisible),e.alwaysVisible!==void 0&&this.setAlwaysVisible(e.alwaysVisible),e.isPlaying!==void 0&&this.currentAction&&(e.isPlaying!==this.isPlaying?this.togglePlayPause():this.updatePlayPauseIcon())}},Ed=_c;var V0=(r,e,t)=>new Promise(n=>{let i=e==="jpg"?"image/jpeg":e==="webp"?"image/webp":"image/png",s=e==="png"?void 0:t;r.toBlob(n,i,s)}),G0=(r,e)=>{let t=URL.createObjectURL(r),n=document.createElement("a");n.href=t,n.download=e,n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n),setTimeout(()=>URL.revokeObjectURL(t),1e3)},W0=r=>{if(r===0)return"0 Bytes";let e=1024,t=["Bytes","KB","MB","GB"],n=Math.floor(Math.log(r)/Math.log(e));return parseFloat((r/Math.pow(e,n)).toFixed(2))+" "+t[n]},X0=()=>{let r=document.createElement("div");r.className="camera-flash",document.body.appendChild(r),setTimeout(()=>{r.parentNode&&r.parentNode.removeChild(r)},300)},Fs=async(r,e,t,n={})=>{let i={transparent:!1,format:"png",quality:1,filename:"screenshot",width:1920,height:1080,addTimestamp:!0,...n};try{console.log("Taking screenshot with settings:",i),X0();let s=r.getSize(new xe),o=t.aspect,a=document.createElement("canvas");a.width=i.width,a.height=i.height;let l=new Ps({canvas:a,antialias:!0,preserveDrawingBuffer:!0,alpha:i.transparent});if(l.setSize(i.width,i.height),l.setPixelRatio(1),l.shadowMap.enabled=r.shadowMap.enabled,l.shadowMap.type=r.shadowMap.type,l.toneMapping=r.toneMapping,l.toneMappingExposure=r.toneMappingExposure,i.transparent)l.setClearColor(0,0);else{let g=r.getClearColor(new he),y=r.getClearAlpha();l.setClearColor(g,y)}let c=t.clone();c.aspect=i.width/i.height,c.updateProjectionMatrix();let h=null;i.transparent&&e.background&&(h=e.background,e.background=null),l.render(e,c),h!==null&&(e.background=h);let u=i.filename;if(i.addTimestamp){let y=new Date().toISOString().replace(/[:.]/g,"-").slice(0,-5);u+="_"+y}u+="."+i.format;let d=await V0(a,i.format,i.quality);G0(d,u),l.dispose();let f=W0(d.size);return console.log(`\u{1F4F8} Screenshot saved: ${u} (${i.width}\xD7${i.height}, ${f})`),{success:!0,filename:u,size:f}}catch(s){return console.error("Screenshot failed:",s),{success:!1,error:s.message}}},Ad={takeScreenshot:Fs,quickScreenshot:(r,e,t)=>Fs(r,e,t),transparentScreenshot:(r,e,t)=>Fs(r,e,t,{transparent:!0}),hdScreenshot:(r,e,t)=>Fs(r,e,t,{width:1280,height:720}),uhd4kScreenshot:(r,e,t)=>Fs(r,e,t,{width:3840,height:2160}),thumbnailScreenshot:(r,e,t)=>Fs(r,e,t,{width:400,height:300,filename:"thumbnail"})};var Us=class{setupSearchListener(){if(this.menuType!=="search")return;let e=document.getElementById("searchInput"),t=document.getElementById("searchActionBtn"),n=t?.querySelector(".search-icon"),i=t?.querySelector(".clear-icon"),s=document.getElementById("searchSuggestions");if(!e||!t)return;let o=()=>{if(!this.allExercises||this.allExercises.length===0)return;let h=[],u=new Set;this.allExercises.forEach(m=>{m.muscleGroup.forEach(p=>u.add(p))});let d=Array.from(u).slice(0,5),f=new Set;this.allExercises.forEach(m=>{m.equipment.forEach(p=>f.add(p))});let g=Array.from(f).slice(0,4),y=this.allExercises.slice(0,6);return{muscles:d,equipment:g,popularExercises:y}},a=()=>{if(!s||this.searchQuery.length>0)return;let h=o();if(!h)return;let u="";h.popularExercises.length>0&&(u+='<div class="search-suggestion-category">Popular Exercises</div>',h.popularExercises.forEach(d=>{u+=`
                            <div class="search-suggestion-item" data-value="${d.name}">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
                                </svg>
                                <span class="search-suggestion-text">${d.name}</span>
                            </div>
                        `})),h.muscles.length>0&&(u+='<div class="search-suggestion-category">Muscle Groups</div>',h.muscles.forEach(d=>{u+=`
                            <div class="search-suggestion-item" data-value="${d}">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                                </svg>
                                <span class="search-suggestion-text">${d}</span>
                            </div>
                        `})),h.equipment.length>0&&(u+='<div class="search-suggestion-category">Equipment</div>',h.equipment.forEach(d=>{u+=`
                            <div class="search-suggestion-item" data-value="${d}">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
                                </svg>
                                <span class="search-suggestion-text">${d}</span>
                            </div>
                        `})),s.innerHTML=u,s.style.display="block",s.querySelectorAll(".search-suggestion-item").forEach(d=>{d.addEventListener("click",()=>{let f=d.getAttribute("data-value"),g=this.allExercises.find(y=>y.name===f);g?(this.selectThumbnail(g),l(),e.value="",this.searchQuery="",c()):(e.value=f,this.searchQuery=f.toLowerCase().trim(),c(),l(),this.filterDataForMenu(),this.renderVirtualizedGrid())})})},l=()=>{s&&(s.style.display="none")},c=()=>{this.searchQuery&&this.searchQuery.length>0?(n.style.display="none",i.style.display="block"):(n.style.display="block",i.style.display="none")};e.addEventListener("focus",()=>{(!this.searchQuery||this.searchQuery.length===0)&&a()}),e.addEventListener("blur",()=>{setTimeout(()=>l(),200)}),e.addEventListener("input",h=>{this.searchQuery=h.target.value.toLowerCase().trim(),c(),this.searchQuery.length===0?a():l(),this.filterDataForMenu(),this.renderVirtualizedGrid()}),e.addEventListener("keydown",h=>{h.key==="Enter"?(this.searchQuery=e.value.toLowerCase().trim(),c(),l(),this.filterDataForMenu(),this.renderVirtualizedGrid()):h.key==="Escape"&&l()}),t.addEventListener("click",()=>{this.searchQuery&&this.searchQuery.length>0?(e.value="",this.searchQuery="",c(),l(),this.filterDataForMenu(),this.renderVirtualizedGrid(),e.focus()):(this.searchQuery=e.value.toLowerCase().trim(),c(),l(),this.filterDataForMenu(),this.renderVirtualizedGrid())}),this.toggleBtn&&this.toggleBtn.addEventListener("click",()=>{this.menuType==="search"&&this.isOpen&&setTimeout(()=>{e.focus(),c()},150)})}constructor(e){this.menuType=e,this.isOpen=!1,this.hasBeenOpened=!1,this.allExercises=[],this.filteredData=[],this.searchQuery="",this.scrollAmount=200,this.selectedId=null,this.itemHeight=230,this.containerHeight=400,this.visibleItems=Math.ceil(this.containerHeight/this.itemHeight)+4,this.startIndex=0,this.endIndex=this.visibleItems,this.loopMultiplier=3,this.isLooping=!1,this.renderBuffer=2,this.lastRenderedStart=-1,this.lastRenderedEnd=-1,this.scrollVelocity=0,this.scrollDecay=.9,this.maxVelocity=35,this.isScrolling=!1,this.isDragging=!1,this.startY=0,this.startScrollTop=0,this.lastY=0,this.lastTime=0,this.velocityTracker=[],this.recentlyDragged=!1,this.hasDragged=!1,this.scrollInteractionDelay=1500,this.lastScrollInteraction=0;let t=window.flexframeSettings?.primaryColor||"#4a9eff";console.log("[FlexFrame Glow] flexframeSettings:",window.flexframeSettings),console.log("[FlexFrame Glow] primaryColor value:",t),console.log("[FlexFrame Glow] Using primary color for thumbnail glow:",t),this.settings={widthPercentage:90,backgroundColor:"#000000",backgroundOpacity:.9,borderRadius:12,keepOpen:!1,glowColor:t,glowIntensity:.6,glowSize:20},console.log("[FlexFrame Glow] Menu settings initialized with glowColor:",this.settings.glowColor),this.initializeElements(),this.loadExerciseData()}updateTitle(e){let t=document.getElementById(`${this.menuType}TitleHeader`);t&&(t.textContent=e)}initializeElements(){console.log(`\u{1F50D} initializeElements for ${this.menuType}`),this.toggleBtn=document.getElementById(`${this.menuType}Toggle`),this.dropdown=document.getElementById(`${this.menuType}Dropdown`),this.scrollContainer=document.getElementById(`${this.menuType}Container`),this.thumbnailGrid=document.getElementById(`${this.menuType}Grid`),this.scrollUpBtn=document.getElementById(`${this.menuType}ScrollUp`),this.scrollDownBtn=document.getElementById(`${this.menuType}ScrollDown`),console.log("\u{1F50D} Elements found - toggleBtn:",this.toggleBtn,"dropdown:",this.dropdown),this.toggleBtn||console.error(`\u274C BUTTON NOT FOUND: ${this.menuType}Toggle`)}async loadExerciseData(){try{let e="https://FlexFrame.b-cdn.net/Exercise%20Catalogue%20For%20Menus%20%26%20Thumbnails/exercises.json",t=`?t=${Date.now()}`,i=await(await fetch(e+t)).json();if(typeof window.flexframeSettings<"u"&&window.flexframeSettings.hiddenExercises&&Array.isArray(window.flexframeSettings.hiddenExercises)&&window.flexframeSettings.hiddenExercises.length>0){let s=window.flexframeSettings.hiddenExercises,o=i.length;i=i.filter(a=>!s.includes(a.id)),console.log(`\u{1F512} Filtered ${o-i.length} hidden exercises (${i.length} remaining)`)}this.allExercises=i,console.log("\u2705 Loaded exercises from CDN:",e),this.filterDataForMenu(),this.setupEventListeners(),setTimeout(()=>{this.updateStyles(),this.updateGlowStyles(),this.setupSearchListener(),this.updateThumbnailGlowStyles()},100)}catch(e){console.error("Failed to load exercise data:",e),this.generateFallbackData()}}filterDataForMenu(){switch(this.menuType){case"exercises":let e=window.menuManager?.selectedMuscle,t=window.menuManager?.selectedEquipment;e&&t?(this.filteredData=this.allExercises.filter(s=>{let o=s.information?.primaryMuscle===e,a=s.information?.secondaryMuscles?.includes(e),l=o||a,c=s.equipment.includes(t);return l&&c}),this.filteredData.sort((s,o)=>{let a=s.information?.primaryMuscle===e,l=o.information?.primaryMuscle===e;return a&&!l?-1:!a&&l?1:0}),console.log(`Filtering exercises by muscle: ${e} AND equipment: ${t}, found ${this.filteredData.length} exercises`)):e?(this.filteredData=this.allExercises.filter(s=>{let o=s.information?.primaryMuscle===e,a=s.information?.secondaryMuscles?.includes(e);return o||a}),this.filteredData.sort((s,o)=>{let a=s.information?.primaryMuscle===e,l=o.information?.primaryMuscle===e;return a&&!l?-1:!a&&l?1:0}),console.log(`Filtering exercises by muscle: ${e}, found ${this.filteredData.length} exercises`)):t?(this.filteredData=this.allExercises.filter(s=>s.equipment.includes(t)),console.log(`Filtering exercises by equipment: ${t}, found ${this.filteredData.length} exercises`)):this.filteredData=this.allExercises;break;case"muscles":let n=new Set;this.allExercises.forEach(s=>{s.muscleGroup.forEach(o=>n.add(o))}),this.filteredData=Array.from(n).map((s,o)=>({id:`muscle_${o}`,name:s,thumbnailUrl:`https://picsum.photos/200/200?random=${100+o}`,type:"muscle",relatedExercises:this.allExercises.filter(a=>a.muscleGroup.includes(s))}));break;case"equipment":let i=new Set;this.allExercises.forEach(s=>{s.equipment.forEach(o=>i.add(o))}),this.filteredData=Array.from(i).map((s,o)=>({id:`equipment_${o}`,name:s,thumbnailUrl:`https://picsum.photos/200/200?random=${200+o}`,type:"equipment",relatedExercises:this.allExercises.filter(a=>a.equipment.includes(s))}));break;case"search":this.searchQuery?(this.filteredData=this.allExercises.map(s=>{let o=s.name.toLowerCase().includes(this.searchQuery),a=s.muscleGroup.some(f=>f.toLowerCase().includes(this.searchQuery)),l=s.equipment.some(f=>f.toLowerCase().includes(this.searchQuery)),c=s.information?.primaryMuscle?.toLowerCase().includes(this.searchQuery),h=s.information?.secondaryMuscles?.some(f=>f.toLowerCase().includes(this.searchQuery)),u="",d="";return o?(u="Exercise Name",d=s.name):c?(u="Primary Muscle",d=s.information.primaryMuscle):h?(u="Secondary Muscles",d=s.information.secondaryMuscles.find(g=>g.toLowerCase().includes(this.searchQuery))||s.information.secondaryMuscles.join(", ")):a?(u="Muscle Group",d=s.muscleGroup.find(g=>g.toLowerCase().includes(this.searchQuery))||s.muscleGroup.join(", ")):l&&(u="Equipment",d=s.equipment.find(g=>g.toLowerCase().includes(this.searchQuery))||s.equipment.join(", ")),{...s,searchMatch:{type:u,text:d}}}).filter(s=>s.searchMatch.type!==""),console.log(`Search found ${this.filteredData.length} exercises for: "${this.searchQuery}"`)):this.filteredData=this.allExercises;break}this.renderVirtualizedGrid()}generateFallbackData(){this.filteredData=Array.from({length:20},(e,t)=>({id:t+1,name:`${this.menuType} ${t+1}`,thumbnailUrl:`https://picsum.photos/200/200?random=${t+1}`})),this.renderVirtualizedGrid()}renderVirtualizedGrid(){if(!this.thumbnailGrid)return;if(this.thumbnailGrid.innerHTML="",this.menuType==="exercises"){let i=window.menuManager?.selectedMuscle,s=window.menuManager?.selectedEquipment,o=this.dropdown.querySelector(".filter-status-box");if(o&&o.remove(),i||s){let a=document.createElement("div");a.className="filter-status-box";let l='<div class="filter-status-title">Active Filters:</div>';i&&(l+=`
                        <div class="filter-tag">
                            <span class="filter-label">Muscle:</span>
                            <span class="filter-value">${i}</span>
                            <button class="filter-clear" data-filter="muscle" title="Clear muscle filter">\u2715</button>
                        </div>
                    `),s&&(l+=`
                        <div class="filter-tag">
                            <span class="filter-label">Equipment:</span>
                            <span class="filter-value">${s}</span>
                            <button class="filter-clear" data-filter="equipment" title="Clear equipment filter">\u2715</button>
                        </div>
                    `),a.innerHTML=l,a.querySelectorAll(".filter-clear").forEach(h=>{h.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation();let d=u.target.dataset.filter;d==="muscle"?(window.menuManager.selectedMuscle=null,window.menuManager.menus.muscles&&(window.menuManager.menus.muscles.selectedId=null,window.menuManager.menus.muscles.updateVirtualizedContent())):d==="equipment"&&(window.menuManager.selectedEquipment=null,window.menuManager.menus.equipment&&(window.menuManager.menus.equipment.selectedId=null,window.menuManager.menus.equipment.updateVirtualizedContent())),this.filterDataForMenu()})});let c=this.dropdown.querySelector(".thumbnail-scroll-controls");c&&c.after(a)}}this.topSpacer=document.createElement("div"),this.bottomSpacer=document.createElement("div"),this.visibleContainer=document.createElement("div"),this.thumbnailGrid.appendChild(this.topSpacer),this.thumbnailGrid.appendChild(this.visibleContainer),this.thumbnailGrid.appendChild(this.bottomSpacer);let e=this.menuType!=="search",t=e?this.loopMultiplier:1,n=this.filteredData.length*this.itemHeight*t;this.bottomSpacer.style.height=`${n}px`,setTimeout(()=>{this.scrollContainer.scrollTop=e?this.filteredData.length*this.itemHeight:0,this.updateVirtualizedContent()},50)}updateVirtualizedContent(){if(!this.visibleContainer||!this.filteredData.length||this.isDragging)return;let e=this.scrollContainer.scrollTop,t=this.filteredData.length,n=this.menuType!=="search",i=n?this.loopMultiplier:1,s=t*this.itemHeight*i,o=e,a=t*this.itemHeight;n&&e<a*.1?(this.scrollContainer.scrollTop=e+a,o=this.scrollContainer.scrollTop):n&&e>a*2.9&&(this.scrollContainer.scrollTop=e-a,o=this.scrollContainer.scrollTop);let l=Math.floor(o/this.itemHeight),c=this.visibleItems+this.renderBuffer*2;this.startIndex=l,this.endIndex=l+c;let h=this.scrollContainer.scrollTop,u=this.filteredData.length*this.itemHeight,d=Math.floor(h/this.itemHeight)*this.itemHeight;this.topSpacer.style.height=`${d}px`,this.bottomSpacer.style.height=`${u*i-d-(this.endIndex-this.startIndex)*this.itemHeight}px`;let f=new Set,g=null;for(let m=this.startIndex;m<this.endIndex;m++){let p=this.filteredData.length,M;if(n)M=(m%p+p)%p;else if(M=m,M>=p)continue;let w=this.filteredData[M];if(!w)continue;let _=`${w.id}_pos_${m}`;f.add(_);let I=this.visibleContainer.querySelector(`[data-position-id="${_}"]`),C="";if(this.menuType,this.menuType==="search"&&w.searchMatch&&this.searchQuery){let S=v=>{let T=new RegExp(`(${this.searchQuery})`,"gi");return v.replace(T,"<mark>$1</mark>")};C=`
                    <div class="thumbnail-search-match">
                        <div class="search-match-type">${w.searchMatch.type}</div>
                        <div class="search-match-text">${S(w.searchMatch.text)}</div>
                    </div>
                `,console.log(`Generated searchMatchHTML for ${w.name}:`,C)}let A="";if(this.menuType==="exercises"&&w.information){let S=w.information.primaryMuscle||"",v=w.information.secondaryMuscles||[];A=`
                    <div class="thumbnail-muscle-info">
                        ${S?`<div class="primary-muscle"><strong>Primary:</strong> ${S}</div>`:""}
                        ${v.length>0?`<div class="secondary-muscles"><strong>Secondary:</strong> ${v.join(", ")}</div>`:""}
                    </div>
                `}let R=`
                <img src="${w.thumbnailUrl}" alt="${w.name}" loading="lazy">
                <div class="thumbnail-label">${w.name}</div>
                ${C}
                ${A}
            `;if(!I)I=document.createElement("div"),I.className="thumbnail-item",I.dataset.id=w.id,I.dataset.positionId=_,I.innerHTML=R,I.addEventListener("click",S=>{if(this.recentlyDragged&&this.hasDragged){S.preventDefault(),S.stopPropagation();return}this.selectThumbnail(w)}),g&&g.nextSibling?this.visibleContainer.insertBefore(I,g.nextSibling):!g&&this.visibleContainer.firstChild?this.visibleContainer.insertBefore(I,this.visibleContainer.firstChild):this.visibleContainer.appendChild(I);else{let S=I.classList.contains("selected");I.innerHTML=R,S&&I.classList.add("selected")}g=I}let y=Array.from(this.visibleContainer.querySelectorAll(".thumbnail-item"));for(let m of y){let p=m.dataset.positionId;f.has(p)||this.visibleContainer.removeChild(m)}setTimeout(()=>{if(this.updateStyles(),this.updateThumbnailGlowStyles(),this.selectedId){let m=this.visibleContainer.querySelector(`[data-id="${this.selectedId}"]`);m&&m.classList.add("selected")}},50)}selectThumbnail(e){this.selectedId=e.id,this.visibleContainer.querySelectorAll(".thumbnail-item").forEach(o=>o.classList.remove("selected"));let n=this.visibleContainer.querySelector(`[data-id="${e.id}"]`);n&&n.classList.add("selected");let i=this.menuType==="search"?"exercisesSelected":`${this.menuType}Selected`,s=new CustomEvent(i,{detail:{item:e,menuType:this.menuType}});document.dispatchEvent(s)}setupEventListeners(){console.log(`\u{1F3AF} Setting up click listener for ${this.menuType}, button:`,this.toggleBtn),console.log("\u{1F3AF} Button parent:",this.toggleBtn?.parentElement),console.log("\u{1F3AF} Button is in flexframe container:",this.toggleBtn?.closest("#flexframe-viewer-container")!==null),this.toggleBtn.onclick=e=>{console.log(`\u{1F4A5} CLICK HANDLER FIRED for ${this.menuType}!`),e.stopPropagation(),this.toggleMenu()},document.addEventListener("click",e=>{(e.target===this.toggleBtn||this.toggleBtn.contains(e.target))&&console.log(`\u{1F30D} DOCUMENT CLICK detected on ${this.menuType} button, target:`,e.target)},!0),this.scrollUpBtn.addEventListener("click",()=>{this.scrollContainer.scrollBy({top:-this.scrollAmount,behavior:"smooth"})}),this.scrollDownBtn.addEventListener("click",()=>{this.scrollContainer.scrollBy({top:this.scrollAmount,behavior:"smooth"})}),this.scrollContainer.addEventListener("wheel",e=>{e.preventDefault();let t=e.deltaY*3.5;this.scrollVelocity+=t*.2,this.scrollVelocity=Math.max(-this.maxVelocity,Math.min(this.maxVelocity,this.scrollVelocity)),this.lastScrollInteraction=Date.now(),this.isScrolling||this.startMomentumScroll()}),this.scrollContainer.addEventListener("scroll",()=>{this.updateVirtualizedContent(),this.updateScrollButtons()}),this.scrollContainer.addEventListener("mousedown",e=>{this.startDrag(e.clientY),e.preventDefault()}),this.scrollContainer.addEventListener("touchstart",e=>{this.startDrag(e.touches[0].clientY),e.preventDefault()},{passive:!1}),document.addEventListener("mousemove",e=>{this.isDragging&&(this.handleDrag(e.clientY),e.preventDefault())}),document.addEventListener("touchmove",e=>{this.isDragging&&(this.handleDrag(e.touches[0].clientY),e.preventDefault())},{passive:!1}),document.addEventListener("mouseup",()=>{this.isDragging&&this.endDrag()}),document.addEventListener("touchend",()=>{this.isDragging&&this.endDrag()}),this.scrollContainer.addEventListener("selectstart",e=>{this.isDragging&&e.preventDefault()}),document.addEventListener("keydown",e=>{this.isOpen&&(e.key==="Escape"?this.settings.keepOpen||this.closeMenu():e.key==="ArrowUp"?(e.preventDefault(),this.scrollContainer.scrollBy({top:-this.scrollAmount,behavior:"smooth"})):e.key==="ArrowDown"&&(e.preventDefault(),this.scrollContainer.scrollBy({top:this.scrollAmount,behavior:"smooth"})))}),this.scrollContainer.addEventListener("scroll",()=>{this.updateScrollButtons()})}updateThumbnailGlowStyles(){let e=this.settings.glowColor.replace("#",""),t=parseInt(e.substr(0,2),16),n=parseInt(e.substr(2,2),16),i=parseInt(e.substr(4,2),16),s=`rgba(${t}, ${n}, ${i}, ${this.settings.glowIntensity*.8})`,o=`thumbnail-glow-${this.menuType}`,a=document.getElementById(o);a||(a=document.createElement("style"),a.id=o,document.head.appendChild(a)),a.textContent=`
            #${this.menuType}Grid .thumbnail-item.selected {
                border-color: ${this.settings.glowColor};
                box-shadow: 0 0 ${this.settings.glowSize}px ${s};
            }
            #${this.menuType}Grid .thumbnail-item.selected::before {
                background: ${this.settings.glowColor};
                box-shadow: 0 0 ${Math.floor(this.settings.glowSize*.5)}px ${s};
            }
        `}startMomentumScroll(){this.isScrolling=!0,this.momentumScrollFrame()}momentumScrollFrame(){if(Math.abs(this.scrollVelocity)<.1){this.isScrolling=!1,this.scrollVelocity=0;return}this.scrollContainer.scrollBy({top:this.scrollVelocity,behavior:"auto"}),this.updateVirtualizedContent(),this.scrollVelocity*=this.scrollDecay,requestAnimationFrame(()=>this.momentumScrollFrame())}startDrag(e){this.isDragging=!0,this.startY=e,this.startScrollTop=this.scrollContainer.scrollTop,this.lastY=e,this.lastTime=Date.now(),this.velocityTracker=[],this.hasDragged=!1,this.isScrolling=!1,this.scrollVelocity=0,this.scrollContainer.style.cursor="grabbing"}handleDrag(e){if(!this.isDragging)return;let t=this.startY-e;Math.abs(t)>5&&(this.hasDragged=!0);let n=this.startScrollTop+t;this.scrollContainer.scrollTop=n;let i=Date.now(),s=i-this.lastTime,o=e-this.lastY;if(s>0){let a=o/s;this.velocityTracker.push({velocity:a,time:i}),this.velocityTracker=this.velocityTracker.filter(l=>i-l.time<100)}this.lastY=e,this.lastTime=i}endDrag(){if(this.isDragging){if(this.isDragging=!1,this.scrollContainer.style.cursor="grab",this.hasDragged&&(this.recentlyDragged=!0,this.lastScrollInteraction=Date.now(),setTimeout(()=>{this.recentlyDragged=!1,this.hasDragged=!1},100)),this.velocityTracker.length>0){let e=this.velocityTracker.reduce((t,n)=>t+n.velocity,0)/this.velocityTracker.length;this.scrollVelocity=-e*15,this.scrollVelocity=Math.max(-this.maxVelocity,Math.min(this.maxVelocity,this.scrollVelocity)),Math.abs(this.scrollVelocity)>1&&this.startMomentumScroll()}this.velocityTracker=[],setTimeout(()=>{this.updateVirtualizedContent()},50)}}hasRecentScrollInteraction(){return Date.now()-this.lastScrollInteraction<this.scrollInteractionDelay}momentumScrollFrame(){if(Math.abs(this.scrollVelocity)<.1){this.isScrolling=!1,this.scrollVelocity=0;return}this.scrollContainer.scrollBy({top:this.scrollVelocity,behavior:"auto"}),this.scrollVelocity*=this.scrollDecay,requestAnimationFrame(()=>this.momentumScrollFrame())}updateScrollButtons(){this.scrollUpBtn.style.opacity="1",this.scrollDownBtn.style.opacity="1",this.scrollUpBtn.disabled=!1,this.scrollDownBtn.disabled=!1}toggleMenu(){console.log(`\u{1F504} toggleMenu called for ${this.menuType}, isOpen:`,this.isOpen),this.isOpen?this.closeMenu():this.openMenu()}openMenu(){if(console.log(`\u{1F7E2} openMenu called for ${this.menuType}`),this.isOpen=!0,document.dispatchEvent(new CustomEvent("closeAllThumbnailMenus",{detail:{except:this.menuType}})),this.menuType==="search"){this.filterDataForMenu(),this.renderVirtualizedGrid();let t=document.getElementById("searchInput");t&&setTimeout(()=>t.focus(),150)}this.dropdown.classList.add("show"),console.log(`\u2705 Added .show class to ${this.menuType} dropdown, classes:`,this.dropdown.className),this.toggleBtn.classList.add("active"),this.scrollContainer&&(this.scrollContainer.style.cursor="grab",this.hasBeenOpened||(setTimeout(()=>{let t=this.scrollContainer.scrollTop;this.scrollContainer.scrollTo({top:t+30,behavior:"smooth"}),setTimeout(()=>{this.scrollContainer.scrollTo({top:t,behavior:"smooth"})},400)},300),this.hasBeenOpened=!0));let e=document.querySelector(".thumbnail-grid-container");e&&e.classList.add("menu-active"),setTimeout(()=>{this.visibleContainer&&this.updateVirtualizedContent(),this.updateScrollButtons()},100)}closeMenu(){if(this.dropdown.classList.remove("show"),this.toggleBtn.classList.remove("active"),this.isOpen=!1,!(window.menuManager&&Object.values(window.menuManager.menus).some(t=>t.isOpen))){let t=document.querySelector(".thumbnail-grid-container");t&&t.classList.remove("menu-active")}}updateStyles(){if(!this.dropdown)return;let e=this.settings.backgroundColor.replace("#",""),t=parseInt(e.substr(0,2),16),n=parseInt(e.substr(2,2),16),i=parseInt(e.substr(4,2),16);this.dropdown.style.width="250px",this.dropdown.style.background=`rgba(${t}, ${n}, ${i}, ${this.settings.backgroundOpacity})`,this.dropdown.style.borderRadius=`${this.settings.borderRadius}px`}updateGlowStyles(){if(!this.toggleBtn)return;let e=this.settings.glowColor.replace("#",""),t=parseInt(e.substr(0,2),16),n=parseInt(e.substr(2,2),16),i=parseInt(e.substr(4,2),16),s=`rgba(${t}, ${n}, ${i}, ${this.settings.glowIntensity})`,o=`rgba(${t}, ${n}, ${i}, ${this.settings.glowIntensity*.5})`,a=`glow-${this.menuType}`,l=document.getElementById(a);l||(l=document.createElement("style"),l.id=a,document.head.appendChild(l)),l.textContent=`
            #${this.menuType}Toggle.active {
                border-color: ${this.settings.glowColor};
                box-shadow: 0 0 ${this.settings.glowSize}px ${s}, 0 0 ${this.settings.glowSize*2}px ${o};
            }
            #${this.menuType}Toggle.active:hover {
                box-shadow: 0 0 ${this.settings.glowSize*1.25}px ${s.replace(this.settings.glowIntensity,this.settings.glowIntensity+.2)}, 0 0 ${this.settings.glowSize*2.5}px ${o.replace(this.settings.glowIntensity*.5,this.settings.glowIntensity*.7)};
            }
        `}updateThumbnailGlowStyles(){let e=this.settings.glowColor.replace("#",""),t=parseInt(e.substr(0,2),16),n=parseInt(e.substr(2,2),16),i=parseInt(e.substr(4,2),16),s=`rgba(${t}, ${n}, ${i}, ${this.settings.glowIntensity})`,o=`rgba(${t}, ${n}, ${i}, ${this.settings.glowIntensity*.5})`,a=`thumbnail-glow-${this.menuType}`,l=document.getElementById(a);l||(l=document.createElement("style"),l.id=a,document.head.appendChild(l)),l.textContent=`
            #${this.menuType}Grid .thumbnail-item.selected {
                border-color: ${this.settings.glowColor};
                box-shadow: 0 0 ${this.settings.glowSize}px ${s};
            }
            #${this.menuType}Grid .thumbnail-item.selected img {
                border: 3px solid ${this.settings.glowColor};
                box-shadow: 0 0 ${this.settings.glowSize}px ${o};
            }
        `}getSettings(){return{...this.settings}}applySettings(e){this.settings={...this.settings,...e},this.updateStyles(),this.updateGlowStyles(),this.updateThumbnailGlowStyles()}},Fa=class{constructor(){console.log("\u{1F3AC} MultiThumbnailMenuSystem constructor started"),this.menus={},this.selectedMuscle=null,this.selectedEquipment=null,this.selectedExerciseId=null;let e=window.flexframeSettings?.primaryColor||"#4a9eff";console.log("[FlexFrame Glow] MultiThumbnailMenuSystem using primaryColor:",e),document.documentElement.style.setProperty("--flexframe-primary-color",e);let t=e.replace("#",""),n=parseInt(t.substring(0,2),16),i=parseInt(t.substring(2,4),16),s=parseInt(t.substring(4,6),16);document.documentElement.style.setProperty("--flexframe-primary-color-rgb",`${n}, ${i}, ${s}`),console.log("[FlexFrame Glow] Set CSS variables --flexframe-primary-color:",e,"RGB:",n,i,s),this.settings={widthPercentage:90,backgroundColor:"#000000",backgroundOpacity:.9,borderRadius:12,keepOpen:!1,glowColor:e,glowIntensity:.6,glowSize:20},console.log("\u{1F4CB} Calling initializeMenus..."),this.initializeMenus(),console.log("\u{1F3A7} Calling setupGlobalListeners..."),this.setupGlobalListeners(),console.log("\u2705 MultiThumbnailMenuSystem constructor complete")}initializeMenus(){console.log("\u{1F3D7}\uFE0F initializeMenus started"),console.log("Creating exercises menu..."),this.menus.exercises=new Us("exercises"),console.log("Creating muscles menu..."),this.menus.muscles=new Us("muscles"),console.log("Creating equipment menu..."),this.menus.equipment=new Us("equipment"),console.log("Creating search menu..."),this.menus.search=new Us("search"),console.log("\u2705 All 4 menus created:",this.menus)}setupGlobalListeners(){document.addEventListener("exercisesSelected",t=>{this.selectedExerciseId=t.detail.item.id}),document.addEventListener("searchSelected",t=>{console.log("Search selection made, selecting corresponding items in other tabs");let n=t.detail.item;if(console.log("Selected exercise data:",n),this.menus.muscles&&n.information?.primaryMuscle){let i=n.information.primaryMuscle;this.selectedMuscle=i,console.log("Setting muscle:",i);let s=this.menus.muscles.filteredData.find(o=>o.name===i);console.log("Found muscle item:",s),s&&(this.menus.muscles.selectedId=s.id)}if(this.menus.equipment&&n.equipment&&n.equipment.length>0){let i=n.equipment[0];this.selectedEquipment=i,console.log("Setting equipment:",i);let s=this.menus.equipment.filteredData.find(o=>o.name===i);console.log("Found equipment item:",s),s&&(this.menus.equipment.selectedId=s.id)}this.menus.exercises&&this.menus.exercises.filterDataForMenu(),this.menus.exercises&&n.id&&(this.menus.exercises.selectedId=n.id,this.selectedExerciseId=n.id,console.log("Set exercise selection:",n.id)),setTimeout(()=>{if(this.menus.exercises?.visibleContainer&&n.id){this.menus.exercises.visibleContainer.querySelectorAll(".thumbnail-item").forEach(o=>o.classList.remove("selected"));let s=this.menus.exercises.visibleContainer.querySelector(`[data-id="${n.id}"]`);s?(s.classList.add("selected"),console.log("Applied visual selection to exercise")):console.log("Exercise element not found in DOM")}if(this.menus.muscles?.visibleContainer&&this.menus.muscles.selectedId){this.menus.muscles.visibleContainer.querySelectorAll(".thumbnail-item").forEach(o=>o.classList.remove("selected"));let s=this.menus.muscles.visibleContainer.querySelector(`[data-id="${this.menus.muscles.selectedId}"]`);s?(s.classList.add("selected"),console.log("Applied visual selection to muscle")):console.log("Muscle element not found in DOM")}if(this.menus.equipment?.visibleContainer&&this.menus.equipment.selectedId){this.menus.equipment.visibleContainer.querySelectorAll(".thumbnail-item").forEach(o=>o.classList.remove("selected"));let s=this.menus.equipment.visibleContainer.querySelector(`[data-id="${this.menus.equipment.selectedId}"]`);s?(s.classList.add("selected"),console.log("Applied visual selection to equipment")):console.log("Equipment element not found in DOM")}},300)}),document.addEventListener("musclesSelected",t=>{this.selectedMuscle=t.detail.item.name,console.log("Muscle selected:",this.selectedMuscle),this.menus.exercises&&(this.menus.exercises.filterDataForMenu(),setTimeout(()=>this.restoreExerciseSelection(),200),setTimeout(()=>this.restoreExerciseSelection(),400))}),document.addEventListener("equipmentSelected",t=>{this.selectedEquipment=t.detail.item.name,console.log("Equipment selected:",this.selectedEquipment),this.menus.exercises&&(this.menus.exercises.filterDataForMenu(),setTimeout(()=>this.restoreExerciseSelection(),200),setTimeout(()=>this.restoreExerciseSelection(),400))}),document.addEventListener("closeAllThumbnailMenus",t=>{let n=t.detail?.except;Object.entries(this.menus).forEach(([i,s])=>{i!==n&&s.closeMenu()})});let e=document.querySelector(".thumbnail-grid-container");if(e){e.addEventListener("mouseenter",()=>{e.classList.add("menu-visible")});let t=e.querySelector(".menu-hint-tab");t&&t.addEventListener("click",n=>{n.stopPropagation(),e.classList.contains("menu-visible")||e.classList.contains("menu-active")?(Object.values(this.menus).forEach(i=>{i.isOpen&&i.closeMenu()}),e.classList.remove("menu-visible")):e.classList.add("menu-visible")})}document.addEventListener("click",t=>{if(e&&!e.contains(t.target)){if(Object.values(this.menus).some(s=>s.hasRecentScrollInteraction&&s.hasRecentScrollInteraction()))return;e.classList.remove("menu-visible"),Object.values(this.menus).some(s=>s.isOpen)&&Object.values(this.menus).forEach(s=>{s.isOpen&&s.closeMenu()})}})}restoreExerciseSelection(){if(this.selectedExerciseId&&this.menus.exercises&&this.menus.exercises.visibleContainer){let e=this.menus.exercises.visibleContainer.querySelector(`[data-id="${this.selectedExerciseId}"]`);e?(e.classList.add("selected"),console.log("Restored exercise selection:",this.selectedExerciseId)):console.log("Could not restore - element not found:",this.selectedExerciseId)}}updateAllSettings(e){this.settings={...this.settings,...e},Object.values(this.menus).forEach(t=>{t.applySettings(this.settings),t.updateGlowStyles(),t.updateThumbnailGlowStyles()})}getSettings(){return{...this.settings}}applySettings(e){this.updateAllSettings(e)}async copySettingsToClipboard(){let e=JSON.stringify(this.settings,null,2);try{await navigator.clipboard.writeText(e),alert("Multi-thumbnail menu settings copied to clipboard!")}catch(t){console.error("Failed to copy to clipboard:",t),alert("Failed to copy settings to clipboard.")}}};var Ns=class{constructor(e){this.menuType=e,this.isOpen=!1,this.scrollAmount=200,this.infoData=[],this.settings={widthPercentage:90,backgroundColor:"#000000",backgroundOpacity:.9,borderRadius:12,keepOpen:!1,glowColor:"#4a9eff",glowIntensity:.6,glowSize:20},this.initializeElements(),this.setupEventListeners(),this.loadInfoData()}initializeElements(){this.toggleBtn=document.getElementById(`${this.menuType}Toggle`),this.dropdown=document.querySelector(`.thumbnail-dropdown-right#${this.menuType}Dropdown`),this.scrollContainer=document.getElementById(`${this.menuType}Container`),this.grid=document.getElementById(`${this.menuType}Grid`),this.scrollUpBtn=document.getElementById(`${this.menuType}ScrollUp`),this.scrollDownBtn=document.getElementById(`${this.menuType}ScrollDown`),(!this.toggleBtn||!this.dropdown)&&console.error(`Failed to initialize ${this.menuType} menu elements`)}async loadInfoData(){try{let t=await(await fetch(In("data/right-menu-info.json"))).json();t[this.menuType]?(this.infoData=t[this.menuType].items||[],this.renderInfoItems()):(console.warn(`No data found for ${this.menuType}`),this.infoData=[])}catch(e){console.error("Error loading right menu info data:",e),this.infoData=[]}}renderInfoItems(){if(this.grid){if(this.grid.innerHTML="",this.infoData.length===0){this.grid.innerHTML='<div class="info-step-empty">No information available.</div>';return}this.infoData.forEach(e=>{let t=document.createElement("div");t.className="info-step-item",t.innerHTML=`
                <div class="info-step-title">${e.name}</div>
                <div class="info-step-text">${e.text||""}</div>
            `,this.grid.appendChild(t)})}}setupEventListeners(){this.toggleBtn&&(this.toggleBtn.addEventListener("click",e=>{e.stopPropagation(),this.toggleMenu()}),this.scrollUpBtn&&this.scrollDownBtn&&(this.scrollUpBtn.addEventListener("click",()=>{this.scrollContainer.scrollBy({top:-this.scrollAmount,behavior:"smooth"})}),this.scrollDownBtn.addEventListener("click",()=>{this.scrollContainer.scrollBy({top:this.scrollAmount,behavior:"smooth"})})))}toggleMenu(){this.isOpen?this.closeMenu():this.openMenu()}openMenu(){document.dispatchEvent(new CustomEvent("closeAllRightMenus",{detail:{except:this.menuType}})),this.dropdown.classList.add("show"),this.toggleBtn.classList.add("active"),this.isOpen=!0;let e=document.querySelector(".thumbnail-grid-container-right");e&&e.classList.add("menu-active")}closeMenu(){this.dropdown.classList.remove("show"),this.toggleBtn.classList.remove("active"),this.isOpen=!1;let e=document.querySelector(".thumbnail-grid-container-right");e&&(document.querySelectorAll(".thumbnail-dropdown-right.show").length>0||e.classList.remove("menu-active"))}updateStyles(){if(!this.dropdown)return;let e=`${this.settings.widthPercentage}%`,t=this.settings.backgroundColor,n=this.settings.backgroundOpacity,i=`${this.settings.borderRadius}px`;this.dropdown.style.width=e,this.dropdown.style.maxWidth=e,this.dropdown.style.backgroundColor=`${t}${Math.round(n*255).toString(16).padStart(2,"0")}`,this.dropdown.style.borderRadius=i}getSettings(){return{...this.settings}}applySettings(e){this.settings={...this.settings,...e},this.updateStyles()}updateTitle(e){this.toggleBtn&&(this.toggleBtn.textContent=e)}updateContent(e){if(this.grid){if(this.grid.innerHTML="",!e||e.length===0){this.grid.innerHTML='<div class="info-step-empty">No information available.</div>';return}e.forEach(t=>{let n=document.createElement("div");n.className="info-step-item",n.innerHTML=`
                <div class="info-step-title">${t.heading||""}</div>
                <div class="info-step-text">${t.content||""}</div>
            `,this.grid.appendChild(n)})}}},Ua=class{constructor(){this.menus={},this.settings={widthPercentage:90,backgroundColor:"#000000",backgroundOpacity:.9,borderRadius:12,keepOpen:!1,glowColor:"#4a9eff",glowIntensity:.6,glowSize:20},this.initializeMenus(),this.setupGlobalListeners()}initializeMenus(){this.menus.info1=new Ns("info1"),this.menus.info2=new Ns("info2"),this.menus.info3=new Ns("info3"),this.menus.info4=new Ns("info4")}setupGlobalListeners(){document.addEventListener("closeAllRightMenus",t=>{let n=t.detail?.except;Object.entries(this.menus).forEach(([i,s])=>{i!==n&&s.closeMenu()})});let e=document.querySelector(".thumbnail-grid-container-right");if(e){e.addEventListener("mouseenter",()=>{e.classList.add("menu-visible")});let t=e.querySelector(".menu-hint-tab-right");t&&t.addEventListener("click",n=>{n.stopPropagation(),e.classList.contains("menu-visible")||e.classList.contains("menu-active")?(Object.values(this.menus).forEach(i=>{i.isOpen&&i.closeMenu()}),e.classList.remove("menu-visible")):e.classList.add("menu-visible")})}document.addEventListener("click",t=>{e&&!e.contains(t.target)&&(e.classList.remove("menu-visible"),Object.values(this.menus).some(i=>i.isOpen)&&Object.values(this.menus).forEach(i=>{i.isOpen&&i.closeMenu()}))})}updateAllSettings(e){this.settings={...this.settings,...e},Object.values(this.menus).forEach(t=>{t.applySettings(this.settings)})}getSettings(){return{...this.settings}}updateFromConfig(e){console.log("Updating right menu from config:",e);let t={exerciseInformation:"info1",howToGuide:"info2",setupGuide:"info3",alternativeExercises:"info4"};Object.entries(e).forEach(([n,i])=>{let s=t[n];s&&this.menus[s]&&(i.title&&this.menus[s].updateTitle(i.title),i.sections&&Array.isArray(i.sections)&&this.menus[s].updateContent(i.sections))})}copySettingsToClipboard(){let e=JSON.stringify(this.settings,null,2);navigator.clipboard.writeText(e).then(()=>{console.log("Right menu settings copied to clipboard")}).catch(t=>{console.error("Failed to copy settings:",t)})}};var xc=class{constructor(){console.log("[FlexFrame AR] ARHandler initialized"),this.currentConfig=null,this.qrModal=null,this.branding={logoUrl:null,websiteUrl:"https://thegymmanagerblog.com",companyName:"FlexFrame",callToAction:"Visit FlexFrame"},this.setupARButton()}setBranding(e){e.logoUrl&&(this.branding.logoUrl=e.logoUrl),e.websiteUrl&&(this.branding.websiteUrl=e.websiteUrl),e.companyName&&(this.branding.companyName=e.companyName),e.callToAction&&(this.branding.callToAction=e.callToAction),console.log("[FlexFrame AR] Branding updated:",this.branding)}getDeviceType(){let e=navigator.userAgent.toLowerCase();return/iphone|ipad|ipod/.test(e)?"ios":/android/.test(e)?"android":"desktop"}supportsAR(){let e=this.getDeviceType();if(e==="ios"){let t=document.createElement("a");return t.relList&&t.relList.supports&&t.relList.supports("ar")}else if(e==="android")return!0;return!1}updateConfig(e){this.currentConfig=e,console.log("[FlexFrame AR] Config updated:",e?.ar)}setupARButton(){let e=()=>{let t=document.getElementById("ar-btn");t?(t.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),this.launchAR()}),console.log("[FlexFrame AR] AR button handler attached")):setTimeout(e,500)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):setTimeout(e,100)}launchAR(){if(console.log("[FlexFrame AR] Launch AR triggered"),!this.currentConfig?.ar){console.warn("[FlexFrame AR] No AR config available"),this.showNoARMessage();return}let e=this.getDeviceType();switch(console.log("[FlexFrame AR] Device type:",e),e){case"ios":this.launchIOSAR();break;case"android":this.launchAndroidAR();break;case"desktop":this.showQRCodeModal();break}}launchIOSAR(){let e=this.currentConfig.ar.usdz;if(!e){console.warn("[FlexFrame AR] No USDZ file available"),this.launchAndroidAR();return}console.log("[FlexFrame AR] Launching iOS AR with USDZ:",e);let t=e,n=[];this.branding.websiteUrl&&(n.push(`callToAction=${encodeURIComponent(this.branding.callToAction)}`),n.push(`checkoutTitle=${encodeURIComponent(this.branding.companyName)}`),n.push(`checkoutSubtitle=${encodeURIComponent("Tap to visit website")}`),n.push(`canonicalWebPageURL=${encodeURIComponent(this.branding.websiteUrl)}`)),this.branding.logoUrl&&n.push(`custom=${encodeURIComponent(this.branding.logoUrl)}`),n.length>0&&(t+="#"+n.join("&")),console.log("[FlexFrame AR] iOS AR URL with branding:",t);let i=document.createElement("a");i.setAttribute("rel","ar"),i.setAttribute("href",t);let s=document.createElement("img");s.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",s.style.width="1px",s.style.height="1px",i.appendChild(s),document.body.appendChild(i),i.click(),document.body.removeChild(i)}launchAndroidAR(){let e=this.currentConfig.ar.glb;if(!e){console.warn("[FlexFrame AR] No GLB file available for AR"),this.showNoARMessage();return}console.log("[FlexFrame AR] Launching Android AR with GLB:",e);let t=[`file=${encodeURIComponent(e)}`,"mode=ar_preferred",`title=${encodeURIComponent(this.currentConfig.exerciseId||"Exercise")}`];this.branding.websiteUrl&&(t.push(`link=${encodeURIComponent(this.branding.websiteUrl)}`),t.push(`linkText=${encodeURIComponent(this.branding.callToAction)}`));let n="intent://arvr.google.com/scene-viewer/1.0?"+t.join("&")+`#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(e)};end;`;console.log("[FlexFrame AR] Android AR URL with branding:",n),window.location.href=n}showQRCodeModal(){console.log("[FlexFrame AR] Showing QR code modal for desktop"),this.qrModal||this.createQRModal();let e=this.generateARPageUrl();this.updateQRCode(e),this.qrModal.style.display="flex"}createQRModal(){this.qrModal=document.createElement("div"),this.qrModal.id="ar-qr-modal",this.qrModal.innerHTML=`
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
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                    border-radius: 20px;
                    padding: 40px;
                    text-align: center;
                    max-width: 400px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                    border: 1px solid rgba(74, 158, 255, 0.3);
                ">
                    <div class="ar-qr-header" style="margin-bottom: 24px;">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style="margin-bottom: 16px;">
                            <path d="M3 4v6h2V6h4V4H3zm18 0h-6v2h4v4h2V4zM3 20v-6h2v4h4v2H3zm18 0h-6v-2h4v-4h2v6z" fill="#4a9eff"/>
                            <path d="M12 8l-4 6h3v4h2v-4h3l-4-6z" fill="#4a9eff"/>
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
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
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
        `,document.body.appendChild(this.qrModal),this.qrModal.querySelector("#ar-qr-close").addEventListener("click",()=>{this.qrModal.style.display="none"});let t=this.qrModal.querySelector(".ar-qr-modal-overlay");t.addEventListener("click",n=>{n.target===t&&(this.qrModal.style.display="none")}),document.addEventListener("keydown",n=>{n.key==="Escape"&&this.qrModal.style.display==="flex"&&(this.qrModal.style.display="none")})}generateARPageUrl(){let e=this.currentConfig?.ar?.glb||this.currentConfig?.modelUrlSQ,t=this.currentConfig?.ar?.usdz,n=this.currentConfig?.exerciseId||"exercise",i=new URLSearchParams({glb:e||"",usdz:t||"",title:n});return this.branding.logoUrl&&i.set("logo",this.branding.logoUrl),this.branding.websiteUrl&&i.set("website",this.branding.websiteUrl),this.branding.companyName&&i.set("company",this.branding.companyName),this.branding.callToAction&&i.set("cta",this.branding.callToAction),`${window.location.origin}/wp-content/plugins/flexframe-v28/viewer/ar-viewer.html?${i.toString()}`}updateQRCode(e){let t=document.getElementById("ar-qr-code");if(!t)return;let n=`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(e)}`;t.innerHTML=`
            <img src="${n}" alt="Scan to view in AR" style="width: 200px; height: 200px; display: block;">
        `,console.log("[FlexFrame AR] QR code generated for URL:",e)}showNoARMessage(){alert("AR is not available for this exercise. Please ensure the exercise has AR models configured.")}hideQRModal(){this.qrModal&&(this.qrModal.style.display="none")}},vc=new xc;function bc(r,e){if(e===Fl)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Ts||e===Dr){let t=r.getIndex();if(t===null){let o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}let n=t.count-2,i=[];if(e===Ts)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}var Na=class extends xn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Cc(t)}),this.register(function(t){return new Rc(t)}),this.register(function(t){return new Bc(t)}),this.register(function(t){return new kc(t)}),this.register(function(t){return new zc(t)}),this.register(function(t){return new Pc(t)}),this.register(function(t){return new Lc(t)}),this.register(function(t){return new Dc(t)}),this.register(function(t){return new Fc(t)}),this.register(function(t){return new Tc(t)}),this.register(function(t){return new Uc(t)}),this.register(function(t){return new Ic(t)}),this.register(function(t){return new Oc(t)}),this.register(function(t){return new Nc(t)}),this.register(function(t){return new Ec(t)}),this.register(function(t){return new Hc(t)}),this.register(function(t){return new Vc(t)})}load(e,t,n,i){let s=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let c=qn.extractUrlBase(e);o=qn.resolveURL(c,this.path)}else o=qn.extractUrlBase(e);this.manager.itemStart(e);let a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Di(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(h){t(h),s.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s,o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Pd){try{o[Be.KHR_BINARY_GLTF]=new Gc(e)}catch(u){i&&i(u);return}s=JSON.parse(o[Be.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new Kc(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){let u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case Be.KHR_MATERIALS_UNLIT:o[u]=new Ac;break;case Be.KHR_DRACO_MESH_COMPRESSION:o[u]=new Wc(s,this.dracoLoader);break;case Be.KHR_TEXTURE_TRANSFORM:o[u]=new Xc;break;case Be.KHR_MESH_QUANTIZATION:o[u]=new qc;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}};function q0(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}var Be={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Ec=class{constructor(e){this.parser=e,this.name=Be.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],c,h=new he(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],pt);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Oi(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new gr(h),c.distance=u;break;case"spot":c=new mr(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Kn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}},Ac=class{constructor(){this.name=Be.KHR_MATERIALS_UNLIT}getMaterialType(){return yn}extendParams(e,t,n){let i=[];e.color=new he(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],pt),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,dt))}return Promise.all(i)}},Tc=class{constructor(e){this.parser=e,this.name=Be.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}},Cc=class{constructor(e){this.parser=e,this.name=Be.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new xe(a,a)}return Promise.all(s)}},Rc=class{constructor(e){this.parser=e,this.name=Be.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xt}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}},Ic=class{constructor(e){this.parser=e,this.name=Be.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}},Pc=class{constructor(e){this.parser=e,this.name=Be.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[];t.sheenColor=new he(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],pt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,dt)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}},Lc=class{constructor(e){this.parser=e,this.name=Be.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}},Dc=class{constructor(e){this.parser=e,this.name=Be.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new he().setRGB(a[0],a[1],a[2],pt),Promise.all(s)}},Fc=class{constructor(e){this.parser=e,this.name=Be.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xt}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}},Uc=class{constructor(e){this.parser=e,this.name=Be.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new he().setRGB(a[0],a[1],a[2],pt),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,dt)),Promise.all(s)}},Nc=class{constructor(e){this.parser=e,this.name=Be.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}},Oc=class{constructor(e){this.parser=e,this.name=Be.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:xt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}},Bc=class{constructor(e){this.parser=e,this.name=Be.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}},kc=class{constructor(e){this.parser=e,this.name=Be.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let o=s.extensions[t],a=i.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},zc=class{constructor(e){this.parser=e,this.name=Be.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let o=s.extensions[t],a=i.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Hc=class{constructor(e){this.name=Be.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){let l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){let f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}},Vc=class{constructor(e){this.name=Be.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==rn.TRIANGLES&&c.mode!==rn.TRIANGLE_STRIP&&c.mode!==rn.TRIANGLE_FAN&&c.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],l={};for(let c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(let g of u){let y=new Pe,m=new L,p=new Ct,M=new L(1,1,1),w=new or(g.geometry,g.material,d);for(let _=0;_<d;_++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,_),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,_),l.SCALE&&M.fromBufferAttribute(l.SCALE,_),w.setMatrixAt(_,y.compose(m,p,M));for(let _ in l)if(_==="_COLOR_0"){let I=l[_];w.instanceColor=new ai(I.array,I.itemSize,I.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&g.geometry.setAttribute(_,l[_]);at.prototype.copy.call(w,g),this.parser.assignFinalMaterial(w),f.push(w)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},Pd="glTF",Br=12,Td={JSON:1313821514,BIN:5130562},Gc=class{constructor(e){this.name=Be.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Br),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Pd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-Br,s=new DataView(e,Br),o=0;for(;o<i;){let a=s.getUint32(o,!0);o+=4;let l=s.getUint32(o,!0);if(o+=4,l===Td.JSON){let c=new Uint8Array(e,Br+o,a);this.content=n.decode(c)}else if(l===Td.BIN){let c=Br+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Wc=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Be.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(let h in o){let u=Yc[h]||h.toLowerCase();a[u]=o[h]}for(let h in e.attributes){let u=Yc[h]||h.toLowerCase();if(o[h]!==void 0){let d=n.accessors[e.attributes[h]],f=Os[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(let g in f.attributes){let y=f.attributes[g],m=l[g];m!==void 0&&(y.normalized=m)}u(f)},a,c,pt,d)})})}},Xc=class{constructor(){this.name=Be.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},qc=class{constructor(){this.name=Be.KHR_MESH_QUANTIZATION}},Oa=class extends Gn{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*c,y=g-c,m=-2*f+3*d,p=f-d,M=1-m,w=p-d+u;for(let _=0;_!==a;_++){let I=o[y+_+a],C=o[y+_+l]*h,A=o[g+_+a],R=o[g+_]*h;s[_]=M*I+w*C+m*A+p*R}return s}},$0=new Ct,$c=class extends Oa{interpolate_(e,t,n,i){let s=super.interpolate_(e,t,n,i);return $0.fromArray(s).normalize().toArray(s),s}},rn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Os={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Cd={9728:Lt,9729:Qe,9984:Wo,9985:Es,9986:Hi,9987:sn},Rd={33071:zt,33648:hs,10497:ri},Sc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Yc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},pi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Y0={CUBICSPLINE:void 0,LINEAR:Ci,STEP:Ti},Mc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Z0(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Vn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:vt})),r.DefaultMaterial}function Yi(r,e,t){for(let n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Kn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function K0(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);let o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;o.push(d)}if(i){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;a.push(d)}if(s){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],d=c[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function j0(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function J0(r){let e,t=r.extensions&&r.extensions[Be.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+wc(t.attributes):e=r.indices+":"+wc(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+wc(r.targets[n]);return e}function wc(r){let e="",t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Zc(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Q0(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var e_=new Pe,Kc=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new q0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new Fi(this.options.manager):this.textureLoader=new _r(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Di(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Yi(s,a,i),Kn(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(let l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){let o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){let o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),s=(o,a)=>{let l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(let[c,h]of o.children.entries())s(h,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Be.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(s,o){n.load(qn.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let o=Sc[i.type],a=Os[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new ct(c,o,l))}let s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){let a=o[0],l=Sc[i.type],c=Os[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0,y,m;if(f&&f!==u){let p=Math.floor(d/f),M="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count,w=t.cache.get(M);w||(y=new c(a,p*f,i.count*f/h),w=new gs(y,f/h),t.cache.add(M,w)),m=new ys(w,l,d%f/h,g)}else a===null?y=new c(i.count*l):y=new c(a,d,i.count*l),m=new ct(y,l,g);if(i.sparse!==void 0){let p=Sc.SCALAR,M=Os[i.sparse.indices.componentType],w=i.sparse.indices.byteOffset||0,_=i.sparse.values.byteOffset||0,I=new M(o[1],w,i.sparse.count*p),C=new c(o[2],_,i.sparse.count*l);a!==null&&(m=new ct(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let A=0,R=I.length;A<R;A++){let S=I[A];if(m.setX(S,C[A*l]),l>=2&&m.setY(S,C[A*l+1]),l>=3&&m.setZ(S,C[A*l+2]),l>=4&&m.setW(S,C[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s],a=this.textureLoader;if(o.uri){let l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){let i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let d=(s.samplers||{})[o.sampler]||{};return h.magFilter=Cd[d.magFilter]||Qe,h.minFilter=Cd[d.minFilter]||sn,h.wrapS=Rd[d.wrapS]||ri,h.wrapT=Rd[d.wrapT]||ri,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Lt&&h.minFilter!==Qe,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let o=i.images[e],a=self.URL||self.webkitURL,l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;let d=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(y){let m=new bt(y);m.needsUpdate=!0,d(m)}),t.load(qn.resolveURL(u,s.path),g,void 0,f)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),Kn(u,o),u.userData.mimeType=o.mimeType||Q0(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[Be.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[Be.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let l=s.associations.get(o);o=s.extensions[Be.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new ci,Ht.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new li,Ht.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Vn}loadMaterial(e){let t=this,n=this.json,i=this.extensions,s=n.materials[e],o,a={},l=s.extensions||{},c=[];if(l[Be.KHR_MATERIALS_UNLIT]){let u=i[Be.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,s,t))}else{let u=s.pbrMetallicRoughness||{};if(a.color=new he(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],pt),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,dt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=nt);let h=s.alphaMode||Mc.OPAQUE;if(h===Mc.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Mc.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==yn&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new xe(1,1),s.normalTexture.scale!==void 0)){let u=s.normalTexture.scale;a.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&o!==yn&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==yn){let u=s.emissiveFactor;a.emissive=new he().setRGB(u[0],u[1],u[2],pt)}return s.emissiveTexture!==void 0&&o!==yn&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,dt)),Promise.all(c).then(function(){let u=new o(a);return s.name&&(u.name=s.name),Kn(u,s),t.associations.set(u,{materials:e}),s.extensions&&Yi(i,u,s),u})}createUniqueName(e){let t=tt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[Be.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Id(l,a,t)})}let o=[];for(let a=0,l=e.length;a<l;a++){let c=e[a],h=J0(c),u=i[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[Be.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=Id(new St,c,t),i[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){let h=o[l].material===void 0?Z0(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){let y=h[f],m=o[f],p,M=c[f];if(m.mode===rn.TRIANGLES||m.mode===rn.TRIANGLE_STRIP||m.mode===rn.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new sr(y,M):new Mt(y,M),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===rn.TRIANGLE_STRIP?p.geometry=bc(p.geometry,Dr):m.mode===rn.TRIANGLE_FAN&&(p.geometry=bc(p.geometry,Ts));else if(m.mode===rn.LINES)p=new bs(y,M);else if(m.mode===rn.LINE_STRIP)p=new zn(y,M);else if(m.mode===rn.LINE_LOOP)p=new ar(y,M);else if(m.mode===rn.POINTS)p=new Ii(y,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&j0(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),Kn(p,s),m.extensions&&Yi(i,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&Yi(i,u[0],s),u[0];let d=new dn;s.extensions&&Yi(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new yt(Fr.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ni(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Kn(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let s=i.pop(),o=i,a=[],l=[];for(let c=0,h=o.length;c<h;c++){let u=o[c];if(u){a.push(u);let d=new Pe;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new rr(a,l)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){let f=i.channels[u],g=i.samplers[f.sampler],y=f.target,m=y.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,M=i.parameters!==void 0?i.parameters[g.output]:g.output;y.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",M)),c.push(g),h.push(y))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],g=u[2],y=u[3],m=u[4],p=[];for(let M=0,w=d.length;M<w;M++){let _=d[M],I=f[M],C=g[M],A=y[M],R=m[M];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();let S=n._createAnimationTracks(_,I,C,A,R);if(S)for(let v=0;v<S.length;v++)p.push(S[v])}return new Li(s,void 0,p)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){let o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));let l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){let h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,e_)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(s.isBone===!0?h=new _s:c.length>1?h=new dn:c.length===1?h=c[0]:h=new at,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=o),Kn(h,s),s.extensions&&Yi(n,h,s),s.matrix!==void 0){let u=new Pe;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,s=new dn;n.name&&(s.name=i.createUniqueName(n.name)),Kn(s,n),n.extensions&&Yi(t,s,n);let o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);let c=h=>{let u=new Map;for(let[d,f]of i.associations)(d instanceof Ht||d instanceof bt)&&u.set(d,f);return h.traverse(d=>{let f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){let o=[],a=e.name?e.name:e.uuid,l=[];pi[s.path]===pi.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(pi[s.path]){case pi.weights:c=wn;break;case pi.rotation:c=En;break;case pi.position:case pi.scale:c=An;break;default:switch(n.itemSize){case 1:c=wn;break;case 2:case 3:default:c=An;break}break}let h=i.interpolation!==void 0?Y0[i.interpolation]:Ci,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){let g=new c(l[d]+"."+pi[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Zc(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof En?$c:Oa;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function t_(r,e,t){let n=e.attributes,i=new Yt;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new L(l[0],l[1],l[2]),new L(c[0],c[1],c[2])),a.normalized){let h=Zc(Os[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let a=new L,l=new L;for(let c=0,h=s.length;c<h;c++){let u=s[c];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){let y=Zc(Os[d.componentType]);l.multiplyScalar(y)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;let o=new Gt;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function Id(r,e,t){let n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(let o in n){let a=Yc[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){let o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return ke.workingColorSpace!==pt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ke.workingColorSpace}" not supported.`),Kn(r,e),t_(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?K0(r,e.targets,t):r})}console.log("[FlexFrame Build] main.js v28.4 loaded - AR Support - Build timestamp:",new Date().toISOString());function In(r){return window.flexframeSettings&&window.flexframeSettings.pluginUrl?r.startsWith("http://")||r.startsWith("https://")?r:window.flexframeSettings.pluginUrl+"assets/"+r:r}var jc=class{constructor(){this.sceneManager=null,this.cameraManager=null,this.lightingSystem=null,this.particleSystem=null,this.settingsManager=null,this.renderer=null,this.gui=null,this.sizes={width:window.innerWidth,height:window.innerHeight},this.clock=new xr,this.textureLoader=new Fi,this.gltfLoader=new Na,this.raycaster=new Bi,this.mouse=new xe,this.mixer=null,this.allClickableMeshes=[],this.ground=null,this.circleGeometry=null,this.planeGeometry=null,this.shadowGroundMaterial=null,this.solidGroundMaterial=null,this.useShadowMaterial=!1,this.backgroundParams={gradientTop:"#3865ad",gradientBottom:"#0101bc",gradientAlpha:1},this.groundParams={mode:"Infinite Canvas",color:"#222222",roughness:1,metalness:0,shadowOpacity:.4,receiveShadow:!0,castShadow:!1,visible:!0},this.playerStyleParams={backgroundColor:"#1f1f1f",backgroundOpacity:0,playerWidth:95,showTimeDisplay:!0,buttonColor:"#c20e1d",buttonOpacity:1,scrubberColor:"#c20e1d",scrubberOpacity:.7,textColor:"#dedede",textOpacity:1},this.loaderParams={spinnerStyle:"cool"},this.init()}async init(){this.sceneManager=new yd,this.cameraManager=new bd(this.sceneManager.getCanvas(),this.sizes),this.lightingSystem=new Sd(this.sceneManager.getScene()),this.particleSystem=new Md(this.sceneManager.getScene()),this.settingsManager=new wd,this.animationPlayer=new Ed,this.setupARBranding(),setTimeout(()=>{this.setupQualityToggle()},100),console.log("\u{1F680} CREATING MultiThumbnailMenuSystem..."),this.multiThumbnailMenuSystem=new Fa,console.log("\u2705 MultiThumbnailMenuSystem created:",this.multiThumbnailMenuSystem),this.rightMenuSystem=new Ua,window.menuManager=this.multiThumbnailMenuSystem,console.log("\u2705 window.menuManager set:",window.menuManager),window.rightMenuManager=this.rightMenuSystem,document.addEventListener("thumbnailSelected",e=>{console.log("Thumbnail selected:",e.detail.thumbnail)}),document.addEventListener("exercisesSelected",async e=>{let t=e.detail.item;if(this.currentExerciseName=t.name,t.configUrl)try{let n=`?t=${Date.now()}`,s=In(t.configUrl.replace("./",""))+n,a=await(await fetch(s)).json();if(this.currentConfig=a,vc.updateConfig(a),this.pendingModelConfig=a.model,this.modelUrlSQ=a.modelUrl||a.modelUrlSQ,this.modelUrlHQ=a.modelUrlHQ,this.currentModelQuality="SQ",this.updateQualityButtonVisibility(),this.modelUrlSQ&&await this.loadModel(this.modelUrlSQ),a.camera){let l=this.cameraManager.getCamera();a.camera.position&&l.position.set(...a.camera.position),a.camera.rotation&&l.rotation.set(...a.camera.rotation),a.camera.target&&this.cameraManager.getControls().target.set(...a.camera.target),this.cameraManager.getControls().update(),this.cameraManager.updateOriginalState(a.camera.position,a.camera.rotation,a.camera.target)}a.rightMenuTabs&&window.rightMenuManager&&window.rightMenuManager.updateFromConfig(a.rightMenuTabs)}catch(n){console.error("Failed to load exercise config:",n)}}),this.animationPlayer.setVisibility(!0),this.applyWordPressUISettings(),this.applyWordPressSceneSettings(),setTimeout(()=>{this.initializePlayerStyling()},100),this.setupCanvasInteraction(),this.screenshotManager=null,this.cameraManager.setScene(this.sceneManager.getScene()),window.camera=this.cameraManager.getCamera(),window.app=this,this.settingsManager.registerManager("background",{getSettings:()=>this.backgroundParams,applySettings:e=>{Object.assign(this.backgroundParams,e),this.sceneManager.updateGradientBackground(this.backgroundParams)}}),this.settingsManager.registerManager("ground",{getSettings:()=>this.groundParams,applySettings:e=>this.applyGroundSettings(e)}),this.settingsManager.registerManager("camera",this.cameraManager),this.settingsManager.registerManager("lighting",this.lightingSystem),this.settingsManager.registerManager("dustParticles",this.particleSystem),this.settingsManager.registerManager("animationPlayer",this.animationPlayer),this.settingsManager.registerManager("multiThumbnailMenuSystem",this.multiThumbnailMenuSystem),this.settingsManager.registerManager("rightMenuSystem",this.rightMenuSystem),this.settingsManager.registerManager("playerStyling",{getSettings:()=>this.playerStyleParams,applySettings:e=>{Object.assign(this.playerStyleParams,e),setTimeout(()=>{this.initializePlayerStyling(),this.gui&&typeof this.gui.updateDisplay=="function"&&this.gui.updateDisplay()},200)}}),this.settingsManager.registerManager("loader",{getSettings:()=>this.loaderParams,applySettings:e=>{Object.assign(this.loaderParams,e),this.updateLoaderSpinner()}}),this.setupRenderer(),this.setupGround(),this.setupGUI(),this.setupEventListeners(),this.sceneManager.updateGradientBackground(this.backgroundParams),await this.waitForDefaultSettings(),this.settingsManager.applyDefaultSettings(),this.applyWordPressSceneSettings(),setTimeout(()=>this.updateAllGUIControls(),500),this.animationPlayer.setVisibility(!0),this.checkUrlForExercise(),this.animate()}checkUrlForExercise(){let t=new URLSearchParams(window.location.search).get("exercise");if(!t&&window.location.hash&&(t=window.location.hash.substring(1)),!t)return;console.log("\u{1F517} URL exercise parameter found:",t);let n=t.toLowerCase().replace(/-/g,"_").replace(/%20/g,"_").replace(/ /g,"_");this.waitForExercisesAndSelect(n,t)}async waitForExercisesAndSelect(e,t){let n=0,i=50;for(;n<i;){let s=window.menuManager;if(s?.menus?.search?.allExercises?.length>0){let o=s.menus.search.allExercises,a=o.find(l=>{let c=l.id?.toLowerCase().replace(/-/g,"_"),h=l.name?.toLowerCase().replace(/ /g,"_").replace(/-/g,"_");return c===e||h===e||l.id?.toLowerCase()===t.toLowerCase()||l.name?.toLowerCase()===t.toLowerCase().replace(/_/g," ").replace(/-/g," ")});if(a){console.log("\u2705 Found exercise from URL:",a.name);let l=new CustomEvent("exercisesSelected",{detail:{item:a,menuType:"url-preload"}});document.dispatchEvent(l),s.menus.search&&(s.menus.search.selectedId=a.id);return}else{console.warn("\u26A0\uFE0F Exercise not found for URL slug:",t),console.log("Available exercise IDs:",o.map(l=>l.id).slice(0,10));return}}await new Promise(o=>setTimeout(o,100)),n++}console.warn("\u26A0\uFE0F Timed out waiting for exercises to load for URL preload")}async waitForDefaultSettings(){for(;!this.settingsManager.getDefaultSettings();)await new Promise(e=>setTimeout(e,100))}setupRenderer(){this.renderer=new Ps({canvas:this.sceneManager.getCanvas(),antialias:!0}),this.renderer.setSize(this.sizes.width,this.sizes.height),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Fo,this.renderer.toneMapping=Vo,this.renderer.toneMappingExposure=1}updateLoaderSpinner(){let e=document.getElementById("model-loader");if(!e)return;e.querySelectorAll(".spinner-box").forEach(i=>i.style.display="none");let n=e.querySelector(`[data-spinner="${this.loaderParams.spinnerStyle}"]`);n&&(n.style.display="flex")}applyWordPressUISettings(){if(!window.flexframeSettings||!window.flexframeSettings.uiSettings){console.log("[FlexFrame UI] No WordPress UI settings found, using defaults");return}let e=window.flexframeSettings.uiSettings;if(console.log("[FlexFrame UI] Applying WordPress UI settings:",e),e.player){let t=e.player.alwaysVisible===!0;console.log("[FlexFrame UI] Player always visible setting:",t),this.animationPlayer&&(this.animationPlayer.setAlwaysVisible(t),console.log("[FlexFrame UI] Applied alwaysVisible to animation player")),e.player.bgColor&&(this.playerStyleParams.backgroundColor=e.player.bgColor),e.player.bgOpacity!==void 0&&(this.playerStyleParams.backgroundOpacity=e.player.bgOpacity),e.player.buttonColor&&(this.playerStyleParams.buttonColor=e.player.buttonColor),e.player.accentColor&&(this.playerStyleParams.scrubberColor=e.player.accentColor)}e.spinnerColor&&this.updateSpinnerColor(e.spinnerColor)}applyWordPressSceneSettings(){if(window.flexframeSettings?.backgroundSettings){let e=window.flexframeSettings.backgroundSettings;console.log("[FlexFrame Scene] Applying WordPress background settings:",e),this.backgroundParams.gradientTop=e.gradientTop||"#3865ad",this.backgroundParams.gradientBottom=e.gradientBottom||"#0101bc",this.backgroundParams.gradientAlpha=e.gradientAlpha??1,this.sceneManager&&this.sceneManager.updateGradientBackground(this.backgroundParams)}if(window.flexframeSettings?.lightingSettings&&this.lightingSystem){let e=window.flexframeSettings.lightingSettings;if(console.log("[FlexFrame Scene] Applying WordPress lighting settings:",e),e.ambientLight&&(e.ambientLight.intensity!==void 0&&(this.lightingSystem.ambientLight.intensity=e.ambientLight.intensity),e.ambientLight.color&&this.lightingSystem.ambientLight.color.set(e.ambientLight.color)),e.directionalLight&&(e.directionalLight.intensity!==void 0&&(this.lightingSystem.directionalLight.intensity=e.directionalLight.intensity),e.directionalLight.color&&this.lightingSystem.directionalLight.color.set(e.directionalLight.color),e.directionalLight.position)){let t=e.directionalLight.position;t.x!==void 0&&(this.lightingSystem.directionalLight.position.x=t.x),t.y!==void 0&&(this.lightingSystem.directionalLight.position.y=t.y),t.z!==void 0&&(this.lightingSystem.directionalLight.position.z=t.z)}}if(window.flexframeSettings?.particleSettings&&this.particleSystem){let e=window.flexframeSettings.particleSettings;console.log("[FlexFrame Scene] Applying WordPress particle settings:",e),e.visible!==void 0&&(this.particleSystem.params.visible=e.visible),e.count!==void 0&&(this.particleSystem.params.count=e.count),e.size!==void 0&&(this.particleSystem.params.size=e.size);let t=window.flexframeSettings?.primaryColor;t?(this.particleSystem.params.color=t,console.log("[FlexFrame Scene] Using primary color for particles:",t)):e.color&&(this.particleSystem.params.color=e.color),e.opacity!==void 0&&(this.particleSystem.params.opacity=e.opacity),e.speed!==void 0&&(this.particleSystem.params.speed=e.speed),this.particleSystem.createDustParticles()}}updateSpinnerColor(e){let t=document.createElement("style");t.id="flexframe-spinner-color",t.textContent=`
            .loading-overlay .spinner-box .spinner-circle {
                border-top-color: ${e} !important;
            }
            .loading-overlay .spinner-box .spinner-dots span {
                background-color: ${e} !important;
            }
            .loading-overlay .spinner-box .spinner-bars span {
                background-color: ${e} !important;
            }
            .loading-overlay .spinner-box .spinner-pulse {
                background-color: ${e} !important;
            }
            .loading-overlay .spinner-box .spinner-ripple span {
                border-color: ${e} !important;
            }
            .loading-overlay .spinner-box .cool-loader .loading-spinner {
                border-top-color: ${e} !important;
            }
        `;let n=document.getElementById("flexframe-spinner-color");n&&n.remove(),document.head.appendChild(t)}setupCanvasInteraction(){let e=this.sceneManager.getCanvas();if(!e){console.warn("[FlexFrame] Canvas not found for interaction setup");return}e.addEventListener("click",()=>{this.animationPlayer&&this.animationPlayer.onCanvasInteraction()});let t=null;e.addEventListener("mousemove",()=>{t||(t=setTimeout(()=>{t=null},100),this.animationPlayer&&this.animationPlayer.onCanvasInteraction())})}initializePlayerStyling(){console.log("[FlexFrame UI] initializePlayerStyling called with params:",this.playerStyleParams),this.updatePlayerBackgroundColor(this.playerStyleParams.backgroundColor),this.updatePlayerBackgroundOpacity(this.playerStyleParams.backgroundOpacity),this.updatePlayerTimeDisplay(this.playerStyleParams.showTimeDisplay),this.updatePlayerButtonColor(this.playerStyleParams.buttonColor),this.updatePlayerButtonOpacity(this.playerStyleParams.buttonOpacity),this.updatePlayerScrubberColor(this.playerStyleParams.scrubberColor),this.updatePlayerScrubberOpacity(this.playerStyleParams.scrubberOpacity),this.updatePlayerTextColor(this.playerStyleParams.textColor),this.updatePlayerTextOpacity(this.playerStyleParams.textOpacity),this.initializeScrubberWidth()}initializeScrubberWidth(){let e=document.createElement("style");e.id="scrubber-width-style",e.textContent=`
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
        `;let t=document.getElementById("scrubber-width-style");t&&t.remove(),document.head.appendChild(e)}setupGround(){let e=this.textureLoader.load(In("textures/gradients/3.jpg"));e.wrapS=zt,e.wrapT=zt,e.needsUpdate=!0,this.circleGeometry=new cr(5,64),this.planeGeometry=new Pi(30,30),this.shadowGroundMaterial=new hr({opacity:.4}),this.solidGroundMaterial=new Vn({color:2236962,roughness:1,metalness:0}),this.ground=new Mt(this.circleGeometry,this.shadowGroundMaterial),this.ground.rotation.x=-Math.PI/2,this.ground.position.y=-.01,this.ground.receiveShadow=!0,this.ground.castShadow=!1,this.ground.visible=!0,this.sceneManager.getScene().add(this.ground)}updateAllGUIControls(){this.gui&&this.gui.controllersRecursive().forEach(e=>{e.updateDisplay()})}gatherModelSpecificSettings(){let e={};return this.currentConfig&&this.currentConfig.exerciseId&&(e.exerciseId=this.currentConfig.exerciseId),this.currentConfig&&(this.currentConfig.modelUrlSQ&&(e.modelUrlSQ=this.currentConfig.modelUrlSQ),this.currentConfig.modelUrlHQ&&(e.modelUrlHQ=this.currentConfig.modelUrlHQ),this.currentConfig.modelUrl&&!e.modelUrlSQ&&(e.modelUrl=this.currentConfig.modelUrl)),e.model=window.model?{position:window.model.position.toArray(),rotation:[window.model.rotation.x,window.model.rotation.y,window.model.rotation.z],scale:window.model.scale.toArray()}:{position:[0,-.02,0],rotation:[0,0,0],scale:[1,1,1]},e.camera=this.cameraManager.getSettings(),e}setupGUIStyles(){let e=document.createElement("style");e.textContent=`
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
        `,document.head.querySelector("style[data-gui-styles]")||(e.setAttribute("data-gui-styles","true"),document.head.appendChild(e))}setupGUIControls(){let e=this.gui.addFolder("GUI Controls"),t={expandAll:()=>{this.allFolders.forEach(n=>n.open()),console.log("\u{1F4C2} All GUI folders expanded")},collapseAll:()=>{this.allFolders.forEach(n=>n.close()),console.log("\u{1F4C1} All GUI folders collapsed")}};e.add(t,"expandAll").name("Expand All"),e.add(t,"collapseAll").name("Collapse All"),e.open()}trackFolder(e){return this.allFolders.push(e),e}setupGUI(){this.gui=new Ia,this.allFolders=[],this.setupGUIStyles(),this.setupGUIControls(),this.setupSimpleScreenshotGUI(),this.gui.add({saveSettings:async()=>{await this.settingsManager.saveSettingsToClipboard(),console.log("All settings saved:",this.settingsManager.gatherAllSettings())}},"saveSettings").name("Save All Settings"),this.gui.add({saveModelSettings:async()=>{let n=this.gatherModelSpecificSettings(),i=JSON.stringify(n,null,2);try{await navigator.clipboard.writeText(i),alert("Model-specific settings copied to clipboard!"),console.log("Model settings saved:",n)}catch(s){console.error("Failed to copy to clipboard:",s),alert("Failed to copy settings to clipboard.")}}},"saveModelSettings").name("Save Model Settings"),this.gui.add({importSettings:async()=>{await this.settingsManager.importSettingsFromClipboard(),setTimeout(()=>this.updateAllGUIControls(),100)}},"importSettings").name("Import Settings"),this.gui.add({exportFile:()=>this.settingsManager.exportAsFile("scene-settings.json")},"exportFile").name("Export to File"),this.gui.add({importFile:async()=>{try{await this.settingsManager.importFromFile(),setTimeout(()=>this.updateAllGUIControls(),100),alert("Settings imported from file!")}catch(n){alert("Failed to import file: "+n.message)}}},"importFile").name("Import from File");let e={"Cinematic Blue":()=>{let n={background:{gradientTop:"#3865ad",gradientBottom:"#030391",gradientAlpha:1},ground:{mode:"Infinite Canvas",color:"#222222",roughness:1,metalness:0,shadowOpacity:.4,receiveShadow:!0,castShadow:!1,visible:!0},camera:{position:[.6497189477206844,.620065800043649,-.3267521547833202],rotation:[-2.480393214032852,1.0626661205247725,2.5446012015171644],target:[-.04078270409635462,.38393067967272315,-.023247738115800942]},lighting:{directionalLight:{intensity:1.43,color:"#ffffff",castShadow:!0,shadowBias:0,shadowBlur:1,shadowMapWidth:1024,shadowMapHeight:1024,posX:1.35,posY:1.57,posZ:.9,showHelper:!1,position:{x:1.35,y:1.57,z:.9}},ambientLight:{intensity:.4,color:"#ffffff"}},dustParticles:{count:1210,size:.02,sizeRandomness:1.2,color:"#0d14d3",opacity:.11,speed:.5,horizontalRange:3,verticalRange:2,verticalOffset:1,visible:!0,blur:.3,depthBlur:!0,depthBlurStrength:.5,depthFocusDistance:3,depthFocusRange:1.5},model:{position:[0,-.02,0],rotation:[0,0,0],scale:[1,1,1]}};this.settingsManager.applyAllSettings(n),setTimeout(()=>this.updateAllGUIControls(),100)},"Reset to Default":()=>{this.settingsManager.applyDefaultSettings(),setTimeout(()=>this.updateAllGUIControls(),100)}},t=this.trackFolder(this.gui.addFolder("Scene Presets"));t.add(e,"Cinematic Blue").name("Cinematic Blue"),t.add(e,"Reset to Default").name("Reset to Default"),this.setupBackgroundGUI(),this.setupGroundGUI(),this.setupParticlesGUI(),this.setupLoaderGUI(),this.setupLightingGUI(),this.setupCameraGUI(),this.setupMultiThumbnailMenuGUI(),this.setupGUIVisibilityToggle()}setupBackgroundGUI(){this.gui.addColor(this.backgroundParams,"gradientTop").name("Gradient Top").onChange(()=>this.sceneManager.updateGradientBackground(this.backgroundParams)),this.gui.addColor(this.backgroundParams,"gradientBottom").name("Gradient Bottom").onChange(()=>this.sceneManager.updateGradientBackground(this.backgroundParams)),this.gui.add(this.backgroundParams,"gradientAlpha",0,1,.01).name("Gradient Alpha").onChange(()=>this.sceneManager.updateGradientBackground(this.backgroundParams))}setupGroundGUI(){let e=this.trackFolder(this.gui.addFolder("Ground Plane"));e.add(this.groundParams,"mode",["Solid","Infinite Canvas"]).name("Type").onChange(t=>this.updateGroundMode(t)),e.addColor(this.groundParams,"color").name("Color").onChange(t=>this.solidGroundMaterial.color.set(t)),e.add(this.groundParams,"roughness",0,1,.01).name("Roughness").onChange(t=>this.solidGroundMaterial.roughness=t),e.add(this.groundParams,"metalness",0,1,.01).name("Metalness").onChange(t=>this.solidGroundMaterial.metalness=t),e.add(this.groundParams,"shadowOpacity",0,1,.01).name("Shadow Opacity").onChange(t=>this.shadowGroundMaterial.opacity=t),e.add(this.groundParams,"receiveShadow").name("Receive Shadow").onChange(t=>this.ground.receiveShadow=t),e.add(this.groundParams,"castShadow").name("Cast Shadow").onChange(t=>this.ground.castShadow=t),e.add(this.groundParams,"visible").name("Visible").onChange(t=>this.ground.visible=t)}setupLoaderGUI(){let e=this.trackFolder(this.gui.addFolder("Loading Spinner")),t={"Cool Gradient":"cool","Simple Gradient":"gradient","3D Orbits":"orbits","Gradient Planes":"planes","Spinning Squares":"squares","Pulse Dots":"dots","Solar System":"solar","Three Quarter":"quarter"};e.add(this.loaderParams,"spinnerStyle",t).name("Spinner Style").onChange(()=>this.updateLoaderSpinner())}setupParticlesGUI(){let e=this.trackFolder(this.gui.addFolder("Dust Particles")),t=this.particleSystem.getParams();e.add(t,"count",50,2e3,10).name("Count").onChange(c=>this.particleSystem.updateCount(c)),e.add(t,"size",.001,.02,1e-4).name("Size").onChange(c=>this.particleSystem.updateSize(c)),e.add(t,"sizeRandomness",0,2,.1).name("Size Variation").onChange(c=>this.particleSystem.updateSizeRandomness(c)),e.addColor(t,"color").name("Color").onChange(c=>this.particleSystem.updateColor(c)),e.add(t,"opacity",0,1,.01).name("Opacity").onChange(c=>this.particleSystem.updateOpacity(c)),e.add(t,"speed",0,3,.1).name("Float Speed"),e.add(t,"visible").name("Visible").onChange(c=>this.particleSystem.setVisible(c));let n=this.trackFolder(e.addFolder("Blur Effects"));n.add(t,"blur",0,1,.01).name("Particle Blur").onChange(c=>this.particleSystem.updateBlur(c));let i=this.trackFolder(e.addFolder("Depth of Field"));i.add(t,"depthBlur").name("Enable Depth Blur").onChange(c=>this.particleSystem.updateDepthBlur(c)),i.add(t,"depthBlurStrength",0,1,.01).name("Blur Strength").onChange(c=>this.particleSystem.updateDepthBlurStrength(c)),i.add(t,"depthFocusDistance",.5,10,.1).name("Focus Distance").onChange(c=>this.particleSystem.updateDepthFocus(c,t.depthFocusRange)),i.add(t,"depthFocusRange",.1,5,.1).name("Focus Range").onChange(c=>this.particleSystem.updateDepthFocus(t.depthFocusDistance,c));let s=this.trackFolder(e.addFolder("Position & Range"));s.add(t,"horizontalRange",.5,10,.1).name("Horizontal Range").onChange(()=>this.particleSystem.updateRange(t.horizontalRange,t.verticalRange)),s.add(t,"verticalRange",.5,5,.1).name("Vertical Range").onChange(()=>this.particleSystem.updateRange(t.horizontalRange,t.verticalRange)),s.add(t,"verticalOffset",-2,3,.1).name("Height Offset").onChange(c=>this.particleSystem.updateOffset(c));let o={"Portrait DOF":()=>{t.depthBlur=!0,t.depthBlurStrength=.7,t.depthFocusDistance=2,t.depthFocusRange=.5,t.blur=.2,this.particleSystem.updateDepthBlur(!0),this.particleSystem.updateDepthBlurStrength(.7),this.particleSystem.updateDepthFocus(2,.5),this.particleSystem.updateBlur(.2),i.controllersRecursive().forEach(c=>c.updateDisplay()),n.controllersRecursive().forEach(c=>c.updateDisplay())},"Macro DOF":()=>{t.depthBlur=!0,t.depthBlurStrength=.9,t.depthFocusDistance=1,t.depthFocusRange=.2,t.blur=.4,this.particleSystem.updateDepthBlur(!0),this.particleSystem.updateDepthBlurStrength(.9),this.particleSystem.updateDepthFocus(1,.2),this.particleSystem.updateBlur(.4),i.controllersRecursive().forEach(c=>c.updateDisplay()),n.controllersRecursive().forEach(c=>c.updateDisplay())},"Cinematic DOF":()=>{t.depthBlur=!0,t.depthBlurStrength=.5,t.depthFocusDistance=3,t.depthFocusRange=1.5,t.blur=.3,this.particleSystem.updateDepthBlur(!0),this.particleSystem.updateDepthBlurStrength(.5),this.particleSystem.updateDepthFocus(3,1.5),this.particleSystem.updateBlur(.3),i.controllersRecursive().forEach(c=>c.updateDisplay()),n.controllersRecursive().forEach(c=>c.updateDisplay())},"No DOF":()=>{t.depthBlur=!1,t.blur=0,this.particleSystem.updateDepthBlur(!1),this.particleSystem.updateBlur(0),i.controllersRecursive().forEach(c=>c.updateDisplay()),n.controllersRecursive().forEach(c=>c.updateDisplay())}};i.add(o,"Portrait DOF").name("Portrait DOF"),i.add(o,"Macro DOF").name("Macro DOF"),i.add(o,"Cinematic DOF").name("Cinematic DOF"),i.add(o,"No DOF").name("Disable DOF");let a={"Light Dust":()=>{this.particleSystem.applyPreset("Light Dust"),e.controllersRecursive().forEach(c=>c.updateDisplay())},"Heavy Dust":()=>{this.particleSystem.applyPreset("Heavy Dust"),e.controllersRecursive().forEach(c=>c.updateDisplay())},"Magical Sparkles":()=>{this.particleSystem.applyPreset("Magical Sparkles"),e.controllersRecursive().forEach(c=>c.updateDisplay())},"Reset Dust":()=>{this.particleSystem.applyPreset("Reset Dust"),e.controllersRecursive().forEach(c=>c.updateDisplay())}},l=this.trackFolder(e.addFolder("Particle Presets"));l.add(a,"Light Dust").name("Light Dust"),l.add(a,"Heavy Dust").name("Heavy Dust"),l.add(a,"Magical Sparkles").name("Magical Sparkles"),l.add(a,"Reset Dust").name("Reset Dust")}setupLightingGUI(){let e=this.trackFolder(this.gui.addFolder("Lights")),t=this.lightingSystem.getLights(),n=this.lightingSystem.getSettings(),i=this.trackFolder(e.addFolder("Directional Light")),s=n.directionalLight;i.add(s,"intensity",0,5,.01).name("Intensity").onChange(l=>t.directional.intensity=l),i.addColor(s,"color").name("Color").onChange(l=>t.directional.color.set(l)),i.add(s,"castShadow").name("Cast Shadow").onChange(l=>t.directional.castShadow=l),i.add(s,"shadowBias",-.05,.05,1e-4).name("Shadow Bias").onChange(l=>t.directional.shadow.bias=l),i.add(s,"shadowBlur",0,10,.1).name("Shadow Blur").onChange(l=>t.directional.shadow.radius=l),i.add(s,"shadowMapWidth",256,4096,1).name("Shadow Map Width").onChange(l=>{t.directional.shadow.mapSize.width=l,t.directional.shadow.map&&t.directional.shadow.map.dispose()}),i.add(s,"shadowMapHeight",256,4096,1).name("Shadow Map Height").onChange(l=>{t.directional.shadow.mapSize.height=l,t.directional.shadow.map&&t.directional.shadow.map.dispose()}),i.add(s,"posX",-10,10,.01).name("Position X").onChange(l=>t.directional.position.x=l),i.add(s,"posY",-10,10,.01).name("Position Y").onChange(l=>t.directional.position.y=l),i.add(s,"posZ",-10,10,.01).name("Position Z").onChange(l=>t.directional.position.z=l),i.add(s,"showHelper").name("Show Helper").onChange(l=>t.directionalHelper.visible=l);let o=this.trackFolder(e.addFolder("Ambient Light")),a=n.ambientLight;o.add(a,"intensity",0,2,.01).name("Intensity").onChange(l=>t.ambient.intensity=l),o.addColor(a,"color").name("Color").onChange(l=>t.ambient.color.set(l))}setupCameraGUI(){let e=this.trackFolder(this.gui.addFolder("Camera Controls")),t=this.cameraManager.getCamera(),n=this.cameraManager.getControls(),i=this.trackFolder(e.addFolder("Zoom Range"));i.add(n,"minDistance",.001,1,.001).name("Min Zoom Distance"),i.add(n,"maxDistance",10,500,1).name("Max Zoom Distance"),i.add(n,"zoomSpeed",.1,2,.1).name("Zoom Speed");let s=this.trackFolder(e.addFolder("Field of View"));s.add({fov:t.fov},"fov",10,150,1).name("FOV (degrees)").onChange(N=>{this.cameraManager.setFOV(N)}),s.add({copyCameraSettings:()=>{this.cameraManager.copyCameraSettingsToClipboard()}},"copyCameraSettings").name("Copy Camera Settings"),s.add({copyAllSettings:()=>{this.cameraManager.copyAllSettingsToClipboard(this.settingsManager)}},"copyAllSettings").name("Copy ALL GUI Settings");let o=this.trackFolder(e.addFolder("Zoom Momentum")),a=this.cameraManager;o.add(a,"zoomDecay",.8,.99,.01).name("Momentum Decay"),o.add(a,"zoomMomentumThreshold",.001,.1,.001).name("Momentum Threshold");let l={value:1};o.add(l,"value",.1,5,.1).name("Velocity Multiplier").onChange(N=>{a.velocityMultiplier=N}),e.add({resetCamera:()=>{this.cameraManager.resetCamera(),console.log("Camera fully reset to defaults")}},"resetCamera").name("Reset Camera"),e.add({testMomentum:()=>{console.log("Testing momentum..."),a.zoomMomentum=.2,a.momentumActive=!0,console.log("Momentum set to:",a.zoomMomentum)}},"testMomentum").name("Test Momentum"),e.add({clearMomentum:()=>{a.zoomMomentum=0,a.momentumActive=!1,console.log("Momentum cleared")}},"clearMomentum").name("Clear Momentum");let c=this.trackFolder(e.addFolder("Debug Info")),h={currentDistance:0,momentum:0,targetX:0,targetY:0,targetZ:0},u=c.add(h,"currentDistance").name("Distance").listen(),d=c.add(h,"momentum").name("Momentum").listen(),f=c.add(h,"targetX").name("Target X").listen(),g=c.add(h,"targetY").name("Target Y").listen(),y=c.add(h,"targetZ").name("Target Z").listen(),m=()=>{h.currentDistance=t.position.distanceTo(n.target),h.momentum=a.zoomMomentum||0,h.targetX=n.target.x,h.targetY=n.target.y,h.targetZ=n.target.z};this.updateCameraDebug=m,a.velocityMultiplier=.4;let p=this.trackFolder(e.addFolder("Coordinates")),M={x:0,y:0,z:0},w=p.add(M,"x").name("Center X").listen(),_=p.add(M,"y").name("Center Y").listen(),I=p.add(M,"z").name("Center Z").listen(),C=this.trackFolder(p.addFolder("Manual Control")),A={x:this.cameraManager.getRotationCenter().x,y:this.cameraManager.getRotationCenter().y,z:this.cameraManager.getRotationCenter().z};C.add(A,"x",-5,5,.001).name("Set X Position").onChange(N=>{this.cameraManager.setRotationCenterX(N)}).listen(),C.add(A,"y",-5,5,.001).name("Set Y Position").onChange(N=>{this.cameraManager.setRotationCenterY(N)}).listen(),C.add(A,"z",-5,5,.001).name("Set Z Position").onChange(N=>{this.cameraManager.setRotationCenterZ(N)}).listen(),p.add({copyCoords:()=>{this.cameraManager.copyCoordinatesToClipboard()}},"copyCoords").name("Copy Coordinates");let R=this.updateCameraDebug;this.updateCameraDebug=()=>{R&&R();let N=this.cameraManager.getRotationCenter();M.x=parseFloat(N.x.toFixed(6)),M.y=parseFloat(N.y.toFixed(6)),M.z=parseFloat(N.z.toFixed(6)),A.x=N.x,A.y=N.y,A.z=N.z};let S=this.trackFolder(e.addFolder("Animation Player")),v={showPlayer:this.animationPlayer?this.animationPlayer.isVisible:!0,alwaysVisible:this.animationPlayer?this.animationPlayer.alwaysVisible:!1};S.add(v,"showPlayer").name("Show Animation Player").onChange(N=>{this.animationPlayer&&(this.animationPlayer.setVisibility(N),v.showPlayer=N)}),S.add(v,"alwaysVisible").name("Always Visible (No Auto-Hide)").onChange(N=>{this.animationPlayer&&(this.animationPlayer.setAlwaysVisible(N),v.alwaysVisible=N)});let T=this.trackFolder(S.addFolder("Player Styling")),G=this.trackFolder(T.addFolder("Background"));G.addColor(this.playerStyleParams,"backgroundColor").name("Background Color").onChange(N=>{this.updatePlayerBackgroundColor(N)}),G.add(this.playerStyleParams,"backgroundOpacity",0,1,.1).name("Background Opacity").onChange(N=>{this.updatePlayerBackgroundOpacity(N)}),this.trackFolder(T.addFolder("Dimensions")).add(this.playerStyleParams,"playerWidth",20,100,1).name("Player Width (%)").onChange(N=>{}),this.trackFolder(T.addFolder("Display")).add(this.playerStyleParams,"showTimeDisplay").name("Show Time Display").onChange(N=>{this.updatePlayerTimeDisplay(N)});let X=this.trackFolder(T.addFolder("Buttons"));X.addColor(this.playerStyleParams,"buttonColor").name("Button Color").onChange(N=>{this.updatePlayerButtonColor(N)}),X.add(this.playerStyleParams,"buttonOpacity",0,1,.1).name("Button Opacity").onChange(N=>{this.updatePlayerButtonOpacity(N)});let H=this.trackFolder(T.addFolder("Timeline"));H.addColor(this.playerStyleParams,"scrubberColor").name("Scrubber Color").onChange(N=>{this.updatePlayerScrubberColor(N)}),H.add(this.playerStyleParams,"scrubberOpacity",0,1,.1).name("Scrubber Opacity").onChange(N=>{this.updatePlayerScrubberOpacity(N)});let j=this.trackFolder(T.addFolder("Text"));j.addColor(this.playerStyleParams,"textColor").name("Text Color").onChange(N=>{this.updatePlayerTextColor(N)}),j.add(this.playerStyleParams,"textOpacity",0,1,.1).name("Text Opacity").onChange(N=>{this.updatePlayerTextOpacity(N)}),S.open()}updatePlayerBackgroundColor(e){window.flexframeSettings&&window.flexframeSettings.uiSettings||this.animationPlayer&&this.animationPlayer.container&&(this.animationPlayer.container.style.backgroundColor=e)}updatePlayerBackgroundOpacity(e){if(!(window.flexframeSettings&&window.flexframeSettings.uiSettings)&&this.animationPlayer&&this.animationPlayer.container){let t=this.playerStyleParams.backgroundColor,n=parseInt(t.slice(1,3),16),i=parseInt(t.slice(3,5),16),s=parseInt(t.slice(5,7),16);this.animationPlayer.container.style.backgroundColor=`rgba(${n}, ${i}, ${s}, ${e})`}}updatePlayerTimeDisplay(e){if(this.animationPlayer&&this.animationPlayer.container){let t=this.animationPlayer.container.querySelector(".time-display");t&&(t.style.display=e?"inline-block":"none")}}updatePlayerButtonColor(e){if(console.log("[FlexFrame UI] updatePlayerButtonColor called with:",e),window.flexframeSettings&&window.flexframeSettings.uiSettings){console.log("[FlexFrame UI] Skipping JS button color - WordPress CSS will handle it");return}if(this.animationPlayer&&this.animationPlayer.container){let t=this.animationPlayer.container.querySelectorAll("button");t.forEach(n=>{n.style.color=e,n.querySelectorAll("svg").forEach(s=>{s.style.fill=e})}),console.log("[FlexFrame UI] Applied button color to",t.length,"buttons")}}updatePlayerButtonOpacity(e){this.animationPlayer&&this.animationPlayer.container&&this.animationPlayer.container.querySelectorAll("button").forEach(n=>{n.style.opacity=e})}updatePlayerScrubberColor(e){if(!(window.flexframeSettings&&window.flexframeSettings.uiSettings)&&this.animationPlayer&&this.animationPlayer.container){let t=this.animationPlayer.container.querySelector(".timeline-slider");if(t){t.style.accentColor=e;let n=document.createElement("style");n.textContent=`
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
                `;let i=document.getElementById("scrubber-color-style");i&&i.remove(),n.id="scrubber-color-style",document.head.appendChild(n)}}}updatePlayerScrubberOpacity(e){if(this.animationPlayer&&this.animationPlayer.container){let t=this.animationPlayer.container.querySelector(".timeline-slider");t&&(t.style.opacity=e)}}updatePlayerTextColor(e){this.animationPlayer&&this.animationPlayer.container&&this.animationPlayer.container.querySelectorAll(".time-display, .speed-menu").forEach(n=>{n.style.color=e})}updatePlayerTextOpacity(e){this.animationPlayer&&this.animationPlayer.container&&this.animationPlayer.container.querySelectorAll(".time-display, .speed-menu").forEach(n=>{n.style.opacity=e})}setupGUIVisibilityToggle(){let e=!1;this.gui.domElement.style.display="none",window.addEventListener("keydown",n=>{(n.key==="h"||n.key==="H")&&(e=!e,this.gui.domElement.style.display=e?"block":"none")});let t=document.createElement("style");t.innerHTML=`
            .dg.ac {
                z-index: 9999 !important;
                top: 10px !important;
                right: 10px !important;
                left: auto !important;
                display: block !important;
            }
        `,document.head.appendChild(t)}updateGroundMode(e){this.groundParams.mode=e,this.useShadowMaterial=e==="Infinite Canvas",this.useShadowMaterial?(this.ground.geometry=this.planeGeometry,this.ground.material=this.shadowGroundMaterial,this.ground.receiveShadow=!0,this.ground.castShadow=!1):(this.ground.geometry=this.circleGeometry,this.ground.material=this.solidGroundMaterial,this.ground.receiveShadow=this.groundParams.receiveShadow,this.ground.castShadow=this.groundParams.castShadow),this.ground.material.needsUpdate=!0,this.ground.geometry.computeBoundingSphere()}applyGroundSettings(e){Object.assign(this.groundParams,e),this.updateGroundMode(this.groundParams.mode),this.solidGroundMaterial.color.set(this.groundParams.color),this.solidGroundMaterial.roughness=this.groundParams.roughness,this.solidGroundMaterial.metalness=this.groundParams.metalness,this.shadowGroundMaterial.opacity=this.groundParams.shadowOpacity,this.ground.receiveShadow=this.groundParams.receiveShadow,this.ground.castShadow=this.groundParams.castShadow,this.ground.visible=this.groundParams.visible}setupARBranding(){let e={companyName:"FlexFrame",callToAction:"Visit FlexFrame",websiteUrl:window.location.origin};if(window.flexframeSettings){if(window.flexframeSettings.logoUrl){let t=window.flexframeSettings.logoUrl;t.startsWith("http://")&&(t=t.replace("http://","https://")),e.logoUrl=t,console.log("[FlexFrame AR] Using WordPress logo for AR branding:",t)}window.flexframeSettings.siteUrl&&(e.websiteUrl=window.flexframeSettings.siteUrl)}vc.setBranding(e)}setupQualityToggle(){let e=document.getElementById("quality-toggle-btn");console.log("[Quality Debug] setupQualityToggle called, button found:",!!e),e&&e.addEventListener("click",()=>{console.log("[Quality Debug] Quality button clicked!"),this.switchModelQuality()})}updateQualityButtonVisibility(){let e=document.getElementById("quality-toggle-btn"),t=document.getElementById("quality-text");if(console.log("[Quality Debug] updateQualityButtonVisibility called"),console.log("[Quality Debug] Button found:",!!e),console.log("[Quality Debug] modelUrlSQ:",this.modelUrlSQ),console.log("[Quality Debug] modelUrlHQ:",this.modelUrlHQ),e)if(this.modelUrlSQ&&this.modelUrlHQ){if(console.log("[Quality Debug] \u2705 Both models exist, showing button"),e.style.display="flex",t){let n=this.currentModelQuality==="SQ"?"HD":"SD";t.textContent=n,console.log("[Quality Debug] Set button text to:",n)}this.startQualityButtonPulsate()}else console.log("[Quality Debug] \u274C Missing model URLs, hiding button"),e.style.display="none",this.stopQualityButtonPulsate();else console.log("[Quality Debug] \u274C Button element not found in DOM!")}startQualityButtonPulsate(){this.stopQualityButtonPulsate();let e=document.getElementById("quality-toggle-btn"),t=document.getElementById("quality-text"),n=()=>{e&&t&&t.textContent==="HD"&&(e.classList.add("pulsate"),setTimeout(()=>{e.classList.remove("pulsate")},5e3))};n(),this.qualityPulsateInterval=setInterval(n,1e4)}stopQualityButtonPulsate(){this.qualityPulsateInterval&&(clearInterval(this.qualityPulsateInterval),this.qualityPulsateInterval=null);let e=document.getElementById("quality-toggle-btn");e&&e.classList.remove("pulsate")}async switchModelQuality(){if(!this.modelUrlSQ||!this.modelUrlHQ)return;this.currentModelQuality=this.currentModelQuality==="SQ"?"HQ":"SQ";let e=this.currentModelQuality==="SQ"?this.modelUrlSQ:this.modelUrlHQ;console.log("Switching to",this.currentModelQuality,"model:",e);let t=document.getElementById("quality-text");if(t){let n=this.currentModelQuality==="SQ"?"HD":"SD";t.textContent=n}if(this.startQualityButtonPulsate(),console.log("[HQ Debug] currentConfig:",this.currentConfig),console.log("[HQ Debug] Has cameraHQ?",!!this.currentConfig?.cameraHQ),console.log("[HQ Debug] cameraHQ value:",this.currentConfig?.cameraHQ),this.currentModelQuality==="HQ"&&(this.currentConfig?.modelHQ||this.currentConfig?.cameraHQ)){console.log("[HQ Debug] \u2705 Entering HQ branch");let n=this.currentConfig.modelHQ,i=this.currentConfig.cameraHQ||n?.camera;if(console.log("[HQ Debug] hqCameraSettings:",i),n?.model&&(this.pendingModelConfig=n.model),await this.loadModel(e),console.log("[HQ Debug] Model loaded, now applying camera settings"),i){console.log("[HQ Debug] Applying HQ camera position:",i.position);let s=this.cameraManager.getCamera();i.position&&s.position.set(...i.position),i.rotation&&s.rotation.set(...i.rotation),i.target&&this.cameraManager.getControls().target.set(...i.target),this.cameraManager.getControls().update(),this.cameraManager.updateOriginalState(i.position,i.rotation,i.target)}}else if(this.currentConfig?.model&&(this.pendingModelConfig=this.currentConfig.model),await this.loadModel(e),this.currentConfig?.camera){let n=this.cameraManager.getCamera();this.currentConfig.camera.position&&n.position.set(...this.currentConfig.camera.position),this.currentConfig.camera.rotation&&n.rotation.set(...this.currentConfig.camera.rotation),this.currentConfig.camera.target&&this.cameraManager.getControls().target.set(...this.currentConfig.camera.target),this.cameraManager.getControls().update(),this.cameraManager.updateOriginalState(this.currentConfig.camera.position,this.currentConfig.camera.rotation,this.currentConfig.camera.target)}}loadModel(e=In("models/exercise.glb")){return new Promise((t,n)=>{let i=document.getElementById("model-loader");i&&(this.updateLoaderSpinner(),i.style.display="flex"),this.modelFolder&&(this.modelFolder.destroy(),this.modelFolder=null),this.materialsFolder&&(this.materialsFolder.destroy(),this.materialsFolder=null),window.model&&(this.sceneManager.getScene().remove(window.model),window.model=null),this.mixer&&(this.mixer.stopAllAction(),this.mixer=null),this.allClickableMeshes=[],fn.clear(),this.gltfLoader.load(e,s=>{window.model=s.scene;let o=window.model,a=new Map;if(o.traverse(c=>{if(c.isMesh&&(this.allClickableMeshes.push(c),c.castShadow=!0,c.receiveShadow=!0,c.material)){let h=Array.isArray(c.material)?c.material:[c.material],u=[];h.forEach(d=>{if(d.name)if(d.name.includes("MUSCLE")&&d.type!=="MeshPhysicalMaterial")if(a.has(d.name))u.push(a.get(d.name));else{console.log(`Converting ${d.name} to MeshPhysicalMaterial for sheen support`);let f=new xt({color:new he(16777215),map:d.map,normalMap:d.normalMap,roughness:0,metalness:0,emissive:new he(0),emissiveIntensity:1.14,emissiveMap:d.emissiveMap,opacity:1,transparent:!0,side:nt,depthWrite:!0,sheen:.3,sheenRoughness:.45,sheenColor:new he(15403530)});f.name=d.name,d.map&&(f.bumpMap=d.map,f.bumpScale=10.2),a.set(d.name,f),u.push(f)}else if(d.name.includes("SKIN"))if(a.has(d.name))u.push(a.get(d.name));else{console.log(`Converting/Updating ${d.name} to MeshPhysicalMaterial for advanced transparency`);let f=new xt({color:new he(13426421),map:null,normalMap:null,roughness:0,metalness:0,emissive:new he(0),emissiveIntensity:1,emissiveMap:null,opacity:1,transparent:!1,side:vt,depthWrite:!1,depthTest:!0,blending:Ms,alphaTest:0,transmission:1,thickness:0,ior:1,envMapIntensity:2.29,sheen:0,sheenRoughness:1,sheenColor:new he(0)});f.name=d.name,f.bumpScale=1,console.log(`\u2705 ${d.name} Material Settings Applied:`,{color:"#"+f.color.getHexString(),opacity:f.opacity,transmission:f.transmission,ior:f.ior,roughness:f.roughness,metalness:f.metalness,envMapIntensity:f.envMapIntensity,side:f.side===nt?"DoubleSide":f.side===vt?"FrontSide":"BackSide",blending:f.blending,depthWrite:f.depthWrite,depthTest:f.depthTest,thickness:f.thickness,bumpScale:f.bumpScale}),a.set(d.name,f),u.push(f)}else if(d.name.includes("SKELETON")&&d.type!=="MeshPhysicalMaterial")if(a.has(d.name))u.push(a.get(d.name));else{console.log(`Converting ${d.name} to MeshPhysicalMaterial`);let f=new xt({color:new he(16777215),map:d.map,normalMap:d.normalMap,roughness:.9875603442970008,metalness:0,emissive:new he(0),emissiveIntensity:1,emissiveMap:d.emissiveMap,opacity:1,transparent:!0,side:nt,depthWrite:!0,depthTest:!0,blending:Rt,alphaTest:0,envMapIntensity:1});f.name=d.name,d.map&&(f.bumpMap=d.map,f.bumpScale=1),a.set(d.name,f),u.push(f)}else if(d.name.includes("CHROME"))if(a.has(d.name))u.push(a.get(d.name));else{console.log(`Converting ${d.name} to MeshPhysicalMaterial with chrome settings`);let f=new xt({color:new he(16777215),roughness:.07,metalness:.82,emissive:new he(0),emissiveIntensity:1,opacity:1,transparent:!1,side:nt,depthWrite:!0,depthTest:!0,blending:Rt,alphaTest:0,envMapIntensity:1,sheen:0,sheenRoughness:1,sheenColor:new he(0),transmission:0,thickness:0,ior:1.5});f.name=d.name,console.log(`\u2705 ${d.name} Material Settings Applied (pure chrome - no textures):`,{color:"#"+f.color.getHexString(),opacity:f.opacity,transparent:f.transparent,roughness:f.roughness,metalness:f.metalness,envMapIntensity:f.envMapIntensity,side:f.side===nt?"DoubleSide":f.side===vt?"FrontSide":"BackSide"}),a.set(d.name,f),u.push(f)}else if(d.name.includes("COLOR_1"))if(a.has(d.name))u.push(a.get(d.name));else{console.log(`Converting ${d.name} to MeshPhysicalMaterial with custom settings`);let g=window.flexframeSettings?.primaryColorMode==="custom"&&window.flexframeSettings?.primaryColor?window.flexframeSettings.primaryColor:"#ff0000",y=new xt({color:new he(g),roughness:.2152357035754776,metalness:0,emissive:new he(0),emissiveIntensity:1,opacity:1,transparent:!1,side:nt,depthWrite:!0,depthTest:!0,blending:Rt,alphaTest:0,envMapIntensity:1,sheen:0,sheenRoughness:1,sheenColor:new he(0),transmission:0,thickness:0,ior:1.5});y.name=d.name,console.log(`\u2705 ${d.name} Material Settings Applied:`,{color:"#"+y.color.getHexString(),opacity:y.opacity,transparent:y.transparent,roughness:y.roughness,metalness:y.metalness,side:y.side===nt?"DoubleSide":y.side===vt?"FrontSide":"BackSide"}),a.set(d.name,y),u.push(y)}else u.push(d)}),u.length>0&&(Array.isArray(c.material)?c.material=u:c.material=u[0])}}),this.currentConfig&&this.currentConfig.customTextures&&this.applyCustomTextures(o,this.currentConfig.customTextures),window.flexframeSettings&&window.flexframeSettings.logoUrl){let c=window.flexframeSettings.logoUrl;c.startsWith("http://")&&(c=c.replace("http://","https://")),console.log("\u{1F3A8} Applying LOGO texture from WordPress settings:",c);let h=window.flexframeSettings.logoThreshold||.95,u=window.flexframeSettings.logoBorderEnabled||!1,d=window.flexframeSettings.logoBorderSize||2,f=window.flexframeSettings.logoDisplaySize||100;this.applyLogoTexture(o,c,h,u,d,f)}if(o.position.set(0,-.02,0),this.pendingModelConfig&&(this.pendingModelConfig.position&&o.position.set(...this.pendingModelConfig.position),this.pendingModelConfig.rotation&&o.rotation.set(...this.pendingModelConfig.rotation),this.pendingModelConfig.scale&&o.scale.set(...this.pendingModelConfig.scale),this.pendingModelConfig=null),window.flexframeSettings){let c=window.flexframeSettings.materialMode||"preset";if(c==="custom"&&window.flexframeSettings.skinSettings)console.log("Pre-applying Custom SKIN settings..."),this.applyCustomSkinSettings(window.flexframeSettings.skinSettings);else if(c==="preset"&&window.flexframeSettings.materialPreset){let h=window.flexframeSettings.materialPreset;console.log("Material Preset setting:",h),h==="default"||h==="dark"||h==="light"||h==="preset1"?(console.log("Pre-applying Default Material Preset..."),this.applyMaterialPreset1()):h==="wp_preset"&&(console.log("Pre-applying WP Preset..."),this.applyWPPreset())}}this.sceneManager.getScene().add(o);let l=document.getElementById("model-loader");l&&(l.style.display="none"),this.cameraManager.setClickableMeshes(this.allClickableMeshes),s.animations&&s.animations.length>0&&(this.mixer=new vr(o),this.animationPlayer.setMixer(this.mixer,s.animations),this.animationPlayer.actions&&this.animationPlayer.actions.length>0&&(this.animationPlayer.actions[0].play(),this.animationPlayer.isPlaying=!0,this.animationPlayer.updatePlayPauseIcon())),this.setupModelGUI(o),this.setupMaterialsGUI(o),t(o)},void 0,s=>{console.error("An error happened while loading the GLB model:",s);let o=document.getElementById("model-loader");o&&(o.style.display="none"),n(s)})})}setupModelGUI(e){this.modelFolder=this.trackFolder(this.gui.addFolder("Model Transform"));let t=e.position,n=e.rotation,i=e.scale;this.modelFolder.add(t,"x",-1,1,.002).name("Position X"),this.modelFolder.add(t,"y",-1,1,.002).name("Position Y"),this.modelFolder.add(t,"z",-1,1,.002).name("Position Z"),this.modelFolder.add(n,"x",-1,1,.002).name("Rotation X"),this.modelFolder.add(n,"y",-1,1,.002).name("Rotation Y"),this.modelFolder.add(n,"z",-1,1,.002).name("Rotation Z"),this.modelFolder.add(i,"x",.01,1,.001).name("Scale X"),this.modelFolder.add(i,"y",.01,1,.001).name("Scale Y"),this.modelFolder.add(i,"z",.01,1,.001).name("Scale Z"),this.modelFolder.add({showAxis:this.cameraManager.axisHelperVisible},"showAxis").name("Show Axis Helper").onChange(s=>{this.cameraManager.toggleAxisHelper(s)}),this.modelFolder.add({axisSize:this.cameraManager.axisHelperSize},"axisSize",.1,2,.1).name("Axis Size").onChange(s=>{this.cameraManager.setAxisHelperSize(s)}),this.modelFolder.add({saveModelSettings:async()=>{let s=this.gatherModelSpecificSettings(),o=JSON.stringify(s,null,2);try{await navigator.clipboard.writeText(o),alert("Model config copied to clipboard!"),console.log("Model config saved:",s)}catch(a){console.error("Failed to copy to clipboard:",a),alert("Failed to copy config to clipboard.")}}},"saveModelSettings").name("Save Model Config")}setupMaterialsGUI(e){let t=new Map;if(e.traverse(n=>{n.isMesh&&n.material&&(Array.isArray(n.material)?n.material:[n.material]).forEach(s=>{if(s&&s.name&&!t.has(s.name))t.set(s.name,s);else if(s&&!s.name){let o=`Material_${t.size}`;s.name=o,t.set(o,s)}})}),t.size>0){let n=document.createElement("div");this.materialsFolder=this.trackFolder(this.gui.addFolder("Material Colors")),setTimeout(()=>{let i=this.gui.domElement.querySelector(".children"),s=this.materialsFolder.domElement;i&&s&&(i.insertBefore(s,i.firstChild),s.classList.add("materials-folder-main"))},10),t.forEach((i,s)=>{let o=this.trackFolder(this.materialsFolder.addFolder(s));if(o.close(),this.currentConfig?.customTextures&&this.currentConfig.customTextures[s]){let c=this.currentConfig.customTextures[s],h={textureUrl:c},u=o.add(h,"textureUrl").name("Texture URL (click to copy)");setTimeout(()=>{let d=u.domElement.querySelector("input");d&&(d.style.cursor="pointer",d.readOnly=!0,d.addEventListener("click",()=>{navigator.clipboard.writeText(c).then(()=>{console.log("Texture URL copied to clipboard:",c),d.style.background="rgba(74, 158, 255, 0.3)",setTimeout(()=>{d.style.background=""},300)})}))},0),setTimeout(()=>{let d=o.domElement;if(d){let f=document.createElement("div");f.className="material-texture-thumbnail";let g=document.createElement("img");g.src=c+(c.includes("?")?"&":"?")+`t=${Date.now()}`,g.alt=`${s} texture`,f.appendChild(g),d.appendChild(f)}},0)}if(this.currentConfig?.customTextures&&this.currentConfig.customTextures[s]&&o.add(i,"alphaTest",0,1,.01).name("Edge Threshold (Fix Fringe)").onChange(()=>i.needsUpdate=!0),i.color){let c={color:"#"+i.color.getHexString()};o.addColor(c,"color").name("Color").onChange(h=>{i.color.set(h),i.needsUpdate=!0})}o.add(i,"opacity",0,1,.01).name("Opacity").onChange(()=>i.needsUpdate=!0),o.add(i,"transparent").name("Transparent").onChange(()=>i.needsUpdate=!0),(!this.currentConfig?.customTextures||!this.currentConfig.customTextures[s])&&o.add(i,"alphaTest",0,1,.01).name("Alpha Test").onChange(()=>i.needsUpdate=!0);let a={Front:vt,Back:It,Double:nt};if(o.add(i,"side",a).name("Side").onChange(()=>i.needsUpdate=!0),o.add(i,"depthWrite").name("Depth Write").onChange(()=>i.needsUpdate=!0),i.metalness!==void 0&&o.add(i,"metalness",0,1,.01).name("Metalness").onChange(()=>i.needsUpdate=!0),i.roughness!==void 0&&o.add(i,"roughness",0,1,.01).name("Roughness").onChange(()=>i.needsUpdate=!0),i.emissive){let c={emissive:i.emissive.getHex()};o.addColor(c,"emissive").name("Emissive").onChange(h=>{i.emissive.setHex(h)})}if(i.emissiveIntensity!==void 0&&o.add(i,"emissiveIntensity",0,2,.01).name("Emissive Intensity").onChange(()=>i.needsUpdate=!0),s.includes("MUSCLE")){if(i.sheen!==void 0){o.add(i,"sheen",0,1,.01).name("Sheen Intensity").onChange(()=>i.needsUpdate=!0),o.add(i,"sheenRoughness",0,1,.01).name("Sheen Roughness").onChange(()=>i.needsUpdate=!0);let c={sheenColor:i.sheenColor?i.sheenColor.getHex():16777215};o.addColor(c,"sheenColor").name("Sheen Color").onChange(h=>{i.sheenColor||(i.sheenColor=new he),i.sheenColor.setHex(h),i.needsUpdate=!0})}i.bumpScale!==void 0&&i.bumpMap&&(setTimeout(()=>{let c=o.domElement;if(c){let h=document.createElement("div");h.className="material-texture-thumbnail";let u=document.createElement("div");u.textContent="Bump Map Texture:",u.style.fontSize="11px",u.style.marginBottom="4px",u.style.color="#aaa";let d=document.createElement("img");if(i.bumpMap.image&&i.bumpMap.image.src)d.src=i.bumpMap.image.src;else if(i.bumpMap.source&&i.bumpMap.source.data){let f=document.createElement("canvas");f.width=64,f.height=64;let g=f.getContext("2d");i.bumpMap.image&&g.drawImage(i.bumpMap.image,0,0,64,64),d.src=f.toDataURL()}d.alt="Bump map texture",h.appendChild(u),h.appendChild(d),c.appendChild(h)}},100),o.add(i,"bumpScale",-20,20,.1).name("Bump Scale").onChange(()=>i.needsUpdate=!0))}if(s.includes("SKIN")){i._originalColorMap||(i._originalColorMap=i.map);let c=window.flexframeSettings&&window.flexframeSettings.materialMode==="custom",h={useColorMap:c?!1:!!i.map};c&&i.map&&(i.map=null,i.needsUpdate=!0),o.add(h,"useColorMap").name("\u{1F3A8} Use Color Map").onChange(y=>{y&&i._originalColorMap?i.map=i._originalColorMap:i.map=null,i.needsUpdate=!0});let u={"Front (Single)":vt,Back:It,Double:nt};o.add(i,"side",u).name("Face Culling").onChange(()=>i.needsUpdate=!0);let d={Normal:Rt,Additive:wr,Subtractive:Er,Multiply:Ar,Custom:Ms};o.add(i,"blending",d).name("Blending Mode").onChange(()=>i.needsUpdate=!0),o.add(i,"depthWrite").name("Depth Write").onChange(()=>i.needsUpdate=!0),o.add(i,"depthTest").name("Depth Test").onChange(()=>i.needsUpdate=!0),o.add(i,"opacity",0,1,.01).name("Opacity").onChange(()=>i.needsUpdate=!0),o.add(i,"transparent").name("Transparent").onChange(()=>i.needsUpdate=!0),o.add(i,"alphaTest",0,1,.01).name("Alpha Test").onChange(()=>i.needsUpdate=!0),i.transmission!==void 0&&(o.add(i,"transmission",0,1,.01).name("\u{1FA9F} Transmission (Glass)").onChange(()=>i.needsUpdate=!0),o.add(i,"thickness",0,5,.01).name("Thickness").onChange(()=>i.needsUpdate=!0),o.add(i,"ior",1,2.333,.01).name("IOR (Refraction)").onChange(()=>i.needsUpdate=!0),o.add(i,"envMapIntensity",0,3,.01).name("Env Map Intensity").onChange(()=>i.needsUpdate=!0));let f={castShadow:!0,setCastShadow:y=>{window.model&&window.model.traverse(m=>{m.isMesh&&m.material&&(Array.isArray(m.material)?m.material:[m.material]).some(M=>M.name===s)&&(m.castShadow=y)})}};o.add(f,"castShadow").name("Cast Shadows").onChange(y=>f.setCastShadow(y));let g={shadowBlur:this.lighting?.directionalLight?.shadow?.radius||1,setShadowBlur:y=>{this.lighting?.directionalLight?.shadow&&(this.lighting.directionalLight.shadow.radius=y,console.log(`Shadow blur set to: ${y}`))}};o.add(g,"shadowBlur",0,10,.1).name("Shadow Blur").onChange(y=>g.setShadowBlur(y))}let l={copySettings:()=>{let c=i.map||i.normalMap||i.emissiveMap||i.bumpMap,h="Can you please use these material settings as the default material settings whenever a model loads in with this specific material name.";c?h+=` Do NOT preserve any texture maps - use pure material properties only:

`:h+=`

`,h+=`Material Name: "${s}"

`,h+=`Settings:
`,i.color&&(h+=`- Color: #${i.color.getHexString()}
`),i.opacity!==void 0&&(h+=`- Opacity: ${i.opacity}
`),i.transparent!==void 0&&(h+=`- Transparent: ${i.transparent}
`),i.alphaTest!==void 0&&(h+=`- Alpha Test: ${i.alphaTest}
`),i.side!==void 0&&(h+=`- Side: ${{0:"FrontSide",1:"BackSide",2:"DoubleSide"}[i.side]||i.side}
`),i.depthWrite!==void 0&&(h+=`- Depth Write: ${i.depthWrite}
`),i.metalness!==void 0&&(h+=`- Metalness: ${i.metalness}
`),i.roughness!==void 0&&(h+=`- Roughness: ${i.roughness}
`),i.emissive&&(h+=`- Emissive: #${i.emissive.getHexString()}
`),i.emissiveIntensity!==void 0&&(h+=`- Emissive Intensity: ${i.emissiveIntensity}
`),i.sheen!==void 0&&(h+=`- Sheen: ${i.sheen}
`),i.sheenRoughness!==void 0&&(h+=`- Sheen Roughness: ${i.sheenRoughness}
`),i.sheenColor&&(h+=`- Sheen Color: #${i.sheenColor.getHexString()}
`),i.bumpScale!==void 0&&(h+=`- Bump Scale: ${i.bumpScale}
`),i.transmission!==void 0&&(h+=`- Transmission: ${i.transmission}
`),i.thickness!==void 0&&(h+=`- Thickness: ${i.thickness}
`),i.ior!==void 0&&(h+=`- IOR: ${i.ior}
`),i.envMapIntensity!==void 0&&(h+=`- Env Map Intensity: ${i.envMapIntensity}
`),i.blending!==void 0&&(h+=`- Blending: ${{0:"NoBlending",1:"NormalBlending",2:"AdditiveBlending",3:"SubtractiveBlending",4:"MultiplyBlending",5:"CustomBlending"}[i.blending]||i.blending}
`),i.depthTest!==void 0&&(h+=`- Depth Test: ${i.depthTest}
`),c&&(h+=`
Note: Remove all texture maps (map, normalMap, emissiveMap, bumpMap) for a pure material appearance.`),navigator.clipboard.writeText(h).then(()=>{console.log("Material settings copied to clipboard for:",s)})}};o.add(l,"copySettings").name("Copy Settings")})}}applyCustomTextures(e,t){Object.keys(t).forEach(n=>{let i=t[n],s=i+(i.includes("?")?"&":"?")+`t=${Date.now()}`;console.log(`\u{1F3A8} Custom texture for ${n}: ${i}`),console.log(`\u{1F504} Cache-busted URL: ${s}`),e.traverse(o=>{o.isMesh&&o.material&&(Array.isArray(o.material)?o.material:[o.material]).forEach(l=>{l.name===n&&(console.log(`\u2705 Found material "${n}" - applying texture...`),l.map&&l.map.dispose(),this.textureLoader.load(s,c=>{c.colorSpace=dt,c.premultiplyAlpha=!1,c.minFilter=Qe,c.magFilter=Qe,c.generateMipmaps=!1,l.map=c,l.transparent=!0,l.alphaTest=.95,l.depthWrite=!1,l.needsUpdate=!0,console.log(`\u2705 PNG texture with transparency applied to ${n}`),console.log(`\u{1F4F7} Texture loaded from: ${s}`)},void 0,c=>{console.error(`\u274C Error loading texture for ${n}:`,c)}))})})})}applyLogoTexture(e,t,n=.95,i=!1,s=2,o=100){let a=t+(t.includes("?")?"&":"?")+`t=${Date.now()}`;e.traverse(l=>{l.isMesh&&l.material&&(Array.isArray(l.material)?l.material:[l.material]).forEach(h=>{if(h.name==="LOGO"){console.log("\u2705 Found LOGO material - applying texture..."),h.map&&h.map.dispose();let u=new Image;u.crossOrigin="anonymous",u.onload=()=>{let d=document.createElement("canvas"),f=d.getContext("2d"),g=o/100,y=u.width*g,m=u.height*g;d.width=u.width,d.height=u.height,f.clearRect(0,0,d.width,d.height);let p=(d.width-y)/2,M=(d.height-m)/2;if(i&&s>0){f.globalCompositeOperation="source-over";let _=document.createElement("canvas"),I=_.getContext("2d");_.width=d.width,_.height=d.height,I.drawImage(u,p,M,y,m);let C=parseInt(s);for(let A=0;A<360;A+=15){let R=A*Math.PI/180,S=Math.cos(R)*C,v=Math.sin(R)*C;f.drawImage(_,S,v)}f.globalCompositeOperation="source-in",f.fillStyle="white",f.fillRect(0,0,d.width,d.height),f.globalCompositeOperation="source-over",f.drawImage(u,p,M,y,m)}else f.drawImage(u,p,M,y,m);let w=new Hn(d);w.colorSpace=dt,w.premultiplyAlpha=!1,w.minFilter=Qe,w.magFilter=Qe,w.generateMipmaps=!1,h.map=w,h.transparent=!0,h.alphaTest=parseFloat(n)||.95,h.depthWrite=!1,h.needsUpdate=!0,console.log("\u2705 LOGO texture applied successfully with border:",i,"size:",s,"displaySize:",o)},u.onerror=d=>{console.error("\u274C Error loading LOGO texture:",d)},u.src=a}})})}applyMaterialPreset1(){if(!window.model){console.log("No model loaded");return}let e={SKELETON:{color:"#ffffff",opacity:1,transparent:!0,metalness:0,roughness:.99,transmission:0,thickness:0,ior:1.5,side:nt,blending:Rt,depthWrite:!0,depthTest:!0,envMapIntensity:1},SKIN:{color:"#ccdef5",opacity:1,transparent:!1,metalness:0,roughness:0,transmission:1,thickness:0,ior:1,side:vt,blending:Ms,depthWrite:!1,depthTest:!0,envMapIntensity:2.29},MUSCLE:{color:"#ffffff",opacity:1,transparent:!0,metalness:0,roughness:0,transmission:0,thickness:0,ior:1.5,side:nt,blending:Rt,depthWrite:!0,depthTest:!0,envMapIntensity:1},CHROME:{color:"#ffffff",opacity:1,transparent:!1,metalness:.82,roughness:.07,transmission:0,thickness:0,ior:1.5,side:nt,blending:Rt,depthWrite:!0,depthTest:!0,envMapIntensity:1},METAL:{color:"#151515",opacity:1,transparent:!1,metalness:.85,roughness:.36,transmission:0,thickness:0,ior:1.5,side:nt,blending:Rt,depthWrite:!0,depthTest:!0,envMapIntensity:1},PLASTIC:{color:"#ffffff",opacity:.8,transparent:!0,metalness:0,roughness:.82,transmission:.2,thickness:0,ior:1.5,side:nt,blending:Rt,depthWrite:!1,depthTest:!0,envMapIntensity:1},COLOR_1:{color:window.flexframeSettings?.primaryColorMode==="custom"&&window.flexframeSettings?.primaryColor?window.flexframeSettings.primaryColor:"#ff0000",opacity:1,transparent:!1,metalness:0,roughness:.215,transmission:0,thickness:0,ior:1.5,side:nt,blending:Rt,depthWrite:!0,depthTest:!0,envMapIntensity:1}},t=0;window.model.traverse(n=>{n.isMesh&&n.material&&(Array.isArray(n.material)?n.material:[n.material]).forEach(s=>{if(s.name&&e[s.name.toUpperCase()]){let o=e[s.name.toUpperCase()];o.color&&s.color.set(o.color),s.opacity=o.opacity,s.transparent=o.transparent,s.metalness=o.metalness,s.roughness=o.roughness,s.transmission=o.transmission,s.thickness=o.thickness,s.ior=o.ior,s.side=o.side,s.blending=o.blending,s.depthWrite=o.depthWrite,s.depthTest=o.depthTest,s.envMapIntensity=o.envMapIntensity,s.name.toUpperCase()==="SKIN"&&(s.map=null,s.normalMap=null,s.emissiveMap=null,s.bumpMap=null),o.attenuationDistance&&(s.attenuationDistance=o.attenuationDistance),s.needsUpdate=!0,t++}})}),console.log(`\u2705 Applied Material Preset 1 to ${t} materials`),this.gui&&setTimeout(()=>{this.gui.controllersRecursive().forEach(n=>{n.updateDisplay()})},100)}applyCustomSkinSettings(e){if(!window.model){console.log("No model loaded for custom skin settings");return}console.log("Applying custom SKIN settings:",e),window.model.traverse(t=>{t.isMesh&&t.material&&(Array.isArray(t.material)?t.material:[t.material]).forEach(i=>{i.name&&i.name.toUpperCase()==="SKIN"&&(e.color&&i.color.set(e.color),e.opacity!==void 0&&(i.opacity=e.opacity,i.transparent=e.opacity<1),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.transmission!==void 0&&(i.transmission=e.transmission),e.thickness!==void 0&&(i.thickness=e.thickness),e.ior!==void 0&&(i.ior=e.ior),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),i.needsUpdate=!0,console.log("\u2705 Custom SKIN settings applied to material:",i.name))})}),this.gui&&setTimeout(()=>{this.gui.controllersRecursive().forEach(t=>{t.updateDisplay()})},100)}setupEventListeners(){window.addEventListener("resize",()=>{this.sizes.width=window.innerWidth,this.sizes.height=window.innerHeight,this.cameraManager.handleResize(),this.renderer.setSize(this.sizes.width,this.sizes.height),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))}),this.sceneManager.getCanvas().addEventListener("pointerdown",e=>{if(this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.cameraManager.getCamera()),window.model){let t=this.raycaster.intersectObject(window.model,!0);if(t.length>0){let n=t[0].object;n.isMesh&&n.material&&(Array.isArray(n.material)?n.material:[n.material]).forEach(s=>{console.log("\u{1F3A8} Material:",s.name||"Unnamed Material")})}}})}animate(){let e=this.clock.getDelta();this.cameraManager.update(),this.updateCameraDebug&&this.updateCameraDebug(),this.particleSystem.update(e),this.mixer&&this.animationPlayer.isPlaying&&this.mixer.update(e),this.animationPlayer.update(e),this.renderer.render(this.sceneManager.getScene(),this.cameraManager.getCamera()),requestAnimationFrame(()=>this.animate())}setupScreenshotGUI(){let e=this.trackFolder(this.gui.addFolder("Screenshot")),t=this.screenshotManager.settings,n=this.screenshotManager.getResolutionPresets(),i={quickShot:()=>{this.screenshotManager.quickScreenshot().then(_=>{_.success?console.log(`\u2705 Screenshot saved: ${_.filename} (${_.size})`):console.error("\u274C Screenshot failed:",_.error)})},transparentShot:()=>{this.screenshotManager.transparentScreenshot().then(_=>{_.success?console.log(`\u2705 Transparent screenshot saved: ${_.filename} (${_.size})`):console.error("\u274C Screenshot failed:",_.error)})}};e.add(i,"quickShot").name("Take Screenshot"),e.add(i,"transparentShot").name("\u{1FAE5} Transparent Background");let s=this.trackFolder(e.addFolder("Settings"));s.add(t,"transparent").name("Transparent Background").onChange(_=>{console.log("Transparent background:",_?"ON":"OFF")});let o={png:"PNG",jpg:"JPEG",webp:"WebP"};s.add(t,"format",o).name("Format").onChange(_=>{console.log("Format changed to:",_.toUpperCase()),a.domElement.style.display=_==="png"?"none":"block"});let a=s.add(t,"quality",.1,1,.1).name("Quality (0.1-1.0)").onChange(_=>{console.log("Quality:",Math.round(_*100)+"%")});t.format==="png"&&(a.domElement.style.display="none"),s.add(t,"filename").name("Filename").onChange(_=>{t.filename=_.replace(/[^a-zA-Z0-9_-]/g,"")}),s.add(t,"addTimestamp").name("Add Timestamp");let l=this.trackFolder(e.addFolder("Resolution")),c={};Object.keys(n).forEach(_=>{c[_]=n[_].name}),l.add(t,"resolution",c).name("Preset").onChange(_=>{this.screenshotManager.setResolution(_),g();let I=_==="custom";h.domElement.style.display=I?"block":"none",u.domElement.style.display=I?"block":"none",console.log("Resolution preset:",n[_].name)});let h=l.add(t,"customWidth",1,8192,1).name("Custom Width").onChange(_=>{this.screenshotManager.setCustomDimensions(_,t.customHeight),g()}),u=l.add(t,"customHeight",1,8192,1).name("Custom Height").onChange(_=>{this.screenshotManager.setCustomDimensions(t.customWidth,_),g()}),d={info:"Loading..."},f=l.add(d,"info").name("Current Resolution");f.domElement.querySelector("input").readOnly=!0,f.domElement.querySelector("input").style.color="#888";let g=()=>{let _=this.screenshotManager.getCurrentResolution(),I=(_.width*_.height/1e6).toFixed(1),C=this.calculateAspectRatio(_.width,_.height);d.info=`${_.width}\xD7${_.height} (${I}MP, ${C})`},y=t.resolution==="custom";h.domElement.style.display=y?"block":"none",u.domElement.style.display=y?"block":"none";let m=this.trackFolder(l.addFolder("Quick Presets")),p={hd:()=>this.setQuickResolution("1280x720"),fhd:()=>this.setQuickResolution("1920x1080"),qhd:()=>this.setQuickResolution("2560x1440"),uhd:()=>this.setQuickResolution("3840x2160"),square:()=>this.setQuickResolution("1080x1080"),story:()=>this.setQuickResolution("1080x1920")};m.add(p,"hd").name("HD (720p)"),m.add(p,"fhd").name("Full HD (1080p)"),m.add(p,"qhd").name("2K (1440p)"),m.add(p,"uhd").name("4K (2160p)"),m.add(p,"square").name("Square (1:1)"),m.add(p,"story").name("Story (9:16)");let M=this.trackFolder(e.addFolder("Advanced")),w={currentViewport:()=>{let _=this.sceneManager.getCanvas();this.screenshotManager.setCustomDimensions(_.width,_.height),t.resolution="custom",g(),console.log(`Set to current viewport: ${_.width}\xD7${_.height}`)},copySettings:()=>{let _=this.screenshotManager.getSettings();navigator.clipboard.writeText(JSON.stringify(_,null,2)),console.log("\u{1F4CB} Screenshot settings copied to clipboard")}};M.add(w,"currentViewport").name("Use Current Viewport"),M.add(w,"copySettings").name("Copy Screenshot Settings"),g()}setupMultiThumbnailMenuGUI(){let e=this.trackFolder(this.gui.addFolder("Multi-Thumbnail Menu")),t=this.multiThumbnailMenuSystem.settings;e.add(t,"widthPercentage",20,100,5).name("Width %").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({widthPercentage:s}),console.log("Multi-thumbnail menu width:",s+"%")}),e.addColor(t,"backgroundColor").name("Background Color").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({backgroundColor:s}),console.log("Multi-thumbnail menu background color:",s)}),e.add(t,"backgroundOpacity",0,1,.1).name("Background Opacity").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({backgroundOpacity:s}),console.log("Multi-thumbnail menu opacity:",s)}),e.add(t,"borderRadius",0,30,1).name("Corner Radius").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({borderRadius:s}),console.log("Multi-thumbnail menu radius:",s+"px")}),e.add(t,"keepOpen").name("Keep Menu Open").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({keepOpen:s}),console.log("Multi-thumbnail menu keep open:",s?"ON":"OFF")});let n=e.addFolder("Active Button Glow");n.addColor(t,"glowColor").name("Glow Color").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({glowColor:s}),console.log("Multi-thumbnail menu glow color:",s)}),n.add(t,"glowIntensity",0,1,.1).name("Glow Intensity").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({glowIntensity:s}),console.log("Multi-thumbnail menu glow intensity:",s)}),n.add(t,"glowSize",5,50,5).name("Glow Size").onChange(s=>{this.multiThumbnailMenuSystem.updateAllSettings({glowSize:s}),console.log("Multi-thumbnail menu glow size:",s+"px")}),e.add({copySettings:()=>this.multiThumbnailMenuSystem.copySettingsToClipboard()},"copySettings").name("Copy Settings");let i={hideRightMenu:!1};e.add(i,"hideRightMenu").name("Hide Right Info Menu").onChange(s=>{let o=document.querySelector(".thumbnail-grid-container-right");o&&(o.style.display=s?"none":"grid",console.log("Right info menu:",s?"HIDDEN":"VISIBLE"))}),e.add({copyRightMenuSettings:()=>this.rightMenuSystem.copySettingsToClipboard()},"copyRightMenuSettings").name("Copy Right Menu Settings"),setTimeout(()=>this.multiThumbnailMenuSystem.updateAllSettings(t),100)}setQuickResolution(e){this.screenshotManager.setResolution(e),this.screenshotManager.settings.resolution=e,console.log("Quick preset:",this.screenshotManager.getResolutionPresets()[e].name)}calculateAspectRatio(e,t){let n=(l,c)=>c===0?l:n(c,l%c),i=n(e,t),s=e/i,o=t/i,a={"16:9":[16,9],"21:9":[21,9],"4:3":[4,3],"3:2":[3,2],"1:1":[1,1],"9:16":[9,16],"2:1":[2,1],"5:4":[5,4]};for(let[l,[c,h]]of Object.entries(a))if(s===c&&o===h)return l;return`${s}:${o}`}createScreenshotFrame(){this.screenshotFrame&&document.body.removeChild(this.screenshotFrame),this.screenshotFrame=document.createElement("div"),this.screenshotFrame.className="screenshot-frame",this.screenshotFrame.innerHTML=`
            <div class="frame-corner top-left"></div>
            <div class="frame-corner top-right"></div>
            <div class="frame-corner bottom-left"></div>
            <div class="frame-corner bottom-right"></div>
            <div class="frame-info"></div>
        `;let e=document.createElement("style");e.textContent=`
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
        `,document.head.querySelector("style[data-screenshot-frame]")||(e.setAttribute("data-screenshot-frame","true"),document.head.appendChild(e)),document.body.appendChild(this.screenshotFrame)}updateScreenshotFrame(e,t){if(!this.screenshotFrame)return;let i=this.renderer.domElement.getBoundingClientRect(),s=i.width/i.height,o=e/t,a,l;o>s?(a=i.width*.8,l=a/o):(l=i.height*.8,a=l*o);let c=i.left+(i.width-a)/2,h=i.top+(i.height-l)/2;this.screenshotFrame.style.left=c+"px",this.screenshotFrame.style.top=h+"px",this.screenshotFrame.style.width=a+"px",this.screenshotFrame.style.height=l+"px";let u=this.screenshotFrame.querySelector(".frame-info");u.textContent=`${e} \xD7 ${t} pixels`}toggleScreenshotFrame(e){this.frameVisible=e,this.screenshotFrame&&this.screenshotFrame.classList.toggle("visible",e)}setupSimpleScreenshotGUI(){let e=this.trackFolder(this.gui.addFolder("Screenshot")),t=this.trackFolder(e.addFolder("Custom Settings")),n=()=>({renderer:this.renderer,scene:this.sceneManager.getScene(),camera:this.cameraManager.getCamera()}),i={width:400,height:400,transparent:!1,format:"png",filename:"screenshot",showFrame:!1},s=()=>{this.currentExerciseName&&(i.filename=`${this.currentExerciseName} Thumbnail`)};s(),this.createScreenshotFrame(),t.add(i,"width",100,4096,1).name("Width").onChange(a=>{i.showFrame&&this.updateScreenshotFrame(a,i.height)}),t.add(i,"height",100,4096,1).name("Height").onChange(a=>{i.showFrame&&this.updateScreenshotFrame(i.width,a)}),t.add(i,"showFrame").name("Show Frame Preview").onChange(a=>{this.toggleScreenshotFrame(a),a&&this.updateScreenshotFrame(i.width,i.height)}),t.add(i,"transparent").name("Transparent"),t.add(i,"format",["png","jpg","webp"]).name("Format");let o=t.add(i,"filename").name("Filename");document.addEventListener("exercisesSelected",()=>{s(),o.updateDisplay()}),t.add({customShot:async()=>{let a=n(),l=await Ad.takeScreenshot(a.renderer,a.scene,a.camera,i);l.success?console.log(`\u2705 Custom ${l.filename} saved (${l.size})`):console.error(`\u274C Custom screenshot failed: ${l.error}`)}},"customShot").name("Take Custom Screenshot")}},vb=new jc;return Gd(n_);})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

lil-gui/dist/lil-gui.esm.js:
  (**
   * lil-gui
   * https://lil-gui.georgealways.com
   * @version 0.20.0
   * @author George Michael Brower
   * @license MIT
   *)
*/
