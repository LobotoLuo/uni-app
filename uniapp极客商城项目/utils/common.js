function pass(obj) {
	//使用URI编码传递的对象数据
	let item = encodeURIComponent(JSON.stringify(obj));
	return item;
}

function receive(para) {
	const item = JSON.parse(decodeURIComponent(para));
	return item;
}

function toast(info,callback=()=>{}) {
	uni.showToast({
		title: info,
		icon: 'none',
		duration: 1200
	});
	setTimeout(()=>{
		callback()
	},1200)
}

function modal(title, callback) {
	uni.showModal({
		title: title,
		content: '',
		success: (res) => {
			if (res.confirm) {
				callback();
			} else if (res.cancel) {

			}
		}
	});
}

export {
	pass,
	receive,
	toast,
	modal
}
