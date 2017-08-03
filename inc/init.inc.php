<?php
	//
   if($GLOBALS["canvasioId"]==0){
		wp_register_script( 'threejs', plugins_url('/inc/js/three.min.js',dirname(__FILE__),false));
		wp_register_script( 'glDetector', plugins_url('/inc/js/Detector.js',dirname(__FILE__),false));
		wp_register_script( 'wpWebGL', plugins_url('/inc/js/wpWebGL.js',dirname(__FILE__),false));
	}
	//
	function initHandler($atts){
		//
		$defaults = array(
			'loadingtext'=>'Loading ...',
			'backimg'=>'',
			'reflection'=>'',
			'refval'=>'0',
			'floor'=>'off',
			'floorheight' =>'42',
			'objpath'=>'',
			'texturpath'=>'',
			'envtexturpath'=>'',
			'objcol' => '',
			'objscale'=>'1',
			'objshadow' =>'off',
			'width'=>'220',
			'height'=>'220',
			'dropshadow'=>'0',
			'zoom'=>'50',
			'textcol'=>'#000000',
			'border'=>'0',
			'bordercol'=>'#f6f6f6',
			'backcol'=>'#ffffff',
			'text'=>'',
			'rollspeedx'=>'0',
			'rollspeedy'=>'0',
			'rollspeedh'=>'0',
			'rollspeedv'=>'0',			
			'rollmode'=>'',			
			'mouse'=>'',
			'lightset'=>'0',
			'lightrotate'=>'off',
			'shine'=>'0',
			'ambient'=>'0',
			'fps'=>'',
			'wincount'=>'0',
			'_uploadUrl'=>'',
			'_picUrl' => '',
			'lang' => ''
		);
		//
		$flag = array(
			'loadingtext'=>'1',
			'reflection'=>'1',
			'backimg'=>'1',
			'refval'=>'0',
			'floor'=>'1',
			'floorheight' =>'0',
			'objpath'=>'1',
			'texturpath'=>'1',
			'envtexturpath'=>'1',
			'width'=>'0',
			'height'=>'0',
			'dropshadow'=>'0',
			'zoom'=>'0',
			'objscale'=>'0',
			'objshadow' =>'1',
			'textcol'=>'1',
			'border'=>'0',
			'bordercol'=>'1',
			'backcol'=>'1',
			'text'=>'1',
			'rollspeedx'=>'0',
			'rollspeedy'=>'0',
			'rollspeedv'=>'0',
			'rollspeedh'=>'0',			
			'rollmode'=>'1',			
			'mouse'=>'1',
			'lightset'=>'0',
			'lightrotate'=>'1',
			'shine'=>'0',
			'ambient'=>'1',
			'objcol' => '1',
			'fps'=>'1',
			'wincount'=>'0',
			'_uploadUrl'=>'1',
			'_picUrl' => '1',
			'lang' => '1'
		);
		//
		$href = array();
		$temp = array();
		//
		foreach ($atts as $k => $v) {
			$href = split('"',$v); if(sizeof($href)>2)array_push($temp,$href[1]);
		}
		//
		$a = shortcode_atts($defaults, $atts);
		$a['lang'] = get_locale();
		//
		if($a['objpath']=='') $a['objpath'] = $temp[0];
		if($a['texturpath']=='' && $temp[1]!='') $a['texturpath'] = $temp[1];
		if($a['envtexturpath']=='' && $temp[1]!='') $a['envtexturpath'] = $temp[1];
		if( (int) $a['width'] > 940) $a['width']='940';
		if( (int) $a['height'] > 940) $a['height']='940';
		//
		if (is_user_logged_in()) {
			$tf = false;
			$msg = array();
			//
			if(get_locale()!='de_DE'){
				$msg[0]='Canvasio3D - Entry error at object window: '.$GLOBALS["canvasioId"].'<br>-----------------------------------------------------------<br>';
				$msg[1]='Must be a string: '; $msg[2]='This entry is not numeric: '; $msg[3]='This entry is not a color hex-number: ';
			}else{
				$msg[0]='Canvasio3D - Eingabefehler im Objektfenster: '.$GLOBALS["canvasioId"].'<br>-----------------------------------------------------------<br>';
				$msg[1]='Hier sollte Text stehen: '; $msg[2]='Dieser Eintrag ist keine Zahl: '; $msg[3]='Dieser Eintrag ist kein Hex-Farbwert: ';
			}
			//
			foreach ($a as $k => $v) {				
				if($a[$k]!=''){
					if (is_numeric($v)) {
						if($flag[$k]!='0'){
							$a[$k] = $defaults[$k];
						}
					}else{
						if($flag[$k]!='1'){
							$a[$k] = $defaults[$k];
						}
					}
				}
			}
			if($tf) echo '<br><br>';
		}
		//
		$a['ambient'] = str_replace('#', '0x', $a['ambient']);
		$a['objcol'] = str_replace('#', '0x', $a['objcol']);
		$a['_picUrl'] = plugins_url();
		$a['_uploadUrl'] = content_url().'/uploads/';
		//
		$id = new stdClass();
		$id->{'id'} = $GLOBALS["canvasioId"]; $a['winCount'] = $GLOBALS["canvasioId"]; $GLOBALS["canvasioId"]++; $dp = json_encode($a); $dp = str_replace('"', "'", $dp);
		//
		$screenID = '3D_'.$GLOBALS["canvasioId"];
		//
		$style  ="'background-color:".$a['backcol'].";";
		$style .="color:".$a['textcol'].";";
		$style .="border:".$a['border']."px solid".";";
		$style .="border-color:".$a['bordercol'].";";
		$style .="width:".$a['width']."px".";";
		$style .="height:".$a['height']."px".";";
		$style .="overflow: hidden;";
		$style .="-moz-box-shadow: 0 0 ".$a['dropshadow']."px #888; -webkit-box-shadow: 0 0 ".$a['dropshadow']."px#888; box-shadow: 0 0 ".$a['dropshadow']."px #888;";	
		$style .="padding:0px".";'";
		//
		if(id==0){
			wp_enqueue_script( 'threejs' );
			wp_enqueue_script( 'glDetector' );
			wp_enqueue_script( 'wpWebGL' );
		}
		//
		return '<div class="canvasio3D" style='.$style.'><div id="'.$screenID.'" data-parameter="'.$dp.'"></div></div>';
	}
	add_shortcode( 'canvasio3D', 'initHandler' );
?>