module.exports = {getRooms: getRooms,
		specialRooms: getSpecialRooms,
		find: find,
		findIndex, findIndex,
		getWaitLocation: getWaitLocation
		};

function find(name){
	return hash[name];
}


function getWaitLocation(id){
	var name = "W"+(id+1);
	var tmp = findIndex(name);
	//console.log("Get WAIT loc ", id, name, tmp);
	return tmp;
}

function findIndex(name){
	for (var i = 0 ; i < rooms.length; i++){
		if (rooms[i].room == name) return 1000+i;
		
	}
	return 0;
}

function getSpecialRooms(){
	return specialRooms;
}

var specialRooms = [{Click:"Department of Biochemistry", lat: 43.66110967478192 , lng: -79.39402118325233 },
	{Click:"Tim Horton", lat: 43.66102623725039 , lng: -79.39381197094917 },
	{Click:"Department of Genetics", lat: 43.6610766878647 , lng: -79.3936362862587 },
	{Click:"Main Entrance", lat: 43.6610766878647 , lng: -79.3936362862587 },
	{Click:"Stone Lobby", lat: 43.6610553433792 , lng: -79.39336270093918 },
	{Click:"ATM", lat: 43.66101265438545 , lng: -79.39364433288574 },
	{Click:"Department of Laboratory Medicine", lat: 43.66089234887611 , lng: -79.39384013414383 },
	{Click:"Department of Pharmacology", lat: 43.660817642914296 , lng: -79.39355045557022 },
	{Click:"Entrance", lat: 43.66092533589459 , lng: -79.39285844564438 },
	{Click:"Starbucks", lat: 43.66067502218364 , lng: -79.39289331436157 },
	{Click:"Medical Sciences Cafe", lat: 43.660554715997726 , lng: -79.39307972788811 }];

function getRooms(){
	return rooms;
}
var rooms = [
{room: "W101", lat:  43.66083801727673 , lng: -79.39449861645699, type: 'room' },
{room: "W102", lat:  43.66076040062092 , lng: -79.39447715878487, type: 'room' },
{room: "W103", lat:  43.66063718397372 , lng: -79.39442485570908, type: 'room' },
{room: "W104", lat:  43.660586732990105 , lng: -79.394411444664, type: 'room' },
{room: "W105", lat:  43.660533371326686 , lng: -79.39438596367836, type: 'room' },
{room: "W151", lat:  43.66048971174858 , lng: -79.39420089125633, type: 'room' },
{room: "W152", lat:  43.6604994138798 , lng: -79.39412042498589, type: 'room' },
{room: "W153", lat:  43.660524639413595 , lng: -79.39402520656586, type: 'room' },
{room: "W154", lat:  43.66055956705827 , lng: -79.39389243721962, type: 'room' },
{room: "W144", lat:  43.6606565881869 , lng: -79.3939259648323, type: 'room' },
{room: "W143", lat:  43.660648826502396 , lng: -79.39401850104332, type: 'room' },
{room: "W142", lat:  43.660625541442805 , lng: -79.39415395259857, type: 'room' },
{room: "W141", lat:  43.660597405317084 , lng: -79.39427062869072, type: 'room' },
{room: "W131", lat:  43.66070509869243 , lng: -79.39432829618454, type: 'room' },
{room: "W132", lat:  43.66073226455841 , lng: -79.39424112439156, type: 'room' },
{room: "W133", lat:  43.66076137082974 , lng: -79.39410835504532, type: 'room' },
{room: "W134", lat:  43.66080017916956 , lng: -79.39397692680359, type: 'room' },
{room: "W124", lat:  43.66089719990938 , lng: -79.39402252435684, type: 'room' },
{room: "W123", lat:  43.66087779577395 , lng: -79.39410835504532, type: 'room' },
{room: "W122", lat:  43.660852570388535 , lng: -79.39423307776451, type: 'room' },
{room: "W121", lat:  43.660817642914296 , lng: -79.39434304833412, type: 'room' },
{room: "W111", lat:  43.66093115713125 , lng: -79.39441546797752, type: 'room' },
{room: "W112", lat:  43.66096123351176 , lng: -79.39430683851242, type: 'room' },
{room: "W113", lat:  43.660990339672104 , lng: -79.39420491456985, type: 'room' },
{room: "W114", lat:  43.66100877356634 , lng: -79.3940868973732, type: 'room' },
{room: "W115", lat:  43.66104564133785 , lng: -79.39389377832413, type: 'room' },
{room: "W116", lat:  43.660888468049215 , lng: -79.3938535451889, type: 'room' },
{room: "W117", lat:  43.660886527635675 , lng: -79.39369797706604, type: 'room' },
{room: "Reception", lat:  43.66095444207233 , lng: -79.39339756965637, type: 'room' },
{room: "E101", lat:  43.66087391494612 , lng: -79.392881244421, type: 'room' },
{room: "E102", lat:  43.66085160018119 , lng: -79.39288794994354, type: 'room' },
{room: "E103", lat:  43.66083607686157 , lng: -79.39292684197426, type: 'room' },
{room: "E104", lat:  43.660815702498475 , lng: -79.39292281866074, type: 'room' },
{room: "E105", lat:  43.660785626045076 , lng: -79.39290940761566, type: 'room' },
{room: "E106", lat:  43.660784655836636 , lng: -79.39284235239029, type: 'room' },
{room: "E108", lat:  43.66079144729528 , lng: -79.39281955361366, type: 'room' },
{room: "E110", lat:  43.6608021195859 , lng: -79.39278870820999, type: 'room' },
{room: "E112", lat:  43.66080503021027 , lng: -79.39274713397026, type: 'room' },
{room: "E114", lat:  43.66081473229052 , lng: -79.39271494746208, type: 'room' },
{room: "E116", lat:  43.66082928540797 , lng: -79.39266934990883, type: 'room' },
{room: "E118", lat:  43.66083607686157 , lng: -79.3926277756691, type: 'room' },
{room: "E120", lat:  43.66085160018119 , lng: -79.39256474375725, type: 'room' },
{room: "E122", lat:  43.66086615328968 , lng: -79.39248561859131, type: 'room' },
{room: "E124", lat:  43.66088070639468 , lng: -79.3924480676651, type: 'room' },
{room: "E126", lat:  43.660859361839485 , lng: -79.39241588115692, type: 'room' },
{room: "E128", lat:  43.660838987484304 , lng: -79.39240783452988, type: 'room' },
{room: "E130", lat:  43.660815702498475 , lng: -79.39239710569382, type: 'room' },
{room: "E132", lat:  43.66083219603103 , lng: -79.39236491918564, type: 'room' },
{room: "E150", lat:  43.66080697062645 , lng: -79.39232468605042, type: 'room' },
{room: "E152", lat:  43.66075748999437 , lng: -79.39230993390083, type: 'room' },
{room: "E154", lat:  43.66074099644128 , lng: -79.39230054616928, type: 'room' },
{room: "E156", lat:  43.66072159225537 , lng: -79.3922871351242, type: 'room' },
{room: "E158", lat:  43.66069248596475 , lng: -79.39227774739265, type: 'room' },
{room: "E160", lat:  43.660676962604015 , lng: -79.39226970076561, type: 'room' },
{room: "E162", lat:  43.660647856291746 , lng: -79.39224824309349, type: 'room' },
{room: "E164", lat:  43.66062845207575 , lng: -79.39233005046844, type: 'room' },
{room: "E166", lat:  43.66061874996539 , lng: -79.39236491918564, type: 'room' },
{room: "E168", lat:  43.660607107430906 , lng: -79.3924118578434, type: 'room' },
{room: "E170", lat:  43.66061292869844 , lng: -79.3924668431282, type: 'room' },
{room: "E172", lat:  43.660634273341216 , lng: -79.39247757196426, type: 'room' },
{room: "E174", lat:  43.660664349870444 , lng: -79.39248830080032, type: 'room' },
{room: "E176", lat:  43.660683754074846 , lng: -79.39249634742737, type: 'room' },
{room: "E178", lat:  43.66070606890214 , lng: -79.3925030529499, type: 'room' },
{room: "E180", lat:  43.660723532674275 , lng: -79.39251512289047, type: 'room' },
{room: "Auditorium", lat:  43.66074681769582 , lng: -79.392519146204, type: 'room' },
{room: "E167", lat:  43.660723532674275 , lng: -79.3926452100277, type: 'room' },
{room: "E151", lat:  43.66077398354294 , lng: -79.39238905906677, type: 'room' },
{room: "E153", lat:  43.66075263894982 , lng: -79.39236760139465, type: 'room' },
{room: "E155", lat:  43.66072741351181 , lng: -79.39236357808113, type: 'room' },
{room: "E157xx", lat:  43.66070606890214 , lng: -79.39235419034958, type: 'room' },
{room: "E159", lat:  43.660686664704954 , lng: -79.39234212040901, type: 'room' },
{room: "E161", lat:  43.66066240944966 , lng: -79.39233273267746, type: 'room' },
{room: "E163", lat:  43.660648826502396 , lng: -79.39236491918564, type: 'room' },
{room: "W165", lat:  43.66064106481688 , lng: -79.3924131989479, type: 'room' },
{room: "W167", lat:  43.66065949881837 , lng: -79.39243599772453, type: 'room' },
{room: "W169", lat:  43.660676962604015 , lng: -79.39244002103806, type: 'room' },
{room: "W171", lat:  43.66070121785344 , lng: -79.39245074987411, type: 'room' },
{room: "E131", lat:  43.660728383721164 , lng: -79.39245879650116, type: 'room' },
{room: "E129", lat:  43.66076719208231 , lng: -79.39243599772453, type: 'room' },
{room: "E127", lat:  43.660815702498475 , lng: -79.39245879650116, type: 'room' },
{room: "E125", lat:  43.66080308979404 , lng: -79.39249232411385, type: 'room' },
{room: "E123", lat:  43.66079435792018 , lng: -79.39253658056259, type: 'room' },
{room: "E121", lat:  43.66078853667025 , lng: -79.39256742596626, type: 'room' },
{room: "E119", lat:  43.66078271541974 , lng: -79.3925929069519, type: 'room' },
{room: "E117", lat:  43.66077786437724 , lng: -79.39261838793755, type: 'room' },
{room: "E115", lat:  43.66077107291704 , lng: -79.39265459775925, type: 'room' },
{room: "E113", lat:  43.66076234103853 , lng: -79.3926827609539, type: 'room' },
{room: "E111", lat:  43.660753609158775 , lng: -79.39271226525307, type: 'room' },
{room: "E109", lat:  43.66074972832289 , lng: -79.39273238182068, type: 'room' },
{room: "E107", lat:  43.660739056022976 , lng: -79.39276725053787, type: 'room' },
{room: "E105", lat:  43.66073226455841 , lng: -79.39281284809113, type: 'room' },
{room: "C147", lat:  43.66057412023758 , lng: -79.39292818307877, type: 'room' },
{room: "C146", lat:  43.66062651165381 , lng: -79.3929523229599, type: 'room' },
{room: "C145", lat:  43.66067405197342 , lng: -79.39296707510948, type: 'room' },
{room: "C144", lat:  43.66068763491497 , lng: -79.39302206039429, type: 'room' },
{room: "C143", lat:  43.66070897953118 , lng: -79.39303815364838, type: 'room' },
{room: "C142", lat:  43.660744877277715 , lng: -79.39305424690247, type: 'room' },
{room: "C141", lat:  43.66078853667025 , lng: -79.39312532544136, type: 'room' },
{room: "C140", lat:  43.660785626045076 , lng: -79.39316421747208, type: 'room' },
{room: "C139", lat:  43.66077204312568 , lng: -79.39321786165237, type: 'room' },
{room: "C138", lat:  43.66076331124732 , lng: -79.39327150583267, type: 'room' },
{room: "C137", lat:  43.660747787904874 , lng: -79.39332649111748, type: 'room' },
{room: "C136", lat:  43.660719651836466 , lng: -79.39331576228142, type: 'room' },
{room: "C135", lat:  43.66070412848272 , lng: -79.39327418804169, type: 'room' },
{room: "C134", lat:  43.660678903024326 , lng: -79.3932943046093, type: 'room' },
{room: "C133", lat:  43.660648826502396 , lng: -79.39329028129578, type: 'room' },
{room: "C132", lat:  43.66057800108477 , lng: -79.39325273036957, type: 'room' },
{room: "C131", lat:  43.66058576277846 , lng: -79.39329832792282, type: 'room' },
{room: "C130", lat:  43.66061680954315 , lng: -79.39333587884903, type: 'room' },
{room: "C129", lat:  43.6606420350276 , lng: -79.39334526658058, type: 'room' },
{room: "C128", lat:  43.660639124395345 , lng: -79.39338952302933, type: 'room' },
{room: "C127", lat:  43.66063524355207 , lng: -79.393420368433, type: 'room' },
{room: "C126", lat:  43.66062069038758 , lng: -79.39346194267273, type: 'room' },
{room: "C125", lat:  43.660614869120835 , lng: -79.39349815249443, type: 'room' },
{room: "C124", lat:  43.66061098827597 , lng: -79.39353838562965, type: 'room' },
{room: "C123", lat:  43.66054792451232 , lng: -79.39354509115219, type: 'room' },
{room: "C122", lat:  43.66054113302612 , lng: -79.3935652077198, type: 'room' },
{room: "C121", lat:  43.66053434153916 , lng: -79.39359739422798, type: 'room' },
{room: "C120", lat:  43.660528520263995 , lng: -79.39362287521362, type: 'room' },
{room: "C119", lat:  43.66051881813751 , lng: -79.39365640282631, type: 'room' },
{room: "C118", lat:  43.66051105643517 , lng: -79.39368322491646, type: 'room' },
{room: "C117", lat:  43.660502324518845 , lng: -79.39372077584267, type: 'room' },
{room: "C116", lat:  43.66056344790644 , lng: -79.39373955130577, type: 'room' },
{room: "C115", lat:  43.6605692691782 , lng: -79.3936912715435, type: 'room' },
{room: "C114", lat:  43.66056829896628 , lng: -79.39365640282631, type: 'room' },
{room: "C113", lat:  43.660576060661214 , lng: -79.39362153410912, type: 'room' },
{room: "C112", lat:  43.66058382235513 , lng: -79.3935839831829, type: 'room' },
{room: "C111", lat:  43.660653677555345 , lng: -79.39357191324234, type: 'room' },
{room: "C110", lat:  43.66066240944966 , lng: -79.39353972673416, type: 'room' },
{room: "C109", lat:  43.66067405197342 , lng: -79.39349547028542, type: 'room' },
{room: "C108", lat:  43.660680843444574 , lng: -79.39345791935921, type: 'room' },
{room: "C107", lat:  43.66069539659446 , lng: -79.39337208867073, type: 'room' },
{room: "C106", lat:  43.66073032413981 , lng: -79.3933841586113, type: 'room' },
{room: "C105", lat:  43.66072741351181 , lng: -79.39342975616455, type: 'room' },
{room: "C104", lat:  43.66072256246483 , lng: -79.39345255494118, type: 'room' },
{room: "C103", lat:  43.66071771141746 , lng: -79.39349412918091, type: 'room' },
{room: "C102", lat:  43.660697337014184 , lng: -79.39355045557022, type: 'room' },
{room: "C101", lat:  43.66067987323446 , lng: -79.3936362862587, type: 'room' },
{room: "C100", lat:  43.66067114134269 , lng: -79.39368322491646, type: 'room' },
{room:"Department of Biochemistry", lat: 43.66110967478192 , lng: -79.39402118325233 , type: 'room' },
{room:"Tim Horton", lat: 43.66102623725039 , lng: -79.39381197094917 , type: 'room' },
{room:"Department of Genetics", lat: 43.6610766878647 , lng: -79.3936362862587 , type: 'room' },
{room:"Main Entrance", lat: 43.6610766878647 , lng: -79.3936362862587 , type: 'room' },
{room:"Stone Lobby", lat: 43.6610553433792 , lng: -79.39336270093918 , type: 'room' },
{room:"ATM", lat: 43.66101265438545 , lng: -79.39364433288574 , type: 'room' },
{room:"Department of Laboratory Medicine", lat: 43.66089234887611 , lng: -79.39384013414383 , type: 'room' },
{room:"Department of Pharmacology", lat: 43.660817642914296 , lng: -79.39355045557022 , type: 'room' },
{room:"Entrance", lat: 43.66092533589459 , lng: -79.39285844564438 , type: 'room' },
{room:"Starbucks", lat: 43.66067502218364 , lng: -79.39289331436157 , type: 'room' },
{room:"Medical Sciences Cafe", lat: 43.660554715997726 , lng: -79.39307972788811 , type: 'room' },

{room: "M103", lat: 43.660747787904874 , lng: -79.3937261402607  , type: 'room' },
{room: "M104", lat: 43.66080697062645 , lng: -79.39375296235085  , type: 'room' },
{room: "M105", lat: 43.660789506878615 , lng: -79.39378246665001  , type: 'room' },
{room: "M106", lat: 43.66079144729528 , lng: -79.39368858933449  , type: 'room' },
{room: "M107", lat: 43.66078271541974 , lng: -79.39384013414383  , type: 'room' },
{room: "M108", lat: 43.66071383057926 , lng: -79.3938159942627  , type: 'room'},

{room:"W1", lat: 43.66097093556677 , lng: -79.39342841506004 , type: 'wait'},
{room:"W2", lat: 43.66098063762021 , lng: -79.39340025186539 , type: 'wait'},
{room:"W3", lat: 43.660983548235954 , lng: -79.39337342977524 , type: 'wait'},
{room:"W4", lat: 43.660993250287355 , lng: -79.39334660768509 , type: 'wait'}

];


var hash = {};

for (var i = 0 ; i < rooms.length; i++){
	hash[rooms[i].room] = rooms[i];
}