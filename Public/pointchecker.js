module.exports = {
	check : check,
	distance: dist,
	convert: convert
}

//
// A-B is base
// C is apex
//

const r_to_degree = 180 / Math.PI;

function convert(A){
	//console.log(A);
	return {x:A.lat, y:A.lng};
}

function dist(A, B) {
//	 console.log(A,B);
//	 console.log(Math.pow((A.x - B.x),2));
//	 console.log(Math.pow((A.y - B.y),2));

	return Math.sqrt(Math.pow((A.x - B.x), 2) + Math.pow((A.y - B.y), 2));
}
function angle(a, b, c) {
	var n = (Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2));
	var d = (2 * b * c);
	// console.log("n = ",n);
	// console.log("d = ",d);
	// console.log("n/d = ",n/d);
	// console.log("ACOS ",r_to_degree*(Math.acos(n/d)));

	return Math.acos(n / d);
}
function gt90(A, B, C) { // A-B Define a line, is point C > 90 degrees past
							// one of the endpoints?
// console.log("A = ",A," | B = ",B," | C = ",C,"\n");
	a = dist(A, B);
	b = dist(B, C);
	c = dist(C, A);

	// console.log("A-B = ",a," | B-C = ",b," | C-A = ",c,"\n");

	// console.log("A = ",r_to_degree*angle(b,c,a));
	// console.log("B = ",r_to_degree*angle(c,a,b));
	return (((r_to_degree * angle(b, c, a)) > 90) || ((r_to_degree * angle(c,
			a, b)) > 90));
	// console.log("C = ",r_to_degree*angle(c,a,b));
}

function distance(A, B, C) {
	var a = Math.abs(((B.y - A.y) * C.x) - ((B.x - A.x) * C.y) + (B.x * A.y)
			- (B.y * A.x));
	var b = dist(A, B);
	return (a / b);

}

function intersect(A, B, C) {
	// console.log(A.x,B.x,A.y,B.y);
	var slope1 = (A.y - B.y) / (A.x - B.x);
	var b1 = A.y - (A.x * slope1);

	var slope2 = -1 / slope1;
	var b2 = C.y - (C.x * slope2);

	//	
	// console.log("y1 = x1*",slope1+" + "+b1);
	// console.log("y2 = x2*",slope2+" + "+b2);

	var x = (b2 - b1) / (slope1 - slope2);
	var y = ((x * slope2) + b2);
	if (slope1 == 0) {
		x = C.x;
		y = A.y;
	}
	if (slope2 == 0) {
		x = A.x;
		y = C.y;
	}
	// console.log("Distance Sanity Check",Math.sqrt(Math.pow(C.x-x,2) +
	// Math.pow(C.y-y,2)));

	return {
		x : x,
		y : y
	};
}
function check(A, B, C) {
	// console.log("check 1 ",A,B,C);
	var x = pointRelation({
		x : A.lat,
		y : A.lng
	}, {
		x : B.lat,
		y : B.lng
	}, {
		x : C.lat,
		y : C.lng
	});
	x.intersect.lat = x.intersect.x;
	x.intersect.lng = x.intersect.y;
	return x;
}

function pointRelation(A, B, C) {
	// console.log(A,B,C);
	var fits = !gt90(A, B, C);
	var dx = distance(A, B, C);
	var xy = intersect(A, B, C);
	return {
		fits : fits,
		distance : dx,
		intersect : xy,
		distAC: dist(A,C),
		distBC: dist(B,C)
	};
}

var aPoint = [ {
	x : 1,
	y : 1
}, {
	x : 2,
	y : 5
}, {
	x : 3.0,
	y : 6
} ];
// console.log(dtt);

// console.log("point checker sanity ",
// pointRelation(aPoint[0],aPoint[1],aPoint[2]));
// console.log("intersect = ",intersect(aPoint[0],aPoint[1],aPoint[2]));
