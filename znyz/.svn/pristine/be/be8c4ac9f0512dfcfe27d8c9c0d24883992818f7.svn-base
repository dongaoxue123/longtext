
layui.config({
    base: "js/"
}).use(['form', 'layer'], function () {
	i18n('./locales')//国际化
	
	var del = "0" ;
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        $ = layui.jquery;
//  //加载集团
//  $.ajax({
//			type: 'GET',
//			url: commonIP + "api/znyz/system/group/getListSelect",
//			contentType: 'application/json',
//			success: function(data) {
//				console.log(data);
//				console.log('集团')
//				if (data) {
//					if (data.errcode == 200) {
//						var html;
//						for (var key in data.dataSource.list){
//				        	html = html + '<option value="'+ data.dataSource.list[key].id +'">'+ data.dataSource.list[key].name +'</option>';
//				        	
//				        }
//						$("#groupID").append(html);
//						form.render('select');
//					} else {
//						alert(data.errmsg);
//					}
//				}
//			}
//		});
	//加载猪场
//	form.on('select(groupID)', function(data){
//		
//		var groupId = $("#groupID").val();
//		$("#farmID").html("");
//		if(groupId.length==0){
//			return;
//		}
// 		 $.ajax({
//			type: 'GET',
//			url: commonIP + "api/znyz/system/farm/getListSelect",
//			data:'group_id='+groupId,
//			contentType: 'application/json',
//			success: function(data) {
//				console.log('猪场')
//				console.log(data);
//				if (data) {
//					if (data.errcode == 200) {
//						var html;
//						for (var key in data.dataSource.list){
//				        	html = html + '<option value="'+ data.dataSource.list[key].id +'">'+ data.dataSource.list[key].name +'</option>';
//				        	
//				        }
//						$("#farmID").append(html);
//						form.render('select');
//					} else {
//						alert(data.errmsg);
//					}
//				}
//			}
//		});
//	})

	$("#username").blur(function(){
		$("#roleID").html("");
		  var loginName = $("#username").val();
		  //alert(loginName);
	      if(loginName != ""){
	      	//获取角色下拉列表
		   	$.ajax({
		        url: commonIP + 'api/znyz/system/userrole/get?page=0&limit=0&loginName=' + loginName ,
	            success: function (dataObj) {	            
	            //	console.log(dataObj.dataSource.list.length);
	            	//console.log(dataObj.dataSource.list[0].roleName);
	            	//console.log(dataObj.dataSource.list[0].roleId);
	        	//var dataObj = JSON.parse(res);
	    	    if(dataObj!=null && dataObj.dataSource.list.length>0){
	    	    	if(dataObj.errcode =="200"){
	    	    		
	    	    		if(dataObj.dataSource.list[0].delFlag =="1"){
	    	    			alert("该用户已被禁用，请联系管理员")
	    	    			del ="1";
	    	    			  form.render('select');//一定要加form.render();
	    	    		}else{
	    	    		del ="0";
	    	    		   var groupOption;
	              
	                console.log(dataObj);
	             //   console.log(dataObj.data.length);
	             //   for (var i = 0; i < dataObj.data.length; i++) {
	            
	               // 	console.log(dataObj.data[i].roleName)
		         //   	groupOption = groupOption+'<option value="'+dataObj.data[i].roleId+'">'+dataObj.data[i].roleName+'</option>';
	            //    }
	             	 	for (var i = 0; i < dataObj.dataSource.list.length; i++) {
	             	         //  	console.log(dataObj.dataSource.list[i].roleName)
		            	groupOption = groupOption+'<option value="'+dataObj.dataSource.list[i].roleId+'">'+dataObj.dataSource.list[i].roleName+'</option>';
	                }
	                $("#roleID").append(groupOption);
	                form.render('select');//一定要加form.render();
	    	    		}
	    	    		
	    	    		             
	    	    	
	    	    	}
	    	    	

	        	  }
	        }
		    }); 
	      }
	});
		
    //登录按钮事件
    form.on("submit(login)", function (data) {
//        parent.location.href = 'index.html';
		localStorage.clear()
//				$remove.storage();
		var login_name = $("#username").val();
		var password = $("#password").val();
		var groupId = $("#groupID").val();
		var farmId = $("#farmID").val();
		var bean = new Object();
		
		//alert(del);
		if(del =="1"){
			alert("该用户已被禁用，请联系管理员");
			return  false;
		}
		
		  form.render('select');//一定要加form.render();
		bean.loginName = login_name;
		bean.password = password;
        bean.groupId = groupId;
		bean.farmId = farmId;
		$.ajax({
			type: 'POST',
			url: commonIP + "api/users/login",
			contentType: 'application/json',
			data: JSON.stringify(bean),
			success: function(data) {
				console.log(data);
				if (data) {
					if (data.errcode == 200) {
						//alert(data.errmsg);
						localStorage.setItem('authToken',data.dataSource.list[0].authToken);
						localStorage.setItem('user',JSON.stringify(data.dataSource.list[0].user));
						
						/**localStorage保存期限为永久，存储时间戳用于判断是否超时*/
						window.localStorage.setItem('loginTime',new Date().getTime());
						var roleID = $("#roleID").val();
						window.location.href = 'index.html?roleID='+roleID;
					} else {
						alert(data.errmsg);
					}
				}
			}
		});
		return false;
    })
});
