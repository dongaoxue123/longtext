			
	layui.config({
		base: "js/"
	}).use(['form', 'layer'], function() {
		
		i18n('./locales')//国际化
		
		var form = layui.form,
			layer = parent.layer === undefined ? layui.layer : parent.layer,
			$ = layui.jquery;
			
			
		//登录按钮事件
		form.on("submit(login)", function(data) {
			//parent.location.href = 'index.html';
			//	$remove.storage();
			var login_name = $("#username").val();
			var password = $("#password").val();
			if(login_name == null) {
				alert(i18next.t("login.userNameEmpty"));
				return false;
			}
			if(password == null) {
				alert(i18next.t("login.passwordEmpty"));
				return false;
			}
			var bean = new Object();
			bean.loginName = login_name;
			bean.password = password;
	
			$.ajax({
				type: 'POST',
				url: commonIP + "api/admin/login",
				contentType: 'application/json',
				data: JSON.stringify(bean),
				success: function(data) {
					console.log(data);
					if(data) {
						if(data.errcode == 200) {
							localStorage.setItem('authToken', data.dataSource.list[0].authToken);
							localStorage.setItem('user', JSON.stringify(data.dataSource.list[0].user));
	
							/**localStorage保存期限为永久，存储时间戳用于判断是否超时*/
							window.localStorage.setItem('loginTime', new Date().getTime());
	
							window.location.href = 'index.html';
						} else {
							alert(data.errmsg);
						}
					}
				}
			});
			return false;
		})
	});
	
	function refreshCode() {
		var captcha = document.getElementById("captcha");
		captcha.src = "/captcha.jpg?t=" + new Date().getTime();
	}