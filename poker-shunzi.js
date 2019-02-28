/*
一个表,表中有5个数字，范围在 [0-13]之间，其中0表示扑克牌的王，1-13  表示  2-A，牌肯能重复，王可以代替任何牌，
判断这5张牌能否凑成一个顺子？
*/

var arrs = [
 [1,2,3,4,5],   //true
 [2,0,8,10,13],  //false
 [11,10,13,1,12],  //true
 [0,2,3,5,6],  //true
[0,1,13,11,10],  //true
[0,1,10,11,13],  //true
 [4,6,7,8,0],  //true
 [0,1,2,3,7],  //false
 [2,5,9,8,6],//fasle
 [4,5,6,7,8],//true
 [1,10,11,12,13], //true
 [0,0,1,5,3], //true
 [0,0,1,2,5], //true
 [0,1,1,5,7], //false
 [0,0,0,0,0], //true

 ];


function isShunZi(arr){
	
	arr.sort((a,b)=>(a - b));	//数组排序
	
	const index = arr.indexOf(0);  //获得首个0的索引
	const lastIndex = arr.lastIndexOf(0);//获得最后一个0的索引
	
	if(index !== lastIndex){  //多个0的情况
		arr.splice(0,lastIndex + 1);
		return checkSort(arr,lastIndex + 1);
	}
	
	if(arr[0] === 1){  //没有0  且有1  只能出现  12345 或者 10,11,12,13,1
		if(arr[1] === 2 || arr[1] === 10){
			arr.splice(0,1);
			return checkSort(arr,0);
		}else{
			return false;
		}
	}
	if(arr[0] === 0){  //只有一个0
		if(arr[1] === 1 ){
			if(([10,11,12,13].indexOf(arr[2])>=0) && (arr[2]>9)){
				arr.splice(0,2);
				return checkSort(arr,1);
			}
		}
		arr.splice(0,1);
		return checkSort(arr,1);
	}
	return checkSort(arr,0);  //没有0
	function checkSort(arr,count){  //count表示原数组中0的个数, arr 是删除0之后的数组
		const newArr = arr.map(function(el,index,arr){
			if(index == arr.length-1){
				return 1
			}
			const next = arr[index + 1];
			return next - el;
		})
		.filter(function(value){
			return value >= 2
		});
		
		let spaceCount = 0;
		if(newArr.length>0){	
			spaceCount = newArr.reduce(function(a,b){
				return a + b;
			}) - newArr.length;
		}
		return spaceCount <= count
	}
}

//测试函数
function run(arrs){
	for(let i =0;i<arrs.length;i++){
		let res = isShunZi(arrs[i])
		console.log(res,'res'+i)
	}
}
run();
