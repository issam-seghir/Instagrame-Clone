export const loginApi = ({ password, username }) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			if (username === "admin" && password === "123") {
				resolve({
					data: {
						access_token: "82jdu82193yh90sad83hxfgsd",
					},
					message: "Login thành công",
				});
			} else {
				reject(new Error("Login thất bại"));
			}
		}, 100);
	});
