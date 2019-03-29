// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:



 //declare an empty variable with empty array
  	//declare a function to help find if element contains className
  		//if it finds it, push it to our array
  	//also need to see if element contain child nodes
  	//iterate through each child nodes
  	//recursively call each the function we declared until we loop thorugh all child nodes
  	//invoke our helper function
  	//return our result
var getElementsByClassName = function(className) {
 
  var result = [];
  var findElementHasClass = function(element){
  	if (element.classList && element.classList.contains(className)){
  		result.push(element)
  	}
  	if(element.children){
  		for (var i = 0; i < element.children.length; i++){
  			findElementHasClass(element.children[i])
  		}
  	}
	}
  
  findElementHasClass(document.body)

  return result;
};


