function canvasio3D_JS () {
	if(mainIniFlag==null){
		var iT = 0;
		var i = 0;
		var winCount = 0;
		var winID = 0;
		var winWidth = 0;
		var winHeight = 0;
		var objScale = [];
		var objLoaded = [];
		var winMax = 0;
		var backImg =[];		
		var objZoom = [];
		var srcObj = [];
		var backCol = [];
		var texturePath = [];
		var envPath = [];
		var envVal = [];
		var infoText = '';
		var fpsON = '';
		var thisID;
		var thisWin = [];
		var thisCount = '';
		var thisHalfWidth = 0;
		var thisHalfHeight = 0;
		var rollSpeedX = [];
		var rollSpeedY = [];
		var rollMode = [];
		var moverID = 0;
		var mouseOverMode = 0;
		var mouseOverOn = [];
		var mouse = [];
		var mX = 0;
		var mY = 0;
		var light = [];
		var container;
		var stats;
		var objAmbient = [];
		var objCol = [];
		var shine = [];
		var light0 = [], light1 = [], light2 = [], light3 = [], light4 = [];
		var lightRotate =[];
		var lightRotate =[];
		var l1 = [], l2 = [], l3 = [], l4 = [];
		var renderer = [];
		var bgScene = [];
		var bgCam = [];		
		var camera = [];
		var scene = [];
		var obj = [];
		var geo = [];
		var shadowOn = [];
		var targetRotationX = [];
		var targetRotationY = [];
		var targetRotationOnMouseDownX = 0;
		var targetRotationOnMouseDownY = 0;
		var mouseX = 0;
		var mouseY = 0;
		var mouseOnMouseDownX = 0;
		var mouseOnMouseDownY = 0;
		var time = 0;
		var can3D = '';
		var objData;
		var strJSON = '';
		var m = [];
		var animOn = 0;
		var debugOn = 1;
		var loadingText = [];
		var objCenterStore = [];
		var frameStag = [];
		var objCenterIn = {
			x1 : 0,
			x2 : 0,
			y1 : 0,
			y2 : 0,
			z1 : 0,
			z2 : 0
		};
		var lang = '';
		var floorOn = [];
		var floorY = [];
		var newSizeOn = false;
		var newSizeH=0;
		var newSizeV=0;
		m['de_DE'] = 'Auf diesem Gerät ist kein WebGL aktiviert. 3D-Grafik wird im langsamen Canvas-Modus gezeigt.';
		m['en_EN'] = 'On this device is WebGL not activ. 3D-Graphic is switching to slow Canvas-Mode!';
		init_loader();
		var DetectWebGL = Detector.webgl;
		for (i = 1; i < 50; i++) {
			can3D = '3D_' + i;
			objWin = document.getElementById(can3D);
			if (objWin != null) {
				strJSON = objWin.getAttribute('data-parameter');
				strJSON = strJSON.replace(/'/g, '"');
				objJSON = jQuery.parseJSON(strJSON);
				setWin(objWin, objJSON);
			} else {
				break;
			}
		}
		var mainIniFlag = 'ok';  console.log('Canvasio3D - V1.1.8'); loop();
	}
	function setWin(winID, winDat) {
		winCount = parseInt(winDat['winCount']);
		backImg[winCount] = winDat['backimg'].toString();		
		objLoaded[winCount] = false;
		winMax = winCount + 1;
		winWidth = parseInt(winDat['width']);
		winHeight = parseInt(winDat['height']);
		objZoom[winCount] = parseInt(winDat['zoom']);
		objScale[winCount] = Number(winDat['objscale']);
		backCol[winCount] =  winDat['backcol'].toString();
		texturePath[winCount] = winDat['texturpath'].toString();
		envPath[winCount] = winDat['reflection'].toString();
		envVal[winCount] = parseInt(winDat['refval']);
		lightRotate[winCount] = winDat['lightrotate'].toString();
		shine[winCount] = parseInt(winDat['shine']);
		objAmbient[winCount] = Number(winDat['ambient']);
		objCol[winCount] = Number(winDat['objcol']);
		infoText = winDat['text'].toString();
		fpsON = winDat['fps'].toLowerCase();
		rollSpeedX[winCount] = parseInt(winDat['rollspeedv']) / 1000;
		rollSpeedY[winCount] = parseInt(winDat['rollspeedh']) / 1000;
		if(winDat['rollspeedv'] == 0)rollSpeedX[winCount] = parseInt(winDat['rollspeedx']) / 1000;
		if(winDat['rollspeedh'] == 0)rollSpeedY[winCount] = parseInt(winDat['rollspeedy']) / 1000;
		rollMode[winCount] = winDat['rollmode'].toLowerCase();
		mouse[winCount] = winDat['mouse'].toLowerCase();
		light[winCount] = parseInt(winDat['lightset']);
		thisWin[winID.id] = winCount;
		_picUrl = winDat['_picUrl'].toString();
		_uploadUrl = winDat['_uploadUrl'].toString();
		srcObj[winCount] = winDat['objpath'];
		debugOn = parseInt(winDat['debug']); debugOn = 1;
		targetRotationX[winCount] = 0;
		targetRotationY[winCount] = 0;
		loadingText[winCount] = winDat['loadingtext'].toString();
		floorOn[winCount] = winDat['floor'].toString();
		shadowOn[winCount] = winDat['objshadow'];
		floorY[winCount] =  parseInt(winDat['floorheight']);
		if(shadowOn[winCount] == 'On' || shadowOn[winCount] == 'ON') shadowOn[winCount] = 'on';
		if(floorOn[winCount] =='On' || floorOn[winCount] == 'ON') floorOn[winCount] = 'on';
		if(backImg[winCount] == '...')backImg[winCount]='';
		objCenterStore[winCount] = objCenterIn;
		if (winDat['lang'] != 'de_DE')
			winDat['lang'] = 'en_EN';
		if (!DetectWebGL && winCount == 1)
			alert(m[winDat['lang']]);
		if (winWidth > 940)
			winWidth = 940;
		if (winHeight > 940)
			winHeight = 940;
		frameStag[winCount] = {width:0,height:0};
		frameStag[winCount].width = winWidth;
		frameStag[winCount].height = winHeight;
		if(envVal[winCount]==null || envVal[winCount] < 1 || envVal[winCount] > 10) {
			envVal[winCount] = 0.5;
		}else{
			envVal[winCount] = envVal[winCount] / 10;
		}
		camera[winCount] = new THREE.PerspectiveCamera(objZoom[winCount], winWidth / winHeight, 1, 5000);
		camera[winCount].position.z = 100;
		scene[winCount] = new THREE.Scene();
		if (!DetectWebGL) {
			renderer[winCount] = new  THREE.CanvasRenderer();
		} else {
			if(shadowOn[winCount] == 'on'){
				renderer[winCount] = new THREE.WebGLRenderer({antialias: true});
				renderer[winCount].shadowMapEnabled = true;
				renderer[winCount].shadowMapCullFace = THREE.CullFaceBack;
				light3[winCount] = new THREE.DirectionalLight( 0xf7f7f7, 0.25 );
				light3[winCount].position.set(7,14,14 );
				light3[winCount].position.multiplyScalar( 8);
				light3[winCount].shadowMapWidth = 1024;
				light3[winCount].shadowMapHeight = 1024;
				var d = 44;
				light3[winCount].shadowCameraLeft = -d;
				light3[winCount].shadowCameraRight = d;
				light3[winCount].shadowCameraTop = d;
				light3[winCount].shadowCameraBottom = -d;
				light3[winCount].shadowCameraFar = 440;
				light3[winCount].shadowDarkness = 0.30;
				light3[winCount].castShadow = true;
				scene[winCount].add( light3[winCount] );
			}else{
				renderer[winCount] = new  THREE.WebGLRenderer( { antialias: true } );
				renderer[winCount].autoClear = true;
			}
		}
		if(backImg[winCount]!=''){
			renderer[winCount].setClearColor(backCol[winCount]);
			var backgroundTexture = THREE.ImageUtils.loadTexture( backImg[winCount] ); backgroundTexture.needsUpdate = true;
			var bgImg = new THREE.Mesh(
				new THREE.PlaneGeometry(2, 2, 0),
				new THREE.MeshBasicMaterial({map: backgroundTexture})		
			);
			bgImg.material.depthTest = false;
			bgImg.material.depthWrite = false;
			bgScene[winCount] = new THREE.Scene();
			bgCam[winCount] = new THREE.Camera();
			bgScene[winCount].add(bgCam);
			bgScene[winCount].add(bgImg);
		}else{
			renderer[winCount].setClearColor(backCol[winCount]);
		}
		var tw  = '3D_' + (winCount  + 1);
		var idw  = document.getElementById(tw).parentNode.parentNode;
		var twWin = document.getElementById(tw);
		resizeCanvas(winCount);
		winID.appendChild(renderer[winCount].domElement);
		var infoLoading = document.createElement('p');
		infoLoading.style.color ='#777777';
		infoLoading.style.position = 'absolute';
		infoLoading.style.marginTop =  - 28 + 'px';
		infoLoading.style.width = twWin.offsetWidth + 'px';
		infoLoading.style.textAlign = 'center';
		infoLoading.innerHTML = loadingText[winCount];
		winID.appendChild(infoLoading);
		renderer[winCount].render( scene[winCount], camera[winCount] );
		if (infoText != '') {
			var info = document.createElement('p');
			info.style.position = 'absolute';
			info.style.marginTop =  - winHeight + 'px';
			info.style.width = winWidth + 'px';
			info.style.textAlign = 'center';
			info.innerHTML = infoText;
			winID.appendChild(info);
		}
		if(floorOn[winCount] != 'off'){
			var pg = new THREE.PlaneGeometry( 10000, 10000);
			var ma = new THREE.MeshPhongMaterial( { ambient: 0xFFFFFF, color: 0xF6F6F6, specular: 0xFFFFFF } );
			obj[winCount] = new THREE.Mesh( pg, ma );
			obj[winCount].rotation.x = -Math.PI/2;
			obj[winCount].position.y = parseInt(-floorY[winCount]);
			obj[winCount].receiveShadow = true;
			scene[winCount].add( obj[winCount] );
		}
		switch (srcObj[winCount]){
			case 'octa':
				easyObj(winCount, 'octa', '', objScale[winCount], objCol[winCount], texturePath[winCount], envPath[winCount], envVal[winCount], objAmbient[winCount], shine[winCount]);
			break;		
			case 'torus':
				easyObj(winCount, 'torus', '', objScale[winCount], objCol[winCount], texturePath[winCount], envPath[winCount],envVal[winCount], objAmbient[winCount], shine[winCount]);
			break;		
			case 'box':
				easyObj(winCount, 'box', '', objScale[winCount], objCol[winCount], texturePath[winCount], envPath[winCount], envVal[winCount], objAmbient[winCount], shine[winCount]);
			break;
			case 'panel': 
				easyObj(winCount, 'panel', '', objScale[winCount], objCol[winCount], texturePath[winCount], envPath[winCount], envVal[winCount], objAmbient[winCount], shine[winCount]);
			break;
			case 'ball':
				easyObj(winCount, 'ball', '', objScale[winCount], objCol[winCount], texturePath[winCount],envPath[winCount], envVal[winCount], objAmbient[winCount], shine[winCount]);
			break;
			case 'Octa':
				easyObj(winCount, 'octa', '', objScale[winCount], objCol[winCount], texturePath[winCount], envPath[winCount], envVal[winCount], objAmbient[winCount], shine[winCount]);
			break;			
			case 'Torus':
				easyObj(winCount, 'torus', '', objScale[winCount], objCol[winCount], texturePath[winCount],envPath[winCount], envVal[winCount], objAmbient[winCount], shine[winCount]);
			break;				
			case 'Box':
				easyObj(winCount, 'box', '', objScale[winCount], objCol[winCount], texturePath[winCount], envPath[winCount], envVal[winCount], objAmbient[winCount], shine[winCount]);
			break;
			case 'Panel': 
				easyObj(winCount, 'panel', '', objScale[winCount], objCol[winCount], texturePath[winCount],envPath[winCount], envVal[winCount], objAmbient[winCount], shine[winCount]);
			break;
			case 'Ball':
				easyObj(winCount, 'ball', '', objScale[winCount], objCol[winCount], texturePath[winCount], envPath[winCount], envVal[winCount], objAmbient[winCount], shine[winCount]);
			break;			
			default:
				if(srcObj[winCount]==null)srcObj[winCount]='';
				var fileType = srcObj[winCount].split('.').pop().toLowerCase(); envVal[winCount] = 0.3;
				switch (fileType) {
				case "obj":
					loadOBJ(winCount, srcObj[winCount], '', objScale[winCount], objCol[winCount], texturePath[winCount], envPath[winCount],envVal[winCount], objAmbient[winCount], shine[winCount]);
					break;
				case "stl":
					loadSTL(winCount, srcObj[winCount], '', objScale[winCount], objCol[winCount], texturePath[winCount],envPath[winCount],envVal[winCount], objAmbient[winCount], shine[winCount]);
					break;
				case "js":
					loadJS(winCount, srcObj[winCount], '', objScale[winCount], objCol[winCount], texturePath[winCount], envPath[winCount],envVal[winCount], objAmbient[winCount], shine[winCount]);
					break;
				case "dae":
					loadDAE(winCount, srcObj[winCount], '', objScale[winCount], objCol[winCount], texturePath[winCount], envPath[winCount],envVal[winCount], objAmbient[winCount], shine[winCount]);
					break;
				default:
					objToScene(winCount, '', '', '', '', '', '', '', '', '', 'error');
				}
		}
		light0[winCount] = new THREE.AmbientLight( 0x404040 ); // soft white light scene.add( light );
		scene[winCount].add(light0[winCount]);
		switch (light[winCount]) {
		case 1:
			light1[winCount] = new THREE.DirectionalLight(0xffffff, 1);
			light1[winCount].position.set(0, 1, 1).normalize();
			scene[winCount].add(light1[winCount]);
			break;
		case 2:
			light1[winCount] = new THREE.DirectionalLight(0xffffff, 1);
			light1[winCount].color.setHSL(0.1, 1, 0.95);
			light1[winCount].position.set(8, 4, 20);
			scene[winCount].add(light1[winCount]);
			light2[winCount] = new THREE.PointLight( 0xffffff, 0.4 );
			scene[winCount].add( light2[winCount] );			
			break;
		case 3:
			light1[winCount] = new THREE.SpotLight(0xffffff,0.7);
			light1[winCount].position.set( - 30, 70, 85);
			scene[winCount].add(light1[winCount]);
			light2[winCount] = new THREE.PointLight( 0xffffff,0.6);
			light2[winCount].position.set(0, 10,80);
			scene[winCount].add( light2[winCount] );	
			break;
		case 4:
			light1[winCount] = new THREE.SpotLight(0xffffff, 0.8);
			light1[winCount].position.set( - 30, 70, 85);
			scene[winCount].add(light1[winCount]);
			light2[winCount] = new THREE.DirectionalLight(0xffffff, 0.8);
			light2[winCount].color.setHSL(0.1, 1, 0.95);
			light2[winCount].position.set(8, 4, 20);
			scene[winCount].add(light2[winCount]);
			break;
		case 5:
			light1[winCount] = new THREE.DirectionalLight( 0xffffff, 0.5);
			light1[winCount].position.set( -5, 7, 10 );
			scene[winCount].add( light1[winCount] );
			light2[winCount] = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
			light2[winCount].color.setHSL( 0.7,  0.1, 0.8);
			light2[winCount].groundColor.setHSL(0.5,  0.1, 0.7);
			light2[winCount].position.y = 20;
			scene[winCount].add( light2[winCount] );
			break;
		case 6:
			scene[winCount].fog = new THREE.Fog( 0xffffff, 1000, 10000 );
			renderer[winCount].setClearColor( scene[winCount].fog.color, 0.8 );
			renderer[winCount].gammaInput = true;
			renderer[winCount].gammaOutput = true;
			renderer[winCount].physicallyBasedShading = true;
			light1[winCount] = new THREE.DirectionalLight( 0xffffff, 1.2 );
			light1[winCount].position.set( 10, 10, 10 );
			scene[winCount].add( light1[winCount] );
			light2[winCount] = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.4 );
			light2[winCount].color.setHSL( 0.7,  0.1, 0.8);
			light2[winCount].position.y = 20;
			scene[winCount].add( light2[winCount] );
			break;
		case 7:
			light1[winCount] = new THREE.SpotLight(0xffffff,0.8);
			light1[winCount].position.set(0, 50, 100);
			scene[winCount].add(light1[winCount]);
			light2[winCount] = new THREE.DirectionalLight(0xffffff, 0.7);
			light2[winCount].color.setHSL(0.1, 0.1, 0.95);
			light2[winCount].position.set(-3, 10, 20);
			scene[winCount].add(light2[winCount] );
			light3[winCount] = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
			light3[winCount].color.setHSL( 0.7,  0.1, 0.8);
			light3[winCount].position.y = 50;
			scene[winCount].add( light3[winCount] );			
			break;
		case 8:
			light1[winCount] = new THREE.HemisphereLight( 0xffffff, 0xfafafa, 0.9 );
			light1[winCount].color.setHSL( 0.2, 0.1, 0.6 );
			light1[winCount].position.set( 0, 50, 0 );
			scene[winCount].add( light1[winCount] );
			light2[winCount] = new THREE.DirectionalLight( 0xffffff, 1.0 );
			light2[winCount].color.setHSL( 0.1, 0.1, 0.95 );
			light2[winCount].position.set( 2, 1.75, 10 );
			scene[winCount].add(light2[winCount]);
			light3[winCount] = new THREE.SpotLight(0xffffff,0.7);
			light3[winCount].position.set(0, 50, 100);
			scene[winCount].add(light3[winCount]);
			break;
		case 9:
			light1[winCount] = new THREE.HemisphereLight( 0xf7f7f7, 0xfadaee, 0.7 );
			light1[winCount].color.setHSL( 0.2, 0.1, 0.6 );
			light1[winCount].position.set( 0, 50, 0 );
			scene[winCount].add( light1[winCount] );
			light2[winCount] = new THREE.DirectionalLight( 0xf3f3ee, 0.8 );
			light2[winCount].color.setHSL( 0.3, 0.1, 1 );
			light2[winCount].position.set( 2, 1.75, 10 );
			scene[winCount].add(light2[winCount]);
			light3[winCount] = new THREE.SpotLight(0xff77fa,0.5);
			light3[winCount].position.set(0, 50, 100);
			scene[winCount].add(light3[winCount]);
			break;
		case 10:
			light1[winCount] = new THREE.PointLight( 0xff0040, 8, 50 );
			light1[winCount].position.set( -20, 50, 25 );
			scene[winCount].add( light1[winCount] );
			light2[winCount] = new THREE.PointLight( 0x0040ff, 12, 50 );
			light2[winCount].position.set( 2, 1.75, 20 );
			scene[winCount].add(light2[winCount]);
			light3[winCount] = new THREE.PointLight( 0x80ff80, 12, 50 );
			light3[winCount].position.set(0, 50, 80);
			scene[winCount].add(light3[winCount]);
			light4[winCount]  = new THREE.PointLight( 0xffaa00, 12, 50 );
			light4[winCount].position.set(0, 20, 50);
			scene[winCount].add(light4[winCount]);
			break;
		default:
			light1[winCount] = new THREE.DirectionalLight(0xffffff, 2);
			light1[winCount].position.set(0, 1, 1).normalize();
			scene[winCount].add(light1[winCount]);
		}
		if (mouse[winCount] == 'on') {
			winID.addEventListener('mousedown', onDocumentMouseDown, false);
			winID.addEventListener('DOMMouseScroll', onDocumentMouseWheel, false);
			winID.onmousewheel = onDocumentMouseWheel;
			rollMode[winCount] = 'off';
			setCursorByID(winID.id, 'move');
			winID.addEventListener( 'touchstart', touchHandler, true );
			winID.addEventListener( 'touchmove', touchHandler, true );			
		}
		if (rollMode[winCount] == 'mouseover') {
			winID.addEventListener('mouseover', onDocumentMouseOver, false);
		}
		window.addEventListener( 'resize', onWindowResize, false ); 
	}
	function onProgress(oEvent){
		 if (oEvent.lengthComputable) {
			var percentComplete = parseInt((oEvent.loaded / oEvent.total*100));		
			var t = '3D_' + (this.winCount + 1);
			var id = document.getElementById(t).childNodes[1];
			var twWin = document.getElementById(t);
			id.style.width = twWin.offsetWidth + 'px';			
			id.innerHTML =loadingText[this.winCount] + ' ' + percentComplete + '%';
		  }	
	}
	function onWindowResize(){newSizeOn = true;}
	function  resizeCanvas(iW){
		var tmp = '3D_' + (iW+1);
		var frame = document.getElementById(tmp).parentNode;
		var idw = frame.parentNode.parentNode;
		var sW = scaleSize( idw.offsetWidth,  idw.offsetHeight,   frameStag[iW].width, frameStag[iW].height); 
		renderer[iW].setSize(sW[0],sW[1] );
		frame.style.width = sW[0] + 'px';
		frame.style.height = sW[1] + 'px';
	}
	function scaleSize(maxW, maxH, currW, currH){
		var ratio = currH / currW;
		if(currW >= maxW && ratio <= 1){
			currW = maxW;
			currH = currW * ratio;
		} else if(currH >= maxH){
			currH = maxH;
			currW = currH / ratio;
		}
		return [currW, currH];
	}
	function onDocumentMouseWheel(event) {
		event.preventDefault();
		thisID = this;
		thisCount = thisWin[thisID.id];
		thisHalfWidth = document.getElementById(thisID.id).offsetWidth - 2;
		thisHalfHeight = document.getElementById(thisID.id).offsetHeight - 2;
		var delta = 0;
		if (!event)
			event = window.event;
		if (event.wheelDelta) {
			delta = event.wheelDelta / 60;
			camera[thisCount].position.z = camera[thisCount].position.z -= delta * 4;
		} else if (event.detail) {
			delta =  - event.detail / 2;
			camera[thisCount].position.z = camera[thisCount].position.z -= delta * 4;
		}
	}
	function  touchHandler(event) {
		var touches = event.changedTouches, first = touches[0], type = "";
		thisID = this;
		thisCount = thisWin[thisID.id];
		thisHalfWidth = document.getElementById(thisID.id).offsetWidth - 2;
		thisHalfHeight = document.getElementById(thisID.id).offsetHeight - 2;
		switch(event.type) {
			case "touchstart": type = "mousedown"; break;
			case "touchmove":  type="mousemove"; break;        
			case "touchend":   type="mouseup"; break;
			default: return;
		}
		if(type == 'mousedown'){
			mouseOnMouseDownX  = first.screenX -( thisHalfWidth / 2);
			mouseOnMouseDownY  = first.screenY - (thisHalfHeight / 2);
				
			targetRotationOnMouseDownX = targetRotationX[thisCount];
			targetRotationOnMouseDownY = targetRotationY[thisCount];
		}
		if(type == 'mousemove'){
			mouseX = first.screenX - (thisHalfWidth / 2);
			targetRotationX[thisCount] = targetRotationOnMouseDownX + (mouseX - mouseOnMouseDownX) * 0.02;
			mouseY = first.screenY - (thisHalfHeight / 2);
			targetRotationY[thisCount] = targetRotationOnMouseDownY + (mouseY - mouseOnMouseDownY) * 0.02;	
		}
		if(type == 'mouseup'){
			mouseOverMode = 0;
		}
		event.preventDefault();
	}
	function onDocumentMouseDown(event) {
		event.preventDefault();
		thisID = this;
		thisCount = thisWin[thisID.id];
		thisHalfWidth = document.getElementById(thisID.id).offsetWidth - 2;
		thisHalfHeight = document.getElementById(thisID.id).offsetHeight - 2;
		document.addEventListener('mousemove', onDocumentMouseMove, false);
		document.addEventListener('mouseup', onDocumentMouseUp, false);
		document.addEventListener('mouseout', onDocumentMouseOut, false);
		mouseOnMouseDownX = event.clientX - (thisHalfWidth / 2);
		mouseOnMouseDownY = event.clientY - (thisHalfHeight / 2);
		targetRotationOnMouseDownX = targetRotationX[thisCount];
		targetRotationOnMouseDownY = targetRotationY[thisCount];
	}
	function setCursorByID(id, cursorStyle) {
		var elem;
		if (document.getElementById &&
			(elem = document.getElementById(id))) {
			if (elem.style)
				elem.style.cursor = cursorStyle;
		}
	}
	function onDocumentMouseOver(event) {
		thisID = this;
		thisCount = thisWin[thisID.id];
		mouseOverMode = 1;
		mouseOverOn[thisCount] = 1;
		this.addEventListener('mouseout', onDocumentMouseOut, false);
	}
	function onDocumentMouseMove(event) {
		mouseX = event.clientX - (thisHalfWidth / 2);
		targetRotationX[thisCount] = targetRotationOnMouseDownX + (mouseX - mouseOnMouseDownX) * 0.02;
		mouseY = event.clientY - (thisHalfHeight / 2);
		targetRotationY[thisCount] = targetRotationOnMouseDownY + (mouseY - mouseOnMouseDownY) * 0.02;
	}
	function onDocumentMouseUp(event) {
		document.removeEventListener('mousemove', onDocumentMouseMove, false);
		document.removeEventListener('mouseup', onDocumentMouseUp, false);
		document.removeEventListener('mouseout', onDocumentMouseOut, false);
	}
	function onDocumentMouseOut(event) {
		mouseOverMode = 0;
	}
	function loop() {
		for (iT = 0; iT < winMax; iT++) {
			if (objLoaded[iT] == false) continue;
			if (mouseOverOn[iT] == 1 || rollMode[iT] == 'auto') {
				obj[iT].rotation.x += rollSpeedX[iT];
				obj[iT].rotation.y += rollSpeedY[iT];
				if (mouseOverMode == 0)
					mouseOverOn[iT] = 0;
			}
			if (mouse[iT] == 'on') {
				obj[iT].rotation.x += (targetRotationY[iT] - obj[iT].rotation.x) * 0.05;
				obj[iT].rotation.y += (targetRotationX[iT] - obj[iT].rotation.y) * 0.05;
			}
			if(newSizeOn==true) resizeCanvas(iT);
			if(backImg[iT]!=''){
				renderer[iT].autoClear = false; renderer[iT].clear();	
				renderer[iT].render(bgScene[iT], bgCam[iT]);
			}
			if(lightRotate[iT]=='on'){
				var time = Date.now() * 0.0005;
				if(light1[iT]!=undefined){
					light1[iT].position.x = Math.sin( time * 0.7 ) * 30;
					light1[iT].position.y = Math.cos( time * 0.5 ) * 40;
					light1[iT].position.z = Math.cos( time * 0.3 ) * 30;
				}
				if(light2[iT]!=undefined){
					light2[iT].position.x = Math.cos( time * 0.3 ) * 30;
					light2[iT].position.y = Math.sin( time * 0.5 ) * 40;
					light2[iT].position.z = Math.sin( time * 0.7 ) * 30;
				}
				if(light3[iT]!=undefined){
					light3[iT].position.x = Math.sin( time * 0.7 ) * 30;
					light3[iT].position.y = Math.cos( time * 0.3 ) * 40;
					light3[iT].position.z = Math.sin( time * 0.5 ) * 30;
				}
				if(light4[iT]!=undefined){
					light4[iT].position.x = Math.sin( time * 0.3 ) * 30;
					light4[iT].position.y = Math.cos( time * 0.7 ) * 40;
					light4[iT].position.z = Math.sin( time * 0.5 ) * 30;
				}				
			}
			renderer[iT].render(scene[iT], camera[iT]);
		}
		newSizeOn = false;
		requestAnimationFrame(loop);
	}
	function debug(_t) { if (debugOn == 1) console.log(_t);}
	function easyObj(_winCount, _geo, _materials, _scale, _objCol, _texPath, _envPath, _envVal, _objAmbient, _shine) {
		var specular = 0x333333,
		shading = THREE.SmoothShading,
		material;
		var http = new XMLHttpRequest();
		http.open('HEAD', _texPath, false);
		http.send();
		if (http.status === 404) {
			_texPath = '';
		}
		switch (_geo) {
			case 'octa':
				var _geometry = new THREE.OctahedronGeometry( 78 );
			break;		
			case 'torus':
				var _geometry = new THREE.TorusGeometry( 78, 16, 8 );
			break;		
			case 'box':
				var _geometry = new THREE.CubeGeometry( 100, 100, 100 );
			break;
			case 'panel':
				var quality = 8, step = 512 / quality;
				var _geometry = new THREE.PlaneGeometry( 128, 128, quality - 1, quality - 1 );
			break;
			case 'ball':
				var _geometry = new THREE.SphereGeometry( 78, 32, 32 );
			break;
		}
		var objTexture;
		var path = _picUrl +'/canvasio3D/inc/env/' +  _envPath + '/' ; 
		var format = '.jpg';
		var urls = [
				path + 'px' + format, path + 'nx' + format,
				path + 'py' + format, path + 'ny' + format,
				path + 'pz' + format, path + 'nz' + format
			];
		var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
		reflectionCube.format = THREE.RGBFormat;
		var refractionCube = new THREE.Texture( reflectionCube.image, new THREE.CubeRefractionMapping() );
		refractionCube.format = THREE.RGBFormat;
		if(_texPath !=''){
			objTexture = THREE.ImageUtils.loadTexture(_texPath);
			objTexture.needsUpdate = true;
			objTexture.anisotropy = 4;
		}
		if  (_objCol){
			var cubeMaterial1 = new THREE.MeshLambertMaterial( {map : objTexture, color: _objCol, ambient: 0x993300, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: _envVal } );
			var cubeMaterial2 = new THREE.MeshLambertMaterial( {map : objTexture, color: _objCol, ambient: 0xaaaaaa, envMap: reflectionCube } );							
			var cubeMaterial3 = new THREE.MeshLambertMaterial( {map : objTexture, color: _objCol, ambient: 0x996600, envMap: refractionCube, refractionRatio: 0.95 } );
		}else{
			var cubeMaterial1 = new THREE.MeshLambertMaterial( {map : objTexture, color: 0xff6600, ambient: 0x993300, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: _envVal } );
			var cubeMaterial2 = new THREE.MeshLambertMaterial( {map : objTexture, color: 0xffffff, ambient: 0xaaaaaa, envMap: reflectionCube } );
			var cubeMaterial3 = new THREE.MeshLambertMaterial( {map : objTexture, color: 0xffee00, ambient: 0x996600, envMap: refractionCube, refractionRatio: 0.95 } );			
		}
		if(_geo == 'panel') material.side = THREE.DoubleSide;
		obj[_winCount] = new  THREE.Mesh(_geometry, cubeMaterial1);
		obj[_winCount].scale.multiplyScalar(_scale);
		obj[_winCount].position.set(0, 0, 0);
		if(shadowOn[_winCount] == 'on') obj[_winCount].castShadow = true;
		scene[_winCount].add(obj[_winCount]);
		var t = '3D_' + (_winCount + 1);
		var id = document.getElementById(t).childNodes[1];
		id.innerHTML = '';
		objLoaded[_winCount] = true;
	}
	function objToScene(_winCount, _geometry, _materials, _scale, _objCol, _texPath, _envPath, _envVal, _objAmbient, _shine, _typ) {
		var	shading = THREE.SmoothShading, material,tempMap;
		var col = new THREE.Color(_objCol);
		var amb = new THREE.Color(_objAmbient);
		var http = new XMLHttpRequest();
		http.open('HEAD', _texPath, false);
		http.send();
		if (http.status === 404) {
			_texPath = '';
		}
		if(_objCol==0)_objCol='';
		if(_envPath != ''){
			var path = _picUrl +'/canvasio3D/inc/env/' +  _envPath + '/' ; 
			var format = '.jpg';
			var urls = [
					path + 'px' + format, path + 'nx' + format,
					path + 'py' + format, path + 'ny' + format,
					path + 'pz' + format, path + 'nz' + format
				];
			var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
			reflectionCube.format = THREE.RGBFormat;
			var refractionCube = new THREE.Texture( reflectionCube.image, new THREE.CubeRefractionMapping() );
			refractionCube.format = THREE.RGBFormat;
		}else{
			var reflectionCube='';
			var refractionCube ='';
		}
		switch (_typ) {
		case 'stl':
			if(_shine == 0)_shine = 40;
			if(_objAmbient == 0) _objAmbient = 0x888888;
			var specular = 0x333333,
			_material = new THREE.MeshLambertMaterial({
					color : col,
					ambient : _objAmbient,
					specular : specular,
					shininess : _shine,
					shading : shading,
					envMap: reflectionCube,
					combine: THREE.MixOperation, reflectivity: _envVal
				});
			centerGeometry(_geometry);
			obj[_winCount] = new THREE.Mesh(_geometry, _material);
			obj[_winCount].scale.set(_scale, _scale, _scale);
			obj[_winCount].position.set(0, 0, 0);
			if(shadowOn[_winCount] == 'on'){
				obj[_winCount].castShadow = true;
				obj[_winCount].receiveShadow = true;
			}
			scene[_winCount].add(obj[_winCount]);
			break;
		case 'obj':
			var centerPos = new THREE.Vector3();
			centerPos.x =  - ((objCenterStore[_winCount].x1 + objCenterStore[_winCount].x2) / 2);
			centerPos.y =  - ((objCenterStore[_winCount].y1 + objCenterStore[_winCount].y2) / 2);
			centerPos.z =  - ((objCenterStore[_winCount].z1 + objCenterStore[_winCount].z2) / 2);
			if (_texPath != '') {
				var objTexture = THREE.ImageUtils.loadTexture(_texPath);
				objTexture.needsUpdate = true;
				objTexture.anisotropy = 4;
			}
			_geometry.traverse(function (child) {
				if (child instanceof THREE.Mesh) {
					temp = child.material;				
					if(temp==null)return;
					if(shadowOn[_winCount] == 'on'){
						child.castShadow = true;
						child.receiveShadow = true;
					}
					temp.transparent =true; debug
					if(_objCol != 0)temp.color = col;
					if(_objAmbient != 0)temp.ambient = amb;
					if(_texPath != '')temp.map = objTexture;
					if(_shine != 0)temp.shininess = _shine;
					temp.envMap = reflectionCube;
					temp.combine = THREE.MixOperation;
					temp.reflectivity =_envVal;
					child.position.set(centerPos.x, centerPos.y, centerPos.z);
				}else{return;};
			});
			obj[_winCount] = _geometry;	
			obj[_winCount].scale.set(_scale, _scale, _scale);
			scene[_winCount].add(obj[_winCount]);
			break;
		case 'js':
			centerGeometry(_geometry); 
			if (_texPath != '') {
				var objTexture = THREE.ImageUtils.loadTexture(_texPath);
				objTexture.needsUpdate = true;
				objTexture.anisotropy = 4;
			}
			material = new THREE.MeshLambertMaterial( _materials[0] );
			obj[_winCount] =  THREE.SceneUtils.createMultiMaterialObject(_geometry, _materials);
			obj[_winCount].children.forEach(function(e) {
				var mat = new THREE.MeshLambertMaterial({
					transparent : true,
					alphaTest : 0.75,
					map : e.material.map,
					color : e.material.color,
					ambient :  e.material.ambient,
					specular :  e.material.specular,
					shininess :  e.material.shine,
					shading :  e.material.shading,
					envMap: reflectionCube,
					combine: THREE.MixOperation, reflectivity: _envVal	
				});
				if(_objCol != 0)mat.color = col;
				if(_objAmbient != 0)mat.ambient = amb;
				if(_texPath != '')mat.map = objTexture;
				if(_shine != 0)mat.shininess = _shine;
				if(shadowOn[_winCount] == 'on'){
					e.castShadow = true;
					e.receiveShadow = true;
				}
				e.material = mat;
			});
			obj[_winCount].scale.multiplyScalar(_scale);
			obj[_winCount].position.set(0, 0, 0); //
			scene[_winCount].add(obj[_winCount]);
			break;
		case 'dae':
			_geometry.scene.traverse(function (child) {
				if (child instanceof THREE.Mesh && shadowOn[_winCount] == 'on' ) {
					child.castShadow = true;
					child.receiveShadow = true;
				}					
			});
			obj[_winCount] = _geometry.scene;
			obj[_winCount].scale.set(_scale, _scale, _scale);
			scene[_winCount].add(obj[_winCount]);
			break;
		case 'error':
			if (_typeface_js && _typeface_js.loadFace)
				_typeface_js.loadFace({
					"glyphs" : {
						"ο" : {
							"x_min" : 0,
							"x_max" : 712,
							"ha" : 815,
							"o" : "m 356 -25 q 96 88 192 -25 q 0 368 0 201 q 92 642 0 533 q 356 761 192 761 q 617 644 517 761 q 712 368 712 533 q 619 91 712 201 q 356 -25 520 -25 m 356 85 q 527 175 465 85 q 583 369 583 255 q 528 562 583 484 q 356 651 466 651 q 189 560 250 651 q 135 369 135 481 q 187 177 135 257 q 356 85 250 85 "
						},
						"S" : {
							"x_min" : 0,
							"x_max" : 788,
							"ha" : 890,
							"o" : "m 788 291 q 662 54 788 144 q 397 -26 550 -26 q 116 68 226 -26 q 0 337 0 168 l 131 337 q 200 152 131 220 q 384 85 269 85 q 557 129 479 85 q 650 270 650 183 q 490 429 650 379 q 194 513 341 470 q 33 739 33 584 q 142 964 33 881 q 388 1041 242 1041 q 644 957 543 1041 q 756 716 756 867 l 625 716 q 561 874 625 816 q 395 933 497 933 q 243 891 309 933 q 164 759 164 841 q 325 609 164 656 q 625 526 475 568 q 788 291 788 454 "
						},
						"¦" : {
							"x_min" : 343,
							"x_max" : 449,
							"ha" : 792,
							"o" : "m 449 462 l 343 462 l 343 986 l 449 986 l 449 462 m 449 -242 l 343 -242 l 343 280 l 449 280 l 449 -242 "
						},
						"/" : {
							"x_min" : 183.25,
							"x_max" : 608.328125,
							"ha" : 792,
							"o" : "m 608 1041 l 266 -129 l 183 -129 l 520 1041 l 608 1041 "
						},
						"Τ" : {
							"x_min" :  - 0.4375,
							"x_max" : 777.453125,
							"ha" : 839,
							"o" : "m 777 893 l 458 893 l 458 0 l 319 0 l 319 892 l 0 892 l 0 1013 l 777 1013 l 777 893 "
						},
						"y" : {
							"x_min" : 0,
							"x_max" : 684.78125,
							"ha" : 771,
							"o" : "m 684 738 l 388 -83 q 311 -216 356 -167 q 173 -279 252 -279 q 97 -266 133 -279 l 97 -149 q 132 -155 109 -151 q 168 -160 155 -160 q 240 -114 213 -160 q 274 -26 248 -98 l 0 738 l 137 737 l 341 139 l 548 737 l 684 738 "
						},
						"Π" : {
							"x_min" : 0,
							"x_max" : 803,
							"ha" : 917,
							"o" : "m 803 0 l 667 0 l 667 886 l 140 886 l 140 0 l 0 0 l 0 1012 l 803 1012 l 803 0 "
						},
						"ΐ" : {
							"x_min" :  - 111,
							"x_max" : 339,
							"ha" : 361,
							"o" : "m 339 800 l 229 800 l 229 925 l 339 925 l 339 800 m -1 800 l -111 800 l -111 925 l -1 925 l -1 800 m 284 3 q 233 -10 258 -5 q 182 -15 207 -15 q 85 26 119 -15 q 42 200 42 79 l 42 737 l 167 737 l 168 215 q 172 141 168 157 q 226 101 183 101 q 248 103 239 101 q 284 112 257 104 l 284 3 m 302 1040 l 113 819 l 30 819 l 165 1040 l 302 1040 "
						},
						"g" : {
							"x_min" : 0,
							"x_max" : 686,
							"ha" : 838,
							"o" : "m 686 34 q 586 -213 686 -121 q 331 -306 487 -306 q 131 -252 216 -306 q 31 -84 31 -190 l 155 -84 q 228 -174 166 -138 q 345 -207 284 -207 q 514 -109 454 -207 q 564 89 564 -27 q 461 6 521 36 q 335 -23 401 -23 q 88 100 184 -23 q 0 370 0 215 q 87 634 0 522 q 330 758 183 758 q 457 728 398 758 q 564 644 515 699 l 564 737 l 686 737 l 686 34 m 582 367 q 529 560 582 481 q 358 652 468 652 q 189 561 250 652 q 135 369 135 482 q 189 176 135 255 q 361 85 251 85 q 529 176 468 85 q 582 367 582 255 "
						},
						"²" : {
							"x_min" : 0,
							"x_max" : 442,
							"ha" : 539,
							"o" : "m 442 383 l 0 383 q 91 566 0 492 q 260 668 176 617 q 354 798 354 727 q 315 875 354 845 q 227 905 277 905 q 136 869 173 905 q 99 761 99 833 l 14 761 q 82 922 14 864 q 232 974 141 974 q 379 926 316 974 q 442 797 442 878 q 351 635 442 704 q 183 539 321 611 q 92 455 92 491 l 442 455 l 442 383 "
						},
						"–" : {
							"x_min" : 0,
							"x_max" : 705.5625,
							"ha" : 803,
							"o" : "m 705 334 l 0 334 l 0 410 l 705 410 l 705 334 "
						},
						"Κ" : {
							"x_min" : 0,
							"x_max" : 819.5625,
							"ha" : 893,
							"o" : "m 819 0 l 650 0 l 294 509 l 139 356 l 139 0 l 0 0 l 0 1013 l 139 1013 l 139 526 l 626 1013 l 809 1013 l 395 600 l 819 0 "
						},
						"ƒ" : {
							"x_min" :  - 46.265625,
							"x_max" : 392,
							"ha" : 513,
							"o" : "m 392 651 l 259 651 l 79 -279 l -46 -278 l 134 651 l 14 651 l 14 751 l 135 751 q 151 948 135 900 q 304 1041 185 1041 q 334 1040 319 1041 q 392 1034 348 1039 l 392 922 q 337 931 360 931 q 271 883 287 931 q 260 793 260 853 l 260 751 l 392 751 l 392 651 "
						},
						"e" : {
							"x_min" : 0,
							"x_max" : 714,
							"ha" : 813,
							"o" : "m 714 326 l 140 326 q 200 157 140 227 q 359 87 260 87 q 488 130 431 87 q 561 245 545 174 l 697 245 q 577 48 670 123 q 358 -26 484 -26 q 97 85 195 -26 q 0 363 0 197 q 94 642 0 529 q 358 765 195 765 q 626 627 529 765 q 714 326 714 503 m 576 429 q 507 583 564 522 q 355 650 445 650 q 206 583 266 650 q 140 429 152 522 l 576 429 "
						},
						"ό" : {
							"x_min" : 0,
							"x_max" : 712,
							"ha" : 815,
							"o" : "m 356 -25 q 94 91 194 -25 q 0 368 0 202 q 92 642 0 533 q 356 761 192 761 q 617 644 517 761 q 712 368 712 533 q 619 91 712 201 q 356 -25 520 -25 m 356 85 q 527 175 465 85 q 583 369 583 255 q 528 562 583 484 q 356 651 466 651 q 189 560 250 651 q 135 369 135 481 q 187 177 135 257 q 356 85 250 85 m 576 1040 l 387 819 l 303 819 l 438 1040 l 576 1040 "
						},
						"J" : {
							"x_min" : 0,
							"x_max" : 588,
							"ha" : 699,
							"o" : "m 588 279 q 287 -26 588 -26 q 58 73 126 -26 q 0 327 0 158 l 133 327 q 160 172 133 227 q 288 96 198 96 q 426 171 391 96 q 449 336 449 219 l 449 1013 l 588 1013 l 588 279 "
						},
						"»" : {
							"x_min" :  - 1,
							"x_max" : 503,
							"ha" : 601,
							"o" : "m 503 302 l 280 136 l 281 256 l 429 373 l 281 486 l 280 608 l 503 440 l 503 302 m 221 302 l 0 136 l 0 255 l 145 372 l 0 486 l -1 608 l 221 440 l 221 302 "
						},
						"©" : {
							"x_min" :  - 3,
							"x_max" : 1008,
							"ha" : 1106,
							"o" : "m 502 -7 q 123 151 263 -7 q -3 501 -3 294 q 123 851 -3 706 q 502 1011 263 1011 q 881 851 739 1011 q 1008 501 1008 708 q 883 151 1008 292 q 502 -7 744 -7 m 502 60 q 830 197 709 60 q 940 501 940 322 q 831 805 940 681 q 502 944 709 944 q 174 805 296 944 q 65 501 65 680 q 173 197 65 320 q 502 60 294 60 m 741 394 q 661 246 731 302 q 496 190 591 190 q 294 285 369 190 q 228 497 228 370 q 295 714 228 625 q 499 813 370 813 q 656 762 588 813 q 733 625 724 711 l 634 625 q 589 704 629 673 q 498 735 550 735 q 377 666 421 735 q 334 504 334 597 q 374 340 334 408 q 490 272 415 272 q 589 304 549 272 q 638 394 628 337 l 741 394 "
						},
						"ώ" : {
							"x_min" : 0,
							"x_max" : 922,
							"ha" : 1030,
							"o" : "m 687 1040 l 498 819 l 415 819 l 549 1040 l 687 1040 m 922 339 q 856 97 922 203 q 650 -26 780 -26 q 538 9 587 -26 q 461 103 489 44 q 387 12 436 46 q 277 -22 339 -22 q 69 97 147 -22 q 0 338 0 202 q 45 551 0 444 q 161 737 84 643 l 302 737 q 175 552 219 647 q 124 336 124 446 q 155 179 124 248 q 275 88 197 88 q 375 163 341 88 q 400 294 400 219 l 400 572 l 524 572 l 524 294 q 561 135 524 192 q 643 88 591 88 q 762 182 719 88 q 797 341 797 257 q 745 555 797 450 q 619 737 705 637 l 760 737 q 874 551 835 640 q 922 339 922 444 "
						},
						"^" : {
							"x_min" : 193.0625,
							"x_max" : 598.609375,
							"ha" : 792,
							"o" : "m 598 772 l 515 772 l 395 931 l 277 772 l 193 772 l 326 1013 l 462 1013 l 598 772 "
						},
						"«" : {
							"x_min" : 0,
							"x_max" : 507.203125,
							"ha" : 604,
							"o" : "m 506 136 l 284 302 l 284 440 l 506 608 l 507 485 l 360 371 l 506 255 l 506 136 m 222 136 l 0 302 l 0 440 l 222 608 l 221 486 l 73 373 l 222 256 l 222 136 "
						},
						"D" : {
							"x_min" : 0,
							"x_max" : 828,
							"ha" : 935,
							"o" : "m 389 1013 q 714 867 593 1013 q 828 521 828 729 q 712 161 828 309 q 382 0 587 0 l 0 0 l 0 1013 l 389 1013 m 376 124 q 607 247 523 124 q 681 510 681 355 q 607 771 681 662 q 376 896 522 896 l 139 896 l 139 124 l 376 124 "
						},
						"∙" : {
							"x_min" : 0,
							"x_max" : 142,
							"ha" : 239,
							"o" : "m 142 585 l 0 585 l 0 738 l 142 738 l 142 585 "
						},
						"ÿ" : {
							"x_min" : 0,
							"x_max" : 47,
							"ha" : 125,
							"o" : "m 47 3 q 37 -7 47 -7 q 28 0 30 -7 q 39 -4 32 -4 q 45 3 45 -1 l 37 0 q 28 9 28 0 q 39 19 28 19 l 47 16 l 47 19 l 47 3 m 37 1 q 44 8 44 1 q 37 16 44 16 q 30 8 30 16 q 37 1 30 1 m 26 1 l 23 22 l 14 0 l 3 22 l 3 3 l 0 25 l 13 1 l 22 25 l 26 1 "
						},
						"w" : {
							"x_min" : 0,
							"x_max" : 1009.71875,
							"ha" : 1100,
							"o" : "m 1009 738 l 783 0 l 658 0 l 501 567 l 345 0 l 222 0 l 0 738 l 130 738 l 284 174 l 432 737 l 576 738 l 721 173 l 881 737 l 1009 738 "
						},
						"$" : {
							"x_min" : 0,
							"x_max" : 700,
							"ha" : 793,
							"o" : "m 664 717 l 542 717 q 490 825 531 785 q 381 872 450 865 l 381 551 q 620 446 540 522 q 700 241 700 370 q 618 45 700 116 q 381 -25 536 -25 l 381 -152 l 307 -152 l 307 -25 q 81 62 162 -25 q 0 297 0 149 l 124 297 q 169 146 124 204 q 307 81 215 89 l 307 441 q 80 536 148 469 q 13 725 13 603 q 96 910 13 839 q 307 982 180 982 l 307 1077 l 381 1077 l 381 982 q 574 917 494 982 q 664 717 664 845 m 307 565 l 307 872 q 187 831 233 872 q 142 724 142 791 q 180 618 142 656 q 307 565 218 580 m 381 76 q 562 237 562 96 q 517 361 562 313 q 381 423 472 409 l 381 76 "
						},
						"\\" : {
							"x_min" :  - 0.015625,
							"x_max" : 425.0625,
							"ha" : 522,
							"o" : "m 425 -129 l 337 -129 l 0 1041 l 83 1041 l 425 -129 "
						},
						"µ" : {
							"x_min" : 0,
							"x_max" : 697.21875,
							"ha" : 747,
							"o" : "m 697 -4 q 629 -14 658 -14 q 498 97 513 -14 q 422 9 470 41 q 313 -23 374 -23 q 207 4 258 -23 q 119 81 156 32 l 119 -278 l 0 -278 l 0 738 l 124 738 l 124 343 q 165 173 124 246 q 308 83 216 83 q 452 178 402 83 q 493 359 493 255 l 493 738 l 617 738 l 617 214 q 623 136 617 160 q 673 92 637 92 q 697 96 684 92 l 697 -4 "
						},
						"Ι" : {
							"x_min" : 42,
							"x_max" : 181,
							"ha" : 297,
							"o" : "m 181 0 l 42 0 l 42 1013 l 181 1013 l 181 0 "
						},
						"Ύ" : {
							"x_min" : 0,
							"x_max" : 1144.5,
							"ha" : 1214,
							"o" : "m 1144 1012 l 807 416 l 807 0 l 667 0 l 667 416 l 325 1012 l 465 1012 l 736 533 l 1004 1012 l 1144 1012 m 277 1040 l 83 799 l 0 799 l 140 1040 l 277 1040 "
						},
						"’" : {
							"x_min" : 0,
							"x_max" : 139,
							"ha" : 236,
							"o" : "m 139 851 q 102 737 139 784 q 0 669 65 690 l 0 734 q 59 787 42 741 q 72 873 72 821 l 0 873 l 0 1013 l 139 1013 l 139 851 "
						},
						"Ν" : {
							"x_min" : 0,
							"x_max" : 801,
							"ha" : 915,
							"o" : "m 801 0 l 651 0 l 131 822 l 131 0 l 0 0 l 0 1013 l 151 1013 l 670 191 l 670 1013 l 801 1013 l 801 0 "
						},
						"-" : {
							"x_min" : 8.71875,
							"x_max" : 350.390625,
							"ha" : 478,
							"o" : "m 350 317 l 8 317 l 8 428 l 350 428 l 350 317 "
						},
						"Q" : {
							"x_min" : 0,
							"x_max" : 968,
							"ha" : 1072,
							"o" : "m 954 5 l 887 -79 l 744 35 q 622 -11 687 2 q 483 -26 556 -26 q 127 130 262 -26 q 0 504 0 279 q 127 880 0 728 q 484 1041 262 1041 q 841 884 708 1041 q 968 507 968 735 q 933 293 968 398 q 832 104 899 188 l 954 5 m 723 191 q 802 330 777 248 q 828 499 828 412 q 744 790 828 673 q 483 922 650 922 q 228 791 322 922 q 142 505 142 673 q 227 221 142 337 q 487 91 323 91 q 632 123 566 91 l 520 215 l 587 301 l 723 191 "
						},
						"ς" : {
							"x_min" : 1,
							"x_max" : 676.28125,
							"ha" : 740,
							"o" : "m 676 460 l 551 460 q 498 595 542 546 q 365 651 448 651 q 199 578 263 651 q 136 401 136 505 q 266 178 136 241 q 508 106 387 142 q 640 -50 640 62 q 625 -158 640 -105 q 583 -278 611 -211 l 465 -278 q 498 -182 490 -211 q 515 -80 515 -126 q 381 12 515 -15 q 134 91 197 51 q 1 388 1 179 q 100 651 1 542 q 354 761 199 761 q 587 680 498 761 q 676 460 676 599 "
						},
						"M" : {
							"x_min" : 0,
							"x_max" : 954,
							"ha" : 1067,
							"o" : "m 954 0 l 819 0 l 819 869 l 537 0 l 405 0 l 128 866 l 128 0 l 0 0 l 0 1013 l 200 1013 l 472 160 l 757 1013 l 954 1013 l 954 0 "
						},
						"Ψ" : {
							"x_min" : 0,
							"x_max" : 1006,
							"ha" : 1094,
							"o" : "m 1006 678 q 914 319 1006 429 q 571 200 814 200 l 571 0 l 433 0 l 433 200 q 92 319 194 200 q 0 678 0 429 l 0 1013 l 139 1013 l 139 679 q 191 417 139 492 q 433 326 255 326 l 433 1013 l 571 1013 l 571 326 l 580 326 q 813 423 747 326 q 868 679 868 502 l 868 1013 l 1006 1013 l 1006 678 "
						},
						"C" : {
							"x_min" : 0,
							"x_max" : 886,
							"ha" : 944,
							"o" : "m 886 379 q 760 87 886 201 q 455 -26 634 -26 q 112 136 236 -26 q 0 509 0 283 q 118 882 0 737 q 469 1041 245 1041 q 748 955 630 1041 q 879 708 879 859 l 745 708 q 649 862 724 805 q 473 920 573 920 q 219 791 312 920 q 136 509 136 675 q 217 229 136 344 q 470 99 311 99 q 672 179 591 99 q 753 379 753 259 l 886 379 "
						},
						"!" : {
							"x_min" : 0,
							"x_max" : 138,
							"ha" : 236,
							"o" : "m 138 684 q 116 409 138 629 q 105 244 105 299 l 33 244 q 16 465 33 313 q 0 684 0 616 l 0 1013 l 138 1013 l 138 684 m 138 0 l 0 0 l 0 151 l 138 151 l 138 0 "
						},
						"{" : {
							"x_min" : 0,
							"x_max" : 480.5625,
							"ha" : 578,
							"o" : "m 480 -286 q 237 -213 303 -286 q 187 -45 187 -159 q 194 48 187 -15 q 201 141 201 112 q 164 264 201 225 q 0 314 118 314 l 0 417 q 164 471 119 417 q 201 605 201 514 q 199 665 201 644 q 193 772 193 769 q 241 941 193 887 q 480 1015 308 1015 l 480 915 q 336 866 375 915 q 306 742 306 828 q 310 662 306 717 q 314 577 314 606 q 288 452 314 500 q 176 365 256 391 q 289 275 257 337 q 314 143 314 226 q 313 84 314 107 q 310 -11 310 -5 q 339 -131 310 -94 q 480 -182 377 -182 l 480 -286 "
						},
						"X" : {
							"x_min" :  - 0.015625,
							"x_max" : 854.15625,
							"ha" : 940,
							"o" : "m 854 0 l 683 0 l 423 409 l 166 0 l 0 0 l 347 519 l 18 1013 l 186 1013 l 428 637 l 675 1013 l 836 1013 l 504 520 l 854 0 "
						},
						"#" : {
							"x_min" : 0,
							"x_max" : 963.890625,
							"ha" : 1061,
							"o" : "m 963 690 l 927 590 l 719 590 l 655 410 l 876 410 l 840 310 l 618 310 l 508 -3 l 393 -2 l 506 309 l 329 310 l 215 -2 l 102 -3 l 212 310 l 0 310 l 36 410 l 248 409 l 312 590 l 86 590 l 120 690 l 347 690 l 459 1006 l 573 1006 l 462 690 l 640 690 l 751 1006 l 865 1006 l 754 690 l 963 690 m 606 590 l 425 590 l 362 410 l 543 410 l 606 590 "
						},
						"ι" : {
							"x_min" : 42,
							"x_max" : 284,
							"ha" : 361,
							"o" : "m 284 3 q 233 -10 258 -5 q 182 -15 207 -15 q 85 26 119 -15 q 42 200 42 79 l 42 738 l 167 738 l 168 215 q 172 141 168 157 q 226 101 183 101 q 248 103 239 101 q 284 112 257 104 l 284 3 "
						},
						"Ά" : {
							"x_min" : 0,
							"x_max" : 906.953125,
							"ha" : 982,
							"o" : "m 283 1040 l 88 799 l 5 799 l 145 1040 l 283 1040 m 906 0 l 756 0 l 650 303 l 251 303 l 143 0 l 0 0 l 376 1012 l 529 1012 l 906 0 m 609 421 l 452 866 l 293 421 l 609 421 "
						},
						")" : {
							"x_min" : 0,
							"x_max" : 318,
							"ha" : 415,
							"o" : "m 318 365 q 257 25 318 191 q 87 -290 197 -141 l 0 -290 q 140 21 93 -128 q 193 360 193 189 q 141 704 193 537 q 0 1024 97 850 l 87 1024 q 257 706 197 871 q 318 365 318 542 "
						},
						"ε" : {
							"x_min" : 0,
							"x_max" : 634.71875,
							"ha" : 714,
							"o" : "m 634 234 q 527 38 634 110 q 300 -25 433 -25 q 98 29 183 -25 q 0 204 0 93 q 37 314 0 265 q 128 390 67 353 q 56 460 82 419 q 26 555 26 505 q 114 712 26 654 q 295 763 191 763 q 499 700 416 763 q 589 515 589 631 l 478 515 q 419 618 464 580 q 307 657 374 657 q 207 630 253 657 q 151 547 151 598 q 238 445 151 469 q 389 434 280 434 l 389 331 l 349 331 q 206 315 255 331 q 125 210 125 287 q 183 107 125 145 q 302 76 233 76 q 436 117 379 76 q 509 234 493 159 l 634 234 "
						},
						"Δ" : {
							"x_min" : 0,
							"x_max" : 952.78125,
							"ha" : 1028,
							"o" : "m 952 0 l 0 0 l 400 1013 l 551 1013 l 952 0 m 762 124 l 476 867 l 187 124 l 762 124 "
						},
						"}" : {
							"x_min" : 0,
							"x_max" : 481,
							"ha" : 578,
							"o" : "m 481 314 q 318 262 364 314 q 282 136 282 222 q 284 65 282 97 q 293 -58 293 -48 q 241 -217 293 -166 q 0 -286 174 -286 l 0 -182 q 143 -130 105 -182 q 171 -2 171 -93 q 168 81 171 22 q 165 144 165 140 q 188 275 165 229 q 306 365 220 339 q 191 455 224 391 q 165 588 165 505 q 168 681 165 624 q 171 742 171 737 q 141 865 171 827 q 0 915 102 915 l 0 1015 q 243 942 176 1015 q 293 773 293 888 q 287 675 293 741 q 282 590 282 608 q 318 466 282 505 q 481 417 364 417 l 481 314 "
						},
						"‰" : {
							"x_min" :  - 3,
							"x_max" : 1672,
							"ha" : 1821,
							"o" : "m 846 0 q 664 76 732 0 q 603 244 603 145 q 662 412 603 344 q 846 489 729 489 q 1027 412 959 489 q 1089 244 1089 343 q 1029 76 1089 144 q 846 0 962 0 m 845 103 q 945 143 910 103 q 981 243 981 184 q 947 340 981 301 q 845 385 910 385 q 745 342 782 385 q 709 243 709 300 q 742 147 709 186 q 845 103 781 103 m 888 986 l 284 -25 l 199 -25 l 803 986 l 888 986 m 241 468 q 58 545 126 468 q -3 715 -3 615 q 56 881 -3 813 q 238 958 124 958 q 421 881 353 958 q 483 712 483 813 q 423 544 483 612 q 241 468 356 468 m 241 855 q 137 811 175 855 q 100 710 100 768 q 136 612 100 653 q 240 572 172 572 q 344 614 306 572 q 382 713 382 656 q 347 810 382 771 q 241 855 308 855 m 1428 0 q 1246 76 1314 0 q 1185 244 1185 145 q 1244 412 1185 344 q 1428 489 1311 489 q 1610 412 1542 489 q 1672 244 1672 343 q 1612 76 1672 144 q 1428 0 1545 0 m 1427 103 q 1528 143 1492 103 q 1564 243 1564 184 q 1530 340 1564 301 q 1427 385 1492 385 q 1327 342 1364 385 q 1291 243 1291 300 q 1324 147 1291 186 q 1427 103 1363 103 "
						},
						"a" : {
							"x_min" : 0,
							"x_max" : 698.609375,
							"ha" : 794,
							"o" : "m 698 0 q 661 -12 679 -7 q 615 -17 643 -17 q 536 12 564 -17 q 500 96 508 41 q 384 6 456 37 q 236 -25 312 -25 q 65 31 130 -25 q 0 194 0 88 q 118 390 0 334 q 328 435 180 420 q 488 483 476 451 q 495 523 495 504 q 442 619 495 584 q 325 654 389 654 q 209 617 257 654 q 152 513 161 580 l 33 513 q 123 705 33 633 q 332 772 207 772 q 528 712 448 772 q 617 531 617 645 l 617 163 q 624 108 617 126 q 664 90 632 90 l 698 94 l 698 0 m 491 262 l 491 372 q 272 329 350 347 q 128 201 128 294 q 166 113 128 144 q 264 83 205 83 q 414 130 346 83 q 491 262 491 183 "
						},
						"—" : {
							"x_min" : 0,
							"x_max" : 941.671875,
							"ha" : 1039,
							"o" : "m 941 334 l 0 334 l 0 410 l 941 410 l 941 334 "
						},
						"=" : {
							"x_min" : 8.71875,
							"x_max" : 780.953125,
							"ha" : 792,
							"o" : "m 780 510 l 8 510 l 8 606 l 780 606 l 780 510 m 780 235 l 8 235 l 8 332 l 780 332 l 780 235 "
						},
						"N" : {
							"x_min" : 0,
							"x_max" : 801,
							"ha" : 914,
							"o" : "m 801 0 l 651 0 l 131 823 l 131 0 l 0 0 l 0 1013 l 151 1013 l 670 193 l 670 1013 l 801 1013 l 801 0 "
						},
						"ρ" : {
							"x_min" : 0,
							"x_max" : 712,
							"ha" : 797,
							"o" : "m 712 369 q 620 94 712 207 q 362 -26 521 -26 q 230 2 292 -26 q 119 83 167 30 l 119 -278 l 0 -278 l 0 362 q 91 643 0 531 q 355 764 190 764 q 617 647 517 764 q 712 369 712 536 m 583 366 q 530 559 583 480 q 359 651 469 651 q 190 562 252 651 q 135 370 135 483 q 189 176 135 257 q 359 85 250 85 q 528 175 466 85 q 583 366 583 254 "
						},
						"2" : {
							"x_min" : 59,
							"x_max" : 731,
							"ha" : 792,
							"o" : "m 731 0 l 59 0 q 197 314 59 188 q 457 487 199 315 q 598 691 598 580 q 543 819 598 772 q 411 867 488 867 q 272 811 328 867 q 209 630 209 747 l 81 630 q 182 901 81 805 q 408 986 271 986 q 629 909 536 986 q 731 694 731 826 q 613 449 731 541 q 378 316 495 383 q 201 122 235 234 l 731 122 l 731 0 "
						},
						"¯" : {
							"x_min" : 0,
							"x_max" : 941.671875,
							"ha" : 938,
							"o" : "m 941 1033 l 0 1033 l 0 1109 l 941 1109 l 941 1033 "
						},
						"Z" : {
							"x_min" : 0,
							"x_max" : 779,
							"ha" : 849,
							"o" : "m 779 0 l 0 0 l 0 113 l 621 896 l 40 896 l 40 1013 l 779 1013 l 778 887 l 171 124 l 779 124 l 779 0 "
						},
						"u" : {
							"x_min" : 0,
							"x_max" : 617,
							"ha" : 729,
							"o" : "m 617 0 l 499 0 l 499 110 q 391 10 460 45 q 246 -25 322 -25 q 61 58 127 -25 q 0 258 0 136 l 0 738 l 125 738 l 125 284 q 156 148 125 202 q 273 82 197 82 q 433 165 369 82 q 493 340 493 243 l 493 738 l 617 738 l 617 0 "
						},
						"k" : {
							"x_min" : 0,
							"x_max" : 612.484375,
							"ha" : 697,
							"o" : "m 612 738 l 338 465 l 608 0 l 469 0 l 251 382 l 121 251 l 121 0 l 0 0 l 0 1013 l 121 1013 l 121 402 l 456 738 l 612 738 "
						},
						"Η" : {
							"x_min" : 0,
							"x_max" : 803,
							"ha" : 917,
							"o" : "m 803 0 l 667 0 l 667 475 l 140 475 l 140 0 l 0 0 l 0 1013 l 140 1013 l 140 599 l 667 599 l 667 1013 l 803 1013 l 803 0 "
						},
						"Α" : {
							"x_min" : 0,
							"x_max" : 906.953125,
							"ha" : 985,
							"o" : "m 906 0 l 756 0 l 650 303 l 251 303 l 143 0 l 0 0 l 376 1013 l 529 1013 l 906 0 m 609 421 l 452 866 l 293 421 l 609 421 "
						},
						"s" : {
							"x_min" : 0,
							"x_max" : 604,
							"ha" : 697,
							"o" : "m 604 217 q 501 36 604 104 q 292 -23 411 -23 q 86 43 166 -23 q 0 238 0 114 l 121 237 q 175 122 121 164 q 300 85 223 85 q 415 112 363 85 q 479 207 479 147 q 361 309 479 276 q 140 372 141 370 q 21 544 21 426 q 111 708 21 647 q 298 761 190 761 q 492 705 413 761 q 583 531 583 643 l 462 531 q 412 625 462 594 q 298 657 363 657 q 199 636 242 657 q 143 558 143 608 q 262 454 143 486 q 484 394 479 397 q 604 217 604 341 "
						},
						"B" : {
							"x_min" : 0,
							"x_max" : 778,
							"ha" : 876,
							"o" : "m 580 546 q 724 469 670 535 q 778 311 778 403 q 673 83 778 171 q 432 0 575 0 l 0 0 l 0 1013 l 411 1013 q 629 957 541 1013 q 732 768 732 892 q 691 633 732 693 q 580 546 650 572 m 393 899 l 139 899 l 139 588 l 379 588 q 521 624 462 588 q 592 744 592 667 q 531 859 592 819 q 393 899 471 899 m 419 124 q 566 169 504 124 q 635 303 635 219 q 559 436 635 389 q 402 477 494 477 l 139 477 l 139 124 l 419 124 "
						},
						"…" : {
							"x_min" : 0,
							"x_max" : 614,
							"ha" : 708,
							"o" : "m 142 0 l 0 0 l 0 151 l 142 151 l 142 0 m 378 0 l 236 0 l 236 151 l 378 151 l 378 0 m 614 0 l 472 0 l 472 151 l 614 151 l 614 0 "
						},
						"?" : {
							"x_min" : 0,
							"x_max" : 607,
							"ha" : 704,
							"o" : "m 607 777 q 543 599 607 674 q 422 474 482 537 q 357 272 357 391 l 236 272 q 297 487 236 395 q 411 619 298 490 q 474 762 474 691 q 422 885 474 838 q 301 933 371 933 q 179 880 228 933 q 124 706 124 819 l 0 706 q 94 963 0 872 q 302 1044 177 1044 q 511 973 423 1044 q 607 777 607 895 m 370 0 l 230 0 l 230 151 l 370 151 l 370 0 "
						},
						"H" : {
							"x_min" : 0,
							"x_max" : 803,
							"ha" : 915,
							"o" : "m 803 0 l 667 0 l 667 475 l 140 475 l 140 0 l 0 0 l 0 1013 l 140 1013 l 140 599 l 667 599 l 667 1013 l 803 1013 l 803 0 "
						},
						"ν" : {
							"x_min" : 0,
							"x_max" : 675,
							"ha" : 761,
							"o" : "m 675 738 l 404 0 l 272 0 l 0 738 l 133 738 l 340 147 l 541 738 l 675 738 "
						},
						"c" : {
							"x_min" : 1,
							"x_max" : 701.390625,
							"ha" : 775,
							"o" : "m 701 264 q 584 53 681 133 q 353 -26 487 -26 q 91 91 188 -26 q 1 370 1 201 q 92 645 1 537 q 353 761 190 761 q 572 688 479 761 q 690 493 666 615 l 556 493 q 487 606 545 562 q 356 650 428 650 q 186 563 246 650 q 134 372 134 487 q 188 179 134 258 q 359 88 250 88 q 492 136 437 88 q 566 264 548 185 l 701 264 "
						},
						"¶" : {
							"x_min" : 0,
							"x_max" : 566.671875,
							"ha" : 678,
							"o" : "m 21 892 l 52 892 l 98 761 l 145 892 l 176 892 l 178 741 l 157 741 l 157 867 l 108 741 l 88 741 l 40 871 l 40 741 l 21 741 l 21 892 m 308 854 l 308 731 q 252 691 308 691 q 227 691 240 691 q 207 696 213 695 l 207 712 l 253 706 q 288 733 288 706 l 288 763 q 244 741 279 741 q 193 797 193 741 q 261 860 193 860 q 287 860 273 860 q 308 854 302 855 m 288 842 l 263 843 q 213 796 213 843 q 248 756 213 756 q 288 796 288 756 l 288 842 m 566 988 l 502 988 l 502 -1 l 439 -1 l 439 988 l 317 988 l 317 -1 l 252 -1 l 252 602 q 81 653 155 602 q 0 805 0 711 q 101 989 0 918 q 309 1053 194 1053 l 566 1053 l 566 988 "
						},
						"β" : {
							"x_min" : 0,
							"x_max" : 660,
							"ha" : 745,
							"o" : "m 471 550 q 610 450 561 522 q 660 280 660 378 q 578 64 660 151 q 367 -22 497 -22 q 239 5 299 -22 q 126 82 178 32 l 126 -278 l 0 -278 l 0 593 q 54 903 0 801 q 318 1042 127 1042 q 519 964 436 1042 q 603 771 603 887 q 567 644 603 701 q 471 550 532 586 m 337 79 q 476 138 418 79 q 535 279 535 198 q 427 437 535 386 q 226 477 344 477 l 226 583 q 398 620 329 583 q 486 762 486 668 q 435 884 486 833 q 312 935 384 935 q 169 861 219 935 q 126 698 126 797 l 126 362 q 170 169 126 242 q 337 79 224 79 "
						},
						"Μ" : {
							"x_min" : 0,
							"x_max" : 954,
							"ha" : 1068,
							"o" : "m 954 0 l 819 0 l 819 868 l 537 0 l 405 0 l 128 865 l 128 0 l 0 0 l 0 1013 l 199 1013 l 472 158 l 758 1013 l 954 1013 l 954 0 "
						},
						"Ό" : {
							"x_min" : 0.109375,
							"x_max" : 1120,
							"ha" : 1217,
							"o" : "m 1120 505 q 994 132 1120 282 q 642 -29 861 -29 q 290 130 422 -29 q 167 505 167 280 q 294 883 167 730 q 650 1046 430 1046 q 999 882 868 1046 q 1120 505 1120 730 m 977 504 q 896 784 977 669 q 644 915 804 915 q 391 785 484 915 q 307 504 307 669 q 391 224 307 339 q 644 95 486 95 q 894 224 803 95 q 977 504 977 339 m 277 1040 l 83 799 l 0 799 l 140 1040 l 277 1040 "
						},
						"Ή" : {
							"x_min" : 0,
							"x_max" : 1158,
							"ha" : 1275,
							"o" : "m 1158 0 l 1022 0 l 1022 475 l 496 475 l 496 0 l 356 0 l 356 1012 l 496 1012 l 496 599 l 1022 599 l 1022 1012 l 1158 1012 l 1158 0 m 277 1040 l 83 799 l 0 799 l 140 1040 l 277 1040 "
						},
						"•" : {
							"x_min" : 0,
							"x_max" : 663.890625,
							"ha" : 775,
							"o" : "m 663 529 q 566 293 663 391 q 331 196 469 196 q 97 294 194 196 q 0 529 0 393 q 96 763 0 665 q 331 861 193 861 q 566 763 469 861 q 663 529 663 665 "
						},
						"¥" : {
							"x_min" : 0.1875,
							"x_max" : 819.546875,
							"ha" : 886,
							"o" : "m 563 561 l 697 561 l 696 487 l 520 487 l 482 416 l 482 380 l 697 380 l 695 308 l 482 308 l 482 0 l 342 0 l 342 308 l 125 308 l 125 380 l 342 380 l 342 417 l 303 487 l 125 487 l 125 561 l 258 561 l 0 1013 l 140 1013 l 411 533 l 679 1013 l 819 1013 l 563 561 "
						},
						"(" : {
							"x_min" : 0,
							"x_max" : 318.0625,
							"ha" : 415,
							"o" : "m 318 -290 l 230 -290 q 61 23 122 -142 q 0 365 0 190 q 62 712 0 540 q 230 1024 119 869 l 318 1024 q 175 705 219 853 q 125 360 125 542 q 176 22 125 187 q 318 -290 223 -127 "
						},
						"U" : {
							"x_min" : 0,
							"x_max" : 796,
							"ha" : 904,
							"o" : "m 796 393 q 681 93 796 212 q 386 -25 566 -25 q 101 95 208 -25 q 0 393 0 211 l 0 1013 l 138 1013 l 138 391 q 204 191 138 270 q 394 107 276 107 q 586 191 512 107 q 656 391 656 270 l 656 1013 l 796 1013 l 796 393 "
						},
						"γ" : {
							"x_min" : 0.5,
							"x_max" : 744.953125,
							"ha" : 822,
							"o" : "m 744 737 l 463 54 l 463 -278 l 338 -278 l 338 54 l 154 495 q 104 597 124 569 q 13 651 67 651 l 0 651 l 0 751 l 39 753 q 168 711 121 753 q 242 594 207 676 l 403 208 l 617 737 l 744 737 "
						},
						"α" : {
							"x_min" : 0,
							"x_max" : 765.5625,
							"ha" : 809,
							"o" : "m 765 -4 q 698 -14 726 -14 q 564 97 586 -14 q 466 7 525 40 q 337 -26 407 -26 q 88 98 186 -26 q 0 369 0 212 q 88 637 0 525 q 337 760 184 760 q 465 728 407 760 q 563 637 524 696 l 563 739 l 685 739 l 685 222 q 693 141 685 168 q 748 94 708 94 q 765 96 760 94 l 765 -4 m 584 371 q 531 562 584 485 q 360 653 470 653 q 192 566 254 653 q 135 379 135 489 q 186 181 135 261 q 358 84 247 84 q 528 176 465 84 q 584 371 584 260 "
						},
						"F" : {
							"x_min" : 0,
							"x_max" : 683.328125,
							"ha" : 717,
							"o" : "m 683 888 l 140 888 l 140 583 l 613 583 l 613 458 l 140 458 l 140 0 l 0 0 l 0 1013 l 683 1013 l 683 888 "
						},
						"­" : {
							"x_min" : 0,
							"x_max" : 705.5625,
							"ha" : 803,
							"o" : "m 705 334 l 0 334 l 0 410 l 705 410 l 705 334 "
						},
						":" : {
							"x_min" : 0,
							"x_max" : 142,
							"ha" : 239,
							"o" : "m 142 585 l 0 585 l 0 738 l 142 738 l 142 585 m 142 0 l 0 0 l 0 151 l 142 151 l 142 0 "
						},
						"Χ" : {
							"x_min" : 0,
							"x_max" : 854.171875,
							"ha" : 935,
							"o" : "m 854 0 l 683 0 l 423 409 l 166 0 l 0 0 l 347 519 l 18 1013 l 186 1013 l 427 637 l 675 1013 l 836 1013 l 504 521 l 854 0 "
						},
						"*" : {
							"x_min" : 116,
							"x_max" : 674,
							"ha" : 792,
							"o" : "m 674 768 l 475 713 l 610 544 l 517 477 l 394 652 l 272 478 l 178 544 l 314 713 l 116 766 l 153 876 l 341 812 l 342 1013 l 446 1013 l 446 811 l 635 874 l 674 768 "
						},
						"†" : {
							"x_min" : 0,
							"x_max" : 777,
							"ha" : 835,
							"o" : "m 458 804 l 777 804 l 777 683 l 458 683 l 458 0 l 319 0 l 319 681 l 0 683 l 0 804 l 319 804 l 319 1015 l 458 1013 l 458 804 "
						},
						"°" : {
							"x_min" : 0,
							"x_max" : 347,
							"ha" : 444,
							"o" : "m 173 802 q 43 856 91 802 q 0 977 0 905 q 45 1101 0 1049 q 173 1153 90 1153 q 303 1098 255 1153 q 347 977 347 1049 q 303 856 347 905 q 173 802 256 802 m 173 884 q 238 910 214 884 q 262 973 262 937 q 239 1038 262 1012 q 173 1064 217 1064 q 108 1037 132 1064 q 85 973 85 1010 q 108 910 85 937 q 173 884 132 884 "
						},
						"V" : {
							"x_min" : 0,
							"x_max" : 862.71875,
							"ha" : 940,
							"o" : "m 862 1013 l 505 0 l 361 0 l 0 1013 l 143 1013 l 434 165 l 718 1012 l 862 1013 "
						},
						"Ξ" : {
							"x_min" : 0,
							"x_max" : 734.71875,
							"ha" : 763,
							"o" : "m 723 889 l 9 889 l 9 1013 l 723 1013 l 723 889 m 673 463 l 61 463 l 61 589 l 673 589 l 673 463 m 734 0 l 0 0 l 0 124 l 734 124 l 734 0 "
						},
						" " : {
							"x_min" : 0,
							"x_max" : 0,
							"ha" : 853
						},
						"Ϋ" : {
							"x_min" : 0.328125,
							"x_max" : 819.515625,
							"ha" : 889,
							"o" : "m 588 1046 l 460 1046 l 460 1189 l 588 1189 l 588 1046 m 360 1046 l 232 1046 l 232 1189 l 360 1189 l 360 1046 m 819 1012 l 482 416 l 482 0 l 342 0 l 342 416 l 0 1012 l 140 1012 l 411 533 l 679 1012 l 819 1012 "
						},
						"0" : {
							"x_min" : 73,
							"x_max" : 715,
							"ha" : 792,
							"o" : "m 394 -29 q 153 129 242 -29 q 73 479 73 272 q 152 829 73 687 q 394 989 241 989 q 634 829 545 989 q 715 479 715 684 q 635 129 715 270 q 394 -29 546 -29 m 394 89 q 546 211 489 89 q 598 479 598 322 q 548 748 598 640 q 394 871 491 871 q 241 748 298 871 q 190 479 190 637 q 239 211 190 319 q 394 89 296 89 "
						},
						"”" : {
							"x_min" : 0,
							"x_max" : 347,
							"ha" : 454,
							"o" : "m 139 851 q 102 737 139 784 q 0 669 65 690 l 0 734 q 59 787 42 741 q 72 873 72 821 l 0 873 l 0 1013 l 139 1013 l 139 851 m 347 851 q 310 737 347 784 q 208 669 273 690 l 208 734 q 267 787 250 741 q 280 873 280 821 l 208 873 l 208 1013 l 347 1013 l 347 851 "
						},
						"@" : {
							"x_min" : 0,
							"x_max" : 1260,
							"ha" : 1357,
							"o" : "m 1098 -45 q 877 -160 1001 -117 q 633 -203 752 -203 q 155 -29 327 -203 q 0 360 0 127 q 176 802 0 616 q 687 1008 372 1008 q 1123 854 969 1008 q 1260 517 1260 718 q 1155 216 1260 341 q 868 82 1044 82 q 772 106 801 82 q 737 202 737 135 q 647 113 700 144 q 527 82 594 82 q 367 147 420 82 q 314 312 314 212 q 401 565 314 452 q 639 690 498 690 q 810 588 760 690 l 849 668 l 938 668 q 877 441 900 532 q 833 226 833 268 q 853 182 833 198 q 902 167 873 167 q 1088 272 1012 167 q 1159 512 1159 372 q 1051 793 1159 681 q 687 925 925 925 q 248 747 415 925 q 97 361 97 586 q 226 26 97 159 q 627 -122 370 -122 q 856 -87 737 -122 q 1061 8 976 -53 l 1098 -45 m 786 488 q 738 580 777 545 q 643 615 700 615 q 483 517 548 615 q 425 322 425 430 q 457 203 425 250 q 552 156 490 156 q 722 273 665 156 q 786 488 738 309 "
						},
						"Ί" : {
							"x_min" : 0,
							"x_max" : 499,
							"ha" : 613,
							"o" : "m 277 1040 l 83 799 l 0 799 l 140 1040 l 277 1040 m 499 0 l 360 0 l 360 1012 l 499 1012 l 499 0 "
						},
						"i" : {
							"x_min" : 14,
							"x_max" : 136,
							"ha" : 275,
							"o" : "m 136 873 l 14 873 l 14 1013 l 136 1013 l 136 873 m 136 0 l 14 0 l 14 737 l 136 737 l 136 0 "
						},
						"Β" : {
							"x_min" : 0,
							"x_max" : 778,
							"ha" : 877,
							"o" : "m 580 545 q 724 468 671 534 q 778 310 778 402 q 673 83 778 170 q 432 0 575 0 l 0 0 l 0 1013 l 411 1013 q 629 957 541 1013 q 732 768 732 891 q 691 632 732 692 q 580 545 650 571 m 393 899 l 139 899 l 139 587 l 379 587 q 521 623 462 587 q 592 744 592 666 q 531 859 592 819 q 393 899 471 899 m 419 124 q 566 169 504 124 q 635 302 635 219 q 559 435 635 388 q 402 476 494 476 l 139 476 l 139 124 l 419 124 "
						},
						"υ" : {
							"x_min" : 0,
							"x_max" : 617,
							"ha" : 725,
							"o" : "m 617 352 q 540 94 617 199 q 308 -24 455 -24 q 76 94 161 -24 q 0 352 0 199 l 0 739 l 126 739 l 126 355 q 169 185 126 257 q 312 98 220 98 q 451 185 402 98 q 492 355 492 257 l 492 739 l 617 739 l 617 352 "
						},
						"]" : {
							"x_min" : 0,
							"x_max" : 275,
							"ha" : 372,
							"o" : "m 275 -281 l 0 -281 l 0 -187 l 151 -187 l 151 920 l 0 920 l 0 1013 l 275 1013 l 275 -281 "
						},
						"m" : {
							"x_min" : 0,
							"x_max" : 1019,
							"ha" : 1128,
							"o" : "m 1019 0 l 897 0 l 897 454 q 860 591 897 536 q 739 660 816 660 q 613 586 659 660 q 573 436 573 522 l 573 0 l 447 0 l 447 455 q 412 591 447 535 q 294 657 372 657 q 165 586 213 657 q 122 437 122 521 l 122 0 l 0 0 l 0 738 l 117 738 l 117 640 q 202 730 150 697 q 316 763 254 763 q 437 730 381 763 q 525 642 494 697 q 621 731 559 700 q 753 763 682 763 q 943 694 867 763 q 1019 512 1019 625 l 1019 0 "
						},
						"χ" : {
							"x_min" : 8.328125,
							"x_max" : 780.5625,
							"ha" : 815,
							"o" : "m 780 -278 q 715 -294 747 -294 q 616 -257 663 -294 q 548 -175 576 -227 l 379 133 l 143 -277 l 9 -277 l 313 254 l 163 522 q 127 586 131 580 q 36 640 91 640 q 8 637 27 640 l 8 752 l 52 757 q 162 719 113 757 q 236 627 200 690 l 383 372 l 594 737 l 726 737 l 448 250 l 625 -69 q 670 -153 647 -110 q 743 -188 695 -188 q 780 -184 759 -188 l 780 -278 "
						},
						"8" : {
							"x_min" : 55,
							"x_max" : 736,
							"ha" : 792,
							"o" : "m 571 527 q 694 424 652 491 q 736 280 736 358 q 648 71 736 158 q 395 -26 551 -26 q 142 69 238 -26 q 55 279 55 157 q 96 425 55 359 q 220 527 138 491 q 120 615 153 562 q 88 726 88 668 q 171 904 88 827 q 395 986 261 986 q 618 905 529 986 q 702 727 702 830 q 670 616 702 667 q 571 527 638 565 m 394 565 q 519 610 475 565 q 563 717 563 655 q 521 823 563 781 q 392 872 474 872 q 265 824 312 872 q 224 720 224 783 q 265 613 224 656 q 394 565 312 565 m 395 91 q 545 150 488 91 q 597 280 597 204 q 546 408 597 355 q 395 465 492 465 q 244 408 299 465 q 194 280 194 356 q 244 150 194 203 q 395 91 299 91 "
						},
						"ί" : {
							"x_min" : 42,
							"x_max" : 326.71875,
							"ha" : 361,
							"o" : "m 284 3 q 233 -10 258 -5 q 182 -15 207 -15 q 85 26 119 -15 q 42 200 42 79 l 42 737 l 167 737 l 168 215 q 172 141 168 157 q 226 101 183 101 q 248 102 239 101 q 284 112 257 104 l 284 3 m 326 1040 l 137 819 l 54 819 l 189 1040 l 326 1040 "
						},
						"Ζ" : {
							"x_min" : 0,
							"x_max" : 779.171875,
							"ha" : 850,
							"o" : "m 779 0 l 0 0 l 0 113 l 620 896 l 40 896 l 40 1013 l 779 1013 l 779 887 l 170 124 l 779 124 l 779 0 "
						},
						"R" : {
							"x_min" : 0,
							"x_max" : 781.953125,
							"ha" : 907,
							"o" : "m 781 0 l 623 0 q 587 242 590 52 q 407 433 585 433 l 138 433 l 138 0 l 0 0 l 0 1013 l 396 1013 q 636 946 539 1013 q 749 731 749 868 q 711 597 749 659 q 608 502 674 534 q 718 370 696 474 q 729 207 722 352 q 781 26 736 62 l 781 0 m 373 551 q 533 594 465 551 q 614 731 614 645 q 532 859 614 815 q 373 896 465 896 l 138 896 l 138 551 l 373 551 "
						},
						"o" : {
							"x_min" : 0,
							"x_max" : 713,
							"ha" : 821,
							"o" : "m 357 -25 q 94 91 194 -25 q 0 368 0 202 q 93 642 0 533 q 357 761 193 761 q 618 644 518 761 q 713 368 713 533 q 619 91 713 201 q 357 -25 521 -25 m 357 85 q 528 175 465 85 q 584 369 584 255 q 529 562 584 484 q 357 651 467 651 q 189 560 250 651 q 135 369 135 481 q 187 177 135 257 q 357 85 250 85 "
						},
						"5" : {
							"x_min" : 54.171875,
							"x_max" : 738,
							"ha" : 792,
							"o" : "m 738 314 q 626 60 738 153 q 382 -23 526 -23 q 155 47 248 -23 q 54 256 54 125 l 183 256 q 259 132 204 174 q 382 91 314 91 q 533 149 471 91 q 602 314 602 213 q 538 469 602 411 q 386 528 475 528 q 284 506 332 528 q 197 439 237 484 l 81 439 l 159 958 l 684 958 l 684 840 l 254 840 l 214 579 q 306 627 258 612 q 407 643 354 643 q 636 552 540 643 q 738 314 738 457 "
						},
						"7" : {
							"x_min" : 58.71875,
							"x_max" : 730.953125,
							"ha" : 792,
							"o" : "m 730 839 q 469 448 560 641 q 335 0 378 255 l 192 0 q 328 441 235 252 q 593 830 421 630 l 58 830 l 58 958 l 730 958 l 730 839 "
						},
						"K" : {
							"x_min" : 0,
							"x_max" : 819.46875,
							"ha" : 906,
							"o" : "m 819 0 l 649 0 l 294 509 l 139 355 l 139 0 l 0 0 l 0 1013 l 139 1013 l 139 526 l 626 1013 l 809 1013 l 395 600 l 819 0 "
						},
						","
						 : {
							"x_min" : 0,
							"x_max" : 142,
							"ha" : 239,
							"o" : "m 142 -12 q 105 -132 142 -82 q 0 -205 68 -182 l 0 -138 q 57 -82 40 -124 q 70 0 70 -51 l 0 0 l 0 151 l 142 151 l 142 -12 "
						},
						"d" : {
							"x_min" : 0,
							"x_max" : 683,
							"ha" : 796,
							"o" : "m 683 0 l 564 0 l 564 93 q 456 6 516 38 q 327 -25 395 -25 q 87 100 181 -25 q 0 365 0 215 q 90 639 0 525 q 343 763 187 763 q 564 647 486 763 l 564 1013 l 683 1013 l 683 0 m 582 373 q 529 562 582 484 q 361 653 468 653 q 190 561 253 653 q 135 365 135 479 q 189 175 135 254 q 358 85 251 85 q 529 178 468 85 q 582 373 582 258 "
						},
						"¨" : {
							"x_min" :  - 109,
							"x_max" : 247,
							"ha" : 232,
							"o" : "m 247 1046 l 119 1046 l 119 1189 l 247 1189 l 247 1046 m 19 1046 l -109 1046 l -109 1189 l 19 1189 l 19 1046 "
						},
						"E" : {
							"x_min" : 0,
							"x_max" : 736.109375,
							"ha" : 789,
							"o" : "m 736 0 l 0 0 l 0 1013 l 725 1013 l 725 889 l 139 889 l 139 585 l 677 585 l 677 467 l 139 467 l 139 125 l 736 125 l 736 0 "
						},
						"Y" : {
							"x_min" : 0,
							"x_max" : 820,
							"ha" : 886,
							"o" : "m 820 1013 l 482 416 l 482 0 l 342 0 l 342 416 l 0 1013 l 140 1013 l 411 534 l 679 1012 l 820 1013 "
						},
						"\"" : {
							"x_min" : 0,
							"x_max" : 299,
							"ha" : 396,
							"o" : "m 299 606 l 203 606 l 203 988 l 299 988 l 299 606 m 96 606 l 0 606 l 0 988 l 96 988 l 96 606 "
						},
						"‹" : {
							"x_min" : 17.984375,
							"x_max" : 773.609375,
							"ha" : 792,
							"o" : "m 773 40 l 18 376 l 17 465 l 773 799 l 773 692 l 159 420 l 773 149 l 773 40 "
						},
						"„" : {
							"x_min" : 0,
							"x_max" : 364,
							"ha" : 467,
							"o" : "m 141 -12 q 104 -132 141 -82 q 0 -205 67 -182 l 0 -138 q 56 -82 40 -124 q 69 0 69 -51 l 0 0 l 0 151 l 141 151 l 141 -12 m 364 -12 q 327 -132 364 -82 q 222 -205 290 -182 l 222 -138 q 279 -82 262 -124 q 292 0 292 -51 l 222 0 l 222 151 l 364 151 l 364 -12 "
						},
						"δ" : {
							"x_min" : 1,
							"x_max" : 710,
							"ha" : 810,
							"o" : "m 710 360 q 616 87 710 196 q 356 -28 518 -28 q 99 82 197 -28 q 1 356 1 192 q 100 606 1 509 q 355 703 199 703 q 180 829 288 754 q 70 903 124 866 l 70 1012 l 643 1012 l 643 901 l 258 901 q 462 763 422 794 q 636 592 577 677 q 710 360 710 485 m 584 365 q 552 501 584 447 q 451 602 521 555 q 372 611 411 611 q 197 541 258 611 q 136 355 136 472 q 190 171 136 245 q 358 85 252 85 q 528 173 465 85 q 584 365 584 252 "
						},
						"έ" : {
							"x_min" : 0,
							"x_max" : 634.71875,
							"ha" : 714,
							"o" : "m 634 234 q 527 38 634 110 q 300 -25 433 -25 q 98 29 183 -25 q 0 204 0 93 q 37 313 0 265 q 128 390 67 352 q 56 459 82 419 q 26 555 26 505 q 114 712 26 654 q 295 763 191 763 q 499 700 416 763 q 589 515 589 631 l 478 515 q 419 618 464 580 q 307 657 374 657 q 207 630 253 657 q 151 547 151 598 q 238 445 151 469 q 389 434 280 434 l 389 331 l 349 331 q 206 315 255 331 q 125 210 125 287 q 183 107 125 145 q 302 76 233 76 q 436 117 379 76 q 509 234 493 159 l 634 234 m 520 1040 l 331 819 l 248 819 l 383 1040 l 520 1040 "
						},
						"ω" : {
							"x_min" : 0,
							"x_max" : 922,
							"ha" : 1031,
							"o" : "m 922 339 q 856 97 922 203 q 650 -26 780 -26 q 538 9 587 -26 q 461 103 489 44 q 387 12 436 46 q 277 -22 339 -22 q 69 97 147 -22 q 0 339 0 203 q 45 551 0 444 q 161 738 84 643 l 302 738 q 175 553 219 647 q 124 336 124 446 q 155 179 124 249 q 275 88 197 88 q 375 163 341 88 q 400 294 400 219 l 400 572 l 524 572 l 524 294 q 561 135 524 192 q 643 88 591 88 q 762 182 719 88 q 797 342 797 257 q 745 556 797 450 q 619 738 705 638 l 760 738 q 874 551 835 640 q 922 339 922 444 "
						},
						"´" : {
							"x_min" : 0,
							"x_max" : 96,
							"ha" : 251,
							"o" : "m 96 606 l 0 606 l 0 988 l 96 988 l 96 606 "
						},
						"±" : {
							"x_min" : 11,
							"x_max" : 781,
							"ha" : 792,
							"o" : "m 781 490 l 446 490 l 446 255 l 349 255 l 349 490 l 11 490 l 11 586 l 349 586 l 349 819 l 446 819 l 446 586 l 781 586 l 781 490 m 781 21 l 11 21 l 11 115 l 781 115 l 781 21 "
						},
						"|" : {
							"x_min" : 343,
							"x_max" : 449,
							"ha" : 792,
							"o" : "m 449 462 l 343 462 l 343 986 l 449 986 l 449 462 m 449 -242 l 343 -242 l 343 280 l 449 280 l 449 -242 "
						},
						"ϋ" : {
							"x_min" : 0,
							"x_max" : 617,
							"ha" : 725,
							"o" : "m 482 800 l 372 800 l 372 925 l 482 925 l 482 800 m 239 800 l 129 800 l 129 925 l 239 925 l 239 800 m 617 352 q 540 93 617 199 q 308 -24 455 -24 q 76 93 161 -24 q 0 352 0 199 l 0 738 l 126 738 l 126 354 q 169 185 126 257 q 312 98 220 98 q 451 185 402 98 q 492 354 492 257 l 492 738 l 617 738 l 617 352 "
						},
						"§" : {
							"x_min" : 0,
							"x_max" : 593,
							"ha" : 690,
							"o" : "m 593 425 q 554 312 593 369 q 467 233 516 254 q 537 83 537 172 q 459 -74 537 -12 q 288 -133 387 -133 q 115 -69 184 -133 q 47 96 47 -6 l 166 96 q 199 7 166 40 q 288 -26 232 -26 q 371 -5 332 -26 q 420 60 420 21 q 311 201 420 139 q 108 309 210 255 q 0 490 0 383 q 33 602 0 551 q 124 687 66 654 q 75 743 93 712 q 58 812 58 773 q 133 984 58 920 q 300 1043 201 1043 q 458 987 394 1043 q 529 814 529 925 l 411 814 q 370 908 404 877 q 289 939 336 939 q 213 911 246 939 q 180 841 180 883 q 286 720 180 779 q 484 612 480 615 q 593 425 593 534 m 467 409 q 355 544 467 473 q 196 630 228 612 q 146 587 162 609 q 124 525 124 558 q 239 387 124 462 q 398 298 369 315 q 448 345 429 316 q 467 409 467 375 "
						},
						"b" : {
							"x_min" : 0,
							"x_max" : 685,
							"ha" : 783,
							"o" : "m 685 372 q 597 99 685 213 q 347 -25 501 -25 q 219 5 277 -25 q 121 93 161 36 l 121 0 l 0 0 l 0 1013 l 121 1013 l 121 634 q 214 723 157 692 q 341 754 272 754 q 591 637 493 754 q 685 372 685 526 m 554 356 q 499 550 554 470 q 328 644 437 644 q 162 556 223 644 q 108 369 108 478 q 160 176 108 256 q 330 83 221 83 q 498 169 435 83 q 554 356 554 245 "
						},
						"q" : {
							"x_min" : 0,
							"x_max" : 683,
							"ha" : 876,
							"o" : "m 683 -278 l 564 -278 l 564 97 q 474 8 533 39 q 345 -23 415 -23 q 91 93 188 -23 q 0 364 0 203 q 87 635 0 522 q 337 760 184 760 q 466 727 408 760 q 564 637 523 695 l 564 737 l 683 737 l 683 -278 m 582 375 q 527 564 582 488 q 358 652 466 652 q 190 565 253 652 q 135 377 135 488 q 189 179 135 261 q 361 84 251 84 q 530 179 469 84 q 582 375 582 260 "
						},
						"Ω" : {
							"x_min" :  - 0.171875,
							"x_max" : 969.5625,
							"ha" : 1068,
							"o" : "m 969 0 l 555 0 l 555 123 q 744 308 675 194 q 814 558 814 423 q 726 812 814 709 q 484 922 633 922 q 244 820 334 922 q 154 567 154 719 q 223 316 154 433 q 412 123 292 199 l 412 0 l 0 0 l 0 124 l 217 124 q 68 327 122 210 q 15 572 15 444 q 144 911 15 781 q 484 1041 274 1041 q 822 909 691 1041 q 953 569 953 777 q 899 326 953 443 q 750 124 846 210 l 969 124 l 969 0 "
						},
						"ύ" : {
							"x_min" : 0,
							"x_max" : 617,
							"ha" : 725,
							"o" : "m 617 352 q 540 93 617 199 q 308 -24 455 -24 q 76 93 161 -24 q 0 352 0 199 l 0 738 l 126 738 l 126 354 q 169 185 126 257 q 312 98 220 98 q 451 185 402 98 q 492 354 492 257 l 492 738 l 617 738 l 617 352 m 535 1040 l 346 819 l 262 819 l 397 1040 l 535 1040 "
						},
						"z" : {
							"x_min" :  - 0.015625,
							"x_max" : 613.890625,
							"ha" : 697,
							"o" : "m 613 0 l 0 0 l 0 100 l 433 630 l 20 630 l 20 738 l 594 738 l 593 636 l 163 110 l 613 110 l 613 0 "
						},
						"™" : {
							"x_min" : 0,
							"x_max" : 894,
							"ha" : 1000,
							"o" : "m 389 951 l 229 951 l 229 503 l 160 503 l 160 951 l 0 951 l 0 1011 l 389 1011 l 389 951 m 894 503 l 827 503 l 827 939 l 685 503 l 620 503 l 481 937 l 481 503 l 417 503 l 417 1011 l 517 1011 l 653 580 l 796 1010 l 894 1011 l 894 503 "
						},
						"ή" : {
							"x_min" : 0.78125,
							"x_max" : 697,
							"ha" : 810,
							"o" : "m 697 -278 l 572 -278 l 572 454 q 540 587 572 536 q 425 650 501 650 q 271 579 337 650 q 206 420 206 509 l 206 0 l 81 0 l 81 489 q 73 588 81 562 q 0 644 56 644 l 0 741 q 68 755 38 755 q 158 721 124 755 q 200 630 193 687 q 297 726 234 692 q 434 761 359 761 q 620 692 544 761 q 697 516 697 624 l 697 -278 m 479 1040 l 290 819 l 207 819 l 341 1040 l 479 1040 "
						},
						"Θ" : {
							"x_min" : 0,
							"x_max" : 960,
							"ha" : 1056,
							"o" : "m 960 507 q 833 129 960 280 q 476 -32 698 -32 q 123 129 255 -32 q 0 507 0 280 q 123 883 0 732 q 476 1045 255 1045 q 832 883 696 1045 q 960 507 960 732 m 817 500 q 733 789 817 669 q 476 924 639 924 q 223 792 317 924 q 142 507 142 675 q 222 222 142 339 q 476 89 315 89 q 730 218 636 89 q 817 500 817 334 m 716 449 l 243 449 l 243 571 l 716 571 l 716 449 "
						},
						"®" : {
							"x_min" :  - 3,
							"x_max" : 1008,
							"ha" : 1106,
							"o" : "m 503 532 q 614 562 566 532 q 672 658 672 598 q 614 747 672 716 q 503 772 569 772 l 338 772 l 338 532 l 503 532 m 502 -7 q 123 151 263 -7 q -3 501 -3 294 q 123 851 -3 706 q 502 1011 263 1011 q 881 851 739 1011 q 1008 501 1008 708 q 883 151 1008 292 q 502 -7 744 -7 m 502 60 q 830 197 709 60 q 940 501 940 322 q 831 805 940 681 q 502 944 709 944 q 174 805 296 944 q 65 501 65 680 q 173 197 65 320 q 502 60 294 60 m 788 146 l 678 146 q 653 316 655 183 q 527 449 652 449 l 338 449 l 338 146 l 241 146 l 241 854 l 518 854 q 688 808 621 854 q 766 658 766 755 q 739 563 766 607 q 668 497 713 519 q 751 331 747 472 q 788 164 756 190 l 788 146 "
						},
						"~" : {
							"x_min" : 0,
							"x_max" : 833,
							"ha" : 931,
							"o" : "m 833 958 q 778 753 833 831 q 594 665 716 665 q 402 761 502 665 q 240 857 302 857 q 131 795 166 857 q 104 665 104 745 l 0 665 q 54 867 0 789 q 237 958 116 958 q 429 861 331 958 q 594 765 527 765 q 704 827 670 765 q 729 958 729 874 l 833 958 "
						},
						"Ε" : {
							"x_min" : 0,
							"x_max" : 736.21875,
							"ha" : 778,
							"o" : "m 736 0 l 0 0 l 0 1013 l 725 1013 l 725 889 l 139 889 l 139 585 l 677 585 l 677 467 l 139 467 l 139 125 l 736 125 l 736 0 "
						},
						"³" : {
							"x_min" : 0,
							"x_max" : 450,
							"ha" : 547,
							"o" : "m 450 552 q 379 413 450 464 q 220 366 313 366 q 69 414 130 366 q 0 567 0 470 l 85 567 q 126 470 85 504 q 225 437 168 437 q 320 467 280 437 q 360 552 360 498 q 318 632 360 608 q 213 657 276 657 q 195 657 203 657 q 176 657 181 657 l 176 722 q 279 733 249 722 q 334 815 334 752 q 300 881 334 856 q 220 907 267 907 q 133 875 169 907 q 97 781 97 844 l 15 781 q 78 926 15 875 q 220 972 135 972 q 364 930 303 972 q 426 817 426 888 q 344 697 426 733 q 421 642 392 681 q 450 552 450 603 "
						},
						"[" : {
							"x_min" : 0,
							"x_max" : 273.609375,
							"ha" : 371,
							"o" : "m 273 -281 l 0 -281 l 0 1013 l 273 1013 l 273 920 l 124 920 l 124 -187 l 273 -187 l 273 -281 "
						},
						"L" : {
							"x_min" : 0,
							"x_max" : 645.828125,
							"ha" : 696,
							"o" : "m 645 0 l 0 0 l 0 1013 l 140 1013 l 140 126 l 645 126 l 645 0 "
						},
						"σ" : {
							"x_min" : 0,
							"x_max" : 803.390625,
							"ha" : 894,
							"o" : "m 803 628 l 633 628 q 713 368 713 512 q 618 93 713 204 q 357 -25 518 -25 q 94 91 194 -25 q 0 368 0 201 q 94 644 0 533 q 356 761 194 761 q 481 750 398 761 q 608 739 564 739 l 803 739 l 803 628 m 360 85 q 529 180 467 85 q 584 374 584 262 q 527 566 584 490 q 352 651 463 651 q 187 559 247 651 q 135 368 135 478 q 189 175 135 254 q 360 85 251 85 "
						},
						"ζ" : {
							"x_min" : 0,
							"x_max" : 573,
							"ha" : 642,
							"o" : "m 573 -40 q 553 -162 573 -97 q 510 -278 543 -193 l 400 -278 q 441 -187 428 -219 q 462 -90 462 -132 q 378 -14 462 -14 q 108 45 197 -14 q 0 290 0 117 q 108 631 0 462 q 353 901 194 767 l 55 901 l 55 1012 l 561 1012 l 561 924 q 261 669 382 831 q 128 301 128 489 q 243 117 128 149 q 458 98 350 108 q 573 -40 573 80 "
						},
						"θ" : {
							"x_min" : 0,
							"x_max" : 674,
							"ha" : 778,
							"o" : "m 674 496 q 601 160 674 304 q 336 -26 508 -26 q 73 153 165 -26 q 0 485 0 296 q 72 840 0 683 q 343 1045 166 1045 q 605 844 516 1045 q 674 496 674 692 m 546 579 q 498 798 546 691 q 336 935 437 935 q 178 798 237 935 q 126 579 137 701 l 546 579 m 546 475 l 126 475 q 170 233 126 348 q 338 80 230 80 q 504 233 447 80 q 546 475 546 346 "
						},
						"Ο" : {
							"x_min" : 0,
							"x_max" : 958,
							"ha" : 1054,
							"o" : "m 485 1042 q 834 883 703 1042 q 958 511 958 735 q 834 136 958 287 q 481 -26 701 -26 q 126 130 261 -26 q 0 504 0 279 q 127 880 0 729 q 485 1042 263 1042 m 480 98 q 731 225 638 98 q 815 504 815 340 q 733 783 815 670 q 480 913 640 913 q 226 785 321 913 q 142 504 142 671 q 226 224 142 339 q 480 98 319 98 "
						},
						"Γ" : {
							"x_min" : 0,
							"x_max" : 705.28125,
							"ha" : 749,
							"o" : "m 705 886 l 140 886 l 140 0 l 0 0 l 0 1012 l 705 1012 l 705 886 "
						},
						"%" : {
							"x_min" :  - 3,
							"x_max" : 1089,
							"ha" : 1186,
							"o" : "m 845 0 q 663 76 731 0 q 602 244 602 145 q 661 412 602 344 q 845 489 728 489 q 1027 412 959 489 q 1089 244 1089 343 q 1029 76 1089 144 q 845 0 962 0 m 844 103 q 945 143 909 103 q 981 243 981 184 q 947 340 981 301 q 844 385 909 385 q 744 342 781 385 q 708 243 708 300 q 741 147 708 186 q 844 103 780 103 m 888 986 l 284 -25 l 199 -25 l 803 986 l 888 986 m 241 468 q 58 545 126 468 q -3 715 -3 615 q 56 881 -3 813 q 238 958 124 958 q 421 881 353 958 q 483 712 483 813 q 423 544 483 612 q 241 468 356 468 m 241 855 q 137 811 175 855 q 100 710 100 768 q 136 612 100 653 q 240 572 172 572 q 344 614 306 572 q 382 713 382 656 q 347 810 382 771 q 241 855 308 855 "
						},
						"P" : {
							"x_min" : 0,
							"x_max" : 726,
							"ha" : 806,
							"o" : "m 424 1013 q 640 931 555 1013 q 726 719 726 850 q 637 506 726 587 q 413 426 548 426 l 140 426 l 140 0 l 0 0 l 0 1013 l 424 1013 m 379 889 l 140 889 l 140 548 l 372 548 q 522 589 459 548 q 593 720 593 637 q 528 845 593 801 q 379 889 463 889 "
						},
						"Έ" : {
							"x_min" : 0,
							"x_max" : 1078.21875,
							"ha" : 1118,
							"o" : "m 1078 0 l 342 0 l 342 1013 l 1067 1013 l 1067 889 l 481 889 l 481 585 l 1019 585 l 1019 467 l 481 467 l 481 125 l 1078 125 l 1078 0 m 277 1040 l 83 799 l 0 799 l 140 1040 l 277 1040 "
						},
						"Ώ" : {
							"x_min" : 0.125,
							"x_max" : 1136.546875,
							"ha" : 1235,
							"o" : "m 1136 0 l 722 0 l 722 123 q 911 309 842 194 q 981 558 981 423 q 893 813 981 710 q 651 923 800 923 q 411 821 501 923 q 321 568 321 720 q 390 316 321 433 q 579 123 459 200 l 579 0 l 166 0 l 166 124 l 384 124 q 235 327 289 210 q 182 572 182 444 q 311 912 182 782 q 651 1042 441 1042 q 989 910 858 1042 q 1120 569 1120 778 q 1066 326 1120 443 q 917 124 1013 210 l 1136 124 l 1136 0 m 277 1040 l 83 800 l 0 800 l 140 1041 l 277 1040 "
						},
						"_" : {
							"x_min" : 0,
							"x_max" : 705.5625,
							"ha" : 803,
							"o" : "m 705 -334 l 0 -334 l 0 -234 l 705 -234 l 705 -334 "
						},
						"Ϊ" : {
							"x_min" :  - 110,
							"x_max" : 246,
							"ha" : 275,
							"o" : "m 246 1046 l 118 1046 l 118 1189 l 246 1189 l 246 1046 m 18 1046 l -110 1046 l -110 1189 l 18 1189 l 18 1046 m 136 0 l 0 0 l 0 1012 l 136 1012 l 136 0 "
						},
						"+" : {
							"x_min" : 23,
							"x_max" : 768,
							"ha" : 792,
							"o" : "m 768 372 l 444 372 l 444 0 l 347 0 l 347 372 l 23 372 l 23 468 l 347 468 l 347 840 l 444 840 l 444 468 l 768 468 l 768 372 "
						},
						"½" : {
							"x_min" : 0,
							"x_max" : 1050,
							"ha" : 1149,
							"o" : "m 1050 0 l 625 0 q 712 178 625 108 q 878 277 722 187 q 967 385 967 328 q 932 456 967 429 q 850 484 897 484 q 759 450 798 484 q 721 352 721 416 l 640 352 q 706 502 640 448 q 851 551 766 551 q 987 509 931 551 q 1050 385 1050 462 q 976 251 1050 301 q 829 179 902 215 q 717 68 740 133 l 1050 68 l 1050 0 m 834 985 l 215 -28 l 130 -28 l 750 984 l 834 985 m 224 422 l 142 422 l 142 811 l 0 811 l 0 867 q 104 889 62 867 q 164 973 157 916 l 224 973 l 224 422 "
						},
						"Ρ" : {
							"x_min" : 0,
							"x_max" : 720,
							"ha" : 783,
							"o" : "m 424 1013 q 637 933 554 1013 q 720 723 720 853 q 633 508 720 591 q 413 426 546 426 l 140 426 l 140 0 l 0 0 l 0 1013 l 424 1013 m 378 889 l 140 889 l 140 548 l 371 548 q 521 589 458 548 q 592 720 592 637 q 527 845 592 801 q 378 889 463 889 "
						},
						"'" : {
							"x_min" : 0,
							"x_max" : 139,
							"ha" : 236,
							"o" : "m 139 851 q 102 737 139 784 q 0 669 65 690 l 0 734 q 59 787 42 741 q 72 873 72 821 l 0 873 l 0 1013 l 139 1013 l 139 851 "
						},
						"ª" : {
							"x_min" : 0,
							"x_max" : 350,
							"ha" : 397,
							"o" : "m 350 625 q 307 616 328 616 q 266 631 281 616 q 247 673 251 645 q 190 628 225 644 q 116 613 156 613 q 32 641 64 613 q 0 722 0 669 q 72 826 0 800 q 247 866 159 846 l 247 887 q 220 934 247 916 q 162 953 194 953 q 104 934 129 953 q 76 882 80 915 l 16 882 q 60 976 16 941 q 166 1011 104 1011 q 266 979 224 1011 q 308 891 308 948 l 308 706 q 311 679 308 688 q 331 670 315 670 l 350 672 l 350 625 m 247 757 l 247 811 q 136 790 175 798 q 64 726 64 773 q 83 682 64 697 q 132 667 103 667 q 207 690 174 667 q 247 757 247 718 "
						},
						"΅" : {
							"x_min" : 0,
							"x_max" : 450,
							"ha" : 553,
							"o" : "m 450 800 l 340 800 l 340 925 l 450 925 l 450 800 m 406 1040 l 212 800 l 129 800 l 269 1040 l 406 1040 m 110 800 l 0 800 l 0 925 l 110 925 l 110 800 "
						},
						"T" : {
							"x_min" : 0,
							"x_max" : 777,
							"ha" : 835,
							"o" : "m 777 894 l 458 894 l 458 0 l 319 0 l 319 894 l 0 894 l 0 1013 l 777 1013 l 777 894 "
						},
						"Φ" : {
							"x_min" : 0,
							"x_max" : 915,
							"ha" : 997,
							"o" : "m 527 0 l 389 0 l 389 122 q 110 231 220 122 q 0 509 0 340 q 110 785 0 677 q 389 893 220 893 l 389 1013 l 527 1013 l 527 893 q 804 786 693 893 q 915 509 915 679 q 805 231 915 341 q 527 122 696 122 l 527 0 m 527 226 q 712 310 641 226 q 779 507 779 389 q 712 705 779 627 q 527 787 641 787 l 527 226 m 389 226 l 389 787 q 205 698 275 775 q 136 505 136 620 q 206 308 136 391 q 389 226 276 226 "
						},
						"⁋" : {
							"x_min" : 0,
							"x_max" : 0,
							"ha" : 694
						},
						"j" : {
							"x_min" :  - 77.78125,
							"x_max" : 167,
							"ha" : 349,
							"o" : "m 167 871 l 42 871 l 42 1013 l 167 1013 l 167 871 m 167 -80 q 121 -231 167 -184 q -26 -278 76 -278 l -77 -278 l -77 -164 l -41 -164 q 26 -143 11 -164 q 42 -65 42 -122 l 42 737 l 167 737 l 167 -80 "
						},
						"Σ" : {
							"x_min" : 0,
							"x_max" : 756.953125,
							"ha" : 819,
							"o" : "m 756 0 l 0 0 l 0 107 l 395 523 l 22 904 l 22 1013 l 745 1013 l 745 889 l 209 889 l 566 523 l 187 125 l 756 125 l 756 0 "
						},
						"1" : {
							"x_min" : 215.671875,
							"x_max" : 574,
							"ha" : 792,
							"o" : "m 574 0 l 442 0 l 442 697 l 215 697 l 215 796 q 386 833 330 796 q 475 986 447 875 l 574 986 l 574 0 "
						},
						"›" : {
							"x_min" : 18.0625,
							"x_max" : 774,
							"ha" : 792,
							"o" : "m 774 376 l 18 40 l 18 149 l 631 421 l 18 692 l 18 799 l 774 465 l 774 376 "
						},
						"<" : {
							"x_min" : 17.984375,
							"x_max" : 773.609375,
							"ha" : 792,
							"o" : "m 773 40 l 18 376 l 17 465 l 773 799 l 773 692 l 159 420 l 773 149 l 773 40 "
						},
						"£" : {
							"x_min" : 0,
							"x_max" : 704.484375,
							"ha" : 801,
							"o" : "m 704 41 q 623 -10 664 5 q 543 -26 583 -26 q 359 15 501 -26 q 243 36 288 36 q 158 23 197 36 q 73 -21 119 10 l 6 76 q 125 195 90 150 q 175 331 175 262 q 147 443 175 383 l 0 443 l 0 512 l 108 512 q 43 734 43 623 q 120 929 43 854 q 358 1010 204 1010 q 579 936 487 1010 q 678 729 678 857 l 678 684 l 552 684 q 504 838 552 780 q 362 896 457 896 q 216 852 263 896 q 176 747 176 815 q 199 627 176 697 q 248 512 217 574 l 468 512 l 468 443 l 279 443 q 297 356 297 398 q 230 194 297 279 q 153 107 211 170 q 227 133 190 125 q 293 142 264 142 q 410 119 339 142 q 516 96 482 96 q 579 105 550 96 q 648 142 608 115 l 704 41 "
						},
						"t" : {
							"x_min" : 0,
							"x_max" : 367,
							"ha" : 458,
							"o" : "m 367 0 q 312 -5 339 -2 q 262 -8 284 -8 q 145 28 183 -8 q 108 143 108 64 l 108 638 l 0 638 l 0 738 l 108 738 l 108 944 l 232 944 l 232 738 l 367 738 l 367 638 l 232 638 l 232 185 q 248 121 232 140 q 307 102 264 102 q 345 104 330 102 q 367 107 360 107 l 367 0 "
						},
						"¬" : {
							"x_min" : 0,
							"x_max" : 706,
							"ha" : 803,
							"o" : "m 706 411 l 706 158 l 630 158 l 630 335 l 0 335 l 0 411 l 706 411 "
						},
						"λ" : {
							"x_min" : 0,
							"x_max" : 750,
							"ha" : 803,
							"o" : "m 750 -7 q 679 -15 716 -15 q 538 59 591 -15 q 466 214 512 97 l 336 551 l 126 0 l 0 0 l 270 705 q 223 837 247 770 q 116 899 190 899 q 90 898 100 899 l 90 1004 q 152 1011 125 1011 q 298 938 244 1011 q 373 783 326 901 l 605 192 q 649 115 629 136 q 716 95 669 95 l 736 95 q 750 97 745 97 l 750 -7 "
						},
						"W" : {
							"x_min" : 0,
							"x_max" : 1263.890625,
							"ha" : 1351,
							"o" : "m 1263 1013 l 995 0 l 859 0 l 627 837 l 405 0 l 265 0 l 0 1013 l 136 1013 l 342 202 l 556 1013 l 701 1013 l 921 207 l 1133 1012 l 1263 1013 "
						},
						">" : {
							"x_min" : 18.0625,
							"x_max" : 774,
							"ha" : 792,
							"o" : "m 774 376 l 18 40 l 18 149 l 631 421 l 18 692 l 18 799 l 774 465 l 774 376 "
						},
						"v" : {
							"x_min" : 0,
							"x_max" : 675.15625,
							"ha" : 761,
							"o" : "m 675 738 l 404 0 l 272 0 l 0 738 l 133 737 l 340 147 l 541 737 l 675 738 "
						},
						"τ" : {
							"x_min" : 0.28125,
							"x_max" : 644.5,
							"ha" : 703,
							"o" : "m 644 628 l 382 628 l 382 179 q 388 120 382 137 q 436 91 401 91 q 474 94 447 91 q 504 97 501 97 l 504 0 q 454 -9 482 -5 q 401 -14 426 -14 q 278 67 308 -14 q 260 233 260 118 l 260 628 l 0 628 l 0 739 l 644 739 l 644 628 "
						},
						"ξ" : {
							"x_min" : 0,
							"x_max" : 624.9375,
							"ha" : 699,
							"o" : "m 624 -37 q 608 -153 624 -96 q 563 -278 593 -211 l 454 -278 q 491 -183 486 -200 q 511 -83 511 -126 q 484 -23 511 -44 q 370 1 452 1 q 323 0 354 1 q 283 -1 293 -1 q 84 76 169 -1 q 0 266 0 154 q 56 431 0 358 q 197 538 108 498 q 94 613 134 562 q 54 730 54 665 q 77 823 54 780 q 143 901 101 867 l 27 901 l 27 1012 l 576 1012 l 576 901 l 380 901 q 244 863 303 901 q 178 745 178 820 q 312 600 178 636 q 532 582 380 582 l 532 479 q 276 455 361 479 q 118 281 118 410 q 165 173 118 217 q 274 120 208 133 q 494 101 384 110 q 624 -37 624 76 "
						},
						"&" : {
							"x_min" :  - 3,
							"x_max" : 894.25,
							"ha" : 992,
							"o" : "m 894 0 l 725 0 l 624 123 q 471 0 553 40 q 306 -41 390 -41 q 168 -7 231 -41 q 62 92 105 26 q 14 187 31 139 q -3 276 -3 235 q 55 433 -3 358 q 248 581 114 508 q 170 689 196 640 q 137 817 137 751 q 214 985 137 922 q 384 1041 284 1041 q 548 988 483 1041 q 622 824 622 928 q 563 666 622 739 q 431 556 516 608 l 621 326 q 649 407 639 361 q 663 493 653 426 l 781 493 q 703 229 781 352 l 894 0 m 504 818 q 468 908 504 877 q 384 940 433 940 q 293 907 331 940 q 255 818 255 875 q 289 714 255 767 q 363 628 313 678 q 477 729 446 682 q 504 818 504 771 m 556 209 l 314 499 q 179 395 223 449 q 135 283 135 341 q 146 222 135 253 q 183 158 158 192 q 333 80 241 80 q 556 209 448 80 "
						},
						"Λ" : {
							"x_min" : 0,
							"x_max" : 862.5,
							"ha" : 942,
							"o" : "m 862 0 l 719 0 l 426 847 l 143 0 l 0 0 l 356 1013 l 501 1013 l 862 0 "
						},
						"I" : {
							"x_min" : 41,
							"x_max" : 180,
							"ha" : 293,
							"o" : "m 180 0 l 41 0 l 41 1013 l 180 1013 l 180 0 "
						},
						"G" : {
							"x_min" : 0,
							"x_max" : 921,
							"ha" : 1011,
							"o" : "m 921 0 l 832 0 l 801 136 q 655 15 741 58 q 470 -28 568 -28 q 126 133 259 -28 q 0 499 0 284 q 125 881 0 731 q 486 1043 259 1043 q 763 957 647 1043 q 905 709 890 864 l 772 709 q 668 866 747 807 q 486 926 589 926 q 228 795 322 926 q 142 507 142 677 q 228 224 142 342 q 483 94 323 94 q 712 195 625 94 q 796 435 796 291 l 477 435 l 477 549 l 921 549 l 921 0 "
						},
						"ΰ" : {
							"x_min" : 0,
							"x_max" : 617,
							"ha" : 725,
							"o" : "m 524 800 l 414 800 l 414 925 l 524 925 l 524 800 m 183 800 l 73 800 l 73 925 l 183 925 l 183 800 m 617 352 q 540 93 617 199 q 308 -24 455 -24 q 76 93 161 -24 q 0 352 0 199 l 0 738 l 126 738 l 126 354 q 169 185 126 257 q 312 98 220 98 q 451 185 402 98 q 492 354 492 257 l 492 738 l 617 738 l 617 352 m 489 1040 l 300 819 l 216 819 l 351 1040 l 489 1040 "
						},
						"`" : {
							"x_min" : 0,
							"x_max" : 138.890625,
							"ha" : 236,
							"o" : "m 138 699 l 0 699 l 0 861 q 36 974 0 929 q 138 1041 72 1020 l 138 977 q 82 931 95 969 q 69 839 69 893 l 138 839 l 138 699 "
						},
						"·" : {
							"x_min" : 0,
							"x_max" : 142,
							"ha" : 239,
							"o" : "m 142 585 l 0 585 l 0 738 l 142 738 l 142 585 "
						},
						"Υ" : {
							"x_min" : 0.328125,
							"x_max" : 819.515625,
							"ha" : 889,
							"o" : "m 819 1013 l 482 416 l 482 0 l 342 0 l 342 416 l 0 1013 l 140 1013 l 411 533 l 679 1013 l 819 1013 "
						},
						"r" : {
							"x_min" : 0,
							"x_max" : 355.5625,
							"ha" : 432,
							"o" : "m 355 621 l 343 621 q 179 569 236 621 q 122 411 122 518 l 122 0 l 0 0 l 0 737 l 117 737 l 117 604 q 204 719 146 686 q 355 753 262 753 l 355 621 "
						},
						"x" : {
							"x_min" : 0,
							"x_max" : 675,
							"ha" : 764,
							"o" : "m 675 0 l 525 0 l 331 286 l 144 0 l 0 0 l 256 379 l 12 738 l 157 737 l 336 473 l 516 738 l 661 738 l 412 380 l 675 0 "
						},
						"μ" : {
							"x_min" : 0,
							"x_max" : 696.609375,
							"ha" : 747,
							"o" : "m 696 -4 q 628 -14 657 -14 q 498 97 513 -14 q 422 8 470 41 q 313 -24 374 -24 q 207 3 258 -24 q 120 80 157 31 l 120 -278 l 0 -278 l 0 738 l 124 738 l 124 343 q 165 172 124 246 q 308 82 216 82 q 451 177 402 82 q 492 358 492 254 l 492 738 l 616 738 l 616 214 q 623 136 616 160 q 673 92 636 92 q 696 95 684 92 l 696 -4 "
						},
						"h" : {
							"x_min" : 0,
							"x_max" : 615,
							"ha" : 724,
							"o" : "m 615 472 l 615 0 l 490 0 l 490 454 q 456 590 490 535 q 338 654 416 654 q 186 588 251 654 q 122 436 122 522 l 122 0 l 0 0 l 0 1013 l 122 1013 l 122 633 q 218 727 149 694 q 362 760 287 760 q 552 676 484 760 q 615 472 615 600 "
						},
						"." : {
							"x_min" : 0,
							"x_max" : 142,
							"ha" : 239,
							"o" : "m 142 0 l 0 0 l 0 151 l 142 151 l 142 0 "
						},
						"φ" : {
							"x_min" :  - 2,
							"x_max" : 878,
							"ha" : 974,
							"o" : "m 496 -279 l 378 -279 l 378 -17 q 101 88 204 -17 q -2 367 -2 194 q 68 626 -2 510 q 283 758 151 758 l 283 646 q 167 537 209 626 q 133 373 133 462 q 192 177 133 254 q 378 93 259 93 l 378 758 q 445 764 426 763 q 476 765 464 765 q 765 659 653 765 q 878 377 878 553 q 771 96 878 209 q 496 -17 665 -17 l 496 -279 m 496 93 l 514 93 q 687 183 623 93 q 746 380 746 265 q 691 569 746 491 q 522 658 629 658 l 496 656 l 496 93 "
						},
						";" : {
							"x_min" : 0,
							"x_max" : 142,
							"ha" : 239,
							"o" : "m 142 585 l 0 585 l 0 738 l 142 738 l 142 585 m 142 -12 q 105 -132 142 -82 q 0 -206 68 -182 l 0 -138 q 58 -82 43 -123 q 68 0 68 -56 l 0 0 l 0 151 l 142 151 l 142 -12 "
						},
						"f" : {
							"x_min" : 0,
							"x_max" : 378,
							"ha" : 472,
							"o" : "m 378 638 l 246 638 l 246 0 l 121 0 l 121 638 l 0 638 l 0 738 l 121 738 q 137 935 121 887 q 290 1028 171 1028 q 320 1027 305 1028 q 378 1021 334 1026 l 378 908 q 323 918 346 918 q 257 870 273 918 q 246 780 246 840 l 246 738 l 378 738 l 378 638 "
						},
						"“" : {
							"x_min" : 1,
							"x_max" : 348.21875,
							"ha" : 454,
							"o" : "m 140 670 l 1 670 l 1 830 q 37 943 1 897 q 140 1011 74 990 l 140 947 q 82 900 97 940 q 68 810 68 861 l 140 810 l 140 670 m 348 670 l 209 670 l 209 830 q 245 943 209 897 q 348 1011 282 990 l 348 947 q 290 900 305 940 q 276 810 276 861 l 348 810 l 348 670 "
						},
						"A" : {
							"x_min" : 0.03125,
							"x_max" : 906.953125,
							"ha" : 1008,
							"o" : "m 906 0 l 756 0 l 648 303 l 251 303 l 142 0 l 0 0 l 376 1013 l 529 1013 l 906 0 m 610 421 l 452 867 l 293 421 l 610 421 "
						},
						"6" : {
							"x_min" : 53,
							"x_max" : 739,
							"ha" : 792,
							"o" : "m 739 312 q 633 62 739 162 q 400 -31 534 -31 q 162 78 257 -31 q 53 439 53 206 q 178 859 53 712 q 441 986 284 986 q 643 912 559 986 q 732 713 732 833 l 601 713 q 544 830 594 786 q 426 875 494 875 q 268 793 331 875 q 193 517 193 697 q 301 597 240 570 q 427 624 362 624 q 643 540 552 624 q 739 312 739 451 m 603 298 q 540 461 603 400 q 404 516 484 516 q 268 461 323 516 q 207 300 207 401 q 269 137 207 198 q 405 83 325 83 q 541 137 486 83 q 603 298 603 197 "
						},
						"‘" : {
							"x_min" : 1,
							"x_max" : 139.890625,
							"ha" : 236,
							"o" : "m 139 670 l 1 670 l 1 830 q 37 943 1 897 q 139 1011 74 990 l 139 947 q 82 900 97 940 q 68 810 68 861 l 139 810 l 139 670 "
						},
						"ϊ" : {
							"x_min" :  - 70,
							"x_max" : 283,
							"ha" : 361,
							"o" : "m 283 800 l 173 800 l 173 925 l 283 925 l 283 800 m 40 800 l -70 800 l -70 925 l 40 925 l 40 800 m 283 3 q 232 -10 257 -5 q 181 -15 206 -15 q 84 26 118 -15 q 41 200 41 79 l 41 737 l 166 737 l 167 215 q 171 141 167 157 q 225 101 182 101 q 247 103 238 101 q 283 112 256 104 l 283 3 "
						},
						"π" : {
							"x_min" :  - 0.21875,
							"x_max" : 773.21875,
							"ha" : 857,
							"o" : "m 773 -7 l 707 -11 q 575 40 607 -11 q 552 174 552 77 l 552 226 l 552 626 l 222 626 l 222 0 l 97 0 l 97 626 l 0 626 l 0 737 l 773 737 l 773 626 l 676 626 l 676 171 q 695 103 676 117 q 773 90 714 90 l 773 -7 "
						},
						"ά" : {
							"x_min" : 0,
							"x_max" : 765.5625,
							"ha" : 809,
							"o" : "m 765 -4 q 698 -14 726 -14 q 564 97 586 -14 q 466 7 525 40 q 337 -26 407 -26 q 88 98 186 -26 q 0 369 0 212 q 88 637 0 525 q 337 760 184 760 q 465 727 407 760 q 563 637 524 695 l 563 738 l 685 738 l 685 222 q 693 141 685 168 q 748 94 708 94 q 765 95 760 94 l 765 -4 m 584 371 q 531 562 584 485 q 360 653 470 653 q 192 566 254 653 q 135 379 135 489 q 186 181 135 261 q 358 84 247 84 q 528 176 465 84 q 584 371 584 260 m 604 1040 l 415 819 l 332 819 l 466 1040 l 604 1040 "
						},
						"O" : {
							"x_min" : 0,
							"x_max" : 958,
							"ha" : 1057,
							"o" : "m 485 1041 q 834 882 702 1041 q 958 512 958 734 q 834 136 958 287 q 481 -26 702 -26 q 126 130 261 -26 q 0 504 0 279 q 127 880 0 728 q 485 1041 263 1041 m 480 98 q 731 225 638 98 q 815 504 815 340 q 733 783 815 669 q 480 912 640 912 q 226 784 321 912 q 142 504 142 670 q 226 224 142 339 q 480 98 319 98 "
						},
						"n" : {
							"x_min" : 0,
							"x_max" : 615,
							"ha" : 724,
							"o" : "m 615 463 l 615 0 l 490 0 l 490 454 q 453 592 490 537 q 331 656 410 656 q 178 585 240 656 q 117 421 117 514 l 117 0 l 0 0 l 0 738 l 117 738 l 117 630 q 218 728 150 693 q 359 764 286 764 q 552 675 484 764 q 615 463 615 593 "
						},
						"3" : {
							"x_min" : 54,
							"x_max" : 737,
							"ha" : 792,
							"o" : "m 737 284 q 635 55 737 141 q 399 -25 541 -25 q 156 52 248 -25 q 54 308 54 140 l 185 308 q 245 147 185 202 q 395 96 302 96 q 539 140 484 96 q 602 280 602 190 q 510 429 602 390 q 324 454 451 454 l 324 565 q 487 584 441 565 q 565 719 565 617 q 515 835 565 791 q 395 879 466 879 q 255 824 307 879 q 203 661 203 769 l 78 661 q 166 909 78 822 q 387 992 250 992 q 603 921 513 992 q 701 723 701 844 q 669 607 701 656 q 578 524 637 558 q 696 434 655 499 q 737 284 737 369 "
						},
						"9" : {
							"x_min" : 53,
							"x_max" : 739,
							"ha" : 792,
							"o" : "m 739 524 q 619 94 739 241 q 362 -32 516 -32 q 150 47 242 -32 q 59 244 59 126 l 191 244 q 246 129 191 176 q 373 82 301 82 q 526 161 466 82 q 597 440 597 255 q 363 334 501 334 q 130 432 216 334 q 53 650 53 521 q 134 880 53 786 q 383 986 226 986 q 659 841 566 986 q 739 524 739 719 m 388 449 q 535 514 480 449 q 585 658 585 573 q 535 805 585 744 q 388 873 480 873 q 242 809 294 873 q 191 658 191 745 q 239 514 191 572 q 388 449 292 449 "
						},
						"l" : {
							"x_min" : 41,
							"x_max" : 166,
							"ha" : 279,
							"o" : "m 166 0 l 41 0 l 41 1013 l 166 1013 l 166 0 "
						},
						"¤" : {
							"x_min" : 40.09375,
							"x_max" : 728.796875,
							"ha" : 825,
							"o" : "m 728 304 l 649 224 l 512 363 q 383 331 458 331 q 256 363 310 331 l 119 224 l 40 304 l 177 441 q 150 553 150 493 q 184 673 150 621 l 40 818 l 119 898 l 267 749 q 321 766 291 759 q 384 773 351 773 q 447 766 417 773 q 501 749 477 759 l 649 898 l 728 818 l 585 675 q 612 618 604 648 q 621 553 621 587 q 591 441 621 491 l 728 304 m 384 682 q 280 643 318 682 q 243 551 243 604 q 279 461 243 499 q 383 423 316 423 q 487 461 449 423 q 525 553 525 500 q 490 641 525 605 q 384 682 451 682 "
						},
						"κ" : {
							"x_min" : 0,
							"x_max" : 632.328125,
							"ha" : 679,
							"o" : "m 632 0 l 482 0 l 225 384 l 124 288 l 124 0 l 0 0 l 0 738 l 124 738 l 124 446 l 433 738 l 596 738 l 312 466 l 632 0 "
						},
						"4" : {
							"x_min" : 48,
							"x_max" : 742.453125,
							"ha" : 792,
							"o" : "m 742 243 l 602 243 l 602 0 l 476 0 l 476 243 l 48 243 l 48 368 l 476 958 l 602 958 l 602 354 l 742 354 l 742 243 m 476 354 l 476 792 l 162 354 l 476 354 "
						},
						"p" : {
							"x_min" : 0,
							"x_max" : 685,
							"ha" : 786,
							"o" : "m 685 364 q 598 96 685 205 q 350 -23 504 -23 q 121 89 205 -23 l 121 -278 l 0 -278 l 0 738 l 121 738 l 121 633 q 220 726 159 691 q 351 761 280 761 q 598 636 504 761 q 685 364 685 522 m 557 371 q 501 560 557 481 q 330 651 437 651 q 162 559 223 651 q 108 366 108 479 q 162 177 108 254 q 333 87 224 87 q 502 178 441 87 q 557 371 557 258 "
						},
						"‡" : {
							"x_min" : 0,
							"x_max" : 777,
							"ha" : 835,
							"o" : "m 458 238 l 458 0 l 319 0 l 319 238 l 0 238 l 0 360 l 319 360 l 319 681 l 0 683 l 0 804 l 319 804 l 319 1015 l 458 1013 l 458 804 l 777 804 l 777 683 l 458 683 l 458 360 l 777 360 l 777 238 l 458 238 "
						},
						"ψ" : {
							"x_min" : 0,
							"x_max" : 808,
							"ha" : 907,
							"o" : "m 465 -278 l 341 -278 l 341 -15 q 87 102 180 -15 q 0 378 0 210 l 0 739 l 133 739 l 133 379 q 182 195 133 275 q 341 98 242 98 l 341 922 l 465 922 l 465 98 q 623 195 563 98 q 675 382 675 278 l 675 742 l 808 742 l 808 381 q 720 104 808 213 q 466 -13 627 -13 l 465 -278 "
						},
						"η" : {
							"x_min" : 0.78125,
							"x_max" : 697,
							"ha" : 810,
							"o" : "m 697 -278 l 572 -278 l 572 454 q 540 587 572 536 q 425 650 501 650 q 271 579 337 650 q 206 420 206 509 l 206 0 l 81 0 l 81 489 q 73 588 81 562 q 0 644 56 644 l 0 741 q 68 755 38 755 q 158 720 124 755 q 200 630 193 686 q 297 726 234 692 q 434 761 359 761 q 620 692 544 761 q 697 516 697 624 l 697 -278 "
						}
					},
					"cssFontWeight" : "normal",
					"ascender" : 1189,
					"underlinePosition" :  - 100,
					"cssFontStyle" : "normal",
					"boundingBox" : {
						"yMin" :  - 334,
						"xMin" :  - 111,
						"yMax" : 1189,
						"xMax" : 1672
					},
					"resolution" : 1000,
					"original_font_information" : {
						"postscript_name" : "Helvetiker-Regular",
						"version_string" : "Version 1.00 2004 initial release",
						"vendor_url" : "http://www.magenta.gr/",
						"full_font_name" : "Helvetiker",
						"font_family_name" : "Helvetiker",
						"copyright" : "Copyright (c) Μagenta ltd, 2004",
						"description" : "",
						"trademark" : "",
						"designer" : "",
						"designer_url" : "",
						"unique_font_identifier" : "Μagenta ltd:Helvetiker:22-10-104",
						"license_url" : "http://www.ellak.gr/fonts/MgOpen/license.html",
						"license_description" : "Copyright (c) 2004 by MAGENTA Ltd. All Rights Reserved.",
						"manufacturer_name" : "Μagenta ltd",
						"font_sub_family_name" : "Regular"
					},
					"descender" :  - 334,
					"familyName" : "Helvetiker",
					"lineHeight" : 1522,
					"underlineThickness" : 50
				});
			mouse[_winCount] = '';
			rollMode[_winCount] = 'auto';
			rollSpeedX[_winCount] = 0;
			rollSpeedY[_winCount] = 0.02;
			var errorText = "Loading Error: 404";
			var hash = document.location.hash.substr(1);
			if (hash.length !== 0)
				errorText = hash;
			var text3d = new THREE.TextGeometry(errorText, {
					size : 32,
					height : 8,
					curveSegments : 2,
					font : "helvetiker"
				});
			text3d.computeBoundingBox();
			var centerOffsetX =  - 0.5 * (text3d.boundingBox.max.x - text3d.boundingBox.min.x); //
			var textMaterial = new THREE.MeshBasicMaterial({
					color : Math.random() * 0xffffff,
					overdraw : true
				});
			errText = new THREE.Mesh(text3d, textMaterial);
			errText.position.x = centerOffsetX;
			errText.position.y = 0;
			errText.position.z = 0;
			errText.rotation.x = 0;
			errText.rotation.y = Math.PI * 2;
			obj[_winCount] = new THREE.Object3D();
			obj[_winCount].add(errText);
			obj[_winCount].scale.x = obj[_winCount].scale.y = obj[_winCount].scale.z = 0.22;
			scene[_winCount].add(obj[_winCount]);
			break;
		}
		var t = '3D_' + (_winCount + 1);
		var id = document.getElementById(t).childNodes[1];
		id.innerHTML = '';
		objLoaded[_winCount] = true;
		function centerGeometry(geo) {
			geo.computeBoundingBox();
			var bb = geo.boundingBox;
			var offset = new THREE.Vector3();
			offset.addVectors(bb.min, bb.max);
			offset.multiplyScalar( - 0.5);
			geo.applyMatrix(new THREE.Matrix4().makeTranslation(offset.x, offset.y, offset.z));
			geo.computeBoundingBox();
			return geo;
		}
	}
	function loadJS(_winCount, _objPath, _mat, _objScale, _objCol, _texturePath, _envPath, _envVal, _objAmbient, _shine) {
		var http = new XMLHttpRequest();
		http.open('HEAD', _objPath, false);
		http.send();
		if (http.status === 404) {
			objToScene(_winCount, '', '', '', '', '', '', '', '', '', 'error');
		} else {
			var loader4 = new THREE.JSONLoader(true);
			var p = _objPath.split('/'); 
			var temp = '';
			for(var i=0; i < p.length-1; i++){
				temp = temp + p[i] + '/';
			}
			function jsProgress(_progress){
				var t = '3D_' + (_winCount + 1);
				var id = document.getElementById(t).childNodes[1];
				id.innerHTML = loadingText[_winCount] + ' ' + _progress;
			};
			loader4.loadAjaxJSON(
				loader4,  _objPath,
				function ( _geometry, _materials ) { 		
					objToScene(_winCount, _geometry, _materials, _objScale, _objCol, _texturePath, _envPath, _envVal, _objAmbient, _shine, 'js'); 
				},
				temp, 
				function( progress ) {jsProgress((progress.loaded / progress.total * 100).toFixed() + '%');}
			)
		}
	}
	//
	function loadOBJ(_winCount, _objPath, _mat, _objScale, _objCol, _texturePath, _envPath, _envVal, _objAmbient, _shine) {
		var http = new XMLHttpRequest();
		http.open('HEAD', _objPath, false);
		http.send();
		if (http.status === 404) {
			objToScene(_winCount, '', '', '', '', '', '', '', '', '', 'error');
		} else {
			var Loader1 = new THREE.OBJMTLLoader();
			Loader1.addEventListener('load', function (event) {
				objToScene(_winCount, event.content, '', _objScale, _objCol, _texturePath, _envPath, _envVal, _objAmbient, _shine, 'obj');
			});
			Loader1.load(_objPath, _winCount);
		}
	}
	//
	function loadSTL(_winCount, _objPath, _mat, _objScale, _objCol, _texturePath, _envPath, _envVal, _objAmbient, _shine) {
		var http = new XMLHttpRequest();
		http.open('HEAD', _objPath, false);
		http.send();
		if (http.status === 404) {
			objToScene(_winCount, '', '', '', '', '', '', '', '', '', 'error');
		} else {
			var Loader2 = new THREE.STLLoader();
			Loader2.addEventListener('load', function (event) {
				objToScene(_winCount, event.content, '', _objScale, _objCol, _texturePath, _envPath, _envVal, _objAmbient, _shine, 'stl');
			});
			Loader2.load(_objPath, _winCount);
		}
	}
	//
	function loadDAE(_winCount, _objPath, _mat, _objScale, _objCol, _texturePath, _envPath, _envVal, _objAmbient, _shine) {
		var http = new XMLHttpRequest();
		http.open('HEAD', _objPath, false);
		http.send();
		if (http.status === 404) {
			objToScene(_winCount, '', '', '', '', '', '', '', '', '', 'error');
		} else {
			var Loader3 = new THREE.ColladaLoader();
			Loader3.addEventListener('load', function (event) {
				objToScene(_winCount, event.content, '', _objScale, _objCol, _texturePath, _envPath, _envVal, _objAmbient, _shine, 'dae');
			});
			Loader3.load(_objPath, _winCount);
		}
	}
	function init_loader() {
		/**
		 * Loads a Wavefront .obj file with materials
		 *
		 * @author mrdoob / http://mrdoob.com/
		 * @author angelxuanchang
		 */

		THREE.OBJMTLLoader = function () {};

		THREE.OBJMTLLoader.prototype = {

			constructor : THREE.OBJMTLLoader,

			addEventListener : THREE.EventDispatcher.prototype.addEventListener,
			hasEventListener : THREE.EventDispatcher.prototype.hasEventListener,
			removeEventListener : THREE.EventDispatcher.prototype.removeEventListener,
			dispatchEvent : THREE.EventDispatcher.prototype.dispatchEvent,

			/**
			 * Load a Wavefront OBJ file with materials (MTL file)
			 *
			 * Loading progress is indicated by the following events:
			 *   "load" event (successful loading): type = 'load', content = THREE.Object3D
			 *   "error" event (error loading): type = 'load', message
			 *   "progress" event (progress loading): type = 'progress', loaded, total
			 *
			 * If the MTL file cannot be loaded, then a MeshLambertMaterial is used as a default
			 * @param url - Location of OBJ file to load
			 * @param mtlfileurl - MTL file to load (optional, if not specified, attempts to use MTL specified in OBJ file)
			 * @param options - Options on how to interpret the material (see THREE.MTLLoader.MaterialCreator )
			 */

			load : function (url, _winCount, options) {

				var scope = this;
				var xhr = new XMLHttpRequest();

				var mtlDone; // Is the MTL done (true if no MTL, error loading MTL, or MTL actually loaded)
				var obj3d; // Loaded model (from obj file)
				var materialsCreator; // Material creator is created when MTL file is loaded

				var mtlfileurl = url.replace('.obj', '.mtl');
				var http = new XMLHttpRequest();
				http.open('HEAD', mtlfileurl, false);
				http.send();
				if (http.status === 404) {
					mtlfileurl = '';
				}
				var mtlLoader = new THREE.MTLLoader(url.substr(0, url.lastIndexOf("/") + 1), options);
				mtlLoader.addEventListener('load', waitReady);
				//mtlLoader.addEventListener('error', waitReady);

				// Try to load mtlfile

				if (mtlfileurl !=  '') {
					mtlLoader.load(mtlfileurl);
					mtlDone = false;
				} else {
					mtlDone = true;
				}

				function  waitReady(event) {
					if (event.type === 'load') {
						if (event.content instanceof THREE.MTLLoader.MaterialCreator) {
							// MTL file is loaded
							mtlDone = true;
							materialsCreator = event.content;
							materialsCreator.preload();
						} else {
							// OBJ file is loaded
							if (event.target.status === 200 || event.target.status === 0) {

								var objContent = event.target.responseText;

								if (mtlfileurl) {
									// Parse with passed in MTL file
									obj3d = scope.parse(objContent, null, _winCount);
								} else {
									// No passed in MTL file, look for mtlfile in obj file
									debug('.mtl file not found!');
									obj3d = scope.parse(objContent, null, _winCount);
									mtlDone = true;
									/*
									obj3d = scope.parse(objContent, function (mtlfile, _winCount) {
										mtlDone = false;
										mtlLoader.load(mtlLoader.baseUrl + mtlfile);
									});
									*/
								}
							} else {
								// Error loading OBJ file.... // weiter
								scope.dispatchEvent({
									type : 'error',
									message : 'Couldn\'t load URL [' + url + ']',
									response : event.target.responseText
								});
							}

						}
					} else if (event.type === 'error') {
						// MTL failed to load -- oh well, we will just not have material ...
						// debug('MTL: ' + 'failed!');
						mtlDone = true;
					}

					if (mtlDone && obj3d) {
						// MTL file is loaded and OBJ file is loaded
						// Apply materials to model
						if (materialsCreator) {
							obj3d.traverse(function (object) {
								if (object instanceof THREE.Mesh) {
									if (object.material.name) {
										var material = materialsCreator.create(object.material.name);
										if (material) {
											object.material = material;
										}
									}
								}
							});
						}

						// Notify listeners
						scope.dispatchEvent({
							type : 'load',
							content : obj3d
						});
					}
				}
				//
				xhr.addEventListener('load', waitReady, false);
				xhr.winCount = _winCount; xhr.addEventListener('progress', onProgress, false);
				/*
				xhr.addEventListener('error', function () {
					scope.dispatchEvent({
						type : 'error',
						message : 'Couldn\'t load URL [' + url + ']'
					});
				}, false);
				*/
				//
				xhr.open('GET', url, true);
				xhr.send(null);
			},

			/**
			 * Parses loaded .obj file
			 * @param data - content of .obj file
			 * @param mtllibCallback - callback to handle mtllib declaration (optional)
			 * @return {THREE.Object3D} - Object3D (with default material)
			 */

			parse: function ( data, mtllibCallback,_winCount ) {
				function groupObjCenter(_gObj, _store) {//VW
					_gObj.computeBoundingBox();
					var bb = _gObj.boundingBox;
					var back = {
						x1 : 0,
						x2 : 0,
						y1 : 0,
						y2 : 0,
						z1 : 0,
						z2 : 0
					};
					back.x1 = Math.min(bb.min.x, _store.x1);
					back.y1 = Math.min(bb.min.y, _store.y1);
					back.z1 = Math.min(bb.min.z, _store.z1);
					back.x2 = Math.max(bb.max.x, _store.x2);
					back.y2 = Math.max(bb.max.y, _store.y2);
					back.z2 = Math.max(bb.max.z, _store.z2); //alert('back.x2: ' + back.x2);
					return back;
				}
				function vector( x, y, z ) {

					return new THREE.Vector3( x, y, z );

				}

				function uv( u, v ) {

					return new THREE.Vector2( u, v );

				}

				function face3( a, b, c, normals ) {

					return new THREE.Face3( a, b, c, normals );

				}

				var face_offset = 0;

				function meshN( meshName, materialName ) {

					if ( vertices.length > 0 ) {

						geometry.vertices = vertices;

						geometry.mergeVertices();
						geometry.computeCentroids();
						geometry.computeFaceNormals();
						geometry.computeBoundingSphere();

						object.add( mesh );
						objCenterStore[_winCount] = groupObjCenter(mesh.geometry, objCenterStore[_winCount]);//VW
						geometry = new THREE.Geometry();
						mesh = new THREE.Mesh( geometry, material );
						verticesCount = 0;

					}

					if ( meshName !== undefined ) mesh.name = meshName;

					if ( materialName !== undefined ) {

						material = new THREE.MeshLambertMaterial();
						material.name = materialName;

						mesh.material = material;

					}

				}

				var group = new THREE.Object3D();
				var object = group;

				var geometry = new THREE.Geometry();
				var material = new THREE.MeshLambertMaterial();
				var mesh = new THREE.Mesh( geometry, material );

				var vertices = [];
				var verticesCount = 0;
				var normals = [];
				var uvs = [];

				function add_face( a, b, c, normals_inds ) {

					if ( normals_inds === undefined ) {

						geometry.faces.push( face3(
							parseInt( a ) - (face_offset + 1),
							parseInt( b ) - (face_offset + 1),
							parseInt( c ) - (face_offset + 1)
						) );

					} else {

						geometry.faces.push( face3(
							parseInt( a ) - (face_offset + 1),
							parseInt( b ) - (face_offset + 1),
							parseInt( c ) - (face_offset + 1),
							[
								normals[ parseInt( normals_inds[ 0 ] ) - 1 ].clone(),
								normals[ parseInt( normals_inds[ 1 ] ) - 1 ].clone(),
								normals[ parseInt( normals_inds[ 2 ] ) - 1 ].clone()
							]
						) );

					}

				}
				
				function add_uvs( a, b, c ) {

					geometry.faceVertexUvs[ 0 ].push( [
						uvs[ parseInt( a ) - 1 ].clone(),
						uvs[ parseInt( b ) - 1 ].clone(),
						uvs[ parseInt( c ) - 1 ].clone()
					] );

				}
				
				function handle_face_line(faces, uvs, normals_inds) {
					
					if ( faces[ 3 ] === undefined ) {
						
						add_face( faces[ 0 ], faces[ 1 ], faces[ 2 ], normals_inds );
						
						if (!(uvs === undefined) && uvs.length > 0) {
							add_uvs( uvs[ 0 ], uvs[ 1 ], uvs[ 2 ] );
						}

					} else {
						
						if (!(normals_inds === undefined) && normals_inds.length > 0) {

							add_face( faces[ 0 ], faces[ 1 ], faces[ 3 ], [ normals_inds[ 0 ], normals_inds[ 1 ], normals_inds[ 3 ] ]);
							add_face( faces[ 1 ], faces[ 2 ], faces[ 3 ], [ normals_inds[ 1 ], normals_inds[ 2 ], normals_inds[ 3 ] ]);

						} else {

							add_face( faces[ 0 ], faces[ 1 ], faces[ 3 ]);
							add_face( faces[ 1 ], faces[ 2 ], faces[ 3 ]);

						}
						
						if (!(uvs === undefined) && uvs.length > 0) {

							add_uvs( uvs[ 0 ], uvs[ 1 ], uvs[ 3 ] );
							add_uvs( uvs[ 1 ], uvs[ 2 ], uvs[ 3 ] );

						}

					}
					
				}


				// v float float float

				var vertex_pattern = /v( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/;

				// vn float float float

				var normal_pattern = /vn( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/;

				// vt float float

				var uv_pattern = /vt( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/;

				// f vertex vertex vertex ...

				var face_pattern1 = /f( +\d+)( +\d+)( +\d+)( +\d+)?/;

				// f vertex/uv vertex/uv vertex/uv ...

				var face_pattern2 = /f( +(\d+)\/(\d+))( +(\d+)\/(\d+))( +(\d+)\/(\d+))( +(\d+)\/(\d+))?/;

				// f vertex/uv/normal vertex/uv/normal vertex/uv/normal ...

				var face_pattern3 = /f( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))?/;

				// f vertex//normal vertex//normal vertex//normal ... 

				var face_pattern4 = /f( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))?/

				//

				var lines = data.split( "\n" );

				for ( var i = 0; i < lines.length; i ++ ) {

					var line = lines[ i ];
					line = line.trim();

					var result;

					if ( line.length === 0 || line.charAt( 0 ) === '#' ) {

						continue;

					} else if ( ( result = vertex_pattern.exec( line ) ) !== null ) {

						// ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

						vertices.push( vector(
							parseFloat( result[ 1 ] ),
							parseFloat( result[ 2 ] ),
							parseFloat( result[ 3 ] )
						) );

					} else if ( ( result = normal_pattern.exec( line ) ) !== null ) {

						// ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

						normals.push( vector(
							parseFloat( result[ 1 ] ),
							parseFloat( result[ 2 ] ),
							parseFloat( result[ 3 ] )
						) );

					} else if ( ( result = uv_pattern.exec( line ) ) !== null ) {

						// ["vt 0.1 0.2", "0.1", "0.2"]

						uvs.push( uv(
							parseFloat( result[ 1 ] ),
							parseFloat( result[ 2 ] )
						) );

					} else if ( ( result = face_pattern1.exec( line ) ) !== null ) {

						// ["f 1 2 3", "1", "2", "3", undefined]

						handle_face_line([ result[ 1 ], result[ 2 ], result[ 3 ], result[ 4 ] ]);

					} else if ( ( result = face_pattern2.exec( line ) ) !== null ) {

						// ["f 1/1 2/2 3/3", " 1/1", "1", "1", " 2/2", "2", "2", " 3/3", "3", "3", undefined, undefined, undefined]
						
						handle_face_line(
							[ result[ 2 ], result[ 5 ], result[ 8 ], result[ 11 ] ], //faces
							[ result[ 3 ], result[ 6 ], result[ 9 ], result[ 12 ] ] //uv
						);

					} else if ( ( result = face_pattern3.exec( line ) ) !== null ) {

						// ["f 1/1/1 2/2/2 3/3/3", " 1/1/1", "1", "1", "1", " 2/2/2", "2", "2", "2", " 3/3/3", "3", "3", "3", undefined, undefined, undefined, undefined]

						handle_face_line(
							[ result[ 2 ], result[ 6 ], result[ 10 ], result[ 14 ] ], //faces
							[ result[ 3 ], result[ 7 ], result[ 11 ], result[ 15 ] ], //uv
							[ result[ 4 ], result[ 8 ], result[ 12 ], result[ 16 ] ] //normal
						);

					} else if ( ( result = face_pattern4.exec( line ) ) !== null ) {

						// ["f 1//1 2//2 3//3", " 1//1", "1", "1", " 2//2", "2", "2", " 3//3", "3", "3", undefined, undefined, undefined]

						handle_face_line(
							[ result[ 2 ], result[ 5 ], result[ 8 ], result[ 11 ] ], //faces
							[ ], //uv
							[ result[ 3 ], result[ 6 ], result[ 9 ], result[ 12 ] ] //normal
						);

					} else if ( /^o /.test( line ) ) {

						// object
						
						meshN();
						face_offset = face_offset + vertices.length;
						vertices = [];
						object = new THREE.Object3D();
						object.name = line.substring( 2 ).trim();
						group.add( object );

					} else if ( /^g /.test( line ) ) {

						// group

						meshN( line.substring( 2 ).trim(), undefined );

					} else if ( /^usemtl /.test( line ) ) {

						// material

						meshN( undefined, line.substring( 7 ).trim() );

					} else if ( /^mtllib /.test( line ) ) {

						// mtl file

						if ( mtllibCallback ) {

							var mtlfile = line.substring( 7 );
							mtlfile = mtlfile.trim();
							mtllibCallback( mtlfile );

						}

					} else if ( /^s /.test( line ) ) {

						// Smooth shading

					} else {

						// console.log( "THREE.OBJMTLLoader: Unhandled line " + line );

					}

				}

				//Add last object
				meshN(undefined, undefined);
				
				return group;

			}

		};

		// ------------------------------------------------------------------------STLLoader

		/**
		 * @author aleeper / http://adamleeper.com/
		 * @author mrdoob / http://mrdoob.com/
		 * @author gero3 / https://github.com/gero3
		 *
		 * Description: A THREE loader for STL ASCII files, as created by Solidworks and other CAD programs.
		 *
		 * Supports both binary and ASCII encoded files, with automatic detection of type.
		 *
		 * Limitations:
		 * 	Binary decoding ignores header. There doesn't seem to be much of a use for it.
		 * 	There is perhaps some question as to how valid it is to always assume little-endian-ness.
		 * 	ASCII decoding assumes file is UTF-8. Seems to work for the examples...
		 *
		 * Usage:
		 * 	var loader = new THREE.STLLoader();
		 * 	loader.addEventListener( 'load', function ( event ) {
		 *
		 * 		var geometry = event.content;
		 * 		scene.add( new THREE.Mesh( geometry ) );
		 *
		 * 	} );
		 * 	loader.load( './models/stl/slotted_disk.stl' );
		 */

		THREE.STLLoader = function () {};

		THREE.STLLoader.prototype = {

			constructor : THREE.STLLoader

		};

		THREE.STLLoader.prototype.load = function (url,_winCount, callback) {

			var scope = this;

			var xhr = new XMLHttpRequest();

			function onloaded(event) {

				if (event.target.status === 200 || event.target.status === 0) {

					var geometry = scope.parse(event.target.response || event.target.responseText);

					scope.dispatchEvent({
						type : 'load',
						content : geometry
					});

					if (callback)
						callback(geometry);

				} else {

					scope.dispatchEvent({
						type : 'error',
						message : 'Couldn\'t load URL [' + url + ']',
						response : event.target.responseText
					});

				}

			};
			//
			xhr.winCount = _winCount; xhr.addEventListener('progress', onProgress, false);
			xhr.addEventListener('load', onloaded, false);
			/*
			xhr.addEventListener('progress', function (event) {

				scope.dispatchEvent({
					type : 'progress',
					loaded : event.loaded,
					total : event.total
				});

			}, false);
			
			xhr.addEventListener('error', function () {

				scope.dispatchEvent({
					type : 'error',
					message : 'Couldn\'t load URL [' + url + ']'
				});

			}, false);
			*/
			xhr.overrideMimeType('text/plain; charset=x-user-defined');
			xhr.open('GET', url, true);
			xhr.responseType = "arraybuffer";
			xhr.send(null);

		};

		THREE.STLLoader.prototype.parse = function (data) {

			var isBinary = function () {

				var expect,
				face_size,
				n_faces,
				reader;
				reader = new DataView(binData);
				face_size = (32 / 8 * 3) + ((32 / 8 * 3) * 3) + (16 / 8);
				n_faces = reader.getUint32(80, true);
				expect = 80 + (32 / 8) + (n_faces * face_size);
				return expect === reader.byteLength;

			};

			var binData = this.ensureBinary(data);

			return isBinary()
			 ? this.parseBinary(binData)
			 : this.parseASCII(this.ensureString(data));

		};

		THREE.STLLoader.prototype.parseBinary = function (data) {

			var face,
			geometry,
			n_faces,
			reader,
			length,
			normal,
			i,
			dataOffset,
			faceLength,
			start,
			vertexstart;

			reader = new DataView(data);
			n_faces = reader.getUint32(80, true);
			geometry = new THREE.Geometry();
			dataOffset = 84;
			faceLength = 12 * 4 + 2;

			for (face = 0; face < n_faces; face++) {

				start = dataOffset + face * faceLength;
				normal = new THREE.Vector3(
						reader.getFloat32(start, true),
						reader.getFloat32(start + 4, true),
						reader.getFloat32(start + 8, true));

				for (i = 1; i <= 3; i++) {

					vertexstart = start + i * 12;
					geometry.vertices.push(
						new THREE.Vector3(
							reader.getFloat32(vertexstart, true),
							reader.getFloat32(vertexstart + 4, true),
							reader.getFloat32(vertexstart + 8, true)));

				}

				length = geometry.vertices.length;
				geometry.faces.push(new THREE.Face3(length - 3, length - 2, length - 1, normal));

			}

			geometry.computeCentroids();
			geometry.computeBoundingSphere();

			return geometry;

		};

		THREE.STLLoader.prototype.parseASCII = function (data) {

			var geometry,
			length,
			normal,
			patternFace,
			patternNormal,
			patternVertex,
			result,
			text;
			geometry = new THREE.Geometry();
			patternFace = /facet([\s\S]*?)endfacet/g;
			while (((result = patternFace.exec(data)) != null)) {

				text = result[0];
				patternNormal = /normal[\s]+([\-+]?[0-9]+\.?[0-9]*([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+/g;
				while (((result = patternNormal.exec(text)) != null)) {

					normal = new THREE.Vector3(parseFloat(result[1]), parseFloat(result[3]), parseFloat(result[5]));

				}

				patternVertex = /vertex[\s]+([\-+]?[0-9]+\.?[0-9]*([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+/g;
				while (((result = patternVertex.exec(text)) != null)) {

					geometry.vertices.push(new THREE.Vector3(parseFloat(result[1]), parseFloat(result[3]), parseFloat(result[5])));

				}

				length = geometry.vertices.length;
				geometry.faces.push(new THREE.Face3(length - 3, length - 2, length - 1, normal));

			}

			geometry.computeCentroids();
			geometry.computeBoundingBox();
			geometry.computeBoundingSphere();

			return geometry;

		};

		THREE.STLLoader.prototype.ensureString = function (buf) {

			if (typeof buf !== "string") {
				var array_buffer = new Uint8Array(buf);
				var str = '';
				for (var i = 0; i < buf.byteLength; i++) {
					str += String.fromCharCode(array_buffer[i]); // implicitly assumes little-endian
				}
				return str;
			} else {
				return buf;
			}

		};

		THREE.STLLoader.prototype.ensureBinary = function (buf) {

			if (typeof buf === "string") {
				var array_buffer = new Uint8Array(buf.length);
				for (var i = 0; i < buf.length; i++) {
					array_buffer[i] = buf.charCodeAt(i) & 0xff; // implicitly assumes little-endian
				}
				return array_buffer.buffer || array_buffer;
			} else {
				return buf;
			}

		};

		THREE.EventDispatcher.prototype.apply(THREE.STLLoader.prototype);

		if (typeof DataView === 'undefined') {

			DataView = function (buffer, byteOffset, byteLength) {

				this.buffer = buffer;
				this.byteOffset = byteOffset || 0;
				this.byteLength = byteLength || buffer.byteLength || buffer.length;
				this._isString = typeof buffer === "string";

			}

			DataView.prototype = {

				_getCharCodes : function (buffer, start, length) {
					start = start || 0;
					length = length || buffer.length;
					var end = start + length;
					var codes = [];
					for (var i = start; i < end; i++) {
						codes.push(buffer.charCodeAt(i) & 0xff);
					}
					return codes;
				},

				_getBytes : function (length, byteOffset, littleEndian) {

					var result;

					// Handle the lack of endianness
					if (littleEndian === undefined) {

						littleEndian = this._littleEndian;

					}

					// Handle the lack of byteOffset
					if (byteOffset === undefined) {

						byteOffset = this.byteOffset;

					} else {

						byteOffset = this.byteOffset + byteOffset;

					}

					if (length === undefined) {

						length = this.byteLength - byteOffset;

					}

					// Error Checking
					if (typeof byteOffset !== 'number') {

						throw new TypeError('DataView byteOffset is not a number');

					}

					if (length < 0 || byteOffset + length > this.byteLength) {

						throw new Error('DataView length or (byteOffset+length) value is out of bounds');

					}

					if (this.isString) {

						result = this._getCharCodes(this.buffer, byteOffset, byteOffset + length);

					} else {

						result = this.buffer.slice(byteOffset, byteOffset + length);

					}

					if (!littleEndian && length > 1) {

						if (!(result instanceof Array)) {

							result = Array.prototype.slice.call(result);

						}

						result.reverse();
					}

					return result;

				},

				// Compatibility functions on a String Buffer

				getFloat64 : function (byteOffset, littleEndian) {

					var b = this._getBytes(8, byteOffset, littleEndian),

					sign = 1 - (2 * (b[7] >> 7)),
					exponent = ((((b[7] << 1) & 0xff) << 3) | (b[6] >> 4)) - ((1 << 10) - 1),

					// Binary operators such as | and << operate on 32 bit values, using + and Math.pow(2) instead
					mantissa = ((b[6] & 0x0f) * Math.pow(2, 48)) + (b[5] * Math.pow(2, 40)) + (b[4] * Math.pow(2, 32)) +
					(b[3] * Math.pow(2, 24)) + (b[2] * Math.pow(2, 16)) + (b[1] * Math.pow(2, 8)) + b[0];

					if (exponent === 1024) {
						if (mantissa !== 0) {
							return NaN;
						} else {
							return sign * Infinity;
						}
					}

					if (exponent === -1023) { // Denormalized
						return sign * mantissa * Math.pow(2, -1022 - 52);
					}

					return sign * (1 + mantissa * Math.pow(2, -52)) * Math.pow(2, exponent);

				},

				getFloat32 : function (byteOffset, littleEndian) {

					var b = this._getBytes(4, byteOffset, littleEndian),

					sign = 1 - (2 * (b[3] >> 7)),
					exponent = (((b[3] << 1) & 0xff) | (b[2] >> 7)) - 127,
					mantissa = ((b[2] & 0x7f) << 16) | (b[1] << 8) | b[0];

					if (exponent === 128) {
						if (mantissa !== 0) {
							return NaN;
						} else {
							return sign * Infinity;
						}
					}

					if (exponent === -127) { // Denormalized
						return sign * mantissa * Math.pow(2, -126 - 23);
					}

					return sign * (1 + mantissa * Math.pow(2, -23)) * Math.pow(2, exponent);
				},

				getInt32 : function (byteOffset, littleEndian) {
					var b = this._getBytes(4, byteOffset, littleEndian);
					return (b[3] << 24) | (b[2] << 16) | (b[1] << 8) | b[0];
				},

				getUint32 : function (byteOffset, littleEndian) {
					return this.getInt32(byteOffset, littleEndian) >>> 0;
				},

				getInt16 : function (byteOffset, littleEndian) {
					return (this.getUint16(byteOffset, littleEndian) << 16) >> 16;
				},

				getUint16 : function (byteOffset, littleEndian) {
					var b = this._getBytes(2, byteOffset, littleEndian);
					return (b[1] << 8) | b[0];
				},

				getInt8 : function (byteOffset) {
					return (this.getUint8(byteOffset) << 24) >> 24;
				},

				getUint8 : function (byteOffset) {
					return this._getBytes(1, byteOffset)[0];
				}

			};

		}

		// ------------------------------------------------------------------------------------ ColladaLoader
		
		THREE.ColladaLoader = function () {};
		THREE.ColladaLoader.prototype = {
			constructor : THREE.ColladaLoader,
			addEventListener : THREE.EventDispatcher.prototype.addEventListener,
			hasEventListener : THREE.EventDispatcher.prototype.hasEventListener,
			removeEventListener : THREE.EventDispatcher.prototype.removeEventListener,
			dispatchEvent : THREE.EventDispatcher.prototype.dispatchEvent
		}; //
		var COLLADA = null;
		var scene = null;
		var daeScene;
		var readyCallbackFunc = null;
		var sources = {};
		var images = {};
		var animations = {};
		var controllers = {};
		var geometries = {};
		var materials = {};
		var effects = {};
		var cameras = {};
		var lights = {};
		var animData;
		var visualScenes;
		var baseUrl;
		var morphs;
		var skins;
		var flip_uv = true;
		var preferredShading = THREE.SmoothShading;
		var options = {
			centerGeometry : true,
			convertUpAxis : true,
			subdivideFaces : false,
			upAxis : 'Y',
			defaultEnvMap : null
		};
		//
		THREE.ColladaLoader.prototype.load = function (_url, _winCount) {
			var scope = this;
			var daeLdr = new XMLHttpRequest();
			var callBack;
			function onloaded(event) {
				//
				if (event.target.status === 200 || event.target.status === 0) {
					if (daeLdr.responseXML) {
						var _geometry = parseCollada(daeLdr.responseXML, undefined, _url);
						scope.dispatchEvent({
							type : 'load',
							content : _geometry
						});
					} else if (daeLdr.responseText) {
						var xmlParser = new DOMParser();
						var responseXML = xmlParser.parseFromString(daeLdr.responseText, "application/xml");
						var _geometry = parseCollada(responseXML, undefined, _url);
						scope.dispatchEvent({
							type : 'load',
							content : _geometry
						});
					}
				} else {
					scope.dispatchEvent({
						type : 'error',
						message : 'Couldn\'t load URL [' + _url + ']',
						response : event.target.responseText
					});
				}
				//
				daeLdr.removeEventListener('load', onloaded, false); //
			}
			daeLdr.winCount = _winCount; daeLdr.addEventListener('progress', onProgress, false);
			daeLdr.addEventListener('load', onloaded, false); //
			daeLdr.overrideMimeType('text/plain; charset=x-user-defined');
			daeLdr.open('GET', _url, true);
			daeLdr.send(null);
		}; //

	function parseCollada( doc, callBack, url ) {

		COLLADA = doc;
		callBack = callBack || readyCallbackFunc;

		if ( url !== undefined ) {

			var parts = url.split( '/' );
			parts.pop();
			baseUrl = ( parts.length < 1 ? '.' : parts.join( '/' ) ) + '/';

		}

		parseAsset();
		setUpConversion();
		images = parseLib( "//dae:library_images/dae:image", _Image, "image" );
		materials = parseLib( "//dae:library_materials/dae:material", Material, "material" );
		effects = parseLib( "//dae:library_effects/dae:effect", Effect, "effect" );
		geometries = parseLib( "//dae:library_geometries/dae:geometry", Geometry, "geometry" );
		cameras = parseLib( ".//dae:library_cameras/dae:camera", Camera, "camera" );
		lights = parseLib( ".//dae:library_lights/dae:light", Light, "light" );
		controllers = parseLib( "//dae:library_controllers/dae:controller", Controller, "controller" );
		animations = parseLib( "//dae:library_animations/dae:animation", Animation, "animation" );
		visualScenes = parseLib( ".//dae:library_visual_scenes/dae:visual_scene", VisualScene, "visual_scene" );

		morphs = [];
		skins = [];

		daeScene = parseScene();
		scene = new THREE.Object3D();

		for ( var i = 0; i < daeScene.nodes.length; i ++ ) {

			scene.add( createSceneGraph( daeScene.nodes[ i ] ) );

		}

		// unit conversion
		scene.scale.multiplyScalar( colladaUnit );

		createAnimations();

		var result = {

			scene: scene,
			morphs: morphs,
			skins: skins,
			animations: animData,
			dae: {
				images: images,
				materials: materials,
				cameras: cameras,
				lights: lights,
				effects: effects,
				geometries: geometries,
				controllers: controllers,
				animations: animations,
				visualScenes: visualScenes,
				scene: daeScene
			}

		};

		if ( callBack ) {

			callBack( result );

		}

		return result;

	};

	function setPreferredShading ( shading ) {

		preferredShading = shading;

	};

	function parseAsset () {

		var elements = COLLADA.evaluate( '//dae:asset', COLLADA, _nsResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );

		var element = elements.iterateNext();

		if ( element && element.childNodes ) {

			for ( var i = 0; i < element.childNodes.length; i ++ ) {

				var child = element.childNodes[ i ];

				switch ( child.nodeName ) {

					case 'unit':

						var meter = child.getAttribute( 'meter' );

						if ( meter ) {

							colladaUnit = parseFloat( meter );

						}

						break;

					case 'up_axis':

						colladaUp = child.textContent.charAt(0);
						break;

				}

			}

		}

	};

	function parseLib ( q, classSpec, prefix ) {

		var elements = COLLADA.evaluate(q, COLLADA, _nsResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null) ;

		var lib = {};
		var element = elements.iterateNext();
		var i = 0;

		while ( element ) {

			var daeElement = ( new classSpec() ).parse( element );
			if ( !daeElement.id || daeElement.id.length == 0 ) daeElement.id = prefix + ( i ++ );
			lib[ daeElement.id ] = daeElement;

			element = elements.iterateNext();

		}

		return lib;

	};

	function parseScene() {

		var sceneElement = COLLADA.evaluate( './/dae:scene/dae:instance_visual_scene', COLLADA, _nsResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null ).iterateNext();

		if ( sceneElement ) {

			var url = sceneElement.getAttribute( 'url' ).replace( /^#/, '' );
			return visualScenes[ url.length > 0 ? url : 'visual_scene0' ];

		} else {

			return null;

		}

	};

	function createAnimations() {

		animData = [];

		// fill in the keys
		recurseHierarchy( scene );

	};

	function recurseHierarchy( node ) {

		var n = daeScene.getChildById( node.name, true ),
			newData = null;

		if ( n && n.keys ) {

			newData = {
				fps: 60,
				hierarchy: [ {
					node: n,
					keys: n.keys,
					sids: n.sids
				} ],
				node: node,
				name: 'animation_' + node.name,
				length: 0
			};

			animData.push(newData);

			for ( var i = 0, il = n.keys.length; i < il; i++ ) {

				newData.length = Math.max( newData.length, n.keys[i].time );

			}

		} else  {

			newData = {
				hierarchy: [ {
					keys: [],
					sids: []
				} ]
			}

		}

		for ( var i = 0, il = node.children.length; i < il; i++ ) {

			var d = recurseHierarchy( node.children[i] );

			for ( var j = 0, jl = d.hierarchy.length; j < jl; j ++ ) {

				newData.hierarchy.push( {
					keys: [],
					sids: []
				} );

			}

		}

		return newData;

	};

	function calcAnimationBounds () {

		var start = 1000000;
		var end = -start;
		var frames = 0;

		for ( var id in animations ) {

			var animation = animations[ id ];

			for ( var i = 0; i < animation.sampler.length; i ++ ) {

				var sampler = animation.sampler[ i ];
				sampler.create();

				start = Math.min( start, sampler.startTime );
				end = Math.max( end, sampler.endTime );
				frames = Math.max( frames, sampler.input.length );

			}

		}

		return { start:start, end:end, frames:frames };

	};

	function createMorph ( geometry, ctrl ) {

		var morphCtrl = ctrl instanceof InstanceController ? controllers[ ctrl.url ] : ctrl;

		if ( !morphCtrl || !morphCtrl.morph ) {

			console.log("could not find morph controller!");
			return;

		}

		var morph = morphCtrl.morph;

		for ( var i = 0; i < morph.targets.length; i ++ ) {

			var target_id = morph.targets[ i ];
			var daeGeometry = geometries[ target_id ];

			if ( !daeGeometry.mesh ||
				 !daeGeometry.mesh.primitives ||
				 !daeGeometry.mesh.primitives.length ) {
				 continue;
			}

			var target = daeGeometry.mesh.primitives[ 0 ].geometry;

			if ( target.vertices.length === geometry.vertices.length ) {

				geometry.morphTargets.push( { name: "target_1", vertices: target.vertices } );

			}

		}

		geometry.morphTargets.push( { name: "target_Z", vertices: geometry.vertices } );

	};

	function createSkin ( geometry, ctrl, applyBindShape ) {

		var skinCtrl = controllers[ ctrl.url ];

		if ( !skinCtrl || !skinCtrl.skin ) {

			console.log( "could not find skin controller!" );
			return;

		}

		if ( !ctrl.skeleton || !ctrl.skeleton.length ) {

			console.log( "could not find the skeleton for the skin!" );
			return;

		}

		var skin = skinCtrl.skin;
		var skeleton = daeScene.getChildById( ctrl.skeleton[ 0 ] );
		var hierarchy = [];

		applyBindShape = applyBindShape !== undefined ? applyBindShape : true;

		var bones = [];
		geometry.skinWeights = [];
		geometry.skinIndices = [];

		//createBones( geometry.bones, skin, hierarchy, skeleton, null, -1 );
		//createWeights( skin, geometry.bones, geometry.skinIndices, geometry.skinWeights );

		/*
		geometry.animation = {
			name: 'take_001',
			fps: 30,
			length: 2,
			JIT: true,
			hierarchy: hierarchy
		};
		*/

		if ( applyBindShape ) {

			for ( var i = 0; i < geometry.vertices.length; i ++ ) {

				geometry.vertices[ i ].applyMatrix4( skin.bindShapeMatrix );

			}

		}

	};

	function setupSkeleton ( node, bones, frame, parent ) {

		node.world = node.world || new THREE.Matrix4();
		node.world.copy( node.matrix );

		if ( node.channels && node.channels.length ) {

			var channel = node.channels[ 0 ];
			var m = channel.sampler.output[ frame ];

			if ( m instanceof THREE.Matrix4 ) {

				node.world.copy( m );

			}

		}

		if ( parent ) {

			node.world.multiplyMatrices( parent, node.world );

		}

		bones.push( node );

		for ( var i = 0; i < node.nodes.length; i ++ ) {

			setupSkeleton( node.nodes[ i ], bones, frame, node.world );

		}

	};

	function setupSkinningMatrices ( bones, skin ) {

		// FIXME: this is dumb...

		for ( var i = 0; i < bones.length; i ++ ) {

			var bone = bones[ i ];
			var found = -1;

			if ( bone.type != 'JOINT' ) continue;

			for ( var j = 0; j < skin.joints.length; j ++ ) {

				if ( bone.sid == skin.joints[ j ] ) {

					found = j;
					break;

				}

			}

			if ( found >= 0 ) {

				var inv = skin.invBindMatrices[ found ];

				bone.invBindMatrix = inv;
				bone.skinningMatrix = new THREE.Matrix4();
				bone.skinningMatrix.multiplyMatrices(bone.world, inv); // (IBMi * JMi)

				bone.weights = [];

				for ( var j = 0; j < skin.weights.length; j ++ ) {

					for (var k = 0; k < skin.weights[ j ].length; k ++) {

						var w = skin.weights[ j ][ k ];

						if ( w.joint == found ) {

							bone.weights.push( w );

						}

					}

				}

			} else {

				throw 'ColladaLoader: Could not find joint \'' + bone.sid + '\'.';

			}

		}

	};

	function applySkin ( geometry, instanceCtrl, frame ) {

		var skinController = controllers[ instanceCtrl.url ];

		frame = frame !== undefined ? frame : 40;

		if ( !skinController || !skinController.skin ) {

			console.log( 'ColladaLoader: Could not find skin controller.' );
			return;

		}

		if ( !instanceCtrl.skeleton || !instanceCtrl.skeleton.length ) {

			console.log( 'ColladaLoader: Could not find the skeleton for the skin. ' );
			return;

		}

		var animationBounds = calcAnimationBounds();
		var skeleton = daeScene.getChildById( instanceCtrl.skeleton[0], true ) ||
					   daeScene.getChildBySid( instanceCtrl.skeleton[0], true );

		var i, j, w, vidx, weight;
		var v = new THREE.Vector3(), o, s;

		// move vertices to bind shape

		for ( i = 0; i < geometry.vertices.length; i ++ ) {

			geometry.vertices[i].applyMatrix4( skinController.skin.bindShapeMatrix );

		}

		// process animation, or simply pose the rig if no animation

		for ( frame = 0; frame < animationBounds.frames; frame ++ ) {

			var bones = [];
			var skinned = [];

			// zero skinned vertices

			for ( i = 0; i < geometry.vertices.length; i++ ) {

				skinned.push( new THREE.Vector3() );

			}

			// process the frame and setup the rig with a fresh
			// transform, possibly from the bone's animation channel(s)

			setupSkeleton( skeleton, bones, frame );
			setupSkinningMatrices( bones, skinController.skin );

			// skin 'm

			for ( i = 0; i < bones.length; i ++ ) {

				if ( bones[ i ].type != 'JOINT' ) continue;

				for ( j = 0; j < bones[ i ].weights.length; j ++ ) {

					w = bones[ i ].weights[ j ];
					vidx = w.index;
					weight = w.weight;

					o = geometry.vertices[vidx];
					s = skinned[vidx];

					v.x = o.x;
					v.y = o.y;
					v.z = o.z;

					v.applyMatrix4( bones[i].skinningMatrix );

					s.x += (v.x * weight);
					s.y += (v.y * weight);
					s.z += (v.z * weight);

				}

			}

			geometry.morphTargets.push( { name: "target_" + frame, vertices: skinned } );

		}

	};

	function createSceneGraph ( node, parent ) {

		var obj = new THREE.Object3D();
		var skinned = false;
		var skinController;
		var morphController;
		var i, j;

		// FIXME: controllers

		for ( i = 0; i < node.controllers.length; i ++ ) {

			var controller = controllers[ node.controllers[ i ].url ];

			switch ( controller.type ) {

				case 'skin':

					if ( geometries[ controller.skin.source ] ) {

						var inst_geom = new InstanceGeometry();

						inst_geom.url = controller.skin.source;
						inst_geom.instance_material = node.controllers[ i ].instance_material;

						node.geometries.push( inst_geom );
						skinned = true;
						skinController = node.controllers[ i ];

					} else if ( controllers[ controller.skin.source ] ) {

						// urgh: controller can be chained
						// handle the most basic case...

						var second = controllers[ controller.skin.source ];
						morphController = second;
					//	skinController = node.controllers[i];

						if ( second.morph && geometries[ second.morph.source ] ) {

							var inst_geom = new InstanceGeometry();

							inst_geom.url = second.morph.source;
							inst_geom.instance_material = node.controllers[ i ].instance_material;

							node.geometries.push( inst_geom );

						}

					}

					break;

				case 'morph':

					if ( geometries[ controller.morph.source ] ) {

						var inst_geom = new InstanceGeometry();

						inst_geom.url = controller.morph.source;
						inst_geom.instance_material = node.controllers[ i ].instance_material;

						node.geometries.push( inst_geom );
						morphController = node.controllers[ i ];

					}

					console.log( 'ColladaLoader: Morph-controller partially supported.' );

				default:
					break;

			}

		}

		// geometries

		var double_sided_materials = {};

		for ( i = 0; i < node.geometries.length; i ++ ) {

			var instance_geometry = node.geometries[i];
			var instance_materials = instance_geometry.instance_material;
			var geometry = geometries[ instance_geometry.url ];
			var used_materials = {};
			var used_materials_array = [];
			var num_materials = 0;
			var first_material;

			if ( geometry ) {

				if ( !geometry.mesh || !geometry.mesh.primitives )
					continue;

				if ( obj.name.length == 0 ) {

					obj.name = geometry.id;

				}

				// collect used fx for this geometry-instance

				if ( instance_materials ) {

					for ( j = 0; j < instance_materials.length; j ++ ) {

						var instance_material = instance_materials[ j ];
						var mat = materials[ instance_material.target ];
						var effect_id = mat.instance_effect.url;
						var shader = effects[ effect_id ].shader;
						var material3js = shader.material;

						if ( geometry.doubleSided ) {

							if ( !( instance_material.symbol in double_sided_materials ) ) {

								var _copied_material = material3js.clone();
								_copied_material.side = THREE.DoubleSide;
								double_sided_materials[ instance_material.symbol ] = _copied_material;

							}

							material3js = double_sided_materials[ instance_material.symbol ];

						}

						material3js.opacity = !material3js.opacity ? 1 : material3js.opacity;
						used_materials[ instance_material.symbol ] = num_materials;
						used_materials_array.push( material3js );
						first_material = material3js;
						first_material.name = mat.name == null || mat.name === '' ? mat.id : mat.name;
						num_materials ++;

					}

				}

				var mesh;
				var material = first_material || new THREE.MeshLambertMaterial( { color: 0xdddddd, shading: THREE.FlatShading, side: geometry.doubleSided ? THREE.DoubleSide : THREE.FrontSide } );
				var geom = geometry.mesh.geometry3js;

				if ( num_materials > 1 ) {

					material = new THREE.MeshFaceMaterial( used_materials_array );

					for ( j = 0; j < geom.faces.length; j ++ ) {

						var face = geom.faces[ j ];
						face.materialIndex = used_materials[ face.daeMaterial ]

					}

				}

				if ( skinController !== undefined ) {

					applySkin( geom, skinController );

					material.morphTargets = true;

					mesh = new THREE.SkinnedMesh( geom, material, false );
					mesh.skeleton = skinController.skeleton;
					mesh.skinController = controllers[ skinController.url ];
					mesh.skinInstanceController = skinController;
					mesh.name = 'skin_' + skins.length;

					skins.push( mesh );

				} else if ( morphController !== undefined ) {

					createMorph( geom, morphController );

					material.morphTargets = true;

					mesh = new THREE.Mesh( geom, material );
					mesh.name = 'morph_' + morphs.length;

					morphs.push( mesh );

				} else {

					mesh = new THREE.Mesh( geom, material );
					// mesh.geom.name = geometry.id;

				}

				node.geometries.length > 1 ? obj.add( mesh ) : obj = mesh;

			}

		}

		for ( i = 0; i < node.cameras.length; i ++ ) {

			var instance_camera = node.cameras[i];
			var cparams = cameras[instance_camera.url];

			obj = new THREE.PerspectiveCamera(cparams.fov, parseFloat(cparams.aspect_ratio), 
					parseFloat(cparams.znear), parseFloat(cparams.zfar));

		}

		for ( i = 0; i < node.lights.length; i ++ ) {

			var instance_light = node.lights[i];
			var lparams = lights[instance_light.url];

			if ( lparams && lparams.technique ) {

				var color = lparams.color.getHex();
				var intensity = lparams.intensity;
				var distance = 0;
				var angle = lparams.falloff_angle;
				var exponent; // Intentionally undefined, don't know what this is yet

				switch ( lparams.technique ) {

					case 'directional':

						obj = new THREE.DirectionalLight( color, intensity, distance );
						break;

					case 'point':

						obj = new THREE.PointLight( color, intensity, distance );
						break;

					case 'spot':

						obj = new THREE.SpotLight( color, intensity, distance, angle, exponent );
						break;

					case 'ambient':

						obj = new THREE.AmbientLight( color );
						break;

				}

			}

		}

		obj.name = node.name || node.id || "";
		obj.matrix = node.matrix;
		obj.matrix.decompose( obj.position, obj.quaternion, obj.scale );

		if ( options.centerGeometry && obj.geometry ) {
				//var delta = THREE.GeometryUtils.center( obj.geometry );
				//delta.multiply( obj.scale );
				//delta.applyQuaternion( obj.quaternion );
				//obj.position.sub( delta );
				var geo = obj.geometry;
				geo.computeBoundingBox();
				var bb = geo.boundingBox;
				var offset = new THREE.Vector3();
				offset.addVectors(bb.min, bb.max);
				offset.multiplyScalar( - 0.5);
				geo.applyMatrix(new THREE.Matrix4().makeTranslation(offset.x, offset.y, offset.z));
				geo.computeBoundingBox();
		}

		for ( i = 0; i < node.nodes.length; i ++ ) {

			obj.add( createSceneGraph( node.nodes[i], node ) );

		}

		return obj;

	};

	function getJointId( skin, id ) {

		for ( var i = 0; i < skin.joints.length; i ++ ) {

			if ( skin.joints[ i ] == id ) {

				return i;

			}

		}

	};

	function getLibraryNode( id ) {

		return COLLADA.evaluate( './/dae:library_nodes//dae:node[@id=\'' + id + '\']', COLLADA, _nsResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null ).iterateNext();

	};

	function getChannelsForNode (node ) {

		var channels = [];
		var startTime = 1000000;
		var endTime = -1000000;

		for ( var id in animations ) {

			var animation = animations[id];

			for ( var i = 0; i < animation.channel.length; i ++ ) {

				var channel = animation.channel[i];
				var sampler = animation.sampler[i];
				var id = channel.target.split('/')[0];

				if ( id == node.id ) {

					sampler.create();
					channel.sampler = sampler;
					startTime = Math.min(startTime, sampler.startTime);
					endTime = Math.max(endTime, sampler.endTime);
					channels.push(channel);

				}

			}

		}

		if ( channels.length ) {

			node.startTime = startTime;
			node.endTime = endTime;

		}

		return channels;

	};

	function calcFrameDuration( node ) {

		var minT = 10000000;

		for ( var i = 0; i < node.channels.length; i ++ ) {

			var sampler = node.channels[i].sampler;

			for ( var j = 0; j < sampler.input.length - 1; j ++ ) {

				var t0 = sampler.input[ j ];
				var t1 = sampler.input[ j + 1 ];
				minT = Math.min( minT, t1 - t0 );

			}
		}

		return minT;

	};

	function calcMatrixAt( node, t ) {

		var animated = {};

		var i, j;

		for ( i = 0; i < node.channels.length; i ++ ) {

			var channel = node.channels[ i ];
			animated[ channel.sid ] = channel;

		}

		var matrix = new THREE.Matrix4();

		for ( i = 0; i < node.transforms.length; i ++ ) {

			var transform = node.transforms[ i ];
			var channel = animated[ transform.sid ];

			if ( channel !== undefined ) {

				var sampler = channel.sampler;
				var value;

				for ( j = 0; j < sampler.input.length - 1; j ++ ) {

					if ( sampler.input[ j + 1 ] > t ) {

						value = sampler.output[ j ];
						//console.log(value.flatten)
						break;

					}

				}

				if ( value !== undefined ) {

					if ( value instanceof THREE.Matrix4 ) {

						matrix.multiplyMatrices( matrix, value );

					} else {

						// FIXME: handle other types

						matrix.multiplyMatrices( matrix, transform.matrix );

					}

				} else {

					matrix.multiplyMatrices( matrix, transform.matrix );

				}

			} else {

				matrix.multiplyMatrices( matrix, transform.matrix );

			}

		}

		return matrix;

	};

	function bakeAnimations ( node ) {

		if ( node.channels && node.channels.length ) {

			var keys = [],
				sids = [];

			for ( var i = 0, il = node.channels.length; i < il; i++ ) {

				var channel = node.channels[i],
					fullSid = channel.fullSid,
					sampler = channel.sampler,
					input = sampler.input,
					transform = node.getTransformBySid( channel.sid ),
					member;

				if ( channel.arrIndices ) {

					member = [];

					for ( var j = 0, jl = channel.arrIndices.length; j < jl; j++ ) {

						member[ j ] = getConvertedIndex( channel.arrIndices[ j ] );

					}

				} else {

					member = getConvertedMember( channel.member );

				}

				if ( transform ) {

					if ( sids.indexOf( fullSid ) === -1 ) {

						sids.push( fullSid );

					}

					for ( var j = 0, jl = input.length; j < jl; j++ ) {

						var time = input[j],
							data = sampler.getData( transform.type, j ),
							key = findKey( keys, time );

						if ( !key ) {

							key = new Key( time );
							var timeNdx = findTimeNdx( keys, time );
							keys.splice( timeNdx == -1 ? keys.length : timeNdx, 0, key );

						}

						key.addTarget( fullSid, transform, member, data );

					}

				} else {

					console.log( 'Could not find transform "' + channel.sid + '" in node ' + node.id );

				}

			}

			// post process
			for ( var i = 0; i < sids.length; i++ ) {

				var sid = sids[ i ];

				for ( var j = 0; j < keys.length; j++ ) {

					var key = keys[ j ];

					if ( !key.hasTarget( sid ) ) {

						interpolateKeys( keys, key, j, sid );

					}

				}

			}

			node.keys = keys;
			node.sids = sids;

		}

	};

	function findKey ( keys, time) {

		var retVal = null;

		for ( var i = 0, il = keys.length; i < il && retVal == null; i++ ) {

			var key = keys[i];

			if ( key.time === time ) {

				retVal = key;

			} else if ( key.time > time ) {

				break;

			}

		}

		return retVal;

	};

	function findTimeNdx ( keys, time) {

		var ndx = -1;

		for ( var i = 0, il = keys.length; i < il && ndx == -1; i++ ) {

			var key = keys[i];

			if ( key.time >= time ) {

				ndx = i;

			}

		}

		return ndx;

	};

	function interpolateKeys ( keys, key, ndx, fullSid ) {

		var prevKey = getPrevKeyWith( keys, fullSid, ndx ? ndx-1 : 0 ),
			nextKey = getNextKeyWith( keys, fullSid, ndx+1 );

		if ( prevKey && nextKey ) {

			var scale = (key.time - prevKey.time) / (nextKey.time - prevKey.time),
				prevTarget = prevKey.getTarget( fullSid ),
				nextData = nextKey.getTarget( fullSid ).data,
				prevData = prevTarget.data,
				data;

			if ( prevTarget.type === 'matrix' ) {

				data = prevData;

			} else if ( prevData.length ) {

				data = [];

				for ( var i = 0; i < prevData.length; ++i ) {

					data[ i ] = prevData[ i ] + ( nextData[ i ] - prevData[ i ] ) * scale;

				}

			} else {

				data = prevData + ( nextData - prevData ) * scale;

			}

			key.addTarget( fullSid, prevTarget.transform, prevTarget.member, data );

		}

	};

	// Get next key with given sid

	function getNextKeyWith( keys, fullSid, ndx ) {

		for ( ; ndx < keys.length; ndx++ ) {

			var key = keys[ ndx ];

			if ( key.hasTarget( fullSid ) ) {

				return key;

			}

		}

		return null;

	};

	// Get previous key with given sid

	function getPrevKeyWith( keys, fullSid, ndx ) {

		ndx = ndx >= 0 ? ndx : ndx + keys.length;

		for ( ; ndx >= 0; ndx-- ) {

			var key = keys[ ndx ];

			if ( key.hasTarget( fullSid ) ) {

				return key;

			}

		}

		return null;

	};

	function _Image() {

		this.id = "";
		this.init_from = "";

	};

	_Image.prototype.parse = function(element) {

		this.id = element.getAttribute('id');

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];

			if ( child.nodeName == 'init_from' ) {

				this.init_from = child.textContent;

			}

		}

		return this;

	};

	function Controller() {

		this.id = "";
		this.name = "";
		this.type = "";
		this.skin = null;
		this.morph = null;

	};

	Controller.prototype.parse = function( element ) {

		this.id = element.getAttribute('id');
		this.name = element.getAttribute('name');
		this.type = "none";

		for ( var i = 0; i < element.childNodes.length; i++ ) {

			var child = element.childNodes[ i ];

			switch ( child.nodeName ) {

				case 'skin':

					this.skin = (new Skin()).parse(child);
					this.type = child.nodeName;
					break;

				case 'morph':

					this.morph = (new Morph()).parse(child);
					this.type = child.nodeName;
					break;

				default:
					break;

			}
		}

		return this;

	};

	function Morph() {

		this.method = null;
		this.source = null;
		this.targets = null;
		this.weights = null;

	};

	Morph.prototype.parse = function( element ) {

		var sources = {};
		var inputs = [];
		var i;

		this.method = element.getAttribute( 'method' );
		this.source = element.getAttribute( 'source' ).replace( /^#/, '' );

		for ( i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];
			if ( child.nodeType != 1 ) continue;

			switch ( child.nodeName ) {

				case 'source':

					var source = ( new Source() ).parse( child );
					sources[ source.id ] = source;
					break;

				case 'targets':

					inputs = this.parseInputs( child );
					break;

				default:

					console.log( child.nodeName );
					break;

			}

		}

		for ( i = 0; i < inputs.length; i ++ ) {

			var input = inputs[ i ];
			var source = sources[ input.source ];

			switch ( input.semantic ) {

				case 'MORPH_TARGET':

					this.targets = source.read();
					break;

				case 'MORPH_WEIGHT':

					this.weights = source.read();
					break;

				default:
					break;

			}
		}

		return this;

	};

	Morph.prototype.parseInputs = function(element) {

		var inputs = [];

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[i];
			if ( child.nodeType != 1) continue;

			switch ( child.nodeName ) {

				case 'input':

					inputs.push( (new Input()).parse(child) );
					break;

				default:
					break;
			}
		}

		return inputs;

	};

	function Skin() {

		this.source = "";
		this.bindShapeMatrix = null;
		this.invBindMatrices = [];
		this.joints = [];
		this.weights = [];

	};

	Skin.prototype.parse = function( element ) {

		var sources = {};
		var joints, weights;

		this.source = element.getAttribute( 'source' ).replace( /^#/, '' );
		this.invBindMatrices = [];
		this.joints = [];
		this.weights = [];

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[i];
			if ( child.nodeType != 1 ) continue;

			switch ( child.nodeName ) {

				case 'bind_shape_matrix':

					var f = _floats(child.textContent);
					this.bindShapeMatrix = getConvertedMat4( f );
					break;

				case 'source':

					var src = new Source().parse(child);
					sources[ src.id ] = src;
					break;

				case 'joints':

					joints = child;
					break;

				case 'vertex_weights':

					weights = child;
					break;

				default:

					console.log( child.nodeName );
					break;

			}
		}

		this.parseJoints( joints, sources );
		this.parseWeights( weights, sources );

		return this;

	};

	Skin.prototype.parseJoints = function ( element, sources ) {

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];
			if ( child.nodeType != 1 ) continue;

			switch ( child.nodeName ) {

				case 'input':

					var input = ( new Input() ).parse( child );
					var source = sources[ input.source ];

					if ( input.semantic == 'JOINT' ) {

						this.joints = source.read();

					} else if ( input.semantic == 'INV_BIND_MATRIX' ) {

						this.invBindMatrices = source.read();

					}

					break;

				default:
					break;
			}

		}

	};

	Skin.prototype.parseWeights = function ( element, sources ) {

		var v, vcount, inputs = [];

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];
			if ( child.nodeType != 1 ) continue;

			switch ( child.nodeName ) {

				case 'input':

					inputs.push( ( new Input() ).parse( child ) );
					break;

				case 'v':

					v = _ints( child.textContent );
					break;

				case 'vcount':

					vcount = _ints( child.textContent );
					break;

				default:
					break;

			}

		}

		var index = 0;

		for ( var i = 0; i < vcount.length; i ++ ) {

			var numBones = vcount[i];
			var vertex_weights = [];

			for ( var j = 0; j < numBones; j++ ) {

				var influence = {};

				for ( var k = 0; k < inputs.length; k ++ ) {

					var input = inputs[ k ];
					var value = v[ index + input.offset ];

					switch ( input.semantic ) {

						case 'JOINT':

							influence.joint = value;//this.joints[value];
							break;

						case 'WEIGHT':

							influence.weight = sources[ input.source ].data[ value ];
							break;

						default:
							break;

					}

				}

				vertex_weights.push( influence );
				index += inputs.length;
			}

			for ( var j = 0; j < vertex_weights.length; j ++ ) {

				vertex_weights[ j ].index = i;

			}

			this.weights.push( vertex_weights );

		}

	};

	function VisualScene () {

		this.id = "";
		this.name = "";
		this.nodes = [];
		this.scene = new THREE.Object3D();

	};

	VisualScene.prototype.getChildById = function( id, recursive ) {

		for ( var i = 0; i < this.nodes.length; i ++ ) {

			var node = this.nodes[ i ].getChildById( id, recursive );

			if ( node ) {

				return node;

			}

		}

		return null;

	};

	VisualScene.prototype.getChildBySid = function( sid, recursive ) {

		for ( var i = 0; i < this.nodes.length; i ++ ) {

			var node = this.nodes[ i ].getChildBySid( sid, recursive );

			if ( node ) {

				return node;

			}

		}

		return null;

	};

	VisualScene.prototype.parse = function( element ) {

		this.id = element.getAttribute( 'id' );
		this.name = element.getAttribute( 'name' );
		this.nodes = [];

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];
			if ( child.nodeType != 1 ) continue;

			switch ( child.nodeName ) {

				case 'node':

					this.nodes.push( ( new Node() ).parse( child ) );
					break;

				default:
					break;

			}

		}

		return this;

	};

	function Node() {

		this.id = "";
		this.name = "";
		this.sid = "";
		this.nodes = [];
		this.controllers = [];
		this.transforms = [];
		this.geometries = [];
		this.channels = [];
		this.matrix = new THREE.Matrix4();

	};

	Node.prototype.getChannelForTransform = function( transformSid ) {

		for ( var i = 0; i < this.channels.length; i ++ ) {

			var channel = this.channels[i];
			var parts = channel.target.split('/');
			var id = parts.shift();
			var sid = parts.shift();
			var dotSyntax = (sid.indexOf(".") >= 0);
			var arrSyntax = (sid.indexOf("(") >= 0);
			var arrIndices;
			var member;

			if ( dotSyntax ) {

				parts = sid.split(".");
				sid = parts.shift();
				member = parts.shift();

			} else if ( arrSyntax ) {

				arrIndices = sid.split("(");
				sid = arrIndices.shift();

				for ( var j = 0; j < arrIndices.length; j ++ ) {

					arrIndices[ j ] = parseInt( arrIndices[ j ].replace( /\)/, '' ) );

				}

			}

			if ( sid == transformSid ) {

				channel.info = { sid: sid, dotSyntax: dotSyntax, arrSyntax: arrSyntax, arrIndices: arrIndices };
				return channel;

			}

		}

		return null;

	};

	Node.prototype.getChildById = function ( id, recursive ) {

		if ( this.id == id ) {

			return this;

		}

		if ( recursive ) {

			for ( var i = 0; i < this.nodes.length; i ++ ) {

				var n = this.nodes[ i ].getChildById( id, recursive );

				if ( n ) {

					return n;

				}

			}

		}

		return null;

	};

	Node.prototype.getChildBySid = function ( sid, recursive ) {

		if ( this.sid == sid ) {

			return this;

		}

		if ( recursive ) {

			for ( var i = 0; i < this.nodes.length; i ++ ) {

				var n = this.nodes[ i ].getChildBySid( sid, recursive );

				if ( n ) {

					return n;

				}

			}
		}

		return null;

	};

	Node.prototype.getTransformBySid = function ( sid ) {

		for ( var i = 0; i < this.transforms.length; i ++ ) {

			if ( this.transforms[ i ].sid == sid ) return this.transforms[ i ];

		}

		return null;

	};

	Node.prototype.parse = function( element ) {

		var url;

		this.id = element.getAttribute('id');
		this.sid = element.getAttribute('sid');
		this.name = element.getAttribute('name');
		this.type = element.getAttribute('type');

		this.type = this.type == 'JOINT' ? this.type : 'NODE';

		this.nodes = [];
		this.transforms = [];
		this.geometries = [];
		this.cameras = [];
		this.lights = [];
		this.controllers = [];
		this.matrix = new THREE.Matrix4();

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];
			if ( child.nodeType != 1 ) continue;

			switch ( child.nodeName ) {

				case 'node':

					this.nodes.push( ( new Node() ).parse( child ) );
					break;

				case 'instance_camera':

					this.cameras.push( ( new InstanceCamera() ).parse( child ) );
					break;

				case 'instance_controller':

					this.controllers.push( ( new InstanceController() ).parse( child ) );
					break;

				case 'instance_geometry':

					this.geometries.push( ( new InstanceGeometry() ).parse( child ) );
					break;

				case 'instance_light':

					this.lights.push( ( new InstanceLight() ).parse( child ) );
					break;

				case 'instance_node':

					url = child.getAttribute( 'url' ).replace( /^#/, '' );
					var iNode = getLibraryNode( url );

					if ( iNode ) {

						this.nodes.push( ( new Node() ).parse( iNode )) ;

					}

					break;

				case 'rotate':
				case 'translate':
				case 'scale':
				case 'matrix':
				case 'lookat':
				case 'skew':

					this.transforms.push( ( new Transform() ).parse( child ) );
					break;

				case 'extra':
					break;

				default:

					console.log( child.nodeName );
					break;

			}

		}

		this.channels = getChannelsForNode( this );
		bakeAnimations( this );

		this.updateMatrix();

		return this;

	};

	Node.prototype.updateMatrix = function () {

		this.matrix.identity();

		for ( var i = 0; i < this.transforms.length; i ++ ) {

			this.transforms[ i ].apply( this.matrix );

		}

	};

	function Transform () {

		this.sid = "";
		this.type = "";
		this.data = [];
		this.obj = null;

	};

	Transform.prototype.parse = function ( element ) {

		this.sid = element.getAttribute( 'sid' );
		this.type = element.nodeName;
		this.data = _floats( element.textContent );
		this.convert();

		return this;

	};

	Transform.prototype.convert = function () {

		switch ( this.type ) {

			case 'matrix':

				this.obj = getConvertedMat4( this.data );
				break;

			case 'rotate':

				this.angle = THREE.Math.degToRad( this.data[3] );

			case 'translate':

				fixCoords( this.data, -1 );
				this.obj = new THREE.Vector3( this.data[ 0 ], this.data[ 1 ], this.data[ 2 ] );
				break;

			case 'scale':

				fixCoords( this.data, 1 );
				this.obj = new THREE.Vector3( this.data[ 0 ], this.data[ 1 ], this.data[ 2 ] );
				break;

			default:
				console.log( 'Can not convert Transform of type ' + this.type );
				break;

		}

	};

	Transform.prototype.apply = function () {

		var m1 = new THREE.Matrix4();

		return function ( matrix ) {

			switch ( this.type ) {

				case 'matrix':

					matrix.multiply( this.obj );

					break;

				case 'translate':

					matrix.multiply( m1.makeTranslation( this.obj.x, this.obj.y, this.obj.z ) );

					break;

				case 'rotate':

					matrix.multiply( m1.makeRotationAxis( this.obj, this.angle ) );

					break;

				case 'scale':

					matrix.scale( this.obj );

					break;

			}

		};

	}();

	Transform.prototype.update = function ( data, member ) {

		var members = [ 'X', 'Y', 'Z', 'ANGLE' ];

		switch ( this.type ) {

			case 'matrix':

				if ( ! member ) {

					this.obj.copy( data );

				} else if ( member.length === 1 ) {

					switch ( member[ 0 ] ) {

						case 0:

							this.obj.n11 = data[ 0 ];
							this.obj.n21 = data[ 1 ];
							this.obj.n31 = data[ 2 ];
							this.obj.n41 = data[ 3 ];

							break;

						case 1:

							this.obj.n12 = data[ 0 ];
							this.obj.n22 = data[ 1 ];
							this.obj.n32 = data[ 2 ];
							this.obj.n42 = data[ 3 ];

							break;

						case 2:

							this.obj.n13 = data[ 0 ];
							this.obj.n23 = data[ 1 ];
							this.obj.n33 = data[ 2 ];
							this.obj.n43 = data[ 3 ];

							break;

						case 3:

							this.obj.n14 = data[ 0 ];
							this.obj.n24 = data[ 1 ];
							this.obj.n34 = data[ 2 ];
							this.obj.n44 = data[ 3 ];

							break;

					}

				} else if ( member.length === 2 ) {

					var propName = 'n' + ( member[ 0 ] + 1 ) + ( member[ 1 ] + 1 );
					this.obj[ propName ] = data;

				} else {

					console.log('Incorrect addressing of matrix in transform.');

				}

				break;

			case 'translate':
			case 'scale':

				if ( Object.prototype.toString.call( member ) === '[object Array]' ) {

					member = members[ member[ 0 ] ];

				}

				switch ( member ) {

					case 'X':

						this.obj.x = data;
						break;

					case 'Y':

						this.obj.y = data;
						break;

					case 'Z':

						this.obj.z = data;
						break;

					default:

						this.obj.x = data[ 0 ];
						this.obj.y = data[ 1 ];
						this.obj.z = data[ 2 ];
						break;

				}

				break;

			case 'rotate':

				if ( Object.prototype.toString.call( member ) === '[object Array]' ) {

					member = members[ member[ 0 ] ];

				}

				switch ( member ) {

					case 'X':

						this.obj.x = data;
						break;

					case 'Y':

						this.obj.y = data;
						break;

					case 'Z':

						this.obj.z = data;
						break;

					case 'ANGLE':

						this.angle = THREE.Math.degToRad( data );
						break;

					default:

						this.obj.x = data[ 0 ];
						this.obj.y = data[ 1 ];
						this.obj.z = data[ 2 ];
						this.angle = THREE.Math.degToRad( data[ 3 ] );
						break;

				}
				break;

		}

	};

	function InstanceController() {

		this.url = "";
		this.skeleton = [];
		this.instance_material = [];

	};

	InstanceController.prototype.parse = function ( element ) {

		this.url = element.getAttribute('url').replace(/^#/, '');
		this.skeleton = [];
		this.instance_material = [];

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];
			if ( child.nodeType !== 1 ) continue;

			switch ( child.nodeName ) {

				case 'skeleton':

					this.skeleton.push( child.textContent.replace(/^#/, '') );
					break;

				case 'bind_material':

					var instances = COLLADA.evaluate( './/dae:instance_material', child, _nsResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );

					if ( instances ) {

						var instance = instances.iterateNext();

						while ( instance ) {

							this.instance_material.push( (new InstanceMaterial()).parse(instance) );
							instance = instances.iterateNext();

						}

					}

					break;

				case 'extra':
					break;

				default:
					break;

			}
		}

		return this;

	};

	function InstanceMaterial () {

		this.symbol = "";
		this.target = "";

	};

	InstanceMaterial.prototype.parse = function ( element ) {

		this.symbol = element.getAttribute('symbol');
		this.target = element.getAttribute('target').replace(/^#/, '');
		return this;

	};

	function InstanceGeometry() {

		this.url = "";
		this.instance_material = [];

	};

	InstanceGeometry.prototype.parse = function ( element ) {

		this.url = element.getAttribute('url').replace(/^#/, '');
		this.instance_material = [];

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[i];
			if ( child.nodeType != 1 ) continue;

			if ( child.nodeName == 'bind_material' ) {

				var instances = COLLADA.evaluate( './/dae:instance_material', child, _nsResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );

				if ( instances ) {

					var instance = instances.iterateNext();

					while ( instance ) {

						this.instance_material.push( (new InstanceMaterial()).parse(instance) );
						instance = instances.iterateNext();

					}

				}

				break;

			}

		}

		return this;

	};

	function Geometry() {

		this.id = "";
		this.mesh = null;

	};

	Geometry.prototype.parse = function ( element ) {

		this.id = element.getAttribute('id');

		extractDoubleSided( this, element );

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[i];

			switch ( child.nodeName ) {

				case 'mesh':

					this.mesh = (new Mesh(this)).parse(child);
					break;

				case 'extra':

					// console.log( child );
					break;

				default:
					break;
			}
		}

		return this;

	};

	function Mesh( geometry ) {

		this.geometry = geometry.id;
		this.primitives = [];
		this.vertices = null;
		this.geometry3js = null;

	};

	Mesh.prototype.parse = function( element ) {

		this.primitives = [];

		var i, j;

		for ( i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];

			switch ( child.nodeName ) {

				case 'source':

					_source( child );
					break;

				case 'vertices':

					this.vertices = ( new Vertices() ).parse( child );
					break;

				case 'triangles':

					this.primitives.push( ( new Triangles().parse( child ) ) );
					break;

				case 'polygons':

					this.primitives.push( ( new Polygons().parse( child ) ) );
					break;

				case 'polylist':

					this.primitives.push( ( new Polylist().parse( child ) ) );
					break;

				default:
					break;

			}

		}

		this.geometry3js = new THREE.Geometry();

		var vertexData = sources[ this.vertices.input['POSITION'].source ].data;

		for ( i = 0; i < vertexData.length; i += 3 ) {

			this.geometry3js.vertices.push( getConvertedVec3( vertexData, i ).clone() );

		}

		for ( i = 0; i < this.primitives.length; i ++ ) {

			var primitive = this.primitives[ i ];
			primitive.setVertices( this.vertices );
			this.handlePrimitive( primitive, this.geometry3js );

		}

		this.geometry3js.computeCentroids();
		this.geometry3js.computeFaceNormals();

		if ( this.geometry3js.calcNormals ) {

			this.geometry3js.computeVertexNormals();
			delete this.geometry3js.calcNormals;

		}

		this.geometry3js.computeBoundingBox();

		return this;

	};

	Mesh.prototype.handlePrimitive = function( primitive, geom ) {

		var j, k, pList = primitive.p, inputs = primitive.inputs;
		var input, index, idx32;
		var source, numParams;
		var vcIndex = 0, vcount = 3, maxOffset = 0;
		var texture_sets = [];

		for ( j = 0; j < inputs.length; j ++ ) {

			input = inputs[ j ];
			var offset = input.offset + 1;
			maxOffset = (maxOffset < offset)? offset : maxOffset;

			switch ( input.semantic ) {

				case 'TEXCOORD':
					texture_sets.push( input.set );
					break;

			}

		}

		for ( var pCount = 0; pCount < pList.length; ++pCount ) {

			var p = pList[ pCount ], i = 0;

			while ( i < p.length ) {

				var vs = [];
				var ns = [];
				var ts = null;
				var cs = [];

				if ( primitive.vcount ) {

					vcount = primitive.vcount.length ? primitive.vcount[ vcIndex ++ ] : primitive.vcount;

				} else {

					vcount = p.length / maxOffset;

				}


				for ( j = 0; j < vcount; j ++ ) {

					for ( k = 0; k < inputs.length; k ++ ) {

						input = inputs[ k ];
						source = sources[ input.source ];

						index = p[ i + ( j * maxOffset ) + input.offset ];
						numParams = source.accessor.params.length;
						idx32 = index * numParams;

						switch ( input.semantic ) {

							case 'VERTEX':

								vs.push( index );

								break;

							case 'NORMAL':

								ns.push( getConvertedVec3( source.data, idx32 ) );

								break;

							case 'TEXCOORD':

								ts = ts || { };
								if ( ts[ input.set ] === undefined ) ts[ input.set ] = [];
								// invert the V
								ts[ input.set ].push( new THREE.Vector2( source.data[ idx32 ], source.data[ idx32 + 1 ] ) );

								break;

							case 'COLOR':

								cs.push( new THREE.Color().setRGB( source.data[ idx32 ], source.data[ idx32 + 1 ], source.data[ idx32 + 2 ] ) );

								break;

							default:

								break;

						}

					}

				}

				if ( ns.length == 0 ) {

					// check the vertices inputs
					input = this.vertices.input.NORMAL;

					if ( input ) {

						source = sources[ input.source ];
						numParams = source.accessor.params.length;

						for ( var ndx = 0, len = vs.length; ndx < len; ndx++ ) {

							ns.push( getConvertedVec3( source.data, vs[ ndx ] * numParams ) );

						}

					} else {

						geom.calcNormals = true;

					}

				}

				if ( !ts ) {

					ts = { };
					// check the vertices inputs
					input = this.vertices.input.TEXCOORD;

					if ( input ) {

						texture_sets.push( input.set );
						source = sources[ input.source ];
						numParams = source.accessor.params.length;

						for ( var ndx = 0, len = vs.length; ndx < len; ndx++ ) {

							idx32 = vs[ ndx ] * numParams;
							if ( ts[ input.set ] === undefined ) ts[ input.set ] = [ ];
							// invert the V
							ts[ input.set ].push( new THREE.Vector2( source.data[ idx32 ], 1.0 - source.data[ idx32 + 1 ] ) );

						}

					}

				}

				if ( cs.length == 0 ) {

					// check the vertices inputs
					input = this.vertices.input.COLOR;

					if ( input ) {

						source = sources[ input.source ];
						numParams = source.accessor.params.length;

						for ( var ndx = 0, len = vs.length; ndx < len; ndx++ ) {

							idx32 = vs[ ndx ] * numParams;
							cs.push( new THREE.Color().setRGB( source.data[ idx32 ], source.data[ idx32 + 1 ], source.data[ idx32 + 2 ] ) );

						}

					}

				}

				var face = null, faces = [], uv, uvArr;

				if ( vcount === 3 ) {

					faces.push( new THREE.Face3( vs[0], vs[1], vs[2], ns, cs.length ? cs : new THREE.Color() ) );

				} else if ( vcount === 4 ) {
					faces.push( new THREE.Face4( vs[0], vs[1], vs[2], vs[3], ns, cs.length ? cs : new THREE.Color() ) );

				} else if ( vcount > 4 && options.subdivideFaces ) {

					var clr = cs.length ? cs : new THREE.Color(),
						vec1, vec2, vec3, v1, v2, norm;

					// subdivide into multiple Face3s

					for ( k = 1; k < vcount - 1; ) {

						// FIXME: normals don't seem to be quite right

						faces.push( new THREE.Face3( vs[0], vs[k], vs[k+1], [ ns[0], ns[k++], ns[k] ],  clr ) );

					}

				}

				if ( faces.length ) {

					for ( var ndx = 0, len = faces.length; ndx < len; ndx ++ ) {

						face = faces[ndx];
						face.daeMaterial = primitive.material;
						geom.faces.push( face );

						for ( k = 0; k < texture_sets.length; k++ ) {

							uv = ts[ texture_sets[k] ];

							if ( vcount > 4 ) {

								// Grab the right UVs for the vertices in this face
								uvArr = [ uv[0], uv[ndx+1], uv[ndx+2] ];

							} else if ( vcount === 4 ) {

								uvArr = [ uv[0], uv[1], uv[2], uv[3] ];

							} else {

								uvArr = [ uv[0], uv[1], uv[2] ];

							}

							if ( !geom.faceVertexUvs[k] ) {

								geom.faceVertexUvs[k] = [];

							}

							geom.faceVertexUvs[k].push( uvArr );

						}

					}

				} else {

					console.log( 'dropped face with vcount ' + vcount + ' for geometry with id: ' + geom.id );

				}

				i += maxOffset * vcount;

			}
		}

	};

	function Polygons () {

		this.material = "";
		this.count = 0;
		this.inputs = [];
		this.vcount = null;
		this.p = [];
		this.geometry = new THREE.Geometry();

	};

	Polygons.prototype.setVertices = function ( vertices ) {

		for ( var i = 0; i < this.inputs.length; i ++ ) {

			if ( this.inputs[ i ].source == vertices.id ) {

				this.inputs[ i ].source = vertices.input[ 'POSITION' ].source;

			}

		}

	};

	Polygons.prototype.parse = function ( element ) {

		this.material = element.getAttribute( 'material' );
		this.count = _attr_as_int( element, 'count', 0 );

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];

			switch ( child.nodeName ) {

				case 'input':

					this.inputs.push( ( new Input() ).parse( element.childNodes[ i ] ) );
					break;

				case 'vcount':

					this.vcount = _ints( child.textContent );
					break;

				case 'p':

					this.p.push( _ints( child.textContent ) );
					break;

				case 'ph':

					console.warn( 'polygon holes not yet supported!' );
					break;

				default:
					break;

			}

		}

		return this;

	};

	function Polylist () {

		Polygons.call( this );

		this.vcount = [];

	};

	Polylist.prototype = Object.create( Polygons.prototype );

	function Triangles () {

		Polygons.call( this );

		this.vcount = 3;

	};

	Triangles.prototype = Object.create( Polygons.prototype );

	function Accessor() {

		this.source = "";
		this.count = 0;
		this.stride = 0;
		this.params = [];

	};

	Accessor.prototype.parse = function ( element ) {

		this.params = [];
		this.source = element.getAttribute( 'source' );
		this.count = _attr_as_int( element, 'count', 0 );
		this.stride = _attr_as_int( element, 'stride', 0 );

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];

			if ( child.nodeName == 'param' ) {

				var param = {};
				param[ 'name' ] = child.getAttribute( 'name' );
				param[ 'type' ] = child.getAttribute( 'type' );
				this.params.push( param );

			}

		}

		return this;

	};

	function Vertices() {

		this.input = {};

	};

	Vertices.prototype.parse = function ( element ) {

		this.id = element.getAttribute('id');

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			if ( element.childNodes[i].nodeName == 'input' ) {

				var input = ( new Input() ).parse( element.childNodes[ i ] );
				this.input[ input.semantic ] = input;

			}

		}

		return this;

	};

	function Input () {

		this.semantic = "";
		this.offset = 0;
		this.source = "";
		this.set = 0;

	};

	Input.prototype.parse = function ( element ) {

		this.semantic = element.getAttribute('semantic');
		this.source = element.getAttribute('source').replace(/^#/, '');
		this.set = _attr_as_int(element, 'set', -1);
		this.offset = _attr_as_int(element, 'offset', 0);

		if ( this.semantic == 'TEXCOORD' && this.set < 0 ) {

			this.set = 0;

		}

		return this;

	};

	function Source ( id ) {

		this.id = id;
		this.type = null;

	};

	Source.prototype.parse = function ( element ) {

		this.id = element.getAttribute( 'id' );

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[i];

			switch ( child.nodeName ) {

				case 'bool_array':

					this.data = _bools( child.textContent );
					this.type = child.nodeName;
					break;

				case 'float_array':

					this.data = _floats( child.textContent );
					this.type = child.nodeName;
					break;

				case 'int_array':

					this.data = _ints( child.textContent );
					this.type = child.nodeName;
					break;

				case 'IDREF_array':
				case 'Name_array':

					this.data = _strings( child.textContent );
					this.type = child.nodeName;
					break;

				case 'technique_common':

					for ( var j = 0; j < child.childNodes.length; j ++ ) {

						if ( child.childNodes[ j ].nodeName == 'accessor' ) {

							this.accessor = ( new Accessor() ).parse( child.childNodes[ j ] );
							break;

						}
					}
					break;

				default:
					// console.log(child.nodeName);
					break;

			}

		}

		return this;

	};

	Source.prototype.read = function () {

		var result = [];

		//for (var i = 0; i < this.accessor.params.length; i++) {

			var param = this.accessor.params[ 0 ];

			//console.log(param.name + " " + param.type);

			switch ( param.type ) {

				case 'IDREF':
				case 'Name': case 'name':
				case 'float':

					return this.data;

				case 'float4x4':

					for ( var j = 0; j < this.data.length; j += 16 ) {

						var s = this.data.slice( j, j + 16 );
						var m = getConvertedMat4( s );
						result.push( m );
					}

					break;

				default:

					console.log( 'ColladaLoader: Source: Read dont know how to read ' + param.type + '.' );
					break;

			}

		//}

		return result;

	};

	function Material () {

		this.id = "";
		this.name = "";
		this.instance_effect = null;

	};

	Material.prototype.parse = function ( element ) {

		this.id = element.getAttribute( 'id' );
		this.name = element.getAttribute( 'name' );

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			if ( element.childNodes[ i ].nodeName == 'instance_effect' ) {

				this.instance_effect = ( new InstanceEffect() ).parse( element.childNodes[ i ] );
				break;

			}

		}

		return this;

	};

	function ColorOrTexture () {

		this.color = new THREE.Color();
		this.color.setRGB( Math.random(), Math.random(), Math.random() );
		this.color.a = 1.0;

		this.texture = null;
		this.texcoord = null;
		this.texOpts = null;

	};

	ColorOrTexture.prototype.isColor = function () {

		return ( this.texture == null );

	};

	ColorOrTexture.prototype.isTexture = function () {

		return ( this.texture != null );

	};

	ColorOrTexture.prototype.parse = function ( element ) {

		if (element.nodeName == 'transparent')
		{
			this.opaque = element.getAttribute('opaque');
		}
		
		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];
			if ( child.nodeType != 1 ) continue;

			switch ( child.nodeName ) {

				case 'color':

					var rgba = _floats( child.textContent );
					this.color = new THREE.Color();
					this.color.setRGB( rgba[0], rgba[1], rgba[2] );
					this.color.a = rgba[3];
					break;

				case 'texture':

					this.texture = child.getAttribute('texture');
					this.texcoord = child.getAttribute('texcoord');
					// Defaults from:
					// https://collada.org/mediawiki/index.php/Maya_texture_placement_MAYA_extension
					this.texOpts = {
						offsetU: 0,
						offsetV: 0,
						repeatU: 1,
						repeatV: 1,
						wrapU: 1,
						wrapV: 1,
					};
					this.parseTexture( child );
					break;

				default:
					break;

			}

		}

		return this;

	};

	ColorOrTexture.prototype.parseTexture = function ( element ) {

		if ( ! element.childNodes ) return this;

		// This should be supported by Maya, 3dsMax, and MotionBuilder

		if ( element.childNodes[1] && element.childNodes[1].nodeName === 'extra' ) {

			element = element.childNodes[1];

			if ( element.childNodes[1] && element.childNodes[1].nodeName === 'technique' ) {

				element = element.childNodes[1];

			}

		}

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];

			switch ( child.nodeName ) {

				case 'offsetU':
				case 'offsetV':
				case 'repeatU':
				case 'repeatV':

					this.texOpts[ child.nodeName ] = parseFloat( child.textContent );
					break;

				case 'wrapU':
				case 'wrapV':

					this.texOpts[ child.nodeName ] = parseInt( child.textContent );
					break;

				default:
					this.texOpts[ child.nodeName ] = child.textContent;
					break;

			}

		}

		return this;

	};

	function Shader ( type, effect ) {

		this.type = type;
		this.effect = effect;
		this.material = null;

	};

	Shader.prototype.parse = function ( element ) {

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];
			if ( child.nodeType != 1 ) continue;

			switch ( child.nodeName ) {

				case 'ambient':
				case 'emission':
				case 'diffuse':
				case 'specular':
				case 'transparent':

					this[ child.nodeName ] = ( new ColorOrTexture() ).parse( child );
					break;

				case 'shininess':
				case 'reflectivity':
				case 'index_of_refraction':
				case 'transparency':

					var f = evaluateXPath( child, './/dae:float' );

					if ( f.length > 0 )
						this[ child.nodeName ] = parseFloat( f[ 0 ].textContent );

					break;

				default:
					break;

			}

		}

		this.create();
		return this;

	};

	Shader.prototype.create = function() {

		var props = {};

		var transparent = false;
		if (this['transparency'] !== undefined && this['transparent'] !== undefined)
		{
			// convert transparent color RBG to average value
			var transparentColor = this['transparent'];
			var transparencyLevel = (this.transparent.color.r +
										this.transparent.color.g + 
										this.transparent.color.b)
										/ 3 * this.transparency;
			
			if (transparencyLevel > 0)
			{
				transparent = true;
				props[ 'transparent' ] = true;
				props[ 'opacity' ] = 1 - transparencyLevel;
			}
		}
		
		for ( var prop in this ) {

			switch ( prop ) {

				case 'ambient':
				case 'emission':
				case 'diffuse':
				case 'specular':

					var cot = this[ prop ];

					if ( cot instanceof ColorOrTexture ) {

						if ( cot.isTexture() ) {

							var samplerId = cot.texture;
							var surfaceId = this.effect.sampler[samplerId];

							if ( surfaceId !== undefined && surfaceId.source !== undefined ) {

								var surface = this.effect.surface[surfaceId.source];
								var image = images[surface.init_from];

								if (image) {

									var texture = THREE.ImageUtils.loadTexture(baseUrl + image.init_from);
									texture.wrapS = cot.texOpts.wrapU ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
									texture.wrapT = cot.texOpts.wrapV ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
									texture.offset.x = cot.texOpts.offsetU;
									texture.offset.y = cot.texOpts.offsetV;
									texture.repeat.x = cot.texOpts.repeatU;
									texture.repeat.y = cot.texOpts.repeatV;
									props['map'] = texture;

									// Texture with baked lighting?
									if (prop === 'emission') props['emissive'] = 0xffffff;

								}

							}

						} else if ( prop === 'diffuse' || !transparent ) {

							if ( prop === 'emission' ) {

								props[ 'emissive' ] = cot.color.getHex();

							} else {

								props[ prop ] = cot.color.getHex();

							}

						}

					}

					break;

				case 'shininess':

					props[ prop ] = this[ prop ];
					break;

				case 'reflectivity':

					props[ prop ] = this[ prop ];
					if( props[ prop ] > 0.0 ) props['envMap'] = options.defaultEnvMap;
					props['combine'] = THREE.MixOperation;	//mix regular shading with reflective component
					break;

				case 'index_of_refraction':

					props[ 'refractionRatio' ] = this[ prop ]; //TODO: "index_of_refraction" becomes "refractionRatio" in shader, but I'm not sure if the two are actually comparable
					if ( this[ prop ] !== 1.0 ) props['envMap'] = options.defaultEnvMap;
					break;

				case 'transparency':
					// gets figured out up top
					break;

				default:
					break;

			}

		}

		props[ 'shading' ] = preferredShading;
		props[ 'side' ] = this.effect.doubleSided ? THREE.DoubleSide : THREE.FrontSide;

		switch ( this.type ) {

			case 'constant':

				if (props.emissive != undefined) props.color = props.emissive;
				this.material = new THREE.MeshBasicMaterial( props );
				break;

			case 'phong':
			case 'blinn':

				if (props.diffuse != undefined) props.color = props.diffuse;
				this.material = new THREE.MeshPhongMaterial( props );
				break;

			case 'lambert':
			default:

				if (props.diffuse != undefined) props.color = props.diffuse;
				this.material = new THREE.MeshLambertMaterial( props );
				break;

		}

		return this.material;

	};

	function Surface ( effect ) {

		this.effect = effect;
		this.init_from = null;
		this.format = null;

	};

	Surface.prototype.parse = function ( element ) {

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];
			if ( child.nodeType != 1 ) continue;

			switch ( child.nodeName ) {

				case 'init_from':

					this.init_from = child.textContent;
					break;

				case 'format':

					this.format = child.textContent;
					break;

				default:

					console.log( "unhandled Surface prop: " + child.nodeName );
					break;

			}

		}

		return this;

	};

	function Sampler2D ( effect ) {

		this.effect = effect;
		this.source = null;
		this.wrap_s = null;
		this.wrap_t = null;
		this.minfilter = null;
		this.magfilter = null;
		this.mipfilter = null;

	};

	Sampler2D.prototype.parse = function ( element ) {

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];
			if ( child.nodeType != 1 ) continue;

			switch ( child.nodeName ) {

				case 'source':

					this.source = child.textContent;
					break;

				case 'minfilter':

					this.minfilter = child.textContent;
					break;

				case 'magfilter':

					this.magfilter = child.textContent;
					break;

				case 'mipfilter':

					this.mipfilter = child.textContent;
					break;

				case 'wrap_s':

					this.wrap_s = child.textContent;
					break;

				case 'wrap_t':

					this.wrap_t = child.textContent;
					break;

				default:

					console.log( "unhandled Sampler2D prop: " + child.nodeName );
					break;

			}

		}

		return this;

	};

	function Effect () {

		this.id = "";
		this.name = "";
		this.shader = null;
		this.surface = {};
		this.sampler = {};

	};

	Effect.prototype.create = function () {

		if ( this.shader == null ) {

			return null;

		}

	};

	Effect.prototype.parse = function ( element ) {

		this.id = element.getAttribute( 'id' );
		this.name = element.getAttribute( 'name' );

		extractDoubleSided( this, element );

		this.shader = null;

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];
			if ( child.nodeType != 1 ) continue;

			switch ( child.nodeName ) {

				case 'profile_COMMON':

					this.parseTechnique( this.parseProfileCOMMON( child ) );
					break;

				default:
					break;

			}

		}

		return this;

	};

	Effect.prototype.parseNewparam = function ( element ) {

		var sid = element.getAttribute( 'sid' );

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];
			if ( child.nodeType != 1 ) continue;

			switch ( child.nodeName ) {

				case 'surface':

					this.surface[sid] = ( new Surface( this ) ).parse( child );
					break;

				case 'sampler2D':

					this.sampler[sid] = ( new Sampler2D( this ) ).parse( child );
					break;

				case 'extra':

					break;

				default:

					console.log( child.nodeName );
					break;

			}

		}

	};

	Effect.prototype.parseProfileCOMMON = function ( element ) {

		var technique;

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];

			if ( child.nodeType != 1 ) continue;

			switch ( child.nodeName ) {

				case 'profile_COMMON':

					this.parseProfileCOMMON( child );
					break;

				case 'technique':

					technique = child;
					break;

				case 'newparam':

					this.parseNewparam( child );
					break;

				case 'image':

					var _image = ( new _Image() ).parse( child );
					images[ _image.id ] = _image;
					break;

				case 'extra':
					break;

				default:

					console.log( child.nodeName );
					break;

			}

		}

		return technique;

	};

	Effect.prototype.parseTechnique= function ( element ) {

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[i];
			if ( child.nodeType != 1 ) continue;

			switch ( child.nodeName ) {

				case 'constant':
				case 'lambert':
				case 'blinn':
				case 'phong':

					this.shader = ( new Shader( child.nodeName, this ) ).parse( child );
					break;

				default:
					break;

			}

		}

	};

	function InstanceEffect () {

		this.url = "";

	};

	InstanceEffect.prototype.parse = function ( element ) {

		this.url = element.getAttribute( 'url' ).replace( /^#/, '' );
		return this;

	};

	function Animation() {

		this.id = "";
		this.name = "";
		this.source = {};
		this.sampler = [];
		this.channel = [];

	};

	Animation.prototype.parse = function ( element ) {

		this.id = element.getAttribute( 'id' );
		this.name = element.getAttribute( 'name' );
		this.source = {};

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];

			if ( child.nodeType != 1 ) continue;

			switch ( child.nodeName ) {

				case 'animation':

					var anim = ( new Animation() ).parse( child );

					for ( var src in anim.source ) {

						this.source[ src ] = anim.source[ src ];

					}

					for ( var j = 0; j < anim.channel.length; j ++ ) {

						this.channel.push( anim.channel[ j ] );
						this.sampler.push( anim.sampler[ j ] );

					}

					break;

				case 'source':

					var src = ( new Source() ).parse( child );
					this.source[ src.id ] = src;
					break;

				case 'sampler':

					this.sampler.push( ( new Sampler( this ) ).parse( child ) );
					break;

				case 'channel':

					this.channel.push( ( new Channel( this ) ).parse( child ) );
					break;

				default:
					break;

			}

		}

		return this;

	};

	function Channel( animation ) {

		this.animation = animation;
		this.source = "";
		this.target = "";
		this.fullSid = null;
		this.sid = null;
		this.dotSyntax = null;
		this.arrSyntax = null;
		this.arrIndices = null;
		this.member = null;

	};

	Channel.prototype.parse = function ( element ) {

		this.source = element.getAttribute( 'source' ).replace( /^#/, '' );
		this.target = element.getAttribute( 'target' );

		var parts = this.target.split( '/' );

		var id = parts.shift();
		var sid = parts.shift();

		var dotSyntax = ( sid.indexOf(".") >= 0 );
		var arrSyntax = ( sid.indexOf("(") >= 0 );

		if ( dotSyntax ) {

			parts = sid.split(".");
			this.sid = parts.shift();
			this.member = parts.shift();

		} else if ( arrSyntax ) {

			var arrIndices = sid.split("(");
			this.sid = arrIndices.shift();

			for (var j = 0; j < arrIndices.length; j ++ ) {

				arrIndices[j] = parseInt( arrIndices[j].replace(/\)/, '') );

			}

			this.arrIndices = arrIndices;

		} else {

			this.sid = sid;

		}

		this.fullSid = sid;
		this.dotSyntax = dotSyntax;
		this.arrSyntax = arrSyntax;

		return this;

	};

	function Sampler ( animation ) {

		this.id = "";
		this.animation = animation;
		this.inputs = [];
		this.input = null;
		this.output = null;
		this.strideOut = null;
		this.interpolation = null;
		this.startTime = null;
		this.endTime = null;
		this.duration = 0;

	};

	Sampler.prototype.parse = function ( element ) {

		this.id = element.getAttribute( 'id' );
		this.inputs = [];

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];
			if ( child.nodeType != 1 ) continue;

			switch ( child.nodeName ) {

				case 'input':

					this.inputs.push( (new Input()).parse( child ) );
					break;

				default:
					break;

			}

		}

		return this;

	};

	Sampler.prototype.create = function () {

		for ( var i = 0; i < this.inputs.length; i ++ ) {

			var input = this.inputs[ i ];
			var source = this.animation.source[ input.source ];

			switch ( input.semantic ) {

				case 'INPUT':

					this.input = source.read();
					break;

				case 'OUTPUT':

					this.output = source.read();
					this.strideOut = source.accessor.stride;
					break;

				case 'INTERPOLATION':

					this.interpolation = source.read();
					break;

				case 'IN_TANGENT':

					break;

				case 'OUT_TANGENT':

					break;

				default:

					console.log(input.semantic);
					break;

			}

		}

		this.startTime = 0;
		this.endTime = 0;
		this.duration = 0;

		if ( this.input.length ) {

			this.startTime = 100000000;
			this.endTime = -100000000;

			for ( var i = 0; i < this.input.length; i ++ ) {

				this.startTime = Math.min( this.startTime, this.input[ i ] );
				this.endTime = Math.max( this.endTime, this.input[ i ] );

			}

			this.duration = this.endTime - this.startTime;

		}

	};

	Sampler.prototype.getData = function ( type, ndx ) {

		var data;

		if ( type === 'matrix' && this.strideOut === 16 ) {

			data = this.output[ ndx ];

		} else if ( this.strideOut > 1 ) {

			data = [];
			ndx *= this.strideOut;

			for ( var i = 0; i < this.strideOut; ++i ) {

				data[ i ] = this.output[ ndx + i ];

			}

			if ( this.strideOut === 3 ) {

				switch ( type ) {

					case 'rotate':
					case 'translate':

						fixCoords( data, -1 );
						break;

					case 'scale':

						fixCoords( data, 1 );
						break;

				}

			} else if ( this.strideOut === 4 && type === 'matrix' ) {

				fixCoords( data, -1 );

			}

		} else {

			data = this.output[ ndx ];

		}

		return data;

	};

	function Key ( time ) {

		this.targets = [];
		this.time = time;

	};

	Key.prototype.addTarget = function ( fullSid, transform, member, data ) {

		this.targets.push( {
			sid: fullSid,
			member: member,
			transform: transform,
			data: data
		} );

	};

	Key.prototype.apply = function ( opt_sid ) {

		for ( var i = 0; i < this.targets.length; ++i ) {

			var target = this.targets[ i ];

			if ( !opt_sid || target.sid === opt_sid ) {

				target.transform.update( target.data, target.member );

			}

		}

	};

	Key.prototype.getTarget = function ( fullSid ) {

		for ( var i = 0; i < this.targets.length; ++i ) {

			if ( this.targets[ i ].sid === fullSid ) {

				return this.targets[ i ];

			}

		}

		return null;

	};

	Key.prototype.hasTarget = function ( fullSid ) {

		for ( var i = 0; i < this.targets.length; ++i ) {

			if ( this.targets[ i ].sid === fullSid ) {

				return true;

			}

		}

		return false;

	};

	// TODO: Currently only doing linear interpolation. Should support full COLLADA spec.
	Key.prototype.interpolate = function ( nextKey, time ) {

		for ( var i = 0; i < this.targets.length; ++i ) {

			var target = this.targets[ i ],
				nextTarget = nextKey.getTarget( target.sid ),
				data;

			if ( target.transform.type !== 'matrix' && nextTarget ) {

				var scale = ( time - this.time ) / ( nextKey.time - this.time ),
					nextData = nextTarget.data,
					prevData = target.data;

				// check scale error

				if ( scale < 0 || scale > 1 ) {

					console.log( "Key.interpolate: Warning! Scale out of bounds:" + scale );
					scale = scale < 0 ? 0 : 1;

				}

				if ( prevData.length ) {

					data = [];

					for ( var j = 0; j < prevData.length; ++j ) {

						data[ j ] = prevData[ j ] + ( nextData[ j ] - prevData[ j ] ) * scale;

					}

				} else {

					data = prevData + ( nextData - prevData ) * scale;

				}

			} else {

				data = target.data;

			}

			target.transform.update( data, target.member );

		}

	};

	// Camera
	function Camera() {

		this.id = "";
		this.name = "";
		this.technique = "";

	};

	Camera.prototype.parse = function ( element ) {

		this.id = element.getAttribute( 'id' );
		this.name = element.getAttribute( 'name' );

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];
			if ( child.nodeType != 1 ) continue;

			switch ( child.nodeName ) {

				case 'optics':

					this.parseOptics( child );
					break;

				default:
					break;

			}

		}

		return this;

	};

	Camera.prototype.parseOptics = function ( element ) {

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			if ( element.childNodes[ i ].nodeName == 'technique_common' ) {

				var technique = element.childNodes[ i ];

				for ( var j = 0; j < technique.childNodes.length; j ++ ) {

					this.technique = technique.childNodes[ j ].nodeName;

					if ( this.technique == 'perspective' ) {

						var perspective = technique.childNodes[ j ];

						for ( var k = 0; k < perspective.childNodes.length; k ++ ) {

							var param = perspective.childNodes[ k ];

							switch ( param.nodeName ) {

								case 'yfov':
									this.yfov = param.textContent;
									break;
								case 'xfov':
									this.xfov = param.textContent;
									break;
								case 'znear':
									this.znear = param.textContent;
									break;
								case 'zfar':
									this.zfar = param.textContent;
									break;
								case 'aspect_ratio':
									this.aspect_ratio = param.textContent;
									break;

							}

						}

					} else if ( this.technique == 'orthographic' ) {

						var orthographic = technique.childNodes[ j ];

						for ( var k = 0; k < orthographic.childNodes.length; k ++ ) {

							var param = orthographic.childNodes[ k ];

							switch ( param.nodeName ) {

								case 'xmag':
									this.xmag = param.textContent;
									break;
								case 'ymag':
									this.ymag = param.textContent;
									break;
								case 'znear':
									this.znear = param.textContent;
									break;
								case 'zfar':
									this.zfar = param.textContent;
									break;
								case 'aspect_ratio':
									this.aspect_ratio = param.textContent;
									break;

							}

						}

					}

				}

			}

		}

		return this;

	};

	function InstanceCamera() {

		this.url = "";

	};

	InstanceCamera.prototype.parse = function ( element ) {

		this.url = element.getAttribute('url').replace(/^#/, '');

		return this;

	};

	// Light

	function Light() {

		this.id = "";
		this.name = "";
		this.technique = "";

	};

	Light.prototype.parse = function ( element ) {

		this.id = element.getAttribute( 'id' );
		this.name = element.getAttribute( 'name' );

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];
			if ( child.nodeType != 1 ) continue;

			switch ( child.nodeName ) {

				case 'technique_common':

					this.parseCommon( child );
					break;

				case 'technique':

					this.parseTechnique( child );
					break;

				default:
					break;

			}

		}

		return this;

	};

	Light.prototype.parseCommon = function ( element ) {

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			switch ( element.childNodes[ i ].nodeName ) {

				case 'directional':
				case 'point':
				case 'spot':
				case 'ambient':

					this.technique = element.childNodes[ i ].nodeName;

					var light = element.childNodes[ i ];

					for ( var j = 0; j < light.childNodes.length; j ++ ) {

						var child = light.childNodes[j];

						switch ( child.nodeName ) {

							case 'color':

								var rgba = _floats( child.textContent );
								this.color = new THREE.Color(0);
								this.color.setRGB( rgba[0], rgba[1], rgba[2] );
								this.color.a = rgba[3];
								break;

							case 'falloff_angle':

								this.falloff_angle = parseFloat( child.textContent );
								break;
						}

					}

			}

		}

		return this;

	};

	Light.prototype.parseTechnique = function ( element ) {

		this.profile = element.getAttribute( 'profile' );

		for ( var i = 0; i < element.childNodes.length; i ++ ) {

			var child = element.childNodes[ i ];

			switch ( child.nodeName ) {

				case 'intensity':

					this.intensity = parseFloat(child.textContent);
					break;

			}

		}

		return this;

	};

	function InstanceLight() {

		this.url = "";

	};

	InstanceLight.prototype.parse = function ( element ) {

		this.url = element.getAttribute('url').replace(/^#/, '');

		return this;

	};

	function _source( element ) {

		var id = element.getAttribute( 'id' );

		if ( sources[ id ] != undefined ) {

			return sources[ id ];

		}

		sources[ id ] = ( new Source(id )).parse( element );
		return sources[ id ];

	};

	function _nsResolver( nsPrefix ) {

		if ( nsPrefix == "dae" ) {

			return "http://www.collada.org/2005/11/COLLADASchema";

		}

		return null;

	};

	function _bools( str ) {

		var raw = _strings( str );
		var data = [];

		for ( var i = 0, l = raw.length; i < l; i ++ ) {

			data.push( (raw[i] == 'true' || raw[i] == '1') ? true : false );

		}

		return data;

	};

	function _floats( str ) {

		var raw = _strings(str);
		var data = [];

		for ( var i = 0, l = raw.length; i < l; i ++ ) {

			data.push( parseFloat( raw[ i ] ) );

		}

		return data;

	};

	function _ints( str ) {

		var raw = _strings( str );
		var data = [];

		for ( var i = 0, l = raw.length; i < l; i ++ ) {

			data.push( parseInt( raw[ i ], 10 ) );

		}

		return data;

	};

	function _strings( str ) {

		return ( str.length > 0 ) ? _trimString( str ).split( /\s+/ ) : [];

	};

	function _trimString( str ) {

		return str.replace( /^\s+/, "" ).replace( /\s+$/, "" );

	};

	function _attr_as_float( element, name, defaultValue ) {

		if ( element.hasAttribute( name ) ) {

			return parseFloat( element.getAttribute( name ) );

		} else {

			return defaultValue;

		}

	};

	function _attr_as_int( element, name, defaultValue ) {

		if ( element.hasAttribute( name ) ) {

			return parseInt( element.getAttribute( name ), 10) ;

		} else {

			return defaultValue;

		}

	};

	function _attr_as_string( element, name, defaultValue ) {

		if ( element.hasAttribute( name ) ) {

			return element.getAttribute( name );

		} else {

			return defaultValue;

		}

	};

	function _format_float( f, num ) {

		if ( f === undefined ) {

			var s = '0.';

			while ( s.length < num + 2 ) {

				s += '0';

			}

			return s;

		}

		num = num || 2;

		var parts = f.toString().split( '.' );
		parts[ 1 ] = parts.length > 1 ? parts[ 1 ].substr( 0, num ) : "0";

		while( parts[ 1 ].length < num ) {

			parts[ 1 ] += '0';

		}

		return parts.join( '.' );

	};

	function evaluateXPath( node, query ) {

		var instances = COLLADA.evaluate( query, node, _nsResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );

		var inst = instances.iterateNext();
		var result = [];

		while ( inst ) {

			result.push( inst );
			inst = instances.iterateNext();

		}

		return result;

	};

	function extractDoubleSided( obj, element ) {

		obj.doubleSided = false;

		var node = COLLADA.evaluate( './/dae:extra//dae:double_sided', element, _nsResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );

		if ( node ) {

			node = node.iterateNext();

			if ( node && parseInt( node.textContent, 10 ) === 1 ) {

				obj.doubleSided = true;

			}

		}

	};

	// Up axis conversion

	function setUpConversion() {

		if ( !options.convertUpAxis || colladaUp === options.upAxis ) {

			upConversion = null;

		} else {

			switch ( colladaUp ) {

				case 'X':

					upConversion = options.upAxis === 'Y' ? 'XtoY' : 'XtoZ';
					break;

				case 'Y':

					upConversion = options.upAxis === 'X' ? 'YtoX' : 'YtoZ';
					break;

				case 'Z':

					upConversion = options.upAxis === 'X' ? 'ZtoX' : 'ZtoY';
					break;

			}

		}

	};

	function fixCoords( data, sign ) {

		if ( !options.convertUpAxis || colladaUp === options.upAxis ) {

			return;

		}

		switch ( upConversion ) {

			case 'XtoY':

				var tmp = data[ 0 ];
				data[ 0 ] = sign * data[ 1 ];
				data[ 1 ] = tmp;
				break;

			case 'XtoZ':

				var tmp = data[ 2 ];
				data[ 2 ] = data[ 1 ];
				data[ 1 ] = data[ 0 ];
				data[ 0 ] = tmp;
				break;

			case 'YtoX':

				var tmp = data[ 0 ];
				data[ 0 ] = data[ 1 ];
				data[ 1 ] = sign * tmp;
				break;

			case 'YtoZ':

				var tmp = data[ 1 ];
				data[ 1 ] = sign * data[ 2 ];
				data[ 2 ] = tmp;
				break;

			case 'ZtoX':

				var tmp = data[ 0 ];
				data[ 0 ] = data[ 1 ];
				data[ 1 ] = data[ 2 ];
				data[ 2 ] = tmp;
				break;

			case 'ZtoY':

				var tmp = data[ 1 ];
				data[ 1 ] = data[ 2 ];
				data[ 2 ] = sign * tmp;
				break;

		}

	};

	function getConvertedVec3( data, offset ) {

		var arr = [ data[ offset ], data[ offset + 1 ], data[ offset + 2 ] ];
		fixCoords( arr, -1 );
		return new THREE.Vector3( arr[ 0 ], arr[ 1 ], arr[ 2 ] );

	};

	function getConvertedMat4( data ) {

		if ( options.convertUpAxis ) {

			// First fix rotation and scale

			// Columns first
			var arr = [ data[ 0 ], data[ 4 ], data[ 8 ] ];
			fixCoords( arr, -1 );
			data[ 0 ] = arr[ 0 ];
			data[ 4 ] = arr[ 1 ];
			data[ 8 ] = arr[ 2 ];
			arr = [ data[ 1 ], data[ 5 ], data[ 9 ] ];
			fixCoords( arr, -1 );
			data[ 1 ] = arr[ 0 ];
			data[ 5 ] = arr[ 1 ];
			data[ 9 ] = arr[ 2 ];
			arr = [ data[ 2 ], data[ 6 ], data[ 10 ] ];
			fixCoords( arr, -1 );
			data[ 2 ] = arr[ 0 ];
			data[ 6 ] = arr[ 1 ];
			data[ 10 ] = arr[ 2 ];
			// Rows second
			arr = [ data[ 0 ], data[ 1 ], data[ 2 ] ];
			fixCoords( arr, -1 );
			data[ 0 ] = arr[ 0 ];
			data[ 1 ] = arr[ 1 ];
			data[ 2 ] = arr[ 2 ];
			arr = [ data[ 4 ], data[ 5 ], data[ 6 ] ];
			fixCoords( arr, -1 );
			data[ 4 ] = arr[ 0 ];
			data[ 5 ] = arr[ 1 ];
			data[ 6 ] = arr[ 2 ];
			arr = [ data[ 8 ], data[ 9 ], data[ 10 ] ];
			fixCoords( arr, -1 );
			data[ 8 ] = arr[ 0 ];
			data[ 9 ] = arr[ 1 ];
			data[ 10 ] = arr[ 2 ];

			// Now fix translation
			arr = [ data[ 3 ], data[ 7 ], data[ 11 ] ];
			fixCoords( arr, -1 );
			data[ 3 ] = arr[ 0 ];
			data[ 7 ] = arr[ 1 ];
			data[ 11 ] = arr[ 2 ];

		}

		return new THREE.Matrix4(
			data[0], data[1], data[2], data[3],
			data[4], data[5], data[6], data[7],
			data[8], data[9], data[10], data[11],
			data[12], data[13], data[14], data[15]
			);

	};

	function getConvertedIndex( index ) {

		if ( index > -1 && index < 3 ) {

			var members = ['X', 'Y', 'Z'],
				indices = { X: 0, Y: 1, Z: 2 };

			index = getConvertedMember( members[ index ] );
			index = indices[ index ];

		}

		return index;

	};

	function getConvertedMember( member ) {

		if ( options.convertUpAxis ) {

			switch ( member ) {

				case 'X':

					switch ( upConversion ) {

						case 'XtoY':
						case 'XtoZ':
						case 'YtoX':

							member = 'Y';
							break;

						case 'ZtoX':

							member = 'Z';
							break;

					}

					break;

				case 'Y':

					switch ( upConversion ) {

						case 'XtoY':
						case 'YtoX':
						case 'ZtoX':

							member = 'X';
							break;

						case 'XtoZ':
						case 'YtoZ':
						case 'ZtoY':

							member = 'Z';
							break;

					}

					break;

				case 'Z':

					switch ( upConversion ) {

						case 'XtoZ':

							member = 'X';
							break;

						case 'YtoZ':
						case 'ZtoX':
						case 'ZtoY':

							member = 'Y';
							break;

					}

					break;

			}

		}

		return member;

	};


		//
		//
		// -------------------------------------------------------------------- MTLLoader

		/**
		 * Loads a Wavefront .mtl file specifying materials
		 *
		 * @author angelxuanchang
		 */

		THREE.MTLLoader = function (baseUrl, options, crossOrigin) {

			this.baseUrl = baseUrl;
			this.options = options;
			this.crossOrigin = crossOrigin;

		};

		THREE.MTLLoader.prototype = {

			constructor : THREE.MTLLoader,

			/**
			 * Loads a MTL file
			 *
			 * Loading progress is indicated by the following events:
			 *   "load" event (successful loading): type = 'load', content = THREE.MTLLoader.MaterialCreator
			 *   "error" event (error loading): type = 'load', message
			 *   "progress" event (progress loading): type = 'progress', loaded, total
			 *
			 * @param url - location of MTL file
			 */
			load : function (url) {

				var scope = this;
				var xhr = new XMLHttpRequest();

				function onloaded(event) {

					if (event.target.status === 200 || event.target.status === 0) {

						var materialCreator = scope.parse(event.target.responseText);

						// Notify caller, that I'm done

						scope.dispatchEvent({
							type : 'load',
							content : materialCreator
						});

					} else {

						scope.dispatchEvent({
							type : 'error',
							message : 'Couldn\'t load URL [' + url + ']',
							response : event.target.responseText
						});

					}

				}

				xhr.addEventListener('load', onloaded, false);
/*
				xhr.addEventListener('progress', function (event) {

					scope.dispatchEvent({
						type : 'progress',
						loaded : event.loaded,
						total : event.total
					});

				}, false);
*/
				xhr.addEventListener('error', function () {

					scope.dispatchEvent({
						type : 'error',
						message : 'Couldn\'t load URL [' + url + ']'
					});

				}, false);

				xhr.open('GET', url, true);
				xhr.send(null);

			},

			/**
			 * Parses loaded MTL file
			 * @param text - Content of MTL file
			 * @return {THREE.MTLLoader.MaterialCreator}
			 */
			parse: function ( text ) {

				var lines = text.split( "\n" );
				var info = {};
				var delimiter_pattern = /\s+/;
				var materialsInfo = {};

				for ( var i = 0; i < lines.length; i ++ ) {

					var line = lines[ i ];
					line = line.trim();

					if ( line.length === 0 || line.charAt( 0 ) === '#' ) {

						// Blank line or comment ignore
						continue;

					}

					var pos = line.indexOf( ' ' );

					var key = ( pos >= 0 ) ? line.substring( 0, pos ) : line;
					key = key.toLowerCase();

					var value = ( pos >= 0 ) ? line.substring( pos + 1 ) : "";
					value = value.trim();

					if ( key === "newmtl" ) {

						// New material

						info = { name: value };
						materialsInfo[ value ] = info;

					} else if ( info ) {

						if ( key === "ka" || key === "kd" || key === "ks" ) {

							var ss = value.split( delimiter_pattern, 3 );
							info[ key ] = [ parseFloat( ss[0] ), parseFloat( ss[1] ), parseFloat( ss[2] ) ];

						} else {

							info[ key ] = value;

						}

					}

				}

				var materialCreator = new THREE.MTLLoader.MaterialCreator( this.baseUrl, this.options );
				materialCreator.setMaterials( materialsInfo );
				return materialCreator;

			}

		};

		/**
		 * Create a new THREE-MTLLoader.MaterialCreator
		 * @param baseUrl - Url relative to which textures are loaded
		 * @param options - Set of options on how to construct the materials
		 *                  side: Which side to apply the material
		 *                        THREE.FrontSide (default), THREE.BackSide, THREE.DoubleSide
		 *                  wrap: What type of wrapping to apply for textures
		 *                        THREE.RepeatWrapping (default), THREE.ClampToEdgeWrapping, THREE.MirroredRepeatWrapping
		 *                  normalizeRGB: RGBs need to be normalized to 0-1 from 0-255
		 *                                Default: false, assumed to be already normalized
		 *                  ignoreZeroRGBs: Ignore values of RGBs (Ka,Kd,Ks) that are all 0's
		 *                                  Default: false
		 *                  invertTransparency: If transparency need to be inverted (inversion is needed if d = 0 is fully opaque)
		 *                                      Default: false (d = 1 is fully opaque)
		 * @constructor
		 */

		THREE.MTLLoader.MaterialCreator = function( baseUrl, options ) {

			this.baseUrl = baseUrl;
			this.options = options;
			this.materialsInfo = {};
			this.materials = {};
			this.materialsArray = [];
			this.nameLookup = {};

			this.side = ( this.options && this.options.side )? this.options.side: THREE.FrontSide;
			this.wrap = ( this.options && this.options.wrap )? this.options.wrap: THREE.RepeatWrapping;

		};

		THREE.MTLLoader.MaterialCreator.prototype = {

			constructor: THREE.MTLLoader.MaterialCreator,

			setMaterials: function( materialsInfo ) {

				this.materialsInfo = this.convert( materialsInfo );
				this.materials = {};
				this.materialsArray = [];
				this.nameLookup = {};

			},

			convert: function( materialsInfo ) {

				if ( !this.options ) return materialsInfo;

				var converted = {};

				for ( var mn in materialsInfo ) {

					// Convert materials info into normalized form based on options

					var mat = materialsInfo[ mn ];

					var covmat = {};

					converted[ mn ] = covmat;

					for ( var prop in mat ) {

						var save = true;
						var value = mat[ prop ];
						var lprop = prop.toLowerCase();

						switch ( lprop ) {

							case 'kd':
							case 'ka':
							case 'ks':

								// Diffuse color (color under white light) using RGB values

								if ( this.options && this.options.normalizeRGB ) {

									value = [ value[ 0 ] / 255, value[ 1 ] / 255, value[ 2 ] / 255 ];

								}

								if ( this.options && this.options.ignoreZeroRGBs ) {

									if ( value[ 0 ] === 0 && value[ 1 ] === 0 && value[ 1 ] === 0 ) {

										// ignore

										save = false;

									}
								}

								break;

							case 'd':

								// According to MTL format (http://paulbourke.net/dataformats/mtl/):
								//   d is dissolve for current material
								//   factor of 1.0 is fully opaque, a factor of 0 is fully dissolved (completely transparent)

								if ( this.options && this.options.invertTransparency ) {

									value = 1 - value;

								}

								break;

							default:

								break;
						}

						if ( save ) {

							covmat[ lprop ] = value;

						}

					}

				}

				return converted;

			},

			preload: function () {

				for ( var mn in this.materialsInfo ) {

					this.create( mn );

				}

			},

			getIndex: function( materialName ) {

				return this.nameLookup[ materialName ];

			},

			getAsArray: function() {

				var index = 0;

				for ( var mn in this.materialsInfo ) {

					this.materialsArray[ index ] = this.create( mn );
					this.nameLookup[ mn ] = index;
					index ++;

				}

				return this.materialsArray;

			},

			create: function ( materialName ) {

				if ( this.materials[ materialName ] === undefined ) {

					this.createMaterial_( materialName );

				}

				return this.materials[ materialName ];

			},

			createMaterial_: function ( materialName ) {

				// Create material

				var mat = this.materialsInfo[ materialName ];
				var params = {

					name: materialName,
					side: this.side

				};

				for ( var prop in mat ) {

					var value = mat[ prop ];

					switch ( prop.toLowerCase() ) {

						// Ns is material specular exponent

						case 'kd':

							// Diffuse color (color under white light) using RGB values

							params[ 'diffuse' ] = new THREE.Color().fromArray( value );

							break;

						case 'ka':

							// Ambient color (color under shadow) using RGB values

							params[ 'ambient' ] = new THREE.Color().fromArray( value );

							break;

						case 'ks':

							// Specular color (color when light is reflected from shiny surface) using RGB values
							params[ 'specular' ] = new THREE.Color().fromArray( value );

							break;

						case 'map_kd':

							// Diffuse texture map
							params[ 'map' ] = this.loadTexture( this.baseUrl + value );
							params[ 'map' ].wrapS = this.wrap;
							params[ 'map' ].wrapT = this.wrap;

							break;

						case 'ns':

							// The specular exponent (defines the focus of the specular highlight)
							// A high exponent results in a tight, concentrated highlight. Ns values normally range from 0 to 1000.

							params['shininess'] = value;

							break;

						case 'd':

							// According to MTL format (http://paulbourke.net/dataformats/mtl/):
							//   d is dissolve for current material
							//   factor of 1.0 is fully opaque, a factor of 0 is fully dissolved (completely transparent)

							if ( value < 1 ) {

								params['transparent'] = true;
								params['opacity'] = value;

							}

							break;

						default:
							break;

					}

				}

				if ( params[ 'diffuse' ] ) {

					if ( !params[ 'ambient' ]) params[ 'ambient' ] = params[ 'diffuse' ];
					params[ 'color' ] = params[ 'diffuse' ];

				}

				this.materials[ materialName ] = new THREE.MeshPhongMaterial( params );
				return this.materials[ materialName ];

			},


			loadTexture: function ( url, mapping, onLoad, onError ) {

				var isCompressed = /\.dds$/i.test( url );

				if ( isCompressed ) {

					var texture = THREE.ImageUtils.loadCompressedTexture( url, mapping, onLoad, onError );

				} else {

					var image = new Image();
					var texture = new THREE.Texture( image, mapping );

					var loader = new THREE.ImageLoader();
					loader.crossOrigin = this.crossOrigin;
					
			
					
					loader.load( url, function ( image ) {
						texture.image = THREE.MTLLoader.ensurePowerOfTwo_( image );
						texture.needsUpdate = true;

						if ( onLoad ) {
							onLoad( texture );
						}else{
						for(var i in  loader.load){ // FEHLER !!!!!! // weiter
							debug('error: ' +i);
						}
						}

					} );

				}

				return texture;

			}

		};

		THREE.MTLLoader.ensurePowerOfTwo_ = function ( image ) {

			if ( ! THREE.MTLLoader.isPowerOfTwo_( image.width ) || ! THREE.MTLLoader.isPowerOfTwo_( image.height ) ) {

				var canvas = document.createElement( "canvas" );
				canvas.width = THREE.MTLLoader.nextHighestPowerOfTwo_( image.width );
				canvas.height = THREE.MTLLoader.nextHighestPowerOfTwo_( image.height );

				var ctx = canvas.getContext("2d");
				ctx.drawImage( image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height );
				return canvas;

			}

			return image;

		};

		THREE.MTLLoader.isPowerOfTwo_ = function ( x ) {

			return ( x & ( x - 1 ) ) === 0;

		};

		THREE.MTLLoader.nextHighestPowerOfTwo_ = function( x ) {

			--x;

			for ( var i = 1; i < 32; i <<= 1 ) {

				x = x | x >> i;

			}

			return x + 1;

		};

		THREE.EventDispatcher.prototype.apply( THREE.MTLLoader.prototype );
	}
	//
	function loadJsFile(filename){
	  var fileref = document.createElement('script');
	  //fileref.setAttribute('js', 'javascript');
	  fileref.setAttribute('src', filename);
	  fileref.setAttribute('type', 'text/javascript');
	  if (typeof fileref != "undefined") document.getElementsByTagName("head")[0].appendChild(fileref);
	}
}
//
canvasio3D_JS(); 