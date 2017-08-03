(function() {
    tinymce.create('tinymce.plugins.wp3D', {
		init : function(ed, url) {
			ed.addButton('canvasioBtn',{
				class: 'media-views',
				title : 'Canvasio3D',
				image : url+'/canvasioBtn.png',
				onclick : function() {
					ed.execCommand('mceInsertContent', false, '[canvasio3D width="280" height="220" border="1" borderCol="#F6F6F6" dropShadow="0" backCol="#FFFFFF" backImg="..." mouse="on" rollMode="off" rollSpeedH="0" rollSpeedV="0" objPath="..." objScale="1.5" lightSet="5" reflection="off" refVal="5" objShadow="off" floor="off" floorHeight="42" lightRotate="off"] [/canvasio3D]');
				}
			});
		},
		createControl : function(n, cm) {
		return null;
	}
    });
    tinymce.PluginManager.add('wp3D', tinymce.plugins.wp3D);
})();